namespace Netice.Models;

public class Dtos
{
    public record ConnectedSocialsDto(string ConnectedSocialsId, string SocialName, string SocialProfileUsername,
        string DataGetUrl, int SocialId, DateTime Created, int SocialProfileId);
    
}