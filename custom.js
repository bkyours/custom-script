
$(document).ready(function(){

    addFooter();
    initializeFAQPopUp();
    displayLandingPageOrHomepage();
    addDecimalToListingPagePrice();
    showHiddenNotification();
    initializeLoginInfo();
    removeOptionalTextFromFilters();

    function displayLandingPageOrHomepage(){
        var currentURL = window.location.href;

        var shouldDisplayLandingpage = !currentURL.includes("category") &&
            !currentURL.includes("filter_option") &&
            !currentURL.includes("view=list") &&
            !currentURL.includes("view=map") &&
            !currentURL.includes("view=grid") &&
            !currentURL.includes("price_min") &&
            !currentURL.includes("price_max") ;

        if(shouldDisplayLandingpage){
            displayLandingPage();
        }else{
            setTimeout(customizeGrid, 1000);
        }
    }

    function customizeGrid(){
        $(".home-fluid-thumbnail-grid").css("visibility", "visible");
        $( ".home-fluid-thumbnail-grid-item" ).each(function( index ) {
            if(!$(this).hasClass("customized")){
                $(".home-fluid-thumbnail-grid-author-avatar").remove();
                var priceTag = $( this ).find(".fluid-thumbnail-grid-image-price-container");
                var priceTagSpan = priceTag.find("span");
                var price = priceTagSpan.text().replace(/(\r\n\t|\n|\r\t)/gm,"");
                if(price.indexOf('.') == -1){
                    priceTagSpan.text(price + ".00"); // add two decimal unit if not
                }
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

    // List view
    if($(".home-list-price").length){
        addDecimalInListView();
    }

    function addDecimalInListView(){
        // debugger;
        // Adding decimal in Listing page price
        $( ".home-list-item-price-value" ).each(function( index ) {
            if($(this).text().indexOf('.') == -1){
                $(this).text($(this).text().replace(/(\r\n\t|\n|\r\t)/gm,"") + ".00"); // add two decimal unit if not
            }
        });

        $(".listing-price-amount").css("visibility", "visible");

    }

    function customizePeopleGrid(){
        $( ".people-fluid-thumbnail-grid-item" ).each(function( index ) {
            if(!$(this).hasClass("customized")) {

                var priceTag = $(this).find(".fluid-thumbnail-grid-image-price-container");
                var priceTagSpan = priceTag.find("span");
                var price = priceTagSpan.text().replace(/(\r\n\t|\n|\r\t)/gm,"");
                if(price.indexOf('.') == -1){
                    priceTagSpan.text(price + ".00"); // add two decimal unit if not
                }
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

    function addFooter(){

        categoriesLink = '';
        $.map(categories, function (value, index) {
            categoriesLink += '<a href="'+ value.url +'">' + value.title + '</a></div><div class="col-sm-12 col-xs-6">';
        });
        $('body').append('<footer><div class=layout-centered-content><div class="row footer-links"><div class="col-xs-12 col-sm-4">' +
            '<div class=row><h3>Shop</h3><div class="col-sm-12 col-xs-6">' +
            categoriesLink +
            '</div></div></div><div class="col-xs-12 col-sm-4">' +
            '<div class=row><h3>Learn more</h3><div class="col-sm-12 col-xs-6">' +
            '<a href=/en/infos/about>About Bark Yours</a></div><div class="col-sm-12 col-xs-6">' +
            '<a class= "faq-popup-trigger" href=#faq-popup>FAQs</a></div><div class="col-sm-12 col-xs-6">' +
            '<a href=/en/infos/how_to_use>How it Works</a></div><div class="col-sm-12 col-xs-6">' +
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

    }

    function initializeFAQPopUp(){
        var popUpcontent = '<div id="faq-popup" class="faq-overlay"><div class="faq-popup"><div class="popup-header"><h2>Frequently Asked Questions</h2><a class="close faq-popup-close" href="#">&times;</a><div class="faq-searchbar-wrapper"><div class="faq-search-input-wrapper"><input type="search" class="faq-searchbar" placeholder="Search..."><button type="submit" class="SearchBar__searchButton__1Ck2b" style="background-color:transparent;" data-reactid="54"><svg width="17" height="17" viewBox="336 14 17 17" xmlns="http://www.w3.org/2000/svg"><g opacity=".7" fill="none" fill-rule="evenodd" transform="matrix(-1 0 0 1 352 15)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M11 11l3.494 3.494"></path><circle cx="6" cy="6" r="6"></circle></g></svg></button></div></div></div><div class="main-content"><div class="box"><ul class="question-list">';

        // popUpcontent += '<li id=""qnsHeadForShopper><a href="#qnsAnsHeadForShopper">I am a Bark Yours Shopper</a></li>';

        var qnsListForShopper = $.map(questionAnswerForShopper, function (value, index) {
            return ('<div class="qns-list"><li id="link-for-shopper-question-' + index + '"><a href=#question-shopper-' + index + ' class="question-link">' + value.qns + '</a></li></div>');
        });

        var qnsListForSeller = $.map(questionAnswerForSeller, function (value, index) {
            return ('<div class="qns-list"> <li id="link-for-seller-question-' + index + '"><a href=#question-seller-' + index + ' class="question-link">' + value.qns + '</a></li></div>');
        });

        var qnsListString = '<li id="qnsHeadForShopper"><a href="#qnsAnsHeadForShopper">I am a Bark Yours Shopper</a></li>';
        $.each(qnsListForShopper, function () {
            qnsListString += this;
        });

        qnsListString +='<li id="qnsHeadForSeller"><a href="#qnsAnsHeadForSeller">I am a Bark Yours Seller</a></li>';

        $.each(qnsListForSeller, function () {
            qnsListString += this;
        });

        var popUpcontent1 = '</ul></div><div class="content padding-25">';

        var qnsAnsListForSeller = $.map(questionAnswerForSeller, function (value, index) {
            return ('<div class="box" id="question-seller-' + index + '">' + '\n<div class="question">' + value.qns + '</div>\n<div class="answer">' + value.ans + '</div></div>');
        });

        var qnsAnsListForShopper = $.map(questionAnswerForShopper, function (value, index) {
            return ('<div class="box" id="question-shopper-' + index + '">' + '\n<div class="question" id="">' + value.qns + '</div>\n<div class="answer">' + value.ans + '</div></div>');
        });
        var qnsAnsListString = '<div class="box faq-category-title" id="qnsAnsHeadForShopper"><span>I am a Bark Yours Shopper</span></div>';
        $.each(qnsAnsListForShopper, function () {
            qnsAnsListString += this || '';
        });

        qnsAnsListString += '<div class="box faq-category-title" id="qnsAnsHeadForSeller"><span>I am a Bark Yours Seller</span></div>';

        $.each(qnsAnsListForSeller, function () {
            qnsAnsListString += this || '';
        });

        var popUpcontent2 = '</div></div></div></div>';
        $('body').append(popUpcontent + qnsListString + popUpcontent1 + qnsAnsListString + popUpcontent2);

        $(".faq-popup-close").click(function () {
            $("body").removeClass("faq-open");
        });

        $("#faq-popup ul li a").click(function (e) {
            e.preventDefault();
            link = $(this);
            position = $(link.attr("href")).offset();
            topPosition = position.top;
            $('#faq-popup .main-content').animate({
                scrollTop: $(link.attr("href")).offset().top - 180
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
            var matchedFaqForSeller = 0;
            var matchedFaqForShopper = 0;

            $.each(questionAnswerForSeller, function (index, value) {
                if (value.qns.toLowerCase().includes(searchKey.toLowerCase()) ||
                    value.ans.toLowerCase().includes(searchKey.toLowerCase())) {
                    $("#question-seller-" + index).show();
                    $("#link-for-seller-question-" + index).show();
                    matchedFaqForSeller++;
                }
                else {
                    $("#question-seller-" + index).hide();
                    $("#link-for-seller-question-" + index).hide()
                }

            });
            $.each(questionAnswerForShopper, function (index, value) {

                if (value.qns.toLowerCase().includes(searchKey.toLowerCase()) ||
                    value.ans.toLowerCase().includes(searchKey.toLowerCase())) {
                    $("#question-shopper-" + index).show();
                    $("#link-for-shopper-question-" + index).show();
                    matchedFaqForShopper++;
                }
                else {
                    $("#question-shopper-" + index).hide();
                    $("#link-for-shopper-question-" + index).hide();
                }

            });


            if(matchedFaqForSeller == 0){
                $("#faqTitleSeller").hide();
                $("#qnsAnsHeadForSeller").hide();
                $("#qnsHeadForSeller").hide();
            }
            else{
                $("#faqTitleSeller").show();
                $("#qnsAnsHeadForSeller").show();
                $("#qnsHeadForSeller").show();

            }

            if(matchedFaqForShopper == 0){
                $("#faqTitleShopper").hide();
                $("#qnsAnsHeadForShopper").hide();
                $("#qnsHeadForShopper").hide();
            }
            else{
                $("#faqTitleShopper").show();
                $("#qnsAnsHeadForShopper").show();
                $("#qnsHeadForShopper").show();

            }

            $('#faq-popup .main-content').animate({
                scrollTop: 0
            }, 500);
        });
    }

    function initializeLoginInfo(){
        // if login page is loaded after clicking the Create new listing button on topbar,
        // then only show the right side content
        $(".AddNewListingButton").click(function(){
            var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
            localStorage.setItem("postNewListingClicked", timeStampInMs);
        });

        if($(".login-form").length){
            var postNewListingClickedTimeSpan =  localStorage.getItem("postNewListingClicked");
            if( postNewListingClickedTimeSpan && (Date.now() - parseInt(postNewListingClickedTimeSpan) <= 5 * 1000 )){
                showLoginInfoForSeller();
            }
        }
    }

    function showLoginInfoForSeller(){

        // Login form right side content
        $(".centered-section-narrow").css("margin-left", 0);
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

        // Insert flash notice inside the left side just above the login form
        if($(".flash-notifications").length){

            $(".flash-notifications").prependTo($(".login-container"));
        }

    };

    function addDecimalToListingPagePrice(){
        // Adding decimal in Listing page price
        if($(".listing-details-container").length){
            if($(".listing-price-amount").text().indexOf('.') == -1){
                $(".listing-price-amount").text($(".listing-price-amount").text().replace(/(\r\n\t|\n|\r\t)/gm,"") + ".00"); // add two decimal unit if not
            }
            $(".listing-price").css("visibility", "visible");
            $(".listing-price-amount").css("visibility", "visible");
        }
    }

    function showHiddenNotification(){
        // Display flash notice(it is hidden due to some design issue on the login page)
        if($(".flash-notifications").length){
            $(".flash-notifications").css("visibility", "visible");
        }
    }

    function displayLandingPage(){
        $(".home-fluid-thumbnail-grid").empty();
        $(".home-fluid-thumbnail-grid").css("visibility", "visible");
        $(".home-toolbar-button-group-button").removeClass("selected");

        $(".home-fluid-thumbnail-grid").append("<div class='row' style='border-bottom: 1px solid #c3c3c3; width: 97%'> <h3>Featured Categories</h3></div><hr>");
        $.map(featuredCategories, function (value, index) {
            $(".home-fluid-thumbnail-grid").append('<div class="home-fluid-thumbnail-grid-item featured-categories">' +
                '<div>' +
                '<a class=" fluid-thumbnail-grid-image-item-link" href="' + value.url + '">' +
                '<div class="fluid-thumbnail-grid-image-image-container">' +
                '<img alt="'+ value.title + '" class=" fluid-thumbnail-grid-image-image" src="' + value.image + '">' +
                '<div class="home-fluid-thumbnail-grid-author">' +
                '<div class="fluid-thumbnail-grid-image-title">'+ value.title + '</div>' +
                '</div>' +
                '</div></a>' +
                '</div></div>')
        });

        $(".home-fluid-thumbnail-grid").append("<div class='row' style='border-bottom: 1px solid #c3c3c3; width: 97%'> <h3>Items of the Week</h3></div><hr>");

        $.map(itemsOfWeek, function (listing, index) {
            if(listing.title == "View all Listings"){
                $(".home-fluid-thumbnail-grid").append('<div class="home-fluid-thumbnail-grid-item view-all-listing">' +
                    ' <div> <a class=" fluid-thumbnail-grid-image-item-link" href="'+ listing.url + '">' +
                    '<div class="fluid-thumbnail-grid-image-image-container">' +
                    ' <img alt="'+listing.title+'" class=" fluid-thumbnail-grid-image-image" src="'+listing.image+'">' +
                    '</div></a> ' +
                    '<div class="home-fluid-thumbnail-grid-author">' +
                    '<div class="price-container">' +
                    '<div class="fluid-thumbnail-grid-image-price-container" style="width:0;">' +
                    '</div></div>' +
                    '<div class="info-container" >' +
                    '<a href="'+listing.url+'" class="fluid-thumbnail-grid-image-title">'+listing.title+'</a>' +
                    '</div></div></div></div>');


            }else{
                $(".home-fluid-thumbnail-grid").append('<div class="home-fluid-thumbnail-grid-item">' +
                    ' <div> <a class=" fluid-thumbnail-grid-image-item-link" href="'+ listing.url + '">' +
                    '<div class="fluid-thumbnail-grid-image-image-container">' +
                    ' <img alt="'+listing.title+'" class=" fluid-thumbnail-grid-image-image" src="'+listing.image+'">' +
                    '</div></a> ' +
                    '<div class="home-fluid-thumbnail-grid-author">' +
                    '<div class="price-container">' +
                    '<div class="fluid-thumbnail-grid-image-price-container">' +
                    ' <span class="fluid-thumbnail-grid-image-price">'+ listing.price +'</span>' +
                    ' </div></div>' +
                    '<div class="info-container" >' +
                    '<div class="fluid-thumbnail-grid-image-title">'+listing.title+'</div>' +
                    '<a class="home-fluid-thumbnail-grid-author-name" title="'+listing.seller_name+'" href="'+listing.seller_url+'">'+listing.seller_name+'</a></div></div></div></div>')

                elem = $(".home-fluid-thumbnail-grid").children().last();
                var priceTag = elem.find(".fluid-thumbnail-grid-image-price-container");
                var priceTagSpan = priceTag.find("span");
                var price = priceTagSpan.text().replace(/(\r\n\t|\n|\r\t)/gm,"");
                if(price.indexOf('.') == -1){
                    priceTagSpan.text(price + ".00"); // add two decimal unit if not
                }
                var title = elem.find(".fluid-thumbnail-grid-image-title");


                var authorContainer = elem.find(".home-fluid-thumbnail-grid-author");

                var availableWidth = authorContainer.width() - elem.find(".price-container").width();
                elem.find(".info-container").css("width", (availableWidth - 3) + "px");
                elem.addClass("customized");
            }
        });
    }

    function removeOptionalTextFromFilters(){
        $( ".custom-filter-title" ).each(function(  ) {
            $(this).text($(this).text().replace(/(\r\n\t|\n|\r\t)/gm,"").replace("(Optional)", ""));
        });

        $(".listing-details-container b").each(function(  ) {
            $(this).text($(this).text().replace(/(\r\n\t|\n|\r\t)/gm,"").replace("(Optional)", ""));
        });
    }

});