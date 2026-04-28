Editor.addModuleTemplate("text", {
  name: "default",
  render: (target, options) => {
    const radius = options.radius || 0;
    const verticalAlign = options.verticalAlign || "center";

    target.innerHTML = `<div class="wysiwyg-content">${options.content}</div>`;
    target.style.borderRadius = `${radius}`;
    target.style.alignItems = verticalAlign;
  },
  css: `
 
    $root .wysiwyg-content{
      width: 100%;
    }
    $root {
    --gap: 15px;
      margin: var( --gap);
      display: flex;
    
          min-height: calc(100% - (2 * var( --gap)));
          min-width: calc(100% - (2 * var( --gap)));
    
 
     
      align-items: center;
      
    }
    $component .component-content li{
      margin: 0 0 0 1em;
    }

    $component:not(.editing) .component-content {
  cursor: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%23111111'%3E%3Cpath d='m490-527 37 37 217-217-37-37-217 217ZM200-200h37l233-233-37-37-233 233v37Zm355-205L405-555l167-167-29-29-219 219-56-56 218-219q24-24 56.5-24t56.5 24l29 29 50-50q12-12 28.5-12t28.5 12l93 93q12 12 12 28.5T828-678L555-405ZM270-120H120v-150l285-285 150 150-285 285Z'/%3E%3C/svg%3E")
      4 12,
    text;
}

 
 
  `,
});
