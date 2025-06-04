using System.Runtime.InteropServices.JavaScript;

namespace Goals.Common.Dtos;

public class AccountDto
{
    public string CustomerNumber { get; set; }
    public string AccountNumber { get; set; }
    public int AccountType { get; set; }
    public string AccountCurrencyType { get; set; }
    public bool AccountIsBlocked { get; set; }
    public double AccountBalance { get; set; }
    public DateTime? RecordDate { get; set; }
    public string RecordUser { get; set; }
    public string RecordScreenCode { get; set; }
}

public class CreateAccountDto
{
    public string CustomerNumber { get; set; }
    public string AccountNumber { get; set; }
    public int AccountType { get; set; }
    public string AccountCurrencyType { get; set; }
    public bool AccountIsBlocked { get; set; }
    public double AccountBalance { get; set; }
    public DateTime? RecordDate { get; set; }
    public string RecordUser { get; set; }
    public string RecordScreenCode { get; set; }
}



public class DeleteAccountDto
{
    public string AccountNumber { get; set; }
}


public class UpdateAccountDto
{
    public string CustomerNumber { get; set; }
    public string AccountNumber { get; set; }
    public int AccountType { get; set; }
    public string AccountCurrencyType { get; set; }
    public bool AccountIsBlocked { get; set; }
    public double AccountBalance { get; set; }
    public DateTime? RecordDate { get; set; }
    public string RecordUser { get; set; }
    public string RecordScreenCode { get; set; }
}