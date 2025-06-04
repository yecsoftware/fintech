using Creed.DataAccess;
using Creed.Messaging;
using Goals.Common.Dtos;
using Goals.Entity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Goals.Service;

public class CustomerService
{
    private string connectionString = "";
    public CustomerService(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
    }
    public ResponseMessage GetCustomer(RequestMessage request)
    {
        var dto = request.Get<CustomerDto>();
        
        ECustomer eCustomer = new ECustomer(new Database(connectionString));           
        var response = eCustomer.GetCustomerByCustomerNumber(dto);
        
        return ResponseMessage.Success(response);
    }
    
    public ResponseMessage GetCustomerList(RequestMessage request)
    {
        var dto = request.Get<CustomerDto>();
        
        ECustomer eCustomer = new ECustomer(new Database(connectionString));           
        var response = eCustomer.GetCustomerByCustomerNumber(dto);
        
        return ResponseMessage.Success(response);
    }

    public ResponseMessage CreateCustomer(RequestMessage request)
    {
        var dto = request.Get<CreateCustomerDto>();
        ECustomer eCustomer = new ECustomer(new Database(connectionString));
        var response = eCustomer.CreateCustomer(dto);
        
        
        return ResponseMessage.Success(response);
    }

    public ResponseMessage? DeleteCustomer(RequestMessage request)
    {
        var dto = request.Get<CustomerDto>();
        
        ECustomer eCustomer = new ECustomer(new Database(connectionString));
        var result = eCustomer.DeleteCustomer(dto);

        // result zaten ResponseMessage dönüyorsa, cast ederek dön
        return result as ResponseMessage;
    }

    public object? UpdateCustomer(RequestMessage request)
    {
        var dto = request.Get<UpdateCustomerDto>();
        ECustomer eCustomer = new ECustomer(new Database(connectionString));
        var response = eCustomer.UptadeCustomer(dto);

        return response;
    }
}