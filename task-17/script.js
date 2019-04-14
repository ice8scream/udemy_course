$(document).ready(function () {

    function modalShow() {
        $('.overlay').animate({opacity: "show"},1000);
        $('.modal').slideDown(1000);
    }

    function modalHide() {
        $('.overlay').animate({opacity: "hide"},1000);
        $('.modal').slideUp(1000);
    }

    $('.main_btna').on('click', modalShow);
    $('.main_btn').on('click', modalShow);
    $('.main_nav li:eq(1)').on('click', modalShow);
    $('.close').on('click', modalHide);
});