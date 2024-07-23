using Bigisoft.Ecommerce.Server.Features.Products.Domain;
using Bigisoft.Ecommerce.Server.Features.Products.Domain.Events;
using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public sealed record CreateProductCommand(string Name) : IRequest<int>;

public sealed class CreateProductCommandHandler(EcommerceDbContext context) : IRequestHandler<CreateProductCommand, int>
{
    public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Name = request.Name
        };

        product.AddDomainEvent(new ProductCreatedEvent(product));

        context.Products.Add(product);

        await context.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}
