 
import Framework from "./core.js"

const {CreateState, $} = Framework;

        import
         ColorPicker
 
 from "../colorpicker/colorpicker.js";
 


 const file2image = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result)
        }
        reader.readAsDataURL(file);
    });
 }

const DecorateFile = (instance) => {

    const target =  $('div');

    instance.node().after(target);

    instance.on("change", async () => {
        const files  = instance.value;
       
        const res = await Promise.allSettled(Array.from(files).map(file => file2image(file)))
        target.innerHTML = res.filter(p => p.status === "fulfilled").map(p => `<img src="${p.value}">`)
    })

   

}
const DecorateNumber = (instance) => {
    
 
    if(typeof instance.props.min === 'number' && typeof instance.props.max === 'number'  ) {
        const slider = $("input", {id: `node-${Date.now()}`, type: 'range', min: instance.props.min, max: instance.props.max});
        slider.addEventListener("input", () => {
                instance.setValue(slider.value);
        })
        instance.on("change", () => {
            slider.value = parseFloat(instance.value);
        })
        instance.node().after(slider);
        if(instance.props.appendix) {
            const appndx = $('span', {innerHTML: instance.props.appendix, className: $ir.prefix('appendix')});
            instance.node().after(appndx);
        }
        instance.$deepSetValue = (value) => {
 
            const val = parseFloat(value)
                    if( isNaN(val)) {
                        // in case of 'none', 'inherit', etc...
                        slider.value  = 0;
                    }   else {
                        slider.value  = val
                    }
        
            
        }
 
    }

}
const DecorateColor = (instance) => {
        
            instance.colorPicker = new ColorPicker(instance.node(), {
                toggleStyle: 'input',
                submitMode: 'instant', 
                showClearButton: true,
                dismissOnOutsideClick: true,
            });
            instance.colorPicker.setColor(instance.node().value, false)
            instance.colorPicker.on('pick', (color) => {

              
    
                instance.setState(color.toString('hex'))
                // instance.dispatch('change', {name: instance.name, value: color.toString('hex')});
            });
           
        instance.$deepSetValue = (value) => {
             
            instance.colorPicker.setColor(value, false)
        }
             
    
}
const DecorateField = (instance) => {
    const node = instance.node();
    const props = instance.props;

     
    
    for (let i in props) {
 
        node[i] = typeof props[i] === 'function' ? props[i].bind(node) :  props[i];
    }

    setTimeout(() => {
        if(props.type === 'color') {
        
            node.type = 'text';

            DecorateColor(instance)
            
        } else if(props.type === 'number') {
        
    

            DecorateNumber(instance)
            
        } else if(props.type === 'file') {
        
    

            DecorateFile(instance)
            
        }
    }, 2)
}

class InputField extends CreateState{
    constructor(props, validate) {
        super();
        
        this.validate = validate
        this.props = props;
        this.init()
    }
    #field = $("input", {id: `node-${Date.now()}`})

    node() {
        return this.#field
    }
    
    init() {
        
        DecorateField(this)
        this.#field.addEventListener('input', e => {
            const val = this.#field.files || this.#field.value;
            
            if(this.#field.type === 'file') {
                 Promise.allSettled(Array.from(val).map(file => file2image(file))).then((res) => {
                   
                    this.setValue(res.map(o => o.value) )
                 })
            } else {
                this.setValue(val)
            }
           
            
        })
    }

     $deepSetValue () {
             
    }

    setValue(value, trigger = true) {

        if(trigger) {
            this.dispatch('beforeChange', {value})
        }
       
        if(typeof value === "string" || typeof value === "number") {
            if(this.#field.type !== 'file') {
                if(this.#field.type === 'number') {
                    const val = parseFloat(value)
                    if( isNaN(val)) {
                        // in case of 'none', 'inherit', etc...
                        this.#field.value = 0;
                    }   else {
                        this.#field.value = val
                    }
                } else {
                    this.#field.value = value;
                }
                
            }
        }


        this.setState(value, trigger);
       

        this.$deepSetValue(value)
        
        if(this.validate && !this.validate(value)) {
            this.dispatch('invalid')
        } else {
            this.dispatch('valid')
        }
    }

    set value (value) {
        this.setValue(value, true);
        
    }

    get value () {
  
        let val = this.getState();

     
        if(!val && typeof this.props.default !== "undefined") {
            val = this.props.default
        }
        if(this.props.appendix) {
            val += this.props.appendix;
        }
        return val
    }
}

class InputBlock extends CreateState{ 
    constructor(label, props, validate) {
        super();
        this.label = label;
        this.props = props;
        this.validate = validate;
        this.init()
    }

      setValue(value, trigger = true) {
        this.field.setValue(value, trigger);
        if(trigger) {
            this.setState(value);
        }
        
 
    }

    set value (value) {
        this.field.value = value;
 
    }

    get value () {
        return this.field.value;
    }

