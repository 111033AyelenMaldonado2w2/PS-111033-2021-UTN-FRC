angular.module('menuAngular', [])

$(document).ready(function () {
    $('#modalCLiente').on('hidden.bs.modal', function () {
        var html = '';
        $('#Cargartabla').html(html);
        $('#palabra').val('');
    })

    $('.input-number').on('input', function () {
        this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
    });

    $('.btnSubir').click(function () {

        var uno = $('#txtEsDoc').prop('checked');
        var dos = $('#txtEsNombre').prop('checked');
        var palabrita = $('#palabra').val();
        //$(".btnSubir").prop("disabled", true);
        if (palabrita !== "") {
            if (uno === false && dos === false) {
                $('#exampleModalCenter').modal('show')
                Swal.fire('Debe definir un patron de búsqueda');
                $('#txtEsDoc').focus();
            }
            else {
                $('#btnSubir').css({ 'display': 'none' });
                $('#msjCarga3').css({ 'display': '' });
                var params = {
                    parametro: $('#palabra').val(),
                    Chbxs1: uno,
                    Chbxs2: dos

                };
                var result = [];
                $.ajax({
                    url: "/Prestamo/PresBuscaCli",
                    data: params,
                    type: "Post",
                    success: function (result) {
                        $('#btnSubir').css({ 'display': '' });
                        $('#msjCarga3').css({ 'display': 'none' });
                        var html = '';
                        var cabecera = '<thead><tr><th> Nombre</th><th>Apellido</th><th>Documento</th><th hidden="true"></th><th hidden = "true"></th><th hidden = "true"></th><th></th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                html += '<tbody><td>' + result[i].cNombre + '</td>' +
                                    '<td>' + result[i].cApellido + '</td>' +
                                    '<td>' + result[i].cDocumento + '</td>' +
                                    '<td hidden="true">' + result[i].cTel + '</td>' +
                                    '<td hidden="true">' + result[i].cCliId + '</td>' +
                                    '<td>' + '<a class="tomada" id="abc" onClick="tomarCliente();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                                    '</tr></tbody>';
                            }
                            $('#Cargartabla').html(cabecera + html);
                            $("#palabra").val("");
                            $('#Cargartabla').show();
                        }
                        else {
                            $('#Cargartabla').show();
                            html = '<h4>' + "No se encontraron registros" + '</h4>';
                            $('#Cargartabla').html(html);
                            $("#palabra").val("");

                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error...');
                    }
                });
            };
        }
        else {
            Swal.fire('Debe definir un término a buscar');
        }

    });


    $('#btnPagoCuota').click(function () {


        rbtSaltoTotal = $('#rbtSaldo').prop('checked');

        if (rbtSaltoTotal == true) {
            if (validarCampos() === true) {

                $('#btnPagoCuota').css({ 'display': 'none' });
                $('#msjCarga').css({ 'display': '' });
                $('#btnImprimirRecibo').attr('disabled', true);
                $('#btnCancel').attr('disabled', true);

                var formulario =
                {
                    cpCuoFechaCobro: $('#txtFechaCobro').val(),
                    cpPresMontoSolicitado1: $('#aCobrar').val(),
                    cpCuoIInteresMora: $('#porcMora').val(),
                    cpCuoObservaciones: $('#txtObservación').val(),
                    cpCuoId: $('#txtIdCuota').val(),
                    cpCuoSaldoImpago: $('#impago').val(),
                    cpCheckSaldo: $('#rbtSaldo').prop('checked'),
                    nrContrato: $('#prestamoId').val(),
                    cpCuoNroCuota: $('#nroCta').val(),
                    cpCuoFechaVencimiento: $('#txtFechaVenc').val(),
                    cpCuoImporteCuota: $('#importeCuota').val(),
                    cpCuoImporteCpital: $('#capXcta').val(),
                    cpCuoImporteInterese: $('#intXcta').val()
                };

                $.ajax({
                    url: "/Cuota/pagoCuota",
                    data: formulario,
                    type: "Post",
                    success: function (results) {
                        $('#btnPagoCuota').css({ 'display': '' });
                        $('#msjCarga').css({ 'display': 'none' });
                        $('#btnImprimirRecibo').attr('disabled', false);
                        $('#btnCancel').attr('disabled', false);
                        var resultado = results;
                        if ($.trim(resultado) == "Exito") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Exito!',
                                text: 'El  pago se procesó correctamente!',
                                allowOutsideClick: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    obtenerelRecibo();
                                }
                            });

                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'El proceso de pago no se completó  !',
                            })
                        }
                    }
                });
            }
        }
        else {
            if (validarCampos() === true) {

                var formulario =
                {
                    cpCuoFechaCobro: $('#txtFechaCobro').val(),
                    cpPresMontoSolicitado1: $('#aCobrar').val(),
                    cpAdelanto: $('#aCobrar').val(),
                    cpCuoIInteresMora: $('#porcMora').val(),
                    cpCuoObservaciones: $('#txtObservación').val(),
                    cpCuoId: $('#txtIdCuota').val(),
                    cpCuoSaldoImpago: $('#impago').val(),
                    cpCheckSaldo: $('#rbtSaldo').prop('checked'),
                    nrContrato: $('#prestamoId').val(),
                    cpCuoNroCuota: $('#nroCta').val(),
                    cpCuoFechaVencimiento: $('#txtFechaVenc').val(),
                    cpCuoImporteCuota: $('#importeCuota').val(),
                    cpCuoImporteCpital: $('#capXcta').val(),
                    cpCuoImporteInterese: $('#intXcta').val()
                };

                $.ajax({
                    url: "/Cuota/pagoCuota",
                    data: formulario,
                    type: "Post",
                    success: function (results) {
                        var resultado = results;
                        if ($.trim(resultado) == "Exito") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Exito!',
                                text: 'El  pago se procesó correctamente!',
                                allowOutsideClick: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    obtenerelReciboAdelanto();
                                }
                            });

                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'El proceso de pago no se completó  !',
                            })
                        }
                    }
                });
            }
        }


    });
});


