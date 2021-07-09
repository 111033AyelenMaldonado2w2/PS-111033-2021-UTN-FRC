using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Prestamo
{
    public class ClsDatosPrestamo
    {
        public int dpNroContrato { set; get; }
        public string dpMontoSolicitado { set; get; }
        public int dpPlan { set; get; }
        public decimal dpPorcej { set; get; }
        public DateTime dpFecha { set; get; }
        public DateTime dpPrimeraCuota { set; get; }
        public int dpDiaVencim { set; get; }
        public string dpSistema { set; get; }
        public string dpIntervaloCobro { set; get; }
        public DateTime dpFechaModif { set; get; }
        public string dpUsuario { set; get; }
        public string dpApellidoCliente { set; get; }
        public int dpEstadoPrestamo { set; get; }
        public string dpEstado { set; get; }
        public string dpCapitalFinanciado { set; get; }
        public string dpImporteCobrado { set; get; }
        public int dpCuotasCobradas { set; get; }
        public int dpNroCuota { set; get; }
        public string dpCuoImpCap { set; get; }
        public string dpCuoImpInteres { set; get; }
        public string dpCuoSaldoImpago { set; get; }
        public int dpEstadoCuota { set; get; }
        public DateTime dpCuoFechaVenc { set; get; }
        public string dpImporCuota { set; get; }
        public string pImporteCobrado { set; get; }
        public string dpMarcaMoto { set; get; }
        public string dpNombreMoto { set; get; }
        public int pIDproducto { set; get; }
        public string dpNota { set; get; }
        public double dpEntrega { set; get; }
    }
}