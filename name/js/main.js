// Birthday Celebration Application - Enhanced Version
// Messages configuration
const pesan = [
    "Hai, [Nama]! Selamat ulang tahun yaahhh! 🎉 Semoga hari spesialmu penuh dengan kebahagiaan dan kejutan indah!",
    "Hai, [Nama]! Selamat ulang tahun yaahhh! 🎉 Semoga hari spesialmu penuh dengan kebahagiaan dan kejutan indah!",
    "Hai, [Nama]! Selamat ulang tahun yaahhh! 🎉 Semoga hari spesialmu penuh dengan kebahagiaan dan kejutan indah!",
    "Hai, [Nama]! Selamat ulang tahun yaahhh! 🎉 Semoga hari spesialmu penuh dengan kebahagiaan dan kejutan indah!",
    "Hai, [Nama]! Selamat ulang tahun yaahhh! 🎉 Semoga hari spesialmu penuh dengan kebahagiaan dan kejutan indah!",
];
let indeksPesanSekarang = 0;
let audioElement;

// ============ Audio Initialization ============
function initAudio() {
    audioElement = new Audio();
    audioElement.loop = true;
    audioElement.volume = 0.7;

    const audioSelect = document.getElementById('audioSelect');
    const playPauseButton = document.getElementById('playPauseButton');
    const volumeControl = document.getElementById('volumeControl');

    audioSelect.addEventListener('change', function () {
        const wasPlaying = !audioElement.paused;
        audioElement.src = this.value;
        if (wasPlaying) {
            audioElement.play()
                .then(() => playPauseButton.textContent = '❚❚')
                .catch(err => console.error('Playback failed:', err));
        }
    });

    playPauseButton.addEventListener('click', () => {
        if (audioElement.paused) {
            audioElement.play();
            playPauseButton.textContent = '❚❚';
        } else {
            audioElement.pause();
            playPauseButton.textContent = '▶';
        }
    });

    audioElement.addEventListener('play', () => {
        playPauseButton.textContent = '❚❚';
    });

    audioElement.addEventListener('pause', () => {
        playPauseButton.textContent = '▶';
    });

    audioElement.addEventListener('error', () => {
        console.error('Audio error:', audioElement.error);
        showNotification('⚠️ Audio Error', 'error');
    });

    volumeControl.addEventListener('input', function () {
        setVolume(this.value);
    });

    audioElement.src = audioSelect.value;

    // Initialize lyrics on first load
    updateLyrics(audioSelect.value);
}

