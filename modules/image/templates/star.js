Editor.addModuleTemplate('image', {
    name: "star",
    render: (target, options) => {
        const clip = `url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3CclipPath id="clipPath" clipPathUnits="objectBoundingBox"%3E%3Cpolygon points=".5,0 .8,1 0,.4 1,.4 .2,1" /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E#clipPath')`;
        target.innerHTML = `<img src="${options.file}" style="width:100%;height:100%;position:absolute;top:0;left:0;object-fit:cover;mask-size:contain;">`;
        target.querySelector('img').style.clipPath = clip;
    }
})