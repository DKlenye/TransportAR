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
  <style type="text/css">
  .invisible { xDISPLAY: none; color: whitesmoke; border: 1px solid white; }
  </style>

</head>

<script language="JavaScript">
function Loaded() {

	try {		LoadedStart();	}
	catch(ex) { ; }

  // VER 2 для работы во фреймах
  if (parent && parent.Notification) {
    parent.Notification(window, "loaded");
  }

  document.getElementById("__loadingMessage").style.display = "none";
  document.Form1.style.visibility = "visible";

	try {
		LoadedFinish();
	}
	catch(ex) { ; }

}
</script>
<body onload="Loaded()">
<span id="__loadingMessage" style="padding: 12px; border: 1px solid black; background-color: infobackground; color: infotext;">загрузка данных . . . </span><form id=Form1 method=post runat="server" onsubmit="return __onSubmit()" style="visibility: hidden;">

<table border="0" width="100%" cellpadding="0" cellspacing="2">
<tr>
<td valign="top">
  <% Response.Write(this.XmlFormParser.getInclude("header")); %>
</td>
<td align="right"  valign="top">

<table class="ddtable" cellpadding="4" cellspacing="0">
<tr><td class="ddHeader"><%Response.Write(this.XmlFormParser.getFormTitle());%></td></tr>
<tr>
  <td class="ddTd">
    <table border="0" cellpadding="0" cellspacing="2" id="__submitParametersTable">
      <%        if (Request.QueryString["vertical"] != null)          Response.Write(this.XmlFormParser.getParametersTableBody(true).InnerXml);        else          Response.Write(this.XmlFormParser.getParametersTableBody(false).InnerXml);      %>
    </table>
  </td>
</tr>
<tr>
  <td class="ddTd">
    <div class="ddBody">
      <table border="0" cellspacing="1" cellpadding="2" id="resulttable" width="<% Response.Write(this.XmlFormParser.getDataGridWidth(350));%>">
        <% Response.Write(this.XmlFormParser.getFormTableBody().InnerXml); %>
      </table>
    </div>
  </td>
</tr>
<tr>
  <td class="ddTd" align="right" height="42">
    <table border="0" cellpadding="2" cellspacing="1">
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
<asp:DataGrid id=_dataGrid runat="server" CellPadding="2" ShowFooter="True"></asp:DataGrid>
<asp:Label id=__VIEW runat="server" Visible="False">FORM</asp:Label> 
<asp:TextBox id=__EDITFORM runat="server" ReadOnly="True" cssclass="hide"></asp:TextBox> 

</form>
</body>
<script language="JavaScript"><% Response.Write(this.XmlFormParser.getScript()); %></script><script language="JavaScript" src="common/xmlform.js"></script></html>