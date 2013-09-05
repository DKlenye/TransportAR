<%@ Page language="c#" src="bin/_xmlform.cs" AutoEventWireup="false" Inherits="XmlWebForm" codePage="1251"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
  <title><%Response.Write(this.XmlFormParser.getFormTitle());%></title>
  <META http-equiv="Content-Type" content="text/html; charset=windows-1251">
  <meta http-equiv="EXPIRES" content="Tue, 04 Dec 1996 21:29:02 GMT">

  <link href="common/xmlform.css" type="text/css" rel="stylesheet" />

  <style type="text/css">
  qqqTD { background-color: white }  </style>

</head>

<script language="JavaScript" src="common/xmlcookies.js"></script><script language="JavaScript" src="common/xmlgrid.js"></script><script language="JavaScript">
window.onload=Loaded;
</script>

<body>
<span id="__loadingMessage" style="padding: 12px; border: 1px solid black; background-color: infobackground; color: infotext;">загрузка данных . . . </span><form id=Form1 method=post runat="server" onsubmit="return __onSubmit()" style="visibility: hidden;">

<table border="0" width="100%" cellpadding="0" cellspacing="2">
<tr>
<td valign="top" align="right" width="40%">
  <% Response.Write(this.XmlFormParser.getInclude("header")); %>
</td>
<td align="left"  valign="top">

<table class="ddtable" cellpadding="4" cellspacing="0" id="xmlgridtable">
<tr><td class="ddHeader"><%Response.Write(this.XmlFormParser.getFormTitle());%></td></tr>
<tr>
  <td class="ddTd">
    <table border="0" cellpadding="0" cellspacing="2" id="__submitParametersTable" xid="_paramsGrid">
      <%        if (Request.QueryString["vertical"] != null)          Response.Write(this.XmlFormParser.getParametersTableBody(true).InnerXml);        else          Response.Write(this.XmlFormParser.getParametersTableBody(false).InnerXml);      %>
    </table>
  </td>
</tr>
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

<% Response.Write(this.XmlFormParser.getInclude("footer")); %>

</td>
</tr>
</table>

<asp:textbox id="__ACTION" runat="server" cssclass="hide"></asp:textbox>
<asp:Label id="__ERRORMESSAGE" runat="server" EnableViewState="False" Visible="False"></asp:Label>
<asp:Label id="__VIEW" runat="server" Visible="False">GRID</asp:Label> 
<asp:TextBox id=__EDITFORM runat="server" ReadOnly="True" cssclass="hide"></asp:TextBox> 

<%
int divOffset;
if (this.XmlFormParser.getDataGridHeight(-1)=="-1") {
	divOffset = 380+64;
}
else {
	divOffset = System.Convert.ToInt32(this.XmlFormParser.getDataGridHeight(380))+64;
}
%>
<div id="transparant" style="position: relative; top:-<% Response.Write(divOffset);%>px; left:30%; filter: Shadow(color=999999, direction=135, strength=12); padding:15px; display: none;">
<div  style="background-color: infobackground; color: infotext; border: 1px solid dimgray; height:<% Response.Write(this.XmlFormParser.getEditFormHeight(380));%>px; width:<% Response.Write(this.XmlFormParser.getEditFormWidth(610));%>px; ">
<iframe  style="display: none;" id="resultframe" name="resultframe" frameborder="0" scrolling="no" height="<% Response.Write(this.XmlFormParser.getEditFormHeight(380));%>" width="<% Response.Write(this.XmlFormParser.getEditFormWidth(610));%>">
</iframe>
</div>
</div>

</form>
</body>
<script language="JavaScript"><% Response.Write(this.XmlFormParser.getScript()); %></script><script language="JavaScript" src="common/xmlform.js"></script></html>