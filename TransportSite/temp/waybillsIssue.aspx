<%@ Page language="c#" inherits="waybillsIssue" src="waybillsIssue.cs" codePage="1251"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
  <title>выдача путевых листов</title>
  <meta http-equiv="EXPIRES" content="Tue, 04 Dec 1996 21:29:02 GMT">
  <meta http-equiv="content-Type" content="text/html; charset=windows-1251">

	<link rel="stylesheet" href="waybillsIssue.css"/>

	<link id="waybillIssueStyle" rel="stylesheet" href=""/>

</head>


<script language="JavaScript" src="../common/ext.js"></script>
<script language="JavaScript" src="../common/xmlcookies.js"></script>
<script language="JavaScript" src="waybillsIssue.js"></script>

<body onload="Loaded()">
<form id="waybillsIssue" method="post" runat="server" onsubmit="return OnFormSubmit()">
<div class="screen" id="screen">

<asp:textbox id="activeField" runat="server" Columns="12" readonly="true" style="display: none;"></asp:textbox>
    <asp:TextBox ID="PrinterName" runat="server" Width="150px" style="display: none;"></asp:TextBox>
    <asp:TextBox ID="_top" runat="server" Width="54px" style="display: none;"></asp:TextBox>
    <asp:TextBox ID="_left" runat="server" Width="48px" style="display: none;"></asp:TextBox>
    <asp:TextBox ID="_offsetWidth" runat="server" Width="48px" style="display: none;"></asp:TextBox>
     <asp:TextBox ID="_offsetLength" runat="server" Width="48px" style="display: none;"></asp:TextBox>
<table border="0" cellpadding="2" cellspacing="1">
<tr>
	<td height="53" width="356" nowrap><div style="font-size: 18px; font-family: Verdana; font-weight: bold;">выдача путевых листов</div></td>
	<td height="53" align="right"><div><asp:label id="message" runat="server" EnableViewState="false" class="info"></asp:label></div><div><asp:label id="LimitMessage" runat="server" EnableViewState="false" class="info"></asp:label></div></td>
</tr>
</table>


<div style="width: 365px; float: left;">
<!--
	left table
-->
<table cellpadding="0" cellspacing="0" border="0" width="342">
	<tr>
		<td valign="top" style="background: gray;">
			<table border="0" cellpadding="3" cellspacing="1" width="100%">
				<tr>
					<td colspan="2"><b>выезд:</b></td>
				</tr>
				<tr>
					<td>дата</td>
					<td>
						<asp:textbox id="departureDate" runat="server" Columns="10" readonly="true" class="noedit" style="color: black; background: #fde; border: 2px solid orchid;"></asp:textbox>
						<a href="#" onclick="return dateMinus()" class="button1" title="предыдущая дата">&larr;</a>
						<a href="#" onclick="return datePlus()" class="button1" title="следующая дата">&rarr;</a>
					</td>
				</tr>
				<tr>
					<td>время</td>
					<td><asp:textbox id="departureTime" runat="server" Columns="4"  class="noedit"></asp:textbox></td>
				</tr>
				<tr>
					<td>показания спидометра</td>
					<td><asp:textbox id="departureKm" runat="server" Columns="12" readonly="true" class="noedit" style="color: black; background: #fde; border: 2px solid orchid;"></asp:textbox></td>
				</tr>
				<tr>
					<td>сч.моточасов</td>
					<td><asp:textbox id="departureMh" runat="server" Columns="6" readonly="true" class="noedit" style="color: black; background: #fde; border: 2px solid orchid;"></asp:textbox></td>
				</tr>
				<tr>
					<td colspan="2"  height="92">
					остатки топлива:<br/>
          <asp:listbox id="fuelRemains" runat="server" Width="320px" Rows="3" style="color: black; background: #fde;"></asp:listbox>
					</td>
				</tr>
				<tr>
					<td colspan="2"><b>возвращение:</b></td>
				</tr>
				<tr>
					<td>дата</td>
					<td><asp:textbox id="returnDate" runat="server" Columns="12" readonly="true" class="noedit"></asp:textbox></td>
				</tr>
				<tr>
					<td>время</td>
					<td><asp:textbox id="returnTime" runat="server" Columns="4"  class="noedit"></asp:textbox></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</div>

<div style="width: 100%; float: right; margin-left: -365px;">
<div style="margin-left: 365px;">
<!--
	right table
