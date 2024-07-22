using Bigisoft.Ecommerce.Server.Features.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;

// ReSharper disable once CheckNamespace
namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddAwsCognito(this IServiceCollection services)
    {
        ArgumentNullException.ThrowIfNull(services);

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer();

        services.ConfigureOptions<JwtBearerConfigureOptions>();

        services.AddAuthorizationBuilder()
            .AddPolicy("Admin", policy => policy.RequireClaim("cognito:groups", "Admin"))
            .AddPolicy("Member", policy => policy.RequireClaim("cognito:groups", "Member"));

        return services;
    }

    public static IApplicationBuilder UseAwsCognito(this IApplicationBuilder app)
    {
        ArgumentNullException.ThrowIfNull(app);

        app.UseMiddleware<TokenMiddleware>();
        app.UseAuthentication();
        app.UseAuthorization();

        return app;
    }
}
