using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Creed.Messaging;
using Goals.API.Security;
using Microsoft.AspNetCore.Mvc;
using TokenHandler = Microsoft.IdentityModel.Tokens.TokenHandler;

using Goals.API.Security;
using Goals.Common.Dtos;
using JwtToken.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace JwtToken.Security;

[ApiController]
[Route("api/[controller]")]
public class ValuesController : ControllerBase
{
    private readonly Token _token;
    
    public ValuesController(IOptions<Token> token)
    {
        _token = token.Value;
    }
    

    

    // [HttpPost("login")]
    // public IActionResult GetToken([FromBody] UserDto user)
    // {
    //     var userDto = _token.DoAuthentication(user);
    //     if (userDto is null)
    //     {
    //         return NotFound("Kullanıcı bulunamadı.");
    //     }
    //     var token = _token.CreateToken(user);
    //     return Ok(new
    //     {
    //         token=token,
    //         user=userDto
    //     });
    // }
    



}