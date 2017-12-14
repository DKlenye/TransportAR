<%@ Page Language="C#" AutoEventWireup="true" Inherits="Transport.Web.WaybillTpl" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251"/>
    <title></title>

<link href="WaybillTemplate.css" rel="stylesheet" type="text/css"/> 
<!--[if IE]>
	<link rel="stylesheet" type="text/css" href="WaybillTemplate_IE.css" />
<![endif]-->
<style type="text/css">

.result
{
     font-size:10pt;
}

.box
{
    border: 1px solid black;
    width:40mm;
}

.second
{
    padding:0mm 10mm 0mm 10mm;
}
.second td
{
    height:7mm;
}
.first td
{
    height:7mm;
}
.form-head{
        font-size: 7pt;
        text-align:right;
        vertical-align:middle;
        line-height: 1.1;
    }
.form-head td
{
    height:1mm;
    text-align:right;
}
.waybill-page{
		padding: 0mm 2mm 0mm 2mm;
	}
	.dataText
        {
            font-weight:bold;
        }

</style>
</head>

<body>
    <table class="waybill-page first" cellpadding="0" cellspacing="0" style="height:100%; text-align:center; font-size:11pt;">
        <tbody>
            <tr>
                <td>
                    <table cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                        
                            <td style="width:70mm">
									<%Response.Write(Stamp()); %>
								</td>
								<td>
								    <table cellpadding="0" cellspacing="0">
								        <tbody>
								            <tr><td style="line-height: 1.1; text-align:center; font-family: Tahoma; font-size:12pt;"><b>������� ���� � <span class="dataText"><%Response.Write(WaybillNumber()); %></span></b></td></tr>
                                            <tr><td><b>���������� (������������) ����������</b></td></tr>
                                            <tr>
                                                <td align="center"><b>
                                                    <table  cellpadding="0" cellspacing="0" style="width:50mm;">
																		<tbody>	
																			<tr>
																				<td class="pre-lined">��&nbsp;"</td>
																				<td class="lined" style="width:7mm">&nbsp;<span><%Response.Write(DepartureDate("dd")); %></span></td>
																				<td class="pre-lined">"&nbsp;</td>
																				<td class="lined" style="width:25mm">&nbsp;<span><%Response.Write(DepartureDate("MMMM")); %></span></td>
																				<td class="pre-lined"></td>
																				<td class="lined" style="width:15mm">&nbsp;<span><%Response.Write(DepartureDate("yyyy")); %></span></td>
																				<td class="pre-lined"> �.</td>
																			</tr>
																		</tbody>
																	</table>
                                                    
                                                </b></td>
                                            </tr> 
								        </tbody>
								    </table>
								</td>
								<td style="padding-right:10mm; font-size:11pt;">
								    <span class="dataText"><%Response.Write(WaybillCode()); %></span>
								</td>
                             <td style="width:60mm">
                                                    <%Response.Write(Approved("3")); %>
                                                </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
            </tr>
            <tr><td>&nbsp;</td></tr>                   
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td style="width:30mm;">&nbsp;</td>
                            <td style="border-top:1px solid black;">
                                <table cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                        <tr>
                                            
                                            <td class="pre-lined">�����&nbsp;����������</td>
                                            <td class="lined">&nbsp;<span class="dataText"><%Response.Write(VehicleModel()); %></span></td>
                                            <td class="pre-lined">���</td>
                                            <td style="width:22mm;" class="rectangle"></td>
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
                                            
                                            <td class="pre-lined">���������������&nbsp;�</td>
                                            <td class="lined">&nbsp;<span class="dataText"><%Response.Write(VehicleRegistrationNumber()); %></span></td>
                                            <td class="pre-lined">��������&nbsp;�</td>
                                            <td style="width:22mm;" class="rectangle"><span class="dataText"><%Response.Write(VehicleGarageNumber()); %></span></td>
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
                                            
                                            <td class="pre-lined">��������</td>
                                            <td colspan="3" class="lined">&nbsp;<span class="dataText"><%Response.Write(DriverFio(1)); %></span><br/><span class="dataText"><%Response.Write(DriverFio(2)); %></span></td>
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
                                            
                                            <td class="pre-lined">&nbsp;</td>
                                            <td colspan="3" class="subscript">�.,�.,�.</td>
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
                                            
                                            <td class="pre-lined">�����.&nbsp;�������.&nbsp;�</td>
                                            <td class="lined">&nbsp;<span class="dataText"><%Response.Write(DriverLicence(1)); %></span><br/><span class="dataText"><%Response.Write(DriverLicence(2)); %></span></td>
                                            <td class="pre-lined">���������&nbsp;�</td>
                                            <td style="width:22mm;" class="rectangle"><span class="dataText"><%Response.Write(DriverTab(1)); %></span><br/><span class="dataText"><%Response.Write(DriverTab(2)); %></span></td>
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
                                            
                                            <td colspan="4"><b>������� ��������</b></td>
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
                                            
                                            <td class="pre-lined">��������&nbsp;1</td>
                                            <td class="lined">&nbsp;<span class="dataText"><%Response.Write(CustomerNames()); %></span></td>
                                            <td class="pre-lined">���</td>
                                            <td style="width:22mm;" class="rectangle"></td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td class="subscript" style="height:1mm;">������������ �����������</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                        <tr>                                            
                                            <td class="pre-lined">��������&nbsp;2</td>
                                            <td class="lined">&nbsp;</td>
                                            <td class="pre-lined">���</td>
                                            <td style="width:22mm;" class="rectangle"></td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td class="subscript" style="height:1mm;">������������ �����������</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                        <tr>                                            
                                            <td class="pre-lined">�����&nbsp;������&nbsp;1</td>
                                            <td colspan="3" class="lined">&nbsp;</td>
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
                                            <td class="pre-lined"><span style="visibility:hidden;">�����&nbsp;������&nbsp;</span>2</td>
                                            <td colspan="3" class="lined">&nbsp;</td>
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
                                            
                                            <td class="pre-lined">&nbsp;</td>
                                            <td colspan="3" class="subscript">&nbsp;</td>
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
                                            
                                            <td class="pre-lined">�����&nbsp;������,&nbsp;���.,&nbsp;���.</td>
                                            <td colspan="2" class="lined">&nbsp;</td>
                                            <td style="width:22mm;" class="rectangle"><span class="dataText"><%Response.Write(DepartureDate("HH:mm")); %></span></td>
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
                                            
                                            <td class="pre-lined"><b>���������</b></td>
                                            <td colspan="3" class="lined">&nbsp;</td>
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
                                            
                                            <td class="pre-lined">�����&nbsp;�����������,&nbsp;���.,&nbsp;���.</td>
                                            <td colspan="2" class="lined">&nbsp;</td>
                                            <td style="width:22mm;" class="rectangle"><span class="dataText"><%Response.Write(ReturnDate("HH:mm")); %></span></td>
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
                                            
                                            <td class="pre-lined"><b>���������</b></td>
                                            <td colspan="3" class="lined">&nbsp;</td>
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
                                            
                                            <td colspan="4" class="lined">&nbsp;</td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="subscript" style="height:1mm;">���������, ������� � ���� � ������ �������</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                        <tr>
                                            
                                            <td colspan="4" class="lined">&nbsp;</td>
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
                                            
                                            <td colspan="4" class="lined">&nbsp;</td>
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
                                            
                                            <td style="width:35mm">&nbsp;</td>
                                            <td class="pre-lined">����������&nbsp;����</td>
                                            <td colspan="2">&nbsp;</td>
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
                                            
                                            <td style="width:35mm">�.�.</td>
                                            <td class="pre-lined"><b>��������</b></td>
                                            <td colspan="2" class="lined">&nbsp;</td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            <td style="width:1mm; border-right:1px solid black;">&nbsp;</td>
                            <td style="padding-left:1mm; border-top: 1px solid black;">
                            <table cellpadding="0" cellspacing="0">
                            <tbody>                                
                                <tr>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                    <tbody>                                    
                                    <tr>
                                        <td class="pre-lined" style="text-align:left;">����������&nbsp;����������&nbsp;��������<br/>���������&nbsp;����������,&nbsp;��</td>
                                        <td class="lined">&nbsp;</td>
                                        <td  style="width:35mm;"class="rectangle">&nbsp;<span class="dataText"><%Response.Write(DepartureKm()); %></span></td>
                                        
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
                                        <td class="pre-lined" style="text-align:left;">�����&nbsp;��������.&nbsp;<b>�������</b></td>
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
                                        <td class="pre-lined" style="text-align:left;">����������&nbsp;�&nbsp;����������&nbsp;���������&nbsp;���������&nbsp;������.</td>
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
                                        <td class="pre-lined" style="text-align:left;"><b>��������</b></td>
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
                                        <td><b>�������� ��������-���������� �����������</b></td>
                                        
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
                                        <td>
                                            <table class="data">
                                            <tbody>
                                            <tr class="rectangle">
                                                <td>� ������������ �����<br/>(� ���� ���)</td>
                                                <td>����� ���</td>
                                                <td>���<br/>����� ���</td>
                                                <td>����������, �</td>
                                            </tr>
                                           <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                           <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                           <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            </tbody>
                                        </table>
                                        </td>
                                        
                                    </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr> 
                                <tr><td><b>������� �������</td></tr>                                
                                <tr>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                        <td style="width:15mm;">&nbsp</td>
                                        <td class="pre-lined" style="text-align:left;">���&nbsp;������,&nbsp;�</td>
                                        <td class="lined">&nbsp;</td>
                                        <td  style="width:35mm;"class="rectangle">&nbsp;<span class="dataText"><%Response.Write(FuelRemains()); %></span></td>
                                        
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
                                        <td style="width:15mm;">&nbsp</td>
                                        <td class="pre-lined" style="text-align:left;">���&nbsp;�����������,&nbsp;�</td>
                                        <td class="lined">&nbsp;</td>
                                        <td  style="width:35mm;"class="rectangle">&nbsp;</td>
                                        
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
                                        <td><b>������ �������</b></td>
                                        
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
                                        <td style="width:15mm;">&nbsp</td>
                                        <td class="pre-lined" style="text-align:left;">��&nbsp;�����,&nbsp;�</td>
                                        <td class="lined">&nbsp;</td>
                                        <td  style="width:35mm;"class="rectangle">&nbsp;</td>
                                        
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
                                        <td style="width:15mm;">&nbsp</td>
                                        <td class="pre-lined" style="text-align:left;">����������,&nbsp;�</td>
                                        <td class="lined">&nbsp;</td>
                                        <td  style="width:35mm;"class="rectangle">&nbsp;</td>
                                        
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
                                        <td class="pre-lined" style="text-align:left;">��������,&nbsp;�</td>
                                        <td class="lined">&nbsp;</td>
                                        <td  style="width:35mm;"class="rectangle">&nbsp;</td>
                                        
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
                                        <td class="pre-lined" style="text-align:left;">����������,&nbsp;�</td>
                                        <td class="lined">&nbsp;</td>
                                        <td  style="width:35mm;"class="rectangle">&nbsp;</td>
                                        
                                    </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                                <tr><td>&nbsp;</td></tr>
                                 <tr>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                        <td class="pre-lined" style="text-align:left;">����������&nbsp;������.&nbsp;���������<br/>����������&nbsp;���&nbsp;�����������,&nbsp;��</td>
                                        <td class="lined">&nbsp;</td>
                                        <td  style="width:35mm;"class="rectangle">&nbsp;</td>
                                        
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
                                        <td class="pre-lined"><b>�������</b></td>
                                        <td class="lined">&nbsp;</td>
                                        
                                    </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                            </td>
                            <td style="width:30mm;">&nbsp;</td>
                        </tr>
                    </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="page-separator"></div>
    <div class="page-break"></div>

    <table class="waybill-page second" cellpadding="0" cellspacing="0" style="height:100%">
            <tbody>
                <tr>
                    <td>
                        <table class="data">
                            <tbody>
                                <tr class="rectangle">
                                    <td colspan="11"><b>���������� �������</b></td>
                                </tr>
                                <tr class="rectangle">
                                    <td rowspan="2" style="width:15mm">����� �����</td>
                                    <td colspan="2">��������</td>
                                    <td colspan="2">������� ��������</td>
                                    <td colspan="4">�����, ���., ���.</td>
                                    <td rowspan="2" style="width:20mm">������, ��</td>
                                    <td rowspan="2" style="width:25mm">������� ���������</td>
                                </tr>
                                <tr class="rectangle">
                                    <td>������������</td>
                                    <td style="width:15mm">���</td>
                                    <td>������</td>
                                    <td>����</td>
                                    <td colspan="2">������</td>
                                    <td colspan="2">��������</td>
                                </tr>
                                
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td style="width:13mm">&nbsp;</td><td style="width:13mm">&nbsp;</td><td style="width:13mm">&nbsp;</td><td style="width:13mm">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr class="result">
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td style="width:50%">
                                        <table cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td style="text-align:center" colspan="4">
                                                        <b>���������� ������ ���������� �� �����</b>
                                                    </td> 
                                                </tr>
                                                <tr><td colspan="4">&nbsp;</td></tr>
                                                <tr>
                                                    <td style="width:10mm">&nbsp;</td>
                                                    <td style="width:50mm">����� � ������, ���</td>
                                                    <td class="box">&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="width:10mm">&nbsp;</td>
                                                    <td>��������, ��</td>
                                                    <td class="box">&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>                                               
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td style="text-align:center">
                                                        <b>��� ��������</b>
                                                    </td>
                                                </tr>
                                                <tr><td class="lined">&nbsp;</td></tr>
                                                <tr><td class="lined">&nbsp;</td></tr>
                                                <tr><td class="lined">&nbsp;</td></tr> 
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
</body>
</html>