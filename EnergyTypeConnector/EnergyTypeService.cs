using JCCP.SqlConnector;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using JCCP.BO;

namespace EnergyTypeConnector
{
    public interface IEnergyTypeService
    {
        Task<EnergyType> CreateNewEnergyType(EnergyType toAdd);
        Task<List<EnergyType>> GetAllEnergyTypes();

    }
    public class EnergyTypeService : IEnergyTypeService
    {
        private readonly ISqlService _sqlService;

        public void Fill(SqlDataReader reader, EnergyType res)
        {
            res.TypeId = _sqlService.HasColumn(reader, "TypeId") ? (Guid)reader["TypeId"] : Guid.Empty;
            res.FrenchName = _sqlService.HasColumn(reader, "FrenchName") ? (string)reader["FrenchName"] : "";
            res.EnglishName = _sqlService.HasColumn(reader, "EnglishName") ? (string)reader["EnglishName"] : "";
            res.Logo = _sqlService.HasColumn(reader, "Logo") ? (string)reader["Logo"] : "";
        }

        public EnergyTypeService(ISqlService sqlService)
        {
            _sqlService = sqlService;
        }

        public async Task<EnergyType> CreateNewEnergyType(EnergyType toAdd)
        {
            using (SqlConnection conn = await _sqlService.GetConnection())
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "CreateNewEnergyType";
                    if (toAdd.TypeId != Guid.Empty)
                    {

                        cmd.Parameters.AddWithValue("@TypeId", toAdd.TypeId);
                    }
                    cmd.Parameters.AddWithValue("@FrenchName", toAdd.FrenchName);
                    cmd.Parameters.AddWithValue("@EnglishName", toAdd.EnglishName);
                    cmd.Parameters.AddWithValue("@Logo", toAdd.Logo);
                    await cmd.ExecuteNonQueryAsync();
                    
                }
            }
            List<EnergyType> res = await GetAllEnergyTypes();
            foreach (EnergyType e in res)
            {
                if (e.FrenchName == toAdd.FrenchName && e.EnglishName == toAdd.EnglishName && e.Logo == toAdd.Logo)
                {
                    return e;
                }
            }
            return null;
        }

        public async Task<List<EnergyType>> GetAllEnergyTypes()
        {
            List<EnergyType> res = new List<EnergyType>();
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
                            EnergyType cur = new EnergyType();
                            Fill(reader, cur);
                            res.Add(cur);
                        }
                    }
                }
            }
            return res;
        }
    }
}
