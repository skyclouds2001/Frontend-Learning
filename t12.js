var source = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg"];
var index = 0;
var img = document.getElementById("img");

document.getElementById("b1").onclick = function () {
    --index;
    if(index == -1) {
        index = 3;
    }

    img.src = source[index];
}

document.getElementById("b2").onclick = function () {
    ++index;
    if(index == 4) {
        index = 0;
    }

    img.src = source[index];
}
