using System;
using Castle.ActiveRecord;

namespace Transport.OtherModels.ogmnew
{
    [ActiveRecord(Where = "rees='c'")]
    public class kaprem:ogmnewAR<kaprem>
    {
        
        [Property]
        public string kpost1 { get; set; }
        [Property]
        public string sbs { get; set; }
        [Property]
        public string skop { get; set; }
        [Property]
        public string kodz { get; set; }
        [Property]
        public string date { get; set; }
        [Property]
        public decimal stm { get; set; }
        [Property]
        public string prl { get; set; }
        [Property]
        public decimal nds { get; set; }
        [Property]
        public decimal sum1 { get; set; }
        [Property]
        public decimal vozv { get; set; }
        [Property]
        public string prs { get; set; }
        [Property]
        public string nakt { get; set; }
        [Property]
        public DateTime? dakt { get; set; }
        [Property]
        public decimal sumv1 { get; set; }
        [Property]
        public decimal ndsv { get; set; }
        [Property]
        public decimal stmv { get; set; }
        [Property]
        public string kodval { get; set; }
        [Property]
        public string nameakt { get; set; }
        [Property]
        public string kodnds { get; set; }
        [Property]
        public int idkodved { get; set; }
        [Property]
        public int idagree { get; set; }
        [Property]
        public string kobu { get; set; }
        [Property]
        public string rees { get; set; }
        [Property]
        public decimal sum2 { get; set; }
        [Property]
        public int ndokz { get; set; }
        [Property]
        public string idvd { get; set; }
        [Property]
        public string krp { get; set; }
        [Property]
        public string nsfn { get; set; }
        [Property]
        public string snu { get; set; }
        [Property]
        public string idtar { get; set; }
        [Property]
        public decimal klv { get; set; }
        [Property]
        public decimal cen { get; set; }
        [Property]
        public DateTime? datp { get; set; }
        [Property]
        public int nprih { get; set; }
        [Property]
        public DateTime? datpe { get; set; }
        [Property]
        public decimal smat { get; set; }
        [Property]
        public DateTime? dsfn { get; set; }
        [Property]
        public DateTime? psfn { get; set; }
        [Property]
        public DateTime? dat_pl { get; set; }
        [Property]
        public int id31 { get; set; }
        [Property]
        public int iduser { get; set; }

        [Property]
        public int idspec { get; set; }


        [PrimaryKey(Generator = PrimaryKeyType.Assigned)]
        public int idrees { get; set; }
    }
}
