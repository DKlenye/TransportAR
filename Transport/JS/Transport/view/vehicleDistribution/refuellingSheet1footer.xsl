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
всего по ведомости No <span style="text-decoration: underline; font-weight: bold;"><xsl:value-of select="input[@name='_sheet']/@value" /></span>
выдано <span style="text-decoration: underline; font-weight: bold;">

    <xsl:if test="input[@name='_fuel']/@value[.='1']">
        АИ 92
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='2']">
        АИ 95
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='3']">
        Диз. топливо
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='4']">
        Нормаль 80
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='5']">
        Газ
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='7']">
        Керосин
    </xsl:if>

    <xsl:if test="input[@name='_fuel']/@value[.='6']">
        М8В
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='8']">
        М10Г2К
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='9']">
        И-20
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='10']">
        Ad Blue
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='11']">
        10W40
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='12']">
        ТИ 5-2
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='13']">
        Тосол
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='14']">
        Литол
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='15']">
        Циатим (0,8)
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='16']">
        Смазка графитная
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='17']">
        Антифриз
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='18']">
        Смазка Итмол
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='19']">
        Масло TNK ATF IID
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='20']">
        Гарант 5W40
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='21']">
        Champion 5W40
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='22']">
        Гарант 5w40  (1 л)
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='23']">
        Chаmpion 10w40(л)
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='25']">
        ТИ 5-1
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='26']">
        Катализатор "ИОН-Б"
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='27']">
        Солидол
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='28']">
        Champion Eco Flow 0W40 FE
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='29']">
        Циатим (0,9)
    </xsl:if>
    <xsl:if test="input[@name='_fuel']/@value[.='30']">
        Гарант 5W40 (л, 29900864)
    </xsl:if>
	
	<xsl:if test="input[@name='_fuel']/@value[.='33']">
        масло чемпион 10w40
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='34']">
        Champion 5W40 (л)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='35']">
        Champion Eco Flow 0W40 FE (л)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='36']">
        М10Г2К (л)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='37']">
        М8В (л)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='38']">
        И-20 (л)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='39']">
        ТИ 5-1 (л)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='40']">
       ТИ 5-2 (л)
    </xsl:if>
	<xsl:if test="input[@name='_fuel']/@value[.='41']">
        Масло TNK ATF IID (л)
    </xsl:if>


</span>
</div>
<br/>
<div style="text-align: center; text-decoration: underline; font-weight: bold;" id="numericToString"></div>
<br/>
<div style="text-align: center;">
выдачу произвел _________________________ 
</div>

</xsl:template>

</xsl:stylesheet>