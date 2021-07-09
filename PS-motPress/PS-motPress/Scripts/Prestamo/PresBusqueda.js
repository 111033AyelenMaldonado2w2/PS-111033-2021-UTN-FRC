angular.module('menuAngular', [])

$(document).ready(function () {
    $('#modalCLiente').on('hidden.bs.modal', function () {
        var html = '';
        $('#Cargartabla').html(html);
        $('#palabra').val('');
    })

    $('.btnSubir').click(function () {

        var uno = $('#txtEsDoc').prop('checked');
        var dos = $('#txtEsNombre').prop('checked');
        var tres = $('#txtEsContrato').prop('checked');
        var palabrita = $('#palabra').val();
        //$(".btnSubir").prop("disabled", true);
        if (palabrita !== "") {
            if (uno === false && dos === false && tres === false) {
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
                    Chbxs2: dos,
                    Chbxs3: tres,

                };
                var result = [];
                $.ajax({
                    url: "/Prestamo/PresBuscaCli",
                    data: params,
                    type: "Post",
                    success: function (result) {

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
                        $('#btnSubir').css({ 'display': '' });
                        $('#msjCarga3').css({ 'display': 'none' });

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
    $('.btnAccionFinalizar').click(function () {
        Swal.fire({
            title: 'Finalización de Préstamo',
            html: '<h4>Motivo de finalización</h4>',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                id: 'motivoAnula'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            showLoaderOnConfirm: true,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var motiv = $('#motivoAnula').val();
                var nroContrato = $('#nroContrato').val();
                var parametros = {
                    estadoP: 669,
                    motivo: motiv,
                    contrato: nroContrato
                };

                $.ajax({
                    url: '/Prestamo/anulaCancelPrestamo',
                    data: parametros,
                    type: "Post",
                    success: function (result) {
                        var resulta = result;
                        if ($.trim(resulta) == "Exito") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Exito!',
                                text: 'Cancelación Concluída!',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location = "/Prestamo/PresBusqueda";
                                }
                            });
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'El proceso no se completó!',
                            });
                        }
                    }
                });


            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        });
    });

    $('#btnAccionAnular').click(function () {
        Swal.fire({
            title: 'Anulación de Préstamo',
            html: '<h4>Motivo de Anulación</h4>',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                id: 'motivoAnula'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.isConfirmed) {
                var motiv = $('#motivoAnula').val();
                var nroContrato = $('#nroContrato').val();
                var parametros = {
                    estadoP: 668,
                    motivo: motiv,
                    contrato: nroContrato
                };

                $.ajax({
                    url: "/Prestamo/anulaCancelPrestamo",
                    data: parametros,
                    type: "Post",
                    success: function (result) {
                        var resulta = result;
                        if ($.trim(resulta) == "Exito") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Exito!',
                                text: 'Anulación Concluída!',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location = "/Prestamo/PresBusqueda";
                                }
                            });
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'El proceso no se completó!',
                            });
                        }
                    }
                });


            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        });
    });
});




