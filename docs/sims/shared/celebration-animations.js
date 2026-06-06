// Shared Celebration Animations Library for p5.js MicroSims
// ---------------------------------------------------------
// A reusable particle-animation library extracted from the
// celebration-animation-tester. Reward student achievements with a burst of
// confetti, stars, balloons, fireworks, and more.
//
// Requirements: load AFTER the p5.js library, in a sim that runs in p5 GLOBAL
// mode (uses global setup()/draw()). This file defines a single global,
// `window.Celebration`, and never declares its own setup()/draw(), so it never
// conflicts with the host sketch.
//
// Usage:
//   <script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.js"></script>
//   <script src="../shared/celebration-animations.js"></script>
//   <script src="my-sim.js"></script>
//
//   // optional, once you know your canvas size (defaults to p5 width/height):
//   Celebration.config(canvasWidth, canvasHeight);
//   Celebration.setSpeed('medium');           // 'fast' | 'medium' | 'slow'
//
//   Celebration.play('Rainbow Sparkle Burst'); // spawn particles + sound
//   Celebration.playRandom();                  // pick a random animation
//
//   function draw() {
//     ...
//     Celebration.run();                       // update + draw particles on top
//   }
//   if (Celebration.isActive()) { /* still animating */ }
//
//   Celebration.types  -> array of animation names

