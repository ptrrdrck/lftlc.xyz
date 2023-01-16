(d = document).body.appendChild((p = d.createElement("pre"))),
  (j = 0),
  (M = Math),
  setInterval(() => {
    for (T = "X%x~.:·", s = "", i = 492; i--; )
      s +=
        i % 41
          ? T[
              M.abs(
                (-j +
                  5 * M.hypot(((i % 41) - 20) / 10, (((i / 41) | 0) - 5) / 5)) |
                  0
              ) % 6
            ]
          : "\n";
    p.textContent = s;
    j++;
  }, 150);