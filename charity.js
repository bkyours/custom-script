$(document).ready(function(){
    if ($("#new_message_form").length) {
        // New transaction page
        var listingId = window.location.href.match("listings/(.*)/initiate")[1];
        var content = httpGet("https://www.barkyours.com/en/listings/"+ listingId);
        var selectedCharities = [];
        $(content).find(".listing-details-container .checkbox-group").each(function () {
            if ($(this).parent().find("b").text() == "Charities:") {
                $(this).find(".checkbox-option.selected").each(function () {
                    selectedCharities.push($(this).find("span").last().text().replace(/(\r\n\t|\n|\r\t)/gm, ""));
                });
            }
        });
        if(selectedCharities.length > 0){
            var charitiesRadioButton = '<h3>Select the Charity(Optional)</h3><div class="info-text-container"><div class="info-text-icon"> <i class="ss-info"></i> </div> <div class="info-text-content"> <p>BarkYours donates a portion of every sale to charity.  Please select your preferred charity.</p> </div> </div>';

            $(selectedCharities).each(function () {
                charitiesRadioButton +=
                    '<input type="radio" class="charity-radio-btn" name="charity" value="'+ this +'"> <a href= "'+ charities[this]+'"target="_blank" >'+this+'</a><br>';
            });
            $("#transaction-form .preauthorize-section").prepend(charitiesRadioButton + '<br>');

            $("#message").attr("name", "message_temp").attr("id", "message_temp");

            $('<textarea name="message" id="message" class="text_area hide" style="overflow: hidden; overflow-wrap: break-word; resize: horizontal; height: 120px;"></textarea>').insertAfter("#message_temp");

            $('<input name="charity-text"  class="hide" id="charityText">').insertAfter("#message_temp");

            $("#message").val($("#message_temp").val());

            $("#message_temp").on('change keyup paste', function () {
                updateMessageBox();
            });

            $(".charity-radio-btn").on('change', function () {
                $("#charityText").val($(this).val());
                updateMessageBox();
            })


            function updateMessageBox(){
                var text = '';
                if($("#charityText").val().length){
                    text += "Charity: " + $("#charityText").val() + "\n";
                }
                text += $("#message_temp").val();
                $("#message").val(text);
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


    if($(".new-listing-form").length){
        // Listing new/edit page

        var formLoadingTimer = setInterval(checkIfFormLoaded, 500);

        function checkIfFormLoaded(){
            if($("#listing_title").length > 0){
                stopInterval();

                if($("[name='custom_fields[121088][]']").length){
                    // checking if there is charity checkboxes are present
                    $("label[for='custom_fields_121088']").text("Charities(Optional)");
                    $('<div class="info-text-container"> <div class="info-text-icon"> <i class="ss-info"></i> </div> <div class="info-text-content"> <p>BarkYours donates a portion of every sale to charity. Select the charities that you want your customers to pick from. If left blank, we will let your customers pick from the entire list of BarkYours sponsored charities.</p> </div></div>').insertAfter("label[for='custom_fields_121088']")

                   $.each($("[name='custom_fields[121088][]']"), function(index, item){
                       label = $("label[for='"+$(item).attr('id')+"']");
                       url = charities[label.text()];
                       label.html('<a href= "'+ url+'"target="_blank" >'+$(label).text()+'</a>');
                   });
                }

            }
        }

        function stopInterval() {
            clearInterval(formLoadingTimer);
        }


    }
});