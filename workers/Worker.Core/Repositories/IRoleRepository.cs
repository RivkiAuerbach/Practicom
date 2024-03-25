using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;

namespace Worker.Core.Repositories
{
    public interface IRoleRepository
    {
        Task<List<Role> >GetAllAsync();
        Task<Role> GetByIdAsync(int id);
        Task<Role> UpdateAsync(Role role);
        Task DeleteAsync(int id);
        Task<Role> AddAsync(Role role);
    }
}
