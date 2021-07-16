angular.module('menuAngular', [])
$(document).ready(function () {


    $('#btnCancel').click(function () {
        window.location = "/Home/Index"
    })
    $('.input-number').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    var input = document.getElementById('maxDoc');
    input.addEventListener('input', function () {
        if (this.value.length > 8)
            this.value = this.value.slice(0, 8);
    })
    var input1 = document.getElementById('maxCuit');
    input1.addEventListener('input', function () {
        if (this.value.length > 11)
            this.value = this.value.slice(0, 11);
    })

    $("#enviarForm").click(function () {
        //var form = $(this);

        var valor = validarCampos();

        if (valor === true) {


            if (validarDocUnico() === true) {

                $('#enviarForm').css({ 'display': 'none' });
                $('#btnCancel').css({ 'display': 'none' });
                $('#msjCarga').css({ 'display': '' });

                var form = $('#frm-alta');
                var form_data = new FormData(document.getElementById("frm-alta"));

                $.ajax({
                    dataType: 'JSON',
                    type: 'POST',
                    url: form.attr('action'),
                    data: form_data,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        var resultado = data;
                        $('#enviarForm').css({ 'display': '' });
                        $('#btnCancel').css({ 'display': '' });
                        $('#msjCarga').css({ 'display': 'none' });
                        if ($.trim(resultado) == 'Exito') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Exito!',
                                text: 'El  registro se procesó correctamente!',
                                allowOutsideClick: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location = "/Cliente/CliAlta";
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
                                    $('#enviarForm').css({ 'display': 'normal' });
                                    $('#btnCancel').css({ 'display': 'normal' });
                                    $('#msjCarga').css({ 'display': 'none' });
                                }
                            });
                        }
                    }
                });

                return false;

            }
        }

        return false;
    })



    $('#locationNueva').on('hidden.bs.modal', function () {
        // do something here
        var html = '';
        $('#sinResultados').html(html);
        $('#tablaResultado').html(html);
        $('#campoBuscar').val("");
    })

    $(document).on("click", (e) => {

        switch (e.target.id) {
            case "acPais":
                repSolicitado = "Alta Pais";
                html = ' <h3 class="modal-title">' + "Búsqueda de Países" + '</h3>' +
                    '<button type = "button" class="close" data-dismiss="modal" aria - label="Close">' +
                    '<span aria-hidden="true">&times;</span></button >';
                $('#modalTitulo').html(html);
                break;
            case "acProvincia":
                repSolicitado = "Alta Provincia";
                html = ' <h3 class="modal-title">' + "Búsqueda de Provincias" + '</h3>' +
                    '<button type = "button" class="close" data-dismiss="modal" aria - label="Close">' +
                    '<span aria-hidden="true">&times;</span></button >';
                $('#modalTitulo').html(html);
                break;
            case "acLocalidad":
                repSolicitado = "Alta Localidad";
                html = ' <h3 class="modal-title">' + "Búsqueda de Localidades" + '</h3>' +
                    '<button type = "button" class="close" data-dismiss="modal" aria - label="Close">' +
                    '<span aria-hidden="true">&times;</span></button >';
                $('#modalTitulo').html(html);
                break;
            case "acBarrio":
                repSolicitado = "Alta Barrio";
                html = ' <h3 class="modal-title">' + "Búsqueda de Barrios" + '</h3>' +
                    '<button type = "button" class="close" data-dismiss="modal" aria - label="Close">' +
                    '<span aria-hidden="true">&times;</span></button >';
                $('#modalTitulo').html(html);
                break;
        }
    });


    $('#btnBusqueda').click(function () {
        para = $('#campoBuscar').val();
        var head = '';
        var html = '';
        $('#tablaResultado').html(html);
        if (para != "") {
            if ($.trim(repSolicitado) == "Alta Pais") {
                dominio = "Pais";
            }
            else if ($.trim(repSolicitado) == "Alta Provincia") {
                dominio = "Provincia";
            }
            else if ($.trim(repSolicitado) == "Alta Localidad") {
                dominio = "Localidad";
            }
            else if ($.trim(repSolicitado) == "Alta Barrio") {
                dominio = "Barrio";
            }
            head = '<thead><tr><th>Denominación</th><th>Descripción</th></tr></thead>';
            var parametros =
            {
                dom: dominio,
                palabra: para
            };

            $.ajax({
                url: "/Cliente/busquedaLugar",
                data: parametros,
                type: "POST",
                success: function (result) {
                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            html += '<tbody><tr><td>' + result[i].nombre + '</td><td> ' + result[i].descripcion + ' </td></tr></tbody>';
                        }

                        $('#tablaResultado').html(head + html);
                    }
                    else {
                        html = '<h4>' + "No se encontraron registros" + '</h4>' +
                            '<h5>Desea Incorporar ' + $('#campoBuscar').val() + ' como ' + dominio + '?</h5>' +
                            '<div><button  type="button" class="btn btn-info" onclick="agregarLugar();" style="float: right;margin: 10px;">Agregar</button><button   style="float: right;margin: 10px;"  onclick="cerrarVtana();" type="button" class="btn btn-dark data-dismiss="modal">Cancelar</button></div>';
                        $('#sinResultados').html(html);
                    }
                }
            });

        }




    });




});

