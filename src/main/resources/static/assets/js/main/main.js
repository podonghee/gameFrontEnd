var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        common.loadController("Game");
        _this.mainView.initView();
        _this.menuView.initView();
    };
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
            fnObj.mainView.search();
        },
        initEvent : function() {
            $("#platform a").click(function(){
                    if($(this).attr('class') == 'select-platform')
                    {
                        $(this).attr('class','select-platform on');
                    }
                    else
                    {
                        $(this).attr('class','select-platform');
                    }
                fnObj.mainView.search();
            });
            $("#genre a").click(function(){
                fnObj.menuView.onClassChange('select-genre',$(this))

            });
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
                   }

            return list;
        }
    }
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
        getPagingData: function() {
            return fnObj.mainView.page;
        },
        resetPage: function() {
            fnObj.mainView.page.currentPage = 0;
        },
        paging: function(pagingData) {
            fnObj.mainView.page.currentPage = pagingData;
            fnObj.mainView.search();
        },
        initDisplay : function() {
            fnObj.mainView.search();
        },
        gameList : function(data){
            $( '.dblist_gallery' ).not( '#ulEmpty' ).remove();
            var _data = data;
            var gameDivTag = $("#gmdb-list-box");
            var gameUlTag = $("<ul>");
            gameUlTag.attr('class','dblist_gallery');
            var liTag = undefined;
            for(var i=0; i < _data.length; i++){
                liTag = gameDivTag.find('ul > li').clone();
                liTag.css("display","");
                liTag.find('a').attr('gameId',_data[i]['gameId']).find('img').attr('src',_data[i]['img']);
                liTag.find('a').find(".tit_name").text(_data[i]['gameName']);
                liTag.find('div').eq(0).find('span').text(_data[i]['platform'])
                liTag.find('div').eq(1).find('span').text(_data[i]['genre'])
                liTag.find('div').eq(2).find('span').text(_data[i]['serviceStatus'])
                gameUlTag.append(liTag);
                liTag = undefined;
            }
            gameDivTag.append(gameUlTag);
        },
        search : function(){
            //백앤드 호출
            var reqData = $.extend({},{page: fnObj.mainView.getPagingData()},fnObj.menuView.getData());
            controller.Game.game.search(reqData,function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    fnObj.mainView.pagingNumber(res.page);
                    fnObj.mainView.gameList(res.list);
                    $("#totalGameCnt").text(res.page.totalElements.toLocaleString('ko-KR'));
                }

            });
        },
        initEvent : function() {
            //Paging 번호 클릭시 들어오는 함수
            $(document).on("click",'#list-page-nav a',function(){
                var item = $(this);
                var id = item.attr('id');
                if(undefined == id) {
                    var className = $(this).attr('class');
                    if(className.includes('num_next'))
                    {
                        id = ++fnObj.mainView.page.currentPage;
                    }
                    if(className.includes('num_pre'))
                    {
                        id = --fnObj.mainView.page.currentPage;
                    }
                }
                //paging 에 currentPage 페이지 셋팅 해주고 다시 조회
                fnObj.mainView.paging(id)
            });
            $(document).on("click",'.dblist_gallery a',function(){
                var form = document.detailFrom;

                form.submit();

            });
        },

        pagingNumber : function(page){
            var currentPage = 0;
            if(page['currentPage'] == 0 )
            {
                currentPage = (page['currentPage'] + 1);
            }
            else
            {
                currentPage = page['currentPage']
            }
            var paging = $("#list-page-nav");
            var a_pre = '<a class="num_pre move-list-page"><<</a>'
            var a_next = '<a class="num_next move-list-page"> >> </a>'
            var html = '';
            if (page['currentPage'] > 0)  html += a_pre;
            if((page['blockEnd'] -  page['blockBegin']) <= 8)  --page['blockEnd']
            for (var i = page['blockBegin']; i <= page['blockEnd']; i++) {
                if(currentPage == i )
                {
                    html += '<strong class="cur_num">'+ i +'</strong>'
                }
                else
                {
                    html += '<a class="move-list-page num_box" href="#" id=' + i + '>' + i + '</a> ';
                }
            };
            if((page['blockEnd'] -  page['blockBegin']) <= 8)
            {
                if (page['currentPage'] < page['blockEnd']) html+= a_next;
            }
            else
            {
                if (page['nextPage'] < page['totalPages']) html+= a_next;
            }
            paging.html(html)   // 페이지 목록 생성
        }
    }
    init();
});
