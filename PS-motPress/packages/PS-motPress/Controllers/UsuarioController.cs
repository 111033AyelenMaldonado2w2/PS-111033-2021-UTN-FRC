using PS_motPress.Conexion;
using PS_motPress.Models.Parametro;
using PS_motPress.Models.Usuario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class UsuarioController : Controller
    {
        // GET: Usuario
        public ActionResult UsuAlta()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult CargaCombos(int parametro = 0)
        {
            if (parametro == 1)
            {
                List<CsMostrarParametro> lista = null;
                string dom = "Funcion";
                lista = AccesoDatos.cargarCombo(dom);
                return Json(lista);
            }
            if (parametro == 2)
            {
                List<CsMostrarParametro> lista = null;
                string dom = "Rol";
                lista = AccesoDatos.cargarCombo(dom);
                return Json(lista);
            }
            return Json(parametro);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult crearContra()
        {
            string pass = AccesoDatos.Contraseña();
            return Json(pass);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult existeUsuario(string parametro)
        {
            bool resultado = AccesoDatos.existe(parametro);
            if(resultado)
            {
                string palabra = "Existe";
                return Json(palabra);
            }
            return Json(parametro);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult nuevoUsuario(ClsUsuario u)
        {
            bool resultado = AccesoDatos.agregarUsuario(u);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(u);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult buscarLista()
        {
            List<ClsUsuario> lista = AccesoDatos.todosLosUsuarios();
            return Json(lista);
        }
        public ActionResult UsuBusqueda()
        {
            return View();
        }
        public ActionResult UsuEditar(string idUsu)
        {
            string dom = "Funcion";
            List<CsMostrarParametro> fun = AccesoDatos.cargarCombo(dom);
            List<SelectListItem> itemf = fun.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false

                };
            });
            dom = "Rol";
            List<CsMostrarParametro> rol = AccesoDatos.cargarCombo(dom);
            List<SelectListItem> itemr = rol.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false
                };
            });
            ClsUsuario u = AccesoDatos.tomarUsuario(idUsu);
            foreach (var item in itemf)
            {
                if (item.Value.Equals(u.uIdFuncion.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            foreach (var item in itemr)
            {
                if (item.Value.Equals(u.uIdRol.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            ViewBag.itemf = itemf;
            ViewBag.itemr = itemr;
            return View(u);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult UsuEditar(ClsUsuario u)
        {
            bool resultado = AccesoDatos.editarUsuario(u);
            if (resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(u);
        }
        public ActionResult UsuEliminar(string idUsu)
        {
            ClsUsuario u = AccesoDatos.tomarUsuario(idUsu);
            return View(u);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult UsuarioEliminar(string usuario)
        {
            bool resultado = AccesoDatos.eliminarUsuario(usuario);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(usuario);
        }
    }
}