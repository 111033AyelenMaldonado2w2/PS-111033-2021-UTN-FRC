using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Producto
{
    public class ClsProducto
    {
        public int idProducto { set; get; }
        public string pNombre { set; get; }
        public string pModelo { set; get; }
        public int pIdMarca { set; get; }
        public string pMarca { set; get; }
        public string pDescripcion { set; get; }
        public string pPrecio { set; get; }
        public string pCilindrada { set; get; } 
        public string pMotor { set; get; }
        public int pIdCaja { set; get; }
        public string pCaja { set; get; }
        public string pArranque { set; get; }
        public string pKilometros { set; get; }
        public string pCombustible { set; get; }
        public int pIdTipo { set; get; }
        public string pTipo { set; get; }
        public byte[] pRuta { set; get; }
        public byte[] pImage { set; get; }
        public string pImgMiniatura { set; get; }
        public string pImgCompleta { set; get; }
        public int pIdColor { set; get; }
        public string pColor { set; get; }
    }
}