angular.module('menuAngular', [])
$(document).ready(function () {
    bsCustomFileInput.init();
    //var numero = $("#precio").val();
    //document
    //    .getElementById('precio')
    //    .innerHTML = new Intl.NumberFormat('es-MX').format(numero);

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

    $('.input-number').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, ',');
    });


    if (screen.width > 450) {
        $('.contenedorMinimizado').removeClass("contenedorMinimizado").addClass("contenedor");
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

    }

    $(window).resize(function () {
        if ($(document).width() > 450) {
            $('.contenedorMinimizado').removeClass("contenedorMinimizado").addClass("contenedor");
        }
        if ($(document).width() < 450) {
            var altura = $('.btn-menu').offset().top;

            $(window).on('scroll', function () {
                if ($(window).scrollTop() > altura) {
                    $('.btn-menu').addClass('menu-fixed');
                } else {
                    $('.btn-menu').removeClass('menu-fixed');
                }
            });

            $('.contenedor').removeClass("contenedor").addClass("contenedorMinimizado");
        }
    });


    $('#btnClose').click(function () {
        window.location = "/Home/Index";
    });

    $("#btnGuardar").click(function () {


        if (validarFomr() === true) {

            $('#btnGuardar').css({ 'display': 'none' });
            $('#btnClose').css({ 'display': 'none' });
            $('#btnCargando').css({ 'display': '' });

            var form = $('#frm-adjuntar');
            var form_data = new FormData(document.getElementById("frm-adjuntar"));
            $.ajax({
                dataType: 'JSON',
                type: 'POST',
                url: form.attr('action'),
                data: form_data,
                processData: false,
                contentType: false,
                success: function (data) {
                    var resultado = data;
                    $('#btnGuardar').css({ 'display': '' });
                    $('#btnClose').css({ 'display': '' });
                    $('#btnCargando').css({ 'display': 'none' });
                    if ($.trim(resultado) == "Exito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'El  registro se procesó correctamente!',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                               
                                window.location = "/Producto/altaProducto";
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
                            }
                        });
                    }
                }
            });

            return false;
        }
        return false;
        
    });


    $('#btnCerrar').click(function () {

        window.location = '/Usuario/UsuBusqueda';

    });


});

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
function cargarComboColores() {
    var pasar = {
        parametro: 4
    };

    $.ajax({
        url: "/Producto/cargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#color")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#color").append(option);
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
    var imgGrande = $('#imgGrande').val();
    var imgChica = $('#ImgFile').val();


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
    if ($.trim(imgGrande) == "") {
        Swal.fire({ title: "Debe completar con una imagen del producto.", icon: "warning" });
        return false;
    }
    if ($.trim(imgChica) == "") {
        Swal.fire({ title: "Debe completar con una imagen en miniatura del producto.", icon: "warning" });
        return false;
    }
    return true;
}

function prueba() {
    window.location = "/Producto/altaProducto";
}

function cargar() {
    cargarComboMarca();
    cargarComboCat();
    cargarComboMarchas();
    cargarComboColores();
}

window.onload = cargar();


