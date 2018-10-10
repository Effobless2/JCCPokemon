using JCCP.SqlConnector;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.ExtensionConnector
{
    public interface IExtensionService
    {
        Task<string> GetAllExtensions();
    }

    public class ExtensionService : IExtensionService
    {
        private readonly ISqlService _sqlService;

        public ExtensionService(ISqlService service)
        {
            _sqlService = service;
        }

        public async Task<string> GetAllExtensions()
        {
            string res = "";
            using (SqlConnection conn = await _sqlService.GetConnection())
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "GetAllExtensions";
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
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
