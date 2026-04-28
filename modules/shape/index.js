Editor.addModule({
  name: "shape",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M200-80v-280h-80v-240h80v-280h560v280h80v240h-80v280H200Zm80-80h400v-200H280v200Zm-80-280h560v-80H200v80Zm80-160h400v-200H280v200Zm200 340Zm0-180Zm0-180Z"/></svg>`,
  schema: [
    {
      label: "Fill",
      props: { type: "color" },
      name: "fill",
    },
    {
      label: "Stroke",
      props: { type: "color" },
      name: "stroke",
    },
    {
      label: "Stroke Width",
      props: { type: "number", min: 0, max: 20, appendix: "px" },
      name: "strokeWidth",
    },
    {
      label: "Opacity",
      props: { type: "number", min: 0, max: 1, step: 0.1 },
      name: "opacity",
    },
  ],
  defaults: {
    fill: "#575757",
    stroke: "#1F2937",
    strokeWidth: 1,
    opacity: 1,
  },
  defaultCSS: `
    width: 220px;
    height: 220px;
    background-color: transparent;
  `,
});
