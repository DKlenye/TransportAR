using System.Collections.Generic;
using System.Text;
using System;
using Castle.ActiveRecord;

namespace Transport.OtherModels.tdbf {
    
   [ActiveRecord]
   public class waybillsRefuelling : tdbfActiveRecord<waybillsRefuelling> {

      [PrimaryKey]
        public int recordId { get; set; }

      [Property]
        public byte ownerId { get; set; }
      [Property]
        public int waybillNumber { get; set; }
      [Property]
        public int garageNumber { get; set; }
      [Property]
      public int refuellingId { get; set; }
      [Property]
        public int? sheetNumber { get; set; }
      [Property]
        public System.DateTime refuellingDate { get; set; }
      [Property]
        public int fuelId { get; set; }
      [Property]
        public int? driverId { get; set; }
      [Property]
        public decimal quantity { get; set; }
      [Property]
        public System.Nullable<bool> _dbf { get; set; }
      [Property]
        public int? correctionId { get; set; }
      [Property]
        public string CartNo { get; set; }
    }
}