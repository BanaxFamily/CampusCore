using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace CampusCore.API.Models
{
    public class Version
    {
        public int Id { get; set; }
        public string Title { get; set; } //set title by getting how many versions are there in a submission then +1
        public string Status { get; set; }
        public DateTime DateSubmitted { get; set; }



        public string FilePath { get; set; }
    }
}

