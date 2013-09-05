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


#prn_waybillType{ position: absolute; top: 21mm; left: 33mm; }
#prn_garageNumber{ position: absolute; top: 50mm; left: 70mm; }
#prn_model{ position: absolute; top: 43mm; left: 20mm; }
#prn_registrationNumber{ position: absolute; top: 50mm; left: 33mm; }
#prn_licenceCart{ position: absolute; top: 33mm; left: 100mm; }
#prn_waybillNumber{ position: absolute; top: 21mm; left: 6mm; }
#prn_formNumber{ position: absolute; top: 21mm; left: 43mm; }
#prn_schedule{ position: absolute; top: 55mm; left: 50mm; }
#prn1_model{ position: absolute; top: 42mm; left: 240mm; }
#prn1_registrationNumber{ position: absolute; top: 49mm; left: 240mm; }
#prn_departureDate{ position: absolute; top: 50mm; left: 84mm; }
#prn_departureTime{ position: absolute; top: 41mm; left: 153mm; }
#prn_departureKm{ position: absolute; top: 41mm; left: 185mm; }
#prn_fuelRemains{ position: absolute; top: 120mm; left: 55mm; }
#prn1_departureDate{ position: absolute; top: 27mm; left: 234mm; }
#prn_returnDate{ position: absolute; top: 55mm; left: 97mm; }
#prn_returnTime{ position: absolute; top: 51mm; left: 153mm; }
#prn_drivers{ position: absolute; top: 80mm; left: 22mm; }
#prn1_drivers{ position: absolute; top: 60mm; left: 230mm; }
#prn_customerId{ position: absolute; top: 162mm; left: 21mm; }
#prn_customerName{ position: absolute; top: 168mm; left: 21mm; }
#prn1_customerName{ position: absolute; top: 135mm; left: 230mm; }
#prn_wayStart{ position: absolute; top: 162mm; left: 93mm; }
#prn_way{ position: absolute; top: 162mm; left: 124mm; }



 
</style>
 
</head>
 
 

<form id="form1" runat="server">
<body>

<div id="prn_waybillType" offset="true">/16/</div>
	<div offset="true" id="prn_garageNumber"><%Response.Write(VehicleGarageNumber()); %></div>
	<div offset="true" id="prn_model"><%Response.Write(VehicleModel()); %></div>
	<div offset="true" id="prn_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
	<div offset="true" id="prn_licenceCart"></div>
	<div offset="true" id="prn_waybillNumber">No:<%Response.Write(WaybillNumber()); %></div>
	<div offset="true" id="prn_formNumber"></div>
	<div offset="true" id="prn_schedule">обычный, внутр. линии</div>
	<div offset="true" id="prn1_model"><%Response.Write(VehicleModel()); %></div>
	<div offset="true" id="prn1_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
	<div offset="true" id="prn_departureDate"><%Response.Write(DepartureDate("dd.MM.yyyy")); %></div>
	<div offset="true" id="prn_departureTime"><%Response.Write(DepartureDate("HH:mm")); %></div>
	<div offset="true" id="prn_departureKm"><%Response.Write(DepartureKm()); %></div>
	<div offset="true" id="prn_fuelRemains">
	   <div><span style="width:83mm;"><%Response.Write(FuelName()); %>       </span>   <%Response.Write(FuelRemains()); %>              </div>
	</div>
	<div offset="true" id="prn1_departureDate"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></div>
	<div offset="true" id="prn_returnDate"><%Response.Write(ReturnDate("dd.MM.yyyy")); %></div>
	<div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %></div>
	<div offset="true" id="prn_customerId"></div><div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>
	<div offset="true" id="prn1_customerName"><%Response.Write(CustomerName()); %></div><div style="display: none;"></div><div offset="true" id="prn_drivers"><div style="height: 20mm; width: 85mm; overflow: hidden;"><div><span style="width: 68mm;"> <%Response.Write(DriverFio(1)); %> <%Response.Write(DriverLicence(1)); %></span> <%Response.Write(DriverTab(1)); %></div></div></div><div offset="true" id="prn1_drivers"><div style="height: 12mm; width: 48mm; overflow: hidden;"><div> <%Response.Write(DriverFio(1)); %> </div></div></div><div offset="true" id="prn_wayStart">НОВОПОЛОЦК</div>
	<div offset="true" id="prn_way"></div>

</body>
</form>
</html>                                                                

