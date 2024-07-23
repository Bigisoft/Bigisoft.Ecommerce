using Bigisoft.Ecommerce.Server.Features.Products.Commands;
using Bigisoft.Ecommerce.Server.Features.Products.Domain;
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

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product?>> GetById(int id)
    {
        var product = await mediator.Send(new GetProductByIdQuery(id));

        if (product is null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductCommand command)
    {
        return Ok(await mediator.Send(command));
    }

    [HttpPut]
    public async Task<ActionResult<Product>> Update(int id, UpdateProductCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        await mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        await mediator.Send(new DeleteProductCommand(id));
        return NoContent();
    }
}
