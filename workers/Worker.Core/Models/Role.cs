using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Worker.Core.Models
{
    public enum Name {
        fullstack,
        chips,
        hardware,
        verfication,
        embedded,
        electronics,
        teamLeader,
        projectManager,
        productManager
    }
    public class Role
    {
        public int Id { get; set; }
        public Name Name { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }
        public int EmployeeId { get; set; }
    }
}
