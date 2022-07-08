const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelectorAll('#pause');

let currentSlide = 0;
let isPlaying = true;
const slidesLength = slides.length;

function nextSlide() {
  slides[currentSlide].classList.toggle = 'active';
  currentSlide = (currentSlide + 1) % slidesLength;
  slides[currentSlide].classList.toggle = 'active';
}

function pauseHandler() {
if (isPlaying) {
  
}

}

setInterval(nextSlide, 2000);

pauseButton.addEventListener('click', pauseHandler);