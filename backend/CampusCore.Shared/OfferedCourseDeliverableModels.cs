using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class OfferedCourseDeliverableAddViewModel
    {
        public int DeliverableId { get; set; } // foreign key
        public DateTime? Deadline { get; set; }
        public int OfferedCourseId { get; set; } // foreign key
    }
    public class OfferedCourseDeliverableListViewModel
    {
        public int Id { get; set; }
        public int DeliverableId { get; set; } // foreign key
        public DateTime? Deadline { get; set; }
        public int OfferedCourseId { get; set; } // foreign key

    }

    public class OfferedCourseDeliverableUpdateViewModel
    {
        public int Id { get; set; }
        public DateTime? Deadline { get; set; }
    }
}
