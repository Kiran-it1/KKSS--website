// ---------- small helpers ----------
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// populate year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- NAV: active state on scroll ----------
const sections = $$('#main .section') || $$('#main section');
const navLinks = $$('.nav .nav-link');

const observer = new IntersectionObserver(entries => {
  // pick the most visible section
  const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio - a.intersectionRatio)[0];
  if(!visible) return;
  const id = visible.target.id;
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
  // header style when not on top
  document.getElementById('siteHeader').classList.toggle('scrolled', id !== 'home');
}, { threshold: [0.35, 0.55] });

sections.forEach(s => observer.observe(s));

// smooth nav clicking (and close mobile nav)
$$('.nav .nav-link').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.target);
    if(t) t.scrollIntoView({behavior:'smooth', block:'start'});
    closeMobileNav();
  });
});

// ---------- MOBILE HAMBURGER ----------
const burger = $('#burger'), nav = $('#mainNav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

// close mobile nav helper
function closeMobileNav(){
  if(nav.classList.contains('open')){
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  }
}

// close nav on click outside for mobile
document.addEventListener('click', (e)=>{
  if(window.innerWidth < 860 && !nav.contains(e.target) && !burger.contains(e.target)){
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  }
});

// ---------- SERVICES: show modal details ----------
const modal = $('#modal'), modalBody = $('#modalBody'), modalTitle = $('#modalTitle'), modalClose = $('#modalClose');

const details = {
  wedding: {
    title: "Wedding Planning – Full Service",
    html: `<p>Complete wedding planning: concept, mandap design, schedule, guest experience, vendor coordination and on-day management.</p>
           <ul><li>Customized themes (traditional, floral, royal, rustic)</li><li>Stage / seating / lighting / floral design</li><li>Guest logistics & transport</li></ul>`
  },
  corporate: {
    title: "Corporate Events – Conferences & Launches",
    html: `<p>Professional AV setups, staging, branding, and event flow for conferences, seminars, and product launches.</p>
           <ul><li>Technical rehearsal & sound checks</li><li>Multi-mic and panel support</li><li>Stage management & show-calling</li></ul>`
  },
  sound: {
    title: "Sound & Lighting – Pro Audio",
    html: `<p>Large-format PA systems, subwoofer arrays, intelligent lighting and experienced sound engineers for crystal audio.</p>
           <ul><li>Mixing & FOH engineers</li><li>Wireless systems & monitors</li><li>On-site tuning / measurement</li></ul>`
  }
};

$$('.service-card .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.service;
    const info = details[key] || {title: 'Details', html: '<p>Information coming soon.</p>'};
    modalTitle.textContent = info.title;
    modalBody.innerHTML = info.html;
    openModal();
  });
});

function openModal(){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  // focus trap not implemented here (demo), focus close
  modalClose.focus();
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

// ---------- CONTACT FORM demo handling ----------
const form = $('#contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // fake success
  alert('Thanks! Your message has been received (demo).');
  form.reset();
});
