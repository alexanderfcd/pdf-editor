import { CreateBase } from "./core.js";

export class ScaleService extends CreateBase {
  constructor(instance) {
    super();
    this.instance = instance;
  }
  #value = null;
  scale(value) {
    const targets =
      this.instance.toolbar.node.ownerDocument.querySelectorAll(
        ".section-content"
      );
    const scale = Number(value);

    if (isNaN(scale) || this.#value === scale) {
      return;
    }

    this.#value = scale;

    const percent = Math.round(scale * 100);

    targets.forEach((target) => {
      const parent = target.parentElement;
      if (!parent.dataset.width) {
        parent.dataset.width = parent.offsetWidth;
        parent.dataset.height = parent.offsetHeight;
      }

      var newWidth = Number(parent.dataset.width) * scale;
      var newHeight = Number(parent.dataset.height) * scale;

      target.style.transformOrigin = "center top";
      //target.style.transform = 'scale(' + scale + ')';
      target.style.zoom = scale;
      parent.style.width = newWidth + "px";
      parent.style.height = newHeight + "px";
    });

    document.querySelectorAll(".component.draggable.active").forEach((node) => {
      if (node.moveable) {
        node.moveable.updateRect();
      }
    });

    $ir.componentHandle.position();

    this.dispatch("change", { value: scale, percent });
  }

  fit(e) {
    let space = getComputedStyle(this.instance.toolbar.node).getPropertyValue(
      "--toolbar-height"
    );

    space = parseFloat(space);

    if (isNaN(space)) {
      space = 40;
    } else {
      space += 40;
    }

    var parentWidth = innerWidth - space;
    var parentHeight = innerHeight - space;

    const target = document.querySelector(".section-content");

    var targetWidth = target.offsetWidth;
    var targetHeight = target.offsetHeight;

    // Calculate the scale factors
    var scaleX = parentWidth / targetWidth;
    var scaleY = parentHeight / targetHeight;

    // Use the smaller scale factor to ensure the child fits within the parent
    var scaleValue = Math.min(scaleX, scaleY);

    // Apply the scale transformation to the child element
    this.scale(scaleValue);
  }
}
