import { ModulesInit } from "./modules.js";

import { LayoutManagerComponent } from "./layout-builder.js";

import { GUIEditor, fields } from "./guicss.js";
import { initDraggable } from "./draggable.js";
import { StateManager } from "./module/state-manager.js";
import { _Modules, CreateModule } from "./module/module.js";
import { CDialog } from "./dialog.js";
import { CreateBase } from "./core.js";
import { ScaleService } from "./scale.js";
import { Toolbar } from "./toolbar.js";

const modules = {};

export class Editor extends CreateBase {
  constructor(options) {
    super();
    const defaults = {};

    this.settings = Object.assign({}, defaults, options);
    this.stateManager = new StateManager(this);

    this.mount();

    this.#prepareModules();
  }

  #prepareModules() {
    for (const module in modules) {
      const inst = this.createModule(modules[module].module);
      const templates = modules[module].templates;
      for (const name in templates) {
        inst.addTemplate(name, templates[name].render);
      }
    }
  }

  static addModule(module) {
    if (!modules[module.name]) {
      modules[module.name] = {
        module,
        templates: {},
      };
    } else {
      modules[module.name].module = module;
    }
  }
  static addModuleTemplate(moduleName, templateData) {
    if (modules[moduleName]) {
      modules[moduleName].templates[templateData.name] = templateData;
    } else {
      modules[moduleName] = {
        module: () => {},
        templates: {
          [templateData.name]: templateData,
        },
      };
    }
  }

  createModule = (options) => {
    const Module = new CreateModule(options);
    Module.root = this;
    return Module;
  };

  // mousedown and touchstart makes the element active
  // when activenode changes it sets the selected node to null
  #activeNode = null;
  // when user clicks on element without dragging it
  #selectedNode = null;
  // keep refferernce for 'unselect' event
  #previousActiveNode = null;

  activeNode(node) {
    if (typeof node === "undefined") {
      return this.#activeNode;
    }

    this.#previousActiveNode = this.#activeNode;
    this.#activeNode = node;
    this.selectedNode(null);
    this.dispatch("activeNode", node);
  }

  selectedNode(node) {
    if (typeof node === "undefined") {
      return this.#selectedNode;
    }

    this.#selectedNode = node;
    this.dispatch("selectedNode", node);
  }

  GUIEditor() {
    const dlg = new CDialog({
      mode: "sidebar-start",
    });

    dlg.title("Options");
    dlg.disable();
    dlg.open();

    this.guiEditor = new GUIEditor({
      target: dlg.node,
      schema: fields,
    }).on("change", (data) => {
      if (this.activeNode()) {
        data.forEach(
          (o) => (this.activeNode().style[o.prop || o.name] = o.value)
        );

        this.activeNode().moveable.updateRect();

        let immediate =
          this.activeNode().dataset.id !==
          this.stateManager.state.state()[0].id;

        this.stateManager.record(
          {
            id: this.activeNode().dataset.id,
            value: this.activeNode().getAttribute("style"),
            type: "css",
          },
          immediate
        );
      }
    });

    console.log(this.guiEditor);

    this.on("activeNode", (node) => {
      if (node) {
        dlg.enable();
      } else {
        dlg.disable();
      }
    });
  }

  sync(node) {
    if (typeof node !== "undefined") {
      this.activeNode(node);
    }
    if (!this.activeNode()) {
      return;
    }
    const css = getComputedStyle(this.activeNode());

    const val = fields.map((o) => {
      const number = parseFloat(css[o.name]);
      let value = isNaN(number) ? css[o.name] : Math.round(number);
      if (value === "normal") {
        value = 0;
      }
      return {
        name: o.name,
        value,
      };
    });

    this.guiEditor.setValue(val, false);
  }

  #id = Date.now();

  id() {
    return $ir.prefix(this.#id++);
  }

  handleMouseDown(e) {
    const node = e.target.closest(".component");

    const isSystem = $ir.isSystem(e);
    if (isSystem) {
      return;
    }

    document.querySelectorAll(".component.active").forEach((c) => {
      if (node !== c) {
        c.classList.remove("active");
      }
    });

    initDraggable(this);
    if (!node) {
      document
        .querySelectorAll(".editing")
        .forEach((n) => n.classList.remove("editing"));
      if (this.activeNode() && this.activeNode().moveable) {
        this.activeNode().moveable.selfElement.style.display = "none";
      }
      this.activeNode(null);
    } else {
      if (!node.dataset.id) {
        node.dataset.id = this.id();
      }
      if (this.activeNode() !== node) {
        document
          .querySelectorAll(".editing")
          .forEach((n) => n.classList.remove("editing"));
        if (this.activeNode() && this.activeNode().moveable) {
          this.activeNode().moveable.selfElement.style.display = "none";
        }
        this.activeNode(node);
        if (this.activeNode().moveable) {
          this.activeNode().moveable.updateRect();
          this.activeNode().moveable.selfElement.style.display = "";
        }
        node.classList.add("active");
        $ir.componentHandle.dispatch("selectStart", {
          target: node,
          event: e,
        });
      }

      this.sync();
    }
  }

  events() {
    document.body.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    document.body.addEventListener(
      "touchstart",
      this.handleMouseDown.bind(this)
    );

    document.body.addEventListener("click", (e) => {
      const isSystem = $ir.isSystem(e);

      if (isSystem) {
        return;
      }

      const node = e.target.closest(".component");

      if (!node) {
        this.selectedNode(null);
        return;
      }

      if (node && this.selectedNode() !== node) {
        this.selectedNode(node);

        $ir.componentHandle.dispatch("select", {
          target: node,
          event: e,
        });
      }
    });
  }

  mount() {
    this.scale = new ScaleService(this);
    this.toolbar = Toolbar(this);

    document.body.append(this.toolbar.node);

    ModulesInit(this);
    new LayoutManagerComponent(this.settings.sections);
    this.GUIEditor();

    this.events();

    initDraggable(this);
  }
}

globalThis.Editor = Editor;
