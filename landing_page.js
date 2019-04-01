$(document).ready(function(){

      var currentURL = window.location.href;
      var showListingList = currentURL.indexOf("category") >= 0 || currentURL.indexOf("filter_option") >= 0 || currentURL.indexOf("view=list") >= 0 || currentURL.indexOf("view=map") >= 0 || currentURL.indexOf("view=grid") >= 0 || currentURL.indexOf("price_min") >= 0 || currentURL.indexOf("?q=") >= 0 || currentURL.indexOf("?page=") >= 0 || currentURL.indexOf("price_max") >= 0;

      var barkyoursDetails = "<div class='col-12 text-center' style='padding: 30px;'>" +

          "<div class='col-4'><div class='row'><img style='width: 32px;' src='https://blog.barkyours.com/wp-content/uploads/2019/04/paw.png'/></div>" +
              "<b style='font-size: 18px;'> Find Unique, Dog-Inspired Items</b>" +
              "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>Items on BarkYours are all dog-themed and many can be customized in your favorite breeds<span><a href='#whatIsBarkYoursAllAbout' <i class='fa fa-play' style='margin-left: 10px; color: #0765a8; font-size: 22px;'></i></a></span></p></div>" +
          "</div>" +

         "<div class='col-4'><div class='row'><img style='width: 32px;' src='https://blog.barkyours.com/wp-content/uploads/2019/04/paw.png'/></div>" +
              "<b style='font-size: 18px;'> Buy from Independent Sellers </b>" +
              "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>Buy directly from dog-inspired sellers and artists from all over the world <span><a href='#whatIsBarkYoursAllAbout' <i class='fa fa-play' style='margin-left: 10px; color: #0765a8; font-size: 22px;'></i></a></span></p></div>" +
          "</div>" +

         "<div class='col-4'><div class='row'><img style='width: 32px;' src='https://blog.barkyours.com/wp-content/uploads/2019/04/paw.png'/></div>" +
              "<b style='font-size: 18px;'> Shop with Confidence </b>" +
              "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>Your privacy and security are always our top priority, and we’re here when you need us<span><a href='#whatIsBarkYoursAllAbout' <i class='fa fa-play' style='margin-left: 10px; color: #0765a8; font-size: 22px;'></i></a></span></p></div>" +
          "</div>" +

          "</div>";




      var whatIsBarkYourSection =  "<div class='what-is-bark-about-section' id='whatIsBarkYoursAllAbout' style='margin-top: 4.5em;background: #f0f0f0; overflow: hidden'><div class='col-12 text-center' style='padding: 30px;'><h1><b>What is BarkYours All About? </b></h1>" +
          "<p style='color: #000; font-size: 16px; font-weight: 400;'>From dog lovers, to dog lovers. We are committed to bringing together talented creators of dog-inspired items with the dog loving community.</p>" +
          "</div>" +

          "<div class='col-12 text-center' style='padding: 30px;'>" +

          "<div class='col-4'>" +
          "<b style='font-size: 18px;'> Thousands of Dog-Themed Items </b>" +
          "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>On BarkYours you can find the best assortment of dog-inspired items and gifts.  Check back often as our sellers are always adding new listings. </p></div>" +
          "</div>" +

          "<div class='col-4'>" +
          "<b style='font-size: 18px;'> Support Creative Entrepreneurs </b>" +
          "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>Buy directly from hundreds of independent sellers.  BarkYours.com makes it easy and safe to buy from sellers, but your artists come directly from the artists themselves. </p></div>" +
          "</div>" +

          "<div class='col-4'>" +
          "<b style='font-size: 18px;'> It’s Easy and Secure </b>" +
          "<div><p style='color: #000; font-size: 16px; font-weight: 400; padding: 0 30px;'>At BarkYours, we’re committed to making it easy to buy (and sell) items.  We use industry leading technology and payment processors to make it happen. </p></div>" +
          "</div>" +

          "</div></div>";
      if(!showListingList){
          $(".page-content").css("padding-bottom", 0);
          $(".marketplace-lander").append(barkyoursDetails);
          $('.page-content').append(whatIsBarkYourSection);
      }
});
