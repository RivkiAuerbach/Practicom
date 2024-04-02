using Worker.Core.Models;

namespace worker.API.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdNumber { get; set; }
        //public bool IsActive { get; set; }
        public DateTime DateSartingWork { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }

        //public List<Role> Roles { get; set; }
    }
}
