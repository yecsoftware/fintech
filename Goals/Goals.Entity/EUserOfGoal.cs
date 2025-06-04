using Goals.Common.Dtos;

namespace Goals.Entity;

public class EUserOfGoal
{
    
    public int EUserOfGoalId { get; set; }

    // Foreign Key (User)
    public Guid UserId { get; set; }
    public EUser User { get; set; }

    // Foreign Key (Goal)
    public int GoalId { get; set; }
    public EGoal Goal { get; set; }
    
}