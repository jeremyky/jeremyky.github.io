(() => {
  const root = document.documentElement;
  if (!root.classList.contains('welcome-active')) return;

  const overlay = document.querySelector('.welcome');
  const greeting = overlay.querySelector('.welcome__greeting');
  const destination = document.querySelector('.hero__hello');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  let finished = false;
  let currentAnimation;
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  const animate = async (frames, options) => {
    currentAnimation = greeting.animate(frames, { fill: 'forwards', ...options });
    try { await currentAnimation.finished; } catch (_) {}
  };

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(window.welcomeFallback);
    currentAnimation?.cancel();
    controller.abort();
    root.classList.remove('welcome-active');
    overlay.remove();
    try { sessionStorage.setItem('welcome-seen', 'true'); } catch (_) {}
  }

  document.addEventListener('pointerdown', finish, { signal: controller.signal });
  document.addEventListener('keydown', finish, { signal: controller.signal });
  reducedMotion.addEventListener('change', finish, { signal: controller.signal });

  async function play() {
    try {
      for (const [text, lang] of [['Hello', 'en'], ['Hola', 'es'], ['你好', 'zh-Hant'], ['សួស្តី', 'km']]) {
        if (finished) return;
        greeting.textContent = text;
        greeting.lang = lang;
        await animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
        await pause(380);
        if (finished) return;
        await animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-10px)' }], { duration: 150, easing: 'ease-in' });
      }
      if (finished) return;
      greeting.textContent = 'Hello!';
      greeting.lang = 'en';
      await animate([{ opacity: 0, transform: 'none' }, { opacity: 1, transform: 'none' }], { duration: 200 });
      if (finished) return;
      const from = greeting.getBoundingClientRect();
      const to = destination.getBoundingClientRect();
      const scale = parseFloat(getComputedStyle(destination).fontSize) / parseFloat(getComputedStyle(greeting).fontSize);
      root.classList.add('welcome-revealing');
      await animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})`, opacity: 1 }
      ], { duration: 750, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    } finally {
      finish();
      root.classList.remove('welcome-revealing');
    }
  }
  play();
})();
