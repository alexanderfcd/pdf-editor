Editor.addModuleTemplate("image", {
  name: "circle",
  render: (target, options) => {
    target.innerHTML = `<img src="${options.file}">`;
    const img = target.querySelector("img");
    if (img) {
      img.style.borderRadius = "50%";
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
