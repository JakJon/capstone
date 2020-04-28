using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapstoneApi.Models;
using Microsoft.AspNetCore.Cors;

namespace CapstoneApi.Controllers
{   
    [EnableCors("MainPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly PostContext _context;

        public UserController(PostContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUserModels()
        {
            return await _context.UserModels.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(long id)
        {
            var UserModel = await _context.UserModels.FindAsync(id);

            if (UserModel == null)
            {
                return NotFound();
            }

            return UserModel;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(long id, UserModel UserModel)
        {
            if (id != UserModel.UserId)
            {
                return BadRequest();
            }

            _context.Entry(UserModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // User: api/User
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUserModel(UserModel UserModel)
        {
            _context.UserModels.Add(UserModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserModel), new { id = UserModel.UserId }, UserModel);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserModel>> DeleteUserModel(long id)
        {
            var UserModel = await _context.UserModels.FindAsync(id);
            if (UserModel == null)
            {
                return NotFound();
            }

            _context.UserModels.Remove(UserModel);
            await _context.SaveChangesAsync();

            return UserModel;
        }

        private bool UserModelExists(long id)
        {
            return _context.UserModels.Any(e => e.UserId == id);
        }
    }
}
