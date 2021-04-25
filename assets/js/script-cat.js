'use strict'

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
