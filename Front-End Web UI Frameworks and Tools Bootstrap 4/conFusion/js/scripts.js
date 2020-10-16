$(document).ready(function() {
    // Carousel controls
    $('#myCarousel').carousel({interval: 2000});
    $('#carouselButton').click(function() {
        if ($(this).children('span').hasClass('fa-pause')) {
            $('#myCarousel').carousel('pause');
            $(this).children('span').removeClass('fa-pause');
            $(this).children('span').addClass('fa-play');
        } else {
            $('#myCarousel').carousel('cycle');
            $(this).children('span').removeClass('fa-play');
            $(this).children('span').addClass('fa-pause');
        }
    });

    // Modal controls
    $('#loginButton').click(function() {
        $('#loginModal').modal('show');
    });

    $('#reserveTableButton').click(function() {
        $('#reserveTableModal').modal('show');
    });
});