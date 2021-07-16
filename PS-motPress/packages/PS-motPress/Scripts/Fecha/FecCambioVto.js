

$(document).ready(function () {

    $('#buscarFecha').click(function () {

        var dtp = $('#dtpFecha').val();

        if ($.trim(dtp) == "") {
            Swal.fire("Debes especificar una fecha para continuar.")
        }
        else {
            primeraFecha();
            fechaDisponible();
            tablaCuotas();
            //$('#todo').show();
        }

    });


    $('#btnActualizar').click(function () {

        var fechita = $('#dtpFecha').val();
        var fechitaNew = $('#txtDisponible').val();

        var parametros =
        {
            fecha: fechita,
            fechaNueva: fechitaNew
        };
        $.ajax({
            url: "/Fecha/actualizarVto",
            data: parametros,
            type: "POST",
            success: function (result) {
                var r = result;

                if ($.trim(r) == "Exito") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: 'Vencimientos actualizados correctamente!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location = "/Fecha/FecCambioVto";
                        }
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La actualización no se completó  !',
                    })
                }
            }
        });

    });


    $('#btnCancel').click(function () {
        window.location = "/Fecha/FecCambioVto";
    });
    $('#btnCancel1').click(function () {
        window.location = "/Fecha/FecCambioVto";
    });


});



function primeraFecha() {

    var fechita = $('#dtpFecha').val();
    $('#txtFechaSelec').html(formato(fechita));
    var parametro =
    {
        fecha: fechita
    };

    $.ajax({
        url: "/Fecha/traerFechaActual",
        data: parametro,
        type: "POST",
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                $('#txtFechaSelecTipoDia').html(result[0].fFechaTipoDia);
            }
            $('#verFechaSel').show();
        }
    });

}


function fechaDisponible() {
    var fechita = $('#dtpFecha').val();

    var parametro =
    {
        fecha: fechita
    };

    $.ajax({
        url: "/Fecha/traerFechaDisp",
        data: parametro,
        type: "POST",
        success: function (result) {
            for (var i = 0; i < result.length; i++) {

                var fecha = result[0].fFecha;
                var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                var fecha = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                $('#txtnexFechaSelecTipoDia').html(result[0].fFechaTipoDia);

                $('#txtnexFecha').html(fecha);
                $('#txtDisponible').val(fecha);
            }
            $('#verNuevaFecha').show();

        }
    });
}

function formato(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
}
function formateoPuntosyComas(valor) {

    var cant = valor.indexOf('$');
    if (cant > 0) {
        valor = valor.replace('.', ',');
        valor = valor.split('$');
        var completo = valor[1];
        completo = completo.replace(' ', '');
        completo = completo.split(',');
        var decimal = completo[1];
        var entero = completo[0];
        entero = entero.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        entero = entero.split('').reverse().join('').replace(/^[\.]/, '');
        var valorFinal = entero + ',' + decimal;
        return valorFinal;
    }
    else {
        valor = valor.replace('.', ',');
        valor = valor.split(',');
        var decimal = valor[1];
        var entero = valor[0];
        entero = entero.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        entero = entero.split('').reverse().join('').replace(/^[\.]/, '');
        var valorFinal = entero + ',' + decimal;
        return valorFinal;
    }

}
function tablaCuotas() {
    var fechita = $('#dtpFecha').val();

    var parametro =
    {
        fecha: fechita
    };

    $.ajax({
        url: "/Cuota/traerCuotasCoinciden",
        data: parametro,
        type: "POST",
        success: function (result) {
            var html = '';
            if (result.length > 0) {
                var head = '<thead><tr><th>Nro Cuota</th><th>Importe Cuota</th><th>Vencimiento</th><th>Estado</th><th>Nro Recibo</th></tr></thead>'
                for (var i = 0; i < result.length; i++) {

                    var fecha = result[i].cVencCuota;
                    var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                    var fecha = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                    html += '<tbody><tr><td style="text-align:center">' + result[i].cNroCuota + '</td>' +
                        '<td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].cImpCuota).toFixed(2)) + '</td>' +
                        '<td style="text-align:center">' + fecha + '</td>' +
                        '<td style="text-align:center">' + result[i].cDesc + '</td>' +
                        '<td style="text-align:center">' + result[i].cNroRecibo + '</td></tr></tbody>';

                }
                $('#tablaCuotas').html(head + html);
                $('#sinResultado').html('');
                $('#verBotones').show();
                //$('#tablaCuotas').html();
                //$('#todo').show();
            }
            else {
                html = '<h4>' + "No se encontraron Cuotas con vencimiento en el día indicado" + '</h4>';
                $('#sinResultado').html(html);
                $('#tablaCuotas').html('');
                $('#verBotones1').show();
            }
            $('#verTitulo').show();
            $('#dtpFecha').attr('disabled', true);
            $('#buscarFecha').attr('disabled', true);
        }
    });
}