infiniteScrollToPagination();

$(document).ready(function () {
    addFooter();
    initializeFAQPopUp();
    displayLandingPageOrHomepage();
    addDecimalToListingPagePrice();
    showHiddenNotification();
    initializeLoginInfo();
    removeOptionalTextFromFilters();
    addAboutTheSellerLink();
    addSizeFilter();
    
    
        var loggedIn = $(".AvatarDropdown").length > 0;

        if(!loggedIn) {
            $(".enabled-book-button").click(function(e){
                e.preventDefault();
                var listingTitle = $("#listing-title").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                var listingPrice = $(".listing-price-amount").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                var listingUrl = window.location.href;
                var listingThumb = null;

                if($("#listing-image-link img").length){
                    listingThumb = $("#listing-image-link img")[0].src.replace("/big/", "/thumb/");
                }
                var shippingLbl = "";
                if($(".shipping-options-label").length){
                    shippingLbl = $(".shipping-options-label").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                }

                localStorage.setItem("lastUpdate", new Date().getTime());
                localStorage.setItem("listingTitle", listingTitle);
                localStorage.setItem("listingURL", listingUrl);
                localStorage.setItem("listingThumb", listingThumb);
                localStorage.setItem("listingPrice", listingPrice);
                localStorage.setItem("shippingLbl", shippingLbl);

                window.location.href = "https://www.barkyours.com/en/login?checkout=true";
            });

            if($(".login-form").length){
                checkout = getUrlParameter("checkout");
                if(checkout == "true"){
                    customizeLoginPage();
                }


            }



        }

        function customizeLoginPage(){
            //////////////////////// HOTFIX
            $("footer").hide();
            //////////////////////// HOTFIX

            var checkoutParams = fetchLocalStorageItem();
            $(".wrapper").addClass("customize-login-page");
           $(".wrapper").append("<div class='row col-12'>" +
               "<div class='col-4 login-form-section'><div class='section-wrapper'></div></div>" +
               "<div class='col-4 signup-link-section'><div class='section-wrapper'><h1>New Users</h1>" +
               "<p>Create your account.</p>" +
               "<p>Registration is quick and easy.</p>" +
               "<a href='https://www.barkyours.com/en/signup?checkout=true' class='create-account-link'>Create your account</a></div></div>" +
               "<div class='col-4 cart-item-list'><div class='section-wrapper'><h1>In Your Cart</h1>" +
               "<a href='"+ checkoutParams.listingURL+"'>"+ checkoutParams.listingTitle +
               "<table>" +
               "<thead><tr><th colspan='2'></th></tr></thead>" +
               "<tbody><tr style='background: white;'>" +
               "<td><img src='"+ checkoutParams.listingThumb+"'></td>" +
               "<td><table>" +
               "<tr style='background: white;'><td style='padding: 5px 0;'>Price: " + checkoutParams.listingPrice + "</td></tr>" +
               "<tr style='background: white;'><td style='padding: 5px 0;'>" + checkoutParams.shippingLbl + "</td></tr>" +
               "</table></td>" +
               "</tr></tbody>" +
               "</table>" +
               "</a>" +
               "</div></div>" +
               "</div>");

            // Login section customization
           $(".login-form").appendTo(".login-form-section .section-wrapper");
           $("#password_forgotten").appendTo(".login-form-section .section-wrapper");
           $(".login-form").prepend("<h1>Existing Users</h1>");
        }

        function fetchLocalStorageItem(){
            return {
                "lastUpdate": localStorage.getItem("lastUpdate"),
                "listingTitle": localStorage.getItem("listingTitle"),
                "listingURL": localStorage.getItem("listingURL"),
                "listingThumb": localStorage.getItem("listingThumb"),
                "listingPrice": localStorage.getItem("listingPrice"),
                "shippingLbl": localStorage.getItem("shippingLbl")
            }

        }


    function displayLandingPageOrHomepage() {
        var currentURL = window.location.href;
        var showListingList = currentURL.indexOf("category") >= 0 || currentURL.indexOf("filter_option") >= 0 || currentURL.indexOf("view=list") >= 0 || currentURL.indexOf("view=map") >= 0 || currentURL.indexOf("view=grid") >= 0 || currentURL.indexOf("price_min") >= 0 || currentURL.indexOf("?q=") >= 0 || currentURL.indexOf("?page=") >= 0 || currentURL.indexOf("price_max") >= 0;

        if (!showListingList) {
            addBannerForNotLoggedIn();
            addViewAllListingLink();
            displayLandingPage();

        } else {
            setInterval(customizeGrid, 1000);
        }
    }

    function addBannerForNotLoggedIn() {

        if ($("#homepage-filters").length > 0) {
            console.log("homepage detected");
            if ($(".marketplace-lander-content-title").length > 0) {
            }
            else {
                console.log("user is logged In");
                $(".marketplace-lander").append('<div class="coverimage"><figure class="marketplace-cover fluidratio"> <div class="lander-content marketplace-lander-content"> <h1 class="marketplace-lander-content-title">' + marketplace_slogan + '</h1> <p class="marketplace-lander-content-description">' + marketplace_description + '</p> </div> </figure> </div>');
            }
        } else {
            console.log("Not Homepage");
            $(".title-container").css("background", "#fff").css("border-bottom", "1px solid rgba(0,0,50,0.1)");
        }
    }

    function addViewAllListingLink() {

        if ($(".home-fluid-thumbnail-grid").length > 0) {
            $("<div class='full-width text-center' style='margin-top: 20px'> <a class='view-all-listing-link-btn' href='https://www.barkyours.com/?view=grid'> VIEW ALL LISTINGS</a></div>").insertAfter($(".home-fluid-thumbnail-grid"));
        }
    }


    function addViewFieldOnSearch() {
        var view = $("#view").val();
        $("#topbar-container form").prepend('<input type="hidden" name="view" id="view1" value="' + view + '">');
    }

    function customizeGrid() {
        $(".home-fluid-thumbnail-grid").css("visibility", "visible");
        $(".home-fluid-thumbnail-grid-item").each(function (index) {
            if (!$(this).hasClass("customized")) {
                $(".home-fluid-thumbnail-grid-author-avatar").remove();
                var priceTag = $(this).find(".fluid-thumbnail-grid-image-price-container");
                var priceTagSpan = priceTag.find("span");
                var price = priceTagSpan.text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                if (price.indexOf('.') == -1) {
                    priceTagSpan.text(price + ".00");
                }
                var title = $(this).find(".fluid-thumbnail-grid-image-title");
                var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");
                var authorLink = $(this).find(".home-fluid-thumbnail-grid-author-name");
                authorContainer.prepend('<div class="price-container"></div>');
                authorContainer.prepend(title);
                authorContainer.append('<div class="info-container"></div>');
                authorContainer.find(".price-container").prepend(priceTag);
                authorContainer.find(".info-container").prepend(authorLink);
                // authorContainer.find(".info-container").prepend(title);
                var availableWidth = authorContainer.width() - $(this).find(".price-container").width();
                $(this).find(".info-container").css("width", (availableWidth - 3) + "px");
                $(this).addClass("customized");
            }
        });
    }

    if ($("#profile-listings-list").length) {
        setInterval(customizePeopleGrid, 1000);
    }
    if ($(".home-list-price").length) {
        addDecimalInListView();
    }
    function addDecimalInListView() {
        $(".home-list-item-price-value").each(function (index) {
            if ($(this).text().indexOf('.') == -1) {
                $(this).text($(this).text().replace(/(\r\n\t|\n|\r\t)/gm, "") + ".00");
            }
        });
        $(".listing-price-amount").css("visibility", "visible");
    }

    function customizePeopleGrid() {
        $(".people-fluid-thumbnail-grid-item").each(function (index) {
            if (!$(this).hasClass("customized")) {
                var priceTag = $(this).find(".fluid-thumbnail-grid-image-price-container");
                var priceTagSpan = priceTag.find("span");
                var price = priceTagSpan.text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                if (price.indexOf('.') == -1) {
                    priceTagSpan.text(price + ".00");
                }
                var title = $(this).find(".fluid-thumbnail-grid-image-title");
                $(this).append('<div class="home-fluid-thumbnail-grid-author"><div class="price-container"></div><div class="info-container"></div></div>');
                var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");
                authorContainer.find(".price-container").prepend(priceTag);
                //authorContainer.find(".info-container").prepend(title);
                authorContainer.prepend(title);
                var availableWidth = authorContainer.width() - $(this).find(".price-container").width();
                $(this).find(".info-container").css("width", (availableWidth - 3) + "px");
                $(this).addClass("customized");
            }
        });
    }

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
            '</div></div></div>' +
            '<div class="row footer-link text-center" style="font-size: 14px;color: #959494;">All rights reserved ©2018 BarkYours</div></div></footer>');
    }

    function initializeFAQPopUp() {
        $("#topbar-container a").removeAttr("target")
        var popUpcontent = '<div id="faq-popup" class="faq-overlay"><div class="faq-popup"><div class="popup-header"><h2>Frequently Asked Questions</h2><a class="close faq-popup-close" href="#">&times;</a><div class="faq-searchbar-wrapper"><div class="faq-search-input-wrapper"><input type="search" class="faq-searchbar" placeholder="Search..."><button type="submit" class="SearchBar__searchButton__1Ck2b" style="background-color:transparent;" data-reactid="54"><svg width="17" height="17" viewBox="336 14 17 17" xmlns="http://www.w3.org/2000/svg"><g opacity=".7" fill="none" fill-rule="evenodd" transform="matrix(-1 0 0 1 352 15)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M11 11l3.494 3.494"></path><circle cx="6" cy="6" r="6"></circle></g></svg></button></div></div></div><div class="main-content"><div class="box" id = "qns-box"><ul class="question-list">';
        var qnsListForShopper = $.map(questionAnswerForShopper, function (value, index) {
            return ('<div class="qns-list"><li id="link-for-shopper-question-' + index + '"><a href=#question-shopper-' + index + ' class="question-link">' + value.qns + '</a></li></div>');
        });
        var qnsListForSeller = $.map(questionAnswerForSeller, function (value, index) {
            return ('<div class="qns-list"> <li id="link-for-seller-question-' + index + '"><a href=#question-seller-' + index + ' class="question-link">' + value.qns + '</a></li></div>');
        });
        var qnsListString = '<li id="qnsHeadForShopper"><a href="#qnsAnsHeadForShopper">I am a BarkYours Shopper</a></li>';
        $.each(qnsListForShopper, function () {
            qnsListString += this;
        });
        qnsListString += '<li id="qnsHeadForSeller"><a href="#qnsAnsHeadForSeller">I am a BarkYours Seller</a></li>';
        $.each(qnsListForSeller, function () {
            qnsListString += this;
        });
        var popUpcontent1 = '</ul></div><div class="content padding-25">';
        var qnsAnsListForSeller = $.map(questionAnswerForSeller, function (value, index) {
            return ('<div class="box" id="question-seller-' + index + '">' + '\n<div class="question">' + value.qns + '</div>\n<div class="answer">' + value.ans + '</div>\n<div class="top-link"><span class="fa fa-arrow-up navigate-top">TOP</span>\n</div></div>');
        });
        var qnsAnsListForShopper = $.map(questionAnswerForShopper, function (value, index) {
            return ('<div class="box" id="question-shopper-' + index + '">' + '\n<div class="question" id="">' + value.qns + '</div>\n<div class="answer">' + value.ans + '</div>\n<div class="top-link"><span class="fa fa-arrow-up navigate-top">TOP</span>\n</div></div>');
        });
        var qnsAnsListString = '<div class="box faq-category-title" id="qnsAnsHeadForShopper"><span>I am a BarkYours Shopper</span></div>';
        $.each(qnsAnsListForShopper, function () {
            qnsAnsListString += this || '';
        });
        qnsAnsListString += '<div class="box faq-category-title" id="qnsAnsHeadForSeller"><span>I am a BarkYours Seller</span></div>';
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
            elemId = $(this).attr("href");
            $(elemId).scrollTop(0);
            $('#faq-popup .main-content').animate({scrollTop: $(elemId).offset().top - $("#qns-box").offset().top}, 500);
        });
        $(".navigate-top").click(function (e) {
            e.preventDefault();
            $('#faq-popup .main-content').animate({scrollTop: 0}, 500);
        });
        var url = window.location.href;
        if (url.search('#faq-popup') > 0) {
            setTimeout(function () {
                $(".faq-popup-trigger")[0].click();
            }, 500);
        }
        $(".faq-searchbar").on('input propertychange paste', function () {
            var searchKey = $(this).val();
            var matchedFaqForSeller = 0;
            var matchedFaqForShopper = 0;
            $.each(questionAnswerForSeller, function (index, value) {
                if (value.qns.toLowerCase().includes(searchKey.toLowerCase()) || value.ans.toLowerCase().includes(searchKey.toLowerCase())) {
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
                if (value.qns.toLowerCase().includes(searchKey.toLowerCase()) || value.ans.toLowerCase().includes(searchKey.toLowerCase())) {
                    $("#question-shopper-" + index).show();
                    $("#link-for-shopper-question-" + index).show();
                    matchedFaqForShopper++;
                }
                else {
                    $("#question-shopper-" + index).hide();
                    $("#link-for-shopper-question-" + index).hide();
                }
            });
            if (matchedFaqForSeller == 0) {
                $("#faqTitleSeller").hide();
                $("#qnsAnsHeadForSeller").hide();
                $("#qnsHeadForSeller").hide();
            }
            else {
                $("#faqTitleSeller").show();
                $("#qnsAnsHeadForSeller").show();
                $("#qnsHeadForSeller").show();
            }
            if (matchedFaqForShopper == 0) {
                $("#faqTitleShopper").hide();
                $("#qnsAnsHeadForShopper").hide();
                $("#qnsHeadForShopper").hide();
            }
            else {
                $("#faqTitleShopper").show();
                $("#qnsAnsHeadForShopper").show();
                $("#qnsHeadForShopper").show();
            }
            $('#faq-popup .main-content').animate({scrollTop: 0}, 500);
        });
    }

    function initializeLoginInfo() {
        $(".AddNewListingButton").click(function () {
            var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
            localStorage.setItem("postNewListingClicked", timeStampInMs);
        });
        if ($(".login-form").length) {
            var postNewListingClickedTimeSpan = localStorage.getItem("postNewListingClicked");
            if (postNewListingClickedTimeSpan && (Date.now() - parseInt(postNewListingClickedTimeSpan) <= 5 * 1000)) {
                showLoginInfoForSeller();
            }
        }
    }

    function showLoginInfoForSeller() {
        $(".centered-section-narrow").css("margin-left", 0);
        $(".wrapper").addClass("row");
        $(".wrapper").prepend('<div class="login-container col-xs-12 col-sm-6"></div>');
        $(".wrapper").append('<div class="login-info-container col-xs-12 col-sm-6"></div>');
        $(".login-form").appendTo($(".login-container"));
        $(".login-info-container").prepend('' +
            '<div class="login-info">' +
            '<h3>Selling on BarkYours</h3>' +
            "<p>Dog lovers everywhere are searching for that perfect gift, and BarkYours is a targeted marketplace for the dog loving community.  Our mission is to connect dog lovers to the gifts that remind them of their best friends.  And, to make it easy for sellers to reach a very targeted audience.  If you have any products that fill that need - be it t-shirts, home goods, games, or anything else - then this is the place to sell them.  We'll bring the dog lovers to you, and there's no commitment or cost to you unless you sell something.  Give us a try.</p>" +
            "<h3>It's easy. </h3>" +
            '<p>It takes minutes to sign up.  And posting items is just as easy. </p>' +
            '<h3>There are no listing fees.</h3>' +
            "<p>To read more about commissions charged for product sold click <a href='https://www.barkyours.com/en/infos/how_to_use'> here </a></p>" +
            "<h3>And, we're here to help if you need anything.</h3>" +
            "<p>Contact us anytime.  We are eager to hear from you and waiting to help.</p>" +
            '</div>');
        if ($(".flash-notifications").length) {
            $(".flash-notifications").prependTo($(".login-container"));
        }
    };
    function addDecimalToListingPagePrice() {
        if ($(".listing-details-container").length) {
            if ($(".listing-price-amount").text().indexOf('.') == -1) {
                $(".listing-price-amount").text($(".listing-price-amount").text().replace(/(\r\n\t|\n|\r\t)/gm, "") + ".00");
            }
            $(".listing-price").css("visibility", "visible");
            $(".listing-price-amount").css("visibility", "visible");
        }
    }

    function showHiddenNotification() {
        if ($(".flash-notifications").length) {
            $(".flash-notifications").css("visibility", "visible");
        }
    }


    function displayLandingPage() {
        $(".home-fluid-thumbnail-grid").empty();
        $(".home-fluid-thumbnail-grid").css("visibility", "visible");
        $(".home-toolbar-button-group-button").removeClass("selected");
        $(".home-fluid-thumbnail-grid").append("<div class='row' style='border-bottom: 1px solid #c3c3c3; width: 97%'> <h3>" + featuredCategoriesLabel + "</h3></div><hr>");
        $.map(featuredCategories, function (value, index) {
            $(".home-fluid-thumbnail-grid").append('<div class="home-fluid-thumbnail-grid-item featured-categories">' +
                '<div>' +
                '<a class=" fluid-thumbnail-grid-image-item-link" href="' + value.url + '">' +
                '<div class="fluid-thumbnail-grid-image-image-container">' +
                '<img alt="' + value.title + '" class=" fluid-thumbnail-grid-image-image" src="' + value.image + '">' +
                '<div class="home-fluid-thumbnail-grid-author">' +
                '<div class="fluid-thumbnail-grid-image-title">' + value.title + '</div>' +
                '</div>' +
                '</div></a>' +
                '</div></div>')
        });
        $(".home-fluid-thumbnail-grid").append("<div class='row' style='border-bottom: 1px solid #c3c3c3; width: 97%'> <h3>" + spotLightLabel + "</h3></div><hr>");
        $.map(spotLights, function (item, index) {
            if (item.type == "seller") {
                $(".home-fluid-thumbnail-grid").append('<div class="home-fluid-thumbnail-grid-item spotlight-grid spotlight-seller">' +
                    ' <div> <a class=" fluid-thumbnail-grid-image-item-link" href="' + item.seller_profile_url + '">' +
                    '<div class="fluid-thumbnail-grid-image-image-container featured-seller-grid">' +
                    ' <img alt="' + item.seller_name + '" class=" fluid-thumbnail-grid-image-image" src="' + item.image + '">' +
                    '</div></a> ' +
                    '<div class="home-fluid-thumbnail-grid-author">' +
                    '<div class="spotlight-type text-center">'+item.grid_label +'</div>' +
                    '<div class="info-container full-width text-center" >' +
                    '<a class="home-fluid-thumbnail-grid-author-name1 seller-profile-link" title="' + item.seller_name + '" href="' + item.seller_profile_url + '">' + item.seller_name + '</a>' +
                    '</div></div></div></div>');
            } else {
                $(".home-fluid-thumbnail-grid").append('<div class="home-fluid-thumbnail-grid-item spotlight-grid">' +
                    ' <div> <a class=" fluid-thumbnail-grid-image-item-link" href="' + item.url + '">' +
                    '<div class="fluid-thumbnail-grid-image-image-container">' +
                    ' <img alt="' + item.title + '" class=" fluid-thumbnail-grid-image-image" src="' + item.image + '">' +
                    '</div></a> ' +
                    '<div class="home-fluid-thumbnail-grid-author">' +
                    '<div class="spotlight-type text-center">'+item.grid_label +'</div>' +
                    '<div><div class="price-container">' +
                    '<div class="fluid-thumbnail-grid-image-price-container">' +
                    ' <span class="fluid-thumbnail-grid-image-price">' + item.price + '</span>' +
                    ' </div></div>' +
                    '<div class="info-container" >' +
                    '<div class="fluid-thumbnail-grid-image-title">' + item.title + '</div>' +
                    '<a class="home-fluid-thumbnail-grid-author-name" title="' + item.seller_name + '" href="' + item.seller_profile_url + '">' + item.seller_name + '</a>' +
                    '</div></div></div></div></div>');
                elem = $(".home-fluid-thumbnail-grid").children().last();
                var priceTag = elem.find(".fluid-thumbnail-grid-image-price-container");
                var priceTagSpan = priceTag.find("span");
                var price = priceTagSpan.text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                if (price.indexOf('.') == -1) {
                    priceTagSpan.text(price + ".00");
                }
                var title = elem.find(".fluid-thumbnail-grid-image-title");
                var authorContainer = elem.find(".home-fluid-thumbnail-grid-author");
                var availableWidth = authorContainer.width() - elem.find(".price-container").width();
                elem.find(".info-container").css("width", (availableWidth - 3) + "px");
                elem.addClass("customized");
            }
        });


    }

    function removeOptionalTextFromFilters() {
        $(".custom-filter-title").each(function () {
            $(this).text($(this).text().replace(/(\r\n\t|\n|\r\t)/gm, "").replace("(Optional)", ""));
        });
        $(".listing-details-container b").each(function () {
            $(this).text($(this).text().replace(/(\r\n\t|\n|\r\t)/gm, "").replace("(Optional)", ""));
        });
    }

    function addAboutTheSellerLink() {
        if ($(".col-8.listing-details-container").length) {
            // debugger;
            var contactLink = $("#listing-contact");
            var profileLink = $("#listing-author-link");
            var mainWrapper = $("<div class='row listing-additional_link'>" +
                "<div class='col-5'><div class='listing-author-contact'><a class='listing-author-contact-button' style = 'background-color: #0765a8; color: #fff;' href='" + contactLink.attr('href') + "'> <div class='content'>Special Request </div></a></div></div>" +
                "<div class='col-5'><div class='listing-author-contact'><a class='listing-author-contact-button' style = 'background-color: #0765a8; color: #fff;' href='" + profileLink.attr('href') + "'> <div class='content'>About the Seller </div></a></div></div>" +
                "</div>");

            mainWrapper.prependTo($(".listing-social").parent().parent());
        } else {
            console.log("other page")
        }
    }


    function addSizeFilter() {
        if ($(".listing-details-container").length) {

            var sizeFilterOptions = [];
            var colorFilterOptions = [];


            $(".listing-details-container .checkbox-group").each(function () {
                if ($(this).parent().find("b").text() == "Size:") {
                    $(this).parent().parent().hide();
                    $(this).find(".checkbox-option.selected").each(function () {
                        sizeFilterOptions.push($(this).find("span").last().text().replace(/(\r\n\t|\n|\r\t)/gm, ""));
                    });

                }
                else if ($(this).parent().find("b").text() == "Colors:") {
                    $(this).parent().parent().hide();
                    $(this).find(".checkbox-option.selected").each(function () {
                        colorFilterOptions.push($(this).find("span").last().text().replace(/(\r\n\t|\n|\r\t)/gm, ""));
                    });
                }
            });

            $("<div class='filter-dropdowns'><div class='row' id='sizeFilterWrapper'></div> <div class='row' id='colorFilterWrapper'></div></div>").insertBefore(".enabled-book-button");

            if (sizeFilterOptions.length || colorFilterOptions.length) {

                sizePresent = false;
                colorPresent = false;

                if(sizeFilterOptions.length){
                    var s = $('<select id="sizeFilter"/>');

                    $('<option />', {value: null, text: "Size"}).appendTo(s);

                    $.each(sizeFilterOptions, function (index, value) {
                        $('<option />', {value: value, text: value}).appendTo(s);
                    });

                    s.appendTo($('.filter-dropdowns #sizeFilterWrapper'));
                    sizePresent = true;
                }

                if(colorFilterOptions.length){
                    var s = $('<select id="colorFilter"/>');

                    $('<option />', {value: null, text: "Color"}).appendTo(s);

                    $.each(colorFilterOptions, function (index, value) {
                        $('<option />', {value: value, text: value}).appendTo(s);
                    });

                    s.appendTo($('.filter-dropdowns #colorFilterWrapper'));

                    colorPresent = true;

                }

                $(".filter-dropdowns").append("<a class='listing-author-contact-button' id='listingBuyButton' style = 'background-color: #0765a8; color: #fff;' href='#'> <div class='content'>Buy</div></a>")

                $(".enabled-book-button").hide();

                $("#listingBuyButton").click(function (e) {
                    e.preventDefault();
                    var listingID = $("#listing_id").val();

                    var size = $("#sizeFilter").val();
                    size = size == "Size" ? null : size;

                    var color = $("#colorFilter").val();
                    color = color == "Color" ? null : color;

                    var shippingEnabled = $("#delivery_shipping").prop('checked');
                    var pickupEnabled = $("#delivery_pickup").prop('checked');

                    url = "https://www.barkyours.com/en/listings/" + listingID + "/initiate?";

                    readyToRedirect = true;

                    if (size && size.length) {
                        url += "size=" + size + "&";
                    }

                    if (color && color.length) {
                        url += "color=" + color + "&";
                    }

                    if (shippingEnabled) {
                        url += "delivery=shipping&";
                    }

                    if (pickupEnabled) {
                        url += "delivery=pickup&";
                    }
                    toastr.clear();

                    if(sizePresent && size == null){
                        readyToRedirect = false;
                        toastr.error("You missed the Size :)")
                    }

                    if (colorPresent && color == null){
                        readyToRedirect = false;
                        toastr.error("You missed the Color :)")
                    }

                    if(readyToRedirect){
                        window.location.href = url;
                    }
                });

            }
        }

        if ($("#new_message_form").length) {


            var size = getUrlParameter("size");
            var color = getUrlParameter("color");
            var text = "";

            if (size && size.length && size !== "Size") {
                text = "Size: " + size + "\n";
            }

            if (color && color.length && color !== "Color") {
                text += "Color: " + color + "\n\n";
            }

            $("#message").text(text);

        }
    }

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    setInterval(function () {
        $('a[href="https://barkyours.sharetribe.com/#faq-popup"]').attr("href", "#faq-popup");
        $(".message-mood-neutral a").attr("target", "_blank");
    }, 500);



    UPLOADCARE_PUBLIC_KEY = 'bcbd9549d4a58d0fb17c';
    UPLOADCARE_TABS = 'file url camera';
    UPLOADCARE_IMAGES_ONLY = true;

    if ($("#new_listing_conversation").length) {

        $('<a class="uploadCareBtn" href="#"> + Attach images</a>').insertAfter("#listing_conversation_content");

        $(".uploadCareBtn").click(function () {
            uploadcare.openDialog(null, {
                imagesOnly: true,
                multiple: true

            }).done(function (file) {
                file.promise().done(function (fileInfo) {
                    imageLinks = "";
                    for (i = 0; i < fileInfo.count; i++) {
                        imageLinks += "Image: " + fileInfo.cdnUrl + "nth/" + i + "/\n\n"
                    }

                    $("#listing_conversation_content").text($("#listing_conversation_content").text() + imageLinks);

                    $("#listing_conversation_content").height($("#listing_conversation_content").prop('scrollHeight'));
                });
            });
        });
    }

    //new_message

    if ($("#transaction-form").length) {
        $('<a class="uploadCareBtn" href="#">+ Attach images</a>').insertAfter("#message");

        $(".uploadCareBtn").click(function () {
            uploadcare.openDialog(null, {
                imagesOnly: true,
                multiple: true
            }).done(function (file) {
                file.promise().done(function (fileInfo) {
                    imageLinks = "";
                    for (i = 0; i < fileInfo.count; i++) {
                        imageLinks += "Image: " + fileInfo.cdnUrl + "nth/" + i + "/\n\n"
                    }
                    $("#message").text($("#message").text() + imageLinks);

                    $("#message").height($("#message").prop('scrollHeight'));
                });
            });
        });
    }

    if ($("#new_message").length) {
        $('<a class="uploadCareBtn" href="#">+ Attach images</a>').insertAfter("#message_content");

        $(".uploadCareBtn").click(function () {
            uploadcare.openDialog(null, {
                imagesOnly: true,
                multiple: true
            }).done(function (file) {
                file.promise().done(function (fileInfo) {
                    imageLinks = "";
                    for (i = 0; i < fileInfo.count; i++) {
                        imageLinks += "Image: " + fileInfo.cdnUrl + "nth/" + i + "/\n\n"
                    }
                    $("#message_content").text($("#message_content").text() + imageLinks);

                    $("#message_content").height($("#message_content").prop('scrollHeight'));
                });
            });
        });
    }

});

