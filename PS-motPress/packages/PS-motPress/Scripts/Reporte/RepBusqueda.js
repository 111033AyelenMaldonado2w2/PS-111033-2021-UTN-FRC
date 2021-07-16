
var repSolicitado = '';
var cabecera = '';
$(document).ready(function () {

    $('#modalCLiente').on('hidden.bs.modal', function () {
        var html = '';
        $('#Cargartabla').html(html);
        $('#palabra').val('');
    })
    $('#exampleModalSimulacion').on('hidden.bs.modal', function () {
        var html = '';
        $('#CargartablaS').html(html);
        $('#palabraS').val('');
    })
    //$('#modalCLiente').on('hidden.bs.modal', function () {
    //    var html = '';
    //    $('#Cargartabla').html(html);
    //    $('#palabra').val('');
    //})

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

                        var html = '';
                        var cabecera = '<thead><tr><th> Nombre</th><th>Apellido</th><th>Documento</th><th hidden="true"></th><th hidden = "true"></th><th hidden = "true"></th><th></th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                html += '<tbody><td>' + result[i].cNombre + '</td>' +
                                    '<td>' + result[i].cApellido + '</td>' +
                                    '<td>' + result[i].cDocumento + '</td>' +
                                    '<td hidden="true">' + result[i].cTel + '</td>' +
                                    '<td hidden="true">' + result[i].cCliId + '</td>' +
                                    '<td hidden="true">' + result[i].cCUIT + '</td>' +
                                    '<td hidden="true">' + result[i].cEmail + '</td>' +
                                    '<td>' + '<a class="tomada" id="abc" onClick="tomarCliente2();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
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



    $('#btnBuscar').click(function () {
        var palabrita = $('#palabraS').val();

        if (palabrita !== "") {

            var params = {
                parametro: $('#palabraS').val(),
            };

            $.ajax({
                url: "/Reporte/listaSimulaciones",
                data: params,
                type: "Post",
                success: function (result) {
                    var html = '';
                    var cabecera = '<thead><tr><th>Nombre</th><th>Monto Solicitado</th><th>Plazo</th><th>Interés %</th><th>Cuota Pura</th><th>Interés calculado</th><th hidden="true"></th><th></th></tr><tr></thead>';
                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            html += '<tbody><td>' + result[i].rsNombCliente + '</td>' +
                                '<td> $ ' + parseFloat(result[i].rsMontoSolicitado).toFixed(2) + '</td>' +
                                '<td>' + result[i].rsPlazo + '</td>' +
                                '<td>' + result[i].rsPorcInt + '</td>' +
                                '<td> $ ' + parseFloat(result[i].rsCuotaPura).toFixed(2) + '</td>' +
                                '<td> $ ' + parseFloat(result[i].rsIntCalculado).toFixed(2) + '</td>' +
                                '<td hidden="true">' + result[i].rsProcesoId + '</td>' +
                                '<td>' + '<a class="tomada" id="abc" onClick="tomarSimulacion();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                                '</tr></tbody>';
                        }
                        $('#CargartablaS').html(cabecera + html);
                        $("#palabraS").val("");
                        $('#CargartablaS').show();
                    }
                    else {
                        $('#CargartablaS').show();
                        html = '<h4>' + "No se encontraron registros" + '</h4>';
                        $('#CargartablaS').html(html);
                        $("#palabra").val("");
                    }
                }

            });

        }
    });

    $('#pruebaImp').click(function () {
        var doc = new jsPDF('p', 'mm', 'a3', true);
        doc.setFontSize(30);
        //titulo
        doc.text('<<motPres>>', 30, 30);



        doc.setFontSize(30);
        doc.text('<<motPres>>', 30, 30);

        doc.setFontSize(20);
        doc.text(repSolicitado, 70, 45);
        //fecha
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
        output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
        doc.setFontSize(12);
        doc.text(output, 92, 50)

        var obj = {};

        var values = [];
        var key;
        var columns = [];
        var data = [];
        //para mostrar un table
        $("#tablaReporte thead th").each(function (i, o) {

            key = $(this).text();
            obj[key] = '';
        });

        $("#tablaReporte tbody td").each(function (i, o) {

            var value = $(this).text();
            values.push(value);
        });

        var iterator = 0;

        var array = [];
        /* Obtenemos todos los tr del Body*/
        var rowsBody = $("#tablaReporte").find('tbody > tr');
        /* Obtenemos todos los th del Thead */
        var rowsHead = $("#tablaReporte").find('thead > tr > th');

        /* Iteramos sobre as filas del tbody*/
        for (var i = 0; i < rowsBody.length; i++) {
            var objt = {};/* auxiliar*/
            for (var j = 0; j < rowsHead.length; j++) /*  Iteramos sobre los th de THead*/
                /*Asignamos como clave el text del th del thead*/
                /*Asignamos como Valor el text del tr del tbody*/
                objt[rowsHead[j].innerText] = rowsBody[i].getElementsByTagName('td')[j].innerText;
            array.push(objt);/* Añadimos al Array Principal*/
        }
        //Recorremos nuestro objeto
        for (var key in obj) {
            //Le asignamos el valor correspondiente
            obj[key] = values[iterator];
            columns.push(key);
            data.push(values[iterator]);
            iterator++;
        }
        var datos = [];
        var please = [];
        for (var i = 0; i < array.length; i++) {
            cantpresAct = $('#cantPrest').val();
            entreHasta = $('#cantTotalEntreg').val();
            ANIO = $('#añosPrestamos').val();

            doc.text("Cantidad de préstamos ACTIVOS a la fecha: " + cantpresAct, 20, 70);
            doc.text("Monto entregado a la fecha: " + entreHasta, 20, 75);
            doc.text("Año seleccionado: " + ANIO, 20, 80);

            please = [array[i].Nro_Contrato, array[i].Cliente, array[i].Monto, array[i].Plan, array[i].Interés, array[i].Fecha_Inicio, array[i].Cobro, array[i].Usuario, array[i].Estado];

            datos.push(please);
        }
        //incluir el table en el pdf
            doc.autoTable(columns, datos,
                {
                    margin: { left: 20, right: 20, top: 85, bottom: 35 },
                    didDrawPage: function (datos) {
                        datos.settings.margin.top = 20;
                    }
                }
            );


        doc.addPage();
        doc.setFontSize(20);
        //incluir graficos
        doc.text("Informes Gráficos", 20, 30);
        doc.setFontSize(16);
        doc.text("Cantidad de préstamos por mes", 20, 40);
        html2canvas($("#prestamosCantidad"), {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL(
                    'image/png');

                doc.addImage(imgData, 'PNG', 20, 45, 240, 180);
                doc.addPage();
                doc.setFontSize(20);
                doc.text("Informes Gráficos", 20, 30);
                doc.setFontSize(16);
                doc.text("Monto entregado por mes", 20, 40);
                html2canvas($("#prestamosEntrega"), {
                    onrendered: function (canvas) {
                        var imgData = canvas.toDataURL(
                            'image/png');
             
                        doc.addImage(imgData, 'PNG', 20, 45, 240, 180);
                        //numero de la pag
                        const pageCount = doc.internal.getNumberOfPages();
                        for (var i = 1; i <= pageCount; i++) {

            doc.setPage(i);
  
            doc.text('Page ' + String(i) + ' of ' + String(pageCount), 300 - 20, 400 - 30, null, null, "right");
        }
                        //descarga el pdf
        doc.save('Rpt' + repSolicitado + output + '.pdf');
                    }
                });
            }
        });

    });
    $('#pruebaImp1').click(function () {
        var doc = new jsPDF('p', 'mm', 'a3', true);
        doc.setFontSize(30);
        doc.text('<<motPres>>', 30, 30);



        doc.setFontSize(30);
        doc.text('<<motPres>>', 30, 30);

        doc.setFontSize(20);
        doc.text(repSolicitado, 70, 45);

        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
        output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
        doc.setFontSize(12);
        doc.text(output, 92, 50)

        var obj = {};

        var values = [];
        var key;
        var columns = [];
        var data = [];

        $("#tablaReporte thead th").each(function (i, o) {

            key = $(this).text();
            obj[key] = '';
        });

        $("#tablaReporte tbody td").each(function (i, o) {

            var value = $(this).text();
            values.push(value);
        });

        var iterator = 0;

        var array = [];
        /* Obtenemos todos los tr del Body*/
        var rowsBody = $("#tablaReporte").find('tbody > tr');
        /* Obtenemos todos los th del Thead */
        var rowsHead = $("#tablaReporte").find('thead > tr > th');

        /* Iteramos sobre as filas del tbody*/
        for (var i = 0; i < rowsBody.length; i++) {
            var objt = {};/* auxiliar*/
            for (var j = 0; j < rowsHead.length; j++) /*  Iteramos sobre los th de THead*/
                /*Asignamos como clave el text del th del thead*/
                /*Asignamos como Valor el text del tr del tbody*/
                objt[rowsHead[j].innerText] = rowsBody[i].getElementsByTagName('td')[j].innerText;
            array.push(objt);/* Añadimos al Array Principal*/
        }
        //Recorremos nuestro objeto
        for (var key in obj) {
            //Le asignamos el valor correspondiente
            obj[key] = values[iterator];
            columns.push(key);
            data.push(values[iterator]);
            iterator++;
        }
        var datos = [];
        var please = [];
        for (var i = 0; i < array.length; i++) {
            cantpresAct = $('#cantTotMes').val();
            entreHasta = $('#montoTotMes').val();
            ANIO = $('#añosCuotas').val();
            MES = $('#mesesC').val();
            doc.setFontSize(14);
            doc.text("Cantidad de cobros realizados: " + cantpresAct, 20, 70);
            doc.text("Ingreso total del mes: " + entreHasta, 20, 75);
            doc.text("Año seleccionado: " + ANIO, 20, 80);
            doc.text("Mes seleccionado: " + MES, 20, 85);

            please = [array[i].Contrato, array[i].Cliente, array[i].Monto, array[i].Cuota, array[i].Importe, array[i].Recibo, array[i].Cobro, array[i].Usuario];

            datos.push(please);
        }
        //if ($.trim(repSolicitado) == "Préstamos activos") {
            doc.autoTable(columns, datos,
                {
                    margin: { left: 20, right: 20, top: 90, bottom: 35 },
                    didDrawPage: function (datos) {
                        datos.settings.margin.top = 20;
                    }
                }
            );

        doc.addPage();
        doc.setFontSize(20);
        doc.text("Informe Gráfico", 20, 30);
        doc.setFontSize(16);
        doc.text("Cantidad de préstamos por mes", 20, 40);
        html2canvas($("#montosXmes"), {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL('image/png');
                //var doc = new jsPDF('p', 'mm', 'a3', true);
                doc.addImage(imgData, 'PNG', 20, 45, 240, 180);
                const pageCount = doc.internal.getNumberOfPages();
                for (var i = 1; i <= pageCount; i++) {
                    // Go to page i
                    doc.setPage(i);
                    //Print Page 1 of 4 for example
                    doc.text('Page ' + String(i) + ' of ' + String(pageCount), 300 - 20, 400 - 30, null, null, "right");

                }

                doc.save('Rpt' + repSolicitado + output + '.pdf');
            }
        });

    });

    $('#ImpGrafico').click(function () {
        var doc = new jsPDF('p', 'mm', 'a3', true);
        var tabla = $('#tablaReporte').val()
        doc.setFontSize(30);
        doc.text('<<motPres>>', 30, 30);

        doc.setFontSize(20);
        doc.text(repSolicitado, 70, 45);

        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
        output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
        doc.setFontSize(12);
        doc.text(output, 92, 50)

        var obj = {};

        var values = [];
        var key;
        var columns = [];
        var data = [];

        $("#tablaReporte thead th").each(function (i, o) {

            key = $(this).text();
            obj[key] = '';
        });

        $("#tablaReporte tbody td").each(function (i, o) {

            var value = $(this).text();
            values.push(value);
        });

        var iterator = 0;

        var array = [];
        /* Obtenemos todos los tr del Body*/
        var rowsBody = $("#tablaReporte").find('tbody > tr');
        /* Obtenemos todos los th del Thead */
        var rowsHead = $("#tablaReporte").find('thead > tr > th');

        /* Iteramos sobre as filas del tbody*/
        for (var i = 0; i < rowsBody.length; i++) {
            var objt = {};/* auxiliar*/
            for (var j = 0; j < rowsHead.length; j++) /*  Iteramos sobre los th de THead*/
                /*Asignamos como clave el text del th del thead*/
                /*Asignamos como Valor el text del tr del tbody*/
                objt[rowsHead[j].innerText] = rowsBody[i].getElementsByTagName('td')[j].innerText;
            array.push(objt);/* Añadimos al Array Principal*/
        }
         //Recorremos nuestro objeto
        for (var key in obj) {
             //Le asignamos el valor correspondiente
            obj[key] = values[iterator];
            columns.push(key);
            data.push(values[iterator]);
            iterator++;
        }
        var datos = [];
        var please = [];
        for (var i = 0; i < array.length; i++) {
            cantpresAct = $('#cantPrest').val();
            entreHasta = $('#cantTotalEntreg').val();
            ANIO = $('#añosPrestamos').val();

            doc.text("Cantidad de préstamos ACTIVOS a la fecha: " + cantpresAct, 20, 70);
            doc.text("Monto entregado a la fecha: " + entreHasta, 20, 75);
            doc.text("Año seleccionado: " + ANIO, 20, 80);

            please = [array[i].Préstamo_Id, array[i].Cliente_Id, array[i].Monto, array[i].Plan, array[i].Interés, array[i].Fecha_Inicio, array[i].Cobro, array[i].Usuario, array[i].Estado];

            datos.push(please);
        }
        if ($.trim(repSolicitado) == "Préstamos activos") {
            doc.autoTable(columns, datos,
                {
                    margin: { left: 20, right: 20, top: 85, bottom: 35 },
                    didDrawPage: function (datos) {
                        datos.settings.margin.top = 20;
                    }
                }
            );
            doc.addPage();
            doc.setFontSize(20);
            doc.text("Informes Gráficos", 20, 30);
            doc.setFontSize(16);
            doc.text("Cantidad de préstamos por mes", 20, 40);
            html2canvas($("#prestamosCantidad"), {
                onrendered: function (canvas) {
                    var imgData = canvas.toDataURL(
                        'image/png');
                    //var doc = new jsPDF('p', 'mm', 'a3', true);
                    doc.addImage(imgData, 'PNG', 20, 45, 240, 180);
                    doc.addPage();
                    doc.setFontSize(20);
                    doc.text("Informes Gráficos", 20, 30);
                    doc.setFontSize(16);
                    doc.text("Monto entregado por mes", 20, 40);
                    html2canvas($("#prestamosEntrega"), {
                        onrendered: function (canvas) {
                            var imgData = canvas.toDataURL(
                                'image/png');
                            //var doc = new jsPDF('p', 'pt', 'a3', true);
                            doc.addImage(imgData, 'PNG', 20, 45, 240, 180);
                            //doc.save('sample-file.pdf');
                            doc.save('Rpt' + repSolicitado + '.pdf');
                        }
                    });
                }
            });

        }


        //html2canvas($("#prestamosCantidad"), {
        //    onrendered: function (canvas) {
        //        var imgData = canvas.toDataURL(
        //            'image/png');
        //        //var doc = new jsPDF('p', 'mm', 'a3', true);
        //        doc.addImage(imgData, 'PNG', 15, 40, 240, 180);
        //        //doc.save('sample-file.pdf');
        //    }
        //});

        //const pageCount = doc.internal.getNumberOfPages();
        //// For each page, print the page number and the total pages
        //for (var i = 1; i <= pageCount; i++) {
        //    // Go to page i
        //    doc.setPage(i);
        //    //Print Page 1 of 4 for example
        //    doc.text('Page ' + String(i) + ' of ' + String(pageCount), 300 - 20, 302 - 30, null, null, "right");
        //}

        //doc.save('Rpt' + repSolicitado + output + '.pdf');

    });


    $(document).on("click", (e) => {
        var html = '';
        var title = '<h4>' + repSolicitado + '</h4>';
        switch (e.target.id) {
            case "listadoClientes":
                $('#btnImprimir').hide();
                repSolicitado = "Listado de Clientes";
                $('#marco').show();
                $('#repDiarioPOtort').hide();
                $('#central').hide();
                $('#infoSimula').hide();
                $('#pruebaImp1').hide();
                $('#graficosMuestra').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $('#TrajetaParaFechaDoble').hide();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                $('#pruebaImp').hide();

                $('#TrajetaParaCobroXmes').hide();
                $("#repeticionesReporte").hide();
                $("#titulo").html(title);
                $('#tablaReporte').html(html);
                $('#tablaPrestamos').html(html);
                $('#tituloTablaCuotas').hide();
                $('#tablaConCuotas').html(html);
                $('#datosPrestamo').hide();
                $('#infoPrestamAct').css({ 'display': 'none' });
                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                $('#TrajetaParaFecha').hide();
                $('#repDiarioCobro').hide();
                $('#infocuotVenc').hide();
                $('#tituloTablaPrestamos').hide();
                reporteSimple();
                break;
            case "historialCli":
                $('#btnImprimir').hide();
                $('#infoSimula').hide();
                $('#graficosMuestra').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                repSolicitado = "Historial de Cliente";
                $('#marco').show();
                $('#repDiarioCobro').hide();
                $('#tituloTablaPrestamos').hide();
                $('#central').hide();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                $('#TrajetaParaCobroXmes').hide();
                $("#repeticionesReporte").hide();
                $("#titulo").html(html);
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#tablaPrestamos').html(html);
                $('#infoPrestamAct').hide();
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                //$('#tituloTablaCuotas').html('<h6>Cuotas pertenecientes al Préstamos</h6>');
                limpiarCliente();
                $('#infocuotVenc').hide();
                $('#tarjetaParaBusqCli').show();
                $('#datosSolicitante').show();
                $('#repDiarioPOtort').hide();
                $('#pruebaImp').hide();

                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                $('#TrajetaParaFecha').hide();
                break;
            case "simPrestamo":
                repSolicitado = "Simulación de Préstamo";
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                limpiarSolicitante();
                $('#marco').show();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                $('#tituloTablaPrestamos').hide();
                $('#infoSimula').hide();
                $('#graficosMuestra').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $('#btnImprimir').hide();
                $('#repDiarioCobro').hide();
                $('#central').hide();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                $('#TrajetaParaCobroXmes').hide();
                $('#repDiarioPOtort').hide();
                $('#tituloTablaCuotas').hide();
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                $('#infoPrestamAct').hide();
                $("#repeticionesReporte").hide();
                $("#tablaReporte").html(html);
                $('#tablaPrestamos').html(html);
                $('#tablaConCuotas').html(html);
                $('#datosPrestamo').hide();
                $('#pruebaImp').hide();

                $('#tarjetaParaSimulacion').show();
                $('#datosSimulacion').show();
                $('#infocuotVenc').hide();
                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#TrajetaParaFecha').hide();
                break;
            case "presActivos":
                repSolicitado = "Préstamos activos";
                $('#marco').show();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                //$('#btnImprimir').hide();
                $('#TrajetaParaCobroXmes').hide();
                $('#TrajetaParaBusquedaXanio').show();
                $('#infoPrestamAct').hide();
                $('#tituloTablaPrestamos').hide();
                $('#infoSimula').hide();
                $('#central').hide();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                $("#repeticionesReporte").hide();
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#infoListaClit').hide();
                $('#repDiarioCobro').hide();
                $('#repDiarioPOtort').hide();
                $('#tituloTablaCuotas').hide();
                $('#btnImprimir').hide();
                $('#tablaPrestamos').html(html);
                $('#tablaConCuotas').html(html);
                $('#pruebaImp').hide();

                $('#datosPrestamo').hide();
                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                $('#infocuotVenc').hide();
                $('#TrajetaParaFecha').hide();
                break;
            case "cobroXdia":
                repSolicitado = "Cobranza del día";
                limpiarFecha();
                $('#marco').show();
                $('#btnImprimir').hide();
                $('#tituloTablaPrestamos').hide();
                $('#infoSimula').hide();
                $('#graficosMuestra').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $('#tablaPrestamos').html(html);
                $('#tablaConCuotas').html(html);
                $('#repDiarioPOtort').hide();
                $('#tituloTablaCuotas').hide();
                $('#central').hide();
                $('#repMesCobro').hide();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                $('#graficoCobro').hide();
                $('#TrajetaParaCobroXmes').hide();
                $('#infocuotVenc').hide();
                $('#pruebaImp').hide();

                $('#datosPrestamo').hide();
                $("#repeticionesReporte").hide();
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#infoPrestamAct').hide();
                $('#TrajetaParaFecha').show();
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                break;
            case "cobroMens":
                repSolicitado = "Cobro del mes";
                $('#marco').show();
                $('#TrajetaParaCobroXmes').show();
                $('#btnImprimir').hide();
                $('#tituloTablaPrestamos').hide();
                $('#infoSimula').hide();
                $('#graficosMuestra').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $('#tablaPrestamos').html(html);
                $('#tablaConCuotas').html(html);
                $('#repDiarioPOtort').hide();
                $('#tituloTablaCuotas').hide();
                $('#central').hide();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                $('#TrajetaParaFecha').hide();
                //$('#repMesCobro').hide();
                //$('#graficoCobro').hide();
                $('#pruebaImp').hide();

                $('#infocuotVenc').hide();
                $('#datosPrestamo').hide();
                $("#repeticionesReporte").hide();
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#infoPrestamAct').hide();
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                break;
            case "prestamosDados":
                repSolicitado = "Préstamos otorgados";
                limpiarFecha();
                $('#marco').show();
                $('#btnImprimir').hide();
                $('#pruebaImp').hide();

                $('#tituloTablaPrestamos').hide();
                $('#infoSimula').hide();
                $('#graficosMuestra').hide();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                $('#central').hide();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                $('#TrajetaParaCobroXmes').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $('#tablaPrestamos').html(html);
                $('#tablaConCuotas').html(html);
                $('#datosPrestamo').hide();
                $('#repDiarioCobro').hide();
                $('#tituloTablaCuotas').hide();
                $("#repeticionesReporte").hide();
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#infoPrestamAct').hide();
                $('#infocuotVenc').hide();
                $('#TrajetaParaFecha').show();
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                break;
            case "VencEnDia":
                repSolicitado = "Vencimiento en el día";
                limpiarFecha();
                $('#marco').show();
                $("#repeticionesReporte").hide();
                $('#tituloTablaPrestamos').hide();
                $('#infoSimula').hide();
                $('#graficosMuestra').hide();
                $('#central').hide();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                $('#TrajetaParaCobroXmes').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $('#btnImprimir').hide();
                $('#tablaPrestamos').html(html);
                $('#tituloTablaCuotas').hide();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                $('#tablaConCuotas').html(html);
                $('#datosPrestamo').hide();
                $('#infocuotVenc').hide();
                $('#infoPrestamAct').hide();
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                $('#TrajetaParaFecha').show();
                $('#repDiarioCobro').hide();
                $('#repDiarioPOtort').hide();
                $('#pruebaImp').hide();

                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                
                break;
            case "VencRango":
                repSolicitado = "Rango de vencimiento";
                limpiarFechaDoble();
                $('#marco').show();
                $('#tituloTablaPrestamos').hide();
                $('#central').hide();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                $('#TrajetaParaCobroXmes').hide();
                $('#infoSimula').hide();
                $('#pruebaImp1').hide();

                $('#graficosMuestra').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $("#repeticionesReporte").hide();
                $('#btnImprimir').hide();
                $('#tablaPrestamos').html(html);
                $('#tituloTablaCuotas').hide();
                $('#tablaConCuotas').html(html);
                $('#datosPrestamo').hide();
                $('#infocuotVenc').hide();
                $('#infoPrestamAct').hide();
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                $('#TrajetaParaFecha').hide();
                $('#TrajetaParaFechaDoble').show();
                $('#repDiarioCobro').hide();
                $('#repDiarioPOtort').hide();
                $('#pruebaImp').hide();

                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                
                break;
            case "moraMas30":
                repSolicitado = "Cuotas en Mora + 30 Días";
                limpiarFecha();
                $('#marco').show();
                $('#tituloTablaPrestamos').hide();
                $('#infoSimula').hide();
                $('#graficosMuestra').hide();
                $('#central').hide();
                $('#repMesCobro').hide();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                $('#graficoCobro').hide();
                $('#TrajetaParaCobroXmes').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $("#repeticionesReporte").hide();
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#btnImprimir').hide();
                $('#tablaPrestamos').html(html);
                $('#tituloTablaCuotas').hide();
                $('#tablaConCuotas').html(html);
                $('#infocuotVenc').hide();
                $('#datosPrestamo').hide();
                $('#TrajetaParaFecha').show();
                $('#infoPrestamAct').hide();
                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#repDiarioCobro').hide();
                $('#repDiarioPOtort').hide();
                $('#pruebaImp').hide();

                $('#tarjetaParaSimulacion').hide();
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                $('#datosSimulacion').hide();
                cabecera = '<thead><tr><th>Cliente_Id</th><th>Cliente</th><th>Contrato</th><th>Nro_Cuota</th><th>Importe_Cuota</th><th>Saldo_Impago</th><th>Vencimiento</th></tr></thead>';
                break;
            case "todasVencidas":
                repSolicitado = "Cuotas vencidas";
                $('#marco').show();
                $('#tituloTablaPrestamos').hide();
                $('#infoSimula').hide();
                $('#graficosMuestra').hide();
                $('#central').hide();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                $('#pruebaImp1').hide();
                $('#TrajetaParaFechaDoble').hide();
                $('#TrajetaParaCobroXmes').hide();
                $('#TrajetaParaBusquedaXanio').hide();
                $('#infoPrestamAct').hide();
                $("#repeticionesReporte").hide();
                $("#titulo").html('<h4>' + repSolicitado + '</h4>');
                $("#tablaReporte").html(html);
                $('#btnImprimir').hide();
                $('#tablaPrestamos').html(html);
                $('#tituloTablaCuotas').hide();
                $('#tablaConCuotas').html(html);
                $('#datosPrestamo').hide();
                $('#repDiarioCobro').hide();
                $('#infocuotVenc').hide();
                $('#repDiarioPOtort').hide();
                $('#pruebaImp').hide();
                

                $('#tarjetaParaBusqCli').hide();
                $('#datosSolicitante').hide();
                $('#tarjetaParaSimulacion').hide();
                $('#datosSimulacion').hide();
                $('#TrajetaParaFecha').hide();
                $('#infoListaClit').hide();
                $('#infoPrestamAct').hide();
                reporteSimple();
                break;
        }
    });


});

