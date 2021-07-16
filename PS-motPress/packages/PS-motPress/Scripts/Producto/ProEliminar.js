angular.module('menuAngular', [])
$(document).ready(function () {

    $('#btnBorrar').click(function () {

        Swal.fire({
            title: 'Estás seguro de querer eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
        }).then((result) => {
            if (result.isConfirmed) {
                var prod = $('#idProducto').val();
                $('#btnBorrar').css({ 'display': 'none' });
                $('#btnCancel').css({ 'display': 'none' });
                $('#msjCarga').css({ 'display': 'inline' });
                var parametros =
                {
                    id: prod
                }

                $.ajax({
                    url: '/Producto/ProAccionEliminar',
                    data: parametros,
                    type: 'POST',
                    success: function (result) {
                        var r = result;
                        if ($.trim(r) == "Exito") {
                            Swal.fire({
                                title: "Borrado!",
                                text: "El producto ha sido eliminado.",
                                icon: "success",
                                allowOutsideClick: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $('#btnBorrar').css({ 'display': 'inline' });
                                    $('#btnCancel').css({ 'display': 'inline' });
                                    $('#msjCarga').css({ 'display': 'none' });
                                    window.location = "/Producto/ProBusqueda";
                                }
                            });
                        }
                        else {
                            Swal.fire({
                                title: "Error!",
                                text: 'El producto no ha sido eliminado.',
                                icon: 'error',
                                allowOutsideClick: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $('#btnBorrar').css({ 'display': 'inline' });
                                    $('#btnCancel').css({ 'display': 'inline' });
                                    $('#msjCarga').css({ 'display': 'none' });
                                }
                            });
                        }
                    }
                });
            }
        });

    });


});

function prueba() {
    window.location = "/Producto/ProBusqueda"
}