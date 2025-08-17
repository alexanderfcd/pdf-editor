Editor.addModuleTemplate("gallery", {
  name: "default",
  render: (target, options) => {
    const gap = parseFloat(options.gap || 0);
    const columns = Number(options.columns || 1);

    target.innerHTML = `<div style="display:flex;flex-wrap: wrap;overflow:hidden;gap: ${gap}px;justify-content:space-between;position: absolute; inset: 0;">${(
      options.files || []
    )
      .map(
        (f) =>
          `<div  style="width:calc(${
            100 / columns
          }% - ${gap}px)"><img style="width:100%;height: 100%;object-fit:cover;" src="${f}"></div>`
      )
      .join("")}</div>`;
  },
});
