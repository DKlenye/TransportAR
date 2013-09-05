using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Hql;

namespace Transport.OtherModels.tdbf
{
    public class _FuelNorm
    {
        [IdProperty]
        public int FuelNormId { get; set; }
        public int FuelId { get; set; }
        public decimal basicNorm { get; set; }

        public string note { get; set; }
        public decimal coefficientMh{get;set;}

        public bool notInMetters { get; set; }
        public short normType { get; set; }
        public bool additional { get; set; }

        public bool enabled { get; set; }
        public DateTime? startingDate { get; set; }
        public DateTime? dateOfTerm { get; set; }

        public int ownerId { get; set; }
        public int garageNumber { get; set; }

       

    }



}
