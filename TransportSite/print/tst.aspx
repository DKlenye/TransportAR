<%@ Page Language="C#" AutoEventWireup="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251"/>
    <title></title>
    <link href="WaybillTemplate.css" rel="stylesheet" type="text/css"/>
    
	<link rel="stylesheet" type="text/css" href="WaybillTemplate_IE.css" />
    
    
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
    .second .ticket td{
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

</style>
    
</head>
<body>
    <form id="form1" runat="server">

        <table class="waybill-page first" cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="height:100%">
                <td>
                
                <tr style="height:100%">
                <td class="waybill">
                     <table cellspacing="0" cellpadding="0" style="height:100%">
                        <tbody>                            
                            <tr style="height:1mm;">
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td align="center">&nbsp;</td>
                                                <td style="width:135mm;">
                                                    <table class="data" cellpadding="0" cellspacing="0" style="border-bottom-width:0px">
                                                        <tbody>
                                                            <tr class="header rectangle">
                                                                <td>����� ������������ ��������</td>
                                                                <td colspan="5"><b>������ �������� � ��������</b></td>
                                                            </tr>
                                                            <tr class="header rectangle">
                                                                <td>1</td>
                                                                <td rowspan="2">��������</td>
                                                                <td colspan="2">�����, ���., ���.</td>
                                                                <td rowspan="2">���������<br/>����������</td>
                                                                <td rowspan="2">�������<br/>��������<br/>(����������)</td>
                                                            </tr>
                                                            <tr class="rectangle">
                                                                <td rowspan="2">&nbsp;</td>
                                                                <td>�� �������</td>
                                                                <td>����������</td>
                                                            </tr>
                                                            <tr class="rectangle">
                                                                <td style="width:25mm">9</td>
                                                                <td style="width:19mm">10</td>
                                                                <td style="width:19mm">11</td>
                                                                <td style="width:16mm">12</td>
                                                                <td style="width:20mm">13</td>
                                                            </tr>
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
                                    <table class="data" cellpadding="0" cellspacing="0" style="border-bottom-width:0px">
                                        <tbody>
                                            <tr class="header">
                                                <td class="rectangle" rowspan="2">�����<br/>��������</td>
                                                <td class="rectangle" rowspan="2">���������-<br/>������<br/>�����</td>
                                                <td class="rectangle" rowspan="2">�����</td>
                                                <td class="rectangle" rowspan="2">��������<br/>�����</td>
                                                <td class="rectangle" rowspan="2">����<br/>������</td>
                                                <td class="rectangle" rowspan="2">����<br/>��������</td>
                                                <td class="rectangle" rowspan="2">���<br/>������</td>
                                                <td class="rectangle" style="width:25mm; text-align:left;">����� �� �����</td>
                                                <td style="width:19mm;font-size:7pt;">&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td style="width:19mm">&nbsp;</td>
                                                <td style="width:16mm">&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td style="width:20mm">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td class="rectangle" rowspan="2" style="text-align:left;">����������</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td class="rectangle">2</td>
                                                <td class="rectangle">3</td>
                                                <td class="rectangle">4</td>
                                                <td class="rectangle">5</td>
                                                <td class="rectangle">6</td>
                                                <td class="rectangle">7</td>
                                                <td class="rectangle">8</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                             <tr>
                                                <td style="font-size:7pt;">&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td style="border-right: 1px solid black">&nbsp;</td>
                                                <td class="rectangle" style="text-align:left;">�������. � �����</td>
                                                <td style="font-size:7pt;">&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style="height:1mm">
                                <td>
                                    <table class="data"  cellpadding="0" cellspacing="0" style="border-bottom-width:0px">
                                        <tbody>
                                            <tr class="header rectangle">
                                                <td colspan="5"><b>��������</b></td>
                                                <td colspan="10"><b>�������� ��������-��������� ���������� (���)</b></td>
                                            </tr>
                                            <tr class="header rectangle">
                                                <td rowspan="2">���-<br/>��</td>
                                                <td rowspan="2" style="width:40mm">�������, �., �.</td>
                                                <td rowspan="2">�����<br/>�������������<br/>�������������</td>
                                                <td rowspan="2">���������<br/>�����</td>
                                                <td rowspan="2">��-<br />
                                                    ��� ����-<br />
                                                    ��</td>
                                                <td colspan="6">�������� ���</td>
                                                <td colspan="2">������� �������</td>
                                                <td rowspan="2">�����.<br/>�����.<br/>���-<br/>��</td>
                                                <td rowspan="2">�����<br/>������<br/>�����-<br/>����</td>
                                            </tr>
                                            <tr class="header rectangle">
                                                <td>���-<br/>��</td>
                                                <td>����� ��������</td>
                                                <td>����� ���</td>
                                                <td>��� �����</td>
                                                <td>����-<br />���-<br />���, � (��)</td>
                                                <td>�������<br />����������<br />(� ���� ���)</td>
                                                <td>��� ������</td>
                                                <td>��� ������-<br/>�����</td>
                                            </tr>
                                            <tr class="header rectangle">
                                                <td>14</td>
                                                <td>15</td>
                                                <td>16</td>
                                                <td>17</td>
                                                <td>18</td>
                                                <td>19</td>
                                                <td>20</td>
                                                <td>21</td>
                                                <td>22</td>
                                                <td>23</td>
                                                <td>24</td>
                                                <td>25</td>
                                                <td>26</td>
                                                <td>27</td>
                                                <td>28</td>
                                            </tr>
                                             <tr>
                                                <td rowspan="2">1</td>
                                                <td style="font-size:7pt;">&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>1</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td style="font-size:7pt;">&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="font-size:7pt;">&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>&nbsp;<span class="dataText">&nbsp;</span></td>
                                                <td>2</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td style="border-bottom: 1px solid black">&nbsp;</td>
                                                <td style="border-bottom: 1px solid black">&nbsp;</td>
                                                <td style="border-bottom: 1px solid black">&nbsp;</td>
                                                <td style="border-bottom: 1px solid black">&nbsp;</td>
                                            </tr>
                                            <tr class="header">
                                                <td rowspan="3">2</td>
                                                <td rowspan="2">&nbsp;</td>
                                                <td rowspan="2">&nbsp;</td>
                                                <td rowspan="2">&nbsp;</td>
                                                <td rowspan="2">3</td>
                                                <td rowspan="2">&nbsp;</td>
                                                <td rowspan="2">&nbsp;</td>
                                                <td rowspan="2">&nbsp;</td>
                                                <td rowspan="2">&nbsp;</td>
                                                <td rowspan="2">&nbsp;</td>
                                                <td rowspan="2" style="border-right:1px solid black;">&nbsp;</td>
                                                <td colspan="4" class="rectangle">�������</td>
                                              </tr>
                                                <tr>
                                                <td class="rectangle">�������</td>
                                                <td class="rectangle">�������</td>
                                                <td class="rectangle" colspan="2">���������</td>
                                              </tr>
                                             <tr>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>4</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
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
                         </tbody>
                     </table>
                </td>
                
                </td>
            </tr>
        </tbody>
    </table>

    <div class="page-separator"></div>
    <div class="page-break"></div>

    <table class="waybill-page second" cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="height:100%">
                    <td>man</td>
                </tr>
            </tbody>
        </table>
    </form>   
</body>

</html>
