angular.module('menuAngular', [])
$(document).ready(function () {

    if (screen.width > 450) {
        $('.contenedorMinimizado').removeClass("contenedorMinimizado").addClass("contenedor");
        $('#botones').css('margin-left', 0);

    }
    if (screen.width < 450) {

        var altura = $('.btn-menu').offset().top;

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > altura) {
                $('.btn-menu').addClass('menu-fixed');
            } else {
                $('.btn-menu').removeClass('menu-fixed');
            }
        });

        $('.contenedor').removeClass("contenedor").addClass("contenedorMinimizado");
        $('#tablero').css('margin-left', 0);
        $('#botones').css('margin-left', 100);
    }

    $(window).resize(function () {
        if (screen.width > 450) {
            $('.contenedorMinimizado').removeClass("contenedorMinimizado").addClass("contenedor");
            $('#botones').css('margin-left', 0);
        }
        if (screen.width < 450) {
            var altura = $('.btn-menu').offset().top;

            $(window).on('scroll', function () {
                if ($(window).scrollTop() > altura) {
                    $('.btn-menu').addClass('menu-fixed');
                } else {
                    $('.btn-menu').removeClass('menu-fixed');
                }
            });

            $('.contenedor').removeClass("contenedor").addClass("contenedorMinimizado");
            $('#tablero').css('margin-left', 0);
            $('#botones').css('margin-left', 100);
        }
    });




    $('#btnBuscar').click(function () {

        var combo = $('#marcas').val();
        var pala = $('#parametro').val();

    if ($.trim(combo) == "" && $.trim(pala) == "") {
        swal.fire({ title: 'Debe definir un parámetro de búsqueda', icon: 'waring' });
        return false
    }
    else {
        $('#msjCarga').css({ 'display': 'block' });
        $('#btnBuscar').css({ 'display': 'none' });


        if (combo !== "") {
            busCombo();
        }
        else {
            busPalabra();
        }

        $('#parametro').val('');
        $('#marcas').val('');

    }
       
    });

    //$('#motalInfo').on('shown.bs.modal', function (event) {



    //    $('#modalTitle').val();
    //})

});

function busCombo() {
    var combo = $('#marcas').val();
    var body = '';

    var parametros =
    {
        marca: combo
    };

    $.ajax({
        url: "/Producto/listadoProductos",
        data: parametros,
        type: "POST",
        success: function (result) {
            var head = '<thead><tr><th hidden = "true"></th><th>Nombre</th><th>Marca</th><th>Modelo</th><th></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th></th><th hidden = "true"></th><th hidden = "true"></th><th style="text-align:center">Acción</th></tr></thead>';
            //var body = '';
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    ////var myURL = '@Url.Action("convertirImg", "Producto", new { id = ' + result[i].idProducto + ' })';
                    //var myURL = '@Url.Action("convertirImg", "Producto")/' + result[i].idProducto + '/';
                    //var miniatura = result[i].pRuta;
                    //var completa = result[i].pImage;
                    //var imgsrc = "data:image/jpg;base64,[" + miniatura + "]";
                    ////imagen minuatura conversion
                    //var Imagen_Bin_String = bin2string(miniatura);
                    //var Imagen_Base64 = btoa(Imagen_Bin_String);
                    ////imagen completa
                    //var Imagen_Bin_String1 = bin2string(completa);
                    //var Imagen_Base641 = btoa(Imagen_Bin_String1);
                    ////cadena miniatura
                    //var stringSrcM = "data:image/jpg;base64," + Imagen_Base64;
                    ////cadena img completa
                    //var stringSrcC = "data:image/jpg;base64," + Imagen_Base641;


                    body += '<tbody><tr><td hidden = "true">' + result[i].idProducto + '</td>' +
                        '<td>' + result[i].pNombre + '</td>' +
                        '<td>' + result[i].pMarca + '</td>' +
                        '<td>' + result[i].pModelo + '</td>' +
                        '<td><img src="' + result[i].pImgMiniatura + '" width="250"/></td>' +
                        '<td hidden = "true">' + result[i].pArranque + '</td>' +
                        '<td hidden = "true">' + result[i].pCaja + '</td>' +
                        '<td hidden = "true">' + result[i].pCilindrada + '</td>' +
                        '<td hidden = "true">' + result[i].pCombustible + '</td>' +
                        '<td hidden = "true">' + result[i].pKilometros + '</td>' +
                        '<td hidden = "true">' + result[i].pMotor + '</td>' +
                        '<td hidden = "true">' + result[i].pPrecio + '</td>' +
                        '<td hidden = "true">' + result[i].pImgMiniatura + '</td>' +
                        '<td hidden = "true">' + result[i].pTipo + '</td>' +
                        '<td hidden = "true">' + result[i].pColor + '</td>' +
                        '<td style="text-align:center"><a title="Ver" style="margin:5px;" onClick="cargaData();"  class="info btn btn-info">' +
                        '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-eye" viewBox = "0 0 16 16">' +
                        '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>' +
                        '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></a>' +
                        '<a title="Editar" style="margin:5px;" href="/Producto/ProEditar?idProducto=' + result[i].idProducto + '" class="btn btn-success">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
                        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
                        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>' +
                        '<a title="Eliminar" style="margin:5px;" href="/Producto/ProEliminar?idProducto=' + result[i].idProducto + '" class="btn btn-danger">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2" viewBox="0 0 16 16">' +
                        '<path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/></svg></a></td></tr></tbody>';

                }
                $('#cargarTabla').html(head + body);
                $('#sinResult').html('');
            }
            else {
                $('#cargarTabla').html('');
                var htmlSinNada = '<h5>' + "No se encontraron resultados" + '</h5>';
                $('#sinResult').html(htmlSinNada);
            }
            $('#msjCarga').css({ 'display': 'none' });
            $('#btnBuscar').css({ 'display': 'block' });

        }
    });
}

