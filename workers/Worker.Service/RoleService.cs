using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;
using Worker.Core.Repositories;
using Worker.Core.Services;

namespace Worker.Service
{
    public class RoleService : IRoleService

    {
        private readonly IRoleRepository _roleRepository;
        private readonly IEmployeeRepository _employeeRepository;
        public RoleService(IRoleRepository roleRepository, IEmployeeRepository employeeRepository)
        {
            _roleRepository = roleRepository;
            _employeeRepository = employeeRepository;
        }
        public async Task<Role> AddAsync(Role role)
        {
            //Checking whether the current employee has such a position
            var getRoles=await _roleRepository.GetAllAsync();
            var existingRoles = getRoles.Where(r => r.EmployeeId == role.EmployeeId);
            foreach (var existingRole in existingRoles)
            {
                if (existingRole.Name == role.Name)
                {
                    throw new Exception("A role with the same name and employeeId already exists.");
                }
            }
            //Checking that the job acceptance date is later/equal to the job start date
            var getEmployee = await _employeeRepository.GetByIdAsync(role.EmployeeId);
            if (getEmployee.DateSartingWork > role.StartDate)
                throw new Exception("The job acceptance date must be later than or equal to the job start date");

            return await _roleRepository.AddAsync(role);
        }

        public async Task DeleteAsync(int id)
        {
            await _roleRepository.DeleteAsync(id);
        }

        public async Task<List<Role>> GetAllAsync()
        {
           return await _roleRepository.GetAllAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return await _roleRepository.GetByIdAsync(id);
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            //Checking whether the current employee has such a position
            var getRoles = await _roleRepository.GetAllAsync();
            var existingRoles = getRoles.Where(r => r.EmployeeId == role.EmployeeId && r.Id != role.Id);
            foreach (var existingRole in existingRoles)
            {
                if (existingRole.Name == role.Name)
                {
                    throw new Exception("A role with the same name and employeeId already exists.");
                }
            }
            //Checking that the job acceptance date is later/equal to the job start date
            var getEmployee = await _employeeRepository.GetByIdAsync(role.EmployeeId);
            if (getEmployee.DateSartingWork > role.StartDate)
                throw new Exception("The job acceptance date must be later than or equal to the job start date");

            return await _roleRepository.UpdateAsync(role);
        }
    }
}
