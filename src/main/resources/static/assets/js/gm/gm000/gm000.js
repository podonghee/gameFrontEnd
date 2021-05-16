var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        common.loadController("Game");
        _this.tabView.initView();
    };

    fnObj.tabView = {
        targetId : ".gm_info",
        gmTabNm : $("#gmTabNm").val(),
        gameId : $("#gameId").val(),
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        initDisplay : function() {
            fnObj.tabView.search();
            fnObj.tabView.switchTabList();
        },
        switchTabList : function(){
           var tab =  $("#"+ fnObj.tabView.gmTabNm);
            tab.show();
           switch (tab){
               case  'gmInfo':
                   break;
               case  'gmNews':
                   break;
               case  'gmReview':
                   break;
               case  'gmSshot':
                   break;
               case  'gmGuide':
                   break;
               case  'gmHistory':
                   break;
           }
        },
        initEvent : function(){
            $(".db-sub-menu ul li a").click(function(){
            });
            // $(".on").click(function(){
            //     alert('1');
            // })
        },
        search : function(){
            //상세 게임 백앤드 호출
            controller.Game.g001.g002({gameId :fnObj.tabView.gameId},function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    common.setData(res.list[0],fnObj.tabView.targetId);
                }
            });
        },
    }
    init();
});
