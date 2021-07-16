using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Producto
{
    public class ClsProductoModal
    {
        public int cpIdProd { set; get; }
        public string cpNombre { set; get; }
        public string cpPrecio { set; get; }
        public string cpMarca { set; get; }
        public string cpImgMIni { set; get; }
        public string cpImgMax { set; get; }
        public string cpAnio { set; get; }
        public string cpTipo { set; get; }
        public string pDescripcion { set; get; }
        public string pCilindrada { set; get; }
        public string pMotor { set; get; }
        public string pCaja { set; get; }
        public string pArranque { set; get; }
        public string pKilometros { set; get; }
        public string pCombustible { set; get; }
        public string pColor { set; get; }
    }
}