function cargaData() {

    var nombre = '';
    var modelo = '';
    var km = '';
    var precio = '';
    var cilindrada = '';
    var combustible = '';
    var motor = '';
    var marca = '';
    var tipo = '';
    var caja = '';
    var arranque = '';
    var img = '';
    var imgMini = '';
    var mini = '';
    var color = '';
    var a = document.querySelectorAll(".info");
    for (var b in a) { //Como nos devuelve un array iteramos
        var c = a[b];
        if (typeof c == "object") { 
            c.onclick = function () {
                var td = this.offsetParent;
                var tr = td.parentElement;
                nombre = tr.children[1];
                marca = tr.children[2];
                modelo = tr.children[3];
                imgMini = tr.children[4];
                arranque = tr.children[5];
                caja = tr.children[6];
                cilindrada = tr.children[7];
                combustible = tr.children[8];
                km = tr.children[9];
                motor = tr.children[10];
                precio = tr.children[11];
                img = tr.children[12];
                mini = tr.children[12];
                tipo = tr.children[13];
                color = tr.children[14];


                var htmlT = '<h5>' + nombre.textContent + '</h5>';
                $('#modalTitle').html(htmlT);

                var htmlC = '<p><strong>Marca: </strong>' + marca.textContent + '</p>' + '<p><strong>Tipo: </strong>' + tipo.textContent + '</p>' + '<p><strong>Año : </strong>' + modelo.textContent + '</p>' + '<p><strong>Precio : </strong>$' + precio.textContent + ' ARS</p>' + '<p><strong>Cilindrada : </strong>' + cilindrada.textContent + '</p>';  
                var htmlC2 = '<p><strong>Motor : </strong>' + motor.textContent + '</p>' + '<p><strong>Combustible : </strong>' + combustible.textContent + '</p>' + '<p><strong>Kilometraje : </strong>' + km.textContent + '</p>' + '<p><strong>Arranque : </strong>' + arranque.textContent + '</p>' + '<p><strong>Caja : </strong>' + caja.textContent + '</p><p><strong>Color : </strong>' + color.textContent + '</p>';
                $('#parrafo').html(htmlC);
                $('#parrafo2').html(htmlC2);
                var htmlI = '<img src="' + mini.textContent + '" width="200"/>'
                $('#miniImg').html(htmlI);
                $('#motalInfo').modal('show');
            }
        }
    }
}

