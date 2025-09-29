const pesan = [
    "Hai, [Nama] sahabatku yang keren!",
    "Selamat Sweet Seventeen, bestie!",
    "Kamu adalah sahabat terbaik yang bisa kuminta",
    "Semoga persahabatan kita abadi selamanya",
    "Aku bersyukur memilikimu sebagai sahabat!"
];
let indeksPesanSekarang = 0;
let audioElement;

function initAudio() {
    audioElement = new Audio();
    audioElement.loop = true;
    audioElement.volume = 0.7;
    
    const audioSelect = document.getElementById('audioSelect');
    const playPauseButton = document.getElementById('playPauseButton');
    const volumeControl = document.getElementById('volumeControl');
    
    audioSelect.addEventListener('change', function() {
        const wasPlaying = !audioElement.paused;
        audioElement.src = this.value;
        if (wasPlaying) {
            audioElement.play()
                .then(() => playPauseButton.textContent = 'Pause')
                .catch(err => console.error('Playback failed:', err));
        }
    });
    
    playPauseButton.addEventListener('click', () => {
        if (audioElement.paused) {
            audioElement.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audioElement.pause();
            playPauseButton.textContent = 'Play';
        }
    });
    
    audioElement.addEventListener('play', () => {
        playPauseButton.textContent = 'Pause';
    });
    
    audioElement.addEventListener('pause', () => {
        playPauseButton.textContent = 'Play';
    });
    
    audioElement.addEventListener('error', () => {
        console.error('Audio error:', audioElement.error);
        alert('Maaf, ada masalah dengan pemutaran musik. Silakan coba lagi.');
    });
    
    volumeControl.addEventListener('input', function() {
        setVolume(this.value);
    });
    
    audioElement.src = audioSelect.value;
}

function mulaiMusik() {
    const musicStart = document.getElementById('musicStart');
    audioElement.play()
        .then(() => {
            musicStart.style.opacity = '0';
            musicStart.style.pointerEvents = 'none';
            setTimeout(() => {
                musicStart.style.display = 'none';
            }, 500);
        })
        .catch(err => {
            console.error('Playback failed:', err);
            alert('Mohon izinkan pemutaran musik untuk melanjutkan');
        });
}

function pilihNama(nama) {
    document.getElementById('friendNameDisplay').textContent = nama;
    const tombol = document.querySelectorAll('#nameButtons button');
    tombol.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === nama) {
            btn.classList.add('selected');
        }
    });
    
    // Update selected name display
    let displayEl = document.querySelector('.selected-name-display');
    if (!displayEl) {
        displayEl = document.createElement('div');
        displayEl.className = 'selected-name-display';
        document.getElementById('nameInput').insertBefore(
            displayEl,
            document.querySelector('#nameInput button:last-child')
        );
    }
    displayEl.textContent = `Nama terpilih: ${nama}`;
}

function toggleAudio() {
    const playPauseButton = document.getElementById('playPauseButton');
    if (audioElement.paused) {
        audioElement.play()
            .then(() => {
                playPauseButton.textContent = 'Pause';
            })
            .catch(err => console.error('Playback failed:', err));
    } else {
        audioElement.pause();
        playPauseButton.textContent = 'Play';
    }
}

function setVolume(volume) {
    audioElement.volume = volume;
}

function mulaiPerayaan() {
    const nama = document.getElementById('friendNameDisplay').textContent;
    if (!nama) {
        alert('Pilih namamu dulu ya!');
        return;
    }
    
    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none'; // Hide main content initially
    
    // Reset message index
    indeksPesanSekarang = 0;
    tampilkanPesanBerikutnya();
    
    if (audioElement.paused) {
        audioElement.play();
    }
    
    buatPartikel();
    buatKembangApi();
}

function tampilkanPesanBerikutnya() {
    const containerPesan = document.getElementById('popupContainer');
    if (indeksPesanSekarang < pesan.length) {
        containerPesan.style.display = 'flex';
        const popup = document.createElement('div');
        popup.className = 'popup';
        const pesanFormatted = pesan[indeksPesanSekarang].replace('[Nama]', 
            document.getElementById('friendNameDisplay').textContent);
        
        popup.innerHTML = `
            <div class="popup-content">
                <p style="font-size: 20px; margin: 20px 0;">${pesanFormatted}</p>
                <button onclick="event.stopPropagation(); lanjutPesan()">Lanjut ❤️</button>
            </div>
        `;
        
        containerPesan.innerHTML = '';
        containerPesan.appendChild(popup);
        
        // Prevent clicks on container from propagating
        containerPesan.onclick = (e) => {
            if (e.target === containerPesan) {
                e.stopPropagation();
            }
        };
        
        setTimeout(() => popup.classList.add('show'), 100);
        
        indeksPesanSekarang++;
    } else {
        containerPesan.style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        addVirtualCandles();
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

function buatPartikel() {
    const particles = [
        { type: '❤', class: 'heart' },
        { type: '⭐', class: 'star' },
        { type: '🦋', class: 'butterfly' },
        { type: 'petal', class: 'petal' }
    ];
    const container = document.getElementById('particlesContainer');
    
    function animate() {
        if (Math.random() < 0.08) {
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
            setTimeout(() => particle.remove(), 15000);
        }
        requestAnimationFrame(animate);
    }
    animate();
}

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
            firework.style.boxShadow = `0 0 20px hsl(${hue}, 100%, 50%), 0 0 40px hsl(${hue}, 100%, 50%)`;
            
            container.appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }
        requestAnimationFrame(createFirework);
    }
    createFirework();
}

