document.addEventListener('DOMContentLoaded', () => {
    // ================= Desktop dropdown =================
    const desktopDropdowns = document.querySelectorAll('.desktop-nav .dropdown');
    desktopDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const arrow = dropdown.querySelector('.arrow');

        toggle.addEventListener('click', (e) => {
            e.preventDefault();

            // Close all other dropdowns first (optional)
            desktopDropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('open');
                    const dArrow = d.querySelector('.arrow');
                    dArrow.classList.remove('up');
                    dArrow.classList.add('down');
                }
            });

            // Toggle this dropdown
            dropdown.classList.toggle('open');
            arrow.classList.toggle('up');
            arrow.classList.toggle('down');
        });
    });

    // Close dropdown when clicking a link inside
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const dropdown = link.closest('.dropdown');
            const arrow = dropdown.querySelector('.arrow');
            dropdown.classList.remove('open');
            arrow.classList.remove('up');
            arrow.classList.add('down');
        });
    });

    // Optional: Close dropdown if clicking outside
    document.addEventListener('click', (e) => {
        desktopDropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                const arrow = dropdown.querySelector('.arrow');
                arrow.classList.remove('up');
                arrow.classList.add('down');
            }
        });
    });

    // ================= Mobile menu =================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ================= Mobile dropdown =================
    const mobileDropdowns = document.querySelectorAll('.mobile-menu .dropdown');
    mobileDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('open');
        });
    });
});






// ----- Scroll Spy -----
const fadeItems = document.querySelectorAll('.fade-item');

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function animateOnScroll() {
    fadeItems.forEach((item) => {
        if (isInViewport(item)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();






//----------------menu automatically active---------------


document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".desktop-nav a[href^='#'], .mobile-menu a[href^='#']");

  function activateMenu() {
    let scrollY = window.pageYOffset;
    let windowHeight = window.innerHeight;
    let documentHeight = document.body.scrollHeight;
    let reachedBottom = scrollY + windowHeight >= documentHeight - 5;

    let activeSet = false;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
            activeSet = true;
          }
        });
      }
    });

    // If no section matched and we're at the bottom, activate #contact
    if (!activeSet && reachedBottom) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#contact") {
          link.classList.add("active");
        }
      });
    }
  }

  // ✅ Activate menu on page load
  activateMenu();

  // ✅ Activate menu on scroll
  window.addEventListener("scroll", activateMenu);
});
