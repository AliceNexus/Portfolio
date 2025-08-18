let currentBanner = 0;
const banners = document.querySelectorAll('.banner');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function slideTo(index, direction) {
  if (index === currentBanner) return;

  const current = banners[currentBanner];
  const next = banners[index];

  // Prepare the incoming slide
  next.style.transition = 'none';
  next.style.transform = `translateX(${direction === 'next' ? '100%' : '-100%'})`;

  requestAnimationFrame(() => {
    next.style.transition = 'transform 0.5s ease-in-out';
    current.style.transition = 'transform 0.5s ease-in-out';

    current.style.transform = `translateX(${direction === 'next' ? '-100%' : '100%'})`;
    next.style.transform = 'translateX(0)';
  });

  dots[currentBanner].classList.remove('active');
  dots[index].classList.add('active');

  setTimeout(() => {
    current.classList.remove('active');
    next.classList.add('active');
    current.style.transition = 'none';
    current.style.transform = 'translateX(100%)';
    currentBanner = index;
  }, 500);
}

prevBtn.addEventListener('click', () => {
  const newIndex = (currentBanner - 1 + banners.length) % banners.length;
  slideTo(newIndex, 'prev');
});

nextBtn.addEventListener('click', () => {
  const newIndex = (currentBanner + 1) % banners.length;
  slideTo(newIndex, 'next');
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const direction = index > currentBanner ? 'next' : 'prev';
    slideTo(index, direction);
  });
});

// Homes carousel
const homesCarousel = document.getElementById('homesCarousel');
const homesPrevBtn = document.getElementById('homesPrevBtn');
const homesNextBtn = document.getElementById('homesNextBtn');
const homesIndicatorFill = document.getElementById('homesIndicatorFill');
const homesTiles = homesCarousel.querySelectorAll('.homes-tile');

let homesCurrentIndex = 0;

function updateHomesButtons() {
  homesPrevBtn.disabled = homesCurrentIndex <= 0;
  homesNextBtn.disabled = homesCurrentIndex >= homesTiles.length - 1;
}

function updateHomesIndicator() {
  const scrollPercentage = homesCarousel.scrollLeft / (homesCarousel.scrollWidth - homesCarousel.clientWidth);
  homesIndicatorFill.style.transform = `translateX(${scrollPercentage * 100}%)`;
}

function scrollToCard(index) {
  const card = homesTiles[index];
  const cardRect = card.getBoundingClientRect();
  const carouselRect = homesCarousel.getBoundingClientRect();

  const offset = (cardRect.left - carouselRect.left) - (homesCarousel.clientWidth / 2 - cardRect.width / 2);
  homesCarousel.scrollBy({ left: offset, behavior: 'smooth' });
  homesCurrentIndex = index;
  updateHomesButtons();
  updateHomesIndicator();
}

homesNextBtn.addEventListener('click', () => {
  if (homesCurrentIndex < homesTiles.length - 1) {
    homesCurrentIndex++;
    scrollToCard(homesCurrentIndex);
  }
});

homesPrevBtn.addEventListener('click', () => {
  if (homesCurrentIndex > 0) {
    homesCurrentIndex--;
    scrollToCard(homesCurrentIndex);
  }
});

homesCarousel.addEventListener('scroll', () => {
  updateHomesIndicator();
});

updateHomesButtons();
updateHomesIndicator();
scrollToCard(0); // ✅ Center the first card on load

// WCUS Section Scroll pause
const wcusSection = document.getElementById('wcus-section');
const wcusScroll = document.getElementById('wcus-scroll');

wcusSection.addEventListener('mouseenter', () => {
  wcusScroll.style.animationPlayState = 'paused';
});
wcusSection.addEventListener('mouseleave', () => {
  wcusScroll.style.animationPlayState = 'running';
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.icon');
    const isOpen = answer.classList.contains('open');

    if (isOpen) {
      answer.classList.remove('open');
      icon.textContent = '+';
    } else {
      document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
        openAnswer.classList.remove('open');
        openAnswer.previousElementSibling.querySelector('.icon').textContent = '+';
      });

      answer.classList.add('open');
      icon.textContent = '−';
    }
  });
});

// Pincode toggle
const pincodeLabel = document.querySelector('.pincode-label');
const pincodeInput = document.querySelector('.pincode-input');
pincodeLabel.addEventListener('click', () => {
  pincodeInput.parentElement.classList.toggle('active');
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const hamburgerIcon = hamburger.querySelector('i');
const mobileNav = document.getElementById('mobile-nav');
const closeMenu = document.getElementById('closeMenu');

function resetHamburgerIcon() {
  hamburgerIcon.classList.remove('fa-xmark');
  hamburgerIcon.classList.add('fa-bars');
  hamburger.style.display = 'block';
}

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('active');

  if (mobileNav.classList.contains('active')) {
    hamburger.style.display = 'none';
  }

  if (!mobileNav.classList.contains('active')) {
    document.querySelectorAll('.submenu').forEach(sub => sub.classList.remove('active'));
    resetHamburgerIcon();
  }
});

closeMenu.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  resetHamburgerIcon();
});

document.querySelectorAll('.mobile-menu > ul > li').forEach(item => {
  const arrow = item.querySelector('.arrow');
  const submenu = item.querySelector('.submenu');
  arrow.addEventListener('click', (e) => {
    e.stopPropagation();
    submenu.classList.toggle('active');
  });
});

document.querySelectorAll('.close-menu').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    resetHamburgerIcon();
  });
});

mobileNav.addEventListener('click', (e) => {
  if (!e.target.closest('.mobile-menu')) {
    mobileNav.classList.remove('active');
    resetHamburgerIcon();
  }
});
