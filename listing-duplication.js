
$(document).ready(function(){

    var authorized = isAuthorizedToDuplicate();
    if(authorized && $(".listing-view-admin-links").length > 0){
        addDuplicateBtn();
    }


   var formLoadingTimer = setInterval(checkIfFormLoaded, 500);

   function checkIfFormLoaded(){
       if($("#listing_title").length > 0){
           stopInterval();
           listingId = getUrlParameter("parentListingId");
           var formData = localStorage.getItem(listingId);
           if(formData){
               populateDuplicateData(formData);
           }
       }
   }

   function stopInterval() {
       clearInterval(formLoadingTimer);
   }

   

   function isAuthorizedToDuplicate(){
       return $(".listing-view-admin-links").length > 0;
   }

   function populateDuplicateData(formData){
       var listingDetails  = JSON.parse(formData);
       Object.keys(listingDetails).forEach(function(fieldId) {
           var elm = $("#" + fieldId);
            if(fieldId == "listing_description"){
                $("#listing_description_temp").val(listingDetails[fieldId])
            }

           if(elm.prop('type').toLowerCase() == 'checkbox'){
               elm.prop( "checked", true);
           }else{
               elm.val(listingDetails[fieldId]);
           }

           if(fieldId == "listing_origin"){
              elm.keyup();
           }
       });
   }

   function addDuplicateBtn(){
       $(".listing-view-admin-links").prepend('<div class="listing-view-admin-link duplicate-listing-link"> <a class="icon-with-text-container" href="/en/listings/new"> <i class="ss-shuffle icon-part"></i> <div class="text-part">Duplicate listing</div> </a> </div>');

       $("body").on('click', '.duplicate-listing-link', function(e){
           e.preventDefault();
           var editLink = window.location.href + '/edit'
           var content = httpGet(editLink);

           var formElements = $(content).find("form.edit_listing");

           var elementToDelete = ["utf8", "_method", "authenticity_token"];
           var elementToCopy = ["input", "select"];

           subCategoryId = formElements.find("#listing_category_id").val();
           listingShapeId = formElements.find("#listing_listing_shape_id").val();
           listingId = editLink.substring(editLink.indexOf("listings/") + 9, editLink.indexOf("-"));

           categoryId = categorySubcategory[subCategoryId];
           if(categoryId){

               var formData = {};
               var inputTextFields = formElements.find("input:text");
               var inputTextAreas = formElements.find("textarea");
               var inputCheckBoxFields = formElements.find("input:checkbox:checked");
               var selectFields = formElements.find("select");

               inputTextFields.each(function(){
                   var $elem = $(this);
                   var $elemName = $(this).attr('id');
                   if(elementToDelete.indexOf($elemName) == -1){
                       formData[$elemName] = $elem.val();
                   }
               });

               inputTextAreas.each(function(){
                   var $elem = $(this);
                   var $elemName = $(this).attr('id');
                   if(elementToDelete.indexOf($elemName) == -1){
                       formData[$elemName] = $elem.val();
                   }
               });

               inputCheckBoxFields.each(function(){
                   var $elem = $(this);
                   var $elemName = $(this).attr('id');
                   if(elementToDelete.indexOf($elemName) == -1){
                       formData[$elemName] = $elem.val();
                   }
               });

               selectFields.each(function(){
                   var $elem = $(this);
                   var $elemName = $(this).attr('id');
                   if(elementToDelete.indexOf($elemName) == -1 && elementToCopy.indexOf($elem.prop('tagName').toLowerCase()) >= 0){
                       formData[$elemName] = $elem.val();
                   }
               });

               debugger;
               localStorage.setItem(listingId, JSON.stringify(formData));
               window.location.href = "/listings/new?category="+ categoryId + "&subcategory=" + subCategoryId + "&parentListingId=" + listingId;
           }
           else{
               toastr.error("Something went wrong. Could not duplicate the listing. Please contact the Admin.")
           }


       })

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

    function httpGet(theUrl)
    {
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
});
