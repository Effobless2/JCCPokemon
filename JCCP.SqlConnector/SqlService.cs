using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace JCCP.SqlConnector
{
    public interface ISqlService
    {
        bool HasColumn(SqlDataReader Reader, string ColumnName);
        Task<SqlConnection> GetConnection();
        void CloseCOnnection(SqlConnection connection);
    }

    public class SqlServiceOptions
    {
        public string ConnectionString { get; set; }
    }

    public class SqlService : ISqlService
    {

        private string _connectionString;

        public SqlService(IOptions<SqlServiceOptions> options)
        {
            _connectionString = options.Value.ConnectionString;
        }

        public void CloseCOnnection(SqlConnection connection)
        {
            connection.Close();
        }

       

        public async Task<SqlConnection> GetConnection()
        {
            SqlConnection connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            return connection;

        }

        public bool HasColumn(SqlDataReader Reader, string ColumnName)
        {
            foreach (System.Data.DataRow row in Reader.GetSchemaTable().Rows)
            {
                if (row["ColumnName"].ToString() == ColumnName)
                {
                    return true;
                }
            }
            return false;
        }
    }

    public static class SqlConnectionExtension
    {

        public static SqlCommand StoredProc(this SqlConnection connection, string StoredProcedureName)
        {
            SqlCommand command = connection.CreateCommand();
            command.CommandText = StoredProcedureName;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            return command;
        }
    }

}
