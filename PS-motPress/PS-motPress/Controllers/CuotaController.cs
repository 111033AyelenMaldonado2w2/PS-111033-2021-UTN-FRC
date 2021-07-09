using PS_motPress.Conexion;
using PS_motPress.Models.Cuota;
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
    public class CuotaController : Controller
    {
        // GET: Cuota
        public ActionResult CuoAdmi()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult CuotCargaCombos(int parametro = 0)
        {
            if (parametro == 1)
            {
                List<CsMostrarParametro> lista = null;
                string dom = "FormaPago";
                lista = AccesoDatos.cargarCombo(dom);
                return Json(lista);
            }
            if (parametro == 2)
            {
                List<CsMostrarParametro> lista = null;
                string dom = "TDeb";
                lista = AccesoDatos.cargarCombo(dom);
                return Json(lista);
            }
            if (parametro == 3)
            {
                List<CsMostrarParametro> lista = null;
                string dom = "TCred";
                lista = AccesoDatos.cargarCombo(dom);
                return Json(lista);
            }
            if (parametro == 4)
            {
                List<CsMostrarParametro> lista = null;
                string dom = "Banco";
                lista = AccesoDatos.cargarCombo("Banco");
                return Json(lista);
            }
            return Json(parametro);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult obtenerInfoCuota(int nrContrato = 0, int nroCuota = 0, int nrContrato1 = 0, int nroCuota1 = 0)
        {
            if (nrContrato != 0 && nroCuota != 0)
            {
                List<ClsCuotasCobradas> lista = null;
                lista = AccesoDatos.infoCuotasCobradas(nrContrato, nroCuota);
                return Json(lista);
            }
            if (nrContrato1 != 0 && nroCuota1 != 0)
            {
                List<ClsCuotPago> lista = null;
                lista = AccesoDatos.infoCuotasId(nrContrato1, nroCuota1);
                return Json(lista);
            }
            return Json(nrContrato);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult pagoCuota(ClsCuotPago c, int nrContrato = 0)
        {
            bool resultado = false;
            resultado = AccesoDatos.cobroCuota(c, nrContrato);
            string palabra = "";
            if (resultado)
            {
                palabra = "Exito";
                return Json(palabra);
            }
            return Json(c);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult dataParaRecibo(int cuota, int prestamo)
        {
            string palabra = "";
            List<ClsReporte> lista = null;
            lista = AccesoDatos.cargaRecibo(cuota, prestamo);
            if (lista != null)
            {
                return Json(lista);
            }
            else
            {
                return Json(palabra);
            }
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult dataParaElRecibo(int cuota, int prestamo)
        {
            string palabra = "";
            List<ClsReporte> lista = null;
            lista = AccesoDatos.cargaRecibo(cuota, prestamo);
            if (lista != null)
            {
                return Json(lista);
            }
            else
            {
                return Json(palabra);
            }
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult nroRecibo(int cuota, int prestamo)
        {
            int resultado = AccesoDatos.obtenerRecibo(cuota, prestamo);
            return Json(resultado);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult traerCuotasCoinciden(DateTime fecha)
        {
            List<ClsCuota> lista = null;
            lista = AccesoDatos.traerCuotasCoincidentes(fecha);
            if (lista != null)
            {
                return Json(lista);
            }
            return Json(fecha);
        }
    }
}