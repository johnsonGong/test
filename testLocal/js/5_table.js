
$("#split_btn").on("click", function() {

    // splitTbl : tmpTbl, restTbl: tblDom,

    var tbls = splitTable(2, document.getElementById("main_table"));

    $("#main_box").append(tbls.splitTbl).append(tbls.restTbl); //.append(tbls.restTbl)

});


// testTable("main_table");

function testTable(tblId) {
    var tableObj = document.getElementById(tblId);
    console.log("table:" + tableObj);

    var trs = tableObj.querySelectorAll("tr");
    for (var i = 0, len = trs.length; i < len; i++) {
        var trObj = trs[i];
        var trH = trObj.offsetHeight;

        console.log("trH:" + trH);
        getTDRowspan(trObj);
    }
}

function getTDRowspan(trObj) {
    var tds = trObj.querySelectorAll("td");
    var txt = "";
    var tmpTd = null;

    var rosSpanVal = 1;

    for (var i = 0, len = tds.length; i < len; i++) {
        tmpTd = tds[i];
        txt = txt + tmpTd.innerHTML + ":" + tmpTd.rowSpan + ",";

        if (tmpTd.rowSpan > 1) {
            rosSpanVal = tmpTd.rowSpan;
            break;
        }
    }
    console.log("txt:" + txt);
}



/**
 * 拆分 table DOM节点. 复制"表头"<br/>
 * 
 * 
 * @author gli-gonglong-20160317.
 */
function splitTable(trNums, tblDom) {

    console.log("  splitTable--> ");

    var tmpTitle = document.createDocumentFragment();
    var tmpTrs = document.createDocumentFragment();

    var tmpTbl = tblDom.cloneNode();
    var targetTbl = tblDom.cloneNode(true);

    var trs = targetTbl.querySelectorAll("tr");

    var len = trNums || 0;

    tmpTitle = trs[0].cloneNode(true);

    for (var i = 0; i < len; i++) {
        tmpTrs.appendChild(trs[i]);
    }

    tmpTbl.appendChild(tmpTrs);
    
    var tmpTbody = targetTbl.querySelector("tbody");
    tmpTbody.insertBefore(tmpTitle, tmpTbody.childNodes[0]);

    return {
        splitTbl: tmpTbl,
        restTbl: targetTbl,
    };


}