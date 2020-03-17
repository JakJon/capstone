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
    public class PostController : ControllerBase
    {
        private readonly PostContext _context;

        public PostController(PostContext context)
        {
            _context = context;
        }

        // GET: api/Post
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostModel>>> GetPostModels()
        {
            return await _context.PostModels.ToListAsync();
        }

        // GET: api/Post/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostModel>> GetPostModel(long id)
        {
            var postModel = await _context.PostModels.FindAsync(id);

            if (postModel == null)
            {
                return NotFound();
            }

            return postModel;
        }

        // PUT: api/Post/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostModel(long id, PostModel postModel)
        {
            if (id != postModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(postModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostModelExists(id))
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

        // POST: api/Post
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<PostModel>> PostPostModel(PostModel postModel)
        {
            _context.PostModels.Add(postModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPostModel), new { id = postModel.Id }, postModel);
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PostModel>> DeletePostModel(long id)
        {
            var postModel = await _context.PostModels.FindAsync(id);
            if (postModel == null)
            {
                return NotFound();
            }

            _context.PostModels.Remove(postModel);
            await _context.SaveChangesAsync();

            return postModel;
        }

        private bool PostModelExists(long id)
        {
            return _context.PostModels.Any(e => e.Id == id);
        }
    }
}
