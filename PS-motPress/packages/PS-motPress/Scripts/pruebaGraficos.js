
$(document).ready(function () {

    $('#btnBuscar').click(function () {
        var anio = $("#añosPrestamos").val();

        var parametro =
        {
            year: anio
        };

        $.ajax({
            url: "/Reporte/cargaCantidadesXanios",
            type: "POST",
            data: parametro,
            success: function (result) {
                var rta = result;

                var removed = rta.splice(0, 1);
                const $grafica = document.querySelector("#grafica");



                const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'Préstamos por mes',
                        data: rta,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                };

                new Chart($grafica, {
                    type: 'bar',// Tipo de gráfica
                    data: data,
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                        },
                    }
                });


            }
        })


        $.ajax({
            url: "/Reporte/entregaXmes",
            type: "POST",
            data: parametro,
            success: function (result) {
                var rta = result;

                var removed = rta.splice(0, 1);
                const $grafica1 = document.querySelector("#grafica1");



                const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'Monto entregado por mes',
                        data: rta,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                };

                new Chart($grafica1, {
                    type: 'line',// Tipo de gráfica
                    data: data,
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                        },
                    }
                });


            }
        })

    });


});



function cargarComboA() {

    $.ajax({
        url: "/Reporte/cargaAnios",
        type: "Post",
        success: function (result) {

            $("#añosPrestamos")
                .empty()
                .append($("<option></option>")
                    .val("")
                    .html("Seleccionar..."));
            for (var i = 0; i < result.length; i++) {
                var option = $(document.createElement('option'));
                option.prop('value', result[i].valor)
                option.html(result[i].pDescripcion);
                option.val(result[i].pDescripcion);
                $("#añosPrestamos").append(option);
            }
        },
        error: function (result) {
            $("#dvAlerta > span").text("Error al llenar el combo");
        }
    });
}

window.onload = cargarComboA();