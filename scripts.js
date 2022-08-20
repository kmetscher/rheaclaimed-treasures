const siteTitle = document.querySelector('.sitetitle');
const mainFlex = document.querySelector('.main-flex');
const mainContent = document.querySelector('.heros');
const signs = document.querySelector('.signs-hero');
const gates = document.querySelector('.gates-hero');
const railings = document.querySelector('.railings-hero');
const productType = document.getElementById('type');
const submit = document.querySelector('.buy-me');
const loader = document.querySelector('.loader');
let interval;

history.pushState({ page: "home", name: "home" }, '');

import { productSlideshow } from "./modules/productSlideshow.js";
import {handleSubmit} from "./modules/handleSubmit.js";

function goHome() {
    const pageForm = document.querySelector('.form');
    const productDiv = document.querySelector('.product');
    const productFlex = document.querySelector('.product-flex');
    productType.value = "Choose one";
    mainFlex.removeChild(productDiv);
    mainFlex.appendChild(mainContent);
    mainFlex.appendChild(pageForm);
    clearInterval(interval);
    history.pushState({ page: "home", name: "home" }, '', '/');
    console.log(history.state)
}

function changePage(pageName) {
    loader.setAttribute('class', 'loader-active');
    let infoToFetch;
    switch (pageName) {
        case 'signs': infoToFetch = 'modules/signs.json';
            break;
        case 'railings': infoToFetch = 'modules/railings.json';
            break;
        case 'gates': infoToFetch = 'modules/gates.json';
    }
    const pageForm = document.querySelector('.form');

    const productFragment = new DocumentFragment();
    fetch(infoToFetch)
        .then((response) => response.json())
        .then((data) => {
            loader.setAttribute('class', 'loader');
            let productDiv = document.createElement('div');
            productDiv.setAttribute('class', 'product');
            let productVisual = document.createElement('div');
            productVisual.setAttribute('class', 'product-visual');
            let productImage = document.createElement('img');
            productImage.setAttribute('id', 'product-image');
            productImage.src = data.image;
            productVisual.appendChild(productImage);
            productDiv.appendChild(productVisual);
            let productText = document.createElement('div');
            productText.setAttribute('class', 'product-text');
            let productHeader = document.createElement('h2');
            productHeader.textContent = data.name;
            let productPrice = document.createElement('h3');
            productPrice.textContent = data.price;
            let productDescription = document.createElement('p');
            productDescription.textContent = data.description;
            productText.appendChild(productHeader);
            productText.appendChild(productDescription);
            productDiv.appendChild(productText);
            let productThumbs = document.createElement('div');
            productThumbs.setAttribute('class', 'product-thumbs');
            productDiv.appendChild(productThumbs);
            productFragment.appendChild(productDiv);
            mainFlex.appendChild(productFragment);
            mainFlex.appendChild(pageForm);
            mainFlex.removeChild(mainContent);
            interval = productSlideshow(data);
            history.pushState({ page: "product", name: pageName }, '', pageName);
            console.log(history.state);
        });
}

siteTitle.addEventListener('click', (e) => {
    e.preventDefault();
    goHome();
});

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.getElementById('quote-form');
    handleSubmit(form);
})

signs.addEventListener('click', () => {
    changePage('signs');
    productType.value = "sign";
});
gates.addEventListener('click', () => {
    changePage('gates');
    productType.value = "gate";
});
railings.addEventListener('click', () => {
    changePage('railings');
    productType.value = "railing";
});

window.addEventListener('popstate', (e) => {
    if (e.state) {
        switch (e.state.page) {
            case "product": changePage(e.state.name);
                break;
            case "home": goHome();
                break;
        }
    }
}
);