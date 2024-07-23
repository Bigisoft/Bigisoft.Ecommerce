using System.Collections.Immutable;
using Bigisoft.Ecommerce.Server.Features.Products.Domain;
using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Bigisoft.Ecommerce.Server.Features.Products.Queries;

public sealed record GetAllProductsQuery : IRequest<ImmutableList<Product>>;

public sealed class GetAllProductsQueryHandler(EcommerceDbContext dbContext) : IRequestHandler<GetAllProductsQuery, ImmutableList<Product>>
{
    public async Task<ImmutableList<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await dbContext.Products
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return [.. products];
    }
}
