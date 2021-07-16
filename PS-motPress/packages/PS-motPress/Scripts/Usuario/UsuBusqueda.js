
$(document).ready(function () {



});

//$(document).ready(function () {
//    $('#btnActivar').click(function () {
//        var code = $('#codCli').val();

//        var parametros =
//        {
//            cod: code
//        };
//        $.ajax({
//            url: '/Cliente/darAltaCliente',
//            data: parametros,
//            type: 'POST',
//            success: function (result) {
//                var r = result;
//                if ($.trim(r) == "Exito") {
//                    Swal.fire(
//                        'Activado!',
//                        'El cliente ha sido reactivado.',
//                        'success'
//                    ).then((result) => {
//                        if (result.isConfirmed) {
//                            window.location = "/Cliente/CliHistorial";
//                        }
//                    });
//                }
//                else {
//                    Swal.fire(
//                        'Error!',
//                        'El cliente no ha sido reactivado.',
//                        'error'
//                    );
//                }
//            }
//        });
//    })
//})
