using Bigisoft.Ecommerce.Server.Common.Domain;
using MediatR;

namespace Bigisoft.Ecommerce.Server.Features.Products.Events;

public sealed class ProductCreatedEvent(Product product) : BaseEvent
{
    public Product Product { get; } = product;
}

public sealed class ProductCreatedEventHandler : INotificationHandler<ProductCreatedEvent>
{
    private readonly ILogger<ProductCreatedEventHandler> _logger;

    public ProductCreatedEventHandler(ILogger<ProductCreatedEventHandler> logger) => _logger = logger;

    public Task Handle(ProductCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}