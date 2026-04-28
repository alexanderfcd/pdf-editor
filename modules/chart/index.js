Editor.addModule({
  name: "chart",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M160-160v-440h160v440H160Zm240 0v-640h160v640H400Zm240 0v-280h160v280H640Z"/></svg>`,

  schema: [
    {
      label: "Type",
      type: "btnMenu",
      name: "chartType",
      options: [
        {
          value: "bar",
          label: "Bar chart",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M160-160v-440h160v440H160Zm240 0v-640h160v640H400Zm240 0v-280h160v280H640Z"/></svg>`,
        },
        {
          value: "pie",
          label: "Pie chart",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480h400v-400q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`,
        },
        {
          value: "line",
          label: "Line chart",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M104-240 0-344l300-300 160 160 284-376 92 68-364 480-164-164-204 236Z"/></svg>`,
        },
      ],
    },
    {
      label: "Data",
      type: "repeater",
      name: "data",
      fields: [
        { name: "label", label: "Label", type: "text" },
        { name: "value", label: "Value", type: "number" },
        { name: "color", label: "Color", type: "color" },
      ],
    },
  ],

  defaults: {
    chartType: "bar",
    data: [
      { label: "Jan", value: 42, color: "#4e79a7" },
      { label: "Feb", value: 65, color: "#f28e2b" },
      { label: "Mar", value: 38, color: "#e15759" },
      { label: "Apr", value: 55, color: "#76b7b2" },
      { label: "May", value: 78, color: "#59a14f" },
    ],
  },

  defaultCSS: "width: 340px; height: 240px; background-color: transparent;",
});
