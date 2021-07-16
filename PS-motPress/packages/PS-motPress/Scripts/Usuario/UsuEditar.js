angular.module('menuAngular', [])

$(document).ready(function () {


    $('#btnEnviarForm').click(function () {

        var form = $('#frm-editar');
        var form_data = new FormData(document.getElementById("frm-editar"));

        var valor = validarForm();
        if (valor === true) {


            $('#btnEnviarForm').css({ 'display': 'none' });
            $('#btnCerrar').css({ 'display': 'none' });
            $('#msjCarga').css({ 'display': '' });

            $.ajax({
                dataType: 'JSON',
                type: 'POST',
                url: form.attr('action'),
                data: form_data,
                processData: false,
                contentType: false,
                success: function (data) {
                    var resultado = data;
                    $('#btnEnviarForm').css({ 'display': '' });
                    $('#btnCerrar').css({ 'display': '' });
                    $('#msjCarga').css({ 'display': 'none' });
                    if ($.trim(resultado) == 'Exito') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'Los cambios se guardaron correctamente!',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location = "/Usuario/UsuBusqueda";
                            }
                        });

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El proceso de guardado no se completó!',
                        })
                    }
                }
            });

            return false;
        }

    });


    $('#btnCerrar').click(function () {

        window.location = '/Usuario/UsuBusqueda';

    });


});


function validarForm() {

    var nombre = $('#uNombre').val();
    var apellido = $('#uApellido').val();
    var email = $('#uEmail').val();
    var tel = $('#uTel').val();
    var rol = $('#uIdRol').val();
    var funcion = $('#uIdFuncion').val();
    var doc = $('#uDocumento').val();

    if ($.trim(nombre) == "") {
        Swal.fire({ title: "Debe definir el nombre del usuario", icon: "warning" });
        return false;
    }
    if ($.trim(email) == "") {
        Swal.fire({ title: "Debe definir el correo electrónico del usuario", icon: "warning" });
        return false;
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
    if ($.trim(funcion) == "") {
        Swal.fire({ title: 'Debe definir la "función" del usuario', icon: "warning" });
        return false;
    }
    if ($.trim(doc) == "") {
        Swal.fire({ title: 'Debe definir el "documento" del usuario', icon: "warning" });
        return false;
    }
    return true;

}