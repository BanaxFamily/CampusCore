using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class UserLog
    {
        public int Id { get; set; }
        public DateTime Log { get; set; }

        //

        public string UserId { get; set; }
        public User User { get; set; }
    }
}
