using System;
using System.IO;
using System.Linq;
using System.Web;
using Castle.Core;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Transport.Models;
using Transport.OtherModels.fseb;

namespace Transport.Direct
{
    public partial class Direct : Kdn.Direct.Direct
    {
        [DirectMethod]
        [ParseAsJson]
        public string sendExpenseList(JObject o)
        {
            DateTime date = new DateTime(o["year"].Value<int>(), o["month"].Value<int>(),1);

            string destPath = @"\\Pump\buh_acc$\ARM\RFS\fseb\";
            string sourcePath = @"..\db\";
            string fileName = "Tran.dbf";
            
            File.Copy(
                HttpContext.Current.Server.MapPath(String.Format("{0}{1}",sourcePath,fileName)),
                String.Format("{0}{1}", destPath, fileName),
                true
            );

            var list = db.Query<ExpenseList>(String.Format("execute ssrs_ExpenseList {0},{1},null",date.Month,date.Year));
            
            list.ForEach(x => new Tran(
                x.debet,
                x.bs,
                x.sbs,
                x.Km,
                x.Mh
                ).SaveAndFlush());

            File.Delete(String.Format("{0}Tran{1}{2}.dbf", destPath, date.ToString("yy"), date.ToString("MM")));
            
            File.Copy(
                 String.Format("{0}{1}", destPath, fileName),
                 String.Format("{0}Tran{1}{2}.dbf", destPath, date.ToString("yy"),date.ToString("MM") )
                );

            return "";
        }


    }
}
