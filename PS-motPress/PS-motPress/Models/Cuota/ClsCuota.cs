using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Cuota
{
    public class ClsCuota
    {
        public int cPrestId { set; get; }
        public string cDesc { set; get; }
        public int cNroCuota { set; get; }
        public string cImpCapital { set; get; }
        public string cImpInteres { set; get; }
        public DateTime cVencCuota { set; get; }
        public string cImpCuota { set; get; }
        public string cSaldoImpago { set; get; }
        public DateTime cFechaPago { set; get; }
        public string cImpCobrado { set; get; }
        public int cNroRecibo { set; get; }
        public decimal cIntMora { set; get; }
        public int cEstado { set; get; }
    }
}