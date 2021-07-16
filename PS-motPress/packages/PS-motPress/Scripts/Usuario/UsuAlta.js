angular.module('menuAngular', [])

$(document).ready(function () {

    $('#btnCerrar').click(function () {
        window.location = "/Home/Index";
    })

    $('.input-number').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    var input = document.getElementById('uDocumento');
    input.addEventListener('input', function () {
        if (this.value.length > 8)
            this.value = this.value.slice(0, 8);
    })
    var input1 = document.getElementById('uCUIT');
    input1.addEventListener('input', function () {
        if (this.value.length > 11)
            this.value = this.value.slice(0, 11);
    })


    $('#enviarForm').click(function () {

       

        if ($('#existeUs').is(':hidden')) {
            var valor = validarForm();
            if (valor === true) {

                $('#enviarForm').css({ 'display': 'none' });
                $('#btnCerrar').css({ 'display': 'none' });
                $('#msjCarga').css({ 'display': '' });


                var form = $('#frm-alta');
                var form_data = new FormData(document.getElementById("frm-alta"));
                $.ajax({
                    dataType: 'JSON',
                    type: 'POST',
                    url: form.attr('action'),
                    data: form_data,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        var resultado = data;
                        $('#enviarForm').css({ 'display': '' });
                        $('#btnCerrar').css({ 'display': '' });
                        $('#msjCarga').css({ 'display': 'none' });
                        if ($.trim(resultado) == 'Exito') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Exito!',
                                text: 'El  registro se almacenó correctamente!',
                                allowOutsideClick: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location = "/Usuario/UsuAlta";
                                }
                            });

                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'El proceso no se completó!',
                                allowOutsideClick: false,
                            })
                        }
                    }
                });

                return false;
            }
        } else {
            Swal.fire({ title: "El usuario seleccionado ya existe", icon: "warning" });
            return false;
        }

        
    });

    //$("#frm-alta").submit(function () {


    //    var valor = validarForm();
    //    if ( valor === true) {

    //        var form = $(this);

    //        $.ajax({
    //            dataType: 'JSON',
    //            type: 'POST',
    //            url: form.attr('action'),
    //            data: new FormData(this),
    //            processData: false,
    //            contentType: false,
    //            success: function (data) {
    //                var resultado = data;
    //                if ($.trim(resultado) == 'Exito') {
    //                    Swal.fire({
    //                        icon: 'success',
    //                        title: 'Exito!',
    //                        text: 'El  registro se procesó correctamente!',
    //                    }).then((result) => {
    //                        if (result.isConfirmed) {
    //                            window.location = "/Usuario/UsuAlta";
    //                        }
    //                    });

    //                }
    //                else {
    //                    Swal.fire({
    //                        icon: 'error',
    //                        title: 'Oops...',
    //                        text: 'El proceso no se completó!',
    //                    })
    //                }
    //            }
    //        });

    //        return false;

    //    }

        
    //})


});

