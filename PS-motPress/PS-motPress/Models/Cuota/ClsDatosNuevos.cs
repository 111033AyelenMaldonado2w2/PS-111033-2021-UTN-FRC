using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Cuota
{
    public class ClsDatosNuevos
    {
        public string cliNombre { set; get; }
        public string cliApellido { set; get; }
        public string cliDoc { set; get; }
        public int presContrato { set; get; }
        public int presEstado { set; get; }
        public string presEstadoDesc { set; get; }
        public DateTime presConcesion { set; get; }
        public int presPlan { set; get; }
        public double presMontoSolicitado { set; get; }
        public double presCapitalFinanciado { set; get; }
        public decimal  presImporteCobrado { set; get; }
        public decimal presPorcInt { set; get; }
        public string presIntervalo { set; get; }
        public int presCantCuotasCobradas { set; get; }
        public string presNombreMoto { set; get; }
        public string presMarcaMoto { set; get; }
        public string presNota { set; get; }
    }
}