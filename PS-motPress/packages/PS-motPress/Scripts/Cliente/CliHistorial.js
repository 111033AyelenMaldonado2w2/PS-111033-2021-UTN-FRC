
var app = angular.module('mm', []);
app.controller("cliCtrol", ListaController); 
app.controller("menuCtrl", ListaControllerMenu); 
app.controller("usuCtrol", ListaControllerUsuario); 

$(document).ready(function () {
    $('#btnActivar').click(function () {
        var code = $('#codCli').val();

        var parametros =
        {
            cod: code
        };
        $.ajax({
            url: '/Cliente/darAltaCliente',
            data: parametros,
            type: 'POST',
            success: function (result) {
                var r = result;
                if ($.trim(r) == "Exito") {
                    Swal.fire(
                        'Activado!',
                        'El cliente ha sido reactivado.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            window.location = "/Cliente/CliHistorial";
                        }
                    });
                }
                else {
                    Swal.fire(
                        'Error!',
                        'El cliente no ha sido reactivado.',
                        'error'
                    );
                }
            }
        });
    })
});
var dataTable = [];
var clien = [];

function ListaController($scope, $http) {

    var vm = this;
    vm.search = "";
    vm.clienteTomado = {};
    vm.clienteSeleccionado = clienteSeleccionado;
    $http({
        method: 'POST',
        url: '/Cliente/crudoClientes',
    }).then(function (result) {
        console.log(result);
        $scope.dataTable = result.data;
        console.log(dataTable);
        $('#verTdo').css({ 'display': 'block' });
    });

    function clienteSeleccionado(index) {
        vm.clienteTomado = index;
        console.log(vm.clienteTomado);
    }
}
var motosData = [];
var UnamotosData = [];
var cadaMoto = {};
var stringSrcM = '';

function ListaControllerMenu($scope, $http) {



    var vm = this;
    vm.activeMoto = {};
    vm.changeActiveMoto = changeActiveMoto;
    vm.search = "";
    //convertir();
    //petición get

    //$.ajax({
    //    url: '/Producto/cargaDatos',
    //    type: 'POST',
    //    success: function (result) {
    //        if (result.data.length > 0) {
    //            for (var i = 0; i < result.data.length; i++) {

    //                var nombre = result.data[0].pNombre;
    //                alert(nombre);
    //                //console.log(result.pNombre[0]);
    //            }
    //        }
    //    }
    //});
    var txt = 1;
    var body = '';
    var parametro =
    {
        name: txt
    };

    $http({
        method: 'POST',
        url: '/Producto/cargaDatos',
        data: parametro,
    }).then(function (result) {
        console.log(result);
        $scope.motosData = result.data;
        console.log(motosData);
        $('#visualizar').css({ 'display': 'block' });
    });

    function changeActiveMoto(index) {
        //    vm.activeMoto = index;
        var cod = index;
        var parametros =
        {
            idProducto: cod
        };

        $http({
            url: '/Producto/traerUnProducto',
            data: parametros,
            method: 'POST',
        }).then(function (result) {
            console.log(result);
            $scope.UnamotosData = result.data;
        });

    }


    //$('.zm').click(function () {
    //    alert("Hola");
    //    $(this).addClass('transition');
    //}, function () {
    //    $(this).removeClass('transition');
    //});
}
var dataTable = [];
var usuario = {};

function ListaControllerUsuario($scope, $http) {

    var vm = this;
    vm.search = "";
    vm.lleno = validarModal;
    vm.usuarioTomado = {};
    vm.usuarioSeleccionado = usuarioSeleccionado;
    $http({
        method: 'POST',
        url: '/Usuario/buscarLista',
    }).then(function (result) {
        $scope.dataTable = result.data;
        //$('#tablaUsuarios').css({ 'display': 'block' });
        $('#tablaConUsuarios').css({ 'display': 'block' });

    });

    function usuarioSeleccionado(index) {
        vm.usuarioTomado = index;
        $scope.usuario = index;
    }
    function validarModal() {
        var campo = $('#busqueda').val();
        var vali = true;
        if ($.trim(campo) == "") {
            vali = false;
        }
        return vali;
    }
}