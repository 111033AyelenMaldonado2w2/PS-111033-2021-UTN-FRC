using PS_motPress.Conexion;
using PS_motPress.Models.Parametro;
using PS_motPress.Models.Producto;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Script.Services;

namespace PS_motPress.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Producto
        public ActionResult altaProducto()
        {
            return View();
        }
        public ActionResult proBusqueda()
        {
            return View();
        }
        public ActionResult subida()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaCombos(int parametro = 0)
        {
            if (parametro == 1)
            {
                List<CsMostrarParametro> listaCat = null;
                listaCat = AccesoDatos.cargarComboCategorias();
                return Json(listaCat);
            }
            if (parametro == 2)
            {
                List<CsMostrarParametro> listaMarcas = null;
                listaMarcas = AccesoDatos.cargarComboMarca();
                return Json(listaMarcas);
            }
            if (parametro == 3)
            {
                List<CsMostrarParametro> listaMarchas = null;
                listaMarchas = AccesoDatos.cargarComboMarchas();
                return Json(listaMarchas);
            }
            if (parametro == 4)
            {
                List<CsMostrarParametro> listaColores = null;
                listaColores = AccesoDatos.cargarComboColores();
                return Json(listaColores);
            }          
            return Json(parametro);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult altaProducto(HttpPostedFileBase ImgFile, ClsProducto p, HttpPostedFileBase ImgMiniatura)
        {
            var respuesta = new ResponseModel
            {
                respuesta = true,
                error = "",
                correcto = "Exito"
            };
            bool rta = false;

            string imgGrande =  ImgFile.FileName.ToString();
            string imgMiniatura = ImgMiniatura.FileName.ToString();
            if (ImgFile != null)
            {
                byte[] imageData1 = null;
                byte[] imageData2 = null;
                using (var image = new BinaryReader(ImgFile.InputStream))
                {
                    imageData1 = image.ReadBytes(ImgFile.ContentLength);
                }
                using (var image2 = new BinaryReader(ImgMiniatura.InputStream))
                {
                    imageData2 = image2.ReadBytes(ImgMiniatura.ContentLength);
                }
                p.pImage = imageData1;
                p.pRuta = imageData2;
                //string adjunto = DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(ImgFile.FileName);
                //ImgFile.SaveAs(Server.MapPath("~/Content/ImagenProducto/" + ImgFile.FileName));
                rta = AccesoDatos.agregarProducto(p, imgGrande, imgMiniatura);
                if (rta)
                {
                    return Json(respuesta.correcto);
                }

            }

            return Json(respuesta);
        }
        public ActionResult convertirImg(int id)
        {
            var imagen = AccesoDatos.conversionImg(id);

            return File(imagen, "Img/jpg");
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult listadoProductos(int marca = 0, string name ="")
        {
            if(marca != 0 || name != "")
            {
                List<ClsProducto> lista = null;
                lista = AccesoDatos.traerListaProductos(marca, name);
                if(lista != null)
                {
                    return Json(lista);
                }
            }
            return Json(marca);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult listadoProductos2(string name = "")
        {
            if (name != "")
            {
                List<ClsProducto> lista = null;
                lista = AccesoDatos.traerListaProductos2(name);
                if (lista != null)
                {
                    return Json(lista);
                }
            }
            return Json(name);
        }
        public ActionResult ProEditar(int idProducto)
        {
            List<CsMostrarParametro> listaCate = AccesoDatos.cargarComboCategorias();
            List<SelectListItem> items = listaCate.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false,
                };
            }
            );
            List<CsMostrarParametro> listaMarca = AccesoDatos.cargarComboMarca();
            List<SelectListItem> itemsP = listaMarca.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false,
                };
            }
            );
            List<CsMostrarParametro> listaMarcha = AccesoDatos.cargarComboMarchas();
            List<SelectListItem> itemsM = listaMarcha.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false,
                };
            }
            );
            List<CsMostrarParametro> listaColor = AccesoDatos.cargarComboColores();
            List<SelectListItem> itemsC = listaColor.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.pDescripcion,
                    Value = d.pId.ToString(),
                    Selected = false,
                };
            }
            );
            ClsProducto c = AccesoDatos.tomarProductoSolo(idProducto);
            foreach (var item in items)
            {
                if (item.Value.Equals(c.pIdTipo.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            foreach (var item in itemsP)
            {
                if (item.Value.Equals(c.pIdMarca.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            foreach (var item in itemsM)
            {
                if (item.Value.Equals(c.pIdCaja.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            foreach (var item in itemsC)
            {
                if (item.Value.Equals(c.pIdColor.ToString()))
                {
                    item.Selected = true;
                    break;
                }
            }
            ViewBag.items = items;
            ViewBag.itemsP = itemsP;
            ViewBag.itemsM = itemsM;
            ViewBag.itemsC = itemsC;
            return View(c);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult editarProducto(HttpPostedFileBase ImgFile, ClsProducto p, HttpPostedFileBase ImgMiniatura)
        {
            var respuesta = new ResponseModel
            {
                respuesta = true,
                error = "",
                correcto = "Exito"
            };
            bool rta = false;

            string imgGrande = "";
            string imgMiniatura = "";
            //string imgGrande = ImgFile.FileName.ToString();
            //string imgMiniatura = ImgMiniatura.FileName.ToString();
            if (ImgFile != null && ImgMiniatura != null)
            {
                byte[] imageData1 = null;
                byte[] imageData2 = null;
                using (var image = new BinaryReader(ImgFile.InputStream))
                {
                    imageData1 = image.ReadBytes(ImgFile.ContentLength);
                }
                using (var image2 = new BinaryReader(ImgMiniatura.InputStream))
                {
                    imageData2 = image2.ReadBytes(ImgMiniatura.ContentLength);
                }
                p.pImage = imageData1;
                p.pRuta = imageData2;
                //string adjunto = DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(ImgFile.FileName);
                //ImgFile.SaveAs(Server.MapPath("~/Content/ImagenProducto/" + ImgFile.FileName));
                rta = AccesoDatos.editarProducto(p, imgGrande, imgMiniatura);
                if (rta)
                {
                    return Json(respuesta.correcto);
                }

            }
            else if (ImgFile != null && ImgMiniatura == null)
            {
                byte[] imageData1 = null;
                byte[] imageData2 = null;
                using (var image = new BinaryReader(ImgFile.InputStream))
                {
                    imageData1 = image.ReadBytes(ImgFile.ContentLength);
                }
                //using (var image2 = new BinaryReader(ImgMiniatura.InputStream))
                //{
                //    imageData2 = image2.ReadBytes(ImgMiniatura.ContentLength);
                //}
                p.pImage = imageData1;
                p.pRuta = null;
                //string adjunto = DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(ImgFile.FileName);
                //ImgFile.SaveAs(Server.MapPath("~/Content/ImagenProducto/" + ImgFile.FileName));
                rta = AccesoDatos.editarProducto(p, imgGrande, imgMiniatura);
                if (rta)
                {
                    return Json(respuesta.correcto);
                }

            }
            else if (ImgFile == null && ImgMiniatura != null)
            {
                byte[] imageData1 = null;
                byte[] imageData2 = null;
                //using (var image = new BinaryReader(ImgFile.InputStream))
                //{
                //    imageData1 = image.ReadBytes(ImgFile.ContentLength);
                //}
                using (var image2 = new BinaryReader(ImgMiniatura.InputStream))
                {
                    imageData2 = image2.ReadBytes(ImgMiniatura.ContentLength);
                }
                p.pImage = null;
                p.pRuta = imageData2;
                //string adjunto = DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(ImgFile.FileName);
                //ImgFile.SaveAs(Server.MapPath("~/Content/ImagenProducto/" + ImgFile.FileName));
                rta = AccesoDatos.editarProducto(p, imgGrande, imgMiniatura);
                if (rta)
                {
                    return Json(respuesta.correcto);
                }

            }
            else
            {
                rta = AccesoDatos.editarProducto(p, imgGrande, imgMiniatura);
                if (rta)
                {
                    return Json(respuesta.correcto);
                }
            }

            return Json(respuesta);
        }
        public ActionResult ProEliminar(int idProducto)
        {
            ClsProducto c = AccesoDatos.tomarProductoSolo(idProducto);
            return View(c);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult ProAccionEliminar(int id)
        {
            bool resultado = false;
            resultado = AccesoDatos.eliminProducto(id);
            if(resultado)
            {
                string palabra = "Exito";
                return Json(palabra);
            }
            return Json(id);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult listadoTodasMotos()
        {
            string palabra = "No";
                List<ClsProductoMuestra> lista = null;
                lista = AccesoDatos.traertodosProductos();
                if (lista != null)
                {
                    return Json(lista);
                }
            return Json(palabra);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaDatos(int name)
        {
            if(name == 1)
            {
                List<ClsProductoMuestra> lista = AccesoDatos.traertodosProductos();
                return Json(lista);
            }
            return Json(name);
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult cargaDatosConFiltro(string palabra)
        {
            List<ClsProductoMuestra> lista = AccesoDatos.traertodosProductosXbuscador(palabra);
            return Json(lista);
        }
        public ActionResult ProCatalogo()
        {
            return View();
        }
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [HttpPost]
        public JsonResult traerUnProducto(int idProducto)
        {
            List<ClsProductoModal> lista = AccesoDatos.traeProductoUnico(idProducto);
            return Json(lista);
        }
    }
}