    init(){
 
        this.field = new InputField(this.props, this.validate);

        const events = ['beforeChange','change'];

        events.forEach(event => {
            this.field.on(event, data => {
                this.dispatch(event, data)
            })
        })

        
        this.field.on('invalid', data => {
            this.dispatch("invalid", data)
        })
        this.field.on('valid', data => {
            this.dispatch("valid", data)
        })
        this.label = $('label', {content: document.createTextNode(this.label), for: this.field.node().id})
        this.block = $('div', {
            "className": `g-input-block g-input-block-type-${this.props.type}`,
            content: [
                this.label,
                this.field.node()
            ]
        })

        if(this.props.type === 'hidden') {
            this.block.style.display = 'none'
        }
    }
}

class PreviewSelect extends CreateState{ 
    constructor(label, options = []) {
        super();
        this.label = label; 
        this.options = options      
        this.init()
    }

    options2HTML() {
        return this.options.map(option => `<div data-value="${option.value}">${option.content}</div>`);
    }

    setValue(value, trigger = true) {

        if(trigger) {
            this.dispatch('beforeChange', {value: value})
        }
         
        
        this.setState(value, trigger);
        
        this.setUIValue(value);
 
    }


    setUIValue(value) {
        this.valueNode.innerHTML = this.options.find(option => option.value === value).content;
    }
 

    set value (value) {
        this.setValue(value, true);
       
        
 
    }

    get value () {
        return this.getState();
    }

    init(){

        this.label = $('label', {content: document.createTextNode(this.label)})
        this.select = $('div', {
            className: $ir.prefix('select'),
            content: [
                 {className: $ir.prefix`select-value`},
                 {className: $ir.prefix`select-content`, innerHTML: this.options2HTML().join("")},
            ]
            
        });

        this.valueNode = this.select.querySelector(`.${$ir.prefix`select-value`}`)

        this.select.addEventListener("click", e => {
            const target = e.target.closest('[data-value]');
            if(target) {
                this.value = target.dataset.value
            }
            this.select.classList.toggle('active')
        });
        this.block = $('div', {
            "className": "g-input-block",
            content: [
                this.label,
                this.select
            ]
        });


        if(!$ir.__previewSelect) {
            $ir.__previewSelect = true;
            document.body.addEventListener('click', e => {
                const target = e.target.closest('.ir-select');
                if(!target) {
                    document.querySelectorAll(".ir-select.active").forEach(node => node.classList.remove("active"));
                }
            });
        }

         
    }
}

export  const fields = [
    { label: 'Rotate', props: { min: 0, max: 360, type: 'number', appendix: 'deg' }, name: 'rotate',  },
    { label: 'Top', props: { min: 0, max: 2000, type: 'number', appendix: 'px' }, name: 'top',  },
    { label: 'Left', props: { min: 0, max: 2000, type: 'number', appendix: 'px' }, name: 'left',  },
    { label: 'Width', props: { min: 20, max: 2000, type: 'number', appendix: 'px' }, name: 'width' },
    { label: 'Height', props: { min: 20, max: 2000, type: 'number', appendix: 'px' }, name: 'height'},
    { label: 'Padding', props: { min: 0, max: 200, type: 'number', appendix: 'px' }, name: 'padding', prop: 'padding'},
 
    { label: 'Background', props: { type: 'color' }, name: 'backgroundColor' },
 
]


 
 
export class GUIEditor extends CreateState {
    constructor(options) {
        super()
        this.target = options.target
        this.schema = options.schema || [];
        this.build()
    }

    #pausedChange = false;

    buildBlock(obj) {
        let block;
        if(obj.type === "previewSelect") {
            block = new PreviewSelect(obj.label, obj.options);

 

        } else {
            block = new InputBlock(obj.label, obj.props, obj.validate);
        }

        return block;
    }
    build() {
        this.fields = this.schema.map(obj => {

            let block = this.buildBlock(obj)
            
            block.name = obj.name;
            block.prop = obj.prop;
            if(this.target) {
                this.target.append(block.block);
            }
            block.on('change', () => {
                this.dispatch('change', this.value)
            });
            block.on('beforeChange', (data) => {
                this.dispatch('beforeChange', {block, value: this.value})
            })
            return block
        })
    }

    get value () {
        return this.fields.filter(o => !!o.value).map(o => ({name: o.prop || o.name, value: o.value}));
    }
    getByName(name) {
        return this.fields.find(f => f.name === name);
    }

    changePaused(val) {
        if(typeof val === "undefined") {
            return this.#pausedChange;
        }   
        this.#pausedChange = val === true;
    }


    setValue(value, trigger = true) {
 
        if(!trigger) {
            this.changePaused(true);
        }
        this.value = value;
        if(!trigger) {
            this.changePaused(false);
        }
    }

    set value (value) {
        const changePaused = this.changePaused();
        if(Array.isArray(value)) {
            value.forEach(o => {
                const field = this.getByName(o.name);
                if(field) {
                    field.setValue(o.value, !changePaused)
                }
            })
        } else {
            for (let i in value) {
                const field = this.getByName(i)
                if(field) {
               
                    field.setValue(value[i], !changePaused)
                }
            }
        }
        
    }


}