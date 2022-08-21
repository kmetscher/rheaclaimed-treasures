export function productSlideshow(data) {
    let index = 0;
    let prevThumb;
    let prevIndex;
    const productImage = document.querySelector('#product-image');
    const productThumbsDiv = document.querySelector('.product-thumbs');

    data.images.map((image, imgIndex) => {
        let thumb = document.createElement('img');
        thumb.src = data.images[imgIndex];
        thumb.setAttribute('id', imgIndex);
        thumb.addEventListener('click', () => {
            currentThumb.removeAttribute('class');
            currentThumb = document.getElementById(imgIndex);
            currentThumb.setAttribute('class', 'current');
            productImage.src = data.images[imgIndex];
            index = imgIndex;
        });
        productThumbsDiv.appendChild(thumb);
    });

    let currentThumb = document.getElementById('0');
    currentThumb.setAttribute('class', 'current');

    productImage.addEventListener('transitionend', () => {
        productImage.src = data.images[index];
        productImage.removeAttribute('class');
        currentThumb = document.getElementById(index);
        currentThumb.setAttribute('class', 'current');
    });

    const interval = setInterval(() => {
        productImage.setAttribute('class', 'transition');
            index++;
            if (index === data.images.length) {
                index = 0;
            }
            prevIndex = index - 1;
            if (prevIndex < 0) {prevIndex = data.images.length - 1}
            prevThumb = document.getElementById(prevIndex);
            prevThumb.removeAttribute('class');
    }, 7500);
    return interval;
}