using System.Data;
using Creed.DataAccess;
using Creed.Messaging;
using Goals.Common.Dtos;

namespace Goals.Entity;

public class EUser
{
    private Database _database;
    public EUser(Database database)
    {
        _database = database;
    }
    public UserDto GetUserById(UserDto dto)
    {
        var parameters = new DatabaseParameters();

        parameters.Add("USERID", dto.UserId);
        
        var result = _database.ExecuteDataSet("sp_GetUserById", parameters);
        
        
        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            var row = result.Tables[0].Rows[0];

            return new UserDto()
            {
                UserName = row["UserName"].ToString(),
                UserEmail = row["UserEmail"].ToString(),
                UserId = ((Guid)row["UserId"]).ToString(),
                UserRole = row["UserRole"].ToString()
            };
            
        }
        
        return null;
    }
    
    public UserDto GetUserWithUserPhoneNumber(UserDto dto)
    {
        var parameters = new DatabaseParameters();

        parameters.Add("UserPhoneNumber", dto.UserPhoneNumber);
        
        var result = _database.ExecuteDataSet("sp_GetUserWithUserPhoneNumber", parameters);
        
        
        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            var row = result.Tables[0].Rows[0];

            return new UserDto()
            {
                UserName = row["UserName"].ToString(),
                UserId = row["UserId"].ToString(),
            };
            
        }
        
        return null;
    }
    
    
    
    
    public UserDto GetUser(UserDto dto)
    {

        var parameters = new DatabaseParameters();
        parameters.Add("USEREMAIL", dto.UserEmail);
        // parameters.Add("USERPASSWORD", dto.UserPassword);
        
        var result = _database.ExecuteDataSet("sp_LoginUser", parameters);
        
        
        if (result.Tables.Count > 0  && result.Tables[0].Rows.Count > 0)
        {
            var row = result.Tables[0].Rows[0];

            return new UserDto()
            {
                UserName = row["UserName"].ToString(),
                UserEmail = row["UserEmail"].ToString(),
                UserPassword = row["UserPassword"].ToString(),
                UserId = ((Guid)row["UserId"]).ToString(),
                UserRole = row["UserRole"].ToString()
                
            };

        }
        return null;        
    }
    public UserDto GetUserByEmail(string email)
    {
        var parameters = new DatabaseParameters();
        parameters.Add("USEREMAIL", email);

        var result = _database.ExecuteDataSet("sp_LoginUser", parameters);

        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            var row = result.Tables[0].Rows[0];

            return new UserDto()
            {
                UserName = row["UserName"].ToString(),
                UserEmail = row["UserEmail"].ToString(),
                UserPassword = row["UserPassword"].ToString(), // hashli şifre
                UserId = row["UserId"].ToString(),
                UserRole = row["UserRole"].ToString()
            };
        }

        return null;
    }

    public UserDto CreateUser(UserDto dto)
    {
        var parameters = new DatabaseParameters();
        
        parameters.Add("UserName", dto.UserName);
        parameters.Add("UserEmail", dto.UserEmail);
        parameters.Add("UserPassword", dto.UserPassword);
        parameters.Add("UserRole", dto.UserRole ?? "user");
        
        
        var result = _database.ExecuteDataSet("sp_RegisterUser", parameters);
        
        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            var row = result.Tables[0].Rows[0];

            return new UserDto()
            {
                UserName = row["UserName"].ToString(),
                UserEmail = row["UserEmail"].ToString(),
                UserPassword = row["UserPassword"].ToString(),
                UserRole = row["UserRole"].ToString(),
            };
            
        }
        
        return null;
    }
}