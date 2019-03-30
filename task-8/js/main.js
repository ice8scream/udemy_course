let startCalculatingButton = document.getElementById('start'),
    values = document.querySelectorAll( "div[class$='-value']" ),
    importantExpenses = document.getElementsByClassName( 'expenses-item' ),
    importantExpensesConfirmButton = document.getElementsByTagName('button')[0],
    optionalExpensesConfirmButton = document.getElementsByTagName('button')[1],
    calculateButton = document.getElementsByTagName('button')[2],
    optionalExpenses = document.querySelectorAll( '.optionalexpenses-item' ),
    articalsOfPosibleIncomes = document.querySelector('#income'),
    checkbox = document.querySelector('input[type="checkbox"]'),
    summ = document.querySelector('input[id="sum"]'),
    percent = document.querySelector('input[id="percent"]'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');


let time, money;



startCalculatingButton.addEventListener('click', function() {
    appData.isStart = true;
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');
    while(isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData  = time;
    values[0].textContent = money;
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDay() + 1;
});

importantExpensesConfirmButton.addEventListener('click', function(){
    if(!appData.isStart) return;
    let summ = 0;

    for (let i = 0; i < importantExpenses.length; i++) {

        let a = importantExpenses[i].value || '',
            b = importantExpenses[++i].value || 0;

        if ((typeof (a)) === 'string' &&
            (typeof (a)) != null && (typeof (b)) != null &&
            a != '' && b != '' && a.length < 50) {
            console.log('done');
            appData.expenses[a] = b;
            summ += +b;
        } 
    }
    values[3].textContent = summ;
    appData.expensesSum = summ;
});

optionalExpensesConfirmButton.addEventListener('click', function(){
    if(!appData.isStart) return;
    for (let i = 0; i < optionalExpenses.length; i++) {
        let opt = optionalExpenses[i].value;
        appData.optionalExpenses[i] = opt;
        values[4].textContent += opt + ' '; 
    }
});

calculateButton.addEventListener('click', function(){
    if(!appData.isStart) return;
    if(appData.budget == undefined){
        values[2].textContent = 'Произошла ошибка';
        return;
    } 

    appData.moneyPerDay = ((appData.budget - appData.expensesSum) / 30 ).toFixed(2);
    values[1].textContent = appData.moneyPerDay;

    let message ='';
    if (appData.moneyPerDay < 100) {
        message = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
        message ='Средний уровень достатка';
    } else if (appData.moneyPerDay >= 2000) {
        message = 'Высокий уровень достатка';
    } else {
        message = 'Произошла ошибка';
    }
    values[2].textContent = message;
});

articalsOfPosibleIncomes.addEventListener('input', function(){
    let items = articalsOfPosibleIncomes.value;
    appData.income = items.split(', ');
    values[5].textContent = appData.income;
});

checkbox.addEventListener('click', function() {
    if(!appData.isStart) return;
    appData.savings = !appData.savings;
});

summ.addEventListener('input', function(){
    if (appData.savings == true){
        let sum = +summ.value,
            perc = +percent.value;

            appData.monthIncome = sum / 100 / 12 * perc;
            appData.yearIncome = sum / 100  * perc;

            values[6].textContent = appData.monthIncome.toFixed(1);
            values[7].textContent = appData.yearIncome.toFixed(1);
    }
});

percent.addEventListener('input', function(){
    if (appData.savings == true){
        let sum = +summ.value,
        perc = +percent.value;

        appData.monthIncome = sum / 100 / 12 * perc;
        appData.yearIncome = sum / 100  * perc;

        values[6].textContent = appData.monthIncome.toFixed(1);
        values[7].textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    expenses: {},
    expensesSum: 0, 
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
    isStart: false
};



let message = 'Наша программа включает в себя данные:\n';
for (let key in appData) {
    message += '    ' + key + ';\n';
}
//alert(message);