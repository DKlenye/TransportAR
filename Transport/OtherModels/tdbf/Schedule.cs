using Kdn.Ext.Attributes;

namespace Transport.OtherModels.tdbf
{
    public class Schedule
    {
        [IdProperty]
        public int scheduleId { get; set; }
        public string scheduleName { get; set; }
    }



}
