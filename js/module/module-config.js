 
import { CDialog } from "../dialog.js";
import { GUIEditor } from "../guicss.js";
import { setModuleConfig } from "./module.js";

export const ModuleConfig = (instance) => {
    const {schema} = instance;

 

    schema.unshift({
        props: {type: 'hidden'},
        name: 'name',
    });


 
    

    setTimeout(() => {
        const templates = instance.getTemplatesAsOptions();
        if (templates.length > 1) {
            schema.unshift({
                label: "Template",
                options:  templates,
                type: 'previewSelect',
                name: 'template',
            })
        } else {
            schema.unshift({
                 props: {type: 'hidden'},
                name: 'template',
            })
        }
        
    })

    if(!globalThis.__moduleConfig) {
 
        const conf =  {
            dialog: new CDialog()
        }
 
        globalThis.__moduleConfig = conf; 
         
    }

    const conf = globalThis.__moduleConfig;
 

   const open = (value) => {
        conf.dialog.html('');
 
        const editor = new GUIEditor({
            target: conf.dialog.node,
            schema
        });

        conf.dialog.title(value.name);
        editor.setValue(value, false);

        let _changed = 0;
        
        editor.on('beforeChange', data => {
 
            if(_changed === 0) {
                  
                instance.root.stateManager.record({
                    type: 'settings',
                    value: getModuleConfig(instance.target()    ),
                    id: instance.target().dataset.id
                }, true)
            }
            console.log(instance.root.stateManager)
        })
        editor.on('change', data => {
             
            _changed++;

             const rec = {};

             data.forEach(element => {
                rec[element.name] = element.value;  
             });

             

            instance.root.stateManager.record({
                type: 'settings',
                value: rec,
                id: instance.target().dataset.id
            })


        });
        
        conf.dialog.open();
        return editor
   };

   return open;
 
}


export const getOwner = (target) => {
    return target.closest('.section')
}

export const getOwnerId = (target) => {
    return getOwner(target).dataset.id;
}

export const saveModuleStyle = (target) => {
    const conf = getModuleConfig(target);
    const css = target.getAttribute('style');
    conf.css = css;

    setModuleConfig(target, conf);
}


export const getModuleConfig = (target) => {
 
    const js = target.querySelector("script[type='settings/json']");

    if(!js) {
        return {}
    } else {
        try {
            target.$cache = JSON.parse(js.textContent.trim())
            return target.$cache;
        } catch (e) {
            console.log(e)
            return {}
        }
    }
}

$ir.getModuleConfig = getModuleConfig;