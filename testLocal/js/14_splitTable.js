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
function getTDRowspan(trObj) {
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
}

/**
 * 向指定的 tr 添加 td. <br/>
 * 
 * @param {Object} trObj 待操作tr节点.
 * @param {Object} tdObj 待操作td节点.
 * @param {Number} idx   待添加的位置.
 * 
 */
function addTD(trObj, tdObj, idx) {
    
    var tds = trObj.querySelectorAll("td");
    
    if(tds.length > idx) {
        trObj.insertBefore(tdObj, tds[idx]);
    } else {
        trObj.appendChild(tdObj);
    }
}

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
function getTDRowspanInfo(trObj) {
    
    var infoVal = {
        idx: 0,
        rowspanVal: 1,
        total: 0,
        tdObj : null,
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
};


var PAGE = {
    
    tbl_id : "",
    
    data: "",

    pageH: 470,

    schools_bak: ["北京大学", "清华大学", "四川外国语大学,北京外国语大学", "东南大学", "中国科技大学",
        "重庆大学", "西南大学", "麻省理工学院", "大连民族学院", "孔子学院, 武当山道教学院"
    ],
    
    schools: ["北京大学", "清华大学", "四川外国语大学", "东南大学", "中国科技大学",
        "重庆大学", "西南大学", "麻省理工学院", "大连民族学院", "孔子学院"
    ],

    totalScores: ["100.00", "10.05", "20.05", "30.00", "40.00",
        "88.00", "50.00", "60.00", "70.00", "88.00"
    ],

    district: ["北京", "天津", "重庆", "上海", "USA",
        "辽宁", "江苏", "台湾", "南海", "广东"
    ],
    
    district_bak: ["北京", "天津", "重庆", "上海", "USA",
        "辽宁", "江苏", "台湾", "南海-南海", "广东"
    ],

    type: ["综合", "理工", "文法"],

    order_1: ["1", "3", "2"],
    order_2: ["6", "7", "8"],

    /**
     * 
     * @param selector 选择器 "#id"
     * 
     **/
    getTblHtml: function(selector) {

        var tmpJqDom = $(selector);
        var tmpHtml = tmpJqDom[0].outerHTML;

        // 换行
        tmpHtml = tmpHtml.replace(/\n/, "");
        // 回车
        tmpHtml = tmpHtml.replace(/\r/, "");

        return tmpHtml;
    },

    /**
     * 拆分表格. <br/>
     * 
     * @param {Number} pageH 页面高度
     * @param {Object} tbl 表格对象(zepto)
     * 
     * @return {Array} 拆分后的表格数组 
     *                 ["<table> </table>", "<table> </table>",,,]
     * 
     **/
    splitTbl: function(pageH, tbl) {
 
    },


    /**
     * 拆分表格, 一次完成, 提升效率. <br/>
     * 
     * @param {Object} option 表格拆分参数.
     *          ---> {Number} winH     窗口高度.
     *          ---> {Number} restH    当前页剩余高度.
     *          ---> {Number} tblH     表格高度.
     *          ---> {Number} theadH   表格 thead 高度.
     *          ---> {Array}  trsH     表格 tbody 中tr 高度集合.
     * 
     * @param {Object} tblDom 待拆分表格DOM对象. 
     * 
     * @return {Object} 拆分结果.
     *          ---> {Boolean} flg      拆分状态  true: 拆分成功, false: 拆分失败.
     *          ---> {Array}   subTbls  a. flg为 true 时, 为拆分后的表格   [html/节点]  集合,
     *                                  b. flg为 false 时, 为 空集合(长度为 0);
     * 
     * @author gli-gonglong-20160516
     * 
     */
    splitTbl_new: function(option, tblDom) {

        // 异常数据: 单行tr高度超过 页面高度,
        // 如果本次拆分tr仅为 "表头", 则属于无效拆分，须执行换页, 否则，无限循环 拆表头.

        var value = {
            flg: false,
            subTbls: []
        };
         
        // 默认  表格 边框宽度
        var BORDER_W = 2;

        var tHeadObj = tblDom.querySelector("thead");
        var tBodyObj = tblDom.querySelector("tbody");
        var trObjs = tBodyObj.querySelectorAll("tr");
        
        var tblTempl = tblDom.cloneNode();
        var tblTbodyTempl = tBodyObj.cloneNode();
        var startIdx = 0;
        
        try {
            // 如果剩余空间高度 大于 "表头 + 第一行tr", 则执行本次拆分.
            if (option.restH > (option.theadH + option.trsH[0] + BORDER_W)) {
                
                // 容错处理--表头格式.
                if (option.theadH == 0) {

                    // 从 tbody中 截取 表头.
                    tHeadObj = document.createElement("thead");

                    // 因 rowSpan 属性导致的 多行表头.
                    var rowspanInfo = getTDRowspanInfo(trObjs[0]);
                    var theadNum = rowspanInfo.rowspanVal;

                    for (var i = 0; i < theadNum; i++) {
                        tHeadObj.appendChild(trObjs[i].cloneNode(true));
                        option.theadH = option.theadH + option.trsH[i];
                    }
                    
                    startIdx = startIdx + theadNum;
                }
                
                // 开始拆分 tbody 部分.
                
                // 容错处理. 单行 tr 高度超过 页面高度.
                
                var winH = option.winH;
                // 表头高度.
                var tblHeadH = option.theadH;
                // 拆分/合并 表格 预定高度.
                var targetH = option.restH;
                // 拆分/合并 表格, 当前高度;
                var splitH = tblHeadH;
                var tmpTrsH = option.trsH;
                
                tblTempl.appendChild(tHeadObj.cloneNode(true));
                // <td rowspan="5">
                var tmpRowspanInfo = null;
                var tmpRowspan = 1;
                var rowspan = 1;
                var tmpCounter = 0;
                
                var tmpTDInfo = null;
                
                for (var j = startIdx, jlen = trObjs.length; j < jlen; j++) {
                    
                    tmpRowspanInfo = getTDRowspanInfo(trObjs[j]);
                    tmpRowspan = tmpRowspanInfo.rowspanVal;
                    
                    // 发现当前 tr 中存在td 属性[rowspan] 大于 1 的情况, 且避免 嵌套计算[rowspan]
                    if (tmpRowspan > 1 && rowspan == 1) {
                        
                        rowspan = tmpRowspan;
                        tmpTDInfo = tmpRowspanInfo;
                    }
                    
                    if (rowspan > 1) {
                        rowspan--;
                        tmpCounter++;
                    }
                    
                    // 合并 当前 tr.
                    splitH = splitH + tmpTrsH[j];
                    
                    if( splitH < targetH ) {
                        
                        tblTbodyTempl.appendChild(trObjs[j].cloneNode(true));
                        
                    } else {
                        
                        console.info( " '满页'--已拆分到第[" + j + "]行数据." );
                        
                        if (rowspan > 1) {
                            // 当前页 [分页计算]完毕, 但是存在 因属性[rowspan]而跨行的情况.
                            var tmpNewTD = tmpTDInfo.tdObj.cloneNode(true);
                            
                            tmpCounter--;
                            tmpNewTD.rowSpan = tmpNewTD.rowSpan - tmpCounter;
                            addTD(trObjs[j], tmpNewTD, tmpTDInfo.idx);
                        }
                        
                        // TODO, 
                        targetH = winH;
                        splitH = tblHeadH;
                        j--;
                        
                        tblTempl.appendChild(tblTbodyTempl.cloneNode(true));
                        tblTbodyTempl.innerHTML = "";
                        
                        value.subTbls.push(tblTempl);
                        
                        // 新建 下一表格
                        tblTempl = tblDom.cloneNode();
                        tblTempl.appendChild(tHeadObj.cloneNode(true));
                    }
                } // end for-loop.
                
                if (splitH > tblHeadH) {
                    
                    // 添加 最后一次拆分的 表格数据.
                    tblTempl.appendChild(tblTbodyTempl.cloneNode(true));
                    value.subTbls.push(tblTempl);
                }

                value.flg = true;
            }
        } catch (e) {
            throw "表格拆分出错!" + e;
        }

        return value;

    },



    createTbl: function() {

        var templ = _.template($('#info_item').html());

        var dataList = this.getTblData();

        var subTbls = templ({
            'data': dataList
        });

        $("#table_random").find("tbody").append(subTbls);
    },

    /**
     * 生成测试用 表格数据. <br />
     * 
     * @return {Array} list
     * 
     */
    getTblData: function() {

        var idx = 0;
        var idx_2 = 0
        var tblLen = 35;
        var list = [];
        var tmp = {};

        for (var i = 0, len = tblLen; i < len; i++) {

            idx = _.random(0, 9);
            idx_2 = idx % 3;

            tmp = {};
            // 排名
            tmp.order = i+1;
            // 院校名称
            tmp.schoolName = this.schools[idx];
            // 总分
            tmp.score = this.totalScores[idx];
            // 地区内序
            tmp.district = this.district[idx];
            tmp.district_order = this.order_1[idx_2];

            // 类型序
            tmp.type = this.type[idx_2];
            tmp.type_order = this.order_2[idx_2];

            list.push(tmp);
        }

        return list;
    },


    bindEvent: function() {

        var that = this;
        
        // table3, table4, table5, table_random
        var tblId = "table4";

        // 生成表格.
        $("#get_tbl_html").on("click", function() {
            // that.getTblHtml("#table3");
            that.createTbl();
        });

        // 拆分表格
        $("#split_tbl").on("click", function() {
           // nothing.
        });

        // 拆分表格-算法优化, 
        $("#split_tbl_better").on("click", function() {

            var tblObj = document.getElementById(tblId);

            var tblThead = tblObj.querySelector("thead");
            var tblTbody = tblObj.querySelector("tbody");
            var trObjs = tblTbody.querySelectorAll("tr");
            var trObjsH = [];

            for (var i = 0, len = trObjs.length; i < len; i++) {
                trObjsH.push(trObjs[i].offsetHeight);
            }

            var opt = {
                winH: that.pageH,
                restH: 300,
                tblH: tblObj.offsetHeight,
                theadH: (!!tblThead) ? tblThead.offsetHeight : 0,
                trsH: trObjsH
            };

            try {
                // TODO - GONGLONG
                // var result = that.splitTbl_new(opt, tblObj);
                
                console.time("AAA");
                
                var result = Dom.splitTable_advanced(opt, tblObj);
                
                console.timeEnd("AAA");
                
                if (result.flg) {

                    for (var j = 0, jlen = result.subTbls.length; j < jlen; j++) {
                        $("#right_result").append(result.subTbls[j]);
                    }
                }

            } catch (e) {
                console.error(e);
            }

        });
        
        // 比例缩小, zoom_tbl
        $("#zoom_tbl").on("click", function(){
            
            var tbl_id = "table3";
            
            // clone, right_result
            var $tblClone = $("#table3").clone();
            $tblClone.attr('id', tbl_id + "_c");
            $("#right_result").append($tblClone);
            
            var tblObj = $tblClone[0];
            var maxW = 200;
            var maxH = 300;
            
            var options = {
                'tbl_obj' : tblObj,
                'max_w' : maxW,
                'max_h' : maxH
            };
            
            Dom.setTableZoom(options);
        });
        
        $("body").on("keydown", function(e){
            
            console.log("KEY DOWN:" + e.keyCode + " , " + e.code);
            
        });
        
    }
};



function clickEvent() {
    
}

$(function() {

    PAGE.bindEvent();
});