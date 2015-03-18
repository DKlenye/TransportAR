﻿namespace Transport.Models.service
{
    /// <summary>
    /// Статья затрат по расчётам тарифов из постановления Минтранса соответствующий определенной марке
    /// </summary>
    public enum TariffCostItemType
    {
        /// <summary>
        /// Коэффициент для зароботной платы вспомогательных рабочих
        /// </summary>
        ЗП = 1,

        /// <summary>
        ///  Коэффициент по ТО
        /// </summary>
        МЗ = 2,

        /// <summary>
        /// Норма  расхода  смазочных  и  других  эксплуатационных  материалов  на 1 рубль  затрат на  топливо
        /// </summary>
        СМ = 3
        
    }
}