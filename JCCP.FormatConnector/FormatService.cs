using JCCP.BO;
using JCCP.SqlConnector;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.FormatConnector
{
    public interface IFormatService
    {
        Task<bool> CreateNewFormat(Format newFormat);
        Task<List<Format>> GetAllFormats();
    }

    public class FormatService : IFormatService
    {
        private readonly ISqlService _sqlService;

        public FormatService(ISqlService sqlService)
        {
            _sqlService = sqlService;
        }

        public async Task<bool> CreateNewFormat(Format newFormat)
        {
            using(SqlConnection conn = await _sqlService.GetConnection())
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "CreateNewFormatType";
                    cmd.Parameters.AddWithValue("@frenchName", newFormat.FrenchName);
                    cmd.Parameters.AddWithValue("@englishName", newFormat.EnglishName);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return true;
        }

        public async Task<List<Format>> GetAllFormats()
        {
            List<Format> res = new List<Format>();
            using(SqlConnection conn = await _sqlService.GetConnection())
            {
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "GetAllFormat";
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Format format = new Format();
                            Fill(reader, format);
                            res.Add(format);
                        }
                    }
                }
            }
            return res;
        }

        private void Fill(SqlDataReader reader, Format format)
        {
            format.FormatId = _sqlService.HasColumn(reader, "TypeId") ? (Guid) reader["TypeId"] : Guid.Empty;
            format.FrenchName = _sqlService.HasColumn(reader, "FrenchName") ? (string)reader["FrenchName"] : "";
            format.EnglishName = _sqlService.HasColumn(reader, "EnglishName") ? (string)reader["EnglishName"] : "";
        }
    }


}
