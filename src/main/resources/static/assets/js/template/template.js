var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        //common.loadController("Game");
        _this.templateView.initView();
        _this.templateView2.initView();
    };
    fnObj.templateView = {
        initView: function () {
            this.initEvent();
        },
        initEvent : function() {
        },
        getData : function(){
            return null;
        }
    }
    //게임 리스트를 뿌려주기 위한 뷰
    fnObj.templateView2 = {
        page: {
            currentPage: 0,
            pageSize: 25,
            totalElements: 0,
            totalPages: 0,
        },
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        getPagingData: function() {
            return fnObj.mainView.page;
        },
        paging: function(pagingData) {
            fnObj.mainView.page.currentPage = pagingData;
            fnObj.mainView.search();
        },
        //js 호출시 데이터 리스트 가져오기 위함.
        initDisplay : function() {
            fnObj.mainView.search();
        },
        //메인 리스트 공통 이벤트 처리 함수
        initEvent : function() {
        },
        search : function(){
            //백앤드 호출
            /*var reqData = $.extend({},{page: fnObj.mainView.getPagingData()},fnObj.menuView.getData());
            controller.Game.game.search(reqData,function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    common.paging(res.page)
                }
            });*/
        }
        //페이지 목록 뿌려주는 함수
    }
    init();
});