$(document).ready(function () {
    hideTagsOnListingPage();
    customFieldsToFilter();
    function hideTagsOnListingPage(){
        var listingPageContainer = $(".listing-details-container");

        if(listingPageContainer.length){
            listingPageContainer.find("p").each(function(){
                if($(this).text().indexOf("Custom Tags:") != -1){
                    $(this).hide();
                }
            })
        }
    }

    function customFieldsToFilter(){

        var isListingEditPage = $(".edit_listing").length > 0;

        if(isListingEditPage){
            initializeFilterToSearch();
        }

        var newListingForm = $(".new-listing-form");

        // In case of New listing form is loaded after some time,
        // need to check if the all form is loaded
        if(newListingForm.length){

            var timer = setInterval(function(){
                    var formLoaded = $(".new_listing").length > 0;
                    if(formLoaded){
                        initializeFilterToSearch();
                        clearInterval(timer);
                    }
                },
                1000);
        }

        function initializeFilterToSearch(){
            cloneDescriptionAndTagDom();
            splitDescription();
            setChangeEvent();
            setTagsToTagField();
        }

        function cloneDescriptionAndTagDom(){
            $("#listing_description").clone().attr("name", "listing_tags").attr("id", "listing_tags").insertAfter("#listing_description");
            $("#listing_description").clone().attr("name", "listing_description_temp").attr("id", "listing_description_temp").insertAfter("#listing_description");

            $("#listing_description_temp").on("change paste keyup", mergeDescriptionAndTags);
            $("#listing_tags").on("change paste keyup", mergeDescriptionAndTags);

        }

        function splitDescription(){
            var description = $("#listing_description").val();

            if(description.indexOf("Custom Tags:") != -1){
                descriptionAndTags = description.split("Custom Tags:");
                $("#listing_description_temp").val(descriptionAndTags[0]);
            }
        }

        function setTagsToTagField(){
            var tagsField = $("#listing_tags");
            var tags = fetchAllSelectedOption();
            var tagsStr = "";
            $.each(tags,function(){
                tagsStr += this + ", ";
            });
            tagsField.val("Custom Tags: " + tagsStr);
            mergeDescriptionAndTags();
        }

        function setChangeEvent(){
            var customFieldsContainer = ".new_listing_form_field_container";
            if($(customFieldsContainer).length){
                $(".new_listing_form_field_container input[type=checkbox]").change(function(){
                    setTagsToTagField();

                });

                $(".new_listing_form_field_container select").change(function(){
                    setTagsToTagField();
                });

            }
        }

        function mergeDescriptionAndTags(){
            actualDescription = $("#listing_description_temp").val();
            tags = $("#listing_tags").val();
            $("#listing_description").val(actualDescription + "\n" + tags);
        }

        function fetchAllSelectedOption(){
            var options = [];
            $(".new_listing_form_field_container input[type=checkbox]").each(function(){
                if ($(this).is(':checked')) {
                    options.push($("label[for='" + $(this).attr("id")+ "']").text());
                }
            });

            $(".new_listing_form_field_container input[type=radio]").each(function(){
                if ($(this).is(':checked')) {
                    options.push($("label[for='" + $(this).attr("id")+ "']").text());
                }
            });

            $(".new_listing_form_field_container input[type=text]").each(function(){
                if ($(this).val().length) {
                    options.push($(this).val());
                }
            });

            $(".new_listing_form_field_container select").each(function(){
                var selectedOption = $(this).find("option:selected");
                if (selectedOption.val() != "") {
                    options.push(selectedOption.text());
                }
            });

            return options;
        }
    }
});

