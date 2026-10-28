// 首屏轮播交互：支持定时播放、按钮切换与圆点跳转。
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const currentSlideLabel = document.querySelector("#current-slide");
const previousButton = document.querySelector("#previous-slide");
const nextButton = document.querySelector("#next-slide");
const hero = document.querySelector(".hero");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeSlideIndex = 0;
let autoplayTimer;

function showSlide(index) {
  activeSlideIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlideIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlideIndex;
    dot.classList.toggle("is-active", isActive);
    if (isActive) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });

  currentSlideLabel.textContent = String(activeSlideIndex + 1).padStart(2, "0");
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
}

function startAutoplay() {
  stopAutoplay();
  if (!reduceMotion.matches) {
    autoplayTimer = window.setInterval(() => showSlide(activeSlideIndex + 1), 6000);
  }
}

previousButton.addEventListener("click", () => {
  showSlide(activeSlideIndex - 1);
  startAutoplay();
});

nextButton.addEventListener("click", () => {
  showSlide(activeSlideIndex + 1);
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startAutoplay();
  });
});

hero.addEventListener("mouseenter", stopAutoplay);
hero.addEventListener("mouseleave", startAutoplay);
hero.addEventListener("focusin", stopAutoplay);
hero.addEventListener("focusout", startAutoplay);
reduceMotion.addEventListener("change", startAutoplay);

startAutoplay();
