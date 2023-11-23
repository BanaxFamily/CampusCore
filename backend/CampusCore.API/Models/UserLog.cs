using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class UserLog
    {
        public int Id { get; set; }
        public DateTime Log { get; set; }
        public string Action { get; set; }

        //

        public string UserId { get; set; }
        public User User { get; set; }
    }

    public class UserlogViewModel
    {
        public int Id { get; set; }
        public DateTime Log { get; set; }
        public string Action { get; set; }
        public string UserId { get; set; }
        public string Idno { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
    }
}
