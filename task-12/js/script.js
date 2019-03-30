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

   let option = new Options();
   option.createDiv();
   console.log(option);
});