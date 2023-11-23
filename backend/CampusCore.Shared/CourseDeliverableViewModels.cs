using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class CourseDeliverableAddViewModel
    {
        public int CourseId { get; set; }
        public int DeliverableId { get; set; }
        public DateTime? DeliverableDeadline { get; set; }
    }
    public class CourseDeliverableListViewModel
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int DeliverableId { get; set; } 
        public DateTime? DeliverableDeadline { get; set; }
    }
    public class CourseDeliverableUpdateViewModel
    {
        
        public DateTime DeliverableDeadline { get; set; }
    }
}
