var fnObj = {};
$(function(){
    var init = function(){
        fnObj.pageStart();
    }
    fnObj.pageStart = function () {
        var _this = this;
        common.loadController("Game");
        _this.mainView.initView();
        _this.formView.initView();
    };
    //ToDo 진행해야함
    fnObj.formView = {
        initView: function () {
            this.initEvent();
        },
        initEvent : function() {
            $("#selectWeeks").change(function(){
               alert('1');
            });
            $("#selectYears").change(function(){
                $.get("/gm/gm006/gm006/flgch?Year="+$("#selectYears").select().val(),function() {
                }).done(function (fragment) {
                    $("#selectWeeks").replaceWith(fragment);
                });
            });
        },
        initDisplay : function(){

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
            controller.Game.g006.g001(fnObj.formView.getData(),function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    console.log(res);
                   // fnObj.formView.initDisplay();
                }
            });
        }
        //페이지 목록 뿌려주는 함수
    }
    init();
});
