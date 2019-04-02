using JCCP.BO;
using JCCP.SqlConnector;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.CardConnector
{
    public interface ICardService
    {
        Task<bool> CreateNewCard(Card newCard);
    }

    public class CardService : ICardService
    {
        private readonly ISqlService _sqlService;


        public CardService(ISqlService sqlService)
        {
            _sqlService = sqlService;
        }

        public async Task<bool> CreateNewCard(Card newCard)
        {
            using (SqlConnection conn = await _sqlService.GetConnection())
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "CreateNewCard";
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CardId", newCard.CardId);
                    cmd.Parameters.AddWithValue("@RarityId", newCard.RarityId);
                    cmd.Parameters.AddWithValue("@PokemonId", newCard.CardId);
                    cmd.Parameters.AddWithValue("@ImageUrl", newCard.ImageUrl);
                    cmd.Parameters.AddWithValue("@FrenchName", newCard.FrenchName);
                    cmd.Parameters.AddWithValue("@EnglishName", newCard.EnglishName);
                    cmd.Parameters.AddWithValue("@CardNumber", newCard.CardNumber);
                    cmd.Parameters.AddWithValue("@MaxIndex", newCard.MaxIndex);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return false;
        }
    }
}
