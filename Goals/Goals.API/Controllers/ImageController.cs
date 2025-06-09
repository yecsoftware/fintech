using Microsoft.AspNetCore.Mvc;
using Goals.Service;
using Microsoft.AspNetCore.Hosting;
using Creed.Messaging;
using Goals.Common.Dtos;
using System.Text.RegularExpressions;

namespace Goals.API.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ImageController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private readonly UserService _userService;

    public ImageController(IWebHostEnvironment env, UserService userService)
    {
        _env = env;
        _userService = userService;
    }

    [HttpPost]
    public IActionResult Upload([FromBody] RequestMessage request)
    {
        var userDto = request.Get<UserDto>("Goals.Common.Dtos.UserDto");
        var base64File = request.Get<string>("Base64File");
        
        
        if (userDto == null)
            return BadRequest("Kullanıcı nesnesi alınamadı.");

        if (!int.TryParse(userDto.UserId, out var userId) || userId <= 0)
            return BadRequest("Geçersiz kullanıcı ID.");

        if (string.IsNullOrEmpty(base64File))
            return BadRequest("Resim içeriği eksik.");

        // base64 veri ayrıştır (data:image/jpeg;base64,... kısmını temizle)
        var base64Pattern = @"^data:image\/[a-zA-Z]+;base64,";
        var cleanedBase64 = Regex.Replace(base64File, base64Pattern, "", RegexOptions.IgnoreCase);

        byte[] fileBytes;
        try
        {
            fileBytes = Convert.FromBase64String(cleanedBase64);
        }
        catch
        {
            return BadRequest("Geçersiz base64 formatı.");
        }

        var uploadsPath = Path.Combine(_env.WebRootPath, "uploads");
        if (!Directory.Exists(uploadsPath))
            Directory.CreateDirectory(uploadsPath);

        var fileName = $"{Guid.NewGuid()}.jpg";
        var filePath = Path.Combine(uploadsPath, fileName);
        System.IO.File.WriteAllBytes(filePath, fileBytes);

        var relativePath = $"uploads/{fileName}";
        var success = _userService.UpdateUserPhoto(userDto, relativePath);

        if (!success)
            return StatusCode(500, "Fotoğraf güncellenemedi.");

        var response = new ResponseMessage();
        response.Add("PhotoPath", relativePath);

        return Ok(response);
    }
}