// ============ Lyrics System ============
const lyricsDatabase = {
    "assets/audio/Romantic Birthday Song for Lovers No. 2 in A Major.mp3": {
        title: "🎂 Birthday Song",
        lyrics: `Happy birthday to you
Happy birthday to you
Happy birthday, happy birthday
Happy birthday to you

On this special day
We celebrate with you
May all your wishes come true
Happy birthday to you

[Instrumental]

Wishing you joy and love
Blessings from above
On this day so bright
Everything feels just right

Happy birthday to you  
Happy birthday to you
Happy birthday, happy birthday
Happy birthday to you`
    },
    "assets/audio/Franky Sihombing - Jangan Lelah (official lyric video).mp3": {
        title: "🎵 Jangan Lelah - Franky Sihombing",
        lyrics: `Jangan lelah untuk tersenyum
Walau dunia tak selalu indah
Jangan lelah untuk tetap percaya
Bahwa esok kan lebih baik

Jangan lelah untuk berdoa
Walau terasa tak terkabul
Jangan lelah untuk tetap yakin
Tuhan s'lalu bersamamu

Reff:
Jangan pernah lelah
Untuk terus berjalan
Walau jalan terasa berat
Jangan pernah lelah
Untuk terus bermimpi
Walau mimpi terasa jauh

Ada pelangi
Setelah hujan reda
Ada cahaya
Di penghujung gelapnya malam
Tetaplah kuat
Jangan menyerah
Tuhan pasti memberi jalan

[Repeat Reff]

Jangan lelah
Jangan menyerah
Tetaplah berjuang`
    },
    "assets/audio/Gigi Perez - Sailor Song (Lyrics).mp3": {
        title: "⛵ Sailor Song - Gigi Perez",
        lyrics: `I saw her in the rightest way
Looking like Anne Hathaway
Laughing while she hit her pen
And coughed, and coughed

And then, she came up to my knees
Begging: Baby, would you please?
Do the things you said you'd do
To me, to me

Oh, won't you kiss me on the mouth and love me like a sailor?
And when you get a taste, can you tell me what's my flavor?
I don't believe in God, but I believe that you're my savior
My mom says that she's worried, but I'm covered in this favor

And when we're getting dirty, I forget all that is wrong
I sleep so I can see you 'cause I hate to wait so long
I sleep so I can see you and I hate to wait so long

She took my fingers to her mouth
The kind of thing that makes you proud
That nothing else had ever
Worked out, worked out

And lately, I've tried other things
But nothing can capture the sting
Of the venom she's gonna spit out
Right now, oh

Won't you kiss me on the mouth and love me like a sailor?
And when you get a taste, can you tell me what's my flavor?
I don't believe in God, but I believe that you're my savior
My mom says that she's worried, but I'm covered in this favor

And when we're getting dirty, I forget all that is wrong  
I sleep so I can see you 'cause I hate to wait so long
I sleep so I can see you and I hate to wait so long`
    },
    "assets/audio/Hindia - everything u are.mp3": {
        title: "✨ Everything U Are - Hindia",
        lyrics: `🎵 Hindia - everything u are

Wajahmu kuingat selalu
Lupakan hal-hal yang menggangguku
Karena hari ini mata kita beradu
Kita saling bantu melepas perasaan

Tinggi ke angkasa, menantang dunia
Merayakan muda ‘tuk satu jam saja
Kita hampir mati dan kau selamatkan aku
Dan ku menyelamatkanmu dan sekarang aku tahu

Cerita kita tak jauh berbeda
Got beat down by the world, sometimes I wanna fold
Namun suratmu kan kuceritakan ke anak-anakku nanti
Bahwa aku pernah dicintai with everything you are
Fully as I am with everything you are

Wajahmu yang beragam rupa
Pastikan ku tak sendirian
Jalani derita, kau bawakan kisahmu
Aku mendengarkan, oh kita bergantian

Bertukar nestapa, menawar trauma
Datang seadanya, terasku terbuka
Kita hampir mati dan kau sеlamatkan aku
Dan ku menyelamatkanmu dan sekarang aku tahu

Cеrita kita tak jauh berbeda
Got beat down by the world, sometimes I wanna fold
Namun suratmu kan kuceritakan ke anak-anakku nanti
Bahwa aku pernah dicintai

Seada-adanya, sekurang-kurangnya
Walau sulit utarakan hatiku dengan indah
Walau jarang ku bernyanyi dengan cara yang indah
Tapi tak sekali pun kisahku pernah kau bantah

Cerita kita tak jauh berbeda
Got beat down by the world (beat down by the world), sometimes I wanna fold
Namun suratmu kan kuceritakan ke anak-anakku nanti
Bahwa aku pernah dicintai with everything you are
Fully as I am with everything you are`
    },
    "assets/audio/【MV】Fond Memories - Kobo Kanaeru.mp3": {
        title: "💭 Fond Memories - Kobo Kanaeru",
        lyrics: `🎵 Kobo Kanaeru - Fond Memories

Suara hujan yang menyentuh memori
Dengarlah rindu yang menyiksa ini
Tak bisa lepas dari sandaran waktu
Oh kasih, ingatkah?

Gema ruang kosong kala itu
Kau memanggilku
"Andai kau tahu, kehadiranmu"
Suaramu berdengung di pikiranku

Kembalilah, tak sanggup merindukanmu
Kasihku akan senyummu
Bila saja raga ini tetap dalam mimpi

Gema ruang kosong kala itu
Kau merayuku
"Tersenyumlah kasih, saat 'ku pergi"
Tak rela berpisah, lupakan fond memories, —ies

Kembalilah, tak sanggup merindukanmu
Kasihku akan senyummu
Bila saja raga ini tetap dalam mimpi

Kembali, kembali, kembali jangan pergi
Kembali, kembali
Kembali, kembali, kembali jangan pergi
(Pergi sayangku, usai sedihmu) Kembali, kembali, kembali jangan pergi
(Janganlah kau terus terjebak) Kembali, kembali
('Kan 'ku dampingimu selamanya) Kembali, kembali, kembali jangan pergi
Takkan 'ku lupakanmu

Kembalilah, tak sanggup merindukanmu
Kasihku akan senyummu
Bila saja raga ini tetap dalam mimpi, —i
Kembalilah (Aku pulang), tak sanggup merindukanmu (Jaga dirimu)
Kasihku akan senyummu (Kasihku rindu senyummu)
Bila saja (Bila) raga ini tetap dalam mimpi (Ikhlaskan pergi)`
    }
};

function updateLyrics(songPath) {
    const lyricsText = document.getElementById('lyricsText');
    const lyricsTitle = document.getElementById('lyricsTitle');

    const songData = lyricsDatabase[songPath];
    if (songData) {
        lyricsTitle.textContent = songData.title;
        lyricsText.textContent = songData.lyrics;
    } else {
        lyricsTitle.textContent = "Lirik Lagu";
        lyricsText.textContent = "Lirik tidak tersedia untuk lagu ini.";
    }
}

