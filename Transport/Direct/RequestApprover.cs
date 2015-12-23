using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using Transport.Models;
using System.Data.SqlClient;
using System.Data;

namespace Transport.Direct
{
    public partial class Direct : Kdn.Direct.Direct
    {

        [DirectMethod]
        [ParseAsJson]
        public string[] MailToApprover(object o)
        {
            var polymir = new PrincipalContext(ContextType.Domain, "POLYMIR.NET");
            var naftan = new PrincipalContext(ContextType.Domain, "lan.naftan.by");
            var mails = new List<string>();

            var approvers =
                db.Fetch<string>("SELECT DISTINCT ApproverLogin FROM Request WHERE ApproverLogin IS NOT NULL ORDER BY 1");

            approvers.ForEach(x =>
            {
                    var principal = UserPrincipal.FindByIdentity(x.Contains("LAN")?naftan:polymir, x);
                    if (principal != null && !String.IsNullOrEmpty(principal.EmailAddress) && !mails.Contains(x))
                        mails.Add(principal.EmailAddress);
            });
            mails.Sort();
            return mails.ToArray();
        }

    }
}
