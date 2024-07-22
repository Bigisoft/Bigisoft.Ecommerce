namespace Bigisoft.Ecommerce.Server.Features.Authentication;

public class TokenMiddleware(RequestDelegate next, ILogger<TokenMiddleware> logger)
{
    public async Task Invoke(HttpContext context)
    {
        if (context.Request.Headers.TryGetValue("Authorization", out var bearerToken))
        {
            logger.LogInformation($"Token found in cookies: {bearerToken}");
            context.Request.Headers.Authorization = bearerToken;


        }
        else
        {
            logger.LogWarning("Token not found in cookies");
        }

        await next(context);
    }
}
