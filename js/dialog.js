import { $, CreateBase } from "./core.js";

export class Dialog {
  constructor(options) {
    this.config(options);
    this.mode = options.mode || "modal";
    this.init();
  }

  title(title) {
    this.header.querySelector(".dialog-title").innerHTML = title;
  }

  create() {
    this.root = document.createElement("div");
    const mode = this.mode.split("-");
    let pos = "end";
    if (mode[1]) {
      pos = mode[1];
    }
    this.root.className = `dialog dialog-${mode[0]} dialog-${pos}`;

    this.header = document.createElement("div");
    this.header.className = "dialog-header";
    this.header.innerHTML = `<span class="dialog-title">${
      this.settings.title || ""
    }</span>`;

    const closeButton = document.createElement("span");
    closeButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
    closeButton.className = "dialog-close";
    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      this[this.settings.closeAction]();
    });

    this.header.appendChild(closeButton);

    this.content = document.createElement("div");
    this.content.className = "dialog-content";
    this.content.innerHTML = this.settings.content;
    this.content.style.width = this.settings.width;

    this.footer = document.createElement("div");
    this.footer.className = "dialog-footer";

    this.overlay = document.createElement("div");
    this.overlay.className = "dialog-overlay";

    if (!!this.settings.header) {
      this.root.appendChild(this.header);
      this.root.classList.add("has-header");
    }

    this.root.appendChild(this.content);

    if (!!this.settings.footer) {
      this.root.appendChild(this.footer);
      this.root.classList.add("has-footer");
    }

    if (this.settings.overlay !== false) {
      document.body.appendChild(this.overlay);
    }

    document.body.appendChild(this.root);
  }

  remove() {
    this.root.remove();
    this.overlay.remove();
  }

  show() {
    this.root.classList.add("active");
    this.overlay.style.display = "";
  }
  hide() {
    this.root.classList.remove("active");
    this.overlay.style.display = "none";
  }

  style() {
    if (Dialog._hasStyle) {
      return;
    }
    Dialog._hasStyle = true;
    const style = document.createElement("style");

    style.textContent = `
                    .dialog, .dialog-overlay{
                        position: fixed;
                        z-index: 1000;
                    }

                    .dialog-overlay{
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,.1);
                    }

                    
                    .dialog{
                        background-color: white;
                        border-radius: 5px;
                        box-shadow: 0 0 20px -10px rgba(0,0,0,.3);
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);

                        opacity: 0;
                        visibility: hidden;
                        display: none;
                        transition: .2s;
               
                        z-index: 3001;

                        --padding: var(--gap-box);
                        --header-height: 70px;
                        --footer-height: 70px;
                        font-family: var(--font);
                    }
                    
                    .dialog.disabled .dialog-footer,
                    .dialog.disabled .dialog-content{
                        pointer-events: none
                    }
                    .dialog.disabled .dialog-content:after{
                        background-color: #ffffff99;
                        position: absolute;
                        inset: 0;
                        content: '';
                        z-index: 1;
                        
                    }
                    .dialog.active{
                        opacity: 1;
                        visibility: visible;
                        display: block;
           
                    }
                    .dialog-modal{
                        transform: translate(-50%,-50%);
                    }
                    .dialog-sidebar{
                        top: calc(var(--padding) + var(--toolbar-height));
                        right: var(--gap-box);
                        left: auto;
                        transform: none;
                        height: calc(100% - (var(--toolbar-height) + (2 * var(--padding))));
                    }

                    .dialog-start{
         
                        right: auto;
                        left: var(--gap-box);
       
                    }

                    .dialog-content{
                        padding: var(--padding);
                        max-height: calc(100vh - (2 * var(--padding)));
                        overflow: auto;
                        position:relative;
                    }
                        .dialog.has-header .dialog-content{
                                max-height: calc(100% - var(--header-height));
                            
                        }

                         .dialog.has-footer .dialog-content{
                            max-height: calc(100vh - var(--footer-height));
                        }

                        .dialog.has-header.has-footer .dialog-content{
                            max-height: calc(100vh - var(--header-height) - var(--footer-height));
                        }

                    .dialog-header{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: var(--padding);
                        border-bottom: 1px solid silver;
                        height: var(--header-height)

                    }

                    .dialog-footer{
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        padding: var(--padding);
                        border-top: 1px solid silver;
                        height: var(--footer-height)
                    }

 

                    .dialog-close svg{
                        width: 25px
                    }
                    .dialog-close{
                      color: #777
                    }
                    .dialog-close:hover{
                        color: black
                    }
                    .dialog-close{
                        cursor: pointer;
                        margin-inline-start: 20px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }

                     

                    .dialog-title{
                        font-weight: bold;
                        opacity: .5;
                        font-size: 12px;
                        text-transform: uppercase;
                    }

                `;

    document.head.appendChild(style);
  }

  init() {
    this.create();
    this.style();
    this.show();
  }

  config(options = {}) {
    const defaults = {
      content: ``,
      title: "",
      width: "auto",
      closeAction: "remove",
    };

    this.settings = Object.assign({}, defaults, options);
  }
}

