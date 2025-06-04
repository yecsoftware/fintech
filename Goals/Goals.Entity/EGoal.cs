using System.Data;
using Creed.DataAccess;
using Creed.Messaging;
using Goals.Common.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Goals.Entity;

public class EGoal
{
    private Database _database;
    public EGoal(Database db)
    {
        _database = db;
    }
    public ResponseMessage GetGaolsById()
    {
        ResponseMessage response = new ResponseMessage();
        
        
        ///fgdfgdfgdgd
        var parameters = new DatabaseParameters();
        // parameters.Add("GoalId", dto.GoalId); //dto.GoalId
        // parameters.Add("UserId", dto.UserId); //dto.UserId
        // parameters.Add("Name", dto.GoalName); // dto.Name
        // parameters.Add("Description", dto.GoalDescription); // dto.Description
        
        var result = _database.ExecuteDataSet("sp_GetGoals", parameters);

        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            var goalsList = new List<GoalDto>();

            foreach (DataRow row in result.Tables[0].Rows)
            {
                goalsList.Add(new GoalDto
                { 
                    GoalId = Convert.ToInt32(row["GoalId"]),
                    GoalName = row["GoalName"].ToString(),
                    GoalDescription = row["GoalDescription"].ToString(),
                    UserId = row["UserId"] != DBNull.Value ? Guid.Parse(row["UserId"].ToString()) : new Guid()
                });
            }
            
        }

        return response;

    }
    
    public List<GoalDto> GetGaolsByIdWithResponse(GoalDto dto)
    { 
        var goalsList = new List<GoalDto>();
        try
        {
            var parameters = new DatabaseParameters();

            parameters.Add("@ID", dto.UserId);
            var result = _database.ExecuteDataSet("sp_GetGoalsById", parameters);
           
            if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
            {
                

                foreach (DataRow row in result.Tables[0].Rows)
                {
                    goalsList.Add(new GoalDto
                    {

                        GoalId = Convert.ToInt32(row["GoalId"]),
                        GoalName = row["GoalName"].ToString(),
                        GoalDescription = row["GoalDescription"].ToString(),
                        UserId = row["UserId"] != DBNull.Value ? Guid.Parse(row["UserId"].ToString()) : new Guid()
                    });
                }
                
            }


        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        return goalsList;
    }
}

