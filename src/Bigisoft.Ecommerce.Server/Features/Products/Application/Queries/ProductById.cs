using Bigisoft.Ecommerce.Server.Features.Products.Domain.Entities;
using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace Bigisoft.Ecommerce.Server.Features.Products.Application.Queries;

[ApiController]
[Route("api/[controller]")]
public class ProductById(EcommerceDbContext context) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<Product?>> GetProductById(int id)
    {
        return await context.Products.FindAsync(id);
    }
}
