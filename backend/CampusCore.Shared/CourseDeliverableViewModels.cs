using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class CourseDeliverableAddViewModel
    {
        public int Id { get; set; }
        public int OfferedCourseId { get; set; }
        //public int DeliverableId { get; set; } // lacking foreign key from DeliverableTable
        public DateTime DeliverableDeadline { get; set; }
    }
    public class CourseDeliverableListViewModel
    {
        public int Id { get; set; }
        public int OfferedCourseId { get; set; }
        //public int DeliverableId { get; set; } // lacking foreign key from DeliverableTable
        public DateTime DeliverableDeadline { get; set; }
    }
    public class CourseDeliverableDeleteViewModel
    {
        public int Id { get; set; }
        public int OfferedCourseId { get; set; }
        //public int DeliverableId { get; set; } // lacking foreign key from DeliverableTable
        public DateTime DeliverableDeadline { get; set; }
    }
    public class CourseDeliverableUpdateViewModel
    {
        public int Id { get; set; }
        public int OfferedCourseId { get; set; }
        //public int DeliverableId { get; set; } // lacking foreign key from DeliverableTable
        public DateTime DeliverableDeadline { get; set; }
    }
}
