Editor.addModuleTemplate("image", {
  name: "polaroid",
  render: (target, options) => {
    target.innerHTML = `<img src="${options.file}">`;
    const img = target.querySelector("img");
    if (img) {
      img.style.outline = "8px solid #fff";
      img.style.outlineOffset = "-8px";
      img.style.boxShadow = "0 0 0 8px #fff, 0 0 0 9px #ddd, inset 0 -32px 0 #fff";
      img.style.objectFit = "cover";
    }
  },
  css: `
    $root {
      position: absolute;
      inset: 0;
      background: #fff;
      padding: 8px 8px 32px;
      box-sizing: border-box;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    $root img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  `,
});
