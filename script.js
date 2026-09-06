// Float the lace mark around the viewport, bouncing off the window edges.
(() => {
  const mark = document.getElementById("lace-mark");
  if (!mark) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const SPEED = 70; // px per second

  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;
  let w = 0;
  let h = 0;
  let last = 0;
  let frame = 0;

  const maxX = () => Math.max(window.innerWidth - w, 0);
  const maxY = () => Math.max(window.innerHeight - h, 0);
  const clamp = (v, max) => Math.min(Math.max(v, 0), max);

  function measure() {
    const rect = mark.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    x = clamp(x, maxX());
    y = clamp(y, maxY());
    draw();
  }

  function draw() {
    mark.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function step(now) {
    const dt = Math.min((now - last) / 1000, 0.05); // ignore long tab-away gaps
    last = now;

    x += vx * dt;
    y += vy * dt;

    const mx = maxX();
    const my = maxY();

    if (x <= 0) {
      x = 0;
      vx = Math.abs(vx);
    } else if (x >= mx) {
      x = mx;
      vx = -Math.abs(vx);
    }

    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy);
    } else if (y >= my) {
      y = my;
      vy = -Math.abs(vy);
    }

    draw();
    frame = requestAnimationFrame(step);
  }

  function start() {
    // A diagonal heading, so it never slides along a single axis.
    const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6);
    vx = Math.cos(angle) * SPEED * (Math.random() < 0.5 ? -1 : 1);
    vy = Math.sin(angle) * SPEED * (Math.random() < 0.5 ? -1 : 1);

    measure();
    x = clamp((window.innerWidth - w) / 2, maxX());
    y = clamp(window.innerHeight - h - 18, maxY());
    draw();

    cancelAnimationFrame(frame);
    last = performance.now();
    frame = requestAnimationFrame(step);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    measure();
    x = clamp((window.innerWidth - w) / 2, maxX());
    y = clamp(window.innerHeight - h - 18, maxY());
    draw();
  }

  function apply() {
    if (reduced.matches) stop();
    else start();
  }

  window.addEventListener("resize", measure);
  window.addEventListener("load", () => {
    measure();
    if (!reduced.matches && !frame) start();
  });

  if (reduced.addEventListener) reduced.addEventListener("change", apply);
  else reduced.addListener(apply);

  apply();
})();
