// Slider
const wrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.slider-dots');

let index = 0;
let slideInterval = setInterval(nextSlide, 5000);

function showSlide(i) {
  wrapper.style.transform = 'translateX(' + (-i * 100) + '%)';
}

function updateDots() {
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
  updateDots();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
  updateDots();
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// Hamburger menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  const expanded = navLinks.classList.contains('show');
  menuToggle.setAttribute('aria-expanded', expanded);
});


// Dropdown toggle in mobile
const dropdownLinks = document.querySelectorAll('nav ul li.dropdown > a');

dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const parentLi = link.parentElement;
    parentLi.classList.toggle('active');
    const expanded = parentLi.classList.contains('active');
    link.setAttribute('aria-expanded', expanded);
  });
});

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  preloader.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

// Generate dots
slides.forEach((slide, i) => {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
    updateDots();
    resetInterval();
  });
  dotsContainer.appendChild(dot);
});

// Shadow on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 10) {
    header.classList.add('sticky-shadow');
  } else {
    header.classList.remove('sticky-shadow');
  }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');

// Cek preferensi user dari localStorage
let darkMode = localStorage.getItem('darkMode');

// Jika belum ada preferensi, cek preferensi sistem
if (darkMode === null) {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  }
} else if (darkMode === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Toggle manual
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

const darkModeIcon = document.getElementById('darkModeIcon');

function updateIcon() {
  if (document.body.classList.contains('dark-mode')) {
    darkModeIcon.textContent = '☀️';
  } else {
    darkModeIcon.textContent = '🌙';
  }
}

// Update icon saat toggle
darkModeToggle.addEventListener('click', () => {
  updateIcon();
});

// Set icon saat load
updateIcon();

let startX = 0;
let endX = 0;

wrapper.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
}, false);

wrapper.addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].clientX;
  handleGesture();
}, false);

function handleGesture() {
  if (endX < startX - 50) {
    nextSlide();
    resetInterval();
  }
  if (endX > startX + 50) {
    prevSlide();
    resetInterval();
  }
}
