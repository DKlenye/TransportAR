using System;
using System.Collections.Generic;
using System.Linq;
using Castle.ActiveRecord;
using Castle.ActiveRecord.Queries;
using Castle.Core;
using NHibernate.Criterion;
using Transport.Direct;

namespace Transport.Models
{
    [ActiveRecord]
    public class DistributionList:ActiveRecordBase<DistributionList>
    {
        [PrimaryKey]
        public int ListId { get; set; }
        
        [Property(ColumnType = "Date")]
        public DateTime ListDate { get; set; }

        public static DistributionList FinByDate(DateTime date)
        {
            return FindFirst(Restrictions.Where<DistributionList>(x => x.ListDate == date));
        }

        public DistributionList FindPrevious()
        {
           return FindFirst(Order.Desc(Projections.Property<DistributionList>(x => x.ListDate)),
                Restrictions.Where<DistributionList>(x => x.ListDate < ListDate));
        }

        public ICollection<DistributionListDetails> FindDetails()
        {
            return DistributionListDetails.FindAll(
                Restrictions.Where<DistributionListDetails>(x => x.ListId == ListId));
        }

        public static DistributionListDetails[] FindBusinessTripDetailsForDate(DateTime date)
        {
            var query = new SimpleQuery<DistributionListDetails>(QueryLanguage.Hql,

                @"select details from DistributionListDetails as details,DistributionList as list
                    where details.ListId=list.ListId and list.ListDate < ? and details.ReturnDate > ? and details.ScheduleId=6",
                date, date);
            
            return query.Execute();
        }

        public static DistributionListDetails FindBusinessTripVehicleDetailsForDate( BaseVehicle car, DateTime date)
        {
            var query = new SimpleQuery<DistributionListDetails>(QueryLanguage.Hql,

                @"select details from DistributionListDetails as details,DistributionList as list
                    where details.ListId=list.ListId and list.ListDate < ? and details.ReturnDate > ? and details.ScheduleId=6 and Car = ?",
                date, date, car);

            return query.Execute().FirstOrDefault();
        }


        public static ICollection<DistributionListDetails> CreateList(DateTime date)
        {
            var list = FinByDate(date);
            if (list == null)
            {
                list = new DistributionList() {ListDate = date};
                list.SaveAndFlush();

                var vehiclesMap = FullCar.FindAll(Expression.Where<FullCar>(x => x.GroupRequestId != null && x.OwnerId == 1 && x.WriteOffDate == null)).Map(x=>x.VehicleId);
                
                var details = new List<DistributionListDetails>();

                var previousList = list.FindPrevious();
                var previousDetails = previousList.FindDetails();

                previousDetails.ForEach(d =>
                {
                    var car = (FullCar)vehiclesMap[d.Car.VehicleId];
                    if (car != null)
                    {


                        TimeSpan departureTime;
                        TimeSpan returnTime;

                        TimeSpan.TryParse(car.StartWork, out departureTime);
                        TimeSpan.TryParse(car.EndWork, out returnTime);

                        var detail = new DistributionListDetails()
                        {
                            ListId = list.ListId,
                            Car = d.Car,
                            ReturnDate = date.Add(returnTime.Hours == 0 ? TimeSpan.Parse("16:45") : returnTime),
                            DepartureTime =
                                date.Add(departureTime.Hours == 0 ? TimeSpan.Parse("08:00") : departureTime)
                                    .ToString("HH:mm"),
                            Shift = 1,
                            ScheduleId = car.ScheduleId == null ? 1 : car.ScheduleId.Value,
                            TrailerId = car.TrailerId
                        };

                        detail.SaveAndFlush();


                        d.Drivers.ForEach(x => detail.Drivers.Add(new DistributionDrivers()
                        {
                            Driver = x.Driver,
                            ListDetailId = detail.ListDetailId,
                        }));

                        detail.SaveAndFlush();

                        if (car.Customer != null)
                        {
                            detail.Customers.Add(new DistributionCustomers()
                            {
                                Customer = car.Customer,
                                ListDetailId = detail.ListDetailId,
                                DepartureTime = detail.DepartureTime
                            });
                        }


                        detail.SaveAndFlush();

                        details.Add(detail);
                    }
                });

                return details;

            }

            return list.FindDetails();
        }

    }
}
