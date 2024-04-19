using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public sealed record CreateProductCommand(string Name) : IRequest<int>;

public sealed class CreateProductCommandHandler(EcommerceDbContext context) : IRequestHandler<CreateProductCommand, int>
{
    public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var entity = new Product
        {
            Name = request.Name
        };

        context.Products.Add(entity);
        await context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}