function tomarCliente2() {

    $('#tablaReporte').html('');
    $('#tituloTablaCuotas').hide();
    $('#datosPrestamo').hide();


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
                cuit = tr.children[5];
                email = tr.children[6];


                $('#idCli').val(idCli.textContent);
                $('#nombre').val(nom.textContent);
                $('#apellido').val(columna2.textContent);
                $('#docume').val(doc.textContent);
                $('#telef').val(tel.textContent);
                $('#cuit').val(cuit.textContent);
                $('#mail').val(email.textContent);
                $('#modalCLiente').modal('hide');

                var params = {
                    sitio: doc.textContent
                };
                $.ajax({
                    url: "/Prestamo/BusquedaTodosPrestamosFiltro",
                    data: params,
                    type: "Post",
                    success: function (result) {

                        var html = '';
                        var cabecera = '<thead><tr><th></th><th style="width:90px;">Nro Contrato</th><th>Estado</th><th>Concesión</th><th>Plan</th><th>Capital entregado</th><th>Capital Financiado</th><th>Saldo Cobrado</th><th></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                var fecha = result[i].dpFecha;
                                var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                                var fecha1 = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

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
                                else if ($.trim(estado) == 682) {
                                    icono = '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" style = "color:crimson" class="bi bi-caret-right-fill" viewBox = "0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'

                                }
                                //else if ($.trim(estado) == "Refinanciado") {
                                //    icono = '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" style = "color:chartreuse" class="bi bi-caret-right-fill" viewBox = "0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'
                                //}

                                html += '<td>' + icono + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpNroContrato + '</td>' +
                                    '<td>' + result[i].dpEstado + '</td>' +
                                    '<td style="text-align:center">' + fecha1 + '</td>' +
                                    '<td style="text-align:center">' + result[i].dpPlan + '</td>' +
                                    '<td style="text-align:right"> $ ' + result[i].dpMontoSolicitado + '</td>' +
                                    '<td style="text-align:right"> $ ' + formateoPuntosyComas(result[i].dpCapitalFinanciado) + '</td>' +
                                    '<td style="text-align:right"> $ ' + formateoPuntosyComas(result[i].pImporteCobrado) + '</td>' +
                                    '<td hidden="true">' + result[i].dpPorcej + '</td>' +
                                    '<td hidden="true">' + result[i].dpIntervaloCobro + '</td>' +
                                    '<td hidden="true">' + result[i].dpCuotasCobradas + '</td>' +
                                    '<td hidden="true">' + result[i].dpNombreMoto + '</td>' +
                                    '<td hidden="true">' + result[i].dpMarcaMoto + '</td>' +
                                    '<td hidden="true">' + result[i].dpNota + '</td>' +
                                    '<td hidden="true">' + result[i].dpEntrega + '</td>' +
                                    '<td>' + '<a class="tomadaP" id="abc" onClick="visualCuotas();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                                    '</tr>';


                            }
                            $('#tablaPrestamos').html(cabecera + '<tbody>' + html + '</tbody>');
                            //$('#titulo').html(titulo);
                            $('#botonImpresora').show();
                            $('#btnImprimir').show();
                            $('#tituloTablaPrestamos').show();
                            $('#tablaReporte').show();

                        }
                        else {
                            var html = '<h4>No se encontraron préstamos</h4>';
                            $('#sinResultado').html(html);
                            $('#tablaPrestamos').html('');
                            $('#tituloTablaPrestamos').hide();

                        }
                    }
                });

                $('#modalCLiente').modal('hide');

            }
        }
    }

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
    var deudaTotal = 0;
    var deudaSaldada = 0;
    var deudaFinal = 0;
    var sist;

    $('#tituloTablaCuotas').css({ 'display': 'block' });
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
                concesion = tr.children[3];
                nombM = tr.children[11];
                marcM = tr.children[12];
                nota = tr.children[13];
                dineroEntregado = tr.children[14];
  

                $('#estdPres').val(estado.textContent);
                $('#concesion').val(concesion.textContent);
                $('#nroContrato').val(nroContrato.textContent);
                $('#impoPrestamo').val(capital.textContent);
                $('#cantCuotas').val(cantCuotas.textContent);
                $('#loCobrado').val(impCobrado.textContent);
                $('#porcTasa').val(tasa.textContent);
                $('#nombreMoto').val(nombM.textContent);
                $('#marcaMoto').val(marcM.textContent);
                $('#nota').val(nota.textContent);
                $('#seniaEntregada').val('$ ' + parseFloat(dineroEntregado.textContent).toFixed(2));

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

                //if ($.trim(estado.textContent) == "Anulado" || $.trim(estado.textContent) == "Cancelado") {
                //    $('#btnAccionAnular').attr("disabled", true);
                //    $('#btnAccionFinalizar').attr("disabled", true);
                //}

                var params = {
                    nroContrato: nroContrato.textContent
                };
                $.ajax({
                    url: "/Prestamo/busquedaCuotasVisual",
                    data: params,
                    type: "Post",
                    success: function (result) {

                        var html = '';
                        var cabecera = '<thead><tr><th>Nro_Cta</th><th>Estado_Cta</th><th>Capital</th><th>Interés</th><th>Vencimiento</th><th>Importe_Cuota</th><th>Saldo</th><th>Fecha_Cobro</th><th>Importe_Cobrado</th></tr><tr></thead>';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                var fecha = result[i].cVencCuota;
                                var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                                var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                $('#fechaFin').val(fechaVenc);
                                var fecha2 = result[i].cFechaPago;
                                if (fecha2 != "/Date(-62135586000000)/") {
                                    var codigo_fecha2 = parseInt(fecha2.replace("/Date(", "").replace(")/", ""));
                                    var fechaCobro = new Date(codigo_fecha2).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                }
                                else {
                                    fechaCobro = " - ";
                                }
                                deudaTotal += parseFloat(result[i].cImpCuota)
                                deudaSaldada += parseFloat(result[i].cImpCobrado)

                                html += '<tr><td style="text-align:center">' + result[i].cNroCuota + '</td>' +
                                    '<td style="text-align:center">' + result[i].cDesc + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(result[i].cImpCapital) + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(result[i].cImpInteres) + '</td>' +
                                    '<td style="text-align:center">' + fechaVenc + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(result[i].cImpCuota) + '</td>' +
                                    '<td style="text-align:right"> $' + parseFloat(result[i].cSaldoImpago).toFixed(2) + '</td>' +
                                    '<td style="text-align:center">' + fechaCobro + '</td>' +
                                    '<td style="text-align:right"> $' + formateoPuntosyComas(result[i].cImpCobrado) + '</td>' +
                                    '</tr>';
                            }
                            $('#tablaReporte').html(cabecera + '<tbody>' + html + '</tbody>');

                            $('#datosPrestamo').show();
                            $('#deudaTotal').val(parseFloat(deudaTotal).toFixed(2));
                            deudaFinal = deudaTotal - deudaSaldada

                            $('#deudaSaldada').val(parseFloat(deudaSaldada).toFixed(2));
                            $('#deudaFinal').val(parseFloat(deudaFinal).toFixed(2));


                        }
                    }
                });
            }
        }
    }
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
                cuit = tr.children[5];
                email = tr.children[6];


                $('#idCli').val(idCli.textContent);
                $('#nombre').val(nom.textContent);
                $('#apellido').val(columna2.textContent);
                $('#docume').val(doc.textContent);
                $('#telef').val(tel.textContent);
                $('#cuit').val(cuit.textContent);
                $('#mail').val(email.textContent);
                $('#modalCLiente').modal('hide');

                var cod = idCli.textContent;

                var parametros =
                {
                    solicitud: repSolicitado,
                    codigo: cod
                };
                if ($.trim(repSolicitado) == "Historial de Cliente") {
                    var cabecera = '<thead><tr><th>Cli_ID</th><th>Nro_Contrato</th><th>Nro_Cuota</th><th>Fecha_Vencim</th><th>Importe_Cuota</th><th>Recibo</th><th>Fecha_de_Cobro</th><th>Importe_Cobrado</th><th>Adelanto</th><th>Saldo_Impago</th><th>Descripcion</th></tr></thead>';
                    var titulo = '<h4>' + repSolicitado + '</h4>';
               

                $.ajax({

                    url: "/Reporte/busquedaReportesDoble",
                    data: parametros,
                    type: "Post",
                    success: function (result) {
                        if (result.length > 0) {
                            var html = '';
                            for (var i = 0; i < result.length; i++) {
                                if ($.trim(repSolicitado) == "Historial de Cliente") {

                                    var fecha = result[i].rCuoFechaVencimiento;
                                    var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                                    var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                    var fecha1 = result[i].rFechaCobro;
                                    if (fecha1 != "/Date(-62135586000000)/") {
                                        var codigo_fecha2 = parseInt(fecha1.replace("/Date(", "").replace(")/", ""));
                                        var fechaCobro = new Date(codigo_fecha2).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                                    }
                                    else {
                                        fechaCobro = " - ";
                                    }

                                    html += '<tr><td>' + result[i].rCliId + '</td><td>' + result[i].rCuoPrestId + '</td><td>' + result[i].rCuoNroCuota + '</td><td>' + fechaVenc + '</td><td>' + result[i].rCuoImporteCuota + '</td><td>' + result[i].rCuoNroRecibo + '</td><td>' + fechaCobro + '</td><td>' + result[i].rCuoImporteCobrado + '</td><td>' + result[i].rCuoAdelanto + '</td><td>' + result[i].rSaldoImpago + '</td><td>' + result[i].rParametroNombre + '</td></tr>';

                                    $('#mail').val(result[0].rMail);
                                    $('#cuit').val(result[0].rCuit);
                                    $('#param').val(result[0].rParametroId);
                                    $('#est').val(result[0].rCuoEstado);
                                }

                            }
                            //}
                            $('#tablaReporte').html(cabecera + '<tbody>' + html + '</tbody>');
                            $('#titulo').html(titulo);
                            $('#botonImpresora').show();
                            $('#btnImprimir').show();
                            $("#repeticionesReporte").hide();
                        }
                        else {
                            html = '<h4>' + "No se encontraron préstamos registrados." + '<h4>';
                            $('#repeticionesReporte').show();
                            $('#tablaRepe').html(html);
                            $('#infoSimula').hide();

                        }

                    }
                });
                }

            }
        }
    }
}

