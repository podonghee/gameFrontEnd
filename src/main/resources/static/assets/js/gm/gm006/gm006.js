var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        common.loadController("Game");
        _this.formView.initView();
        _this.templateView.initView();
        _this.templateView2.initView();
    };
    //ToDo 진행해야함
    fnObj.formView = {
        initView: function () {
            this.initEvent();
        },
        initEvent : function() {

        },
        getData : function(){
            var list = {
                genre : $(".select-genre.on").text()
                , serviceStatus : $(".select-status.on").text()
            }

            return list;
        }
    }
    //게임 리스트를 뿌려주기 위한 뷰
    fnObj.mainView = {
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
        initDisplay : function() {
            fnObj.mainView.search();
        },
        //메인 리스트 공통 이벤트 처리 함수
        initEvent : function() {
        },
        search : function(){
            //백앤드 호출
            controller.Game.g006.g001(fnObj.menuView.getData(),function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    common.paging(res.page)
                }
            });
        }
        //페이지 목록 뿌려주는 함수
    }
    init();
});
