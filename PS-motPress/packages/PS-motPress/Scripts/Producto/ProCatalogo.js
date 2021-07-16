$(document).ready(function () {

    //$('#campo').on("keyup", function () {

    //    var value = $('#campo').val();
    //    var parametros = {
    //        palabra: value
    //    };
    //    $.ajax({
    //        url: '/Producto/cargaDatosConFiltro',
    //        data: parametros,
    //        type: 'POST',
    //        success: function (result) {
    //            $('#tarjetas').html('');
    //            if (result.length > 0) {
    //                for (var i = 0; i < result.length; i++) {

    //                    body += '<div class="zoom col-lg-6"><div class="card border-dark mb-3"><div class="card-header" id="nombre">' + result[i].cpNombre + '</div><div class="row"><div class="col-md-6"><img src=' + result[i].cpImgMIni + ' id="Imini" class="card-img-left" style="height: 150px;"></div><div class="col-md-6"><div class="card-text"><p><strong>Marca: </strong>' + result[i].cpMarca + '</p><p><strong>Categoria: </strong>' + result[i].cpTipo + '</p><p><strong>Precio: </strong>$' + result[i].cpPrecio + '</p><p><strong>Año: </strong>' + result[i].cpAnio + '</p><button class="btn btn-primary float-right" type="button" style="margin-right: 10px; margin-bottom: 10px;" data-toggle="modal" data-target="#moto-info" onclick="abrirModal(' + result[i].cpIdProd + ')">Leer Más</button></div></div></div></div></div>';


    //                }
    //                $('#tarjetas').html(body);
    //                //$('#sinResult').html('');
    //            }
    //        }
    //    });

    //});

    //var valor = $('#campo').val();
    //if ($.trim(valor) == "") {

        var txt = 1;
        var body = '';
        var parametro =
        {
            name: txt
        };

        $.ajax({
            url: '/Producto/cargaDatos',
            data: parametro,
            type: 'POST',
            success: function (result) {
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {

                        body += '<div class="zoom col-lg-6"><div class="card border-dark mb-3"><div class="card-header" id="nombre">' + result[i].cpNombre + '</div><div class="row"><div class="col-md-6"><img src=' + result[i].cpImgMIni + ' id="Imini" class="card-img-left" style="height: 150px;"></div><div class="col-md-6"><div class="card-text"><p><strong>Marca: </strong>' + result[i].cpMarca + '</p><p><strong>Categoria: </strong>' + result[i].cpTipo + '</p><p><strong>Precio: </strong>$' + result[i].cpPrecio + '</p><p><strong>Año: </strong>' + result[i].cpAnio + '</p><button class="btn btn-primary float-right" type="button" style="margin-right: 10px; margin-bottom: 10px;" data-toggle="modal" data-target="#moto-info" onclick="abrirModal(' + result[i].cpIdProd + ')">Leer Más</button></div></div></div></div></div>';


                    }
                    $('#tarjetas').html(body);
                    //$('#sinResult').html('');
                }
                else {
                    var no = '<h4>' + "No se encontraron resultados" + '</h4>';
                    $('#cargarTabla').html('');
                    $('#sinResult').html(no);
                }
            }
        });
    //}

        
    });

//});

//});

function abrirModal(value) {

    var valor = value;

    var parametros =
    {
        idProducto: valor
    };

    $.ajax({
        url: '/Producto/traerUnProducto',
        data: parametros,
        type: 'POST',
        success: function (result) {
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {

                    var nombre = result[0].cpNombre;
                    var img = result[0].cpImgMax;
                    var anio = result[0].cpAnio;
                    var motorr = result[0].pMotor;
                    var cilin = result[0].pCilindrada;
                    var arranque = result[0].pArranque;
                    var km = result[0].pKilometros;
                    var combus = result[0].pCombustible;
                    var box = result[0].pCaja;
                    var descrip = result[0].pDescripcion;
                }
                var titulo = '<h2>' + nombre + '</h2>';
                $('#title').html(titulo);
                var img = '<img src="' + result[0].cpImgMax + '" class="img-rounded img-responsive" style="height: 200px; margin-left: 100px;">'
                $('#planoImg').html(img);
                var des = '<p style="margin-bottom:5px"><strong>Año: </strong>' + anio + '</p><p style="margin-bottom:5px"><strong>Motor: </strong>' + motorr + '</p><p style="margin-bottom:5px"><strong>Cilindrada: </strong>' + cilin + '</p><p style="margin-bottom:5px"><strong>Encendido: </strong>' + arranque + '</p><p style="margin-bottom:5px"><strong>Combustible: </strong>' + combus + '</p><p style="margin-bottom:5px"><strong>Kilimetraje: </strong>' + km + '</p><p style="margin-bottom:5px"><strong>Caja: </strong>' + box + '</p>';
                $('#cuerpo').html(des);
                var fin = '<p style="padding: 10px;">' + descrip + '</p>';
                $('#desc').html(fin);
            }
            else {
                //var no = '<h4>' + "No se encontraron resultados" + '</h4>';
                //$('#cargarTabla').html('');
                //$('#sinResult').html(no);
            }
        }
    });
    
}