function busPalabra() {
    var txt = $('#parametro').val();
    var body = '';
    var parametro =
    {
        name: txt
    };

    $.ajax({
        url: '/Producto/listadoProductos2',
        data: parametro,
        type: 'POST',
        success: function (result) {
            var head = '<thead><tr><th hidden = "true"></th><th>Nombre</th><th>Marca</th><th>Modelo</th><th></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th hidden = "true"></th><th style="text-align:center">Acción</th></tr></thead>';
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    //var myURL = '@Url.Action("convertirImg", "Producto", new { id = ' + result[i].idProducto + ' })';
                    //var myURL = '@Url.Action("convertirImg", "Producto")/' + result[i].idProducto + '/';
                    //var miniatura = result[i].pRuta;
                    //var completa = result[i].pImage;
                    //var imgsrc = "data:image/jpg;base64,[" + miniatura + "]";
                    ////imagen minuatura conversion
                    //var Imagen_Bin_String = bin2string(miniatura);
                    //var Imagen_Base64 = btoa(Imagen_Bin_String);
                    ////imagen completa
                    //var Imagen_Bin_String1 = bin2string(completa);
                    //var Imagen_Base641 = btoa(Imagen_Bin_String1);
                    ////cadena miniatura
                    //var stringSrcM = "data:image/jpg;base64," + Imagen_Base64;
                    ////cadena img completa
                    //var stringSrcC = "data:image/jpg;base64," + Imagen_Base641;


                    body += '<tbody><tr><td hidden = "true">' + result[i].idProducto + '</td>' +
                        '<td>' + result[i].pNombre + '</td>' +
                        '<td>' + result[i].pMarca + '</td>' +
                        '<td>' + result[i].pModelo + '</td>' +
                        '<td><img src="' + result[i].pImgMiniatura + '" width="250"/></td>' +
                        '<td hidden = "true">' + result[i].pArranque + '</td>' +
                        '<td hidden = "true">' + result[i].pCaja + '</td>' +
                        '<td hidden = "true">' + result[i].pCilindrada + '</td>' +
                        '<td hidden = "true">' + result[i].pCombustible + '</td>' +
                        '<td hidden = "true">' + result[i].pKilometros + '</td>' +
                        '<td hidden = "true">' + result[i].pMotor + '</td>' +
                        '<td hidden = "true">' + result[i].pPrecio + '</td>' +
                        '<td hidden = "true">' + result[i].pImgMiniatura + '</td>' +
                        '<td hidden = "true">' + result[i].pTipo + '</td>' +
                        '<td hidden = "true">' + result[i].pColor + '</td>' +
                        '<td  style="text-align:center"><button type="button" title="Ver" onClick="cargaData();" style="margin:5px;" class="info btn btn-info">' +
                        '<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-eye" viewBox = "0 0 16 16">' +
                        '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>' +
                        '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></button>' +
                        '<a title="Editar" style="margin:5px;" href="/Producto/ProEditar?idProducto=' + result[i].idProducto + '" class="btn btn-success">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
                        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
                        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>' +
                        '<a title="Eliminar" style="margin:5px;" href="/Producto/ProEliminar?idProducto=' + result[i].idProducto + '" class="btn btn-danger">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2" viewBox="0 0 16 16">' +
                        '<path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/></svg></a></td></tr></tbody>';

                }
                $('#cargarTabla').html(head + body);
                $('#sinResult').html('');
            }
            else
            {
                $('#cargarTabla').html('');
                var htmlSinNada = '<h5>' + "No se encontraron resultados" + '</h5>';
                $('#sinResult').html(htmlSinNada);
            }
            $('#msjCarga').css({ 'display': 'none' });
            $('#btnBuscar').css({ 'display': 'block' });
        }
    });
}

function cargarComboMarca() {
    var pasar = {
        parametro: 2
    };

    $.ajax({
        url: "/Producto/cargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#marcas")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Buscar por Marca..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#marcas").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
function bin2string(array) {
    var result = "";
    for (var i = 0; i < array.length; ++i) {
        result += (String.fromCharCode(array[i]));
    }
    return result;
}

function cargar() {
    cargarComboMarca();
}

window.onload = cargar();