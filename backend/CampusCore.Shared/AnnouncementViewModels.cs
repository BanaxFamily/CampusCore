using ExpressiveAnnotations.Attributes;
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

    public class AnnouncementGetAllModel
    {
        [RequiredIf("UserId==null", ErrorMessage = "Need to provide either a OfferedCourseId or a UserId")]
        public int? OfferedCourseId { get; set; } = null;
        [RequiredIf("OfferedCourseId==null", ErrorMessage = "Need to provide either a OfferedCourseId or a UserId")]
        public string? UserId { get; set; } = null;//submission id
    }

    public class AnnouncementUpdateViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

    }
}
