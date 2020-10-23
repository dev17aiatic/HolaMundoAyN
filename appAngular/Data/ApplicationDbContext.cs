using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using appAngular.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace appAngular.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<JobSeekercs> JobSeekercs { get; set; }        

    }
}
