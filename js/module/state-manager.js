import { CreateBase } from "../core.js";
import { createModule } from "../modules.js";
import { State } from "../state.js";
import { renderModule, setModuleConfig } from "./module.js";


/* 
    State types

    elements and layouts must have id

 
    {
        id: "settings",
        type: "settings",
        value: {"name":"image","template":"default","file":"..."}
    }

    {
        type: "restore"
        value: {"name":"image","template":"default","file":"..."},
        layoutIndex: 0
    }

    {
        type: "layoutRestore"
        value: [{"name":"image","template":"default","file":"..."}, {....}],
        index: 0
    }

    {
        type: "layoutsPosition"
        value: ['some-id', 'some-other-id'],
        index: 0
    }

*/


const stateTypes = {
    settings: (data, instance) => {
        const {value, id} = data;
        const node = document.querySelector('[data-id="'+id+'"]');

 
        if(node) {
            setModuleConfig(node, value);
            renderModule(node);
        }
    },
    css: (data, instance) => {
        const {value, id} = data;
        const node = document.querySelector('[data-id="'+id+'"]');
        if(node) {
            node.setAttribute('style', value);
            instance.sync(node);
        }
    },
    deletion: (data, instance) => {
        const {value, idm, layout} = data;
        const layoutnode = document.querySelector('[data-id="'+layout+'"]');

 
        if(layoutnode) {
            const restored = createModule(value);
            restored.dataset.id = idm
            layoutnode.querySelector('.section-content').appendChild(restored);
            renderModule(restored)
        }
    },
}

export class StateManager extends CreateBase {
    constructor(instance) {
        super();
        this.state = new State();
        this.state.on('change', data => {
            console.log(data);
            if(data.active && stateTypes[data.active.type]) {
                stateTypes[data.active.type](data.active, instance);
                if(instance.activeNode() && instance.activeNode().moveable) {
                    instance.activeNode().moveable.updateRect();
                }
            }
        });
    }

    #timer = null;

    record(data, immediate = false){
        if(immediate){
            this.state.record(data);
            return;
        }
        clearTimeout(this.#timer);
        this.#timer = setTimeout(()=> this.state.record(data), 200);
    }

    undo() {
        this.state.undo();
    }
    redo() {
        this.state.redo();
    }
}