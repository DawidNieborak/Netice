using Netice.Models;

namespace Netice.Api.Repository
{
    public interface ITwitterReposittory
    {
        public Task<RetrieveMultipleTwitterRepositoryItems> PullTwitterTimeline();
    }
}

