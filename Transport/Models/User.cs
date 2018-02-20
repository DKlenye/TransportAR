using System.Collections.Generic;
using System.Security.Principal;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
using NHibernate.Criterion;

namespace Transport.Models
{

    /// <summary>
    /// Пользователь
    /// </summary>
    [Model, ActiveRecord("Users")]
    public class User : ActiveRecordBase<User>
    {

        /// <summary>
        /// Конструктор
        /// </summary>
        public User()
        {
            Owners = new List<int>();
        }

        /// <summary>
        /// Код пользователя
        /// </summary>
        [IdProperty, PrimaryKey]
        public int UserId { get; set; }

        /// <summary>
        /// ФИО
        /// </summary>
        [Property]
        public string Name { get; set; }

        /// <summary>
        /// Логин
        /// </summary>
        [Property(Index = "UserLogin_idx")]
        public string Login { get; set; }

        /// <summary>
        /// Телефон
        /// </summary>
        [Property]
        [AllowBlank]
        public string Phone { get; set; }

        /// <summary>
        /// Признак администратора
        /// </summary>
        [Property]
        [AllowBlank]
        public bool isAdmin { get; set; }

        /// <summary>
        /// Коды владельцев транспорта, к которым имеет доступ пользователь
        /// </summary>
        [AllowBlank,
         HasAndBelongsToMany(Fetch = FetchEnum.SubSelect, Table = "UserInOwner", ColumnKey = "UserId",
             Element = "OwnerId", ColumnRef = "OwnerId", ElementType = typeof (int))]
        public ICollection<int> Owners { get; set; }

        /// <summary>
        /// Получить пользователя по логину
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        public static User GetByLogin(string login)
        {
            return FindOne(Restrictions.Where<User>(x => x.Login == login));
        }

        /// <summary>
        /// Получить текущего пользователя. Если пользователь не найден, то он будет добавлен
        /// </summary>
        /// <returns></returns>
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
