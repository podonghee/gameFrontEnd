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
        targetId : ".gm_info",
        gameId : $("#gameId").val(),

        initView: function () {
            this.initDisplay();
        },
        initDisplay : function() {
            //fnObj.detailView.search();
        },

        search : function(){
            //상세 게임 백앤드 호출
            controller.Game.game.detail({gameId :fnObj.detailView.gameId},function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    common.setData(res.list[0],fnObj.detailView.targetId);
                }
            });
        },
    }
    init();
});
