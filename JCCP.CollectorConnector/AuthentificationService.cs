using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.AuthentificationConnector
{
    public interface IAuthentificationService
    {
        Task<string> GetTest();
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
    }
}
