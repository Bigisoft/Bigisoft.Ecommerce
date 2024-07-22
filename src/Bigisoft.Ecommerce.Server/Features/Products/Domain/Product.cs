using Bigisoft.Ecommerce.Server.Common.Domain;

namespace Bigisoft.Ecommerce.Server.Features.Products.Domain;

public class Product : BaseEntity
{
    public required string Name { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
    public string Price { get; set; }
}
