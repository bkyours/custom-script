
$(document).ready(function(){
    
    displayLandingPageOrHomepage();
    addViewFieldOnSearch();

    function displayLandingPageOrHomepage() {
        var currentURL = window.location.href;
        var showListingList = currentURL.indexOf("category") >= 0 || currentURL.indexOf("filter_option") >= 0 || currentURL.indexOf("view=list") >= 0 || currentURL.indexOf("view=map") >= 0 || currentURL.indexOf("view=grid") >= 0 || currentURL.indexOf("price_min") >= 0 || currentURL.indexOf("?q=") >= 0 || currentURL.indexOf("?page=") >= 0 || currentURL.indexOf("price_max") >= 0;
    
        if (showListingList) {
            displayListingPage();
        } else {
            displayLandingPage();
        }
    }

    function displayLandingPage(){
        displayBarkYoursContent();
        addBannerForNotLoggedIn();

        addBtnsOverCoverImage();
        // addViewAllListingLink();
        //displayCategoryAndFeatured();
        displayListingPage();
        //removeCategoryFilter();
    }
    function removeCategoryFilter(){
            // TODO we may need remove this
            $('.home-categories-main').removeAttr('href')
            $('.home-categories-sub').removeAttr('href')
    }

    function displayBarkYoursContent(){
        var barkyoursDetails = "<div class='col-12 text-center' style='padding: 30px;'>" +
    
        "<div class='col-4'><div class='row'><img style='width: 32px;' src='https://blog.barkyours.com/wp-content/uploads/2019/04/paw.png'/></div>" +
            "<b style='font-size: 18px;'> " + topSectionTitle1 + "</b>" +
            "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'> " + topSectionContent1 + "<span><a href='#whatIsBarkYoursAllAbout' <i class='fa fa-play' style='margin-left: 10px; color: #0765a8; font-size: 22px;'></i></a></span></p></div>" +
        "</div>" +
    
       "<div class='col-4'><div class='row'><img style='width: 32px;' src='https://blog.barkyours.com/wp-content/uploads/2019/04/paw.png'/></div>" +
            "<b style='font-size: 18px;'>" + topSectionTitle2 + "</b>" +
            "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'> " + topSectionContent2 + "<span><a href='#whatIsBarkYoursAllAbout' <i class='fa fa-play' style='margin-left: 10px; color: #0765a8; font-size: 22px;'></i></a></span></p></div>" +
        "</div>" +
    
       "<div class='col-4'><div class='row'><img style='width: 32px;' src='https://blog.barkyours.com/wp-content/uploads/2019/04/paw.png'/></div>" +
            "<b style='font-size: 18px;'>" + topSectionTitle3 + "</b>" +
            "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'> " + topSectionContent3 + "<span><a href='#whatIsBarkYoursAllAbout' <i class='fa fa-play' style='margin-left: 10px; color: #0765a8; font-size: 22px;'></i></a></span></p></div>" +
        "</div>" +
    
        "</div>" ;
          
    var whatIsBarkYourSection =  "<div class='what-is-bark-about-section' id='whatIsBarkYoursAllAbout' style='margin-top: 4.5em;background: #f0f0f0; overflow: hidden'><div class='col-12 text-center' style='padding: 30px;'><h1><b>" + whatIsBarkYourSectionTitle1 + "</b></h1>" +
        "<p style='color: #000; font-size: 16px; font-weight: 400;'>" + whatIsBarkYourSectionContent1 + "</p>" +
        "</div>" +
    
        "<div class='col-12 text-center' style='padding: 30px;'>" +
    
        "<div class='col-4'>" +
        "<b style='font-size: 18px;'>" + whatIsBarkYourSectionTitle2 + "</b>" +
        "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>" + whatIsBarkYourSectionContent2 + "</p></div>" +
        "</div>" +
    
        "<div class='col-4'>" +
        "<b style='font-size: 18px;'>" + whatIsBarkYourSectionTitle3 + "</b>" +
        "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>" + whatIsBarkYourSectionContent3 + "</p></div>" +
        "</div>" +
    
        "<div class='col-4'>" +
        "<b style='font-size: 18px;'>" + whatIsBarkYourSectionTitle4 + " </b>" +
        "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>" + whatIsBarkYourSectionContent4 + "</p></div>" +
        "</div>" +
    
        "</div></div>";
    
          $(".page-content").css("padding-bottom", 0);
          $(barkyoursDetails).insertBefore(".home-toolbar");
          $('.page-content').append(whatIsBarkYourSection);
    }
    

    
    function displayListingPage(){
        setInterval(customizeGrid, 1000);
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

    function addBtnsOverCoverImage(){
        $('<div class="cover-image-btn-wrapper"><p class="cover-image-btn"><a class="round-btn-blue" style="padding: 10px 52px; background-color: ' + btnBackgroundColor +';color: ' + btnTextColor + '" href="/?view=grid"><span>View all Listings</span><span><i class="icon-angle-right"></i></span></a></p>' +
        '<p class="cover-image-btn"><a class="round-btn-blue" style="padding: 10px 40px;background-color: ' + btnBackgroundColor +';color: ' + btnTextColor + '" href="/listings/new"><span>' + $(".AddNewListingButton_mobile").first().text() +'</span></a></p></div>').insertAfter(".marketplace-lander-content-description");


        if((window.location.href.indexOf("?view=grid") > 1 || window.location.href.indexOf("?view=list") > 1) && $(".Avatar").length == 0){
            $(".coverimage").hide();
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
    
    function displayCategoryAndFeatured() {
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
        
        $(".home-fluid-thumbnail-grid").append('<div class="col-12 full-width text-center pull-left" style="margin-top: 20px; height: 45px;"> <a class="view-all-listing-link-btn" href="https://www.barkyours.com/?view=grid"> VIEW ALL LISTINGS</a></div>');
        $(".home-fluid-thumbnail-grid").append("<div class='row' style='border-bottom: 1px solid #c3c3c3; width: 97%;overflow:hidden;'> <h3>" + spotLightLabel + "</h3></div><hr>");
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
});
