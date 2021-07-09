

$(document).ready(function () {


    $('#btnBuscarParametros').click(function () {

        if (validarBusqueda() === true) {
            var seleccionado = $('#parametros').val();

            var parametro =
            {
                dominio: seleccionado
            }

            $.ajax({
                url: '/Parametro/BuscarLista',
                type: 'POST',
                data: parametro,
                success: function (result) {
                    var head = '<thead><tr><th>Id</th><th>Nombre</th><th hidden="True"></th><th hidden="True"></th><th></th></tr></thead>';
                    var body = '';
                    if (result.length) {
                        for (var i = 0; i < result.length; i++) {
                            body += '<tbody><tr><td>' + result[i].pId + '</td>' +
                                '<td>' + result[i].pDescripcion + '</td>' +
                                '<td hidden="True">' + result[i].pDescripcionCorta + '</td>' +
                                '<td hidden="True">' + result[i].pDominio + '</td>' +
                                '<td>' + '<a class="tomada" id="abc" onClick="tomarParametro();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</tr></tbody>';
                        }

                        $('#tablaConParametros').html(head + body);
                        $('#btnCancelar').attr('disabled', false);
                        $('#verTablas').css({ 'display': 'block' });
                    }
                }
            });
        }
    });




    $('#btnEditar').click(function () {

        $('#btnGuardar').attr('disabled', false);
        $('#descrip').attr('disabled', false);
        $('#descripCorta').attr('disabled', false);
        $('#btnCancelar').attr('disabled', false);
        $('#btnEditar').attr('disabled', true);

    });




    $('#btnRegistrar').click(function () {


        if (validarCamposRegistro() === true) {
            var descrip = $('#descripRegistro').val();
            var codigo = descrip.substring(0, 3);

            var parametros =
            {
                pDescripcion: $('#descripRegistro').val(),
                pDescripcionCorta: $('#descripCortaRegistro').val(),
                pDominio: $('#domini').val(),
                pCod: codigo
            }

            $.ajax({
                url: '/Parametro/nuevoParametro',
                data: parametros,
                type: 'POST',
                success: function (result) {
                    var resultado = result;
                    if ($.trim(resultado) == "Exito") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: "Nuevo parámetro registrado correctamente!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#descripRegistro').val('');
                                $('#descripCortaRegistro').val('');
                                cargarCombo1();
                            }
                        });

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El proceso de registros no se completó!',
                        })
                    }
                }
            });
        }

        


    });


    $('#btnEliminar').click(function () {


        Swal.fire({
            title: 'Estás seguro de eliminar el parámetro?',
            text: "Esta acción no se podrá revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar!'
        }).then((result) => {
            if (result.isConfirmed) {

                var valor = $('#idPr').val();

                var parametro =
                {
                    pId: valor
                }

                $.ajax({
                    url: '/Parametro/borrarParam',
                    data: parametro,
                    type: 'POST',
                    success: function (result) {
                        var rta = result;
                        if ($.trim(rta) == "Exito") {
                            Swal.fire(
                                'Borrado!',
                                'El parámetro ha sido eliminado.',
                                'success'
                            )

                            $('#descrip').val('');
                            $('#descripCorta').val('');
                            $('#btnEliminar').attr('disabled', true);
                            $('#btnEditar').attr('disabled', true);
                            parametroBuscado();
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'El elemento no se pudo borrar!',
                            })
                        }
                    }
                });
            }
        })
    })

    $('#btnGuardar').click(function () {
        var descrip = $('#descrip').val();
        var codigo = descrip.substring(0, 3);

        var parametros =
        {
            pId: $('#idPr').val(),
            pDescripcion: $('#descrip').val(),
            pDescripcionCorta: $('#descripCorta').val(),
            pDominio: $('#domin').val(),
            pCod: codigo
        }

        $.ajax({
            url: '/Parametro/editarParam',
            data: parametros,
            type: 'POST',
            success: function (result) {
                var resultado = result;
                if ($.trim(resultado) == "Exito") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: "Las modificaciones se guardaron correctamente!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#descrip').val('');
                            $('#descripCorta').val('');
                            $('#descrip').attr('disabled', true);
                            $('#descripCorta').attr('disabled', true);
                            $('#btnEliminar').attr('disabled', true);
                            $('#btnEditar').attr('disabled', true);
                            $('#btnGuardar').attr('disabled', true);
                            $('#btnCancelar').attr('disabled', true);
                            parametroBuscado();
                        }
                    });

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El proceso de modificación no se completó!',
                    })
                }
            }
        })


    });



    $('#btnCancelar').click(function () {
        cargarCombo();
        $('#tablaConParametros').html('');
        $('#descrip').val('');
        $('#descripCorta').val('');
        $('#descrip').attr('disabled', true);
        $('#descripCorta').attr('disabled', true);
        $('#btnEliminar').attr('disabled', true);
        $('#btnEditar').attr('disabled', true);
        $('#btnGuardar').attr('disabled', true);
        $('#btnCancelar').attr('disabled', true);
        $('#verTablas').css({ 'display': 'none' });
    })


});

