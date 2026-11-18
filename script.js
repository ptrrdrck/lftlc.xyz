// Float the lace mark around the viewport as a spinning rigid body.
// Off-center wall hits and wall grip turn straight-line motion into spin and back.
(() => {
  const mark = document.getElementById("lace-mark");
  if (!mark) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Tuned in the Lace Bounce Lab mock.
  const SPEED = 50; // cruise speed, px per second
  const RECOVERY = 0.1; // per second: how fast speed drifts back to SPEED
  const RESTITUTION = 1; // bounciness
  const FRICTION = 0.2; // wall grip
  const MAX_SPIN = 1080; // deg per second
  const LAUNCH_SPIN = 45; // max random spin at start, deg per second

  // Geometry measured from logo/lace-mark.svg (viewBox 4 4 2276 2784).
  const VB = { x: 4, y: 4, w: 2276, h: 2784 };
  const COM = { x: 696.65, y: 1923.38 }; // center of mass of the filled shape
  const RG = 978.24; // radius of gyration about COM
  // Convex hull of the outline: the only points that can touch a straight wall.
  const HULL = [
    [4, 2487], [292, 21], [2276, 2528], [1216, 2766], [1175, 2773], [1134, 2779],
    [1093, 2783], [1052, 2786], [1010, 2788], [969, 2788], [928, 2787], [887, 2784],
    [846, 2779], [805, 2772], [764, 2764], [286, 2655], [246, 2646], [206, 2636],
    [166, 2625], [126, 2613], [87, 2598], [43, 2573], [16, 2541], [5, 2501],
  ];

  const DEG = Math.PI / 180;
  const STEP = 1 / 240; // fixed physics step, seconds

  // Body state: center-of-mass position, velocity, angle, angular velocity.
  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;
  let a = 0;
  let w = 0;

  let k = 0; // px per viewBox unit
  let local = []; // hull points relative to COM, in px
  let width = 0;
  let height = 0;
  let last = 0;
  let acc = 0;
  let frame = 0;

  function measure() {
    // Layout size, unaffected by the rotation transform.
    k = mark.offsetWidth / VB.w;
    local = HULL.map(([hx, hy]) => [(hx - COM.x) * k, (hy - COM.y) * k]);
    width = window.innerWidth;
    height = window.innerHeight;
  }

  function draw() {
    const ox = (COM.x - VB.x) * k;
    const oy = (COM.y - VB.y) * k;
    mark.style.transform = `translate3d(${x - ox}px, ${y - oy}px, 0) rotate(${a}rad)`;
  }

  function home() {
    // Centered near the bottom, upright.
    x = width / 2;
    y = height - (VB.y + VB.h - COM.y) * k - 18;
    a = 0;
  }

  function step(dt) {
    const invI = 1 / (RG * k) ** 2; // mass is 1

    const cap = MAX_SPIN * DEG;
    if (w > cap) w = cap;
    else if (w < -cap) w = -cap;

    // Ease speed back toward the cruise speed.
    const sp = Math.hypot(vx, vy);
    if (sp < 0.5) {
      const ang = Math.random() * Math.PI * 2;
      vx = Math.cos(ang);
      vy = Math.sin(ang);
    } else {
      const ns = sp + (SPEED - sp) * (1 - Math.exp(-RECOVERY * dt));
      vx *= ns / sp;
      vy *= ns / sp;
    }

    x += vx * dt;
    y += vy * dt;
    a += w * dt;

    const c = Math.cos(a);
    const s = Math.sin(a);
    // Walls as half-planes n·p >= d: left, right, top, bottom.
    const walls = [
      [1, 0, 0],
      [-1, 0, -width],
      [0, 1, 0],
      [0, -1, -height],
    ];

    for (const [nx, ny, d] of walls) {
      let pen = 0;
      let rx = 0;
      let ry = 0;
      for (const [lx, ly] of local) {
        const px = lx * c - ly * s;
        const py = lx * s + ly * c;
        const depth = d - (nx * (x + px) + ny * (y + py));
        if (depth > pen) {
          pen = depth;
          rx = px;
          ry = py;
        }
      }
      if (pen <= 0) continue;

      x += nx * pen;
      y += ny * pen;

      const vn = (vx - w * ry) * nx + (vy + w * rx) * ny;
      if (vn >= 0) continue;

      // Bounce: normal impulse at the contact point.
      const rn = rx * ny - ry * nx;
      const jn = (-(1 + RESTITUTION) * vn) / (1 + rn * rn * invI);
      vx += jn * nx;
      vy += jn * ny;
      w += rn * jn * invI;

      // Grip: friction impulse against sliding, capped by the bounce.
      const tx = -ny;
      const ty = nx;
      const vt = (vx - w * ry) * tx + (vy + w * rx) * ty;
      const rt = rx * ty - ry * tx;
      const lim = FRICTION * jn;
      const jt = Math.max(-lim, Math.min(lim, -vt / (1 + rt * rt * invI)));
      vx += jt * tx;
      vy += jt * ty;
      w += rt * jt * invI;
    }
  }

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05); // ignore long tab-away gaps
    last = now;
    acc += dt;
    while (acc >= STEP) {
      step(STEP);
      acc -= STEP;
    }
    draw();
    frame = requestAnimationFrame(tick);
  }

  function start() {
    measure();
    home();

    // A diagonal heading upward, so it never slides along a single axis.
    const angle = Math.PI / 6 + Math.random() * (Math.PI / 6);
    vx = Math.cos(angle) * SPEED * (Math.random() < 0.5 ? -1 : 1);
    vy = -Math.sin(angle) * SPEED;
    w = (Math.random() * 2 - 1) * LAUNCH_SPIN * DEG;
    draw();

    cancelAnimationFrame(frame);
    last = performance.now();
    acc = 0;
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    measure();
    home();
    draw();
  }

  function apply() {
    if (reduced.matches) stop();
    else start();
  }

  window.addEventListener("resize", () => {
    measure();
    if (!frame) {
      home();
      draw();
    }
  });
  window.addEventListener("load", () => {
    measure();
    if (!reduced.matches && !frame) start();
    else if (!frame) {
      home();
      draw();
    }
  });

  if (reduced.addEventListener) reduced.addEventListener("change", apply);
  else reduced.addListener(apply);

  apply();
})();
