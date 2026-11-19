const sidebar = document.querySelector('.aside');
const toggle = document.querySelector('.nav-toggler');
const navigation = document.querySelector('#page-nav');
const sections = Array.from(document.querySelectorAll('#content .section'));

function setMenu(open) {
  sidebar.classList.toggle('open', open);
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}

function showPage() {
  const hash = location.hash.slice(1) || 'home';
  const id = sections.some((section) => section.id === hash) ? hash : 'home';

  for (const section of sections) {
    const active = section.id === id;
    section.hidden = !active;
    section.classList.toggle('active', active);
    if (active) section.scrollTop = 0;
  }
  for (const link of navigation.querySelectorAll('a')) {
    const active = link.hash === '#' + id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  setMenu(false);
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && sidebar.classList.contains('open')) {
    setMenu(false);
    toggle.focus();
  }
});
window.addEventListener('hashchange', showPage);
const switcher = document.querySelector('.style-switcher');
const themeButton = document.querySelector('.style-switcher-toggler');
const themeOptions = document.querySelector('#theme-colors');
themeButton.addEventListener('click', () => {
  const open = switcher.classList.toggle('open');
  themeButton.setAttribute('aria-expanded', String(open));
  themeOptions.inert = !open;
});
themeOptions.addEventListener('click', (event) => {
  const color = event.target.closest('[data-color]')?.dataset.color;
  if (color) document.documentElement.style.setProperty('--skin-color', color);
});
showPage();
if (window.Typed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  new window.Typed('.typing', { strings: ['developer', 'tech enthusiast', 'FinTech student'], typeSpeed: 90, backSpeed: 55, backDelay: 2300, loop: true });
}
