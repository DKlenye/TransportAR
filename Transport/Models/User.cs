using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Kdn.Direct;

namespace Transport.Models
{

    [ActiveRecord("Users")]
    public class User:Kdn.CommonModels.User
    {

       public User() {
          Owners = new List<int>();
          Groups = new List<int>();
       }

       [AllowBlank, HasAndBelongsToMany(Fetch=FetchEnum.SubSelect,Table = "UserInOwner", ColumnKey = "UserId", Element = "OwnerId", ColumnRef = "OwnerId" , ElementType=typeof(int))]
        public ICollection<int> Owners { get; set; }



    }
}
