using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Castle.ActiveRecord;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Kdn.Ext.Attributes;
using NHibernate.SqlCommand;
using Expression = NHibernate.Criterion.Expression;

namespace Transport.Models.car
{
    [ActiveRecord,Model]
    public class NormIncrease:ActiveRecordBase<NormIncrease>
    {
        [PrimaryKey,IdProperty]
        public int NormIncreaseId { get; set; }

        [Property]
        public int NormId { get; set; }

        [Property]
        public int IncreaseId { get; set; }

        [Property]
        public short Prcn { get; set; }

        [Property]
        public bool? Force { get; set; }

        [Property]
        public bool? Const { get; set; }


        public static NormIncrease[] FindByNorm(int normId)
        {
            return FindAll(Expression.Where<NormIncrease>(x => x.NormId == normId));
        }

    }
}
