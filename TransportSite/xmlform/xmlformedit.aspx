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
  <link href="common/xmlformedit.css" type="text/css" rel="stylesheet" />
    <link href="common/dhtmlgoodies_calendar.css" type="text/css" rel="stylesheet" />
</head>
<style type="text/css">
</style>
<script language="JavaScript" src="common/xmlformedit.js"></script><script language="JavaScript" src="common/dhtmlgoodies_calendar.js"></script><script language="JavaScript">
//window.onload = Loaded;</script>
<body topmargin="0" leftmargin="0">
<span id="__loadingMessage" style="padding: 12px; border: 1px solid black; background-color: infobackground; color: infotext;">загрузка данных . . . </span><form id=Form1 method=post runat="server" onsubmit="return _notify('submit')" style="visibility: hidden;">

<div class="hide"><% Response.Write(this.XmlFormParser.getInclude("header")); %></div>

<table cellpadding="4" cellspacing="0" border="0" class="ddtable" width="100%" height="100%"><tr><td class="ddHeader" height="2%"><%Response.Write(this.XmlFormParser.getFormTitle());%></td></tr><tr>
  <td class="ddTd" height="96%">
    <div class="ddBody" style="width:<% Response.Write(this.XmlFormParser.getDataGridWidth(570));%>px; height:<% Response.Write(this.XmlFormParser.getDataGridHeight(260));%>px; overflow: scroll;">
      <table border="0" cellspacing="1" cellpadding="2" id="resulttable">
        <% Response.Write(this.XmlFormParser.getFormTableBody().InnerXml); %>
      </table>
    </div>
  </td>
</tr>
<tr>
  <td class="ddTd" align="right" height="2%" xheight="42"> <!-- ?!?!?! -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">      <tr>
      <td valign="top" align="right" width="95%" class="buttonsinput">
        <table border="0" cellpadding="2" cellspacing="1">          <% Response.Write(this.XmlFormParser.getButtonsTableBody("resulttable").InnerXml); %>        </table>      </td>
      <td valign="top" width="5%" class="buttonsinput">
        <table border="0" cellpadding="2" cellspacing="1">        <tr>
          <td class="buttonsinput"><input type="button" value="отмена" class="xmlformcancelbutton" onclick="_notify('close')"></td>
        </tr>        </table>
      </td>
      </tr>    </table>
  </td>
</tr></table><div class="hide">  <table border="0" cellpadding="0" cellspacing="2" id="__submitParametersTable">    <% Response.Write(this.XmlFormParser.getParametersTableBody(false).InnerXml); %>  </table></div>

<div class="hide"><% Response.Write(this.XmlFormParser.getInclude("footer")); %></div>

<asp:textbox id="__ACTION" runat="server" cssclass="hide"></asp:textbox>
<asp:DataGrid id=_dataGrid runat="server" CellPadding="2" ShowFooter="True"></asp:DataGrid>
<asp:Label id=__VIEW runat="server" Visible="False">FORM</asp:Label> 
<asp:TextBox id=__EDITFORM runat="server" ReadOnly="True" cssclass="hide"></asp:TextBox> 
<asp:Label id="__ERRORMESSAGE" runat="server" EnableViewState="False" cssclass="hide" Visible="False"></asp:Label>

</form>
</body>
<script language="JavaScript"><% Response.Write(this.XmlFormParser.getScript()); %></script><script language="JavaScript" src="common/xmlform.js"></script></html>