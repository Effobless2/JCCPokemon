using JCCP.BO;
using JCCP.SqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.RarityConnector
{
    public interface IRarityService
    {
        Task<bool> CreateNewRarity(Rarity rarity);
        Task<List<Rarity>> GetAllRarities();
    }

    public class RarityService : IRarityService
    {
        private readonly ISqlService _sqlService;
        public RarityService(ISqlService sqlService)
        {
            _sqlService = sqlService;
        }


        public void Fill(SqlDataReader reader, Rarity rarity)
        {
            rarity.RarityId = (Guid)reader["RarityId"];
            rarity.EnglishName = _sqlService.HasColumn(reader, "EnglishName") ? (string)reader["EnglishName"] : null;
            rarity.FrenchName = _sqlService.HasColumn(reader, "FrenchName") ? (string)reader["FrenchName"] : null;
            rarity.Logo = _sqlService.HasColumn(reader, "Logo") ? (string)reader["Logo"] : null;
        }

        public async Task<bool> CreateNewRarity(Rarity rarity)
        {

            using (SqlConnection conn = await _sqlService.GetConnection())
            {
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "CreateNewRarity";
                    if (rarity.RarityId != Guid.Empty)
                    {
                        cmd.Parameters.AddWithValue("@RarityId", rarity.RarityId);
                    }
                    cmd.Parameters.AddWithValue("@FrenchName", rarity.FrenchName);
                    cmd.Parameters.AddWithValue("@EnglishName", rarity.EnglishName);
                    cmd.Parameters.AddWithValue("@Logo", rarity.Logo);

                    var outpute = cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier);
                    outpute.Direction = ParameterDirection.Output;


                    await cmd.ExecuteNonQueryAsync();

                    rarity.RarityId = (Guid)outpute.Value;
                }
            }
            return true;
        }

        public async Task<List<Rarity>> GetAllRarities()
        {
            List<Rarity> res = new List<Rarity>();
            using(SqlConnection conn = await _sqlService.GetConnection())
            {
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "GetAllRarities";

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Rarity rarity = new Rarity();
                            Fill(reader, rarity);
                            res.Add(rarity);
                        }
                    }
                }
            }
            return res;
        }
    }
}
