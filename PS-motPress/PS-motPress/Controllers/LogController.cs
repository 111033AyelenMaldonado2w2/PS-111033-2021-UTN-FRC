using PS_motPress.Conexion;
using PS_motPress.Models.Log;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;
using System.Web.Services;

namespace PS_motPress.Controllers
{
    public class LogController : Controller
    {
        // GET: Log
        public ActionResult Index()
        {
            return View();
        }

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult buscarUsuario(string usuario, string contrasenia)
        {
            if (usuario != "")
            {
                ClsLogin user = null;
                user = PS_motPress.Conexion.AccesoDatos.validacionUsuario(usuario, contrasenia);
                //if (user.lApellido != null)
                //{
                    Session["userName"] = usuario;
                    Session["rol"] = user.lRol;
                    Session["denominacion"] = user.lApellido + ", " + user.lNombre;
                    return Json(user);
                //}
            }
            int valor = 0;
            return Json(valor);
        }
        public ActionResult LogOut()
        {
            Session.Abandon();
            return RedirectToAction("Index", "Home");
        }

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult validarEmail(string email = "")
        {
            bool resultado = AccesoDatos.existenciaMail(email);
            if (resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(email);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult LogRecuperacion(string usu = "", string email = "")
        {
            if (usu != "")
            {
                bool resultado = AccesoDatos.envioMailPrecuperacion(usu, email);
                if (resultado)
                {
                    string palabra = "Exito";
                    return Json(palabra);
                }
            }
            return Json(usu);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult NuevaContra(string usuario = "", string codigo = "", string pass = "")
        {
            bool resultado = AccesoDatos.cambiarContra(codigo, pass, usuario);
            if (resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(usuario);
        }
        [WebMethod]
        [HttpPost]
        public string GetSession()
        {
            string sesion = "";
            if (Session["userName"] != null)
            {
                sesion = Session["userName"].ToString();
            }
            else
            {
                sesion = "null";
            }

            return sesion;
        }
        [WebMethod]
        [HttpPost]
        public string GetRol()
        {
            string rol = "";
            if (Session["rol"] != null)
            {
                rol = Session["rol"].ToString();
            }
            else
            {
                rol = "null";
            }

            return rol;
        }
    }
}