// получение курсов валют
let cources = null;
fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
    .then(response => response.json())
    .then(data => {
        cources = data.usd;
    })
    .catch(error => error('Ошибка при получении курсов валют:', error));

document.getElementById('main-action-button').onclick = function () {
    document.getElementById('main-action-button').scrollIntoView({behavior: 'smooth'});
}

const links = document.querySelectorAll(".menu-item > a ");

for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute('data-link')).scrollIntoView({behavior: 'smooth'});
    }
}

const buttons = document.querySelectorAll(".products-item .button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementById('order').scrollIntoView({behavior: 'smooth'});
    }
}


const prices = document.getElementsByClassName('products-item-price');
document.getElementById('change-currency').onclick = function (e) {
    const currentCurrency = e.target.innerText

    let newCurrency = '$'
    let coefficient = 1
    if (currentCurrency === '$') {
        newCurrency = '₽';
        coefficient = cources.rub;
        //coefficient = 91.04603509;
    } else if (currentCurrency === '₽') {
        newCurrency = 'BYN';
        coefficient = cources.byn;
        //coefficient = 3.23997677;
    } else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = cources.eur;
        //coefficient = 0.92635132;
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = cources.cny;
        //coefficient = 7.21908235;
    }


    e.target.innerText = newCurrency;

    for (let i = 0; i < prices.length; i++) {
        //prices[i].innerText = prices[i].getAttribute('data-base-price') * coefficient.toFixed(1) + " " + newCurrency;
        let price = parseFloat(prices[i].getAttribute('data-base-price')) * coefficient;
        prices[i].innerText = price.toFixed(1) + " " + newCurrency;
    }
}


const product = document.getElementById('product');
const name = document.getElementById('name');
const phone = document.getElementById('phone');

document.getElementById('order-action').onclick = function () {
    let hasError = false;

    [product, name, phone].forEach((item) => {
        if (!item.value) {
            item.style.borderColor = "red";
            hasError = true;
        } else {
            item.style.borderColor = "";
        }
    });

    if (!hasError) {
        [product, name, phone].forEach((item) => {
            item.value = "";
        });
        alert('Спасибо за заказ! Мы скоро свяжемся с вами!')
    }
}