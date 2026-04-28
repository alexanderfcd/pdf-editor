Editor.addModuleTemplate("image", {
  name: "frame",
  render: (target, options) => {
    const radius = options.radius || 0;
    target.innerHTML = `<img src="${options.file}">`;
    const img = target.querySelector("img");
    if (img) {
      img.style.outline = "3px solid #333";
      img.style.outlineOffset = "-10px";
      img.style.borderRadius = `${radius}px`;
      img.style.objectFit = "cover";
    }
  },
  css: `
    $root {
      position: absolute;
      inset: 0;
    }
    $root img {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
});
