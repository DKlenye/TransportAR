using System;

namespace Kdn
{
    public static class DateUtils
    {

        public static DateTime FirstDayOfMonth()
        {
            DateTime dt = DateTime.Now;
            return DateTime.Parse(String.Format("01.{0}.{1}", dt.Month, dt.Year));
        }


        public static DateTime Parse (string date,string time){
            return DateTime.Parse(String.Format("{0} {1}",date,time));
        }

        public static DateTime FirstDayOfMonth(int Month, int Year)
        {
            return DateTime.Parse(String.Format("01.{0}.{1}",Month,Year));
        }
        public static DateTime LastDayOfMonth(int Month, int Year)
        {
           return FirstDayOfMonth(Month, Year).AddMonths(1).AddMinutes(-1);
        }
        public static DateTime LastDayOfMonth()
        {
            DateTime dt = DateTime.Now;
            return FirstDayOfMonth(dt.Month, dt.Year).AddMonths(1).AddMinutes(-1);
        }

        public static DateTime TodayStart()
        {
            DateTime t = DateTime.Now;
            t = t.Date;
            return t;            
        }

        public static DateTime TodayStart(DateTime date)
        {
            DateTime t = date.Date;
            return t;
        }


        public static DateTime TodayEnd()
        {
            DateTime t = TodayStart();
            return t.AddDays(1).AddMinutes(-1);
        }

        public static DateTime TodayEnd(DateTime date)
        {
            DateTime t = TodayStart(date);
            return t.AddDays(1).AddMinutes(-1);
        }

    }
}
