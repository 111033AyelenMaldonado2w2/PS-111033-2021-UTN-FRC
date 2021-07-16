using PS_motPress.Conexion;
using PS_motPress.Models.Cliente;
using PS_motPress.Models.Cuota;
using PS_motPress.Models.Parametro;
using PS_motPress.Models.Prestamo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class PrestamoController : Controller
    {
        // GET: Prestamo
        public ActionResult PresAlta()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaCombos()
        {
            List<CsMostrarParametro> slista = AccesoDatos.cargarCombotiempoCobro();
            return Json(slista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult PresBuscaCli(string parametro = "", string Chbxs1 = "",string Chbxs2 = "",string Chbxs3 = "")
        {
            if (parametro != "")
            {
                List<ClsCliente> lista = null;
                if (parametro != "")
                    lista = AccesoDatos.buscarCliente(parametro, Chbxs1, Chbxs2, Chbxs3);
                if (Request.IsAjaxRequest())
                    return Json(lista);
            }
            //else if (p.PMonto != null && parametro == "")
            //{
            //    if (ModelState.IsValid)
            //    {
            //        List<ClsPrestamo> resultado = null;
            //        resultado = ClsConnection.generacionTablaPrestamo(p);
            //        if (Request.IsAjaxRequest())
            //            return Json(resultado);
            //    }
            //}
            //else if (cp != null && p.capital == null)
            //{
            //    if (ModelState.IsValid)
            //    {
            //        bool resultado = ClsConnection.confimacionPrestamo(cp);
            //        if (resultado)
            //        {
            //            return Json(resultado);
            //        }
            //    }
            //}
            //else
            //{
            //    if (ModelState.IsValid)
            //    {
            //        List<ClsPrestamo> resultado = null;
            //        resultado = ClsConnection.generacionTablaPrestamo(p);
            //        if (Request.IsAjaxRequest())
            //            return Json(resultado);
            //    }
            //}
            return Json(parametro);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult creacionTabla(ClsPrestamo c)
        {
            List<ClsPrestamo> lista = null;
            string algo = "";
            lista = AccesoDatos.generacionTablaPrestamo(c, algo);
            return Json(lista);
        }
        public string nroPrestamo()
        {
            string valor = AccesoDatos.tomarNroNvoPrestamo();
            return valor;
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult confirPrestamo(ClsPrestamo c)
        {
            bool resultado = AccesoDatos.confimacionPrestamo(c);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(c);
        }
        public ActionResult PresReliquidacion()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult BusquedaPrestamosActivos(string sitio = "")
        {
            List<ClsDatosPrestamo> lista = null;
            lista = AccesoDatos.busquedaDePrestamosActivos(sitio);
            return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult BusquedaPrestamos(string sitio = "")
        {
            List<ClsDatosPrestamo> lista = null;
            lista = AccesoDatos.busquedaDePrestamos(sitio);
            return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult BusquedaTodosPrestamosFiltro(string sitio = "")
        {
            List<ClsDatosPrestamo> lista = null;
            lista = AccesoDatos.busquedaDePrestamos2(sitio);
            return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult BusquedaCuotasDePrestamos(int nroContrato = 0)
        {
             if (nroContrato != 0)
            {
            List<ClsDatosPrestamo> lista = null;
            lista = AccesoDatos.cuotasAdeudadas(nroContrato);
            return Json(lista);
        }
            return Json(nroContrato);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult generaciónTablaRefinan(ClsPrestamo p, string pMontoSolicitado1 = "")
        {
            List<ClsPrestamo> resultado = null;
            resultado = AccesoDatos.generacionTablaPrestamoReliqui(p, pMontoSolicitado1);
            return Json(resultado);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult busquedaCuotasVisual(string nroContrato)
        {
            List<ClsCuota> lista = null;
            lista = AccesoDatos.busquedadeCuotas(nroContrato);
            return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult nuevaInformacion(int documento)
        {
            List<ClsDatosNuevos> lista = null;
            lista = AccesoDatos.refrescarInfo(documento);
            return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult ReqliquidacionFinal(ClsReliquidacion r)
        {
            bool resultado = false;
            string palabra = "";
            resultado = AccesoDatos.finalReliquidacion(r);
            if (resultado)
            {
                palabra = "Exito";
                return Json(palabra);
            }
            return Json(palabra);

        }
        public ActionResult PresBusqueda()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult anulaCancelPrestamo(int estadoP, string motivo, int contrato)
        {
            string palabra = "";
            if (estadoP != null)
            {
                bool resultado = AccesoDatos.anulCancelPrestamo(estadoP, motivo, contrato);
                if (resultado)
                {
                    palabra = "Exito";
                    return Json(palabra);
                }
                else
                {
                    palabra = "Fracaso";
                    return Json(palabra);
                }
            }
            return Json(estadoP);
        }
    }
}