function addClass(domObj, cssName) {
    if (typeof domObj == 'undefined') {
        console.error("domObj is not exit...");
    } else {
        domObj.classList.add(cssName);
    }
}

function toggleClass(domObj, cssName) {

    console.log("toggleClass ...");

    if (typeof domObj == 'undefined') {
        console.error("domObj is not exit...");
    } else {
        var flg = false;
        var localClassList = domObj.classList;

        flg = localClassList.contains(cssName);

        if (flg) {
            localClassList.remove(cssName);
        } else {
            localClassList.add(cssName);
        }

    }

}

function testFunc() {
    var dom = document.getElementById("main_box");

    toggleClass(dom, 'selected');
}