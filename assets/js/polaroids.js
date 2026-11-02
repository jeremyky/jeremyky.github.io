(() => {
  const cards = [...document.querySelectorAll('.polaroid')];
  if (!cards.length) return;

  const viewer = document.createElement('dialog');
  viewer.className = 'photo-viewer';
  viewer.setAttribute('aria-label', 'Photo viewer');
  const close = document.createElement('button');
  close.className = 'photo-viewer__close';
  close.type = 'button';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Close photo');
  const content = document.createElement('div');
  content.className = 'photo-viewer__content';
  viewer.append(close, content);
  document.body.append(viewer);

  const dismiss = () => viewer.close();
  close.addEventListener('click', dismiss);
  viewer.addEventListener('click', event => {
    if (event.target === viewer) dismiss();
  });
  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('photo-viewer-open');
    content.replaceChildren();
  });

  cards.forEach(card => {
    const caption = card.querySelector('figcaption').textContent;
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'polaroid__open';
    trigger.setAttribute('aria-label', `Enlarge photo: ${caption}`);
    trigger.setAttribute('aria-haspopup', 'dialog');
    card.append(trigger);
    trigger.addEventListener('click', () => {
      const enlarged = card.cloneNode(true);
      enlarged.querySelector('.polaroid__open').remove();
      content.replaceChildren(enlarged);
      viewer.showModal();
      document.documentElement.classList.add('photo-viewer-open');
    });
  });
})();
