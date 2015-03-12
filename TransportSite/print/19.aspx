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


#prn_waybillType{ position: absolute; top: 9mm; left: 5mm; }
#prn_stamp{ position: absolute; top: 9mm; left: 4mm; }
#prn_garageNumber{ position: absolute; top: 29mm; left: 205mm; }
#prn_model{ position: absolute; top: 15mm; left: 205mm; }
#prn_registrationNumber{ position: absolute; top: 20mm; left: 205mm; }
#prn_waybillNumber{ position: absolute; top: 10mm; left: 162mm; }
#prn_departureDate{ position: absolute; top: 26mm; left: 84mm; }
#prn_departureTime{ position: absolute; top: 72mm; left: 88mm; }
#prn_departureMh{ position: absolute; top: 72mm; left: 100mm; }
#prn_fuelRemains{ position: absolute; top: 72mm; left: 186mm; }
#prn1_departureDate{ position: absolute; top: 11mm; left: 218mm; }
#prn_returnDate{ position: absolute; top: 26mm; left: 125mm; }
#prn_returnTime{ position: absolute; top: 72mm; left: 126mm; }
#prn_drivers{ position: absolute; top: 40mm; left: 53mm; }
#prn_drivers_tab{ position: absolute; top: 40mm; left: 150mm; }
#prn_customerName{ position: absolute; top: 72mm; left: 26mm; }
#prn_trailer{ position: absolute; top: 24mm; left: 205mm; }

 
</style>
 
</head>
 
 


<body>
<form id="form1" runat="server">
<div offset="true" id="prn_stamp" style="border: 2px solid #88A1C0; text-align: center; font: normal 12px Times New Roman">
Открытое акционерное общество <br />
"НАФТАН"<br />
Республика Беларусь,<br/>
Витебская обл.<br />
211440,г.Новополоцк<br />
тел. 59-83-09
</div>

<div offset="true" id="prn_garageNumber"><%Response.Write(VehicleGarageNumber()); %></div>
<div offset="true" id="prn_model"><%Response.Write(VehicleModel()); %></div>
<div offset="true" id="prn_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
<div offset="true" id="prn_waybillNumber"><% Response.Write(String.Format("No {0}",WaybillNumber())); %></div>
<div offset="true" id="prn_departureDate"><%Response.Write(DepartureDate("dd.MM.yyyy")); %></div>
<div offset="true" id="prn_departureTime"><%Response.Write(DepartureDate("HH:mm")); %></div>
<div offset="true" id="prn_departureMh"><%Response.Write(DepartureMh()); %></div>
<div offset="true" id="prn_fuelRemains"><%Response.Write(String.Format("   {0}               л {1}       ",FuelRemains(),FuelName())); %></div>

<div offset="true" id="prn1_departureDate"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></div>

<div offset="true" id="prn_returnDate"><%Response.Write(ReturnDate("dd.MM.yyyy")); %></div>
<div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %></div>
<div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>
<div offset="true" id="prn_trailer"><%Response.Write(String.Format("[{0}]{1} {2}",TrailerGarageNumber(),TrailerModel(),TrailerRegNumber())); %></div>
<div offset="true" id="prn_drivers"><%Response.Write(String.Format("{0} {1}",DriverFioShort(1),DriverLicence(1))); %></div>
<div offset="true" id="prn_drivers_tab"><%Response.Write(DriverTab(1)); %></div>
</form>
</body>
</html>                                                                