function initLyricsToggle() {
    const lyricsToggle = document.getElementById('lyricsToggle');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const audioSelect = document.getElementById('audioSelect');

    let lyricsVisible = false;

    lyricsToggle.addEventListener('click', () => {
        lyricsVisible = !lyricsVisible;
        lyricsContainer.className = lyricsVisible ? 'lyrics-visible' : 'lyrics-hidden';
        lyricsToggle.textContent = lyricsVisible ? '❌' : '📝';
    });

    // Update lyrics when song changes
    audioSelect.addEventListener('change', function () {
        updateLyrics(this.value);
    });
}

// ============ Particle Background System ============
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        ctx.globalAlpha = 0.1;
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ============ Music Start ============
function mulaiMusik() {
    const musicStart = document.getElementById('musicStart');
    audioElement.play()
        .then(() => {
            musicStart.style.opacity = '0';
            musicStart.style.pointerEvents = 'none';
            setTimeout(() => {
                musicStart.classList.add('hidden');
            }, 500);
            showNotification('🎵 Musik Dimulai!', 'success');
        })
        .catch(err => {
            console.error('Playback failed:', err);
            alert('Mohon izinkan pemutaran musik untuk melanjutkan');
        });
}

// ============ Name Selection ============
function pilihNama(nama) {
    document.getElementById('friendNameDisplay').textContent = nama;
    const tombol = document.querySelectorAll('#nameButtons button');
    tombol.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === nama) {
            btn.classList.add('selected');
            createSparklesAround(btn);
        }
    });

    let displayEl = document.querySelector('.selected-name-display');
    if (!displayEl) {
        displayEl = document.createElement('div');
        displayEl.className = 'selected-name-display';
        document.getElementById('nameInput').insertBefore(
            displayEl,
            document.querySelector('#nameInput .btn-start')
        );
    }
    displayEl.textContent = `✨ Nama terpilih: ${nama} ✨`;
    showNotification(`Dipilih: ${nama}`, 'success');
}

// ============ Start Celebration ============
function mulaiPerayaan() {
    const nama = document.getElementById('friendNameDisplay').textContent;
    if (!nama) {
        alert('Pilih namamu dulu ya! 😊');
        return;
    }

    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';

    indeksPesanSekarang = 0;
    tampilkanPesanBerikutnya();

    if (audioElement.paused) {
        audioElement.play();
    }

    buatPartikel();
    buatKembangApi();
    createConfetti();
}

// ============ Message Display ============
function tampilkanPesanBerikutnya() {
    const containerPesan = document.getElementById('popupContainer');
    if (indeksPesanSekarang < pesan.length) {
        containerPesan.classList.add('show');
        const popup = document.createElement('div');
        popup.className = 'popup';
        const pesanFormatted = pesan[indeksPesanSekarang].replace('[Nama]',
            document.getElementById('friendNameDisplay').textContent);

        popup.innerHTML = `
            <div class="popup-content">
                <h3>💌 Pesan Untukmu</h3>
                <p>${pesanFormatted}</p>
                <button onclick="event.stopPropagation(); lanjutPesan()">Lanjut</button>
            </div>
        `;

        containerPesan.innerHTML = '';
        containerPesan.appendChild(popup);

        containerPesan.onclick = (e) => {
            if (e.target === containerPesan) {
                e.stopPropagation();
            }
        };

        setTimeout(() => popup.classList.add('show'), 100);

        indeksPesanSekarang++;
    } else {
        containerPesan.classList.remove('show');
        containerPesan.style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        addVirtualCandles();
        createConfetti();
    }
}

function lanjutPesan() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            tampilkanPesanBerikutnya();
        }, 300);
    }
}

