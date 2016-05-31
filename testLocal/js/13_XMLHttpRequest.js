function _sendRequest(url) {

    var xmlHttp = null;

    if (window.XMLHttpRequest) { // code for IE7, Firefox, Opera, etc.
        xmlHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // code for IE6, IE5
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlHttp != null) {

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                // document.getElementById("myDiv").innerHTML = xmlHttp.responseText;
                console.log("请求成功。。。");
            }
        }

        try {
            xmlHttp.open("GET", url || "", false);
            xmlHttp.send(null);

            // var xmlDoc = xmlHttp.responseText;
            // xmlHttp.open("POST", "demo_dom_http.asp", false);
            // xmlHttp.send(xmlDoc);
            // document.write(xmlHttp.responseText);
        } catch (e) {
            console.error("Catch-->XMLRequest >> " + e)
        }

    } else {
        alert("Your browser does not support XMLHTTP.");
    }
}


function _ajaxJsonp(requestURL) {
    // zepto jsonp
    
    $.ajax({
    	type:"get",
    	url: requestURL || "",
    	async:true,
    	dataType : 'jsonp',
    	success: function(data, status, xhr) {
    	    console.log("_ajaxJsonp--> success" +data);
    	},
    	error: function (xhr, errorType, error){
    	    console.log("_ajaxJsonp--> error");
    	}
    });
    
}

function _setJson2Str(jsonObjs) {
    
    var parseVal = "";
    
    try{
    	parseVal = JSON.stringify(jsonObjs);
    }catch(e){
    	console.error("json数据转换失败 >> " + e);
    }
    
    return parseVal;
};

function bindEvent() {
    var that = this;
    
    // http://www.runoob.com/try/demo_source/xmlhttp_info.txt
    // http://sp.kf.gli.cn/home_reader_ajax_origin.php
    
    // http://sp.kf.gli.cn/home_reader_ajax_origin.php?action=set_chapter_psize&psize=2&book_id=65
    
    var tmpURL = "http://sp.kf.gli.cn/home_reader_ajax_origin.php?action=get_book_catalog&book_id=65&user_id=&font_size=15&screen_type=row&screen_size=684*668&callback=__jp1&time=1462260155962";
    
    var tmpJSONData = {
        id: '1001',
        name: '三国',
        menu : [
            {id:'200' , name : '第一章'},
            {id:'201' , name : '第二章'}
        ]
    };
    
    $("#test_net_btn").on("click", function() {
        that._sendRequest(tmpURL);
    });
    
    
    $("#get_data_btn").on("click", function() {
        that._ajaxJsonp(tmpURL);
    });
    
    $("#stringify_btn").on("click", function(){
        
        var jsonStr = that._setJson2Str(tmpJSONData);
        console.log("jsonStr:" + jsonStr);
        
        var tmpObj = JSON.parse(jsonStr);
        console.log("tmpObj:" + tmpObj);
        
    });
};

$(function() {

    bindEvent();

});