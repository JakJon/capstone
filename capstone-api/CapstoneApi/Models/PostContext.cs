using Microsoft.EntityFrameworkCore;

namespace CapstoneApi.Models
{
    public class PostContext : DbContext
    {
        public PostContext(DbContextOptions<PostContext> options)
            : base(options)
            {  }

        public DbSet<PostModel> PostModels { get; set; }
    }
}