function tomarSimulacion() {

    var columna2;
    var nom;
    var mont;
    var plaz;
    var int;
    var val;
    var a = document.querySelectorAll(".tomada");
    for (var b in a) { //Como nos devuelve un array iteramos
        var c = a[b];
        if (typeof c == "object") { //Solo buscamos los objetos
            c.onclick = function () { //Asignamos un evento onclick
                var td = this.offsetParent; //Localizamos el TD
                var tr = td.parentElement;  //LLegamos hasta el TR
                columna2 = tr.children[6];
                nom = tr.children[0];
                mont = tr.children[1];
                plaz = tr.children[2];
                int = tr.children[3];
                val = tr.children[4];

                var cod = columna2.textContent;
                $('#exampleModalSimulacion').modal('hide');
                $('#idSilumacion').val(cod);
                $('#nombreSim').val(nom.textContent);
                $('#montoS').val(formateoPuntosyComas(mont.textContent));
                $('#plazoS').val(plaz.textContent);
                $('#interesS').val(int.textContent);
                $('#valorCuoS').val(formateoPuntosyComas(val.textContent));

                var parametros =
                {
                    solicitud: repSolicitado,
                    codigo: cod
                };
                if ($.trim(repSolicitado) == "Simulación de Préstamo") {
                    var cabecera = '<thead><tr><th>Nro_Cuota</th><th>Cuota_Pura</th><th>Interés_calculado</th><th>Fecha_Vencimiento</th></tr></thead>';
                    var titulo = '<h4>' + repSolicitado + '</h4>';
                }
                $.ajax({
                    url: "/Reporte/busquedaReportesDoble",
                    data: parametros,
                    type: "Post",
                    success: function (result) {
                        var html = '';
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                if ($.trim(repSolicitado) == "Simulación de Préstamo") {

                                    var fecha = result[i].rsFechaCuota;
                                    var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                                    var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                                    var fechaInicial = result[0].rsFechaCuota;
                                    var codigo_fecha1 = parseInt(fechaInicial.replace("/Date(", "").replace(")/", ""));
                                    var fechaInicial = new Date(codigo_fecha1).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });


                                    html += '<tr><td  style="text-align:center">' + result[i].rsNroCuota + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rsCuotaPura).toFixed(2)) + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rsIntCalculado).toFixed(2)) + '</td><td style="text-align:center">' + fechaVenc + '</dr></tr>';

                                    $('#festSimIni').val(fechaInicial);
                                    $('#festSimFin').val(fechaVenc);

                                }

                            }
                            $('#tablaReporte').html(cabecera + '<tbody>' + html + '</tbody>');
                            $('#titulo').html(titulo);
                            $('#botonImpresora').show();
                            $('#btnImprimir').show();
                            $('#infoSimula').show();

                        }
                        else {
                            html = '<h4>' + "No se encontraron registros con los parámetros definidos" + '<h4>';
                            $('#repeticionesReporte').show();
                            $('#tablaRepe').html(html);
                            $('#infoSimula').hide();

                        }


                    }

                });
            }
        }
    }
}


