Editor.addModuleTemplate("gallery", {
  name: "default",
  render: (target, options) => {
    const gap = parseFloat(options.gap || 0);
    const rowHeight = parseFloat(options.rowHeight || 0);
    const columns = Number(options.columns || 1);

    target.innerHTML = `<div class="gallery-default-wrapper" style="row-gap: ${gap}px;--rowHeight:${rowHeight}px">${(
      options.files || []
    )
      .map(
        (f) =>
          `<div  style="width:calc(${100 / columns}% - ${Math.ceil(
            gap / 2
          )}px)"><img src="${f}"></div>`
      )
      .join("")}</div>`;
  },
  css: `
    $root .gallery-default-wrapper > div{
      height: var(--rowHeight)
    }
    $root .gallery-default-wrapper{
      display:flex;
      flex-wrap: wrap;
      overflow:hidden;
      justify-content:space-between;
      position: absolute; 
      inset: 0;
    }
    $root img{
      width:100%;
      height: 100%;
      object-fit:cover;
    }
  `,
});
