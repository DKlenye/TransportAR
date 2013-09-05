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

#prn_waybillType{ position: absolute; top: 9mm; left: 105mm; }
#prn_stamp{ position: absolute; top: 16mm; left: 11mm; }
#prn_garageNumber{ position: absolute; top: 38mm; left: 255mm; }
#prn_model{ position: absolute; top: 32mm; left: 212mm; }
#prn_registrationNumber{ position: absolute; top: 40mm; left: 212mm; }
#prn_waybillNumber{ position: absolute; top: 9mm; left: 79mm; }
#prn_formNumber{ position: absolute; top: 9mm; left: 114mm; }
#prn_departureDay{ position: absolute; top: 45mm; left: 112mm; }
#prn_departureMonth{ position: absolute; top: 45mm; left: 138mm; }
#prn_departureYear{ position: absolute; top: 45mm; left: 165mm; }
#prn_departureTime{ position: absolute; top: 102mm; left: 28mm; }
#prn_departureKm{ position: absolute; top: 102mm; left: 66mm; }
#prn_fuelRemains{ position: absolute; top: 102mm; left: 101mm; }
#prn_returnTime{ position: absolute; top: 102mm; left: 38mm; }
#prn_returnDay{ position: absolute; top: 45mm; left: 128mm; }
#prn_driverName{ position: absolute; top: 44mm; left: 194mm; }
#prn_driverLN{ position: absolute; top: 52mm; left: 210mm; }
#prn_driverTab{ position: absolute; top: 52mm; left: 255mm; }
#prn_customerId{ position: absolute; top: 58mm; left: 80mm; }
#prn_customerName{ position: absolute; top: 58mm; left: 95mm; }



 
</style>
 
</head>
 
 
<form id="form1" runat="server">

<body>
<div id="prn_waybillType" offset="true">/15/</div><div offset="true" id="prn_stamp" style="border: 2px solid #88A1C0; text-align: center; font: normal 12px Times New Roman">
Открытое акционерное общество <br />
"НАФТАН"<br />
Республика Беларусь,Витебская обл.<br />
211440,г.Новополоцк<br />
тел. 59-83-09
</div>

<div offset="true" id="prn_garageNumber"><%Response.Write(VehicleGarageNumber()); %></div>
<div offset="true" id="prn_model"><%Response.Write(VehicleModel()); %></div>
<div offset="true" id="prn_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>
<div offset="true" id="prn_waybillNumber">No:<%Response.Write(WaybillNumber()); %></div>
<div offset="true" id="prn_formNumber"></div>
<div offset="true" id="prn_departureDay"><%Response.Write(DepartureDate("dd")); %></div>
<div offset="true" id="prn_departureMonth"><%Response.Write(DepartureDate("MMMM")); %></div>
<div offset="true" id="prn_departureYear"><%Response.Write(DepartureDate("yyyy")); %></div>
<div offset="true" id="prn_departureTime"><%Response.Write(DepartureDate("HH:mm")); %></div>
<div offset="true" id="prn_departureKm"><%Response.Write(DepartureKm()); %></div>
<div offset="true" id="prn_fuelRemains">
<div><span style="width:25mm;">   <%Response.Write(FuelRemains()); %>              </span><%Response.Write(FuelName()); %>       </div></div>
<div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %></div>
<div offset="true" id="prn_returnDay"><%Response.Write(ReturnDate("dd")); %></div>
<div offset="true" id="prn_customerId"></div>
<div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>
<div offset="true" id="prn_driverName"> <%Response.Write(DriverFio(1)); %><br /></div>
<div offset="true" id="prn_driverLN"><%Response.Write(DriverLicence(1)); %></div>
<div offset="true" id="prn_driverTab"> <%Response.Write(DriverTab(1)); %></div>


</body>
</form>
</html>                                                                

