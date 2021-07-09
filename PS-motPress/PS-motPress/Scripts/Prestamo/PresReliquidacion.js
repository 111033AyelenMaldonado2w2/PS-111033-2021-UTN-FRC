angular.module('menuAngular', [])
$(document).ready(function () {

    $('#modalCLiente').on('hidden.bs.modal', function () {
        var html = '';
        $('#Cargartabla').html(html);
        $('#palabra').val('');
    })

    $('#btnClose').click(function () {
        window.location = "/Prestamo/PresReliquidacion";
    })
    $("#masCap").on({
        "focus": function (event) {
            $(event.target).select();
        },
        "keyup": function (event) {
            $(event.target).val(function (index, value) {
                return value.replace(/\D/g, "")
                    .replace(/([0-9])([0-9]{2})$/, '$1,$2')
                    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
            });
        }

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

    $('#btnRecalcular').click(function () {
        var montoAntes = $('#deuda').val();
        var montoNuevo = $('#masCap').val();
        var montoSuma = 0;
        var montoSuma1 = 0;
        var interesTotal = 0;
        var PPlan = 0;
        montoAntes = montoAntes.split(' ');
        montoAntes = montoAntes[1];
        montoAntes = montoAntes.replace('.', '');
        montoAntes = montoAntes.replace('.', '');
        montoAntes = montoAntes.replace(',', '.');

        montoNuevo = montoNuevo.replace('.', '');
        montoNuevo = montoNuevo.replace(',', '.');


        montoSuma = parseFloat(montoAntes) + parseFloat(montoNuevo);
        montoSuma1 = parseFloat(montoAntes) + parseFloat(montoNuevo);
        $('#btnSubir').attr('disabled', true);

        if ($.trim(montoSuma1) == "NaN") {
            montoSuma1 = 0;
        }
        var formContainer = {
            pMontoSolicitado: montoSuma1,
            pMontoSolicitado1: montoSuma,
            pPlan: $('#plan').val(),
            pInteres: $('#tasa').val(),
            pDiaVencimiento: $('#diaV').val(),
            pTipoCobro: $('#tipoVenc').val(),
            pFechaPrimeraCuota: $('#primC').val(),
            pDeuda: $('#deuda').val()
        };
        if (validaCampos() === true) {
            $.ajax({
                url: "/Prestamo/generaciónTablaRefinan",
                data: formContainer,
                type: "Post",
                success: function (result) {

                    var html = '';
                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            var cap = result[i].capital;
                            var int = result[i].interes;
                            var total = parseFloat(cap) + parseFloat(int);
                            html += '<tbody><td style="width:15px">' + result[i].nroCuota + '</td>' +
                                '<td style="text-align:right"> $ ' + formateoPuntosyComas(result[i].capital) + '</td>' +
                                '<td style="text-align:right"> $ ' + formateoPuntosyComas(result[i].interes) + '</td>' +
                                '<td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(total).toFixed(2)) + '</td>' +
                                '<td style="text-align:center">' + result[i].fecha + '</td>' +
                                '</tr></tbody>';
                            interesTotal = parseFloat(result[1].interes) * parseInt(formContainer.pPlan);
                        }
                        var todo = '';
                        var superior = '<thead><tr><th style="width:100px; text-align:center">Nro Cuota</th><th> Capital</th><th>Interés</th><th>Importe Cuota</th><th>Fecha de Cobro</th></tr><tr></thead>';
                        todo = superior + html;
                        var sumaTotal = parseFloat(montoSuma) + parseFloat(interesTotal);
                        var ddd = $('#deuda').val();
                        var agrega = $('#masCap').val();
                        $('#tablaConPrestamo').html(todo);
                        $('tituloTablaPrestamos').show();
                   
                        $('#intNuevo').val('$ ' + interesTotal);
                        if (agrega == "") {
                            deu = $('#deuda').val();
                            $('#totNuevo').val(deu);
                            $('#aRefinan').val(deu);
                            $('#intNuevo').val('$ ' + formateoPuntosyComas(parseFloat(interesTotal).toFixed(2)));
                        
                        }
                        else if ($.trim(agrega) === "0")
                        {
                            deu = $('#deuda').val();
                            $('#totNuevo').val(deu);
                            $('#aRefinan').val(deu);
                            $('#intNuevo').val('$ ' + formateoPuntosyComas(parseFloat(interesTotal).toFixed(2)));

                        }
                        else {
                            $('#totNuevo').val('$ ' + formateoPuntosyComas(parseFloat(montoSuma).toFixed(2)));
                            $('#aRefinan').val('$ ' + formateoPuntosyComas(parseFloat(montoSuma).toFixed(2)));
                            $('#intNuevo').val('$ ' + formateoPuntosyComas(parseFloat(interesTotal).toFixed(2)));
                        }
                        $('#tituloNvoTabla').show();
                        $('#infoRefinanciado').show();
                        $('#datosPrestamo').show();

                    }
                    else {


                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Error...');
                }
            });
            $('#tituloNvoTabla').show();
            $('#nuevoPres').show();
            $('#botones').show();
        }

    });


    $('#btnConfirmacion').unbind("click").bind("click", function () {

        var monto = $('#aRefinan').val();
        var separar = ' ';
        var total = monto.split(separar);
        var totalF = total[1];
        var senia = $('#entregaA').val();
        var separar = ' ';
        var total1 = senia.split(separar);
        var SeniaFinal = total1[1];
        //SeniaFinal.replace('.', ',');



        var refinanciacionPrestamo = {
            rCliId: $('#idCli').val(),
            rPresIdAnterior: $('#nroContrato').val(),
            rMontoDeuda: $('#deuda').val(),
            rMontoAgregado: $('#masCap').val(),
            rMontoDeuda1: $('#deuda').val(),
            rMontoAgregado1: $('#masCap').val(),
            rCantCuotas: $('#plan').val(),
            rPresTasa: $('#tasa').val(),
            rFecha: $('#entrega').val(),
            rFechaPrimCuota: $('#primC').val(),
            rDiaVencMes: $('#diaV').val(),
            rIntervaloCobranza: $('#tipoVenc').val(),
            rFechaContrato: $('#fechaOrigen').val(),
            rMontoFinal: totalF,
            rMontoFinal1: totalF,
            rNroContrato: $('#nroContrato').val(),
            rCodProd: $('#codigoProducto').val(),
            rEntrega: SeniaFinal,
            rNota: $('#notaA').val()
        }
        if (validaCampos() == true) {


            $('#btnConfirmacion').css({ 'display': 'none' });
            $('#btnClose').css({ 'display': 'none' });
            $('#msjCarga').css({ 'display': '' });

            $.ajax({
                url: "/Prestamo/ReqliquidacionFinal",
                data: refinanciacionPrestamo,
                type: "Post",
                success: function (result) {
                    $('#btnConfirmacion').css({ 'display': '' });
                    $('#btnClose').css({ 'display': '' });
                    $('#msjCarga').css({ 'display': 'none' });
                    var situacion = result;
                    if ($.trim(situacion) == "Exito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'La Reliquidación se completó correctamente!',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                imprimirContrato();
                                window.location = '/Prestamo/PresBusqueda';
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El proceso de reliquidación no se completó  !',
                        });
                    }
                }
            });
        }

    })



});
function borrar() {

    $('#tablaCuotas').hide();
    $('#infoPrestamoViejo').hide();
}

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

                $('#SinResultado').html('');
                $('#idCli').val(idCli.textContent);
                $('#txtDenominacion').val(columna2.textContent + ', ' + nom.textContent);

                borrar();

                var params = {
                    sitio: doc.textContent
                };
                $.ajax({
                    url: "/Prestamo/BusquedaPrestamos",
                    data: params,
                    type: "Post",
                    success: function (result) {

                        var html = '';
                        var cabecera = '<thead><tr><th></th><th>Nro Contrato</th><th>Estado</th><th>Fecha de Concesión</th><th style="width:90px">Plan de Cuotas</th><th>Capital</th><th>Capital Financiado</th><th>Saldo Cobrado</th><th></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th></tr><tr></thead>';
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


                                var loCobrado = result[i].pImporteCobrado;
                                if (loCobrado.indexOf(',')) {
                                    loCobrado = loCobrado;
                                }
                                else {
                                    loCobrado = formateoPuntosyComas(parseFloat(loCobrado).toFixed(2));
                                }
                                var capitalFinanciado = result[i].dpCapitalFinanciado;
                                if (capitalFinanciado.indexOf(',')=== true)
                                {
                                    capitalFinanciado = capitalFinanciado;
                                }
                                else
                                {
                                    capitalFinanciado = formateoPuntosyComas(parseFloat(capitalFinanciado).toFixed(2));
                                }
                                var solicitado = result[i].dpMontoSolicitado;
                                var valor = solicitado.indexOf(",");
                                if (valor > 0)
                                {
                                    solicitado = solicitado;
                                }
                                else
                                {
                                    solicitado = formateoPuntosyComas(solicitado);
                                }


                                html += '<tbody><td>' + icono + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpNroContrato + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpEstado + '</td>' +
                                    '<td style="text-align:center">' + fecha1 + '</td>' +
                                    '<td  style="text-align:center">' + result[i].dpPlan + '</td>' +
                                    '<td  style="text-align:right"> $ ' + solicitado + '</td>' +
                                    '<td  style="text-align:right"> $ ' + capitalFinanciado + '</td>' +
                                    '<td  style="text-align:right"> $ ' + loCobrado + '</td>' +
                                    '<td hidden="true">' + result[i].dpPorcej + '</td>' +
                                    '<td hidden="true">' + result[i].dpIntervaloCobro + '</td>' +
                                    '<td hidden="true">' + result[i].dpCuotasCobradas + '</td>' +
                                    '<td hidden="true">' + result[i].pIDproducto + '</td>' +
                                    '<td hidden="true">' + result[i].dpNota + '</td>' +
                                    '<td hidden="true">' + result[i].dpEntrega + '</td>' +
                                    '<td>' + '<a class="tomadaP" id="abc" onClick="tablaCuotasAdeudadas();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                                    '</tr></tbody>';


                            }
                            $('#tablaConPrestamos').html(cabecera + html);
                            $('#tituloTablaPrestamos').show();


                        }
                        else {
                            var html1 = '<h4>' + "El cliente seleccionado no posee Créditos Activos" + '</h4>';
                            $('#SinResultado').html(html1);
                        }

                    }
                });

                //$('#txtTel').val(tel.textContent);
                $('#docu').val(doc.textContent);
                $('#idCli').val(idCli.textContent);
                $('#txtDenominacion').val(columna2.textContent + ", " + nom.textContent);
                $('#tablaCuotasAdeudadas').html('');
                $('#noHayCuotas').html('');

                $('#modalCLiente').modal('hide');

            }
        }
    }

}
function tablaCuotasAdeudadas() {


    var columna2;
    var nom;
    var doc;
    var tel;
    var nroPrestamo;
    var idCli;
    var montoDeuda = 0;
    var fecha2;
    var a = document.querySelectorAll(".tomadaP");
    for (var b in a) { //Como nos devuelve un array iteramos
        var c = a[b];
        if (typeof c == "object") { //Solo buscamos los objetos
            c.onclick = function () { //Asignamos un evento onclick
                var td = this.offsetParent; //Localizamos el TD
                var tr = td.parentElement;  //LLegamos hasta el TR
                columna2 = tr.children[1];
                estado = tr.children[2];
                idpROD = tr.children[11];
                notaAnt = tr.children[12];
                entregaAnt = tr.children[13];
                laDeuda = tr.children[6];
                loQuePagaron = tr.children[7];
                //nom = tr.children[0];// Buscamos la Columna NOMBRE
                //doc = tr.children[2];
                //tel = tr.children[3];
                //idCli = tr.children[4];

                laDeuda = (laDeuda.textContent).split(" ");
                laDeuda = laDeuda[2];
                laDeuda = laDeuda.replace('.','');
                laDeuda = laDeuda.replace('.','');
                laDeuda = laDeuda.replace(',','.');

                loQuePagaron = (loQuePagaron.textContent).split(" ");
                loQuePagaron = loQuePagaron[2];
                loQuePagaron = loQuePagaron.replace('.', '');
                loQuePagaron = loQuePagaron.replace('.', '');
                loQuePagaron = loQuePagaron.replace(',', '.');


                var resta = laDeuda - loQuePagaron;

                $('#deuda').val('$ ' + formateoPuntosyComas(parseFloat(resta).toFixed(2)));

                $('#notaA').val(notaAnt.textContent);
                $('#entregaA').val('$ ' + parseFloat(entregaAnt.textContent).toFixed(2));
                $('#nroContrato').val(columna2.textContent);
                $('#codigoProducto').val(idpROD.textContent);
                if ($.trim(estado.textContent) == "Anulado" || $.trim(estado.textContent) == "Cancelado") {
                    $('#btnRecalcular').attr("disabled", true);
                    $('#masCap').attr("disabled", true);
                    $('#diaV').attr("disabled", true);
                    $('#primC').attr("disabled", true);
                    $('#sist').attr("disabled", true);
                    $('#tasa').attr("disabled", true);
                    $('#tipoVenc').attr("disabled", true);
                    $('#importeOrigen').attr("disabled", true);
                    $('#fechaOrigen').attr("disabled", true);
                    $('#deuda').attr("disabled", true);
                    $('#plan').attr("disabled", true);
                }
                else {
                    $('#btnRecalcular').attr("disabled", false);
                    $('#masCap').attr("disabled", false);
                    $('#diaV').attr("disabled", false);
                    $('#primC').attr("disabled", false);
                    $('#sist').attr("disabled", false);
                    $('#tasa').attr("disabled", false);
                    $('#tipoVenc').attr("disabled", false);
                    $('#plan').attr("disabled", false);
                }

                var contrato = columna2.textContent;
                var params = {
                    idCli: $('#idCli').val(),
                    nroContrato: contrato
                };
                $.ajax({
                    url: "/Prestamo/BusquedaCuotasDePrestamos",
                    data: params,
                    type: "Post",
                    success: function (result) {

                        var html = '';
                        var cabecera = '<thead><tr><th>Nro Cuota</th><th>Capital</th><th>Interés</th><th>Fecha Vencimiento</th><th>Importe Cuota</th><th>Saldo</th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                var fecha = result[i].dpCuoFechaVenc;
                                var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                                var fecha = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                var fecha1 = result[1].dpFecha;
                                var codigo_fecha1 = parseInt(fecha1.replace("/Date(", "").replace(")/", ""));
                                var fecha1 = new Date(codigo_fecha1).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                fecha2 = result[1].dpPrimeraCuota;
                                var codigo_fecha2 = parseInt(fecha2.replace("/Date(", "").replace(")/", ""));
                                fecha2 = new Date(codigo_fecha2).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                html += '<tbody><td style="text-align:center">' + result[i].dpNroCuota + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].dpCuoImpCap).toFixed(2)) + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].dpCuoImpInteres).toFixed(2)) + '</td>' +
                                    '<td style="text-align:center">' + fecha + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].dpImporCuota).toFixed(2)) + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].dpCuoSaldoImpago).toFixed(2)) + '</td>' +
                                    '</tr></tbody>';
                                //montoDeuda += result[i].dpImporCuota;
                                montoAnterior = result[1].dpMontoSolicitado
                                montoAnt = '$ ' + montoAnterior;
                                fecha1 = fecha1.split("/").reverse().join("-");
                                $("#primC").val(fecha1);
                                $('#fechaOrigen').val(fecha1);
                                $('#importeOrigen').val(montoAnt);
                                $('#plan').val(result[1].dpPlan);
                                $('#tipoVenc').val(result[1].dpIntervaloCobro);
                                $('#tasa').val(result[1].dpPorcej);
                                fecha2 = fecha2.split("/").reverse().join("-");
                                $("#primC").val(fecha2);
                                $('#diaV').val(result[1].dpDiaVencim);
                                cuotaTotal = result[1].dpImporCuota;
                            }
                            $('#tablaCuotasAdeudadas').html(cabecera + html);
                            $('#tablaCuotasFaltantesPrestamo').show();
                            //$('#deuda').val('$ ' + parseFloat(montoDeuda).toFixed(2));
                            $('#totalCuota').val(cuotaTotal);
                            $('#tablaCuotas').show();
                            $('#infoPrestamoViejo').show();
                            $('#noHayCuotas').html('');

                        }
                        else {
                            var html4 = '<h4>' + "El préstamo seleccionado tiene todas las cuotas saldadas" + '</h4>';
                            $('#noHayCuotas').html(html4);
                            $('#tablaCuotasAdeudadas').html('');
                        }



                    }
                });

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
function cargarCombo() {

    $.ajax({
        url: "/Prestamo/cargaCombos",
        type: "Post",
        success: function (result) {

            $("#tipoVenc")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#tipoVenc").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });

}


function imprimirContrato()
{

    var numeroALetras1 = (function () {

        function Unidades(num) {

            switch (num) {
                case 1: return 'UN';
                case 2: return 'DOS';
                case 3: return 'TRES';
                case 4: return 'CUATRO';
                case 5: return 'CINCO';
                case 6: return 'SEIS';
                case 7: return 'SIETE';
                case 8: return 'OCHO';
                case 9: return 'NUEVE';
            }

            return '';
        }//Unidades()

        function Decenas(num) {

            let decena = Math.floor(num / 10);
            let unidad = num - (decena * 10);

            switch (decena) {
                case 1:
                    switch (unidad) {
                        case 0: return 'DIEZ';
                        case 1: return 'ONCE';
                        case 2: return 'DOCE';
                        case 3: return 'TRECE';
                        case 4: return 'CATORCE';
                        case 5: return 'QUINCE';
                        default: return 'DIECI' + Unidades(unidad);
                    }
                case 2:
                    switch (unidad) {
                        case 0: return 'VEINTE';
                        default: return 'VEINTI' + Unidades(unidad);
                    }
                case 3: return DecenasY('TREINTA', unidad);
                case 4: return DecenasY('CUARENTA', unidad);
                case 5: return DecenasY('CINCUENTA', unidad);
                case 6: return DecenasY('SESENTA', unidad);
                case 7: return DecenasY('SETENTA', unidad);
                case 8: return DecenasY('OCHENTA', unidad);
                case 9: return DecenasY('NOVENTA', unidad);
                case 0: return Unidades(unidad);
            }
        }//Unidades()

        function DecenasY(strSin, numUnidades) {
            if (numUnidades > 0)
                return strSin + ' Y ' + Unidades(numUnidades)

            return strSin;
        }//DecenasY()

        function Centenas(num) {
            let centenas = Math.floor(num / 100);
            let decenas = num - (centenas * 100);

            switch (centenas) {
                case 1:
                    if (decenas > 0)
                        return 'CIENTO ' + Decenas(decenas);
                    return 'CIEN';
                case 2: return 'DOSCIENTOS ' + Decenas(decenas);
                case 3: return 'TRESCIENTOS ' + Decenas(decenas);
                case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
                case 5: return 'QUINIENTOS ' + Decenas(decenas);
                case 6: return 'SEISCIENTOS ' + Decenas(decenas);
                case 7: return 'SETECIENTOS ' + Decenas(decenas);
                case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
                case 9: return 'NOVECIENTOS ' + Decenas(decenas);
            }

            return Decenas(decenas);
        }//Centenas()

        function Seccion(num, divisor, strSingular, strPlural) {
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let letras = '';

            if (cientos > 0)
                if (cientos > 1)
                    letras = Centenas(cientos) + ' ' + strPlural;
                else
                    letras = strSingular;

            if (resto > 0)
                letras += '';

            return letras;
        }//Seccion()

        function Miles(num) {
            let divisor = 1000;
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
            let strCentenas = Centenas(resto);

            if (strMiles == '')
                return strCentenas;

            return strMiles + ' ' + strCentenas;
        }//Miles()

        function Millones(num) {
            let divisor = 1000000;
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
            let strMiles = Miles(resto);

            if (strMillones == '')
                return strMiles;

            return strMillones + ' ' + strMiles;
        }//Millones()
        return function NumeroALetras(num, currency) {
            currency = currency || {};
            let data = {
                numero: num,
                enteros: Math.floor(num),
                centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                letrasCentavos: '',
                letrasMonedaPlural: currency.plural || 'PESOS CHILENOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
                letrasMonedaSingular: currency.singular || 'PESO CHILENO', //'PESO', 'Dólar', 'Bolivar', 'etc'
                letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENOS',
                letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO'
            };

            if (data.centavos > 0) {
                data.letrasCentavos = 'CON ' + (function () {
                    if (data.centavos == 1)
                        return Millones(data.centavos);
                    else
                        return Millones(data.centavos);
                })();
            };

            if (data.enteros == 0)
                return 'CERO ';
            if (data.enteros == 1)
                return Millones(data.enteros);
            else
                return Millones(data.enteros);
        };

    })();
    var numeroALetras = (function () {

        function Unidades(num) {

            switch (num) {
                case 1: return 'UN';
                case 2: return 'DOS';
                case 3: return 'TRES';
                case 4: return 'CUATRO';
                case 5: return 'CINCO';
                case 6: return 'SEIS';
                case 7: return 'SIETE';
                case 8: return 'OCHO';
                case 9: return 'NUEVE';
            }

            return '';
        }//Unidades()

        function Decenas(num) {

            let decena = Math.floor(num / 10);
            let unidad = num - (decena * 10);

            switch (decena) {
                case 1:
                    switch (unidad) {
                        case 0: return 'DIEZ';
                        case 1: return 'ONCE';
                        case 2: return 'DOCE';
                        case 3: return 'TRECE';
                        case 4: return 'CATORCE';
                        case 5: return 'QUINCE';
                        default: return 'DIECI' + Unidades(unidad);
                    }
                case 2:
                    switch (unidad) {
                        case 0: return 'VEINTE';
                        default: return 'VEINTI' + Unidades(unidad);
                    }
                case 3: return DecenasY('TREINTA', unidad);
                case 4: return DecenasY('CUARENTA', unidad);
                case 5: return DecenasY('CINCUENTA', unidad);
                case 6: return DecenasY('SESENTA', unidad);
                case 7: return DecenasY('SETENTA', unidad);
                case 8: return DecenasY('OCHENTA', unidad);
                case 9: return DecenasY('NOVENTA', unidad);
                case 0: return Unidades(unidad);
            }
        }//Unidades()

        function DecenasY(strSin, numUnidades) {
            if (numUnidades > 0)
                return strSin + ' Y ' + Unidades(numUnidades)

            return strSin;
        }//DecenasY()

        function Centenas(num) {
            let centenas = Math.floor(num / 100);
            let decenas = num - (centenas * 100);

            switch (centenas) {
                case 1:
                    if (decenas > 0)
                        return 'CIENTO ' + Decenas(decenas);
                    return 'CIEN';
                case 2: return 'DOSCIENTOS ' + Decenas(decenas);
                case 3: return 'TRESCIENTOS ' + Decenas(decenas);
                case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
                case 5: return 'QUINIENTOS ' + Decenas(decenas);
                case 6: return 'SEISCIENTOS ' + Decenas(decenas);
                case 7: return 'SETECIENTOS ' + Decenas(decenas);
                case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
                case 9: return 'NOVECIENTOS ' + Decenas(decenas);
            }

            return Decenas(decenas);
        }//Centenas()

        function Seccion(num, divisor, strSingular, strPlural) {
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let letras = '';

            if (cientos > 0)
                if (cientos > 1)
                    letras = Centenas(cientos) + ' ' + strPlural;
                else
                    letras = strSingular;

            if (resto > 0)
                letras += '';

            return letras;
        }//Seccion()

        function Miles(num) {
            let divisor = 1000;
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
            let strCentenas = Centenas(resto);

            if (strMiles == '')
                return strCentenas;

            return strMiles + ' ' + strCentenas;
        }//Miles()

        function Millones(num) {
            let divisor = 1000000;
            let cientos = Math.floor(num / divisor)
            let resto = num - (cientos * divisor)

            let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
            let strMiles = Miles(resto);

            if (strMillones == '')
                return strMiles;

            return strMillones + ' ' + strMiles;
        }//Millones()

        return function NumeroALetras(num, currency) {
            currency = currency || {};
            let data = {
                numero: num,
                enteros: Math.floor(num),
                centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                letrasCentavos: '',
                letrasMonedaPlural: currency.plural || 'PESOS CHILENOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
                letrasMonedaSingular: currency.singular || 'PESO CHILENO', //'PESO', 'Dólar', 'Bolivar', 'etc'
                letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENOS',
                letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO'
            };

            if (data.centavos > 0) {
                data.letrasCentavos = 'CON ' + (function () {
                    if (data.centavos == 1)
                        return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                    else
                        return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
                })();
            };

            if (data.enteros == 0)
                return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
            if (data.enteros == 1)
                return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
            else
                return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        };

    })();




    var cliente = $('#txtDenominacion').val();
    //var calle1 = $('#calleCli').val();
    var montoSolicitadoOriginal = $('#totNuevo').val();
    var montoSolicitado = $('#totNuevo').val();
    montoSolicitado = montoSolicitado.replace(".", "");
    montoSolicitado = montoSolicitado.split(' ');
    montoSolicitado = montoSolicitado[1];
    montoSolicitado = montoSolicitado;
    montoSolicitado = montoSolicitado.replace(".", "");
    montoSolicitado = montoSolicitado.replace(".", "");
    montoSolicitado = montoSolicitado.replace(".", "");
    montoSolicitado = montoSolicitado.replace(",", ".");
    var Presfecha = $('#fechaOrigen').val();
    var PresfechaPrimera = $('#primC').val();
    var plan = $('#plan').val();
    var cuotaFinal = $('#totalCuota').val();

    var f = new Date(PresfechaPrimera);
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    PresfechaPrimera = (meses[f.getMonth()] + " de " + f.getFullYear());

    var planLetra = numeroALetras1(plan);

    var cuotaLetra = numeroALetras(cuotaFinal, {
        plural: 'PESOS',
        singular: 'PESO',
        centPlural: 'centavos',
        centSingular: 'centavo'
    });
    var montoLetra = numeroALetras(montoSolicitado, {
        plural: 'PESOS',
        singular: 'PESO',
        centPlural: 'centavos',
        centSingular: 'centavo'
    });



    var doc = new jsPDF();
    doc.setFontSize(30);
    //doc.text('MOTPRES', 70, 25);

    //doc.setLineWidth(1);
    //doc.line(30, 30, 180, 30);

    //doc.setLineWidth(1.5);
    //doc.line(30, 35, 180, 35);
    doc.setFontSize(20);
    doc.text("CONTRATO DE MUTUO", 70, 25);

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    output = new Date(output).toLocaleDateString("es-AR");
    doc.setFontSize(12);
    doc.text(output, 92, 35)
    var text = 'Entre el Sr. "FULANO" D.N.I N° 00.000.000, en adelante "EL MUTUARIO" con domicilio real en calle CALLE 2 B° UN BARRIO, de la Ciudad de Córdoba, y el Sr. ' + cliente + '___________________ en adelante "EL MUTUARIO", han convenido en celebrar el presente CONTRATO DE MUTUO, sujeto a las cláusulas que a continuación se detallan y a lo dispuesto por los Arts. 1525 correlativos y concordantes del Código Civil y Comercial de la Nación. - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - -.';
    doc.text(text, 27, 45, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var text1 = 'PRIMERA: "EL MUTANTE" cede en préstamo y hace entrega en este acto la suma de pesos ' + montoLetra + ' (' + montoSolicitadoOriginal + ') moneda Argentina a "El MUTUARIO" y éste acepta.';
    doc.text(text1, 27, 85, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var text2 = 'SEGUNDA: El término del presente CONTRATO DE MUTUO es el ' + Presfecha + ', y la forma de pago se pacta en el siguiente plazo: ' + planLetra + ' (' + plan + ') cuotas consecutivas y mensuales, pagaderas cada cuota del 1 al 10 de cada mes a partir del mes ' + PresfechaPrimera + ' inclusive, siendo cada cuota por el monto de pesos ' + cuotaLetra + ' ($' + cuotaFinal + '), con más los intereses pactados en el caso de mora o atraso.';
    doc.text(text2, 27, 100, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var text3 = 'TERCERA: La falta de pago de una(1) de las cuotas acordadas, encontrándose vencido el término del presente CONTRATO DE MUTUO, habilita "AL MUTUANTE" a realizar las gestiones de cobro extrajudiciales y judiciales correspondientes a fin de garantizar el pago de la totalidad del monto adeudado a la fecha.';
    doc.text(text3, 27, 130, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var text4 = 'CUARTA: Ambas partes acuerdan fijar un interés mensual por la mora del 2% mensual mas la tasa pasiva del banco central(TPBC) al momento de producirse la mora, sobre cada cuota adeudada. Dicho interés corre hasta el efectivo pago de la totalidad del monto adeudado por "EL MUTUARIO".';
    doc.text(text4, 27, 150, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var text5 = 'QUINTA: Si por cualquier causa "EL MUTUARIO" decidiera rescindir anticipadamente el presente contrato, deberá notificar con una antelación de Diez(10) días por medio fehaciente a "EL MUTUANTE" su determinación, entregando el dinero objeto del presente contrato con más los interes generados hasta la fecha.';
    doc.text(text5, 27, 170, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var text6 = 'SEXTA: Las partes constituyen domicilio a los efectos del presente contrato, "EL MUTUANTE" en el expresado supra y "EL MUTUARIO" en calle UNA CALLE B° UN BARRIO, de la Ciudad de Córdoba, todos los cuales subsistirán mientras no se notifiquen otros en forma fehaciente, sometiéndose todas las partes a la jurisdicción de los Tribunales Ordinarios de la Ciudad de Córdoba, renunciando expresamente al Fuero Federal o a cualquier otro de excepción que pudiere corresponderles, firmando en prueba de conformidad, dos ejemplares de un mismo tenor y a un solo efecto en la Ciudad de Córdoba.- - - - - - - - - - - - - - - - - - - -';
    doc.text(text6, 27, 190, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var firma = '----------------------                      -----------------------                   -------------------\nFIRMA                               ACLARACION                          DNI\nFULANO\nD.N.I N° 00.000.000';
    doc.text(firma, 27, 240);

    doc.save('ContratoMOTPRES' + output + '.pdf');


}

function validaCampos() {

    var monto = $('#monto').val();
    var cantCuotas = $('#plan').val();
    var tasa = $('#tasa').val();
    var prim = $('#primC').val();
    var di = $('#diaV').val();
    var VENC = $('#tipoVenc').val();
    validado = true;
    //validamos campos
    if ($.trim(cantCuotas) == "") {
        Swal.fire({ title: "No ha ingresado la cantidad de Cuotas del Plan", icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        if (parseFloat(cantCuotas) < 0) {
            Swal.fire({ title: 'La cantidad de cuotas debe ser superior a 0 (CERO)', icon: 'warning' });
            $('#cant').val('');
            validado = false;
            return false;
        }
    }
    if ($.trim(tasa) == "") {
        Swal.fire({ title: "No ha definido el Porcentaje de Interés a aplicar", icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        if (parseFloat(tasa) < 0) {
            Swal.fire({ title: 'El porcentaje de interés debe ser superior a 0 (CERO)', icon: 'warning' });
            $('#porce').val('');
            validado = false;
            return false;
        }
    }
    if ($.trim(prim) == "") {
        Swal.fire({ title: "No ha definido la fecha de pago de la primera Cuota", icon: 'warning' });
        validado = false;
        return false;
    }
    if ($.trim(di) == "") {
        Swal.fire({ title: "No ha definido el dia de Vencimiento de las cuotas", icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        if (parseFloat(di) < 0 || parseFloat(di) > 30) {
            Swal.fire({ title: "El día de vencimiento debe ser mayor a 0 (CERO) y menor a 30 (TREINTA)", icon: 'warning' });
            validado = false;
            return false;
        }
    }
    if ($.trim(VENC) == "") {
        Swal.fire({ title: "No ha definido el tipo de vencimiento", icon: 'warning' });
        validado = false;
        return false;
    }
    return validado;
}

function lanzadera() {
    cargarCombo()
}

window.onload = lanzadera();