using System.Collections.Generic;
using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{
    public class AppUser
    {
        [IdProperty]
        public virtual int UserId { get; set; }
        public virtual string Login { get; set; }
        public virtual string Name { get; set; }
        public virtual string Phone { get; set; }
        public virtual bool? Enabled { get; set; }

        public virtual Department Department { get; set; }
        public virtual ICollection<TransportOwner> UserOwners { get; set; }
        public virtual ICollection<UserGroup> UserGroups { get; set; }

    }
}
