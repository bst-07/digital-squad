
  // Year
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Contact form send button
  const sendBtn = document.getElementById('sendBtn');
  const formSuccess = document.getElementById('formSuccess');

  sendBtn && sendBtn.addEventListener('click', () => {
    const fname    = document.getElementById('fname');
    const femail   = document.getElementById('femail');
    const fsubject = document.getElementById('fsubject');
    const fmessage = document.getElementById('fmessage');

    // Simple validation
    const fields = [fname, femail, fsubject, fmessage];
    let valid = true;

    fields.forEach(f => {
      if (!f.value.trim()) {
        f.style.borderColor = 'rgba(220,80,80,0.6)';
        f.style.boxShadow   = '0 0 0 3px rgba(220,80,80,0.08)';
        valid = false;
      } else {
        f.style.borderColor = '';
        f.style.boxShadow   = '';
      }
    });

    // Email format check
    if (femail.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(femail.value)) {
      femail.style.borderColor = 'rgba(220,80,80,0.6)';
      valid = false;
    }

    if (!valid) return;

    // Build mailto href and open email client
    const to      = 'your@email.com';
    const subject = encodeURIComponent('[Digital Squad] ' + fsubject.options[fsubject.selectedIndex].text);
    const body    = encodeURIComponent(
      'Name: ' + fname.value + '\n' +
      'Email: ' + femail.value + '\n\n' +
      fmessage.value
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    // Show success
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.5';
    formSuccess.classList.add('show');

    // Reset after delay
    setTimeout(() => {
      fields.forEach(f => f.value = '');
      fsubject.selectedIndex = 0;
      sendBtn.disabled = false;
      sendBtn.style.opacity = '';
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1500);
  });

  // Remove red border on input
  ['fname','femail','fsubject','fmessage'].forEach(id => {
    const el = document.getElementById(id);
    el && el.addEventListener('input', () => {
      el.style.borderColor = '';
      el.style.boxShadow   = '';
    });
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    obs.observe(el);
  });
