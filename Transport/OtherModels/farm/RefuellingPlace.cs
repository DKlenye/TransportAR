using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Transport.OtherModels.farm
{
    public class RefuellingPlace : common.Ownered
    {
        [IdProperty]
        public int RefuellingPlaceId { get; set; }
        public string RefuellingPlaceName { get; set; }
    }

}
