<%@ Page Language="C#" AutoEventWireup="true" Inherits="Transport.Web.WaybillTpl" %> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
  <title>печать путевых листов</title>
  <meta http-equiv="content-Type" content="text/html; charset=windows-1251">
  
 
 <style type="text/css"> 
body, td  {
	font-size: 12px;
	font-family: Courier New;
	background-color: white;
	color: black;
	margin-top: 0;
	margin-left: 0;
}


#prn_waybillType{ position: absolute; top: 0mm; left: 32mm; }
#prn_waybillNumber{ position: absolute; top: 5mm; left: 58mm; }
#prn_stamp{ position: absolute; top: 5mm; left: 2mm; }
#prn_departureDate{ position: absolute; top: 16mm; left: 72mm; }
#prn_returnDate{ position: absolute; top: 16mm; left: 130mm; }
#prn_model{ position: absolute; top: 25mm; left: 58mm; }
#prn_registrationNumber{ position: absolute; top: 25mm; left: 130mm; }
#prn_drivers{ position: absolute; top: 33mm; left: 46mm; }
#prn_garageNumber{ position: absolute; top: 25mm; left: 172mm; }
#prn_customerId{ position: absolute; top: 42mm; left: 46mm; }
#prn_customerName{ position: absolute; top: 42mm; left: 62mm; }
#prn_departureTime{ position: absolute; top: 75mm; left: 11mm; }
#prn_returnTime{ position: absolute; top: 75mm; left: 31mm; }

#prn_formNumber{ position: absolute; top: 12mm; left: 42mm; }

#prn_fuelName{ position: absolute; top: 100mm; left: 15mm; }
#prn_fuelRemain{ position: absolute; top: 100mm; left: 45mm; }
 
</style>
 
</head>
 
 


<body>
<form id="form1" runat="server">




<div id="prn_waybillType" offset="true">/20/</div><div offset="true" id="prn_stamp" style="border: 2px solid #88A1C0; text-align: center; font: normal 12px Times New Roman">
    Открытое акционерное общество <br />
    "НАФТАН"<br />
    Республика Беларусь,Витебская обл.<br />
    211440,г.Новополоцк<br />
    тел. 59-83-09
  </div>
  <div offset="true" id="prn_garageNumber">Гаражный № <%Response.Write(VehicleGarageNumber()); %></div>
  <div offset="true" id="prn_model"><%Response.Write(VehicleModel()); %></div>
  <div offset="true" id="prn_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
  <div offset="true" id="prn_waybillNumber"><% Response.Write(String.Format("No {0}",WaybillNumber())); %></div>
  <div offset="true" id="prn_formNumber"></div>
  <div offset="true" id="prn_departureDate">
  <span style="width: 10mm"><%Response.Write(DepartureDate("dd")); %></span>
  <span style="width: 25mm"><%Response.Write(DepartureDate("MMMM")); %></span><%Response.Write(DepartureDate("yyyy")); %></div>
  <div offset="true" id="prn_departureTime"><%Response.Write(DepartureDate("HH:mm")); %></div>
  
   <div offset="true" id="prn_fuelName"><%Response.Write(FuelName()); %></div>
   <div offset="true" id="prn_fuelRemain"><%Response.Write(FuelRemains()); %></div>
  
<!--
  <div offset="true" id="prn_fuelRemains"><div>
  <span style="width:60mm;"><%Response.Write(FuelName()); %>       </span>   <%Response.Write(FuelRemains()); %>               </div>
  </div>
  -->
  
  <div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %> </div>
  <div offset="true" id="prn_returnDate"> по <%Response.Write(ReturnDate("dd.MM.yyyy")); %></div>
  <div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>
  <div offset="true" id="prn_drivers">
  <div style="height: 5mm; width: 90mm; overflow: hidden;">
	<div><span style="width: 70mm;"> <%Response.Write(DriverFio(1)); %> <%Response.Write(DriverLicence(1)); %></span> <%Response.Write(DriverTab(1)); %></div>
	</div>
	</div>
 

</form>
</body>
</html>                                                                

