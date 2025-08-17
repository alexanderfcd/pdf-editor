// Import TinyMCE (assuming you’re using ES Modules or modern bundlers like Webpack)
import tinymce from "tinymce";

// Include the required TinyMCE plugins and themes
import "tinymce/icons/default"; // Icon set
import "tinymce/themes/silver"; // Theme (e.g., 'silver')
import "tinymce/plugins/code"; // Example plugin
import "tinymce/models/dom/model";

import "tinymce/plugins/image/plugin.js";

import Moveable from "moveable";

window.Moveable = Moveable;
window.tinymce = tinymce;
