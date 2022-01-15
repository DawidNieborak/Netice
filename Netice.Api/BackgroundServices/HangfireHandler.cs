using Hangfire;


namespace Netice.Api.BackgroundServices
{
    public class HangfireHandler : IHangfireHandler
    {
        private readonly IBackgroundJobClient _backgroundJobClient;
        private readonly IFetchTwitterData _recurringJobFetchTwitterData;

        public HangfireHandler(IBackgroundJobClient backgroundJobClient, IFetchTwitterData fetchTwitterData)
        {
            _recurringJobFetchTwitterData = fetchTwitterData;
            _backgroundJobClient = backgroundJobClient;
        }

        public Task HitFetchTwitterData(string userProfileId)
        {
            var currentTime = DateTime.Now;
            DateTime x2MinsLater = currentTime.AddMinutes(1);
            _backgroundJobClient.Schedule(
                () => _recurringJobFetchTwitterData.PullTwitterTimeline(userProfileId),
                x2MinsLater
            );

            return null;
        }
        
    }
}

