namespace Goals.Common.Dtos;

public class RefreshRequestDto
{
    public string? UserId { get; set; }
    public string RefreshToken { get; set; }
}