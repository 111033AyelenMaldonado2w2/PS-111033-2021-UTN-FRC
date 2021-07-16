$(document).ready(function () {

    $('#btnEnviarCorreo').click(function () {

        if (validarCorreo() === true) {
            var parametros =
            {
                mail: $('#correo').val(),
                asunto: $('#6Asunto').val(),
                mensaje: $('#6Mensaje').val()
            }

            $.ajax({
                url: '/Index/nuevoMensaje',
                data: parametros,
                type: 'POST',
                success: function (result) {
                    var rta = result;

                    if ($.trim(resultado) == "Exito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'El correo ha sido enviado!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                imprimirContrato();
                                window.location = "/Index/Contacto";
                            }
                        });

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El correo no se ha enviado!',
                        })
                    }
                }
            });
        }

    });



});


function validarCorreo() {
    var mail = $('#correo').val();
    var asu = $('#6Asunto').val();
    var mens = $('#6Mensaje').val();


    if($.trim(mail) == "")
    {
        Swal.fire({ title: "Debes completar con tú correo electrónico!", icon: "warning" });
        return false
    }
    if ($.trim(asu) == "")
    {
        Swal.fire({ title: "Debes completar con el asunto de tú mensaje!", icon: "warning" });
        return false
    }
    if ($.trim(mens) == "")
    {
        Swal.fire({ title: "Debes completar con el mensaje que deseas enviarnos!", icon: "warning" });
        return false
    }
    return true;
}
