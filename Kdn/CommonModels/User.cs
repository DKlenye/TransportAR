using System;
using System.Security.Principal;
using System.Collections.Generic;
using System.Collections;
using System.Text;
using Kdn.Direct;
using Kdn.Ext.Attributes;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
using Kdn.Interfaces;


namespace Kdn.CommonModels
{
    [Model, ActiveRecord("Users")]
    public class User:ActiveRecordBase<User>,IUser
    {
        [IdProperty,PrimaryKey]
        public int UserId { get; set; }
        
        [Property]
        public string Name { get; set; }
        
        [Property(Index="UserLogin_idx")]
        public string Login { get; set; }
        
        [Property][AllowBlank]
        public string Phone { get; set; }
        
        [Property][AllowBlank]
        public bool isAdmin { get; set; }


        [AllowBlank, HasAndBelongsToMany(Fetch = FetchEnum.SubSelect,Table = "UserInGroup", ColumnKey = "UserId", Element = "UserGroupId", ColumnRef = "UserGroupId", ElementType = typeof(int))]
        public ICollection<int> Groups { get; set; }



        public static IUser GetCurrent()
        {
            return GetCurrent(typeof(User));
        }

        public static IUser GetCurrent(Type userType)
        {
            WindowsPrincipal p = new WindowsPrincipal(WindowsIdentity.GetCurrent());
            string[] name = p.Identity.Name.Split('\\');

            string domain = name[0];
            string login = name[1];


            var u = ActiveRecordMediator.FindOne(userType, Expression.Eq("Login", login));

            //User u = User.FindOne(Expression.Where<User>(x=>x.Login==login));

            if (u == null)
            {

                u = Activator.CreateInstance(userType);
                userType.GetProperty("Login").SetValue(u, login, null);
                userType.GetProperty("Name").SetValue(u, login, null);

                /*
                u = new User()
                {
                    Login = login,
                    Name = login
                };
                 * */

                ActiveRecordMediator.SaveAndFlush(u);

               // u.SaveAndFlush();

            }

            return (IUser)u;
        }


    }
}
