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
    
    public ResponseMessage GetUser(RequestMessage request)
    {
        
        var dto = request.Get<UserDto>();
        
        EUser eUser = new EUser(new Database(connectionString));           
        var response = eUser.GetUserWithUserPhoneNumber(dto);
        
        return ResponseMessage.Success(response);
        
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
        var dto = request.Get<UserDto>();
        var hashedPassword = _hasher.HashPassword(null, dto.UserPassword);
        // Veritabanı işlemi için DTO'yu kullanıyoruz.
        dto.UserPassword = hashedPassword;
        EUser eUser = new EUser(new Database(connectionString));
        var response = eUser.CreateUser(dto);
    
        return ResponseMessage.Success(response);
    }
    
}