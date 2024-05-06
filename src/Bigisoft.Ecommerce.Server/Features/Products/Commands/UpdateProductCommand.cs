using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public sealed record UpdateProductCommand(int Id, string Name) : IRequest<Product?>;

public sealed class UpdateProductCommandHandler(EcommerceDbContext context) : IRequestHandler<UpdateProductCommand, Product?>
{
    public async Task<Product?> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await context.Products.FindAsync(request.Id);
        
        if (product == null) return null;

        product.Name = request.Name;
        //context.Products.Update(product);
        await context.SaveChangesAsync(cancellationToken);
        return product;
    }
}