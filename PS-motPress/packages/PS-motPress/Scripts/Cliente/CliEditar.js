angular.module('menuAngular', [])
$(document).ready(function () {

    $('#btnClose').click(function () {
        window.location = "/Cliente/CliBusqueda"
    });

    $('.input-number').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    var input = document.getElementById('doc');
    input.addEventListener('input', function () {
        if (this.value.length > 8)
            this.value = this.value.slice(0, 8);
    })
    var input1 = document.getElementById('cuit');
    input1.addEventListener('input', function () {
        if (this.value.length > 11)
            this.value = this.value.slice(0, 11);
    })
    $("#btnMandar").click(function () {
        
        if (validarCampos() === true) {
            $('#msjCarga').css('display', '');
            $('#btnMandar').css('display', 'none');
            $('#btnClose').css('display', 'none');
            //$('#msjCarga').css({ 'display': 'block' });
            //$('#btnMandar').css({ 'display': 'none' });
            //$('#btnClose').css({ 'display': 'none' });


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
                    $('#btnMandar').css('display', '');
                    $('#btnClose').css('display', '');
                    $('#msjCarga').css('display', 'none');
                    if ($.trim(resultado) == 'Exito') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'Las modificaciones se guardaron conrrectamente!',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location = "/Cliente/CliBusqueda";
                            }
                        });

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El proceso no se completó!',
                        })
                    }
                }
            });

            return false;

        }
        return false;
       
    })


});

function validarCampos() {
    var doc = $('#doc').val();
    var cuit = $('#cuit').val();
    var tel = $('#minTEL').val();
    var nomb = $('#nom').val();
    var nac = $('#birthDate').val();
    var ape = $('#ape').val();
    var email = $('#correp').val();
    var pais = $('#pais').val();
    var prov = $('#provincia').val();
    var local = $('#location').val();
    var barrio = $('#barrio').val();
    var calle = $('#cal').val();
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

function validarSintaxis() {
    var input = $('#nom').val();
    var nuevo = '';
    nuevo = input[0].toUpperCase() + input.slice(1);
    $('#nom').val(nuevo);

    var input = $('#ape').val();
    var nuevo = '';
    nuevo = input[0].toUpperCase() + input.slice(1);
    $('#ape').val(nuevo);

    var input = $('#cal').val();
    var nuevo = '';
    nuevo = input[0].toUpperCase() + input.slice(1);
    $('#cal').val(nuevo);
}