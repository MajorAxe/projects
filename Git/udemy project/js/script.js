let money = +prompt("Ваш бюджет на месяц?", ""), 
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

let appData = {
    moneyData : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false 
}

for (let i = 0; i < 2; i++) {
    let answer1 = prompt("Введите обязательную статью расходов №" + (i+1) + " в этом месяце", ""),
        answer2 = prompt("Во сколько обойдется? " + (i+1), "");

    if ( typeof(answer1) === 'string' && typeof(answer1) != null && typeof(answer2) != null 
            && answer1 != "" && answer2 != "" && answer1.length < 50 && answer2.length < 50) {
                appData.expenses[answer1] = answer2;
    } else {
        i=-1;
    }
}

appData.moneyPerDay = appData.moneyData / 30;

alert("Ежедневный бюджет равен " + appData.moneyPerDay);