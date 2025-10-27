import { TinyMCE } from "../../js/adapters/tinymce.js";

Editor.addModule({
  name: "text",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z"/></svg>`,

  schema: [
    {
      label: "content",
      props: {
        type: "hidden",
      },

      name: "content",
    },
    {
      label: "Radius",
      props: {
        type: "number",
        min: 0,
        max: 200,
        appendix: "px",
      },

      name: "radius",
    },
  ],
  onUnSelect: ({ target, event }) => {},
  onSelect: async ({ target, event }) => {
    if (!event.target.closest(".component-content")) {
      target.classList.remove("editing");
      return;
    }

    $ir.componentHandle.hide();

    if (!target.editor) {
      target.editor = new TinyMCE(target.querySelector(".component-content"));
    } else {
      await target.editor.focus();
    }

    //

    target.classList.add("editing");

    if (target.moveable) {
      target.moveable.destroy();
      target.classList.remove("draggable");
      delete target.moveable;
    }
  },
  defaults: {
    content: `
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vivamus vehicula felis vel rutrum aliquet. 
        Curabitur ac blandit neque, in porttitor sapien.
      </p>
    `.trim(),
  },
  defaultCSS: `width: 80%; height: 150px`,
});
