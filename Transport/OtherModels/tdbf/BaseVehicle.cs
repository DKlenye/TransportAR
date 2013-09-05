using System;
using System.Collections.Generic;
using Kdn.Ext;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.OtherModels.tdbf
{
    public class BaseVehicle
    {
        public const string FieldsMapping = @"[
            'GarageNumber',
            'Model',
            'RegistrationNumber',
            'Inventory'      
        ]";

        [IdProperty]
        public virtual int GarageNumber { get; set; }
        public virtual string Model { get; set; }
        public virtual string RegistrationNumber { get; set; }
        public virtual string Inventory { get; set; }
        public virtual int OwnerId { get; set; }
        public virtual int subOwnerId { get; set; }


        public int ReplicationId { get { return OwnerId * 10000 + GarageNumber; } }


        public override int GetHashCode()
        {
           return ReplicationId;
        }
        public override bool Equals(object obj)
        {
            if (obj == null || !(obj is BaseVehicle)) return false;
            return ((obj as BaseVehicle).ReplicationId == ReplicationId);
        }

        public static DetachedCriteria Query(JToken query)
        {
            DetachedCriteria criteria = DetachedCriteria.For<BaseVehicle>();
            int tmp;

            if (int.TryParse(query.Value<string>(), out tmp))
            {
                criteria.Add(Expression.Or(
                    Expression.Eq("GarageNumber", query.Value<int>()),
                    Expression.Like("RegistrationNumber", query.Value<string>(),MatchMode.Anywhere).IgnoreCase()                    
                    ));
            }
            else
            {
                criteria.Add(Expression.Like("Model", query.Value<string>(), MatchMode.Anywhere).IgnoreCase());
            }

            return criteria;
        }


    }
}
