using Creed.DataAccess;
using Creed.Messaging;
using Goals.Common.Dtos;
using Goals.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Goals.Service;

public class UserService
{
    private readonly PasswordHasher<object> _hasher = new();
    private string connectionString = "";
    public UserService(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
    }


    public ResponseMessage VerifySmsCode(RequestMessage request)
    {
        var phone = request.Get<string>("UserPhoneNumber");
        var code = request.Get<string>("VerificationCode");

        var eUser = new EUser(new Database(connectionString));
        var isSuccess = eUser.VerifyPhoneCode(phone, code);

        if (isSuccess)
            return ResponseMessage.Success("Doğrulama başarılı, hesabınız aktif edildi.");
    
        return ResponseMessage.Error("Kod hatalı veya daha önce doğrulanmış.");
        
    }
    
    public ResponseMessage GetUser(RequestMessage request)
    {
        
        var dto = request.Get<UserDto>();
        
        EUser eUser = new EUser(new Database(connectionString));           
        var response = eUser.GetUserWithUserPhoneNumber(dto);
        
        return ResponseMessage.Success(response);
        
    }
    
    
    public bool UpdateUserPhoto(UserDto userId, string path)
    {
        var eUser = new EUser(new Database(connectionString));
        return eUser.UpdatePhotoPath(userId, path);
    }
    
    public ResponseMessage GetUserById(RequestMessage request)
    {
        
        var dto = request.Get<UserDto>();
        
        EUser eUser = new EUser(new Database(connectionString));           
        var response = eUser.GetUserById(dto);
        
        return ResponseMessage.Success(response);
        
    }
    
    public ResponseMessage LoginUser(RequestMessage request)
    {
        
        var dto = request.Get<UserDto>();
        var eUser = new EUser(new Database(connectionString));

        var userFromDb = eUser.GetUserByEmail(dto.UserEmail);
        if (userFromDb == null)
            return ResponseMessage.Success("Kullanıcı bulunamadı.");

        var hasher = new PasswordHasher<object>();
        var result = hasher.VerifyHashedPassword(null, userFromDb.UserPassword, dto.UserPassword);

        if (result == PasswordVerificationResult.Success)
        {
            // Şifre doğruysa döndür
            return ResponseMessage.Success(userFromDb);
        }

        return ResponseMessage.Success("Şifre yanlış.");
    }


    public ResponseMessage RegisterUser(RequestMessage request)
    {
        var dto = request.Get<UserDto>();                      // DTO nesnesini al
        var base64 = request._items["Base64File"]?.ToString();        // Base64 stringi ayrı al

        if (!string.IsNullOrEmpty(base64))
        {
            dto.UserPhotoPath = base64;                        // ✅ Base64 değeri DTO'ya yaz
        }
        
        var hashedPassword = _hasher.HashPassword(null, dto.UserPassword);
        dto.UserPassword = hashedPassword;
        



        EUser eUser = new EUser(new Database(connectionString));
        var response = eUser.CreateUser(dto, ""); // Şu an için SMS kodu göndermiyoruz, boş bırakıyoruz

        return ResponseMessage.Success(response);
    }
    
    
    public async Task<ResponseMessage> RegisterUserAsync(RequestMessage request)
    {
        var dto = request.Get<UserDto>();
        var base64 = request._items["Base64File"]?.ToString();
        if (!string.IsNullOrEmpty(base64))
            dto.UserPhotoPath = base64;

        dto.UserPassword = _hasher.HashPassword(null, dto.UserPassword);

        var code = new Random().Next(100000, 999999).ToString();

        // SMS Gönderimi
        var smsService = new TextMessageService();
        await smsService.SendSmsAsync(dto.UserPhoneNumber, $"Doğrulama Kodunuz: {code}");

        // EUser üzerinden kayıt
        EUser eUser = new EUser(new Database(connectionString));
        var response = eUser.CreateUser(dto, code); // Aşağıda sp’ye de gömüyoruz

        return ResponseMessage.Success(response);
    }

    
}