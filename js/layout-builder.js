import { renderModule } from "./module/module.js";

class LayoutBuilderService {
  _events = {};
  on(e, f) {
    this._events[e] ? this._events[e].push(f) : (this._events[e] = [f]);
  }
  dispatch(e, f) {
    this._events[e]
      ? this._events[e].forEach(function (c) {
          c.call(this, f);
        })
      : "";
  }

  delete(target) {
    if (confirm("Are you sure you want to delete selected element?")) {
      target.style.opacity = 0;
      const handleEnd = () => {
        target.remove();
        this.dispatch("change");
      };

      target.addEventListener("transitionend", handleEnd);
    }
  }
  moveUp(target) {
    let prev = target.previousElementSibling;
    if (!prev) return;
    let offTarget = target.getBoundingClientRect();
    let offPrev = prev.getBoundingClientRect();
    let to = 0;

    if (offTarget.top > offPrev.top) {
      to = -(offTarget.top - offPrev.top);
    }

    target.style.transform = "translateY(" + to + "px)";
    prev.style.transform = "translateY(" + -to + "px)";

    const handleEnd = () => {
      //prev.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
      prev.parentNode.insertBefore(target, prev);

      prev.style.transition = "none";
      target.style.transition = "none";

      setTimeout(() => {
        target.style.transition = "";
        prev.style.transition = "";
      });

      target.style.transform = "";
      prev.style.transform = "";

      target.removeEventListener("transitionend", handleEnd);
      this.dispatch("change");
      this.dispatch("moveUp", target);
    };

    target.addEventListener("transitionend", handleEnd);
  }

  moveDown(target) {
    let next = target.nextElementSibling;
    if (!next) return;
    let offTarget = target.getBoundingClientRect();
    let offnext = next.getBoundingClientRect();
    let to = 0;

    if (offTarget.top < offnext.top) {
      to = -(offTarget.top - offnext.top);
    }
    target.style.transform = "translateY(" + to + "px)";
    next.style.transform = "translateY(" + -to + "px)";
    const handleEnd = () => {
      //next.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
      next.parentNode.insertBefore(next, target);

      next.style.transition = "none";
      target.style.transition = "none";

      setTimeout(() => {
        target.style.transition = "";
        next.style.transition = "";
      });

      target.style.transform = "";
      next.style.transform = "";

      target.removeEventListener("transitionend", handleEnd);
      this.dispatch("change");
      this.dispatch("moveDown", target);
    };

    target.addEventListener("transitionend", handleEnd);
  }

  clone(target) {
    const clone = document.createElement("div");
    clone.innerHTML = `<div class="section-content"></div><div class="layout-menu"></div>`;
    const comtentBlock = clone.querySelector(".section-content");
    clone.className = `section`;
    clone.setAttribute("style", target.getAttribute("style"));
    comtentBlock.setAttribute(
      "style",
      target.querySelector(".section-content").getAttribute("style")
    );
    clone.dataset.id = $ir.prefix(Date.now());
    target.after(clone);

    target.querySelectorAll(".component").forEach((e) => {
      const neNode = TargetMethods.clone(e, false);
      comtentBlock.append(neNode);
      renderModule(neNode);
    });

    this.nav(clone);
    this.dispatch("change");
    this.dispatch("clone", clone);
    clone.scrollIntoView({
      behavior: "smooth",
    });
  }

  buttonsVisibility(root) {
    const all = root.querySelectorAll(".layout-menu");
    all.forEach((node, i) => {
      node.querySelector('[data-action="moveUp"]').style.display =
        i === 0 ? "none" : "";
      node.querySelector('[data-action="moveDown"]').style.display =
        i === all.length - 1 ? "none" : "";
    });
  }
  nav(layout) {
    const template = `
        <ul class="menu bg-base-200 rounded-box">
            <li>
                <a class="tooltip tooltip-left" data-tip="Move Up" data-action="moveUp">
                    <svg xmlns="http://www.w3.org/2000/svg" class="	" viewBox="0 -960 960 960"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>
                </a>
            </li>

            <li>
                <a class="tooltip tooltip-left" data-tip="Move down" data-action="moveDown">
                    <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 -960 960 960"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg>
                </a>
            </li>
            <li>
                <a class="tooltip tooltip-left" data-tip="Clone" data-action="clone">

                    <svg xmlns="http://www.w3.org/2000/svg"  class="" viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>                    
                </a>
            </li>
                <li>
                <a class="tooltip tooltip-left" data-tip="Delete" data-action="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="	" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </a>
            </li>
        </ul>
        `;

    const nav =
      layout.querySelector(".layout-menu") || document.createElement("div");
    nav.className = "layout-menu";
    nav.innerHTML = template;
    nav.querySelectorAll("[data-action]").forEach((node) => {
      node.addEventListener("click", () => {
        this[node.dataset.action](layout);
      });
    });
    layout.appendChild(nav);
    layout.__mounted = true;
    return nav;
  }
}

export class LayoutManagerComponent {
  constructor(target) {
    this.layoutService = new LayoutBuilderService();
    this.target = target;
    this.mount();
    this.layoutService.buttonsVisibility(this.target);
    this.layoutService.on("change", () => {
      setTimeout(() => {
        this.layoutService.buttonsVisibility(this.target);
      });
    });
  }

  nav(layout) {
    return this.layoutService.nav(layout);
  }

  mount() {
    this.target.querySelectorAll(".section").forEach((node) => {
      if (!node.__mounted) {
        node.__mounted = true;
        this.nav(node);
      }
    });
  }
}