function reporteConAnio() {
    var entregado = 0;
    var deuda = 0;
    var anio = $('#añosPrestamos').val()

    if ($.trim(anio) == "") {
        Swal.fire({ title: "Debe seleccionar el año para la búsqueda", icon: "warning" });
        return false;
    }
    if ($.trim(repSolicitado) == "Préstamos activos") {
        cabecera = '<thead><tr><th>Nro_Contrato</th><th>Cliente</th><th>Monto</th><th>Plan</th><th>Interés</th><th>Fecha_Inicio</th><th>Cobro</th><th>Usuario</th></tr><tr></thead>';
        titulo = '<h4>' + repSolicitado + '</h4>';
    }
    var parametro = {
        year: anio,
    };

    $.ajax({
        url: "/Reporte/busquedaReportePA",
        data: parametro,
        type: "Post",
        success: function (result) {
            if (result.length > 0) {
                var html = '';
                var head = '';
                var body = '';
                for (var i = 0; i < result.length; i++) {
                if ($.trim(repSolicitado) == "Préstamos activos") {
                        var fecha = result[i].paFecha;
                        var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                        var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                    html += '<tr><td style="text-align:center">' + result[i].rCuoPrestId + '</td><td style="text-align:center">' + result[i].rCliNombre + '</td><td style="text-align:right"> $' + formateoPuntosyComas(parseFloat(result[i].rsMontoSolicitado).toFixed(2)) + '</td><td style="text-align:center">' + result[i].rsPlazo + '</td><td style="text-align:center">' + result[i].rsPorcInt + '</td><td>' + fechaVenc + '</td><td style="text-align:center">' + result[i].paIntervaloCobro + '</td><td style="text-align:center">' + result[i].paUsuario + '</td></tr>';


                        entregado += parseFloat(result[i].rsMontoSolicitado);

                        $('#infoPrestamAct').show();
                        $('#infocuotVenc').hide();

                        $('#infoListaClit').hide();
                    }
                    $('#tablaReporte').show();
                    $('#tablaReporte').html(cabecera + '<tbody>' + html + '</tbody>');

                    $('#titulo').html(titulo);
                    //$('#btnImprimir').show();
                    $('#pruebaImp').show();
                    //$('#pruebaImp1').show();
                    $('#botonImpresoraConImagenes').show();
                    $('#graficosMuestra').show();
                    $('#repeticionesReporte').hide();

                }
            }
            else {
                html = '<h4>' + "No se encontraron registros con los parámetros definidos" + '<h4>';
                $('#repeticionesReporte').show();
                $('#tablaRepe').html(html);
                $('#infoPrestamAct').hide();
                $('#tablaReporte').hide();
                $('#infocuotVenc').hide();
                $('#graficosMuestra').hide();
            }
            $('#cantPrest').val(result.length);
            $('#cantTotalEntreg').val(' $ ' + formateoPuntosyComas(parseFloat(entregado).toFixed(2)));
            $('#cantdeuda').val(' $ ' + parseFloat(deuda).toFixed(2));
        }

    });


    $.ajax({
        url: "/Reporte/cargaCantidadesXanios",
        type: "POST",
        data: parametro,
        success: function (result) {
            var rta = result;

            var removed = rta.splice(0, 1);
            const $grafica = document.querySelector("#prestamosCantidad");



            const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Préstamos por mes',
                    data: rta,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            };

            new Chart($grafica, {
                type: 'bar',// Tipo de gráfica
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                    },
                }
            });


        }
    })


    $.ajax({
        url: "/Reporte/entregaXmes",
        type: "POST",
        data: parametro,
        success: function (result) {
            var rta = result;

            var removed = rta.splice(0, 1);
            const $grafica1 = document.querySelector("#prestamosEntrega");



            const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Monto entregado por mes',
                    data: rta,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            };

            new Chart($grafica1, {
                type: 'line',// Tipo de gráfica
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                    },
                }
            });


        }
    });

}

