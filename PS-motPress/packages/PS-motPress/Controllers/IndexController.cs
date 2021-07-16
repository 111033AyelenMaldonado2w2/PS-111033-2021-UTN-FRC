using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class IndexController : Controller
    {
        // GET: Index
        public ActionResult Terminos()
        {
            return View();
        }
        public ActionResult Contacto()
        {
            return View();
        }
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //[HttpPost]
        //public JsonResult nuevoMensaje(string mail, string asunto, string mensaje)
        //{
        //    bool rta = false;
        //    rta = enviarCorreo(mail, asunto, mensaje);
        //    if(rta== true)
        //    {
        //        string palabra = "Exito";
        //        return Json(palabra);
        //    }
        //    return Json(mail);
        //}
    }
}