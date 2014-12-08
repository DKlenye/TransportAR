using System;
using Castle.ActiveRecord;
using Kdn.Ext.Attributes;

namespace Transport.Models {
   [Model,ActiveRecord]
   public class Employee : ActiveRecordBase<Employee> {

      [IdProperty,PrimaryKey]
      public int EmployeeId { get; set; }

      [Property(UniqueKey="id_men_idx")]
      public int? id_men { get; set; }

      [Property]
      public string LastName { get; set; }
      [Property]
      public string FirstName { get; set; }
      [Property]
      public string MiddleName { get; set; }

      [Property(Index="EmployeeNumber_idx")]
      public string EmployeeNumber { get; set; }
      [Property]
      public string Department { get; set; }

      [AllowBlank,Property]
      public string Office { get; set; }
      [Property]
      public DateTime? IncomeDate { get; set; }
      [Property]
      public DateTime? DismissDate { get; set; }

      [AllowBlank,Property]
      public short DSC { get; set; }
   }
}
