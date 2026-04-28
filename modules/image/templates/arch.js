Editor.addModuleTemplate("image", {
  name: "arch",
  render: (target, options) => {
    target.innerHTML = `<img src="${options.file}">`;
    const img = target.querySelector("img");
    if (img) {
      img.style.borderRadius = "50% 50% 0 0 / 60% 60% 0 0";
      img.style.objectFit = "cover";
    }
  },
  css: `
    $root {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
    $root img {
      width: 100%;
      height: 100%;
    }
  `,
});