function validarBusqueda() {
    var dom = $('#parametros').val();
    if ($.trim(dom) == "") {
        Swal.fire({ title: "No ha definido el dominio del parámetro para la búsqueda", icon: 'warning' });
        return false;
    }
    return true;
}

function validarCamposRegistro() {
    var descrip = $('#descripRegistro').val();
    var descripCor = $('#descripCortaRegistro').val();
    var dom = $('#domini').val();

    if ($.trim(descrip) == "") {
        Swal.fire({ title: "No ha definido el nombre del parámetro", icon: 'warning' });
        return false;
    }
    if ($.trim(descripCor) == "") {
        Swal.fire({ title: "No ha definido una descripción corta del parámetro", icon: 'warning' });
        return false;
    }
    if ($.trim(dom) == "") {
        Swal.fire({ title: "No ha definido el dominio del parámetro", icon: 'warning' });
        return false;
    }
    return true;
}


function tomarParametro() {
    var a = document.querySelectorAll(".tomada");
    for (var b in a) { //Como nos devuelve un array iteramos
        var c = a[b];
        if (typeof c == "object") { //Solo buscamos los objetos
            c.onclick = function () { //Asignamos un evento onclick
                var td = this.offsetParent; //Localizamos el TD
                var tr = td.parentElement;  //LLegamos hasta el TR
                descrip = tr.children[1];
                idParam = tr.children[0];// Buscamos la Columna NOMBRE
                descripCorta = tr.children[2];
                dominio = tr.children[3];


                $('#descrip').val(descrip.textContent);
                $('#descripCorta').val(descripCorta.textContent);
                $('#idPr').val(idParam.textContent);
                $('#domin').val(dominio.textContent);
                $('#btnEditar').attr('disabled', false);
                $('#btnEliminar').attr('disabled', false);
            }
        }
    }
}

function cargarCombo() {
    $.ajax({
        url: "/Parametro/cargaCombo",
        type: "Post",
        success: function (result) {

            $("#parametros")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pDomValue);
                $("#parametros").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}
function cargarCombo1() {
    $.ajax({
        url: "/Parametro/cargaCombo",
        type: "Post",
        success: function (result) {

            $("#domini")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pDomValue);
                $("#domini").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}

function parametroBuscado() {
    var seleccionado = $('#parametros').val();
    var parametro =
    {
        dominio: seleccionado
    }

    $.ajax({
        url: '/Parametro/BuscarLista',
        type: 'POST',
        data: parametro,
        success: function (result) {
            var head = '<thead><tr><th>Id</th><th>Nombre</th><th hidden="True"></th><th hidden="True"></th><th></th></tr></thead>';
            var body = '';
            if (result.length) {
                for (var i = 0; i < result.length; i++) {
                    body += '<tbody><tr><td>' + result[i].pId + '</td>' +
                        '<td>' + result[i].pDescripcion + '</td>' +
                        '<td hidden="True">' + result[i].pDescripcionCorta + '</td>' +
                        '<td hidden="True">' + result[i].pDominio + '</td>' +
                        '<td>' + '<a class="tomada" id="abc" onClick="tomarParametro();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg></a>' + '</tr></tbody>';
                }

                $('#tablaConParametros').html(head + body);
                $('#btnCancelar').attr('disabled', false);
            }
        }
    });
}


function lanzadera() {
    cargarCombo();
    cargarCombo1();
}
window.onload = lanzadera();