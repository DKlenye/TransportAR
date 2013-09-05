using System.Collections.Generic;
using System.Text;
using System;
using Castle.ActiveRecord;


namespace Transport.OtherModels.tdbf {
    
    
    [ActiveRecord]
    public class Waybillpackage : tdbfActiveRecord<Waybillpackage> {

        [PrimaryKey(Column="waybillPackageId")]
        public virtual int Waybillpackageid { get; set; }
        
        [Property(Column="waybillPackageName", Length=50, NotNull=true)]
        public virtual string Waybillpackagename { get; set; }
        
        [Property(Column="_using", NotNull=true)]
        public virtual bool Using { get; set; }
        
        [Property(Column="type")]
        public virtual byte Type { get; set; }
        
        [Property(Column="ownerId", NotNull=true)]
        public virtual byte Ownerid { get; set; }
    }
}
