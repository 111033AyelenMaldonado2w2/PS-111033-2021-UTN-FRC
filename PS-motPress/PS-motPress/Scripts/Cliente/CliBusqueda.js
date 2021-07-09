angular.module('menuAngular', [])
$(document).ready(function () {

    $('#btnBuscar').click(function () {

        var txt = $('#parametro').val();
        var txt1 = $('#parametro2').val();

        if ($.trim(txt) == "" && $.trim(txt1) == "") {
            swal.fire({ title: 'Debe definir un parámetro para iniciar la búsqueda!', icon: 'warning' });
            return false
        }
        else {



            if (txt !== "") {
                busNombre();
            }
            else {
                busDoc();
            }

            $('#parametro').val('');
            $('#parametro2').val('');
        }

        

       

    });
});

    function busNombre()
    {
    var txt = $('#parametro').val();
    var codigo= 1;
        var body = '';
        var parametro =
        {
            name: txt,
            cod: codigo
        };
        $('#msjCarga').css({ 'display': 'block' });
        $('#btnBuscar').css({ 'display': 'none' });
        $.ajax({
            url: '/Cliente/listadoCliente',
            data: parametro,
            type: 'POST',
            success: function (result) {
                var depto = '';
                var pisoo = '';
                var head = '<thead><tr><th hidden = "true"></th><th>Nombre</th><th>Apellido</th><th>Documento</th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th style="text-align:center">Acción</th></tr></thead>';
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {

                        if ($.trim(result[i].cNroDpto) == "") {
                            depto = ' - ';
                        }
                        else {
                            depto = result[i].cNroDpto;
                        }
                        if ($.trim(result[i].cPiso) == "") {
                            pisoo = ' - ';
                        }
                        else {
                            pisoo = result[i].cPiso;
                        }

                        body += '<tbody><tr><td hidden = "true">' + result[i].cCliId + '</td>' +
                            '<td>' + result[i].cNombre + '</td>' +
                            '<td>' + result[i].cApellido + '</td>' +
                            '<td>' + result[i].cDocumento + '</td>' +
                            '<td hidden = "true">' + result[i].cCUIT + '</td>' +
                            '<td hidden = "true">' + result[i].cTel + '</td>' +
                            '<td hidden = "true">' + result[i].cEmail + '</td>' +
                            '<td hidden = "true">' + result[i].cCalle + '</td>' +
                            '<td hidden = "true">' + result[i].cAltura + '</td>' +
                            '<td hidden = "true">' + result[i].cPais + '</td>' +
                            '<td hidden = "true">' + result[i].cProvincia + '</td>' +
                            '<td hidden = "true">' + result[i].cLocalidad + '</td>' +
                            '<td hidden = "true">' + result[i].cBarrio + '</td>' +
                            '<td hidden = "true">' + depto + '</td>' +
                            '<td hidden = "true">' + pisoo + '</td>' +
                            '<td style="text-align:center"><a title="Ver" style="margin:5px;" onclick="cargaData();" class="info btn btn-info">' +
                            '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-eye" viewBox = "0 0 16 16">' +
                            '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>' +
                            '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></a>' +
                            '<a title="Editar" style="margin:5px;" href="/Cliente/CliEditar?cliId=' + result[i].cCliId + '" class="btn btn-success">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
                            '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
                            '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>' +
                            '<a title="Eliminar" style="margin:5px;" href="/Cliente/CliEliminar?cliId=' + result[i].cCliId + '" class="btn btn-danger">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2" viewBox="0 0 16 16">' +
                            '<path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/></svg></a></td></tr></tbody>';

                    }
                    $('#cargarTabla').html(head + body);
                    $('#sinResult').html('');
                }
                else {
                    var no = '<h4>' + "No se encontraron resultados" + '</h4>';
                    $('#cargarTabla').html('');
                    $('#sinResult').html(no);
                }
                $('#msjCarga').css({ 'display': 'none' });
                $('#btnBuscar').css({ 'display': 'block' });
            }
        });

    }

    function busDoc() {
        var txt = $('#parametro2').val();
        var codigo = 2;
        var body = '';
        var parametro =
        {
            name: txt,
            cod: codigo
        };
        $('#msjCarga').css({ 'display': 'block' });
        $('#btnBuscar').css({ 'display': 'none' });
        $.ajax({
            url: '/Cliente/listadoCliente',
            data: parametro,
            type: 'POST',
            success: function (result) {
                var depto = '';
                var pisoo = '';
                var head = '<thead><tr><th hidden = "true"></th><th>Nombre</th><th>Apellido</th><th>Documento</th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th style="text-align:center">Acción</th></tr></thead>';
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        if ($.trim(result[i].cNroDpto) == "") {
                            depto = ' - ';
                        }
                        else {
                            depto = result[i].cNroDpto;
                        }
                        if ($.trim(result[i].cPiso) == "") {
                            pisoo = ' - ';
                        }
                        else {
                            pisoo = result[i].cPiso;
                        }

                        body += '<tbody><tr><td hidden = "true">' + result[i].cCliId + '</td>' +
                            '<td>' + result[i].cNombre + '</td>' +
                            '<td>' + result[i].cApellido + '</td>' +
                            '<td>' + result[i].cDocumento + '</td>' +
                            '<td hidden = "true">' + result[i].cCUIT + '</td>' +
                            '<td hidden = "true">' + result[i].cTel + '</td>' +
                            '<td hidden = "true">' + result[i].cEmail + '</td>' +
                            '<td hidden = "true">' + result[i].cCalle + '</td>' +
                            '<td hidden = "true">' + result[i].cAltura + '</td>' +
                            '<td hidden = "true">' + result[i].cPais + '</td>' +
                            '<td hidden = "true">' + result[i].cProvincia + '</td>' +
                            '<td hidden = "true">' + result[i].cLocalidad + '</td>' +
                            '<td hidden = "true">' + result[i].cBarrio + '</td>' +
                            '<td hidden = "true">' + depto + '</td>' +
                            '<td hidden = "true">' + pisoo + '</td>' +
                            '<td style="text-align:center"><a title="Ver" style="margin:5px;" onclick="cargaData();" class="info btn btn-info">' +
                            '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-eye" viewBox = "0 0 16 16">' +
                            '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>' +
                            '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></a>' +
                            '<a title="Editar" style="margin:5px;" href="/Cliente/CliEditar?cliId=' + result[i].cCliId + '" class="btn btn-success">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
                            '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
                            '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>' +
                            '<a title="Eliminar" style="margin:5px;" href="/Cliente/CliEliminar?cliId=' + result[i].cCliId + '" class="btn btn-danger">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2" viewBox="0 0 16 16">' +
                            '<path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/></svg></a></td></tr></tbody>';

                    }
                    $('#cargarTabla').html(head + body);
                    $('#sinResult').html('');
                }
                else {
                    var no = '<h4>' + "No se encontraron resultados" + '</h4>';
                    $('#cargarTabla').html('');
                    $('#sinResult').html(no);
                }
                $('#msjCarga').css({ 'display': 'none' });
                $('#btnBuscar').css({ 'display': 'block' });
            }
        });
    }

    function cargaData() {

        var nombre = '';
        var apellido = '';
        var documento = '';
        var cuit = '';
        var tel = '';
        var email = '';
        var calle = '';
        var altura = '';
        var pais = '';
        var provincia = '';
        var localidad = '';
        var barrio = '';
        var piso = '';
        var nroDpto = '';
        var a = document.querySelectorAll(".info");
        for (var b in a) { //Como nos devuelve un array iteramos
            var c = a[b];
            if (typeof c == "object") {
                c.onclick = function () {
                    var td = this.offsetParent;
                    var tr = td.parentElement;
                    nombre = tr.children[1];
                    apellido = tr.children[2];
                    documento = tr.children[3];
                    cuit = tr.children[4];
                    tel = tr.children[5];
                    email = tr.children[6];
                    calle = tr.children[7];
                    altura = tr.children[8];
                    pais = tr.children[9];
                    provincia = tr.children[10];
                    localidad = tr.children[11];
                    barrio = tr.children[12];
                    nroDpto = tr.children[13];
                    piso = tr.children[14];



                    var htmlT = '<h5>' + apellido.textContent + ", " + nombre.textContent + '</h5>';
                    $('#modalTitle').html(htmlT);

                    var htmlC = '<p style="margin:0px;"><strong>Nombre Completo: </strong>' + apellido.textContent + ", " + nombre.textContent + '</p>' + '<p style="margin:0px;"><strong>Documento: </strong>' + documento.textContent + '</p>' + '<p style="margin:0px;"><strong>CUIT : </strong>' + cuit.textContent + '</p>' + '<p style="margin:0px;"><strong>Teléfono : </strong>' + tel.textContent + '</p>' + '<p style="margin:0px;"><strong>Email : </strong>' + email.textContent + '</p>';
                    var htmlCDerecha = '<p style="margin:0px;"><strong>Pais : </strong>' + pais.textContent + '</p>' + '<p style="margin:0px;"><strong>Provincia : </strong>' + provincia.textContent + '</p>' + '<p style="margin:0px;"><strong>Calle : </strong>' + calle.textContent + '</p>' + '<p style="margin:0px;"><strong>Piso : </strong>' + piso.textContent + '</p>';
                    var htmlCIzquierda = '<p style="margin:0px;"><strong>Localidad : </strong>' + localidad.textContent + '</p>' + '<p style="margin:0px;"><strong>Barrio : </strong>' + barrio.textContent + '</p>' + '<p style="margin:0px;"><strong>Altura : </strong>' + altura.textContent + '</p>' + '<p style="margin:0px;"><strong>Departamento : </strong>' + nroDpto.textContent + '</p>';
                    $('#datPersonal').html(htmlC);
                    $('#dataLocationDerecha').html(htmlCDerecha);
                    $('#dataLocationIzquierda').html(htmlCIzquierda);
                    $('#motalInfo').modal('show');
                }
            }
        }
    }