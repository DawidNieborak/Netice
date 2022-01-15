using Netice.Models;

namespace Netice.Api;

public static class Extensions
{
    public static Dtos.ConnectedSocialsDto AsDto(this ConnectedSocials connectedSocials)
    {
        return new Dtos.ConnectedSocialsDto(
            connectedSocials.ConnectedSocialsId,
            connectedSocials.SocialName,
            connectedSocials.SocialProfileUsername,
            connectedSocials.DataGetUrl,
            connectedSocials.SocialId,
            connectedSocials.Created,
            connectedSocials.SocialProfileId
        );
    }
}