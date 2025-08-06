 
import { $ } from "../core.js";
import { getModuleConfig, ModuleConfig } from "./module-config.js";


const _Modules = {};

export const renderModule = (target) => {
    const conf = getModuleConfig(target)
    const name = conf.name || "";
 
    if(_Modules[name]) {
        _Modules[name].render(target);
    }
}


export const getModule = (name) => {
    if(_Modules[name]) {
       return _Modules[name] ;
    }
}

export const setModuleConfig = (target, config) => {
       
        let js = target.querySelector("script[type='settings/json']");
        if(!js) {
            js = document.createElement("script");
            js.type = 'settings/json';
            target.appendChild(js);
        } 

        js.textContent = JSON.stringify(config);
    }


export class CreateModule {
    constructor(options = {}) {
        this.options = options;
        this.name = options.name;        
        this.schema = options.schema;   
        _Modules[this.name] = this;

        this.defaults = options.defaults

         
        this.editor = ModuleConfig(this)
    }

    #templates = {};   
    #target = null;

    target(target) {
        if(typeof target === "undefined") {
            return this.#target
        }
        this.#target = target;
    }



    getTemplatesAsOptions() {
        return Object.keys(this.#templates).sort().map(key => {
            const target = $('div', {className: 'template-preview-option'});
            const preview = this.#templates[key](target, this.defaults||{});

 
            return {value: key,  content: target.outerHTML };
        });
    }

 
    addTemplate(name, render) {
       this.#templates[name] = render;
    }

    getConfig(target) {
        return getModuleConfig(target)
    }

    setConfig(target, config) {
       
        return setModuleConfig(target, config)
    }

    applyTemplate(target, name) {
        const conf = this.getConfig(target);
        conf.template = name;
        this.setConfig(target, conf);
        if(target && this.#templates[name]) {
            let htarget = target.querySelector(".component-content");
        if(!htarget) {
            htarget = document.createElement("div");
            htarget.className = "component-content";
            target.appendChild(htarget)
        }
            this.#templates[name](htarget, conf);
        }
    } 

    render(target) {
        const conf = this.getConfig(target);
        if(!conf.template) {
            conf.template = "default";
            this.setConfig(target, conf);
        }
        if(conf.css) {
            target.setAttribute("style", conf.css);
        }
        
        this.applyTemplate(target, conf.template);
    }

    select({target, event}) {
        this.target(target);
      
        if(this.options.onSelect) {
      
            this.options.onSelect({target, event});
        }
    }

    unSelect({target, event}) {
        if(this.options.onUnSelect) {
      
            this.options.onUnSelect({target, event});
        }
    }
    edit({target, event}) {
        this.target(target);
        if(this.options.onEdit) {
      
            this.options.onEdit({target, event});
        }
        const conf = this.getConfig(target);
        this.editor(conf).on('change', val => {
            const res = {}
            val.forEach(o => {
               
                res[o.name] = o.value
            });

            
            this.setConfig(target, res)
            this.render(target)
        })
    }

}