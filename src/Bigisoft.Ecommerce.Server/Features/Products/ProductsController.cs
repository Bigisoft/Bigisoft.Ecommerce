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
            var product = await mediator.Send(new CreateProductCommand(request.Name));
            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    [HttpPut("id")]
    public async Task<ActionResult<bool>> Update(UpdateProductCommand request)
    {
        try
        {
            var product = await mediator.Send(request);

            if (!product)
            {
                return NotFound();
            }

            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    [HttpDelete("id")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        try
        {
            var command = new DeleteProductCommand(id);
            var product = await mediator.Send(command);
            if (!product)
            {
                return NotFound();
            }

            // Return a success response
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}
