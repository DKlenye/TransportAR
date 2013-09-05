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
выдано <span style="text-decoration: underline; font-weight: bold;"> <xsl:value-of select="input[@name='_fuel']/@value" /> </span>
</div>
<br/>
<div style="text-align: center; text-decoration: underline; font-weight: bold;" id="numericToString"></div>
<br/>
<div style="text-align: center;">
выдачу произвел _________________________ 
</div>

</xsl:template>

</xsl:stylesheet>