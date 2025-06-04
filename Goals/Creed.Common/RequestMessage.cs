using System.Text.Json;
using Newtonsoft.Json;
using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace Creed.Common;

public class RequestMessage
{
    public string Message { get; set; }
    public object? Data { get; set; }
  
}

// public static class RequestMessageExtensions
// {
//     public static T? Get<T>(this RequestMessage request)
//     {
//         if (request.Data == null)
//             return default;
//
//         try
//         {
//             var json = request.Data.ToString();
//             return JsonSerializer.Deserialize<T>(json);
//         }
//         catch (JsonException)
//         {
//             return default;
//         }
//     }
//     
// }


public static class RequestExtensions
{
    public static T Get<T>(this RequestMessage request) where T : class, new()
    {
        if (request == null || string.IsNullOrEmpty(request.Data.ToString()))
            return new T();
        var json = request.Data.ToString();
        return JsonConvert.DeserializeObject<T>(json);
    }
}