// ============ Enhanced Particle System ============
function buatPartikel() {
    const particles = [
        { type: '❤', class: 'heart' },
        { type: '⭐', class: 'star' },
        { type: '🦋', class: 'butterfly' },
        { type: 'petal', class: 'petal' }
    ];
    const container = document.getElementById('particlesContainer');

    function animate() {
        if (Math.random() < 0.008) {
            const particleConfig = particles[Math.floor(Math.random() * particles.length)];
            const particle = document.createElement('div');

            if (particleConfig.type === 'petal') {
                particle.className = 'petal';
            } else {
                particle.className = `particle ${particleConfig.class}`;
                particle.innerHTML = particleConfig.type;
            }

            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.setProperty('--drift', (Math.random() * 20 - 10).toFixed(2));

            container.appendChild(particle);
            setTimeout(() => particle.remove(), 18000);
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ============ Enhanced Fireworks ============
function buatKembangApi() {
    const container = document.getElementById('fireworksContainer');

    function createFirework() {
        if (Math.random() < 0.03) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${20 + Math.random() * 60}vw`;
            firework.style.top = `${20 + Math.random() * 60}vh`;
            const hue = Math.random() * 360;
            firework.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
            firework.style.boxShadow = `0 0 30px hsl(${hue}, 100%, 50%), 0 0 60px hsl(${hue}, 100%, 50%)`;

            container.appendChild(firework);
            setTimeout(() => firework.remove(), 1500);
        }
        requestAnimationFrame(createFirework);
    }
    createFirework();
}

// ============ Confetti System ============
function createConfetti() {
    const confettiCount = 150;
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#a29bfe', '#fd79a8', '#fdcb6e'];

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                opacity: ${Math.random() * 0.5 + 0.5};
                z-index: 10000;
                pointer-events: none;
            `;

            document.body.appendChild(confetti);

            const duration = Math.random() * 2000 + 2000;
            const rotation = Math.random() * 720 - 360;
            const xMovement = Math.random() * 200 - 100;

            confetti.animate([
                { transform: 'translateY(0) rotate(0deg) translateX(0)' },
                { transform: `translateY(100vh) rotate(${rotation}deg) translateX(${xMovement}px)` }
            ], {
                duration: duration,
                easing: 'cubic-bezier(.25, .46, .45, .94)'
            }).onfinish = () => confetti.remove();
        }, i * 30);
    }
}

// ============ Sparkle Effects ============
function createSparklesAround(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 15;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;

        sparkle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #fff, #ffd700);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 10000;
        `;

        document.body.appendChild(sparkle);

        sparkle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}

// ============ Candles ============
function addVirtualCandles() {
    const container = document.getElementById('candleContainer');
    container.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.innerHTML = '<div class="flame"></div>';
        candle.onclick = () => toggleFlame(candle);
        container.appendChild(candle);
    }
}

function toggleFlame(candle) {
    const flame = candle.querySelector('.flame');
    if (flame && flame.style.display !== 'none') {
        // Blow out effect
        flame.style.animation = 'blowOut 0.5s ease-out forwards';
        createSmoke(flame);
        setTimeout(() => {
            flame.style.display = 'none';
        }, 500);
        showNotification('🕯️ Lilin Padam!', 'success');
    } else if (flame) {
        flame.style.display = 'block';
        flame.style.animation = 'flicker 0.3s ease-in-out infinite alternate';
        showNotification('🔥 Lilin Menyala!', 'success');
    }
}

// ============ Smoke Effect ============
function createSmoke(flameElement) {
    const rect = flameElement.getBoundingClientRect();
    const smokeCount = 5;

    for (let i = 0; i < smokeCount; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(128, 128, 128, 0.5), transparent);
                border-radius: 50%;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top}px;
                pointer-events: none;
                z-index: 10000;
            `;

            document.body.appendChild(smoke);

            smoke.animate([
                { transform: 'translateY(0) scale(1)', opacity: 0.5 },
                { transform: 'translateY(-100px) scale(2)', opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            }).onfinish = () => smoke.remove();
        }, i * 100);
    }
}

// ============ Make A Wish (Canvas Animation) ============
function makeWish() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.animation = 'blowOut 0.5s ease-out forwards';
            createSmoke(flame);
            setTimeout(() => {
                flame.style.display = 'none';
            }, 500);
        }, index * 200);
    });

    setTimeout(() => {
        launchWishAnimation();
    }, 1000);
}

