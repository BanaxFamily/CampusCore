using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace CampusCore.API.Models
{
    public class Version
    {
        public string Title { get; set; }
        public string Status { get; set; }
        public DateTime DateSubmitted { get; set; }



        public string FilePath { get; set; }
    }
}

