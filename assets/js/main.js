const slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

let currentSlide = 0;
let timerId = null;
let isPlaying = true;
let interval = 2000;

const SLIDES_LENGTH = slides.length;

function gotoNth(n) {
  slides[currentSlide].classList.toggle('active');
  currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
  slides[currentSlide].classList.toggle('active');
}

function gotoPrev() {
  gotoNth(currentSlide - 1);
}

function gotoNext() {
  gotoNth(currentSlide + 1);
}



function pause() {
  clearInterval(timerId);
  isPlaying = false;
  pauseBtn.innerHTML = 'Play';
}

function play() {
  timerId = setInterval(gotoNext, interval);
  isPlaying = true;
  pauseBtn.innerHTML = 'Pause';
}

const pausePlay = () => isPlaying ? pause() : play();

function prev() {
  gotoPrev();
 pause();
}

function next() {
  gotoNext();
 pause();
}

pauseBtn.addEventListener('click', pausePlay);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

timerId = setInterval(gotoNext, interval);