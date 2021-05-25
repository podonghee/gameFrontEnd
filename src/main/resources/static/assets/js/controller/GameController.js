var GameController = function () {
    var _this = this;
    //g001 게임DB 페이지
    this.g001 = {
        g001 : function (data, callback) {
            _this.request("g001", "se001", {contents: data}, callback);
        },
        g002 : function (data, callback) {
            _this.request("g001", "dt001", {contents: data}, callback);
        },
    };
    //g002 업체 페이지
    this.g002 = {
        g001 : function (data, callback) {
            _this.request("g002", "se001", {contents: data}, callback);
        },
        g002 : function (data, callback) {
            _this.request("g002", "dt001", {contents: data}, callback);
        },
    };
    //g004 스크린샷 페이지
    this.g004 = {
        g001 : function (data, callback) {
            _this.request("g004", "se001", {contents: data}, callback);
        },
        g002 : function (data, callback) {
            _this.request("g004", "dt001", {contents: data}, callback);
        },
        g003 : function (data, callback) {
            _this.request("g004", "dt002", {contents: data}, callback);
        },
    };
    //g005 동영상 페이지
    this.g005 = {
        g001 : function (data, callback) {
            _this.request("g005", "se001", {contents: data}, callback);
        },
        g002 : function (data, callback) {
            _this.request("g005", "dt001", {contents: data}, callback);
        },
    };
    //g006 랭킹 페이지
    this.g006 = {
        g001 : function (data, callback) {
            //g006 랭킹페이지
            _this.request("g006", "se001", {contents: data}, callback);
        },
    };
    this.request = function (moduleCode, tkCode, data, callback, async) {
        var requestData = {
            header: {
                result: true,
                moduleCode: moduleCode,
                taskCode: tkCode,
                errorCode: -1,
                errorMsg: ""
            },
            body: data
        }
        $.ajax({
            url: "http://localhost:10001/Game/command",
            data: JSON.stringify(requestData),
            type: "post",
            dataType: "json",
            async: async == undefined ? true : async,
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                //console.log("result =>" +JSON.stringify(res));
                if (res.header.errorCode == -1 && res.header.errorMsg == "")
                {
                    if (undefined === res.body || "" === res.body || null === res.body)
                    {
                        callback(res);
                    }
                    else
                    {
                        if (callback)
                        {
                            if (res.body["contents"])
                                callback(res.body["contents"]);
                            else
                                callback(res.body);
                        }
                    }
                }
                else
                {
                    // if ("" != res.header.errorMsg)
                    //     axToast.push(res.header.errorMsg);
                    // else {
                    //     axDialog.alert({
                    //         title: "알림",
                    //         msg: axboot.getCommonMessage("CM_ERR_01")
                    //     });
                    // }
                }
            },
            // xhrFields: {
            //     withCredentials: true
            // },
            // error: function (http, b, c) {
            //     //ToDo 모의해킹관련 임시조치
            //     if (http.statusText == "error"){
            //         location.href = "/errorpage"
            //     }
            // }
        });
        return false;
    };

    return this;
};

if (undefined == window.controller)
    window.controller = {};

if (undefined == window.controller.Game)
    window.controller.Game = new GameController();