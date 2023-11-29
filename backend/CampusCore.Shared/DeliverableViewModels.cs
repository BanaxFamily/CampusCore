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
        public bool ForAdviser {  get; set; }
        public bool GroupSubmission { get; set; }

    }
    public class DeliverableListViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instruction { get; set; }
        public bool ForAdviser { get; set; }
        public bool GroupSubmission {  get; set; }

    }
    
    public class DeliverableUpdateViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instruction { get; set; }
        public bool ForAdviser { get; set; }
        public bool GroupSubmission { get; set; }

    }
    public class DeliverableSearchViewModel
    {
        public string SearchKey { get; set; }
    }
}
