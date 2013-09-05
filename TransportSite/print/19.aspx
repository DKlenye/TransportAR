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
#prn_stamp{ position: absolute; top: 21mm; left: 4mm; }
#prn_garageNumber{ position: absolute; top: 41mm; left: 225mm; }
#prn_model{ position: absolute; top: 27mm; left: 225mm; }
#prn_registrationNumber{ position: absolute; top: 32mm; left: 225mm; }
#prn_waybillNumber{ position: absolute; top: 10mm; left: 162mm; }
#prn_departureDate{ position: absolute; top: 38mm; left: 104mm; }
#prn_departureTime{ position: absolute; top: 84mm; left: 98mm; }
#prn_departureMh{ position: absolute; top: 84mm; left: 110mm; }
#prn_fuelRemains{ position: absolute; top: 84mm; left: 206mm; }
#prn1_departureDate{ position: absolute; top: 23mm; left: 238mm; }
#prn_returnDate{ position: absolute; top: 38mm; left: 145mm; }
#prn_returnTime{ position: absolute; top: 84mm; left: 146mm; }
#prn_drivers{ position: absolute; top: 43mm; left: 63mm; }
#prn_customerId{ position: absolute; top: 83mm; left: 26mm; }
#prn_customerName{ position: absolute; top: 87mm; left: 26mm; }
#prn_trailer{ position: absolute; top: 36mm; left: 225mm; }

 
</style>
 
</head>
 
 


<body>
<form id="form1" runat="server">
<div id="prn_waybillType" offset="true">/19/</div><div offset="true" id="prn_stamp" style="border: 2px solid #88A1C0; text-align: center; font: normal 12px Times New Roman">
Открытое акционерное общество <br />
"НАФТАН"<br />
Республика Беларусь,Витебская обл.<br />
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
<div offset="true" id="prn_fuelRemains">
<div><%Response.Write(String.Format("   {0}               л {1}       ",FuelRemains(),FuelName())); %></div></div>

<div offset="true" id="prn1_departureDate"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></div>

<div offset="true" id="prn_returnDate"><%Response.Write(ReturnDate("dd.MM.yyyy")); %></div>
<div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %></div>
<div offset="true" id="prn_customerId"></div>
<div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>
<div offset="true" id="prn_trailer"><%Response.Write(String.Format("[{0}]{1} {2}",TrailerGarageNumber(),TrailerModel(),TrailerRegNumber())); %></div>
<div offset="true" id="prn_drivers"><div style="height: 12mm; width: 130mm; overflow: hidden;"><div><span style="width: 105mm;"> <%Response.Write(String.Format("{0} {1}",DriverFio(1),DriverLicence(1))); %></span> <%Response.Write(DriverTab(1)); %></div></div></div>
</form>
</body>
</html>                                                                

