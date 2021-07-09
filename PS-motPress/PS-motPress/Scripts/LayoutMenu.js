//angular.module('menuAngular', [])
$(document).ready(function () {




    $('.menu li:has(ul)').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass("activado")) {
            $(this).removeClass("activado");
            $(this).children('ul').slideUp();
        }
        else {
            $('.menu li ul').slideUp();
            $('.menu li').removeClass("activado");
            $(this).addClass("activado");
            $(this).children('ul').slideDown();
        }
    });


    $('.menu li ul li a').click(function () {
        $('.menu li').slideUp();
        window.location.href = $(this).attr("href");

    });

    $('#iconoD').click(function () {
        $('.contenedor-menu .menu').slideToggle();

    });

    if (screen.width > 450) {
        $('.contenedor-menu .menu').css({ 'display': 'block' });
        $('#imgSupGrande').css({ 'display': 'block' });
        //$('#barraInicioSesion').show();
        $('#imgSup').css({ 'display': 'none' });

    }
    if (screen.width < 450) {
        $('.contenedor-menu .menu').css({ 'display': 'none' });
        $('.menu li').removeClass("activado");
        $('.menu li ul').slideUp();
        $('body').css({ 'padding-top': '10px' });
        $('#imgSup').css({ 'display': 'block' });
        $('#imgSupGrande').css({ 'display': 'none' });

    }

    $(window).resize(function () {
        if (screen.width > 450) {
            $('.contenedor-menu .menu').css({ 'display': 'block' });
            $('#imgSupGrande').css({ 'display': 'block' });
            //$('#barraInicioSesion').show();
            $('#imgSup').css({ 'display': 'none' });

        }
        if (screen.width < 450) {
            $('.contenedor-menu .menu').css({ 'display': 'none' });
            $('.menu li').removeClass("activado");
            $('.menu li ul').slideUp();
            $('body').css({ 'padding-top': '10px' });
            $('#imgSup').css({ 'display': 'block' });
            $('#imgSupGrande').css({ 'display': 'none' });
        }
    })

});