using PS_motPress.Conexion;
using PS_motPress.Models.Cliente;
using PS_motPress.Models.Parametro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult CliAlta()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaCombos(int parametro = 0)
        {
            if (parametro == 1)
            {
                List<CsMostrarParametro> listaPais = null;
                listaPais = AccesoDatos.cargarComboPais();
                return Json(listaPais);
            }
            if (parametro == 2)
            {
                List<CsMostrarParametro> listaProvincias = null;
                listaProvincias = AccesoDatos.cargarComboProvincia();
                return Json(listaProvincias);
            }
            if (parametro == 3)
            {
                List<CsMostrarParametro> listaLocalidades = null;
                listaLocalidades = AccesoDatos.cargarComboLocalidad();
                return Json(listaLocalidades);
            }
            if (parametro == 4)
            {
                List<CsMostrarParametro> listaBarrios = null;
                listaBarrios = AccesoDatos.cargarComboBarrio();
                return Json(listaBarrios);
            }
            return Json(parametro);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult nuevoCliente(ClsCliente c)
        {
            bool respuesta = false;
            respuesta = AccesoDatos.agregarCliente(c);
            if(respuesta)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(c);
        }
        public ActionResult CliBusqueda()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult listadoCliente(string name = "", int cod = 0)
        {
            if (cod == 1)
            {
                List<ClsCliente> lista = null;
                lista = AccesoDatos.traerListaClientesNombre(name);
                if (lista != null)
                {
                    return Json(lista);
                }
            }
            else if(cod == 2)
            {
                List<ClsCliente> lista = null;
                lista = AccesoDatos.traerListaClientesDoc(name);
                if (lista != null)
                {
                    return Json(lista);
                }
            }
            return Json(name);
        }
        public ActionResult CliEditar(int cliId)
        {
            List<CsMostrarParametro> listaPais = AccesoDatos.cargarComboPais();
            List<SelectListItem> itemsP = listaPais.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false,
                };
            }
            );
            List<CsMostrarParametro> listaProvincias = AccesoDatos.cargarComboProvincia();
            List<SelectListItem> itemsPr = listaProvincias.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false,
                };
            }
            );
            List<CsMostrarParametro> listaLocalidades = AccesoDatos.cargarComboLocalidad();
            List<SelectListItem> itemsL = listaLocalidades.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false,
                };
            }
            );
            List<CsMostrarParametro> listaBarrios = AccesoDatos.cargarComboBarrio();
            List<SelectListItem> itemsB = listaBarrios.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false,
                };
            }
            );
            ClsCliente c = AccesoDatos.traerCliente(cliId);
            foreach (var item in itemsP)
            {
                if (item.Value.Equals(c.cIdPais.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            foreach (var item in itemsPr)
            {
                if (item.Value.Equals(c.cIdProvincia.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            foreach (var item in itemsL)
            {
                if (item.Value.Equals(c.cIdLocalidad.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            foreach (var item in itemsB)
            {
                if (item.Value.Equals(c.cIdBarrio.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            ViewBag.itemsP = itemsP;
            ViewBag.itemsPr = itemsPr;
            ViewBag.itemsL = itemsL;
            ViewBag.itemsB = itemsB;
            return View(c);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult editarCliente(ClsCliente c)
        {
            bool resultado = false;
            resultado = AccesoDatos.editarCliente(c);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }

            return Json(resultado);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult existeCliente(string parametro)
        {
            bool resultado = AccesoDatos.existeCli(parametro);
            if (resultado)
            {
                string palabra = "Existe";
                return Json(palabra);
            }
            return Json(parametro);
        }
        public ActionResult CliEliminar(int cliId)
        {
            ClsCliente c = AccesoDatos.traerCliente(cliId);
            return View(c);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult EliminarCli(int idCli, string nota)
        {
            bool resultado = false;
            resultado = AccesoDatos.eliminarCliente(idCli, nota);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(idCli);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult busquedaLugar(string dom, string palabra)
        {
            if (dom != "")
            {
                List<atributosLugarcs> lista = null;
                lista = AccesoDatos.busquedaLugares(dom, palabra);
                return Json(lista);
            }
            return Json(dom);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult agregarLugar(string nuevo, string dom, string cod)
        {
            if (nuevo != "")
            {
                bool resultado = false;
                string palabra = "";
                resultado = AccesoDatos.agregarLugar(nuevo, dom, cod);
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
            return Json(nuevo);
        }
        public ActionResult CliHistorial()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult crudoClientes()
        {
            List<ClsClienteModal> lista = AccesoDatos.CrudoClientes();
            return Json(lista);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult darAltaCliente(int cod)
        {
            bool resultado = AccesoDatos.dardeAltaCliente(cod);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(cod);
        }
    }
}