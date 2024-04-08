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
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<Employee> AddAsync(Employee employee)
        {   //Validation tests
            var existingEmployees = await _employeeRepository.GetAllAsync();
            if (existingEmployees.Any(e => employee.IdNumber == e.IdNumber) || employee.DateSartingWork.Year < employee.DateOfBirth.Year + 18 ||
                DateTime.Now.Year - employee.DateOfBirth.Year < 18
                || employee.IdNumber.Length != 9)
            {
                return null;
            }

            return await _employeeRepository.AddAsync(employee);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _employeeRepository.DeleteAsync(id);
        }

        public async Task<List<Employee>> GetAllAsync()
        {
           return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
           return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        { //Validation tests
            if ( employee.DateSartingWork.Year < employee.DateOfBirth.Year + 18 ||
                DateTime.Now.Year - employee.DateOfBirth.Year < 18
                || employee.IdNumber.Length != 9)
            {
                return null;
            }

            return await _employeeRepository.UpdateAsync(employee);
        }
    }
}
