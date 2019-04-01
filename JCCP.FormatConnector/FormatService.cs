using JCCP.BO;
using JCCP.SqlConnector;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.FormatConnector
{
    public interface IFormatService
    {
        Task<bool> CreateNewFormat(Format newFormat);
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
    }


}
