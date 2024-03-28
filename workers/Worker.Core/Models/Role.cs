using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Worker.Core.Models
{
    public enum Name { Secretary, programmer, doctor, kindergartner, salesperson, accountant }
    public class Role
    {
        public int Id { get; set; }
        public Name Name { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }
    }
}
