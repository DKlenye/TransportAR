<%@ Page Language="C#" AutoEventWireup="true" Inherits="Transport.Web.WaybillTpl" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="chrome=1">
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
-->
<style type="text/css">

.form-head{
        font-size: 7pt;
        text-align:right;
        vertical-align:middle;
        line-height: 1.1;
    }
.height-table td
{
    height:4mm;
}
.task td
{
    height:4mm;
}
.data td{
    font-size:8pt;
}

    
    .style1
    {
        height: 66px;
    }
    .footer td
    {
        font-size:10pt;
        height:14pt
    }
    
</style>
</head>
<body>
    <form id="form1" runat="server">
    <table class="waybill-page first" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td style="width:90mm; padding-top:1pt;" align="center"></td>

                        <td style="width:80mm;">
                            <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td style=" text-align:center; font-family: Tahoma; font-size:12pt;">Путевой лист №<span><%Response.Write(WaybillNumber()); %></span></td>
                                </tr>
                                <tr>
                                    <td style="text-align:center; font-size:11pt;"><b>тракторной техники (самоходного шасси)</b></td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        <td style="text-align:center; font-size:12pt;">&nbsp;<span><%Response.Write(WaybillCode()); %></span></td>
                        <td style="width:60mm">
                                                 <%Response.Write(Approved()); %>   
                                                </td>
                    </tr>
                    </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0" width="100%" style="font-size:10pt;letter-spacing:1pt;">
                        <tr>
                            <td style="width:75mm;" align="center">
                                   <%Response.Write(Stamp()); %>
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0" style="font-weight:bold;font-size:12pt;">
                                     <tr>
                                        <td class="pre-lined">за&nbsp;период&nbsp;с</td>
                                        <td class="lined"><span><%Response.Write(DepartureDate("dd.MM.yyyy")); %></span></td>
                                        <td class="pre-lined">по</td>
                                        <td class="lined"><span><%Response.Write(ReturnDate("dd.MM.yyyy")); %></span></td>
                                     </tr>
                                </table>
                            </td>
                            <td style="width:15mm">
                                   &nbsp;
                            </td>
                            <td style="width:85mm">
                                <table cellpadding="1" cellspacing="0">
                                    <tr>
                                        <td class="pre-lined" align="left">Дата&nbsp;выдачи</td>
                                        <td class="lined"><span><%Response.Write(DepartureDate("dd MMMM yyyy")); %></span></td>
                                    </tr>
                                    <tr>
                                        <td class="pre-lined"  align="left">Марка</td>
                                        <td class="lined"><span><%Response.Write(VehicleModel()); %></span></td>
                                    </tr>
                                    <tr>
                                        <td class="pre-lined" align="left">Гос.№</td>
                                        <td class="lined"><span><%Response.Write(VehicleRegistrationNumber()); %></span></td>
                                    </tr>
                                    <tr>
                                        <td class="pre-lined" align="left">Гар.№</td>
                                        <td class="lined"><span><%Response.Write(VehicleGarageNumber()); %></span></td>
                                    </tr>
                                    <tr>
                                        <td class="pre-lined" align="left">Прицеп</td>
                                        <td class="lined"><span><%Response.Write(TrailerGarageNumber()); %></span> <span><%Response.Write(TrailerModel()); %></span> <span><%Response.Write(TrailerRegNumber()); %></span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                <table cellpadding="1" cellspacing="0" style="font-size:10pt;">
                    <tr>
                        <td>&nbsp;</td>
                        <td class="pre-lined">Машинист&nbsp;(ответственное&nbsp;лицо)</td>
                        <td class="lined" style="width:100mm; font-size: 7pt; font-weight: bold;">
                            <span><%Response.Write(DriverFio(1)); %></span>&nbsp;&nbsp;&nbsp;<span><%Response.Write(DriverLicence(1)); %></span><br/>
                            <span><%Response.Write(DriverFio(2)); %></span>&nbsp;&nbsp;&nbsp;<span><%Response.Write(DriverLicence(2)); %></span>
                        </td>
                        <td class="pre-lined">Табельный&nbsp;номер</td>
                        <td class="lined" style="width:20mm; font-size: 7pt; font-weight: bold;"><span><%Response.Write(DriverTab(1)); %></span>&nbsp;<br/><span><%Response.Write(DriverTab(2)); %></span></td>
                        <td class="pre-lined">Стажер</td>
                        <td class="lined" style="width:55mm"></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td class="subscript">фамилия,и.,о.</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td class="subscript">фамилия,и.,о.</td>
                        <td>&nbsp;</td>
                    </tr>
                </table>
                </td>
            </tr>
            <tr>
            <td>
                <table cellpadding="0" cellspacing="0" class="data" >
                <tbody>
                    <tr class="header rectangle">
                        <td rowspan="3" style="width:15mm;">Дата</td>
                        <td rowspan="3" style="width:55mm;">Заказчик</td>
                        <td rowspan="3" style="font-size:8pt; width:15mm;">Подпись диспетчера(уполно- моченного лица)</td>
                        <td colspan="2">Выезд к заказчику</td>
                        <td style="font-size:7pt; width:20mm;">Тракторная техника технически исправна</td>
                        <td colspan="2">Возвращение от заказчика</td>
                        <td style="font-size:7pt; width:20mm;">Тракторная техника технически (не) исправна</td>
                        <td colspan="5">ДВИЖЕНИЕ ТОПЛИВА</td>
                        <td rowspan="3" style="width:20mm;">"Остатки сверены" Механик (упол<br/>номочен<br/>ное<br/>лицо)</td>
                    </tr>
                    <tr class="header rectangle">
                        <td rowspan="2" style="width:10mm;">время</td>
                        <td rowspan="2" style="width:15mm;">показания машино- (мото) счётчика</td>
                        <td style="font-size:6pt; width:20mm;">сдал, механик (уполномоченное лицо)</td>
                        <td rowspan="2" style="width:10mm;">время</td>
                        <td rowspan="2" style="width:15mm;">показания машино- (мото) счётчика</td>
                        <td style="font-size:6pt; width:20mm;">принял, механик (уполномоченное лицо)</td>
                        <td rowspan="2">наличие при выезде</td>
                        <td colspan="3">выдано</td>
                        <td rowspan="2" style="width:15mm;">наличие при возвращение</td>
                    </tr>
                    <tr class="header rectangle">
                        <td style="font-size:6pt; width:20mm;">принял, машинист (уполномоченное лицо)</td>
                        <td style="font-size:6pt; width:20mm;">сдал, машинист (уполномоченное лицо)</td>
                        <td>марка топлива</td>
                        <td>количество<br/>топлива, л</td>
                        <td>подпись заправщика</td>
                    </tr>
                    <tr>
                        <td><span>&nbsp;<%Response.Write(DepartureDate("dd.MM")); %></span></td><td><span style="font-size: 10pt;"><%Response.Write(CustomerNames()); %></span></td><td>&nbsp;</td><td><span><%Response.Write(DepartureDate("HH:mm")); %></span></td><td><span><%Response.Write(DepartureMh()); %></span></td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td><span><%Response.Write(ReturnDate("HH:mm")); %></span></td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td><span><%Response.Write(FuelRemains()); %></span></td><td><span><%Response.Write(FuelName()); %></span></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                            <td><table cellpadding="0" cellspacing="0"><tr><td style="border-width: 0pt 0pt 1pt 0pt">&nbsp;</td></tr><tr><td style="border-width:0pt;">&nbsp;</td></tr></table></td>
                         <td style="border-bottom: 1px solid black;">&nbsp;</td><td style="border-bottom: 1px solid black;">&nbsp;</td><td style="border-bottom: 1px solid black;">&nbsp;</td><td style="border-bottom: 1px solid black;">&nbsp;</td><td style="border-bottom: 1px solid black;">&nbsp;</td><td style="border-bottom: 1px solid black;">&nbsp;</td>
                    </tr>
                    <tr class="header rectangle" style="height:6mm;">
                        <td colspan="9" rowspan="2">&nbsp;</td>
                        <td colspan="2" rowspan="2" >Расход топлива</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>Фактически</td>
                    </tr>
                    <tr class="header rectangle" style="height:6mm;">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>По&nbsp;норме</td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
            <tr>
                <td>
                    <table cellpadding="1" cellspacing="1">
                        <tbody>
                            <tr>
                                <td>
                                    <table cellpadding="2" cellspacing="0">
                                          <tbody>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                          </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table cellpadding="2" cellspacing="0">
                                          <tbody>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                          </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table cellpadding="2" cellspacing="0">
                                          <tbody>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                          </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table cellpadding="2" cellspacing="0">
                                          <tbody>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                          </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table cellpadding="2" cellspacing="0">
                                          <tbody>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left">По состоянию здоровья к работе допущен</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                     <table cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="pre-lined">Дата,&nbsp;подпись(штамп)&nbsp;врача</td>
                                                            <td class="lined">&nbsp;</td>
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

    <div class="page-separator"></div>
    <div class="page-break"></div>

    <table class="waybill-page second" cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="height:1mm;">
                    <td align="center" style="font-size:11pt;font-weight:bold;">Выполнение задания (работа на объекте)</td>
                </tr>
                <tr style="height:1mm;">
                    <td>
                        <table class="data height-table" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr class="header rectangle">
                                <td rowspan="2" style="width:25mm" >Число, месяц</td>
                                <td rowspan="2" style="width:85mm" >Наименование объекта работы</td>
                                <td colspan="2">Время</td>
                                <td colspan="2">Отработано</td>
                                <td rowspan="2" style="width:80mm">Заказчик (подпись, фамилия и.,о., печать)</td>
                            </tr>
                            <tr class="header rectangle">
                                <td>Прибытия</td>
                                 <td>Убытия</td>
                                  <td>маш.-час</td>
                                   <td>мото-час.</td>
                            </tr>
                            <tr><td><span>&nbsp;<%Response.Write(DepartureDate("dd.MM")); %></span></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                        </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="height:1mm;">
                    <td align="center" style="font-size:11pt;font-weight:bold;">
                        Особые отметки
                    </td>
                </tr>
                <tr style="height:1mm;">
                    <td>
                       <table cellpadding="0" cellspacing="0" class="data height-table">
                            <tr class="header rectangle">
                                <td style="width:25mm">Дата</td>
                                <td>&nbsp;</td>
                                <td style="width:25mm">Дата</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                             <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                               <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                       </table>
                    </td>                  
                </tr>

            </tbody>
        </table>
    </form>
</body>
</html>
