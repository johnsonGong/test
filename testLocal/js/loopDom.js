/**
 * 循环遍历 html-dom.
 *
 * @author gonglong-201604.
 *
 **/
$(function() {

    console.log("loopDom -->123");

    var target = $("#div01");

    loopDom(target);

    function loopDom(jqObj) {

        jqObj.each(function(idx, item) {

            if($(this).children().length === 0) {
                console.log("id: " + $(this).attr("id") + ", text: " + $(this).text());
            } else {
                loopDom($(this).children());
            }

        });
    }
});