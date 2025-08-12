import { CreateBase } from "./core.js";

export class Dialog {
            constructor(options) {
                this.config(options);
                this.mode = options.mode || 'modal'
                this.init();
            }

            title(title) {
                 this.header.querySelector('.dialog-title').innerHTML = title;
            }

            create() {
                this.root = document.createElement('div');
                const mode = this.mode.split('-');
                let pos = 'end';
                if(mode[1]) {
                    pos = mode[1];
                }
                this.root.className = `dialog dialog-${mode[0]} dialog-${pos}`;

                this.header = document.createElement('div');
                this.header.className = 'dialog-header';
                this.header.innerHTML = `<span class="dialog-title">${this.settings.title || ''}</span>`;

                const closeButton = document.createElement('span');
                closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
                closeButton.className = 'dialog-close';
                closeButton.addEventListener('click', e => {
                    e.preventDefault();
                    this[this.settings.closeAction]();
                })

                this.header.appendChild(closeButton);

                this.content = document.createElement('div');
                this.content.className = 'dialog-content';
                this.content.innerHTML = this.settings.content;
                this.content.style.width = this.settings.width;


                this.footer = document.createElement('div');
                this.footer.className = 'dialog-footer';
                 
                

                this.overlay = document.createElement('div');
                this.overlay.className = 'dialog-overlay';

                if(!!this.settings.header ) {
                    this.root.appendChild(this.header);
                    this.root.classList.add('has-header');
                }

                this.root.appendChild(this.content);
                
                if(!!this.settings.footer ) {
                    this.root.appendChild(this.footer);
                    this.root.classList.add('has-footer');
                }

                if(this.settings.overlay !== false ) {
                    document.body.appendChild(this.overlay);
                }

                
                document.body.appendChild(this.root);

            }

            remove() {
                this.root.remove();
                this.overlay.remove();
            }

            show() {
                this.root.classList.add('active');
                this.overlay.style.display = "";
            }
            hide() {
                this.root.classList.remove('active');
                this.overlay.style.display = "none";
            }

            style() {
                if(Dialog._hasStyle) {
                    return;
                }
                Dialog._hasStyle = true;
                const style = document.createElement('style');

                style.textContent = `
                    .dialog, .dialog-overlay{
                        position: fixed;
                        z-index: 1000;
                    }

                    .dialog-overlay{
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,.1);
                    }

                    
                    .dialog{
                        background-color: white;
                        border-radius: 5px;
                        box-shadow: 0 0 20px -10px rgba(0,0,0,.3);
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);

                        opacity: 0;
                        visibility: hidden;
                        display: none;
                        transform: scale(.9);
                        z-index: 3001;

                        --padding: var(--gap-box);
                        --header-height: 70px;
                        --footer-height: 70px;
                        font-family: var(--font);
                    }
                    
                    .dialog.disabled .dialog-footer,
                    .dialog.disabled .dialog-content{
                        pointer-events: none
                    }
                    .dialog.disabled .dialog-content:after{
                        background-color: #ffffff99;
                        position: absolute;
                        inset: 0;
                        content: '';
                        z-index: 1;
                        
                    }
                    .dialog.active{
                        opacity: 1;
                        visibility: visible;
                        display: block;
                        transform: scale(1)
                    }

                    .dialog-sidebar{
                        top: calc(var(--padding) + var(--toolbar-height));
                        right: var(--gap-box);
                        left: auto;
                        transform: none;
                        height: calc(100% - (var(--toolbar-height) + (2 * var(--padding))));
                    }

                    .dialog-start{
         
                        right: auto;
                        left: var(--gap-box);
       
                    }

                    .dialog-content{
                        padding: var(--padding);
                        max-height: calc(100vh - (2 * var(--padding)));
                        overflow: auto;
                        position:relative;
                    }
                        .dialog.has-header .dialog-content{
                                max-height: calc(100% - var(--header-height));
                            
                        }

                         .dialog.has-footer .dialog-content{
                            max-height: calc(100vh - var(--footer-height));
                        }

                        .dialog.has-header.has-footer .dialog-content{
                            max-height: calc(100vh - var(--header-height) - var(--footer-height));
                        }

                    .dialog-header{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: var(--padding);
                        border-bottom: 1px solid silver;
                        height: var(--header-height)

                    }

                    .dialog-footer{
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        padding: var(--padding);
                        border-top: 1px solid silver;
                        height: var(--footer-height)
                    }

 

                    .dialog-close svg{
                        width: 25px
                    }
                    .dialog-close:hover{
                        color: black
                    }
                    .dialog-close{
                        cursor: pointer;
                        margin-inline-start: 20px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }

                     

                    .dialog-title{
                        font-weight: bold;
                        opacity: .5;
                        font-size: 12px;
                        text-transform: uppercase;
                    }

                `;

                document.head.appendChild(style);
            }

            init() {
                this.create();
                this.style();
                this.show();
            }

            config(options = {}) {
                const defaults = {
                    content: ``,
                    title: '',
                    width: 'auto',
                    closeAction: 'remove'
                };

                this.settings = Object.assign({}, defaults, options);
            }
        }


         export class CDialog extends CreateBase {
            constructor(options = {}) {
                super();
                this.dialog = new Dialog(Object.assign({}, {
                    width: '350px',
                    mode: 'sidebar',
                    footer: false,
                    header: true,
                    content: ``,
                    closeAction: 'hide',
                    overlay: false
                }, options));
                this.node = this.dialog.content
                this.dialog.hide()
            }
        
            enable() {
                this.dialog.root.classList.remove("disabled");
            }
            disable() {
                this.dialog.root.classList.add("disabled");
            }
         
            open() {
                this.dialog.show();
                this.dispatch('show');
            }
        
            close() {
                this.dialog.hide();
                this.dispatch('close');
            }
        
            content(content) {
                return this.html(content);
            }
            html(content) {
        
               
                if(typeof content === 'string') {
                  this.dialog.content.innerHTML = content;  
                } else if(!!content.nodeName) {
                    this.dialog.content.appendChild(content);
                }  else if(Array.isArray(content)) {
                    content.forEach((item) =>{
                            this.dialog.content.appendChild(item);
                    })
                    
                }
                
                
            }
            title(html) {
                this.dialog.title( html);
            }
        }
        