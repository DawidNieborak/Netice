using System.Net.Http.Json;
using System.Text.Json;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Netice.Api.Controllers
{
    [ApiController]
    [Route("api/tests")]
    
    public class TestController : ControllerBase
    {
        public TestController() {}
        
        [HttpGet("test")]
        [Authorize(Policy = IdentityServerConstants.LocalApi.PolicyName)]
        public IActionResult TestAuth()
        {
            return Ok("test");
        }


        [HttpGet("mod")]
        [Authorize(Policy = NoticeConstants.Policies.Mod)]
        public string ModAuth() => "mod";
    }
}