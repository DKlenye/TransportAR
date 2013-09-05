using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Transport.OtherModels.tdbf
{
    public class WaybillTask
    {
        [IdProperty]
        public int waybillTaskId { get; set; }

        public int ownerId{get;set;}
        public int garageNumber{get;set;}
        public int waybillNumber{get;set;}

     //   public _FuelNorm fuelNorm { get; set; }
        public DateTime? taskBeginDate { get; set; }
        public decimal? mh { get; set; }
        public decimal? km { get; set; }
        public decimal? mass { get; set; }
        public decimal? massRace { get; set; }
        public int? trailerGarageNumber { get; set; }

        public short raceAbroad { get; set; }
        public int? passengers { get; set; }
        public decimal? accConsumption { get; set; }
        public int? invoiceSetNumber { get; set; }
        public decimal? raceBY { get; set; }

        public short? isCustomerDebit { get; set; }
        public short? isUnaccounted { get; set; }

        public IList<WaybillTaskIncrease> increases { get; set; }


        public int CustomerId {get; set; }

        public int? replicationID { get; set; }
     

    }
}