-->
<table cellpadding="0" cellspacing="0" border="0" width="550">
	<tr>
		<td valign="top" style="background: gray;">
			<table border="0" cellpadding="3" cellspacing="1" width="100%">
				<tr>
					<td colspan="2"><b>автомобиль</b></td>
				</tr>
				<tr>
					<td>гаражный номер</td>
					<td><span class="button"><asp:textbox id="garageNumber" runat="server" Columns="6"></asp:textbox></span> <asp:button id="openFormButton" runat="server" Text="открыть" class="button"></asp:button></td>
				</tr>
				<tr>
					<td>марка</td>
					<td><asp:textbox id="model" runat="server" Columns="40" readonly="true" class="noedit"></asp:textbox></td>
				</tr>
				<tr>
					<td>регистр. номер</td>
					<td><asp:textbox id="registrationNumber" runat="server" Columns="12" readonly="true" class="noedit"></asp:textbox></td>
				</tr>
				<tr>
					<td>лицензионная карточка</td>
					<td><asp:textbox id="licenceCartNo" runat="server" Columns="12" readonly="true" class="noedit"></asp:textbox></td>
				</tr>
				<tr>
					<td colspan="2" height="92">
						<table width="100%" border="0" cellpadding="3" cellspasing="1" style="border: 2px solid green;">
							<tr>
								<td>No пут. листа</td>
								<td><asp:textbox id="waybillNumber" runat="server" Columns="20" readonly="true" class="noedit"></asp:textbox></td>
							</tr>
							<tr>
								<td>No бланка</td>
								<td><span class="button"><asp:textbox id="formNumber" runat="server" Columns="12"></asp:textbox></span></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td><b>график:</b></td><td><input type="checkbox" id="ScheduleBlock" />Установить время</td>
				</tr>
				<tr>
					<td>смена</td>
					<td>
						<asp:textbox id="shift" runat="server" Columns="1"></asp:textbox>
            <span  id="transparant" style="visibility: hidden;">(C:<asp:textbox id="shiftB_H" runat="server" Columns="1"></asp:textbox>:<asp:textbox id="shiftB_M" runat="server" Columns="1" ></asp:textbox> до <asp:textbox id="shiftD_H" runat="server" Columns="1"></asp:textbox>:<asp:textbox id="shiftD_M" runat="server" Columns="1"></asp:textbox>)</span>
             <span style="visibility: hidden;"><asp:textbox id="shiftBegin" runat="server" ReadOnly="true" Columns="1" ></asp:textbox><asp:textbox id="shiftDuration" runat="server" ReadOnly="true" Columns="1" ></asp:textbox></span>
					</td>
				</tr>
				<tr>
					<td>количество дней</td>
					<td><asp:textbox id="daysCount" runat="server" Columns="1"></asp:textbox></td>
				</tr>
				<tr>
					<td>график</td>
					<td><asp:listbox id="schedulesList" runat="server" Width="350px" Rows="1" class="noedit"></asp:listbox></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</div>
</div>
<div style="clear: all;">&nbsp;</div>
<!--
	footer table
-->
<table cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td valign="top" style="background: gray;">
			<table border="0" cellpadding="3" cellspacing="1" width="915">
				<tr>
					<td class="dblur">
<b>водители</b>водители:<br/>
<asp:listbox id="driversList" runat="server" Width="98%" Rows="4" class="sblur" SelectionMode="Multiple"></asp:listbox>
<div style="text-align: right; margin-right: 2%;">
<input type="button" name="buttonSetDriver" id="buttonSetDriver" value="добавить" onclick="setDriver()" class="button" />
<asp:button id="buttonExcludeDriver" runat="server" Width="89px" Text="удалить" class="button"></asp:button>
<asp:button id="buttonChooseDrivers" runat="server" Width="89px" Text="выбрать" class="button" title="оставить в списке только выбранных водителей. выбрать водителей можно мышью, удерживая нажатой клавишу Ctrl"></asp:button>
<asp:button id="buttonClearDrivers" runat="server" Width="89px" Text="очистить" class="button" title="удалить всех водителей"></asp:button>
</div>
<div style="clear: all;"></div>
			<div style="display: none;">
				<!--
				служебные поля для добваления водителей
				-->
				<asp:button id="buttonIncludeDriver" runat="server" Text="включить"></asp:button>
				<asp:textbox id="newDriverId" runat="server" Columns="6" ></asp:textbox>
				<asp:textbox id="newDriverString" runat="server" Columns="36"></asp:textbox>
			</div>
					</td>
				</tr>
				<tr>
					<td>
<div style="width: 700px; float:left;">
<b style="width: 72px;">заказчик:</b>
<asp:textbox id="customerId" runat="server" Columns="6" readonly="true" class="noedit"></asp:textbox>
<asp:textbox id="customerName" runat="server" Columns="60" readonly="true" class="noedit"></asp:textbox>
</div>
<div style="margin-left: 729px;">
<input type="button" name="buttonSetCustomer" id="buttonSetCustomer" value="сменить заказчика" onclick="setCustomer()" class="button" />
</div>
					</td>
				</tr>
				<tr>
					<td>
<div style="width: 700px; float:left;">
<b style="width: 72px;">прицеп:</b>
<asp:textbox id="trailerGarageNumber" runat="server" Columns="6" readonly="true" class="noedit"></asp:textbox>
<asp:textbox id="trailerModel" runat="server" Columns="30" readonly="true" class="noedit"></asp:textbox>
<asp:textbox id="trailerRegistrationNumber" runat="server" Columns="16" readonly="true" class="noedit"></asp:textbox>
</div>
<div style="margin-left: 729px;">
<input type="button" name="buttonSetTrailer" id="buttonSetTrailer" value="прицеп" onclick="setTrailer()" class="button">
<input type="button" name="buttonClearTrailer" id="buttonClearTrailer" value="удалить" onclick="javascript: document.getElementById('trailerGarageNumber').value = ''; document.getElementById('trailerModel').value = ''; document.getElementById('trailerRegistrationNumber').value = ''; document.getElementById('buttonIssue').focus();" class="button">
</div>
<div style="clear: all;"></div>
					</td>
				</tr>
				<tr>
					<td>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
	<td class="d1blur" width="40%" rowspan="2">
