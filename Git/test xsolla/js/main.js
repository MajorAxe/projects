//кнопки с цифрами
let btnNumber = document.querySelectorAll(".number"),
//операции
    equals = document.getElementById("equals"),
    btnOperations = document.querySelectorAll(".operations"),
//знаки
    btnSymbol = document.querySelectorAll(".symbol"),
    string = document.querySelector("#string"),

    result = 0;
//функция передачи содержимого кнопки в строку
function writeString(item) {
        string.value += item.textContent;
        string.focus();
}
//функция очистки строки
function clearString() {
    string.focus();
    return string.value = 0, result = 0;
}
//функция получения кода 
function getChar(event) {
    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which);
    }
    return null;
}
//функция вычисления + исключения
function showResult () {
    try {
        result = eval(string.value);
    } catch (err) {
        alert("Введены некорректные данные");
    }
    if (result == 'Infinity') {
        alert("Делить на ноль нельзя!");
        clearString();
    }
    string.value = String(result);
}
//навешивание событий
btnNumber.forEach(function (item) {
    item.addEventListener("click", function() {
        writeString(item);
    });
});
btnSymbol.forEach(function (item) {
    item.addEventListener("click", function() {
        writeString(item);
    });
});
btnOperations.forEach(function (item) {
    item.addEventListener("click", function() {
        writeString(item);
    });
});
btnOperations[5].addEventListener('click', function() {
    clearString();
});
equals.addEventListener('click', function() {
    showResult();
    string.focus();
});
addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
        showResult();
    }
});
//запрет ввода лишних символов
string.onkeypress = function(e) {

    e = e || event;

    let chr = getChar(e);
    if (chr == null) return;
    if (chr == '(' || chr == ')' || chr == '*' || chr == '/' || chr == '+' || chr == '-' || chr == '=' || chr == ',') {
        return true;
    } else if (chr < '0' || chr > '9') {
        return false;
    }
  };