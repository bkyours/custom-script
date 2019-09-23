// For New/Edit listing page
$(document).ready(function(){

    $.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
        return function(elem ) {
            return $(elem).text() == arg;
        };
    });

    var sizeArrayId = [
        'custom_fields_76086_289244',
        'custom_fields_76086_289245',
        'custom_fields_76086_289246',
        'custom_fields_76086_289247',
        'custom_fields_76086_289248',
        'custom_fields_76086_311974',
        'custom_fields_76086_311975',
        'custom_fields_76086_405764',
        'custom_fields_76086_405765',
        'custom_fields_76086_405766',
        'custom_fields_76086_405767'
    ];


    var sizeUrlArrayId = [
        'custom_fields_116429',
        'custom_fields_116430',
        'custom_fields_116431',
        'custom_fields_116432',
        'custom_fields_116433',
        'custom_fields_116434',
        'custom_fields_116435',
        'custom_fields_116436',
        'custom_fields_116437',
        'custom_fields_116438',
        'custom_fields_116439'
    ];


    function sizeFieldPresent(){
        var visibility = false;
        $.each(sizeArrayId, function( index, value ){
            if($("#" + value).length > 0){
                visibility = true;
            }
        });
        return visibility;
    }

    function sizeUrlFieldPresent(){
        var visibility = false;
        $.each(sizeUrlArrayId, function( index, value ){
            if($("#" + value).length > 0){
                visibility = true;
                return false;
            }
        });
        return visibility;
    }
    function sizeUrlFieldShowing(){
        var visibility = false;
        $.each(sizeUrlArrayId, function( index, value ){
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
            $(text).insertBefore($('label[for="' + sizeUrlArrayId[0] + '"]'));
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
        $.each(sizeArrayId, function( index, value ){
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

    if(sizeFieldPresent()){
        showLabel();
        showHideUrlFieldOnDefault();
        // If size checkbox presents, add a new class size-checkbox
        $("#" + sizeArrayId[0]).parents(".checkbox-group-container").find("input").addClass("size-checkbox");
    }

    $(".size-checkbox").change(function () {
        handleCheckboxChange($(this));
    });

});

// For Show listing page
$(document).ready(function(){
    listingSizeUrl = {};
    var sizeArray = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '2T', '3T', '4T', '5T'];
    var mappedSizeArray = ['XS:', 'S:', 'M:', 'L:', 'XL:', '2XL:', '3XL:', '2T:', '3T:', '4T:', '5T:'];

    $(".listing-details-container b").each(function () {
        var size = $(this).html();
        if (mappedSizeArray.indexOf(size) >= 0 ) {
            debugger;
            $(this).parent().parent().hide();
            listingSizeUrl[sizeArray[mappedSizeArray.indexOf(size)]] = $(this).siblings()[0].getAttribute("href");
        }
    });


    $("#sizeFilter").change(function(){
        var selectedSize = $(this).val();
        currentUrl = location.href;
        destinationUrl = listingSizeUrl[selectedSize];
        if(destinationUrl != undefined && currentUrl !== destinationUrl)
            location.href = destinationUrl; // redirect only if the current URL is same
    })
});