window.Celebration = (function () {
  let particles = [];
  let speedMultiplier = 1.0;
  let W = 400;   // celebration field width  (configurable)
  let H = 400;   // celebration field height (configurable)

  const rainbowColors = ['#FF6B6B', '#FF8E53', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6', '#FF6B9D'];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const types = [
    'Book Burst', 'Yellow Stars', 'Rainbow Sparkle Burst', 'Happy Star Sprinkle',
    'Alphabet Fireworks', 'Super Reader Confetti', 'Magic Book Bloom', 'Giggle Glitter Pop',
    'Storytime Spark Shower', 'Bright Buddy Balloons', 'Reading Rocket Zoom'
  ];

  function _dims() {
    // Fall back to the live p5 canvas size if config() was never called.
    if (typeof width !== 'undefined' && width) W = width;
    if (typeof height !== 'undefined' && height) H = height;
  }

  // ==================== ANIMATION CREATORS ====================

  function createYellowStars() {
    for (let i = 0; i < 25; i++) {
      particles.push({ type: 'star', x: random(50, W - 50), y: random(H - 100, H - 50),
        vx: random(-1, 1) * speedMultiplier, vy: random(-2.5, -1.5) * speedMultiplier,
        size: random(20, 40), rotation: random(TWO_PI), rotationSpeed: random(-0.1, 0.1) * speedMultiplier,
        alpha: 255, fadeRate: 2.1 * speedMultiplier, color: color(255, 215, 0) });
    }
  }
  function createRainbowSparkleBurst() {
    let cx = W / 2, cy = H / 2;
    for (let i = 0; i < 60; i++) {
      let a = random(TWO_PI), s = random(3, 6) * speedMultiplier;
      particles.push({ type: 'sparkle', x: cx, y: cy, vx: cos(a) * s, vy: sin(a) * s,
        size: random(8, 20), alpha: 255, fadeRate: 2.5 * speedMultiplier,
        color: color(rainbowColors[floor(random(rainbowColors.length))]), twinkle: random(0.1, 0.3) * speedMultiplier });
    }
  }
  function createHappyStarSprinkle() {
    for (let i = 0; i < 30; i++) {
      particles.push({ type: 'happyStar', x: random(30, W - 30), y: random(-50, 50),
        vx: random(-0.5, 0.5) * speedMultiplier, vy: random(2.5, 4) * speedMultiplier,
        size: random(25, 45), rotation: random(TWO_PI), rotationSpeed: random(-0.05, 0.05) * speedMultiplier,
        alpha: 255, color: color(rainbowColors[floor(random(rainbowColors.length))]),
        wobble: random(0.02, 0.05) * speedMultiplier, wobbleOffset: random(TWO_PI) });
    }
  }
  function createAlphabetFireworks() {
    for (let i = 0; i < 15; i++) {
      particles.push({ type: 'fireworkLetter', x: random(50, W - 50), y: H - 20, vx: 0,
        vy: random(-6, -4) * speedMultiplier, size: random(24, 36), alpha: 255,
        color: color(rainbowColors[floor(random(rainbowColors.length))]),
        letter: alphabet[floor(random(alphabet.length))], exploded: false,
        explosionTime: random(25, 40) / speedMultiplier });
    }
  }
  function createSuperReaderConfetti() {
    for (let i = 0; i < 80; i++) {
      particles.push({ type: 'confetti', x: random(W), y: random(-100, -10),
        vx: random(-1, 1) * speedMultiplier, vy: random(3, 5) * speedMultiplier,
        width: random(8, 15), height: random(15, 25), rotation: random(TWO_PI),
        rotationSpeed: random(-0.2, 0.2) * speedMultiplier, alpha: 255,
        color: color(rainbowColors[floor(random(rainbowColors.length))]), wobble: random(0.03, 0.08) * speedMultiplier });
    }
  }
  function createMagicBookBloom() {
    let cx = W / 2, cy = H / 2;
    for (let i = 0; i < 50; i++) {
      let a = (TWO_PI / 50) * i + random(-0.2, 0.2), s = random(1.5, 3.5) * speedMultiplier;
      particles.push({ type: 'bloom', x: cx, y: cy, vx: cos(a) * s, vy: sin(a) * s,
        size: random(10, 25), alpha: 255, fadeRate: 2.1 * speedMultiplier,
        color: color(random(200, 255), random(150, 255), random(200, 255)),
        glow: random(5, 15), pulse: random(0.05, 0.1) * speedMultiplier });
    }
  }
  function createGiggleGlitterPop() {
    for (let i = 0; i < 20; i++) {
      particles.push({ type: 'glitterPop', x: random(50, W - 50), y: random(100, H - 100),
        vx: 0, vy: 0, size: random(15, 30), alpha: 255,
        color: color(rainbowColors[floor(random(rainbowColors.length))]),
        bouncePhase: random(TWO_PI), bounceSpeed: random(0.1, 0.2) * speedMultiplier,
        popTimer: random(40, 70) / speedMultiplier });
    }
  }
  function createStorytimeSparkShower() {
    for (let i = 0; i < 100; i++) {
      particles.push({ type: 'sparkShower', x: random(W), y: random(-200, -10),
        vx: random(-0.3, 0.3) * speedMultiplier, vy: random(3, 5) * speedMultiplier,
        size: random(6, 16), alpha: 255, color: color(rainbowColors[floor(random(rainbowColors.length))]),
        trail: [], trailLength: floor(random(5, 15)) });
    }
  }
  function createBrightBuddyBalloons() {
    for (let i = 0; i < 15; i++) {
      particles.push({ type: 'balloon', x: random(50, W - 50), y: H + random(20, 100),
        vx: random(-0.5, 0.5) * speedMultiplier, vy: random(-2.5, -1.5) * speedMultiplier,
        size: random(30, 50), alpha: 255, color: color(rainbowColors[floor(random(rainbowColors.length))]),
        wobble: random(0.02, 0.04) * speedMultiplier, wobbleOffset: random(TWO_PI), stringLength: random(20, 40) });
    }
  }
  function createReadingRocketZoom() {
    for (let i = 0; i < 8; i++) {
      let startSide = random() > 0.5, baseSpeed = random(5, 8) * speedMultiplier;
      particles.push({ type: 'rocket', x: startSide ? -30 : W + 30, y: random(80, H - 80),
        vx: startSide ? baseSpeed : -baseSpeed, vy: random(-0.5, 0.5) * speedMultiplier,
        size: 25, alpha: 255, color: color(rainbowColors[floor(random(rainbowColors.length))]), trail: [] });
    }
  }
  function createBookBurst() {
    let cx = W / 2;
    for (let i = 0; i < 20; i++) {
      let a = random(-PI * 0.8, -PI * 0.2), s = random(8, 14) * speedMultiplier;
      particles.push({ type: 'book', x: cx, y: H - 10, vx: cos(a) * s, vy: sin(a) * s,
        width: random(25, 40), height: random(30, 45), rotation: random(-0.3, 0.3),
        rotationSpeed: random(-0.08, 0.08) * speedMultiplier, alpha: 255,
        fadeRate: 1.2 * speedMultiplier, color: color(rainbowColors[floor(random(rainbowColors.length))]),
        gravity: 0.15 * speedMultiplier });
    }
  }

  function _create(type) {
    switch (type) {
      case 'Yellow Stars': return createYellowStars();
      case 'Rainbow Sparkle Burst': return createRainbowSparkleBurst();
      case 'Happy Star Sprinkle': return createHappyStarSprinkle();
      case 'Alphabet Fireworks': return createAlphabetFireworks();
      case 'Super Reader Confetti': return createSuperReaderConfetti();
      case 'Magic Book Bloom': return createMagicBookBloom();
      case 'Giggle Glitter Pop': return createGiggleGlitterPop();
      case 'Storytime Spark Shower': return createStorytimeSparkShower();
      case 'Bright Buddy Balloons': return createBrightBuddyBalloons();
      case 'Reading Rocket Zoom': return createReadingRocketZoom();
      case 'Book Burst': default: return createBookBurst();
    }
  }

  // ==================== UPDATE + DRAW ====================

  function updateAndDrawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      switch (p.type) {
        case 'star': updateStar(p); drawStar(p); break;
        case 'sparkle': updateSparkle(p); drawSparkle(p); break;
        case 'happyStar': updateHappyStar(p); drawHappyStar(p); break;
        case 'fireworkLetter': updateFireworkLetter(p, i); drawFireworkLetter(p); break;
        case 'confetti': updateConfetti(p); drawConfetti(p); break;
        case 'bloom': updateBloom(p); drawBloom(p); break;
        case 'glitterPop': updateGlitterPop(p, i); drawGlitterPop(p); break;
        case 'sparkShower': updateSparkShower(p); drawSparkShower(p); break;
        case 'balloon': updateBalloon(p); drawBalloon(p); break;
        case 'rocket': updateRocket(p); drawRocket(p); break;
        case 'explosionPiece': updateExplosionPiece(p); drawExplosionPiece(p); break;
        case 'book': updateBook(p); drawBook(p); break;
      }
      if (p.alpha <= 0) particles.splice(i, 1);
    }
  }

  function updateStar(p) { p.x += p.vx; p.y += p.vy; p.rotation += p.rotationSpeed; p.alpha -= p.fadeRate || 2.1; p.vy -= 0.02 * speedMultiplier; }
  function updateSparkle(p) { p.x += p.vx; p.y += p.vy; p.vx *= 0.98; p.vy *= 0.98; p.alpha -= p.fadeRate || 2.5; p.size *= 0.98; }
  function updateHappyStar(p) { p.x += p.vx + sin(frameCount * p.wobble + p.wobbleOffset) * 0.5; p.y += p.vy; p.rotation += p.rotationSpeed; if (p.y > H + 50) p.alpha = 0; }
  function updateFireworkLetter(p) {
    if (!p.exploded) {
      p.y += p.vy; p.explosionTime--;
      if (p.explosionTime <= 0 || p.y < 100) {
        p.exploded = true;
        for (let j = 0; j < 12; j++) {
          let a = (TWO_PI / 12) * j, es = random(2, 4) * speedMultiplier;
          particles.push({ type: 'explosionPiece', x: p.x, y: p.y, vx: cos(a) * es, vy: sin(a) * es, size: random(5, 10), alpha: 255, fadeRate: 4.5 * speedMultiplier, color: p.color });
        }
      }
    } else { p.alpha -= 15 * speedMultiplier; }
  }
  function updateConfetti(p) { p.x += p.vx + sin(frameCount * p.wobble) * 0.5; p.y += p.vy; p.rotation += p.rotationSpeed; if (p.y > H + 30) p.alpha = 0; }
  function updateBloom(p) { p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy *= 0.97; p.alpha -= p.fadeRate || 2.1; p.size += sin(frameCount * p.pulse) * 0.3; }
  function updateGlitterPop(p) {
    p.y += sin(frameCount * p.bounceSpeed + p.bouncePhase) * 2; p.popTimer--;
    if (p.popTimer <= 0) {
      for (let j = 0; j < 8; j++) {
        let a = (TWO_PI / 8) * j, ps = random(1, 3) * speedMultiplier;
        particles.push({ type: 'sparkle', x: p.x, y: p.y, vx: cos(a) * ps, vy: sin(a) * ps, size: random(5, 10), alpha: 255, fadeRate: 3 * speedMultiplier, color: p.color, twinkle: 0.2 * speedMultiplier });
      }
      p.alpha = 0;
    }
  }
  function updateSparkShower(p) { p.trail.push({ x: p.x, y: p.y }); if (p.trail.length > p.trailLength) p.trail.shift(); p.x += p.vx; p.y += p.vy; if (p.y > H + 20) p.alpha = 0; }
  function updateBalloon(p) { p.x += p.vx + sin(frameCount * p.wobble + p.wobbleOffset) * 0.3; p.y += p.vy; if (p.y < -60) p.alpha = 0; }
  function updateRocket(p) {
    p.trail.push({ x: p.x, y: p.y, alpha: 255 }); if (p.trail.length > 20) p.trail.shift();
    p.x += p.vx; p.y += p.vy; for (let t of p.trail) t.alpha -= 12 * speedMultiplier;
    if (p.x < -50 || p.x > W + 50) p.alpha = 0;
  }
  function updateExplosionPiece(p) { p.x += p.vx; p.y += p.vy; p.vy += 0.1 * speedMultiplier; p.alpha -= p.fadeRate || 4.5; }
  function updateBook(p) { p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.rotation += p.rotationSpeed; p.alpha -= p.fadeRate; if (p.y > H + 50) p.alpha = 0; }

  function drawStar(p) { push(); translate(p.x, p.y); rotate(p.rotation); fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); drawStarShape(0, 0, p.size / 2, p.size, 5); pop(); }
  function drawSparkle(p) { push(); translate(p.x, p.y); let ts = p.size * (0.8 + sin(frameCount * p.twinkle) * 0.2); fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); drawStarShape(0, 0, ts / 3, ts, 4); pop(); }
  function drawHappyStar(p) {
    push(); translate(p.x, p.y); rotate(p.rotation);
    fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); drawStarShape(0, 0, p.size / 2, p.size, 5);
    fill(0, 0, 0, p.alpha); ellipse(-p.size * 0.15, -p.size * 0.05, p.size * 0.12); ellipse(p.size * 0.15, -p.size * 0.05, p.size * 0.12);
    noFill(); stroke(0, 0, 0, p.alpha); strokeWeight(2); arc(0, p.size * 0.05, p.size * 0.3, p.size * 0.2, 0, PI); pop();
  }
  function drawFireworkLetter(p) { if (!p.exploded) { push(); translate(p.x, p.y); fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); textSize(p.size); textAlign(CENTER, CENTER); text(p.letter, 0, 0); pop(); } }
  function drawConfetti(p) { push(); translate(p.x, p.y); rotate(p.rotation); fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); rect(-p.width / 2, -p.height / 2, p.width, p.height, 2); pop(); }
  function drawBloom(p) {
    push(); translate(p.x, p.y);
    for (let g = p.glow; g > 0; g -= 3) { fill(red(p.color), green(p.color), blue(p.color), p.alpha * 0.1); noStroke(); ellipse(0, 0, p.size + g * 2); }
    fill(red(p.color), green(p.color), blue(p.color), p.alpha); ellipse(0, 0, p.size); pop();
  }
  function drawGlitterPop(p) { push(); translate(p.x, p.y); fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); ellipse(0, 0, p.size); fill(255, 255, 255, p.alpha * 0.6); ellipse(-p.size * 0.2, -p.size * 0.2, p.size * 0.3); pop(); }
  function drawSparkShower(p) {
    for (let i = 0; i < p.trail.length; i++) {
      let t = p.trail[i], ta = (i / p.trail.length) * p.alpha * 0.5, tsz = p.size * (i / p.trail.length);
      stroke(80, 80, 120, ta * 0.8); strokeWeight(1); fill(red(p.color), green(p.color), blue(p.color), ta); ellipse(t.x, t.y, tsz);
    }
    stroke(80, 80, 120, p.alpha * 0.9); strokeWeight(1.5); fill(red(p.color), green(p.color), blue(p.color), p.alpha); ellipse(p.x, p.y, p.size);
    noStroke(); fill(255, 255, 255, p.alpha * 0.7); ellipse(p.x, p.y, p.size * 0.4);
  }
  function drawBalloon(p) {
    push(); translate(p.x, p.y);
    stroke(150, p.alpha); strokeWeight(1); line(0, p.size / 2, 0, p.size / 2 + p.stringLength);
    fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); ellipse(0, 0, p.size, p.size * 1.2);
    triangle(-3, p.size / 2 - 2, 3, p.size / 2 - 2, 0, p.size / 2 + 5);
    fill(255, 255, 255, p.alpha * 0.4); ellipse(-p.size * 0.2, -p.size * 0.25, p.size * 0.25, p.size * 0.35); pop();
  }
  function drawRocket(p) {
    for (let i = 0; i < p.trail.length; i++) { let t = p.trail[i]; if (t.alpha > 0) { fill(255, 200, 100, t.alpha); noStroke(); ellipse(t.x, t.y, 8 * (i / p.trail.length)); } }
    push(); translate(p.x, p.y); if (p.vx < 0) rotate(PI);
    fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); ellipse(0, 0, p.size, p.size * 0.6);
    fill(255, 100, 100, p.alpha); triangle(p.size / 2, 0, p.size / 2 - 8, -6, p.size / 2 - 8, 6);
    fill(red(p.color) * 0.7, green(p.color) * 0.7, blue(p.color) * 0.7, p.alpha);
    triangle(-p.size / 2, 0, -p.size / 2 - 5, -8, -p.size / 2 + 5, 0); triangle(-p.size / 2, 0, -p.size / 2 - 5, 8, -p.size / 2 + 5, 0);
    fill(200, 230, 255, p.alpha); ellipse(p.size / 4, 0, 8); pop();
  }
  function drawExplosionPiece(p) { fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); ellipse(p.x, p.y, p.size); }
  function drawBook(p) {
    push(); translate(p.x, p.y); rotate(p.rotation);
    let w = p.width, h = p.height, spineWidth = w * 0.15, pageInset = 3;
    fill(red(p.color) * 0.7, green(p.color) * 0.7, blue(p.color) * 0.7, p.alpha); stroke(50, 50, 50, p.alpha * 0.8); strokeWeight(1); rect(-w / 2, -h / 2, spineWidth, h, 2, 0, 0, 2);
    fill(250, 248, 245, p.alpha); stroke(180, 180, 180, p.alpha * 0.8); strokeWeight(1); rect(-w / 2 + spineWidth, -h / 2 + pageInset, w - spineWidth, h - pageInset * 2);
    fill(red(p.color), green(p.color), blue(p.color), p.alpha); stroke(50, 50, 50, p.alpha * 0.8); strokeWeight(1.5); rect(-w / 2 + spineWidth - 2, -h / 2, w - spineWidth + 2, h, 0, 3, 3, 0);
    stroke(255, 255, 255, p.alpha * 0.4); strokeWeight(2);
    line(-w / 2 + spineWidth + 8, -h / 2 + 8, w / 2 - 8, -h / 2 + 8); line(-w / 2 + spineWidth + 8, -h / 2 + 14, w / 2 - 8, -h / 2 + 14); pop();
  }

  function drawStarShape(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints, halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
      vertex(x + cos(a) * radius2, y + sin(a) * radius2);
      vertex(x + cos(a + halfAngle) * radius1, y + sin(a + halfAngle) * radius1);
    }
    endShape(CLOSE);
  }

  function playSound(type) {
    try {
      let ctx = new (window.AudioContext || window.webkitAudioContext)();
      let notes;
      switch (type) {
        case 'Yellow Stars': notes = [523, 659, 784, 1047]; break;
        case 'Rainbow Sparkle Burst': notes = [440, 554, 659, 880]; break;
        case 'Alphabet Fireworks': notes = [392, 494, 587, 784]; break;
        case 'Reading Rocket Zoom': notes = [262, 330, 392, 523, 659]; break;
        default: notes = [523, 659, 784, 1047];
      }
      notes.forEach((freq, i) => {
        let osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = freq; osc.type = 'sine';
        let t0 = ctx.currentTime + i * 0.12;
        gain.gain.setValueAtTime(0.15, t0);
        gain.gain.exponentialRampToValueAtTime(0.01, t0 + 0.25);
        osc.start(t0); osc.stop(t0 + 0.25);
      });
    } catch (e) { /* audio not available */ }
  }

  // ==================== PUBLIC API ====================
  return {
    types: types.slice(),
    config(w, h) { if (w) W = w; if (h) H = h; },
    setSpeed(speed) { speedMultiplier = (speed === 'fast') ? 1.8 : (speed === 'slow') ? 0.5 : 1.0; },
    clear() { particles = []; },
    create(type) { _dims(); particles = []; _create(type); },
    add(type) { _dims(); _create(type); },        // spawn without clearing existing
    play(type) { this.create(type); playSound(type); },
    playRandom() { this.play(types[floor(random(types.length))]); },
    run() { _dims(); updateAndDrawParticles(); },
    isActive() { return particles.length > 0; },
    count() { return particles.length; },
    playSound: playSound
  };
})();
