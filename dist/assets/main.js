const counterInput = document.querySelector('#counter-input');
const counterIncrease = document.querySelector('#counter-increase');
const counterDecrease = document.querySelector('#counter-decrease');
const productPrice = document.querySelector('#product-price');
const copyIban = document.querySelector('#copy-iban');
const copyBik = document.querySelector('#copy-bik');
const copyUnp = document.querySelector('#copy-unp');
const iban = "BY10BAPB30128615600100000000";
const bik = 'BAPBBY2X';
const unp = "591672139";
let price = "";

// Counter on product page

if(productPrice){
    const rawText = productPrice.textContent;
    price = rawText ? parseInt(rawText, 10) : null;
}

if(counterInput){
    counterInput.addEventListener('input', () => {
        const quantity = parseInt(counterInput.value, 10);
        if(!isNaN(quantity) && quantity > 0){
            productPrice.innerText = quantity * price;
        }
    });
}

if(counterIncrease){
    counterIncrease.addEventListener("click", function stepUp (){
        if(counterInput.value <=100){
            counterInput.value++;
            productPrice.innerText = counterInput.value*price;
        }
    });
}

if(counterDecrease){
    counterDecrease.addEventListener("click", function stepDown (){
        if(counterInput.value >= 2){
            counterInput.value--;
            productPrice.innerText = counterInput.value*price;
        }
    });
}

// Copy to clipboard func

function initCopyButton(button, textToCopy) {
    if (!button) return;

    const copiedText = document.createElement('span');
    copiedText.textContent = 'Скопировано!';
    button.appendChild(copiedText);

    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);

            button.classList.add('copied');

            setTimeout(() => {
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Не удалось скопировать: ', err);
        }
    });
}

initCopyButton(copyIban, iban);
initCopyButton(copyBik, bik);
initCopyButton(copyUnp, unp);

// Redirect to form

document.addEventListener('DOMContentLoaded', () => {
    const formLinkSelector = '.js-scroll';
    const formId = 'main-form';
    const formLink = document.querySelectorAll(formLinkSelector);

    formLink.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetForm = document.getElementById(formId);

            if (targetForm) {
                // Форма есть на этой странице → отменяем переход и скроллим
                e.preventDefault();
                targetForm.scrollIntoView({ behavior: 'smooth' });
            }
            // Если формы нет — ничего не делаем, сработает обычный переход по href
        });
    });

    // Дополнительно: если мы уже на странице с формой и в URL есть #main-form
    if (window.location.hash === `#${formId}`) {
        const targetForm = document.getElementById(formId);
        if (targetForm) {
            // Скроллим плавно после загрузки
            setTimeout(() => {
                targetForm.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const button = dropdown.querySelector('.dropdown-button');

    button.addEventListener('click', () => {
        const isOpen = dropdown.classList.toggle('open');
        button.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            button.setAttribute('aria-expanded', 'false');
        }
    });
});
