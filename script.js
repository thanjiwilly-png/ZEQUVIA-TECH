const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
    });

    if (!isOpen) {
      item.classList.add('active');
    }
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', () => {
    formStatus.textContent = 'Sending your inquiry...';
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll('.count-up');

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    const suffix = target >= 1000 ? 'K' : target >= 100 ? '%' : '+';
    counter.textContent = `${current}${suffix === '%' ? '%' : ''}`;
  }, 24);
};

counters.forEach((counter) => {
  const target = Number(counter.dataset.target || 0);
  if (target > 0) {
    animateCounter(counter);
  }
});
