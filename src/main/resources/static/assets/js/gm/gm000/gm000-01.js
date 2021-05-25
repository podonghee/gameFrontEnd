var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        common.loadController("Game");
        _this.mainView.initView();
    };
    //메인탭뷰
    fnObj.mainView = {
        gameId : $("#gameId").val(),
        targetId : $(".gm_info"),
        initView: function () {
            this.initDisplay();
        },
        initDisplay : function() {
            fnObj.mainView.search();
        },
        search : function(){
            //상세 게임 백앤드 호출
            controller.Game.g001.g002({gameId :fnObj.mainView.gameId},function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    common.setData(res.list[0],fnObj.mainView.targetId);
                }
            });
        },
    }
    init();
});
