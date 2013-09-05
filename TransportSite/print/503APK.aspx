<%@ Page Language="C#" AutoEventWireup="true" Inherits="Transport.Web.WaybillTpl" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251"/>
    <title></title>
<link href="WaybillTemplate.css" rel="stylesheet" type="text/css"/>

<!--[if IE]>
	<link rel="stylesheet" type="text/css" href="WaybillTemplate_IE.css" />
<![endif]-->


<!--

                    <table class="data" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                    </tr>
                    </tbody>
                    </table>
                    
                    
                            <table cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                    
-->
<style type="text/css">

.data td
{
    height:5mm;
}

.otherText td 
{
   font-size:9pt; 
   line-height: 1.7;
}

td.title
{
    font-size:10pt;
    font-weight:bold; 
}



    
</style>

</head>
<body>
    <form id="form1" runat="server">
    <table class="waybill-page first" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td style="width:5mm;">&nbsp;</td>
                <td>
                 <table cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                           <td>
                            <table cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr> <td style="width:110mm">
                                <table class="otherText" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td class="pre-lined">�����������</td>
                                                    <td class="lined">&nbsp;</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>                                        
                                        <td>
                                        <table cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td class="pre-lined">�����&nbsp;�&nbsp;�����&nbsp;������</td>
                                                    <td class="lined">&nbsp;<% Response.Write(String.Format("{0} <i><b>{1}</b></i> {2}",VehicleModel(),VehicleRegistrationNumber(),VehicleGarageNumber()==""?"":"(���. � "+VehicleGarageNumber()+")")); %></td>
                                                </tr>
                                            </tbody>
                                            </table>                                        
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            <td style="width:90mm" align="center">
                               <%Response.Write(Stamp()); %>
                            </td>
                            <td>
                                 <table class="form-head" cellpadding="0" cellspacing="0">
                                     <tbody>
                                        <tr><td align="right">����� � <b>503-���</b></td></tr>
                                         <tr><td align="left">����������</td></tr>
                                         <tr><td align="left">������������� ������������ ��������� ���������</td></tr>
                                         <tr><td align="left">� �������������� ���������� ��������</td></tr>
                                         <tr><td align="left">22.11.2005 �69</td></tr>
                                         <tr><td style="height:1mm">&nbsp;</td></tr>
                                    </tbody>
                                 </table>
                            </td>
                            <td style="width:7mm">&nbsp;</td>
                            </tr>
                                </tbody>
                            </table>
                           </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td style="width:70mm;">
                                                <table cellpadding="0" cellspacing="0" class="otherText">
                                                    <tbody>
                                                        <tr>
                                                            <td align="left">��������� ���������:</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table cellpadding="0" cellspacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="width:5mm;">&nbsp;</td>
                                                                            <td class="pre-lined">���&nbsp;������</td>
                                                                            <td class="lined">&nbsp;<% Response.Write(this.DepartureMh()); %></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                         </tr>
                                                        <tr>
                                                            <td>
                                                                <table cellpadding="0" cellspacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="width:5mm;">&nbsp;</td>
                                                                            <td class="pre-lined">���&nbsp;�����������</td>
                                                                            <td class="lined">&nbsp;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td style="width:20mm;">&nbsp;</td>
                                            <td>
                                                  <table cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                  <table class="title" cellpadding="0" cellspacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="pre-lined title">�ר����&nbsp;����&nbsp;�</td>
                                                                            <td class="lined"><b>&nbsp;<% Response.Write(this.WaybillNumber()); %></b></td>
                                                                            <td class="pre-lined title">�����������-���������</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>                                                           
                                                            <td>
                                                                  <table cellpadding="0" cellspacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="width:20mm;">&nbsp;</td>
                                                                            <td class="pre-lined title">��</td>
                                                                            <td class="lined"><b>&nbsp;<% Response.Write(DepartureDate("dd MMMM")); %></b></td>
                                                                            <td>&nbsp;</td>
                                                                            <td class="lined" style="width:15mm;"><b>&nbsp;<% Response.Write(DepartureDate("yyyy")); %></b></td>
                                                                            <td style="width:20mm;">&nbsp;</td>                                                                            
                                                                        </tr>
                                                                        <tr>
                                                                            <td>&nbsp;</td>
                                                                            <td>&nbsp;</td>
                                                                            <td class="subscript">�����,�����</td>       
                                                                            <td>&nbsp;</td>    
                                                                            <td class="subscript">���</td>
                                                                            <td>&nbsp;</td>                                                                 
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td style="width:80mm;">&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td class="lined">&nbsp;<% Response.Write(String.Format("{0} {1}", DriverFio(1), DriverTab(1) == "" ? "" : "(���.�" + DriverTab(1)+")")); %></td>
                                            <td style="width:160mm;">&nbsp</td>
                                        </tr>
                                        <tr>
                                            <td class="subscript">�������,��������&nbsp;���������</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr style="height:130mm">
                            <td>
                                <table class="data" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="header rectangle">
                                            <td rowspan="3">����</td>
                                            <td>������� ��������:</td>
                                            <td rowspan="3">������������<br/>����������� ������<br/>(��������)</td>
                                            <td rowspan="3">���-<br/>���� ����-<br/>�����</td>
                                            <td rowspan="3">����� ����-<br/>�����</td>
                                            <td rowspan="3">�������� �� ���-<br/>���� ������, ���</td>
                                            <td rowspan="3">��������-<br/>�����</td>
                                            <td rowspan="3">����-<br/>������ �����</td>
                                            <td colspan="2">����������� ����� ������</td>
                                            <td rowspan="3">����-<br/>������ �����-<br/>������ ������</td>
                                            <td rowspan="3">������� �����-<br/>����</td>
                                            <td colspan="3">����� ���������� �����, ���.</td>
                                            <td rowspan="3">������-<br/>����, � (��)</td>
                                            <td rowspan="3">������ ������� �� �����, � (��)</td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>�������</td>
                                            <td rowspan="2">� ������</td>
                                            <td rowspan="2">�����-����</td>
                                            <td rowspan="2">�������� ��������</td>
                                            <td rowspan="2">�����-<br/>��</td>
                                            <td rowspan="2">�����</td>
                                        </tr>
                                        <tr>
                                            <td class="header rectangle">����������</td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td style="width:20mm;">1</td>
                                            <td>2</td>
                                            <td style="width:50mm;">3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td style="width:15mm;">7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <td>10</td>
                                            <td>11</td>
                                            <td>12</td>
                                            <td style="width:18mm;">13</td>
                                            <td style="width:12mm;">14</td>
                                            <td style="width:20mm;">15</td>
                                            <td style="width:14mm;">16</td>
                                            <td>17</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;<%Response.Write(DepartureDate("dd.MM")); %></td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                 </table>
                 </td>
                <td style="width:5mm;">&nbsp;</td>
            </tr>
        </tbody>
    </table>

    <div class="page-separator"></div>
    <div class="page-break"></div>

    <table class="waybill-page second" cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="height:3mm;"><td colspan="3">&nbsp;</td></tr>
                 <tr style="height:1mm;">
                            <td style="width:5mm; height:1mm;">&nbsp;</td>
                            <td>
                                <table class="data" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="header rectangle">
                                            <td rowspan="3">����</td>
                                            <td>������� ��������:</td>
                                            <td rowspan="3">������������<br/>����������� ������<br/>(��������)</td>
                                            <td rowspan="3">���-<br/>���� ����-<br/>�����</td>
                                            <td rowspan="3">����� ����-<br/>�����</td>
                                            <td rowspan="3">�������� �� ���-<br/>���� ������, ���</td>
                                            <td rowspan="3">��������-<br/>�����</td>
                                            <td rowspan="3">����-<br/>������ �����</td>
                                            <td colspan="2">����������� ����� ������</td>
                                            <td rowspan="3">����-<br/>������ �����-<br/>������ ������</td>
                                            <td rowspan="3">������� �����-<br/>����</td>
                                            <td colspan="3">����� ���������� �����, ���.</td>
                                            <td rowspan="3">������-<br/>����, � (��)</td>
                                            <td rowspan="3">������ ������� �� �����, � (��)</td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>�������</td>
                                            <td rowspan="2">� ������</td>
                                            <td rowspan="2">�����-����</td>
                                            <td rowspan="2">�������� ��������</td>
                                            <td rowspan="2">�����-<br/>��</td>
                                            <td rowspan="2">�����</td>
                                        </tr>
                                        <tr>
                                            <td class="header rectangle">����������</td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td style="width:20mm;">1</td>
                                            <td>2</td>
                                            <td style="width:50mm;">3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td style="width:15mm;">7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <td>10</td>
                                            <td>11</td>
                                            <td>12</td>
                                            <td style="width:18mm;">13</td>
                                            <td style="width:12mm;">14</td>
                                            <td style="width:20mm;">15</td>
                                            <td style="width:14mm;">16</td>
                                            <td>17</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                        <tr>
                                            <td rowspan="2">&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                            <td rowspan="2">&nbsp;</td>
                                        </tr><tr><td>&nbsp;</td></tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style="width:5mm; height:1mm;">&nbsp;</td>
                        </tr>
                        <tr style="height:1mm;"><td colspan="3">
                            <table class="otherText" cellpadding="0" cellspacing="0" style="width:100%;">
                                <tbody>
                                    <tr>
                                        <td style="width:50%;">
                                            <table cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="pre-lined" align="left">�������&nbsp;�������&nbsp;�&nbsp;����&nbsp;��&nbsp;������&nbsp;�����</td>
                                                        <td class="lined" style="width:40mm;">&nbsp;<% Response.Write(FuelRemains()); %></td>
                                                        <td align="left">�&nbsp;(��)</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="pre-lined" align="left">�����������&nbsp;������&nbsp;�������</td>
                                                        <td class="lined" style="width:40mm;">&nbsp;</td>
                                                        <td align="left">�&nbsp;(��)</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="pre-lined" align="left">�������&nbsp;�������&nbsp;�&nbsp;����&nbsp;��&nbsp;���������&nbsp;�����</td>
                                                        <td class="lined" style="width:40mm;">&nbsp;</td>
                                                        <td align="left">�&nbsp;(��)</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="pre-lined" align="left">��������(+),����������(-)</td>
                                                        <td class="lined" style="width:40mm;">&nbsp;</td>
                                                        <td align="left">�&nbsp;(��)</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td></tr>
                <tr style="height:1mm;"><td colspan="3">
                    <table class="otherText" cellspacing="0" cellpadding="0" style="width:100%">
                        <tbody>
                            <tr>
                                <td class="pre-lined">
                                    ����������:&nbsp;������-����
                                </td>
                                <td class="lined">&nbsp;</td>
                                <td class="pre-lined">,&nbsp;������-����</td>
                                <td class="lined">&nbsp;</td>
                                <td style="width:150mm;">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </td></tr>
                <tr style="height:1mm;"><td colspan="3">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td style="width:50mm; font-weight:bold; font-size:9pt;" align="left">���������� ��������</td>
                                <td class="lined">&nbsp;</td>
                                <td>&nbsp;</td>
                                <td class="lined">&nbsp;</td>
                                <td style="width:110mm;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td class="subscript">�������</td>
                                <td>&nbsp;</td>
                                <td class="subscript">�������,&nbsp;��������</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="width:50mm; font-weight:bold; font-size:9pt;" align="left">�������</td>
                                <td class="lined">&nbsp;</td>
                                <td>&nbsp;</td>
                                <td class="lined">&nbsp;</td>
                                <td style="width:110mm;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td class="subscript">�������</td>
                                <td>&nbsp;</td>
                                <td class="subscript">�������,&nbsp;��������</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </td></tr>
            </tbody>
        </table>
    </form>
</body>
</html>
