using Kdn.Ext.Attributes;


namespace Transport.OtherModels.tdbf
{
    public class Driver
    {
        [IdProperty]
        public int DriverId { get; set; }
        public int OwnerId { get; set; }
        public BasePeople People { get; set; }
    }
}
