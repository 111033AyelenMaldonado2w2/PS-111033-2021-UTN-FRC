
$(document).ready(function () {

    $('#btnGenerarAnio').click(function () {

        var contenido = $('#utlFecha').val();

        if (contenido == 0) {
            valor = 0;
        }
        else {
            valor = contenido;
        }

        var param = {
            fecha: valor
        }

        //if (contenido == 0) {
            $.ajax({
                url: '/Fecha/nuevoAnio',
                data: param,
                type: 'POST',
                success: function (result) {
                    var situacion = result;
                    if ($.trim(situacion) == "Exito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'Nuevo año incorporado al calendario correctamente!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location = "/Fecha/FecGestion";
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo incorporar el nuevo Año al calendario!',
                        })
                    }
                }
            });
        //}
    })



    $('#buscarFecha').click(function () {

        var fecha = $('#dtpFecha').val();



        var primeraCalendario = $('#primFecha').val();
        primeraCalendario = primeraCalendario.replace('/', '-');
        primeraCalendario = primeraCalendario.replace('/', '-');
        var newdate = primeraCalendario.split("-").reverse().join("-");
        var fecha1 = new Date(newdate).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
        primeraCalendario = fecha1.replace("/", "-");
        primeraCalendario = primeraCalendario.replace("/", "-");
        primeraCalendario = primeraCalendario.split("-").reverse().join("-");



        var finCalendario = $('#utlFecha').val();
        finCalendario = finCalendario .replace('/', '-');
        finCalendario = finCalendario .replace('/', '-');
        var newdate = finCalendario .split("-").reverse().join("-");
        var fecha1 = new Date(newdate).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
        finCalendario  = fecha1.replace("/", "-");
        finCalendario = finCalendario .replace("/", "-");
        finCalendario = finCalendario .split("-").reverse().join("-");


        if (new Date(fecha).getTime() > new Date(primeraCalendario).getTime() && new Date(fecha).getTime() < new Date(finCalendario).getTime()) {
            var parametro =
            {
                Date: fecha
            };

            $.ajax({
                url: "/Fecha/busquedaFecha",
                data: parametro,
                type: "POST",
                success: function (result) {
                    //if (result.length > 0) {
                    //    for (var i = 0; i < result.length; i++) {
                    //fecha
                    var fecha = result.fFecha;
                    var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                    fecha = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                    //Fin de mes
                    var fecha1 = result.fFechaFin;
                    var codigo_fecha1 = parseInt(fecha1.replace("/Date(", "").replace(")/", ""));
                    fecha1 = new Date(codigo_fecha1).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                    //Primer día del mes
                    var fecha2 = result.fFechaPrimerDiaMes;
                    var codigo_fecha2 = parseInt(fecha2.replace("/Date(", "").replace(")/", ""));
                    fecha2 = new Date(codigo_fecha2).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                    //ultimo dia del mes anterior
                    var fecha3 = result.fFechaUltDiaMesAnterior;
                    var codigo_fecha3 = parseInt(fecha3.replace("/Date(", "").replace(")/", ""));
                    fecha3 = new Date(codigo_fecha3).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                    $('#txtFecha').val(fecha);
                    $('#txtFinMes').val(fecha1);
                    $('#txtInicioMes').val(fecha2);
                    $('#txtUltimoDia').val(fecha3);
                    $('#txtDia').val(result.fFechaDia);
                    $('#txtMes').val(result.fFechaMes);
                    $('#txtAnio').val(result.fFechaAnio);
                    $('#txtTipo').val(result.fFechaTipoDia);
                    $('#txtEstado').val(result.fFechaEstado);
                    $('#txtNota').val(result.fNota);
                    $('#txtId').val(result.fFechaId);

                    $('#btnEditar').attr('disabled', false);
                    //    }
                    //}
                }
            });


        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha seleccionada no está incluida en el calendario!',
            })
        }

       


    });


    $('#btnEditar').click(function () {

        $('#btnGuardar').attr('disabled', false);
        $('#btnCancel').attr('disabled', false);
        $('#txtNota').attr('disabled', false);
        $('#txtTipo').attr('disabled', false);
        $('#buscarFecha').attr('disabled', true);
        $('#dtpFecha').attr('disabled', true);
        $('#btnEditar').attr('disabled', true);
    });



    $('#btnCancel').click(function () {

        $('#txtNota').attr('disabled', true);
        $('#txtTipo').attr('disabled', true);
        $('#btnEditar').attr('disabled', true);
        $('#btnGuardar').attr('disabled', true);
        $('#buscarFecha').attr('disabled', false);
        $('#dtpFecha').attr('disabled', false);
        $('#dtpFecha').val('');
        $('#txtFecha').val('');
        $('#txtInicioMes').val('');
        $('#txtFinMes').val('');
        $('#txtDia').val('');
        $('#txtMes').val('');
        $('#txtAnio').val('');
        $('#txtNota').val('');
        $('#txtTipo').val('Hábil');
        $('#btnCancel').attr('disabled', true);
    });


    $('#btnGuardar').click(function () {

        var tipo = $('#txtTipo').val();
        var notita = $('#txtNota').val();
        var id = $('#txtId').val();


        var parametros =
        {
            fFechaTipoDia: tipo,
            fNota: notita,
            fFechaId: id
        };

        $.ajax({
            url: "/Fecha/modificarFecha",
            data: parametros,
            type: "POST",
            success: function (result) {
                var resultado = result;
                if ($.trim(resultado) == "Exito") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: 'Cambios almacenados correctamente!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location = "/Fecha/FecGestion";
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



    $('#btnVtoCambio').click(function () {
        window.location = "/Fecha/FecCambioVto";
    })

});

function traerUltimaFecha() {

    $.ajax({
        url: '/Fecha/ultimaFecha',
        type: 'POST',
        success: function (result) {
            var resultado = result;
            //$('#rtaUltimaFecha').html(' ' + resultado);

            if ($.trim(resultado) == "Aún no hay fechas, para ello inserte un nuevo año al calendario.")
            {
                var poner = 0;
                $('#utlFecha').val(poner);
                $('#rtaUltimaFecha').html(resultado);
            }
            else
            {
                separador = " ";
                resultado = resultado.split(separador);
                resultado = resultado[0];
                $('#rtaUltimaFecha').html(resultado);
                $('#utlFecha').val(resultado);
            }
        }
    });

};
function traerPrimeraFecha() {

    $.ajax({
        url: '/Fecha/PrimeraFecha',
        type: 'POST',
        success: function (result) {
            var resultado = result;
            //$('#rtaUltimaFecha').html(' ' + resultado);

            if ($.trim(resultado) == "Aún no hay fechas, para ello inserte un nuevo año al calendario.")
            {
                var poner = 0;
                $('#primFecha').val(poner);
                $('#rtaPrimeraFecha').html(resultado);
            }
            else
            {
                separador = " ";
                resultado = resultado.split(separador);
                resultado = resultado[0];
                $('#rtaPrimeraFecha').html(resultado);
                $('#primFecha').val(resultado);
            }
        }
    });

};
function compare_dates(fecha, fecha2) {
    var xMonth = fecha.substring(3, 5);
    var xDay = fecha.substring(0, 2);
    var xYear = fecha.substring(6, 10);
    var yMonth = fecha2.substring(3, 5);
    var yDay = fecha2.substring(0, 2);
    var yYear = fecha2.substring(6, 10);
    if (xYear > yYear) {
        return (true)
    }
    else {
        if (xYear == yYear) {
            if (xMonth > yMonth) {
                return (true)
            }
            else {
                if (xMonth == yMonth) {
                    if (xDay > yDay)
                        return (true);
                    else
                        return (false);
                }
                else
                    return (false);
            }
        }
        else
            return (false);
    }
}

function lanzadera() {
    traerUltimaFecha();
    traerPrimeraFecha();
}

window.onload = lanzadera();