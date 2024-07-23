using Bigisoft.Ecommerce.Server.Common.Exceptions;
using Bigisoft.Ecommerce.Server.Features.Products.Domain;
using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public sealed record UpdateProductCommand(int Id, string Name) : IRequest;

public sealed class UpdateProductCommandHandler(EcommerceDbContext context) : IRequestHandler<UpdateProductCommand>
{
    public async Task Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await context.Products.FindAsync([request.Id], cancellationToken);

        if (product == null)
        {
            throw new NotFoundException(request.Id.ToString(), nameof(Product));
        }

        product.Name = request.Name;

        await context.SaveChangesAsync(cancellationToken);
    }
}
