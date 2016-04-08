/**
 * 循环遍历 html-dom.
 *
 * @author gonglong-201604.
 *
 **/
$(function() {

    console.log("loopDom -->123");

    var target = $("#div01");

    var txt = [];
    var textAry = loopDom(target);

    var txtJoinTxt =  txt.join("[##]");
    console.log("txtJoinTxt:" + txtJoinTxt);

    // var afterRep = txtJoinTxt.replace(/\n/, "");
    // afterRep = afterRep.replace(/\s/, "");
    // console.log("afterRep:" + afterRep);

    // TODO, GONGLONG;

    function loopDom(jqObj) {

        jqObj.each(function(idx, item) {

            if($(this).children().length === 0) {
                // console.log("id: " + $(this).attr("id") + ", text: " + $(this).text());
                if($(this).attr("id") == '') {
                    
                }
                txt.push("id: " + $(this).attr("id") + ", text-length: " + $(this).text().length);
            } else {
                loopDom($(this).children());
            }

        });

        // return txt;
    }
});