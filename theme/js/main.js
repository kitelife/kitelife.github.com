$(function() {
    var entryContentWidth = $('.entry-content').width();
    $('.entry-content img').each(function(){
        if($(this).width() > entryContentWidth) {
            $(this).width('60%');
        }
    });
});
