using System;
using Kdn.Ext.Attributes;

namespace Transport.OtherModels.tdbf
{
    public class OtherRefuelling
    {
        [IdProperty]
        public int recordId { get; set; }
        public int oSheetNumber { get; set; }
        public int fuelId { get; set; }
        public int groupAccId { get; set; }
        public DateTime refuellingDate { get; set; }
        public int personId { get; set; }
        public decimal quantity { get; set; }

    }



}
