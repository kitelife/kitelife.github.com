$(function() {
    var entryContentWidth = $('.row').width();
    $('.entry-content img').each(function(){
        if($(this).width() > entryContentWidth) {
            $(this).width('100%');
        }
    });
});
