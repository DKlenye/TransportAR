using System.Collections.Generic;
using System.Security.Principal;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{

    [Model, ActiveRecord("Users")]
    public class User : ActiveRecordBase<User>
    {
        [IdProperty, PrimaryKey]
        public int UserId { get; set; }

        [Property]
        public string Name { get; set; }

        [Property(Index = "UserLogin_idx")]
        public string Login { get; set; }

        [Property]
        [AllowBlank]
        public string Phone { get; set; }

        [Property]
        [AllowBlank]
        public bool isAdmin { get; set; }

        [AllowBlank,
         HasAndBelongsToMany(Fetch = FetchEnum.SubSelect, Table = "UserInGroup", ColumnKey = "UserId",
             Element = "UserGroupId", ColumnRef = "UserGroupId", ElementType = typeof (int))]
        public ICollection<int> Groups { get; set; }

        public User()
        {
            Owners = new List<int>();
            Groups = new List<int>();
        }

        [AllowBlank,
         HasAndBelongsToMany(Fetch = FetchEnum.SubSelect, Table = "UserInOwner", ColumnKey = "UserId",
             Element = "OwnerId", ColumnRef = "OwnerId", ElementType = typeof (int))]
        public ICollection<int> Owners { get; set; }

        public static User GetByLogin(string login)
        {
            return FindOne(Restrictions.Where<User>(x => x.Login == login));
        }

        public static User GetCurrent()
        {
            var p = new WindowsPrincipal(WindowsIdentity.GetCurrent());
            string[] name = p.Identity.Name.Split('\\');

            string domain = name[0];
            string login = name[1];

            var u = GetByLogin(login);

            if (u == null)
            {
                u = new User()
                {
                    Name = login,
                    Login = login
                };
                u.Owners.Add(1);
                u.SaveAndFlush();
            }

            return u;
        }
    }
}
