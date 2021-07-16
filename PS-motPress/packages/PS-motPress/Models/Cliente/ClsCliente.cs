using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Cliente
{
    public class ClsCliente
    {
        public int cCliId { set; get; }
        public string cNombre { set; get; }
        public string cApellido { set; get; }
        public string cDocumento { set; get; }
        public string cCUIT { set; get; }
        public string cTel { set; get; }
        public string cEmail { set; get; }
        public string cCalle { set; get; }
        public int cAltura { set; get; }
        public int cIdPais { set; get; }
        public string cPais { set; get; }
        public int cIdProvincia { set; get; }
        public string cProvincia { set; get; }
        public int cIdLocalidad { set; get; }
        public string cLocalidad { set; get; }
        public int cIdBarrio { set; get; }
        public string cBarrio { set; get; }
        public int cCodPostal { set; get; }
        public DateTime cFechaNacimiento { set; get; }
        public int cEstado { set; get; }
        public string cPiso { set; get; } 
        public string cNroDpto { set; get; }
        public string cUsuario { set; get; }
        public DateTime cFechaUsu { set; get; }

        public string nacimiento { set; get; }
        public string fechaNac { set; get; }
        public string cNotaBaja { set; get; }

    }
}