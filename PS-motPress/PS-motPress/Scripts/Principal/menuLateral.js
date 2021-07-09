$(document).ready(function () {

    //$('#item-menu').css({ 'width': '250px' });
    //$('#title').css({ 'display': 'none' });
    //$('.derecha').css({ 'display': 'none' });
    //$('.escrito').css({ 'display': 'none' });

    $("html").click(function () {
        $('.contenedor-menu').css({ 'width': '4%' });
        //$('#item-menu').css({ 'width': '250px' });
        $('#title').css({ 'display': 'none' });
        $('.derecha').css({ 'display': 'none' });
        $('.iconoDescomprimido').css({ 'display': 'none' });
        $('.iconoContraido').css({ 'display': 'block' });
        $('.menu li ul').slideUp();
        $('.menu li').removeClass('activado');
        $('#iconoMover').removeClass('menu-collapse');
        $('.contenedor').css({ 'left': '100px' })



    });
    $('.contenedor-menu').click(function (e) {
        e.stopPropagation();
    });

    $('.contenedor-menu').click(function () {
        if ($('#iconoMover').hasClass('menu-collapse')) {
            $('.contenedor').css({ 'left': '180px' })
        }
        else {
            $('.contenedor').css({ 'left': '70px' })
        }
    })


    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    //var altura = Math.max($(document).height(), $(window).height())
    var altura = document.body.scrollHeight;
    $('#menu-bar').css({ 'height': altura + 'px' })


    //var alt = screen.height();
    //if (screen.height > 640) {
    //    altura = document.body.scrollHeight;
    //    $('#menu-bar').css({ 'height': altura + 'px' })
    //}

    //$(window).resize(function () {
    //    // your code to check sizes and take action 
    //    altura = document.body.scrollHeight;
    //    $('#menu-bar').css({ 'height': altura + 'px' })
    //}
    //); 

    $('#iconoMover').click(function () {
        if ($(this).hasClass('menu-collapse')) {
            $('.contenedor-menu').css({ 'width': '4%' });
            //$('#item-menu').css({ 'width': '250px' });
            $('#title').css({ 'display': 'none' });
            $('.derecha').css({ 'display': 'none' });
            $('.iconoDescomprimido').css({ 'display': 'none' });
            $('.iconoContraido').css({ 'display': 'block' });
            $('.menu li ul').slideUp();
            $('.menu li').removeClass('activado');
            $(this).removeClass('menu-collapse');

        }
        else {
            $(this).addClass('menu-collapse');
            $('.contenedor-menu').css({ 'width': '20%' });
            $('#item-menu').css({ 'width': '100%' });
            $('#title').css({ 'display': 'block' });
            $('.derecha').css({ 'display': 'block' });
            $('.iconoDescomprimido').css({ 'display': 'block' });
            $('.iconoContraido').css({ 'display': 'none' });
            //$('.escrito').css({ 'width': '80%' });
        }

    });


    $('.iconoContraido').click(function () {
        $('.contenedor-menu').css({ 'width': '20%' });
        $('#iconoMover').addClass('menu-collapse');
        $('#item-menu').css({ 'width': '100%' });
        $('#title').css({ 'display': 'block' });
        $('.derecha').css({ 'display': 'block' });
        $('.iconoDescomprimido').css({ 'display': 'block' });
        $('.iconoContraido').css({ 'display': 'none' });
    })

    $('.a').click(function () {
        $('.contenedor-menu').css({ 'width': '20%' });
        $('#iconoMover').addClass('menu-collapse');
        $('#item-menu').css({ 'width': '100%' });
        $('#title').css({ 'display': 'block' });
        $('.derecha').css({ 'display': 'block' });
        $('.iconoDescomprimido').css({ 'display': 'block' });
        $('.iconoContraido').css({ 'display': 'none' });
    })

    $('.menu li:has(ul)').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('activado')) {
            $(this).removeClass('activado');
            $(this).children('ul').slideUp();
        }
        else {
            $('.menu li ul').slideUp();
            $('.menu li').removeClass('activado');
            $(this).addClass('activado');
            $(this).children('ul').slideDown();
        }
    });

    $('.menu li ul li a').click(function () {
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

