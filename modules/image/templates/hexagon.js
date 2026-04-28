Editor.addModuleTemplate("image", {
  name: "hexagon",
  render: (target, options) => {
    const clip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
    target.innerHTML = `<img src="${options.file}">`;
    const img = target.querySelector("img");
    if (img) {
      img.style.clipPath = clip;
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
    }
  `,
});
