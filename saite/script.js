const progress = document.querySelector('.scroll-progress');
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

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.2,
  rootMargin: '0px 0px -4% 0px'
});

document.querySelectorAll('.reveal, .fade-in, .slide-up').forEach((element) => revealObserver.observe(element));