<b>форма пут.листа :</b><br/>
<asp:listbox id="waybillTypesList" runat="server" Width="450px" Rows="4" class="s1blur"></asp:listbox>
	</td>
	<td align="center" valign="center"  width="60%">
<br/>
<span class="button"><asp:LinkButton id="buttonIssue" Text="ВЫДАТЬ" runat="server" class="button" /></span>&nbsp;
        <asp:CheckBox ID="PrintFlag" runat="server" Checked="True" Text="Подтверждение печати" onclick="setConfirm()" />&nbsp;
	</td>
</tr>
<tr>
	<td align="right">
		<input type="button" value="перепечатать" onclick="reprintOpen()" class="button">
<script language="JavaScript">
if (window.opener && !window.opener.closed) document.write('<input type="button" value="выход" onclick="javascript:window.close();" class="buttonQuit" style="background-color: whitesmoke;">');
</script>
	</td>
</tr>
</table>
					</td>
				</tr>
				<tr>
					<td>
маршрут:
<asp:textbox id="way" runat="server" Columns="50" style="width: 100%;"></asp:textbox>
					</td>
				</tr>
			</table>
			<div class="help" id="help"></div>
		</td>
	</tr>
</table>

<!--
********************************************************************************************
-->



</div> <!-- screen -->

<div id="reprint" style="padding: 12px; background: lightgrey; border: 2px outset white; display: none; position: absolute; top: 41%; left: 16%; width: 65%; height: 31%;">
<table cellpadding="3" cellspacing="1" border="0">
  <tr>
  	<td colspan="2">
  		<b>печать путевого листа</b>
  	</td>
  </tr>
  <tr>
		<td>гар.номер</td>
		<td><input type="text" name="reprintGarageNumber" size="5" readonly class="noedit"></td>
	</tr>
  <tr>
		<td>номер пут.листа</td>
		<td><input type="text" name="reprintWaybillNumber" size="15"></td>
	</tr>
	<tr>
		<td>новый номер бланка</td>
		<td><input type="text" name="reprintFormNumber" size="15"></td>
	</tr>
	<tr>
		<td valign="top">типовая форма:</td>
		<td><select id="reprintWaybillType" size="6" style="width: 456px;"></select></td>
	</tr>
	<tr>	
		<td colspan="2" align="right" style="padding: 6px;">
			<input type="button" value="напечатать" class="button" onclick="javascript: reprint()">
			<input type="button" value="отмена" class="button" onclick="reprintCancel()">
		</td>
	</tr>
</table>
	<div style="display: none;">
	<asp:button id="buttonPrintWaybill" runat="server" Width="89px" Text="напечатать" class="button" ></asp:button>
	</div>
</div> <!-- /reprint -->


<div class="print" id="print" nowrap>
     
       <object id=factory style="display:none"
classid="clsid:1663ed61-23eb-11d2-b92f-008048fdd814"
codebase="smsx.cab#Version=6,4,438,06">
</object>

<asp:Xml id="xmlWaybill" runat="server" enableviewstate="False"></asp:Xml>
<div id="gridOrigin" style="width: 1px; height: 1px; overflow: hidden;"></div>
<button onclick="cancelPrinting() " class="screen" style="display: none; position: absolute; top: 0; left: 0; width:7%; margin-left:93%;" id="printButton">stop</button>
</div>
<asp:label id="printMessage" runat="server" Visible="false" EnableViewState="false" class="screen" style="width: 20%; position: absolute; top: 65%; left: 78%; padding: 4px 6px; border: 1px solid gray; background: #FFFFF0; color: blue; font-size: 16px;"></asp:label>


<div>
<iframe id="printFrame" src="http://localhost:6612/Transport/waybillsIssue/Bus.aspx?garageNumber=980&ownerId=1&waybillNumber=2062809800"></iframe>
</div>


</form>
  <script language="javascript" >
  
	 var PN = getCookie("PrinterName", "");
	 document.getElementById("PrinterName").value=PN;
	 
	 	var d = new Date();
		d = new Date(d.getYear(), d.getMonth(), d.getDate(), 23, 59);
	 
	 var PC = getCookie("printConfirm", "");
	 
	 if (PC=="") {
		setCookie("printConfirm", "true", d.toUTCString());
		PC="true";
	 }
	 
	 eval("document.getElementById('PrintFlag').checked="+PC);

	 function setConfirm(e){
		if(document.getElementById('PrintFlag').checked){
			setCookie("printConfirm", "true",d.toUTCString())
		}
		else setCookie("printConfirm", "false",d.toUTCString())
	 }
	 
  </script>
</body>
</html>                                                                
