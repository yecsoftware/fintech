namespace Creed.DataAccess;

using System.Data;

public class DatabaseParameter
{
    public string Name { get; }
    public object Value { get; }
    public DbType Type { get; }

    public DatabaseParameter(string name, object value, DbType type)
    {
        Name = name;
        Value = value;
        Type = type;
    }
}
