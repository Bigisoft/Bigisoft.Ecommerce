using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Amazon;
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Amazon.Extensions.CognitoAuthentication;
using Amazon.Runtime;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bigisoft.Ecommerce.Server.Features.Authentication;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IConfiguration configuration, ILogger<TokenMiddleware> logger) : ControllerBase
{
    [Authorize(Policy = "Admin")]
    //[Authorize]
    [HttpGet("validate")]
    public IActionResult ValidateToken()
    {
        return Ok(new { Message = "Token is valid" });
    }
}

