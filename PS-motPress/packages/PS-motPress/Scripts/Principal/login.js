////var app = angular.module('menuAngular', []);

//(function () {
//    var app = angular.module('menu', []);
//})();
var direccionSolicitada = '';




$(document).ready(function () {

    $('#ventanaInicio').on('hidden.bs.modal', function () {
        // do something here
        var html = '';
        $('#usuario').val('');
        $('#contrasenia').val('');
    })
    $('#nuevaContra').on('hidden.bs.modal', function () {
        // do something here
        var html = '';
        $('#recuperacionUsu').val('');
        $('#recuperacionmail').val('');
    })
    $('#creacionContra').on('hidden.bs.modal', function () {
        // do something here
        var html = '';
        $('#usuarioNuevaContra').val('');
        $('#codigo').val('');
        $('#corto').val('');
    })

    $(document).on("click", (e) => {

        switch (e.target.id) {
            case "rpt":
                direccionSolicitada = "rpt";
                validarRol(direccionSolicitada);
                break;
        }

    });


    $('#conformUsuario').click(function () {



        if (validar() === true) {
            $('#conformUsuario').css({ 'display': 'none' });
            $('#btnCargaInicio').css({ 'display': '' });
            var parametros = {
                usuario: $('#usuario').val(),
                contrasenia: $('#contrasenia').val()
            };
            //$('#espera').css({ 'display': 'block' });
            $.ajax({
                url: "/Log/buscarUsuario",
                data: parametros,
                type: "Post",
                success: function (result) {
                    var html = '';
                    $('#conformUsuario').css({ 'display': '' });
                    $('#btnCargaInicio').css({ 'display': 'none' });
                    var resultado = result;
                    if (resultado.lUsuario != null) {
                        var code = result.lEstado;

                        if (code == 622) {
                            $('#ventanaInicio').modal('hide');
                            $('#creacionContra').modal('show');
                        }
                        else {
                            $('#ventanaInicio').modal('hide');
                            //$('#espera').css({ 'display': 'none' });

                            window.location = "/Home/Index"
                        }
                        //var html1 = '';
                        //if (result.length > 0) {
                        //for (var i = 0; i < result.length; i++) {
                        //    htmlNom = result[0].lApellido + ', ' + result[0].lNombre;
                        //    html = '<h5>' + Session["userDenominacion"] + '</h5>';
                        //    html1 = '<p>' + result[0].lRol + '</p>';
                        //}
                        //Session["userDenominacion"] = htmlNom
                        //$('#tituloSesion').html(html);
                        //$('#funcion').html(html1);
                        //$('#barraUsuario').show();

                        //}

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuario o contraseña incorrecto!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#usuario').val('');
                                $('#contrasenia').val('');
                            }
                        });
                    }
                }



            });
        }

        


    });


    $('#nuevaContraConfir').click(function () {

        if (validarConfirmacion() === true) {


            var user = $('#usuarioNuevaContra').val();
            var code = $('#codigo').val();
            var contra = $('#nvaContra').val();

            var param =
            {
                usuario: user,
                codigo: code,
                pass: contra
            }

            $.ajax({
                url: '/Log/NuevaContra',
                data: param,
                type: 'POST',
                success: function (result) {
                    var situacion = result;
                    if ($.trim(situacion) == "Exito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'La contraseña se almacenó correctamente!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#usuario').val(user);
                                $('#ventanaInicio').modal('show');
                                $('#creacionContra').modal('hide');
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El codigo o usuario ingresado es incorrecto!',
                        })
                    }
                }
            });

        }

    });

    $('#btnCerrarSesion').click(function () {

        Swal.fire({
            title: 'Aviso',
            text: "Estás seguro de querer Cerrar Sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar!'
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    url: "/Log/LogOut",
                    type: "Post",
                    success: function (result) {
                        Swal.fire(
                            'Cerrado!',
                            'Su sesión ha concluido.',
                            'success')
                        location.href = "/Home/Index";
                    }

                });
            }
        })
            

    });



    $('#btnNuevaContra').click(function () {

        $('#ventanaInicio').modal('hide');
        $('#nuevaContra').modal('show');


    });



    $('#datosParaRecuperacion').unbind("click").bind("click", function () {


        if (validarParaRecup() === true) {

            $('#datosParaRecuperacion').css({ 'display': 'none' });
            $('#msjCarga1').css({ 'display': '' });


            var mail = $('#recuperacionmail').val();
            var param = {
                email: mail
            }

            $.ajax({
                url: '/Log/validarEmail',
                data: param,
                type: 'POST',
                success: function (result) {
                    var situacion = result;
                    if ($.trim(situacion) == "Exito") {

                        var usuario = $('#recuperacionUsu').val();


                        var parametros =
                        {
                            usu: usuario,
                            email: mail
                        };

                        $.ajax({
                            url: "/Log/LogRecuperacion",
                            data: parametros,
                            type: "Post",
                            success: function (result) {
                                $('#datosParaRecuperacion').css({ 'display': '' });
                                $('#msjCarga1').css({ 'display': 'none' });
                                //alert(result);
                                var situacion = result;
                                if ($.trim(situacion) == "Fracaso") {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'El correo electrónico no existe o no coincide con el usuario ingresado!',
                                    })
                                }
                                else if ($.trim(situacion) == "Exito") {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Exito!',
                                        text: 'Se le ha enviado un correo electrónico con el código de recuperación!',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            //$('#usuario').val(user);
                                            $('#nuevaContra').modal('hide');
                                            $('#creacionContra').modal('show');

                                        }
                                    });
                                    //$('#segundaParte').show();
                                    //$('#primeraParte').hide();
                                }
                            }
                        });
                    }
                    else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El correo electrónico ingresado no existe!',
                        })

                    }
                }
            });
        }
    });

});


