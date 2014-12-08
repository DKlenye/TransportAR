using Castle.ActiveRecord;


namespace Transport.OtherModels.tdbf {
    
    
    [ActiveRecord("bodyTypes")]
    public class Bodytype : tdbfActiveRecord<Bodytype> {
        
        [PrimaryKey(Column="bodyTypeId")]
        public virtual int Bodytypeid { get; set; }
        
        [Property(Column="bodyTypeName", Length=50, NotNull=true)]
        public virtual string Bodytypename { get; set; }
    }
}
