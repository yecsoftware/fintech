using System.Text.Json;
using Creed.DataAccess;
using Creed.Messaging;
using Goals.Common.Dtos;
using Goals.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Goals.API.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class GoalController : ControllerBase
{
    private GoalService _goalService;

    public GoalController(GoalService gs)
    {
        _goalService = gs;
    }
    
    
    

    [HttpGet]
    public IActionResult Get(RequestMessage request)
    {

        var goals=_goalService.GetGoals(request);
        return Ok(goals);
    }
    
    [HttpPost]
    public async Task<IActionResult>   GetWithParameter(RequestMessage request)
    {
        
        // burada bir RequestMessage nesnesi oluşturup içerisine dto'yu atayabiliriz.
        // yani RequestMessage nesnemizin bir property'si olan Data'ya dto'yu atayabiliriz.
        // var requestMessage = new RequestMessage();
        // requestMessage.Data = dto;
        
        //var requestMessage = request.Get<RequestMessage>();
        //var dto = JsonSerializer.Deserialize<GoalDto>(request.Data.ToString());

        
     //   requestMessage.Data = dto;
        var goals=  _goalService.GetGoalsWithResponse(request);
        return Ok(goals);
    }
}