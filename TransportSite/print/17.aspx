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


#prn_OAO{ position: absolute; top: 130mm; left: 102mm; }
#prn_waybillType{ position: absolute; top: 19mm; left: 33mm; }
#prn_garageNumber{ position: absolute; top: 43mm; left: 123mm; }
#prn_model{ position: absolute; top: 44mm; left: 44mm; }
#prn_registrationNumber{ position: absolute; top: 44mm; left: 88mm; }
#prn_licenceCart{ position: absolute; top: 29mm; left: 70mm; }
#prn_waybillNumber{ position: absolute; top: 19mm; left: 6mm; }
#prn_formNumber{ position: absolute; top: 19mm; left: 43mm; }
#prn_schedule{ position: absolute; top: 35mm; left: 44mm; }
#prn_departureDate{ position: absolute; top: 23mm; left: 81mm; }
#prn_departureTime{ position: absolute; top: 48mm; left: 172mm; }
#prn_departureKm{ position: absolute; top: 48mm; left: 230mm; }
#prn_date{ position: absolute; top: 130mm; left: 59mm; }
#prn_time{ position: absolute; top: 130mm; left: 81mm; }
#prn_fuelRemains{ position: absolute; top: 91mm; left: 167mm; }
#prn_returnTime{ position: absolute; top: 55mm; left: 172mm; }
#prn_drivers{ position: absolute; top: 51mm; left: 44mm; }
#prn_customerId{ position: absolute; top: 130mm; left: 14mm; }
#prn_customerName{ position: absolute; top: 130mm; left: 27mm; }
#prn_trailer{ position: absolute; top: 63mm; left: 44mm; }
#prn_way{ position: absolute; top: 95mm; left: 22mm; }

#prn_OAO{ position: absolute; top: 130mm; left: 102mm; }
#prn_waybillType{ position: absolute; top: 19mm; left: 33mm; }
#prn_garageNumber{ position: absolute; top: 49mm; left: 123mm; }
#prn_model{ position: absolute; top: 44mm; left: 44mm; }
#prn_registrationNumber{ position: absolute; top: 44mm; left: 88mm; }
#prn_licenceCart{ position: absolute; top: 29mm; left: 70mm; }
#prn_waybillNumber{ position: absolute; top: 19mm; left: 6mm; }
#prn_formNumber{ position: absolute; top: 19mm; left: 43mm; }
#prn_schedule{ position: absolute; top: 40mm; left: 44mm; }
#prn_departureDate{ position: absolute; top: 23mm; left: 81mm; }
#prn_departureTime{ position: absolute; top: 48mm; left: 172mm; }
#prn_departureKm{ position: absolute; top: 48mm; left: 230mm; }
#prn_date{ position: absolute; top: 130mm; left: 59mm; }
#prn_time{ position: absolute; top: 130mm; left: 81mm; }
#prn_fuelRemains{ position: absolute; top: 91mm; left: 167mm; }
#prn_returnTime{ position: absolute; top: 55mm; left: 172mm; }
#prn_drivers{ position: absolute; top: 51mm; left: 44mm; }
#prn_customerId{ position: absolute; top: 130mm; left: 14mm; }
#prn_customerName{ position: absolute; top: 130mm; left: 27mm; }
#prn_trailer{ position: absolute; top: 63mm; left: 44mm; }
#prn_way{ position: absolute; top: 95mm; left: 22mm; }
#prn_cargo{ position: absolute; top: 135mm; left: 184mm; }

#prn_src{ position: absolute; top: 135mm; left: 99mm; }
#prn_dst{ position: absolute; top: 135mm; left: 141mm; }
 
</style>
 
</head>
 
 

<form id="form1" runat="server">
<body>

<div offset="true" id="prn_OAO"></div>
<div id="prn_waybillType" offset="true">/17/</div>
<div offset="true" id="prn_garageNumber"><%Response.Write(VehicleGarageNumber()); %></div>
<div offset="true" id="prn_model"><%Response.Write(VehicleModel()); %></div>
<div offset="true" id="prn_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
<div offset="true" id="prn_licenceCart"></div>
<div offset="true" id="prn_waybillNumber">No:<%Response.Write(WaybillNumber()); %></div>
<div offset="true" id="prn_formNumber"></div>
<div offset="true" id="prn_schedule"><%Response.Write(ScheduleName()); %></div>
<div offset="true" id="prn_departureDate"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></div>
<div offset="true" id="prn_departureTime"><%Response.Write(DepartureDate("HH:mm")); %></div>
<div offset="true" id="prn_departureKm"><%Response.Write(DepartureKm()); %></div>
<div offset="true" id="prn_date"><%Response.Write(DepartureDate("dd.MM.yyyy")); %></div>
<div offset="true" id="prn_time"><%Response.Write(DepartureDate("HH:mm")); %></div>
<div offset="true" id="prn_fuelRemains">  
   <div><span style="width:55mm;"><%Response.Write(FuelName()); %>       </span>   <%Response.Write(FuelRemains()); %>              </div>
   </div>
   <div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %></div>
   <div offset="true" id="prn_customerId"></div>
   <div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>
   <div offset="true" id="prn_trailer"><span style="width: 80mm"><span style="margin-right: 2mm"></span></span></div>
   <div offset="true" id="prn_drivers"><div style="height: 8mm; width: 110mm; overflow: hidden;">
   <div><span style="width: 80mm;"> <%Response.Write(DriverFio(1)); %> <%Response.Write(DriverLicence(1)); %></span> <%Response.Write(DriverTab(1)); %></div></div></div>
   <div offset="true" id="prn_way"></div>
    <div offset="true" id="prn_cargo"><%Response.Write(CargoName()); %></div>
    <div offset="true" id="prn_src"><%Response.Write(SrcRoutePoint()); %></div>
    <div offset="true" id="prn_dst"><%Response.Write(DstRoutPoint()); %></div>


</body>
</form>

</html>                                                                

