const mainFlex = document.querySelector('.main-flex');
const mainContent = document.querySelector('.heros');
const formProductType = document.querySelector('.product-type');
const siteTitle = document.querySelector('.sitetitle');
const railings = document.querySelector('.railings-hero');
const gates = document.querySelector('.gates-hero');
const signs = document.querySelector('.signs-hero');

console.log(history.state);
history.pushState({page: "home", name: "home"}, '');

function goHome() {
    const pageForm = document.querySelector('.form-product');
    const productDiv = document.querySelector('.product');
    const productFlex = document.querySelector('.product-flex');
    mainFlex.removeChild(productDiv);
    mainFlex.appendChild(mainContent);
    pageForm.setAttribute('class', 'form-home');
    mainFlex.appendChild(pageForm);
    history.pushState({page: "home", name: "home"}, '');
    console.log(history.state)
}

function productSlideshow(data) {
    let index = 0;
    const productImage = document.querySelector('#product-image');
    productImage.addEventListener('transitionend', () => {
        productImage.removeAttribute('class');
    })
    setInterval(() => {
        productImage.setAttribute('class', 'transition');
        setTimeout(() => {
            index++;
            if (index === data.images.length) {
                index = 0;
            }
            productImage.src = data.images[index];
        }, 500);
    }, 7500);
    
}

function changePage(pageName) {
    let infoToFetch;
    switch (pageName) {
        case 'signs': infoToFetch = 'signs.json';
        break;
        case 'railings': infoToFetch = 'railings.json';
        break;
        case 'gates': infoToFetch = 'gates.json';
    }
    const pageForm = document.querySelector('.form-home');
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
            productSlideshow(data);
            history.pushState({page: "product", name: pageName}, '', pageName);
            console.log(history.state);
        });
}

siteTitle.addEventListener('click', () => {
    event.preventDefault();
    goHome();
})
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
        switch(e.state.page) {
            case "product": changePage(e.state.name);
            break;
            case "home": goHome();
            break;
        }
    }
    history.back();
}
);