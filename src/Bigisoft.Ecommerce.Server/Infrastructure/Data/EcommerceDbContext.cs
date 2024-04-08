using Bigisoft.Ecommerce.Server.Features.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bigisoft.Ecommerce.Server.Infrastructure.Data;
public class EcommerceDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : base(options)
    {

    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // You can add additional configuration for your entities here
    }
}