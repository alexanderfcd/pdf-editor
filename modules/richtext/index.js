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
  onSelect: ({ target, event }) => {
    if (!event.target.closest(".component-content")) {
      target.classList.remove("editing");
      return;
    }

    if (!target.editor) {
      target.editor = richText(target.querySelector(".component-content"));
    } else {
      setTimeout(async () => {
        const editor = (await target.editor)[0];

        editor.focus();
        //editor.execCommand('SelectAll');
      }, 1);
    }

    target.classList.add("editing");

    if (target.moveable) {
      target.moveable.destroy();
      target.classList.remove("draggable");
      delete target.moveable;
    }
  },
});
