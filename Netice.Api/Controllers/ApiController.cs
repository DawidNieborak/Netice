using System.Linq;
using IdentityModel;
using Netice.Models;
using Microsoft.AspNetCore.Mvc;

namespace Netice.Api.Controllers
{
    [ApiController]
    public class ApiController : ControllerBase
    {
        protected string UserId => GetClaim(JwtClaimTypes.Subject);
        protected string Username => GetClaim(JwtClaimTypes.PreferredUserName);

        private string GetClaim(string claimType) => 
            User.Claims.FirstOrDefault(x => x.Type.Equals(claimType))?.Value;
    }
}