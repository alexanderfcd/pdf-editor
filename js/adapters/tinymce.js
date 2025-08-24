import { RichTextAdapter } from "../core.js";

export class TinyMCE extends RichTextAdapter {
  constructor(target) {
    super();
    this.target = target;
    this.#build();
  }

  #editor = null;
  #building = false;

  async get() {
    return await this.#build();
  }

  async #build() {
    return new Promise((resolve) => {
      if (!this.#editor) {
        this.#building = true;
        tinymce.init({
          license_key: "gpl",
          target: this.target,
          license: false,
          menubar: false,
          inline: true,
          icons: "default",
          plugins: "image lists code table codesample",
          toolbar:
            "blocks | forecolor backcolor | bold italic underline strikethrough | link blockquote codesample | align bullist numlist ",
          height: 400,
          content_style: "body { margin: 0%; }",
          setup: (editor) => {
            editor.on("init", (e) => {
              setTimeout(() => {
                editor.focus();
                this.#editor = editor;
                this.#building = false;
                resolve(this);
              }, 1);
            });
          },
        });
      } else {
        resolve(this);
      }
    });
  }

  async focus() {
    if (!this.#building) {
      (await this.get()).#editor.focus();
    }
  }
}
