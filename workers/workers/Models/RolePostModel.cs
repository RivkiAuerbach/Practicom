using Worker.Core.Models;

namespace worker.API.Models
{
    
    public class RolePostModel
    {
        public Name Name { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }

        public int EmployeeId { get; set; }
    }
}
