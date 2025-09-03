import {
  getModuleConfig,
  getOwnerId,
  saveModuleStyle,
} from "./module/module-config";

export class ModuleService {
  constructor(instance) {
    this.root = instance;
  }

  getLayoutModules(layout) {
    return;
  }

  remove(target) {
    saveModuleStyle(target);

    this.root.stateManager.record({
      type: "deletion",
      id: target.dataset.id,
      value: getModuleConfig(target),
      layout: getOwnerId(target),
    });

    target.moveable.destroy();
    target.remove();
    this.root.activeNode(null);
  }
}
