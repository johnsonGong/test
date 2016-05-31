var PAGE = {
    TestCacheObj : null,
    
    main: function () {},
    
    bindEvent: function (){
        
        var that = this;
        
        // 常规.
        $("#normal_btn").on("click", function(){
            
            try{
                console.time("NORMAL");
                
                setTimeout(that.TestCacheObj.normal, 10);
            	// that.TestCacheObj.normal();
            	
            	console.timeEnd("NORMAL");
            	
            }catch(e){
            	console.error("[常规] " + e);
            	console.timeEnd("NORMAL");
            }
            
        });
        
            $("#tmp_btn").on("click", function() {
                
                
                // that.TestCacheObj.setImgWidth();
                var dom_i = document.getElementById("tmp_test_i");
                var outTag = getElementOutTag(dom_i);
                console.info("outTag: " + outTag);
            });
        
        
    }
};




/**
 * 技术调查 -- 通过给 表格 添加 内容 ( tr ) , 测试 内存消耗。
 * 
 */
function TestCach(options) {
    
    var defOption = {
        'maxCount': 100, // {Number} 添加内容的 总数;
        'tableSelector': '', // {String} 表格选择器
        'step': 5, // {Number} 每次添加的内容数据量
        
        'jqContainObj' : null,
        'jqDataObj' : null,
    };
    
    this.option = $.extend({}, defOption, options);
    

    
    this.init();
    
};


TestCach.prototype.init = function() {

    var tbodyObj = $(this.option.tableSelector).find("tbody");
    var data = tbodyObj.find("tr").clone();

    this.option.jqContainObj = tbodyObj;
    this.option.jqDataObj = data;
};


TestCach.prototype.normal = function() {
    
    var that = window.PAGE.TestCacheObj;
    console.log( "--[normal] maxCount: " + that.option.maxCount );
    
    var container = that.option.jqContainObj;
    var trData = that.option.jqDataObj.clone();
    var step = that.option.step;
    var max = that.option.maxCount;
    
    for (var i = 0, len = max; i < len; i++) {
        // trData.clone()
        container.append( trData.clone() );
    }
    
    that = null;
    container = null;
    trData = null;
    
};


TestCach.prototype.async = function() {
    
};


TestCach.prototype.frag = function() {
    
};

TestCach.prototype.setImgWidth = function() {
    
    var imgObj = $("#test_dog");
    imgObj.attr("width", "100px;");

};



$(function(){
    
    var option = {
        'maxCount': 10,
        'tableSelector': '#table3',
    };
    
    var cachModal = new TestCach(option);
    
    // cachModal.normal();
    
    PAGE.TestCacheObj = cachModal;
    
    PAGE.bindEvent();
    
});




/**
function getElementOutTag(elem){
    if( elem.nodeValue ){
        return Utils.trim( elem.nodeValue );
    }
    
    // BUG: -- 20160531 -- "<i >i</i>".replace("i", '') --> "< >i</i>"
    var firstIdx = elem.outerHTML.indexOf(">");
    
    var tmpTagHTML = elem.outerHTML.substring(0, firstIdx);
    var tmpOuterHtml = elem.outerHTML.substr(firstIdx);
    tmpOuterHtml = tmpOuterHtml.replace(elem.innerHTML,"");
    tmpOuterHtml = tmpTagHTML + tmpOuterHtml;
    
    return tmpOuterHtml;
}

  **/