using System.Collections.Immutable;
using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Bigisoft.Ecommerce.Server.Features.Products.Queries;

public sealed record GetAllProductsQuery : IRequest<ImmutableList<Product>>;

public sealed record GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, ImmutableList<Product>>
{
    private readonly EcommerceDbContext _dbContext;


    public GetAllProductsQueryHandler(EcommerceDbContext dbContext) => _dbContext = dbContext;

    public async Task<ImmutableList<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _dbContext.Products.ToListAsync(cancellationToken);
        return [.. products];
    }
}
