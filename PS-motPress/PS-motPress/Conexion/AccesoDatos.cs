using PS_motPress.Models.Cliente;
using PS_motPress.Models.Cuota;
using PS_motPress.Models.Fecha;
using PS_motPress.Models.Log;
using PS_motPress.Models.Parametro;
using PS_motPress.Models.Prestamo;
using PS_motPress.Models.Producto;
using PS_motPress.Models.Reporte;
using PS_motPress.Models.Simulador;
using PS_motPress.Models.Usuario;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace PS_motPress.Conexion
{
    public class AccesoDatos
    {
        static string cadenaConexion = System.Configuration.ConfigurationManager.AppSettings["cadenaConexion"].ToString();
        static ClsFunciones fx = new ClsFunciones();
        ///////PRODUCTO
        public static bool agregarProducto(ClsProducto p, string imgN, string mini)
        {
            bool resultado = false;
            if (p.pDescripcion == null)
            {
                p.pDescripcion = "";
            }
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            string consulta = @"INSERT INTO Productos(proNombre, proModelo, proMarca, proDescripcion, proPrecio, proCilindrada, proMotor, proCaja, proArranque, proKilometraje, proCombustible, proTipo, proImg, proImgMiniatura, proEstado, proColor) 
                               VALUES (@nombre, @anio, @marca, @desc, @precio, @cilindros, @mot, @caja, @arranque, @km, @combustible, @tipo, @img, @miniatura, @estado, @Color)";
            try
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nombre", p.pNombre);
                cmd.Parameters.AddWithValue("@anio", p.pModelo);
                cmd.Parameters.AddWithValue("@marca", p.pIdMarca);
                cmd.Parameters.AddWithValue("@desc", p.pDescripcion);
                cmd.Parameters.AddWithValue("@precio", p.pPrecio);
                cmd.Parameters.AddWithValue("@cilindros", p.pCilindrada);
                cmd.Parameters.AddWithValue("@mot", p.pMotor);
                cmd.Parameters.AddWithValue("@caja", p.pIdCaja);
                cmd.Parameters.AddWithValue("@arranque", p.pArranque);
                cmd.Parameters.AddWithValue("@km", p.pKilometros);
                cmd.Parameters.AddWithValue("@combustible", p.pCombustible);
                cmd.Parameters.AddWithValue("@tipo", p.pIdTipo);
                cmd.Parameters.AddWithValue("@img", p.pImage);
                cmd.Parameters.AddWithValue("@miniatura", p.pRuta);
                cmd.Parameters.AddWithValue("@estado", 613);
                cmd.Parameters.AddWithValue("@Color", p.pIdColor);


                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return resultado;
        }
        public static List<CsMostrarParametro> cargarComboMarca()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'motMarca'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<CsMostrarParametro> cargarComboCategorias()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'motTipo'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<CsMostrarParametro> cargarComboMarchas()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'tipoCaja'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<CsMostrarParametro> cargarComboColores()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'colorMoto'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static byte[] conversionImg(int codigo)
        {
            byte[] img = null;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            string consulta = @"select proImg from productos where proId=" + codigo + "";
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        img = (byte[])dr["proImg"];
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return img;
        }
        public static List<ClsProducto> traerListaProductos2(string name)
        {
            List<ClsProducto> lista = new List<ClsProducto>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            byte[] pRuta1;
            byte[] pImage1; 
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from productos p inner join Tabla_Parametros t on p.proMarca=t.Id_Param 
                                        inner join Tabla_Parametros a on p.proTipo=a.Id_Param
                                        inner join Tabla_Parametros b on p.proColor = b.Id_Param
                                        inner join Tabla_Parametros r on r.Id_Param= p.proCaja
                                      where proNombre like '%" + name + "%' and proEstado = 613";
                    //cmd.Parameters.Clear();
                    //cmd.Parameters.AddWithValue("@value", name);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsProducto c = new ClsProducto();
                            c.idProducto = Convert.ToInt32(dr["proId"].ToString());
                            c.pArranque = dr["proArranque"].ToString();
                            c.pIdCaja = Convert.ToInt32(dr["proCaja"].ToString());
                            c.pCaja = dr[38].ToString();
                            c.pCilindrada = dr["proCilindrada"].ToString();
                            c.pCombustible = dr["proCombustible"].ToString();
                            if (dr.IsDBNull(4))
                            {
                                string hola = "hola";
                            }
                            else
                            {
                                c.pDescripcion = dr["proDescripcion"].ToString();
                            }
                            c.pIdMarca = Convert.ToInt32(dr["proMarca"].ToString());
                            c.pIdTipo = Convert.ToInt32(dr["proTipo"].ToString());
                            pImage1 = (byte[])dr["proImg"];
                            c.pKilometros = dr["proKilometraje"].ToString();
                            c.pMarca = dr[20].ToString();
                            c.pModelo = dr["proModelo"].ToString();
                            c.pMotor = dr["proMotor"].ToString();
                            c.pNombre = dr["proNombre"].ToString();
                            c.pPrecio = dr["proPrecio"].ToString();
                            pRuta1 = (byte[])dr["proImgMiniatura"];
                            c.pTipo = dr[26].ToString();
                            c.pImgMiniatura = Convert.ToBase64String(pRuta1);
                            c.pImgMiniatura = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgMiniatura);
                            c.pImgCompleta = Convert.ToBase64String(pImage1);
                            c.pImgCompleta = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgCompleta);
                            c.pIdColor = Convert.ToInt32(dr["proColor"].ToString());
                            c.pColor = dr[32].ToString();
                        lista.Add(c);
                        }
                    }
                }
                
                catch (Exception e)
                {
                string a = e.ToString();
                }
                finally
                {
                cnn.Close();
                }
           return lista;
        }
        public static List<ClsProductoMuestra> traertodosProductos()
        {
            List<ClsProductoMuestra> lista = new List<ClsProductoMuestra>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from productos p inner join Tabla_Parametros t on p.proMarca=t.Id_Param 
                                        inner join Tabla_Parametros a on p.proTipo=a.Id_Param
                                        inner join Tabla_Parametros r on r.Id_Param= p.proCaja
                                        inner join Tabla_Parametros b on p.proColor = b.Id_Param
                                        where proEstado = 613";
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsProducto c = new ClsProducto();
                            c.idProducto = Convert.ToInt32(dr["proId"].ToString());
                            c.pArranque = dr["proArranque"].ToString();
                            c.pIdCaja = Convert.ToInt32(dr["proCaja"].ToString());
                            c.pCaja = dr[32].ToString();
                            c.pCilindrada = dr["proCilindrada"].ToString();
                            c.pCombustible = dr["proCombustible"].ToString();
                            if (dr.IsDBNull(4))
                            {
                                string hola = "hola";
                            }
                            else
                            {
                                c.pDescripcion = dr["proDescripcion"].ToString();
                            }
                            c.pIdMarca = Convert.ToInt32(dr["proMarca"].ToString());
                            c.pIdTipo = Convert.ToInt32(dr["proTipo"].ToString());
                            c.pImage = (byte[])dr["proImg"];
                            c.pKilometros = dr["proKilometraje"].ToString();
                            c.pMarca = dr[20].ToString();
                            c.pModelo = dr["proModelo"].ToString();
                            c.pMotor = dr["proMotor"].ToString();
                            c.pNombre = dr["proNombre"].ToString();
                            c.pPrecio = dr["proPrecio"].ToString();
                            c.pRuta = (byte[])dr["proImgMiniatura"];
                            c.pTipo = dr[26].ToString();
                            c.pImgMiniatura = Convert.ToBase64String(c.pRuta);
                            c.pImgMiniatura = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgMiniatura);
                            c.pImgCompleta = Convert.ToBase64String(c.pImage);
                            c.pImgCompleta = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgCompleta);
                            c.pColor = dr[38].ToString();
                            ClsProductoMuestra cp = new ClsProductoMuestra();
                            cp.cpAnio = c.pModelo;
                            cp.cpIdProd = c.idProducto;
                            cp.cpImgMIni = c.pImgMiniatura;
                            cp.cpMarca = c.pMarca;
                            cp.cpNombre = c.pNombre;
                            cp.cpPrecio = c.pPrecio;
                            cp.cpTipo = c.pTipo;
                            cp.cpColor = c.pColor;
                            cp.cpCaja = c.pCaja;
                            lista.Add(cp);
                        }
                    }
                }
                
                catch (Exception e)
                {
                string a = e.ToString();
                }
                finally
                {
                cnn.Close();
                }
           return lista;
        }
        public static List<ClsProductoMuestra> traertodosProductosXbuscador(string palabra)
        {
            List<ClsProductoMuestra> lista = new List<ClsProductoMuestra>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from productos p inner join Tabla_Parametros t on p.proMarca=t.Id_Param inner join Tabla_Parametros a on p.proTipo=a.Id_Param
                                        where (proNombre like '%" + palabra + "%' or t.descripcion like '%" + palabra + "%') and proEstado = 613";
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsProducto c = new ClsProducto();
                            c.idProducto = Convert.ToInt32(dr["proId"].ToString());
                            c.pArranque = dr["proArranque"].ToString();
                            c.pCaja = dr["proCaja"].ToString();
                            c.pCilindrada = dr["proCilindrada"].ToString();
                            c.pCombustible = dr["proCombustible"].ToString();
                            if (dr.IsDBNull(4))
                            {
                                string hola = "hola";
                            }
                            else
                            {
                                c.pDescripcion = dr["proDescripcion"].ToString();
                            }
                            c.pIdMarca = Convert.ToInt32(dr["proMarca"].ToString());
                            c.pIdTipo = Convert.ToInt32(dr["proTipo"].ToString());
                            c.pImage = (byte[])dr["proImg"];
                            c.pKilometros = dr["proKilometraje"].ToString();
                            c.pMarca = dr[20].ToString();
                            c.pModelo = dr["proModelo"].ToString();
                            c.pMotor = dr["proMotor"].ToString();
                            c.pNombre = dr["proNombre"].ToString();
                            c.pPrecio = dr["proPrecio"].ToString();
                            c.pRuta = (byte[])dr["proImgMiniatura"];
                            c.pTipo = dr[25].ToString();
                            c.pImgMiniatura = Convert.ToBase64String(c.pRuta);
                            c.pImgMiniatura = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgMiniatura);
                            c.pImgCompleta = Convert.ToBase64String(c.pImage);
                            c.pImgCompleta = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgCompleta);

                            ClsProductoMuestra cp = new ClsProductoMuestra();
                            cp.cpAnio = c.pModelo;
                            cp.cpIdProd = c.idProducto;
                            cp.cpImgMIni = c.pImgMiniatura;
                            cp.cpMarca = c.pMarca;
                            cp.cpNombre = c.pNombre;
                            cp.cpPrecio = c.pPrecio;
                            cp.cpTipo = c.pTipo;
                            lista.Add(cp);
                        }
                    }
                }
                
                catch (Exception e)
                {
                string a = e.ToString();
                }
                finally
                {
                cnn.Close();
                }
           return lista;
        }
        public static List<ClsProductoModal> traeProductoUnico(int id)
        {
            List<ClsProductoModal> lista = new List<ClsProductoModal>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from productos p inner join Tabla_Parametros t on p.proMarca=t.Id_Param 
						              inner join Tabla_Parametros a on p.proTipo=a.Id_Param 
						              inner join Tabla_Parametros r on r.Id_Param= p.proCaja
						              inner join Tabla_Parametros b on p.proColor = b.Id_Param
                                      where proId = @value and proEstado = 613";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@value", id);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsProducto c = new ClsProducto();
                            c.idProducto = Convert.ToInt32(dr["proId"].ToString());
                            c.pArranque = dr["proArranque"].ToString();
                            c.pIdCaja = Convert.ToInt32(dr["proCaja"].ToString());
                            c.pCaja = dr[32].ToString();
                            c.pCilindrada = dr["proCilindrada"].ToString();
                            c.pCombustible = dr["proCombustible"].ToString();
                            if (dr.IsDBNull(4))
                            {
                                c.pDescripcion = "-";
                            }
                            else
                            {
                                c.pDescripcion = dr["proDescripcion"].ToString();
                            }
                            c.pIdMarca = Convert.ToInt32(dr["proMarca"].ToString());
                            c.pIdTipo = Convert.ToInt32(dr["proTipo"].ToString());
                            c.pImage = (byte[])dr["proImg"];
                            c.pKilometros = dr["proKilometraje"].ToString();
                            c.pMarca = dr[20].ToString();
                            c.pModelo = dr["proModelo"].ToString();
                            c.pMotor = dr["proMotor"].ToString();
                            c.pNombre = dr["proNombre"].ToString();
                            c.pPrecio = dr["proPrecio"].ToString();
                            c.pRuta = (byte[])dr["proImgMiniatura"];
                            c.pTipo = dr[26].ToString();
                            c.pImgMiniatura = Convert.ToBase64String(c.pRuta);
                            c.pImgMiniatura = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgMiniatura);
                            c.pImgCompleta = Convert.ToBase64String(c.pImage);
                            c.pImgCompleta = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgCompleta);
                            c.pIdColor = Convert.ToInt32(dr["proColor"].ToString());
                            c.pColor = dr[38].ToString();

                        ClsProductoModal cp = new ClsProductoModal();
                            cp.cpAnio = c.pModelo;
                            cp.cpIdProd = c.idProducto;
                            cp.cpImgMIni = c.pImgMiniatura;
                            cp.cpMarca = c.pMarca;
                            cp.cpNombre = c.pNombre;
                            cp.cpPrecio = c.pPrecio;
                            cp.cpTipo = c.pTipo;
                            cp.pArranque = c.pArranque;
                            cp.pCaja = c.pCaja;
                            cp.pCilindrada = c.pCilindrada;
                            cp.pCombustible = c.pCombustible;
                            cp.pDescripcion = c.pDescripcion;
                            cp.pKilometros = c.pKilometros;
                            cp.pMotor = c.pMotor;
                            cp.cpImgMax = c.pImgCompleta;
                            cp.pColor = c.pColor;
                            lista.Add(cp);
                        }
                    }
                }
                
                catch (Exception e)
                {
                string a = e.ToString();
                }
                finally
                {
                cnn.Close();
                }
           return lista;
        }
       
        public static List<ClsProducto> traerListaProductos(int marca, string name)
        {
            byte[] pRuta1;
            byte[] pImage1;
            List<ClsProducto> lista = new List<ClsProducto>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            if(marca != 0)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from productos p inner join Tabla_Parametros t on p.proMarca=t.Id_Param 
					                  inner join Tabla_Parametros a on p.proTipo=a.Id_Param 
						              inner join Tabla_Parametros r on r.Id_Param= p.proCaja
						              inner join Tabla_Parametros b on p.proColor = b.Id_Param
                                      where proMarca = @value  and proEstado = 613";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@value", marca);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsProducto c = new ClsProducto();
                            c.idProducto = Convert.ToInt32(dr["proId"].ToString());
                            c.pArranque = dr["proArranque"].ToString();
                            c.pIdCaja = Convert.ToInt32(dr["proCaja"].ToString());
                            c.pCaja = dr[32].ToString();
                            c.pCilindrada = dr["proCilindrada"].ToString();
                            c.pCombustible = dr["proCombustible"].ToString();
                            if (dr.IsDBNull(4))
                            {
                                string hola = "hola";
                            }
                            else
                            {
                                c.pDescripcion = dr["proDescripcion"].ToString();
                            }
                            c.pIdMarca = Convert.ToInt32(dr["proMarca"].ToString());
                            c.pIdTipo = Convert.ToInt32(dr["proTipo"].ToString());
                            pImage1 = (byte[])dr["proImg"];
                            c.pKilometros = dr["proKilometraje"].ToString();
                            c.pMarca = dr[20].ToString();
                            c.pModelo = dr["proModelo"].ToString();
                            c.pMotor = dr["proMotor"].ToString();
                            c.pNombre = dr["proNombre"].ToString();
                            c.pPrecio = dr["proPrecio"].ToString();
                            pRuta1 = (byte[])dr["proImgMiniatura"];
                            c.pTipo = dr[26].ToString();
                            c.pImgMiniatura = Convert.ToBase64String(pRuta1);
                            c.pImgMiniatura = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgMiniatura);
                            c.pImgCompleta = Convert.ToBase64String(pImage1);
                            c.pImgCompleta = string.Format("data:{0};base64,{1}", "image/jpg", c.pImgCompleta);
                            c.pIdColor = Convert.ToInt32(dr["proColor"].ToString());
                            c.pColor = dr[38].ToString();
                            lista.Add(c);
                        }
                    }
                }
                catch (Exception e)
                {
                    string a = e.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
           else
            {
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from productos p inner join Tabla_Parametros t on p.proMarca=t.Id_Param inner join Tabla_Parametros a on p.proTipo=a.Id_Param inner join Tabla_Parametros r on r.Id_Param= p.proCaja
                                    where proNombre like '%" + name + "%' and proEstado = 613";
                    //cmd.Parameters.Clear();
                    //cmd.Parameters.AddWithValue("@value", name);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsProducto c = new ClsProducto();
                            c.idProducto = Convert.ToInt32(dr["proId"].ToString());
                            c.pArranque = dr["proArranque"].ToString();
                            c.pIdCaja = Convert.ToInt32(dr["proCaja"].ToString());
                            c.pCaja = dr[29].ToString();
                            c.pCilindrada = dr["proCilindrada"].ToString();
                            c.pCombustible = dr["proCombustible"].ToString();
                            if (dr.IsDBNull(4))
                            {
                                string hola = "hola";
                            }
                            else
                            {
                                c.pDescripcion = dr["proDescripcion"].ToString();
                            }
                            c.pIdMarca = Convert.ToInt32(dr["proMarca"].ToString());
                            c.pIdTipo = Convert.ToInt32(dr["proTipo"].ToString());
                            c.pImage = (byte[])dr["proImg"];
                            c.pKilometros = dr["proKilometraje"].ToString();
                            c.pMarca = dr[19].ToString();
                            c.pModelo = dr["proModelo"].ToString();
                            c.pMotor = dr["proMotor"].ToString();
                            c.pNombre = dr["proNombre"].ToString();
                            c.pPrecio = dr["proPrecio"].ToString();
                            c.pRuta = (byte[])dr["proImgMiniatura"];
                            c.pTipo = dr[24].ToString();

                            lista.Add(c);
                        }
                    }
                }
                
                catch (Exception e)
                {
                string a = e.ToString();
                }
                finally
                {
                cnn.Close();
                }
           }
           return lista;
        }
        public static ClsProducto tomarProductoSolo(int codigo)
        {
            ClsProducto c = new ClsProducto();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from productos p inner join Tabla_Parametros t on p.proMarca=t.Id_Param 
						          inner join Tabla_Parametros a on p.proTipo=a.Id_Param 
						          inner join Tabla_Parametros r on r.Id_Param= p.proCaja
						          inner join Tabla_Parametros b on p.proColor = b.Id_Param
                                   where proId = @value ";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@value", codigo);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        
                        c.idProducto = Convert.ToInt32(dr["proId"].ToString());
                        c.pArranque = dr["proArranque"].ToString();
                        c.pIdCaja = Convert.ToInt32(dr["proCaja"].ToString());
                        c.pCaja = dr[32].ToString();
                        c.pCilindrada = dr["proCilindrada"].ToString();
                        c.pCombustible = dr["proCombustible"].ToString();
                        if (dr.IsDBNull(4))
                        {
                            string hola = "hola";
                        }
                        else
                        {
                            c.pDescripcion = dr["proDescripcion"].ToString();
                        }
                        c.pIdMarca = Convert.ToInt32(dr["proMarca"].ToString());
                        c.pIdTipo = Convert.ToInt32(dr["proTipo"].ToString());
                        c.pImage = (byte[])dr["proImg"];
                        c.pKilometros = dr["proKilometraje"].ToString();
                        c.pMarca = dr[20].ToString();
                        c.pModelo = dr["proModelo"].ToString();
                        c.pMotor = dr["proMotor"].ToString();
                        c.pNombre = dr["proNombre"].ToString();
                        c.pPrecio = dr["proPrecio"].ToString();
                        c.pRuta = (byte[])dr["proImgMiniatura"];
                        c.pTipo = dr[26].ToString();
                        c.pIdColor = Convert.ToInt32(dr["proColor"].ToString());
                        c.pColor = dr[38].ToString();
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return c;
        }
        public static bool editarProducto(ClsProducto p, string img, string img1)
        {
            byte[] va = { };
            string consulta = "";
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            if (p.pDescripcion == null)
            {
                p.pDescripcion = "";
            }
            if (p.pImage == null && p.pRuta == null)
            {
                consulta = @"UPDATE Productos SET proNombre = @nombre, proModelo = @anio, proMarca = @marca, proDescripcion = @desc, proPrecio = @precio, proCilindrada = @cilindros, proMotor = @mot, proCaja = @caja, proArranque = @arranque, proKilometraje = @km, proCombustible = @combustible, proTipo = @tipo, proEstado = @estado, proColor = @color
                                WHERE proId = @id";
                try
                {
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@nombre", p.pNombre);
                    cmd.Parameters.AddWithValue("@anio", p.pModelo);
                    cmd.Parameters.AddWithValue("@marca", p.pIdMarca);
                    cmd.Parameters.AddWithValue("@desc", p.pDescripcion);
                    cmd.Parameters.AddWithValue("@precio", p.pPrecio);
                    cmd.Parameters.AddWithValue("@cilindros", p.pCilindrada);
                    cmd.Parameters.AddWithValue("@mot", p.pMotor);
                    cmd.Parameters.AddWithValue("@caja", p.pIdCaja);
                    cmd.Parameters.AddWithValue("@arranque", p.pArranque);
                    cmd.Parameters.AddWithValue("@km", p.pKilometros);
                    cmd.Parameters.AddWithValue("@combustible", p.pCombustible);
                    cmd.Parameters.AddWithValue("@tipo", p.pIdTipo);
                    cmd.Parameters.AddWithValue("@estado", 613);
                    cmd.Parameters.AddWithValue("@color", p.pIdColor);
                    cmd.Parameters.AddWithValue("@id", p.idProducto);


                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if(p.pImage != null && p.pRuta == null)
            {
                consulta = @"UPDATE Productos SET proNombre = @nombre, proModelo = @anio, proMarca = @marca, proDescripcion = @desc, proPrecio = @precio, proCilindrada = @cilindros, proMotor = @mot, proCaja = @caja, proArranque = @arranque, proKilometraje = @km, proCombustible = @combustible, proTipo = @tipo, proImg = @img, proEstado = @estado, proColor = @color
                                WHERE proId = @id";
                try
                {
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@nombre", p.pNombre);
                    cmd.Parameters.AddWithValue("@anio", p.pModelo);
                    cmd.Parameters.AddWithValue("@marca", p.pIdMarca);
                    cmd.Parameters.AddWithValue("@desc", p.pDescripcion);
                    cmd.Parameters.AddWithValue("@precio", p.pPrecio);
                    cmd.Parameters.AddWithValue("@cilindros", p.pCilindrada);
                    cmd.Parameters.AddWithValue("@mot", p.pMotor);
                    cmd.Parameters.AddWithValue("@caja", p.pIdCaja);
                    cmd.Parameters.AddWithValue("@arranque", p.pArranque);
                    cmd.Parameters.AddWithValue("@km", p.pKilometros);
                    cmd.Parameters.AddWithValue("@combustible", p.pCombustible);
                    cmd.Parameters.AddWithValue("@tipo", p.pIdTipo);
                    cmd.Parameters.AddWithValue("@img", p.pImage);
                    cmd.Parameters.AddWithValue("@estado", 613);
                    cmd.Parameters.AddWithValue("@color", p.pIdColor);
                    cmd.Parameters.AddWithValue("@id", p.idProducto);


                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if(p.pImage != null && p.pRuta != null)
            {
                consulta = @"UPDATE Productos SET proNombre = @nombre, proModelo = @anio, proMarca = @marca, proDescripcion = @desc, proPrecio = @precio, proCilindrada = @cilindros, proMotor = @mot, proCaja = @caja, proArranque = @arranque, proKilometraje = @km, proCombustible = @combustible, proTipo = @tipo, proImg = @img, proImgMiniatura = @miniatura, proEstado = @estado, proColor = @color
                                WHERE proId = @id";
                try
                {
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@nombre", p.pNombre);
                    cmd.Parameters.AddWithValue("@anio", p.pModelo);
                    cmd.Parameters.AddWithValue("@marca", p.pIdMarca);
                    cmd.Parameters.AddWithValue("@desc", p.pDescripcion);
                    cmd.Parameters.AddWithValue("@precio", p.pPrecio);
                    cmd.Parameters.AddWithValue("@cilindros", p.pCilindrada);
                    cmd.Parameters.AddWithValue("@mot", p.pMotor);
                    cmd.Parameters.AddWithValue("@caja", p.pIdCaja);
                    cmd.Parameters.AddWithValue("@arranque", p.pArranque);
                    cmd.Parameters.AddWithValue("@km", p.pKilometros);
                    cmd.Parameters.AddWithValue("@combustible", p.pCombustible);
                    cmd.Parameters.AddWithValue("@tipo", p.pIdTipo);
                    cmd.Parameters.AddWithValue("@img", p.pImage);
                    cmd.Parameters.AddWithValue("@miniatura", p.pRuta);
                    cmd.Parameters.AddWithValue("@estado", 613);
                    cmd.Parameters.AddWithValue("@color", p.pIdColor);
                    cmd.Parameters.AddWithValue("@id", p.idProducto);


                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if(p.pImage == null && p.pRuta != null)
            {
                consulta = @"UPDATE Productos SET proNombre = @nombre, proModelo = @anio, proMarca = @marca, proDescripcion = @desc, proPrecio = @precio, proCilindrada = @cilindros, proMotor = @mot, proCaja = @caja, proArranque = @arranque, proKilometraje = @km, proCombustible = @combustible, proTipo = @tipo, proImgMiniatura = @miniatura, proEstado = @estado, proColor = @color
                                WHERE proId = @id";
                try
                {
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@nombre", p.pNombre);
                    cmd.Parameters.AddWithValue("@anio", p.pModelo);
                    cmd.Parameters.AddWithValue("@marca", p.pIdMarca);
                    cmd.Parameters.AddWithValue("@desc", p.pDescripcion);
                    cmd.Parameters.AddWithValue("@precio", p.pPrecio);
                    cmd.Parameters.AddWithValue("@cilindros", p.pCilindrada);
                    cmd.Parameters.AddWithValue("@mot", p.pMotor);
                    cmd.Parameters.AddWithValue("@caja", p.pIdCaja);
                    cmd.Parameters.AddWithValue("@arranque", p.pArranque);
                    cmd.Parameters.AddWithValue("@km", p.pKilometros);
                    cmd.Parameters.AddWithValue("@combustible", p.pCombustible);
                    cmd.Parameters.AddWithValue("@tipo", p.pIdTipo);
                    cmd.Parameters.AddWithValue("@miniatura", p.pRuta);
                    cmd.Parameters.AddWithValue("@estado", 613);
                    cmd.Parameters.AddWithValue("@color", p.pIdColor);
                    cmd.Parameters.AddWithValue("@id", p.idProducto);


                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            
            return resultado;
        }
        public static bool eliminProducto(int id)
        {
            bool resultado = false;
            string consulta = "UPDATE Productos SET proEstado = 615 where proId= @value";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            try
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@value", id);               

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return resultado;
        }
        ///////FIN PRODUCTO


        ///////CLIENTE
        public static List<CsMostrarParametro> cargarComboPais()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'Pais'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<CsMostrarParametro> cargarComboProvincia()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'Provincia'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<CsMostrarParametro> cargarComboLocalidad()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'Localidad'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<CsMostrarParametro> cargarComboBarrio()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'Barrio'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }

        public static bool agregarCliente(ClsCliente c)
        {
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            SqlCommand cmd = new SqlCommand();
            //string fecha = "getdate()";
            c.cFechaNacimiento = Convert.ToDateTime(c.cFechaNacimiento);

            //c.usuario = usu;
            try
            {

                string consulta = @" INSERT INTO Clientes(cliNombre, cliApellido, cliDocumento, cliCUIT, cliTel, 
                                    cliEmail, cliCalle, cliAltura, cliPais, cliProvincia, cliLocalidad, cliBarrio,
                                    cliCodigoPostal, cliFecha_nac, cliEstado, cliPiso , cliNroDpto,cliUsuario, cliFechaModif, CliNota) 
                                    VALUES(@nombre, @apellido,@doc,
                                    @cuit, @tel,  @email, @calle, @altura, @pais, 
                                     @provincia, @localidad,  @barrio, @postal,
                                     @fecha, @estado, @piso, @nroDpto, @usuario, getdate(), @nota)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nombre", c.cNombre);
                cmd.Parameters.AddWithValue("@apellido", c.cApellido);
                cmd.Parameters.AddWithValue("@doc", c.cDocumento);
                if (c.cCUIT == null)
                {
                    cmd.Parameters.AddWithValue("@cuit", "");
                }
                else
                {
                    cmd.Parameters.AddWithValue("@cuit", c.cCUIT);
                }
                cmd.Parameters.AddWithValue("@tel", c.cTel);
                if (c.cEmail == null)
                {
                    cmd.Parameters.AddWithValue("@email", "");
                }
                else
                {
                    cmd.Parameters.AddWithValue("@email", c.cEmail);
                }
                cmd.Parameters.AddWithValue("@calle", c.cCalle);
                cmd.Parameters.AddWithValue("@altura", c.cAltura);
                cmd.Parameters.AddWithValue("@pais", c.cIdPais);
                cmd.Parameters.AddWithValue("@provincia", c.cIdProvincia);
                cmd.Parameters.AddWithValue("@localidad", c.cIdLocalidad);
                cmd.Parameters.AddWithValue("@barrio", c.cIdBarrio);
                if (c.cCodPostal == null)
                {
                    cmd.Parameters.AddWithValue("@postal", 0);
                }
                else
                {
                    cmd.Parameters.AddWithValue("@postal", c.cCodPostal);
                }
                if (c.cFechaNacimiento == null)
                {
                    cmd.Parameters.AddWithValue("@fecha", DBNull.Value);
                }
                else
                {
                    cmd.Parameters.AddWithValue("@fecha", c.cFechaNacimiento);

                }
                cmd.Parameters.AddWithValue("@estado", 613);
                if (c.cPiso == null)
                {
                    c.cPiso = "";
                }
                    cmd.Parameters.AddWithValue("@piso", c.cPiso); 
                if (c.cNroDpto == null)
                {
                    c.cNroDpto = "";
                }
                    cmd.Parameters.AddWithValue("@nroDpto", c.cNroDpto);
                cmd.Parameters.AddWithValue("@usuario", usu);
                cmd.Parameters.AddWithValue("@nota", " ");

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;

            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return resultado;
        }

        public static List<ClsCliente> traerListaClientesNombre(string name)
        {
            List<ClsCliente> lista = new List<ClsCliente>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from clientes c inner join Tabla_Parametros t on c.cliPais=t.Id_Param inner join Tabla_Parametros a on c.cliProvincia=a.Id_Param 
				                        inner join Tabla_Parametros b on c.cliLocalidad = b.Id_Param inner join Tabla_Parametros l on c.cliBarrio = l.Id_Param
				                        where (upper(cliNombre) like '%" + name + "%' or upper(cliApellido) like '%" + name + "%') and cliEstado = 613";
                    //cmd.Parameters.Clear();
                    //cmd.Parameters.AddWithValue("@value", name);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsCliente c = new ClsCliente();
                            c.cCliId = Convert.ToInt32(dr["cliId"].ToString());
                            c.cNombre = dr["cliNombre"].ToString();
                            c.cApellido = dr["cliApellido"].ToString();
                            c.cDocumento = dr["cliDocumento"].ToString();
                            c.cCUIT = dr["cliCUIT"].ToString();
                            c.cTel = dr["cliTel"].ToString();
                            c.cEmail = dr["cliEmail"].ToString();
                            c.cCalle = dr["cliCalle"].ToString();
                            c.cAltura = Convert.ToInt32(dr["cliAltura"].ToString());
                            c.cIdPais = Convert.ToInt32(dr["cliPais"].ToString());
                            c.cIdProvincia = Convert.ToInt32(dr["cliProvincia"].ToString());
                            c.cIdLocalidad = Convert.ToInt32(dr["cliLocalidad"].ToString());
                            c.cIdBarrio = Convert.ToInt32(dr["cliBarrio"].ToString());
                            c.cCodPostal = Convert.ToInt32(dr["cliCodigoPostal"].ToString());
                            c.cEstado = Convert.ToInt32(dr["cliEstado"].ToString());
                            c.cFechaNacimiento = Convert.ToDateTime(dr["cliFecha_nac"].ToString());
                            c.cPiso = dr["cliPiso"].ToString();
                            c.cNroDpto = dr["cliNroDpto"].ToString();
                            c.cUsuario = dr["cliUsuario"].ToString();
                            c.cPais = dr[23].ToString();
                            c.cProvincia = dr[29].ToString();
                            c.cLocalidad = dr[35].ToString();
                            c.cBarrio = dr[41].ToString();
                            

                            lista.Add(c);
                        }
                    }
                }
                catch (Exception e)
                {
                    string a = e.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            return lista;
        }
        public static List<ClsCliente> traerListaClientesDoc(string name)
        {
            List<ClsCliente> lista = new List<ClsCliente>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from clientes c inner join Tabla_Parametros t on c.cliPais=t.Id_Param inner join Tabla_Parametros a on c.cliProvincia=a.Id_Param 
				                        inner join Tabla_Parametros b on c.cliLocalidad = b.Id_Param inner join Tabla_Parametros l on c.cliBarrio = l.Id_Param
				                        where upper(clidocumento) like '%" + name + "%' and cliEstado = 613";
                    //cmd.Parameters.Clear();
                    //cmd.Parameters.AddWithValue("@value", name);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsCliente c = new ClsCliente();
                            c.cCliId = Convert.ToInt32(dr["cliId"].ToString());
                            c.cNombre = dr["cliNombre"].ToString();
                            c.cApellido = dr["cliApellido"].ToString();
                            c.cDocumento = dr["cliDocumento"].ToString();
                            c.cCUIT = dr["cliCUIT"].ToString();
                            c.cTel = dr["cliTel"].ToString();
                            c.cEmail = dr["cliEmail"].ToString();
                            c.cCalle = dr["cliCalle"].ToString();
                            c.cAltura = Convert.ToInt32(dr["cliAltura"].ToString());
                            c.cIdPais = Convert.ToInt32(dr["cliPais"].ToString());
                            c.cIdProvincia = Convert.ToInt32(dr["cliProvincia"].ToString());
                            c.cIdLocalidad = Convert.ToInt32(dr["cliLocalidad"].ToString());
                            c.cIdBarrio = Convert.ToInt32(dr["cliBarrio"].ToString());
                            c.cCodPostal = Convert.ToInt32(dr["cliCodigoPostal"].ToString());
                            c.cEstado = Convert.ToInt32(dr["cliEstado"].ToString());
                            c.cFechaNacimiento = Convert.ToDateTime(dr["cliFecha_nac"].ToString());
                            c.cPiso = dr["cliPiso"].ToString();
                            c.cNroDpto = dr["cliNroDpto"].ToString();
                            c.cUsuario = dr["cliUsuario"].ToString();
                            c.cPais = dr[23].ToString();
                            c.cProvincia = dr[28].ToString();
                            c.cLocalidad = dr[33].ToString();
                            c.cBarrio = dr[38].ToString();
                            

                            lista.Add(c);
                        }
                    }
                }
                catch (Exception e)
                {
                    string a = e.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            return lista;
        }
        public static ClsCliente traerCliente(int id)
        {
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            ClsCliente c = new ClsCliente();
            DateTime fecha;
            string[] Separate;
            string[] Separate1;
            try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"select * from clientes c inner join Tabla_Parametros t on c.cliPais=t.Id_Param inner join Tabla_Parametros a on c.cliProvincia=a.Id_Param 
				                        inner join Tabla_Parametros b on c.cliLocalidad = b.Id_Param inner join Tabla_Parametros l on c.cliBarrio = l.Id_Param
				                        where cliId = " + id + " and cliEstado = 613";
                    //cmd.Parameters.Clear();
                    //cmd.Parameters.AddWithValue("@value", name);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            
                            c.cCliId = Convert.ToInt32(dr["cliId"].ToString());
                            c.cNombre = dr["cliNombre"].ToString();
                            c.cApellido = dr["cliApellido"].ToString();
                            c.cDocumento = dr["cliDocumento"].ToString();
                            c.cCUIT = dr["cliCUIT"].ToString();
                            c.cTel = dr["cliTel"].ToString();
                            c.cEmail = dr["cliEmail"].ToString();
                            c.cCalle = dr["cliCalle"].ToString();
                            c.cAltura = Convert.ToInt32(dr["cliAltura"].ToString());
                            c.cIdPais = Convert.ToInt32(dr["cliPais"].ToString());
                            c.cIdProvincia = Convert.ToInt32(dr["cliProvincia"].ToString());
                            c.cIdLocalidad = Convert.ToInt32(dr["cliLocalidad"].ToString());
                            c.cIdBarrio = Convert.ToInt32(dr["cliBarrio"].ToString());
                            c.cCodPostal = Convert.ToInt32(dr["cliCodigoPostal"].ToString());
                            c.cEstado = Convert.ToInt32(dr["cliEstado"].ToString());
                            c.cFechaNacimiento = Convert.ToDateTime(dr["cliFecha_nac"].ToString());
                            Separate1 = Convert.ToString(c.cFechaNacimiento).Split(' ');
                            c.fechaNac = Separate1[0];
                            c.nacimiento = c.cFechaNacimiento.ToString("yyyy-MM-dd");
                            Separate = Convert.ToString(c.nacimiento).Split(' ');
                            c.nacimiento = Separate[0];
                            c.cPiso = dr["cliPiso"].ToString();
                            c.cNroDpto = dr["cliNroDpto"].ToString();
                            c.cUsuario = dr["cliUsuario"].ToString();
                            c.cPais = dr[23].ToString();
                            c.cProvincia = dr[29].ToString();
                            c.cLocalidad = dr[35].ToString();
                            c.cBarrio = dr[41].ToString();
                            
                        }
                    }
                }
                catch (Exception e)
                {
                    string a = e.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            return c;
        }
        public static bool editarCliente(ClsCliente c)
        {
            bool resultado = false;
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @" UPDATE Clientes SET cliNombre= @nombre, cliApellido= @apellido, cliDocumento= @doc,
                                    cliCUIT = @cuit, cliTel= @tel, cliEmail = @email, cliCalle = @calle, cliAltura = @altura, cliPais = @pais,
                                    cliProvincia = @provincia, cliLocalidad = @localidad, cliBarrio = @barrio, cliCodigoPostal = @postal,
                                    cliFecha_nac = @fecha , cliPiso = @piso, cliNroDpto = @nroDpto,cliUsuario = @usuario, cliFechaModif = getdate() where cliId = @ID";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@ID", c.cCliId);
                cmd.Parameters.AddWithValue("@nombre", c.cNombre);
                cmd.Parameters.AddWithValue("@apellido", c.cApellido);
                cmd.Parameters.AddWithValue("@doc", c.cDocumento);
                cmd.Parameters.AddWithValue("@cuit", c.cCUIT);
                cmd.Parameters.AddWithValue("@tel", c.cTel);
                if(c.cEmail == null)
                {
                    c.cEmail = "";
                }
                cmd.Parameters.AddWithValue("@email", c.cEmail);
                cmd.Parameters.AddWithValue("@calle", c.cCalle);
                cmd.Parameters.AddWithValue("@altura", c.cAltura);
                cmd.Parameters.AddWithValue("@pais", c.cIdPais);
                cmd.Parameters.AddWithValue("@provincia", c.cIdProvincia);
                cmd.Parameters.AddWithValue("@localidad", c.cIdLocalidad);
                cmd.Parameters.AddWithValue("@barrio", c.cIdBarrio);
                cmd.Parameters.AddWithValue("@postal", c.cCodPostal);
                cmd.Parameters.AddWithValue("@fecha", c.cFechaNacimiento);
                if(c.cPiso== null)
                {
                    c.cPiso = "";
                }
                cmd.Parameters.AddWithValue("@piso", c.cPiso);
                if(c.cNroDpto == null)
                {
                    c.cNroDpto = "";
                }
                cmd.Parameters.AddWithValue("@nroDpto", c.cNroDpto);
                cmd.Parameters.AddWithValue("@usuario", usu);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;


            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return resultado;

        }
        public static bool eliminarCliente(int id, string nota)
        {
            bool resultado = false;
            string consulta = "UPDATE Clientes SET cliEstado = 615, CliNota = @nota where cliId = @value";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            try
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@value", id);
                cmd.Parameters.AddWithValue("@nota", nota);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return resultado;
        }
        public static bool dardeAltaCliente(int id)
        {
            bool resultado = false;
            string consulta = "UPDATE Clientes SET cliEstado = 613 where cliId = @value";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            try
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@value", id);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return resultado;
        }
        public static List<atributosLugarcs> busquedaLugares(string dominio, string parametro)
        {
            List<atributosLugarcs> lista = new List<atributosLugarcs>();
            string consulta = "";
            if ("Pais".Equals(dominio))
            {
                consulta = @"select descripcion, descripcionCorta as Descripcion from Tabla_Parametros where Dominio like '%" + dominio + "%' and descripcion like '%" + parametro + "%' ";
            }
            else if ("Provincia".Equals(dominio))
            {
                consulta = @"select descripcion, descripcionCorta as Descripcion from Tabla_Parametros where Dominio like '%" + dominio + "%' and descripcion like '%" + parametro + "%' ";
            }
            else if ("Localidad".Equals(dominio))
            {
                consulta = @"select descripcion, descripcionCorta as Descripcion from Tabla_Parametros where Dominio like '%" + dominio + "%' and descripcion like '%" + parametro + "%' ";
            }
            else
            {
                consulta = @"select descripcion, descripcionCorta as Descripcion from Tabla_Parametros where Dominio like '%" + dominio + "%' and descripcion like '%" + parametro + "%' ";
            }
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                //cmd.Parameters.AddWithValue("@name", nombre);
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                //if (dr != null)
                //{
                while (dr.Read())
                {
                    atributosLugarcs c = new atributosLugarcs();
                    c.descripcion = dr["Descripcion"].ToString();
                    c.nombre = dr["descripcion"].ToString();
                    lista.Add(c);
                }
                //}
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return lista;
        }
        public static bool agregarLugar(string descrip, string dom, string cod)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta1 = @"insert into Tabla_Parametros(cod,descripcion,descripcionCorta,Dominio) values (@cod, @descripcion, @descripcionCorta, @dominio)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@cod", cod);
                cmd.Parameters.AddWithValue("@descripcion", descrip);
                cmd.Parameters.AddWithValue("@descripcionCorta", descrip);
                cmd.Parameters.AddWithValue("@dominio", dom);
                cnn.Open();
                cmd.Connection = cnn;
                cmd.CommandText = consulta1;
                cmd.ExecuteNonQuery();
                resultado = true;
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return resultado;
        }
        public static List<ClsClienteModal> CrudoClientes()
        {
            List<ClsClienteModal> lista = new List<ClsClienteModal>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta1 = @"select cliId, cliNombre, cliApellido, cliDocumento, cliEmail, cliTel, cliEstado, CliNota from clientes";
                cnn.Open();
                cmd.Connection = cnn;
                cmd.CommandText = consulta1;
                SqlDataReader dr = cmd.ExecuteReader();
                if(dr != null)
                {
                    while(dr.Read())
                    {
                        ClsClienteModal c = new ClsClienteModal();
                        c.cApellido = dr["cliApellido"].ToString();
                        c.cCliId = Convert.ToInt32(dr["cliId"].ToString());
                        c.cDocumento = dr["cliDocumento"].ToString();
                        c.cNombre = dr["cliNombre"].ToString();
                        c.cEmasil = dr["cliEmail"].ToString();
                        c.cTel = dr["cliTel"].ToString();
                        c.cEstado = Convert.ToInt32(dr["cliEstado"].ToString());
                        c.cNotaBaja = dr["CliNota"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return lista;
        }
        public static List<ClsCliente> buscarCliente(string parametro, string radi1,string radi2,string radi3)
        {
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            string consulta = "";
            List<ClsCliente> lista = new List<ClsCliente>();

            if (radi1.Equals("true"))
            {
                consulta = @"select * from Clientes where cliDocumento like '" + parametro + "%' ";
            }
            if (radi2.Equals("true"))
            {
                consulta = @"select * from Clientes where upper(cliNombre) like '%" + parametro + "%' or upper(cliApellido) like '%" + parametro + "%' ";
            }
            if(radi3.Equals("true"))
            {
                consulta = @"select * from clientes c inner join prestamos p on c.cliId = p.presCliId where presContratoNro = " + parametro + " and PresEstado = 613";
            }
            try
            {
                SqlCommand cmd = new SqlCommand();


                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    ClsCliente c = new ClsCliente();
                    c.cCliId = Convert.ToInt32(dr["cliId"].ToString());
                    c.cNombre = dr["cliNombre"].ToString();
                    c.cApellido = dr["cliApellido"].ToString();
                    c.cDocumento = dr["cliDocumento"].ToString();
                    c.cTel = dr["cliTel"].ToString();
                    if(dr.IsDBNull(4))
                    {

                    }
                    else
                    {
                        c.cCUIT = dr["cliCUIT"].ToString();
                    }
                    c.cEmail = dr["cliEmail"].ToString();
                    lista.Add(c);
                }
            }
            catch (Exception error)
            {

                string mensaje = error.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        ///////// F I N   C L I E N T E
        ///
        /// 
        /// I N I C I O   P R E S T A M O
        /// 
        public static List<CsMostrarParametro> cargarCombotiempoCobro()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = 'tipoTiempoCobro'";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static string tomarNroNvoPrestamo()
        {
            int ultimo = 0;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select max(PresId) as ultimo from prestamos";
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ultimo = int.Parse(dr["ultimo"].ToString());

                    }
                }
            }
            catch (Exception er)
            {
                er.ToString();
            }
            finally
            {
                cnn.Close();
            }
            if (ultimo == 0)
            {
                ultimo = 1;
            }
            else
            {
                ultimo = ultimo + 1;
            }
            return ultimo.ToString();
        }
        public static List<ClsPrestamo> generacionTablaPrestamoReliqui(ClsPrestamo p, string monto)
        {
            List<ClsPrestamo> lista = new List<ClsPrestamo>();

            int mCantField = 0;
            double mCuota = 0;
            double minteres = 0;
            double mAmortig = 0;
            int meses = 0;
            int mdias = 0;
            string monto1 = "";
            string tipoCobranza = "";
            string interes1 = p.pInteres.ToString();
            if(!monto.Equals("NaN") && monto != "")
            {
                monto1 = monto;
            }
            else if(p.pMontoSolicitado != "")
            {
                monto1 = p.pMontoSolicitado.ToString();
            }
            else
            {
                string deudita = p.pDeuda;
                deudita = deudita.Replace('$', ' ');
                monto1 = deudita;
            }
            p.pInteres = fx.ReemplazoComaDecimal(interes1);
            //p.pMontoSolicitado = p.pMontoSolicitado.Replace(".", "");
            p.pMontoSolicitado = fx.ReemplazoComaDecimal(p.pMontoSolicitado);
            p.pPlan = p.pPlan;
            p.pTipoCobro = p.pTipoCobro;
            p.pDiaVencimiento = p.pDiaVencimiento;
            //p.pFechaPrimeraCuota = DateTime.Format("{0:dd-MM-yyyy}", p.pFechaPrimeraCuota);
            p.pFechaPrimeraCuota = p.pFechaPrimeraCuota;
            int cantCuotas = Convert.ToInt32(p.pPlan);

            mCuota = Math.Round(Convert.ToDouble(p.pMontoSolicitado) / Convert.ToDouble(p.pPlan), 2);
            minteres = Math.Round(((mCuota * (Convert.ToDouble(p.pInteres) * Convert.ToDouble(p.pPlan))) / Convert.ToDouble(100)), 2);
            mAmortig = Math.Round(Convert.ToDouble(p.pMontoSolicitado));

            DateTime Fechas = new DateTime();
            DateTime Fecha = new DateTime();
            Fechas = Convert.ToDateTime(p.pFechaPrimeraCuota);

            for (int i = 0; i < cantCuotas; i++)
            {
                ClsPrestamo t = new ClsPrestamo();
                if (i == 0)
                {
                    Fecha = Convert.ToDateTime(p.pFechaPrimeraCuota);
                }
                else
                {
                    if (i == 1)
                    {
                        DateTime mFecha = new DateTime(Fecha.Year, Fecha.Month, Convert.ToInt32(p.pDiaVencimiento));
                        Fechas = mFecha;
                    }

                    switch (p.pTipoCobro)
                    {
                        case 661:
                            Fecha = Fechas.AddMonths(1);
                            Fechas = Fecha;
                            break;
                        case 662:
                            Fecha = Fechas.AddMonths(2);
                            Fechas = Fecha;
                            break;
                        case 663:
                            Fecha = Fechas.AddMonths(6);
                            Fechas = Fecha;
                            break;
                        case 664:
                            Fecha = Fechas.AddDays(15);
                            Fechas = Fecha;
                            break;
                        case 665:
                            Fecha = Fechas.AddDays(7);
                            Fechas = Fecha;
                            break;
                        case 666:
                            Fecha = Fechas.AddDays(1);
                            Fechas = Fecha;
                            break;
                    }
                }

                t.nroCuota = i + 1;
                t.capital = String.Format("{0:0#.00}", mCuota);
                t.capital = t.capital.Replace(',', '.');
                t.interes = String.Format("{0:0#.00}", minteres);
                t.interes = t.interes.Replace(',', '.');
                t.fecha = String.Format("{0:dd-MM-yyyy}", Fecha);
                t.capFinal = String.Format("{0:#.00}", fx.CalcTotalFinanciado(fx.ReemplazoComaDecimal(p.pMontoSolicitado), fx.ReemplazoComaDecimal(interes1), p.pPlan.ToString()));
                t.capFinal = t.capFinal.Replace(',', '.');
                t.intFinal = String.Format("{0:#.00}", fx.CalcTotalInteres(fx.ReemplazoComaDecimal(p.pMontoSolicitado), fx.ReemplazoComaDecimal(interes1), p.pPlan.ToString()));
                t.intFinal = t.intFinal.Replace(',', '.');
                lista.Add(t);
            }
            return lista;
        }
        public static List<ClsPrestamo> generacionTablaPrestamo(ClsPrestamo p, string monto)
        {
            List<ClsPrestamo> lista = new List<ClsPrestamo>();

            int mCantField = 0;
            double mCuota = 0;
            double minteres = 0;
            double mAmortig = 0;
            int meses = 0;
            int mdias = 0;
            string monto1 = "";
            string tipoCobranza = "";
            string interes1 = p.pInteres.ToString();
            if(!monto.Equals("NaN") && monto != "")
            {
                monto1 = monto;
            }
            else if(p.pMontoSolicitado != "")
            {
                monto1 = p.pMontoSolicitado.ToString();
            }
            else
            {
                string deudita = p.pDeuda;
                deudita = deudita.Replace('$', ' ');
                monto1 = deudita;
            }
            p.pInteres = fx.ReemplazoComaDecimal(interes1);
            p.pMontoSolicitado = p.pMontoSolicitado.Replace(".", "");
            p.pMontoSolicitado = fx.ReemplazoComaDecimal(p.pMontoSolicitado);
            p.pPlan = p.pPlan;
            p.pTipoCobro = p.pTipoCobro;
            p.pDiaVencimiento = p.pDiaVencimiento;
            //p.pFechaPrimeraCuota = DateTime.Format("{0:dd-MM-yyyy}", p.pFechaPrimeraCuota);
            p.pFechaPrimeraCuota = p.pFechaPrimeraCuota;
            int cantCuotas = Convert.ToInt32(p.pPlan);

            mCuota = Math.Round(Convert.ToDouble(p.pMontoSolicitado) / Convert.ToDouble(p.pPlan), 2);
            minteres = Math.Round(((mCuota * (Convert.ToDouble(p.pInteres) * Convert.ToDouble(p.pPlan))) / Convert.ToDouble(100)), 2);
            mAmortig = Math.Round(Convert.ToDouble(p.pMontoSolicitado));

            DateTime Fechas = new DateTime();
            DateTime Fecha = new DateTime();
            Fechas = Convert.ToDateTime(p.pFechaPrimeraCuota);

            for (int i = 0; i < cantCuotas; i++)
            {
                ClsPrestamo t = new ClsPrestamo();
                if (i == 0)
                {
                    Fecha = Convert.ToDateTime(p.pFechaPrimeraCuota);
                }
                else
                {
                    if (i == 1)
                    {
                        DateTime mFecha = new DateTime(Fecha.Year, Fecha.Month, Convert.ToInt32(p.pDiaVencimiento));
                        Fechas = mFecha;
                    }

                    switch (p.pTipoCobro)
                    {
                        case 661:
                            Fecha = Fechas.AddMonths(1);
                            Fechas = Fecha;
                            break;
                        case 662:
                            Fecha = Fechas.AddMonths(2);
                            Fechas = Fecha;
                            break;
                        case 663:
                            Fecha = Fechas.AddMonths(6);
                            Fechas = Fecha;
                            break;
                        case 664:
                            Fecha = Fechas.AddDays(15);
                            Fechas = Fecha;
                            break;
                        case 665:
                            Fecha = Fechas.AddDays(7);
                            Fechas = Fecha;
                            break;
                        case 666:
                            Fecha = Fechas.AddDays(1);
                            Fechas = Fecha;
                            break;
                    }
                }

                t.nroCuota = i + 1;
                t.capital = String.Format("{0:0#.00}", mCuota);
                t.capital = t.capital.Replace(',', '.');
                t.interes = String.Format("{0:0#.00}", minteres);
                t.interes = t.interes.Replace(',', '.');
                t.fecha = String.Format("{0:dd-MM-yyyy}", Fecha);
                t.capFinal = String.Format("{0:#.00}", fx.CalcTotalFinanciado(fx.ReemplazoComaDecimal(p.pMontoSolicitado), fx.ReemplazoComaDecimal(interes1), p.pPlan.ToString()));
                t.capFinal = t.capFinal.Replace(',', '.');
                t.intFinal = String.Format("{0:#.00}", fx.CalcTotalInteres(fx.ReemplazoComaDecimal(p.pMontoSolicitado), fx.ReemplazoComaDecimal(interes1), p.pPlan.ToString()));
                t.intFinal = t.intFinal.Replace(',', '.');
                lista.Add(t);
            }
            return lista;
        }

        public static bool confimacionPrestamo(ClsPrestamo c)
        {
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            int identificacion;
            bool resultado = false;
            ClsPrestamo p = new ClsPrestamo();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {

                SqlCommand cmd = new SqlCommand();
                string consulta = @"INSERT INTO Prestamos (PresContratoNro , PresCliId , PresMontoSolicitado , PresPlan , PresPorcMensual , PresFecha , PresFechaPrimeraCuota , PresDiadelMesCuota , PresIntervaloCobranza , PresFecaud , PresUsuario , PresEstado, PresIdProducto, PresNota, PresEntrega) 
                                    VALUES (@PresContratoNro, @CliId, @PresMontoSolicitado, @PresPlan, @PresPorcMensual, @PresFecha, @PresFechaPrimeraCuota, @PresDiadelMesCuota, @PresIntervaloCobranza, getdate(), @PresUsuario, 613, @producto, @nota, @entrega)";
                if(c.pNotas== null)
                {
                    c.pNotas = "";
                }
                if(c.pEntrega == null)
                {
                    c.pEntrega = "0";
                }
                //cp.pcPresUsuario = usu;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@PresContratoNro", c.pNroContrato);
                cmd.Parameters.AddWithValue("@CliId", c.pClidId);
                cmd.Parameters.AddWithValue("@PresMontoSolicitado", c.pMontoSolicitado);
                cmd.Parameters.AddWithValue("@PresPlan", c.pPlan);
                cmd.Parameters.AddWithValue("@PresPorcMensual", c.pInteres);
                cmd.Parameters.AddWithValue("@PresFecha", c.pFechaContrato);
                cmd.Parameters.AddWithValue("@PresFechaPrimeraCuota", c.pFechaPrimeraCuota);
                cmd.Parameters.AddWithValue("@PresDiadelMesCuota", c.pDiaVencimiento);
                cmd.Parameters.AddWithValue("@PresIntervaloCobranza", c.pTipoCobro);
                cmd.Parameters.AddWithValue("@PresUsuario", usu);
                cmd.Parameters.AddWithValue("@producto", c.pIdMoto);
                cmd.Parameters.AddWithValue("@nota", c.pNotas);
                cmd.Parameters.AddWithValue("@entrega", c.pEntrega);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
                if (resultado)
                {
                    int ident = 0;
                    try
                    {
                        SqlCommand cmd1 = new SqlCommand();
                        string consulta1 = @"SELECT @@IDENTITY as lastid";
                        cmd1.CommandType = System.Data.CommandType.Text;
                        cmd1.CommandText = consulta1;

                        cmd1.Connection = cnn;

                        SqlDataReader dr = cmd1.ExecuteReader();
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                ident = int.Parse(dr["lastid"].ToString());

                            }
                        }
                    }

                    catch (Exception ex)
                    {
                        ex.ToString();
                    }
                    finally
                    {
                        cnn.Close();
                    }
                    resultado = creacionCuotas(ident, c);
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
                
            }
           
            return resultado;
        }
        public  static bool creacionCuotas(int cod, ClsPrestamo p)
        {
            bool resultado = false;
            double mCuota = 0;
            double minteres = 0;
            double mAmortig = 0;
            string interes1 = p.pInteres.ToString();
            string monto1 = p.pMontoSolicitado.ToString();
            double montoCuota;
            string formato;
            p.pInteres = fx.ReemplazoComaDecimal(interes1);
            p.pMontoSolicitado = monto1;
            p.pMontoSolicitado = p.pMontoSolicitado.Replace(".", "");
            p.pMontoSolicitado = fx.ReemplazoComaDecimal(p.pMontoSolicitado);
            p.pPlan = p.pPlan;
            p.pTipoCobro = p.pTipoCobro;
            p.pDiaVencimiento = p.pDiaVencimiento;
            p.pFechaPrimeraCuota = p.pFechaPrimeraCuota;
            p.pNroContrato = p.pNroContrato;
            int cantCuotas = Convert.ToInt32(p.pPlan);

            mCuota = Math.Round(Convert.ToDouble(p.pMontoSolicitado) / Convert.ToDouble(p.pPlan), 2);
            minteres = Math.Round(((mCuota * (Convert.ToDouble(p.pInteres) * Convert.ToDouble(p.pPlan))) / Convert.ToDouble(100)), 2);
            mAmortig = Math.Round(Convert.ToDouble(p.pMontoSolicitado));

            DateTime Fechas = new DateTime();
            DateTime Fecha = new DateTime();
            Fechas = Convert.ToDateTime(p.pFechaPrimeraCuota);

            for (int i = 0; i < cantCuotas; i++)
            {
                ClsPrestamo t = new ClsPrestamo();
                if (i == 0)
                {
                    Fecha = Convert.ToDateTime(p.pFechaPrimeraCuota);
                    formato = Fecha.ToString("yyyy-MM-dd");
                    t.fecha = formato;
                }
                else
                {
                    if (i == 1)
                    {
                        DateTime mFecha = new DateTime(Fecha.Year, Fecha.Month, Convert.ToInt32(p.pDiaVencimiento));
                        Fechas = mFecha;
                    }

                    switch (p.pTipoCobro)
                    {
                        case 661:
                            Fecha = Fechas.AddMonths(1);
                            Fechas = Fecha;
                            break;
                        case 662:
                            Fecha = Fechas.AddMonths(2);
                            Fechas = Fecha;
                            break;
                        case 663:
                            Fecha = Fechas.AddMonths(6);
                            Fechas = Fecha;
                            break;
                        case 664:
                            Fecha = Fechas.AddDays(15);
                            Fechas = Fecha;
                            break;
                        case 665:
                            Fecha = Fechas.AddDays(7);
                            Fechas = Fecha;
                            break;
                        case 666:
                            Fecha = Fechas.AddDays(1);
                            Fechas = Fecha;
                            break;
                    }
                    t.fecha = Fecha.ToString("yyyy-MM-dd");
                }
                t.pClidId = p.pClidId;
                t.nroCuota = i + 1;
                t.capital = String.Format("{0:#.00}", mCuota);
                t.interes = String.Format("{0:#.00}", minteres);
                string capital = t.capital.Replace(',','.');
                string interes = t.interes.Replace(',', '.');
                //t.fecha = String.Format("{0:dd-MM-yyyy}", Fecha);
                t.capFinal = String.Format("{0:#.00}", fx.CalcTotalFinanciado(fx.ReemplazoComaDecimal(p.pMontoSolicitado), fx.ReemplazoComaDecimal(interes1), p.pPlan.ToString()));
                t.intFinal = String.Format("{0:#.00}", fx.CalcTotalInteres(fx.ReemplazoComaDecimal(p.pMontoSolicitado), fx.ReemplazoComaDecimal(interes1), p.pPlan.ToString()));
                t.pNroContrato = p.pNroContrato;
                montoCuota = Convert.ToDouble(t.capital) + Convert.ToDouble(t.interes);
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                SqlCommand cmd = new SqlCommand();
                string consulta = @"INSERT INTO Cuotas (CuoPrestamosId, CliId, CuoNroCuota, CuoImporteCapital, CuoImporteIntereses, CuoFechaVencimiento, CuoImporteCuota, CuoEstado, CuoSaldoImpago) VALUES
                                    (@NroContrato, @cliente, @NroCuota, @Cap, @Int, @venc, @Importe, @estado, @impago)";
                
                try
                {
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@NroContrato", t.pNroContrato);
                    cmd.Parameters.AddWithValue("@cliente", t.pClidId);
                    cmd.Parameters.AddWithValue("@NroCuota", t.nroCuota);
                    cmd.Parameters.AddWithValue("@Cap", capital);
                    cmd.Parameters.AddWithValue("@Int", interes);
                    cmd.Parameters.AddWithValue("@venc", t.fecha);
                    cmd.Parameters.AddWithValue("@Importe", montoCuota);
                    cmd.Parameters.AddWithValue("@estado", 642);
                    cmd.Parameters.AddWithValue("@impago", montoCuota);

                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch(Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            return resultado;
        }
        public static List<ClsDatosPrestamo> busquedaDePrestamosActivos(string documento)
        {
            List<ClsDatosPrestamo> lista = new List<ClsDatosPrestamo>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();

                string consulta = @"select p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresEntrega, p.PresFecha, p.PresNota ,p.PresFechaPrimeraCuota, p.PresIdProducto, pr.proNombre,pr.proId, a.descripcion,
                    p.PresDiadelMesCuota, p.PresIntervaloCobranza, p.PresFecaud, p.PresUsuario, c.cliApellido, p.PresEstado, t.descripcionCorta,
                    isnull(sum(CONVERT(float,CuoImporteCapital) + CONVERT(float,CuoImporteIntereses)),0) Capital_Financiado  , isnull(sum(CONVERT(float, REPLACE (cuoImporteCobrado, ',' , '.' ))),0) cobrado,
                    sum(CASE WHEN [CuoEstado] = 643 then 1 else 0 end) cuotascobrados 
                    from Prestamos p LEFT JOIN Clientes c ON p.PresCliId = c.cliId LEFT JOIN Tabla_Parametros t ON p.PresEstado = t.Id_Param LEFT JOIN
                    cuotas cu on cu.CuoPrestamosId = p.PresContratoNro INNER JOIN Productos pr on pr.proId = p.PresIdProducto
                    INNER JOIN Tabla_Parametros a ON a.Id_Param = pr.proMarca
                   WHERE CONVERT(decimal,cliDocumento) = @cliDoc and PresEstado= 613 
                   group by p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresFecha, p.PresEntrega, p.PresFechaPrimeraCuota, p.PresDiadelMesCuota, 
	               p.PresIntervaloCobranza, p.PresFecaud, p.PresUsuario, c.cliApellido, p.PresEstado, t.descripcionCorta, p.PresIdProducto,pr.proNombre, a.descripcion, pr.proId, p.PresNota
                   order by p.PresContratoNro Asc";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@cliDoc", documento);
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ClsDatosPrestamo p = new ClsDatosPrestamo();
                        p.dpApellidoCliente = dr["cliApellido"].ToString();
                        p.dpCapitalFinanciado = dr["Capital_Financiado"].ToString();
                        p.dpCuotasCobradas = Convert.ToInt32(dr["cuotascobrados"].ToString());
                        p.dpDiaVencim = Convert.ToInt32(dr["PresDiadelMesCuota"].ToString());
                        p.dpEstado = dr["descripcionCorta"].ToString();
                        p.dpEstadoPrestamo = Convert.ToInt32(dr["PresEstado"].ToString());
                        p.dpFecha = Convert.ToDateTime(dr["PresFecha"].ToString());
                        p.dpFechaModif = Convert.ToDateTime(dr["PresFecaud"].ToString());
                        p.pImporteCobrado = dr["cobrado"].ToString();
                        p.dpIntervaloCobro = dr["PresIntervaloCobranza"].ToString();
                        p.dpMontoSolicitado = dr["PresMontoSolicitado"].ToString();
                        p.dpNroContrato = Convert.ToInt32(dr["PresContratoNro"].ToString());
                        p.dpPlan = Convert.ToInt32(dr["PresPlan"].ToString());
                        p.dpPorcej = Convert.ToDecimal(dr["PresPorcMensual"].ToString());
                        p.dpPrimeraCuota = Convert.ToDateTime(dr["PresFechaPrimeraCuota"].ToString());
                        p.dpUsuario = dr["PresUsuario"].ToString();
                        p.dpNombreMoto = dr["proNombre"].ToString();
                        p.dpMarcaMoto = dr["descripcion"].ToString();
                        p.pIDproducto = Convert.ToInt32(dr["proId"].ToString());
                        p.dpNota = dr["PresNota"].ToString();
                        p.dpEntrega = Convert.ToDouble(dr["PresEntrega"].ToString());
                        lista.Add(p);

                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<ClsDatosPrestamo> busquedaDePrestamos(string documento)
        {
            List<ClsDatosPrestamo> lista = new List<ClsDatosPrestamo>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();

                string consulta = @"select p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresEntrega, p.PresFecha, p.PresNota ,p.PresFechaPrimeraCuota, p.PresIdProducto, pr.proNombre,pr.proId, a.descripcion,
                    p.PresDiadelMesCuota, p.PresIntervaloCobranza, p.PresFecaud, p.PresUsuario, c.cliApellido, p.PresEstado, t.descripcionCorta,
                    isnull(sum(CONVERT(float,CuoImporteCapital) + CONVERT(float,CuoImporteIntereses)),0) Capital_Financiado  , isnull(sum(CONVERT(float, REPLACE (cuoImporteCobrado, ',' , '.' ))),0) cobrado,
                    sum(CASE WHEN [CuoEstado] = 643 then 1 else 0 end) cuotascobrados 
                    from Prestamos p LEFT JOIN Clientes c ON p.PresCliId = c.cliId LEFT JOIN Tabla_Parametros t ON p.PresEstado = t.Id_Param LEFT JOIN
                    cuotas cu on cu.CuoPrestamosId = p.PresContratoNro INNER JOIN Productos pr on pr.proId = p.PresIdProducto
                    INNER JOIN Tabla_Parametros a ON a.Id_Param = pr.proMarca
                   WHERE CONVERT(decimal,cliDocumento) = @cliDoc and (PresEstado= 613 or presestado = 682)
                   group by p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresFecha, p.PresEntrega, p.PresFechaPrimeraCuota, p.PresDiadelMesCuota, 
	               p.PresIntervaloCobranza, p.PresFecaud, p.PresUsuario, c.cliApellido, p.PresEstado, t.descripcionCorta, p.PresIdProducto,pr.proNombre, a.descripcion, pr.proId, p.PresNota
                   order by p.PresContratoNro Asc";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@cliDoc", documento);
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ClsDatosPrestamo p = new ClsDatosPrestamo();
                        p.dpApellidoCliente = dr["cliApellido"].ToString();
                        p.dpCapitalFinanciado = dr["Capital_Financiado"].ToString();
                        p.dpCuotasCobradas = Convert.ToInt32(dr["cuotascobrados"].ToString());
                        p.dpDiaVencim = Convert.ToInt32(dr["PresDiadelMesCuota"].ToString());
                        p.dpEstado = dr["descripcionCorta"].ToString();
                        p.dpEstadoPrestamo = Convert.ToInt32(dr["PresEstado"].ToString());
                        p.dpFecha = Convert.ToDateTime(dr["PresFecha"].ToString());
                        p.dpFechaModif = Convert.ToDateTime(dr["PresFecaud"].ToString());
                        p.pImporteCobrado = dr["cobrado"].ToString();
                        p.dpIntervaloCobro = dr["PresIntervaloCobranza"].ToString();
                        p.dpMontoSolicitado = dr["PresMontoSolicitado"].ToString();
                        p.dpNroContrato = Convert.ToInt32(dr["PresContratoNro"].ToString());
                        p.dpPlan = Convert.ToInt32(dr["PresPlan"].ToString());
                        p.dpPorcej = Convert.ToDecimal(dr["PresPorcMensual"].ToString());
                        p.dpPrimeraCuota = Convert.ToDateTime(dr["PresFechaPrimeraCuota"].ToString());
                        p.dpUsuario = dr["PresUsuario"].ToString();
                        p.dpNombreMoto = dr["proNombre"].ToString();
                        p.dpMarcaMoto = dr["descripcion"].ToString();
                        p.pIDproducto = Convert.ToInt32(dr["proId"].ToString());
                        p.dpNota = dr["PresNota"].ToString();
                        p.dpEntrega = Convert.ToDouble(dr["PresEntrega"].ToString());
                        lista.Add(p);

                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<ClsDatosPrestamo> busquedaDePrestamos2(string documento)
        {
            List<ClsDatosPrestamo> lista = new List<ClsDatosPrestamo>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();

                string consulta = @"select p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresEntrega, p.PresFecha, p.PresNota ,p.PresFechaPrimeraCuota, p.PresIdProducto, pr.proNombre,pr.proId, a.descripcion,
                    p.PresDiadelMesCuota, p.PresIntervaloCobranza, p.PresFecaud, p.PresUsuario, c.cliApellido, p.PresEstado, t.descripcionCorta,
                    isnull(sum(CONVERT(float,CuoImporteCapital) + CONVERT(float,CuoImporteIntereses)),0) Capital_Financiado  , isnull(sum(CONVERT(float, REPLACE (cuoImporteCobrado, ',' , '.' ))),0) cobrado,
                    sum(CASE WHEN [CuoEstado] = 643 then 1 else 0 end) cuotascobrados 
                    from Prestamos p LEFT JOIN Clientes c ON p.PresCliId = c.cliId LEFT JOIN Tabla_Parametros t ON p.PresEstado = t.Id_Param LEFT JOIN
                    cuotas cu on cu.CuoPrestamosId = p.PresContratoNro INNER JOIN Productos pr on pr.proId = p.PresIdProducto
                    INNER JOIN Tabla_Parametros a ON a.Id_Param = pr.proMarca
                   WHERE CONVERT(decimal,cliDocumento) = @cliDoc and (PresEstado= 613 or presestado = 682)
                   group by p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresFecha, p.PresEntrega, p.PresFechaPrimeraCuota, p.PresDiadelMesCuota, 
	               p.PresIntervaloCobranza, p.PresFecaud, p.PresUsuario, c.cliApellido, p.PresEstado, t.descripcionCorta, p.PresIdProducto,pr.proNombre, a.descripcion, pr.proId, p.PresNota
                   order by p.PresContratoNro Asc";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@cliDoc", documento);
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ClsDatosPrestamo p = new ClsDatosPrestamo();
                        p.dpApellidoCliente = dr["cliApellido"].ToString();
                        p.dpCapitalFinanciado = dr["Capital_Financiado"].ToString();
                        p.dpCuotasCobradas = Convert.ToInt32(dr["cuotascobrados"].ToString());
                        p.dpDiaVencim = Convert.ToInt32(dr["PresDiadelMesCuota"].ToString());
                        p.dpEstado = dr["descripcionCorta"].ToString();
                        p.dpEstadoPrestamo = Convert.ToInt32(dr["PresEstado"].ToString());
                        p.dpFecha = Convert.ToDateTime(dr["PresFecha"].ToString());
                        p.dpFechaModif = Convert.ToDateTime(dr["PresFecaud"].ToString());
                        p.pImporteCobrado = dr["cobrado"].ToString();
                        p.dpIntervaloCobro = dr["PresIntervaloCobranza"].ToString();
                        p.dpMontoSolicitado =dr["PresMontoSolicitado"].ToString();
                        p.dpNroContrato = Convert.ToInt32(dr["PresContratoNro"].ToString());
                        p.dpPlan = Convert.ToInt32(dr["PresPlan"].ToString());
                        p.dpPorcej = Convert.ToDecimal(dr["PresPorcMensual"].ToString());
                        p.dpPrimeraCuota = Convert.ToDateTime(dr["PresFechaPrimeraCuota"].ToString());
                        p.dpUsuario = dr["PresUsuario"].ToString();
                        p.dpNombreMoto = dr["proNombre"].ToString();
                        p.dpMarcaMoto = dr["descripcion"].ToString();
                        p.pIDproducto = Convert.ToInt32(dr["proId"].ToString());
                        p.dpNota = dr["PresNota"].ToString();
                        p.dpEntrega = Convert.ToDouble(dr["PresEntrega"].ToString());
                        lista.Add(p);

                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<ClsDatosPrestamo> cuotasAdeudadas(int nroContrato)
        {
            List<ClsDatosPrestamo> lista = new List<ClsDatosPrestamo>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            string montoSol = "";
            if (nroContrato > 0)
            {
                string consulta = @"SELECT p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresFecha, p.PresFechaPrimeraCuota, 
                                 p.PresDiadelMesCuota, p.PresIntervaloCobranza, c.cliNombre, c.cliApellido, p.PresEstado, cu.CuoNroCuota, cu.CuoImporteCapital, 
                                 cu.CuoImporteIntereses, cu.CuoSaldoImpago, cu.CuoEstado, cu.CuoFechaVencimiento, cu.CuoImporteCuota
                                FROM Prestamos p INNER JOIN Clientes c ON p.PresCliId = c.cliId INNER JOIN Cuotas cu ON p.PresContratoNro = cu.CuoPrestamosId
                                WHERE p.PresContratoNro = @nroContrato  and cu.CuoEstado = 642";
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nroContrato", nroContrato);
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr1 = cmd.ExecuteReader();
                try
                {        
                    if (dr1 != null)
                    {
                        while (dr1.Read())
                        {
                            ClsDatosPrestamo p = new ClsDatosPrestamo();
                            p.dpNroCuota = Convert.ToInt32(dr1["CuoNroCuota"].ToString());
                            p.dpCuoImpCap = dr1["CuoImporteCapital"].ToString();
                            p.dpCuoImpInteres = dr1["CuoImporteIntereses"].ToString();
                            p.dpCuoFechaVenc = Convert.ToDateTime(dr1["CuoFechaVencimiento"].ToString());
                            p.dpImporCuota = dr1["CuoImporteCuota"].ToString();
                            p.dpCuoSaldoImpago = dr1["CuoSaldoImpago"].ToString();
                            p.dpMontoSolicitado = dr1["PresMontoSolicitado"].ToString();
                            montoSol = p.dpMontoSolicitado.ToString();
                            montoSol = String.Format("{0:0#.00}", montoSol);
                            montoSol = montoSol.Replace(',', '.');
                            p.dpMontoSolicitado = montoSol;
                            p.dpPlan = Convert.ToInt32(dr1["PresPlan"].ToString());
                            p.dpIntervaloCobro = dr1["PresIntervaloCobranza"].ToString();
                            p.dpPrimeraCuota = Convert.ToDateTime(dr1["PresFechaPrimeraCuota"].ToString());
                            p.dpDiaVencim = Convert.ToInt32(dr1["PresDiadelMesCuota"].ToString());
                            p.dpFecha = Convert.ToDateTime(dr1["PresFecha"].ToString());
                            p.dpPorcej = Convert.ToDecimal(dr1["PresPorcMensual"].ToString());

                            lista.Add(p);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            return lista;
        }
        public static List<ClsCuota> busquedadeCuotas(string PresContratoNro)
        {
            List<ClsCuota> lista = new List<ClsCuota>();
            string hola = "Null";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                string consulta = @"SELECT CuoPrestamosId, descripcionCorta, CuoNroCuota, CuoImporteCapital,CuoImporteIntereses, CuoFechaVencimiento,
				   CuoImporteCuota, CuoSaldoImpago, CuoFechaCobro, CuoImporteCobrado, CuoNroRecibo, CuoIInteresMora,
				   CuoEstado 
			       FROM Cuotas c inner join Tabla_Parametros t on t.Id_Param = c.CuoEstado
			       where CuoPrestamosId = @nroContrato and c.CuoEstado <> 644
			       order by CuoNroCuota asc";
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nroContrato", PresContratoNro);
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ClsCuota c = new ClsCuota();
                        c.cDesc = dr["descripcionCorta"].ToString();
                        c.cEstado = Convert.ToInt32(dr["CuoEstado"].ToString());
                        if (dr.IsDBNull(8))
                        {
                            hola = "null";
                        }
                        else
                        {
                            c.cFechaPago = dr.GetDateTime(8);
                        }
                        c.cImpCapital = dr["CuoImporteCapital"].ToString();
                        if (dr.IsDBNull(9))
                        { c.cImpCobrado = "0,00"; }
                        else
                        { c.cImpCobrado = dr.GetString(9); }
                        //c.cImpCobrado = Convert.ToDecimal(dr["CuoImporteCobrado"].ToString());
                        c.cImpCuota = dr["CuoImporteCuota"].ToString();
                        c.cImpInteres = dr["CuoImporteIntereses"].ToString();
                        if (dr.IsDBNull(11))
                        { hola = "null"; }
                        else
                        { c.cIntMora = Convert.ToDecimal(dr["CuoIInteresMora"].ToString()); }
                        c.cNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                        if (dr.IsDBNull(10))
                        { hola = "null"; }
                        else
                        { c.cNroRecibo = Convert.ToInt32(dr["CuoNroRecibo"].ToString()); }
                        c.cPrestId = Convert.ToInt32(dr["CuoPrestamosId"].ToString());
                        if (dr.IsDBNull(7))
                        {
                            hola = "null";
                        }
                        else
                        {
                            c.cSaldoImpago = dr["CuoSaldoImpago"].ToString();
                        }
                        c.cVencCuota = Convert.ToDateTime(dr["CuoFechaVencimiento"].ToString());

                        lista.Add(c);

                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static bool finalReliquidacion(ClsReliquidacion r)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            //r.rUsuarioMod = System.Web.HttpContext.Current.Session["userName"].ToString();

            SqlCommand cmd = new SqlCommand();
            string consulta = @"UPDATE Prestamos SET PresEstado = 682 where PresContratoNro = @id ";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@id", r.rPresIdAnterior);

            try
            {
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
                if (resultado)
                {
                    resultado = confimacionPrestamoRefinanciado(r);
                    if (resultado)
                    {
                        string consulta1 = @"UPDATE Cuotas SET CuoEstado = 683 where CuoPrestamosId = @id and CuoEstado <> 643";
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@id", r.rPresIdAnterior);
                        try
                        {
                            cmd.CommandType = System.Data.CommandType.Text;
                            cmd.CommandText = consulta1;
                            cmd.ExecuteNonQuery();
                            resultado = true;
                        }
                        catch(Exception ex)
                        {
                            ex.ToString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
                
            }

            return resultado;
        }
        public static bool confimacionPrestamoRefinanciado(ClsReliquidacion r)
        {
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            int identificacion;
            bool resultado = false;
            ClsPrestamo p = new ClsPrestamo();
            r.rPrestId = MaxPrestamos();
            if(r.rNota == null)
            {
                r.rNota = "";
            }
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {

                SqlCommand cmd = new SqlCommand();
                string consulta = @"INSERT INTO Prestamos (PresContratoNro , PresCliId , PresMontoSolicitado , PresPlan , PresPorcMensual , PresFecha , PresFechaPrimeraCuota , PresDiadelMesCuota , PresIntervaloCobranza , PresFecaud , PresUsuario , PresEstado, PresIdProducto, PresNota, PresEntrega) 
                                    VALUES (@PresContratoNro, @CliId, @PresMontoSolicitado, @PresPlan, @PresPorcMensual, @PresFecha, @PresFechaPrimeraCuota, @PresDiadelMesCuota, @PresIntervaloCobranza, getdate(), @PresUsuario, @estado, @producto, @notaA, @entregaA)";

                //cp.pcPresUsuario = usu;
                //double monto = Convert.ToDouble(r.rMontoDeuda + r.rMontoAgregado);
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@PresContratoNro", r.rPrestId);
                cmd.Parameters.AddWithValue("@CliId", r.rCliId);
                cmd.Parameters.AddWithValue("@PresMontoSolicitado", r.rMontoFinal1);
                cmd.Parameters.AddWithValue("@PresPlan", r.rCantCuotas);
                cmd.Parameters.AddWithValue("@PresPorcMensual", r.rPresTasa);
                cmd.Parameters.AddWithValue("@PresFecha", r.rFechaContrato);
                cmd.Parameters.AddWithValue("@PresFechaPrimeraCuota", r.rFechaPrimCuota);
                cmd.Parameters.AddWithValue("@PresDiadelMesCuota", r.rDiaVencMes);
                cmd.Parameters.AddWithValue("@PresIntervaloCobranza", r.rIntervaloCobranza);
                cmd.Parameters.AddWithValue("@PresUsuario", usu);
                cmd.Parameters.AddWithValue("@estado", 613);
                cmd.Parameters.AddWithValue("@producto", r.rCodProd);
                cmd.Parameters.AddWithValue("@notaA", r.rNota);
                cmd.Parameters.AddWithValue("@entregaA", r.rEntrega);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
                resultado = creacionCuotasReliquidacion(r, Convert.ToInt32(r.rPrestId));
                if(resultado)
                {
                    resultado = altaDeRefinanciacion(r, Convert.ToInt32(r.rPrestId));
                    if(resultado)
                    {
                        int estadoPasar = 682;
                        string motivo = "Refinanciacion";

                        resultado = anulCancelPrestamo(estadoPasar, motivo, Convert.ToInt32(r.rPrestId));
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();

            }

            return resultado;
        }
        public static bool creacionCuotasReliquidacion(ClsReliquidacion p, int nuevoContrato)
        {
            bool resultado = false;
            double mCuota = 0;
            double minteres = 0;
            double mAmortig = 0;
            string interes1 = p.rPresTasa.ToString();
            string monto1 = p.rMontoFinal1.ToString();
            monto1 = monto1.Replace(".", "");
            double montoCuota;
            string formato = "";
           p.rPresTasa = fx.ReemplazoComaDecimal(interes1);
            p.rMontoFinal = Convert.ToDecimal(fx.ReemplazoComaDecimal(monto1));
            p.rPresTasa = p.rPresTasa;
            p.rIntervaloCobranza = p.rIntervaloCobranza;
            p.rDiaVencMes = p.rDiaVencMes;
            p.rFechaPrimCuota = p.rFechaPrimCuota;
            p.rNroContrato = nuevoContrato;
            int cantCuotas = Convert.ToInt32(p.rCantCuotas);

            mCuota = Math.Round(Convert.ToDouble(p.rMontoFinal) / Convert.ToDouble(p.rCantCuotas), 2);
            minteres = Math.Round(((mCuota * (Convert.ToDouble(p.rPresTasa) * Convert.ToDouble(p.rCantCuotas))) / Convert.ToDouble(100)), 2);
            mAmortig = Math.Round(Convert.ToDouble(p.rMontoFinal));

            DateTime Fechas = new DateTime();
            DateTime Fecha = new DateTime();
            Fechas = Convert.ToDateTime(p.rFechaPrimCuota);

            for (int i = 0; i < cantCuotas; i++)
            {
                ClsPrestamo t = new ClsPrestamo();
                if (i == 0)
                {
                    Fecha = Convert.ToDateTime(p.rFechaPrimCuota);
                    formato = Fecha.ToString("yyyy-MM-dd");
                    t.fecha = formato;
                }
                else
                {
                    if (i == 1)
                    {
                        DateTime mFecha = new DateTime(Fecha.Year, Fecha.Month, Convert.ToInt32(p.rDiaVencMes));
                        Fechas = mFecha;
                    }

                    switch (p.rIntervaloCobranza)
                    {
                        case 661:
                            Fecha = Fechas.AddMonths(1);
                            Fechas = Fecha;
                            break;
                        case 662:
                            Fecha = Fechas.AddMonths(2);
                            Fechas = Fecha;
                            break;
                        case 663:
                            Fecha = Fechas.AddMonths(6);
                            Fechas = Fecha;
                            break;
                        case 664:
                            Fecha = Fechas.AddDays(15);
                            Fechas = Fecha;
                            break;
                        case 665:
                            Fecha = Fechas.AddDays(7);
                            Fechas = Fecha;
                            break;
                        case 666:
                            Fecha = Fechas.AddDays(1);
                            Fechas = Fecha;
                            break;
                    }
                    t.fecha = Fecha.ToString("yyyy-MM-dd");
                }
                t.pClidId = p.rCliId;
                t.nroCuota = i + 1;
                t.capital = String.Format("{0:#.00}", mCuota);
                t.interes = String.Format("{0:#.00}", minteres);
                string capital = t.capital.Replace(',', '.');
                string interes = t.interes.Replace(',', '.');

                t.capFinal = String.Format("{0:#.00}", fx.CalcTotalFinanciado(fx.ReemplazoComaDecimal(monto1), fx.ReemplazoComaDecimal(interes1), p.rCantCuotas.ToString()));
                t.intFinal = String.Format("{0:#.00}", fx.CalcTotalInteres(fx.ReemplazoComaDecimal(monto1), fx.ReemplazoComaDecimal(interes1), p.rCantCuotas.ToString()));
                t.pNroContrato = p.rNroContrato;
                montoCuota = Convert.ToDouble(t.capital) + Convert.ToDouble(t.interes);
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                SqlCommand cmd = new SqlCommand();
                string consulta = @"INSERT INTO Cuotas (CuoPrestamosId, CliId, CuoNroCuota, CuoImporteCapital, CuoImporteIntereses, CuoFechaVencimiento, CuoImporteCuota, CuoEstado, CuoSaldoImpago) VALUES
                                    (@NroContrato, @cliente, @NroCuota, @Cap, @Int, @venc, @Importe, @estado, @impago)";

                try
                {
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@NroContrato", t.pNroContrato);
                    cmd.Parameters.AddWithValue("@cliente", t.pClidId);
                    cmd.Parameters.AddWithValue("@NroCuota", t.nroCuota);
                    cmd.Parameters.AddWithValue("@Cap", capital);
                    cmd.Parameters.AddWithValue("@Int", interes);
                    cmd.Parameters.AddWithValue("@venc", t.fecha);
                    cmd.Parameters.AddWithValue("@Importe", montoCuota);
                    cmd.Parameters.AddWithValue("@estado", 642);
                    cmd.Parameters.AddWithValue("@impago", montoCuota);

                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;

                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            return resultado;
        }
        public static bool altaDeRefinanciacion(ClsReliquidacion r, int presid)
        {
            bool resultado = false;
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"INSERT INTO PrestamosRefinanciacion (RefPresId, RefCliId, RefFecha, RefPresIdNuevo, RefCantCuotas, RefMontoDeuda, RefMontoAgregado, RefObservacion, RefUsuario, RefFec)
                                    VALUES (@pres, @clie, @fechaContra, @nvoContrato, @plan, @deuda, @agrego, @observ, @user, getdate())";
                cmd.Parameters.Clear();
                if(r.rObserv== null)
                {
                    r.rObserv = "";
                }
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@pres", r.rPresIdAnterior );
                cmd.Parameters.AddWithValue("@clie", r.rCliId );
                cmd.Parameters.AddWithValue("@fechaContra", r.rFechaContrato);
                cmd.Parameters.AddWithValue("@nvoContrato", presid);
                cmd.Parameters.AddWithValue("@plan", r.rCantCuotas);
                cmd.Parameters.AddWithValue("@deuda", r.rMontoDeuda);
                cmd.Parameters.AddWithValue("@agrego", r.rMontoAgregado);
                cmd.Parameters.AddWithValue("@observ", r.rObserv);
                cmd.Parameters.AddWithValue("@user", usu);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
            }
            catch(Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return resultado;
        }
        public static int MaxPrestamos()
        {
            int cantidad = 0;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            string consulta = @"Select MAX(PresContratoNro) as cantidad from Prestamos";
            cmd.CommandType = System.Data.CommandType.Text;

            try
            {
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        cantidad = Convert.ToInt32(dr["cantidad"].ToString());
                    }
                }
                

            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
                cantidad = cantidad + 1;
            }
            return cantidad;
        }
        public static bool anulCancelPrestamo(int estado, string motivo, int contrato)
        {
            bool resultado = false;
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"INSERT INTO PrestamosAccion (Pres_Id, PresEstado, PresMotivo, PresUsuario, PresFecAud) VALUES (@prestId, @estado, @motivo, @user, getdate())";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@prestId", contrato);
                cmd.Parameters.AddWithValue("@estado", estado);
                cmd.Parameters.AddWithValue("@motivo", motivo);
                cmd.Parameters.AddWithValue("@user", usu);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
                if(resultado && estado != 682)
                {
                    resultado = updatePrestmo(estado, contrato);
                }
            }
            return resultado;
        }

        public static bool updatePrestmo(int estado, int contrato)
        {
            bool resultado = false;
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"UPDATE Prestamos SET PresEstado = @estado, PresUsuario = @usuario, PresFecaud= getdate() WHERE PresContratoNro = @NRO";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@estado", estado);
                cmd.Parameters.AddWithValue("@NRO", contrato);
                cmd.Parameters.AddWithValue("@usuario", usu);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
                if (resultado)
                {
                    if (estado == 668)
                    {
                        string consulta1 = @"UPDATE Cuotas SET CuoEstado = @estado, CuoUsuario = @user, CuoFecaud = getdate() WHERE CuoPrestamosId = @contra and  CuoEstado = 642";
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@estado", 644);
                        cmd.Parameters.AddWithValue("@contra", contrato);
                        cmd.Parameters.AddWithValue("@user", usu);

                        cmd.CommandType = System.Data.CommandType.Text;
                        cmd.CommandText = consulta1;

                        cmd.ExecuteNonQuery();
                        resultado = true;
                    }
                    else
                    {
                        string consulta1 = @"UPDATE Cuotas SET CuoEstado = @estado, CuoUsuario = @user, CuoFecaud = getdate() WHERE CuoPrestamosId = @contra and  CuoEstado = 642";
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@estado", 669);
                        cmd.Parameters.AddWithValue("@contra", contrato);
                        cmd.Parameters.AddWithValue("@user", usu);

                        cmd.CommandType = System.Data.CommandType.Text;
                        cmd.CommandText = consulta1;

                        cmd.ExecuteNonQuery();
                        resultado = true;
                    }
                }
            }
            catch(Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
                
            }
            return resultado;
        }
        /////////// F I N    P R E S T A M O 
        ///

        ////////   I N I C I O  C O B R A N Z A     D E    C U O T A S
        public static List<CsMostrarParametro> cargarCombo(string dominio)
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = '" + dominio + "'";

                //cmd.Parameters.Clear();
                //cmd.Parameters.AddWithValue("@dom", dominio);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = int.Parse(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }

        public static List<ClsDatosNuevos> refrescarInfo(int documento)
        {
            List<ClsDatosNuevos> lista = new List<ClsDatosNuevos>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            try
            {
                SqlCommand cmd = new SqlCommand();

                string consulta = @"select cliNombre, cliApellido, cliDocumento, p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresEntrega, p.PresFecha, p.PresNota ,p.PresFechaPrimeraCuota, p.PresIdProducto, pr.proNombre,pr.proId, a.descripcion,
                        p.PresDiadelMesCuota, p.PresIntervaloCobranza, p.PresFecaud, p.PresUsuario, c.cliApellido, p.PresEstado, t.descripcionCorta,
                        isnull(sum(CuoImporteCapital + CuoImporteIntereses),0) Capital_Financiado  , convert(numeric(18,2),isnull(sum(cuoImporteCobrado),0)) cobrado,
                        sum(CASE WHEN [CuoEstado] = 643 then 1 else 0 end) cuotascobrados 
                        from Prestamos p LEFT JOIN Clientes c ON p.PresCliId = c.cliId LEFT JOIN Tabla_Parametros t ON p.PresEstado = t.Id_Param LEFT JOIN
                        cuotas cu on cu.CuoPrestamosId = p.PresContratoNro INNER JOIN Productos pr on pr.proId = p.PresIdProducto
                        INNER JOIN Tabla_Parametros a ON a.Id_Param = pr.proMarca
                        WHERE CONVERT(decimal,cliDocumento) = @cliDoc and PresEstado= 613
                        group by p.PresContratoNro, p.PresMontoSolicitado, p.PresPlan, p.PresPorcMensual, p.PresFecha, p.PresEntrega, p.PresFechaPrimeraCuota, p.PresDiadelMesCuota, 
                        p.PresIntervaloCobranza, p.PresFecaud, p.PresUsuario, c.cliApellido, p.PresEstado, t.descripcionCorta,cliNombre, cliApellido, cliDocumento, p.PresIdProducto,pr.proNombre, a.descripcion, pr.proId, p.PresNota
                        order by p.PresContratoNro Asc";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@cliDoc", documento);
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ClsDatosNuevos n = new ClsDatosNuevos();
                        n.cliApellido = dr["cliApellido"].ToString();
                        n.cliNombre = dr["cliNombre"].ToString();
                        n.cliDoc = dr["cliDocumento"].ToString();
                        n.presEstadoDesc = dr["descripcionCorta"].ToString();
                        n.presCapitalFinanciado = Convert.ToDouble(dr["Capital_Financiado"].ToString());
                        n.presCantCuotasCobradas = Convert.ToInt32(dr["cuotascobrados"].ToString());
                        n.presEstado = Convert.ToInt32(dr["PresEstado"].ToString());
                        n.presConcesion = Convert.ToDateTime(dr["PresFecha"].ToString());
                        n.presImporteCobrado= Convert.ToDecimal(dr["cobrado"].ToString());
                        n.presIntervalo= dr["PresIntervaloCobranza"].ToString();
                        n.presMontoSolicitado = Convert.ToDouble(dr["PresMontoSolicitado"].ToString());
                        n.presContrato = Convert.ToInt32(dr["PresContratoNro"].ToString());
                        n.presPlan= Convert.ToInt32(dr["PresPlan"].ToString());
                        n.presPorcInt= Convert.ToDecimal(dr["PresPorcMensual"].ToString());
                        n.presNombreMoto= dr["proNombre"].ToString();
                        n.presMarcaMoto= dr["descripcion"].ToString();
                        n.presNota= dr["PresNota"].ToString();
                        lista.Add(n);

                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }


        public static List<ClsCuotasCobradas> infoCuotasCobradas(int PresContratoNro, int nroCta)
        {
            List<ClsCuotasCobradas> lista = new List<ClsCuotasCobradas>();
            string hola = "Null";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from Cuotas where (CuoPrestamosId = @nroContrato and CuoEstado =643 and CuoNroCuota = @nroCuota)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nroContrato", PresContratoNro);
                cmd.Parameters.AddWithValue("@nroCuota", nroCta);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ClsCuotasCobradas c = new ClsCuotasCobradas();
                        c.ccCliId = Convert.ToInt32(dr["CliId"].ToString());
                        c.ccCuoId = Convert.ToInt32(dr["CuoId"].ToString());
                        if (dr.IsDBNull(20))
                            hola = "null";
                        else
                        {
                            c.ccFechaCobro = Convert.ToDateTime(dr["CuoFechaCobro"].ToString());

                        }
                        c.ccImportCobrado = Convert.ToDecimal(dr["CuoImporteCobrado"].ToString());
                        if (dr.IsDBNull(11))
                            hola = "null";
                        else
                        {
                            c.ccIntMora = Convert.ToDecimal(dr["CuoIInteresMora"].ToString());
                        }                  
                        if (dr.IsDBNull(17))
                            hola = "null";
                        else
                        {
                            c.ccObserv = dr["CuoObservaciones"].ToString();
                        }
                        if (dr.IsDBNull(12))
                        {

                        }
                        else
                        {
                            c.ccNroRecibo = Convert.ToInt32(dr["CuoNroRecibo"].ToString());
                        }
                        c.ccEstado = Convert.ToInt32(dr["CuoEstado"].ToString());


                        lista.Add(c);

                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<ClsCuotPago> infoCuotasId(int PresContratoNro, int nroCta)
        {
            List<ClsCuotPago> lista = new List<ClsCuotPago>();
            string hola = "Null";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from Cuotas where (CuoPrestamosId = @nroContrato and CuoNroCuota = @nroCuota)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nroContrato", PresContratoNro);
                cmd.Parameters.AddWithValue("@nroCuota", nroCta);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ClsCuotPago c = new ClsCuotPago();
                        c.cpCuoId = Convert.ToInt32(dr["CuoId"].ToString());

                        lista.Add(c);

                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }

        public static bool cobroCuota(ClsCuotPago p, int contrato)
        {
            bool resultado = false;
            decimal saldoImpago = 0;
            decimal adelanto = obtenerAdelanto(p.cpCuoId);
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            string sql = "";
            string signoPeso = "$";
            int cant = Convert.ToString(p.cpPresMontoSolicitado1).IndexOf(signoPeso);
            if(cant>0)
            {
                string[] separar;
                separar = Convert.ToString(p.cpPresMontoSolicitado1).Split(' ');
                var monto = separar[2];
                monto = monto.Replace(".", ",");
                p.cpCuoImporteCobrado = monto;
            }
            else
            {
                var monto = p.cpPresMontoSolicitado1.Replace('.', ',');
                p.cpCuoImporteCobrado = monto;
                string imp = Convert.ToString(p.cpCuoImporteCobrado).Replace('.', ',');
                p.cpCuoImporteCobrado = imp;
            }

            int cant1 = Convert.ToString(p.cpCuoSaldoImpago).IndexOf(signoPeso);
            if(cant1 > 0)
            {
                string[] separar;
                separar = Convert.ToString(p.cpCuoSaldoImpago).Split(' ');
                var monto = separar[2];
                monto = monto.Replace(".", "");
                monto = monto.Replace(".", "");
                p.cpCuoSaldoImpago1 = Convert.ToDecimal(monto);
            }
            else
            {
                var monto = p.cpCuoSaldoImpago.Replace('.', ',');
                p.cpCuoSaldoImpago1 = Convert.ToDecimal(monto);
            }
            

            p.cpCuoNroRecibo = TomarUltimoRecibo() + 1;
            if (p.cpCheckSaldo == true)
            {
                p.cpCuoSaldoImpago1 = saldoImpago;
                p.cpCuoEstado = 643;
              
                sql = @"UPDATE Cuotas SET CuoFechaCobro=@fechaPago, CuoImporteCobrado=@importe, CuoIInteresMora=@intMora,
                                CuoNroRecibo=@recibo, CuoUsuario=@usuario,CuoFecaUd= getdate(), CuoEstado=@estado,
                                CuoSaldoImpago=@impago WHERE CuoId= @ID";

                try
                {
                    string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
                    SqlCommand cmd = new SqlCommand();
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@fechaPago", p.cpCuoFechaCobro);
                    cmd.Parameters.AddWithValue("@importe", p.cpCuoImporteCobrado);
                    cmd.Parameters.AddWithValue("@intMora", p.cpCuoIInteresMora);
                    cmd.Parameters.AddWithValue("@recibo", p.cpCuoNroRecibo);
                    cmd.Parameters.AddWithValue("@usuario", usu);
                    cmd.Parameters.AddWithValue("@estado", p.cpCuoEstado);
                    cmd.Parameters.AddWithValue("@impago", p.cpCuoSaldoImpago1);
                    cmd.Parameters.AddWithValue("@ID", p.cpCuoId);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;

                    if (resultado)
                    {
                        try
                        {
                            if(p.cpCuoObservaciones == null)
                            {
                                p.cpCuoObservaciones = "";
                            }
                            var valor = p.cpCuoImporteCpital.IndexOf('.');
                            if(valor>0)
                            {
                                p.cpCuoImporteCpital = p.cpCuoImporteCpital.Replace(".", ",");
                            }
                            var valor1 = p.cpCuoImporteInterese.IndexOf('.');
                            if(valor1>0)
                            {
                                p.cpCuoImporteInterese = p.cpCuoImporteInterese.Replace(".", ",");
                            }
                            p.cpAdelanto =Convert.ToString(0);
                            DateTime hoy = DateTime.Today;
                            p.cpCuoFecaUd = hoy;
                            //cnn.Open();
                            SqlCommand cmd1 = new SqlCommand();
                            string consulta = @" INSERT INTO Cobranzas (CuoPrestamosId,CuoNroCuota,CuoFechaVencimiento,CuoImporteCuota,CuoSaldoImpago,CuoFechaCobro,CuoImporteCobrado
                                                ,CuoIInteresMora,CuoNroRecibo,CuoObservaciones,CuoEstado,CuoAdelanto,CuoFecaud,CuoUsuario, CuoImporteCapital, CuoImporteIntereses)     
                                                VALUES (@CuoPrestamosId, @CuoNroCuota, @CuoFechaVencimiento, @CuoImporteCuota, @CuoSaldoImpago, @CuoFechaCobro, @CuoImporteCobrado, 
                                                @CuoIInteresMora, @CuoNroRecibo, @CuoObservaciones, @CuoEstado, @CuoAdelanto, getdate(), @CuoUsuario, @capCta, @intCta)";
                            cmd1.CommandType = System.Data.CommandType.Text;
                            cmd1.Parameters.AddWithValue("@CuoPrestamosId", contrato);
                            cmd1.Parameters.AddWithValue("@CuoNroCuota", p.cpCuoNroCuota);
                            cmd1.Parameters.AddWithValue("@CuoFechaVencimiento", p.cpCuoFechaVencimiento);
                            cmd1.Parameters.AddWithValue("@CuoImporteCuota", p.cpCuoImporteCuota);
                            cmd1.Parameters.AddWithValue("@CuoSaldoImpago", p.cpCuoSaldoImpago1);
                            cmd1.Parameters.AddWithValue("@CuoFechaCobro", p.cpCuoFechaCobro);
                            cmd1.Parameters.AddWithValue("@CuoImporteCobrado", p.cpCuoImporteCobrado);
                            cmd1.Parameters.AddWithValue("@CuoIInteresMora", p.cpCuoIInteresMora);
                            cmd1.Parameters.AddWithValue("@CuoNroRecibo", p.cpCuoNroRecibo);
                            cmd1.Parameters.AddWithValue("@CuoEstado", p.cpCuoEstado);
                            cmd1.Parameters.AddWithValue("@CuoAdelanto", p.cpAdelanto);
                            cmd1.Parameters.AddWithValue("@CuoObservaciones", p.cpCuoObservaciones);
                            cmd1.Parameters.AddWithValue("@CuoUsuario", usu);
                            cmd1.Parameters.AddWithValue("@capCta", p.cpCuoImporteCpital);
                            cmd1.Parameters.AddWithValue("@intCta", p.cpCuoImporteInterese);

                            cmd1.CommandText = consulta;
                            cmd1.Connection = cnn;
                            cmd1.ExecuteNonQuery();
                            resultado = true;
                        }
                        catch (Exception e)
                        {
                            string a = e.ToString();
                        }
                        finally
                        {
                            cnn.Close();
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }

            }
            else
            {
                int c = p.cpAdelanto.IndexOf('.');
                if(c>0)
                {
                    p.cpAdelanto = p.cpAdelanto.Replace('.', ',');
                    p.cpAdelanto1 = Convert.ToDecimal(p.cpAdelanto);
                }
                else
                {
                    p.cpAdelanto1 = Convert.ToDecimal(p.cpAdelanto);
                }
                p.cpAdelanto1 += adelanto;
                p.cpCuoSaldoImpago1 =  p.cpCuoSaldoImpago1 - Convert.ToDecimal(p.cpCuoImporteCobrado);
                if (p.cpCuoSaldoImpago1 < 0)
                {
                    p.cpCuoSaldoImpago1 = 0;
                    p.cpCuoEstado = 643;
                }
                else
                {
                    p.cpCuoEstado = 642;
                }              

                sql = @"UPDATE Cuotas SET CuoFechaCobro=@fechaPago, CuoImporteCobrado=@importe, CuoIInteresMora=@intMora,
                                CuoNroRecibo=@recibo, CuoUsuario=@usuario,CuoFecaUd= getdate(), CuoEstado=@estado,
                                CuoSaldoImpago=@impago, CuoAdelanto=@adelanto                                
                                WHERE CuoId= @ID";
                try
                {

                    SqlCommand cmd = new SqlCommand();
                    string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@fechaPago", p.cpCuoFechaCobro);
                    cmd.Parameters.AddWithValue("@importe", p.cpCuoImporteCobrado);
                    cmd.Parameters.AddWithValue("@intMora", p.cpCuoIInteresMora);
                    cmd.Parameters.AddWithValue("@recibo", p.cpCuoNroRecibo);
                    cmd.Parameters.AddWithValue("@usuario", usu);
                    cmd.Parameters.AddWithValue("@estado", p.cpCuoEstado);
                    cmd.Parameters.AddWithValue("@impago", p.cpCuoSaldoImpago1);
                    cmd.Parameters.AddWithValue("@adelanto", p.cpAdelanto1);
                    cmd.Parameters.AddWithValue("@ID", p.cpCuoId);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch (Exception error)
                {
                    string a = error.ToString();
                }
                finally
                {
                    cnn.Close();
                    if (resultado)
                    {
                        try
                        {
                            if (p.cpCuoObservaciones == null)
                            {
                                p.cpCuoObservaciones = "";
                            }
                            DateTime hoy = DateTime.Today;
                            p.cpCuoFecaUd = hoy;
                            cnn.Open();
                            SqlCommand cmd1 = new SqlCommand();
                            string consulta = @" INSERT INTO Cobranzas (CuoPrestamosId,CuoNroCuota,CuoFechaVencimiento,CuoImporteCuota,CuoSaldoImpago,CuoFechaCobro,CuoImporteCobrado
                                                ,CuoIInteresMora,CuoNroRecibo,CuoObservaciones,CuoEstado,CuoAdelanto,CuoFecaud,CuoUsuario)     
                                                VALUES (@CuoPrestamosId, @CuoNroCuota, @CuoFechaVencimiento, @CuoImporteCuota, @CuoSaldoImpago, @CuoFechaCobro, @CuoImporteCobrado, 
                                                @CuoIInteresMora, @CuoNroRecibo, @CuoObservaciones, @CuoEstado, @CuoAdelanto, getdate(), @CuoUsuario)";
                            cmd1.CommandType = System.Data.CommandType.Text;
                            cmd1.Parameters.Clear();
                            cmd1.Parameters.AddWithValue("@CuoPrestamosId", contrato);
                            cmd1.Parameters.AddWithValue("@CuoNroCuota", p.cpCuoNroCuota);
                            cmd1.Parameters.AddWithValue("@CuoFechaVencimiento", p.cpCuoFechaVencimiento);
                            cmd1.Parameters.AddWithValue("@CuoImporteCuota", p.cpCuoImporteCuota);
                            cmd1.Parameters.AddWithValue("@CuoSaldoImpago", p.cpCuoSaldoImpago1);
                            cmd1.Parameters.AddWithValue("@CuoFechaCobro", p.cpCuoFechaCobro);
                            cmd1.Parameters.AddWithValue("@CuoImporteCobrado", p.cpCuoImporteCobrado);
                            cmd1.Parameters.AddWithValue("@CuoIInteresMora", p.cpCuoIInteresMora);
                            cmd1.Parameters.AddWithValue("@CuoNroRecibo", p.cpCuoNroRecibo);
                            cmd1.Parameters.AddWithValue("@CuoEstado", p.cpCuoEstado);
                            cmd1.Parameters.AddWithValue("@CuoObservaciones", p.cpCuoObservaciones);
                            cmd1.Parameters.AddWithValue("@CuoAdelanto", p.cpAdelanto1);
                            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
                            cmd1.Parameters.AddWithValue("@CuoUsuario", usu);

                            cmd1.CommandText = consulta;
                            cmd1.Connection = cnn;
                            cmd1.ExecuteNonQuery();
                            resultado = true;
                        }
                        catch (Exception e)
                        {
                            string a = e.ToString();
                        }
                        finally
                        {
                            cnn.Close();
                        }
                    }
                }

            }

            return resultado;
        }

        public static decimal obtenerAdelanto(int cuoID)
        {
            decimal adelanto = 0;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select CuoAdelanto from Cuotas where CuoId= @cId";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@cId", cuoID);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    if (dr.IsDBNull(0))
                    {
                        adelanto = 0;
                    }
                    else
                    {
                        adelanto = Convert.ToDecimal(dr["CuoAdelanto"].ToString());
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return adelanto;
        }

        public static int TomarUltimoRecibo()
        {
            int ultimo = 0;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"SELECT max(CuoNroRecibo) as cantidad From Cuotas ";
                cmd.Parameters.Clear();

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    if(dr.IsDBNull(0))
                    {
                        ultimo = 0;
                    }
                    else
                    {
                        ultimo = int.Parse(dr["cantidad"].ToString());
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return ultimo;
        }
        public static List<ClsReporte> cargaRecibo(int cta, int contrato)
        {
            List<ClsReporte> lista = new List<ClsReporte>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                string consulta = @"select top 1(CuoNroRecibo) recibo, CuoSaldoImpago, CuoEstado from Cobranzas where CuoPrestamosId = @contrato and CuoNroCuota = @cta order by recibo desc";
                SqlCommand cmd = new SqlCommand();
                cmd.Parameters.AddWithValue("@contrato", contrato);
                cmd.Parameters.AddWithValue("@cta", cta);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    ClsReporte c = new ClsReporte();
                    c.paEstado = Convert.ToInt32(dr["CuoEstado"].ToString());
                    if (c.paEstado == 642)
                    {
                        c.descripcion = "Pendiente";
                    }
                    else if (c.paEstado == 643)
                    {
                        c.descripcion = "Cobrado";
                    }
                    else
                    {
                        c.descripcion = "Anulado";
                    }

                    c.rSaldoImpago = Convert.ToDecimal(dr["CuoSaldoImpago"].ToString());
                    c.rCuoNroRecibo = Convert.ToInt32(dr["recibo"].ToString());
                    lista.Add(c);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static int obtenerRecibo(int cta, int contrato)
        {
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            int resultado = 0;
            try
            {
                string consulta = @"select top 1(CuoNroRecibo) recibo from Cobranzas where CuoPrestamosId = @contrato and CuoNroCuota = @cta order by recibo desc";
                SqlCommand cmd = new SqlCommand();
                cmd.Parameters.AddWithValue("@contrato", contrato);
                cmd.Parameters.AddWithValue("@cta", cta);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    resultado = Convert.ToInt32(dr["recibo"].ToString());
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return resultado;
        }
        //////////// F I N   C O B R A N Z A    D E    C U O T A
        ///

        ///// I N I C I O    D E     S I M U L A C I O N

        public static List<ClsSimulador> generationTablaSimulacion(ClsSimulador s)
        {

            int i = 0;

            double sCuota = 0;
            string sCuotaS = "";
            double sinteres = 0;
            string sInteresS = "";
            double sAmortig = 0;
            string date = "";
            string plan = "";

            List<ClsSimulador> lista = new List<ClsSimulador>();

            sCuota = Math.Round(Convert.ToDouble(s.sMontoData) / Convert.ToDouble(s.sPlanData), 2);
            sCuotaS = String.Format("{0:#.00}", sCuota);
            sinteres = Math.Round(((sCuota * (Convert.ToDouble(s.sInteresData)) * Convert.ToDouble(s.sPlanData)) / Convert.ToDouble(100)), 2);
            sInteresS = String.Format("{0:#.00}", sinteres);
            sAmortig = Math.Round(Convert.ToDouble(s.sMontoData));
            DateTime Fecha = new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 10);
            date = string.Format("{0:dd-MM-yyyy}", Fecha);
            plan = string.Format("{0:000}", Convert.ToInt32(s.sPlanData));
            int cant = 1;
            int b = 1;
            int c = 1;

            for (i = 1; i < Convert.ToInt32(s.sPlanData) + 1; i++)
            {
                ClsSimulador sp = new ClsSimulador();
                sp.sCapitalCuota = sCuotaS;
                sp.sInteresCuota = sInteresS;
                sp.sInteresData = Convert.ToString(s.sInteresData);
                sp.sPlanData = plan;
                sp.sNroCuota = Convert.ToInt32(cant++);
                sp.sMontoData = s.sMontoData;
                sp.sPlanData = s.sPlanData;
                sp.sValorCuota = Convert.ToString(sCuota + sinteres);

                if (i > 1)
                {

                    sp.sCapitalAmortizado = Convert.ToString(Math.Round(sAmortig, 2));

                    date = string.Format("{0:dd-MM-yyyy}", Fecha);
                    sp.sVencimiento = Convert.ToDateTime(date);
                    b++;
                }
                else
                {
                    sp.sCapitalAmortizado= Convert.ToString(Math.Round(sAmortig, 2));
                    sp.sVencimiento = Convert.ToDateTime(date);
                }

                lista.Add(sp);
                Fecha = Fecha.AddMonths(1);
                sAmortig = sAmortig - sCuota;
            }
            return lista;
        }
        public static int tomarUltSimulacion()
        {
            int ultimo = 0;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select max(SimId) as ultimo from simulacion";
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        ultimo = int.Parse(dr["ultimo"].ToString());

                    }
                }
            }
            catch (Exception er)
            {
                er.ToString();
            }
            finally
            {
                cnn.Close();
            }
            if (ultimo == 0)
            {
                ultimo = 1;
            }
            else
            {
                ultimo = ultimo + 1;
            }
            return ultimo;
        }
        public static bool guardarSimulacion(ClsSimulador s)
        {
            bool resultado = false;



            int i = 0;

            double sCuota = 0;
            string sCuotaS = "";
            double sinteres = 0;
            string sInteresS = "";
            double sAmortig = 0;
            string date = "";
            string plan = "";

            //List<ClsSimulador> lista = new List<ClsSimulador>();
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            sCuota = Math.Round(Convert.ToDouble(s.sMontoData) / Convert.ToDouble(s.sPlanData), 2);
            sCuotaS = String.Format("{0:#.00}", sCuota);
            sinteres = Math.Round(((sCuota * (Convert.ToDouble(s.sInteresData)) * Convert.ToDouble(s.sPlanData)) / Convert.ToDouble(100)), 2);
            sInteresS = String.Format("{0:#.00}", sinteres);
            sAmortig = Math.Round(Convert.ToDouble(s.sMontoData));
            DateTime Fecha = new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 10);
            date = string.Format("{0:dd-MM-yyyy}", Fecha);
            plan = string.Format("{0:000}", Convert.ToInt32(s.sPlanData));
            int cant = 1;
            int b = 1;
            int c = 1;
            s.sId = tomarUltSimulacion();
            for (i = 1; i < Convert.ToInt32(s.sPlanData) + 1; i++)
            {
                ClsSimulador sp = new ClsSimulador();
                sp.sNombreCliente = s.sNombreCliente;
                sp.sCapitalCuota = sCuotaS;
                sp.sInteresCuota = sInteresS;
                sp.sInteresData = Convert.ToString(s.sInteresData);
                sp.sPlanData = plan;
                sp.sNroCuota = Convert.ToInt32(cant++);
                sp.sMontoData = s.sMontoData;
                sp.sPlanData = s.sPlanData;
                sp.sMoto = s.sMoto;
                sp.sModelo = s.sModelo;
                sp.sPrecio = s.sPrecio;
                sp.sEntrega = s.sEntrega;
                sp.sId = s.sId;
                decimal cuotaUnica = Convert.ToDecimal(sCuotaS) + Convert.ToDecimal(sp.sInteresCuota);
                sp.sValorCuota = Convert.ToString(cuotaUnica);
                string cuotaValor = Convert.ToString(sp.sValorCuota);
                cuotaValor = cuotaValor.Replace(".", ",");
                sp.sValorCuota = cuotaValor;
                if (i > 1)
                {

                    sp.sCapitalAmortizado = Convert.ToString(Math.Round(sAmortig, 2));

                    date = string.Format("{0:dd-MM-yyyy}", Fecha);
                    sp.sVencimiento = Convert.ToDateTime(date);
                    b++;
                }
                else
                {
                    sp.sCapitalAmortizado = Convert.ToString(Math.Round(sAmortig, 2));
                    sp.sVencimiento = Convert.ToDateTime(date);
                }


                SqlConnection cnn = new SqlConnection(cadenaConexion);
                SqlCommand cmd = new SqlCommand();
                string consulta = @"INSERT INTO Simulacion (SimId, SimNombre, SimMontoSolicitado, SimPlan, SimInteresPorc, SimNroCuota, SimCuotaValor, SimVencimientoCta, SimInteresCta, SimCapitaCta,SimCapAmortizado,SimFechaUs,SimUsuario, SimMoto, SimMotoPrecio, SimMotoEntrega, SimMotoModelo)
                                    VALUES (@identif, @nombre, @montoSoli, @plan, @int, @nroCta, @ctaValor, @vto, @intCta, @capCta, @capAmor, getdate(), @user, @moto, @anio, @precio, @entrega)";
                try
                {
                    if(sp.sEntrega == null)
                    {
                        sp.sEntrega = 0;
                    }

                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@identif", sp.sId);
                    cmd.Parameters.AddWithValue("@nombre", sp.sNombreCliente);
                    cmd.Parameters.AddWithValue("@montoSoli", sp.sMontoData);
                    cmd.Parameters.AddWithValue("@plan", sp.sPlanData);
                    cmd.Parameters.AddWithValue("@int", sp.sInteresData);
                    cmd.Parameters.AddWithValue("@nroCta", sp.sNroCuota);
                    cmd.Parameters.AddWithValue("@ctaValor", sp.sValorCuota);
                    cmd.Parameters.AddWithValue("@vto", sp.sVencimiento);
                    cmd.Parameters.AddWithValue("@intCta", sp.sInteresCuota);
                    cmd.Parameters.AddWithValue("@capCta", sp.sCapitalCuota);
                    cmd.Parameters.AddWithValue("@capAmor", sp.sCapitalAmortizado);
                    cmd.Parameters.AddWithValue("@user", usu);
                    cmd.Parameters.AddWithValue("@moto", sp.sMoto);
                    cmd.Parameters.AddWithValue("@anio", sp.sModelo);
                    cmd.Parameters.AddWithValue("@precio", sp.sPrecio);
                    cmd.Parameters.AddWithValue("@entrega", sp.sEntrega);

                    cmd.CommandText = consulta;
                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch(Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
                Fecha = Fecha.AddMonths(1);
            }

            return resultado;
        }


        /////// F I N    S I M U L A C I O N
        ///


        ////  I N I C I O  U S U A R I O



        public static string Contraseña()
        {
            Random rdn = new Random();
            string caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890%$#@";
            int longitud = caracteres.Length;
            char letra;
            int longitudContrasenia = 10;
            string contraseniaAleatoria = string.Empty;
            for (int i = 0; i < longitudContrasenia; i++)
            {
                letra = caracteres[rdn.Next(longitud)];
                contraseniaAleatoria += letra.ToString();
            }
            return contraseniaAleatoria;
        }

        public static bool existe(string pk)
        {
            int cantidad = 0;
            bool resultado = false;
            string obtenido = "";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();

                string consulta = "select count([usuUsuario])as cantidad from Usuarios where usuUsuario like '" + pk + "%'";
                cmd.Parameters.AddWithValue("@usuario", pk);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    cantidad = int.Parse(dr["cantidad"].ToString());
                }

                if (cantidad != 0)
                {
                    resultado = true;
                }
                else
                {
                    resultado = false;

                }
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                cnn.Close();
            }

            return resultado;
        }
        public static bool existeCli(string pk)
        {
            int cantidad = 0;
            bool resultado = false;
            string obtenido = "";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();

                string consulta = "select count(clidocumento)as cantidad from clientes where clidocumento like '" + pk + "%'";
                cmd.Parameters.AddWithValue("@usuario", pk);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    cantidad = int.Parse(dr["cantidad"].ToString());
                }

                if (cantidad != 0)
                {
                    resultado = true;
                }
                else
                {
                    resultado = false;

                }
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                cnn.Close();
            }

            return resultado;
        }
        private static bool enviarMail(string email, string clave)
        {
            bool result = false;
            MailMessage msg = new MailMessage();
            msg.To.Add(email);
            msg.Subject = "MotPres-Password";
            msg.SubjectEncoding = System.Text.Encoding.UTF8;

            msg.Body = @"Hola, el codigo para que puedas seleccionar tu propia contraseña es el siguiente:   " + clave + "  . " +
                "Recordá que cuando ingreses por primera vez al sistema, será solicitado para la configuración de tú contraseña" + "                " +
                "Equipo MOTPRES.";
            msg.BodyEncoding = System.Text.Encoding.UTF8;
            msg.IsBodyHtml = true;
            msg.From = new System.Net.Mail.MailAddress("equipomotpres@gmail.com");

            SmtpClient cliente = new SmtpClient();
            cliente.Credentials = new System.Net.NetworkCredential("equipomotpres@gmail.com", "cenicienta10");

            cliente.Port = 587;
            cliente.EnableSsl = true;
            cliente.Host = "smtp.gmail.com";
            try
            {
                cliente.Send(msg);
                result = true;
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {

            }
            return result;
        }
        private static bool enviarMailRecup(string email, string clave)
        {
            bool result = false;
            MailMessage msg = new MailMessage();
            msg.To.Add(email);
            msg.Subject = "MotPres-Password";
            msg.SubjectEncoding = System.Text.Encoding.UTF8;

            msg.Body = @"Hola, el codigo para que puedas reestablecer tu contraseña es el siguiente:   " + clave + "  . " +
                "Recordá que cuando ingreses por primera vez al sistema, será solicitado para la configuración de tú contraseña" + "                " +
                "Equipo MOTPRES.";
            msg.BodyEncoding = System.Text.Encoding.UTF8;
            msg.IsBodyHtml = true;
            msg.From = new System.Net.Mail.MailAddress("equipomotpres@gmail.com");

            SmtpClient cliente = new SmtpClient();
            cliente.Credentials = new System.Net.NetworkCredential("equipomotpres@gmail.com", "cenicienta10");

            cliente.Port = 587;
            cliente.EnableSsl = true;
            cliente.Host = "smtp.gmail.com";
            try
            {
                cliente.Send(msg);
                result = true;
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {

            }
            return result;
        }
        public static bool agregarUsuario(ClsUsuario u)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            SqlCommand cmd = new SqlCommand();
            //string fecha = "getdate()";
            //c.fechaMod = Convert.ToDateTime(fecha);
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            //u.usuario = usu;
            string user = u.uUsuario;
            if(u.uCUIT == null)
            {
                u.uCUIT = "";
            }
            try
            {
                u.uIdEstado = 622;
                string consulta = @"INSERT INTO Usuarios (usuUsuario, usuNombre, usuApellido, usuClave, usuFuncion, usuRol, usuEmail, usuEstado, usuUsuarioActual, usuFechaModif, UsuTel, usuDocumento, usuCuit)
                                        VALUES (@user,@name,@lastname,@clave, @funcion, @rol, @email, @estado, @usuarioActual, getdate(), @tel, @doc, @cuit)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@user", u.uUsuario);
                cmd.Parameters.AddWithValue("@name", u.uNombre);
                cmd.Parameters.AddWithValue("@lastname", u.uApellido);
                cmd.Parameters.AddWithValue("@clave", u.uClave);
                cmd.Parameters.AddWithValue("@rol", u.uIdRol);
                cmd.Parameters.AddWithValue("@funcion", u.uIdFuncion);
                cmd.Parameters.AddWithValue("@email", u.uEmail);
                cmd.Parameters.AddWithValue("@doc", u.uDocumento);
                cmd.Parameters.AddWithValue("@cuit", u.uCUIT);
                cmd.Parameters.AddWithValue("@tel", u.uTel);
                cmd.Parameters.AddWithValue("@estado", u.uIdEstado);
                cmd.Parameters.AddWithValue("@usuarioActual", usu);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();

                resultado = true;
                enviarMail(u.uEmail, u.uClave);
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return resultado;
        }
        public static List<ClsUsuario> todosLosUsuarios()
        {
            List<ClsUsuario> lista = new List<ClsUsuario>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            string consulta = @"select * from usuarios u inner join tabla_parametros t on u.usuFuncion = t.Id_Param inner join Tabla_Parametros a on a.Id_Param= u.usuRol
                                where usuEstado = 613 or usuEstado = 622 ";
            try
            {
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    ClsUsuario u = new ClsUsuario();
                    u.uApellido = dr["usuApellido"].ToString();
                    u.uEmail = dr["usuEmail"].ToString();
                    u.uFuncion = dr[15].ToString();
                    u.uIdFuncion = Convert.ToInt32(dr["usuFuncion"].ToString());
                    u.uIdRol = Convert.ToInt32(dr["usuRol"].ToString());
                    u.uNombre = dr["usuNombre"].ToString();
                    u.uRol = dr[21].ToString();
                    u.uTel = dr["UsuTel"].ToString();
                    u.uUsuario = dr["usuUsuario"].ToString();
                    u.uDocumento = dr["usuDocumento"].ToString();
                    if(dr.IsDBNull(11))
                    {

                    }
                    else
                    {
                        u.uCUIT = dr["usuCuit"].ToString();
                    }
                    lista.Add(u);
                }
            }
            catch(Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return lista;
        }
        public static ClsUsuario tomarUsuario(string usu)
        {
            ClsUsuario u = new ClsUsuario();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"SELECT usuUsuario, usuNombre, usuApellido,usuFuncion,usuRol,usuEmail,UsuTel, usuDocumento, usuCuit, a.descripcion, b.descripcion
                                    From Usuarios u inner join Tabla_Parametros a on u.usuFuncion = a.Id_Param inner join Tabla_Parametros b on b.Id_Param=u.usuRol
                                    where usuUsuario = @ID";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@ID", usu);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        u.uUsuario = dr["usuUsuario"].ToString();
                        u.uIdRol = int.Parse(dr["usuRol"].ToString());
                        u.uNombre = dr["usuNombre"].ToString();
                        u.uIdFuncion = int.Parse(dr["usuFuncion"].ToString());
                        u.uEmail = dr["usuEmail"].ToString();
                        u.uApellido = dr["usuApellido"].ToString();
                        u.uFuncion = dr[9].ToString();
                        u.uRol = dr[10].ToString();
                        u.uTel = dr["UsuTel"].ToString();
                        u.uDocumento = dr["usuDocumento"].ToString();
                        u.uCUIT = dr["usuCuit"].ToString();
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return u;
        }
        public static bool editarUsuario(ClsUsuario u)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            if(u.uCUIT == null)
            {
                u.uCUIT = "";
            }
            try
            {
                string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
                SqlCommand cmd = new SqlCommand();
                string consulta = @" UPDATE Usuarios SET  usuNombre = @name, usuApellido = @lastname, UsuTel = @tel, usuDocumento = @doc, usuCuit = @cuit,
                                    usuRol = @rol, usuFuncion = @funcion, usuEmail = @email, usuUsuarioActual = @usuarioActual, usuFechaModif = getdate()  where usuUsuario = @user";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@name", u.uNombre);
                cmd.Parameters.AddWithValue("@lastname", u.uApellido);
                cmd.Parameters.AddWithValue("@rol", u.uIdRol);
                cmd.Parameters.AddWithValue("@funcion", u.uIdFuncion);
                cmd.Parameters.AddWithValue("@email", u.uEmail);
                cmd.Parameters.AddWithValue("@user", u.uUsuario);
                cmd.Parameters.AddWithValue("@tel", u.uTel);
                cmd.Parameters.AddWithValue("@doc", u.uDocumento);
                cmd.Parameters.AddWithValue("@cuit", u.uCUIT);
                cmd.Parameters.AddWithValue("@usuarioActual", usu);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;


            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return resultado;

        }
        public static bool eliminarUsuario(string usu)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            int stado = 623;
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @" UPDATE Usuarios SET usuEstado = @state where usuUsuario = @user";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@user", usu);
                cmd.Parameters.AddWithValue("@state", stado);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;


            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return resultado;
        }


        /////// F I N    U S U A R I O 
        ///


        ////// L O G I N

        public static ClsLogin validacionUsuario(string usuario, string contra)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            ClsLogin l = new ClsLogin();
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from Usuarios u inner join  Tabla_Parametros t on u.usuRol=t.Id_Param 
                                    inner join Tabla_Parametros a on u.usuFuncion = a.Id_Param
                                    where usuUsuario = @usuario and usuClave = @contra
                                    and (usuEstado = 613 or usuEstado = 622)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@usuario", usuario);
                cmd.Parameters.AddWithValue("@contra", contra);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {

                        l.lApellido = dr["usuApellido"].ToString();
                        l.lFuncion = dr[20].ToString();
                        l.lIdFuncion = Convert.ToInt32(dr["usuFuncion"].ToString());
                        l.lIdRol = Convert.ToInt32(dr["usuRol"].ToString());
                        l.lNombre = dr["usuNombre"].ToString();
                        l.lRol = dr[15].ToString();
                        l.lUsuario = dr["usuUsuario"].ToString();
                        l.lEstado = Convert.ToInt32(dr["usuEstado"].ToString());
                    }
                }

            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return l;
        }
        public static bool existenciaMail(string mail)
        {
            bool resultado = false;
            int cantidad = 0;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();

                string consulta = "select count(usuUsuario) as cantidad from Usuarios where usuEmail like '%" + mail + "%'";
                cmd.Parameters.AddWithValue("@correo", mail);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    cantidad = int.Parse(dr["cantidad"].ToString());
                }

                if (cantidad != 0)
                {
                    resultado = true;
                }
                else
                {
                    resultado = false;

                }
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                cnn.Close();
            }

            return resultado;
        }
        public static bool envioMailPrecuperacion(string usu, string mail)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            ClsUsuario u = new ClsUsuario();
            u.uIdEstado = 622;
            u.uEmail = mail;
            u.uClave = Contraseña();
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"UPDATE Usuarios  SET usuClave = @pass, usuEstado = @state WHERE usuEmail = @Mail and usuUsuario = @usu";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@pass", u.uClave);
                cmd.Parameters.AddWithValue("@state", u.uIdEstado);
                cmd.Parameters.AddWithValue("@Mail", u.uEmail);
                cmd.Parameters.AddWithValue("@usu", usu);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
            }
            catch (Exception error)
            {
                string a = error.ToString();
            }
            finally
            {
                cnn.Close();
                if (enviarMailRecup(mail, u.uClave))
                {
                    resultado = true;
                }
            }
            return resultado;
        }

        public static bool cambiarContra(string cod, string nuevaContra, string usu)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            ClsUsuario u = new ClsUsuario();
            u.uIdEstado = 613;
            u.uClave = nuevaContra;
            //if (validarCodigo(cod))
            //{
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    string consulta = @"UPDATE Usuarios  SET usuClave = @pass, usuEstado= @state WHERE usuClave= @Actual and usuUsuario = @usuario";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@pass", u.uClave);
                    cmd.Parameters.AddWithValue("@state", u.uIdEstado);
                    cmd.Parameters.AddWithValue("@Actual", cod);
                    cmd.Parameters.AddWithValue("@usuario", usu);

                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;
                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch (Exception error)
                {
                    string a = error.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            //}

            return resultado;
        }


        ////////////// F I N    L O G I N
        ///


        /////////  I N I C I O    G E S T I O N    D E    F E C H A S

        public static string obtenerUltimaFecha()
        {
            string fecha = "";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            string consulta = @"select max(fecha) as ultima from fechas";
            try
            {
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    if(dr.IsDBNull(0))
                    {
                        fecha = " Aún no hay fechas, para ello inserte un nuevo año al calendario.";
                    }
                    else
                    {
                        fecha = Convert.ToString(dr["ultima"].ToString());
                    }                    
                }
            }
            catch(Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return fecha;
        }
        public static string obtenerPrimeraFecha()
        {
            string fecha = "";
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            string consulta = @"select min(fecha) as ultima from fechas";
            try
            {
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    if(dr.IsDBNull(0))
                    {
                        fecha = " Aún no hay fechas, para ello inserte un nuevo año al calendario.";
                    }
                    else
                    {
                        fecha = Convert.ToString(dr["ultima"].ToString());
                    }                    
                }
            }
            catch(Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return fecha;
        }
        public static bool cargaDeCalendario(string fechaInicioParam)
        {
            bool resultado = false;
            DateTime fechaIncio = new DateTime();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            if(fechaInicioParam.Equals("0"))
            {
                fechaIncio = DateTime.Today;
            }
            else
            {
                fechaIncio = Convert.ToDateTime(fechaInicioParam);
            }

            DateTime fechaFin = fechaIncio.AddMonths(12);
            while(fechaFin > fechaIncio)
            {
                ClsFecha f = new ClsFecha();
                f.fFecha = fechaIncio;
                f.fFechaFin = new DateTime(fechaIncio.Year, fechaIncio.Month, 1).AddMonths(1).AddDays(-1);
                f.fFechaPrimerDiaMes = new DateTime(fechaIncio.Year, fechaIncio.Month, 1);
                f.fFechaDia = Convert.ToInt32(fechaIncio.Day);
                f.fFechaMes = Convert.ToInt32(fechaIncio.Month);
                f.fFechaAnio = Convert.ToInt32(fechaIncio.Year);
                f.fFechaUltDiaMesAnterior = new DateTime(fechaIncio.Year, fechaIncio.Month, 1).AddMonths(0).AddDays(-1);
                f.fFechaDiaMesSiguiente = new DateTime(fechaIncio.Year, fechaIncio.Month, 1).AddMonths(1);

                if(fechaIncio.DayOfWeek == DayOfWeek.Sunday || fechaIncio.DayOfWeek == DayOfWeek.Saturday)
                {
                    f.fFechaTipoDia = "No Hábil";
                }
                else
                {
                    f.fFechaTipoDia = "Hábil";
                }
                f.fFechaEstado = 613;
                f.fNota = "";
                string consulta = @"INSERT INTO Fechas (Fecha, FechaFinMes, FechaDia, FechaMes, FechaAnio, FechaPrimerdiaMes, FechaDiaMesSiguiente, FechaUltDiaMesAnt, FechaTipoDia, FechaEstados, FechaNota)
                        VALUES (@fecha, @fechaFin, @fechaDia, @fechaMes, @fechaAnio, @fechaInicio, @fechaMesSig, @fechaUltMesAnt, @fechaTipo, @fechaEstado, @fechaNota)";
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@fecha", f.fFecha);
                    cmd.Parameters.AddWithValue("@fechaFin", f.fFechaFin);
                    cmd.Parameters.AddWithValue("@fechaDia", f.fFechaDia);
                    cmd.Parameters.AddWithValue("@fechaMes", f.fFechaMes);
                    cmd.Parameters.AddWithValue("@fechaAnio", f.fFechaAnio);
                    cmd.Parameters.AddWithValue("@fechaInicio", f.fFechaPrimerDiaMes);
                    cmd.Parameters.AddWithValue("@fechaMesSig", f.fFechaDiaMesSiguiente);
                    cmd.Parameters.AddWithValue("@fechaUltMesAnt", f.fFechaUltDiaMesAnterior);
                    cmd.Parameters.AddWithValue("@fechaTipo", f.fFechaTipoDia);
                    cmd.Parameters.AddWithValue("@fechaEstado", f.fFechaEstado);
                    cmd.Parameters.AddWithValue("@fechaNota", f.fNota);

                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = consulta;
                    cnn.Open();
                    cmd.Connection = cnn;
                    cmd.ExecuteNonQuery();
                    resultado = true;
                }
                catch(Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }

                fechaIncio = fechaIncio.AddDays(1);
            }

            return resultado;
        }

        public static ClsFecha tomarFecha(DateTime pk)
        {
            int cant = 0;
            bool resultado = false;
            string obtenido = "";
            ClsFecha f = new ClsFecha();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();

                string consulta = @"select count([FechaId])as cantidad, FechaId, Fecha, FechaFinMes, FechaDia, FechaMes, 
                                   FechaAnio, FechaPrimerdiaMes, FechaDiaMesSiguiente, FechaUltDiaMesAnt, FechaTipoDia, 
                                   FechaEstados, FechaNota from Fechas where cast (Fecha as date) = @fecha group by FechaId, 
                                   Fecha, FechaFinMes, FechaDia, FechaMes, FechaAnio, FechaPrimerdiaMes, FechaDiaMesSiguiente, 
                                   FechaUltDiaMesAnt, FechaTipoDia, FechaEstados, FechaNota ";
                cmd.Parameters.AddWithValue("@fecha", pk);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {

                    f.fFechaId = int.Parse(dr["FechaId"].ToString());
                    f.fFecha = DateTime.Parse(dr["Fecha"].ToString());
                    f.fFechaFin = DateTime.Parse(dr["FechaFinMes"].ToString());
                    f.fFechaDia = int.Parse(dr["FechaDia"].ToString());
                    f.fFechaMes = int.Parse(dr["FechaMes"].ToString());
                    f.fFechaAnio = int.Parse(dr["FechaAnio"].ToString());
                    f.fFechaPrimerDiaMes = DateTime.Parse(dr["FechaPrimerdiaMes"].ToString());
                    f.fFechaDiaMesSiguiente = DateTime.Parse(dr["FechaDiaMesSiguiente"].ToString());
                    f.fFechaUltDiaMesAnterior = DateTime.Parse(dr["FechaUltDiaMesAnt"].ToString());
                    f.fFechaTipoDia = dr["FechaTipoDia"].ToString();
                    f.fFechaEstado = int.Parse(dr["FechaEstados"].ToString());
                    f.fNota = dr["FechaNota"].ToString();
                }

            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }

            return f;
        }

        public static bool cambiosFechas(ClsFecha f)
        {
            bool resultado = false;
            if (f.fNota == null)
            {
                f.fNota = "";
            }
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"UPDATE Fechas SET FechaNota=@nota, FechaTipoDia= @tipo WHERE FechaId=@id";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nota", f.fNota);
                cmd.Parameters.AddWithValue("@tipo", f.fFechaTipoDia);
                cmd.Parameters.AddWithValue("@id", f.fFechaId);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;
            }
            catch (Exception error)
            {
                string a = error.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return resultado;
        }
        public static List<ClsFecha> traerFechaActual(DateTime fecha)
        {
            List<ClsFecha> lista = new List<ClsFecha>();

            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                string date = fecha.ToString("yyyy-MM-dd");
                SqlCommand cmd = new SqlCommand();
                string consulta = @"Select * from Fechas where cast(Fecha as date) = @Fecha";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Fecha", date);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    ClsFecha f = new ClsFecha();
                    f.fFecha = Convert.ToDateTime(dr["Fecha"].ToString());
                    f.fFechaTipoDia = dr["FechaTipoDia"].ToString();
                    lista.Add(f);
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<ClsFecha> traerFechaDisponible(DateTime fecha)
        {
            List<ClsFecha> lista = new List<ClsFecha>();

            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                string date = fecha.ToString("yyyy-MM-dd");
                SqlCommand cmd = new SqlCommand();
                string consulta = @"Select top 1 * from Fechas where (cast(Fecha as date) >=  @Fecha) and (FechaTipoDia = 'Hábil') order by Fecha asc";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Fecha", date);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();

                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    ClsFecha f = new ClsFecha();
                    f.fFecha = Convert.ToDateTime(dr["Fecha"].ToString());
                    f.fFechaTipoDia = dr["FechaTipoDia"].ToString();
                    lista.Add(f);
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }

        public static List<ClsCuota> traerCuotasCoincidentes(DateTime fecha)
        {
            List<ClsCuota> lista = new List<ClsCuota>();

            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                string hola = "";
                string date = fecha.ToString("yyyy-MM-dd");
                SqlCommand cmd = new SqlCommand();
                string consulta = @"Select * from Cuotas c inner join prestamos p on c.CuoPrestamosId= p.PresContratoNro where cast(CuoFechaVencimiento as date) = @Fecha and CuoEstado = 642 and p.PresEstado=613";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Fecha", date);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    ClsCuota c = new ClsCuota();
                    c.cNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                    c.cImpCuota = dr["CuoImporteCuota"].ToString();
                    c.cVencCuota = Convert.ToDateTime(dr["CuoFechaVencimiento"].ToString());
                    c.cEstado = int.Parse(dr["CuoEstado"].ToString());
                    if (c.cEstado == 642)
                    {
                        c.cDesc = "Pendiente";
                    }
                    else if (c.cEstado == 643)
                    {
                        c.cDesc = "Cobrado";
                    }
                    else
                    {
                        c.cDesc = "Anulado";
                    }
                    if (dr.IsDBNull(12))
                    {
                        hola = "-";
                        //c.cNroRecibo = Convert.ToInt32(hola);
                    }
                    else
                    {
                        c.cNroRecibo = Convert.ToInt32(dr["CuoNroRecibo"].ToString());
                    }

                    lista.Add(c);
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static bool actualizarVencimientos(DateTime fecha, DateTime fechaNew)
        {
            bool resultado = false;
            string usu = System.Web.HttpContext.Current.Session["userName"].ToString();
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            SqlCommand cmd = new SqlCommand();
            string consulta = @"UPDATE Cuotas SET CuoFechaVencimiento = cast(@Fecha_nueva as date), CuoUsuario = @Usuario, CuoFecaud = GETDATE() where cast(CuoFechaVencimiento as date) = @Fecha";
            cmd.CommandType = System.Data.CommandType.Text;
            try
            {
                string date = fecha.ToString("yyyy-MM-dd");
                string date1 = fechaNew.ToString("yyyy-MM-dd");
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Fecha",date);
                cmd.Parameters.AddWithValue("@Fecha_nueva", date1);
                cmd.Parameters.AddWithValue("@Usuario", usu);
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;

            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return resultado;
        }


        /////// F I N    D E    F E C H A S
        ///


        ////  I N I C I O    P A R A M E T R O S


        public static List<CsMostrarParametro> cargarComboParam()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select distinct  dominio from Tabla_Parametros where Visible = 'T' order by dominio asc";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pDomValue = dr["dominio"].ToString();
                        if(c.pDomValue.Equals("Barrio"))
                        {
                            c.pDescripcion = "Barrio";
                        }
                        else if(c.pDomValue.Equals("colorMoto"))
                        {
                            c.pDescripcion = "Color - Moto";
                        }
                        else if(c.pDomValue.Equals("Funcion"))
                        {
                            c.pDescripcion = "Funcion";
                        }
                        else if(c.pDomValue.Equals("Localidad"))
                        {
                            c.pDescripcion = "Localidad";
                        }
                        else if(c.pDomValue.Equals("motMarca"))
                        {
                            c.pDescripcion = "Marca - Moto";
                        }
                        else if(c.pDomValue.Equals("motTipo"))
                        {
                            c.pDescripcion = "Tipo - Moto";
                        }
                        else if(c.pDomValue.Equals("Pais"))
                        {
                            c.pDescripcion = "Pais";
                        }
                        else if(c.pDomValue.Equals("Provincia"))
                        {
                            c.pDescripcion = "Provincia";
                        }
                        else if(c.pDomValue.Equals("Rol"))
                        {
                            c.pDescripcion = "Rol";
                        }
                        else if(c.pDomValue.Equals("tipoCaja"))
                        {
                            c.pDescripcion = "Caja - Moto";
                        }
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<CsMostrarParametro> obtenerListaParametrosFiltro(string dominio)
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select * from tabla_parametros where dominio = @Dom";

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Dom", dominio);

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pId = Convert.ToInt32(dr["Id_Param"].ToString());
                        c.pDescripcion = dr["descripcion"].ToString();
                        c.pDescripcionCorta = dr["descripcionCorta"].ToString();
                        c.pDominio = dr["Dominio"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static bool registrarParametro(CsMostrarParametro p)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            string consulta = @"INSERT INTO Tabla_Parametros (cod, descripcion, descripcionCorta, Dominio, Visible) VALUES (@cod, @des, @desCorta, @dominio, @visi)";
            cmd.CommandType = System.Data.CommandType.Text;
            try
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@visi", "T");
                cmd.Parameters.AddWithValue("@cod", p.pCod);
                cmd.Parameters.AddWithValue("@des", p.pDescripcion);
                cmd.Parameters.AddWithValue("@desCorta", p.pDescripcionCorta);
                cmd.Parameters.AddWithValue("@dominio", p.pDominio);
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;

            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }


            return resultado;
        }
        public static bool borrarParametro(CsMostrarParametro p)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            string consulta = @"DELETE Tabla_Parametros WHERE Id_Param = @id";
            cmd.CommandType = System.Data.CommandType.Text;
            try
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@id", p.pId);
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;

            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }


            return resultado;
        }
        public static bool editarParametro(CsMostrarParametro p)
        {
            bool resultado = false;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand();
            string consulta = @"UPDATE Tabla_Parametros SET cod = @cod ,descripcion = @descr ,descripcionCorta = @descCor ,Dominio = @domi ,Visible = 'T'
                                WHERE Id_Param = @id";
            cmd.CommandType = System.Data.CommandType.Text;
            try
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@id", p.pId);
                cmd.Parameters.AddWithValue("@cod", p.pCod);
                cmd.Parameters.AddWithValue("@descr", p.pDescripcion);
                cmd.Parameters.AddWithValue("@descCor", p.pDescripcionCorta);
                cmd.Parameters.AddWithValue("@domi", p.pDominio);
                cmd.CommandText = consulta;
                cnn.Open();
                cmd.Connection = cnn;
                cmd.ExecuteNonQuery();
                resultado = true;

            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }


            return resultado;
        }

        //////// F I N   P A R A M E T R O S
        ///


        //// I N I C I O    R E P O R T E

        public static List<ClsReporte> creacionReporte(DateTime fecha, string solicitud, int codigo)
        {
            List<ClsReporte> lista = new List<ClsReporte>();
            string sql = "";
            if (solicitud.Equals("Listado de Clientes"))
            {
                sql = @"SELECT cliId, cliNombre, cliApellido, cliDocumento, cliCUIT, cliTel, cliEmail FROM  Clientes";
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte c = new ClsReporte();
                            c.rApellido = dr["cliApellido"].ToString();
                            c.rCliId = Convert.ToInt32(dr["cliId"].ToString());
                            c.rCliNombre = dr["cliNombre"].ToString();
                            if (dr.IsDBNull(4))
                            {
                                c.rCuit = " - ";
                            }
                            else
                            {
                                c.rCuit = dr["cliCUIT"].ToString();
                            }
                            c.rDocumento = dr["cliDocumento"].ToString();
                            c.rMail = dr["cliEmail"].ToString();
                            c.rTel = dr["cliTel"].ToString();
                            lista.Add(c);
                        }
                    }

                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }

            }
            else if (solicitud.Equals("Historial de Cliente"))
            {
                sql = @"SELECT cliDocumento, cliCUIT, cliTel, cliEmail, CuoId, CuoPrestamosId, c.cliId, CuoNroCuota, CuoFechaVencimiento, CuoImporteCuota,
                        CuoSaldoImpago, CuoFechaCobro, CuoImporteCobrado, CuoNroRecibo, CuoEstado, CuoAdelanto, Id_Param, descripcion
                         FROM   (Clientes c LEFT OUTER JOIN Cuotas cu ON c.cliId=cu.CliId) INNER JOIN Tabla_Parametros t ON cu.CuoEstado=t.Id_Param
                         WHERE  c.cliId=@idCli";
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                string hola = "";
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@idCli", codigo);
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte c = new ClsReporte();
                            //c.rApellido = dr["cli_apellido"].ToString();
                            c.rCliId = Convert.ToInt32(dr["cliId"].ToString());
                            //c.rCliNombre = dr["cli_nombre"].ToString();
                            c.rCuit = dr["cliCUIT"].ToString();
                            c.rDocumento = dr["cliDocumento"].ToString();
                            c.rMail = dr["cliEmail"].ToString();
                            c.rTel = dr["cliTel"].ToString();
                            c.rCuoId = Convert.ToInt32(dr["CuoId"].ToString());
                            c.rCuoPrestId = Convert.ToDecimal(dr["CuoPrestamosId"].ToString());
                            c.rCuoNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                            c.rCuoFechaVencimiento = Convert.ToDateTime(dr["CuoFechaVencimiento"].ToString());
                            c.rCuoImporteCuota = Convert.ToDecimal(dr["CuoImporteCuota"].ToString());
                            c.rSaldoImpago = Convert.ToDecimal(dr["CuoSaldoImpago"].ToString());
                            if (dr.IsDBNull(11))
                                hola = "null";
                            else
                            {
                                c.rFechaCobro = Convert.ToDateTime(dr["CuoFechaCobro"].ToString());
                            }
                            if (dr.IsDBNull(12))
                                hola = "null";
                            else
                            {
                                c.rCuoImporteCobrado = Convert.ToDecimal(dr["CuoImporteCobrado"].ToString());
                            }
                            if (dr.IsDBNull(13))
                                hola = "null";
                            else
                            {
                                c.rCuoNroRecibo = Convert.ToDecimal(dr["CuoNroRecibo"].ToString());
                            }
                            c.rCuoEstado = Convert.ToInt32(dr["CuoEstado"].ToString());
                            if (dr.IsDBNull(15))
                                hola = "null";
                            else
                            {
                                c.rCuoAdelanto = Convert.ToDecimal(dr["CuoAdelanto"].ToString());
                            }
                            c.rParametroId = Convert.ToInt32(dr["Id_Param"].ToString());
                            c.rParametroNombre = dr["descripcion"].ToString();
                            lista.Add(c);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if (solicitud.Equals("Simulación de Préstamo"))
            {
                sql = @" SELECT SimNombre, SimMontoSolicitado, SimPlan, SimInteresPorc, SimCuotaValor, SimInteresCta, SimNroCuota, SimVencimientoCta
                     FROM   Simulacion
                     WHERE  SimId= @cod";
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@cod", codigo);
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.rsCuotaPura = Convert.ToDecimal(dr["SimCuotaValor"].ToString());
                            r.rsIntCalculado = Convert.ToDecimal(dr["SimInteresCta"].ToString());
                            r.rsMontoSolicitado = Convert.ToDecimal(dr["SimMontoSolicitado"].ToString());
                            r.rsNombCliente = dr["SimNombre"].ToString();
                            r.rsPlazo = dr["SimPlan"].ToString();
                            r.rsPorcInt = Convert.ToDecimal(dr["SimInteresPorc"].ToString());
                            r.rsFechaCuota = Convert.ToDateTime(dr["SimVencimientoCta"].ToString());
                            r.rsNroCuota = Convert.ToInt32(dr["SimNroCuota"].ToString());
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if (solicitud.Equals("Cobranza del día"))
            {
                sql = @" select cliApellido +', '+ cliNombre as cliente,cliDocumento ,cliTel, PresContratoNro, CuoNroCuota, CuoImporteCobrado, CuoNroRecibo,
                        CuoSaldoImpago, cuoUsuario, CuoFechaCobro
                        from cobranzas z left join Prestamos p on z.CuoPrestamosId=p.PresContratoNro left join Clientes c on p.PresCliId=c.cliId
                        where cast(CuoFechaCobro as date) = @fecha  and PresEstado = 613";
                string date = fecha.ToString("yyyy-MM-dd");
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@fecha", date);
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.rCliNombre = dr["cliente"].ToString();
                            r.rDocumento = dr["cliDocumento"].ToString();
                            r.rTel = dr["cliTel"].ToString();
                            r.rCuoPrestId = Convert.ToDecimal(dr["PresContratoNro"].ToString());
                            r.rCuoImporteCobrado = Convert.ToDecimal(dr["CuoImporteCobrado"].ToString());
                            r.rCuoNroRecibo = Convert.ToDecimal(dr["CuoNroRecibo"].ToString());
                            r.rSaldoImpago = Convert.ToDecimal(dr["CuoSaldoImpago"].ToString());
                            r.paUsuario = dr["cuoUsuario"].ToString();
                            r.rsFechaCuota = Convert.ToDateTime(dr["CuoFechaCobro"].ToString());
                            r.rsNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if (solicitud.Equals("Préstamos otorgados"))
            {
                sql = @"select cliApellido+', '+cliNombre as cliente,cliDocumento ,cliTel, PresContratoNro, presplan, PresMontoSolicitado, PresFecha,
                        PresUsuario, descripcion
                        from Prestamos p left join Clientes c on p.PresCliId=c.cliId inner join tabla_parametros t on p.presIntervaloCobranza = t.Id_Param
                        where cast(PresFecha as date)  = @fecha   and PresEstado = 613";
                string date = fecha.ToString("yyyy-MM-dd");
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@fecha", date);
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.rCliNombre = dr["cliente"].ToString();
                            r.rDocumento = dr["cliDocumento"].ToString();
                            r.rTel = dr["cliTel"].ToString();
                            r.rCuoPrestId = Convert.ToDecimal(dr["PresContratoNro"].ToString());
                            r.rsPlazo = dr["presplan"].ToString();
                            r.rsMontoSolicitado = Convert.ToDecimal(dr["PresMontoSolicitado"].ToString());
                            r.paIntervaloCobro = dr["descripcion"].ToString();
                            r.paUsuario = dr["PresUsuario"].ToString();
                            r.rsFechaCuota = Convert.ToDateTime(dr["PresFecha"].ToString());
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if (solicitud.Equals("Vencimiento en el día"))
            {
                sql = @"select CuoPrestamosId, cliApellido+', '+cliNombre as cliente, cl.cliId, CuoNroCuota,PresEstado, CuoImporteCuota, CuoFechaVencimiento, CuoSaldoImpago, cuoestado
                        from cuotas c inner join Prestamos p on c.CuoPrestamosId=p.PresContratoNro inner join Clientes cl on cl.cliId=c.CliId
                        where  CuoEstado = 642 and cast(CuoFechaVencimiento as date) = @fecha and PresEstado = 613  ";
                string date = fecha.ToString("yyyy-MM-dd");
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@fecha", date);
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.rCliNombre = dr["cliente"].ToString();
                            r.rCliId = Convert.ToInt32(dr["cliId"].ToString());
                            r.rCuoPrestId = Convert.ToDecimal(dr["CuoPrestamosId"].ToString());
                            r.rCuoNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                            r.rCuoImporteCuota = Convert.ToDecimal(dr["CuoImporteCuota"].ToString());
                            r.rCuoFechaVencimiento = Convert.ToDateTime(dr["CuoFechaVencimiento"].ToString());
                            r.rSaldoImpago = Convert.ToDecimal(dr["CuoSaldoImpago"].ToString());
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if (solicitud.Equals("Cuotas en Mora + 30 Días"))
            {
                sql = @"select cliApellido+', '+cliNombre as cliente, c.cliId, PresContratoNro, CuoNroCuota, CuoImporteCuota, CuoFechaVencimiento, 
                        CuoSaldoImpago, cuoestado
                        from clientes c inner join Prestamos p on c.cliId=p.PresCliId left join Cuotas s on s.CuoPrestamosId=p.PresContratoNro
                        where cuoestado =642
                        and CuoFechaVencimiento < @fecha
                        and (30 <= (SELECT DATEDIFF(day,cuofechavencimiento, @fecha) AS DiffDate))
                        and PresEstado = 613
                        order by PresContratoNro desc";
                string date = fecha.ToString("yyyy-MM-dd");
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@fecha", date);
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.rCliNombre = dr["cliente"].ToString();
                            r.rCliId = Convert.ToInt32(dr["cliId"].ToString());
                            r.rCuoPrestId = Convert.ToDecimal(dr["PresContratoNro"].ToString());
                            r.rCuoNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                            r.rCuoImporteCuota = Convert.ToDecimal(dr["CuoImporteCuota"].ToString());
                            r.rCuoFechaVencimiento = Convert.ToDateTime(dr["CuoFechaVencimiento"].ToString());
                            r.rSaldoImpago = Convert.ToDecimal(dr["CuoSaldoImpago"].ToString());
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            else if (solicitud.Equals("Cuotas vencidas"))
            {
                sql = @" select cliApellido+', '+cliNombre as cliente, c.cliId, PresContratoNro, CuoNroCuota, CuoImporteCuota, CuoFechaVencimiento, CuoSaldoImpago, CuoEstado
                        from Cuotas c inner join Prestamos p on c.CuoPrestamosId = p.PresContratoNro inner join Clientes cl on cl.cliId= p.PresCliId
                        where CuoEstado = 642 and PresEstado = 613 and CuoFechaVencimiento < GETDATE()";
                string date = fecha.ToString("yyyy-MM-dd");
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.rCliNombre = dr["cliente"].ToString();
                            r.rCliId = Convert.ToInt32(dr["cliId"].ToString());
                            r.rCuoPrestId = Convert.ToDecimal(dr["PresContratoNro"].ToString());
                            r.rCuoNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                            r.rCuoImporteCuota = Convert.ToDecimal(dr["CuoImporteCuota"].ToString());
                            r.rCuoFechaVencimiento = Convert.ToDateTime(dr["CuoFechaVencimiento"].ToString());
                            r.rSaldoImpago = Convert.ToDecimal(dr["CuoSaldoImpago"].ToString());
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }
            return lista;
        }

        public static List<ClsReporte> reportePrestamosActivos(int anio)
        {
            List<ClsReporte> lista = new List<ClsReporte>();
            //else if (solicitud.Equals("Préstamos activos"))
            //{
            string sql = @" SELECT PresContratoNro, cliApellido+', '+cliNombre as cliente, PresMontoSolicitado, PresPlan, PresPorcMensual, PresFecha,  descripcion, PresUsuario, PresEstado
                            FROM   Prestamos p inner join tabla_parametros t on p.PresIntervaloCobranza=t.Id_Param inner join Clientes c on c.cliId=p.PresCliId where PresEstado = 613 and year(presfecha) = @year";
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@year", anio);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.paEstado = Convert.ToInt32(dr["PresEstado"].ToString());
                            r.paFecha = Convert.ToDateTime(dr["PresFecha"].ToString());
                            r.paIntervaloCobro = dr["descripcion"].ToString();
                            r.paUsuario = dr["PresUsuario"].ToString();
                            r.rCliNombre = dr["cliente"].ToString();
                            //r.rCliId = Convert.ToInt32(dr["PresCliId"].ToString());
                            r.rCuoPrestId = Convert.ToInt32(dr["PresContratoNro"].ToString());
                            r.rsMontoSolicitado = Convert.ToDecimal(dr["PresMontoSolicitado"].ToString());
                            r.rsPlazo = dr["PresPlan"].ToString();
                            r.rsPorcInt = Convert.ToDecimal(dr["PresPorcMensual"].ToString());
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            //}
            return lista;
        }
        public static List<ClsReporte> reporteCobroMes(int mes, int anio)
        {
            List<ClsReporte> lista = new List<ClsReporte>();
            //else if (solicitud.Equals("Préstamos activos"))
            //{
            string sql = @"select cliApellido +', '+ cliNombre as cliente,cliDocumento,CuoImporteCuota ,cliTel, PresContratoNro, CuoNroCuota, CuoImporteCobrado, CuoNroRecibo,
                        CuoSaldoImpago, cuoUsuario, CuoFechaCobro
                        from cobranzas z left join Prestamos p on z.CuoPrestamosId=p.PresContratoNro left join Clientes c on p.PresCliId=c.cliId
                        where month(CuoFechaCobro) = @month  and PresEstado = 613 and year(CuoFechaCobro) = @year";
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@month", mes);
                cmd.Parameters.AddWithValue("@year", anio);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.rCliNombre = dr["cliente"].ToString();
                            r.rDocumento = dr["cliDocumento"].ToString();
                            r.rTel = dr["cliTel"].ToString();
                            r.rCuoPrestId = Convert.ToDecimal(dr["PresContratoNro"].ToString());
                            r.rCuoImporteCobrado = Convert.ToDecimal(dr["CuoImporteCobrado"].ToString());
                            r.rCuoNroRecibo = Convert.ToDecimal(dr["CuoNroRecibo"].ToString());
                            r.rSaldoImpago = Convert.ToDecimal(dr["CuoSaldoImpago"].ToString());
                            r.paUsuario = dr["cuoUsuario"].ToString();
                            r.rsFechaCuota = Convert.ToDateTime(dr["CuoFechaCobro"].ToString());
                            r.rsNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                            r.rCuoImporteCuota = Convert.ToDecimal(dr["CuoImporteCuota"].ToString());
                            if(r.rCuoImporteCuota == r.rCuoImporteCobrado)
                        {
                            r.tipoCobro = "Saldo Cuota";
                        }
                            else if (r.rCuoImporteCuota > r.rCuoImporteCobrado)
                        {
                            r.tipoCobro = "Adelanto";
                        }else if (r.rCuoImporteCuota < r.rCuoImporteCobrado)
                        {
                            r.tipoCobro = "Saldo Cuota";
                        }
                            
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            //}
            return lista;
        }

        public static List<ClsReporte> reporteRango(string solicitud, DateTime f1, DateTime f2)
        {
            List<ClsReporte> lista = new List<ClsReporte>();
            string sql = "";
            if (solicitud.Equals("Rango de vencimiento"))
            {
                sql = @"select CuoPrestamosId, cliApellido+', '+cliNombre as cliente, cl.cliId, CuoNroCuota,PresEstado, CuoImporteCuota, CuoFechaVencimiento, CuoSaldoImpago, cuoestado
                        from cuotas c inner join Prestamos p on c.CuoPrestamosId=p.PresContratoNro inner join Clientes cl on cl.cliId=c.CliId
                        where  CuoEstado = 642 and (cast(CuoFechaVencimiento as date) between @fecha1 and @fecha2) and PresEstado = 613 ";
                string date1 = f1.ToString("yyyy-MM-dd");
                string date2 = f2.ToString("yyyy-MM-dd");
                SqlConnection cnn = new SqlConnection(cadenaConexion);
                try
                {
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@fecha1", date1);
                    cmd.Parameters.AddWithValue("@fecha2", date2);
                    cmd.CommandText = sql;
                    cnn.Open();
                    cmd.Connection = cnn;
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr != null)
                    {
                        while (dr.Read())
                        {
                            ClsReporte r = new ClsReporte();
                            r.rCliNombre = dr["cliente"].ToString();
                            r.rCliId = Convert.ToInt32(dr["cliId"].ToString());
                            r.rCuoPrestId = Convert.ToDecimal(dr["CuoPrestamosId"].ToString());
                            r.rCuoNroCuota = Convert.ToInt32(dr["CuoNroCuota"].ToString());
                            r.rCuoImporteCuota = Convert.ToDecimal(dr["CuoImporteCuota"].ToString());
                            r.rCuoFechaVencimiento = Convert.ToDateTime(dr["CuoFechaVencimiento"].ToString());
                            r.rSaldoImpago = Convert.ToDecimal(dr["CuoSaldoImpago"].ToString());
                            lista.Add(r);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                finally
                {
                    cnn.Close();
                }
            }

            return lista;
        }
        public static List<ClsReporte> cargarTodasSimulaciones(string nombre)
        {
            List<ClsReporte> lista = new List<ClsReporte>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string sql = @"select DISTINCT SimId as Codigo,SimNombre,  SimMontoSolicitado,SimPlan, SimInteresPorc, SimCuotaValor, SimInteresCta 
                                from Simulacion where SimNombre like '%" + nombre + "%'";

                cmd.CommandType = System.Data.CommandType.Text;
                //cmd.Parameters.AddWithValue("@name", nombre);
                cmd.CommandText = sql;
                cnn.Open();
                cmd.Connection = cnn;
                SqlDataReader dr = cmd.ExecuteReader();
                //if (dr != null)
                //{
                while (dr.Read())
                {
                    ClsReporte c = new ClsReporte();
                    c.rsCuotaPura = Convert.ToDecimal(dr["SimCuotaValor"].ToString());
                    c.rsIntCalculado = Convert.ToDecimal(dr["SimInteresCta"].ToString());
                    c.rsMontoSolicitado = Convert.ToDecimal(dr["SimMontoSolicitado"].ToString());
                    c.rsNombCliente = dr["SimNombre"].ToString();
                    c.rsPlazo = dr["SimPlan"].ToString();
                    c.rsPorcInt = Convert.ToDecimal(dr["SimInteresPorc"].ToString());
                    c.rsProcesoId = Convert.ToInt32(dr["Codigo"].ToString());
                    lista.Add(c);
                }
                //}
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            finally
            {
                cnn.Close();
            }



            return lista;
        }


        ///////////// F I N     R E P O R T E S
        ///

        ///// I N I C I O   C O N T A C T O

        public bool guardarMensaje(string mail, string asunto, string mensaje)
        {
            bool resultado = false;




            return resultado;
        }


        ///////I N I C I O     C O N T A C T O
        ///


        public static List<CsMostrarParametro> cargarComboAnio()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select distinct year(presfecha) as anio from Prestamos";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pDescripcion = dr["anio"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static List<CsMostrarParametro> cargarComboAnioMeses()
        {
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select distinct year(CuoFechaCobro) as anio from cobranzas";

                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.pDescripcion = dr["anio"].ToString();
                        lista.Add(c);
                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            return lista;
        }
        public static int[] contratosXanio(int anio)
        {
            //int[] arreglo;
            int mes;
            int cantida;
            int[] arreglo = new int[13];
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select  month(PresFecha) as mes,count(PresContratoNro)as cantidad from prestamos
                                    where year(presFecha) = @year and PresEstado=613
                                    group by  month(PresFecha)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@year", anio);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.mes = Convert.ToInt32(dr["mes"].ToString());
                        c.cantidad = Convert.ToInt32(dr["cantidad"].ToString());
                        lista.Add(c);

                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }

            if(lista != null)
            {
                for (int i = 0; i < lista.Count; i++)
                {

                    arreglo[lista[i].mes] = lista[i].cantidad;
                }
            }

            return arreglo;

        }
        public static decimal[] entregaXmes(int anio)
        {
            //int[] arreglo;
            int mes;
            int cantida;
            decimal[] arreglo = new decimal[13];
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select month(PresFecha) as mes,sum(convert(decimal,REPLACE (REPLACE (presmontosolicitado, '.' , '' ), ',' , '.' ))) as entrega from prestamos
                                    where PresEstado = 613 and year(presfecha) = @year 
                                    group by  month(PresFecha)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@year", anio);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.mes = Convert.ToInt32(dr["mes"].ToString());
                        c.entrega = Convert.ToDecimal(dr["entrega"].ToString());
                        lista.Add(c);

                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }

            if(lista != null)
            {
                for (int i = 0; i < lista.Count; i++)
                {

                    arreglo[lista[i].mes] = lista[i].entrega;
                }
            }

            return arreglo;

        }
        public static int[] cantidadDiasMes(int anio, int mesCalendario)
        {
            int cantida = 0;
            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select DAY(EOMONTH('" + anio + "-" + mesCalendario + "-10')) as Cantidaddías";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@year", anio);
                cmd.Parameters.AddWithValue("@mes", mesCalendario);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {

                        cantida = Convert.ToInt32(dr["Cantidaddías"].ToString());

                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }
            int[] arreglo = new int[cantida];
            for (int i = 0; i < arreglo.Length; i++)
            {
                arreglo[i] = i;
            }
            return arreglo;
        }
        public static decimal[] cobroXmes(int anio, int mesCalendario)
        {
            //int[] arreglo;
            int dia;
            int cantida;
            decimal[] arreglo = new decimal[32];
            List<CsMostrarParametro> lista = new List<CsMostrarParametro>();
            SqlConnection cnn = new SqlConnection(cadenaConexion);

            try
            {
                SqlCommand cmd = new SqlCommand();
                string consulta = @"select DAY(EOMONTH('" + anio + "' + '-'+ '" + mesCalendario + "' + '-10')) as Cantidaddías , day(CuoFechaCobro) as día, sum(convert(float,REPLACE (CuoImporteCobrado, ',' , '.' ))) as cantidad from cobranzas where year(CuoFechaCobro) = @year and month(cuofechaCobro) = @mes group by day(CuoFechaCobro)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@year", anio);
                cmd.Parameters.AddWithValue("@mes", mesCalendario);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = consulta;

                cnn.Open();
                cmd.Connection = cnn;

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        CsMostrarParametro c = new CsMostrarParametro();
                        c.dia = Convert.ToInt32(dr["día"].ToString());
                        c.Cantidaddia = Convert.ToInt32(dr["Cantidaddías"].ToString());
                        c.entrega = Convert.ToDecimal(dr["cantidad"].ToString());
                        lista.Add(c);

                    }
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
            }
            finally
            {
                cnn.Close();
            }

            if(lista != null)
            {
                for (int i = 0; i < lista.Count; i++)
                {

                    arreglo[lista[i].dia] = lista[i].entrega;
                }
            }

            return arreglo;

        }
    }
}