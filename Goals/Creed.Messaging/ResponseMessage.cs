using System.Net;

namespace Creed.Messaging;

public class ResponseMessage : BaseMessage
{
    public bool IsSuccess { get; set; }

    public static ResponseMessage Success(HttpStatusCode status, params object[] dtoList)
    {
        return new ResponseMessage
        {
            IsSuccess = Convert.ToInt32(status) / 100 == 2,
        }.WithItems(dtoList) as ResponseMessage;
    }

    public static ResponseMessage Success(params object[] dtoList) => Success(HttpStatusCode.OK, dtoList);

    // Yeni eklenen fonksiyonlar (Success yapısını örnek alır):

    public static ResponseMessage NotFound(params object[] dtoList)
    {
        return new ResponseMessage
        {
            IsSuccess = false
        }.WithItems(dtoList) as ResponseMessage;
    }

    public static ResponseMessage Error(params object[] dtoList)
    {
        return new ResponseMessage
        {
            IsSuccess = false
        }.WithItems(dtoList) as ResponseMessage;
    }

    public static ResponseMessage Validation(params object[] dtoList)
    {
        return new ResponseMessage
        {
            IsSuccess = false
        }.WithItems(dtoList) as ResponseMessage;
    }

    public static ResponseMessage Custom(bool isSuccess, params object[] dtoList)
    {
        return new ResponseMessage
        {
            IsSuccess = isSuccess
        }.WithItems(dtoList) as ResponseMessage;
    }
}