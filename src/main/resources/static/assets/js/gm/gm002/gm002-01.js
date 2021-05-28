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
    };
    fnObj.mainView = {
        targetId : ".company_area",
        gameCompanyCid : $("#gameCompanyCid").val(),
        initView: function () {
            this.initDisplay();
            this.initEvent();
        },
        initDisplay : function() {
            fnObj.mainView.search();
        },
        initEvent : function(){
            //게임 이미지 클릭시  상세페이지
            $(document).on("click",'.company-thumb-area a',function(){
                var url = window.location.origin;
                window.open(url+'/gm/gm000/gm000?gameId=' +
                    $(this).parent().find('input').val()+'&gmTabNm=gmInfo', '_blank');
            });
        },
        //게임 리스트를 가져와서 html 셋팅
        gameList : function(data,cnt){
            $( '.com_gallery' ).not( '#ulGame_'+cnt ).remove();
            var _data = data;
            var gameDivTag = $("#GameListDiv_"+cnt);
            var ulTagId = "#ulGame_"+cnt;
            var liTagId = "#liCmpy_"+cnt;
            common.dataList(_data,gameDivTag,ulTagId,liTagId)
        },
        search : function(){
            controller.Game.g002.g002({gameCompanyCid :fnObj.mainView.gameCompanyCid},function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    //업체 상세정보 셋팅.
                    common.setData(res.list[0],fnObj.mainView.targetId);
                    //개발중인 게임이 있는경우
                    if(res.list[0]['makeGameList'].length > 0){
                        $("#makeGameCnt").text(res.list[0]['makeGameList'].length);
                        fnObj.mainView.gameList(res.list[0]['makeGameList'],1);
                    }
                    else
                    {
                        $("#makeGameCnt").text(0);
                    }
                    //서비스중인 게임이 있는경우
                    if(res.list[0]['serviceGameList'].length > 0){
                        $("#serviceGameCnt").text(res.list[0]['serviceGameList'].length);
                        fnObj.mainView.gameList(res.list[0]['serviceGameList'],2);
                    }
                    else
                    {
                        $("#serviceGameCnt").text(0);
                    }
                }
            });
        },
    }
    init();
});
