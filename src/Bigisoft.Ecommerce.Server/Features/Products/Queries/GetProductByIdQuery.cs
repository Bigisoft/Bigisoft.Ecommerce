using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Queries;

public sealed record GetProductByIdQuery(int Id) : IRequest<Product?>;

public sealed class GetProductByIdQueryHandler(EcommerceDbContext dbContext) : IRequestHandler<GetProductByIdQuery, Product?>
{
    public async Task<Product?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await dbContext.Products.FindAsync([request.Id], cancellationToken);
        return product;
    }
}