function tomarCliente() {

    var columna2;
    var nom;
    var doc;
    var tel;
    var nroPrestamo;
    var idCli;
    var a = document.querySelectorAll(".tomada");
    for (var b in a) { //Como nos devuelve un array iteramos
        var c = a[b];
        if (typeof c == "object") { //Solo buscamos los objetos
            c.onclick = function () { //Asignamos un evento onclick
                var td = this.offsetParent; //Localizamos el TD
                var tr = td.parentElement;  //LLegamos hasta el TR
                columna2 = tr.children[1];
                nom = tr.children[0];// Buscamos la Columna NOMBRE
                doc = tr.children[2];
                tel = tr.children[3];
                idCli = tr.children[4];
                calle = tr.children[5];

                //inicio
                $('#tablaConCuotas').html('');
                $('#datosPrestamo').hide();
                $('#tituloTablaCuotas').hide();
                $('#formCuotas').hide();
                ////


                $('#calleCli').val(calle.textContent);
                $('#clidOC').val(doc.textContent);

                var params = {
                    sitio: doc.textContent
                };
                $.ajax({
                    url: "/Prestamo/BusquedaPrestamosActivos",
                    data: params,
                    type: "Post",
                    success: function (result) {

                        var html = '';
                        var cabecera = '<thead><tr><th></th><th style="width:90px;">Nro Contrato</th><th>Estado</th><th>Fecha de Concesión</th><th>Plan</th><th>Capital Inicial</th><th>Capital Financiado</th><th>Saldo Cobrado</th><th></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                var fecha = result[i].dpFecha;
                                var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                                fecha = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                var fechaOr = result[0].dpFecha;
                                var codigo_fecha1 = parseInt(fechaOr.replace("/Date(", "").replace(")/", ""));
                                fechaOr = new Date(codigo_fecha1).toLocaleDateString("es-AR");

                                var estado = result[i].dpEstadoPrestamo;
                                var icono;
                                if ($.trim(estado) == 613) {
                                    icono = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style="color:green" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d = "m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" /></svg>'
                                }
                                else if ($.trim(estado) == 668) {
                                    icono = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style="color:red" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d = "m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" /></svg>'


                                }
                                else if ($.trim(estado) == 667) {
                                    icono = '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" style = "color:red" class="bi bi-caret-right-fill" viewBox = "0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'

                                }
                                //else if ($.trim(estado) == "Refinanciado") {
                                //    icono = '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" style = "color:chartreuse" class="bi bi-caret-right-fill" viewBox = "0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'
                                //}

                                var solicitado = result[i].dpMontoSolicitado;
                                var valor2 = solicitado.indexOf(",");
                                if (valor2 > 0) {
                                    var punto2 = solicitado.indexOf(".");
                                    if (punto2 > 0) {
                                        solicitado = solicitado;
                                    }
                                    else {
                                        solicitado = formateoPuntos(solicitado);
                                    }

                                }
                                else {
                                    solicitado = formateoPuntosyComas(solicitado);
                                }

                                var financiado = result[i].dpCapitalFinanciado;
                                var valor = financiado.indexOf(",");
                                if (valor > 0) {
                                    var punto = financiado.indexOf(".");
                                    if (punto > 0) {
                                        financiado = financiado;
                                    }
                                    else {
                                        financiado = formateoPuntos(financiado);
                                    }

                                }
                                else {
                                    financiado = formateoPuntosyComas(parseFloat(financiado).toFixed(2));
                                }

                                var cobrado = result[i].pImporteCobrado;
                                var valor1 = cobrado.indexOf(",");
                                if (valor1 > 0) {
                                    var punto1 = cobrado.indexOf(".");
                                    if (punto1 > 0) {
                                        cobrado = cobrado;
                                    }
                                    else {
                                        cobrado = formateoPuntos(cobrado);
                                    }

                                }
                                else {
                                    cobrado = formateoPuntosyComas(parseFloat(cobrado).toFixed(2));
                                }

                                html += '<tbody><td>' + icono + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpNroContrato + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpEstado + '</td>' +
                                    '<td style="text-align:center">' + fecha + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpPlan + '</td>' +
                                    '<td style="text-align:right"> $ ' + solicitado + '</td>' +
                                    '<td style="text-align:right"> $ ' + financiado + '</td>' +
                                    '<td style="text-align:right"> $ ' + cobrado + '</td>' +
                                    '<td hidden="true">' + result[i].dpPorcej + '</td>' +
                                    '<td hidden="true">' + result[i].dpIntervaloCobro + '</td>' +
                                    '<td hidden="true">' + result[i].dpCuotasCobradas + '</td>' +
                                    '<td hidden="true">' + result[i].dpNombreMoto + '</td>' +
                                    '<td hidden="true">' + result[i].dpMarcaMoto + '</td>' +
                                    '<td hidden="true">' + result[i].dpNota + '</td>' +
                                    '<td>' + '<a class="tomadaP" id="abc" onClick="visualCuotas();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                                    '</tr></tbody>';


                                $('#prestamoId').val(result[0].dpNroContrato);                       
                            }
                            $('#tablaConPrestamos').html(cabecera + html);
                            $('#tituloTablaPrestamos').show();
                            $('#sinResultado').html('');

                        }
                        else {
                            var html = '<h4>No se encontraron préstamos activos</h4>';
                            $('#sinResultado').html(html);
                            $('#tablaConPrestamos').html('');
                        }
                    }
                });
                $('#docu').val(doc.textContent);
                $('#idCli').val(idCli.textContent);
                $('#txtDenominacion').val(columna2.textContent + ", " + nom.textContent);

                $('#modalCLiente').modal('hide');

            }
        }
    }

}

function formateoPuntosyComas(valor) {

    valor = valor.replace('.', ',');
    valor = valor.split(',');
    var decimal = valor[1];
    var entero = valor[0];
    entero = entero.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    entero = entero.split('').reverse().join('').replace(/^[\.]/, '');
    var valorFinal = entero + ',' + decimal;
    return valorFinal;
}
function formateoPuntos(valor) {

    valor = valor.split(',');
    var decimal = valor[1];
    var entero = valor[0];
    entero = entero.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    entero = entero.split('').reverse().join('').replace(/^[\.]/, '');
    var valorFinal = entero + ',' + decimal;
    return valorFinal;
}

