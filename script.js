function navigate(page) {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = page;
  }, 260);
}

function goBack() {
  window.history.back();
}

function getActiveNavButton() {
  const path = window.location.pathname.split('/').pop();
  return document.querySelector(`.nav-button[data-page="${path || 'index.html'}"]`);
}

function activateNav() {
  const active = getActiveNavButton();
  document.querySelectorAll('.nav-button').forEach((btn) => btn.classList.remove('active'));
  if (active) {
    active.classList.add('active');
  }
}

function runCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animate = (entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.round(target / 100));

    const tick = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        observer.unobserve(counter);
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(tick);
    };
    tick();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(animate);
  }, { threshold: 0.55 });

  counters.forEach((counter) => observer.observe(counter));
}

function setupGalleryModal() {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-image');
  const closeButton = modal ? modal.querySelector('.modal-close') : null;

  if (!modal || !modalImg || !closeButton) return;

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-image');
      const alt = item.getAttribute('data-alt') || '';
      modalImg.src = src;
      modalImg.alt = alt;
      modal.classList.add('show');
    });
  });

  const closeModal = () => modal.classList.remove('show');

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
}

function handleContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill all fields before submitting.');
      return;
    }

    alert(
      `Thank you, ${name}!\nYour message has been received. We will reach out to you soon.`
    );
    form.reset();
  });
}

function setupScrollReveal() {
  const reveals = document.querySelectorAll('.card, .movie-card, .gallery-item, .detail-box, .award-card');
  
  reveals.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach(el => observer.observe(el));
}

function setupTilt() {
  const cards = document.querySelectorAll('.card, .movie-card, .gallery-item, .detail-box, .award-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

function initializePage() {
  document.body.classList.add('fade-in');
  activateNav();
  runCounters();
  setupGalleryModal();
  handleContactForm();
  setupScrollReveal();
  setupTilt();
}

window.addEventListener('DOMContentLoaded', initializePage);
