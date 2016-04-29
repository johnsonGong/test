$(function() {

    var tblObj = $("#table1");
    
    
    // transform or user-select
    var cssStyle = "user-select";
    
    getStyleCompatible(cssStyle);
    getStyleCompatible("transform");
    
    $("#btn_scale").on("click", function() {

        var tblW = tblObj.outerWidth();
        var tblH = tblObj.outerHeight();
 
        var cssStyle = getDomScaleVal({tblW : tblW, maxW: 300 });
        
        
        var styleAry = getStyleCompatible("transform", cssStyle);
        var tmpItem = null;
        
        
        for (var i = 0, len = styleAry.length; i < len; i++) {
            tmpItem = styleAry[i];
            tblObj[0].style[tmpItem.name] = tmpItem.value;
            console.log("i:" + i + ", " + tmpItem.name + ", " +tmpItem.value);
        }
        
        // tblObj.css("transform", cssStyle);
 
    });

    $("#btn_css").on("click", function() {

        // outerHeight()
        var cssStr = "width:" + tblObj.outerWidth() + ",height:" + tblObj.outerHeight();
        console.log(cssStr);
    });

    /**
     * 获取 Dom 比例缩放(宽度)参数.<br/>
     * ps: 表格宽度大于页面宽度，导致无法显示完整内容.
     * 
     * @param {Object} options.
     *          --> {Number} tblW
     *          --> {Number} maxW
     * 
     * @return {String} transformVal
     *              如:  translate(-141.5px,0) scale(0.493, 1);
     * 
     **/
    function getDomScaleVal(options) {

        var tblW = options.tblW || 0;
        var maxW = options.maxW || 0;
        var scaleX = 0;
        var translateX = 0;

        var transformVal = "";

        if (tblW >= maxW) {
            scaleX = (maxW / tblW).toFixed(3);
            translateX = ((tblW-maxW)/2).toFixed(1);
            
            transformVal = "translate(-" + translateX + "px, 0) " + " scale(" + scaleX + ", 1)";
        }

        return transformVal;
    }
    
    /**
     * 获取  兼容style. <br/>
     * 
     * @param {String} cssKey 如: transform or user-select
     * @param {String} value 如: scale(0.395, 1)
     * 
     * @param {Array} 兼容css集合.
     *          [{key: MozTransform, value: scale(0.395, 1)}, 
     *           {key: MsTransform, value: scale(0.395, 1)},
     *           {key: WebkitTransform, value: scale(0.395, 1)},
     *           {key: OTransform, value: scale(0.395, 1)}]
     * 
     */
    function getStyleCompatible (cssKey, value) {
        
        var ckey = cssKey || "";
        var val = value || "";
        
        var cssSet = [];
        var prefix = ["Webkit", "Ms", "Moz", "O"];
        var mainKey = ""; // transform, 　userSelect, 区分"首字母"大小写;
        var joinKey = ""; // Transform,  UserSelect
        
        if (!!ckey) {
            
            var tmpKeyAry = ckey.split("-");
            var tmpItem = "";
            
            for (var i = 0, len = tmpKeyAry.length; i < len; i++) {
                
                tmpItem = tmpKeyAry[i].toLowerCase();
                // toUpperCase, toLowerCase, substr
                substr = tmpItem.substr(0, 1).toUpperCase();
                tmpItem = substr + tmpItem.substr(1);
                
                tmpKeyAry[i] = tmpItem;
            }
            
            joinKey = tmpKeyAry.join("");
            mainKey = joinKey.substr(0, 1).toLowerCase() + joinKey.substr(1);
            
            for (var j = 0, jlen = prefix.length; j < jlen; j++) {
                 cssSet.push({
                     name : prefix[j] + joinKey,
                     value: val
                 });
            }
        }
        
        return cssSet;
    }


});