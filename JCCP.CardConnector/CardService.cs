using JCCP.SqlConnector;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.CardConnector
{
    public interface ICardService
    {
        Task<bool> CreateNewCard();
    }

    public class CardService : ICardService
    {
        private readonly ISqlService _sqlService;


        public CardService(ISqlService sqlService)
        {
            _sqlService = sqlService;
        }

        public async Task<bool> CreateNewCard()
        {
            using (SqlConnection conn = await _sqlService.GetConnection())
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "CreateNewCard";
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CardId", Guid.Empty);
                    cmd.Parameters.AddWithValue("@RarityId", Guid.Empty);
                    cmd.Parameters.AddWithValue("@TypeId", Guid.Empty);
                    cmd.Parameters.AddWithValue("@PokemonId", Guid.Empty);
                    cmd.Parameters.AddWithValue("@ImageUrl", "testImage");
                    cmd.Parameters.AddWithValue("@FrenchName", "testFR");
                    cmd.Parameters.AddWithValue("@EnglishName", "testEN");
                    cmd.Parameters.AddWithValue("@CardNumber", "1");
                    cmd.Parameters.AddWithValue("@MaxIndex", "105");
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return false;
        }
    }
}
