Editor.addModuleTemplate("gallery", {
  name: "default",
  render: (target, options) => {
    const gap = parseFloat(options.gap || 0);

    const columns = Number(options.columns || 1);
    const files = options.files || [];
    const numberOfRows = Math.ceil(files.length / columns);

    let rowSpace = numberOfRows > 1 ? (numberOfRows % 2 === 0 ? 2 : 1.5) : 0;

    const rowHeight = `calc(${100 / numberOfRows}% - ${gap / rowSpace}px)`;

    target.innerHTML = `<div class="gallery-default-wrapper" style="row-gap: ${gap}px;--rowHeight:${rowHeight}">${files
      .map(
        (f) =>
          `<div  style="width:calc(${100 / columns}% - ${Math.ceil(
            columns === 1 ? 0 : gap / 2
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
