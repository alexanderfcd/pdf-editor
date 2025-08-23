import { TinyMCE } from "../../js/adapters/tinymce.js";

Editor.addModule({
  name: "text",
  schema: [
    {
      label: "content",
      props: {
        type: "text",
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
});
