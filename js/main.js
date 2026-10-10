/**
 * SUDHANSHU SAKHARE — SANJAYA HIGH-TECH EDITORIAL CONTROLLER
 * Fully integrated with Lenis 1.1 Smooth Inertia Engine (lenis.dev aesthetic)
 * 
 * Features:
 * 1. Lenis Smooth Momentum Inertia Scroll Engine
 * 2. Word-by-Word Scroll-Driven Text Reveal (lenis.dev signature illumination)
 * 3. Pinned Horizontal Scroll Showcase Matrix (320vh scroll runway)
 * 4. Velocity-Responsive Kinetic Marquees (dynamic skew & acceleration)
 * 5. Real-Time Physics Telemetry HUD (FPS counter, velocity px/s, scroll %)
 * 6. Sticky Card Stacking Deck Physics with Dynamic Depth Scaling
 * 7. Interactive Case Study Modal Viewer with Lenis scroll lock
 * 8. Real-Time Pune, India IST Clock (UTC+5:30)
 * 9. Interactive FAQ Accordion & Mobile Navigation
 */

import Lenis from 'lenis';
if (typeof window !== 'undefined') {
  window.Lenis = Lenis;
}

(function () {
  'use strict';

  /* ==========================================================================
     1. Lenis Inertia Smooth Scroll Engine (lenis.dev Core)
     ========================================================================== */
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Smooth Anchor Navigation via Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ==========================================================================
     2. Scroll Progress Bar
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${scrollPercent}%`;
  }

  /* ==========================================================================
     3. Scroll-Driven Word-by-Word Text Reveal (lenis.dev Signature Intro)
     ========================================================================== */
  const revealTarget = document.getElementById('lenis-reveal-target');
  const revealSection = document.getElementById('philosophy');
  let revealWords = [];

  if (revealTarget) {
    const rawText = revealTarget.textContent.trim();
    const words = rawText.split(/\s+/);
    revealTarget.innerHTML = '';

    // Keywords to receive neon emerald highlight
    const highlightTerms = [
      'next', 'generation', 'friction', 'authority', 
      'buttery-smooth', 'hyper-responsive', 'autonomous', 'scale'
    ];

    words.forEach((word) => {
      const span = document.createElement('span');
      span.className = 'lenis-word';
      const cleanWord = word.toLowerCase().replace(/[^a-z-]/g, '');
      if (highlightTerms.includes(cleanWord)) {
        span.classList.add('highlight');
      }
      span.textContent = word + ' ';
      revealTarget.appendChild(span);
      revealWords.push(span);
    });
  }

  function updateWordReveal() {
    if (!revealSection || revealWords.length === 0) return;
    const rect = revealSection.getBoundingClientRect();
    const sectionHeight = revealSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Progress through the vertical scroll runway
    const scrollDist = -rect.top;
    const maxScroll = sectionHeight - windowHeight;
    const progress = Math.max(0, Math.min(1, scrollDist / (maxScroll || 1)));

    const totalWords = revealWords.length;
    // Map progress so all words reach 100% illumination cleanly
    const activeIndex = Math.floor(progress * totalWords * 1.06);

    for (let i = 0; i < totalWords; i++) {
      if (i <= activeIndex) {
        revealWords[i].classList.add('active');
      } else {
        revealWords[i].classList.remove('active');
      }
    }
  }

  /* ==========================================================================
     4. Pinned Horizontal Scroll Showcase (lenis.dev Signature Horizontal)
     ========================================================================== */
  const horizontalContainer = document.getElementById('capabilities');
  const horizontalTrack = document.getElementById('horizontal-track');
  const horizontalProgressBar = document.getElementById('horizontal-progress-bar');
  const horizontalStepCurrent = document.getElementById('h-step-current');

  function updateHorizontalScroll() {
    if (!horizontalContainer || !horizontalTrack) return;
    if (window.innerWidth <= 900) return; // Native horizontal swipe on mobile

    const rect = horizontalContainer.getBoundingClientRect();
    const containerHeight = horizontalContainer.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollDist = -rect.top;
    const maxScroll = containerHeight - windowHeight;
    const progress = Math.max(0, Math.min(1, scrollDist / (maxScroll || 1)));

    // Total distance the horizontal track needs to slide
    const maxTranslate = horizontalTrack.scrollWidth - window.innerWidth + 140;
    const currentTranslate = progress * maxTranslate;

    horizontalTrack.style.transform = `translate3d(-${currentTranslate}px, 0, 0)`;

    if (horizontalProgressBar) {
      horizontalProgressBar.style.width = `${progress * 100}%`;
    }

    if (horizontalStepCurrent) {
      const step = Math.min(5, Math.floor(progress * 5) + 1);
      horizontalStepCurrent.textContent = `0${step}`;
    }
  }

  /* ==========================================================================
     5. Lenis Velocity Reactions & Live Telemetry HUD
     ========================================================================== */
  const marqueeStrip1 = document.getElementById('marquee-strip-1');
  const marqueeStrip2 = document.getElementById('marquee-strip-2');
  const hudVelocity = document.getElementById('hud-velocity-val');
  const hudScroll = document.getElementById('hud-scroll-val');
  const hudFps = document.getElementById('hud-fps-val');

  // FPS calculation loop
  let lastTime = performance.now();
  let frameCount = 0;
  let currentFps = 120;

  function calculateFps(now) {
    frameCount++;
    if (now - lastTime >= 1000) {
      currentFps = Math.round((frameCount * 1000) / (now - lastTime));
      if (hudFps) hudFps.textContent = `${Math.min(144, Math.max(60, currentFps))} FPS`;
      frameCount = 0;
      lastTime = now;
    }
  }

  function handleScrollTelemetry(scrollData) {
    const velocity = scrollData ? (scrollData.velocity || 0) : 0;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const maxDocScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = maxDocScroll > 0 ? Math.round((scrollY / maxDocScroll) * 100) : 0;

    // Skew marquees based on scroll velocity (lenis.dev kinetic signature)
    const skew = Math.max(-5, Math.min(5, velocity * 0.1));
    if (marqueeStrip1) marqueeStrip1.style.transform = `rotate(-0.75deg) skewX(${skew}deg)`;
    if (marqueeStrip2) marqueeStrip2.style.transform = `rotate(0.75deg) skewX(${-skew}deg)`;

    // Update HUD capsule
    if (hudVelocity) hudVelocity.textContent = `${Math.abs(velocity).toFixed(1)} px/s`;
    if (hudScroll) hudScroll.textContent = `${Math.max(0, Math.min(100, scrollPct))}%`;
  }

  // Bind to Lenis or fallback scroll
  if (lenis) {
    lenis.on('scroll', (e) => {
      handleScrollTelemetry(e);
      updateWordReveal();
      updateHorizontalScroll();
      handleCardStacking();
      updateScrollProgress();
    });
  } else {
    window.addEventListener('scroll', () => {
      handleScrollTelemetry({ velocity: 0 });
      updateWordReveal();
      updateHorizontalScroll();
      handleCardStacking();
      updateScrollProgress();
    }, { passive: true });
  }

  // Continuous Telemetry Loop
  function telemetryLoop(now) {
    calculateFps(now);
    requestAnimationFrame(telemetryLoop);
  }
  requestAnimationFrame(telemetryLoop);

  /* ==========================================================================
     6. Stacking Cards Scroll Physics & Dynamic Depth Scale
     ========================================================================== */
  const cards = document.querySelectorAll('.sanjaya-card');
  function handleCardStacking() {
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const topOffset = 88 + ((index + 1) * 14);

      if (rect.top <= topOffset + 2) {
        const nextCard = cards[index + 1];
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const distanceToNext = nextRect.top - topOffset;
          const totalDistance = window.innerHeight * 0.45;

          if (distanceToNext > 0 && distanceToNext < totalDistance) {
            const factor = 1 - (distanceToNext / totalDistance);
            const scale = 1 - (factor * 0.04);
            const brightness = 1 - (factor * 0.2);
            card.style.transform = `scale(${scale})`;
            card.style.filter = `brightness(${brightness})`;
          } else if (distanceToNext <= 0) {
            card.style.transform = `scale(0.96)`;
            card.style.filter = `brightness(0.8)`;
          } else {
            card.style.transform = 'scale(1)';
            card.style.filter = 'brightness(1)';
          }
        }
      } else {
        card.style.transform = 'scale(1)';
        card.style.filter = 'brightness(1)';
      }
    });
  }

  // Initial runs
  updateWordReveal();
  updateHorizontalScroll();
  handleCardStacking();
  updateScrollProgress();

  /* ==========================================================================
     7. Real-Time Pune, India Clock (IST / UTC+5:30)
     ========================================================================== */
  const clockEl = document.getElementById('pune-time-display');
  function updatePuneClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const istString = new Intl.DateTimeFormat('en-US', options).format(now);
      clockEl.textContent = `Pune, IN • ${istString}`;
    } catch (e) {
      clockEl.textContent = `Pune, Maharashtra, India`;
    }
  }
  updatePuneClock();
  setInterval(updatePuneClock, 1000);

  /* ==========================================================================
     8. Subtle Hero Mouse Parallax
     ========================================================================== */
  const heroBg = document.getElementById('hero-parallax-bg');
  if (heroBg) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      heroBg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  /* ==========================================================================
     9. FAQ Accordion Component
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ==========================================================================
     10. Mobile Drawer Navigation
     ========================================================================== */
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.style.display = 'flex';
    setTimeout(() => mobileDrawer.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    setTimeout(() => {
      mobileDrawer.style.display = 'none';
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }, 300);
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileDrawer));

  /* ==========================================================================
     11. Case Study Detailed Modal
     ========================================================================== */
  const PROJECTS_DATA = {
    'batavia': {
      title: 'Scaling Batavia’s Digital Product Store with Automation',
      client: '2026 • Batavia Audio Labs • E-Commerce',
      image: 'assets/card-batavia.jpg',
      liveUrl: '#contact',
      overview: 'Batavia is a premier audio hardware and digital product platform. Designed and engineered end-to-end automated product delivery, photorealistic WebGL hardware configurators, and streamlined checkout flows that handle thousands of digital assets seamlessly.',
      challenge: 'High manual intervention required for license generation, digital product provisioning, and customer onboarding created substantial operational overhead and delayed deliveries.',
      solution: 'Architected a zero-touch automated delivery engine using Next.js 14 and Stripe webhooks. Integrated interactive Three.js product visualizers with tactile rotary dial previews, empowering customers to inspect hardware finishes in real-time.',
      stats: [
        { label: 'Weekly Savings', value: '40 Hours Saved' },
        { label: 'Repeat Orders', value: '2.4x Increase' },
        { label: 'Latency', value: '0.8s Instant Delivery' },
        { label: 'Architecture', value: 'Next.js 14 / Stripe' }
      ]
    },
    'mandala': {
      title: 'Scaling Mandala’s E Commerce Operations with Automation',
      client: '2026 • Mandala Studio Inc. • Hardware & SaaS',
      image: 'assets/card-mandala.jpg',
      liveUrl: '#contact',
      overview: 'Mandala required automated inventory routing, order processing, and supplier notifications across their multi-channel retail operation.',
      challenge: 'Order surges overwhelmed manual fulfillment channels, leading to delayed tracking notifications and customer support backlogs.',
      solution: 'Engineered unified webhook pipelines and background worker queues that handle thousands of orders in real-time with automated tracking and supplier sync.',
      stats: [
        { label: 'Order Processing', value: '3.2x Faster' },
        { label: 'Notifications', value: 'Instant Multi-Channel' },
        { label: 'Bottlenecks', value: 'Zero Manual Delay' },
        { label: 'Platform Uptime', value: '99.98% Reliability' }
      ]
    },
    'univercell': {
      title: 'Scaling Univercell’s Device Marketplace & Valuation Engine',
      client: '2025 • Univercell Tech Inc. • Telecom & E-Commerce',
      image: 'assets/univercell.png',
      liveUrl: 'https://univercellcanada.com/',
      overview: 'Premier Canadian telecommunications brand platform featuring instant device valuation, trade-in logistics, and responsive e-commerce checkout.',
      challenge: 'Traditional multi-step valuation questionnaires had high customer drop-offs and lacked mobile responsiveness.',
      solution: 'Streamlined into an intelligent 3-step instant valuation algorithm with real-time carrier API validation and sub-second page rendering.',
      stats: [
        { label: 'Inquiry Lift', value: '+42% Increase' },
        { label: 'Core Web Vitals', value: '0.85s FCP' },
        { label: 'Geography', value: 'Ontario, Canada' },
        { label: 'Status', value: 'Active Live Platform' }
      ]
    },
    'lifero': {
      title: 'Digitizing Patient Journeys & Automated Telehealth Workflows',
      client: '2025 • Lifero Clinics • Healthcare & SaaS',
      image: 'assets/lifero.png',
      liveUrl: 'https://liferoclinics.com/hair-treatment/',
      overview: 'Clinical medical web platform for a top healthcare institution in Pune. Features streamlined treatment exploration, before/after showcases, and direct consultation scheduling.',
      challenge: 'Patients found traditional medical websites hard to navigate on mobile devices, leading to high drop-offs and poor consultation bookings.',
      solution: 'Engineered an intuitive mobile-first treatment portal with WhatsApp booking and automated appointment slotting.',
      stats: [
        { label: 'Patient Bookings', value: '+180% In 30 Days' },
        { label: 'Lighthouse Score', value: '98/100 Mobile' },
        { label: 'Compliance', value: 'HIPAA & Telehealth' },
        { label: 'Location', value: 'Pune, Maharashtra' }
      ]
    },
    'primalfa': {
      title: 'Scaling Pandawa’s Retail Operations with Modern Commerce',
      client: '2024 • Primalfa Retail • E-Commerce & Retail',
      image: 'assets/primalfa.png',
      liveUrl: 'https://primalfa.com/',
      overview: 'Complete commercial storefront engineered with bespoke catalog navigation, streamlined 3-step checkout, and seamless inventory synchronization.',
      challenge: 'Creating a modern, brand-aligned shopping experience with seamless inventory navigation and secure payment checkout.',
      solution: 'Engineered lightweight storefront templates, integrated payment gateways, and optimized product media for instant mobile browsing.',
      stats: [
        { label: 'Checkout Speed', value: '3 Steps' },
        { label: 'Platform Uptime', value: '99.98%' },
        { label: 'Deliverable', value: 'Full E-Commerce' },
        { label: 'Status', value: 'Active Live Commercial' }
      ]
    }
  };

  const modalOverlay = document.getElementById('case-study-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalClient = document.getElementById('modal-client');
  const modalImg = document.getElementById('modal-img');
  const modalSpecs = document.getElementById('modal-specs');
  const modalOverview = document.getElementById('modal-overview');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalSolution = document.getElementById('modal-solution');
  const modalLiveBtn = document.getElementById('modal-live-btn');

  function openProjectModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data || !modalOverlay) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalClient) modalClient.textContent = data.client;
    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = data.title;
    }
    if (modalOverview) modalOverview.textContent = data.overview;
    if (modalChallenge) modalChallenge.textContent = data.challenge;
    if (modalSolution) modalSolution.textContent = data.solution;

    if (modalLiveBtn) {
      if (data.liveUrl && data.liveUrl !== '#') {
        modalLiveBtn.href = data.liveUrl;
        modalLiveBtn.style.display = 'inline-flex';
      } else {
        modalLiveBtn.style.display = 'none';
      }
    }

    if (modalSpecs) {
      modalSpecs.innerHTML = '';
      data.stats.forEach(s => {
        const card = document.createElement('div');
        card.className = 'modal-spec-card';
        card.innerHTML = `
          <div class="modal-spec-label">${s.label}</div>
          <div class="modal-spec-value">${s.value}</div>
        `;
        modalSpecs.appendChild(card);
      });
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  document.querySelectorAll('.btn-inspect').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeMobileDrawer();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    updateHorizontalScroll();
  }, { passive: true });

})();