function visualCuotas() {
    var capital;
    var nroContrato;
    var cantCuotas;
    var cantCuotasCobradas;
    var impCobrado;
    var tipoVenc;
    var nroPrestamo;
    var tasa;
    var sist;
    var a = document.querySelectorAll(".tomadaP");
    for (var b in a) {
        var c = a[b];
        if (typeof c == "object") {
            c.onclick = function () {
                var td = this.offsetParent;
                var tr = td.parentElement;
                capital = tr.children[5];
                nroContrato = tr.children[1];
                cantCuotas = tr.children[4];
                impCobrado = tr.children[7];
                tasa = tr.children[8];
                tipoVenc = tr.children[9];
                cantCuotasCobradas = tr.children[10];
                estado = tr.children[2];
                nombM = tr.children[11];
                marcM = tr.children[12];
                nota = tr.children[13];
                fechaContrato = tr.children[3];
                $('.mostrar').show();
                $('#nroContrato').val(nroContrato.textContent);
                $('#impoPrestamo').val(capital.textContent);
                $('#cantCuotas').val(cantCuotas.textContent);
                $('#loCobrado').val(impCobrado.textContent);
                $('#porcTasa').val(tasa.textContent);
                $('#nombreMoto').val(nombM.textContent);
                $('#marcaMoto').val(marcM.textContent);
                $('#nota').val(nota.textContent);
                $('#tituloTablaCuotas').show();
                $('#formCuotas').show();
                fechaOrigen = fechaContrato.textContent;
                fechaOrigen = fechaOrigen.split('/').reverse().join('-');
                $('#fechaOrigen').val(fechaOrigen);

                $('#cantCuotasCob').val(cantCuotasCobradas.textContent);

                if (tipoVenc.textContent == 661) {
                    $('#tipoVenc').val("Mensual");
                }
                else if (tipoVenc.textContent == 662) {
                    $('#tipoVenc').val("Bimestral");

                } else if (tipoVenc.textContent == 663) {
                    $('#tipoVenc').val("Semestral");

                } else if (tipoVenc.textContent == 664) {
                    $('#tipoVenc').val("Quincenal");
                } else if (tipoVenc.textContent == 665) {
                    $('#tipoVenc').val("Semanal");
                } else if (tipoVenc.textContent == 666) {
                    $('#tipoVenc').val("Diario");
                }

                if ($.trim(estado.textContent) == "Anulado" || $.trim(estado.textContent) == "Cancelado") {
                    $('#btnAccionAnular').attr("disabled", true);
                    $('#btnAccionFinalizar').attr("disabled", true);
                }

                var params = {
                    nroContrato: nroContrato.textContent
                };
                $.ajax({
                    url: "/Prestamo/busquedaCuotasVisual",
                    data: params,
                    type: "Post",
                    success: function (result) {
                        var html = '';
                        var cabecera = '<thead><tr><th hidden="True">Nro Contrato</th><th style="width: 60px">Nro Cta</th><th>Costo</th><th>Vencimiento</th><th>Estado</th><th  hidden="True"></th><th  hidden="True"></th><th  hidden="True"></th><th  hidden="True"></th><th  hidden="True"></th><th></th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                var fecha1 = result[i].cVencCuota;
                                var codigo_fecha1 = parseInt(fecha1.replace("/Date(", "").replace(")/", ""));
                                fecha1 = new Date(codigo_fecha1).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                var fecha2 = result[i].cFechaPago;
                                if (fecha2 != "/Date(-62135586000000)/") {
                                    var codigo_fecha2 = parseInt(fecha2.replace("/Date(", "").replace(")/", ""));
                                    var fechaCobro = new Date(codigo_fecha2).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                }
                                else {
                                    fechaCobro = " - ";
                                }


                                html += '<tbody><td hidden="True">' + result[i].cPrestId + '</td>' +
                                    '<td style="text-align:center">' + result[i].cNroCuota + '</td>' +
                                    '<td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].cImpCuota).toFixed(2)) + '</td>' +
                                    '<td style="text-align:center">' + fecha1 + '</td>' +
                                    '<td style="text-align:center">' + result[i].cDesc + '</td>' +
                                    '<td  hidden="True" style="text-align:center">' + parseFloat(result[i].cImpCapital).toFixed(2) + '</td>' +
                                    '<td  hidden="True" style="text-align:right">' + parseFloat(result[i].cImpInteres).toFixed(2) + '</td>' +
                                    '<td  hidden="True" style="text-align:right">' + parseFloat(result[i].cSaldoImpago).toFixed(2) + '</td>' +
                                    '<td  hidden="True" style="text-align:center">' + fechaCobro + '</td>' +
                                    '<td  hidden="True" style="text-align:right">' + parseFloat(result[i].cImpCobrado).toFixed(2) + '</td>' +
                                    '<td>' + '<a class="tomadaP" id="abc" onClick="visualInfoCuotas();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                                    '</tr></tbody>';
                            }
                            $('#tablaConCuotas').html(cabecera + html);
                            $('#datosPrestamo').show();
                            $('#tituloTablaCuotas').show();

                        }

                    }
                });
            }
        }
    }
}

function refrescarDatos() {

    var contrato = $('#nroContrato').val();

    var params = {
        nroContrato: contrato
    };
    $.ajax({
        url: "/Prestamo/busquedaCuotasVisual",
        data: params,
        type: "Post",
        success: function (result) {
            var html = '';
            var cabecera = '<thead><tr><th hidden="True">Nro Contrato</th><th style="width: 60px">Nro Cta</th><th>Costo</th><th>Vencimiento</th><th>Estado</th><th  hidden="True"></th><th  hidden="True"></th><th  hidden="True"></th><th  hidden="True"></th><th  hidden="True"></th><th></th></tr><tr></thead>';
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var fecha1 = result[i].cVencCuota;
                    var codigo_fecha1 = parseInt(fecha1.replace("/Date(", "").replace(")/", ""));
                    fecha1 = new Date(codigo_fecha1).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                    var fecha2 = result[i].cFechaPago;
                    if (fecha2 != "/Date(-62135586000000)/") {
                        var codigo_fecha2 = parseInt(fecha2.replace("/Date(", "").replace(")/", ""));
                        var fechaCobro = new Date(codigo_fecha2).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                    }
                    else {
                        fechaCobro = " - ";
                    }

                    html += '<tbody><td hidden="True">' + result[i].cPrestId + '</td>' +
                        '<td style="text-align:center">' + result[i].cNroCuota + '</td>' +
                        '<td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].cImpCuota).toFixed(2)) + '</td>' +
                        '<td style="text-align:center">' + fecha1 + '</td>' +
                        '<td style="text-align:center">' + result[i].cDesc + '</td>' +
                        '<td  hidden="True" style="text-align:center">' + parseFloat(result[i].cImpCapital).toFixed(2) + '</td>' +
                        '<td  hidden="True" style="text-align:right">' + parseFloat(result[i].cImpInteres).toFixed(2) + '</td>' +
                        '<td  hidden="True" style="text-align:right">' + parseFloat(result[i].cSaldoImpago).toFixed(2) + '</td>' +
                        '<td  hidden="True" style="text-align:center">' + fechaCobro + '</td>' +
                        '<td  hidden="True" style="text-align:right">' + parseFloat(result[i].cImpCobrado).toFixed(2) + '</td>' +
                        '<td>' + '<a class="tomadaP" id="abc" onClick="visualInfoCuotas();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                        '</tr></tbody>';
                }
                $('#tablaConCuotas').html(cabecera + html);
                $('#datosPrestamo').show();
                $('#tituloTablaCuotas').show();
                refrescarDatosCreditos();
            }

        }
    });


}

