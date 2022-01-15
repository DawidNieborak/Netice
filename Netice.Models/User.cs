
using System.Collections;
using System.Collections.Generic;
using Netice.Models.Abstractions;

namespace Netice.Models
{
    public class User : BaseModel<string>
    {
        public string Username { get; set; }
        public IList<ConnectedSocials> ConnectedSocialsList { get; set; } = new List<ConnectedSocials>();
    }

}