angular.module('menuAngular', [])
$(document).ready(function () {

    $('#modalCLiente').on('hidden.bs.modal', function () {
        // do something here
        var html = '';
        $('#Cargartabla').html(html);
        $('#palabra').val('');
    })
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

    $("#montoFinal").on({
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
                $('#msjCarga2').css({ 'display': '' });

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
                        $('#msjCarga2').css({ 'display': 'none' });

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




    $('#btnBuscaMoto').click(function () {

        var palabrita = $('#motocicleta').val();
        //$(".btnSubir").prop("disabled", true);
        if ($.trim(palabrita) !== "") {
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
            Swal.fire({ title: 'Debe definir un término a buscar', icon: 'warning' });
        }

    });


    $('#btnCancel').click(function () {
        window.location = "/Prestamo/PresAlta";
    });



    var cuotaTotal;
    $('.btnCargaTable').click(function () {

        var formContainer = {
            pMontoSolicitado: $('#montoFinal').val(),
            pPlan: $('#cant').val(),
            pInteres: $('#porce').val(),
            pDiaVencimiento: $('#dia').val(),
            pTipoCobro: $('#tipoVenc').val(),
            pFechaPrimeraCuota: $('#primera').val()
        };
        var cap = '';
        var inte = 0;
        var cuota = 0;
        if (validaCampos() === true) {

            bloaquearCosas();

            $('#btnCargaTable').css({ 'display': 'none' });
            $('#msjCarga').css({ 'display': '' });

            $.ajax({
                url: "/Prestamo/creacionTabla",
                data: formContainer,
                type: "Post",
                success: function (result) {
                    $('#btnCargaTable').css({ 'display': '' });
                    $('#msjCarga').css({ 'display': 'none' });
                    var html = '';
                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            cuota = parseFloat(result[i].capital) + parseFloat(result[i].interes);
                            inte = parseFloat(result[i].interes);
                            var cap = parseFloat(result[i].capital);
                            html += '<tbody><td style="width:15px; text-align:center">' + result[i].nroCuota + '</td>' +
                                '<td style="text-align:right">$ ' + formateoPuntosyComas(cap.toFixed(2)) + '</td>' +
                                '<td style="text-align:right">$ ' + formateoPuntosyComas(parseFloat(result[i].interes).toFixed(2)) + '</td>' +
                                '<td style="text-align:right">$ ' + formateoPuntosyComas(cuota.toFixed(2)) + '</td>' +
                                '<td style="text-align:center">' + result[i].fecha + '</td>' +
                                '</tr></tbody>';

                            cuotaTotal = parseFloat(result[0].capital) + parseFloat(result[0].interes);
                            cap += parseFloat(result[i].interes);
                        }
                        var todo = '';
                        var superior = '<thead><tr><th style="width:15px">Nro Cuota</th><th> Capital</th><th>Interés</th><th>Cuota Final</th><th>Fecha de Cobro</th></tr><tr></thead>';
                        todo = superior + html;
                        $('#tablaConPrestamo').html(todo);
                        $('#intF').val('$ ' + formateoPuntosyComas(parseFloat(result[0].intFinal).toFixed(2)));
                        var capi = $('#montoFinal').val();
                        //var capitalSolo = parseFloat(capi).toFixed(2);
                        //capitalSolo = capitalSolo.toFixed(2);
                        $('#capF').val('$ ' + formateoPuntosyComas(parseFloat(result[0].capFinal).toFixed(2)));
                        $('#cap').val('$ ' + capi);
                        $('#totalCuota').val('$ ' + formateoPuntosyComas(parseFloat(cuotaTotal).toFixed(2)));
                        $('#infoInferior').show();
                        $('#botones').show();

                    }
                    else {


                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Error...');
                }
            });
        }

    });


    $("#btnConfirmacion").click(function () {
        desbluqearCosas();
        $('#btnConfirmacion').css({ 'display': 'none' });
        $('#btnCancel').css({ 'display': 'none' });
        $('#msjCargando').css({ 'display': '' });

        var form = $('#frm-enviar');
        var form_data = new FormData(document.getElementById("frm-enviar"));

        $.ajax({
            dataType: 'JSON',
            type: 'POST',
            url: form.attr('action'),
            data: form_data,
            processData: false,
            contentType: false,
            success: function (data) {
                var resultado = data;
                bloaquearCosas();
                $('#btnConfirmacion').css({ 'display': '' });
                $('#btnCancel').css({ 'display': '' });
                $('#msjCargando').css({ 'display': 'none' });
                if ($.trim(resultado) == "Exito") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: 'El  préstamo se registró correctamente!',
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            imprimirContrato();
                            window.location = "/Prestamo/PresAlta";
                        }
                    });

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El proceso de registro no se completó!',
                    })
                }
            }
        });

        return false;
    })

});
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
function tomarCliente() {
    //alert("fue click");
    //var nom = "";
    //var primera = "";
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


                $.ajax({
                    url: "/Prestamo/nroPrestamo",
                    type: "get",
                    success: function (result) {

                        nroPrestamo = result;
                        $('#credito').val(nroPrestamo);
                        $('#nroC').val(nroPrestamo);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error...');
                    }
                });

                $('#txtTel').val(tel.textContent);
                $('#docu').val(doc.textContent);
                $('#idCli').val(idCli.textContent);
                $('#txtDenominacion').val(columna2.textContent + ", " + nom.textContent);

                $('#modalCLiente').modal('hide');

            }
        }
    }

}

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

                $('#moto').val(nom.textContent);
                $('#motoID').val(idpro.textContent);
                $('.monto').val(precio.textContent);
                $('#buscarMoto').modal('hide');
            }
        }
    }
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
                    $('#montoFinal').val(valorFinal);
                }
                else {
                    Swal.fire('El monto de seña no puede ser superior al valor del producto.');
                    var cero = 0
                    cero = parseFloat(cero).toFixed(2);
                    cero = cero.replace('.', ',');
                    $('#entregaDinero').val(cero);
                    $('#montoFinal').val(costoMotoOriginal);
                    return false;
                }

            }
            else {
                Swal.fire('El monto a entregar debe ser superior a 0 (CERO).');
                $('#montoFinal').val(costoMotoOriginal);

                return false;
            }
        }
        else {
            var cero = 0
            cero = parseFloat(cero).toFixed(2);
            cero = cero.replace('.', ',');
            $('#entregaDinero').val(cero);
            $('#montoFinal').val(costoMotoOriginal);

            return false;
        }

    }
    else {
        Swal.fire('Debe seleccionar una Moto');
        var numero = $('#entregaDinero').val("");
        return false;
    }

    

}

