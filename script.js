(() => {
  'use strict';

  /* ==========================================================================
     1. Live Philippines Clock (IST) & Date Meta
     ========================================================================== */
  const clockElement = document.querySelector('#live-clock');
  const dateMetaElement = document.querySelector('#current-date-meta');

  const updateClock = () => {
    const now = new Date();
    if (clockElement) {
      try {
        const options = {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
        clockElement.textContent = `${formatted} PHT`;
      } catch (e) {
        clockElement.textContent = now.toLocaleTimeString();
      }
    }
    if (dateMetaElement) {
      const options = { month: 'long', year: 'numeric', day: 'numeric' };
      dateMetaElement.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  /* ==========================================================================
     3. Day-of-Week Mood Decoration
     ========================================================================== */
  const moodDecorations = [
    { name: 'Study Focus', file: 'images/decorations/candlelight_dark.png', mood: 'Sunday study & weekly preparation' },
    { name: 'Lecture Focus', file: 'images/decorations/candlelight_dark.png', mood: 'Monday engineering lectures & problem solving' },
    { name: 'Lab Focus', file: 'images/decorations/candlelight_dark.png', mood: 'Tuesday laboratory & practical experiments' },
    { name: 'Coding Focus', file: 'images/decorations/candlelight_dark.png', mood: 'Wednesday programming & software practice' },
    { name: 'Hardware Focus', file: 'images/decorations/candlelight_dark.png', mood: 'Thursday computer systems & logic analysis' },
    { name: 'Academic Focus', file: 'images/decorations/candlelight_dark.png', mood: 'Friday coursework & project collaboration' },
    { name: 'Learning Focus', file: 'images/decorations/candlelight_dark.png', mood: 'Saturday self-study & engineering exploration' }
  ];

  const moodBadge = document.querySelector('#mood-badge');
  if (moodBadge) {
    const day = new Date().getDay();
    const item = moodDecorations[day] || moodDecorations[1];
    const img = moodBadge.querySelector('img');
    const label = moodBadge.querySelector('.mood-text');
    if (img) {
      img.src = item.file;
      img.alt = item.name;
    }
    if (label) {
      label.textContent = item.mood;
    }
  }

  /* ==========================================================================
     4. Mobile Navigation Drawer Toggle
     ========================================================================== */
  const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
  const mobileNavDrawer = document.querySelector('#mobile-nav-drawer');
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('is-open');
    });
  }

  /* ==========================================================================
     5. Work Experience Accordion
     ========================================================================== */
  document.querySelectorAll('.exp-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      const targetId = btn.getAttribute('aria-controls');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.hidden = isExpanded;
      }
    });
  });

  /* ==========================================================================
     6. Project Modal Lightbox (art-dialog from canvas-design)
     ========================================================================== */
  const artDialog = document.querySelector('#art-dialog');
  if (artDialog && typeof artDialog.showModal === 'function') {
    document.querySelectorAll('[data-dialog-trigger]').forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        const data = trigger.dataset;
        const titleEl = artDialog.querySelector('#dialog-title');
        const descEl = artDialog.querySelector('#dialog-desc');
        const imgEl = artDialog.querySelector('#dialog-img');
        const tagsEl = artDialog.querySelector('#dialog-tags');
        const statsEl = artDialog.querySelector('#dialog-stats');
        const liveLink = artDialog.querySelector('#dialog-live');
        const repoLink = artDialog.querySelector('#dialog-repo');
        const fullviewLink = artDialog.querySelector('#dialog-fullview');

        if (titleEl) titleEl.textContent = data.title || 'Project';
        if (descEl) descEl.textContent = data.desc || '';
        if (imgEl) {
          imgEl.src = data.banner || '';
          imgEl.alt = data.title || 'Folio visual';
        }
        if (fullviewLink) {
          if (data.banner) {
            fullviewLink.href = data.banner;
            fullviewLink.style.display = 'inline-flex';
          } else {
            fullviewLink.style.display = 'none';
          }
        }
        if (tagsEl) {
          tagsEl.innerHTML = '';
          const tags = (data.tech || '').split(',').map(t => t.trim()).filter(Boolean);
          tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tech-pill';
            span.textContent = tag;
            tagsEl.appendChild(span);
          });
        }
        if (statsEl) {
          statsEl.textContent = data.stats || '';
          statsEl.style.display = data.stats ? 'block' : 'none';
        }
        if (liveLink) {
          if (data.live) {
            liveLink.href = data.live;
            liveLink.style.display = 'inline-flex';
          } else {
            liveLink.style.display = 'none';
          }
        }
        if (repoLink) {
          if (data.github) {
            repoLink.href = data.github;
            repoLink.style.display = 'inline-flex';
          } else {
            repoLink.style.display = 'none';
          }
        }

        artDialog.showModal();
      });
    });

    const closeBtn = artDialog.querySelector('.dialog-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => artDialog.close());
    }

    artDialog.addEventListener('click', e => {
      const rect = artDialog.getBoundingClientRect();
      if (
        e.target === artDialog &&
        (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)
      ) {
        artDialog.close();
      }
    });
  }

  /* ==========================================================================
     7. Project Category Filter
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.style.backgroundColor = 'transparent';
          b.style.color = 'var(--color-ink)';
          b.style.borderColor = 'rgba(15, 15, 17, 0.2)';
        });
        btn.style.backgroundColor = 'var(--color-ink)';
        btn.style.color = 'var(--color-paper)';
        btn.style.borderColor = 'var(--color-ink)';

        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     8. Signature Canvas Ink / Pencil Trail (Faithfully from canvas-design)
        Marks as you write/move the cursor and slowly fades away
     ========================================================================== */
  const trailCanvas = document.querySelector('#ink-trail');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const ctx = trailCanvas?.getContext('2d');
  let segments = [];
  let lastPoint = null;
  let trailFrame = 0;
  const lifetime = 750; // Slowly fades away

  const resizeTrail = () => {
    if (!ctx || !trailCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    trailCanvas.width = Math.round(window.innerWidth * dpr);
    trailCanvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    segments = [];
    lastPoint = null;
  };

  let particles = [];

  const spawnPixelSparks = (x, y) => {
    if (motionQuery.matches) return;
    const count = 6 + Math.floor(Math.random() * 4);
    const now = performance.now();
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.2 + Math.random() * 2.8;
      particles.push({
        x: Math.round(x / 2) * 2,
        y: Math.round(y / 2) * 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8,
        size: Math.random() > 0.5 ? 4 : 3,
        isAccent: Math.random() > 0.4,
        life: 400 + Math.random() * 250,
        born: now
      });
    }
    if (particles.length > 50) particles = particles.slice(-50);
    if (!trailFrame) trailFrame = requestAnimationFrame(paintTrail);
  };

  const paintTrail = now => {
    trailFrame = 0;
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    segments = segments.filter(seg => now - seg.time < lifetime);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    for (const seg of segments) {
      const age = now - seg.time;
      const progress = age / lifetime;
      // Quantize fading into discrete 8-bit pixel opacity steps
      const steppedAlpha = Math.max(0, Math.ceil((1 - progress) * 4) / 4);
      if (steppedAlpha <= 0) continue;

      const pSize = steppedAlpha > 0.5 ? 4 : (steppedAlpha > 0.25 ? 3 : 2);

      // Continuous pixel interpolation between points (no empty gaps)
      const dx = seg.x2 - seg.x1;
      const dy = seg.y2 - seg.y1;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / 4));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = Math.round((seg.x1 + dx * t) / 4) * 4;
        const y = Math.round((seg.y1 + dy * t) / 4) * 4;

        if (isDark) {
          ctx.fillStyle = `rgba(255, 255, 255, ${steppedAlpha * 0.45})`;
        } else {
          ctx.fillStyle = `rgba(28, 28, 28, ${steppedAlpha * 0.38})`;
        }
        ctx.fillRect(x, y, pSize, pSize);
      }
    }

    // Paint square 8-bit pixel sparks on click
    particles = particles.filter(p => now - p.born < p.life);
    for (const p of particles) {
      const progress = (now - p.born) / p.life;
      const steppedAlpha = Math.max(0, Math.ceil((1 - progress) * 4) / 4);
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // stepped gravity
      p.vx *= 0.94; // friction

      const px = Math.round(p.x / 2) * 2;
      const py = Math.round(p.y / 2) * 2;
      if (isDark) {
        ctx.fillStyle = p.isAccent
          ? `rgba(96, 165, 250, ${steppedAlpha * 0.9})`
          : `rgba(255, 255, 255, ${steppedAlpha * 0.85})`;
      } else {
        ctx.fillStyle = p.isAccent
          ? `rgba(185, 28, 28, ${steppedAlpha * 0.85})`
          : `rgba(28, 28, 28, ${steppedAlpha * 0.8})`;
      }
      ctx.fillRect(px, py, p.size, p.size);
    }

    if (segments.length > 0 || particles.length > 0) {
      trailFrame = requestAnimationFrame(paintTrail);
    }
  };

  const clearTrail = () => {
    if (trailFrame) cancelAnimationFrame(trailFrame);
    trailFrame = 0;
    segments = [];
    particles = [];
    lastPoint = null;
    ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  if (ctx && trailCanvas) {
    resizeTrail();
    window.addEventListener('resize', resizeTrail);

    document.addEventListener('pointermove', event => {
      if (
        motionQuery.matches ||
        !finePointer.matches ||
        event.pointerType !== 'mouse' ||
        event.target.closest('#drawing-pad')
      ) {
        lastPoint = null;
        return;
      }

      const now = performance.now();
      const pt = { x: event.clientX, y: event.clientY, time: now };

      if (lastPoint && now - lastPoint.time < 90 && Math.hypot(pt.x - lastPoint.x, pt.y - lastPoint.y) < 160) {
        segments.push({
          x1: lastPoint.x,
          y1: lastPoint.y,
          x2: pt.x,
          y2: pt.y,
          time: now,
          jitter: (Math.random() - 0.5) * 2.8
        });
        if (segments.length > 140) segments.shift();
        if (!trailFrame) trailFrame = requestAnimationFrame(paintTrail);
      }
      lastPoint = pt;
    }, { passive: true });

    document.addEventListener('pointerdown', event => {
      if (
        motionQuery.matches ||
        event.target.closest('#drawing-pad')
      ) return;
      spawnPixelSparks(event.clientX, event.clientY);
    }, { passive: true });

    document.documentElement.addEventListener('pointerleave', () => { lastPoint = null; });
    document.addEventListener('visibilitychange', () => { if (document.hidden) clearTrail(); });
  }

  /* ==========================================================================
     8b. Animated 8-Bit Pixel Cursor & Targeting Reticle
     ========================================================================== */
  const pixelCursor = document.createElement('div');
  pixelCursor.className = 'pixel-cursor';
  pixelCursor.setAttribute('aria-hidden', 'true');
  pixelCursor.innerHTML = `
    <svg viewBox="0 0 32 32" shape-rendering="crispEdges">
      <!-- 4 Pixel Corner Brackets -->
      <path fill="currentColor" d="M3 3h8v2H5v6H3V3zm18 0h8v8h-2V5h-6V3zM3 21h2v6h6v2H3v-8zm24 6v-6h2v8h-8v-2h6z"/>
      <!-- Pixel Crosshair Ticks -->
      <rect x="15" y="7" width="2" height="4" fill="currentColor"/>
      <rect x="15" y="21" width="2" height="4" fill="currentColor"/>
      <rect x="7" y="15" width="4" height="2" fill="currentColor"/>
      <rect x="21" y="15" width="4" height="2" fill="currentColor"/>
      <!-- Center Pixel Dot -->
      <rect x="14" y="14" width="4" height="4" fill="currentColor"/>
    </svg>
  `;
  document.body.append(pixelCursor);

  let curX = 0, curY = 0, targetX = 0, targetY = 0;
  let cursorRunning = false;

  const updateCursorPos = () => {
    curX += (targetX - curX) * 0.35;
    curY += (targetY - curY) * 0.35;
    pixelCursor.style.left = `${Math.round(curX)}px`;
    pixelCursor.style.top = `${Math.round(curY)}px`;

    if (Math.abs(targetX - curX) > 0.4 || Math.abs(targetY - curY) > 0.4) {
      requestAnimationFrame(updateCursorPos);
    } else {
      cursorRunning = false;
    }
  };

  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || motionQuery.matches || event.pointerType !== 'mouse') return;
    targetX = event.clientX;
    targetY = event.clientY;

    pixelCursor.classList.add('is-active');

    const clickable = event.target.closest('a, button, input, textarea, select, [role="button"], .cert-thumb-wrapper, .tool-btn, .clickable, [data-dialog-trigger]');
    pixelCursor.classList.toggle('is-hovering', Boolean(clickable && !clickable.disabled));

    if (!cursorRunning) {
      cursorRunning = true;
      requestAnimationFrame(updateCursorPos);
    }
  }, { passive: true });

  document.addEventListener('pointerdown', () => {
    pixelCursor.classList.add('is-clicking');
  });

  document.addEventListener('pointerup', () => {
    pixelCursor.classList.remove('is-clicking');
  });

  document.documentElement.addEventListener('pointerleave', () => {
    pixelCursor.classList.remove('is-active', 'is-hovering', 'is-clicking');
  });

  /* ==========================================================================
     9. Interactive Sketch Drawing Pad (canvas-design About page studio)
     ========================================================================== */
  const pad = document.querySelector('#drawing-pad');
  const padContext = pad?.getContext('2d');
  if (padContext) {
    let drawing = false;
    let previous = null;
    let activePointer = null;
    const wrapper = pad.parentElement;
    const status = document.querySelector('.pad-status');

    const resizePad = () => {
      const snapshot = document.createElement('canvas');
      snapshot.width = pad.width;
      snapshot.height = pad.height;
      if (pad.width && pad.height) snapshot.getContext('2d').drawImage(pad, 0, 0);

      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      pad.width = Math.round(rect.width * dpr);
      pad.height = Math.round(rect.height * dpr);
      padContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (snapshot.width && snapshot.height) {
        padContext.drawImage(snapshot, 0, 0, rect.width, rect.height);
      }
      drawing = false;
      previous = null;
      activePointer = null;
    };

    const position = event => {
      const rect = pad.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const draw = (from, to, pressure) => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const strokeColor = isDark ? '#f4f4f6' : '#0f0f11';
      padContext.strokeStyle = strokeColor;
      padContext.fillStyle = strokeColor;
      padContext.lineWidth = 1.4 + pressure * 1.5;
      padContext.lineCap = 'round';
      padContext.lineJoin = 'round';

      if (from.x === to.x && from.y === to.y) {
        padContext.beginPath();
        padContext.arc(to.x, to.y, 1.2, 0, Math.PI * 2);
        padContext.fill();
      } else {
        padContext.beginPath();
        padContext.moveTo(from.x, from.y);
        padContext.lineTo(to.x, to.y);
        padContext.stroke();
      }
    };

    resizePad();
    new ResizeObserver(resizePad).observe(wrapper);

    pad.addEventListener('pointerdown', event => {
      if (activePointer !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
      activePointer = event.pointerId;
      drawing = true;
      previous = position(event);
      pad.setPointerCapture(event.pointerId);
      draw(previous, previous, event.pressure || 0.5);
      wrapper.classList.add('has-drawing');
      if (status) status.textContent = '';
    });

    pad.addEventListener('pointermove', event => {
      if (!drawing || event.pointerId !== activePointer) return;
      const point = position(event);
      draw(previous, point, event.pressure || 0.5);
      previous = point;
    });

    const stopDrawing = event => {
      if (event.pointerId === activePointer) {
        drawing = false;
        previous = null;
        activePointer = null;
      }
    };

    pad.addEventListener('pointerup', stopDrawing);
    pad.addEventListener('pointercancel', stopDrawing);
    pad.addEventListener('lostpointercapture', stopDrawing);

    document.querySelector('#clear-pad')?.addEventListener('click', () => {
      padContext.clearRect(0, 0, pad.width, pad.height);
      wrapper.classList.remove('has-drawing');
      if (status) status.textContent = 'A fresh page, ready for a new stroke.';
    });

    document.querySelector('#save-pad')?.addEventListener('click', () => {
      if (!wrapper.classList.contains('has-drawing')) {
        if (status) status.textContent = 'Draw a line or sketch first, then save.';
        return;
      }
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = pad.width;
      exportCanvas.height = pad.height;
      const expCtx = exportCanvas.getContext('2d');
      expCtx.fillStyle = '#f5f2eb';
      expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      expCtx.drawImage(pad, 0, 0);

      exportCanvas.toBlob(blob => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pia-sketchbook-${Date.now()}.png`;
        if (status) status.textContent = 'Your sketch was saved to downloads.';
      }, 'image/png');
    });
  } // End Section 9: Interactive Sketch Drawing Pad

  /* ==========================================================================
     10. The Wall (Pinning sketches & notes with LocalStorage & Owner Permissions)
     ========================================================================== */
  const initTheWall = () => {
    const wallContainer = document.querySelector('#wall-cards-container');
    const wallCountBadge = document.querySelector('#wall-count-badge');
    const pinBtn = document.querySelector('#pin-pad-btn');
    const authorInput = document.querySelector('#wall-author-name');
    const noteInput = document.querySelector('#wall-note-text');
    const wallOwnerBtn = document.querySelector('#wall-owner-btn');
    const ownerBtnText = document.querySelector('#owner-btn-text');
    const ownerStatusBadge = document.querySelector('#owner-status-badge');
    const resetWallBtn = document.querySelector('#reset-wall-btn');
    const status = document.querySelector('.pad-status');

    // Preset seed pins (curated welcome & peer notes exclusively for Pia's portfolio)
    const defaultPins = [
      {
        id: 'seed-pia',
        author: 'Pia Macabangon',
        role: 'BS CpE Senior',
        caption: 'Welcome to my engineering wall! Leave a doodle, a circuit sketch, or your greetings.',
        date: 'Host Note',
        theme: 'theme-burgundy',
        drawingText: 'Welcome! ☕',
        drawingBg: '#ffffff',
        drawingColor: '#7a1c2c'
      },
      {
        id: 'seed-peer',
        author: 'Fellow Engineer',
        role: 'Visitor',
        caption: 'Great work on the dual-spooling printing kiosk and sensor telemetry!',
        date: 'Recent',
        theme: 'theme-darkgreen',
        drawingText: 'Nice Capstone! 💡',
        drawingBg: '#ffffff',
        drawingColor: '#0b2f24'
      },
      {
        id: 'seed-iot',
        author: 'Tech Visitor',
        role: 'Visitor',
        caption: 'The AquaSense Proteus telemetry simulation looks super clean.',
        date: 'Recent',
        theme: 'theme-blue',
        drawingText: 'AquaSense ⚡',
        drawingBg: '#000000',
        drawingColor: '#38bdf8'
      }
    ];

    // Helper: IDs of pins created in this browser session/client
    const getMyPinIds = () => {
      try {
        const stored = localStorage.getItem('pia-my-pins');
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    };

    const addMyPinId = (id) => {
      try {
        const ids = getMyPinIds();
        if (!ids.includes(id)) {
          ids.push(id);
          localStorage.setItem('pia-my-pins', JSON.stringify(ids));
        }
      } catch (e) {}
    };

    const removeMyPinId = (id) => {
      try {
        const ids = getMyPinIds().filter(i => i !== id);
        localStorage.setItem('pia-my-pins', JSON.stringify(ids));
      } catch (e) {}
    };

    // Helper: Owner mode check
    const isOwnerActive = () => {
      try {
        return localStorage.getItem('pia-is-owner') === 'true';
      } catch (e) {
        return false;
      }
    };

    const getStoredPins = () => {
      try {
        const stored = localStorage.getItem('pia-wall-pins');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
      return defaultPins;
    };

    const renderWall = () => {
      if (!wallContainer) return;
      const pins = getStoredPins();
      const myPinIds = getMyPinIds();
      const isOwner = isOwnerActive();

      if (wallCountBadge) {
        wallCountBadge.textContent = `${pins.length} PIN${pins.length === 1 ? '' : 'S'} ON THE WALL`;
      }

      // Update Owner UI states
      if (ownerStatusBadge) {
        ownerStatusBadge.style.display = isOwner ? 'inline-flex' : 'none';
      }
      if (resetWallBtn) {
        resetWallBtn.style.display = isOwner ? 'inline-flex' : 'none';
      }
      if (ownerBtnText) {
        ownerBtnText.textContent = isOwner ? '🔓 Exit Owner' : '🔒 Owner Access';
      }

      wallContainer.innerHTML = '';
      pins.forEach((pin, index) => {
        const card = document.createElement('div');
        card.className = `wall-pin-card is-inview ${pin.theme || 'theme-slate'}`;

        const isMyPin = myPinIds.includes(pin.id);
        const canDelete = isOwner || isMyPin;

        let canvasContent = '';
        if (pin.image) {
          canvasContent = `<img class="wall-card-img" src="${pin.image}" alt="Sketch by ${pin.author}" />`;
        } else if (pin.drawingHeart) {
          canvasContent = `
            <svg width="60" height="60" viewBox="0 0 24 24" fill="${pin.drawingColor || '#3b1b54'}">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>`;
        } else if (pin.drawingText) {
          const fontSize = pin.drawingText.length > 15 ? '1.15rem' : pin.drawingText.length > 8 ? '1.65rem' : '2.35rem';
          const isDarkSlate = pin.drawingBg === '#000000';
          const textColor = pin.drawingColor || (isDarkSlate ? '#ffffff' : '#1c1c1c');
          canvasContent = `<span class="wall-card-drawing-text" style="font-family: var(--font-display); font-size: ${fontSize}; font-style: italic; color: ${textColor}; font-weight: 600; text-align: center; padding: 0.5rem; line-height: 1.25; word-break: break-word;">${pin.drawingText}</span>`;
        }

        const initial = (pin.author || 'P').charAt(0).toUpperCase();

        let deleteBtnHtml = '';
        if (canDelete) {
          const deleteTitle = isOwner && !isMyPin ? 'Owner Delete: Remove pin' : 'Delete your doodle';
          const deleteClass = isOwner && !isMyPin ? 'owner-pin-delete' : 'my-pin-delete';
          deleteBtnHtml = `<button class="wall-card-delete-btn ${deleteClass}" type="button" data-index="${index}" data-id="${pin.id}" title="${deleteTitle}">✕</button>`;
        }

        let myPinBadgeHtml = isMyPin ? `<span class="my-pin-tag">YOUR PIN</span>` : '';

        card.innerHTML = `
          ${myPinBadgeHtml}
          ${deleteBtnHtml}
          <div class="wall-card-canvas-box ${pin.drawingBg === '#000000' ? 'dark-slate' : ''}">
            ${canvasContent}
          </div>
          <p class="wall-card-caption">${pin.caption || 'A sketch left on The Wall.'}</p>
          <div class="wall-card-footer">
            <div class="wall-card-avatar">${initial}</div>
            <div class="wall-card-meta">
              <span class="wall-card-author">${pin.author || 'Anonymous'}</span>
              <span class="wall-card-date">${pin.date || 'Recent'}</span>
            </div>
          </div>
        `;

        wallContainer.appendChild(card);
      });

      // Attach delete click handlers with proper confirmation
      wallContainer.querySelectorAll('.wall-card-delete-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.index, 10);
          const pinId = btn.dataset.id;
          const currentPins = getStoredPins();
          const targetPin = currentPins[idx];
          if (!targetPin) return;

          const isMyPin = myPinIds.includes(pinId);

          let confirmMsg = 'Are you sure you want to delete your doodle from The Wall?';
          if (isOwner && !isMyPin) {
            confirmMsg = `Owner Moderation: Are you sure you want to remove the pin by "${targetPin.author || 'Visitor'}"?`;
          }

          if (window.confirm(confirmMsg)) {
            currentPins.splice(idx, 1);
            try {
              localStorage.setItem('pia-wall-pins', JSON.stringify(currentPins));
            } catch (err) {}
            removeMyPinId(pinId);
            renderWall();
            if (status) status.textContent = isOwner && !isMyPin ? 'Pin removed by Owner.' : 'Your doodle was removed from The Wall.';
          }
        });
      });
    };

    renderWall();

    // Owner Access Button toggle handler
    if (wallOwnerBtn) {
      wallOwnerBtn.addEventListener('click', () => {
        if (isOwnerActive()) {
          try {
            localStorage.removeItem('pia-is-owner');
          } catch (e) {}
          renderWall();
          if (status) status.textContent = 'Owner mode deactivated. Switched to visitor view.';
        } else {
          const pass = window.prompt('Enter Website Owner Passcode (for Pia):');
          if (pass && (pass.trim().toLowerCase() === 'pia2026' || pass.trim().toLowerCase() === 'pia')) {
            try {
              localStorage.setItem('pia-is-owner', 'true');
            } catch (e) {}
            renderWall();
            alert('👑 Owner Mode activated! You now have full moderation controls and can reset or delete any pin.');
          } else if (pass !== null) {
            alert('Incorrect passcode. Owner mode requires Pia\'s passcode.');
          }
        }
      });
    }

    // Reset Wall button handler (Protected: Owner Only)
    if (resetWallBtn) {
      resetWallBtn.addEventListener('click', () => {
        if (!isOwnerActive()) {
          alert('Only the website owner can reset The Wall.');
          return;
        }
        if (window.confirm('Owner Action: Are you sure you want to reset all pins to default? This will clear all visitor pins.')) {
          try {
            localStorage.removeItem('pia-wall-pins');
          } catch (e) {}
          renderWall();
          if (status) status.textContent = 'The Wall has been reset to default pins by Owner.';
        }
      });
    }

    if (pinBtn) {
      pinBtn.addEventListener('click', () => {
        const pad = document.querySelector('#drawing-pad');
        const padContext = pad?.getContext('2d');
        const wrapper = pad?.parentElement;
        const author = authorInput?.value.trim() || 'Fellow Engineer';
        const note = noteInput?.value.trim() || 'Left a sketch on The Wall!';
        const hasDrawing = wrapper ? wrapper.classList.contains('has-drawing') : false;

        let imageData = '';
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (hasDrawing && pad && padContext) {
          const exportCanvas = document.createElement('canvas');
          exportCanvas.width = pad.width;
          exportCanvas.height = pad.height;
          const expCtx = exportCanvas.getContext('2d');
          expCtx.fillStyle = isDark ? '#0e0e12' : '#fbf9f4';
          expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
          expCtx.drawImage(pad, 0, 0);
          imageData = exportCanvas.toDataURL('image/png');
        }

        const themes = ['theme-darkgreen', 'theme-blue', 'theme-purple', 'theme-burgundy', 'theme-slate'];
        const chosenTheme = themes[Math.floor(Math.random() * themes.length)];

        const pinId = `pin-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

        const newPin = {
          id: pinId,
          author: author,
          caption: note,
          date: 'Just now',
          theme: chosenTheme,
          image: imageData,
          drawingText: hasDrawing ? '' : `Sketch by ${author}`,
          drawingBg: isDark ? '#000000' : '#ffffff',
          drawingColor: isDark ? '#ffffff' : '#1c1c1c'
        };

        const existing = getStoredPins();
        existing.unshift(newPin);

        try {
          localStorage.setItem('pia-wall-pins', JSON.stringify(existing));
        } catch (e) {}

        // Record this pin as created by THIS visitor so only they can delete it
        addMyPinId(pinId);

        renderWall();

        // Clear input and drawing slate
        if (padContext && pad) {
          padContext.clearRect(0, 0, pad.width, pad.height);
        }
        if (wrapper) {
          wrapper.classList.remove('has-drawing');
        }
        if (authorInput) authorInput.value = '';
        if (noteInput) noteInput.value = '';
        if (status) status.textContent = '✨ Your sketch was successfully pinned on The Wall!';

        const origHtml = pinBtn.innerHTML;
        pinBtn.innerHTML = '<span>Pinned to Wall! ✨</span>';
        setTimeout(() => { pinBtn.innerHTML = origHtml; }, 2000);

        // Scroll smoothly to newly pinned item
        setTimeout(() => {
          document.querySelector('#wall-cards-container')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      });
    }
  };
  initTheWall();

  /* ==========================================================================
     11. Scroll-Triggered Hand-Drawn Sketch Animation Engine
     ========================================================================== */
    const initSketchAnimations = () => {
      // Inject authentic organic SVG sketch underline to key headline highlights
      const headlineItalics = document.querySelectorAll(
        '.section-headline .display-italic, .wall-main-title .wall-title-accent, .hero-headline .display-italic'
      );

      headlineItalics.forEach((el, index) => {
        if (el.querySelector('.sketch-underline-svg')) return;
        el.classList.add('has-sketch-underline');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'sketch-underline-svg');
        svg.setAttribute('viewBox', '0 0 200 14');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('aria-hidden', 'true');

        // Organic natural pencil curve variations
        const waves = [
          'M 2,9 Q 50,3 100,8 Q 150,13 198,6',
          'M 2,10 Q 55,4 105,9 Q 155,14 198,7',
          'M 3,8 Q 48,2 98,7 Q 148,12 197,5'
        ];
        const pathD = waves[index % waves.length];

        svg.innerHTML = `<path class="sketch-path" d="${pathD}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
        el.appendChild(svg);
      });

      // Target signature SVG in about.html if present
      document.querySelectorAll('.section-editorial svg path').forEach(path => {
        const parent = path.closest('svg');
        if (parent && parent.getAttribute('viewBox') === '0 0 130 30') {
          path.classList.add('sketch-path');
        }
      });

      // Scroll Pop-Up Animation for Details
      const targets = document.querySelectorAll(
        '.miggs-project-card, .cert-card-miggs, .miggs-accordion-item, .miggs-stack-item, .miggs-pixel-tokens-strip, .drawing-pad-container, .pad-controls-extended, .wall-pin-card, .miggs-contact-grid, .miggs-section-header, .section-editorial, .hero-section, .connect-section, .project-card, .profile-folio-card, .the-wall-section, .skill-tile, .experience-item, .wall-header-center, .section-header-grid, .connect-card'
      );

      const revealTarget = (target) => {
        if (!target || target.classList.contains('is-inview')) return;
        target.classList.add('is-inview');
        target.querySelectorAll('.sketch-path').forEach(p => p.classList.add('drawn'));
        target.querySelectorAll('.eyebrow-line').forEach(line => line.classList.add('drawn'));
      };

      const checkInView = () => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        targets.forEach(target => {
          if (target.classList.contains('is-inview')) return;
          const rect = target.getBoundingClientRect();
          // Trigger when top of element enters within 88% of viewport
          if (rect.top <= vh * 0.92 && rect.bottom >= -50) {
            revealTarget(target);
          }
        });
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              revealTarget(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.05,
          rootMargin: '120px 0px 40px 0px'
        });

        targets.forEach(target => {
          observer.observe(target);
        });
      }

      // Initial check on load and attach passive scroll listener as bulletproof trigger
      checkInView();
      window.addEventListener('scroll', checkInView, { passive: true });
      window.addEventListener('resize', checkInView, { passive: true });
    };

    initSketchAnimations();

    /* ==========================================================================
       12. Ambient Animated Storyboard Background (Removed)
       ========================================================================== */

    /* ==========================================================================
       13. Button Click Pop-Up Tactile Transition
       ========================================================================== */
    document.addEventListener('pointerup', event => {
      const btn = event.target.closest(
        'button, .btn-commission, .pad-btn, .social-pill, .filter-btn, .sketch-button, .exp-toggle-btn, .btn-pin-scroll'
      );
      if (btn) {
        btn.classList.remove('btn-popped');
        void btn.offsetWidth;
        btn.classList.add('btn-popped');
        setTimeout(() => btn.classList.remove('btn-popped'), 880);
      }
    }, { passive: true });

    /* ==========================================================================
       14. Live Typewriter / Writing Animation for Index Hero Bio
       ========================================================================== */
    const heroLead = document.querySelector('.hero-lead');
    if (heroLead && !motionQuery.matches && heroLead.textContent.includes('4th Year')) {
      const textNodes = [];
      const walk = document.createTreeWalker(heroLead, NodeFilter.SHOW_TEXT, null, false);
      let n;
      while ((n = walk.nextNode())) {
        if (n.nodeValue.length > 0) {
          textNodes.push(n);
        }
      }

      const charSpans = [];
      for (const node of textNodes) {
        const parent = node.parentNode;
        const text = node.nodeValue;
        const frag = document.createDocumentFragment();
        for (const ch of text) {
          const span = document.createElement('span');
          span.className = 'type-char';
          span.textContent = ch;
          frag.appendChild(span);
          charSpans.push(span);
        }
        parent.replaceChild(frag, node);
      }

      const cursor = document.createElement('span');
      cursor.className = 'writing-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      heroLead.appendChild(cursor);

      let idx = 0;
      const typeNext = () => {
        if (idx < charSpans.length) {
          const span = charSpans[idx++];
          span.classList.add('is-typed');
          span.after(cursor);

          let delay = 16;
          const ch = span.textContent;
          if (ch === '.' || ch === ',') {
            delay = 140;
          } else if (ch === ' ') {
            delay = 24;
          } else {
            delay = 13 + Math.random() * 14;
          }
          setTimeout(typeNext, delay);
        } else {
          setTimeout(() => {
            cursor.classList.add('is-done');
            setTimeout(() => cursor.remove(), 700);
          }, 2200);
        }
      };

      setTimeout(typeNext, 450);
    }

    /* ==========================================================================
       15. miggs.dev Bottom Scroll Progress Bar Tracker
       ========================================================================== */
    const progressFill = document.querySelector('#progress-fill');
    const progressPct = document.querySelector('#progress-percent');

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      
      if (progressFill) {
        progressFill.style.width = `${progress}%`;
      }
      if (progressPct) {
        progressPct.textContent = `${Math.round(progress)}%`;
      }
    };

    /* ==========================================================================
       16. miggs.dev Technical Stack Bar Scroll Animation
       ========================================================================== */
    const stackBars = document.querySelectorAll('.miggs-stack-fill');
    if (stackBars.length > 0) {
      if ('IntersectionObserver' in window) {
        const stackObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const level = el.dataset.level || '80%';
              el.style.width = '0%';
              requestAnimationFrame(() => {
                setTimeout(() => {
                  el.style.width = level;
                }, 120);
              });
              stackObserver.unobserve(el);
            }
          });
        }, { threshold: 0.15 });

        stackBars.forEach(bar => stackObserver.observe(bar));
      }
    }

    /* ==========================================================================
       18. miggs.dev Pixel Mascot Character Sprite Animation
       ========================================================================== */
    const companion = document.querySelector('#miggs-companion');
    if (companion) {
      const frames = {
        rest: companion.querySelector('#frame-rest'),
        walk1: companion.querySelector('#frame-walk-1'),
        walk2: companion.querySelector('#frame-walk-2'),
        walk3: companion.querySelector('#frame-walk-3'),
        walk4: companion.querySelector('#frame-walk-4'),
        walk5: companion.querySelector('#frame-walk-5'),
        crouch: companion.querySelector('#frame-crouch'),
        leap: companion.querySelector('#frame-leap'),
      };

      const walkSequence = ['walk1', 'walk2', 'walk3', 'walk4', 'walk5'];
      let currentWalkIdx = 0;
      let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
      let scrollAccumulator = 0;
      const SCROLL_DISTANCE_PER_FRAME = 75; // Extra slow, calm pixel walk speed
      let scrollStopTimer = null;
      let isInteracting = false;
      let chatbotCtrl = null;

      const setFrame = (frameKey) => {
        Object.keys(frames).forEach(key => {
          if (frames[key]) {
            frames[key].style.display = key === frameKey ? 'block' : 'none';
          }
        });
      };

      const updateMascotPosition = (delta) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollRatio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

        const isMobile = window.innerWidth <= 768;
        const margin = isMobile ? 16 : 24;
        const mascotWidth = companion.offsetWidth || (isMobile ? 52 : 68);
        const maxTravel = Math.max(0, window.innerWidth - mascotWidth - (margin * 2));
        const currentX = margin + scrollRatio * maxTravel;

        companion.style.left = `${currentX}px`;
        companion.style.right = 'auto';

        if (chatbotCtrl && chatbotCtrl.isOpen()) {
          chatbotCtrl.updatePosition();
        }

        if (delta !== undefined && Math.abs(delta) > 0.5) {
          const svgEl = companion.querySelector('svg');
          if (svgEl) {
            svgEl.style.transform = delta >= 0 ? 'scaleX(1)' : 'scaleX(-1)';
          }

          scrollAccumulator += Math.abs(delta);

          // Advance walk cycle extra slowly as scroll distance accumulates
          if (scrollAccumulator >= SCROLL_DISTANCE_PER_FRAME) {
            const steps = Math.floor(scrollAccumulator / SCROLL_DISTANCE_PER_FRAME);
            currentWalkIdx = (currentWalkIdx + steps) % walkSequence.length;
            scrollAccumulator = scrollAccumulator % SCROLL_DISTANCE_PER_FRAME;
            setFrame(walkSequence[currentWalkIdx]);
          }

          clearTimeout(scrollStopTimer);
          scrollStopTimer = setTimeout(() => {
            if (!isInteracting) {
              setFrame('rest');
              scrollAccumulator = 0;
            }
          }, 350);
        }
      };

      /* ==========================================================================
         18b. Interactive Pixel Mascot Chatbot Terminal
         ========================================================================== */
      const initPixelChatbot = (companionEl) => {
        const chatbotContainer = document.querySelector('#pixel-chatbot');
        if (!chatbotContainer) return null;

        const messagesEl = document.querySelector('#pixel-chat-messages');
        const formEl = document.querySelector('#pixel-chat-form');
        const inputEl = document.querySelector('#pixel-chat-input');
        const clearBtn = document.querySelector('#pixel-chat-clear');
        const closeBtn = document.querySelector('#pixel-chat-close');
        const chips = document.querySelectorAll('.pixel-chip');

        let hasGreeted = false;

        const updateChatbotPosition = () => {
          if (!companionEl) return;
          const compRect = companionEl.getBoundingClientRect();
          const chatWidth = 380;
          const pad = 16;
          const winWidth = window.innerWidth;

          // Position chatbot so it floats neatly above the mascot's current position
          let targetLeft = compRect.left - 40;
          const maxLeft = winWidth - chatWidth - pad;
          if (targetLeft < pad) targetLeft = pad;
          if (targetLeft > maxLeft) targetLeft = maxLeft;

          chatbotContainer.style.left = `${targetLeft}px`;
        };

        const getTimeString = () => {
          const now = new Date();
          return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        const appendMessage = (sender, textHtml) => {
          if (!messagesEl) return;
          const msgDiv = document.createElement('div');
          msgDiv.className = `pixel-chat-msg ${sender}`;

          const bubbleDiv = document.createElement('div');
          bubbleDiv.className = 'pixel-msg-bubble';
          bubbleDiv.innerHTML = textHtml;

          const timeSpan = document.createElement('span');
          timeSpan.className = 'pixel-msg-time';
          timeSpan.textContent = getTimeString();

          msgDiv.appendChild(bubbleDiv);
          msgDiv.appendChild(timeSpan);
          messagesEl.appendChild(msgDiv);
          messagesEl.scrollTop = messagesEl.scrollHeight;
        };

        const showTypingIndicator = () => {
          if (!messagesEl) return null;
          const ind = document.createElement('div');
          ind.className = 'pixel-chat-msg bot pixel-msg-typing';
          ind.innerHTML = `
            <div class="pixel-msg-bubble pixel-typing-indicator">
              <span class="pixel-dot-bounce"></span>
              <span class="pixel-dot-bounce"></span>
              <span class="pixel-dot-bounce"></span>
            </div>
          `;
          messagesEl.appendChild(ind);
          messagesEl.scrollTop = messagesEl.scrollHeight;
          return ind;
        };

        /* Jokes collection */
        const techJokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "There are 10 types of people in the world: those who understand binary, and those who don't! 🤓",
          "Why did the microcontroller go to school? To improve its clock speed! ⏱️",
          "Hardware eventually fails; software eventually works. ⚡",
          "A SQL query walks into a bar, approaches two tables, and asks: <em>'Can I join you?'</em> 🍺",
          "An engineer, a physicist, and a software developer are in a car that stalls. The developer says: <em>'Let's all get out, close the doors, get back in, and see if it runs!'</em> 🚗",
          "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings! 😂",
          "What is an algorithm? A word used by programmers when they don't want to explain what they did! 🧠",
          "There is no place like <code>127.0.0.1</code>! 🏠",
          "Why do C++ developers wear glasses? Because they can't C#! 👓"
        ];

        /* Riddles collection */
        const techRiddles = [
          "🧩 <strong>Riddle</strong>: I have keys but no locks. I have space but no rooms. You can enter, but you can never leave. What am I?<br><br>👉 <em>Answer: A computer keyboard!</em> ⌨️",
          "🧩 <strong>Riddle</strong>: I am always running, but I have no legs. I execute instructions, but I have no hands. What am I?<br><br>👉 <em>Answer: A CPU (or a computer program)!</em> 💻",
          "🧩 <strong>Riddle</strong>: I connect billions of minds, hold the world's knowledge, and crash when an undersea cable gets bitten by a shark. What am I?<br><br>👉 <em>Answer: The Internet!</em> 🌐"
        ];

        const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

        /* Safe Arithmetic Evaluator */
        const tryEvaluateMath = (str) => {
          const cleaned = str
            .replace(/^(?:calculate|compute|solve|what is|what's|how much is)\s+/i, '')
            .replace(/[\?\=]/g, '')
            .trim();

          // Only accept digits, valid arithmetic symbols, and parentheses
          if (!/^[\d\.\s\+\-\*\/\%\^\(\)]+$/.test(cleaned)) return null;
          if (!/\d/.test(cleaned) || !/[\+\-\*\/\%\^]/.test(cleaned)) return null;

          try {
            const expr = cleaned.replace(/\^/g, '**');
            // Safe evaluation of mathematical token expression
            const val = Function(`'use strict'; return (${expr})`)();
            if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
              const rounded = Math.round(val * 100000) / 100000;
              return `🧮 <strong>Math Result</strong>:<br><code>${cleaned}</code> = <strong>${rounded}</strong>`;
            }
          } catch (e) {}
          return null;
        };

        /* Extensive Knowledge Base: Portfolio, Computer Engineering, Software, Science, Chit-Chat */
        const knowledgeBase = [
          /* --- Pia's Specific Portfolio & Projects --- */
          {
            patterns: [/who are you/i, /your name/i, /piabot/i, /what are you/i, /mascot/i],
            response: "I'm <strong>PiaBot</strong>! Pia's 8-bit AI assistant & mascot companion. You can ask me <strong>anything</strong> — computer engineering, C++, IoT, coding questions, tech advice, jokes, or Pia's projects!"
          },
          {
            patterns: [/about pia/i, /who is pia/i, /bio/i, /introduce/i, /background/i, /profile/i],
            response: "🎓 <strong>Pia Nicole Macabangon</strong> is a Computer Engineering student at ICCT Colleges with specialized focus on <strong>embedded systems, C/C++, IoT telemetry, and microcontroller architecture</strong> (Raspberry Pi, Arduino, ESP32)."
          },
          {
            patterns: [/kiosk/i, /capstone/i, /printer/i, /printing/i, /spool/i, /epson/i, /nema/i, /coin validator/i],
            response: "🖨️ <strong>Multi-Spool Automated Printing Kiosk</strong> (Capstone):<br>• <strong>Core Controller</strong>: Raspberry Pi 4 running Linux spool daemon.<br>• <strong>Dual Spoolers</strong>: Dual Epson L121 printers for instant Letter (Short) and Legal (Long) paper switching.<br>• <strong>Hardware Integration</strong>: NEMA 17 stepper paper dispenser & multi-coin validator with interrupt-driven pulse counting.<br>• <strong>Impact</strong>: Eliminates manual paper re-feeding and streamlines campus printing!"
          },
          {
            patterns: [/aquasense/i, /water/i, /turbidity/i, /tds/i, /ph/i, /proteus/i, /telemetry/i],
            response: "💧 <strong>AquaSense Water Quality Monitor</strong>:<br>• Real-time Proteus VSM telemetry and IoT simulation powered by <strong>Arduino Uno</strong>.<br>• Integrates analog sensors for <strong>pH, Turbidity, and TDS</strong>.<br>• Features an I2C OLED display, threshold alarm relays, and serial telemetry logging."
          },
          {
            patterns: [/stockalert/i, /inventory/i, /rbac/i, /sha-?256/i],
            response: "📦 <strong>StockAlert Inventory System</strong>:<br>• Multi-threaded <strong>Java Swing</strong> desktop application.<br>• Features SHA-256 RBAC authentication, real-time SQL reorder alerts, automated low-stock warnings, and report generation."
          },
          {
            patterns: [/pia.*stack/i, /pia.*skills/i, /pia.*tech/i, /what.*pia.*know/i],
            response: "🛠️ <strong>Pia's Technical Stack</strong>:<br>• <strong>Languages</strong>: C++, Embedded C, Python, Java, SQL, HTML/CSS/JS<br>• <strong>Hardware & IoT</strong>: Raspberry Pi 4, Arduino Uno/Mega, ESP32, NEMA 17 Steppers, Sensors (pH, TDS, Ultrasonic)<br>• <strong>Simulation & Tools</strong>: Proteus VSM, Multisim, Git/GitHub, Linux/Raspbian"
          },
          {
            patterns: [/cert/i, /certificate/i, /credentials/i, /nc\s*ii/i, /fontanilla/i, /bioinformatics/i, /icpep/i, /ieee/i],
            response: "📜 <strong>Key Credentials & Certifications</strong>:<br>• Computer Hardware Servicing <strong>NC II</strong> Certified<br>• <strong>ICPEP</strong> (Institute of Computer Engineers of the Philippines) Active Member<br>• Bioinformatics & Python Workshop with <strong>Dr. Fontanilla</strong><br>• Embedded Systems, IoT, and Network Security seminar citations."
          },
          {
            patterns: [/contact/i, /email/i, /hire/i, /reach/i, /social/i, /linkedin/i, /github/i],
            response: "📬 <strong>Connect with Pia</strong>:<br>• <strong>Email</strong>: <a href='mailto:piamacabangon@gmail.com' target='_blank'>piamacabangon@gmail.com</a><br>• <strong>LinkedIn</strong>: <a href='https://linkedin.com/in/pia-macabangon' target='_blank' rel='noopener'>linkedin.com/in/pia-macabangon</a><br>• <strong>GitHub</strong>: <a href='https://github.com/Pia-Macabangon' target='_blank' rel='noopener'>github.com/Pia-Macabangon</a><br>• Or leave a doodle on <strong>The Wall</strong> below!"
          },
          {
            patterns: [/school/i, /education/i, /college/i, /icct/i, /degree/i, /cpe\b/i, /university/i],
            response: "🎓 <strong>Education & Degree</strong>:<br>• Bachelor of Science in <strong>Computer Engineering (BSCpE)</strong><br>• <strong>ICCT Colleges Foundation Inc.</strong><br>• Coursework: Embedded Systems, Microcontroller Architecture, Operating Systems, Computer Networks & Robotics."
          },
          {
            patterns: [/wall/i, /guestbook/i, /doodle/i, /draw/i, /sign/i],
            response: "🎨 <strong>The Wall</strong> is Pia's interactive guestbook! Scroll down to the bottom section and draw a doodle, signature, or message with your mouse or finger!"
          },
          {
            patterns: [/resume/i, /cv\b/i, /download resume/i],
            response: "📄 You can explore Pia's full background and verified projects right here on this site, or request an official PDF copy directly via email at <a href='mailto:piamacabangon@gmail.com'>piamacabangon@gmail.com</a>!"
          },

          /* --- Computer Engineering & Hardware Concepts --- */
          {
            patterns: [/arduino.*vs.*raspberry/i, /raspberry.*vs.*arduino/i, /difference.*arduino.*raspberry/i],
            response: "⚡ <strong>Arduino vs. Raspberry Pi</strong>:<br>• <strong>Arduino</strong> is a <em>microcontroller</em>: bare-metal execution of C/C++ in an infinite loop. Perfect for real-time sensor reading, analog voltages, PWM, and instant power-on.<br>• <strong>Raspberry Pi</strong> is a <em>single-board computer</em>: runs a full Linux OS with HDMI, multi-core CPU, and networking. Perfect for heavy computing, web servers, and databases.<br>💡 <em>Best of both worlds</em>: Use Arduino for time-critical motor/sensor control and Raspberry Pi for the user interface!"
          },
          {
            patterns: [/microcontroller.*microprocessor/i, /mcu.*vs.*mpu/i, /difference.*microcontroller/i],
            response: "🔬 <strong>MCU vs. MPU</strong>:<br>• <strong>Microcontroller (MCU)</strong>: Contains CPU, RAM, Flash memory, timers, and I/O ports all on a single chip (e.g. ATmega328P, ESP32). Low cost, low power, dedicated tasks.<br>• <strong>Microprocessor (MPU)</strong>: Pure compute core (ALU + Control Unit + Registers) requiring external RAM, ROM, and peripherals (e.g. Intel Core, ARM Cortex-A). High performance general computing."
          },
          {
            patterns: [/what is an interrupt/i, /interrupts?\b/i, /isr\b/i],
            response: "⚡ <strong>Interrupts & ISRs</strong>:<br>An <strong>Interrupt</strong> is a hardware or software signal that immediately suspends the CPU's current routine to execute an <em>Interrupt Service Routine (ISR)</em>.<br>• Avoids CPU-wasting polling loops.<br>• Essential for time-critical events like coin validator pulse counting, rotary encoders, and emergency stops!"
          },
          {
            patterns: [/i2c|spi|uart|serial protocol/i],
            response: "📡 <strong>Serial Communication Protocols</strong>:<br>• <strong>UART</strong>: Asynchronous, 2 wires (TX/RX), peer-to-peer.<br>• <strong>I2C</strong>: Synchronous, 2 wires (SDA/SCL), multi-drop bus using 7-bit addresses (up to 127 devices).<br>• <strong>SPI</strong>: Synchronous, 4 wires (MOSI/MISO/SCK/CS), full-duplex, very fast (10MHz+), ideal for displays & SD cards."
          },
          {
            patterns: [/ohm'?s law/i, /voltage.*current.*resistance/i, /v\s*=\s*i\s*r/i],
            response: "🔌 <strong>Ohm's Law</strong>: <code>V = I × R</code><br>• <strong>V</strong>: Voltage (Volts)<br>• <strong>I</strong>: Current (Amperes)<br>• <strong>R</strong>: Resistance (Ohms)<br>• Electrical Power: <code>P = V × I = I² × R</code><br>💡 <em>Example</em>: Sizing an LED resistor: <code>R = (V_source - V_led) / I_led</code>. For 5V source, 2V LED, 20mA: <code>(5 - 2) / 0.02 = 150Ω</code>!"
          },
          {
            patterns: [/logic gate/i, /nand|nor|xor|flip-?flop/i, /boolean logic/i],
            response: "🔲 <strong>Digital Logic & Gates</strong>:<br>• <strong>AND / OR / NOT</strong>: Fundamental Boolean logic.<br>• <strong>NAND / NOR</strong>: Universal gates (any digital circuit can be built using solely NAND or NOR gates!).<br>• <strong>XOR</strong>: Outputs 1 only when inputs differ (used in adders & parity checking).<br>• <strong>Flip-Flops</strong> (SR, D, JK, T): Bistable multivibrators that store 1 bit of memory!"
          },
          {
            patterns: [/pwm\b|pulse width modulation/i],
            response: "🌊 <strong>Pulse Width Modulation (PWM)</strong>:<br>A technique to simulate analog output from a digital pin by rapidly toggling between HIGH and LOW at varying <strong>Duty Cycles</strong>:<br>• <strong>0% Duty</strong> = Constant 0V<br>• <strong>50% Duty</strong> = Average 2.5V (on 5V pin)<br>• <strong>100% Duty</strong> = Constant 5V<br>Used for dimming LEDs, controlling servo angles, and regulating DC motor speeds!"
          },
          {
            patterns: [/op-?amp|operational amplifier/i],
            response: "📈 <strong>Operational Amplifiers (Op-Amps)</strong>:<br>High-gain differential voltage amplifiers used in analog signal conditioning.<br>• Ideal Op-Amp: Infinite input impedance, zero output impedance, infinite open-loop gain.<br>• Key configurations: Inverting amplifier, Non-inverting amplifier, Voltage follower (buffer), and Comparators."
          },
          {
            patterns: [/ac vs dc|alternating current|direct current/i],
            response: "⚡ <strong>AC vs. DC</strong>:<br>• <strong>DC (Direct Current)</strong>: Flows in one constant direction (batteries, microcontrollers, solar cells).<br>• <strong>AC (Alternating Current)</strong>: Periodically reverses direction (wall outlets, grid power). Preferred for long-distance power transmission because transformers can easily step voltages up and down to minimize resistive losses!"
          },
          {
            patterns: [/ram vs rom|difference.*ram.*rom/i],
            response: "💾 <strong>RAM vs. ROM</strong>:<br>• <strong>RAM (Random Access Memory)</strong>: Fast, volatile read/write memory. Loses its data when power is disconnected (SRAM, DRAM).<br>• <strong>ROM (Read-Only Memory)</strong>: Non-volatile memory that retains firmware and bootloaders even when powered off (EEPROM, Flash memory)."
          },
          {
            patterns: [/8086|cpu architecture|von neumann|harvard/i],
            response: "🖥️ <strong>Computer Architecture</strong>:<br>• <strong>Von Neumann</strong>: Single shared bus & memory for both instructions and data.<br>• <strong>Harvard</strong>: Physically separated memory and buses for instructions vs. data (common in microcontrollers like AVR/Arduino).<br>• <strong>Intel 8086</strong>: The historic 16-bit microprocessor (1978) that originated the x86 architecture still powering modern PCs today!"
          },

          /* --- Programming & Software Engineering --- */
          {
            patterns: [/pointer/i, /c\+\+ pointer/i, /memory address/i, /dereference/i],
            response: "💻 <strong>C++ Pointers & Memory</strong>:<br>• A <strong>pointer</strong> (<code>int* ptr = &val;</code>) holds the memory address of another variable.<br>• The <code>*</code> operator dereferences the pointer to access or modify the value at that address.<br>• Essential in embedded systems for memory-mapped I/O registers (e.g. <code>*PORTB |= (1 << 5);</code> to turn on a pin)!"
          },
          {
            patterns: [/oop\b|object-?oriented|encapsulation|polymorphism/i],
            response: "🧱 <strong>The 4 Pillars of OOP</strong>:<br>1. <strong>Encapsulation</strong>: Bundling data and methods into classes with private/public access controls.<br>2. <strong>Abstraction</strong>: Hiding internal complexity behind clean public interfaces.<br>3. <strong>Inheritance</strong>: Reusing and extending base class code in derived classes.<br>4. <strong>Polymorphism</strong>: Allowing objects to be treated as instances of their parent class (function overloading & virtual methods)!"
          },
          {
            patterns: [/data structure|big-?o|algorithm/i],
            response: "📊 <strong>Data Structures & Complexity</strong>:<br>• <strong>Arrays / Vectors</strong>: O(1) random access, O(n) insert/delete.<br>• <strong>Linked Lists</strong>: O(1) insert at head, O(n) lookup.<br>• <strong>Hash Tables</strong>: O(1) average lookup, insertion, and deletion.<br>• <strong>Binary Search Trees</strong>: O(log n) balanced operations.<br>• <strong>Big-O</strong> measures how runtime or space scales as input size (n) grows!"
          },
          {
            patterns: [/git\b|github\b|version control/i],
            response: "🐙 <strong>Git & Version Control</strong>:<br>• <code>git init</code>: Create local repository.<br>• <code>git add .</code> & <code>git commit -m 'feat: ...'</code>: Snapshot changes.<br>• <code>git push origin main</code>: Upload to remote hosting like GitHub.<br>• <code>git branch</code> & <code>git merge</code>: Work in isolated feature branches without breaking main!"
          },
          {
            patterns: [/linux\b|bash\b|shell command/i],
            response: "🐧 <strong>Linux Essentials</strong>:<br>• <code>ls -la</code>: List all files with permissions.<br>• <code>cd &lt;dir&gt;</code>: Change directory.<br>• <code>grep -rn 'pattern'</code>: Search text recursively.<br>• <code>chmod +x script.sh</code>: Make script executable.<br>• <code>sudo systemctl restart service</code>: Manage system daemons on Raspberry Pi / Linux!"
          },
          {
            patterns: [/python\b/i],
            response: "🐍 <strong>Python</strong>:<br>An intuitive, high-level language renowned for data science, machine learning, bioinformatics, and automation. Clean syntax, dynamic typing, and a vast package ecosystem (NumPy, Pandas, Flask, PySerial)."
          },
          {
            patterns: [/c\+\+|embedded c/i],
            response: "⚙️ <strong>C++ & Embedded C</strong>:<br>The bedrock languages of systems programming, robotics, and firmware! Provides direct hardware memory control, minimal runtime overhead, deterministic execution, and zero-cost abstractions."
          },
          {
            patterns: [/sql\b|database/i],
            response: "🗄️ <strong>SQL & Relational Databases</strong>:<br>Structured Query Language used to query and mutate relational data.<br>• Core clauses: <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>ORDER BY</code>.<br>• Relational joins: <code>INNER JOIN</code>, <code>LEFT JOIN</code> linking primary & foreign keys."
          },

          /* --- Emerging Tech, Science & AI --- */
          {
            patterns: [/what is iot|internet of things/i],
            response: "🌐 <strong>Internet of Things (IoT)</strong>:<br>The interconnected network of physical devices embedded with sensors, processing ability, and wireless connectivity (Wi-Fi, Bluetooth, LoRa, Zigbee) to exchange telemetry data with cloud platforms using lightweight protocols like <strong>MQTT</strong>!"
          },
          {
            patterns: [/artificial intelligence|machine learning|ai vs ml|deep learning/i],
            response: "🤖 <strong>AI vs. Machine Learning vs. Deep Learning</strong>:<br>• <strong>Artificial Intelligence (AI)</strong>: The broad discipline of building systems capable of intelligent behavior.<br>• <strong>Machine Learning (ML)</strong>: Algorithms trained on statistical data patterns instead of explicit rules.<br>• <strong>Deep Learning (DL)</strong>: Multi-layered artificial neural networks capable of learning hierarchical representations (computer vision, LLMs)!"
          },
          {
            patterns: [/quantum computer|quantum computing/i],
            response: "⚛️ <strong>Quantum Computing</strong>:<br>Unlike classical bits which are strictly 0 or 1, quantum computers use <strong>qubits</strong> which exploit <em>superposition</em> (existing in a linear combination of states) and <em>entanglement</em> to evaluate vast computational search spaces simultaneously!"
          },
          {
            patterns: [/bioinformatics/i],
            response: "🧬 <strong>Bioinformatics</strong>:<br>The interdisciplinary field applying computer science, algorithms, and data science to biological data — such as DNA/RNA sequence alignment, protein folding simulations, and genomic mapping. Pia trained in this with Dr. Fontanilla!"
          },
          {
            patterns: [/why.*sky.*blue/i],
            response: "☀️ <strong>Why is the sky blue?</strong><br>Due to <strong>Rayleigh scattering</strong>! Sunlight is made of all colors. Earth's atmospheric gases scatter shorter wavelengths (blue and violet) in all directions far more than longer red wavelengths. Since our eyes are much more sensitive to blue light, we perceive a blue sky!"
          },
          {
            patterns: [/how.*(?:plane|airplane).*fly/i],
            response: "✈️ <strong>How do airplanes fly?</strong><br>Through <strong>aerodynamic lift</strong>! Airplane wings (airfoils) deflect air downward as they move forward. By Bernoulli's principle and Newton's Third Law (equal and opposite reaction), the downward deflection of air creates an upward lifting force that overcomes the aircraft's weight!"
          },
          {
            patterns: [/speed of light/i],
            response: "⚡ <strong>Speed of Light (c)</strong>:<br>Exactly <strong>299,792,458 meters per second</strong> (~300,000 km/s or 186,282 miles/s) in a vacuum! In physics, it is the universal cosmic speed limit for all matter, information, and electromagnetic waves."
          },

          /* --- Career, Study & Practical Engineering Advice --- */
          {
            patterns: [/study tips|how to study|learn engineering|become.*engineer/i],
            response: "📚 <strong>Engineering Study & Growth Tips</strong>:<br>1. <strong>Hands-on Prototyping</strong>: Breadboard circuits and write firmware — hands-on practice cements theory.<br>2. <strong>Read Datasheets</strong>: Don't guess pinouts or resistor tolerances; check the official spec sheet.<br>3. <strong>Master Version Control</strong>: Push code to GitHub every day.<br>4. <strong>Systematic Debugging</strong>: Isolate power, clock, and ground before suspecting software!"
          },
          {
            patterns: [/capstone advice|capstone tips|project idea/i],
            response: "💡 <strong>Capstone Project Tips</strong>:<br>1. <strong>Identify Real Friction</strong>: Solve a genuine everyday problem (like Pia's dual-size automated paper printing kiosk).<br>2. <strong>Modular Design</strong>: Test sensors, motors, and microcontrollers independently before combining.<br>3. <strong>Build In Failsafes</strong>: Add interrupt debounce, thermal protection, and watchdog timers."
          },
          {
            patterns: [/how to debug|debugging tips|debug code|fix bug/i],
            response: "🔍 <strong>The Universal Debugging Protocol</strong>:<br>1. <strong>Hardware first</strong>: Verify 3.3V / 5V rails and ground connections with a multimeter.<br>2. <strong>Serial prints</strong>: Print variables right before and after the failure point.<br>3. <strong>Divide and conquer</strong>: Comment out blocks until the bug disappears.<br>4. <strong>Rubber duck method</strong>: Explain the code line-by-line out loud!"
          },

          /* --- Entertainment, Jokes & Riddles --- */
          {
            patterns: [/joke|funny|make me laugh/i],
            response: () => `😂 <strong>Here's a joke for you</strong>:<br>${getRandomItem(techJokes)}`
          },
          {
            patterns: [/riddle/i],
            response: () => getRandomItem(techRiddles)
          },

          /* --- Chit-chat, Greetings & Small Talk --- */
          {
            patterns: [/meaning of life/i, /answer to life/i],
            response: "🌌 According to <em>The Hitchhiker's Guide to the Galaxy</em>, the answer is <strong>42</strong>!<br>In engineering terms: it's about solving meaningful problems, building useful tools, and keeping our clock cycles purposeful! ✨"
          },
          {
            patterns: [/how are you|how'?s it going|what'?s up|kamusta/i],
            response: "All registers are clear, clock cycles are humming at full speed, and zero buffer overflows detected! How are you doing today? 😊"
          },
          {
            patterns: [/good morning/i],
            response: "Good morning! ☀️ Ready to write some code or explore engineering projects today? How can I help?"
          },
          {
            patterns: [/good evening|good night/i],
            response: "Good evening! 🌙 Don't forget to push your Git commits and save your schematic files before resting!"
          },
          {
            patterns: [/hi\b|hello\b|hey\b|sup\b|greetings/i],
            response: "Hello there! 👋 I'm PiaBot! You can ask me about anything — coding, computer engineering, circuits, jokes, math, or Pia's portfolio. What's on your mind?"
          },
          {
            patterns: [/thank|thanks|salamat|arigato|appreciate/i],
            response: "You're very welcome! Feel free to ask anything else or leave a doodle on The Wall! ✨"
          },
          {
            patterns: [/cool|awesome|great|nice|love it|amazing/i],
            response: "Thanks a bunch! That keeps my transistors happy! What else would you like to explore?"
          },
          {
            patterns: [/coffee|tea|energy drink/i],
            response: "☕ Coffee: the miracle fluid that converts caffeine into C++ code and working circuit prototypes!"
          },
          {
            patterns: [/are you real|are you human|are you an ai/i],
            response: "I'm a digital 8-bit AI mascot running in your browser, powered by JavaScript and Computer Engineering knowledge! 🤖"
          }
        ];

        /* Intelligent Fallback Generator for Arbitrary Conversation */
        const generateDynamicResponse = (rawText) => {
          const text = rawText.trim();
          const lower = text.toLowerCase();

          // Question detection
          const isQuestion = text.includes('?') ||
            /^(?:what|why|how|who|where|when|can you|could you|is it|are there|tell me|explain)/i.test(text);

          if (isQuestion) {
            // Extract key subjects
            const subject = text
              .replace(/^(?:what is|what are|why is|why are|how does|how do|can you tell me about|tell me about|explain)\s+/i, '')
              .replace(/[\?\.\!]/g, '')
              .trim();

            return `💡 <strong>Regarding "${subject || 'your question'}"</strong>:<br>` +
              `That's a fascinating topic! In engineering and technology, exploring how systems work under the hood is what drives innovation.<br><br>` +
              `You can ask me to break down specific concepts like:<br>` +
              `• <code>Arduino vs Raspberry Pi</code><br>` +
              `• <code>Ohm's Law & Circuit Analysis</code><br>` +
              `• <code>C++ Pointers & Memory</code><br>` +
              `• Or ask about Pia's <code>Capstone Printing Kiosk</code> or <code>AquaSense</code>!`;
          }

          // Conversational acknowledgment
          return `🤖 <em>"${text}"</em> — noted! I'm tuned for all things computer engineering, programming, hardware design, and general curiosity.<br><br>` +
            `Try asking me a question like <em>"What is an interrupt?"</em>, <em>"Calculate 128 * 4"</em>, <em>"Tell me a joke"</em>, or explore Pia's projects using the chips above!`;
        };

        const getBotResponse = (userText) => {
          const text = userText.trim();

          // 1. Check for math evaluation first
          const mathResult = tryEvaluateMath(text);
          if (mathResult) return mathResult;

          // 2. Check knowledge base patterns
          for (const item of knowledgeBase) {
            for (const pattern of item.patterns) {
              if (pattern.test(text)) {
                return typeof item.response === 'function' ? item.response() : item.response;
              }
            }
          }

          // 3. Fallback to dynamic conversation synthesis
          return generateDynamicResponse(text);
        };

        const handleUserMessage = (text) => {
          if (!text || !text.trim()) return;
          const cleanText = text.trim();

          const escapedUserText = cleanText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

          appendMessage('user', escapedUserText);

          const typingIndicator = showTypingIndicator();

          // Authentic retro response delay
          setTimeout(() => {
            if (typingIndicator && typingIndicator.parentNode) {
              typingIndicator.remove();
            }
            const botReply = getBotResponse(cleanText);
            appendMessage('bot', botReply);
          }, 380);
        };

        const sendWelcomeMessage = () => {
          if (!messagesEl) return;
          messagesEl.innerHTML = '';
          appendMessage('bot', "Hello! 👋 I'm <strong>PiaBot</strong>, an interactive AI & Computer Engineering companion. Ask me <strong>anything</strong> — coding, circuits, microcontrollers, tech advice, jokes, or Pia's engineering projects!");
          hasGreeted = true;
        };

        const openChatbot = () => {
          updateChatbotPosition();
          chatbotContainer.classList.add('is-open');
          chatbotContainer.setAttribute('aria-hidden', 'false');
          if (!hasGreeted || messagesEl.children.length === 0) {
            sendWelcomeMessage();
          }
          if (inputEl) {
            setTimeout(() => inputEl.focus(), 150);
          }
        };

        const closeChatbot = () => {
          chatbotContainer.classList.remove('is-open');
          chatbotContainer.setAttribute('aria-hidden', 'true');
        };

        const toggleChatbot = () => {
          if (chatbotContainer.classList.contains('is-open')) {
            closeChatbot();
          } else {
            openChatbot();
          }
        };

        const isOpen = () => chatbotContainer.classList.contains('is-open');

        // Form submission
        if (formEl && inputEl) {
          formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = inputEl.value;
            if (!val.trim()) return;
            inputEl.value = '';
            handleUserMessage(val);
          });
        }

        // Quick prompt chips
        chips.forEach(chip => {
          chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            if (prompt) {
              handleUserMessage(prompt);
            }
          });
        });

        // Clear button
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            sendWelcomeMessage();
          });
        }

        // Close button
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeChatbot();
          });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && isOpen()) {
            closeChatbot();
          }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
          if (
            isOpen() &&
            !chatbotContainer.contains(e.target) &&
            !companionEl.contains(e.target)
          ) {
            closeChatbot();
          }
        });

        // Reposition on window resize
        window.addEventListener('resize', () => {
          if (isOpen()) {
            updateChatbotPosition();
          }
        }, { passive: true });

        return {
          open: openChatbot,
          close: closeChatbot,
          toggle: toggleChatbot,
          isOpen: isOpen,
          updatePosition: updateChatbotPosition
        };
      };

      // Initialize the chatbot controller
      chatbotCtrl = initPixelChatbot(companion);

      // Set initial position at lower left corner
      updateMascotPosition();
      window.addEventListener('resize', () => updateMascotPosition(), { passive: true });

      window.addEventListener('scroll', () => {
        if (isInteracting) return;
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const delta = currentScrollY - lastScrollY;
        updateMascotPosition(delta);
        lastScrollY = currentScrollY;
      }, { passive: true });

      const speechEl = document.querySelector('#mascot-speech');

      companion.addEventListener('click', (e) => {
        e.stopPropagation();

        companion.classList.remove('is-leaping');
        void companion.offsetWidth;
        companion.classList.add('is-leaping');

        setFrame('crouch');
        setTimeout(() => {
          setFrame('leap');
        }, 150);
        setTimeout(() => {
          setFrame('rest');
          companion.classList.remove('is-leaping');
        }, 750);

        if (chatbotCtrl) {
          chatbotCtrl.toggle();
          const isOpenNow = chatbotCtrl.isOpen();
          if (speechEl) {
            speechEl.textContent = isOpenNow ? "PiaBot online! 💬" : "Chat with me! 🤖";
            speechEl.style.opacity = '1';
            speechEl.style.transform = 'translateY(0)';
            setTimeout(() => {
              speechEl.style.opacity = '';
              speechEl.style.transform = '';
            }, 2000);
          }
        }
      });
    }

    /* ==========================================================================
       19. miggs.dev Typed Text Reveal Engine with Blinking Block Cursor
       ========================================================================== */
    const initTypedHeadings = () => {
      const typedElements = document.querySelectorAll('.typed-heading');
      if (typedElements.length === 0) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return; // Leave text completely intact for users with reduced motion

      typedElements.forEach(el => {
        const tokenType = el.dataset.typedTokens;
        let tokens = [];

        if (tokenType === 'words-wall') {
          // "Words & Sketches on The Wall"
          const part1 = "Words & Sketches ";
          for (let i = 0; i < part1.length; i++) {
            tokens.push({ char: part1[i], isAccent: false });
          }
          const part2 = "on The Wall";
          for (let i = 0; i < part2.length; i++) {
            tokens.push({ char: part2[i], isAccent: true });
          }
        } else if (tokenType === 'contact') {
          // "Let's Create\nTogether!"
          const part1 = "Let's Create";
          for (let i = 0; i < part1.length; i++) {
            tokens.push({ char: part1[i], isBreak: false });
          }
          tokens.push({ isBreak: true });
          const part2 = "Together!";
          for (let i = 0; i < part2.length; i++) {
            tokens.push({ char: part2[i], isBreak: false });
          }
        } else if (tokenType === 'footer-wordmark') {
          const text = "pia.dev";
          for (let i = 0; i < text.length; i++) {
            tokens.push({ char: text[i] });
          }
        } else {
          // Plain text heading ("Education & Experience", "Featured Projects & Systems", "Certificates", "My Technical Stack")
          const text = el.textContent.trim().replace(/\s+/g, ' ');
          for (let i = 0; i < text.length; i++) {
            tokens.push({ char: text[i] });
          }
        }

        el._typedTokens = tokens;
        el._tokenType = tokenType;

        // Prepare clean typing shell with cursor
        if (tokenType === 'footer-wordmark') {
          el.innerHTML = `<span class="typed-text-target"></span><span class="miggs-footer-cursor">|</span>`;
        } else {
          el.innerHTML = `<span class="typed-text-target"></span><span class="typed-cursor" aria-hidden="true"></span>`;
        }
      });

      const startTyping = (el) => {
        if (!el || el.dataset.hasTyped) return;
        el.dataset.hasTyped = 'true';

        const tokens = el._typedTokens || [];
        const tokenType = el._tokenType;
        const targetSpan = el.querySelector('.typed-text-target');
        const cursor = el.querySelector('.typed-cursor, .miggs-footer-cursor');
        if (!targetSpan) return;

        let accentSpan = null;
        let idx = 0;

        const typeNext = () => {
          if (idx < tokens.length) {
            const token = tokens[idx++];
            if (token.isBreak) {
              targetSpan.appendChild(document.createElement('br'));
            } else if (token.isAccent) {
              if (!accentSpan) {
                accentSpan = document.createElement('span');
                accentSpan.className = 'wall-title-accent';
                targetSpan.appendChild(accentSpan);
              }
              accentSpan.textContent += token.char;
            } else {
              targetSpan.appendChild(document.createTextNode(token.char));
            }

            let delay = 32 + Math.random() * 20;
            const ch = token.char;
            if (ch === '&' || ch === '!') delay = 90;
            else if (ch === ' ' || token.isBreak) delay = 50;
            else if (ch === '.') delay = 120;

            setTimeout(typeNext, delay);
          } else {
            // Typing complete!
            if (cursor && tokenType !== 'footer-wordmark') {
              setTimeout(() => {
                cursor.style.transition = 'opacity 0.6s ease';
                cursor.style.opacity = '0';
                setTimeout(() => {
                  cursor.style.display = 'none';
                }, 600);
              }, 2200);
            }
          }
        };

        setTimeout(typeNext, 120);
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              startTyping(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '60px 0px -30px 0px'
        });

        typedElements.forEach(el => {
          // If already in viewport on load, start right away
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight || document.documentElement.clientHeight;
          if (rect.top <= vh * 0.9 && rect.bottom >= 0) {
            startTyping(el);
          } else {
            observer.observe(el);
          }
        });
      } else {
        typedElements.forEach(el => startTyping(el));
      }
    };
    initTypedHeadings();

    /* ==========================================================================
       20. miggs.dev Blend-Mode Scroll Progress Bar Sync
       ========================================================================== */
    const miggsFill = document.querySelector('#miggs-progress-fill');
    if (miggsFill) {
      const updateMiggsScrollProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        miggsFill.style.transform = `scaleX(${ratio})`;
      };
      window.addEventListener('scroll', updateMiggsScrollProgress, { passive: true });
      window.addEventListener('resize', updateMiggsScrollProgress, { passive: true });
      updateMiggsScrollProgress();
    }

    /* ==========================================================================
       21. Shammy Kenan Din Style Avatar Lightbox Zoom
       ========================================================================== */
    const avaEl = document.querySelector('#ava') || document.querySelector('.sidebar-avatar-card');
    const lbEl = document.querySelector('#lb');
    const lbImgEl = document.querySelector('#lbImg');
    const lbCapEl = document.querySelector('#lbCap');
    const lbCloseEl = document.querySelector('#lbClose');

    if (avaEl && lbEl && lbImgEl) {
      avaEl.addEventListener('click', () => {
        const img = avaEl.querySelector('img');
        if (!img) return;
        lbImgEl.src = img.currentSrc || img.src;
        lbImgEl.alt = img.alt || 'Pia Nicole Macabangon';
        if (lbCapEl) {
          lbCapEl.textContent = img.getAttribute('data-cap') || img.alt || 'Pia Nicole Macabangon';
        }
        lbEl.classList.add('open');
        lbEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });

      const closeLb = () => {
        lbEl.classList.remove('open');
        lbEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      lbEl.addEventListener('click', (e) => {
        if (e.target === lbEl || (lbCloseEl && (e.target === lbCloseEl || lbCloseEl.contains(e.target)))) {
          closeLb();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lbEl.classList.contains('open')) {
          closeLb();
        }
      });
    }

    /* ==========================================================================
       22. Dark / Light Mode Theme Toggle
       ========================================================================== */
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const getPreferredTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const updateToggleLabels = (theme) => {
      const nextLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggleBtns.forEach(btn => {
        btn.setAttribute('aria-label', nextLabel);
        btn.setAttribute('title', nextLabel);
      });
    };

    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {}
      updateToggleLabels(theme);
    };

    // Sync button state on initialization
    const initialTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    setTheme(initialTheme);

    themeToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    });

    // -------------------------------------------------------------------------
    // Minimal Ambient Background Spotlight Controller (RAF-throttled pointermove)
    // -------------------------------------------------------------------------
    const initAmbientSpotlight = () => {
      const bgSystem = document.querySelector('.ambient-bg-system');
      if (!bgSystem) return;

      let ticking = false;
      let targetX = window.innerWidth / 2;
      let targetY = window.innerHeight / 2;

      const onPointerMove = (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const xPercent = ((targetX / window.innerWidth) * 100).toFixed(1);
            const yPercent = ((targetY / window.innerHeight) * 100).toFixed(1);
            bgSystem.style.setProperty('--mouse-x', `${xPercent}%`);
            bgSystem.style.setProperty('--mouse-y', `${yPercent}%`);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
    };

    initAmbientSpotlight();

  })();


