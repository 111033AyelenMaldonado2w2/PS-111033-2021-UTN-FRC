using PS_motPress.Conexion;
using PS_motPress.Models.Fecha;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class FechaController : Controller
    {
        // GET: Fecha
        public ActionResult FecGestion()
        {
            return View();
        }

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult ultimaFecha()
        {
            string rta = AccesoDatos.obtenerUltimaFecha();
            return Json(rta);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult PrimeraFecha()
        {
            string rta = AccesoDatos.obtenerPrimeraFecha();
            return Json(rta);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult nuevoAnio(string fecha)
        {
            bool rta = AccesoDatos.cargaDeCalendario(fecha);
            if (rta)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(rta);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult busquedaFecha(DateTime Date)
        {
            ClsFecha f = null;
            f = AccesoDatos.tomarFecha(Date);
            if (f.fFecha != null)
            {
                return Json(f);
            }
            return Json(Date);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult modificarFecha(ClsFecha f)
        {
            bool resultado = false;
            resultado = AccesoDatos.cambiosFechas(f);
            if (resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(f);
        }
        public ActionResult FecCambioVto()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult traerFechaActual(DateTime fecha)
        {
            List<ClsFecha> lista = null;
            lista = AccesoDatos.traerFechaActual(fecha);
            if (lista != null)
            {
                return Json(lista);
            }
            return Json(fecha);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult traerFechaDisp(DateTime fecha)
        {
            List<ClsFecha> lista = null;
            lista = AccesoDatos.traerFechaDisponible(fecha);
            if (lista != null)
            {
                return Json(lista);
            }
            return Json(fecha);
        }

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult actualizarVto(DateTime fecha, DateTime fechaNueva)
        {
            bool resultado = false;
            resultado = AccesoDatos.actualizarVencimientos(fecha, fechaNueva);
            if (resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(fecha);

        }
    }
}