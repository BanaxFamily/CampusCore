using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using CampusCore.API.Models;

namespace CampusCore.Shared
{
    public class CourseAddViewModel
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public bool HasRetainableGroup { get; set; }

    }

    public class CourseSearchViewModel
    {

        public string SearchKey { get; set; }
    }

    public class CourseListViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

    }

    public class CourseDeleteModel
    {
        public int Id { get; set; }
    }
    
    public class GetByIdModel
    {
        public int Id { get; set; }
    }


    public class CourseUpdateViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

    }
}
