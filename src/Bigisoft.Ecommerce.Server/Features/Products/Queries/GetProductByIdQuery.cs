using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Queries;

public sealed record GetAllProductByIdQuery(int Id) : IRequest<Product?>;

public sealed record GetAllProductByIdQueryHandler : IRequestHandler<GetAllProductByIdQuery, Product?>
{
    private readonly EcommerceDbContext _dbContext;


    public GetAllProductByIdQueryHandler(EcommerceDbContext dbContext) => _dbContext = dbContext;

    public async Task<Product?> Handle(GetAllProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _dbContext.Products.FindAsync(request.Id);
        return product;
    }
}
