using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Fecha
{
    public class ClsFecha
    {
        public int fFechaId { set; get; }
        public DateTime fFecha { set; get; }
        public DateTime fFechaFin { set; get; }
        public int fFechaDia { set; get; }
        public int fFechaMes { set; get; }
        public int fFechaAnio { set; get; }
        public DateTime fFechaPrimerDiaMes { set; get; }
        public DateTime fFechaDiaMesSiguiente { set; get; }
        public DateTime fFechaUltDiaMesAnterior { set; get; }
        public string fFechaTipoDia { set; get; }
        public int fFechaEstado { set; get; }
        public string fNota { set; get; }
    }
}