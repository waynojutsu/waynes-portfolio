document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');

  if (menu && nav) {
    function setMenu(open) {
      nav.classList.toggle('is-open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'Close menu' : 'Menu';
    }

    menu.addEventListener('click', () => {
      setMenu(menu.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menu.focus();
      }
    });
  }

  document.querySelectorAll('[data-copy]').forEach((button) => {
    const label = button.textContent;
    let resetLabel;
    button.addEventListener('click', async () => {
      const source = document.getElementById(button.dataset.copy);
      if (!source) return;

      try {
        await navigator.clipboard.writeText(source.dataset.raw || source.innerText);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Select text to copy';
      }

      window.clearTimeout(resetLabel);
      resetLabel = window.setTimeout(() => { button.textContent = label; }, 2200);
    });
  });

  const filters = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-category]');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      for (const filter of filters) {
        const selected = filter === button;
        filter.classList.toggle('selected', selected);
        filter.setAttribute('aria-pressed', String(selected));
      }

      for (const project of projects) {
        project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      }
    });
  });
});
