Editor.addModuleTemplate("image", {
  name: "star",
  render: (target, options) => {
    const clipPath =
      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
    target.innerHTML = `<img src="${options.file}">`;
    const img = target.querySelector("img");
    if (img) {
      img.style.clipPath = clipPath;
      img.style.webkitClipPath = clipPath;
    }
  },
  css: `
    $root img{
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      object-fit:cover;
      mask-size:contain;
    }
  `,
});
