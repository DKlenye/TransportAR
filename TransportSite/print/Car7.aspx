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

	 .waybill-page{
        font-size:10pt;
	}

	.data .subtable{
		border-width:0pt;
	}
	.data .subtable td{
		border-width:0pt;
	}

     .data .subtable .lined{
         border-bottom:1pt solid black;
     }

	td.lined{
		border-bottom: 1pt solid silver;		
	}
	
	td.pre-lined{
		text-align:left;
	}
	.form-head{
        font-size: 7pt;
        text-align:right;
        vertical-align:middle;
        line-height: 1.1;
    }
	.cell{
		width:25mm;
		border:1px solid black;
	}
	.waybill-page{
		padding: 0mm 2mm 0mm 2mm;
	}
	.work td{
		height:5.5mm;
	}
	
	.task td
	{
	    height:7mm;
	}
	
	.data .total td
	{
	    border-bottom: 1px solid black;
	}

    .dataText
        {
            font-weight:bold;
        }

</style>

</head>
<body>
    <table class="waybill-page first" cellpadding="0" cellspacing="0" style="height:1mm;" >
				<tbody>
				<tr>
                                <td style="border-width:0pt">
                                    <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
												<td>
													&nbsp;
												</td>
								                <td style="width:40mm; font-size:12pt;"><span><%Response.Write(WaybillCode()); %></span></td>
                                                <td style="width:50mm">
                                                    <table class="form-head" cellpadding="0" cellspacing="0" style="text-align:left">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    ���������� 1
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    � �������������
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    ������������ ����������
                                                                </td>
                                                            </tr>       
                                                            <tr>
                                                                <td>
                                                                    � ������������
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    ���������� ��������
                                                                </td>
                                                            </tr>                      
                                                            <tr>
                                                                <td>
                                                                    29.03.2012 �25
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
			<tr>
                <td>
					<table class="work" cellpadding="0" cellspacing="0">
						<tbody>
                            <tr>
								<td style="width:70mm; text-align:center;" align="center" >
<%Response.Write(Stamp()); %>
<table cellpadding="0" cellspacing="0">
    <tbody>
        <tr><td class="lined">&nbsp;</td></tr>
        <tr><td class="subscript">(������������ �����������(�����,������))</td></tr>
    </tbody>
