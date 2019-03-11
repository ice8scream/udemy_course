let money = 0,
    time = 0;
money = parseInt(prompt("Ваш бюджет на месяц?"));
time  = prompt("Введите дату в формате YYYY-MM-DD");

let appData = {
    optionalExpenses: {},
    income: [],
    savings: false
};

appData.moneyData = money;
appData.timeData = time;

let ans1 = prompt("Введите обязательную статью расходов в этом месяце");
let ans2 = prompt("Во сколько обойдется?");
appData.expenses = {};
appData.expenses[ans1] = ans2;

alert("Ваш бюджет на 1 день: " + (appData.moneyData / 30) + " руб");

console.log(appData.expenses);