using Bigisoft.Ecommerce.Server.Features.Products.Commands;
using Bigisoft.Ecommerce.Server.Features.Products.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Bigisoft.Ecommerce.Server.Features.Products;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
        return Ok(await mediator.Send(new GetAllProductsQuery()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product?>> GetById(int id)
    {
        var product = await mediator.Send(new GetAllProductByIdQuery(id));

        if (product is null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Product request)
    {
        try
        {
            // Call your service or repository to create a new product
            // You can access the request data from the ProductsControllerRequest object
            // For example, request.Name, request.Price, etc.
            var product = await mediator.Send(new CreateProductCommand(request.Name));

            // Return a success response
            return Ok(product);
        }
        catch (Exception ex)
        {
            // Handle any exceptions and return an error response
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}
