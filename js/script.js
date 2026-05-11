/* =====================
   HEADER SCROLL
   ===================== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* =====================
   HAMBURGER MENU
   ===================== */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* =====================
   RESULTS FILTER
   ===================== */
const filterBtns = document.querySelectorAll('.filter__btn');
const resultCards = document.querySelectorAll('.result__card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    resultCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* =====================
   CONTACT FORM → WHATSAPP
   ===================== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const procedure = document.getElementById('procedure').value;
  const message = document.getElementById('message').value.trim();

  let text = `Olá, vim através do site e quero agendar uma consulta com o Dr. Bruno.`;

  if (name) text += `\n\nNome: ${name}`;
  if (whatsapp) text += `\nWhatsApp: ${whatsapp}`;
  if (procedure) text += `\nProcedimento de interesse: ${procedure}`;
  if (message) text += `\nMensagem: ${message}`;

  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/5565981481988?text=${encoded}`, '_blank', 'noopener,noreferrer');
});

/* =====================
   PHONE MASK
   ===================== */
const whatsappInput = document.getElementById('whatsapp');

whatsappInput.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 7) {
    v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  } else if (v.length > 6) {
    v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  } else if (v.length > 2) {
    v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  } else if (v.length > 0) {
    v = `(${v}`;
  }
  e.target.value = v;
});

/* =====================
   FADE IN ON SCROLL
   ===================== */
const fadeEls = document.querySelectorAll('.identify__card, .procedure__card, .result__card, .about__content, .about__visual, .contact__inner, .location__inner');

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

/* =====================
   SMOOTH ACTIVE NAV
   ===================== */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        link.style.opacity = '1';
      } else {
        link.style.opacity = '';
      }
    }
  });
}, { passive: true });
