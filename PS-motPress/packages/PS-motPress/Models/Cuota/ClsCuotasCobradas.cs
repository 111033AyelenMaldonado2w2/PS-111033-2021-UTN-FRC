using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Cuota
{
    public class ClsCuotasCobradas
    {
        public int ccCuoId { set; get; }
        public int ccPrestId { set; get; }
        public int ccnroCuota { set; get; }
        public int ccCliId { set; get; }
        public decimal ccImpCuota { set; get; }
        public DateTime ccFechaCobro { set; get; }
        public decimal ccImportCobrado { set; get; }
        public decimal ccIntMora { set; get; }
        public int ccNroRecibo { set; get; }
        public string ccObserv { set; get; }
        public int ccEstado { set; get; }
    }
}