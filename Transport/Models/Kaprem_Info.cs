using System;

namespace Transport.Models
{
    public class Kaprem_Info
    {
        public int kgr { get; set; }
        public int kdog { get; set; }
        public string osn { get; set; }
        public string CustomerName { get; set; }
        public int scoreNo { get; set; }
        public DateTime ScoreDate { get; set; }
        public decimal summ { get; set; }
        public decimal taxsumm { get; set; }
        public decimal taxRate { get; set; }
        public decimal allSumm { get; set; }
    }
}
