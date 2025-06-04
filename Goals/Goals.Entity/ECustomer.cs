using System.Data;
using Creed.DataAccess;
using Creed.Messaging;
using Goals.Common.Dtos;

namespace Goals.Entity;

public class ECustomer
{
    private Database _database;
    public ECustomer(Database db)
    {
        _database = db;
    }
    
    
    public CustomerDto GetCustomerByCustomerNumber(CustomerDto dto)
    {

        var parameters = new DatabaseParameters();
        parameters.Add("TCNUMBER", dto.TCNumber);
        
        var result = _database.ExecuteDataSet("sp_GetCustomerByCustomerNumber", parameters);
        
        
        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            var row = result.Tables[0].Rows[0];

            return new CustomerDto
            {
                CustomerNumber = row["CustomerNumber"].ToString(),
                Status = Convert.ToInt32(row["Status"]),
                CustomerType = Convert.ToInt32(row["CustomerType"]),
                TCNumber = row["TCNumber"].ToString(),
                CustomerName = row["CustomerName"].ToString(),
                CustomerSurname = row["CustomerSurname"].ToString(),
                CustomerMotherName = row["CustomerMotherName"].ToString(),
                CustomerFatherName = row["CustomerFatherName"].ToString(),
                CustomerBirthDate = row["CustomerBirthDate"] != DBNull.Value ? Convert.ToDateTime(row["CustomerBirthDate"]) : (DateTime?)null,
                CustomerGender = Convert.ToInt32(row["CustomerGender"]),
                MaritalStatus = row["MaritalStatus"].ToString(),
                RecordDate = row["RecordDate"] != DBNull.Value ? Convert.ToDateTime(row["RecordDate"]) : (DateTime?)null,
                RecordUser = row["RecordUser"].ToString(),
                RecordScreenCode = row["RecordScreenCode"].ToString()
            };

        }
        return null;        
    }

    public CustomerDto CreateCustomer(CreateCustomerDto dto)
    {
        
        var parameters = new DatabaseParameters();
        parameters.Add("CustomerNumber", dto.CustomerNumber);
        parameters.Add("Status", dto.Status);
        parameters.Add("CustomerType", dto.CustomerType);
        parameters.Add("TCNumber", dto.TCNumber);
        parameters.Add("CustomerName", dto.CustomerName);
        parameters.Add("CustomerSurname", dto.CustomerSurname);
        parameters.Add("CustomerMotherName", dto.CustomerMotherName);
        parameters.Add("CustomerFatherName", dto.CustomerFatherName);
        parameters.Add("CustomerBirthDate", dto.CustomerBirthDate);
        parameters.Add("CustomerGender", dto.CustomerGender);
        parameters.Add("MaritalStatus", dto.MaritalStatus);
        parameters.Add("RecordDate", dto.RecordDate);
        parameters.Add("RecordUser", dto.RecordUser);
        parameters.Add("RecordScreenCode", dto.RecordScreenCode);
        
        var result = _database.ExecuteDataSet("sp_CreateCustomer", parameters);

        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            var row = result.Tables[0].Rows[0];

            return new CustomerDto
            {
                CustomerNumber = row["CustomerNumber"].ToString(),
                Status = Convert.ToInt32(row["Status"]),
                CustomerType = Convert.ToInt32(row["CustomerType"]),
                TCNumber = row["TCNumber"].ToString(),
                CustomerName = row["CustomerName"].ToString(),
                CustomerSurname = row["CustomerSurname"].ToString(),
                CustomerMotherName = row["CustomerMotherName"].ToString(),
                CustomerFatherName = row["CustomerFatherName"].ToString(),
                CustomerBirthDate = row["CustomerBirthDate"] != DBNull.Value ? Convert.ToDateTime(row["CustomerBirthDate"]) : (DateTime?)null,
                CustomerGender = Convert.ToInt32(row["CustomerGender"]),
                MaritalStatus = row["MaritalStatus"].ToString(),
                RecordDate = row["RecordDate"] != DBNull.Value ? Convert.ToDateTime(row["RecordDate"]) : (DateTime?)null,
                RecordUser = row["RecordUser"].ToString(),
                RecordScreenCode = row["RecordScreenCode"].ToString()
            };

        }
        
        return null;
        
    }

    public object DeleteCustomer(CustomerDto dto)
    {
        var parameters = new DatabaseParameters();
        parameters.Add("TCNUMBER", dto.TCNumber);
    
        var result = _database.ExecuteDataSet("sp_DeleteCustomerByCustomerNumber", parameters);

        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            var row = result.Tables[0].Rows[0];
            string resultCode = row["ResultCode"].ToString();

            if (resultCode == "SUCCESS")
            {
                return ResponseMessage.Success(new {
                    ResultCode = "SUCCESS",
                    ResultMessage = "Kayıt başarıyla silindi."
                });
            }
            else if (resultCode == "NOT_FOUND")
            {
                return ResponseMessage.NotFound(new {
                    ResultCode = "NOT_FOUND",
                    ResultMessage = "Silinecek kayıt bulunamadı."
                });
            }
            
        }

        return ResponseMessage.Error(new {
            ResultCode = "ERROR",
            ResultMessage = "Beklenmedik bir hata oluştu."
        });
    }


    public object? UptadeCustomer(UpdateCustomerDto? dto)
    {
        
        var parameters = new DatabaseParameters();
        parameters.Add("CustomerNumber", dto.CustomerNumber);
        parameters.Add("Status", dto.Status);
        parameters.Add("CustomerType", dto.CustomerType);
        parameters.Add("CustomerName", dto.CustomerName);
        parameters.Add("CustomerSurname", dto.CustomerSurname);
        parameters.Add("CustomerMotherName", dto.CustomerMotherName);
        parameters.Add("CustomerFatherName", dto.CustomerFatherName);
        parameters.Add("CustomerGender", dto.CustomerGender);
        parameters.Add("MaritalStatus", dto.MaritalStatus);
        parameters.Add("RecordDate", dto.RecordDate);
        parameters.Add("RecordUser", dto.RecordUser);
        parameters.Add("RecordScreenCode", dto.RecordScreenCode);
        
        var result = _database.ExecuteDataSet("sp_UpdateCustomer", parameters);
        
        var customersList = new List<UpdateCustomerDto>();

        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
           
            foreach (DataRow row in result.Tables[0].Rows)
            {
                customersList.Add(new UpdateCustomerDto()
                { 
                    Status = Convert.ToInt32(row["Status"]),
                    CustomerType = Convert.ToInt32(row["CustomerType"]),
                    CustomerName = row["CustomerName"].ToString(),
                    CustomerSurname = row["CustomerSurname"].ToString(),
                    CustomerMotherName = row["CustomerMotherName"].ToString(),
                    CustomerFatherName = row["CustomerFatherName"].ToString(),
                    CustomerGender = Convert.ToInt32(row["CustomerGender"]),
                    MaritalStatus = row["MaritalStatus"].ToString(),
                    RecordDate = row["RecordDate"] != DBNull.Value ? Convert.ToDateTime(row["RecordDate"]) : (DateTime?)null,
                    RecordUser = row["RecordUser"].ToString(),
                    RecordScreenCode = row["RecordScreenCode"].ToString()
                });
            }
            
            
        }
        return customersList;
    }
}