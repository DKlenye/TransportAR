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
    .second td{
       height:5mm;
    }
 
    .ticket-work{
       padding-bottom:2mm;
    }

    .ticket-work td{
        text-align:left;
        height:7mm;
        line-height: 1.1;
        padding:0.5mm    
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

    .footer td{
       line-height: 1.1;
       text-align:left;
    }
    .shift{
        border-right:1pt solid black;        
        vertical-align:middle;
    }
    .shift td{
        text-align:center;
    }
    .result td{
        height:6mm;
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

        .style1
        {
            height: 18mm;
        }



    </style>
    
</head>
<body>
    <form id="form1" runat="server">

        <table class="waybill-page first" cellpadding="0" cellspacing="0" >
        <tbody>
            <tr style="height:1mm;">
                <td align="right" class="style1">
                     <div style="width:90mm; float:left; text-align:center">
                       <%Response.Write(Stamp()); %>
                     </div>
                     <div style="float:left; width:40mm; vertical-align:middle; font-size:10pt;" class="dataText"><%Response.Write(WaybillCode()); %>&nbsp;</div>
                   <div style="width:70mm; float:left;">&nbsp;</div>                   
                   <div style="width:70mm; text-align:left; float:left;">Приложение 4<br/>к постановлению Министерства транспорта<br/>и коммуникаций Республики Беларусь<br/>29.03.2012 №25</div>
                </td>
            </tr>
            <tr style="height:1mm;">
                <td>
                    <table cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr style="height:1mm;">
                               
                                <td style="width:50%; vertical-align:top;">
                                    
                                    <table cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr><td>&nbsp</td><td class="lined">&nbsp;</td><td style="width:60mm;">&nbsp</td></tr>
                                        <tr><td>&nbsp</td><td class="subscript">наименование перевозчика (штамп,печать)</td><td>&nbsp</td></tr>
                                    </tbody>
                                    </table>
                                    <br />
                                    <table class="data" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="rectangle"><td colspan="7"><b>Автобус</b></td></tr>
                                        <tr class="rectangle">
                                            <td rowspan="2">Марка автобуса</td>
                                            <td rowspan="2">Регистрационный<br/>знак</td>
                                            <td rowspan="2">Гаражный<br/>номер</td>
                                            <td colspan="2">Номер була</td>
                                            <td rowspan="2">Режим</td>
                                            <td rowspan="2">Номер<br/>разрешения</td>
                                        </tr>
                                        <tr class="rectangle">
                                            <td>1-я смена</td>
                                            <td>2-я смена</td>
                                        </tr>
                                        <tr class="rectangle">
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                        </tr>
                                        <tr>
                                            <td><span class="dataText"><%Response.Write(VehicleModel()); %></span>&nbsp;</td>
                                            <td><span class="dataText"><%Response.Write(VehicleRegistrationNumber()); %></span></td>
                                            <td><span class="dataText"><%Response.Write(VehicleGarageNumber()); %></span></td>
                                            <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <br />
                                    <table class="data" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr class="rectangle">
                                                <td colspan="5"><b>Водитель</b></td> 
                                            </tr>
                                            <tr class="rectangle">
                                                <td>№<br/>стро-<br/>ки</td>
                                                <td>Фамилия, инициалы</td>
                                                <td>Табельный<br/>номер,<br/>класс</td>
                                                <td style="width:30mm;">Номер<br/>водительского<br/>удостоверения</td>
                                                <td style="width:50mm;">Водитель по состоянию<br/>здоровья к управлению<br/>допущен, подпись(штамп)</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td>8</td>
                                                <td>9</td>
                                                <td>10</td>
                                                <td>11</td>
                                                <td>12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                    <td><span class="dataText" style="font-size:7pt;"><%Response.Write(DriverFio(1));%></span>&nbsp;</td><td><span class="dataText"><%Response.Write(DriverTab(1));%></span>&nbsp;</td><td><span class="dataText"><%Response.Write(DriverLicence(1));%></span>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td><span class="dataText" style="font-size:7pt;"><%Response.Write(DriverFio(2));%></span>&nbsp;</td><td><span class="dataText"><%Response.Write(DriverTab(2));%></span>&nbsp;</td><td><span class="dataText"><%Response.Write(DriverLicence(2));%></span>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>3</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>4</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">Кондуктора</td>
                                                <td colspan="3" rowspan="6" style="text-align:left;">
                                                    Водительское удостоверение проверил, заданиевыдал.<br/>
                                                    Выдать топлива __________л<br/>
                                                    Подпись(штамп) диспетчера _______________<br/>
                                                    Водительское удостоверение проверил, заданиевыдал.<br/>
                                                    Выдать топлива __________л<br/>
                                                    Подпись(штамп) диспетчера _______________<br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>13</td><td>14</td><td>15</td>
                                            </tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                        </tbody>
                                    </table>
                                    
                                </td>
                                <td style="width:2mm;">&nbsp;</td>
                                 <td style="vertical-align:top; text-align:left;">
                                    <table cellpadding="0" cellspacing="0" style="width:65mm;">
                                        <tbody>
                                            <tr style="font-size:11pt; font-weight:bold;">
                                                <td class="pre-lined">Путевой&nbsp;лист&nbsp;автобуса&nbsp;№</td>
                                                <td class="lined" style="width:20mm;"><span class="dataText"><%Response.Write(WaybillNumber()); %></span>&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                     <table cellpadding="0" cellspacing="0" style="width:65mm;">
                                        <tbody>
                                            <tr style="font-size:11pt; font-weight:bold;">
                                                <td class="lined" style="width:10mm;"><span><%Response.Write(DepartureDate("dd")); %></span>&nbsp;</td>
                                                <td class="pre-lined">&nbsp;</td>
                                                <td class="lined" style="width:30mm;"><span><%Response.Write(DepartureDate("MMMM")); %></span>&nbsp;</td>
                                                <td class="pre-lined">&nbsp;</td>
                                                <td class="lined" style="width:15mm;"><span><%Response.Write(DepartureDate("yyyy")); %></span>&nbsp;</td>
                                                <td class="pre-lined">г.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                    <table class="data" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr class="rectangle">
                                                <td colspan="5" style="font-weight:bold;">Работа водителя и автобуса</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td rowspan="2">Операция</td>
                                                <td rowspan="2">Показания<br/>спидометра</td>
                                                <td colspan="2">Дата(число,месяц),<br/>время(ч,мин)</td>
                                                <td>Время работы, ч</td>
                                            </tr>
                                            <tr>
                                                <td>по графику</td>
                                                <td>фактически</td>
                                                <td>двигателя</td>
                                            </tr>
                                            <tr>
                                                <td>16</td>
                                                <td>17</td>
                                                <td>18</td>
                                                <td>19</td>
                                                <td>20</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left">Выезд на линию</td>
                                                <td><span class="dataText"><%Response.Write(DepartureKm()); %></span>&nbsp;</td><td><span class="dataText"><%Response.Write(DepartureDate("dd.MM.yyyy HH:mm",true)); %></span>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left">Возвращение с линии</td>
                                                <td>&nbsp;</td><td><span class="dataText"><%Response.Write(ReturnDate("dd.MM.yyyy HH:mm",true)); %></span>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="data" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr class="rectangle">
                                                <td colspan="8"  style="font-weight:bold;">Движение топливо-смазочных материалов</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td colspan="6">Заправка ТСМ</td>
                                                <td colspan="2">Остаток топлива, л</td>                                                
                                            </tr>
                                            <tr>
                                                <td>дата(число)<br/>месяц)</td>
                                                <td>пункт<br/>заправки</td>
                                                <td>марка<br/>ТСМ</td>
                                                <td>код<br/>марки</td>
                                                <td>коли-<br/>чество,л</td>
                                                <td>подпись<br/>(штамп)<br/>уполномо-<br/>ченного лица<br/>(№ чека АЗС)</td>
                                                <td>при<br/>выезде</td>
                                                <td>при<br/>возвраще-<br/>нии</td>
                                            </tr>
                                            <tr>
                                                <td>21</td>
                                                <td>22</td>
                                                <td>23</td>
                                                <td>24</td>
                                                <td>25</td>
                                                <td>26</td>
                                                <td style="width:20mm;">27</td>
                                                <td style="width:20mm;">28</td>
                                            </tr>
                                            <tr style="height:7mm;">
                                                <td>&nbsp;</td><td>&nbsp;</td><td><span class="dataText"><%Response.Write(FuelName()); %></span>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td><span class="dataText"><%Response.Write(FuelRemains()); %></span>&nbsp;</td><td>&nbsp;</td>
                                            </tr>
                                             <tr>
                                                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td colspan="2">Подписи(штамп)</td>
                                            </tr>
                                             <tr>
                                                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>
                                                 механик</td><td>механик</td>
                                            </tr>
                                             <tr>
                                                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr><td>
                <table class="data" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr class="rectangle">
                            <td colspan="24"><b>Выполнение задания</b></td>
                        </tr>
                        <tr class="rectangle">
                            <td rowspan="4">Наименование<br/>конечного пункта<br/>маршрута(заказчик)</td>
                            <td rowspan="4">Код мар-<br/>шру-<br/>та</td>
                            <td rowspan="4">№ строки</td>
                            <td colspan="2">Задание</td>
                            <td colspan="2" rowspan="2">Выполнено рейсов</td>
                            <td colspan="2" rowspan="3">Время на маршруте, ч, мин</td>
                            <td colspan="4">Пробег с пассажирами, км</td>
                            <td colspan="4">Перевезено пассажиров</td>
                            <td colspan="7">Выручка от продажи билетов и за провоз багажа, руб.</td>
                        </tr>
                        <tr class="rectangle">
                            <td rowspan="3">рейсы</td>
                            <td rowspan="3">вы-<br/>руч-<br/>ка, руб.</td>  
                            <td rowspan="3">всего</td>       
                            <td colspan="3" rowspan="2">в том числе по территории</td>  
                            <td rowspan="3">всего</td>       
                            <td colspan="3">в том числе</td>      
                            <td colspan="3">наличными</td>  
                            <td colspan="3">по ведомости</td>
                            <td rowspan="3">Подпись<br/>(штамп)<br/>ответствен-<br/>ного лица</td>        
                        </tr>
                        <tr class="rectangle">
                            <td rowspan="2">всего</td>
                            <td rowspan="2">не по графику</td>
                            <td rowspan="2">льготной<br/>категории</td>
                            <td rowspan="2">из РБ</td>
                            <td rowspan="2">в РБ</td>
                            <td rowspan="2">всего</td>
                            <td colspan="2">в том числе</td>
                            <td rowspan="2">всего</td>
                            <td colspan="2">в том числе</td>
                        </tr>
                        <tr class="rectangle">
                            <td>от</td>
                            <td>до</td>
                            <td>РБ</td>
                            <td>СНГ</td>
                            <td>ино-<br/>странных госу-<br/>дарств</td>
                            <td>льготной категории</td>
                            <td>за багаж</td>
                            <td>льготной категории</td>
                            <td>за багаж</td>
                        </tr>
                        <tr class="rectangle">
                            <td style="width:45mm;">29</td>
                            <td>30</td>
                            <td>31</td>
                            <td>32</td>
                            <td>33</td>
                            <td>34</td>
                            <td>35</td>
                            <td>36</td>
                            <td>37</td>
                            <td style="width:10mm;">38</td>
                            <td>39</td>
                            <td>40</td>
                            <td>41</td>
                            <td style="width:10mm;">42</td>
                            <td>43</td>
                            <td>44</td>
                            <td>45</td>
                            <td>46</td>
                            <td>47</td>
                            <td>48</td>
                            <td>49</td>
                            <td>50</td>
                            <td>51</td>
                            <td>52</td>
                        </tr>
                        <tr><td><%Response.Write(CustomerName()); %>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                    </tbody>                
                </table>
            </td></tr>
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0" style="text-align:left;">
                        <tbody>
                            <tr>
                                <td style="width:25%">Автобус технически исправен.</td>
                                <td style="width:25%">Автобус в технически исправном</td>
                                <td style="width:25%">Автобус сдал.</td>
                                <td style="width:25%">Автобус принял.</td>
                            </tr>
                            <tr>
                                <td>Выезд разрешен.</td>
                                <td>состоянии принял.</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Подпись(штамп) механика ______________</td>
                                <td>Подпись водителя ______________</td>
                                <td>Подпись водителя ______________</td>
                                <td>Подпись(штамп) механика ______________</td>
                                
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
                <tr>
                <td style="width:3mm;">&nbsp;</td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>                                    
                                    <td>
                                        <table class="data" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr class="rectangle">
                                                    <td colspan="8"><b>Передача автобуса на линии</b></td>
                                                </tr>
                                                <tr class="rectangle">
                                                    <td rowspan="2">Пункт смены водителей</td>
                                                    <td rowspan="2">Время, ч, мин</td>
                                                    <td colspan="2">Подписи</td>
                                                    <td rowspan="2">Пункт смены водителей</td>
                                                    <td rowspan="2">Время, ч, мин</td>
                                                    <td colspan="2">Подписи</td>
                                                </tr>
                                                <tr class="rectangle">
                                                    <td>сдал</td>
                                                    <td>принял</td>
                                                    <td>сдал</td>
                                                    <td>принял</td>
                                                </tr>
                                                <tr class="rectangle">
                                                    <td>53</td>
                                                    <td>54</td>
                                                    <td>55</td>
                                                    <td>56</td>
                                                    <td>57</td>
                                                    <td>58</td>
                                                    <td>59</td>
                                                    <td>60</td>
                                                </tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="width:8mm;">&nbsp;</td>
                                    <td style="width:80mm;">
                                        <table cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr><td align="center" style="font-size:11pt;"><b>Отметки линейного контролёра</b></td></tr>
                                                <tr><td class="lined">&nbsp;</td></tr>
                                                <tr><td class="lined">&nbsp;</td></tr>
                                                <tr><td class="lined">&nbsp;</td></tr>
                                                <tr><td class="lined">&nbsp;</td></tr>
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
                <td style="width:3mm;">&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>
                        <table class="data" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr class="rectangle"><td colspan="10"><b>Последовательность выполнения задания</b></td><td colspan="4">&nbsp</td></tr>
                                <tr class="rectangle">
                                    <td rowspan="3">№ строки</td>
                                    <td colspan="5">Отправление с начального пункта, ч, мин</td>
                                    <td rowspan="3" colspan="2">Наименование остановочного<br/>пункта (страна, город,<br/>пограничный переход)</td>
                                    <td rowspan="3">№ строки</td>
                                    <td colspan="5">Отправление с конечного пункта, ч, мин</td>
                                </tr>
                                <tr class="rectangle">
                                    <td colspan="2">время прибытия</td>
                                    <td colspan="2">время отправления</td>
                                    <td rowspan="2">подпись<br/>(штамп)<br/>диспетчера</td>
                                    <td colspan="2">время прибытия</td>
                                    <td colspan="2">время отправления</td>
                                    <td rowspan="2">подпись<br/>(штамп)<br/>диспетчера</td>
                                </tr>
                                <tr class="rectangle">
                                    <td>по расписанию</td>
                                    <td>фактически</td>
                                    <td>по расписанию</td>
                                    <td>фактически</td>
                                    <td>по расписанию</td>
                                    <td>фактически</td>
                                    <td>по расписанию</td>
                                    <td>фактически</td>
                                </tr>
                                <tr class="rectangle">
                                    <td>61</td>
                                    <td>62</td>
                                    <td>63</td>
                                    <td>64</td>
                                    <td>65</td>
                                    <td>66</td>
                                    <td>67</td>
                                    <td>68</td>
                                    <td>69</td>
                                    <td>70</td>
                                    <td>71</td>
                                    <td>72</td>
                                    <td>73</td>
                                    <td>74</td>
                                </tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            </tbody>
                        </table>
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="data" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr class="rectangle">
                                                <td colspan="11"><b>Результаты работы</b></td>                                                
                                            </tr>
                                            <tr class="rectangle">
                                                <td rowspan="3">№<br/>стро-<br/>ки</td>
                                                <td rowspan="2" colspan="2">Расход топлива, л</td>
                                                <td colspan="7">Время в наряде, ч</td>
                                                <td rowspan="3">Подпись<br/>(штамп)<br/>ответ-<br/>ствен-<br/>ного лица</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td rowspan="2">всего</td>
                                                <td colspan="4">в том числе</td>
                                                <td rowspan="2">ноч-<br/>ное</td>
                                                <td rowspan="2">празд-<br/>ничное</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td>по<br/>нор-<br/>ме</td>
                                                <td>факт</td>
                                                <td>на<br/>ли-<br/>нии</td>
                                                <td>по<br/>графи-<br/>ку</td>
                                                <td>в ремонте</td>
                                                <td>в резерве</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td>75</td>
                                                <td>76</td>
                                                <td>77</td>
                                                <td>78</td>
                                                <td>79</td>
                                                <td>80</td>
                                                <td>81</td>
                                                <td>82</td>
                                                <td>83</td>
                                                <td>84</td>
                                                <td style="width:20mm;">85</td>
                                            </tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                        </tbody>
                                        </table>
                                    </td>
                                    <td style="width:3mm;">&nbsp;</td>
                                    <td>
                                        <table class="data" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr class="rectangle">
                                                    <td colspan="12"><b>Прочие отметки</b></td>
                                                </tr>
                                                <tr class="rectangle">
                                                    <td rowspan="2">Наименование</td>
                                                    <td rowspan="2">Код</td>
                                                    <td colspan="2">Дата, время,<br/>ч,мин</td>
                                                    <td rowspan="2">№<br/>строки</td>
                                                    <td rowspan="2">Подпись<br/>(штамп)<br/>ответ-<br/>ствен-<br/>ного лица</td>    
                                                    <td rowspan="2">Наименование</td>
                                                    <td rowspan="2">Код</td>
                                                    <td colspan="2">Дата, время,<br/>ч,мин</td>
                                                    <td rowspan="2">№<br/>строки</td>
                                                    <td rowspan="2">Подпись<br/>(штамп)<br/>ответ-<br/>ствен-<br/>ного лица</td>                                                
                                                </tr>
                                                <tr class="rectangle">
                                                    <td>от</td>
                                                    <td>до</td>
                                                    <td>от</td>
                                                    <td>до</td>
                                                </tr>
                                                <tr class="rectangle">
                                                    <td>86</td>
                                                    <td>87</td>
                                                    <td>88</td>
                                                    <td>89</td>
                                                    <td>90</td>
                                                    <td>91</td>
                                                    <td>92</td>
                                                    <td>93</td>
                                                    <td>94</td>
                                                    <td>95</td>
                                                    <td>96</td>
                                                    <td>97</td>
                                                </tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </form>   
</body>

</html>
