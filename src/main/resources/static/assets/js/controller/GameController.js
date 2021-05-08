var GameController = function () {
    var _this = this;

    this.game = {
        search : function (data, callback) {
            _this.request("game", "gameSelectList", {contents: data}, callback);
        },
        detail : function (data, callback) {
            _this.request("game", "gameDetail", {contents: data}, callback);
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
                if (res.header.errorCode == -1 && res.header.errorMsg == "") {
                    if (undefined === res.body || "" === res.body || null === res.body) {
                        callback(res);
                    } else {
                        if (callback) {
                            if (res.body["contents"])
                                callback(res.body["contents"]);
                            else
                                callback(res.body);
                        }
                    }
                } else {
                    if ("" != res.header.errorMsg)
                        axToast.push(res.header.errorMsg);
                    else {
                        axDialog.alert({
                            title: "알림",
                            msg: axboot.getCommonMessage("CM_ERR_01")
                        });
                    }
                }
            },
            // xhrFields: {
            //     withCredentials: true
            // },
            // beforeSend: function () {
            //     // axAJAXMask.open();
            // }, complete: function () {
            //     // axAJAXMask.close(300);
            // },
            // dataFilter: function (data, type) {
            //     return data;
            // },
            // error: function (http, b, c) {
            //     //ToDo 모의해킹관련 임시조치
            //     if (http.statusText == "error"){
            //         location.href = "/errorpage"
            //     }
            //     if (http.status == 400) {
            //         if (http.responseJSON) {
            //             if (http.responseJSON.header.result == false && http.responseJSON.header.errorCode == -999 && http.responseJSON.header.errorMsg == "ExpireSession") {
            //                 location.href = "/errorpage"
            //             }
            //         }
            //     }if (http.status == 401) {
            //         if (http.responseJSON) {
            //             if (http.responseJSON.header.result == false && http.responseJSON.header.errorCode == -999 && http.responseJSON.header.errorMsg == "ExpireSession") {
            //                 location.href = "/login?error=AJAX_NO_SESSION"
            //             }
            //         }
            //     }if (http.status == 404) {
            //         if (http.responseJSON) {
            //             if (http.responseJSON.header.result == false && http.responseJSON.header.errorCode == -999 && http.responseJSON.header.errorMsg == "ExpireSession") {
            //                 location.href = "/errorpage"
            //             }
            //         }
            //     } if (http.status == 500) {
            //         if (http.responseJSON) {
            //             if (http.responseJSON.header.result == false && http.responseJSON.header.errorCode == -999 && http.responseJSON.header.errorMsg == "ExpireSession") {
            //                 location.href = "/errorpage"
            //             }
            //         }
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