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
                                                                          <%Response.Write(Stamp()); %>
                        </td>                        
                        
                        <td style="width:80mm;">
                            <table cellspacing="0" cellpadding="0">
                            <tbody>                                                                
                                <tr>
                                    <td style=" text-align:center; font-family: Tahoma; font-size:12pt;">������� ���� �<span><%Response.Write(WaybillNumber()); %></span></td>
                                </tr>                                
                                <tr><td>&nbsp;</td></tr>
                                <tr>
                                    <td style="text-align:center; font-size:12pt;"><b><span><%Response.Write(DepartureDate("dd MMMM yyyy")); %></span>�.</b></td>
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
                                                                    ���������� 2
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    � ���������� � ������� ����������
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    ������������ ����������
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align:left;">
                                                                    ����������
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align:left;">
                                                                    ������ ������������ ��������� �� 08.02.2012 � 213
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
                                            <td colspan="4"><b>����������, ������, ����������</b></td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>����� ����������, �������,<br/>�����������</td>
                                            <td>��������������� ����</td>
                                            <td>�������� �����</td>
                                            <td>��� �����</td>
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
                                            <td colspan="4"><b>��������</b></td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>�������, ��������</td>
                                            <td>��������� �����, �����</td>
                                            <td>����� �������������<br/>�������������</td>
                                            <td style="font-size:7pt;">��������<br/>�� ��������� ��������<br/>� ���������� �������.<br/>�������(�����)</td>                                            
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
                                            <td colspan="6"><b>������ �������� � ����������</b></td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td rowspan="2">��������</td>
                                            <td rowspan="2">���������<br/>����������</td>
                                            <td style="font-size:7pt;" colspan="2">����(�����,�����),�����(���.,���.)</td>                                            
                                            <td colspan="2">����� ������, ���</td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>�� �������</td>
                                            <td>����������</td>
                                            <td>���������</td>
                                            <td style="font-size:6pt;">����-<br/>������������</td>
                                        </tr>
                                        <tr class="header rectangle"><td class="style1">9</td><td class="style1">10</td>
                                            <td class="style1">11</td><td class="style1">12</td><td class="style1">13</td>
                                            <td class="style1">14</td></tr>
                                        <tr><td style="text-align:left; font-size:8pt;">����� �� �����</td><td>&nbsp;<b><span><%Response.Write(DepartureKm()); %></span></b></td><td style="font-size:7pt;">&nbsp;<b><span><%Response.Write(DepartureDate("dd.MM.yyyy HH:mm",true)); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                        <tr><td style="text-align:left; font-size:8pt;">����������� � �����</td><td>&nbsp;</td><td style="font-size:7pt";>&nbsp;<b><span><%Response.Write(ReturnDate("dd.MM.yyyy HH:mm",true)); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table class="data task" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr class="header rectangle">
                                            <td colspan="8"><b>�������� �������-��������� ����������(���)</b></td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td colspan="6">�������� ���</td>
                                            <td colspan="2">������� ���, �</td>
                                        </tr>
                                        <tr class="header rectangle">
                                            <td>����(�����,�����)</td>
                                            <td>�����(������) ��������</td>
                                            <td>����� ���</td>
                                            <td>��� �����</td>
                                            <td>����-<br/>������, �</td>
                                            <td style="font-size:7pt;">�������(�����)<br/>���������������<br/>���� (����� ���� ���)</td>
                                            <td>��� ������</td>
                                            <td>��� �����������</td>
                                        </tr>
                                        <tr class="header rectangle"><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td style="width:18mm;">21</td><td>22</td></tr>
                                        <tr><td style="height:8mm;">&nbsp;</td><td>&nbsp;</td><td style="font-size:7pt;">&nbsp;<b><span><%Response.Write(AllFuelName()); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;<b><span><%Response.Write(AllFuelRemains(false)); %></span></b></td><td>&nbsp;</td></tr>
                                        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td colspan="2">�������(�����)</td></tr>
                                        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>�������</td><td>�������</td></tr>
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
                        <td colspan="9" class="header rectangle"><b>������� ��������</b></td>
                    </tr>
                    <tr class="header rectangle">
                        <td rowspan="2">��������</td>
                        <td colspan="2">����(�����,�����),<br/>�����(���.,���.)</td>
                        <td rowspan="2">����� �����������<br/>(����� ����� ��������)</td>
                        <td rowspan="2">����� ����������<br/>(����� ����� ���������)</td>
                        <td rowspan="2">����������,<br/>��</td>
                        <td rowspan="2">������������ �����</td>
                        <td rowspan="2">���<br/>�����,<br/>�</td>
                        <td rowspan="2">����������<br/>����� � ���-<br/>���,���.</td>
                    </tr>
                    <tr class="header rectangle">
                        <td>��������</td>
                        <td>������</td>
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
                    <tr><td style="font-size:9pt;">&nbsp;<b><span><%Response.Write(CustomerNames()+" "+ObjectNames()); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td><%Response.Write(SrcRoutePoint()); %>&nbsp;</td><td>&nbsp;<%Response.Write(DstRoutPoint()); %></td><td>&nbsp;<%Response.Write(RouteKm()); %></td><td><%Response.Write(CargoName()); %></td><td>&nbsp;</td><td>&nbsp;</td></tr>
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
                        <td class="pre-lined">������&nbsp;�������</td>
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
                                        <td style="text-align:left;">������������&nbsp;�������������&nbsp;��������,&nbsp;�������&nbsp;�����.</td>
                                    </tr>
                                    <tr>
                                        <td>
                                             <table cellpadding="0" cellspacing="0"><tbody>
                                             <tr>
                                                <td class="pre-lined">������&nbsp;�������</td>
                                                <td class="lined">&nbsp;</td>
                                             </tr>
                                             </tbody></table>
 
                                        </td>
                                    </tr>
                                     <tr>
                                     <td>
                                          <table cellpadding="0" cellspacing="0"><tbody>
                                             <tr>
                                               <td class="pre-lined">�������&nbsp;(�����)&nbsp;����������</td>
                                               <td class="lined">&nbsp;</td>
                                             </tr>
                                             </tbody></table>  
                                    </td>                                      
                                    </tr>
                                    <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0"><tbody>
                                             <tr>
                                               <td class="pre-lined">��������������&nbsp;����</td>
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
                                        <td style="text-align:left;">����������&nbsp;����������&nbsp;��������.&nbsp;�����&nbsp;��������.</td>
                                    </tr>                                    
                                     <tr>
                                         <td>
                                              <table cellpadding="0" cellspacing="0"><tbody>
                                                 <tr>
                                                  <td class="pre-lined">�������&nbsp;(�����)&nbsp;��������</td>
                                                  <td class="lined">&nbsp;</td>
                                                 </tr>
                                                 </tbody></table>  
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td style="text-align:left;">����������&nbsp;�&nbsp;����������&nbsp;����������&nbsp;���������&nbsp;������.</td>
                                    </tr>  
                                    <tr>
                                         <td>
                                              <table cellpadding="0" cellspacing="0"><tbody>
                                                 <tr>
                                                    <td class="pre-lined">�������&nbsp;��������</td>
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
                                        <td style="text-align:left;">����������&nbsp;����.</td>
                                    </tr>
                                    <tr>
                                        <td>
                                              <table cellpadding="0" cellspacing="0"><tbody>
                                                 <tr>
                                                    <td class="pre-lined">�������&nbsp;��������</td>
                                                    <td class="lined">&nbsp;</td>
                                                 </tr>
                                                 </tbody></table>  
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td style="text-align:left;">����������&nbsp;������.</td>
                                    </tr>                                      
                                     <tr>
                                        <td>
                                              <table cellpadding="0" cellspacing="0"><tbody>
                                                 <tr>
                                                    <td class="pre-lined">�������&nbsp;(�����)&nbsp;��������</td>
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
                                <td colspan="22"><b>���������� �������</b></td>
                            </tr>
                            <tr class="header rectangle">
                                <td rowspan="2">����(�����,<br/>�����), �����<br/>�������� (�, ���)</td>
                                <td rowspan="2">�������, �������� (���.�) ��������</td>
                                <td rowspan="2" style="width:20mm">��������-<br/>������� ���� �������<br/>(�����������)</td>
                                <td colspan="3">����</td>
                                <td rowspan="2" style="width:20mm;">������� �<br/>������ (�����)<br/>�����-<br/>�����������</td>
                                <td colspan="3">�������� �� �������� ��������</td>
                                <td colspan="2">������</td>
                                <td rowspan="2" style="width:10mm;">�����-<br/>������� ������, �*��</td>
                                <td rowspan="2" style="width:15mm;">����������� ��������� ����� ������� �������</td>
                            </tr>
                            <tr class="header rectangle">
                                <td>������������</td>
                                <td>���, �</td>
                                <td>����� � ���� ���</td>
                                <td>������ ��� ����� �����</td>
                                <td>��������� �����</td>
                                <td>�������� �����</td>
                                <td>� ������</td>
                                <td>��� �����</td>
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
                                <td colspan="22"><b>���������� ������</b></td>
                            </tr>
                            <tr class="header rectangle">
                                <td colspan="3">������ �������, �</td>
                                <td colspan="4">����� � ������, �</td>
                                <td colspan="5">������, ��</td>
                                <td colspan="4">����������, �</td>
                                <td colspan="4">���������, ���</td>
                                <td rowspan="3">����-<br/>������<br/>�����</td>
                                <td rowspan="3">����-<br/>��-<br/>����<br/>���<br/>�<br/>��-<br/>����</td>
                            </tr>
                            <tr class="header rectangle">
                                <td rowspan="2">����� �������</td>
                                <td rowspan="2">��<br/>�����</td>
                                <td rowspan="2">�����-<br/>�����</td>
                                <td rowspan="2">�����</td>
                                <td rowspan="2">� �����-<br/>���</td>
                                <td colspan="2">� �������</td>
                                <td rowspan="2">�����</td>
                                <td colspan="3">� ��� �����<br/>�� ����������</td>
                                <td rowspan="2">� ������</td>
                                <td rowspan="2">�����</td>
                                <td colspan="3">� ��� �����</td>
                                <td rowspan="2">�����</td>
                                <td colspan="3">� ��� �����</td>
                            </tr>
                            <tr class="header rectangle">
                                <td>��� ���-<br/>������-<br/>���-<br/>�������</td>
                                 <td>������</td>
                                   <td>��</td>
                                    <td>���</td>
                                     <td>���-<br/>�����-<br/>���<br/>����-<br/>������</td>
                                      <td>�� ��</td>
                                      <td>� ��</td>
                                      <td>����-<br/>�����</td>
                                      <td>�� ��</td>
                                      <td>� ��</td>
                                      <td>����-<br/>�����</td>
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
                            <tr><td><b><span><%Response.Write(FuelName1()); %></span></b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><td><b><span><%Response.Write(FuelName2()); %></span></b>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
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
                                    <td style="text-align:center">��� ��������:</td>
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
                                    <td colspan="2">������ � ���������</td>
                                    <td colspan="2">��������</td>
                                </tr>
                                <tr class="header rectangle">
                                    <td>�����</td>
                                    <td>������</td>
                                    <td>���</td>
                                    <td>�����</td>
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
                                    <td class="pre-lined">�������&nbsp;(�����).&nbsp;��������</td>
                                    <td class="lined">&nbsp;</td>
                                    <td class="pre-lined">���������</td>
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
                                    <td class="pre-lined">������&nbsp;��&nbsp;�����&nbsp;���</td>
                                    <td class="lined">&nbsp;</td>
                                    <td class="pre-lined">�������</td>
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
