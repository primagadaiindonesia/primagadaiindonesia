/* PRIMA GADAI INDONESIA - main interactions (tanpa backend) */

(function(){
  // Mobile menu
  const mobileBtn = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if(mobileBtn && mobileMenu){
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu after click
    mobileMenu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if(a){
        mobileMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active nav link (by path)
  const pathname = (location.pathname || '').toLowerCase();
  const filename = (pathname.split('/').pop() || 'index.html').toLowerCase();
  const activeFile = pathname.includes('/articles/') ? 'blog.html' : filename;

  document.querySelectorAll('a[data-nav]').forEach((a) => {
    const hrefRaw = (a.getAttribute('href') || '').toLowerCase();
    const hrefFile = hrefRaw.split('#')[0].split('/').pop();
    if(hrefFile === activeFile){
      a.classList.add('active');
    }
  });


  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', id);
    });
  });

  // Contact form handler (kirim ke WhatsApp admin)
  const contactForm = document.querySelector('[data-contact-form]');
  const contactResult = document.querySelector('[data-contact-result]');
  if(contactForm && contactResult){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = String(data.get('name')||'').trim();
      const email = String(data.get('email')||'').trim();
      const phone = String(data.get('phone')||'').trim();
      const message = String(data.get('message')||'').trim();

      if(name.length < 2 || message.length < 10 || !email.includes('@')){
        contactResult.className = 'notice warning';
        contactResult.innerHTML = '<strong>Periksa lagi.</strong> Nama minimal 2 karakter, email harus valid, dan pesan minimal 10 karakter.';
        return;
      }

      const waNumber = String(contactForm.getAttribute('data-wa-number') || '6285825196605').replace(/\D/g,'');
      const text = [
        'Halo Admin PRIMA GADAI INDONESIA,',
        '',
        'Nama: ' + name,
        'Email: ' + email,
        'No. HP/WA: ' + (phone || '-'),
        '',
        'Pesan:',
        message
      ].join('\n');

      const waLink = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text);

      contactResult.className = 'notice success';
      contactResult.innerHTML = '<strong>Siap!</strong> WhatsApp akan terbuka dengan pesan yang sudah terisi. Jika tidak terbuka, klik: <a href="' + waLink + '" target="_blank" rel="noopener">Kirim lewat WhatsApp</a>.';

      window.open(waLink, '_blank', 'noopener');
    });
  }

  // Tahun otomatis
  document.querySelectorAll('.js-year').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  function escapeHtml(str){
    return str
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#039;');
  }
})();
