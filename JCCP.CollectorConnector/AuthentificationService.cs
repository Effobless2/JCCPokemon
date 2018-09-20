using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.AuthentificationConnector
{
    public interface IAuthentificationService
    {
        Task<string> GetTest();
        Task<string> UserAuthentification(string login, string password);
    }


    public class AuthentificationService : IAuthentificationService
    {
        private readonly SqlConnector.ISqlService _sqlService;

        public AuthentificationService(SqlConnector.ISqlService service)
        {
            _sqlService = service;
        }

        public async Task<string> GetTest()
        {
            string res = "";
            using (SqlConnection con = await _sqlService.GetConnection())
            {
                using (var cmd = con.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Collector";
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            if (_sqlService.HasColumn(reader, "LoginCollector"))
                            {
                                res += reader["LoginCollector"];
                            }
                        }
                    }
                    return res;
                }
            }
        }

        public async Task<string> UserAuthentification(string login, string password)
        {
            string res = "";
            using (SqlConnection conn = await _sqlService.GetConnection())
            {
                using (SqlCommand cmd = new SqlCommand("Authentification", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Login", login);
                    cmd.Parameters.AddWithValue("@Password", password);
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            if (_sqlService.HasColumn(reader, "LoginCollector"))
                            {
                                res = (string)reader["LoginCollector"];
                            }
                        }
                    }
                }
            }
            return res;
        }
    }
}