export class CDialog extends CreateBase {
  constructor(options = {}) {
    super();

    this.settings = Object.assign({}, this.#defaults(), options);

    this.build();
    this.dialog.hide();
  }

  #defaults() {
    return {
      width: "350px",
      mode: "sidebar",
      footer: false,
      header: true,
      content: ``,
      closeAction: "hide",
      overlay: false,
    };
  }

  build() {
    this.dialog = new Dialog(this.settings);
    this.node = this.dialog.content;
  }

  enable() {
    this.dialog.root.classList.remove("disabled");
  }
  disable() {
    this.dialog.root.classList.add("disabled");
  }

  open() {
    this.dialog.show();
    this.dispatch("show");
  }

  close() {
    this.dialog.hide();
    this.dispatch("close");
  }

  html(content) {
    return this.content(content);
  }
  content(content) {
    if (typeof content === "string") {
      this.dialog.content.innerHTML = content;
    } else if (!!content.nodeName) {
      this.dialog.content.appendChild(content);
    } else if (Array.isArray(content)) {
      content.forEach((item) => {
        this.dialog.content.appendChild(item);
      });
    }
  }
  title(html) {
    this.dialog.title(html);
  }
}

export class ModuleDialog extends CDialog {
  constructor(options) {
    super();

    this.settings = Object.assign({}, this.#defaults(), options);

    this.build();
    this.title("Insert module");
    this.displayModules();
    this.on('close', () => {
      this.#resolve(null)
    })
  }

  

  displayModules() {
    const list = $(`<ul  class="${$ir.prefix("list-modules")}" />`);
    const modules = Editor.getModulesMeta();

    modules.forEach((module) => {
      const li = $(
        `<li data-module="${module.name}">${module.icon}<span>${module.name}</span></li>`
      );
      li.__module = module;
      list.appendChild(li);
    });

    this.content(list);

    this.dialog.content.querySelector("ul").addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (li) {
        this.dispatch("moduleSelected", li.__module);
        this.#resolve(li.__module)
        this.dialog.remove();
      }
    });
  }

  #defaults() {
    return {
      width: "450px",
      mode: "modal",
      footer: false,
      header: true,
      content: ``,
      closeAction: "remove",
      overlay: true,
    };
  }

  #resolvers = [];
  #resolve(module) {
        this.#resolvers.forEach((resolve) => resolve(module));
        this.#resolvers = [];
  }

  promise() {
    return new Promise((resolve, reject) => {
      this.#resolvers.push(resolve);
    });
  }
}

export class LayoutDialog extends CDialog {
  constructor(options = {}) {
    super();

    this.settings = Object.assign({}, this.#defaults(), options);
    this.layouts = Array.isArray(options.layouts) ? options.layouts : [];
    this.renderPreview = options.renderPreview || null;

    this.build();
    this.title("Insert layout");
    this.displayLayouts();
    this.on("close", () => {
      this.#resolve(null);
    });
  }

  displayLayouts() {
    const container = $(`<div class="${$ir.prefix("layout-dialog-body")}" />`);

    const grouped = {};
    const order = [];
    this.layouts.forEach((layout) => {
      const cat = layout.category || "General";
      if (!grouped[cat]) { grouped[cat] = []; order.push(cat); }
      grouped[cat].push(layout);
    });

    order.forEach((cat) => {
      container.appendChild($(`<div class="${$ir.prefix("layout-category")}">${cat}</div>`));
      const grid = $(`<div class="${$ir.prefix("layout-preview-grid")}" />`);
      grouped[cat].forEach((layout) => grid.appendChild(this._buildPreviewCard(layout)));
      container.appendChild(grid);
    });

    this.content(container);

    this.dialog.content
      .querySelector(`.${$ir.prefix("layout-dialog-body")}`)
      .addEventListener("click", (e) => {
        const card = e.target.closest(`.${$ir.prefix("layout-card")}`);
        if (card) {
          this.dispatch("layoutSelected", card.__layout);
          this.#resolve(card.__layout);
          this.dialog.remove();
        }
      });
  }

  _buildPreviewCard(layout) {
    const card = document.createElement("div");
    card.className = $ir.prefix("layout-card");
    card.__layout = layout;

    const wrap = document.createElement("div");
    wrap.className = $ir.prefix("layout-preview-wrap");

    // Use real module rendering if a renderer was supplied
    const page = this.renderPreview
      ? this.renderPreview(layout)
      : this._fallbackPage(layout);

    page.classList.add($ir.prefix("layout-preview-page"));
    page.style.pointerEvents = "none";
    wrap.appendChild(page);
    card.appendChild(wrap);

    const label = document.createElement("div");
    label.className = $ir.prefix("layout-card-label");
    label.textContent = layout.title;
    card.appendChild(label);

    return card;
  }

  // Coloured-block fallback when no renderer is provided
  _fallbackPage(layout) {
    const MODULE_COLORS = {
      text: "#dbeafe", richtext: "#dbeafe",
      image: "#f3f4f6", shape: "#fae8ff",
      chart: "#d1fae5", gallery: "#fef3c7",
    };
    const page = document.createElement("div");
    (layout.components || []).forEach((comp) => {
      const block = document.createElement("div");
      if (comp.css) block.style.cssText = comp.css;
      block.style.position = "absolute";
      block.style.borderRadius = "3px";
      if (comp.config?.name === "image" && comp.config.file) {
        const m = comp.config.file.match(/placehold\.co\/\d+x\d+\/([0-9a-f]{6})/i);
        if (m) block.style.backgroundColor = `#${m[1]}`;
      }
      if (!block.style.backgroundColor)
        block.style.backgroundColor = MODULE_COLORS[comp.config?.name] || "#f3f4f6";
      if (!block.style.height && !block.style.minHeight)
        block.style.minHeight = "34px";
      page.appendChild(block);
    });
    return page;
  }

  #defaults() {
    return {
      width: "600px",
      mode: "modal",
      footer: false,
      header: true,
      content: ``,
      closeAction: "remove",
      overlay: true,
    };
  }

