using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Simulador
{
    public class ClsSimulador
    {
        public string sMontoData { set; get; }
        public string sPlanData { set; get; }
        public string sInteresData { set; get; }
        public int sNroCuota { set; get; } 
        public string sInteresCuota { set; get; }
        public string sCapitalCuota { set; get; }
        public string sInteresTotal { set; get; }
        public string sValorCuota { set; get; }
        public string sCapitalAmortizado { set; get; }
        public DateTime sVencimiento { set; get; }
        public string sNombreCliente { set; get; }
        public string sUsuario { set; get; }
        public int sId { set; get; }
        public string sMoto { set; get; }
        public string sModelo { set; get; }
        public decimal sPrecio { set; get; }
        public decimal sEntrega { set; get; }
    }
}