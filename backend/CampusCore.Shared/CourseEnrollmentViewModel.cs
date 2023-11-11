using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class CourseEnrollmentAddViewModel
    {
        public int OfferedCourseId { get; set; }
        public string StudentId { get; set; }
    }

    public class CourseEnrollmentListViewModel
    {
        public string StudentId { get; set; }
        public string SearchKey { get; set; }

        
    }

    public class CourseEnrollmentUpdateViewModel
    {
        public int Id { get; set; }
        public int OfferedCourseId { get; set; }
        public string StudentId { get; set; }
    }

    public class CourseEnrollmentDeleteViewModel
    {
        public int Id { get; set; }
    }
}
