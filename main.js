$(document).ready(function(){
    'use strict';

    var galleryLoad = function(dir) {
        $(".gallery-all").empty();

        var folder = null;
        if(!dir) {
            folder = "images";
            $("#back").hide();
        } else {
            folder = "images/" + dir;
            $("#back").show();
        }

        $.post("gallery/scan.php", {dir: folder}, // the directory och images
            function(data, textStatus)
            {
                $.each(JSON.parse(data), function (key, value) {
                    console.log(key);
                    if(Math.floor(key) == key && $.isNumeric(key)){
                        $(".gallery-all").append( "<img src1='gallery/" + folder + "/" + value +"' id='"+key+"' class='img-thumbnail' height='50px' width='50px'/>" );
                    } else {
                        $(".gallery-all").append( "<img src1='gallery/img/package.png' id='" + key + "' class='img-thumbnail folder' height='50px' width='50px'/>" );
                        return
                    }
                });
                galleryInit();
            });
    };

    galleryLoad();

    var galleryInit = function() {
        var current = null;

        $('.gallery-all img').each(function() {
            $(this)
                .attr('src', $(this).attr('src1') + '?w=' + $(this).width() + '&h=' + $(this).height() + '&crop-to-fit')
                .click(function() {
                    if($(this).hasClass('folder')) {
                        var dir = $(this).attr('id');
                        console.log(dir);
                        galleryLoad(dir);
                    }
                    if(!current) {
                        current = this;
                        console.log("Set current.");
                    } else {
                        $(current).toggleClass('selected');
                        current = this;
                        console.log("Toogled current");
                    }
                    $(this).toggleClass('selected');
                    $('.gallery-current img').attr('src', $(this).attr('src1')).attr('class', 'img-thumbnail img');
                    console.log("Click on mini image.");
                });
            console.log("Gallery image was initiated.");

        });

        $('.gallery-all button').click().trigger('click', $('.gallery-all img'));

        $('.gallery-all img').first().trigger('click');

    };

    $("#back").click(function () {
        galleryLoad();
    });

});