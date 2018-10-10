using JCCP.BO;
using JCCP.SqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.ExtensionConnector
{
    public interface IExtensionService
    {
        Task<List<Extension>> GetAllExtensions();
    }

    public class ExtensionService : IExtensionService
    {
        private readonly ISqlService _sqlService;

        public ExtensionService(ISqlService service)
        {
            _sqlService = service;
        }

        public void Fill(SqlDataReader reader, Extension e)
        {
            e.ExtensionId = _sqlService.HasColumn(reader, "ExtensionId") ? (Guid)reader["ExtensionId"] : Guid.Empty;
            e.FrenchName = _sqlService.HasColumn(reader, "FrenchName") ? (string)reader["FrenchName"] : "";
            e.EnglishName = _sqlService.HasColumn(reader, "EnglishName") ? (string)reader["EnglishName"] : "";
            e.ImageUrl = _sqlService.HasColumn(reader, "ImageUrl") ? (string)reader["ImageUrl"] : "";
            e.LogoUrl = _sqlService.HasColumn(reader, "LogoUrl") ? (string)reader["LogoUrl"] : "";
            e.BlocId = _sqlService.HasColumn(reader, "BlocId") ? (Guid)reader["BlocId"] : Guid.Empty;
        }

        public async Task<List<Extension>> GetAllExtensions()
        {
            List<Extension> res = new List<Extension>();
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
                                Extension e = new Extension();
                                Fill(reader, e);
                                res.Add(e);
                            }
                        }
                    }
                }
            }
            return res;
        }
    }
}
