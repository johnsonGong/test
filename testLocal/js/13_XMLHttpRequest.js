

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

        xmlHttp.open("GET", url || "", false);
        xmlHttp.send(null);

        // var xmlDoc = xmlHttp.responseText;
        // xmlHttp.open("POST", "demo_dom_http.asp", false);
        // xmlHttp.send(xmlDoc);
        // document.write(xmlHttp.responseText);
    } else {
        alert("Your browser does not support XMLHTTP.");
    }
}

function bindEvent() {
    var that = this;
    $("#test_net_btn").on("click", function() {
            that._sendRequest("http://sp.kf.gli.cn/home_reader_ajax_origin.php?");
    });

};

$(function(){

    bindEvent();
    
});
