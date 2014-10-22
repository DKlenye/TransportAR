using System;
using System.Collections.Generic;
using Ext.Direct;
using Newtonsoft.Json.Linq;
using Kdn.Direct;
using Transport.Models;
using System.Data.SqlClient;
using System.Data;

namespace Transport.Direct
{
   public partial class Direct:Kdn.Direct.Direct
    {

      [DirectMethod]
      [ParseAsJson]
      public DataSerializer AccPostingRead(JObject o)
       {

         JToken p;
         int month=0, year=0, accountingId=0;
          
         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;            
         }
         if( o.TryGetValue("accounting", out p) && !String.IsNullOrEmpty(p.Value<string>())) {
            accountingId = p.Value<int>();
         }

          var db =new PetaPoco.Database("db2");          
          var rez = db.Query<Models.AccPosting>("Select * from AccPosting where AccPeriod = @0 and AccountingId = @1",
               year*100+month,
               accountingId
             );
          return new DataSerializer(new List<AccPosting>(rez));
       }

    

      [DirectMethod]
      [ParseAsJson]
      public string AccPostingCalculate(JObject o)
       {

         JToken p;
         int month=0, year=0, accountingId=0;
          
         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;            
         }
         if( o.TryGetValue("accounting", out p) && !String.IsNullOrEmpty(p.Value<string>())) {
            accountingId = p.Value<int>();
         }

          var db =new PetaPoco.Database("db2");

          db.Execute(";EXEC AccPostingCalculate @month,@year,@accountingId",
                 new
                 {
                    month = month,
                    year = year,
                    accountingId = accountingId
                 }
              );


          return "";
       }


      [DirectMethod]
      [ParseAsJson]
      public string SendPostings(JObject o) {

         JToken p;
         int month = 0, year = 0, accountingId = 0;

         if( o.TryGetValue("period", out p) && p.Value<DateTime?>() != null ) {
            month = p.Value<DateTime>().Month;
            year = p.Value<DateTime>().Year;
         }
         if( o.TryGetValue("accounting", out p) && !String.IsNullOrEmpty(p.Value<string>()) ) {
            accountingId = p.Value<int>();
         }

     
         var db = new PetaPoco.Database("db2");

         List<string> data = db.Fetch<string>(";EXEC AccPosting_XML @month,@year,@accountingId",
                new {month,year,accountingId}
             );


          

         string _data = "";

         foreach( string d in data){
            _data +=d;
         }


         string nameFile = "";


         //--todo Убрать нахрен хардкод!!!
         if( accountingId == 1 ) {
            nameFile = "prov0601";
         }
         else if( accountingId == 2 ) {
            nameFile = "prov0646";
         }
         //--
                  
         string message = _sendProv(_data, nameFile, year.ToString(), month.ToString());
         if( message == "" ) return "Выполнено успешно";
         else return "Ошибки: " + message;
      }     


      string _sendProv(string Data,string nameFile,string accyear,string accmonth)
        {
           // return "";
            SqlConnection destConn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["provSend"].ConnectionString);
            
            //   return Data;
            SqlCommand comm = destConn.CreateCommand();
            comm.CommandType = CommandType.StoredProcedure;
            comm.CommandText = "Balance.dbo.spu_AddPostings";
            SqlParameter param;
            SqlDataReader reader;
               
            string message = "";

            param = comm.Parameters.Add("@IdCompany", SqlDbType.Int);
            param.Value = 1;
            param = comm.Parameters.Add("@year", SqlDbType.SmallInt);
            param.Value = int.Parse(accyear);
            param = comm.Parameters.Add("@month", SqlDbType.TinyInt);
            param.Value = int.Parse(accmonth);
            param = comm.Parameters.Add("@NameFile", SqlDbType.VarChar, 100);
            param.Value = nameFile;
            param = comm.Parameters.Add("@Data", SqlDbType.Text);
            param.Value = Data;
            param = comm.Parameters.Add("@CheckSum", SqlDbType.Decimal);
            param.Value = null;
            
            try
            {
                destConn.Open();
                reader = comm.ExecuteReader();

                while (reader.Read())
                {
                    if (reader.GetValue(2).ToString() == "Exception")
                        message += reader.GetValue(0).ToString() + reader.GetValue(1).ToString() + "; ";
                }
            }
            catch (Exception ex)
            {
                destConn.Close();
                return ex.Message;
            }
            destConn.Close();
            return message;
        } 


    }





}
