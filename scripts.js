const siteTitle = document.querySelector('.sitetitle');
const mainFlex = document.querySelector('.main-flex');
const mainContent = document.querySelector('.heros');
const signs = document.querySelector('.signs-hero');
const gates = document.querySelector('.gates-hero');
const railings = document.querySelector('.railings-hero');
let interval;

console.log(history.state);
history.pushState({ page: "home", name: "home" }, '');

import { productSlideshow } from "./modules/productSlideshow.js";

function goHome(init) {
    if (!init) {
        const pageForm = document.querySelector('.form-product');
        const formProductType = document.querySelector('.product-type');
        const productDiv = document.querySelector('.product');
        const productFlex = document.querySelector('.product-flex');
        mainFlex.removeChild(productDiv);
        mainFlex.appendChild(mainContent);
        pageForm.setAttribute('class', 'form-home');
        mainFlex.appendChild(pageForm);
        clearInterval(interval);
        history.pushState({ page: "home", name: "home" }, '', '/');
        console.log(history.state)
    }
}

function changePage(pageName) {
    let infoToFetch;
    switch (pageName) {
        case 'signs': infoToFetch = 'modules/signs.json';
            break;
        case 'railings': infoToFetch = 'modules/railings.json';
            break;
        case 'gates': infoToFetch = 'modules/gates.json';
    }
    const pageForm = document.querySelector('.form-home');
    const formProductType = document.querySelector('.product-type');

    const productFragment = new DocumentFragment();
    fetch(infoToFetch)
        .then((response) => response.json())
        .then((data) => {
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
            productText.appendChild(productPrice);
            productText.appendChild(productDescription);
            productDiv.appendChild(productText);
            productFragment.appendChild(productDiv);
            mainFlex.appendChild(productFragment);
            mainFlex.appendChild(pageForm);
            pageForm.setAttribute('class', 'form-product');
            mainFlex.removeChild(mainContent);
            interval = productSlideshow(data);
            history.pushState({ page: "product", name: pageName }, '', pageName);
            console.log(history.state);
        });
}

siteTitle.addEventListener('click', () => {
    event.preventDefault();
    goHome();
});

signs.addEventListener('click', () => {
    changePage('signs');
});
gates.addEventListener('click', () => {
    changePage('gates');
});
railings.addEventListener('click', () => {
    changePage('railings');
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
    //history.back();
}
);