 

import { icon } from "../colorpicker/icons.js";
import { $, CreateBase} from "./core.js"
import { getModuleConfig, getOwnerId, saveModuleStyle } from "./module/module-config.js";
import { CreateModule, getModule, renderModule } from "./module/module.js";
 
 
 




const textModule = new CreateModule({
    name: 'text',
    schema:   [ 
 

        {
            label: 'content',
            props: {
        
                type: 'text',

            },
            
            name: 'content',
        },
        {
            label: 'Radius',
            props: {
        
                type: 'number',
                min: 0,
                max: 200,
                appendix: 'px',
            },
            
            name: 'radius',
        },
    ],
    onUnSelect: ({target, event}) => {
        
    },
    onSelect: ({target, event}) => {

 console.log(target, event)

      if(!event.target.closest('.component-content')) {
        target.classList.remove("editing");
        return;
      }
 
         if ( !target.editor) {
            target.editor = tinymce.init({
                target: target.querySelector('.component-content'),
                menubar: false,
                inline: true,
                icons: 'thin',
                plugins: 'image lists code table codesample',
                toolbar: 'blocks | forecolor backcolor | bold italic underline strikethrough | link blockquote codesample | align bullist numlist ',
                height: 400,
                content_style: 'body { margin: 0%; }',
                setup: (editor) => {
                    editor.on('init', (e) => {
                        setTimeout(() => {
                            editor.focus();
                            //editor.execCommand('SelectAll');
                        }, 1)
                    });
                }
            });
        } else {
     
            setTimeout(async () => {
                const editor = (await target.editor)[0];
           
                    editor.focus();
                    //editor.execCommand('SelectAll');
                }, 1 )
        }
        target.classList.add("editing");

        if(target.moveable) {
target.moveable.destroy()
                    target.classList.remove('draggable')
                    delete target.moveable
        }

                
    },

     
});

textModule.addTemplate("default", (target, options) => {

    

    const radius = options.radius || 0;

    
 
    target.innerHTML = `<div style="border-radius: ${radius}px">${options.content}</div>`;
});


const gallery = new CreateModule({
    name: 'gallery',
    schema:   [ 
 
 
             {
                 label: 'Images',
                 props: {
                     accept: 'image/*',
                     type: 'file',
                     multiple: true

                 },
                 name: 'files',
             },
             {
                 label: 'Number of columns',
                 props: {
                
                     type: 'number',
                     min: 1,
                     max: 10,
 
                 },
                 
                 name: 'columns',
             },
              {
                 label: 'Gap',
                 props: {
                
                     type: 'number',
                     min: 0,
                     max: 50,
                     appendix: 'px',
                     default: 0
                 },
                 
                 name: 'gap',
             },
         ],
    defaults: {
                                    gap: 0,
                                    "files": [
                                        "https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg",
                                        "https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg",
                                        "https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg"
                                        
                                    ] 
                                }
});

gallery.addTemplate("default", (target, options) => {

    

    const gap = parseFloat( options.gap || 0);
    const columns = Number(options.columns || 1);

    

    target.innerHTML = `<div style="display:flex;flex-wrap: wrap;overflow:hidden;gap: ${gap}px;justify-content:space-between;position: absolute; inset: 0;">${(options.files || []).map(f => `<div  style="width:calc(${100/columns}% - ${gap}px)"><img style="width:100%;height: 100%;object-fit:cover;" src="${f}"></div>`).join('')}</div>`;
});

 




addEventListener("load", () => {

    document.querySelectorAll(".component").forEach(el => {
        renderModule(el)
    })


     $ir.componentHandle.on('selectStart', (data) => {
        
        const conf = getModuleConfig(data.target)
            const name = conf.name || "";
            getModule(name).edit(data);
            
 
     });

      $ir.componentHandle.on('select', (data) => {
    
        
        const conf = getModuleConfig(data.target);
            const name = conf.name || "";
            getModule(name).select(data);
            
 
     })

})
 



const moduleContextMenu = (data) => {
    const ul = $('ul');

    data.forEach(el => {
        ul.append(moduleMenuItem(el));
    })
    return ul
}
const moduleContextMenuItem = (item) => {
    
    const li = $('li', {
        dataset: {action: item.action},
 
    })
    
    li.innerHTML = `
        <span>${item.icon}</span>
        ${item.label ? `<span>${item.label}</span>` : ``}
    `

    if(item.content) {
        li.appendChild(moduleContextMenu(item.content))
    }
    return li;
}

const defaultMenu = [
    { $hook: 'prepend'  },
    { action: 'clone', icon: icon('clone'), label: 'Duplicate' },
    { $hook: 'append'  },
    { action: 'delete', icon: icon('delete'), label: 'Delete' },
    {  
        icon: icon('more'),
        content: [
             { $hook: 'prependSubmenu'  },
             { action: 'copy', icon: icon('copy'), label: 'Copy' },
             { action: 'copyStyle', icon: icon('copyStyle'), label: 'Copy Style' },
             { action: 'paste', icon: icon('paste'), label: 'paste' },
             { action: 'clone', icon: icon('clone'), label: 'clone' },
             { $hook: 'appendSubmenu'  },
        ]
    },
 
];


