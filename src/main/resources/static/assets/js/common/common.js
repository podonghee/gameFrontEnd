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
    $("#ulTopTabMenu").find('li.on').removeClass('on');
    var path = $(location).attr('pathname');
    var cnt = 0;
    switch (path){
        case "/gm/gm000/gm000" :
            var tab = $("#gmTabNm").val() == undefined ? getParameterByName('gmTabNm') : $("#gmTabNm").val();
            switch (tab){
                case "gmInfo" : cnt = 1
                    break;
                case "gmSshot" : cnt = 4
                    break;
                case "gmVideo" : cnt = 5
                    break;
                case "gmAttack" : cnt = 6
                    break;
            }
            break;
        case "/gm/gm002/gm002" :
        case "/gm/gm002/gm002-01" :
            cnt = 2
            break;
        case "/gm/gm003/gm003" : cnt = 3
            break;
        case "/gm/gm004/gm004" :
        case "/gm/gm004/gm004-01" :
            cnt = 4
            break;
        case "/gm/gm005/gm005" : cnt = 5
            break;
        case "/gm/gm006/gm006" : cnt = 6
            break;
        case "/gm/gm007/gm007" : cnt = 7
            break;
        case "/gm/gm008/gm008" : cnt = 8
        default : cnt =1
            break;
    }
    $("#he_"+cnt).addClass('on');
}

common.dataList = function(data,element,ulId,liId,ulClass){
    var iData = data;
    var ele = element;
    var ulTagId = ulId;
    var liTagId = liId;
    var ulTag = undefined;
    var liTag = undefined;
    var targetTag = undefined;
    var ulTagClass = ulClass;
    var flag = liTagId == undefined ? false : true
    if(!flag){
        ulTag = $("<ul>");
        ulTag.attr('class',ulTagClass);
    }
    else
    {
        $("." + ele.find("ul").prop('class')).not(ulTagId).remove();
    }
    $.each(iData, function(i, item) {
        if(flag)
        {
            if (i % 4 == 0)
            {
                ulTag = ele.find(ulTagId).clone();
                ulTag.css("display", "");
                ulTag.attr("id", "");
            }
            liTag = ulTag.find(liTagId).clone();
        }
        else
        {
            liTag =  ele.find('ul > li').clone();
        }

        liTag.css("display", "");
        liTag.attr("id", "");
        for(var key in item) {
            targetTag = liTag.find("[data-ax-path='" + key + "']");
            if (targetTag.length < 1) {
                targetTag = liTag.find("." + key + "");
                if (targetTag.length < 1)
                    targetTag = liTag.find("#" + key + "");
                if (targetTag.length < 1)
                    continue;
            }
            if ("input" == targetTag.prop("tagName").toLowerCase() || "select" == targetTag.prop("tagName").toLowerCase() || "textarea" == targetTag.prop("tagName").toLowerCase()
            )
                targetTag.val(item[key]);
            else
                targetTag.text(item[key]);

            if("a" == targetTag.prop("tagName").toLowerCase())
                targetTag.attr("href",item[key])

            if("img" == targetTag.prop("tagName").toLowerCase())
                targetTag.attr("src",item[key])
        }
        ulTag.append(liTag);
        liTag = undefined;
        if(flag) {
            if (i % 4 == 0) {
                ele.append(ulTag);
            }
        }
    });
    if(!flag){
        ele.append(ulTag);
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
            form[0].appendChild(hiddenField);
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
        if(currPag == 0){
            currPag = 1;
        }
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
