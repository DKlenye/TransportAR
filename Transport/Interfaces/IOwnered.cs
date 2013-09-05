using System;
using System.Collections.Generic;
using System.Text;
using NHibernate;
using NHibernate.Criterion;

namespace Transport.Interfaces
{
    public interface IOwnered
    {
        void setOwner(int OwnerId);
       // void readWithOwner(DetachedCriteria criteria,int OwnerId);      
    }
}
