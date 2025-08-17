Editor.addModuleTemplate("text", {
  name: "default",
  render: (target, options) => {
    const radius = options.radius || 0;

    target.innerHTML = `<div style="border-radius: ${radius}px">${options.content}</div>`;
  },
});
