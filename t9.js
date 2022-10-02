"use strict"

function main() {
    var colorStart = window.prompt("输入起始颜色，为六位十六进制数");
    var colorEnd = window.prompt("输入结束颜色，为六位十六进制数");
    var step = window.prompt("输入层级，为十进制数");

    if(colorStart.length != 6 || colorEnd.length != 6 || isNaN(Number(step))) {
        document.write("<div class=\"mistake_box\">输入有误!</div>");
        return;
    }

    var redStart = parseInt(colorStart.substr(0, 2), 16);
    var greenStart = parseInt(colorStart.substr(2, 2), 16);
    var blueStart = parseInt(colorStart.substr(4, 2), 16);

    if(isNaN(Number(redStart)) || isNaN(Number(greenStart)) || isNaN(Number(blueStart))) {
        document.write("<div class=\"mistake_box\">输入有误!</div>");
        return;
    }

    var redEnd = parseInt(colorEnd.substr(0, 2), 16);
    var greenEnd = parseInt(colorEnd.substr(2, 2), 16);
    var blueEnd = parseInt(colorEnd.substr(4, 2), 16);

    if(isNaN(Number(redEnd)) || isNaN(Number(greenEnd)) || isNaN(Number(blueEnd))) {
        document.write("<div class=\"mistake_box\">输入有误!</div>");
        return;
    }

    document.write("<div class=\"title\">渐变色展示</div>");

    var info = "<div class=\"info\">起始颜色：#" + colorStart + "&nbsp;&nbsp;终止颜色：#" + colorEnd + "&nbsp;&nbsp;层级：" + step + "</div>";
    document.write(info);

    for(var i = 0; i < step; ++i) {
        var ri = redStart + (redEnd - redStart) / step * i;
        var gi = greenStart + (greenEnd - greenStart) / step * i;
        var bi = blueStart + (blueEnd - blueStart) / step * i;

        var colorBox = "<div class=\"content-box\" style=\"background-color: rgb(" + ri + ", " + gi + ", " + bi +")\"></div>";
        document.write(colorBox);
    }
}

main();

