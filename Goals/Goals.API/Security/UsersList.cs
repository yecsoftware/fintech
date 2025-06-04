using Goals.Common.Dtos;

namespace Goals.API.Security;

public class UsersList
{
    public static List<UserDto> Users = new()
    {
        new UserDto
        {
            UserId = "1",
            UserPassword = "123456",
            UserName = "emre",
            UserEmail = "y.emrecoskun@icloud.com"
        }
    };
}