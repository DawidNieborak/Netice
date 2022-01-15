using System.Security.Claims;
using Netice.Models;

namespace Netice.Api.BackgroundServices;

public interface IFetchTwitterData
{
    public Task<RetrieveMultipleTwitterRepositoryItems> PullTwitterTimeline(string userProfileId);
}