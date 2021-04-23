/* 'use strict'

МОДАЛЬНОЕ ОКНО
const modalLinks = document.querySelector('.modal__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock_padding');

let unlock = true;

const timeout = 800;


if (modalLinks.length > 0) {
    for (let i = 0; i < modalLinks.length; i++) {
        const modalLink = modalLinks[i];

        modalLink.addEventListener('click', function (e) {
            const modalName = modalLink.getAttribute('href').replace('#', '');
            const currentModal = document.getElementById(modalName);

            console.log(modalName);

            modalOpen();

            e.preventDefault();
        });
    }
}

function modalOpen (currentModal) {
    if (curentModal && unlock) {
        const modalActive = document.querySelector('.modal._active');

        if (modalActive) {
            modalClose(modalActive, false)
        } else {
            bodyLock();
        }
    }
}

function modalClose () {

}

function bodyLock () {

} */



//ШАПКА

// Создаем переменную со всеми элементами
let header = document.querySelector('.header');
let menuLinks = document.querySelectorAll('.menu__link[data-goto]');


//Делаем проверку
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', function (e) {
        // Нужно получить куда кликает пользователь
            const menuLink = e.target;

        //Нужно проверить заполнен ли дата атребут
        //Существует ли объект на который ссылается меню
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            //Получаем в константу сам объект
                const gotoBlock = document.querySelector(menuLink.dataset.goto);

            //Далее высчитываем положение объекта(Точное положения)
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - header.offsetHeight;

            //Плавная прокрутка
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
            }  

            e.preventDefault();
        });
    });
}

