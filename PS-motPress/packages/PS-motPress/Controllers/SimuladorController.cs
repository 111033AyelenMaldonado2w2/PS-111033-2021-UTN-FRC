using PS_motPress.Conexion;
using PS_motPress.Models.Simulador;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class SimuladorController : Controller
    {
        // GET: Simulador
        public ActionResult Simulador()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult generarSimulacion(ClsSimulador s)
        {
            List<ClsSimulador> slista = AccesoDatos.generationTablaSimulacion(s);
            return Json(slista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult GuardarSimulation(ClsSimulador s)
        {
            bool resultado = AccesoDatos.guardarSimulacion(s);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(resultado);
        }
    }
}