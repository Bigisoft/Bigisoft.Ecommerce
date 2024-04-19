using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public sealed record UpdateProductCommand(int Id, string Name) : IRequest<bool>;

public sealed class UpdateProductCommandHandler(EcommerceDbContext context) : IRequestHandler<UpdateProductCommand, bool>
{
    public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await context.Products.FindAsync(request.Id);
        
        if (product == null) return false;

        product.Name = request.Name;
        context.Products.Update(product);
        return await context.SaveChangesAsync(cancellationToken) > 0;
    }
}