using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker.Core.Models;

namespace Worker.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=DESKTOP-SI8MC0H;Database=worker_db;TrustServerCertificate=true;trusted_connection=true;");
            optionsBuilder.UseSqlServer("Server=(localdb)\\ProjectModels;Database=worker_db");

        }

    }
}