function cargarCombo1() {
    var pasar = {
        parametro: 1
    };

    $.ajax({
        url: "/Usuario/CargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#funcion")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#funcion").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}

function cargarCombo2() {
    var pasar = {
        parametro: 2
    };

    $.ajax({
        url: "/Usuario/CargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#rol")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#rol").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}

function cargaNuevaContra() {
    $.ajax({
        url: "/Usuario/crearContra",
        type: "Post",
        success: function (result) {
            var contra = result;

            $('.contra').val(contra);
        }
    });
}


function verificarExistencia() {
    var usuario = $('#userName').val();

    if ($.trim(usuario) == "") {
        $('#existeUs').css({ 'display': 'none' });
    }
    else {
        var pasar = {
            parametro: usuario
        };
        $.ajax({
            url: "/Usuario/existeUsuario",
            data: pasar,
            type: "Post",
            success: function (result) {
                var contra = result;
                if ($.trim(contra) == "Existe") {
                    $('#existeUs').css({ 'display': 'block' });
                }
                else {
                    $('#existeUs').css({ 'display': 'none' });
                }
            }
        });
    }
    if ($.trim(usuario) == " ") {
        $('#existeUs').css({ 'display': 'none' });
    }

    
}

function validarUsuario() {

    var usuario = $('#userName').val();
    var pasar = {
        parametro: usuario
    };
    $.ajax({
        url: "/Usuario/existeUsuario",
        data: pasar,
        type: "Post",
        success: function (result) {
            var contra = result;
            if ($.trim(contra) == "Existe") {
                Swal.fire({ title: "El usuario seleccionado ya existe", icon: "warning" });
                return false;
            }
        }
    });
    return true;
}

function validarForm() {

    var usuario = $('#userName').val();
    var nombre = $('#uNombre').val();
    var apellido = $('#uApellido').val();
    var email = $('#uEmail').val();
    var tel = $('#uTel').val();
    var rol = $('#rol').val();
    var funcion = $('#funcion').val();
    var doc = $('#uDocumento').val();
    var CUIT = $('#uCUIT').val();

    if ($.trim(usuario) == "") {
        Swal.fire({ title: "Debe definir un nombre de usuario", icon: "warning" });
        return false;
    }
    //if() {
    //    validarUsuario();
    //}
    if ($.trim(nombre) == "") {
        Swal.fire({ title: "Debe definir el nombre del usuario", icon: "warning" });
        return false;
    }
    if ($.trim(email) == "") {
        Swal.fire({ title: "Debe definir el correo electrónico del usuario", icon: "warning" });
        return false;
    }
    //else {
    //    var texto = email.split("@");
    //    var final = texto[1];

    //    if ($.trim(final) == "gmail.com") {

    //    }
    //    else {
    //        Swal.fire({ title: "El correo electrónico debe tener el domino '@gmail.com'", icon: "warning" });
    //        return false;
    //    }
    //}
    if ($.trim(doc) == "") {
        Swal.fire({ title: "Debe definir el documento del usuario", icon: "warning" });
        return false;
    }
    else {
        if (doc.length < 8) {
            Swal.fire({ title: "El Documento debe contar con 8(OCHO) caracteres como mínimo", icon: "warning" });
            return false;
        }
    }
    if ($.trim(CUIT) == "") {
        //Swal.fire({ title: "Debe definir el documento del usuario", icon: "warning" });
        //return false;
    }
    else {
        if (CUIT.length < 11) {
            Swal.fire({ title: "El CUIT/CUIL debe contar con 11(ONCE) caracteres", icon: "warning" });
            return false;
        }
    }
    if ($.trim(rol) == "") {
        Swal.fire({ title: 'Debe definir el "rol del usuario', icon: "warning" });
        return false;
    }
    if ($.trim(apellido) == "") {
        Swal.fire({ title: "Debe definir el apellido del usuario", icon: "warning" });
        return false;
    }
    if ($.trim(tel) == "") {
        Swal.fire({ title: "Debe definir un teléfono de contacto usuario", icon: "warning" });
        return false;
    }
    else {
        if (tel.length < 7) {
            Swal.fire({ title: "El mínimo de dígitos de un teléfono es de 7(SIETE) caracteres", icon: "warning" });
            return false;
        }
    }
    if ($.trim(funcion) == "") {
        Swal.fire({ title: 'Debe definir la "función" del usuario', icon: "warning" });
        return false;
    }
    return true;
}
function validarSintaxis() {
    var input = $('#uNombre').val();
    var nuevo = '';
    nuevo = input[0].toUpperCase() + input.slice(1);
    $('#uNombre').val(nuevo);

    var input = $('#uApellido').val();
    var nuevo = '';
    nuevo = input[0].toUpperCase() + input.slice(1);
    $('#uApellido').val(nuevo);

}
function lanzadera() {
    cargarCombo1();
    cargarCombo2();
    cargaNuevaContra();
}

window.onload = lanzadera();