$(function() {
    var entryContentWidth = $('.row').width();

    $('.entry-content img').on('load', function(){
        if($(this).width() > entryContentWidth) {
            $(this).width('100%');
        }
    });

    var appendCoderwallBadge = function(){
        var coderwallJSONurl ="http://www.coderwall.com/youngsterxyf.json?callback=?"
          , size = 40
          ;

        $.getJSON(coderwallJSONurl, function(data) {
            $.each(data.data.badges, function(i, item){
                var a = $("<a>")
                    .attr("href", "http://www.coderwall.com/youngsterxyf/")
                    .attr("target", "_blank")
                    ;

                $("<img>").attr("src", item.badge)
                    .attr("float", "left")
                    .attr("title", item.name + ": " + item.description)
                    .attr("alt", item.name)
                    .attr("height", size)
                    .attr("width", size)
                    .hover(
                        function(){ $(this).css("opacity", "0.6"); }
                      , function(){ $(this).css("opacity", "1.0"); }
                    )
//                    .click( function(){ window.location = "http://www.coderwall.com/youngsterxyf/"; })
                    .appendTo(a)
                    ;
                $("#coderwall").append(a);
            });
        });
    };

    $(function(){
       appendCoderwallBadge();
    });
});
