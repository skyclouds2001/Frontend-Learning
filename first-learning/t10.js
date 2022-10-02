"use strict"

class Student {
    constructor(id, chinese, math, english) {
        this.id = id;
        this.chinese = chinese;
        this.math = math;
        this.english = english;
        this.total = chinese + math + english;
    }
}

function compare(s1, s2) {
    return s2.total - s1. total;
}

function main() {
    var student = load();

    student.sort(compare);

    var s = "<caption>考试成绩</caption>" +
    "<tr id=\"s0\">" +
    "    <td>StudentNumber</td>" +
    "    <td>Chinese</td>" +
    "    <td>Math</td>" +
    "    <td>English</td>" +
    "    <td>TotalScore</td>" +
    "</tr>";
    for(var i = 1; i <= student.length; ++i) {
        s += "<tr id=s" + i + "> " +
        "<td id=s" + i + "01></td>" +
        "<td id=s" + i + "02></td>" +
        "<td id=s" + i + "03></td>" +
        "<td id=s" + i + "04></td>" +
        "<td id=s" + i + "05></td>" +
        "</tr>";
    }
    document.getElementById("score").innerHTML = s;

    for(var i = 1; i <= student.length; ++i) {
        document.getElementById("s" + i + "01").innerHTML = student[i - 1].id;
        document.getElementById("s" + i + "02").innerHTML = student[i - 1].chinese;
        document.getElementById("s" + i + "03").innerHTML = student[i - 1].math;
        document.getElementById("s" + i + "04").innerHTML = student[i - 1].english;
        document.getElementById("s" + i + "05").innerHTML = student[i - 1].total;
    }
}

function load() {
    return [
        new Student(202001, 105, 62, 118),
        new Student(202002, 89, 78, 120),
        new Student(202003, 86, 64, 80),
        new Student(202004, 78, 99, 91),
        new Student(202005, 107, 97, 70),
        new Student(202006, 112, 61, 92),
        new Student(202007, 101, 79, 104),
        new Student(202008, 71, 72, 105),
        new Student(202009, 56, 68, 61),
        new Student(202010, 98, 83, 77)
    ];
}

main();
