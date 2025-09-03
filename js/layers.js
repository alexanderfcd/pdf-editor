import { $, CreateState } from "./core";
import { CDialog } from "./dialog";
import { getModuleConfig } from "./module/module-config";

export class Layers {
  constructor(root) {
    this.root = root;

    this.layers = new LayersService(this.root);
    // this.build();
  }
  build() {
    const dlg = new CDialog({
      mode: "sidebar-start",
    });
    dlg.content(this.layers.wrapper);
    dlg.open();
  }
}
export class LayersService extends CreateState {
  constructor(root) {
    super();
    this.root = root;
    this.wrapper = $(`<div class="${$ir.prefix("layers")}"></div>`);
    this.build();
    this.#sync();
  }

  #sync() {
    this.root.layoutManagerService.on("delete", (node) => {
      const treeNode = this.findNode(node);
      if (treeNode) {
        treeNode.remove();
      }
    });
    this.root.layoutManagerService.on("clone", (clone) => {
      this.addLayout(clone);
    });
  }

  build() {
    this.wrapper.innerHTML = "";
    this.getAll().forEach((node) => {
      this.#addDOMNode(node);
    });
  }

  syncLayout(node) {}

  #getNodeIndex(node) {
    return Array.from(node.parentElement.children).findIndex(
      (el) => el === node
    );
  }

  addLayout(domNode) {
    let index;
    if (typeof domNode === "number") {
      index = domNode;
      domNode =
        this.root.settings.targetElement.querySelectorAll(".section")[domNode];
    } else {
      index = this.#getNodeIndex(domNode);
    }

    const treeNode = this.findNodeByIndex(index - 1);

    treeNode["after"](this.#addDOMNode(domNode));
    this.getAll(domNode).forEach((node) => {
      this.#addDOMNode(node);
    });
  }

  #createLayoutNode(data) {
    return $(
      `<div class="${$ir.prefix("layer")} ${$ir.prefix("layer-" + data.type)}">
     <div class="${$ir.prefix("layer-content")}">
        <span class="${$ir.prefix("layer-name")}">${
        data.name || data.type
      }</span>
        <span class="${$ir.prefix("layer-menu")}"></span>
      </div>
      </div>`
    );
  }

  #createModuleNode(data) {
    return $(
      `<div class="${$ir.prefix("layer")} ${$ir.prefix("layer-" + data.type)}">
      <div class="${$ir.prefix("layer-content")}">
        <span class="${$ir.prefix("layer-handle")}"></span>
        <span class="${$ir.prefix("layer-name")}">${
        data.name || data.type
      }</span>
        <span class="${$ir.prefix("layer-menu")}"></span>
      </div>
      </div>`
    );
  }

  getAll(root) {
    if (!root) {
      root = this.root.settings.targetElement;
    }
    return Array.from(root.querySelectorAll(".section,.component"));
  }

  existsInTree(node) {
    return !!this.findNode(node);
  }

  findNode(domNode) {
    return Array.from(
      this.wrapper.querySelectorAll(`.${$ir.prefix("layer")}`)
    ).find((node) => node.__ref === domNode);
  }

  findNodeByIndex(i) {
    console.log(i);
    console.log(this.wrapper.children[i]);
    return this.wrapper.children[i];
  }

  #addDOMNode(node) {
    const data = {};
    const isModule = node.classList.contains("component");
    let parent, treeNode;

    if (isModule) {
      const conf = getModuleConfig(node);
      data.type = "module";
      data.name = conf.name;
      parent = this.findNode(node.closest(".section"));

      treeNode = this.#createModuleNode(data);
    } else {
      data.type = "layout";
      parent = this.wrapper;
      treeNode = this.#createLayoutNode(data);
    }

    treeNode.__ref = node;
    parent.appendChild(treeNode);
    return treeNode;
  }
}
