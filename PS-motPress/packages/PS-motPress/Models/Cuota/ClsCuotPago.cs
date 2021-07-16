using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Cuota
{
    public class ClsCuotPago
    {
        public string cpNombre { set; get; }
        public string cpApellido { set; get; }
        public string cpDocumento { set; get; }
        public string cpCuit { set; get; }
        public string cpTel { set; get; }
        public int cpPres_Id { set; get; }
        public decimal cpPresContratoNro { set; get; }
        public int cpCli_id { set; get; }
        public string cpPresMontoSolicitado { set; get; }
        public string cpPresMontoSolicitado1 { set; get; }
        public int cpPresPlan { set; get; }
        public int cpPresCanCuotas { set; get; }
        public decimal cpPresPorcMensual { set; get; }
        public DateTime cpPresFecha { set; get; }
        public DateTime cpPresFechaPrimeraCuota { set; get; }
        public int cpPresDiadelMesCuota { set; get; }
        public string cpPresIntervaloCobranza { set; get; }
        public DateTime cpPresFecaud { set; get; }
        public string cpPresUsuario { set; get; }
        public int cpPresEstado { set; get; }
        public int cpCuoId { set; get; }
        public decimal cpCuoPrestamosId { set; get; }
        public int cpCuoNroCuota { set; get; }
        public string cpCuoImporteCpital { set; get; }
        public string cpCuoImporteInterese { set; get; }
        public DateTime cpCuoFechaVencimiento { set; get; }
        public string cpCuoImporteCuota { set; get; }
        public decimal cpCuoSaldoImpago1 { set; get; }
        public string cpCuoSaldoImpago { set; get; }
        public DateTime cpCuoFechaCobro { set; get; }
        public string cpCuoImporteCobrado { set; get; }
        public decimal cpCuoIInteresMora { set; get; }
        public decimal cpCuoNroRecibo { set; get; }
        public int cpCuoNroCobrador { set; get; }
        public string cpCuoObservaciones { set; get; }
        public int cpCuoEstado { set; get; }
        public decimal cpAdelanto1 { set; get; }
        public string cpAdelanto { set; get; }
        public DateTime cpCuoFecaUd { set; get; }
        public string cpCuoUsuario { set; get; }
        public bool cpCheckSaldo { set; get; }
    }
}