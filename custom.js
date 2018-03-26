// var questionAnswer = [
//     {
//         "qns": 'I am a Bark Yours Shopper',
//         "ans": 'Answer goes here.'
//     },
//     {
//         "qns": 'I am a Bark Yours Seller',
//         "ans": 'Answer goes here'
//     }];

$(document).ready(function(){

    setTimeout(customizeGrid, 1000);

    function customizeGrid(){
        $( ".home-fluid-thumbnail-grid-item" ).each(function( index ) {
            if(!$(this).hasClass("customized")){
                $(".home-fluid-thumbnail-grid-author-avatar").remove();
                var priceTag = $( this ).find(".fluid-thumbnail-grid-image-price-container");
                // var priceTag = $( this ).find(".fluid-thumbnail-grid-image-price");
                var title = $( this ).find(".fluid-thumbnail-grid-image-title");
                var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");

                var authorLink = $( this ).find(".home-fluid-thumbnail-grid-author-name");


                authorContainer.prepend('<div class="price-container"></div>');
                authorContainer.append('<div class="info-container"></div>');
                authorContainer.find(".price-container").prepend(priceTag);
                authorContainer.find(".info-container").prepend(authorLink);
                authorContainer.find(".info-container").prepend(title);
                var availableWidth = authorContainer.width() - $(this).find(".price-container").width();
                $(this).find(".info-container").css("width", (availableWidth - 3) + "px");
                $(this).addClass("customized");
            }

        });

    }

    if($("#profile-listings-list").length){
        setTimeout(customizePeopleGrid, 1000);
    }

    function customizePeopleGrid(){
        $( ".people-fluid-thumbnail-grid-item" ).each(function( index ) {
            if(!$(this).hasClass("customized")) {

                var priceTag = $(this).find(".fluid-thumbnail-grid-image-price-container");
                var title = $(this).find(".fluid-thumbnail-grid-image-title");

                $(this).append('<div class="home-fluid-thumbnail-grid-author"><div class="price-container"></div><div class="info-container"></div></div>');

                var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");

                authorContainer.find(".price-container").prepend(priceTag);
                authorContainer.find(".info-container").prepend(title);
                var availableWidth = authorContainer.width() - $(this).find(".price-container").width();
                $(this).find(".info-container").css("width", (availableWidth - 3) + "px");
                $(this).addClass("customized");
            }
        });
    }

    $('body').append('<footer><div class=layout-centered-content><div class="row footer-links"><div class="col-xs-12 col-sm-4">' +
        '<div class=row><h3>Shop</h3><div class="col-sm-12 col-xs-6">' +
        '<a href="/?category=clothing-and-accessories">Clothing and Accessories</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href="/?category=jewelry">Jewelry</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href="/?category=around-the-house">Around the House</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href="/?category=paper-goods1">Paper Goods</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href="/?category=arts-and-collectibles">Art and Collectibles</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href="/?filter_option_271898=271898">Gifts for Her</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href="/?filter_option_271899=271899">Gifts for Him</a></div>' +
        '</div></div><div class="col-xs-12 col-sm-4">' +

        '<div class=row><h3>Learn more</h3><div class="col-sm-12 col-xs-6">' +
        '<a href=/en/infos/about>About Bark Yours</a></div><div class="col-sm-12 col-xs-6">' +
        '<a class= "faq-popup-trigger" href=#faq-popup>FAQs</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href=/en/infos/how_to_use>Selling on Bark Yours</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href=/user_feedbacks/new>Contact us</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href=/invitations/new>Invite Others</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href=/en/infos/privacy>Privacy Policy</a></div><div class="col-sm-12 col-xs-6">' +
        '<a href=/en/infos/terms>Terms of Use</a></div></div></div>' +
        '<div class="col-xs-12 col-sm-4">' +
        '<div class="row"><h3>Follow Bark Yours</h3>' +
        '<div class="col-xs-12 "><a class="icon-with-text-container" href="https://www.facebook.com/barkyours"><i class="fa fa-facebook icon-part"></i> <div class="text-part">Facebook</div></a></div>' +
        '<div class="col-xs-12"><a class="icon-with-text-container" href="https://www.instagram.com/barkyours"><i class="fa fa-instagram icon-part"></i> <div class="text-part">Instagram</div></a></div>' +
        '<div class="col-xs-12"><a class="icon-with-text-container" href="https://www.twitter.com/barkyours"><i class="fa fa-twitter icon-part"></i> <div class="text-part">Twitter</div></a></div>' +
        '</div></div></div>' +
        '<div class="row footer-link text-center" style="font-size: 14px;color: #959494;">All rights reserved ©2018 Bark Yours</div></div></footer>');

    setTimeout(function () {
        // $('a[href="/invitations/new"]').text("FAQs").attr("href", "#faq-popup").addClass("faq-popup-trigger");
        // $('a[href="/en/invitations/new"]').text("FAQs").attr("href", "#faq-popup").addClass("faq-popup-trigger");
        // $(".faq-popup-trigger").click(function () {
        //     $("body").addClass("faq-open");
        // });
    }, 1);

    //


    var popUpcontent = '<div id="faq-popup" class="faq-overlay"><div class="faq-popup"><div class="popup-header"><h2>Frequently Asked Questions</h2><a class="close faq-popup-close" href="#">&times;</a><div class="faq-searchbar-wrapper"><div class="faq-search-input-wrapper"><input type="search" class="faq-searchbar" placeholder="Search..."><button type="submit" class="SearchBar__searchButton__1Ck2b" style="background-color:transparent;" data-reactid="54"><svg width="17" height="17" viewBox="336 14 17 17" xmlns="http://www.w3.org/2000/svg"><g opacity=".7" fill="none" fill-rule="evenodd" transform="matrix(-1 0 0 1 352 15)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M11 11l3.494 3.494"></path><circle cx="6" cy="6" r="6"></circle></g></svg></button></div></div></div><div class="main-content"><div class="box"><ul class="question-list">';
    var qnsList = $.map(questionAnswer, function (value, index) {
        // debugger;
        return ('<li id="link-for-question-' + index + '"><a href=#question-' + index + ' class="question-link">' + value.qns + '</a></li>');
    });
    var qnsListString = '';
    $.each(qnsList, function () {
        qnsListString += this || '';
    });

    var popUpcontent1 = '</ul></div><div class="content">';

    var qnsAnsList = $.map(questionAnswer, function (value, index) {
        return ('<div class="box" id="question-' + index + '">' + '\n<div class="question">' + value.qns + '</div>\n<div class="answer">' + value.ans + '</div>\n<div class="top-link"><span class="fa fa-arrow-up navigate-top">TOP</span>\n</div>\n</div>');
    });
    var qnsAnsListString = '';
    $.each(qnsAnsList, function () {
        qnsAnsListString += this || '';
    });

    var popUpcontent2 = '</div></div></div></div>';
    $('body').append(popUpcontent + qnsListString + popUpcontent1 + qnsAnsListString + popUpcontent2);

    $(".faq-popup-close").click(function () {
        $("body").removeClass("faq-open");
    });

    $(".question-link").click(function (e) {
        e.preventDefault();
        $('#faq-popup .main-content').animate({
            scrollTop: $($(this).attr("href")).offset().top - 200
        }, 500);
    });

    $(".navigate-top").click(function (e) {
        e.preventDefault();
        $('#faq-popup .main-content').animate({
            scrollTop: 0
        }, 500);
    });

    // check if #faq-popup present in url while page reload
    var url = window.location.href;
    // Get DIV
    // Check if URL contains the keyword
    if (url.search('#faq-popup') > 0) {
        // Display the message
        setTimeout(function () {
            $(".faq-popup-trigger")[0].click();
        }, 500);
    }


    // Search question and answer based on user input on faq search textbox
    $(".faq-searchbar").on('input propertychange paste', function () {
        var searchKey = $(this).val();
        $.each(questionAnswer, function (index, value) {
            if (value.qns.toLowerCase().includes(searchKey.toLowerCase()) || value.ans.toLowerCase().includes(searchKey.toLowerCase())) {
                $("#link-for-question-" + index).show();
                $("#question-" + index).show();
            }
            else {
                $("#link-for-question-" + index).hide();
                $("#question-" + index).hide();
            }

        });
        $('#faq-popup .main-content').animate({
            scrollTop: 0
        }, 500);
    });
    //

    if($(".login-form").length){
        $(".wrapper").addClass("row");
        $(".wrapper").prepend('<div class="login-container col-xs-12 col-sm-6"></div>');
        $(".wrapper").append('<div class="login-info-container col-xs-12 col-sm-6"></div>');
        $(".login-form").appendTo($(".login-container"));
        $(".login-info-container").prepend('' +
            '<div class="login-info">' +
            '<h3>Selling on Bark Yours</h3>' +
            "<p>Dog lovers everywhere are searching for that perfect gift, and Bark Yours is a targeted marketplace for the dog loving community.  Our mission is to connect dog lovers to the gifts that remind them of their best friends.  And, to make it easy for sellers to reach a very targeted audience.  If you have any products that fill that need - be it t-shirts, home goods, games, or anything else - then this is the place to sell them.  We'll bring the dog lovers to you, and there's no commitment or cost to you unless you sell something.  Give us a try.</p>" +
            "<h3>It's easy. </h3>" +
            '<p>It takes minutes to sign up.  And posting items is just as easy. </p>' +
            '<h3>Selling on Bark Yours</h3>' +
            '<p>It takes minutes to sign up.  And posting items is just as easy. </p>' +
            '<h3>There are no listing fees.</h3>' +
            "<p>If you don't sell anything, you don't pay anything.  There are no listing fees and no monthly fees.  But, we'll make sure you do sell.  Once you sell an item, there is a 10% fee.  This includes all payment processing fees, administrative fees, and a small commission. </p>" +
            "<h3>And, we're here to help if you need anything.</h3>" +
            "<p>Contact us anytime.  We are eager to hear from you and waiting to help.</p>"+
            '</div>');
    }

});