function refrescarDatosCreditos() {


    var params = {
        sitio: $('#clidOC').val()
    };
    $.ajax({
        url: "/Prestamo/BusquedaPrestamosActivos",
        data: params,
        type: "Post",
        success: function (result) {

            var html = '';
            var cabecera = '<thead><tr><th></th><th style="width:90px;">Nro Contrato</th><th>Estado</th><th>Fecha de Concesión</th><th>Plan</th><th>Capital Inicial</th><th>Capital Financiado</th><th>Saldo Cobrado</th><th></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th></tr><tr></thead>';
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var fecha = result[i].dpFecha;
                    var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                    fecha = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                    var fechaOr = result[0].dpFecha;
                    var codigo_fecha1 = parseInt(fechaOr.replace("/Date(", "").replace(")/", ""));
                    fechaOr = new Date(codigo_fecha1).toLocaleDateString("es-AR");

                    var estado = result[i].dpEstadoPrestamo;
                    var icono;
                    if ($.trim(estado) == 613) {
                        icono = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style="color:green" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d = "m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" /></svg>'
                    }
                    else if ($.trim(estado) == 682) {
                        icono = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style="color:red" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d = "m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" /></svg>'


                    }
                    else if ($.trim(estado) == 667) {
                        icono = '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" style = "color:red" class="bi bi-caret-right-fill" viewBox = "0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'

                    }
                    //else if ($.trim(estado) == "Refinanciado") {
                    //    icono = '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" style = "color:chartreuse" class="bi bi-caret-right-fill" viewBox = "0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'
                    //}

                    var solicitado = result[i].dpMontoSolicitado;
                    var valor2 = solicitado.indexOf(",");
                    if (valor2 > 0) {
                        var punto2 = solicitado.indexOf(".");
                        if (punto2 > 0) {
                            solicitado = solicitado;
                        }
                        else {
                            solicitado = formateoPuntos(solicitado);
                        }

                    }
                    else {
                        solicitado = formateoPuntosyComas(solicitado);
                    }

                    var financiado = result[i].dpCapitalFinanciado;
                    var valor = financiado.indexOf(",");
                    if (valor > 0) {
                        var punto = financiado.indexOf(".");
                        if (punto > 0) {
                            financiado = financiado;
                        }
                        else {
                            financiado = formateoPuntos(financiado);
                        }

                    }
                    else {
                        financiado = formateoPuntosyComas(parseFloat(financiado).toFixed(2));
                    }

                    var cobrado = result[i].pImporteCobrado;
                    var valor1 = cobrado.indexOf(",");
                    if (valor1 > 0) {
                        var punto1 = cobrado.indexOf(".");
                        if (punto1 > 0) {
                            cobrado = cobrado;
                        }
                        else {
                            cobrado = formateoPuntos(cobrado);
                        }

                    }
                    else {
                        cobrado = formateoPuntosyComas(parseFloat(cobrado).toFixed(2));
                    }

                    html += '<tbody><td>' + icono + '</td>' +
                        '<td style="text-align:center">' + result[i].dpNroContrato + '</td>' +
                        '<td style="text-align:center">' + result[i].dpEstado + '</td>' +
                        '<td style="text-align:center">' + fecha + '</td>' +
                        '<td style="text-align:center">' + result[i].dpPlan + '</td>' +
                        '<td style="text-align:right"> $ ' + solicitado + '</td>' +
                        '<td style="text-align:right"> $ ' + financiado + '</td>' +
                        '<td style="text-align:right"> $ ' + cobrado + '</td>' +
                        '<td hidden="true">' + result[i].dpPorcej + '</td>' +
                        '<td hidden="true">' + result[i].dpIntervaloCobro + '</td>' +
                        '<td hidden="true">' + result[i].dpCuotasCobradas + '</td>' +
                        '<td hidden="true">' + result[i].dpNombreMoto + '</td>' +
                        '<td hidden="true">' + result[i].dpMarcaMoto + '</td>' +
                        '<td hidden="true">' + result[i].dpNota + '</td>' +
                        '<td>' + '<a class="tomadaP" id="abc" onClick="visualCuotas();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                        '</tr></tbody>';


                    $('#prestamoId').val(result[0].dpNroContrato);
                }
                $('#tablaConPrestamos').html(cabecera + html);
                $('#tituloTablaPrestamos').show();
                $('#sinResultado').html('');

            }
            else {
                var html = '<h4>No se encontraron préstamos activos</h4>';
                $('#sinResultado').html(html);
                $('#tablaConPrestamos').html('');
            }
        }
    });




    bloquearCampos();
    limpiarCampos();
}

