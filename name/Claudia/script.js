// ===========================
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initParticles();
    initPreloader();
    initScrollAnimations();
    initCandles();
    initTypewriterName();
    initWishWriter();
    initReplayButton();
    initFireworksButton();
    initMusicToggle();
    initHeartRain();
    initShare();
});

// ===========================
// Starfield (Preloader BG)
// ===========================
function initStarfield() {
    const container = document.getElementById('starsBg');
    const count = 120;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            --dur: ${Math.random() * 4 + 2}s;
            --delay: ${Math.random() * 4}s;
        `;
        container.appendChild(star);
    }
}

// ===========================
// Floating Particles
// ===========================
function initParticles() {
    const container = document.getElementById('particles');
    const colors = ['#ff6b9d', '#c44dff', '#ffd93d', '#ff9a56', '#64ffda', '#ff4081'];
    const count = 50;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
        particle.style.animationDelay = `${Math.random() * 12}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;

        container.appendChild(particle);
    }
}

// ===========================
// Preloader / Envelope
// ===========================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const envelope = document.getElementById('envelope');
    const mainContent = document.getElementById('mainContent');

    preloader.addEventListener('click', () => {
        if (envelope.classList.contains('opened')) return;
        envelope.classList.add('opened');

        // Sound effect
        playOpenSound();

        // Preloader particle burst
        createPreloaderBurst();

        setTimeout(() => {
            launchFireworks(3000);
        }, 600);

        setTimeout(() => {
            preloader.classList.add('fade-out');
            mainContent.classList.remove('hidden');
            // Start typewriter after content is visible
            setTimeout(() => startTypewriterName(), 1800);
        }, 1600);

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 2800);
    });
}

