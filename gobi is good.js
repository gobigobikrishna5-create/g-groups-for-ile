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
  const closeButton = modal?.querySelector('.modal-close');

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

function initializePage() {
  document.body.classList.add('fade-in');
  activateNav();
  runCounters();
  setupGalleryModal();
  handleContactForm();
}

window.addEventListener('DOMContentLoaded', initializePage);
