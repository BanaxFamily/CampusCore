using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampusCore.Shared
{
    public class IntIdViewModel
    {
        public int Id { get; set; }
    }
    public class StringIdViewModel
    {
        public string Id { get; set; }
    }
    public class StringSearchViewModel
    {
        public string SearchKey { get; set; }
    }
    public class StringOptionSearchViewModel
    {
        public string SearchKey { get; set; }
        public string Option { get; set; }
    }
}
