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
                   <div style="width:70mm; text-align:left; float:left;">���������� 4<br/>� ������������� ������������ ����������<br/>� ������������ ���������� ��������<br/>29.03.2012 �25</div>
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
                                        <tr><td>&nbsp</td><td class="subscript">������������ ����������� (�����,������)</td><td>&nbsp</td></tr>
                                    </tbody>
                                    </table>
                                    <br />
                                    <table class="data" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="rectangle"><td colspan="7"><b>�������</b></td></tr>
                                        <tr class="rectangle">
                                            <td rowspan="2">����� ��������</td>
                                            <td rowspan="2">���������������<br/>����</td>
                                            <td rowspan="2">��������<br/>�����</td>
                                            <td colspan="2">����� ����</td>
                                            <td rowspan="2">�����</td>
                                            <td rowspan="2">�����<br/>����������</td>
                                        </tr>
                                        <tr class="rectangle">
                                            <td>1-� �����</td>
                                            <td>2-� �����</td>
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
                                                <td colspan="5"><b>��������</b></td> 
                                            </tr>
                                            <tr class="rectangle">
                                                <td>�<br/>����-<br/>��</td>
                                                <td>�������, ��������</td>
                                                <td>���������<br/>�����,<br/>�����</td>
                                                <td style="width:30mm;">�����<br/>�������������<br/>�������������</td>
                                                <td style="width:50mm;">�������� �� ���������<br/>�������� � ����������<br/>�������, �������(�����)</td>
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
                                                <td colspan="3">����������</td>
                                                <td colspan="3" rowspan="6" style="text-align:left;">
                                                    ������������ ������������� ��������, ������������.<br/>
                                                    ������ ������� __________�<br/>
                                                    �������(�����) ���������� _______________<br/>
                                                    ������������ ������������� ��������, ������������.<br/>
                                                    ������ ������� __________�<br/>
                                                    �������(�����) ���������� _______________<br/>
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
                                                <td class="pre-lined">�������&nbsp;����&nbsp;��������&nbsp;�</td>
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
                                                <td class="pre-lined">�.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                    <table class="data" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr class="rectangle">
                                                <td colspan="5" style="font-weight:bold;">������ �������� � ��������</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td rowspan="2">��������</td>
                                                <td rowspan="2">���������<br/>����������</td>
                                                <td colspan="2">����(�����,�����),<br/>�����(�,���)</td>
                                                <td>����� ������, �</td>
                                            </tr>
                                            <tr>
                                                <td>�� �������</td>
                                                <td>����������</td>
                                                <td>���������</td>
                                            </tr>
                                            <tr>
                                                <td>16</td>
                                                <td>17</td>
                                                <td>18</td>
                                                <td>19</td>
                                                <td>20</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left">����� �� �����</td>
                                                <td><span class="dataText"><%Response.Write(DepartureKm()); %></span>&nbsp;</td><td><span class="dataText"><%Response.Write(DepartureDate("dd.MM.yyyy HH:mm",true)); %></span>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:left">����������� � �����</td>
                                                <td>&nbsp;</td><td><span class="dataText"><%Response.Write(ReturnDate("dd.MM.yyyy HH:mm",true)); %></span>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="data" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr class="rectangle">
                                                <td colspan="8"  style="font-weight:bold;">�������� �������-��������� ����������</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td colspan="6">�������� ���</td>
                                                <td colspan="2">������� �������, �</td>                                                
                                            </tr>
                                            <tr>
                                                <td>����(�����)<br/>�����)</td>
                                                <td>�����<br/>��������</td>
                                                <td>�����<br/>���</td>
                                                <td>���<br/>�����</td>
                                                <td>����-<br/>������,�</td>
                                                <td>�������<br/>(�����)<br/>��������-<br/>������� ����<br/>(� ���� ���)</td>
                                                <td>���<br/>������</td>
                                                <td>���<br/>��������-<br/>���</td>
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
                                                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td colspan="2">�������(�����)</td>
                                            </tr>
                                             <tr>
                                                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>
                                                 �������</td><td>�������</td>
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
                            <td colspan="24"><b>���������� �������</b></td>
                        </tr>
                        <tr class="rectangle">
                            <td rowspan="4">������������<br/>��������� ������<br/>��������(��������)</td>
                            <td rowspan="4">��� ���-<br/>���-<br/>��</td>
                            <td rowspan="4">� ������</td>
                            <td colspan="2">�������</td>
                            <td colspan="2" rowspan="2">��������� ������</td>
                            <td colspan="2" rowspan="3">����� �� ��������, �, ���</td>
                            <td colspan="4">������ � �����������, ��</td>
                            <td colspan="4">���������� ����������</td>
                            <td colspan="7">������� �� ������� ������� � �� ������ ������, ���.</td>
                        </tr>
                        <tr class="rectangle">
                            <td rowspan="3">�����</td>
                            <td rowspan="3">��-<br/>���-<br/>��, ���.</td>  
                            <td rowspan="3">�����</td>       
                            <td colspan="3" rowspan="2">� ��� ����� �� ����������</td>  
                            <td rowspan="3">�����</td>       
                            <td colspan="3">� ��� �����</td>      
                            <td colspan="3">���������</td>  
                            <td colspan="3">�� ���������</td>
                            <td rowspan="3">�������<br/>(�����)<br/>����������-<br/>���� ����</td>        
                        </tr>
                        <tr class="rectangle">
                            <td rowspan="2">�����</td>
                            <td rowspan="2">�� �� �������</td>
                            <td rowspan="2">��������<br/>���������</td>
                            <td rowspan="2">�� ��</td>
                            <td rowspan="2">� ��</td>
                            <td rowspan="2">�����</td>
                            <td colspan="2">� ��� �����</td>
                            <td rowspan="2">�����</td>
                            <td colspan="2">� ��� �����</td>
                        </tr>
                        <tr class="rectangle">
                            <td>��</td>
                            <td>��</td>
                            <td>��</td>
                            <td>���</td>
                            <td>���-<br/>�������� ����-<br/>������</td>
                            <td>�������� ���������</td>
                            <td>�� �����</td>
                            <td>�������� ���������</td>
                            <td>�� �����</td>
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
                                <td style="width:25%">������� ���������� ��������.</td>
                                <td style="width:25%">������� � ���������� ���������</td>
                                <td style="width:25%">������� ����.</td>
                                <td style="width:25%">������� ������.</td>
                            </tr>
                            <tr>
                                <td>����� ��������.</td>
                                <td>��������� ������.</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>�������(�����) �������� ______________</td>
                                <td>������� �������� ______________</td>
                                <td>������� �������� ______________</td>
                                <td>�������(�����) �������� ______________</td>
                                
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
                                                    <td colspan="8"><b>�������� �������� �� �����</b></td>
                                                </tr>
                                                <tr class="rectangle">
                                                    <td rowspan="2">����� ����� ���������</td>
                                                    <td rowspan="2">�����, �, ���</td>
                                                    <td colspan="2">�������</td>
                                                    <td rowspan="2">����� ����� ���������</td>
                                                    <td rowspan="2">�����, �, ���</td>
                                                    <td colspan="2">�������</td>
                                                </tr>
                                                <tr class="rectangle">
                                                    <td>����</td>
                                                    <td>������</td>
                                                    <td>����</td>
                                                    <td>������</td>
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
                                                <tr><td align="center" style="font-size:11pt;"><b>������� ��������� ���������</b></td></tr>
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
                                <tr class="rectangle"><td colspan="10"><b>������������������ ���������� �������</b></td><td colspan="4">&nbsp</td></tr>
                                <tr class="rectangle">
                                    <td rowspan="3">� ������</td>
                                    <td colspan="5">����������� � ���������� ������, �, ���</td>
                                    <td rowspan="3" colspan="2">������������ �������������<br/>������ (������, �����,<br/>����������� �������)</td>
                                    <td rowspan="3">� ������</td>
                                    <td colspan="5">����������� � ��������� ������, �, ���</td>
                                </tr>
                                <tr class="rectangle">
                                    <td colspan="2">����� ��������</td>
                                    <td colspan="2">����� �����������</td>
                                    <td rowspan="2">�������<br/>(�����)<br/>����������</td>
                                    <td colspan="2">����� ��������</td>
                                    <td colspan="2">����� �����������</td>
                                    <td rowspan="2">�������<br/>(�����)<br/>����������</td>
                                </tr>
                                <tr class="rectangle">
                                    <td>�� ����������</td>
                                    <td>����������</td>
                                    <td>�� ����������</td>
                                    <td>����������</td>
                                    <td>�� ����������</td>
                                    <td>����������</td>
                                    <td>�� ����������</td>
                                    <td>����������</td>
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
                                                <td colspan="11"><b>���������� ������</b></td>                                                
                                            </tr>
                                            <tr class="rectangle">
                                                <td rowspan="3">�<br/>����-<br/>��</td>
                                                <td rowspan="2" colspan="2">������ �������, �</td>
                                                <td colspan="7">����� � ������, �</td>
                                                <td rowspan="3">�������<br/>(�����)<br/>�����-<br/>�����-<br/>���� ����</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td rowspan="2">�����</td>
                                                <td colspan="4">� ��� �����</td>
                                                <td rowspan="2">���-<br/>���</td>
                                                <td rowspan="2">�����-<br/>������</td>
                                            </tr>
                                            <tr class="rectangle">
                                                <td>��<br/>���-<br/>��</td>
                                                <td>����</td>
                                                <td>��<br/>��-<br/>���</td>
                                                <td>��<br/>�����-<br/>��</td>
                                                <td>� �������</td>
                                                <td>� �������</td>
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
                                                    <td colspan="12"><b>������ �������</b></td>
                                                </tr>
                                                <tr class="rectangle">
                                                    <td rowspan="2">������������</td>
                                                    <td rowspan="2">���</td>
                                                    <td colspan="2">����, �����,<br/>�,���</td>
                                                    <td rowspan="2">�<br/>������</td>
                                                    <td rowspan="2">�������<br/>(�����)<br/>�����-<br/>�����-<br/>���� ����</td>    
                                                    <td rowspan="2">������������</td>
                                                    <td rowspan="2">���</td>
                                                    <td colspan="2">����, �����,<br/>�,���</td>
                                                    <td rowspan="2">�<br/>������</td>
                                                    <td rowspan="2">�������<br/>(�����)<br/>�����-<br/>�����-<br/>���� ����</td>                                                
                                                </tr>
                                                <tr class="rectangle">
                                                    <td>��</td>
                                                    <td>��</td>
                                                    <td>��</td>
                                                    <td>��</td>
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
