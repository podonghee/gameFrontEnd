var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        common.loadController("Game");
        common.headerLoad();
        _this.mainTabView.initView();
        fnObj.gmSshotView.initView();
    };
    //메인탭뷰
    fnObj.mainTabView = {
        targetId : ".gm_info",
        gmTabNm : $("#gmTabNm").val() == undefined ? getParameterByName('gmTabNm') : $("#gmTabNm").val(),
        gameId : $("#gameId").val() == undefined ? getParameterByName('gameId') : $("#gameId").val(),
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        initDisplay : function() {
            fnObj.mainTabView.switchTabList();
        },
        gmInfoSearch : function(){
        },
        gmNewsSearch : function(){

        },
        gmReviewSearch : function(){

        },
        gmVideoSearch : function(){
        },
        gmAttackSearch : function(){
        },
        switchTabList : function(tabName){
           var tab =  undefined;
           tab = tabName == undefined ? fnObj.mainTabView.gmTabNm : tabName
            $("#gmTabNm").val(tab);
           switch (tab){
               case  'gmInfo':
                   fnObj.mainTabView.gmInfoSearch();
                   break;
               case  'gmNews':
                   fnObj.tabView.gmNewsSearch();
                   break;
               case  'gmReview':
                   fnObj.tabView.gmReviewSearch();
                   break;
               case  'gmSshot':
                   fnObj.gmSshotView.gmSshotSearch();
                   break;
               case  'gmVideo':
                   fnObj.tabView.gmVideoSearch();
                   break;
               case  'gmAttack':
                   fnObj.tabView.gmAttackSearch();
                   break;
           }
            $(".db-sub-menu li.on").removeClass();
            $("li[data-ax-path='"+tab+"']").addClass("on");
            $("#contentList > div").hide();
            $("#"+tab).show();
        },
        initEvent : function(){
            $(".db-sub-menu ul li a").click(function(){
                fnObj.mainTabView.switchTabList($(this).parent().attr("data-ax-path"));
                common.headerLoad();

            });
        },
    }
    fnObj.gmSshotView = {
        formTarget : $("#gameSshotForm"),
        page: {
            currentPage: 0,
            pageSize: 20,
            totalElements: 0,
            totalPages: 0,
        },
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        getPagingData: function() {
            return fnObj.gmSshotView.page;
        },
        paging: function(pagingData) {
            fnObj.gmSshotView.page.currentPage = pagingData;
            fnObj.gmSshotView.gmSshotSearch();
        },
        //js 호출시 데이터 리스트 가져오기 위함.
        initDisplay : function() {
            //fnObj.gmSshotView.search();
        },
        clear : function(){
            $( '.ulssh' ).not( '#ulSshot_1' ).remove();
            $("span[data-ax-path='shCnt']").text(0);
        },
        //게임 리스트를 가져와서 html 셋팅
        gmSshotList : function(data){
            var _data = data;
            common.dataList(_data,$(".db_thumlist"),"#ulSshot_1","#liSshot_1")
        },
        gmSshotSearch : function(){
            //백앤드 호출
            var reqData = $.extend({},{page: fnObj.gmSshotView.getPagingData(),gameId : fnObj.mainTabView.gameId});
            controller.Game.g004.g002(reqData,function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    //페이지에 페이징 셋팅 공통.
                    common.paging(res.page);
                    fnObj.gmSshotView.gmSshotList(res.list);
                    $("span[data-ax-path='shCnt']").text(res.page.totalElements.toLocaleString('ko-KR'));
                }
                else
                {
                    common.paging(res.page);
                    fnObj.gmSshotView.clear()
                }
            });
        },
        //메인 리스트 공통 이벤트 처리 함수
        initEvent : function() {
            //Paging 번호 클릭시 들어오는 함수
            $(document).on("click",'#list-page-nav a',function(){
                var id =  common.pagingNumClick($(this),fnObj.gmSshotView.page.currentPage);
                //paging 에 currentPage 페이지 셋팅 해주고 다시 조회
                fnObj.gmSshotView.paging(id)
            });
            //게임 이미지 클릭시  상세페이지
            $(document).on("click",'.db_thumlist a',function(){
                var list = {
                                gameId : fnObj.mainTabView.gameId
                                , gmTabNm : "gmSshot"
                                , gameSshotId : $(this).parent().find('#gameSshotId').val()
                };
                common.formData(list,fnObj.gmSshotView.formTarget);
            });
        },
    }
    init();
});
