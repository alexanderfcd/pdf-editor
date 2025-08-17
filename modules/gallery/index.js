Editor.addModule({
  name: "gallery",
  schema: [
    {
      label: "Images",
      props: {
        accept: "image/*",
        type: "file",
        multiple: true,
      },
      name: "files",
    },
    {
      label: "Number of columns",
      props: {
        type: "number",
        min: 1,
        max: 10,
      },

      name: "columns",
    },
    {
      label: "Gap",
      props: {
        type: "number",
        min: 0,
        max: 50,
        appendix: "px",
        default: 0,
      },

      name: "gap",
    },
  ],
  defaults: {
    columns: 3,
    gap: 0,
    files: [
      "https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg",
      "https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg",
      "https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg",
    ],
  },
});
