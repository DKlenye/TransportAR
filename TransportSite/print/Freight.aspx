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
    height:5mm;
}
.task td
{
    height:5mm;
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
                        <td style="width:90mm; padding-top:1pt;" align="center">
                                                                          <div style="border: 2px solid #88A1C0; text-align: center; font: normal 11px Times New Roman;z-index:10000; width:150pt;" >
Открытое акционерное общество <br/>
"НАФТАН"<br/>
Республика Беларусь,Витебская обл.<br/>
211440,г.Новополоцк<br/>
тел. <%Response.Write(Phone()); %>
</div>
                        </td>                        
                        
                        <td style="width:80mm;">
                            <table cellspacing="0" cellpadding="0">
                            <tbody>                                                                
                                <tr>
                                    <td style=" text-align:center; font-family: Tahoma; font-size:12pt;">Путевой лист №<span><%Response.Write(WaybillNumber()); %></span></td>
                                </tr>                                
                                <tr><td>&nbsp;</td></tr>
                                <tr>
                                    <td style="text-align:center; font-size:12pt;"><b><span><%Response.Write(DepartureDate("dd MMMM yyyy")); %></span>г.</b></td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        <td style="text-align:center; font-size:12pt;">&nbsp;<span><%Response.Write(WaybillCode()); %></span></td>
                        <td style="width:60mm">
                                                    <table class="form-head" cellpadding="0" cellspacing="0">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Приложение 2
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
            <tr>
                <td>
                    <table cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td style="width:45%">
                            <table cellspacing="0" cellpadding="0">
                            <tbody>
                            <tr>
                                <td>
                                    <table class="data height-table" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr class="header rectangle">
                                            <td colspan="4"><b>Автомобиль, прицеп, полуприцеп</b></td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>Марка автомобиля, прицепа,<br/>полуприцепа</td>
                                            <td>Регистрационный знак</td>
                                            <td>Гаражный номер</td>
                                            <td>Код марки</td>
                                        </tr>
                                        <tr class="header rectangle"><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                                        <tr><td>&nbsp;<b><span><%Response.Write(VehicleModel()); %></span></b></td><td>&nbsp;<b><span><%Response.Write(VehicleRegistrationNumber()); %></span></b></td><td>&nbsp;<b><span><%Response.Write(VehicleGarageNumber()); %></span></b></td><td>&nbsp;</td></tr>
                                        <tr><td>&nbsp;<b><span><%Response.Write(TrailerModel()); %></span></b></td><td>&nbsp;<b><span><%Response.Write(TrailerRegNumber()); %></span></b></td><td>&nbsp;<b><span><%Response.Write(TrailerGarageNumber()); %></span></b></td><td>&nbsp;</td></tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table class="data height-table" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr class="header rectangle">
                                            <td colspan="4"><b>Водитель</b></td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>Фамилия, инициалы</td>
                                            <td>Табельный номер, класс</td>
                                            <td>Номер водительского<br/>удостоверения</td>
                                            <td style="font-size:7pt;">Водитель<br/>по состоянию здоровья<br/>к управлению допущен.<br/>Подпись(штамп)</td>                                            
                                        </tr>
                                        <tr class="header rectangle"><td>5</td><td>6</td><td>7</td><td>8</td></tr>
                                        <tr><td style="font-size:7pt;">&nbsp;<b><span><%Response.Write(DriverFio(1)); %></span></b></td><td>&nbsp;<b><span><%Response.Write(DriverTab(1)); %></span></b></td><td>&nbsp;<b><span><%Response.Write(DriverLicence(1)); %></span></b></td><td>&nbsp;</td></tr>
                                        <tr><td style="font-size:7pt;">&nbsp;<b><span><%Response.Write(DriverFio(2)); %></span></b></td><td>&nbsp;<b><span><%Response.Write(DriverTab(2)); %></span></b></td><td>&nbsp;<b><span><%Response.Write(DriverLicence(2)); %></span></b></td><td>&nbsp;</td></tr>
                                        <tr><td style="font-size:7pt;">&nbsp;<b><span><%Response.Write(DriverFio(3)); %></span></b></td><td>&nbsp;<b><span><%Response.Write(DriverTab(3)); %></span></b></td><td>&nbsp;<b><span><%Response.Write(DriverLicence(3)); %></span></b></td><td>&nbsp;</td></tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                        </td>
                        <td style="width:2mm;">&nbsp;</td>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                            <tbody>
                            <tr>
                                <td>
                                    <table class="data height-table" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr class="header rectangle">
                                            <td colspan="6"><b>Работа водителя и автомобиля</b></td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td rowspan="2">Операция</td>
                                            <td rowspan="2">Показания<br/>спидометра</td>
                                            <td style="font-size:7pt;" colspan="2">Дата(число,месяц),<br/>время(час.,мин.)</td>                                            
                                            <td colspan="2">Время работы, час</td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>по графику</td>
                                            <td>фактически</td>
                                            <td>двигателя</td>
                                            <td style="font-size:7pt;">спец-<br/>оборудования</td>
                                        </tr>
                                        <tr class="header rectangle"><td class="style1">9</td><td class="style1">10</td>
                                            <td class="style1">11</td><td class="style1">12</td><td class="style1">13</td>
                                            <td class="style1">14</td></tr>
                                        <tr><td style="text-align:left;">Выезд<br/>на линию</td><td>&nbsp;<b><span><%Response.Write(DepartureKm()); %></span></b></td><td>&nbsp;<b><span><%Response.Write(DepartureDate("dd.MM.yyyy HH:mm",true)); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                        <tr><td style="text-align:left;">Возвращение<br/>с линии</td><td>&nbsp;</td><td>&nbsp;<b><span><%Response.Write(ReturnDate("dd.MM.yyyy HH:mm",true)); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table class="data task" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr class="header rectangle">
                                            <td colspan="8"><b>Движение топливо-смазочных материалов(ТСМ)</b></td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td colspan="6">Заправка ТСМ</td>
                                            <td colspan="2">Остаток ТСМ, л</td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>дата(число,месяц)</td>
                                            <td>пункт(страна) заправки</td>
                                            <td>марка ТСМ</td>
                                            <td>код марки</td>
                                            <td>коли-<br/>чество, л</td>
                                            <td style="font-size:7pt;">подпись(штамп)<br/>уполномоченного<br/>лица (номер чека АЗС)</td>
                                            <td>при выезде</td>
                                            <td>при возвращении</td>
                                        </tr>
                                        <tr class="header rectangle"><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td style="width:18mm;">21</td><td>22</td></tr>
                                        <tr><td style="height:10mm;">&nbsp;</td><td>&nbsp;</td><td style="font-size:7pt;">&nbsp;<b><span><%Response.Write(FuelName()); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;<b><span><%Response.Write(FuelRemains()); %></span></b></td><td>&nbsp;</td></tr>
                                        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td colspan="2">Подписи(штамп)</td></tr>
                                        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>механик</td><td>механик</td></tr>
                                        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
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
            <tr>
                <td>
                    <table class="data task" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td colspan="9" class="header rectangle"><b>Задание водителю</b></td>
                    </tr>
                    <tr class="header rectangle">
                        <td rowspan="2">Заказчик</td>
                        <td colspan="2">Дата(число,месяц),<br/>время(час.,мин.)</td>
                        <td rowspan="2">Пункт отправления<br/>(адрес места погрузки)</td>
                        <td rowspan="2">Пункт назначения<br/>(адрес места разгрузки)</td>
                        <td rowspan="2">Расстояние,<br/>км</td>
                        <td rowspan="2">Наименование груза</td>
                        <td rowspan="2">Вес<br/>груза,<br/>т</td>
                        <td rowspan="2">Количество<br/>ездок с гру-<br/>зом,час.</td>
                    </tr>
                    <tr class="header rectangle">
                        <td>прибытия</td>
                        <td>убытия</td>
                    </tr>
                    <tr class="header rectangle">
                        <td style="width:50mm;">23</td>
                        <td style="width:25mm;">24</td>
                        <td style="width:25mm;">25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                    </tr>
                    <tr><td style="font-size:7pt;">&nbsp;<b><span><%Response.Write(CustomerName()); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td><%Response.Write(SrcRoutePoint()); %>&nbsp;</td><td>&nbsp;<%Response.Write(DstRoutPoint()); %></td><td>&nbsp;<%Response.Write(RouteKm()); %></td><td><%Response.Write(CargoName()); %></td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    </tbody>
                    </table>               
                </td>
            </tr>
            <tr class="footer">
                <td>
                    <table class="task" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td class="pre-lined">Прочие&nbsp;отметки</td>
                        <td class="lined">&nbsp;</td>
                    </tr>
                    </tbody>
                    </table>                    
                </td>
            </tr>
            <tr class="footer">
            <td>
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td style="width:85mm;">
                                <table cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="text-align:left;">Водительское&nbsp;удостоверение&nbsp;проверил,&nbsp;задание&nbsp;выдал.</td>
                                    </tr>
                                    <tr>
                                        <td>
                                             <table cellpadding="0" cellspacing="0"><tbody>
                                             <tr>
                                                <td class="pre-lined">Выдать&nbsp;топлива</td>
                                                <td class="lined">&nbsp;</td>
                                             </tr>
                                             </tbody></table>
 
                                        </td>
                                    </tr>
                                     <tr>
                                     <td>
                                          <table cellpadding="0" cellspacing="0"><tbody>
                                             <tr>
                                               <td class="pre-lined">Подпись&nbsp;(штамп)&nbsp;диспетчера</td>
                                               <td class="lined">&nbsp;</td>
                                             </tr>
                                             </tbody></table>  
                                    </td>                                      
                                    </tr>
                                    <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0"><tbody>
                                             <tr>
                                               <td class="pre-lined">Сопровождающие&nbsp;лица</td>
                                               <td class="lined">&nbsp;</td>
                                             </tr>
                                             </tbody></table>
                                    </td>
                                    </tr>
                                    
                                </tbody>
                                </table>
                        </td>
                        <td>&nbsp;</td>
                         <td style="width:85mm;">
                                <table cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="text-align:left;">Автомобиль&nbsp;технически&nbsp;исправен.&nbsp;Выезд&nbsp;разрешен.</td>
                                    </tr>                                    
                                     <tr>
                                         <td>
                                              <table cellpadding="0" cellspacing="0"><tbody>
                                                 <tr>
                                                  <td class="pre-lined">Подпись&nbsp;(штамп)&nbsp;механика</td>
                                                  <td class="lined">&nbsp;</td>
                                                 </tr>
                                                 </tbody></table>  
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td style="text-align:left;">Автомобиль&nbsp;в&nbsp;технически&nbsp;исправеном&nbsp;состоянии&nbsp;принял.</td>
                                    </tr>  
                                    <tr>
                                         <td>
                                              <table cellpadding="0" cellspacing="0"><tbody>
                                                 <tr>
                                                    <td class="pre-lined">Подпись&nbsp;водителя</td>
                                                    <td class="lined">&nbsp;</td>
                                                 </tr>
                                                 </tbody></table>  
                                        </td>                                         
                                    </tr>
                                </tbody>
                                </table>
                        </td>
                        <td>&nbsp;</td>
                         <td style="width:85mm;">
                                <table cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="text-align:left;">Автомобиль&nbsp;сдал.</td>
                                    </tr>
                                    <tr>
                                        <td>
                                              <table cellpadding="0" cellspacing="0"><tbody>
                                                 <tr>
                                                    <td class="pre-lined">Подпись&nbsp;водителя</td>
                                                    <td class="lined">&nbsp;</td>
                                                 </tr>
                                                 </tbody></table>  
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td style="text-align:left;">Автомобиль&nbsp;принял.</td>
                                    </tr>                                      
                                     <tr>
                                        <td>
                                              <table cellpadding="0" cellspacing="0"><tbody>
                                                 <tr>
                                                    <td class="pre-lined">Подпись&nbsp;(штамп)&nbsp;механика</td>
                                                    <td class="lined">&nbsp;</td>
                                                 </tr>
                                                 </tbody></table>  
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
            <tr style="height:5mm;"><td>&nbsp</td></tr>
        </tbody>
    </table>

    <div class="page-separator"></div>
    <div class="page-break"></div>

    <table class="waybill-page second" cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="height:1mm;">
                    <td>
                        
                        <table class="data height-table" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr class="header rectangle">
                                <td colspan="22"><b>Выполнение задания</b></td>
                            </tr>
                            <tr class="header rectangle">
                                <td rowspan="2">Дата(число,<br/>месяц), время<br/>прибытия (ч, мин)</td>
                                <td rowspan="2">Фамилия, инициалы (таб.№) водителя</td>
                                <td rowspan="2" style="width:20mm">Регистра-<br/>ционный знак прицепа<br/>(полуприцепа)</td>
                                <td colspan="3">Груз</td>
                                <td rowspan="2" style="width:20mm;">Подпись и<br/>печать (штамп)<br/>грузо-<br/>отправителя</td>
                                <td colspan="3">Движение по участкам маршрута</td>
                                <td colspan="2">Пробег</td>
                                <td rowspan="2" style="width:10mm;">Транс-<br/>портная работа, т*км</td>
                                <td rowspan="2" style="width:15mm;">Коэффициент изменения нормы расхода топлива</td>
                            </tr>
                            <tr class="header rectangle">
                                <td>наименование</td>
                                <td>вес, т</td>
                                <td>номер и дата ТТН</td>
                                <td>страна или номер ездки</td>
                                <td>начальный пункт</td>
                                <td>конечный пункт</td>
                                <td>с грузом</td>
                                <td>без груза</td>
                            </tr>                          
                            <tr class="header rectangle">
                                <td>32</td>
                                <td>33</td>
                                <td>34</td>
                                <td>35</td>
                                <td style="width:10mm;">36</td>
                                <td>37</td>
                                <td>38</td>
                                <td style="width:10mm;">39</td>
                                <td style="width:35mm;">40</td>
                                <td style="width:35mm;">41</td>
                                <td style="width:15mm;">42</td>
                                <td style="width:15mm;">43</td>
                                <td>44</td>
                                <td>45</td>                                
                            </tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            </tbody>
                        </table>
                        
                    </td>
                </tr>
                <tr style="height:1mm;">
                    <td>
                        <table class="data height-table" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr class="header rectangle">
                                <td colspan="22"><b>Результаты работы</b></td>
                            </tr>
                            <tr class="header rectangle">
                                <td colspan="3">Расход топлива, л</td>
                                <td colspan="4">Время в наряде, ч</td>
                                <td colspan="5">Пробег, км</td>
                                <td colspan="4">Перевезено, т</td>
                                <td colspan="4">Выполнено, т·км</td>
                                <td rowspan="3">Коли-<br/>чество<br/>ездок</td>
                                <td rowspan="3">Авто-<br/>мо-<br/>биле<br/>дни<br/>в<br/>ра-<br/>боте</td>
                            </tr>
                            <tr class="header rectangle">
                                <td rowspan="2">марка топлива</td>
                                <td rowspan="2">по<br/>норме</td>
                                <td rowspan="2">факти-<br/>чески</td>
                                <td rowspan="2">всего</td>
                                <td rowspan="2">в движе-<br/>нии</td>
                                <td colspan="2">в простое</td>
                                <td rowspan="2">всего</td>
                                <td colspan="3">в том числе<br/>по территории</td>
                                <td rowspan="2">с грузом</td>
                                <td rowspan="2">всего</td>
                                <td colspan="3">в том числе</td>
                                <td rowspan="2">всего</td>
                                <td colspan="3">в том числе</td>
                            </tr>
                            <tr class="header rectangle">
                                <td>под пог-<br/>рузкой-<br/>раз-<br/>грузкой</td>
                                 <td>прочее</td>
                                   <td>РБ</td>
                                    <td>СНГ</td>
                                     <td>ино-<br/>стран-<br/>ных<br/>госу-<br/>дарств</td>
                                      <td>из РБ</td>
                                      <td>в РБ</td>
                                      <td>тран-<br/>зитом</td>
                                      <td>из РБ</td>
                                      <td>в РБ</td>
                                      <td>тран-<br/>зитом</td>
                            </tr>
                            <tr class="header rectangle">
                                <td>46</td>
                                <td style="width:15mm;">47</td>
                                <td style="width:15mm;">48</td>
                                <td style="width:15mm;">49</td>
                                <td style="width:15mm;">50</td>
                                <td>51</td>
                                <td>52</td>
                                <td style="width:15mm;">53</td>
                                <td style="width:9mm;">54</td>
                                <td>55</td>
                                <td style="width:12mm;">56</td>
                                <td>57</td>
                                <td style="width:13mm;">58</td>
                                <td>59</td>
                                <td>60</td>
                                <td>61</td>
                                <td style="width:13mm;">62</td>
                                <td>63</td>
                                <td>64</td>
                                <td>65</td>
                                <td>66</td>
                                <td>67</td>
                            </tr>
                            <tr><td><b>
                                <span><%Response.Write(FuelName()); %></span>
                                </b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                        </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="height:1mm;">
                    <td>
                        <table cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <td style="width:50%">
                                <table class="height-table" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td style="text-align:center">Для расчетов:</td>
                                </tr>
                                <tr>
                                    <td class="lined">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="lined">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="lined">&nbsp;</td>
                                </tr>
                                </tbody>
                                </table>
                            </td>
                            <td style="width:2mm;">&nbsp;</td>
                            <td>
                                <table class="data task" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr class="header rectangle">
                                    <td colspan="2">Работа с прицепами</td>
                                    <td colspan="2">Зарплата</td>
                                </tr>
                                <tr class="header rectangle">
                                    <td>номер</td>
                                    <td>пробег</td>
                                    <td>код</td>
                                    <td>сумма</td>
                                </tr>
                                <tr class="header rectangle">
                                    <td>68</td>
                                    <td>69</td>
                                    <td>70</td>
                                    <td>71</td>
                                </tr>
                                 <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="height:1mm;">
                    <td>
                    <table class="height-table" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td style="width:50%">
                            <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="pre-lined">Подписи&nbsp;(штамп).&nbsp;Водитель</td>
                                    <td class="lined">&nbsp;</td>
                                    <td class="pre-lined">Диспетчер</td>
                                    <td class="lined">&nbsp;</td>
                                </tr>
                            </tbody>
                            </table>                     
                        </td>
                        <td style="width:2mm;">&nbsp;</td>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="pre-lined">Техник&nbsp;по&nbsp;учёту&nbsp;ТСМ</td>
                                    <td class="lined">&nbsp;</td>
                                    <td class="pre-lined">Инженер</td>
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
                <tr style="height:20mm;"><td>&nbsp</td></tr>
            </tbody>
        </table>
    </form>
</body>
</html>
