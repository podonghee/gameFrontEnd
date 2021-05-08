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
}
