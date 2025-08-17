/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/gallery/index.js":
/*!**********************************!*\
  !*** ./modules/gallery/index.js ***!
  \**********************************/
/***/ (() => {

eval("{Editor.addModule({\r\n  name: \"gallery\",\r\n  schema: [\r\n    {\r\n      label: \"Images\",\r\n      props: {\r\n        accept: \"image/*\",\r\n        type: \"file\",\r\n        multiple: true,\r\n      },\r\n      name: \"files\",\r\n    },\r\n    {\r\n      label: \"Number of columns\",\r\n      props: {\r\n        type: \"number\",\r\n        min: 1,\r\n        max: 10,\r\n      },\r\n\r\n      name: \"columns\",\r\n    },\r\n    {\r\n      label: \"Gap\",\r\n      props: {\r\n        type: \"number\",\r\n        min: 0,\r\n        max: 50,\r\n        appendix: \"px\",\r\n        default: 0,\r\n      },\r\n\r\n      name: \"gap\",\r\n    },\r\n  ],\r\n  defaults: {\r\n    columns: 3,\r\n    gap: 0,\r\n    files: [\r\n      \"https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg\",\r\n      \"https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg\",\r\n      \"https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg\",\r\n    ],\r\n  },\r\n});\r\n\n\n//# sourceURL=webpack://pdf-editor/./modules/gallery/index.js?\n}");

/***/ }),

/***/ "./modules/gallery/templates/default.js":
/*!**********************************************!*\
  !*** ./modules/gallery/templates/default.js ***!
  \**********************************************/
/***/ (() => {

eval("{Editor.addModuleTemplate(\"gallery\", {\r\n  name: \"default\",\r\n  render: (target, options) => {\r\n    const gap = parseFloat(options.gap || 0);\r\n    const columns = Number(options.columns || 1);\r\n\r\n    target.innerHTML = `<div style=\"display:flex;flex-wrap: wrap;overflow:hidden;gap: ${gap}px;justify-content:space-between;position: absolute; inset: 0;\">${(\r\n      options.files || []\r\n    )\r\n      .map(\r\n        (f) =>\r\n          `<div  style=\"width:calc(${\r\n            100 / columns\r\n          }% - ${gap}px)\"><img style=\"width:100%;height: 100%;object-fit:cover;\" src=\"${f}\"></div>`\r\n      )\r\n      .join(\"\")}</div>`;\r\n  },\r\n});\r\n\n\n//# sourceURL=webpack://pdf-editor/./modules/gallery/templates/default.js?\n}");

/***/ }),

/***/ "./modules/image/index.js":
/*!********************************!*\
  !*** ./modules/image/index.js ***!
  \********************************/
/***/ (() => {

eval("{Editor.addModule({\r\n    name: 'image',\r\n    schema: [\r\n\r\n        {\r\n            label: 'Image',\r\n            props: {\r\n                accept: 'image/*',\r\n                type: 'file',\r\n                multiple: false\r\n\r\n            },\r\n            name: 'file',\r\n        },\r\n        {\r\n            label: 'Radius',\r\n            props: {\r\n\r\n                type: 'number',\r\n                min: 0,\r\n                max: 200,\r\n                appendix: 'px',\r\n            },\r\n\r\n            name: 'radius',\r\n        },\r\n    ],\r\n    defaults: {\r\n        file: 'https://images.pexels.com/photos/4762770/pexels-photo-4762770.jpeg',\r\n        radius: 10\r\n    }\r\n})\n\n//# sourceURL=webpack://pdf-editor/./modules/image/index.js?\n}");

/***/ }),

/***/ "./modules/image/templates/default.js":
/*!********************************************!*\
  !*** ./modules/image/templates/default.js ***!
  \********************************************/
/***/ (() => {

eval("{Editor.addModuleTemplate('image', {\r\n    name: \"default\",\r\n    render: (target, options) => {\r\n        const radius = options.radius || 0;\r\n        target.innerHTML = `<img src=\"${options.file}\"  tyle=\"width: 100%;height: 100%;position:absolute;top:0;left:0;object-fit:cover; border-radius: ${radius}\">`;\r\n    }\r\n})\n\n//# sourceURL=webpack://pdf-editor/./modules/image/templates/default.js?\n}");

/***/ }),

