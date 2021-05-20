var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        common.loadController("Game");
        common.headerLoad();
        _this.mainView.initView();
        _this.formView.initView();
    };
    //ToDo 진행해야함
    fnObj.formView = {
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        initEvent : function() {
            $(document).on("change","#selectWeeks",function() {
                fnObj.mainView.search();
            });
            $("#selectYears").change(function(){
                $.get("/gm/gm006/gm006/flgch?Year="+$("#selectYears").select().val(),function() {
                }).done(function (fragment) {
                    $("#selectWeeks").replaceWith(fragment);
                });
            });
        },
        initDisplay : function(){
            var list = fnObj.formView.getData();
            $(".rankYear").text(list['rankYear']);
            $(".rankOneWeek").text(list['rankOneWeek']);
        },
        getData : function(){
            var rankYear = undefined;
            var rankOneWeek = undefined;
            if($("#selectYears").select().val() == ''){
                rankYear = $("#selectYears option:eq(1)").val();
            }
            else
            {
                rankYear = $("#selectYears").select().val();
            }
            if($("#selectWeeks").select().val() == '')
            {
                rankOneWeek = $("#selectWeeks option:eq(1)").val();
            }
            else
            {
                rankOneWeek = $("#selectWeeks").select().val();
            }
            var list = {
                rankYear : rankYear
                , rankOneWeek : rankOneWeek
            }
            return list;
        }
    }
    //게임 리스트를 뿌려주기 위한 뷰
    fnObj.mainView = {
        initView: function () {
            this.initDisplay();
            //this.initEvent();
        },
        initDisplay : function() {
            fnObj.mainView.search();
        },
        //메인 리스트 공통 이벤트 처리 함수
        initEvent : function() {
        },
        //게임 랭킹 리스트를 가져와서 html 셋팅
        gameRankList : function(data){
            $( '.ranking-table-rows' ).not( '#rankTr' ).remove();
            var _data = data;
            var gameTbodyTag = $("#rankTbody");
            var trCloneTag = undefined;
            $.each(_data, function(index, item) {
                trCloneTag = gameTbodyTag.find('#rankTr').clone();
                trCloneTag.css("display","");
                trCloneTag.attr("id","");
                if(index < 3){
                    trCloneTag.find("[data-ax-path='gameRankCount']").attr("class","rank red");
                }
                for(var key in item) {

                    if(key == "gameRankImg")
                    {
                        trCloneTag.find("[data-ax-path='" + key + "']").attr("src",item[key]);
                    }
                    else if(key == "gameRankPast")
                    {
                        //ToDo 일단 나중에 생각하자.
                    }
                    else if(key == "gameRankStatus")
                    {
                        if(item[key] != ""){

                            trCloneTag.find("[data-ax-path='" + key + "']").attr("class","icon "+item[key])
                        }
                    }
                    else
                    {
                        trCloneTag.find("[data-ax-path='" + key + "']").text(item[key]);
                    }
                }
                gameTbodyTag.append(trCloneTag);
            });
        },
        search : function(){
            //백앤드 호출
            controller.Game.g006.g001(fnObj.formView.getData(),function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    //formView 페이지 다시 셋팅
                    fnObj.formView.initDisplay();
                    console.log(res);
                    fnObj.mainView.gameRankList(res.list);
                   // fnObj.formView.initDisplay();
                }
            });
        }
        //페이지 목록 뿌려주는 함수
    }
    init();
});