function launchWishAnimation() {
    const selectedName = document.getElementById('friendNameDisplay').textContent;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        opts = {
            strings: ['HAPPY', 'BIRTHDAY', selectedName + '!'],
            charSize: 30,
            charSpacing: 35,
            lineHeight: 40,
            letterContemplatingWaitTime: 1000,
            fadeOutTime: 500,
            balloonSpawnTime: 20,
            fireworkPrevPoints: 10,
            fireworkBaseLineWidth: 5,
            fireworkAddedLineWidth: 8,
            fireworkSpawnTime: 200,
            fireworkBaseReachTime: 30,
            fireworkAddedReachTime: 30,
            fireworkCircleBaseSize: 20,
            fireworkCircleAddedSize: 10,
            fireworkCircleBaseTime: 30,
            fireworkCircleAddedTime: 30,
            fireworkCircleFadeBaseTime: 10,
            fireworkCircleFadeAddedTime: 5,
            fireworkBaseShards: 5,
            fireworkAddedShards: 5,
            fireworkShardPrevPoints: 3,
            fireworkShardBaseVel: 4,
            fireworkShardAddedVel: 2,
            fireworkShardBaseSize: 3,
            fireworkShardAddedSize: 3,
            gravity: .1,
            upFlow: -.1,
            cx: w / 2,
            cy: h / 2,
        },
        Tau = Math.PI * 2;

    let letters = [];
    ctx.font = opts.charSize + 'px Verdana';

    function Letter(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;
        this.dx = -ctx.measureText(char).width / 2;
        this.dy = +opts.charSize / 2;
        this.fireworkDy = this.y - h / 2;
        this.color = `hsl(${x / w * 360}, 80%, 50%)`;
        this.lightAlphaColor = `hsla(${x / w * 360}, 80%, light%, alp)`;
        this.lightColor = `hsl(${x / w * 360}, 80%, light%)`;
        this.alphaColor = `hsla(${x / w * 360}, 80%, 50%, alp)`;
        this.reset();
    }

    Letter.prototype.reset = function () {
        this.phase = 'firework';
        this.tick = 0;
        this.spawned = false;
        this.spawningTime = opts.fireworkSpawnTime * Math.random() | 0;
        this.reachTime = opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random() | 0;
        this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
        this.prevPoints = [[0, h / 2, 0]];
    };

    Letter.prototype.step = function () {
        if (this.phase === 'firework') {
            if (!this.spawned) {
                ++this.tick;
                if (this.tick >= this.spawningTime) {
                    this.tick = 0;
                    this.spawned = true;
                }
            } else {
                ++this.tick;

                let linearProportion = this.tick / this.reachTime,
                    armonicProportion = Math.sin(linearProportion * Math.PI / 2),
                    x = linearProportion * this.x,
                    y = h / 2 + armonicProportion * this.fireworkDy;

                if (this.prevPoints.length > opts.fireworkPrevPoints)
                    this.prevPoints.shift();

                this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

                let lineWidthProportion = 1 / (this.prevPoints.length - 1);

                for (let i = 1; i < this.prevPoints.length; ++i) {
                    let point = this.prevPoints[i],
                        point2 = this.prevPoints[i - 1];
                    ctx.strokeStyle = this.alphaColor.replace('alp', i / this.prevPoints.length);
                    ctx.lineWidth = point[2] * lineWidthProportion * i;
                    ctx.beginPath();
                    ctx.moveTo(point[0], point[1]);
                    ctx.lineTo(point2[0], point2[1]);
                    ctx.stroke();
                }

                if (this.tick >= this.reachTime) {
                    this.phase = 'contemplate';
                    this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
                    this.circleCompleteTime = opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random() | 0;
                    this.circleCreating = true;
                    this.circleFading = false;
                    this.circleFadeTime = opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random() | 0;
                    this.tick = 0;
                    this.tick2 = 0;
                    this.shards = [];

                    let shardCount = opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random() | 0,
                        angle = Tau / shardCount,
                        cos = Math.cos(angle),
                        sin = Math.sin(angle),
                        x = 1,
                        y = 0;

                    for (let i = 0; i < shardCount; ++i) {
                        let x1 = x;
                        x = x * cos - y * sin;
                        y = y * cos + x1 * sin;
                        this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
                    }
                }
            }
        } else if (this.phase === 'contemplate') {
            ++this.tick;

            if (this.circleCreating) {
                ++this.tick2;
                var proportion = this.tick2 / this.circleCompleteTime,
                    armonic = -Math.cos(proportion * Math.PI) / 2 + .5;

                ctx.fillStyle = this.lightAlphaColor.replace('light', 50 + 50 * proportion).replace('alp', proportion);
                ctx.beginPath();
                ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
                ctx.fill();

                if (this.tick2 > this.circleCompleteTime) {
                    this.tick2 = 0;
                    this.circleCreating = false;
                    this.circleFading = true;
                }
            } else if (this.circleFading) {
                ctx.fillStyle = this.lightColor.replace('light', 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                ++this.tick2;
                var proportion = this.tick2 / this.circleFadeTime,
                    armonic = -Math.cos(proportion * Math.PI) / 2 + .5;

                ctx.fillStyle = this.lightAlphaColor.replace('light', 100).replace('alp', 1 - armonic);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
                ctx.fill();

                if (this.tick2 >= this.circleFadeTime)
                    this.circleFading = false;
            } else {
                ctx.fillStyle = this.lightColor.replace('light', 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
            }

            for (var i = 0; i < this.shards.length; ++i) {
                this.shards[i].step();
                if (!this.shards[i].alive) {
                    this.shards.splice(i, 1);
                    --i;
                }
            }

            if (this.tick > opts.letterContemplatingWaitTime) {
                this.phase = 'done';
                ctx.fillStyle = this.lightColor.replace('light', 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
            }
        }
    };

    function Shard(x, y, vx, vy, color) {
        let vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();
        this.vx = vx * vel;
        this.vy = vy * vel;
        this.x = x;
        this.y = y;
        this.color = color;
        this.prevPoints = [[x, y]];
        this.alive = true;
        this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
    }

    Shard.prototype.step = function () {
        this.x += this.vx;
        this.y += this.vy += opts.gravity;

        if (this.prevPoints.length > opts.fireworkShardPrevPoints)
            this.prevPoints.shift();
        this.prevPoints.push([this.x, this.y]);

        let lineWidthProportion = this.size / this.prevPoints.length;

        for (let k = 0; k < this.prevPoints.length - 1; ++k) {
            let point = this.prevPoints[k],
                point2 = this.prevPoints[k + 1];

            ctx.strokeStyle = this.color.replace('alp', k / this.prevPoints.length);
            ctx.lineWidth = k * lineWidthProportion;
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.stroke();
        }

        if (this.prevPoints[0][1] > h)
            this.alive = false;
    };

    function anim() {
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, w, h);

        ctx.translate(w / 2, h / 2);

        let done = true;
        for (let l = 0; l < letters.length; ++l) {
            letters[l].step();
            if (letters[l].phase !== 'done')
                done = false;
        }

        ctx.translate(-w / 2, -h / 2);

        if (done)
            for (let l = 0; l < letters.length; ++l)
                letters[l].reset();

        requestAnimationFrame(anim);
    }

    for (let i = 0; i < opts.strings.length; ++i) {
        for (let j = 0; j < opts.strings[i].length; ++j) {
            letters.push(new Letter(opts.strings[i][j],
                j * opts.charSpacing + opts.charSpacing / 2 - opts.strings[i].length * opts.charSize / 2,
                i * opts.lineHeight + opts.lineHeight / 2 - opts.strings.length * opts.lineHeight / 2));
        }
    }

    anim();

    setTimeout(() => {
        document.body.removeChild(canvas);
        showWishPopup();
    }, 8000);
}

// ============ Wish Popup ============
function showWishPopup() {
    const popupContainerWish = document.getElementById('popupContainerWish');
    if (!popupContainerWish) {
        console.error('popupContainerWish not found');
        return;
    }

    popupContainerWish.classList.add('show');
    popupContainerWish.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <h3>✨ Make a Wish! ✨</h3>
        <p>Tutup mata, ucapkan doamu...</p>
        <p>Semoga semua harapanmu terkabul! 🌟</p>
        <button onclick="closeWishPopup(); createConfetti();">Amin ❤️</button>
    `;
    popupContainerWish.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 100);
}

function closeWishPopup() {
    const popup = document.querySelector('#popupContainerWish .popup');
    const popupContainerWish = document.getElementById('popupContainerWish');

    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popupContainerWish.classList.remove('show');
            popupContainerWish.style.display = 'none';
        }, 400);
    }
}

// ============ Message Sending ============
function kirimPesanSahabat() {
    const pesan = document.getElementById('messageText').value;
    if (!pesan.trim()) {
        alert('Mohon tulis pesanmu terlebih dahulu! 😊');
        return;
    }

    const nomorWA = "+6289515583710";
    const pesanURL = encodeURIComponent(pesan);
    window.open(`https://wa.me/${nomorWA}?text=${pesanURL}`, '_blank');

    document.getElementById('messageResult').style.display = 'block';
    document.getElementById('messageResult').innerHTML = '✅ Pesan terkirim! Terima kasih! ❤️';
    showNotification('📤 Pesan Terkirim!', 'success');
}

// ============ Notification System ============
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        border: 2px solid var(--card-border);
        border-radius: 15px;
        color: var(--text-primary);
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.style.opacity = '1', 10);
    setTimeout(() => notification.style.opacity = '0', 2500);
    setTimeout(() => notification.remove(), 3000);
}