function desbluqearCosas() {
    $('#entrega').attr('disabled', false);
    $('#montoFinal').attr('disabled', false);
    $('#entregaDinero').attr('disabled', false);
    $('#cant').attr('disabled', false);
    $('#dia').attr('disabled', false);
    $('#tipoVenc').attr('disabled', false);
    $('#porce').attr('disabled', false);
    $('#primera').attr('disabled', false);
}
function bloaquearCosas() {
    $('#entrega').attr('disabled', true);
    $('#montoFinal').attr('disabled', true);
    $('#entregaDinero').attr('disabled', true);
    $('#cant').attr('disabled', true);
    $('#dia').attr('disabled', true);
    $('#tipoVenc').attr('disabled', true);
    $('#porce').attr('disabled', true);
    $('#primera').attr('disabled', true);
    $('#btnCargaTable').attr('disabled', true);
}

function validaCampos() {

    var monto = $('#montoFinal').val();
    var cantCuotas = $('#cant').val();
    var tasa = $('#porce').val();
    var prim = $('#primera').val();
    var di = $('#dia').val();
    var numContrato = $('#credito').val();
    var fecha = $('#entrega').val();
    var primerFecha = $('#primera').val();
    var moto = $('#moto').val();
    var VENC = $('#tipoVenc').val();
    validado = true;
    //validamos campos
    if ($.trim(numContrato) == "") {
        Swal.fire({ title: 'No ha definido un cliente', icon: 'warning'});
        validado = false;
        return false;
    }
    if ($.trim(monto) == "") {
        Swal.fire({ title: 'No ha definido el el Monto a Financiar', icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        if (parseFloat(monto) <= 0) {
            Swal.fire({ title: 'Se debe definir un monto superior a 0 (CERO)', icon: 'warning' });
            $('#montoFinal').val('');
            validado = false;
            return false;
        }
    }
    if ($.trim(cantCuotas) == "") {
        Swal.fire({ title: "No ha ingresado la cantidad de Cuotas del Plan", icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        if (parseFloat(cantCuotas) <= 0) {
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
        if (parseFloat(tasa) <= 0) {
            Swal.fire({ title: 'El porcentaje de interés debe ser superior a 0 (CERO)', icon: 'warning' });
            $('#porce').val('');
            validado = false;
            return false;
        }
    }
    if ($.trim(prim) == "") {
        Swal.fire({ title: "No ha definido la fecha de pago de la primera Cuota", icon: 'warning'});
        validado = false;
        return false;
    }
    if ($.trim(di) == "") {
        Swal.fire({ title: "No ha definido el dia de Vencimiento de las cuotas", icon: 'warning' });
        validado = false;
        return false;
    }
    else {
        if (parseFloat(di) <= 0 || parseFloat(di) > 30) {
            Swal.fire({ title: "El día de vencimiento debe ser mayor a 0 (CERO) y menor a 30 (TREINTA)", icon: 'warning' });
            validado = false;
            return false;
        }
    }
    if ($.trim(fecha) == "") {
        Swal.fire({ title:"No ha definido la fecha de concreción del prestamo", icon: 'warning'});
        validado = false;
        return false;
    }
    if ($.trim(primerFecha) == "") {
        Swal.fire({ title: "No ha definido la fecha en que se efectuará el pago de la primera cuota", icon: 'warning' });
        validado = false;
        return false;
    }
    if ($.trim(VENC) == "") {
        Swal.fire({ title: "No ha definido el tipo de vencimiento", icon: 'warning' });
        validado = false;
        return false;
    }
    if ($.trim(moto) == "") {
        Swal.fire({ title: "No ha definido la Moto seleccionada", icon: 'warning' });
        validado = false;
        return false;
    }
    return validado;
}
function imprimirContrato() {

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
    var calle1 = $('#calleCli').val();
    var montoSolicitado = $('#montoFinal').val();
    var montoSolicitadoOriginal = $('#montoFinal').val();
    montoSolicitado = montoSolicitado.replace(".", "");
    montoSolicitado = montoSolicitado.split(',');
    montoSolicitado = montoSolicitado[0];
    var Presfecha = $('#entrega').val();
    var PresfechaPrimera = $('#primera').val();
    var plan = $('#cant').val();
    var cuotaFinal = $('#totalCuota').val();
    var cuotaFinalOriginal = $('#totalCuota').val();
    cuotaFinal = cuotaFinal.replace(".", "");
    cuotaFinal = cuotaFinal.replace(".", "");
    cuotaFinal = cuotaFinal.split(',');
    cuotaFinal = cuotaFinal[0];
    cuotaFinal = cuotaFinal.split(' ');
    cuotaFinal = cuotaFinal[1];

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
    doc.setFontSize(25);
    //doc.text('<<motPres>>', 30, 25);

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
    //fecha2 = result[1].dpPrimeraCuota;
    //var codigo_fecha2 = parseInt(fecha2.replace("/Date(", "").replace(")/", ""));
    output = new Date(output).toLocaleDateString("default", { year: "numeric", month: "2-digit", day: "2-digit" });
    //output = new Date(output).toLocaleDateString("es-AR");
    doc.setFontSize(12);
    doc.text(output, 92, 35)
    var text = 'Entre el Sr. "FULANO" D.N.I N° 00.000.000, en adelante "EL MUTUARIO" con domicilio real en calle CALLE 2 B° UN BARRIO, de la Ciudad de Córdoba, y el Sr. ' + cliente + '___________________ en adelante "EL MUTUARIO", han convenido en celebrar el presente CONTRATO DE MUTUO, sujeto a las cláusulas que a continuación se detallan y a lo dispuesto por los Arts. 1525 correlativos y concordantes del Código Civil y Comercial de la Nación. - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - -.';
    doc.text(text, 27, 45, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var text1 = 'PRIMERA: "EL MUTANTE" cede en préstamo y hace entrega en este acto la suma de pesos ' + montoLetra + ' ($' + montoSolicitadoOriginal + ') moneda Argentina a "El MUTUARIO" y éste acepta.';
    doc.text(text1, 27, 85, { align: 'justify', lineHeightFactor: 0.5, maxWidth: 160 });
    var text2 = 'SEGUNDA: El término del presente CONTRATO DE MUTUO es el ' + Presfecha + ', y la forma de pago se pacta en el siguiente plazo: ' + planLetra + ' (' + plan + ') cuotas consecutivas y mensuales, pagaderas cada cuota del 1 al 10 de cada mes a partir del mes ' + PresfechaPrimera + ' inclusive, siendo cada cuota por el monto de pesos ' + cuotaLetra + ' (' + cuotaFinalOriginal + '), con más los intereses pactados en el caso de mora o atraso.';
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

function lanzadera() {
    cargarCombo()
}

window.onload = lanzadera();