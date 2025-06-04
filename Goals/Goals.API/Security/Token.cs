using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Goals.Common.Dtos;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Goals.API.Security;

public class Token
{
    
    private static Dictionary<string, string> _refreshTokenStore = new();
    
    //JWtAyarları
    public string? Key { get; set; }
    public string? Issuer { get; set; }
    public string? Audience { get; set; }
    
    
    public bool ValidateRefreshToken(string userId, string refreshToken)
    {
        return _refreshTokenStore.TryGetValue(userId, out var storedToken) && storedToken == refreshToken;
    }



    public TokenDto? CreateToken(UserDto user)
    {
        if (Key == null) throw new Exception("Token Key null olamaz.");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        
        var claims = new[]
        {
            new Claim(ClaimTypes.Email, user.UserEmail),
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.UserRole),
            
        };

        var token = new JwtSecurityToken(Issuer, Audience, claims, expires: DateTime.Now.AddMinutes(30), signingCredentials: credentials);
        var expireDate = DateTime.UtcNow.AddMinutes(30);
        var refreshToken = Guid.NewGuid().ToString();
        
        _refreshTokenStore[user.UserId] = refreshToken;


        
        
        
        return new TokenDto
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
            RefreshToken = refreshToken,
            ExpireDate = expireDate,
            UserId = user.UserId
        };
    }
    

}


