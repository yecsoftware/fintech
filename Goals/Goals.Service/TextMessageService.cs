namespace Goals.Service;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class TextMessageService
{
    private readonly HttpClient _httpClient;

    public TextMessageService()
    {
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("http://localhost:9090/");
    }

    public async Task<bool> SendSmsAsync(string phoneNumber, string message)
    {
        var payload = new
        {
            phone = phoneNumber,
            message = message,
            key = "textbelt"  // local instance default key
        };

        var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync("text", content);
        var responseString = await response.Content.ReadAsStringAsync();

        dynamic result = JsonConvert.DeserializeObject(responseString);
        return result.success == true;
    }
}