function onKeyUp(event) {
    var keycode = event.keyCode;
    if (keycode == '13') {
        if (validar() === true) {

            var parametros = {
                usuario: $('#usuario').val(),
                contrasenia: $('#contrasenia').val()
            };

            $.ajax({
                url: "/Log/buscarUsuario",
                data: parametros,
                type: "Post",
                success: function (result) {
                    var html = '';
                    var resultado = result;
                    if (resultado != 0) {
                        var code = result.lEstado;

                        if (code == 622) {
                            $('#ventanaInicio').modal('hide');
                            $('#creacionContra').modal('show');
                        }
                        else {
                            $('#ventanaInicio').modal('hide');
                            window.location = "/Home/Index"
                        }
                        //var html1 = '';
                        //if (result.length > 0) {
                        //for (var i = 0; i < result.length; i++) {
                        //    htmlNom = result[0].lApellido + ', ' + result[0].lNombre;
                        //    html = '<h5>' + Session["userDenominacion"] + '</h5>';
                        //    html1 = '<p>' + result[0].lRol + '</p>';
                        //}
                        //Session["userDenominacion"] = htmlNom
                        //$('#tituloSesion').html(html);
                        //$('#funcion').html(html1);
                        //$('#barraUsuario').show();

                        //}

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuario o contraseña incorrecto!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#usuario').val('');
                                $('#contrasenia').val('');
                            }
                        });
                    }
                }



            });
        }
    }
}


function validarTamanio()
{
    var nvaContra = $('#nvaContra').val()

    if ($.trim(nvaContra) == "") {
        $('#corto').css({ 'display': 'none' });
    }
    else {
        if (nvaContra.length < 5) {
            $('#corto').css({ 'display': 'block' });
        }
        else {
            $('#corto').css({ 'display': 'none' });
        }
    }
}
function validar() {

    var u = $('#usuario').val();
    var c = $('#contrasenia').val();
    //var cod = $('#')

    if ($.trim(u) == "") {
        Swal.fire({ title: 'Debe definir el usuario.', icon: 'warning' });
        validado = false;
        return false;
    }
    if ($.trim(c) == "") {
        Swal.fire({ title: 'Debe definir la contraseña.', icon: 'warning' });
        validado = false;
        return false;
    }
    //else {
    //    if (c.length < 5) {
    //        Swal.fire({ title: 'La contraseña debe tener como mínimo 6(SEIS) caracteres.', icon: 'warning' });
    //        validado = false;
    //        return false;
    //    }
    //}
    return true;
}
function validarParaRecup() {

    var u = $('#recuperacionUsu').val();
    var m = $('#recuperacionmail').val();
    //var cod = $('#')

    if ($.trim(u) == "") {
        Swal.fire({ title: 'Debe definir el usuario.', icon: 'warning' });
        validado = false;
        return false;
    }
    if ($.trim(m) == "") {
        Swal.fire({ title: 'Debe incluir el correo electrónico al cual desea recibir el código de recuperación.', icon: 'warning' });
        validado = false;
        return false;
    }
    //else {
    //    if (c.length < 5) {
    //        Swal.fire({ title: 'La contraseña debe tener como mínimo 6(SEIS) caracteres.', icon: 'warning' });
    //        validado = false;
    //        return false;
    //    }
    //}
    return true;
}
function validarConfirmacion() {

    var u = $('#usuarioNuevaContra').val();
    var c = $('#nvaContra').val();
    var cod = $('#codigo').val();
    //var cod = $('#')

    if ($.trim(u) == "") {
        Swal.fire({ title: 'Debe definir el usuario.', icon: 'warning' });
        validado = false;
        return false;
    }
    if ($.trim(cod) == "") {
        Swal.fire({ title: 'Debe incluir el codigo enviado por correo electrónico.', icon: 'warning' });
        validado = false;
        return false;
    }
    if ($.trim(c) == "") {
        Swal.fire({ title: 'Debe definir la contraseña.', icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        if (c.length < 5) {
            Swal.fire({ title: 'La contraseña debe tener como mínimo 6(SEIS) caracteres.', icon: 'warning' });
            validado = false;
            return false;
        }
    }
    return true;
}
function inicio() {
    window.location = "/Home/Index";
}
function apertura() {
    $('#ventanaInicio').modal('show');
}
function validarSessionExistente() {
    var sesionAhora = '';
    $.ajax({
        type: "POST",
        url: "/Log/GetSession",
        success: function (result) {
            sesionAhora = result;
            if ($.trim(sesionAhora) == "null" || $.trim(sesionAhora) == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Aviso',
                    text: 'Debes Iniciar Sesión!',
                    confirmButtonText: 'Aceptar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        inicio();
                        //apertura();
                    }
                    else {
                        window.location = "/Home/Index";
                    }
                })
            }


        }
    });

    ////if (sesionAhora == null) {
    ////    Swal.fire({
    ////        icon: 'error',
    ////        title: 'Aviso',
    ////        text: 'Debes Iniciar Sesión!',
    ////        confirmButtonText: 'Aceptar',
    ////        allowOutsideClick: false,
    ////    }).then((result) => {
    ////        if (result.isConfirmed) {
    ////            $('#ventanaInicio').modal('show');
    ////            return false;
    ////        }
    ////        //else {
    ////        //    location.href = "/Home/Index";
    ////        //}
    ////    })

    ////}
    ////return true
}

