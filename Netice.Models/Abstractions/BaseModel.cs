using System;

namespace Netice.Models.Abstractions
{
    public abstract class BaseModel<Tkey>
    {
        public Tkey Id { get; set; }
        public bool Deleted { get; set; }
        
        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}