const moduleMenu = (node) => {

    const defaultMenu = `<ul><li data-action="clone">
            <span>${icon('clone')}</span>
            <span>Duplicate</span>
        </li>
        <li data-action="delete">
            <span>${icon('delete')}</span>
            <span>Delete</span>
        </li>
        <li>
            <span>${icon('more')}</span>
            <ul>
                <li data-action="copy">
                     <span>${icon('copy')}</span>
                     <span>Copy</span>
                </li>
                <li data-action="copyStyle">
                     <span>${icon('copyStyle')}</span>
                     <span>Copy style</span>
                </li>
                <li data-action="paste">
                     <span>${icon('paste')}</span>
                     <span>Paste</span>
                </li>
                <li data-action="clone">
                    <span>${icon('clone')}</span>
                    <span>Duplicate</span>
                </li>
                
            </ul>
        </li></ul>`;

        const isText = node.type === "text";

        const conf = getModuleConfig(node);
        
   
const edit =  `
    <ul>
        <li data-action="edit">
            <span>${icon('edit')}</span>
            <span>edit</span>
        </li>

    </ul>
`;
return defaultMenu

};
 
class Handle extends CreateBase {

    constructor(options = {}) {
        super();
        document.body.appendChild(this.#root);
        this.#root.addEventListener('click',e  => {
            const target = e.target.closest('[data-action]');
            if(target) {
                this.dispatch(target.dataset.action, this.target())
            }
        })
    }

    #target = null;
    #root = $("div", {
        className: `handle`,
    });

    #visible = false;

    menu() {
        this.#root.innerHTML = moduleMenu(this.target());

        this.#root.querySelectorAll('li').forEach(node => {
            const ul = Array.from(node.children).find(n => n.nodeName === 'UL');
            if(ul) {
 
                node.addEventListener("click",e => {
                    node.classList.toggle('active')
                })
            }
        })
        
    }

    position() {
        if(!this.target()) {
            return
        }
        const off = this.target().getBoundingClientRect();
        const oTop = off.top + scrollY - 50;
        const oleft = off.left + scrollX - 0;
        this.#root.style.top = oTop + "px";
        this.#root.style.left = oleft + "px";
    }

    show() {
        this.#visible = true;
        this.#root.classList.add('active');
        this.dispatch('show')
    }
    hide() {
        this.#visible = false;
        this.#root.classList.remove('active')
        this.dispatch('hide')
    }

    toggle() {
        this.#visible ? this.hide() : this.show();
    }

    target(node) {

        if(typeof node === "undefined") {
            return this.#target;
        }

        this.#target = node;
        if(this.#target) {
            this.menu();
            this.position();
            this.show()
        } else     {
            this.hide()
        }
        

    }

}


export const createModule = (options, css, id) => {
    if(typeof options !== "string") {
        options = JSON.stringify(options);
    }
    const component = $({
        className: 'component', 
        content: [
            {tag: 'script', textContent: options, type: 'settings/json'},
            {className: 'component-content'}
        ]
    });
    if(css) {
        component.setAttribute('style', css);
    }
     if(id) {
        component.dataset.id = id;
    }
    return component;
}

 

const TargetMethods = {
    clone: target => {
        const css = target.getAttribute('style');
        const conf = getModuleConfig(target);

        const newModule = createModule(conf, css);

        target.after(newModule);

        const compStyle = getComputedStyle(newModule);

        let cTop = compStyle.top;
        let cLeft = compStyle.left;

 

        cTop = parseFloat(cTop);
        cLeft = parseFloat(cLeft);

        if(!isNaN(cTop)) {
            newModule.style.top = (cTop + 20) + 'px';
        }
        if(!isNaN(cLeft)) {
            newModule.style.left = (cLeft + 20) + 'px';
        }
        return newModule;

    }
}

export const ModulesInit = (instance) => {
   
        const handle = new Handle();

        $ir.componentHandle = handle;

        $ir.componentHandle.on('clone', target => {
            renderModule(TargetMethods.clone(target))
        })

        $ir.componentHandle.on('delete', target => {

            saveModuleStyle(target)

            instance.stateManager.record({
                type: 'deletion',
                id: target.dataset.id,
                value: getModuleConfig(target),     
                layout: getOwnerId(target)               
            });

            target.moveable.destroy();
            target.remove();
            instance.activeNode(null)
            handle.target(null)
        })

        const mdHandle = (e) => {
            const target = e.target.closest('.component');
            const isSystem = $ir.isSystem(e);;
            if(!target && isSystem) {
                
            } else {
                handle.target(target)
            }
            
            
        }
        
        document.body.addEventListener('mousedown', mdHandle) 
        document.body.addEventListener('touchstart', mdHandle) 


 
}

 