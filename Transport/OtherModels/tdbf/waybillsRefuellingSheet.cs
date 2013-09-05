using System.Collections.Generic;
using System.Text;
using System;
using Castle.ActiveRecord;


namespace Transport.OtherModels.tdbf {
    
   [ActiveRecord]
   public class waybillsRefuellingSheets : tdbfActiveRecord<waybillsRefuellingSheets> {

      [PrimaryKey(Generator=PrimaryKeyType.Assigned)]
        public int sheetNumber { get; set; }
      [Property]
        public int fuelId { get; set; }
      [Property]
      public int groupAccId { get; set; }
      [Property]
        public short sheetState { get; set; }
      [Property]
        public DateTime?refuellingDate { get; set; }
    }
}
