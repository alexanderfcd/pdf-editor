
/*


;(async function(){

    const [data, error] = await useAwait(new Promise((resolve, reject) => resolve(1)));

    console.log(data, error);

    const [data2, error2] = await useAwait(new Promise((resolve, reject) => reject(2)));

    console.log(data2, error2);

})();

*/

   export const $ = function (tag, props) {

        if(!!tag.nodeType) {
            return tag;
        }

        if (typeof tag === 'object') {
            props = tag;
            tag = props.tag || 'div';
        }
        if (!props) {
            props = {};
        }
        delete props.tag;
        if (!tag) {
            tag = 'div';
        }
        if(tag === 'button' && !props.type) {
            props.type = 'button';
        }
        var node = document.createElement(tag);
        if (props.css) {
            for (var css in props.css) {
                if(props.css.hasOwnProperty(css)) {
                    node.style[css] = props.css[css];
                }
            }
            delete props.css
        }
        if (props.dataset) {
            for (var dataset in props.dataset) {
                if(props.dataset.hasOwnProperty(dataset)) {
                    node.dataset[dataset] = props.dataset[dataset];
                }
            }
            delete props.css
        }
        if (props.content) {
            if( Array.isArray(props.content) ) {
                var c = 0, l = props.content.length;
                for( ; c < l; c++) {
                    node.append($(props.content[c]));
                }
            } else {
                node.append($(props.content));
            }
            delete props.content
        }
        for (var i in props) {
            if(props.hasOwnProperty(i)) {
                node[i] = props[i];
            }
        }
        return node;
    }
 


const useAwait = p => p.then(data => [ data, null ]).catch(err => [ null, err ]);

const _fetch = async (url, options) => {
    return new Promise(async (resolve, reject) => {
        const [response, error] = await useAwait(fetch(url, options));
        if(error) {
            reject(error);
        } else {
            resolve(response)  
        }
        
    });

}

const fetchJSON = async (url, options) => {
    return new Promise(async (resolve, reject) => {
        const [response, error] = await useAwait(fetch(url, options));
        if(error) {
            reject(error);
        }
        const [json, err] = await useAwait(response.json());
        if(err) {
            reject(err);
        }  
        resolve(json)
    });

}

const fetchText = async (url, options) => {
    return new Promise(async (resolve, reject) => {
        const [response, error] = await useAwait(fetch(url, options));
        if(error) {
            reject(error);
        }
        const [json, err] = await useAwait(response.text());
        if(err) {
            reject(err);
        }  
        resolve(json)
    });

}

const useFetch = async (url, options) => await useAwait(_fetch(url, options));
const useFetchJSON = async (url, options) => await useAwait(fetchJSON(url, options));
const useFetchText = async (url, options) => await useAwait(fetchText(url, options));

const totalFetch = (url, options) => {
    let _status = 'pending';

    const status = () => {
        return _status;
    }

    const controller = new AbortController();
    options.signal = controller.signal;
    const req = _fetch(url, options);
    const res = useAwait(req);

    return {
        abort: controller.abort,
        promise: () => {
            return res;
        },
        status,
    }
}


export class CreateBase {
    #events = {};
    on(eventName, func) {
        this.#events[eventName] ? this.#events[eventName].push(func) : (this.#events[eventName] = [func]);
        return this;
    };
    off(eventName, func) {
        if(!this.#events[eventName]) {
            return this;
        }
        if(typeof func === 'function') {
            const index = this.#events[eventName].indexOf(func);
            if(index === -1) {
                return this;
            }
            this.#events[eventName].splice(index, 1);
        } else {
            this.#events[eventName] = [];
        }
        return this;
    };

    reset() {
        this.#events = {};
        return this;
    }

    dispatch (eventName, data) {
       
        this.#events[eventName] ? this.#events[eventName].forEach((func) => {
            func.call(this, data);
        }) : '';
        return this;
    };
}

export class CreateState extends CreateBase {
    constructor(initial) {
        super();
        this.setState(initial);
    }

    #state;
    #id = `${Date.now()}`;

    getState() {
        return this.#state;
    }

    id() {
        return this.#id;
    }

    setState(state, dispatch = true) {
   
        this.#state = state;
        if (dispatch) {
            this.dispatch('change', this.getState());
        }
        
    }
}





 





export default {
    useAwait,
    useFetch,
    useFetchText,
    useFetchJSON,
   
    totalFetch,
    CreateState,
 
    $,
}