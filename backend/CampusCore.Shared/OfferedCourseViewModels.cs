using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class OfferedCourseAddViewModel
    {
        public string Sem { get; set; }
        public int AcadYear { get; set; }
        public string Schedule { get; set; }
        public string FacultyId { get; set; }
        public int CourseId { get; set; }

        public enum Semester
        {
            First,
            Second,
            Summer
        }
    }

    public class OfferedCourseUpdateViewModel
    {
        public int Id { get; set; }
        public string Sem { get; set; }
        public int AcadYear { get; set; }
        public string Schedule { get; set; }
        public string FacultyId { get; set; }
        public int CourseId { get; set; }

        public enum Semester
        {
            First,
            Second,
            Summer
        }
    }

    public class OfferedCourseSearchViewModel
    {
        public string SearchKey { get; set; } = "";
        public string SearchCategory { get; set; }

        public enum SearchCat
        {
            Course,
            Faculty
        }
    }

    public class OfferedCourseDeleteModel
    {
        public int Id { get; set; }
    }
    public class OfferedCourseGetByIdModel
    {
        public int Id { get; set; }
    }

    public class OfferedCourseBySem
    {
        public string Sem { get; set; }
        public int AcadYear { get; set; }
        public enum Semester
        {
            First,
            Second,
            Summer
        }
    }

    public class OfferedCourseByFacultyModel
    {
        public string Sem { get; set; }
        public int AcadYear { get; set; }
        public string FacultyId { get; set; }
    }



}
