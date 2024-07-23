using Bigisoft.Ecommerce.Server.Features.Products;
using Bigisoft.Ecommerce.Server.Features.Products.Domain;
using Microsoft.EntityFrameworkCore;

namespace Bigisoft.Ecommerce.Server.Infrastructure.Data;
public class EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // You can add additional configuration for your entities here
    }
}
