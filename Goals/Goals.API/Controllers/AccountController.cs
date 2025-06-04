using Creed.Messaging;
using Goals.Service;
using Microsoft.AspNetCore.Mvc;

namespace Goals.API.Controllers;

[ApiController]
[Route("[controller]/[action]")]

public class AccountController:ControllerBase
{
    private AccountService _accountService;

    public AccountController(AccountService accountServices)
    {
        _accountService = accountServices ; 
    }
    
    
    [HttpGet]
    public async Task<ActionResult> GetAccounts()
    {
        var account = _accountService.GetAllAccounts();
        return Ok(account);
    }
    

    [HttpPost]
    public async Task<IActionResult>   GetAccountByAccountNumber(RequestMessage request)
    {
        var account=  _accountService.GetAccount(request);
        return Ok(account);
    }
    

    [HttpPost]
    public async Task<IActionResult>   CreateAccount(RequestMessage request)
    {
        
        var account=  _accountService.CreateAccount(request);
        return Ok(account);
    }

    [HttpDelete]
    public async Task<IActionResult>   DeleteCustomer(RequestMessage request)
    {
        
        var account=  _accountService.DeleteAccount(request);
        return Ok(account);
    }
    

    [HttpPut]
    public async Task<IActionResult>   UpdateCustomer(RequestMessage request)
    {
        
        var account=  _accountService.UpdateAccount(request);
        return Ok(account);
    }
}