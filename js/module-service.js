import {
  getModuleConfig,
  getOwnerId,
  saveModuleStyle,
} from "./module/module-config.js";

export class ModuleService {
  constructor(instance) {
    this.root = instance;
  }

  getLayoutModules(layout) {
    return;
  }

  remove(target) {
    saveModuleStyle(target);

    const idm = target.dataset.id;
    const layout = getOwnerId(target);
    const config = getModuleConfig(target);

    // "Before" state — element info needed to restore on undo
    this.root.stateManager.record({
      type: "deletion",
      idm,
      value: config,
      layout,
    }, true);

    target.moveable.destroy();
    target.remove();
    this.root.activeNode(null);

    // "After" state — tombstone so the history index is correctly paired.
    // Applying this on redo re-deletes the element.
    this.root.stateManager.record({
      type: "reDelete",
      id: idm,
      layout,
    }, true);
  }
}
