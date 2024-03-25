using Microsoft.AspNetCore.Mvc;
using Worker.Core.Models;
using Worker.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace worker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {

            private readonly IRoleService _roleService;
            public RoleController(IRoleService roleService)
            {
                _roleService = roleService;
            }
            // GET: api/<RoleController>
            [HttpGet]
            public async Task<ActionResult> Get() => Ok(await _roleService.GetAllAsync());


            // GET api/<RoleController>/5
            [HttpGet("{id}")]
            public async Task<ActionResult> Get(int id) => Ok(await _roleService.GetByIdAsync(id));


            // POST api/<RoleController>
            [HttpPost]
            public async Task<ActionResult> Post([FromBody] Role value) => Ok(await _roleService.AddAsync(value));


            // PUT api/<RoleController>/5
            [HttpPut("{id}")]
            public async Task<ActionResult> Put(int id, [FromBody] Role value)
            {
                var role = await _roleService.GetByIdAsync(id);
                if (role is null)
                {
                    return NotFound();
                }
                return Ok(await _roleService.UpdateAsync(role));
            }


            // DELETE api/<RoleController>/5
            [HttpDelete("{id}")]
            public async Task<ActionResult> Delete(int id)
            {
                await _roleService.DeleteAsync(id);
                return NoContent();

            }
        }
    }