function infiniteScrollToPagination(){
    var currentURL = window.location.href;
    var showPagination = currentURL.indexOf("category") >= 0 || currentURL.indexOf("filter_option") >= 0 || currentURL.indexOf("view=list") >= 0 || currentURL.indexOf("view=map") >= 0 || currentURL.indexOf("view=grid") >= 0 || currentURL.indexOf("price_min") >= 0 || currentURL.indexOf("?q=") >= 0 || currentURL.indexOf("?page=") >= 0 || currentURL.indexOf("price_max") >= 0;

    if(showPagination){
        paginationLink = [];
        $( document).bind("DOMNodeRemoved", function( objEvent ){
            removedClass = objEvent.target.getAttribute("class");
            if(removedClass && removedClass.indexOf("pagination") > -1){
                paginationLink = objEvent.target.childNodes;
                $(paginationLink).each(function (index, elem) {
                    if($(elem).attr("href")){
                        $(elem).attr("href", $(elem).attr("href").replace("/s?", "?"))
                    }
                });
            }
        });

        $(document).ready(function(){
            if(paginationLink.length){
                $("#pageless-loader").remove();
                $("<div class='pagination'></div>").appendTo(".home-loading-more");
                $(paginationLink).appendTo($(".pagination"));

                currentPage = getUrlParameter("page");
                $(".home-categories-main").each(function (index, elem) {
                    $(elem).attr("href", $(elem).attr("href").replace("&page=" + currentPage, ""))
                });

                $(".home-categories-sub").each(function (index, elem) {
                    $(elem).attr("href", $(elem).attr("href").replace("&page=" + currentPage, ""))
                });

                $("#home-toolbar-categories-menu a").each(function (index, elem) {
                    $(elem).attr("href", $(elem).attr("href").replace("&page=" + currentPage, ""))
                });


            }

            function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;
                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            };

        });
    }

}
