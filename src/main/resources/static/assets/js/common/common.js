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
common.headerLoad = function(){
    $(".dbSchbox").find('a.on').removeClass();
    var path = $(location).attr('pathname');
    switch (path){
        case "/gm/gm002/gm002" : $("#he_2").addClass('on');
            break;
        case "/gm/gm003/gm003" : $("#he_3").addClass('on');
            break;
        case "/gm/gm004/gm004" : $("#he_4").addClass('on');
            break;
        case "/gm/gm005/gm005" : $("#he_5").addClass('on');
            break;
        case "/gm/gm006/gm006" : $("#he_6").addClass('on');
            break;
        case "/gm/gm007/gm007" : $("#he_7").addClass('on');
            break;
        case "/gm/gm008/gm008" : $("#he_8").addClass('on');
            break;
        default : $("#he_1").addClass('on');
    }
}
common.setData = function(data,target)
{
    var targetTag = undefined;
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

        if("a" == targetTag.prop("tagName").toLowerCase())
            targetTag.attr("href",data[key])

        if("img" == targetTag.prop("tagName").toLowerCase())
            targetTag.attr("src",data[key])
    }
}
common.formData = function(list,form){
    var hiddenField = undefined;
    if(undefined !== list) {
        for (var key in list) {
            hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', list[key]);
            fnObj.mainView.formTarget[0].appendChild(hiddenField);
        }
    }
    form.submit();
}
//파일 다운로드 할때 쓰는걸로 ㅎㅎ 만들자 동희야 .
common.formSub = function(method,url,param)
{
    var form = document.createElement('form');
    var hiddenField = undefined;
    document.charset = "utf-8";
    if(undefined !== param) {
        for (var key in param) {
            hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', param[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
    }
    form.submit();
}
//Paging 번호 클릭시 들어오는 함수
common.pagingNumClick = function(element,currPag){
    var item = element
    var id = item.attr('id');
    if(undefined == id) {
        var className = item.attr('class');
        if(className.includes('num_next'))
        {
            id = ++currPag;
        }
        if(className.includes('num_pre'))
        {
            id = --currPag;
        }
    }
    return id;
}
common.paging = function(page)
{
    var currentPage = 0;
    if(page['currentPage'] == 0 )
    {
        currentPage = (page['currentPage'] + 1);
    }
    else
    {
        if(page['currentPage'] == 1){
            page['currentPage'] = 0;
            currentPage = 1;
        }
        else
        {
            currentPage = page['currentPage'];
        }
    }
    var paging = $("#list-page-nav");
    var a_pre = '<a class="num_pre move-list-page"></a>'
    var a_next = '<a class="num_next move-list-page"></a>'
    var html = '';
    if (page['currentPage'] >= 2)  html += a_pre;
    if((page['blockEnd'] -  page['blockBegin']) <= 8)  --page['blockEnd']
    for (var i = page['blockBegin']; i <= page['blockEnd']; i++) {
        if(currentPage == i)
        {

            html += '<strong class="cur_num">'+ i +'</strong>'
        }
        else
        {
            html += '<a class="move-list-page num_box" href="#" id=' + i + '>' + i + '</a> ';
        }
    };
    if((page['blockEnd'] -  page['blockBegin']) < 9)
    {
        if (page['currentPage'] < page['blockEnd']) html+= a_next;
    }
    else
    {
        if (page['nextPage'] < page['totalPages']) html+= a_next;
    }
    paging.html(html)   // 페이지 목록 생성
}
