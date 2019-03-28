let money, time;

function start() {
    money = +prompt('Ваш бюджет на месяц?', '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}

start();

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: true, 
    chooseExpenses: function() {
        for (let i = 0; i < 2; i++) {
            let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
                b = prompt('Во сколько обойдется?', '');
    
            if ((typeof (a)) === 'string' &&
                (typeof (a)) != null && (typeof (b)) != null &&
                a != '' && b != '' && a.length < 50) {
                console.log('done');
                appData.expenses[a] = b;
            } else {
                i -= 1;
            }
        }
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed(2);
        alert('Ежедневный бюджет: ' + appData.moneyPerDay + ' руб');
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else if (appData.moneyPerDay >= 2000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('Произошла ошибка');
        }
    },
    checkSavings: function() {
        if (appData.savings === true) {
            let save = +prompt('Какова сумма накоплений'),
                percent = +prompt('под какой процент');
    
                appData.monthIncome = save / 100 / 12 * percent;
                alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
        }
    },
    chooseOptExpenses: function(){
        for (let i = 1; i <= 3; i++) {
            let opt = prompt('Статья необязательных расходов?', '');
                appData.optionalExpenses[i] = opt;
        }
    },
    chooseIncome: function() {
        let items = prompt('Что принесет дополнительный доход? (перечислите через запятую)', '');

        while ((typeof (items)) != 'string' ||
                (typeof (items)) === null ||
                items == '') {
                items = prompt('Что принесет дополнительный доход? (перечислите через запятую)', '');
                
        }
        console.log('done');
        appData.income = items.split(', ');
        appData.income.push(prompt('Может что-то еще?'));
        appData.income.sort();
        let message = 'Способы доп. заработка:\n';
        appData.income.forEach(function(item, index){
            message += '    ' + (index + 1) + ' - ' + item + ';\n';
        });
        alert(message);
    }
};

let message = 'Наша программа включает в себя данные:\n';
for (let key in appData) {
    message += '    ' + key + ';\n';
}
alert(message);