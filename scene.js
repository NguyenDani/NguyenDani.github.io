// 3D hero: a globe of points swept by a scan ring. Flagged points
// show up red as the ring passes them, then turn green once "remediated".
import * as THREE from './vendor/three.module.min.js';

var POINTS = 1600;   // dots on the globe
var FLAWS = 36;      // dots flagged per sweep
var SWEEP = 9;       // seconds per sweep
var FIX_DELAY = 1.5; // seconds a flagged dot stays red
var HOLD = 1;        // seconds to rest once nothing is left open
var SPAN = 2.3;      // distance the ring travels, slightly more than the globe's height

// The ring finishes its sweep, the last red dots get time to turn green, then the globe resets
var CYCLE = SWEEP + FIX_DELAY + HOLD;

var root = document.documentElement;
var canvas = document.querySelector('.scene');
var still = matchMedia('(prefers-reduced-motion: reduce)').matches;

var renderer = null;
try {
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
} catch (e) {
  root.classList.add('no-webgl');
}

if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
  camera.position.z = 3.8;
  var halfHeight = Math.tan(THREE.MathUtils.degToRad(22.5)) * camera.position.z;

  var globe = new THREE.Group();
  scene.add(globe);

  // Round sprite for the dots: solid out to `core`, then fading through `halo` opacity to nothing
  function dotTexture(core, halo) {
    var sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    var ctx = sprite.getContext('2d');
    var fade = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    fade.addColorStop(0, 'rgba(255, 255, 255, 1)');
    fade.addColorStop(core, 'rgba(255, 255, 255, 1)');
    fade.addColorStop(core + 0.15, 'rgba(255, 255, 255, ' + halo + ')');
    fade.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(sprite);
  }

  // Evenly spread surface dots (Fibonacci sphere)
  var positions = new Float32Array(POINTS * 3);
  var colors = new Float32Array(POINTS * 3);
  for (var i = 0; i < POINTS; i++) {
    var y = 1 - 2 * (i + 0.5) / POINTS;
    var r = Math.sqrt(1 - y * y);
    var a = i * 2.399963;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(a) * r;
  }
  var surfaceGeometry = new THREE.BufferGeometry();
  surfaceGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  surfaceGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  globe.add(new THREE.Points(surfaceGeometry, new THREE.PointsMaterial({
    size: 0.024, map: dotTexture(0.6, 0), vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false
  })));

  // Flagged dots, kept sorted bottom to top so the first n are the ones already scanned
  var flawPositions = new Float32Array(FLAWS * 3);
  var flawColors = new Float32Array(FLAWS * 3);
  var flawGeometry = new THREE.BufferGeometry();
  flawGeometry.setAttribute('position', new THREE.BufferAttribute(flawPositions, 3));
  flawGeometry.setAttribute('color', new THREE.BufferAttribute(flawColors, 3));
  globe.add(new THREE.Points(flawGeometry, new THREE.PointsMaterial({
    size: 0.15, map: dotTexture(0.2, 0.4), vertexColors: true, transparent: true, depthWrite: false
  })));

  var frameMaterial = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.12 });
  globe.add(new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.97, 2)), frameMaterial));

  var ringPoints = [];
  for (var s = 0; s < 128; s++) {
    var angle = s / 128 * Math.PI * 2;
    ringPoints.push(new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)));
  }
  var ringMaterial = new THREE.LineBasicMaterial();
  var ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ringPoints), ringMaterial);
  globe.add(ring);

  var accent = new THREE.Color();
  var fail = new THREE.Color();
  var dim = new THREE.Color();
  function readPalette() {
    var style = getComputedStyle(root);
    accent.set(style.getPropertyValue('--accent').trim());
    fail.set(style.getPropertyValue('--fail').trim());
    dim.set(style.getPropertyValue('--bg').trim()).lerp(accent, 0.25);
    frameMaterial.color.copy(accent);
    ringMaterial.color.copy(accent);
  }

  function reseed() {
    var ys = [];
    for (var j = 0; j < FLAWS; j++) ys.push(Math.floor(Math.random() * POINTS));
    // Lower index means higher on the globe, so sort descending for bottom-to-top
    ys.sort(function (p, q) { return q - p; });
    for (var k = 0; k < FLAWS; k++) {
      for (var c = 0; c < 3; c++) flawPositions[k * 3 + c] = positions[ys[k] * 3 + c] * 1.01;
    }
    flawGeometry.attributes.position.needsUpdate = true;
  }

  var hud = {};
  document.querySelectorAll('[data-hud]').forEach(function (el) { hud[el.dataset.hud] = el; });
  function setHud(name, value) {
    if (hud[name] && hud[name].textContent !== value) hud[name].textContent = value;
  }

  var pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  addEventListener('pointermove', function (e) {
    pointer.targetX = e.clientX / innerWidth - 0.5;
    pointer.targetY = e.clientY / innerHeight - 0.5;
  });

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }

  var cycle = -1;
  function draw(time) {
    if (Math.floor(time / CYCLE) !== cycle) {
      cycle = Math.floor(time / CYCLE);
      reseed();
    }
    var elapsed = time % CYCLE;
    var progress = Math.min(1, elapsed / SWEEP);
    var scanY = -SPAN / 2 + SPAN * progress;

    for (var i = 0; i < POINTS; i++) {
      var y = positions[i * 3 + 1];
      var nearRing = Math.max(0, 1 - Math.abs(y - scanY) / 0.12);
      var mix = Math.min(1, (y < scanY ? 0.45 : 0.1) + nearRing * 0.7);
      colors[i * 3] = dim.r + (accent.r - dim.r) * mix;
      colors[i * 3 + 1] = dim.g + (accent.g - dim.g) * mix;
      colors[i * 3 + 2] = dim.b + (accent.b - dim.b) * mix;
    }
    surfaceGeometry.attributes.color.needsUpdate = true;

    var found = 0;
    var fixed = 0;
    for (var j = 0; j < FLAWS; j++) {
      var flawY = flawPositions[j * 3 + 1];
      if (flawY >= scanY) break;
      found++;
      var age = elapsed - (flawY + SPAN / 2) / SPAN * SWEEP;
      var color = age > FIX_DELAY ? accent : fail;
      if (age > FIX_DELAY) fixed++;
      flawColors[j * 3] = color.r;
      flawColors[j * 3 + 1] = color.g;
      flawColors[j * 3 + 2] = color.b;
    }
    flawGeometry.attributes.color.needsUpdate = true;
    flawGeometry.setDrawRange(0, found);

    var ringRadius = Math.sqrt(Math.max(0, 1 - scanY * scanY));
    ring.visible = ringRadius > 0.02;
    ring.position.y = scanY;
    ring.scale.set(ringRadius * 1.03, 1, ringRadius * 1.03);

    setHud('progress', Math.round(progress * 100) + '%');
    setHud('found', String(found - fixed));
    setHud('fixed', String(fixed));

    // Sits beside the hero text on wide screens, behind it on narrow ones,
    // then drifts to the centre and fades as the page scrolls
    var halfWidth = halfHeight * camera.aspect;
    var wide = camera.aspect > 1.1;
    var scrolled = Math.min(1, scrollY / innerHeight);
    var size = Math.min(1, halfWidth * (wide ? 0.42 : 0.85));
    globe.position.x = wide ? halfWidth * 0.48 * (1 - scrolled) : 0;
    globe.scale.setScalar(size * (1 + scrolled * 0.5));
    canvas.style.opacity = (wide ? 1 : 0.45) * (1 - scrolled * 0.7);

    pointer.x += (pointer.targetX - pointer.x) * 0.05;
    pointer.y += (pointer.targetY - pointer.y) * 0.05;
    globe.rotation.y = time * 0.12 + pointer.x * 0.5;
    globe.rotation.x = 0.25 + pointer.y * 0.3;

    renderer.render(scene, camera);
  }

  readPalette();
  resize();

  if (still) {
    // One frozen frame, mid-sweep
    var frozen = SWEEP * 0.6;
    draw(frozen);
    addEventListener('resize', function () { resize(); draw(frozen); });
    addEventListener('scroll', function () { draw(frozen); }, { passive: true });
    new MutationObserver(function () { readPalette(); draw(frozen); })
      .observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  } else {
    addEventListener('resize', resize);
    new MutationObserver(readPalette).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    renderer.setAnimationLoop(function (ms) { draw(ms / 1000); });
  }
}