// ============ Audio Volume Control ============
function setVolume(volume) {
    audioElement.volume = volume;
}

// ============ Mouse Trail Effect ============
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
            border-radius: 50%;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(trail);

        trail.animate([
            { transform: 'scale(1)', opacity: 0.8 },
            { transform: 'scale(0)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => trail.remove();
    }
});

// ============ Initialize on Page Load ============
window.addEventListener('load', () => {
    initAudio();
    initLyricsToggle();
    initParticles();
    console.log('%c🎉 Selamat Ulang Tahun! 🎂', 'font-size: 24px; color: #ff6b9d; font-weight: bold;');
    console.log('%cPengembang dari web ini adalah: Haigry', 'font-size: 14px; color: #4ecdc4;');
});

// Add blow out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes blowOut {
        0% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
        50% {
            opacity: 0.5;
            transform: translateX(-50%) scale(1.5) translateY(-10px);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) scale(0) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// ============ ADVANCED FEATURES IMPLEMENTATION ============

// Achievement System
// const achievements = {
//     music: { id: 'music', icon: '\ud83c\udfb5', title: 'Music Lover', description: 'Started the celebration music!', unlocked: false },
//     nameSelector: { id: 'nameSelector', icon: '\ud83c\udfaf', title: 'Name Selector', description: 'Chose a special name!', unlocked: false },
//     candleBlower: { id: 'candleBlower', icon: '\ud83d\udd6f\ufe0f', title: 'Candle Blower', description: 'Blew out all candles!', unlocked: false },
//     wishMaker: { id: 'wishMaker', icon: '\u2728', title: 'Wish Maker', description: 'Made a special wish!', unlocked: false },
//     messageSender: { id: 'messageSender', icon: '\ud83d\udc8c', title: 'Message Sender', description: 'Sent a heartfelt message!', unlocked: false },
//     fireworksMaster: { id: 'fireworksMaster', icon: '\ud83c\udf86', title: 'Fireworks Master', description: 'Launched spectacular fireworks!', unlocked: false },
//     balloonPopper: { id: 'balloonPopper', icon: '\ud83c\udf88', title: 'Balloon Popper', description: 'Popped 5 balloons!', unlocked: false },
//     giftCollector: { id: 'giftCollector', icon: '\ud83c\udf81', title: 'Gift Collector', description: 'Collected 10 gift boxes!', unlocked: false }
// };

