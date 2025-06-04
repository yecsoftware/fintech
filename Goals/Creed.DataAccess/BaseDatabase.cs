using System.Data.SqlClient;

namespace Creed.DataAccess;

using System;
using System.Data;
using System.Data.Common;

public abstract class BaseDatabase
{
    protected string ConnectionString;

    public abstract DataSet ExecuteDataSet(string spName, DatabaseParameters parameters);
    // using (var connection = new SqlConnection(_connectionString))
    // {
    //     using (var command = new SqlCommand(spName, connection))
    //     {
    //         command.CommandType = CommandType.StoredProcedure;
    //
    //         foreach (var param in parameters.GetParameters())
    //         {
    //             // Eğer SQL Server'da çalışıyorsan parametre adının başına @ ekleyerek işlem yapabilirsin.
    //             command.Parameters.AddWithValue("@" + param.Key, param.Value);
    //         }
    //
    //         var adapter = new SqlDataAdapter(command);
    //         var dataSet = new DataSet();
    //         adapter.Fill(dataSet);
    //         return dataSet;
    //     }
    // }


}
