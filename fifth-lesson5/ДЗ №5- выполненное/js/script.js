let menu = document.querySelector('.menu');
    menuItems = document.getElementsByClassName('menu-item');
menuItems[1].textContent = 'Второй пункт';
menuItems[2].textContent = 'Третий пункт';
fifthPunckt = document.createElement('li');
fifthPunckt.classList.add('menu-item');
fifthPunckt.textContent = 'пятый пункт';
menu.append(fifthPunckt);
document.body.style.backgroundImage = 'url(img/apple_true.jpg)';
document.getElementById('title').innerText = 'Мы продаем только подлинную технику Apple';

let secondColumn = document.querySelectorAll('.column')[1];
secondColumn.removeChild(document.querySelector('.adv'));
let message = '';
setTimeout(function(){
    message = prompt('напишите ваше отношение к технике apple');
    document.getElementById('prompt').innerText = message || 'Вы ничего не ввели';
}, 100);
