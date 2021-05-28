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
        _this.mainTabView.initView();
        _this.potoView.initView();
        _this.gmSshotView.initView();
    };
    //메인탭뷰
    fnObj.mainTabView = {
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        initDisplay : function() {
            fnObj.mainTabView.switchTabList();
        },
        switchTabList : function(){
            $(".db-sub-menu li.on").removeClass();
            $("li[data-ax-path='gmSshot']").addClass("on");
        },
        initEvent : function(){
            $(".db-sub-menu ul li a").click(function(){
                location.href ="/gm/gm000/gm000?gameId="+fnObj.potoView.gameId+"&gmTabNm=gmInfo"
            });
        },
    }
    //게임 리스트를 뿌려주기 위한 뷰
    fnObj.potoView = {
        gameId : $("#gameId").val(),
        gameSshotId : $("#gameSshotId").val(),
        layerData : [],
        layerP : 1,
        layerIndex : 0,
        layerTotalSize : 0,
        layerTotalPage : 0,
        layerHeaderSize : 5,
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        //js 호출시 데이터 리스트 가져오기 위함.
        initDisplay : function() {
            fnObj.potoView.search();
        },
        drawLayerBody : function() {
            var imgUrl = fnObj.potoView.layerData[fnObj.potoView.layerIndex].gameSshotImgUrl
            $("div#layer-body-img").empty()
                .append($("<img>").attr("src", imgUrl).css({"width":"100%","height":"429px"}));
        },
        drawLayerHead : function(){
            var _data = fnObj.potoView.layerData;
            $("ul#layer-header-ul").empty();

            var start = (fnObj.potoView.layerP -1) *  fnObj.potoView.layerHeaderSize;
            var end = (fnObj.potoView.layerHeaderSize * fnObj.potoView.layerP);
            var iData = undefined;
            for(var i=start; i<end; i++){
                iData = _data[i];
                if(typeof(iData) == 'undefined') break;
                $("ul#layer-header-ul").append($("<li>")
                    .append($("<a>").addClass("show-big-img").attr("data-idx", i)
                        .append($("<img>").attr("src", iData.gameSshotImgUrl))
                    )
                );
            }
        },
        search : function(){
            //백앤드 호출
            controller.Game.g004.g003({gameId : fnObj.potoView.gameId, gameSshotId : fnObj.potoView.gameSshotId},function(res){
                if(undefined !=  res.list && 0 != res.list)
                {
                    fnObj.potoView.layerData = res.list;
                    fnObj.potoView.layerTotalSize = res.list.length;
                    fnObj.potoView.layerTotalPage = Math.ceil(fnObj.potoView.layerTotalSize / fnObj.potoView.layerHeaderSize);
                    fnObj.potoView.drawLayerHead();
                    fnObj.potoView.drawLayerBody();
                }
            });
        },
        //메인 리스트 공통 이벤트 처리 함수
        initEvent : function() {
            $(document).on("click", "div.layer-head-movement", function(){
                if($(this).hasClass("leftarrow")){
                    if(fnObj.potoView.layerP <= 1)
                        return false;
                    else
                        fnObj.potoView.layerP -= 1;
                }
                if($(this).hasClass("rightarrow")){
                    if(fnObj.potoView.layerP >= fnObj.potoView.layerTotalPage)
                        return false;
                    else
                        fnObj.potoView.layerP += 1;
                }
                fnObj.potoView.layerIndex = (fnObj.potoView.layerP - 1) * fnObj.potoView.layerHeaderSize;
                fnObj.potoView.drawLayerHead();
                fnObj.potoView.drawLayerBody();

            });
            /* movement layer body */
            $(document).on("click", "span.layer-body-movement", function(){
                if($(this).hasClass("prev-layer")){
                    if(fnObj.potoView.layerIndex <= 0)
                        return false;
                    else
                        fnObj.potoView.layerIndex -= 1;

                    if(fnObj.potoView.layerIndex % fnObj.potoView.layerHeaderSize == 4) {
                        fnObj.potoView.layerP -= 1
                        fnObj.potoView.drawLayerHead();
                    }
                }
                if($(this).hasClass("next-layer")){
                    if(fnObj.potoView.layerIndex + 1 >= fnObj.potoView.layerTotalSize)
                        return false;
                    else
                        fnObj.potoView.layerIndex += 1;

                    if(fnObj.potoView.layerIndex % fnObj.potoView.layerHeaderSize == 0) {
                        fnObj.potoView.layerP += 1
                        fnObj.potoView.drawLayerHead();
                    }

                }
                fnObj.potoView.drawLayerBody();
            });
            /* show-big-img */
            $(document).on("click", "a.show-big-img", function(){
                fnObj.potoView.layerIndex = $(this).attr("data-idx");
                fnObj.potoView.drawLayerBody();
            });
        }
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
            fnObj.gmSshotView.gmSshotSearch();
        },
        clear : function(){
            $( '.ulssh' ).not( '#ulSshot_1' ).remove();
            $("span[data-ax-path='shCnt']").text(0);
        },
        //게임 리스트를 가져와서 html 셋팅
        gmSshotList : function(data){
            var _data = data;
            common.dataList(_data,$(".db_thumlist"),"#ulSshot_1","#liSshot_1");
        },
        gmSshotSearch : function(){
            //백앤드 호출
            var reqData = $.extend({},{page: fnObj.gmSshotView.getPagingData(),gameId : fnObj.potoView.gameId});
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
                    gameId :  fnObj.potoView.gameId
                    , gmTabNm : "gmSshot"
                    , gameSshotId : fnObj.potoView.gameSshotId
                };
                common.formData(list,fnObj.gmSshotView.formTarget);
            });
        },
    }
    init();
});

