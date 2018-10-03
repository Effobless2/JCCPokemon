using JCCP.SqlConnector;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace BlocConnector
{
    public interface IBlocService
    {
        Task<string> GetAllBlocs();
    }

    public class BlocService : IBlocService
    {
        private readonly ISqlService _sqlService;

        public BlocService(ISqlService service)
        {
            _sqlService = service;
        }


        public async Task<string> GetAllBlocs()
        {
            string res = "";

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
                                res += reader["FrenchName"];
                            }
                        }
                    }
                }
            }
            return res;
        }
    }
}
