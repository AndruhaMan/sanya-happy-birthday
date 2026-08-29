/* A little birthday letter 💌 */

const askScreen = document.getElementById('ask');
const letterScreen = document.getElementById('letter');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const askSub = document.querySelector('.ask-sub');

/* ── Background hearts ─────────────────────────────────────── */
const HEART_GLYPHS = ['💗', '💕', '🌸', '💖', '🎀', '💘'];

function seedBackgroundHearts(count = 18) {
  const sky = document.querySelector('.sky');
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.textContent = HEART_GLYPHS[i % HEART_GLYPHS.length];
    heart.style.left = Math.random() * 96 + 'vw';
    heart.style.fontSize = 14 + Math.random() * 22 + 'px';
    heart.style.animationDuration = 10 + Math.random() * 12 + 's';
    heart.style.animationDelay = -Math.random() * 20 + 's';
    sky.appendChild(heart);
  }
}

/* ── The "No" button's slow surrender ──────────────────────── */
const NO_TEXTS = [
  'Ти впевнена?',
  'Точно-точно?',
  'Але ж це для тебе 🥺',
  'Котик засумував…',
  'Подумай ще разочок',
  'Ну будь ласочка?',
  'Ти розбиваєш мені серце 💔',
  'Котик почав плакати 😿',
  'Ця кнопка вже втомилася',
  'Добре, але… справді?',
  'Останній шанс сказати «так»!',
  'Гаразд. Але лист все одно чекає.',
  'Просто натисни рожеву 🥹',
];

const SUB_TEXTS = [
  'Відкриємо? 💌',
  'Це зовсім маленький лист, обіцяю 🤏',
  'Котик тримає його вже цілий день 🐾',
  'Він відкриється тільки тобі',
  'Ця кнопка вже майже декоративна',
  'Глянь, яка велика стала інша 👀',
];

const YES_STEP = 1.22; // how much the Yes button grows per "No"
const YES_MAX = 4.6;   // rem, so it never eats the whole screen
const NO_MIN = 0.62;   // rem

let noCount = 0;
let yesSize = 1;
let noSize = 1;

noBtn.addEventListener('click', () => {
  if (noBtn.disabled) return;

  noCount++;

  yesSize = Math.min(yesSize * YES_STEP, YES_MAX);
  noSize = Math.max(noSize * 0.92, NO_MIN);

  yesBtn.style.fontSize = yesSize.toFixed(2) + 'rem';
  noBtn.style.fontSize = noSize.toFixed(2) + 'rem';

  noBtn.textContent = NO_TEXTS[Math.min(noCount - 1, NO_TEXTS.length - 1)];
  askSub.textContent = SUB_TEXTS[Math.min(noCount, SUB_TEXTS.length - 1)];

  replayAnimation(yesBtn, 'grew');

  if (noCount >= NO_TEXTS.length) {
    // out of excuses: the button gives up and stops reacting entirely
    noBtn.classList.remove('shook');
    noBtn.disabled = true;
  } else {
    replayAnimation(noBtn, 'shook');
  }
});

function replayAnimation(el, className) {
  el.classList.remove(className);
  void el.offsetWidth; // force reflow so the animation restarts
  el.classList.add(className);
}

/* ── Yes! ──────────────────────────────────────────────────── */
yesBtn.addEventListener('click', () => {
  burstHearts();
  setTimeout(showLetter, 260);
});

function showLetter() {
  askScreen.hidden = true;
  askScreen.classList.remove('is-active');
  letterScreen.hidden = false;
  letterScreen.classList.add('is-active');
  replayAnimation(letterScreen.querySelector('.card'), 'reveal');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function burstHearts(count = 26) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.textContent = HEART_GLYPHS[i % HEART_GLYPHS.length];

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 260;
    piece.style.setProperty('--dx', `calc(-50% + ${Math.cos(angle) * distance}px)`);
    piece.style.setProperty('--dy', `calc(-50% + ${Math.sin(angle) * distance}px)`);
    piece.style.setProperty('--rot', Math.random() * 720 - 360 + 'deg');
    piece.style.animationDelay = Math.random() * 0.15 + 's';

    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

seedBackgroundHearts();
