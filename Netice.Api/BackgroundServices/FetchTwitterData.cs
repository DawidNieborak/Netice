using Netice.Data;
using Netice.Models;

namespace Netice.Api.BackgroundServices
{
    public class FetchTwitterData : IFetchTwitterData
    {
        private readonly AppDbContext _dbContext;
        private IHttpClientFactory _clientFactory;

        public FetchTwitterData(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<RetrieveMultipleTwitterRepositoryItems> PullTwitterTimeline(string userProfileId)
        {
            var client = _clientFactory.CreateClient("twitter");
            // todo grab user id from claims
            var response = await client.GetAsync(userProfileId + "/tweets?max_results=100&tweet.fields=referenced_tweets,public_metrics,author_id,conversation_id,text,created_at&user.fields=username");
            var data =  await response.Content.ReadAsAsync<RetrieveMultipleTwitterRepositoryItems>();
            
            return data;
        }
    }
}

