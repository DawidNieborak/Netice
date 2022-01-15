using Microsoft.AspNetCore.Mvc;
using Netice.Api.BackgroundServices;
using Netice.Api.Settings;
using Tweetinvi;

namespace Netice.Api.Controllers
{
    [ApiController]
    [Route("/api/twitter")]
    public class TwitterController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        
        private readonly DevKeys _devKeys;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IHangfireHandler _hangfire;

        public TwitterController(IHttpClientFactory clientFactory, IHangfireHandler hangfire)
        {
            _clientFactory = clientFactory;
            _hangfire = hangfire;
        }


        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> Search(string username)
        {
            var twitterApp = new TwitterClient(DevKeys.consumerKey, DevKeys.consumerSecret, DevKeys.bearToken);
            var users = await twitterApp.UsersV2.GetUsersByNameAsync(username);
            return Ok(users);
        }
        
        [HttpPost("createfile")]
        public async Task<IActionResult> createFile(string id)
        {
            _hangfire.HitFetchTwitterData(id);
            return Ok("Ok");
        }
        
        
        [HttpGet]
        [Route("add")]
        public async Task<IActionResult> Add(string userId)
        {
            return Ok(userId);

        }
    }
}