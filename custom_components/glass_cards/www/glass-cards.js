!function(){"use strict";const e="__glassEventBus",t=window,i=t[e]??(t[e]=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}});let a=!1,r=!1;function s(){i.emit("location-changed",void 0)}const o=globalThis,n=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),c=new WeakMap;let d=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=c.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&c.set(t,e))}return e}toString(){return this.cssText}};const h=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new d(i,e,l)},p=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new d("string"==typeof e?e:e+"",void 0,l))(t)})(e):e,{is:u,defineProperty:g,getOwnPropertyDescriptor:m,getOwnPropertyNames:_,getOwnPropertySymbols:f,getPrototypeOf:b}=Object,v=globalThis,y=v.trustedTypes,w=y?y.emptyScript:"",x=v.reactiveElementPolyfillSupport,k=(e,t)=>e,$={toAttribute(e,t){switch(t){case Boolean:e=e?w:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},C=(e,t)=>!u(e,t),S={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:C};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let I=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=S){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&g(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=m(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=a?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??S}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const e=b(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const e=this.properties,t=[..._(e),...f(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(p(e))}else void 0!==e&&t.push(p(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(n)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),a=o.litNonce;void 0!==a&&t.setAttribute("nonce",a),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:$;this._$Em=a;const s=r.fromAttribute(t,e.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const s=this.constructor;if(!1===a&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??C)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[k("elementProperties")]=new Map,I[k("finalized")]=new Map,x?.({ReactiveElement:I}),(v.reactiveElementVersions??=[]).push("2.1.2");const T=globalThis,z=e=>e,E=T.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,P="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+L,R=`<${M}>`,O=document,D=()=>O.createComment(""),j=e=>null===e||"object"!=typeof e&&"function"!=typeof e,F=Array.isArray,q="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,V=/>/g,U=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,B=/"/g,G=/^(?:script|style|textarea|title)$/i,K=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),X=K(1),Q=K(2),Y=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),Z=new WeakMap,ee=O.createTreeWalker(O,129);function te(e,t){if(!F(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}class ie{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,s=0;const o=e.length-1,n=this.parts,[l,c]=((e,t)=>{const i=e.length-1,a=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=H;for(let n=0;n<i;n++){const t=e[n];let i,l,c=-1,d=0;for(;d<t.length&&(o.lastIndex=d,l=o.exec(t),null!==l);)d=o.lastIndex,o===H?"!--"===l[1]?o=N:void 0!==l[1]?o=V:void 0!==l[2]?(G.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=U):void 0!==l[3]&&(o=U):o===U?">"===l[0]?(o=r??H,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,i=l[1],o=void 0===l[3]?U:'"'===l[3]?B:W):o===B||o===W?o=U:o===N||o===V?o=H:(o=U,r=void 0);const h=o===U&&e[n+1].startsWith("/>")?" ":"";s+=o===H?t+R:c>=0?(a.push(i),t.slice(0,c)+P+t.slice(c)+L+h):t+L+(-2===c?n:h)}return[te(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=ie.createElement(l,i),ee.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=ee.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(P)){const t=c[s++],i=a.getAttribute(e).split(L),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?ne:"?"===o[1]?le:"@"===o[1]?ce:oe}),a.removeAttribute(e)}else e.startsWith(L)&&(n.push({type:6,index:r}),a.removeAttribute(e));if(G.test(a.tagName)){const e=a.textContent.split(L),t=e.length-1;if(t>0){a.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],D()),ee.nextNode(),n.push({type:2,index:++r});a.append(e[t],D())}}}else if(8===a.nodeType)if(a.data===M)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(L,e+1));)n.push({type:7,index:r}),e+=L.length-1}r++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function ae(e,t,i=e,a){if(t===Y)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const s=j(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=ae(e,r._$AS(e,t.values),r,a)),t}let re=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??O).importNode(t,!0);ee.currentNode=a;let r=ee.nextNode(),s=0,o=0,n=i[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new se(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new de(r,this,e)),this._$AV.push(t),n=i[++o]}s!==n?.index&&(r=ee.nextNode(),s++)}return ee.currentNode=O,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class se{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ae(this,e,t),j(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==Y&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>F(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=ie.createElement(te(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new re(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new ie(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new se(this.O(D()),this.O(D()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=z(e).nextSibling;z(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}_$AI(e,t=this,i,a){const r=this.strings;let s=!1;if(void 0===r)e=ae(this,e,t,0),s=!j(e)||e!==this._$AH&&e!==Y,s&&(this._$AH=e);else{const a=e;let o,n;for(e=r[0],o=0;o<r.length-1;o++)n=ae(this,a[i+o],t,o),n===Y&&(n=this._$AH[o]),s||=!j(n)||n!==this._$AH[o],n===J?e=J:e!==J&&(e+=(n??"")+r[o+1]),this._$AH[o]=n}s&&!a&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ne extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class le extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class ce extends oe{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=ae(this,e,t,0)??J)===Y)return;const i=this._$AH,a=e===J&&i!==J||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==J&&(i===J||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class de{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ae(this,e)}}const he=T.litHtmlPolyfillSupport;he?.(ie,se),(T.litHtmlVersions??=[]).push("3.3.2");const pe=globalThis;class ue extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new se(t.insertBefore(D(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}ue._$litElement$=!0,ue.finalized=!0,pe.litElementHydrateSupport?.({LitElement:ue});const ge=pe.litElementPolyfillSupport;ge?.({LitElement:ue}),(pe.litElementVersions??=[]).push("4.2.2");const me=280,_e=360,fe=480,be=600;h`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`,h`
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-3, 0.75rem);
  }
  :host([size="xs"]) .grid,
  :host([size="sm"]) .grid {
    grid-template-columns: 1fr;
  }
  :host([size="xl"]) .grid {
    gap: var(--sp-4, 1rem);
  }
`;const ve={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:C},ye=(e=ve,t,i)=>{const{kind:a,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function we(e){return(t,i)=>"object"==typeof i?ye(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function xe(e){return we({...e,state:!0,attribute:!1})}var ke=Object.defineProperty,$e=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ke(t,i,s),s};class Ce extends ue{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.color="var(--rgb-accent)",this.label="",this.disabled=!1,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[h`
      :host {
        display: block;
        box-sizing: border-box;
      }
      .track {
        position: relative;
        height: 2.25rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
        overflow: hidden;
        cursor: pointer;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        outline: none;
      }
      .track:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }
      :host([disabled]) .track {
        opacity: 0.4;
        pointer-events: none;
      }
      .fill {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
        transform-origin: left center;
        will-change: transform;
        background: linear-gradient(
          90deg,
          rgba(var(--_slider-color), 0.15),
          rgba(var(--_slider-color), 0.25)
        );
      }
      .thumb {
        position: absolute;
        top: 50%;
        left: 0;
        width: 0.5rem;
        height: 1.25rem;
        border-radius: 4px;
        background: rgba(var(--rgb-white), 0.7);
        box-shadow: 0 0 8px rgba(var(--rgb-white), 0.2);
        pointer-events: none;
        will-change: transform;
      }
      .label {
        position: absolute;
        top: 50%;
        right: 0.75rem;
        transform: translateY(-50%);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t3);
        pointer-events: none;
      }
    `]}_displayPct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_snap(e){if(this.step<=0)return e;const t=Math.round(e/this.step)*this.step,i=(this.step.toString().split(".")[1]||"").length;return parseFloat(t.toFixed(i))}_pctToValue(e){const t=this.max-this.min,i=this.min+e/100*t;return Math.max(this.min,Math.min(this.max,this._snap(i)))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max")||e.has("color"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._displayPct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.transform=`translate(calc(${e}cqw - 50%), -50%)`)}_onPointerDown(e){if(this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,this._ac=new AbortController;const{signal:i}=this._ac,a=this.renderRoot.querySelector(".fill"),r=this.renderRoot.querySelector(".thumb"),s=(e,i)=>{const s=t.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100)),n=this._pctToValue(o);this._dragValue=n;const l=this._displayPct(n);a.style.transform=`scaleX(${l/100})`,r.style.transform=`translate(calc(${l}cqw - 50%), -50%)`;const c=i?"glass-slider-change":"glass-slider-input";this.dispatchEvent(new CustomEvent(c,{detail:{value:n},bubbles:!0,composed:!0}))};s(e,!1);const o=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}this._dragging=!1};t.addEventListener("pointermove",e=>s(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{s(e,!0),o()},{signal:i}),t.addEventListener("pointercancel",()=>o(),{signal:i}),t.addEventListener("lostpointercapture",()=>o(),{signal:i})}_onKeyDown(e){if(this.disabled)return;const t=this.step>0?this.step:1;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this._snap(this.value+t));break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this._snap(this.value-t));break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this._dragValue=i,this._applyVisuals(),this.dispatchEvent(new CustomEvent("glass-slider-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return X`
      <div
        class="track"
        role="slider"
        tabindex="0"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this._dragging?this._dragValue:this.value}"
        aria-label="${this.label||"slider"}"
        style="container-type:inline-size;--_slider-color:${this.color}"
        @pointerdown=${this._onPointerDown}
        @keydown=${this._onKeyDown}
      >
        <div class="fill"></div>
        <div class="thumb"></div>
        ${this.label?X`<span class="label">${this.label}</span>`:""}
      </div>
    `}}$e([we({type:Number})],Ce.prototype,"value"),$e([we({type:Number})],Ce.prototype,"min"),$e([we({type:Number})],Ce.prototype,"max"),$e([we({type:Number})],Ce.prototype,"step"),$e([we({type:String})],Ce.prototype,"color"),$e([we({type:String})],Ce.prototype,"label"),$e([we({type:Boolean,reflect:!0})],Ce.prototype,"disabled");try{customElements.define("glass-slider",Ce)}catch{}const Se=h`
  :host {
    --ease-std: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

    --t-slow: 1.2s var(--ease-std);
    --t-med: 0.4s var(--ease-std);
    --t-fast: 0.2s var(--ease-std);
    --t-layout: 0.35s var(--ease-out);

    --radius-xl: 22px;
    --radius-lg: 14px;
    --radius-md: 10px;
    --radius-sm: 8px;
    --radius-xs: 6px;
    --radius-full: 9999px;

    --fz-display: 28px;
    --fz-xl: 22px;
    --fz-lg: 14px;
    --fz-md: 13px;
    --fz-base: 11px;
    --fz-sm: 10px;
    --fz-xs: 9px;
    --fz-xxs: 8px;

    --rgb-white: 255, 255, 255;
    --rgb-black: 0, 0, 0;
    --rgb-success: 74, 222, 128;
    --rgb-alert: 248, 113, 113;
    --rgb-warning: 251, 191, 36;
    --rgb-info: 96, 165, 250;
    --rgb-accent: 129, 140, 248;
    --rgb-purple: 167, 139, 250;
    --rgb-light-glow: 251, 191, 36;
    --rgb-spotify: 29, 185, 84;
    --rgb-heat: 249, 115, 22;
    --rgb-cool: 56, 189, 248;

    --t1: rgba(var(--rgb-white), 0.88);
    --t2: rgba(var(--rgb-white), 0.6);
    --t3: rgba(var(--rgb-white), 0.55);
    --t4: rgba(var(--rgb-white), 0.35);

    --s1: rgba(var(--rgb-white), 0.04);
    --s2: rgba(var(--rgb-white), 0.06);
    --s3: rgba(var(--rgb-white), 0.08);
    --s4: rgba(var(--rgb-white), 0.12);

    --b1: rgba(var(--rgb-white), 0.06);
    --b2: rgba(var(--rgb-white), 0.08);
    --b3: rgba(var(--rgb-white), 0.15);

    --c-success: var(--success-color, #4ade80);
    --c-alert: var(--error-color, #f87171);
    --c-warning: var(--warning-color, #fbbf24);
    --c-info: var(--info-color, #60a5fa);
    --c-accent: var(--accent-color, #818cf8);
    --c-purple: #a78bfa;
    --c-light-glow: #fbbf24;
    --c-spotify: #1DB954;
    --c-spotify-hover: #1ed760;
    --c-temp-hot: #f87171;
    --c-temp-cold: #60a5fa;
    --c-heat: #f97316;
    --c-cool: #38bdf8;

    --blur-sm: blur(8px);
    --blur-md: blur(16px) saturate(1.3);
    --blur-lg: blur(40px) saturate(1.4);
    --blur-xl: blur(50px) saturate(1.5);

    --icon-xs: 0.625rem;
    --icon-sm: 0.875rem;
    --icon-md: 1.125rem;
    --icon-lg: 1.375rem;
    --icon-xl: 1.5rem;

    /* Spacing scale — base 0.25rem (4px) */
    --sp-1: 0.25rem;
    --sp-2: 0.5rem;
    --sp-3: 0.75rem;
    --sp-4: 1rem;
    --sp-5: 1.25rem;
    --sp-6: 1.5rem;
    --sp-8: 2rem;
    --sp-10: 2.5rem;
  }
`,Ie=h`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`,Te=h`
  .glass {
    border-radius: var(--radius-xl);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0.06) 100%
    );
    backdrop-filter: blur(40px) saturate(1.4);
    -webkit-backdrop-filter: blur(40px) saturate(1.4);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
      0 8px 32px rgba(0, 0, 0, 0.25),
      0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--b2);
  }

  .glass-float {
    border-radius: var(--radius-xl);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0.06) 100%
    );
    backdrop-filter: blur(50px) saturate(1.5);
    -webkit-backdrop-filter: blur(50px) saturate(1.5);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 4px 16px rgba(0, 0, 0, 0.25);
    border: 1px solid var(--b2);
  }

  .tint {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
    transition: opacity var(--t-slow);
  }
`,ze=h`
  .marquee {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    text-overflow: ellipsis;
  }
  .marquee.scrolling {
    mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
    text-overflow: clip;
  }
  .marquee .marquee-inner {
    display: inline-block;
  }
  .marquee.scrolling .marquee-inner {
    animation: marquee-scroll var(--marquee-duration, 8s) linear infinite;
    will-change: transform;
  }
  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`,Ee=18;function Ae(e,t=18,i="8s"){return!e||e.length<=t?e||"":X`<span class="marquee" style="--marquee-duration:${i}"><span class="marquee-inner" data-text="${e}">${e}</span></span>`}const Pe=h`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`,Le=h`
  .eq-bars {
    display: flex;
    align-items: flex-end;
    gap: 1px;
    height: 12px;
  }
  .eq-bars span {
    width: 2px;
    border-radius: 1px;
    background: var(--c-accent-dynamic, var(--c-accent)); /* set --c-accent-dynamic on host to tint bars */
    transform-origin: bottom;
    animation: eq-bar 0.8s ease-in-out infinite alternate;
  }
  .eq-bars span:nth-child(2) { animation-delay: 0.2s; }
  .eq-bars span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes eq-bar {
    from { transform: scaleY(0.25); }
    to { transform: scaleY(1); }
  }
`,Me=h`
  .fold {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--t-layout);
  }
  .fold.open {
    grid-template-rows: 1fr;
  }
  .fold-inner {
    overflow: hidden;
    opacity: 0;
    transition: opacity var(--t-fast);
  }
  .fold.open .fold-inner {
    opacity: 1;
    transition-delay: 0.1s;
  }
`,Re={morning:{body:"#0f1923",blobTop:"#1a6b8a",blobBottom:"#2d8a6e"},day:{body:"#111827",blobTop:"#3b6fa0",blobBottom:"#4a90a0"},evening:{body:"#1a1118",blobTop:"#8a4a2d",blobBottom:"#6b3a5a"},night:{body:"#0a0e1a",blobTop:"#1a2040",blobBottom:"#2a1a3a"}},Oe="glass-cards-ambient-bg",De=`\n  #${Oe} {\n    position: fixed;\n    inset: 0;\n    z-index: 0;\n    pointer-events: none;\n    overflow: hidden;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${Oe}::before,\n  #${Oe}::after {\n    content: '';\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(120px);\n    opacity: 0.4;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${Oe}::before {\n    width: 600px;\n    height: 600px;\n    top: -200px;\n    right: -100px;\n    background: var(--ambient-blob-top, #3b6fa0);\n  }\n  #${Oe}::after {\n    width: 500px;\n    height: 500px;\n    bottom: -150px;\n    left: -100px;\n    background: var(--ambient-blob-bottom, #4a90a0);\n  }\n  html::-webkit-scrollbar { display: none; }\n  html { scrollbar-width: none; }\n`;class je{constructor(){this.period="day",this.ambientEl=null,this.styleEl=null,this.cleanup=i.on("ambient-update",e=>{this.period=e.period,this.applyAmbient()}),this._injectAmbientBg(),this.applyAmbient()}get currentPeriod(){return this.period}applyAmbient(e){e&&(this.period=e);const t=Re[this.period],i=document.documentElement;i.style.setProperty("--ambient-body",t.body),i.style.setProperty("--ambient-blob-top",t.blobTop),i.style.setProperty("--ambient-blob-bottom",t.blobBottom),this.ambientEl&&(this.ambientEl.style.background=t.body)}_injectAmbientBg(){if(document.documentElement.style.background="transparent",document.getElementById(Oe))return this.ambientEl=document.getElementById(Oe),void(this.styleEl=document.head.querySelector("style[data-glass-ambient]"));this.styleEl=document.createElement("style"),this.styleEl.setAttribute("data-glass-ambient",""),this.styleEl.textContent=De,document.head.appendChild(this.styleEl),this.ambientEl=document.createElement("div"),this.ambientEl.id=Oe,document.body.prepend(this.ambientEl)}destroy(){this.cleanup?.(),this.ambientEl?.remove(),this.ambientEl=null,this.styleEl?.remove(),this.styleEl=null,document.documentElement.style.removeProperty("background"),Fe===this&&(Fe=null)}}let Fe=null;function qe(e,t){const i=t,a=i*(1-Math.abs(e/60%2-1));let r=0,s=0,o=0;e<60?(r=i,s=a):e<120?(r=a,s=i):e<180?(s=i,o=a):e<240?(s=a,o=i):e<300?(r=a,o=i):(r=i,o=a);const n=1-i;return[Math.round(255*(r+n)),Math.round(255*(s+n)),Math.round(255*(o+n))]}function He(e){const t=e[0]/255,i=e[1]/255,a=e[2]/255,r=Math.max(t,i,a),s=r-Math.min(t,i,a);let o=0;0!==s&&(o=r===t?((i-a)/s+6)%6*60:r===i?60*((a-t)/s+2):60*((t-i)/s+4));return{h:o,s:0===r?0:s/r}}function Ne(e){return"#"+e.map(e=>e.toString(16).padStart(2,"0")).join("")}const Ve=h`
  .entity-unavailable {
    opacity: 0.4;
    pointer-events: none;
    position: relative;
  }
  .entity-unavailable .unavailable-badge {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    --mdc-icon-size: 0.75rem;
    color: var(--c-warning);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
`;function Ue(e){return!e||"unavailable"===e||"unknown"===e}const We={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer",collapse:"Réduire",expand:"Développer",move_up:"Déplacer vers le haut",move_down:"Déplacer vers le bas",none:"Aucun",rooms:"Pièces",enabled:"Activé",disabled:"Désactivé"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSO",compass_SW:"SO",compass_WSW:"OSO",compass_W:"O",compass_WNW:"ONO",compass_NW:"NO",compass_NNW:"NNO"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store d'ombrage",dc_window:"Fenêtre",dc_damper:"Clapet"},climate:{title:"Thermostat",target:"Consigne",current:"Actuelle",range_low:"Min",range_high:"Max",humidity_target:"Humidité cible",aux_heat:"Chauffage auxiliaire",unavailable:"Indisponible",mode_heat:"Chauffage",mode_cool:"Climatisation",mode_heat_cool:"Auto chaud/froid",mode_auto:"Automatique",mode_dry:"Déshumidification",mode_fan_only:"Ventilation",mode_off:"Éteint",preset_eco:"Éco",preset_comfort:"Confort",preset_boost:"Boost",preset_away:"Absent",preset_sleep:"Nuit",preset_activity:"Activité",preset_none:"Aucun",fan_mode:"Ventilation",swing_mode:"Oscillation",open_all_aria:"Allumer tous les climatiseurs",close_all_aria:"Éteindre tous les climatiseurs",toggle_aria:"Basculer",expand_aria:"Détails",temp_up_aria:"Augmenter température",temp_down_aria:"Diminuer température",humidity_up_aria:"Augmenter humidité",humidity_down_aria:"Diminuer humidité",range_low_aria:"Température minimale",range_high_aria:"Température maximale",no_climates:"Aucun climatiseur",turn_on_aria:"Allumer",turn_off_aria:"Éteindre",action_heating:"Chauffe",action_cooling:"Refroidit",action_idle:"En attente",action_off:"Éteint",action_drying:"Déshumidifie",current_label:"Actuel",controls_aria:"Contrôles",unknown:"Inconnu",avg_label:"Moy.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce."},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}",clear_search:"Effacer la recherche"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",remove_from_queue:"Retirer de la liste de lecture",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",distance_m:"m",distance_km:"km"},camera:{title:"CAMÉRAS",idle:"Veille",streaming:"En direct",recording:"Enregistrement",off:"Éteinte",unavailable:"Indisponible",no_cameras:"Aucune caméra",prev_aria:"Caméra précédente",next_aria:"Caméra suivante",dot_aria:"Aller à {name}",power_on:"Allumer",power_off:"Éteindre",snapshot:"Capture",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Désactiver détection mouvement",motion_off_aria:"Activer détection mouvement",siren_aria:"Sirène",floodlight_aria:"Projecteur",auto_track_aria:"Suivi automatique",tap_to_stream:"Appuyer pour diffuser",camera_off:"Caméra éteinte",ai_person:"Personne",ai_vehicle:"Véhicule",ai_pet:"Animal",ai_animal:"Animal",ai_package:"Colis",ai_face:"Visage",ai_baby_crying:"Bébé",ai_bicycle:"Vélo",dashboard_title:"CAMÉRAS",dashboard_title_one:"1 CAMÉRA"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Pièces","nav_dashboard":"Dashboard","nav_advanced":"Avancé","tab_navbar":"Barre de nav","tab_popup":"Popup Pièce","tab_light":"Carte Lumières","preview":"Aperçu","behavior":"Comportement","navbar_settings":"Navbar","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","no_rooms":"Aucune pièce configurée","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","room_sensors":"Capteurs","room_sensors_desc":"Entités de température et d\'humidité utilisées dans le popup et la navbar.","room_temp_entity":"Capteur de température","room_temp_entity_desc":"Entité utilisée pour afficher la température de la pièce.","room_humidity_entity":"Capteur d\'humidité","room_humidity_entity_desc":"Entité utilisée pour afficher l\'humidité de la pièce.","room_auto_detect":"Auto-détection","room_no_sensor":"Aucun capteur","room_thresholds":"Seuils d\'alerte","room_thresholds_desc":"Valeurs au-delà desquelles les indicateurs passent en rouge.","room_temp_high":"Température haute","room_temp_low":"Température basse","room_humidity_threshold":"Seuil d\'humidité","room_indicators":"Indicateurs navbar","room_indicators_desc":"Choisir les indicateurs à afficher pour cette pièce dans la navbar","room_show_lights":"Afficher les lumières","room_show_temperature":"Afficher la température","room_show_humidity":"Afficher l\'humidité","hide_room":"Masquer de la navbar","show_room":"Afficher dans la navbar","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","popup_auto_close":"Fermeture automatique","popup_auto_close_desc":"Fermer le popup automatiquement après un délai d\'inactivité.","popup_auto_close_duration":"Délai","popup_auto_close_off":"Désactivé","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_camera":"Caméras","domain_camera_desc":"Caméras de surveillance","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Carte Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_hourly":"Prévisions horaires","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","tab_title":"Carte Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_period_indicator":"Indicateur de période","title_period_info":"Créez un input_select nommé « periode_journee » avec les options : Matin, Après-midi, Soir, Nuit. L\'indicateur s\'affichera automatiquement.","title_period_entity":"Entité période","title_period_entity_desc":"Sélectionnez l\'input_select qui contrôle la période du jour","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Visuels des périodes","title_period_options_desc":"Personnalisez l\'icône et la couleur de chaque période","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Carte Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_dynamic_bg":"Fond dynamique","dashboard_dynamic_bg_desc":"Active le fond d\'écran jour/nuit animé de Glass Cards.","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Carte Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Carte Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Carte Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Carte Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Carte Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Carte Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","tab_climate":"Thermostat","climate_desc":"Configurez les entités climat par pièce","climate_no_entities":"Aucune entité climat dans cette pièce","climate_show_header":"Afficher l\'en-tête","climate_show_header_desc":"Titre et compteur au-dessus de la carte","climate_display_mode":"Mode d\'affichage","climate_display_mode_popup":"Mode d\'affichage popup","climate_display_mode_popup_desc":"Disposition des entités climat dans le popup de la pièce.","climate_display_mode_dashboard":"Mode d\'affichage (dashboard)","climate_display_mode_dashboard_desc":"Disposition des entités climat sur le tableau de bord.","climate_mode_list":"Liste","climate_mode_normal":"Normal","climate_select_room":"Sélectionner une pièce","climate_room_entities":"Entités de la pièce","climate_room_entities_desc":"Ordre et visibilité des entités climat. Glissez pour réordonner.","climate_dashboard_entities":"Entités climat du tableau de bord","climate_dashboard_entities_desc":"Sélectionnez les thermostats à afficher sur le tableau de bord.","dashboard_card_climate":"Thermostat","dashboard_card_climate_desc":"Thermostats et climatiseurs","dashboard_card_fan":"Carte Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Carte Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Carte Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Carte Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Carte Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_compact":"Affichage compact","cover_dashboard_compact_desc":"Affiche les volets en grille compacte 2 colonnes. Désactivé, chaque volet occupe toute la largeur.","cover_dashboard_entities":"Volets du tableau de bord","cover_dashboard_entities_desc":"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_camera_carousel":"Carte Caméras","camera_show_header":"Afficher l\'en-tête","camera_show_header_desc":"Titre et compteur au-dessus de la carte","camera_auto_cycle":"Cycle automatique","camera_auto_cycle_desc":"Passer automatiquement d\'une caméra à l\'autre","camera_cycle_interval":"Intervalle (secondes)","camera_cycle_interval_desc":"Temps entre chaque changement de caméra","camera_entity_order":"Ordre des caméras","camera_entity_order_desc":"Glissez pour réordonner les caméras.","camera_no_cameras":"Aucune caméra détectée.","dashboard_card_camera_carousel":"Carte Caméras","dashboard_card_camera_carousel_desc":"Carrousel de surveillance avec actions rapides","tab_spotify":"Carte Spotify","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Entité lecteur Spotify","spotify_entity_desc":"Sélectionnez l\'entité media_player Spotify à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Sélectionnez les enceintes affichées dans le popup de lecture. Si aucune n\'est sélectionnée, toutes les enceintes sont affichées.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres","tab_unassigned":"Entités orphelines","unassigned_desc":"Assignez ou réassignez vos entités à une pièce pour qu\'elles apparaissent dans les popups correspondants.","unassigned_none":"Toutes les entités sont assignées à une pièce.","unassigned_no_entities":"Aucune entité détectée.","unassigned_select_area":"Non assignée","unassigned_assigned":"Assignée","unassigned_count":"{count} entité(s) sans pièce","unassigned_no_results":"Aucun résultat.","unassigned_rename":"Renommer l\'entité","unassigned_change_icon":"Changer l\'icône"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete",collapse:"Collapse",expand:"Expand",move_up:"Move up",move_down:"Move down",none:"None",rooms:"Rooms",enabled:"Enabled",disabled:"Disabled"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSW",compass_SW:"SW",compass_WSW:"WSW",compass_W:"W",compass_WNW:"WNW",compass_NW:"NW",compass_NNW:"NNW"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},climate:{title:"Climate",target:"Target",current:"Current",range_low:"Low",range_high:"High",humidity_target:"Target humidity",aux_heat:"Auxiliary heat",unavailable:"Unavailable",mode_heat:"Heat",mode_cool:"Cool",mode_heat_cool:"Heat/Cool",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan only",mode_off:"Off",preset_eco:"Eco",preset_comfort:"Comfort",preset_boost:"Boost",preset_away:"Away",preset_sleep:"Sleep",preset_activity:"Activity",preset_none:"None",fan_mode:"Fan mode",swing_mode:"Swing mode",open_all_aria:"Turn on all climate devices",close_all_aria:"Turn off all climate devices",toggle_aria:"Toggle",expand_aria:"Details",temp_up_aria:"Increase temperature",temp_down_aria:"Decrease temperature",humidity_up_aria:"Increase humidity",humidity_down_aria:"Decrease humidity",range_low_aria:"Minimum temperature",range_high_aria:"Maximum temperature",no_climates:"No climate devices",turn_on_aria:"Turn on",turn_off_aria:"Turn off",action_heating:"Heating",action_cooling:"Cooling",action_idle:"Idle",action_off:"Off",action_drying:"Drying",current_label:"Current",controls_aria:"Controls",unknown:"Unknown",avg_label:"Avg.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room."},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}",clear_search:"Clear search"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",remove_from_queue:"Remove from queue",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",distance_m:"m",distance_km:"km"},camera:{title:"CAMERAS",idle:"Idle",streaming:"Streaming",recording:"Recording",off:"Off",unavailable:"Unavailable",no_cameras:"No cameras",prev_aria:"Previous camera",next_aria:"Next camera",dot_aria:"Go to {name}",power_on:"Turn on",power_off:"Turn off",snapshot:"Snapshot",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Disable motion detection",motion_off_aria:"Enable motion detection",siren_aria:"Siren",floodlight_aria:"Floodlight",auto_track_aria:"Auto tracking",tap_to_stream:"Tap to stream",camera_off:"Camera off",ai_person:"Person",ai_vehicle:"Vehicle",ai_pet:"Pet",ai_animal:"Animal",ai_package:"Package",ai_face:"Face",ai_baby_crying:"Baby",ai_bicycle:"Bicycle",dashboard_title:"CAMERAS",dashboard_title_one:"1 CAMERA"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Rooms","nav_dashboard":"Dashboard","nav_advanced":"Advanced","tab_navbar":"Navbar","tab_popup":"Room Popup","tab_light":"Light Card","preview":"Preview","behavior":"Behavior","navbar_settings":"Navbar","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","no_rooms":"No rooms configured","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","room_sensors":"Sensors","room_sensors_desc":"Temperature and humidity entities used in the popup and navbar.","room_temp_entity":"Temperature sensor","room_temp_entity_desc":"Entity used to display the room temperature.","room_humidity_entity":"Humidity sensor","room_humidity_entity_desc":"Entity used to display the room humidity.","room_auto_detect":"Auto-detect","room_no_sensor":"No sensor","room_thresholds":"Alert thresholds","room_thresholds_desc":"Values above which indicators turn red.","room_temp_high":"High temperature","room_temp_low":"Low temperature","room_humidity_threshold":"Humidity threshold","room_indicators":"Navbar indicators","room_indicators_desc":"Choose which indicators to show for this room in the navbar","room_show_lights":"Show lights","room_show_temperature":"Show temperature","room_show_humidity":"Show humidity","hide_room":"Hide from navbar","show_room":"Show in navbar","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","popup_auto_close":"Auto close","popup_auto_close_desc":"Automatically close the popup after an inactivity delay.","popup_auto_close_duration":"Delay","popup_auto_close_off":"Disabled","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_camera":"Cameras","domain_camera_desc":"Security cameras","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather Card","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_hourly":"Hourly forecast","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","tab_title":"Title Card","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_period_indicator":"Period indicator","title_period_info":"Create an input_select named \'periode_journee\' with options: Matin, Après-midi, Soir, Nuit. The indicator will appear automatically.","title_period_entity":"Period entity","title_period_entity_desc":"Select the input_select that controls the time of day period","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Period visuals","title_period_options_desc":"Customize the icon and color for each period","title_add_source":"Add a source","title_remove_source":"Remove source","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title Card","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_dynamic_bg":"Dynamic background","dashboard_dynamic_bg_desc":"Enables the Glass Cards animated day/night background cycle.","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather Card","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Light Card","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Cover Card","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify Card","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media Card","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media Card","dashboard_card_media_desc":"Shows media players with transport controls","tab_climate":"Climate","climate_desc":"Configure climate entities per room","climate_no_entities":"No climate entities in this room","climate_show_header":"Show header","climate_show_header_desc":"Title and counter above the card","climate_display_mode":"Display mode","climate_display_mode_popup":"Popup display mode","climate_display_mode_popup_desc":"Layout for climate entities in the room popup.","climate_display_mode_dashboard":"Display mode (dashboard)","climate_display_mode_dashboard_desc":"Layout for climate entities on the dashboard.","climate_mode_list":"List","climate_mode_normal":"Normal","climate_select_room":"Select a room","climate_room_entities":"Room entities","climate_room_entities_desc":"Order and visibility of climate entities. Drag to reorder.","climate_dashboard_entities":"Dashboard climate entities","climate_dashboard_entities_desc":"Select which climate entities to display on the dashboard.","dashboard_card_climate":"Climate","dashboard_card_climate_desc":"Thermostats and HVAC","dashboard_card_fan":"Fan Card","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence Card","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence Card","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fan Card","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Cover Card","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_compact":"Compact layout","cover_dashboard_compact_desc":"Display covers in a 2-column compact grid. When off, each cover takes the full width.","cover_dashboard_entities":"Dashboard covers","cover_dashboard_entities_desc":"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_camera_carousel":"Camera Card","camera_show_header":"Show header","camera_show_header_desc":"Title and counter above the card","camera_auto_cycle":"Auto cycle","camera_auto_cycle_desc":"Automatically cycle between cameras","camera_cycle_interval":"Interval (seconds)","camera_cycle_interval_desc":"Time between each camera switch","camera_entity_order":"Camera order","camera_entity_order_desc":"Drag to reorder cameras.","camera_no_cameras":"No cameras detected.","dashboard_card_camera_carousel":"Camera Card","dashboard_card_camera_carousel_desc":"Surveillance carousel with quick actions","tab_spotify":"Spotify Card","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player entity","spotify_entity_desc":"Select the Spotify media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Select which speakers appear in the playback popup. If none are selected, all speakers are shown.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings","tab_unassigned":"Orphan entities","unassigned_desc":"Assign or reassign your entities to a room so they appear in the corresponding popups.","unassigned_none":"All entities are assigned to a room.","unassigned_no_entities":"No entities detected.","unassigned_select_area":"Unassigned","unassigned_assigned":"Assigned","unassigned_count":"{count} unassigned entity(ies)","unassigned_no_results":"No results.","unassigned_rename":"Rename entity","unassigned_change_icon":"Change icon"}')}},Be="fr";let Ge=Be;function Ke(e){const t=e.slice(0,2).toLowerCase(),i=t in We?t:Be;return i!==Ge&&(Ge=i,!0)}function Xe(){return Ge}function Qe(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),r=-1===i?"":e.slice(i+1),s=We[Ge]??We[Be],o=We[Be],n=s?.[a]?.[r]??o?.[a]?.[r];let l="string"==typeof n?n:e;if(t)for(const[c,d]of Object.entries(t))l=l.replaceAll(`{${c}}`,String(d));return l}var Ye=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,Ze=(e,t,i,a)=>{for(var r,s=a>1?void 0:a?Je(t,i):t,o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a?r(t,i,s):r(s))||s);return a&&s&&Ye(t,i,s),s};class et extends ue{constructor(){super(...arguments),this._lang=Xe()}set hass(e){this._hass=e,e?.language&&Ke(e.language)&&(this._lang=Xe())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[Se,h`
      .redirect {
        padding: 24px 16px;
        text-align: center;
        color: var(--primary-text-color, #fff);
      }
      .redirect p {
        margin: 8px 0;
        line-height: 1.5;
      }
      .redirect a {
        color: var(--primary-color, #03a9f4);
        text-decoration: none;
        font-weight: 600;
      }
      @media (hover: hover) and (pointer: fine) {
        .redirect a:hover {
          text-decoration: underline;
        }
      }
      ha-icon {
        --mdc-icon-size: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }
    `]}render(){return this._lang,X`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${Qe("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${Qe("editor.open_config")}</a>
        </p>
      </div>
    `}}Ze([we({attribute:!1})],et.prototype,"hass",1),Ze([xe()],et.prototype,"_lang",2);try{customElements.define("glass-card-editor",et)}catch{}function tt(e){try{const t=class extends et{};customElements.define(e,t)}catch{}}var it=Object.defineProperty,at=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&it(t,i,s),s};class rt extends ue{constructor(){super(...arguments),this.configPreview=!1,this._lang=Xe(),this._busCleanups=[],this._marqueeCleanup=null,this._cardSize="md",this._gestureTimer=0,this._gestureFired=!1,this._gestureStart=null,this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}static getStubConfig(){return{}}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&Ke(this.hass.language)&&(this._lang=Xe())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0),this._marqueeCleanup=function(e){if(!e)return()=>{};const t=e=>{const t=e.querySelector(".marquee-inner");if(!t)return;e.classList.remove("scrolling");const i=t.dataset.text??t.textContent?.split("   ")[0]??"";t.dataset.text=i,t.textContent=i,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.scrollWidth>e.clientWidth+1&&(t.textContent=`${i}   ${i}   `,e.classList.add("scrolling"))})})},i=new ResizeObserver(e=>{for(const i of e)t(i.target)}),a=new MutationObserver(()=>{s()}),r=new Set,s=()=>{e.querySelectorAll(".marquee").forEach(e=>{r.has(e)||(r.add(e),i.observe(e),t(e))});for(const e of r)e.isConnected||(i.unobserve(e),r.delete(e))};return a.observe(e,{childList:!0,subtree:!0}),s(),()=>{i.disconnect(),a.disconnect(),r.clear()}}(this.shadowRoot),this._ro=new ResizeObserver(e=>{const t=e[0]?.contentRect.width??this.offsetWidth;this._applyCardSize(t)}),this._ro.observe(this)}_applyCardSize(e){let t="xl";e<me?t="xs":e<_e?t="sm":e<fe?t="md":e<be&&(t="lg"),t!==this._cardSize&&(this._cardSize=t,this.setAttribute("size",t))}_listen(e,t){this._busCleanups.push(i.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0),this._marqueeCleanup?.(),this._marqueeCleanup=null,this._ro?.disconnect(),this._ro=void 0,clearTimeout(this._gestureTimer)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_bindGesture(e){return this.configPreview?{pointerdown:()=>{},pointerup:()=>{},pointermove:()=>{},pointercancel:()=>{},contextmenu:()=>{}}:{pointerdown:t=>this._onGestureDown(t,e),pointerup:t=>this._onGestureUp(t,e),pointermove:e=>this._onGestureMove(e),pointercancel:()=>this._onGestureCancel(),contextmenu:e=>e.preventDefault()}}_safeCallService(e,t,i,a){!this.configPreview&&this.hass&&this.hass.callService(e,t,i,a)}_onGestureDown(e,t){t.exclude&&e.target.closest(t.exclude)||(this._gestureStart={x:e.clientX,y:e.clientY,t:Date.now()},this._gestureFired=!1,clearTimeout(this._gestureTimer),t.onLongPress&&(this._gestureTimer=window.setTimeout(()=>{this._gestureFired=!0,st(this,"light"),t.onLongPress()},500)))}_onGestureUp(e,t){if(clearTimeout(this._gestureTimer),this._gestureFired||!this._gestureStart)return void(this._gestureStart=null);const i=e.clientX-this._gestureStart.x,a=Date.now()-this._gestureStart.t;this._gestureStart=null,t.onSwipe&&Math.abs(i)>50&&a<500?t.onSwipe(i<0?"left":"right"):t.onTap?.()}_onGestureMove(e){if(this._gestureFired||!this._gestureStart)return;const t=Math.abs(e.clientX-this._gestureStart.x),i=Math.abs(e.clientY-this._gestureStart.y);(t>15||i>15)&&(clearTimeout(this._gestureTimer),i>t&&(this._gestureStart=null))}_onGestureCancel(){clearTimeout(this._gestureTimer),this._gestureStart=null}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function st(e,t="light"){e.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:t}))}function ot(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}function nt(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&ot(t,i)===e)}function lt(e,t){if(!t)return!0;const i=t[e];if(!i||0===i.periods.length)return!0;const a=new Date;return i.periods.some(e=>{const t=new Date(e.start),i=new Date(e.end);if(i.setSeconds(59,999),e.recurring){const e=new Date(a.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),r=new Date(a.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999);if(e<=r)return a>=e&&a<=r;const s=new Date(a.getFullYear()+1,i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999),o=new Date(a.getFullYear()-1,t.getMonth(),t.getDate(),t.getHours(),t.getMinutes());return a>=e&&a<=s||a>=o&&a<=r}return a>=t&&a<=i})}function ct(e,t,i){const a=i?.length?i:Object.keys(t.areas??{});if(0===a.length)return[];const r=[];for(const s of a)for(const i of nt(s,t.entities,t.devices))i.entity_id.startsWith(`${e}.`)&&r.push(i.entity_id);return r}at([we({attribute:!1})],rt.prototype,"hass"),at([we({type:Boolean,attribute:"config-preview"})],rt.prototype,"configPreview"),at([xe()],rt.prototype,"_lang");class dt{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}tt("glass-light-card-editor");var ht=Object.defineProperty,pt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ht(t,i,s),s};const ut=[[3e3,"light.temp_warm","#ffd4a3"],[4e3,"light.temp_warm","#ffedb3"],[4800,"light.temp_neutral","#fff5e6"],[9999,"light.temp_cold","#e0ecf5"]];function gt(e){for(const[t,i,a]of ut)if(e<t)return{label:Qe(i),color:a};return{label:Qe("light.temp_cold"),color:"#e0ecf5"}}function mt(e,t){return`rgba(${e[0]},${e[1]},${e[2]},${t})`}const _t=[[251,191,36],[248,113,113],[244,114,182],[167,139,250],[129,140,248],[96,165,250],[74,222,128],[240,240,240]];const ft=["off","candle","fire"];class bt extends rt{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null,this._showHeader=!0,this._lightConfigLoaded=!1,this._throttleTimers=new Map,this._roomConfig=null,this._roomConfigLoaded=!1,this._lightsFingerprint="",this._schedules=null,this._schedulesLoaded=!1,this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._wheelCanvas=null}static getConfigElement(){return document.createElement("glass-light-card-editor")}get _isDashboardMode(){return!(this.areaId||this._config?.area)&&!this._config?.entity}static{this.styles=[Se,Ie,Te,Me,ze,Pe,Ve,h`
      :host {
        width: 100%;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;
      }

      /* ── Card Header ── */
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.375rem;
        padding: 0 0.375rem;
        min-height: 1.375rem;
      }
      .card-header-left {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .card-title {
        font-size: var(--fz-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .card-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 0.875rem;
        height: 0.875rem;
        padding: 0 0.25rem;
        border-radius: var(--radius-full);
        font-size: var(--fz-xs);
        font-weight: 600;
        transition: background var(--t-med), color var(--t-med);
      }
      .card-count.none {
        background: var(--s2);
        color: var(--t3);
      }
      .card-count.some {
        background: rgba(var(--rgb-light-glow), 0.15);
        color: var(--c-light-glow);
      }
      .card-count.all {
        background: rgba(var(--rgb-light-glow), 0.2);
        color: var(--c-light-glow);
      }

      /* ── Toggle All ── */
      .toggle-all {
        position: relative;
        width: 2.5rem;
        height: 1.375rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b2);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast);
        padding: 0;
        outline: none;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle-all::after {
        content: '';
        position: absolute;
        top: 0.1875rem;
        left: 0.1875rem;
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        background: var(--t3);
        transition:
          transform var(--t-fast),
          background var(--t-fast),
          box-shadow var(--t-fast);
      }
      .toggle-all.on {
        background: rgba(var(--rgb-light-glow), 0.2);
        border-color: rgba(var(--rgb-light-glow), 0.3);
      }
      .toggle-all.on::after {
        transform: translateX(1.125rem);
        background: var(--c-light-glow);
        box-shadow: 0 0 8px rgba(var(--rgb-light-glow), 0.4);
      }

      /* ── Card Body ── */
      .card {
        position: relative;
        padding: 0.125rem 0.875rem;
      }
      .card-inner {
        position: relative;
        z-index: 1;
      }

      /* ── Tint (dynamic) ── */
      .tint {
        transition:
          opacity var(--t-slow),
          background var(--t-slow);
      }

      /* ── Lights Grid ── */
      .lights-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
      }
      :host([size="xs"]) .lights-grid,
      :host([size="sm"]) .lights-grid {
        grid-template-columns: 1fr;
      }

      /* ── Light Row ── */
      .light-row {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        grid-column: 1 / -1;
        padding: 0.5rem 0.25rem;
        position: relative;
        transition: background var(--t-fast);
        border-radius: var(--radius-md);
        -webkit-tap-highlight-color: transparent;
        user-select: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .light-row:hover {
          background: var(--s1);
        }
      }
      @media (pointer: coarse) {
        .light-row:active { animation: bounce 0.3s ease; }
      }
      .light-row.compact {
        grid-column: span 1;
        min-width: 0;
        overflow: hidden;
      }
      .light-row.compact-right {
        padding-left: 0.625rem;
      }
      .light-row.compact-right::before {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        bottom: 20%;
        width: 0.0625rem;
        background: linear-gradient(
          to bottom,
          transparent,
          rgba(var(--rgb-white), 0.08) 30%,
          rgba(var(--rgb-white), 0.08) 70%,
          transparent
        );
      }

      /* ── Icon Button ── */
      .light-icon-btn {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        cursor: pointer;
        padding: 0;
        outline: none;
        font-family: inherit;
        color: var(--t3);
        transition:
          color var(--t-fast),
          background var(--t-fast),
          border-color var(--t-fast),
          filter var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .light-icon-btn ha-icon {
        --mdc-icon-size: var(--icon-md);
        display: flex; align-items: center; justify-content: center;
      }
      .light-icon-btn.on {
        background: rgba(var(--rgb-light-glow), 0.1);
        border-color: rgba(var(--rgb-light-glow), 0.15);
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.4));
      }
      .light-icon-btn.on.rgb {
        background: var(--light-rgb-bg);
        border-color: var(--light-rgb-border);
        color: var(--light-rgb);
        filter: drop-shadow(0 0 6px var(--light-rgb-glow));
      }
      .entity-unavailable .light-icon-btn {
        border-color: var(--c-alert);
      }

      /* ── Expand Button ── */
      .light-expand-btn {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        background: transparent;
        border: none;
        padding: 0;
        font-family: inherit;
        outline: none;
        text-align: left;
        color: inherit;
        cursor: pointer;
      }

      /* ── Light Info ── */
      .light-info {
        flex: 1;
        min-width: 0;
      }
      .light-name {
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
      }
      .light-sub {
        display: flex;
        align-items: center;
        gap: 0.3125rem;
        margin-top: 0.125rem;
      }
      .light-brightness-text {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
        transition: color var(--t-med);
      }
      .light-row[data-on='true'] .light-brightness-text {
        color: rgba(var(--rgb-light-glow), 0.55);
      }
      .light-row[data-on='true'][data-rgb] .light-brightness-text {
        color: var(--light-rgb-sub, rgba(var(--rgb-light-glow), 0.55));
      }
      .light-temp-dot {
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        transition: background var(--t-med);
      }
      .light-temp-text {
        font-size: var(--fz-sm);
        font-weight: 400;
        color: var(--t4);
      }

      /* ── Status Dot ── */
      .light-dot {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
        transition: background var(--t-med), box-shadow var(--t-med);
      }
      .light-row[data-on='true'] .light-dot {
        background: var(--c-light-glow);
        box-shadow: 0 0 8px rgba(var(--rgb-light-glow), 0.5);
      }
      .light-row[data-on='true'][data-rgb] .light-dot {
        background: var(--light-rgb);
        box-shadow: 0 0 8px var(--light-rgb-glow);
      }

      /* Unavailable badge inline (replaces dot) */
      .light-expand-btn .unavailable-badge {
        position: static;
        flex-shrink: 0;
        --mdc-icon-size: 0.75rem;
        color: var(--c-warning);
      }

      /* ── Control Fold ── */
      .ctrl-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        grid-column: 1 / -1;
        pointer-events: none;
      }
      .ctrl-fold.open {
        grid-template-rows: 1fr;
        pointer-events: auto;
      }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .ctrl-fold.open .ctrl-fold-inner {
        opacity: 1;
        transition-delay: 0.1s;
      }
      .fold-sep {
        height: 0.0625rem;
        margin: 0 0.75rem;
        overflow: hidden;
        background: linear-gradient(90deg, transparent, var(--fold-color, rgba(var(--rgb-light-glow),0.25)), transparent);
        opacity: 0;
        transition: opacity var(--t-layout);
        grid-column: 1 / -1;
      }
      .fold-sep.visible { opacity: 1; }
      .ctrl-panel {
        padding: 0.375rem 0 0.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
      }
      .ctrl-label {
        font-size: var(--fz-sm);
        font-weight: 600;
        letter-spacing: 0.5px;
        color: rgba(var(--rgb-light-glow), 0.6);
      }
      .ctrl-panel[data-rgb] .ctrl-label {
        color: var(--light-rgb-sub, rgba(var(--rgb-light-glow), 0.6));
      }

      /* ── Slider ── */
      .slider-wrap { display: flex; align-items: center; gap: 0.5rem; }
      .slider-icon {
        display: flex; align-items: center; justify-content: center;
        width: 1.75rem; height: 1.75rem; flex-shrink: 0;
      }
      .slider-icon ha-icon {
        --mdc-icon-size: 1.125rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      glass-slider { flex: 1; }

      /* ── Color Controls ── */
      .color-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        padding: 0.125rem 0;
      }
      .cdot {
        width: 1.625rem;
        height: 1.625rem;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        transition: transform var(--t-fast), border-color var(--t-fast);
        padding: 0;
        outline: none;
        background: none;
        position: relative;
        -webkit-tap-highlight-color: transparent;
      }
      .cdot::before {
        content: '';
        position: absolute;
        inset: 2px;
        border-radius: 50%;
        background: var(--cdot-color);
      }
      @media (hover: hover) and (pointer: fine) {
        .cdot:hover { transform: scale(1.15); }
        .cdot:active { transform: scale(1.1); }
      }
      @media (pointer: coarse) {
        .cdot:active { animation: bounce 0.3s ease; }
      }
      .cdot.active { border-color: rgba(var(--rgb-white), 0.6); }
      .effect-chip {
        width: auto; height: auto;
        border-radius: var(--radius-md);
        padding: 4px 8px;
        font-size: var(--fz-xs); font-weight: 600;
        letter-spacing: 0.5px; text-transform: uppercase;
        color: var(--t3); border: 1px solid var(--b2); background: var(--s1);
        transition: color var(--t-fast), background var(--t-fast), border-color var(--t-fast);
      }
      .effect-chip.active {
        color: var(--t1);
        border-color: rgba(var(--rgb-white), 0.35);
        background: var(--s2);
      }
      @media (hover: hover) and (pointer: fine) {
        .effect-chip:hover { transform: none; background: var(--s2); }
        .effect-chip:active { transform: none; }
      }
      @media (pointer: coarse) {
        .effect-chip:active { animation: none; transform: scale(0.96); }
      }
      .color-picker-btn {
        width: 1.625rem;
        height: 1.625rem;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        padding: 0;
        outline: none;
        background: none;
        -webkit-tap-highlight-color: transparent;
        transition: transform var(--t-fast);
        flex-shrink: 0;
        position: relative;
      }
      .color-picker-btn::before {
        content: '';
        position: absolute;
        inset: 2px;
        border-radius: 50%;
        background: conic-gradient(
          hsl(0,80%,60%), hsl(60,80%,55%), hsl(120,70%,50%),
          hsl(180,75%,50%), hsl(240,75%,60%), hsl(300,75%,55%), hsl(360,80%,60%)
        );
      }
      @media (hover: hover) and (pointer: fine) {
        .color-picker-btn:hover { transform: scale(1.15); }
      }
      @media (pointer: coarse) {
        .color-picker-btn:active { animation: bounce 0.3s ease; }
      }

      /* ── Color Picker Popup ── */
      .color-picker-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--rgb-black), 0.4);
        backdrop-filter: var(--blur-sm);
        -webkit-backdrop-filter: var(--blur-sm);
        animation: cpFadeIn 0.2s ease;
      }
      @keyframes cpFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .color-picker-dialog {
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.08) 0%, rgba(var(--rgb-white),0.03) 50%, rgba(var(--rgb-white),0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2);
        border-radius: var(--radius-xl);
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 8px 32px rgba(var(--rgb-black),0.4), 0 2px 8px rgba(var(--rgb-black),0.15);
        max-width: 18.75rem;
        width: 90vw;
      }
      .color-picker-dialog .cp-title {
        font-size: var(--fz-base);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t3);
      }
      .cp-wheel-wrap {
        position: relative;
        width: 13.75rem;
        height: 13.75rem;
      }
      .cp-wheel-wrap canvas {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        cursor: crosshair;
      }
      .cp-cursor {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 6px rgba(var(--rgb-black),0.6), 0 0 0 1px rgba(var(--rgb-black),0.2);
        pointer-events: none;
        transform: translate(-50%, calc(-50% - 28px));
        transition: left 0.05s, top 0.05s;
      }
      .cp-cursor::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.125rem;
        height: 0.625rem;
        background: rgba(var(--rgb-white),0.5);
        border-radius: 1px;
      }
      .cp-preview {
        width: 100%;
        height: 2.25rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
      }
      .cp-hex {
        font-size: var(--fz-base); font-weight: 600; color: var(--t2);
        font-family: monospace; letter-spacing: 0.5px;
      }
      .cp-close {
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t2);
        background: var(--s2);
        border: 1px solid var(--b2);
        border-radius: var(--radius-md);
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      /* Focus-visible ring */
      .toggle-all:focus-visible,
      .light-icon-btn:focus-visible,
      .light-expand-btn:focus-visible,
      .cdot:focus-visible,
      .color-picker-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Dashboard Mode ── */
      .dashboard-row {
        display: contents;
        animation: dashRowIn 0.4s var(--ease-std) both;
      }
      .dashboard-row:nth-child(1) { animation-delay: 0ms; }
      .dashboard-row:nth-child(2) { animation-delay: 50ms; }
      .dashboard-row:nth-child(3) { animation-delay: 100ms; }
      @keyframes dashRowIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .dashboard-overflow {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
        text-align: center;
        padding: 0.375rem 0 0.125rem;
        letter-spacing: 0.3px;
        grid-column: 1 / -1;
      }
    `]}setConfig(e){super.setConfig(e)}getCardSize(){if(this._isDashboardMode){const e=this._getLights().length;return 0===e?1:Math.min(e,6)+1}return 3}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null),null!==this._colorPickerEntity&&(this._colorPickerEntity=null,this._colorPickerPos=null)}connectedCallback(){super.connectedCallback(),this._listen("room-config-changed",e=>{const t=this.areaId||this._config?.area;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._dashboardTotalCache=void 0,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadDashboardHidden())}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadSchedules()}),this._listen("light-config-changed",()=>{this._lightConfigLoaded=!1,this._loadLightConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear(),this._backend=void 0,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1}async _loadRoomConfig(){const e=this.areaId||this._config?.area;if(e&&this.hass&&!this._roomConfigLoaded){this._roomConfigLoaded=!0,this._lastLoadedAreaId=e;try{this._backend||(this._backend=new dt(this.hass));const t=await this._backend.send("get_room",{area_id:e});if((this.areaId||this._config?.area)!==e)return;this._roomConfig=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadLightConfig(){if(this.hass&&!this._lightConfigLoaded){this._lightConfigLoaded=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_config");e?.light_card&&(this._showHeader=e.light_card.show_header??!0)}catch{}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new dt(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardTotalCache=void 0,this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedLightIds=void 0,this._lightsFingerprint="",this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear()}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?ct("light",this.hass,this.visibleAreaIds):this._getLights().map(e=>e.entity_id)}updated(e){super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._lightConfigLoaded&&this._loadLightConfig();const t=this.areaId||this._config?.area;if(t&&this.hass&&(this._lastLoadedAreaId!==t&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedLightIds=void 0,this._lightsFingerprint="")}e.has("visibleAreaIds")&&(this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardHiddenLoaded=!1);const i=this._getLightInfos();if(i.some(e=>e.isOn)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on"),e.has("hass")&&this._dragValues.size>0){let e=!1;const t=new Map(this._dragValues);for(const a of i){const i=`bri:${a.entityId}`,r=t.get(i);void 0!==r&&Math.abs(a.brightnessPct-r)<=2&&(t.delete(i),e=!0);const s=`temp:${a.entityId}`,o=t.get(s);void 0!==o&&null!==a.colorTempKelvin&&Math.abs(a.colorTempKelvin-o)<=50&&(t.delete(s),e=!0)}e&&(this._dragValues=t)}if(this._colorPickerEntity){const e=this.renderRoot.querySelector(".cp-wheel-wrap canvas");e&&e.dataset.drawnFor!==this._colorPickerEntity&&(!function(e){const t=e.getBoundingClientRect(),i=Math.round(t.width)||220,a=window.devicePixelRatio||1;e.width=i*a,e.height=i*a;const r=e.getContext("2d");if(!r)return;r.scale(a,a);const s=i/2,o=i/2,n=i/2;for(let l=0;l<360;l++){const e=(l-1)*Math.PI/180,t=(l+1)*Math.PI/180,i=r.createRadialGradient(s,o,0,s,o,n),[a,c,d]=qe(l,1);i.addColorStop(0,"#ffffff"),i.addColorStop(1,`rgb(${a},${c},${d})`),r.beginPath(),r.moveTo(s,o),r.arc(s,o,n,e,t),r.closePath(),r.fillStyle=i,r.fill()}}(e),e.dataset.drawnFor=this._colorPickerEntity)}}_getLights(){if(!this.hass)return[];const e=this._getLightIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._lightsFingerprint&&this._cachedLightsResult)return this._cachedLightsResult;let i;return this._lightsFingerprint=t,i=this._isDashboardMode?e.map(e=>this.hass?.states[e]).filter(e=>!!e&&"on"===e.state&&lt(e.entity_id,this._schedules)).sort((e,t)=>{const i=e.attributes.friendly_name||e.entity_id,a=t.attributes.friendly_name||t.entity_id;return i.localeCompare(a)}):e.map(e=>this.hass?.states[e]).filter(e=>void 0!==e),this._cachedLightsResult=i,i}_getLightIds(){return this._cachedLightIds||(this._cachedLightIds=this._computeLightIds()),this._cachedLightIds}_computeLightIds(){if(!this.hass)return[];const e=this.areaId||this._config?.area;if(e){const t=this._config?.hidden_entities??[],i=this._roomConfig?.hidden_entities??[],a=new Set([...t,...i]),r=nt(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light.")&&!a.has(e.entity_id)&&lt(e.entity_id,this._schedules)).map(e=>e.entity_id),s=this._config?.entity_order??[],o=s.length>0?s:this._roomConfig?.entity_order??[];if(o.length>0){const e=new Map;o.forEach((t,i)=>e.set(t,i)),r.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return r}if(this._config?.entity)return lt(this._config.entity,this._schedules)&&this.hass.states[this._config.entity]?[this._config.entity]:[];if(this._isDashboardMode){const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of nt(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getDashboardLightTotal(){if(!this.hass||!this.hass.entities||!this.hass.devices)return 0;if(void 0!==this._dashboardTotalCache&&this._dashboardTotalEntitiesRef===this.hass.entities)return this._dashboardTotalCache;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length)return 0;const t=new Set;for(const i of e)for(const e of nt(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.add(e.entity_id);return this._dashboardTotalEntitiesRef=this.hass.entities,this._dashboardTotalCache=t.size,t.size}_getLightInfos(){return this._getLights().map(e=>this._buildLightInfo(e))}_buildLightInfo(e){const t="on"===e.state,i=function(e){const t=e.attributes.supported_color_modes;return t&&0!==t.length?t.some(e=>["hs","rgb","rgbw","rgbww","xy"].includes(e))?"rgb":t.includes("color_temp")?"color_temp":t.includes("brightness")?"dimmable":"simple":void 0!==e.attributes.brightness?"dimmable":"simple"}(e),a=e.attributes.brightness,r=t&&void 0!==a?Math.round(a/255*100):0;let s=null;const o=e.attributes.min_color_temp_kelvin||2e3,n=e.attributes.max_color_temp_kelvin||6500;t&&"color_temp"===i&&(s=e.attributes.color_temp_kelvin||null);let l=null;t&&"rgb"===i&&(l=e.attributes.rgb_color||null);const c=this.hass?.entities[e.entity_id]?.icon,d=e.attributes.icon,h=c||d||"mdi:lightbulb";return{entity:e,entityId:e.entity_id,name:e.attributes.friendly_name||e.entity_id,icon:h,isOn:t,type:i,brightnessPct:r,colorTempKelvin:s,minKelvin:o,maxKelvin:n,rgbColor:l}}_toggleLight(e){st(this,"light"),this._safeCallService("light","toggle",{},{entity_id:e})}_toggleAll(){st(this,"light");const e=this._getLights(),t=e.some(e=>"on"===e.state),i=t?"turn_off":"turn_on",a=e.map(e=>e.entity_id);this._safeCallService("light",i,{},{entity_id:a}),t&&(this._expandedEntity=null)}_turnAllOff(){const e=this._getLights().map(e=>e.entity_id);this._safeCallService("light","turn_off",{},{entity_id:e}),this._expandedEntity=null}_hasControls(e){if("simple"!==e.type)return!0;const t=e.entity.attributes.effect_list;if(t&&t.length>0){const e=t.map(e=>e.toLowerCase());if(ft.filter(t=>"off"===t||e.includes(t)).length>1)return!0}return!1}_expandFold(e,t,i){i||(i=this._getLightInfos().find(t=>t.entityId===e)),i&&!this._hasControls(i)||(t?this._expandedEntity===e?this._expandedEntity=null:this._expandedEntity=e:this._toggleLight(e))}_onSliderInput(e,t,i){const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a;const r=this._throttleTimers.get(e);void 0!==r&&clearTimeout(r),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),i(this._dragValues.get(e)??t)},100))}_onSliderChange(e,t,i){st(this,"light");const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a,i(t);const r=this._throttleTimers.get(e);void 0!==r&&clearTimeout(r),this._throttleTimers.delete(e)}_setBrightness(e,t){this._safeCallService("light","turn_on",{brightness_pct:t},{entity_id:e})}_setColorTemp(e,t){this._safeCallService("light","turn_on",{color_temp_kelvin:t},{entity_id:e})}_setHsColor(e,t,i){this._safeCallService("light","turn_on",{hs_color:[t,100*i]},{entity_id:e})}_setEffect(e,t){this._safeCallService("light","turn_on",{effect:t},{entity_id:e})}_openColorPicker(e,t){this._colorPickerEntity=e,this._colorPickerRgb=t??[255,255,255],this._colorPickerPos=t?function(e){const{h:t,s:i}=He(e),a=Math.min(i,1),r=t*Math.PI/180;return{x:Math.cos(r)*a*50+50,y:Math.sin(r)*a*50+50}}(t):null,this._colorPickerHs=t?He(t):null}_closeColorPicker(){this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null}_onWheelInteraction(e){const t=this._wheelCanvas;if(!t)return;const i=function(e,t,i){const a=e.getBoundingClientRect(),r=t-a.left-a.width/2,s=i-a.top-a.height/2,o=a.width/2,n=Math.sqrt(r*r+s*s),l=Math.min(n,o),c=(180*Math.atan2(s,r)/Math.PI%360+360)%360,d=l/o,h=qe(c,d),p=n>0?l/n:1;return{rgb:h,hex:Ne(h),hs:{h:c,s:d},pos:{x:r*p/o*50+50,y:s*p/o*50+50}}}(t,"touches"in e?e.touches[0].clientX:e.clientX,"touches"in e?e.touches[0].clientY:e.clientY);if(this._colorPickerPos=i.pos,this._colorPickerRgb=i.rgb,this._colorPickerHs=i.hs,this._colorPickerEntity){const e=`cp:${this._colorPickerEntity}`,t=this._throttleTimers.get(e);void 0!==t&&clearTimeout(t),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},150))}}_getEntityLayout(e){const t=this._config?.entity_layouts??{},i=this._roomConfig?.entity_layouts??{};return"full"===(t[e]||i[e])?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_buildLayout(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;r?(t.push({kind:"compact-pair",left:a,right:r}),i+=2):(t.push({kind:"full",light:a}),i++)}else t.push({kind:"full",light:a}),i++}return t}_computeTint(e){const t=e.filter(e=>e.isOn);if(0===t.length)return null;const i=t.length/e.length;let a="#fbbf24";const r=t.find(e=>"rgb"===e.type&&e.rgbColor);return r?.rgbColor&&(a=Ne(r.rgbColor)),{background:`radial-gradient(ellipse at 30% 30%, ${a}, transparent 70%)`,opacity:(.18*i).toFixed(3)}}_renderSubText(e){if(!e.isOn)return X`<span class="light-brightness-text">${Qe("common.off")}</span>`;if("simple"===e.type)return X`<span class="light-brightness-text">${Qe("common.on")}</span>`;const t=[X`<span class="light-brightness-text">${e.brightnessPct}%</span>`];if("color_temp"===e.type&&e.colorTempKelvin){const i=gt(e.colorTempKelvin);t.push(X`<span class="light-temp-dot" style="background:${i.color}"></span>`),t.push(X`<span class="light-temp-text">${i.label}</span>`)}if("rgb"===e.type&&e.rgbColor){const i=Ne(e.rgbColor);t.push(X`<span class="light-temp-dot" style="background:${i}"></span>`),t.push(X`<span class="light-temp-text">${Qe("light.color")}</span>`)}return t}_renderLightRow(e,t,i){const a=Ue(e.entity.state),r=["light-row",t?"compact":"",i?"compact-right":"",a?"entity-unavailable":""].filter(Boolean).join(" "),s=e.isOn&&"rgb"===e.type&&e.rgbColor?`--light-rgb:${Ne(e.rgbColor)};--light-rgb-bg:${mt(e.rgbColor,.1)};--light-rgb-border:${mt(e.rgbColor,.15)};--light-rgb-glow:${mt(e.rgbColor,.4)};--light-rgb-sub:${mt(e.rgbColor,.55)}`:"",o=["light-icon-btn",e.isOn?"on":"",e.isOn&&e.rgbColor?"rgb":""].filter(Boolean).join(" "),n=this._bindGesture({onTap:()=>this._toggleLight(e.entityId),onLongPress:()=>this._expandFold(e.entityId,e.isOn,e),exclude:".light-icon-btn"});return X`
      <div
        class=${r}
        data-on=${e.isOn}
        style=${s}
        ?data-rgb=${e.isOn&&"rgb"===e.type&&!!e.rgbColor}
        @pointerdown=${n.pointerdown}
        @pointerup=${n.pointerup}
        @pointermove=${n.pointermove}
        @pointercancel=${n.pointercancel}
        @contextmenu=${n.contextmenu}
      >
        <button
          class=${o}
          style=${s}
          @click=${()=>this._toggleLight(e.entityId)}
          aria-label="${Qe("light.toggle_aria",{name:e.name})}"
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
        <button
          class="light-expand-btn"
          aria-label="${e.isOn?Qe("light.expand_aria",{name:e.name}):e.name}"
          aria-expanded=${e.isOn?this._expandedEntity===e.entityId?"true":"false":J}
        >
          <div class="light-info">
            <div class="light-name">${Ae(e.name,t?12:Ee)}</div>
            <div class="light-sub">${this._renderSubText(e)}</div>
          </div>
          ${a?X`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:X`<span class="light-dot"></span>`}
        </button>
      </div>
    `}_getSliderColor(e){if("rgb"===e.type&&e.rgbColor){const[t,i,a]=e.rgbColor;return`${t},${i},${a}`}if("color_temp"===e.type&&e.colorTempKelvin){const t=gt(e.colorTempKelvin).color;return`${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)}`}return"var(--rgb-light-glow)"}_getFoldColor(e){if(e.rgbColor)return`rgba(${e.rgbColor[0]},${e.rgbColor[1]},${e.rgbColor[2]},0.3)`;if("color_temp"===e.type&&e.colorTempKelvin){const{color:t}=gt(e.colorTempKelvin);return`rgba(${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)},0.3)`}return"rgba(var(--rgb-light-glow),0.25)"}_renderControlFold(e,t=!1){const i=this._expandedEntity===e.entityId&&e.isOn,a="rgb"===e.type,r=this._getSliderColor(e),s=this._getFoldColor(e);return X`
      <div class="fold-sep ${i?"visible":""}" style="--fold-color:${s}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${a}>
            <span class="ctrl-label">${e.name}</span>

            ${"simple"!==e.type?this._renderBrightnessSlider(e,r):J}
            ${"color_temp"===e.type?this._renderTempSlider(e):J}
            ${"rgb"===e.type?this._renderColorRow(e):J}
            ${this._renderEffectChips(e)}
          </div>
        </div>
      </div>
      ${t?J:X`<div class="fold-sep ${i?"visible":""}" style="--fold-color:${s}"></div>`}
    `}_renderColorRow(e){return X`
      <div class="color-row">
        ${_t.map(t=>{const i=!!e.rgbColor&&function(e,t){const i=He(e),a=He(t),r=Math.abs(i.h-a.h);return(r<5||r>355)&&Math.abs(i.s-a.s)<.08}(e.rgbColor,t);return X`
            <button
              class="cdot ${i?"active":""}"
              style="--cdot-color:${Ne(t)}"
              @click=${()=>{const i=He(t);this._setHsColor(e.entityId,i.h,i.s)}}
              aria-label="${Qe("light.color_aria",{hex:Ne(t)})}"
            ></button>
          `})}
        <button
          class="color-picker-btn"
          @click=${()=>this._openColorPicker(e.entityId,e.rgbColor)}
          aria-label="${Qe("light.color_picker_aria")}"
        ></button>
      </div>
    `}_renderEffectChips(e){const t=e.entity.attributes.effect_list;if(!t||0===t.length)return J;const i=ft.filter(e=>"off"===e||t.includes(e));if(i.length<=1)return J;const a=e.entity.attributes.effect?.toLowerCase();return X`
      <div class="color-row" style="flex-wrap:wrap">
        ${i.map(t=>X`
            <button
              class="cdot effect-chip ${a===t||!a&&"off"===t?"active":""}"
              @click=${()=>this._setEffect(e.entityId,t)}
              aria-label="${Qe(`light.effect_${t}`)}"
            >${Qe(`light.effect_${t}`)}</button>
          `)}
      </div>
    `}_renderColorPicker(){if(!this._colorPickerEntity||!this._colorPickerRgb)return J;const e=Ne(this._colorPickerRgb);return X`
      <div class="color-picker-overlay" role="presentation" @click=${e=>{e.target.classList.contains("color-picker-overlay")&&this._closeColorPicker()}}>
        <div class="color-picker-dialog">
          <span class="cp-title">${Qe("light.color_picker_title")}</span>
          <div class="cp-wheel-wrap">
            <canvas
              @mousedown=${e=>{this._wheelCanvas=e.currentTarget,this._onWheelInteraction(e);const t=e=>this._onWheelInteraction(e),i=()=>{a(),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},a=()=>{window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",i),this._cancelWheelDrag=void 0};window.addEventListener("mousemove",t),window.addEventListener("mouseup",i),this._cancelWheelDrag=a}}
              @touchstart=${e=>{e.preventDefault(),this._wheelCanvas=e.currentTarget,this._onWheelInteraction(e);const t=e=>{e.preventDefault(),this._onWheelInteraction(e)},i=()=>{a(),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},a=()=>{window.removeEventListener("touchmove",t),window.removeEventListener("touchend",i),window.removeEventListener("touchcancel",i),this._cancelWheelDrag=void 0};window.addEventListener("touchmove",t,{passive:!1}),window.addEventListener("touchend",i),window.addEventListener("touchcancel",i),this._cancelWheelDrag=a}}
            ></canvas>
            <div class="cp-cursor" style="left:${this._colorPickerPos?.x??50}%;top:${this._colorPickerPos?.y??50}%;background:${e}"></div>
          </div>
          <div class="cp-preview" style="background:${e}"></div>
          <span class="cp-hex">${e}</span>
          <button class="cp-close" @click=${()=>this._closeColorPicker()}>
            ${Qe("common.close")}
          </button>
        </div>
      </div>
    `}_renderBrightnessSlider(e,t){const i=`bri:${e.entityId}`,a=this._dragValues.get(i)??e.brightnessPct;return X`
      <div class="slider-wrap">
        <div class="slider-icon"><ha-icon .icon=${"mdi:brightness-6"}></ha-icon></div>
        <glass-slider
          .value=${a}
          .min=${1}
          .max=${100}
          color="${t}"
          .label=${`${a}%`}
          @glass-slider-input=${t=>this._onSliderInput(i,t.detail.value,t=>this._setBrightness(e.entityId,t))}
          @glass-slider-change=${t=>this._onSliderChange(i,t.detail.value,t=>this._setBrightness(e.entityId,t))}
        ></glass-slider>
      </div>
    `}_renderTempSlider(e){const t=`temp:${e.entityId}`,i=e.colorTempKelvin||e.minKelvin,a=this._dragValues.get(t)??i,r=gt(a).color,s=`${parseInt(r.slice(1,3),16)},${parseInt(r.slice(3,5),16)},${parseInt(r.slice(5,7),16)}`;return X`
      <div class="slider-wrap">
        <div class="slider-icon"><ha-icon .icon=${"mdi:thermometer"}></ha-icon></div>
        <glass-slider
          .value=${a}
          .min=${e.minKelvin}
          .max=${e.maxKelvin}
          color="${s}"
          .label=${`${a}K`}
          @glass-slider-input=${i=>this._onSliderInput(t,i.detail.value,t=>this._setColorTemp(e.entityId,t))}
          @glass-slider-change=${i=>this._onSliderChange(t,i.detail.value,t=>this._setColorTemp(e.entityId,t))}
        ></glass-slider>
      </div>
    `}_renderGrid(e){const t=this._buildLayout(e),i=[];for(let a=0;a<t.length;a++){const e=t[a],r=a===t.length-1;"full"===e.kind?(i.push(this._renderLightRow(e.light,!1,!1)),i.push(this._renderControlFold(e.light,r))):(i.push(this._renderLightRow(e.left,!0,!1)),e.right&&i.push(this._renderLightRow(e.right,!0,!0)),i.push(this._renderControlFold(e.left,r)),e.right&&i.push(this._renderControlFold(e.right,r)))}return i}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],r=i+1<e.length?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(X`
          ${this._renderLightRow(a,!0,!1)}
          ${this._renderLightRow(r,!0,!0)}
          ${this._renderControlFold(a,s)}
          ${this._renderControlFold(r,s)}
        `),i+=2}else t.push(X`
          ${this._renderLightRow(a,!1,!1)}
          ${this._renderControlFold(a,!0)}
        `),i++}return t}_renderDashboard(){const e=this._getLightInfos();if(0===e.length)return J;const t=e.slice(0,6),i=e.length-6,a=this._computeTint(e),r=e.length,s=Math.max(this._getDashboardLightTotal(),r),o=r===s?"all":"some";return X`
      ${this._showHeader?X`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${Qe("light.dashboard_title")}</span>
            <span class="card-count ${o}">${r}/${s}</span>
          </div>
          <button
            class="toggle-all on"
            role="switch"
            aria-checked="true"
            @click=${()=>this._turnAllOff()}
            aria-label="${Qe("light.dashboard_turn_all_off_aria")}"
          ></button>
        </div>
      `:J}

      <div class="card glass">
        <div
          class="tint"
          style=${a?`background:${a.background};opacity:${a.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(t)}
          </div>
          ${i>0?X`<div class="dashboard-overflow">
                ${Qe("light.dashboard_overflow",{count:String(i)})}
              </div>`:J}
        </div>
      </div>
      ${this._renderColorPicker()}
    `}render(){if(this._lang,this._isDashboardMode){const e=this._renderDashboard();return this.style.display=e===J?"none":"",e}const e=this._getLightInfos();if(0===e.length)return this.style.display="none",J;this.style.display="";const t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,r=0===t?"none":t===i?"all":"some",s=this._computeTint(e);return X`
      ${this._showHeader?X`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${Qe("light.title")}</span>
            <span class="card-count ${r}">${t}/${i}</span>
          </div>
          <button
            class="toggle-all ${a?"on":""}"
            @click=${()=>this._toggleAll()}
            role="switch"
            aria-checked=${a?"true":"false"}
            aria-label="${Qe(a?"light.toggle_all_on_aria":"light.toggle_all_off_aria")}"
          ></button>
        </div>
      `:J}

      <div class="card glass">
        <div
          class="tint"
          style=${s?`background:${s.background};opacity:${s.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">${this._renderGrid(e)}</div>
        </div>
      </div>
      ${this._renderColorPicker()}
    `}}pt([we({attribute:!1})],bt.prototype,"areaId"),pt([we({attribute:!1})],bt.prototype,"visibleAreaIds"),pt([xe()],bt.prototype,"_expandedEntity"),pt([xe()],bt.prototype,"_dragValues"),pt([xe()],bt.prototype,"_colorPickerEntity"),pt([xe()],bt.prototype,"_colorPickerRgb"),pt([xe()],bt.prototype,"_colorPickerPos"),pt([xe()],bt.prototype,"_showHeader");try{customElements.define("glass-light-card",bt)}catch{}tt("glass-room-popup-editor");var vt=Object.defineProperty,yt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&vt(t,i,s),s};const wt=class e extends ue{constructor(){super(...arguments),this._lang=Xe(),this._areaId=null,this._open=!1,this._scenesOpen=!1,this._activeSceneId=null,this._peekedRooms=new Set,this._boundKeydown=this._onKeydown.bind(this),this._roomConfigs=new Map,this._loadingRooms=new Set,this._busCleanups=[],this._swipeClass="",this._swipeAnimating=!1,this._popupAutoClose=0,this._globalConfigLoaded=!1}static getConfigElement(){return document.createElement("glass-room-popup-editor")}getCardSize(){return 0}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;if(this._swipeAnimating)return!1;if(!this._open)return!1;const t=e.get("hass");if(!t||!this.hass||!this._areaId)return!0;const i=nt(this._areaId,this.hass.entities,this.hass.devices),a=this.hass;return i.some(e=>t.states[e.entity_id]!==a.states[e.entity_id])}static{this.styles=[Se,Ie,Te,Pe,h`
      :host {
        pointer-events: none;
      }

      .overlay {
        position: fixed;
        inset: 0;
        z-index: 9995;
        background: rgba(var(--rgb-black), 0.5);
        opacity: 0;
        transition: opacity 0.3s var(--ease-std);
        pointer-events: none;
      }
      :host([open]) .overlay {
        opacity: 1;
        pointer-events: auto;
      }

      .dialog {
        position: fixed;
        bottom: 5.625rem;
        left: 50%;
        z-index: 9999;
        transform: translateX(-50%) scale(0.3);
        transform-origin: center bottom;
        width: calc(100vw - 1rem);
        max-width: 31.25rem;
        min-height: calc(100vh - 7.5rem);
        max-height: calc(100vh - 7.5rem);
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        opacity: 0;
        pointer-events: none;
        transition:
          transform 0.45s var(--ease-out),
          opacity 0.3s var(--ease-std);
        padding: 1rem;
        box-sizing: border-box;
      }
      .dialog::-webkit-scrollbar {
        display: none;
      }
      :host([open]) .dialog {
        transform: translateX(-50%) scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      @keyframes swipe-exit-l {
        0%   { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(-25%) scale(0.95); opacity: 0; }
      }
      @keyframes swipe-enter-r {
        0%   { transform: translateX(25%) scale(0.95); opacity: 0; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }
      @keyframes swipe-exit-r {
        0%   { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(25%) scale(0.95); opacity: 0; }
      }
      @keyframes swipe-enter-l {
        0%   { transform: translateX(-25%) scale(0.95); opacity: 0; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
      }

      .dialog-inner.swipe-exit-left,
      .dialog-inner.swipe-exit-right,
      .dialog-inner.swipe-enter-right,
      .dialog-inner.swipe-enter-left {
        will-change: transform, opacity;
        pointer-events: none;
      }
      .dialog-inner.swipe-exit-left {
        animation: swipe-exit-l 180ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards;
      }
      .dialog-inner.swipe-enter-right {
        animation: swipe-enter-r 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .dialog-inner.swipe-exit-right {
        animation: swipe-exit-r 180ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards;
      }
      .dialog-inner.swipe-enter-left {
        animation: swipe-enter-l 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0;
      }
      .header-sep {
        height: 0.0625rem; margin: 0.5rem 0.75rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .header-icon {
        min-width: 2.75rem;
        min-height: 2.75rem;
        width: 2.75rem;
        height: 2.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        color: var(--t2);
        cursor: pointer;
        padding: 0;
        font-family: inherit;
        outline: none;
        transition: transform var(--t-fast);
      }
      .header-icon ha-icon,
      .close-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .header-icon.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6));
      }
      .header-icon.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      @keyframes pulse-music {
        0%,
        100% {
          transform: scale(1);
        }
        30% {
          transform: scale(1.2);
        }
        50% {
          transform: scale(0.95);
        }
        70% {
          transform: scale(1.1);
        }
      }
      .scene-dash {
        width: 1rem;
        height: 0.1875rem;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 0.375rem;
        opacity: 0;
        transform-origin: center;
        transform: scaleX(0.75);
        transition:
          opacity 0.3s var(--ease-std),
          transform 0.3s var(--ease-std);
      }
      .scene-dash.visible {
        opacity: 1;
        transform: scaleX(1);
      }
      .header-info {
        flex: 1;
        min-width: 0;
      }
      .header-name {
        font-size: var(--fz-lg);
        font-weight: 700;
        color: var(--t1);
      }
      .header-meta {
        display: flex;
        gap: 0.625rem;
        font-size: var(--fz-base);
        color: var(--t3);
        font-weight: 500;
      }
      .sensor-warn {
        color: var(--c-warning, #f59e0b);
        font-size: var(--fz-sm);
        font-style: italic;
      }
      .close-btn {
        background: transparent;
        border: 1px solid var(--b1);
        width: 1.75rem;
        height: 1.75rem;
        min-width: 2.75rem;
        min-height: 2.75rem;
        border-radius: var(--radius-sm);
        color: var(--t3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: inherit;
        outline: none;
        transition: background var(--t-fast);
        flex-shrink: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .close-btn:hover {
          background: var(--s3);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .close-btn:active {
          background: var(--s3);
        }
      }
      @media (pointer: coarse) {
        .close-btn:active {
          animation: bounce 0.3s ease;
        }
      }

      /* Focus-visible ring */
      .header-icon:focus-visible,
      .close-btn:focus-visible,
      .scene-chip:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* Scene grid fold */
      .scenes-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.6s var(--ease-std);
      }
      .scenes-wrapper.open {
        grid-template-rows: 1fr;
      }
      .scenes-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.5s var(--ease-std);
      }
      .scenes-wrapper.open .scenes-inner {
        opacity: 1;
      }
      .scene-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        padding: 0 0 0.75rem;
      }
      .scene-chip {
        background: rgba(var(--rgb-white), 0.04);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        min-height: 2.75rem;
        padding: 0.3125rem 0.75rem;
        font-size: var(--fz-sm);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t3);
        cursor: pointer;
        font-family: inherit;
        outline: none;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .scene-chip:hover {
          background: var(--s3);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .scene-chip:active {
          background: var(--s3);
        }
      }
      @media (pointer: coarse) {
        .scene-chip:active {
          animation: bounce 0.3s ease;
        }
      }
      .scene-chip.active {
        background: rgba(var(--rgb-white), 0.12);
        border-color: rgba(var(--rgb-white), 0.18);
        color: var(--t1);
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

    `]}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigs.clear(),this._loadingRooms.clear()),this.hass.language&&Ke(this.hass.language)&&(this._lang=Xe()))}_listen(e,t){this._busCleanups.push(i.on(e,t))}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._listen("popup-open",e=>this._handleOpen(e)),this._listen("popup-close",()=>this._handleClose()),this._listen("room-config-changed",e=>{void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._roomConfigs.delete(e.areaId),this._peekedRooms.delete(e.areaId),this._areaId===e.areaId&&this._loadRoomConfig(e.areaId)}),this._listen("navbar-config-changed",()=>{void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._roomConfigs.clear(),this._loadingRooms.clear(),this._globalConfigLoaded=!1,this._loadGlobalConfig(),this._areaId&&this._loadRoomConfig(this._areaId)}),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),void 0!==this._autoCloseTimeout&&(clearTimeout(this._autoCloseTimeout),this._autoCloseTimeout=void 0),this._peekedRooms.clear(),this._loadingRooms.clear(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],this._backend=void 0,void 0!==this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=void 0),this._swipeAnimating=!1,this._swipeClass="",this._pendingSwipe=void 0,this._currentRoomIndex=void 0,document.removeEventListener("keydown",this._boundKeydown)}_collapseExpanded(){this._scenesOpen&&(this._scenesOpen=!1)}_handleOpen(e){if(this._loadGlobalConfig(),this._open&&this._areaId&&this._areaId!==e.areaId&&void 0!==e.roomIndex&&void 0!==this._currentRoomIndex){if(this._swipeAnimating)return void(this._pendingSwipe=e);const t=e.roomIndex>this._currentRoomIndex?"left":"right";return this._swipeAnimating=!0,this._swipeClass="left"===t?"swipe-exit-left":"swipe-exit-right",void 0!==this._autoCloseTimeout&&(clearTimeout(this._autoCloseTimeout),this._autoCloseTimeout=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void(this._swipeAnimTimer=setTimeout(()=>{this._swipeAnimTimer=void 0,this._areaId=e.areaId,this._currentRoomIndex=e.roomIndex,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(e.areaId),requestAnimationFrame(()=>requestAnimationFrame(()=>{this._swipeClass="left"===t?"swipe-enter-right":"swipe-enter-left",this._swipeAnimTimer=setTimeout(()=>{if(this._swipeAnimTimer=void 0,this._swipeClass="",this._swipeAnimating=!1,this._pendingSwipe){const e=this._pendingSwipe;this._pendingSwipe=void 0,this._handleOpen(e)}},220)}))},180))}this._swipeAnimating?this._pendingSwipe=e:(this._currentRoomIndex=e.roomIndex,void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),this._areaId=e.areaId,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(e.areaId),this._pendingRaf=requestAnimationFrame(()=>{this._pendingRaf=void 0,this._open=!0,this.setAttribute("open","")}))}_maybePeekScenes(e){if(this._peekedRooms.has(e))return;const t=this._getAreaMeta();t&&0!==t.scenes.length&&(this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&this._areaId===e&&(this._peekedRooms.add(e),this._scenesOpen=!0,this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&(this._scenesOpen=!1)},1e3))},400))}_handleClose(){void 0!==this._autoCloseTimeout&&(clearTimeout(this._autoCloseTimeout),this._autoCloseTimeout=void 0),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=void 0),this._swipeAnimating=!1,this._swipeClass="",this._pendingSwipe=void 0,this._currentRoomIndex=void 0,this._open=!1,this.removeAttribute("open"),this._closeTimeout=setTimeout(()=>{this._areaId=null,this._closeTimeout=void 0},350)}_onKeydown(e){"Escape"===e.key&&this._open&&i.emit("popup-close",void 0)}async _loadGlobalConfig(){if(!this._globalConfigLoaded&&this.hass){this._globalConfigLoaded=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_config");this._popupAutoClose=e?.navbar?.popup_auto_close??0}catch{this._popupAutoClose=0}}}async _loadRoomConfig(e){if(this.hass)if(this._roomConfigs.has(e))this._open&&this._areaId===e&&(this._maybePeekScenes(e),this._startAutoCloseTimer(e));else if(!this._loadingRooms.has(e)){this._loadingRooms.add(e);try{this._backend||(this._backend=new dt(this.hass));const t=await this._backend.send("get_room",{area_id:e});this._roomConfigs.set(e,t),this._areaId===e&&this.requestUpdate()}catch{this._roomConfigs.set(e,null)}finally{this._loadingRooms.delete(e)}this._open&&this._areaId===e&&(this._maybePeekScenes(e),this._startAutoCloseTimer(e))}}_startAutoCloseTimer(e){void 0!==this._autoCloseTimeout&&(clearTimeout(this._autoCloseTimeout),this._autoCloseTimeout=void 0),this._popupAutoClose<=0||(this._autoCloseTimeout=setTimeout(()=>{this._autoCloseTimeout=void 0,this._open&&this._areaId===e&&i.emit("popup-close",void 0)},1e3*this._popupAutoClose))}_onOverlayClick(){i.emit("popup-close",void 0)}_getAreaMeta(){if(!this.hass||!this._areaId)return null;const e=this.hass.areas[this._areaId];if(!e)return null;const t=nt(this._areaId,this.hass.entities,this.hass.devices);let i=null,a=null,r=!1,s=!1,o=!1;const n=[],l=new Set,c=e;if(c.temperature_entity_id){const e=this.hass.states[c.temperature_entity_id];e&&"unavailable"!==e.state&&"unknown"!==e.state&&(i=`${e.state}${e.attributes.unit_of_measurement||"°C"}`)}if(c.humidity_entity_id){const e=this.hass.states[c.humidity_entity_id];e&&"unavailable"!==e.state&&"unknown"!==e.state&&(a=`${e.state}%`)}for(const m of t){const e=this.hass?.states[m.entity_id];if(!e)continue;const t=m.entity_id.split(".")[0];if(l.add(t),"light"===t&&"on"===e.state&&(s=!0),"media_player"===t&&"playing"===e.state&&(o=!0),"sensor"===t){const t=e.attributes.device_class,s="unavailable"===e.state||"unknown"===e.state;"temperature"!==t&&"humidity"!==t||!s||(r=!0),s||("temperature"!==t||i||(i=`${e.state}${e.attributes.unit_of_measurement||"°C"}`),"humidity"!==t||a||(a=`${e.state}%`))}"scene"===t&&n.push(e)}const d=this._roomConfigs.get(this._areaId),h=d?.icon??e.icon??"mdi:home",p=new Set(d?.hidden_scenes??[]),u=n.filter(e=>!p.has(e.entity_id)),g=d?.scene_order;if(g&&g.length>0){const e=new Map(g.map((e,t)=>[e,t]));u.sort((t,i)=>(e.get(t.entity_id)??1/0)-(e.get(i.entity_id)??1/0))}return{name:e.name,icon:h,temperature:i,humidity:a,sensorUnavailable:r,hasLight:s,hasMusic:o,scenes:u,domains:[...l]}}_activateScene(e){this._activeSceneId=e,this.hass?.callService("scene","turn_on",{},{entity_id:e})}static{this.DEFAULT_CARD_ORDER=["light","media_player","climate","fan","cover","camera","vacuum"]}_getVisibleCards(t){const i=this._areaId?this._roomConfigs.get(this._areaId):void 0,a=i?.card_order;return a&&a.length>0?a.filter(e=>t.includes(e)):e.DEFAULT_CARD_ORDER.filter(e=>t.includes(e))}_renderDomainCard(e){switch(e){case"light":return X`<glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>`;case"cover":return X`<glass-cover-card .hass=${this.hass} .areaId=${this._areaId}></glass-cover-card>`;case"media_player":return X`<glass-media-card .hass=${this.hass} .areaId=${this._areaId}></glass-media-card>`;case"fan":return X`<glass-fan-card .hass=${this.hass} .areaId=${this._areaId}></glass-fan-card>`;case"climate":return X`<glass-climate-card .hass=${this.hass} .areaId=${this._areaId}></glass-climate-card>`;case"camera":return X`<glass-camera-carousel-card .hass=${this.hass} .areaId=${this._areaId}></glass-camera-carousel-card>`;default:return J}}render(){if(this._lang,!this._areaId)return J;const e=this._getAreaMeta();if(!e)return J;const t=e.scenes.length>0,a=this._getVisibleCards(e.domains);return X`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${e.name}>
        <div class="dialog-inner ${this._swipeClass}">
        <div class="header">
          <div class="header-left">
            <button
              class="header-icon ${e.hasLight?"has-light":""} ${e.hasMusic?"has-music":""}"
              @click=${()=>t&&(this._scenesOpen=!this._scenesOpen)}
              aria-label=${t?Qe("popup.toggle_scenes_aria"):e.name}
              aria-expanded=${t?this._scenesOpen?"true":"false":J}
            >
              <ha-icon .icon=${e.icon}></ha-icon>
            </button>
            <div class="scene-dash ${t?"visible":""}"></div>
          </div>
          <div class="header-info">
            <div class="header-name">${e.name}</div>
            <div class="header-meta">
              ${e.temperature?X`<span>${e.temperature}</span>`:J}
              ${e.humidity?X`<span>${e.humidity}</span>`:J}
              ${!e.sensorUnavailable||e.temperature||e.humidity?J:X`<span class="sensor-warn">${Qe("popup.sensor_unavailable")}</span>`}
            </div>
          </div>
          <button
            class="close-btn"
            @click=${()=>i.emit("popup-close",void 0)}
            aria-label="${Qe("popup.close_aria")}"
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        </div>
        <div class="header-sep"></div>

        ${t?X`
              <div class="scenes-wrapper ${this._scenesOpen?"open":""}">
                <div class="scenes-inner">
                  <div class="scene-chips">
                    ${e.scenes.map(e=>X`
                        <button
                          class="scene-chip ${this._activeSceneId===e.entity_id?"active":""}"
                          @click=${()=>this._activateScene(e.entity_id)}
                          aria-label="${Qe("popup.activate_scene_aria",{name:e.attributes.friendly_name||e.entity_id})}"
                        >
                          ${e.attributes.friendly_name||e.entity_id}
                        </button>
                      `)}
                  </div>
                </div>
              </div>
            `:J}

        <div class="cards">
          ${a.map(e=>this._renderDomainCard(e))}
        </div>
        </div>
      </div>
    `}};yt([we({attribute:!1})],wt.prototype,"hass"),yt([xe()],wt.prototype,"_lang"),yt([xe()],wt.prototype,"_areaId"),yt([xe()],wt.prototype,"_open"),yt([xe()],wt.prototype,"_scenesOpen"),yt([xe()],wt.prototype,"_activeSceneId"),yt([xe()],wt.prototype,"_swipeClass");let xt=wt;try{customElements.define("glass-room-popup",xt)}catch{}tt("glass-navbar-card-editor");var kt=Object.defineProperty,$t=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&kt(t,i,s),s};const Ct={weather:"glass-weather-card",light:"glass-light-card",cover:"glass-cover-card",fan:"glass-fan-card",title:"glass-title-card",spotify:"glass-spotify-card",media:"glass-media-card",presence:"glass-presence-card",climate:"glass-climate-card",camera_carousel:"glass-camera-carousel-card"},St=["title","weather","climate","light","media","fan","cover","spotify","presence","camera_carousel"];class It extends rt{constructor(){super(...arguments),this._items=[],this._activeArea=null,this._scrollMask="none",this._popup=null,this._ownsPopup=!1,this._areaStructure=[],this._lastAreaKeys="",this._cachedEntityFingerprint="",this._boundUpdateMask=this._updateNavMask.bind(this),this._scrollEl=null,this._navbarConfig=null,this._configLoaded=!1,this._configLoading=!1,this._dashboardLoading=!1,this._roomConfigs={},this._flipPositions=new Map,this._litTimestamps=new Map,this._configReady=!1,this._lastAmbientPeriod=null,this._editMode=!1,this._enabledCards=["weather"],this._cardOrder=St,this._dashboardCards=new Map,this._hideHeader=!1,this._hideSidebar=!1,this._headerStyleEl=null,this._sidebarStyleEl=null,this._loadingOverlay=null,this._bgIsLight=!1,this._bgIntersectingCards=new Set}static getConfigElement(){return document.createElement("glass-navbar-card-editor")}static getStubConfig(){return{type:"custom:glass-navbar-card"}}static{this.styles=[Se,Ie,Te,Pe,h`
      :host {
        width: 100%;
        margin: 0 auto;
        padding: 0.375rem 0 5rem; /* top + space for fixed navbar */
        user-select: none;
        -webkit-user-select: none;
      }

      .dashboard-cards {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0 0.75rem 2.8125rem;
      }

      .navbar {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        max-width: 31.25rem;
        width: calc(100vw - 2rem);
        height: 4rem;
        border-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        padding: 0 0.5rem;
        box-sizing: border-box;
        z-index: 9997;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .nav-scroll {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        overflow-x: auto;
        scrollbar-width: none;
        flex: 1;
        padding-block: 0.5rem;
      }
      .nav-scroll::before,
      .nav-scroll::after {
        content: '';
        flex: 1 0 0.5rem;
      }
      .nav-scroll::-webkit-scrollbar {
        display: none;
      }

      /* Adaptive inactive icon color based on background luminance */
      .navbar { --nav-inactive: rgba(var(--rgb-white),0.45); }
      .navbar.bg-light { --nav-inactive: rgba(var(--rgb-black),0.45); }

      .nav-item {
        background: transparent;
        border: none;
        border-radius: var(--radius-lg);
        min-width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.625rem;
        cursor: pointer;
        position: relative;
        color: rgba(var(--rgb-white),0.45);
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          background var(--t-fast),
          color 0.6s ease;
      }
      .navbar.bg-light .nav-item {
        color: rgba(var(--rgb-black),0.45);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-item:hover {
          background: var(--s2);
        }
      }
      @media (pointer: coarse) {
        .nav-item:active {
          animation: bounce 0.3s ease;
        }
      }
      .nav-item.active {
        background: rgba(var(--rgb-white), 0.1);
        color: var(--t1);
      }
      .navbar.bg-light .nav-item.active {
        background: rgba(var(--rgb-black), 0.08);
        color: rgba(var(--rgb-black), 0.85);
      }

      .nav-item ha-icon {
        --mdc-icon-size: 1.5rem;
        flex-shrink: 0;
        transition: color 0.6s ease;
        display: flex; align-items: center; justify-content: center;
      }

      /* 1. Pulse-light: oscillating glow on lights-on icons */
      .nav-item.has-light .nav-content > ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%,
        100% {
          filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6));
        }
        50% {
          filter: drop-shadow(0 0 2px rgba(var(--rgb-light-glow), 0.2));
        }
      }

      .nav-content {
        position: relative;
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
      .nav-item.active .nav-content {
        gap: 0.375rem;
      }

      /* 2. Humidity bar centered on nav-content (icon + label, excludes badge) */
      .humidity-bar {
        position: absolute;
        bottom: -0.375rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.875rem;
        height: 0.1875rem;
        border-radius: 2px;
        background: var(--c-temp-cold);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(var(--rgb-info), 0.4);
      }

      /* 3. Music icon bounce */
      .nav-item.has-music .nav-content > ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      /* Combined: light glow + music bounce */
      .nav-item.has-light.has-music .nav-content > ha-icon {
        color: var(--c-light-glow);
        animation:
          pulse-light 3s ease-in-out infinite,
          pulse-music 0.8s ease-in-out infinite;
      }
      @keyframes pulse-music {
        0%,
        100% {
          transform: scale(1);
        }
        30% {
          transform: scale(1.2);
        }
        50% {
          transform: scale(0.95);
        }
        70% {
          transform: scale(1.1);
        }
      }

      /* 4. Temp badges (hot/cold) */
      .nav-temp-badge {
        position: absolute;
        top: 0.125rem;
        right: 0.25rem;
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .nav-temp-badge ha-icon {
        --mdc-icon-size: var(--icon-xs);
      }
      .nav-item.has-temp-hot .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-alert), 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .nav-item.has-temp-cold .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-info), 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 0 transparent);
        }
        50% {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(var(--rgb-alert), 0.6));
        }
      }
      @keyframes pulse-temp-cold {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 0 transparent);
        }
        50% {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(var(--rgb-info), 0.6));
        }
      }

      /* 5. Dynamic scroll masking */
      .nav-scroll.mask-right {
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 1.25rem), transparent 100%);
        mask-image: linear-gradient(to right, black calc(100% - 1.25rem), transparent 100%);
      }
      .nav-scroll.mask-left {
        -webkit-mask-image: linear-gradient(to left, black calc(100% - 1.25rem), transparent 100%);
        mask-image: linear-gradient(to left, black calc(100% - 1.25rem), transparent 100%);
      }
      .nav-scroll.mask-both {
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 1.25rem,
          black calc(100% - 1.25rem),
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 1.25rem,
          black calc(100% - 1.25rem),
          transparent 100%
        );
      }

      .nav-label-wrap {
        display: grid;
        grid-template-columns: 0fr;
        transition: grid-template-columns 0.35s var(--ease-out);
        overflow: hidden;
      }
      .nav-item.active .nav-label-wrap {
        grid-template-columns: 1fr;
      }
      .nav-label {
        font-size: var(--fz-base);
        font-weight: 600;
        white-space: nowrap;
        min-width: 0;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .nav-item.active .nav-label {
        opacity: 1;
      }

      /* Focus-visible ring */
      .nav-item:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* Settings button — always last in scroll */
      .nav-settings {
        margin-left: auto;
      }
      .nav-settings ha-icon {
        --mdc-icon-size: 1.375rem;
        color: rgba(var(--rgb-white),0.45);
        opacity: 0.65;
        transition: color 0.6s ease, opacity var(--t-fast);
        display: flex; align-items: center; justify-content: center;
      }
      .navbar.bg-light .nav-settings ha-icon {
        color: rgba(var(--rgb-black),0.45);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-settings:hover ha-icon {
          color: var(--t2);
        }
        .nav-settings:active ha-icon {
          color: var(--t1);
        }
      }
      @media (pointer: coarse) {
        .nav-settings:active {
          animation: bounce 0.3s ease;
        }
      }
    `]}connectedCallback(){super.connectedCallback();const e=document.querySelector("glass-room-popup");e?(this._popup=e,this._ownsPopup=!1):(this._popup=document.createElement("glass-room-popup"),document.body.appendChild(this._popup),this._ownsPopup=!0),this._listen("popup-close",()=>{this._activeArea=null}),this._listen("navbar-config-changed",()=>{this._loadBackendConfig()}),this._listen("dashboard-config-changed",()=>{this._loadDashboardConfig()}),this._listen("location-changed",()=>{this._loadDashboardConfig()}),this._editMode=this._detectEditMode()}disconnectedCallback(){super.disconnectedCallback(),this._ownsPopup&&this._popup?.remove(),this._popup=null,this._ownsPopup=!1,this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null);for(const e of this._dashboardCards.values())e.remove();this._dashboardCards.clear(),this._removeHeaderStyle(),this._removeSidebarStyle(),this._loadingOverlay&&(this._loadingOverlay.remove(),this._loadingOverlay=null),this._removeOverlayTimer&&(clearTimeout(this._removeOverlayTimer),this._removeOverlayTimer=void 0),this._headerRetryTimer&&(clearTimeout(this._headerRetryTimer),this._headerRetryTimer=void 0),this._sidebarRetryTimer&&(clearTimeout(this._sidebarRetryTimer),this._sidebarRetryTimer=void 0),this._configRetryTimer&&(clearTimeout(this._configRetryTimer),this._configRetryTimer=void 0),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._bgIntersectionObserver?.disconnect(),this._bgIntersectionObserver=void 0,this._bgMutationObserver?.disconnect(),this._bgMutationObserver=void 0,this._bgIntersectingCards.clear()}firstUpdated(e){super.firstUpdated(e),this._attachScrollListener();const t=this.renderRoot.querySelector(".dashboard-cards");t&&(this._bgMutationObserver=new MutationObserver(e=>{e.some(e=>"childList"===e.type)?this._setupBgObserver():this._checkBgLightFromIntersecting()}),this._bgMutationObserver.observe(t,{childList:!0,subtree:!0,attributeFilter:["data-bg-light"]})),this._setupBgObserver()}_setupBgObserver(){this._bgIntersectionObserver?.disconnect(),this._bgIntersectingCards.clear();const e=this.renderRoot.querySelector(".navbar"),t=this.renderRoot.querySelector(".dashboard-cards");if(!e||!t||0===t.children.length)return;const i=e.getBoundingClientRect();if(0===i.height)return void requestAnimationFrame(()=>requestAnimationFrame(()=>this._setupBgObserver()));const a=-i.top,r=-(window.innerHeight-i.bottom);this._bgIntersectionObserver=new IntersectionObserver(e=>{for(const t of e)t.isIntersecting?this._bgIntersectingCards.add(t.target):this._bgIntersectingCards.delete(t.target);this._checkBgLightFromIntersecting()},{root:null,rootMargin:`${a}px 0px ${r}px 0px`,threshold:0});for(const s of t.children)this._bgIntersectionObserver.observe(s)}_checkBgLightFromIntersecting(){let e=!1;for(const t of this._bgIntersectingCards)if("true"===t.dataset.bgLight){e=!0;break}e!==this._bgIsLight&&(this._bgIsLight=e)}_detectEditMode(){let e=this.getRootNode();for(;e instanceof ShadowRoot;){const t=e.host;if("HUI-CARD-OPTIONS"===t.tagName)return!0;if("HUI-DIALOG-EDIT-CARD"===t.tagName)return!0;if("HA-PANEL-LOVELACE"===t.tagName&&t.lovelace?.editMode)return!0;e=t.getRootNode()}return!1}_attachScrollListener(){if(this._scrollEl&&this.renderRoot.contains(this._scrollEl))return;this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null);const e=this.renderRoot.querySelector(".nav-scroll");e&&(e.addEventListener("scroll",this._boundUpdateMask,{passive:!0}),this._scrollEl=e,this._updateNavMask())}setConfig(e){super.setConfig(e)}getCardSize(){return 0}getTrackedEntityIds(){return["sun.sun",...this._items.flatMap(e=>e.entityIds)]}shouldUpdate(e){if(e.has("hass")&&this.hass){this._popup&&(this._popup.hass=this.hass);for(const e of this._dashboardCards.values())e.hass=this.hass}return super.shouldUpdate(e)}updated(e){if(super.updated(e),e.has("hass")&&this.hass){if(this._editMode=this._detectEditMode(),this._editMode)return;this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoading||this._loadBackendConfig(),this._configReady&&(this._rebuildStructure(),this._aggregateState()),this._updateAmbient()}(e.has("_items")||e.has("_enabledCards"))&&this.updateComplete.then(()=>{this._syncDashboardCards(),this._attachScrollListener(),this._updateNavMask(),this._animateFlip(),this._setupBgObserver()})}async _loadBackendConfig(){if(this.hass&&!this._configLoading){this._configLoading=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_config");this._navbarConfig=e.navbar,this._roomConfigs=e.rooms??{},e.dashboard&&(this._enabledCards=e.dashboard.enabled_cards,this._cardOrder=e.dashboard.card_order??St,this._hideHeader=e.dashboard.hide_header??!1,this._hideSidebar=e.dashboard.hide_sidebar??!1,this._applyHideHeader(),this._applyHideSidebar()),this._configLoaded=!0,this._configReady=!0,this._lastAreaKeys="",this._rebuildStructure(),this._aggregateState()}catch{return this._configLoading=!1,void(this.isConnected&&(this._showLoadingOverlay(),this._configRetryTimer=setTimeout(()=>{this._configRetryTimer=void 0,this.isConnected&&(this._configLoaded=!1,this._loadBackendConfig())},2e3)))}finally{this._configLoading=!1}this._removeLoadingOverlay()}}async _loadDashboardConfig(){if(this.hass&&!this._dashboardLoading&&!this._configLoading){this._dashboardLoading=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_config");if(e?.dashboard){this._enabledCards=e.dashboard.enabled_cards,this._cardOrder=e.dashboard.card_order??St;const t=e.dashboard.hide_header??!1,i=e.dashboard.hide_sidebar??!1;t!==this._hideHeader&&(this._hideHeader=t,this._applyHideHeader()),i!==this._hideSidebar&&(this._hideSidebar=i,this._applyHideSidebar())}}catch{}finally{this._dashboardLoading=!1}}}_applyHideHeader(e=10){this._hideHeader?!this._injectHeaderStyle()&&e>0&&this.isConnected&&(this._headerRetryTimer=setTimeout(()=>this._applyHideHeader(e-1),500)):this._removeHeaderStyle()}_injectHeaderStyle(){if(this._headerStyleEl)return!0;const e=this._findHuiRoot();if(!e)return!1;const t=document.createElement("style");return t.id="glass-cards-hide-header",t.textContent="\n      .header { display: none !important; }\n      #view, hui-view-container {\n        min-height: 100vh !important;\n        padding-top: env(safe-area-inset-top) !important;\n      }\n    ",e.appendChild(t),this._headerStyleEl=t,!0}_removeHeaderStyle(){this._headerStyleEl&&(this._headerStyleEl.remove(),this._headerStyleEl=null)}_applyHideSidebar(e=10){this._hideSidebar?!this._injectSidebarStyle()&&e>0&&this.isConnected&&(this._sidebarRetryTimer=setTimeout(()=>this._applyHideSidebar(e-1),500)):this._removeSidebarStyle()}_injectSidebarStyle(){if(this._sidebarStyleEl)return!0;const e=this._findDrawerShadow();if(!e)return!1;const t=document.createElement("style");return t.id="glass-cards-hide-sidebar",t.textContent="\n      .mdc-drawer { display: none !important; }\n      .mdc-drawer-scrim { display: none !important; }\n      .mdc-drawer-app-content { margin-left: 0 !important; }\n    ",e.appendChild(t),this._sidebarStyleEl=t,!0}_removeSidebarStyle(){this._sidebarStyleEl&&(this._sidebarStyleEl.remove(),this._sidebarStyleEl=null)}_findDrawerShadow(){try{const e=document.querySelector("home-assistant");if(!e?.shadowRoot)return null;const t=e.shadowRoot.querySelector("home-assistant-main");if(!t?.shadowRoot)return null;const i=t.shadowRoot.querySelector("ha-drawer");return i?.shadowRoot?i.shadowRoot:null}catch{return null}}_showLoadingOverlay(){if(this._loadingOverlay)return;const e=document.createElement("div");e.id="glass-cards-loading",e.style.cssText="\n      position: fixed; inset: 0; z-index: 99999;\n      background: var(--primary-background-color, #111);\n      display: flex; align-items: center; justify-content: center;\n      flex-direction: column; gap: 16px;\n      transition: opacity 0.4s ease;\n    ";const t=document.createElement("style");t.textContent="@keyframes gc-spin { to { transform: rotate(360deg); } }",e.appendChild(t);const i=document.createElement("div");i.style.cssText="width:36px;height:36px;border:3px solid rgba(255,255,255,.15);border-top-color:rgba(255,255,255,.7);border-radius:50%;animation:gc-spin .8s linear infinite;",e.appendChild(i);const a=document.createElement("span");a.style.cssText="font:500 13px/1 sans-serif;color:rgba(255,255,255,.5);letter-spacing:1px;text-transform:uppercase;",a.textContent="Glass Cards",e.appendChild(a),document.body.appendChild(e),this._loadingOverlay=e}_removeLoadingOverlay(){if(!this._loadingOverlay)return;const e=this._loadingOverlay;this._loadingOverlay=null,e.style.opacity="0",this._removeOverlayTimer=setTimeout(()=>{e.remove(),this._removeOverlayTimer=void 0},400)}_findHuiRoot(){try{const e=document.querySelector("home-assistant");if(!e?.shadowRoot)return null;const t=e.shadowRoot.querySelector("home-assistant-main");if(!t?.shadowRoot)return null;const i=t.shadowRoot.querySelector("ha-drawer");if(!i)return null;const a=i.querySelector("partial-panel-resolver");if(!a)return null;const r=a.querySelector("ha-panel-lovelace");if(!r?.shadowRoot)return null;const s=r.shadowRoot.querySelector("hui-root");return s?.shadowRoot?s.shadowRoot:null}catch{return null}}_getOrCreateCard(e){let t=this._dashboardCards.get(e);if(t||(t=document.createElement(e),this._dashboardCards.set(e,t)),this.hass&&(t.hass=this.hass),"glass-light-card"===e||"glass-fan-card"===e||"glass-climate-card"===e){const e=this._items.map(e=>e.areaId);t.visibleAreaIds=e}return t}_rebuildStructure(){if(!this.hass?.areas)return;const e=this._navbarConfig?`${this._navbarConfig.room_order.join(",")}|${this._navbarConfig.hidden_rooms.join(",")}`:"";this.hass.entities!==this._lastEntitiesRef&&(this._lastEntitiesRef=this.hass.entities,this._cachedEntityFingerprint=Object.values(this.hass.entities).map(e=>`${e.entity_id}:${e.area_id??""}`).sort().join("|"));const t=this._cachedEntityFingerprint,i=Object.entries(this._roomConfigs).map(([e,t])=>`${e}:${t.icon??""}`).sort().join(","),a=Object.keys(this.hass.areas).sort().join(",")+"||"+t+"||"+e+"||"+i;if(a===this._lastAreaKeys)return;this._lastAreaKeys=a;const r=new Set(this._navbarConfig?.hidden_rooms??[]),s=new Map;(this._navbarConfig?.room_order??[]).forEach((e,t)=>s.set(e,t));const o=[];for(const n of Object.values(this.hass.areas)){if(r.has(n.area_id))continue;const e=nt(n.area_id,this.hass.entities,this.hass.devices);if(0===e.length)continue;const t=this._roomConfigs[n.area_id]?.icon;o.push({areaId:n.area_id,name:n.name,icon:t||n.icon||"mdi:home",entityIds:e.map(e=>e.entity_id)})}o.sort((e,t)=>{const i=s.get(e.areaId),a=s.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._areaStructure=o}_aggregateState(){if(!this.hass)return;const e=this._areaStructure.map(e=>{let t=0,i=null,a=null,r=null,s=null,o=!1;const n=this.hass?.areas?.[e.areaId];if(n?.temperature_entity_id){const e=this.hass?.states[n.temperature_entity_id];if(e&&"unavailable"!==e.state&&"unknown"!==e.state){const t=parseFloat(e.state);isNaN(t)||(i=`${e.state}°`,a=t)}}if(n?.humidity_entity_id){const e=this.hass?.states[n.humidity_entity_id];if(e&&"unavailable"!==e.state&&"unknown"!==e.state){const t=parseFloat(e.state);isNaN(t)||(r=`${e.state}%`,s=t)}}for(const l of e.entityIds){const e=this.hass?.states[l];if(!e)continue;const n=l.split(".")[0];if("light"===n&&"on"===e.state&&t++,!(i&&r||"sensor"!==n||"unavailable"===e.state||"unknown"===e.state)){const t=e.attributes.device_class;if("temperature"===t&&!i){const t=parseFloat(e.state);isNaN(t)||(i=`${e.state}°`,a=t)}if("humidity"===t&&!r){const t=parseFloat(e.state);isNaN(t)||(r=`${e.state}%`,s=t)}}"media_player"===n&&"playing"===e.state&&(o=!0)}return{...e,lightsOn:t,temperature:i,tempValue:a,humidity:r,humidityValue:s,mediaPlaying:o}}),t=Date.now();for(const i of e)i.lightsOn>0?this._litTimestamps.has(i.areaId)||this._litTimestamps.set(i.areaId,t):this._litTimestamps.delete(i.areaId);!1!==this._navbarConfig?.auto_sort&&e.sort((e,t)=>{const i=e.lightsOn>0?0:1,a=t.lightsOn>0?0:1;if(i!==a)return i-a;if(0===i){const i=this._litTimestamps.get(e.areaId)??0;return(this._litTimestamps.get(t.areaId)??0)-i}return 0});e.map(e=>`${e.areaId}:${e.lightsOn}:${e.temperature}:${e.humidity}:${e.mediaPlaying}`).join("|")!==this._items.map(e=>`${e.areaId}:${e.lightsOn}:${e.temperature}:${e.humidity}:${e.mediaPlaying}`).join("|")&&(this._snapshotPositions(),this._items=e)}_updateAmbient(){if(!this.hass)return;const e=function(e){const t=e.states["sun.sun"];if(!t){const e=(new Date).getHours();return e>=6&&e<10?"morning":e>=10&&e<17?"day":e>=17&&e<21?"evening":"night"}const i=parseFloat(t.attributes.elevation)||0;if(i>20)return"day";if(i>0){const e=Date.parse(t.attributes.next_setting),i=Date.parse(t.attributes.next_rising);return isNaN(e)||isNaN(i)?"above_horizon"===t.state?"day":"night":e<i?"evening":"morning"}if(i>-6){const e=Date.parse(t.attributes.next_rising),i=Date.parse(t.attributes.next_setting);if(!isNaN(e)&&!isNaN(i))return e<i?"morning":"evening"}return"night"}(this.hass);e!==this._lastAmbientPeriod&&(this._lastAmbientPeriod=e,i.emit("ambient-update",{period:e}))}_snapshotPositions(){this._flipPositions.clear();const e=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const t of e){const e=t.dataset.area;e&&this._flipPositions.set(e,t.getBoundingClientRect().left)}}_animateFlip(){if(0===this._flipPositions.size)return;const e=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const t of e){const e=t.dataset.area;if(!e)continue;const i=this._flipPositions.get(e);if(void 0===i)continue;const a=i-t.getBoundingClientRect().left;Math.abs(a)<1||t.animate([{transform:`translateX(${a}px)`},{transform:"translateX(0)"}],{duration:350,easing:"cubic-bezier(0.4, 0, 0.2, 1)"})}this._flipPositions.clear()}_updateNavMask(){const e=this.renderRoot.querySelector(".nav-scroll");if(!e)return;if(!(e.scrollWidth>e.offsetWidth))return void(this._scrollMask="none");const t=e.scrollLeft<=5,i=e.scrollLeft+e.offsetWidth>=e.scrollWidth-5;this._scrollMask=t&&i?"none":t?"mask-right":i?"mask-left":"mask-both"}_handleNavClick(e,t){const a=t.currentTarget.getBoundingClientRect();if(this._activeArea===e.areaId)i.emit("popup-close",void 0),this._activeArea=null;else{this._activeArea=e.areaId;const t=this._items.indexOf(e);i.emit("popup-open",{areaId:e.areaId,originRect:a,roomIndex:t>=0?t:void 0})}}_renderNavItem(e){const t=this._activeArea===e.areaId,i=this._roomConfigs[e.areaId],a=!1!==i?.show_lights,r=!1!==i?.show_temperature,s=!1!==i?.show_humidity,o=this._navbarConfig?.temp_high??24,n=this._navbarConfig?.temp_low??17,l=this._navbarConfig?.humidity_threshold??65,c=a&&e.lightsOn>0,d=s&&null!==e.humidityValue&&e.humidityValue>=l,h=e.mediaPlaying,p=r&&null!==e.tempValue&&e.tempValue>=o,u=["nav-item",t?"active":"",c?"has-light":"",h?"has-music":"",p?"has-temp-hot":"",r&&null!==e.tempValue&&!p&&e.tempValue<=n?"has-temp-cold":""].filter(Boolean).join(" ");return X`
      <button
        class=${u}
        data-area=${e.areaId}
        @click=${t=>this._handleNavClick(e,t)}
        aria-label=${e.name}
        aria-pressed=${t?"true":"false"}
      >
        <span class="nav-temp-badge">
          <ha-icon .icon=${p?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
        </span>
        <span class="nav-content">
          <ha-icon .icon=${e.icon}></ha-icon>
          <span class="nav-label-wrap"><span class="nav-label">${e.name}</span></span>
          ${d?X`<span class="humidity-bar"></span>`:J}
        </span>
      </button>
    `}_syncDashboardCards(){const e=this.renderRoot.querySelector(".dashboard-cards");if(!e)return;const t=new Set(this._enabledCards),i=this._cardOrder.filter(e=>t.has(e)),a=[];for(const[s]of this._dashboardCards){const e=Object.entries(Ct).find(([,e])=>e===s)?.[0];e&&t.has(e)||a.push(s)}for(const s of a)this._dashboardCards.get(s)?.remove(),this._dashboardCards.delete(s);let r=null;for(const s of i){const t=Ct[s];if(!t)continue;const i=this._getOrCreateCard(t),a=r?r.nextElementSibling:e.firstElementChild;i!==a&&e.insertBefore(i,a),r=i}}render(){this._lang;try{const e=!this._editMode&&this._items.length>0,t="nav-scroll"+("none"!==this._scrollMask?` ${this._scrollMask}`:"");return X`
        <div class="dashboard-cards"></div>
        ${e?X`<nav class="navbar glass glass-float${this._bgIsLight?" bg-light":""}" role="navigation" aria-label="${Qe("common.rooms")}">
              <div class=${t}>
                ${this._items.map(e=>this._renderNavItem(e))}
                ${this.hass?.user?.is_admin?X`<button
                  class="nav-item nav-settings"
                  @click=${()=>{history.pushState(null,"","/glass-cards"),window.dispatchEvent(new Event("location-changed"))}}
                  aria-label=${Qe("config.title")}
                >
                  <span class="nav-content">
                    <ha-icon .icon=${"mdi:cog"}></ha-icon>
                  </span>
                </button>`:J}
              </div>
            </nav>`:J}
      `}catch(e){return console.error("[glass-navbar-card] render error:",e),X`<div class="dashboard-cards"></div><div class="glass" style="padding:16px;text-align:center;color:var(--c-alert);font-size:var(--fz-base);">
        <ha-icon .icon=${"mdi:alert-circle-outline"} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"></ha-icon>
        Navbar render error</div>`}}}$t([xe()],It.prototype,"_items"),$t([xe()],It.prototype,"_activeArea"),$t([xe()],It.prototype,"_scrollMask"),$t([xe()],It.prototype,"_editMode"),$t([xe()],It.prototype,"_enabledCards"),$t([xe()],It.prototype,"_bgIsLight");try{customElements.define("glass-navbar-card",It)}catch{}const Tt=window;Tt.customCards=Tt.customCards||[],Tt.customCards.push({type:"glass-navbar-card",name:"Glass Navbar Card",description:"Auto-discovering bottom navigation for Glass Cards"}),tt("glass-weather-card-editor");var zt=Object.defineProperty,Et=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&zt(t,i,s),s};const At={sunny:"sunny","clear-night":"clear_night",partlycloudy:"partly_cloudy",cloudy:"cloudy",fog:"foggy",rainy:"rainy",pouring:"pouring",snowy:"snowy","snowy-rainy":"snowy_rainy",hail:"hail",lightning:"lightning","lightning-rainy":"stormy",windy:"windy","windy-variant":"windy_variant",exceptional:"exceptional"},Pt={sunny:{icon:"mdi:weather-sunny",textKey:"weather.cond_sunny",tint:"#fbbf24",tintOp:.1,sparkStroke:"rgba(251,191,36,0.6)",sparkFill:"rgba(251,191,36,0.15)"},clear_night:{icon:"mdi:weather-night",textKey:"weather.cond_clear_night",tint:"#818cf8",tintOp:.08,sparkStroke:"rgba(129,140,248,0.5)",sparkFill:"rgba(129,140,248,0.12)"},partly_cloudy:{icon:"mdi:weather-partly-cloudy",textKey:"weather.cond_partly_cloudy",tint:"#fcd34d",tintOp:.07,sparkStroke:"rgba(252,211,77,0.5)",sparkFill:"rgba(252,211,77,0.12)"},cloudy:{icon:"mdi:weather-cloudy",textKey:"weather.cond_cloudy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.4)",sparkFill:"rgba(148,163,184,0.08)"},foggy:{icon:"mdi:weather-fog",textKey:"weather.cond_foggy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.35)",sparkFill:"rgba(148,163,184,0.08)"},rainy:{icon:"mdi:weather-rainy",textKey:"weather.cond_rainy",tint:"#60a5fa",tintOp:.1,sparkStroke:"rgba(96,165,250,0.6)",sparkFill:"rgba(96,165,250,0.15)"},pouring:{icon:"mdi:weather-pouring",textKey:"weather.cond_pouring",tint:"#3b82f6",tintOp:.14,sparkStroke:"rgba(59,130,246,0.7)",sparkFill:"rgba(59,130,246,0.18)"},snowy:{icon:"mdi:weather-snowy",textKey:"weather.cond_snowy",tint:"#e0f2fe",tintOp:.08,sparkStroke:"rgba(224,242,254,0.5)",sparkFill:"rgba(224,242,254,0.12)"},snowy_rainy:{icon:"mdi:weather-snowy-rainy",textKey:"weather.cond_snowy_rainy",tint:"#93c5fd",tintOp:.08,sparkStroke:"rgba(147,197,253,0.5)",sparkFill:"rgba(147,197,253,0.12)"},hail:{icon:"mdi:weather-hail",textKey:"weather.cond_hail",tint:"#bae6fd",tintOp:.1,sparkStroke:"rgba(186,230,253,0.5)",sparkFill:"rgba(186,230,253,0.12)"},lightning:{icon:"mdi:weather-lightning",textKey:"weather.cond_lightning",tint:"#c084fc",tintOp:.12,sparkStroke:"rgba(192,132,252,0.6)",sparkFill:"rgba(167,139,250,0.15)"},stormy:{icon:"mdi:weather-lightning-rainy",textKey:"weather.cond_stormy",tint:"#a78bfa",tintOp:.12,sparkStroke:"rgba(167,139,250,0.6)",sparkFill:"rgba(167,139,250,0.15)"},windy:{icon:"mdi:weather-windy",textKey:"weather.cond_windy",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.5)",sparkFill:"rgba(110,231,183,0.10)"},windy_variant:{icon:"mdi:weather-windy-variant",textKey:"weather.cond_windy_variant",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.4)",sparkFill:"rgba(110,231,183,0.10)"},exceptional:{icon:"mdi:alert-circle-outline",textKey:"weather.cond_exceptional",tint:"#fca5a5",tintOp:.1,sparkStroke:"rgba(252,165,165,0.5)",sparkFill:"rgba(252,165,165,0.12)"}},Lt=["compass_N","compass_NNE","compass_NE","compass_ENE","compass_E","compass_ESE","compass_SE","compass_SSE","compass_S","compass_SSW","compass_SW","compass_WSW","compass_W","compass_WNW","compass_NW","compass_NNW"];function Mt(e){return e<10?"0"+e:""+e}class Rt extends rt{constructor(){super(...arguments),this._activeTab=null,this._forecastDaily=[],this._forecastHourly=[],this._clockTime="",this._clockSec="",this._clockDay="",this._clockDate="",this._weatherConfig={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},this._canvas=null,this._ctx=null,this._animId=0,this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:200,color:"rgba(167,139,250,"},this._cW=0,this._cH=0,this._resizeObserver=null,this._cachedCond="",this._clockInterval=0,this._unsubDaily=null,this._unsubHourly=null,this._configLoaded=!1,this._configLoadingInProgress=!1,this._canvasReady=!1,this._needsCanvasReInit=!1,this._subscribedEntity="",this._subscribedShowDaily=!1,this._subscribedShowHourly=!1,this._subVersion=0,this._animRunning=!1,this._animate=()=>{if(!this.isConnected||!this._animRunning)return;const e=this._ctx;if(!e)return;e.clearRect(0,0,this._cW,this._cH);for(const i of this._particles)this._updateParticle(i),this._drawParticle(e,i);const t=this._cachedCond;"stormy"!==t&&"lightning"!==t||(this._updateFlash(),this._flashState.opacity>.01&&(e.fillStyle=this._flashState.color+this._flashState.opacity+")",e.fillRect(0,0,this._cW,this._cH))),this._animId=requestAnimationFrame(this._animate)}}static getConfigElement(){return document.createElement("glass-weather-card-editor")}getCardSize(){return 2}static{this.styles=[Se,Ie,Te,Me,Pe,h`
    :host {
      width: 100%;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    .weather-card-wrap {
      display: flex; flex-direction: column; gap: 0.375rem;
    }

    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem;
    }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700;
      text-transform: uppercase; letter-spacing: 1.5px;
      color: var(--t4);
    }
    .card-location {
      font-size: var(--fz-xs); font-weight: 500; color: var(--t3);
    }

    .weather-card {
      position: relative;
      width: 100%; padding: 0.875rem 0.875rem 0.375rem;
      box-sizing: border-box;
    }

    .card-inner {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; gap: 0.5rem;
    }

    /* ── Header: clock + weather ── */
    .wc-header {
      display: flex; align-items: flex-start; justify-content: space-between;
    }

    .wc-clock-zone {
      display: flex; flex-direction: column; gap: 0.0625rem;
    }
    .wc-clock-hm {
      font-size: var(--fz-display); font-weight: 300; line-height: 1;
      color: var(--t1); letter-spacing: -0.8px;
      font-variant-numeric: tabular-nums;
    }
    .wc-clock-sec {
      font-size: var(--fz-base); font-weight: 300; color: var(--t4);
      margin-left: 0.0625rem;
    }
    .wc-clock-date {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
    }
    .wc-clock-day {
      font-weight: 600; color: var(--t3);
      text-transform: capitalize;
    }

    .wc-weather-zone {
      display: flex; flex-direction: column; align-items: flex-end; gap: 0.0625rem;
    }
    .wc-temp-row {
      display: flex; align-items: baseline; gap: 0.125rem;
    }
    .wc-temp {
      font-size: var(--fz-display); font-weight: 700; line-height: 1;
      color: var(--t1); letter-spacing: -0.5px;
    }
    .wc-temp-unit {
      font-size: var(--fz-base); font-weight: 400; color: var(--t3);
    }
    .wc-cond-row {
      display: flex; align-items: center; gap: 0.25rem;
    }
    .wc-cond-icon {
      --mdc-icon-size: 0.8125rem;
      width: 0.8125rem; height: 0.8125rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
      transition: color var(--t-med), filter var(--t-med);
    }
    .wc-cond-icon.sunny { color: #fbbf24; filter: drop-shadow(0 0 4px rgba(var(--rgb-warning),0.35)); }
    .wc-cond-icon.partly_cloudy { color: #fcd34d; }
    .wc-cond-icon.cloudy { color: var(--t2); }
    .wc-cond-icon.rainy { color: #60a5fa; filter: drop-shadow(0 0 4px rgba(var(--rgb-info),0.3)); }
    .wc-cond-icon.pouring { color: #3b82f6; filter: drop-shadow(0 0 4px rgba(59,130,246,0.4)); }
    .wc-cond-icon.stormy { color: #a78bfa; filter: drop-shadow(0 0 4px rgba(var(--rgb-purple),0.35)); }
    .wc-cond-icon.lightning { color: #c084fc; filter: drop-shadow(0 0 5px rgba(192,132,252,0.4)); }
    .wc-cond-icon.snowy { color: #e0f2fe; }
    .wc-cond-icon.snowy_rainy { color: #93c5fd; }
    .wc-cond-icon.hail { color: #bae6fd; filter: drop-shadow(0 0 3px rgba(186,230,253,0.3)); }
    .wc-cond-icon.foggy { color: var(--t3); }
    .wc-cond-icon.windy { color: #6ee7b7; filter: drop-shadow(0 0 3px rgba(110,231,183,0.3)); }
    .wc-cond-icon.windy_variant { color: #6ee7b7; }
    .wc-cond-icon.clear_night { color: #818cf8; filter: drop-shadow(0 0 4px rgba(var(--rgb-accent),0.35)); }
    .wc-cond-icon.exceptional { color: #fca5a5; filter: drop-shadow(0 0 4px rgba(252,165,165,0.3)); }
    .wc-cond-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
    }
    .wc-feels {
      font-size: var(--fz-xs); font-weight: 500; color: var(--t4);
    }

    /* ── Canvas animation ── */
    .wc-anim {
      position: absolute; inset: 0; border-radius: inherit;
      overflow: hidden; pointer-events: none; z-index: 0;
    }

    /* ── Sparkline ── */
    .wc-spark-zone {
      position: relative;
      width: 100%; height: 4rem;
      border-radius: var(--radius-sm);
      overflow: hidden;
    }
    .wc-spark-svg {
      width: 100%; height: 100%;
      display: block;
    }
    .wc-spark-line {
      fill: none; stroke-width: 2;
      stroke-linecap: round; stroke-linejoin: round;
      transition: stroke var(--t-med), d var(--t-med);
    }
    .wc-spark-area {
      stroke: none;
      transition: fill var(--t-med), d var(--t-med);
    }
    .wc-spark-labels {
      position: absolute; inset: 0;
      display: flex; justify-content: space-between; align-items: flex-end;
      padding: 0 0.25rem 0.25rem;
      pointer-events: none;
    }
    .wc-spark-lbl {
      font-size: var(--fz-xxs); font-weight: 600; color: var(--t4);
      text-align: center;
    }
    .wc-spark-now {
      position: absolute;
      top: 0; bottom: 0;
      width: 0.0625rem;
      background: linear-gradient(to bottom, transparent, rgba(var(--rgb-white),0.15), transparent);
      pointer-events: none;
    }
    .wc-spark-now-dot {
      position: absolute; top: 0;
      width: 0.375rem; height: 0.375rem; border-radius: 50%;
      background: var(--t1);
      box-shadow: 0 0 6px rgba(var(--rgb-white),0.4);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    /* ── Metrics Grid ── */
    .wc-metrics {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 0.0625rem;
      border-radius: var(--radius-sm);
      background: var(--b1);
      overflow: hidden;
    }
    :host([size="xs"]) .wc-metrics {
      grid-template-columns: repeat(2, 1fr);
    }
    .wc-metric {
      display: flex; align-items: center; justify-content: center; gap: 0.1875rem;
      padding: 0.3125rem 0.25rem;
      background: var(--s1);
    }
    .wc-metric ha-icon {
      --mdc-icon-size: 0.6875rem;
      width: 0.6875rem; height: 0.6875rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t4);
    }
    .wc-metric.humidity ha-icon { color: rgba(var(--rgb-info),0.5); }
    .wc-metric.pressure ha-icon { color: rgba(148,163,184,0.5); }
    .wc-metric.wind ha-icon { color: rgba(110,231,183,0.5); }
    .wc-metric.uv ha-icon { color: rgba(var(--rgb-warning),0.5); }
    .wc-metric.visibility ha-icon { color: rgba(148,163,184,0.4); }
    .wc-metric.sunrise ha-icon { color: rgba(var(--rgb-warning),0.4); }
    .wc-metric.sunset ha-icon { color: rgba(251,146,60,0.5); }
    .wc-metric-val { font-size: var(--fz-sm); font-weight: 600; color: var(--t2); }
    .wc-metric-unit { font-size: var(--fz-xxs); font-weight: 400; color: var(--t4); }
    .wc-metric-dir { font-size: var(--fz-xxs); font-weight: 600; color: var(--t4); margin-left: 0.0625rem; }

    /* ── Forecast tabs ── */
    /* ── Fold separator ── */
    .wc-fold-sep {
      height: 0.0625rem; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent),0.2), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .wc-fold-sep.visible { opacity: 1; }

    .wc-forecast-zone {
      display: flex; flex-direction: column; gap: 0.25rem;
      margin-top: 0.125rem;
    }
    .wc-fc-tabs {
      display: flex; gap: 0.1875rem;
      margin: 0 auto; width: fit-content;
    }
    .wc-fc-tab {
      padding: 0.25rem 0.75rem;
      border: 1px solid var(--b1);
      border-radius: var(--radius-full);
      background: transparent; color: var(--t4);
      font-family: inherit; font-size: var(--fz-xs); font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.8px;
      cursor: pointer; transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      outline: none;
    }
    .wc-fc-tab:focus-visible { box-shadow: 0 0 0 2px rgba(var(--rgb-white),0.25); }
    @media (hover: hover) and (pointer: fine) {
      .wc-fc-tab:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .wc-fc-tab:active { animation: bounce 0.3s ease; }
    }
    .wc-fc-tab.active {
      background: var(--s4); border-color: var(--b3); color: var(--t1);
    }
    @media (hover: hover) and (pointer: fine) {
      .wc-fc-tab:hover { background: var(--s2); color: var(--t3); }
    }

    /* ── Daily list ── */
    .wc-daily-list, .wc-hourly-list {
      display: flex; flex-direction: column; gap: 0.0625rem;
      padding: 0.125rem 0;
    }
    .wc-day-row {
      display: grid; grid-template-columns: 2.625rem 1.125rem 1fr 2.625rem 2.375rem;
      align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.25rem;
      border-radius: var(--radius-sm);
      transition: background var(--t-fast);
    }
    .wc-day-row:first-child { background: var(--s2); }
    .wc-day-label {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t3);
    }
    .wc-day-row:first-child .wc-day-label { color: var(--t2); }
    .wc-day-icon {
      --mdc-icon-size: var(--icon-sm);
      width: 0.875rem; height: 0.875rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .wc-day-icon.sunny, .wc-hour-icon.sunny { color: #fbbf24; }
    .wc-day-icon.partly_cloudy, .wc-hour-icon.partly_cloudy { color: #fcd34d; }
    .wc-day-icon.cloudy, .wc-hour-icon.cloudy { color: var(--t2); }
    .wc-day-icon.rainy, .wc-hour-icon.rainy { color: #60a5fa; }
    .wc-day-icon.pouring, .wc-hour-icon.pouring { color: #3b82f6; }
    .wc-day-icon.stormy, .wc-hour-icon.stormy { color: #a78bfa; }
    .wc-day-icon.lightning, .wc-hour-icon.lightning { color: #c084fc; }
    .wc-day-icon.snowy, .wc-hour-icon.snowy { color: #e0f2fe; }
    .wc-day-icon.snowy_rainy, .wc-hour-icon.snowy_rainy { color: #93c5fd; }
    .wc-day-icon.hail, .wc-hour-icon.hail { color: #bae6fd; }
    .wc-day-icon.foggy, .wc-hour-icon.foggy { color: var(--t3); }
    .wc-day-icon.windy, .wc-hour-icon.windy { color: #6ee7b7; }
    .wc-day-icon.windy_variant, .wc-hour-icon.windy_variant { color: #6ee7b7; }
    .wc-day-icon.clear_night, .wc-hour-icon.clear_night { color: #818cf8; }
    .wc-day-icon.exceptional, .wc-hour-icon.exceptional { color: #fca5a5; }
    .wc-day-cond {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wc-day-temps {
      display: flex; align-items: baseline; gap: 0.125rem; justify-content: flex-end;
    }
    .wc-day-hi { font-size: var(--fz-base); font-weight: 700; color: var(--t1); }
    .wc-day-lo { font-size: var(--fz-sm); font-weight: 500; color: var(--t4); }
    .wc-day-precip {
      font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-info),0.5);
      text-align: right;
    }

    /* ── Hourly list ── */
    .wc-hour-row {
      display: grid; grid-template-columns: 2.625rem 1.125rem 1fr 2.375rem 2rem;
      align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.25rem;
      border-radius: var(--radius-sm);
      transition: background var(--t-fast);
    }
    .wc-hour-row.now { background: var(--s2); }
    .wc-hour-time {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t3);
    }
    .wc-hour-row.now .wc-hour-time { color: var(--t2); }
    .wc-hour-icon {
      --mdc-icon-size: var(--icon-sm);
      width: 0.875rem; height: 0.875rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .wc-hour-cond {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wc-hour-temp {
      font-size: var(--fz-base); font-weight: 700; color: var(--t1);
      text-align: right;
    }
    .wc-hour-precip {
      font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-info),0.5);
      text-align: right;
    }

    @media (hover: hover) and (pointer: fine) {
      .wc-day-row:hover, .wc-hour-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .wc-day-row:active, .wc-hour-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Tint ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow);
    }
  `]}getTrackedEntityIds(){const e=[],t=this._getEntityId();return t&&e.push(t),this.hass?.states["sun.sun"]&&e.push("sun.sun"),e}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._weatherConfig.entity_id)return this._weatherConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("weather."));if(e)return e}return""}_getWeatherState(){const e=this._getEntityId();return e?this.hass?.states[e]:void 0}_mapCondition(e){return At[e]??"cloudy"}_getConditionMeta(e){return Pt[e]??Pt.cloudy}connectedCallback(){super.connectedCallback(),this._startClock(),this._listen("weather-config-changed",()=>this._loadConfig()),this._canvasReady&&(this._needsCanvasReInit=!0)}disconnectedCallback(){super.disconnectedCallback(),this._stopClock(),this._stopAnimation(),this._unsubForecasts(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._canvas=null,this._ctx=null,this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}_collapseExpanded(){null!==this._activeTab&&(this._activeTab=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,this._unsubForecasts()),this._configLoaded||this._configLoadingInProgress||(this._backend=new dt(this.hass),this._loadConfig());const e=this._getWeatherState();this._cachedCond=e?this._mapCondition(e.state):"",this._configLoaded&&this._subscribeForecasts()}this._needsCanvasReInit&&(this._needsCanvasReInit=!1,this._initCanvas())}firstUpdated(){this._canvasReady=!0,this._initCanvas()}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherConfig=e.weather),this._configLoaded=!0,this._configLoadingInProgress=!1,this._subscribedEntity="",this._subscribeForecasts(),this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}async _subscribeForecasts(){const e=this._getEntityId();if(!e||!this.hass)return;const t=this._subscribedShowDaily!==this._weatherConfig.show_daily||this._subscribedShowHourly!==this._weatherConfig.show_hourly;if(e===this._subscribedEntity&&!t)return;this._unsubForecasts(),this._subscribedEntity=e,this._subscribedShowDaily=this._weatherConfig.show_daily,this._subscribedShowHourly=this._weatherConfig.show_hourly;const i=++this._subVersion;if(this._weatherConfig.show_daily){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastDaily=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(this._subVersion!==i)return void t();this._unsubDaily=t}if(this._weatherConfig.show_hourly){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastHourly=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});if(this._subVersion!==i)return void t();this._unsubHourly=t}}_unsubForecasts(){this._subVersion++,this._unsubDaily?.(),this._unsubDaily=null,this._unsubHourly?.(),this._unsubHourly=null,this._subscribedEntity=""}_startClock(){this._stopClock(),this._updateClock(),this._clockInterval=window.setInterval(()=>this._updateClock(),1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=0)}_updateClock(){const e=new Date;var t,i;this._clockTime=Mt(e.getHours())+":"+Mt(e.getMinutes()),this._clockSec=":"+Mt(e.getSeconds()),this._clockDay=(t=e,i=this._lang,t.toLocaleDateString(i,{weekday:"long"})),this._clockDate=e.getDate()+" "+function(e,t){return e.toLocaleDateString(t,{month:"long"})}(e,this._lang)}_initCanvas(){if(this._resizeObserver?.disconnect(),this._resizeObserver=null,this._stopAnimation(),this._canvas=this.renderRoot.querySelector(".wc-anim"),!this._canvas)return;this._ctx=this._canvas.getContext("2d"),this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas());const e=this._canvas.parentElement;e&&this._resizeObserver.observe(e),this._resizeCanvas(),this._startAnimation()}_resizeCanvas(){if(!this._canvas||!this._ctx)return;const e=this._canvas.parentElement;if(!e)return;const t=e.getBoundingClientRect(),i=window.devicePixelRatio||1;this._cW=t.width,this._cH=t.height,this._canvas.width=this._cW*i,this._canvas.height=this._cH*i,this._canvas.style.width=this._cW+"px",this._canvas.style.height=this._cH+"px",this._ctx.setTransform(i,0,0,i,0,0)}_startAnimation(){this._animRunning||(this._animRunning=!0,this._spawnParticles(this._cachedCond||"cloudy"),this._animate())}_stopAnimation(){this._animRunning=!1,this._animId&&(cancelAnimationFrame(this._animId),this._animId=0)}_rnd(e,t){return e+Math.random()*(t-e)}_spawnParticles(e){this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:this._rnd(120,280),color:"rgba(167,139,250,"};const t=this._cW,i=this._cH;if(!t||!i)return;const a=(e,i,a,r,s,o)=>({type:"drop",x:this._rnd(0,t),y:this._rnd(-30,-5),len:this._rnd(i,a),speed:this._rnd(r,s),angle:o,color:e,opacity:this._rnd(.4,.7)}),r=()=>({type:"flake",x:this._rnd(0,t),y:this._rnd(-10,-3),r:this._rnd(1.5,3.5),speed:this._rnd(.4,1.2),drift:this._rnd(-.3,.3),phase:this._rnd(0,6.28),opacity:this._rnd(.3,.7)}),s=e=>({type:"mote",x:this._rnd(.1*t,.9*t),y:this._rnd(.3*i,.9*i),r:this._rnd(1,2.5),speed:this._rnd(.15,.4),drift:this._rnd(-.15,.15),phase:this._rnd(0,6.28),color:e,opacity:0,maxOp:this._rnd(.3,.7),life:0,maxLife:this._rnd(180,360)}),o=()=>({type:"star",x:this._rnd(.05*t,.95*t),y:this._rnd(.05*i,.7*i),r:this._rnd(.8,1.8),phase:this._rnd(0,6.28),speed:this._rnd(.008,.025)}),n=(e,a)=>({type:"cloud",x:this._rnd(-80,t),y:this._rnd(.05*i,.6*i),w:this._rnd(50,110),h:this._rnd(12,26),speed:this._rnd(.6*a,a),opacity:this._rnd(.6*e,e)}),l=()=>({type:"streak",x:this._rnd(-60,0),y:this._rnd(.1*i,.85*i),w:this._rnd(40,90),speed:this._rnd(2,5),opacity:this._rnd(.06,.14)}),c=()=>({type:"fog",x:this._rnd(-120,.5*t),y:this._rnd(.15*i,.75*i),w:this._rnd(80,160),h:this._rnd(18,35),speed:this._rnd(.2,.6),opacity:this._rnd(.02,.04)}),d=()=>({type:"hail",x:this._rnd(0,t),y:this._rnd(-15,-3),r:this._rnd(2,4),speed:this._rnd(3,5.5),opacity:this._rnd(.5,.8)}),h=this._particles;switch(e){case"sunny":for(let e=0;e<10;e++)h.push(s("rgba(251,191,36,"));break;case"clear_night":for(let e=0;e<14;e++)h.push(o());break;case"partly_cloudy":for(let e=0;e<3;e++)h.push(n(.035,.4));for(let e=0;e<4;e++)h.push(s("rgba(251,191,36,"));break;case"cloudy":for(let e=0;e<5;e++)h.push(n(.045,.35));break;case"foggy":for(let e=0;e<7;e++)h.push(c());break;case"rainy":for(let e=0;e<20;e++)h.push(a("rgba(96,165,250,",14,24,4,7,.14));for(let e=0;e<3;e++)h.push(n(.025,.3));break;case"pouring":for(let e=0;e<35;e++)h.push(a("rgba(59,130,246,",18,30,5.5,9,.1));for(let e=0;e<4;e++)h.push(n(.035,.35));break;case"stormy":for(let e=0;e<28;e++)h.push(a("rgba(167,139,250,",16,28,5,8,.26));for(let e=0;e<4;e++)h.push(n(.05,.5));this._flashState.interval=this._rnd(80,200);break;case"lightning":for(let e=0;e<4;e++)h.push(n(.04,.4));this._flashState.interval=this._rnd(60,160),this._flashState.color="rgba(192,132,252,";break;case"snowy":for(let e=0;e<18;e++)h.push(r());for(let e=0;e<3;e++)h.push(n(.025,.2));break;case"snowy_rainy":for(let e=0;e<10;e++)h.push(r());for(let e=0;e<14;e++)h.push(a("rgba(96,165,250,",12,20,3.5,6,.14));break;case"hail":for(let e=0;e<14;e++)h.push(d());for(let e=0;e<10;e++)h.push(a("rgba(96,165,250,",10,18,3.5,5.5,.14));break;case"windy":for(let e=0;e<8;e++)h.push(l());break;case"windy_variant":for(let e=0;e<6;e++)h.push(l());for(let e=0;e<4;e++)h.push(n(.035,1.2));break;case"exceptional":for(let e=0;e<8;e++)h.push(s("rgba(252,165,165,"));for(let e=0;e<5;e++)h.push(l())}}_updateParticle(e){const t=this._cW,i=this._cH;switch(e.type){case"drop":e.x=e.x+Math.sin(e.angle)*e.speed,e.y=e.y+Math.cos(e.angle)*e.speed,e.y>i+10&&(e.y=this._rnd(-30,-5),e.x=this._rnd(0,t));break;case"flake":e.y=e.y+e.speed,e.phase=e.phase+.02,e.x=e.x+e.drift+.3*Math.sin(e.phase),e.y>i+10&&(e.y=this._rnd(-10,-3),e.x=this._rnd(0,t));break;case"mote":{e.life=e.life+1,e.y=e.y-e.speed,e.x=e.x+e.drift+.2*Math.sin(e.phase+.015*e.life);const a=e.life/e.maxLife;e.opacity=a<.15?a/.15*e.maxOp:a>.85?(1-a)/.15*e.maxOp:e.maxOp,e.life>=e.maxLife&&(e.life=0,e.x=this._rnd(.1*t,.9*t),e.y=this._rnd(.3*i,.9*i),e.maxLife=this._rnd(180,360),e.maxOp=this._rnd(.3,.7));break}case"star":e.phase=e.phase+e.speed;break;case"cloud":e.x=e.x+e.speed,e.x>t+20&&(e.x=-e.w-this._rnd(10,60),e.y=this._rnd(.05*i,.6*i));break;case"streak":e.x=e.x+e.speed,e.x>t+20&&(e.x=this._rnd(-80,-20),e.y=this._rnd(.1*i,.85*i));break;case"fog":e.x=e.x+e.speed,e.x>t+40&&(e.x=-e.w-this._rnd(20,80),e.y=this._rnd(.15*i,.75*i));break;case"hail":e.y=e.y+e.speed,e.y>i+10&&(e.y=this._rnd(-15,-3),e.x=this._rnd(0,t))}}_drawParticle(e,t){switch(t.type){case"drop":{const i=Math.sin(t.angle)*t.len,a=Math.cos(t.angle)*t.len,r=e.createLinearGradient(t.x,t.y,t.x+i,t.y+a);r.addColorStop(0,t.color+"0)"),r.addColorStop(1,t.color+t.opacity+")"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+i,t.y+a),e.strokeStyle=r,e.lineWidth=1.5,e.stroke();break}case"flake":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break;case"mote":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle=t.color+t.opacity+")",e.shadowColor=t.color+.5*t.opacity+")",e.shadowBlur=6,e.fill(),e.shadowBlur=0;break;case"star":{const i=.15+.75*(.5+.5*Math.sin(t.phase));e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+i+")",e.fill();break}case"cloud":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"streak":{const i=e.createLinearGradient(t.x,t.y,t.x+t.w,t.y);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.5,"rgba(255,255,255,"+t.opacity+")"),i.addColorStop(1,"rgba(255,255,255,0)"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+t.w,t.y),e.strokeStyle=i,e.lineWidth=1,e.stroke();break}case"fog":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"hail":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(224,242,254,"+t.opacity+")",e.fill(),e.beginPath(),e.arc(t.x-.25*t.r,t.y-.25*t.r,.4*t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+.3*t.opacity+")",e.fill()}}_updateFlash(){const e=this._flashState;e.timer++,e.on?(e.opacity*=.82,e.opacity<.02&&(e.on=!1,e.opacity=0,e.timer=0,e.interval=this._rnd(80,280))):e.timer>e.interval&&(e.on=!0,e.opacity=this._rnd(.12,.22))}_computeSparkline(e){const t=e.length;if(t<2)return{linePath:"",areaPath:"",nowY:32};let i=1/0,a=-1/0;for(const n of e)n.temperature<i&&(i=n.temperature),n.temperature>a&&(a=n.temperature);const r=a-i||1,s=e.map((e,i)=>({x:i/(t-1)*348,y:10+(a-e.temperature)/r*44}));let o=`M${s[0].x},${s[0].y}`;for(let n=0;n<s.length-1;n++){const e=s[Math.max(n-1,0)],t=s[n],i=s[Math.min(n+1,s.length-1)],a=s[Math.min(n+2,s.length-1)];o+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}return{linePath:o,areaPath:o+" L348,64 L0,64 Z",nowY:s[0].y}}render(){this._lang;try{return this._renderContent()}catch(e){return console.error("[glass-weather-card] render error:",e),X`<div class="weather-card-wrap"><div class="glass weather-card"><div class="card-inner" style="padding:16px;text-align:center;color:var(--c-alert);font-size:var(--fz-base);">
        <ha-icon .icon=${"mdi:alert-circle-outline"} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"></ha-icon>
        Weather render error</div></div></div>`}}_renderContent(){const e=this._getWeatherState();if(!e)return X`<div class="weather-card-wrap">
        ${this._weatherConfig.show_header?X`<div class="card-header"><span class="card-title">${Qe("weather.title")}</span></div>`:J}
        <div class="glass weather-card"><div class="card-inner" style="padding:20px;text-align:center;color:var(--t3);font-size:var(--fz-base);">${Qe("common.no_entity")}</div></div>
      </div>`;const t=e.attributes,i=e.state,a=this._mapCondition(i),r=this._getConditionMeta(a),s=t.temperature??0,o=t.apparent_temperature,n=t.humidity,l=t.wind_speed,c=t.wind_speed_unit??"km/h",d=t.wind_bearing,h=t.pressure,p=t.visibility,u=t.uv_index,g=t.friendly_name??"",m=t.temperature_unit??"°C",_=this.hass?.states["sun.sun"],f=_?.attributes.next_rising,b=_?.attributes.next_setting,v=f?new Date(f).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",y=b?new Date(b).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",w=new Set(this._weatherConfig.hidden_metrics),x=this._forecastHourly.slice(0,10),k=this._computeSparkline(x),$=`background: radial-gradient(ellipse at 80% 20%, ${r.tint}, transparent 70%); opacity: ${r.tintOp};`;return X`
      <div class="weather-card-wrap">
        ${this._weatherConfig.show_header?X`
          <div class="card-header">
            <span class="card-title">${Qe("weather.title")}</span>
            <span class="card-location">${g}</span>
          </div>
        `:J}

        <div class="glass weather-card">
          <div class="tint" style="${$}"></div>
          <canvas class="wc-anim"></canvas>
          <div class="card-inner">

            <!-- Header: clock + weather -->
            <div class="wc-header">
              <div class="wc-clock-zone">
                <div>
                  <span class="wc-clock-hm">${this._clockTime}</span><span class="wc-clock-sec">${this._clockSec}</span>
                </div>
                <span class="wc-clock-date"><span class="wc-clock-day">${this._clockDay}</span> ${this._clockDate}</span>
              </div>
              <div class="wc-weather-zone">
                <div class="wc-temp-row">
                  <span class="wc-temp">${Math.round(s)}</span>
                  <span class="wc-temp-unit">${m}</span>
                </div>
                <div class="wc-cond-row">
                  <ha-icon .icon="${r.icon}" class="wc-cond-icon ${a}"></ha-icon>
                  <span class="wc-cond-text">${Qe(r.textKey)}</span>
                </div>
                ${null!=o?X`<span class="wc-feels">${Qe("weather.feels_like",{temp:Math.round(o)})}</span>`:J}
              </div>
            </div>

            <!-- Sparkline -->
            ${x.length>=2?X`
              <div class="wc-spark-zone">
                <svg class="wc-spark-svg" viewBox="0 0 348 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${r.sparkFill}" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  ${Q`<path class="wc-spark-area" d="${k.areaPath}" fill="url(#sparkGrad)" />`}
                  ${Q`<path class="wc-spark-line" d="${k.linePath}" stroke="${r.sparkStroke}" />`}
                </svg>
                <div class="wc-spark-now" style="left:0px;">
                  <div class="wc-spark-now-dot" style="top:${k.nowY/64*100}%"></div>
                </div>
                <div class="wc-spark-labels">
                  ${x.map((e,t)=>X`<span class="wc-spark-lbl">${t%2==0||t===x.length-1?0===t?Qe("weather.now"):new Date(e.datetime).getHours()+"h":""}</span>`)}
                </div>
              </div>
            `:J}

            <!-- Metrics -->
            ${this._renderMetrics(w,n,l,c,d,h,u,p,v,y)}

            <!-- Forecast -->
            ${this._renderForecasts(m)}

          </div>
        </div>
      </div>
    `}_renderMetrics(e,t,i,a,r,s,o,n,l,c){const d=[];var h;return e.has("humidity")||null==t||d.push(X`<div class="wc-metric humidity">
        <ha-icon icon="mdi:water-percent"></ha-icon>
        <span class="wc-metric-val">${t}%</span>
      </div>`),e.has("wind")||null==i||d.push(X`<div class="wc-metric wind">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        <span class="wc-metric-val">${Math.round(i)}</span>
        <span class="wc-metric-unit">${a}</span>
        <span class="wc-metric-dir">${h=r,null==h?"":Qe(`weather.${Lt[Math.round((+h%360+360)%360/22.5)%16]}`)}</span>
      </div>`),e.has("pressure")||null==s||d.push(X`<div class="wc-metric pressure">
        <ha-icon icon="mdi:gauge"></ha-icon>
        <span class="wc-metric-val">${Math.round(s)}</span>
        <span class="wc-metric-unit">hPa</span>
      </div>`),e.has("uv")||null==o||d.push(X`<div class="wc-metric uv">
        <ha-icon icon="mdi:sun-wireless"></ha-icon>
        <span class="wc-metric-val">${Math.round(o)}</span>
        <span class="wc-metric-unit">UV</span>
      </div>`),e.has("visibility")||null==n||d.push(X`<div class="wc-metric visibility">
        <ha-icon icon="mdi:eye-outline"></ha-icon>
        <span class="wc-metric-val">${n}</span>
        <span class="wc-metric-unit">km</span>
      </div>`),!e.has("sunrise")&&l&&d.push(X`<div class="wc-metric sunrise">
        <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
        <span class="wc-metric-val">${l}</span>
      </div>`),!e.has("sunset")&&c&&d.push(X`<div class="wc-metric sunset">
        <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
        <span class="wc-metric-val">${c}</span>
      </div>`),0===d.length?J:X`<div class="wc-metrics">
      ${d}
    </div>`}_renderForecasts(e){const t=this._weatherConfig.show_daily,i=this._weatherConfig.show_hourly;return t||i?X`
      <div class="wc-forecast-zone">
        <div class="wc-fc-tabs">
          ${t?X`<button class="wc-fc-tab ${"daily"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("daily")}"
            aria-expanded="${"daily"===this._activeTab?"true":"false"}"
            aria-controls="wc-daily-panel"
            aria-label="${Qe("weather.daily_tab")}">${Qe("weather.daily_tab")}</button>`:J}
          ${i?X`<button class="wc-fc-tab ${"hourly"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("hourly")}"
            aria-expanded="${"hourly"===this._activeTab?"true":"false"}"
            aria-controls="wc-hourly-panel"
            aria-label="${Qe("weather.hourly_tab")}">${Qe("weather.hourly_tab")}</button>`:J}
        </div>

        <div class="wc-fold-sep ${"daily"===this._activeTab&&this._forecastDaily.length>0||"hourly"===this._activeTab&&this._forecastHourly.length>0?"visible":""}"></div>

        ${t?X`
          <div class="fold ${"daily"===this._activeTab?"open":""}" id="wc-daily-panel" role="region" aria-label="${Qe("weather.daily_tab")}" aria-hidden="${"daily"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-daily-list">
                ${this._forecastDaily.slice(0,7).map((e,t)=>{const i=this._mapCondition(e.condition),a=this._getConditionMeta(i),r=new Date(e.datetime),s=0===t?Qe("weather.today"):(o=r,n=this._lang,o.toLocaleDateString(n,{weekday:"short"}));var o,n;return X`
                    <div class="wc-day-row">
                      <span class="wc-day-label">${s}</span>
                      <ha-icon .icon="${a.icon}" class="wc-day-icon ${i}"></ha-icon>
                      <span class="wc-day-cond">${Qe(a.textKey)}</span>
                      <div class="wc-day-temps">
                        <span class="wc-day-hi">${Math.round(e.temperature)}&deg;</span>
                        ${null!=e.templow?X`<span class="wc-day-lo">${Math.round(e.templow)}&deg;</span>`:J}
                      </div>
                      <span class="wc-day-precip">${null!=e.precipitation_probability&&e.precipitation_probability>0?e.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:J}

        ${i?X`
          <div class="fold ${"hourly"===this._activeTab?"open":""}" id="wc-hourly-panel" role="region" aria-label="${Qe("weather.hourly_tab")}" aria-hidden="${"hourly"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-hourly-list">
                ${this._forecastHourly.slice(0,10).map((t,i)=>{const a=this._mapCondition(t.condition),r=this._getConditionMeta(a),s=new Date(t.datetime),o=0===i?Qe("weather.now"):s.getHours()+"h";return X`
                    <div class="wc-hour-row ${0===i?"now":""}">
                      <span class="wc-hour-time">${o}</span>
                      <ha-icon .icon="${r.icon}" class="wc-hour-icon ${a}"></ha-icon>
                      <span class="wc-hour-cond">${Qe(r.textKey)}</span>
                      <span class="wc-hour-temp">${Math.round(t.temperature)}${e}</span>
                      <span class="wc-hour-precip">${null!=t.precipitation_probability&&t.precipitation_probability>0?t.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:J}
      </div>
    `:J}_switchTab(e){this._activeTab=this._activeTab===e?null:e}}Et([xe()],Rt.prototype,"_activeTab"),Et([xe()],Rt.prototype,"_forecastDaily"),Et([xe()],Rt.prototype,"_forecastHourly"),Et([xe()],Rt.prototype,"_clockTime"),Et([xe()],Rt.prototype,"_clockSec"),Et([xe()],Rt.prototype,"_clockDay"),Et([xe()],Rt.prototype,"_clockDate");try{customElements.define("glass-weather-card",Rt)}catch{}tt("glass-cover-card-editor");var Ot=Object.defineProperty,Dt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ot(t,i,s),s};const jt=1,Ft=2,qt=4,Ht=8,Nt=128,Vt={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains-closed"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"],awning:["mdi:awning-outline","mdi:awning-outline"],shade:["mdi:roller-shade-open","mdi:roller-shade"],window:["mdi:window-open","mdi:window-closed"],damper:["mdi:valve-open","mdi:valve"]},Ut={vertical:{open:"mdi:arrow-up",close:"mdi:arrow-down",stop:"mdi:stop"},garage:{open:"mdi:garage-open",close:"mdi:garage",stop:"mdi:stop"},gate:{open:"mdi:gate-open",close:"mdi:gate",stop:"mdi:stop"},door:{open:"mdi:door-open",close:"mdi:door-closed",stop:null},damper:{open:"mdi:valve-open",close:"mdi:valve",stop:null},window:{open:"mdi:window-open",close:"mdi:window-closed",stop:null}};function Wt(e,t){return(Vt[e]||Vt.shutter)[t?0:1]}class Bt extends rt{constructor(){super(...arguments),this._expanded=null,this._coverConfig={show_header:!0,dashboard_entities:[],dashboard_compact:!0,entity_presets:{}},this._roomConfig=null,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1,this._throttleTimers=new Map,this._lastDirection=new Map,this._coversCache=null,this._coversCacheKey=""}static getConfigElement(){return document.createElement("glass-cover-card-editor")}getCardSize(){return 3}static{this.styles=[Se,Ie,Te,Me,ze,Pe,Ve,h`
    :host {
      width: 100%;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    .cover-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem;
      margin-bottom: 0.375rem; min-height: 1.375rem;
    }
    .cover-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .cover-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .cover-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
      border-radius: var(--radius-full); font-size: var(--fz-xs); font-weight: 600;
      transition: background var(--t-med), color var(--t-med);
    }
    .cover-count.some { background: rgba(var(--rgb-purple),0.15); color: var(--cv-color, #a78bfa); }
    .cover-count.none { background: var(--s2); color: var(--t3); }
    .cover-count.all  { background: rgba(var(--rgb-purple),0.2); color: var(--cv-color, #a78bfa); }

    .cover-header-actions { display: flex; gap: 0.25rem; }
    .header-btn {
      width: 1.375rem; height: 1.375rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast); -webkit-tap-highlight-color: transparent;
    }
    .header-btn ha-icon {
      --mdc-icon-size: var(--icon-sm);
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .header-btn:hover { background: var(--s3); border-color: var(--b3); }
      .header-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) and (pointer: fine) {
      .header-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .header-btn:active { animation: bounce 0.3s ease; }
    }
    .header-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    .cover-card { position: relative; padding: 0.125rem 0.875rem; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    }
    :host([size="xs"]) .card-inner,
    :host([size="sm"]) .card-inner {
      grid-template-columns: 1fr;
    }

    /* Tint */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow), background var(--t-slow);
    }

    /* ── Row ── */
    .cv-row {
      display: flex; align-items: center; gap: 0.625rem;
      grid-column: 1 / -1;
      padding: 0.5rem 0.25rem; position: relative;
      border-radius: var(--radius-md);
      transition: background var(--t-fast);
    }
    .cv-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .cv-row.compact-right { padding-left: 0.625rem; }
    .cv-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 0.0625rem;
      background: linear-gradient(180deg, transparent, var(--b2), transparent);
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .cv-row:active { animation: bounce 0.3s ease; }
    }


    .cv-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 0.625rem;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-expand-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; border-radius: var(--radius-sm); }

    .cv-icon-btn {
      width: 2.25rem; height: 2.25rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      cursor: pointer; padding: 0; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-icon-btn ha-icon {
      --mdc-icon-size: var(--icon-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: color var(--t-fast), filter var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
      .cv-icon-btn:hover ha-icon { color: var(--t2); }
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-icon-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .cv-icon-btn:active { animation: bounce 0.3s ease; }
    }
    .cv-icon-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    .cv-row.open .cv-icon-btn { background: rgba(var(--rgb-purple),0.1); border-color: rgba(var(--rgb-purple),0.15); }
    .cv-row.open .cv-icon-btn ha-icon { color: var(--cv-color, #a78bfa); filter: drop-shadow(0 0 6px rgba(var(--rgb-purple),0.4)); }
    .entity-unavailable .cv-icon-btn { border-color: var(--c-alert); }

    .cv-info { flex: 1; min-width: 0; }
    .cv-name {
      font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2;
      overflow: hidden; white-space: nowrap;
    }
    .cv-sub { display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.125rem; }
    .cv-state-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .cv-row.open .cv-state-text { color: rgba(var(--rgb-purple),0.6); }
    .cv-position {
      font-size: var(--fz-lg); font-weight: 700; color: var(--t3);
      font-variant-numeric: tabular-nums; flex-shrink: 0;
      transition: color var(--t-med);
    }
    .cv-position .unit { font-size: var(--fz-sm); font-weight: 500; }
    .cv-row.open .cv-position { color: var(--cv-color, #a78bfa); }

    .cv-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: background var(--t-med), box-shadow var(--t-med);
    }
    .cv-row.open .cv-dot {
      background: var(--cv-color, #a78bfa); box-shadow: 0 0 8px rgba(var(--rgb-purple),0.4);
    }

    /* Unavailable badge inline (replaces dot) */
    .cv-expand-btn .unavailable-badge {
      position: static;
      flex-shrink: 0;
      --mdc-icon-size: 0.75rem;
      color: var(--c-warning);
    }

    /* ── Fold ── */
    .fold-sep {
      grid-column: 1 / -1;
      height: 0.0625rem; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-purple),0.25), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .fold-sep.visible { opacity: 1; }

    .ctrl-fold {
      grid-column: 1 / -1;
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden; opacity: 0;
      transition: opacity var(--t-fast);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

    .ctrl-panel {
      padding: 0.375rem 0 0.25rem;
      display: flex; flex-direction: column; gap: 0.625rem;
    }
    .ctrl-label {
      font-size: var(--fz-sm); font-weight: 600; letter-spacing: 0.5px;
      color: rgba(var(--rgb-purple),0.6); text-transform: uppercase;
    }

    /* Transport */
    .transport-row {
      display: flex; align-items: center; justify-content: center; gap: 0.375rem;
    }
    .transport-btn {
      width: 2.75rem; height: 2.75rem; border-radius: var(--radius-lg);
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .transport-btn ha-icon {
      --mdc-icon-size: var(--icon-lg);
      display: flex; align-items: center; justify-content: center;
      color: var(--t2); transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .transport-btn:hover { background: var(--s3); border-color: var(--b3); }
      .transport-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) and (pointer: fine) {
      .transport-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .transport-btn:active { animation: bounce 0.3s ease; }
    }
    .transport-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    .transport-btn.accent { background: rgba(var(--rgb-purple),0.1); border-color: rgba(var(--rgb-purple),0.15); }
    .transport-btn.accent ha-icon { color: var(--cv-color, #a78bfa); }

    /* Slider */
    .slider-wrap { display: flex; align-items: center; gap: 0.5rem; }
    .slider-icon {
      display: flex; align-items: center; justify-content: center;
      width: 1.75rem; height: 1.75rem; flex-shrink: 0;
    }
    .slider-icon ha-icon {
      --mdc-icon-size: var(--icon-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    glass-slider { flex: 1; }

    /* Presets */
    .preset-row { display: flex; gap: 0.375rem; flex-wrap: wrap; }
    .chip {
      display: inline-flex; align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.75rem; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    .chip ha-icon {
      --mdc-icon-size: var(--icon-sm);
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .chip:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .chip:active { animation: bounce 0.3s ease; }
    }
    .chip.active { border-color: rgba(var(--rgb-purple),0.15); background: rgba(var(--rgb-purple),0.1); color: var(--cv-color, #a78bfa); }

    .ctrl-sep { height: 0.0625rem; background: var(--b1); margin: 0.125rem 0; }
  `]}connectedCallback(){super.connectedCallback(),this._listen("cover-config-changed",()=>{this._coversCacheKey="",this._loadConfig()}),this._listen("room-config-changed",e=>{this.areaId&&e.areaId===this.areaId&&(this._roomConfig=null,this._coversCacheKey="",this._loadRoomConfig(this.areaId))})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_collapseExpanded(){null!==this._expanded&&(this._expanded=null)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomConfig=null,this._roomLoading=!1),this._configLoaded||this._configLoading||(this._backend=new dt(this.hass),this._loadConfig())),e.has("areaId")&&this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._roomConfig=null,this._expanded=null,this.areaId&&this._loadRoomConfig(this.areaId))}getTrackedEntityIds(){return this._getCovers().map(e=>e.entityId)}async _loadConfig(){if(this._backend&&!this._configLoading){this._configLoading=!0;try{const e=await this._backend.send("get_config");e?.cover_card&&(this._coverConfig=e.cover_card),this._configLoaded=!0,this._configLoading=!1,this.areaId&&this._loadRoomConfig(this.areaId),this.requestUpdate()}catch{this._configLoading=!1}}}async _loadRoomConfig(e){if(this._backend&&!this._roomLoading){this._roomLoading=!0;try{const t=await this._backend.send("get_room",{area_id:e});this.areaId===e&&(this._roomConfig=t?{...t,entity_layouts:t.entity_layouts??{}}:null,this.requestUpdate())}catch{}finally{this._roomLoading=!1}}}_getCovers(){if(!this.hass)return[];let e;if(this.areaId){if(e=nt(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id),this._roomConfig){const t=new Set(this._roomConfig.hidden_entities);e=e.filter(e=>!t.has(e));const i=this._roomConfig.entity_order;e.sort((e,t)=>{const a=i.indexOf(e),r=i.indexOf(t);return-1!==a&&-1!==r?a-r:-1!==a?-1:-1!==r?1:0})}}else e=this._coverConfig.dashboard_entities;const t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.attributes.current_position}:${t.attributes.current_tilt_position}`:e}).join("|");return t===this._coversCacheKey&&this._coversCache||(this._coversCache=e.map(e=>{const t=this.hass?.states[e];return t?function(e,t){const i=t.attributes,a=i.device_class||"shutter",r=i.supported_features||0,s=i.current_position,o=i.current_tilt_position,n="open"===t.state||"opening"===t.state;return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,isOpen:n,position:s??null,tiltPosition:o??null,deviceClass:a,features:r}}(e,t):null}).filter(e=>null!==e),this._coversCacheKey=t),this._coversCache}_toggleCover(e,t){if(t?.stopPropagation(),!this.hass)return;const i=e.entity.state;if("opening"===i||"closing"===i)this._lastDirection.set(e.entityId,i),this._safeCallService("cover","stop_cover",{},{entity_id:e.entityId});else if("closed"===i)this._lastDirection.delete(e.entityId),this._safeCallService("cover","open_cover",{},{entity_id:e.entityId});else{const t=this._lastDirection.get(e.entityId);this._lastDirection.delete(e.entityId),"opening"===t?this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}):"closing"===t?this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}):this._safeCallService("cover","close_cover",{},{entity_id:e.entityId})}}_openCover(e,t){t.stopPropagation(),this.hass&&(st(this,"light"),this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}))}_closeCover(e,t){t.stopPropagation(),this.hass&&(st(this,"light"),this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}))}_stopCover(e,t){t.stopPropagation(),this.hass&&(st(this,"light"),this._safeCallService("cover","stop_cover",{},{entity_id:e.entityId}))}_setPosition(e,t){if(!this.hass)return;const i=this._throttleTimers.get(e.entityId);i&&clearTimeout(i),this._throttleTimers.set(e.entityId,window.setTimeout(()=>{this._throttleTimers.delete(e.entityId),this._safeCallService("cover","set_cover_position",{position:t},{entity_id:e.entityId})},50))}_setTiltPosition(e,t){if(!this.hass)return;const i=`${e.entityId}_tilt`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,window.setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("cover","set_cover_tilt_position",{tilt_position:t},{entity_id:e.entityId})},50))}_openAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&jt&&this._safeCallService("cover","open_cover",{},{entity_id:t.entityId})}_closeAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&Ft&&this._safeCallService("cover","close_cover",{},{entity_id:t.entityId})}_setPreset(e,t,i){i.stopPropagation(),this.hass&&(st(this,"light"),e.features&qt?this._safeCallService("cover","set_cover_position",{position:t},{entity_id:e.entityId}):t>0?this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}):this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}))}_toggleExpand(e){this._expanded=this._expanded===e?null:e}render(){this._lang;const e=this._getCovers();if(0===e.length&&!this.areaId)return this.style.display="none",J;this.style.display="";const t=this._coverConfig.show_header,i=e.filter(e=>e.isOpen).length,a=e.length;return X`
      ${t?X`
        <div class="cover-header">
          <div class="cover-header-left">
            <span class="cover-title">${Qe("cover.title")}</span>
            <span class="cover-count ${0===i?"none":i===a?"all":"some"}">${i}/${a}</span>
          </div>
          <div class="cover-header-actions">
            <button class="header-btn" @click=${()=>this._openAll()} aria-label=${Qe("cover.open_all_aria")}>
              <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
            </button>
            <button class="header-btn" @click=${()=>this._closeAll()} aria-label=${Qe("cover.close_all_aria")}>
              <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
            </button>
          </div>
        </div>
      `:J}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${a>0?(i/a*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${0===e.length?X`
            <div style="padding:16px;text-align:center;font-size:var(--fz-base);color:var(--t4);grid-column:1/-1;">${Qe("config.cover_no_covers")}</div>
          `:J}
          ${this.areaId?this._renderGrid(e):this._renderDashboardGrid(e)}
        </div>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(r,!0,!0)),t.push(this._renderControlFold(a,s)),t.push(this._renderControlFold(r,s)),i+=2}else{const r=i+1>=e.length;t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,r)),i++}}else{const r=i+1>=e.length;t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,r)),i++}}return t}_renderDashboardGrid(e){if(!(!1!==this._coverConfig.dashboard_compact))return e.map((t,i)=>{const a=i+1>=e.length;return[this._renderCoverRow(t,!1,!1),this._renderControlFold(t,a)]}).flat();const t=[];let i=0;for(;i<e.length;){const a=e[i],r=i+1<e.length?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(r,!0,!0)),t.push(this._renderControlFold(a,s)),t.push(this._renderControlFold(r,s)),i+=2}else t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,!0)),i++}return t}_renderCoverRow(e,t=!1,i=!1){const a=this._expanded===e.entityId,r=Ue(e.entity.state),s=["cv-row",e.isOpen?"open":"",t?"compact":"",i?"compact-right":"",r?"entity-unavailable":""].filter(Boolean).join(" "),o=this._bindGesture({onTap:()=>this._toggleCover(e),onLongPress:()=>this._toggleExpand(e.entityId),exclude:".cv-icon-btn"});return X`
      <div
        class=${s}
        @pointerdown=${o.pointerdown}
        @pointerup=${o.pointerup}
        @pointermove=${o.pointermove}
        @pointercancel=${o.pointercancel}
        @contextmenu=${o.contextmenu}
      >
        <button
          class="cv-icon-btn"
          @click=${t=>this._toggleCover(e,t)}
          aria-label=${Qe("cover.toggle_aria",{name:e.name})}
        >
          <ha-icon .icon=${Wt(e.deviceClass,e.isOpen)}></ha-icon>
        </button>
        <button
          class="cv-expand-btn"
          aria-expanded=${a?"true":"false"}
          aria-label=${Qe("cover.expand_aria",{name:e.name})}
        >
          <div class="cv-info">
            <div class="cv-name">${Ae(e.name,t?12:Ee)}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${function(e){switch(e){case"open":return Qe("cover.open");case"closed":return Qe("cover.closed");case"opening":return Qe("cover.opening");case"closing":return Qe("cover.closing");default:return e}}(e.entity.state)}</span>
            </div>
          </div>
          ${null!==e.position?X`
            <div class="cv-position">${e.position}<span class="unit">%</span></div>
          `:J}
          ${r?X`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:X`<div class="cv-dot"></div>`}
        </button>
      </div>
    `}_renderControlFold(e,t=!1){const i=this._expanded===e.entityId;return X`
      <div class="fold-sep ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):J}
        </div>
      </div>
      ${t?J:X`<div class="fold-sep ${i?"visible":""}"></div>`}
    `}_renderControls(e){const t=e.features,i=(a=e.deviceClass,["shutter","blind","shade","curtain","awning"].includes(a)?Ut.vertical:Ut[a]||Ut.vertical);var a;const r=!!(t&qt),s=!!(t&Nt),o=[];if(r){const t=this._coverConfig.entity_presets[e.entityId],i=t&&t.length>0?t:[0,25,50,75,100];for(const a of i){const t=a>=50,i=0===a?Qe("cover.preset_closed"):100===a?Qe("cover.preset_open"):`${a}%`;o.push({label:i,icon:Wt(e.deviceClass,t),position:a})}}else o.push({label:Qe("cover.preset_closed"),icon:Wt(e.deviceClass,!1),position:0},{label:Qe("cover.preset_open"),icon:Wt(e.deviceClass,!0),position:100});return X`
      <div class="ctrl-panel">
        <span class="ctrl-label">${e.name}</span>

        <!-- Transport -->
        <div class="transport-row">
          ${t&jt?X`
            <button class="transport-btn ${100===e.position||null===e.position&&e.isOpen?"accent":""}"
              @click=${t=>this._openCover(e,t)}
              aria-label=${Qe("cover.open_aria",{name:e.name})}>
              <ha-icon .icon=${i.open}></ha-icon>
            </button>
          `:J}
          ${t&Ht?X`
            <button class="transport-btn"
              @click=${t=>this._stopCover(e,t)}
              aria-label=${Qe("cover.stop_aria",{name:e.name})}>
              <ha-icon .icon=${i.stop||"mdi:stop"}></ha-icon>
            </button>
          `:J}
          ${t&Ft?X`
            <button class="transport-btn ${0===e.position||null===e.position&&!e.isOpen?"accent":""}"
              @click=${t=>this._closeCover(e,t)}
              aria-label=${Qe("cover.close_aria",{name:e.name})}>
              <ha-icon .icon=${i.close}></ha-icon>
            </button>
          `:J}
        </div>

        <!-- Position slider -->
        ${r?X`
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${Wt(e.deviceClass,!1)}></ha-icon></div>
            <glass-slider
              .value=${e.position??0}
              color="var(--rgb-purple)"
              .label=${`${e.position??0}%`}
              @glass-slider-input=${t=>this._setPosition(e,t.detail.value)}
              @glass-slider-change=${t=>this._setPosition(e,t.detail.value)}
            ></glass-slider>
            <div class="slider-icon"><ha-icon .icon=${Wt(e.deviceClass,!0)}></ha-icon></div>
          </div>
        `:J}

        <!-- Tilt slider -->
        ${s?X`
          <span class="ctrl-label">${Qe("cover.tilt")}</span>
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${"mdi:blinds"}></ha-icon></div>
            <glass-slider
              .value=${e.tiltPosition??0}
              color="var(--rgb-purple)"
              .label=${`${e.tiltPosition??0}%`}
              @glass-slider-input=${t=>this._setTiltPosition(e,t.detail.value)}
              @glass-slider-change=${t=>this._setTiltPosition(e,t.detail.value)}
            ></glass-slider>
            <div class="slider-icon"><ha-icon .icon=${"mdi:blinds-open"}></ha-icon></div>
          </div>
        `:J}

        <!-- Presets -->
        <div class="ctrl-sep"></div>
        <div class="preset-row">
          ${o.map(t=>X`
            <button
              class="chip ${e.position===t.position?"active":""}"
              @click=${i=>this._setPreset(e,t.position,i)}
              aria-label=${t.label}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span>${t.label}</span>
            </button>
          `)}
        </div>
      </div>
    `}}Dt([we()],Bt.prototype,"areaId"),Dt([xe()],Bt.prototype,"_expanded");try{customElements.define("glass-cover-card",Bt)}catch{}const Gt=1,Kt=2,Xt=4,Qt=8,Yt=16,Jt=32,Zt=64,ei=128,ti=256,ii={heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},ai={heat:"var(--cl-heat)",cool:"var(--cl-cool)",heat_cool:"var(--cl-auto)",auto:"var(--cl-auto)",dry:"var(--cl-dry)",fan_only:"var(--cl-fan)",off:"var(--t4)"},ri={heating:"climate.action_heating",cooling:"climate.action_cooling",idle:"climate.action_idle",off:"climate.action_off",drying:"climate.action_drying",preheating:"climate.action_heating"},si={eco:"mdi:leaf",comfort:"mdi:sofa",boost:"mdi:rocket-launch",away:"mdi:home-export-outline",sleep:"mdi:bed",activity:"mdi:motion-sensor",none:"mdi:cancel"},oi={heat:"climate.mode_heat",cool:"climate.mode_cool",heat_cool:"climate.mode_heat_cool",auto:"climate.mode_auto",dry:"climate.mode_dry",fan_only:"climate.mode_fan_only",off:"climate.mode_off"},ni={eco:"climate.preset_eco",comfort:"climate.preset_comfort",boost:"climate.preset_boost",away:"climate.preset_away",sleep:"climate.preset_sleep",activity:"climate.preset_activity",none:"climate.preset_none"};const li=120,ci=125,di=90,hi=-120,pi={heating:"mdi:fire",cooling:"mdi:snowflake",idle:"mdi:timer-sand",off:"mdi:power-standby",drying:"mdi:water-percent",preheating:"mdi:fire"};function ui(e,t,i,a){const r=function(e){return(e-90)*Math.PI/180}(a);return{x:e+i*Math.cos(r),y:t+i*Math.sin(r)}}function gi(e,t){const i=ui(li,ci,di,e),a=ui(li,ci,di,t);return`M ${i.x} ${i.y} A 90 90 0 1 1 ${a.x} ${a.y}`}function mi(e){const t=e.attributes,i="unavailable"===e.state||"unknown"===e.state,a="off"===e.state||i,r=i?"off":t.hvac_action||("off"===e.state?"off":"idle"),s=e.state,o=t.current_temperature,n=t.temperature??o??0,l=t.min_temp||7,c=t.max_temp||35,d=t.current_humidity,h=t.preset_mode,p=Math.PI*di*(240/180),u=(null!=o?Math.max(0,Math.min(1,(o-l)/(c-l))):0)*p,g=function(e,t){return"heating"===e||"preheating"===e?"heat":"cooling"===e?"cool":"auto"===t||"heat_cool"===t?"auto-arc":"off"}(r,s),m=function(e){return"heating"===e||"preheating"===e?"heat":"cooling"===e?"cool":"idle"===e?"idle":"off"}(r),_=function(e,t,i){const a=Math.max(0,Math.min(1,(e-t)/(i-t)));return hi+240*a}(n,l,c),f=ui(li,ci,di,_),b=[];for(let x=0;x<=12;x++){const e=hi+x/12*240,t=x%3==0;b.push({inner:ui(li,ci,86,e),outer:ui(li,ci,di+(t?6:3),e),isMajor:t,labelPos:ui(li,ci,104,e),labelTemp:l+x/12*(c-l)})}const v=ri[r]||"climate.unknown",y=pi[r]||"mdi:help",w=null!=d||h&&"none"!==h;return X`
    <div class="gauge-section">
      <div class="arc-gauge">
        <svg viewBox="0 0 240 165" fill="none">
          ${b.map(e=>Q`
            <line x1=${e.inner.x} y1=${e.inner.y} x2=${e.outer.x} y2=${e.outer.y}
              class=${e.isMajor?"arc-tick-major":"arc-tick"} />
            ${e.isMajor?Q`
              <text x=${e.labelPos.x} y=${e.labelPos.y} class="arc-tick-label">
                ${Math.round(e.labelTemp)}°
              </text>
            `:J}
          `)}
          <path d=${gi(hi,120)} class="arc-bg" />
          ${a?J:Q`
            <path d=${gi(hi,120)}
              class="arc-progress ${g}"
              stroke-dasharray=${p}
              stroke-dashoffset=${p-u} />
            <circle cx=${f.x} cy=${f.y} r="5" class="arc-target-dot" />
          `}
        </svg>
        <div class="gauge-center">
          <div class="gauge-current-temp ${a?"off":""}">${null!=o?X`${o.toFixed(1)}<span class="unit">°</span>`:"--"}</div>
          <div class="gauge-action-label ${m}">
            <ha-icon .icon=${y} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${Qe(v)}</span>
          </div>
          ${w?X`
            <div class="gauge-sub-info">
              ${null!=d?X`
                <ha-icon .icon=${"mdi:water-percent"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${d}%</span>
              `:J}
              ${h&&"none"!==h?X`
                ${null!=d?X`<span style="opacity:0.4">·</span>`:J}
                <ha-icon .icon=${si[h]||"mdi:cog"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${ni[h]?Qe(ni[h]):h}</span>
              `:J}
            </div>
          `:J}
        </div>
      </div>
    </div>
  `}class _i{constructor(){this._canvas=null,this._particles=[],this._animFrame=null,this._currentAction="",this._width=0,this._height=0}attach(e){this._canvas=e}update(e,t,i){if(e===this._currentAction&&this._animFrame&&t===this._width&&i===this._height)return;if(this._currentAction=e,this._width=t,this._height=i,this.stop(),"off"===e||"idle"===e||!e){if(this._particles=[],this._canvas){const e=this._canvas.getContext("2d");e&&e.clearRect(0,0,this._canvas.width,this._canvas.height)}return}const a="heating"===e||"preheating"===e,r=2*t,s=2*i;if(this._particles=Array.from({length:30},()=>({x:Math.random()*r,y:Math.random()*s,size:1+2.5*Math.random(),speedX:.3*(Math.random()-.5),speedY:a?-(.3+.8*Math.random()):.3+.8*Math.random(),opacity:.1+.3*Math.random(),life:Math.random()})),!this._canvas)return;this._canvas.width=r,this._canvas.height=s,this._canvas.style.width=t+"px",this._canvas.style.height=i+"px";const o=this._canvas.getContext("2d");if(!o)return;const n=a?[249,115,22]:[56,189,248],l=()=>{o.clearRect(0,0,r,s);for(const e of this._particles){e.x+=e.speedX,e.y+=e.speedY,e.life+=.003;let t=e.opacity;e.life<.1&&(t*=e.life/.1),e.life>.8&&(t*=Math.max(0,(1-e.life)/.2)),(a&&e.y<-10||!a&&e.y>s+10||e.life>1)&&(e.y=a?s+10:-10,e.x=Math.random()*r,e.life=0),o.beginPath(),o.arc(e.x,e.y,e.size,0,2*Math.PI),o.fillStyle=`rgba(${n[0]},${n[1]},${n[2]},${t})`,o.fill(),o.beginPath(),o.arc(e.x,e.y,3*e.size,0,2*Math.PI),o.fillStyle=`rgba(${n[0]},${n[1]},${n[2]},${.15*t})`,o.fill()}this._animFrame=requestAnimationFrame(l)};l()}stop(){this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null)}destroy(){this.stop(),this._canvas=null,this._particles=[],this._currentAction=""}}tt("glass-climate-card-editor");var fi=Object.defineProperty,bi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&fi(t,i,s),s};const vi={heating:0,cooling:1,idle:2,off:3};class yi extends rt{constructor(){super(...arguments),this._showHeader=!0,this._displayMode="list",this._configReady=!1,this._expanded=null,this._selectedEntity=null,this._foldOpen=!1,this._climateConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._cachedClimatesFingerprint="",this._dashboardEntities=[],this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._pendingTemps=new Map,this._schedules=null,this._schedulesLoaded=!1,this._rangeState={dragging:null,lowTemp:0,highTemp:0},this._rangeDragEntity=null,this._rangeDragCleanup=null}static getConfigElement(){return document.createElement("glass-climate-card-editor")}getCardSize(){return 3}get _isDashboardMode(){return!this.areaId}connectedCallback(){super.connectedCallback(),this._listen("climate-config-changed",()=>{this._climateConfigLoaded=!1,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._loadConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._climateConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear(),this._pendingTemps.clear(),this._rangeDragCleanup&&(this._rangeDragCleanup(),this._rangeDragCleanup=null),this._thermalCanvas&&(this._thermalCanvas.destroy(),this._thermalCanvas=void 0)}_collapseExpanded(){null!==this._expanded&&(this._expanded=null),this._foldOpen&&(this._foldOpen=!1)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._climateConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._climateConfigLoaded&&this._loadConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="")}e.has("visibleAreaIds")&&(this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._dashboardHiddenLoaded=!1),"normal"===this._displayMode?this._updateThermalCanvas():this._thermalCanvas&&(this._thermalCanvas.destroy(),this._thermalCanvas=void 0)}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?ct("climate",this.hass,this.visibleAreaIds):this._getClimateIds()}async _loadConfig(){if(this.hass&&!this._climateConfigLoaded){this._climateConfigLoaded=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_config");e?.climate_card&&(this._showHeader=e.climate_card.show_header??!0,this._displayMode=this.areaId?e.climate_card.display_mode??"list":e.climate_card.dashboard_display_mode??"list",this._dashboardEntities=e.climate_card.dashboard_entities??[],this._cachedClimateIds=void 0,this._cachedClimatesFingerprint=""),this._configReady=!0}catch{this._configReady=!0}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new dt(this.hass));const t=this._backend,i=new Set,a=await Promise.all(e.map(e=>t.send("get_room",{area_id:e})));for(const e of a)if(e?.hidden_entities)for(const t of e.hidden_entities)i.add(t);this._dashboardHiddenEntities=i,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expanded=null,this._selectedEntity=null,this._foldOpen=!1,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear(),this._pendingTemps.clear()}_getClimateIds(){return this._cachedClimateIds||(this._cachedClimateIds=this._computeClimateIds()),this._cachedClimateIds}_computeClimateIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=nt(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("climate.")&&!e.has(t.entity_id)&&lt(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return t}if(this._isDashboardMode){if(this._dashboardEntities.length>0)return this._dashboardEntities.filter(e=>this.hass?.states[e]&&lt(e,this._schedules));const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of nt(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("climate.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getClimates(){if(!this.hass)return[];const e=this._getClimateIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._cachedClimatesFingerprint&&this._cachedClimatesResult)return this._cachedClimatesResult;this._cachedClimatesFingerprint=t;const i=e.map(e=>this.hass?.states[e]).filter(e=>null!=e);return this._cachedClimatesResult=i,this._cachedClimatesResult}_toggle(e,t,i){if(i.stopPropagation(),!this.hass)return;const a=t.attributes.supported_features||0;if("off"===t.state)if(a&ei)this._safeCallService("climate","turn_on",{},{entity_id:e});else{const i=(t.attributes.hvac_modes||[]).find(e=>"off"!==e);i&&this._safeCallService("climate","set_hvac_mode",{hvac_mode:i},{entity_id:e})}else a&ti?this._safeCallService("climate","turn_off",{},{entity_id:e}):this._safeCallService("climate","set_hvac_mode",{hvac_mode:"off"},{entity_id:e})}_setHvacMode(e,t){this.hass&&(st(this,"light"),this._safeCallService("climate","set_hvac_mode",{hvac_mode:t},{entity_id:e}))}_setPreset(e,t){this.hass&&(st(this,"light"),this._safeCallService("climate","set_preset_mode",{preset_mode:t},{entity_id:e}))}_setFanMode(e,t){this.hass&&this._safeCallService("climate","set_fan_mode",{fan_mode:t},{entity_id:e})}_setSwingMode(e,t){this.hass&&this._safeCallService("climate","set_swing_mode",{swing_mode:t},{entity_id:e})}_setTemperature(e,t){if(!this.hass)return;st(this,"light"),this._pendingTemps.set(`temp_${e}`,t),this.requestUpdate();const i=`temp_throttle_${e}`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("climate","set_temperature",{temperature:t},{entity_id:e}),this._pendingTemps.delete(`temp_${e}`)},400))}_setTemperatureRange(e,t,i){if(!this.hass)return;const a=`range_throttle_${e}`,r=this._throttleTimers.get(a);r&&clearTimeout(r),this._throttleTimers.set(a,setTimeout(()=>{this._throttleTimers.delete(a),this._safeCallService("climate","set_temperature",{target_temp_low:t,target_temp_high:i},{entity_id:e})},400))}_setHumidity(e,t){if(!this.hass)return;this._pendingTemps.set(`humidity_${e}`,t),this.requestUpdate();const i=`humidity_throttle_${e}`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("climate","set_humidity",{humidity:t},{entity_id:e}),this._pendingTemps.delete(`humidity_${e}`)},400))}_toggleAuxHeat(e,t){if(!this.hass)return;const i="on"===t.attributes.aux_heat;this._safeCallService("climate","set_aux_heat",{aux_heat:!i},{entity_id:e})}_onRangeDragStart(e,t,i){t.preventDefault(),this._rangeDragCleanup&&(this._rangeDragCleanup(),this._rangeDragCleanup=null);const a=this.hass?.states[i];if(!a)return;const r=a.attributes.min_temp||7,s=a.attributes.max_temp||35,o=a.attributes.target_temp_step||.5,n=a.attributes.target_temp_low??r,l=a.attributes.target_temp_high??s;this._rangeDragEntity=i,this._rangeState={dragging:e,lowTemp:n,highTemp:l};const c=t.target.closest(".range-track");if(!c)return;const d=t=>{const i=c.getBoundingClientRect(),a=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),n=r+a*(s-r),l=Math.round(n/o)*o;if("low"===e){const e=Math.max(r,Math.min(l,this._rangeState.highTemp-o));this._rangeState={...this._rangeState,lowTemp:e}}else{const e=Math.max(this._rangeState.lowTemp+o,Math.min(l,s));this._rangeState={...this._rangeState,highTemp:e}}this.requestUpdate()},h=()=>{this._setTemperatureRange(i,this._rangeState.lowTemp,this._rangeState.highTemp),this._rangeState={dragging:null,lowTemp:0,highTemp:0},this._rangeDragEntity=null,this.requestUpdate(),p()},p=()=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",h),this._rangeDragCleanup===p&&(this._rangeDragCleanup=null)};document.addEventListener("pointermove",d),document.addEventListener("pointerup",h),this._rangeDragCleanup=p}_updateThermalCanvas(){const e=this.shadowRoot?.querySelector("#thermal-canvas"),t=this.shadowRoot?.querySelector("#thermal-canvas-wrap");if(!e||!t)return;this._thermalCanvas||(this._thermalCanvas=new _i),this._thermalCanvas.attach(e);const i=this._selectedEntity||this._getClimateIds()[0],a=i?this.hass?.states[i]:void 0,r=a&&a.attributes.hvac_action||"off";this._thermalCanvas.update(r,t.offsetWidth,t.offsetHeight)}_tempUnit(){const e=this.hass,t=e?.config,i=t?.unit_system,a=i?.temperature;return"°F"===a||"F"===a?"°F":"°C"}_avgTemp(){const e=this._getClimates(),t=[];for(const i of e){const e=i.attributes.current_temperature;null!=e&&t.push(e)}return 0===t.length?null:(t.reduce((e,t)=>e+t,0)/t.length).toFixed(1)}_getHvacAction(e){return e.attributes.hvac_action||("off"===e.state?"off":"idle")}_getIcon(e,t){if(Ue(t.state))return"mdi:thermostat-off";const i=this.hass?.entities[e]?.icon,a=t.attributes.icon;return i||a||ii[t.state]||"mdi:thermostat"}render(){if(this._lang,!this._configReady)return J;const e=this._getClimates();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",J;this.style.display=""}return this._isDashboardMode||0!==e.length?"normal"===this._displayMode?this._renderNormalMode(e):this._renderListMode(e):X`
        ${this._showHeader?this._renderHeader(e):J}
        <div class="glass climate-card">
          <div class="card-inner">
            <div class="empty-state">${Qe("climate.no_climates")}</div>
          </div>
        </div>
      `}_renderHeader(e){const t=e.filter(e=>{const t=e.attributes.hvac_action||"";return"heating"===t||"cooling"===t||"preheating"===t}).length,i=e.length,a=0===t?"none":t===i?"all":"some",r=this._avgTemp(),s=this._tempUnit();return X`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${Qe("climate.title")}</span>
          <span class="card-count ${a}">${t}/${i}</span>
        </div>
        <span class="card-header-right">${null!=r?`${Qe("climate.avg_label")} ${r}${s}`:""}</span>
      </div>
    `}_renderListMode(e){let t="";if(this._expanded&&this.hass?.states[this._expanded]){const e=this._getHvacAction(this.hass.states[this._expanded]);"heating"===e||"preheating"===e?t="heat":"cooling"===e&&(t="cool")}else{const i=e.some(e=>{const t=this._getHvacAction(e);return"heating"===t||"preheating"===t}),a=e.some(e=>"cooling"===this._getHvacAction(e));i?t="heat":a&&(t="cool")}return X`
      ${this._showHeader?this._renderHeader(e):J}
      <div class="glass climate-card list-mode">
        <div class="tint ${t}"></div>
        <div class="card-inner">
          ${e.map(e=>X`
            ${this._renderListRow(e.entity_id,e)}
            ${this._renderListFold(e.entity_id,e)}
          `)}
        </div>
      </div>
    `}_renderListRow(e,t){const i=t.attributes,a=i.friendly_name||e.split(".")[1]||e,r=Ue(t.state),s="off"===t.state,o=this._getHvacAction(t),n=i.current_temperature,l=this._pendingTemps.get(`temp_${e}`)??i.temperature,c=this._expanded===e,d=t.state,h=i.preset_mode,p=this._getIcon(e,t),u=ri[o]||"climate.unknown",g=h&&"none"!==h?h:d,m=this._bindGesture({onTap:()=>{r||this._toggle(e,t,new Event("tap"))},onLongPress:()=>{r||(this._expanded=c?null:e)},exclude:".cl-icon-btn"});return X`
      <div class="cl-row ${r?"entity-unavailable":""}" data-action=${o}
        @pointerdown=${m.pointerdown}
        @pointermove=${m.pointermove}
        @pointerup=${m.pointerup}
        @pointercancel=${m.pointercancel}
        @contextmenu=${m.contextmenu}
      >
        <button
          class="cl-icon-btn"
          @click=${i=>this._toggle(e,t,i)}
          aria-label=${Qe(s?"climate.turn_on_aria":"climate.turn_off_aria")}
          ?disabled=${r}
        >
          <ha-icon .icon=${p} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <button class="cl-expand-area" type="button" aria-expanded=${c?"true":"false"} aria-label=${Qe("climate.controls_aria")}>
          <div class="cl-info">
            <div class="cl-name">${Ae(a,12)}</div>
            <div class="cl-sub">
              <span class="cl-action-text">${Qe(u)}</span>
              ${s?J:X`<span class="cl-mode-badge">${g}</span>`}
            </div>
          </div>
          <div class="cl-temps">
            <div class="cl-temp-current">${r?"--":null!=n?X`${n.toFixed(1)}<span class="unit">°</span>`:"--"}</div>
            ${s||null==l?J:X`<div class="cl-temp-target">→ ${l.toFixed(1)}°</div>`}
          </div>
          ${r?X`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:X`<div class="cl-dot"></div>`}
        </button>
      </div>
    `}_renderListFold(e,t){const i=this._expanded===e;if(Ue(t.state))return J;const a="cooling"===this._getHvacAction(t)?"cool":"";return X`
      <div class="fold-sep ${i?"visible":""} ${a}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel">
            ${this._renderListTempControl(e,t)}
            <div class="ctrl-sep"></div>
            ${this._renderFoldControls(e,t)}
          </div>
        </div>
      </div>
      <div class="fold-sep ${i?"visible":""} ${a}"></div>
    `}_renderListTempControl(e,t){if("off"===t.state||"fan_only"===t.state)return J;const i=t.attributes.supported_features||0;if("heat_cool"===t.state&&i&Kt){return function(e,t,i,a,r){if("heat_cool"!==e.state)return J;if(!((e.attributes.supported_features||0)&Kt))return J;const s=e.attributes.min_temp||7,o=e.attributes.max_temp||35,n=e.attributes.target_temp_step||.5,l="low"===i.dragging?i.lowTemp:e.attributes.target_temp_low??s,c="high"===i.dragging?i.highTemp:e.attributes.target_temp_high??o,d=o-s,h=d>0?(l-s)/d*100:0,p=d>0?(c-s)/d*100:100;return X`
    <div class="range-slider-row">
      <div class="range-labels">
        <span class="range-label heat">${l.toFixed(1)}${t}</span>
        <span class="range-label cool">${c.toFixed(1)}${t}</span>
      </div>
      <div class="range-track">
        <div
          class="range-fill"
          style="left:${h}%;right:${100-p}%;"
        ></div>
        <button
          class="range-thumb low"
          role="slider"
          aria-label=${Qe("climate.range_low_aria")}
          aria-valuemin=${s}
          aria-valuemax=${c-n}
          aria-valuenow=${l}
          style="left:${h}%;"
          @pointerdown=${e=>r("low",e)}
          @keydown=${e=>{"ArrowRight"===e.key||"ArrowUp"===e.key?(e.preventDefault(),a(Math.min(l+n,c-n),c)):"ArrowLeft"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),a(Math.max(l-n,s),c))}}
        ></button>
        <button
          class="range-thumb high"
          role="slider"
          aria-label=${Qe("climate.range_high_aria")}
          aria-valuemin=${l+n}
          aria-valuemax=${o}
          aria-valuenow=${c}
          style="left:${p}%;"
          @pointerdown=${e=>r("high",e)}
          @keydown=${e=>{"ArrowRight"===e.key||"ArrowUp"===e.key?(e.preventDefault(),a(l,Math.min(c+n,o))):"ArrowLeft"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),a(l,Math.max(c-n,l+n)))}}
        ></button>
      </div>
    </div>
  `}(t,this._tempUnit(),this._rangeDragEntity===e?this._rangeState:{dragging:null,lowTemp:0,highTemp:0},(t,i)=>this._setTemperatureRange(e,t,i),(t,i)=>this._onRangeDragStart(t,i,e))}if(!(i&Gt))return J;const a=this._pendingTemps.get(`temp_${e}`)??t.attributes.temperature,r=t.attributes.target_temp_step||.5,s=t.attributes.min_temp||7,o=t.attributes.max_temp||35,n=t.attributes.current_temperature,l=this._getHvacAction(t),c="heating"===l||"preheating"===l?"heat":"cooling"===l?"cool":"off",d=this._tempUnit();return null==a?J:X`
      <div class="temp-control">
        <button class="temp-stepper-btn"
          @click=${()=>this._setTemperature(e,Math.max(s,a-r))}
          aria-label=${Qe("climate.temp_down_aria")}
          ?disabled=${a<=s}>
          <ha-icon .icon=${"mdi:minus"} style="--mdc-icon-size:22px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <div class="temp-display">
          <div class="temp-display-label">${Qe("climate.target")}</div>
          <div class="temp-display-value ${c}">${a.toFixed(1)}<span class="unit">${d}</span></div>
          ${null!=n?X`
            <div class="temp-display-current">
              <ha-icon .icon=${"mdi:thermometer"} style="--mdc-icon-size:13px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              <span>${Qe("climate.current_label")} ${n.toFixed(1)}${d}</span>
            </div>
          `:J}
        </div>
        <button class="temp-stepper-btn"
          @click=${()=>this._setTemperature(e,Math.min(o,a+r))}
          aria-label=${Qe("climate.temp_up_aria")}
          ?disabled=${a>=o}>
          <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:22px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    `}_renderFoldControls(e,t){const i=this._getHvacAction(t),a="heating"===i||"preheating"===i?"heat":"cooling"===i?"cool":"neutral",r=function(e,t){const i=e.attributes.hvac_modes||[],a=e.state;return X`
    <div class="chip-row">
      ${i.map(e=>{const i=e===a,r=ai[e]||"var(--t4)",s=ii[e]||"mdi:thermostat",o=oi[e]?Qe(oi[e]):e;return X`
          <button
            class="chip ${i?"active":""}"
            style="${i?`--chip-color:${r};`:""}"
            @click=${()=>t(e)}
            aria-label=${o}
            aria-pressed=${i?"true":"false"}
          >
            <ha-icon .icon=${s} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${o}</span>
          </button>
        `})}
    </div>
  `}(t,t=>this._setHvacMode(e,t)),s=function(e,t){if("off"===e.state)return J;if(!((e.attributes.supported_features||0)&Yt))return J;const i=e.attributes.preset_modes||[],a=e.attributes.preset_mode;return X`
    <div class="chip-row">
      ${i.map(e=>{const i=e===a,r=si[e]||"mdi:tune",s=ni[e]?Qe(ni[e]):e;return X`
          <button
            class="chip ${i?"active":""}"
            @click=${()=>t(e)}
            aria-label=${s}
            aria-pressed=${i?"true":"false"}
          >
            <ha-icon .icon=${r} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${s}</span>
          </button>
        `})}
    </div>
  `}(t,t=>this._setPreset(e,t)),o=function(e,t){if("off"===e.state)return J;if(!((e.attributes.supported_features||0)&Qt))return J;const i=e.attributes.fan_modes||[],a=e.attributes.fan_mode;return X`
    <div class="chip-row">
      ${i.map(e=>X`
        <button
          class="chip ${e===a?"active":""}"
          @click=${()=>t(e)}
          aria-label="${Qe("climate.fan_mode")}: ${e}"
          aria-pressed=${e===a?"true":"false"}
        >
          <ha-icon .icon=${"mdi:fan"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          <span>${e}</span>
        </button>
      `)}
    </div>
  `}(t,t=>this._setFanMode(e,t)),n=function(e,t){if("off"===e.state)return J;if(!((e.attributes.supported_features||0)&Jt))return J;const i=e.attributes.swing_modes||[],a=e.attributes.swing_mode;return X`
    <div class="chip-row">
      ${i.map(e=>X`
        <button
          class="chip ${e===a?"active":""}"
          @click=${()=>t(e)}
          aria-label="${Qe("climate.swing_mode")}: ${e}"
          aria-pressed=${e===a?"true":"false"}
        >
          <ha-icon .icon=${"mdi:arrow-oscillating"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          <span>${e}</span>
        </button>
      `)}
    </div>
  `}(t,t=>this._setSwingMode(e,t));return X`
      <div class="ctrl-label ${a}">${Qe("climate.section_mode")}</div>
      ${r}
      ${s!==J?X`
        <div class="ctrl-sep"></div>
        <div class="ctrl-label ${a}">${Qe("climate.section_preset")}</div>
        ${s}
      `:J}
      ${o!==J?X`<div class="ctrl-sep"></div>${o}`:J}
      ${n!==J?X`<div class="ctrl-sep"></div>${n}`:J}
      ${function(e,t,i){if(!((e.attributes.supported_features||0)&Xt))return J;if("off"===e.state)return J;const a=i??e.attributes.humidity,r=e.attributes.min_humidity||30,s=e.attributes.max_humidity||99;return null==a?J:X`
    <div class="stepper-row">
      <span class="stepper-label">
        <ha-icon .icon=${"mdi:water-percent"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;margin-right:4px;"></ha-icon>
        ${Qe("climate.humidity_target")}
      </span>
      <div class="stepper">
        <button
          class="btn-icon xs"
          @click=${()=>t(Math.max(r,a-1))}
          aria-label=${Qe("climate.humidity_down_aria")}
          ?disabled=${a<=r}
        >
          <ha-icon .icon=${"mdi:minus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <span class="stepper-value">${a}%</span>
        <button
          class="btn-icon xs"
          @click=${()=>t(Math.min(s,a+1))}
          aria-label=${Qe("climate.humidity_up_aria")}
          ?disabled=${a>=s}
        >
          <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    </div>
  `}(t,t=>this._setHumidity(e,t),this._pendingTemps.get(`humidity_${e}`))}
      ${function(e,t){if(!((e.attributes.supported_features||0)&Zt))return J;const i="on"===e.attributes.aux_heat;return X`
    <div class="aux-row">
      <ha-icon .icon=${"mdi:radiator"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;margin-right:6px;"></ha-icon>
      <span class="aux-label">${Qe("climate.aux_heat")}</span>
      <button
        class="toggle ${i?"on":""}"
        role="switch"
        aria-checked=${i?"true":"false"}
        aria-label=${Qe("climate.aux_heat")}
        @click=${t}
      >
        <span class="toggle-knob"></span>
      </button>
    </div>
  `}(t,()=>this._toggleAuxHeat(e,t))}
    `}_renderNormalMode(e){const t=[...e].sort((e,t)=>{const i=this._getHvacAction(e),a=this._getHvacAction(t);return(vi[i]??3)-(vi[a]??3)}),i=this._selectedEntity||t[0]?.entity_id,a=t.find(e=>e.entity_id===i)||t[0];if(!a)return X``;const r=this._getHvacAction(a),s="heating"===r||"preheating"===r?"heat":"cooling"===r?"cool":"auto"===a.state||"heat_cool"===a.state?"auto-tint":"",o="heating"===r||"preheating"===r?"heat-sep":"cooling"===r?"cool-sep":"",n=this._bindGesture({onTap:()=>{this._toggle(a.entity_id,a,new Event("tap"))},onLongPress:()=>{this._foldOpen=!this._foldOpen;const e=this.renderRoot.querySelector(".climate-card");e&&(e.classList.add("lp-pulse"),e.addEventListener("animationend",()=>e.classList.remove("lp-pulse"),{once:!0}))},exclude:"button, .entity-tab, .temp-stepper-btn, .chip"});return X`
      ${this._showHeader?this._renderHeader(e):J}
      <div class="climate-wrap ${this._foldOpen?"fold-open":""}">
        <div class="glass climate-card normal-mode"
          @pointerdown=${n.pointerdown}
          @pointermove=${n.pointermove}
          @pointerup=${n.pointerup}
          @pointercancel=${n.pointercancel}
          @contextmenu=${n.contextmenu}>
          <div class="tint ${s}"></div>
          <div class="thermal-canvas" id="thermal-canvas-wrap">
            <canvas id="thermal-canvas"></canvas>
          </div>
          <div class="card-inner">
            ${this._renderEntityTabs(t)}
            ${mi(a)}
            ${this._renderNormalTempStepper(a)}
          </div>
        </div>
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner normal-fold-inner">
            <div class="ctrl-fold-sep-top ${o}"></div>
            <div class="ctrl-panel">
              ${this._renderFoldControls(a.entity_id,a)}
            </div>
          </div>
        </div>
      </div>
    `}_renderEntityTabs(e){if(e.length<=1)return J;const t=this._selectedEntity||e[0]?.entity_id;return X`
      <div class="entity-tabs">
        ${e.map(e=>{const i=e.attributes.friendly_name||e.entity_id,a=this._getHvacAction(e),r=e.entity_id===t,s="heating"===a||"preheating"===a?"heat":"cooling"===a?"cool":"",o=this.hass?.entities[e.entity_id],n=o?ot(o,this.hass?.devices):null,l=n?this.hass?.areas[n]:null,c=l?.icon||"mdi:home",d=l?.name||i.split(" ")[0];return X`
            <button class="entity-tab ${r?"active":""} ${s}"
              @click=${()=>{this._selectedEntity=e.entity_id}}
              aria-label=${i}
              aria-pressed=${r?"true":"false"}>
              <ha-icon .icon=${c} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${r?X`<span class="tab-label">${d}</span>`:J}
            </button>
          `})}
      </div>
    `}_renderNormalTempStepper(e){if("off"===e.state||"fan_only"===e.state)return J;const t=e.attributes.supported_features||0;if(!(t&Gt))return J;if("heat_cool"===e.state&&t&Kt)return J;const i=e.entity_id,a=this._pendingTemps.get(`temp_${i}`)??e.attributes.temperature,r=e.attributes.target_temp_step||.5,s=e.attributes.min_temp||7,o=e.attributes.max_temp||35,n=this._getHvacAction(e),l="heating"===n||"preheating"===n?"heat":"cooling"===n?"cool":"auto"===e.state||"heat_cool"===e.state?"auto-val":"off";return null==a?J:X`
      <div class="temp-control-panel">
        <button class="temp-stepper-btn normal-stepper"
          @click=${()=>this._setTemperature(i,Math.max(s,a-r))}
          aria-label=${Qe("climate.temp_down_aria")}
          ?disabled=${a<=s}>
          <ha-icon .icon=${"mdi:minus"} style="--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <div class="target-display">
          <div class="target-label">${Qe("climate.target")}</div>
          <div class="target-value ${l}">${a.toFixed(1)}<span class="unit">${this._tempUnit()}</span></div>
        </div>
        <button class="temp-stepper-btn normal-stepper"
          @click=${()=>this._setTemperature(i,Math.min(o,a+r))}
          aria-label=${Qe("climate.temp_up_aria")}
          ?disabled=${a>=o}>
          <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    `}static{this.styles=[Se,Ie,Te,Me,ze,Pe,Ve,h`
    :host {
      width: 100%;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
      color: var(--t1);

      /* Climate tokens */
      --cl-heat: #f97316;
      --cl-heat-bg: rgba(249,115,22,0.1);
      --cl-heat-border: rgba(249,115,22,0.15);
      --cl-heat-glow: rgba(249,115,22,0.4);
      --cl-heat-sub: rgba(249,115,22,0.6);

      --cl-cool: #38bdf8;
      --cl-cool-bg: rgba(56,189,248,0.1);
      --cl-cool-border: rgba(56,189,248,0.15);
      --cl-cool-glow: rgba(56,189,248,0.4);
      --cl-cool-sub: rgba(56,189,248,0.6);

      --cl-auto: #a78bfa;
      --cl-auto-bg: rgba(var(--rgb-purple),0.1);
      --cl-auto-border: rgba(var(--rgb-purple),0.15);
      --cl-auto-glow: rgba(var(--rgb-purple),0.4);

      --cl-dry: #eab308;
      --cl-fan: #06b6d4;
      --cl-off: var(--t4);
    }

    /* ── Card Header ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
    }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .card-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
      border-radius: var(--radius-full); font-size: var(--fz-xs); font-weight: 600;
      transition: background var(--t-med), color var(--t-med);
    }
    .card-count.some { background: rgba(249,115,22,0.15); color: var(--cl-heat); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(249,115,22,0.2); color: var(--cl-heat); }
    .card-header-right { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }

    /* ── Card Body ── */
    .climate-card { position: relative; overflow: hidden; }
    .climate-card.list-mode { padding: 0.125rem 0.875rem; }
    .climate-card.normal-mode {
      padding: 0.875rem;
      touch-action: pan-y; user-select: none; -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent; cursor: default;
      transition: border-color var(--t-fast), border-radius var(--t-layout);
    }
    .card-inner { position: relative; z-index: 1; }
    .normal-mode .card-inner { display: flex; flex-direction: column; gap: 0; }

    /* ── Tint ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow), background var(--t-slow);
      opacity: 0;
    }
    .tint.heat {
      opacity: 0.18;
      background: radial-gradient(ellipse at 30% 30%, var(--cl-heat), transparent 70%);
    }
    .tint.cool {
      opacity: 0.18;
      background: radial-gradient(ellipse at 30% 30%, var(--cl-cool), transparent 70%);
    }
    .tint.auto-tint {
      opacity: 0.12;
      background: radial-gradient(ellipse at 30% 30%, var(--cl-auto), transparent 70%);
    }
    /* Normal mode centers the tint */
    .normal-mode .tint.heat {
      background: radial-gradient(ellipse at 50% 40%, var(--cl-heat), transparent 70%);
      opacity: 0.15;
    }
    .normal-mode .tint.cool {
      background: radial-gradient(ellipse at 50% 40%, var(--cl-cool), transparent 70%);
      opacity: 0.15;
    }
    .normal-mode .tint.auto-tint {
      background: radial-gradient(ellipse at 50% 40%, var(--cl-auto), transparent 70%);
    }

    .empty-state {
      padding: 1rem; text-align: center;
      font-size: var(--fz-base); color: var(--t3);
    }

    /* ════════════════════════════════════════════
       LIST MODE STYLES
       ════════════════════════════════════════════ */

    /* ── Row ── */
    .cl-row {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.5rem 0.25rem; position: relative; flex-shrink: 0;
      transition: background var(--t-fast); border-radius: var(--radius-md);
    }
    .entity-unavailable .cl-icon-btn { border-color: var(--c-alert); }
    @media (hover: hover) and (pointer: fine) {
      .cl-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .cl-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Icon Button ── */
    .cl-icon-btn {
      width: 2.25rem; height: 2.25rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast); cursor: pointer; padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .cl-icon-btn ha-icon {
      color: var(--t3); transition: color var(--t-fast), filter var(--t-fast);
    }
    .cl-icon-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .cl-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
      .cl-icon-btn:hover ha-icon { color: var(--t2); }
    }
    @media (hover: hover) { .cl-icon-btn:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .cl-icon-btn:active { animation: bounce 0.3s ease; } }

    /* Icon states */
    .cl-row[data-action="heating"] .cl-icon-btn,
    .cl-row[data-action="preheating"] .cl-icon-btn {
      background: var(--cl-heat-bg); border-color: var(--cl-heat-border);
    }
    .cl-row[data-action="heating"] .cl-icon-btn ha-icon,
    .cl-row[data-action="preheating"] .cl-icon-btn ha-icon {
      color: var(--cl-heat); animation: pulse-heat 2s ease-in-out infinite; will-change: filter;
    }
    .cl-row[data-action="cooling"] .cl-icon-btn {
      background: var(--cl-cool-bg); border-color: var(--cl-cool-border);
    }
    .cl-row[data-action="cooling"] .cl-icon-btn ha-icon {
      color: var(--cl-cool); animation: pulse-cool 2s ease-in-out infinite; will-change: filter;
    }
    .cl-row[data-action="idle"] .cl-icon-btn { background: var(--s2); border-color: var(--b2); }
    .cl-row[data-action="idle"] .cl-icon-btn ha-icon { color: var(--t2); }

    @keyframes pulse-heat {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(249,115,22,0.6)); }
      50%      { filter: drop-shadow(0 0 2px rgba(249,115,22,0.2)); }
    }
    @keyframes pulse-cool {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(56,189,248,0.6)); }
      50%      { filter: drop-shadow(0 0 2px rgba(56,189,248,0.2)); }
    }

    /* ── Expand Button ── */
    .cl-expand-area {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 0.625rem;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left; color: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .cl-expand-area:focus-visible {
      outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    /* ── Info ── */
    .cl-info { flex: 1; min-width: 0; }
    .cl-name {
      font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden;
    }
    .cl-sub { display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.125rem; }
    .cl-action-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .cl-row[data-action="heating"] .cl-action-text,
    .cl-row[data-action="preheating"] .cl-action-text { color: var(--cl-heat-sub); }
    .cl-row[data-action="cooling"] .cl-action-text { color: var(--cl-cool-sub); }

    .cl-mode-badge {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      padding: 0.0625rem 0.3125rem; border-radius: var(--radius-full);
      background: var(--s2); color: var(--t4); flex-shrink: 0;
    }
    .cl-row[data-action="heating"] .cl-mode-badge,
    .cl-row[data-action="preheating"] .cl-mode-badge {
      background: var(--cl-heat-bg); color: var(--cl-heat-sub);
    }
    .cl-row[data-action="cooling"] .cl-mode-badge {
      background: var(--cl-cool-bg); color: var(--cl-cool-sub);
    }

    /* ── Temps ── */
    .cl-temps {
      display: flex; flex-direction: column; align-items: flex-end; gap: 0;
      flex-shrink: 0;
    }
    .cl-temp-current {
      font-size: var(--fz-xl); font-weight: 700; color: var(--t1);
      line-height: 1; font-variant-numeric: tabular-nums;
    }
    .cl-temp-current .unit { font-size: var(--fz-base); font-weight: 500; color: var(--t3); }
    .cl-temp-target {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t3);
      font-variant-numeric: tabular-nums; margin-top: 0.0625rem;
    }
    .cl-row[data-action="heating"] .cl-temp-target,
    .cl-row[data-action="preheating"] .cl-temp-target { color: var(--cl-heat-sub); }
    .cl-row[data-action="cooling"] .cl-temp-target { color: var(--cl-cool-sub); }

    /* ── Dot ── */
    .cl-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: background var(--t-med), box-shadow var(--t-med);
    }
    .cl-row[data-action="heating"] .cl-dot,
    .cl-row[data-action="preheating"] .cl-dot {
      background: var(--cl-heat); box-shadow: 0 0 8px var(--cl-heat-glow);
    }
    .cl-row[data-action="cooling"] .cl-dot {
      background: var(--cl-cool); box-shadow: 0 0 8px var(--cl-cool-glow);
    }

    /* Unavailable badge inline (replaces dot) */
    .cl-expand-area .unavailable-badge {
      position: static;
      flex-shrink: 0;
      --mdc-icon-size: 0.75rem;
      color: var(--c-warning);
    }

    /* ── Fold separator ── */
    .fold-sep {
      height: 0; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(249,115,22,0.25), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std), height 0.25s var(--ease-std);
    }
    .fold-sep.cool {
      background: linear-gradient(90deg, transparent, rgba(56,189,248,0.25), transparent);
    }
    .fold-sep.visible { height: 0.0625rem; opacity: 1; }

    /* ── Controls fold (list mode) ── */
    .ctrl-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden; opacity: 0;
      transition: opacity 0.25s var(--ease-std);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }
    .ctrl-panel {
      padding: 0.375rem 0 0.25rem;
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    .ctrl-sep { height: 0.0625rem; background: var(--b1); margin: 0.125rem 0; }
    .ctrl-label { font-size: var(--fz-sm); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
    .ctrl-label.heat { color: var(--cl-heat-sub); }
    .ctrl-label.cool { color: var(--cl-cool-sub); }
    .ctrl-label.neutral { color: var(--t3); }

    /* ── Large temperature stepper (list mode fold) ── */
    .temp-control {
      display: flex; align-items: center; justify-content: center; gap: 1rem;
      padding: 0.5rem 0;
    }
    .temp-stepper-btn {
      width: 2.75rem; height: 2.75rem; border-radius: var(--radius-lg);
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast), opacity var(--t-fast); outline: none; padding: 0;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .temp-stepper-btn ha-icon { color: var(--t2); transition: color var(--t-fast); }
    @media (hover: hover) and (pointer: fine) {
      .temp-stepper-btn:hover { background: var(--s3); border-color: var(--b3); }
      .temp-stepper-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) { .temp-stepper-btn:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .temp-stepper-btn:active { animation: bounce 0.3s ease; } }
    .temp-stepper-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    .temp-stepper-btn:disabled { opacity: 0.3; pointer-events: none; }

    .temp-display {
      display: flex; flex-direction: column; align-items: center; gap: 0.125rem;
      min-width: 6.25rem;
    }
    .temp-display-label {
      font-size: var(--fz-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;
      color: var(--t4);
    }
    .temp-display-value {
      font-size: 2.5rem; font-weight: 700; line-height: 1;
      font-variant-numeric: tabular-nums; transition: color var(--t-fast);
    }
    .temp-display-value.heat { color: var(--cl-heat); }
    .temp-display-value.cool { color: var(--cl-cool); }
    .temp-display-value.off { color: var(--t3); }
    .temp-display-value .unit { font-size: var(--fz-xl); font-weight: 500; }
    .temp-display-current {
      font-size: var(--fz-base); font-weight: 500; color: var(--t3);
      display: flex; align-items: center; gap: 0.25rem;
    }
    .temp-display-current ha-icon { display: flex; align-items: center; justify-content: center; }

    /* ════════════════════════════════════════════
       NORMAL MODE STYLES
       ════════════════════════════════════════════ */

    /* ── Thermal canvas ── */
    .thermal-canvas {
      position: absolute; inset: 0; border-radius: inherit;
      overflow: hidden; pointer-events: none; z-index: 0;
    }
    .thermal-canvas canvas { width: 100%; height: 100%; }

    /* ── Connected fold wrapper ── */
    .climate-wrap { display: flex; flex-direction: column; }
    .climate-wrap.fold-open .climate-card {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-color: transparent;
    }

    /* Touch hint at card bottom when fold closed */
    .normal-mode::after {
      content: ''; position: absolute; bottom: 0; left: 20%; right: 20%;
      height: 0.125rem; border-radius: 1px;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
      opacity: 0; transition: opacity var(--t-med); z-index: 2;
    }
    .climate-wrap:not(.fold-open) .normal-mode::after { opacity: 1; }

    /* Normal fold inner (external, connected) */
    .normal-fold-inner {
      background: linear-gradient(135deg, rgba(var(--rgb-white),0.03), rgba(var(--rgb-white),0.01));
      backdrop-filter: var(--blur-lg);
      -webkit-backdrop-filter: var(--blur-lg);
      border: 1px solid var(--b2);
      border-top: none;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      box-shadow: 0 8px 32px rgba(var(--rgb-black),0.3), 0 2px 8px rgba(var(--rgb-black),0.2), inset 0 -1px 0 rgba(var(--rgb-black),0.1);
    }
    .normal-fold-inner .ctrl-panel {
      padding: 0.75rem 0.875rem 0.875rem; gap: 0.625rem;
    }

    /* Long-press visual feedback */
    .climate-card.lp-pulse {
      animation: lp-scale 0.2s var(--ease-out);
    }
    @keyframes lp-scale {
      0% { transform: scale(1); }
      50% { transform: scale(0.985); }
      100% { transform: scale(1); }
    }

    .ctrl-fold-sep-top {
      height: 0.0625rem; margin: 0 0.75rem;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
      transition: background var(--t-med);
    }
    .ctrl-fold-sep-top.heat-sep {
      background: linear-gradient(90deg, transparent, rgba(249,115,22,0.25), transparent);
    }
    .ctrl-fold-sep-top.cool-sep {
      background: linear-gradient(90deg, transparent, rgba(56,189,248,0.25), transparent);
    }

    /* ── Entity tabs ── */
    .entity-tabs {
      display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
      border-radius: var(--radius-lg); background: var(--s1);
      border: 1px solid var(--b1); padding: 0.1875rem;
    }
    .entity-tabs::-webkit-scrollbar { display: none; }

    .entity-tab {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.3125rem;
      padding: 0.4375rem 0.625rem; border-radius: var(--radius-sm); min-width: 0;
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), transform var(--t-fast);
      border: none; background: transparent; outline: none;
      -webkit-tap-highlight-color: transparent; white-space: nowrap;
    }
    .entity-tab:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
    @media (hover: hover) { .entity-tab:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .entity-tab:active { animation: bounce 0.3s ease; } }
    @media (hover: hover) and (pointer: fine) {
      .entity-tab:not(.active):hover { background: var(--s2); color: var(--t2); }
    }

    .entity-tab .tab-dot {
      width: 0.3125rem; height: 0.3125rem; border-radius: 50%; flex-shrink: 0;
      transition: background var(--t-med), box-shadow var(--t-med);
    }
    .entity-tab .tab-dot.heating,
    .entity-tab .tab-dot.preheating {
      background: var(--cl-heat); box-shadow: 0 0 6px var(--cl-heat-glow);
    }
    .entity-tab .tab-dot.cooling {
      background: var(--cl-cool); box-shadow: 0 0 6px var(--cl-cool-glow);
    }
    .entity-tab .tab-dot.idle { background: var(--t3); }
    .entity-tab .tab-dot.off { background: var(--t4); }

    .entity-tab.heat { color: var(--cl-heat-sub); }
    .entity-tab.cool { color: var(--cl-cool-sub); }

    .entity-tab.active {
      background: var(--s4); color: var(--t1);
      box-shadow: 0 1px 4px rgba(var(--rgb-black),0.2);
    }
    .entity-tab.active.heat {
      background: var(--cl-heat-bg); color: var(--cl-heat);
      box-shadow: 0 1px 6px rgba(249,115,22,0.15);
    }
    .entity-tab.active.cool {
      background: var(--cl-cool-bg); color: var(--cl-cool);
      box-shadow: 0 1px 6px rgba(56,189,248,0.15);
    }
    .tab-label {
      font-size: var(--fz-xs, 12px);
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 5rem;
    }

    /* ── Arc gauge ── */
    .gauge-section {
      display: flex; flex-direction: column; align-items: center;
      padding: 0; gap: 0;
    }
    .arc-gauge { position: relative; width: 15rem; height: 10rem; }
    .arc-gauge svg { width: 100%; height: 100%; }

    .arc-bg { fill: none; stroke: var(--s2); stroke-width: 8; stroke-linecap: round; }
    .arc-progress {
      fill: none; stroke-width: 8; stroke-linecap: round;
      transition: stroke-dashoffset 0.6s var(--ease-out), stroke var(--t-med);
    }
    .arc-progress.heat { stroke: var(--cl-heat); filter: drop-shadow(0 0 8px var(--cl-heat-glow)); }
    .arc-progress.cool { stroke: var(--cl-cool); filter: drop-shadow(0 0 8px var(--cl-cool-glow)); }
    .arc-progress.auto-arc { stroke: var(--cl-auto); filter: drop-shadow(0 0 8px var(--cl-auto-glow)); }
    .arc-progress.off { stroke: var(--t4); filter: none; }

    .arc-target-dot {
      fill: rgba(var(--rgb-white),0.9);
      filter: drop-shadow(0 0 4px rgba(var(--rgb-white),0.5));
      transition: fill 0.6s var(--ease-out), filter 0.6s var(--ease-out);
    }
    .arc-tick { stroke: var(--t4); stroke-width: 1; opacity: 0.3; }
    .arc-tick-major { stroke: var(--t3); stroke-width: 1.5; opacity: 0.5; }
    .arc-tick-label {
      font-size: var(--fz-xxs); font-weight: 500; fill: var(--t4);
      text-anchor: middle; dominant-baseline: middle;
    }

    /* Center display */
    .gauge-center {
      position: absolute; bottom: 0.875rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 0.125rem;
      width: 10rem;
    }
    .gauge-current-temp {
      font-size: 3rem; font-weight: 300; line-height: 1;
      font-variant-numeric: tabular-nums; letter-spacing: -2px;
      color: var(--t1); transition: color var(--t-med);
    }
    .gauge-current-temp .unit {
      font-size: var(--fz-xl); font-weight: 400; color: var(--t3);
      vertical-align: super; margin-left: -0.125rem;
    }
    .gauge-current-temp.off { color: var(--t3); }

    .gauge-action-label {
      font-size: var(--fz-sm); font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.8px; color: var(--t3); transition: color var(--t-med);
      display: flex; align-items: center; gap: 0.25rem;
    }
    .gauge-action-label ha-icon { display: flex; align-items: center; justify-content: center; }
    .gauge-action-label.heat { color: var(--cl-heat-sub); }
    .gauge-action-label.cool { color: var(--cl-cool-sub); }
    .gauge-action-label.idle { color: var(--t3); }
    .gauge-action-label.off { color: var(--t4); }

    .gauge-sub-info {
      display: flex; align-items: center; gap: 0.375rem;
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
    }
    .gauge-sub-info ha-icon { opacity: 0.5; display: flex; align-items: center; justify-content: center; }

    /* ── Normal mode temp stepper (glass sub-panel) ── */
    .temp-control-panel {
      display: flex; align-items: center; justify-content: center; gap: 0.875rem;
      padding: 0.625rem 1rem;
      border-radius: var(--radius-lg);
      /* backdrop-filter removed — parent .glass already applies blur(40px) */
      background: rgba(var(--rgb-black),0.25);
      border: 1px solid rgba(var(--rgb-white),0.08);
      box-shadow: 0 4px 16px rgba(var(--rgb-black),0.15), inset 0 1px 0 rgba(var(--rgb-white),0.04);
    }
    .normal-stepper {
      width: 2.5rem; height: 2.5rem; border-radius: var(--radius-lg);
    }
    .target-display {
      display: flex; flex-direction: column; align-items: center; gap: 0;
      min-width: 6.25rem;
    }
    .target-label {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1px; color: var(--t4);
    }
    .target-value {
      font-size: var(--fz-display); font-weight: 600; line-height: 1.1;
      font-variant-numeric: tabular-nums; letter-spacing: -1px;
      transition: color var(--t-med);
    }
    .target-value .unit { font-size: var(--fz-lg); font-weight: 400; color: var(--t3); }
    .target-value.heat { color: var(--cl-heat); }
    .target-value.cool { color: var(--cl-cool); }
    .target-value.auto-val { color: var(--cl-auto); }
    .target-value.off { color: var(--t4); }

    /* ════════════════════════════════════════════
       SHARED CONTROL STYLES (used in both modes)
       ════════════════════════════════════════════ */

    /* ── Chip row (HVAC modes, presets, fan, swing) ── */
    .chip-row { display: flex; gap: 0.25rem; flex-wrap: wrap; }
    .chip {
      display: inline-flex; align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.75rem; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    .chip ha-icon {
      --mdc-icon-size: var(--icon-sm);
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) { .chip:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .chip:active { animation: bounce 0.3s ease; } }
    .chip.active {
      border-color: var(--chip-color, rgba(249,115,22,0.15));
      background: color-mix(in srgb, var(--chip-color, var(--cl-heat)) 10%, transparent);
      color: var(--chip-color, var(--cl-heat));
    }

    /* ── Stepper row (inline small stepper, used by climate-controls.ts) ── */
    .stepper-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.125rem 0;
    }
    .stepper-label {
      font-size: var(--fz-base); font-weight: 600; color: var(--t2);
      display: flex; align-items: center;
    }
    .stepper { display: flex; align-items: center; gap: 0.5rem; }
    .stepper-value {
      font-size: var(--fz-lg); font-weight: 700; color: var(--t1);
      min-width: 3.25rem; text-align: center;
    }

    /* ── btn-icon ── */
    .btn-icon {
      display: inline-flex; align-items: center; justify-content: center;
      border-radius: var(--radius-md); background: var(--s2);
      border: 1px solid var(--b2); cursor: pointer; padding: 0;
      outline: none; font-family: inherit;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast), opacity var(--t-fast); -webkit-tap-highlight-color: transparent;
    }
    .btn-icon.xs { width: 1.75rem; height: 1.75rem; }
    .btn-icon:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .btn-icon:hover { background: var(--s3); border-color: var(--b3); }
    }
    @media (hover: hover) { .btn-icon:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .btn-icon:active { animation: bounce 0.3s ease; } }
    .btn-icon:disabled { opacity: 0.3; pointer-events: none; }

    /* ── Range slider ── */
    .range-slider-row { display: flex; flex-direction: column; gap: 0.375rem; padding: 0.25rem 0; }
    .range-labels { display: flex; justify-content: space-between; }
    .range-label { font-size: var(--fz-base); font-weight: 700; }
    .range-label.heat { color: var(--cl-heat); }
    .range-label.cool { color: var(--cl-cool); }
    .range-track {
      position: relative; height: 1.75rem;
      background: var(--s1); border-radius: var(--radius-lg);
      border: 1px solid var(--b1);
      touch-action: none; user-select: none; -webkit-user-select: none;
    }
    .range-fill {
      position: absolute; top: 0; height: 100%;
      border-radius: inherit; pointer-events: none;
      background: linear-gradient(90deg, var(--cl-heat), var(--cl-cool));
      opacity: 0.2;
    }
    .range-thumb {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 1rem; height: 1rem; border-radius: 50%;
      border: 2px solid; cursor: grab; outline: none;
      transition: box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .range-thumb:active { cursor: grabbing; }
    .range-thumb:focus-visible { box-shadow: 0 0 0 3px rgba(var(--rgb-white),0.25); }
    .range-thumb.low {
      background: var(--cl-heat); border-color: var(--cl-heat);
      box-shadow: 0 0 8px rgba(249,115,22,0.4);
    }
    .range-thumb.high {
      background: var(--cl-cool); border-color: var(--cl-cool);
      box-shadow: 0 0 8px rgba(56,189,248,0.4);
    }

    /* ── Aux heat toggle ── */
    .aux-row { display: flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0; }
    .aux-label { font-size: var(--fz-base); font-weight: 600; color: var(--t2); flex: 1; }
    .toggle {
      position: relative; width: 2.5rem; height: 1.375rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b2); cursor: pointer;
      transition: background var(--t-fast), border-color var(--t-fast); padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .toggle .toggle-knob {
      content: ''; position: absolute; top: 0.1875rem; left: 0.1875rem;
      width: 0.875rem; height: 0.875rem; border-radius: 50%;
      background: var(--t3);
      transition: transform var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
    }
    .toggle.on { background: rgba(249,115,22,0.2); border-color: rgba(249,115,22,0.3); }
    .toggle.on .toggle-knob {
      transform: translateX(18px); background: var(--cl-heat);
      box-shadow: 0 0 8px rgba(249,115,22,0.4);
    }
    .toggle:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
  `]}}bi([we({attribute:!1})],yi.prototype,"areaId"),bi([we({attribute:!1})],yi.prototype,"visibleAreaIds"),bi([xe()],yi.prototype,"_showHeader"),bi([xe()],yi.prototype,"_displayMode"),bi([xe()],yi.prototype,"_configReady"),bi([xe()],yi.prototype,"_expanded"),bi([xe()],yi.prototype,"_selectedEntity"),bi([xe()],yi.prototype,"_foldOpen");try{customElements.define("glass-climate-card",yi)}catch{}tt("glass-fan-card-editor");var wi=Object.defineProperty,xi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&wi(t,i,s),s};const ki=1,$i=2,Ci=4,Si=8,Ii={auto:"mdi:autorenew",eco:"mdi:leaf",night:"mdi:weather-night",nuit:"mdi:weather-night",comfort:"mdi:sofa",confort:"mdi:sofa",silent:"mdi:volume-off",silence:"mdi:volume-off",turbo:"mdi:lightning-bolt"};function Ti(e,t){return e<=0?0:Math.max(1,Math.min(t,Math.round(e/(100/t))))}function zi(e,t){return e<=0?0:e/t*100}function Ei(e,t){return zi(Ti(e,t),t)}const Ai={auto:"fan.preset_auto",eco:"fan.preset_eco",night:"fan.preset_night",nuit:"fan.preset_night",comfort:"fan.preset_comfort",confort:"fan.preset_comfort",silent:"fan.preset_silent",silence:"fan.preset_silent",turbo:"fan.preset_turbo"};function Pi(e){const t=Ai[e.toLowerCase()];return t?Qe(t):e.charAt(0).toUpperCase()+e.slice(1)}class Li extends rt{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._showHeader=!0,this._fanConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._fansFingerprint="",this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._schedules=null,this._schedulesLoaded=!1}static getConfigElement(){return document.createElement("glass-fan-card-editor")}getCardSize(){return 3}get _isDashboardMode(){return!this.areaId}static{this.styles=[Se,Ie,Te,Me,ze,Pe,Ve,h`
    :host {
      width: 100%;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    /* ── Card Header ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
    }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .card-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
      border-radius: var(--radius-full); font-size: var(--fz-xs); font-weight: 600;
      transition: background var(--t-med), color var(--t-med);
    }
    .card-count.some { background: rgba(var(--rgb-accent),0.15); color: var(--c-accent); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(var(--rgb-accent),0.2); color: var(--c-accent); }

    /* ── Toggle All ── */
    .toggle-all {
      position: relative; width: 2.5rem; height: 1.375rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b2); cursor: pointer;
      transition: background var(--t-fast), border-color var(--t-fast); padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .toggle-all::after {
      content: ''; position: absolute; top: 0.1875rem; left: 0.1875rem;
      width: 0.875rem; height: 0.875rem; border-radius: 50%;
      background: var(--t3);
      transition: transform var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
    }
    .toggle-all.on { background: rgba(var(--rgb-accent),0.2); border-color: rgba(var(--rgb-accent),0.3); }
    .toggle-all.on::after {
      transform: translateX(18px); background: var(--c-accent);
      box-shadow: 0 0 8px rgba(var(--rgb-accent),0.4);
    }
    .toggle-all:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    /* ── Card Body ── */
    .fan-card { position: relative; padding: 0.125rem 0.875rem; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    }
    :host([size="xs"]) .card-inner,
    :host([size="sm"]) .card-inner {
      grid-template-columns: 1fr;
    }

    .tint {
      transition: opacity var(--t-slow), background var(--t-slow);
    }

    /* ── Fan Row ── */
    .fan-row {
      display: flex; align-items: center; gap: 0.625rem;
      grid-column: 1 / -1;
      padding: 0.5rem 0.25rem; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
    }
    .fan-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .fan-row.compact-right { padding-left: 0.625rem; }
    .fan-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 0.0625rem;
      background: linear-gradient(to bottom, transparent, rgba(var(--rgb-white),0.08) 30%, rgba(var(--rgb-white),0.08) 70%, transparent);
    }
    @media (hover: hover) and (pointer: fine) {
      .fan-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .fan-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Icon Button ── */
    .fan-icon-btn {
      width: 2.25rem; height: 2.25rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast); cursor: pointer; padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .fan-icon-btn ha-icon {
      --mdc-icon-size: var(--icon-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: color var(--t-fast), filter var(--t-fast);
    }
    .fan-icon-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .fan-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
      .fan-icon-btn:hover ha-icon { color: var(--t2); }
    }
    @media (hover: hover) and (pointer: fine) {
      .fan-icon-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .fan-icon-btn:active { animation: bounce 0.3s ease; }
    }
    .fan-row.on .fan-icon-btn {
      background: rgba(var(--rgb-accent),0.1); border-color: rgba(var(--rgb-accent),0.15);
    }
    .fan-row.on .fan-icon-btn ha-icon {
      color: var(--c-accent); filter: drop-shadow(0 0 6px rgba(var(--rgb-accent),0.4));
    }
    .entity-unavailable .fan-icon-btn { border-color: var(--c-alert); }

    /* ── Spinning animation ── */
    @keyframes spin-fan {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-fan-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    .fan-row.on .fan-icon-btn ha-icon.spinning {
      animation: spin-fan var(--spin-duration, 2s) linear infinite;
      will-change: transform;
    }
    .fan-row.on .fan-icon-btn ha-icon.spinning.reverse {
      animation: spin-fan-reverse var(--spin-duration, 2s) linear infinite;
      will-change: transform;
    }

    /* ── Expand Button ── */
    .fan-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 0.625rem;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left; color: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .fan-expand-btn:focus-visible {
      outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    /* ── Fan Info ── */
    .fan-info { flex: 1; min-width: 0; }
    .fan-name {
      font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden;
    }
    .fan-sub { display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.125rem; }
    .fan-speed-text {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .fan-row.on .fan-speed-text { color: rgba(var(--rgb-accent),0.55); }

    .fan-direction {
      font-size: var(--fz-sm); font-weight: 400; color: var(--t4);
      display: flex; align-items: center; gap: 0.1875rem;
    }
    .fan-direction ha-icon {
      --mdc-icon-size: 0.6875rem;
      display: flex; align-items: center; justify-content: center;
    }

    .fan-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: background var(--t-med), box-shadow var(--t-med);
    }
    .fan-row.on .fan-dot {
      background: var(--c-accent); box-shadow: 0 0 8px rgba(var(--rgb-accent),0.4);
    }

    /* Unavailable badge inline (replaces dot) */
    .fan-expand-btn .unavailable-badge {
      position: static;
      flex-shrink: 0;
      --mdc-icon-size: 0.75rem;
      color: var(--c-warning);
    }

    /* ── Fold separator ── */
    .fold-sep {
      grid-column: 1 / -1;
      height: 0.0625rem; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent),0.2), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .fold-sep.visible { opacity: 1; }

    /* ── Controls fold ── */
    .ctrl-fold {
      grid-column: 1 / -1;
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden;
      opacity: 0; transition: opacity var(--t-fast);
    }
    .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

    .ctrl-panel {
      padding: 0.375rem 0 0.25rem;
      display: flex; flex-direction: column; gap: 0.625rem;
    }
    .ctrl-label {
      font-size: var(--fz-sm); font-weight: 600; letter-spacing: 0.5px;
      color: rgba(var(--rgb-accent),0.6); text-transform: uppercase;
    }

    /* ── Speed steps ── */
    .speed-steps { display: flex; gap: 0.25rem; }
    .speed-step {
      flex: 1; height: 2.25rem; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      font-family: inherit; font-size: var(--fz-base); font-weight: 700; color: var(--t3);
      cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast), transform var(--t-fast); outline: none; padding: 0.125rem 0;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .speed-step:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
    }
    .speed-step:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .speed-step:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .speed-step:active { animation: bounce 0.3s ease; }
    }
    .speed-step.active {
      background: rgba(var(--rgb-accent),0.1); border-color: rgba(var(--rgb-accent),0.15);
      color: var(--c-accent);
    }
    .speed-step-pct {
      font-size: var(--fz-xxs); font-weight: 600; color: var(--t4);
      letter-spacing: 0.3px; margin-top: 0.0625rem;
    }
    .speed-step.active .speed-step-pct { color: rgba(var(--rgb-accent),0.55); }

    /* ── Slider ── */
    .slider-wrap { display: flex; align-items: center; gap: 0.5rem; }
    .slider-icon {
      display: flex; align-items: center; justify-content: center;
      width: 1.75rem; height: 1.75rem; flex-shrink: 0;
    }
    .slider-icon ha-icon {
      --mdc-icon-size: var(--icon-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    glass-slider { flex: 1; }

    /* ── Mode chips ── */
    .mode-row { display: flex; gap: 0.375rem; flex-wrap: wrap; }
    .chip {
      display: inline-flex; align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.75rem; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    .chip ha-icon {
      --mdc-icon-size: var(--icon-sm);
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .chip:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .chip:active { animation: bounce 0.3s ease; }
    }
    .chip.active {
      border-color: rgba(var(--rgb-accent),0.15); background: rgba(var(--rgb-accent),0.1);
      color: rgba(var(--rgb-accent),0.8);
    }

    /* ── Direction toggle ── */
    .direction-row { display: flex; align-items: center; gap: 0.625rem; }
    .direction-label {
      font-size: var(--fz-base); font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 0.375rem;
    }
    .direction-label ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }
    .direction-btns {
      display: flex; gap: 0; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1); overflow: hidden;
    }
    .dir-btn {
      width: 2.25rem; height: 1.75rem; display: flex;
      align-items: center; justify-content: center;
      background: transparent; border: none; color: var(--t3);
      cursor: pointer; transition: background var(--t-fast), color var(--t-fast), transform var(--t-fast); outline: none; padding: 0;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .dir-btn ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .dir-btn:hover { background: var(--s3); color: var(--t2); }
    }
    .dir-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .dir-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .dir-btn:active { animation: bounce 0.3s ease; }
    }
    .dir-btn.active { background: rgba(var(--rgb-accent),0.1); color: var(--c-accent); }
    .dir-btn + .dir-btn { border-left: 1px solid var(--b1); }

    /* ── Oscillation toggle ── */
    .osc-row { display: flex; align-items: center; gap: 0.625rem; }
    .osc-label {
      font-size: var(--fz-base); font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 0.375rem;
    }
    .osc-label ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }
    .toggle-sm {
      position: relative; width: 2.375rem; height: 1.25rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b2);
      cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast);
      padding: 0; outline: none; font-family: inherit; flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .toggle-sm::after {
      content: ''; position: absolute; top: 0.125rem; left: 0.125rem;
      width: 0.875rem; height: 0.875rem; border-radius: 50%;
      background: var(--t3); transition: transform var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
    }
    .toggle-sm.on { background: rgba(var(--rgb-accent),0.2); border-color: rgba(var(--rgb-accent),0.3); }
    .toggle-sm.on::after {
      transform: translateX(18px); background: var(--c-accent);
      box-shadow: 0 0 8px rgba(var(--rgb-accent),0.4);
    }
    .toggle-sm:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    /* ── Ceiling light row ── */
    .ceiling-light-row {
      display: flex; align-items: center; gap: 0.625rem; padding: 0.375rem 0;
    }
    .ceiling-light-label {
      font-size: var(--fz-base); font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 0.375rem;
    }
    .ceiling-light-label ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }

    /* ── Separator ── */
    .ctrl-sep { height: 0.0625rem; background: var(--b1); margin: 0.125rem 0; }

    /* ── Empty state ── */
    .empty-state {
      grid-column: 1 / -1;
      padding: 1rem; text-align: center; font-size: var(--fz-base); color: var(--t4);
    }
  `]}connectedCallback(){super.connectedCallback(),this._listen("fan-config-changed",()=>{this._fanConfigLoaded=!1,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadFanConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._fanConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._fanConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._fanConfigLoaded&&this._loadFanConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedFanIds=void 0,this._fansFingerprint="")}if(e.has("visibleAreaIds")&&(this._cachedFanIds=void 0,this._fansFingerprint="",this._dashboardHiddenLoaded=!1),e.has("hass")&&this._dragValues.size>0){const e=this._getFanInfos();let t=!1;const i=new Map(this._dragValues);for(const a of e){const e=`speed:${a.entityId}`,r=i.get(e);void 0!==r&&Math.abs(a.percentage-r)<=2&&(i.delete(e),t=!0);const s=`light:${a.entityId}`,o=i.get(s);if(void 0!==o&&a.lightEntityId){const e=this.hass?.states[a.lightEntityId];if(e){const a=e.attributes.brightness??0,r=Math.round(a/255*100);Math.abs(r-o)<=2&&(i.delete(s),t=!0)}}}t&&(this._dragValues=i)}}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?ct("fan",this.hass,this.visibleAreaIds):this._getFanInfos().map(e=>e.entityId)}async _loadFanConfig(){if(this.hass&&!this._fanConfigLoaded){this._fanConfigLoaded=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_config");e?.fan_card&&(this._showHeader=e.fan_card.show_header??!0)}catch{}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new dt(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new dt(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedFanIds=void 0,this._fansFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_getFanIds(){return this._cachedFanIds||(this._cachedFanIds=this._computeFanIds()),this._cachedFanIds}_computeFanIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=nt(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("fan.")&&!e.has(t.entity_id)&&lt(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return t}if(this._isDashboardMode){const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of nt(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("fan.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getFanInfos(){if(!this.hass)return[];const e=this._getFanIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._fansFingerprint&&this._cachedFansResult)return this._cachedFansResult;this._fansFingerprint=t;const i=e.map(e=>{const t=this.hass?.states[e];return t?this._buildFanInfo(e,t):null}).filter(e=>null!==e);return this._isDashboardMode?this._cachedFansResult=i.filter(e=>e.isOn):this._cachedFansResult=i,this._cachedFansResult}_buildFanInfo(e,t){const i=t.attributes,a="on"===t.state,r=i.percentage??0,s=i.percentage_step,o=i.speed_count??(s&&s>0?Math.round(100/s):3),n=i.direction||null,l=i.oscillating||!1,c=i.preset_mode||null,d=i.preset_modes||[],h=i.supported_features||0,p=function(e,t){if("ceiling"===t.attributes.device_class)return!0;const i=e.toLowerCase();return i.includes("ceiling")||i.includes("plafond")||i.includes("plafonnier")}(e,t),u=this.hass?.entities[e]?.icon,g=i.icon,m=u||g||(p?"mdi:ceiling-fan":"mdi:fan"),_=p&&this.hass?function(e,t){const i=e.replace("fan.",""),a=[`light.${i}`,`light.${i}_light`];for(const r of a)if(t.states[r])return r;if(t.entities){const i=t.entities[e];if(i?.device_id)for(const[e,a]of Object.entries(t.entities))if(e.startsWith("light.")&&a.device_id===i.device_id&&t.states[e])return e}return null}(e,this.hass):null,f=!(!!(h&Si)&&d.length>0||!!(h&Ci)||!!(h&$i)||_);return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,icon:m,isCeiling:p,isOn:a,percentage:a?r:0,speedCount:o,direction:n,oscillating:l,presetMode:a?c:null,presetModes:d,supportedFeatures:h,lightEntityId:_,isSimple:f}}_toggleFan(e,t){if(t?.stopPropagation(),this.hass)if(st(this,"light"),e.isOn)this._safeCallService("fan","turn_off",{},{entity_id:e.entityId});else{if(e.supportedFeatures&ki){const t=zi(1,e.speedCount);this._safeCallService("fan","turn_on",{percentage:t},{entity_id:e.entityId})}else this._safeCallService("fan","turn_on",{},{entity_id:e.entityId})}}_toggleAll(){if(!this.hass)return;const e=this._getFanInfos(),t=e.some(e=>e.isOn);if(t){const t=e.map(e=>e.entityId);this._safeCallService("fan","turn_off",{},{entity_id:t})}else for(const i of e){if(i.supportedFeatures&ki){const e=zi(1,i.speedCount);this._safeCallService("fan","turn_on",{percentage:e},{entity_id:i.entityId})}else this._safeCallService("fan","turn_on",{},{entity_id:i.entityId})}t&&(this._expandedEntity=null)}_setSpeed(e,t){this.hass&&(st(this,"light"),0!==t?(e.isOn||this._safeCallService("fan","turn_on",{},{entity_id:e.entityId}),this._safeCallService("fan","set_percentage",{percentage:t},{entity_id:e.entityId})):this._safeCallService("fan","turn_off",{},{entity_id:e.entityId}))}_setPresetMode(e,t,i){i.stopPropagation(),this.hass&&(e.presetMode!==t?(e.isOn||this._safeCallService("fan","turn_on",{},{entity_id:e.entityId}),this._safeCallService("fan","set_preset_mode",{preset_mode:t},{entity_id:e.entityId})):e.percentage>0&&this._safeCallService("fan","set_percentage",{percentage:e.percentage},{entity_id:e.entityId}))}_setDirection(e,t,i){i.stopPropagation(),this.hass&&(st(this,"light"),this._safeCallService("fan","set_direction",{direction:t},{entity_id:e.entityId}))}_toggleOscillation(e,t){t.stopPropagation(),this.hass&&this._safeCallService("fan","oscillate",{oscillating:!e.oscillating},{entity_id:e.entityId})}_toggleCeilingLight(e,t){if(t.stopPropagation(),!this.hass||!e.lightEntityId)return;const i=this.hass.states[e.lightEntityId],a="on"===i?.state?"turn_off":"turn_on";this._safeCallService("light",a,{},{entity_id:e.lightEntityId})}_hasControls(e){const t=e.supportedFeatures;return!!(t&ki||t&Si||t&Ci||t&$i||e.lightEntityId)}_toggleExpand(e){this._expandedEntity===e.entityId?this._expandedEntity=null:this._expandedEntity=e.entityId}_onSpeedSliderInput(e,t){const i=Ei(t,e.speedCount),a=new Map(this._dragValues);a.set(`speed:${e.entityId}`,i),this._dragValues=a}_onSpeedSliderChange(e,t){const i=Ei(t,e.speedCount);this._setSpeed(e,i);const a=new Map(this._dragValues);a.delete(`speed:${e.entityId}`),this._dragValues=a}_onLightSliderInput(e,t){if(!e.lightEntityId||!this.hass)return;const i=new Map(this._dragValues);i.set(`light:${e.entityId}`,t),this._dragValues=i;const a=`light:${e.entityId}`,r=this._throttleTimers.get(a);r&&clearTimeout(r);const s=e.lightEntityId;this._throttleTimers.set(a,setTimeout(()=>{this._throttleTimers.delete(a);const e=this._dragValues.get(a)??t,i=Math.round(e/100*255);this._safeCallService("light","turn_on",{brightness:i},{entity_id:s})},100))}_onLightSliderChange(e,t){if(!e.lightEntityId||!this.hass)return;const i=Math.round(t/100*255);this._safeCallService("light","turn_on",{brightness:i},{entity_id:e.lightEntityId});const a=new Map(this._dragValues);a.delete(`light:${e.entityId}`),this._dragValues=a}render(){this._lang;const e=this._getFanInfos();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",J;this.style.display=""}if(!this._isDashboardMode&&0===e.length)return X`
        ${this._showHeader?this._renderHeader(0,0):J}
        <div class="glass fan-card">
          <div class="card-inner">
            <div class="empty-state">${Qe("fan.no_fans")}</div>
          </div>
        </div>
      `;const t=e.filter(e=>e.isOn).length,i=e.length;return X`
      ${this._showHeader?this._renderHeader(t,i):J}
      <div class="glass fan-card">
        <div class="tint" style="background:radial-gradient(ellipse at 30% 30%, var(--c-accent), transparent 70%);opacity:${i>0?(t/i*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${this._isDashboardMode?this._renderDashboardGrid(e):this._renderGrid(e)}
        </div>
      </div>
    `}_renderHeader(e,t){const i=e>0,a=0===e?"none":e===t?"all":"some";return X`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${Qe("fan.title")}</span>
          <span class="card-count ${a}">${e}/${t}</span>
        </div>
        <button
          class="toggle-all ${i?"on":""}"
          @click=${()=>this._toggleAll()}
          aria-label=${Qe(i?"fan.toggle_all_on_aria":"fan.toggle_all_off_aria")}
          role="switch"
          aria-checked=${i?"true":"false"}
        ></button>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(r,!0,!0)),t.push(this._renderControlFold(a,s)),t.push(this._renderControlFold(r,s)),i+=2}else{const r=i+1>=e.length;t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,r)),i++}}else{const r=i+1>=e.length;t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,r)),i++}}return t}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],r=i+1<e.length?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(r,!0,!0)),t.push(this._renderControlFold(a,s)),t.push(this._renderControlFold(r,s)),i+=2}else t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,!0)),i++}return t}_renderFanRow(e,t=!1,i=!1){const a=this._dragValues.get(`speed:${e.entityId}`),r=a??e.percentage,s=this._expandedEntity===e.entityId,o=this._hasControls(e);let n;n=o?e.isOn||void 0!==a?`${r}%`:Qe("fan.off"):e.isOn?Qe("common.on"):Qe("fan.off");const l=Ue(e.entity.state),c=["fan-row",e.isOn?"on":"",t?"compact":"",i?"compact-right":"",l?"entity-unavailable":""].filter(Boolean).join(" "),d=this._bindGesture({onTap:()=>this._toggleFan(e),onLongPress:()=>this._toggleExpand(e),exclude:".fan-icon-btn"});return X`
      <div
        class=${c}
        @pointerdown=${d.pointerdown}
        @pointerup=${d.pointerup}
        @pointermove=${d.pointermove}
        @pointercancel=${d.pointercancel}
        @contextmenu=${d.contextmenu}
      >
        <button
          class="fan-icon-btn"
          @click=${t=>this._toggleFan(e,t)}
          aria-label=${Qe("fan.toggle_aria",{name:e.name})}
        >
          <ha-icon
            .icon=${e.icon}
            class="${e.isOn?"spinning":""} ${e.isOn&&"reverse"===e.direction?"reverse":""}"
            style="${e.isOn?"--spin-duration:"+(h=e.percentage,h<=0?"3s":h<=20?"4s":h<=40?"2.5s":h<=60?"1.6s":h<=80?"1.1s":"0.7s"):""}"
          ></ha-icon>
        </button>
        <button
          class="fan-expand-btn"
          aria-expanded=${o&&s?"true":"false"}
          aria-label=${Qe(o?"fan.expand_aria":"fan.toggle_aria",{name:e.name})}
        >
          <div class="fan-info">
            <div class="fan-name">${Ae(e.name,t?12:Ee)}</div>
            <div class="fan-sub">
              <span class="fan-speed-text">${n}</span>
              ${e.isOn&&null!==e.direction?X`
                <span class="fan-direction">
                  <ha-icon .icon=${"forward"===e.direction?"mdi:rotate-right":"mdi:rotate-left"}></ha-icon>
                  ${"forward"===e.direction?Qe("fan.direction_forward"):Qe("fan.direction_reverse")}
                </span>
              `:J}
            </div>
          </div>
          ${l?X`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:X`<div class="fan-dot"></div>`}
        </button>
      </div>
    `;var h}_renderControlFold(e,t=!1){const i=this._expandedEntity===e.entityId;return X`
      <div class="fold-sep ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):J}
        </div>
      </div>
      ${t?J:X`<div class="fold-sep ${i?"visible":""}"></div>`}
    `}_renderControls(e){const t=e.supportedFeatures,i=!!(t&ki),a=!!(t&Si)&&e.presetModes.length>0,r=!!(t&Ci),s=!!(t&$i),o=this._dragValues.get(`speed:${e.entityId}`),n=o??e.percentage,l=e.isOn||void 0!==o?Ti(n,e.speedCount):0;return X`
      <div class="ctrl-panel">
        ${e.isSimple?J:X`<span class="ctrl-label">${e.name}</span>`}

        ${i?X`
          <!-- Speed steps -->
          <div class="speed-steps">
            ${Array.from({length:e.speedCount},(t,i)=>{const a=i+1,r=zi(a,e.speedCount),s=function(e,t){return Math.round(zi(e,t))}(a,e.speedCount);return X`
                <button
                  class="speed-step ${l===a?"active":""}"
                  @click=${t=>{t.stopPropagation(),this._setSpeed(e,r)}}
                  aria-label=${Qe("fan.speed_step_aria",{step:String(a),pct:String(s)})}
                >
                  <span>${a}</span>
                  <span class="speed-step-pct">${s}%</span>
                </button>
              `})}
          </div>

          ${e.isSimple?J:X`
            <!-- Speed slider (complex fans only) -->
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${"mdi:speedometer"}></ha-icon></div>
              <glass-slider
                .value=${n}
                .step=${Math.round(100/e.speedCount)}
                color="var(--rgb-accent)"
                .label=${`${n}%`}
                @glass-slider-input=${t=>this._onSpeedSliderInput(e,t.detail.value)}
                @glass-slider-change=${t=>this._onSpeedSliderChange(e,t.detail.value)}
              ></glass-slider>
            </div>
          `}
        `:J}

        ${a?X`
          <!-- Preset modes -->
          <div class="mode-row">
            ${e.presetModes.map(t=>X`
              <button
                class="chip ${e.presetMode===t?"active":""}"
                @click=${i=>this._setPresetMode(e,t,i)}
                aria-label=${Pi(t)}
              >
                <ha-icon .icon=${Ii[t.toLowerCase()]||"mdi:cog"}></ha-icon>
                <span>${Pi(t)}</span>
              </button>
            `)}
          </div>
        `:J}

        ${r?X`
          <div class="ctrl-sep"></div>
          <!-- Direction -->
          <div class="direction-row">
            <div class="direction-label">
              <ha-icon .icon=${"mdi:rotate-3d-variant"}></ha-icon>
              ${Qe("fan.direction")}
            </div>
            <div class="direction-btns">
              <button
                class="dir-btn ${"forward"===e.direction?"active":""}"
                @click=${t=>this._setDirection(e,"forward",t)}
                aria-label=${Qe("fan.direction_forward_aria")}
              >
                <ha-icon .icon=${"mdi:rotate-right"}></ha-icon>
              </button>
              <button
                class="dir-btn ${"reverse"===e.direction?"active":""}"
                @click=${t=>this._setDirection(e,"reverse",t)}
                aria-label=${Qe("fan.direction_reverse_aria")}
              >
                <ha-icon .icon=${"mdi:rotate-left"}></ha-icon>
              </button>
            </div>
          </div>
        `:J}

        ${s?X`
          <!-- Oscillation -->
          <div class="osc-row">
            <div class="osc-label">
              <ha-icon .icon=${"mdi:arrow-left-right"}></ha-icon>
              ${Qe("fan.oscillation")}
            </div>
            <button
              class="toggle-sm ${e.oscillating?"on":""}"
              @click=${t=>this._toggleOscillation(e,t)}
              role="switch"
              aria-checked=${e.oscillating?"true":"false"}
              aria-label=${Qe("fan.oscillation_aria")}
            ></button>
          </div>
        `:J}

        ${e.lightEntityId?this._renderCeilingLight(e):J}
      </div>
    `}_renderCeilingLight(e){if(!e.lightEntityId||!this.hass)return J;const t=this.hass.states[e.lightEntityId];if(!t)return J;const i="on"===t.state,a=t.attributes.brightness??0,r=this._dragValues.get(`light:${e.entityId}`)??(i?Math.round(a/255*100):0);return X`
      <div class="ctrl-sep"></div>
      <!-- Ceiling light -->
      <div class="ceiling-light-row">
        <div class="ceiling-light-label">
          <ha-icon .icon=${"mdi:lightbulb-outline"}></ha-icon>
          ${Qe("fan.ceiling_light")}
        </div>
        <button
          class="toggle-sm ${i?"on":""}"
          @click=${t=>this._toggleCeilingLight(e,t)}
          role="switch"
          aria-checked=${i?"true":"false"}
          aria-label=${Qe("fan.ceiling_light_aria")}
        ></button>
      </div>
      ${i?X`
        <div class="slider-wrap">
          <div class="slider-icon"><ha-icon .icon=${"mdi:brightness-6"}></ha-icon></div>
          <glass-slider
            .value=${r}
            color="var(--rgb-light-glow)"
            .label=${`${r}%`}
            @glass-slider-input=${t=>this._onLightSliderInput(e,t.detail.value)}
            @glass-slider-change=${t=>this._onLightSliderChange(e,t.detail.value)}
          ></glass-slider>
        </div>
      `:J}
    `}}xi([we({attribute:!1})],Li.prototype,"areaId"),xi([we({attribute:!1})],Li.prototype,"visibleAreaIds"),xi([xe()],Li.prototype,"_expandedEntity"),xi([xe()],Li.prototype,"_dragValues"),xi([xe()],Li.prototype,"_showHeader");try{customElements.define("glass-fan-card",Li)}catch{}tt("glass-title-card-editor");var Mi=Object.defineProperty,Ri=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Mi(t,i,s),s};const Oi={success:{text:"var(--c-success)",dot:"var(--c-success)",glow:"rgba(74,222,128,0.5)"},warning:{text:"var(--c-warning)",dot:"var(--c-warning)",glow:"rgba(251,191,36,0.5)"},info:{text:"var(--c-info)",dot:"var(--c-info)",glow:"rgba(96,165,250,0.5)"},accent:{text:"var(--c-accent)",dot:"var(--c-accent)",glow:"rgba(129,140,248,0.5)"},alert:{text:"var(--c-alert)",dot:"var(--c-alert)",glow:"rgba(248,113,113,0.5)"},neutral:{text:"var(--t3)",dot:"var(--t4)",glow:"none"}},Di={input_select:"title_card.group_mode",scenes:"title_card.group_scenes",booleans:"title_card.group_toggles"};function ji(e){if(Oi[e])return Oi[e];if(e.startsWith("#")&&7===e.length){const t=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16);return{text:e,dot:e,glow:`rgba(${t},${i},${a},0.5)`}}return Oi.neutral}const Fi={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},qi={icon:"mdi:clock-outline",color:"var(--t3)"};class Hi extends rt{constructor(){super(...arguments),this._foldOpen=!1,this._activatingSceneId=null,this._titleConfig={title:"",sources:[],period_entity:"",period_options:[]},this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._sceneTimeout=0,this._boundClickOutside=this._onClickOutside.bind(this)}static getConfigElement(){return document.createElement("glass-title-card-editor")}getCardSize(){return 2}get _periodEntityId(){return this._titleConfig.period_entity||"input_select.periode_journee"}_getPeriodVisual(e){const t=Fi[e]||qi,i=this._titleConfig.period_options.find(t=>t.id===e);if(!i)return t;const a=i.color?.startsWith("#");return{icon:i.icon||t.icon,color:a?i.color:t.color}}static{this.styles=[Se,Ie,Pe,h`
    :host {
      width: 100%;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    .title-card {
      display: flex; flex-direction: column; align-items: center;
      gap: 0; padding: 0.125rem 1rem 0;
      text-align: center;
    }

    .title-text {
      font-size: var(--fz-xl); font-weight: 700; color: var(--t1);
      letter-spacing: -0.3px; line-height: 1.2;
      display: flex; align-items: center; gap: 0.875rem;
      width: 100%;
    }
    .title-text::before, .title-text::after {
      content: ''; flex: 1; height: 0.0625rem;
      background: linear-gradient(90deg, transparent, var(--b3));
    }
    .title-text::after {
      background: linear-gradient(90deg, var(--b3), transparent);
    }

    /* ── Dash trigger ── */
    .dash-trigger {
      display: flex; align-items: center; justify-content: center;
      min-height: 1.25rem;
      padding: 0.125rem 1rem;
      cursor: pointer; border: none; background: none; outline: none;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--radius-full);
      transition: background var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .dash-trigger:hover { background: var(--s1); }
    }
    .dash-trigger:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
    @media (pointer: coarse) {
      .dash-trigger:active { transform: scale(0.96); }
    }

    .dash-line {
      width: 1.25rem; height: 0.125rem; border-radius: 1px;
      background: var(--t4);
      transition: background var(--t-med), width var(--t-med), box-shadow var(--t-med);
    }

    /* ── Fold section ── */
    .fold-section {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
      overflow: hidden;
      width: 100%;
    }
    .fold-section.open { grid-template-rows: 1fr; }
    .fold-section-inner {
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.2s var(--ease-std) 0s;
    }
    .fold-section.open .fold-section-inner {
      opacity: 1;
      transition: opacity 0.2s var(--ease-std) 0.1s;
    }

    /* Fold separator */
    .fold-sep {
      height: 0.0625rem; width: 80%; margin: 0.25rem auto;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
    }

    /* ── Chips group ── */
    .chips-group-label {
      font-size: var(--fz-xs); font-weight: 600; text-transform: uppercase;
      letter-spacing: 1px; color: var(--t3);
      text-align: center; padding: 0.375rem 0 0.125rem;
    }
    .chips-group + .chips-group .chips-group-label {
      border-top: 1px solid var(--b1);
      margin: 0 20%; padding-top: 0.5rem;
    }

    .chips-row {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 0.375rem; padding: 0.25rem 0.25rem 0.5rem;
    }

    /* ── Chip ── */
    .chip {
      display: inline-flex; align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.75rem; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
    .chip ha-icon {
      --mdc-icon-size: var(--icon-sm);
      display: flex; align-items: center; justify-content: center;
    }
    @media (pointer: coarse) {
      .chip:active { transform: scale(0.94); }
    }

    @keyframes chip-pulse {
      0%   { box-shadow: inset 0 0 0 0 currentColor; }
      50%  { box-shadow: inset 0 0 8px 1px currentColor; }
      100% { box-shadow: inset 0 0 0 0 currentColor; }
    }
    .chip.pulsing { animation: chip-pulse 0.5s var(--ease-out); }

    /* ── Period indicator ── */
    .period-indicator {
      position: relative;
      height: 0.75rem;
      overflow: hidden;
      width: 100%;
    }
    .period-item {
      width: 100%;
      height: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--fz-xs);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--t3);
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      position: absolute;
      top: 0;
      transition: transform var(--t-layout), opacity var(--t-layout);
    }
    .period-item ha-icon {
      margin-right: 0.25rem;
    }
    .period-item::after {
      content: '';
      display: inline-block;
      width: calc(9px + 0.25rem);
    }
    .period-item.pos-far-left  { transform: translateX(-200%); opacity: 0; }
    .period-item.pos-left      { transform: translateX(-100%); opacity: 0.2; }
    .period-item.pos-center    { transform: translateX(0);     opacity: 1; }
    .period-item.pos-right     { transform: translateX(100%);  opacity: 0.2; }
    .period-item.pos-far-right { transform: translateX(200%);  opacity: 0; }
  `]}connectedCallback(){super.connectedCallback(),this._listen("title-config-changed",()=>this._loadConfig()),document.addEventListener("click",this._boundClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundClickOutside),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++,this._sceneTimeout&&(clearTimeout(this._sceneTimeout),this._sceneTimeout=0)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++),this._configLoaded||this._configLoading||(this._configLoading=!0,this._backend=new dt(this.hass),this._loadConfig()))}getTrackedEntityIds(){const e=[this._periodEntityId];for(const t of this._titleConfig.sources)if("input_select"===t.source_type&&t.entity)e.push(t.entity);else for(const i of t.modes)i.id.includes(".")&&e.push(i.id);return e}async _loadConfig(){if(!this._backend)return;const e=this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.title_card&&(this._titleConfig=t.title_card),this._configLoaded=!0,this._configLoading=!1,this.requestUpdate()}catch{e===this._loadVersion&&(this._configLoading=!1)}}_dashStyle(e){if(0===e.length)return"";const t=e.map(e=>ji(e)),i="width:"+Math.min(20+4*e.length,36)+"px";if(1===t.length)return`background:${t[0].dot};box-shadow:0 0 8px ${t[0].glow};${i}`;const a=t.length,r=t.flatMap((e,t)=>[`${e.dot} ${Math.round(t/a*100)}%`,`${e.dot} ${Math.round((t+1)/a*100)}%`]).join(", "),s=t.filter(e=>"none"!==e.glow);return`background:linear-gradient(90deg, ${r});box-shadow:${s.length>0?s.map(e=>`0 0 6px ${e.glow}`).join(", "):"none"};${i}`}_getActiveColors(e){if("input_select"===e.source_type){if(!e.entity||!this.hass)return[];const t=this.hass.states[e.entity];if(!t)return[];const i=e.modes.find(e=>e.id===t.state),a=i?.color||"neutral";return"neutral"!==a?[a]:[]}if("booleans"===e.source_type){if(!this.hass)return[];const t=[];for(const i of e.modes)if("on"===this.hass.states[i.id]?.state){const e=i.color||"success";"neutral"!==e&&t.push(e)}return t}if(this._activatingSceneId){const t=e.modes.find(e=>e.id===this._activatingSceneId);if(t)return[t.color||"accent"]}return[]}_isChipActive(e,t,i){return"input_select"===e.source_type?!(!e.entity||!this.hass)&&this.hass.states[e.entity]?.state===t.id:"booleans"===e.source_type?"on"===this.hass?.states[t.id]?.state:"scenes"===e.source_type&&this._activatingSceneId===t.id}_selectOption(e,t){e.entity&&this.hass&&this._safeCallService("input_select","select_option",{option:t},{entity_id:e.entity})}_activateScene(e){this.hass&&(st(this,"light"),this._safeCallService("scene","turn_on",{},{entity_id:e}),this._activatingSceneId=e,this._sceneTimeout&&clearTimeout(this._sceneTimeout),this._sceneTimeout=window.setTimeout(()=>{this._activatingSceneId=null,this._sceneTimeout=0},2e3),this.updateComplete.then(()=>{const t=this.shadowRoot?.querySelector(`.chip[data-id="${e}"]`);t&&(t.classList.add("pulsing"),setTimeout(()=>t.classList.remove("pulsing"),600))}))}_toggleBoolean(e){this.hass&&this._safeCallService("input_boolean","toggle",{},{entity_id:e})}_toggleFold(){this._foldOpen=!this._foldOpen}_onClickOutside(e){if(!this._foldOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelector(".dash-trigger"),r=i.querySelector(".fold-section");a&&r&&!t.includes(a)&&!t.includes(r)&&(this._foldOpen=!1)}render(){this._lang;const e=this._titleConfig.title||(this.configPreview?Qe("config.title_title_placeholder"):"");if(!e)return this.style.display="none",J;this.style.display="";const t=this._titleConfig.sources,i=t.length>0&&t.some(e=>e.modes.length>0),a=[];if(i)for(const s of t)a.push(...this._getActiveColors(s));const r=a.length>0?this._dashStyle(a):"";return X`
      <div class="title-card">
        <div class="title-text">${e}</div>
        ${this._renderPeriodIndicator()}
        ${i?X`
          <button
            class="dash-trigger"
            @click=${()=>this._toggleFold()}
            aria-label=${Qe("title_card.toggle_modes_aria")}
            aria-expanded=${this._foldOpen?"true":"false"}
          >
            <div
              class="dash-line"
              style="${r}"
            ></div>
          </button>
          <div class="fold-section ${this._foldOpen?"open":""}">
            <div class="fold-section-inner">
              <div class="fold-sep"></div>
              ${t.map((e,i)=>this._renderSourceGroup(e,i,t.length>1))}
            </div>
          </div>
        `:J}
      </div>
    `}_renderPeriodIndicator(){if(!this.hass)return J;const e=this.hass.states[this._periodEntityId];if(!e)return J;const t=e.attributes?.options??[];if(0===t.length)return J;const i=e.state,a=t.indexOf(i);if(-1===a)return X`<div class="period-indicator"></div>`;const r=ji(this._getPeriodVisual(i).color);return X`
      <div class="period-indicator" aria-live="polite" aria-label="${i}">
        ${t.map((e,t)=>{const i=this._getPeriodPos(t,a),s=this._getPeriodVisual(e);return X`
            <div class="period-item ${i}"
              style="${"pos-center"===i?`color:${r.text}`:""}">
              <ha-icon .icon=${s.icon} style="--mdc-icon-size:9px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${e}
            </div>
          `})}
      </div>
    `}_getPeriodPos(e,t){const i=e-t;return i<=-2?"pos-far-left":-1===i?"pos-left":0===i?"pos-center":1===i?"pos-right":"pos-far-right"}_renderSourceGroup(e,t,i){if(0===e.modes.length)return J;const a=Di[e.source_type],r=e.label||(a?Qe(a):e.source_type);return X`
      <div class="chips-group">
        ${i?X`<div class="chips-group-label">${r}</div>`:J}
        <div class="chips-row">
          ${e.modes.map((t,i)=>{const a=this._isChipActive(e,t,i),r=ji(t.color||"neutral");return X`
              <button
                class="chip"
                data-id=${t.id}
                style="${a?`color:${r.text};background:${r.dot}14;border-color:${r.dot}33;`:""}"
                aria-label=${t.label||t.id}
                @click=${a=>{a.stopPropagation(),this._onChipClick(e,t,i)}}
              >
                ${t.icon?X`<ha-icon .icon=${t.icon}></ha-icon>`:J}
                ${t.label||t.id.split(".")[1]||t.id}
              </button>
            `})}
        </div>
      </div>
    `}_onChipClick(e,t,i){"input_select"===e.source_type?this._selectOption(e,t.id):"scenes"===e.source_type?this._activateScene(t.id):"booleans"===e.source_type&&this._toggleBoolean(t.id)}}Ri([xe()],Hi.prototype,"_foldOpen"),Ri([xe()],Hi.prototype,"_activatingSceneId");try{customElements.define("glass-title-card",Hi)}catch{}tt("glass-spotify-card-editor");var Ni=Object.defineProperty,Vi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ni(t,i,s),s};function Ui(e,t=300){if(!e)return"";const i=e.images??e.album?.images??[];if(0===i.length)return"";const a=[...i].sort((e,i)=>Math.abs((e.width??300)-t)-Math.abs((i.width??300)-t));return a[0]?.url??""}function Wi(e){return e&&e.artists?.length?e.artists.map(e=>e.name).join(", "):""}function Bi(e){switch(e){case"track":default:return"mdi:music-note";case"playlist":return"mdi:playlist-music";case"album":return"mdi:album";case"show":case"podcast":case"episode":return"mdi:podcast"}}class Gi extends rt{constructor(){super(...arguments),this._view="library",this._tab="all",this._searchQuery="",this._playlists=[],this._recentlyPlayed=[],this._savedTracks=[],this._savedShows=[],this._searchResults={tracks:[],playlists:[],shows:[]},this._searchLoading=!1,this._searchOffset=0,this._searchHasMore=!1,this._searchVersion=0,this._drilldown=null,this._speakers=[],this._pickerItem=null,this._selectedSpeakers=new Set,this._error=null,this._libraryLoading=!1,this._spotifyConfigured=null,this._foldOpen=!1,this._savedMap=new Map,this._sectionTotals={},this._loadingMore={},this._spotifyConfig={entity_id:"",show_header:!0,sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},this._configLoaded=!1,this._configLoadingInProgress=!1,this._loadVersion=0,this._radioQueueVersion=0,this._debounceTimer=0}static getConfigElement(){return document.createElement("glass-spotify-card-editor")}getCardSize(){return 4}static{this.styles=[Se,Ie,Te,Pe,Le,h`
    :host { width: 100%; margin: 0 auto; user-select: none; -webkit-user-select: none; }

    .spotify-card-wrap { display: flex; flex-direction: column; gap: 0.375rem; }

    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 0 0.375rem; min-height: 1.375rem; }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4); display: flex; align-items: center; gap: 0.25rem;
    }
    .card-title ha-icon { color: var(--c-spotify); --mdc-icon-size: var(--icon-sm); display: flex; align-items: center; justify-content: center; }

    .spotify-card { position: relative; width: 100%; padding: 0.875rem; box-sizing: border-box; overflow: hidden; }
    .card-inner { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 0; }

    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse at 20% 20%, rgba(var(--rgb-spotify),0.12), transparent 70%);
      opacity: 0.6;
    }

    /* Search */
    .search-row { display: flex; gap: 0.375rem; align-items: center; }
    .search-input-wrap { position: relative; flex: 1; }
    .search-input {
      width: 100%; height: 2.25rem; padding: 0 2.25rem 0 2.125rem;
      border-radius: var(--radius-lg); background: var(--s2);
      border: 1px solid var(--b2); color: var(--t1);
      font-family: inherit; font-size: var(--fz-base); font-weight: 500;
      outline: none; transition: border-color var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent; box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--t4); }
    .search-input:focus { border-color: rgba(var(--rgb-spotify),0.3); background: var(--s3); box-shadow: 0 0 0 2px rgba(var(--rgb-spotify),0.1); }
    .search-icon {
      position: absolute; top: 50%; left: 0.625rem; transform: translateY(-50%);
      pointer-events: none; display: flex; align-items: center; justify-content: center;
    }
    .search-icon ha-icon { --mdc-icon-size: 1rem; color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .search-clear {
      position: absolute; top: 50%; right: 1.875rem; transform: translateY(-50%);
      width: 1.5rem; height: 1.5rem; border-radius: var(--radius-xs);
      background: transparent; border: none;
      display: none; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
    }
    .search-clear.visible { display: flex; }
    .search-clear ha-icon { --mdc-icon-size: var(--icon-sm); color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .search-clear:hover { background: var(--s3); } }
    @media (pointer: coarse) { .search-clear:active { animation: bounce 0.3s ease; } }
    .search-clear:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    /* Fold toggle arrow (inside search bar) */
    .search-toggle {
      position: absolute; top: 50%; right: 0.375rem; transform: translateY(-50%);
      width: 1.5rem; height: 1.5rem; border-radius: var(--radius-xs);
      background: transparent; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .search-toggle ha-icon {
      --mdc-icon-size: var(--icon-sm); color: var(--t4);
      display: flex; align-items: center; justify-content: center;
      transition: transform var(--t-fast), color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) { .search-toggle:hover { background: var(--s3); } }
    @media (hover: hover) and (pointer: fine) { .search-toggle:hover ha-icon { color: var(--t2); } }
    @media (pointer: coarse) { .search-toggle:active { animation: bounce 0.3s ease; } }
    .search-toggle:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    .search-toggle.open ha-icon { transform: rotate(180deg); color: var(--c-spotify); }

    /* Content fold (CSS Grid 0fr/1fr) */
    .sp-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .sp-fold.open { grid-template-rows: 1fr; }
    .sp-fold-inner {
      overflow: hidden; opacity: 0; min-height: 0;
      transition: opacity var(--t-fast) 0s;
      display: flex; flex-direction: column; gap: 0.625rem;
    }
    .sp-fold.open .sp-fold-inner { padding-top: 0.625rem; }
    .sp-fold.open .sp-fold-inner {
      opacity: 1;
      transition: opacity var(--t-fast) 0.1s;
    }

    /* Fold separator */
    .sp-fold-sep {
      height: 0.0625rem; margin: 0.125rem 0.75rem 0;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-spotify),0.15), transparent);
      opacity: 0; transition: opacity var(--t-fast);
    }
    .sp-fold.open + .sp-fold-sep { opacity: 1; }

    /* Tabs */
    .tab-bar {
      display: flex; gap: 0; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1); overflow: hidden;
    }
    .tab-btn {
      flex: 1; height: 1.875rem;
      display: flex; align-items: center; justify-content: center; gap: 0.25rem;
      background: transparent; border: none; color: var(--t3);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.6px;
      cursor: pointer; transition: background var(--t-fast), color var(--t-fast), transform var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn ha-icon { --mdc-icon-size: var(--icon-sm); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .tab-btn:hover { background: var(--s2); color: var(--t2); } }
    .tab-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) { .tab-btn:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .tab-btn:active { animation: bounce 0.3s ease; } }
    .tab-btn.active { background: rgba(var(--rgb-spotify),0.1); color: var(--c-spotify); }
    .tab-btn + .tab-btn { border-left: 1px solid var(--b1); }

    /* Content area */
    .content-area {
      display: flex; flex-direction: column; gap: 0.375rem;
      max-height: 23.75rem; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
    }
    .content-area::-webkit-scrollbar { display: none; }

    /* Section title */
    .section-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.2px; color: var(--t4); padding: 0.25rem 0.125rem 0.125rem; flex-shrink: 0;
    }

    /* Result row */
    .result-row {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.375rem 0.25rem; cursor: pointer; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
      flex-shrink: 0; background: none; border: none; width: 100%; box-sizing: border-box;
      font-family: inherit; text-align: left; color: inherit; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) { .result-row:hover { background: var(--s1); } }
    @media (hover: hover) and (pointer: fine) { .result-row:active { transform: scale(0.99); } }
    @media (pointer: coarse) { .result-row:active { animation: bounce 0.3s ease; } }
    .result-row:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    .result-art {
      width: 2.625rem; height: 2.625rem; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
    }
    .result-art.round { border-radius: 50%; }
    .result-art img { width: 100%; height: 100%; object-fit: cover; }
    .result-art ha-icon { --mdc-icon-size: var(--icon-md); color: var(--t4); display: flex; align-items: center; justify-content: center; }

    .result-info { flex: 1; min-width: 0; }
    .result-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .result-meta {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); margin-top: 0.0625rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      display: flex; align-items: center; gap: 0.25rem;
    }
    .result-type-badge {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
      padding: 0.0625rem 0.25rem; border-radius: var(--radius-full);
      background: var(--s3); color: var(--t4); flex-shrink: 0;
    }

    .result-play {
      width: 2rem; height: 2rem; border-radius: 50%;
      background: var(--c-spotify); border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: opacity var(--t-fast), transform var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
      opacity: 0; transform: scale(0.8); flex-shrink: 0;
    }
    .result-play ha-icon { --mdc-icon-size: 1rem; color: #000; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .result-row:hover .result-play { opacity: 1; transform: scale(1); } }
    @media (hover: hover) and (pointer: fine) { .result-play:active { transform: scale(0.92); } }
    @media (pointer: coarse) { .result-play:active { animation: bounce 0.3s ease; } }
    .result-play:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    /* Playlist grid (horizontal scroll) */
    .playlist-scroll {
      display: flex; gap: 0.5rem; overflow-x: auto; overflow-y: hidden;
      padding: 0.125rem 0.125rem 0.25rem; margin: 0 -0.125rem; scrollbar-width: none; flex-shrink: 0;
    }
    .playlist-scroll::-webkit-scrollbar { display: none; }

    .playlist-card {
      flex-shrink: 0; width: 5.25rem;
      display: flex; flex-direction: column; gap: 0.375rem;
      cursor: pointer; padding: 0; background: none; border: none;
      outline: none; text-align: left; font-family: inherit;
      -webkit-tap-highlight-color: transparent; color: inherit;
    }
    @media (hover: hover) and (pointer: fine) { .playlist-card:active { transform: scale(0.97); } }
    @media (pointer: coarse) { .playlist-card:active { animation: bounce 0.3s ease; } }
    .playlist-card:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    .playlist-art {
      width: 5.25rem; height: 5.25rem; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative; transition: border-color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) { .playlist-card:hover .playlist-art { border-color: var(--b3); } }
    .playlist-art img { width: 100%; height: 100%; object-fit: cover; }
    .playlist-art ha-icon { --mdc-icon-size: 2rem; color: rgba(var(--rgb-white),0.4); display: flex; align-items: center; justify-content: center; }

    .playlist-art-play {
      position: absolute; bottom: 0.375rem; right: 0.375rem;
      width: 1.75rem; height: 1.75rem; border-radius: 50%;
      background: var(--c-spotify);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: translateY(4px);
      transition: opacity var(--t-fast), transform var(--t-fast);
      box-shadow: 0 4px 12px rgba(var(--rgb-black),0.4);
      pointer-events: none;
    }
    .playlist-art-play ha-icon { --mdc-icon-size: var(--icon-sm); color: #000; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art-play { opacity: 1; transform: translateY(0); }
    }

    .playlist-name {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t2); line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .playlist-count { font-size: var(--fz-xs); font-weight: 500; color: var(--t4); }

    /* Drilldown header */
    .drilldown-header {
      display: flex; align-items: center; justify-content: space-between;
    }

    /* Back button */
    .back-btn {
      display: flex; align-items: center; gap: 0.25rem;
      background: none; border: none; color: var(--t3);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      cursor: pointer; padding: 0.25rem 0.125rem; outline: none;
      -webkit-tap-highlight-color: transparent;
      transition: color var(--t-fast);
    }
    .back-btn ha-icon { --mdc-icon-size: 1rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .back-btn:hover { color: var(--t1); } }
    @media (pointer: coarse) { .back-btn:active { animation: bounce 0.3s ease; } }
    .back-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    /* Play all button */
    .play-all-btn {
      display: flex; align-items: center; gap: 0.25rem;
      background: rgba(30, 215, 96, 0.12); border: none; color: var(--c-spotify-hover);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      cursor: pointer; padding: 0.25rem 0.625rem; border-radius: var(--radius-full);
      outline: none; -webkit-tap-highlight-color: transparent;
      transition: background var(--t-fast), color var(--t-fast);
    }
    .play-all-btn ha-icon { --mdc-icon-size: 1rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .play-all-btn:hover { background: rgba(30, 215, 96, 0.22); } }
    @media (pointer: coarse) { .play-all-btn:active { animation: bounce 0.3s ease; } }
    .play-all-btn:focus-visible { outline: 2px solid rgba(30, 215, 96, 0.4); outline-offset: 2px; }

    /* Empty & error states */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 2rem 1rem; gap: 0.5rem;
    }
    .empty-state ha-icon { --mdc-icon-size: 2rem; color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .empty-state-text { font-size: var(--fz-base); font-weight: 500; color: var(--t4); text-align: center; }

    .error-banner {
      padding: 0.5rem 0.75rem; border-radius: var(--radius-md);
      background: rgba(var(--rgb-alert),0.1); border: 1px solid rgba(var(--rgb-alert),0.2);
      font-size: var(--fz-base); font-weight: 500; color: var(--c-alert);
    }

    .setup-banner {
      display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
      padding: 1.5rem 1rem; text-align: center;
    }
    .setup-banner ha-icon { --mdc-icon-size: 2.5rem; color: var(--c-spotify); display: flex; align-items: center; justify-content: center; }
    .setup-banner-text { font-size: var(--fz-base); color: var(--t3); line-height: 1.5; }
    .setup-link {
      font-size: var(--fz-base); font-weight: 600; color: var(--c-spotify);
      background: rgba(var(--rgb-spotify),0.1); border: 1px solid rgba(var(--rgb-spotify),0.2);
      border-radius: var(--radius-md); padding: 0.375rem 0.875rem;
      cursor: pointer; text-decoration: none; outline: none;
      -webkit-tap-highlight-color: transparent; transition: background var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) { .setup-link:hover { background: rgba(var(--rgb-spotify),0.2); } }
    @media (pointer: coarse) { .setup-link:active { animation: bounce 0.3s ease; } }
    .setup-link:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

    /* Load more button */
    .load-more-btn {
      display: flex; align-items: center; justify-content: center;
      padding: 0.5rem; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      color: var(--t3); font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent;
      transition: background var(--t-fast), color var(--t-fast); flex-shrink: 0;
    }
    @media (hover: hover) and (pointer: fine) { .load-more-btn:hover { background: var(--s2); color: var(--t1); } }
    @media (pointer: coarse) { .load-more-btn:active { animation: bounce 0.3s ease; } }
    .load-more-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    /* Speaker picker overlay */
    .picker-backdrop {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(var(--rgb-black),0.5);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 1rem; padding-bottom: 5rem;
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .picker-backdrop.visible { opacity: 1; pointer-events: auto; }

    .speaker-picker {
      width: 100%; max-width: 25rem;
      padding: 1rem;
      max-height: calc(100dvh - 10rem);
      display: flex; flex-direction: column;
      transform: translateY(20px);
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
    }
    .picker-backdrop.visible .speaker-picker { transform: translateY(0); }

    .picker-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
    .picker-title { font-size: var(--fz-md); font-weight: 700; color: var(--t1); }
    .picker-close {
      width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none; transition: background var(--t-fast);
    }
    .picker-close ha-icon { --mdc-icon-size: 1rem; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .picker-close:hover { background: var(--s3); } }
    @media (pointer: coarse) { .picker-close:active { animation: bounce 0.3s ease; } }
    .picker-close:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    .picker-track {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.5rem; margin-bottom: 0.75rem;
      background: var(--s1); border-radius: var(--radius-md); border: 1px solid var(--b1);
    }
    .picker-track-art {
      width: 2.5rem; height: 2.5rem; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .picker-track-art img { width: 100%; height: 100%; object-fit: cover; }
    .picker-track-art ha-icon { --mdc-icon-size: var(--icon-md); color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .picker-track-info { flex: 1; min-width: 0; }
    .picker-track-title { font-size: var(--fz-base); font-weight: 600; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .picker-track-artist { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .picker-speakers {
      display: flex; flex-direction: column; gap: 0.25rem;
      overflow-y: auto; flex: 1; min-height: 0;
      scrollbar-width: none;
    }
    .picker-speakers::-webkit-scrollbar { display: none; }
    .picker-speaker {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.5rem; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      font-family: inherit; outline: none; width: 100%;
      -webkit-tap-highlight-color: transparent; color: inherit;
      flex-shrink: 0;
    }
    .picker-speaker.selected { border-color: rgba(var(--rgb-spotify),0.4); background: rgba(var(--rgb-spotify),0.08); }
    @media (hover: hover) and (pointer: fine) { .picker-speaker:hover { background: var(--s3); border-color: var(--b2); } }
    @media (hover: hover) and (pointer: fine) { .picker-speaker:active { transform: scale(0.98); } }
    @media (pointer: coarse) { .picker-speaker:active { animation: bounce 0.3s ease; } }
    .picker-speaker:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    .picker-speaker-icon {
      width: 2rem; height: 2rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-icon { background: rgba(var(--rgb-spotify),0.15); border-color: rgba(var(--rgb-spotify),0.3); }
    .picker-speaker-icon ha-icon { --mdc-icon-size: 1rem; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    .picker-speaker.selected .picker-speaker-icon ha-icon { color: var(--c-spotify); }
    .picker-speaker-name { flex: 1; font-size: var(--fz-base); font-weight: 600; color: var(--t2); }
    .picker-speaker-status { font-size: var(--fz-xs); font-weight: 500; color: var(--t4); white-space: nowrap; }
    .picker-speaker-status.playing { color: rgba(var(--rgb-spotify),0.6); }
    .picker-speaker-check {
      width: 1.25rem; height: 1.25rem; border-radius: 50%;
      border: 2px solid var(--b2); background: transparent;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: border-color var(--t-fast), background var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-check { border-color: var(--c-spotify); background: var(--c-spotify); }
    .picker-speaker-check ha-icon { --mdc-icon-size: var(--icon-sm); color: #fff; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity var(--t-fast); }
    .picker-speaker.selected .picker-speaker-check ha-icon { opacity: 1; }

    .picker-play-bar {
      display: flex; gap: 0.5rem; padding-top: 0.5rem; flex-shrink: 0;
    }
    .picker-play-btn {
      flex: 1; padding: 0.625rem; border-radius: var(--radius-md);
      border: none; cursor: pointer; font-family: inherit; font-size: var(--fz-base); font-weight: 700;
      display: flex; align-items: center; justify-content: center; gap: 0.375rem;
      transition: background var(--t-fast), transform var(--t-fast); outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .picker-play-btn.primary { background: var(--c-spotify); color: #fff; }
    .picker-play-btn.primary:disabled { opacity: 0.4; cursor: default; }
    @media (hover: hover) and (pointer: fine) { .picker-play-btn.primary:not(:disabled):hover { background: var(--c-spotify-hover); } }
    .picker-play-btn.primary ha-icon { --mdc-icon-size: var(--icon-md); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .picker-play-btn:active:not(:disabled) { transform: scale(0.98); } }
    @media (pointer: coarse) { .picker-play-btn:active:not(:disabled) { animation: bounce 0.3s ease; } }

    /* Now playing indicator */
    .result-row.now-playing {
      background: color-mix(in srgb, var(--c-accent) 8%, transparent);
      border-radius: var(--radius-sm);
    }
    .result-row.now-playing .result-title {
      color: var(--c-accent);
    }
    .result-row .eq-bars { flex-shrink: 0; }

    /* Heart (favorite) button */
    .heart-btn {
      width: 1.5rem; height: 1.5rem;
      border-radius: var(--radius-sm);
      background: transparent; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      color: var(--t3); flex-shrink: 0;
      transition: transform var(--t-fast), color var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .heart-btn ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
    }
    .heart-btn.saved ha-icon {
      color: var(--c-accent);
    }
    .heart-btn:active {
      transform: scale(0.85);
    }
    @media (hover: hover) and (pointer: fine) {
      .heart-btn:hover {
        transform: scale(1.1);
      }
    }

    /* Load more (library pagination) */
    .load-more {
      width: 100%;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .items-count {
      font-size: var(--fz-sm);
      color: var(--t3);
    }

    /* Loading spinner placeholder */
    .loading-text { font-size: var(--fz-base); color: var(--t4); text-align: center; padding: 1rem 0; }
  `]}getTrackedEntityIds(){const e=this._getEntityId(),t=e?[e]:[];return this._spotifyConfig?.entity_id&&!t.includes(this._spotifyConfig.entity_id)&&t.push(this._spotifyConfig.entity_id),t}_isNowPlaying(e){const t=this._spotifyConfig?.entity_id;if(!t)return!1;const i=this.hass?.states[t];return!(!i||"playing"!==i.state)&&(i.attributes.media_content_id??"")===e}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._spotifyConfig.entity_id)return this._spotifyConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("media_player.spotify"));if(e)return e}return""}shouldUpdate(e){return!!super.shouldUpdate(e)&&("speaker_picker"!==this._view||1!==e.size||!e.has("hass"))}connectedCallback(){super.connectedCallback(),this._listen("spotify-config-changed",()=>{this._configLoaded=!1,this._loadConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._debounceTimer&&clearTimeout(this._debounceTimer),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}_collapseExpanded(){"speaker_picker"!==this._view?(this._foldOpen&&(this._foldOpen=!1),this._drilldown&&(this._drilldown=null,this._view=this._searchQuery?"search":"library")):this._closePicker()}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new dt(this.hass),this._loadConfig()))}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;if(t?.spotify_card&&(this._spotifyConfig=t.spotify_card),this._configLoaded=!0,await this._checkSpotifyStatus(),e!==this._loadVersion)return;this._spotifyConfigured&&this._loadLibrary(),this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}async _checkSpotifyStatus(){if(this._backend)try{const e=await this._backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}async _loadLibrary(){if(!this._backend)return;this._libraryLoading=!0,this._error=null;const e=this._spotifyConfig.max_items_per_section;try{const[t,i,a,r]=await Promise.all([this._backend.send("spotify_browse",{category:"playlists",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"recently_played",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_tracks",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_shows",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order})]);this._playlists=(t?.items??[]).filter(Boolean),this._recentlyPlayed=(i?.items??[]).filter(Boolean),this._savedTracks=(a?.items??[]).filter(Boolean),this._savedShows=(r?.items??[]).filter(Boolean).map(e=>e.show??e),this._sectionTotals={playlists:t?.total??0,recently_played:i?.total??0,saved_tracks:a?.total??0,saved_shows:r?.total??0};const s=[];for(const e of this._recentlyPlayed){const t=e.track??e;!t.id||"track"!==t.type&&t.type||s.push(t.id)}for(const e of this._savedTracks){const t=e.track??e;t.id&&s.push(t.id)}s.length&&this._checkSavedStatus(s)}catch(t){this._handleApiError(t)}finally{this._libraryLoading=!1}}_onSearchInput(e){const t=e.target.value;if(this._searchQuery=t,this._debounceTimer&&clearTimeout(this._debounceTimer),0===t.length)return this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},void(this._searchOffset=0);this._foldOpen||(this._foldOpen=!0),this._view="search",this._debounceTimer=window.setTimeout(()=>this._doSearch(!1),300)}_clearSearch(){this._searchQuery="",this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},this._searchOffset=0,this._foldOpen=!1}async _doSearch(e){if(!this._backend||!this._searchQuery)return;const t=++this._searchVersion;this._searchLoading=!0,this._error=null;const i=e?this._searchOffset:0;try{let a;a="tracks"===this._tab?["track"]:"playlists"===this._tab?["playlist"]:"podcasts"===this._tab?["show"]:["track","playlist","show"];const r=await this._backend.send("spotify_search",{query:this._searchQuery,types:a,limit:12,offset:i});if(t!==this._searchVersion)return;const s=(r?.tracks?.items??[]).filter(Boolean),o=(r?.playlists?.items??[]).filter(Boolean),n=(r?.shows?.items??[]).filter(Boolean);this._searchResults=e?{tracks:[...this._searchResults.tracks,...s],playlists:[...this._searchResults.playlists,...o],shows:[...this._searchResults.shows,...n]}:{tracks:s,playlists:o,shows:n},this._searchOffset=i+12;const l=(r?.tracks?.total??0)+(r?.playlists?.total??0)+(r?.shows?.total??0),c=this._searchResults.tracks.length+this._searchResults.playlists.length+this._searchResults.shows.length;this._searchHasMore=c<l;const d=s.filter(e=>e.id).map(e=>e.id);d.length&&this._checkSavedStatus(d)}catch(a){if(t!==this._searchVersion)return;this._handleApiError(a)}finally{t===this._searchVersion&&(this._searchLoading=!1)}}async _openDrilldown(e,t,i){if(this._backend){this._view="drilldown",this._drilldown={title:i,type:e,id:t,items:[],total:0,offset:0,loading:!0},this._error=null;try{const i="playlist"===e?"playlist_tracks":"album_tracks",a=await this._backend.send("spotify_browse",{category:i,content_id:t,limit:20,offset:0,sort_order:this._spotifyConfig.sort_order}),r=a?.items??[];if(!this._drilldown)return;this._drilldown={...this._drilldown,items:r,total:a?.total??0,offset:20,loading:!1};const s=r.map(e=>(e.track??e).id).filter(Boolean);s.length&&this._checkSavedStatus(s)}catch(a){this._handleApiError(a),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}async _loadMoreDrilldown(){if(this._drilldown&&this._backend){this._drilldown={...this._drilldown,loading:!0};try{const e="playlist"===this._drilldown.type?"playlist_tracks":"album_tracks",t=await this._backend.send("spotify_browse",{category:e,content_id:this._drilldown.id,limit:20,offset:this._drilldown.offset,sort_order:this._spotifyConfig.sort_order}),i=t?.items??[];this._drilldown={...this._drilldown,items:[...this._drilldown.items,...i],offset:this._drilldown.offset+20,loading:!1};const a=i.map(e=>(e.track??e).id).filter(Boolean);a.length&&this._checkSavedStatus(a)}catch(e){this._handleApiError(e),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}_goBack(){this._drilldown=null,this._view=this._searchQuery?"search":"library"}_openPicker(e){if(this._pickerItem=e,this._view="speaker_picker",this._selectedSpeakers=new Set,this.hass){const e=this._spotifyConfig.visible_speakers,t=e.length>0;this._speakers=Object.entries(this.hass.states).filter(([i])=>!!i.startsWith("media_player.")&&!(t&&!e.includes(i))).map(([e,t])=>{const i=t.attributes.device_class??"";let a="mdi:speaker";return"tv"===i||e.includes("tv")?a="mdi:television":"receiver"===i?a="mdi:audio-video":(e.includes("nest")||e.includes("hub")||e.includes("echo_show"))&&(a="mdi:tablet"),{entityId:e,name:t.attributes.friendly_name??e,state:t.state,mediaTitle:t.attributes.media_title??null,icon:a}}).sort((i,a)=>{if(t)return e.indexOf(i.entityId)-e.indexOf(a.entityId);const r=e=>"playing"===e?0:"paused"===e?1:2;return r(i.state)-r(a.state)})}}_closePicker(){this._pickerItem=null,this._view=this._drilldown?"drilldown":this._searchQuery?"search":"library"}_toggleSpeakerSelection(e){const t=new Set(this._selectedSpeakers);t.has(e)?t.delete(e):t.add(e),this._selectedSpeakers=t}async _playOnSelectedSpeakers(){if(!this.hass||!this._pickerItem||0===this._selectedSpeakers.size)return;st(this,"light");const e=this._pickerItem,t=e.uri??`spotify:${e.type}:${e.id}`,i=[...this._selectedSpeakers],a="track"===e.type?"music":"playlist"===e.type?"playlist":"album"===e.type?"music":"podcast";try{for(const e of i){const t=this.hass.states[e];if(!t)continue;const i=t.attributes.group_members;i&&i.length>1&&this._safeCallService("media_player","unjoin",{},{entity_id:e})}i.length>1&&await new Promise(e=>setTimeout(e,600));const r=i[0];if(this._safeCallService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:r}),i.length>1){const e=i.slice(1),s=this.hass.states[r];if(s&&!!(524288&s.attributes.supported_features))await new Promise(e=>setTimeout(e,800)),this._safeCallService("media_player","join",{group_members:e},{entity_id:r});else for(const i of e)this._safeCallService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:i})}"track"!==e.type&&"episode"!==e.type||!this._backend||this._seedRadioQueue(e)}catch{}this._closePicker()}async _seedRadioQueue(e){if(!this._backend)return;const t=++this._radioQueueVersion;try{if(await new Promise(e=>setTimeout(e,2e3)),!this._backend||t!==this._radioQueueVersion)return;const a=await this._backend.send("spotify_browse",{category:"recommendations",seed_tracks:[e.id],limit:20});if(t!==this._radioQueueVersion)return;const r=a?.tracks??[];i.emit("radio-queue-started",{count:r.length});let s=0;for(let e=0;e<r.length;e++){const a=r[e];if(!this._backend||t!==this._radioQueueVersion)break;const o=a.uri??`spotify:track:${a.id}`;try{await this._backend.send("spotify_add_to_queue",{uri:o}),s++,i.emit("radio-queue-track-added",{track:{id:a.id,name:a.name,uri:o,artist:Wi(a)||void 0},index:e}),await new Promise(e=>setTimeout(e,150))}catch{break}}t===this._radioQueueVersion&&i.emit("radio-queue-complete",{total:s})}catch(a){t===this._radioQueueVersion&&i.emit("radio-queue-error",{message:a.message??"Unknown error"})}}async _loadMoreItems(e){if(!this._backend||this._loadingMore[e])return;this._loadingMore={...this._loadingMore,[e]:!0};const t=this._spotifyConfig.max_items_per_section;let i=0;"playlists"===e?i=this._playlists.length:"recently_played"===e?i=this._recentlyPlayed.length:"saved_tracks"===e?i=this._savedTracks.length:"saved_shows"===e&&(i=this._savedShows.length);try{const a=await this._backend.send("spotify_browse",{category:e,limit:t,offset:i,sort_order:this._spotifyConfig.sort_order}),r=(a?.items??[]).filter(Boolean);if("playlists"===e)this._playlists=[...this._playlists,...r];else if("recently_played"===e)this._recentlyPlayed=[...this._recentlyPlayed,...r];else if("saved_tracks"===e){this._savedTracks=[...this._savedTracks,...r];const e=r.map(e=>(e.track??e).id).filter(Boolean);e.length&&this._checkSavedStatus(e)}else"saved_shows"===e&&(this._savedShows=[...this._savedShows,...r.map(e=>e.show??e)]);null!=a?.total&&(this._sectionTotals={...this._sectionTotals,[e]:a.total})}catch(a){this._handleApiError(a)}finally{this._loadingMore={...this._loadingMore,[e]:!1}}}_renderLoadMore(e,t){const i=this._sectionTotals[e]??0;return t>=i?J:X`
      <button class="load-more-btn load-more" ?disabled=${this._loadingMore[e]} @click=${()=>this._loadMoreItems(e)}>
        ${Qe("spotify.load_more")}
        <span class="items-count">${Qe("spotify.items_count",{current:String(t),total:String(i)})}</span>
      </button>
    `}async _checkSavedStatus(e){const t=[...new Set(e)];if(t.length&&this._backend)try{const e=await this._backend.send("spotify_check_saved",{track_ids:t});if(!this.isConnected)return;const i=new Map(this._savedMap);for(const[t,a]of Object.entries(e??{}))i.set(t,a);this._savedMap=i}catch{}}async _toggleSaved(e){if(!this._backend)return;st(this,"light");const t=this._savedMap.get(e)??!1,i=new Map(this._savedMap);i.set(e,!t),this._savedMap=i;try{t?await this._backend.send("spotify_remove_tracks",{track_ids:[e]}):await this._backend.send("spotify_save_tracks",{track_ids:[e]})}catch{const i=new Map(this._savedMap);i.set(e,t),this._savedMap=i}}_handleApiError(e){const t=e;"spotify_not_configured"===t.code?this._spotifyConfigured=!1:t.message?.includes("rate limit")||t.message?.includes("429")?this._error=Qe("spotify.error_rate_limit",{seconds:"30"}):this._error=Qe("spotify.error_api")}render(){if(this._lang,!this._configLoaded)return J;const e=this._getEntityId();if(!1===this._spotifyConfigured)return this._renderShell(X`
        <div class="setup-banner">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <div class="setup-banner-text">${Qe("spotify.not_configured")}</div>
          <a class="setup-link" href="/config/integrations/dashboard" target="_blank">
            ${Qe("spotify.open_config")}
          </a>
        </div>
      `);if(!e)return this._renderShell(X`
        <div class="setup-banner">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <div class="setup-banner-text">${Qe("spotify.no_entity")}</div>
          <a class="setup-link" href="/glass-cards" target="_blank">
            ${Qe("spotify.open_config")}
          </a>
        </div>
      `);const t="speaker_picker"===this._view&&this._pickerItem;return X`
      ${this._renderShell(X`
        ${this._error?X`<div class="error-banner">${this._error}</div>`:J}
        ${"drilldown"===this._view&&this._drilldown?this._renderDrilldown():X`
            ${this._renderSearch()}
            <div class="sp-fold ${this._foldOpen?"open":""}">
              <div class="sp-fold-inner">
                ${this._renderTabs()}
                <div class="content-area">
                  ${"search"===this._view?this._renderSearchResults():this._renderLibrary()}
                </div>
              </div>
            </div>
          `}
      `)}
      ${t?this._renderSpeakerPicker():J}
    `}_renderShell(e){return X`
      <div class="spotify-card-wrap">
        ${this._spotifyConfig.show_header?X`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${Qe("spotify.title")}</span>
            </div>
          </div>
        `:J}
        <div class="glass spotify-card">
          <div class="tint"></div>
          <div class="card-inner">${e}</div>
        </div>
      </div>
    `}_renderSearch(){return X`
      <div class="search-row">
        <div class="search-input-wrap">
          <div class="search-icon"><ha-icon .icon=${"mdi:magnify"}></ha-icon></div>
          <input
            class="search-input"
            type="text"
            placeholder=${Qe("spotify.search_placeholder")}
            .value=${this._searchQuery}
            @input=${this._onSearchInput}
            @focus=${()=>{this._foldOpen||(this._foldOpen=!0),this._scrollToTop()}}
          />
          <button
            class="search-clear ${this._searchQuery?"visible":""}"
            aria-label="${Qe("spotify.clear_search")}"
            @click=${this._clearSearch}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
          <button
            class="search-toggle ${this._foldOpen?"open":""}"
            aria-label=${Qe("spotify.toggle_library")}
            @click=${()=>{this._foldOpen=!this._foldOpen}}
          >
            <ha-icon .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
        </div>
      </div>
    `}_renderTabs(){return X`
      <div class="tab-bar">
        ${[{id:"all",labelKey:"spotify.tab_all",icon:"mdi:home"},{id:"tracks",labelKey:"spotify.tab_tracks",icon:"mdi:music-note"},{id:"playlists",labelKey:"spotify.tab_playlists",icon:"mdi:playlist-music"},{id:"podcasts",labelKey:"spotify.tab_podcasts",icon:"mdi:podcast"}].map(e=>X`
          <button
            class="tab-btn ${this._tab===e.id?"active":""}"
            aria-label=${Qe(e.labelKey)}
            @click=${()=>{this._tab=e.id,this._searchQuery&&(this._searchOffset=0,this._doSearch(!1))}}
          >
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${Qe(e.labelKey)}</span>
          </button>
        `)}
      </div>
    `}_renderLibrary(){if(this._libraryLoading)return X`<div class="loading-text">${Qe("spotify.loading")}</div>`;const e="all"===this._tab||"playlists"===this._tab,t="all"===this._tab||"tracks"===this._tab,i="all"===this._tab||"podcasts"===this._tab;return e&&this._playlists.length>0||t&&(this._recentlyPlayed.length>0||this._savedTracks.length>0)||i&&this._savedShows.length>0?X`
      ${e&&this._playlists.length>0?X`
        <div class="section-title">${Qe("spotify.my_playlists")}</div>
        <div class="playlist-scroll">
          ${this._playlists.map(e=>this._renderPlaylistCard(e))}
        </div>
        ${this._renderLoadMore("playlists",this._playlists.length)}
      `:J}

      ${t&&this._recentlyPlayed.length>0?X`
        <div class="section-title">${Qe("spotify.recently_played")}</div>
        ${this._recentlyPlayed.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
        ${this._renderLoadMore("recently_played",this._recentlyPlayed.length)}
      `:J}

      ${t&&this._savedTracks.length>0?X`
        <div class="section-title">${Qe("spotify.saved_tracks")}</div>
        ${this._savedTracks.map(e=>{const t=e.track??e;return this._renderResultRow(t,"track")})}
        ${this._renderLoadMore("saved_tracks",this._savedTracks.length)}
      `:J}

      ${i&&this._savedShows.length>0?X`
        <div class="section-title">${Qe("spotify.followed_podcasts")}</div>
        ${this._savedShows.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
        ${this._renderLoadMore("saved_shows",this._savedShows.length)}
      `:J}
    `:X`
        <div class="empty-state">
          <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
          <div class="empty-state-text">${Qe("spotify.no_content")}</div>
        </div>
      `}_renderPlaylistCard(e){const t=Ui(e,160),i=e.tracks?.total??0;return X`
      <button
        class="playlist-card"
        aria-label=${e.name}
        @click=${()=>this._openDrilldown("playlist",e.id,e.name)}
      >
        <div class="playlist-art" style=${t?"":"background:#3040a0"}>
          ${t?X`<img src=${t} alt="" loading="lazy" />`:X`<ha-icon .icon=${"mdi:playlist-music"}></ha-icon>`}
          <div class="playlist-art-play"><ha-icon .icon=${"mdi:play"}></ha-icon></div>
        </div>
        <div class="playlist-name">${e.name}</div>
        ${i>0?X`<div class="playlist-count">${Qe("spotify.tracks_count",{count:String(i)})}</div>`:J}
      </button>
    `}_renderResultRow(e,t){if(!e)return J;const i=Ui(e,64),a=Wi(e)||(e.owner?.display_name??""),r="show"===t||"episode"===t,s=e.uri??`spotify:${e.type??t}:${e.id}`,o=this._isNowPlaying(s);return X`
      <div
        class="result-row ${o?"now-playing":""}"
        role="button"
        tabindex="0"
        @click=${()=>{"playlist"===t?this._openDrilldown("playlist",e.id,e.name):"album"===t?this._openDrilldown("album",e.id,e.name):this._openPicker(e)}}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.currentTarget.click())}}
      >
        <div class="result-art ${r?"round":""}">
          ${i?X`<img src=${i} alt="" loading="lazy" />`:X`<ha-icon .icon=${Bi(t)}></ha-icon>`}
        </div>
        <div class="result-info">
          <div class="result-title">${e.name}</div>
          <div class="result-meta">
            <span class="result-type-badge">${Qe(function(e){switch(e){case"track":default:return"spotify.type_track";case"playlist":return"spotify.type_playlist";case"album":return"spotify.type_album";case"show":case"episode":return"spotify.type_podcast"}}(t))}</span>
            <span>${a}</span>
          </div>
        </div>
        ${"track"!==t&&"episode"!==t||!e.id?J:X`
          <button class="heart-btn ${this._savedMap.get(e.id)?"saved":""}"
                  aria-label="${this._savedMap.get(e.id)?Qe("spotify.remove_track"):Qe("spotify.save_track")}"
                  @click=${t=>{t.stopPropagation(),this._toggleSaved(e.id)}}>
            <ha-icon .icon="${this._savedMap.get(e.id)?"mdi:heart":"mdi:heart-outline"}"></ha-icon>
          </button>
        `}
        ${o?X`<div class="eq-bars"><span></span><span></span><span></span></div>`:X`
            <button
              class="result-play"
              aria-label=${Qe("spotify.play_aria",{name:e.name})}
              @click=${t=>{t.stopPropagation(),this._openPicker(e)}}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
            </button>
          `}
      </div>
    `}_renderSearchResults(){if(this._searchLoading&&0===this._searchOffset)return X`<div class="loading-text">${Qe("spotify.loading")}</div>`;const{tracks:e,playlists:t,shows:i}=this._searchResults,a=("all"===this._tab||"tracks"===this._tab)&&e.length>0,r=("all"===this._tab||"playlists"===this._tab)&&t.length>0,s=("all"===this._tab||"podcasts"===this._tab)&&i.length>0;return a||r||s?X`
      ${a?X`
        ${"all"===this._tab?X`<div class="section-title">${Qe("spotify.tab_tracks")}</div>`:J}
        ${e.map(e=>this._renderResultRow(e,"track"))}
      `:J}

      ${r?X`
        ${"all"===this._tab?X`<div class="section-title">${Qe("spotify.tab_playlists")}</div>`:J}
        ${t.map(e=>this._renderResultRow(e,"playlist"))}
      `:J}

      ${s?X`
        ${"all"===this._tab?X`<div class="section-title">${Qe("spotify.tab_podcasts")}</div>`:J}
        ${i.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
      `:J}

      ${this._searchHasMore?X`
        <button class="load-more-btn" @click=${()=>this._doSearch(!0)} ?disabled=${this._searchLoading}>
          ${this._searchLoading?Qe("spotify.loading"):Qe("spotify.load_more")}
        </button>
      `:J}
    `:X`
        <div class="empty-state">
          <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
          <div class="empty-state-text">${Qe("spotify.no_results",{query:this._searchQuery})}</div>
        </div>
      `}_playFullDrilldown(){if(!this._drilldown)return;const e=this._drilldown,t=`spotify:${e.type}:${e.id}`;this._openPicker({id:e.id,name:e.title,type:e.type,uri:t})}_renderDrilldown(){const e=this._drilldown;return e?X`
      <div class="drilldown-header">
        <button class="back-btn" @click=${this._goBack}>
          <ha-icon .icon=${"mdi:arrow-left"}></ha-icon>
          ${Qe("spotify.back")}
        </button>
        <button class="play-all-btn" @click=${this._playFullDrilldown} aria-label=${Qe("spotify.play_all")}>
          <ha-icon .icon=${"mdi:play-circle"}></ha-icon>
          ${Qe("spotify.play_all")}
        </button>
      </div>
      <div class="section-title">${e.title}</div>
      <div class="content-area">
        ${e.items.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
        ${e.loading?X`<div class="loading-text">${Qe("spotify.loading")}</div>`:J}
        ${!e.loading&&e.items.length<e.total?X`
          <button class="load-more-btn" ?disabled=${e.loading} @click=${this._loadMoreDrilldown}>
            ${Qe("spotify.load_more")}
          </button>
        `:J}
      </div>
    `:J}_renderSpeakerPicker(){const e=this._pickerItem;if(!e)return J;const t=Ui(e,64),i=Wi(e),a=this._selectedSpeakers.size>0;return X`
      <div class="picker-backdrop visible" role="presentation" @click=${e=>{e.target.classList.contains("picker-backdrop")&&this._closePicker()}}>
        <div class="glass speaker-picker">
          <div class="picker-header">
            <div class="picker-title">${Qe("spotify.play_on")}</div>
            <button class="picker-close" aria-label="${Qe("common.close")}" @click=${this._closePicker}>
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>

          <div class="picker-track">
            <div class="picker-track-art">
              ${t?X`<img src=${t} alt="" />`:X`<ha-icon .icon=${Bi(e.type??"track")}></ha-icon>`}
            </div>
            <div class="picker-track-info">
              <div class="picker-track-title">${e.name}</div>
              ${i?X`<div class="picker-track-artist">${i}</div>`:J}
            </div>
          </div>

          <div class="picker-speakers">
            ${this._speakers.map(e=>{const t=this._selectedSpeakers.has(e.entityId);return X`
                <button class="picker-speaker ${t?"selected":""}" @click=${()=>this._toggleSpeakerSelection(e.entityId)}>
                  <div class="picker-speaker-icon">
                    <ha-icon .icon=${e.icon}></ha-icon>
                  </div>
                  <div class="picker-speaker-name">${e.name}</div>
                  <div class="picker-speaker-status ${"playing"===e.state?"playing":""}">
                    ${"playing"===e.state&&e.mediaTitle?e.mediaTitle:"paused"===e.state?Qe("spotify.paused"):Qe("spotify.available")}
                  </div>
                  <div class="picker-speaker-check">
                    <ha-icon .icon=${"mdi:check"}></ha-icon>
                  </div>
                </button>
              `})}
          </div>

          <div class="picker-play-bar">
            <button
              class="picker-play-btn primary"
              ?disabled=${!a}
              @click=${()=>this._playOnSelectedSpeakers()}
              aria-label=${Qe("spotify.play")}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
              ${Qe("spotify.play")}${a?` (${this._selectedSpeakers.size})`:""}
            </button>
          </div>
        </div>
      </div>
    `}}Vi([xe()],Gi.prototype,"_view"),Vi([xe()],Gi.prototype,"_tab"),Vi([xe()],Gi.prototype,"_searchQuery"),Vi([xe()],Gi.prototype,"_playlists"),Vi([xe()],Gi.prototype,"_recentlyPlayed"),Vi([xe()],Gi.prototype,"_savedTracks"),Vi([xe()],Gi.prototype,"_savedShows"),Vi([xe()],Gi.prototype,"_searchResults"),Vi([xe()],Gi.prototype,"_searchLoading"),Vi([xe()],Gi.prototype,"_searchOffset"),Vi([xe()],Gi.prototype,"_searchHasMore"),Vi([xe()],Gi.prototype,"_drilldown"),Vi([xe()],Gi.prototype,"_speakers"),Vi([xe()],Gi.prototype,"_pickerItem"),Vi([xe()],Gi.prototype,"_selectedSpeakers"),Vi([xe()],Gi.prototype,"_error"),Vi([xe()],Gi.prototype,"_libraryLoading"),Vi([xe()],Gi.prototype,"_spotifyConfigured"),Vi([xe()],Gi.prototype,"_foldOpen"),Vi([xe()],Gi.prototype,"_savedMap"),Vi([xe()],Gi.prototype,"_sectionTotals"),Vi([xe()],Gi.prototype,"_loadingMore");try{customElements.define("glass-spotify-card",Gi)}catch{}tt("glass-media-card-editor");var Ki=Object.defineProperty,Xi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ki(t,i,s),s};const Qi=524288;function Yi(e){const t=e.attributes;let i=0;return t.media_position_updated_at&&(i=new Date(t.media_position_updated_at).getTime()/1e3),{entityId:e.entity_id,name:t.friendly_name||e.entity_id,state:e.state,title:t.media_title||"",artist:t.media_artist||"",albumArt:t.entity_picture||"",appName:t.app_name||"",volume:"number"==typeof t.volume_level?t.volume_level:0,isMuted:!!t.is_volume_muted,features:t.supported_features||0,groupMembers:Array.isArray(t.group_members)?t.group_members:[],shuffle:!!t.shuffle,repeat:t.repeat||"off",source:t.source||"",sourceList:Array.isArray(t.source_list)?t.source_list:[],soundMode:t.sound_mode||"",soundModeList:Array.isArray(t.sound_mode_list)?t.sound_mode_list:[],duration:"number"==typeof t.media_duration?t.media_duration:0,elapsed:"number"==typeof t.media_position?t.media_position:0,positionUpdatedAt:i,lastUpdated:e.last_updated?new Date(e.last_updated).getTime():0,icon:t.icon||"mdi:speaker"}}function Ji(e){return"playing"===e||"buffering"===e}function Zi(e){return"playing"===e||"paused"===e||"buffering"===e}function ea(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}function ta(e,t){return 0!==(e.features&t)}const ia={Spotify:"mdi:spotify",AirPlay:"mdi:apple",Bluetooth:"mdi:bluetooth","Line-In":"mdi:audio-input-stereo-minijack",TV:"mdi:television",HDMI:"mdi:hdmi-port"};class aa extends rt{constructor(){super(...arguments),this._foldOpen=!1,this._mediaConfig={extra_entities:{},show_header:!0},this._configLoaded=!1,this._roomIndex=0,this._roomEntityId="",this._prevPlayingSet="",this._swipeClass="",this._foldTab="controls",this._queueData=[],this._radioTracks=[],this._loadVersion=0,this._queueVersion=0,this._lastArtworkUrl="",this._configLoadingInProgress=!1,this._playersCache=null,this._playersCacheKey="",this._volumeThrottles=new Map,this._progressTimer=0,this._swipeAnimating=!1,this._swipeAnimTimer=0,this._queueRefreshTimer=0,this._prevMediaTitle="",this._lastMaster=null,this._lastMasterStaleTimer=0}static getConfigElement(){return document.createElement("glass-media-card-editor")}getCardSize(){return 4}setConfig(e){this._config=e}shouldUpdate(e){return!!super.shouldUpdate(e)&&(!this._swipeAnimating||1!==e.size||!e.has("hass"))}connectedCallback(){super.connectedCallback(),this._listen("media-config-changed",()=>{this._playersCache=null,this._loadConfig()}),this._listen("room-config-changed",()=>{this._playersCache=null}),this._listen("radio-queue-started",()=>{this._radioTracks=[]}),this._listen("radio-queue-track-added",e=>{this._radioTracks=[...this._radioTracks,e.track]}),this._listen("radio-queue-complete",()=>{this._foldOpen&&this._loadQueue()}),this._listen("radio-queue-error",e=>{console.warn("Radio queue error:",e.message)})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._volumeThrottles.clear(),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0),this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=0),this._queueRefreshTimer&&(clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=0),this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=null,++this._queueVersion,this._swipeAnimating=!1,this._swipeClass="",this._prevPlayingSet="",++this._loadVersion,this._configLoadingInProgress=!1,this._lastArtworkUrl="",this._samplingCanvas=void 0,this._samplingCtx=void 0,delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic"),this._unjoinUnsub?.(),this._unjoinUnsub=void 0}updated(e){if(super.updated(e),e.has("areaId")&&(this._foldOpen=!1,this._foldTab="controls",this._queueData=[],this._prevMediaTitle="",this._playersCache=null,this._playersCacheKey="",this._roomIndex=0),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._backend||(this._backend=new dt(this.hass),this._loadConfig());const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._playersCache=null,this._playersCacheKey="")}if(e.has("hass")&&this.isDashboard&&this.hass){const e=Object.entries(this.hass.states).filter(([e,t])=>e.startsWith("media_player.")&&"playing"===t.state).map(([e])=>e).sort().join(",");if(e!==this._prevPlayingSet){const t=new Set(this._prevPlayingSet.split(",").filter(Boolean)),i=e.split(",").filter(Boolean).filter(e=>!t.has(e));if(this._prevPlayingSet=e,i.length>0){const e=this._getActiveRooms(),t=e.findIndex(e=>i.includes(e.entityId)||i.some(t=>e.groupMembers.includes(t)));t>=0&&t!==this._roomIndex&&(this._roomIndex=t,this._roomEntityId=e[t].entityId)}}}if(e.has("_roomIndex")&&this._foldOpen&&"queue"===this._foldTab&&(this._queueData=[],this._prevMediaTitle="",this._loadQueue()),e.has("hass")&&this.hass&&this._foldOpen&&"queue"===this._foldTab){const e=this._getCurrentMaster(),t=e?this.hass.states[e.entityId]?.attributes?.media_title??"":"";t!==this._prevMediaTitle&&(this._prevMediaTitle=t,this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}(e.has("hass")||e.has("_roomIndex"))&&this._syncProgressTimer(),this._updateBgLightAttribute()}_updateBgLightAttribute(){const e=this.shadowRoot?.querySelector("img.dash-art-bg");if(!e)return this._lastArtworkUrl="",delete this.dataset.bgLight,void this.style.removeProperty("--c-accent-dynamic");if(!e.complete||0===e.naturalWidth)return void e.addEventListener("load",()=>this._updateBgLightAttribute(),{once:!0});if(e.src===this._lastArtworkUrl)return;this._lastArtworkUrl=e.src;const t=16;this._samplingCanvas||(this._samplingCanvas=document.createElement("canvas"),this._samplingCanvas.width=t,this._samplingCanvas.height=t,this._samplingCtx=this._samplingCanvas.getContext("2d",{willReadFrequently:!0}));const i=this._samplingCtx;if(i)try{i.clearRect(0,0,t,t),i.drawImage(e,0,0,t,t);const a=i.getImageData(0,0,t,t).data;let r=0;const s=256;for(let e=0;e<a.length;e+=4)r+=.299*a[e]+.587*a[e+1]+.114*a[e+2];r/s/255>.55?this.dataset.bgLight="true":delete this.dataset.bgLight;let o=0,n=0,l=0,c=0;for(let e=0;e<a.length;e+=4){const t=a[e],i=a[e+1],r=a[e+2],s=Math.max(t,i,r)/255,d=Math.min(t,i,r)/255,h=s===d?0:(s+d)/2>.5?(s-d)/(2-s-d):(s-d)/(s+d);h<.15||(o+=t*h,n+=i*h,l+=r*h,c+=h)}if(c>0){const e=`rgb(${Math.round(o/c)}, ${Math.round(n/c)}, ${Math.round(l/c)})`;this.style.setProperty("--c-accent-dynamic",e)}else this.style.removeProperty("--c-accent-dynamic")}catch{delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic")}}_syncProgressTimer(){const e=this.hass?this._getPlayers():[],t=this._findMaster(e),i=null!=t&&Ji(t.state)&&t.duration>0;i&&!this._progressTimer?this._progressTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0)}getTrackedEntityIds(){return this.isDashboard&&this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")):this._getPlayers().map(e=>e.entityId)}get isDashboard(){return!this.areaId}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.media_card&&(this._mediaConfig={extra_entities:t.media_card.extra_entities??{},show_header:t.media_card.show_header??!0}),this._configLoaded=!0,this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}_getPlayers(){if(!this.hass)return[];if(this.isDashboard)return Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")&&Zi(e.state)).map(Yi).sort((e,t)=>{const i=e=>"playing"===e?0:"buffering"===e?1:2,a=i(e.state)-i(t.state);return 0!==a?a:t.lastUpdated-e.lastUpdated});const e=this.areaId??"",t=this._mediaConfig.extra_entities[e]||[],i=`${e}:${JSON.stringify(t)}`;if(this._playersCache&&this._playersCacheKey===i)return this._playersCache.map(e=>{const t=this.hass?.states[e.entityId];return t?Yi(t):e});const a=(this.hass.entities?nt(e,this.hass.entities,this.hass.devices):[]).filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id),r=[...new Set([...a,...t])].map(e=>this.hass?.states[e]).filter(e=>!!e).map(Yi);return this._playersCache=r,this._playersCacheKey=i,r}_findMaster(e){return e.find(e=>Ji(e.state))||e.find(e=>Zi(e.state))||null}_getCurrentMaster(){if(this.isDashboard){const e=this._getActiveRooms();if(!e.length)return this._lastMaster??null;return e[Math.min(this._roomIndex,e.length-1)]}return this._findMaster(this._getPlayers())}_getActiveRooms(){if(!this.hass)return[];const e=Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")&&Zi(e.state)).map(Yi);e.sort((e,t)=>{const i=(e.groupMembers.length>0&&e.groupMembers[0]===e.entityId?0:1)-(t.groupMembers.length>0&&t.groupMembers[0]===t.entityId?0:1);return 0!==i?i:t.lastUpdated-e.lastUpdated});const t=new Set,i=[];for(const a of e)if(!t.has(a.entityId)){for(const e of a.groupMembers)t.add(e);t.add(a.entityId),i.push(a)}return i}_togglePlayPause(e){st(this,"light"),Ji(e.state)?ta(e,1)?this._safeCallService("media_player","media_pause",{},{entity_id:e.entityId}):ta(e,4096)&&this._safeCallService("media_player","media_stop",{},{entity_id:e.entityId}):ta(e,16384)&&this._safeCallService("media_player","media_play",{},{entity_id:e.entityId})}_previous(e){st(this,"light"),this._safeCallService("media_player","media_previous_track",{},{entity_id:e})}_next(e){st(this,"light"),this._safeCallService("media_player","media_next_track",{},{entity_id:e}),this._foldOpen&&"queue"===this._foldTab&&(this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}_toggleMute(e){this._safeCallService("media_player","volume_mute",{is_volume_muted:!e.isMuted},{entity_id:e.entityId})}_setVolume(e,t){const i=Date.now();i-(this._volumeThrottles.get(e)||0)<100||(this._volumeThrottles.set(e,i),this._safeCallService("media_player","volume_set",{volume_level:t},{entity_id:e}))}_toggleShuffle(e){this._safeCallService("media_player","shuffle_set",{shuffle:!e.shuffle},{entity_id:e.entityId})}_cycleRepeat(e){const t="off"===e.repeat?"all":"all"===e.repeat?"one":"off";this._safeCallService("media_player","repeat_set",{repeat:t},{entity_id:e.entityId})}_selectSource(e,t){this._safeCallService("media_player","select_source",{source:t},{entity_id:e})}_selectSoundMode(e,t){this._safeCallService("media_player","select_sound_mode",{sound_mode:t},{entity_id:e})}_seekProgress(e,t,i){const a=i/100*t;this._safeCallService("media_player","media_seek",{seek_position:a},{entity_id:e})}_joinGroup(e,t){this._safeCallService("media_player","join",{group_members:[t]},{entity_id:e})}_unjoinGroup(e){this._safeCallService("media_player","unjoin",{},{entity_id:e})}async _waitForUnjoin(e,t=3e3){this._unjoinUnsub?.(),this._unjoinUnsub=void 0;const i=++this._loadVersion;return new Promise(a=>{let r=!1;const s=()=>{r||(r=!0,this._unjoinUnsub?.(),this._unjoinUnsub=void 0,clearTimeout(o))};if(!this.hass)return void a(!1);this.hass.connection.subscribeEvents(t=>{if(i===this._loadVersion){if(t.data.entity_id===e){const e=t.data.new_state?.attributes?.group_members;(!e||e.length<=1)&&(s(),a(!0))}}else s()},"state_changed").then(e=>{r?e():this._unjoinUnsub=e});const o=setTimeout(()=>{s(),a(!1)},t)})}async _smartJoin(e,t){if(!this.hass)return;const i=this.hass.states[t];if(!i)return;const a=i.attributes.group_members;a&&a.length>1&&(this._unjoinGroup(t),await this._waitForUnjoin(t),!this.isConnected||!this.hass)||this._joinGroup(e,t)}_swipeToRoom(e,t){this._swipeAnimating||(this._swipeAnimating=!0,this._foldOpen=!1,this._swipeClass="left"===e?"swipe-exit-left":"swipe-exit-right",this._swipeAnimTimer=window.setTimeout(()=>{this._roomIndex=t,this._roomEntityId="",this._swipeClass="left"===e?"swipe-enter-right":"swipe-enter-left",this._swipeAnimTimer=window.setTimeout(()=>{this._swipeClass="",this._swipeAnimating=!1},280)},220))}_onProgressPointerDown(e,t,i){e.stopPropagation();const a=e.currentTarget;a.setPointerCapture(e.pointerId);const r=a.querySelector(".dash-progress-fill"),s=a.querySelector(".dash-progress-thumb"),o=e=>{const t=a.getBoundingClientRect(),i=Math.max(0,Math.min(100,(e.clientX-t.left)/t.width*100));r.style.width=i+"%",r.style.transition="none",s.style.left=i+"%",s.style.opacity="1"};o(e);const n=e=>o(e),l=()=>{a.removeEventListener("pointermove",n),a.removeEventListener("pointerup",c),a.removeEventListener("pointercancel",l),a.removeEventListener("lostpointercapture",l),r.style.transition="",s.style.opacity=""},c=e=>{l();const r=a.getBoundingClientRect(),s=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));this._seekProgress(t,i,s)};a.addEventListener("pointermove",n),a.addEventListener("pointerup",c),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l)}_onMrVolPointerDown(e,t){e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const a=i.querySelector(".mr-vol-fill"),r=i.querySelector(".mr-vol-val"),s=e=>{const s=i.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100));a.style.width=o+"%",r&&(r.textContent=Math.round(o)+"%"),this._setVolume(t,o/100)};s(e);const o=e=>s(e),n=()=>{st(this,"light"),i.removeEventListener("pointermove",o),i.removeEventListener("pointerup",n),i.removeEventListener("pointercancel",n),i.removeEventListener("lostpointercapture",n)};i.addEventListener("pointermove",o),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("lostpointercapture",n)}_getElapsed(e){if(!Ji(e.state)||0===e.positionUpdatedAt)return e.elapsed;const t=Date.now()/1e3-e.positionUpdatedAt;return Math.min(e.elapsed+t,e.duration)}_getProgress(e){return e.duration<=0?0:Math.min(100,this._getElapsed(e)/e.duration*100)}_renderHero(e,t=1){const i=Ji(e.state),a=this._getProgress(e),r=this._getElapsed(e),s=this._getGroupablePlayers(),o=this._findGroupCoordinator(e,s),n=(o?.groupMembers||[]).length,l=this._bindGesture({onLongPress:()=>{this._foldOpen=!this._foldOpen,this._foldOpen&&this._loadQueue(),this._foldOpen&&setTimeout(()=>{const e=this.renderRoot?.querySelector(".ctrl-fold");e?.scrollIntoView({behavior:"smooth",block:"nearest"})},350)},onSwipe:e=>{this.isDashboard&&t>1&&("left"===e?this._swipeToRoom("left",(this._roomIndex+1)%t):this._swipeToRoom("right",(this._roomIndex-1+t)%t))},exclude:"button"});return X`
      <div class="dash-wrap ${this._foldOpen?"fold-open":""}">
        <div class="dash-hero ${this._swipeClass}"
          @pointerdown=${l.pointerdown}
          @pointerup=${l.pointerup}
          @pointermove=${l.pointermove}
          @pointercancel=${l.pointercancel}
          @contextmenu=${l.contextmenu}
        >
          <!-- Full-bleed artwork background -->
          ${e.albumArt?X`
            <img class="dash-art-bg" src=${e.albumArt} alt="" loading="lazy" />
          `:J}
          <div class="dash-gradient"></div>
          ${e.albumArt?J:X`
            <div class="dash-deco"></div>
            <div class="dash-placeholder">
              <ha-icon .icon=${e.source?.toLowerCase().includes("tv")||e.icon?.includes("tv")||e.icon?.includes("television")?"mdi:television-classic":e.appName?.toLowerCase().includes("spotify")?"mdi:spotify":"playing"===e.state||"paused"===e.state?"mdi:music-note":e.icon||"mdi:speaker"}></ha-icon>
            </div>
          `}

          <div class="dash-content">
            <!-- Top bar: speaker badge + group badge (glass pills) -->
            <div class="dash-top">
              <div class="dash-speaker glass-pill">
                <ha-icon .icon=${e.icon||"mdi:speaker"}></ha-icon>
                <span>${Ae(e.name,Ee)}</span>
                ${i?X`
                  <div class="dash-eq playing">
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                  </div>
                `:J}
              </div>
              ${n>1?X`
                <div class="dash-group-badge glass-pill">
                  <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                  <span>${Qe("media.speakers_count",{count:n})}</span>
                </div>
              `:J}
            </div>

            <!-- Spacer -->
            <div class="dash-spacer"></div>

            <!-- Bottom glass panel: track info + progress + transport -->
            <div class="dash-info-panel glass-panel">
              <div class="dash-track">
                ${e.title?X`
                  <div class="dash-track-title">${Ae(e.title,22)}</div>
                `:J}
                ${e.artist?X`
                  <div class="dash-track-artist">${Ae(e.artist,28)}</div>
                `:J}
              </div>

              <!-- Progress bar -->
              ${e.duration>0&&ta(e,2)?X`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${ea(r)}</span>
                    <span class="dash-track-time">${ea(e.duration)}</span>
                  </div>
                  <div class="dash-progress"
                    aria-label=${Qe("media.seek_aria")}
                    @pointerdown=${t=>this._onProgressPointerDown(t,e.entityId,e.duration)}
                  >
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                    <div class="dash-progress-thumb" style="left:${a}%"></div>
                  </div>
                </div>
              `:e.duration>0?X`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${ea(r)}</span>
                    <span class="dash-track-time">${ea(e.duration)}</span>
                  </div>
                  <div class="dash-progress" style="pointer-events:none">
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                  </div>
                </div>
              `:J}

              <!-- Transport -->
              <div class="dash-transport">
                ${ta(e,32768)?X`
                  <button class="transport-btn ${e.shuffle?"active":""}"
                    aria-label=${Qe("media.shuffle_aria")}
                    @click=${t=>{t.stopPropagation(),this._toggleShuffle(e)}}>
                    <ha-icon .icon=${"mdi:shuffle-variant"}></ha-icon>
                  </button>
                `:J}

                ${ta(e,16)?X`
                  <button class="transport-btn transport-skip"
                    aria-label=${Qe("media.prev_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._previous(e.entityId)}}>
                    <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
                  </button>
                `:J}

                <button class="transport-btn transport-main"
                  aria-label=${Qe(i?"media.pause_aria":"media.play_aria",{name:e.name})}
                  @click=${t=>{t.stopPropagation(),this._togglePlayPause(e)}}>
                  <ha-icon .icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
                </button>

                ${ta(e,32)?X`
                  <button class="transport-btn transport-skip"
                    aria-label=${Qe("media.next_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._next(e.entityId)}}>
                    <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
                  </button>
                `:J}

                ${ta(e,262144)?X`
                  <button class="transport-btn ${"off"!==e.repeat?"active":""}"
                    aria-label=${Qe("media.repeat_aria")}
                    @click=${t=>{t.stopPropagation(),this._cycleRepeat(e)}}>
                    <ha-icon .icon=${"one"===e.repeat?"mdi:repeat-once":"mdi:repeat"}></ha-icon>
                  </button>
                `:J}
              </div>

              <div class="dash-source-row">
                ${o&&o.entityId!==e.entityId?X`
                  <span class="dash-coordinator-badge">
                    <ha-icon .icon=${o.icon||"mdi:speaker"}></ha-icon>
                    ${o.name}
                  </span>
                `:J}
                ${e.source?X`
                  <span class="dash-track-source">${e.source}</span>
                `:J}
              </div>
            </div>
          </div>

          <!-- Navigation arrows (desktop hover, multi-room) -->
          ${this.isDashboard&&t>1?X`
            <button class="dash-nav-arrow dash-nav-left" aria-label=${Qe("media.prev_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("right",(this._roomIndex-1+t)%t)}}>
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <button class="dash-nav-arrow dash-nav-right" aria-label=${Qe("media.next_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("left",(this._roomIndex+1)%t)}}>
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          `:J}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="dash-fold-sep-top"></div>
            <div class="dash-fold-panel">
              ${this._foldOpen?this._renderFoldContent(e,o,s):J}
            </div>
          </div>
        </div>
      </div>
    `}_renderFoldContent(e,t,i){const a="queue"===this._foldTab;return X`
      <div class="segmented">
        <button class="seg-btn ${a?"":"active"}"
                @click=${()=>{this._foldTab="controls"}}>
          ${Qe("media.controls_tab")}
        </button>
        <button class="seg-btn ${a?"active":""}"
                @click=${()=>{this._foldTab="queue",this._loadQueue()}}>
          ${Qe("media.queue_tab")}
        </button>
      </div>
      ${a?this._renderQueueTab():this._renderControlsTab(e,t,i)}
    `}_renderControlsTab(e,t,i){return X`
      <!-- Volume -->
      ${ta(e,4)?X`
        <div class="ctrl-label">${Qe("media.volume_label")}</div>
        <div class="volume-row">
          ${ta(e,8)?X`
            <button class="volume-btn ${e.isMuted?"muted":""}"
              aria-label=${e.isMuted?Qe("media.unmute_aria",{name:e.name}):Qe("media.mute_aria",{name:e.name})}
              @click=${t=>{t.stopPropagation(),this._toggleMute(e)}}>
              <ha-icon .icon=${e.isMuted?"mdi:volume-off":e.volume>.5?"mdi:volume-high":"mdi:volume-medium"}></ha-icon>
            </button>
          `:J}
          <glass-slider
            .value=${Math.round(100*(e.isMuted?0:e.volume))}
            color="var(--rgb-white)"
            .label=${`${Math.round(100*(e.isMuted?0:e.volume))}%`}
            @glass-slider-input=${t=>this._setVolume(e.entityId,t.detail.value/100)}
            @glass-slider-change=${t=>this._setVolume(e.entityId,t.detail.value/100)}
          ></glass-slider>
        </div>
      `:J}

      <!-- Source chips -->
      ${ta(e,2048)&&e.sourceList.length>0?X`
        <div class="dash-fold-sep"></div>
        <div class="ctrl-label">${Qe("media.source_label")}</div>
        <div class="chips-row">
          ${e.sourceList.map(t=>X`
            <button class="chip ${e.source===t?"active":""}"
              @click=${i=>{i.stopPropagation(),this._selectSource(e.entityId,t)}}>
              <ha-icon .icon=${ia[t]||"mdi:import"}></ha-icon>
              <span>${t}</span>
            </button>
          `)}
        </div>
      `:J}

      <!-- Sound mode chips -->
      ${ta(e,65536)&&e.soundModeList.length>0?X`
        <div class="dash-fold-sep"></div>
        <div class="ctrl-label">${Qe("media.sound_mode_label")}</div>
        <div class="chips-row">
          ${e.soundModeList.map(t=>X`
            <button class="chip ${e.soundMode===t?"active":""}"
              @click=${i=>{i.stopPropagation(),this._selectSoundMode(e.entityId,t)}}>
              <ha-icon .icon=${"mdi:equalizer"}></ha-icon>
              <span>${t}</span>
            </button>
          `)}
        </div>
      `:J}

      <!-- Multiroom grid (show if any groupable speakers exist) -->
      ${i.length>1?this._renderMultiroomGrid(t,i):J}
    `}async _loadQueue(){if(!this.hass)return;const e=++this._queueVersion,t=this._getCurrentMaster();if(t)try{const i=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"sonos",service:"get_queue",target:{entity_id:t.entityId},return_response:!0});if(e!==this._queueVersion)return;const a=i?.response?.[t.entityId]??[];this._queueData=a.map(e=>({name:e.media_title??"",artist:e.media_artist??"",album_name:e.media_album_name??"",content_id:e.media_content_id??""}))}catch(i){if(e!==this._queueVersion)return;console.warn("[glass] queue load error:",i)}}_renderQueueTab(){const e=this._getCurrentMaster(),t=e?this.hass?.states[e.entityId]?.attributes?.queue_position??0:0,i=this._queueData.slice(t);return i.length?X`
      <div class="queue-list">
        ${i.map((e,i)=>{const a=e.name??"",r=e.artist??"",s=e.content_id??"",o=!!s&&this._radioTracks.some(e=>e.uri===s),n=t+i;return X`
            <div class="queue-item">
              <div class="queue-num">${i+1}</div>
              <div class="queue-info">
                <span class="queue-title">${Ae(a,Ee)}</span>
                <span class="queue-artist">${r}</span>
              </div>
              ${o?X`<span class="queue-badge">${Qe("media.radio_badge")}</span>`:J}
              <button class="btn-icon xs queue-remove" aria-label="${Qe("media.remove_from_queue")}"
                      @click=${e=>{e.stopPropagation(),this._removeFromQueue(n)}}>
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          `})}
      </div>
    `:X`<div class="queue-empty">${Qe("media.queue_empty")}</div>`}async _removeFromQueue(e){if(this.configPreview)return;const t=this._getCurrentMaster();if(t&&this.hass){this._queueData=this._queueData.filter((t,i)=>i!==e);try{await this.hass.callService("sonos","remove_from_queue",{queue_position:e},{entity_id:t.entityId})}catch{this._loadQueue()}}}_getGroupablePlayers(){return this.hass?Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")).map(Yi).filter(e=>ta(e,Qi)):[]}_findGroupCoordinator(e,t){if(ta(e,Qi))return e;const i=t.find(t=>Ji(t.state)&&t.title&&t.title===e.title);return i||null}_renderMultiroomGrid(e,t){if(!this.hass||!e)return X``;const i=e.entityId,a=new Set(e.groupMembers),r=t.filter(e=>e.entityId!==i);return 0===r.length?X``:X`
      <div class="dash-fold-sep"></div>
      <div class="ctrl-label">${Qe("media.speakers_label")}</div>
      <div class="multiroom-grid">
        ${r.map(e=>{const t=a.has(e.entityId);return X`
            <div class="mr-cell ${t?"joined":""}">
              <div class="mr-cell-top">
                <button class="mr-icon-btn"
                  aria-label=${Qe(t?"media.remove_group_aria":"media.add_group_aria",{name:e.name})}
                  @click=${a=>{a.stopPropagation(),t?this._unjoinGroup(e.entityId):this._smartJoin(i,e.entityId)}}>
                  <ha-icon .icon=${e.icon||"mdi:speaker"}></ha-icon>
                </button>
                <div class="mr-info">
                  <div class="mr-name">${e.name}</div>
                </div>
              </div>
              ${t?X`
                <div class="mr-vol-slider"
                  @pointerdown=${t=>this._onMrVolPointerDown(t,e.entityId)}>
                  <div class="mr-vol-fill" style="width:${Math.round(100*e.volume)}%"></div>
                  <div class="mr-vol-icon"><ha-icon .icon=${"mdi:volume-medium"}></ha-icon></div>
                  <span class="mr-vol-val">${Math.round(100*e.volume)}%</span>
                </div>
              `:J}
            </div>
          `})}
      </div>
    `}_collapseExpanded(){this._foldOpen&&(this._foldOpen=!1,this._foldTab="controls")}render(){if(this._lang,!this.hass)return J;if(!this._configLoaded)return J;const e=this._mediaConfig.show_header;if(this.isDashboard){const t=this._getActiveRooms();if(0===t.length)return this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),X`
          ${e?X`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${Qe("media.title")}</span>
              </div>
            </div>
          `:J}
          ${this._renderHero(this._lastMaster)}
        `):J;if(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._roomEntityId){const e=t.findIndex(e=>e.entityId===this._roomEntityId);e>=0?this._roomIndex=e:this._roomIndex>=t.length&&(this._roomIndex=0)}this._roomIndex>=t.length&&(this._roomIndex=0);const i=t[this._roomIndex];return this._roomEntityId=i.entityId,this._lastMaster=i,X`
        ${e?X`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${Qe("media.title")}</span>
            </div>
            ${i.source?X`
              <span class="card-source active">${i.source}</span>
            `:J}
          </div>
        `:J}
        ${this._renderHero(i,t.length)}
        ${t.length>1?X`
          <div class="dash-dots">
            ${t.map((e,t)=>X`
              <button class="dash-dot ${t===this._roomIndex?"active":""}"
                aria-label=${Qe("media.room_dot_aria",{index:t+1})}
                aria-current=${t===this._roomIndex?"true":"false"}
                @click=${e=>{e.stopPropagation(),t!==this._roomIndex&&this._swipeToRoom(t>this._roomIndex?"left":"right",t)}}>
              </button>
            `)}
          </div>
        `:J}
      `}const t=this._getPlayers(),i=this._findMaster(t);return i&&Zi(i.state)?(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=i,X`
      ${e?X`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${Qe("media.title")}</span>
          </div>
          ${i.source?X`
            <span class="card-source active">${i.source}</span>
          `:J}
        </div>
      `:J}
      ${this._renderHero(i)}
    `):this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),X`
        ${e?X`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${Qe("media.title")}</span>
            </div>
          </div>
        `:J}
        ${this._renderHero(this._lastMaster)}
      `):J}static{this.styles=[Se,Ie,Te,ze,Pe,Le,h`
      :host {
        width: 100%;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;
        /* media player tokens */
        --mp-color: #818cf8;
        --mp-bg: rgba(var(--rgb-accent),0.1);
        --mp-border: rgba(var(--rgb-accent),0.15);
        --mp-glow: rgba(var(--rgb-accent),0.4);
        --mp-sub: rgba(var(--rgb-accent),0.55);
      }

      /* ── Header ── */
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
      }
      .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }
      .card-source {
        font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: 50%;
        opacity: 0; transition: opacity var(--t-fast);
      }
      .card-source.active { opacity: 1; color: rgba(var(--rgb-white),0.6); }

      /* ── Swipe slide animation ── */
      @keyframes swipe-exit-l {
        0%   { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
        100% { transform: translateX(-40%) scale(0.92); opacity: 0; filter: blur(6px); }
      }
      @keyframes swipe-enter-r {
        0%   { transform: translateX(40%) scale(0.92); opacity: 0; filter: blur(6px); }
        100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
      }
      @keyframes swipe-exit-r {
        0%   { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
        100% { transform: translateX(40%) scale(0.92); opacity: 0; filter: blur(6px); }
      }
      @keyframes swipe-enter-l {
        0%   { transform: translateX(-40%) scale(0.92); opacity: 0; filter: blur(6px); }
        100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
      }
      .swipe-exit-left  { animation: swipe-exit-l 220ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none; will-change: transform, opacity; }
      .swipe-enter-right { animation: swipe-enter-r 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; will-change: transform, opacity; }
      .swipe-exit-right  { animation: swipe-exit-r 220ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none; will-change: transform, opacity; }
      .swipe-enter-left  { animation: swipe-enter-l 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; will-change: transform, opacity; }

      /* ── Dash wrap ── */
      .dash-wrap {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; gap: 0;
      }

      /* ── Hero card ── */
      .dash-hero {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        background: #111;
        border: 1px solid var(--b2);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 1px 0 rgba(var(--rgb-white),0.04),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
        touch-action: pan-y;
        user-select: none; -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: border-radius var(--t-layout), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) { .dash-hero:hover { border-color: var(--b3); } }

      /* Connected fold: hero loses bottom radius when fold is open */
      .dash-wrap.fold-open .dash-hero {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-color: transparent;
      }

      /* ── Full-bleed artwork background ── */
      .dash-art-bg {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; pointer-events: none; z-index: 0;
        transition: opacity 0.8s;
      }

      /* ── Gradient overlay — minimal vignette to preserve artwork visibility ── */
      .dash-gradient {
        position: absolute; inset: 0; pointer-events: none; z-index: 1;
        background: linear-gradient(
          to bottom,
          rgba(var(--rgb-black),0.08) 0%,
          rgba(var(--rgb-black),0) 25%,
          rgba(var(--rgb-black),0) 50%,
          rgba(var(--rgb-black),0.15) 75%,
          rgba(var(--rgb-black),0.4) 100%
        );
      }

      /* ── Decorative shapes (no-artwork fallback) ── */
      .dash-deco {
        position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
        background: linear-gradient(135deg, rgba(30,30,50,1) 0%, rgba(15,15,30,1) 50%, rgba(25,20,40,1) 100%);
      }
      .dash-deco::before {
        content: ''; position: absolute;
        width: 17.5rem; height: 17.5rem; border-radius: 50%;
        top: -5rem; right: -3.75rem;
        background: radial-gradient(circle, rgba(var(--rgb-white),0.05), transparent 70%);
      }
      .dash-deco::after {
        content: ''; position: absolute;
        width: 13.75rem; height: 13.75rem; border-radius: 50%;
        bottom: -3.125rem; left: -2.5rem;
        background: radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%);
      }
      .dash-placeholder {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .dash-placeholder ha-icon {
        --mdc-icon-size: 5rem;
        color: rgba(var(--rgb-white),0.06);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Content ── */
      .dash-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        min-height: 21.25rem;
        padding: 0.875rem;
      }

      /* ── Glass pill (shared for top badges) ── */
      .glass-pill {
        backdrop-filter: var(--blur-md);
        -webkit-backdrop-filter: var(--blur-md);
        background: rgba(var(--rgb-black),0.22);
        border: 1px solid rgba(var(--rgb-white),0.12);
        box-shadow: 0 2px 8px rgba(var(--rgb-black),0.2);
      }

      /* ── Glass panel (bottom info card) — frosted glass, artwork bleeds through ── */
      .glass-panel {
        border-radius: var(--radius-lg);
        backdrop-filter: blur(10px) saturate(1.4);
        -webkit-backdrop-filter: blur(10px) saturate(1.4);
        background: rgba(var(--rgb-black),0.25);
        border: 1px solid rgba(var(--rgb-white),0.12);
        box-shadow:
          0 4px 16px rgba(var(--rgb-black),0.12),
          inset 0 1px 0 rgba(var(--rgb-white),0.08);
      }

      /* ── Top bar ── */
      .dash-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .dash-speaker {
        display: inline-flex; align-items: center; gap: 0.375rem;
        padding: 0.25rem 0.625rem 0.25rem 0.375rem;
        border-radius: var(--radius-full, 9999px);
        font-size: var(--fz-sm); font-weight: 600; color: rgba(var(--rgb-white),0.9);
        overflow: hidden; white-space: nowrap;
      }
      .dash-speaker ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.8125rem;
      }
      .dash-group-badge {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding: 0.125rem 0.5rem; border-radius: var(--radius-xl);
        color: rgba(var(--rgb-white),0.9);
        font-size: var(--fz-sm); font-weight: 600;
      }
      .dash-group-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.75rem;
      }

      /* ── Equalizer bars ── */
      .dash-eq {
        display: flex; align-items: flex-end; gap: 0.125rem;
        height: 0.875rem; margin-left: 0.375rem;
      }
      .dash-eq-bar {
        width: 0.1875rem; border-radius: 1.5px;
        background: #fff;
        box-shadow: 0 0 3px rgba(var(--rgb-white),0.6);
      }
      .dash-eq.playing .dash-eq-bar:nth-child(1) {
        height: 40%; animation: eq-lo 0.65s ease-in-out infinite alternate;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(2) {
        height: 80%; animation: eq-hi 0.52s ease-in-out infinite alternate;
        animation-delay: 0.12s;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(3) {
        height: 55%; animation: eq-mid 0.78s ease-in-out infinite alternate;
        animation-delay: 0.25s;
      }
      .dash-eq.playing .dash-eq-bar:nth-child(4) {
        height: 70%; animation: eq-lo 0.6s ease-in-out infinite alternate;
        animation-delay: 0.08s;
      }
      @keyframes eq-lo  { 0% { height: 15%; } 100% { height: 70%; } }
      @keyframes eq-mid { 0% { height: 20%; } 100% { height: 90%; } }
      @keyframes eq-hi  { 0% { height: 25%; } 100% { height: 100%; } }

      /* ── Spacer ── */
      .dash-spacer { flex: 1; }

      /* ── Bottom info panel ── */
      .dash-info-panel {
        position: relative; z-index: 10;
        display: flex; flex-direction: column; gap: 0.5rem;
        padding: 0.75rem 0.875rem;
      }

      /* ── Track info ── */
      .dash-track {
        display: flex; flex-direction: column; gap: 0.125rem;
        min-width: 0;
      }
      .dash-track-title {
        font-size: var(--fz-lg); font-weight: 700; color: #fff; line-height: 1.2;
        overflow: hidden; white-space: nowrap;
        text-shadow: 0 1px 4px rgba(var(--rgb-black),0.5), 0 0 12px rgba(var(--rgb-black),0.3);
      }
      .dash-track-artist {
        font-size: var(--fz-base); font-weight: 500; color: rgba(var(--rgb-white),0.75);
        overflow: hidden; white-space: nowrap;
        text-shadow: 0 1px 3px rgba(var(--rgb-black),0.5);
      }

      /* ── Time row ── */
      .dash-time-row {
        display: flex; justify-content: space-between; align-items: center;
      }
      .dash-track-time {
        font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-white),0.4);
        font-variant-numeric: tabular-nums;
        text-shadow: 0 1px 2px rgba(var(--rgb-black),0.4);
      }
      .dash-track-source {
        font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.5px; color: rgba(var(--rgb-white),0.3);
        padding: 0.0625rem 0.375rem; border-radius: 4px;
        background: rgba(var(--rgb-white),0.06);
      }
      .dash-source-row {
        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        margin-top: -0.125rem;
      }
      .dash-coordinator-badge {
        display: inline-flex; align-items: center; gap: 0.25rem;
        font-size: var(--fz-xs); font-weight: 600; color: rgba(var(--rgb-white),0.5);
      }
      .dash-coordinator-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.6875rem;
      }

      /* ── Progress bar ── */
      .dash-progress-wrap {
        margin-top: 0;
      }
      .dash-progress {
        position: relative; width: 100%; height: 0.25rem;
        border-radius: 2px; background: var(--s2);
        cursor: pointer; touch-action: none;
        transition: height var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-progress:hover { height: 0.375rem; }
        .dash-progress:hover .dash-progress-thumb { opacity: 1; }
      }
      .dash-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit;
        background: rgba(var(--rgb-white),0.85);
        box-shadow: 0 0 8px rgba(var(--rgb-white),0.3);
        transition: width 0.3s linear;
        pointer-events: none;
      }
      .dash-progress-thumb {
        position: absolute; top: 50%; transform: translate(-50%, -50%);
        width: 0.625rem; height: 0.625rem; border-radius: 50%;
        background: #fff; box-shadow: 0 0 6px rgba(var(--rgb-black),0.3);
        pointer-events: none; opacity: 0; transition: opacity var(--t-fast);
      }

      /* ── Transport ── */
      .dash-transport {
        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        margin-top: 0.125rem;
      }
      .transport-btn {
        width: 2.25rem; height: 2.25rem; border-radius: var(--radius-md);
        background: transparent; border: 1px solid transparent;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background var(--t-fast), color var(--t-fast), transform var(--t-fast); outline: none; padding: 0;
        -webkit-tap-highlight-color: transparent;
        color: rgba(var(--rgb-white),0.85);
      }
      .transport-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-md);
      }
      @media (hover: hover) and (pointer: fine) {
        .transport-btn:hover { background: rgba(var(--rgb-white),0.08); color: #fff; }
      }
      .transport-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .transport-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .transport-btn:active { transform: scale(0.96); } }
      .transport-btn.active {
        color: #fff;
        background: rgba(var(--rgb-white),0.12);
        border-color: rgba(var(--rgb-white),0.25);
      }

      .transport-skip { width: 2.5rem; height: 2.5rem; }
      .transport-skip ha-icon { --mdc-icon-size: 1.625rem; }
      .transport-skip { color: rgba(var(--rgb-white),0.85); }

      .transport-main {
        width: 3.25rem; height: 3.25rem; border-radius: var(--radius-lg);
        background: rgba(var(--rgb-white),0.12); border: 1px solid rgba(var(--rgb-white),0.15);
        color: #fff;
      }
      .transport-main ha-icon { --mdc-icon-size: 1.75rem; }
      @media (hover: hover) and (pointer: fine) {
        .transport-main:hover {
          background: rgba(var(--rgb-white),0.2); border-color: rgba(var(--rgb-white),0.25);
        }
        .transport-main:active { transform: scale(0.96); }
      }
      @media (pointer: coarse) { .transport-main:active { animation: bounce 0.3s ease; } }

      /* ── Idle state ── */
      .dash-idle {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        flex: 1; gap: 0.5rem; padding: 1.25rem;
      }
      .dash-idle ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 2rem; color: var(--t4);
      }
      .dash-idle span { font-size: var(--fz-base); color: var(--t3); font-weight: 500; }

      /* ── Navigation arrows (hover on sides) ── */
      .dash-nav-arrow {
        position: absolute; top: 0; bottom: 0; width: 2.5rem; z-index: 8;
        display: flex; align-items: center; justify-content: center;
        background: none; border: none; cursor: pointer; padding: 0;
        opacity: 0; transition: opacity var(--t-fast);
        -webkit-tap-highlight-color: transparent; outline: none;
      }
      .dash-nav-arrow ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-xl); color: rgba(var(--rgb-white),0.7);
        filter: drop-shadow(0 1px 4px rgba(var(--rgb-black),0.5));
        transition: color var(--t-fast);
      }
      .dash-nav-left { left: 0; border-radius: var(--radius-xl) 0 0 var(--radius-xl); }
      .dash-nav-right { right: 0; border-radius: 0 var(--radius-xl) var(--radius-xl) 0; }
      @media (hover: hover) and (pointer: fine) {
        .dash-nav-left:hover, .dash-nav-right:hover {
          background: linear-gradient(90deg, rgba(var(--rgb-black),0.25), transparent);
        }
        .dash-nav-right:hover {
          background: linear-gradient(270deg, rgba(var(--rgb-black),0.25), transparent);
        }
        .dash-nav-arrow:hover ha-icon { color: #fff; }
        .dash-hero:hover .dash-nav-arrow { opacity: 1; }
      }
      @media (pointer: coarse) { .dash-nav-arrow:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .dash-nav-arrow:active { transform: scale(0.95); } }
      .dash-nav-arrow:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

      /* ── Room dots (dashboard swipe indicator) ── */
      .dash-dots {
        display: flex; justify-content: center; gap: 0.375rem;
        padding: 0.5rem 0 0.125rem;
      }
      .dash-dot {
        width: 0.375rem; height: 0.375rem; border-radius: 50%;
        background: rgba(var(--rgb-white),0.2); border: none;
        padding: 0; cursor: pointer; transition: background var(--t-fast), transform var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .dash-dot.active {
        background: rgba(var(--rgb-white),0.7);
        transform: scale(1.3);
      }
      @media (hover: hover) and (pointer: fine) { .dash-dot:hover { background: rgba(var(--rgb-white),0.5); } }
      @media (pointer: coarse) { .dash-dot:active { animation: bounce 0.3s ease; } }
      .dash-dot:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.5); outline-offset: 2px; }

      /* ══════════════════════════════════════════
         Connected Fold
         ══════════════════════════════════════════ */
      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ctrl-fold.open { grid-template-rows: 1fr; }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0; transition: opacity 0.25s;
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.03), rgba(var(--rgb-white),0.01));
        backdrop-filter: var(--blur-lg);
        -webkit-backdrop-filter: var(--blur-lg);
        border: 1px solid var(--b2);
        border-top: none;
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
      }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .ctrl-label {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; color: rgba(var(--rgb-white),0.5); margin-bottom: -0.25rem;
      }

      .dash-fold-sep-top {
        height: 0.0625rem; margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-white),0.12), transparent);
      }
      .dash-fold-panel {
        display: flex; flex-direction: column; gap: 0.625rem;
        padding: 0.75rem 1rem 0.875rem;
      }
      .dash-fold-sep {
        height: 0.0625rem; margin: 0.125rem 0;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-white),0.12), transparent);
      }

      /* ── Volume row ── */
      .volume-row { display: flex; align-items: center; gap: 0.5rem; }
      .volume-btn {
        width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm);
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: color var(--t-fast), transform var(--t-fast); outline: none; padding: 0;
        -webkit-tap-highlight-color: transparent; flex-shrink: 0;
        color: rgba(var(--rgb-white),0.85);
      }
      .volume-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-md);
      }
      @media (hover: hover) and (pointer: fine) { .volume-btn:hover { color: #fff; } }
      .volume-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .volume-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .volume-btn:active { transform: scale(0.96); } }
      .volume-btn.muted { color: var(--c-alert); }

      /* ── Volume slider ── */
      glass-slider { flex: 1; }

      /* ── Chips ── */
      .chips-row { display: flex; gap: 0.375rem; flex-wrap: wrap; }
      .chip {
        display: inline-flex; align-items: center; gap: 0.3125rem;
        padding: 0.3125rem 0.625rem; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.8px;
        color: rgba(var(--rgb-white),0.7); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .chip ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-sm);
      }
      @media (hover: hover) and (pointer: fine) {
        .chip:hover { background: var(--s3); color: #fff; border-color: var(--b3); }
      }
      .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .chip:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .chip:active { transform: scale(0.96); } }
      .chip.active {
        border-color: rgba(var(--rgb-white),0.25); background: rgba(var(--rgb-white),0.1);
        color: #fff;
      }

      /* ── Multiroom grid ── */
      .multiroom-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 0.375rem;
      }
      :host([size="xs"]) .multiroom-grid,
      :host([size="sm"]) .multiroom-grid {
        grid-template-columns: 1fr;
      }
      .mr-cell {
        display: flex; flex-direction: column; gap: 0.25rem;
        padding: 0.375rem; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .mr-cell.joined {
        background: rgba(var(--rgb-white),0.04); border-color: rgba(var(--rgb-white),0.15);
      }
      .mr-cell-top {
        display: flex; align-items: center; gap: 0.375rem;
      }
      .mr-icon-btn {
        width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm);
        background: var(--s2); border: 1px solid var(--b1);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        cursor: pointer; padding: 0; outline: none;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast), transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        color: rgba(var(--rgb-white),0.6);
      }
      .mr-icon-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-sm);
      }
      @media (hover: hover) and (pointer: fine) {
        .mr-icon-btn:hover { background: var(--s3); border-color: var(--b2); color: #fff; }
      }
      @media (pointer: coarse) { .mr-icon-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .mr-icon-btn:active { transform: scale(0.96); } }
      .mr-icon-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
      .mr-cell.joined .mr-icon-btn {
        background: rgba(var(--rgb-white),0.08); border-color: rgba(var(--rgb-white),0.15); color: #fff;
      }

      .mr-info { flex: 1; min-width: 0; }
      .mr-name {
        font-size: var(--fz-sm); font-weight: 600; color: rgba(var(--rgb-white),0.7);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .mr-cell.joined .mr-name { color: #fff; }
      .mr-coordinator {
        font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
        color: rgba(var(--rgb-white),0.5);
      }

      /* Multiroom volume slider */
      .mr-vol-slider {
        position: relative; width: 100%; height: 1.25rem;
        border-radius: var(--radius-xs); background: var(--s2);
        border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
        touch-action: none; user-select: none; -webkit-user-select: none;
      }
      .mr-vol-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit; pointer-events: none;
        background: linear-gradient(90deg, rgba(var(--rgb-white),0.06), rgba(var(--rgb-white),0.12));
        transition: width var(--t-fast);
      }
      .mr-cell.joined .mr-vol-fill {
        background: linear-gradient(90deg, rgba(var(--rgb-white),0.1), rgba(var(--rgb-white),0.2));
      }
      .mr-vol-val {
        position: absolute; top: 50%; right: 0.375rem; transform: translateY(-50%);
        font-size: var(--fz-xxs); font-weight: 600; color: rgba(var(--rgb-white),0.5); pointer-events: none;
        font-variant-numeric: tabular-nums;
      }
      .mr-cell.joined .mr-vol-val { color: rgba(var(--rgb-white),0.7); }
      .mr-vol-icon {
        position: absolute; top: 0; bottom: 0; left: 0.375rem;
        display: flex; align-items: center;
        pointer-events: none;
      }
      .mr-vol-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.6875rem; color: rgba(var(--rgb-white),0.5);
      }
      .mr-cell.joined .mr-vol-icon ha-icon { color: rgba(var(--rgb-white),0.7); }

      /* ── Segmented control ── */
      .segmented {
        display: inline-flex; gap: 0;
        border-radius: var(--radius-lg); background: var(--s1);
        border: 1px solid var(--b1); padding: 0.1875rem;
        margin-bottom: 0.5rem; width: 100%;
      }
      .seg-btn {
        flex: 1;
        padding: 0.4375rem 0; border-radius: var(--radius-sm);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: rgba(var(--rgb-white),0.6); cursor: pointer; transition: color var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
        border: none; background: transparent; outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .seg-btn.active {
        background: rgba(var(--rgb-white),0.12); color: #fff;
        box-shadow: 0 1px 4px rgba(var(--rgb-black),0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .seg-btn:hover:not(.active) { color: rgba(var(--rgb-white),0.85); }
      }
      .seg-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

      /* ── Queue tab ── */
      .queue-loading, .queue-empty {
        text-align: center;
        padding: 1.25rem 0;
        font-size: var(--fz-base);
        color: rgba(var(--rgb-white),0.6);
        font-weight: 500;
      }
      .queue-list {
        max-height: 17.5rem;
        overflow-y: auto;
        scrollbar-width: none;
      }
      .queue-list::-webkit-scrollbar { display: none; }
      .queue-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.25rem;
      }
      .queue-num {
        width: 1.25rem;
        flex-shrink: 0;
        font-size: var(--fz-base);
        font-weight: 500;
        color: rgba(var(--rgb-white),0.5);
        text-align: center;
      }
      .queue-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .queue-title {
        font-size: var(--fz-base);
        font-weight: 500;
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
      }
      .queue-artist {
        font-size: var(--fz-sm);
        color: rgba(var(--rgb-white),0.6);
      }
      .queue-badge {
        font-size: var(--fz-xs);
        padding: 0.0625rem 0.3125rem;
        border-radius: var(--radius-sm);
        background: rgba(var(--rgb-white),0.08);
        color: rgba(var(--rgb-white),0.85);
        flex-shrink: 0;
      }
      .queue-item .btn-icon {
        width: 1.5rem; height: 1.5rem;
        border-radius: var(--radius-sm);
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; padding: 0; outline: none;
        color: rgba(var(--rgb-white),0.6); flex-shrink: 0;
        transition: color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .queue-item .btn-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 1rem;
      }
      @media (hover: hover) and (pointer: fine) {
        .queue-item .btn-icon:hover { color: #fff; }
      }
      .queue-item .btn-icon:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
      .queue-remove { opacity: 0.4; --mdc-icon-size: var(--icon-sm); }
      @media (hover: hover) and (pointer: fine) {
        .queue-remove:hover { opacity: 1; color: var(--c-alert, #ef4444) !important; }
      }
      @media (pointer: coarse) { .queue-remove:active { animation: bounce 0.3s ease; } }
    `]}}Xi([we()],aa.prototype,"areaId"),Xi([xe()],aa.prototype,"_foldOpen"),Xi([xe()],aa.prototype,"_mediaConfig"),Xi([xe()],aa.prototype,"_configLoaded"),Xi([xe()],aa.prototype,"_roomIndex"),Xi([xe()],aa.prototype,"_swipeClass"),Xi([xe()],aa.prototype,"_foldTab"),Xi([xe()],aa.prototype,"_queueData"),Xi([xe()],aa.prototype,"_radioTracks");try{customElements.define("glass-media-card",aa)}catch{}tt("glass-presence-card-editor");var ra=Object.defineProperty,sa=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ra(t,i,s),s};const oa=[{from:"#6366f1",to:"#8b5cf6"},{from:"#ec4899",to:"#f472b6"},{from:"#f59e0b",to:"#fbbf24"},{from:"#10b981",to:"#34d399"},{from:"#06b6d4",to:"#22d3ee"},{from:"#f43f5e",to:"#fb7185"}];function na(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}class la extends rt{constructor(){super(...arguments),this._presenceConfig={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}},this._activePerson=null,this._notifText="",this._configLoaded=!1,this._configLoadingInProgress=!1,this._prevActivePerson=null}static getConfigElement(){return document.createElement("glass-presence-card-editor")}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("presence-config-changed",()=>{this._configLoaded=!1,this._loadConfig()}),this._clockInterval=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,clearInterval(this._clockInterval),this._clockInterval=void 0}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new dt(this.hass),this._loadConfig())),e.has("_activePerson")&&this._activePerson&&this._activePerson!==this._prevActivePerson&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shadowRoot?.querySelectorAll(".fold-sep").forEach(e=>e.classList.add("visible")),this.shadowRoot?.querySelector(".ctrl-fold")?.classList.add("open")})),this._prevActivePerson=this._activePerson}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");e?.presence_card&&(this._presenceConfig=e.presence_card),this._configLoaded=!0,this._configLoadingInProgress=!1,this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}getTrackedEntityIds(){return this._getPersonIds()}_getPersonIds(){return this._presenceConfig.person_entities.length>0?this._presenceConfig.person_entities.filter(e=>this.hass?.states[e]):this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")):[]}_getPersonData(e){const t=this.hass?.states[e];if(!t)return null;const i=t.attributes,a=i.friendly_name||e.split(".")[1],r=i.entity_picture||null,s=this._presenceConfig.smartphone_sensors[e],o=s?this.hass?.states[s]:null,n=o?.attributes??{};let l=o?na(o.state):null;null==l&&(l=na(i.battery_level));const c=na(n.heart_rate),d=na(n.oxygen_saturation),h=na(n.daily_steps),p=n.geocoded_location||null,u=this._presenceConfig.notify_services[e]||n.notify_service||null,g=this._presenceConfig.driving_sensors[e];let m=!1;return g&&this.hass?.states[g]?m="on"===this.hass.states[g].state:"on"!==n.android_auto&&!0!==n.android_auto||(m=!0),{entityId:e,name:a,state:t.state,entityPicture:r,latitude:na(i.latitude),longitude:na(i.longitude),sourceType:i.source_type||"gps",batteryLevel:l,lastUpdated:t.last_updated,geocodedLocation:p,heartRate:c,spo2:d,steps:h,isDriving:m,notifyService:u}}_presenceClass(e){let t=!1,i=!1;for(const a of e)"home"===a.state?t=!0:i=!0;return t&&i?"mixed":t?"home":"away"}_collapseExpanded(){this._activePerson&&(this._activePerson=null)}async _sendNotification(e){if(this.hass&&e.notifyService&&this._notifText.trim()){st(this,"light");try{let t="notify",i=e.notifyService;if(i.includes(".")){const e=i.split(".");t=e[0],i=e.slice(1).join(".")}const a=this.hass.user?.name||"Home Assistant";this._safeCallService(t,i,{title:Qe("presence.notif_title",{name:a}),message:this._notifText.trim()}),this._notifText="",this._activePerson=null}catch{}}}render(){if(this._lang,!this.hass)return J;const e=this._getPersonIds();if(0===e.length)return J;const t=e.map(e=>this._getPersonData(e)).filter(e=>null!==e);if(0===t.length)return J;const i=t.filter(e=>"home"===e.state).length,a=this._presenceClass(t),r=0===i?"all-away":i===t.length?"all-home":"mixed";return X`
      ${this._presenceConfig.show_header?X`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${1===t.length?Qe("presence.title_single"):Qe("presence.title")}</span>
              </div>
              <span class="card-count ${r}">${i}/${t.length}</span>
            </div>
          `:J}
      <div class="glass presence-card" data-presence=${a}>
        <div class="card-tint"></div>
        <div class="card-inner ${this._layoutClass(t.length)}">
          ${this._renderPersons(t)}
        </div>
        ${this._renderFold(t,a)}
      </div>
    `}_layoutClass(e){return 1===e?"solo-layout":2===e?"":"family-layout"}_renderPersons(e){if(1===e.length)return X`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderSoloChips(e[0])}
      `;if(2===e.length)return X`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderDistance(e[0],e[1])}
        ${this._renderPerson(e[1],!0,1)}
      `;const t=[];for(let i=0;i<e.length;i+=2)i>0&&t.push(X`<div class="family-sep"></div>`),i+1<e.length?t.push(X`
          <div class="family-row">
            ${this._renderPerson(e[i],!1,i)}
            ${this._renderDistance(e[i],e[i+1])}
            ${this._renderPerson(e[i+1],!0,i+1)}
          </div>
        `):t.push(X`
          <div class="family-row solo-row">
            ${this._renderPerson(e[i],!1,i)}
          </div>
        `);return X`${t}`}_renderPerson(e,t,i=0){const a=oa[i%oa.length],r=Ue(e.state);return X`
      <div class="person-block ${t?"right":""} ${r?"entity-unavailable":""}">
        <button
          class="avatar-wrapper"
          aria-label=${Qe("presence.avatar_aria",{name:e.name})}
          aria-expanded=${String(this._activePerson===e.entityId)}
          @click=${t=>{t.stopPropagation();const i=this._activePerson===e.entityId?null:e.entityId;i!==this._activePerson&&(this._notifText=""),this._activePerson=i}}
        >
          ${r?X`<div class="avatar avatar-fallback avatar-unavailable"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></div>`:X`
                ${e.entityPicture?X`<img class="avatar" src=${e.entityPicture} alt=${e.name} />`:X`
                      <div
                        class="avatar avatar-fallback"
                        style="background: linear-gradient(135deg, ${a.from}, ${a.to})"
                      >
                        <ha-icon .icon=${"mdi:account"}></ha-icon>
                      </div>
                    `}
                <div class="avatar-status ${s=e.state,"home"===s?"home":"not_home"===s?"away":"zone"}"></div>
              `}
        </button>
        <div class="person-info">
          <div class="person-name">${e.name}</div>
          <div class="person-sub">
            <div class="person-line">
              <span class="source-icon"><ha-icon .icon=${function(e){switch(e){case"gps":default:return"mdi:crosshairs-gps";case"router":return"mdi:router-wireless";case"bluetooth":case"bluetooth_le":return"mdi:bluetooth"}}(e.sourceType)}></ha-icon></span>
              <span class="person-location">${Ae(function(e){return"home"===e?Qe("presence.home"):"not_home"===e?Qe("presence.away"):e.charAt(0).toUpperCase()+e.slice(1)}(e.state),Ee)}</span>
              ${e.isDriving?X`<span class="driving-icon"><ha-icon .icon=${"mdi:car"}></ha-icon></span>`:J}
            </div>
          </div>
        </div>
      </div>
    `;var s}_renderDistance(e,t){if(null==e.latitude||null==e.longitude||null==t.latitude||null==t.longitude)return J;const i=function(e,t,i,a){const r=(i-e)*Math.PI/180,s=(a-t)*Math.PI/180,o=Math.sin(r/2)**2+Math.cos(e*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(s/2)**2;return 12742*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}(e.latitude,e.longitude,t.latitude,t.longitude),a=i<.05,r=String(i<1?Math.round(1e3*i):Math.round(i)),s=Qe(i<1?"presence.distance_m":"presence.distance_km");return X`
      <div class="distance-center ${a?"near":""}">
        <div class="distance-line"></div>
        <div class="distance-info">
          <div class="distance-value">${r}</div>
          <div class="distance-unit">${s}</div>
        </div>
        <div class="heart-pulse" aria-hidden="true"><ha-icon .icon=${"mdi:heart"}></ha-icon></div>
        <div class="distance-line right"></div>
      </div>
    `}_renderSoloChips(e){return null==e.heartRate&&null==e.spo2&&null==e.steps?J:X`
      <div class="solo-health-chips">
        ${null!=e.heartRate?X`<div class="solo-chip bpm"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon><span class="solo-chip-val">${e.heartRate}</span></div>`:J}
        ${null!=e.spo2?X`<div class="solo-chip spo2"><ha-icon .icon=${"mdi:water-percent"}></ha-icon><span class="solo-chip-val">${e.spo2}%</span></div>`:J}
        ${null!=e.steps?X`<div class="solo-chip steps"><ha-icon .icon=${"mdi:walk"}></ha-icon><span class="solo-chip-val">${e.steps.toLocaleString()}</span></div>`:J}
      </div>
    `}_renderFold(e,t){if(!this._activePerson)return J;const i=e.find(e=>e.entityId===this._activePerson);if(!i)return J;const a=null!=i.heartRate||null!=i.spo2||null!=i.steps;return X`
      <div class="fold-sep ${t}"></div>
      <div class="ctrl-fold">
        <div class="ctrl-fold-inner">
          <div class="fold-content">
            <div class="health-address-row">
              ${i.geocodedLocation?X`
                <ha-icon .icon=${"mdi:map-marker"}></ha-icon>
                <span class="address-text">${i.geocodedLocation}</span>
              `:J}
              <span class="fold-meta">
                ${null!=i.batteryLevel?X`
                  <span class="fold-battery ${r=i.batteryLevel,r>50?"high":r>20?"medium":"low"}">
                    <ha-icon .icon=${function(e){return e>80?"mdi:battery":e>60?"mdi:battery-70":e>40?"mdi:battery-50":e>20?"mdi:battery-30":"mdi:battery-10"}(i.batteryLevel)}></ha-icon>
                    ${i.batteryLevel}%
                  </span>
                `:J}
                <span class="fold-last-seen">${function(e){const t=Math.floor((Date.now()-new Date(e).getTime())/1e3);return t<60?Qe("presence.just_now"):t<3600?Qe("presence.min_ago",{count:Math.floor(t/60)}):t<86400?Qe("presence.hours_ago",{count:Math.floor(t/3600)}):Qe("presence.days_ago",{count:Math.floor(t/86400)})}(i.lastUpdated)}</span>
              </span>
            </div>
            ${a?X`
                  <div class="health-zone-label">
                    ${Qe("presence.health_label")}
                    <span class="health-zone-name">${i.name}</span>
                  </div>
                  <div class="health-pills">
                    ${null!=i.heartRate?X`
                          <div class="health-pill bpm">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.heartRate}</span>
                              <span class="health-pill-label">${Qe("presence.bpm")}</span>
                            </div>
                          </div>
                        `:J}
                    ${null!=i.spo2?X`
                          <div class="health-pill spo2">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.spo2}%</span>
                              <span class="health-pill-label">${Qe("presence.spo2")}</span>
                            </div>
                          </div>
                        `:J}
                    ${null!=i.steps?X`
                          <div class="health-pill steps">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:walk"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.steps.toLocaleString()}</span>
                              <span class="health-pill-label">${Qe("presence.steps")}</span>
                            </div>
                          </div>
                        `:J}
                  </div>
                `:J}
            ${i.notifyService?X`
                  <div class="notif-zone">
                    <div class="notif-to">
                      ${Qe("presence.notify_to")}
                      <span class="notif-to-name">${i.name}</span>
                    </div>
                    <div class="notif-row">
                      <textarea
                        class="notif-input"
                        placeholder=${Qe("presence.notify_placeholder")}
                        .value=${this._notifText}
                        @input=${e=>{this._notifText=e.target.value}}
                        @focus=${()=>this._scrollToTop()}
                      ></textarea>
                      <button
                        class="notif-send"
                        aria-label=${Qe("presence.send_aria")}
                        @click=${e=>{e.stopPropagation(),this._sendNotification(i)}}
                      >
                        <ha-icon .icon=${"mdi:send"}></ha-icon>
                      </button>
                    </div>
                  </div>
                `:J}
          </div>
        </div>
      </div>
    `;var r}static{this.styles=[Se,Ie,Te,Me,ze,Pe,Ve,h`
      :host {
        width: 100%;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;
      }

      /* ── Header ── */
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        width: 100%; padding: 0 0.375rem; min-height: 1.375rem; margin-bottom: 0.375rem;
        box-sizing: border-box;
      }
      .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.5px;
        color: var(--t4);
      }
      .card-count {
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 0.875rem; height: 0.875rem; padding: 0 0.25rem;
        border-radius: var(--radius-full);
        font-size: var(--fz-xs); font-weight: 600;
        transition: background var(--t-med), color var(--t-med);
      }
      .card-count.all-home { background: rgba(var(--rgb-success),0.15); color: var(--c-success); }
      .card-count.all-away { background: rgba(var(--rgb-alert),0.15); color: var(--c-alert); }
      .card-count.mixed { background: rgba(var(--rgb-warning),0.15); color: var(--c-warning); }

      /* ── Presence card ── */
      .presence-card { padding: 0.4375rem 0.875rem; width: 100%; box-sizing: border-box; }

      .card-tint {
        position: absolute; inset: 0; border-radius: inherit;
        opacity: 0.06; z-index: 0;
        transition: opacity var(--t-slow), background var(--t-slow);
        pointer-events: none;
      }
      .presence-card[data-presence="home"] .card-tint {
        background: radial-gradient(ellipse at 50% 50%, var(--c-success), transparent 70%);
        opacity: 0.1;
      }
      .presence-card[data-presence="away"] .card-tint {
        background: radial-gradient(ellipse at 50% 50%, var(--c-alert), transparent 70%);
        opacity: 0.09;
      }
      .presence-card[data-presence="mixed"] .card-tint {
        background: linear-gradient(to right, rgba(var(--rgb-success),0.15), transparent 40%, transparent 60%, rgba(var(--rgb-alert),0.15));
        opacity: 0.5;
      }

      .card-inner {
        position: relative; z-index: 1;
        display: flex; align-items: center;
      }

      /* Solo: person left, chips right */
      .card-inner.solo-layout { justify-content: space-between; gap: 0.5rem; }

      /* Family: stacked pair rows */
      .card-inner.family-layout { flex-direction: column; gap: 0; }
      .family-row { display: flex; align-items: center; width: 100%; }
      .family-sep {
        height: 0.0625rem; margin: 0.5rem 0.75rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .family-row.solo-row { justify-content: center; }
      .family-row.solo-row .person-block { flex: 0 1 auto; }

      /* ── Person block ── */
      .person-block {
        display: flex; align-items: center; gap: 0.625rem;
        flex: 1; min-width: 0;
      }
      .person-block.right { flex-direction: row-reverse; text-align: right; }

      .avatar-wrapper {
        position: relative; flex-shrink: 0;
        cursor: pointer; background: none; border: none;
        padding: 0; border-radius: 50%;
        -webkit-tap-highlight-color: transparent;
      }
      .avatar-wrapper:not(:focus-visible) { outline: none; }
      .avatar-wrapper:active { transform: scale(0.96); }
      .avatar-wrapper:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }

      .avatar {
        width: 2.375rem; height: 2.375rem; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        transition: border-color var(--t-med);
        object-fit: cover;
      }
      .avatar-fallback { border: 2px solid rgba(var(--rgb-white),0.1); }
      img.avatar { display: block; }
      .avatar-fallback ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-lg); color: rgba(var(--rgb-white),0.85);
      }

      @media (hover: hover) and (pointer: fine) {
        .avatar-wrapper:hover .avatar { border-color: rgba(var(--rgb-white),0.3); }
      }

      .avatar-status {
        position: absolute; bottom: -0.0625rem; right: -0.0625rem;
        width: 0.75rem; height: 0.75rem; border-radius: 50%;
        border: 2px solid rgba(15,25,35,0.9);
        transition: background var(--t-med), box-shadow var(--t-med);
      }
      .avatar-status.home { background: var(--c-success); box-shadow: 0 0 6px rgba(var(--rgb-success),0.5); }
      .avatar-status.away { background: var(--c-alert); box-shadow: 0 0 6px rgba(var(--rgb-alert),0.5); }
      .avatar-status.zone { background: var(--c-info); box-shadow: 0 0 6px rgba(var(--rgb-info),0.5); }

      .avatar-unavailable {
        border: 2px solid var(--c-alert);
        background: rgba(var(--rgb-alert), 0.1);
        color: var(--c-warning);
      }
      .avatar-unavailable ha-icon {
        --mdc-icon-size: var(--icon-md);
        color: var(--c-warning);
      }

      .person-info { min-width: 0; flex: 1; }
      .person-name { font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2; }
      .person-block.right .person-name { text-align: right; }

      .person-sub { display: flex; flex-direction: column; gap: 0.125rem; margin-top: 0.125rem; }
      .person-block.right .person-sub { align-items: flex-end; }

      .person-line { display: flex; align-items: center; gap: 0.25rem; min-width: 0; }
      .person-block.right .person-line { flex-direction: row-reverse; }

      .person-location {
        font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
        white-space: nowrap; overflow: hidden; min-width: 0;
      }
      .source-icon { display: flex; align-items: center; flex-shrink: 0; }
      .source-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-xs); color: var(--t4);
      }

      .driving-icon { display: flex; align-items: center; flex-shrink: 0; }
      .driving-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.75rem; color: var(--c-info); opacity: 0.7;
      }

      /* ── Distance ── */
      .distance-center { flex-shrink: 0; display: flex; align-items: center; padding: 0; gap: 0; }
      .distance-line {
        width: 1.25rem; height: 0.0625rem;
        background: linear-gradient(to right, var(--b1), var(--b3));
      }
      .distance-line.right { background: linear-gradient(to right, var(--b3), var(--b1)); }
      .distance-info {
        display: flex; flex-direction: column; align-items: center;
        gap: 0.0625rem; padding: 0 0.25rem;
      }
      .distance-value { font-size: var(--fz-lg); font-weight: 700; color: var(--t2); white-space: nowrap; line-height: 1; }
      .distance-unit { font-size: var(--fz-xs); font-weight: 400; color: var(--t4); text-align: center; line-height: 1; }

      .heart-pulse {
        display: none; color: #f472b6; line-height: 1; padding: 0 0.25rem;
        filter: drop-shadow(0 0 4px rgba(244,114,182,0.35));
        animation: pulse-beat 2.5s ease-in-out infinite;
      }
      .heart-pulse ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-md);
      }
      .distance-center.near .heart-pulse { display: flex; align-items: center; }
      .distance-center.near .distance-info { display: none; }
      @keyframes pulse-beat {
        0%, 100% { transform: scale(1); opacity: 0.55; }
        50% { transform: scale(1.05); opacity: 0.85; }
      }

      /* ── Solo health chips ── */
      .solo-health-chips { display: flex; align-items: center; gap: 0.3125rem; flex-shrink: 0; }
      .solo-chip {
        display: flex; align-items: center; gap: 0.1875rem;
        padding: 0.25rem 0.5rem; border-radius: var(--radius-full);
        background: var(--s2); border: 1px solid var(--b1);
        white-space: nowrap; line-height: 1;
      }
      .solo-chip ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.75rem;
      }
      .solo-chip-val { font-size: var(--fz-base); font-weight: 600; }
      .solo-chip.bpm ha-icon, .solo-chip.bpm .solo-chip-val { color: var(--c-alert); opacity: 0.8; }
      .solo-chip.spo2 ha-icon, .solo-chip.spo2 .solo-chip-val { color: var(--c-info); opacity: 0.8; }
      .solo-chip.steps ha-icon, .solo-chip.steps .solo-chip-val { color: var(--c-success); opacity: 0.8; }

      /* ── Fold ── */
      .fold-sep {
        height: 0.0625rem; margin: 0.5rem 0.75rem 0;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-purple),0.25), transparent);
        opacity: 0; transition: opacity 0.25s var(--ease-std);
      }
      .fold-sep.home { background: linear-gradient(90deg, transparent, rgba(var(--rgb-success),0.3), transparent); }
      .fold-sep.mixed { background: linear-gradient(90deg, transparent, rgba(var(--rgb-info),0.3), transparent); }
      .fold-sep.away { background: linear-gradient(90deg, transparent, rgba(var(--rgb-alert),0.3), transparent); }
      .fold-sep.visible { opacity: 1; }
      .fold-sep.bottom { margin: 0 0.75rem 0.25rem; }

      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        position: relative; z-index: 1;
      }
      .ctrl-fold.open { grid-template-rows: 1fr; }
      .ctrl-fold-inner { overflow: hidden; opacity: 0; transition: opacity 0.25s var(--ease-std); }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .fold-content { display: flex; flex-direction: column; gap: 0.375rem; padding-top: 0.5rem; }

      /* ── Health zone ── */
      .health-zone-label {
        font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
        display: flex; align-items: center; gap: 0.3125rem;
      }
      .health-zone-name { color: var(--t3); font-weight: 600; }

      .health-address-row {
        display: flex; align-items: center; gap: 0.3125rem;
        padding: 0.3125rem 0.5rem; border-radius: var(--radius-sm);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .health-address-row > ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.75rem; color: var(--t4); flex-shrink: 0;
      }
      .address-text {
        font-size: var(--fz-sm); font-weight: 400; color: var(--t3);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        flex: 1; min-width: 0;
      }
      .fold-battery {
        display: flex; align-items: center; gap: 0.1875rem;
        font-size: var(--fz-sm); font-weight: 500; flex-shrink: 0; margin-left: auto;
      }
      .fold-battery.high { color: var(--c-success); }
      .fold-battery.medium { color: var(--c-warning); }
      .fold-battery.low { color: var(--c-alert); }
      .fold-battery ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-sm); color: inherit;
      }
      .fold-meta {
        display: flex; align-items: center; gap: 0.375rem;
        margin-left: auto; flex-shrink: 0;
      }
      .fold-last-seen {
        font-size: var(--fz-sm); font-weight: 400; color: var(--t4); white-space: nowrap;
      }

      .health-pills { display: flex; gap: 0.375rem; }
      .health-pill {
        flex: 1; display: flex; align-items: center; gap: 0.375rem;
        padding: 0.375rem 0.625rem; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .health-pill:hover { background: var(--s3); border-color: var(--b2); }
      }
      .health-pill-icon { flex-shrink: 0; display: flex; align-items: center; }
      .health-pill-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-sm);
      }
      .health-pill-data { display: flex; flex-direction: column; min-width: 0; }
      .health-pill-value { font-size: var(--fz-md); font-weight: 700; line-height: 1.1; color: var(--t1); }
      .health-pill-label {
        font-size: var(--fz-xxs); font-weight: 500; text-transform: uppercase;
        letter-spacing: 0.8px; color: var(--t4); line-height: 1.2;
      }

      .health-pill.bpm .health-pill-icon ha-icon { color: var(--c-alert); }
      .health-pill.bpm .health-pill-value { color: var(--c-alert); opacity: 0.85; }
      .health-pill.spo2 .health-pill-icon ha-icon { color: var(--c-info); }
      .health-pill.spo2 .health-pill-value { color: var(--c-info); opacity: 0.85; }
      .health-pill.steps .health-pill-icon ha-icon { color: var(--c-success); }
      .health-pill.steps .health-pill-value { color: var(--c-success); opacity: 0.85; }

      /* ── Notification zone ── */
      .notif-zone { padding: 0.5rem 0 0.25rem; display: flex; gap: 0.5rem; flex-direction: column; }
      .notif-to {
        font-size: var(--fz-sm); font-weight: 500; color: var(--t4);
        display: flex; align-items: center; gap: 0.3125rem;
      }
      .notif-to-name { color: var(--t2); font-weight: 600; }

      .notif-row { display: flex; gap: 0.5rem; align-items: flex-end; }
      .notif-input {
        flex: 1; padding: 0.5rem 0.75rem; border-radius: var(--radius-lg);
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: var(--fz-base);
        outline: none; resize: none; height: 2.25rem; box-sizing: border-box;
        transition: border-color var(--t-fast);
      }
      .notif-input::placeholder { color: var(--t4); }
      .notif-input:focus { border-color: var(--b3); }

      .notif-send {
        width: 2.25rem; height: 2.25rem; border-radius: var(--radius-lg);
        border: 1px solid rgba(var(--rgb-success),0.2);
        background: rgba(var(--rgb-success),0.1); color: var(--c-success);
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; transition: background var(--t-fast), border-color var(--t-fast);
        padding: 0; outline: none; font-size: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .notif-send ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 1rem;
      }
      @media (hover: hover) and (pointer: fine) {
        .notif-send:hover { background: rgba(var(--rgb-success),0.2); border-color: rgba(var(--rgb-success),0.3); }
      }
      .notif-send:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
      .notif-send:active { transform: scale(0.96); }

      @media (pointer: coarse) {
        .avatar-wrapper:active,
        .notif-send:active { animation: bounce 0.3s ease; }
      }
    `]}}sa([xe()],la.prototype,"_presenceConfig"),sa([xe()],la.prototype,"_activePerson"),sa([xe()],la.prototype,"_notifText");try{customElements.define("glass-presence-card",la)}catch{}tt("glass-camera-carousel-card-editor");var ca=Object.defineProperty,da=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ca(t,i,s),s};const ha=1,pa="mdi:cctv",ua="mdi:webcam",ga="mdi:doorbell-video",ma={person:"mdi:human",vehicle:"mdi:car",pet:"mdi:dog",animal:"mdi:paw",package:"mdi:package-variant",face:"mdi:face-recognition",baby_crying:"mdi:baby-face-outline",bicycle:"mdi:bicycle"},_a={motion:/_(motion|mouvement)$/,record:/_(record|enregistrer)$/,siren:/^siren\./,floodlight:/_(floodlight|projecteur)$/,auto_tracking:/_(auto_tracking|suivi_automatique)$/},fa=[[/_person(ne)?$/,"person"],[/_vehicu?le$/,"vehicle"],[/_pet$|_animal_domestique$/,"pet"],[/_animal$/,"animal"],[/_face$|_visage$/,"face"],[/_package$|_colis$/,"package"],[/_baby_crying$|_pleur_bebe$/,"baby_crying"],[/_bicycl?e$|_velo$/,"bicycle"]],ba=new Map;function va(e,t,i){const a=i[e];if(!a?.device_id)return{motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};const r=a.device_id;let s=r;for(const c of Object.keys(i))i[c].device_id===r&&c.startsWith("binary_sensor.")&&t[c]&&(s+=`:${c}=${t[c].state}`);const o=ba.get(e);if(o&&o.key===s)return o.result;const n=[];for(const[c,d]of Object.entries(i))d.device_id===r&&n.push(c);const l={motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};for(const c of n){const e=t[c];if(e&&(c.startsWith("binary_sensor.")&&_a.motion.test(c)&&(l.motionSensorId=c),c.startsWith("switch.")&&_a.record.test(c)&&(l.recordSwitchId=c),_a.siren.test(c)&&(l.sirenId=c),c.startsWith("light.")&&_a.floodlight.test(c)&&(l.floodlightId=c),c.startsWith("switch.")&&_a.auto_tracking.test(c)&&(l.autoTrackId=c),c.startsWith("binary_sensor.")&&"on"===e.state))for(const[t,i]of fa)t.test(c)&&!l.aiDetected.includes(i)&&l.aiDetected.push(i)}return ba.set(e,{key:s,result:l}),l}function ya(e){const t=e.attributes?.icon;if(t)return t;const i=e.entity_id;return i.includes("doorbell")?ga:i.includes("indoor")||i.includes("salon")||i.includes("chambre")?ua:pa}class wa extends rt{constructor(){super(...arguments),this._carouselIndex=0,this._liveIds=new Set,this._foldOpen=!1,this._camConfig=null,this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._touchStartX=0,this._touchDelta=0,this._isSwiping=!1,this._trackEl=null,this._cachedCameraIds=[],this._cachedCamerasKey="",this._onPointerDown=e=>{if(e.target.closest(".carousel-nav, .stream-placeholder"))return;this._touchStartX=e.clientX,this._touchDelta=0,this._isSwiping=!0;e.currentTarget.setPointerCapture(e.pointerId),this._trackEl=this.shadowRoot?.querySelector(".carousel-track"),this._trackEl&&(this._trackEl.style.transition="none")},this._onPointerMove=e=>{if(!this._isSwiping)return;const t=this._trackEl??this.shadowRoot?.querySelector(".carousel-track");if(!t)return;this._trackEl=t,this._touchDelta=e.clientX-this._touchStartX;const i=e.currentTarget.offsetWidth,a=100*this._carouselIndex,r=this._touchDelta/i*100;this._trackEl.style.transform=`translateX(${-a+r}%)`},this._onPointerUp=e=>{if(!this._isSwiping||!this._trackEl)return;this._isSwiping=!1,this._trackEl.style.transition="";const t=.2*e.currentTarget.offsetWidth;this._touchDelta<-t?this._goTo(this._carouselIndex+1):this._touchDelta>t?this._goTo(this._carouselIndex-1):this._goTo(this._carouselIndex),this._trackEl=null},this._onPointerCancel=()=>{this._isSwiping&&this._trackEl&&(this._isSwiping=!1,this._trackEl.style.transition="",this._goTo(this._carouselIndex),this._trackEl=null)}}static getConfigElement(){return document.createElement("glass-camera-carousel-card-editor")}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("camera-carousel-config-changed",()=>{this._configLoaded=!1,this._loadConfig()}),this._listen("dashboard-config-changed",()=>this.requestUpdate()),this._timestampTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._clearCycleTimer(),this._clearTimestampTimer(),ba.clear()}getTrackedEntityIds(){if(!this.hass)return[];const e=this.hass;return this._getCameraIds().flatMap(t=>{const i=va(t,e.states,e.entities);return[t,i.motionSensorId,i.recordSwitchId,i.sirenId,i.floodlightId,i.autoTrackId].filter(Boolean)})}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection===this.hass.connection||(this._backend=new dt(this.hass))),this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._carouselIndex=0,this._cachedCamerasKey="",this._configLoaded=!1,this._liveIds=new Set),this._configLoaded||this._configLoading||this._loadConfig()}async _loadConfig(){if(!this._backend||this._configLoading)return;this._configLoading=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;this._camConfig=t.camera_carousel||{show_header:!0,entity_order:[],auto_cycle:!1,cycle_interval:10},this._configLoaded=!0,this._setupCycleTimer(),this.requestUpdate()}catch{}finally{this._configLoading=!1}}_getCameraIds(){if(!this.hass)return[];let e;e=this.areaId?nt(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("camera.")).map(e=>e.entity_id):Object.keys(this.hass.states).filter(e=>e.startsWith("camera."));const t=e.length+":"+e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.last_changed}`:e}).join(",");if(t===this._cachedCamerasKey)return this._cachedCameraIds;const i=this._camConfig?.entity_order??[];if(i.length){const t=i.filter(t=>e.includes(t)),a=e.filter(e=>!t.includes(e));if(!this.areaId){const e=this.hass.states,t=this.hass.entities;a.sort((i,a)=>this._latestAlertTimestamp(a,e,t)-this._latestAlertTimestamp(i,e,t))}e=[...t,...a]}else if(!this.areaId){const t=this.hass.states,i=this.hass.entities;e.sort((e,a)=>this._latestAlertTimestamp(a,t,i)-this._latestAlertTimestamp(e,t,i))}return this._cachedCamerasKey=t,this._cachedCameraIds=e,this._carouselIndex>=e.length&&(this._carouselIndex=Math.max(0,e.length-1)),this._cachedCameraIds}_latestAlertTimestamp(e,t,i){const a=i[e];if(!a?.device_id)return 0;const r=a.device_id;let s=0;for(const[o,n]of Object.entries(i)){if(n.device_id!==r||!o.startsWith("binary_sensor."))continue;if(!fa.some(([e])=>e.test(o)))continue;const e=t[o];if(!e)continue;const i=new Date(e.last_changed).getTime();i>s&&(s=i)}return s}_getCameraInfo(e){if(!this.hass)return null;const t=this.hass.states[e];if(!t)return null;const i=t.attributes?.supported_features??0,a="unavailable"!==t.state&&!1!==t.attributes?.is_on,r=va(e,this.hass.states,this.hass.entities);return{entityId:e,entity:t,name:t.attributes?.friendly_name||e.split(".")[1],state:t.state,isOn:a,features:i,entityPicture:t.attributes?.entity_picture??null,motionSensorId:r.motionSensorId,motionDetectionSupported:void 0!==t.attributes?.motion_detection,motionDetectionEnabled:!0===t.attributes?.motion_detection,hasMotion:!!r.motionSensorId&&"on"===this.hass.states[r.motionSensorId]?.state,recordSwitchId:r.recordSwitchId,isRecording:"recording"===t.state||!!r.recordSwitchId&&"on"===this.hass.states[r.recordSwitchId]?.state,sirenId:r.sirenId,floodlightId:r.floodlightId,autoTrackId:r.autoTrackId,aiDetected:r.aiDetected,icon:ya(t)}}_setupCycleTimer(){if(this._clearCycleTimer(),this._camConfig?.auto_cycle&&this._getCameraIds().length>1){const e=1e3*(this._camConfig.cycle_interval||10);this._cycleTimer=setInterval(()=>{if(this._isSwiping)return;const e=this._getCameraIds();e.length>1&&(this._carouselIndex=(this._carouselIndex+1)%e.length,this.requestUpdate())},e)}}_clearCycleTimer(){this._cycleTimer&&(clearInterval(this._cycleTimer),this._cycleTimer=void 0)}_clearTimestampTimer(){this._timestampTimer&&(clearInterval(this._timestampTimer),this._timestampTimer=void 0)}_goTo(e){const t=this._getCameraIds();t.length&&(this._carouselIndex=(e%t.length+t.length)%t.length,this._foldOpen=!1,this._setupCycleTimer(),this.requestUpdate())}_prev(){this._goTo(this._carouselIndex-1)}_next(){this._goTo(this._carouselIndex+1)}_togglePower(e){if(!this.hass)return;const t=e.isOn?"turn_off":"turn_on";this._safeCallService("camera",t,{entity_id:e.entityId})}_snapshot(e){if(!this.hass)return;const t=new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0});this.dispatchEvent(t)}_toggleRecord(e){if(!this.hass||!e.recordSwitchId)return;const t="on"===this.hass.states[e.recordSwitchId]?.state;this._safeCallService("switch",t?"turn_off":"turn_on",{entity_id:e.recordSwitchId})}_toggleMotion(e){if(!this.hass)return;const t=e.motionDetectionEnabled?"disable_motion_detection":"enable_motion_detection";this._safeCallService("camera",t,{entity_id:e.entityId})}_toggleSiren(e){if(!this.hass||!e.sirenId)return;const t="on"===this.hass.states[e.sirenId]?.state;this._safeCallService("siren",t?"turn_off":"turn_on",{entity_id:e.sirenId})}_toggleFloodlight(e){if(!this.hass||!e.floodlightId)return;const t="on"===this.hass.states[e.floodlightId]?.state;this._safeCallService("light",t?"turn_off":"turn_on",{entity_id:e.floodlightId})}_toggleAutoTrack(e){if(!this.hass||!e.autoTrackId)return;const t="on"===this.hass.states[e.autoTrackId]?.state;this._safeCallService("switch",t?"turn_off":"turn_on",{entity_id:e.autoTrackId})}_startStream(e){const t=new Set(this._liveIds);t.add(e),this._liveIds=t}render(){if(this._lang,!this.hass)return J;const e=this._getCameraIds();if(!e.length)return J;const t=!1!==this._camConfig?.show_header,i=this._getCameraInfo(e[this._carouselIndex]),a=this._bindGesture({onTap:()=>{},onLongPress:()=>{this._isSwiping=!1,this._trackEl=null,this._foldOpen=!this._foldOpen},exclude:".carousel-nav, .stream-placeholder"});return X`
      ${t?X`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${Qe("camera.title")}</span>
          </div>
        </div>
      `:J}
      <div class="cam-wrap ${this._foldOpen?"fold-open":""}">
        <div class="carousel-hero"
          @pointerdown=${e=>{a.pointerdown(e),this._onPointerDown(e)}}
          @pointermove=${e=>{a.pointermove(e),this._onPointerMove(e)}}
          @pointerup=${e=>{a.pointerup(e),this._onPointerUp(e)}}
          @pointercancel=${()=>{a.pointercancel(),this._onPointerCancel()}}
          @contextmenu=${a.contextmenu}
        >
          <div class="tint" style="${this._tintStyle(i)}"></div>
          <div class="carousel-track" style="transform:translateX(-${100*this._carouselIndex}%)">
            ${e.map((e,t)=>this._renderSlide(e,t===this._carouselIndex))}
          </div>
          ${e.length>1?X`
            <button class="carousel-nav prev" aria-label="${Qe("camera.prev_aria")}" @click=${this._prev}>
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <button class="carousel-nav next" aria-label="${Qe("camera.next_aria")}" @click=${this._next}>
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          `:J}
          ${e.length>1?X`
            <div class="carousel-dots">
              ${e.map((e,t)=>this._renderDot(e,t))}
            </div>
          `:J}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="fold-sep-top"></div>
            <div class="fold-panel">
              ${i?this._renderInfoBar(i):J}
              ${i?this._renderActions(i):J}
            </div>
          </div>
        </div>
      </div>
    `}_tintStyle(e){if(!e||!e.isOn||"idle"===e.state)return"opacity:0";return`background:radial-gradient(ellipse at 50% 50%,${e.aiDetected.length>0?"var(--c-warning)":"var(--cam-color)"},transparent 70%);opacity:0.12`}_renderSlide(e,t){const i=this._getCameraInfo(e);if(!i)return X`<div class="carousel-slide"><div class="carousel-slide-inner off-feed"></div></div>`;const a=this._liveIds.has(e)||"streaming"===i.state||"recording"===i.state,r=i.isOn&&a&&t,s=i.isOn?a?"active-feed":"idle-feed":"off-feed";return X`
      <div class="carousel-slide">
        <div class="carousel-slide-inner ${s}">
          ${r&&this.hass?X`
            <ha-camera-stream
              .hass=${this.hass}
              .stateObj=${i.entity}
              .controls=${!1}
              .muted=${!0}
              class="cam-stream"
            ></ha-camera-stream>
          `:i.entityPicture&&i.isOn?X`
            <img class="cam-thumbnail" src="${i.entityPicture}" alt="${i.name}" />
          `:J}
          ${i.isOn?X`
            <div class="stream-overlay-top">
              <div class="stream-cam-name">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:12px"></ha-icon>
                <span>${i.name}</span>
                ${i.isRecording?X`
                  <span class="rec-indicator">
                    <span class="rec-circle"></span> REC
                  </span>
                `:J}
              </div>
              <div class="stream-time">${(new Date).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}</div>
            </div>
            <div class="stream-overlay-bottom">
              ${i.aiDetected.length>0?X`
                <div class="stream-ai-tags">
                  ${i.aiDetected.map(e=>X`
                    <div class="stream-ai-tag">
                      <ha-icon .icon=${ma[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                      ${Qe(`camera.ai_${e}`)}
                    </div>
                  `)}
                </div>
              `:X`<div></div>`}
            </div>
            ${a?J:X`
              <button class="stream-placeholder" @click=${t=>{t.stopPropagation(),this._startStream(e)}}
                aria-label="${Qe("camera.tap_to_stream")}">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
                <span>${Qe("camera.tap_to_stream")}</span>
              </button>
            `}
          `:X`
            <div class="stream-placeholder">
              <ha-icon .icon=${"mdi:camera-off"} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
              <span>${Qe("camera.camera_off")}</span>
            </div>
          `}
        </div>
      </div>
    `}_renderDot(e,t){const i=this._getCameraInfo(e);let a="carousel-dot-btn";return t===this._carouselIndex&&(a+=" active"),i?.aiDetected.length&&(a+=" motion-dot"),X`
      <button class="${a}"
        aria-label="${Qe("camera.dot_aria",{name:i?.name||""})}"
        @click=${()=>this._goTo(t)}
      ></button>
    `}_renderInfoBar(e){const t=e.isOn&&"idle"!==e.state;return X`
      <div class="carousel-info">
        <div class="carousel-cam-icon ${t?"on":""}">
          <ha-icon .icon=${e.icon} style="--mdc-icon-size:16px"></ha-icon>
        </div>
        <div class="carousel-info-text">
          <div class="carousel-cam-name">${Ae(e.name,Ee)}</div>
          <div class="carousel-cam-sub">
            <span class="carousel-state ${t?"live":""}">${function(e,t){if(!t)return Qe("camera.off");switch(e){case"idle":return Qe("camera.idle");case"streaming":return Qe("camera.streaming");case"recording":return Qe("camera.recording");default:return e}}(e.state,e.isOn)}</span>
            ${e.aiDetected.length>0&&e.isOn?X`
              <div class="carousel-ai-mini">
                ${e.aiDetected.map(e=>X`
                  <div class="ai-badge active">
                    <ha-icon .icon=${ma[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                  </div>
                `)}
              </div>
            `:J}
          </div>
        </div>
      </div>
    `}_renderActions(e){if(!e.isOn)return X`
        <div class="carousel-actions">
          <button class="action-btn" @click=${()=>this._togglePower(e)} aria-label="${Qe("camera.power_on")}">
            <ha-icon .icon=${"mdi:power"} style="--mdc-icon-size:14px"></ha-icon>
            ${Qe("camera.power_on")}
          </button>
        </div>
      `;const t=0!==(e.features&ha),i=!!e.sirenId&&"on"===this.hass?.states[e.sirenId]?.state,a=!!e.floodlightId&&"on"===this.hass?.states[e.floodlightId]?.state,r=!!e.autoTrackId&&"on"===this.hass?.states[e.autoTrackId]?.state;return X`
      <div class="carousel-actions">
        ${t?X`
          <button class="action-btn active" @click=${()=>this._togglePower(e)} aria-label="${Qe("camera.power_off")}">
            <ha-icon .icon=${"mdi:power"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:J}
        <button class="action-btn" @click=${()=>this._snapshot(e)} aria-label="${Qe("camera.snapshot")}">
          <ha-icon .icon=${"mdi:camera"} style="--mdc-icon-size:14px"></ha-icon>
          ${Qe("camera.snapshot")}
        </button>
        ${e.recordSwitchId?X`
          <button class="action-btn ${e.isRecording?"active-alert":""}" @click=${()=>this._toggleRecord(e)}
            aria-label="${e.isRecording?Qe("camera.record_stop"):Qe("camera.record_start")}">
            <ha-icon .icon=${e.isRecording?"mdi:record-circle":"mdi:record"} style="--mdc-icon-size:14px"></ha-icon>
            ${e.isRecording?Qe("camera.record_stop"):Qe("camera.record_start")}
          </button>
        `:J}
        ${e.motionDetectionSupported?X`
          <button class="action-btn ${e.motionDetectionEnabled?"active":""}" @click=${()=>this._toggleMotion(e)}
            aria-label="${e.motionDetectionEnabled?Qe("camera.motion_on_aria"):Qe("camera.motion_off_aria")}">
            <ha-icon .icon=${e.motionDetectionEnabled?"mdi:motion-sensor":"mdi:motion-sensor-off"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:J}
        ${e.sirenId?X`
          <button class="action-btn ${i?"active-alert":""}" @click=${()=>this._toggleSiren(e)}
            aria-label="${Qe("camera.siren_aria")}">
            <ha-icon .icon=${"mdi:bullhorn"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:J}
        ${e.floodlightId?X`
          <button class="action-btn ${a?"active-warning":""}" @click=${()=>this._toggleFloodlight(e)}
            aria-label="${Qe("camera.floodlight_aria")}">
            <ha-icon .icon=${a?"mdi:flashlight":"mdi:flashlight-off"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:J}
        ${e.autoTrackId?X`
          <button class="action-btn ${r?"active":""}" @click=${()=>this._toggleAutoTrack(e)}
            aria-label="${Qe("camera.auto_track_aria")}">
            <ha-icon .icon=${"mdi:target-account"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:J}
      </div>
    `}static{this.styles=[Se,Ie,Te,Me,ze,Pe,h`
      :host {
        width: 100%;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;

        --cam-color: #60a5fa;
        --cam-bg: rgba(var(--rgb-info),0.1);
        --cam-border: rgba(var(--rgb-info),0.15);
        --cam-glow: rgba(var(--rgb-info),0.4);
        --cam-sub: rgba(var(--rgb-info),0.6);
      }

      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
      }
      .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }

      /* — Wrap — */
      .cam-wrap {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; gap: 0;
      }

      /* — Hero — */
      .carousel-hero {
        position: relative; width: 100%; aspect-ratio: 16 / 9;
        border-radius: var(--radius-xl);
        overflow: hidden;
        background: #0a0f18;
        border: 1px solid var(--b2);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 1px 0 rgba(var(--rgb-white),0.04),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
        transition: border-radius var(--t-layout), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) { .carousel-hero:hover { border-color: var(--b3); } }

      /* Connected fold: hero loses bottom radius when fold is open */
      .cam-wrap.fold-open .carousel-hero {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-color: transparent;
      }

      .tint {
        position: absolute; inset: 0; border-radius: inherit;
        pointer-events: none; z-index: 0;
        transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1), background 1.2s cubic-bezier(0.4,0,0.2,1);
      }

      .carousel-track {
        position: absolute; inset: 0;
        display: flex; width: 100%; height: 100%;
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      .carousel-slide {
        flex: 0 0 100%; width: 100%; height: 100%;
        position: relative;
      }
      .carousel-slide-inner {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .carousel-slide-inner.active-feed {
        background:
          radial-gradient(circle at 25% 35%, rgba(40,60,90,0.4) 0%, transparent 40%),
          radial-gradient(circle at 65% 55%, rgba(30,50,70,0.3) 0%, transparent 45%),
          radial-gradient(circle at 50% 80%, rgba(50,40,60,0.2) 0%, transparent 50%),
          linear-gradient(135deg, #141e2e 0%, #0d1520 40%, #111a28 100%);
      }
      .carousel-slide-inner.idle-feed {
        background:
          radial-gradient(circle at 30% 40%, rgba(var(--rgb-info),0.06) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(var(--rgb-accent),0.04) 0%, transparent 50%),
          linear-gradient(135deg, #0d1520 0%, #0a0f18 100%);
      }
      .carousel-slide-inner.off-feed {
        background: linear-gradient(135deg, #0a0e14 0%, #080c12 100%);
      }

      .cam-thumbnail {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; z-index: 0;
      }
      .cam-stream {
        position: absolute; inset: 0; width: 100%; height: 100%;
        display: block; z-index: 0; overflow: hidden;
        --video-object-fit: cover;
      }

      /* — Stream overlays — */
      .stream-overlay-top {
        position: absolute; top: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.5rem 0.625rem;
        background: linear-gradient(180deg, rgba(var(--rgb-black),0.5) 0%, transparent 100%);
      }
      .stream-cam-name {
        font-size: var(--fz-sm); font-weight: 600; color: rgba(var(--rgb-white),0.7);
        display: flex; align-items: center; gap: 0.3125rem;
      }
      .stream-cam-name ha-icon { display: flex; align-items: center; justify-content: center; }
      .rec-indicator {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        font-size: var(--fz-xs); font-weight: 700; color: var(--c-alert);
        letter-spacing: 0.5px;
      }
      .rec-circle {
        width: 0.375rem; height: 0.375rem; border-radius: 50%; background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      @keyframes rec-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--c-alert); }
        50% { opacity: 0.4; box-shadow: 0 0 0px var(--c-alert); }
      }
      .stream-time {
        font-size: var(--fz-xs); font-weight: 500; color: rgba(var(--rgb-white),0.5);
        font-variant-numeric: tabular-nums;
      }
      .stream-overlay-bottom {
        position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.5rem 0.625rem;
        background: linear-gradient(0deg, rgba(var(--rgb-black),0.5) 0%, transparent 100%);
      }
      .stream-ai-tags { display: flex; gap: 0.25rem; }
      .stream-ai-tag {
        display: inline-flex; align-items: center; gap: 0.1875rem;
        padding: 0.125rem 0.375rem; border-radius: var(--radius-sm);
        font-size: var(--fz-xs); font-weight: 600;
        background: rgba(var(--rgb-info),0.15); color: var(--cam-color);
        border: 1px solid rgba(var(--rgb-info),0.2);
      }
      .stream-ai-tag ha-icon { display: flex; align-items: center; justify-content: center; }
      .stream-placeholder {
        display: flex; flex-direction: column; align-items: center; gap: 0.375rem;
        z-index: 3; background: none; border: none; padding: 0; cursor: pointer;
        outline: none; -webkit-tap-highlight-color: transparent;
        font-family: inherit;
      }
      .stream-placeholder:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: 4px; border-radius: var(--radius-md); }
      .stream-placeholder span { font-size: var(--fz-sm); color: var(--t4); font-weight: 500; }
      button.stream-placeholder { position: absolute; inset: 0; width: 100%; height: 100%; justify-content: center; }

      /* — Nav arrows — */
      .carousel-nav {
        position: absolute; top: 50%; transform: translateY(-50%);
        width: 2rem; height: 2rem; border-radius: 50%;
        background: rgba(var(--rgb-black),0.4); border: 1px solid rgba(var(--rgb-white),0.1);
        -webkit-backdrop-filter: var(--blur-sm);
        backdrop-filter: var(--blur-sm);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; padding: 0; outline: none;
        font-family: inherit; transition: background 0.2s cubic-bezier(0.4,0,0.2,1), opacity 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1);
        -webkit-tap-highlight-color: transparent;
        z-index: 5; opacity: 0.7;
      }
      .carousel-nav ha-icon {
        --mdc-icon-size: var(--icon-md); color: rgba(var(--rgb-white),0.8);
        display: flex; align-items: center; justify-content: center;
      }
      .carousel-nav:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: -2px; }
      .carousel-nav:active { transform: translateY(-50%) scale(0.92); }
      .carousel-nav.prev { left: 0.5rem; }
      .carousel-nav.next { right: 0.5rem; }

      @media (hover: hover) and (pointer: fine) {
        .carousel-nav:hover { background: rgba(var(--rgb-black),0.6); opacity: 1; }
      }

      /* — Dots (overlay inside hero) — */
      .carousel-dots {
        position: absolute; bottom: 0.5rem; left: 0; right: 0; z-index: 5;
        display: flex; align-items: center; justify-content: center; gap: 0.375rem;
      }
      .carousel-dot-btn {
        width: 0.5rem; height: 0.5rem; border-radius: 50%; padding: 0;
        border: none; background: var(--t4); cursor: pointer;
        transition: width 0.2s cubic-bezier(0.4,0,0.2,1), border-radius 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1); outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .carousel-dot-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.3); outline-offset: 2px; }
      .carousel-dot-btn.active {
        width: 1.25rem; border-radius: 4px;
        background: var(--cam-color); box-shadow: 0 0 8px var(--cam-glow);
      }
      .carousel-dot-btn.recording {
        background: var(--c-alert); box-shadow: 0 0 6px rgba(var(--rgb-alert),0.5);
      }
      .carousel-dot-btn.recording.active {
        background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      .carousel-dot-btn.motion-dot {
        background: var(--c-warning); box-shadow: 0 0 6px rgba(var(--rgb-warning),0.4);
      }

      @media (hover: hover) and (pointer: fine) {
        .carousel-dot-btn:hover { background: var(--t3); }
      }

      /* — Connected Fold — */
      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ctrl-fold.open { grid-template-rows: 1fr; }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0; transition: opacity 0.25s;
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.03), rgba(var(--rgb-white),0.01));
        backdrop-filter: var(--blur-lg);
        -webkit-backdrop-filter: var(--blur-lg);
        border: 1px solid var(--b2);
        border-top: none;
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
        box-shadow:
          0 8px 32px rgba(var(--rgb-black),0.3),
          0 2px 8px rgba(var(--rgb-black),0.2),
          inset 0 -1px 0 rgba(var(--rgb-black),0.1);
      }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .fold-sep-top {
        height: 0.0625rem; margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-white),0.12), transparent);
      }
      .fold-panel {
        display: flex; flex-direction: column; gap: 0.625rem;
        padding: 0.75rem 0.875rem 0.875rem;
      }

      /* — Info bar — */
      .carousel-info {
        display: flex; align-items: center; gap: 0.625rem; padding: 0 0.125rem;
      }
      .carousel-cam-icon {
        width: 2rem; height: 2rem; border-radius: var(--radius-md);
        background: var(--s2); border: 1px solid var(--b1);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        transition: background 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .carousel-cam-icon ha-icon {
        color: var(--t3); display: flex; align-items: center; justify-content: center;
      }
      .carousel-cam-icon.on { background: var(--cam-bg); border-color: var(--cam-border); }
      .carousel-cam-icon.on ha-icon { color: var(--cam-color); }
      .carousel-info-text { flex: 1; min-width: 0; }
      .carousel-cam-name {
        font-size: var(--fz-md); font-weight: 600; color: var(--t1);
        overflow: hidden; white-space: nowrap;
      }
      .carousel-cam-sub {
        display: flex; align-items: center; gap: 0.3125rem; margin-top: 0.0625rem;
      }
      .carousel-state { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }
      .carousel-state.live { color: var(--cam-sub); }
      .carousel-ai-mini { display: flex; gap: 0.125rem; align-items: center; }
      .ai-badge {
        display: inline-flex; align-items: center; justify-content: center;
        width: 1rem; height: 1rem; border-radius: var(--radius-sm);
        font-size: var(--fz-sm); transition: background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .ai-badge.active { background: rgba(var(--rgb-info),0.12); color: var(--cam-color); }
      .ai-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 0 4px var(--cam-glow));
      }

      /* — Quick actions — */
      .carousel-actions { display: flex; gap: 0.375rem; flex-wrap: wrap; }
      .action-btn {
        display: inline-flex; align-items: center; gap: 0.3125rem;
        padding: 0.375rem 0.75rem; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: var(--t3); cursor: pointer; transition: background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .action-btn ha-icon { display: flex; align-items: center; justify-content: center; }
      .action-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
      .action-btn:active { transform: scale(0.96); }
      .action-btn.active { border-color: var(--cam-border); background: var(--cam-bg); color: var(--cam-color); }
      .action-btn.active-alert { border-color: rgba(var(--rgb-alert),0.2); background: rgba(var(--rgb-alert),0.1); color: var(--c-alert); }
      .action-btn.active-warning { border-color: rgba(var(--rgb-warning),0.2); background: rgba(var(--rgb-warning),0.1); color: var(--c-warning); }

      @media (hover: hover) and (pointer: fine) {
        .action-btn:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      @media (pointer: coarse) {
        .action-btn:active { animation: bounce 0.15s ease-out; }
      }
    `]}}da([we()],wa.prototype,"areaId"),da([xe()],wa.prototype,"_carouselIndex"),da([xe()],wa.prototype,"_liveIds"),da([xe()],wa.prototype,"_foldOpen");try{customElements.define("glass-camera-carousel-card",wa)}catch{}function xa(){window.dispatchEvent(new Event("ll-rebuild"))}!function(){if(a)return;a=!0;const e=history.pushState,t=history.replaceState;history.pushState=function(t,a,s){if(e.call(this,t,a,s),!r){r=!0;try{window.dispatchEvent(new Event("location-changed")),i.emit("location-changed",void 0)}finally{r=!1}}},history.replaceState=function(e,a,s){if(t.call(this,e,a,s),!r){r=!0;try{window.dispatchEvent(new Event("location-changed")),i.emit("location-changed",void 0)}finally{r=!1}}},window.addEventListener("popstate",s)}(),Fe||(Fe=new je),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(xa)):requestAnimationFrame(xa),window.addEventListener("connection-status",e=>{"connected"===e.detail&&setTimeout(xa,500)})}();
