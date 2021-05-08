var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        common.loadController("Game");
        _this.detailView.initView();
    };
    fnObj.detailView = {
        gameId : $("#gameId").val(),
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        initDisplay : function() {
            fnObj.detailView.search();
        },
        gameDetail : function(list){
            var _list = list;

        },
        search : function(){
            //상세 게임 백앤드 호출
            controller.Game.game.detail({gameId :fnObj.detailView.gameId},function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    fnObj.detailView.gameDetail(res.list);
                }
            });
        },
        initEvent : function() {

        },
    }
    init();
});
