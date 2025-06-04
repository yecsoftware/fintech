namespace Goals.Common.Dtos;

public class CustomerDto
{
    public string CustomerNumber { get; set; }
    public int Status { get; set; }
    public int CustomerType { get; set; }
    public string TCNumber { get; set; }
    public string CustomerName { get; set; }
    public string CustomerSurname { get; set; }
    public string CustomerMotherName { get; set; }
    public string CustomerFatherName { get; set; }
    public DateTime? CustomerBirthDate { get; set; }
    public int CustomerGender { get; set; }
    public string MaritalStatus { get; set; }
    public DateTime? RecordDate { get; set; }
    public string RecordUser { get; set; }
    public string RecordScreenCode { get; set; }
}


public class CreateCustomerDto
{
    public string CustomerNumber { get; set; }
    public int Status { get; set; }
    public int CustomerType { get; set; }
    public string TCNumber { get; set; }
    public string CustomerName { get; set; }
    public string CustomerSurname { get; set; }
    public string CustomerMotherName { get; set; }
    public string CustomerFatherName { get; set; }
    public DateTime? CustomerBirthDate { get; set; }
    public int CustomerGender { get; set; }
    
    public string MaritalStatus { get; set; }
    
    public DateTime? RecordDate { get; set; }
    
    public string RecordUser { get; set; }
    
    public string RecordScreenCode { get; set; }
}

public class DeleteCustomerDto
{
    public string TCNumber { get; set; }
}

public class UpdateCustomerDto
{
    public string CustomerNumber { get; set; }
    public int Status { get; set; }
    public int CustomerType { get; set; }
    public string CustomerName { get; set; }
    public string CustomerSurname { get; set; }
    public string CustomerMotherName { get; set; }
    public string CustomerFatherName { get; set; }
    public int CustomerGender { get; set; }
    public string MaritalStatus { get; set; }
    public DateTime? RecordDate { get; set; }
    public string RecordUser { get; set; }
    public string RecordScreenCode { get; set; }
}

