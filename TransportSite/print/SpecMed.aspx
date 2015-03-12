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

#prn_stamp{ position: absolute; top: 0mm; left: 0mm; }

#prn_waybillNumber{ position: absolute; top: 5mm; left: 120mm; }

#prn_model{ position: absolute; top: 30mm; left: 14mm; }
#prn_garageNumber{ position: absolute; top: 30mm; left: 99mm; }
#prn_registrationNumber{ position: absolute; top: 30mm; left: 45mm; }

#prn_model2{ position: absolute; top: 225mm; left: 38mm; }
#prn_registrationNumber2{ position: absolute; top: 225mm; left: 87mm; }

#prn_departureDate{ position: absolute; top: 30mm; left: 128mm; }
#prn_departureDate1{ position: absolute; top: 20mm; left: 45mm; }
#prn_returnDate{ position: absolute; top: 30mm; left: 158mm; }

#prn_fuelRemain{ position: absolute; top: 91mm; left: 104mm; }
#prn_fuelName{ position: absolute; top: 91mm; left: 70mm; }


#prn_departureTime{ position: absolute; top: 134mm; left: 14mm; }
#prn_departureKm{ position: absolute; top: 134mm; left: 53mm; }
#prn_returnTime{ position: absolute; top: 164mm; left: 14mm; }

#prn_customerName{ position: absolute; top: 105mm; left: 30mm; }

#prn_tab1{ position: absolute; top: 53mm; left: 67mm; }
#prn_tab2{ position: absolute; top: 58mm; left: 67mm; }

#prn_fio1{ position: absolute; top: 53mm; left: 78mm; }
#prn_fio2{ position: absolute; top: 58mm; left: 78mm; }

#prn_licence1{ position: absolute; top: 53mm; left: 127mm; }
#prn_licence2{ position: absolute; top: 58mm; left: 127mm; }

 
</style>
 
</head>
 
 

<form id="form1" runat="server">
<body>
    
<div offset="true" id="prn_stamp" style="border: 2px solid #88A1C0; text-align: center; font: normal 12px Times New Roman">
Открытое акционерное общество <br />
"НАФТАН"<br />
Республика Беларусь,Витебская обл.<br />
211440,г.Новополоцк<br />
тел. 59-83-09
</div>
    
<div offset="true" id="prn_waybillNumber">No:<%Response.Write(WaybillNumber()); %></div>

<div offset="true" id="prn_garageNumber"><%Response.Write(VehicleGarageNumber()); %></div>
<div offset="true" id="prn_model" style="width:35mm; word-wrap: break-word; font-size:8pt;"><%Response.Write(VehicleModel()); %></div>
<div offset="true" id="prn_registrationNumber"><%Response.Write(VehicleRegistrationNumber()); %></div>

<div offset="true" id="prn_model2" style="width:50mm; word-wrap: break-word; font-size:8pt;"><%Response.Write(VehicleModel()); %></div>
<div offset="true" id="prn_registrationNumber2"><%Response.Write(VehicleRegistrationNumber()); %></div>


<div offset="true" id="prn_departureDate1"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></div>
<div offset="true" id="prn_departureDate"><%Response.Write(DepartureDate("dd.MM.yyyy")); %></div>
<div offset="true" id="prn_returnDate"><%Response.Write(ReturnDate("dd.MM.yyyy")); %></div>

<div offset="true" id="prn_fuelName"><%Response.Write(FuelName()); %></div>
<div offset="true" id="prn_fuelRemain"><%Response.Write(FuelRemains()); %></div>


<div offset="true" id="prn_departureTime"><%Response.Write(DepartureDate("HH:mm")); %></div>
<div offset="true" id="prn_departureKm"><%Response.Write(DepartureKm()); %></div>
<div offset="true" id="prn_returnTime"><%Response.Write(ReturnDate("HH:mm")); %> </div>

<div offset="true" id="prn_customerName"><%Response.Write(CustomerName()); %></div>

<div offset="true" id="prn_tab1"><%Response.Write(DriverTab(1)); %></div>
<div offset="true" id="prn_tab2"><%Response.Write(DriverTab(2)); %></div>
<div offset="true" id="prn_fio1"><%Response.Write(DriverFio(1)); %></div>
<div offset="true" id="prn_fio2"><%Response.Write(DriverFio(2)); %></div>
<div offset="true" id="prn_licence1"><%Response.Write(DriverLicence(1)); %></div>
<div offset="true" id="prn_licence2"><%Response.Write(DriverLicence(2)); %></div>


</body>
</form>
</html>                                                                

