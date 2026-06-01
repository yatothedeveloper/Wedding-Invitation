const CONFIG = {
    secretCode: '0620',
    codeHint: 'Hint: our engagement date — 06 / 20',

    weddingDate: '2026-06-20T17:00:00',
    groomName: 'James',
    brideName: 'Olivia',

    heroDateLine: 'Saturday · June 20, 2026',
    detailDate: 'Saturday, June 20, 2026',

    venueName: 'The Grand Pavilion',
    venueAddress: '42 Riverside Drive, New York, NY 10023',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=42+Riverside+Drive+New+York+NY',
    rsvpDeadline: 'June 1, 2026',
    whatsapp: '15551234567',
    hashtag: '#JamesAndOlivia2026',
    introVideo: '',

    quote: {
        text: '"In all the world, there is no heart for me like yours."',
        cite: '— Maya Angelou',
    },

    highlights: [
        { icon: '💒', label: 'Ceremony', value: '5:00 PM' },
        { icon: '🥂', label: 'Reception', value: '7:30 PM' },
        { icon: '💌', label: 'RSVP by', value: 'June 1' },
    ],

    timeline: [
        { time: '4:00 PM', title: 'Guest arrival', desc: 'Rose garden welcome drinks & canapés' },
        { time: '5:00 PM', title: 'Wedding ceremony', desc: 'Vows under the floral arch by the river' },
        { time: '7:30 PM', title: 'Reception & dinner', desc: 'Dinner, first dance & celebration' },
    ],

    note:
        'Your presence would mean the world to us. Please confirm by {deadline} so we can save your seat among the roses.',

    storyChapters: [
        { year: '2019', title: 'How we met', desc: 'A chance coffee that turned into forever.' },
        { year: '2024', title: 'She said yes', desc: 'Sunset proposal by the river — our happiest yes.' },
        { year: '2026', title: 'Our wedding', desc: 'Where our story becomes a lifetime together.' },
    ],

    images: {
        gateBg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1920&q=80',
        gateCouple: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80',
        heroBg: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=80',
        groom: 'https://images.unsplash.com/photo-1591604466107-ec1e9e2c116f?auto=format&fit=crop&w=600&q=80',
        bride: 'https://images.unsplash.com/photo-1522673607200-164d1b6fc486?auto=format&fit=crop&w=600&q=80',
        couple: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
        roseStrip: 'https://images.unsplash.com/photo-1518709594023-6eab29cb9a7e?auto=format&fit=crop&w=1400&q=80',
        roseSide: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89d7?auto=format&fit=crop&w=400&q=80',
        countdownRose: 'https://images.unsplash.com/photo-1452827073306-6d0540200fc7?auto=format&fit=crop&w=500&q=80',
        venue: 'https://images.unsplash.com/photo-1519167758481-83f29da8c7f3?auto=format&fit=crop&w=700&q=80',
        dateCard: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80',
        rings: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80',
        footerRose: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=400&q=80',
        story: [
            {
                src: 'https://images.unsplash.com/photo-1520854221256-17451c0d27f2?auto=format&fit=crop&w=800&q=80',
                caption: 'The proposal',
            },
            {
                src: 'https://images.unsplash.com/photo-1465495976277-593167db0e7f?auto=format&fit=crop&w=800&q=80',
                caption: 'Together always',
            },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1522673607200-164d1b6fc486?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1520854221256-17451c0d27f2?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=700&q=80',
            'https://images.unsplash.com/photo-1460978812853-566d610f794b?auto=format&fit=crop&w=700&q=80',
        ],
    },
};

const gate = document.getElementById('gate');
const invite = document.getElementById('invite');
const seal = document.getElementById('seal');
const codeInputs = document.querySelectorAll('.code-digit');
const codeInputsWrap = document.getElementById('code-inputs');
const codeError = document.getElementById('code-error');
const rsvpBtn = document.getElementById('rsvp-btn');
const shareBtn = document.getElementById('share-btn');
const curtain = document.getElementById('curtain');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const backTop = document.getElementById('back-top');

