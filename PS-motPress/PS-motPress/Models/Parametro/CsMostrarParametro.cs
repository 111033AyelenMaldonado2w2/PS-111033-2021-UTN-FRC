using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Parametro
{
    public class CsMostrarParametro
    { 
        public int pId { set; get; }
        public string pDescripcion { set; get; } 
        public string pDescripcionCorta { set; get; } 
        public string pDominio { set; get; }
        public string pDomValue { set; get; }
        public string pCod { set; get; }
        public int cantidad { set; get; }
        public int mes { set; get; }
        public int dia { set; get; }
        public int Cantidaddia { set; get; }
        public decimal entrega { set; get; }

    }
}