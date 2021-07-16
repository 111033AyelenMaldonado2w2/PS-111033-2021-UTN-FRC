angular.module('menuAngular', [])

$(document).ready(function () {

    $('#buscarMoto').on('hidden.bs.modal', function () {
        // do something here
        var html = '';
        $('#CargartablaMoto').html(html);
        $('#motocicleta').val('');
    })

    $("#precioMoto").on({
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
    //$("#entregaDinero").on({
    //    "focus": function (event) {
    //        $(event.target).select();
    //    },
    //    "keyup": function (event) {
    //        $(event.target).val(function (index, value) {
    //            return value.replace(/\D/g, "")
    //                .replace(/([0-9])([0-9]{2})$/, '$1,$2')
    //                .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    //        });
    //    }
    //});
    $("#montoSimular").on({
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



    $('#btnBuscaMoto').click(function () {

        var palabrita = $('#motocicleta').val();
        //$(".btnSubir").prop("disabled", true);
        if (palabrita !== "") {

            $('#btnBuscaMoto').css({ 'display': 'none' });
            $('#msjCarga3').css({ 'display': '' });
        var params = {
            palabra: $('#motocicleta').val(),

        };
        var result = [];
        $.ajax({
            url: "/Producto/cargaDatosConFiltro",
            data: params,
            type: "Post",
            success: function (result) {

                var html = '';
                var cabecera = '<thead><tr><th>Nombre</th><th>Modelo</th><th>Marca</th><th></th><th hidden = "true"></th><th hidden = "true"></th><th></th></tr><tr></thead>';
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        html += '<tbody><td>' + result[i].cpNombre + '</td>' +
                            '<td>' + result[i].cpAnio + '</td>' +
                            '<td>' + result[i].cpMarca + '</td>' +
                            '<td><img src="' + result[i].cpImgMIni + '" style="width: 50px;"></td>' +
                            '<td hidden="true">' + result[i].cpIdProd + '</td>' +
                            '<td hidden="true">' + result[i].cpPrecio + '</td>' +
                            '<td>' + '<a class="tomada" id="abc" onClick="tomarMoto();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</td>' +
                            '</tr></tbody>';
                    }
                    $('#CargartablaMoto').html(cabecera + html);
                    $("#motocicleta").val("");
                    $('#CargartablaMoto').show();
                }
                else {
                    $('#CargartablaMoto').show();
                    html = '<h4>' + "No se encontraron registros" + '</h4>';
                    $('#CargartablaMoto').html(html);
                    $("#motocicleta").val("");

                }
                $('#btnBuscaMoto').css({ 'display': '' });
                $('#msjCarga3').css({ 'display': 'none' });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error...');
            }
        });
        }
        else {
            Swal.fire('Debe definir un término a buscar');
        }

    });






    $('#cargarTablaSimulacíon').click(function () {

        if (validarParaTabla() === true) {

           var entrega = $('#entregaDinero').val();
            $('#jj').val('$ ' + entrega);

            var parametros =
            {
                sMontoData: $('#montoSimular').val(),
                sPlanData: $('#planSimular').val(),
                sInteresData: $('#interesSimular').val(),
            };

            $.ajax({
                url: "/Simulador/generarSimulacion",
                data: parametros,
                type: "POST",
                success: function (result) {
                    var head = '<thead><tr><th>Nro_Cuota</th><th>Capital</th><th>Interés</th><th>Valor_Cuota</th><th>Vencimiento</th><th>Capital_Amortizado</th></tr></thead>';
                    
                    var body = '';
                    var cta;
                    var plan;
                    var int;
                    var mont;
                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {

                            var fecha = result[i].sVencimiento;
                            var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
                            fecha = new Date(codigo_fecha).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
                            var capital = parseFloat(result[i].sCapitalCuota).toFixed(2);

                            body += '<tr><td style="text-align:center">' + result[i].sNroCuota + '</td>' +
                                '<td style="text-align:right"> $ ' + formateoPuntosyComas(capital) + '</td>' +
                                '<td style="text-align:right"> $ ' + formateoPuntosyComas(result[i].sInteresCuota) + '</td>' +
                                '<td style="text-align:right"> $ ' + formateoPuntosyComas(result[i].sValorCuota) + '</td>' +
                                '<td style="text-align:center">' + fecha + '</td>' +
                                '<td style="text-align:right"> $ ' + formateoPuntosyComas(parseFloat(result[i].sCapitalAmortizado).toFixed(2)) + '</td></tr>';

                            cta = parseFloat(result[0].sValorCuota).toFixed(2);
                            int = result[0].sInteresData;
                            plan = result[0].sPlanData;
                            mont = result[0].sMontoData;
                        }

                        $('#tablaPrestamo').html(head + '<tbody>' + body + '</tbody>');
                        $('#montoFinanciar').val('$' + mont);
                        $('#interesTotal').val(int);
                        $('#planCtas').val(plan);
                        $('#cuotaFinal').val('$' + formateoPuntosyComas(cta));
                        $('#prestamo').show();
                    }
                }
            });
        }
    });



    $('#btnGuararSimulacion').click(function () {

        var nombre = $('#nombreSolic').val()

        if ($.trim(nombre) != "") {
            var parametros =
            {
                sMontoData: $('#montoSimular').val(),
                sPlanData: $('#planSimular').val(),
                sInteresData: $('#interesSimular').val(),
                sNombreCliente: $('#nombreSolic').val(),
                sMoto: $('#moto').val(),
                sModelo: $('#anioMoto').val(),
                sPrecio: $('#precioMoto').val(),
                sEntrega: $('#entregaDinero').val(),
            };

            $.ajax({
                url: '/Simulador/GuardarSimulation',
                data: parametros,
                type: 'POST',
                success: function (result) {
                    var r = result;
                    if ($.trim(r) == "Exito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'La simulación se almacenó correctamente!',
                            allowOutsideClick: false,
                        }).then((result) => {
                            $('#btnGuararSimulacion').attr('disabled', true);
                        });

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error al guardar la Simulación!',
                        })
                    }

                }
            });
        }
        else {
            Swal.fire({ title: 'Debe definir el nombre del Cliente.', icon: 'warning' });
            return false;
        }
        
    });



    $('#btnImprimir').click(function () {


        var nombre = $('#nombreSolic').val()

        if ($.trim(nombre) != "") {

            var doc = new jsPDF();
            doc.page = 1;
            var tabla = $('#tablaPrestamo').val()
            doc.setFontSize(30);
            doc.text('<<motPres>>', 30, 30);

            //doc.setLineWidth(1);
            //doc.line(30, 35, 180, 35);

            //doc.setLineWidth(1.5);
            //doc.line(30, 40, 180, 40);
            doc.setFontSize(20);
            doc.text("Simulación de Préstamo", 70, 50);

            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
            output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
            doc.setFontSize(12);
            doc.text(output, 92, 60)

            var obj = {};

            // Creamos un arreglo donde guardar nuestros valores
            var values = [];
            var key;
            var columns = [];
            var data = [];
            // Recorremos todos los elementos th
            $("#tablaPrestamo thead th").each(function (i, o) {
                // Obtenemos su respectivo texto
                key = $(this).text();
                // Le asignamos como llave nuestro texto
                // y le damos un valor vacío
                obj[key] = '';
            });

            // Reocrremos todos los elementos td
            $("#tablaPrestamo tbody td").each(function (i, o) {
                // Obtenemos su respectivo texto
                var value = $(this).text();
                // Agregamos nuestro valor al arreglo
                values.push(value);
            });

            var iterator = 0;
            var array = [];
            var rowsBody = $("#tablaPrestamo").find('tbody > tr');
            var rowsHead = $("#tablaPrestamo").find('thead > tr > th');
            for (var i = 0; i < rowsBody.length; i++) {
                var objt = {};
                for (var j = 0; j < rowsHead.length; j++)

                    objt[rowsHead[j].innerText] = rowsBody[i].getElementsByTagName('td')[j].innerText;
                array.push(objt);
            }
            for (var key in obj) {
                obj[key] = values[iterator];
                columns.push(key);
                iterator++;
            }
            var datos = [];
            var please = [];
            var columna = "Capital Amortizado";
            for (var i = 0; i < array.length; i++) {
                please = [array[i].Nro_Cuota, array[i].Capital, array[i].Interés, array[i].Valor_Cuota, array[i].Vencimiento, array[i].Capital_Amortizado];

                name = $('#nombreSolic').val();
                plazo = $('#planCtas').val();
                monto = $('#montoFinanciar').val();
                inte = $('#interesTotal').val();
                cuoTotal = $('#cuotaFinal').val();

                moto = $('#motoElegida').val();
                precioMoto = $('#precio').val();
                marca = $('#marcaMoto').val();
                modelo = $('#anioMoto').val();

                doc.text("Nombre: " + name, 20, 70);
                doc.setLineWidth(0.5);
                doc.line(40, 73, 180, 73);
                doc.text("Monto: " + monto, 20, 80);
                doc.text("Plazo: " + plazo + " Cuotas", 20, 86);
                doc.text("Moto seleccionada: " + moto, 20, 95);
                doc.text("Interés: " + inte + "%", 80, 80);
                doc.text("Cuota Completa: " + cuoTotal, 80, 86);
                doc.text("Precio: " + precioMoto, 20, 101);

                doc.text("Marca: " + marca, 120, 95);
                doc.text("Modelo: " + modelo, 120, 101);

                datos.push(please);
            }

            doc.autoTable(columns, datos,
                {
                    margin: { left: 20, right: 20, top: 110, bottom: 50 },
                    didDrawPage: function (datos) {
                        // Reseting top margin. The change will be reflected only after print the first page.
                        datos.settings.margin.top = 20;
                    }
                }
            );
            //doc.text(60, 285, 'Presupuesto válido por 7(SIETE) días desde su emisión');
            //doc.text(150, 285, 'Página ' + doc.page);

            const pageCount = doc.internal.getNumberOfPages();
            // For each page, print the page number and the total pages
            for (var i = 1; i <= pageCount; i++) {
                // Go to page i
                doc.setPage(i);
                //Print Page 1 of 4 for example
                doc.text('Presupuesto válido por 7(SIETE) días desde su emisión ', 210 - 20, 285 - 30, null, null, "right");
                doc.text('Page ' + String(i), 210 - 20, 290 - 30, null, null, "right");
            }

            doc.save('Simulación' + name + '.pdf');

        }
        else {
            Swal.fire({ title: 'Debe definir el nombre del Cliente.', icon: 'warning' });
            return false;
        }

    });


});

