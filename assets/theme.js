(() => {
  const key = 'wayne-portfolio-theme';
  const buttons = document.querySelectorAll('[data-theme-toggle]');
  let dark = true;
  try {
    dark = localStorage.getItem(key) !== 'light';
  } catch {
    // The toggle still works when browser storage is unavailable.
  }

  function apply() {
    document.body.classList.toggle('dark', dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#151515' : '#f2f2fc');
    for (const button of buttons) {
      const next = dark ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-pressed', String(dark));
      button.title = 'Switch to ' + next.toLowerCase();
      const icon = button.querySelector('[data-theme-icon]');
      icon?.classList.toggle('fa-sun', dark);
      icon?.classList.toggle('fa-moon', !dark);
      const label = button.querySelector('[data-theme-label]');
      if (label) label.textContent = next;
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      dark = !dark;
      apply();
      try {
        localStorage.setItem(key, dark ? 'dark' : 'light');
      } catch {
        // This page keeps the preference until it is reloaded.
      }
    });
  }
  apply();
})();
