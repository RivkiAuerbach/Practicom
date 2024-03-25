using Microsoft.AspNetCore.Mvc;
using Worker.Core.Models;
using Worker.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace worker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmlpyeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmlpyeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        // GET: api/<EmlpyeeController>
        [HttpGet]
        public async Task<ActionResult> Get() => Ok(await _employeeService.GetAllAsync());


        // GET api/<EmlpyeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id) => Ok(await _employeeService.GetByIdAsync(id));


        // POST api/<EmlpyeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Employee value) => Ok(await _employeeService.AddAsync(value));


        // PUT api/<EmlpyeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Employee value)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            return Ok(await _employeeService.UpdateAsync(employee));
        }

        // DELETE api/<EmlpyeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _employeeService.DeleteAsync(id);
            return NoContent();

        }
    }
}
