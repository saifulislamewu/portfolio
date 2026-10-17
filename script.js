const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('main section[id]');
const updateActiveLink = () => {
  let current = 'home';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navAnchors.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ==========================================================================
   THEME TOGGLE & DYNAMIC TEXT SWITCHING (DAY & DARK MODE)
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const logoIcon = document.getElementById('logo-icon');
const logoText = document.getElementById('logo-text');
const heroEyebrow = document.getElementById('hero-eyebrow');
const heroSubtitleText = document.getElementById('hero-subtitle-text');
const profileRole = document.getElementById('profile-role');
const researchCardHeading = document.getElementById('research-card-heading');

const dayContent = {
  logoIcon: "Md.",
  logoText: "Saiful Islam",
  heroEyebrow: "Portfolio",
  profileRole: "AI Engineer | Researcher | Entrepreneur",
  researchCardHeading: "Research Areas"
};

const darkContent = {
  logoIcon: "Md.",
  logoText: "Saiful Islam",
  heroEyebrow: "AI & Deep Tech Research Portfolio",
  profileRole: "AI Engineer | Researcher | Innovator",
  researchCardHeading: "Research Focus Areas"
};

// Typing Effect variables
let typingTimeout = null;
const typingTitles = [
  "AI/ML Researcher & Engineer",
  "Deep Learning Enthusiast",
  "Published Author & Reviewer"
];

function startTypingEffect() {
  if (!heroSubtitleText) return;
  let count = 0;
  let index = 0;

  function type() {
    if (count === typingTitles.length) count = 0;
    let currentText = typingTitles[count];
    let letter = currentText.slice(0, ++index);

    if (document.body.classList.contains('dark-mode')) {
      heroSubtitleText.innerHTML = `<span style="color:var(--accent); font-weight:600;">${letter}</span><span class="typed-cursor"></span><br />Specializing in Deep Learning, Computer Vision, Natural Language Processing, and Explainable AI. Published author across IEEE, Springer, Elsevier, MDPI, and Taylor & Francis.`;
    } else {
      heroSubtitleText.innerHTML = `<span style="color:var(--accent); font-weight:600;">${letter}</span><span class="typed-cursor"></span><br />AI/ML Researcher and Engineer specializing in Deep Learning, Computer Vision, Natural Language Processing, and Explainable AI. Published researcher with contributions to IEEE, Springer, Elsevier, MDPI, and Taylor & Francis. Experienced in developing intelligent and trustworthy AI solutions for healthcare, cybersecurity, social media analytics, and real-world applications.`;
    }

    if (letter.length === currentText.length) {
      count++;
      index = 0;
      typingTimeout = setTimeout(type, 2200);
    } else {
      typingTimeout = setTimeout(type, 85);
    }
  }

  type();
}

function applyTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    themeIcon.className = 'fa-solid fa-sun';
    localStorage.setItem('theme', 'dark');

    if (logoIcon) logoIcon.textContent = darkContent.logoIcon;
    if (logoText) logoText.textContent = darkContent.logoText;
    if (heroEyebrow) heroEyebrow.textContent = darkContent.heroEyebrow;
    if (profileRole) profileRole.textContent = darkContent.profileRole;
    if (researchCardHeading) researchCardHeading.textContent = darkContent.researchCardHeading;

    if (typingTimeout) clearTimeout(typingTimeout);
    startTypingEffect();
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.className = 'fa-solid fa-moon';
    localStorage.setItem('theme', 'light');

    if (logoIcon) logoIcon.textContent = dayContent.logoIcon;
    if (logoText) logoText.textContent = dayContent.logoText;
    if (heroEyebrow) heroEyebrow.textContent = dayContent.heroEyebrow;
    if (profileRole) profileRole.textContent = dayContent.profileRole;
    if (researchCardHeading) researchCardHeading.textContent = dayContent.researchCardHeading;

    if (typingTimeout) clearTimeout(typingTimeout);
    startTypingEffect();
  }
}

themeToggleBtn?.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  applyTheme(!isDark);
});

// Load stored theme or default to Dark mode on first visit
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  applyTheme(false);
} else {
  // Default to dark mode if no preference is saved or if saved as dark
  applyTheme(true);
}
