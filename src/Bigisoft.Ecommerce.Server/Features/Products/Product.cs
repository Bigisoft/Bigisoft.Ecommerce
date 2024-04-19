namespace Bigisoft.Ecommerce.Server.Features.Products;

public class Product
{
    public int Id { get; set; } = default!;
    public required string Name { get; set; }
}