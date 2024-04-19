using FluentValidation;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public class ProductValidator : AbstractValidator<Product>
{
    public ProductValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MinimumLength(5).MaximumLength(100);
    }
}