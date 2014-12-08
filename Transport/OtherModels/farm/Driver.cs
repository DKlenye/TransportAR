using System;
using Kdn.Ext.Attributes;
using NHibernate.Impl;

namespace Transport.OtherModels.farm
{
    public class Driver:common.Ownered
    {

        public const string FieldsMapping = @"[
            'DriverId',
            'People.PeopleId',
            'People.EmployeeNumber',
            'People.Department',
            'People.LastName',
            'People.FirstName',
            'People.MiddleName'     
        ]";

        [IdProperty]
        public int DriverId { get; set; }
        public People People { get; set; }

        public string Display
        {
            get
            {
                return String.Format(
                    "{0} {1} {2} Таб.№:{3}",
                    People.LastName,
                    People.FirstName,
                    People.MiddleName,
                    People.EmployeeNumber                    
                );
            }
        }



        public static DetachedQuery GetLicence(int id)
        {
            DetachedQuery q = new DetachedQuery(" from DriverLicence where Driver.DriverId = :id order by DateOfTerm desc");
            q.SetInt32("id", id);
            q.SetMaxResults(1);
            return q;
        }

    }
}
