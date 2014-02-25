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
    
    <style type="text/css">


    .ticket-separator{
        width:2mm;
        border-left:1pt solid silver;
        border-right:1pt solid silver;
    }
    .ticket{
        width:57mm;
        padding:1mm;
        font-family:Times New Roman;
        font-size:10pt;
    }  
    
    .first .ticket
    {
        padding-right:5mm;
        
    }
    .first .ticket td,.second .ticket td{
       height:5mm;
    }
 

    .sub-header{
        text-align:center;
    }


    .form-head{
        font-size: 7pt;
        text-align:right;
        vertical-align:middle;
        line-height: 1.1;
    }
    
    .first .waybill{
        padding-right:1mm;
    }
    .second .waybill{
        padding-left:1mm;
        padding-right:6mm;
    }
 
    .header
    {
       line-height: 1.1;
    }
    .header td, .data.task-doing .header td, .data .header td
    {
      height:1mm;
    }        

    .footer td.lined
    {
        height:6mm;
    }
    
    .shift{
        border-right:1pt solid black;        
        vertical-align:middle;
    }
    .shift td{
        text-align:center;
    }
    .result td{
        height:5mm;
    }
    .result .header td{
    }
    .data.task-doing td{
        height:7mm;
        padding:0mm 1mm 0mm 1mm;
    }
    .footer-separator{
        width:1mm;
        border-bottom:1pt solid black;
    }
    .dataText
    {
        font-weight:bold;
    }
    
    .data td{
        height:4mm;
}
.waybill-page {
    font-size: 9pt;
}

</style>
    
</head>
<body>
    <form id="form1" runat="server">

        <table class="waybill-page first" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td class="waybill">
                     <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td style="border-width:0pt">
                                    <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                            <td align="center"><div style="border: 2px solid #88A1C0; text-align: center; font: normal 11px Times New Roman;z-index:10000; width:150pt;" >
                                                �������� ����������� �������� &quot;������&quot;<br/>
                                                ���������� ��������,��������� ���.<br/>
                                                211440,�.����������, ���. 59-83-09
