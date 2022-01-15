namespace Netice.Api.BackgroundServices;

public interface IHangfireHandler
{
    public Task HitFetchTwitterData(string userProfileId);
}