function visualInfoCuotas() {


    var a = document.querySelectorAll(".tomadaP");
    var hoy = new Date();
    hoy = hoy.toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    hoy = hoy.split('/').reverse().join('-');
    var nroContra;
    var nroCta;
    var resta = 0;
    for (var b in a) { 
        var c = a[b];
        if (typeof c == "object") { 
            c.onclick = function () { 
                var td = this.offsetParent; 
                var tr = td.parentElement; 
                nroCta = tr.children[1];
                fVenc = tr.children[3];
                fCobro = tr.children[8];
                saldo = tr.children[7];
                saldoPagado = tr.children[9];
                nroContra = tr.children[0];
                impCuota = tr.children[2];
                estado = tr.children[4];
                capitalXcta = tr.children[5];
                interesXcta = tr.children[6];
                var valorCuota = impCuota.textContent;
                var separador = " ";
                var valorLimpio = valorCuota.split(separador);
                var valorReal = valorLimpio[2];
                //$('.tomadaP').attr('disabled', false);
                $('#importeCuota').val(valorReal);
                $('#capXcta').val(capitalXcta.textContent);
                $('#intXcta').val(interesXcta.textContent);

                var contrato = nroContra.textContent;
                var cuota = nroCta.textContent;

                $('#nroCta').val(nroCta.textContent);
                if (fCobro.textContent != "-") {
                    fechaCobrazo = fCobro.textContent;
                    fechaCobrazo = fechaCobrazo.split('/').reverse().join('-');
                    $('#txtFechaCobro').val(fechaCobrazo);
                }
                $('#aCobrar').val(' $ ' + saldo.textContent);
                var fechaVen = new Date();
                fechaVen = fVenc.textContent;
                fechaVen = fechaVen.split('/').reverse().join('-');
                //fechaven = fechaVen.toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                $('#txtFechaVenc').val(fechaVen);
                var fecha2 = moment(fechaVen);
                var fecha1 = moment(hoy);
                resta = fecha1.diff(fecha2, 'days');
                if (resta > 0) {
                    $('#diasMora').val(resta);
                }
                else {
                    $('#diasMora').val(0);
                }
                $('#impago').val(' $ ' + formateoPuntosyComas(saldo.textContent));
                $('#pagado').val(' $ ' + formateoPuntosyComas(saldoPagado.textContent));

                ///bloqueo campo de generación de mora
                //var diasEnMora = 0;
                var diasEnMora = $('#diasMora').val();
                if (diasEnMora == 0) {
                    $('#porcMora').attr('disabled', true);
                }
                else {
                    $('#porcMora').attr('disabled', false);
                }


                var par =
                {
                    nrContrato: contrato,
                    nroCuota: cuota
                };

                $.ajax({
                    url: "/Cuota/obtenerInfoCuota",
                    data: par,
                    type: "Post",
                    success: function (result) {
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {

                                var formP = result[0].ccFP;
                                $("#txtObservación").val(result[0].ccObserv);
                                $("#porcMora").val(result[0].ccIntMora);
                                $('#nroRecibo').val(result[0].ccNroRecibo);
                                $('#estado').val(result[0].ccEstado);
                            }
                        }

                        var pare =
                        {
                            nrContrato1: contrato,
                            nroCuota1: cuota
                        };

                        $.ajax({
                            url: "/Cuota/obtenerInfoCuota",
                            data: pare,
                            type: "Post",
                            success: function (result) {
                                if (result.length > 0) {
                                    for (var i = 0; i < result.length; i++) {
                                        $('#txtIdCuota').val(result[0].cpCuoId);
                                    }
                                }

                            }
                        });
                    }
                });
                if ($.trim(estado.textContent) === "Pendiente") {
                    desbloquearCampos();
                    $('#btnPagoCuota').attr('disabled', false);
                    $('#btnImprimirRecibo').attr('disabled', true);
                    fechaHoy();

                }
                else {
                    bloquearCampos();
                    $('#btnPagoCuota').attr('disabled', true);
                    $('#btnImprimirRecibo').attr('disabled', false);
                }

            }
        }
    }
}
function IncrementoXmora() {
    var numero = $('#porcMora').val();
    var cuoId = $('#txtIdCuota').val();
     //monto ="";
    var monto = $('#impago').val();
    var separar = ' ';
    var total = monto.split(separar);
    var totalF = total[2];

    var saldoImpago = totalF;
    saldoImpago = saldoImpago.replace(".", "");
    saldoImpago = saldoImpago.replace(".", "");
    saldoImpago = saldoImpago.replace(",", ".");
    var motnoPagar = $('#aCobrar').val();
    var uno = $('#rbtAdelanto').prop('checked');
    var dos = $('#rbtSaldo').prop('checked');
    if (cuoId != "") {
        if (dos == true) {
            if (motnoPagar != "") {
                if (numero > 0) {
                    porcentaje = ((parseInt(numero) / 100) + 1);
                    monto = parseFloat(saldoImpago);
                    montoNuevo = monto * porcentaje;

                    $('#aCobrar').val(" $ " + parseFloat(montoNuevo).toFixed(2));
                }
                else {
                    Swal.fire('El porcentaje a calcular debe ser mayor a cero.');
                    var saldo = $('#impago').val();
                    saldo = saldo.replace(".", "");
                    saldo = saldo.replace(".", "");
                    saldo = saldo.replace(".", "");
                    saldo = saldo.replace(",", ".");
                    $('#aCobrar').val(saldo);
                    return false;
                }
            }
            else {
                Swal.fire('No ha definido un monto a cobrar.');
                return false;
            }
        }
        else {
            Swal.fire('El calculo de porcentaje por Mora solo se habilita para pago Completo');
            return false;
        }


    }
    else {
        Swal.fire('No ha seleccionado ninguna cuota');
        var numero = $('#porcMora').val("");
        return false;
    }

}

function habilitaciones() {
    rbtSaltoTotal = $('#rbtSaldo').prop('checked');

    if (rbtSaltoTotal == true) {
        var saldo = $('#impago').val();
        $('#aCobrar').attr('disabled', true);
        saldo = saldo.replace(".", "");
        saldo = saldo.replace(".", "");
        saldo = saldo.replace(".", "");
        saldo = saldo.replace(",", ".");
        $('#aCobrar').val(saldo);
    }
    else {
        $('#aCobrar').attr('disabled', false);
        $('#aCobrar').val(0);
    }
}

