const shapeCSS = `
  $root{
    display:block;
    width:100%;
    height:100%;
  }
  $root svg{
    width:100%;
    height:100%;
    display:block;
  }
`;

const renderShape = (target, options, shapeMarkup) => {
  const fill = options.fill || "#5B6CFF";
  const stroke = options.stroke || "#1F2937";
  const strokeWidth = Number(options.strokeWidth ?? 2);
  const opacity = Number(options.opacity ?? 1);

  target.innerHTML = `
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" role="img" aria-label="shape">
      <g fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}">
        ${shapeMarkup}
      </g>
    </svg>
  `;
};

Editor.addModuleTemplate("shape", {
  name: "default",
  render: (target, options) =>
    renderShape(target, options, `<rect x="10" y="10" width="80" height="80" rx="12" ry="12" />`),
  css: shapeCSS,
});

Editor.addModuleTemplate("shape", {
  name: "circle",
  render: (target, options) => renderShape(target, options, `<circle cx="50" cy="50" r="40" />`),
  css: shapeCSS,
});

Editor.addModuleTemplate("shape", {
  name: "triangle",
  render: (target, options) =>
    renderShape(target, options, `<polygon points="50,8 92,88 8,88" />`),
  css: shapeCSS,
});

Editor.addModuleTemplate("shape", {
  name: "diamond",
  render: (target, options) =>
    renderShape(target, options, `<polygon points="50,6 94,50 50,94 6,50" />`),
  css: shapeCSS,
});

Editor.addModuleTemplate("shape", {
  name: "hexagon",
  render: (target, options) =>
    renderShape(target, options, `<polygon points="25,8 75,8 94,50 75,92 25,92 6,50" />`),
  css: shapeCSS,
});

Editor.addModuleTemplate("shape", {
  name: "star",
  render: (target, options) =>
    renderShape(
      target,
      options,
      `<polygon points="50,6 61,38 95,38 67,58 78,90 50,70 22,90 33,58 5,38 39,38" />`
    ),
  css: shapeCSS,
});


