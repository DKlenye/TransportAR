using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models {
    
   [ActiveRecord]
   public class waybillsRefuellingSheets : ActiveRecordBase<waybillsRefuellingSheets> {
        
         [IdProperty,PrimaryKey]
        public int sheetNumber { get; set; }
        [Property]
        public int fuelId { get; set; }
        [Property]
        public int groupAccId { get; set; }
        [Property]
        public short sheetState { get; set; }

        [Property]
        public int RefuellingPlaceId { get; set; }

        [Property]
        public DateTime?refuellingDate { get; set; }

         
    }
}
