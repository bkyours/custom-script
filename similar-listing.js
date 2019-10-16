// For New/Edit listing page
$(document).ready(function(){

    var sizeFieldsIdsInDB = [
        289244,
        289245,
        289246,
        289247,
        289248,
        311974,
        311975,
        405764,
        405765,
        405766,
        405767
    ];

    var sizeUrlFieldIdInDb = [
        116429,
        116430,
        116431,
        116432,
        116433,
        116434,
        116435,
        116436,
        116437,
        116438,
        116439
    ];

    var sizeArrayIdInDom = [];
    $.each(sizeFieldsIdsInDB, function( index, value ){
        sizeArrayIdInDom.push("custom_fields_76086_" + value);
    });

    var sizeUrlArrayIdInDom = [];
    $.each(sizeUrlFieldIdInDb, function( index, value ){
        var f = "custom_fields_" + value;
        sizeUrlArrayIdInDom.push(f);
    });




    $.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
        return function(elem ) {
            return $(elem).text() == arg;
        };
    });

    function sizeFieldPresent(){
        // Checking if Size checkboxes are present in DOM
        var visibility = false;
        $.each(sizeArrayIdInDom, function( index, value ){
            if($("#" + value).length > 0){
                visibility = true;
            }
        });
        return visibility;
    }

    function sizeUrlFieldPresent(){
        // Check if Size URL input fields are present in DOM
        var visibility = false;
        $.each(sizeUrlArrayIdInDom, function( index, value ){
            if($("#" + value).length > 0){
                visibility = true;
                return false;
            }
        });
        return visibility;
    }
    function sizeUrlFieldShowing(){
        // Check if Size URL input fields are SHOWING in DOM
        var visibility = false;
        $.each(sizeUrlArrayIdInDom, function( index, value ){
            if($("#" + value).css("display") !== "none"){
                visibility = true;
                return false;
            }
        });
        return visibility;
    }

    function showLabel(){
        if(sizeUrlFieldPresent()){
            text = "<div id='different-price-label' class='hide'>Optional: <b>If you charge a different price for your item based on size purchased</b>, copy and paste the URLs for the corresponding listings below.  Otherwise leave this field blank.</div>"
            $(text).insertBefore($('label[for="' + sizeUrlArrayIdInDom[0] + '"]'));
        }

    }

    function showHideDifferentPriceLabel(){
        if(sizeUrlFieldShowing()){
            $("#different-price-label").removeClass('hide');
        }else{
            $("#different-price-label").addClass('hide');
        }
    }

    function showHideUrlFieldOnDefault(){

        $.each(sizeUrlArrayIdInDom, function( index, domID ){
            $("#" + domID).hide();
        });
        
        // Add event on Size Checkboxes
        $.each(sizeArrayIdInDom, function( index, value ){
            handleCheckboxChange($("#" + value));
        });
    }

    function hideCorrespondingUrlField(labelText){
        associatedURLFieldLabel = $($("label:textEquals('"+labelText+"')")[1]);
        associatedURLFieldInput = $("#" + associatedURLFieldLabel.attr("for"));

        associatedURLFieldLabel.hide();
        associatedURLFieldInput.hide();
        associatedURLFieldInput.text("");
    }

    function showCorrespondingUrlField(labelText){
        associatedURLFieldLabel = $($("label:textEquals('"+labelText+"')")[1]);
        associatedURLFieldInput = $("#" + associatedURLFieldLabel.attr("for"));

        associatedURLFieldLabel.show();
        associatedURLFieldInput.show();
    }

    function handleCheckboxChange(elem){
        var id = elem.attr("id");
        var labelText = $($('label[for="' + id + '"]')[0]).html();

        elem.prop("checked") ? showCorrespondingUrlField(labelText) : hideCorrespondingUrlField(labelText);
        showHideDifferentPriceLabel();
    }

    var timer = setInterval(showSizeURLFieldsTimer, 1000);

    function showSizeURLFieldsTimer(){
        if($("#listing_title").length > 0){
            if(sizeFieldPresent()){
                showLabel();
                // hiding all url field at 
                showHideUrlFieldOnDefault();
                // If size checkbox presents, add a new class size-checkbox
                $("#" + sizeArrayIdInDom[0]).parents(".checkbox-group-container").find("input").addClass("size-checkbox");
            }
            debugger;
            $(".size-checkbox").change(function () {
                handleCheckboxChange($(this));
            });
            clearTimer();
        }
    }

    function clearTimer(){
        clearInterval(timer);
    }

});

// For Show listing page
$(document).ready(function(){
    listingSizeUrl = {};
    var sizeArray = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '2T', '3T', '4T', '5T'];
    var mappedSizeArray = ['XS:', 'S:', 'M:', 'L:', 'XL:', '2XL:', '3XL:', '2T:', '3T:', '4T:', '5T:'];

    $(".listing-details-container b").each(function () {
        var size = $(this).html();
        if (mappedSizeArray.indexOf(size) >= 0 ) {
            $(this).parent().parent().hide();
            listingSizeUrl[sizeArray[mappedSizeArray.indexOf(size)]] = $(this).siblings()[0].getAttribute("href");
        }
    });


    $("#sizeFilter").change(function(){
        var selectedSize = $(this).val();
        var selectedText = $("#sizeFilter option:selected").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
        currentUrl = location.href;
        destinationUrl = listingSizeUrl[selectedSize];
        if(destinationUrl != undefined && currentUrl !== destinationUrl)
        {
            debugger;
            location.href = destinationUrl + "?selectedSize=" + selectedText; // redirect only if the current URL is same

        }

    })
});
