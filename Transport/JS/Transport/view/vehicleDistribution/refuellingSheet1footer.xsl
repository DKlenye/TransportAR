<?xml version='1.0' encoding="Windows-1251"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">


<!-- 
      <root>
-->
<xsl:template match="/">
<xsl:apply-templates />
</xsl:template>

<xsl:template match="parameters">
<div style="text-align: center;">
����� �� ��������� No <span style="text-decoration: underline; font-weight: bold;"><xsl:value-of select="input[@name='_sheet']/@value" /></span>
������ <span style="text-decoration: underline; font-weight: bold;">

    <xsl:if test="input[@name='_fuel']/@value[.='1']">
        �� 92
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='2']">
        �� 95
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='3']">
        ���. �������
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='4']">
        ������� 80
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='5']">
        ���
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='7']">
        �������
    </xsl:if>

    <xsl:if test="input[@name='_fuel']/@value[.='6']">
        �8�
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='8']">
        �10�2�
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='9']">
        �-20
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='10']">
        Ad Blue
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='11']">
        10W40
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='12']">
        �� 5-2
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='13']">
        �����
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='14']">
        �����
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='15']">
        ������ (0,8)
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='16']">
        ������ ���������
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='17']">
        ��������
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='18']">
        ������ �����
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='19']">
        ����� TNK ATF IID
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='20']">
        ������ 5W40
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='21']">
        Champion 5W40
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='22']">
        ������ 5w40  (1 �)
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='23']">
        Ch�mpion 10w40(�)
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='25']">
        �� 5-1
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='26']">
        ����������� "���-�"
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='27']">
        �������
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='28']">
        Champion Eco Flow 0W40 FE
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='29']">
        ������ (0,9)
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='30']">
        ������ 5W40 (�, 29900864)
    </xsl:if>
	
	<xsl:if test="input[@name='_fuel']/@value[.='33']">
        ����� ������� 10w40
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='34']">
        Champion 5W40 (�)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='35']">
        Champion Eco Flow 0W40 FE (�)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='36']">
        �10�2� (�)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='37']">
        �8� (�)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='38']">
        �-20 (�)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='39']">
        �� 5-1 (�)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='40']">
       �� 5-2 (�)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='41']">
        ����� TNK ATF IID (�)
    </xsl:if>


</span>
</div>
<br/>
<div style="text-align: center; text-decoration: underline; font-weight: bold;" id="numericToString"></div>
<br/>
<div style="text-align: center;">
������ �������� _________________________ 
</div>

</xsl:template>

</xsl:stylesheet>