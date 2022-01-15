using Netice.Models;
using Newtonsoft.Json;

namespace Netice.Api.Repository
{
    public class TwitterRepository : ITwitterReposittory
    {
        private readonly IHttpClientFactory _clientFactory;

        public TwitterRepository(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<RetrieveMultipleTwitterRepositoryItems> PullTwitterTimeline()
        {
            var client = _clientFactory.CreateClient("twitter");
            var response = await client.GetAsync("44196397/tweets?max_results=100&tweet.fields=referenced_tweets,public_metrics,author_id,conversation_id,text,created_at&user.fields=username");
            var data =  await response.Content.ReadAsAsync<RetrieveMultipleTwitterRepositoryItems>();

            return data;
        }
    }
}

