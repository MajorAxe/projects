let startProgramm = document.getElementById("start"), //кнопка "начать расчет"

//блоки со значениями
    budgetValue = document.getElementsByClassName("budget-value")[0],
    daybudgetValue = document.getElementsByClassName("daybudget-value")[0],
    dlevelValue = document.getElementsByClassName("dlevel-value")[0],
    budgetexpensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalexpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    monthsavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    yearsavingsValue = document.getElementsByClassName("yearsavings-value")[0],
//поля input
    expensesItem = document.getElementsByClassName("expenses-item"),

//кнопки
    expensesBtn = document.getElementsByClassName('expenses-item-btn')[0],
    buttonApprove1 = document.getElementsByTagName("button")[0],
    buttonApprove2 = document.getElementsByTagName("button")[1],
    buttonCalculate = document.getElementsByTagName("button")[2],

//поля ввода необязательных расходов
    optionalexpensesItem = document.querySelectorAll(".optionalexpenses-item"),
    optionalExpensesBtn = document.getElementsByClassName('optionalexpenses-btn')[0],

//расчет дневного бюджета
    countBudgetBtn = document.getElementsByClassName("count-budget-btn")[0],

//чекбокс и накопления
    checkbox = document.querySelector("#savings"),
    summa = document.getElementById("sum"),
    percent = document.getElementById("percent"),

//поле ввода "статьи возможного дохода"
    incomeV = document.getElementById('income'),
    income = document.querySelector("#savings"),

//поля с датой
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

let appData = {
    moneyData : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
};


startProgramm.addEventListener('click', function() { //начало программы, запрос даты и суммы бюджета
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) == true || money == null || money == "") { // isNaN проверяет является ли введенное значение НЕчислом
        money = +prompt("Ваш бюджет на месяц?", ""); // проверка на корректность введенного бюджета
    }
    appData.moneyData = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();
});

expensesBtn.addEventListener('click', function() { //введение обязательных расходов наименование : сумма
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let answer1 = expensesItem[i].value,
            answer2 = expensesItem[++i].value;
    
        if ( typeof(answer1) === 'string' && answer1 != null && answer2 != null  && answer1 != "" && answer2 != "" && answer1.length < 50 && answer2.length < 50) {
                    appData.expenses[answer1] = answer2;
                    sum += +answer2;
        } else {
            i = i - 1; // возвращение к предыдущему шагу, если не прошёл валидацию
        }
    }
    budgetexpensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() { // введение необязательных расходов
    for (let i = 0; i < optionalexpensesItem.length; i++) {
        let answer = optionalexpensesItem[i].value;
        appData.optionalExpenses[i] = answer;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
});

countBudgetBtn.addEventListener("click", function() {
    if (appData.moneyData != undefined) {
        appData.moneyPerDay = (appData.moneyData / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
    } else {
        daybudgetValue.textContent = 'Ошибка, поле "Доход" пустое!';
    }
});

incomeV.addEventListener('input', function() {
    let items = incomeV.value;
    appData.income = items.split(", "); // запись каждого значения между запятыми как отдельный элемент массива в виде строки
    incomeValue.textContent = appData.income;
});

checkbox.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

summa.addEventListener('input', function() {
    if (appData.savings == true) {
        let sumVal = +summa.value,
            percentVal = +percent.value;
        
        appData.monthIncome = sumVal/100/12*percentVal;
        appData.yearIncome = sumVal/100*percentVal;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sumVal = +summa.value,
            percentVal = +percent.value;
        
        appData.monthIncome = sumVal/100/12*percentVal;
        appData.yearIncome = sumVal/100*percentVal;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});