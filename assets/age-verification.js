/**
 * Age Verification Gate
 * Shows a mandatory 21+ overlay on first visit.
 * Stores consent in a cookie for 30 days.
 */

(function () {
  const COOKIE_NAME = 'joon_age_verified';
  const COOKIE_DAYS = 30;
  const DENY_URL = 'https://www.google.com';

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  function closeGate(gate) {
    gate.setAttribute('hidden', '');
    document.body.classList.remove('age-gate-open');
  }

  function init() {
    const gate = document.getElementById('age-gate');
    if (!gate) return;

    // Already verified — hide immediately (before paint to avoid flash)
    if (getCookie(COOKIE_NAME) === '1') {
      gate.setAttribute('hidden', '');
      return;
    }

    // Show the gate
    gate.removeAttribute('hidden');
    document.body.classList.add('age-gate-open');

    // Confirm button
    const confirmBtn = gate.querySelector('[data-age-confirm]');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function () {
        setCookie(COOKIE_NAME, '1', COOKIE_DAYS);
        closeGate(gate);
      });
    }

    // Deny button
    const denyBtn = gate.querySelector('[data-age-deny]');
    if (denyBtn) {
      denyBtn.addEventListener('click', function () {
        window.location.href = DENY_URL;
      });
    }

    // Prevent closing on backdrop click (mandatory gate)
    gate.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // Run as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
