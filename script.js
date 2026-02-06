const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const celebrate = document.getElementById('celebrate');

// Track how many times we've avoided; increase difficulty slightly
let attempts = 0;

function moveAwayRandomly() {
  attempts += 1;
  // Get parent bounds
  const parent = noBtn.parentElement; // .buttons
  const parentRect = parent.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  // Calculate area where noBtn can move inside parent without overlapping yesBtn
  const padding = 6; // small padding
  const maxX = parentRect.width - noRect.width - padding;
  const maxY = parentRect.height - noRect.height - padding;

  // On small screens parent may be inline; allow movement by using viewport if needed
  let newX = Math.random() * maxX;
  let newY = Math.random() * maxY;

  // If parent too small (maxX <= 0), fallback to moving relative to body
  if (maxX <= 0) {
    const bodyW = document.body.clientWidth - noRect.width - 20;
    const bodyH = document.body.clientHeight - noRect.height - 20;
    newX = Math.random() * Math.max(0, bodyW);
    newY = Math.random() * Math.max(0, bodyH);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${10 + newX}px`;
    noBtn.style.top = `${10 + newY}px`;
  } else {
    // Use relative positioning inside parent
    noBtn.style.position = 'relative';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
  }

  // Slight scale effect
  noBtn.style.transform = 'scale(1.05)';
  setTimeout(()=>{ noBtn.style.transform = ''; }, 180);
}

// When mouse gets near the No button, move it
noBtn.addEventListener('mouseenter', (e) => {
  moveAwayRandomly();
});

// Also when trying to click (mousedown), move
noBtn.addEventListener('mousedown', (e) => {
  e.preventDefault();
  moveAwayRandomly();
});

// If touch device, on touchstart move
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveAwayRandomly();
});

// Yes click — show celebration
yesBtn.addEventListener('click', () => {
  celebrate.classList.remove('hidden');
  yesBtn.disabled = true;
  yesBtn.textContent = 'Yay! ❤️';
});

// Accessibility: allow keyboard selection
noBtn.addEventListener('focus', () => moveAwayRandomly());
