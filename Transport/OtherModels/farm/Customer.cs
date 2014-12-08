using System;
using Kdn.Ext.Attributes;

namespace Transport.OtherModels.farm
{
    
    public class Customer:common.Ownered
    {

        public const string FieldsMapping = @"[
                'CustomerId',
                'CustomerName'
            ]";

        [IdProperty]
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CostCode { get; set; }

        public bool? Hide { get; set; }


        public string Display
        {
            get
            {
                return String.Format(
                        "[{0}] ({1}) {2}",
                        CustomerId,
                        CostCode.Trim(),
                        CustomerName.Trim()
                    );
            }
        }



    }
}