function cargarCombo1() {
    var pasar = {
        parametro: 1
    };

    $.ajax({
        url: "/Cuota/CuotCargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#FP")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#FP").append(option);
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
        url: "/Cuota/CuotCargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#TD")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#TD").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
function cargarCombo3() {
    var pasar = {
        parametro: 3
    };

    $.ajax({
        url: "/Cuota/CuotCargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#TC")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#TC").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
function cargarCombo4() {
    var pasar = {
        parametro: 4
    };

    $.ajax({
        url: "/Cuota/CuotCargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#B")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#B").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
var nroRecibo;
var saldoImpago;
var estado;

function cargarData() {
    //obtener saldo anterior
    var saldoAdeudadoAnterior = $('#impago').val();
    //sacar el signo a la deuda anterior
    var cadena = saldoAdeudadoAnterior;
    var separar = " ";
    var cadenaSeparada = cadena.split(separar);
    saldoAdeudadoAnterior = cadenaSeparada[2];

    //obtenecion de monto a cobrar
    var montoPagado = $('#aCobrar').val();
    //verificar si hay signo peso
    var cant = montoPagado.indexOf('$');
    if (cant > 0) {
        //sacar el signo peso
        var texto = montoPagado;
        var separador = " ";
        var textoSeparado = texto.split(separador);
        montoPagado = textoSeparado[2];

    }
    else {
        montoPagado = montoPagado;
    }

    //obtener el nuevo saldo impago y el estado

    var nuevoSaldoImpago = 0;
    nuevoSaldoImpago = parseFloat(saldoAdeudadoAnterior) - parseFloat(montoPagado);

    //obtener estado
    var descrpEstado;
    if (nuevoSaldoImpago > 0) {
        descrpEstado = "Saldo Pendiente";
    }
    else {
        descrpEstado = "Cuota Saldada"
    }

    ///obtenerRecibo


    var nroCta = $('#nroCta').val();
    var nroContrato = $('#prestamoId').val();
    var parametros = {
        cuota: nroCta,
        prestamo: nroContrato
    };

    $.ajax({
        url: "/Prestamo/nroRecibo",
        type: "get",
        data: parametros,
        success: function (result) {

            recibo = result;

        }
    });

}
var variable; 
function obtenerelReciboAdelanto() {

    var parametros = {
        cuota: $('#nroCta').val(),
        prestamo: $('#prestamoId').val()
    };

    $.ajax({
        url: '/Cuota/nroRecibo',
        type: 'POST',
        data: parametros,
        success: function (result) {
            //console.log(result);
            reciboNroF = result;
            $('#ultRecibo').val(reciboNroF);
            variable = true;
            if (variable == true) {
                imprimirReciboOld();
            }

        }

    });


    return variable;
    //imprimirRecibo();
};
function obtenerelRecibo() {

    var parametros = {
        cuota: $('#nroCta').val(),
        prestamo: $('#prestamoId').val()
    };

    $.ajax({
        url: '/Cuota/nroRecibo',
        type: 'POST',
        data: parametros,
        success: function (result) {
            //console.log(result);
            reciboNroF = result;
            $('#ultRecibo').val(reciboNroF);
            variable = true;
            if (variable == true) {
                imprimirRecibo();
            }

        }

    });


    return variable;
    //imprimirRecibo();
};


function imprimirRecibo() {

    //obtenerelRecibo();
    //obtener saldo anterior
    var saldoAdeudadoAnterior = $('#impago').val();
    //sacar el signo a la deuda anterior
    var cadena = saldoAdeudadoAnterior;
    var separar = " ";
    var cadenaSeparada = cadena.split(separar);
    saldoAdeudadoAnterior = cadenaSeparada[2];

    //obtenecion de monto a cobrar
    var montoPagado = $('#aCobrar').val();
    //verificar si hay signo peso
    var cant = montoPagado.indexOf('$');
    if (cant > 0) {
        //sacar el signo peso
        var texto = montoPagado;
        var separador = " ";
        var textoSeparado = texto.split(separador);
        montoPagado = textoSeparado[2];

    }

    //obtener el nuevo saldo impago y el estado

    var nuevoSaldoImpago = 0;
    nuevoSaldoImpago = parseFloat(saldoAdeudadoAnterior) - parseFloat(montoPagado);

    //obtener estado
    var descrpEstado = "";
    if (nuevoSaldoImpago > 0) {
        descrpEstado = "Saldo Pendiente";
    }
    else {
        descrpEstado = "Cuota Saldada"
    }

    ///obtenerRecibo
    
    var reciboNro = 0;
    reciboNro = $('#ultRecibo').val();




    //Datos
    var nombre = $('#txtDenominacion').val();
    var nroContrato = $('#prestamoId').val();
    var documento = $('#docu').val();
    var fechaConce = $('#txtFechaCobro').val();
    var nroCta = $('#nroCta').val();
    var doc = new jsPDF();
    var montoCobrado = $('#aCobrar').val();
    var cant = montoCobrado.indexOf("$")
    if (cant > 0) {
        var texto = montoCobrado;
        separador = " ";
        textoSeparado = texto.split(separador);
        montoCobrado = textoSeparado[2];
    }

    var nroCta = $('#nroCta').val();
    var nroContrato = $('#prestamoId').val();



    //rectangulo
    doc.setLineWidth(0.7);
    doc.rect(40, 20, 110, 110);

    //body

    //header
    doc.setFontSize(20);
    doc.text('<<motPres>>', 95, 28);
    ///fecha
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    /// fin fecha
    doc.setFontSize(12);
    doc.text(output, 45, 27)
    doc.setFontSize(20);
    doc.text('Comprobante de Pago', 60, 40);
    ///subrrayado
    doc.setLineWidth(0.3);
    doc.line(60, 43, 130, 43);
    doc.setLineWidth(0.7);
    doc.line(60, 45, 130, 45);
    ///fin subrrayado
    //finheader
    //informacion
    doc.setFontSize(12);
    doc.text("Nombre: " + nombre + "", 50, 55);
    doc.text("Nro Contrato: " + nroContrato + "", 50, 60);
    doc.text("Concepto: CUOTA", 50, 65);
    doc.text("Documento: " + documento + "", 50, 70);
    doc.text("Fecha de Cobro: " + fechaConce + "", 50, 75);
    doc.text("Nro Cuota: " + nroCta + "", 50, 80);
    //doc.text("Saldo Impago Cuota: $ " + parseFloat(nuevoSaldoImpago).toFixed(2) + "", 50, 85);
    doc.text("Estado Cuota: " + descrpEstado + "", 50, 85);
    doc.text("Recibo: " + reciboNro + "", 50, 90);
    doc.setLineWidth(0.3);
    doc.line(50, 95, 130, 95);
    doc.text("Monto Pagado: $" + parseFloat(montoCobrado).toFixed(2) + "", 60, 100);
    doc.setLineWidth(0.3);
    doc.line(50, 111, 130, 111);
    doc.setLineWidth(0.3);
    doc.line(50, 113, 130, 113);
    doc.text("Firma ", 70, 120);
    // fin info

    //segundo rectangulo

    doc.setLineWidth(0.7);
    doc.rect(40, 140, 110, 120);

    //body

    //header
    doc.setFontSize(20);
    doc.text('<<motPres>>', 95, 150);
    ///fecha
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    /// fin fecha
    doc.setFontSize(12);
    doc.text(output, 45, 149)
    doc.setFontSize(20);
    doc.text('Comprobante de Pago', 60, 160);
    ///subrrayado
    doc.setLineWidth(0.3);
    doc.line(60, 165, 130, 165);
    doc.setLineWidth(0.7);
    doc.line(60, 167, 130, 167);
    ///fin subrrayado
    //finheader
    //informacion
    doc.setFontSize(12);
    doc.text("Nombre: " + nombre + "", 50, 180);
    doc.text("Nro Contrato: " + nroContrato + "", 50, 185);
    doc.text("Concepto: CUOTA", 50, 190);
    doc.text("Documento: " + documento + "", 50, 195);
    doc.text("Fecha de cobro: " + fechaConce + "", 50, 200);
    doc.text("Nro Cuota: " + nroCta + "", 50, 205);
    //doc.text("Saldo Impago: $ " + parseFloat(nuevoSaldoImpago).toFixed(2) + "", 50, 210);
    doc.text("Estado Cuota: " + descrpEstado + "", 50, 210);
    doc.text("Recibo: " + reciboNro + "", 50, 215);
    doc.setLineWidth(0.3);
    doc.line(50, 220, 130, 220);
    doc.text("Monto Pagado: $" + parseFloat(montoCobrado).toFixed(2) + "", 60, 227);
    doc.setLineWidth(0.3);
    doc.line(50, 237, 130, 237);
    doc.setLineWidth(0.3);
    doc.line(50, 239, 130, 239);
    doc.text("Firma ", 70, 245);
    // fin info

    //guardar
    doc.save('Comprobante' + output + '.pdf');

    refrescarDatos();
    
    //window.location = "/Cuota/CuoAdmi";
};
function imprimirReciboOld() {
    //Datos
    var nombre = $('#txtDenominacion').val();
    var nroContrato = $('#prestamoId').val();
    var documento = $('#docu').val();
    var fechaConce = $('#txtFechaCobro').val();
    var nroCta = $('#nroCta').val();
    var doc = new jsPDF();
    var montoCobrado = $('#aCobrar').val();
    var saldoImpago = $('#impago').val();
    var recibo = $('#ultRecibo').val();
    var nroCta = $('#nroCta').val();
    var nroContrato = $('#prestamoId').val();
    var estado = "Saldo Pendiente";


    //obtener saldo anterior
    var saldoAdeudadoAnterior = $('#impago').val();
    //sacar el signo a la deuda anterior
    var cadena = saldoAdeudadoAnterior;
    var separar = " ";
    var cadenaSeparada = cadena.split(separar);
    saldoAdeudadoAnterior = cadenaSeparada[2];
    saldoAdeudadoAnterior = saldoAdeudadoAnterior.replace(".", "");
    saldoAdeudadoAnterior = saldoAdeudadoAnterior.replace(",", ".");

    //obtenecion de monto a cobrar
    var montoPagado = $('#aCobrar').val();
    //verificar si hay signo peso
    var cant = montoPagado.indexOf('$');
    if (cant > 0) {
        //sacar el signo peso
        var texto = montoPagado;
        var separador = " ";
        var textoSeparado = texto.split(separador);
        montoPagado = textoSeparado[2];

    }
    else {
        montoPagado = montoPagado;
    }

    //obtener el nuevo saldo impago y el estado

    var nuevoSaldoImpago = 0;
    nuevoSaldoImpago = parseFloat(saldoAdeudadoAnterior) - parseFloat(montoPagado);

    //if ($.trim(estado) === "643") {
    //    estado = "Cuota Saldada";
    //}
    //else if ($.trim(estado) === "643") {
    //    estado = "Saldo Pendiente";
    //}


    //rectangulo
    doc.setLineWidth(0.7);
    doc.rect(40, 20, 110, 110);

    //body

    //header
    doc.setFontSize(20);
    doc.text('<<motPres>>', 95, 28);
    ///fecha
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    /// fin fecha
    doc.setFontSize(12);
    doc.text(output, 45, 27)
    doc.setFontSize(20);
    doc.text('Comprobante de Pago', 60, 40);
    ///subrrayado
    doc.setLineWidth(0.3);
    doc.line(60, 43, 130, 43);
    doc.setLineWidth(0.7);
    doc.line(60, 45, 130, 45);
    ///fin subrrayado
    //finheader
    //informacion
    doc.setFontSize(12);
    doc.text("Nombre: " + nombre + "", 50, 55);
    doc.text("Nro Contrato: " + nroContrato + "", 50, 60);
    doc.text("Concepto: CUOTA", 50, 65);
    doc.text("CUIT: " + documento + "", 50, 70);
    doc.text("Fecha de cobro: " + fechaConce + "", 50, 75);
    doc.text("Nro Cuota: " + nroCta + "", 50, 80);
    doc.text("Saldo Impago cuota: $ " + nuevoSaldoImpago + "", 50, 85);
    doc.text("Estado Cuota: " + estado + "", 50, 90);
    doc.text("Recibo: " + recibo + "", 50, 95);
    doc.setLineWidth(0.3);
    doc.line(50, 100, 130, 100);
    doc.text("Monto Pagado: $ " + montoCobrado + "", 60, 105);
    doc.setLineWidth(0.3);
    doc.line(50, 110, 130, 110);
    doc.setLineWidth(0.3);
    doc.line(50, 113, 130, 113);
    doc.text("Firma ", 70, 120);
    // fin info

    //segundo rectangulo

    doc.setLineWidth(0.7);
    doc.rect(40, 140, 110, 120);

    //body

    //header
    doc.setFontSize(20);
    doc.text('<<motPres>>', 95, 150);
    ///fecha
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    /// fin fecha
    doc.setFontSize(12);
    doc.text(output, 45, 149)
    doc.setFontSize(20);
    doc.text('Comprobante de Pago', 60, 160);
    ///subrrayado
    doc.setLineWidth(0.3);
    doc.line(60, 165, 130, 165);
    doc.setLineWidth(0.7);
    doc.line(60, 167, 130, 167);
    ///fin subrrayado
    //finheader
    //informacion
    doc.setFontSize(12);
    doc.text("Nombre: " + nombre + "", 50, 180);
    doc.text("Nro Contrato: " + nroContrato + "", 50, 185);
    doc.text("Concepto: CUOTA", 50, 190);
    doc.text("CUIT: " + documento + "", 50, 195);
    doc.text("Fecha concesión: " + fechaConce + "", 50, 200);
    doc.text("Nro Cuota: " + nroCta + "", 50, 205);
    doc.text("Saldo Impago cuota: $ " + nuevoSaldoImpago + "", 50, 210);
    doc.text("Estado Cuota: " + estado + "", 50, 215);
    doc.text("Recibo: " + recibo + "", 50, 220);
    doc.setLineWidth(0.3);
    doc.line(50, 225, 130, 225);
    doc.text("Monto Pagado: $ " + montoCobrado + "", 60, 232);
    doc.setLineWidth(0.3);
    doc.line(50, 237, 130, 237);
    doc.setLineWidth(0.3);
    doc.line(50, 239, 130, 239);
    doc.text("Firma ", 70, 245);
    // fin info

    //guardar
    doc.save('Comprobante' + output + '.pdf');
    //doc.Open();

    refrescarDatos();
}
function inprimirCuotaVieja() {
    //Datos
    var nombre = $('#txtDenominacion').val();
    var nroContrato = $('#prestamoId').val();
    var documento = $('#docu').val();
    var fechaConce = $('#txtFechaCobro').val();
    var nroCta = $('#nroCta').val();
    var doc = new jsPDF();
    var montoCobrado = $('#pagado').val();
    var saldoImpago = $('#impago').val();
    var recibo = $('#nroRecibo').val();
    var nroCta = $('#nroCta').val();
    var nroContrato = $('#prestamoId').val();
    var estado = "";



    if (parseFloat(saldoImpago) > parseFloat(montoCobrado)) {
        estado = "Saldo Pendiente";
    }
    else {
        estado = "Cuota Saldada";
    }


    //obtener saldo anterior
    var saldoAdeudadoAnterior = $('#impago').val();
    //sacar el signo a la deuda anterior
    var cadena = saldoAdeudadoAnterior;
    var separar = " ";
    var cadenaSeparada = cadena.split(separar);
    saldoAdeudadoAnterior = cadenaSeparada[2];

    //obtenecion de monto a cobrar
    var montoPagado = $('#aCobrar').val();
    //verificar si hay signo peso
    var cant = montoPagado.indexOf('$');
    if (cant > 0) {
        //sacar el signo peso
        var texto = montoPagado;
        var separador = " ";
        var textoSeparado = texto.split(separador);
        montoPagado = textoSeparado[2];

    }
    else {
        montoPagado = montoPagado;
    }

    //obtener el nuevo saldo impago y el estado

    var nuevoSaldoImpago = 0;
    nuevoSaldoImpago = parseFloat(saldoAdeudadoAnterior) - parseFloat(montoPagado);

    //if ($.trim(estado) === "643") {
    //    estado = "Cuota Saldada";
    //}
    //else if ($.trim(estado) === "643") {
    //    estado = "Saldo Pendiente";
    //}


    //rectangulo
    doc.setLineWidth(0.7);
    doc.rect(40, 20, 110, 110);

    //body

    //header
    doc.setFontSize(20);
    doc.text('<<motPres>>', 95, 28);
    ///fecha
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    /// fin fecha
    doc.setFontSize(12);
    doc.text(output, 45, 27)
    doc.setFontSize(20);
    doc.text('Comprobante de Pago', 60, 40);
    ///subrrayado
    doc.setLineWidth(0.3);
    doc.line(60, 43, 130, 43);
    doc.setLineWidth(0.7);
    doc.line(60, 45, 130, 45);
    ///fin subrrayado
    //finheader
    //informacion
    doc.setFontSize(12);
    doc.text("Nombre: " + nombre + "", 50, 55);
    doc.text("Nro Contrato: " + nroContrato + "", 50, 60);
    doc.text("Concepto: CUOTA", 50, 65);
    doc.text("CUIT: " + documento + "", 50, 70);
    doc.text("Fecha de cobro: " + fechaConce + "", 50, 75);
    doc.text("Nro Cuota: " + nroCta + "", 50, 80);
    doc.text("Saldo Impago cuota: $ " + nuevoSaldoImpago + "", 50, 85);
    doc.text("Estado Cuota: " + estado + "", 50, 90);
    doc.text("Recibo: " + recibo + "", 50, 95);
    doc.setLineWidth(0.3);
    doc.line(50, 100, 130, 100);
    doc.text("Monto Pagado: " + montoCobrado + "", 60, 105);
    doc.setLineWidth(0.3);
    doc.line(50, 110, 130, 110);
    doc.setLineWidth(0.3);
    doc.line(50, 113, 130, 113);
    doc.text("Firma ", 70, 120);
    // fin info

    //segundo rectangulo

    doc.setLineWidth(0.7);
    doc.rect(40, 140, 110, 120);

    //body

    //header
    doc.setFontSize(20);
    doc.text('<<motPres>>', 95, 150);
    ///fecha
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    /// fin fecha
    doc.setFontSize(12);
    doc.text(output, 45, 149)
    doc.setFontSize(20);
    doc.text('Comprobante de Pago', 60, 160);
    ///subrrayado
    doc.setLineWidth(0.3);
    doc.line(60, 165, 130, 165);
    doc.setLineWidth(0.7);
    doc.line(60, 167, 130, 167);
    ///fin subrrayado
    //finheader
    //informacion
    doc.setFontSize(12);
    doc.text("Nombre: " + nombre + "", 50, 180);
    doc.text("Nro Contrato: " + nroContrato + "", 50, 185);
    doc.text("Concepto: CUOTA", 50, 190);
    doc.text("CUIT: " + documento + "", 50, 195);
    doc.text("Fecha concesión: " + fechaConce + "", 50, 200);
    doc.text("Nro Cuota: " + nroCta + "", 50, 205);
    doc.text("Saldo Impago cuota: $ " + nuevoSaldoImpago + "", 50, 210);
    doc.text("Estado Cuota: " + estado + "", 50, 215);
    doc.text("Recibo: " + recibo + "", 50, 220);
    doc.setLineWidth(0.3);
    doc.line(50, 225, 130, 225);
    doc.text("Monto Pagado: $ " + montoCobrado + "", 60, 232);
    doc.setLineWidth(0.3);
    doc.line(50, 237, 130, 237);
    doc.setLineWidth(0.3);
    doc.line(50, 239, 130, 239);
    doc.text("Firma ", 70, 245);
    // fin info

    //guardar
    doc.save('Comprobante' + output + '.pdf');
    //doc.Open();

    refrescarDatos();
}
function bloquearCampos() {
    $('#txtFechaCobro').attr('disabled', true);
    $('#rbtSaldo').attr('disabled', true);
    $('#rbtAdelanto').attr('disabled', true);
    $('#aCobrar').attr('disabled', true);
    $('#porcMora').attr('disabled', true);
    $('#txtObservación').attr('disabled', true);
    $('#btnPagoCuota').attr('disabled', true);
    $('#btnImprimirRecibo').attr('disabled', true);
    $('#btnCancel').attr('disabled', true);
}
function desbloquearCampos() {
    $('#txtFechaCobro').attr('disabled', false);
    $('#rbtSaldo').attr('disabled', false);
    $('#rbtAdelanto').attr('disabled', false);
    //$('#aCobrar').attr('disabled', false);
    //$('#porcMora').attr('disabled', false);
    $('#txtObservación').attr('disabled', false);
    //$('#btnPagoCuota').attr('disabled', true);
    //$('#btnImprimirRecibo').attr('disabled', true);
    $('#btnCancel').attr('disabled', false);
}
function cerrarVtana() {
    window.location = "/Cuota/CuoAdmi";
}

var validado;
function validarCampos() {
    var uno = $('#rbtAdelanto').prop('checked');
    var dos = $('#rbtSaldo').prop('checked');
    var fechaC = $('#txtFechaCobro').val();
    var montoApagar = $('#aCobrar').val();
    if (uno == false && dos == false) {
        Swal.fire({ title:'Debe seleccionar la forma en que va a llevar a cabo el Pago', icon: 'warning'});
        validado = false;
        return false;
    }
    else {
        validado = true;
    }
    if ($.trim(fechaC) == "") {
        Swal.fire({ title:'Debe definir la fecha de Cobro de la cuota en cuestión.', icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        validado = true;
    }
    if ($.trim(montoApagar) == "") {
        Swal.fire({ title:'Debe definir el monto a Cobrar.', icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        validado = true;

    }
    return true;
}


function fechaHoy() {
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    document.getElementById('txtFechaCobro').value = ano + "-" + mes + "-" + dia;
}

function limpiarCampos() {
    $('#txtFechaVenc').val('');
    $('#aCobrar').val('');
    $('#diasMora').val('');
    $('#porcMora').val('');
    $('#txtObservación').val('');
    $('#nroCta').val('');
    $('#impago').val('');
    $('#pagado').val('');
    $('#rbtSaldo').prop("checked", true);
    fechaHoy();
}

function lanzadera() {
    bloquearCampos();
}


window.onload = lanzadera();