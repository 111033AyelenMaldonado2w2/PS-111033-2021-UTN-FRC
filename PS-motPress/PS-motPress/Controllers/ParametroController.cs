using PS_motPress.Conexion;
using PS_motPress.Models.Parametro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class ParametroController : Controller
    {
        // GET: Parametro
        public ActionResult ParamGestion()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaCombo(int parametro = 0)
        {

                List<CsMostrarParametro> lista = null;
                lista = AccesoDatos.cargarComboParam();
                return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult BuscarLista(string dominio = "")
        {

                List<CsMostrarParametro> lista = null;
                lista = AccesoDatos.obtenerListaParametrosFiltro(dominio);
                return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult nuevoParametro(CsMostrarParametro p)
        {
            bool resultado = AccesoDatos.registrarParametro(p);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(p);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult editarParam(CsMostrarParametro p)
        {
            bool resultado = AccesoDatos.editarParametro(p);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(p);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult borrarParam(CsMostrarParametro p)
        {
            bool resultado = AccesoDatos.borrarParametro(p);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(p);
        }
    }
}