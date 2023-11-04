using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class ResponseManager
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        
       
    }

    public class DataResponseManager:ResponseManager {
        
        public object Data { get; set; }

    }

    public class LoginResponseManager : ResponseManager
    {
        public object Token { get; set; }
    }

    public class ErrorResponseManager : ResponseManager
    {
        public IEnumerable<string> Errors { get; set; }
    }
    
}
