using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Prestamo
{
    public class ClsPrestamo
    {
        public int pId { set; get; }
        public int pNroContrato { set; get; }
        public int pClidId { set; get; }
        public string pMontoSolicitado { set; get; }
        public int pPlan { set; get; }
        public string pInteres { set; get; }
        public DateTime pFechaContrato { set; get; }
        public DateTime pFechaPrimeraCuota { set; get; }
        public int pDiaVencimiento { set; get; }
        public int pTipoCobro { set; get; }
        public int pEstado { set; get; }
        public DateTime pFechaUs { set; get; }
        public string pUsuario { set; get; }
        public int nroCuota { set; get; }
        public string capital { set; get; }
        public string interes { set; get; }
        public string gastos { set; get; }
        public string seguro { set; get; }
        public string sellado { set; get; }
        public string fecha { set; get; }
        public string capFinal { set; get; }
        public string intFinal { set; get; }
        public int pIdMoto { set; get; }
        public string pNotas { set; get; }
        public string pDeuda { set; get; }
        public string pEntrega { set; get; }
    }
}