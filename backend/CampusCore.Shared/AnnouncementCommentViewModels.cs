using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class AnnouncementCommentAddViewModel
    {
        public int AnnouncementId { get; set; } // foreign key from AnnouncementTable
        public string UserId { get; set; } // foreign key from UsersTable
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    public class AnnouncementCommentListViewModel
    {
        public string SearchAnnouncementComment { get; set; }
    }
    public class AnnouncementCommentDeleteModel
    {
        public int Id { get; set; }
    }
    public class AnnouncementCommentUpdateViewModel
    {
        public int Id { get; set; }
        public int AnnouncementId { get; set; } // foreign key from AnnouncementTable
        public string UserId { get; set; } // foreign key from UsersTable
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
