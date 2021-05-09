var common = {};

common.loadController = function (controllerName) {
    $.ajax({
        url: "/assets/js/controller/" + controllerName + "Controller.js",
        dataType: "script",
        //false로 선언하면 ajax결과값이 끝난 뒤 함수가 진행
        async: false,
        success: function () {
            console.log(controllerName+" 로드 완료.");
        }, error: function (request, status, error) {
            console.log(controllerName + " 로드 실패.");
        }
    });
},
common.setData = function(data,target)
{
    var targetTag = undefined;
    var useDeptListStr = undefined;
    var targetArea = target === undefined ? this.target : target;

    for(var key in data) {
        targetTag = $(targetArea).find("[data-ax-path='" + key + "']");
        if (targetTag.length < 1) {
            targetTag =$(targetArea).find("." + key + "");
            if (targetTag.length < 1)
                targetTag = $(targetArea).find("#" + key + "");
            if (targetTag.length < 1)
                continue;
        }

        if ("input" == targetTag.prop("tagName").toLowerCase() || "select" == targetTag.prop("tagName").toLowerCase() || "textarea" == targetTag.prop("tagName").toLowerCase()
        )
            targetTag.val(data[key]);
        else
            targetTag.text(data[key]);
    }
}
