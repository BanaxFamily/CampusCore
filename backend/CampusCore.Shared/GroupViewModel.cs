using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
   public class GroupAddViewModel
   {
        public string Name { get; set; }

        //offered course foreign key so they can have different groups for different course they take
        public int OfferedCourseId { get; set; }
        public string LeaderId {  get; set; }
        public string? AdviserId { get; set; } = null;
        public string[] Members { get; set; } //array of UserId from members

   }

    public class GroupUpdateDetailsViewModel
    {
        public int GroupId { get; set; }
        public string Name { get; set; }
        public string? AdviserId { get; set; } = null;
    }
    public class GroupUpdateMembersViewModel
    {
        public int GroupId { get; set; }
        public string LeaderId { get; set; }
        public string[] Members { get; set; } //list of UserId from members
    }

    public class StudentsWithNoGroup
    {
        public string StudentId { get; set; }
        public string StudentIdno { get; set;}
        public string StudentName { get; set;}
    }

    public class GroupUpdateStatusViewModel
    {
        public int Id { get; set; }
        public string Status { get; set; }
    }

    public class GetStudentsForUpdateViewModel
    {
        public int GroupId { get; set; }
        public int OfferedCourseId { get; set; }
    }

    public class GetGroupOfStudentViewModel
    {
        public string StudentId { get; set; }
        public int OfferedCourseId { get; set; }
    }
}
