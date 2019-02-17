//кнопки с цифрами
    let btnNumber = document.querySelectorAll(".number"),

//операции
    equals = document.getElementById("equals"),
    btnOperations = document.querySelectorAll(".operations"),
    
//знаки
    btnSymbol = document.querySelectorAll(".symbol"),

    result = 0;
    string = document.querySelector("#string");

//события на кнопки
function writeString(item) {
        string.value += item.textContent;
        string.focus();
}

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

//функция очистки строки
function clearString() {
    string.focus();
    return string.value = 0, result = 0;
}
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

function getChar(event) {
    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which);
    }
    return null;
}

//вычисление
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

equals.addEventListener('click', function() {
    showResult();
    string.focus();
});

addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
        showResult();
    }
});