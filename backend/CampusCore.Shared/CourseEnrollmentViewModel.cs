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
        public string[] StudentIdArray { get; set; }
    }

    public class CourseEnrolledViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Schedule {  get; set; }
        public string Sem {  get; set; }
        public int AcadYear { get; set; }

        public string FacultyAssigned { get; set; }

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
    public class GetEnrolledCourseViewModel
    {
        public string StudentId { get; set; }
    }
    public class GetEnrolledStudentsViewModel
    {
        public int CourseId { get; set; }
    }
}
