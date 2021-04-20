'use strict'

document.querySelector('#btn').addEventListener('click', function (e) {
    let modal = document.querySelector('.modal');

    modal.classList.add('_active');

    e.preventDefault();
});

document.querySelector('#icon_close').addEventListener('click', function (e) {
    let modal = document.querySelector('.modal');

    modal.classList.remove('_active');

    e.preventDefault();
});