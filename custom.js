infiniteScrollToPagination();

$(document).ready(function () {
    addDecimalToListingPagePrice();
    showHiddenNotification();
    initializeLoginInfo();
    removeOptionalTextFromFilters();
    addAboutTheSellerLink();
    addCheckoutItemInLoginPage();
    
    addCheckoutText();
    
    function addCheckoutText(){
       if($('.checkout-with-paypal-button').length){
          $(".preauthorize-section .row:last-of-type").html("<b>Note:</b> Because you are purchasing directly from the seller, you can only buy from one listing at a time.  Please complete this purchase and then proceed to view and purchase other listings.").show();
       }
    }

    
    if($("title").text() == "Bark yours"){
      $("title").text("BarkYours - Gifts for People Who Love Their Dogs");
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
            var loggedIn = $(".AvatarDropdown").length > 0;


            var contactLink = loggedIn ? $("#listing-contact").attr('href') : "https://www.barkyours.com/en/login?checkout=true";
            var profileLink = loggedIn ? $("#listing-author-link").attr('href') : "https://www.barkyours.com/en/login?checkout=true";

            var mainWrapper = $("<div class='row listing-additional_link'>" +
                "<div class='col-5'><div class='listing-author-contact'><a class='listing-author-contact-button special-request-link' style = 'background-color: #0765a8; color: #fff;' href='" + contactLink + "'> <div class='content'>Special Request </div></a></div></div>" +
                "<div class='col-5'><div class='listing-author-contact'><a class='listing-author-contact-button about-seller-link' style = 'background-color: #0765a8; color: #fff;' href='" + profileLink + "'> <div class='content'>About the Seller </div></a></div></div>" +
                "</div>");

            mainWrapper.prependTo($(".listing-social").parent().parent());
        } else {
            console.log("other page")
        }
    }
    



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
    $(".title-container").removeAttr("style");
});

function infiniteScrollToPagination(){
    var currentURL = window.location.href;
    
    // TODO HOTFIX remove pagination for landing page later.
    var showPagination = true || currentURL.indexOf("category") >= 0 || currentURL.indexOf("filter_option") >= 0 || currentURL.indexOf("view=list") >= 0 || currentURL.indexOf("view=map") >= 0 || currentURL.indexOf("view=grid") >= 0 || currentURL.indexOf("price_min") >= 0 || currentURL.indexOf("?q=") >= 0 || currentURL.indexOf("?page=") >= 0 || currentURL.indexOf("price_max") >= 0;

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
function addCheckoutItemInLoginPage(){
    $(document).ready(function () {
        var loggedIn = $(".AvatarDropdown").length > 0;

        if(!loggedIn) {
            $(".enabled-book-button").click(function(e){
                e.preventDefault();
                fetchAndStoreListingInfo();
            });

            $(".special-request-link").click(function(e){
                e.preventDefault();
                fetchAndStoreListingInfo();
            });

            $(".about-seller-link").click(function(e){
                e.preventDefault();
                fetchAndStoreListingInfo();
            });


            if($(".login-form").length){
                checkout = getUrlParameter("checkout");
                if(checkout == "true"){
                    customizeLoginPage();
                }
            }

            if($(".signup-form").length){
                customizeSignUpPage();

            }

        }

        function fetchAndStoreListingInfo(){
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
        }

        function customizeLoginPage(){
            //////////////////////// HOTFIX
            $("footer").hide();
            //////////////////////// HOTFIX

            var checkoutParams = fetchLocalStorageItem();
            $(".wrapper").addClass("customize-login-page");
            $(".wrapper").append("<div class='row col-12'>" +
                "<div class='col-4 login-form-section border-radius-5'><div class='section-wrapper'></div></div>" +
                "<div class='col-4 signup-link-section border-radius-5'>" +
                "<div class='section-wrapper padding-5-15'><h1>New Users</h1>" +
                "<p>Create your account.</p>" +
                "<p>Registration is quick and easy.</p>" +
                "<a href='https://www.barkyours.com/en/signup?checkout=true' class='create-account-link'>Create your account</a></div></div>" +

                "<div class='col-4 cart-item-list border-radius-5'><div class='section-wrapper padding-5-15'><h1>In Your Cart</h1>" +
                "<div class='row'><a href='"+ checkoutParams.listingURL+"'>"+ checkoutParams.listingTitle + "</div>" +
                "<div class='col-12'>" +
                "<div class='col-6 no-padding'><img src='"+ checkoutParams.listingThumb+"'></div>" +
                "<div class='col-6 no-padding'>" +
                "<div class='col-12'>" +
                "<div class='row'>Price: " + checkoutParams.listingPrice +"</div>" +
                "<div class='row'>" + checkoutParams.shippingLbl +"</div>" +
                "<div class='row'></div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</a>" +
                "</div></div>" +
                "</div>");

            // Login section customization
            $(".login-form").appendTo(".login-form-section .section-wrapper");
            $("#password_forgotten").appendTo(".login-form-section .section-wrapper");
            $(".login-form").prepend("<h1>Existing Users</h1>");
        }


        function customizeSignUpPage(){
            //////////////////////// HOTFIX
            $("footer").hide();
            //////////////////////// HOTFIX



            checkout = getUrlParameter("checkout");
            if(checkout == "true"){
                var checkoutParams = fetchLocalStorageItem();
                $(".wrapper").addClass("customize-signup-page");
                $(".wrapper").append("<div class='row col-12'>" +
                    "<div class='col-6 signup-form-section border-radius-5'><div class='section-wrapper'></div></div>" +
                    "<div class='col-4 cart-item-list no-padding'><div class='border-light section-wrapper padding-5-15'>" +
                        "<h1>In Your Cart</h1>" +
                        "<div class='row'> <a href='"+ checkoutParams.listingURL+"'>"+ checkoutParams.listingTitle + "</div>" +
                        "<div class='row-with-divider'>" +
                        "<div class='col-6'><img src='"+ checkoutParams.listingThumb+"'></div>" +
                        "<div class='col-6'>" +
                        "<div class='col-12'>" +
                        "<div class='row'>Price: " + checkoutParams.listingPrice +"</div>" +
                        "<div class='row'>" + checkoutParams.shippingLbl +"</div>" +
                        "<div class='row'></div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</a>" +
                        "</div>" +
                    "</div>" +
                "</div>");
                // Login section customization
                $(".signup-form").appendTo(".signup-form-section .section-wrapper");
            }

            // Removing Unnessary field on signup
            //$("#person_family_name").remove();
            //Last Name and username is being hidden by css
            //$("label[for='person_given_name']").text("Name");
            $("#person_given_name").on( "change paste keyup",function(){
                var name = $("#person_given_name").val();
                var lastName = $("#person_family_name").val();
                var username = name.replace(" ", "_").toLowerCase() + "_" + lastName.replace(" ", "_").toLowerCase() +  "_" + Math.floor(Math.random() * 10000) + 1;
                console.log(username);
                $("#person_username1").val(username);
            });
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

$(document).ready(function(){
    $(".title-container").removeAttr("style");

    $.fn.donetyping = function(callback){
        var _this = $(this);
        var x_timer;
        _this.keyup(function (){
            clearTimeout(x_timer);
            x_timer = setTimeout(clear_timer, 1000);
        });

        function clear_timer(){
            clearTimeout(x_timer);
            callback.call(_this);
        }
    }

    $("#topbar-container input").donetyping(function(){
       $(this).parent("form").find("button").click();
    });
    
});
