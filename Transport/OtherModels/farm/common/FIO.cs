using System;

namespace Transport.OtherModels.farm.common
{
    public class FIO
    {

        public const string FieldsMapping = @"['FirstName','LastName','MiddleName']";

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }

        string Normalize(string str)
        {
            if (str == null) return "";
            else return String.Format("{0}{1}", str.Substring(0, 1).ToUpper(), str.Substring(1).ToLower());
        }

        public string FullFio
        {
            get
            {
                return String.Format(
                    "{0} {1} {2}",
                    Normalize(LastName),
                    Normalize(FirstName),
                    Normalize(MiddleName));
            }
        }

        public string ShortFio
        {
            get
            {
                return String.Format(
                    "{0} {1}.{2}.",
                    Normalize(LastName),
                    FirstName == null ? "" : FirstName[0].ToString().ToUpper(),
                    MiddleName == null ? "" : MiddleName[0].ToString().ToUpper());
            }
        }
    }
}
