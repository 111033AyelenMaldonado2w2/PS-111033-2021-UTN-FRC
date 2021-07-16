using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Reporte
{
    public class ClsReporte
    {
        public int rCliId { set; get; }
        public string rCliNombre { set; get; }
        public string rApellido { set; get; }
        public string rDocumento { set; get; }
        public string rCuit { set; get; }
        public string rTel { set; get; }
        public string rMail { set; get; }
        public int rCuoId { set; get; }
        public decimal rCuoPrestId { set; get; }
        public int rCuoNroCuota { set; get; }
        public DateTime rCuoFechaVencimiento { set; get; }
        public decimal rCuoImporteCuota { set; get; }
        public decimal rSaldoImpago { set; get; }
        public DateTime rFechaCobro { set; get; }
        public decimal rCuoImporteCobrado { set; get; }
        public decimal rCuoNroRecibo { set; get; }
        public int rCuoEstado { set; get; }
        public decimal rCuoAdelanto { set; get; }
        public int rParametroId { set; get; }
        public string rParametroNombre { set; get; }
        public int rsProcesoId { set; get; }
        public string rsNombCliente { set; get; }
        public decimal rsMontoSolicitado { set; get; }
        public string rsPlazo { set; get; }
        public decimal rsPorcInt { set; get; }
        public decimal rsCuotaPura { set; get; }
        public decimal rsIntCalculado { set; get; }
        public DateTime rsFechaCuota { set; get; }
        public int rsNroCuota { set; get; }
        public string paSistema { set; get; }
        public string paIntervaloCobro { set; get; }
        public string paUsuario { set; get; }
        public DateTime paFecha { set; get; }
        public int paEstado { set; get; }
        public string descripcion { set; get; }
        public string tipoCobro { set; get; }
    }
}