function createPreloaderBurst() {
    const container = document.getElementById('preParticles');
    const emojis = ['✨', '💫', '⭐', '🌟', '💖', '🎉', '🎊', '🦋', '🌸'];

    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = (i / 20) * Math.PI * 2;
        const dist = Math.random() * 150 + 80;
        el.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: ${Math.random() * 1.5 + 0.8}rem;
            pointer-events: none;
            transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 10;
        `;
        container.appendChild(el);

        requestAnimationFrame(() => {
            el.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
            el.style.opacity = '0';
        });

        setTimeout(() => el.remove(), 1500);
    }
}

// ===========================
// Fireworks (Canvas)
// ===========================
function launchFireworks(duration = 4000) {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rockets = [];
    const particles = [];
    const colors = ['#ff6b9d', '#c44dff', '#ffd93d', '#ff9a56', '#64ffda', '#ff4081', '#7c4dff', '#00e5ff', '#f50057'];
    const gravity = 0.06;
    const startTime = Date.now();
    let animFrame;

    function createRocket() {
        rockets.push({
            x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
            y: canvas.height,
            vx: (Math.random() - 0.5) * 3,
            vy: -(Math.random() * 6 + 8),
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 3,
            trail: [],
            exploded: false
        });
    }

    function explode(rocket) {
        const count = Math.floor(Math.random() * 60 + 40);
        const color = rocket.color;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            particles.push({
                x: rocket.x,
                y: rocket.y,
                vx: Math.cos(angle) * speed + (Math.random() - 0.5),
                vy: Math.sin(angle) * speed + (Math.random() - 0.5),
                color: color,
                size: Math.random() * 3 + 1,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.01,
                gravity: 0.03
            });
        }
    }

    function animate() {
        const elapsed = Date.now() - startTime;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(5, 0, 13, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = 'lighter';

        // Spawn rockets
        if (elapsed < duration - 1000 && Math.random() < 0.08) {
            createRocket();
        }

        // Update rockets
        for (let i = rockets.length - 1; i >= 0; i--) {
            const r = rockets[i];
            r.trail.push({ x: r.x, y: r.y, alpha: 0.8 });
            if (r.trail.length > 8) r.trail.shift();

            r.x += r.vx;
            r.y += r.vy;
            r.vy += gravity;

            // Draw trail
            r.trail.forEach((t, idx) => {
                ctx.beginPath();
                ctx.arc(t.x, t.y, r.size * (idx / r.trail.length), 0, Math.PI * 2);
                ctx.fillStyle = r.color;
                ctx.globalAlpha = t.alpha * (idx / r.trail.length);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Draw rocket head
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            // Explode when slowing down
            if (r.vy > -1) {
                explode(r);
                rockets.splice(i, 1);
            }
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.99;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        if (elapsed < duration || rockets.length > 0 || particles.length > 0) {
            animFrame = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animFrame);
        }
    }

    animate();

    const resizeHandler = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);
}

// ===========================
// Scroll Animations (IntersectionObserver)
// ===========================
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // Trigger typewriter for message texts
                    if (entry.target.classList.contains('message-card')) {
                        setTimeout(() => startMessageTypewriter(entry.target), 500);
                    }
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ===========================
// Typewriter Effect — Name
// ===========================
let nameTyped = false;

function initTypewriterName() {
    // Just placeholder — actual start triggered after preloader
}

function startTypewriterName() {
    if (nameTyped) return;
    nameTyped = true;
    const el = document.getElementById('nameText');
    const name = 'Claudia';
    let i = 0;

    function typeNext() {
        if (i < name.length) {
            el.textContent += name[i];
            i++;
            setTimeout(typeNext, 150 + Math.random() * 100);
        } else {
            setTimeout(() => el.classList.add('typed'), 500);
        }
    }

    setTimeout(typeNext, 300);
}

// ===========================
// Typewriter Effect — Messages
// ===========================
function startMessageTypewriter(card) {
    const texts = card.querySelectorAll('.typewrite');
    let index = 0;

    function typeMessage(textEl) {
        const fullText = textEl.getAttribute('data-text');
        if (!fullText || textEl.dataset.typed === 'true') {
            index++;
            if (index < texts.length) typeMessage(texts[index]);
            return;
        }

        textEl.dataset.typed = 'true';
        textEl.classList.add('typing');
        textEl.textContent = '';
        let charIdx = 0;

        function typeChar() {
            if (charIdx < fullText.length) {
                textEl.textContent += fullText[charIdx];
                charIdx++;
                const delay = fullText[charIdx - 1] === '.' || fullText[charIdx - 1] === ',' ? 200 : 25;
                setTimeout(typeChar, delay);
            } else {
                textEl.classList.remove('typing');
                index++;
                if (index < texts.length) {
                    setTimeout(() => typeMessage(texts[index]), 400);
                }
            }
        }

        typeChar();
    }

    if (texts.length > 0) typeMessage(texts[0]);
}

// ===========================
// Interactive Candles
// ===========================
function initCandles() {
    const candles = document.querySelectorAll('.candle');
    const progressFill = document.getElementById('candleProgress');
    const candleCount = document.getElementById('candleCount');
    let blownCount = 0;

    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            if (candle.classList.contains('blown')) return;

            candle.classList.add('blown');
            blownCount++;

            // Update progress
            const progress = (blownCount / candles.length) * 100;
            progressFill.style.width = `${progress}%`;
            candleCount.textContent = blownCount;

            // Sound
            playBlowSound();

            // Burst effect
            createCandleBurst(candle);

            if (blownCount === candles.length) {
                setTimeout(() => {
                    const msg = document.getElementById('candlesBlownMsg');
                    msg.classList.remove('hidden');
                    launchFireworks(3000);
                    playCelebrationSound();
                }, 700);
            }
        });
    });
}

function createCandleBurst(element) {
    const rect = element.getBoundingClientRect();
    const emojis = ['✨', '💫', '⭐', '🌟', '💛'];

    for (let i = 0; i < 10; i++) {
        const spark = document.createElement('div');
        spark.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        spark.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
            font-size: ${Math.random() * 0.8 + 0.8}rem;
            pointer-events: none;
            z-index: 1000;
            transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        `;
        document.body.appendChild(spark);

        requestAnimationFrame(() => {
            spark.style.transform = `translate(${(Math.random() - 0.5) * 120}px, ${-Math.random() * 120 - 30}px) rotate(${Math.random() * 360}deg) scale(0)`;
            spark.style.opacity = '0';
        });

        setTimeout(() => spark.remove(), 1200);
    }
}

