Editor.addModuleTemplate("shape", {
  name: "default",
  render: (target, options) => {
    const radius = options.radius || 0;
    target.innerHTML = `<div class"shape" style=" border-radius: ${radius}">`;
  },
  css: `
        $root .shape {
            width: 100%;
            height: 100%;
            background:blue;
            position:absolute;
            top:0;
            left:0;
            background: var(--backgroundColor);
 
        }
    `,
});
