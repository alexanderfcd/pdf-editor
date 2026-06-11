Editor.addModule({
  name: "image",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Zm140-360q25 0 42.5-17.5T400-620q0-25-17.5-42.5T340-680q-25 0-42.5 17.5T280-620q0 25 17.5 42.5T340-560Z"/></svg>`,
  schema: [
    {
      label: "Image",
      props: {
        accept: "image/*",
        type: "file",
        multiple: false,
      },
      name: "file",
    },
    {
      label: "Radius",
      propType: "style",
      props: {
        type: "number",
        min: 0,
        max: 200,
        appendix: "px",
      },

      name: "radius",
    },
  ],
  defaults: {
    file: "https://placehold.co/600x400/EEE/31343C",
    radius: 10,
  },
  defaultCSS: `
    width: 250px; 
    height: 250px; 
    background-color: transparent;
  `,
});