//});

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

                $('.mostrar').hide();

                $('#calleCli').val(calle.textContent);

                var params = {
                    sitio: doc.textContent
                };
                $.ajax({
                    url: "/Prestamo/BusquedaPrestamos",
                    data: params,
                    type: "Post",
                    success: function (result) {

                        var html = '';
                        var cabecera = '<thead><tr><th></th><th style="width:90px;">Nro Contrato</th><th>Estado</th><th>Fecha de Concesión</th><th>Plan</th><th>Capital</th><th>Capital Financiado</th><th>Saldo Cobrado</th><th></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                var fecha = result[i].dpFecha;
                                var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                                var fecha1 = new Date(codigo_fecha).toLocaleDateString("es-AR");

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
                                var valor = solicitado.indexOf(",");
                                if (valor > 0) {
                                    solicitado = solicitado;
                                }
                                else {
                                    solicitado = formateoPuntosyComas(solicitado);
                                }

                                var financiado = result[i].dpCapitalFinanciado;
                                var valor1 = financiado.indexOf(",");
                                if (valor1 > 0) {
                                    financiado = financiado;
                                }
                                else {
                                    financiado = formateoPuntosyComas(parseFloat(financiado).toFixed(2));
                                }
                                var cobrado = result[i].pImporteCobrado;
                                var valor2 = cobrado.indexOf(",");
                                if (valor2 > 0) {
                                    cobrado = cobrado;
                                }
                                else {
                                    cobrado = formateoPuntosyComas(parseFloat(cobrado).toFixed(2));
                                }

                                html += '<tbody><td>' + icono + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpNroContrato + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpEstado + '</td>' +
                                    '<td style="text-align:center">' + fecha1 + '</td>' +
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
                                    '<td hidden="true">' + result[i].dpEntrega + '</td>' +
                                    '<td>' + '<a class="tomadaP" id="abc" onClick="visualCuotas();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                                    '</tr></tbody>';


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
                dineroEntregado = tr.children[14];
                $('.mostrar').show();
                $('#nroContrato').val(nroContrato.textContent);
                $('#impoPrestamo').val(capital.textContent);
                $('#cantCuotas').val(cantCuotas.textContent);
                $('#loCobrado').val(formateoPuntos(impCobrado.textContent));
                $('#porcTasa').val(tasa.textContent);
                $('#nombreMoto').val(nombM.textContent);
                $('#marcaMoto').val(marcM.textContent);
                $('#nota').val(nota.textContent);
                $('#seniaEntregada').val('$ ' + formateoPuntosyComas(parseFloat(dineroEntregado.textContent).toFixed(2)));
               
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


                var contador = 0;

                var params = {
                    nroContrato: nroContrato.textContent
                };
                $.ajax({
                    url: "/Prestamo/busquedaCuotasVisual",
                    data: params,
                    type: "Post",
                    success: function (result) {

                        var html = '';
                        var cabecera = '<thead><tr><th hidden="True">Nro Contrato</th><th>Nro Cta</th><th>Estado Cta</th><th>Capital</th><th>Interés</th><th>Vencimiento</th><th>Importe Cuota</th><th>Saldo</th><th>Fecha Cobro</th><th>Importe Cobrado</th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                
                                var fecha = result[i].cVencCuota;
                                var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                                var fechaVenc = new Date(codigo_fecha).toLocaleDateString("es-AR");
                                var fecha2 = result[i].cFechaPago;
                                if (fecha2 != "/Date(-62135586000000)/") {
                                    var codigo_fecha2 = parseInt(fecha2.replace("/Date(", "").replace(")/", ""));
                                    var fechaCobro = new Date(codigo_fecha2).toLocaleDateString("es-AR");
                                }
                                else {
                                    fechaCobro = " - ";
                                }


                                html += '<tbody><td hidden="True">' + result[i].cPrestId + '</td>' +
                                    '<td style="text-align:center">' + result[i].cNroCuota + '</td>' +
                                    '<td style="text-align:center">' + result[i].cDesc + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].cImpCapital).toFixed(2)) + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].cImpInteres).toFixed(2)) + '</td>' +
                                    '<td style="text-align:center">' + fechaVenc + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].cImpCuota).toFixed(2)) + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].cSaldoImpago).toFixed(2)) + '</td>' +
                                    '<td style="text-align:center">' + fechaCobro + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntos(result[i].cImpCobrado) + '</td>' +
                                    '</tr></tbody>';

                                if ($.trim(result[i].cDesc) == "Pendiente") {
                                    contador = contador + 1;
                                }
                            }
                            $('#tablaConCuotas').html(cabecera + html);
                            $('#datosPrestamo').show();
                            $('#tituloTablaCuotas').show();

                        }


                        //validar finalización del préstamo

                        if (contador == 0) {
                            $('#btnAccionFinalizar').attr("disabled", false);

                        }
                        else {
                            $('#btnAccionFinalizar').attr("disabled", true);

                        }
                       
                    }
                });
            }
        }
    }
}
