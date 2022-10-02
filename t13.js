var index = 2;

var allA = document.getElementsByTagName("a");

for(var i = 0; i < allA.length; ++i) {

    allA[i].onclick = function () {
        var tr = this.parentNode.parentNode;

        var flag = confirm("确认删除？");

        if(flag) {
            tr.parentNode.removeChild(tr);
        }

        // 阻止超链接默认行为
        return false;
    };
}

document.getElementById("submit").onclick = function () {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var salary = document.getElementById("salary").value;

    var r = document.createElement("tr");
    var d1 = document.createElement("td");
    var d2 = document.createElement("td");
    var d3 = document.createElement("td");
    var d4 = document.createElement("td");
    var a = document.createElement("a");

    d1.innerHTML = name;
    d2.innerHTML = email;
    d3.innerHTML = salary;

    document.getElementById("employeeTable").appendChild(r);

    r.appendChild(d1);
    r.appendChild(d2);
    r.appendChild(d3);
    r.appendChild(d4);

    d4.appendChild(a);
    a.innerHTML = "Delete";
    a.href = "javascript:;";

    a.onclick = function () {
        var tr = this.parentNode.parentNode;

        var flag = confirm("确认删除？");

        if(flag) {
            tr.parentNode.removeChild(tr);
        }

        // 阻止超链接默认行为
        return false;
    };
}
