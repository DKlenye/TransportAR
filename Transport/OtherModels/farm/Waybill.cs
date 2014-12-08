using System;
using System.Collections.Generic;

namespace Transport.OtherModels.farm
{

    public class BaseWaybill
    {
        public int WaybillId { get; set; }
        public int VehicleId { get; set; }

        public int Position { get; set; }

        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }

        public string FormNumber { get; set; }
        public int WaybillTypeId { get; set; }
        public string Way { get; set; }

        public int DriverId { get; set; }

        public short Shift { get; set; }

        public bool isClosed { get; set; }

        public int AccPeriod { get; set; }

    }


    public class Waybill:BaseWaybill
    {

        private ICollection<WaybillFuelRemain> _WaybillFuelRemains;
        private ICollection<WaybillCounter> _WaybillCounters;
        public ICollection<WaybillTask> _WaybillTasks;

        
        public ICollection<int> WaybillDrivers { get; set; }
        public ICollection<WaybillRefuelling> WaybillRefuelling { get; set; }


        public ICollection<WaybillCounter> WaybillCounters
        {
            get { return _WaybillCounters; }
            set
            {
                foreach (var item in value)
                {
                    item.Waybill = this;
                }
                this._WaybillCounters = value;
            }
        }

        public ICollection<WaybillTask> WaybillTasks
        {
            get { return _WaybillTasks; }
            set
            {
                foreach (var item in value)
                {
                    item.Waybill = this;
                }
                this._WaybillTasks = value;
            }
        }

        public ICollection<WaybillFuelRemain> WaybillFuelRemains
        {
            get { return _WaybillFuelRemains; }
            set
            {
                foreach (var item in value)
                {
                    item.Waybill = this;
                }
                this._WaybillFuelRemains = value;
            }
        }
    }


    public class WaybillList : BaseWaybill
    {        
    }



    public class WaybillDrivers
    {
        public Driver Driver { get; set; }
        public int WaybillId { get; set; }

        public override bool Equals(object obj)
        {
            WaybillDrivers d = obj as WaybillDrivers;
            return Driver == d.Driver && WaybillId == d.WaybillId;
        }

        public override int GetHashCode()
        {
            return Driver.GetHashCode() ^ WaybillId.GetHashCode();
        }



    }



}

