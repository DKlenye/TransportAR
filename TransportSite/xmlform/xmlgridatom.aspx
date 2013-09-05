<%@ Page language="c#" src="bin/_xmlform.cs" AutoEventWireup="false" Inherits="XmlWebForm" codePage="1251"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
  <title><%Response.Write(this.XmlFormParser.getFormTitle());%></title>

  <meta content="Microsoft Visual Studio 7.0" name=GENERATOR>
  <meta content=C# name=CODE_LANGUAGE>
  <meta content=JavaScript name=vs_defaultClientScript>
  <meta content=http://schemas.microsoft.com/intellisense/ie5 name=vs_targetSchema>

  <META http-equiv=Content-Type content="text/html; charset=windows-1251">
  <meta http-equiv="EXPIRES" content="Tue, 04 Dec 1996 21:29:02 GMT">

  <link href="common/xmlform.css" type="text/css" rel="stylesheet" />
  <link href="common/xmlatom.css" type="text/css" rel="stylesheet" />

  <style type="text/css">
  TD { background-color: white }
  </style>

</head>

<script language="JavaScript" src="common/xmlcookies.js"></script><script language="JavaScript" src="common/xmlgrid.js"></script><script language="JavaScript">
window.onload=Loaded;

function Prologue() { ; }

</script>

<body topmargin="0" leftmargin="0">
<span id="__loadingMessage" style="padding: 12px; border: 1px solid black; background-color: infobackground; color: infotext;">загрузка данных . . . </span><form id=Form1 method=post runat="server" style="visibility: hidden;">

<div class="hide"><% Response.Write(this.XmlFormParser.getInclude("header")); %></div>

<table cellpadding="4" cellspacing="0" id="xmlgridatomtable">
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
<table id="_headerGrid" border="0" cellspacing="1" cellpadding="2">
</table>
<div id="datagrid" style="width:<% Response.Write(this.XmlFormParser.getDataGridWidth(620));%>px; height:<% Response.Write(this.XmlFormParser.getDataGridHeight(280));%>px; overflow: scroll;">
<asp:DataGrid id="_dataGrid" runat="server" Border="0" CellSpacing="1" CellPadding="2" ShowFooter="True">
<FooterStyle CssClass="hide">
</FooterStyle>
</asp:DataGrid>
</div>
    <!-- / -->
    </div>
  </td>
</tr>
<tr>
  <td class="ddTd" align="right" height="42">
    <table border="0" cellpadding="2" cellspacing="1" id="_buttonGrid">
      <% Response.Write(this.XmlFormParser.getButtonsTableBody("resulttable").InnerXml); %>
    </table>
  </td>
</tr>
</table>
<div class="hide">    <table border="0" cellpadding="0" cellspacing="2" id="__submitParametersTable" xid="_paramsGrid">      <% Response.Write(this.XmlFormParser.getParametersTableBody(true).InnerXml); %>
    </table>
</div>

<div class="hide"><% Response.Write(this.XmlFormParser.getInclude("footer")); %></div>

<asp:Label id="__ERRORMESSAGE" runat="server" EnableViewState="False" Visible="False"></asp:Label>
<asp:Label id="__VIEW" runat="server" Visible="False">GRID</asp:Label> 
<asp:textbox id="__ACTION" runat="server" cssclass="hide"></asp:textbox><asp:textbox id="__EDITFORM" runat="server" ReadOnly="True" cssclass="hide"></asp:textbox><%int divOffset;if (this.XmlFormParser.getDataGridHeight(-1)=="-1") {	divOffset = 380+64;}else {	divOffset = System.Convert.ToInt32(this.XmlFormParser.getDataGridHeight(380))+64;}%><div id="transparant" style="position: relative; top:-<% Response.Write(divOffset);%>px; left:0px; filter: Shadow(color=999999, direction=135, strength=12); padding:15px; display: none;"><!-- div style="background-color: infobackground; color: infotext; border: 1px solid dimgray; height:<% Response.Write(this.XmlFormParser.getEditFormHeight(360));%>px; width:<% Response.Write(this.XmlFormParser.getEditFormWidth(610));%>px;" -->
<iframe style="display: none;" id="resultframe" name="resultframe" frameborder="0" scrolling="no" height="<% Response.Write(this.XmlFormParser.getEditFormHeight(360));%>" width="<% Response.Write(this.XmlFormParser.getEditFormWidth(610));%>">
</iframe>
<!-- /div -->
</div>




</form></body>
<script language="JavaScript"><% Response.Write(this.XmlFormParser.getScript()); %></script><script language="JavaScript" src="common/xmlform.js"></script></html>