using JCCP.BO;
using JCCP.SqlConnector;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace BlocConnector
{
    public interface IBlocService
    {
        Task<List<Bloc>> GetAllBlocs();
    }

    public class BlocService : IBlocService
    {
        private readonly ISqlService _sqlService;

        public BlocService(ISqlService service)
        {
            _sqlService = service;
        }


        public async Task<List<Bloc>> GetAllBlocs()
        {
            List<Bloc> res = new List<Bloc>();

            using(SqlConnection conn = await _sqlService.GetConnection())
            {
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Bloc";
                    using(SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            if (_sqlService.HasColumn(reader, "FrenchName"))
                            {
                                Bloc b = new Bloc();
                                Fill(reader, b);
                                res.Add(b);
                            }
                        }
                    }
                }
            }
            return res;
        }

        public void Fill(SqlDataReader reader, Bloc bloc)
        {
            bloc.BlocId = (Guid)reader["BlocId"];
            bloc.EnglishName = _sqlService.HasColumn(reader, "EnglishName") ? (string)reader["EnglishName"] : null;
            bloc.FrenchName = _sqlService.HasColumn(reader, "FrenchName") ? (string)reader["FrenchName"] : null;
            bloc.Year = _sqlService.HasColumn(reader, "CreationYear") ? (int)reader["CreationYear"] : 0;

        }
    }
}
