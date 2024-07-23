using Bigisoft.Ecommerce.Server.Common.Exceptions;
using Bigisoft.Ecommerce.Server.Features.Products.Domain;
using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public sealed record DeleteProductCommand(int Id) : IRequest;

public sealed class DeleteProductCommandHandler(EcommerceDbContext context) : IRequestHandler<DeleteProductCommand>
{
    public async Task Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await context.Products.FindAsync([request.Id], cancellationToken);

        if (product == null)
        {
            throw new NotFoundException(request.Id.ToString(), nameof(Product));
        }

        context.Products.Remove(product);

        await context.SaveChangesAsync(cancellationToken);
    }
}
