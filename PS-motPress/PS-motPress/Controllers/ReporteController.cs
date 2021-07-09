using PS_motPress.Conexion;
using PS_motPress.Models.Parametro;
using PS_motPress.Models.Reporte;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class ReporteController : Controller
    {
        // GET: Reporte
        public ActionResult RepBusqueda()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult RepBusqueda(DateTime dia, string solicitud = "", int codigo = 0)
        {
            if (solicitud != "")
            {
                List<ClsReporte> lista = null;
                lista = AccesoDatos.creacionReporte(dia, solicitud, codigo);
                return Json(lista);
            }
            return Json(solicitud);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult busquedaReportes(string solicitud)
        {
            DateTime fecha = new DateTime();
            int codigo = 0;
            string palabra = "";
            if (solicitud != null)
            {
                List<ClsReporte> lista = AccesoDatos.creacionReporte(fecha, solicitud, codigo);
                if (lista != null)
                {
                    return Json(lista);
                }

            }
            return Json(palabra);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult busquedaReportesDoble(string solicitud, int codigo)
        {
            DateTime fecha = new DateTime();
            string palabra = "";
            if (solicitud != null)
            {
                List<ClsReporte> lista = AccesoDatos.creacionReporte(fecha, solicitud, codigo);
                if (lista != null)
                {
                    return Json(lista);
                }

            }
            return Json(palabra);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult busquedaReportePA(int year)
        {
            List<ClsReporte> lista = AccesoDatos.reportePrestamosActivos(year);
            return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult reporMesCobro(int month, int year)
        {
            List<ClsReporte> lista = AccesoDatos.reporteCobroMes(month, year);
            return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult listaSimulaciones(string parametro = "")
        {
            if (parametro != "")
            {
                List<ClsReporte> lista = null;
                lista = AccesoDatos.cargarTodasSimulaciones(parametro);
                return Json(lista);
            }
            return Json(parametro);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult busquedaReportesTriple(string solicitud, DateTime dia)
        {
            string palabra = "";
            int codigo = 0;
            if (solicitud != null)
            {
                List<ClsReporte> lista = AccesoDatos.creacionReporte(dia, solicitud, codigo);
                if (lista != null)
                {
                    return Json(lista);
                }

            }
            return Json(palabra);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult busquedaReporteRango(string solicitud, DateTime diai, DateTime diaf)
        {
            string palabra = "";
            int codigo = 0;
            if (solicitud != null)
            {
                List<ClsReporte> lista = AccesoDatos.reporteRango(solicitud, diai, diaf);
                if (lista != null)
                {
                    return Json(lista);
                }

            }
            return Json(palabra);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaAnios()
        {
            List<CsMostrarParametro> listaAnio = null;
            listaAnio = AccesoDatos.cargarComboAnio();
            return Json(listaAnio);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaAniosCuotas()
        {
            List<CsMostrarParametro> listaAnio = null;
            listaAnio = AccesoDatos.cargarComboAnioMeses();
            return Json(listaAnio);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaCantidadesXanios( int year)
        {
           int[] cantidades = null;
            cantidades = AccesoDatos.contratosXanio(year);
            return Json(cantidades);
        }

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult entregaXmes( int year)
        {
           decimal[] entrega = null;
            entrega = AccesoDatos.entregaXmes(year);
            return Json(entrega);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cobroXmes( int year, int month)
        {
           decimal[] entrega = null;
            entrega = AccesoDatos.cobroXmes(year, month);
            return Json(entrega);
        }
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //[HttpPost]
        ////public JsonResult cantidadDiasXmes( int year, int month)
        ////{
        //   int[] entrega = null;
        //    entrega = AccesoDatos.cantidadDiasMes(year, month);
        //    return Json(entrega);
        //}
    }
}