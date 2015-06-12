<%@ Page Language="C#" AutoEventWireup="true" %>
<html>
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="chrome=1">
<link rel="Stylesheet" type="text/css" href="Handlers/CSS.ashx" />
<script language="javascript" type="text/javascript" src="Handlers/JS.ashx"></script>
<script src="db/Menu.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript" src="Handlers/Direct.ashx"></script>
<link rel="shortcut icon" href="images/icons/lorry.png" type="image/x-icon" />
<!--[if IE]><link rel="shortcut icon" href="lorry.ico"><![endif]-->
<title >Транспорт</title>
</head>
<body>
    <form id="form1" runat="server">
        <% Response.Write(Kdn.Web.WebHelper.getLoadIndicator()); %>
    </form>
    
</body>
</html>