</div></td>
                                                <td style="width:40mm;"></td>
                                                <td style="width:30mm;text-align:center; font-family: Tahoma; font-size:12pt;"><span><%Response.Write(WaybillCode());%></span></td>
                                                <td style="width:60mm">
                                                    <table class="form-head" cellpadding="0" cellspacing="0">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    ���������� 1
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    � ���������� � ������� ����������
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    �������� ����� ������������ ������
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align:left;">
                                                                    ����������
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align:left;">
                                                                    ������ ������������ ��������� �� 18.04.2012 � 640
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                           <tr><td align="center" style="font-size:12pt;"><b>������� ���� � <span><%Response.Write(WaybillNumber());%></span><br/>
                               ������������ ������</b></td></tr>
                           <tr> <td align="center"><b>
                                                    <table  cellpadding="0" cellspacing="0" style="width:50mm;">
																		<tbody>	
																			<tr>
																				<td class="pre-lined">&quot;</td>
																				<td class="lined" style="width:7mm">&nbsp;<span><%Response.Write(DepartureDate("dd")); %></span></td>
																				<td class="pre-lined">&quot;&nbsp;</td>
																				<td class="lined" style="width:25mm">&nbsp;<span><%Response.Write(DepartureDate("MMMM")); %></span></td>
																				<td class="pre-lined"></td>
																				<td class="lined" style="width:15mm">&nbsp;<span><%Response.Write(DepartureDate("yyyy")); %></span></td>
																				<td class="pre-lined"> �.</td>
																			</tr>
																		</tbody>
																	</table>
                                                    
                                                </b></td></tr>
                           <tr><td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td valign="top" rowspan="2" class="pre-lined">������������&nbsp;������</td>
                                        <td style="text-align:left;"class="lined">&nbsp;&nbsp;&nbsp;<span class="dataText"><%Response.Write(VehicleModel());%>&nbsp;<%Response.Write(VehicleRegistrationNumber());%></span></td>
                                        <td valign="top" rowspan="2"class="pre-lined">&nbsp;�����������&nbsp;�����</td>
                                        <td class="lined" style="width:35mm;">&nbsp;&nbsp;&nbsp;<span class="dataText">�������� �&nbsp;<%Response.Write(VehicleGarageNumber());%></span></td>
                                    </tr>
                                    <tr>
                                    <td class="subscript">������������, ����� ��������������� �����</td>
                                    </tr>
                                </table>
                           </td></tr>
                           <tr><td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td valign="top" rowspan="2" class="pre-lined">��������</td>
                                        <td class="lined" style="text-align:left;">&nbsp;&nbsp;&nbsp;<span class="dataText" style="font-size:6pt;"><%Response.Write(DriverFio(1));%>&nbsp;<%Response.Write(DriverLicence(1));%>, <%Response.Write(DriverFio(2));%>&nbsp;<%Response.Write(DriverLicence(2));%></span></td>
                                        <td valign="top" rowspan="2"class="pre-lined">&nbsp;������</td>
                                        <td class="lined">&nbsp;</td>
                                    </tr>
                                    <tr>
                                    <td class="subscript">�������, ��������, ����� ������������� �������������</td>
                                    <td class="subscript">�������, ��������, ����� ������������� �������������</td>
                                    </tr>
                                </table>
                           </td></tr>
                           <tr><td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td valign="top" rowspan="2" class="pre-lined">���������</td>
                                        <td class="lined">&nbsp; <%Response.Write(CustomerName()); %></td>
                                    </tr>
                                    <tr>
                                    <td class="subscript">������������</td>
                                    </tr>
                                </table>
                           </td></tr>
                           <tr><td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td valign="top" rowspan="2" class="pre-lined">������&nbsp;�����</td>
                                        <td style="text-align:left;" class="lined">&nbsp;&nbsp;&nbsp;<span class="dataText"><%Response.Write(CustomerName());%></span></td>
                                    </tr>
                                    <tr>
                                    <td class="subscript">������������, �����</td>
                                    </tr>
                                </table>
                           </td></tr>
                           <tr>
                           <td>
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td>
                                            <table class="data" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr class="rectangle">
                                                        <td colspan="3"><b>������ ��������� � ������������ �������</b></td>
                                                        <td colspan="4"><b>������� ���������</b></td>
                                                    </tr>
                                                    <tr class="rectangle">
                                                        <td rowspan="2">��������</td>
                                                        <td rowspan="2">��������� ����������</td>
                                                        <td rowspan="2">����� �����������(�����,�����,���,���)</td>
                                                        <td colspan="3">����� (���.,���.)</td>
                                                        <td rowspan="2">����� �����������</td>
                                                    </tr>
                                                    <tr class="rectangle">
                                                        <td>������/ ��������</td>
                                                        <td>�������� �� ������</td>
                                                        <td>������ � �������</td>
                                                    </tr>
                                                    <tr><td style="text-align:left;">�����<br/>�� ������</td><td><span class="dataText"><% Response.Write(DepartureKm());%><br/></span></td><td>
                                                        &nbsp;</td><td><span class="dataText"><% Response.Write(DepartureDate("HH:mm"));%></span></td><td>
                                                        &nbsp;</td><td>&nbsp;</td><td>&nbsp;<% Response.Write(DepartureMh());%></td></tr>
                                                    <tr><td style="text-align:left;">�����������<br/>� �������</td><td>&nbsp;</td><td>&nbsp;</td><td><span class="dataText"><% Response.Write(ReturnDate("HH:mm"));%></span></td><td>
                                                        &nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                </tbody>
                                            </table>
                                            <table class="data" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr class="rectangle">
                                                        <td colspan="9"><b>�������� ��������-��������� ����������</b></td>
                                                    </tr>
                                                    <tr class="rectangle">
                                                        <td colspan="5">�������� ���</td>
                                                        <td colspan="2">�������</td>
                                                        <td colspan="2">�������������</td>
                                                    </tr>
                                                    <tr class="rectangle">
                                                        <td style="width:12mm;">����</td>
                                                        <td>�����<br/>��������</td>
                                                        <td>�����<br/>���</td>
                                                        <td>����-<br/>������, �</td>
                                                        <td style="font-size:7pt;">�������<br/>����������<br/>(����� ���� ���)</td>
                                                        <td style="width:15mm;">��� ������</td>
                                                        <td style="width:15mm;">��� �����������</td>
                                                        <td style="width:15mm;">����������</td>
                                                        <td style="width:15mm;">�� �����</td>
                                                    </tr>
                                                    <tr><td>&nbsp;</td><td>&nbsp;</td><td><span class="dataText" style="font-size:7pt;"><% Response.Write(FuelName());%></span></td><td>
                                                        &nbsp;</td><td>&nbsp;</td><td><span class="dataText"><% Response.Write(FuelRemains());%></span></td><td>
                                                        &nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>
                                                        &nbsp;</td></tr>
                                                    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>
                                                        &nbsp;</td></tr>
                                                    </tbody>
                                            </table>
                                            <table class="footer" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                    <td style="width:5mm;">&nbsp;</td>
                                                    <td>
                                                        <table cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left">������������ ������������� ��������, ������� �����.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td valign="top" rowspan="2" class="pre-lined"><b>���������</b></td>
                                                                                <td class="lined">&nbsp;</td>
                                                                                <td style="width:70mm;" class="lined">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>&nbsp;</td>
                                                                                <td class="subscript">�������, �������, ��������</td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">�������� �� ��������� �������� � ���������� �������.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td valign="top" rowspan="2" class="pre-lined"><b>����</b></td>
                                                                                <td class="lined">&nbsp;</td>
                                                                                <td style="width:70mm;" class="lined">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>&nbsp;</td>
                                                                                <td class="subscript">�������, �������, ��������</td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">����������� ���������� ��������.����� ��������.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td valign="top" rowspan="2" class="pre-lined"><b>�������</b></td>
                                                                                <td class="lined">&nbsp;</td>
                                                                                <td style="width:70mm;" class="lined">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>&nbsp;</td>
                                                                                <td class="subscript">�������, �������, ��������</td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">����������� ������.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td valign="top" rowspan="2" class="pre-lined"><b>��������</b></td>
                                                                                <td class="lined">&nbsp;</td>
                                                                                <td style="width:70mm;" class="lined">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>&nbsp;</td>
                                                                                <td class="subscript">�������, �������, ��������</td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style="width:5mm;">&nbsp;</td>
                                                    <td valign="top" style="width:60mm;">
                                                        <table cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left">��� ����������� ����������� ��������/���������� (�������� 
                                                                        ����������)</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td valign="top" rowspan="2" class="pre-lined"><b>����&nbsp;��������</b></td>
                                                                                <td class="lined">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="subscript">�������</td>
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
                                                                                <td valign="top" rowspan="2" class="pre-lined"><b>������&nbsp;�������</b></td>
                                                                                <td class="lined">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="subscript">�������</td>
                                                                            </tr>
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
                                        </td>
                                        
                                        <td style="width:60mm;">
                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                    <tr><td><b>������ �������</b></td></tr>
                                                    <tr><td class="lined">&nbsp;</td></tr>
                                                    <tr><td class="lined">&nbsp;</td></tr>
                                                    <tr><td class="lined">&nbsp;</td></tr>
                                                    <tr><td class="lined">&nbsp;</td></tr>
                                                    <tr><td class="lined">&nbsp;</td></tr>
                                                    <tr><td class="lined">&nbsp;</td></tr>
                                                    <tr><td align="center" style="font-size:12pt; font-weight:bold"><span style="text-decoration:underline">
                                                        �����������</span> �������� ����� 30 ������ �� ��� ��� �����-�������!</td></tr>
                                                    <tr><td>&nbsp;</td></tr>
                                                    <tr><td align="center" style="font-size:12pt; font-weight:bold"><span style="text-decoration:underline">
                                                        �����������</span> �������� ��� ������������� �������������!</td></tr>
                                                    <tr><td>&nbsp;</td></tr>
                                                    <tr><td>
                                                        <table class="data" cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr class="rectangle">
                                                                    <td colspan="3"><b>������������</b></td>
                                                                </tr>
                                                                <tr class="rectangle">
                                                                    <td>�������, ��������</td>
                                                                    <td>����� �������������</td>
                                                                    <td>��������</td>
                                                                </tr>
                                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                            </tbody>
                                                        </table>
                                                    </td></tr>
                                                    
                                                    
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                           </td>
                           </tr>
                            
                         </tbody>
                     </table>
                </td>
                <td class="ticket-separator" style="height:1mm;">&nbsp;</td>
                <td class="ticket" style="height:100%">
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr><td class="sub-header">�������</td></tr>
                            <tr><td class="sub-header">� �������� ����� � <span class="dataText"><%Response.Write(WaybillNumber()); %></span></td></tr>
                            <tr><td class="sub-header">�� <span class="dataText"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></span>�.</td></tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="pre-lined">������������</td>
                                                <td class="lined">���&quot;������&quot;&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td class="subscript">&nbsp;</td>
                                                <td class="subscript">������������ �����������</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="pre-lined">�����������</td>
                                                <td class="lined">&nbsp;<span class="dataText" style="font-size:8pt;"><%Response.Write(VehicleModel()); %></span></td>
                                            </tr>
                                            <tr>
                                                <td class="subscript">&nbsp;</td>
                                                <td class="subscript">������������,�����</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr><td class="lined">&nbsp;<span class="dataText"><%Response.Write(VehicleRegistrationNumber()); %></span></td></tr>                            
                            <tr><td class="subscript">��������������� �����</td></tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td rowspan="2" class="pre-lined" style="vertical-align:top;">��������&nbsp;</td>
                                                <td class="lined"><span style="font-size:5pt;" class="dataText"><% Response.Write(DriverFio(1));%><br/><% Response.Write(DriverFio(2));%></span></td>
                                            </tr>
                                            <tr>                                                
                                                <td class="subscript">������� ��������</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td rowspan="2" class="pre-lined" style="vertical-align:top;">���������&nbsp;</td>
                                                <td class="lined">&nbsp;<%Response.Write(CustomerName()); %></td>
                                            </tr>
                                            <tr>                                                
                                                <td class="subscript">������������ �����������</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr><td class="lined">&nbsp;</td></tr>                            
                            <tr><td class="subscript">���������, �������, ��������</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="pre-lined" style="vertical-align:top;">�����&nbsp;�&nbsp;������(���.���.)</td>
                                                <td class="lined">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            
                            <tr><td align="center">� ��� ����� �� ��������:</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td align="left">�������,</td></tr>
                            <tr><td align="left">������&nbsp;(�����)</td></tr>
                            <tr><td align="left">����������</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td align="left">�������,</td></tr>
                            <tr><td align="left">������&nbsp;(�����)</td></tr>
                            <tr><td align="left">������������</td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="page-separator"></div>
    <div class="page-break"></div>

    <table class="waybill-page second" cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="height:100%">
                    <td class="ticket" style="width:59mm;">&nbsp;</td>
                    <td class="ticket-separator">&nbsp;</td>
                    <td class="waybill">
                        <table cellpadding="0" cellspacing="0" style="height:100%">
                            <tbody>                                
                                <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0" style="height:100%;">
                                            <tbody>
                                                <tr style="height:100%">
                                                    <td class="ticket">
                    <table cellspacing="0" cellpadding="0" style="height:100%;">
                        <tbody>
                            <tr><td class="sub-header">�������</td></tr>
                            <tr><td class="sub-header">� �������� ����� � <span class="dataText"><%Response.Write(WaybillNumber()); %></span></td></tr>
                            <tr><td class="sub-header">�� <span class="dataText"><%Response.Write(DepartureDate("dd MMMM yyyy")); %></span>�.</td></tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="pre-lined">������������</td>
                                                <td class="lined">���&quot;������&quot;&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td class="subscript">&nbsp;</td>
                                                <td class="subscript">������������ �����������</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="pre-lined">�����������</td>
                                                <td class="lined">&nbsp;<span style="font-size:7pt;" class="dataText"><%Response.Write(VehicleModel()); %></span></td>
                                            </tr>
                                            <tr>
                                                <td class="subscript">&nbsp;</td>
                                                <td class="subscript">������������,�����</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr><td class="lined">&nbsp;<span class="dataText"><%Response.Write(VehicleRegistrationNumber()); %></span></td></tr>                            
                            <tr><td class="subscript">��������������� �����</td></tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td rowspan="2" class="pre-lined" style="vertical-align:top;">��������&nbsp;</td>
                                                <td class="lined"><span style="font-size:5pt;" class="dataText"><% Response.Write(DriverFio(1));%><br/><% Response.Write(DriverFio(2));%></span></td>
                                            </tr>
                                            <tr>                                                
                                                <td class="subscript">������� ��������</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td rowspan="2" class="pre-lined" style="vertical-align:top;">���������&nbsp;</td>
                                                <td class="lined">&nbsp;<%Response.Write(CustomerName()); %></td>
                                            </tr>
                                            <tr>                                                
                                                <td class="subscript">������������ �����������</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr><td class="lined">&nbsp;</td></tr>                            
                            <tr><td class="subscript">���������, �������, ��������</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="pre-lined" style="vertical-align:top;">�����&nbsp;�&nbsp;������(���.���.)</td>
                                                <td class="lined">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            
                            <tr><td align="center">� ��� ����� �� ��������:</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td class="lined">&nbsp;</td></tr>
                            <tr><td align="left">�������,</td></tr>
                            <tr><td align="left">������&nbsp;(�����)</td></tr>
                            <tr><td align="left">����������</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td align="left">�������,</td></tr>
                            <tr><td align="left">������&nbsp;(�����)</td></tr>
                            <tr><td align="left">������������</td></tr>
                        </tbody>
                    </table>
                </td>
                                                    <td>
                                                        <table class="result" cellpadding="0" cellspacing="0" style="height:100%;">
                                                             <tbody>
                                                                <tr>
                                                                     <td>
                                                                         <table class="data" cellpadding="0" cellspacing="0">
                                                                             <tbody>
                                                                                <tr class="header rectangle">
                                                                                    <td>����</td>
                                                                                    <td>������� ����������</td>
                                                                                    <td>������</td>
                                                                                    <td style="width:25mm;">������� ����������</td>                                                                                    
                                                                                </tr>                                                                               
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>                                                                                    
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>                                                                                    
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>                                                                                    
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>                                                                                    
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>                                                                                    
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>                                                                                    
                                                                                </tr>
                                                                             </tbody>
                                                                         </table>
                                                                     </td>
                                                                </tr>
                                                                <tr><td style="font-size:11pt; font-weight:bold;" align="center">��������� 
                                                                    ����������� �� ��������� ���� ����� ��������.<br/>������ ��������. ������������ 
                                                                    �� ���������� ������������ �����.</td></tr>
                                                                 <tr>
                                                                    <td>
                                                                        <table class="data" cellpadding="0" cellspacing="0">
                                                                            <tbody>
                                                                                <tr class="header rectangle">
                                                                                    <td style="width:12mm">����</td>
                                                                                    <td style="width:31mm">������</td>
                                                                                    <td>��������� ������������</td>
                                                                                    <td style="width:12mm">���,���</td>
                                                                                    <td style="width:50mm">���������, �������, ��������, ����� �������������</td>
                                                                                    <td style="width:20mm">�������</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table class="data result" cellpadding="0" cellspacing="0">
                                                                            <tbody>
                                                                                <tr class="header rectangle">
                                                                                    <td colspan="12"><b>���� ������ �����������</b></td>
                                                                                </tr>
                                                                                <tr class="header rectangle">
                                                                                    <td rowspan="2" style="width:12mm;">����</td>
                                                                                    <td rowspan="2" style="width:40mm;">������</td>
                                                                                    <td colspan="2">����� (���.-���.)</td>
                                                                                    <td rowspan="2" style="width:20mm;">����� � ������ (���.-���.)</td>
                                                                                    <td rowspan="2" style="width:20mm;">����������</td>
                                                                                    <td rowspan="2" style="width:20mm;">������� � ����� ����������</td>
                                                                                </tr>
                                                                                <tr class="header rectangle">
                                                                                    <td>������/ ��������</td>
                                                                                    <td>���������� �� �������</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>     
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>     
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>     
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>     
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>     
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>     
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>     
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>     
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table cellpadding="0" cellspacing="0" >
                                                                            <tr>
                                                                                <td>
                                                                                    <table cellpadding="0" cellspacing="0" >
                                                                                        <tr>
                                                                                            <td valign="top" class="pre-lined" rowspan="2"><b>������</b></td>
                                                                                            <td class="lined">&nbsp;</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="subscript">������� ����������</td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                                <td style="width:15mm;">&nbsp;</td>
                                                                                <td>
                                                                                    <table cellpadding="0" cellspacing="0" >
                                                                                        <tr>
                                                                                            <td  valign="top" class="pre-lined" rowspan="2"><b>��������</b></td>
                                                                                            <td class="lined">&nbsp;</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="subscript">������� ���������� �������</td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                             </tbody>
                                                         </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>   
</body>

</html>
