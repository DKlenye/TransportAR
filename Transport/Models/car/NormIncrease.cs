using Castle.ActiveRecord;
using Kdn.Ext.Attributes;
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
