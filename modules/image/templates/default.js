Editor.addModuleTemplate("image", {
  name: "default",
  render: (target, options) => {
    const radius = options.radius || 0;
    target.innerHTML = `<img src="${options.file}"  tyle=" border-radius: ${radius}">`;
  },
  css: `
        $root img {
            width: 100%;
            height: 100%;
            position:absolute;
            top:0;
            left:0;
            object-fit:cover;
        }
    `,
});
