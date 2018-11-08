using JCCP.SqlConnector;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.PokemonConnector
{
    public interface IPokemonService
    {
        Task<bool> CreateNewPokemon();
    }
    public class PokemonService : IPokemonService
    {
        private readonly ISqlService _sqlService;

        public PokemonService(ISqlService sqlService)
        {
            _sqlService = sqlService;
        }

        public async Task<bool> CreateNewPokemon()
        {

            using(SqlConnection conn = await _sqlService.GetConnection())
            {
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "CreateNewPokemon";
                    //-cmd.Parameters.AddWithValue("@PokemonId", Guid.Empty);
                    cmd.Parameters.AddWithValue("@NumPokedex", 1);
                    cmd.Parameters.AddWithValue("@EnglishName", "teste");
                    cmd.Parameters.AddWithValue("@FrenchName", "testf");
                    cmd.Parameters.AddWithValue("@ImageUrl", "url");
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return true;
        }
    }
}
