import { $$ } from "./core.js";
import { icon } from "./icons.js";


export const Toolbar = (instance) => {
    instance.toolbar = $$(`
       <div class="ir-toolbar-container">
             <div class="ir-toolbar">

                 <div>
                    <nav class="ir-btn-menu">
                        <button class="ir-btn ir-btn-outline" data-ref="undo">${icon('undo')}</button>
                        <button class="ir-btn ir-btn-outline" data-ref="redo">${icon('redo')}</button>
                    </nav>
                 </div>
                 <div>
                 <nav class="ir-btn-menu">
                     <button class="ir-btn ir-btn-outline"  data-ref="fit">fit</button>
                    

                     <div class="g-input-block " style="width: 200px;">




                         <label>Zoom</label>

                         <div data-ref="scaleInfo"></div>

                         <input type="range" min="0.2" max="3" step="0.1"  data-ref="scale" value="1" list="markers">

                         <datalist id="markers">
                             <option value="0.5" label="50%"></option>

                             <option value="1" label="100%"></option>
                             <option value="2" label="200%"></option>
                             <option value="3"></option>
                         </datalist>
                     </div>
                     </nav>
                 </div>


  



             </div>
         </div> 
    `);


    instance.toolbar.undo.addEventListener('click', () => {
        instance.stateManager.undo()
    })
    instance.toolbar.redo.addEventListener('click', () => {
        instance.stateManager.redo()
    })

    instance.toolbar.fit.addEventListener('click', () => {
        instance.scale.fit()
    })
    instance.toolbar.scale.addEventListener('input', (e) => {
        instance.scale.scale(e.target.value)
    });

    instance.scale.on('change', data => {
        instance.toolbar.scaleInfo.textContent = `${data.percent}%`
    });

    instance.stateManager.state.on('change', data => {

       
        
         instance.toolbar.undo.disabled = data.hasPrev
         instance.toolbar.redo.disabled = data.hasNext
    })

    instance.toolbar.undo.disabled = !instance.stateManager.state.hasPrev
    instance.toolbar.redo.disabled = !instance.stateManager.state.hasNext
    

    instance.stateManager.state.on('record', data => {
        console.log(data)
        
         instance.toolbar.undo.disabled = data[0].hasPrev
         instance.toolbar.redo.disabled = data[0].hasNext
    })
    
    return instance.toolbar;
    
}