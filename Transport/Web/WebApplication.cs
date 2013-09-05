using System;
using Transport.Models;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Framework.Internal;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace Transport.Web
{
    public class WebApplication:Kdn.Web.WebApplication
    {
        protected override Assembly GetModelsAssembly()
        {
            return Assembly.GetExecutingAssembly();
        }

        //Убираем стандартного пользователя, так как в транспорте своя реализация Transport.Models.User
        protected override List<Type> GetDefaultTypes()
        {
            List<Type> types = base.GetDefaultTypes();
            types.Remove(typeof(Kdn.CommonModels.User));
            return types;
        }
    }
}


