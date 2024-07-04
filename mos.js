Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

Array.prototype.zip = function (...args) {
    const new_array = [];
    for (let i = 0; i < this.length; i++) {
        new_array.push([this[i], ...args.map(arg => arg[i])]);
    }
    return new_array;
}

// invalid enter key
function invalid_enter() {
    if (window.event.keyCode == 13) {
        return false;
    }
}

// start experiment
function start_experiment() {
    // get user name
    var name = document.getElementById("name").value.replace(" ", "_");
    if (name == "") {
        alert("Please enter your name.");
        return false;
    }

    // get setlist number
    var set_num = "0"
    var number = document.getElementsByName("set");
    for (var i = 0; i < number.length; i++) {
        if (number[i].checked) {
            set_num = number[i].value;
        }
    }
    if (set_num == "0") {
        alert("Please press the setlist number button.");
        return false;
    }

    // convert display
    Display();

    // read filepath
    var method1_list = wav_dir + "set" + set_num + "/a.list";
    var method2_list = wav_dir + "set" + set_num + "/b.list";
    var method3_list = wav_dir + "set" + set_num + "/c.list";
    //var method4_list = wav_dir + "set" + set_num + "/usfgan.list";
    //natural = loadText(natural_list);
    method1 = loadText(method1_list);
    method2 = loadText(method2_list);
    method3 = loadText(method3_list);
    //method4 = loadText(method4_list);
    outfile = name + "_set" + set_num + ".csv";
    file_list = makeFileList();
    console.log(file_list);
    scores1 = (new Array(file_list.length)).fill(0);
    scores2 = (new Array(file_list.length)).fill(0);
    //scores3 = (new Array(file_list.length)).fill(0);
    eval1 = document.getElementsByName("eval1");
    eval2 = document.getElementsByName("eval2");
    //eval3 = document.getElementsByName("eval3");
    init()
}

// convert display
function Display() {
    document.getElementById("Display1").style.display = "none";
    document.getElementById("Display2").style.display = "block";
}

function loadText(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, false);
    xhr.send(null);
    var list = xhr.responseText.split(/\r\n|\r|\n/);
    list.pop();

    return list;
}

// make file list
function makeFileList() {
    var files = method1.zip(method2, method3);
    files.shuffle();
    return files;
}

function setSlide() {
    document.getElementById("page").textContent = "" + (n + 1) + "/" + scores1.length;
    document.getElementById("slide").innerHTML = 'Slide:<br>'
        + '<object data="' + file_list[n][2]
        + '" type="image/jpeg"'
        + 'width="720px"'
        + 'height="540px">'
        + '</object>';
}

function setAudio() {
    document.getElementById("page").textContent = "" + (n + 1) + "/" + scores1.length;
    document.getElementById("audio_ref").innerHTML = 'Reference Voice:<br>'
        + '<audio id="audio1" src="' + file_list[n][2]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("audio1").innerHTML = 'Voice 1:<br>'
        + '<audio id="audio1" src="' + file_list[n][0]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("audio2").innerHTML = 'Voice 2:<br>'
        + '<audio  id="audio2" src="' + file_list[n][1]
        + '" controls preload="auto">'
        + '</audio>';
}


function init() {
    n = 0;
    setAudio();
    evalCheck1();
    evalCheck2();
    evalCheck3();
    setButton();
}
function evalCheck1() {
    const c = scores1[n];
    if ((c <= 0) || (c > eval1.length)) {
        for (var i = 0; i < eval1.length; i++) {
            eval1[i].checked = false;
        }
    }
    else {
        eval1[c - 1].checked = true;
    }
}
function evalCheck2() {
    const c = scores2[n];
    if ((c <= 0) || (c > eval2.length)) {
        for (var i = 0; i < eval2.length; i++) {
            eval2[i].checked = false;
        }
    }
    else {
        eval2[c - 1].checked = true;
    }
}
//function evalCheck3() {
//    const c = scores3[n];
//    if ((c <= 0) || (c > eval3.length)) {
//        for (var i = 0; i < eval3.length; i++) {
//            eval3[i].checked = false;
//        }
//    }
//    else {
//        eval3[c - 1].checked = true;
//    }
//}
function evalCheck_ori() {
    const c = scores[n];
    if ((c <= 0) || (c > eval.length)) {
        for (var i = 0; i < eval.length; i++) {
            eval[i].checked = false;
        }
    }
    else {
        eval[c - 1].checked = true;
    }
}

function setButton() {
    var finish_flag = 0;
    var next_flag = 0;
    if (n == (scores1.length - 1)) {
        document.getElementById("prev").disabled = false;
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        for (var i = 0; i < eval1.length; i++) {
            if (eval1[i].checked) {
                finish_flag += 1;
            }
            if (eval2[i].checked) {
                finish_flag += 1;
            }
            if (finish_flag >= 2) {
                document.getElementById("finish").disabled = false;
                break;
            }
        }
    }
    else {
        if (n == 0) {
            document.getElementById("prev").disabled = true;
        }
        else {
            document.getElementById("prev").disabled = false;
        }
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        for (var i = 0; i < eval1.length; i++) {
            console.log(next_flag);
            if (eval1[i].checked) {
                next_flag += 1;
            }
            if (eval2[i].checked) {
                next_flag += 1;
            }
            if (next_flag >= 2) {
                document.getElementById("next2").disabled = false;
                break;
            }
            console.log(next_flag);
        }
    }
}

function evaluation(k) {
    switch (k) {
        case 1:
            for (var i = 0; i < eval1.length; i++) {
                if (eval1[i].checked) {
                    scores1[n] = i + 1;
                }
            }
            break;
        case 2:
            for (var i = 0; i < eval2.length; i++) {
                if (eval2[i].checked) {
                    scores2[n] = i + 1;
                }
            }
            break;
    }
    setButton();
}
function evaluation_ori() {
    for (var i = 0; i < eval.length; i++) {
        if (eval[i].checked) {
            scores[n] = 1 + i;
        }
    }
    setButton();
}

function exportCSV() {
    var csvData = "";
    for (var i = 0; i < file_list.length; i++) {
        csvData += "" + file_list[i] + ","
            + scores1[i] + ","
            + scores2[i] + "\r\n";
    }

    const link = document.createElement("a");
    document.body.appendChild(link);
    link.style = "display:none";
    const blob = new Blob([csvData], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = outfile;
    link.click();
    window.URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);
}

function next() {
    n++;
    setAudio();
    evalCheck1();
    evalCheck2();
    setButton();
}

function prev() {
    n--;
    setAudio();
    evalCheck1();
    evalCheck2();
    setButton();
}

function finish() {
    exportCSV();
}


// --------- 設定 --------- //

// directory name
const wav_dir = "wav/";

// invalid enter key
document.onkeypress = invalid_enter();

//var natural;
var method1;
var method2;
var method3;
//var method4;
var outfile;
var file_list;
var scores1;
var scores2;
//var scores3;

// ローカルで行う場合はloadText()は動作しないため
var n = 0;
var eval1 = document.getElementsByName("eval1");
var eval2 = document.getElementsByName("eval2");
//var eval3 = document.getElementsByName("eval3");