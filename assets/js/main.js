(function () {
  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorContainer = container.querySelector('.indicators');
  const indicators = indicatorContainer.querySelectorAll('.indicator');
  const pauseBtn = document.querySelector('#pause');
  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');
  
  let currentSlide = 0;
  let timerId = null;
  let isPlaying = true;
  let interval = 2000;
  let swipeStartX = null;
  let swipeEndX = null;
  
  const SLIDES_LENGTH = slides.length;
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';
  
  function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
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
  
  function indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      gotoNth(+target.getAttribute('data-slide-to'));
      pause();
    }
  }
  function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  }
  
  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }
  
  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX < -50 && prev();
    swipeStartX - swipeEndX > 50 && next();
  }
  
  function initListener() {
    pauseBtn.addEventListener('click', pausePlay);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    indicatorContainer.addEventListener('click', indicate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  }
  
  function init() {
    initListener();
    timerId = setInterval(gotoNext, interval);
  }
  
  init();
  
}());

