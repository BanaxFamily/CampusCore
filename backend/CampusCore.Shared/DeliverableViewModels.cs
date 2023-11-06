using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class DeliverableAddViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instruction { get; set; }

        //public int Course_Id { get; set; } // to be added: connection to other database. in a comment for now; to be updated soon
    }
    public class DeliverableListViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instruction { get; set; }

    }
    public class DeliverableDeleteViewModel
    {
        public int Id { get; set; }

    }
    public class DeliverableUpdateViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instruction { get; set; }

    }
    public class DeliverableSearchViewModel
    {
        public string SearchKey { get; set; }
    }
}
