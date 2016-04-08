

testTable("main_table");

function testTable (tblId) {
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
        
        if(tmpTd.rowSpan > 1) {
            rosSpanVal = tmpTd.rowSpan;
            break;
        }
    }
    console.log("txt:" + txt);
}



/**
 * 拆分 table DOM节点.<br/>
 * 
 * @param options {Object} 窗口参数.
 *  --> winH {Number} 窗口高度
 *  --> currenH {Number} 内容总高度
 *  --> tblH {Number} 表格高度
 *  --> theadH {Number} thead高度
 *  --> trH {Number} tr高度
 * 
 * @param tblDom {object} 表格DOM对象.
 * 
 * @param {Boolean} true: 本页高度无法载入至少一条数据。
 *                  false: 已拆分完毕.
 * 
 * @author gli-gonglong-20160317.
 */
function splitTable(options, tblDom) {

    var thead = tblDom.querySelector("thead");
    var tbody = tblDom.querySelector("tbody");
    // 获取第一个 tr.
    var trFirst = tblDom.querySelector("tr");
    // 获取所有 tr.
    var trAll = tblDom.querySelectorAll("tr");

    var winH = options.winH;
    var currenH = options.currenH;

    var tblH = options.tblH;
    var theadH = options.theadH;
    var trH = options.trH;
    var winRestH = winH - (currenH - tblH);

    // console.log("winRestH:" + winRestH + ", trH:" + trH + ", tblH:" + tblH);

    var tblParent = tblDom.parentNode;
    // 浅复制
    var tblClone = tblDom.cloneNode();
    var d = new Date();
    tblClone.id = tblClone.id + "_" + d.getTime();

    var hasTbody = false;
    if (typeof tbody == "object") {
        hasTbody = true;
        var tbodyClone = tbody.cloneNode();
    }

    if (!!thead) {
        var theadClone = thead.cloneNode();
        tblClone.appendChild(theadClone);
    }

    if ((theadH + trH) > winRestH) {
        // 当前页面不足以载入 至少一行数据时, 本页插入空table,并设置相应属性, height等..
        var trClone = tblDom.querySelector("tr").cloneNode();
        var tdClone = tblDom.querySelector("td").cloneNode();
        trClone.appendChild(tdClone);
        if (hasTbody) {

            tbodyClone.appendChild(trClone);
            tblClone.appendChild(tbodyClone);
        } else {

            tblClone.appendChild(trClone);
        }
        
        tblClone = document.createElement("DIV");
        
        tblClone.style.maxHeight = winRestH + "px";
        tblClone.style.maxWidth = "100%";

        tblParent.insertBefore(tblClone, tblDom);
        return true;
        
    } 
    else {
        // 拆分表格--tblDom 移动tr 到 tblClone;

        // 判断拆分几个tr
        var moveNum = Math.floor(winRestH / trH);
        var trDoms = tblDom.querySelectorAll("tr");

        var tmpCon = document.createDocumentFragment();
        var tmpTr = null;

        for (var i = 0, len = moveNum; i < len; i++) {
            tmpTr = trDoms[i];
            tmpCon.appendChild(tmpTr);
        }

        if (hasTbody) {
            tbodyClone.appendChild(tmpCon);
            tblClone.appendChild(tbodyClone);
        } else {
            tblClone.appendChild(tmpCon);
        }
    }

    tblParent.insertBefore(tblClone, tblDom);
    return false;
}