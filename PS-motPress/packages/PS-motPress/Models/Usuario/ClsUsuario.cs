using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Usuario
{
    public class ClsUsuario
    {
        public string uUsuario { set; get; }
        public string uNombre { set; get; }
        public string uApellido { set; get; }
        public string uClave { set; get; }
        public string uDocumento { set; get; }
        public string uCUIT{ set; get; }
        public int uIdRol { set; get; }
        public int uIdFuncion { set; get; }
        public string uEmail { set; get; }
        public string uTel { set; get; }
        public int uIdEstado { set; get; }
        public string uRol { set; get; }
        public string uFuncion { set; get; }
        public string uEstado { set; get; }
        public string uUsuarioActual { set; get; }
        public DateTime uFechaMod { set; get; }
    }
}