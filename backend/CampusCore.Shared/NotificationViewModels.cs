using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class NotificationAddViewModel
    {
        public string UserId { get; set; } // foreign key from UserTable
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public int IsRead { get; set; }
    }
    public class NotificationListViewModel
    {
        public string SearchNotification { get; set; }
    }
    public class NotificationDeleteModel
    {
        public int Id { get; set; }
    }
    public class NotificationUpdateViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; } // foreign key from UserTable
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public int IsRead { get; set; }
    }
}
