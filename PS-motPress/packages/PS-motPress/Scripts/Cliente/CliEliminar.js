angular.module('menuAngular', [])
$(document).ready(function () {

    $('#btnClose').click(function () {
        window.location = "/Cliente/CliBusqueda";
    });



    $('#btnBorrar').click(function () {

        var codigo = $('#cCliId').val();
        var cuestion = $('#txtCircunstancia').val();
        $('#btnBorrar').css({ 'display': 'none' });
        $('#btnClose').css({ 'display': 'none' });
        $('#msjCarga').css({ 'display': '' });
        var parametros = {
            idCli: codigo,
            nota: cuestion
        };

        $.ajax({
            url: '/Cliente/EliminarCli',
            data: parametros,
            type: 'POST',
            success: function (result) {
                var r = result;
                $('#btnBorrar').css({ 'display': '' });
                $('#btnClose').css({ 'display': '' });
                $('#msjCarga').css({ 'display': 'none' });
                if ($.trim(r) == "Exito") {
                    Swal.fire({
                        title: 'Borrado!',
                        text: 'El cliente ha sido eliminado.',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location = "/Cliente/CliBusqueda";
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'El cliente no ha sido eliminado.',
                        icon: 'error',
                    });
                }
            }
        });

    });

});