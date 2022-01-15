using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Netice.Data;
using Netice.Models;

namespace Netice.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize(NoticeConstants.Policies.User)]
    public class UserController : ApiController
    {
        private readonly AppDbContext _ctx;
        
        public UserController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var userId = UserId;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest();
            }

            var user = await _ctx.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));

            if (user != null) return Ok(user);

            user = new User
            {
                Id = userId,
                Username = Username,
                Deleted = false,
                ConnectedSocialsList = new List<ConnectedSocials>(),
            };

            _ctx.Add(user);
            await _ctx.SaveChangesAsync();
            
            return Ok(user);
        }
        
        [HttpGet("{id}")]
        public IActionResult GetUser(string Id) => Ok();
    }
}