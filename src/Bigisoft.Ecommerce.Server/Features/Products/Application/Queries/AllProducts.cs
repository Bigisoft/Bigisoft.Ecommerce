using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using Bigisoft.Ecommerce.Server.Features.Products.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bigisoft.Ecommerce.Server.Features.Products.Application.Queries;

[ApiController]
[Route("api/[controller]")]
public class AllProducts(EcommerceDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAllProducts()
    {
        var products = await context.Products.ToListAsync();
        return Ok(products);
    }
}
