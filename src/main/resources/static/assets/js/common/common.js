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
common.formSub = function(method,url,param)
{
    var form = document.createElement('form');
    var hiddenField = undefined;
    form.setAttribute('method', method);
    form.setAttribute('action', url);
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
