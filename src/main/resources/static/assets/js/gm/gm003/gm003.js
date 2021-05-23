var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        //서버에 태울 Ajax 공통 컨트롤러 선언.
        common.loadController("Game");
        common.headerLoad();
        _this.menuView.initView();
        _this.mainView.initView();
    };
    //게임 탭 메뉴를 뿌려주기 위한 뷰
    fnObj.menuView = {
        initView: function () {
            this.initEvent();
        },
        //탭메뉴 클릭시 이벤트 체인지 함수
        initEvent : function (){
            // 장르 메뉴를 클릭 시
            $("#platform li").click(function(){
                if("notX" !== $(this).attr("data-ax-path")) {
                    $("#platform").find('li.on').removeClass();
                    $(this).addClass('on');
                    fnObj.mainView.resetPage();
                    fnObj.mainView.search();
                }
            });
        },
        //이벤트 함수. 메뉴에 대한 공통 이벤트 처리
        getData : function(){
            var list =
                {
                    platform : $("#platform").find('li.on a').attr("data-ax-path")
                }
            return list;
        }
    }
    //게임 리스트를 뿌려주기 위한 뷰
    fnObj.mainView = {
        formTarget : $("#gameForm"),
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
        resetPage: function () {
            fnObj.mainView.page.currentPage = 0;
        },
        //js 호출시 데이터 리스트 가져오기 위함.
        initDisplay : function() {
            fnObj.mainView.search();
        },
        clear : function(){
            $( '.game-thumb-ul' ).not( '#ulAtch_1' ).remove();
            $("em[data-ax-path='atCnt']").text(0);
        },
        //게임 리스트를 가져와서 html 셋팅
        sShotList : function(data){
            $( '.game-thumb-ul' ).not( '#ulAtch_1' ).remove();
            var _data = data;
            var gameDivTag = $(".game-thumb-box");
            var gameUlTag = $("<ul>");
            gameUlTag.attr('class','game-thumb-ul');
            var ulTag = undefined;
            var liTag = undefined;
            //ToDo ul 1개에 총 4개 li 들어가야함.
            $.each(_data, function(index, item) {
                if(index % 4 == 0) {
                    ulTag = gameDivTag.find('#ulAtch_1').clone();
                    ulTag.css("display","");
                    ulTag.attr("id","");
                }
                liTag = ulTag.find("#liAtch_1").clone();
                liTag.css("display", "");
                liTag.attr("id", "");
                //ToDo li length 를 비교하여 작업
                for(var key in item) {
                    if(key == "gameId")
                    {
                        liTag.find("[data-ax-path='" + key + "']").attr("gameId",item[key]);
                    }
                    if("gameSshotImgUrl" == key){
                        liTag.find("[data-ax-path='" + key + "']").attr("src",item[key]);
                    }
                    else
                    {
                        liTag.find("[data-ax-path='" + key + "']").text(item[key]);
                    }
                }
                ulTag.append(liTag);
                gameDivTag.append(ulTag);
            });
        },
        search : function(){
            //백앤드 호출
            var reqData = $.extend({},{page: fnObj.mainView.getPagingData()},fnObj.menuView.getData());
            controller.Game.g004.g001(reqData,function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    //페이지에 페이징 셋팅 공통.
                    common.paging(res.page);
                    fnObj.mainView.sShotList(res.list);
                    $("em[data-ax-path='atCnt']").text(res.page.totalElements.toLocaleString('ko-KR'));
                }
                else
                {
                    common.paging(res.page);
                    fnObj.mainView.clear()
                }
            });
        },
        //메인 리스트 공통 이벤트 처리 함수
        initEvent : function() {
            //Paging 번호 클릭시 들어오는 함수
            $(document).on("click",'#list-page-nav a',function(){
                var id =  common.pagingNumClick($(this),fnObj.mainView.page.currentPage);
                //paging 에 currentPage 페이지 셋팅 해주고 다시 조회
                fnObj.mainView.paging(id)
            });
            //게임 이미지 클릭시  상세페이지
            $(document).on("click",'.game-thumb-box a',function(){
                var list = {"gameId" : $(this).parent().find('input').attr("gameId") , "gmTabNm" : "gmAttack"};
                common.formData(list,fnObj.mainView.formTarget);
            });
        },
    }
    init();
});