//(function () {
//    'use strict';
//    window.addEventListener('load', function () {
//        // Fetch all the forms we want to apply custom Bootstrap validation styles to
//        var forms = document.getElementsByClassName('needs-validation');
//        // Loop over them and prevent submission
//        var validation = Array.prototype.filter.call(forms, function (form) {
//            form.addEventListener('submit', function (event) {
//                if (form.checkValidity() === false) {
//                    event.preventDefault();
//                    event.stopPropagation();
//                }
//                form.classList.add('was-validated');
//            }, false);
//        });
//    }, false);
//})();



function agregarLugar() {
    var para = $('#campoBuscar').val();
    var codigo = para.substring(0, 3);
    var parametros =
    {
        nuevo: para,
        dom: dominio,
        cod: codigo
    }

    $.ajax({
        url: "/Cliente/agregarLugar",
        data: parametros,
        type: "POST",
        success: function (result) {
            var resultado = result;
            if ($.trim(resultado) == "Exito") {
                Swal.fire('Incorporación Exitosa');
                cargarCombo1();
                cargarCombo2();
                cargarCombo3();
                cargarCombo4();
            }
            else {
                Swal.fire('Incorporación Fallida');
            }
            $('#locationNueva').modal('hide');
            var html = '';
            $('#sinResultados').html(html);
            $('#tablaResultado').html(html);
        }
    });
}

function validarDocUnico() {
    var doc = $('#maxDoc').val();


    var pasar = {
        parametro: doc
    };
    $.ajax({
        url: "/Cliente/existeCliente",
        data: pasar,
        type: "Post",
        success: function (result) {
            var contra = result;
            if ($.trim(contra) == "Existe") {
                Swal.fire({ title: "El documento ingresado ya existe en el sistema", icon: "warning" });
                $('#maxDoc').val('');
                return false;
            }
        }
    });
    return true;
}


