window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    let tabs = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
        
    tabContent.forEach( (item, index) => {
        if(index != 0){
            item.classList.add('hide');
        }else {
            item.classList.add('show');
        }
    });

    let tabsFade = (currenTab) => {
        tabContent.forEach( (item, index) => {
            if(index == currenTab){
                if(item.classList.contains('hide')){
                    item.classList.remove('hide');
                    item.classList.add('show');
                }
            } else {
                if(item.classList.contains('show')){
                    item.classList.remove('show');
                    item.classList.add('hide');
                }

            }
        });
    }

    let getCurrentTab = (element) =>{
        let currenTab;
        for(currenTab = 0; currenTab < tabs.length; currenTab++){
            if(tabs[currenTab] === element){
                break;
            }
        }
        tabsFade(currenTab);
    }

    info.addEventListener('click', (event) => {
        if(event.target.classList.contains('info-header-tab')){
            getCurrentTab(event.target);
        }  
    });

    //Timer

    let deadline = '2019-03-31';

    let getTimeRemaining = (endtime = new Date()) => {
        let dateDiffirent = Date.parse(endtime) - Date.parse(new Date());
        if (dateDiffirent <= 0) {
            return {
                'total': 0,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            };
        }
        let seconds = Math.floor((dateDiffirent / 1000) % 60),
            minutes = Math.floor((dateDiffirent / (1000 * 60)) % 60),
            hours = Math.floor((dateDiffirent / (1000 * 60 * 60)));

        return {
            'total': dateDiffirent,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    let setClock = (id = 'timer', endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(() => {
                let t = getTimeRemaining(endtime);
                hours.textContent = t.hours < 10 ? `0${t.hours}`: t.hours;
                minutes.textContent = t.minutes < 10 ? `0${t.minutes}` : t.minutes;
                seconds.textContent = t.seconds < 10 ? `0${t.seconds}` : t.seconds;
    
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }, 1000);


    }

    setClock('timer', deadline);

    // Modal window

    let pressedButton;

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    let showOverlay = (event) => {
        if(!event.target.classList.contains('description-btn') && !event.target.classList.contains('more')) return;
        overlay.style.display = 'block';
        event.target.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
        pressedButton = event.target;       
    }

    more.addEventListener('click', showOverlay);

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        pressedButton.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let contentInfo = document.querySelector('.info');

    contentInfo.addEventListener('click', showOverlay);

    //    let option = new Options();
    //    option.createDiv();
    //    console.log(option);

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        contactsForm = document.querySelector('#form');

    statusMessage.classList.add('status');

    function serverRequest(event) {
        if(event.target != form && event.target != contactsForm) return;
        event.preventDefault();
        event.target.appendChild(statusMessage);
        let formData = new FormData(event.target);
        let obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        function postData(data) {

            return new Promise(function(resolve, reject){
                let request = new XMLHttpRequest();
                request.open('POST', 'http://localhost/task-14/server.php');
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                request.addEventListener('readystatechange', function () {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4) {
                        if (request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                });

                request.send(data);
            });
        }
        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postData(json)
            .then(()=> statusMessage.innerHTML = message.loading)
            .then(()=> statusMessage.innerHTML = message.success)
            .catch(()=> statusMessage.innerHTML = message.failure)
            .then(clearInput);
    }

    form.addEventListener('submit', serverRequest);
    contactsForm.addEventListener('submit', serverRequest);


    //Slider

    let slideIndex = 4,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        slideIndex = (n + 4) % 4;

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('dot-active');
    }

    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(n);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });
    next.addEventListener('click', function(){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for(let i=0; i < dots.length; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i]){
                currentSlide(i);
            }
        }
    });

    //Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum =0,
        daysSum = 0,
        total =0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = + this.value;
            total = (daysSum + personsSum)* 4000;

            if(restDays.value != '' && this.value != ''){
                totalValue.innerHTML = total;
            }else {
                
                totalValue.innerHTML = 0;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = + this.value;
            total = (daysSum + personsSum)* 4000;

            if(persons.value != '' && this.value != ''){
                totalValue.innerHTML = total;
            }else {
                
                totalValue.innerHTML = 0;
            }
        });

        place.addEventListener('change', function() {
            if(persons.value != '' && this.value != ''){
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }else {
                totalValue.innerHTML = 0;
            }
        });
});