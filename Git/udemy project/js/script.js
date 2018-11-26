let money, time;

function start () { // ввод начальных данных
    money = +prompt("Ваш бюджет на месяц?", "");
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) == true || money == null || money == "") { // isNaN проверяет является ли введенное значение НЕчислом
        money = +prompt("Ваш бюджет на месяц?", ""); // проверка на корректность введенного бюджета
    }
}

start();

let appData = {
    moneyData : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false 
}

function chooseExspenses () { // введение обязательных расходов
    for (let i = 0; i < 2; i++) {
        let answer1 = prompt("Введите обязательную статью расходов №" + (i+1) + " в этом месяце", ""),
            answer2 = prompt("Во сколько обойдется? " + (i+1), "");
    
        if ( typeof(answer1) === 'string' && answer1 != null && answer2 != null 
                && answer1 != "" && answer2 != "" && answer1.length < 50 && answer2.length < 50) {
                    appData.expenses[answer1] = answer2;
        } else {
            i-=1; // возвращение к предыдущему шагу, если не прошёл валидацию
        }
    }
}

chooseExspenses();

function chooseOptExpenses () { // введение необязательных расходов
    for (let i = 0; i < 3; i++) {
        let answer1 = prompt("Введите необязательную статью расходов №" + (i+1) + " в этом месяце", ""),
            answer2 = prompt("Во сколько обойдется? " + (i+1), "");

        if ( typeof(answer1) === 'string' && answer1 != null && answer2 != null 
            && answer1 != "" && answer2 != "" && answer1.length < 50 && answer2.length < 50) {
                appData.optionalExpenses[answer1] = answer2;
        } else {
        i-=1
        }
    }
}

function detectDayBudget () { // расчет дневного бюджета
    appData.moneyPerDay = (appData.moneyData / 30).toFixed(); // tiFixed() округляет выведенное число до целого
    alert("Ежедневный бюджет равен " + appData.moneyPerDay);
}

detectDayBudget();

function checkSavings() { // расчет дохода по депозиту
    if (appData == true) {
        let save = +prompt("Какова сумма накоплений?"),
            percent = +prompt("Под какой процент?");

        appData.monthIncome = save/100/12*percent;
        alert("Ваша сумма на коплений по депозиту: " + appData.monthIncome);
    }
}

checkSavings();