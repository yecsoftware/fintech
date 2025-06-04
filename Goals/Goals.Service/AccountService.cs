using Creed.DataAccess;
using Creed.Messaging;
using Goals.Common.Dtos;
using Goals.Entity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Goals.Service;

public class AccountService
{
    private string connectionString = "";
    public AccountService(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
    }
    public ResponseMessage GetAccount(RequestMessage request)
    {
        var dto = request.Get<AccountDto>();
        EAccount eAccount = new EAccount(new Database(connectionString));           
        var response = eAccount.GetAccountByAccountNumber(dto);
        
        return ResponseMessage.Success(response);
    }

    public object? CreateAccount(RequestMessage request)
    {
        var dto = request.Get<CreateAccountDto>();
        
        EAccount eAccount = new EAccount(new Database(connectionString));           
        var response = eAccount.CreateAccount(dto);
        
        return response;
    }

    public object? DeleteAccount(RequestMessage request)
    {
        var dto = request.Get<AccountDto>();
        
        EAccount eAccount = new EAccount(new Database(connectionString));           
        var response = eAccount.DeleteAccount(dto);
        
        return response;
    }

    public object? UpdateAccount(RequestMessage request)
    {
        var dto = request.Get<AccountDto>();
        
        EAccount eAccount = new EAccount(new Database(connectionString));           
        var response = eAccount.UpdateAccount(dto);
        
        return response;
    }

    public ResponseMessage GetAllAccounts()
    {
        
        EAccount eAccount = new EAccount(new Database(connectionString));
        var request = new RequestMessage();
        var response = eAccount.GetAllAccounts();
        return ResponseMessage.Success(response);
        
    }
}