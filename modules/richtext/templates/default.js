Editor.addModuleTemplate("text", {
  name: "default",
  render: (target, options) => {
    const radius = options.radius || 0;

    target.innerHTML = `<div style="border-radius: ${radius}px">${options.content}</div>`;
  },
  css: `
    $root {
      padding: 15px;
    }
    $root .component-content li{
      margin: 0 0 0 1em;
    }
  `,
});
