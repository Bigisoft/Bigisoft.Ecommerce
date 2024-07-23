using Bigisoft.Ecommerce.Server.Common.Domain;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Domain.Events;

public sealed class ProductCreatedEvent(Product product) : BaseEvent
{
    public Product Product { get; } = product;
}

public sealed class ProductCreatedEventHandler(ILogger<ProductCreatedEventHandler> logger) : INotificationHandler<ProductCreatedEvent>
{
    public Task Handle(ProductCreatedEvent notification, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
