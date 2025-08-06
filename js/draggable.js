export const initDraggable = (instance, mode = 'resize') => {

     const conf = {
        resizable: false,
        warpable: false,
        keepRatio: false,
        scalable: false,
        rotatable: false,
     }

     if(mode === 'resize') {
        conf.resizable = true;
     }

 


                 document.querySelectorAll(".component:not(.draggable)").forEach(node => {
                     node.classList.add('draggable');

                     if(!node.dataset.id) {
                        node.dataset.id = instance.id();
                     }

                     let moveable;


                     const section = node.closest('.section');
                     const snapDirections = {
                         "top": true,
                         "left": true,
                         "bottom": true,
                         "right": true,
                         "center": true,
                         "middle": true
                     };
                     const elementSnapDirections = {
                         "top": true,
                         "left": true,
                         "bottom": true,
                         "right": true,
                         "center": true,
                         "middle": true
                     };
                     moveable = new Moveable(document.body, {
                         target: node,
                         // If the container is null, the position is fixed. (default: parentElement(document.body))
                         container: section,
                         draggable: true,
                        ...conf,
                         
                         // Enabling pinchable lets you use events that
                         // can be used in draggable, resizable, scalable, and rotateable.
                         pinchable: true, // ["resizable", "scalable", "rotatable"]
                         pinchable: ["resizable", "scalable", ],
                         origin: true,

                         // Resize, Scale Events at edges.
                         edge: false,
                         throttleDrag: 0,
                         throttleResize: 0,
                         throttleScale: 0,
                         throttleRotate: 0,
                         // dragTarget: node.querySelector(".drag-area"),
                         renderDirections: ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
                         snappable: true,
                         snapDirections: snapDirections,
                         elementSnapDirections: elementSnapDirections,
                         elementGuidelines: [".component", ".section-content"]
                     });






                     node.moveable = moveable

                     node
                     .parentElement
                     .parentElement
                     .append(moveable.selfElement)

                     /* draggable */
                     moveable.on("dragStart", ({
                         target,
                         clientX,
                         clientY
                     }) => {

                        

                         target.classList.add($ir.prefix('dragging'));
                         document.body.classList.add($ir.prefix('dragging'));


                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',

                         }, true)

                     }).on("drag", ({
                         target,
                         transform,
                         left,
                         top,
                         right,
                         bottom,
                         beforeDelta,
                         beforeDist,
                         delta,
                         dist,
                         clientX,
                         clientY,
                     }) => {

                         target.style.left = `${Math.round(left)}px`;
                         target.style.top = `${Math.round(top)}px`;

                        

                         instance.sync()

                         // console.log("onDrag translate", dist);
                         // target.style.transform = transform;
                     }).on("dragEnd", ({
                         target,
                         isDrag,
                         clientX,
                         clientY
                     }) => {

                         target.classList.remove($ir.prefix('dragging'));
                         document.body.classList.remove($ir.prefix('dragging'));
                         $ir.componentHandle.position();
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                     });

                     /* resizable */
                     moveable.on("resizeStart", ({
                         target,
                         clientX,
                         clientY
                     }) => {
                         target.classList.add($ir.prefix('resizing'));
                         document.body.classList.add($ir.prefix('resizing'));
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                      
                     }).on("resize", ({
                         target,
                         width,
                         height,
                         dist,
                         delta,
                         clientX,
                         clientY,
                         drag
                     }) => {




                         if (delta[0]) {
                             target.style.width = `${Math.floor(width)}px`;


                         }
                         if (delta[1]) {
                             target.style.height = `${Math.floor(height)}px`;

                         }





                         //target.style.transform = drag.transform;
                         target.style.top = Math.floor(drag.top) + 'px';
                         target.style.left = Math.floor(drag.left) + 'px';

                         

                         instance.sync()
                     }).on("resizeEnd", ({
                         target,
                         isDrag,
                         clientX,
                         clientY
                     }) => {
                         target.classList.remove($ir.prefix('resizing'));
                         document.body.classList.remove($ir.prefix('resizing'));
                         $ir.componentHandle.position();
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                    

                     });

                     /* scalable */
                     moveable.on("scaleStart", ({
                         target,
                         clientX,
                         clientY
                     }) => {
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                     }).on("scale", ({
                         target,
                         scale,
                         dist,
                         delta,
                         transform,
                         clientX,
                         clientY,
                     }) => {
                         console.log("onScale scale", scale);
                         target.style.transform = transform;
                         instance.sync()
                     }).on("scaleEnd", ({
                         target,
                         isDrag,
                         clientX,
                         clientY
                     }) => {
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                     });

                     /* rotatable */
                     moveable.on("rotateStart", ({
                         target,
                         clientX,
                         clientY
                     }) => {
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                     }).on("rotate", ({
                         target,
                         beforeDelta,
                         delta,
                         dist,
                         transform,
                         clientX,
                         clientY
                     }) => {
                         console.log("onRotate", dist);
                         target.style.transform = transform;
                         instance.sync()
                     }).on("rotateEnd", ({
                         target,
                         isDrag,
                         clientX,
                         clientY
                     }) => {
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                     });

                     /* warpable */
                     let matrix = [
                         1, 0, 0, 0,
                         0, 1, 0, 0,
                         0, 0, 1, 0,
                         0, 0, 0, 1,
                     ];
                     moveable.on("warpStart", ({
                         target,
                         clientX,
                         clientY
                     }) => {
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                     }).on("warp", ({
                         target,
                         clientX,
                         clientY,
                         delta,
                         dist,
                         multiply,
                         transform,
                     }) => {
                         console.log("onWarp", target);
                         // target.style.transform = transform;
                         matrix = multiply(matrix, delta);
                         target.style.transform = `matrix3d(${matrix.join(",")})`;
                         instance.sync()
                     }).on("warpEnd", ({
                         target,
                         isDrag,
                         clientX,
                         clientY
                     }) => {
                         instance.stateManager.record({
                            id: target.dataset.id,
                            value: target.getAttribute('style'),
                            type:'css',
                         }, true);
                     });

                     /* pinchable */
                     // Enabling pinchable lets you use events that
                     // can be used in draggable, resizable, scalable, and rotateable.
                     moveable.on("pinchStart", ({
                         target,
                         clientX,
                         clientY
                     }) => {
                         // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
                         console.log("onPinchStart");
                     }).on("pinch", ({
                         target,
                         clientX,
                         clientY,
                         datas
                     }) => {
                         // pinch event occur before drag, rotate, scale, resize
                         console.log("onPinch");
                         instance.sync()
                     }).on("pinchEnd", ({
                         isDrag,
                         target,
                         clientX,
                         clientY,
                         datas
                     }) => {
                         // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                         console.log("onPinchEnd");
                     });



                 })

             }