function tomarMoto() {
    var idpro;
    var nom;
    var a = document.querySelectorAll(".tomada");
    for (var b in a) {
        var c = a[b];
        if (typeof c == "object") {
            c.onclick = function () {
                var td = this.offsetParent;
                var tr = td.parentElement;
                nom = tr.children[0];
                idpro = tr.children[4];
                precio = tr.children[5];
                modelo = tr.children[1];
                marca = tr.children[2];

                $('#moto').val(nom.textContent);
                $('#anioMoto').val(modelo.textContent);
                $('#motoElegida').val(nom.textContent);
                $('#marcaMoto').val(marca.textContent);
                $('#precio').val(' $ ' + precio.textContent);
                $('#motoID').val(idpro.textContent);
                $('.monto').val(precio.textContent);
                $('#buscarMoto').modal('hide');
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

function valorArefian() {


    $(event.target).val(function (index, value) {
        return value.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{2})$/, '$1,$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    });

    var numero = $('#entregaDinero').val();

    numero = numero.replace('.', '');
    numero = numero.replace(',', '.');

    var moto = $('#moto').val();
    //monto ="";
    var costoMoto = $('#precioMoto').val();
    var costoMotoOriginal = $('#precioMoto').val();
    costoMoto = costoMoto.replace('.', '');
    costoMoto = costoMoto.replace(',', '.');

    if (moto != "") {
        if (numero != "") {
            if (numero >= 0) {
                if (parseFloat(costoMoto) > parseFloat(numero)) {
                    resta = parseFloat(costoMoto) - parseFloat(numero);
                    resta = parseFloat(resta).toFixed(2);
                    resta = resta.replace('.', ',');
                    resta = resta.split(',');
                    var decimal = resta[1];
                    var entero = resta[0];
                    entero = entero.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                    entero = entero.split('').reverse().join('').replace(/^[\.]/, '');
                    var valorFinal = entero + ',' + decimal;
                    //valorFinal = parseFloat(valorFinal).toFixed(2);
                    //valorFinal = valorFinal.replace('.', ',');
                    $('#montoSimular').val(valorFinal);
                }
                else {
                    Swal.fire('El monto de seña no puede ser superior al valor del producto.');
                    var cero = 0
                    cero = parseFloat(cero).toFixed(2);
                    cero = cero.replace('.', ',');
                    $('#entregaDinero').val(cero);
                    $('#montoSimular').val(costoMotoOriginal);
                    return false;
                }
                
            }
            else {
                Swal.fire('El monto a entregar debe ser superior a 0 (CERO).');
                $('#montoSimular').val(costoMotoOriginal);

                return false;
            }
        }
        else {
            var cero = 0
            cero = parseFloat(cero).toFixed(2);
            cero = cero.replace('.', ',');
            $('#entregaDinero').val(cero);
            $('#montoSimular').val(costoMotoOriginal);

            return false;
        }
        
    }
    else {
        Swal.fire('Debe seleccionar una Moto');
        var numero = $('#entregaDinero').val("");
        return false;
    }

}


function salir() {
    window.location = "/Simulador/Simulador"
}

function validarParaTabla() {
    var validar = true;
    var monto = $('#montoSimular').val();
    var interes = $('#interesSimular').val();
    var plazo = $('#planSimular').val();
    var moto = $('#moto').val();
    if ($.trim(moto) == "") {
        Swal.fire({ title: 'Debe definir una moto', icon: 'warning' });
        validar = false;
        return false;
    }
    if ($.trim(monto) == "") {
        Swal.fire({ title: 'Debe definir un monto a Simular', icon: 'warning' });
        validar = false;
        return false;
    }
    else {
        if (monto < 1) {
            Swal.fire({ title: 'El monto a definir debe ser superior a 1 (UNO)', icon: 'warning' });
            validar = false;
            ('#montoSimular').val('');
            return false;
        }
    }
    if ($.trim(interes) == "") {
        Swal.fire({ title: 'Debe definir el interés que desea aplicar.', icon: 'warning' });
        validar = false;
        return false;
    }
    else {
        if (interes < 1) {
            Swal.fire({ title: 'El interés a definir debe ser superior a 1 (UNO)', icon: 'warning' });
            validar = false;
            $('#interesSimular').val('');
            return false;
        }
    }
    if ($.trim(plazo) == "") {
        Swal.fire({ title: 'Debe definir el plan de cuotas que desea aplicar.', icon: 'warning' });
        validar = false;
        return false;
    }
    else {
        if (plazo < 1) {
            Swal.fire({ title: 'El plan de cuotas a definir debe ser superior a 1 (UNO)', icon: 'warning' });
            validar = false;
            $('#planSimular').val('');
            return false;
        }
    }
    return validar;
}