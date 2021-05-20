$(function(){
    $(".lnb-sub-left li").click(function(){
        $(".dbSchbox").find('a.on').removeClass();
        $(this).addClass('on');
    });
});
