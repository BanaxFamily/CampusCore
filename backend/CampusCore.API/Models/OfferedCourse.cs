using System.ComponentModel.DataAnnotations.Schema;

namespace CampusCore.API.Models
{
    public class OfferedCourse
    {
        //own properties
        public int Id { get; set; }
        public string Sem { get; set; }
        public int AcadYear { get; set; }
        public string Schedule { get; set; }



        //Foreign links

        //list of students
        List<User> Students { get; set; }


        //faculty assigned

        [ForeignKey("UserId")]
        public string FacultyId { get; set; }
        public User FacultyAssigned { get; set; }


        //course
        public int CourseId { get; set; }
        public Course Course { get; set; }


    }
}