// let balloonsPoppedCount = 0;
// let giftsCollectedCount = 0;

// function unlockAchievement(achievementId) {
//     const achievement = achievements[achievementId];
//     if (!achievement || achievement.unlocked) return;

//     achievement.unlocked = true;

//     const container = document.getElementById('achievementContainer');
//     container.classList.add('show');

//     const badge = document.createElement('div');
//     badge.className = 'achievement-badge gold';
//     badge.innerHTML = `
//         <h4><span class="achievement-icon">${achievement.icon}</span> ${achievement.title}</h4>
//         <p>${achievement.description}</p>
//     `;

//     container.appendChild(badge);

//     setTimeout(() => {
//         container.classList.remove('show');
//     }, 4000);

//     setTimeout(() => {
//         badge.remove();
//     }, 4500);

//     createConfetti();
// }

// Loading Screen
function initLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('loaded');
    }, 2500);
}

// // Balloon System
// function createBalloons() {
//     const container = document.getElementById('balloonsContainer');
//     const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#a29bfe', '#fd79a8', '#fdcb6e'];

//     setInterval(() => {
//         if (Math.random() > 0.7) {
//             const balloon = document.createElement('div');
//             balloon.className = 'balloon';
//             balloon.style.left = `${Math.random() * 90 + 5}vw`;
//             balloon.style.bottom = '-100px';
//             balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
//             balloon.style.animationDelay = `${Math.random() * 2}s`;
//             balloon.style.animationDuration = `${8 + Math.random() * 4}s`;

//             balloon.addEventListener('click', () => {
//                 balloon.classList.add('popped');
//                 createSparklesAt(balloon);
//                 balloonsPoppedCount++;
//                 showNotification(`\ud83c\udf88 Balloon Popped! (${balloonsPoppedCount}/5)`, 'success');

//                 if (balloonsPoppedCount >= 5 && !achievements.balloonPopper.unlocked) {
//                     unlockAchievement('balloonPopper');
//                 }

//                 setTimeout(() => balloon.remove(), 300);
//             });

//             container.appendChild(balloon);

//             setTimeout(() => balloon.remove(), 12000);
//         }
//     }, 3000);
// }

// // Gift Box Rain
// function createGiftBoxRain() {
//     const container = document.getElementById('giftBoxesContainer');

//     setInterval(() => {
//         if (Math.random() > 0.8) {
//             const giftBox = document.createElement('div');
//             giftBox.className = 'gift-box';
//             giftBox.style.left = `${Math.random() * 90 + 5}vw`;
//             giftBox.style.top = '-100px';

//             giftBox.innerHTML = `
//                 <div class="gift-box-body">
//                     <div class="gift-box-ribbon-v"></div>
//                     <div class="gift-box-ribbon-h"></div>
//                     <div class="gift-box-bow"></div>
//                 </div>
//             `;

//             giftBox.addEventListener('click', () => {
//                 createGiftExplosion(giftBox);
//                 giftsCollectedCount++;
//                 showNotification(`\ud83c\udf81 Gift Collected! (${giftsCollectedCount}/10)`, 'success');

//                 if (giftsCollectedCount >= 10 && !achievements.giftCollector.unlocked) {
//                     unlockAchievement('giftCollector');
//                 }

//                 giftBox.remove();
//             });

//             container.appendChild(giftBox);

//             setTimeout(() => giftBox.remove(), 4500);
//         }
//     }, 2500);
// }

function createGiftExplosion(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#a29bfe', '#fd79a8', '#fdcb6e'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
        `;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Photo Lightbox
function initLightbox() {
    const images = document.querySelectorAll('.image-gallery img');
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    const close = document.querySelector('.lightbox-close');
    const prev = document.querySelector('.lightbox-prev');
    const next = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    const imageArray = Array.from(images);

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            modal.classList.add('active');
            modalImg.src = img.src;
            caption.textContent = img.alt || `Image ${index + 1}`;
            currentIndex = index;
        });
    });

    close.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
        modalImg.src = imageArray[currentIndex].src;
        caption.textContent = imageArray[currentIndex].alt || `Image ${currentIndex + 1}`;
    });

    next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageArray.length;
        modalImg.src = imageArray[currentIndex].src;
        caption.textContent = imageArray[currentIndex].alt || `Image ${currentIndex + 1}`;
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            modal.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            prev.click();
        } else if (e.key === 'ArrowRight') {
            next.click();
        }
    });
}

// Floating Emojis
function createFloatingEmojis() {
    const container = document.getElementById('floatingEmojisContainer');
    const emojis = ['\ud83c\udf89', '\ud83c\udf88', '\ud83c\udf81', '\u2728', '\u2764\ufe0f', '\ud83c\udf82', '\ud83c\udf8a', '\ud83c\udf86'];

    setInterval(() => {
        if (Math.random() > 0.85) {
            const emoji = document.createElement('div');
            emoji.className = 'floating-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = `${Math.random() * 90 + 5}vw`;
            emoji.style.top = `${Math.random() * 80 + 10}vh`;
            emoji.style.animationDelay = `${Math.random() * 2}s`;

            emoji.addEventListener('click', () => {
                emoji.classList.add('clicked');
                createSparklesAt(emoji);
                setTimeout(() => emoji.remove(), 500);
            });

            container.appendChild(emoji);

            setTimeout(() => emoji.remove(), 12000);
        }
    }, 2000);
}

function createSparklesAt(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 10;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #fff, #ffd700);
            border-radius: 50%;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            pointer-events: none;
            z-index: 10000;
        `;

        document.body.appendChild(sparkle);

        const angle = (Math.PI * 2 * i) / sparkleCount;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        sparkle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}

