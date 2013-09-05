﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Transport.Models
{
    public class KmLimitsDetails
    {
        public int WaybillId { get; set; }
        public DateTime DepartureDate { get; set; }
        public string ScheduleName { get; set; }
        
        public int DepartureCount { get; set; }
        public int ReturnCount { get; set; }

        public decimal Km { get; set; }
    }
}
