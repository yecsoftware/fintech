using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Creed.DataAccess;

public class Database
{
    private readonly string _connectionString;
    private BaseDatabase _database;
    
    
    public Database(string cs)
    {
        //_connectionString = configuration.GetConnectionString("DefaultConnection");
        _connectionString = cs;
    }

    public BaseDatabase DatabaseInstance
    {
        get
        {
            if (_database == null)
            {
                Initialize();
            }
            return _database;
        }
    }
    
    protected void Initialize()
    {
        _database = new MssqlDatabase(_connectionString);
    }

    public DataSet ExecuteInternalDataSet(string spName, DatabaseParameters parameters)
    {
        return DatabaseInstance.ExecuteDataSet(spName, parameters);
    }

    private TResult Execute<TResult>(Func<TResult> command)
    {
        return command();
    }

    public DataSet ExecuteDataSet(string spName, DatabaseParameters parameters)
    {
        return Execute(() => ExecuteInternalDataSet(spName, parameters));
    }
}
