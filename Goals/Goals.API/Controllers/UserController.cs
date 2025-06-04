using System.Security.Claims;
using System.Text.Json;
using Creed.Messaging;
using Goals.API.Security;
using Goals.Common.Dtos;
using Goals.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Goals.API.Controllers;

[ApiController]
[Route("[controller]/[action]")]

public class UserController:ControllerBase
{
    private readonly Token _token;
    private UserService _userService;
    private UserDto _user;

    public UserController(UserService us, IOptions<Token> token)
    {
        _userService = us;
        _token = token.Value;
    }


    // public async Task<IActionResult> token([FromBody] object body)
    // {
    //     
    //     var dto = JsonConvert.DeserializeObject<UserDto>(body.ToString());
    //     // var dtoUser = new UserDto{ UserEmail = dto.UserEmail, UserPassword = dto.UserPassword};
    //
    //     if (validateUser(dto))
    //     {
    //         var token = _token.CreateToken(dto);
    //      
    //         var resp = new {
    //             token = token,
    //             user = dto
    //         };
    //         return Ok(resp);    
    //     }
    //     else
    //     {
    //         return BadRequest("Kullanıcı bilgileri eksik.");
    //     } 
    // }
    //
    // private bool validateUser(UserDto dto)
    // {
    //     var req = new RequestMessage();
    //     req.Add(dto);
    //     var user = _userService.GetUser(req);
    //
    //     if (user != null)
    //     {
    //         return true;
    //     }
    //     
    //     return false;
    // }
    
    
    [HttpPost]
    public async Task<IActionResult> getUserWithToken(object request)
    {
        var jsonElement = (JsonElement)request;
        var reqDto = new UserDto()
        {
            UserEmail = jsonElement.GetProperty("UserEmail").GetString(),
            UserPassword = jsonElement.GetProperty("UserPassword").GetString()
        };
        var req = new RequestMessage();
        req.Add("Goals.Common.Dtos.UserDto",reqDto);
        var user = _userService.LoginUser(req);
        //var dto = JsonConvert.DeserializeObject<UserDto>(user.ToString());

        var dto = user.Get<UserDto>("Goals.Common.Dtos.UserDto");
        if (dto == null)
            return Unauthorized("Kullanıcı bulunamadı.");

        // Token üret
        var token = _token.CreateToken(dto);
        

        return Ok(new { token });
        
    }
    
    
    [HttpPost]
    public IActionResult RefreshToken([FromBody] RefreshRequestDto request)
    {
        if (!_token.ValidateRefreshToken(request.UserId, request.RefreshToken))
            return Unauthorized("Refresh token geçersiz veya bulunamadı.");

        var requestMessage = new RequestMessage();
        var dto = new UserDto { UserId = request.UserId };
        requestMessage.Add("Goals.Common.Dtos.UserDto", dto);

        var response = _userService.GetUserById(requestMessage);
        var user = response.Get<UserDto>("Goals.Common.Dtos.UserDto");

        var tokenDto = _token.CreateToken(user);
        return Ok(tokenDto);
    }
    
    
    [HttpGet]
    public IActionResult GenerateAdminHash()
    {
        var hasher = new PasswordHasher<object>();
        var hash = hasher.HashPassword(null, "Emre.135790");
        return Ok(hash);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> decodeUser(RequestMessage request)
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        var name = User.FindFirst(ClaimTypes.Name)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value;
        //var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var dto = new UserDto
        {
            UserEmail = email,
            UserName = name,
            UserRole = role,
            //UserId = id
        };

        var response = new ResponseMessage();
        response.Add("Goals.Common.Dtos.UserDto", dto);

        return Ok(response);
    }
    
    [HttpPost]
    public async Task<IActionResult> registerUser(RequestMessage request)
    {
        var user=  _userService.RegisterUser(request);
        return Ok(user);
    }
    
    //[Authorize]
    [HttpPost]
    public async Task<IActionResult> GetUserWithPhoneNumber(RequestMessage request)
    {
        var user = _userService.GetUser(request);
        return Ok(user);
    }
    
    
    
}