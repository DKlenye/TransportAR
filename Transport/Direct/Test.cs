using System.Globalization;
using Ext.Direct;

namespace Transport.Direct
{
    public partial class Direct
    {

        [DirectMethod]
        public string Calc(int x, int y )
        {
            return (x*y).ToString(CultureInfo.InvariantCulture);
        }


    }
}
