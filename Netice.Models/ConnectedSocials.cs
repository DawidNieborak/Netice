using Netice.Models.Abstractions;

namespace Netice.Models
{
    public class ConnectedSocials : BaseModel<int>
    {
        public string ConnectedSocialsId { get; set; }
        public string SocialName { get; set; }
        public string AccessToken { get; set; }
        public string SocialProfileUsername { get; set; }
        public string Beartoken { get; set; }
        public string AccessSecret { get; set; }
        public string DataGetUrl { get; set; }
        public int SocialId { get; set; }
        
        public int SocialProfileId { get; set; }
        
    }
}