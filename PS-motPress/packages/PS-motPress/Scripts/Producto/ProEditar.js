angular.module('menuAngular', [])
$(document).ready(function () {

    bsCustomFileInput.init();

    $('.botonesImg').click(function () {
        var valor = $('.archivosVer').attr('hidden');
        if (valor === 'hidden') {
            $('.archivosVer').attr('hidden', false);
        }
        else {
            $('.archivosVer').attr('hidden', true);
        }
        
    });
    $("#precio").on({
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

    $('.botonesImg1').click(function () {
        var valor = $('.archivosVer1').attr('hidden');
        if (valor === 'hidden') {
            $('.archivosVer1').attr('hidden', false);
        }
        else {
            $('.archivosVer1').attr('hidden', true);
        }
    });



    $("#btnEnviarDatos").click(function () {

        if (validarFomr() === true) {


            $('#btnEnviarDatos').css({ 'display': 'none' });
            $('#btnCancel').css({ 'display': 'none' });
            $('#msjCarga').css({ 'display': 'block' });

            var form = $('#frm-editar');
            var form_data = new FormData(document.getElementById("frm-editar"));

            $.ajax({
                dataType: 'JSON',
                type: 'POST',
                url: form.attr('action'),
                data: form_data,
                processData: false,
                contentType: false,
                success: function (data) {
                    var resultado = data;
                    $('#btnEnviarDatos').css({ 'display': 'block' });
                    $('#btnCancel').css({ 'display': 'block' });
                    $('#msjCarga').css({ 'display': 'none' });
                    if ($.trim(resultado) == "Exito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'El  edición se procesó correctamente!',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {

                                window.location = "/Producto/ProBusqueda";
                            }
                        });

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El proceso no se completó!',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#btnEnviarDatos').css({ 'display': 'block' });
                                $('#btnCancel').css({ 'display': 'block' });
                                $('#msjCarga').css({ 'display': 'none' });
                            }
                        });
                    }
                }
            });

            return false;

        }
        return false;

    })

});
function cargarComboMarchas() {
    var pasar = {
        parametro: 3
    };

    $.ajax({
        url: "/Producto/cargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#caja")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#caja").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
function cargarComboCat() {
    var pasar = {
        parametro: 1
    };

    $.ajax({
        url: "/Producto/cargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#tipo")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#tipo").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
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

            $("#marca")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#marca").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
function validarFomr() {

    var nombre = $('#producto').val();
    var anio = $('#anio').val();
    var tipo = $('#tipo').val();
    var marca = $('#marca').val();
    var pr = $('#precio').val();
    var color = $('#color').val();
    var motor = $('#motor').val();
    var cilindro = $('#cilindro').val();
    var arranque = $('#arranque').val();
    var km = $('#km').val();
    var combus = $('#combustible').val();
    var caja = $('#caja').val();


    if ($.trim(nombre) == "") {
        Swal.fire({ title: "Debe completar con el nombre de exposición del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(anio) == "") {
        Swal.fire({ title: "Debe completar con año de elaboración del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(tipo) == "") {
        Swal.fire({ title: "Debe completar con la categoría de la que forma parte el producto.", icon: "warning" });
        return false;
    }
    if ($.trim(marca) == "") {
        Swal.fire({ title: "Debe completar con la marca del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(pr) == "") {
        Swal.fire({ title: "Debe completar con el precio del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(color) == "") {
        Swal.fire({ title: "Debe completar con el color predominante del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(motor) == "") {
        Swal.fire({ title: "Debe completar con el color predominante del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(cilindro) == "") {
        Swal.fire({ title: "Debe completar con la cilindrada del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(arranque) == "") {
        Swal.fire({ title: "Debe completar con la forma de arranque del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(km) == "") {
        Swal.fire({ title: "Debe completar con el kilometraje del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(combus) == "") {
        Swal.fire({ title: "Debe completar con el tipo de combustible que necesita el producto.", icon: "warning" });
        return false;
    }
    if ($.trim(caja) == "") {
        Swal.fire({ title: "Debe completar con el tipo de caja de cambio del producto.", icon: "warning" });
        return false;
    }
    return true;
}

function prueba() {
    window.location = "/Producto/ProBusqueda"
}
//function cargar() {
//    cargarComboMarca();
//    cargarComboCat();
//}

//window.onload = cargar();