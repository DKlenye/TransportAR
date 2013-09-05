<%@ Page language="c#" src="bin/_xmlform.cs" AutoEventWireup="false" Inherits="XmlWebForm" codePage="1251"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<!--
ведомость по заправкам 
-->
<html>
<head>
  <title>ведомость учета выдачи ГСМ</title>

  <META http-equiv="Content-Type" content="text/html; charset=windows-1251">
  <meta http-equiv="EXPIRES" content="Tue, 04 Dec 1996 21:29:02 GMT">

  <link href="common/xmlform.css" type="text/css" rel="stylesheet" />

<!--

	STYLE 

--><style type="text/css">
A {  color: blue;  text-decoration: underline;  xfont-weight: normal;}#datagrid {	width: 100%;	height: 100%;}
@media screen {	#sidebar {		width: 220px;		float: left;	}	#container {		float: right;		width: 100%;		margin-left: -220px;	}	#contents {		margin-left: 220px;	}  /* */  .nameplate {    position: absolute; top:100; left:270; visibility: hidden; filter: Shadow(color=666666, direction=135, strength=4); padding:5px;  }  .info {    padding:4px 8px; border-top: 1px solid black; border-left: 1px solid black; border-right: 3px outset white; border-bottom: 3px outset white; background-color: #FFFFE1; color: black;    margin-top: 12px;  }  .newPage {    padding: 4px 6px;    border: 1px solid black;    background-color: red;    color: white;    xfont-weight: bold;    font-size: large;  }}@media print {  /* */  #sidebar { display: none; }  .nameplate { display: none; }  .info { display: none; }  .newPage { display: none; }}
</style>
<style type="text/css" id="style0" comment="когда уже много записей на странице">
body, td {  background-color: white; }
.ddtable {  background-color: white; border: 0px; }.ddBody {  background-color: white;  border: 0px; }.ddTd {  background-color: white;  border: 0px; }.printBlack { color: black; font-weight: bold; padding: 18px 8px; }
@media screen {

  .ddHeader {  background-color: white;  color: gray;  border: 0px; }  .tdparamscaption { background-color: white;  color: gray; }  .tdparamsinput { background-color: white;  color: gray; }  .inputparams { background-color: white;  color: gray; }  .boldFont { font-weight: bold;  border: 0px solid white;  }
  .printHeader { color: gray; border: 1px solid black; padding: 8px 8px; font-weight: bold; }
  .printGray { color: gray; padding: 18px 8px; }
  .printHidden { border: 2px outset white; background-color: MENU; color: MENUTEXT; padding: 18px 8px;}
}
@media print {
  .ddHeader {  visibility: hidden; border: 0px; }  .tdparamscaption { visibility: hidden; }  .tdparamsinput { visibility: hidden; }  .inputparams { visibility: hidden; }  .boldFont { visibility: hidden;  font-weight: bold;  border: 0px solid white; }
  .printHeader { visibility: hidden; border: 1px solid black; padding: 8px 8px; font-weight: bold; }
  .printGray { visibility: hidden; padding: 18px 8px; font-weight: bold; }
  a { display: none; }  .printHidden { display: none; }
}
</style>
<style type="text/css" id="style1" disabled comment="когда только одна запись на странице - нужна шапка">
body, td {  background-color: white; }
.ddtable {  background-color: white; border: 0px; }.ddBody {  background-color: white;  border: 0px; }.ddTd {  background-color: white;  border: 0px; }
.printBlack { color: black; font-weight: bold; padding: 18px 8px; }
.ddHeader {  background-color: white;  color: black;  border: 0px; }
.tdparamscaption { background-color: white;  color: black; }.tdparamsinput { background-color: white;  color: black; }.inputparams { background-color: white;  color: black; }
.boldFont { font-weight: bold;  border: 0px solid white; color: black; }
.printHeader { color: black; border: 1px solid black; padding: 8px 8px; font-weight: bold; }
@media screen {
  .printGray { color: gray; padding: 18px 8px; }
  .printHidden { border: 2px outset white; background-color: MENU; color: MENUTEXT; padding: 18px 8px;}
}
@media print {
  .printHidden { display: none; }
  .printGray { visibility: hidden; padding: 18px 8px; font-weight: bold; }
  a { display: none; }}
</style>
<style type="text/css" id="styleA" disabled comment="когда нужно перепечатать все">
body, td {  background-color: white; }
.ddtable {  background-color: white; border: 0px; }.ddBody {  background-color: white;  border: 0px; }.ddTd {  background-color: white;  border: 0px; }
.printBlack { color: black; font-weight: bold; padding: 18px 8px; }
.ddHeader {  background-color: white;  color: black;  border: 0px; }
.tdparamscaption { background-color: white;  color: black; }.tdparamsinput { background-color: white;  color: black; }.inputparams { background-color: white;  color: black; }
.boldFont { font-weight: bold;  border: 0px solid white; color: black; }
.printHeader { color: black; border: 1px solid black; padding: 8px 8px; font-weight: bold; }
.printGray { color: black; padding: 18px 8px; }
@media screen {  .printHidden { border: 2px outset white; background-color: MENU; color: MENUTEXT; padding: 18px 8px;}}
@media print {  .printHidden { display: none; }  a { display: none; }}</style>
</head>

<script language="JavaScript" src="common/xmlcookies.js"></script><script language="JavaScript" src="common/xmlgrid.js"></script>
<script language="JavaScript" src="common/numToStr.js"></script>
<script language="JavaScript">
window.onload = function () {
  //
  // XSL
  //
	pageheader.innerHTML = xml_pageheader.transformNode(xml_stylesheet.XMLDocument);	pagefooter.innerHTML = xml_pageheader.transformNode(xml_stylesheet2.XMLDocument);  //
  //
  //
  var grid = document.getElementById("_dataGrid");
  //
  if (grid.rows.length == 3) {
    document.getElementById("style0").disabled = true;
    document.getElementById("style1").disabled = false;
    document.getElementById("newPage").style.display = "block";
  }

  for (var c=0; c<grid.rows(0).cells.length; c++) {
    grid.rows(0).cells(c).className = "printHeader";
  }
  //
  var numInd = grid.rows(0).cells.length-2;
  for (var i=1; i<grid.rows.length; i++) {
    for (var c=0; c<grid.rows(i).cells.length; c++) {
      grid.rows(i).cells(c).className = "printGray";
    }
    var num = parseInt(grid.rows(i).cells(numInd).innerText, 10);		grid.rows(i).cells(6).innerHTML += " <i>" + numToStr(num) +"</i>";  }

  // тек. запись для печати
  for (var c=0; c<grid.rows(grid.rows.length-2).cells.length; c++) {
    grid.rows(grid.rows.length-2).cells(c).className = "printBlack";
  }
	//

  if (grid.rows(grid.rows.length-2).cells(4).innerText.indexOf(" =")>0) {
    // итого по странице
    grid.rows(grid.rows.length-2).style.display = "none";    for (var c=0; c<grid.rows(grid.rows.length-2-1).cells.length; c++) {
      grid.rows(grid.rows.length-2-1).cells(c).className = "printBlack";
    }
    var expr = String(grid.rows(grid.rows.length-2).cells(6).innerText);
    document.getElementById("pagefooter").innerText = "итого по странице " + expr.substring(0, expr.indexOf(" "));
    document.getElementById("footer1").style.display = "block";  }

  if (grid.rows(grid.rows.length-2).cells(4).innerText.indexOf(" :")>0) {
    // итого по ведомости
    grid.rows(grid.rows.length-2).style.display = "none";

	//alert('_'+location.search.substring(1).split('&')[4].split('=')[1]+'_')
	
	var ed = location.search.substring(1).split('&')[4].split('=')[1]=='ЛИТОЛ '?' кг.':' л.';
	
    var re = /[0-9]/g;
    document.getElementById("numericToString").innerText = String(grid.rows(grid.rows.length-2).cells(6).innerText).replace(re, "").substring(1) + ed;
    document.getElementById("footer1").style.display = "block";

  }

  //
  // клавиши
  //
  document.onkeyup = function() {

    switch(event.keyCode) {
      case 13: // Enter
        Print1();
        break;
      case 27: // ESC
        Exit();
        break;
    }
  }

  //if (window_on_load) window_on_load();
  //  *** не делать onload!
  //  *** из-за gridNavigation
  //  *** вместо этого см.ниже
  setForm1Visible();


}

//
//
//
function Exit() {
  if (opener != null) {
    if (!opener.closed) {
      opener.firstInputFocus();
      window.close();
    }
  }
}

//
//
//
function PrintAll() {

  if (confirm("Вы хотите печатать всю карточку?\n\nУстановите в принтер чистый лист бумаги.")) {

    showClock();

    var st1 = document.getElementById("style0").disabled;
    var st2 = document.getElementById("style1").disabled;
  
    document.getElementById("style0").disabled = true;
    document.getElementById("style1").disabled = true;
    document.getElementById("styleA").disabled = false;
  
    window.print();
  
    document.getElementById("styleA").disabled = true;
    document.getElementById("style0").disabled = st1;
    document.getElementById("style1").disabled = st2;


    hideClock();

  }
}
//
function Print1() {
  showClock();
  window.print();
  hideClock();
//  Exit();
}
//
function showClock() {
  var el = document.getElementById("nameplate");
  el.style.posTop = (document.body.clientHeight-el.offsetHeight)/2;
  el.style.posLeft = (document.body.clientWidth-el.offsetWidth)/2;
  el.style.visibility = "visible";
}
//
function hideClock() {
  document.getElementById("nameplate").style.visibility = "hidden";
}

//
//
//
function deleteLastRec() {
  
  var obj = document.getElementById("_dataGrid");
  if (obj.rows(obj.rows.length-2).cells(4).innerText.indexOf(" =")>0) {
    // итого по странице
    var recId = parseInt(obj.rows.item(obj.rows.length-2-1).cells.item(0).innerText);
  }
  else {
    var recId = parseInt(obj.rows.item(obj.rows.length-2).cells.item(0).innerText);
  }

  // ?!?!?!
  var DELETERECORD = '<%=this.XmlFormParser.getSmth("/form/delete","src")%>'; // refuellingWaybillsSheetDeleteRecord
  openIframe("DELETE","?xml=refuelling/"+DELETERECORD+".xml&_record="+recId+"&__PARAMS_OPEN_BUTTON=запрос");

}
//
function closeSheet() {

  // ?!?!?!?!
  var CLOSESHEET = '<%=this.XmlFormParser.getSmth("/form/close","src")%>';  // refuellingWaybillsSheetClose
  openIframe("DELETE","?xml=refuelling/"+'refuellingWaybillsSheetClose'+".xml&_sheet="+document.getElementById("_sheet").innerText+"&__PARAMS_OPEN_BUTTON=запрос");
  
}


</script>

<body style="top-margin:0; left-margin: 0;">

<span id="__loadingMessage" style="padding: 12px; border: 1px solid black; background-color: infobackground; color: infotext;">загрузка данных . . . </span>
<div id="nameplate" class= "nameplate"><div style="background-color: infobackground; color: infotext; border: 1px solid black;">&nbsp;<br>&nbsp;&nbsp;обработка&nbsp;данных...&nbsp;&nbsp;<br>&nbsp;</div></div>

<form id=Form1 method=post runat="server" onsubmit="return __onSubmit()" style="visibility: hidden;">


<DIV id="sidebar"><div class="info"><b style="font-size: larger;">Печать</b><br><br>принтер:<div style="border: 1px solid black; padding: 9px 9px; color: black; background-color: white;"><b style="font-size: 16px">HP 1160</b></div><br/><div class="newPage" id="newPage" style="display: none;"><div style="width: 19px; height: 2px; border: 1px solid black; float: left; background-color: white;"></div><!--table align="left"><td><table><td height="10" width="7">&nbsp;</td></table></td></table--><div style="margin-left: 25px;">Установите в принтер новый лист бумаги</div></div><p>&nbsp;<a href="javascript: Print1()">[Enter]</a>&nbsp;Печатать&nbsp;последнюю&nbsp;строку.Выделена жирным шрифтом. Заголовок таблицы печатается если это первая строка на странице.<br><br>Установите в принтер лист ведомости с соответствующим номером.</p><p><a href="javascript: PrintAll()">Печатать&nbsp;всю&nbsp;ведомость</a><br>Установите в принтер чистый лист.</p></div><div class="info"><a href="javascript:deleteLastRec()" style="color: red;">Удалить</a> последнюю запись. Выделена жирным шрифтом.</div><div class="info"><a href="javascript:closeSheet()" style="color: green;">Закрыть ведомость</a><br>Закрыть ведомость. <b>Подвести итог.</b></div><div class="info">&nbsp;<a href="javascript: Exit()">[ESC]</a>&nbsp;Закрыть это окно, вернуться в окно выдачи ГСМ.</div></DIV> <!-- sidebar -->  <!--  /include HEADER  --><DIV id="container"><DIV id="contents"><table class="ddtable" cellpadding="4" cellspacing="0" id="xmlgridtable"><tr><td class="ddHeader"><div>    <xml id="xml_pageheader">
    <%
			Response.Write(this.XmlFormParser.getParametersXml().InnerXml);
		%>
    </xml>
    <xml id='xml_stylesheet' src='<%=this.XmlFormParser.getSmth("/form/xslheader","src")%>'></xml>    <xml>
    <%    	Response.Write(this.XmlFormParser.getInclude("headerxsl"));    %>
    </xml>
    <xml id='xml_stylesheet2' src='<%=this.XmlFormParser.getSmth("/form/xslfooter","src")%>'></xml>    <xml>    <%    	Response.Write(this.XmlFormParser.getInclude("footerxsl"));    %>    </xml>    <div id="pageheader" style="font-size: larger;"></div>
</div></td></tr>
<tr>
  <td class="ddTd">
    <div class="ddBody">
    <!-- -->
<table border="0" cellspacing="1" cellpadding="2" id="resulttable">
  <% Response.Write(this.XmlFormParser.getFormTableBody().InnerXml); %>
</table>
<!--
//
//
//
-->
<div id="datagrid">
<asp:DataGrid id="_dataGrid" runat="server" Border="0" CellSpacing="1" CellPadding="2" ShowFooter="True">
<FooterStyle CssClass="hide">
</FooterStyle>
</asp:DataGrid>
</div>
    <!-- / -->
    </div>
  </td>
</tr>
</table>

	<asp:textbox id="__ACTION" runat="server" cssclass="hide"></asp:textbox>	<asp:Label id="__ERRORMESSAGE" runat="server" EnableViewState="False" Visible="False"></asp:Label>	<asp:Label id="__VIEW" runat="server" Visible="False">GRID</asp:Label>	<asp:TextBox id=__EDITFORM runat="server" ReadOnly="True" cssclass="hide"></asp:TextBox>
	<!--
		FOOTER
	-->
	<div id="footer1" style="display: none;"><div id="pagefooter" style="border-top: 1px solid black; padding-top: 12px; font-size: larger;"></div></div></DIV> <!-- CONTENTS --></DIV> <!-- container -->
<%int divOffset;if (this.XmlFormParser.getDataGridHeight(-1)=="-1") {	divOffset = 380+64;}else {	divOffset = System.Convert.ToInt32(this.XmlFormParser.getDataGridHeight(380))+64;}%><div id="transparant" style="position: absolute; left: 32px; top: 82px; xposition: relative; xtop:-<% Response.Write(divOffset);%>px; xleft:0px; filter: Shadow(color=999999, direction=135, strength=12); padding:15px; display: none;">
<div style="background-color: infobackground; color: infotext; border: 1px solid dimgray; height:<% Response.Write(this.XmlFormParser.getEditFormHeight(380));%>px; width:<% Response.Write(this.XmlFormParser.getEditFormWidth(610));%>px;">
<iframe style="display: none;" id="resultframe" name="resultframe" frameborder="0" scrolling="no" height="<% Response.Write(this.XmlFormParser.getEditFormHeight(380));%>" width="<% Response.Write(this.XmlFormParser.getEditFormWidth(610));%>">
</iframe>
</div>
</div>

</form>
</body>
<script language="JavaScript"><% Response.Write(this.XmlFormParser.getScript()); %></script><script language="JavaScript" src="common/xmlform.js"></script></html>