//поменять местами элементы
let first = document.getElementsByClassName('menu-item')[1];
let last = document.getElementsByClassName('menu-item')[2];

document.getElementsByClassName('menu')[0].insertBefore(last, first);

//удаление рекламы
let del = document.getElementsByClassName('adv')[0];
del.remove();

//изменение фона
document.body.style.background = 'url(img/apple_true.jpg) center no-repeat';

//Изменение заголовка
document.getElementById('title').textContent = 'Мы продаем только подлинную технику Apple';


let ans = prompt("Как относишься к Яблоку?", "");
document.getElementById('prompt').textContent = ans;