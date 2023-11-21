using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
   public class GroupAddViewModel
   {
        public string Name { get; set; }
        public string Status { get; set; }

        //offered course foreign key so they can have different groups for different course they take
        public int OfferedCourseId { get; set; }
        public string? AdviserId { get; set; } = null;
        public List<string> Members { get; set; } //list of UserId from members

   }

    public class GroupUpdateDetailsViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string? AdviserId { get; set; } = null;
    }
    public class GroupUpdateMembersViewModel
    {
        public int Id { get; set; }
        public List<string> Members { get; set; } //list of UserId from members
    }

    public class GroupUpdateStatusViewModel
    {
        public int Id { get; set; }
        public string Status { get; set; }
    }
}