// ===========================
// Wish Writer
// ===========================
function initWishWriter() {
    const input = document.getElementById('wishInput');
    const charCount = document.getElementById('charCount');
    const sendBtn = document.getElementById('wishSendBtn');
    const sentWishes = document.getElementById('sentWishes');

    input.addEventListener('input', () => {
        charCount.textContent = input.value.length;
    });

    sendBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        // Create wish item
        const item = document.createElement('div');
        item.classList.add('sent-wish-item');

        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        item.innerHTML = `
            <p>${escapeHtml(text)}</p>
            <div class="wish-time">Dikirim ke bintang pada ${timeStr} ✨</div>
        `;

        sentWishes.prepend(item);

        // Star burst from button
        const rect = sendBtn.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            star.textContent = '⭐';
            star.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 1000;
                transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1);
            `;
            document.body.appendChild(star);

            requestAnimationFrame(() => {
                const angle = (i / 8) * Math.PI * 2;
                star.style.transform = `translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 100 - 50}px) scale(0)`;
                star.style.opacity = '0';
            });

            setTimeout(() => star.remove(), 1500);
        }

        // Sound
        playChimeSound();

        // Clear
        input.value = '';
        charCount.textContent = '0';
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================
// Replay Button
// ===========================
function initReplayButton() {
    const replayBtn = document.getElementById('replayBtn');
    replayBtn.addEventListener('click', () => {
        const mainContent = document.getElementById('mainContent');
        const preloader = document.getElementById('preloader');

        // Reset candles
        document.querySelectorAll('.candle').forEach(c => c.classList.remove('blown'));
        document.getElementById('candlesBlownMsg').classList.add('hidden');
        document.getElementById('candleProgress').style.width = '0%';
        document.getElementById('candleCount').textContent = '0';

        // Reset animations
        document.querySelectorAll('.animate-in').forEach(el => el.classList.remove('animate-in'));

        // Reset typewriter
        document.getElementById('nameText').textContent = '';
        document.getElementById('nameText').classList.remove('typed');
        nameTyped = false;

        // Reset message typewriter
        document.querySelectorAll('.typewrite').forEach(el => {
            el.textContent = '';
            el.dataset.typed = 'false';
            el.classList.remove('typing');
        });

        // Show preloader
        mainContent.classList.add('hidden');
        preloader.style.display = 'flex';
        preloader.classList.remove('fade-out');
        document.getElementById('envelope').classList.remove('opened');

        window.scrollTo(0, 0);
    });
}

// ===========================
// Fireworks Button (Manual Trigger)
// ===========================
function initFireworksButton() {
    const btn = document.getElementById('fireworksBtn');
    btn.addEventListener('click', () => {
        launchFireworks(5000);
        playCelebrationSound();
    });
}

// ===========================
// Heart Rain
// ===========================
function initHeartRain() {
    const btn = document.getElementById('heartRainToggle');
    let isActive = false;
    let heartInterval = null;

    btn.addEventListener('click', () => {
        isActive = !isActive;
        btn.classList.toggle('active', isActive);

        if (isActive) {
            heartInterval = setInterval(() => {
                createHeartDrop();
            }, 200);
        } else {
            clearInterval(heartInterval);
            heartInterval = null;
        }
    });
}

function createHeartDrop() {
    const hearts = ['💖', '💕', '💗', '💓', '❤️', '🩷', '🌸'];
    const heart = document.createElement('div');
    heart.classList.add('heart-rain');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.setProperty('--x', `${Math.random() * 100}%`);
    heart.style.setProperty('--dur', `${Math.random() * 3 + 3}s`);
    heart.style.setProperty('--size', `${Math.random() * 1.2 + 0.6}rem`);
    heart.style.setProperty('--opacity', `${Math.random() * 0.5 + 0.3}`);
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6500);
}

// ===========================
// Music Toggle — Happy Birthday
// ===========================
function initMusicToggle() {
    const btn = document.getElementById('musicToggle');
    let isPlaying = false;
    let audioCtx = null;
    let melodyTimeout = null;
    let stopped = false;

    btn.addEventListener('click', () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (isPlaying) {
            stopped = true;
            if (melodyTimeout) clearTimeout(melodyTimeout);
            btn.classList.remove('playing');
            isPlaying = false;
        } else {
            stopped = false;
            btn.classList.add('playing');
            isPlaying = true;
            playMelody(audioCtx);
        }
    });

    function playMelody(ctx) {
        // Happy Birthday in C major - more musical version
        const melody = [
            { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.15 },
            { note: 'D4', dur: 0.5 }, { note: 'C4', dur: 0.5 },
            { note: 'F4', dur: 0.5 }, { note: 'E4', dur: 0.9 },
            { note: 'R', dur: 0.3 },
            { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.15 },
            { note: 'D4', dur: 0.5 }, { note: 'C4', dur: 0.5 },
            { note: 'G4', dur: 0.5 }, { note: 'F4', dur: 0.9 },
            { note: 'R', dur: 0.3 },
            { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.15 },
            { note: 'C5', dur: 0.5 }, { note: 'A4', dur: 0.5 },
            { note: 'F4', dur: 0.5 }, { note: 'E4', dur: 0.5 },
            { note: 'D4', dur: 0.9 },
            { note: 'R', dur: 0.3 },
            { note: 'Bb4', dur: 0.3 }, { note: 'Bb4', dur: 0.15 },
            { note: 'A4', dur: 0.5 }, { note: 'F4', dur: 0.5 },
            { note: 'G4', dur: 0.5 }, { note: 'F4', dur: 1.1 },
        ];

        const noteFreqs = {
            'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
            'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'C5': 523.25, 'R': 0
        };

        let time = ctx.currentTime + 0.1;

        melody.forEach(n => {
            const freq = noteFreqs[n.note];
            if (freq > 0) {
                playMusicalNote(ctx, freq, time, n.dur * 0.85);
            }
            time += n.dur;
        });

        const totalDur = melody.reduce((a, n) => a + n.dur, 0);
        melodyTimeout = setTimeout(() => {
            if (!stopped && isPlaying) {
                playMelody(ctx);
            }
        }, totalDur * 1000 + 800);
    }

    function playMusicalNote(ctx, freq, startTime, duration) {
        // Main oscillator — triangle for warmth
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        // Sub oscillator for fullness
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(freq, startTime);
        subGain.gain.setValueAtTime(0.08, startTime);

        // Vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(5.5, startTime);
        vibratoGain.gain.setValueAtTime(1.5, startTime);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);

        // Envelope
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
        gain.gain.setValueAtTime(0.12, startTime + duration * 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        sub.connect(subGain);
        subGain.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
        sub.start(startTime);
        sub.stop(startTime + duration + 0.05);
        vibrato.start(startTime);
        vibrato.stop(startTime + duration + 0.05);
    }
}

// ===========================
// Sound Effects
// ===========================
function getAudioCtx() {
    if (!window._sfxCtx) {
        window._sfxCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return window._sfxCtx;
}

function playOpenSound() {
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime;

        // Ascending sparkle sound
        [400, 600, 800, 1000, 1200].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t + i * 0.08);
            gain.gain.setValueAtTime(0, t + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.06, t + i * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + i * 0.08);
            osc.stop(t + i * 0.08 + 0.35);
        });
    } catch (e) { /* audio not available */ }
}

function playBlowSound() {
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime;

        // Soft "poof" with white noise
        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.exponentialRampToValueAtTime(200, t + 0.3);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.35);
    } catch (e) { /* audio not available */ }
}

function playChimeSound() {
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime;

        [800, 1000, 1200].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t + i * 0.12);
            gain.gain.setValueAtTime(0, t + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.05, t + i * 0.12 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + i * 0.12);
            osc.stop(t + i * 0.12 + 0.55);
        });
    } catch (e) { /* audio not available */ }
}

function playCelebrationSound() {
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime;

        // Fanfare
        const notes = [523, 659, 784, 1047, 784, 1047];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t + i * 0.15);
            gain.gain.setValueAtTime(0, t + i * 0.15);
            gain.gain.linearRampToValueAtTime(0.08, t + i * 0.15 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + i * 0.15);
            osc.stop(t + i * 0.15 + 0.45);
        });
    } catch (e) { /* audio not available */ }
}

// ===========================
// Mouse Sparkle Trail (Desktop)
// ===========================
if (window.matchMedia('(pointer: fine)').matches) {
    let lastSparkle = 0;
    const sparkleColors = ['#ff6b9d', '#c44dff', '#ffd93d', '#64ffda', '#ff9a56'];

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < 50) return;
        lastSparkle = now;

        const sparkle = document.createElement('div');
        const size = Math.random() * 6 + 3;
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];

        sparkle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            box-shadow: 0 0 ${size * 2}px ${color};
            transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        `;

        document.body.appendChild(sparkle);

        requestAnimationFrame(() => {
            sparkle.style.transform = `translate(${(Math.random() - 0.5) * 40}px, ${-Math.random() * 50 - 10}px) scale(0)`;
            sparkle.style.opacity = '0';
        });

        setTimeout(() => sparkle.remove(), 600);
    });
}

