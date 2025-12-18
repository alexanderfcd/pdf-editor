// Import TinyMCE (assuming you’re using ES Modules or modern bundlers like Webpack)
import tinymce from "tinymce";

// Include the required TinyMCE plugins and themes
import "tinymce/icons/default/icons.js"; // Icon set
import "tinymce/themes/silver/theme.js"; // Theme (e.g., 'silver')
import "tinymce/plugins/code/plugin.js";
import "tinymce/plugins/lists/plugin.js";
import "tinymce/plugins/table/plugin.js";
import "tinymce/plugins/codesample/plugin.js";
import "tinymce/models/dom/model.js";

import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/content/default/content.min.css";

import "tinymce/plugins/image/plugin.js";

import Moveable from "moveable";

window.Moveable = Moveable;
window.tinymce = tinymce;

(function () {
  const prefix = "ir-";
  let _id = Date.now();
  window.$ir = {
    id() {
      return this.prefix(_id++);
    },
    prefix(str) {
      return `${prefix}${str}`;
    },
    isSystem: (e) => {
      const target = e.target ? e.target : e;
      return !!target.closest(
        ".toolbox,.dialog,#gtx-trans,.tox,.handle,.ir-toolbar"
      );
    },
  };
})();
