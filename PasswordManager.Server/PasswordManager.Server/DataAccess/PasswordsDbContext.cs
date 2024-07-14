using Microsoft.EntityFrameworkCore;
using PasswordManager.Server.Models;

namespace PasswordManager.Server.DataAccess
{
    public class PasswordsDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public PasswordsDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<Password> Passwords => Set<Password>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DataBase"));
        }
    }
}
