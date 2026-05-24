!function(){"use strict";const e="__glassEventBus",t=window,i=t[e]??(t[e]=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}});let a=!1,r=!1;function s(){i.emit("location-changed",void 0)}const o={navbar:"navbar-config-changed",weather:"weather-config-changed",light_card:"light-config-changed",fan_card:"fan-config-changed",cover_card:"cover-config-changed",climate_card:"climate-config-changed",camera_carousel:"camera-carousel-config-changed",title_card:"title-config-changed",spotify_card:"spotify-config-changed",media_card:"media-config-changed",presence_card:"presence-config-changed",calendar_card:"calendar-config-changed",vacuum_card:"vacuum-config-changed",dashboard:"dashboard-config-changed"};let n=null,l=null,c=null;const d=globalThis,h=d.ShadowRoot&&(void 0===d.ShadyCSS||d.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,p=Symbol(),u=new WeakMap;let g=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==p)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(h&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=u.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&u.set(t,e))}return e}toString(){return this.cssText}};const m=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new g(i,e,p)},_=h?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new g("string"==typeof e?e:e+"",void 0,p))(t)})(e):e,{is:f,defineProperty:v,getOwnPropertyDescriptor:b,getOwnPropertyNames:y,getOwnPropertySymbols:w,getPrototypeOf:x}=Object,k=globalThis,$=k.trustedTypes,C=$?$.emptyScript:"",S=k.reactiveElementPolyfillSupport,T=(e,t)=>e,I={toAttribute(e,t){switch(t){case Boolean:e=e?C:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},z=(e,t)=>!f(e,t),A={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:z};Symbol.metadata??=Symbol("metadata"),k.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=A){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&v(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=b(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=a?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??A}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;const e=x(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){const e=this.properties,t=[...y(e),...w(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(_(e))}else void 0!==e&&t.push(_(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(h)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),a=d.litNonce;void 0!==a&&t.setAttribute("nonce",a),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:I).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:I;this._$Em=a;const s=r.fromAttribute(t,e.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const s=this.constructor;if(!1===a&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??z)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[T("elementProperties")]=new Map,E[T("finalized")]=new Map,S?.({ReactiveElement:E}),(k.reactiveElementVersions??=[]).push("2.1.2");const L=globalThis,P=e=>e,M=L.trustedTypes,O=M?M.createPolicy("lit-html",{createHTML:e=>e}):void 0,R="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,j="?"+D,F=`<${j}>`,q=document,H=()=>q.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,V=Array.isArray,B="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,W=/-->/g,K=/>/g,G=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),X=/'/g,Y=/"/g,Q=/^(?:script|style|textarea|title)$/i,J=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),Z=J(1),ee=J(2),te=Symbol.for("lit-noChange"),ie=Symbol.for("lit-nothing"),ae=new WeakMap,re=q.createTreeWalker(q,129);function se(e,t){if(!V(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==O?O.createHTML(t):t}class oe{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,s=0;const o=e.length-1,n=this.parts,[l,c]=((e,t)=>{const i=e.length-1,a=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=U;for(let n=0;n<i;n++){const t=e[n];let i,l,c=-1,d=0;for(;d<t.length&&(o.lastIndex=d,l=o.exec(t),null!==l);)d=o.lastIndex,o===U?"!--"===l[1]?o=W:void 0!==l[1]?o=K:void 0!==l[2]?(Q.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=G):void 0!==l[3]&&(o=G):o===G?">"===l[0]?(o=r??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,i=l[1],o=void 0===l[3]?G:'"'===l[3]?Y:X):o===Y||o===X?o=G:o===W||o===K?o=U:(o=G,r=void 0);const h=o===G&&e[n+1].startsWith("/>")?" ":"";s+=o===U?t+F:c>=0?(a.push(i),t.slice(0,c)+R+t.slice(c)+D+h):t+D+(-2===c?n:h)}return[se(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=oe.createElement(l,i),re.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=re.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(R)){const t=c[s++],i=a.getAttribute(e).split(D),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?he:"?"===o[1]?pe:"@"===o[1]?ue:de}),a.removeAttribute(e)}else e.startsWith(D)&&(n.push({type:6,index:r}),a.removeAttribute(e));if(Q.test(a.tagName)){const e=a.textContent.split(D),t=e.length-1;if(t>0){a.textContent=M?M.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],H()),re.nextNode(),n.push({type:2,index:++r});a.append(e[t],H())}}}else if(8===a.nodeType)if(a.data===j)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(D,e+1));)n.push({type:7,index:r}),e+=D.length-1}r++}}static createElement(e,t){const i=q.createElement("template");return i.innerHTML=e,i}}function ne(e,t,i=e,a){if(t===te)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const s=N(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=ne(e,r._$AS(e,t.values),r,a)),t}let le=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??q).importNode(t,!0);re.currentNode=a;let r=re.nextNode(),s=0,o=0,n=i[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new ce(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new ge(r,this,e)),this._$AV.push(t),n=i[++o]}s!==n?.index&&(r=re.nextNode(),s++)}return re.currentNode=q,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class ce{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=ie,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ne(this,e,t),N(e)?e===ie||null==e||""===e?(this._$AH!==ie&&this._$AR(),this._$AH=ie):e!==this._$AH&&e!==te&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>V(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ie&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(q.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=oe.createElement(se(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new le(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=ae.get(e.strings);return void 0===t&&ae.set(e.strings,t=new oe(e)),t}k(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new ce(this.O(H()),this.O(H()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=P(e).nextSibling;P(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class de{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=ie,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ie}_$AI(e,t=this,i,a){const r=this.strings;let s=!1;if(void 0===r)e=ne(this,e,t,0),s=!N(e)||e!==this._$AH&&e!==te,s&&(this._$AH=e);else{const a=e;let o,n;for(e=r[0],o=0;o<r.length-1;o++)n=ne(this,a[i+o],t,o),n===te&&(n=this._$AH[o]),s||=!N(n)||n!==this._$AH[o],n===ie?e=ie:e!==ie&&(e+=(n??"")+r[o+1]),this._$AH[o]=n}s&&!a&&this.j(e)}j(e){e===ie?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class he extends de{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ie?void 0:e}}class pe extends de{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ie)}}class ue extends de{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=ne(this,e,t,0)??ie)===te)return;const i=this._$AH,a=e===ie&&i!==ie||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==ie&&(i===ie||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ge{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ne(this,e)}}const me=L.litHtmlPolyfillSupport;me?.(oe,ce),(L.litHtmlVersions??=[]).push("3.3.2");const _e=globalThis;class fe extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new ce(t.insertBefore(H(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return te}}fe._$litElement$=!0,fe.finalized=!0,_e.litElementHydrateSupport?.({LitElement:fe});const ve=_e.litElementPolyfillSupport;ve?.({LitElement:fe}),(_e.litElementVersions??=[]).push("4.2.2");const be=m`
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`,ye=280,we=360,xe=480,ke=600;m`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`,m`
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
`;const $e={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:z},Ce=(e=$e,t,i)=>{const{kind:a,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function Se(e){return(t,i)=>"object"==typeof i?Ce(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function Te(e){return Se({...e,state:!0,attribute:!1})}function Ie(e,t){return(t,i,a)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return t=this,t.renderRoot?.querySelector(e)??null;var t}})}var ze=Object.defineProperty,Ae=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ze(t,i,s),s};class Ee extends fe{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.color="var(--rgb-accent)",this.label="",this.disabled=!1,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[be,m`
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
        -webkit-tap-highlight-color: transparent;
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
    `]}_displayPct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_snap(e){if(this.step<=0)return e;const t=Math.round(e/this.step)*this.step,i=(this.step.toString().split(".")[1]||"").length;return parseFloat(t.toFixed(i))}_pctToValue(e){const t=this.max-this.min,i=this.min+e/100*t;return Math.max(this.min,Math.min(this.max,this._snap(i)))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max")||e.has("color"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._displayPct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.transform=`translate(calc(${e}cqw - 50%), -50%)`)}_onPointerDown(e){if(this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,this._ac=new AbortController;const{signal:i}=this._ac,a=this.renderRoot.querySelector(".fill"),r=this.renderRoot.querySelector(".thumb"),s=(e,i)=>{const s=t.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100)),n=this._pctToValue(o);this._dragValue=n;const l=this._displayPct(n);a.style.transform=`scaleX(${l/100})`,r.style.transform=`translate(calc(${l}cqw - 50%), -50%)`;const c=i?"glass-slider-change":"glass-slider-input";this.dispatchEvent(new CustomEvent(c,{detail:{value:n},bubbles:!0,composed:!0}))};s(e,!1);const o=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}this._dragging=!1};t.addEventListener("pointermove",e=>s(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{s(e,!0),o()},{signal:i}),t.addEventListener("pointercancel",()=>o(),{signal:i}),t.addEventListener("lostpointercapture",()=>o(),{signal:i})}_onKeyDown(e){if(this.disabled)return;const t=this.step>0?this.step:1;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this._snap(this.value+t));break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this._snap(this.value-t));break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this._dragValue=i,this._applyVisuals(),this.dispatchEvent(new CustomEvent("glass-slider-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return Z`
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
        ${this.label?Z`<span class="label">${this.label}</span>`:""}
      </div>
    `}}Ae([Se({type:Number})],Ee.prototype,"value"),Ae([Se({type:Number})],Ee.prototype,"min"),Ae([Se({type:Number})],Ee.prototype,"max"),Ae([Se({type:Number})],Ee.prototype,"step"),Ae([Se({type:String})],Ee.prototype,"color"),Ae([Se({type:String})],Ee.prototype,"label"),Ae([Se({type:Boolean,reflect:!0})],Ee.prototype,"disabled");try{customElements.define("glass-slider",Ee)}catch{}var Le=Object.defineProperty,Pe=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Le(t,i,s),s};class Me extends fe{constructor(){super(...arguments),this.icon="",this.active=!1,this.activeColor="accent",this.size="md",this.glow=!1,this.unavailable=!1,this.disabled=!1,this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: 0;
        margin: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        color: var(--t3);
        transition:
          color var(--t-fast),
          background var(--t-fast),
          border-color var(--t-fast),
          filter var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* Sizes — md is the canonical 44px tap target. */
      :host([size='xs']) button { width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm); }
      :host([size='sm']) button { width: 2rem; height: 2rem; }
      :host([size='md']) button { width: var(--tap-lg); height: var(--tap-lg); }
      :host([size='lg']) button { width: 3.25rem; height: 3.25rem; }

      /* Hit-area extension: any size < 44px gets a transparent ::after that
         widens the touchable region to at least var(--tap-lg) on coarse
         pointers (mobile/tablet). Desktop hover stays pixel-perfect. */
      button::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([size='xs']) button::after {
          inset: calc((var(--tap-lg) - 1.75rem) / -2);
        }
        :host([size='sm']) button::after {
          inset: calc((var(--tap-lg) - 2rem) / -2);
        }
      }

      /* Icon sizing — applies to BOTH the shadow-DOM fallback ha-icon
         (when consumer passes the .icon=… property) and any slotted icon
         (when consumer slots a custom <ha-icon> child). ::slotted() only
         pierces light-DOM children; the fallback lives in shadow DOM so
         it needs its own selector. */
      ha-icon,
      ::slotted(ha-icon),
      ::slotted(*) {
        --mdc-icon-size: var(--icon-md);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      :host([size='xs']) ha-icon,
      :host([size='xs']) ::slotted(ha-icon) { --mdc-icon-size: var(--icon-xs); }
      :host([size='sm']) ha-icon,
      :host([size='sm']) ::slotted(ha-icon) { --mdc-icon-size: var(--icon-sm); }
      :host([size='lg']) ha-icon,
      :host([size='lg']) ::slotted(ha-icon) { --mdc-icon-size: var(--icon-lg); }

      /* Active state. The 'active-color' attribute selects which --rgb-* the
         button tints with; we set --_ac-rgb on the host from JS (render). */
      :host([active]) button {
        background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.1);
        border-color: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.18);
        color: rgb(var(--_ac-rgb, var(--rgb-accent)));
      }
      :host([active][glow]) button {
        filter: drop-shadow(0 0 6px rgba(var(--_ac-rgb, var(--rgb-accent)), 0.4));
      }

      /* Unavailable state — alert border replaces normal border. */
      :host([unavailable]) button {
        border-color: var(--c-alert);
      }

      /* Disabled. */
      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      /* Press feedback. */
      @media (hover: hover) and (pointer: fine) {
        button:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
        :host([active]) button:hover {
          background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.15);
        }
      }
      button:active { transform: scale(0.96); }

      /* Focus ring. */
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `]}_resolveColor(){const e=this.activeColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}render(){const e=this.ariaLabel??this.icon??"button";return Z`
      <button
        type="button"
        part="button"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-label=${e}
        aria-pressed=${this.active?"true":"false"}
      >
        <slot>${this.icon?Z`<ha-icon .icon=${this.icon}></ha-icon>`:null}</slot>
      </button>
    `}}Pe([Se({type:String})],Me.prototype,"icon"),Pe([Se({type:Boolean,reflect:!0})],Me.prototype,"active"),Pe([Se({type:String,attribute:"active-color"})],Me.prototype,"activeColor"),Pe([Se({type:String,reflect:!0})],Me.prototype,"size"),Pe([Se({type:Boolean,reflect:!0})],Me.prototype,"glow"),Pe([Se({type:Boolean,reflect:!0})],Me.prototype,"unavailable"),Pe([Se({type:Boolean,reflect:!0})],Me.prototype,"disabled"),Pe([Se({type:String,attribute:"aria-label"})],Me.prototype,"ariaLabel");try{customElements.define("glass-icon-button",Me)}catch{}var Oe=Object.defineProperty,Re=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Oe(t,i,s),s};class De extends fe{constructor(){super(...arguments),this.icon="",this.active=!1,this.activeColor="accent",this.disabled=!1,this.size="md",this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        min-height: var(--tap-lg);
        padding: 0 0.875rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b2);
        color: var(--t2);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        outline: none;
        white-space: nowrap;
        transition:
          color var(--t-fast),
          background var(--t-fast),
          border-color var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* Compact chip stays 44px tactile via hit-area, visual height shrinks. */
      :host([size='sm']) button {
        min-height: 1.75rem;
        padding: 0 0.625rem;
        font-size: var(--fz-sm);
      }
      :host([size='sm']) button::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([size='sm']) button::after {
          inset: calc((var(--tap-lg) - 1.75rem) / -2) 0;
        }
      }

      ::slotted(*) { pointer-events: none; }
      ha-icon {
        --mdc-icon-size: var(--icon-sm);
        flex-shrink: 0;
        color: inherit;
      }

      :host([active]) button {
        background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.15);
        border-color: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.3);
        color: rgb(var(--_ac-rgb, var(--rgb-accent)));
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      @media (hover: hover) and (pointer: fine) {
        button:hover {
          background: var(--s2);
          border-color: var(--b3);
          color: var(--t1);
        }
        :host([active]) button:hover {
          background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.22);
        }
      }
      button:active { transform: scale(0.97); }
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `]}_resolveColor(){const e=this.activeColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}render(){return Z`
      <button
        type="button"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel??""}
        aria-pressed=${this.active?"true":"false"}
      >
        ${this.icon?Z`<ha-icon .icon=${this.icon}></ha-icon>`:null}
        <slot></slot>
      </button>
    `}}Re([Se({type:String})],De.prototype,"icon"),Re([Se({type:Boolean,reflect:!0})],De.prototype,"active"),Re([Se({type:String,attribute:"active-color"})],De.prototype,"activeColor"),Re([Se({type:Boolean,reflect:!0})],De.prototype,"disabled"),Re([Se({type:String,reflect:!0})],De.prototype,"size"),Re([Se({type:String,attribute:"aria-label"})],De.prototype,"ariaLabel");try{customElements.define("glass-chip",De)}catch{}var je=Object.defineProperty,Fe=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&je(t,i,s),s};class qe extends fe{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.presentation=!1,this.activeColor="accent",this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button, .visual {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: var(--tap-lg);
        min-height: var(--tap-lg);
        padding: 0 0.375rem;
        margin: 0;
        background: transparent;
        border: none;
        outline: none;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
      }
      button { cursor: pointer; }
      /* Presentation mode: shrink to knob track size, no tap area. */
      :host([presentation]) .visual {
        min-width: 0;
        min-height: 0;
        padding: 0;
      }
      .track {
        position: relative;
        width: 2.5rem;
        height: 1.375rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b2);
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
      }
      .knob {
        position: absolute;
        top: 50%;
        left: 0.125rem;
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        background: var(--t1);
        transform: translateY(-50%);
        transition: transform var(--t-fast);
        will-change: transform;
      }
      :host([checked]) .track {
        background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.4);
        border-color: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.5);
      }
      :host([checked]) .knob {
        transform: translate(1.125rem, -50%);
        background: rgb(var(--_ac-rgb, var(--rgb-accent)));
      }
      :host([disabled]) {
        opacity: 0.4;
        pointer-events: none;
      }
      @media (hover: hover) and (pointer: fine) {
        button:hover .track {
          border-color: var(--b3);
        }
      }
      button:focus-visible .track {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      button:active .knob { transform: translateY(-50%) scale(0.92); }
      :host([checked]) button:active .knob {
        transform: translate(1.125rem, -50%) scale(0.92);
      }
    `]}_resolveColor(){const e=this.activeColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}_onClick(e){e.stopPropagation(),this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("glass-toggle-change",{detail:{checked:this.checked},bubbles:!0,composed:!0})))}render(){const e=`--_ac-rgb:${this._resolveColor()}`;return this.presentation?Z`
        <span class="visual" style=${e} aria-hidden="true">
          <span class="track">
            <span class="knob"></span>
          </span>
        </span>
      `:Z`
      <button
        type="button"
        role="switch"
        style=${e}
        ?disabled=${this.disabled}
        aria-checked=${this.checked?"true":"false"}
        aria-label=${this.ariaLabel??"toggle"}
        @click=${this._onClick}
      >
        <span class="track">
          <span class="knob"></span>
        </span>
      </button>
    `}}Fe([Se({type:Boolean,reflect:!0})],qe.prototype,"checked"),Fe([Se({type:Boolean,reflect:!0})],qe.prototype,"disabled"),Fe([Se({type:Boolean,reflect:!0})],qe.prototype,"presentation"),Fe([Se({type:String,attribute:"active-color"})],qe.prototype,"activeColor"),Fe([Se({type:String,attribute:"aria-label"})],qe.prototype,"ariaLabel");try{customElements.define("glass-toggle",qe)}catch{}var He=Object.defineProperty,Ne=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&He(t,i,s),s};class Ve extends fe{constructor(){super(...arguments),this.icon="",this.surface="light",this.disabled=!1,this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--tap-lg);
        height: var(--tap-lg);
        padding: 0;
        margin: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        border-radius: var(--radius-lg);
        background: var(--s2);
        border: 1px solid var(--b2);
        color: var(--t2);
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* On dark sub-panels, the default --s2/--b2 don't read; bump contrast. */
      :host([surface='dark']) button {
        background: rgba(var(--rgb-white), 0.1);
        border-color: rgba(var(--rgb-white), 0.18);
        color: var(--t1);
      }

      ha-icon {
        --mdc-icon-size: var(--icon-md);
        pointer-events: none;
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      @media (hover: hover) and (pointer: fine) {
        button:hover { background: var(--s3); border-color: var(--b3); color: var(--t1); }
        :host([surface='dark']) button:hover {
          background: rgba(var(--rgb-white), 0.15);
          border-color: rgba(var(--rgb-white), 0.25);
        }
      }
      button:active { transform: scale(0.94); }
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `]}render(){return Z`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel??this.icon??"stepper"}
      >
        <slot>${this.icon?Z`<ha-icon .icon=${this.icon}></ha-icon>`:null}</slot>
      </button>
    `}}Ne([Se({type:String})],Ve.prototype,"icon"),Ne([Se({type:String,reflect:!0})],Ve.prototype,"surface"),Ne([Se({type:Boolean,reflect:!0})],Ve.prototype,"disabled"),Ne([Se({type:String,attribute:"aria-label"})],Ve.prototype,"ariaLabel");try{customElements.define("glass-stepper-button",Ve)}catch{}var Be=Object.defineProperty,Ue=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Be(t,i,s),s};class We extends fe{constructor(){super(...arguments),this.icon="",this.variant="standard",this.active=!1,this.activeColor="accent",this.disabled=!1,this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--tap-lg);
        height: var(--tap-lg);
        padding: 0;
        margin: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        background: var(--s2);
        border: 1px solid var(--b2);
        color: var(--t1);
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      :host([variant='main']) button {
        width: 3.25rem;
        height: 3.25rem;
        background: var(--s3);
        border-color: var(--b3);
      }

      ha-icon {
        --mdc-icon-size: var(--icon-md);
        pointer-events: none;
      }
      :host([variant='main']) ha-icon {
        --mdc-icon-size: var(--icon-lg);
      }

      :host([active]) button {
        background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.18);
        border-color: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.35);
        color: rgb(var(--_ac-rgb, var(--rgb-accent)));
      }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      @media (hover: hover) and (pointer: fine) {
        button:hover { background: var(--s3); border-color: var(--b3); }
        :host([active]) button:hover {
          background: rgba(var(--_ac-rgb, var(--rgb-accent)), 0.25);
        }
      }
      button:active { transform: scale(0.94); }
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `]}_resolveColor(){const e=this.activeColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}render(){return Z`
      <button
        type="button"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel??this.icon??"transport"}
        aria-pressed=${this.active?"true":"false"}
      >
        <slot>${this.icon?Z`<ha-icon .icon=${this.icon}></ha-icon>`:null}</slot>
      </button>
    `}}Ue([Se({type:String})],We.prototype,"icon"),Ue([Se({type:String,reflect:!0})],We.prototype,"variant"),Ue([Se({type:Boolean,reflect:!0})],We.prototype,"active"),Ue([Se({type:String,attribute:"active-color"})],We.prototype,"activeColor"),Ue([Se({type:Boolean,reflect:!0})],We.prototype,"disabled"),Ue([Se({type:String,attribute:"aria-label"})],We.prototype,"ariaLabel");try{customElements.define("glass-transport-button",We)}catch{}var Ke=Object.defineProperty,Ge=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ke(t,i,s),s};class Xe extends fe{constructor(){super(...arguments),this.tone="neutral",this.interactive=!1,this.disabled=!1,this.size="md",this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      .pill {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        min-height: 1.125rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b1);
        color: var(--t2);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-xs);
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        cursor: default;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
      }
      :host([size='sm']) .pill {
        min-height: 0.875rem;
        padding: 0 0.375rem;
        font-size: var(--fz-xxs);
      }

      /* Tones — semantic colors. */
      :host([tone='accent']) .pill {
        background: rgba(var(--rgb-accent), 0.15);
        border-color: rgba(var(--rgb-accent), 0.3);
        color: var(--c-accent);
      }
      :host([tone='success']) .pill {
        background: rgba(var(--rgb-success), 0.15);
        border-color: rgba(var(--rgb-success), 0.3);
        color: var(--c-success);
      }
      :host([tone='warning']) .pill {
        background: rgba(var(--rgb-warning), 0.15);
        border-color: rgba(var(--rgb-warning), 0.3);
        color: var(--c-warning);
      }
      :host([tone='alert']) .pill {
        background: rgba(var(--rgb-alert), 0.15);
        border-color: rgba(var(--rgb-alert), 0.3);
        color: var(--c-alert);
      }
      :host([tone='info']) .pill {
        background: rgba(var(--rgb-info), 0.15);
        border-color: rgba(var(--rgb-info), 0.3);
        color: var(--c-info);
      }

      :host([interactive]) .pill {
        cursor: pointer;
      }
      :host([interactive]) .pill::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([interactive]) .pill::after {
          inset: calc((var(--tap-lg) - 1.125rem) / -2) calc((var(--tap-lg) - 100%) / -2);
        }
      }

      :host([disabled]) .pill {
        opacity: 0.4;
        pointer-events: none;
      }

      :host([interactive]) .pill:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
    `]}render(){return"button"===(this.interactive?"button":"span")?Z`
        <button
          type="button"
          class="pill"
          ?disabled=${this.disabled}
          aria-label=${this.ariaLabel??""}
        >
          <slot></slot>
        </button>
      `:Z`<span class="pill" role="status"><slot></slot></span>`}}Ge([Se({type:String,reflect:!0})],Xe.prototype,"tone"),Ge([Se({type:Boolean,reflect:!0})],Xe.prototype,"interactive"),Ge([Se({type:Boolean,reflect:!0})],Xe.prototype,"disabled"),Ge([Se({type:String,reflect:!0})],Xe.prototype,"size"),Ge([Se({type:String,attribute:"aria-label"})],Xe.prototype,"ariaLabel");try{customElements.define("glass-pill",Xe)}catch{}var Ye=Object.defineProperty,Qe=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ye(t,i,s),s};class Je extends fe{constructor(){super(...arguments),this.items=[],this.value="",this.ariaLabel=null,this.layout="rail",this.size="md"}static{this.styles=[be,m`
      :host {
        display: block;
        box-sizing: border-box;
      }
      .tabs {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-lg);
        padding: 0.25rem;
      }
      :host([layout='rail']) .tabs {
        background: transparent;
        border: none;
        padding: 0;
        gap: 0.5rem;
      }
      .tab {
        position: relative;
        flex: 1;
        min-height: var(--tap-lg);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        padding: 0 0.75rem;
        background: transparent;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        color: var(--t3);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        outline: none;
        white-space: nowrap;
        transition:
          color var(--t-fast),
          background var(--t-fast),
          border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* Compact size: smaller visual but keep 44px tactile via ::after. */
      :host([size='sm']) .tab {
        min-height: 2rem;
        padding: 0 0.625rem;
        font-size: var(--fz-sm);
      }
      :host([size='sm']) .tab::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([size='sm']) .tab::after {
          inset: calc((var(--tap-lg) - 2rem) / -2) 0;
        }
      }
      :host([layout='rail']) .tab {
        border-color: var(--b2);
        background: var(--s1);
      }
      .tab[aria-selected='true'] {
        background: var(--s3);
        color: var(--t1);
      }
      :host([layout='rail']) .tab[aria-selected='true'] {
        background: rgba(var(--rgb-accent), 0.15);
        border-color: rgba(var(--rgb-accent), 0.35);
        color: var(--c-accent);
      }
      ha-icon {
        --mdc-icon-size: var(--icon-sm);
        flex-shrink: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .tab:hover { color: var(--t2); background: var(--s2); }
      }
      .tab:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .tab:active { transform: scale(0.97); }
    `]}_onTab(e){this.value!==e&&(this.value=e,this.dispatchEvent(new CustomEvent("glass-tab-change",{detail:{value:e},bubbles:!0,composed:!0})))}render(){return Z`
      <div
        class="tabs"
        role="tablist"
        aria-label=${this.ariaLabel??"tabs"}
      >
        ${this.items.map(e=>Z`
          <button
            type="button"
            class="tab"
            role="tab"
            aria-selected=${this.value===e.value?"true":"false"}
            @click=${()=>this._onTab(e.value)}
          >
            ${e.icon?Z`<ha-icon .icon=${e.icon}></ha-icon>`:null}
            <span>${e.label}</span>
          </button>
        `)}
      </div>
    `}}Qe([Se({type:Array})],Je.prototype,"items"),Qe([Se({type:String,reflect:!0})],Je.prototype,"value"),Qe([Se({type:String,attribute:"aria-label"})],Je.prototype,"ariaLabel"),Qe([Se({type:String,reflect:!0})],Je.prototype,"layout"),Qe([Se({type:String,reflect:!0})],Je.prototype,"size");try{customElements.define("glass-tabs",Je)}catch{}var Ze=Object.defineProperty;class et extends fe{constructor(){super(...arguments),this.dense=!1}static{this.styles=[m`
      :host {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        box-sizing: border-box;
        width: 100%;
        min-height: 3.25rem;
        padding: 0.4375rem 0.875rem;
      }
      :host([dense]) {
        min-height: 2.75rem;
        padding: 0.25rem 0.75rem;
      }
      ::slotted([slot='start']),
      ::slotted([slot='end']) {
        flex-shrink: 0;
      }
      .middle {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.125rem;
      }
    `]}render(){return Z`
      <slot name="start"></slot>
      <div class="middle">
        <slot></slot>
      </div>
      <slot name="end"></slot>
    `}}((e,t,i)=>{for(var a,r=void 0,s=e.length-1;s>=0;s--)(a=e[s])&&(r=a(t,i,r)||r);r&&Ze(t,i,r)})([Se({type:Boolean,reflect:!0})],et.prototype,"dense");try{customElements.define("glass-compact-bar",et)}catch{}var tt=Object.defineProperty;class it extends fe{constructor(){super(...arguments),this.label=""}static{this.styles=[m`
      :host {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        min-height: 1.375rem;
        padding: 0 0.375rem;
        margin: 0 0 0.375rem;
        box-sizing: border-box;
      }
      .title {
        flex: 1;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-xs);
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--t4);
        line-height: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      ::slotted([slot='end']) {
        flex-shrink: 0;
      }
    `]}render(){return Z`
      <span class="title"><slot>${this.label}</slot></span>
      <slot name="end"></slot>
    `}}((e,t,i)=>{for(var a,r=void 0,s=e.length-1;s>=0;s--)(a=e[s])&&(r=a(t,i,r)||r);r&&tt(t,i,r)})([Se({type:String})],it.prototype,"label");try{customElements.define("glass-section-title",it)}catch{}var at=Object.defineProperty,rt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&at(t,i,s),s};class st extends fe{constructor(){super(...arguments),this.variant="full",this.tint="accent"}static{this.styles=[m`
      :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 1px;
      }
      .line {
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(var(--_sep-rgb, var(--rgb-accent)), 0.15),
          transparent
        );
      }
      :host([variant='half']) .line {
        margin: 0 auto;
        width: 50%;
      }
    `]}_resolveTint(){const e=this.tint;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}render(){return Z`<div class="line" style="--_sep-rgb:${this._resolveTint()}"></div>`}}rt([Se({type:String,reflect:!0})],st.prototype,"variant"),rt([Se({type:String,attribute:"tint"})],st.prototype,"tint");try{customElements.define("glass-fold-separator",st)}catch{}var ot=Object.defineProperty,nt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ot(t,i,s),s};class lt extends fe{constructor(){super(...arguments),this.color="#ffffff",this.selected=!1,this.disabled=!1,this.withCheck=!1,this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.625rem;
        height: 1.625rem;
        padding: 0;
        margin: 0;
        background: var(--_swatch-bg, #fff);
        border: 1px solid rgba(var(--rgb-white), 0.18);
        border-radius: 50%;
        cursor: pointer;
        outline: none;
        transition:
          transform var(--t-fast),
          border-color var(--t-fast),
          box-shadow var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      /* Hit-area extension: 26px visual → 44px tactile on coarse pointers. */
      button::after {
        content: '';
        position: absolute;
        inset: calc((var(--tap-lg) - 1.625rem) / -2);
      }
      @media (hover: hover) and (pointer: fine) {
        button::after { inset: 0; }
      }

      :host([selected]) button {
        border-color: rgba(var(--rgb-white), 0.7);
        box-shadow:
          0 0 0 2px rgba(var(--rgb-white), 0.15),
          0 0 12px rgba(var(--rgb-white), 0.25);
      }

      .check {
        --mdc-icon-size: 0.875rem;
        color: rgba(var(--rgb-white), 0.95);
        opacity: 0;
        transition: opacity var(--t-fast);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      :host([with-check][selected]) .check { opacity: 1; }

      :host([disabled]) button {
        opacity: 0.4;
        pointer-events: none;
      }

      button:active { transform: scale(0.9); }
      button:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.4);
        outline-offset: 3px;
      }
    `]}render(){return Z`
      <button
        type="button"
        style="--_swatch-bg:${this.color}"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel??`color ${this.color}`}
        aria-pressed=${this.selected?"true":"false"}
      >${this.withCheck?Z`<ha-icon class="check" .icon=${"mdi:check"}></ha-icon>`:ie}</button>
    `}}nt([Se({type:String})],lt.prototype,"color"),nt([Se({type:Boolean,reflect:!0})],lt.prototype,"selected"),nt([Se({type:Boolean,reflect:!0})],lt.prototype,"disabled"),nt([Se({type:Boolean,reflect:!0,attribute:"with-check"})],lt.prototype,"withCheck"),nt([Se({type:String,attribute:"aria-label"})],lt.prototype,"ariaLabel");try{customElements.define("glass-color-swatch",lt)}catch{}var ct=Object.defineProperty,dt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ct(t,i,s),s};class ht extends fe{constructor(){super(...arguments),this.value="",this.placeholder="",this.type="text",this.multiline=!1,this.rows=3,this.disabled=!1,this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: block;
        box-sizing: border-box;
      }
      .wrapper {
        position: relative;
        display: flex;
        align-items: center;
        background: var(--s1);
        border: 1px solid var(--b2);
        border-radius: var(--radius-md);
        transition: border-color var(--t-fast), background var(--t-fast);
      }
      .wrapper:focus-within {
        border-color: rgba(var(--rgb-accent), 0.5);
        background: var(--s2);
      }
      .input {
        flex: 1;
        min-height: var(--tap-lg);
        padding: 0 0.875rem;
        background: transparent;
        border: none;
        outline: none;
        color: var(--t1);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 500;
        width: 100%;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      textarea.input {
        resize: vertical;
        padding: 0.625rem 0.875rem;
        line-height: 1.4;
      }
      .input::placeholder {
        color: var(--t4);
      }
      :host([disabled]) .wrapper {
        opacity: 0.4;
        pointer-events: none;
      }
      ::slotted([slot='trailing']) {
        flex-shrink: 0;
        margin-right: 0.25rem;
      }
    `]}focusInput(){this._input?.focus()}getValue(){return this._input?.value??this.value}_onInput(e){const t=e.target;this.value=t.value,this.dispatchEvent(new CustomEvent("glass-input",{detail:{value:this.value},bubbles:!0,composed:!0}))}_onKey(e){"Enter"!==e.key||this.multiline||e.shiftKey||(e.preventDefault(),this.dispatchEvent(new CustomEvent("glass-submit",{detail:{value:this.value},bubbles:!0,composed:!0})))}updated(e){super.updated(e),e.has("value")&&this._input&&this._input.value!==this.value&&(this._input.value=this.value)}render(){return Z`
      <div class="wrapper">
        ${this.multiline?Z`<textarea
              class="input"
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              rows=${this.rows}
              maxlength=${this.maxLength??""}
              aria-label=${this.ariaLabel??""}
              @input=${this._onInput}
            >${this.value}</textarea>`:Z`<input
              class="input"
              type=${this.type}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              maxlength=${this.maxLength??""}
              aria-label=${this.ariaLabel??""}
              @input=${this._onInput}
              @keydown=${this._onKey}
            />`}
        <slot name="trailing"></slot>
      </div>
    `}firstUpdated(){this._input&&this._input.value!==this.value&&(this._input.value=this.value)}}dt([Se({type:String})],ht.prototype,"value"),dt([Se({type:String})],ht.prototype,"placeholder"),dt([Se({type:String})],ht.prototype,"type"),dt([Se({type:Boolean})],ht.prototype,"multiline"),dt([Se({type:Number})],ht.prototype,"rows"),dt([Se({type:Boolean})],ht.prototype,"disabled"),dt([Se({type:Number,attribute:"max-length"})],ht.prototype,"maxLength"),dt([Se({type:String,attribute:"aria-label"})],ht.prototype,"ariaLabel"),dt([Ie(".input")],ht.prototype,"_input");try{customElements.define("glass-form-input",ht)}catch{}var pt=Object.defineProperty,ut=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&pt(t,i,s),s};class gt extends fe{constructor(){super(...arguments),this.icon="",this.variant="secondary",this.size="md",this.disabled=!1,this.loading=!1,this.ariaLabel=null}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
      }
      button {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-height: var(--tap-lg);
        padding: 0 1rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b2);
        color: var(--t1);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        outline: none;
        white-space: nowrap;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          transform var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      :host([size='sm']) button {
        min-height: 2.25rem;
        padding: 0 0.75rem;
        font-size: var(--fz-sm);
      }
      :host([size='sm']) button::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([size='sm']) button::after {
          inset: calc((var(--tap-lg) - 2.25rem) / -2) 0;
        }
      }

      :host([variant='primary']) button {
        background: rgba(var(--rgb-accent), 0.85);
        border-color: rgba(var(--rgb-accent), 1);
        color: #fff;
      }
      :host([variant='ghost']) button {
        background: transparent;
        border-color: var(--b1);
        color: var(--t2);
      }
      :host([variant='danger']) button {
        background: rgba(var(--rgb-alert), 0.15);
        border-color: rgba(var(--rgb-alert), 0.4);
        color: var(--c-alert);
      }

      ha-icon {
        --mdc-icon-size: var(--icon-sm);
        flex-shrink: 0;
      }

      :host([disabled]) button,
      :host([loading]) button {
        opacity: 0.5;
        pointer-events: none;
      }

      @media (hover: hover) and (pointer: fine) {
        button:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
        :host([variant='primary']) button:hover {
          background: rgba(var(--rgb-accent), 1);
        }
        :host([variant='danger']) button:hover {
          background: rgba(var(--rgb-alert), 0.25);
        }
      }
      button:active { transform: scale(0.97); }
      button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      .spinner {
        width: 1rem;
        height: 1rem;
        border: 2px solid rgba(var(--rgb-white), 0.3);
        border-top-color: rgba(var(--rgb-white), 0.9);
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `]}render(){return Z`
      <button
        type="button"
        part="button"
        ?disabled=${this.disabled||this.loading}
        aria-label=${this.ariaLabel??""}
        aria-busy=${this.loading?"true":"false"}
      >
        ${this.loading?Z`<span class="spinner" aria-hidden="true"></span>`:this.icon?Z`<ha-icon .icon=${this.icon}></ha-icon>`:null}
        <slot></slot>
      </button>
    `}}ut([Se({type:String})],gt.prototype,"icon"),ut([Se({type:String,reflect:!0})],gt.prototype,"variant"),ut([Se({type:String,reflect:!0})],gt.prototype,"size"),ut([Se({type:Boolean,reflect:!0})],gt.prototype,"disabled"),ut([Se({type:Boolean,reflect:!0})],gt.prototype,"loading"),ut([Se({type:String,attribute:"aria-label"})],gt.prototype,"ariaLabel");try{customElements.define("glass-button",gt)}catch{}var mt=Object.defineProperty,_t=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&mt(t,i,s),s};class ft extends fe{constructor(){super(...arguments),this.open=!1,this.size="md",this.tone="neutral",this.interactive=!1,this.ariaLabel=null,this.onKeyDown=e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.click())}}static{this.styles=[be,m`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--t2);
        transition: color var(--t-fast);
        position: relative;
      }
      :host([tone='accent']) { color: var(--c-accent); }
      :host([tone='muted']) { color: var(--t4); }

      :host([interactive]) {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      /* Builtin 44px hit-area when the chevron is its own tap target. */
      :host([interactive])::after {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host([interactive])::after {
          inset: calc((var(--tap-lg) - 100%) / -2);
          min-width: var(--tap-lg);
          min-height: var(--tap-lg);
        }
      }
      :host([interactive]):focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 4px;
        border-radius: var(--radius-sm);
      }

      ha-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        /* Use --t-med for a calmer rotation (matches the legacy
           .section-chevron timing previously used in the config-panel). */
        transition: transform var(--t-med);
        transform-origin: center;
      }
      :host([size='sm']) ha-icon { --mdc-icon-size: 0.75rem; }
      :host([size='md']) ha-icon { --mdc-icon-size: 1rem; }
      :host([size='lg']) ha-icon { --mdc-icon-size: 1.25rem; }

      :host([open]) ha-icon {
        transform: rotate(180deg);
      }
    `]}connectedCallback(){super.connectedCallback(),this.updateInteractiveAttrs()}updated(e){super.updated(e),e.has("interactive")&&this.updateInteractiveAttrs()}updateInteractiveAttrs(){this.interactive?(this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.addEventListener("keydown",this.onKeyDown)):(this.removeAttribute("role"),this.removeAttribute("tabindex"),this.removeEventListener("keydown",this.onKeyDown))}render(){return Z`<ha-icon .icon=${"mdi:chevron-down"} aria-hidden="true"></ha-icon>`}}_t([Se({type:Boolean,reflect:!0})],ft.prototype,"open"),_t([Se({type:String,reflect:!0})],ft.prototype,"size"),_t([Se({type:String,reflect:!0})],ft.prototype,"tone"),_t([Se({type:Boolean,reflect:!0})],ft.prototype,"interactive"),_t([Se({type:String,attribute:"aria-label"})],ft.prototype,"ariaLabel");try{customElements.define("glass-chevron",ft)}catch{}var vt=Object.defineProperty,bt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&vt(t,i,s),s};class yt extends fe{constructor(){super(...arguments),this.tone="neutral",this.size="sm",this.glow=!1}static{this.styles=[m`
      :host {
        display: inline-block;
        flex-shrink: 0;
      }
      .dot {
        display: block;
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        background: var(--t4);
        transition:
          background var(--t-med),
          box-shadow var(--t-med);
      }
      :host([size='xs']) .dot { width: 0.3125rem; height: 0.3125rem; }
      :host([size='md']) .dot { width: 0.5rem; height: 0.5rem; }

      :host([tone='accent']) .dot       { background: rgb(var(--rgb-accent)); }
      :host([tone='success']) .dot      { background: rgb(var(--rgb-success)); }
      :host([tone='warning']) .dot      { background: rgb(var(--rgb-warning)); }
      :host([tone='alert']) .dot        { background: rgb(var(--rgb-alert)); }
      :host([tone='info']) .dot         { background: rgb(var(--rgb-info)); }
      :host([tone='purple']) .dot       { background: rgb(var(--rgb-purple)); }
      :host([tone='light-glow']) .dot   { background: rgb(var(--rgb-light-glow)); }
      :host([tone='spotify']) .dot      { background: rgb(var(--rgb-spotify)); }
      :host([tone='heat']) .dot         { background: rgb(var(--rgb-heat)); }
      :host([tone='cool']) .dot         { background: rgb(var(--rgb-cool)); }

      :host([glow][tone='accent']) .dot     { box-shadow: 0 0 8px rgba(var(--rgb-accent), 0.5); }
      :host([glow][tone='success']) .dot    { box-shadow: 0 0 8px rgba(var(--rgb-success), 0.5); }
      :host([glow][tone='warning']) .dot    { box-shadow: 0 0 8px rgba(var(--rgb-warning), 0.5); }
      :host([glow][tone='alert']) .dot      { box-shadow: 0 0 8px rgba(var(--rgb-alert), 0.5); }
      :host([glow][tone='info']) .dot       { box-shadow: 0 0 8px rgba(var(--rgb-info), 0.5); }
      :host([glow][tone='purple']) .dot     { box-shadow: 0 0 8px rgba(var(--rgb-purple), 0.5); }
      :host([glow][tone='light-glow']) .dot { box-shadow: 0 0 8px rgba(var(--rgb-light-glow), 0.5); }
      :host([glow][tone='spotify']) .dot    { box-shadow: 0 0 8px rgba(var(--rgb-spotify), 0.5); }
      :host([glow][tone='heat']) .dot       { box-shadow: 0 0 8px rgba(var(--rgb-heat), 0.5); }
      :host([glow][tone='cool']) .dot       { box-shadow: 0 0 8px rgba(var(--rgb-cool), 0.5); }
    `]}render(){return Z`<span class="dot" role="presentation"></span>`}}bt([Se({type:String,reflect:!0})],yt.prototype,"tone"),bt([Se({type:String,reflect:!0})],yt.prototype,"size"),bt([Se({type:Boolean,reflect:!0})],yt.prototype,"glow");try{customElements.define("glass-status-dot",yt)}catch{}var wt=Object.defineProperty;class xt extends fe{constructor(){super(...arguments),this.size="md"}static{this.styles=[be,m`
      :host {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--t4);
        cursor: grab;
        flex-shrink: 0;
        transition: color var(--t-fast), opacity var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      :host([size='sm']) { width: 1rem; height: 1rem; }
      :host(:active) { cursor: grabbing; }
      @media (hover: hover) and (pointer: fine) {
        :host(:hover) { color: var(--t2); }
      }
      /* Builtin hit-area: 20px visual → 44px tactile on coarse pointers. */
      :host::before {
        content: '';
        position: absolute;
        inset: 0;
      }
      @media (pointer: coarse) {
        :host::before {
          inset: calc((var(--tap-lg) - 100%) / -2);
          min-width: var(--tap-lg);
          min-height: var(--tap-lg);
        }
      }
      ha-icon {
        --mdc-icon-size: 0.875rem;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      :host([size='sm']) ha-icon { --mdc-icon-size: 0.75rem; }
    `]}render(){return Z`<ha-icon .icon=${"mdi:drag"} aria-hidden="true"></ha-icon>`}}((e,t,i)=>{for(var a,r=void 0,s=e.length-1;s>=0;s--)(a=e[s])&&(r=a(t,i,r)||r);r&&wt(t,i,r)})([Se({type:String,reflect:!0})],xt.prototype,"size");try{customElements.define("glass-drag-handle",xt)}catch{}var kt=Object.defineProperty,$t=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&kt(t,i,s),s};class Ct extends fe{constructor(){super(...arguments),this.icon="",this.title="",this.subtitle="",this.variant="default"}static{this.styles=[m`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1.5rem 1rem;
        text-align: center;
        color: var(--t3);
      }
      :host([variant='compact']) {
        padding: 0.75rem 0.5rem;
        gap: 0.25rem;
      }
      :host([variant='inline']) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.625rem;
        padding: 0.875rem 1rem;
        border: 1px dashed var(--b2);
        border-radius: var(--radius-md);
        color: var(--t3);
        font-size: var(--fz-sm);
        text-align: left;
      }
      :host([variant='inline']) .title {
        flex: 1;
        min-width: 0;
      }
      /* In inline mode, push action buttons to a new row so they don't
         get crammed between title and the wrapper's right edge. */
      :host([variant='inline']) .actions {
        flex-basis: 100%;
        margin-top: 0;
      }
      /* And collapse the actions container entirely when no slotted
         children — prevents an empty row from adding spacing. */
      :host([variant='inline']) .actions:empty {
        display: none;
      }

      .icon-wrap {
        width: 3.25rem;
        height: 3.25rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--s2);
        border: 1px solid var(--b1);
        color: var(--t3);
        margin-bottom: 0.25rem;
      }
      :host([variant='compact']) .icon-wrap {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0;
      }
      :host([variant='inline']) .icon-wrap {
        width: auto;
        height: auto;
        border: none;
        background: transparent;
        margin: 0;
        color: var(--t4);
      }
      :host([variant='inline']) .icon-wrap ha-icon { --mdc-icon-size: 1.25rem; }
      :host([variant='alert']) .icon-wrap {
        background: rgba(var(--rgb-alert), 0.1);
        border-color: rgba(var(--rgb-alert), 0.25);
        color: var(--c-alert);
      }
      .icon-wrap ha-icon {
        --mdc-icon-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host([variant='compact']) .icon-wrap ha-icon { --mdc-icon-size: 1rem; }

      .title {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.3;
      }
      :host([variant='compact']) .title { font-size: var(--fz-sm); }
      :host([variant='inline']) .title {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
      }

      .subtitle {
        font-size: var(--fz-sm);
        color: var(--t3);
        line-height: 1.4;
        max-width: 16rem;
      }
      :host([variant='compact']) .subtitle { font-size: var(--fz-xs); }

      .actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }
    `]}render(){return Z`
      ${this.icon?Z`
        <div class="icon-wrap">
          <ha-icon .icon=${this.icon}></ha-icon>
        </div>
      `:null}
      ${this.title?Z`<div class="title">${this.title}</div>`:null}
      ${this.subtitle?Z`<div class="subtitle">${this.subtitle}</div>`:null}
      <div class="actions"><slot></slot></div>
    `}}$t([Se({type:String})],Ct.prototype,"icon"),$t([Se({type:String})],Ct.prototype,"title"),$t([Se({type:String})],Ct.prototype,"subtitle"),$t([Se({type:String,reflect:!0})],Ct.prototype,"variant");try{customElements.define("glass-empty-state",Ct)}catch{}var St=Object.defineProperty,Tt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&St(t,i,s),s};class It extends fe{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.interactive=!1,this.disabled=!1,this.fillColor="accent",this.ariaLabel=null,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[be,m`
      :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
      }
      .track {
        position: relative;
        height: 0.25rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        overflow: hidden;
        transition: height var(--t-fast);
      }
      :host([interactive]) .track {
        cursor: pointer;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      :host([interactive]:not([disabled])) .track:hover,
      :host([interactive]) .track.dragging {
        height: 0.375rem;
      }
      .fill {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: rgb(var(--_pb-rgb, var(--rgb-accent)));
        transform-origin: left center;
        transform: scaleX(0);
        transition: transform var(--t-fast);
        will-change: transform;
      }
      :host([interactive]) .fill {
        background: rgba(var(--rgb-white), 0.9);
        box-shadow: 0 0 8px rgba(var(--rgb-white), 0.3);
      }
      .thumb {
        position: absolute;
        top: 50%;
        left: 0;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        background: rgba(var(--rgb-white), 0.95);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity var(--t-fast);
        pointer-events: none;
      }
      :host([interactive]:not([disabled])) .track:hover .thumb,
      :host([interactive]) .track.dragging .thumb {
        opacity: 1;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
      :host([interactive]) .track:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      /* Hit-area extension for interactive mode (so the 4-6px track
         actually accepts touches at 44px tactile height). */
      :host([interactive]) .track::before {
        content: '';
        position: absolute;
        inset: -0.625rem 0;
      }
      @media (pointer: coarse) {
        :host([interactive]) .track::before {
          inset: calc((var(--tap-lg) - 0.25rem) / -2) 0;
        }
      }
    `]}_resolveColor(){const e=this.fillColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}_pct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_pctToValue(e){const t=this.max-this.min;return Math.max(this.min,Math.min(this.max,this.min+e/100*t))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._pct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.left=`${e}%`)}_onPointerDown(e){if(!this.interactive||this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,t.classList.add("dragging"),this._ac=new AbortController;const{signal:i}=this._ac,a=(e,i)=>{const a=t.getBoundingClientRect(),r=Math.max(0,Math.min(100,(e.clientX-a.left)/a.width*100)),s=this._pctToValue(r);this._dragValue=s,this._applyVisuals(),this.dispatchEvent(new CustomEvent(i?"glass-progress-change":"glass-progress-input",{detail:{value:s},bubbles:!0,composed:!0}))};a(e,!1);const r=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}t.classList.remove("dragging"),this._dragging=!1};t.addEventListener("pointermove",e=>a(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{a(e,!0),r()},{signal:i}),t.addEventListener("pointercancel",()=>r(),{signal:i}),t.addEventListener("lostpointercapture",()=>r(),{signal:i})}_onKeyDown(e){if(!this.interactive||this.disabled)return;const t=(this.max-this.min)/20;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this.value+t);break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this.value-t);break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this.dispatchEvent(new CustomEvent("glass-progress-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return Z`
      <div
        class="track"
        style="--_pb-rgb:${this._resolveColor()}"
        role=${this.interactive?"slider":"progressbar"}
        tabindex=${this.interactive&&!this.disabled?"0":"-1"}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${this._dragging?this._dragValue:this.value}
        aria-label=${this.ariaLabel??"progress"}
        @pointerdown=${this._onPointerDown}
        @keydown=${this._onKeyDown}
      >
        <div class="fill"></div>
        ${this.interactive?Z`<div class="thumb"></div>`:null}
      </div>
    `}}Tt([Se({type:Number})],It.prototype,"value"),Tt([Se({type:Number})],It.prototype,"min"),Tt([Se({type:Number})],It.prototype,"max"),Tt([Se({type:Boolean,reflect:!0})],It.prototype,"interactive"),Tt([Se({type:Boolean,reflect:!0})],It.prototype,"disabled"),Tt([Se({type:String,attribute:"fill-color"})],It.prototype,"fillColor"),Tt([Se({type:String,attribute:"aria-label"})],It.prototype,"ariaLabel");try{customElements.define("glass-progress-bar",It)}catch{}var zt=Object.defineProperty,At=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&zt(t,i,s),s};class Et extends fe{constructor(){super(...arguments),this.items=[],this.value="",this.label="",this.icon="",this.placeholder="",this.searchPlaceholder="Search…",this.emptyText="No results",this.searchable=!1,this.disabled=!1,this.ariaLabel=null,this._open=!1,this._query="",this._activeIndex=-1,this._onDocClick=e=>{this._open&&(e.composedPath().includes(this)||this._close())}}static{this.styles=[be,m`
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }
      .trigger {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        min-height: var(--tap-lg);
        padding: 0 0.875rem;
        background: var(--s2);
        border: 1px solid var(--b2);
        border-radius: var(--radius-lg);
        color: var(--t2);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: var(--fz-base);
        font-weight: 600;
        text-align: left;
        cursor: pointer;
        outline: none;
        transition: background var(--t-fast), border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .trigger ha-icon {
        --mdc-icon-size: 1rem;
        flex-shrink: 0;
        color: var(--t3);
      }
      .trigger .label {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .trigger .label.empty { color: var(--t4); }

      @media (hover: hover) and (pointer: fine) {
        .trigger:hover { background: var(--s3); border-color: var(--b3); color: var(--t1); }
      }
      .trigger:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

      :host([disabled]) .trigger {
        opacity: 0.5;
        pointer-events: none;
      }

      .menu {
        position: absolute;
        top: calc(100% + 0.375rem);
        left: 0;
        right: 0;
        z-index: 20;
        max-height: 12.5rem;
        overflow-y: auto;
        padding: 0.25rem;
        background: #1e2433;
        border: 1px solid var(--b2);
        border-radius: var(--radius-lg);
        box-shadow: 0 12px 40px rgba(var(--rgb-black), 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: opacity var(--t-fast), transform var(--t-fast);
        scrollbar-width: none;
      }
      .menu::-webkit-scrollbar { display: none; }
      :host([open]) .menu,
      .menu.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      .dropdown-search {
        width: calc(100% - 0.5rem);
        margin: 0.25rem;
        padding: 0.4375rem 0.625rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-base);
        outline: none;
        box-sizing: border-box;
      }
      .dropdown-search:focus { border-color: var(--b3); }
      .dropdown-search::placeholder { color: var(--t4); }

      .item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        min-height: 2.25rem;
        padding: 0.5rem 0.75rem;
        background: transparent;
        border: none;
        border-radius: var(--radius-md);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        outline: none;
        transition: background var(--t-fast), color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .item ha-icon {
        --mdc-icon-size: 1rem;
        flex-shrink: 0;
      }
      .item:hover, .item.active-row {
        background: var(--s3);
        color: var(--t1);
      }
      .item.selected { color: var(--c-accent); }
      .empty {
        padding: 0.5rem 0.75rem;
        font-size: var(--fz-sm);
        color: var(--t4);
        text-align: center;
      }
    `]}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick,!0)}updated(e){super.updated(e),e.has("_open")&&(this.toggleAttribute("open",this._open),this._open&&this.searchable&&requestAnimationFrame(()=>this._searchInput?.focus()))}_filteredItems(){if(!this._query)return this.items;const e=this._query.toLowerCase();return this.items.filter(t=>t.label.toLowerCase().includes(e)||t.value.toLowerCase().includes(e))}_open$(){this.disabled||(this._open=!0,this._activeIndex=-1)}_close(){this._open=!1,this._query=""}_toggleOpen(){this._open?this._close():this._open$()}_selectItem(e){this.value=e,this.dispatchEvent(new CustomEvent("glass-dropdown-change",{detail:{value:e},bubbles:!0,composed:!0})),this._close()}_onKeyDown(e){if(!this._open)return void("Enter"!==e.key&&" "!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),this._open$()));const t=this._filteredItems();switch(e.key){case"Escape":e.preventDefault(),this._close();break;case"ArrowDown":e.preventDefault(),this._activeIndex=Math.min(t.length-1,this._activeIndex+1);break;case"ArrowUp":e.preventDefault(),this._activeIndex=Math.max(0,this._activeIndex-1);break;case"Enter":e.preventDefault(),this._activeIndex>=0&&t[this._activeIndex]&&this._selectItem(t[this._activeIndex].value)}}render(){const e=this._filteredItems(),t=this.items.find(e=>e.value===this.value),i=t?.label||this.label||this.placeholder||"",a=t?.icon||this.icon;return Z`
      <button
        type="button"
        class="trigger"
        part="trigger"
        ?disabled=${this.disabled}
        aria-haspopup="listbox"
        aria-expanded=${this._open?"true":"false"}
        aria-label=${this.ariaLabel??i}
        @click=${this._toggleOpen}
        @keydown=${this._onKeyDown}
      >
        ${a?Z`<ha-icon .icon=${a}></ha-icon>`:ie}
        <span class="label ${t?"":"empty"}" part="label">${i}</span>
        <glass-chevron ?open=${this._open} size="sm" tone="muted"></glass-chevron>
      </button>
      <div class="menu ${this._open?"open":""}" part="menu" role="listbox">
        ${this.searchable?Z`
          <input
            class="dropdown-search"
            part="search"
            type="text"
            .value=${this._query}
            placeholder=${this.searchPlaceholder}
            @input=${e=>{this._query=e.target.value,this._activeIndex=0}}
            @keydown=${this._onKeyDown}
          />
        `:ie}
        ${0===e.length?Z`<div class="empty" part="empty">${this.emptyText}</div>`:e.map((e,t)=>Z`
              <button
                type="button"
                role="option"
                class="item ${e.value===this.value?"selected":""} ${t===this._activeIndex?"active-row":""}"
                part="item ${e.value===this.value?"item-selected":""}"
                aria-selected=${e.value===this.value?"true":"false"}
                @click=${()=>this._selectItem(e.value)}
                @mouseenter=${()=>{this._activeIndex=t}}
              >
                ${e.icon?Z`<ha-icon .icon=${e.icon}></ha-icon>`:ie}
                <span>${e.label}</span>
              </button>
            `)}
      </div>
    `}}At([Se({type:Array})],Et.prototype,"items"),At([Se({type:String,reflect:!0})],Et.prototype,"value"),At([Se({type:String})],Et.prototype,"label"),At([Se({type:String})],Et.prototype,"icon"),At([Se({type:String})],Et.prototype,"placeholder"),At([Se({type:String,attribute:"search-placeholder"})],Et.prototype,"searchPlaceholder"),At([Se({type:String,attribute:"empty-text"})],Et.prototype,"emptyText"),At([Se({type:Boolean})],Et.prototype,"searchable"),At([Se({type:Boolean,reflect:!0})],Et.prototype,"disabled"),At([Se({type:String,attribute:"aria-label"})],Et.prototype,"ariaLabel"),At([Te()],Et.prototype,"_open"),At([Te()],Et.prototype,"_query"),At([Te()],Et.prototype,"_activeIndex"),At([Ie(".dropdown-search")],Et.prototype,"_searchInput");try{customElements.define("glass-dropdown",Et)}catch{}const Lt=m`
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

    /* Touch target — standard mobile-first size (44px, Apple/Material baseline)
       Applies to icon buttons in compact bars and primary action buttons. */
    --tap-lg: 2.75rem;

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

    /* Glass Cards identity — hardcoded so HA themes cannot override them.
       The framework owns its semantic palette; users theme HA itself for
       the rest of the dashboard. */
    --c-success: #4ade80;
    --c-alert: #f87171;
    --c-warning: #fbbf24;
    --c-info: #60a5fa;
    --c-accent: #818cf8;
    --c-purple: #a78bfa;
    --c-teal: #2dd4bf;
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
`,Pt=m`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-tap-highlight-color: transparent;
  }
`,Mt=m`
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
`,Ot=m`
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
`;const Rt=m`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`,Dt=m`
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
`,jt=m`
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
`,Ft={morning:{body:"#0f1923",blobTop:"#1a6b8a",blobBottom:"#2d8a6e"},day:{body:"#111827",blobTop:"#3b6fa0",blobBottom:"#4a90a0"},evening:{body:"#1a1118",blobTop:"#8a4a2d",blobBottom:"#6b3a5a"},night:{body:"#0a0e1a",blobTop:"#1a2040",blobBottom:"#2a1a3a"}},qt="glass-cards-ambient-bg",Ht=`\n  #${qt} {\n    position: fixed;\n    inset: 0;\n    z-index: 0;\n    pointer-events: none;\n    overflow: hidden;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${qt}::before,\n  #${qt}::after {\n    content: '';\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(120px);\n    opacity: 0.4;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${qt}::before {\n    width: 600px;\n    height: 600px;\n    top: -200px;\n    right: -100px;\n    background: var(--ambient-blob-top, #3b6fa0);\n  }\n  #${qt}::after {\n    width: 500px;\n    height: 500px;\n    bottom: -150px;\n    left: -100px;\n    background: var(--ambient-blob-bottom, #4a90a0);\n  }\n  html::-webkit-scrollbar { display: none; }\n  html { scrollbar-width: none; }\n`;class Nt{constructor(){this.period="day",this.ambientEl=null,this.styleEl=null,this.cleanup=i.on("ambient-update",e=>{this.period=e.period,this.applyAmbient()}),this._injectAmbientBg(),this.applyAmbient()}get currentPeriod(){return this.period}applyAmbient(e){e&&(this.period=e);const t=Ft[this.period],i=document.documentElement;i.style.setProperty("--ambient-body",t.body),i.style.setProperty("--ambient-blob-top",t.blobTop),i.style.setProperty("--ambient-blob-bottom",t.blobBottom),this.ambientEl&&(this.ambientEl.style.background=t.body)}_injectAmbientBg(){if(document.documentElement.style.background="transparent",document.getElementById(qt))return this.ambientEl=document.getElementById(qt),void(this.styleEl=document.head.querySelector("style[data-glass-ambient]"));this.styleEl=document.createElement("style"),this.styleEl.setAttribute("data-glass-ambient",""),this.styleEl.textContent=Ht,document.head.appendChild(this.styleEl),this.ambientEl=document.createElement("div"),this.ambientEl.id=qt,document.body.prepend(this.ambientEl)}destroy(){this.cleanup?.(),this.ambientEl?.remove(),this.ambientEl=null,this.styleEl?.remove(),this.styleEl=null,document.documentElement.style.removeProperty("background"),Vt===this&&(Vt=null)}}let Vt=null;function Bt(e,t){const i=t,a=i*(1-Math.abs(e/60%2-1));let r=0,s=0,o=0;e<60?(r=i,s=a):e<120?(r=a,s=i):e<180?(s=i,o=a):e<240?(s=a,o=i):e<300?(r=a,o=i):(r=i,o=a);const n=1-i;return[Math.round(255*(r+n)),Math.round(255*(s+n)),Math.round(255*(o+n))]}function Ut(e){const t=e[0]/255,i=e[1]/255,a=e[2]/255,r=Math.max(t,i,a),s=r-Math.min(t,i,a);let o=0;0!==s&&(o=r===t?((i-a)/s+6)%6*60:r===i?60*((a-t)/s+2):60*((t-i)/s+4));return{h:o,s:0===r?0:s/r}}function Wt(e){return"#"+e.map(e=>e.toString(16).padStart(2,"0")).join("")}const Kt=m`
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
`;function Gt(e){return!e||"unavailable"===e||"unknown"===e}const Xt=m`
  .tappable {
    position: relative;
  }
  .tappable::after {
    content: '';
    position: absolute;
    inset: 0;
  }
  @media (pointer: coarse) {
    .tappable::after {
      min-width: var(--tap-lg);
      min-height: var(--tap-lg);
      left: 50%;
      top: 50%;
      width: max(100%, var(--tap-lg));
      height: max(100%, var(--tap-lg));
      transform: translate(-50%, -50%);
      inset: auto;
    }
  }
`,Yt={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer",collapse:"Réduire",expand:"Développer",move_up:"Déplacer vers le haut",move_down:"Déplacer vers le bas",none:"Aucun",rooms:"Pièces",enabled:"Activé",disabled:"Désactivé",previous:"Précédent",next:"Suivant",active:"Actif",count_visible:"{count} sur {total} visibles",search:"Rechercher…",no_results:"Aucun résultat"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison",section_brightness:"Intensité",section_temperature:"Température",section_color:"Couleur",section_effects:"Effets"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",forecast_section:"Prévisions",metric_humidity:"Hum.",metric_wind:"Vent",metric_pressure:"Press.",metric_uv:"UV",metric_visibility:"Visib.",sun_cycle:"Cycle solaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSO",compass_SW:"SO",compass_WSW:"OSO",compass_W:"O",compass_WNW:"ONO",compass_NW:"NO",compass_NNW:"NNO"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",section_position:"Position",section_tilt:"Inclinaison",section_presets:"Préréglages",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store d'ombrage",dc_window:"Fenêtre",dc_damper:"Clapet"},climate:{title:"Thermostat",target:"Consigne",current:"Actuelle",range_low:"Min",range_high:"Max",humidity_target:"Humidité cible",aux_heat:"Chauffage auxiliaire",unavailable:"Indisponible",mode_heat:"Chauffage",mode_cool:"Climatisation",mode_heat_cool:"Auto chaud/froid",mode_auto:"Automatique",mode_dry:"Déshumidification",mode_fan_only:"Ventilation",mode_off:"Éteint",preset_eco:"Éco",preset_comfort:"Confort",preset_boost:"Boost",preset_away:"Absent",preset_sleep:"Nuit",preset_activity:"Activité",preset_none:"Aucun",fan_mode:"Ventilation",swing_mode:"Oscillation",fm_auto:"Auto",fm_on:"Marche",fm_off:"Arrêt",fm_low:"Faible",fm_medium:"Moyen",fm_high:"Élevé",fm_diffuse:"Diffus",fm_focus:"Concentré",fm_middle:"Moyen",fm_quiet:"Silencieux",fm_silent:"Silencieux",fm_powerful:"Puissant",sm_off:"Arrêt",sm_on:"Marche",sm_vertical:"Vertical",sm_horizontal:"Horizontal",sm_both:"Les deux",open_all_aria:"Allumer tous les climatiseurs",close_all_aria:"Éteindre tous les climatiseurs",toggle_aria:"Basculer",expand_aria:"Détails",temp_up_aria:"Augmenter température",temp_down_aria:"Diminuer température",humidity_up_aria:"Augmenter humidité",humidity_down_aria:"Diminuer humidité",range_low_aria:"Température minimale",range_high_aria:"Température maximale",no_climates:"Aucun climatiseur",turn_on_aria:"Allumer",turn_off_aria:"Éteindre",action_heating:"Chauffe",action_cooling:"Refroidit",action_idle:"En attente",action_off:"Éteint",action_drying:"Déshumidifie",current_label:"Actuel",controls_aria:"Contrôles",unknown:"Inconnu",avg_label:"Moy.",section_mode:"Mode",section_preset:"Preset",section_air:"Air"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce.",section_speed:"Vitesse",section_mode:"Mode",section_direction:"Direction",section_oscillation:"Oscillation"},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},vacuum:{title:"Aspirateur",status_docked:"Au dock",status_cleaning:"Nettoie",status_paused:"Pause",status_returning:"Retour",status_error:"Erreur",status_unavailable:"Indisponible",cleaning_room:"Nettoie : {room}",battery_aria:"Batterie {level}%, {charging}",charging:"en charge",not_charging:"sur batterie",alert_aria:"Alerte : entretien requis",warning_aria:"Avertissement : entretien à prévoir",all_house:"Toute la maison",confirm_short:"Confirmer ?",clean_room_aria:"Nettoyer {room}",transport_start:"Démarrer",transport_pause:"Pause",transport_stop:"Arrêter",transport_locate:"Localiser",transport_return:"Retour au dock",transport_retry:"Réessayer",section_suction:"Aspiration",section_mopping:"Lavage",section_dock:"Dock",section_consumables:"Consommables",section_stats:"Statistiques",fold_daily:"Modes",fold_maintenance:"Maintenance",mop_attached:"Serpillière fixée",mop_missing:"Serpillière manquante",tank_ok:"Réservoir en place",tank_missing:"Réservoir manquant",water_ok:"Eau OK",water_short:"Pénurie d'eau",dock_charging:"En charge",dock_idle:"Hors charge",dock_drying_label:"Séchage : {minutes} min",dock_drying_idle:"—",dirty_ok:"OK",dirty_full:"À vider",clean_ok:"OK",clean_empty:"À remplir",fluid_ok:"OK",fluid_empty:"À recharger",conso_hours:"{hours} h",conso_clean_now:"À nettoyer maintenant",conso_brush_main:"Brosse principale",conso_brush_side:"Brosse latérale",conso_filter:"Filtre",conso_sensors:"Capteurs",conso_strainer:"Filtre de dock",stats_last_session:"{when} · {duration} · {area}",stats_totals:"{count} nettoyages · {area} cumulés"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",play_on_named:"Jouer sur {name}",play_on_count:"Jouer sur {count} enceintes",choose_speaker:"Choisis une enceinte",connect:"Spotify Connect",available:"Disponible",paused:"En pause",speaker_off:"Éteinte",now_playing_aria:"Lecture en cours",previous_track:"Titre précédent",next_track:"Titre suivant",pause:"Mettre en pause",setup_eyebrow:"Connexion requise",error_eyebrow:"Erreur",no_content_sub:"Aucune playlist, titre ou podcast à afficher pour l'instant.",no_results_title:"Aucun résultat",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}",clear_search:"Effacer la recherche"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",remove_from_queue:"Retirer de la liste de lecture",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message pour {name}…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",sleeping:"Dort",sleeping_aria:"{name} dort",last_seen_label:"Dernière localisation",seen_prefix:"Vu",distance_m:"m",distance_km:"km"},camera:{title:"CAMÉRAS",idle:"Veille",streaming:"En direct",recording:"Enregistrement",off:"Éteinte",unavailable:"Indisponible",no_cameras:"Aucune caméra",prev_aria:"Caméra précédente",next_aria:"Caméra suivante",dot_aria:"Aller à {name}",power_on:"Allumer",power_off:"Éteindre",snapshot:"Capture",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Désactiver détection mouvement",motion_off_aria:"Activer détection mouvement",siren_aria:"Sirène",floodlight_aria:"Projecteur",auto_track_aria:"Suivi automatique",tap_to_stream:"Appuyer pour diffuser",camera_off:"Caméra éteinte",ai_person:"Personne",ai_vehicle:"Véhicule",ai_pet:"Animal",ai_animal:"Animal",ai_package:"Colis",ai_face:"Visage",ai_baby_crying:"Bébé",ai_bicycle:"Vélo",dashboard_title:"CAMÉRAS",dashboard_title_one:"1 CAMÉRA"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Pièces","nav_dashboard":"Dashboard","nav_advanced":"Avancé","tab_navbar":"Navigation","tab_popup":"Popup Pièce","tab_light":"Lumières","preview":"Aperçu","behavior":"Comportement","display":"Affichage","navbar_settings":"Comportement","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","no_rooms":"Aucune pièce configurée","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","room_sensors":"Capteurs","room_sensors_desc":"Entités de température et d\'humidité utilisées dans le popup et la navbar.","room_temp_entity":"Capteur de température","room_temp_entity_desc":"Entité utilisée pour afficher la température de la pièce.","room_humidity_entity":"Capteur d\'humidité","room_humidity_entity_desc":"Entité utilisée pour afficher l\'humidité de la pièce.","room_auto_detect":"Auto-détection","room_no_sensor":"Aucun capteur","room_thresholds":"Seuils d\'alerte","room_thresholds_desc":"Au-delà de ces valeurs, l\'indicateur passe en couleur d\'alerte.","room_temp_high":"Température haute","room_temp_low":"Température basse","room_humidity_threshold":"Seuil d\'humidité","room_indicators":"Indicateurs navbar","room_indicators_desc":"Choisir les indicateurs à afficher pour cette pièce dans la navbar","room_show_lights":"Afficher les lumières","room_show_temperature":"Afficher la température","room_show_humidity":"Afficher l\'humidité","room_sort_by_lights":"Tri auto par lumières","room_sort_by_presence":"Tri auto par présence","room_presence_entity":"Capteur de présence","hide_room":"Masquer de la navbar","show_room":"Afficher dans la navbar","room_open_aria":"Configurer {name}","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","room_buttons_title":"Boutons d\'action","room_buttons_desc":"Boutons configurables affichés dans le header du popup. 3 max.","room_button_entity":"Entité","room_button_entity_placeholder":"Choisir une entité","room_button_entity_search":"Rechercher…","room_button_entity_empty":"Aucune entité","room_button_service_disabled":"Choisir d\'abord une entité","room_button_service_search":"Rechercher un service…","room_button_service_empty":"Aucun service","room_button_icon_auto":"Auto · {icon}","room_button_icon_pick":"Choisir une icône","room_button_icon":"Icône (mdi:...)","room_button_label":"Texte","room_button_label_placeholder":"Aspirer cette pièce","room_button_service":"Service (domain.service)","room_button_data":"Data (JSON)","room_button_advanced":"Paramètres avancés","room_button_add":"Ajouter un bouton","room_button_delete":"Supprimer ce bouton","popup_auto_close":"Fermeture automatique","popup_auto_close_desc":"Fermer le popup automatiquement après un délai d\'inactivité.","popup_auto_close_duration":"Délai","popup_auto_close_off":"Désactivé","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_camera":"Caméras","domain_camera_desc":"Caméras de surveillance","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_daily_desc":"Onglet déroulant des prochains jours","weather_hourly":"Prévisions horaires","weather_hourly_desc":"Onglet déroulant des prochaines heures","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","weather_display":"Affichage","weather_display_desc":"Ce qui apparaît sur la carte.","weather_no_entity":"Aucune entité weather.* détectée. Ajoute une intégration météo dans Home Assistant.","tab_title":"Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_period_indicator":"Indicateur de période","title_period_info":"Créez un input_select nommé « periode_journee » avec les options : Matin, Après-midi, Soir, Nuit. L\'indicateur s\'affichera automatiquement.","title_period_entity":"Entité période","title_period_entity_desc":"Sélectionnez l\'input_select qui contrôle la période du jour.","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Visuels des périodes","title_period_options_desc":"Personnalisez l\'icône et la couleur de chaque période.","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_sources_empty":"Aucune source. Ajoute un mode pour afficher des boutons interactifs sous le titre.","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_dynamic_bg":"Fond dynamique","dashboard_dynamic_bg_desc":"Active le fond d\'écran jour/nuit animé de Glass Cards.","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_players":"Lecteurs médias","media_dashboard_players_desc":"Activez ou désactivez les lecteurs médias visibles sur le tableau de bord.","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","tab_climate":"Thermostat","climate_desc":"Configurez les entités climat par pièce","climate_no_entities":"Aucune entité climat dans cette pièce","climate_show_header":"Afficher l\'en-tête","climate_show_header_desc":"Titre et compteur au-dessus de la carte","climate_display_mode":"Mode d\'affichage","climate_display_mode_popup":"Mode d\'affichage popup","climate_display_mode_popup_desc":"Disposition des entités climat dans le popup de la pièce.","climate_display_mode_dashboard":"Mode d\'affichage (dashboard)","climate_display_mode_dashboard_desc":"Disposition des entités climat sur le tableau de bord.","climate_mode_list":"Liste","climate_mode_normal":"Normal","climate_select_room":"Sélectionner une pièce","climate_room_entities":"Thermostats de la pièce","climate_room_entities_desc":"Ordre et visibilité. Glissez pour réordonner.","climate_dashboard_entities":"Thermostats détectés","climate_dashboard_entities_desc":"Sélectionnez ceux à afficher sur le tableau de bord.","dashboard_card_climate":"Thermostat","dashboard_card_climate_desc":"Thermostats et climatiseurs","dashboard_card_fan":"Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_per_person":"Capteurs par personne","presence_per_person_desc":"Associez un téléphone, un service notify et un capteur conduite à chaque personne.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_sleep":"Capteur sommeil","presence_sleep_desc":"input_boolean ou binary_sensor passant à on quand la personne dort.","presence_sleep_none":"Aucun capteur sommeil","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_compact":"Affichage compact","cover_dashboard_compact_desc":"Affiche les volets en grille compacte 2 colonnes. Désactivé, chaque volet occupe toute la largeur.","cover_dashboard_entities":"Volets détectés","cover_dashboard_entities_desc":"Sélectionnez ceux à afficher. Tous sont visibles quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_dashboard_info":"Sur le tableau de bord, tous les volets activés sont affichés quel que soit leur état (ouvert ou fermé). Active-les ci-dessous.","climate_dashboard_info":"Sur le tableau de bord, tous les thermostats activés sont affichés. Active-les ci-dessous.","camera_dashboard_info":"Sur le tableau de bord, toutes les caméras activées défilent dans le carrousel. Active-les ci-dessous.","media_dashboard_info":"Sur le tableau de bord, seul le lecteur en cours de lecture est affiché. Les autres apparaissent en glissant.","spotify_dashboard_info":"La carte Spotify n\'apparaît sur le tableau de bord que si l\'intégration Spotify officielle est configurée.","presence_dashboard_info":"Sur le tableau de bord, toutes les personnes sélectionnées sont affichées avec leur statut (présent, absent, en route).","fan_dashboard_info":"Sur le tableau de bord, seuls les ventilateurs allumés des pièces visibles sont affichés. Dans chaque pièce, tous les ventilateurs sont disponibles.","rooms_list_title":"Pièces détectées","rooms_list_desc":"Glissez pour réordonner. Activez ou désactivez pour le tableau de bord.","rooms_dashboard_info":"Les pièces actives apparaissent dans la barre de navigation. L\'ordre détermine leur position. Touche une pièce pour ouvrir son popup et configurer ses cards.","dashboard_info":"Les cartes activées apparaissent sur le tableau de bord dans l\'ordre choisi. Glisse pour réordonner, touche pour configurer.","advanced_info":"Options réservées aux utilisateurs avancés. Lis bien chaque description avant d\'agir.","advanced_settings_title":"Réglages","advanced_navbar_title":"Barre de navigation","advanced_navbar_desc":"Comportement et tri automatique des pièces","advanced_orphans_title":"Entités orphelines","advanced_orphans_desc":"Renommer ou réassigner les entités sans pièce","advanced_danger_title":"Zone destructive","advanced_reconfig_title":"Reconfigurer Glass Cards","advanced_reconfig_desc":"Relancer l\'assistant initial. Tous les réglages personnalisés seront perdus.","advanced_reconfig_loading":"Relancement de l\'assistant…","room_detail_info":"Configure ce qui apparaît quand tu ouvres cette pièce sur le tableau de bord.","room_cards_title":"Cartes de la pièce","room_cards_desc":"Glisse pour réordonner, touche le chevron pour configurer.","room_thresholds_title":"Seuils d\'alerte","room_no_entities":"Aucune entité détectée dans cette pièce.","unassigned_info_warn":"{count} entité(s) sans pièce. Assigne-les ci-dessous pour qu\'elles apparaissent sur le tableau de bord.","unassigned_info_ok":"Toutes les entités sont assignées. Tu peux toujours les renommer ou changer leur icône ici.","unassigned_list_title":"Entités contrôlables","unassigned_list_desc":"Touche le nom pour le renommer, l\'icône pour la changer, la pièce pour l\'assigner.","unassigned_filter_all":"Toutes","unassigned_filter_orphans":"Sans pièce","unassigned_assign_room":"Assigner une pièce","unassigned_all_assigned":"Toutes les entités ont une pièce.","unassigned_orphan_count_aria":"{count} sans pièce","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_camera_carousel":"Caméras","camera_show_header":"Afficher l\'en-tête","camera_show_header_desc":"Titre et compteur au-dessus de la carte","camera_auto_cycle":"Cycle automatique","camera_auto_cycle_desc":"Passer automatiquement d\'une caméra à l\'autre","camera_cycle_interval":"Intervalle (secondes)","camera_cycle_interval_desc":"Temps entre chaque changement de caméra","camera_entity_order":"Caméras détectées","camera_entity_order_desc":"Glissez pour réordonner.","camera_no_cameras":"Aucune caméra détectée.","camera_list_title":"Caméras","camera_list_banner":"Glissez pour réordonner. Désactivez celles à masquer.","dashboard_card_camera_carousel":"Caméras","dashboard_card_calendar":"Calendrier","dashboard_card_calendar_desc":"Vue rapide des prochains évènements de tes calendriers","dashboard_card_vacuum":"Aspirateur","dashboard_card_vacuum_desc":"Statut + contrôle de l\'aspirateur robot (Roborock et compatibles)","vacuum_dashboard_info":"La carte Aspirateur s\'affiche sur le tableau de bord. Toutes les entités du robot (batterie, modes, pièces, dock) sont auto-découvertes.","vacuum_show_header":"Afficher l\'en-tête","vacuum_show_header_desc":"Affiche le nom du robot et son statut dans la barre compacte","vacuum_entity":"Entité aspirateur","vacuum_entity_desc":"Choisis l\'entité vacuum à utiliser si plusieurs sont disponibles. Vide = première détectée.","vacuum_no_entities":"Aucune entité vacuum détectée. Ajoute une intégration robot dans Home Assistant.","calendar_show_header":"Afficher l\'en-tête","calendar_show_header_desc":"Titre et compteur d\'évènements au-dessus de la carte","calendar_dashboard_info":"La carte Calendrier n\'apparaît que sur le tableau de bord. Elle regroupe les évènements des calendriers activés ci-dessous.","calendar_entities":"Calendriers détectés","calendar_entities_desc":"Désactive ceux que tu ne veux pas voir dans la carte.","calendar_no_entities":"Aucun calendrier détecté. Ajoute une intégration de calendrier dans Home Assistant.","dashboard_card_camera_carousel_desc":"Carrousel de surveillance avec actions rapides","tab_spotify":"Spotify","tab_calendar":"Calendrier","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Lecteur Spotify","spotify_entity_desc":"Entité media_player à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Enceintes affichées dans le popup de lecture. Vide = toutes.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres","tab_unassigned":"Entités orphelines","unassigned_desc":"Assignez ou réassignez vos entités à une pièce pour qu\'elles apparaissent dans les popups correspondants. Vous pouvez également renommer vos entités directement depuis cet onglet.","unassigned_none":"Toutes les entités sont assignées à une pièce.","unassigned_no_entities":"Aucune entité détectée.","unassigned_select_area":"Non assignée","unassigned_assigned":"Assignée","unassigned_count":"{count} entité(s) sans pièce","unassigned_no_results":"Aucun résultat.","unassigned_rename":"Renommer l\'entité","unassigned_change_icon":"Changer l\'icône"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete",collapse:"Collapse",expand:"Expand",move_up:"Move up",move_down:"Move down",none:"None",rooms:"Rooms",enabled:"Enabled",disabled:"Disabled",previous:"Previous",next:"Next",active:"Active",count_visible:"{count} of {total} visible",search:"Search…",no_results:"No results"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house",section_brightness:"Brightness",section_temperature:"Temperature",section_color:"Color",section_effects:"Effects"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",forecast_section:"Forecast",metric_humidity:"Humid.",metric_wind:"Wind",metric_pressure:"Press.",metric_uv:"UV",metric_visibility:"Visib.",sun_cycle:"Sun cycle",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSW",compass_SW:"SW",compass_WSW:"WSW",compass_W:"W",compass_WNW:"WNW",compass_NW:"NW",compass_NNW:"NNW"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",section_position:"Position",section_tilt:"Tilt",section_presets:"Presets",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},climate:{title:"Climate",target:"Target",current:"Current",range_low:"Low",range_high:"High",humidity_target:"Target humidity",aux_heat:"Auxiliary heat",unavailable:"Unavailable",mode_heat:"Heat",mode_cool:"Cool",mode_heat_cool:"Heat/Cool",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan only",mode_off:"Off",preset_eco:"Eco",preset_comfort:"Comfort",preset_boost:"Boost",preset_away:"Away",preset_sleep:"Sleep",preset_activity:"Activity",preset_none:"None",fan_mode:"Fan mode",swing_mode:"Swing mode",fm_auto:"Auto",fm_on:"On",fm_off:"Off",fm_low:"Low",fm_medium:"Medium",fm_high:"High",fm_diffuse:"Diffuse",fm_focus:"Focus",fm_middle:"Middle",fm_quiet:"Quiet",fm_silent:"Silent",fm_powerful:"Powerful",sm_off:"Off",sm_on:"On",sm_vertical:"Vertical",sm_horizontal:"Horizontal",sm_both:"Both",open_all_aria:"Turn on all climate devices",close_all_aria:"Turn off all climate devices",toggle_aria:"Toggle",expand_aria:"Details",temp_up_aria:"Increase temperature",temp_down_aria:"Decrease temperature",humidity_up_aria:"Increase humidity",humidity_down_aria:"Decrease humidity",range_low_aria:"Minimum temperature",range_high_aria:"Maximum temperature",no_climates:"No climate devices",turn_on_aria:"Turn on",turn_off_aria:"Turn off",action_heating:"Heating",action_cooling:"Cooling",action_idle:"Idle",action_off:"Off",action_drying:"Drying",current_label:"Current",controls_aria:"Controls",unknown:"Unknown",avg_label:"Avg.",section_mode:"Mode",section_preset:"Preset",section_air:"Air"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room.",section_speed:"Speed",section_mode:"Mode",section_direction:"Direction",section_oscillation:"Oscillation"},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},vacuum:{title:"Vacuum",status_docked:"Docked",status_cleaning:"Cleaning",status_paused:"Paused",status_returning:"Returning",status_error:"Error",status_unavailable:"Unavailable",cleaning_room:"Cleaning: {room}",battery_aria:"Battery {level}%, {charging}",charging:"charging",not_charging:"on battery",alert_aria:"Alert: maintenance required",warning_aria:"Warning: maintenance soon",all_house:"Whole house",confirm_short:"Confirm?",clean_room_aria:"Clean {room}",transport_start:"Start",transport_pause:"Pause",transport_stop:"Stop",transport_locate:"Locate",transport_return:"Return to dock",transport_retry:"Retry",section_suction:"Suction",section_mopping:"Mopping",section_dock:"Dock",section_consumables:"Consumables",section_stats:"Statistics",fold_daily:"Modes",fold_maintenance:"Maintenance",mop_attached:"Mop attached",mop_missing:"Mop missing",tank_ok:"Water tank attached",tank_missing:"Water tank missing",water_ok:"Water OK",water_short:"Water shortage",dock_charging:"Charging",dock_idle:"Not charging",dock_drying_label:"Drying: {minutes} min",dock_drying_idle:"—",dirty_ok:"OK",dirty_full:"Empty bin",clean_ok:"OK",clean_empty:"Refill water",fluid_ok:"OK",fluid_empty:"Refill cleaner",conso_hours:"{hours} h",conso_clean_now:"Clean now",conso_brush_main:"Main brush",conso_brush_side:"Side brush",conso_filter:"Filter",conso_sensors:"Sensors",conso_strainer:"Dock strainer",stats_last_session:"{when} · {duration} · {area}",stats_totals:"{count} cleanings · {area} total"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",play_on_named:"Play on {name}",play_on_count:"Play on {count} speakers",choose_speaker:"Pick a speaker",connect:"Spotify Connect",available:"Available",paused:"Paused",speaker_off:"Off",now_playing_aria:"Now playing",previous_track:"Previous track",next_track:"Next track",pause:"Pause",setup_eyebrow:"Connection required",error_eyebrow:"Error",no_content_sub:"No playlists, tracks or podcasts to show yet.",no_results_title:"No results",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}",clear_search:"Clear search"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",remove_from_queue:"Remove from queue",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message for {name}…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",sleeping:"Sleeping",sleeping_aria:"{name} is sleeping",last_seen_label:"Last location update",seen_prefix:"Seen",distance_m:"m",distance_km:"km"},camera:{title:"CAMERAS",idle:"Idle",streaming:"Streaming",recording:"Recording",off:"Off",unavailable:"Unavailable",no_cameras:"No cameras",prev_aria:"Previous camera",next_aria:"Next camera",dot_aria:"Go to {name}",power_on:"Turn on",power_off:"Turn off",snapshot:"Snapshot",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Disable motion detection",motion_off_aria:"Enable motion detection",siren_aria:"Siren",floodlight_aria:"Floodlight",auto_track_aria:"Auto tracking",tap_to_stream:"Tap to stream",camera_off:"Camera off",ai_person:"Person",ai_vehicle:"Vehicle",ai_pet:"Pet",ai_animal:"Animal",ai_package:"Package",ai_face:"Face",ai_baby_crying:"Baby",ai_bicycle:"Bicycle",dashboard_title:"CAMERAS",dashboard_title_one:"1 CAMERA"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Rooms","nav_dashboard":"Dashboard","nav_advanced":"Advanced","tab_navbar":"Navigation","tab_popup":"Room Popup","tab_light":"Lights","preview":"Preview","behavior":"Behavior","display":"Display","navbar_settings":"Behavior","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","no_rooms":"No rooms configured","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","room_sensors":"Sensors","room_sensors_desc":"Temperature and humidity entities used in the popup and navbar.","room_temp_entity":"Temperature sensor","room_temp_entity_desc":"Entity used to display the room temperature.","room_humidity_entity":"Humidity sensor","room_humidity_entity_desc":"Entity used to display the room humidity.","room_auto_detect":"Auto-detect","room_no_sensor":"No sensor","room_thresholds":"Alert thresholds","room_thresholds_desc":"Above these values, the indicator switches to alert color.","room_temp_high":"High temperature","room_temp_low":"Low temperature","room_humidity_threshold":"Humidity threshold","room_indicators":"Navbar indicators","room_indicators_desc":"Choose which indicators to show for this room in the navbar","room_show_lights":"Show lights","room_show_temperature":"Show temperature","room_show_humidity":"Show humidity","room_sort_by_lights":"Auto-sort by lights","room_sort_by_presence":"Auto-sort by presence","room_presence_entity":"Presence sensor","hide_room":"Hide from navbar","show_room":"Show in navbar","room_open_aria":"Configure {name}","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","room_buttons_title":"Action buttons","room_buttons_desc":"Configurable buttons shown in the popup header. Max 3.","room_button_entity":"Entity","room_button_entity_placeholder":"Pick an entity","room_button_entity_search":"Search…","room_button_entity_empty":"No entity","room_button_service_disabled":"Pick an entity first","room_button_service_search":"Search service…","room_button_service_empty":"No service","room_button_icon_auto":"Auto · {icon}","room_button_icon_pick":"Pick an icon","room_button_icon":"Icon (mdi:...)","room_button_label":"Label","room_button_label_placeholder":"Clean this room","room_button_service":"Service (domain.service)","room_button_data":"Data (JSON)","room_button_advanced":"Advanced settings","room_button_add":"Add a button","room_button_delete":"Delete this button","popup_auto_close":"Auto close","popup_auto_close_desc":"Automatically close the popup after an inactivity delay.","popup_auto_close_duration":"Delay","popup_auto_close_off":"Disabled","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_camera":"Cameras","domain_camera_desc":"Security cameras","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_daily_desc":"Expandable tab for the coming days","weather_hourly":"Hourly forecast","weather_hourly_desc":"Expandable tab for the coming hours","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","weather_display":"Display","weather_display_desc":"What appears on the card.","weather_no_entity":"No weather.* entity detected. Add a weather integration in Home Assistant.","tab_title":"Title","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_period_indicator":"Period indicator","title_period_info":"Create an input_select named \'periode_journee\' with options: Matin, Après-midi, Soir, Nuit. The indicator will appear automatically.","title_period_entity":"Period entity","title_period_entity_desc":"Select the input_select that controls the time of day period.","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Period visuals","title_period_options_desc":"Customize the icon and color for each period.","title_add_source":"Add a source","title_remove_source":"Remove source","title_sources_empty":"No source yet. Add a mode to display interactive buttons under the title.","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_dynamic_bg":"Dynamic background","dashboard_dynamic_bg_desc":"Enables the Glass Cards animated day/night background cycle.","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Lights","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Covers","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_players":"Media players","media_dashboard_players_desc":"Enable or disable media players visible on the dashboard.","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media","dashboard_card_media_desc":"Shows media players with transport controls","tab_climate":"Climate","climate_desc":"Configure climate entities per room","climate_no_entities":"No climate entities in this room","climate_show_header":"Show header","climate_show_header_desc":"Title and counter above the card","climate_display_mode":"Display mode","climate_display_mode_popup":"Popup display mode","climate_display_mode_popup_desc":"Layout for climate entities in the room popup.","climate_display_mode_dashboard":"Display mode (dashboard)","climate_display_mode_dashboard_desc":"Layout for climate entities on the dashboard.","climate_mode_list":"List","climate_mode_normal":"Normal","climate_select_room":"Select a room","climate_room_entities":"Thermostats in this room","climate_room_entities_desc":"Order and visibility. Drag to reorder.","climate_dashboard_entities":"Detected thermostats","climate_dashboard_entities_desc":"Select which to display on the dashboard.","dashboard_card_climate":"Climate","dashboard_card_climate_desc":"Thermostats and HVAC","dashboard_card_fan":"Fans","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_per_person":"Sensors per person","presence_per_person_desc":"Map a phone, notify service and driving sensor to each person.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_sleep":"Sleep sensor","presence_sleep_desc":"input_boolean or binary_sensor that turns on when the person is sleeping.","presence_sleep_none":"No sleep sensor","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fans","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Shutters","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_compact":"Compact layout","cover_dashboard_compact_desc":"Display covers in a 2-column compact grid. When off, each cover takes the full width.","cover_dashboard_entities":"Detected covers","cover_dashboard_entities_desc":"Select which to display. All selected are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_dashboard_info":"On the dashboard, all enabled covers are shown regardless of their state (open or closed). Enable some below.","climate_dashboard_info":"On the dashboard, all enabled thermostats are shown. Enable some below.","camera_dashboard_info":"On the dashboard, all enabled cameras rotate through the carousel. Enable some below.","media_dashboard_info":"On the dashboard, only the currently playing player is shown. Others appear by swiping.","spotify_dashboard_info":"The Spotify card only appears on the dashboard if the official Spotify integration is configured.","presence_dashboard_info":"On the dashboard, every selected person is displayed with their status (home, away, driving).","fan_dashboard_info":"On the dashboard, only fans that are on in visible rooms appear. In each room, all fans are available.","rooms_list_title":"Detected rooms","rooms_list_desc":"Drag to reorder. Enable or disable for the dashboard.","rooms_dashboard_info":"Active rooms appear in the navigation bar. Their order sets their position. Tap a room to open its popup and configure its cards.","dashboard_info":"Enabled cards appear on the dashboard in your chosen order. Drag to reorder, tap to configure.","advanced_info":"Options for advanced users. Read each description carefully before acting.","advanced_settings_title":"Settings","advanced_navbar_title":"Navigation bar","advanced_navbar_desc":"Behavior and auto-sort of rooms","advanced_orphans_title":"Orphan entities","advanced_orphans_desc":"Rename or reassign entities without a room","advanced_danger_title":"Danger zone","advanced_reconfig_title":"Reconfigure Glass Cards","advanced_reconfig_desc":"Relaunch the initial wizard. All your custom settings will be lost.","advanced_reconfig_loading":"Relaunching the wizard…","room_detail_info":"Configure what appears when you open this room on the dashboard.","room_cards_title":"Room cards","room_cards_desc":"Drag to reorder, tap the chevron to configure.","room_thresholds_title":"Alert thresholds","room_no_entities":"No entity detected in this room.","unassigned_info_warn":"{count} entity(ies) without a room. Assign them below to make them appear on the dashboard.","unassigned_info_ok":"All entities are assigned. You can still rename them or change their icon here.","unassigned_list_title":"Controllable entities","unassigned_list_desc":"Tap the name to rename, the icon to change it, the room to assign one.","unassigned_filter_all":"All","unassigned_filter_orphans":"Without room","unassigned_assign_room":"Assign a room","unassigned_all_assigned":"Every entity has a room.","unassigned_orphan_count_aria":"{count} without room","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_camera_carousel":"Cameras","camera_show_header":"Show header","camera_show_header_desc":"Title and counter above the card","camera_auto_cycle":"Auto cycle","camera_auto_cycle_desc":"Automatically cycle between cameras","camera_cycle_interval":"Interval (seconds)","camera_cycle_interval_desc":"Time between each camera switch","camera_entity_order":"Detected cameras","camera_entity_order_desc":"Drag to reorder.","camera_no_cameras":"No cameras detected.","camera_list_title":"Cameras","camera_list_banner":"Drag to reorder. Disable those to hide.","dashboard_card_camera_carousel":"Cameras","dashboard_card_calendar":"Calendar","dashboard_card_calendar_desc":"Quick view of your upcoming events from all your calendars","dashboard_card_vacuum":"Vacuum","dashboard_card_vacuum_desc":"Status + control of your robot vacuum (Roborock and compatibles)","vacuum_dashboard_info":"The Vacuum card lives on the dashboard. All robot entities (battery, modes, rooms, dock) are auto-discovered.","vacuum_show_header":"Show header","vacuum_show_header_desc":"Display the robot\'s name and status in the compact bar","vacuum_entity":"Vacuum entity","vacuum_entity_desc":"Pick the vacuum entity to use when several are available. Blank = first detected.","vacuum_no_entities":"No vacuum entity detected. Add a robot integration in Home Assistant.","calendar_show_header":"Show header","calendar_show_header_desc":"Title and event counter above the card","calendar_dashboard_info":"The Calendar card only appears on the dashboard. It groups events from the calendars enabled below.","calendar_entities":"Detected calendars","calendar_entities_desc":"Disable the ones you don\'t want to see in the card.","calendar_no_entities":"No calendar detected. Add a calendar integration in Home Assistant.","dashboard_card_camera_carousel_desc":"Surveillance carousel with quick actions","tab_spotify":"Spotify","tab_calendar":"Calendar","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player","spotify_entity_desc":"media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Speakers shown in the playback popup. Empty = all.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings","tab_unassigned":"Orphan entities","unassigned_desc":"Assign or reassign your entities to a room so they appear in the corresponding popups.","unassigned_none":"All entities are assigned to a room.","unassigned_no_entities":"No entities detected.","unassigned_select_area":"Unassigned","unassigned_assigned":"Assigned","unassigned_count":"{count} unassigned entity(ies)","unassigned_no_results":"No results.","unassigned_rename":"Rename entity","unassigned_change_icon":"Change icon"}')}},Qt="fr";let Jt=Qt;function Zt(e){const t=e.slice(0,2).toLowerCase(),i=t in Yt?t:Qt;return i!==Jt&&(Jt=i,!0)}function ei(){return Jt}function ti(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),r=-1===i?"":e.slice(i+1),s=Yt[Jt]??Yt[Qt],o=Yt[Qt],n=s?.[a]?.[r]??o?.[a]?.[r];let l="string"==typeof n?n:e;if(t)for(const[c,d]of Object.entries(t))l=l.replaceAll(`{${c}}`,String(d));return l}var ii=Object.defineProperty,ai=Object.getOwnPropertyDescriptor,ri=(e,t,i,a)=>{for(var r,s=a>1?void 0:a?ai(t,i):t,o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a?r(t,i,s):r(s))||s);return a&&s&&ii(t,i,s),s};class si extends fe{constructor(){super(...arguments),this._lang=ei()}set hass(e){this._hass=e,e?.language&&Zt(e.language)&&(this._lang=ei())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[Lt,m`
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
    `]}render(){return this._lang,Z`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${ti("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${ti("editor.open_config")}</a>
        </p>
      </div>
    `}}ri([Se({attribute:!1})],si.prototype,"hass",1),ri([Te()],si.prototype,"_lang",2);try{customElements.define("glass-card-editor",si)}catch{}function oi(e){try{const t=class extends si{};customElements.define(e,t)}catch{}}var ni=Object.defineProperty,li=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ni(t,i,s),s};class ci extends fe{constructor(){super(...arguments),this.configPreview=!1,this._lang=ei(),this._busCleanups=[],this._marqueeCleanup=null,this._cardSize="md",this._gestureTimer=0,this._gestureFired=!1,this._gestureStart=null,this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}static getStubConfig(){return{}}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){var t;super.updated(e),e.has("hass")&&this.hass?.language&&Zt(this.hass.language)&&(this._lang=ei()),e.has("hass")&&this.hass&&(t=this.hass)&&t.connection&&t.connection!==n&&(c||(l&&(l(),l=null),n=t.connection,c=(async()=>{try{l=await t.connection.subscribeEvents(e=>{const t=e.data??{},a=t.section;if(!a)return;if("rooms"===a&&t.area_id)return void i.emit("room-config-changed",{areaId:t.area_id});if("entity_schedules"===a&&t.entity_id)return void i.emit("schedule-changed",{entityId:t.entity_id});const r=o[a];r&&i.emit(r,void 0)},"glass_cards_config_changed")}catch(e){console.warn("[glass-cards] HA event bridge failed to subscribe",e),n=null}finally{c=null}})()))}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0),this._marqueeCleanup=function(e){if(!e)return()=>{};const t=e=>{const t=e.querySelector(".marquee-inner");if(!t)return;e.classList.remove("scrolling");const i=t.dataset.text??t.textContent?.split("   ")[0]??"";t.dataset.text=i,t.textContent=i,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.scrollWidth>e.clientWidth+1&&(t.textContent=`${i}   ${i}   `,e.classList.add("scrolling"))})})},i=new ResizeObserver(e=>{for(const i of e)t(i.target)}),a=new MutationObserver(()=>{s()}),r=new Set,s=()=>{e.querySelectorAll(".marquee").forEach(e=>{r.has(e)||(r.add(e),i.observe(e),t(e))});for(const e of r)e.isConnected||(i.unobserve(e),r.delete(e))};return a.observe(e,{childList:!0,subtree:!0}),s(),()=>{i.disconnect(),a.disconnect(),r.clear()}}(this.shadowRoot),this._ro=new ResizeObserver(e=>{const t=e[0]?.contentRect.width??this.offsetWidth;this._applyCardSize(t)}),this._ro.observe(this)}_applyCardSize(e){let t="xl";e<ye?t="xs":e<we?t="sm":e<xe?t="md":e<ke&&(t="lg"),t!==this._cardSize&&(this._cardSize=t,this.setAttribute("size",t))}_listen(e,t){this._busCleanups.push(i.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0),this._marqueeCleanup?.(),this._marqueeCleanup=null,this._ro?.disconnect(),this._ro=void 0,clearTimeout(this._gestureTimer)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_bindGesture(e){return this.configPreview?{pointerdown:()=>{},pointerup:()=>{},pointermove:()=>{},pointercancel:()=>{},contextmenu:()=>{}}:{pointerdown:t=>this._onGestureDown(t,e),pointerup:t=>this._onGestureUp(t,e),pointermove:e=>this._onGestureMove(e),pointercancel:()=>this._onGestureCancel(),contextmenu:e=>e.preventDefault()}}_safeCallService(e,t,i,a){!this.configPreview&&this.hass&&this.hass.callService(e,t,i,a)}_onGestureDown(e,t){t.exclude&&e.target.closest(t.exclude)||(this._gestureStart={x:e.clientX,y:e.clientY,t:Date.now()},this._gestureFired=!1,clearTimeout(this._gestureTimer),t.onLongPress&&(this._gestureTimer=window.setTimeout(()=>{this._gestureFired=!0,di(this,"light"),t.onLongPress()},500)))}_onGestureUp(e,t){if(clearTimeout(this._gestureTimer),this._gestureFired||!this._gestureStart)return void(this._gestureStart=null);const i=e.clientX-this._gestureStart.x,a=Date.now()-this._gestureStart.t;this._gestureStart=null,t.onSwipe&&Math.abs(i)>50&&a<500?t.onSwipe(i<0?"left":"right"):t.onTap?.()}_onGestureMove(e){if(this._gestureFired||!this._gestureStart)return;const t=Math.abs(e.clientX-this._gestureStart.x),i=Math.abs(e.clientY-this._gestureStart.y);(t>15||i>15)&&(clearTimeout(this._gestureTimer),i>t&&(this._gestureStart=null))}_onGestureCancel(){clearTimeout(this._gestureTimer),this._gestureStart=null}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function di(e,t="light"){e.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:t}))}function hi(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}function pi(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&hi(t,i)===e)}function ui(e,t){if(!t)return!0;const i=t[e];if(!i||0===i.periods.length)return!0;const a=new Date;return i.periods.some(e=>{const t=new Date(e.start),i=new Date(e.end);if(i.setSeconds(59,999),e.recurring){const e=new Date(a.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),r=new Date(a.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999);if(e<=r)return a>=e&&a<=r;const s=new Date(a.getFullYear()+1,i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999),o=new Date(a.getFullYear()-1,t.getMonth(),t.getDate(),t.getHours(),t.getMinutes());return a>=e&&a<=s||a>=o&&a<=r}return a>=t&&a<=i})}function gi(e,t,i){const a=i?.length?i:Object.keys(t.areas??{});if(0===a.length)return[];const r=[];for(const s of a)for(const i of pi(s,t.entities,t.devices))i.entity_id.startsWith(`${e}.`)&&r.push(i.entity_id);return r}li([Se({attribute:!1})],ci.prototype,"hass"),li([Se({type:Boolean,attribute:"config-preview"})],ci.prototype,"configPreview"),li([Te()],ci.prototype,"_lang");class mi{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}oi("glass-light-card-editor");var _i=Object.defineProperty,fi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&_i(t,i,s),s};const vi=[[3e3,"light.temp_warm","#ffd4a3"],[4e3,"light.temp_warm","#ffedb3"],[4800,"light.temp_neutral","#fff5e6"],[9999,"light.temp_cold","#e0ecf5"]];function bi(e){for(const[t,i,a]of vi)if(e<t)return{label:ti(i),color:a};return{label:ti("light.temp_cold"),color:"#e0ecf5"}}function yi(e,t){return`rgba(${e[0]},${e[1]},${e[2]},${t})`}const wi=[[251,191,36],[248,113,113],[244,114,182],[167,139,250],[129,140,248],[96,165,250],[74,222,128],[240,240,240]];const xi=["off","candle","fire"];class ki extends ci{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null,this._showHeader=!0,this._lightConfigLoaded=!1,this._throttleTimers=new Map,this._roomConfig=null,this._roomConfigLoaded=!1,this._lightsFingerprint="",this._schedules=null,this._schedulesLoaded=!1,this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._wheelCanvas=null}static getConfigElement(){return document.createElement("glass-light-card-editor")}get _isDashboardMode(){return!(this.areaId||this._config?.area)&&!this._config?.entity}static{this.styles=[Lt,Pt,Mt,jt,Ot,Rt,Kt,m`
      :host {
        width: 100%;
        max-width: 31.25rem;
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
      /* No row-level hover: the row contains its own interactive buttons
         (icon-toggle + expand) which carry their own hover/active states. */
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
        text-overflow: ellipsis;
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
      /* In a compact pair, anchor the separator under the opened light only
         so the user can tell which fold belongs to which lamp. */
      .fold-sep.fold-sep-left  { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-right: auto; }
      .fold-sep.fold-sep-right { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-left: auto; }
      .fold-sep.visible { opacity: 1; }
      .ctrl-panel {
        padding: 0.375rem 0 0.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
      }
      /* ── Fold sections (Intensité / Température / Couleur / Effets) ── */
      .ctrl-panel {
        gap: 0.75rem;
      }
      .light-section {
        display: flex; flex-direction: column; gap: 0.4375rem;
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
      /* ── Effect pills row ── */
      .effect-row {
        display: flex; flex-wrap: wrap; gap: 0.375rem;
        padding: 0.125rem 0;
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
        position: relative;
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.08) 0%, rgba(var(--rgb-white),0.03) 50%, rgba(var(--rgb-white),0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2);
        border-radius: var(--radius-xl);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.875rem;
        box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 8px 32px rgba(var(--rgb-black),0.4), 0 2px 8px rgba(var(--rgb-black),0.15);
        max-width: 18.75rem;
        width: 90vw;
      }
      /* Close icon top-right (positioning only — visual handled by <glass-icon-button>) */
      .cp-close-x { position: absolute; top: 0.375rem; right: 0.375rem; }

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
      /* Compact preview row: swatch + hex code on one line */
      .cp-preview-row {
        display: inline-flex; align-items: center; gap: 0.625rem;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .cp-swatch {
        width: 1.625rem; height: 1.625rem; border-radius: var(--radius-sm);
        border: 1px solid rgba(var(--rgb-white), 0.15);
        box-shadow: inset 0 0 0 1px rgba(var(--rgb-black), 0.15);
      }
      .cp-hex {
        font-size: var(--fz-base); font-weight: 600; color: var(--t2);
        font-family: monospace; letter-spacing: 0.5px;
      }

      /* Focus-visible ring (legacy non-primitive buttons) */
      .light-expand-btn:focus-visible,
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
    `]}setConfig(e){super.setConfig(e)}getCardSize(){if(this._isDashboardMode){const e=this._getLights().length;return 0===e?1:Math.min(e,6)+1}return 3}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null),null!==this._colorPickerEntity&&(this._colorPickerEntity=null,this._colorPickerPos=null)}connectedCallback(){super.connectedCallback(),this._listen("room-config-changed",e=>{const t=this.areaId||this._config?.area;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._dashboardTotalCache=void 0,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadDashboardHidden())}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadSchedules()}),this._listen("light-config-changed",()=>{this._lightConfigLoaded=!1,this._loadLightConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear(),this._backend=void 0,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1}async _loadRoomConfig(){const e=this.areaId||this._config?.area;if(e&&this.hass&&!this._roomConfigLoaded){this._roomConfigLoaded=!0,this._lastLoadedAreaId=e;try{this._backend||(this._backend=new mi(this.hass));const t=await this._backend.send("get_room",{area_id:e});if((this.areaId||this._config?.area)!==e)return;this._roomConfig=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadLightConfig(){if(this.hass&&!this._lightConfigLoaded){this._lightConfigLoaded=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_config");e?.light_card&&(this._showHeader=e.light_card.show_header??!0)}catch{}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new mi(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardTotalCache=void 0,this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedLightIds=void 0,this._lightsFingerprint="",this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear()}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?gi("light",this.hass,this.visibleAreaIds):this._getLights().map(e=>e.entity_id)}updated(e){super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._lightConfigLoaded&&this._loadLightConfig();const t=this.areaId||this._config?.area;if(t&&this.hass&&(this._lastLoadedAreaId!==t&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedLightIds=void 0,this._lightsFingerprint="")}e.has("visibleAreaIds")&&(this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardHiddenLoaded=!1);const i=this._getLightInfos();if(i.some(e=>e.isOn)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on"),e.has("hass")&&this._dragValues.size>0){let e=!1;const t=new Map(this._dragValues);for(const a of i){const i=`bri:${a.entityId}`,r=t.get(i);void 0!==r&&Math.abs(a.brightnessPct-r)<=2&&(t.delete(i),e=!0);const s=`temp:${a.entityId}`,o=t.get(s);void 0!==o&&null!==a.colorTempKelvin&&Math.abs(a.colorTempKelvin-o)<=50&&(t.delete(s),e=!0)}e&&(this._dragValues=t)}if(this._colorPickerEntity){const e=this.renderRoot.querySelector(".cp-wheel-wrap canvas");e&&e.dataset.drawnFor!==this._colorPickerEntity&&(!function(e){const t=e.getBoundingClientRect(),i=Math.round(t.width)||220,a=window.devicePixelRatio||1;e.width=i*a,e.height=i*a;const r=e.getContext("2d");if(!r)return;r.scale(a,a);const s=i/2,o=i/2,n=i/2;for(let l=0;l<360;l++){const e=(l-1)*Math.PI/180,t=(l+1)*Math.PI/180,i=r.createRadialGradient(s,o,0,s,o,n),[a,c,d]=Bt(l,1);i.addColorStop(0,"#ffffff"),i.addColorStop(1,`rgb(${a},${c},${d})`),r.beginPath(),r.moveTo(s,o),r.arc(s,o,n,e,t),r.closePath(),r.fillStyle=i,r.fill()}}(e),e.dataset.drawnFor=this._colorPickerEntity)}}_getLights(){if(!this.hass)return[];const e=this._getLightIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._lightsFingerprint&&this._cachedLightsResult)return this._cachedLightsResult;let i;return this._lightsFingerprint=t,i=this._isDashboardMode?e.map(e=>this.hass?.states[e]).filter(e=>!!e&&"on"===e.state&&ui(e.entity_id,this._schedules)).sort((e,t)=>{const i=e.attributes.friendly_name||e.entity_id,a=t.attributes.friendly_name||t.entity_id;return i.localeCompare(a)}):e.map(e=>this.hass?.states[e]).filter(e=>void 0!==e),this._cachedLightsResult=i,i}_getLightIds(){return this._cachedLightIds||(this._cachedLightIds=this._computeLightIds()),this._cachedLightIds}_computeLightIds(){if(!this.hass)return[];const e=this.areaId||this._config?.area;if(e){const t=this._config?.hidden_entities??[],i=this._roomConfig?.hidden_entities??[],a=new Set([...t,...i]),r=pi(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light.")&&!a.has(e.entity_id)&&ui(e.entity_id,this._schedules)).map(e=>e.entity_id),s=this._config?.entity_order??[],o=s.length>0?s:this._roomConfig?.entity_order??[];if(o.length>0){const e=new Map;o.forEach((t,i)=>e.set(t,i)),r.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return r}if(this._config?.entity)return ui(this._config.entity,this._schedules)&&this.hass.states[this._config.entity]?[this._config.entity]:[];if(this._isDashboardMode){const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of pi(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getDashboardLightTotal(){if(!this.hass||!this.hass.entities||!this.hass.devices)return 0;if(void 0!==this._dashboardTotalCache&&this._dashboardTotalEntitiesRef===this.hass.entities)return this._dashboardTotalCache;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length)return 0;const t=new Set;for(const i of e)for(const e of pi(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.add(e.entity_id);return this._dashboardTotalEntitiesRef=this.hass.entities,this._dashboardTotalCache=t.size,t.size}_getLightInfos(){return this._getLights().map(e=>this._buildLightInfo(e))}_buildLightInfo(e){const t="on"===e.state,i=function(e){const t=e.attributes.supported_color_modes;return t&&0!==t.length?t.some(e=>["hs","rgb","rgbw","rgbww","xy"].includes(e))?"rgb":t.includes("color_temp")?"color_temp":t.includes("brightness")?"dimmable":"simple":void 0!==e.attributes.brightness?"dimmable":"simple"}(e),a=e.attributes.brightness,r=t?void 0!==a?Math.round(a/255*100):100:0;let s=null;const o=e.attributes.min_color_temp_kelvin||2e3,n=e.attributes.max_color_temp_kelvin||6500;t&&"color_temp"===i&&(s=e.attributes.color_temp_kelvin||null);let l=null;t&&"rgb"===i&&(l=e.attributes.rgb_color||null);const c=this.hass?.entities[e.entity_id]?.icon,d=e.attributes.icon,h=c||d||"mdi:lightbulb";return{entity:e,entityId:e.entity_id,name:e.attributes.friendly_name||e.entity_id,icon:h,isOn:t,type:i,brightnessPct:r,colorTempKelvin:s,minKelvin:o,maxKelvin:n,rgbColor:l}}_toggleLight(e){di(this,"light"),this._safeCallService("light","toggle",{},{entity_id:e})}_toggleAll(){di(this,"light");const e=this._getLights(),t=e.some(e=>"on"===e.state),i=t?"turn_off":"turn_on",a=e.map(e=>e.entity_id);this._safeCallService("light",i,{},{entity_id:a}),t&&(this._expandedEntity=null)}_turnAllOff(){const e=this._getLights().map(e=>e.entity_id);this._safeCallService("light","turn_off",{},{entity_id:e}),this._expandedEntity=null}_hasControls(e){if("simple"!==e.type)return!0;const t=e.entity.attributes.effect_list;if(t&&t.length>0){const e=t.map(e=>e.toLowerCase());if(xi.filter(t=>"off"===t||e.includes(t)).length>1)return!0}return!1}_expandFold(e,t,i){i||(i=this._getLightInfos().find(t=>t.entityId===e)),i&&!this._hasControls(i)||(t?this._expandedEntity===e?this._expandedEntity=null:this._expandedEntity=e:this._toggleLight(e))}_onSliderInput(e,t,i){const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a;const r=this._throttleTimers.get(e);void 0!==r&&clearTimeout(r),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),i(this._dragValues.get(e)??t)},100))}_onSliderChange(e,t,i){di(this,"light");const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a,i(t);const r=this._throttleTimers.get(e);void 0!==r&&clearTimeout(r),this._throttleTimers.delete(e)}_setBrightness(e,t){this._safeCallService("light","turn_on",{brightness_pct:t},{entity_id:e})}_setColorTemp(e,t){this._safeCallService("light","turn_on",{color_temp_kelvin:t},{entity_id:e})}_setHsColor(e,t,i){this._safeCallService("light","turn_on",{hs_color:[t,100*i]},{entity_id:e})}_setEffect(e,t){this._safeCallService("light","turn_on",{effect:t},{entity_id:e})}_openColorPicker(e,t){this._colorPickerEntity=e,this._colorPickerRgb=t??[255,255,255],this._colorPickerPos=t?function(e){const{h:t,s:i}=Ut(e),a=Math.min(i,1),r=t*Math.PI/180;return{x:Math.cos(r)*a*50+50,y:Math.sin(r)*a*50+50}}(t):null,this._colorPickerHs=t?Ut(t):null}_closeColorPicker(){this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null}_onWheelInteraction(e){const t=this._wheelCanvas;if(!t)return;const i=function(e,t,i){const a=e.getBoundingClientRect(),r=t-a.left-a.width/2,s=i-a.top-a.height/2,o=a.width/2,n=Math.sqrt(r*r+s*s),l=Math.min(n,o),c=(180*Math.atan2(s,r)/Math.PI%360+360)%360,d=l/o,h=Bt(c,d),p=n>0?l/n:1;return{rgb:h,hex:Wt(h),hs:{h:c,s:d},pos:{x:r*p/o*50+50,y:s*p/o*50+50}}}(t,"touches"in e?e.touches[0].clientX:e.clientX,"touches"in e?e.touches[0].clientY:e.clientY);if(this._colorPickerPos=i.pos,this._colorPickerRgb=i.rgb,this._colorPickerHs=i.hs,this._colorPickerEntity){const e=`cp:${this._colorPickerEntity}`,t=this._throttleTimers.get(e);void 0!==t&&clearTimeout(t),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},150))}}_getEntityLayout(e){const t=this._config?.entity_layouts??{},i=this._roomConfig?.entity_layouts??{};return"full"===(t[e]||i[e])?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_buildLayout(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;r?(t.push({kind:"compact-pair",left:a,right:r}),i+=2):(t.push({kind:"full",light:a}),i++)}else t.push({kind:"full",light:a}),i++}return t}_computeTint(e){const t=e.filter(e=>e.isOn);if(0===t.length)return null;const i=t.length/e.length,a=t.reduce((e,t)=>e+(t.brightnessPct??100),0)/t.length/100*(.55+.45*i)*.22;let r="#fbbf24";const s=[...t].sort((e,t)=>(t.brightnessPct??0)-(e.brightnessPct??0)),o=s.find(e=>"rgb"===e.type&&e.rgbColor),n=s.find(e=>"color_temp"===e.type&&e.colorTempKelvin);return o?.rgbColor?r=Wt(o.rgbColor):n?.colorTempKelvin&&(r=bi(n.colorTempKelvin).color),{background:`radial-gradient(ellipse at 30% 30%, ${r}, transparent 70%)`,opacity:a.toFixed(3)}}_renderSubText(e){if(!e.isOn)return Z`<span class="light-brightness-text">${ti("common.off")}</span>`;if("simple"===e.type)return Z`<span class="light-brightness-text">${ti("common.on")}</span>`;const t=[Z`<span class="light-brightness-text">${e.brightnessPct}%</span>`];if("color_temp"===e.type&&e.colorTempKelvin){const i=bi(e.colorTempKelvin);t.push(Z`<span class="light-temp-dot" style="background:${i.color}"></span>`),t.push(Z`<span class="light-temp-text">${i.label}</span>`)}if("rgb"===e.type&&e.rgbColor){const i=Wt(e.rgbColor);t.push(Z`<span class="light-temp-dot" style="background:${i}"></span>`),t.push(Z`<span class="light-temp-text">${ti("light.color")}</span>`)}return t}_renderLightRow(e,t,i){const a=Gt(e.entity.state),r=["light-row",t?"compact":"",i?"compact-right":"",a?"entity-unavailable":""].filter(Boolean).join(" "),s=e.isOn&&"rgb"===e.type&&e.rgbColor?`--light-rgb:${Wt(e.rgbColor)};--light-rgb-bg:${yi(e.rgbColor,.1)};--light-rgb-border:${yi(e.rgbColor,.15)};--light-rgb-glow:${yi(e.rgbColor,.4)};--light-rgb-sub:${yi(e.rgbColor,.55)}`:"",o=e.isOn&&e.rgbColor?`${e.rgbColor[0]},${e.rgbColor[1]},${e.rgbColor[2]}`:"light-glow",n=this._bindGesture({onTap:()=>this._toggleLight(e.entityId),onLongPress:()=>this._expandFold(e.entityId,e.isOn,e),exclude:"glass-icon-button"});return Z`
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
        <glass-icon-button
          .icon=${e.icon}
          ?active=${e.isOn}
          ?glow=${e.isOn}
          ?unavailable=${a}
          .activeColor=${o}
          aria-label="${ti("light.toggle_aria",{name:e.name})}"
          @click=${()=>this._toggleLight(e.entityId)}
        ></glass-icon-button>
        <button
          class="light-expand-btn"
          aria-label="${e.isOn?ti("light.expand_aria",{name:e.name}):e.name}"
          aria-expanded=${e.isOn?this._expandedEntity===e.entityId?"true":"false":ie}
        >
          <div class="light-info">
            <div class="light-name">${e.name}</div>
            <div class="light-sub">${this._renderSubText(e)}</div>
          </div>
          ${a?Z`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:Z`<span class="light-dot"></span>`}
        </button>
      </div>
    `}_getSliderColor(e){if("rgb"===e.type&&e.rgbColor){const[t,i,a]=e.rgbColor;return`${t},${i},${a}`}if("color_temp"===e.type&&e.colorTempKelvin){const t=bi(e.colorTempKelvin).color;return`${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)}`}return"var(--rgb-light-glow)"}_getFoldColor(e){if(e.rgbColor)return`rgba(${e.rgbColor[0]},${e.rgbColor[1]},${e.rgbColor[2]},0.3)`;if("color_temp"===e.type&&e.colorTempKelvin){const{color:t}=bi(e.colorTempKelvin);return`rgba(${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)},0.3)`}return"rgba(var(--rgb-light-glow),0.25)"}_getLightTintStyle(e){if("rgb"===e.type&&e.rgbColor){const[t,i,a]=e.rgbColor;return`--light-tint:rgb(${t},${i},${a});--light-tint-glow:rgba(${t},${i},${a},0.45)`}if("color_temp"===e.type&&e.colorTempKelvin){const t=bi(e.colorTempKelvin).color,i=parseInt(t.slice(1,3),16),a=parseInt(t.slice(3,5),16),r=parseInt(t.slice(5,7),16);return`--light-tint:${t};--light-tint-glow:rgba(${i},${a},${r},0.45)`}return""}_renderControlFold(e,t="full"){const i=this._expandedEntity===e.entityId&&e.isOn,a="rgb"===e.type,r=this._getSliderColor(e),s=this._getFoldColor(e),o=this._getLightTintStyle(e);return Z`
      <div class="fold-sep fold-sep-${t} ${i?"visible":""}" style="--fold-color:${s}"></div>
      <div class="ctrl-fold ${i?"open":""}" style=${o}>
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${a}>
            ${"simple"!==e.type?Z`
              <div class="light-section">
                <glass-section-title label=${ti("light.section_brightness")}></glass-section-title>
                ${this._renderBrightnessSlider(e,r)}
              </div>
            `:ie}
            ${"color_temp"===e.type?Z`
              <div class="light-section">
                <glass-section-title label=${ti("light.section_temperature")}></glass-section-title>
                ${this._renderTempSlider(e)}
              </div>
            `:ie}
            ${"rgb"===e.type?Z`
              <div class="light-section">
                <glass-section-title label=${ti("light.section_color")}></glass-section-title>
                ${this._renderColorRow(e)}
              </div>
            `:ie}
            ${this._renderEffectsSection(e)}
          </div>
        </div>
      </div>
    `}_renderEffectsSection(e){const t=this._renderEffectChips(e);return t===ie?ie:Z`
      <div class="light-section">
        <glass-section-title label=${ti("light.section_effects")}></glass-section-title>
        ${t}
      </div>
    `}_renderColorRow(e){return Z`
      <div class="color-row">
        ${wi.map(t=>{const i=!!e.rgbColor&&function(e,t){const i=Ut(e),a=Ut(t),r=Math.abs(i.h-a.h);return(r<5||r>355)&&Math.abs(i.s-a.s)<.08}(e.rgbColor,t),a=Wt(t);return Z`
            <glass-color-swatch
              .color=${a}
              ?selected=${i}
              aria-label="${ti("light.color_aria",{hex:a})}"
              @click=${()=>{const i=Ut(t);this._setHsColor(e.entityId,i.h,i.s)}}
            ></glass-color-swatch>
          `})}
        <button
          class="color-picker-btn"
          @click=${()=>this._openColorPicker(e.entityId,e.rgbColor)}
          aria-label="${ti("light.color_picker_aria")}"
        ></button>
      </div>
    `}_renderEffectChips(e){const t=e.entity.attributes.effect_list;if(!t||0===t.length)return ie;const i=xi.filter(e=>"off"===e||t.includes(e));if(i.length<=1)return ie;const a=e.entity.attributes.effect?.toLowerCase();return Z`
      <div class="effect-row">
        ${i.map(t=>Z`
            <glass-chip
              size="sm"
              active-color="light-glow"
              ?active=${a===t||!a&&"off"===t}
              .icon=${function(e){switch(e){case"off":return"mdi:flash-off";case"candle":return"mdi:candle";case"fire":return"mdi:fire";default:return"mdi:auto-fix"}}(t)}
              aria-label="${ti(`light.effect_${t}`)}"
              @click=${()=>this._setEffect(e.entityId,t)}
            >${ti(`light.effect_${t}`)}</glass-chip>
          `)}
      </div>
    `}_renderColorPicker(){if(!this._colorPickerEntity||!this._colorPickerRgb)return ie;const e=Wt(this._colorPickerRgb);return Z`
      <div class="color-picker-overlay" role="presentation" @click=${e=>{e.target.classList.contains("color-picker-overlay")&&this._closeColorPicker()}}>
        <div class="color-picker-dialog" role="dialog" aria-modal="true" aria-label="${ti("light.color_picker_title")}">
          <glass-icon-button
            class="cp-close-x"
            size="sm"
            .icon=${"mdi:close"}
            aria-label="${ti("common.close")}"
            @click=${()=>this._closeColorPicker()}
          ></glass-icon-button>
          <div class="cp-wheel-wrap">
            <canvas
              @mousedown=${e=>{this._wheelCanvas=e.currentTarget,this._onWheelInteraction(e);const t=e=>this._onWheelInteraction(e),i=()=>{a(),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},a=()=>{window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",i),this._cancelWheelDrag=void 0};window.addEventListener("mousemove",t),window.addEventListener("mouseup",i),this._cancelWheelDrag=a}}
              @touchstart=${e=>{e.preventDefault(),this._wheelCanvas=e.currentTarget,this._onWheelInteraction(e);const t=e=>{e.preventDefault(),this._onWheelInteraction(e)},i=()=>{a(),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},a=()=>{window.removeEventListener("touchmove",t),window.removeEventListener("touchend",i),window.removeEventListener("touchcancel",i),this._cancelWheelDrag=void 0};window.addEventListener("touchmove",t,{passive:!1}),window.addEventListener("touchend",i),window.addEventListener("touchcancel",i),this._cancelWheelDrag=a}}
            ></canvas>
            <div class="cp-cursor" style="left:${this._colorPickerPos?.x??50}%;top:${this._colorPickerPos?.y??50}%;background:${e}"></div>
          </div>
          <div class="cp-preview-row">
            <div class="cp-swatch" style="background:${e}"></div>
            <span class="cp-hex">${e}</span>
          </div>
        </div>
      </div>
    `}_renderBrightnessSlider(e,t){const i=`bri:${e.entityId}`,a=this._dragValues.get(i)??e.brightnessPct;return Z`
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
    `}_renderTempSlider(e){const t=`temp:${e.entityId}`,i=e.colorTempKelvin||e.minKelvin,a=this._dragValues.get(t)??i,r=bi(a).color,s=`${parseInt(r.slice(1,3),16)},${parseInt(r.slice(3,5),16)},${parseInt(r.slice(5,7),16)}`;return Z`
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
    `}_renderGrid(e){const t=this._buildLayout(e),i=[];for(const a of t)"full"===a.kind?(i.push(this._renderLightRow(a.light,!1,!1)),i.push(this._renderControlFold(a.light,"full"))):(i.push(this._renderLightRow(a.left,!0,!1)),a.right&&i.push(this._renderLightRow(a.right,!0,!0)),i.push(this._renderControlFold(a.left,"left")),a.right&&i.push(this._renderControlFold(a.right,"right")));return i}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],r=i+1<e.length?e[i+1]:null;r?(t.push(Z`
          ${this._renderLightRow(a,!0,!1)}
          ${this._renderLightRow(r,!0,!0)}
          ${this._renderControlFold(a,"left")}
          ${this._renderControlFold(r,"right")}
        `),i+=2):(t.push(Z`
          ${this._renderLightRow(a,!1,!1)}
          ${this._renderControlFold(a,"full")}
        `),i++)}return t}_renderDashboard(){const e=this._getLightInfos();if(0===e.length)return ie;const t=e.slice(0,6),i=e.length-6,a=this._computeTint(e),r=e.length,s=Math.max(this._getDashboardLightTotal(),r),o=r===s?"all":"some";return Z`
      ${this._showHeader?Z`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${ti("light.dashboard_title")}</span>
            <span class="card-count ${o}">${r}/${s}</span>
          </div>
          <glass-toggle
            active-color="light-glow"
            .checked=${!0}
            aria-label="${ti("light.dashboard_turn_all_off_aria")}"
            @glass-toggle-change=${()=>this._turnAllOff()}
          ></glass-toggle>
        </div>
      `:ie}

      <div class="card glass">
        <div
          class="tint"
          style=${a?`background:${a.background};opacity:${a.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(t)}
          </div>
          ${i>0?Z`<div class="dashboard-overflow">
                ${ti("light.dashboard_overflow",{count:String(i)})}
              </div>`:ie}
        </div>
      </div>
      ${this._renderColorPicker()}
    `}render(){if(this._lang,this._isDashboardMode){const e=this._renderDashboard();return this.style.display=e===ie?"none":"",e}const e=this._getLightInfos();if(0===e.length)return this.style.display="none",ie;this.style.display="";const t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,r=0===t?"none":t===i?"all":"some",s=this._computeTint(e);return Z`
      ${this._showHeader?Z`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${ti("light.title")}</span>
            <span class="card-count ${r}">${t}/${i}</span>
          </div>
          <glass-toggle
            active-color="light-glow"
            .checked=${a}
            aria-label="${ti(a?"light.toggle_all_on_aria":"light.toggle_all_off_aria")}"
            @glass-toggle-change=${()=>this._toggleAll()}
          ></glass-toggle>
        </div>
      `:ie}

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
    `}}fi([Se({attribute:!1})],ki.prototype,"areaId"),fi([Se({attribute:!1})],ki.prototype,"visibleAreaIds"),fi([Te()],ki.prototype,"_expandedEntity"),fi([Te()],ki.prototype,"_dragValues"),fi([Te()],ki.prototype,"_colorPickerEntity"),fi([Te()],ki.prototype,"_colorPickerRgb"),fi([Te()],ki.prototype,"_colorPickerPos"),fi([Te()],ki.prototype,"_showHeader");try{customElements.define("glass-light-card",ki)}catch{}oi("glass-room-popup-editor");var $i=Object.defineProperty,Ci=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&$i(t,i,s),s};const Si=class e extends fe{constructor(){super(...arguments),this._lang=ei(),this._areaId=null,this._open=!1,this._scenesOpen=!1,this._activeSceneId=null,this._peekedRooms=new Set,this._boundKeydown=this._onKeydown.bind(this),this._roomConfigs=new Map,this._loadingRooms=new Set,this._busCleanups=[],this._swipeClass="",this._flashingBtnIdx=null,this._flashingTimer=null,this._swipeAnimating=!1,this._popupAutoClose=0,this._globalConfigLoaded=!1}static getConfigElement(){return document.createElement("glass-room-popup-editor")}getCardSize(){return 0}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;if(this._swipeAnimating)return!1;if(!this._open)return!1;const t=e.get("hass");if(!t||!this.hass||!this._areaId)return!0;const i=pi(this._areaId,this.hass.entities,this.hass.devices),a=this.hass;return i.some(e=>t.states[e.entity_id]!==a.states[e.entity_id])}static{this.styles=[Lt,Pt,Mt,Rt,m`
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
        touch-action: none;
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
      /* Music pulse on the room header icon — the ha-icon is passed as
         a slot child so it lives in this card's shadow DOM and the
         selector reaches it normally. */
      glass-icon-button.header-icon.has-music > ha-icon {
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
      /* Cap labelled room-action buttons so the room name keeps space. */
      glass-button.room-action-btn { max-width: 8rem; }
      /* Match the 32px height of the icon-only siblings (glass-icon-button
         size=sm) so the header reads as a single compact action row. */
      glass-button.room-action-btn::part(button) {
        min-height: 2rem;
        padding: 0 0.625rem;
      }
      glass-button.room-action-btn.flashing,
      glass-icon-button.room-action-btn.flashing {
        animation: room-btn-flash 0.4s ease;
      }
      @keyframes room-btn-flash {
        0%, 100% { background: var(--s2); }
        50%      { background: rgba(var(--rgb-accent), 0.25); }
      }

      /* Scene grid fold */
      .scenes-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.6s var(--ease-std);
        contain: layout style;
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
      /* Scenes are styled by <glass-chip>; force the uppercase eyebrow
         treatment that the room popup uses (the design specifically
         wants scenes to read as labels, not headings). */
      glass-chip.scene-chip {
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

    `]}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigs.clear(),this._loadingRooms.clear()),this.hass.language&&Zt(this.hass.language)&&(this._lang=ei()))}_listen(e,t){this._busCleanups.push(i.on(e,t))}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._listen("popup-open",e=>this._handleOpen(e)),this._listen("popup-close",()=>this._handleClose()),this._listen("room-config-changed",e=>{void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._roomConfigs.delete(e.areaId),this._peekedRooms.delete(e.areaId),this._areaId===e.areaId&&this._loadRoomConfig(e.areaId)}),this._listen("navbar-config-changed",()=>{void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._roomConfigs.clear(),this._loadingRooms.clear(),this._globalConfigLoaded=!1,this._loadGlobalConfig(),this._areaId&&this._loadRoomConfig(this._areaId)}),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),void 0!==this._autoCloseTimeout&&(clearTimeout(this._autoCloseTimeout),this._autoCloseTimeout=void 0),null!==this._flashingTimer&&(clearTimeout(this._flashingTimer),this._flashingTimer=null),this._flashingBtnIdx=null,this._peekedRooms.clear(),this._loadingRooms.clear(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],this._backend=void 0,void 0!==this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=void 0),this._swipeAnimating=!1,this._swipeClass="",this._pendingSwipe=void 0,this._currentRoomIndex=void 0,document.removeEventListener("keydown",this._boundKeydown)}_collapseExpanded(){this._scenesOpen&&(this._scenesOpen=!1)}_handleOpen(e){if(this._loadGlobalConfig(),this._open&&this._areaId&&this._areaId!==e.areaId&&void 0!==e.roomIndex&&void 0!==this._currentRoomIndex){if(this._swipeAnimating)return void(this._pendingSwipe=e);const t=e.roomIndex>this._currentRoomIndex?"left":"right";return this._swipeAnimating=!0,this._swipeClass="left"===t?"swipe-exit-left":"swipe-exit-right",void 0!==this._autoCloseTimeout&&(clearTimeout(this._autoCloseTimeout),this._autoCloseTimeout=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void(this._swipeAnimTimer=setTimeout(()=>{this._swipeAnimTimer=void 0,this._areaId=e.areaId,this._currentRoomIndex=e.roomIndex,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(e.areaId),requestAnimationFrame(()=>requestAnimationFrame(()=>{this._swipeClass="left"===t?"swipe-enter-right":"swipe-enter-left",this._swipeAnimTimer=setTimeout(()=>{if(this._swipeAnimTimer=void 0,this._swipeClass="",this._swipeAnimating=!1,this._pendingSwipe){const e=this._pendingSwipe;this._pendingSwipe=void 0,this._handleOpen(e)}},220)}))},180))}this._swipeAnimating?this._pendingSwipe=e:(this._currentRoomIndex=e.roomIndex,void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),this._areaId=e.areaId,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(e.areaId),this._pendingRaf=requestAnimationFrame(()=>{this._pendingRaf=void 0,this._open=!0,this.setAttribute("open",""),this._lockScroll(!0)}))}_maybePeekScenes(e){if(this._peekedRooms.has(e))return;const t=this._getAreaMeta();t&&0!==t.scenes.length&&(this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&this._areaId===e&&(this._peekedRooms.add(e),this._scenesOpen=!0,this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&(this._scenesOpen=!1)},1e3))},400))}_handleClose(){void 0!==this._autoCloseTimeout&&(clearTimeout(this._autoCloseTimeout),this._autoCloseTimeout=void 0),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=void 0),this._swipeAnimating=!1,this._swipeClass="",this._pendingSwipe=void 0,this._currentRoomIndex=void 0,this._open=!1,this.removeAttribute("open"),this._lockScroll(!1),this._closeTimeout=setTimeout(()=>{this._areaId=null,this._closeTimeout=void 0},350)}_onKeydown(e){"Escape"===e.key&&this._open&&i.emit("popup-close",void 0)}_lockScroll(e){document.body.style.overflow=e?"hidden":"";const t=document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-panel-lovelace")?.shadowRoot?.querySelector("hui-root")?.shadowRoot?.querySelector(".container");t&&(t.style.overflow=e?"hidden":"")}async _loadGlobalConfig(){if(!this._globalConfigLoaded&&this.hass){this._globalConfigLoaded=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_config");this._popupAutoClose=e?.navbar?.popup_auto_close??0}catch{this._popupAutoClose=0}}}async _loadRoomConfig(e){if(this.hass)if(this._roomConfigs.has(e))this._open&&this._areaId===e&&(this._maybePeekScenes(e),this._startAutoCloseTimer(e));else if(!this._loadingRooms.has(e)){this._loadingRooms.add(e);try{this._backend||(this._backend=new mi(this.hass));const t=await this._backend.send("get_room",{area_id:e});this._roomConfigs.set(e,t),this._areaId===e&&this.requestUpdate()}catch{this._roomConfigs.set(e,null)}finally{this._loadingRooms.delete(e)}this._open&&this._areaId===e&&(this._maybePeekScenes(e),this._startAutoCloseTimer(e))}}_startAutoCloseTimer(e){void 0!==this._autoCloseTimeout&&(clearTimeout(this._autoCloseTimeout),this._autoCloseTimeout=void 0),this._popupAutoClose<=0||(this._autoCloseTimeout=setTimeout(()=>{this._autoCloseTimeout=void 0,this._open&&this._areaId===e&&i.emit("popup-close",void 0)},1e3*this._popupAutoClose))}_onOverlayClick(){i.emit("popup-close",void 0)}_getAreaMeta(){if(!this.hass||!this._areaId)return null;const e=this.hass.areas[this._areaId];if(!e)return null;const t=pi(this._areaId,this.hass.entities,this.hass.devices);let i=null,a=null,r=!1,s=!1,o=!1;const n=[],l=new Set,c=e;if(c.temperature_entity_id){const e=this.hass.states[c.temperature_entity_id];e&&"unavailable"!==e.state&&"unknown"!==e.state&&(i=`${e.state}${e.attributes.unit_of_measurement||"°C"}`)}if(c.humidity_entity_id){const e=this.hass.states[c.humidity_entity_id];e&&"unavailable"!==e.state&&"unknown"!==e.state&&(a=`${e.state}%`)}for(const m of t){const e=this.hass?.states[m.entity_id];if(!e)continue;const t=m.entity_id.split(".")[0];if(l.add(t),"light"===t&&"on"===e.state&&(s=!0),"media_player"===t&&"playing"===e.state&&(o=!0),"sensor"===t){const t=e.attributes.device_class,s="unavailable"===e.state||"unknown"===e.state;"temperature"!==t&&"humidity"!==t||!s||(r=!0),s||("temperature"!==t||i||(i=`${e.state}${e.attributes.unit_of_measurement||"°C"}`),"humidity"!==t||a||(a=`${e.state}%`))}"scene"===t&&n.push(e)}const d=this._roomConfigs.get(this._areaId),h=d?.icon??e.icon??"mdi:home",p=new Set(d?.hidden_scenes??[]),u=n.filter(e=>!p.has(e.entity_id)),g=d?.scene_order;if(g&&g.length>0){const e=new Map(g.map((e,t)=>[e,t]));u.sort((t,i)=>(e.get(t.entity_id)??1/0)-(e.get(i.entity_id)??1/0))}return{name:e.name,icon:h,temperature:i,humidity:a,sensorUnavailable:r,hasLight:s,hasMusic:o,scenes:u,domains:[...l]}}_activateScene(e){this._activeSceneId=e,this.hass?.callService("scene","turn_on",{},{entity_id:e})}static{this.DEFAULT_CARD_ORDER=["light","media_player","climate","fan","cover","camera","vacuum"]}_getVisibleCards(t){const i=this._areaId?this._roomConfigs.get(this._areaId):void 0,a=i?.card_order;return a&&a.length>0?a.filter(e=>t.includes(e)):e.DEFAULT_CARD_ORDER.filter(e=>t.includes(e))}_renderDomainCard(e){switch(e){case"light":return Z`<glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>`;case"cover":return Z`<glass-cover-card .hass=${this.hass} .areaId=${this._areaId}></glass-cover-card>`;case"media_player":return Z`<glass-media-card .hass=${this.hass} .areaId=${this._areaId}></glass-media-card>`;case"fan":return Z`<glass-fan-card .hass=${this.hass} .areaId=${this._areaId}></glass-fan-card>`;case"climate":return Z`<glass-climate-card .hass=${this.hass} .areaId=${this._areaId}></glass-climate-card>`;case"camera":return Z`<glass-camera-carousel-card .hass=${this.hass} .areaId=${this._areaId}></glass-camera-carousel-card>`;default:return ie}}render(){if(this._lang,!this._areaId)return ie;const e=this._getAreaMeta();if(!e)return ie;const t=e.scenes.length>0,a=this._getVisibleCards(e.domains);return Z`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${e.name}>
        <div class="dialog-inner ${this._swipeClass}">
        <div class="header">
          <div class="header-left">
            <glass-icon-button
              class="header-icon ${e.hasMusic?"has-music":""}"
              ?active=${e.hasLight}
              ?glow=${e.hasLight}
              active-color="light-glow"
              aria-label=${t?ti("popup.toggle_scenes_aria"):e.name}
              @click=${()=>t&&(this._scenesOpen=!this._scenesOpen)}
            ><ha-icon .icon=${e.icon}></ha-icon></glass-icon-button>
            <div class="scene-dash ${t?"visible":""}"></div>
          </div>
          <div class="header-info">
            <div class="header-name">${e.name}</div>
            <div class="header-meta">
              ${e.temperature?Z`<span>${e.temperature}</span>`:ie}
              ${e.humidity?Z`<span>${e.humidity}</span>`:ie}
              ${!e.sensorUnavailable||e.temperature||e.humidity?ie:Z`<span class="sensor-warn">${ti("popup.sensor_unavailable")}</span>`}
            </div>
          </div>
          ${this._renderRoomButtons()}
          <glass-icon-button
            size="sm"
            class="close-btn"
            .icon=${"mdi:close"}
            aria-label="${ti("popup.close_aria")}"
            @click=${()=>i.emit("popup-close",void 0)}
          ></glass-icon-button>
        </div>
        <div class="header-sep"></div>

        ${t?Z`
              <div class="scenes-wrapper ${this._scenesOpen?"open":""}">
                <div class="scenes-inner">
                  <div class="scene-chips">
                    ${e.scenes.map(e=>Z`
                        <glass-chip
                          size="sm"
                          class="scene-chip"
                          ?active=${this._activeSceneId===e.entity_id}
                          aria-label="${ti("popup.activate_scene_aria",{name:e.attributes.friendly_name||e.entity_id})}"
                          @click=${()=>this._activateScene(e.entity_id)}
                        >${e.attributes.friendly_name||e.entity_id}</glass-chip>
                      `)}
                  </div>
                </div>
              </div>
            `:ie}

        <div class="cards">
          ${a.map(e=>this._renderDomainCard(e))}
        </div>
        </div>
      </div>
    `}_renderRoomButtons(){if(!this._areaId)return ie;const e=this._roomConfigs.get(this._areaId),t=/^[a-z_][a-z0-9_]*\.[a-z_][a-z0-9_]*$/,i=(e?.buttons??[]).filter(e=>t.test(e.service));if(0===i.length)return ie;return Z`
      ${i.map((e,t)=>{const i="string"==typeof e.data?.entity_id?e.data.entity_id:"",a=i?i.split(".")[0]:"",r=i?this.hass?.states?.[i]:void 0,s=r?.attributes?.friendly_name||"",o=e.icon||((e,t)=>{const i={light:"mdi:lightbulb",switch:"mdi:toggle-switch",vacuum:"mdi:robot-vacuum-variant",cover:"mdi:window-shutter",climate:"mdi:thermostat",fan:"mdi:fan",media_player:"mdi:speaker",scene:"mdi:palette",script:"mdi:script-text",automation:"mdi:robot",input_boolean:"mdi:toggle-switch",button:"mdi:gesture-tap-button",lock:"mdi:lock",camera:"mdi:cctv",notify:"mdi:bell-outline",homeassistant:"mdi:home"};return i[t]||i[e.split(".")[0]]||"mdi:gesture-tap-button"})(e.service,a),n=e.label,l=!!n,c=this._flashingBtnIdx===t,d=n||s||(a?`${a} action`:"Action");return l?Z`
              <glass-button
                size="sm"
                variant="secondary"
                class="room-action-btn ${c?"flashing":""}"
                .icon=${o}
                aria-label=${d}
                title=${d}
                @click=${()=>this._invokeRoomButton(e,t)}
              >${n}</glass-button>
            `:Z`
              <glass-icon-button
                size="sm"
                class="room-action-btn icon-only ${c?"flashing":""}"
                .icon=${o}
                aria-label=${d}
                title=${d}
                @click=${()=>this._invokeRoomButton(e,t)}
              ></glass-icon-button>
            `})}
    `}_invokeRoomButton(e,t){if(!this.hass||!e.service)return;const i=e.service.indexOf(".");if(i<0)return;const a=e.service.slice(0,i),r=e.service.slice(i+1),s=e.data&&"object"==typeof e.data&&!Array.isArray(e.data)?e.data:{};this.hass.callService(a,r,s),this._flashingTimer&&clearTimeout(this._flashingTimer),this._flashingBtnIdx=t,this._flashingTimer=setTimeout(()=>{this._flashingBtnIdx=null,this._flashingTimer=null},400)}};Ci([Se({attribute:!1})],Si.prototype,"hass"),Ci([Te()],Si.prototype,"_lang"),Ci([Te()],Si.prototype,"_areaId"),Ci([Te()],Si.prototype,"_open"),Ci([Te()],Si.prototype,"_scenesOpen"),Ci([Te()],Si.prototype,"_activeSceneId"),Ci([Te()],Si.prototype,"_swipeClass"),Ci([Te()],Si.prototype,"_flashingBtnIdx");let Ti=Si;try{customElements.define("glass-room-popup",Ti)}catch{}oi("glass-navbar-card-editor");var Ii=Object.defineProperty,zi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ii(t,i,s),s};const Ai={weather:"glass-weather-card",light:"glass-light-card",cover:"glass-cover-card",fan:"glass-fan-card",title:"glass-title-card",spotify:"glass-spotify-card",media:"glass-media-card",presence:"glass-presence-card",climate:"glass-climate-card",camera_carousel:"glass-camera-carousel-card",calendar:"glass-calendar-card",vacuum:"glass-vacuum-card"},Ei=["title","weather","climate","light","media","fan","cover","spotify","presence","camera_carousel","calendar","vacuum"];class Li extends ci{constructor(){super(...arguments),this._items=[],this._activeArea=null,this._scrollMask="none",this._popup=null,this._ownsPopup=!1,this._areaStructure=[],this._lastAreaKeys="",this._cachedEntityFingerprint="",this._boundUpdateMask=this._updateNavMask.bind(this),this._scrollEl=null,this._navbarConfig=null,this._configLoaded=!1,this._configLoading=!1,this._dashboardLoading=!1,this._roomConfigs={},this._flipPositions=new Map,this._litTimestamps=new Map,this._configReady=!1,this._lastAmbientPeriod=null,this._editMode=!1,this._enabledCards=["weather"],this._cardOrder=Ei,this._dashboardCards=new Map,this._hideHeader=!1,this._hideSidebar=!1,this._headerStyleEl=null,this._sidebarStyleEl=null,this._loadingOverlay=null,this._bgIsLight=!1,this._bgIntersectingCards=new Set}_mergeCardOrder(e){const t=new Set(Object.keys(Ai)),i=(e??[]).filter(e=>t.has(e)),a=new Set(i),r=Ei.filter(e=>!a.has(e));return[...i,...r]}static getConfigElement(){return document.createElement("glass-navbar-card-editor")}static getStubConfig(){return{type:"custom:glass-navbar-card"}}static{this.styles=[Lt,Pt,Mt,Rt,m`
      :host {
        width: 100%;
        padding: 0.375rem 0 5rem; /* top + space for fixed navbar */
        user-select: none;
        -webkit-user-select: none;
      }

      .dashboard-cards {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0 0.75rem 2.8125rem;
        max-width: 31.25rem;
        margin: 0 auto;
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
    `]}connectedCallback(){super.connectedCallback();const e=document.querySelector("glass-room-popup");e?(this._popup=e,this._ownsPopup=!1):customElements.whenDefined("glass-room-popup").then(()=>{if(!this.isConnected)return;const e=document.querySelector("glass-room-popup");if(e)return this._popup=e,void(this._ownsPopup=!1);this._popup=document.createElement("glass-room-popup"),document.body.appendChild(this._popup),this._ownsPopup=!0,this.hass&&this._popup&&(this._popup.hass=this.hass)}),this.hass&&this._popup&&(this._popup.hass=this.hass),this._listen("popup-close",()=>{this._activeArea=null}),this._listen("navbar-config-changed",()=>{this._loadBackendConfig()}),this._listen("dashboard-config-changed",()=>{this._loadDashboardConfig()}),this._listen("location-changed",()=>{this._loadDashboardConfig()}),this._editMode=this._detectEditMode()}disconnectedCallback(){super.disconnectedCallback(),this._ownsPopup&&this._popup?.remove(),this._popup=null,this._ownsPopup=!1,this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null);for(const e of this._dashboardCards.values())e.remove();this._dashboardCards.clear(),this._removeHeaderStyle(),this._removeSidebarStyle(),this._loadingOverlay&&(this._loadingOverlay.remove(),this._loadingOverlay=null),this._removeOverlayTimer&&(clearTimeout(this._removeOverlayTimer),this._removeOverlayTimer=void 0),this._headerRetryTimer&&(clearTimeout(this._headerRetryTimer),this._headerRetryTimer=void 0),this._sidebarRetryTimer&&(clearTimeout(this._sidebarRetryTimer),this._sidebarRetryTimer=void 0),this._configRetryTimer&&(clearTimeout(this._configRetryTimer),this._configRetryTimer=void 0),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._bgIntersectionObserver?.disconnect(),this._bgIntersectionObserver=void 0,this._bgMutationObserver?.disconnect(),this._bgMutationObserver=void 0,this._bgIntersectingCards.clear()}firstUpdated(e){super.firstUpdated(e),this._attachScrollListener();const t=this.renderRoot.querySelector(".dashboard-cards");t&&(this._bgMutationObserver=new MutationObserver(e=>{e.some(e=>"childList"===e.type)?this._setupBgObserver():this._checkBgLightFromIntersecting()}),this._bgMutationObserver.observe(t,{childList:!0,subtree:!0,attributeFilter:["data-bg-light"]})),this._setupBgObserver()}_setupBgObserver(){this._bgIntersectionObserver?.disconnect(),this._bgIntersectingCards.clear();const e=this.renderRoot.querySelector(".navbar"),t=this.renderRoot.querySelector(".dashboard-cards");if(!e||!t||0===t.children.length)return;const i=e.getBoundingClientRect();if(0===i.height)return void requestAnimationFrame(()=>requestAnimationFrame(()=>this._setupBgObserver()));const a=-i.top,r=-(window.innerHeight-i.bottom);this._bgIntersectionObserver=new IntersectionObserver(e=>{for(const t of e)t.isIntersecting?this._bgIntersectingCards.add(t.target):this._bgIntersectingCards.delete(t.target);this._checkBgLightFromIntersecting()},{root:null,rootMargin:`${a}px 0px ${r}px 0px`,threshold:0});for(const s of t.children)this._bgIntersectionObserver.observe(s)}_checkBgLightFromIntersecting(){let e=!1;for(const t of this._bgIntersectingCards)if("true"===t.dataset.bgLight){e=!0;break}e!==this._bgIsLight&&(this._bgIsLight=e)}_detectEditMode(){let e=this.getRootNode();for(;e instanceof ShadowRoot;){const t=e.host;if("HUI-CARD-OPTIONS"===t.tagName)return!0;if("HUI-DIALOG-EDIT-CARD"===t.tagName)return!0;if("HA-PANEL-LOVELACE"===t.tagName&&t.lovelace?.editMode)return!0;e=t.getRootNode()}return!1}_attachScrollListener(){if(this._scrollEl&&this.renderRoot.contains(this._scrollEl))return;this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null);const e=this.renderRoot.querySelector(".nav-scroll");e&&(e.addEventListener("scroll",this._boundUpdateMask,{passive:!0}),this._scrollEl=e,this._updateNavMask())}setConfig(e){super.setConfig(e)}getCardSize(){return 0}getTrackedEntityIds(){return["sun.sun",...this._items.flatMap(e=>e.entityIds)]}shouldUpdate(e){if(e.has("hass")&&this.hass){this._popup&&(this._popup.hass=this.hass);for(const e of this._dashboardCards.values())e.hass=this.hass}return!this._configReady||super.shouldUpdate(e)}updated(e){if(super.updated(e),e.has("hass")&&this.hass){if(this._editMode=this._detectEditMode(),this._editMode)return;this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoading||this._loadBackendConfig(),this._configReady&&(this._rebuildStructure(),this._aggregateState()),this._updateAmbient()}(e.has("_items")||e.has("_enabledCards"))&&this.updateComplete.then(()=>{this._syncDashboardCards(),this._attachScrollListener(),this._updateNavMask(),this._animateFlip(),this._setupBgObserver()})}async _loadBackendConfig(){if(this.hass&&!this._configLoading){this._configLoading=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_config");this._navbarConfig=e.navbar,this._roomConfigs=e.rooms??{},e.dashboard&&(this._enabledCards=e.dashboard.enabled_cards,this._cardOrder=this._mergeCardOrder(e.dashboard.card_order),this._hideHeader=e.dashboard.hide_header??!1,this._hideSidebar=e.dashboard.hide_sidebar??!1,this._applyHideHeader(),this._applyHideSidebar()),this._configLoaded=!0,this._configReady=!0,this._lastAreaKeys="",this._rebuildStructure(),this._aggregateState()}catch{return this._configLoading=!1,void(this.isConnected&&(this._showLoadingOverlay(),this._configRetryTimer=setTimeout(()=>{this._configRetryTimer=void 0,this.isConnected&&(this._configLoaded=!1,this._loadBackendConfig())},2e3)))}finally{this._configLoading=!1}this._removeLoadingOverlay()}}async _loadDashboardConfig(){if(this.hass&&!this._dashboardLoading&&!this._configLoading){this._dashboardLoading=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_config");if(e?.dashboard){this._enabledCards=e.dashboard.enabled_cards,this._cardOrder=this._mergeCardOrder(e.dashboard.card_order);const t=e.dashboard.hide_header??!1,i=e.dashboard.hide_sidebar??!1;t!==this._hideHeader&&(this._hideHeader=t,this._applyHideHeader()),i!==this._hideSidebar&&(this._hideSidebar=i,this._applyHideSidebar())}}catch{}finally{this._dashboardLoading=!1}}}_applyHideHeader(e=10){this._hideHeader?!this._injectHeaderStyle()&&e>0&&this.isConnected&&(this._headerRetryTimer=setTimeout(()=>this._applyHideHeader(e-1),500)):this._removeHeaderStyle()}_injectHeaderStyle(){if(this._headerStyleEl)return!0;const e=this._findHuiRoot();if(!e)return!1;const t=document.createElement("style");return t.id="glass-cards-hide-header",t.textContent="\n      .header { display: none !important; }\n      #view, hui-view-container {\n        min-height: 100vh !important;\n        padding-top: env(safe-area-inset-top) !important;\n      }\n    ",e.appendChild(t),this._headerStyleEl=t,!0}_removeHeaderStyle(){this._headerStyleEl&&(this._headerStyleEl.remove(),this._headerStyleEl=null)}_applyHideSidebar(e=10){this._hideSidebar?!this._injectSidebarStyle()&&e>0&&this.isConnected&&(this._sidebarRetryTimer=setTimeout(()=>this._applyHideSidebar(e-1),500)):this._removeSidebarStyle()}_injectSidebarStyle(){if(this._sidebarStyleEl)return!0;const e=this._findDrawerShadow();if(!e)return!1;const t=document.createElement("style");return t.id="glass-cards-hide-sidebar",t.textContent="\n      .mdc-drawer { display: none !important; }\n      .mdc-drawer-scrim { display: none !important; }\n      .mdc-drawer-app-content {\n        margin-left: 0 !important;\n        padding-left: 0 !important;\n      }\n    ",e.appendChild(t),this._sidebarStyleEl=t,!0}_removeSidebarStyle(){this._sidebarStyleEl&&(this._sidebarStyleEl.remove(),this._sidebarStyleEl=null)}_findDrawerShadow(){try{const e=document.querySelector("home-assistant");if(!e?.shadowRoot)return null;const t=e.shadowRoot.querySelector("home-assistant-main");if(!t?.shadowRoot)return null;const i=t.shadowRoot.querySelector("ha-drawer");return i?.shadowRoot?i.shadowRoot:null}catch{return null}}_showLoadingOverlay(){if(this._loadingOverlay)return;const e=document.createElement("div");e.id="glass-cards-loading",e.style.cssText="\n      position: fixed; inset: 0; z-index: 99999;\n      background: var(--primary-background-color, #111);\n      display: flex; align-items: center; justify-content: center;\n      flex-direction: column; gap: 16px;\n      transition: opacity 0.4s ease;\n    ";const t=document.createElement("style");t.textContent="@keyframes gc-spin { to { transform: rotate(360deg); } }",e.appendChild(t);const i=document.createElement("div");i.style.cssText="width:36px;height:36px;border:3px solid rgba(255,255,255,.15);border-top-color:rgba(255,255,255,.7);border-radius:50%;animation:gc-spin .8s linear infinite;",e.appendChild(i);const a=document.createElement("span");a.style.cssText="font:500 13px/1 sans-serif;color:rgba(255,255,255,.5);letter-spacing:1px;text-transform:uppercase;",a.textContent="Glass Cards",e.appendChild(a),document.body.appendChild(e),this._loadingOverlay=e}_removeLoadingOverlay(){if(!this._loadingOverlay)return;const e=this._loadingOverlay;this._loadingOverlay=null,e.style.opacity="0",this._removeOverlayTimer=setTimeout(()=>{e.remove(),this._removeOverlayTimer=void 0},400)}_findHuiRoot(){try{const e=document.querySelector("home-assistant");if(!e?.shadowRoot)return null;const t=e.shadowRoot.querySelector("home-assistant-main");if(!t?.shadowRoot)return null;const i=t.shadowRoot.querySelector("ha-drawer");if(!i)return null;const a=i.querySelector("partial-panel-resolver");if(!a)return null;const r=a.querySelector("ha-panel-lovelace");if(!r?.shadowRoot)return null;const s=r.shadowRoot.querySelector("hui-root");return s?.shadowRoot?s.shadowRoot:null}catch{return null}}_getOrCreateCard(e){let t=this._dashboardCards.get(e);if(t||(t=document.createElement(e),this._dashboardCards.set(e,t)),this.hass&&(t.hass=this.hass),"glass-light-card"===e||"glass-fan-card"===e||"glass-climate-card"===e){const e=this._items.map(e=>e.areaId);t.visibleAreaIds=e}return t}_rebuildStructure(){if(!this.hass?.areas)return;const e=this._navbarConfig?`${this._navbarConfig.room_order.join(",")}|${this._navbarConfig.hidden_rooms.join(",")}`:"";this.hass.entities!==this._lastEntitiesRef&&(this._lastEntitiesRef=this.hass.entities,this._cachedEntityFingerprint=Object.values(this.hass.entities).map(e=>`${e.entity_id}:${e.area_id??""}`).sort().join("|"));const t=this._cachedEntityFingerprint,i=Object.entries(this._roomConfigs).map(([e,t])=>`${e}:${t.icon??""}`).sort().join(","),a=Object.keys(this.hass.areas).sort().join(",")+"||"+t+"||"+e+"||"+i;if(a===this._lastAreaKeys)return;this._lastAreaKeys=a;const r=new Set(this._navbarConfig?.hidden_rooms??[]),s=new Map;(this._navbarConfig?.room_order??[]).forEach((e,t)=>s.set(e,t));const o=[];for(const n of Object.values(this.hass.areas)){if(r.has(n.area_id))continue;const e=pi(n.area_id,this.hass.entities,this.hass.devices);if(0===e.length)continue;const t=this._roomConfigs[n.area_id]?.icon;o.push({areaId:n.area_id,name:n.name,icon:t||n.icon||"mdi:home",entityIds:e.map(e=>e.entity_id)})}o.sort((e,t)=>{const i=s.get(e.areaId),a=s.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._areaStructure=o}_aggregateState(){if(!this.hass)return;const e=this._areaStructure.map(e=>{let t=0,i=!1,a=null,r=null,s=null,o=null,n=!1;const l=this._roomConfigs[e.areaId],c=!0===l?.show_presence,d=l?.presence_entity;if(c&&d){const e=this.hass?.states[d];!e||"on"!==e.state&&"home"!==e.state||(i=!0)}const h=this.hass?.areas?.[e.areaId];if(h?.temperature_entity_id){const e=this.hass?.states[h.temperature_entity_id];if(e&&"unavailable"!==e.state&&"unknown"!==e.state){const t=parseFloat(e.state);isNaN(t)||(a=`${e.state}°`,r=t)}}if(h?.humidity_entity_id){const e=this.hass?.states[h.humidity_entity_id];if(e&&"unavailable"!==e.state&&"unknown"!==e.state){const t=parseFloat(e.state);isNaN(t)||(s=`${e.state}%`,o=t)}}for(const p of e.entityIds){const e=this.hass?.states[p];if(!e)continue;const l=p.split(".")[0];if("light"===l&&"on"===e.state&&t++,!(a&&s||"sensor"!==l||"unavailable"===e.state||"unknown"===e.state)){const t=e.attributes.device_class;if("temperature"===t&&!a){const t=parseFloat(e.state);isNaN(t)||(a=`${e.state}°`,r=t)}if("humidity"===t&&!s){const t=parseFloat(e.state);isNaN(t)||(s=`${e.state}%`,o=t)}}if("media_player"===l&&"playing"===e.state&&(n=!0),c&&!d&&!i&&"binary_sensor"===l){const t=e.attributes.device_class;"presence"!==t&&"occupancy"!==t&&"motion"!==t||"on"!==e.state||(i=!0)}}return{...e,lightsOn:t,presence:i,temperature:a,tempValue:r,humidity:s,humidityValue:o,mediaPlaying:n}}),t=Date.now();for(const i of e){const e=this._roomConfigs[i.areaId],a=!1!==e?.sort_by_lights,r=!0===e?.show_presence;a&&i.lightsOn>0||r&&i.presence?this._litTimestamps.has(i.areaId)||this._litTimestamps.set(i.areaId,t):this._litTimestamps.delete(i.areaId)}!1!==this._navbarConfig?.auto_sort&&e.sort((e,t)=>{const i=this._roomConfigs[e.areaId],a=this._roomConfigs[t.areaId],r=!1!==i?.sort_by_lights&&e.lightsOn>0||!0===i?.show_presence&&e.presence?0:1,s=!1!==a?.sort_by_lights&&t.lightsOn>0||!0===a?.show_presence&&t.presence?0:1;if(r!==s)return r-s;if(0===r){const i=this._litTimestamps.get(e.areaId)??0;return(this._litTimestamps.get(t.areaId)??0)-i}return 0});e.map(e=>`${e.areaId}:${e.lightsOn}:${e.presence}:${e.temperature}:${e.humidity}:${e.mediaPlaying}`).join("|")!==this._items.map(e=>`${e.areaId}:${e.lightsOn}:${e.presence}:${e.temperature}:${e.humidity}:${e.mediaPlaying}`).join("|")&&(this._snapshotPositions(),this._items=e)}_updateAmbient(){if(!this.hass)return;const e=function(e){const t=e.states["sun.sun"];if(!t){const e=(new Date).getHours();return e>=6&&e<10?"morning":e>=10&&e<17?"day":e>=17&&e<21?"evening":"night"}const i=parseFloat(t.attributes.elevation)||0;if(i>20)return"day";if(i>0){const e=Date.parse(t.attributes.next_setting),i=Date.parse(t.attributes.next_rising);return isNaN(e)||isNaN(i)?"above_horizon"===t.state?"day":"night":e<i?"evening":"morning"}if(i>-6){const e=Date.parse(t.attributes.next_rising),i=Date.parse(t.attributes.next_setting);if(!isNaN(e)&&!isNaN(i))return e<i?"morning":"evening"}return"night"}(this.hass);e!==this._lastAmbientPeriod&&(this._lastAmbientPeriod=e,i.emit("ambient-update",{period:e}))}_snapshotPositions(){this._flipPositions.clear();const e=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const t of e){const e=t.dataset.area;e&&this._flipPositions.set(e,t.getBoundingClientRect().left)}}_animateFlip(){if(0===this._flipPositions.size)return;const e=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const t of e){const e=t.dataset.area;if(!e)continue;const i=this._flipPositions.get(e);if(void 0===i)continue;const a=i-t.getBoundingClientRect().left;Math.abs(a)<1||t.animate([{transform:`translateX(${a}px)`},{transform:"translateX(0)"}],{duration:350,easing:"cubic-bezier(0.4, 0, 0.2, 1)"})}this._flipPositions.clear()}_updateNavMask(){const e=this.renderRoot.querySelector(".nav-scroll");if(!e)return;if(!(e.scrollWidth>e.offsetWidth))return void(this._scrollMask="none");const t=e.scrollLeft<=5,i=e.scrollLeft+e.offsetWidth>=e.scrollWidth-5;this._scrollMask=t&&i?"none":t?"mask-right":i?"mask-left":"mask-both"}_handleNavClick(e,t){const a=t.currentTarget.getBoundingClientRect();if(this._activeArea===e.areaId)i.emit("popup-close",void 0),this._activeArea=null;else{this._activeArea=e.areaId;const t=this._items.indexOf(e);i.emit("popup-open",{areaId:e.areaId,originRect:a,roomIndex:t>=0?t:void 0})}}_renderNavItem(e){const t=this._activeArea===e.areaId,i=this._roomConfigs[e.areaId],a=!1!==i?.show_lights,r=!1!==i?.show_temperature,s=!1!==i?.show_humidity,o=this._navbarConfig?.temp_high??24,n=this._navbarConfig?.temp_low??17,l=this._navbarConfig?.humidity_threshold??65,c=a&&e.lightsOn>0,d=s&&null!==e.humidityValue&&e.humidityValue>=l,h=e.mediaPlaying,p=r&&null!==e.tempValue&&e.tempValue>=o,u=["nav-item",t?"active":"",c?"has-light":"",h?"has-music":"",p?"has-temp-hot":"",r&&null!==e.tempValue&&!p&&e.tempValue<=n?"has-temp-cold":""].filter(Boolean).join(" ");return Z`
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
          ${d?Z`<span class="humidity-bar"></span>`:ie}
        </span>
      </button>
    `}_syncDashboardCards(){const e=this.renderRoot.querySelector(".dashboard-cards");if(!e)return;const t=new Set(this._enabledCards),i=this._cardOrder.filter(e=>t.has(e)),a=[];for(const[s]of this._dashboardCards){const e=Object.entries(Ai).find(([,e])=>e===s)?.[0];e&&t.has(e)||a.push(s)}for(const s of a)this._dashboardCards.get(s)?.remove(),this._dashboardCards.delete(s);let r=null;for(const s of i){const t=Ai[s];if(!t)continue;const i=this._getOrCreateCard(t),a=r?r.nextElementSibling:e.firstElementChild;i!==a&&e.insertBefore(i,a),r=i}}render(){this._lang;try{const e=!this._editMode&&this._items.length>0,t="nav-scroll"+("none"!==this._scrollMask?` ${this._scrollMask}`:"");return Z`
        <div class="dashboard-cards"></div>
        ${e?Z`<nav class="navbar glass glass-float${this._bgIsLight?" bg-light":""}" role="navigation" aria-label="${ti("common.rooms")}">
              <div class=${t}>
                ${this._items.map(e=>this._renderNavItem(e))}
                ${this.hass?.user?.is_admin?Z`<button
                  class="nav-item nav-settings"
                  @click=${()=>{history.pushState(null,"","/glass-cards"),window.dispatchEvent(new Event("location-changed"))}}
                  aria-label=${ti("config.title")}
                >
                  <span class="nav-content">
                    <ha-icon .icon=${"mdi:cog"}></ha-icon>
                  </span>
                </button>`:ie}
              </div>
            </nav>`:ie}
      `}catch(e){return console.error("[glass-navbar-card] render error:",e),Z`<div class="dashboard-cards"></div><div class="glass" style="padding:16px;text-align:center;color:var(--c-alert);font-size:var(--fz-base);">
        <ha-icon .icon=${"mdi:alert-circle-outline"} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"></ha-icon>
        Navbar render error</div>`}}}zi([Te()],Li.prototype,"_items"),zi([Te()],Li.prototype,"_activeArea"),zi([Te()],Li.prototype,"_scrollMask"),zi([Te()],Li.prototype,"_editMode"),zi([Te()],Li.prototype,"_enabledCards"),zi([Te()],Li.prototype,"_bgIsLight");try{customElements.define("glass-navbar-card",Li)}catch{}const Pi=window;Pi.customCards=Pi.customCards||[],Pi.customCards.push({type:"glass-navbar-card",name:"Glass Navbar Card",description:"Auto-discovering bottom navigation for Glass Cards"}),oi("glass-weather-card-editor");var Mi=Object.defineProperty,Oi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Mi(t,i,s),s};const Ri={sunny:"sunny","clear-night":"clear_night",partlycloudy:"partly_cloudy",cloudy:"cloudy",fog:"foggy",rainy:"rainy",pouring:"pouring",snowy:"snowy","snowy-rainy":"snowy_rainy",hail:"hail",lightning:"lightning","lightning-rainy":"stormy",windy:"windy","windy-variant":"windy_variant",exceptional:"exceptional"},Di={sunny:{icon:"mdi:weather-sunny",textKey:"weather.cond_sunny",tint:"#fbbf24",tintOp:.1,sparkStroke:"rgba(251,191,36,0.6)",sparkFill:"rgba(251,191,36,0.15)"},clear_night:{icon:"mdi:weather-night",textKey:"weather.cond_clear_night",tint:"#818cf8",tintOp:.08,sparkStroke:"rgba(129,140,248,0.5)",sparkFill:"rgba(129,140,248,0.12)"},partly_cloudy:{icon:"mdi:weather-partly-cloudy",textKey:"weather.cond_partly_cloudy",tint:"#fcd34d",tintOp:.07,sparkStroke:"rgba(252,211,77,0.5)",sparkFill:"rgba(252,211,77,0.12)"},cloudy:{icon:"mdi:weather-cloudy",textKey:"weather.cond_cloudy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.4)",sparkFill:"rgba(148,163,184,0.08)"},foggy:{icon:"mdi:weather-fog",textKey:"weather.cond_foggy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.35)",sparkFill:"rgba(148,163,184,0.08)"},rainy:{icon:"mdi:weather-rainy",textKey:"weather.cond_rainy",tint:"#60a5fa",tintOp:.1,sparkStroke:"rgba(96,165,250,0.6)",sparkFill:"rgba(96,165,250,0.15)"},pouring:{icon:"mdi:weather-pouring",textKey:"weather.cond_pouring",tint:"#3b82f6",tintOp:.14,sparkStroke:"rgba(59,130,246,0.7)",sparkFill:"rgba(59,130,246,0.18)"},snowy:{icon:"mdi:weather-snowy",textKey:"weather.cond_snowy",tint:"#e0f2fe",tintOp:.08,sparkStroke:"rgba(224,242,254,0.5)",sparkFill:"rgba(224,242,254,0.12)"},snowy_rainy:{icon:"mdi:weather-snowy-rainy",textKey:"weather.cond_snowy_rainy",tint:"#93c5fd",tintOp:.08,sparkStroke:"rgba(147,197,253,0.5)",sparkFill:"rgba(147,197,253,0.12)"},hail:{icon:"mdi:weather-hail",textKey:"weather.cond_hail",tint:"#bae6fd",tintOp:.1,sparkStroke:"rgba(186,230,253,0.5)",sparkFill:"rgba(186,230,253,0.12)"},lightning:{icon:"mdi:weather-lightning",textKey:"weather.cond_lightning",tint:"#c084fc",tintOp:.12,sparkStroke:"rgba(192,132,252,0.6)",sparkFill:"rgba(167,139,250,0.15)"},stormy:{icon:"mdi:weather-lightning-rainy",textKey:"weather.cond_stormy",tint:"#a78bfa",tintOp:.12,sparkStroke:"rgba(167,139,250,0.6)",sparkFill:"rgba(167,139,250,0.15)"},windy:{icon:"mdi:weather-windy",textKey:"weather.cond_windy",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.5)",sparkFill:"rgba(110,231,183,0.10)"},windy_variant:{icon:"mdi:weather-windy-variant",textKey:"weather.cond_windy_variant",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.4)",sparkFill:"rgba(110,231,183,0.10)"},exceptional:{icon:"mdi:alert-circle-outline",textKey:"weather.cond_exceptional",tint:"#fca5a5",tintOp:.1,sparkStroke:"rgba(252,165,165,0.5)",sparkFill:"rgba(252,165,165,0.12)"}},ji=["compass_N","compass_NNE","compass_NE","compass_ENE","compass_E","compass_ESE","compass_SE","compass_SSE","compass_S","compass_SSW","compass_SW","compass_WSW","compass_W","compass_WNW","compass_NW","compass_NNW"];function Fi(e){if(null==e)return"";return ti(`weather.${ji[Math.round((+e%360+360)%360/22.5)%16]}`)}function qi(e){return e<10?"0"+e:""+e}class Hi extends ci{constructor(){super(...arguments),this._activeTab=null,this._forecastDaily=[],this._forecastHourly=[],this._clockTime="",this._clockSec="",this._clockDay="",this._clockDate="",this._weatherConfig={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},this._canvas=null,this._ctx=null,this._animId=0,this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:200,color:"rgba(167,139,250,"},this._cW=0,this._cH=0,this._resizeObserver=null,this._cachedCond="",this._clockInterval=0,this._unsubDaily=null,this._unsubHourly=null,this._configLoaded=!1,this._configLoadingInProgress=!1,this._canvasReady=!1,this._needsCanvasReInit=!1,this._subscribedEntity="",this._subscribedShowDaily=!1,this._subscribedShowHourly=!1,this._subVersion=0,this._animRunning=!1,this._animate=()=>{if(!this.isConnected||!this._animRunning)return;const e=this._ctx;if(!e)return;e.clearRect(0,0,this._cW,this._cH);for(const i of this._particles)this._updateParticle(i),this._drawParticle(e,i);const t=this._cachedCond;"stormy"!==t&&"lightning"!==t||(this._updateFlash(),this._flashState.opacity>.01&&(e.fillStyle=this._flashState.color+this._flashState.opacity+")",e.fillRect(0,0,this._cW,this._cH))),this._animId=requestAnimationFrame(this._animate)}}static getConfigElement(){return document.createElement("glass-weather-card-editor")}getCardSize(){return 2}static{this.styles=[Lt,Pt,Mt,jt,Rt,m`
    :host {
      width: 100%;
      max-width: 31.25rem;
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
      display: flex; flex-direction: column; justify-content: center;
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
    /* Metric row: compact icon + value on a single line, no label text */
    .wc-metrics {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.5rem;
      padding: 0.3125rem 0.5rem;
      border-radius: var(--radius-sm);
      background: var(--s1);
      border: 1px solid var(--b1);
      margin-bottom: 0.25rem;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .wc-metrics::-webkit-scrollbar { display: none; }
    .wc-metric {
      display: inline-flex; align-items: center; gap: 0.25rem;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }
    .wc-metric ha-icon {
      --mdc-icon-size: 0.8125rem;
      width: 0.8125rem; height: 0.8125rem;
      display: flex; align-items: center; justify-content: center;
      color: var(--t4);
      flex-shrink: 0;
    }
    .wc-metric.humidity ha-icon { color: rgb(var(--rgb-info)); }
    .wc-metric.pressure ha-icon { color: rgba(148,163,184,0.85); }
    .wc-metric.wind ha-icon { color: rgba(110,231,183,0.85); }
    .wc-metric.uv ha-icon { color: rgb(var(--rgb-warning)); }
    .wc-metric.visibility ha-icon { color: rgba(148,163,184,0.7); }
    .wc-metric.sunrise ha-icon { color: rgb(var(--rgb-warning)); }
    .wc-metric.sunset ha-icon { color: rgba(251,146,60,0.95); }
    .wc-metric-val {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t2);
      line-height: 1;
      display: inline-flex; align-items: baseline; gap: 0.125rem;
    }
    .wc-metric-unit { font-size: var(--fz-xxs); font-weight: 400; color: var(--t4); }
    .wc-metric-dir { font-size: var(--fz-xxs); font-weight: 600; color: var(--t3); margin-left: 0.0625rem; }

    /* ── Forecast tabs / Fold separator ── */
    .wc-fold-sep {
      height: 0.0625rem; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent),0.2), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .wc-fold-sep.visible { opacity: 1; }

    .wc-forecast-zone {
      display: flex; flex-direction: column; gap: 0.375rem;
      margin-top: 0.125rem;
    }

    /* ── Daily list ── */
    .wc-daily-list, .wc-hourly-list {
      display: flex; flex-direction: column; gap: 0.0625rem;
      padding: 0.125rem 0;
    }
    .wc-day-row {
      display: grid; grid-template-columns: 2.625rem 1.125rem 1fr 2.625rem 2.375rem;
      align-items: center; gap: 0.3125rem;
      padding: 0.3125rem 0.5rem 0.3125rem 0.25rem;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
    }
    .wc-day-row:first-child {
      background: color-mix(in srgb, var(--c-accent) 10%, transparent);
      border-color: color-mix(in srgb, var(--c-accent) 28%, transparent);
    }
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
      padding: 0.3125rem 0.5rem 0.3125rem 0.25rem;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
    }
    .wc-hour-row.now {
      background: color-mix(in srgb, var(--c-accent) 10%, transparent);
      border-color: color-mix(in srgb, var(--c-accent) 28%, transparent);
    }
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
      .wc-day-row:hover, .wc-hour-row:hover {
        background: var(--s1);
        transform: translateX(2px);
        border-color: var(--b2);
      }
    }
    @media (pointer: coarse) {
      .wc-day-row:active, .wc-hour-row:active { animation: bounce 0.3s ease; }
    }
    @media (prefers-reduced-motion: reduce) {
      .wc-day-row:hover, .wc-hour-row:hover { transform: none; }
      .wc-fc-capsule { transition: none; }
    }

    /* ── Tint (top, dynamic per condition) ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow);
    }
    /* Atmospheric halo at the card bottom — accent-tinted, coherent with
       library / spotify / climate / calendar */
    .weather-card { position: relative; }
    .weather-card::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 45%; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-accent), 0.08), transparent 70%);
      transition: opacity var(--t-slow);
    }
    /* Only card-inner sits above the halo. Tint and canvas keep their own
       absolute positioning so they don't enter the flow and explode the
       card height. */
    .weather-card .card-inner { position: relative; z-index: 1; }
    @media (prefers-reduced-motion: reduce) {
      .weather-card::after { transition: none; }
    }
  `]}getTrackedEntityIds(){const e=[],t=this._getEntityId();return t&&e.push(t),this.hass?.states["sun.sun"]&&e.push("sun.sun"),e}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._weatherConfig.entity_id)return this._weatherConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("weather."));if(e)return e}return""}_getWeatherState(){const e=this._getEntityId();return e?this.hass?.states[e]:void 0}_mapCondition(e){return Ri[e]??"cloudy"}_getConditionMeta(e){return Di[e]??Di.cloudy}connectedCallback(){super.connectedCallback(),this._startClock(),this._listen("weather-config-changed",()=>this._loadConfig()),this._canvasReady&&(this._needsCanvasReInit=!0)}disconnectedCallback(){super.disconnectedCallback(),this._stopClock(),this._stopAnimation(),this._unsubForecasts(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._canvas=null,this._ctx=null,this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}_collapseExpanded(){null!==this._activeTab&&(this._activeTab=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,this._unsubForecasts()),this._configLoaded||this._configLoadingInProgress||(this._backend=new mi(this.hass),this._loadConfig());const e=this._getWeatherState(),t=e?this._mapCondition(e.state):"";t!==this._cachedCond&&(this._cachedCond=t,this._canvasReady&&this._cW&&this._cH&&this._spawnParticles(this._cachedCond||"cloudy")),this._configLoaded&&this._subscribeForecasts()}this._needsCanvasReInit&&(this._needsCanvasReInit=!1,this._initCanvas())}firstUpdated(){this._canvasReady=!0,this._initCanvas()}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherConfig=e.weather),this._configLoaded=!0,this._configLoadingInProgress=!1,this._subscribedEntity="",this._subscribeForecasts(),this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}async _subscribeForecasts(){const e=this._getEntityId();if(!e||!this.hass)return;const t=this._subscribedShowDaily!==this._weatherConfig.show_daily||this._subscribedShowHourly!==this._weatherConfig.show_hourly;if(e===this._subscribedEntity&&!t)return;this._unsubForecasts(),this._subscribedEntity=e,this._subscribedShowDaily=this._weatherConfig.show_daily,this._subscribedShowHourly=this._weatherConfig.show_hourly;const i=++this._subVersion;if(this._weatherConfig.show_daily){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastDaily=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(this._subVersion!==i)return void t();this._unsubDaily=t}if(this._weatherConfig.show_hourly){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastHourly=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});if(this._subVersion!==i)return void t();this._unsubHourly=t}}_unsubForecasts(){this._subVersion++,this._unsubDaily?.(),this._unsubDaily=null,this._unsubHourly?.(),this._unsubHourly=null,this._subscribedEntity=""}_startClock(){this._stopClock(),this._updateClock(),this._clockInterval=window.setInterval(()=>this._updateClock(),1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=0)}_updateClock(){const e=new Date;var t,i;this._clockTime=qi(e.getHours())+":"+qi(e.getMinutes()),this._clockSec=":"+qi(e.getSeconds()),this._clockDay=(t=e,i=this._lang,t.toLocaleDateString(i,{weekday:"long"})),this._clockDate=e.getDate()+" "+function(e,t){return e.toLocaleDateString(t,{month:"long"})}(e,this._lang)}_initCanvas(){if(this._resizeObserver?.disconnect(),this._resizeObserver=null,this._stopAnimation(),this._canvas=this.renderRoot.querySelector(".wc-anim"),!this._canvas)return;this._ctx=this._canvas.getContext("2d"),this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas());const e=this._canvas.parentElement;e&&this._resizeObserver.observe(e),this._resizeCanvas(),this._startAnimation()}_resizeCanvas(){if(!this._canvas||!this._ctx)return;const e=this._canvas.parentElement;if(!e)return;const t=e.getBoundingClientRect(),i=window.devicePixelRatio||1;this._cW=t.width,this._cH=t.height,this._canvas.width=this._cW*i,this._canvas.height=this._cH*i,this._canvas.style.width=this._cW+"px",this._canvas.style.height=this._cH+"px",this._ctx.setTransform(i,0,0,i,0,0)}_startAnimation(){this._animRunning||(this._animRunning=!0,this._spawnParticles(this._cachedCond||"cloudy"),this._animate())}_stopAnimation(){this._animRunning=!1,this._animId&&(cancelAnimationFrame(this._animId),this._animId=0)}_rnd(e,t){return e+Math.random()*(t-e)}_spawnParticles(e){this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:this._rnd(120,280),color:"rgba(167,139,250,"};const t=this._cW,i=this._cH;if(!t||!i)return;const a=(e,i,a,r,s,o)=>({type:"drop",x:this._rnd(0,t),y:this._rnd(-30,-5),len:this._rnd(i,a),speed:this._rnd(r,s),angle:o,color:e,opacity:this._rnd(.4,.7)}),r=()=>({type:"flake",x:this._rnd(0,t),y:this._rnd(-10,-3),r:this._rnd(1.5,3.5),speed:this._rnd(.4,1.2),drift:this._rnd(-.3,.3),phase:this._rnd(0,6.28),opacity:this._rnd(.3,.7)}),s=e=>({type:"mote",x:this._rnd(.1*t,.9*t),y:this._rnd(.3*i,.9*i),r:this._rnd(1,2.5),speed:this._rnd(.15,.4),drift:this._rnd(-.15,.15),phase:this._rnd(0,6.28),color:e,opacity:0,maxOp:this._rnd(.3,.7),life:0,maxLife:this._rnd(180,360)}),o=()=>({type:"star",x:this._rnd(.05*t,.95*t),y:this._rnd(.05*i,.7*i),r:this._rnd(.8,1.8),phase:this._rnd(0,6.28),speed:this._rnd(.008,.025)}),n=(e,a)=>({type:"cloud",x:this._rnd(-80,t),y:this._rnd(.05*i,.6*i),w:this._rnd(50,110),h:this._rnd(12,26),speed:this._rnd(.6*a,a),opacity:this._rnd(.6*e,e)}),l=()=>({type:"streak",x:this._rnd(-60,0),y:this._rnd(.1*i,.85*i),w:this._rnd(40,90),speed:this._rnd(2,5),opacity:this._rnd(.06,.14)}),c=()=>({type:"fog",x:this._rnd(-120,.5*t),y:this._rnd(.15*i,.75*i),w:this._rnd(80,160),h:this._rnd(18,35),speed:this._rnd(.2,.6),opacity:this._rnd(.02,.04)}),d=()=>({type:"hail",x:this._rnd(0,t),y:this._rnd(-15,-3),r:this._rnd(2,4),speed:this._rnd(3,5.5),opacity:this._rnd(.5,.8)}),h=this._particles;switch(e){case"sunny":for(let e=0;e<10;e++)h.push(s("rgba(251,191,36,"));break;case"clear_night":for(let e=0;e<14;e++)h.push(o());break;case"partly_cloudy":for(let e=0;e<3;e++)h.push(n(.035,.4));for(let e=0;e<4;e++)h.push(s("rgba(251,191,36,"));break;case"cloudy":for(let e=0;e<5;e++)h.push(n(.045,.35));break;case"foggy":for(let e=0;e<7;e++)h.push(c());break;case"rainy":for(let e=0;e<20;e++)h.push(a("rgba(96,165,250,",14,24,4,7,.14));for(let e=0;e<3;e++)h.push(n(.025,.3));break;case"pouring":for(let e=0;e<35;e++)h.push(a("rgba(59,130,246,",18,30,5.5,9,.1));for(let e=0;e<4;e++)h.push(n(.035,.35));break;case"stormy":for(let e=0;e<28;e++)h.push(a("rgba(167,139,250,",16,28,5,8,.26));for(let e=0;e<4;e++)h.push(n(.05,.5));this._flashState.interval=this._rnd(80,200);break;case"lightning":for(let e=0;e<4;e++)h.push(n(.04,.4));this._flashState.interval=this._rnd(60,160),this._flashState.color="rgba(192,132,252,";break;case"snowy":for(let e=0;e<18;e++)h.push(r());for(let e=0;e<3;e++)h.push(n(.025,.2));break;case"snowy_rainy":for(let e=0;e<10;e++)h.push(r());for(let e=0;e<14;e++)h.push(a("rgba(96,165,250,",12,20,3.5,6,.14));break;case"hail":for(let e=0;e<14;e++)h.push(d());for(let e=0;e<10;e++)h.push(a("rgba(96,165,250,",10,18,3.5,5.5,.14));break;case"windy":for(let e=0;e<8;e++)h.push(l());break;case"windy_variant":for(let e=0;e<6;e++)h.push(l());for(let e=0;e<4;e++)h.push(n(.035,1.2));break;case"exceptional":for(let e=0;e<8;e++)h.push(s("rgba(252,165,165,"));for(let e=0;e<5;e++)h.push(l())}}_updateParticle(e){const t=this._cW,i=this._cH;switch(e.type){case"drop":e.x=e.x+Math.sin(e.angle)*e.speed,e.y=e.y+Math.cos(e.angle)*e.speed,e.y>i+10&&(e.y=this._rnd(-30,-5),e.x=this._rnd(0,t));break;case"flake":e.y=e.y+e.speed,e.phase=e.phase+.02,e.x=e.x+e.drift+.3*Math.sin(e.phase),e.y>i+10&&(e.y=this._rnd(-10,-3),e.x=this._rnd(0,t));break;case"mote":{e.life=e.life+1,e.y=e.y-e.speed,e.x=e.x+e.drift+.2*Math.sin(e.phase+.015*e.life);const a=e.life/e.maxLife;e.opacity=a<.15?a/.15*e.maxOp:a>.85?(1-a)/.15*e.maxOp:e.maxOp,e.life>=e.maxLife&&(e.life=0,e.x=this._rnd(.1*t,.9*t),e.y=this._rnd(.3*i,.9*i),e.maxLife=this._rnd(180,360),e.maxOp=this._rnd(.3,.7));break}case"star":e.phase=e.phase+e.speed;break;case"cloud":e.x=e.x+e.speed,e.x>t+20&&(e.x=-e.w-this._rnd(10,60),e.y=this._rnd(.05*i,.6*i));break;case"streak":e.x=e.x+e.speed,e.x>t+20&&(e.x=this._rnd(-80,-20),e.y=this._rnd(.1*i,.85*i));break;case"fog":e.x=e.x+e.speed,e.x>t+40&&(e.x=-e.w-this._rnd(20,80),e.y=this._rnd(.15*i,.75*i));break;case"hail":e.y=e.y+e.speed,e.y>i+10&&(e.y=this._rnd(-15,-3),e.x=this._rnd(0,t))}}_drawParticle(e,t){switch(t.type){case"drop":{const i=Math.sin(t.angle)*t.len,a=Math.cos(t.angle)*t.len,r=e.createLinearGradient(t.x,t.y,t.x+i,t.y+a);r.addColorStop(0,t.color+"0)"),r.addColorStop(1,t.color+t.opacity+")"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+i,t.y+a),e.strokeStyle=r,e.lineWidth=1.5,e.stroke();break}case"flake":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break;case"mote":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle=t.color+t.opacity+")",e.shadowColor=t.color+.5*t.opacity+")",e.shadowBlur=6,e.fill(),e.shadowBlur=0;break;case"star":{const i=.15+.75*(.5+.5*Math.sin(t.phase));e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+i+")",e.fill();break}case"cloud":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"streak":{const i=e.createLinearGradient(t.x,t.y,t.x+t.w,t.y);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.5,"rgba(255,255,255,"+t.opacity+")"),i.addColorStop(1,"rgba(255,255,255,0)"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+t.w,t.y),e.strokeStyle=i,e.lineWidth=1,e.stroke();break}case"fog":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"hail":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(224,242,254,"+t.opacity+")",e.fill(),e.beginPath(),e.arc(t.x-.25*t.r,t.y-.25*t.r,.4*t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+.3*t.opacity+")",e.fill()}}_updateFlash(){const e=this._flashState;e.timer++,e.on?(e.opacity*=.82,e.opacity<.02&&(e.on=!1,e.opacity=0,e.timer=0,e.interval=this._rnd(80,280))):e.timer>e.interval&&(e.on=!0,e.opacity=this._rnd(.12,.22))}_computeSparkline(e){const t=e.length;if(t<2)return{linePath:"",areaPath:"",nowY:32};let i=1/0,a=-1/0;for(const n of e)n.temperature<i&&(i=n.temperature),n.temperature>a&&(a=n.temperature);const r=a-i||1,s=e.map((e,i)=>({x:i/(t-1)*348,y:10+(a-e.temperature)/r*44}));let o=`M${s[0].x},${s[0].y}`;for(let n=0;n<s.length-1;n++){const e=s[Math.max(n-1,0)],t=s[n],i=s[Math.min(n+1,s.length-1)],a=s[Math.min(n+2,s.length-1)];o+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}return{linePath:o,areaPath:o+" L348,64 L0,64 Z",nowY:s[0].y}}render(){this._lang;try{return this._renderContent()}catch(e){return console.error("[glass-weather-card] render error:",e),Z`<div class="weather-card-wrap"><div class="glass weather-card"><div class="card-inner" style="padding:16px;text-align:center;color:var(--c-alert);font-size:var(--fz-base);">
        <ha-icon .icon=${"mdi:alert-circle-outline"} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"></ha-icon>
        Weather render error</div></div></div>`}}_renderContent(){const e=this._getWeatherState();if(!e)return Z`<div class="weather-card-wrap">
        ${this._weatherConfig.show_header?Z`<div class="card-header"><span class="card-title">${ti("weather.title")}</span></div>`:ie}
        <div class="glass weather-card"><div class="card-inner" style="padding:20px;text-align:center;color:var(--t3);font-size:var(--fz-base);">${ti("common.no_entity")}</div></div>
      </div>`;const t=e.attributes,i=e.state,a=this._mapCondition(i),r=this._getConditionMeta(a),s=t.temperature??0,o=t.apparent_temperature,n=t.humidity,l=t.wind_speed,c=t.wind_speed_unit??"km/h",d=t.wind_bearing,h=t.pressure,p=t.visibility,u=t.uv_index,g=t.friendly_name??"",m=t.temperature_unit??"°C",_=this.hass?.states["sun.sun"],f=_?.attributes.next_rising,v=_?.attributes.next_setting,b=f?new Date(f).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",y=v?new Date(v).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",w=new Set(this._weatherConfig.hidden_metrics),x=this._forecastHourly.slice(0,10),k=this._computeSparkline(x),$=`background: radial-gradient(ellipse at 80% 20%, ${r.tint}, transparent 70%); opacity: ${r.tintOp};`;return Z`
      <div class="weather-card-wrap">
        ${this._weatherConfig.show_header?Z`
          <div class="card-header">
            <span class="card-title">${ti("weather.title")}</span>
            <span class="card-location">${g}</span>
          </div>
        `:ie}

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
                  <span class="wc-cond-text">${ti(r.textKey)}</span>
                </div>
                ${null!=o?Z`<span class="wc-feels">${ti("weather.feels_like",{temp:Math.round(o)})}</span>`:ie}
              </div>
            </div>

            <!-- Sparkline -->
            ${x.length>=2?Z`
              <div class="wc-spark-zone">
                <svg class="wc-spark-svg" viewBox="0 0 348 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${r.sparkFill}" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  ${ee`<path class="wc-spark-area" d="${k.areaPath}" fill="url(#sparkGrad)" />`}
                  ${ee`<path class="wc-spark-line" d="${k.linePath}" stroke="${r.sparkStroke}" />`}
                </svg>
                <div class="wc-spark-now" style="left:0px;">
                  <div class="wc-spark-now-dot" style="top:${k.nowY/64*100}%"></div>
                </div>
                <div class="wc-spark-labels">
                  ${x.map((e,t)=>Z`<span class="wc-spark-lbl">${t%2==0||t===x.length-1?0===t?ti("weather.now"):new Date(e.datetime).getHours()+"h":""}</span>`)}
                </div>
              </div>
            `:ie}

            <!-- Metrics -->
            ${this._renderMetrics(w,n,l,c,d,h,u,p,b,y)}

            <!-- Forecast -->
            ${this._renderForecasts(m)}

          </div>
        </div>
      </div>
    `}_renderMetrics(e,t,i,a,r,s,o,n,l,c){const d=[];return e.has("humidity")||null==t||d.push({cls:"humidity",icon:"mdi:water-percent",label:ti("weather.metric_humidity"),val:Z`<span class="wc-metric-val">${t}<span class="wc-metric-unit">%</span></span>`}),e.has("wind")||null==i||d.push({cls:"wind",icon:"mdi:weather-windy",label:ti("weather.metric_wind"),val:Z`<span class="wc-metric-val">${Math.round(i)}<span class="wc-metric-unit">${a}</span><span class="wc-metric-dir">${Fi(r)}</span></span>`}),e.has("pressure")||null==s||d.push({cls:"pressure",icon:"mdi:gauge",label:ti("weather.metric_pressure"),val:Z`<span class="wc-metric-val">${Math.round(s)}<span class="wc-metric-unit">hPa</span></span>`}),e.has("uv")||null==o||d.push({cls:"uv",icon:"mdi:sun-wireless",label:ti("weather.metric_uv"),val:Z`<span class="wc-metric-val">${Math.round(o)}<span class="wc-metric-unit">UV</span></span>`}),e.has("visibility")||null==n||d.push({cls:"visibility",icon:"mdi:eye-outline",label:ti("weather.metric_visibility"),val:Z`<span class="wc-metric-val">${n}<span class="wc-metric-unit">km</span></span>`}),!e.has("sunrise")&&l&&d.push({cls:"sunrise",icon:"mdi:weather-sunset-up",label:ti("weather.sunrise"),val:Z`<span class="wc-metric-val">${l}</span>`}),!e.has("sunset")&&c&&d.push({cls:"sunset",icon:"mdi:weather-sunset-down",label:ti("weather.sunset"),val:Z`<span class="wc-metric-val">${c}</span>`}),0===d.length?ie:Z`
      <div class="wc-metrics" role="list">
        ${d.map(e=>Z`
          <div class="wc-metric ${e.cls}" role="listitem" aria-label="${e.label}" title="${e.label}">
            <ha-icon .icon=${e.icon} aria-hidden="true"></ha-icon>
            ${e.val}
          </div>
        `)}
      </div>
    `}_renderForecasts(e){const t=this._weatherConfig.show_daily,i=this._weatherConfig.show_hourly;if(!t&&!i)return ie;const a=[];return t&&a.push({value:"daily",label:ti("weather.daily_tab")}),i&&a.push({value:"hourly",label:ti("weather.hourly_tab")}),Z`
      <div class="wc-forecast-zone">
        <glass-tabs
          layout="segmented"
          size="sm"
          .items=${a}
          .value=${this._activeTab??""}
          aria-label=${ti("weather.title")}
          @glass-tab-change=${e=>this._switchTab(e.detail.value)}
        ></glass-tabs>

        <div class="wc-fold-sep ${"daily"===this._activeTab&&this._forecastDaily.length>0||"hourly"===this._activeTab&&this._forecastHourly.length>0?"visible":""}"></div>

        ${t?Z`
          <div class="fold ${"daily"===this._activeTab?"open":""}" id="wc-daily-panel" role="region" aria-label="${ti("weather.daily_tab")}" aria-hidden="${"daily"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-daily-list">
                ${this._forecastDaily.slice(0,7).map((e,t)=>{const i=this._mapCondition(e.condition),a=this._getConditionMeta(i),r=new Date(e.datetime),s=0===t?ti("weather.today"):(o=r,n=this._lang,o.toLocaleDateString(n,{weekday:"short"}));var o,n;return Z`
                    <div class="wc-day-row">
                      <span class="wc-day-label">${s}</span>
                      <ha-icon .icon="${a.icon}" class="wc-day-icon ${i}"></ha-icon>
                      <span class="wc-day-cond">${ti(a.textKey)}</span>
                      <div class="wc-day-temps">
                        <span class="wc-day-hi">${Math.round(e.temperature)}&deg;</span>
                        ${null!=e.templow?Z`<span class="wc-day-lo">${Math.round(e.templow)}&deg;</span>`:ie}
                      </div>
                      <span class="wc-day-precip">${null!=e.precipitation_probability&&e.precipitation_probability>0?e.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:ie}

        ${i?Z`
          <div class="fold ${"hourly"===this._activeTab?"open":""}" id="wc-hourly-panel" role="region" aria-label="${ti("weather.hourly_tab")}" aria-hidden="${"hourly"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-hourly-list">
                ${this._forecastHourly.slice(0,10).map((t,i)=>{const a=this._mapCondition(t.condition),r=this._getConditionMeta(a),s=new Date(t.datetime),o=0===i?ti("weather.now"):s.getHours()+"h";return Z`
                    <div class="wc-hour-row ${0===i?"now":""}">
                      <span class="wc-hour-time">${o}</span>
                      <ha-icon .icon="${r.icon}" class="wc-hour-icon ${a}"></ha-icon>
                      <span class="wc-hour-cond">${ti(r.textKey)}</span>
                      <span class="wc-hour-temp">${Math.round(t.temperature)}${e}</span>
                      <span class="wc-hour-precip">${null!=t.precipitation_probability&&t.precipitation_probability>0?t.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:ie}
      </div>
    `}_switchTab(e){this._activeTab=this._activeTab===e?null:e}}Oi([Te()],Hi.prototype,"_activeTab"),Oi([Te()],Hi.prototype,"_forecastDaily"),Oi([Te()],Hi.prototype,"_forecastHourly"),Oi([Te()],Hi.prototype,"_clockTime"),Oi([Te()],Hi.prototype,"_clockSec"),Oi([Te()],Hi.prototype,"_clockDay"),Oi([Te()],Hi.prototype,"_clockDate");try{customElements.define("glass-weather-card",Hi)}catch{}oi("glass-cover-card-editor");var Ni=Object.defineProperty,Vi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ni(t,i,s),s};const Bi=1,Ui=2,Wi=4,Ki=8,Gi=128,Xi={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains-closed"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"],awning:["mdi:awning-outline","mdi:awning-outline"],shade:["mdi:roller-shade-open","mdi:roller-shade"],window:["mdi:window-open","mdi:window-closed"],damper:["mdi:valve-open","mdi:valve"]},Yi={vertical:{open:"mdi:arrow-up",close:"mdi:arrow-down",stop:"mdi:stop"},garage:{open:"mdi:garage-open",close:"mdi:garage",stop:"mdi:stop"},gate:{open:"mdi:gate-open",close:"mdi:gate",stop:"mdi:stop"},door:{open:"mdi:door-open",close:"mdi:door-closed",stop:null},damper:{open:"mdi:valve-open",close:"mdi:valve",stop:null},window:{open:"mdi:window-open",close:"mdi:window-closed",stop:null}};function Qi(e,t){return(Xi[e]||Xi.shutter)[t?0:1]}class Ji extends ci{constructor(){super(...arguments),this._expanded=null,this._coverConfig={show_header:!0,dashboard_entities:[],entity_presets:{}},this._roomConfig=null,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1,this._throttleTimers=new Map,this._lastDirection=new Map,this._coversCache=null,this._coversCacheKey=""}static getConfigElement(){return document.createElement("glass-cover-card-editor")}getCardSize(){return 3}static{this.styles=[Lt,Pt,Mt,jt,Ot,Rt,Kt,m`
    :host {
      width: 100%;
      max-width: 31.25rem;
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

    .cover-card { position: relative; padding: 0.125rem 0.875rem; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
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
    /* No row-level hover: sub-buttons (icon-toggle + expand) carry their own. */
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

    /* Cover icon button — handled by <glass-icon-button>. Only override the
       active tint to match the entity colour token used elsewhere. */

    .cv-info { flex: 1; min-width: 0; }
    .cv-name {
      font-size: var(--fz-md); font-weight: 600; color: var(--t1); line-height: 1.2;
      overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
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
    .fold-sep-left  { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-right: auto; }
    .fold-sep-right { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-left: auto; }
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
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    /* ── Fold sections (Position / Inclinaison / Préréglages) ── */
    .cover-section { display: flex; flex-direction: column; gap: 0.4375rem; }

    /* Transport */
    .transport-row {
      display: flex; align-items: center; justify-content: center; gap: 0.375rem;
    }

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

    .ctrl-sep { height: 0.0625rem; background: var(--b1); margin: 0.125rem 0; }
  `]}connectedCallback(){super.connectedCallback(),this._listen("cover-config-changed",()=>{this._coversCacheKey="",this._loadConfig()}),this._listen("room-config-changed",e=>{this.areaId&&e.areaId===this.areaId&&(this._roomConfig=null,this._coversCacheKey="",this._loadRoomConfig(this.areaId))})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_collapseExpanded(){null!==this._expanded&&(this._expanded=null)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomConfig=null,this._roomLoading=!1),this._configLoaded||this._configLoading||(this._backend=new mi(this.hass),this._loadConfig())),e.has("areaId")&&this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._roomConfig=null,this._expanded=null,this.areaId&&this._loadRoomConfig(this.areaId))}getTrackedEntityIds(){return this._getCovers().map(e=>e.entityId)}async _loadConfig(){if(this._backend&&!this._configLoading){this._configLoading=!0;try{const e=await this._backend.send("get_config");e?.cover_card&&(this._coverConfig=e.cover_card),this._configLoaded=!0,this._configLoading=!1,this.areaId&&this._loadRoomConfig(this.areaId),this.requestUpdate()}catch{this._configLoading=!1}}}async _loadRoomConfig(e){if(this._backend&&!this._roomLoading){this._roomLoading=!0;try{const t=await this._backend.send("get_room",{area_id:e});this.areaId===e&&(this._roomConfig=t?{...t,entity_layouts:t.entity_layouts??{}}:null,this.requestUpdate())}catch{}finally{this._roomLoading=!1}}}_getCovers(){if(!this.hass)return[];let e;if(this.areaId){if(e=pi(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id),this._roomConfig){const t=new Set(this._roomConfig.hidden_entities);e=e.filter(e=>!t.has(e));const i=this._roomConfig.entity_order;e.sort((e,t)=>{const a=i.indexOf(e),r=i.indexOf(t);return-1!==a&&-1!==r?a-r:-1!==a?-1:-1!==r?1:0})}}else e=this._coverConfig.dashboard_entities;const t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.attributes.current_position}:${t.attributes.current_tilt_position}`:e}).join("|");return t===this._coversCacheKey&&this._coversCache||(this._coversCache=e.map(e=>{const t=this.hass?.states[e];return t?function(e,t){const i=t.attributes,a=i.device_class||"shutter",r=i.supported_features||0,s=i.current_position,o=i.current_tilt_position,n="open"===t.state||"opening"===t.state;return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,isOpen:n,position:s??null,tiltPosition:o??null,deviceClass:a,features:r}}(e,t):null}).filter(e=>null!==e),this._coversCacheKey=t),this._coversCache}_toggleCover(e,t){if(t?.stopPropagation(),!this.hass)return;const i=e.entity.state;if("opening"===i||"closing"===i)this._lastDirection.set(e.entityId,i),this._safeCallService("cover","stop_cover",{},{entity_id:e.entityId});else if("closed"===i)this._lastDirection.delete(e.entityId),this._safeCallService("cover","open_cover",{},{entity_id:e.entityId});else{const t=this._lastDirection.get(e.entityId);this._lastDirection.delete(e.entityId),"opening"===t?this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}):"closing"===t?this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}):this._safeCallService("cover","close_cover",{},{entity_id:e.entityId})}}_openCover(e,t){t.stopPropagation(),this.hass&&(di(this,"light"),this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}))}_closeCover(e,t){t.stopPropagation(),this.hass&&(di(this,"light"),this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}))}_stopCover(e,t){t.stopPropagation(),this.hass&&(di(this,"light"),this._safeCallService("cover","stop_cover",{},{entity_id:e.entityId}))}_setPosition(e,t){if(!this.hass)return;const i=this._throttleTimers.get(e.entityId);i&&clearTimeout(i),this._throttleTimers.set(e.entityId,window.setTimeout(()=>{this._throttleTimers.delete(e.entityId),this._safeCallService("cover","set_cover_position",{position:t},{entity_id:e.entityId})},50))}_setTiltPosition(e,t){if(!this.hass)return;const i=`${e.entityId}_tilt`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,window.setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("cover","set_cover_tilt_position",{tilt_position:t},{entity_id:e.entityId})},50))}_openAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&Bi&&this._safeCallService("cover","open_cover",{},{entity_id:t.entityId})}_closeAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&Ui&&this._safeCallService("cover","close_cover",{},{entity_id:t.entityId})}_setPreset(e,t,i){i.stopPropagation(),this.hass&&(di(this,"light"),e.features&Wi?this._safeCallService("cover","set_cover_position",{position:t},{entity_id:e.entityId}):t>0?this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}):this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}))}_toggleExpand(e){this._expanded=this._expanded===e?null:e}render(){this._lang;const e=this._getCovers();if(0===e.length&&!this.areaId)return this.style.display="none",ie;this.style.display="";const t=this._coverConfig.show_header,i=e.filter(e=>e.isOpen).length,a=e.length;return Z`
      ${t?Z`
        <div class="cover-header">
          <div class="cover-header-left">
            <span class="cover-title">${ti("cover.title")}</span>
            <span class="cover-count ${0===i?"none":i===a?"all":"some"}">${i}/${a}</span>
          </div>
          <glass-toggle
            active-color="purple"
            .checked=${i>0}
            aria-label=${ti(i>0?"cover.close_all_aria":"cover.open_all_aria")}
            @glass-toggle-change=${()=>i>0?this._closeAll():this._openAll()}
          ></glass-toggle>
        </div>
      `:ie}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${a>0?(i/a*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${0===e.length?Z`
            <div style="padding:16px;text-align:center;font-size:var(--fz-base);color:var(--t4);grid-column:1/-1;">${ti("config.cover_no_covers")}</div>
          `:ie}
          ${this.areaId?this._renderGrid(e):this._renderDashboardGrid(e)}
        </div>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;r?(t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(r,!0,!0)),t.push(this._renderControlFold(a,"left")),t.push(this._renderControlFold(r,"right")),i+=2):(t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++)}else t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++}return t}_getDashboardLayout(e){const t=this._coverConfig.dashboard_entity_layouts;return t&&t[e]?t[e]:!1!==this._coverConfig.dashboard_compact?"compact":"full"}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if("compact"===this._getDashboardLayout(a.entityId)){const r=i+1<e.length&&"compact"===this._getDashboardLayout(e[i+1].entityId)?e[i+1]:null;r?(t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(r,!0,!0)),t.push(this._renderControlFold(a,"left")),t.push(this._renderControlFold(r,"right")),i+=2):(t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++)}else t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++}return t}_renderCoverRow(e,t=!1,i=!1){const a=this._expanded===e.entityId,r=Gt(e.entity.state),s=["cv-row",e.isOpen?"open":"",t?"compact":"",i?"compact-right":"",r?"entity-unavailable":""].filter(Boolean).join(" "),o=this._bindGesture({onTap:()=>this._toggleCover(e),onLongPress:()=>this._toggleExpand(e.entityId),exclude:"glass-icon-button"});return Z`
      <div
        class=${s}
        @pointerdown=${o.pointerdown}
        @pointerup=${o.pointerup}
        @pointermove=${o.pointermove}
        @pointercancel=${o.pointercancel}
        @contextmenu=${o.contextmenu}
      >
        <glass-icon-button
          .icon=${Qi(e.deviceClass,e.isOpen)}
          ?active=${e.isOpen}
          ?glow=${e.isOpen}
          ?unavailable=${r}
          active-color="purple"
          aria-label=${ti("cover.toggle_aria",{name:e.name})}
          @click=${t=>this._toggleCover(e,t)}
        ></glass-icon-button>
        <button
          class="cv-expand-btn"
          aria-expanded=${a?"true":"false"}
          aria-label=${ti("cover.expand_aria",{name:e.name})}
        >
          <div class="cv-info">
            <div class="cv-name">${e.name}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${function(e){switch(e){case"open":return ti("cover.open");case"closed":return ti("cover.closed");case"opening":return ti("cover.opening");case"closing":return ti("cover.closing");default:return e}}(e.entity.state)}</span>
            </div>
          </div>
          ${null!==e.position?Z`
            <div class="cv-position">${e.position}<span class="unit">%</span></div>
          `:ie}
          ${r?Z`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:Z`<div class="cv-dot"></div>`}
        </button>
      </div>
    `}_renderControlFold(e,t="full"){const i=this._expanded===e.entityId;return Z`
      <div class="fold-sep fold-sep-${t} ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):ie}
        </div>
      </div>
    `}_renderControls(e){const t=e.features,i=(a=e.deviceClass,["shutter","blind","shade","curtain","awning"].includes(a)?Yi.vertical:Yi[a]||Yi.vertical);var a;const r=!!(t&Wi),s=!!(t&Gi),o=[];if(r){const t=this._coverConfig.entity_presets[e.entityId],i=t&&t.length>0?t:[0,25,50,75,100];for(const a of i){const t=a>=50,i=0===a?ti("cover.preset_closed"):100===a?ti("cover.preset_open"):`${a}%`;o.push({label:i,icon:Qi(e.deviceClass,t),position:a})}}else o.push({label:ti("cover.preset_closed"),icon:Qi(e.deviceClass,!1),position:0},{label:ti("cover.preset_open"),icon:Qi(e.deviceClass,!0),position:100});return Z`
      <div class="ctrl-panel">
        <div class="transport-row">
          ${t&Bi?Z`
            <glass-transport-button
              .icon=${i.open}
              active-color="purple"
              ?active=${100===e.position||null===e.position&&e.isOpen}
              aria-label=${ti("cover.open_aria",{name:e.name})}
              @click=${t=>this._openCover(e,t)}
            ></glass-transport-button>
          `:ie}
          ${t&Ki?Z`
            <glass-transport-button
              .icon=${i.stop||"mdi:stop"}
              aria-label=${ti("cover.stop_aria",{name:e.name})}
              @click=${t=>this._stopCover(e,t)}
            ></glass-transport-button>
          `:ie}
          ${t&Ui?Z`
            <glass-transport-button
              .icon=${i.close}
              active-color="purple"
              ?active=${0===e.position||null===e.position&&!e.isOpen}
              aria-label=${ti("cover.close_aria",{name:e.name})}
              @click=${t=>this._closeCover(e,t)}
            ></glass-transport-button>
          `:ie}
        </div>

        ${r?Z`
          <div class="cover-section">
            <glass-section-title label=${ti("cover.section_position")}></glass-section-title>
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${Qi(e.deviceClass,!1)}></ha-icon></div>
              <glass-slider
                .value=${e.position??0}
                color="var(--rgb-purple)"
                .label=${`${e.position??0}%`}
                @glass-slider-input=${t=>this._setPosition(e,t.detail.value)}
                @glass-slider-change=${t=>this._setPosition(e,t.detail.value)}
              ></glass-slider>
              <div class="slider-icon"><ha-icon .icon=${Qi(e.deviceClass,!0)}></ha-icon></div>
            </div>
          </div>
        `:ie}

        ${s?Z`
          <div class="cover-section">
            <glass-section-title label=${ti("cover.section_tilt")}></glass-section-title>
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
          </div>
        `:ie}

        <div class="cover-section">
          <glass-section-title label=${ti("cover.section_presets")}></glass-section-title>
          <div class="preset-row">
            ${o.map(t=>Z`
              <glass-chip
                size="sm"
                active-color="purple"
                ?active=${e.position===t.position}
                .icon=${t.icon}
                aria-label=${t.label}
                @click=${i=>this._setPreset(e,t.position,i)}
              >${t.label}</glass-chip>
            `)}
          </div>
        </div>
      </div>
    `}}Vi([Se()],Ji.prototype,"areaId"),Vi([Te()],Ji.prototype,"_expanded"),Vi([Te()],Ji.prototype,"_coverConfig");try{customElements.define("glass-cover-card",Ji)}catch{}const Zi=1,ea=2,ta=4,ia=8,aa=16,ra=32,sa=64,oa=128,na=256,la={heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},ca={eco:"success",comfort:"warning",boost:"heat",away:"info",sleep:"purple",activity:"accent",none:"accent"},da={heating:"climate.action_heating",cooling:"climate.action_cooling",idle:"climate.action_idle",off:"climate.action_off",drying:"climate.action_drying",preheating:"climate.action_heating"},ha={eco:"mdi:leaf",comfort:"mdi:sofa",boost:"mdi:rocket-launch",away:"mdi:home-export-outline",sleep:"mdi:bed",activity:"mdi:motion-sensor",none:"mdi:cancel"},pa={heat:"climate.mode_heat",cool:"climate.mode_cool",heat_cool:"climate.mode_heat_cool",auto:"climate.mode_auto",dry:"climate.mode_dry",fan_only:"climate.mode_fan_only",off:"climate.mode_off"},ua={eco:"climate.preset_eco",comfort:"climate.preset_comfort",boost:"climate.preset_boost",away:"climate.preset_away",sleep:"climate.preset_sleep",activity:"climate.preset_activity",none:"climate.preset_none"};const ga=120,ma=125,_a=90,fa=-120,va={heating:"mdi:fire",cooling:"mdi:snowflake",idle:"mdi:timer-sand",off:"mdi:power-standby",drying:"mdi:water-percent",preheating:"mdi:fire"};function ba(e,t,i,a){const r=function(e){return(e-90)*Math.PI/180}(a);return{x:e+i*Math.cos(r),y:t+i*Math.sin(r)}}function ya(e,t){const i=ba(ga,ma,_a,e),a=ba(ga,ma,_a,t);return`M ${i.x} ${i.y} A 90 90 0 1 1 ${a.x} ${a.y}`}function wa(e){const t=e.attributes,i="unavailable"===e.state||"unknown"===e.state,a="off"===e.state||i,r=i?"off":t.hvac_action||("off"===e.state?"off":"idle"),s=e.state,o=t.current_temperature,n=t.temperature??o??0,l=t.min_temp||7,c=t.max_temp||35,d=t.current_humidity,h=t.preset_mode,p=Math.PI*_a*(240/180),u=(null!=o?Math.max(0,Math.min(1,(o-l)/(c-l))):0)*p,g=function(e,t){return"heating"===e||"preheating"===e?"heat":"cooling"===e?"cool":"auto"===t||"heat_cool"===t?"auto-arc":"off"}(r,s),m=function(e){return"heating"===e||"preheating"===e?"heat":"cooling"===e?"cool":"idle"===e?"idle":"off"}(r),_=function(e,t,i){const a=Math.max(0,Math.min(1,(e-t)/(i-t)));return fa+240*a}(n,l,c),f=ba(ga,ma,_a,_),v=[];for(let x=0;x<=12;x++){const e=fa+x/12*240,t=x%3==0;v.push({inner:ba(ga,ma,86,e),outer:ba(ga,ma,_a+(t?6:3),e),isMajor:t,labelPos:ba(ga,ma,104,e),labelTemp:l+x/12*(c-l)})}const b=da[r]||"climate.unknown",y=va[r]||"mdi:help",w=null!=d||h&&"none"!==h;return Z`
    <div class="gauge-section">
      <div class="arc-gauge">
        <svg viewBox="0 0 240 165" fill="none">
          ${v.map(e=>ee`
            <line x1=${e.inner.x} y1=${e.inner.y} x2=${e.outer.x} y2=${e.outer.y}
              class=${e.isMajor?"arc-tick-major":"arc-tick"} />
            ${e.isMajor?ee`
              <text x=${e.labelPos.x} y=${e.labelPos.y} class="arc-tick-label">
                ${Math.round(e.labelTemp)}°
              </text>
            `:ie}
          `)}
          <path d=${ya(fa,120)} class="arc-bg" />
          ${a?ie:ee`
            <path d=${ya(fa,120)}
              class="arc-progress ${g}"
              stroke-dasharray=${p}
              stroke-dashoffset=${p-u} />
            <circle cx=${f.x} cy=${f.y} r="5" class="arc-target-dot" />
          `}
        </svg>
        <div class="gauge-center">
          <div class="gauge-current-temp ${a?"off":""}">${null!=o?Z`${o.toFixed(1)}<span class="unit">°</span>`:"--"}</div>
          <div class="gauge-action-label ${m}">
            <ha-icon .icon=${y} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${ti(b)}</span>
          </div>
          ${w?Z`
            <div class="gauge-sub-info">
              ${null!=d?Z`
                <ha-icon .icon=${"mdi:water-percent"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${d}%</span>
              `:ie}
              ${h&&"none"!==h?Z`
                ${null!=d?Z`<span class="gauge-sub-info-sep" aria-hidden="true">·</span>`:ie}
                <ha-icon .icon=${ha[h]||"mdi:cog"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${ua[h]?ti(ua[h]):h}</span>
              `:ie}
            </div>
          `:ie}
        </div>
      </div>
    </div>
  `}class xa{constructor(){this._canvas=null,this._particles=[],this._animFrame=null,this._currentAction="",this._width=0,this._height=0}attach(e){this._canvas=e}update(e,t,i){if(e===this._currentAction&&this._animFrame&&t===this._width&&i===this._height)return;if(this._currentAction=e,this._width=t,this._height=i,this.stop(),"off"===e||"idle"===e||!e){if(this._particles=[],this._canvas){const e=this._canvas.getContext("2d");e&&e.clearRect(0,0,this._canvas.width,this._canvas.height)}return}const a="heating"===e||"preheating"===e,r=2*t,s=2*i;if(this._particles=Array.from({length:30},()=>({x:Math.random()*r,y:Math.random()*s,size:1+2.5*Math.random(),speedX:.3*(Math.random()-.5),speedY:a?-(.3+.8*Math.random()):.3+.8*Math.random(),opacity:.1+.3*Math.random(),life:Math.random()})),!this._canvas)return;this._canvas.width=r,this._canvas.height=s,this._canvas.style.width=t+"px",this._canvas.style.height=i+"px";const o=this._canvas.getContext("2d");if(!o)return;const n=a?[249,115,22]:[56,189,248],l=()=>{o.clearRect(0,0,r,s);for(const e of this._particles){e.x+=e.speedX,e.y+=e.speedY,e.life+=.003;let t=e.opacity;e.life<.1&&(t*=e.life/.1),e.life>.8&&(t*=Math.max(0,(1-e.life)/.2)),(a&&e.y<-10||!a&&e.y>s+10||e.life>1)&&(e.y=a?s+10:-10,e.x=Math.random()*r,e.life=0),o.beginPath(),o.arc(e.x,e.y,e.size,0,2*Math.PI),o.fillStyle=`rgba(${n[0]},${n[1]},${n[2]},${t})`,o.fill(),o.beginPath(),o.arc(e.x,e.y,3*e.size,0,2*Math.PI),o.fillStyle=`rgba(${n[0]},${n[1]},${n[2]},${.15*t})`,o.fill()}this._animFrame=requestAnimationFrame(l)};l()}stop(){this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null)}destroy(){this.stop(),this._canvas=null,this._particles=[],this._currentAction=""}}oi("glass-climate-card-editor");var ka=Object.defineProperty,$a=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ka(t,i,s),s};const Ca={heating:0,cooling:1,idle:2,off:3};function Sa(e,t){const i=`climate.${e}_${t.toLowerCase().replace(/[^a-z0-9]+/g,"_")}`,a=ti(i);return a===i?t.replace(/_/g," "):a}class Ta extends ci{constructor(){super(...arguments),this._showHeader=!0,this._displayMode="list",this._configReady=!1,this._expanded=null,this._selectedEntity=null,this._foldOpen=!1,this._climateConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._cachedClimatesFingerprint="",this._dashboardEntities=[],this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._pendingTemps=new Map,this._schedules=null,this._schedulesLoaded=!1,this._rangeState={dragging:null,lowTemp:0,highTemp:0},this._rangeDragEntity=null,this._rangeDragCleanup=null}static getConfigElement(){return document.createElement("glass-climate-card-editor")}getCardSize(){return 3}get _isDashboardMode(){return!this.areaId}connectedCallback(){super.connectedCallback(),this._listen("climate-config-changed",()=>{this._climateConfigLoaded=!1,this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._loadConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._climateConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear(),this._pendingTemps.clear(),this._rangeDragCleanup&&(this._rangeDragCleanup(),this._rangeDragCleanup=null),this._thermalCanvas&&(this._thermalCanvas.destroy(),this._thermalCanvas=void 0)}_collapseExpanded(){null!==this._expanded&&(this._expanded=null),this._foldOpen&&(this._foldOpen=!1)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._climateConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._climateConfigLoaded&&this._loadConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="")}e.has("visibleAreaIds")&&(this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._dashboardHiddenLoaded=!1),"normal"===this._displayMode?this._updateThermalCanvas():this._thermalCanvas&&(this._thermalCanvas.destroy(),this._thermalCanvas=void 0)}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?gi("climate",this.hass,this.visibleAreaIds):this._getClimateIds()}async _loadConfig(){if(this.hass&&!this._climateConfigLoaded){this._climateConfigLoaded=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_config");if(e?.climate_card){this._showHeader=e.climate_card.show_header??!0,this._displayMode=this.areaId?e.climate_card.display_mode??"list":e.climate_card.dashboard_display_mode??"list",this._dashboardEntities=e.climate_card.dashboard_entities??[];const t=e.climate_card.hidden_entities??[];for(const e of t)this._dashboardHiddenEntities.add(e);this._cachedClimateIds=void 0,this._cachedClimatesFingerprint=""}this._configReady=!0,this.requestUpdate()}catch{this._configReady=!0}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new mi(this.hass));const t=this._backend,i=new Set,a=await Promise.all(e.map(e=>t.send("get_room",{area_id:e})));for(const e of a)if(e?.hidden_entities)for(const t of e.hidden_entities)i.add(t);this._dashboardHiddenEntities=i,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expanded=null,this._selectedEntity=null,this._foldOpen=!1,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear(),this._pendingTemps.clear()}_getClimateIds(){return this._cachedClimateIds||(this._cachedClimateIds=this._computeClimateIds()),this._cachedClimateIds}_computeClimateIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=pi(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("climate.")&&!e.has(t.entity_id)&&ui(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return t}if(this._isDashboardMode){if(this._dashboardEntities.length>0)return this._dashboardEntities.filter(e=>this.hass?.states[e]&&!this._dashboardHiddenEntities.has(e)&&ui(e,this._schedules));const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of pi(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("climate.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getClimates(){if(!this.hass)return[];const e=this._getClimateIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._cachedClimatesFingerprint&&this._cachedClimatesResult)return this._cachedClimatesResult;this._cachedClimatesFingerprint=t;const i=e.map(e=>this.hass?.states[e]).filter(e=>null!=e);return this._cachedClimatesResult=i,this._cachedClimatesResult}_toggle(e,t,i){if(i.stopPropagation(),!this.hass)return;const a=t.attributes.supported_features||0;if("off"===t.state)if(a&oa)this._safeCallService("climate","turn_on",{},{entity_id:e});else{const i=(t.attributes.hvac_modes||[]).find(e=>"off"!==e);i&&this._safeCallService("climate","set_hvac_mode",{hvac_mode:i},{entity_id:e})}else a&na?this._safeCallService("climate","turn_off",{},{entity_id:e}):this._safeCallService("climate","set_hvac_mode",{hvac_mode:"off"},{entity_id:e})}_setHvacMode(e,t){this.hass&&(di(this,"light"),this._safeCallService("climate","set_hvac_mode",{hvac_mode:t},{entity_id:e}))}_setPreset(e,t){this.hass&&(di(this,"light"),this._safeCallService("climate","set_preset_mode",{preset_mode:t},{entity_id:e}))}_setFanMode(e,t){this.hass&&this._safeCallService("climate","set_fan_mode",{fan_mode:t},{entity_id:e})}_setSwingMode(e,t){this.hass&&this._safeCallService("climate","set_swing_mode",{swing_mode:t},{entity_id:e})}_setTemperature(e,t){if(!this.hass)return;di(this,"light"),this._pendingTemps.set(`temp_${e}`,t),this.requestUpdate();const i=`temp_throttle_${e}`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("climate","set_temperature",{temperature:t},{entity_id:e}),this._pendingTemps.delete(`temp_${e}`)},400))}_setTemperatureRange(e,t,i){if(!this.hass)return;const a=`range_throttle_${e}`,r=this._throttleTimers.get(a);r&&clearTimeout(r),this._throttleTimers.set(a,setTimeout(()=>{this._throttleTimers.delete(a),this._safeCallService("climate","set_temperature",{target_temp_low:t,target_temp_high:i},{entity_id:e})},400))}_setHumidity(e,t){if(!this.hass)return;this._pendingTemps.set(`humidity_${e}`,t),this.requestUpdate();const i=`humidity_throttle_${e}`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("climate","set_humidity",{humidity:t},{entity_id:e}),this._pendingTemps.delete(`humidity_${e}`)},400))}_toggleAuxHeat(e,t){if(!this.hass)return;const i="on"===t.attributes.aux_heat;this._safeCallService("climate","set_aux_heat",{aux_heat:!i},{entity_id:e})}_onRangeDragStart(e,t,i){t.preventDefault(),this._rangeDragCleanup&&(this._rangeDragCleanup(),this._rangeDragCleanup=null);const a=this.hass?.states[i];if(!a)return;const r=a.attributes.min_temp||7,s=a.attributes.max_temp||35,o=a.attributes.target_temp_step||.5,n=a.attributes.target_temp_low??r,l=a.attributes.target_temp_high??s;this._rangeDragEntity=i,this._rangeState={dragging:e,lowTemp:n,highTemp:l};const c=t.target.closest(".range-track");if(!c)return;const d=t=>{const i=c.getBoundingClientRect(),a=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),n=r+a*(s-r),l=Math.round(n/o)*o;if("low"===e){const e=Math.max(r,Math.min(l,this._rangeState.highTemp-o));this._rangeState={...this._rangeState,lowTemp:e}}else{const e=Math.max(this._rangeState.lowTemp+o,Math.min(l,s));this._rangeState={...this._rangeState,highTemp:e}}this.requestUpdate()},h=()=>{this._setTemperatureRange(i,this._rangeState.lowTemp,this._rangeState.highTemp),this._rangeState={dragging:null,lowTemp:0,highTemp:0},this._rangeDragEntity=null,this.requestUpdate(),p()},p=()=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",h),this._rangeDragCleanup===p&&(this._rangeDragCleanup=null)};document.addEventListener("pointermove",d),document.addEventListener("pointerup",h),this._rangeDragCleanup=p}_updateThermalCanvas(){const e=this.shadowRoot?.querySelector("#thermal-canvas"),t=this.shadowRoot?.querySelector("#thermal-canvas-wrap");if(!e||!t)return;this._thermalCanvas||(this._thermalCanvas=new xa),this._thermalCanvas.attach(e);const i=this._selectedEntity||this._getClimateIds()[0],a=i?this.hass?.states[i]:void 0,r=a&&a.attributes.hvac_action||"off";this._thermalCanvas.update(r,t.offsetWidth,t.offsetHeight)}_tempUnit(){const e=this.hass,t=e?.config,i=t?.unit_system,a=i?.temperature;return"°F"===a||"F"===a?"°F":"°C"}_avgTemp(){const e=this._getClimates(),t=[];for(const i of e){const e=i.attributes.current_temperature;null!=e&&t.push(e)}return 0===t.length?null:(t.reduce((e,t)=>e+t,0)/t.length).toFixed(1)}_getHvacAction(e){return e.attributes.hvac_action||("off"===e.state?"off":"idle")}_getIcon(e,t){if(Gt(t.state))return"mdi:thermostat-off";const i=this.hass?.entities[e]?.icon,a=t.attributes.icon;return i||a||la[t.state]||"mdi:thermostat"}render(){if(this._lang,!this._configReady)return ie;const e=this._getClimates();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",ie;this.style.display=""}return this._isDashboardMode||0!==e.length?"normal"===this._displayMode?this._renderNormalMode(e):this._renderListMode(e):Z`
        ${this._showHeader?this._renderHeader(e):ie}
        <div class="glass climate-card">
          <div class="card-inner">
            <div class="empty-state">${ti("climate.no_climates")}</div>
          </div>
        </div>
      `}_renderHeader(e){const t=e.filter(e=>{const t=e.attributes.hvac_action||"";return"heating"===t||"cooling"===t||"preheating"===t}).length,i=e.length,a=0===t?"none":t===i?"all":"some",r=this._avgTemp(),s=this._tempUnit();return Z`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${ti("climate.title")}</span>
          <span class="card-count ${a}">${t}/${i}</span>
        </div>
        <span class="card-header-right">${null!=r?`${ti("climate.avg_label")} ${r}${s}`:""}</span>
      </div>
    `}_renderListMode(e){let t="";if(this._expanded&&this.hass?.states[this._expanded]){const e=this._getHvacAction(this.hass.states[this._expanded]);"heating"===e||"preheating"===e?t="heat":"cooling"===e&&(t="cool")}else{const i=e.some(e=>{const t=this._getHvacAction(e);return"heating"===t||"preheating"===t}),a=e.some(e=>"cooling"===this._getHvacAction(e));i?t="heat":a&&(t="cool")}return Z`
      ${this._showHeader?this._renderHeader(e):ie}
      <div class="glass climate-card list-mode">
        <div class="tint ${t}"></div>
        <div class="card-inner">
          ${e.map(e=>Z`
            ${this._renderListRow(e.entity_id,e)}
            ${this._renderListFold(e.entity_id,e)}
          `)}
        </div>
      </div>
    `}_renderListRow(e,t){const i=t.attributes,a=i.friendly_name||e.split(".")[1]||e,r=Gt(t.state),s="off"===t.state,o=this._getHvacAction(t),n=i.current_temperature,l=this._pendingTemps.get(`temp_${e}`)??i.temperature,c=this._expanded===e,d=t.state,h=i.preset_mode,p=this._getIcon(e,t),u=da[o]||"climate.unknown",g=h&&"none"!==h?h:d,m=this._bindGesture({onTap:()=>{r||this._toggle(e,t,new Event("tap"))},onLongPress:()=>{r||(this._expanded=c?null:e)},exclude:"glass-icon-button"}),_="heating"===o||"preheating"===o,f="cooling"===o,v=_?"heat":f?"cool":"info",b=_||f,y=_?"pulse-heat":f?"pulse-cool":"";return Z`
      <div class="cl-row ${r?"entity-unavailable":""}" data-action=${o}
        @pointerdown=${m.pointerdown}
        @pointermove=${m.pointermove}
        @pointerup=${m.pointerup}
        @pointercancel=${m.pointercancel}
        @contextmenu=${m.contextmenu}
      >
        <glass-icon-button
          ?active=${b}
          ?glow=${b}
          ?unavailable=${r}
          ?disabled=${r}
          .activeColor=${v}
          aria-label=${ti(s?"climate.turn_on_aria":"climate.turn_off_aria")}
          @click=${i=>this._toggle(e,t,i)}
        >
          <ha-icon class=${y} .icon=${p}></ha-icon>
        </glass-icon-button>
        <button class="cl-expand-area" type="button" aria-expanded=${c?"true":"false"}>
          <div class="cl-info">
            <div class="cl-name">${a}</div>
            <div class="cl-sub">
              <span class="cl-action-text">${ti(u)}</span>
              ${s?ie:Z`<span class="cl-mode-badge">${g}</span>`}
            </div>
          </div>
          <div class="cl-temps">
            <div class="cl-temp-current">${r?"--":null!=n?Z`${n.toFixed(1)}<span class="unit">°</span>`:"--"}</div>
            ${s||null==l?ie:Z`<div class="cl-temp-target">→ ${l.toFixed(1)}°</div>`}
          </div>
          ${r?Z`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:ie}
        </button>
      </div>
    `}_renderListFold(e,t){const i=this._expanded===e;if(Gt(t.state))return ie;const a=this._getHvacAction(t),r="cooling"===a?"cool":"",s=this._renderListTempControl(e,t);return Z`
      <div class="fold-sep ${i?"visible":""} ${r}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel">
            ${s}
            ${s!==ie?Z`<div class="section-sep ${"cool"===r?"cool":"heating"===a||"preheating"===a?"heat":""}"></div>`:ie}
            ${this._renderFoldControls(e,t)}
          </div>
        </div>
      </div>
    `}_renderListTempControl(e,t){if("off"===t.state||"fan_only"===t.state)return ie;const i=t.attributes.supported_features||0;if("heat_cool"===t.state&&i&ea){return function(e,t,i,a,r){if("heat_cool"!==e.state)return ie;if(!((e.attributes.supported_features||0)&ea))return ie;const s=e.attributes.min_temp||7,o=e.attributes.max_temp||35,n=e.attributes.target_temp_step||.5,l="low"===i.dragging?i.lowTemp:e.attributes.target_temp_low??s,c="high"===i.dragging?i.highTemp:e.attributes.target_temp_high??o,d=o-s,h=d>0?(l-s)/d*100:0,p=d>0?(c-s)/d*100:100;return Z`
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
          aria-label=${ti("climate.range_low_aria")}
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
          aria-label=${ti("climate.range_high_aria")}
          aria-valuemin=${l+n}
          aria-valuemax=${o}
          aria-valuenow=${c}
          style="left:${p}%;"
          @pointerdown=${e=>r("high",e)}
          @keydown=${e=>{"ArrowRight"===e.key||"ArrowUp"===e.key?(e.preventDefault(),a(l,Math.min(c+n,o))):"ArrowLeft"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),a(l,Math.max(c-n,l+n)))}}
        ></button>
      </div>
    </div>
  `}(t,this._tempUnit(),this._rangeDragEntity===e?this._rangeState:{dragging:null,lowTemp:0,highTemp:0},(t,i)=>this._setTemperatureRange(e,t,i),(t,i)=>this._onRangeDragStart(t,i,e))}if(!(i&Zi))return ie;const a=this._pendingTemps.get(`temp_${e}`)??t.attributes.temperature,r=t.attributes.target_temp_step||.5,s=t.attributes.min_temp||7,o=t.attributes.max_temp||35,n=t.attributes.current_temperature,l=this._getHvacAction(t),c="heating"===l||"preheating"===l?"heat":"cooling"===l?"cool":"off",d=this._tempUnit();return null==a?ie:Z`
      <div class="temp-control">
        <glass-stepper-button
          .icon=${"mdi:minus"}
          ?disabled=${a<=s}
          aria-label=${ti("climate.temp_down_aria")}
          @click=${()=>this._setTemperature(e,Math.max(s,a-r))}
        ></glass-stepper-button>
        <div class="temp-display">
          <div class="temp-display-label">${ti("climate.target")}</div>
          <div class="temp-display-value ${c}">${a.toFixed(1)}<span class="unit">${d}</span></div>
          ${null!=n?Z`
            <div class="temp-display-current">
              <ha-icon .icon=${"mdi:thermometer"} style="--mdc-icon-size:13px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              <span>${ti("climate.current_label")} ${n.toFixed(1)}${d}</span>
            </div>
          `:ie}
        </div>
        <glass-stepper-button
          .icon=${"mdi:plus"}
          ?disabled=${a>=o}
          aria-label=${ti("climate.temp_up_aria")}
          @click=${()=>this._setTemperature(e,Math.min(o,a+r))}
        ></glass-stepper-button>
      </div>
    `}_renderFoldControls(e,t){const i=this._getHvacAction(t),a="heating"===i||"preheating"===i?"heat":"cooling"===i?"cool":"",r=function(e,t){const i=e.attributes.hvac_modes||[];if(0===i.length)return ie;const a=e.state;return Z`
    <div class="mode-tile-grid">
      ${i.map(e=>{const i=e===a,r=la[e]||"mdi:thermostat",s=pa[e]?ti(pa[e]):e;return Z`
          <button
            class="mode-tile mode-${e.replace("_","-")} ${i?"active":""}"
            @click=${()=>t(e)}
            aria-label=${s}
            aria-pressed=${i?"true":"false"}
          >
            <ha-icon class="mode-tile-icon" .icon=${r}></ha-icon>
            <span class="mode-tile-label">${s}</span>
          </button>
        `})}
    </div>
  `}(t,t=>this._setHvacMode(e,t)),s=function(e,t){if("off"===e.state)return ie;if(!((e.attributes.supported_features||0)&aa))return ie;const i=e.attributes.preset_modes||[];if(0===i.length)return ie;const a=e.attributes.preset_mode;return Z`
    <div class="preset-row">
      ${i.map(e=>{const i=e===a,r=ha[e]||"mdi:tune",s=ua[e]?ti(ua[e]):e;return Z`
          <glass-chip
            size="sm"
            .activeColor=${ca[e]||"accent"}
            ?active=${i}
            .icon=${r}
            aria-label=${s}
            @click=${()=>t(e)}
          >${s}</glass-chip>
        `})}
    </div>
  `}(t,t=>this._setPreset(e,t)),o=this._renderAirSection(e,t);return Z`
      ${r}
      ${s!==ie?Z`
        ${r!==ie?Z`<div class="section-sep ${a}"></div>`:ie}
        ${s}
      `:ie}
      ${o!==ie?Z`
        ${r!==ie||s!==ie?Z`<div class="section-sep ${a}"></div>`:ie}
        ${o}
      `:ie}
    `}_renderAirSection(e,t){const i=t.attributes.supported_features||0,a="off"===t.state,r=!a&&i&ia&&t.attributes.fan_modes||[],s=!a&&i&ra&&t.attributes.swing_modes||[],o=!a&&!!(i&ta)&&null!=t.attributes.humidity,n=!!(i&sa);if(!(r.length||s.length||o||n))return ie;const l=t.attributes.fan_mode,c=t.attributes.swing_mode;return Z`
      <div class="air-section">
        ${r.length?Z`
          <div class="air-row">
            <glass-section-title label=${ti("climate.fan_mode")}></glass-section-title>
            <div class="air-pills">
              ${r.map(t=>Z`
                <glass-chip
                  size="sm"
                  active-color="info"
                  ?active=${t===l}
                  aria-label="${ti("climate.fan_mode")}: ${t}"
                  @click=${()=>this._setFanMode(e,t)}
                >${Sa("fm",t)}</glass-chip>
              `)}
            </div>
          </div>
        `:ie}
        ${s.length?Z`
          <div class="air-row">
            <glass-section-title label=${ti("climate.swing_mode")}></glass-section-title>
            <div class="air-pills">
              ${s.map(t=>Z`
                <glass-chip
                  size="sm"
                  active-color="info"
                  ?active=${t===c}
                  aria-label="${ti("climate.swing_mode")}: ${t}"
                  @click=${()=>this._setSwingMode(e,t)}
                >${Sa("sm",t)}</glass-chip>
              `)}
            </div>
          </div>
        `:ie}
        ${o?function(e,t,i){if(!((e.attributes.supported_features||0)&ta))return ie;if("off"===e.state)return ie;const a=i??e.attributes.humidity,r=e.attributes.min_humidity||30,s=e.attributes.max_humidity||99;return null==a?ie:Z`
    <div class="stepper-row">
      <span class="stepper-label">
        <ha-icon .icon=${"mdi:water-percent"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;margin-right:4px;"></ha-icon>
        ${ti("climate.humidity_target")}
      </span>
      <div class="stepper">
        <button
          class="btn-icon xs"
          @click=${()=>t(Math.max(r,a-1))}
          aria-label=${ti("climate.humidity_down_aria")}
          ?disabled=${a<=r}
        >
          <ha-icon .icon=${"mdi:minus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <span class="stepper-value">${a}%</span>
        <button
          class="btn-icon xs"
          @click=${()=>t(Math.min(s,a+1))}
          aria-label=${ti("climate.humidity_up_aria")}
          ?disabled=${a>=s}
        >
          <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    </div>
  `}(t,t=>this._setHumidity(e,t),this._pendingTemps.get(`humidity_${e}`)):ie}
        ${n?function(e,t){if(!((e.attributes.supported_features||0)&sa))return ie;const i="on"===e.attributes.aux_heat;return Z`
    <div class="aux-row">
      <ha-icon .icon=${"mdi:radiator"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;margin-right:6px;"></ha-icon>
      <span class="aux-label">${ti("climate.aux_heat")}</span>
      <glass-toggle
        active-color="heat"
        .checked=${i}
        aria-label=${ti("climate.aux_heat")}
        @glass-toggle-change=${t}
      ></glass-toggle>
    </div>
  `}(t,()=>this._toggleAuxHeat(e,t)):ie}
      </div>
    `}_renderNormalMode(e){const t=this._dashboardEntities.length>0||(this._roomConfig?.entity_order?.length??0)>0?e:[...e].sort((e,t)=>{const i=this._getHvacAction(e),a=this._getHvacAction(t);return(Ca[i]??3)-(Ca[a]??3)}),i=this._selectedEntity||t[0]?.entity_id,a=t.find(e=>e.entity_id===i)||t[0];if(!a)return Z``;const r=this._getHvacAction(a),s="heating"===r||"preheating"===r?"heat":"cooling"===r?"cool":"auto"===a.state||"heat_cool"===a.state?"auto-tint":"",o="heating"===r||"preheating"===r?"heat-sep":"cooling"===r?"cool-sep":"",n=this._bindGesture({onTap:()=>{this._toggle(a.entity_id,a,new Event("tap"))},onLongPress:()=>{this._foldOpen=!this._foldOpen;const e=this.renderRoot.querySelector(".climate-card");e&&(e.classList.add("lp-pulse"),e.addEventListener("animationend",()=>e.classList.remove("lp-pulse"),{once:!0}))},onSwipe:e=>{if(t.length<=1)return;const a=t.findIndex(e=>e.entity_id===i),r="left"===e?(a+1)%t.length:(a-1+t.length)%t.length;this._selectedEntity=t[r].entity_id},exclude:"button, glass-icon-button, glass-chip, glass-toggle, glass-stepper-button, .entity-tab, .mode-tile"});return Z`
      ${this._showHeader?this._renderHeader(e):ie}
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
            ${wa(a)}
            ${this._renderNormalTempStepper(a)}
          </div>
        </div>
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner normal-fold-inner" data-tint=${s||"none"}>
            <div class="ctrl-fold-sep-top ${o}"></div>
            <div class="ctrl-panel">
              ${this._renderFoldControls(a.entity_id,a)}
            </div>
          </div>
        </div>
      </div>
    `}_renderEntityTabs(e){if(e.length<=1)return ie;const t=this._selectedEntity||e[0]?.entity_id;return Z`
      <div class="entity-tabs">
        ${e.map(e=>{const i=e.attributes.friendly_name||e.entity_id,a=this._getHvacAction(e),r=e.entity_id===t,s="heating"===a||"preheating"===a?"heat":"cooling"===a?"cool":"",o=this.hass?.entities[e.entity_id],n=o?hi(o,this.hass?.devices):null,l=n?this.hass?.areas[n]:null;return Z`
            <button class="entity-tab ${r?"active":""} ${s}"
              @click=${()=>{this._selectedEntity=e.entity_id}}
              aria-label=${i}
              aria-pressed=${r?"true":"false"}>
              <ha-icon .icon=${l?.icon||"mdi:home"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            </button>
          `})}
      </div>
    `}_renderNormalTempStepper(e){if("off"===e.state||"fan_only"===e.state)return ie;const t=e.attributes.supported_features||0;if(!(t&Zi))return ie;if("heat_cool"===e.state&&t&ea)return ie;const i=e.entity_id,a=this._pendingTemps.get(`temp_${i}`)??e.attributes.temperature,r=e.attributes.target_temp_step||.5,s=e.attributes.min_temp||7,o=e.attributes.max_temp||35,n=this._getHvacAction(e),l="heating"===n||"preheating"===n?"heat":"cooling"===n?"cool":"auto"===e.state||"heat_cool"===e.state?"auto-val":"off";return null==a?ie:Z`
      <div class="temp-control-panel">
        <glass-stepper-button
          surface="dark"
          .icon=${"mdi:minus"}
          ?disabled=${a<=s}
          aria-label=${ti("climate.temp_down_aria")}
          @click=${()=>this._setTemperature(i,Math.max(s,a-r))}
        ></glass-stepper-button>
        <div class="target-display">
          <div class="target-label">${ti("climate.target")}</div>
          <div class="target-value ${l}">${a.toFixed(1)}<span class="unit">${this._tempUnit()}</span></div>
        </div>
        <glass-stepper-button
          surface="dark"
          .icon=${"mdi:plus"}
          ?disabled=${a>=o}
          aria-label=${ti("climate.temp_up_aria")}
          @click=${()=>this._setTemperature(i,Math.min(o,a+r))}
        ></glass-stepper-button>
      </div>
    `}static{this.styles=[Lt,Pt,Mt,jt,Ot,Rt,Kt,m`
    :host {
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
      color: var(--t1);

      /* Climate tokens */
      --cl-heat: #f97316;
      --cl-heat-bg: rgba(var(--rgb-heat), 0.1);
      --cl-heat-border: rgba(var(--rgb-heat), 0.15);
      --cl-heat-glow: rgba(var(--rgb-heat), 0.4);
      --cl-heat-sub: rgba(var(--rgb-heat), 0.6);

      --cl-cool: #38bdf8;
      --cl-cool-bg: rgba(var(--rgb-cool), 0.1);
      --cl-cool-border: rgba(var(--rgb-cool), 0.15);
      --cl-cool-glow: rgba(var(--rgb-cool), 0.4);
      --cl-cool-sub: rgba(var(--rgb-cool), 0.6);

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
    .card-count.some { background: rgba(var(--rgb-heat), 0.15); color: var(--cl-heat); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(var(--rgb-heat), 0.2); color: var(--cl-heat); }
    .card-header-right { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }

    /* ── Card Body ── */
    .climate-card { position: relative; overflow: hidden; }
    .climate-card.list-mode { padding: 0.125rem 0.875rem; }
    .climate-card.normal-mode {
      padding: 0.875rem;
      touch-action: pan-y; user-select: none; -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent; cursor: default;
      transition: border-color var(--t-fast), border-radius var(--t-layout);
      display: flex; flex-direction: column; justify-content: center;
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
    /* No row-level hover: the row contains its own interactive buttons
       (icon-toggle + expand-area) which carry their own hover/active states. */
    @media (pointer: coarse) {
      .cl-row:active { animation: bounce 0.3s ease; }
    }

    /* Pulse animations applied to the <ha-icon> slotted into the
       <glass-icon-button> when the climate is actively heating or cooling. */
    @keyframes pulse-heat {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(var(--rgb-heat), 0.6)); }
      50%      { filter: drop-shadow(0 0 2px rgba(var(--rgb-heat), 0.2)); }
    }
    @keyframes pulse-cool {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(var(--rgb-cool), 0.6)); }
      50%      { filter: drop-shadow(0 0 2px rgba(var(--rgb-cool), 0.2)); }
    }
    glass-icon-button ha-icon.pulse-heat {
      animation: pulse-heat 2s ease-in-out infinite; will-change: filter;
    }
    glass-icon-button ha-icon.pulse-cool {
      animation: pulse-cool 2s ease-in-out infinite; will-change: filter;
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
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
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

    /* Status dot removed per design feedback — heating/cooling state is
       already conveyed by the row tint + temperature color (cl-temp-target). */

    /* Unavailable badge inline */
    .cl-expand-area .unavailable-badge {
      position: static;
      flex-shrink: 0;
      --mdc-icon-size: 0.75rem;
      color: var(--c-warning);
    }

    /* ── Fold separator ── */
    .fold-sep {
      height: 0; margin: 0 0.75rem; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-heat), 0.25), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std), height 0.25s var(--ease-std);
    }
    .fold-sep.cool {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-cool), 0.25), transparent);
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
      display: flex; flex-direction: column; gap: 0.625rem;
    }

    /* ── Section separator (tinted by current hvac action) ── */
    .section-sep {
      height: 1px; margin: 0.0625rem 0.25rem;
      background: linear-gradient(90deg, transparent, var(--b2), transparent);
      transition: background var(--t-med);
    }
    .section-sep.heat {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-heat), 0.25), transparent);
    }
    .section-sep.cool {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-cool), 0.25), transparent);
    }

    /* ── Large temperature stepper (list mode fold) ── */
    .temp-control {
      display: flex; align-items: center; justify-content: center; gap: 1rem;
      padding: 0.5rem 0;
    }

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
      position: relative; overflow: hidden;
      background: linear-gradient(135deg, rgba(var(--rgb-white),0.03), rgba(var(--rgb-white),0.01));
      backdrop-filter: var(--blur-lg);
      -webkit-backdrop-filter: var(--blur-lg);
      border: 1px solid var(--b2);
      border-top: none;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      box-shadow: 0 8px 32px rgba(var(--rgb-black),0.3), 0 2px 8px rgba(var(--rgb-black),0.2), inset 0 -1px 0 rgba(var(--rgb-black),0.1);
    }
    /* Atmospheric halo at fold bottom, tinted by current hvac action */
    .normal-fold-inner::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(ellipse 80% 50% at 50% 100%, var(--fold-halo, transparent), transparent 70%);
      opacity: 0; transition: opacity var(--t-slow), background var(--t-slow);
      z-index: 0;
    }
    .normal-fold-inner[data-tint="heat"] { --fold-halo: rgba(var(--rgb-heat), 0.12); }
    .normal-fold-inner[data-tint="cool"] { --fold-halo: rgba(var(--rgb-cool), 0.12); }
    .normal-fold-inner[data-tint="auto-tint"] { --fold-halo: rgba(var(--rgb-purple), 0.10); }
    .normal-fold-inner[data-tint]:not([data-tint="none"])::after { opacity: 1; }
    .normal-fold-inner > * { position: relative; z-index: 1; }
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
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-heat), 0.25), transparent);
    }
    .ctrl-fold-sep-top.cool-sep {
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-cool), 0.25), transparent);
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

    .entity-tab.heat { color: var(--cl-heat-sub); }
    .entity-tab.cool { color: var(--cl-cool-sub); }

    .entity-tab.active {
      background: var(--s4); color: var(--t1);
      box-shadow: 0 1px 4px rgba(var(--rgb-black),0.2);
    }
    .entity-tab.active.heat {
      background: var(--cl-heat-bg); color: var(--cl-heat);
      box-shadow: 0 1px 6px rgba(var(--rgb-heat), 0.15);
    }
    .entity-tab.active.cool {
      background: var(--cl-cool-bg); color: var(--cl-cool);
      box-shadow: 0 1px 6px rgba(var(--rgb-cool), 0.15);
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
    .gauge-sub-info-sep { color: var(--t4); }

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
    /* glass-stepper-button surface="dark" handles the normal-mode stepper */
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

    /* ── Mode tiles (primary HVAC selection) ── */
    .mode-tile-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(7.25rem, 1fr));
      gap: 0.375rem;
    }
    .mode-tile {
      position: relative; overflow: hidden;
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.5625rem 0.75rem; min-height: var(--tap-lg);
      border-radius: var(--radius-md);
      background: var(--s1);
      border: 1px solid var(--b2);
      font-family: inherit; font-size: var(--fz-base); font-weight: 600;
      color: var(--t3); text-align: left;
      cursor: pointer; outline: none;
      transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .mode-tile-icon {
      --mdc-icon-size: 1.125rem; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: color var(--t-fast), filter var(--t-fast);
    }
    .mode-tile-label {
      min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .mode-tile:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .mode-tile:not(.active):hover { background: var(--s2); color: var(--t2); border-color: var(--b3); }
    }
    @media (hover: hover) { .mode-tile:active { transform: scale(0.97); } }
    @media (pointer: coarse) { .mode-tile:active { animation: bounce 0.3s ease; } }

    /* Active states (atmospheric glow at top-left, tinted tile) */
    .mode-tile.active::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      background: radial-gradient(ellipse at 0% 0%, currentColor, transparent 60%);
      opacity: 0.10; pointer-events: none;
    }
    .mode-tile.mode-heat.active,
    .mode-tile.mode-dry.active {
      background: var(--cl-heat-bg); border-color: var(--cl-heat-border); color: var(--cl-heat);
    }
    .mode-tile.mode-heat.active .mode-tile-icon { animation: pulse-heat 2s ease-in-out infinite; will-change: filter; }
    .mode-tile.mode-cool.active,
    .mode-tile.mode-fan-only.active {
      background: var(--cl-cool-bg); border-color: var(--cl-cool-border); color: var(--cl-cool);
    }
    .mode-tile.mode-cool.active .mode-tile-icon { animation: pulse-cool 2s ease-in-out infinite; will-change: filter; }
    .mode-tile.mode-auto.active,
    .mode-tile.mode-heat-cool.active {
      background: var(--cl-auto-bg); border-color: var(--cl-auto-border); color: var(--cl-auto);
    }
    .mode-tile.mode-off.active {
      background: var(--s3); border-color: var(--b3); color: var(--t2);
    }

    /* ── Preset chips (ambiance row, horizontal scroll) ── */
    .preset-row {
      display: flex; gap: 0.375rem; overflow-x: auto;
      padding: 0.125rem 0.0625rem; margin: 0 -0.0625rem;
      scrollbar-width: none;
    }
    .preset-row::-webkit-scrollbar { display: none; }

    /* ── Air section (Fan, Swing, Humidity, Aux) ──
       Each row is a stacked group: <glass-section-title> eyebrow on
       top, pills below. The eyebrow already brings its own
       margin-bottom (0.375rem) so the row has no extra gap. */
    .air-section { display: flex; flex-direction: column; gap: 0.625rem; }
    .air-row {
      display: flex; flex-direction: column;
    }
    .air-pills {
      display: flex; gap: 0.375rem; overflow-x: auto; scrollbar-width: none;
      padding: 0 0.375rem;
    }
    .air-pills::-webkit-scrollbar { display: none; }
    .air-pills glass-chip {
      flex-shrink: 0;
      text-transform: capitalize;
    }

    /* Reduced motion: kill all non-essential animations */
    @media (prefers-reduced-motion: reduce) {
      .mode-tile.active .mode-tile-icon { animation: none; }
      .normal-fold-inner::after { transition: none; }
      .section-sep { transition: none; }
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
      box-shadow: 0 0 8px var(--cl-heat-glow);
    }
    .range-thumb.high {
      background: var(--cl-cool); border-color: var(--cl-cool);
      box-shadow: 0 0 8px var(--cl-cool-glow);
    }

    /* ── Aux heat row (toggle handled by <glass-toggle>) ── */
    .aux-row { display: flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0; }
    .aux-label { font-size: var(--fz-base); font-weight: 600; color: var(--t2); flex: 1; }
  `]}}$a([Se({attribute:!1})],Ta.prototype,"areaId"),$a([Se({attribute:!1})],Ta.prototype,"visibleAreaIds"),$a([Te()],Ta.prototype,"_showHeader"),$a([Te()],Ta.prototype,"_displayMode"),$a([Te()],Ta.prototype,"_configReady"),$a([Te()],Ta.prototype,"_expanded"),$a([Te()],Ta.prototype,"_selectedEntity"),$a([Te()],Ta.prototype,"_foldOpen");try{customElements.define("glass-climate-card",Ta)}catch{}oi("glass-fan-card-editor");var Ia=Object.defineProperty,za=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ia(t,i,s),s};const Aa=1,Ea=2,La=4,Pa=8,Ma={auto:"mdi:autorenew",eco:"mdi:leaf",night:"mdi:weather-night",nuit:"mdi:weather-night",comfort:"mdi:sofa",confort:"mdi:sofa",silent:"mdi:volume-off",silence:"mdi:volume-off",turbo:"mdi:lightning-bolt"};function Oa(e,t){return e<=0?0:Math.max(1,Math.min(t,Math.round(e/(100/t))))}function Ra(e,t){return e<=0?0:e/t*100}function Da(e,t){return Ra(Oa(e,t),t)}const ja={auto:"fan.preset_auto",eco:"fan.preset_eco",night:"fan.preset_night",nuit:"fan.preset_night",comfort:"fan.preset_comfort",confort:"fan.preset_comfort",silent:"fan.preset_silent",silence:"fan.preset_silent",turbo:"fan.preset_turbo"};function Fa(e){const t=ja[e.toLowerCase()];return t?ti(t):e.charAt(0).toUpperCase()+e.slice(1)}class qa extends ci{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._showHeader=!0,this._fanConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._fansFingerprint="",this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._schedules=null,this._schedulesLoaded=!1}static getConfigElement(){return document.createElement("glass-fan-card-editor")}getCardSize(){return 3}get _isDashboardMode(){return!this.areaId}static{this.styles=[Lt,Pt,Mt,jt,Ot,Rt,Kt,m`
    :host {
      width: 100%;
      max-width: 31.25rem;
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

    /* ── Card Body ── */
    .fan-card { position: relative; padding: 0.125rem 0.875rem; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
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
    /* No row-level hover: sub-buttons (icon-toggle + expand) carry their own. */
    @media (pointer: coarse) {
      .fan-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Spinning animation (applies to the icon inside <glass-icon-button>) ── */
    @keyframes spin-fan {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-fan-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    .fan-row.on glass-icon-button ha-icon.spinning {
      animation: spin-fan var(--spin-duration, 2s) linear infinite;
      will-change: transform;
    }
    .fan-row.on glass-icon-button ha-icon.spinning.reverse {
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
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
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
    /* In a compact pair, anchor the separator under the opened fan only. */
    .fold-sep.fold-sep-left  { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-right: auto; }
    .fold-sep.fold-sep-right { grid-column: 1 / -1; width: calc(50% - 0.75rem); margin-left: auto; }
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
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    /* ── Fold sections (Vitesse / Mode / Direction / Oscillation) ── */
    .fan-section {
      display: flex; flex-direction: column; gap: 0.4375rem;
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
    .direction-btns { display: flex; gap: 0.25rem; }

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
  `]}connectedCallback(){super.connectedCallback(),this._listen("fan-config-changed",()=>{this._fanConfigLoaded=!1,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadFanConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._fanConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._fanConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._fanConfigLoaded&&this._loadFanConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedFanIds=void 0,this._fansFingerprint="")}if(e.has("visibleAreaIds")&&(this._cachedFanIds=void 0,this._fansFingerprint="",this._dashboardHiddenLoaded=!1),e.has("hass")&&this._dragValues.size>0){const e=this._getFanInfos();let t=!1;const i=new Map(this._dragValues);for(const a of e){const e=`speed:${a.entityId}`,r=i.get(e);void 0!==r&&Math.abs(a.percentage-r)<=2&&(i.delete(e),t=!0);const s=`light:${a.entityId}`,o=i.get(s);if(void 0!==o&&a.lightEntityId){const e=this.hass?.states[a.lightEntityId];if(e){const a=e.attributes.brightness??0,r=Math.round(a/255*100);Math.abs(r-o)<=2&&(i.delete(s),t=!0)}}}t&&(this._dragValues=i)}}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?gi("fan",this.hass,this.visibleAreaIds):this._getFanInfos().map(e=>e.entityId)}async _loadFanConfig(){if(this.hass&&!this._fanConfigLoaded){this._fanConfigLoaded=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_config");e?.fan_card&&(this._showHeader=e.fan_card.show_header??!0)}catch{}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new mi(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedFanIds=void 0,this._fansFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_getFanIds(){return this._cachedFanIds||(this._cachedFanIds=this._computeFanIds()),this._cachedFanIds}_computeFanIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=pi(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("fan.")&&!e.has(t.entity_id)&&ui(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return t}if(this._isDashboardMode){const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of pi(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("fan.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getFanInfos(){if(!this.hass)return[];const e=this._getFanIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._fansFingerprint&&this._cachedFansResult)return this._cachedFansResult;this._fansFingerprint=t;const i=e.map(e=>{const t=this.hass?.states[e];return t?this._buildFanInfo(e,t):null}).filter(e=>null!==e);return this._isDashboardMode?this._cachedFansResult=i.filter(e=>e.isOn):this._cachedFansResult=i,this._cachedFansResult}_buildFanInfo(e,t){const i=t.attributes,a="on"===t.state,r=i.percentage??0,s=i.percentage_step,o=i.speed_count??(s&&s>0?Math.round(100/s):3),n=i.direction||null,l=i.oscillating||!1,c=i.preset_mode||null,d=i.preset_modes||[],h=i.supported_features||0,p=function(e,t){if("ceiling"===t.attributes.device_class)return!0;const i=e.toLowerCase();return i.includes("ceiling")||i.includes("plafond")||i.includes("plafonnier")}(e,t),u=this.hass?.entities[e]?.icon,g=i.icon,m=u||g||(p?"mdi:ceiling-fan":"mdi:fan"),_=p&&this.hass?function(e,t){const i=e.replace("fan.",""),a=[`light.${i}`,`light.${i}_light`];for(const r of a)if(t.states[r])return r;if(t.entities){const i=t.entities[e];if(i?.device_id)for(const[e,a]of Object.entries(t.entities))if(e.startsWith("light.")&&a.device_id===i.device_id&&t.states[e])return e}return null}(e,this.hass):null,f=!(!!(h&Pa)&&d.length>0||!!(h&La)||!!(h&Ea)||_);return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,icon:m,isCeiling:p,isOn:a,percentage:a?r:0,speedCount:o,direction:n,oscillating:l,presetMode:a?c:null,presetModes:d,supportedFeatures:h,lightEntityId:_,isSimple:f}}_toggleFan(e,t){if(t?.stopPropagation(),this.hass)if(di(this,"light"),e.isOn)this._safeCallService("fan","turn_off",{},{entity_id:e.entityId});else{if(e.supportedFeatures&Aa){const t=Ra(1,e.speedCount);this._safeCallService("fan","turn_on",{percentage:t},{entity_id:e.entityId})}else this._safeCallService("fan","turn_on",{},{entity_id:e.entityId})}}_toggleAll(){if(!this.hass)return;const e=this._getFanInfos(),t=e.some(e=>e.isOn);if(t){const t=e.map(e=>e.entityId);this._safeCallService("fan","turn_off",{},{entity_id:t})}else for(const i of e){if(i.supportedFeatures&Aa){const e=Ra(1,i.speedCount);this._safeCallService("fan","turn_on",{percentage:e},{entity_id:i.entityId})}else this._safeCallService("fan","turn_on",{},{entity_id:i.entityId})}t&&(this._expandedEntity=null)}_setSpeed(e,t){this.hass&&(di(this,"light"),0!==t?(e.isOn||this._safeCallService("fan","turn_on",{},{entity_id:e.entityId}),this._safeCallService("fan","set_percentage",{percentage:t},{entity_id:e.entityId})):this._safeCallService("fan","turn_off",{},{entity_id:e.entityId}))}_setPresetMode(e,t,i){i.stopPropagation(),this.hass&&(e.presetMode!==t?(e.isOn||this._safeCallService("fan","turn_on",{},{entity_id:e.entityId}),this._safeCallService("fan","set_preset_mode",{preset_mode:t},{entity_id:e.entityId})):e.percentage>0&&this._safeCallService("fan","set_percentage",{percentage:e.percentage},{entity_id:e.entityId}))}_setDirection(e,t,i){i.stopPropagation(),this.hass&&(di(this,"light"),this._safeCallService("fan","set_direction",{direction:t},{entity_id:e.entityId}))}_toggleOscillation(e,t){t.stopPropagation(),this.hass&&this._safeCallService("fan","oscillate",{oscillating:!e.oscillating},{entity_id:e.entityId})}_toggleCeilingLight(e,t){if(t.stopPropagation(),!this.hass||!e.lightEntityId)return;const i=this.hass.states[e.lightEntityId],a="on"===i?.state?"turn_off":"turn_on";this._safeCallService("light",a,{},{entity_id:e.lightEntityId})}_hasControls(e){const t=e.supportedFeatures;return!!(t&Aa||t&Pa||t&La||t&Ea||e.lightEntityId)}_toggleExpand(e){this._expandedEntity===e.entityId?this._expandedEntity=null:this._expandedEntity=e.entityId}_onSpeedSliderInput(e,t){const i=Da(t,e.speedCount),a=new Map(this._dragValues);a.set(`speed:${e.entityId}`,i),this._dragValues=a}_onSpeedSliderChange(e,t){const i=Da(t,e.speedCount);this._setSpeed(e,i);const a=new Map(this._dragValues);a.delete(`speed:${e.entityId}`),this._dragValues=a}_onLightSliderInput(e,t){if(!e.lightEntityId||!this.hass)return;const i=new Map(this._dragValues);i.set(`light:${e.entityId}`,t),this._dragValues=i;const a=`light:${e.entityId}`,r=this._throttleTimers.get(a);r&&clearTimeout(r);const s=e.lightEntityId;this._throttleTimers.set(a,setTimeout(()=>{this._throttleTimers.delete(a);const e=this._dragValues.get(a)??t,i=Math.round(e/100*255);this._safeCallService("light","turn_on",{brightness:i},{entity_id:s})},100))}_onLightSliderChange(e,t){if(!e.lightEntityId||!this.hass)return;const i=Math.round(t/100*255);this._safeCallService("light","turn_on",{brightness:i},{entity_id:e.lightEntityId});const a=new Map(this._dragValues);a.delete(`light:${e.entityId}`),this._dragValues=a}render(){this._lang;const e=this._getFanInfos();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",ie;this.style.display=""}if(!this._isDashboardMode&&0===e.length)return Z`
        ${this._showHeader?this._renderHeader(0,0):ie}
        <div class="glass fan-card">
          <div class="card-inner">
            <div class="empty-state">${ti("fan.no_fans")}</div>
          </div>
        </div>
      `;const t=e.filter(e=>e.isOn).length,i=e.length;return Z`
      ${this._showHeader?this._renderHeader(t,i):ie}
      <div class="glass fan-card">
        <div class="tint" style="background:radial-gradient(ellipse at 30% 30%, var(--c-accent), transparent 70%);opacity:${i>0?(t/i*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${this._isDashboardMode?this._renderDashboardGrid(e):this._renderGrid(e)}
        </div>
      </div>
    `}_renderHeader(e,t){const i=e>0,a=0===e?"none":e===t?"all":"some";return Z`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${ti("fan.title")}</span>
          <span class="card-count ${a}">${e}/${t}</span>
        </div>
        <glass-toggle
          active-color="cool"
          .checked=${i}
          aria-label=${ti(i?"fan.toggle_all_on_aria":"fan.toggle_all_off_aria")}
          @glass-toggle-change=${()=>this._toggleAll()}
        ></glass-toggle>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;r?(t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(r,!0,!0)),t.push(this._renderControlFold(a,"left")),t.push(this._renderControlFold(r,"right")),i+=2):(t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++)}else t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++}return t}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],r=i+1<e.length?e[i+1]:null;r?(t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(r,!0,!0)),t.push(this._renderControlFold(a,"left")),t.push(this._renderControlFold(r,"right")),i+=2):(t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++)}return t}_renderFanRow(e,t=!1,i=!1){const a=this._dragValues.get(`speed:${e.entityId}`),r=a??e.percentage,s=this._expandedEntity===e.entityId,o=this._hasControls(e);let n;n=o?e.isOn||void 0!==a?`${r}%`:ti("fan.off"):e.isOn?ti("common.on"):ti("fan.off");const l=Gt(e.entity.state),c=["fan-row",e.isOn?"on":"",t?"compact":"",i?"compact-right":"",l?"entity-unavailable":""].filter(Boolean).join(" "),d=this._bindGesture({onTap:()=>this._toggleFan(e),onLongPress:o?()=>this._toggleExpand(e):void 0,exclude:"glass-icon-button"});return Z`
      <div
        class=${c}
        @pointerdown=${d.pointerdown}
        @pointerup=${d.pointerup}
        @pointermove=${d.pointermove}
        @pointercancel=${d.pointercancel}
        @contextmenu=${d.contextmenu}
      >
        <glass-icon-button
          ?active=${e.isOn}
          ?glow=${e.isOn}
          ?unavailable=${l}
          active-color="cool"
          aria-label=${ti("fan.toggle_aria",{name:e.name})}
          @click=${t=>this._toggleFan(e,t)}
        >
          <ha-icon
            .icon=${e.icon}
            class="${e.isOn?"spinning":""} ${e.isOn&&"reverse"===e.direction?"reverse":""}"
            style="${e.isOn?"--spin-duration:"+(h=e.percentage,h<=0?"3s":h<=20?"4s":h<=40?"2.5s":h<=60?"1.6s":h<=80?"1.1s":"0.7s"):""}"
          ></ha-icon>
        </glass-icon-button>
        <button
          class="fan-expand-btn"
          aria-expanded=${o&&s?"true":"false"}
          aria-label=${ti(o?"fan.expand_aria":"fan.toggle_aria",{name:e.name})}
        >
          <div class="fan-info">
            <div class="fan-name">${e.name}</div>
            <div class="fan-sub">
              <span class="fan-speed-text">${n}</span>
              ${e.isOn&&null!==e.direction?Z`
                <span class="fan-direction">
                  <ha-icon .icon=${"forward"===e.direction?"mdi:rotate-right":"mdi:rotate-left"}></ha-icon>
                  ${"forward"===e.direction?ti("fan.direction_forward"):ti("fan.direction_reverse")}
                </span>
              `:ie}
            </div>
          </div>
          ${l?Z`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:Z`<div class="fan-dot"></div>`}
        </button>
      </div>
    `;var h}_renderControlFold(e,t="full"){if(!this._hasControls(e))return ie;const i=this._expandedEntity===e.entityId;return Z`
      <div class="fold-sep fold-sep-${t} ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):ie}
        </div>
      </div>
    `}_renderControls(e){const t=e.supportedFeatures,i=!!(t&Aa),a=!!(t&Pa)&&e.presetModes.length>0,r=!!(t&La),s=!!(t&Ea),o=this._dragValues.get(`speed:${e.entityId}`),n=o??e.percentage,l=e.isOn||void 0!==o?Oa(n,e.speedCount):0;return Z`
      <div class="ctrl-panel">
        ${i?Z`
          <div class="fan-section">
            <glass-section-title label=${ti("fan.section_speed")}></glass-section-title>
            <div class="speed-steps">
              ${Array.from({length:e.speedCount},(t,i)=>{const a=i+1,r=Ra(a,e.speedCount),s=function(e,t){return Math.round(Ra(e,t))}(a,e.speedCount);return Z`
                  <button
                    class="speed-step ${l===a?"active":""}"
                    @click=${t=>{t.stopPropagation(),this._setSpeed(e,r)}}
                    aria-label=${ti("fan.speed_step_aria",{step:String(a),pct:String(s)})}
                  >
                    <span>${a}</span>
                    <span class="speed-step-pct">${s}%</span>
                  </button>
                `})}
            </div>
            ${e.isSimple?ie:Z`
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
          </div>
        `:ie}

        ${a?Z`
          <div class="fan-section">
            <glass-section-title label=${ti("fan.section_mode")}></glass-section-title>
            <div class="mode-row">
              ${e.presetModes.map(t=>Z`
                <glass-chip
                  size="sm"
                  active-color="cool"
                  ?active=${e.presetMode===t}
                  .icon=${Ma[t.toLowerCase()]||"mdi:cog"}
                  aria-label=${Fa(t)}
                  @click=${i=>this._setPresetMode(e,t,i)}
                >${Fa(t)}</glass-chip>
              `)}
            </div>
          </div>
        `:ie}

        ${r?Z`
          <div class="fan-section">
            <glass-section-title label=${ti("fan.section_direction")}></glass-section-title>
            <div class="direction-row">
              <div class="direction-label">
                <ha-icon .icon=${"mdi:rotate-3d-variant"}></ha-icon>
                ${ti("fan.direction")}
              </div>
              <div class="direction-btns">
                <glass-icon-button
                  size="sm"
                  active-color="cool"
                  ?active=${"forward"===e.direction}
                  .icon=${"mdi:rotate-right"}
                  aria-label=${ti("fan.direction_forward_aria")}
                  @click=${t=>this._setDirection(e,"forward",t)}
                ></glass-icon-button>
                <glass-icon-button
                  size="sm"
                  active-color="cool"
                  ?active=${"reverse"===e.direction}
                  .icon=${"mdi:rotate-left"}
                  aria-label=${ti("fan.direction_reverse_aria")}
                  @click=${t=>this._setDirection(e,"reverse",t)}
                ></glass-icon-button>
              </div>
            </div>
          </div>
        `:ie}

        ${s?Z`
          <div class="fan-section">
            <glass-section-title label=${ti("fan.section_oscillation")}></glass-section-title>
            <div class="osc-row">
              <div class="osc-label">
                <ha-icon .icon=${"mdi:arrow-left-right"}></ha-icon>
                ${ti("fan.oscillation")}
              </div>
              <glass-toggle
                active-color="cool"
                .checked=${e.oscillating}
                aria-label=${ti("fan.oscillation_aria")}
                @glass-toggle-change=${t=>this._toggleOscillation(e,t)}
              ></glass-toggle>
            </div>
          </div>
        `:ie}

        ${e.lightEntityId?this._renderCeilingLight(e):ie}
      </div>
    `}_renderCeilingLight(e){if(!e.lightEntityId||!this.hass)return ie;const t=this.hass.states[e.lightEntityId];if(!t)return ie;const i="on"===t.state,a=t.attributes.brightness??0,r=this._dragValues.get(`light:${e.entityId}`)??(i?Math.round(a/255*100):0);return Z`
      <div class="ctrl-sep"></div>
      <!-- Ceiling light -->
      <div class="ceiling-light-row">
        <div class="ceiling-light-label">
          <ha-icon .icon=${"mdi:lightbulb-outline"}></ha-icon>
          ${ti("fan.ceiling_light")}
        </div>
        <glass-toggle
          active-color="light-glow"
          .checked=${i}
          aria-label=${ti("fan.ceiling_light_aria")}
          @glass-toggle-change=${t=>this._toggleCeilingLight(e,t)}
        ></glass-toggle>
      </div>
      ${i?Z`
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
      `:ie}
    `}}za([Se({attribute:!1})],qa.prototype,"areaId"),za([Se({attribute:!1})],qa.prototype,"visibleAreaIds"),za([Te()],qa.prototype,"_expandedEntity"),za([Te()],qa.prototype,"_dragValues"),za([Te()],qa.prototype,"_showHeader");try{customElements.define("glass-fan-card",qa)}catch{}oi("glass-title-card-editor");var Ha=Object.defineProperty,Na=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ha(t,i,s),s};const Va={success:{text:"var(--c-success)",dot:"var(--c-success)",glow:"rgba(74,222,128,0.5)"},warning:{text:"var(--c-warning)",dot:"var(--c-warning)",glow:"rgba(251,191,36,0.5)"},info:{text:"var(--c-info)",dot:"var(--c-info)",glow:"rgba(96,165,250,0.5)"},accent:{text:"var(--c-accent)",dot:"var(--c-accent)",glow:"rgba(129,140,248,0.5)"},alert:{text:"var(--c-alert)",dot:"var(--c-alert)",glow:"rgba(248,113,113,0.5)"},neutral:{text:"var(--t3)",dot:"var(--t4)",glow:"none"}},Ba={input_select:"title_card.group_mode",scenes:"title_card.group_scenes",booleans:"title_card.group_toggles"};function Ua(e){if(Va[e])return Va[e];if(e.startsWith("#")&&7===e.length){const t=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16);return{text:e,dot:e,glow:`rgba(${t},${i},${a},0.5)`}}return Va.neutral}const Wa={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},Ka={icon:"mdi:clock-outline",color:"var(--t3)"};class Ga extends ci{constructor(){super(...arguments),this._foldOpen=!1,this._activatingSceneId=null,this._titleConfig={title:"",sources:[],period_entity:"",period_options:[]},this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._sceneTimeout=0,this._boundClickOutside=this._onClickOutside.bind(this)}static getConfigElement(){return document.createElement("glass-title-card-editor")}getCardSize(){return 2}get _periodEntityId(){return this._titleConfig.period_entity||"input_select.periode_journee"}_getPeriodVisual(e){const t=Wa[e]||Ka,i=this._titleConfig.period_options.find(t=>t.id===e);if(!i)return t;const a=i.color?.startsWith("#");return{icon:i.icon||t.icon,color:a?i.color:t.color}}static{this.styles=[Lt,Pt,Rt,m`
    :host {
      width: 100%;
      max-width: 31.25rem;
      margin: 0 auto;
      user-select: none;
      -webkit-user-select: none;
    }

    .title-card {
      display: flex; flex-direction: column; align-items: center;
      gap: 0.25rem; padding: 0.25rem 1rem 0;
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
      padding: 0.25rem 1rem;
      cursor: pointer; border: none; background: none; outline: none;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--radius-full);
      transition: background var(--t-fast);
      position: relative;
    }
    .dash-trigger::before { content: ''; position: absolute; inset: -10px -8px; }
    @media (hover: hover) and (pointer: fine) {
      .dash-trigger:hover { background: var(--s1); }
    }
    .dash-trigger:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
    @media (pointer: coarse) {
      .dash-trigger:active { transform: scale(0.96); }
    }

    .dash-line {
      width: 1.25rem; height: 0.1875rem; border-radius: 1.5px;
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

    /* ── Chip pulse animation (applied to <glass-chip> on user click) ── */
    @keyframes chip-pulse {
      0%   { box-shadow: inset 0 0 0 0 currentColor; }
      50%  { box-shadow: inset 0 0 8px 1px currentColor; }
      100% { box-shadow: inset 0 0 0 0 currentColor; }
    }
    glass-chip.pulsing { animation: chip-pulse 0.5s var(--ease-out); border-radius: var(--radius-md); }

    /* ── Period indicator (crossfade) ── */
    .period-indicator {
      position: relative;
      height: 0.875rem;
      width: 100%;
    }
    .period-item {
      position: absolute;
      inset: 0;
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
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s var(--ease-std);
    }
    .period-item.active {
      opacity: 1;
      pointer-events: auto;
    }
    .period-item ha-icon {
      margin-right: 0.25rem;
    }
    .period-item::after {
      content: '';
      display: inline-block;
      width: calc(9px + 0.25rem);
    }

    @media (prefers-reduced-motion: reduce) {
      .period-item, glass-chip, .dash-trigger, .fold-section, .fold-section-inner, .dash-line {
        transition-duration: 0.01ms !important;
      }
      glass-chip.pulsing { animation: none; }
    }
  `]}connectedCallback(){super.connectedCallback(),this._listen("title-config-changed",()=>this._loadConfig()),document.addEventListener("click",this._boundClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundClickOutside),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++,this._sceneTimeout&&(clearTimeout(this._sceneTimeout),this._sceneTimeout=0)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++),this._configLoaded||this._configLoading||(this._configLoading=!0,this._backend=new mi(this.hass),this._loadConfig()))}getTrackedEntityIds(){const e=[this._periodEntityId];for(const t of this._titleConfig.sources)if("input_select"===t.source_type&&t.entity)e.push(t.entity);else for(const i of t.modes)i.id.includes(".")&&e.push(i.id);return e}async _loadConfig(){if(!this._backend)return;const e=this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.title_card&&(this._titleConfig=t.title_card),this._configLoaded=!0,this._configLoading=!1,this.requestUpdate()}catch{e===this._loadVersion&&(this._configLoading=!1)}}_dashStyle(e){if(0===e.length)return"";const t=e.map(e=>Ua(e)),i="width:"+Math.min(20+4*e.length,36)+"px";if(1===t.length)return`background:${t[0].dot};box-shadow:0 0 8px ${t[0].glow};${i}`;const a=t.length,r=t.flatMap((e,t)=>[`${e.dot} ${Math.round(t/a*100)}%`,`${e.dot} ${Math.round((t+1)/a*100)}%`]).join(", "),s=t.filter(e=>"none"!==e.glow);return`background:linear-gradient(90deg, ${r});box-shadow:${s.length>0?s.map(e=>`0 0 6px ${e.glow}`).join(", "):"none"};${i}`}_getActiveColors(e){if("input_select"===e.source_type){if(!e.entity||!this.hass)return[];const t=this.hass.states[e.entity];if(!t)return[];const i=e.modes.find(e=>e.id===t.state),a=i?.color||"neutral";return"neutral"!==a?[a]:[]}if("booleans"===e.source_type){if(!this.hass)return[];const t=[];for(const i of e.modes)if("on"===this.hass.states[i.id]?.state){const e=i.color||"success";"neutral"!==e&&t.push(e)}return t}if(this._activatingSceneId){const t=e.modes.find(e=>e.id===this._activatingSceneId);if(t)return[t.color||"accent"]}return[]}_isChipActive(e,t,i){return"input_select"===e.source_type?!(!e.entity||!this.hass)&&this.hass.states[e.entity]?.state===t.id:"booleans"===e.source_type?"on"===this.hass?.states[t.id]?.state:"scenes"===e.source_type&&this._activatingSceneId===t.id}_pulseChip(e){this.updateComplete.then(()=>{const t=this.shadowRoot?.querySelector(`glass-chip[data-id="${e}"]`);t&&(t.classList.add("pulsing"),setTimeout(()=>t.classList.remove("pulsing"),600))})}_selectOption(e,t){e.entity&&this.hass&&(this._safeCallService("input_select","select_option",{option:t},{entity_id:e.entity}),this._pulseChip(t))}_activateScene(e){this.hass&&(di(this,"light"),this._safeCallService("scene","turn_on",{},{entity_id:e}),this._activatingSceneId=e,this._sceneTimeout&&clearTimeout(this._sceneTimeout),this._sceneTimeout=window.setTimeout(()=>{this._activatingSceneId=null,this._sceneTimeout=0},2e3),this._pulseChip(e))}_toggleBoolean(e){this.hass&&(this._safeCallService("input_boolean","toggle",{},{entity_id:e}),this._pulseChip(e))}_toggleFold(){this._foldOpen=!this._foldOpen}_onClickOutside(e){if(!this._foldOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelector(".dash-trigger"),r=i.querySelector(".fold-section");a&&r&&!t.includes(a)&&!t.includes(r)&&(this._foldOpen=!1)}render(){this._lang;const e=this._titleConfig.title||(this.configPreview?ti("config.title_title_placeholder"):"");if(!e)return this.style.display="none",ie;this.style.display="";const t=this._titleConfig.sources,i=t.length>0&&t.some(e=>e.modes.length>0),a=[];if(i)for(const s of t)a.push(...this._getActiveColors(s));const r=a.length>0?this._dashStyle(a):"";return Z`
      <div class="title-card">
        <div class="title-text">${e}</div>
        ${this._renderPeriodIndicator()}
        ${i?Z`
          <button
            class="dash-trigger"
            @click=${()=>this._toggleFold()}
            aria-label=${ti("title_card.toggle_modes_aria")}
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
        `:ie}
      </div>
    `}_renderPeriodIndicator(){if(!this.hass)return ie;const e=this.hass.states[this._periodEntityId];if(!e)return ie;const t=e.attributes?.options??[];if(0===t.length)return ie;const i=e.state,a=t.indexOf(i);if(-1===a)return Z`<div class="period-indicator"></div>`;const r=Ua(this._getPeriodVisual(i).color);return Z`
      <div class="period-indicator" aria-live="polite" aria-label="${i}">
        ${t.map((e,t)=>{const i=t===a,s=this._getPeriodVisual(e);return Z`
            <div class="period-item ${i?"active":""}"
              style="${i?`color:${r.text}`:""}">
              <ha-icon .icon=${s.icon} style="--mdc-icon-size:9px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${e}
            </div>
          `})}
      </div>
    `}_renderSourceGroup(e,t,i){if(0===e.modes.length)return ie;const a=Ba[e.source_type],r=e.label||(a?ti(a):e.source_type);return Z`
      <div class="chips-group">
        ${i?Z`<div class="chips-group-label">${r}</div>`:ie}
        <div class="chips-row">
          ${e.modes.map((t,i)=>{const a=this._isChipActive(e,t,i),r=function(e){if(e in Va&&"neutral"!==e)return e;if(e.startsWith("#")&&7===e.length)return`${parseInt(e.slice(1,3),16)},${parseInt(e.slice(3,5),16)},${parseInt(e.slice(5,7),16)}`;return"accent"}(t.color||"accent");return Z`
              <glass-chip
                size="sm"
                data-id=${t.id}
                ?active=${a}
                active-color=${r}
                .icon=${t.icon||""}
                aria-label=${t.label||t.id}
                @click=${a=>{a.stopPropagation(),this._onChipClick(e,t,i)}}
              >${t.label||t.id.split(".")[1]||t.id}</glass-chip>
            `})}
        </div>
      </div>
    `}_onChipClick(e,t,i){"input_select"===e.source_type?this._selectOption(e,t.id):"scenes"===e.source_type?this._activateScene(t.id):"booleans"===e.source_type&&this._toggleBoolean(t.id)}}Na([Te()],Ga.prototype,"_foldOpen"),Na([Te()],Ga.prototype,"_activatingSceneId");try{customElements.define("glass-title-card",Ga)}catch{}oi("glass-spotify-card-editor");var Xa=Object.defineProperty,Ya=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Xa(t,i,s),s};const Qa={playlists:"spotify.my_playlists",recently_played:"spotify.recently_played",saved_tracks:"spotify.saved_tracks",saved_shows:"spotify.followed_podcasts"};function Ja(e,t=300){if(!e)return"";const i=e.images??e.album?.images??[];if(0===i.length)return"";const a=[...i].sort((e,i)=>Math.abs((e.width??300)-t)-Math.abs((i.width??300)-t));return a[0]?.url??""}function Za(e){return e&&e.artists?.length?e.artists.map(e=>e.name).join(", "):""}function er(e){switch(e){case"track":default:return"mdi:music-note";case"playlist":return"mdi:playlist-music";case"album":return"mdi:album";case"show":case"podcast":case"episode":return"mdi:podcast"}}class tr extends ci{constructor(){super(...arguments),this._view="library",this._tab="all",this._searchQuery="",this._playlists=[],this._recentlyPlayed=[],this._savedTracks=[],this._savedShows=[],this._searchResults={tracks:[],playlists:[],shows:[]},this._searchLoading=!1,this._searchOffset=0,this._searchHasMore=!1,this._searchVersion=0,this._drilldown=null,this._speakers=[],this._pickerItem=null,this._selectedSpeakers=new Set,this._error=null,this._libraryLoading=!1,this._spotifyConfigured=null,this._foldOpen=!1,this._savedMap=new Map,this._sectionTotals={},this._loadingMore={},this._spotifyConfig={entity_id:"",show_header:!0,sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},this._configLoaded=!1,this._configLoadingInProgress=!1,this._loadVersion=0,this._radioQueueVersion=0,this._debounceTimer=0,this._onPickerKeydown=e=>{"Escape"===e.key&&"speaker_picker"===this._view&&(e.preventDefault(),this._closePicker())}}static getConfigElement(){return document.createElement("glass-spotify-card-editor")}getCardSize(){return 4}static{this.styles=[Lt,Pt,Mt,Rt,Dt,m`
    :host {
      width: 100%; max-width: 31.25rem; margin: 0 auto;
      user-select: none; -webkit-user-select: none;
      /* "On Spotify" — dark near-black tinted toward spotify green, used for text/icons over the saturated spotify background */
      --c-spotify-on: var(--c-spotify-on);
    }

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
    .spotify-card::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 60%; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-spotify), 0.10), transparent 70%);
      opacity: 0; transition: opacity var(--t-slow);
    }
    .spotify-card.fold-open::after { opacity: 1; }
    @media (prefers-reduced-motion: reduce) {
      .spotify-card::after { transition: none; }
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
    .search-input:focus {
      border-color: rgba(var(--rgb-spotify), 0.5);
      background: var(--s3);
      box-shadow:
        0 0 0 3px rgba(var(--rgb-spotify), 0.12),
        0 4px 14px rgba(var(--rgb-spotify), 0.18);
    }
    .search-icon {
      position: absolute; top: 50%; left: 0.625rem; transform: translateY(-50%);
      pointer-events: none; display: flex; align-items: center; justify-content: center;
    }
    .search-icon ha-icon {
      --mdc-icon-size: 1rem; color: var(--t4);
      display: flex; align-items: center; justify-content: center;
      transition: color var(--t-fast);
    }
    .search-input-wrap:has(.search-input:focus) .search-icon ha-icon { color: var(--c-spotify); }

    /* — Now-playing bar (replaces search bar when something is playing and fold is closed) — */
    .np-bar {
      display: flex; align-items: center; gap: 0.5rem;
      min-height: var(--tap-lg);
    }
    .np-art {
      width: 2.5rem; height: 2.5rem; border-radius: var(--radius-sm);
      flex-shrink: 0; overflow: hidden;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(var(--rgb-black), 0.3), 0 0 12px rgba(var(--rgb-spotify), 0.18);
    }
    .np-art img { width: 100%; height: 100%; object-fit: cover; }
    .np-art ha-icon {
      --mdc-icon-size: 1.125rem;
      color: color-mix(in srgb, var(--c-spotify) 60%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }
    .np-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.0625rem; }
    .np-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .np-artist {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .np-transport {
      display: inline-flex; align-items: center; gap: 0.0625rem;
      flex-shrink: 0;
    }
    /* np-bar transport buttons (prev/next/search) handled by
       <glass-icon-button size="sm">. Only the branded play stays as
       a real <button>. */
    .np-btn-play {
      position: relative;
      width: 2.125rem; height: 2.125rem; border-radius: 50%;
      background: var(--c-spotify); color: var(--c-spotify-on);
      border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
      box-shadow: 0 4px 14px rgba(var(--rgb-spotify), 0.35);
    }
    .np-btn-play ha-icon { --mdc-icon-size: 1.25rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) {
      .np-btn-play:hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 6px 18px rgba(var(--rgb-spotify), 0.5);
      }
    }
    @media (hover: hover) { .np-btn-play:active { transform: scale(0.94); } }
    @media (pointer: coarse) { .np-btn-play:active { animation: bounce 0.3s ease; } }
    .np-btn-play:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.4); outline-offset: 2px; }

    /* Search affordance in np-bar — small magnify icon button */
    .np-btn-search { margin-left: 0.25rem; }

    /* Search-clear (visible only when query non-empty) — absolute positioning
       inside the input wrapper. The button styling itself is handled by
       <glass-icon-button size="sm">. */
    .search-clear {
      position: absolute; top: 50%; right: 1.875rem; transform: translateY(-50%);
      display: none;
    }
    .search-clear.visible { display: inline-flex; }

    /* Fold toggle arrow (inside search bar) — absolute positioning only.
       The button styling itself is handled by <glass-icon-button size="sm">. */
    .search-toggle {
      position: absolute; top: 50%; right: 0.375rem; transform: translateY(-50%);
    }

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

    /* Tabs — sliding rail */
    .tab-rail {
      position: relative;
      display: grid; grid-template-columns: repeat(4, 1fr);
      padding: 0.1875rem;
      border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
    }
    .tab-rail-capsule {
      position: absolute; top: 0.1875rem; bottom: 0.1875rem;
      left: 0.1875rem; width: calc((100% - 0.375rem) / 4);
      border-radius: calc(var(--radius-md) - 0.1875rem);
      background: color-mix(in srgb, var(--c-spotify) 18%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-spotify) 30%, transparent);
      box-shadow: 0 1px 6px color-mix(in srgb, var(--c-spotify) 25%, transparent);
      transform: translateX(calc(var(--tab-active-idx, 0) * 100%));
      transition: transform var(--t-layout);
      pointer-events: none;
      z-index: 0;
    }
    .tab-btn {
      position: relative; z-index: 1;
      height: 1.875rem;
      display: flex; align-items: center; justify-content: center; gap: 0.3125rem;
      background: transparent; border: none; color: var(--t3);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
      cursor: pointer; outline: none; padding: 0;
      transition: color var(--t-fast), transform var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn ha-icon { --mdc-icon-size: var(--icon-sm); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .tab-btn:not(.active):hover { color: var(--t2); } }
    .tab-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) { .tab-btn:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .tab-btn:active { animation: bounce 0.3s ease; } }
    .tab-btn.active { color: var(--c-spotify); font-weight: 700; }

    @media (prefers-reduced-motion: reduce) {
      .tab-rail-capsule { transition: none; }
    }

    /* Content area */
    .content-area {
      display: flex; flex-direction: column; gap: 0.375rem;
      max-height: 23.75rem; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
    }
    .content-area::-webkit-scrollbar { display: none; }

    /* Section title (drilldown / search result groups) */
    .section-title {
      font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.2px; color: var(--t4); padding: 0.25rem 0.125rem 0.125rem; flex-shrink: 0;
    }

    /* Library section with eyebrow */
    .lib-section { display: flex; flex-direction: column; gap: 0.375rem; flex-shrink: 0; }
    .lib-eyebrow {
      display: flex; align-items: center; gap: 0.4375rem;
      padding: 0 0.125rem;
      min-height: 1.625rem;
      font-size: var(--fz-sm); font-weight: 700; color: var(--t2);
      letter-spacing: 0.1px;
    }
    .lib-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--lib-dot-color, var(--t3));
      box-shadow: 0 0 6px var(--lib-dot-glow, transparent);
    }
    .lib-eyebrow-recents   { --lib-dot-color: var(--cl-heat);   --lib-dot-glow: rgba(var(--rgb-heat), 0.45); }
    .lib-eyebrow-playlists { --lib-dot-color: var(--c-spotify); --lib-dot-glow: rgba(var(--rgb-spotify), 0.45); }
    .lib-eyebrow-saved     { --lib-dot-color: var(--c-accent);  --lib-dot-glow: rgba(var(--rgb-accent), 0.45); }
    .lib-eyebrow-podcasts  { --lib-dot-color: var(--c-purple);  --lib-dot-glow: rgba(var(--rgb-purple), 0.45); }
    .lib-eyebrow-tracks    { --lib-dot-color: var(--c-spotify); --lib-dot-glow: rgba(var(--rgb-spotify), 0.45); }

    .search-more-standalone {
      display: flex; justify-content: flex-end;
      padding: 0.25rem 0.125rem 0;
    }
    .search-more-standalone .lib-more-link { margin-left: 0; }

    /* Load more (text link, right-aligned inside eyebrow) */
    .lib-more-link {
      position: relative;
      margin-left: auto;
      display: inline-flex; align-items: center; gap: 0.4375rem;
      background: none; border: none; padding: 0.25rem 0.375rem;
      border-radius: var(--radius-sm);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
      color: var(--t3); cursor: pointer; outline: none;
      transition: color var(--t-fast), background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .lib-more-link .lib-more-count { font-size: var(--fz-xs); font-weight: 500; color: var(--t4); }
    .lib-more-link:disabled { opacity: 0.5; cursor: default; }
    @media (hover: hover) and (pointer: fine) {
      .lib-more-link:not(:disabled):hover { color: var(--c-spotify); background: var(--s1); }
      .lib-more-link:not(:disabled):hover .lib-more-count { color: color-mix(in srgb, var(--c-spotify) 60%, var(--t3)); }
    }
    .lib-more-link:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -1px; }

    /* Result row */
    .result-row {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.375rem 0.5rem 0.375rem 0.25rem; cursor: pointer; position: relative;
      transition: background var(--t-fast), transform var(--t-fast); border-radius: var(--radius-md);
      flex-shrink: 0; background: none; border: none; width: 100%; box-sizing: border-box;
      font-family: inherit; text-align: left; color: inherit; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .result-row:hover { background: var(--s1); transform: translateX(2px); }
      .result-row:hover .result-art { box-shadow: 0 0 0 1px rgba(var(--rgb-spotify), 0.35), 0 4px 12px rgba(var(--rgb-black), 0.2); }
    }
    @media (hover: hover) and (pointer: fine) { .result-row:active { transform: translateX(2px) scale(0.99); } }
    @media (pointer: coarse) { .result-row:active { animation: bounce 0.3s ease; } }
    .result-row:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    .result-art {
      width: 2.625rem; height: 2.625rem; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
      transition: box-shadow var(--t-fast), transform var(--t-fast);
    }
    .result-art.round { border-radius: 50%; }
    .result-art img { width: 100%; height: 100%; object-fit: cover; }
    .result-art ha-icon { --mdc-icon-size: var(--icon-md); color: var(--t4); display: flex; align-items: center; justify-content: center; }

    @media (prefers-reduced-motion: reduce) {
      .result-row, .result-row:hover { transform: none; }
      .playlist-art-play { transition: none; }
      .playlist-art-overlay { transition: none; }
      .lib-eyebrow-dot { box-shadow: none; }
    }

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

    /* Result-row play button — opacity reveal on row hover. The button
       itself is a <glass-icon-button size="sm" active-color="spotify">. */
    .result-play {
      opacity: 0; transform: scale(0.8); flex-shrink: 0;
      transition: opacity var(--t-fast), transform var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .result-row:hover .result-play { opacity: 1; transform: scale(1); }
    }
    /* Always show on coarse pointers (no hover) */
    @media (pointer: coarse) { .result-play { opacity: 1; transform: scale(1); } }

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
      overflow: hidden; position: relative;
      transition: border-color var(--t-fast), box-shadow var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art {
        border-color: color-mix(in srgb, var(--c-spotify) 40%, transparent);
        box-shadow: 0 8px 24px rgba(var(--rgb-black), 0.35);
      }
    }
    .playlist-art img { width: 100%; height: 100%; object-fit: cover; }
    .playlist-art-fallback {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, color-mix(in srgb, var(--c-spotify) 25%, var(--s3)), var(--s2));
    }
    .playlist-art-fallback ha-icon {
      --mdc-icon-size: 2rem;
      color: color-mix(in srgb, var(--c-spotify) 60%, rgba(var(--rgb-white),0.4));
      display: flex; align-items: center; justify-content: center;
    }

    /* Hover overlay: bottom gradient + play CTA reveal */
    .playlist-art-overlay {
      position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(to top, rgba(var(--rgb-black), 0.55), transparent 55%);
      opacity: 0; transition: opacity var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art-overlay { opacity: 1; }
    }

    .playlist-art-play {
      position: absolute; bottom: 0.4375rem; right: 0.4375rem;
      width: 2rem; height: 2rem; border-radius: 50%;
      background: var(--c-spotify);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: translateY(6px) scale(0.85);
      transition: opacity var(--t-fast), transform var(--t-fast);
      box-shadow: 0 6px 18px rgba(var(--rgb-black),0.45), 0 0 12px rgba(var(--rgb-spotify), 0.4);
      pointer-events: none;
    }
    .playlist-art-play ha-icon {
      --mdc-icon-size: 1.125rem;
      color: var(--c-spotify-on);
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-art-play { opacity: 1; transform: translateY(0) scale(1); }
    }

    .playlist-name {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t2); line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
      transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .playlist-card:hover .playlist-name { color: var(--t1); }
    }
    .playlist-count { font-size: var(--fz-xs); font-weight: 500; color: var(--t4); }

    /* Drilldown: hero + tracks */
    .drilldown { display: flex; flex-direction: column; gap: 0.75rem; }

    .drilldown-hero {
      position: relative;
      display: grid; grid-template-columns: auto 1fr;
      gap: 0.875rem;
      padding: 0.5rem 0.125rem 0.875rem;
      border-bottom: 1px solid var(--b1);
    }
    /* Drilldown back button — positioning only, glass-icon-button handles
       the rest. */
    .drilldown-back {
      position: absolute; top: 0; right: 0;
      z-index: 1;
    }

    .drilldown-hero-art {
      width: 5rem; height: 5rem; border-radius: var(--radius-md);
      background: var(--s2); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      box-shadow:
        0 12px 28px rgba(var(--rgb-black), 0.4),
        0 0 0 1px var(--b1) inset,
        0 0 18px rgba(var(--rgb-spotify), 0.12);
    }
    .drilldown-hero-art img { width: 100%; height: 100%; object-fit: cover; }
    .drilldown-hero-art ha-icon {
      --mdc-icon-size: 2rem;
      color: color-mix(in srgb, var(--c-spotify) 50%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }

    .drilldown-hero-info {
      min-width: 0;
      display: flex; flex-direction: column; gap: 0.25rem;
      justify-content: center;
      padding-right: 2.25rem;
    }
    .drilldown-hero-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.2;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .drilldown-hero-meta {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .drilldown-play-cta {
      position: relative;
      align-self: flex-start;
      margin-top: 0.375rem;
      display: inline-flex; align-items: center; gap: 0.375rem;
      padding: 0.375rem 0.75rem 0.375rem 0.5rem;
      border-radius: var(--radius-full);
      background: var(--c-spotify);
      border: none;
      color: var(--c-spotify-on);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 700;
      cursor: pointer; outline: none;
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      box-shadow: 0 4px 14px rgba(var(--rgb-spotify), 0.3);
      -webkit-tap-highlight-color: transparent;
    }
    @media (pointer: coarse) {
      .drilldown-play-cta::after { content: ''; position: absolute; inset: -0.4375rem; }
    }
    .drilldown-play-cta ha-icon {
      --mdc-icon-size: 1rem;
      display: flex; align-items: center; justify-content: center;
    }
    .drilldown-play-cta:disabled { opacity: 0.4; cursor: default; box-shadow: none; }
    @media (hover: hover) and (pointer: fine) {
      .drilldown-play-cta:not(:disabled):hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 6px 18px rgba(var(--rgb-spotify), 0.45);
      }
    }
    @media (hover: hover) { .drilldown-play-cta:active:not(:disabled) { transform: scale(0.96); } }
    @media (pointer: coarse) { .drilldown-play-cta:active:not(:disabled) { animation: bounce 0.3s ease; } }
    .drilldown-play-cta:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.4); outline-offset: 2px; }

    .drilldown-tracks { flex: 1; min-height: 0; }

    /* — Empty / setup / error states (cohérent eyebrow + cercle ambient) — */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 2rem 1.25rem; gap: 0.625rem; text-align: center;
    }
    .empty-state .ambient-icon {
      width: 3.25rem; height: 3.25rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: color-mix(in srgb, var(--c-spotify) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-spotify) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-spotify), 0.15);
      margin-bottom: 0.125rem;
    }
    .empty-state .ambient-icon ha-icon {
      --mdc-icon-size: 1.5rem;
      color: color-mix(in srgb, var(--c-spotify) 70%, var(--t2));
      display: flex; align-items: center; justify-content: center;
    }
    .empty-state-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.3;
    }
    .empty-state-sub {
      font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.4;
      max-width: 22rem;
    }
    /* Alert variant */
    .empty-state.is-alert .ambient-icon {
      background: color-mix(in srgb, var(--c-alert) 10%, transparent);
      border-color: color-mix(in srgb, var(--c-alert) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-alert), 0.15);
    }
    .empty-state.is-alert .ambient-icon ha-icon {
      color: color-mix(in srgb, var(--c-alert) 80%, var(--t2));
    }

    /* Eyebrow for setup/error banners — same pattern as library */
    .banner-eyebrow {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      font-size: var(--fz-sm); font-weight: 700;
      letter-spacing: 0.1px; margin-bottom: 0.25rem;
    }
    .banner-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
    }
    .banner-eyebrow-setup { color: var(--c-spotify); }
    .banner-eyebrow-setup .banner-eyebrow-dot { background: var(--c-spotify); box-shadow: 0 0 8px rgba(var(--rgb-spotify), 0.6); }
    .banner-eyebrow-error { color: var(--c-alert); }
    .banner-eyebrow-error .banner-eyebrow-dot { background: var(--c-alert); box-shadow: 0 0 8px rgba(var(--rgb-alert), 0.55); }

    .error-banner {
      display: flex; align-items: flex-start; gap: 0.625rem;
      padding: 0.625rem 0.75rem; border-radius: var(--radius-md);
      background: rgba(var(--rgb-alert), 0.08);
      border: 1px solid rgba(var(--rgb-alert), 0.2);
    }
    .error-banner-icon {
      width: 1.5rem; height: 1.5rem; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(var(--rgb-alert), 0.18);
    }
    .error-banner-icon ha-icon {
      --mdc-icon-size: 0.9375rem; color: var(--c-alert);
      display: flex; align-items: center; justify-content: center;
    }
    .error-banner-body { flex: 1; min-width: 0; }
    .error-banner-text {
      font-size: var(--fz-base); font-weight: 500; color: var(--t2); line-height: 1.35;
    }

    /* Setup banner — uses empty-state shell + eyebrow + CTA */
    .setup-banner-cta {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      margin-top: 0.5rem;
      padding: 0.75rem 1rem; border-radius: var(--radius-full);
      min-height: var(--tap-lg); box-sizing: border-box;
      background: var(--c-spotify); color: var(--c-spotify-on);
      border: none;
      font-family: inherit; font-size: var(--fz-base); font-weight: 700;
      text-decoration: none; cursor: pointer; outline: none;
      box-shadow: 0 4px 14px rgba(var(--rgb-spotify), 0.3);
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .setup-banner-cta ha-icon { --mdc-icon-size: 0.9375rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) {
      .setup-banner-cta:hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 6px 18px rgba(var(--rgb-spotify), 0.45);
      }
    }
    @media (hover: hover) { .setup-banner-cta:active { transform: scale(0.97); } }
    @media (pointer: coarse) { .setup-banner-cta:active { animation: bounce 0.3s ease; } }
    .setup-banner-cta:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.4); outline-offset: 2px; }

    /* Speaker picker overlay */
    .picker-backdrop {
      position: fixed; inset: 0; z-index: 10000;
      background:
        radial-gradient(ellipse 70% 50% at 50% 30%, rgba(var(--rgb-spotify), 0.18), transparent 70%),
        rgba(var(--rgb-black), 0.62);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 1rem; padding-bottom: 5rem;
      opacity: 0; pointer-events: none;
      transition: opacity 0.25s var(--ease-std);
    }
    .picker-backdrop.visible { opacity: 1; pointer-events: auto; }

    .speaker-picker {
      width: 100%; max-width: 25rem;
      padding: 1rem 1rem 1.125rem;
      max-height: calc(100dvh - 10rem);
      display: flex; flex-direction: column;
      transform: translateY(28px);
      transition: transform 0.35s var(--ease-out);
    }
    .picker-backdrop.visible .speaker-picker { transform: translateY(0); }

    .picker-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 0.625rem;
    }
    .picker-eyebrow {
      display: inline-flex; align-items: center; gap: 0.4375rem;
      font-size: var(--fz-sm); font-weight: 700; color: var(--c-spotify);
      letter-spacing: 0.1px;
    }
    .picker-eyebrow-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%; flex-shrink: 0;
      background: var(--c-spotify);
      box-shadow: 0 0 8px rgba(var(--rgb-spotify), 0.6);
    }
    .picker-close {
      position: relative;
      width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: background var(--t-fast);
    }
    @media (pointer: coarse) {
      .picker-close::after { content: ''; position: absolute; inset: -0.5rem; }
    }
    .picker-close ha-icon { --mdc-icon-size: 1rem; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .picker-close:hover { background: var(--s3); } }
    @media (pointer: coarse) { .picker-close:active { animation: bounce 0.3s ease; } }
    .picker-close:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

    /* Hero block: oversized artwork + track meta */
    .picker-hero {
      display: flex; align-items: center; gap: 0.875rem;
      padding: 0.25rem 0.125rem 0.75rem;
      margin-bottom: 0.625rem;
      border-bottom: 1px solid var(--b1);
    }
    .picker-hero-art {
      width: 4.5rem; height: 4.5rem; border-radius: var(--radius-md);
      background: var(--s2); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
      box-shadow:
        0 12px 28px rgba(var(--rgb-black), 0.45),
        0 0 0 1px var(--b1) inset,
        0 0 18px rgba(var(--rgb-spotify), 0.18);
    }
    .picker-hero-art img { width: 100%; height: 100%; object-fit: cover; }
    .picker-hero-art ha-icon {
      --mdc-icon-size: 1.75rem; color: color-mix(in srgb, var(--c-spotify) 50%, var(--t4));
      display: flex; align-items: center; justify-content: center;
    }
    .picker-hero-info { flex: 1; min-width: 0; }
    .picker-hero-title {
      font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.25;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-hero-artist {
      font-size: var(--fz-base); font-weight: 500; color: var(--t3); margin-top: 0.125rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    /* Speaker rows */
    .picker-speakers {
      display: flex; flex-direction: column; gap: 0.3125rem;
      overflow-y: auto; flex: 1; min-height: 0;
      scrollbar-width: none;
      padding-right: 0.125rem;
    }
    .picker-speakers::-webkit-scrollbar { display: none; }
    .picker-speaker {
      display: flex; align-items: center; gap: 0.6875rem;
      padding: 0.5rem 0.625rem; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      cursor: pointer;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      font-family: inherit; outline: none; width: 100%;
      -webkit-tap-highlight-color: transparent; color: inherit;
      flex-shrink: 0; position: relative;
      text-align: left;
    }
    .picker-speaker:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .picker-speaker:not(.selected):hover { background: var(--s2); border-color: var(--b2); transform: translateX(2px); }
    }
    @media (hover: hover) and (pointer: fine) { .picker-speaker:active { transform: translateX(2px) scale(0.985); } }
    @media (pointer: coarse) { .picker-speaker:active { animation: bounce 0.3s ease; } }

    /* State: playing — subtle spotify ring even when not selected */
    .picker-speaker.state-playing .picker-speaker-icon {
      background: rgba(var(--rgb-spotify), 0.12);
      border-color: rgba(var(--rgb-spotify), 0.3);
    }
    .picker-speaker.state-playing .picker-speaker-icon ha-icon { color: var(--c-spotify); }

    /* State: off — dimmed */
    .picker-speaker.state-off .picker-speaker-name { color: var(--t3); }
    .picker-speaker.state-off .picker-speaker-icon ha-icon { color: var(--t4); }

    /* State: selected — wins over playing visually */
    .picker-speaker.selected {
      background: color-mix(in srgb, var(--c-spotify) 14%, transparent);
      border-color: color-mix(in srgb, var(--c-spotify) 55%, transparent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--c-spotify) 40%, transparent) inset;
    }

    .picker-speaker-icon {
      width: 2.25rem; height: 2.25rem; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-icon {
      background: rgba(var(--rgb-spotify), 0.2);
      border-color: rgba(var(--rgb-spotify), 0.45);
    }
    .picker-speaker-icon ha-icon { --mdc-icon-size: 1.125rem; color: var(--t2); display: flex; align-items: center; justify-content: center; transition: color var(--t-fast); }
    .picker-speaker.selected .picker-speaker-icon ha-icon { color: var(--c-spotify); }

    .picker-speaker-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.0625rem; }
    .picker-speaker-name {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-speaker-status {
      display: inline-flex; align-items: center; gap: 0.375rem;
      font-size: var(--fz-xs); font-weight: 500; color: var(--t3);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-state-dot {
      width: 0.3125rem; height: 0.3125rem; border-radius: 50%; flex-shrink: 0;
      background: var(--t4);
    }
    .picker-speaker.state-playing .picker-state-label { color: var(--c-spotify); }
    .picker-speaker.state-paused .picker-state-dot { background: var(--c-warning); }
    .picker-speaker.state-off .picker-state-dot { background: var(--t4); opacity: 0.5; }
    .picker-speaker.state-idle .picker-state-dot {
      background: var(--c-spotify);
      box-shadow: 0 0 6px rgba(var(--rgb-spotify), 0.45);
    }

    /* EQ bars for playing state (transform-only, composited) */
    .picker-state-eq {
      display: inline-flex; align-items: flex-end; gap: 0.125rem;
      width: 0.75rem; height: 0.625rem; flex-shrink: 0;
    }
    .picker-state-eq span {
      flex: 1; height: 100%;
      background: var(--c-spotify); border-radius: 1px;
      transform-origin: bottom center;
      animation: picker-eq 0.9s ease-in-out infinite;
    }
    .picker-state-eq span:nth-child(1) { animation-delay: -0.2s; }
    .picker-state-eq span:nth-child(2) { animation-delay: -0.5s; }
    .picker-state-eq span:nth-child(3) { animation-delay: -0.35s; }
    @keyframes picker-eq {
      0%, 100% { transform: scaleY(0.3); }
      50%      { transform: scaleY(1);   }
    }

    .picker-speaker-check {
      width: 1.375rem; height: 1.375rem; border-radius: 50%;
      border: 2px solid var(--b2); background: transparent;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: border-color var(--t-fast), background var(--t-fast), transform var(--t-fast);
      transform: scale(0.9);
    }
    .picker-speaker.selected .picker-speaker-check {
      border-color: var(--c-spotify); background: var(--c-spotify);
      transform: scale(1);
    }
    .picker-speaker-check ha-icon {
      --mdc-icon-size: 0.875rem; color: var(--c-spotify-on);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-check ha-icon { opacity: 1; }

    .picker-play-bar {
      display: flex; gap: 0.5rem; padding-top: 0.875rem; flex-shrink: 0;
    }
    .picker-play-btn {
      flex: 1; padding: 0.75rem 1rem; border-radius: var(--radius-md);
      border: none; cursor: pointer; font-family: inherit; font-size: var(--fz-base); font-weight: 700;
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast); outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .picker-play-btn.primary {
      background: var(--c-spotify);
      color: var(--c-spotify-on);
      box-shadow: 0 6px 20px rgba(var(--rgb-spotify), 0.35);
    }
    .picker-play-btn.primary:disabled {
      background: var(--s3); color: var(--t4); cursor: default;
      box-shadow: none;
    }
    @media (hover: hover) and (pointer: fine) {
      .picker-play-btn.primary:not(:disabled):hover {
        background: var(--c-spotify-hover);
        box-shadow: 0 8px 24px rgba(var(--rgb-spotify), 0.5);
      }
    }
    .picker-play-btn.primary ha-icon { --mdc-icon-size: 1.125rem; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) and (pointer: fine) { .picker-play-btn:active:not(:disabled) { transform: scale(0.98); } }
    @media (pointer: coarse) { .picker-play-btn:active:not(:disabled) { animation: bounce 0.3s ease; } }
    .picker-play-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.4); outline-offset: 2px; }

    @media (prefers-reduced-motion: reduce) {
      .picker-backdrop, .speaker-picker, .picker-speaker { transition: none; }
      .picker-state-eq span { animation: none; transform: scaleY(0.6); }
      .picker-speaker:hover { transform: none; }
      .drilldown-play-cta { transition: none; }
      .drilldown-play-cta:active { transform: none; }
      .np-btn-play, .setup-banner-cta { transition: none; }
      .np-btn-play:active, .setup-banner-cta:active { transform: none; }
    }

    /* Now playing indicator */
    .result-row.now-playing {
      background: color-mix(in srgb, var(--c-spotify) 10%, transparent);
      border-radius: var(--radius-md);
    }
    .result-row.now-playing .result-title {
      color: var(--c-spotify);
    }
    .result-row.now-playing .result-art {
      box-shadow: 0 0 0 2px var(--c-spotify), 0 0 16px rgba(var(--rgb-spotify), 0.35);
    }
    .result-row .eq-bars { flex-shrink: 0; }

    /* Heart (favorite) button — handled by <glass-icon-button size="sm"
       active-color="alert">. flex-shrink stops it from collapsing in
       narrow rows. */
    .heart-btn { flex-shrink: 0; }

    /* Loading spinner placeholder */
    .loading-text { font-size: var(--fz-base); color: var(--t4); text-align: center; padding: 1rem 0; }

    /* Touch hit-area expansion to reach 44px on touch devices.
       .heart-btn now uses <glass-icon-button> which provides its own hit-area. */
    @media (pointer: coarse) {
      .tab-btn::after,
      .lib-more-link::after { content: ''; position: absolute; }
      .tab-btn::after    { left: 0; right: 0; top: -0.4375rem; bottom: -0.4375rem; }
      .lib-more-link::after { left: 0; right: 0; top: -0.625rem; bottom: -0.625rem; }
    }
  `]}getTrackedEntityIds(){const e=this._getEntityId(),t=e?[e]:[];return this._spotifyConfig?.entity_id&&!t.includes(this._spotifyConfig.entity_id)&&t.push(this._spotifyConfig.entity_id),t}_isNowPlaying(e){const t=this._spotifyConfig?.entity_id;if(!t)return!1;const i=this.hass?.states[t];return!(!i||"playing"!==i.state)&&(i.attributes.media_content_id??"")===e}_getPlaybackEntity(){const e=this._getEntityId();if(!e)return null;const t=this.hass?.states[e];return t?"playing"!==t.state&&"paused"!==t.state?null:{entityId:e,state:t.state,title:t.attributes.media_title??null,artist:t.attributes.media_artist??null,art:t.attributes.entity_picture??null}:null}_mediaPlayPause(e){e.stopPropagation();const t=this._getEntityId();t&&(di(this,"light"),this._safeCallService("media_player","media_play_pause",{},{entity_id:t}))}_mediaNext(e){e.stopPropagation();const t=this._getEntityId();t&&(di(this,"light"),this._safeCallService("media_player","media_next_track",{},{entity_id:t}))}_mediaPrev(e){e.stopPropagation();const t=this._getEntityId();t&&(di(this,"light"),this._safeCallService("media_player","media_previous_track",{},{entity_id:t}))}_focusSearchInput(){requestAnimationFrame(()=>{const e=this.renderRoot.querySelector("input.search-input");e?.focus()})}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._spotifyConfig.entity_id)return this._spotifyConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("media_player.spotify"));if(e)return e}return""}shouldUpdate(e){return!!super.shouldUpdate(e)&&("speaker_picker"!==this._view||1!==e.size||!e.has("hass"))}connectedCallback(){super.connectedCallback(),this._listen("spotify-config-changed",()=>{this._configLoaded=!1,this._loadConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._debounceTimer&&clearTimeout(this._debounceTimer),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,window.removeEventListener("keydown",this._onPickerKeydown)}_collapseExpanded(){"speaker_picker"!==this._view?(this._foldOpen&&(this._foldOpen=!1),this._drilldown&&(this._drilldown=null,this._view=this._searchQuery?"search":"library")):this._closePicker()}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new mi(this.hass),this._loadConfig()))}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;if(t?.spotify_card&&(this._spotifyConfig=t.spotify_card),this._configLoaded=!0,await this._checkSpotifyStatus(),e!==this._loadVersion)return;this._spotifyConfigured&&this._loadLibrary(),this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}async _checkSpotifyStatus(){if(this._backend)try{const e=await this._backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}async _loadLibrary(){if(!this._backend)return;this._libraryLoading=!0,this._error=null;const e=this._spotifyConfig.max_items_per_section;try{const[t,i,a,r]=await Promise.all([this._backend.send("spotify_browse",{category:"playlists",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"recently_played",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_tracks",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_shows",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order})]);this._playlists=(t?.items??[]).filter(Boolean),this._recentlyPlayed=(i?.items??[]).filter(Boolean),this._savedTracks=(a?.items??[]).filter(Boolean),this._savedShows=(r?.items??[]).filter(Boolean).map(e=>e.show??e),this._sectionTotals={playlists:t?.total??0,recently_played:i?.total??0,saved_tracks:a?.total??0,saved_shows:r?.total??0};const s=[];for(const e of this._recentlyPlayed){const t=e.track??e;!t.id||"track"!==t.type&&t.type||s.push(t.id)}for(const e of this._savedTracks){const t=e.track??e;t.id&&s.push(t.id)}s.length&&this._checkSavedStatus(s)}catch(t){this._handleApiError(t)}finally{this._libraryLoading=!1}}_onSearchInput(e){const t=e.target.value;if(this._searchQuery=t,this._debounceTimer&&clearTimeout(this._debounceTimer),0===t.length)return this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},void(this._searchOffset=0);this._foldOpen||(this._foldOpen=!0),this._view="search",this._debounceTimer=window.setTimeout(()=>this._doSearch(!1),300)}_clearSearch(){this._searchQuery="",this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},this._searchOffset=0,this._foldOpen=!1}async _doSearch(e){if(!this._backend||!this._searchQuery)return;const t=++this._searchVersion;this._searchLoading=!0,this._error=null;const i=e?this._searchOffset:0;try{let a;a="tracks"===this._tab?["track"]:"playlists"===this._tab?["playlist"]:"podcasts"===this._tab?["show"]:["track","playlist","show"];const r=await this._backend.send("spotify_search",{query:this._searchQuery,types:a,limit:12,offset:i});if(t!==this._searchVersion)return;const s=(r?.tracks?.items??[]).filter(Boolean),o=(r?.playlists?.items??[]).filter(Boolean),n=(r?.shows?.items??[]).filter(Boolean);this._searchResults=e?{tracks:[...this._searchResults.tracks,...s],playlists:[...this._searchResults.playlists,...o],shows:[...this._searchResults.shows,...n]}:{tracks:s,playlists:o,shows:n},this._searchOffset=i+12;const l=(r?.tracks?.total??0)+(r?.playlists?.total??0)+(r?.shows?.total??0),c=this._searchResults.tracks.length+this._searchResults.playlists.length+this._searchResults.shows.length;this._searchHasMore=c<l;const d=s.filter(e=>e.id).map(e=>e.id);d.length&&this._checkSavedStatus(d)}catch(a){if(t!==this._searchVersion)return;this._handleApiError(a)}finally{t===this._searchVersion&&(this._searchLoading=!1)}}async _openDrilldown(e,t,i,a,r){if(this._backend){this._view="drilldown",this._drilldown={title:i,type:e,id:t,image:a,subtitle:r,items:[],total:0,offset:0,loading:!0},this._error=null;try{const i="playlist"===e?"playlist_tracks":"album_tracks",a=await this._backend.send("spotify_browse",{category:i,content_id:t,limit:20,offset:0,sort_order:this._spotifyConfig.sort_order}),r=a?.items??[];if(!this._drilldown)return;this._drilldown={...this._drilldown,items:r,total:a?.total??0,offset:20,loading:!1};const s=r.map(e=>(e.track??e).id).filter(Boolean);s.length&&this._checkSavedStatus(s)}catch(s){this._handleApiError(s),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}async _loadMoreDrilldown(){if(this._drilldown&&this._backend){this._drilldown={...this._drilldown,loading:!0};try{const e="playlist"===this._drilldown.type?"playlist_tracks":"album_tracks",t=await this._backend.send("spotify_browse",{category:e,content_id:this._drilldown.id,limit:20,offset:this._drilldown.offset,sort_order:this._spotifyConfig.sort_order}),i=t?.items??[];this._drilldown={...this._drilldown,items:[...this._drilldown.items,...i],offset:this._drilldown.offset+20,loading:!1};const a=i.map(e=>(e.track??e).id).filter(Boolean);a.length&&this._checkSavedStatus(a)}catch(e){this._handleApiError(e),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}_goBack(){this._drilldown=null,this._view=this._searchQuery?"search":"library"}_openPicker(e){if(this._pickerItem=e,this._view="speaker_picker",this._selectedSpeakers=new Set,window.addEventListener("keydown",this._onPickerKeydown),queueMicrotask(()=>{requestAnimationFrame(()=>{const e=this.renderRoot.querySelector(".picker-close");e?.focus()})}),this.hass){const e=this._spotifyConfig.visible_speakers,t=e.length>0;this._speakers=Object.entries(this.hass.states).filter(([i])=>!!i.startsWith("media_player.")&&!(t&&!e.includes(i))).map(([e,t])=>{const i=t.attributes.device_class??"";let a="mdi:speaker";return"tv"===i||e.includes("tv")?a="mdi:television":"receiver"===i?a="mdi:audio-video":(e.includes("nest")||e.includes("hub")||e.includes("echo_show"))&&(a="mdi:tablet"),{entityId:e,name:t.attributes.friendly_name??e,state:t.state,mediaTitle:t.attributes.media_title??null,icon:a}}).sort((i,a)=>{if(t)return e.indexOf(i.entityId)-e.indexOf(a.entityId);const r=e=>"playing"===e?0:"paused"===e?1:2;return r(i.state)-r(a.state)})}}_closePicker(){this._pickerItem=null,this._view=this._drilldown?"drilldown":this._searchQuery?"search":"library",window.removeEventListener("keydown",this._onPickerKeydown)}_toggleSpeakerSelection(e){const t=new Set(this._selectedSpeakers);t.has(e)?t.delete(e):t.add(e),this._selectedSpeakers=t}async _playOnSelectedSpeakers(){if(!this.hass||!this._pickerItem||0===this._selectedSpeakers.size)return;di(this,"light");const e=this._pickerItem,t=e.uri??`spotify:${e.type}:${e.id}`,i=[...this._selectedSpeakers],a="track"===e.type?"music":"playlist"===e.type?"playlist":"album"===e.type?"music":"podcast";try{for(const e of i){const t=this.hass.states[e];if(!t)continue;const i=t.attributes.group_members;i&&i.length>1&&this._safeCallService("media_player","unjoin",{},{entity_id:e})}i.length>1&&await new Promise(e=>setTimeout(e,600));const r=i[0];if(this._safeCallService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:r}),i.length>1){const e=i.slice(1),s=this.hass.states[r];if(s&&!!(524288&s.attributes.supported_features))await new Promise(e=>setTimeout(e,800)),this._safeCallService("media_player","join",{group_members:e},{entity_id:r});else for(const i of e)this._safeCallService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:i})}"track"!==e.type&&"episode"!==e.type||!this._backend||this._seedRadioQueue(e)}catch{}this._closePicker()}async _seedRadioQueue(e){if(!this._backend)return;const t=++this._radioQueueVersion;try{if(await new Promise(e=>setTimeout(e,2e3)),!this._backend||t!==this._radioQueueVersion)return;const a=await this._backend.send("spotify_browse",{category:"recommendations",seed_tracks:[e.id],limit:20});if(t!==this._radioQueueVersion)return;const r=a?.tracks??[];i.emit("radio-queue-started",{count:r.length});let s=0;for(let e=0;e<r.length;e++){const a=r[e];if(!this._backend||t!==this._radioQueueVersion)break;const o=a.uri??`spotify:track:${a.id}`;try{await this._backend.send("spotify_add_to_queue",{uri:o}),s++,i.emit("radio-queue-track-added",{track:{id:a.id,name:a.name,uri:o,artist:Za(a)||void 0},index:e}),await new Promise(e=>setTimeout(e,150))}catch{break}}t===this._radioQueueVersion&&i.emit("radio-queue-complete",{total:s})}catch(a){t===this._radioQueueVersion&&i.emit("radio-queue-error",{message:a.message??"Unknown error"})}}async _loadMoreItems(e){if(!this._backend||this._loadingMore[e])return;this._loadingMore={...this._loadingMore,[e]:!0};const t=this._spotifyConfig.max_items_per_section;let i=0;"playlists"===e?i=this._playlists.length:"recently_played"===e?i=this._recentlyPlayed.length:"saved_tracks"===e?i=this._savedTracks.length:"saved_shows"===e&&(i=this._savedShows.length);try{const a=await this._backend.send("spotify_browse",{category:e,limit:t,offset:i,sort_order:this._spotifyConfig.sort_order}),r=(a?.items??[]).filter(Boolean);if("playlists"===e)this._playlists=[...this._playlists,...r];else if("recently_played"===e)this._recentlyPlayed=[...this._recentlyPlayed,...r];else if("saved_tracks"===e){this._savedTracks=[...this._savedTracks,...r];const e=r.map(e=>(e.track??e).id).filter(Boolean);e.length&&this._checkSavedStatus(e)}else"saved_shows"===e&&(this._savedShows=[...this._savedShows,...r.map(e=>e.show??e)]);null!=a?.total&&(this._sectionTotals={...this._sectionTotals,[e]:a.total})}catch(a){this._handleApiError(a)}finally{this._loadingMore={...this._loadingMore,[e]:!1}}}_renderLoadMore(e,t){const i=this._sectionTotals[e]??0;if(t>=i)return ie;const a=this._loadingMore[e],r=ti(Qa[e]);return Z`
      <button
        class="lib-more-link"
        ?disabled=${a}
        aria-label="${ti("spotify.load_more")} ${r} (${t}/${i})"
        @click=${t=>{t.stopPropagation(),this._loadMoreItems(e)}}
      >
        ${a?ti("spotify.loading"):Z`<span aria-hidden="true">${ti("spotify.load_more")}</span><span class="lib-more-count" aria-hidden="true">${t} / ${i}</span>`}
      </button>
    `}async _checkSavedStatus(e){const t=[...new Set(e)];if(t.length&&this._backend)try{const e=await this._backend.send("spotify_check_saved",{track_ids:t});if(!this.isConnected)return;const i=new Map(this._savedMap);for(const[t,a]of Object.entries(e??{}))i.set(t,a);this._savedMap=i}catch{}}async _toggleSaved(e){if(!this._backend)return;di(this,"light");const t=this._savedMap.get(e)??!1,i=new Map(this._savedMap);i.set(e,!t),this._savedMap=i;try{t?await this._backend.send("spotify_remove_tracks",{track_ids:[e]}):await this._backend.send("spotify_save_tracks",{track_ids:[e]})}catch{const i=new Map(this._savedMap);i.set(e,t),this._savedMap=i}}_handleApiError(e){const t=e;"spotify_not_configured"===t.code?this._spotifyConfigured=!1:t.message?.includes("rate limit")||t.message?.includes("429")?this._error=ti("spotify.error_rate_limit",{seconds:"30"}):this._error=ti("spotify.error_api")}render(){if(this._lang,!this._configLoaded)return ie;const e=this._getEntityId();if(!1===this._spotifyConfigured)return this._renderShell(Z`
        <div class="empty-state">
          <div class="banner-eyebrow banner-eyebrow-setup">
            <span class="banner-eyebrow-dot"></span>
            <span>${ti("spotify.setup_eyebrow")}</span>
          </div>
          <div class="ambient-icon"><ha-icon .icon=${"mdi:spotify"}></ha-icon></div>
          <div class="empty-state-title">${ti("spotify.not_configured")}</div>
          <a class="setup-banner-cta" href="/config/integrations/dashboard" target="_blank" rel="noopener noreferrer">
            <ha-icon .icon=${"mdi:arrow-up-right"}></ha-icon>
            <span>${ti("spotify.open_config")}</span>
          </a>
        </div>
      `);if(!e)return this._renderShell(Z`
        <div class="empty-state">
          <div class="banner-eyebrow banner-eyebrow-setup">
            <span class="banner-eyebrow-dot"></span>
            <span>${ti("spotify.setup_eyebrow")}</span>
          </div>
          <div class="ambient-icon"><ha-icon .icon=${"mdi:spotify"}></ha-icon></div>
          <div class="empty-state-title">${ti("spotify.no_entity")}</div>
          <a class="setup-banner-cta" href="/glass-cards" target="_blank" rel="noopener noreferrer">
            <ha-icon .icon=${"mdi:arrow-up-right"}></ha-icon>
            <span>${ti("spotify.open_config")}</span>
          </a>
        </div>
      `);const t="speaker_picker"===this._view&&this._pickerItem;return Z`
      ${this._renderShell(Z`
        ${this._error?Z`
          <div class="error-banner" role="alert">
            <div class="error-banner-icon"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></div>
            <div class="error-banner-body">
              <div class="banner-eyebrow banner-eyebrow-error">
                <span class="banner-eyebrow-dot"></span>
                <span>${ti("spotify.error_eyebrow")}</span>
              </div>
              <div class="error-banner-text">${this._error}</div>
            </div>
          </div>
        `:ie}
        ${"drilldown"===this._view&&this._drilldown?this._renderDrilldown():Z`
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
      ${t?this._renderSpeakerPicker():ie}
    `}_renderShell(e){return Z`
      <div class="spotify-card-wrap">
        ${this._spotifyConfig.show_header?Z`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${ti("spotify.title")}</span>
            </div>
          </div>
        `:ie}
        <div class="glass spotify-card ${this._foldOpen?"fold-open":""}">
          <div class="tint"></div>
          <div class="card-inner">${e}</div>
        </div>
      </div>
    `}_renderSearch(){const e=this._getPlaybackEntity();return e&&!this._foldOpen?this._renderNowPlayingBar(e):Z`
      <div class="search-row">
        <div class="search-input-wrap">
          <div class="search-icon"><ha-icon .icon=${"mdi:magnify"}></ha-icon></div>
          <input
            class="search-input"
            type="text"
            placeholder=${ti("spotify.search_placeholder")}
            .value=${this._searchQuery}
            @input=${this._onSearchInput}
            @focus=${()=>{this._foldOpen||(this._foldOpen=!0),this._scrollToTop()}}
          />
          <glass-icon-button
            class="search-clear ${this._searchQuery?"visible":""}"
            size="sm"
            .icon=${"mdi:close"}
            aria-label="${ti("spotify.clear_search")}"
            @click=${this._clearSearch}
          ></glass-icon-button>
          <glass-chevron
            class="search-toggle"
            interactive
            size="sm"
            ?open=${this._foldOpen}
            aria-label=${ti("spotify.toggle_library")}
            @click=${()=>{this._foldOpen=!this._foldOpen}}
          ></glass-chevron>
        </div>
      </div>
    `}_renderNowPlayingBar(e){const t="playing"===e.state,i=e.title??ti("spotify.tab_tracks");return Z`
      <div class="np-bar" role="region" aria-label=${ti("spotify.now_playing_aria")}>
        <div class="np-art">
          ${e.art?Z`<img src=${e.art} alt="" loading="lazy" />`:Z`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
        </div>
        <div class="np-meta">
          <div class="np-title">${i}</div>
          ${e.artist?Z`<div class="np-artist">${e.artist}</div>`:ie}
        </div>
        <div class="np-transport">
          <glass-icon-button
            size="sm"
            .icon=${"mdi:skip-previous"}
            aria-label=${ti("spotify.previous_track")}
            @click=${e=>this._mediaPrev(e)}
          ></glass-icon-button>
          <button class="np-btn np-btn-play ${t?"is-playing":"is-paused"}" aria-label=${ti(t?"spotify.pause":"spotify.play")} @click=${e=>this._mediaPlayPause(e)}>
            <ha-icon .icon=${t?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <glass-icon-button
            size="sm"
            .icon=${"mdi:skip-next"}
            aria-label=${ti("spotify.next_track")}
            @click=${e=>this._mediaNext(e)}
          ></glass-icon-button>
        </div>
        <glass-icon-button
          class="np-btn-search"
          size="sm"
          .icon=${"mdi:magnify"}
          aria-label=${ti("spotify.search_placeholder")}
          @click=${e=>{e.stopPropagation(),this._foldOpen=!0,this._focusSearchInput()}}
        ></glass-icon-button>
        <glass-chevron
          class="search-toggle"
          interactive
          size="sm"
          ?open=${this._foldOpen}
          aria-label=${ti("spotify.toggle_library")}
          @click=${()=>{this._foldOpen=!this._foldOpen}}
        ></glass-chevron>
      </div>
    `}_renderTabs(){const e=[{id:"all",labelKey:"spotify.tab_all",icon:"mdi:home"},{id:"tracks",labelKey:"spotify.tab_tracks",icon:"mdi:music-note"},{id:"playlists",labelKey:"spotify.tab_playlists",icon:"mdi:playlist-music"},{id:"podcasts",labelKey:"spotify.tab_podcasts",icon:"mdi:podcast"}],t=e.findIndex(e=>e.id===this._tab);return Z`
      <div class="tab-rail" style="--tab-active-idx: ${t};">
        <div class="tab-rail-capsule" aria-hidden="true"></div>
        ${e.map(e=>Z`
          <button
            class="tab-btn ${this._tab===e.id?"active":""}"
            aria-pressed=${this._tab===e.id?"true":"false"}
            aria-label=${ti(e.labelKey)}
            @click=${()=>{this._tab=e.id,this._searchQuery&&(this._searchOffset=0,this._doSearch(!1))}}
          >
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${ti(e.labelKey)}</span>
          </button>
        `)}
      </div>
    `}_renderLibrary(){if(this._libraryLoading)return Z`<div class="loading-text">${ti("spotify.loading")}</div>`;const e="all"===this._tab||"playlists"===this._tab,t="all"===this._tab||"tracks"===this._tab,i="all"===this._tab||"podcasts"===this._tab;return e&&this._playlists.length>0||t&&(this._recentlyPlayed.length>0||this._savedTracks.length>0)||i&&this._savedShows.length>0?Z`
      ${e&&this._playlists.length>0?Z`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-playlists">
            <span class="lib-eyebrow-dot"></span>
            <span>${ti("spotify.my_playlists")}</span>
            ${this._renderLoadMore("playlists",this._playlists.length)}
          </div>
          <div class="playlist-scroll">
            ${this._playlists.map(e=>this._renderPlaylistCard(e))}
          </div>
        </div>
      `:ie}

      ${t&&this._recentlyPlayed.length>0?Z`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-recents">
            <span class="lib-eyebrow-dot"></span>
            <span>${ti("spotify.recently_played")}</span>
            ${this._renderLoadMore("recently_played",this._recentlyPlayed.length)}
          </div>
          ${this._recentlyPlayed.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
        </div>
      `:ie}

      ${t&&this._savedTracks.length>0?Z`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-saved">
            <span class="lib-eyebrow-dot"></span>
            <span>${ti("spotify.saved_tracks")}</span>
            ${this._renderLoadMore("saved_tracks",this._savedTracks.length)}
          </div>
          ${this._savedTracks.map(e=>{const t=e.track??e;return this._renderResultRow(t,"track")})}
        </div>
      `:ie}

      ${i&&this._savedShows.length>0?Z`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-podcasts">
            <span class="lib-eyebrow-dot"></span>
            <span>${ti("spotify.followed_podcasts")}</span>
            ${this._renderLoadMore("saved_shows",this._savedShows.length)}
          </div>
          ${this._savedShows.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
        </div>
      `:ie}
    `:Z`
        <div class="empty-state">
          <div class="ambient-icon"><ha-icon .icon=${"mdi:music-note-off"}></ha-icon></div>
          <div class="empty-state-title">${ti("spotify.no_content")}</div>
          <div class="empty-state-sub">${ti("spotify.no_content_sub")}</div>
        </div>
      `}_renderPlaylistCard(e){const t=Ja(e,160),i=e.tracks?.total??0;return Z`
      <button
        class="playlist-card"
        aria-label=${e.name}
        @click=${()=>this._openDrilldown("playlist",e.id,e.name,Ja(e,300),e.owner?.display_name)}
      >
        <div class="playlist-art">
          ${t?Z`<img src=${t} alt="" loading="lazy" />`:Z`<div class="playlist-art-fallback"><ha-icon .icon=${"mdi:playlist-music"}></ha-icon></div>`}
          <div class="playlist-art-overlay" aria-hidden="true"></div>
          <div class="playlist-art-play"><ha-icon .icon=${"mdi:play"}></ha-icon></div>
        </div>
        <div class="playlist-name">${e.name}</div>
        ${i>0?Z`<div class="playlist-count">${ti("spotify.tracks_count",{count:String(i)})}</div>`:ie}
      </button>
    `}_renderResultRow(e,t){if(!e)return ie;const i=Ja(e,64),a=Za(e)||(e.owner?.display_name??""),r="show"===t||"episode"===t,s=e.uri??`spotify:${e.type??t}:${e.id}`,o=this._isNowPlaying(s);return Z`
      <div
        class="result-row ${o?"now-playing":""}"
        role="button"
        tabindex="0"
        @click=${()=>{"playlist"===t?this._openDrilldown("playlist",e.id,e.name,Ja(e,300),e.owner?.display_name):"album"===t?this._openDrilldown("album",e.id,e.name,Ja(e,300),Za(e)):this._openPicker(e)}}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.currentTarget.click())}}
      >
        <div class="result-art ${r?"round":""}">
          ${i?Z`<img src=${i} alt="" loading="lazy" />`:Z`<ha-icon .icon=${er(t)}></ha-icon>`}
        </div>
        <div class="result-info">
          <div class="result-title">${e.name}</div>
          <div class="result-meta">
            <span class="result-type-badge">${ti(function(e){switch(e){case"track":default:return"spotify.type_track";case"playlist":return"spotify.type_playlist";case"album":return"spotify.type_album";case"show":case"episode":return"spotify.type_podcast"}}(t))}</span>
            <span>${a}</span>
          </div>
        </div>
        ${"track"!==t&&"episode"!==t||!e.id?ie:Z`
          <glass-icon-button
            class="heart-btn"
            size="sm"
            active-color="alert"
            ?active=${this._savedMap.get(e.id)??!1}
            .icon=${this._savedMap.get(e.id)?"mdi:heart":"mdi:heart-outline"}
            aria-label="${this._savedMap.get(e.id)?ti("spotify.remove_track"):ti("spotify.save_track")}"
            @click=${t=>{t.stopPropagation(),this._toggleSaved(e.id)}}
          ></glass-icon-button>
        `}
        ${o?Z`<div class="eq-bars"><span></span><span></span><span></span></div>`:Z`
            <glass-icon-button
              class="result-play"
              size="sm"
              .icon=${"mdi:play"}
              active-color="spotify"
              aria-label=${ti("spotify.play_aria",{name:e.name})}
              @click=${t=>{t.stopPropagation(),this._openPicker(e)}}
            ></glass-icon-button>
          `}
      </div>
    `}_renderSearchResults(){if(this._searchLoading&&0===this._searchOffset)return Z`<div class="loading-text">${ti("spotify.loading")}</div>`;const{tracks:e,playlists:t,shows:i}=this._searchResults,a=("all"===this._tab||"tracks"===this._tab)&&e.length>0,r=("all"===this._tab||"playlists"===this._tab)&&t.length>0,s=("all"===this._tab||"podcasts"===this._tab)&&i.length>0;if(!a&&!r&&!s)return Z`
        <div class="empty-state">
          <div class="ambient-icon"><ha-icon .icon=${"mdi:magnify"}></ha-icon></div>
          <div class="empty-state-title">${ti("spotify.no_results_title")}</div>
          <div class="empty-state-sub">${ti("spotify.no_results",{query:this._searchQuery})}</div>
        </div>
      `;const o=s?"shows":r?"playlists":"tracks",n=this._searchHasMore?Z`
      <button
        class="lib-more-link"
        ?disabled=${this._searchLoading}
        aria-label="${ti("spotify.load_more")} (${this._searchQuery})"
        @click=${e=>{e.stopPropagation(),this._doSearch(!0)}}
      >
        ${this._searchLoading?Z`<span>${ti("spotify.loading")}</span>`:Z`<span aria-hidden="true">${ti("spotify.load_more")}</span>`}
      </button>
    `:ie;return Z`
      ${a?Z`
        <div class="lib-section">
          ${"all"===this._tab?Z`
            <div class="lib-eyebrow lib-eyebrow-tracks">
              <span class="lib-eyebrow-dot"></span>
              <span>${ti("spotify.tab_tracks")}</span>
              ${"tracks"===o?n:ie}
            </div>
          `:ie}
          ${e.map(e=>this._renderResultRow(e,"track"))}
        </div>
      `:ie}

      ${r?Z`
        <div class="lib-section">
          ${"all"===this._tab?Z`
            <div class="lib-eyebrow lib-eyebrow-playlists">
              <span class="lib-eyebrow-dot"></span>
              <span>${ti("spotify.tab_playlists")}</span>
              ${"playlists"===o?n:ie}
            </div>
          `:ie}
          ${t.map(e=>this._renderResultRow(e,"playlist"))}
        </div>
      `:ie}

      ${s?Z`
        <div class="lib-section">
          ${"all"===this._tab?Z`
            <div class="lib-eyebrow lib-eyebrow-podcasts">
              <span class="lib-eyebrow-dot"></span>
              <span>${ti("spotify.tab_podcasts")}</span>
              ${"shows"===o?n:ie}
            </div>
          `:ie}
          ${i.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
        </div>
      `:ie}

      ${"all"!==this._tab&&this._searchHasMore?Z`
        <div class="lib-section search-more-standalone">${n}</div>
      `:ie}
    `}_playFullDrilldown(){if(!this._drilldown)return;const e=this._drilldown,t=`spotify:${e.type}:${e.id}`;this._openPicker({id:e.id,name:e.title,type:e.type,uri:t})}_renderDrilldown(){const e=this._drilldown;if(!e)return ie;const t="album"===e.type?ti("spotify.type_album"):ti("spotify.type_playlist"),i=e.total>0?ti("spotify.tracks_count",{count:String(e.total)}):"",a=[e.subtitle,t,i].filter(Boolean).join(" · "),r=!e.loading&&e.items.length<e.total;return Z`
      <div class="drilldown">
        <div class="drilldown-hero">
          <glass-icon-button
            class="drilldown-back"
            size="sm"
            .icon=${"mdi:arrow-left"}
            aria-label=${ti("spotify.back")}
            @click=${this._goBack}
          ></glass-icon-button>
          <div class="drilldown-hero-art">
            ${e.image?Z`<img src=${e.image} alt="" loading="lazy" />`:Z`<ha-icon .icon=${"album"===e.type?"mdi:album":"mdi:playlist-music"}></ha-icon>`}
          </div>
          <div class="drilldown-hero-info">
            <div class="drilldown-hero-title">${e.title}</div>
            ${a?Z`<div class="drilldown-hero-meta">${a}</div>`:ie}
            <button
              class="drilldown-play-cta"
              @click=${this._playFullDrilldown}
              ?disabled=${0===e.items.length}
              aria-label=${ti("spotify.play_all")}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
              <span>${ti("spotify.play_all")}</span>
            </button>
          </div>
        </div>

        <div class="lib-section drilldown-tracks">
          <div class="lib-eyebrow lib-eyebrow-playlists">
            <span class="lib-eyebrow-dot"></span>
            <span>${ti("spotify.tab_tracks")}</span>
            ${r?Z`
              <button
                class="lib-more-link"
                ?disabled=${e.loading}
                aria-label="${ti("spotify.load_more")} (${e.items.length}/${e.total})"
                @click=${e=>{e.stopPropagation(),this._loadMoreDrilldown()}}
              >
                <span aria-hidden="true">${ti("spotify.load_more")}</span>
                <span class="lib-more-count" aria-hidden="true">${e.items.length} / ${e.total}</span>
              </button>
            `:ie}
          </div>
          ${e.items.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
          ${e.loading?Z`<div class="loading-text">${ti("spotify.loading")}</div>`:ie}
          ${e.loading||0!==e.items.length?ie:Z`
            <div class="empty-state">
              <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
              <div class="empty-state-text">${ti("spotify.no_content")}</div>
            </div>
          `}
        </div>
      </div>
    `}_renderSpeakerPicker(){const e=this._pickerItem;if(!e)return ie;const t=Ja(e,200),i=Za(e),a=this._selectedSpeakers.size,r=a>0;let s=ti("spotify.choose_speaker");if(1===a){const e=this._speakers.find(e=>this._selectedSpeakers.has(e.entityId));s=e?ti("spotify.play_on_named",{name:e.name}):ti("spotify.play")}else a>1&&(s=ti("spotify.play_on_count",{count:String(a)}));return Z`
      <div class="picker-backdrop visible" role="presentation" @click=${e=>{e.target.classList.contains("picker-backdrop")&&this._closePicker()}}>
        <div class="glass speaker-picker" role="dialog" aria-modal="true" aria-labelledby="picker-track-title">
          <div class="picker-header">
            <div class="picker-eyebrow">
              <span class="picker-eyebrow-dot"></span>
              <span>${ti("spotify.connect")}</span>
            </div>
            <button class="picker-close" aria-label="${ti("common.close")}" @click=${this._closePicker}>
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>

          <div class="picker-hero">
            <div class="picker-hero-art">
              ${t?Z`<img src=${t} alt="" />`:Z`<ha-icon .icon=${er(e.type??"track")}></ha-icon>`}
            </div>
            <div class="picker-hero-info">
              <div class="picker-hero-title" id="picker-track-title">${e.name}</div>
              ${i?Z`<div class="picker-hero-artist">${i}</div>`:ie}
            </div>
          </div>

          <div class="picker-speakers" role="listbox" aria-multiselectable="true">
            ${this._speakers.map(e=>this._renderSpeakerRow(e))}
          </div>

          <div class="picker-play-bar">
            <button
              class="picker-play-btn primary"
              ?disabled=${!r}
              @click=${()=>this._playOnSelectedSpeakers()}
              aria-label=${s}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
              <span>${s}</span>
            </button>
          </div>
        </div>
      </div>
    `}_renderSpeakerRow(e){const t=this._selectedSpeakers.has(e.entityId),i="playing"===e.state,a="paused"===e.state,r=i&&e.mediaTitle?e.mediaTitle:a?ti("spotify.paused"):"off"===e.state?ti("spotify.speaker_off"):ti("spotify.available"),s=i?"playing":a?"paused":"off"===e.state?"off":"idle";return Z`
      <button
        class="picker-speaker ${t?"selected":""} state-${s}"
        role="option"
        aria-selected=${t?"true":"false"}
        @click=${()=>this._toggleSpeakerSelection(e.entityId)}
      >
        <div class="picker-speaker-icon">
          <ha-icon .icon=${e.icon}></ha-icon>
        </div>
        <div class="picker-speaker-meta">
          <div class="picker-speaker-name">${e.name}</div>
          <div class="picker-speaker-status">
            ${i?Z`<span class="picker-state-eq" aria-hidden="true"><span></span><span></span><span></span></span>`:Z`<span class="picker-state-dot" aria-hidden="true"></span>`}
            <span class="picker-state-label">${r}</span>
          </div>
        </div>
        <div class="picker-speaker-check" aria-hidden="true">
          <ha-icon .icon=${"mdi:check"}></ha-icon>
        </div>
      </button>
    `}}Ya([Te()],tr.prototype,"_view"),Ya([Te()],tr.prototype,"_tab"),Ya([Te()],tr.prototype,"_searchQuery"),Ya([Te()],tr.prototype,"_playlists"),Ya([Te()],tr.prototype,"_recentlyPlayed"),Ya([Te()],tr.prototype,"_savedTracks"),Ya([Te()],tr.prototype,"_savedShows"),Ya([Te()],tr.prototype,"_searchResults"),Ya([Te()],tr.prototype,"_searchLoading"),Ya([Te()],tr.prototype,"_searchOffset"),Ya([Te()],tr.prototype,"_searchHasMore"),Ya([Te()],tr.prototype,"_drilldown"),Ya([Te()],tr.prototype,"_speakers"),Ya([Te()],tr.prototype,"_pickerItem"),Ya([Te()],tr.prototype,"_selectedSpeakers"),Ya([Te()],tr.prototype,"_error"),Ya([Te()],tr.prototype,"_libraryLoading"),Ya([Te()],tr.prototype,"_spotifyConfigured"),Ya([Te()],tr.prototype,"_foldOpen"),Ya([Te()],tr.prototype,"_savedMap"),Ya([Te()],tr.prototype,"_sectionTotals"),Ya([Te()],tr.prototype,"_loadingMore");try{customElements.define("glass-spotify-card",tr)}catch{}oi("glass-media-card-editor");var ir=Object.defineProperty,ar=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ir(t,i,s),s};const rr=524288;function sr(e){const t=e.attributes;let i=0;return t.media_position_updated_at&&(i=new Date(t.media_position_updated_at).getTime()/1e3),{entityId:e.entity_id,name:t.friendly_name||e.entity_id,state:e.state,title:t.media_title||"",artist:t.media_artist||"",albumArt:t.entity_picture||"",appName:t.app_name||"",volume:"number"==typeof t.volume_level?t.volume_level:0,isMuted:!!t.is_volume_muted,features:t.supported_features||0,groupMembers:Array.isArray(t.group_members)?t.group_members:[],shuffle:!!t.shuffle,repeat:t.repeat||"off",source:t.source||"",sourceList:Array.isArray(t.source_list)?t.source_list:[],soundMode:t.sound_mode||"",soundModeList:Array.isArray(t.sound_mode_list)?t.sound_mode_list:[],duration:"number"==typeof t.media_duration?t.media_duration:0,elapsed:"number"==typeof t.media_position?t.media_position:0,positionUpdatedAt:i,lastUpdated:e.last_updated?new Date(e.last_updated).getTime():0,icon:t.icon||"mdi:speaker"}}function or(e){return"playing"===e||"buffering"===e}function nr(e){return"playing"===e||"paused"===e||"buffering"===e}function lr(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}function cr(e,t){return 0!==(e.features&t)}const dr={Spotify:"mdi:spotify",AirPlay:"mdi:apple",Bluetooth:"mdi:bluetooth","Line-In":"mdi:audio-input-stereo-minijack",TV:"mdi:television",HDMI:"mdi:hdmi-port"};class hr extends ci{constructor(){super(...arguments),this._foldOpen=!1,this._mediaConfig={extra_entities:{},hidden_entities:[],show_header:!0},this._configLoaded=!1,this._roomIndex=0,this._roomEntityId="",this._prevPlayingSet="",this._swipeClass="",this._foldTab="controls",this._queueData=[],this._radioTracks=[],this._loadVersion=0,this._queueVersion=0,this._lastArtworkUrl="",this._configLoadingInProgress=!1,this._playersCache=null,this._playersCacheKey="",this._volumeThrottles=new Map,this._progressTimer=0,this._swipeAnimating=!1,this._swipeAnimTimer=0,this._queueRefreshTimer=0,this._prevMediaTitle="",this._lastMaster=null,this._lastMasterStaleTimer=0}static getConfigElement(){return document.createElement("glass-media-card-editor")}getCardSize(){return 4}setConfig(e){this._config=e}shouldUpdate(e){return!!super.shouldUpdate(e)&&(!this._swipeAnimating||1!==e.size||!e.has("hass"))}connectedCallback(){super.connectedCallback(),this._listen("media-config-changed",()=>{this._playersCache=null,this._loadConfig()}),this._listen("room-config-changed",()=>{this._playersCache=null}),this._listen("radio-queue-started",()=>{this._radioTracks=[]}),this._listen("radio-queue-track-added",e=>{this._radioTracks=[...this._radioTracks,e.track]}),this._listen("radio-queue-complete",()=>{this._foldOpen&&this._loadQueue()}),this._listen("radio-queue-error",e=>{console.warn("Radio queue error:",e.message)})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._volumeThrottles.clear(),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0),this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=0),this._queueRefreshTimer&&(clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=0),this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=null,++this._queueVersion,this._swipeAnimating=!1,this._swipeClass="",this._prevPlayingSet="",++this._loadVersion,this._configLoadingInProgress=!1,this._lastArtworkUrl="",this._samplingCanvas=void 0,this._samplingCtx=void 0,delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic"),this._unjoinUnsub?.(),this._unjoinUnsub=void 0}updated(e){if(super.updated(e),e.has("areaId")&&(this._foldOpen=!1,this._foldTab="controls",this._queueData=[],this._prevMediaTitle="",this._playersCache=null,this._playersCacheKey="",this._roomIndex=0),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._backend||(this._backend=new mi(this.hass),this._loadConfig());const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._playersCache=null,this._playersCacheKey="")}if(e.has("hass")&&this.isDashboard&&this.hass){const e=Object.entries(this.hass.states).filter(([e,t])=>e.startsWith("media_player.")&&"playing"===t.state).map(([e])=>e).sort().join(",");if(e!==this._prevPlayingSet){const t=new Set(this._prevPlayingSet.split(",").filter(Boolean)),i=e.split(",").filter(Boolean).filter(e=>!t.has(e));if(this._prevPlayingSet=e,i.length>0){const e=this._getActiveRooms(),t=e.findIndex(e=>i.includes(e.entityId)||i.some(t=>e.groupMembers.includes(t)));t>=0&&t!==this._roomIndex&&(this._roomIndex=t,this._roomEntityId=e[t].entityId)}}}if(e.has("_roomIndex")&&this._foldOpen&&"queue"===this._foldTab&&(this._queueData=[],this._prevMediaTitle="",this._loadQueue()),e.has("hass")&&this.hass&&this._foldOpen&&"queue"===this._foldTab){const e=this._getCurrentMaster(),t=e?this.hass.states[e.entityId]?.attributes?.media_title??"":"";t!==this._prevMediaTitle&&(this._prevMediaTitle=t,this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}(e.has("hass")||e.has("_roomIndex"))&&this._syncProgressTimer(),this._updateBgLightAttribute()}_updateBgLightAttribute(){const e=this.shadowRoot?.querySelector("img.dash-art-bg");if(!e)return this._lastArtworkUrl="",delete this.dataset.bgLight,void this.style.removeProperty("--c-accent-dynamic");if(!e.complete||0===e.naturalWidth)return void e.addEventListener("load",()=>this._updateBgLightAttribute(),{once:!0});if(e.src===this._lastArtworkUrl)return;this._lastArtworkUrl=e.src;const t=16;this._samplingCanvas||(this._samplingCanvas=document.createElement("canvas"),this._samplingCanvas.width=t,this._samplingCanvas.height=t,this._samplingCtx=this._samplingCanvas.getContext("2d",{willReadFrequently:!0}));const i=this._samplingCtx;if(i)try{i.clearRect(0,0,t,t),i.drawImage(e,0,0,t,t);const a=i.getImageData(0,0,t,t).data;let r=0;const s=256;for(let e=0;e<a.length;e+=4)r+=.299*a[e]+.587*a[e+1]+.114*a[e+2];r/s/255>.55?this.dataset.bgLight="true":delete this.dataset.bgLight;let o=0,n=0,l=0,c=0;for(let e=0;e<a.length;e+=4){const t=a[e],i=a[e+1],r=a[e+2],s=Math.max(t,i,r)/255,d=Math.min(t,i,r)/255,h=s===d?0:(s+d)/2>.5?(s-d)/(2-s-d):(s-d)/(s+d);h<.15||(o+=t*h,n+=i*h,l+=r*h,c+=h)}if(c>0){const e=`rgb(${Math.round(o/c)}, ${Math.round(n/c)}, ${Math.round(l/c)})`;this.style.setProperty("--c-accent-dynamic",e)}else this.style.removeProperty("--c-accent-dynamic")}catch{delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic")}}_syncProgressTimer(){const e=this.hass?this._getPlayers():[],t=this._findMaster(e),i=null!=t&&or(t.state)&&t.duration>0;i&&!this._progressTimer?this._progressTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0)}getTrackedEntityIds(){return this.isDashboard&&this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")):this._getPlayers().map(e=>e.entityId)}get isDashboard(){return!this.areaId}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.media_card&&(this._mediaConfig={extra_entities:t.media_card.extra_entities??{},hidden_entities:t.media_card.hidden_entities??[],show_header:t.media_card.show_header??!0}),this._configLoaded=!0,this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}_getPlayers(){if(!this.hass)return[];if(this.isDashboard){const e=new Set(this._mediaConfig.hidden_entities);return Object.values(this.hass.states).filter(t=>t.entity_id.startsWith("media_player.")&&nr(t.state)&&!e.has(t.entity_id)).map(sr).sort((e,t)=>{const i=e=>"playing"===e?0:"buffering"===e?1:2,a=i(e.state)-i(t.state);return 0!==a?a:t.lastUpdated-e.lastUpdated})}const e=this.areaId??"",t=this._mediaConfig.extra_entities[e]||[],i=`${e}:${JSON.stringify(t)}`;if(this._playersCache&&this._playersCacheKey===i)return this._playersCache.map(e=>{const t=this.hass?.states[e.entityId];return t?sr(t):e});const a=(this.hass.entities?pi(e,this.hass.entities,this.hass.devices):[]).filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id),r=[...new Set([...a,...t])].map(e=>this.hass?.states[e]).filter(e=>!!e).map(sr);return this._playersCache=r,this._playersCacheKey=i,r}_findMaster(e){return e.find(e=>or(e.state))||e.find(e=>nr(e.state))||null}_getCurrentMaster(){if(this.isDashboard){const e=this._getActiveRooms();if(!e.length)return this._lastMaster??null;return e[Math.min(this._roomIndex,e.length-1)]}return this._findMaster(this._getPlayers())}_getActiveRooms(){if(!this.hass)return[];const e=new Set(this._mediaConfig.hidden_entities),t=Object.values(this.hass.states).filter(t=>t.entity_id.startsWith("media_player.")&&nr(t.state)&&!e.has(t.entity_id)).map(sr);t.sort((e,t)=>{const i=(e.groupMembers.length>0&&e.groupMembers[0]===e.entityId?0:1)-(t.groupMembers.length>0&&t.groupMembers[0]===t.entityId?0:1);return 0!==i?i:t.lastUpdated-e.lastUpdated});const i=new Set,a=[];for(const r of t)if(!i.has(r.entityId)){for(const e of r.groupMembers)i.add(e);i.add(r.entityId),a.push(r)}return a}_togglePlayPause(e){di(this,"light"),or(e.state)?cr(e,1)?this._safeCallService("media_player","media_pause",{},{entity_id:e.entityId}):cr(e,4096)&&this._safeCallService("media_player","media_stop",{},{entity_id:e.entityId}):cr(e,16384)&&this._safeCallService("media_player","media_play",{},{entity_id:e.entityId})}_previous(e){di(this,"light"),this._safeCallService("media_player","media_previous_track",{},{entity_id:e})}_next(e){di(this,"light"),this._safeCallService("media_player","media_next_track",{},{entity_id:e}),this._foldOpen&&"queue"===this._foldTab&&(this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}_toggleMute(e){this._safeCallService("media_player","volume_mute",{is_volume_muted:!e.isMuted},{entity_id:e.entityId})}_setVolume(e,t){const i=Date.now();i-(this._volumeThrottles.get(e)||0)<100||(this._volumeThrottles.set(e,i),this._safeCallService("media_player","volume_set",{volume_level:t},{entity_id:e}))}_toggleShuffle(e){this._safeCallService("media_player","shuffle_set",{shuffle:!e.shuffle},{entity_id:e.entityId})}_cycleRepeat(e){const t="off"===e.repeat?"all":"all"===e.repeat?"one":"off";this._safeCallService("media_player","repeat_set",{repeat:t},{entity_id:e.entityId})}_selectSource(e,t){this._safeCallService("media_player","select_source",{source:t},{entity_id:e})}_selectSoundMode(e,t){this._safeCallService("media_player","select_sound_mode",{sound_mode:t},{entity_id:e})}_seekProgress(e,t,i){const a=i/100*t;this._safeCallService("media_player","media_seek",{seek_position:a},{entity_id:e})}_joinGroup(e,t){this._safeCallService("media_player","join",{group_members:[t]},{entity_id:e})}_unjoinGroup(e){this._safeCallService("media_player","unjoin",{},{entity_id:e})}async _waitForUnjoin(e,t=3e3){this._unjoinUnsub?.(),this._unjoinUnsub=void 0;const i=++this._loadVersion;return new Promise(a=>{let r=!1;const s=()=>{r||(r=!0,this._unjoinUnsub?.(),this._unjoinUnsub=void 0,clearTimeout(o))};if(!this.hass)return void a(!1);this.hass.connection.subscribeEvents(t=>{if(i===this._loadVersion){if(t.data.entity_id===e){const e=t.data.new_state?.attributes?.group_members;(!e||e.length<=1)&&(s(),a(!0))}}else s()},"state_changed").then(e=>{r?e():this._unjoinUnsub=e});const o=setTimeout(()=>{s(),a(!1)},t)})}async _smartJoin(e,t){if(!this.hass)return;const i=this.hass.states[t];if(!i)return;const a=i.attributes.group_members;a&&a.length>1&&(this._unjoinGroup(t),await this._waitForUnjoin(t),!this.isConnected||!this.hass)||this._joinGroup(e,t)}_swipeToRoom(e,t){this._swipeAnimating||(this._swipeAnimating=!0,this._foldOpen=!1,this._swipeClass="left"===e?"swipe-exit-left":"swipe-exit-right",this._swipeAnimTimer=window.setTimeout(()=>{this._roomIndex=t,this._roomEntityId="",this._swipeClass="left"===e?"swipe-enter-right":"swipe-enter-left",this._swipeAnimTimer=window.setTimeout(()=>{this._swipeClass="",this._swipeAnimating=!1},280)},220))}_onProgressPointerDown(e,t,i){e.stopPropagation();const a=e.currentTarget;a.setPointerCapture(e.pointerId);const r=a.querySelector(".dash-progress-fill"),s=a.querySelector(".dash-progress-thumb"),o=e=>{const t=a.getBoundingClientRect(),i=Math.max(0,Math.min(100,(e.clientX-t.left)/t.width*100));r.style.width=i+"%",r.style.transition="none",s.style.left=i+"%",s.style.opacity="1"};o(e);const n=e=>o(e),l=()=>{a.removeEventListener("pointermove",n),a.removeEventListener("pointerup",c),a.removeEventListener("pointercancel",l),a.removeEventListener("lostpointercapture",l),r.style.transition="",s.style.opacity=""},c=e=>{l();const r=a.getBoundingClientRect(),s=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));this._seekProgress(t,i,s)};a.addEventListener("pointermove",n),a.addEventListener("pointerup",c),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l)}_onVolKey(e,t,i){let a=null;switch(e.key){case"ArrowLeft":case"ArrowDown":a=Math.max(0,i-5);break;case"ArrowRight":case"ArrowUp":a=Math.min(100,i+5);break;case"PageDown":a=Math.max(0,i-10);break;case"PageUp":a=Math.min(100,i+10);break;case"Home":a=0;break;case"End":a=100;break;default:return}e.preventDefault(),this._setVolume(t,a/100)}_onMrVolPointerDown(e,t){e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const a=i.querySelector(".speaker-vol-fill"),r=i.querySelector(".speaker-vol-val"),s=e=>{const s=i.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100));a.style.width=o+"%",r&&(r.textContent=Math.round(o)+"%"),this._setVolume(t,o/100)};s(e);const o=e=>s(e),n=()=>{di(this,"light"),i.removeEventListener("pointermove",o),i.removeEventListener("pointerup",n),i.removeEventListener("pointercancel",n),i.removeEventListener("lostpointercapture",n)};i.addEventListener("pointermove",o),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("lostpointercapture",n)}_getElapsed(e){if(!or(e.state)||0===e.positionUpdatedAt)return e.elapsed;const t=Date.now()/1e3-e.positionUpdatedAt;return Math.min(e.elapsed+t,e.duration)}_getProgress(e){return e.duration<=0?0:Math.min(100,this._getElapsed(e)/e.duration*100)}_renderHero(e,t=1){const i=or(e.state),a=this._getProgress(e),r=this._getElapsed(e),s=this._getGroupablePlayers(),o=this._findGroupCoordinator(e,s),n=(o?.groupMembers||[]).length,l=this._bindGesture({onLongPress:()=>{this._foldOpen=!this._foldOpen,this._foldOpen&&this._loadQueue(),this._foldOpen&&setTimeout(()=>{const e=this.renderRoot?.querySelector(".ctrl-fold");e?.scrollIntoView({behavior:"smooth",block:"nearest"})},350)},onSwipe:e=>{this.isDashboard&&t>1&&("left"===e?this._swipeToRoom("left",(this._roomIndex+1)%t):this._swipeToRoom("right",(this._roomIndex-1+t)%t))},exclude:"button, glass-transport-button, glass-chip, glass-tabs, glass-icon-button"});return Z`
      <div class="dash-wrap ${this._foldOpen?"fold-open":""}">
        <div class="dash-hero ${this._swipeClass}"
          @pointerdown=${l.pointerdown}
          @pointerup=${l.pointerup}
          @pointermove=${l.pointermove}
          @pointercancel=${l.pointercancel}
          @contextmenu=${l.contextmenu}
        >
          <!-- Full-bleed artwork background -->
          ${e.albumArt?Z`
            <img class="dash-art-bg" src=${e.albumArt} alt="" loading="lazy"
              @error=${e=>{e.target.style.display="none";const t=e.target.parentElement?.querySelector(".dash-deco");t&&(t.style.display="");const i=e.target.parentElement?.querySelector(".dash-placeholder");i&&(i.style.display="")}} />
          `:ie}
          <div class="dash-gradient"></div>
          <div class="dash-deco" style="${e.albumArt?"display:none":""}"></div>
          <div class="dash-placeholder" style="${e.albumArt?"display:none":""}">
            <ha-icon .icon=${e.source?.toLowerCase().includes("tv")||e.icon?.includes("tv")||e.icon?.includes("television")?"mdi:television-classic":e.appName?.toLowerCase().includes("spotify")?"mdi:spotify":"playing"===e.state||"paused"===e.state?"mdi:music-note":e.icon||"mdi:speaker"}></ha-icon>
          </div>

          <div class="dash-content">
            <!-- Top bar: speaker badge + group badge (glass pills) -->
            <div class="dash-top">
              <div class="dash-speaker glass-pill">
                <ha-icon .icon=${e.icon||"mdi:speaker"}></ha-icon>
                <span>${e.name}</span>
                ${i?Z`
                  <div class="dash-eq playing">
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                  </div>
                `:ie}
              </div>
              ${n>1?Z`
                <div class="dash-group-badge glass-pill">
                  <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                  <span>${ti("media.speakers_count",{count:n})}</span>
                </div>
              `:ie}
            </div>

            <!-- Spacer -->
            <div class="dash-spacer"></div>

            <!-- Bottom glass panel: track info + progress + transport -->
            <div class="dash-info-panel glass-panel">
              <div class="dash-track">
                ${e.title?Z`
                  <div class="dash-track-title">${e.title}</div>
                `:ie}
                ${e.artist?Z`
                  <div class="dash-track-artist">${e.artist}</div>
                `:ie}
              </div>

              <!-- Progress bar -->
              ${e.duration>0&&cr(e,2)?Z`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${lr(r)}</span>
                    <span class="dash-track-time">${lr(e.duration)}</span>
                  </div>
                  <div class="dash-progress"
                    aria-label=${ti("media.seek_aria")}
                    @pointerdown=${t=>this._onProgressPointerDown(t,e.entityId,e.duration)}
                  >
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                    <div class="dash-progress-thumb" style="left:${a}%"></div>
                  </div>
                </div>
              `:e.duration>0?Z`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${lr(r)}</span>
                    <span class="dash-track-time">${lr(e.duration)}</span>
                  </div>
                  <div class="dash-progress" style="pointer-events:none">
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                  </div>
                </div>
              `:ie}

              <!-- Transport -->
              <div class="dash-transport">
                ${cr(e,32768)?Z`
                  <glass-transport-button
                    .icon=${"mdi:shuffle-variant"}
                    ?active=${e.shuffle}
                    active-color="accent"
                    aria-label=${ti("media.shuffle_aria")}
                    @click=${t=>{t.stopPropagation(),this._toggleShuffle(e)}}
                  ></glass-transport-button>
                `:ie}

                ${cr(e,16)?Z`
                  <glass-transport-button
                    .icon=${"mdi:skip-previous"}
                    aria-label=${ti("media.prev_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._previous(e.entityId)}}
                  ></glass-transport-button>
                `:ie}

                <glass-transport-button
                  variant="main"
                  .icon=${i?"mdi:pause":"mdi:play"}
                  aria-label=${ti(i?"media.pause_aria":"media.play_aria",{name:e.name})}
                  @click=${t=>{t.stopPropagation(),this._togglePlayPause(e)}}
                ></glass-transport-button>

                ${cr(e,32)?Z`
                  <glass-transport-button
                    .icon=${"mdi:skip-next"}
                    aria-label=${ti("media.next_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._next(e.entityId)}}
                  ></glass-transport-button>
                `:ie}

                ${cr(e,262144)?Z`
                  <glass-transport-button
                    .icon=${"one"===e.repeat?"mdi:repeat-once":"mdi:repeat"}
                    ?active=${"off"!==e.repeat}
                    active-color="accent"
                    aria-label=${ti("media.repeat_aria")}
                    @click=${t=>{t.stopPropagation(),this._cycleRepeat(e)}}
                  ></glass-transport-button>
                `:ie}
              </div>

              <div class="dash-source-row">
                ${o&&o.entityId!==e.entityId?Z`
                  <span class="dash-coordinator-badge">
                    <ha-icon .icon=${o.icon||"mdi:speaker"}></ha-icon>
                    ${o.name}
                  </span>
                `:ie}
                ${e.source?Z`
                  <span class="dash-track-source">${e.source}</span>
                `:ie}
              </div>
            </div>
          </div>

          <!-- Navigation arrows (desktop hover, multi-room) -->
          ${this.isDashboard&&t>1?Z`
            <button class="dash-nav-arrow dash-nav-left" aria-label=${ti("media.prev_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("right",(this._roomIndex-1+t)%t)}}>
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <button class="dash-nav-arrow dash-nav-right" aria-label=${ti("media.next_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("left",(this._roomIndex+1)%t)}}>
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          `:ie}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="dash-fold-sep-top"></div>
            <div class="dash-fold-panel">
              ${this._foldOpen?this._renderFoldContent(e,o,s):ie}
            </div>
          </div>
        </div>
      </div>
    `}_renderFoldContent(e,t,i){const a="queue"===this._foldTab;return Z`
      <glass-tabs
        layout="segmented"
        size="sm"
        .value=${this._foldTab}
        .items=${[{value:"controls",label:ti("media.controls_tab")},{value:"queue",label:ti("media.queue_tab")}]}
        @glass-tab-change=${e=>{this._foldTab=e.detail.value,"queue"===this._foldTab&&this._loadQueue()}}
      ></glass-tabs>
      ${a?this._renderQueueTab():this._renderControlsTab(e,t,i)}
    `}_renderControlsTab(e,t,i){return Z`
      <!-- Volume (master) — same bar pattern as the speakers below -->
      ${cr(e,4)?(()=>{const t=Math.round(100*(e.isMuted?0:e.volume)),i=e.isMuted||0===e.volume?"mdi:volume-off":e.volume>=.67?"mdi:volume-high":e.volume>=.34?"mdi:volume-medium":"mdi:volume-low";return Z`
          <div class="speaker-row master ${e.isMuted?"muted":""}">
            ${cr(e,8)?Z`
              <button class="speaker-icon-btn"
                aria-label=${e.isMuted?ti("media.unmute_aria",{name:e.name}):ti("media.mute_aria",{name:e.name})}
                @click=${t=>{t.stopPropagation(),this._toggleMute(e)}}>
                <ha-icon .icon=${i}></ha-icon>
              </button>
            `:Z`
              <div class="speaker-icon-btn static">
                <ha-icon .icon=${i}></ha-icon>
              </div>
            `}
            <div class="speaker-vol-slider"
              role="slider"
              tabindex="0"
              aria-label=${ti("media.volume_aria",{name:e.name})}
              aria-valuenow=${t}
              aria-valuemin="0"
              aria-valuemax="100"
              @pointerdown=${t=>this._onMrVolPointerDown(t,e.entityId)}
              @keydown=${i=>this._onVolKey(i,e.entityId,t)}>
              <div class="speaker-vol-fill" style="width:${t}%"></div>
              <span class="speaker-vol-val">${t}%</span>
            </div>
          </div>
        `})():ie}

      ${cr(e,2048)&&e.sourceList.length>0?Z`
        <div class="dash-fold-sep"></div>
        <div class="media-section">
          <glass-section-title label=${ti("media.source_label")}></glass-section-title>
          <div class="chips-row">
            ${e.sourceList.map(t=>Z`
              <glass-chip
                size="sm"
                active-color="accent"
                ?active=${e.source===t}
                .icon=${dr[t]||"mdi:import"}
                @click=${i=>{i.stopPropagation(),this._selectSource(e.entityId,t)}}
              >${t}</glass-chip>
            `)}
          </div>
        </div>
      `:ie}

      ${cr(e,65536)&&e.soundModeList.length>0?Z`
        <div class="dash-fold-sep"></div>
        <div class="media-section">
          <glass-section-title label=${ti("media.sound_mode_label")}></glass-section-title>
          <div class="chips-row">
            ${e.soundModeList.map(t=>Z`
              <glass-chip
                size="sm"
                active-color="accent"
                ?active=${e.soundMode===t}
                .icon=${"mdi:equalizer"}
                @click=${i=>{i.stopPropagation(),this._selectSoundMode(e.entityId,t)}}
              >${t}</glass-chip>
            `)}
          </div>
        </div>
      `:ie}

      <!-- Multiroom grid (show if any groupable speakers exist) -->
      ${i.length>1?this._renderMultiroomGrid(t,i):ie}
    `}async _loadQueue(){if(!this.hass)return;const e=++this._queueVersion,t=this._getCurrentMaster();if(t)try{const i=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"sonos",service:"get_queue",target:{entity_id:t.entityId},return_response:!0});if(e!==this._queueVersion)return;const a=i?.response?.[t.entityId]??[];this._queueData=a.map(e=>({name:e.media_title??"",artist:e.media_artist??"",album_name:e.media_album_name??"",content_id:e.media_content_id??""}))}catch(i){if(e!==this._queueVersion)return;console.warn("[glass] queue load error:",i)}}_renderQueueTab(){const e=this._getCurrentMaster(),t=e?this.hass?.states[e.entityId]?.attributes?.queue_position??0:0,i=this._queueData.slice(t);return i.length?Z`
      <div class="queue-list">
        ${i.map((e,i)=>{const a=e.name??"",r=e.artist??"",s=e.content_id??"",o=!!s&&this._radioTracks.some(e=>e.uri===s),n=t+i;return Z`
            <div class="queue-item">
              <div class="queue-num">${i+1}</div>
              <div class="queue-info">
                <span class="queue-title">${a}</span>
                <span class="queue-artist">${r}</span>
              </div>
              ${o?Z`<span class="queue-badge">${ti("media.radio_badge")}</span>`:ie}
              <glass-icon-button
                size="sm"
                .icon=${"mdi:close"}
                aria-label="${ti("media.remove_from_queue")}"
                @click=${e=>{e.stopPropagation(),this._removeFromQueue(n)}}
              ></glass-icon-button>
            </div>
          `})}
      </div>
    `:Z`<div class="queue-empty">${ti("media.queue_empty")}</div>`}async _removeFromQueue(e){if(this.configPreview)return;const t=this._getCurrentMaster();if(t&&this.hass){this._queueData=this._queueData.filter((t,i)=>i!==e);try{await this.hass.callService("sonos","remove_from_queue",{queue_position:e},{entity_id:t.entityId})}catch{this._loadQueue()}}}_getGroupablePlayers(){return this.hass?Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")).map(sr).filter(e=>cr(e,rr)):[]}_findGroupCoordinator(e,t){if(cr(e,rr))return e;const i=t.find(t=>or(t.state)&&t.title&&t.title===e.title);return i||null}_renderMultiroomGrid(e,t){if(!this.hass||!e)return Z``;const i=e.entityId,a=new Set(e.groupMembers),r=t.filter(e=>e.entityId!==i);if(0===r.length)return Z``;const s=r.filter(e=>a.has(e.entityId)).length+1,o=r.length+1;return Z`
      <div class="dash-fold-sep"></div>
      <div class="speakers-section">
        <glass-section-title label=${ti("media.speakers_label")}>
          <span slot="end" class="speakers-count">${s}/${o}</span>
        </glass-section-title>
        <div class="speakers-list">
          ${r.map(e=>{const t=a.has(e.entityId),r=Math.round(100*e.volume);return Z`
              <div class="speaker-row ${t?"joined":""}">
                <button class="speaker-icon-btn"
                  aria-label=${ti(t?"media.remove_group_aria":"media.add_group_aria",{name:e.name})}
                  aria-pressed=${t?"true":"false"}
                  @click=${a=>{a.stopPropagation(),t?this._unjoinGroup(e.entityId):this._smartJoin(i,e.entityId)}}>
                  <ha-icon .icon=${e.icon||"mdi:speaker"}></ha-icon>
                </button>
                <div class="speaker-vol-slider"
                  role="slider"
                  tabindex=${t?"0":"-1"}
                  aria-label=${ti("media.volume_aria",{name:e.name})}
                  aria-valuenow=${r}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-disabled=${t?"false":"true"}
                  @pointerdown=${t?t=>this._onMrVolPointerDown(t,e.entityId):null}
                  @keydown=${t?t=>this._onVolKey(t,e.entityId,r):null}>
                  <div class="speaker-vol-fill" style="width:${r}%"></div>
                  <span class="speaker-vol-name" title=${e.name}>${e.name}</span>
                  <span class="speaker-vol-val">${r}%</span>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}_collapseExpanded(){this._foldOpen&&(this._foldOpen=!1,this._foldTab="controls")}render(){if(this._lang,!this.hass)return ie;if(!this._configLoaded)return ie;const e=this._mediaConfig.show_header;if(this.isDashboard){const t=this._getActiveRooms();if(0===t.length)return this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),Z`
          ${e?Z`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${ti("media.title")}</span>
              </div>
            </div>
          `:ie}
          ${this._renderHero(this._lastMaster)}
        `):ie;if(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._roomEntityId){const e=t.findIndex(e=>e.entityId===this._roomEntityId);e>=0?this._roomIndex=e:this._roomIndex>=t.length&&(this._roomIndex=0)}this._roomIndex>=t.length&&(this._roomIndex=0);const i=t[this._roomIndex];return this._roomEntityId=i.entityId,this._lastMaster=i,Z`
        ${e?Z`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${ti("media.title")}</span>
            </div>
            ${i.source?Z`
              <span class="card-source active">${i.source}</span>
            `:ie}
          </div>
        `:ie}
        ${this._renderHero(i,t.length)}
        ${t.length>1?Z`
          <div class="dash-dots">
            ${t.map((e,t)=>Z`
              <button class="dash-dot ${t===this._roomIndex?"active":""}"
                aria-label=${ti("media.room_dot_aria",{index:t+1})}
                aria-current=${t===this._roomIndex?"true":"false"}
                @click=${e=>{e.stopPropagation(),t!==this._roomIndex&&this._swipeToRoom(t>this._roomIndex?"left":"right",t)}}>
              </button>
            `)}
          </div>
        `:ie}
      `}const t=this._getPlayers(),i=this._findMaster(t);return i&&nr(i.state)?(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=i,Z`
      ${e?Z`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${ti("media.title")}</span>
          </div>
          ${i.source?Z`
            <span class="card-source active">${i.source}</span>
          `:ie}
        </div>
      `:ie}
      ${this._renderHero(i)}
    `):this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),Z`
        ${e?Z`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${ti("media.title")}</span>
            </div>
          </div>
        `:ie}
        ${this._renderHero(this._lastMaster)}
      `):ie}static{this.styles=[Lt,Pt,Mt,Ot,Rt,Dt,m`
      :host {
        width: 100%;
        max-width: 31.25rem;
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
        color: rgba(var(--rgb-white),0.12);
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 0 20px rgba(var(--rgb-accent),0.15));
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
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
        max-width: 100%;
      }
      .dash-speaker > span {
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
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
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
        text-shadow: 0 1px 4px rgba(var(--rgb-black),0.5), 0 0 12px rgba(var(--rgb-black),0.3);
      }
      .dash-track-artist {
        font-size: var(--fz-base); font-weight: 500; color: rgba(var(--rgb-white),0.75);
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
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
      /* Transport buttons handled by <glass-transport-button>. */

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

      /* Master-only quirks: hover bump on the mute icon and red icon when muted. */
      @media (hover: hover) and (pointer: fine) {
        .speaker-row.master .speaker-icon-btn:hover { background: rgba(var(--rgb-white), 0.14); color: #fff; }
      }
      .speaker-row.master.muted .speaker-icon-btn { color: var(--c-alert); }
      .speaker-icon-btn.static { cursor: default; }

      /* ── Volume slider ── */
      glass-slider { flex: 1; }

      /* ── Chips row container (chips themselves are <glass-chip>) ── */
      .chips-row { display: flex; gap: 0.375rem; flex-wrap: wrap; }

      /* ── Speakers list (multiroom) — sections container. Eyebrows now use
         <glass-section-title>. ── */
      .speakers-section,
      .media-section { display: flex; flex-direction: column; gap: 0.4375rem; }
      .speakers-count {
        display: inline-flex; align-items: center; justify-content: center;
        height: 1rem; padding: 0 0.4375rem;
        border-radius: var(--radius-full);
        background: var(--s2); color: var(--t3);
        font-size: var(--fz-xxs); font-weight: 700;
        letter-spacing: 0.5px;
      }
      /* Icon and slider read as one continuous bar. Radius aligned with the
         segmented controls/queue toggle above for visual consistency. */
      .speakers-list { display: flex; flex-direction: column; gap: 0.375rem; }
      .speaker-row {
        display: flex; align-items: stretch; height: 2rem;
        border-radius: var(--radius-lg);
        background: var(--s2); border: 1px solid var(--b1);
        overflow: hidden;
        transition: border-color var(--t-fast);
      }
      /* Joined speakers share the master's white tint (the whole group reads
         as a single tonal family). */
      .speaker-row:is(.master, .joined) {
        border-color: rgba(var(--rgb-white), 0.18);
      }

      .speaker-icon-btn {
        width: 2rem; flex-shrink: 0;
        background: var(--s3); border: none;
        border-right: 1px solid var(--b1);
        padding: 0; outline: none; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        color: var(--t4);
        transition: background var(--t-fast), color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .speaker-icon-btn ha-icon {
        --mdc-icon-size: 0.875rem;
        display: flex; align-items: center; justify-content: center;
      }
      .speaker-row:is(.master, .joined) .speaker-icon-btn {
        background: rgba(var(--rgb-white), 0.08);
        color: rgba(var(--rgb-white), 0.85);
        border-right-color: rgba(var(--rgb-white), 0.18);
      }
      @media (hover: hover) and (pointer: fine) {
        .speaker-row:not(.master):not(.joined) .speaker-icon-btn:hover { background: var(--s4); color: var(--t2); }
      }
      .speaker-icon-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

      .speaker-vol-slider {
        position: relative; flex: 1;
        height: 2.25rem; min-height: 2.25rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
        overflow: hidden;
        cursor: pointer; touch-action: none;
        user-select: none; -webkit-user-select: none;
        transition: opacity var(--t-fast);
        outline: none;
      }
      .speaker-vol-slider:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.35);
        outline-offset: -2px;
      }
      .speaker-row:not(.master):not(.joined) .speaker-vol-slider {
        opacity: 0.4; pointer-events: none; cursor: default;
      }
      .speaker-vol-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        pointer-events: none;
        background: linear-gradient(90deg,
          rgba(var(--rgb-white), 0.05),
          rgba(var(--rgb-white), 0.1));
        transition: width var(--t-fast);
      }
      .speaker-row:is(.master, .joined) .speaker-vol-fill {
        background: linear-gradient(90deg,
          rgba(var(--rgb-white), 0.08),
          rgba(var(--rgb-white), 0.18));
      }
      .speaker-vol-slider:active .speaker-vol-fill { transition: none; }
      .speaker-vol-name {
        position: absolute; top: 50%; left: 0.625rem; transform: translateY(-50%);
        font-size: var(--fz-sm); font-weight: 600; color: var(--t1);
        z-index: 1; pointer-events: none;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: calc(100% - 4rem);
        text-shadow: 0 1px 2px rgba(var(--rgb-black), 0.25);
      }
      .speaker-row:not(.master):not(.joined) .speaker-vol-name { color: var(--t3); text-shadow: none; }
      .speaker-vol-val {
        position: absolute; top: 50%; right: 0.625rem; transform: translateY(-50%);
        font-size: var(--fz-xs); font-weight: 700; color: var(--t2);
        z-index: 1; pointer-events: none;
        font-variant-numeric: tabular-nums;
      }
      .speaker-row:is(.master, .joined) .speaker-vol-val { color: var(--t1); }
      @media (prefers-reduced-motion: reduce) {
        .speaker-row, .speaker-vol-fill, .speaker-vol-slider, .speaker-icon-btn { transition: none; }
      }

      /* ── Segmented control (Controls / Queue) handled by <glass-tabs>. ── */

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
        text-overflow: ellipsis;
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
      /* Queue row remove button uses <glass-icon-button size="sm">.
         Dim it by default and reveal on hover. */
      .queue-item glass-icon-button { opacity: 0.4; transition: opacity var(--t-fast); }
      @media (hover: hover) and (pointer: fine) {
        .queue-item:hover glass-icon-button { opacity: 1; }
      }
    `]}}ar([Se()],hr.prototype,"areaId"),ar([Te()],hr.prototype,"_foldOpen"),ar([Te()],hr.prototype,"_mediaConfig"),ar([Te()],hr.prototype,"_configLoaded"),ar([Te()],hr.prototype,"_roomIndex"),ar([Te()],hr.prototype,"_swipeClass"),ar([Te()],hr.prototype,"_foldTab"),ar([Te()],hr.prototype,"_queueData"),ar([Te()],hr.prototype,"_radioTracks");try{customElements.define("glass-media-card",hr)}catch{}oi("glass-presence-card-editor");var pr=Object.defineProperty,ur=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&pr(t,i,s),s};const gr=[{from:"#6366f1",to:"#8b5cf6"},{from:"#ec4899",to:"#f472b6"},{from:"#f59e0b",to:"#fbbf24"},{from:"#10b981",to:"#34d399"},{from:"#06b6d4",to:"#22d3ee"},{from:"#f43f5e",to:"#fb7185"}];function mr(e){const t=function(e){return e<60?ti("presence.just_now"):e<3600?ti("presence.min_ago",{count:Math.floor(e/60)}):e<86400?ti("presence.hours_ago",{count:Math.floor(e/3600)}):ti("presence.days_ago",{count:Math.floor(e/86400)})}(e);return`${ti("presence.seen_prefix")} ${t.charAt(0).toLocaleLowerCase()+t.slice(1)}`}function _r(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}class fr extends ci{constructor(){super(...arguments),this._presenceConfig={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{},sleep_sensors:{}},this._activePerson=null,this._notifText="",this._notifSent=!1,this._notifSentTimer=0,this._configLoaded=!1,this._configLoadingInProgress=!1,this._prevActivePerson=null}static getConfigElement(){return document.createElement("glass-presence-card-editor")}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("presence-config-changed",()=>{this._configLoaded=!1,this._loadConfig()}),this._clockInterval=setInterval(()=>{this._activePerson&&this.requestUpdate()},6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,clearInterval(this._clockInterval),this._clockInterval=void 0,this._notifSentTimer&&(clearTimeout(this._notifSentTimer),this._notifSentTimer=0)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new mi(this.hass),this._loadConfig())),e.has("_activePerson")&&this._activePerson&&this._activePerson!==this._prevActivePerson&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shadowRoot?.querySelectorAll(".fold-sep").forEach(e=>e.classList.add("visible")),this.shadowRoot?.querySelector(".ctrl-fold")?.classList.add("open")})),this._prevActivePerson=this._activePerson}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");if(e?.presence_card){const t=e.presence_card;this._presenceConfig={show_header:t.show_header??!0,person_entities:t.person_entities??[],smartphone_sensors:t.smartphone_sensors??{},notify_services:t.notify_services??{},driving_sensors:t.driving_sensors??{},sleep_sensors:t.sleep_sensors??{}}}this._configLoaded=!0,this._configLoadingInProgress=!1,this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}getTrackedEntityIds(){return this._getPersonIds()}_getPersonIds(){return this._presenceConfig.person_entities.length>0?this._presenceConfig.person_entities.filter(e=>this.hass?.states[e]):this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")):[]}_getPersonData(e){const t=this.hass?.states[e];if(!t)return null;const i=t.attributes,a=i.friendly_name||e.split(".")[1],r=i.entity_picture||null,s=this._presenceConfig.smartphone_sensors[e],o=s?this.hass?.states[s]:null,n=o?.attributes??{};let l=o?_r(o.state):null;null==l&&(l=_r(i.battery_level));const c=n.is_charging??i.is_charging,d=!0===c||"true"===c||"on"===c||"1"===c,h=_r(n.heart_rate),p=_r(n.oxygen_saturation),u=_r(n.daily_steps),g=n.geocoded_location||null,m=this._presenceConfig.notify_services[e]||n.notify_service||null,_=this._presenceConfig.driving_sensors[e];let f=!1;_&&this.hass?.states[_]?f="on"===this.hass.states[_].state:"on"!==n.android_auto&&!0!==n.android_auto||(f=!0);const v=this._presenceConfig.sleep_sensors[e],b=!(!v||"on"!==this.hass?.states[v]?.state);return{entityId:e,name:a,state:t.state,entityPicture:r,latitude:_r(i.latitude),longitude:_r(i.longitude),sourceType:i.source_type||"gps",batteryLevel:l,isCharging:d,lastUpdated:t.last_updated,geocodedLocation:g,heartRate:h,spo2:p,steps:u,isDriving:f,isSleeping:b,notifyService:m}}_presenceClass(e){let t=!1,i=!1;for(const a of e)"home"===a.state?t=!0:i=!0;return t&&i?"mixed":t?"home":"away"}_collapseExpanded(){this._activePerson&&(this._activePerson=null)}async _sendNotification(e){if(this.hass&&e.notifyService&&this._notifText.trim()){di(this,"light");try{let t="notify",i=e.notifyService;if(i.includes(".")){const e=i.split(".");t=e[0],i=e.slice(1).join(".")}const a=this.hass.user?.name||"Home Assistant";this._safeCallService(t,i,{title:ti("presence.notif_title",{name:a}),message:this._notifText.trim()}),this._notifText="",this._notifSent=!0,this._notifSentTimer&&clearTimeout(this._notifSentTimer),this._notifSentTimer=window.setTimeout(()=>{this._notifSent=!1,this._activePerson=null},4e3)}catch{}}}render(){if(this._lang,!this.hass)return ie;const e=this._getPersonIds();if(0===e.length)return ie;const t=e.map(e=>this._getPersonData(e)).filter(e=>null!==e);if(0===t.length)return ie;const i=t.filter(e=>"home"===e.state).length,a=this._presenceClass(t),r=0===i?"all-away":i===t.length?"all-home":"mixed";return Z`
      ${this._presenceConfig.show_header?Z`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${1===t.length?ti("presence.title_single"):ti("presence.title")}</span>
              </div>
              <span class="card-count ${r}">${i}/${t.length}</span>
            </div>
          `:ie}
      <div class="glass presence-card" data-presence=${a}>
        <div class="card-tint"></div>
        <div class="card-inner ${this._layoutClass(t.length)}">
          ${this._renderPersons(t)}
        </div>
        ${this._renderFold(t,a)}
      </div>
    `}_layoutClass(e){return 1===e?"solo-layout":2===e?"":"family-layout"}_renderPersons(e){if(1===e.length)return Z`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderSoloChips(e[0])}
      `;if(2===e.length)return Z`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderDistance(e[0],e[1])}
        ${this._renderPerson(e[1],!0,1)}
      `;const t=[];for(let i=0;i<e.length;i+=2)i>0&&t.push(Z`<div class="family-sep"></div>`),i+1<e.length?t.push(Z`
          <div class="family-row">
            ${this._renderPerson(e[i],!1,i)}
            ${this._renderDistance(e[i],e[i+1])}
            ${this._renderPerson(e[i+1],!0,i+1)}
          </div>
        `):t.push(Z`
          <div class="family-row solo-row">
            ${this._renderPerson(e[i],!1,i)}
          </div>
        `);return Z`${t}`}_renderPerson(e,t,i=0){const a=gr[i%gr.length],r=Gt(e.state),s=this._activePerson===e.entityId,o=null!==this._activePerson&&!s;return Z`
      <div class="person-block ${t?"right":""} ${r?"entity-unavailable":""} ${o?"dimmed":""} ${s?"active":""}">
        <button
          class="avatar-wrapper tappable"
          aria-label=${ti("presence.avatar_aria",{name:e.name})}
          aria-expanded=${String(this._activePerson===e.entityId)}
          @click=${t=>{t.stopPropagation();const i=this._activePerson===e.entityId?null:e.entityId;i!==this._activePerson&&(this._notifText=""),this._activePerson=i}}
        >
          ${r?Z`<div class="avatar avatar-fallback avatar-unavailable"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></div>`:Z`
                ${e.entityPicture?Z`<img class="avatar ${e.isSleeping?"sleeping":""}" src=${e.entityPicture} alt=${e.name} />`:Z`
                      <div
                        class="avatar avatar-fallback ${e.isSleeping?"sleeping":""}"
                        style="background: linear-gradient(135deg, ${a.from}, ${a.to})"
                      >
                        <ha-icon .icon=${"mdi:account"}></ha-icon>
                      </div>
                    `}
                <div class="avatar-status ${n=e.state,"home"===n?"home":"not_home"===n?"away":"zone"}"></div>
                ${e.isSleeping?Z`
                  <span class="sleep-badge" aria-label=${ti("presence.sleeping_aria",{name:e.name})}>zzz</span>
                `:ie}
              `}
        </button>
        <div class="person-info">
          <div class="person-name">${e.name}</div>
          <div class="person-sub">
            <div class="person-line">
              <span class="source-icon"><ha-icon .icon=${function(e){switch(e){case"gps":default:return"mdi:crosshairs-gps";case"router":return"mdi:router-wireless";case"bluetooth":case"bluetooth_le":return"mdi:bluetooth"}}(e.sourceType)}></ha-icon></span>
              <span class="person-location">${function(e){return"home"===e?ti("presence.home"):"not_home"===e?ti("presence.away"):e.charAt(0).toUpperCase()+e.slice(1)}(e.state)}</span>
              ${e.isDriving?Z`<span class="driving-icon"><ha-icon .icon=${"mdi:car"}></ha-icon></span>`:ie}
            </div>
          </div>
        </div>
      </div>
    `;var n}_renderDistance(e,t){if(null==e.latitude||null==e.longitude||null==t.latitude||null==t.longitude)return ie;const i=function(e,t,i,a){const r=(i-e)*Math.PI/180,s=(a-t)*Math.PI/180,o=Math.sin(r/2)**2+Math.cos(e*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(s/2)**2;return 12742*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}(e.latitude,e.longitude,t.latitude,t.longitude),a=i<.05,r=String(i<1?Math.round(1e3*i):Math.round(i)),s=ti(i<1?"presence.distance_m":"presence.distance_km"),o=null!==this._activePerson;return Z`
      <div class="distance-center ${a?"near":""} ${o?"dimmed":""}">
        <div class="distance-line"></div>
        <div class="distance-info">
          <div class="distance-value">${r}</div>
          <div class="distance-unit">${s}</div>
        </div>
        <div class="heart-pulse" aria-hidden="true"><ha-icon .icon=${"mdi:heart"}></ha-icon></div>
        <div class="distance-line right"></div>
      </div>
    `}_renderSoloChips(e){return null==e.heartRate&&null==e.spo2&&null==e.steps?ie:Z`
      <div class="solo-health-chips">
        ${null!=e.heartRate?Z`<glass-pill tone="alert"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon><span>${e.heartRate}</span></glass-pill>`:ie}
        ${null!=e.spo2?Z`<glass-pill tone="info"><ha-icon .icon=${"mdi:water-percent"}></ha-icon><span>${e.spo2}%</span></glass-pill>`:ie}
        ${null!=e.steps?Z`<glass-pill tone="success"><ha-icon .icon=${"mdi:walk"}></ha-icon><span>${e.steps.toLocaleString()}</span></glass-pill>`:ie}
      </div>
    `}_renderFold(e,t){if(!this._activePerson)return ie;const i=e.find(e=>e.entityId===this._activePerson);if(!i)return ie;const a=1===e.length,r=!a&&(null!=i.heartRate||null!=i.spo2||null!=i.steps),s=!a&&!!i.notifyService;return Z`
      <div class="fold-sep ${t}"></div>
      <div class="ctrl-fold">
        <div class="ctrl-fold-inner">
          <div class="fold-content">
            <div class="loc-row">
              ${(()=>{const e=(t=i.lastUpdated,Math.floor((Date.now()-new Date(t).getTime())/1e3));var t;return Z`
                  <span class="loc-address">
                    <ha-icon .icon=${"mdi:map-marker-radius"}></ha-icon>
                    ${i.geocodedLocation?Z`<span class="loc-address-text">${i.geocodedLocation}</span>`:ie}
                    <span class="loc-address-time lastseen-${function(e){return e<3600?"fresh":e<86400?"stale":"old"}(e)}"
                          title=${ti("presence.last_seen_label")}>
                      ${mr(e)}
                    </span>
                  </span>
                `})()}
              ${null!=i.batteryLevel?Z`
                <span class="meta-chip battery-${o=i.batteryLevel,o>50?"high":o>20?"medium":"low"} ${i.isCharging?"charging":""}">
                  <ha-icon .icon=${function(e,t=!1){return t?e>80?"mdi:battery-charging":e>60?"mdi:battery-charging-70":e>40?"mdi:battery-charging-50":e>20?"mdi:battery-charging-30":"mdi:battery-charging-10":e>80?"mdi:battery":e>60?"mdi:battery-70":e>40?"mdi:battery-50":e>20?"mdi:battery-30":"mdi:battery-10"}(i.batteryLevel,i.isCharging)}></ha-icon>
                  <span>${i.batteryLevel}%</span>
                </span>
              `:ie}
            </div>
            ${r?Z`
                  <div class="health-pills">
                    ${null!=i.heartRate?Z`
                          <div class="health-pill bpm">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.heartRate}</span>
                              <span class="health-pill-label">${ti("presence.bpm")}</span>
                            </div>
                          </div>
                        `:ie}
                    ${null!=i.spo2?Z`
                          <div class="health-pill spo2">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.spo2}%</span>
                              <span class="health-pill-label">${ti("presence.spo2")}</span>
                            </div>
                          </div>
                        `:ie}
                    ${null!=i.steps?Z`
                          <div class="health-pill steps">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:walk"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.steps.toLocaleString()}</span>
                              <span class="health-pill-label">${ti("presence.steps")}</span>
                            </div>
                          </div>
                        `:ie}
                  </div>
                `:ie}
            ${s?Z`
                  <div class="notif-zone">
                    ${this._notifSent?Z`
                      <div class="notif-toast">
                        <ha-icon .icon=${"mdi:check-circle"}></ha-icon>
                        ${ti("presence.notif_sent")}
                      </div>
                    `:Z`
                      <div class="notif-row">
                        <glass-form-input
                          class="notif-input"
                          placeholder=${ti("presence.notify_placeholder",{name:i.name})}
                          .value=${this._notifText}
                          @glass-input=${e=>{this._notifText=e.detail.value}}
                          @focus=${e=>{const t=e.target;t.dataset.scrolled||(t.dataset.scrolled="1",this._scrollToTop())}}
                        ></glass-form-input>
                        <glass-icon-button
                          active
                          active-color="success"
                          .icon=${"mdi:send"}
                          aria-label=${ti("presence.send_aria")}
                          @click=${e=>{e.stopPropagation(),this._sendNotification(i)}}
                        ></glass-icon-button>
                      </div>
                    `}
                  </div>
                `:ie}
          </div>
        </div>
      </div>
    `;var o}static{this.styles=[Lt,Pt,Mt,jt,Ot,Rt,Kt,Xt,m`
      :host {
        width: 100%;
        max-width: 31.25rem;
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
      .presence-card { padding: 0.4375rem 0.875rem; width: 100%; box-sizing: border-box; position: relative; overflow: hidden; }

      /* Atmospheric halo at the card bottom — color-shifted per presence */
      .presence-card::after {
        content: ''; position: absolute; left: 0; right: 0; bottom: 0;
        height: 45%; pointer-events: none; z-index: 0;
        background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-accent), 0.08), transparent 70%);
        transition: opacity var(--t-slow), background var(--t-slow);
      }
      .presence-card[data-presence="home"]::after {
        background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-success), 0.1), transparent 70%);
      }
      .presence-card[data-presence="away"]::after {
        background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-alert), 0.08), transparent 70%);
      }
      .presence-card[data-presence="mixed"]::after {
        background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-warning), 0.08), transparent 70%);
      }
      @media (prefers-reduced-motion: reduce) {
        .presence-card::after { transition: none; }
      }

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
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.25), transparent);
      }
      .family-row.solo-row { justify-content: center; }
      .family-row.solo-row .person-block { flex: 0 1 auto; }

      /* ── Person block ── */
      .person-block {
        display: flex; align-items: center; gap: 0.625rem;
        flex: 1; min-width: 0;
        transition: opacity var(--t-med);
      }
      .person-block.right { flex-direction: row-reverse; text-align: right; }
      /* When another person is active, fade out non-active blocks so the
         selected one stands out without needing to repeat the name in the fold */
      .person-block.dimmed { opacity: 0.32; }
      .distance-center.dimmed { opacity: 0.32; transition: opacity var(--t-med); }
      @media (prefers-reduced-motion: reduce) {
        .person-block, .distance-center { transition: none; }
      }

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
        transition: border-color var(--t-fast), box-shadow var(--t-fast);
        object-fit: cover;
      }
      .avatar-fallback { border: none; }
      img.avatar { display: block; }
      .avatar-fallback ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: var(--icon-lg); color: rgba(var(--rgb-white),0.85);
      }

      /* Active state: when this person's fold is open, ring + glow the avatar */
      @media (prefers-reduced-motion: reduce) {
        .avatar { transition: none; }
      }


      .avatar-status {
        position: absolute; bottom: -0.0625rem; right: -0.0625rem;
        width: 0.75rem; height: 0.75rem; border-radius: 50%;
        border: 2px solid rgba(15,25,35,0.9);
        transition: background var(--t-med), box-shadow var(--t-med);
      }
      .avatar-status.home { background: var(--c-success); box-shadow: 0 0 6px rgba(var(--rgb-success),0.5); }
      .avatar-status.away { background: var(--c-alert); box-shadow: 0 0 6px rgba(var(--rgb-alert),0.5); }

      /* Sleeping: dim + slight transparency, like a "resting" state */
      .avatar.sleeping {
        filter: saturate(0.45) brightness(0.78);
        opacity: 0.7;
      }
      .sleep-badge {
        position: absolute; top: -0.1875rem; left: -0.375rem;
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 1.25rem; height: 0.9375rem;
        padding: 0 0.3125rem;
        border-radius: var(--radius-full);
        background: var(--s4); border: 1px solid var(--b1);
        font-family: inherit; font-weight: 700;
        font-size: 0.5625rem; letter-spacing: 0.08em; line-height: 1;
        color: var(--t2);
        transform-origin: center;
        animation: sleep-breathing 3.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
      }
      .person-block.right .sleep-badge { left: auto; right: -0.375rem; }
      @keyframes sleep-breathing {
        0%, 100% { opacity: 0.65; transform: scale(0.94); }
        50%      { opacity: 1;    transform: scale(1.06); }
      }
      @media (prefers-reduced-motion: reduce) {
        .sleep-badge { animation: none; }
      }
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
        white-space: nowrap; overflow: hidden; min-width: 0; text-overflow: ellipsis;
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
      @media (prefers-reduced-motion: reduce) {
        .heart-pulse { animation: none; }
      }

      /* ── Solo health chips (rendered as <glass-pill>) ── */
      .solo-health-chips { display: flex; align-items: center; gap: 0.3125rem; flex-shrink: 0; }
      .solo-health-chips glass-pill ha-icon {
        --mdc-icon-size: 0.75rem;
        display: flex; align-items: center; justify-content: center;
      }

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

      .fold-content { display: flex; flex-direction: column; gap: 0.5rem; padding-top: 0.5rem; }

      /* ── Health zone ── */
      /* Address + meta row — boxed, hierarchy via typography and state colors */
      .loc-row {
        display: flex; flex-wrap: wrap; align-items: center;
        column-gap: 0.625rem; row-gap: 0.3125rem;
        padding: 0.4375rem 0.625rem;
        border-radius: var(--radius-sm);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .loc-address {
        flex: 1 1 auto; min-width: 0;
        display: inline-flex; align-items: center; gap: 0.375rem;
        font-size: var(--fz-sm); font-weight: 600; color: var(--t1);
      }
      .loc-address ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.875rem;
        color: rgb(var(--rgb-info));
        flex-shrink: 0;
      }
      .loc-address-text {
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        min-width: 0; flex: 0 1 auto;
      }
      .loc-address-time {
        font-size: var(--fz-xs); font-weight: 500;
        color: var(--t4); flex-shrink: 0;
        font-variant-numeric: tabular-nums;
      }
      .loc-address-text + .loc-address-time::before {
        content: '·'; margin-right: 0.3125rem; opacity: 0.5;
      }
      .loc-address-time.lastseen-stale { color: var(--c-warning); }
      .loc-address-time.lastseen-old { color: var(--c-alert); }
      .meta-chip {
        display: inline-flex; align-items: center; gap: 0.25rem;
        font-size: var(--fz-xs); font-weight: 600;
        color: var(--t4); font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .meta-chip ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 0.8125rem;
        color: var(--t4);
      }
      /* Battery state colours */
      .meta-chip.battery-high ha-icon { color: var(--c-success); }
      .meta-chip.battery-medium { color: var(--c-warning); }
      .meta-chip.battery-medium ha-icon { color: var(--c-warning); }
      .meta-chip.battery-low { color: var(--c-alert); }
      .meta-chip.battery-low ha-icon { color: var(--c-alert); }
      /* Charging: subtle pulse on the icon to signal active charge */
      .meta-chip.charging ha-icon { animation: charge-pulse 1.8s ease-in-out infinite; }
      @keyframes charge-pulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .meta-chip.charging ha-icon { animation: none; }
      }
      /* Last-seen freshness */
      .meta-chip.lastseen-fresh ha-icon { color: rgba(var(--rgb-success), 0.65); }
      .meta-chip.lastseen-stale { color: var(--c-warning); }
      .meta-chip.lastseen-stale ha-icon { color: var(--c-warning); }
      .meta-chip.lastseen-old { color: var(--c-alert); }
      .meta-chip.lastseen-old ha-icon { color: var(--c-alert); }

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
      .notif-zone { display: flex; gap: 0.5rem; flex-direction: column; }
      .notif-row { display: flex; gap: 0.5rem; align-items: center; }
      .notif-row .notif-input { flex: 1; }

      .notif-toast {
        display: flex; align-items: center; justify-content: center; gap: 0.375rem;
        padding: 0.5rem; font-size: var(--fz-base); font-weight: 600;
        color: var(--c-success);
        animation: toast-in 0.3s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
      }
      .notif-toast ha-icon {
        --mdc-icon-size: 1rem; display: flex; align-items: center; justify-content: center;
      }
      @keyframes toast-in {
        from { opacity: 0; transform: scale(0.9); }
        to   { opacity: 1; transform: scale(1); }
      }

      @media (pointer: coarse) {
        .avatar-wrapper:active { animation: bounce 0.3s ease; }
      }
    `]}}ur([Te()],fr.prototype,"_presenceConfig"),ur([Te()],fr.prototype,"_activePerson"),ur([Te()],fr.prototype,"_notifText"),ur([Te()],fr.prototype,"_notifSent");try{customElements.define("glass-presence-card",fr)}catch{}oi("glass-camera-carousel-card-editor");var vr=Object.defineProperty,br=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&vr(t,i,s),s};const yr=1,wr="mdi:cctv",xr="mdi:webcam",kr="mdi:doorbell-video",$r={person:"mdi:human",vehicle:"mdi:car",pet:"mdi:dog",animal:"mdi:paw",package:"mdi:package-variant",face:"mdi:face-recognition",baby_crying:"mdi:baby-face-outline",bicycle:"mdi:bicycle"},Cr={motion:/_(motion|mouvement)$/,record:/_(record|enregistrer)$/,siren:/^siren\./,floodlight:/_(floodlight|projecteur)$/,auto_tracking:/_(auto_tracking|suivi_automatique)$/},Sr=[[/_person(ne)?$/,"person"],[/_vehicu?le$/,"vehicle"],[/_pet$|_animal_domestique$/,"pet"],[/_animal$/,"animal"],[/_face$|_visage$/,"face"],[/_package$|_colis$/,"package"],[/_baby_crying$|_pleur_bebe$/,"baby_crying"],[/_bicycl?e$|_velo$/,"bicycle"]],Tr=new Map;function Ir(e,t,i){const a=i[e];if(!a?.device_id)return{motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};const r=a.device_id;let s=r;for(const c of Object.keys(i))i[c].device_id===r&&c.startsWith("binary_sensor.")&&t[c]&&(s+=`:${c}=${t[c].state}`);const o=Tr.get(e);if(o&&o.key===s)return o.result;const n=[];for(const[c,d]of Object.entries(i))d.device_id===r&&n.push(c);const l={motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};for(const c of n){const e=t[c];if(e&&(c.startsWith("binary_sensor.")&&Cr.motion.test(c)&&(l.motionSensorId=c),c.startsWith("switch.")&&Cr.record.test(c)&&(l.recordSwitchId=c),Cr.siren.test(c)&&(l.sirenId=c),c.startsWith("light.")&&Cr.floodlight.test(c)&&(l.floodlightId=c),c.startsWith("switch.")&&Cr.auto_tracking.test(c)&&(l.autoTrackId=c),c.startsWith("binary_sensor.")&&"on"===e.state))for(const[t,i]of Sr)t.test(c)&&!l.aiDetected.includes(i)&&l.aiDetected.push(i)}return Tr.set(e,{key:s,result:l}),l}function zr(e){const t=e.attributes?.icon;if(t)return t;const i=e.entity_id;return i.includes("doorbell")?kr:i.includes("indoor")||i.includes("salon")||i.includes("chambre")?xr:wr}class Ar extends ci{constructor(){super(...arguments),this._carouselIndex=0,this._liveIds=new Set,this._foldOpen=!1,this._camConfig=null,this._roomConfig=null,this._configLoaded=!1,this._configLoading=!1,this._roomConfigLoading=!1,this._loadVersion=0,this._touchStartX=0,this._touchDelta=0,this._isSwiping=!1,this._trackEl=null,this._cachedCameraIds=[],this._cachedCamerasKey="",this._onPointerDown=e=>{if(e.target.closest("glass-icon-button, .carousel-nav"))return;this._touchStartX=e.clientX,this._touchDelta=0,this._isSwiping=!0;e.currentTarget.setPointerCapture(e.pointerId),this._trackEl=this.shadowRoot?.querySelector(".carousel-track"),this._trackEl&&(this._trackEl.style.transition="none")},this._onPointerMove=e=>{if(!this._isSwiping)return;const t=this._trackEl??this.shadowRoot?.querySelector(".carousel-track");if(!t)return;this._trackEl=t,this._touchDelta=e.clientX-this._touchStartX;const i=e.currentTarget.offsetWidth,a=100*this._carouselIndex,r=this._touchDelta/i*100;this._trackEl.style.transform=`translateX(${-a+r}%)`},this._onPointerUp=e=>{if(!this._isSwiping||!this._trackEl)return;this._isSwiping=!1,this._trackEl.style.transition="";const t=.2*e.currentTarget.offsetWidth;this._touchDelta<-t?this._goTo(this._carouselIndex+1):this._touchDelta>t?this._goTo(this._carouselIndex-1):this._goTo(this._carouselIndex),this._trackEl=null},this._onPointerCancel=()=>{this._isSwiping&&this._trackEl&&(this._isSwiping=!1,this._trackEl.style.transition="",this._goTo(this._carouselIndex),this._trackEl=null)}}static getConfigElement(){return document.createElement("glass-camera-carousel-card-editor")}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("camera-carousel-config-changed",()=>{this._configLoaded=!1,this._cachedCamerasKey="",this._loadConfig()}),this._listen("room-config-changed",e=>{this.areaId&&e.areaId===this.areaId&&(this._roomConfig=null,this._cachedCamerasKey="",this._loadRoomConfig())}),this._listen("dashboard-config-changed",()=>this.requestUpdate()),this._timestampTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._clearCycleTimer(),this._clearTimestampTimer(),Tr.clear()}getTrackedEntityIds(){if(!this.hass)return[];const e=this.hass;return this._getCameraIds().flatMap(t=>{const i=Ir(t,e.states,e.entities);return[t,i.motionSensorId,i.recordSwitchId,i.sirenId,i.floodlightId,i.autoTrackId].filter(Boolean)})}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection===this.hass.connection||(this._backend=new mi(this.hass))),this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._carouselIndex=0,this._cachedCamerasKey="",this._configLoaded=!1,this._roomConfig=null,this._liveIds=new Set),this._configLoaded||this._configLoading||this._loadConfig(),!this.areaId||this._roomConfig||this._roomConfigLoading||this._loadRoomConfig()}async _loadConfig(){if(!this._backend||this._configLoading)return;this._configLoading=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;this._camConfig=t.camera_carousel||{show_header:!0,entity_order:[],hidden_entities:[],auto_cycle:!1,cycle_interval:10},this._configLoaded=!0,this._setupCycleTimer(),this.requestUpdate()}catch{}finally{this._configLoading=!1}}async _loadRoomConfig(){if(!this._backend||!this.areaId||this._roomConfigLoading)return;this._roomConfigLoading=!0;const e=this.areaId;try{const t=await this._backend.send("get_room",{area_id:e});if(this.areaId!==e)return;this._roomConfig={hidden_entities:t?.hidden_entities??[],entity_order:t?.entity_order??[]},this._cachedCamerasKey="",this.requestUpdate()}catch{}finally{this._roomConfigLoading=!1}}_getCameraIds(){if(!this.hass)return[];let e;e=this.areaId?pi(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("camera.")).map(e=>e.entity_id):Object.keys(this.hass.states).filter(e=>e.startsWith("camera."));const t=new Set(this._camConfig?.hidden_entities??[]);if(this.areaId&&this._roomConfig)for(const r of this._roomConfig.hidden_entities)t.add(r);t.size&&(e=e.filter(e=>!t.has(e)));const i=e.length+":"+e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.last_changed}`:e}).join(",");if(i===this._cachedCamerasKey)return this._cachedCameraIds;const a=this.areaId?this._roomConfig?.entity_order??[]:[];if(this.areaId&&a.length){const t=a.filter(t=>e.includes(t)),i=e.filter(e=>!t.includes(e));e=[...t,...i]}else{const t=this._camConfig?.entity_order??[];if(t.length){const i=t.filter(t=>e.includes(t)),a=e.filter(e=>!i.includes(e));if(!this.areaId){const e=this.hass.states,t=this.hass.entities;a.sort((i,a)=>this._latestAlertTimestamp(a,e,t)-this._latestAlertTimestamp(i,e,t))}e=[...i,...a]}else if(!this.areaId){const t=this.hass.states,i=this.hass.entities;e.sort((e,a)=>this._latestAlertTimestamp(a,t,i)-this._latestAlertTimestamp(e,t,i))}}return this._cachedCamerasKey=i,this._cachedCameraIds=e,this._carouselIndex>=e.length&&(this._carouselIndex=Math.max(0,e.length-1)),this._cachedCameraIds}_latestAlertTimestamp(e,t,i){const a=i[e];if(!a?.device_id)return 0;const r=a.device_id;let s=0;for(const[o,n]of Object.entries(i)){if(n.device_id!==r||!o.startsWith("binary_sensor."))continue;if(!Sr.some(([e])=>e.test(o)))continue;const e=t[o];if(!e)continue;const i=new Date(e.last_changed).getTime();i>s&&(s=i)}return s}_getCameraInfo(e){if(!this.hass)return null;const t=this.hass.states[e];if(!t)return null;const i=t.attributes?.supported_features??0,a="unavailable"!==t.state&&!1!==t.attributes?.is_on,r=Ir(e,this.hass.states,this.hass.entities);return{entityId:e,entity:t,name:t.attributes?.friendly_name||e.split(".")[1],state:t.state,isOn:a,features:i,entityPicture:t.attributes?.entity_picture??null,motionSensorId:r.motionSensorId,motionDetectionSupported:void 0!==t.attributes?.motion_detection,motionDetectionEnabled:!0===t.attributes?.motion_detection,hasMotion:!!r.motionSensorId&&"on"===this.hass.states[r.motionSensorId]?.state,recordSwitchId:r.recordSwitchId,isRecording:"recording"===t.state||!!r.recordSwitchId&&"on"===this.hass.states[r.recordSwitchId]?.state,sirenId:r.sirenId,floodlightId:r.floodlightId,autoTrackId:r.autoTrackId,aiDetected:r.aiDetected,icon:zr(t)}}_setupCycleTimer(){if(this._clearCycleTimer(),this._camConfig?.auto_cycle&&this._getCameraIds().length>1){const e=1e3*(this._camConfig.cycle_interval||10);this._cycleTimer=setInterval(()=>{if(this._isSwiping)return;const e=this._getCameraIds();e.length>1&&(this._carouselIndex=(this._carouselIndex+1)%e.length,this.requestUpdate())},e)}}_clearCycleTimer(){this._cycleTimer&&(clearInterval(this._cycleTimer),this._cycleTimer=void 0)}_clearTimestampTimer(){this._timestampTimer&&(clearInterval(this._timestampTimer),this._timestampTimer=void 0)}_goTo(e){const t=this._getCameraIds();t.length&&(this._carouselIndex=(e%t.length+t.length)%t.length,this._foldOpen=!1,this._setupCycleTimer(),this.requestUpdate())}_prev(){this._goTo(this._carouselIndex-1)}_next(){this._goTo(this._carouselIndex+1)}_togglePower(e){if(!this.hass)return;const t=e.isOn?"turn_off":"turn_on";this._safeCallService("camera",t,{entity_id:e.entityId})}_snapshot(e){if(!this.hass)return;const t=new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0});this.dispatchEvent(t)}_toggleRecord(e){if(!this.hass||!e.recordSwitchId)return;const t="on"===this.hass.states[e.recordSwitchId]?.state;this._safeCallService("switch",t?"turn_off":"turn_on",{entity_id:e.recordSwitchId})}_toggleMotion(e){if(!this.hass)return;const t=e.motionDetectionEnabled?"disable_motion_detection":"enable_motion_detection";this._safeCallService("camera",t,{entity_id:e.entityId})}_toggleSiren(e){if(!this.hass||!e.sirenId)return;const t="on"===this.hass.states[e.sirenId]?.state;this._safeCallService("siren",t?"turn_off":"turn_on",{entity_id:e.sirenId})}_toggleFloodlight(e){if(!this.hass||!e.floodlightId)return;const t="on"===this.hass.states[e.floodlightId]?.state;this._safeCallService("light",t?"turn_off":"turn_on",{entity_id:e.floodlightId})}_toggleAutoTrack(e){if(!this.hass||!e.autoTrackId)return;const t="on"===this.hass.states[e.autoTrackId]?.state;this._safeCallService("switch",t?"turn_off":"turn_on",{entity_id:e.autoTrackId})}_startStream(e){const t=new Set(this._liveIds);t.add(e),this._liveIds=t}render(){if(this._lang,!this.hass)return ie;const e=this._getCameraIds();if(!e.length)return ie;const t=!1!==this._camConfig?.show_header,i=this._getCameraInfo(e[this._carouselIndex]),a=this._bindGesture({onTap:()=>{const t=e[this._carouselIndex];t&&!this._liveIds.has(t)&&this._startStream(t)},onLongPress:()=>{this._isSwiping=!1,this._trackEl=null,this._foldOpen=!this._foldOpen},exclude:"glass-icon-button"});return Z`
      ${t?Z`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${ti("camera.title")}</span>
          </div>
        </div>
      `:ie}
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
          ${e.length>1?Z`
            <glass-icon-button
              class="carousel-nav prev"
              size="md"
              .icon=${"mdi:chevron-left"}
              aria-label="${ti("camera.prev_aria")}"
              @click=${this._prev}
            ></glass-icon-button>
            <glass-icon-button
              class="carousel-nav next"
              size="md"
              .icon=${"mdi:chevron-right"}
              aria-label="${ti("camera.next_aria")}"
              @click=${this._next}
            ></glass-icon-button>
          `:ie}
          ${e.length>1?Z`
            <div class="carousel-dots">
              ${e.map((e,t)=>this._renderDot(e,t))}
            </div>
          `:ie}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="fold-sep-top"></div>
            <div class="fold-panel">
              ${i?this._renderInfoBar(i):ie}
              ${i?this._renderActions(i):ie}
            </div>
          </div>
        </div>
      </div>
    `}_tintStyle(e){if(!e||!e.isOn||"idle"===e.state)return"opacity:0";return`background:radial-gradient(ellipse at 50% 50%,${e.aiDetected.length>0?"var(--c-warning)":"var(--cam-color)"},transparent 70%);opacity:0.12`}_renderSlide(e,t){const i=this._getCameraInfo(e);if(!i)return Z`<div class="carousel-slide"><div class="carousel-slide-inner off-feed"></div></div>`;const a=this._liveIds.has(e)||"streaming"===i.state||"recording"===i.state,r=i.isOn&&a&&t,s=i.isOn?a?"active-feed":"idle-feed":"off-feed";return Z`
      <div class="carousel-slide">
        <div class="carousel-slide-inner ${s}">
          ${r&&this.hass?Z`
            <ha-camera-stream
              .hass=${this.hass}
              .stateObj=${i.entity}
              .controls=${!1}
              .muted=${!0}
              class="cam-stream"
            ></ha-camera-stream>
          `:i.entityPicture&&i.isOn?Z`
            <img class="cam-thumbnail" src="${i.entityPicture}" alt="${i.name}" />
          `:ie}
          ${i.isOn?Z`
            <div class="stream-overlay-top">
              <div class="stream-cam-name">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:12px"></ha-icon>
                <span>${i.name}</span>
                ${a&&i.isRecording?Z`
                  <span class="rec-indicator">
                    <span class="rec-circle"></span> REC
                  </span>
                `:ie}
              </div>
              <div class="stream-time">${(new Date).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}</div>
            </div>
            <div class="stream-overlay-bottom">
              ${i.aiDetected.length>0?Z`
                <div class="stream-ai-tags">
                  ${i.aiDetected.map(e=>Z`
                    <div class="stream-ai-tag">
                      <ha-icon .icon=${$r[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                      ${ti(`camera.ai_${e}`)}
                    </div>
                  `)}
                </div>
              `:Z`<div></div>`}
            </div>
            ${a?ie:Z`
              <button class="stream-placeholder" @click=${t=>{t.stopPropagation(),this._startStream(e)}}
                aria-label="${ti("camera.tap_to_stream")}">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
                <span>${ti("camera.tap_to_stream")}</span>
              </button>
            `}
          `:Z`
            <div class="stream-placeholder">
              <ha-icon .icon=${"mdi:camera-off"} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
              <span>${ti("camera.camera_off")}</span>
            </div>
          `}
        </div>
      </div>
    `}_renderDot(e,t){const i=this._getCameraInfo(e);let a="carousel-dot-btn tappable";return t===this._carouselIndex&&(a+=" active"),i?.aiDetected.length&&(a+=" motion-dot"),Z`
      <button class="${a}"
        aria-label="${ti("camera.dot_aria",{name:i?.name||""})}"
        @click=${()=>this._goTo(t)}
      ></button>
    `}_renderInfoBar(e){const t=e.isOn&&"idle"!==e.state;return Z`
      <div class="carousel-info">
        <div class="carousel-cam-icon ${t?"on":""}">
          <ha-icon .icon=${e.icon} style="--mdc-icon-size:16px"></ha-icon>
        </div>
        <div class="carousel-info-text">
          <div class="carousel-cam-name">${e.name}</div>
          <div class="carousel-cam-sub">
            <span class="carousel-state ${t?"live":""}">${function(e,t){if(!t)return ti("camera.off");switch(e){case"idle":return ti("camera.idle");case"streaming":return ti("camera.streaming");case"recording":return ti("camera.recording");default:return e}}(e.state,e.isOn)}</span>
            ${e.aiDetected.length>0&&e.isOn?Z`
              <div class="carousel-ai-mini">
                ${e.aiDetected.map(e=>Z`
                  <div class="ai-badge active">
                    <ha-icon .icon=${$r[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                  </div>
                `)}
              </div>
            `:ie}
          </div>
        </div>
      </div>
    `}_renderActions(e){if(!e.isOn)return Z`
        <div class="carousel-actions">
          <glass-button
            size="sm"
            variant="ghost"
            .icon=${"mdi:power"}
            aria-label="${ti("camera.power_on")}"
            @click=${()=>this._togglePower(e)}
          >${ti("camera.power_on")}</glass-button>
        </div>
      `;const t=0!==(e.features&yr),i=!!e.sirenId&&"on"===this.hass?.states[e.sirenId]?.state,a=!!e.floodlightId&&"on"===this.hass?.states[e.floodlightId]?.state,r=!!e.autoTrackId&&"on"===this.hass?.states[e.autoTrackId]?.state;return Z`
      <div class="carousel-actions">
        ${t?Z`
          <glass-icon-button
            size="md"
            .icon=${"mdi:power"}
            ?active=${!0}
            active-color="alert"
            aria-label="${ti("camera.power_off")}"
            @click=${()=>this._togglePower(e)}
          ></glass-icon-button>
        `:ie}
        <glass-button
          size="sm"
          variant="ghost"
          .icon=${"mdi:camera"}
          aria-label="${ti("camera.snapshot")}"
          @click=${()=>this._snapshot(e)}
        >${ti("camera.snapshot")}</glass-button>
        ${e.recordSwitchId?Z`
          <glass-button
            size="sm"
            variant="ghost"
            .icon=${e.isRecording?"mdi:record-circle":"mdi:record"}
            class=${e.isRecording?"rec-active":""}
            aria-label="${e.isRecording?ti("camera.record_stop"):ti("camera.record_start")}"
            @click=${()=>this._toggleRecord(e)}
          >${e.isRecording?ti("camera.record_stop"):ti("camera.record_start")}</glass-button>
        `:ie}
        ${e.motionDetectionSupported?Z`
          <glass-icon-button
            size="md"
            .icon=${e.motionDetectionEnabled?"mdi:motion-sensor":"mdi:motion-sensor-off"}
            ?active=${e.motionDetectionEnabled}
            active-color="alert"
            aria-label="${e.motionDetectionEnabled?ti("camera.motion_on_aria"):ti("camera.motion_off_aria")}"
            @click=${()=>this._toggleMotion(e)}
          ></glass-icon-button>
        `:ie}
        ${e.sirenId?Z`
          <glass-icon-button
            size="md"
            .icon=${"mdi:bullhorn"}
            ?active=${i}
            active-color="alert"
            aria-label="${ti("camera.siren_aria")}"
            @click=${()=>this._toggleSiren(e)}
          ></glass-icon-button>
        `:ie}
        ${e.floodlightId?Z`
          <glass-icon-button
            size="md"
            .icon=${a?"mdi:flashlight":"mdi:flashlight-off"}
            ?active=${a}
            active-color="warning"
            aria-label="${ti("camera.floodlight_aria")}"
            @click=${()=>this._toggleFloodlight(e)}
          ></glass-icon-button>
        `:ie}
        ${e.autoTrackId?Z`
          <glass-icon-button
            size="md"
            .icon=${"mdi:target-account"}
            ?active=${r}
            active-color="alert"
            aria-label="${ti("camera.auto_track_aria")}"
            @click=${()=>this._toggleAutoTrack(e)}
          ></glass-icon-button>
        `:ie}
      </div>
    `}static{this.styles=[Lt,Pt,Mt,jt,Ot,Rt,Xt,m`
      :host {
        width: 100%;
        max-width: 31.25rem;
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

      /* — Nav arrows (positioning overlay for <glass-icon-button>) — */
      .carousel-nav {
        position: absolute; top: 50%; transform: translateY(-50%);
        z-index: 5; opacity: 0.7;
        transition: opacity 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .carousel-nav.prev { left: 0.5rem; }
      .carousel-nav.next { right: 0.5rem; }
      @media (hover: hover) and (pointer: fine) {
        .carousel-nav:hover { opacity: 1; }
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
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
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
      .carousel-actions { display: flex; gap: 0.375rem; flex-wrap: wrap; align-items: center; }
      /* Recording-active <glass-button>: tint the label red to match the alert active state. */
      glass-button.rec-active { color: var(--c-alert); }
    `]}}br([Se()],Ar.prototype,"areaId"),br([Te()],Ar.prototype,"_carouselIndex"),br([Te()],Ar.prototype,"_liveIds"),br([Te()],Ar.prototype,"_foldOpen");try{customElements.define("glass-camera-carousel-card",Ar)}catch{}var Er=Object.defineProperty,Lr=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Er(t,i,s),s};const Pr={perso:{color:"var(--c-accent)",label:"Personnel"},travail:{color:"var(--c-info)",label:"Travail"},famille:{color:"#f472b6",label:"Famille"},taches:{color:"var(--c-warning)",label:"Tâches"},anniversaires:{color:"var(--c-success)",label:"Anniversaires"}},Mr=["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],Or=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];function Rr(e){return 0===(e.dayOffset??0)&&!(!e.now&&!e.allday&&e.time&&!function(e){const t=e.split(" - "),i=t[0],a=t.length>1?t[1]:t[0],[r,s]=a.split(":").map(e=>parseInt(e,10)),[o,n]=i.split(":").map(e=>parseInt(e,10)),l=new Date,c=new Date;return c.setHours(r,s,0,0),(r<o||r===o&&s<n)&&c.setDate(c.getDate()+1),c>l}(e.time))}class Dr extends ci{constructor(){super(...arguments),this.events=[],this.showHeader=!0,this._open=!1,this._selectedDayOffset=0,this._tickerIdx=0,this._tickerLeavingIdx=null,this._hiddenEntities=[],this._fetchedEvents=[],this._configLoaded=!1,this._configLoadInFlight=!1,this._fetchInFlight=!1,this._lastEventsKey="",this._lastTodayKey="",this._foldId=`cal-fold-${Math.random().toString(36).slice(2,9)}`}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._startTicker(),this._listen("calendar-config-changed",()=>{this._configLoaded=!1,this._loadConfigAndFetch()})}disconnectedCallback(){super.disconnectedCallback(),this._stopTicker(),this._stopRefreshTimer(),this._stopMidnightWatcher(),this._backend=void 0,this._configLoaded=!1}willUpdate(e){super.willUpdate(e),e.has("hass")&&this.hass&&!this.configPreview&&(this._configLoaded||this._loadConfigAndFetch())}async _loadConfigAndFetch(){if(this.hass&&!this._configLoadInFlight){this._configLoadInFlight=!0;try{this._backend||(this._backend=new mi(this.hass));try{const e=await this._backend.send("get_config");this._hiddenEntities=e?.calendar_card?.hidden_entities??[],void 0!==e?.calendar_card?.show_header&&(this.showHeader=e.calendar_card.show_header),this._configLoaded=!0}catch{this._configLoaded=!0}await this._fetchEvents(),this._startRefreshTimer(),this._startMidnightWatcher()}finally{this._configLoadInFlight=!1}}}_startRefreshTimer(){this._stopRefreshTimer(),this._refreshTimer=setInterval(()=>{this._fetchEvents()},9e5)}_stopRefreshTimer(){this._refreshTimer&&(clearInterval(this._refreshTimer),this._refreshTimer=void 0)}_todayKey(){const e=new Date;return`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`}_startMidnightWatcher(){this._stopMidnightWatcher(),this._lastTodayKey=this._todayKey(),this._midnightTimer=setInterval(()=>{const e=this._todayKey();e!==this._lastTodayKey&&(this._lastTodayKey=e,this._selectedDayOffset=0,this._fetchEvents())},6e4)}_stopMidnightWatcher(){this._midnightTimer&&(clearInterval(this._midnightTimer),this._midnightTimer=void 0)}async _fetchEvents(){if(this.hass&&!this.configPreview&&!this._fetchInFlight){this._fetchInFlight=!0;try{const e=new Set(this._hiddenEntities),t=Object.keys(this.hass.states).filter(t=>t.startsWith("calendar.")&&!e.has(t));if(0===t.length)return void(this._fetchedEvents=[]);const i=new Date;i.setHours(0,0,0,0);const a=new Date(i);a.setDate(a.getDate()+7);const r=i.toISOString(),s=a.toISOString(),o=`start=${encodeURIComponent(r)}&end=${encodeURIComponent(s)}`,n=(await Promise.all(t.map(async e=>{try{const t=await this.hass.callApi("GET",`calendars/${e}?${o}`);return(Array.isArray(t)?t:[]).flatMap(t=>this._toCardEvents(t,e))}catch(t){return console.warn(`[glass-calendar-card] failed to fetch events for ${e}`,t),[]}}))).flat();n.sort((e,t)=>(e.allday?0:1)-(t.allday?0:1)||(e.time??"").localeCompare(t.time??"")),this._fetchedEvents=n}finally{this._fetchInFlight=!1}}}_toCardEvents(e,t){const i=t.split(".")[1]||"perso",a=new Date;if(a.setHours(0,0,0,0),e.start.date&&!e.start.dateTime){const t=new Date(e.start.date+"T00:00:00"),r=e.end.date?new Date(e.end.date+"T00:00:00"):new Date(t.getTime()+864e5),s=Math.round((t.getTime()-a.getTime())/864e5),o=Math.round((r.getTime()-a.getTime())/864e5),n=Math.max(0,s),l=Math.min(7,o),c=[];for(let a=n;a<l;a++)c.push({title:e.summary,time:null,cal:i,allday:!0,dayOffset:a});return c}const r=e.start.dateTime??"",s=e.end.dateTime??"",o=r?r.slice(11,16):"",n=s?s.slice(11,16):"",l=n&&n!==o?`${o} - ${n}`:o||null,c=r?new Date(r):null,d=s?new Date(s):null,h=new Date,p=!!(c&&d&&c<=h&&d>=h);let u=0;if(c){const e=new Date(c);e.setHours(0,0,0,0),u=Math.round((e.getTime()-a.getTime())/864e5)}return u<0||u>6?[]:[{title:e.summary,time:l,cal:i,now:p,dayOffset:u}]}updated(e){if(super.updated(e),e.has("events")||e.has("_fetchedEvents")){const e=this._eventsKey(this._allEvents());e!==this._lastEventsKey&&(this._lastEventsKey=e,this._stopTicker(),this._tickerIdx=0,this._tickerLeavingIdx=null,this._startTicker())}else!this._tickerTimer&&this._tickerEvents().length>1&&this._startTicker()}_eventsKey(e){return e.map(e=>`${e.title}${e.time??""}${e.dayOffset??""}${e.allday?1:0}${e.now?1:0}`).join("")}_allEvents(){return this.events.length>0?this.events:this._fetchedEvents}_collapseExpanded(){this._open&&(this._open=!1)}_tickerEvents(){return this._allEvents().filter(Rr)}_startTicker(){this._tickerEvents().length<=1||window.matchMedia("(prefers-reduced-motion: reduce)").matches||(this._tickerTimer=setInterval(()=>this._advanceTicker(),3500))}_stopTicker(){this._tickerTimer&&clearInterval(this._tickerTimer),this._tickerTimer=void 0,this._leaveTimer&&clearTimeout(this._leaveTimer),this._leaveTimer=void 0}_advanceTicker(){const e=this._tickerEvents();if(e.length<=1)return;const t=this._tickerIdx;this._tickerLeavingIdx=t,this._tickerIdx=(t+1)%e.length,this._leaveTimer=setTimeout(()=>{this._tickerLeavingIdx=null},500)}_toggleOpen(){this._open=!this._open}render(){const e=new Date,t=`${Mr[e.getDay()]} ${e.getDate()} ${Or[e.getMonth()]}`,i=this._tickerEvents(),a=i.filter(e=>e.now).length;return Z`
      ${this.showHeader?this._renderHeader(i.length,a):ie}
      <div class="glass calendar-card ${this._open?"open":""}">
        <button
          class="v4-compact"
          type="button"
          aria-expanded=${this._open?"true":"false"}
          aria-controls=${this._foldId}
          aria-label=${this._open?"Fermer le calendrier":"Ouvrir le calendrier"}
          @click=${()=>this._toggleOpen()}
        >
          <span class="v4-compact-left">
            ${this._calendarIcon("v4-compact-icon")}
            <span class="v4-compact-date">${t}</span>
            <span class="v4-compact-count">${i.length}</span>
          </span>
          <span class="v4-compact-sep"></span>
          <span class="v4-ticker-wrap" aria-hidden="true">
            ${this._renderTicker(i)}
          </span>
          <span class="v4-compact-chevron">${this._chevronIcon()}</span>
        </button>

        <div class="v4-fold-sep below-compact" aria-hidden="true"></div>
        <div class="v4-fold" id=${this._foldId}>
          <div class="v4-fold-inner">
            <div class="card-inner">
              ${this._renderWeekStrip()}
              ${this._renderEventList()}
              ${this._renderLegend()}
            </div>
          </div>
        </div>
      </div>
    `}_renderHeader(e,t){return Z`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">Calendrier</span>
          <glass-pill tone=${0===e?"neutral":t>0?"accent":"success"} size="sm">${e}</glass-pill>
        </div>
      </div>
    `}_renderTicker(e){if(0===e.length)return Z`<span class="v4-ticker-empty">Aucun événement</span>`;const t=(this._tickerIdx%e.length+e.length)%e.length,i=null==this._tickerLeavingIdx?null:(this._tickerLeavingIdx%e.length+e.length)%e.length;return Z`${e.map((e,a)=>{const r=Pr[e.cal]?.color??"var(--t4)",s=e.time?e.time.split(" - ")[0]:"Journée";return Z`
        <span class="v4-ticker-item ${a===t?"active":a===i?"above":"below"} ${e.now?"now":""}">
          <span class="v4-ticker-dot" style="background:${r}"></span>
          <span class="v4-ticker-text">${e.title}</span>
          <span class="v4-ticker-time">${s}</span>
        </span>
      `})}`}_eventsForOffset(e){const t=this._allEvents();return 0===e?t.filter(e=>0===(e.dayOffset??0)):t.filter(t=>t.dayOffset===e)}_selectDay(e){this._selectedDayOffset=e,this._open||(this._open=!0)}_renderWeekStrip(){const e=new Date,t=this._allEvents(),i=new Map;for(const r of t){const e=r.dayOffset??0;if(e<0||e>6)continue;const t=i.get(e)??[];t.push(r.cal),i.set(e,t)}const a=[];for(let r=0;r<7;r++){const t=new Date(e);t.setDate(e.getDate()+r);const s=0===r,o=r===this._selectedDayOffset,n=(i.get(r)??[]).slice(0,3);a.push(Z`
        <button
          class="v4-week-day ${s?"today":""} ${o?"selected":""}"
          type="button"
          aria-pressed=${o?"true":"false"}
          aria-label="${Mr[t.getDay()]} ${t.getDate()}${s?", aujourd'hui":""}, ${n.length} évènement${n.length>1?"s":""}"
          @click=${e=>{e.stopPropagation(),this._selectDay(r)}}
        >
          <span class="v4-week-day-label">${Mr[t.getDay()]}</span>
          <span class="v4-week-day-num">${t.getDate()}</span>
          <span class="v4-week-day-dots">
            ${n.map(e=>Z`<span class="v4-week-dot" style="background:${Pr[e]?.color??"var(--t4)"}"></span>`)}
          </span>
        </button>
      `)}return Z`<div class="v4-week-strip">${a}</div>`}_renderEventList(){const e=this._eventsForOffset(this._selectedDayOffset),t=0===this._selectedDayOffset,i=this._sectionLabelFor(this._selectedDayOffset),a=Z`
      <glass-section-title label=${i}>
        ${e.length>0?Z`<glass-pill slot="end" size="sm">${e.length}</glass-pill>`:ie}
      </glass-section-title>
    `,r=0===e.length?Z`
        <div class="v4-event-empty" role="status" aria-live="polite">
          <div class="ambient-icon">${this._calendarIcon("ambient-svg")}</div>
          <span class="v4-event-empty-title">Rien de prévu</span>
          <span class="v4-event-empty-sub">${t?"Profitez de votre journée":"Aucun évènement ce jour-là"}</span>
        </div>
      `:Z`
        <div class="v4-event-list">
          ${e.map(e=>{const t=Pr[e.cal]?.color??"var(--c-accent)",i=e.now&&e.time?`${e.time} · En cours`:e.time??"Toute la journée";return Z`
              <button class="v4-event-row ${e.now?"now":""}" type="button"
                style="--ev-color: ${t};"
                aria-label="${e.title}${e.time?`, ${e.time}`:", toute la journée"}${e.now?", en cours":""}">
                <span class="v4-event-dot" aria-hidden="true"></span>
                <span class="v4-event-content">
                  <span class="v4-event-title">${e.title}</span>
                  <span class="v4-event-time">${i}</span>
                </span>
                ${e.allday?Z`<span class="v4-event-allday">Journée</span>`:ie}
              </button>
            `})}
        </div>
      `;return Z`<div class="v4-event-section">${a}${r}</div>`}_sectionLabelFor(e){if(0===e)return"Aujourd'hui";if(1===e)return"Demain";const t=new Date;return t.setDate(t.getDate()+e),`${Mr[t.getDay()]} ${t.getDate()} ${Or[t.getMonth()]}`}_renderLegend(){const e=[],t=new Set;for(const a of this._allEvents())a.cal&&!t.has(a.cal)&&(t.add(a.cal),e.push(a.cal));if(0===e.length)return ie;const i=e.map(e=>{const t=Pr[e];if(t)return{color:t.color,label:t.label};const i=this.hass?.states[`calendar.${e}`];return{color:"var(--c-accent)",label:i?.attributes.friendly_name??e.charAt(0).toUpperCase()+e.slice(1).replace(/_/g," ")}});return Z`
      <div class="v4-cal-legend">
        ${i.map(e=>Z`
          <span class="v4-cal-legend-item">
            <span class="v4-cal-legend-dot" style="background:${e.color}"></span>
            <span class="v4-cal-legend-label">${e.label}</span>
          </span>
        `)}
      </div>
    `}_calendarIcon(e){return Z`<svg class=${e} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${ee`<rect x="3" y="4" width="18" height="18" rx="2"/>`}
      ${ee`<line x1="16" y1="2" x2="16" y2="6"/>`}
      ${ee`<line x1="8" y1="2" x2="8" y2="6"/>`}
      ${ee`<line x1="3" y1="10" x2="21" y2="10"/>`}
    </svg>`}_chevronIcon(){return Z`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${ee`<polyline points="6 9 12 15 18 9"/>`}
    </svg>`}static{this.styles=[Lt,Pt,Mt,Xt,m`
    :host { width: 100%; max-width: 31.25rem; margin: 0 auto; color: var(--t1); }
    .calendar-card { width: 100%; overflow: hidden; position: relative; }

    /* ── Card Header (matches presence/climate/etc. pattern) ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 0.375rem; min-height: 1.375rem; margin-bottom: 0.375rem;
      box-sizing: border-box;
    }
    .card-header-left { display: flex; align-items: center; gap: 0.5rem; }
    .card-title {
      font-size: var(--fz-xs); font-weight: 700;
      text-transform: uppercase; letter-spacing: 1.5px;
      color: var(--t4);
    }
    /* ── Compact bar (matches presence-card height ~52px) ── */
    .v4-compact {
      display: flex; align-items: center; gap: 0.625rem;
      width: 100%;
      padding: 0.4375rem 0.875rem;
      min-height: 3.25rem;
      background: none; border: none; color: inherit;
      font-family: inherit; text-align: left;
      cursor: pointer; outline: none;
      border-radius: var(--radius-xl);
      transition: background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .v4-compact:active { background: rgba(var(--rgb-white), 0.03); }
    .v4-compact:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }

    .v4-compact-left { display: inline-flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
    .v4-compact-icon { width: 0.875rem; height: 0.875rem; color: rgb(var(--rgb-accent)); flex-shrink: 0; }
    .v4-compact-date { font-size: var(--fz-base); font-weight: 700; color: var(--t1); white-space: nowrap; line-height: 1rem; }
    .v4-compact-count {
      font-size: var(--fz-sm); font-weight: 700; color: rgb(var(--rgb-accent));
      background: rgba(var(--rgb-accent), 0.12);
      border: 0.0625rem solid rgba(var(--rgb-accent), 0.2);
      border-radius: var(--radius-full); padding: 0 0.375rem;
      min-width: 1.125rem; height: 1.125rem;
      display: inline-flex; align-items: center; justify-content: center;
      line-height: 1; box-sizing: border-box;
    }
    .v4-compact-sep { width: 0.0625rem; height: 0.75rem; background: var(--b2); flex-shrink: 0; }

    /* ── Chevron (round, rotates via parent .open) ── */
    .v4-compact-chevron {
      width: 1.625rem; height: 1.625rem; border-radius: 50%;
      background: var(--s2); border: 0.0625rem solid var(--b1);
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--t3); flex-shrink: 0;
      transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
    }
    /* No row-level hover on the closed compact bar: the chevron + state
       already signal interactivity, and hover-stickiness after a tap on
       mobile was distracting. */
    .v4-compact-chevron svg { width: 0.75rem; height: 0.75rem; transition: transform var(--t-fast); }
    .calendar-card.open .v4-compact-chevron svg { transform: rotate(180deg); }
    .calendar-card.open .v4-compact-chevron {
      background: rgba(var(--rgb-accent), 0.12);
      border-color: rgba(var(--rgb-accent), 0.3);
      color: rgb(var(--rgb-accent));
    }

    /* ── Ticker ── */
    .v4-ticker-wrap { flex: 1; min-width: 0; height: 1rem; position: relative; overflow: hidden; }
    .v4-ticker-item {
      display: inline-flex; align-items: center; gap: 0.375rem;
      position: absolute; left: 0; right: 0; top: 0; bottom: 0;
      transition:
        transform var(--t-med),
        opacity var(--t-med);
    }
    .v4-ticker-item.below  { transform: translateY(100%);  opacity: 0; pointer-events: none; }
    .v4-ticker-item.active { transform: translateY(0);     opacity: 1; }
    .v4-ticker-item.above  { transform: translateY(-100%); opacity: 0; pointer-events: none; }
    .v4-ticker-dot { width: 0.3125rem; height: 0.3125rem; border-radius: 50%; flex-shrink: 0; }
    .v4-ticker-text {
      font-size: var(--fz-base); font-weight: 500; color: var(--t2);
      flex: 1; min-width: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1rem;
    }
    .v4-ticker-time { font-size: var(--fz-base); font-weight: 500; color: var(--t3); flex-shrink: 0; line-height: 1rem; }
    .v4-ticker-item.now .v4-ticker-text { color: var(--t1); font-weight: 600; }
    .v4-ticker-item.now .v4-ticker-time { color: rgb(var(--rgb-accent)); }
    .v4-ticker-empty {
      position: relative; height: 1rem; display: inline-flex; align-items: center;
      font-size: var(--fz-base); font-weight: 500; color: var(--t4); font-style: italic;
    }

    /* ── Fold separators (gradient lines above/below open fold) ── */
    /* Hidden entirely when closed — no space taken, no anti-aliased traces. */
    .v4-fold-sep {
      display: none;
      height: 0.0625rem;
      margin: 0 0.75rem;
      background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.15), transparent);
      opacity: 0;
      transition: opacity var(--t-fast) 0.1s;
    }
    .calendar-card.open .v4-fold-sep { display: block; opacity: 1; }

    /* ── Fold (grid 0fr/1fr — never animate height) ── */
    .v4-fold { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--t-layout); }
    .calendar-card.open .v4-fold { grid-template-rows: 1fr; }
    .v4-fold-inner { overflow: hidden; opacity: 0; transition: opacity var(--t-fast); }
    .calendar-card.open .v4-fold-inner { opacity: 1; transition: opacity var(--t-fast) 0.1s; }
    .v4-fold .card-inner { padding: 0.5rem 0.875rem 0.875rem; }

    /* ── Week strip ── */
    .v4-week-strip {
      display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.125rem;
      margin-bottom: 0.75rem; padding: 0.375rem 0.25rem;
      border-radius: var(--radius-md); background: var(--s1); border: 0.0625rem solid var(--b1);
    }
    .v4-week-day {
      display: flex; flex-direction: column; align-items: center; gap: 0.1875rem;
      padding: 0.375rem 0; min-height: var(--tap-lg);
      border-radius: var(--radius-sm); background: none; border: none;
      cursor: pointer; outline: none; font-family: inherit;
      transition: background var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .v4-week-day:hover { background: var(--s3); }
    }
    .v4-week-day:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }
    .v4-week-day-label { font-size: var(--fz-xs); font-weight: 600; color: var(--t3); text-transform: uppercase; letter-spacing: 0.3px; line-height: 1; }
    .v4-week-day-num {
      font-size: var(--fz-md); font-weight: 600; color: var(--t2); line-height: 1;
      width: 1.625rem; height: 1.625rem;
      display: flex; align-items: center; justify-content: center; border-radius: 50%;
      transition: background var(--t-fast), color var(--t-fast);
    }
    .v4-week-day.today .v4-week-day-num {
      background: rgba(var(--rgb-accent), 0.2);
      color: rgb(var(--rgb-accent));
      font-weight: 700;
      box-shadow: 0 0 12px rgba(var(--rgb-accent), 0.35);
    }
    .v4-week-day.selected .v4-week-day-num {
      background: rgb(var(--rgb-accent));
      color: rgba(var(--rgb-white), 0.95);
      font-weight: 700;
      box-shadow: 0 0 14px rgba(var(--rgb-accent), 0.45);
    }
    .v4-week-day.selected.today .v4-week-day-num {
      background: rgb(var(--rgb-accent));
      color: rgba(var(--rgb-white), 0.95);
      box-shadow: 0 0 14px rgba(var(--rgb-accent), 0.5);
    }
    .v4-week-day-dots { display: inline-flex; gap: 0.1875rem; min-height: 0.25rem; }
    .v4-week-dot { width: 0.25rem; height: 0.25rem; border-radius: 50%; }
    @media (pointer: coarse) {
      .v4-week-day { position: relative; }
      .v4-week-day::after { content: ''; position: absolute; inset: -0.25rem 0; }
    }

    /* ── Event section (eyebrow + list) ── */
    .v4-event-section { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 0.5rem; }

    .v4-event-list { display: flex; flex-direction: column; gap: 0.1875rem; }
    .v4-event-row {
      position: relative;
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.5rem 0.625rem;
      min-height: var(--tap-lg); border-radius: var(--radius-md);
      background: var(--s1); border: 0.0625rem solid transparent;
      cursor: pointer; outline: none; font-family: inherit; text-align: left;
      width: 100%;
      transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .v4-event-row:hover {
        background: var(--s2);
        transform: translateX(2px);
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--ev-color) 35%, transparent);
      }
      .v4-event-row:hover .v4-event-dot { transform: scale(1.15); }
    }
    @media (hover: hover) { .v4-event-row:active { transform: translateX(2px) scale(0.99); } }
    .v4-event-row:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }

    /* Calendar color dot (replaces the banned 3px side-stripe) */
    .v4-event-dot {
      width: 0.625rem; height: 0.625rem; border-radius: 50%;
      flex-shrink: 0;
      background: var(--ev-color);
      transition: transform var(--t-fast), box-shadow var(--t-fast);
    }
    .v4-event-content { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.125rem; }
    .v4-event-title {
      font-size: var(--fz-base); font-weight: 600; color: var(--t1); line-height: 1.3;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .v4-event-time { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); line-height: 1.2; }
    .v4-event-allday {
      font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--t3); padding: 0.125rem 0.5rem; border-radius: var(--radius-full);
      background: var(--s2); border: 0.0625rem solid var(--b1); flex-shrink: 0;
    }

    /* Now state: ring accent + glow on the dot */
    .v4-event-row.now {
      background: color-mix(in srgb, var(--c-accent) 9%, transparent);
      border-color: color-mix(in srgb, var(--c-accent) 35%, transparent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--c-accent) 25%, transparent) inset;
    }
    .v4-event-row.now .v4-event-time {
      color: rgb(var(--rgb-accent)); font-weight: 600;
    }
    .v4-event-row.now .v4-event-dot {
      box-shadow: 0 0 10px var(--ev-color);
      animation: cal-dot-pulse 1.8s ease-in-out infinite;
    }
    @keyframes cal-dot-pulse {
      0%, 100% { box-shadow: 0 0 10px var(--ev-color); }
      50%      { box-shadow: 0 0 4px var(--ev-color); }
    }

    /* ── Empty state ── */
    .v4-event-empty {
      display: flex; flex-direction: column; align-items: center; gap: 0.375rem;
      padding: 1rem 1.25rem; text-align: center;
    }
    .v4-event-empty .ambient-icon {
      width: 3rem; height: 3rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: color-mix(in srgb, var(--c-accent) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--c-accent) 22%, transparent);
      box-shadow: 0 0 18px rgba(var(--rgb-accent), 0.15);
      margin-bottom: 0.25rem;
    }
    .v4-event-empty .ambient-svg {
      width: 1.375rem; height: 1.375rem;
      color: color-mix(in srgb, var(--c-accent) 75%, var(--t2));
    }
    .v4-event-empty-title { font-size: var(--fz-md); font-weight: 700; color: var(--t1); line-height: 1.3; }
    .v4-event-empty-sub { font-size: var(--fz-sm); font-weight: 500; color: var(--t3); }

    /* ── Legend ── */
    .v4-cal-legend {
      display: flex; gap: 0.625rem; padding: 0.5rem 0.125rem 0; flex-wrap: wrap;
      border-top: 1px solid var(--b1);
      margin-top: 0.5rem;
    }
    .v4-cal-legend-item { display: inline-flex; align-items: center; gap: 0.3125rem; }
    .v4-cal-legend-dot { width: 0.375rem; height: 0.375rem; border-radius: 50%; }
    .v4-cal-legend-label { font-size: var(--fz-xs); font-weight: 500; color: var(--t3); }

    /* ── Atmospheric halo at the bottom of the open fold ── */
    .calendar-card { position: relative; }
    .calendar-card::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 50%; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(var(--rgb-accent), 0.08), transparent 70%);
      opacity: 0; transition: opacity var(--t-slow);
    }
    .calendar-card.open::after { opacity: 1; }
    .calendar-card > * { position: relative; z-index: 1; }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      .v4-fold,
      .v4-fold-inner,
      .v4-fold-sep,
      .v4-ticker-item,
      .v4-compact-chevron svg,
      .v4-week-day-num,
      .v4-event-row,
      .v4-event-dot,
      .calendar-card::after { transition-duration: 0.01ms !important; }
      .v4-event-row.now .v4-event-dot { animation: none; }
      .v4-ticker-item.above,
      .v4-ticker-item.below { display: none; }
      .v4-ticker-item.active { transform: none; opacity: 1; }
      .v4-event-row:hover { transform: none; }
    }
  `]}}Lr([Se({attribute:!1})],Dr.prototype,"events"),Lr([Se({type:Boolean,attribute:"show-header"})],Dr.prototype,"showHeader"),Lr([Te()],Dr.prototype,"_open"),Lr([Te()],Dr.prototype,"_selectedDayOffset"),Lr([Te()],Dr.prototype,"_tickerIdx"),Lr([Te()],Dr.prototype,"_tickerLeavingIdx"),Lr([Te()],Dr.prototype,"_hiddenEntities"),Lr([Te()],Dr.prototype,"_fetchedEvents");try{customElements.define("glass-calendar-card",Dr)}catch{}const jr=[[/^batterie$|^battery$/,"battery"],[/^etat$|^status$|^state$/,"statusText"],[/^current[_-]?room$|^piece[_-]?courante$/,"currentRoom"],[/^erreur[_-]?de[_-]?l[_-]?aspirateur$|^vacuum[_-]?error$|^error[_-]?message$/,"errorMessage"],[/^maison$|^map$|^plan$/,"mapImage"],[/^serpilliere[_-]?fixee$|^mop[_-]?attached$/,"mopAttached"],[/^reservoir[_-]?d[_-]?eau[_-]?fixe$|^water[_-]?tank[_-]?attached$/,"tankAttached"],[/^penurie[_-]?d[_-]?eau$|^water[_-]?shortage$/,"waterShortage"],[/^intensite[_-]?de[_-]?frottement$|^mop[_-]?intensity$|^scrub[_-]?intensity$/,"mopIntensity"],[/^parcours[_-]?de[_-]?lavage[_-]?de[_-]?sol$|^mop[_-]?pattern$|^floor[_-]?mop[_-]?pattern$/,"mopPattern"],[/^en[_-]?charge$|^charging$/,"charging"],[/^dock[_-]?sechage[_-]?de[_-]?la[_-]?serpilliere$|^dock[_-]?mop[_-]?drying$|^mop[_-]?drying$/,"dockDrying"],[/^dock[_-]?temps[_-]?de[_-]?sechage[_-]?de[_-]?la[_-]?serpilliere[_-]?restant$|^mop[_-]?drying[_-]?time[_-]?left$/,"dockDryingTimeLeft"],[/^dock[_-]?dirty[_-]?water[_-]?box$/,"dirtyWaterBox"],[/^dock[_-]?clean[_-]?water[_-]?box$/,"cleanWaterBox"],[/^dock[_-]?cleaning[_-]?fluid$/,"cleaningFluid"],[/^dock[_-]?empty[_-]?mode$|^dock[_-]?mode[_-]?de[_-]?vidage$/,"dockEmptyMode"],[/^temps[_-]?restant[_-]?brosse[_-]?principale$|^main[_-]?brush[_-]?time[_-]?left$/,"consoBrushMain"],[/^temps[_-]?restant[_-]?brosse[_-]?laterale$|^side[_-]?brush[_-]?time[_-]?left$/,"consoBrushSide"],[/^temps[_-]?restant[_-]?filtre$|^filter[_-]?time[_-]?left$/,"consoFilter"],[/^temps[_-]?restant[_-]?capteurs$|^sensors[_-]?time[_-]?left$/,"consoSensors"],[/^dock[_-]?strainer[_-]?time[_-]?left$/,"consoStrainer"],[/^duree[_-]?de[_-]?nettoyage$|^cleaning[_-]?duration$/,"durationCurrent"],[/^duree[_-]?totale[_-]?de[_-]?nettoyage$|^total[_-]?cleaning[_-]?duration$/,"durationTotal"],[/^nombre[_-]?total[_-]?de[_-]?nettoyages$|^total[_-]?cleanings$/,"totalCleanings"],[/^surface[_-]?de[_-]?nettoyage$|^cleaning[_-]?area$/,"areaCurrent"],[/^surface[_-]?de[_-]?nettoyage[_-]?totale$|^total[_-]?cleaning[_-]?area$/,"areaTotal"],[/^debut[_-]?du[_-]?dernier[_-]?nettoyage$|^last[_-]?clean[_-]?start$/,"lastStart"],[/^fin[_-]?du[_-]?dernier[_-]?nettoyage$|^last[_-]?clean[_-]?end$/,"lastEnd"]],Fr=/^nettoyage[_-]?(?!complet$)(.+)$|^clean[_-]?(?!complete$|all$)(.+)$/,qr=/^nettoyage[_-]?complet$|^clean[_-]?(complete|all)$/;function Hr(e,t){const i=e.indexOf(".");if(-1===i)return null;const a=e.slice(i+1);return a.startsWith(t+"_")?a.slice(t.length+1):null}function Nr(e,t,i="unknown"){return t&&e?.states?.[t]?e.states[t].state:i}function Vr(e,t){return"on"===Nr(e,t,"off")}function Br(e,t,i=0){const a=parseFloat(Nr(e,t,""));return Number.isFinite(a)?a:i}const Ur={quiet:"Silence",silent:"Silence",balanced:"Équilibré",standard:"Standard",turbo:"Turbo",max:"Max",max_plus:"Max+",off_raise_main_brush:"Sans brosse",smart_mode:"Auto",smart:"Auto",custom:"Custom"},Wr={off:"Off",slight:"Très faible",low:"Faible",medium:"Moyen",moderate:"Modéré",high:"Élevé",extreme:"Extrême"},Kr={standard:"Standard",deep:"Profond",deep_plus:"Profond+",fast:"Rapide",smart_mode:"Auto",custom:"Custom"},Gr={cuisine:"Cuisine",kitchen:"Cuisine",sam:"Séjour",salon:"Salon",living:"Salon",sdb:"Salle de bain",bathroom:"Salle de bain",atelier:"Atelier",workshop:"Atelier",couloir:"Couloir",corridor:"Couloir",hallway:"Couloir",enfant:"Chambre enfant",kids:"Chambre enfant",chambre:"Chambre",bedroom:"Chambre",dressing:"Dressing",closet:"Dressing",bureau:"Bureau",office:"Bureau"};function Xr(e){if(Gr[e])return Gr[e];const t=e.replace(/[_-]+/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}function Yr(e,t,i){return e[t]??i??Xr(t)}var Qr=Object.defineProperty,Jr=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Qr(t,i,s),s};function Zr(e){return e.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().trim()}class es extends ci{constructor(){super(...arguments),this._open=!1,this._pendingAction=null,this._locateFlashing=!1,this._optimisticRoom=null,this._showHeader=!0,this._optimisticTimer=null,this._locateTimer=null,this._confirmTimerId=null,this._vacuumConfigLoaded=!1,this._vacuumStart=()=>{this._callService("vacuum","start",{entity_id:this._resolveEntityId()??""})},this._vacuumPause=()=>{this._callService("vacuum","pause",{entity_id:this._resolveEntityId()??""})},this._vacuumStop=()=>{const e=this._vacuumEntity();if(e)return this._isCleaning(e.state)?"stop"===this._pendingAction?(this._confirmTimerId&&clearTimeout(this._confirmTimerId),this._confirmTimerId=null,this._pendingAction=null,void this._callService("vacuum","stop",{entity_id:this._resolveEntityId()??""})):(this._pendingAction="stop",void(this._confirmTimerId=setTimeout(()=>{this._pendingAction=null,this._confirmTimerId=null,this.requestUpdate()},3e3))):void this._callService("vacuum","stop",{entity_id:this._resolveEntityId()??""})},this._vacuumLocate=()=>{this._callService("vacuum","locate",{entity_id:this._resolveEntityId()??""}),this._locateFlashing=!0,this._locateTimer&&clearTimeout(this._locateTimer),this._locateTimer=setTimeout(()=>{this._locateFlashing=!1,this._locateTimer=null},1500)},this._vacuumReturn=()=>{this._callService("vacuum","return_to_base",{entity_id:this._resolveEntityId()??""})},this._selectOption=(e,t)=>{this._callService("select","select_option",{entity_id:e,option:t})},this._setFanSpeed=e=>{this._callService("vacuum","set_fan_speed",{entity_id:this._resolveEntityId()??"",fan_speed:e})},this._toggleOpen=()=>{this._open=!this._open}}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._listen("vacuum-config-changed",()=>{this._vacuumConfigLoaded=!1,this._loadVacuumConfig()})}updated(e){super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._vacuumConfigLoaded=!1),this.hass&&!this._vacuumConfigLoaded&&this._loadVacuumConfig()}async _loadVacuumConfig(){if(this.hass&&!this._vacuumConfigLoaded){this._vacuumConfigLoaded=!0;try{this._backend||(this._backend=new mi(this.hass));const e=await this._backend.send("get_config");e?.vacuum_card&&(this._showHeader=e.vacuum_card.show_header??!0)}catch{}}}setConfig(e){if(e?.entity&&!e.entity.startsWith("vacuum."))throw new Error("vacuum-card: config.entity must be a vacuum.* entity_id");this.config=e}disconnectedCallback(){super.disconnectedCallback(),this._locateTimer&&clearTimeout(this._locateTimer),this._confirmTimerId&&clearTimeout(this._confirmTimerId),this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._locateTimer=null,this._confirmTimerId=null,this._optimisticTimer=null,this._pendingAction=null,this._optimisticRoom=null,this._backend=void 0,this._vacuumConfigLoaded=!1}static{this.styles=[Lt,Pt,Mt,jt,Ot,Rt,Kt,m`
      :host {
        --rgb-info: 96, 165, 250;
        --rgb-warning: 251, 191, 36;
        --rgb-accent: 129, 140, 248;
        width: 100%;
        max-width: 31.25rem;
        margin: 0 auto;
        color: var(--t1);
      }
      .card-inner {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
      }
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.375rem; margin-bottom: 0.375rem; min-height: 1.375rem;
      }
      .card-title {
        font-size: var(--fz-xs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }
      .placeholder {
        padding: 1rem;
        font-size: var(--fz-md);
        color: var(--t2);
      }
      .vacuum-icon {
        --mdc-icon-size: 1.5rem;
        color: var(--t2);
        flex-shrink: 0;
      }
      .status-info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 0;
      }
      .vacuum-name {
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .status-text {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .dot-success { background: var(--c-success); box-shadow: 0 0 6px rgba(74,222,128,0.5); }
      .dot-alert   { background: var(--c-alert);   box-shadow: 0 0 6px rgba(248,113,113,0.5); }
      .dot-warning { background: var(--c-warning); box-shadow: 0 0 6px rgba(251,191,36,0.5); }
      .dot-info    { background: var(--c-info);    box-shadow: 0 0 6px rgba(96,165,250,0.5); }
      .dot-off     { background: var(--t4); }
      .battery {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: var(--fz-sm);
        font-weight: 600;
        flex-shrink: 0;
      }
      .battery ha-icon {
        --mdc-icon-size: 1.125rem;
      }
      .battery.charging ha-icon {
        animation: vac-pulse 2s ease-in-out infinite;
      }
      @keyframes vac-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.55; }
      }
      @keyframes vac-pulse-alert {
        0%, 100% { border-color: rgba(var(--rgb-alert), 0.4); }
        50%      { border-color: rgba(var(--rgb-alert), 1); }
      }
      @keyframes vac-pulse-warning {
        0%, 100% { border-color: rgba(var(--rgb-warning), 0.4); }
        50%      { border-color: rgba(var(--rgb-warning), 1); }
      }
      .glass.alert-pulse   { animation: vac-pulse-alert 2s ease-in-out infinite; border-width: 1.5px; }
      .glass.warning-pulse { animation: vac-pulse-warning 2.4s ease-in-out infinite; border-width: 1.5px; }
      .rooms-section {
        padding: 0.5rem 0 0.75rem;
      }
      .rooms-scroller {
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        mask-image: linear-gradient(90deg, black 0, black calc(100% - 14px), transparent);
        -webkit-mask-image: linear-gradient(90deg, black 0, black calc(100% - 14px), transparent);
      }
      .rooms-scroller::-webkit-scrollbar {
        display: none;
      }
      .rooms-track {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0 1.5rem 0 0.875rem;
      }
      .rooms-sep-v {
        display: inline-block;
        width: 1px;
        height: 1.25rem;
        background: var(--b1);
        flex-shrink: 0;
        margin: 0 0.125rem;
      }
      .dot.pulsing {
        animation: vac-dot-pulse 1.5s ease-in-out infinite;
      }
      @keyframes vac-dot-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.85); }
      }
      .transport {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem 0.75rem;
        align-items: center;
      }
      .transport-error {
        gap: 0.5rem;
      }
      .transport-error glass-button {
        flex: 1 1 auto;
      }
      .stop-confirm {
        flex: 1 1 auto;
      }
      @keyframes vac-locate-flash {
        0% { transform: scale(1); }
        30% { transform: scale(1.2); }
        60% { transform: scale(1); }
        100% { transform: scale(1); }
      }
      .locate-flashing {
        animation: vac-locate-flash 1.5s ease-out;
      }
      .compact {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        width: 100%;
        padding: 0.4375rem 0.875rem;
        border-radius: var(--radius-xl);
        min-height: 3.25rem;
        color: var(--t1);
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
      }
      .ctrl-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ctrl-fold.open {
        grid-template-rows: 1fr;
      }
      .ctrl-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-med) 0.1s;
      }
      .ctrl-fold.open .ctrl-fold-inner {
        opacity: 1;
      }
      .fold-content {
        display: flex;
        flex-direction: column;
      }
      .fold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-accent), 0.18), transparent);
        margin: 0 0.75rem;
      }
      .fold-sep.top {
        margin-bottom: 0.5rem;
      }
      .fold-sep.bottom {
        margin-top: 0.5rem;
      }
      .fold-section {
        padding: 0.5rem 0.875rem 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .chips-row {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.375rem;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 0.125rem;
      }
      .chips-row::-webkit-scrollbar {
        display: none;
      }
      .chips-row glass-chip {
        flex-shrink: 0;
      }
      .rooms-track glass-chip {
        flex-shrink: 0;
      }
      .status-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-top: 0.25rem;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.625rem;
        border-radius: 20px;
        font-size: var(--fz-sm);
        font-weight: 600;
      }
      .badge ha-icon {
        --mdc-icon-size: 0.9rem;
      }
      .badge-success { background: rgba(74,222,128,0.15);  color: var(--c-success); }
      .badge-alert   { background: rgba(248,113,113,0.15); color: var(--c-alert); }
      .badge-warning { background: rgba(251,191,36,0.15);  color: var(--c-warning); }
      .badge-info    { background: rgba(96,165,250,0.15);  color: var(--c-info); }
      .badge-off     { background: var(--s1); color: var(--t3); border: 1px solid var(--b1); }
      .dock-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
        gap: 0.375rem;
      }
      .dock-cell {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.3125rem 0.5rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        min-height: 1.75rem;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .dock-cell ha-icon {
        --mdc-icon-size: 0.9rem;
        flex-shrink: 0;
      }
      .dock-cell.success { background: rgba(74,222,128,0.08);  border-color: rgba(74,222,128,0.25); }
      .dock-cell.alert   { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.25); }
      .dock-cell.warning { background: rgba(251,191,36,0.08);  border-color: rgba(251,191,36,0.25); }
      .dock-cell.info    { background: rgba(96,165,250,0.08);  border-color: rgba(96,165,250,0.25); }
      .dock-label {
        font-size: var(--fz-xs);
        color: var(--t2);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .conso-row {
        display: flex;
        flex-direction: column;
        gap: 0.3125rem;
      }
      .conso-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: var(--fz-sm);
      }
      .conso-label {
        color: var(--t2);
      }
      .conso-value {
        font-weight: 600;
      }
      .progress {
        position: relative;
        width: 100%;
        height: 0.375rem;
        background: var(--s2);
        border-radius: var(--radius-full);
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        width: 100%;
        border-radius: inherit;
        transform-origin: left center;
        transition: transform var(--t-med), background var(--t-fast);
      }
      .stats-row {
        font-size: var(--fz-sm);
        color: var(--t2);
        line-height: 1.4;
      }
      .stats-totals {
        color: var(--t3);
      }
      button:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.35);
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        .battery.charging ha-icon {
          animation: none;
        }
        .dot.pulsing {
          animation: none;
        }
        .locate-flashing {
          animation: none;
        }
        .glass.alert-pulse,
        .glass.warning-pulse {
          animation: none;
        }
        .glass.alert-pulse   { border-color: var(--c-alert); }
        .glass.warning-pulse { border-color: var(--c-warning); }
        .ctrl-fold {
          transition: none;
        }
        .ctrl-fold-inner {
          transition: none;
        }
      }
    `]}_resolveEntityId(){if(!this.hass)return null;const e=this.config?.entity;if(e&&this.hass.states[e])return e;for(const t of Object.keys(this.hass.states))if(t.startsWith("vacuum."))return t;return null}_vacuumEntity(){const e=this._resolveEntityId();return e?this.hass.states[e]??null:null}_companions(){const e=this._resolveEntityId();return e?function(e,t){const i=function(e){return e.includes(".")?e.split(".")[1]:e}(t),a={vacuumEntityId:t,prefix:i,roomButtons:[]};for(const r of Object.keys(e?.states??{})){const e=Hr(r,i);if(e){if("button"===r.split(".")[0]){if(e.match(qr)){a.allHouseButton=r;continue}const t=e.match(Fr);if(t){const e=t[1]??t[2];e&&a.roomButtons.push({entityId:r,slug:e});continue}}for(const[t,i]of jr)if(t.test(e)){a[i]||(a[i]=r);break}}}return a}(this.hass,e):null}_statusLabel(){const e=this._vacuumEntity(),t=this._companions();if(!e||!t)return"";if("error"===e.state){const e=Nr(this.hass,t.errorMessage,"");return e&&"none"!==e?e:ti("vacuum.status_error")}if("cleaning"===e.state){const e=Nr(this.hass,t.currentRoom,"");return e?ti("vacuum.cleaning_room",{room:e}):ti("vacuum.status_cleaning")}if("docked"===e.state&&Vr(this.hass,t.dockDrying)){const e=Math.round(Br(this.hass,t.dockDryingTimeLeft,0));if(e>0)return ti("vacuum.dock_drying_label",{minutes:e})}return ti(`vacuum.status_${e.state}`)??e.state}_batteryLevel(){const e=this._companions();return e?Br(this.hass,e.battery,0):0}_batteryIcon(e,t){return t?e>80?"mdi:battery-charging":e>60?"mdi:battery-charging-70":e>40?"mdi:battery-charging-50":e>20?"mdi:battery-charging-30":"mdi:battery-charging-10":e>80?"mdi:battery":e>60?"mdi:battery-70":e>40?"mdi:battery-50":e>20?"mdi:battery-30":"mdi:battery-10"}_batteryColor(e){return e>50?"var(--c-success)":e>=20?"var(--c-warning)":"var(--c-alert)"}_isStateReady(e){if(!e||!this.hass)return!1;const t=this.hass.states[e]?.state;return void 0!==t&&"unavailable"!==t&&"unknown"!==t}_alertLevel(e,t){if("error"===e.state)return"alert";if(!t)return null;let i=!1;this._isStateReady(t.dirtyWaterBox)&&Vr(this.hass,t.dirtyWaterBox)&&(i=!0),this._isStateReady(t.cleanWaterBox)&&!Vr(this.hass,t.cleanWaterBox)&&(i=!0);const a=[t.consoBrushMain,t.consoBrushSide,t.consoFilter,t.consoSensors];for(const r of a){if(!this._isStateReady(r))continue;const e=Br(this.hass,r,NaN);Number.isFinite(e)&&(e<50&&(i=!0))}return i?"warning":null}async _callService(e,t,i){this.hass&&await this.hass.callService(e,t,i)}_pressButton(e){this._callService("button","press",{entity_id:e})}_isCurrentRoomButton(e,t){if(this._optimisticRoom&&Zr(this._optimisticRoom)===Zr(t))return!0;const i=this._companions();if(!i)return!1;const a=Nr(this.hass,i.currentRoom,"");return!!a&&Zr(t)===Zr(a)}_onRoomChipTap(e,t){this._optimisticRoom=t,this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticRoom=null,this._optimisticTimer=null},3e3),this._pressButton(e)}_renderAllHouseChip(e,t){const i=this._bindGesture({onTap:()=>this._confirmAllHouse(e),onLongPress:()=>this._pressButton(e)});return Z`
      <span class="rooms-sep-v" aria-hidden="true"></span>
      <glass-chip
        size="sm"
        active
        active-color=${t?"warning":"cool"}
        .icon=${"mdi:home-outline"}
        aria-label=${ti("vacuum.all_house")}
        @pointerdown=${i.pointerdown}
        @pointerup=${i.pointerup}
        @pointermove=${i.pointermove}
        @pointercancel=${i.pointercancel}
        @contextmenu=${i.contextmenu}
      >${ti(t?"vacuum.confirm_short":"vacuum.all_house")}</glass-chip>
    `}_confirmAllHouse(e){if("all_house"===this._pendingAction)return this._confirmTimerId&&clearTimeout(this._confirmTimerId),this._confirmTimerId=null,this._pendingAction=null,void this._pressButton(e);this._pendingAction="all_house",this._confirmTimerId=setTimeout(()=>{this._pendingAction=null,this._confirmTimerId=null,this.requestUpdate()},3e3)}_isCleaning(e){return"cleaning"===e}_isPlaying(e){return"cleaning"===e}render(){if(!this.hass)return ie;const e=this._vacuumEntity();if(!e)return ie;const t=this._companions(),i=Gt(e.state),a=this._alertLevel(e,t),r="alert"===a?"alert-pulse":"warning"===a?"warning-pulse":"",s=this._open;return Z`
      ${this._showHeader?this._renderHeader():ie}
      <div
        class="glass ${i?"unavailable":""} ${r}"
        role=${a?"status":ie}
        aria-live=${a?"polite":ie}
      >
        <div class="card-inner">
          ${this._renderCompact(e,t,s,a)}
          <div class="ctrl-fold ${s?"open":""}">
            <div class="ctrl-fold-inner">
              <div class="fold-content">
                <div class="fold-sep top"></div>
                ${this._renderRoomChips(t)}
                ${this._renderTransport(e)}
                ${this._renderAspiration(e)}
                ${this._renderLavage(t)}
                ${this._renderDock(t)}
                ${this._renderConso(t)}
                ${this._renderStats(t)}
                <div class="fold-sep bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}_renderHeader(){return Z`
      <div class="card-header">
        <span class="card-title">${ti("vacuum.title")}</span>
      </div>
    `}_renderCompact(e,t,i,a){const r=this._batteryLevel(),s=!!t&&Vr(this.hass,t.charging),o=this._batteryIcon(r,s),n=this._batteryColor(r),l=this._statusLabel(),c=ti("vacuum.battery_aria",{level:r,charging:ti(s?"vacuum.charging":"vacuum.not_charging")}),d=`color:${n}`,h="battery "+(s?"charging":""),p=e.attributes.friendly_name??"",u=a?`${ti("vacuum.title")} — ${ti("alert"===a?"vacuum.alert_aria":"vacuum.warning_aria")}`:ti("vacuum.title"),g=this._bindGesture({onTap:this._toggleOpen,onLongPress:this._toggleOpen});return Z`
      <div
        class="compact ${i?"open":""}"
        role="button"
        tabindex="0"
        aria-expanded=${i?"true":"false"}
        aria-label=${u}
        @pointerdown=${g.pointerdown}
        @pointerup=${g.pointerup}
        @pointermove=${g.pointermove}
        @pointercancel=${g.pointercancel}
        @contextmenu=${g.contextmenu}
      >
        <ha-icon class="vacuum-icon" .icon=${"mdi:robot-vacuum-variant"}></ha-icon>
        <div class="status-info" aria-live="polite">
          <span class="vacuum-name">${p}</span>
          <span class="status-text">${l}</span>
        </div>
        <div class=${h} aria-label=${c} style=${d}>
          <ha-icon .icon=${o}></ha-icon>
          <span>${r}%</span>
        </div>
      </div>
    `}_renderRoomChips(e){if(!e||0===e.roomButtons.length)return ie;const t=e.allHouseButton,i="all_house"===this._pendingAction;return Z`
      <div class="rooms-section">
        <div class="rooms-scroller">
          <div class="rooms-track" role="group" aria-label="Pièces à nettoyer">
            ${e.roomButtons.map(({entityId:e,slug:t})=>{const i=Xr(t),a=this._isCurrentRoomButton(e,t);return Z`
                <glass-chip
                  size="sm"
                  active-color="cool"
                  ?active=${a}
                  aria-label=${ti("vacuum.clean_room_aria",{room:i})}
                  aria-pressed=${a}
                  @click=${()=>this._onRoomChipTap(e,t)}
                >${i}</glass-chip>
              `})}
            ${t?this._renderAllHouseChip(t,i):ie}
          </div>
        </div>
      </div>
    `}_renderTransport(e){if("error"===e.state)return Z`
        <div class="transport transport-error">
          <glass-button
            size="sm"
            .icon=${"mdi:crosshairs"}
            aria-label=${ti("vacuum.transport_locate")}
            @click=${this._vacuumLocate}
          >${ti("vacuum.transport_locate")}</glass-button>
          <glass-button
            size="sm"
            variant="primary"
            .icon=${"mdi:refresh"}
            aria-label=${ti("vacuum.transport_retry")}
            @click=${this._vacuumStart}
          >${ti("vacuum.transport_retry")}</glass-button>
        </div>
      `;const t=e.attributes.supported_features??0,i=!!(8&t),a=!!(512&t),r=!!(16&t),s="stop"===this._pendingAction,o=this._isPlaying(e.state);return Z`
      <div class="transport">
        <glass-icon-button
          active
          active-color="cool"
          .icon=${o?"mdi:pause":"mdi:play"}
          aria-label=${ti(o?"vacuum.transport_pause":"vacuum.transport_start")}
          @click=${o?this._vacuumPause:this._vacuumStart}
        ></glass-icon-button>
        ${i?s?Z`
                <glass-button
                  class="stop-confirm"
                  size="sm"
                  variant="danger"
                  .icon=${"mdi:stop"}
                  aria-label=${ti("vacuum.transport_stop")}
                  @click=${this._vacuumStop}
                >${ti("vacuum.confirm_short")}</glass-button>
              `:Z`
                <glass-icon-button
                  .icon=${"mdi:stop"}
                  aria-label=${ti("vacuum.transport_stop")}
                  ?disabled=${"docked"===e.state}
                  @click=${this._vacuumStop}
                ></glass-icon-button>
              `:ie}
        ${a?Z`
              <glass-icon-button
                class=${this._locateFlashing?"locate-flashing":""}
                ?active=${this._locateFlashing}
                active-color="info"
                .icon=${"mdi:crosshairs"}
                aria-label=${ti("vacuum.transport_locate")}
                @click=${this._vacuumLocate}
              ></glass-icon-button>
            `:ie}
        ${r?Z`
              <glass-icon-button
                .icon=${"mdi:home-import-outline"}
                aria-label=${ti("vacuum.transport_return")}
                ?disabled=${"docked"===e.state}
                @click=${this._vacuumReturn}
              ></glass-icon-button>
            `:ie}
      </div>
    `}_renderAspiration(e){if(!!!(32&(e.attributes.supported_features??0)))return ie;const t=e.attributes.fan_speed_list??[],i=e.attributes.fan_speed;return Z`
      <div class="fold-section">
        <glass-section-title label=${ti("vacuum.section_suction")}></glass-section-title>
        <div class="chips-row">
          ${t.map(e=>Z`
            <glass-chip
              size="sm"
              active-color="cool"
              ?active=${e===i}
              @click=${()=>this._setFanSpeed(e)}
            >${Yr(Ur,e)}</glass-chip>
          `)}
        </div>
      </div>
    `}_renderLavage(e){if(!e)return ie;if(!(e.mopIntensity||e.mopPattern||e.mopAttached))return ie;const t=this.hass.states[e.mopIntensity??""],i=this.hass.states[e.mopPattern??""],a=t?.attributes.options??[],r=i?.attributes.options??[],s=t?.state,o=i?.state;return Z`
      <div class="fold-section">
        <glass-section-title label=${ti("vacuum.section_mopping")}></glass-section-title>
        ${e.mopIntensity&&a.length>0?Z`
              <div class="chips-row">
                ${a.map(t=>Z`
                  <glass-chip
                    size="sm"
                    active-color="cool"
                    ?active=${t===s}
                    @click=${()=>this._selectOption(e.mopIntensity,t)}
                  >${Yr(Wr,t)}</glass-chip>
                `)}
              </div>
            `:ie}
        ${e.mopPattern&&r.length>0?Z`
              <div class="chips-row">
                ${r.map(t=>Z`
                  <glass-chip
                    size="sm"
                    active-color="cool"
                    ?active=${t===o}
                    @click=${()=>this._selectOption(e.mopPattern,t)}
                  >${Yr(Kr,t)}</glass-chip>
                `)}
              </div>
            `:ie}
        <div class="status-row">
          ${this._renderBadge(Vr(this.hass,e.mopAttached)?{label:ti("vacuum.mop_attached"),variant:"success",icon:"mdi:check-circle"}:{label:ti("vacuum.mop_missing"),variant:"alert",icon:"mdi:alert-circle-outline"})}
          ${this._renderBadge(Vr(this.hass,e.tankAttached)?{label:ti("vacuum.tank_ok"),variant:"success",icon:"mdi:check-circle"}:{label:ti("vacuum.tank_missing"),variant:"alert",icon:"mdi:alert-circle-outline"})}
          ${this._renderBadge(Vr(this.hass,e.waterShortage)?{label:ti("vacuum.water_short"),variant:"alert",icon:"mdi:water-off"}:{label:ti("vacuum.water_ok"),variant:"success",icon:"mdi:water"})}
        </div>
      </div>
    `}_renderBadge({label:e,variant:t,icon:i}){return Z`
      <div class="badge badge-${t}">
        <ha-icon .icon=${i}></ha-icon>
        <span>${e}</span>
      </div>
    `}_renderDock(e){if(!e)return ie;const t=[{icon:"mdi:battery-charging",label:Vr(this.hass,e.charging)?ti("vacuum.dock_charging"):ti("vacuum.dock_idle"),variant:Vr(this.hass,e.charging)?"success":"idle"},{icon:"mdi:hair-dryer-outline",label:Vr(this.hass,e.dockDrying)?ti("vacuum.dock_drying_label",{minutes:Math.round(Br(this.hass,e.dockDryingTimeLeft,0))}):ti("vacuum.dock_drying_idle"),variant:Vr(this.hass,e.dockDrying)?"info":"idle"},{icon:"mdi:water-pump",label:Vr(this.hass,e.dirtyWaterBox)?ti("vacuum.dirty_full"):ti("vacuum.dirty_ok"),variant:Vr(this.hass,e.dirtyWaterBox)?"alert":"success"},{icon:"mdi:water",label:Vr(this.hass,e.cleanWaterBox)?ti("vacuum.clean_ok"):ti("vacuum.clean_empty"),variant:Vr(this.hass,e.cleanWaterBox)?"success":"alert"},{icon:"mdi:bottle-tonic-outline",label:Vr(this.hass,e.cleaningFluid)?ti("vacuum.fluid_ok"):ti("vacuum.fluid_empty"),variant:Vr(this.hass,e.cleaningFluid)?"success":"warning"}],i={success:"var(--c-success)",alert:"var(--c-alert)",warning:"var(--c-warning)",info:"var(--c-info)",idle:"var(--t3)"};return Z`
      <div class="fold-section">
        <glass-section-title label=${ti("vacuum.section_dock")}></glass-section-title>
        <div class="dock-grid">
          ${t.map(e=>Z`
            <div class="dock-cell ${"idle"===e.variant?"":e.variant}" style="color:${i[e.variant]}">
              <ha-icon .icon=${e.icon}></ha-icon>
              <span class="dock-label">${e.label}</span>
            </div>
          `)}
        </div>
      </div>
    `}_renderConso(e){if(!e)return ie;const t=[{key:e.consoBrushMain,label:ti("vacuum.conso_brush_main"),max:300},{key:e.consoBrushSide,label:ti("vacuum.conso_brush_side"),max:200},{key:e.consoFilter,label:ti("vacuum.conso_filter"),max:150},{key:e.consoSensors,label:ti("vacuum.conso_sensors"),max:100}].filter(e=>e.key);return 0===t.length?ie:Z`
      <div class="fold-section">
        <glass-section-title label=${ti("vacuum.section_consumables")}></glass-section-title>
        ${t.map(e=>{const t=Br(this.hass,e.key,0);let i="var(--c-success)";t<0||t<20?i="var(--c-alert)":t<50&&(i="var(--c-warning)");const a=Math.max(0,Math.min(100,t/e.max*100)),r=t<0?ti("vacuum.conso_clean_now"):ti("vacuum.conso_hours",{hours:Math.round(t)});return Z`
            <div class="conso-row">
              <div class="conso-header">
                <span class="conso-label">${e.label}</span>
                <span class="conso-value" style="color:${i}">${r}</span>
              </div>
              <div
                class="progress"
                role="progressbar"
                aria-valuenow=${Math.max(0,Math.round(t))}
                aria-valuemin="0"
                aria-valuemax=${e.max}
                aria-label="${e.label} : ${r}"
              >
                <div class="progress-fill" style="transform:scaleX(${a/100});background:${i}"></div>
              </div>
            </div>
          `})}
      </div>
    `}_renderStats(e){if(!e)return ie;const t=Nr(this.hass,e.lastEnd,""),i=Br(this.hass,e.durationCurrent,0),a=Br(this.hass,e.areaCurrent,0),r=Math.round(Br(this.hass,e.totalCleanings,0)),s=Math.round(Br(this.hass,e.areaTotal,0)),o=t?function(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=Math.floor((Date.now()-t.getTime())/1e3);return i<60?"à l'instant":i<3600?`il y a ${Math.floor(i/60)} min`:i<86400?`il y a ${Math.floor(i/3600)} h`:i<172800?"hier":`il y a ${Math.floor(i/86400)} jours`}(t):"—",n=`${Math.round(i)} min`,l=`${a} m²`;return Z`
      <div class="fold-section">
        <glass-section-title label=${ti("vacuum.section_stats")}></glass-section-title>
        <div class="stats-row">${ti("vacuum.stats_last_session",{when:o,duration:n,area:l})}</div>
        <div class="stats-row stats-totals">
          ${ti("vacuum.stats_totals",{count:r,area:`${s} m²`})}
        </div>
      </div>
    `}}function ts(){window.dispatchEvent(new Event("ll-rebuild"))}Jr([Se({attribute:!1})],es.prototype,"hass"),Jr([Se({attribute:!1})],es.prototype,"config"),Jr([Te()],es.prototype,"_open"),Jr([Te()],es.prototype,"_pendingAction"),Jr([Te()],es.prototype,"_locateFlashing"),Jr([Te()],es.prototype,"_optimisticRoom"),Jr([Te()],es.prototype,"_showHeader"),customElements.define("glass-vacuum-card",es),function(){if(a)return;a=!0;const e=history.pushState,t=history.replaceState;history.pushState=function(t,a,s){if(e.call(this,t,a,s),!r){r=!0;try{window.dispatchEvent(new Event("location-changed")),i.emit("location-changed",void 0)}finally{r=!1}}},history.replaceState=function(e,a,s){if(t.call(this,e,a,s),!r){r=!0;try{window.dispatchEvent(new Event("location-changed")),i.emit("location-changed",void 0)}finally{r=!1}}},window.addEventListener("popstate",s)}(),Vt||(Vt=new Nt),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(ts)):requestAnimationFrame(ts),window.addEventListener("connection-status",e=>{"connected"===e.detail&&setTimeout(ts,500)})}();
