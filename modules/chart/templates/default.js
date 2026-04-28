Editor.addModuleTemplate("chart", {
  name: "default",
  render: (target, options) => {
    const data = (options.data || []).filter(
      (d) => d.label || parseFloat(d.value) > 0
    );
    const chartType = options.chartType || "bar";
    target.innerHTML =
      chartType === "pie" ? renderPieChart(data) :
      chartType === "line" ? renderLineChart(data) :
      renderBarChart(data);
  },
  css: `
    $root {
      position: absolute;
      inset: 0;
      box-sizing: border-box;
    }
    $root svg {
      width: 100%;
      height: 100%;
    }
  `,
});

function renderBarChart(data) {
  if (!data.length) return emptyChart();

  const values = data.map((d) => parseFloat(d.value) || 0);
  const max = Math.max(...values);
  if (!max) return emptyChart();

  const W = 300,
    H = 200;
  const padL = 8,
    padR = 8,
    padT = 22,
    padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const barW = chartW / data.length;
  const gap = Math.max(3, barW * 0.2);

  let rects = "";

  data.forEach((d, i) => {
    const val = parseFloat(d.value) || 0;
    const x = padL + i * barW + gap / 2;
    const bw = barW - gap;
    const bh = (val / max) * chartH;
    const y = padT + chartH - bh;
    const color = d.color || "#4e79a7";

    rects += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" rx="2"/>`;

    // Value label: inside bar if tall enough, above if short
    if (val > 0) {
      if (bh >= 16) {
        rects += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y + bh / 2 + 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.92)" font-family="sans-serif">${val}</text>`;
      } else {
        rects += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 3).toFixed(1)}" text-anchor="middle" font-size="9" fill="#555" font-family="sans-serif">${val}</text>`;
      }
    }

    const label = String(d.label || "").substring(0, 7);
    rects += `<text x="${(x + bw / 2).toFixed(1)}" y="${(padT + chartH + 14).toFixed(1)}" text-anchor="middle" font-size="9" fill="#666" font-family="sans-serif">${label}</text>`;
  });

  const baseline = `<line x1="${padL}" y1="${(padT + chartH).toFixed(1)}" x2="${(padL + chartW).toFixed(1)}" y2="${(padT + chartH).toFixed(1)}" stroke="#ddd" stroke-width="1"/>`;

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${baseline}${rects}</svg>`;
}

function renderPieChart(data) {
  const items = data.filter((d) => parseFloat(d.value) > 0);
  if (!items.length) return emptyChart();

  const total = items.reduce((s, d) => s + (parseFloat(d.value) || 0), 0);
  if (!total) return emptyChart();

  const W = 300,
    H = 200;
  const legendW = 108;
  const cx = (W - legendW) / 2;
  const cy = H / 2;
  const r = Math.min(cx, cy) - 6;

  let paths = "";
  let angle = -90;

  items.forEach((d) => {
    const val = parseFloat(d.value) || 0;
    const sweep = (val / total) * 360;
    // Avoid full-circle path issue
    const safeAngle = Math.min(sweep, 359.99);
    const endAngle = angle + safeAngle;
    const color = d.color || "#4e79a7";

    const [sx, sy] = polarXY(cx, cy, r, angle);
    const [ex, ey] = polarXY(cx, cy, r, endAngle);
    const large = sweep > 180 ? 1 : 0;

    paths += `<path d="M ${cx.toFixed(1)} ${cy.toFixed(1)} L ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z" fill="${color}"/>`;
    angle += sweep;
  });

  const itemH = Math.min(24, (H - 12) / items.length);
  const startY = (H - items.length * itemH) / 2;
  const lx = W - legendW + 6;

  let legend = "";
  items.forEach((d, i) => {
    const ly = startY + i * itemH;
    const color = d.color || "#4e79a7";
    const label = String(d.label || "").substring(0, 11);
    const val = parseFloat(d.value) || 0;
    const pct = ((val / total) * 100).toFixed(0);

    legend += `<rect x="${lx}" y="${(ly + 2).toFixed(1)}" width="9" height="9" fill="${color}" rx="1"/>`;
    legend += `<text x="${lx + 13}" y="${(ly + 10).toFixed(1)}" font-size="9" fill="#444" font-family="sans-serif">${label}</text>`;
    legend += `<text x="${lx + 13}" y="${(ly + 19).toFixed(1)}" font-size="8" fill="#888" font-family="sans-serif">${val} · ${pct}%</text>`;
  });

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${paths}${legend}</svg>`;
}

function renderLineChart(data) {
  if (data.length < 2) return emptyChart();

  const values = data.map((d) => parseFloat(d.value) || 0);
  const max = Math.max(...values);
  const min = Math.min(...values);
  if (max === min && max === 0) return emptyChart();

  const W = 300, H = 200;
  const padL = 10, padR = 10, padT = 22, padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const range = max - min || 1;
  const stepX = chartW / (data.length - 1);

  const pts = data.map((d, i) => {
    const val = parseFloat(d.value) || 0;
    const x = padL + i * stepX;
    const y = padT + chartH - ((val - min) / range) * chartH;
    return { x, y, val, d };
  });

  // Grid lines
  const gridCount = 4;
  let grid = "";
  for (let i = 0; i <= gridCount; i++) {
    const y = padT + (chartH / gridCount) * i;
    const v = (max - (range / gridCount) * i).toFixed(0);
    grid += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${padL + chartW}" y2="${y.toFixed(1)}" stroke="#eee" stroke-width="1"/>`;
    grid += `<text x="${padL - 2}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="8" fill="#aaa" font-family="sans-serif">${v}</text>`;
  }

  // Filled area under line using the first item's color
  const areaColor = pts[0]?.d.color || "#4e79a7";
  const areaPoints = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPath = `M ${padL.toFixed(1)},${(padT + chartH).toFixed(1)} L ${areaPoints} L ${(padL + chartW).toFixed(1)},${(padT + chartH).toFixed(1)} Z`;
  const area = `<path d="${areaPath}" fill="${areaColor}" opacity="0.12"/>`;

  // Lines and dots per segment (each segment uses start-point color)
  let lines = "";
  let dots = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const { x: x1, y: y1, d: d1 } = pts[i];
    const { x: x2, y: y2 } = pts[i + 1];
    const color = d1.color || "#4e79a7";
    lines += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`;
  }

  pts.forEach(({ x, y, val, d }) => {
    const color = d.color || "#4e79a7";
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${color}" stroke="white" stroke-width="1.5"/>`;
    dots += `<text x="${x.toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-size="8" fill="#555" font-family="sans-serif">${val}</text>`;
  });

  // X labels
  let labels = "";
  pts.forEach(({ x, d }) => {
    const label = String(d.label || "").substring(0, 7);
    labels += `<text x="${x.toFixed(1)}" y="${(padT + chartH + 14).toFixed(1)}" text-anchor="middle" font-size="9" fill="#666" font-family="sans-serif">${label}</text>`;
  });

  const baseline = `<line x1="${padL}" y1="${(padT + chartH).toFixed(1)}" x2="${(padL + chartW).toFixed(1)}" y2="${(padT + chartH).toFixed(1)}" stroke="#ddd" stroke-width="1"/>`;

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${grid}${baseline}${area}${lines}${dots}${labels}</svg>`;
}

function polarXY(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [(cx + r * Math.cos(rad)).toFixed(2), (cy + r * Math.sin(rad)).toFixed(2)];
}

function emptyChart() {
  return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <text x="150" y="104" text-anchor="middle" font-size="12" fill="#bbb" font-family="sans-serif">No data</text>
  </svg>`;
}
