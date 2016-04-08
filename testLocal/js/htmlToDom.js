$(function() {

    var htmlStr = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" >' +
        '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-cn"><head><meta http-equiv="Content-Type" ' +
        'content="text/html; charset=utf-8" /><title>第八章  生  态  位</title></head><body><h3>第八章  生  态  位</h3>' +
        '</body></html>';
    
    var repalceHtml = htmlStr;
    
    var divHtml = $("#div01").html();
    
//  repalceHtml = repalceHtml.replace("<html>", "<div>");
//  repalceHtml = repalceHtml.replace("</html>", "</div>");
//  
//  repalceHtml = repalceHtml.replace("<head>", "<div>");
//  repalceHtml = repalceHtml.replace("</head>", "</div>");
//  
//  repalceHtml = repalceHtml.replace("<body>", "</div>");
//  repalceHtml = repalceHtml.replace("</body>", "</div>");
    
    var htmlObj_1 = createElementByHtml(repalceHtml);
    var htmlObj_2 = createDocFragmentByHtml(htmlStr);
    
    var divObj_1 = createElementByHtml(divHtml);
    var divObj_2 = createElementByHtml(divHtml);
    
    console.log("htmlObj_1.length:" + htmlObj_1.children.length);
    console.log("htmlObj_2.length:" + htmlObj_2.children.length);
    
    console.log("divObj_1.length:" + divObj_1.children.length);
    console.log("divObj_2.length:" + divObj_2.children.length);



    function createElementByHtml(html) {
        var temp = document.createElement('div');
        temp.innerHTML = html;
         return temp.children.length == 1 ? temp.children[0] : temp.childNodes;
        //return temp;
    };
    
    // createDocumentFragment
    function createDocFragmentByHtml(html) {
        var temp = document.createDocumentFragment();
        temp.innerHTML = html;
        // return temp.children.length == 1 ? temp.children[0] : temp.childNodes;
        return temp;
    }


});