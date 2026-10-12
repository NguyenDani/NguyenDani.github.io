document.getElementById('year').textContent = new Date().getFullYear();

document.querySelector('.theme-toggle').addEventListener('click', function () {
  var root = document.documentElement;
  var isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  var next = isDark ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Marks the nav link for the section currently in view
var sections = document.querySelectorAll('main section[id]');
var navLinks = document.querySelectorAll('.nav-links a');
function markCurrent() {
  var current = '';
  sections.forEach(function (section) {
    if (section.getBoundingClientRect().top < innerHeight * 0.4) current = section.id;
  });
  // The last section is too short to reach that line, so it takes over once its end is on screen
  var last = sections[sections.length - 1];
  if (last.getBoundingClientRect().bottom <= innerHeight + 1) current = last.id;
  navLinks.forEach(function (link) {
    if (link.getAttribute('href') === '#' + current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
addEventListener('scroll', markCurrent, { passive: true });
addEventListener('resize', markCurrent);
markCurrent();
