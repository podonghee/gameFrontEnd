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
        _this.mainView.initView();
        _this.menuView.initView();
    };
    //게임 탭 메뉴를 뿌려주기 위한 뷰
    fnObj.menuView = {
        initView: function () {
            this.initEvent();
        },
        //탭메뉴 클릭시 이벤트 체인지 함수
        onClassChange : function(element,_this){
            if($('.'+element+'.on').text() == _this.text())
            {
                _this.attr('class', 'select-genre');
            }
            else
            {
                $('.'+element+'.on').attr('class',element);

                if (_this.attr('class') == element)
                {
                    _this.attr('class', element+' on');
                }
                else
                {
                    _this.attr('class', element);
                }
            }
            fnObj.mainView.resetPage();
            fnObj.mainView.search();
        },
        //이벤트 함수. 메뉴에 대한 공통 이벤트 처리
        initEvent : function() {
            //게임 리스트 형태 체크 함수
            $(".dblist_st li").click(function(){
                if('GL_1' == $(this).attr('id'))
                {
                    $(this).attr('class','list-type-change dbtap1 on');
                    $("#GK_1").attr('class','list-type-change dbtap2');
                    $("#ulEmptyBox").show();
                    $("#ulEmptyList").hide();

                }
                else if('GK_1' == $(this).attr('id'))
                {
                    $(this).attr('class','list-type-change dbtap2 on');
                    $("#GL_1").attr('class','list-type-change dbtap1');
                    $("#ulEmptyList").show();
                    $("#ulEmptyBox").hide();
                }
                fnObj.mainView.search();
            });
            //게임 검색 버튼 클릭 시
            $("#gm_search_text").click(function(){
                fnObj.mainView.resetPage();
                fnObj.mainView.search();
            });
            //게임검색 엔터 클릭 시
            $("#gm_search").keyup(function (event){
                if(event.keyCode == 13){
                    fnObj.mainView.resetPage();
                    fnObj.mainView.search();
                }
            });
            //검색 초기화 시
            $("#gm_search_init").click(function(){
                $(".dbSchbox").find('a.on').removeClass();
                $("#gm_search").val('');
                fnObj.mainView.resetPage();
                fnObj.mainView.search();
            });
            //플랫폼 메뉴를 클릭 시.
            $("#platform a").click(function(){
                if($(this).attr('class') == 'select-platform')
                {
                    $(this).attr('class','select-platform on');
                }
                else
                {
                    $(this).attr('class','select-platform');
                }
                fnObj.mainView.resetPage();
                fnObj.mainView.search();
            });
            // 장르 메뉴를 클릭 시
            $("#genre a").click(function(){
                fnObj.menuView.onClassChange('select-genre',$(this))
            });
            //상태 메뉴를 클릭 시
            $("#status a").click(function(){
                fnObj.menuView.onClassChange('select-status',$(this))
            });
        },
        getData : function(){
            var list = {};
            var platform = [];
            $("#platform").find('a').each(function(index,item){
                if(item.attributes.class.textContent == 'select-platform on'){
                    platform.push(item.text);
                }
            });
            list = {
                platform : platform
                , genre :  $(".select-genre.on").text()
                , serviceStatus : $(".select-status.on").text()
                , keyword : $("#gm_search").val()
            }

            return list;
        }
    }
    //게임 리스트를 뿌려주기 위한 뷰
    fnObj.mainView = {
        formTarget : $("#gameListForm"),
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
            $( '.dblist_gallery' ).not( '#ulEmptyBox' ).remove();
            $( '.dblist_news' ).not( "#ulEmptyList" ).remove();
            $("#totalGameCnt").text(0);
        },
        //게임 리스트를 가져와서 html 셋팅
        gameList : function(data){
            var _data = data;
            var type = $(".dblist_st li.on").attr('id');
            var ulClass = undefined;
            var divTag = undefined;
            $( '.dblist_gallery' ).not( "#ulEmptyBox" ).remove();
            $( '.dblist_news' ).not( "#ulEmptyList" ).remove();
            //메인 박스 리스트
            if("GL_1" == type)
            {
                ulClass = "dblist_gallery"
                divTag = "#gmdb-list-box"
            }
            //메인 ToList
            else if("GK_1" == type)
            {
                ulClass = "dblist_news"
                divTag = "#gmdb-list-list"
            }
            common.dataList(_data,$(divTag),"#ulEmptyBox",undefined,ulClass);
        },
        search : function(){
            //백앤드 호출
            var reqData = $.extend({},{page: fnObj.mainView.getPagingData()},fnObj.menuView.getData());
            controller.Game.g001.g001(reqData,function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    //페이지에 페이징 셋팅 공통.
                    common.paging(res.page);
                    fnObj.mainView.gameList(res.list);
                    $("#totalGameCnt").text(res.page.totalElements.toLocaleString('ko-KR'));
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
            $(document).on("click",'.dblist_area a',function(){
                var list = {"gameId" : $(this).parent().find('input').val() , "gmTabNm" : "gmInfo"};
                common.formData(list,fnObj.mainView.formTarget);
            });
        },
    }
    init();
});
