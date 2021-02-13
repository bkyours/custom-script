$(document).ready(function(){
    addFooter();

    function addFooter() {
        categoriesLink = '';
        $.map(categories, function (value, index) {
            categoriesLink += '<a href="' + value.url + '">' + value.title + '</a></div><div class="col-sm-12 col-xs-6">';
        });
        $('body').append('<footer><div class=layout-centered-content><div class="row footer-links"><div class="col-xs-12 col-sm-4">' +
            '<div class=row><h3>Shop</h3><div class="col-sm-12 col-xs-6">' +
            categoriesLink +
            '</div></div></div><div class="col-xs-12 col-sm-4">' +
            '<div class=row><h3>Learn more</h3><div class="col-sm-12 col-xs-6">' +
            '<a href=/en/infos/about>About BarkYours</a></div><div class="col-sm-12 col-xs-6">' +
            '<a class= "faq-popup-trigger" href=#faq-popup>FAQs</a></div><div class="col-sm-12 col-xs-6">' +
            '<a href=/en/infos/how_to_use>How It Works</a></div><div class="col-sm-12 col-xs-6">' +
            '<a href=/user_feedbacks/new>Contact Us</a></div><div class="col-sm-12 col-xs-6">' +
            '<a href=/invitations/new>Invite Others</a></div><div class="col-sm-12 col-xs-6">' +
            '<a href=/en/infos/privacy>Privacy Policy</a></div><div class="col-sm-12 col-xs-6">' +
            '<a href=/en/infos/terms>Terms of Use</a></div></div></div>' +
            '<div class="col-xs-12 col-sm-4">' +
            '<div class="row"><h3>Follow BarkYours</h3>' +
            '<div class="col-xs-12 "><a class="icon-with-text-container" href="https://www.facebook.com/barkyours"><i class="fa fa-facebook icon-part"></i> <div class="text-part">Facebook</div></a></div>' +
            '<div class="col-xs-12"><a class="icon-with-text-container" href="https://www.instagram.com/barkyours"><i class="fa fa-instagram icon-part"></i> <div class="text-part">Instagram</div></a></div>' +
            '<div class="col-xs-12"><a class="icon-with-text-container" href="https://www.twitter.com/barkyours"><i class="fa fa-twitter icon-part"></i> <div class="text-part">Twitter</div></a></div>' +
            '<div class="col-xs-12"><a class="icon-with-text-container" href="https://www.pinterest.com/barkyours/"><i class="fa fa-pinterest icon-part"></i> <div class="text-part">Pinterest</div></a></div>' +
            '</div></div></div>' +
            '<div class="row footer-link text-center" style="font-size: 14px;color: #959494;">All rights reserved ©2021 BarkYours</div></div></footer>');
            $('.footer-links a').attr("target", '_blank')
    }

});
