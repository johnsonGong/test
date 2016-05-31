var Dom = function() {};



Dom.prototype = {

    /**
     * 向指定的 tr 添加 td. <br/>
     * 
     * @param {Object} trObj 待操作tr节点.
     * @param {Object} tdObj 待操作td节点.
     * @param {Number} idx   待添加的位置.
     * 
     */
    addTD: function(trObj, tdObj, idx) {
    
        var tds = trObj.querySelectorAll("td");
        try {
            if (tds.length > idx) {
                trObj.insertBefore(tdObj, tds[idx]);
            } else {
                trObj.appendChild(tdObj);
            }
        } catch (e) {
            console.error("[Dom.js] -> addTD:" + e);
        }
    
    },

    /**
     * 获取当前 tr中 td的 [rowSpan]值.<br/>
     * 
     * @param {Object} trObj 当前tr DOM对象.
     * 
     * @return {Object} 
     *          --> {Number} idx 第一个 属性 rowspan 大于1 的 <td>标签下标;
     *          --> {Number} rowspanVal 对应<td>标签 rowspan的值.
     *          --> {Number} total 当前 <tr>中 <td>总数;
     *          --> {Object} tdObj 如果 rowspan 大于 1, 则存储相应的 <td>节点对象. 否则为: null;
     * 
     * @author gli-gonglong-20160518.
     * 
     */
    getTDRowspanInfo: function(trObj) {

        var infoVal = {
            idx: 0,
            rowspanVal: 1,
            total: 0,
            tdObj: null,
        };

        var tmpTd = null;
        var rowSpanVal = 1;

        var tds = trObj.querySelectorAll("td");

        for (var i = 0, len = tds.length; i < len; i++) {

            tmpTd = tds[i];
            if (tmpTd.rowSpan > 1) {

                infoVal.idx = i;
                infoVal.rowspanVal = tmpTd.rowSpan;
                infoVal.total = len;
                infoVal.tdObj = tmpTd;

                break;
            }
        }

        return infoVal;
    },

    /**
     * 拆分表格, 分类执行, 一次完成, 提升效率.<br/>
     * 
     * @param {Object} options        表格拆分参数.
     * @param {Number} options.winH   窗口高度.
     * @param {Number} options.restH  当前页面剩余高度.
     * @param {Number} options.tblH   表格高度.
     * @param {Number} options.theadH 表格 thead 高度.
     * @param {Array}  options.trsH   表格 tbody 中 tr 高度集合.
     * 
     * @param {Object} tblDom 待拆分表格DOM对象. 
     * 
     * @return {Object}   value   拆分结果
     * @return {Boolean}  value.flg       拆分状态  true: 拆分成功, false: 拆分失败.
     * @return {Array}    value.subTbls   a. flg为 true 时, 为拆分后的表格 DOM对象 集合;
     *                                    b. flg为 false 时, 为 空集合(长度为 0);
     * 
     * @author gli-gonglong-20160519
     * 
     */
    splitTable_advanced: function(options, tblDom) {

        // 默认返回值.
        var value = {
            flg: false,
            subTbls: []
        };

        // 默认  表格 边框宽度
        var BORDER_W = 2;

        var tHeadObj = tblDom.querySelector("thead");
        var tBodyObj = tblDom.querySelector("tbody").cloneNode(true);
        var trObjs = tBodyObj.querySelectorAll("tr");

        // cloneNode, 复制所有属性和值.
        var tblTempl = tblDom.cloneNode();
        var tblTbodyTempl = tBodyObj.cloneNode();

        var trsHeightSet = options.trsH;

        // 容错处理--表头格式.
        var theadNum = 0
        var tbodyHeiht = options.tblH;
        if (options.theadH == 0) {

            // 从 tbody中 截取 表头.
            tHeadObj = document.createElement("thead");

            // 因 rowSpan 属性导致的 多行表头.
            var rowspanInfo = this.getTDRowspanInfo(trObjs[0]);
            theadNum = rowspanInfo.rowspanVal;

            for (var i = 0; i < theadNum; i++) {
                tHeadObj.appendChild(trObjs[i].cloneNode(true));
                options.theadH = options.theadH + trsHeightSet[i];
                tbodyHeiht = tbodyHeiht - trsHeightSet[i];
            }

            // 去除表头部分 的高度.
            trsHeightSet.splice(0, theadNum);

        }

        try {

            // 如果剩余空间高度 大于 "表头 + 第一行tr", 则执行本次拆分.
            if (options.restH > (options.theadH + trsHeightSet[0] + BORDER_W)) {

                console.log("可以执行表格拆分!");

                var tblType = Dom.getTableType(tBodyObj, trsHeightSet);

                console.log("The table type is: " + tblType);

                value.flg = true;
                //  trsHeightSet, tHeadObj, tBodyObj, tblTempl
                value.subTbls = Dom["splitTable_type_" + tblType]({
                    'trHeightSet': trsHeightSet,
                    'theadDom': tHeadObj,
                    'tbodyDom': tBodyObj,
                    'tableTempl': tblTempl,
                    'winH': options.winH,
                    'restH': options.restH,
                    'theadH': options.theadH,
                    'tbodyH': tbodyHeiht
                });

            }

        } catch (e) {

            throw "[splitTable_advanced] 表格拆分失败! " + e;
        }

        return value;

    },

    /**
     * 获取当前 tr中 td的 [rowSpan]值.<br/>
     * 
     * @param {Object} trObj 当前tr DOM对象.
     * 
     * @return {Number} rowSpanVal td的 [rowSpan]值
     * 
     * @author gli-gonglong-20160410
     * 
     */
    getTDRowspan: function(trObj) {
        var tds = trObj.querySelectorAll("td");
        var txt = "";
        var tmpTd = null;

        var rowSpanVal = 1;

        for (var i = 0, len = tds.length; i < len; i++) {
            tmpTd = tds[i];
            txt = txt + tmpTd.innerHTML + ":" + tmpTd.rowSpan + ",";

            if (tmpTd.rowSpan > 1) {
                rowSpanVal = tmpTd.rowSpan;
                break;
            }
        }

        return rowSpanVal;
    },

    /**
     * 获取表格类型. <br/> 
     * 
     * @param {Object} tbodyDom     表格的tbody部分, 不含表头(真实表头可能出现在 tbody中).
     * @param {Array}  trHeightSet  表格tr高度集合.
     * 
     * @return {Number} type 表格类型 ;
     *                    1 : rowspan 等于 1 , 行高相等;
     *                    2 : rowspan 等于 1 , 行高不等;
     *                    3 : rowspan 大于 1 ;
     * 
     * @augments gli-gonglong-20160519
     * 
     **/
    getTableType: function(tbodyDom, trHeightSet) {

        var tblType = 0;
        var heigthFlg = false;
        var rowspanFlg = false;

        var trs = tbodyDom.querySelectorAll("tr");
        // 容错处理-表头 <thead>
        var startIdx = trs.length - trHeightSet.length;

        try {

            for (var i = startIdx, len = trs.length; i < len; i++) {
                if (this.getTDRowspan(trs[i]) > 1) {
                    rowspanFlg = true;
                    break;
                }
            }

            if (rowspanFlg) {

                tblType = 3;
            } else {

                var firstH = trHeightSet[0];
                for (var j = 0, jlen = trHeightSet.length; j < jlen; j++) {
                    if (firstH != trHeightSet[j]) {
                        heigthFlg = true;
                        break;
                    }
                }

                tblType = (heigthFlg) ? 2 : 1;

            }
        } catch (e) {
            throw "获取表格类型失败!";
        }

        return tblType;
    },

    /**
     * 表格拆分 类型1, rowspan 等于 1, 行高"相等". <br/>
     * 
     * @param {Object}  options              拆分表格代用参数.
     * @param {Array}   options.trHeightSet  行高集合.
     * @param {Object}  options.theadDom     表头，合并用.
     * @param {Object}  options.tbodyDom     表格内容 tbody 部分，拆分用.
     * @param {Object}  options.tableTempl   表格 <table> 对象, 合并用.
     * 
     * @param {Number}  options.winH         窗口高度.
     * @param {Number}  options.restH        当前页面剩余高度
     * @param {Number}  options.theadH       表格 thead 高度
     * @param {Number}  options.tbodyH       表格 内容高度
     * 
     * 
     * @return {Array} subTables 拆分后的表格对象集合.
     * 
     */
    splitTable_type_1: function(options) {

        console.info("This is splitTable_type_1 ");

        var trsH = options.trHeightSet;
        var tableObj = options.tableTempl;
        var theadObj = options.theadDom;
        var tbodyObj = options.tbodyDom;
        var winH = options.winH;
        var restH = options.restH;
        var theadH = options.theadH || 0;
        var tbodyH = options.tbodyH || 0;

        var subTables = [];
        var idLoop = 1;
        var tableId = tableObj.getAttribute("id") || new Date().getTime();
        var tableTempl = tableObj.cloneNode();
        var tbodyTempl = tbodyObj.cloneNode();


        var trObjs = tbodyObj.querySelectorAll("tr");
        // 容错-表头.
        var startIdx = trObjs.length - trsH.length;
        var trH = trsH[0];

        var targetH = restH;

        // options.tbodyH
        var outterLoop = [];
        var innnerLoopItem = {
            'startIdx': 0,
            'endIdx': 0
        };

        var len_1 = Math.floor((restH - theadH) / trH);
        
        // TODO-GONGLONG - 20160520
        innnerLoopItem.startIdx =  startIdx ; //startIdx;
        innnerLoopItem.endIdx = startIdx + len_1;
        outterLoop.push(innnerLoopItem);

        var tbodyH_1 = tbodyH - len_1 * trH;

        // 每页能容纳多少 tr;
        var pageUnitTr = Math.floor(winH / trH);
        // 表格内容能拆 多少页;
        var pages = Math.floor(tbodyH_1 / (pageUnitTr * trH));
        // 最后一页--不能拆满一页,能放多少 tr;
        var lastPageTr = tbodyH_1 % pageUnitTr;

        var tmpItem = {};
        var newItem = null;
        for (var i = 0; i < pages; i++) {
            newItem = {};
            tmpItem = outterLoop[outterLoop.length - 1];

            newItem.startIdx = tmpItem.endIdx;
            newItem.endIdx = tmpItem.endIdx + pageUnitTr;
            outterLoop.push(newItem);
        }

        if (lastPageTr > 0) {
            newItem = {};
            tmpItem = outterLoop[outterLoop.length - 1];
            newItem.startIdx = tmpItem.endIdx;
            newItem.endIdx = tmpItem.endIdx + lastPageTr;
            outterLoop.push(newItem);
        }
        
        // 下标溢出
        tmpItem = outterLoop[outterLoop.length - 1];
        if (tmpItem.endIdx > trObjs.length) {
            tmpItem.endIdx = trObjs.length;
        }
        
        console.dir(outterLoop);

        var tmpLoopItem = null;
        for (var j = 0, jlen = outterLoop.length; j < jlen; j++) {

            tmpLoopItem = outterLoop[j];
            
            
            tableTempl = tableObj.cloneNode();
            tbodyTempl.innerHTML = "";
            
            for (var k = tmpLoopItem.startIdx, klen = tmpLoopItem.endIdx; k < klen; k++) {
                
                tbodyTempl.appendChild(trObjs[k].cloneNode(true));
            }
            
            tableTempl.id = tableTempl.id + "_" + idLoop;
            tableTempl.appendChild(theadObj.cloneNode(true));
            tableTempl.appendChild(tbodyTempl.cloneNode(true));
            
            subTables.push(tableTempl);
            
            idLoop++
        }
        return subTables;
    },

    /**
     * 表格拆分 类型2, rowspan 等于 1 , 行高不等; <br/>
     * 
     * @param {Object}  options              拆分表格代用参数.
     * @param {Array}   options.trHeightSet  行高集合.
     * @param {Object}  options.theadDom     表头，合并用.
     * @param {Object}  options.tbodyDom     表格内容 tbody 部分，拆分用.
     * @param {Object}  options.tableTempl   表格 <table> 对象, 合并用.
     * 
     * @param {Number}  options.winH         窗口高度.
     * @param {Number}  options.restH        当前页面剩余高度
     * @param {Number}  options.theadH       表格 thead 高度
     * 
     * @return {Array} subTables 拆分后的表格对象集合.
     * 
     */
    splitTable_type_2: function(options) {

        console.info("This is splitTable_type_2 ");


        var trsH = options.trHeightSet;
        var tableObj = options.tableTempl;
        var theadObj = options.theadDom;
        var tbodyObj = options.tbodyDom;
        var winH = options.winH;
        var restH = options.restH;
        var theadH = options.theadH || 0;

        var subTables = [];
        var idLoop = 1;
        var tableId = tableObj.getAttribute("id") || new Date().getTime();
        var tableTempl = tableObj.cloneNode();
        var tbodyTempl = tbodyObj.cloneNode();


        var trObjs = tbodyObj.querySelectorAll("tr");
        // 容错-表头.
        var startIdx = trObjs.length - trsH.length;
        var trH = trsH[0];

        var targetH = restH;
        var newTblH = theadH;

        for (var i = 0, len = trsH.length; i < len; i++) {

            newTblH = newTblH + trsH[i];

            if (newTblH < targetH) {
                tbodyTempl.appendChild(trObjs[i + startIdx].cloneNode(true));
            } else {
                console.info("'满页'--已拆分到第[" + i + "]行数据.");

                targetH = winH;
                newTblH = theadH;
                i--;

                tableTempl.id = tableTempl.id + "_" + idLoop;
                tableTempl.appendChild(theadObj.cloneNode(true));
                tableTempl.appendChild(tbodyTempl.cloneNode(true));

                subTables.push(tableTempl);

                tbodyTempl.innerHTML = "";
                tableTempl = tableObj.cloneNode();
                idLoop++;
            }
        }

        if (newTblH > theadH) {

            // 添加 最后一次拆分的 表格数据.
            tableTempl.id = tableTempl.id + "_" + idLoop;
            tableTempl.appendChild(theadObj.cloneNode(true));
            tableTempl.appendChild(tbodyTempl.cloneNode(true));
            subTables.push(tableTempl);
        }

        return subTables;
    },

    /**
     * 表格拆分 类型3, rowspan 大于 1. <br/>
     * 
     * @param {Object}  options              拆分表格代用参数.
     * @param {Array}   options.trHeightSet  行高集合.
     * @param {Object}  options.theadDom     表头，合并用.
     * @param {Object}  options.tbodyDom     表格内容 tbody 部分，拆分用.
     * @param {Object}  options.tableTempl   表格 <table> 对象, 合并用.
     * 
     * @param {Number}  options.winH         窗口高度.
     * @param {Number}  options.restH        当前页面剩余高度
     * @param {Number}  options.theadH       表格 thead 高度
     * 
     * @return {Array} subTables 拆分后的表格对象集合.
     * 
     */
    splitTable_type_3: function(options) {

        console.info("This is splitTable_type_3 ");

        var trsH = options.trHeightSet;
        var tableObj = options.tableTempl;
        var theadObj = options.theadDom;
        var tbodyObj = options.tbodyDom;
        var winH = options.winH;
        var restH = options.restH;
        var theadH = options.theadH || 0;

        var subTables = [];
        var idLoop = 1;
        var tableId = tableObj.getAttribute("id") || new Date().getTime();
        var tableTempl = tableObj.cloneNode();
        var tbodyTempl = tbodyObj.cloneNode();


        var trObjs = tbodyObj.querySelectorAll("tr");
        // 容错-表头.
        var startIdx = trObjs.length - trsH.length;
        // startIdx = (startIdx == 0) ? 1 : startIdx;
        var trH = trsH[0];

        var targetH = restH;
        var newTblH = theadH;

        // 处理跨行 td.
        var tmpRowspanInfo = null;
        var tmpRowspan = 1;
        var rowspan = 1;
        var tmpCounter = 0;
        var tmpTDInfo = null;
        var tmpNewTD = null;


        for (var i = 0, len = trsH.length; i < len; i++) {

            tmpRowspanInfo = getTDRowspanInfo(trObjs[i + startIdx]);
            tmpRowspan = tmpRowspanInfo.rowspanVal;

            // 发现当前 tr 中存在td 属性[rowspan] 大于 1 的情况, 且避免 嵌套计算[rowspan]
            if (tmpRowspan > 1 && rowspan == 1) {
                rowspan = tmpRowspan;
                tmpTDInfo = tmpRowspanInfo;
            }

            newTblH = newTblH + trsH[i];

            if (newTblH < targetH) {

                if (rowspan > 1) {
                    rowspan--;
                    tmpCounter++;
                }

                tbodyTempl.appendChild(trObjs[i + startIdx].cloneNode(true));
            } else {
                console.info("'满页'--已拆分到第[" + i + "]行数据.");

                if (rowspan > 1) {
                    // 当前页 [分页计算]完毕, 但是存在 因属性[rowspan]而跨行的情况.
                    tmpNewTD = tmpTDInfo.tdObj.cloneNode(true);
                    tmpNewTD.rowSpan = tmpNewTD.rowSpan - tmpCounter;
                    tmpCounter--;
                    this.addTD(trObjs[i + startIdx], tmpNewTD, tmpTDInfo.idx);
                }

                targetH = winH;
                newTblH = theadH;
                i--;

                tableTempl.id = tableTempl.id + "_" + idLoop;
                tableTempl.appendChild(theadObj.cloneNode(true));
                tableTempl.appendChild(tbodyTempl.cloneNode(true));

                subTables.push(tableTempl);

                tbodyTempl.innerHTML = "";
                tableTempl = tableObj.cloneNode();
                idLoop++;
            }
        }

        if (newTblH > theadH) {

            // 添加 最后一次拆分的 表格数据.
            tableTempl.id = tableTempl.id + "_" + idLoop;
            tableTempl.appendChild(theadObj.cloneNode(true));
            tableTempl.appendChild(tbodyTempl.cloneNode(true));
            subTables.push(tableTempl);
        }

        return subTables;
    },
    
    
    /**
     * 缩放表格. <br/>
     * 当表格宽度 or 高度 超过最大值，执行缩小操作. <br/>
     * ps: transform: scale(), 可以缩放元素, 但不会改变其真实的 宽高 数值.
     * 
     * @param {Object} options 
     * @param {Object} options.tbl_obj  表格 DOM对象.
     * @param {Number} options.max_w    最大宽度.
     * @param {Number} options.max_h    最大高度.
     * 
     * @author gli-gonglong-20160523.
     * 
     */
    setTableZoom: function(options) {
    
        var tblObj = options.tbl_obj;
        var tblW = tblObj.offsetWidth || 0;
        var tblH = tblObj.offsetHeight || 0;
    
        var maxW = options.max_w || 0;
        var maxH = options.max_h || 0;
    
        console.info("表格原始 宽x高:" + tblW + ",x " + tblH);
        console.info("最大值 宽x高:" + maxW + ",x " + maxH);
    
        if (tblW <= maxW && tblH <= maxH) {
    
            console.log("无需缩小改表格");
    
        } else {
            
            var scaleX = 1;
            var scaleY = 1;
            
            var translateX = 0;
            var translateY = 0;
            
            if (tblW > maxW) {
    
                scaleX = (maxW / tblW).toFixed(3) - 0.001;
                translateX = (( maxW - tblW )/2).toFixed(1);;
                
            }
            
            if (tblH > maxH) {
    
                scaleY = (maxH / tblH).toFixed(3) - 0.001;
                translateY = ((maxH - tblH)/2).toFixed(1);
            }
            
            var scaleVal = ' scale3d(' + scaleX + ',' + scaleY + ', 1 ' + ') ';
            var translateVal = ' translate3d(' + translateX + 'px, ' + translateY + 'px, 0) ';
            
            tblObj.style.transform = translateVal + scaleVal;
            // tblObj.style.transform = translateVal + scaleVal;
        }
    
    
        tblW = tblObj.offsetWidth || 0;
        tblH = tblObj.offsetHeight || 0;
        console.info("表格缩放后 宽x高:" + tblW + ",x " + tblH);
    
    },
    
    
    
};


Dom = new Dom();