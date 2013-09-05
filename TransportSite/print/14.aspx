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
#prn_garageNumber{ position: absolute; top: 50mm; left: 95mm; }
#prn_model{ position: absolute; top: 50mm; left: 63mm; }
#prn_registrationNumber{ position: absolute; top: 50mm; left: 126mm; }
#prn_licenceCart{ position: absolute; top: 38mm; left: 23mm; }
#prn_waybillNumber{ position: absolute; top: 21mm; left: 6mm; }
#prn_formNumber{ position: absolute; top: 21mm; left: 43mm; }
#prn_departureDate{ position: absolute; top: 42mm; left: 215mm; }
#prn_departureTime{ position: absolute; top: 42mm; left: 236mm; }
#prn_departureKm{ position: absolute; top: 42mm; left: 190mm; }
#prn_fuelRemains{ position: absolute; top: 75mm; left: 180mm; }
#prn_returnDate{ position: absolute; top: 47mm; left: 215mm; }
#prn_returnTime{ position: absolute; top: 47mm; left: 236mm; }
#prn_drivers{ position: absolute; top: 90mm; left: 17mm; }
#prn_customerId{ position: absolute; top: 135mm; left: 21mm; }
#prn_customerName{ position: absolute; top: 141mm; left: 21mm; }
#prn_trailerRegNum{ position: absolute; top: 60mm; left: 126mm; }
#prn_trailerGarNum{ position: absolute; top: 60mm; left: 95mm; }
#prn_trailerModel{ position: absolute; top: 60mm; left: 63mm; }
#prn_wayStart{ position: absolute; top: 135mm; left: 81mm; }
#prn_way{ position: absolute; top: 135mm; left: 126mm; }



 
</style>
 
</head>
 
 

<form id="form1" runat="server">
<body>

<div id="prn_waybillType" offset="true">/14/</div>
<div offset="true" id="prn_garageNumber"><%Response.Write(VehicleGarageNumber()); %></div>
<div offset="true" id="prn_model"><%Response.Write(VehicleModel()); %></div>
<div offset="true" id="prn_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
<div offset="true" id="prn_licenceCart"></div>
<div offset="true" id="prn_waybillNumber">No:<%Response.Write(WaybillNumber()); %></div>
<div offset="true" id="prn_formNumber"></div>
<div offset="true" id="prn_departureDate"><%Response.Write(DepartureDate("dd.MM.yyyy")); %></div>
<div offset="true" id="prn_departureTime"><%Response.Write(DepartureDate("HH:mm")); %></div>
<div offset="true" id="prn_departureKm"><%Response.Write(DepartureKm()); %></div>
<div offset="true" id="prn_fuelRemains"><div><span style="width:52mm;"><%Response.Write(FuelName()); %>       </span>   <%Response.Write(FuelRemains()); %>              </div></div>
<div offset="true" id="prn_returnDate"><%Response.Write(ReturnDate("dd.MM.yyyy")); %></div>
<div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %> </div>
<div offset="true" id="prn_customerId"></div>
<div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>
<div offset="true" id="prn_trailerRegNum"></div>
<div offset="true" id="prn_trailerGarNum"></div>
<div offset="true" id="prn_trailerModel"></div>
<div offset="true" id="prn_drivers"><div style="height: 20mm; width: 130mm; overflow: hidden;"><div><span style="width: 54mm;"> <%Response.Write(DriverFio(1)); %> </span><span style="width: 16mm"> <%Response.Write(DriverTab(1)); %></span><%Response.Write(DriverLicence(1)); %></div></div></div><div offset="true" id="prn_wayStart">НОВОПОЛОЦК</div><div offset="true" id="prn_way"></div>


</body>
</form>
</html>                                                                

