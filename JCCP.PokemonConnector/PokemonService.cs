using JCCP.BO;
using JCCP.SqlConnector;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.PokemonConnector
{
    public interface IPokemonService
    {
        Task<bool> CreateNewPokemon(Pokemon pokemon);
    }
    public class PokemonService : IPokemonService
    {
        private readonly ISqlService _sqlService;

        public PokemonService(ISqlService sqlService)
        {
            _sqlService = sqlService;
        }

        public async Task<bool> CreateNewPokemon(Pokemon pokemon)
        {

            using(SqlConnection conn = await _sqlService.GetConnection())
            {
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "CreateNewPokemon";
                    if (pokemon.PokemonId != Guid.Empty)
                    {
                        cmd.Parameters.AddWithValue("@PokemonId", pokemon.PokemonId);
                    }
                    cmd.Parameters.AddWithValue("@NumPokedex", pokemon.NumPokedex);
                    cmd.Parameters.AddWithValue("@EnglishName", pokemon.EnglishName);
                    cmd.Parameters.AddWithValue("@FrenchName", pokemon.FrenchName);
                    cmd.Parameters.AddWithValue("@ImageUrl", pokemon.ImageUrl);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return true;
        }
    }
}
