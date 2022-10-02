var mid = document.getElementById("mid");
var left = document.getElementById("left");
var con = document.getElementById("content");

con.innerHTML = "滑动解锁";

var flag = false;
var finished = false;

mid.onmousedown = function (event) {
    if(finished) {
        return;
    }

    flag = true;
}

mid.onmouseup = function (event) {
    if(finished) {
        return;
    }

    flag = false;

    var x = event.clientX;

    if(x <= 500 - 25 - 2 - 5) {
        mid.style.left = 0 + "px";

        left.style.backgroundColor = "rgb(232,232,232)"
    }
    else if(x > 500 - 25 - 2 - 5) {
        finished = true;

        left.style.backgroundColor = "rgb(144,238,144)";
        con.innerHTML = "验证成功";
    }
}

mid.onmousemove = function (event) {
    if(finished) {
        return;
    }

    var x = event.clientX;
    var y = event.clientY;

    if(x >= 0 && x <= 500 - 25 - 2 && flag && y >= 0 && y <= 50) {
        mid.style.left = (x - 25) + "px";

        left.style.width = x + "px";
        left.style.backgroundColor = "rgb(173,216,230)";
    }
};