function reporteCobroMes() {
    $('#crearGrafico').html('<canvas id="montosXmes"></canvas>');
    var totCobradoDia = 0;
    var arregloDias; 
    var mes = $('#mesesC').val();
    var anio = $('#añosCuotas').val();



    if ($.trim(mes) == "") {
        Swal.fire({ title: "Debe seleccionar un mes.", icon: "warning" });
        return false;
    }
    if ($.trim(anio) == "") {
        Swal.fire({ title: "Debe seleccionar un año.", icon: "warning" });
        return false;
    }

    var parametro =
    {
        month: mes,
        year: anio
    }

    $.ajax({
        url: '/Reporte/reporMesCobro',
        type: 'POST',
        data: parametro,
        success: function (result) {
            if (result.length > 0) {
                var html = '';
                var head = '';
                var body = '';
                for (var i = 0; i < result.length; i++) {
                    var fecha = result[i].rsFechaCuota;
                    var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                    var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                    head = '<thead><tr><th>Contrato</th><th>Cliente</th><th>Cuota</th><th>Importe</th><th>Recibo</th><th>Cobro<th>Usuario</th></tr></thead>';

                    totCobradoDia += parseFloat(result[i].rCuoImporteCobrado);
                    $('#cantTotMes').val(result.length);

                    body += '<tr><td>' + result[i].rCuoPrestId + '</td>' +
                        '<td>' + result[i].rCliNombre + '</td>' +
                        '<td>' + result[i].rsNroCuota + '</td>' +
                        '<td> $ ' + formateoPuntosyComas(parseFloat(result[i].rCuoImporteCobrado).toFixed(2)) + '</td>' +
                        '<td>' + result[i].rCuoNroRecibo + '</td>' +
                        '<td>' + result[i].tipoCobro + '</td>' +
                        '<td>' + result[i].paUsuario + '</td></tr>';


                }


                $('#montoTotMes').val('$ ' + formateoPuntosyComas(parseFloat(totCobradoDia).toFixed(2)));
                //$('#montoTotPrest').val('$ ' + parseFloat(totEntregado).toFixed(2));
                //$('#cantdeuda').val('$ ' + parseFloat(deuda).toFixed(2));
                $('#tablaReporte').html(head + '<tbody>' + body + '</tbody>');
                titulo = '<h4>' + repSolicitado + '</h4>';
                $('#titulo').html(titulo);
                $('#botonImpresora').show();
                $('#pruebaImp1').show();
                $('#tablaReporte').show();
                $('#tablaRepe').html('');
                $('#repMesCobro').show();
                $('#graficoCobro').show();
                $('#repeticionesReporte').hide();

            }
            else {
                html = '<h4>' + "No se encontraron registros con los parámetros definidos" + '<h4>';
                $('#tablaRepe').html(html);
                $('#repeticionesReporte').show();
                $('#tablaReporte').html('');
                $('#repDiarioCobro').hide();
                $('#repDiarioPOtort').hide();
                $('#repMesCobro').hide();
                $('#graficoCobro').hide();
                $('#pruebaImp1').hide();
            }
        }
    });

    var cant = diasEnUnMes(mes, anio);
    var arregloDias =[];
    for (var i = 0; i < cant+1; i++) {
        arregloDias[i] = i;
    }
    var removed2 = arregloDias.splice(0, 1);
    


    $.ajax({
        url: "/Reporte/cobroXmes",
        type: "POST",
        data: parametro,
        success: function (result) {
            var rta = result;
            console.log(rta);
            var removed = rta.splice(0, 1);
            const $grafica1 = document.querySelector("#montosXmes");

            const labels = arregloDias;
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Ingresos por día',
                    data: rta,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            };

            new Chart($grafica1, {
                type: 'line',// Tipo de gráfica
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                    },
                }
            });


        }
    });

}
function diasEnUnMes(mes, año) {
    return new Date(año, mes, 0).getDate();
}

function reporteSimple() {
    var cabecera = '';
    var titulo = '';
    var entregado = 0;
    var deuda = 0;
    var parametros =
    {
        solicitud: repSolicitado,
    };

    if ($.trim(repSolicitado) == "Listado de Clientes") {
        cabecera = "<thead><tr><th>Codigo</th><th>Nombre</th><th>Apellido</th><th>Documento</th><th>CUIT</th><th>Teléfono</th><th>Email</th></tr><tr></thead>";
        titulo = '<h4>' + repSolicitado + '</h4>';
    }
    else if ($.trim(repSolicitado) == "Cuotas vencidas") {
        titulo = '<h4>' + repSolicitado + '</h4>';
    }


    $.ajax({
        url: "/Reporte/busquedaReportes",
        data: parametros,
        type: "Post",
        success: function (result) {
            if (result.length > 0) {
                var html = '';
                var head = '';
                var body = '';
                for (var i = 0; i < result.length; i++) {
                    if ($.trim(repSolicitado) == "Listado de Clientes") {

                        html += '<tr><td>' + result[i].rCliId + '</td><td>' + result[i].rCliNombre + '</td><td>' + result[i].rApellido + '</td><td>' + result[i].rDocumento + '</td><td>' + result[i].rCuit + '</td><td>' + result[i].rTel + '</td><td>' + result[i].rMail + '</td></tr>';

                        $('#cantcliA').val(result.length);
                        $('#infocuotVenc').hide();

                        $('#infoListaClit').show();
                        $('#infoPrestamAct').hide();
                    }
                    //else if ($.trim(repSolicitado) == "Préstamos activos") {
                    //    var fecha = result[i].paFecha;
                    //    var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                    //    var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                    //    html += '<tr><td style="text-align:center">' + result[i].rCuoPrestId + '</td><td style="text-align:center">' + result[i].rCliId + '</td><td style="text-align:right"> $' + parseFloat(result[i].rsMontoSolicitado).toFixed(2) + '</td><td style="text-align:center">' + result[i].rsPlazo + '</td><td style="text-align:center">' + result[i].rsPorcInt + '</td><td>' + fechaVenc + '</td><td style="text-align:center">' + result[i].paIntervaloCobro + '</td><td style="text-align:center">' + result[i].paUsuario + '</td></tr>';


                    //    entregado += parseFloat(result[i].rsMontoSolicitado);

                    //    $('#infoPrestamAct').show();
                    //    $('#infocuotVenc').hide();

                    //    $('#infoListaClit').hide();
                    //}
                    else if ($.trim(repSolicitado) == "Cuotas vencidas") {
                        cabecera = '<thead><tr><th>Cliente_Id</th><th>Cliente</th><th>Nro_Contrato</th><th>Nro_Cuota</th><th>Importe_Cuota</th><th>Saldo_Impago</th><th>Vencimiento</th></tr></thead>';
                        var fecha = result[i].rCuoFechaVencimiento;
                        var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                        var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                        html += '<tr><td style="text-align:center">' + result[i].rCliId + '</td><td style="text-align:center">' + result[i].rCliNombre + '</td><td style="text-align:center">' + result[i].rCuoPrestId + '</td><td style="text-align:center">' + result[i].rCuoNroCuota + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rCuoImporteCuota).toFixed(2)) + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rSaldoImpago).toFixed(2)) + '</td><td style="text-align:center">' + fechaVenc + '</td></tr>';

                        $('#cantCtasVenc').val(result.length)
                        deuda += parseFloat(result[i].rSaldoImpago)
                        $('#infoListaClit').hide();
                        $('#infoPrestamAct').hide();
                        $('#infocuotVenc').show();


                    }


                    //if ($.trim(repSolicitado) == "Cuotas con Mora mínima") {
                    //    $('#repeticionesReporte').html(cabecera + html);
                    //    $('#tablaReporte').html(head + body);
                    //    $('#tablaReporte').hide();
                    //}
                    //else {
                        $('#tablaReporte').show();
                        $('#tablaReporte').html(cabecera + '<tbody>' + html + '</tbody>');
                    //}

                    $('#titulo').html(titulo);
                    $('#btnImprimir').show();
                    $('#botonImpresora').show();
                    $('#repeticionesReporte').hide();

                }
            }
            else {
                html = '<h4>' + "No se encontraron registros con los parámetros definidos" + '<h4>';
                $('#repeticionesReporte').show();
                $('#tablaRepe').html(html);
                $('#infoPrestamAct').hide();
                $('#tablaReporte').hide();
                $('#infocuotVenc').hide();
            }
            $('#cantPrest').val(result.length);
            $('#cantTotalEntreg').val(' $ ' + formateoPuntosyComas(parseFloat(entregado).toFixed(2)));
            $('#cantdeuda').val(' $ ' + formateoPuntosyComas(parseFloat(deuda).toFixed(2)));
        }

    });
}

