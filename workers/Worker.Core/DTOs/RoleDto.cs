using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Worker.Core.DTOs
{
    public class RoleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }
    }
}