// ===========================
// Days Counter Animation
// ===========================
(function animateCounter() {
    const el = document.getElementById('daysCount');
    if (!el) return;

    const target = 7;
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.round(eased * target);
        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    // Start after preloader opens (observe visibility)
    const observer = new MutationObserver(() => {
        const main = document.getElementById('mainContent');
        if (!main.classList.contains('hidden')) {
            setTimeout(() => requestAnimationFrame(update), 3500);
            observer.disconnect();
        }
    });

    observer.observe(document.getElementById('mainContent'), { attributes: true, attributeFilter: ['class'] });
})();

// ===========================
// Share Functionality (with Capture)
// ===========================
function initShare() {
    const shareToggle = document.getElementById('shareToggle');
    const shareOverlay = document.getElementById('shareOverlay');
    const shareClose = document.getElementById('shareClose');
    const shareWhatsApp = document.getElementById('shareWhatsApp');
    const shareInstagram = document.getElementById('shareInstagram');
    const shareCopyLink = document.getElementById('shareCopyLink');
    const shareNative = document.getElementById('shareNative');
    const shareCaptureBtn = document.getElementById('shareCaptureBtn');
    const toast = document.getElementById('shareToast');

    // Capture elements
    const captureOverlay = document.getElementById('captureOverlay');
    const capturePreviewImg = document.getElementById('capturePreviewImg');
    const captureDownloadBtn = document.getElementById('captureDownloadBtn');
    const captureShareBtn = document.getElementById('captureShareBtn');
    const captureCloseBtn = document.getElementById('captureCloseBtn');
    const captureLoading = document.getElementById('captureLoading');

    // Store last captured data
    let lastCapturedBlob = null;
    let lastCapturedDataUrl = null;

    // Get current page URL
    function getShareUrl() {
        return window.location.href;
    }

    const shareTitle = '🎂 Happy Birthday Claudia!';
    const shareText = '🎉 Ada kejutan ulang tahun spesial untuk Claudia! Buka link ini untuk melihatnya ✨';

    // Show native share on supported devices
    if (navigator.share) {
        shareNative.style.display = 'flex';
    }

    // ---- Scene Detection ----
    function getCurrentScene() {
        const scenes = document.querySelectorAll('.scene');
        let bestScene = scenes[0];
        let bestVisibility = 0;

        scenes.forEach(scene => {
            const rect = scene.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how much of the scene is visible in viewport
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(viewportHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibility = visibleHeight / viewportHeight;

            if (visibility > bestVisibility) {
                bestVisibility = visibility;
                bestScene = scene;
            }
        });

        return bestScene;
    }

    // ---- Capture Scene using html2canvas ----
    async function captureCurrentScene() {
        const scene = getCurrentScene();
        if (!scene) {
            showToast('Tidak bisa menangkap scene 😔');
            return null;
        }

        // Show loading
        captureLoading.classList.add('active');

        try {
            // Temporarily hide floating UI elements during capture
            const uiElements = document.querySelectorAll(
                '.music-toggle, .heart-rain-toggle, .share-toggle, .share-overlay, .capture-overlay, .capture-loading, .share-toast'
            );
            uiElements.forEach(el => {
                el.dataset.prevDisplay = el.style.display;
                if (!el.classList.contains('capture-loading')) {
                    el.style.display = 'none';
                }
            });

            const canvas = await html2canvas(scene, {
                backgroundColor: '#05000d', // Match the dark background
                scale: 2, // Higher resolution for Instagram quality
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: scene.scrollWidth,
                height: scene.clientHeight,
                scrollX: 0,
                scrollY: -window.scrollY,
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: window.innerHeight
            });

            // Restore UI elements
            uiElements.forEach(el => {
                el.style.display = el.dataset.prevDisplay || '';
                delete el.dataset.prevDisplay;
            });

            // Convert canvas to blob and data URL
            lastCapturedDataUrl = canvas.toDataURL('image/png');

            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/png');
            });
            lastCapturedBlob = blob;

            captureLoading.classList.remove('active');
            return { dataUrl: lastCapturedDataUrl, blob: lastCapturedBlob };

        } catch (err) {
            console.error('Capture error:', err);
            captureLoading.classList.remove('active');

            // Restore UI elements on error
            const uiElements = document.querySelectorAll(
                '.music-toggle, .heart-rain-toggle, .share-toggle, .share-overlay, .capture-overlay, .capture-loading, .share-toast'
            );
            uiElements.forEach(el => {
                el.style.display = el.dataset.prevDisplay || '';
                delete el.dataset.prevDisplay;
            });

            showToast('Gagal menangkap layar 😔');
            return null;
        }
    }

    // ---- Show Capture Preview ----
    function showCapturePreview(dataUrl) {
        capturePreviewImg.src = dataUrl;
        shareOverlay.classList.remove('active');
        captureOverlay.classList.add('active');

        // Show share button if Web Share API supports files
        if (navigator.canShare && lastCapturedBlob) {
            const file = new File([lastCapturedBlob], 'birthday-surprise-ella.png', { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
                captureShareBtn.style.display = 'flex';
            }
        }
    }

    // ---- Download captured image ----
    captureDownloadBtn.addEventListener('click', () => {
        if (!lastCapturedDataUrl) return;

        const link = document.createElement('a');
        link.download = 'birthday-surprise-ella.png';
        link.href = lastCapturedDataUrl;
        link.click();
        showToast('Gambar berhasil diunduh! 📥');
    });

    // ---- Share captured image via Web Share API ----
    captureShareBtn.addEventListener('click', async () => {
        if (!lastCapturedBlob) return;

        const file = new File([lastCapturedBlob], 'birthday-surprise-ella.png', { type: 'image/png' });

        try {
            await navigator.share({
                title: shareTitle,
                text: shareText,
                files: [file]
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                showToast('Gagal membagikan gambar 😔');
            }
        }
        captureOverlay.classList.remove('active');
    });

    // ---- Close capture preview ----
    captureCloseBtn.addEventListener('click', () => {
        captureOverlay.classList.remove('active');
    });

    captureOverlay.addEventListener('click', (e) => {
        if (e.target === captureOverlay) {
            captureOverlay.classList.remove('active');
        }
    });

    // ---- Open/Close share overlay ----
    shareToggle.addEventListener('click', () => {
        shareOverlay.classList.add('active');
    });

    shareClose.addEventListener('click', () => {
        shareOverlay.classList.remove('active');
    });

    shareOverlay.addEventListener('click', (e) => {
        if (e.target === shareOverlay) {
            shareOverlay.classList.remove('active');
        }
    });

    // ---- Capture Scene button (general capture) ----
    shareCaptureBtn.addEventListener('click', async () => {
        const result = await captureCurrentScene();
        if (result) {
            showCapturePreview(result.dataUrl);
        }
    });

    // ---- Instagram: Capture → Preview → Download/Share ----
    shareInstagram.addEventListener('click', async () => {
        const result = await captureCurrentScene();
        if (result) {
            showCapturePreview(result.dataUrl);
            showToast('Gambar siap! Download lalu upload ke IG Story 📸');
        }
    });

    // ---- Native Share (smartphones) ----
    shareNative.addEventListener('click', async () => {
        try {
            await navigator.share({
                title: shareTitle,
                text: shareText,
                url: getShareUrl()
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                showToast('Gagal membagikan 😔');
            }
        }
        shareOverlay.classList.remove('active');
    });

    // ---- WhatsApp Share ----
    shareWhatsApp.addEventListener('click', () => {
        const message = `${shareText}\n\n${getShareUrl()}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        shareOverlay.classList.remove('active');
    });

    // ---- Copy Link ----
    shareCopyLink.addEventListener('click', () => {
        navigator.clipboard.writeText(getShareUrl()).then(() => {
            showToast('Link berhasil disalin! 📋');
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = getShareUrl();
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('Link berhasil disalin! 📋');
        });
        shareOverlay.classList.remove('active');
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}

