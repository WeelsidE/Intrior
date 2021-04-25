'use strict'

//ШАПКА ===============================================================================

// Создаем переменную со всеми элементами
let header = document.querySelector('.header');
let menuLinks = document.querySelectorAll('.menu__link[data-goto]');


//При нажатии опускается до определенного контента
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
                const pageValue = document.querySelector('body').offsetHeight;

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


//Дейсвия 
let introScroll = document.querySelector('#web').offsetTop - 50;
let scrollPrev = 0;


window.addEventListener('scroll', function () {
    let scroll = document.window = pageYOffset;

// если scroll больше introScroll, то шапка затемняется
    if (scroll >= introScroll) {
        header.classList.add('_dark');
    } else {
        header.classList.remove('_dark');
    }

// Если scroll больше предыдущего scroll и больше introScroll , то шапка убирается
    if (scroll >= introScroll && scroll > scrollPrev) {
        header.classList.add('_out');
    } else {
        header.classList.remove('_out');
    }

//Для того, чтобы скролл сохранялся
    scrollPrev = scroll;
});




















//Модальные окна ===============================================================================
const modalLinks = document.querySelectorAll('.modal__link'); // Выбераем все ссылки, которые будут открывать модальные окна
const body = document.querySelector('body'); // Нужно для блокировки скролла
/* const lockPadding = document.querySelectorAll('.lock-padding'); */

let unlock = true; // Не было двойных нажатий

const timeout = 800;

// Делаем проверку , есть ли такие ссылки
if (modalLinks.length > 0) {
    for (let i = 0; i < modalLinks.length; i++) {
        const modalLink = modalLinks[i];
        
        modalLink.addEventListener('click', function (e) {
        // Берем значение href без #
            const modalName = modalLink.getAttribute('href').replace('#', '');
        // Сохраняем в переменную curentModal, которая равна modalName
            const curentModal = document.getElementById(modalName);

            modalOpen(curentModal); // запускаем функцию modalOpen
            
            e.preventDefault();
        });
    }
}


// Для закрытия модальных окон
const modalIconClose = document.querySelectorAll('.icon--close')

if (modalIconClose.length > 0) {
    for (let i = 0; i < modalIconClose.length; i++) {
        const el = modalIconClose[i];

        el.addEventListener('click', function (e) {
        // Отправляю в функцию modalIconClose объект, который является ближайший к родителю нажатого объекта
            modalClose(el.closest('.modal'));

            e.preventDefault();
        });
    }
}


// Функция открытия
// curentModal - люъект, который мы ранее передали
function modalOpen (curentModal) {
    // Делаем проверку есть ли у нас curentModal и открыта ли переменная unlock
    if (curentModal && unlock) {
    // Добавляем в переменную активное модальное окно
        const modalActive = document.querySelector('.modal._active');

    // Если есть открытое модальное окно
        if (modalActive) {
        // его закрывает
            modalClose(modalActive, false);
        } else {
        // нет - блокируем боди
            bodyLock();
        }

    // Добавляем класс _active
        curentModal.classList.add('_active');

        curentModal.addEventListener('click', function (e) {
        // Если modal__content не существует, то мы закрываем модально окно
        // То есть если мы нажимаем все, что выше по структуре modal__content, модально окно будет закрыто
            if (!e.target.closest('.modal__content')) {
                modalClose(e.target.closest('.modal'));
            }
        });
    }
}


// Функция блокировки скролла
function bodyLock () {
    body.classList.add('no-scroll');

// Нужно, чтобы не было повторных нажатий
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}



// Функция закрытия
function modalClose (modalActive, doUnlock = true) {
    if (unlock) {
        modalActive.classList.remove('_active');
    // Для того, есмли открывается другое модальное окно, то мы оставляем скрол в блокировки
        if (doUnlock) {
            bodyUnlock();
        }
    }
};


function bodyUnlock () {
    setTimeout(function () {
        body.classList.remove('no-scroll');
    });
}

// Закрытие модального окна при нажатии клавиши ESC
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const modalActive = document.querySelector('.modal._active');
        modalClose(modalActive);
    }
});
