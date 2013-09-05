<?xml version='1.0' encoding="Windows-1251"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">

<xsl:script><![CDATA[

var ARRAYMonth = new Array("", "������", "�������", "�����", "������", "���", "����", "����", "�������", "��������", "�������", "������", "�������");

function getStrDate(ADate) {

	var node = SelectSingleNode(ADate);
	var txt = "";
	if (node != null) {
		txt = node.text;
		var ind = parseInt(txt.substr(txt.indexOf(".")+1, 2) , 10);

		txt = "\"" + txt.substring(0,txt.indexOf(".")) + "\" " + ARRAYMonth[ind] + " " + txt.substr(txt.lastIndexOf(".")+1) + " �.";
	}

	return txt;

}

]]></xsl:script>

<!-- 
      <root>
-->
<xsl:template match="/">
<xsl:apply-templates />
</xsl:template>

<xsl:template match="parameters">

<div id="__enclosure1" style="float: right; width: 40%; xborder: 1px solid black; font-weight: normal;">���������� No 1<br/>� ��������� � ������� �����<br/>�����������, ��������� ������������ ���</div>
<div style="clear: both; width:1px; height:1px;"></div>

<div style="text-align: left;">
��� <xsl:value-of select="input[@name='_page']/@value" />
</div>

<div style="text-decoration: underline; text-align: center;">
��� ������
</div>

<br/>
<br/>

<div style="text-align: center;">
��������� N <span id="_sheet" style="text-decoration: underline; font-weight: bold; color: blue;"><xsl:value-of select="input[@name='_sheet']/@value" /></span>
</div>

<div style="text-align: center;">
����� ������ <span style="text-decoration: underline; font-weight: bold; color: blue;"> <xsl:value-of select="input[@name='_fuel']/@value" /> </span>
</div>

<div style="text-align: center; text-decoration: underline; font-weight: bold;">
 <xsl:eval>getStrDate("input[@name='_date']/@value")</xsl:eval>
</div>

<!-- 
-->
<div style="text-align: right;">
<div>��� ������ <span style=" color: blue; width: 23%; padding: 6px 10px; border: 1px solid black; font-weight: bold;"><xsl:value-of select="input[@name='_group']/@value" /></span></div>
<xsl:if test="input[@name='_page']/@value[.='1']">
<div>��� ����� <span style=" color: blue; margin-top: 6px; width: 23%; padding: 6px 10px; border: 1px solid black; font-weight: bold;"> </span></div>
<div>��������� ����� <span style=" color: blue; margin-top: 6px; width: 23%; padding: 6px 10px; border: 1px solid black; font-weight: bold;"> </span></div>
</xsl:if>
</div>

<div>
����������� ������������� ���� <span style="width: 30%; border-bottom: 1px solid black;"> </span>
</div>

</xsl:template>

</xsl:stylesheet>