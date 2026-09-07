const progress = document.querySelector('.scroll-progress');
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('cantinho-theme');

function setTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
  themeToggle.querySelector('span').textContent = isDark ? '☀' : '☾';
  localStorage.setItem('cantinho-theme', isDark ? 'dark' : 'light');
}

setTheme(savedTheme === 'dark');
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark-mode')));

function updateProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progress.style.transform = `scaleX(${progressValue})`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileViewport = window.matchMedia('(max-width: 850px)');
let parallaxFrame = null;
let parallaxTarget = 0;
let parallaxPosition = 0;

function updateHeroParallax() {
  parallaxFrame = null;
  if (prefersReducedMotion.matches || mobileViewport.matches) {
    parallaxTarget = 0;
    parallaxPosition = 0;
    heroImage.style.transform = 'translate3d(0, 0, 0)';
    return;
  }

  parallaxTarget = Math.min(window.scrollY, hero.offsetHeight) * 0.24;
  parallaxPosition += (parallaxTarget - parallaxPosition) * 0.07;
  heroImage.style.transform = `translate3d(0, ${parallaxPosition}px, 0)`;

  if (Math.abs(parallaxTarget - parallaxPosition) > 0.1) requestHeroParallax();
}

function requestHeroParallax() {
  if (parallaxFrame === null) parallaxFrame = window.requestAnimationFrame(updateHeroParallax);
}

window.addEventListener('scroll', requestHeroParallax, { passive: true });
window.addEventListener('resize', requestHeroParallax);
requestHeroParallax();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.01,
  rootMargin: '0px'
});

document.querySelectorAll('.reveal, .fade-in, .slide-up').forEach((element) => revealObserver.observe(element));
