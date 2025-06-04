
using Newtonsoft.Json;

namespace Creed.Messaging;

public abstract class BaseMessage
{
    [Newtonsoft.Json.JsonIgnore]
    public Dictionary<string, object> _items { get; set; }

    [JsonProperty("_items")]
    public Dictionary<string, object> ItemsProxy
    {
        get => _items.Count > 0 ? _items : null;
        set => _items = value ?? null;
    }

    public BaseMessage()
    {
        _items = new();
    }
    
    protected BaseMessage WithItems(object[] dtoList, bool isClear = true)
    {
        if (dtoList == null || !dtoList.Any())
        {
            return this;
        }
            
        if (isClear)
        {
            _items.Clear();
        }
        
        foreach (var item in dtoList)
        {
            var key = item.GetType().FullName;
            if (_items.ContainsKey(key))
            {
                _items.Remove(key);
            }
            
            _items.Add(key, item);
        }

        return this;
    }
    
    
    public void Add(Type type, object dto)
    {
        var key = type.FullName;
        if (_items.ContainsKey(key))
            _items[key] = dto;
        else
            _items.Add(key, dto);
    }

    public void Add<T>(string name, T dto) where T : class => _items.Add(name, dto);
    public void Add<T>(T dto) where T : class => Add(typeof(T), dto);
    public void Add<T>(Type type, object dto) => Add(type.FullName!, dto);
    
    // public T Get<T>(string key)
    // {
    //     if (!_items.ContainsKey(key) || _items[key] == null)
    //     {
    //         return default;
    //     }
    //
    //     var type = _items[key].GetType();
    //     if (type.FullName.Contains("Newtonsoft") || type.FullName.Contains("Json"))
    //     {
    //         var data = JsonConvert.DeserializeObject<T>(_items[key].ToString());
    //         return data;
    //     }
    //     return default;
    // }
    
    public T Get<T>(string key)
    {
        if (!_items.ContainsKey(key) || _items[key] == null)
            return default;
    
        var value = _items[key];
    
        // Eğer zaten doğru tipteyse direkt döndür
        if (value is T typedValue)
            return typedValue;
    
        // Eğer string olarak tutuluyorsa, deserialize et
        if (value is string jsonString)
            return JsonConvert.DeserializeObject<T>(jsonString);
    
        // Eğer JsonElement gibi bir şeyse veya tanımlanamayan bir formatta ise fallback
        var typeName = value.GetType().FullName ?? "";
    
        if (typeName.Contains("Newtonsoft") || typeName.Contains("System.Text.Json") || typeName.Contains("JsonElement"))
            return JsonConvert.DeserializeObject<T>(value.ToString());
    
        // Default fallback
        return default;
    }
    
    public T Get <T>() => Get<T>(typeof(T).FullName);
}