$(function() {
    var entryContentWidth = $('.row').width();

    $('.entry-content img').on('load', function(){
        if($(this).width() > entryContentWidth) {
            $(this).width('100%');
        }
    });
});
