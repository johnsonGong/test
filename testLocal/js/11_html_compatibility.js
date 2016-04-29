
/**
 * 使用 html 消除 未闭合的 非法标签.
 * 
 * 
 **/
function insertHtml() {
    
    var iframeHtml = "<iframe>";
    
    var htmlStr = "";
    htmlStr = htmlStr + "<p style='text-align:justify' id='para599' type='text'>";
    htmlStr = htmlStr + "<span>由此可得，正弦交流电的有效值</span>";
    // 未闭合 <span>
    htmlStr = htmlStr + "<span id='error'>";
    htmlStr = htmlStr + "<img id='tmp_img_test' src='' />";
    htmlStr = htmlStr + "<span>（</span>";
    htmlStr = htmlStr + "<span>2-2</span>";
    htmlStr = htmlStr + "<span>）</span></p>";
    
    
    var operaBox = document.getElementById("compati_zone");
    
    operaBox.innerHTML = htmlStr;
    
    var tempBox = document.createElement('div');
    tempBox.innerHTML = htmlStr;
    console.log("tempBox:" + tempBox.innerHTML);
    
    
};

function getHtml() {
    
    var operaBox = document.getElementById("compati_zone");
    console.log("html: " + operaBox.innerHTML);
};
