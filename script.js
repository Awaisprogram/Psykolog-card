/**
 * psykolog.no — main.js
 * All interactive behaviour: nav, drawer, conditions, therapies,
 * locations, FAQ accordion, and scroll-reveal.
 */

/* ============================================================
   DATA
   ============================================================ */
   const CONDS = [
    "Anxiety", "Depression", "Stress", "Burnout", "PTSD / Trauma",
    "ADHD", "ADHD (women)", "ADHD (men)", "OCD", "Social anxiety",
    "Panic anxiety", "Generalised anxiety (GAD)", "Health anxiety",
    "Agoraphobia", "Specific phobias", "Bipolar disorder",
    "Sleep problems", "Eating disorders", "Anorexia", "Bulimia",
    "Binge eating (BED)", "Grief", "Low self-esteem", "Anger management",
    "Breakup & jealousy", "Children & adolescents", "Guilt & shame"
  ];
  
  const THER = [
    "Cognitive Therapy (CBT/KAT)", "Couples therapy",
    "Psychodynamic therapy", "Mindfulness", "ADHD guidance",
    "Individual therapy", "Couple Therapy / Relationships",
    "Family Therapy", "Parental Counseling",
    "Metacognitive Therapy (MCT)", "EMDR",
    "ISTDP (Intensive Dynamic Brief Therapy)",
    "Emotionally Focused Therapy (EFT)", "Prolonged Exposure",
    "Body-Oriented Psychotherapy", "Individual Talk Therapy",
    "Online / Video Therapy", "Transdiagnostic Approach",
    "Trauma Therapy (Specialized)", "Parental Guidance",
    "Child and Adolescent Psychologist", "Exposure Therapy"
  ];
  
  const LOC = {
    oslo: {
      name:  "Psykolog Oslo",
      addr:  "Akersveien 1, 0177 Oslo",
      hours: "Mon–Fri 08–20 · Sat 10–16",
      pin:   "Oslo, Norway",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d499.5660238904384!2d10.847241369687898!3d59.9443525984324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTnCsDU2JzM5LjciTiAxMMKwNTAnNTIuNCJF!5e0!3m2!1sen!2s!4v1781087345014!5m2!1sen!2s" 
    },
    ski: {
      name:  "Psykolog Ski",
      addr:  "Idrettsveien 2, 1400 Ski",
      hours: "Mon–Fri 09–18",
      pin:   "Ski, Norway",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2011.8844806046773!2d10.83473247695394!3d59.718112474804926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTnCsDQzJzA1LjIiTiAxMMKwNTAnMTQuMyJF!5e0!3m2!1sen!2s!4v1781087109263!5m2!1sen!2s" 
    }
  };
  
  const FAQ = [
    [
      "What is the difference between a psychologist and a psychiatrist?",
      "A psychologist holds a professional degree in psychology and specialises in assessment, therapy and psychological treatment through talking-based methods such as CBT, EMDR and talk therapy. A psychiatrist is a medical doctor who has specialised in psychiatry and can prescribe medication in addition to providing therapy."
    ],
    [
      "How much does a psychologist cost?",
      "It depends on the session type. A standard 45-minute individual session typically costs between 1,200 and 1,800 NOK, and couple therapy is 2,000 NOK. See the pricing section for all session types."
    ],
    [
      "How long does therapy last?",
      "It depends on your individual situation. Your psychologist will discuss a treatment plan with you after the first session and adjust it as you progress."
    ],
    [
      "Do I need a referral to see a private psychologist?",
      "No. At psykolog.no you book directly — no referral from your GP or any other doctor is required, and private practising psychologists are available with a short waiting time."
    ],
    [
      "What can I expect in my first session?",
      "The first session is mainly assessment and orientation. Your psychologist focuses on understanding your concerns, symptoms and background, before agreeing a treatment plan together."
    ],
    [
      "How can I pay for a session?",
      "You'll receive an SMS link to pay with Vipps or credit card within 48 hours of your session. If it goes unpaid, an invoice is sent."
    ]
  ];
  
  /* ============================================================
     SVG HELPERS
     ============================================================ */
  const svgCheck = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4 4 10-10"/></svg>`;
  const svgCheckSm = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4 4 10-10"/></svg>`;
  const svgPlus = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`;
  
  /* ============================================================
     NAV — sticky scrolled state
     ============================================================ */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    }, { passive: true });
  }
  
  /* ============================================================
     DRAWER — mobile menu
     ============================================================ */
  function initDrawer() {
    const drawer = document.getElementById('drawer');
    const burger  = document.getElementById('burger');
    if (!drawer || !burger) return;
  
    burger.addEventListener('click', () => drawer.classList.add('show'));
    drawer.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => drawer.classList.remove('show'));
    });
  }
  
  /* ============================================================
     CONDITIONS CLOUD
     ============================================================ */
  function initConditions() {
    const cloud = document.getElementById('condCloud');
    const empty = document.getElementById('condEmpty');
    const input = document.getElementById('condSearch');
    if (!cloud || !empty || !input) return;
  
    function render(q) {
      q = (q || '').trim().toLowerCase();
      const list = CONDS.filter(c => c.toLowerCase().includes(q));
      cloud.innerHTML = list
        .map(c => `<a href="#pricing" class="chip"><span class="d"></span>${c}</a>`)
        .join('');
      empty.style.display = list.length ? 'none' : 'block';
    }
  
    render();
    input.addEventListener('input', e => render(e.target.value));
  }
  
  /* ============================================================
     THERAPIES GRID
     ============================================================ */
  function initTherapies() {
    const grid = document.getElementById('therGrid');
    if (!grid) return;
  
    grid.innerHTML = THER
      .map((t, i) =>
        `<div class="tcard">
          <b>${String(i + 1).padStart(2, '0')}</b>
          <span>${t}</span>
        </div>`
      )
      .join('');
  }
  
  /* ============================================================
     LOCATIONS — tab switcher
     ============================================================ */
     function initLocations() {
      const tabs   = document.getElementById('locTabs');
      const nameEl = document.getElementById('locName');
      const addrEl = document.getElementById('locAddr');
      const hoursEl= document.getElementById('locHours');
      const pinEl  = document.getElementById('locPin');
      
      // 3. Target the iframe element inside your .loc__media container
      const iframeEl = document.querySelector('.loc__media iframe'); 
      const btnEl  = document.getElementById('locBtn');
      
      if (!tabs) return;
    
      tabs.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
    
        tabs.querySelectorAll('button').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
    
        const d = LOC[btn.dataset.loc];
        if (!d) return;
    
        nameEl.textContent  = d.name;
        addrEl.textContent  = d.addr;
        hoursEl.textContent = d.hours;
        pinEl.textContent   = d.pin;
        
        // 4. Update the iframe src instead of img src & alt
        if (iframeEl && d.mapUrl) {
          iframeEl.src = d.mapUrl;
        }
    
        // Update button text (preserves the arrow SVG child nodes)
        if (btnEl) {
          const city = btn.dataset.loc === 'oslo' ? 'Oslo' : 'Ski';
          btnEl.childNodes[0].textContent = `Book at ${city} `;
        }
      });
    }
  
  /* ============================================================
     FAQ — accordion
     ============================================================ */
  function initFaq() {
    const list = document.getElementById('faqList');
    if (!list) return;
  
    list.innerHTML = FAQ
      .map((f, i) =>
        `<div class="faqi${i === 0 ? ' open' : ''}">
          <button class="faqi__q">
            ${f[0]}
            <span class="faqi__ic">${svgPlus}</span>
          </button>
          <div class="faqi__a">
            <div><p>${f[1]}</p></div>
          </div>
        </div>`
      )
      .join('');
  
    list.addEventListener('click', e => {
      const q = e.target.closest('.faqi__q');
      if (!q) return;
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      list.querySelectorAll('.faqi').forEach(x => x.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  }
  
  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  
    function revealPass() {
      const h = window.innerHeight;
      document.querySelectorAll('[data-rv]:not(.in)').forEach(el => {
        if (el.getBoundingClientRect().top < h * 0.92) el.classList.add('in');
      });
    }
  
    revealPass();
    requestAnimationFrame(() => document.documentElement.classList.add('rv-anim'));
    document.querySelectorAll('[data-rv]').forEach(el => io.observe(el));
    window.addEventListener('scroll', revealPass, { passive: true });
    window.addEventListener('load', revealPass);
  
    // Fallback: ensure everything is visible after 1.6s
    setTimeout(() => {
      document.querySelectorAll('[data-rv]').forEach(el => el.classList.add('in'));
    }, 1600);
  }
  
  /* ============================================================
     BOOT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initDrawer();
    initConditions();
    initTherapies();
    initLocations();
    initFaq();
    initReveal();
  });