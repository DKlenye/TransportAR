using System;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

using Iesi.Collections.Generic;

namespace Transport.OtherModels.farm
{

    public class BaseVehicle : common.Ownered
    {

        public const string FieldsMapping = @"[
                'VehicleId',
                'GarageNumber',
                'Model',
                'RegistrationNumber',
                'InventoryNumber'
            ]";  

        [IdProperty]
        public int VehicleId { get; set; }
        public string Model { get; set; }
        public int GarageNumber { get; set; }
        public string RegistrationNumber { get; set; }
        public string InventoryNumber { get; set; }

        public string StartWork { get; set; }
        public string EndWork { get; set; }

        public int WaybillTypeId { get; set; }
        public int CustomerId { get; set; }
        
    }
    

    
    public class Vehicle:BaseVehicle
    {
        
        public ICollection<VehicleDriver> VehicleDriver { get; set; }
        public ICollection<VehicleNorm> VehicleNorm { get; set; }

        public ICollection<Fuel> VehicleFuels
        {
            get
            {
                List<Fuel> fuels = new List<Fuel>();


                foreach (var norm in VehicleNorm)
                {
                    foreach (var fuel in norm.VehicleNormFuels)
                    {
                        if (!fuels.Contains(fuel)) fuels.Add(fuel);
                    }
                }

                return fuels;
            }
        }

                
    }
    
}
