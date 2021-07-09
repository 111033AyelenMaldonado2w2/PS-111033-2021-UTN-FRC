angular.module('menuAngular', [])

$(document).ready(function () {

    $('#btnBorrar').click(function () {

        var parametros = {
            usuario: $('#uUsuario').val()
        };
        $('#btnBorrar').css({ 'display': 'none' });
        $('#btnCerrar').css({ 'display': 'none' });
        $('#msjCarga').css({ 'display': '' });

        $.ajax({
            url: '/Usuario/UsuarioEliminar',
            data: parametros,
            type: 'POST',
            success: function (result) {
                var resultado = result;
                $('#btnBorrar').css({ 'display': '' });
                $('#btnCerrar').css({ 'display': '' });
                $('#msjCarga').css({ 'display': 'none' });
                if ($.trim(resultado) == "Exito") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: 'El  registro se eliminó correctamente!',
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
                        text: 'El proceso no se completó!',
                    })
                }
            }
        });

    });



    $('#btnCerrar').click(function () {

        window.location = '/Usuario/UsuBusqueda';

    });

});