using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class AnnouncementAddViewModel
    {
        public string UserId { get; set; } // foreign key from UserTable
        public int OfferedCourseId { get; set; } // foreign key from OfferedCourseTable
        public string Title { get; set; }
        public string Content { get; set; }

    }
    public class AnnouncementListViewModel
    {
        public string SearchAnnouncement { get; set; }

    }
    public class AnnouncementDeleteModel
    {
        public int Id { get; set; }

    }
    public class AnnouncementGetByIdModel
    {
        public int Id { get; set; }

    }
    public class AnnouncementUpdateViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

    }
}
