var app = angular.module('menuAngular', []);
//var app = angular.module('menuAngular', []);
    //    app.controller("cliCtrol", ListController);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home/', {
            templateUrl: "Cliente/CliHistorial",
            controller: 'cliCtrol',
        })
        //.when('/about/', {
        //    templateUrl: "templates/about.html",
        //    controller: 'aboutController',
        //})
        //.otherwise({
        //    template: 'does not exists'
        //});
});
//app.controller("cliCtrol", ListController);
app.controller('cliCtrol', ['ListaController',
    function ListaController($scope, $http) {
        var dataTable = [];
        var clien = []
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
]);

//app.controller('aboutController', [
//    '$scope',
//    function aboutController($scope) {
//        $scope.about = 'WE LOVE CODE';
//    }
//]); 