/***/ "./modules/image/templates/star.js":
/*!*****************************************!*\
  !*** ./modules/image/templates/star.js ***!
  \*****************************************/
/***/ (() => {

eval("{Editor.addModuleTemplate('image', {\r\n    name: \"star\",\r\n    render: (target, options) => {\r\n        const clip = `url('data:image/svg+xml;utf8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3CclipPath id=\"clipPath\" clipPathUnits=\"objectBoundingBox\"%3E%3Cpolygon points=\".5,0 .8,1 0,.4 1,.4 .2,1\" /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E#clipPath')`;\r\n        target.innerHTML = `<img src=\"${options.file}\" style=\"width:100%;height:100%;position:absolute;top:0;left:0;object-fit:cover;mask-size:contain;\">`;\r\n        target.querySelector('img').style.clipPath = clip;\r\n    }\r\n})\n\n//# sourceURL=webpack://pdf-editor/./modules/image/templates/star.js?\n}");

/***/ }),

/***/ "./modules/richtext/index.js":
/*!***********************************!*\
  !*** ./modules/richtext/index.js ***!
  \***********************************/
/***/ (() => {

eval("{Editor.addModule({\r\n  name: \"text\",\r\n  schema: [\r\n    {\r\n      label: \"content\",\r\n      props: {\r\n        type: \"text\",\r\n      },\r\n\r\n      name: \"content\",\r\n    },\r\n    {\r\n      label: \"Radius\",\r\n      props: {\r\n        type: \"number\",\r\n        min: 0,\r\n        max: 200,\r\n        appendix: \"px\",\r\n      },\r\n\r\n      name: \"radius\",\r\n    },\r\n  ],\r\n  onUnSelect: ({ target, event }) => {},\r\n  onSelect: ({ target, event }) => {\r\n    if (!event.target.closest(\".component-content\")) {\r\n      target.classList.remove(\"editing\");\r\n      return;\r\n    }\r\n\r\n    if (!target.editor) {\r\n      target.editor = richText(target.querySelector(\".component-content\"));\r\n    } else {\r\n      setTimeout(async () => {\r\n        const editor = (await target.editor)[0];\r\n\r\n        editor.focus();\r\n        //editor.execCommand('SelectAll');\r\n      }, 1);\r\n    }\r\n\r\n    target.classList.add(\"editing\");\r\n\r\n    if (target.moveable) {\r\n      target.moveable.destroy();\r\n      target.classList.remove(\"draggable\");\r\n      delete target.moveable;\r\n    }\r\n  },\r\n});\r\n\n\n//# sourceURL=webpack://pdf-editor/./modules/richtext/index.js?\n}");

/***/ }),

/***/ "./modules/richtext/templates/default.js":
/*!***********************************************!*\
  !*** ./modules/richtext/templates/default.js ***!
  \***********************************************/
/***/ (() => {

eval("{Editor.addModuleTemplate(\"text\", {\r\n  name: \"default\",\r\n  render: (target, options) => {\r\n    const radius = options.radius || 0;\r\n\r\n    target.innerHTML = `<div style=\"border-radius: ${radius}px\">${options.content}</div>`;\r\n  },\r\n});\r\n\n\n//# sourceURL=webpack://pdf-editor/./modules/richtext/templates/default.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./modules/richtext/index.js"]();
/******/ 	__webpack_modules__["./modules/richtext/templates/default.js"]();
/******/ 	__webpack_modules__["./modules/image/index.js"]();
/******/ 	__webpack_modules__["./modules/image/templates/star.js"]();
/******/ 	__webpack_modules__["./modules/image/templates/default.js"]();
/******/ 	__webpack_modules__["./modules/gallery/index.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./modules/gallery/templates/default.js"]();
/******/ 	
/******/ })()
;