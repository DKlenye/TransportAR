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
									<div style="border: 2px solid #88A1C0; text-align: center; font: normal 11px Times New Roman;z-index:10000; width:150pt;" >
Открытое акционерное общество <br/>
"НАФТАН"<br/>
Республика Беларусь,Витебская обл.<br/>
211440,г.Новополоцк<br/>
тел. 59-83-09
</div>
								</td>
								<td>
								    <table cellpadding="0" cellspacing="0">
								        <tbody>
								            <tr><td style="line-height: 1.1; text-align:center; font-family: Tahoma; font-size:12pt;"><b>Путевой лист № <span class="dataText"><%Response.Write(WaybillNumber()); %></span></b></td></tr>
                                            <tr><td><b>служебного (специального) автомобиля</b></td></tr>
                                            <tr>
                                                <td align="center"><b>
                                                    <table  cellpadding="0" cellspacing="0" style="width:50mm;">
																		<tbody>	
																			<tr>
																				<td class="pre-lined">за&nbsp;"</td>
																				<td class="lined" style="width:7mm">&nbsp;<span><%Response.Write(DepartureDate("dd")); %></span></td>
																				<td class="pre-lined">"&nbsp;</td>
																				<td class="lined" style="width:25mm">&nbsp;<span><%Response.Write(DepartureDate("MMMM")); %></span></td>
																				<td class="pre-lined"></td>
																				<td class="lined" style="width:15mm">&nbsp;<span><%Response.Write(DepartureDate("yyyy")); %></span></td>
																				<td class="pre-lined"> г.</td>
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
                                                    <table class="form-head" cellpadding="0" cellspacing="0">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Приложение 3
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    К инструкции о порядке оформления
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    транспортных документов
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align:left;">
                                                                    УТВЕРЖДЕНО
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align:left;">
                                                                    Приказ генерального директора от 08.02.2012 № 213
                                                                </td>
                                                            </tr>
                                                             <tr>
                                                                <td style="height:1mm">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
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
                                            
                                            <td class="pre-lined">Марка&nbsp;автомобиля</td>
                                            <td class="lined">&nbsp;<span class="dataText"><%Response.Write(VehicleModel()); %></span></td>
                                            <td class="pre-lined">код</td>
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
                                            
                                            <td class="pre-lined">Государственный&nbsp;№</td>
                                            <td class="lined">&nbsp;<span class="dataText"><%Response.Write(VehicleRegistrationNumber()); %></span></td>
                                            <td class="pre-lined">Гаражный&nbsp;№</td>
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
                                            
                                            <td class="pre-lined">Водитель</td>
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
                                            <td colspan="3" class="subscript">ф.,и.,о.</td>
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
                                            
                                            <td class="pre-lined">Водит.&nbsp;удостов.&nbsp;№</td>
                                            <td class="lined">&nbsp;<span class="dataText"><%Response.Write(DriverLicence(1)); %></span><br/><span class="dataText"><%Response.Write(DriverLicence(2)); %></span></td>
                                            <td class="pre-lined">Табельный&nbsp;№</td>
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
                                            
                                            <td colspan="4"><b>Задание водителю</b></td>
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
                                            
                                            <td class="pre-lined">Заказчик&nbsp;1</td>
                                            <td class="lined">&nbsp;<span class="dataText"><%Response.Write(CustomerName()); %></span></td>
                                            <td class="pre-lined">код</td>
                                            <td style="width:22mm;" class="rectangle"></td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td class="subscript" style="height:1mm;">наименование организации</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                        <tr>                                            
                                            <td class="pre-lined">Заказчик&nbsp;2</td>
                                            <td class="lined">&nbsp;</td>
                                            <td class="pre-lined">код</td>
                                            <td style="width:22mm;" class="rectangle"></td>
                                        </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td class="subscript" style="height:1mm;">наименование организации</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                        <tr>                                            
                                            <td class="pre-lined">Адрес&nbsp;подачи&nbsp;1</td>
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
                                            <td class="pre-lined"><span style="visibility:hidden;">Адрес&nbsp;подачи&nbsp;</span>2</td>
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
                                            
                                            <td class="pre-lined">Время&nbsp;выезда,&nbsp;час.,&nbsp;мин.</td>
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
                                            
                                            <td class="pre-lined"><b>Диспетчер</b></td>
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
                                            
                                            <td class="pre-lined">Время&nbsp;возвращения,&nbsp;час.,&nbsp;мин.</td>
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
                                            
                                            <td class="pre-lined"><b>Диспетчер</b></td>
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
                                        <td colspan="4" class="subscript" style="height:1mm;">Опоздания, простои в пути и прочие отметки</td>
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
                                            <td class="pre-lined">Автомобиль&nbsp;сдал</td>
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
                                            
                                            <td style="width:35mm">М.П.</td>
                                            <td class="pre-lined"><b>Водитель</b></td>
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
                                        <td class="pre-lined" style="text-align:left;">Автомобиль&nbsp;технически&nbsp;исправен<br/>Показания&nbsp;спидометра,&nbsp;км</td>
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
                                        <td class="pre-lined" style="text-align:left;">Выезд&nbsp;разрешаю.&nbsp;<b>Механик</b></td>
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
                                        <td class="pre-lined" style="text-align:left;">Автомобиль&nbsp;в&nbsp;технически&nbsp;исправном&nbsp;состоянии&nbsp;принял.</td>
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
                                        <td class="pre-lined" style="text-align:left;"><b>Водитель</b></td>
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
                                        <td><b>Заправка топливно-смазочными материалами</b></td>
                                        
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
                                                <td>№ заправочного листа<br/>(№ чека АЗС)</td>
                                                <td>Марка ТСМ</td>
                                                <td>Код<br/>марки ТСМ</td>
                                                <td>Количество, л</td>
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
                                <tr><td><b>Остаток топлива</td></tr>                                
                                <tr>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                        <td style="width:15mm;">&nbsp</td>
                                        <td class="pre-lined" style="text-align:left;">при&nbsp;выезде,&nbsp;л</td>
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
                                        <td class="pre-lined" style="text-align:left;">при&nbsp;возвращении,&nbsp;л</td>
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
                                        <td><b>Расход топлива</b></td>
                                        
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
                                        <td class="pre-lined" style="text-align:left;">по&nbsp;норме,&nbsp;л</td>
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
                                        <td class="pre-lined" style="text-align:left;">фактически,&nbsp;л</td>
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
                                        <td class="pre-lined" style="text-align:left;">экономия,&nbsp;л</td>
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
                                        <td class="pre-lined" style="text-align:left;">перерасход,&nbsp;л</td>
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
                                        <td class="pre-lined" style="text-align:left;">Автомобиль&nbsp;принял.&nbsp;Показания<br/>спидометра&nbsp;при&nbsp;возвращении,&nbsp;км</td>
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
                                        <td class="pre-lined"><b>Механик</b></td>
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
                                    <td colspan="11"><b>Выполнение задания</b></td>
                                </tr>
                                <tr class="rectangle">
                                    <td rowspan="2" style="width:15mm">Номер ездки</td>
                                    <td colspan="2">Заказчик</td>
                                    <td colspan="2">Маршрут движения</td>
                                    <td colspan="4">Время, час., мин.</td>
                                    <td rowspan="2" style="width:20mm">Пробег, км</td>
                                    <td rowspan="2" style="width:25mm">Подпись заказчика</td>
                                </tr>
                                <tr class="rectangle">
                                    <td>наименование</td>
                                    <td style="width:15mm">код</td>
                                    <td>откуда</td>
                                    <td>куда</td>
                                    <td colspan="2">выезда</td>
                                    <td colspan="2">прибытия</td>
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
                                                        <b>Результаты работы автомобиля за смену</b>
                                                    </td> 
                                                </tr>
                                                <tr><td colspan="4">&nbsp;</td></tr>
                                                <tr>
                                                    <td style="width:10mm">&nbsp;</td>
                                                    <td style="width:50mm">Всего в наряде, час</td>
                                                    <td class="box">&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="width:10mm">&nbsp;</td>
                                                    <td>Пройдено, км</td>
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
                                                        <b>Для расчетов</b>
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