function reporteConFechaDoble() {
    var fi = $('#idFechaIni').val();
    var ff = $('#idFechaFin').val();
    var deuda = 0;

    if ($.trim(fi) == "") {
        Swal.fire({ title: 'Debe seleccionar una fecha inicial!', icon: 'warning' });
        return false;
    }
    if ($.trim(ff) == "") {
        Swal.fire({ title: 'Debe seleccionar una fecha final!', icon: 'warning' });
        return false;
    }

    var parametros =
    {
        solicitud: repSolicitado,
        diai: fi,
        diaf: ff
    };

    $.ajax({
        url: "/Reporte/busquedaReporteRango",
        data: parametros,
        type: "Post",
        success: function (result) {
            if (result.length > 0) {
                var html = '';
                var cabecera = '';
                var body = '';
                for (var i = 0; i < result.length; i++) {

                    cabecera = '<thead><tr><th>Cliente_Id</th><th>Cliente</th><th>Contrato</th><th>Nro_Cuota</th><th>Importe_Cuota</th><th>Saldo_Impago</th><th>Vencimiento</th></tr></thead>';
                    var fecha = result[i].rCuoFechaVencimiento;
                    var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                    var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                    html += '<tr><td style="text-align:center">' + result[i].rCliId + '</td><td style="text-align:center">' + result[i].rCliNombre + '</td><td style="text-align:center">' + result[i].rCuoPrestId + '</td><td style="text-align:center">' + result[i].rCuoNroCuota + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rCuoImporteCuota).toFixed(2)) + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rSaldoImpago).toFixed(2)) + '</td><td style="text-align:center">' + fechaVenc + '</td></tr>';

                    deuda += parseFloat(result[i].rSaldoImpago)
                    $('#cantCtasVenc').val(result.length)

                    $('#repDiarioCobro').hide();
                    $('#repDiarioPOtort').hide();
                    $('#infocuotVenc').show();

                }
                $('#cantdeuda').val('$ ' + formateoPuntosyComas(parseFloat(deuda).toFixed(2)));
                $('#tablaReporte').html(cabecera + '<tbody>' + html + '</tbody>');
                $('#tablaRepe').html('');
                titulo = '<h4>' + repSolicitado + '</h4>';
                $('#titulo').html(titulo);
                $('#botonImpresora').show();
                $('#btnImprimir').show();
                $('#repeticionesReporte').hide();
            }
            else {
                html = '<br/><h4>' + "No se encontraron registros con los parámetros definidos" + '<h4>';
                $('#tablaRepe').html(html);
                $('#tablaReporte').html('');
                $('#repeticionesReporte').show();
                $('#infocuotVenc').hide();
            }

        }
    });
}


