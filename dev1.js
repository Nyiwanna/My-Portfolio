const loveApp = {
  theme: 'light',

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = this.theme;
    return this.theme;
  },

  calculateCompatibility(name1 = '', name2 = '') {
    const normalize = text => text.trim().toLowerCase().replace(/[^a-z]/g, '');
    const combined = normalize(name1) + normalize(name2);
    if (!combined) return 0;

    const scores = combined
      .split('')
      .map((char, index) => char.charCodeAt(0) + index)
      .reduce((sum, value) => sum + value, 0);

    return Math.min(100, Math.max(0, Math.round(scores / combined.length)));
  },

  createLoveMessage(partnerName = 'Beloved', message = 'You are my everything.') {
    return `Dear ${partnerName},\n\n${message}\n\nWith love,\nYour soulmate.`;
  },

  animateHeart(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.classList.add('pulse');
    setTimeout(() => element.classList.remove('pulse'), 1000);
  },

  setupForm(formId, resultId) {
    const form = document.getElementById(formId);
    const result = document.getElementById(resultId);
    if (!form || !result) return;

    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name1 = data.get('name1') || '';
      const name2 = data.get('name2') || '';
      const message = data.get('message') || 'Forever in my heart.';

      const score = this.calculateCompatibility(name1, name2);
      const loveMessage = this.createLoveMessage(name2, message);

      result.textContent = `Compatibility: ${score}%\n\n${loveMessage}`;
      this.animateHeart('heart-icon');
    });
  },

  validateChoice(choice = '') {
    const normalized = choice.trim().toLowerCase();
    if (normalized === 'infinitely') {
      return true;
    } else {
      alert('Please choose "infinitely"');
      return false;
    }
  },

  init(options = {}) {
    if (options.themeToggleId) {
      const toggle = document.getElementById(options.themeToggleId);
      if (toggle) {
        toggle.addEventListener('click', () => this.toggleTheme());
      }
    }

    if (options.formId && options.resultId) {
      this.setupForm(options.formId, options.resultId);
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  loveApp.init({
    themeToggleId: 'love-theme-toggle',
    formId: 'love-form',
    resultId: 'love-result'
  });
});

// Auto-create basic DOM elements if missing to match index.html / style.css expectations
(function ensureDomElements() {
  // set default theme attribute
  if (!document.documentElement.dataset.theme) document.documentElement.dataset.theme = loveApp.theme;

  if (!document.getElementById('love-theme-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'love-theme-toggle';
    btn.type = 'button';
    btn.textContent = 'Toggle Theme';
    btn.className = 'love-theme-toggle';
    document.body.prepend(btn);
  }

  if (!document.getElementById('heart-icon')) {
    const heart = document.createElement('div');
    heart.id = 'heart-icon';
    heart.className = 'heart-icon';
    heart.setAttribute('aria-hidden', 'true');
    heart.innerHTML = '❤';
    document.body.appendChild(heart);
  }

  if (!document.getElementById('love-result')) {
    const res = document.createElement('pre');
    res.id = 'love-result';
    res.className = 'love-result';
    document.body.appendChild(res);
  }

  if (!document.getElementById('love-form')) {
    const form = document.createElement('form');
    form.id = 'love-form';
    form.className = 'love-form';
    form.innerHTML = `\n      <label>Name 1: <input name="name1" required></label>\n      <label>Name 2: <input name="name2" required></label>\n      <label>Message: <input name="message"></label>\n      <button type="submit">Calculate</button>\n    `;
    document.body.insertBefore(form, document.getElementById('love-result'));
  }
})();
