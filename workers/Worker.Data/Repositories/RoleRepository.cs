using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;
using Worker.Core.Repositories;

namespace Worker.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;

        public RoleRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<Role> AddAsync(Role role)
        {
            //Checking whether the current employee has such a position
            //var existingRoles = await _context.Roles.Where(r => r.EmployeeId == role.EmployeeId).ToListAsync();
            //foreach (var existingRole in existingRoles)
            //{
            //    if (existingRole.Name == role.Name)
            //    {
            //        throw new Exception("A role with the same name and employeeId already exists.");
            //    }
            //}
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return role;
        }


        public async Task DeleteAsync(int id)
        {
            Role role = _context.Roles.FirstOrDefault(x => x.Id == id);
            if (role != null)
            {
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Role>> GetAllAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return await _context.Roles.FirstAsync(r => r.Id == id);
        }
        public async Task<Role> UpdateAsync(Role role)
        { 
            //Checking whether the current employee has such a position
            //var existingRoles = await _context.Roles.Where(r => r.EmployeeId == role.EmployeeId && r.Id != role.Id).ToListAsync();
            //foreach (var existingRole in existingRoles)
            //{
            //    if (existingRole.Name == role.Name)
            //    {
            //        throw new Exception("A role with the same name and employeeId already exists.");
            //    }
            //}      
            var existRole = await GetByIdAsync(role.Id);      
            _context.Entry(existRole).CurrentValues.SetValues(role);  
            await _context.SaveChangesAsync();
            return existRole;
        }

    }
}
