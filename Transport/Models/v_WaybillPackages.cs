using System;
using System.Collections.Generic;
using Castle.ActiveRecord;
using System.Text;
using Kdn.Ext.Attributes;
using Newtonsoft.Json;
using Kdn.Direct;


namespace Transport.Models {    
    
   [Model,ActiveRecord("v_WaybillPackages")]
   public class v_WaybillPackages : ActiveRecordBase<v_WaybillPackages>,Interfaces.IOwnered {
        
        [Property(Column="PackageId"),PrimaryKey]
        public virtual int PackageId { get; set; }
        
        [IdProperty,Property(Column="PackageTypeId")]
        public virtual int PackageTypeId { get; set; }

        [Property(Column = "PackageTypeName")]
        public virtual string PackageTypeName { get; set; }  
      
        [Property(Column="WaybillCount")]
        public virtual int WaybillCount { get; set; }

        [Property]
        public virtual short isClose { get; set; }

        [Property]
        public virtual string display { get; set; }

        [AllowBlank, Property]
        public int OwnerId { get; set; }
        public void setOwner(int OwnerId) { this.OwnerId = OwnerId; }


        public override void UpdateAndFlush (){

           if( this.isClose == 1 ) {

              var package = WaybillPackage.Find(this.PackageId);
              package.CloseDate = DateTime.Now;
              package.CloseUserId = ((User)User.GetCurrent(typeof(User))).UserId;

              package.SaveAndFlush();

              var newPack = new WaybillPackage() {
                 PackageTypeId = this.PackageTypeId
              };

              newPack.SaveAndFlush();
              this.PackageId = newPack.PackageId;
              this.WaybillCount = 0;
              this.isClose = 0;
           }

        }


    }
}
