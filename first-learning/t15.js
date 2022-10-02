"use strict";

var box = document.getElementById("box");
var list = document.getElementById("list");

list.style.width = 5 * 880 + "px";

var alla = document.getElementsByTagName("a");

var timer = null;

for(var i = 0; i < alla.length; ++i) {
    alla[i].num = i;

    alla[i].onclick = function () {
        var index = this.num;

        // alert(this.num);

        // list.style.left = "-" + index * 420 + "px";

        // setA(index);

        move(index);
    }
}

function setA(index) {
    for(var i = 0; i < alla.length; ++i) {
        alla[i].style.backgroundColor = "";
    }

    alla[index].style.backgroundColor = "black";
}

function move (index) {
    index %= alla.length;

    var rl = parseInt(list.style.left);

    if(isNaN(rl)) {
        rl = 0;
    }

    // console.log(rl);

    var i = rl;

    timer = setInterval(function () {
        list.style.left = i + "px";

        i -= 10;

        if(i == -420 * 5) {
            i = 0;

            list.style.left = i + "px";
        }

        if(i == -420 * index) {
            clearInterval(timer);
        }
    }, 10);
}
