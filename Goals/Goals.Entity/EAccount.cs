using System.Data;
using Creed.DataAccess;
using Goals.Common.Dtos;

namespace Goals.Entity;

public class EAccount
{

    private Database _database;

    public EAccount(Database db)
    {
        _database = db;
    }

    public List<AccountDto> GetAccountByAccountNumber(AccountDto dto)
    {
        var parameters = new DatabaseParameters();
        parameters.Add("ACCOUNTNUMBER", dto.AccountNumber);

        var result = _database.ExecuteDataSet("sp_GetAccountByAccountNumber", parameters);

        var customersList = new List<AccountDto>();
        
        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {

            foreach (DataRow row in result.Tables[0].Rows)
            {
                customersList.Add(new AccountDto()
                {
                    AccountNumber = row["AccountNumber"].ToString(),
                    CustomerNumber = row["CustomerNumber"].ToString(),
                    AccountType = Convert.ToInt32(row["AccountType"]),
                    AccountCurrencyType = row["AccountCurrencyType"].ToString(),
                    AccountIsBlocked = Convert.ToBoolean(row["AccountIsBlocked"]),
                    AccountBalance = Convert.ToDouble(row["AccountBalance"]),
                    RecordDate = row["RecordDate"] != DBNull.Value
                        ? Convert.ToDateTime(row["RecordDate"])
                        : (DateTime?)null,
                    RecordUser = row["RecordUser"].ToString(),
                    RecordScreenCode = row["RecordScreenCode"].ToString()
                });
            }

        }

        return customersList;

    }

    public object? CreateAccount(CreateAccountDto? dto)
    {
        var parameters = new DatabaseParameters();
        parameters.Add("@CustomerNumber", dto.CustomerNumber);
        parameters.Add("@AccountNumber", dto.AccountNumber);
        parameters.Add("@AccountType", dto.AccountType);
        parameters.Add("@AccountCurrencyType", dto.AccountCurrencyType);
        parameters.Add("@AccountIsBlocked", dto.AccountIsBlocked);
        parameters.Add("@AccountBalance", dto.AccountBalance);
        parameters.Add("@RecordDate", dto.RecordDate);
        parameters.Add("@RecordUser", dto.RecordUser);
        parameters.Add("@RecordScreenCode", dto.RecordScreenCode);

        var result = _database.ExecuteDataSet("sp_CreateAccount", parameters);

        var customersList = new List<CreateAccountDto>();
        
        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {

            foreach (DataRow row in result.Tables[0].Rows)
            {
                customersList.Add(new CreateAccountDto()
                {
                    AccountNumber = row["AccountNumber"].ToString(),
                    CustomerNumber = row["CustomerNumber"].ToString(),
                    AccountType = Convert.ToInt32(row["AccountType"]),
                    AccountCurrencyType = row["AccountCurrencyType"].ToString(),
                    AccountIsBlocked = Convert.ToBoolean(row["AccountIsBlocked"]),
                    AccountBalance = Convert.ToDouble(row["AccountBalance"]),
                    RecordDate = row["RecordDate"] != DBNull.Value
                        ? Convert.ToDateTime(row["RecordDate"])
                        : (DateTime?)null,
                    RecordUser = row["RecordUser"].ToString(),
                    RecordScreenCode = row["RecordScreenCode"].ToString()
                });
            }
            
            
        }

        return customersList;
    }

    public object? DeleteAccount(AccountDto? dto)
    {
        var parameters = new DatabaseParameters();
        parameters.Add("@AccountNumber", dto.AccountNumber);

        var result = _database.ExecuteDataSet("sp_DeleteAccountByAccountNumber", parameters);
        
        var customersList = new List<DeleteAccountDto>();
        
        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
           

            foreach (DataRow row in result.Tables[0].Rows)
            {
                customersList.Add(new DeleteAccountDto()
                {
                    AccountNumber = row["AccountNumber"].ToString(),
                });
            }

           

        }

        return customersList;
    }

    public object? UpdateAccount(AccountDto? dto)
    {

        var parameters = new DatabaseParameters();
        parameters.Add("@CustomerNumber", dto.CustomerNumber);
        parameters.Add("@AccountNumber", dto.AccountNumber);
        parameters.Add("@AccountType", dto.AccountType);
        parameters.Add("@AccountCurrencyType", dto.AccountCurrencyType);
        parameters.Add("@AccountIsBlocked", dto.AccountIsBlocked);
        parameters.Add("@AccountBalance", dto.AccountBalance);
        parameters.Add("@RecordDate", dto.RecordDate);
        parameters.Add("@RecordUser", dto.RecordUser);
        parameters.Add("@RecordScreenCode", dto.RecordScreenCode);

        var result = _database.ExecuteDataSet("sp_UpdateAccount", parameters);
        
        var customersList = new List<UpdateAccountDto>();

        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
           
            foreach (DataRow row in result.Tables[0].Rows)
            {
                customersList.Add(new UpdateAccountDto()
                {
                    AccountNumber = row["AccountNumber"].ToString(),
                    CustomerNumber = row["CustomerNumber"].ToString(),
                    AccountType = Convert.ToInt32(row["AccountType"]),
                    AccountCurrencyType = row["AccountCurrencyType"].ToString(),
                    AccountIsBlocked = Convert.ToBoolean(row["AccountIsBlocked"]),
                    AccountBalance = Convert.ToDouble(row["AccountBalance"]),
                    RecordDate = row["RecordDate"] != DBNull.Value
                        ? Convert.ToDateTime(row["RecordDate"])
                        : (DateTime?)null,
                    RecordUser = row["RecordUser"].ToString(),
                    RecordScreenCode = row["RecordScreenCode"].ToString()
                });
            }

        }

        return customersList;
    }

    public UpdateAccountDto GetAllAccounts()
    {

        var parameters = new DatabaseParameters();

        var result = _database.ExecuteDataSet("sp_GetAllAccounts", parameters);
        
        var customersList = new List<UpdateAccountDto>();
        
        if (result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
        {
            

            foreach (DataRow row in result.Tables[0].Rows)
            {
                customersList.Add(new UpdateAccountDto()
                {
                    AccountNumber = row["AccountNumber"].ToString(),
                    CustomerNumber = row["CustomerNumber"].ToString(),
                    AccountType = Convert.ToInt32(row["AccountType"]),
                    AccountCurrencyType = row["AccountCurrencyType"].ToString(),
                    AccountIsBlocked = Convert.ToBoolean(row["AccountIsBlocked"]),
                    AccountBalance = Convert.ToDouble(row["AccountBalance"]),
                    RecordDate = row["RecordDate"] != DBNull.Value
                        ? Convert.ToDateTime(row["RecordDate"])
                        : (DateTime?)null,
                    RecordUser = row["RecordUser"].ToString(),
                    RecordScreenCode = row["RecordScreenCode"].ToString()
                });
            }

        }
        return customersList.FirstOrDefault();
    }
}