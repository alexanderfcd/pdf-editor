import { CreateBase } from "../core.js";
import { createModule } from "../modules.js";
import { State } from "../state.js";
import { renderModule, setModuleConfig } from "./module.js";
import { initDraggable } from "../draggable.js";

/* 
    State types

    elements and layouts must have id

 
    {
        id: "settings",
        type: "settings",
        value: {"name":"image","template":"default","file":"..."}
    }

    {
        type: "restore"
        value: {"name":"image","template":"default","file":"..."},
        layoutIndex: 0
    }

    {
        type: "layoutRestore"
        value: [{"name":"image","template":"default","file":"..."}, {....}],
        index: 0
    }

    {
        type: "layoutsPosition"
        value: ['some-id', 'some-other-id'],
        index: 0
    }

*/

const stateTypes = {
  settings: (data, instance) => {
    const { value, id } = data;
    const node = document.querySelector('[data-id="' + id + '"]');
    if (node) {
      setModuleConfig(node, value);
      renderModule(node);
    }
  },
  css: (data, instance) => {
    const { value, id } = data;
    const node = document.querySelector('[data-id="' + id + '"]');
    if (node) {
      node.setAttribute("style", value);
      instance.sync(node);
    }
  },
  // Undo a deletion — restores the element back into its section
  deletion: (data, instance) => {
    const { value, idm, layout } = data;
    const layoutnode = document.querySelector('[data-id="' + layout + '"]');
    if (layoutnode) {
      const restored = createModule(value);
      if (idm) restored.dataset.id = idm;
      layoutnode.querySelector(".section-content").appendChild(restored);
      renderModule(restored);
      // Re-attach drag/resize handles so the restored element is interactive
      initDraggable(instance);
    }
  },
  // Redo a deletion — removes the element again
  reDelete: (data, instance) => {
    const { id } = data;
    const node = document.querySelector('[data-id="' + id + '"]');
    if (node) {
      if (node.moveable) node.moveable.destroy();
      node.remove();
      instance.activeNode(null);
    }
  },

  // ── Section (page) level state types ────────────────────────────────────

  // Remove a whole section:
  //   • undo of "add page" / "clone"
  //   • redo of "delete page"
  sectionRemove: (data, instance) => {
    const { id } = data;
    const section = document.querySelector(`.section[data-id="${id}"]`);
    if (!section) return;
    section.querySelectorAll(".component").forEach((comp) => {
      if (comp.moveable) comp.moveable.destroy();
    });
    section.remove();
    if (instance.layoutManagerService) {
      instance.layoutManagerService.buttonsVisibility(instance.settings.sections);
    }
  },

  // Restore a whole section:
  //   • undo of "delete page"
  //   • redo of "add page" / "clone"
  sectionRestore: (data, instance) => {
    const { id, afterId, components } = data;
    const sections = instance.settings.sections;

    // Guard: section may still be in the DOM mid-animation (opacity fade).
    // In that case just cancel the fade rather than creating a duplicate.
    const existing = document.querySelector(`.section[data-id="${id}"]`);
    if (existing) {
      existing.style.opacity = "";
      if (instance.layoutManagerService) {
        instance.layoutManagerService.buttonsVisibility(sections);
      }
      return;
    }

    const section = document.createElement("div");
    section.className = "section";
    section.dataset.id = id;
    const content = document.createElement("div");
    content.className = "section-content";
    section.appendChild(content);

    (components || []).forEach((item) => {
      const module = createModule(item.config, item.css);
      if (item.id) module.dataset.id = item.id;
      content.appendChild(module);
      renderModule(module);
    });

    // Re-insert at the original position
    const afterSection = afterId
      ? document.querySelector(`.section[data-id="${afterId}"]`)
      : null;
    if (afterSection) {
      afterSection.after(section);
    } else {
      const firstSection = sections.querySelector(".section");
      if (firstSection) firstSection.before(section);
      else sections.appendChild(section);
    }

    if (instance.layoutManagerService) {
      instance.layoutManagerService.nav(section);
      instance.layoutManagerService.buttonsVisibility(sections);
    }
    initDraggable(instance);
  },

  // Move a section up one position (instant, no animation):
  //   • redo of "move up"
  //   • undo of "move down"
  sectionMoveUp: (data, instance) => {
    const { id } = data;
    const section = document.querySelector(`.section[data-id="${id}"]`);
    if (!section) return;
    const prev = section.previousElementSibling;
    if (prev && prev.classList.contains("section")) {
      prev.parentNode.insertBefore(section, prev);
    }
    if (instance.layoutManagerService) {
      instance.layoutManagerService.buttonsVisibility(instance.settings.sections);
    }
  },

  // Move a section down one position (instant, no animation):
  //   • redo of "move down"
  //   • undo of "move up"
  sectionMoveDown: (data, instance) => {
    const { id } = data;
    const section = document.querySelector(`.section[data-id="${id}"]`);
    if (!section) return;
    const next = section.nextElementSibling;
    if (next && next.classList.contains("section")) {
      next.parentNode.insertBefore(next, section);
    }
    if (instance.layoutManagerService) {
      instance.layoutManagerService.buttonsVisibility(instance.settings.sections);
    }
  },
};

export class StateManager extends CreateBase {
  constructor(instance) {
    super();
    this.state = new State();
    this.state.on("change", (data) => {
      console.log(data);
      if (data.active && stateTypes[data.active.type]) {
        stateTypes[data.active.type](data.active, instance);
        if (instance.activeNode() && instance.activeNode().moveable) {
          instance.activeNode().moveable.updateRect();
        }
      }
    });
  }

  #timer = null;

  record(data, immediate = false) {
    if (immediate) {
      this.state.record(data);
      return;
    }
    clearTimeout(this.#timer);
    this.#timer = setTimeout(() => this.state.record(data), 200);
  }

  undo() {
    this.state.undo();
  }
  redo() {
    this.state.redo();
  }
}