function reporteConFecha() {
    var fecha = $('#idFecha').val();
    var totCobradoDia = 0;
    var totEntregado = 0;
    var deuda = 0;

    if ($.trim(fecha) == "") {
        Swal.fire({ title: 'Debe seleccionar una fecha!', icon: 'warning' });
        return false;
    }

    var parametros =
    {
        solicitud: repSolicitado,
        dia: fecha
    };
    $.ajax({
        url: "/Reporte/busquedaReportesTriple",
        data: parametros,
        type: "Post",
        success: function (result) {
            if (result.length > 0) {
                var html = '';
                var head = '';
                var body = '';
                for (var i = 0; i < result.length; i++) {
                    if ($.trim(repSolicitado) == "Cobranza del día") {
                        var fecha = result[i].rsFechaCuota;
                        var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                        var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                        head = '<thead><tr><th>Contrato</th><th>Cliente</th><th>Cuota</th><th>Importe</th><th>Recibo</th><th>Usuario</th></tr></thead>';

                        html += '<br/><div style="border-color: black; border: 1px solid;border-style: double; border-width: 4px; margin: 10px;"><div class="row">' +
                            '<div class="col-lg-2"><h6>Datos</h6></div >' +
                            '<div class="col-lg-10"></div></div>' +
                            '<div class="row" style="background-color: rgb(211, 208, 208);">' +
                            '<div class="col-lg-4"><h6>Cliente : ' + result[i].rCliNombre + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Documento : ' + result[i].rDocumento + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Teléfono : ' + result[i].rTel + '</h6></div></div>' +
                            '<div class="row">' +
                            '<div class="col-lg-3"><h6>Contrato : ' + result[i].rCuoPrestId + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Cuota : ' + result[i].rsNroCuota + '</h6></div>' +
                            '<div class="col-lg-4"><h6>Importe Cobrado : $ ' + formateoPuntosyComas(parseFloat(result[i].rCuoImporteCobrado).toFixed(2)) + '</h6></div>' +
                            '<div class="col-lg-2"><h6>Recibo : ' + result[i].rCuoNroRecibo + '</h6></div></div>' +
                            '<div class="row">' +
                            '<div class="col-lg-3"><h6>Saldo Impago: $ ' + formateoPuntosyComas(parseFloat(result[i].rSaldoImpago).toFixed(2)) + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Usuario : ' + result[i].paUsuario + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Fecha: ' + fechaVenc + '</h6></div></div></div>';
                        totCobradoDia += parseFloat(result[i].rCuoImporteCobrado);
                        $('#cantTotDia').val(result.length);

                        body += '<tr><td>' + result[i].rCuoPrestId + '</td>' +
                            '<td>' + result[i].rCliNombre + '</td>' +
                            '<td>' + result[i].rsNroCuota + '</td>' +
                            '<td> $ ' + formateoPuntosyComas(parseFloat(result[i].rCuoImporteCobrado).toFixed(2)) + '</td>' +
                            '<td>' + result[i].rCuoNroRecibo + '</td>' +
                            '<td>' + result[i].paUsuario + '</td></tr>';
                        $('#repDiarioCobro').show();
                        $('#repDiarioPOtort').hide();
                        $('#infocuotVenc').hide();
                    }
                    else if ($.trim(repSolicitado) == "Préstamos otorgados") {
                        var fecha = result[i].rsFechaCuota;
                        var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                        var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                        head = '<thead><tr><th>Contrato</th><th>Cliente</th><th>Plan</th><th>Monto_Solicitado</th><th>Tipo</th><th>Usuario</th></tr></thead>';

                        html += '<br/><div style="border-color: black; border: 1px solid;border-style: double; border-width: 4px; margin: 10px;"><div class="row">' +
                            '<div class="col-lg-2"><h5>Datos</h5></div >' +
                            '<div class="col-lg-10"></div></div>' +
                            '<div class="row" style="background-color: rgb(211, 208, 208);">' +
                            '<div class="col-lg-4"><h6>Cliente : ' + result[i].rCliNombre + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Documento : ' + result[i].rDocumento + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Teléfono : ' + result[i].rTel + '</h6></div></div>' +
                            '<div class="row">' +
                            '<div class="col-lg-3"><h6>Contrato : ' + result[i].rCuoPrestId + '</h6></div>' +
                            '<div class="col-lg-2"><h6>Plan : ' + result[i].rsPlazo + '</h6></div>' +
                            '<div class="col-lg-7"><h5>Monto Solicitado : $ ' + formateoPuntosyComas(parseFloat(result[i].rsMontoSolicitado).toFixed(2)) + '</h5></div></div>' +
                            '<div class="row">' +
                            '<div class="col-lg-3"><h6>Usuario : ' + result[i].paUsuario + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Tipo : ' + result[i].paIntervaloCobro + '</h6></div>' +
                            '<div class="col-lg-3"><h6>Fecha: ' + fechaVenc + '</h6></div></div></div>';

                        $('#cantTotPrest').val(result.length);
                        totEntregado += parseFloat(result[i].rsMontoSolicitado);

                        body += '<tr><td>' + result[i].rCuoPrestId + '</td>' +
                            '<td>' + result[i].rCliNombre + '</td>' +
                            '<td>' + result[i].rsPlazo + '</td>' +
                            '<td> $ ' + formateoPuntosyComas(parseFloat(result[i].rsMontoSolicitado).toFixed(2)) + '</td>' +
                            '<td>' + result[i].paIntervaloCobro + '</td>' +
                            '<td>' + result[i].paUsuario + '</td></tr>';
                        $('#repDiarioCobro').hide();
                        $('#repDiarioPOtort').show();
                        $('#infocuotVenc').hide();

                    }
                    else if ($.trim(repSolicitado) == "Vencimiento en el día") {
                        cabecera = '<thead><tr><th>Cliente_Id</th><th>Cliente</th><th>Contrato</th><th>Nro_Cuota</th><th>Importe_Cuota</th><th>Saldo_Impago</th><th>Vencimiento</th></tr></thead>';
                        var fecha = result[i].rCuoFechaVencimiento;
                        var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                        var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                        html += '<tr><td style="text-align:center">' + result[i].rCliId + '</td><td style="text-align:center">' + result[i].rCliNombre + '</td><td style="text-align:center">' + result[i].rCuoPrestId + '</td><td style="text-align:center">' + result[i].rCuoNroCuota + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rCuoImporteCuota).toFixed(2)) + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rSaldoImpago).toFixed(2)) + '</td><td style="text-align:center">' + fechaVenc + '</td></tr>';

                        deuda += parseFloat(result[i].rSaldoImpago)
                        $('#cantCtasVenc').val(result.length)

                        $('#repDiarioCobro').hide();
                        $('#repDiarioPOtort').hide();
                        $('#infocuotVenc').show();


                    }
                    else if ($.trim(repSolicitado) == "Cuotas en Mora + 30 Días" || $.trim(repSolicitado) == "Cuotas vencidas") {
                        var fecha = result[i].rCuoFechaVencimiento;
                        var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                        var fechaVenc = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });

                        html += '<tr><td style="text-align:center">' + result[i].rCliId + '</td><td style="text-align:center">' + result[i].rCliNombre + '</td><td style="text-align:center">' + result[i].rCuoPrestId + '</td><td style="text-align:center">' + result[i].rCuoNroCuota + '</td><td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rCuoImporteCuota).toFixed(2)) + '</td><td  style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].rSaldoImpago).toFixed(2)) + '</td><td style="text-align:center">' + fechaVenc + '</td></tr>';

                        deuda += parseFloat(result[i].rSaldoImpago);

                        $('#cantCtasVenc').val(result.length)

                        $('#repDiarioCobro').hide();
                        $('#repDiarioPOtort').hide();
                        $('#infocuotVenc').show();

                    }

                }
                $('#montoTotDia').val('$ ' + formateoPuntosyComas(parseFloat(totCobradoDia).toFixed(2)));
                $('#montoTotPrest').val('$ ' + formateoPuntosyComas(parseFloat(totEntregado).toFixed(2)));
                $('#cantdeuda').val('$ ' + formateoPuntosyComas(parseFloat(deuda).toFixed(2)));

                if ($.trim(repSolicitado) == "Vencimiento en el día" || $.trim(repSolicitado) == "Cuotas en Mora + 30 Días" || $.trim(repSolicitado) == "Cuotas vencidas") {
                    $('#tablaReporte').html(cabecera + '<tbody>' + html + '</tbody>');
                    $('#tablaRepe').html('');
                    $('#tablaReporte').show();

                }
                else {
                    $('#tablaRepe').html(html);
                    $('#tablaReporte').html(head + '<tbody>' + body + '</tbody>');
                    $('#tablaReporte').hide();

                }
                titulo = '<h4>' + repSolicitado + '</h4>';
                $('#titulo').html(titulo);
                $('#botonImpresora').show();
                $('#btnImprimir').show();
                $('#repeticionesReporte').show();

            }
            else {
                html = '<br/><h4>' + "No se encontraron registros con los parámetros definidos" + '<h4>';
                $('#tablaRepe').html(html);
                $('#tablaReporte').html('');
                $('#repDiarioCobro').hide();
                $('#repDiarioPOtort').hide();
                $('#infocuotVenc').hide();
                $('#botonImpresora').hide();
                $('#repeticionesReporte').show();

            }
        }
    });
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

        var cant1 = valor.indexOf(',');
        if (cant1 > 0) {
            valor = valor.split(',');
            var decimal = valor[1];
            var entero = valor[0];
            entero = entero.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            entero = entero.split('').reverse().join('').replace(/^[\.]/, '');
            var valorFinal = entero + ',' + decimal;
            return valorFinal;
        }
        else {
            valor = parseFloat(valor).toFixed(2);
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

$('#btnImprimir').click(function () {



    var doc = new jsPDF('p', 'mm', 'a3', true);
    var tabla = $('#tablaReporte').val()
    doc.setFontSize(30);
    doc.text('<<motPres>>', 30, 30);

    //doc.setLineWidth(1);
    //doc.line(30, 35, 180, 35);

    //doc.setLineWidth(1.5);
    //doc.line(30, 40, 180, 40);
    doc.setFontSize(20);
    doc.text(repSolicitado, 70, 45);

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
    output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    doc.setFontSize(12);
    doc.text(output, 92, 50)


    // Creamos un objeto donde guardar primeramente las llaves
    var obj = {};

    // Creamos un arreglo donde guardar nuestros valores
    var values = [];
    var key;
    var columns = [];
    var data = [];
    //if ($.trim(repSolicitado) == "Cobranza del día") {
    //    $("#repeticionesReporte div").each(function (i, o) {
    //        // Obtenemos su respectivo texto
    //        key = $(this).text();
    //        // Le asignamos como llave nuestro texto
    //        // y le damos un valor vacío
    //        obj[key] = '';
    //    });
    //    $("#repeticionesReporte div h6").each(function (i, o) {
    //        // Obtenemos su respectivo texto
    //        var value = $(this).text();
    //        // Agregamos nuestro valor al arreglo
    //        values.push(value);
    //    });
    //}
    // Recorremos todos los elementos th
    $("#tablaReporte thead th").each(function (i, o) {
        // Obtenemos su respectivo texto
        key = $(this).text();
        // Le asignamos como llave nuestro texto
        // y le damos un valor vacío
        obj[key] = '';
    });

    // Reocrremos todos los elementos td
    $("#tablaReporte tbody td").each(function (i, o) {
        // Obtenemos su respectivo texto
        var value = $(this).text();
        // Agregamos nuestro valor al arreglo
        values.push(value);
    });

    var iterator = 0;

    var array = [];
    /* Obtenemos todos los tr del Body*/
    var rowsBody = $("#tablaReporte").find('tbody > tr');
    /* Obtenemos todos los th del Thead */
    var rowsHead = $("#tablaReporte").find('thead > tr > th');

    /* Iteramos sobre as filas del tbody*/
    for (var i = 0; i < rowsBody.length; i++) {
        var objt = {};/* auxiliar*/
        for (var j = 0; j < rowsHead.length; j++) /*  Iteramos sobre los th de THead*/
            /*Asignamos como clave el text del th del thead*/
            /*Asignamos como Valor el text del tr del tbody*/
            objt[rowsHead[j].innerText] = rowsBody[i].getElementsByTagName('td')[j].innerText;
        array.push(objt);/* Añadimos al Array Principal*/
    }
    // Recorremos nuestro objeto
    for (var key in obj) {
        // Le asignamos el valor correspondiente
        obj[key] = values[iterator];
        columns.push(key);
        //data.push(values[iterator]);
        iterator++;
    }
    var datos = [];
    var please = [];
    for (var i = 0; i < array.length; i++) {
        if ($.trim(repSolicitado) == "Listado de Clientes") {

            cantClientes = $('#cantcliA').val();
            doc.text("Cantidad de Clientes ACTIVOS: " + cantClientes, 20, 70);

            please = [array[i].Codigo, array[i].Nombre, array[i].Apellido, array[i].Documento, array[i].CUIT, array[i].Teléfono, array[i].Email]
        }
        else if ($.trim(repSolicitado) == "Historial de Cliente") {

            please = [array[i].Nro_Cta, array[i].Estado_Cta, array[i].Capital, array[i].Interés, array[i].Vencimiento, array[i].Importe_Cuota, array[i].Saldo, array[i].Fecha_Cobro, array[i].Importe_Cobrado]
            //doc.text(output, 92, 60)
            name = $('#nombre').val();
            last = $('#apellido').val();
            dni = $('#docume').val();
            cuit = $('#cuit').val();
            tel = $('#telef').val();
            cobrado = $('#loCobrado').val();
            entregado = $('#impoPrestamo').val();
            totDeuda = $('#deudaTotal').val();
            loquefalta = $('#deudaFinal').val();
            mail = $('#mail').val();
            planCtas = $('#cantCuotas').val();
            NroCont = $('#nroContrato').val();
            porcInt = $('#porcTasa').val();
            tasaInt = $('#tipoVenc').val();
            ctasCobr = $('#cantCuotasCob').val();
            conce = $('#concesion').val();
            fin = $('#fechaFin').val();
            estadoPresta = $('#estdPres').val();
            if ($.trim(estadoPresta) == 'Activo') {
                estadoPresta = "ACTIVO";
            }
            else if ($.trim(estadoPresta) == "Refinanciacion") {
                estadoPresta = "INACTIVO POR REFINANCIACIÓN";
            }
            else if ($.trim(estadoPresta) == "Anulado") {
                estadoPresta = "INACTIVO POR ANULACIÓN";
            }
            else if ($.trim(estadoPresta) == "Cancelado") {
                estadoPresta = "INACTIVO POR CANCELACIÓN";
            }

            doc.text("Nombre: " + name, 20, 70);
            doc.text("Apellido: " + last, 20, 75);
            doc.text("Documento: " + dni, 100, 70);
            doc.text("CUIT: " + cuit, 100, 75);
            doc.text("Teléfono: " + tel, 20, 80);
            doc.text("Email: " + mail, 100, 80);

            doc.text("Información relativa al Préstamo", 25, 95);

            doc.text("Número de Contrato: " + NroCont, 20, 100);
            doc.text("Estado actual del préstamo: " + estadoPresta, 20, 105)

            doc.text("Plan de Cuotas: " + planCtas, 20, 110);
            doc.text("Nro de Cuotas cobradas: " + ctasCobr, 100, 110);

            doc.text("Tasa de interés: " + porcInt, 20, 115);
            doc.text("Vencimiento: " + tasaInt, 100, 115); 

            doc.text("Monto Entregado: " + entregado, 20, 120);
            doc.text("Deuda Total: $ " + totDeuda, 100, 120);

            doc.text("Monto Cobrado: " + cobrado, 20, 125);
            doc.text("Saldo Impago: $ " + loquefalta, 100, 125);

            doc.text("Fecha de concesión: " + conce, 20, 130);
            doc.text("Fecha estimada de cancelación: " + fin, 100, 130);

        }
        else if ($.trim(repSolicitado) == "Simulación de Préstamo") {
            please = [array[i].Nro_Cuota, array[i].Cuota_Pura, array[i].Interés_calculado, array[i].Fecha_Vencimiento];

            name = $('#nombreSim').val();
            plazo = $('#plazoS').val();
            monto = $('#montoS').val();
            inte = $('#interesS').val();
            cuoTotal = $('#valorCuoS').val();
            fi = $('#festSimIni').val();
            ff = $('#festSimFin').val();
            doc.text("Nombre: " + name, 20, 70);
            doc.setLineWidth(0.5);
            doc.line(40, 73, 180, 73);
            doc.text("Monto: " + monto, 20, 80);
            doc.text("Plazo: " + plazo + " Cuotas", 20, 86);
            doc.text("Interés: " + inte + "%", 80, 80);
            doc.text("Cuota Completa: " + cuoTotal, 80, 86);
            doc.text("Fecha estimada de inicio: " + fi,20,91);
            doc.text("Fecha estimada de finalización: " + ff, 105, 91);

        }
        else if ($.trim(repSolicitado) == "Préstamos activos") {

            cantpresAct = $('#cantPrest').val();
            entreHasta = $('#cantTotalEntreg').val();

            doc.text("Cantidad de préstamos ACTIVOS a la fecha: " + cantpresAct, 20, 70);
            doc.text("Monto entregado a la fecha: " + entreHasta, 20, 75);

            please = [array[i].Nro_Contrato, array[i].Cliente, array[i].Monto, array[i].Plan, array[i].Interés, array[i].Fecha_Inicio, array[i].Cobro, array[i].Usuario, array[i].Estado];
        }
        else if ($.trim(repSolicitado) == "Vencimiento en el día" || $.trim(repSolicitado) == "Cuotas en Mora + 30 Días" || $.trim(repSolicitado) == "Cuotas vencidas") {

            cantV = $('#cantCtasVenc').val();
            motnDeu = $('#cantdeuda').val();

            doc.text("Cantidad de cuotas vencidas: " + cantV, 20, 70);
            doc.text("Monto total de deuda: " + motnDeu, 20, 75);


            please = [array[i].Cliente_Id, array[i].Cliente, array[i].Contrato, array[i].Nro_Cuota, array[i].Importe_Cuota, array[i].Saldo_Impago, array[i].Vencimiento];
        }
        else if ($.trim(repSolicitado) == "Rango de vencimiento" ) {

            cantV = $('#cantCtasVenc').val();
            motnDeu = $('#cantdeuda').val();

            doc.text("Cantidad de cuotas vencidas: " + cantV, 20, 70);
            doc.text("Monto total de deuda: " + motnDeu, 20, 75);


            please = [array[i].Cliente_Id, array[i].Cliente, array[i].Contrato, array[i].Nro_Cuota, array[i].Importe_Cuota, array[i].Saldo_Impago, array[i].Vencimiento];
        }
        else if ($.trim(repSolicitado) == "Cobranza del día") {

            cantCobro = $('#cantTotDia').val();
            motnCobr = $('#montoTotDia').val();

            doc.text("Cantidad de cobros realizados en el día de la fecha: " + cantCobro, 20, 75);
            doc.text("Monto cobrado en el día de la fecha: " + motnCobr, 20, 80);

            please = [array[i].Contrato, array[i].Cliente, array[i].Cuota, array[i].Importe, array[i].Recibo, array[i].Usuario];
        }
        else if ($.trim(repSolicitado) == "Préstamos otorgados") {

            cantP = $('#cantTotPrest').val();
            motnCobr = $('#montoTotPrest').val();

            doc.text("Cantidad de préstamos para la venta de motos realizados en el día de la fecha: " + cantP, 20, 70);
            doc.text("Monto entregado en el día de la fecha: " + motnCobr, 20, 75);

            please = [array[i].Contrato, array[i].Cliente, array[i].Plan, array[i].Monto_Solicitado, array[i].Tipo, array[i].Usuario];
        }
        datos.push(please);

    }
    if ($.trim(repSolicitado) == "Listado de Clientes" ) {
        doc.autoTable(columns, datos,
            {
                margin: { left: 20, right: 20, top: 80, bottom: 35 },
                didDrawPage: function (datos) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    datos.settings.margin.top = 20;
                }
            }
        );
    }
    else if ($.trim(repSolicitado) == "Préstamos activos") {
        doc.autoTable(columns, datos,
            {
                margin: { left: 20, right: 20, top: 80, bottom: 35 },
                didDrawPage: function (datos) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    datos.settings.margin.top = 20;
                }
            }
        );
        doc.addPage();
        doc.setFontSize(20);
        doc.text("Inofrmes Gráficos", 20, 30);
        doc.setFontSize(16);
        doc.text("Cantidad de préstamos por mes", 20, 40);
        html2canvas($("#prestamosCantidad"), {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL(
                    'image/png');
                //var doc = new jsPDF('p', 'mm', 'a3', true);
                doc.addImage(imgData, 'PNG', 20, 45, 240, 180);
                //doc.save('sample-file.pdf');
            }
        });
    }
    else if ($.trim(repSolicitado) == "Cobro del mes") {
        doc.autoTable(columns, datos,
            {
                margin: { left: 20, right: 20, top: 80, bottom: 35 },
                didDrawPage: function (datos) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    datos.settings.margin.top = 20;
                }
            }
        );
        doc.addPage();
        doc.setFontSize(20);
        doc.text("Informe Gráfico", 20, 30);
        doc.setFontSize(16);
        doc.text("Ingresos por día", 20, 40);
        html2canvas($("#montosXmes"), {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL(
                    'image/png');
                //var doc = new jsPDF('p', 'mm', 'a3', true);
                doc.addImage(imgData, 'PNG', 20, 45, 240, 180);
                //doc.save('sample-file.pdf');
            }
        });

    }else if ($.trim(repSolicitado) == "Historial de Cliente") {
        doc.autoTable(columns, datos,
            {
                margin: { left: 20, right: 20, top: 140, bottom: 30 },
                didDrawPage: function (datos) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    datos.settings.margin.top = 20;
                }
            }
        );
    }
    else if ($.trim(repSolicitado) == "Simulación de Préstamo") {
        doc.autoTable(columns, datos,
            {
                margin: { left: 20, right: 20, top: 95, bottom: 35 },
                didDrawPage: function (datos) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    datos.settings.margin.top = 20;
                }
            }
        );
    }
    else if ($.trim(repSolicitado) == "Cobranza del día" || $.trim(repSolicitado) == "Préstamos otorgados") {
        fecha = $('#idFecha').val();
        doc.text("Fecha elegida: " + fecha, 20, 70);
        doc.autoTable(columns, datos,
            {
                margin: { left: 20, right: 20, top: 85, bottom: 35 },
                didDrawPage: function (datos) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    datos.settings.margin.top = 20;
                }
            }
        );



    }
    else if ($.trim(repSolicitado) == "Vencimiento en el día" || $.trim(repSolicitado) == "Cuotas en Mora + 30 Días" || $.trim(repSolicitado) == "Cuotas vencidas") {
        fecha = $('#idFecha').val();
        doc.text("Fecha elegida: " + fecha, 20, 65);
        doc.autoTable(columns, datos,
            {
                margin: { left: 20, right: 20, top: 80, bottom: 35 },
                didDrawPage: function (datos) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    datos.settings.margin.top = 20;
                }
            }
        );
    }
    else if ($.trim(repSolicitado) == "Rango de vencimiento" ) {
        fecha1 = $('#idFechaIni').val();
        fecha2 = $('#idFechaFin').val();
        doc.text("Rango contemplado: " + fecha1 + "   -   " + fecha2, 20, 65);
        doc.autoTable(columns, datos,
            {
                margin: { left: 20, right: 20, top: 80, bottom: 35 },
                didDrawPage: function (datos) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    datos.settings.margin.top = 20;
                }
            }
        );
    }

    const pageCount = doc.internal.getNumberOfPages();
    // For each page, print the page number and the total pages
    for (var i = 1; i <= pageCount; i++) {
        // Go to page i
        doc.setPage(i);
        //Print Page 1 of 4 for example
        doc.text('Page ' + String(i) + ' of ' + String(pageCount), 300 - 20, 400 - 30, null, null, "right");
    }

    doc.save('Rpt' + repSolicitado + output + '.pdf');
    //var ms = new System.IO.MemoryStream();
    //PdfWriter.GetInstance(doc, ms);
    //doc.Open();
});
function limpiarCliente() {
    $('#idCli').val('');
    $('#nombre').val('');
    $('#docume').val('');
    $('#telef').val('');
    $('#apellido').val('');
    $('#cuit').val('');
    $('#mail').val('');

}
function limpiarSolicitante() {
    $('#idSilumacion').val('');
    $('#nombreSim').val('');
    $('#montoS').val('');
    $('#interesS').val('');
    $('#plazoS').val('');
    $('#valorCuoS').val('');
}
function limpiarFecha() {
    $('#idFecha').val('');
}

function limpiarFechaDoble() {
    $('#idFechaIni').val('');
    $('#idFechaFin').val('');
}
function cargarComboA() {

    $.ajax({
        url: "/Reporte/cargaAnios",
        type: "Post",
        success: function (result) {

            $("#añosPrestamos")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pDescripcion);
                $("#añosPrestamos").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
function cargarComboM() {

    $.ajax({
        url: "/Reporte/cargaAniosCuotas",
        type: "Post",
        success: function (result) {

            $("#añosCuotas")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pDescripcion);
                $("#añosCuotas").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}

function lanzadera() {
    cargarComboM();
    cargarComboA();
}
window.onload = lanzadera();