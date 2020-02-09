$(document).ready(function(){
    addCheckOutFilters();

    function addCheckOutFilters() {
        if ($(".listing-details-container").length) {

            var sizeFilterOptions = [];
            var colorFilterOptions = [];
            var charityFilterOptions = [];

            var filtersContainerStr = "<div class='filter-dropdowns'>";


            $(".listing-details-container .checkbox-group").each(function () {
                if ($(this).parent().find("b").text() == "Size:") {
                    if ($("aside form").length > 0) {
                        $(this).parent().parent().hide();
                        filtersContainerStr += "<div class='row' id='sizeFilterWrapper'></div>";
                    }
                    $(this).find(".checkbox-option.selected").each(function () {
                        sizeFilterOptions.push($(this).find("span").last().text().replace(/(\r\n\t|\n|\r\t)/gm, ""));
                    });

                }
                else if ($(this).parent().find("b").text() == "Colors:") {
                    if ($("aside form").length > 0) {
                        $(this).parent().parent().hide();
                        filtersContainerStr += "<div class='row' id='colorFilterWrapper'></div>";
                    }
                    $(this).find(".checkbox-option.selected").each(function () {
                        colorFilterOptions.push($(this).find("span").last().text().replace(/(\r\n\t|\n|\r\t)/gm, ""));
                    });
                }
                else if ($(this).parent().find("b").text() == "Charities :") {
                    if ($("aside form").length > 0) {
                        $(this).parent().parent().hide();
                        filtersContainerStr += "<div class='row' id='charityFilterWrapper'></div>";
                    }
                    // Commenting these lines because we are going to show charity dropdown on next page.
//                     $(this).find(".checkbox-option.selected").each(function () {
//                         charityFilterOptions.push($(this).find("span").last().text().replace(/(\r\n\t|\n|\r\t)/gm, ""));
//                     });
                }
            });

            filtersContainerStr += "</div>";

            $(filtersContainerStr).insertBefore(".enabled-book-button");

            if (sizeFilterOptions.length || colorFilterOptions.length || charityFilterOptions.length) {

                sizePresent = false;
                colorPresent = false;
                charityPresent = false;

                if (sizeFilterOptions.length) {
                    var s = $('<select id="sizeFilter"/>');

                    $('<option />', {value: null, text: "Size"}).appendTo(s);

                    $.each(sizeFilterOptions, function (index, value) {
                        $('<option />', {value: value, text: value}).appendTo(s);
                    });

                    s.appendTo($('.filter-dropdowns #sizeFilterWrapper'));

                    // Select the size by default on similar listing with different price
                    var selectedSize = getUrlParameter("selectedSize");

                    $("#sizeFilter option").filter(function (index) {
                        return $(this).text() === selectedSize;
                    }).attr('selected', 'selected');

                    $("<span class='buyer-size-price-change-info'>Prices may vary with size selection.</span>").prependTo($('.filter-dropdowns #sizeFilterWrapper'));
                    sizePresent = true;
                }

                if (colorFilterOptions.length) {
                    var s = $('<select id="colorFilter"/>');

                    $('<option />', {value: null, text: "Color"}).appendTo(s);

                    $.each(colorFilterOptions, function (index, value) {
                        $('<option />', {value: value, text: value}).appendTo(s);
                    });

                    s.appendTo($('.filter-dropdowns #colorFilterWrapper'));

                    colorPresent = true;

                }

                if (charityFilterOptions.length) {
                    var s = $('<select id="charityFilter"/>');

                    $('<option />', {value: null, text: "Charity"}).appendTo(s);

                    $.each(charityFilterOptions, function (index, value) {
                        $('<option />', {value: value, text: value}).appendTo(s);
                    });

                    s.appendTo($('.filter-dropdowns #charityFilterWrapper'));

                    charityPresent = true;
                }

                $(".filter-dropdowns").append("<a class='listing-author-contact-button' id='listingBuyButton' style = 'background-color: #0765a8; color: #fff;' href='#'> <div class='content'>Proceed to Checkout</div></a>")

                $(".enabled-book-button").hide();

                $("#listingBuyButton").click(function (e) {
                    e.preventDefault();
                    var listingID = $("#listing_id").val();

                    var size = $("#sizeFilter").val();
                    size = size == "Size" ? null : size;

                    var color = $("#colorFilter").val();
                    color = color == "Color" ? null : color;

                    var charity = $("#charityFilter").val();
                    charity = charity == "Charity" ? null : charity;



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

                    if (charity && charity.length) {
                        url += "charity=" + charity + "&";
                    }

                    if (shippingEnabled) {
                        url += "delivery=shipping&";
                    }

                    if (pickupEnabled) {
                        url += "delivery=pickup&";
                    }
                    toastr.clear();

                    if (sizePresent && size == null) {
                        readyToRedirect = false;
                        toastr.error("You missed the Size :)")
                    }

                    if (colorPresent && color == null) {
                        readyToRedirect = false;
                        toastr.error("You missed the Color :)")
                    }

                    if (readyToRedirect) {
                        var loggedIn = $(".AvatarDropdown").length > 0;

                        if (!loggedIn) {
                            var listingTitle = $("#listing-title").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                            var listingPrice = $(".listing-price-amount").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                            var listingUrl = window.location.href;
                            var listingThumb = null;

                            if ($("#listing-image-link img").length) {
                                listingThumb = $("#listing-image-link img")[0].src.replace("/big/", "/thumb/");
                            }
                            var shippingLbl = "";
                            if ($(".shipping-options-label").length) {
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
                        else {
                            window.location.href = url;
                        }
                    }
                });

            }
        }

        if ($("#new_message_form").length) {


            var size = getUrlParameter("size");
            var color = getUrlParameter("color");
            var charity = getUrlParameter("charity");
            var text = "";

            if (size && size.length && size !== "Size") {
                text = "Size: " + size + "\n";
            }

            if (color && color.length && color !== "Color") {
                text += "Color: " + color + "\n";
            }

            if (charity && charity.length && charity !== "Charity") {
                text += "Charity: " + charity + "\n\n";
            }

            $("#message").focus().val(text);

        }
    }
});
