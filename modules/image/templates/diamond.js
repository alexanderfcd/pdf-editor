Editor.addModuleTemplate("image", {
  name: "diamond",
  render: (target, options) => {
    target.innerHTML = `<img src="${options.file}">`;
    const img = target.querySelector("img");
    if (img) {
      img.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
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
