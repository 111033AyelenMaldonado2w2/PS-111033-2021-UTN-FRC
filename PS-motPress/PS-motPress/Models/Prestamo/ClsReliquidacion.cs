using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Prestamo
{
    public class ClsReliquidacion
    {
        public int rCliId { set; get; }
        public DateTime rFecha { set; get; }
        public decimal rPrestId { set; get; }
        public decimal rPresIdAnterior { set; get; }
        public int rCantCuotas { set; get; }
        public decimal rMontoDeuda { set; get; }
        public decimal rMontoAgregado { set; get; }
        public string rMontoDeuda1 { set; get; }
        public string rMontoAgregado1 { set; get; }
        public DateTime rFechaPrimCuota { set; get; }
        public string rObserv { set; get; }
        public DateTime rFechaMod { set; get; }
        public DateTime rFechaContrato { set; get; }
        public string rUsuarioMod { set; get; }
        public int rEstado { set; get; }
        public string rPresTasa { set; get; }
        public int rDiaVencMes { set; get; }
        public int rIntervaloCobranza { set; get; }
        public decimal rInteres { set; get; }
        public decimal rMontoFinal { set; get; }
        public string rMontoFinal1 { set; get; }
        public int rNroContrato { set; get; }
        public int rCodProd { set; get; }
        public string rNota { set; get; }
        public string rEntrega { set; get; }
    }
}