function validarCampos() {
    var doc = $('#maxDoc').val();
    var cuit = $('#maxCuit').val();
    var tel = $('#minTEL').val();
    var nomb = $('#nomb').val();
    var nac = $('#birthDate').val();
    var ape = $('#lastName').val();
    var email = $('#correp').val();
    var pais = $('#pais').val();
    var prov = $('#provincia').val();
    var local = $('#location').val();
    var barrio = $('#barrio').val();
    var calle = $('#calle').val();
    var alt = $('#alt').val();
    var cp = $('#cp').val();

    if ($.trim(nomb) == "") {
        Swal.fire({ title: "Debes completar con el primer nombre del cliente", icon: "warning" });
        return false;
    }
    if ($.trim(doc) == "") {
        Swal.fire({ title: "Debes completar con el número de Documento", icon: "warning" });
        return false;
    }
    else {
        if (doc.length < 8) {
            Swal.fire({ title: "El Documento debe contar con 8(OCHO) caracteres como mínimo", icon: "warning" });
            return false;
                        //$('#maxDoc').focus();
        }
       
    }
    if ($.trim(tel) == "") {
        Swal.fire({ title: "Debes completar con el número de CUIT/CUIL", icon: "warning" });
        return false;
    }
    else {
        if (tel.length < 7) {
            Swal.fire({ title: "El mínimo de dígitos de un teléfono es de 7(SIETE) caracteres", icon: "warning" });
            return false;
        }
    }
    if ($.trim(nac) == "") {
        Swal.fire({ title: "Debes completar con la fecha de nacimiento del cliente", icon: "warning" });
        return false;
    }
    if ($.trim(ape) == "") {
        Swal.fire({ title: "Debes completar con el apellido del cliente", icon: "warning" });
        return false;
    }
    if ($.trim(cuit) == "") {
        Swal.fire({ title: "Debes completar con el número de CUIT/CUIL", icon: "warning" });
        return false;
    }
    else {
        if (cuit.length < 11) {
            Swal.fire({ title: "El CUIT/CUIL debe contar con 11(ONCE) caracteres", icon: "warning" });
            //$('#maxDoc').focus();
            return false;
        }
    }
    //if ($.trim(email) == "") {
    //    Swal.fire({ title: "Debes completar un correo electrónico de contacto", icon: "warning" });
    //    return false;
    //}
    if ($.trim(pais) == "") {
        Swal.fire({ title: "Debes completar con el país de origen del cliente", icon: "warning" });
        return false;
    }
    if ($.trim(prov) == "") {
        Swal.fire({ title: "Debes completar con la provicia en que reside el cliente", icon: "warning" });
        return false;
    }
    if ($.trim(local) == "") {
        Swal.fire({ title: "Debes completar con la localidad en donde reside el cliente", icon: "warning" });
        return false;
    }
    if ($.trim(barrio) == "") {
        Swal.fire({ title: "Debes completar con el barrio en donde reside el cliente", icon: "warning" });
        return false;
    }
    if ($.trim(calle) == "") {
        Swal.fire({ title: "Debes completar con la calle en donde reside el cliente", icon: "warning" });
        return false;
    }
    if ($.trim(alt) == "") {
        Swal.fire({ title: "Debes completar con la altura de la residencia del cliente", icon: "warning" });
        return false;
    }
    if ($.trim(cp) == "") {
        Swal.fire({ title: "Debes completar con el código postal coincidente con la residencia del cliente", icon: "warning" });
        return false;
    }
    return true;
}

function cerrarVtana() {
    $('#locationNueva').modal('hide');
    var html = '';
    $('#sinResultados').html(html);
    $('#tablaResultado').html(html);
}

function cargarCombo1() {
    var pasar = {
        parametro: 1
    };

    $.ajax({
        url: "/Cliente/cargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#pais")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#pais").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}

function cargarCombo2() {
    var pasar = {
        parametro: 2
    };

    $.ajax({
        url: "/Cliente/cargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#provincia")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#provincia").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
} function cargarCombo3() {
    var pasar = {
        parametro: 3
    };

    $.ajax({
        url: "/Cliente/cargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#location")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#location").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
function cargarCombo4() {
    var pasar = {
        parametro: 4
    };

    $.ajax({
        url: "/Cliente/cargaCombos",
        data: pasar,
        type: "Post",
        success: function (result) {

            $("#barrio")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pId);
                $("#barrio").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}

function validarSintaxis() {
    var input = $('#nomb').val();
    var nuevo = '';
    nuevo = input[0].toUpperCase() + input.slice(1); 
    $('#nomb').val(nuevo);

    var input = $('#lastName').val();
    var nuevo = '';
    nuevo = input[0].toUpperCase() + input.slice(1); 
    $('#lastName').val(nuevo);

    var input = $('#calle').val();
    var nuevo = '';
    nuevo = input[0].toUpperCase() + input.slice(1); 
    $('#calle').val(nuevo);
}

function lanzadera() {
    cargarCombo1();
    cargarCombo2();
    cargarCombo3();
    cargarCombo4();
}

window.onload = lanzadera();

