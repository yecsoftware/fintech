using Creed.Messaging;
using Goals.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Goals.API.Controllers;

[ApiController]
[Route("[controller]/[action]")]

public class CustomerController:ControllerBase
{
    private CustomerService _customerService;

    public CustomerController(CustomerService cs)
    {
        _customerService = cs;
    }
    

    [HttpPost]  
    public async Task<IActionResult> GetCustomerByCustomerNumber(RequestMessage request)
    {
        
        var customer=  _customerService.GetCustomer(request);
        return Ok(customer);
    }
    

    [HttpPost]
    
    public async Task<IActionResult>   CreateCustomer(RequestMessage request)
    {
        
        var customer=  _customerService.CreateCustomer(request);
        return Ok(customer);
    }

    [HttpPost]
    public async Task<IActionResult>   DeleteCustomer(RequestMessage request)
    {
        
        var customer=  _customerService.DeleteCustomer(request);
        return Ok(customer);
    }

    [HttpPut]
    public async Task<IActionResult>   UpdateCustomer(RequestMessage request)
    {
        
        var customer=  _customerService.UpdateCustomer(request);
        return Ok(customer);
    }
    
    
    
}
