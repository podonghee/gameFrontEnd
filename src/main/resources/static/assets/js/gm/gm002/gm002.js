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
        _this.formView.initView();
        _this.mainView.initView();
    };
    //게임 탭 메뉴를 뿌려주기 위한 뷰
    fnObj.formView = {
        initView: function () {
            this.initEvent();
        },
        initEvent : function (){
            $("#com_search").click(function(){
                fnObj.mainView.resetPage();
                fnObj.mainView.search();
            });
            $("#com_q").keyup(function (event){
               if(event.keyCode == 13){
                   fnObj.mainView.resetPage();
                   fnObj.mainView.search();
               }
            });
            $(".tab-type a").click(function(){
                if('cn_1'==$(this).attr('id'))
                {
                    $(this).attr('class','company-order-state on');
                    $("#cn_2").attr('class','company-order-state');
                }
                else if('cn_2' == $(this).attr('id'))
                {
                    $(this).attr('class','company-order-state on');
                    $("#cn_1").attr('class','company-order-state');
                }
                fnObj.mainView.search();
            })
        },
        //이벤트 함수. 메뉴에 대한 공통 이벤트 처리
        getData : function(){
            var list = { keyword : $("#com_q").val(),
                         rankNst : $(".tab-type a.on").attr('id')
                       }
            return list;
        }
    }
    //게임 리스트를 뿌려주기 위한 뷰
    fnObj.mainView = {
        formTarget : $("#gameCompanyForm"),
        page: {
            currentPage: 0,
            pageSize: 48,
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
            $( '.list_gallery' ).not( '#ulCmpy_1' ).remove();
            $("span[data-ax-path='companyCnt']").text(0);
        },
        //게임 리스트를 가져와서 html 셋팅
        companyList : function(data){
            var _data = data;
            common.dataList(_data,$(".company-list"),"#ulCmpy_1","#liCmpy_1")
        },
        search : function(){
            //백앤드 호출
            var reqData = $.extend({},{page: fnObj.mainView.getPagingData()},fnObj.formView.getData());
            controller.Game.g002.g001(reqData,function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    //페이지에 페이징 셋팅 공통.
                    common.paging(res.page);
                    fnObj.mainView.companyList(res.list);
                    $("span[data-ax-path='companyCnt']").text(res.page.totalElements.toLocaleString('ko-KR'));
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
            $(document).on("click",'.company-list a',function(){
                var list = {"gameCompanyCid" : $(this).parent().find('input').val() };
                common.formData(list,fnObj.mainView.formTarget);
            });
        },
    }
    init();
});
