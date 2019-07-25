$(document).ready(function(){
    var currentURL = window.location.href;  
    var showListingList = currentURL.indexOf("category") >= 0 || currentURL.indexOf("filter_option") >= 0 || currentURL.indexOf("view=list") >= 0 || currentURL.indexOf("view=map") >= 0 || currentURL.indexOf("view=grid") >= 0 || currentURL.indexOf("price_min") >= 0 || currentURL.indexOf("?q=") >= 0 || currentURL.indexOf("?page=") >= 0 || currentURL.indexOf("price_max") >= 0;

    if ($("#homepage-filters").length > 0) {
        if(!showListingList){
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

          "</div>" +
              
              '<div class="full-width text-center" style="margin-top: 20px; height: 45px;"> <a class="view-all-listing-link-btn" href="https://www.barkyours.com/?view=grid"> VIEW ALL LISTINGS</a></div>';

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
    }
});
