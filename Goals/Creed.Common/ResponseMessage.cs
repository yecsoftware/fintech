namespace Creed.Common;

public class ResponseMessage
{
    public string Message { get; set; }
    public bool Success { get; set; }
    public object Data { get; set; }
    
    /*
     *
     *
     * public T Get<T>() : where T : class, new()
       {
           return T;
           //json serialize işlemi yapılacak
           Newtonsfot json serialize
           gelen datayı serialize ettikten sonra T tipine çevir
           // Add logic here
       }
     * 
     */
    
}