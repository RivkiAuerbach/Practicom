using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;
using Worker.Core.Repositories;

namespace Worker.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.Include(e => e.Roles).ToListAsync(); 
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.Employees.Include(e => e.Roles).FirstAsync(x => x.Id == id);
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var existEmployee = await GetByIdAsync(employee.Id);
            _context.Entry(existEmployee).CurrentValues.SetValues(employee);
            await _context.SaveChangesAsync();
            return existEmployee;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existEmployee = await GetByIdAsync(id);
            if (existEmployee != null)
            {
                existEmployee.IsActive = false;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;

        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

    }
}