// 3D Cake Sparkles
function add3DCakeSparkles() {
    const cake = document.querySelector('.cake-3d');
    if (!cake) return;

    setInterval(() => {
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background: radial-gradient(circle, #fff, #ffd700);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;

            const sparklesContainer = cake.querySelector('.cake-sparkles');
            if (sparklesContainer) {
                sparklesContainer.appendChild(sparkle);

                sparkle.animate([
                    { transform: 'translate(0, 0) scale(0)', opacity: 0 },
                    { transform: 'translate(0, -30px) scale(1)', opacity: 1, offset: 0.5 },
                    { transform: 'translate(0, -60px) scale(0)', opacity: 0 }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                }).onfinish = () => sparkle.remove();
            }
        }
    }, 500);
}

// Audio Visualizer
let audioContext;
let analyser;
let dataArray;
let bufferLength;
let animationId;

function initAudioVisualizer() {
    const canvas = document.getElementById('audioVisualizerCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 100;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
    });

    // Audio visualizer - only create once and ensure audio still plays
    let visualizerInitialized = false;
    audioElement.addEventListener('play', () => {
        if (!visualizerInitialized && audioContext === undefined) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaElementSource(audioElement);
                source.connect(analyser);
                analyser.connect(audioContext.destination); // CRITICAL: must connect to destination for sound!
                analyser.fftSize = 256;
                bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);
                visualizerInitialized = true;
                console.log('Audio visualizer initialized successfully');
                visualize();
            } catch (e) {
                console.log('Audio visualizer not available:', e);
                // Visualizer failed, but audio should still play normally
            }
        }
    });

    function visualize() {
        if (!analyser) return;

        animationId = requestAnimationFrame(visualize);

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(10, 10, 15, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

            const hue = (i / bufferLength) * 360;
            ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;

            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }
}

// Enhanced mulaiMusik with achievement
const originalMulaiMusik = window.mulaiMusik;
window.mulaiMusik = function () {
    originalMulaiMusik();
    unlockAchievement('music');
};

// Enhanced pilihNama with achievement
const originalPilihNama = window.pilihNama;
window.pilihNama = function (nama) {
    originalPilihNama(nama);
    if (!achievements.nameSelector.unlocked) {
        unlockAchievement('nameSelector');
    }
};

// Enhanced toggleFlame for candle blower achievement
let candlesBlownCount = 0;
const originalToggleFlame = window.toggleFlame;
window.toggleFlame = function (candle) {
    const flame = candle.querySelector('.flame');
    if (flame && flame.style.display !== 'none') {
        candlesBlownCount++;
        if (candlesBlownCount >= 3 && !achievements.candleBlower.unlocked) {
            unlockAchievement('candleBlower');
        }
    }
    originalToggleFlame(candle);
};

// Enhanced makeWish with achievement
const originalMakeWish = window.makeWish;
window.makeWish = function () {
    originalMakeWish();
    setTimeout(() => {
        if (!achievements.wishMaker.unlocked) {
            unlockAchievement('wishMaker');
        }
    }, 1000);
};

// Enhanced kirimPesanSahabat with achievement
const originalKirimPesanSahabat = window.kirimPesanSahabat;
window.kirimPesanSahabat = function () {
    originalKirimPesanSahabat();
    if (!achievements.messageSender.unlocked) {
        unlockAchievement('messageSender');
    }
};

// Initialize all advanced features
window.addEventListener('load', () => {
    initLoadingScreen();
    initLightbox();
    // initAudioVisualizer(); // DISABLED: CORS error on file:// makes audio silent

    // Start effects after loading
    setTimeout(() => {
        // createBalloons();
        // createGiftBoxRain();
        // createFloatingEmojis();
        add3DCakeSparkles();
    }, 3000);

    console.log('%c\u2728 Advanced Features Loaded! \u2728', 'font-size: 18px; color: #ffd700; font-weight: bold;');
});

