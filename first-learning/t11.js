"use strict";

var nameArr = ["NPC"];
var raceArr = ["霜狐族", "玉鸾族", "戾斑族", "蛮豚族", "黑蒙族", "岫兕族"];
var sexArr = ["男", "女"];
var charmArr = ["憎呕", "丑陋", "怪异", "普通", "出众", "超凡", "仙姿"];
var interestArr = ["陶器", "瓷器", "铁器", "书籍"];
var popeDoorArr = ["风灵月影"];
var statusArr = ["外门弟子", "内门弟子", "真传弟子", "长老", "大长老", "宗主"];
var cultivationArr = ["练气", "筑基", "结晶", "金丹", "具灵", "元婴", "化神", "悟道", "羽化", "登仙"];
var chatArr = [
    "近来过得可好？",
    "与君一见，如沐春风。",
    "与你结交，甚是欢喜。",
    "今日相谈甚欢，期望改日再聚。",
    "久仰大名!今日一见，不甚荣幸。",
    "阁下之名，如雷贯耳！今能当面请益，真是三生有幸。",
    "既为同道中人，日后可要多亲近亲近。",
    "同是天涯沦落人，相逢何必曾相识？希望有朝一日我们都能加入强大的宗门。",
    "多日不见，近来可好？",
    "虽说正魔有别，但是阁下的为人却让我很是钦佩。",
    "你的修为似乎又精进了不少。",
    "当什么散修，来我的宗门吧！在这里我亲友众多。有我照着，你可以横着走。",
    "当散修有什么好？我的母亲是宗门的长老，我让她引荐你加入我的宗门如何？",
    "久仰久仰，阁下的大名早已如雷贯耳。",
    "道不同不相为谋，无需多言。"
];
var communicateArr = [
    "甚好，常听闻你满腹经纶，我也想与你坐而论之。",
    "你的至亲与挚爱同时身陷魔沼，而你只能救上一人，你当如何行事？",
    "游历时，如果路遇残尸枯骨，你会如何？",
    "禽鸟生蛋，蛋生禽鸟，是蛋先生禽鸟，还是禽鸟先生蛋？",
    "在突破时，雷劫突至，周遭有数千凡人，若是强行突破则会生灵灭绝、殃及无辜。此时你会如何抉择？",
    "人言修行当精一技可至强，又有人言修百艺压身以备不时之需，如若是你何以？",
    "无赖老修装伤祈缘，待人救助反施讹诈，久之人心惶惶，类有求援见之生疑驻足不前，唯恐避之不及，若你在见有人求助，却难辨真假时，会如何做择？",
    "路见一人垂死，在临终之际托你将一匣盒送到另一人手中，你会如何行事？",
    "抱歉，我没兴趣。"
];
var argueArr = [
    "你个小辈修为低下，你我具为散修，没有宗门当靠山的你任我揉捏。",
    "独自在外一人可是很危险的，若是被人杀了连个能帮你收尸的人都没有，你觉得呢？",
    "我在风灵月影宗亲友众多，小心他们为我寻仇！",
    "话不投机半句多，告辞。",
    "上次我讨伐了一只药灵，长得和你很像。",
    "宗门虽强，却收了你这个败类！",
    "别以为你有宗门的庇护我就收拾不了你，终有一日我会找到机会将你除去，你等着吧！",
    "终日浪荡，不堪如你也是污了宗门的名声。"
];

function getRandomString (array) {
    var len = array.length;

    var rand = Math.floor(Math.random() * len);

    return array[rand];
}

function getRandomPerson () {
    document.getElementById("name").innerHTML += getRandomString(nameArr);
    document.getElementById("race").innerHTML += getRandomString(raceArr);
    document.getElementById("sex").innerHTML += getRandomString(sexArr);
    document.getElementById("charm").innerHTML += getRandomString(charmArr);
    document.getElementById("interest").innerHTML += getRandomString(interestArr);
    document.getElementById("popeDoor").innerHTML += getRandomString(popeDoorArr);
    document.getElementById("status").innerHTML += getRandomString(statusArr);
    document.getElementById("cultivation").innerHTML += getRandomString(cultivationArr);
}

function main () {
    getRandomPerson();
}

main();

function talk (index) {
    var d = new Date();

    var s= "<p>";
    s += d.getFullYear() + "年" +
            (d.getMonth() + 1) + "月" +
            d.getDate() + "日" + " " +
            d.getHours() + ":" +
            d.getMinutes() + ":" +
            d.getSeconds();

    s += "</p>";

    document.getElementById("talk_box").innerHTML += s;

    var ss = "<p>";
    if (index === 1) {
        ss += "幂与NPC闲聊，NPC说：“";
        ss += getRandomString(chatArr);
        ss += "”";
    }
    else if (index === 2) {
        ss += "幂与NPC论道，NPC说：“";
        ss += getRandomString(communicateArr);
        ss += "”";
    }
    else if(index === 3) {
        ss += "幂对NPC出言不逊，NPC说：“";
        ss += getRandomString(argueArr);
        ss += "”";
    }
    ss += "</p>";

    document.getElementById("talk_box").innerHTML += ss;

    document.getElementById("talk_box").innerHTML += "<p>&nbsp;</p>";
}
