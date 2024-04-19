using Azure.Core;
using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public sealed record DeleteProductCommand(int Id) : IRequest<bool>;

public sealed class DeleteProductCommandHandler(EcommerceDbContext context) : IRequestHandler<DeleteProductCommand, bool>
{
    public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await context.Products.FindAsync(request.Id);
        
        if (product == null) return false;

        context.Products.Remove(product);
        return await context.SaveChangesAsync(cancellationToken) > 0;
    }
}