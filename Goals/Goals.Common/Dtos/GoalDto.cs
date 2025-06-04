namespace Goals.Common.Dtos;

public class GoalDto
{
    public int GoalId { get   ; set; }
    public string GoalName { get; set; }
    public string GoalDescription { get; set; }
    public Guid UserId { get; set; }

}