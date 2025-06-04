using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace Creed.DataAccess;

public class MssqlDatabase:BaseDatabase
{

    private readonly string prefixParam = "@";
    public MssqlDatabase(string _connectionString)
    {
        ConnectionString = _connectionString;
    }

    public override DataSet ExecuteDataSet(string spName, DatabaseParameters parameters)
    {
        DataSet dataSet = new DataSet();

        using (SqlConnection connection = new SqlConnection(ConnectionString))
        {
            connection.Open();

            using (SqlCommand command = new SqlCommand(spName,connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                if (parameters != null)
                {
                    foreach (var param in parameters)
                    {
                        //command.Parameters.Add(new SqlParameter(param.Name, param.Type) { Value = param.Value });
                        command.Parameters.Add(new SqlParameter() { Value = param.Value, ParameterName = prefixParam + param.Name});
                    }
                }

                using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                {
                    adapter.Fill(dataSet);
                }
            }

            return dataSet;
        }
        

        // DataAdaper Kullanımı, Öğrenilecek
        
        
        // MSSQL connection oluştur ve aç
        // MSSQL command oluştur ve parametreleri ekle
        // commant Type belirle Stored procedure olarak belirleyecek
        // parametreleri olacak. bunları senin parameters propertYnden çek.
        // for ile bu parametreleri dönerek  command içindeki parametrelere eklenecek. 
        // MSSQL DataAdapter oluştur ve verileri çek
        // geriye DataSet nesnesi dönecek şekilde DataSet fill ile veriyi doldur.
        
        return null;
    }
}