function kirimPesanSahabat() {
    const pesan = document.getElementById('messageText').value;
    if (!pesan.trim()) {
        alert('Mohon tulis pesanmu terlebih dahulu!');
        return;
    }

    const nomorWA = "+6289515583710";
    const pesanURL = encodeURIComponent(pesan);
    window.open(`https://wa.me/${nomorWA}?text=${pesanURL}`, '_blank');
    
    document.getElementById('messageResult').style.display = 'block';
    document.getElementById('messageResult').innerHTML = 'Pesan terkirim! ❤️';
}

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
    if (flame) {
        flame.style.display = flame.style.display === 'none' ? 'block' : 'none';
    }
}

function makeWish() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.display = 'none';
    });
    
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
        hw = w / 2,
        hh = h / 2,
        opts = {
            strings: ['HAPPY', 'BIRTHDAY', selectedName + '!'],
            charSize: 30,
            charSpacing: 35,
            lineHeight: 40,
            
            letterContemplatingWaitTime: 1000, // Increased wait time
            fadeOutTime: 500,  // New option for fade out timing
            balloonSpawnTime: 20,
            balloonBaseInflateTime: 10,
            balloonAddedInflateTime: 10,
            balloonBaseSize: 20,
            balloonAddedSize: 20,
            balloonBaseVel: .4,
            balloonAddedVel: .4,
            balloonBaseRadian: -(Math.PI / 2 - .5),
            balloonAddedRadian: -1,
            
            cx: w / 2,
            cy: h / 2,
            
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
        
        this.fireworkDy = this.y - hh;
        
        this.color = `hsl(${x / w * 360}, 80%, 50%)`;
        this.lightAlphaColor = `hsla(${x / w * 360}, 80%, light%, alp)`;
        this.lightColor = `hsl(${x / w * 360}, 80%, light%)`;
        this.alphaColor = `hsla(${x / w * 360}, 80%, 50%, alp)`;
        this.reset();
    }

    Letter.prototype.reset = function() {
        this.phase = 'firework';
        this.tick = 0;
        this.spawned = false;
        this.spawningTime = opts.fireworkSpawnTime * Math.random() | 0;
        this.reachTime = opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random() | 0;
        this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
        this.prevPoints = [[0, hh, 0]];
    }

    Letter.prototype.step = function() {
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
                    y = hh + armonicProportion * this.fireworkDy;
                
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
        } else if( this.phase === 'contemplate' ) {
            ++this.tick;
            
            if( this.circleCreating ) {
                ++this.tick2;
                var proportion = this.tick2 / this.circleCompleteTime,
                    armonic = -Math.cos( proportion * Math.PI ) / 2 + .5;
                
                ctx.beginPath();
                ctx.fillStyle = this.lightAlphaColor.replace( 'light', 50 + 50 * proportion ).replace( 'alp', proportion );
                ctx.beginPath();
                ctx.arc( this.x, this.y, armonic * this.circleFinalSize, 0, Tau );
                ctx.fill();
                
                if( this.tick2 > this.circleCompleteTime ) {
                    this.tick2 = 0;
                    this.circleCreating = false;
                    this.circleFading = true;
                }
            } else if( this.circleFading ) {
                ctx.fillStyle = this.lightColor.replace( 'light', 70 );
                ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
                
                ++this.tick2;
                var proportion = this.tick2 / this.circleFadeTime,
                    armonic = -Math.cos( proportion * Math.PI ) / 2 + .5;
                
                ctx.beginPath();
                ctx.fillStyle = this.lightAlphaColor.replace( 'light', 100 ).replace( 'alp', 1 - armonic );
                ctx.arc( this.x, this.y, this.circleFinalSize, 0, Tau );
                ctx.fill();
                
                if( this.tick2 >= this.circleFadeTime )
                    this.circleFading = false;
                
            } else {
                ctx.fillStyle = this.lightColor.replace( 'light', 70 );
                ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
            }
            
            // Update shards
            for (var i = 0; i < this.shards.length; ++i) {
                this.shards[ i ].step();
                if( !this.shards[ i ].alive ) {
                    this.shards.splice( i, 1 );
                    --i;
                }
            }
            
            if( this.tick > opts.letterContemplatingWaitTime) {
                this.phase = 'done';
                // Keep text visible when done
                ctx.fillStyle = this.lightColor.replace( 'light', 70 );
                ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
            }
        }
    }

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

    Shard.prototype.step = function() {
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
    }

    function anim() {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, w, h);
        
        ctx.translate(hw, hh);
        
        let done = true;
        for (let l = 0; l < letters.length; ++l) {
            letters[l].step();
            if (letters[l].phase !== 'done')
                done = false;
        }
        
        ctx.translate(-hw, -hh);
        
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

    // Increase timeout before showing popup
    setTimeout(() => {
        document.body.removeChild(canvas);
        showWishPopup();
    }, 8000); // Increased from 5000 to 8000ms
}

function showWishPopup() {
    const popupContainerWish = document.getElementById('popupContainerWish');
    if (!popupContainerWish) {
        console.error('popupContainerWish not found');
        return;
    }
    
    popupContainerWish.style.display = 'flex';
    popupContainerWish.innerHTML = ''; // Clear previous content
    
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <h3>✨ Make a Wish! ✨</h3>
        <p>Tutup mata, ucapkan doamu...</p>
        <p>Semoga semua harapanmu terkabul! 🌟</p>
        <button onclick="closeWishPopup();">Amin ❤️</button>
    `;
    popupContainerWish.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 100);
}

function closeWishPopup() {
    const popup = document.querySelector('.popup');
    const popupContainerWish = document.getElementById('popupContainerWish');
    
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popupContainerWish.style.display = 'none';
            popupContainerWish.innerHTML = '';
        }, 400);
    }
}

// Initialize on page load
window.addEventListener('load', initAudio);
