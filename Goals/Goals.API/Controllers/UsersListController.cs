using Goals.API.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Goals.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UsersListController:ControllerBase
{
    
    [HttpGet]
    public IActionResult GetUserList()
    {
        return Ok(UsersList.Users);
    }
}