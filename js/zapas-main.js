document.getElementById('add-to-cart').addEventListener('click', function() {
    alert('Producto agregado al carrito');
});

const images = ["../assets/J4-Green.webp", "../assets/J4-Green-2.webp", "../assets/J4-Green-3.webp"];
let currentIndex = 0;

function changeImage(imageSrc) {
    document.getElementById('displayed-image').src = imageSrc;
    currentIndex = images.indexOf(imageSrc);
}

function nextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    document.getElementById('displayed-image').src = images[currentIndex];
}