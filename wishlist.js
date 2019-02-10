$(document).ready(function(){
    $(".title-container").removeAttr("style");

    var apiEndPoint = 'https://blog.barkyours.com/wp-admin/admin-ajax.php';
    var bkyoursListingURL = 'https://www.barkyours.com/en/listings/'

        initializeWishListPopUp();

        initializeWishListBtn();

        function initializeWishListBtn(){
           var data = {
                'action': 'is_wished',
                'username': username(),
                'listing_url': listingURL()
            };

            $.ajax({ url: apiEndPoint,
                data: data,
                type: 'POST',
                success: function (response) {
                    var data = JSON.parse(response);
                    if(data.success && data.data.wished){
                        removeFromWishList();
                    }
                    else{
                        addToWishList();
                    }
                    addClickEvent();
                }

            });
        }

        function addClickEvent(){

            $("body").on("click", "#wishListBtn",function (e) {
                var btn = $(this);
                e.preventDefault();
                var data = fetchListingDetails();
                data.action = 'add_to_wishlist';

                $.ajax({
                    url: apiEndPoint,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function(response) {
                        if(response.success && response.data.added){
                            $(".wishlistbtntext").text("In wishlist");
                            $(btn).attr("id", "removeWishListBtn");
                            $(".no-wishlisted").hide();
                            $("#wishlistPopUp .home-listings").append(wishlistDiv(data));
                            toastr.success("Item has been added to wishlist.")
                        }else{
                            toastr.error("Sorry, something went wrong. Please refresh the page and try again.")
                        }
                    }
                });
            });

            $("body").on("click", "#removeWishListBtn",function (e) {
                var btn = $(this);
                e.preventDefault();
                var data = fetchListingDetails();
                data.action = 'remove_from_wishlist';
                $.ajax({
                    url: apiEndPoint,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function (response) {
                        if(response.success && response.data.removed){
                            $(".wishlistbtntext").text("Add to wishlist");
                            $(btn).attr("id", "wishListBtn");
                            $("#wishlistPopUp .home-listings a[href='"+ listingURL()+"']").click();
                            toastr.error("Item has been removed from wishlist.")
                        }
                        else{
                            toastr.error("Something went wrong.")
                        }
                    }
                });

            });

            $("body").on("click", ".wishlist-remove-btn",function (e) {
                e.preventDefault();
                var btn = $(this);
                var elem = $(btn).parents(".col-6");

                usernameSessiokey = usernameSession();

                var data =  {
                    username: usernameSessiokey[0],
                    session_key: usernameSessiokey[1],
                    listing_url: $(btn).attr("href"),
                    action: 'remove_from_wishlist'
                };

                $.ajax({
                    url: apiEndPoint,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function (response) {
                        $(elem).remove();
                        if( $("#wishlistPopUp .home-listings .col-6").length == 0){
                            $("#wishlistPopUp .home-listings").append("<div class='no-wishlisted'><h3>You haven't added any item on your list.</h3></div>");
                        }

                    }
                });

            });


        }

        function addToWishList() {
            if ($(".listing-details-container").length) {
                $('<a id="wishListBtn"' +
                    ' class="listing-author-contact-button"' +
                    ' style="background-color: #0765a8; color: #fff;"' +
                    ' href="#">' +
                    '<div class="content">' +
                    '<span class="ss-heart icon-inline"></span>' +
                    '<span class="wishlistbtntext" style="margin-left: 5px;">Add to wishlist</span>' +
                    '</div></a>')
                    .insertBefore($(".submit-payment-form-link"));
            }
        }

        function removeFromWishList() {
            if ($(".listing-details-container").length) {
                $('<a id="removeWishListBtn"' +
                    'class="listing-author-contact-button"' +
                    'style="background-color: #0765a8; color: #fff;"' +
                    ' href="#">' +
                    '<div class="content"> ' +
                    '<span class="ss-heart icon-inline"></span>' +
                    '<span class="wishlistbtntext" style="margin-left: 5px;">In wishlist</span>' +
                    '</div></a>')
                    .insertBefore($(".submit-payment-form-link"));
            }
        }

        function fetchListingDetails(){
            usernameSessiokey = usernameSession();

            return {
                    username: usernameSessiokey[0],
                    session_key: usernameSessiokey[1],
                    listing_name: $("#listing-title").text(),
                    price: $(".listing-price-amount").text(),
                    listing_url: listingURL(),
                    listing_image_url: $(".listing-image").first().attr("src").replace("/big/", "/thumb/"),
                    listing_description: "N/A",
                    name: usernameSessiokey[0]
            }
        }

        function usernameSession(){

            var sessionKey = localStorage.getItem("bkyours-session");

            if(sessionKey && sessionKey.length){}

            else{
                sessionKey = Math.random().toString(36) + Math.random().toString(36);
                localStorage.setItem("bkyours-session", sessionKey);
            }

            return [username(), sessionKey];
        }

        function initializeWishListPopUp() {

            data = { 'action': 'user_wishlist', 'username': username() };

            $.ajax({ url: apiEndPoint,
                data: data,
                type: 'GET',
                success: function (response) {

                    var list = JSON.parse(response).data.wishes;

                    var popUpcontent = '<div id="wishlistPopUp" class="faq-overlay wishlist-popup"><div class="faq-popup"><div class="popup-header"><h2>Wishlists</h2><a class="close faq-popup-close" href="#">&times;</a></div><div class="main-content"><div class="box"><ul class="question-list">';

                    var itemsString = '<div class="home-listings">';
                    if(list.length){
                        $.each(list, function(index, item){
                            itemsString +=  wishlistDiv(item);
                        });
                    }else{
                        itemsString += "<div class='no-wishlisted'><h3>You haven't added any item on your list.</h3></div>"
                    }

                    var endpopUpcontent = "</div></ul></div></div></div></div>";
                    $('body').append(popUpcontent + itemsString + endpopUpcontent);

                    $(".faq-popup-close").click(function () {
                        $("body").removeClass("faq-open");
                    });

                    $(".faq-popup-trigger").click(function(){
                        $("body").addClass("faq-open");
                    });
                }
            });
        }

        function wishlistDiv(item){
            return '<div class="col-6"><div class="home-list-item" data-id='+ item.id +'>' +
            '<a class="home-list-image-container-desktop"' +
            'href="'+ item.listing_url +'">' +
            '<img alt="'+ item.listing_name + '"' +
            'class="home-list-image"' +
            'src="'+ item.listing_image_url + '">' +

            '<a class="home-list-image-container-mobile"' +
            'href="'+ item.listing_url +'">' +
            '<img alt="'+ item.listing_name + '"' +
            'class="home-list-image"' +
            'src="'+ item.listing_image_url + '"> </a>' +
            '<div class="home-list-details-with-image">' +
            '<h3 style="font-size: 1em; padding-bottom: 1em;" class="home-list-title">' +
            item.listing_name + '</h3> ' +
            '<p><b>Price: </b>'+ item.price + '</p>' +
            '<p><b>Added On: </b>'+ new Date(item.added_on).toDateString("yyyy-MM-dd") + '</p>' +
            '<div class="row">' +
            '<a class="icon-with-text-container wishlist-checkout-btn" href="'+ item.listing_url+'">' +
            '<i class="ss-cart icon-part"></i>' +
            '<div class="text-part">Checkout</div>' +
            '</a>' +

            '<a class="icon-with-text-container wishlist-remove-btn" href="'+ item.listing_url+'">' +
            '<i class="ss-trash icon-part"></i>' +
            '<div class="text-part">Remove</div>' +
            '</a>' +

            '</div>' +
            '</div></a>' +

            '</div>' +
            '</div>'
        }

        function listingURL(){
            if($(".listing-details-container").length){
                return bkyoursListingURL + $("#listing_id").val();
            }
            else{
                return null;
            }
        }

        function username(){
            var username = "";

            var loggedIn = $(".AvatarDropdown").length > 0;

            if(loggedIn){
                profileLink = $('a').filter(function(index) { return $(this).text() === "Profile"; }).attr("href");
                username = profileLink.split("/").pop();
            }
            return username;
        }


        var url = window.location.href;
        if (url.search('#wishlistPopUp') > 0) {
            setTimeout(function () {
                $(".faq-popup-trigger")[0].click();
            }, 500);
        }

        $(".faq-popup-trigger").click(function(){
            $("body").addClass("faq-open");
        });

        setInterval(function () {
            $('a[href="https://www.barkyours.com/#wishlistPopUp"]').attr("href", "#wishlistPopUp");
        }, 500);


});
