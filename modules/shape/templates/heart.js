Editor.addModuleTemplate("shape", {
  name: "heart",
  render: (target, options) => {
    const radius = options.radius || 0;
    target.innerHTML = `<div class="shape" style=" border-radius: ${radius}"></div>`;
  },
  css: `
$root .shape {
 
    background: red;
    background: var(--backgroundColor);
    transform: rotate(-135deg);
    position: relative;
   
}

$root .shape::before, 
$root .shape::after {
    content: "";
    height: var(--width);
    width: var(--width);
    background: red;
    background: var(--backgroundColor);
    border-radius: 50%;
    position: absolute;
}

$root .shape::before {
    top: calc(var(--width) / 2);
    left: 0px;
}

$root .shape::after {
    left: calc(var(--width) / 2);
    top: 0px;
}
        $root .shape {
            width: 100%;
            height: 100%;
        
            position:absolute;
            top:0;
            left:0;
            
 
        }
    `,
});