  #resolvers = [];
  #resolve(layout) {
    this.#resolvers.forEach((resolve) => resolve(layout));
    this.#resolvers = [];
  }

  promise() {
    return new Promise((resolve) => {
      this.#resolvers.push(resolve);
    });
  }
}

export class PageTemplateDialog extends CDialog {
  constructor(options = {}) {
    super();
    this.settings = Object.assign({}, this.#defaults(), options);
    this.templates = Array.isArray(options.templates) ? options.templates : [];
    this.renderPreview = options.renderPreview || null;
    this.build();
    this.title("Insert page");
    this.displayTemplates();
    this.on("close", () => {
      this.#resolve(null);
    });
  }

  displayTemplates() {
    const container = $(`<div class="${$ir.prefix("layout-dialog-body")}" />`);

    const grouped = {};
    const order = [];
    this.templates.forEach((tpl) => {
      const cat = tpl.category || "General";
      if (!grouped[cat]) { grouped[cat] = []; order.push(cat); }
      grouped[cat].push(tpl);
    });

    order.forEach((cat) => {
      container.appendChild($(`<div class="${$ir.prefix("layout-category")}">${cat}</div>`));
      const grid = $(`<div class="${$ir.prefix("layout-preview-grid")}" />`);
      grouped[cat].forEach((tpl) => grid.appendChild(this._buildPreviewCard(tpl)));
      container.appendChild(grid);
    });

    this.content(container);

    this.dialog.content
      .querySelector(`.${$ir.prefix("layout-dialog-body")}`)
      .addEventListener("click", (e) => {
        const card = e.target.closest(`.${$ir.prefix("layout-card")}`);
        if (card) {
          this.dispatch("templateSelected", card.__tpl);
          this.#resolve(card.__tpl);
          this.dialog.remove();
        }
      });
  }

  _buildPreviewCard(tpl) {
    const card = document.createElement("div");
    card.className = $ir.prefix("layout-card");
    card.__tpl = tpl;

    const wrap = document.createElement("div");
    wrap.className = $ir.prefix("layout-preview-wrap");

    const page = this.renderPreview
      ? this.renderPreview(tpl)
      : this._fallbackPage(tpl);

    page.classList.add($ir.prefix("layout-preview-page"));
    page.style.pointerEvents = "none";
    wrap.appendChild(page);
    card.appendChild(wrap);

    const label = document.createElement("div");
    label.className = $ir.prefix("layout-card-label");
    label.textContent = tpl.title;
    card.appendChild(label);

    return card;
  }

  _fallbackPage(tpl) {
    const MODULE_COLORS = {
      text: "#dbeafe", richtext: "#dbeafe",
      image: "#f3f4f6", shape: "#fae8ff",
      chart: "#d1fae5", gallery: "#fef3c7",
    };
    const page = document.createElement("div");
    (tpl.components || []).forEach((comp) => {
      const block = document.createElement("div");
      if (comp.css) block.style.cssText = comp.css;
      block.style.position = "absolute";
      block.style.borderRadius = "3px";
      if (comp.config?.name === "image" && comp.config.file) {
        const m = comp.config.file.match(/placehold\.co\/\d+x\d+\/([0-9a-f]{6})/i);
        if (m) block.style.backgroundColor = `#${m[1]}`;
      }
      if (!block.style.backgroundColor)
        block.style.backgroundColor = MODULE_COLORS[comp.config?.name] || "#f3f4f6";
      if (!block.style.height && !block.style.minHeight)
        block.style.minHeight = "34px";
      page.appendChild(block);
    });
    return page;
  }

  #defaults() {
    return {
      width: "600px",
      mode: "modal",
      footer: false,
      header: true,
      content: ``,
      closeAction: "remove",
      overlay: true,
    };
  }

  #resolvers = [];
  #resolve(tpl) {
    this.#resolvers.forEach((resolve) => resolve(tpl));
    this.#resolvers = [];
  }

  promise() {
    return new Promise((resolve) => {
      this.#resolvers.push(resolve);
    });
  }
}
