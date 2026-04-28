import { TinyMCE } from "../../js/adapters/tinymce.js";
import { getActiveModuleConfig, getModuleConfig } from "../../js/module/module-config.js";
import { setModuleConfig, updateModuleKeyValue } from "../../js/module/module.js";

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
    {
      label: "Vertical align",
      type: "btnMenu",
      options: [
        {
          value: "flex-start",
          label: "Top",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/></svg>`,
        },
        {
          value: "center",
          label: "Center",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"/></svg>`,
        },
        {
          value: "flex-end",
          label: "Bottom",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/></svg>`,
        },
      ],
      name: "verticalAlign",
    },
  ],
  onUnSelect: ({ target, event }) => {},
  onSelect: async function({ target, event }) {
    if (!event.target.closest(".component-content")) {
      target.classList.remove("editing");
      return;
    }

    $ir.componentHandle.hide();

    if (!target.editor) {
      target.editor = new TinyMCE(target.querySelector(".component-content"));
      let component = target.closest(".component");

      let _once = false
 
      target.editor.on("change", (val) => {

        const conf = getModuleConfig(component)

        
        
        if(!_once) {
          _once = true;
          this.root.stateManager.record({
            type: "settings",
            value: conf,
            id: component.dataset.id,
          })
        } 

        getActiveModuleConfig().getByName('content').setValue(val, false);
        setModuleConfig(component, {...conf, content: val})
        

        this.root.stateManager.record({
          type: "settings",
          value: getModuleConfig(component),
          id:component.dataset.id,
        })
      })
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
