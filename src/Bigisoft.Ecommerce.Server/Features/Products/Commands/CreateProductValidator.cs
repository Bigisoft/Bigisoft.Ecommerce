using FluentValidation;

namespace Bigisoft.Ecommerce.Server.Features.Products.Commands;

public class CreateProductValidator : AbstractValidator<Product>
{
    public CreateProductValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
    }
}