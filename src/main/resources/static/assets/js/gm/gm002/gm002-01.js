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
           // this.initEvent();
        },
        initDisplay : function() {
            fnObj.mainView.search();
           // fnObj.tabView.switchTabList();
        },
        initEvent : function(){
        },
        //게임 리스트를 가져와서 html 셋팅
        gameList : function(data,cnt){
            $( '.com_gallery' ).not( '#ulGame_'+cnt ).remove();
            var _data = data;
            var gameDivTag = $("#GameListDiv_"+cnt);
            var gameUlTag = $("<ul>");
            gameUlTag.attr('class','com_gallery');
            var ulTag = undefined;
            var liTag = undefined;
            //ToDo ul 1개에 총 4개 li 들어가야함.
            $.each(_data, function(index, item) {
                if(index % 4 == 0) {
                    ulTag = gameDivTag.find('#ulGame_'+cnt).clone();
                    ulTag.css("display","");
                    ulTag.attr("id","");
                }
                liTag = ulTag.find("#liCmpy_"+cnt).clone();
                liTag.css("display", "");
                liTag.attr("id", "");
                //ToDo li length 를 비교하여 작업
                for(var key in item) {
                    if(key == "gameId")
                    {
                        liTag.find("[data-ax-path='" + key + "']").attr("gameId",item[key]);
                    }
                    else if(key == "img")
                    {
                        liTag.find("[data-ax-path='" + key + "']").attr("src",item[key]);
                    }
                    else
                    {
                        item[key] = item[key] == undefined ? '-' : item[key];
                        liTag.find("[data-ax-path='" + key + "']").text(item[key]);
                    }
                }
                ulTag.append(liTag);
                gameDivTag.append(ulTag);
            });
        },
        search : function(){
            controller.Game.g002.g002({gameCompanyCid :fnObj.mainView.gameCompanyCid},function(res){
                if(undefined !=  res.list && 0 != res.list) {
                    common.setData(res.list[0],fnObj.mainView.targetId);
                    if(res.list[0]['makeGameList'].length > 0){
                        $("#makeGameCnt").text(res.list[0]['makeGameList'].length);
                        fnObj.mainView.gameList(res.list[0]['makeGameList'],1);
                    }
                    else
                    {
                        $("#makeGameCnt").text(0);
                    }
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