const SHARE_LABEL = 'Share invitation';
const COPIED_LABEL = 'Link copied ✓';

let unlocked = false;
let confettiPieces = [];

function setBg(el, url) {
    if (el) el.style.backgroundImage = `url("${url}")`;
}

function bindImage(img, src, fallback) {
    img.src = src;
    img.onerror = () => {
        if (fallback && img.src !== fallback) img.src = fallback;
    };
}

function initSparkles() {
    const wrap = document.getElementById('sparkles');
    if (!wrap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (let i = 0; i < 24; i++) {
        const s = document.createElement('span');
        s.className = 'sparkle';
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        s.style.animationDelay = `${Math.random() * 4}s`;
        s.style.animationDuration = `${2 + Math.random() * 3}s`;
        wrap.appendChild(s);
    }
}

function initIntroVideo() {
    const section = document.getElementById('intro-video');
    const video = document.getElementById('intro-vid');
    const path = (CONFIG.introVideo || '').trim();

    if (!path) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    gate.classList.add('hidden');

    video.src = path;
    const playBtn = document.getElementById('intro-play');

    function closeIntro() {
        video.pause();
        section.classList.add('exit');
        setTimeout(() => {
            section.classList.add('hidden');
            gate.classList.remove('hidden');
        }, 550);
    }

    playBtn.addEventListener('click', async () => {
        playBtn.classList.add('is-hidden');
        video.muted = false;
        try {
            await video.play();
        } catch {
            video.muted = true;
            await video.play();
        }
    });

    document.getElementById('intro-skip').addEventListener('click', closeIntro);
    document.getElementById('intro-continue').addEventListener('click', closeIntro);
    video.addEventListener('ended', closeIntro);
}

function populatePage() {
    const img = CONFIG.images;
    const fallback = img.couple;

    document.title = `${CONFIG.groomName} & ${CONFIG.brideName} — Wedding Invitation`;
    document.getElementById('code-hint').textContent = CONFIG.codeHint;

    setBg(document.getElementById('gate-bg'), img.gateBg);
    bindImage(document.getElementById('gate-couple-img'), img.gateCouple, fallback);

    setBg(document.getElementById('hero-bg'), img.heroBg);
    bindImage(document.getElementById('img-groom'), img.groom, fallback);
    bindImage(document.getElementById('img-bride'), img.bride, fallback);
    bindImage(document.getElementById('img-couple'), img.couple, fallback);

    document.querySelectorAll('.name-groom').forEach((el) => {
        el.textContent = CONFIG.groomName;
    });
    document.querySelectorAll('.name-bride').forEach((el) => {
        el.textContent = CONFIG.brideName;
    });

    document.getElementById('hero-date').textContent = CONFIG.heroDateLine;
    document.getElementById('quote-text').textContent = CONFIG.quote.text;
    document.getElementById('quote-cite').textContent = CONFIG.quote.cite;

    bindImage(document.getElementById('rose-strip-1'), img.roseStrip, img.gateBg);
    bindImage(document.getElementById('verse-rose-left'), img.roseSide, img.countdownRose);
    bindImage(document.getElementById('verse-rose-right'), img.roseSide, img.countdownRose);
    bindImage(document.getElementById('countdown-rose'), img.countdownRose, img.roseSide);
    bindImage(document.getElementById('card-date-img'), img.dateCard, img.venue);
    bindImage(document.getElementById('card-venue-img'), img.venue, img.dateCard);
    bindImage(document.getElementById('note-rings'), img.rings, img.couple);
    bindImage(document.getElementById('footer-rose'), img.footerRose, img.roseStrip);

    document.getElementById('detail-date').textContent = CONFIG.detailDate;
    document.getElementById('detail-venue').textContent =
        `${CONFIG.venueName} — ${CONFIG.venueAddress}`;
    document.getElementById('map-link').href = CONFIG.mapUrl;

    document.getElementById('note-text').innerHTML = CONFIG.note.replace(
        '{deadline}',
        `<strong>${CONFIG.rsvpDeadline}</strong>`
    );

    document.getElementById('footer-signoff').textContent =
        `With all our love — ${CONFIG.groomName} & ${CONFIG.brideName}`;
    document.getElementById('hashtag').textContent = CONFIG.hashtag;

    document.getElementById('highlight-grid').innerHTML = CONFIG.highlights
        .map(
            (h, i) => `
        <div class="highlight-item" style="--i:${i}">
            <span class="highlight-icon">${h.icon}</span>
            <span class="highlight-label">${h.label}</span>
            <span class="highlight-value">${h.value}</span>
        </div>`
        )
        .join('');

    document.getElementById('story-chapters').innerHTML = CONFIG.storyChapters
        .map(
            (ch, i) => `
        <li class="story-chapter" style="--i:${i}">
            <span class="story-year">${ch.year}</span>
            <div>
                <strong>${ch.title}</strong>
                <p>${ch.desc}</p>
            </div>
        </li>`
        )
        .join('');

    const slider = document.getElementById('story-slider');
    slider.innerHTML = img.story
        .map(
            (item, i) => `
        <figure class="story-slide" style="--i:${i}">
            <img src="${item.src}" alt="${item.caption}" loading="lazy" decoding="async">
            <figcaption>${item.caption}</figcaption>
        </figure>`
        )
        .join('');

    const dotsWrap = document.getElementById('story-dots');
    dotsWrap.innerHTML = img.story
        .map(
            (_, i) =>
                `<button type="button" class="story-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
        )
        .join('');

    initStorySlider(slider, dotsWrap);

    const mosaic = document.getElementById('gallery-mosaic');
    mosaic.innerHTML = img.gallery
        .map(
            (src, i) => `
        <button type="button" class="mosaic-item mosaic-item--${(i % 6) + 1}" style="--i:${i}" data-src="${src}" aria-label="View photo ${i + 1}">
            <img src="${src}" alt="Wedding memory ${i + 1}" loading="lazy" decoding="async">
        </button>`
        )
        .join('');

    initLightbox(mosaic);

    document.getElementById('timeline-list').innerHTML = CONFIG.timeline
        .map(
            (item, i) => `
        <li class="timeline-card" style="--i:${i}">
            <time>${item.time}</time>
            <strong>${item.title}</strong>
            <span>${item.desc}</span>
        </li>`
        )
        .join('');
}

function initStorySlider(slider, dotsWrap) {
    const dots = dotsWrap.querySelectorAll('.story-dot');

    function goTo(index) {
        const slide = slider.children[index];
        if (!slide) return;
        slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
    });

    let scrollTimer;
    slider.addEventListener(
        'scroll',
        () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const center = slider.scrollLeft + slider.clientWidth / 2;
                let closest = 0;
                let minDist = Infinity;
                [...slider.children].forEach((slide, i) => {
                    const dist = Math.abs(
                        center - (slide.offsetLeft + slide.offsetWidth / 2)
                    );
                    if (dist < minDist) {
                        minDist = dist;
                        closest = i;
                    }
                });
                dots.forEach((d, i) => d.classList.toggle('active', i === closest));
            }, 80);
        },
        { passive: true }
    );
}

function initLightbox(mosaic) {
    const closeBtn = document.getElementById('lightbox-close');

    mosaic.querySelectorAll('.mosaic-item').forEach((btn) => {
        btn.addEventListener('click', () => {
            lightboxImg.src = btn.dataset.src;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    function close() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) close();
    });
}

function initHeroParallax() {
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener(
        'scroll',
        () => {
            const y = window.scrollY;
            if (y < window.innerHeight) {
                heroBg.style.transform = `translateY(${y * 0.15}px) scale(1.06)`;
            }
        },
        { passive: true }
    );
}

function initBackTop() {
    window.addEventListener(
        'scroll',
        () => {
            backTop.classList.toggle('hidden', window.scrollY < 400);
        },
        { passive: true }
    );
    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function playCurtain() {
    curtain.classList.add('open');
    setTimeout(() => curtain.classList.add('done'), 1200);
}

function burstConfetti() {
    const colors = ['#e8a4b0', '#f5d4d8', '#c9a87c', '#fff5f8', '#d4899a'];
    const w = petalCanvas?.width || window.innerWidth;
    const h = petalCanvas?.height || window.innerHeight;

    for (let i = 0; i < 120; i++) {
        confettiPieces.push({
            x: w * 0.5 + (Math.random() - 0.5) * 200,
            y: h * 0.35,
            w: Math.random() * 8 + 4,
            h: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * -12 - 4,
            rot: Math.random() * Math.PI,
            vr: Math.random() * 0.2 - 0.1,
            gravity: 0.25,
            life: 1,
        });
    }
}

populatePage();
initSparkles();
initIntroVideo();
initHeroParallax();
initBackTop();

function getEnteredCode() {
    return [...codeInputs].map((el) => el.value).join('');
}

function updateCodeUI() {
    const code = getEnteredCode();
    seal.classList.toggle('seal--ready', code.length === 4);
    codeInputs.forEach((el) => {
        el.classList.toggle('filled', el.value.length > 0);
    });
}

seal.addEventListener('click', () => {
    seal.classList.add('seal--pressed');
    setTimeout(() => seal.classList.remove('seal--pressed'), 180);

    const code = getEnteredCode();
    if (code.length === 4) tryUnlock(code);
    else codeInputs[code.length]?.focus() || codeInputs[0]?.focus();
});

document.getElementById('code-form')?.addEventListener('submit', (e) => e.preventDefault());

codeInputs.forEach((input, i) => {
    input.addEventListener('input', (e) => {
        const v = e.target.value.replace(/\D/g, '');
        e.target.value = v.slice(-1);
        if (v) {
            e.target.classList.add('pop');
            setTimeout(() => e.target.classList.remove('pop'), 320);
            if (i < codeInputs.length - 1) codeInputs[i + 1].focus();
        }
        updateCodeUI();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.key === 'Backspace' && !input.value && i > 0) codeInputs[i - 1].focus();
    });

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 4);
        pasted.split('').forEach((ch, j) => {
            if (codeInputs[j]) codeInputs[j].value = ch;
        });
        codeInputs[Math.min(pasted.length, 3)]?.focus();
        updateCodeUI();
    });
});

updateCodeUI();

function tryUnlock(code) {
    if (unlocked) return;

    if (code === CONFIG.secretCode) {
        unlocked = true;
        seal.classList.remove('seal--ready');
        seal.classList.add('unlocking');
        codeInputsWrap.classList.add('code-success');
        codeError.classList.remove('show');
        document.body.classList.add('unlocked');

        setTimeout(() => seal.classList.add('broken'), 480);

        setTimeout(() => {
            gate.classList.add('exit');
            playCurtain();

            setTimeout(() => {
                invite.classList.remove('hidden');
                gate.classList.add('hidden');
                startPetals();
                startCountdown();
                initReveal();
                burstPetals();
                burstConfetti();
            }, 700);
        }, 500);
    } else {
        seal.classList.add('seal--nope');
        setTimeout(() => seal.classList.remove('seal--nope'), 450);
        codeError.classList.add('show');
        codeInputsWrap.classList.add('shake');
        codeInputs.forEach((el) => {
            el.value = '';
        });
        updateCodeUI();
        codeInputs[0].focus();
        setTimeout(() => {
            codeInputsWrap.classList.remove('shake');
            codeError.classList.remove('show');
        }, 2200);
    }
}

function pad(n) {
    return String(n).padStart(2, '0');
}

function startCountdown() {
    const target = new Date(CONFIG.weddingDate).getTime();
    const els = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
    };

    function setCell(el, value) {
        if (el.textContent !== value) {
            el.textContent = value;
            el.classList.remove('tick');
            void el.offsetWidth;
            el.classList.add('tick');
        }
    }

    function tick() {
        const diff = target - Date.now();
        if (diff <= 0) {
            Object.values(els).forEach((el) => {
                el.textContent = '00';
            });
            return;
        }
        setCell(els.days, pad(Math.floor(diff / 86400000)));
        setCell(els.hours, pad(Math.floor((diff % 86400000) / 3600000)));
        setCell(els.minutes, pad(Math.floor((diff % 3600000) / 60000)));
        setCell(els.seconds, pad(Math.floor((diff % 60000) / 1000)));
    }

    tick();
    setInterval(tick, 1000);
}

let petals = [];
let petalCanvas;
let petalCtx;

function startPetals() {
    petalCanvas = document.getElementById('petals');
    petalCtx = petalCanvas.getContext('2d');

    function resize() {
        petalCanvas.width = window.innerWidth;
        petalCanvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
        petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);

        for (let i = petals.length - 1; i >= 0; i--) {
            const p = petals[i];
            p.y += p.speed;
            p.x += p.drift;
            p.rot += p.rotSpeed;

            petalCtx.save();
            petalCtx.translate(p.x, p.y);
            petalCtx.rotate(p.rot);
            petalCtx.fillStyle = p.color;
            petalCtx.beginPath();
            petalCtx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
            petalCtx.fill();
            petalCtx.restore();

            if (p.y > petalCanvas.height + 30) petals.splice(i, 1);
        }

        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            const c = confettiPieces[i];
            c.x += c.vx;
            c.y += c.vy;
            c.vy += c.gravity;
            c.rot += c.vr;
            c.life -= 0.008;

            petalCtx.save();
            petalCtx.translate(c.x, c.y);
            petalCtx.rotate(c.rot);
            petalCtx.globalAlpha = Math.max(0, c.life);
            petalCtx.fillStyle = c.color;
            petalCtx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            petalCtx.restore();

            if (c.life <= 0 || c.y > petalCanvas.height + 20) confettiPieces.splice(i, 1);
        }

        if (petals.length < 40 && Math.random() < 0.07) spawnPetal();
        requestAnimationFrame(draw);
    }

    draw();
}

function spawnPetal(x, y, burst = false) {
    const colors = [
        'rgba(255, 182, 193, 0.55)',
        'rgba(255, 218, 224, 0.6)',
        'rgba(240, 198, 210, 0.5)',
        'rgba(255, 228, 225, 0.65)',
    ];
    petals.push({
        x: x ?? Math.random() * (petalCanvas?.width || window.innerWidth),
        y: y ?? -20,
        w: Math.random() * 6 + 4,
        h: Math.random() * 10 + 6,
        speed: burst ? Math.random() * 2 + 1 : Math.random() * 1 + 0.5,
        drift: Math.random() * 0.8 - 0.4,
        rot: Math.random() * Math.PI,
        rotSpeed: Math.random() * 0.04 - 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
    });
}

function burstPetals() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 55; i++) {
        spawnPetal(w * 0.5 + (Math.random() - 0.5) * 220, h * 0.32, true);
    }
}

function initReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blocks = document.querySelectorAll('.reveal');

    if (prefersReduced) {
        blocks.forEach((b) => b.classList.add('visible'));
        return;
    }

    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    blocks.forEach((b) => obs.observe(b));
}

rsvpBtn.addEventListener('click', () => {
    const msg = encodeURIComponent(
        `Hello!\n\nMy name is ______ and I'd love to confirm my attendance at ${CONFIG.groomName} & ${CONFIG.brideName}'s wedding on June 20, 2026.\n\nThank you!`
    );
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, '_blank', 'noopener');
});

shareBtn.addEventListener('click', async () => {
    const shareData = {
        title: `${CONFIG.groomName} & ${CONFIG.brideName} — Wedding`,
        text: `You're invited to our wedding! ${CONFIG.hashtag}`,
        url: window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (_) {
            /* cancelled */
        }
    } else {
        await navigator.clipboard.writeText(window.location.href);
        shareBtn.textContent = COPIED_LABEL;
        setTimeout(() => {
            shareBtn.textContent = SHARE_LABEL;
        }, 2000);
    }
});