</table>
								</td>
								
								<td>
								    <table  cellpadding="0" cellspacing="0">
														<tbody>
															<tr><td colspan="3" style="line-height: 1.1; text-align:center; font-family: Tahoma; font-size:11pt;"><b>������� ���� ��������� ���������� � <span><%Response.Write(WaybillNumber()); %></span></b></td></tr>
															<tr>
																<td>&nbsp;</td>
																<td style="width:80mm;">
																	<table  cellpadding="0" cellspacing="0">
																		<tbody>	
																			<tr style="font-size:10pt; font-weight:bold;">
																				<td class="pre-lined">��&nbsp;������&nbsp;c&nbsp;</td>
																				<td class="lined" style="width:7mm">&nbsp;<span><%Response.Write(DepartureDate("dd")); %></span></td>
																				<td class="pre-lined">&nbsp;&nbsp;��&nbsp;&nbsp;</td>
																				<td class="lined" style="width:7mm">&nbsp;<span><%Response.Write(ReturnDate("dd")); %></span></td>
																				<td class="pre-lined">&nbsp;&nbsp;</td>
																				<td class="lined" style="width:25mm">&nbsp;<span><%Response.Write(ReturnDate("MMMM")); %></span></td>
																				<td class="pre-lined"></td>
																				<td class="lined" style="width:15mm">&nbsp;<span><%Response.Write(ReturnDate("yyyy")); %></span></td>
																				<td class="pre-lined"> �.</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td>&nbsp;</td>
															</tr>
														
														    <tr>
																<td>&nbsp;</td>
																<td style="width:100mm;">
																	<table  cellpadding="0" cellspacing="0">
																		<tbody>	
																		    <tr><td colspan="2">&nbsp;</td></tr>
																			<tr style="font-size:10pt; font-weight:bold;">
																				<td class="pre-lined">����������</td>
																				<td class="lined" ><span class="dataText" style="font-size:15pt;"><i><%Response.Write(VehicleGarageNumber()); %></i></span>&nbsp;&nbsp;&nbsp;<span class="dataText"><%Response.Write(VehicleModel()); %></span>&nbsp;<span class="dataText"><%Response.Write(VehicleRegistrationNumber()); %></span></td>
																			</tr>
																			<tr>
																				<td>&nbsp;</td>
																				<td class="subscript" >(�����,��������������� ����)</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td>&nbsp;</td>
															</tr>
															
															<tr>
																<td>&nbsp;</td>
																<td style="width:100mm;">
																	<table  cellpadding="0" cellspacing="0">
																		<tbody>	
																			<tr style="font-size:10pt; font-weight:bold;">
																				<td class="pre-lined">��������</td>
																				<td class="lined" >
																				    <span class="dataText" style="font-size:7pt;"><%Response.Write(DriverFio(1)); %>&nbsp;&nbsp;<%Response.Write(DriverTab(1)); %><br/>
																				    <%Response.Write(DriverFio(2)); %>&nbsp;&nbsp;<%Response.Write(DriverTab(2)); %></span>&nbsp;
																			    </td>
																			</tr>
																			<tr>
																				<td>&nbsp;</td>
																				<td class="subscript" >(�������,��������)</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td>&nbsp;</td>
															</tr>
														    
														
														</tbody>
													</table>
								</td>
								<td style="width:90mm; vertical-align:bottom;">
									<table  cellpadding="0" cellspacing="0">
																		<tbody>	
																			<tr style="font-size:10pt; font-weight:bold;">
																				<td class="pre-lined">������������&nbsp;�������������</td>
																				<td class="lined" ><span class="dataText" style="font-size:7pt;"><%Response.Write(DriverLicence(1)); %><br/><%Response.Write(DriverLicence(2)); %> </span>&nbsp;</td>
																				<td style="width:15mm;">&nbsp;</td>
																			</tr>
																			<tr>
																				<td colspan="3">&nbsp;</td>
																			</tr>
																		</tbody>
																	</table>
								</td>
                            </tr>
						</tbody>
					</table>
				</td>
			</tr>
			
			<tr>
                <td>
					<table class="data work" cellpadding="0" cellspacing="0">
						<tr class="rectangle">
							<td rowspan="3">�����</td>
							<td colspan="3">�����, ���., ���.</td>
						    <td colspan="2">���������<br/>����������</td>
							<td rowspan="3">������,<br/>��</td>
							<td colspan="4">�������� �������</td>
							<td colspan="3">������ �������, �</td>
							<td colspan="2" style="font-size:7pt;">���������� ���������� ��������</td>
							<td colspan="2" style="font-size:7pt;">��� ����������� ����������</td>
							<td rowspan="3" style="font-size:7pt;">�������� ��<br/>���������<br/>��������<br/>� ����������<br/>�������<br/>(�������(�����)<br/>��������-<br/>�������<br/>����)</td>
							<td rowspan="3" style="font-size:7pt;">�������<br/>(�����)<br/>��������������<br/>���� ��<br/>����������<br/>��������<br/>�����</td>
						</tr>
						<tr class="rectangle">
							<td rowspan="2">��-<br/>����</td>
							<td rowspan="2">������-<br/>�����</td>
							<td rowspan="2">� ������</td>
						    <td rowspan="2">���<br/>������</td>
							<td rowspan="2">��� ������-<br/>�����</td>
							<td colspan="2">������� �������,�</td>
							<td colspan="2">���������� �������</td>
							<td rowspan="2">�� �����</td>
							<td rowspan="2">�����-<br/>�����</td>
							<td rowspan="2">�����-<br/>���(+),<br/>�������-<br/>���(-)</td>
							<td rowspan="2" style="font-size:7pt;">�����<br/>��������<br/>(�������<br/>(�����) ������-<br/>��������� ����)</td>
							<td rowspan="2" style="font-size:7pt;">������<br/>(�������<br/>��������)</td>
							<td rowspan="2" style="font-size:7pt;">����<br/>(�������<br/>��������)</td>
							<td rowspan="2" style="font-size:7pt;">������<br/>(�������<br/>(�����) ������-<br/>��������� ����)</td>
						</tr>
						<tr class="rectangle">
							<td>��� ������</td>
							<td>��� ������-<br/>�����</td>
							<td>����-<br/>������, �</td>
							<td style="font-size:7pt;">�������(�����) ������-<br/>��������� ����<br/>(���� � � ���� ���)</td>
						</tr>
						<tr class="rectangle">							
							<td style="width:10mm">1</td>
							<td style="width:10mm">2</td>
							<td style="width:10mm">3</td>
							<td>4</td>
							<td style="width:18mm">5</td>
							<td style="width:18mm">6</td>
							<td>7</td>
							<td style="width:16mm;font-size:7pt;">8</td>
							<td style="width:16mm;">9</td>
							<td>10</td>
							<td style="width:20">11</td>
							<td style="width:13mm;">12</td>
							<td style="width:13mm;">13</td>
							<td>14</td>
							<td style="width:12mm;">15</td>
							<td style="width:12mm;">16</td>
							<td style="width:12mm;">17</td>
							<td style="width:12mm;">18</td>
							<td>19</td>
							<td>20</td>
						</tr>
						<tr>							
							<td><span><%Response.Write(DepartureDate("dd.MM")); %></span></td><td>&nbsp;<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;<span class="dataText"><%Response.Write(DepartureKm()); %></span></td><td>&nbsp;</td><td>&nbsp;</td><td style="font-size:7pt;">&nbsp;<span class="dataText"><%Response.Write(AllFuelRemains(true)); %></span></td><td>&nbsp;</td><td>&nbsp;</td><td style="font-size:7pt;">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>						
						<tr>							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr>							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr>							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr>							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr>							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr>							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr>							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr>							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr class="total">							
							<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
						</tr>
						<tr class="header rectangle">							
							<td colspan="3">
								����� �� ������<br/>
                                c&nbsp;
                                <u>&nbsp;&nbsp;<%Response.Write(DepartureDate("dd.MM")); %>&nbsp;&nbsp;</u>
                                &nbsp;��&nbsp;
                                <u>&nbsp;&nbsp;<%Response.Write(ReturnDate("dd.MM"));%>&nbsp;&nbsp;</u>
                                &nbsp;20<u>&nbsp;<%Response.Write(DepartureDate("yy")); %>&nbsp;</u>�.
							</td>
							<td>&nbsp;</td><td>X</td><td>X</td><td>&nbsp;</td><td>X</td><td>X</td><td>&nbsp;</td><td>X</td><td>&nbsp;</td><td>
                            &nbsp;</td><td>&nbsp;</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td>						
					    </tr>
					</table>
                </td>				
            </tr>
			<tr>
                <td>
					<table class="work" cellpadding="0" cellspacing="0">
						<tbody>
							<tr>
								<td class="pre-lined">���&nbsp;��������</td>
								<td class="lined" style="text-align: left;">&nbsp;<% Response.Write(DstRoutPoint()); %></td>
							</tr>
						</tbody>
					</table>
                </td>				
            </tr>
			
        </tbody>
    </table>

    <div class="page-separator"></div>
    <div class="page-break"></div>

    <table class="waybill-page work" cellpadding="0" cellspacing="0" style="height:100%; border-collapse:collapse;">
            <tbody>
                <tr>
                    <td style="height:1mm;">
                        <table class="data task" cellpadding="0" cellspacing="0">
						    <tbody>
							    <tr class="rectangle">
								    <td colspan="12"><b>���������� �������</b></td>
                                </tr>
                                <tr class="rectangle">
                                    <td rowspan="2">����</td>
                                    <td colspan="2">������� ����������</td>
                                    <td rowspan="2">������,<br/>��</td>
                                    <td rowspan="2">������������ � ������� (�����, ������ ���������)</td>                                   
                                    <td rowspan="2">������ ��������</td>
                                </tr>
                                <tr class="rectangle">
                                    <td>������</td>
                                    <td>����</td>
                                </tr>
                                <tr class="rectangle">
                                    <td>21</td>
                                    <td style="width:40mm;">22</td>                                    
                                    <td style="width:40mm;">23</td>
                                    <td>24</td>
                                    <td>25</td>
                                    <td>26</td>                                   
                                </tr>
                                <tr>
                                    <td>&nbsp;<%Response.Write(DepartureDate("dd.MM"));%></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td style="text-align: left">&nbsp;<% Response.Write(CustomerNames());%></td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                </tr>                                
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
</body>
</html>