function validarInicioSolos() {
    var sesionAhora = '';
    $.ajax({
        type: "POST",
        url: "/Log/GetSession",
        success: function (result) {
            sesionAhora = result;
            if ($.trim(sesionAhora) == "null") {
                Swal.fire({
                    icon: 'error',
                    title: 'Aviso',
                    text: 'Debes Iniciar Sesión!',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "/Home/Index"
                        $('#ventanaInicio').modal('show');
                        //return false;
                    }
                    //else {
                    //    location.href = "/Home/Index";
                    //}
                })

                //location.href = "/Home/Index";
            }
            

        }
    });

    if (sesionAhora == null) {
        Swal.fire({
            icon: 'error',
            title: 'Aviso',
            text: 'Debes Iniciar Sesión!',
            confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                $('#ventanaInicio').modal('show');
                return false;
            }
            //else {
            //    location.href = "/Home/Index";
            //}
        })

    }
    return true

}
function validarInicio() {
    var sesionAhora = '';
    $.ajax({
        type: "POST",
        url: "/Log/GetSession",
        success: function (result) {
            sesionAhora = result;
            if ($.trim(sesionAhora) == "null") {
                Swal.fire({
                    icon: 'error',
                    title: 'Aviso',
                    text: 'Debes Iniciar Sesión!',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        
                        return false;
                    }
                    //else {
                    //    location.href = "/Home/Index";
                    //}
                })

                //location.href = "/Home/Index";
            }
            //else {
            //    validarRol();
            //}

        }
    });


}
function validarRol(direccion) {

    var rolAhora = $('#rolActual').val();

    if (($.trim(direccion) == "rpt" || $.trim(direccion) == "ptrConf" || $.trim(direccion) == "gtonFch" || $.trim(direccion) == "usuAlt" || $.trim(direccion) == "usuGtio"))
    {
        if ($.trim(rolAhora) == "Empleado") {
            Swal.fire({
                icon: 'error',
                title: 'Aviso',
                text: 'Debes ser "Administrador" para tener acceso a esta sección!',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location = "/Home/Index";
                }
            });
        }
        else {
            if ($.trim(direccion) == "rpt") {
                window.location = "/Reporte/RepBusqueda";
            }
            else if ($.trim(direccion) == "ptrConf") {
                window.location = "/Parametro/ParamGestion";
            }
            else if ($.trim(direccion) == "gtonFch") {
                window.location = "/Fecha/FecGestion";
            }
            else if ($.trim(direccion) == "usuAlt") {
                window.location = "/Usuario/UsuAlta";
            }
            else if ($.trim(direccion) == "usuGtio") {
                window.location = "/Usuario/UsuBusqueda";
            }
        }

    }

}