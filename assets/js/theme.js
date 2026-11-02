(() => {
  const root = document.documentElement;
  try {
    root.dataset.theme = localStorage.getItem('theme') === 'bw' ? 'bw' : 'light';
  } catch (_) {}

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const updateLabel = () => {
      const label = root.dataset.theme === 'bw' ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
      button.title = label;
    };
    updateLabel();
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'bw' ? 'light' : 'bw';
      updateLabel();
      try { localStorage.setItem('theme', root.dataset.theme); } catch (_) {}
    });
  });
})();
