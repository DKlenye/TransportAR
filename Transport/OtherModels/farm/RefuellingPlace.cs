using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{
    public class RefuellingPlace : common.Ownered
    {
        [IdProperty]
        public int RefuellingPlaceId { get; set; }
        public string RefuellingPlaceName { get; set; }
    }

}
