using JCCP.SqlConnector;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace EnergyTypeConnector
{
    public interface IEnergyTypeService
    {
        Task<Guid> CreateNewEnergyType();
        Task<List<Guid>> GetAllEnergyTypes();
    }
    public class EnergyTypeService : IEnergyTypeService
    {
        private readonly ISqlService _sqlService;

        public EnergyTypeService(ISqlService sqlService)
        {
            _sqlService = sqlService;
        }

        public async Task<Guid> CreateNewEnergyType()
        {
            Guid id;
            using (SqlConnection conn = await _sqlService.GetConnection())
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "CreateNewEnergyType";
                    cmd.Parameters.AddWithValue("@FrenchName", "TypeFR");
                    cmd.Parameters.AddWithValue("@EnglishName", "TypeEN");
                    cmd.Parameters.AddWithValue("@Logo", "Logo");
                    cmd.ExecuteNonQueryAsync();

                }
            }
            List<Guid> res = await GetAllEnergyTypes();
            return res[0];
        }

        public async Task<List<Guid>> GetAllEnergyTypes()
        {
            List<Guid> res = new List<Guid>();
            using (SqlConnection conn = await _sqlService.GetConnection())
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "GetAllEnergyTypes";

                    using(SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while(await reader.ReadAsync())
                        {
                            res.Add((Guid)reader["TypeId"]);
                        }
                    }
                }
            }
            return res;
        }
    }
}
