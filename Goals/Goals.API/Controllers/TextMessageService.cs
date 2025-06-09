namespace Goals.API.Controllers;

public class TextMessageService
{
    private readonly HttpClient _httpClient;

    public TextMessageService()
    {
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("http://localhost:9090"); // veya remote sunucuysa IP
    }

    public async Task<bool> SendSmsAsync(string phoneNumber, string message)
    {
        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("phone", phoneNumber),
            new KeyValuePair<string, string>("message", message),
            new KeyValuePair<string, string>("key", "textbelt")
        });

        var response = await _httpClient.PostAsync("/text", content);
        var responseContent = await response.Content.ReadAsStringAsync();

        return responseContent.Contains("\"success\":true");
    }
}