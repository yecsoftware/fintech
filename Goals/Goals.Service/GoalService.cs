using System.Text.Json;
using Creed.DataAccess;
using Creed.Messaging;
using Goals.Common.Dtos;
using Goals.Entity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Goals.Service;

public class GoalService
{
    private string connectionString = "";
    public GoalService(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
    }
    public ResponseMessage GetGoals(RequestMessage request)
    {
        EGoal eGoal = new EGoal(new Database(connectionString));
        var response = eGoal.GetGaolsById();
        return ResponseMessage.Success(response);
    }
    
    public object GetGoalsWithResponse(RequestMessage request)
    {
        
        //dto serialize işlemleri yapılacak. 
        // yukarda sana gelen request, aslında senin istediğin bir dto olacak. örn: DTOGoal
        // öyle bir method yazmalıyız ki request.Get<DTOGoal>() şeklinde kullanabilelim.
        // ve bu method bize DTOGoal tipinde bir nesne döndürmeli.
        // yani kod satırı şu şekilde olmalı: var dto = request.Get<DTOGoal>();
        // bu şekilde dto içerisindeki propertylerdeki değerlere ulaşabiliriz.
        //
        //var dto = new GoalDto();

        //deneme
        
        //deneme

        // `request.Get<T>()` methodu kullanılarak DTO'ya çeviriyoruz.
        var dto = request.Get<GoalDto>();
        
        // Veritabanı işlemi için DTO'yu kullanıyoruz.
        EGoal eGoal = new EGoal(new Database(connectionString));
        var response = eGoal.GetGaolsByIdWithResponse(dto);
    
        return ResponseMessage.Success();
    }
}