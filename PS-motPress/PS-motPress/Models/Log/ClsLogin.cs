using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PS_motPress.Models.Log
{
    public class ClsLogin
    {
        public string lUsuario { set; get; }
        public string lContra { set; get; }
        public  string lRol { set; get; }
        public int lIdRol { set; get; }
        public string lFuncion { set; get; }
        public int lIdFuncion { set; get; }
        public string lNombre { set; get; }
        public string lApellido { set; get; }
        public int lEstado { set; get; }
    }
}