using Castle.ActiveRecord;


namespace Transport.OtherModels.tdbf {
    
    
    [ActiveRecord("waybillsPackages")]
    public class Waybillspackages : tdbfActiveRecord<Waybillspackages> {
        
        [PrimaryKey(Column="waybillPackageNumber")]
        public virtual int Waybillpackagenumber { get; set; }
        
        [Property]
        public virtual int waybillPackageId { get; set; }
        
        [Property(Column="note", Length=100)]
        public virtual string Note { get; set; }
        
        [Property(Column="owner", Length=100)]
        public virtual string Owner { get; set; }
        
        [Property(Column="ownerId")]
        public virtual byte Ownerid { get; set; }
        
        [Property(Column="idClient")]
        public virtual int Idclient { get; set; }
    }
}
