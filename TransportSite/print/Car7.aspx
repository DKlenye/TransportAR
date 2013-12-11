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
                                                                    Приложение 1
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    к постановлению
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Министерства транспорта
                                                                </td>
                                                            </tr>       
                                                            <tr>
                                                                <td>
                                                                    и коммуникаций
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Республики Беларусь
                                                                </td>
                                                            </tr>                      
                                                            <tr>
                                                                <td>
                                                                    29.03.2012 №25
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
<div style="border: 2px solid #88A1C0; text-align: center; font: normal 11px Times New Roman;z-index:10000; width:150pt;" >
Открытое акционерное общество <br/>
"НАФТАН"<br/>
Республика Беларусь,Витебская обл.<br/>
211440,г.Новополоцк<br/>
тел. <%Response.Write(Phone()); %>
</div>
<table cellpadding="0" cellspacing="0">
    <tbody>
        <tr><td class="lined">&nbsp;</td></tr>
        <tr><td class="subscript">(наименование перевозчика(штамп,печать))</td></tr>
    </tbody>
</table>
								</td>
								
								<td>
								    <table  cellpadding="0" cellspacing="0">
														<tbody>
															<tr><td colspan="3" style="line-height: 1.1; text-align:center; font-family: Tahoma; font-size:11pt;"><b>ПУТЕВОЙ ЛИСТ ЛЕГКОВОГО АВТОМОБИЛЯ № <span><%Response.Write(WaybillNumber()); %></span></b></td></tr>
															<tr>
																<td>&nbsp;</td>
																<td style="width:80mm;">
																	<table  cellpadding="0" cellspacing="0">
																		<tbody>	
																			<tr style="font-size:10pt; font-weight:bold;">
																				<td class="pre-lined">за&nbsp;период&nbsp;c&nbsp;</td>
																				<td class="lined" style="width:7mm">&nbsp;<span><%Response.Write(DepartureDate("dd")); %></span></td>
																				<td class="pre-lined">&nbsp;&nbsp;по&nbsp;&nbsp;</td>
																				<td class="lined" style="width:7mm">&nbsp;<span><%Response.Write(ReturnDate("dd")); %></span></td>
																				<td class="pre-lined">&nbsp;&nbsp;</td>
																				<td class="lined" style="width:25mm">&nbsp;<span><%Response.Write(ReturnDate("MMMM")); %></span></td>
																				<td class="pre-lined"></td>
																				<td class="lined" style="width:15mm">&nbsp;<span><%Response.Write(ReturnDate("yyyy")); %></span></td>
																				<td class="pre-lined"> г.</td>
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
																				<td class="pre-lined">Автомобиль</td>
																				<td class="lined" ><span class="dataText" style="font-size:15pt;"><i><%Response.Write(VehicleGarageNumber()); %></i></span>&nbsp;&nbsp;&nbsp;<span class="dataText"><%Response.Write(VehicleModel()); %></span>&nbsp;<span class="dataText"><%Response.Write(VehicleRegistrationNumber()); %></span></td>
																			</tr>
																			<tr>
																				<td>&nbsp;</td>
																				<td class="subscript" >(марка,регистрационный знак)</td>
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
																				<td class="pre-lined">Водитель</td>
																				<td class="lined" >
																				    <span class="dataText" style="font-size:7pt;"><%Response.Write(DriverFio(1)); %>&nbsp;&nbsp;<%Response.Write(DriverTab(1)); %><br/>
																				    <%Response.Write(DriverFio(2)); %>&nbsp;&nbsp;<%Response.Write(DriverTab(2)); %></span>&nbsp;
																			    </td>
																			</tr>
																			<tr>
																				<td>&nbsp;</td>
																				<td class="subscript" >(фамилия,инициалы)</td>
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
																				<td class="pre-lined">Водительское&nbsp;удостоверение</td>
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
							<td rowspan="3">Число</td>
							<td colspan="3">Время, час., мин.</td>
						    <td colspan="2">Показания<br/>спидометра</td>
							<td rowspan="3">Пробег,<br/>км</td>
							<td colspan="4">Движение топлива</td>
							<td colspan="3">Расход топлива, л</td>
							<td colspan="2" style="font-size:7pt;">Автомобиль технически исправен</td>
							<td colspan="2" style="font-size:7pt;">При возвращении автомобиль</td>
							<td rowspan="3" style="font-size:7pt;">Водитель по<br/>состоянию<br/>здоровья<br/>к управлению<br/>допущен<br/>(подпись(штамп)<br/>уполномо-<br/>ченного<br/>лица)</td>
							<td rowspan="3" style="font-size:7pt;">Подпись<br/>(штамп)<br/>ответственного<br/>лица за<br/>оформление<br/>путевого<br/>листа</td>
						</tr>
						<tr class="rectangle">
							<td rowspan="2">вы-<br/>езда</td>
							<td rowspan="2">возвра-<br/>щения</td>
							<td rowspan="2">в наряде</td>
						    <td rowspan="2">при<br/>выезде</td>
							<td rowspan="2">при возвра-<br/>щении</td>
							<td colspan="2">остаток топлива,л</td>
							<td colspan="2">заправлено топлива</td>
							<td rowspan="2">по норме</td>
							<td rowspan="2">факти-<br/>чески</td>
							<td rowspan="2">эконо-<br/>мия(+),<br/>перерас-<br/>ход(-)</td>
							<td rowspan="2" style="font-size:7pt;">выезд<br/>разрешен<br/>(подпись<br/>(штамп) уполно-<br/>моченного лица)</td>
							<td rowspan="2" style="font-size:7pt;">принял<br/>(подпись<br/>водителя)</td>
							<td rowspan="2" style="font-size:7pt;">сдал<br/>(подпись<br/>водителя)</td>
							<td rowspan="2" style="font-size:7pt;">принял<br/>(подпись<br/>(штамп) уполно-<br/>моченного лица)</td>
						</tr>
						<tr class="rectangle">
							<td>при выезде</td>
							<td>при возвра-<br/>щении</td>
							<td>коли-<br/>чество, л</td>
							<td style="font-size:7pt;">подпись(штамп) уполно-<br/>моченного лица<br/>(дата и № чека АЗС)</td>
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
							<td>&nbsp;</td><td>&nbsp;<span class="dataText"><%Response.Write(DepartureDate("HH:mm")); %></span></td><td>&nbsp;<span class="dataText"><%Response.Write(ReturnDate("HH:mm")); %></span></td><td>&nbsp;</td><td>&nbsp;<span class="dataText"><%Response.Write(DepartureKm()); %></span></td><td>&nbsp;</td><td>&nbsp;</td><td style="font-size:7pt;">&nbsp;<span class="dataText"><%Response.Write(AllFuelRemains(true)); %></span></td><td>&nbsp;</td><td style="font-size:7pt;">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
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
								Итого за период<br/>
                                c&nbsp;
                                <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
                                &nbsp;по&nbsp;
                                <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
                                &nbsp;20<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>г.
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
								<td class="pre-lined">Для&nbsp;расчетов</td>
								<td class="lined">&nbsp;</td>
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
								    <td colspan="12"><b>Выполнение задания</b></td>
                                </tr>
                                <tr class="rectangle">
                                    <td rowspan="2">Дата</td>
                                    <td colspan="2">Маршрут следования</td>
                                    <td rowspan="2">Пробег,<br/>км</td>
                                    <td rowspan="2">Наименование и подпись (штамп, печать заказчика)</td>                                   
                                    <td rowspan="2">Прочие сведения</td>
                                </tr>
                                <tr class="rectangle">
                                    <td>откуда</td>
                                    <td>куда</td>
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