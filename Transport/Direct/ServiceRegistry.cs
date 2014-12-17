using System;
using System.Linq;
using Castle.ActiveRecord;
using Castle.Core;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Transport.Models;
using Transport.OtherModels.ogmnew;

namespace Transport.Direct
{
    public partial class Direct : Kdn.Direct.Direct
    {
        [DirectMethod]
        [ParseAsJson]
        public string sendServiceRegistry(JObject o)
        {

           DateTime date = new DateTime(o["year"].Value<int>(), o["month"].Value<int>(), 1);
            var db = new PetaPoco.Database("dbsrv2");
            var list = db.Query<Kaprem_Info>(String.Format("execute Kaprem_Info_Get {0},{1}", date.Month, date.Year));
            var s = ActiveRecordMediator.GetSessionFactoryHolder().CreateSession(typeof(kaprem));
            var kList = kaprem.FindAll();
            list.ForEach(x =>
            {
                var k = kList.AsQueryable().FirstOrDefault(xx => xx.idrees == x.scoreNo) ?? new kaprem() { idrees = x.scoreNo };

                k.kpost1 = /*x.kgr.ToString()*/"46716".PadRight(5);
                k.sbs = "";
                k.skop = "";
                k.kodz = "";
                k.prl = "99";
                k.nameakt = "";
                k.kodnds = x.taxsumm==0?"0":(x.taxRate*100).ToString();
                k.kobu = "";
                k.nakt = x.scoreNo.ToString();
                k.dakt = x.ScoreDate;
                k.date = date.ToString("MM") + date.Year.ToString().Substring(2);
                k.stm = x.allSumm;
                k.nds = x.taxsumm;
                k.prs = "";
                k.sum1 = x.summ;
                k.sumv1 = 0;
                k.stmv = 0;
                k.kodval = "RB";
                k.idagree = x.kdog;
                k.rees = "c";

                k.idvd = "";
                k.krp = "";
                k.nsfn = "";
                k.snu = "";
                k.idtar = "";
                k.klv = 0;

                k.datp = new DateTime();            
                k.datpe = new DateTime();
                k.dsfn = new DateTime();
                k.psfn = new DateTime();
                k.dat_pl = new DateTime();

                k.SaveAndFlush();

            });
            
            return list.Count().ToString();
        }


    }
}
