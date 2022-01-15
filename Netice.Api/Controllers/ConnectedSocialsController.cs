using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Netice.Data;
using Netice.Models;

namespace Netice.Api.Controllers
{
    [ApiController]
    [Route("api/socials")]
    [Authorize(NoticeConstants.Policies.User)]
    public class ConnectedSocialsController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public ConnectedSocialsController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public async Task<IEnumerable<Dtos.ConnectedSocialsDto>> All(string connectedSocialsId)
        {
            if (string.IsNullOrEmpty(connectedSocialsId))
            {
                return null;
            }

            var user = await _ctx.Users.FirstOrDefaultAsync(x => x.Id.Equals(connectedSocialsId));
            
            if (user == null) return null;
        
            var item = (_ctx.ConnectedSocials.Select(x => x.AsDto()));
            return item.ToList();
            
        }

        // /api/socials/{id}
        [HttpGet("{id}")]
        public ConnectedSocials Get(int id) => _ctx.ConnectedSocials.FirstOrDefault(x => x.Id.Equals(id));
        
        // /api/socials
        [HttpPost]
        public async Task<IActionResult> Create(ConnectedSocials connectedSocials)
        {
            var newSocial = new ConnectedSocials
            {
                Beartoken = connectedSocials.Beartoken,
                Deleted = false,
                AccessSecret = connectedSocials.AccessSecret,
                SocialId = connectedSocials.SocialId,
                SocialName = connectedSocials.SocialName,
                DataGetUrl = connectedSocials.DataGetUrl,
                SocialProfileUsername = connectedSocials.SocialProfileUsername,
                ConnectedSocialsId = connectedSocials.ConnectedSocialsId,
                AccessToken = connectedSocials.AccessToken,
                Created = DateTime.Now,
            };
            
            _ctx.Add(newSocial);
            await _ctx.SaveChangesAsync();
            return Ok(newSocial);
        }
        
        
        // /api/socials/{id}
        [HttpPost("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var socialItem = _ctx.ConnectedSocials.Where(x => x.SocialId.Equals(id)).First();
            
            if (socialItem == null)
            {
                return BadRequest();
            }
            
            _ctx.ConnectedSocials.Remove(socialItem);
            _ctx.SaveChangesAsync();
            
            return Ok();
        }
    }
}

