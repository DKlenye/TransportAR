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


#prn_waybillType{ position: absolute; top: 29mm; left: 32mm; }
#prn_stamp{ position: absolute; top: 1mm; left: 24mm; }
#prn_garageNumber{ position: absolute; top: 36mm; left: 193mm; }
#prn_model{ position: absolute; top: 42mm; left: 52mm; }
#prn_registrationNumber{ position: absolute; top: 42mm; left: 124mm; }
#prn_waybillNumber{ position: absolute; top: 29mm; left: 6mm; }
#prn1_waybillNumber{ position: absolute; top: 23mm; left: 232mm; }
#prn_formNumber{ position: absolute; top: 29mm; left: 41mm; }
#prn1_model{ position: absolute; top: 63mm; left: 229mm; }
#prn1_registrationNumber{ position: absolute; top: 54mm; left: 245mm; }
#prn_departureDate{ position: absolute; top: 36mm; left: 70mm; }
#prn_departureTime{ position: absolute; top: 87mm; left: 88mm; }
#prn_departureKm{ position: absolute; top: 87mm; left: 43mm; }
#prn_departureMh{ position: absolute; top: 87mm; left: 145mm; }
#prn_fuelRemains{ position: absolute; top: 123mm; left: 50mm; }
#prn1_departureDate{ position: absolute; top: 29mm; left: 232mm; }
#prn_returnTime{ position: absolute; top: 94mm; left: 88mm; }
#prn_returnDate{ position: absolute; top: 36mm; left: 130mm; }
#prn_drivers{ position: absolute; top: 46mm; left: 33mm; }
#prn1_drivers{ position: absolute; top: 76mm; left: 225mm; }
#prn_customerId{ position: absolute; top: 62mm; left: 42mm; }
#prn_customerName{ position: absolute; top: 62mm; left: 57mm; }
#prn1_customerName{ position: absolute; top: 88mm; left: 225mm; }

 
</style>
 
</head>
 
 
<form id="form1" runat="server">

<body>

<div id="prn_waybillType" offset="true">/18/</div><div offset="true" id="prn_stamp" style="border: 2px solid #88A1C0; text-align: center; font: normal 12px Times New Roman">
Открытое акционерное общество <br />
"НАФТАН"<br />
Республика Беларусь,Витебская обл.<br />
211440,г.Новополоцк<br />
тел. 59-83-09
</div>

<div offset="true" id="prn_garageNumber">Гаражный № <%Response.Write(VehicleGarageNumber()); %></div>
<div offset="true" id="prn_model"><%Response.Write(VehicleModel()); %></div>
<div offset="true" id="prn_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
<div offset="true" id="prn_waybillNumber">No:<% Response.Write(WaybillNumber()); %></div>
<div offset="true" id="prn1_waybillNumber"><% Response.Write(WaybillNumber()); %></div>
<div offset="true" id="prn_formNumber"></div>
<div offset="true" id="prn1_model"><%Response.Write(VehicleModel()); %></div>
<div offset="true" id="prn1_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
<div offset="true" id="prn_departureDate"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></div>
<div offset="true" id="prn_departureTime"><%Response.Write(DepartureDate("HH:mm")); %></div>
<div offset="true" id="prn_departureKm"><%Response.Write(DepartureKm()); %></div>
<div offset="true" id="prn_departureMh"><%Response.Write(DepartureMh()); %></div>
<div offset="true" id="prn_fuelRemains"><div><span style="width:50mm;"><%Response.Write(FuelName()); %>       </span>   <%Response.Write(FuelRemains()); %>              </div></div>
<div offset="true" id="prn1_departureDate"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></div>
<div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %></div>
<div offset="true" id="prn_returnDate"> по <%Response.Write(ReturnDate("dd.MM.yyyy")); %></div>
<div offset="true" id="prn_customerId"></div>
<div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>
<div offset="true" id="prn1_customerName"><%Response.Write(CustomerName()); %></div>
<div offset="true" id="prn_drivers">
   <div style="height: 10mm; width: 130mm; overflow: hidden;">
      <div><span style="width: 65mm;"> <%Response.Write(DriverFio(1)); %> <%Response.Write(DriverLicence(1)); %></span> <%Response.Write(DriverTab(1)); %></div>
      <div><span style="width: 65mm;"> <%Response.Write(DriverFio(2)); %> <%Response.Write(DriverLicence(2)); %></span> <%Response.Write(DriverTab(2)); %></div>
</div></div>
<div offset="true" id="prn1_drivers"><div style="height: 6mm; width: 50mm; overflow: hidden;"><div> <%Response.Write(DriverFio(1)); %> </div></div></div>

</body>
</form>
</html>                                                                

