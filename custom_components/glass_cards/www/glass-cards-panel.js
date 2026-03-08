!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let r=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(a,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,_=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},f=(e,t)=>!n(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&d(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=a?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...l(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),r=e.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=a;const s=r.fromAttribute(t,e.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const s=this.constructor;if(!1===a&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??f)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,m?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=e=>e,$=x.trustedTypes,S=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+C,D=`<${A}>`,M=document,T=()=>M.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,z=Array.isArray,I="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,O=/>/g,H=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,U=/"/g,N=/^(?:script|style|textarea|title)$/i,V=(q=1,(e,...t)=>({_$litType$:q,strings:e,values:t})),Y=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),B=new WeakMap,W=M.createTreeWalker(M,129);var q;function F(e,t){if(!z(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class G{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,s=0;const o=e.length-1,n=this.parts,[d,c]=((e,t)=>{const i=e.length-1,a=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=R;for(let n=0;n<i;n++){const t=e[n];let i,d,c=-1,l=0;for(;l<t.length&&(o.lastIndex=l,d=o.exec(t),null!==d);)l=o.lastIndex,o===R?"!--"===d[1]?o=L:void 0!==d[1]?o=O:void 0!==d[2]?(N.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=H):void 0!==d[3]&&(o=H):o===H?">"===d[0]?(o=r??R,c=-1):void 0===d[1]?c=-2:(c=o.lastIndex-d[2].length,i=d[1],o=void 0===d[3]?H:'"'===d[3]?U:j):o===U||o===j?o=H:o===L||o===O?o=R:(o=H,r=void 0);const h=o===H&&e[n+1].startsWith("/>")?" ":"";s+=o===R?t+D:c>=0?(a.push(i),t.slice(0,c)+E+t.slice(c)+C+h):t+C+(-2===c?n:h)}return[F(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=G.createElement(d,i),W.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=W.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=c[s++],i=a.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?ee:"?"===o[1]?te:"@"===o[1]?ie:Q}),a.removeAttribute(e)}else e.startsWith(C)&&(n.push({type:6,index:r}),a.removeAttribute(e));if(N.test(a.tagName)){const e=a.textContent.split(C),t=e.length-1;if(t>0){a.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],T()),W.nextNode(),n.push({type:2,index:++r});a.append(e[t],T())}}}else if(8===a.nodeType)if(a.data===A)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(C,e+1));)n.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,a){if(t===Y)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const s=P(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,a)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??M).importNode(t,!0);W.currentNode=a;let r=W.nextNode(),s=0,o=0,n=i[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new Z(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new ae(r,this,e)),this._$AV.push(t),n=i[++o]}s!==n?.index&&(r=W.nextNode(),s++)}return W.currentNode=M,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),P(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==Y&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>z(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new J(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new G(e)),t}k(e){z(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new Z(this.O(T()),this.O(T()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(e,t=this,i,a){const r=this.strings;let s=!1;if(void 0===r)e=X(this,e,t,0),s=!P(e)||e!==this._$AH&&e!==Y,s&&(this._$AH=e);else{const a=e;let o,n;for(e=r[0],o=0;o<r.length-1;o++)n=X(this,a[i+o],t,o),n===Y&&(n=this._$AH[o]),s||=!P(n)||n!==this._$AH[o],n===K?e=K:e!==K&&(e+=(n??"")+r[o+1]),this._$AH[o]=n}s&&!a&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class ie extends Q{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??K)===Y)return;const i=this._$AH,a=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==K&&(i===K||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const re=x.litHtmlPolyfillSupport;re?.(G,Z),(x.litHtmlVersions??=[]).push("3.3.2");const se=globalThis;class oe extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new Z(t.insertBefore(T(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}oe._$litElement$=!0,oe.finalized=!0,se.litElementHydrateSupport?.({LitElement:oe});const ne=se.litElementPolyfillSupport;ne?.({LitElement:oe}),(se.litElementVersions??=[]).push("4.2.2");const de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:f},ce=(e=de,t,i)=>{const{kind:a,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function le(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return le({...e,state:!0,attribute:!1})}const pe=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){this.listeners.get(e)?.forEach(e=>e(t))}},ue=s`
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
    --radius-full: 9999px;

    --t1: rgba(255, 255, 255, 0.88);
    --t2: rgba(255, 255, 255, 0.6);
    --t3: rgba(255, 255, 255, 0.45);
    --t4: rgba(255, 255, 255, 0.25);

    --s1: rgba(255, 255, 255, 0.04);
    --s2: rgba(255, 255, 255, 0.06);
    --s3: rgba(255, 255, 255, 0.08);
    --s4: rgba(255, 255, 255, 0.12);

    --b1: rgba(255, 255, 255, 0.06);
    --b2: rgba(255, 255, 255, 0.08);
    --b3: rgba(255, 255, 255, 0.15);

    --c-success: var(--success-color, #4ade80);
    --c-alert: var(--error-color, #f87171);
    --c-warning: var(--warning-color, #fbbf24);
    --c-info: var(--info-color, #60a5fa);
    --c-accent: var(--accent-color, #818cf8);
    --c-purple: #a78bfa;
    --c-light-glow: #fbbf24;
    --c-temp-hot: #f87171;
    --c-temp-cold: #60a5fa;
  }
`,ge=s`
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
`;s`
  .marquee {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
  }
  .marquee .marquee-inner {
    display: inline-block;
    padding-right: 3em;
    animation: marquee-scroll var(--marquee-duration, 8s) linear infinite;
    will-change: transform;
  }
  .marquee .marquee-inner[aria-hidden] {
    /* duplicate for seamless loop */
  }
  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`,s`
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
  }
`;const _e={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",preset_aria:"Ambiance {label}",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",preset_relax:"Relax",preset_focus:"Focus",preset_film:"Film",preset_night:"Nuit",dashboard_title_one:"1 LUMIÈRE ALLUMÉE",dashboard_title:"{count} LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:{title:"Configuration",brand:"GLASS CARDS",tab_navbar:"Barre de nav",tab_popup:"Popup Pièce",tab_light:"Carte Lumières",preview:"Aperçu",navbar_behavior:"Comportement",navbar_auto_sort:"Tri automatique",navbar_auto_sort_desc:"Les pièces actives remontent en premier",navbar_rooms_banner:"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.",navbar_visible_rooms:"Pièces visibles",navbar_empty_rooms:"Pièces vides",navbar_empty_rooms_desc:"Ces pièces n'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu'elles apparaissent dans la navbar.",navbar_indicators:"Indicateurs",navbar_indicators_desc:"Activez ou désactivez les indicateurs visuels sur la navbar.",navbar_ind_lights:"Lumières allumées",navbar_ind_lights_desc:"Glow doré sur l'icône",navbar_ind_temp:"Température",navbar_ind_temp_desc:"Badge chaud / froid",navbar_ind_humidity:"Humidité",navbar_ind_humidity_desc:"Barre bleue en bas",navbar_ind_media:"Média en lecture",navbar_ind_media_desc:"Bounce de l'icône",navbar_thresholds:"Seuils",navbar_thresholds_desc:"Définissez les seuils pour les alertes de température et d'humidité.",navbar_temp_high:"Température haute",navbar_temp_low:"Température basse",navbar_humidity_threshold:"Seuil humidité",navbar_choose_icon:"Choisir icône",navbar_change_icon_aria:"Changer l'icône de {name}",navbar_icon_label:"Icône — {name}",popup_room:"Pièce",popup_room_desc:"Sélectionnez une pièce pour configurer l'ordre et la visibilité de ses cartes internes.",popup_internal_cards:"Cartes internes",popup_internal_cards_desc:"Ordonnez les cartes affichées dans le popup de cette pièce.",popup_scenes:"Scènes",popup_scenes_desc:"Réordonnez et masquez les scènes affichées en haut du popup.",popup_select_room:"Sélectionnez une pièce",light_room:"Pièce",light_room_desc:"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d'affichage.",light_list_title:"Lumières",light_list_banner:"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.",light_no_lights:"Aucune lumière dans cette pièce.",light_no_visible:"Aucune lumière visible",light_select_room:"Sélectionnez une pièce",light_change_layout_aria:"Changer le layout",light_layout_compact:"COMPACT",light_layout_full:"PLEIN",light_schedule_hint:"Appuyez sur l'icône calendrier de chaque lumière pour définir des périodes de visibilité.",light_schedule_aria:"Gérer la planification de visibilité de {name}",light_schedule_title:"Planification de visibilité",light_schedule_start:"Début",light_schedule_end:"Fin",light_schedule_recurring:"Annuel",light_schedule_add:"Ajouter une période",light_schedule_delete_aria:"Supprimer la période",light_schedule_no_date:"Choisir une date…",light_schedule_confirm:"Confirmer",light_schedule_prev_month_aria:"Mois précédent",light_schedule_next_month_aria:"Mois suivant",light_dashboard_vs_room:"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.",domain_light:"Lumières",domain_light_desc:"Contrôle des lumières",domain_media_player:"Média",domain_media_player_desc:"Lecteurs multimédias",domain_climate:"Climat",domain_climate_desc:"Thermostats et climatisation",domain_fan:"Ventilateur",domain_fan_desc:"Ventilation",domain_cover:"Volets",domain_cover_desc:"Stores et volets roulants",domain_vacuum:"Aspirateur",domain_vacuum_desc:"Robots aspirateurs",tab_weather:"Carte Météo",weather_entity:"Entité météo",weather_entity_desc:"Sélectionnez l'entité météo à afficher sur la carte.",weather_metrics:"Métriques visibles",weather_metrics_desc:"Activez ou désactivez les métriques affichées sur la carte.",weather_forecasts:"Onglets prévisions",weather_forecasts_desc:"Activez ou désactivez les onglets de prévisions.",weather_metric_humidity:"Humidité",weather_metric_wind:"Vent",weather_metric_pressure:"Pression",weather_metric_uv:"UV",weather_metric_visibility:"Visibilité",weather_metric_sunrise:"Lever du soleil",weather_metric_sunset:"Coucher du soleil",weather_daily:"Prévisions 7 jours",weather_hourly:"Prévisions horaires",weather_select_entity:"Sélectionnez une entité météo",tab_dashboard:"Tableau de bord",dashboard_title:"Cartes du tableau de bord",dashboard_desc:"Activez ou désactivez les cartes affichées sur le tableau de bord Home Assistant.",dashboard_card_weather:"Carte Météo",dashboard_card_weather_desc:"Affiche la météo actuelle, prévisions et animations",dashboard_card_light:"Carte Lumières",dashboard_card_light_desc:"Contrôle des lumières par pièce"}},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",preset_aria:"Preset {label}",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",preset_relax:"Relax",preset_focus:"Focus",preset_film:"Film",preset_night:"Night",dashboard_title_one:"1 LIGHT ON",dashboard_title:"{count} LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:{title:"Configuration",brand:"GLASS CARDS",tab_navbar:"Navbar",tab_popup:"Room Popup",tab_light:"Light Card",preview:"Preview",navbar_behavior:"Behavior",navbar_auto_sort:"Auto sort",navbar_auto_sort_desc:"Active rooms move to the top",navbar_rooms_banner:"Drag to reorder rooms. Toggle to hide.",navbar_visible_rooms:"Visible rooms",navbar_empty_rooms:"Empty rooms",navbar_empty_rooms_desc:"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.",navbar_indicators:"Indicators",navbar_indicators_desc:"Enable or disable visual indicators on the navbar.",navbar_ind_lights:"Lights on",navbar_ind_lights_desc:"Golden glow on icon",navbar_ind_temp:"Temperature",navbar_ind_temp_desc:"Hot / cold badge",navbar_ind_humidity:"Humidity",navbar_ind_humidity_desc:"Blue bar at bottom",navbar_ind_media:"Media playing",navbar_ind_media_desc:"Icon bounce",navbar_thresholds:"Thresholds",navbar_thresholds_desc:"Set thresholds for temperature and humidity alerts.",navbar_temp_high:"High temperature",navbar_temp_low:"Low temperature",navbar_humidity_threshold:"Humidity threshold",navbar_choose_icon:"Choose icon",navbar_change_icon_aria:"Change icon for {name}",navbar_icon_label:"Icon — {name}",popup_room:"Room",popup_room_desc:"Select a room to configure the order and visibility of its internal cards.",popup_internal_cards:"Internal cards",popup_internal_cards_desc:"Order the cards displayed in this room's popup.",popup_scenes:"Scenes",popup_scenes_desc:"Reorder and hide scenes shown at the top of the popup.",popup_select_room:"Select a room",light_room:"Room",light_room_desc:"Select a room to configure its lights: order, visibility and display mode.",light_list_title:"Lights",light_list_banner:"Drag to reorder. The layout button toggles between full width and compact.",light_no_lights:"No lights in this room.",light_no_visible:"No visible lights",light_select_room:"Select a room",light_change_layout_aria:"Change layout",light_layout_compact:"COMPACT",light_layout_full:"FULL",light_schedule_hint:"Tap the calendar icon on each light to set visibility periods.",light_schedule_aria:"Manage visibility schedule for {name}",light_schedule_title:"Visibility schedule",light_schedule_start:"Start",light_schedule_end:"End",light_schedule_recurring:"Annually",light_schedule_add:"Add period",light_schedule_delete_aria:"Delete period",light_schedule_no_date:"Select date…",light_schedule_confirm:"Confirm",light_schedule_prev_month_aria:"Previous month",light_schedule_next_month_aria:"Next month",light_dashboard_vs_room:"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.",domain_light:"Lights",domain_light_desc:"Light control",domain_media_player:"Media",domain_media_player_desc:"Media players",domain_climate:"Climate",domain_climate_desc:"Thermostats and air conditioning",domain_fan:"Fan",domain_fan_desc:"Ventilation",domain_cover:"Covers",domain_cover_desc:"Blinds and shutters",domain_vacuum:"Vacuum",domain_vacuum_desc:"Robot vacuums",tab_weather:"Weather Card",weather_entity:"Weather entity",weather_entity_desc:"Select the weather entity to display on the card.",weather_metrics:"Visible metrics",weather_metrics_desc:"Enable or disable metrics shown on the card.",weather_forecasts:"Forecast tabs",weather_forecasts_desc:"Enable or disable forecast tabs.",weather_metric_humidity:"Humidity",weather_metric_wind:"Wind",weather_metric_pressure:"Pressure",weather_metric_uv:"UV",weather_metric_visibility:"Visibility",weather_metric_sunrise:"Sunrise",weather_metric_sunset:"Sunset",weather_daily:"7-day forecast",weather_hourly:"Hourly forecast",weather_select_entity:"Select a weather entity",tab_dashboard:"Dashboard",dashboard_title:"Dashboard cards",dashboard_desc:"Enable or disable the cards displayed on the Home Assistant dashboard.",dashboard_card_weather:"Weather Card",dashboard_card_weather_desc:"Current weather, forecasts and animations",dashboard_card_light:"Light Card",dashboard_card_light_desc:"Room-by-room light controls"}}},me="fr";let ve=me;function be(e){const t=e.slice(0,2).toLowerCase(),i=t in _e?t:me;return i!==ve&&(ve=i,!0)}function fe(){return ve}function we(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),r=-1===i?"":e.slice(i+1),s=_e[ve]??_e[me],o=_e[me],n=s?.[a]?.[r]??o?.[a]?.[r];let d="string"==typeof n?n:e;if(t)for(const[c,l]of Object.entries(t))d=d.replaceAll(`{${c}}`,String(l));return d}var ye=Object.defineProperty,xe=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ye(t,i,s),s};class ke extends oe{constructor(){super(...arguments),this._lang=fe(),this._busCleanups=[]}setConfig(e){this._config=e}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&be(this.hass.language)&&(this._lang=fe())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}_listen(e,t){this._busCleanups.push(pe.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[]}}function $e(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&function(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}(t,i)===e)}xe([le({attribute:!1})],ke.prototype,"hass"),xe([he()],ke.prototype,"_lang");class Se{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}var Ee=Object.defineProperty,Ce=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ee(t,i,s),s};const Ae=["light","media_player","climate","fan","cover","vacuum"],De=new Set(["light"]),Me={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",vacuum:"mdi:robot-vacuum"},Te={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};const Pe=["mdi:sofa","mdi:stove","mdi:bed","mdi:desk","mdi:shower","mdi:home","mdi:movie-open","mdi:music","mdi:wrench","mdi:flower","mdi:white-balance-sunny","mdi:weather-night","mdi:lightbulb","mdi:snowflake","mdi:fire","mdi:lock"];class ze extends oe{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=fe(),this._tab="dashboard",this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._cards=[],this._scenes=[],this._lights=[],this._lightRoom="",this._lightDropdownOpen=!1,this._iconPickerRoom=null,this._dropdownOpen=!1,this._toast=!1,this._saving=!1,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._showMedia=!0,this._autoSort=!0,this._tempHigh=24,this._tempLow=17,this._humidityThreshold=65,this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherDropdownOpen=!1,this._dashboardEnabledCards=["weather"],this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._loaded=!1,this._loading=!1,this._toastError=!1,this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this),this._boundUpdateScrollMask=this._updateScrollMask.bind(this),this._initialIcons=new Map,this._tabsEl=null}static{this.styles=[ue,ge,s`
      :host {
        display: block;
        font-family: 'Plus Jakarta Sans', sans-serif;
        min-height: 100vh;
        padding: 32px 16px 48px;
        color: var(--t1);
      }

      /* ── Ambient ── */
      .ambient-bg {
        position: fixed;
        inset: 0;
        z-index: -1;
        background: #111827;
      }
      .ambient-bg::before,
      .ambient-bg::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.35;
      }
      .ambient-bg::before {
        width: 600px;
        height: 600px;
        top: -200px;
        right: -100px;
        background: var(--ambient-blob-top, #2d4a8a);
      }
      .ambient-bg::after {
        width: 500px;
        height: 500px;
        bottom: -150px;
        left: -100px;
        background: var(--ambient-blob-bottom, #3a2d6b);
      }

      /* ── Layout ── */
      .page-wrap {
        max-width: 440px;
        margin: 0 auto;
      }

      /* ── Header ── */
      .page-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .page-back {
        width: 32px;
        height: 32px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t3);
        padding: 0;
        font-family: inherit;
        transition: background var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .page-back:hover {
          background: var(--s3);
        }
      }
      .page-back:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .page-back ha-icon {
        --mdc-icon-size: 18px;
      }
      .page-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--t1);
        letter-spacing: -0.3px;
      }
      .page-subtitle {
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        margin-left: auto;
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }

      /* ── Panel ── */
      .config-panel {
        padding: 16px;
      }

      /* ── Tabs ── */
      .tabs {
        display: flex;
        gap: 0;
        border-radius: 12px;
        background: var(--s1);
        border: 1px solid var(--b1);
        padding: 3px;
        margin-bottom: 16px;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        scroll-behavior: smooth;
      }
      .tabs::-webkit-scrollbar { display: none; }
      .tabs.mask-right {
        mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
      }
      .tabs.mask-left {
        mask-image: linear-gradient(to left, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to left, black calc(100% - 24px), transparent 100%);
      }
      .tabs.mask-both {
        mask-image: linear-gradient(to right, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
      }
      .tab {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 9px;
        font-family: inherit;
        font-size: 11px;
        font-weight: 600;
        color: var(--t3);
        cursor: pointer;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          box-shadow var(--t-fast);
        border: none;
        background: transparent;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .tab:hover {
          color: var(--t2);
        }
      }
      .tab:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .tab.active {
        background: var(--s4);
        color: var(--t1);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      }
      .tab ha-icon {
        --mdc-icon-size: 14px;
      }

      /* ── Tab panel animation ── */
      .tab-panel {
        animation: panel-in 0.3s var(--ease-out) both;
      }
      @keyframes panel-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* ── Section ── */
      .section-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 8px;
        padding-left: 2px;
      }
      .section-desc {
        font-size: 10px;
        font-weight: 400;
        color: var(--t3);
        margin-bottom: 12px;
        line-height: 1.5;
        padding-left: 2px;
      }

      /* ── Banner ── */
      .banner {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: var(--radius-lg);
        font-size: 11px;
        font-weight: 500;
        margin-bottom: 14px;
        background: rgba(96, 165, 250, 0.08);
        border: 1px solid rgba(96, 165, 250, 0.12);
        color: var(--t2);
      }
      .banner ha-icon {
        --mdc-icon-size: 16px;
        color: var(--c-info);
        flex-shrink: 0;
      }

      /* ── Item rows ── */
      .item-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 16px;
      }
      .item-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          opacity var(--t-fast);
        user-select: none;
        -webkit-user-select: none;
      }
      @media (hover: hover) {
        .item-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      .item-row.disabled {
        opacity: 0.35;
      }
      .empty-rooms .drag-handle {
        visibility: hidden;
      }
      .empty-rooms .room-icon-btn {
        pointer-events: none;
        opacity: 0.4;
      }
      .item-row.dragging {
        opacity: 0.4;
      }
      .item-row.drop-target {
        border-color: var(--c-accent);
        background: rgba(129, 140, 248, 0.06);
      }

      .card-row {
        padding: 10px;
      }

      /* ── Drag handle ── */
      .drag-handle {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
        color: var(--t4);
        flex-shrink: 0;
        border-radius: 4px;
        transition: color var(--t-fast);
      }
      @media (hover: hover) {
        .drag-handle:hover {
          color: var(--t3);
        }
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 14px;
      }

      /* ── Room icon button ── */
      .room-icon-btn {
        width: 32px;
        height: 32px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: 0;
        font-family: inherit;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .room-icon-btn ha-icon {
        --mdc-icon-size: 16px;
        color: var(--t2);
      }
      @media (hover: hover) {
        .room-icon-btn:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      .room-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Card icon box ── */
      .card-icon-box {
        width: 36px;
        height: 36px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .card-icon-box ha-icon {
        --mdc-icon-size: 18px;
        color: var(--t2);
      }

      /* ── Item info ── */
      .item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .item-name {
        font-size: 12px;
        font-weight: 600;
        color: var(--t2);
        line-height: 1.2;
      }
      .item-meta {
        font-size: 9px;
        font-weight: 400;
        color: var(--t4);
        line-height: 1.2;
      }
      .item-row.disabled .item-name {
        color: var(--t4);
      }

      /* ── Card count badge ── */
      .card-count {
        font-size: 10px;
        font-weight: 600;
        color: var(--t3);
        padding: 2px 8px;
        border-radius: var(--radius-full);
        background: var(--s1);
        border: 1px solid var(--b1);
        flex-shrink: 0;
      }

      /* ── Toggle ── */
      .toggle {
        position: relative;
        width: 38px;
        height: 20px;
        border-radius: 10px;
        background: var(--s2);
        border: 1px solid var(--b2);
        cursor: pointer;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        padding: 0;
        outline: none;
        font-size: 0;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--t3);
        transition:
          transform var(--t-fast),
          background var(--t-fast),
          box-shadow var(--t-fast);
      }
      .toggle.on {
        background: rgba(74, 222, 128, 0.2);
        border-color: rgba(74, 222, 128, 0.3);
      }
      .toggle.on::after {
        transform: translateX(18px);
        background: var(--c-success);
        box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
      }
      .toggle:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Dropdown ── */
      .dropdown {
        position: relative;
        width: 100%;
        margin-bottom: 14px;
      }
      .dropdown-trigger {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 12px;
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .dropdown-trigger:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      .dropdown-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .dropdown-trigger ha-icon {
        --mdc-icon-size: 16px;
      }
      .dropdown-trigger .arrow {
        margin-left: auto;
        color: var(--t3);
        transition: transform var(--t-fast);
      }
      .dropdown.open .dropdown-trigger .arrow {
        transform: rotate(180deg);
      }
      .dropdown-menu {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        z-index: 20;
        min-width: 160px;
        border-radius: var(--radius-lg);
        padding: 4px;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
      }
      .dropdown.open .dropdown-menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: var(--radius-md);
        font-size: 12px;
        font-weight: 500;
        color: var(--t2);
        cursor: pointer;
        transition: all var(--t-fast);
        border: none;
        background: transparent;
        width: 100%;
        font-family: inherit;
        outline: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .dropdown-item:hover {
          background: var(--s3);
          color: var(--t1);
        }
      }
      .dropdown-item:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .dropdown-item.active {
        color: var(--c-accent);
      }
      .dropdown-item ha-icon {
        --mdc-icon-size: 16px;
      }

      /* ── Icon picker ── */
      .icon-picker-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .icon-picker-fold.open {
        grid-template-rows: 1fr;
      }
      .icon-picker-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .icon-picker-fold.open .icon-picker-inner {
        opacity: 1;
      }
      .icon-picker-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 4px;
        padding: 8px 0;
      }
      .icon-pick {
        width: 100%;
        aspect-ratio: 1;
        border-radius: var(--radius-sm);
        background: var(--s1);
        border: 1px solid var(--b1);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: inherit;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .icon-pick ha-icon {
        --mdc-icon-size: 18px;
        color: var(--t2);
      }
      @media (hover: hover) {
        .icon-pick:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      .icon-pick:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .icon-pick.selected {
        background: rgba(129, 140, 248, 0.12);
        border-color: rgba(129, 140, 248, 0.25);
      }

      /* ── Preview ── */
      .preview-encart {
        margin-bottom: 14px;
        padding: 12px;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
      }
      .preview-label {
        font-size: 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 8px;
      }

      /* Preview navbar — miniature faithful to real navbar */
      .preview-navbar {
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 0 6px;
        height: 46px;
        border-radius: 16px;
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
        overflow-x: auto;
        scrollbar-width: none;
      }
      .preview-navbar::-webkit-scrollbar {
        display: none;
      }
      .preview-nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        height: 34px;
        min-width: 34px;
        padding: 0 8px;
        border-radius: 11px;
        background: transparent;
        flex-shrink: 0;
        position: relative;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          opacity var(--t-fast);
        color: var(--t3);
      }
      .preview-nav-item ha-icon {
        --mdc-icon-size: 18px;
        flex-shrink: 0;
      }
      .preview-nav-item.hidden-preview {
        opacity: 0.2;
      }
      .preview-nav-item.active-preview {
        background: rgba(255, 255, 255, 0.1);
        color: var(--t1);
      }
      .preview-nav-item.active-preview ha-icon {
        color: var(--t1);
      }
      .preview-nav-label {
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
        display: grid;
        grid-template-columns: 0fr;
        overflow: hidden;
        transition: grid-template-columns 0.35s var(--ease-out);
      }
      .preview-nav-item.active-preview .preview-nav-label {
        grid-template-columns: 1fr;
      }
      .preview-nav-label span {
        min-width: 0;
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .preview-nav-item.active-preview .preview-nav-label span {
        opacity: 1;
      }

      /* Preview navbar — live indicators */
      .preview-nav-item.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%, 100% { filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6)); }
        50% { filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.2)); }
      }
      .preview-nav-item.has-humidity::after {
        content: '';
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 12px;
        height: 2px;
        border-radius: 2px;
        background: var(--c-info);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
      }
      .preview-nav-item.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      .preview-nav-item.has-light.has-music ha-icon {
        color: var(--c-light-glow);
        animation: pulse-light 3s ease-in-out infinite, pulse-music 0.8s ease-in-out infinite;
      }
      @keyframes pulse-music {
        0%, 100% { transform: scale(1); }
        30% { transform: scale(1.2); }
        50% { transform: scale(0.95); }
        70% { transform: scale(1.1); }
      }
      .preview-temp-badge {
        position: absolute;
        top: 1px;
        right: 3px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .preview-temp-badge ha-icon {
        --mdc-icon-size: 8px;
      }
      .preview-nav-item.has-temp-hot .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(248, 113, 113, 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .preview-nav-item.has-temp-cold .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(248, 113, 113, 0.6)); }
      }
      @keyframes pulse-temp-cold {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.6)); }
      }

      /* Preview popup — faithful miniature of real popup */
      .preview-popup {
        border-radius: var(--radius-lg);
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
        padding: 12px;
        overflow: hidden;
      }
      .preview-popup-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }
      .preview-popup-header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .preview-popup-icon-box {
        width: 30px;
        height: 30px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t2);
      }
      .preview-popup-icon-box ha-icon {
        --mdc-icon-size: 15px;
      }
      .preview-popup-icon-box.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.6));
      }
      .preview-popup-icon-box.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      .preview-popup-scene-dash {
        width: 10px;
        height: 2px;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 4px;
        opacity: 0;
        transition: opacity 0.3s var(--ease-std);
      }
      .preview-popup-scene-dash.visible {
        opacity: 1;
      }
      .preview-popup-info {
        flex: 1;
        min-width: 0;
      }
      .preview-popup-name {
        font-size: 12px;
        font-weight: 700;
        color: var(--t1);
        line-height: 1.2;
      }
      .preview-popup-meta {
        display: flex;
        gap: 8px;
        font-size: 9px;
        font-weight: 500;
        color: var(--t3);
        margin-top: 2px;
      }
      .preview-popup-close {
        width: 20px;
        height: 20px;
        border-radius: var(--radius-sm);
        background: transparent;
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--t3);
        pointer-events: none;
      }
      .preview-popup-close ha-icon {
        --mdc-icon-size: 10px;
      }

      /* Preview popup scenes */
      .preview-popup-scenes {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding-bottom: 8px;
      }
      .preview-scene-chip {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        padding: 3px 8px;
        font-size: 7px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--t3);
        transition: opacity var(--t-fast);
      }
      .preview-scene-chip.hidden-scene {
        opacity: 0.2;
      }

      /* Preview popup cards */
      .preview-popup-cards {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .preview-card-slot {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border-radius: var(--radius-sm);
        background: var(--s1);
        border: 1px solid var(--b1);
        transition: opacity var(--t-fast);
      }
      .preview-card-slot ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t3);
      }
      .preview-card-slot-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t2);
      }
      .preview-card-slot-count {
        margin-left: auto;
        font-size: 9px;
        font-weight: 600;
        color: var(--t4);
        padding: 1px 6px;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .preview-empty {
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        text-align: center;
        padding: 12px 0;
      }

      /* Preview light card */
      .preview-light {
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .preview-light-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
        padding: 0 4px;
      }
      .preview-light-header-left {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .preview-light-title {
        font-size: 7px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .preview-light-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 14px;
        height: 14px;
        padding: 0 4px;
        border-radius: var(--radius-full);
        font-size: 7px;
        font-weight: 700;
      }
      .preview-light-count.none {
        background: var(--s2);
        color: var(--t3);
      }
      .preview-light-count.some {
        background: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
      }
      .preview-light-count.all {
        background: rgba(251, 191, 36, 0.2);
        color: var(--c-light-glow);
      }
      .preview-light-toggle {
        width: 28px;
        height: 14px;
        border-radius: 7px;
        background: var(--s2);
        border: 1px solid var(--b2);
        position: relative;
        pointer-events: none;
      }
      .preview-light-toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--t3);
        transition: transform var(--t-fast), background var(--t-fast);
      }
      .preview-light-toggle.on {
        background: rgba(251, 191, 36, 0.2);
        border-color: rgba(251, 191, 36, 0.3);
      }
      .preview-light-toggle.on::after {
        transform: translateX(14px);
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.4);
      }
      .preview-light-body {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0.02) 100%
        );
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
          0 8px 24px rgba(0, 0, 0, 0.3);
        border: 1px solid var(--b1);
        padding: 8px;
        position: relative;
        overflow: hidden;
      }
      .preview-light-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        position: relative;
        z-index: 1;
      }
      .preview-light-row {
        display: flex;
        align-items: center;
        gap: 6px;
        grid-column: 1 / -1;
        padding: 5px 4px;
        border-radius: 6px;
        transition: opacity var(--t-fast);
      }
      .preview-light-row.compact {
        grid-column: span 1;
      }
      .preview-light-row.compact-right {
        padding-left: 8px;
        position: relative;
      }
      .preview-light-row.compact-right::before {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        bottom: 20%;
        width: 1px;
        background: linear-gradient(
          to bottom,
          transparent,
          rgba(255, 255, 255, 0.08) 30%,
          rgba(255, 255, 255, 0.08) 70%,
          transparent
        );
      }
      .preview-light-row.hidden-light {
        opacity: 0.2;
      }
      .preview-light-icon {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--t3);
      }
      .preview-light-icon ha-icon {
        --mdc-icon-size: 12px;
      }
      .preview-light-icon.on {
        background: rgba(251, 191, 36, 0.1);
        border-color: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.4));
      }
      .preview-light-info {
        flex: 1;
        min-width: 0;
      }
      .preview-light-name {
        font-size: 9px;
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .preview-light-sub {
        font-size: 7px;
        font-weight: 500;
        color: var(--t3);
        margin-top: 1px;
      }
      .preview-light-row[data-on='true'] .preview-light-sub {
        color: rgba(251, 191, 36, 0.55);
      }
      .preview-light-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
        transition: background var(--t-fast), box-shadow var(--t-fast);
      }
      .preview-light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.5);
      }
      .preview-light-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        transition: opacity var(--t-slow);
      }
      .preview-light-sched {
        --mdc-icon-size: 10px;
        color: var(--c-accent);
        flex-shrink: 0;
        opacity: 0.7;
      }
      .preview-light-layout-tag {
        font-size: 6px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: 3px;
        padding: 1px 4px;
        flex-shrink: 0;
      }

      /* ── Preview weather (realistic miniature) ── */
      .preview-weather {
        border-radius: var(--radius-lg);
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
        overflow: hidden;
        position: relative;
      }
      .pw-tint {
        position: absolute; inset: 0;
        border-radius: inherit;
        pointer-events: none; z-index: 0;
      }
      .pw-content {
        position: relative; z-index: 1;
        padding: 10px;
        display: flex; flex-direction: column; gap: 6px;
      }
      .pw-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .pw-header-left {
        display: flex; flex-direction: column; gap: 1px;
      }
      .pw-time {
        font-size: 18px; font-weight: 300; color: var(--t1); line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .pw-time .pw-sec {
        font-size: 8px; font-weight: 400; color: var(--t4);
      }
      .pw-date {
        font-size: 7px; color: var(--t3);
        text-transform: capitalize;
      }
      .pw-date::first-letter { font-weight: 700; }
      .pw-header-right {
        display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
      }
      .pw-temp {
        font-size: 20px; font-weight: 700; color: var(--t1); line-height: 1;
      }
      .pw-temp-unit {
        font-size: 8px; font-weight: 400; color: var(--t3); vertical-align: super;
      }
      .pw-cond {
        display: flex; align-items: center; gap: 3px;
        font-size: 7px; font-weight: 500; color: var(--t3);
      }
      .pw-cond ha-icon {
        --mdc-icon-size: 10px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-feels {
        font-size: 6px; color: var(--t4);
      }
      /* ── Sparkline ── */
      .pw-spark-zone {
        height: 44px; position: relative; overflow: hidden;
        border-radius: var(--radius-sm);
      }
      .pw-spark-svg {
        display: block; width: 100%; height: 100%;
      }
      .pw-spark-now {
        position: absolute; top: 0; bottom: 16px; width: 1px;
        background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.5) 70%, transparent 100%);
        transform: translateX(-50%);
      }
      .pw-spark-now-dot {
        position: absolute; left: 50%; transform: translate(-50%, -50%);
        width: 4px; height: 4px; border-radius: 50%;
        background: white;
        box-shadow: 0 0 4px rgba(255,255,255,0.8);
      }
      .pw-spark-labels {
        position: absolute; bottom: 0; left: 0; right: 0; height: 12px;
      }
      .pw-spark-lbl {
        position: absolute; transform: translateX(-50%);
        font-size: 5px; color: var(--t4);
        font-variant-numeric: tabular-nums;
      }
      /* ── Metrics ── */
      .pw-metrics {
        display: grid;
        gap: 1px;
        border-radius: var(--radius-sm);
        background: var(--b1);
        overflow: hidden;
      }
      .pw-metric {
        display: flex; align-items: center; justify-content: center; gap: 2px;
        padding: 4px 3px;
        background: var(--s1);
      }
      .pw-metric ha-icon {
        --mdc-icon-size: 9px;
        width: 9px; height: 9px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t4);
      }
      .pw-metric.humidity ha-icon { color: rgba(96,165,250,0.5); }
      .pw-metric.wind ha-icon { color: rgba(110,231,183,0.5); }
      .pw-metric.pressure ha-icon { color: rgba(148,163,184,0.5); }
      .pw-metric.uv ha-icon { color: rgba(251,191,36,0.5); }
      .pw-metric.visibility ha-icon { color: rgba(148,163,184,0.4); }
      .pw-metric.sunrise ha-icon { color: rgba(251,191,36,0.4); }
      .pw-metric.sunset ha-icon { color: rgba(251,146,60,0.5); }
      .pw-metric-val { font-size: 7px; font-weight: 600; color: var(--t2); }
      .pw-metric-unit { font-size: 5px; font-weight: 400; color: var(--t4); }
      .pw-metric-dir { font-size: 6px; font-weight: 700; color: var(--t3); }
      /* ── Forecast ── */
      .pw-forecast-zone {
        display: flex; flex-direction: column; gap: 4px;
      }
      .pw-tabs {
        display: flex; justify-content: center; gap: 4px;
      }
      .pw-tab {
        font-size: 7px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
        color: var(--t4);
        padding: 2px 6px;
        border-radius: 100px;
        border: 1px solid var(--b1);
        background: transparent;
      }
      .pw-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .pw-fold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0.3;
      }
      .pw-daily-list {
        display: flex; flex-direction: column; gap: 1px;
      }
      .pw-day-row {
        display: grid;
        grid-template-columns: 28px 14px 1fr 24px;
        align-items: center;
        gap: 4px;
        padding: 2px 4px;
        border-radius: var(--radius-sm);
      }
      .pw-day-row.today {
        background: var(--s2);
      }
      .pw-day-label {
        font-size: 7px; font-weight: 600; color: var(--t3);
      }
      .pw-day-row.today .pw-day-label { color: var(--t2); }
      .pw-day-icon {
        --mdc-icon-size: 10px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-day-temps {
        display: flex; align-items: baseline; gap: 3px;
      }
      .pw-day-high {
        font-size: 7px; font-weight: 700; color: var(--t2);
      }
      .pw-day-low {
        font-size: 6px; font-weight: 400; color: var(--t4);
      }
      .pw-day-precip {
        font-size: 6px; color: rgba(96,165,250,0.5);
        text-align: right;
      }

      /* ── Preview dashboard ── */
      .preview-dashboard {
        border-radius: var(--radius-lg);
        background: rgba(17, 24, 39, 0.6);
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 80px;
      }
      .preview-dashboard-cards {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .preview-dashboard-navbar {
        display: flex;
        gap: 6px;
        justify-content: center;
        padding: 4px 8px;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        margin-top: auto;
      }
      .preview-dashboard-navbar ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t3);
      }
      .preview-dashboard-card {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: var(--radius-md);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0.02) 100%
        );
        border: 1px solid var(--b1);
        font-size: 10px;
        font-weight: 600;
        color: var(--t2);
      }
      .preview-dashboard-card ha-icon {
        --mdc-icon-size: 16px;
        color: var(--t3);
      }
      .preview-dashboard-card.weather ha-icon {
        color: rgba(251, 191, 36, 0.7);
      }
      .preview-dashboard-card.light ha-icon {
        color: rgba(251, 191, 36, 0.5);
      }
      .preview-dashboard-empty {
        text-align: center;
        color: var(--t4);
        font-size: 11px;
        padding: 16px 0;
      }

      /* ── Feature toggles ── */
      .feature-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 14px;
      }
      .feature-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--radius-md);
        transition: background var(--t-fast);
        border: none;
        background: none;
        width: 100%;
        cursor: pointer;
        font-family: inherit;
        outline: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .feature-row:hover {
          background: var(--s1);
        }
      }
      .feature-row:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .feature-icon {
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .feature-icon ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t2);
      }
      .feature-text {
        flex: 1;
        min-width: 0;
      }
      .feature-name {
        font-size: 11px;
        font-weight: 600;
        color: var(--t1);
      }
      .feature-desc {
        font-size: 9px;
        color: var(--t3);
        margin-top: 1px;
      }
      .feature-row .feature-name {
        color: var(--t1);
      }

      /* ── Threshold inputs ── */
      .threshold-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 14px;
      }
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 10px;
      }
      .threshold-icon {
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .threshold-icon ha-icon {
        --mdc-icon-size: 14px;
        color: var(--t2);
      }
      .threshold-icon.hot ha-icon { color: var(--c-temp-hot); }
      .threshold-icon.cold ha-icon { color: var(--c-temp-cold); }
      .threshold-icon.humidity ha-icon { color: var(--c-info); }
      .threshold-label {
        flex: 1;
        min-width: 0;
        font-size: 11px;
        font-weight: 600;
        color: var(--t2);
      }
      .threshold-input {
        width: 56px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t1);
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        outline: none;
        transition: border-color var(--t-fast);
        -webkit-appearance: none;
        -moz-appearance: textfield;
      }
      .threshold-input:focus {
        border-color: var(--c-accent);
      }
      .threshold-input::-webkit-inner-spin-button,
      .threshold-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .threshold-unit {
        font-size: 10px;
        font-weight: 500;
        color: var(--t4);
        width: 16px;
      }

      /* ── Light row extras ── */
      .light-state {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;
        flex-shrink: 0;
      }
      .light-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--t4);
      }
      .light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.5);
      }
      .light-brightness {
        font-size: 9px;
        font-weight: 600;
        color: var(--t3);
        min-width: 28px;
        text-align: right;
      }
      .layout-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        padding: 0 8px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t3);
        font-family: inherit;
        font-size: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        cursor: pointer;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          border-color var(--t-fast);
        outline: none;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .layout-btn:hover {
          background: var(--s3);
          color: var(--t2);
          border-color: var(--b3);
        }
      }
      .layout-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Schedule button (btn-icon.xs pattern from kit) ── */
      .schedule-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--t4);
        cursor: pointer;
        flex-shrink: 0;
        padding: 0;
        transition: all var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        --mdc-icon-size: 16px;
      }
      .schedule-btn.active {
        color: var(--c-accent);
        border-color: rgba(129,140,248,0.25);
        background: rgba(129,140,248,0.12);
      }
      @media (hover: hover) {
        .schedule-btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      .schedule-btn:active { transform: scale(0.96); }
      .schedule-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Item card wrapper ── */
      .item-card {
        border-radius: var(--radius-md);
        overflow: hidden;
        border: 1px solid var(--b1);
        background: var(--s1);
        transition: border-color var(--t-fast);
      }
      .item-card .item-row {
        border: none;
        border-radius: 0;
        background: transparent;
      }
      @media (hover: hover) {
        .item-card:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      .item-card.expanded {
        border-color: var(--b2);
      }
      .item-card.expanded .item-row {
        border-bottom: none;
      }
      .item-card .item-row.disabled {
        opacity: 0.35;
      }

      /* ── Fold separator (from kit) ── */
      .fold-sep {
        height: 1px;
        margin: 0 12px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .fold-sep.visible { opacity: 1; }

      /* ── Schedule fold (CSS Grid 0fr/1fr from kit) ── */
      .schedule-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .schedule-fold.open {
        grid-template-rows: 1fr;
      }
      .schedule-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .schedule-fold.open .schedule-fold-inner {
        opacity: 1;
      }
      .schedule-body {
        padding: 10px 12px 12px 36px;
      }
      .schedule-header {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t3);
        margin-bottom: 8px;
      }
      .schedule-period {
        padding: 8px 0;
        border-bottom: 1px solid var(--b1);
      }
      .schedule-period:last-of-type {
        border-bottom: none;
      }
      .schedule-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }
      .schedule-row-actions {
        justify-content: space-between;
        margin-bottom: 0;
      }
      .schedule-label {
        font-size: 11px;
        font-weight: 500;
        color: var(--t3);
        min-width: 36px;
        flex-shrink: 0;
      }
      /* ── Input (from kit) ── */
      .input {
        width: 100%;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 13px;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .input:focus { border-color: var(--b3); }
      .input::placeholder { color: var(--t4); }
      /* schedule-input removed — replaced by .datetime-display */

      /* ── Check item (from kit) ── */
      .check-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        font-family: inherit;
      }
      .check-box {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: 2px solid var(--b3);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--t-fast);
        flex-shrink: 0;
        --mdc-icon-size: 12px;
      }
      .check-box ha-icon {
        opacity: 0;
        transform: scale(0);
        transition: all var(--t-fast);
        color: #fff;
      }
      .check-item.checked .check-box {
        background: var(--c-accent);
        border-color: var(--c-accent);
        box-shadow: 0 0 6px rgba(129,140,248,0.3);
      }
      .check-item.checked .check-box ha-icon {
        opacity: 1;
        transform: scale(1);
      }
      .check-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--t2);
      }
      .check-item.checked .check-label {
        color: var(--t1);
      }

      /* ── Schedule delete (btn-icon.xs btn-alert from kit) ── */
      .schedule-delete {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(248,113,113,0.2);
        background: rgba(248,113,113,0.1);
        color: var(--c-alert);
        cursor: pointer;
        padding: 0;
        --mdc-icon-size: 14px;
        transition: all var(--t-fast);
        outline: none;
      }
      @media (hover: hover) {
        .schedule-delete:hover {
          background: rgba(248,113,113,0.2);
          border-color: rgba(248,113,113,0.3);
        }
      }
      .schedule-delete:active { transform: scale(0.96); }

      /* ── Schedule add & save (btn btn-sm from kit) ── */
      .schedule-add {
        width: 100%;
        margin-top: 8px;
        border-style: dashed;
        --mdc-icon-size: 14px;
      }
      .schedule-save {
        margin-top: 8px;
        width: 100%;
      }

      /* ── Hint & explanation texts ── */
      .schedule-hint,
      .dashboard-vs-room {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        margin-top: 12px;
        padding: 8px 10px;
        background: var(--s1);
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        font-size: 11px;
        line-height: 1.4;
        color: var(--t3);
        --mdc-icon-size: 14px;
      }
      .schedule-hint ha-icon,
      .dashboard-vs-room ha-icon {
        flex-shrink: 0;
        margin-top: 1px;
        color: var(--c-info);
      }

      /* ── DateTime display trigger ── */
      .datetime-display {
        flex: 1;
        min-width: 0;
        padding: 6px 10px;
        border-radius: 10px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        transition: border-color var(--t-fast);
        text-align: left;
        outline: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .datetime-display:hover { border-color: var(--b3); }
      .datetime-display:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .datetime-display.empty { color: var(--t4); }

      /* ── DateTime picker popup ── */
      .picker-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
        animation: picker-fade-in var(--t-fast) ease-out;
      }
      @keyframes picker-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .picker-popup {
        width: 280px;
        padding: 16px;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s3);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      }
      .picker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px 10px;
      }
      .picker-month {
        font-size: 13px;
        font-weight: 700;
        color: var(--t1);
      }
      .picker-nav {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--radius-sm);
        border: none;
        background: transparent;
        color: var(--t3);
        cursor: pointer;
        padding: 0;
        outline: none;
        transition: all var(--t-fast);
        --mdc-icon-size: 16px;
      }
      .picker-nav:hover { background: var(--s2); color: var(--t1); }
      .picker-nav:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .picker-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
      }
      .picker-day-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        text-align: center;
        padding: 4px 0;
      }
      .picker-day {
        aspect-ratio: 1;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 500;
        color: var(--t3);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
        font-family: inherit;
        padding: 0;
      }
      .picker-day:hover { background: var(--s2); color: var(--t1); }
      .picker-day.today { border: 1px solid var(--b3); color: var(--t1); }
      .picker-day.selected {
        background: rgba(129,140,248,0.2);
        color: var(--c-accent);
        font-weight: 700;
        border: 1px solid rgba(129,140,248,0.3);
      }
      .picker-day.range-start {
        background: var(--c-accent);
        color: #fff;
        font-weight: 700;
        border-radius: var(--radius-sm) 0 0 var(--radius-sm);
      }
      .picker-day.range-end {
        background: var(--c-accent);
        color: #fff;
        font-weight: 700;
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      }
      .picker-day.range-start.range-end {
        border-radius: var(--radius-sm);
      }
      .picker-day.in-range {
        background: rgba(129,140,248,0.12);
        color: var(--c-accent);
        border-radius: 0;
      }
      .picker-day.other-month { opacity: 0.3; }

      /* ── Picker phase indicator ── */
      .picker-phase {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 10px;
      }
      .picker-phase-btn {
        padding: 4px 12px;
        border-radius: 8px;
        border: 1px solid var(--b1);
        background: transparent;
        color: var(--t3);
        font-family: inherit;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--t-fast);
        outline: none;
      }
      .picker-phase-btn.active {
        background: rgba(129,140,248,0.15);
        color: var(--c-accent);
        border-color: rgba(129,140,248,0.3);
      }

      /* ── Time picker ── */
      .picker-time-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid var(--b1);
      }
      .picker-time-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .picker-time-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }
      .time-input {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .time-digit {
        width: 44px;
        height: 40px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 16px;
        font-weight: 700;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .time-digit:focus { border-color: var(--c-accent); }
      .time-sep {
        font-size: 18px;
        font-weight: 700;
        color: var(--t3);
      }

      /* ── Picker confirm button ── */
      .picker-confirm {
        margin-top: 14px;
        width: 100%;
      }

      /* ── Save bar ── */
      .save-bar {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-weight: 600;
        cursor: pointer;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        height: 36px;
        padding: 0 14px;
        border-radius: 12px;
        font-size: 12px;
      }
      @media (hover: hover) {
        .btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      .btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .btn-accent {
        border-color: rgba(129, 140, 248, 0.25);
        background: rgba(129, 140, 248, 0.12);
        color: var(--c-accent);
      }
      @media (hover: hover) {
        .btn-accent:hover {
          background: rgba(129, 140, 248, 0.2);
          border-color: rgba(129, 140, 248, 0.35);
        }
      }
      .btn-accent:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .btn-ghost {
        border-color: transparent;
        background: transparent;
      }
      @media (hover: hover) {
        .btn-ghost:hover {
          background: var(--s2);
        }
      }

      /* ── Toast ── */
      .toast {
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        padding: 10px 18px;
        border-radius: var(--radius-lg);
        backdrop-filter: blur(20px);
        font-family: inherit;
        font-size: 12px;
        font-weight: 500;
        opacity: 0;
        z-index: 200;
        pointer-events: none;
        transition:
          opacity var(--t-fast),
          transform var(--t-fast);
        background: rgba(74, 222, 128, 0.15);
        border: 1px solid rgba(74, 222, 128, 0.2);
        color: var(--c-success);
      }
      .toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .toast.error {
        background: rgba(248, 113, 113, 0.15);
        border: 1px solid rgba(248, 113, 113, 0.2);
        color: var(--c-alert);
      }

      /* ── Entry animation ── */
      .config-panel {
        animation: panel-in 0.4s var(--ease-out) both;
      }
    `]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,document.removeEventListener("click",this._boundCloseDropdowns),this._removeTabsScrollListener(),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),this._backend=void 0}_closeDropdownsOnOutsideClick(e){if(!this._dropdownOpen&&!this._lightDropdownOpen&&!this._weatherDropdownOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown");for(const r of a)if(t.includes(r))return;this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1}_setupTabsScrollListener(){if(this._tabsEl)return;const e=this.shadowRoot?.querySelector(".tabs");e&&(this._tabsEl=e,e.addEventListener("scroll",this._boundUpdateScrollMask,{passive:!0}),this._updateScrollMask())}_removeTabsScrollListener(){this._tabsEl&&(this._tabsEl.removeEventListener("scroll",this._boundUpdateScrollMask),this._tabsEl=null)}_updateScrollMask(){const e=this._tabsEl;if(!e)return;const t=e.scrollLeft<=5,i=e.scrollLeft+e.offsetWidth>=e.scrollWidth-5;e.classList.remove("mask-left","mask-right","mask-both"),t&&!i?e.classList.add("mask-right"):!t&&i?e.classList.add("mask-left"):t||i||e.classList.add("mask-both")}updated(e){super.updated(e),this._setupTabsScrollListener(),e.has("hass")&&(this.hass?.language&&be(this.hass.language)&&(this._lang=fe()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1),this.hass&&!this._loaded&&(this._loaded=!0,this._backend=new Se(this.hass),this._loadConfig()))}async _loadConfig(){if(this.hass&&!this._loading){this._loading=!0;try{await this._loadConfigInner()}finally{this._loading=!1}}}async _loadConfigInner(){if(!this.hass)return;const e=Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let t={room_order:[],hidden_rooms:[],show_lights:!0,show_temperature:!0,show_humidity:!0,show_media:!0,auto_sort:!0,temp_high:24,temp_low:17,humidity_threshold:65},i={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0},a={enabled_cards:["weather"]};const r={};try{if(!this._backend)throw new Error("No backend");const e=await this._backend.send("get_config");t=e.navbar,Object.assign(r,e.rooms),e.weather&&(i=e.weather),e.dashboard&&(a=e.dashboard)}catch{}this._showLights=t.show_lights??!0,this._showTemperature=t.show_temperature??!0,this._showHumidity=t.show_humidity??!0,this._showMedia=t.show_media??!0,this._autoSort=t.auto_sort??!0,this._tempHigh=t.temp_high??24,this._tempLow=t.temp_low??17,this._humidityThreshold=t.humidity_threshold??65,this._weatherEntity=i.entity_id??"",this._weatherHiddenMetrics=i.hidden_metrics??[],this._weatherShowDaily=i.show_daily??!0,this._weatherShowHourly=i.show_hourly??!0,this._dashboardEnabledCards=a.enabled_cards??["weather"];const s=new Set(t.hidden_rooms),o=new Map;t.room_order.forEach((e,t)=>o.set(e,t));const n=this.hass;if(!n)return;const d=[],c=[];for(const l of e){const e=$e(l.area_id,n.entities,n.devices),t=r[l.area_id]?.icon,i=t||l.icon||"mdi:home";if(0===e.length){c.push({areaId:l.area_id,name:l.name,icon:i});continue}let a=0,o=null,h=null,p=null,u=null,g=!1;for(const r of e){const e=n.states[r.entity_id];if(!e)continue;const t=r.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&a++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||o||(o=`${e.state}°`,h=parseFloat(e.state)),"humidity"!==t||p||(p=`${e.state}%`,u=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(g=!0)}d.push({areaId:l.area_id,name:l.name,icon:i,entityCount:e.length,visible:!s.has(l.area_id),lightsOn:a,temperature:o,tempValue:h,humidity:p,humidityValue:u,mediaPlaying:g})}this._initialIcons.clear();for(const l of d)this._initialIcons.set(l.areaId,l.icon);d.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=o.get(e.areaId),a=o.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._rooms=d,this._emptyRooms=c,!this._selectedRoom&&d.length>0&&(this._selectedRoom=d[0].areaId),this._loadRoomCards()}async _loadRoomCards(){if(!this.hass||!this._selectedRoom)return this._cards=[],void(this._scenes=[]);const e=$e(this._selectedRoom,this.hass.entities,this.hass.devices);let t=null,i=new Set,a=new Set,r=[];try{if(!this._backend)throw new Error("No backend");const e=await this._backend.send("get_room",{area_id:this._selectedRoom});e&&(t=e.card_order.length>0?e.card_order:null,i=new Set(e.hidden_entities),a=new Set(e.hidden_scenes??[]),r=e.scene_order??[])}catch{}const s=this.hass,o=e.filter(e=>e.entity_id.startsWith("scene.")),n=new Map;r.forEach((e,t)=>n.set(e,t));const d=o.map(e=>{const t=s.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!a.has(e.entity_id)}});d.sort((e,t)=>{const i=n.get(e.entityId),a=n.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._scenes=d;const c=new Map;for(const p of e){if(i.has(p.entity_id))continue;const e=p.entity_id.split(".")[0];c.set(e,(c.get(e)||0)+1)}const l=t?[...t]:[...Ae],h=new Set(l);for(const p of c.keys())!h.has(p)&&Me[p]&&l.push(p);this._cards=l.filter(e=>(c.get(e)||0)>0&&De.has(e)).map(e=>{const i=function(e){const t=Te[e];return{nameKey:t?t.name:null,icon:Me[e]||"mdi:help-circle",descKey:t?t.desc:null}}(e),a=c.get(e)||0;return{id:e,nameKey:i.nameKey,icon:i.icon,descKey:i.descKey,count:a,visible:t?t.includes(e):a>0}})}_switchTab(e){this._tab=e,this._iconPickerRoom=null,this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,"light"===e&&!this._lightRoom&&this._rooms.length>0&&(this._lightRoom=this._rooms[0].areaId,this._loadRoomLights())}_onDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("rooms"===i){const t=[...this._rooms],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._rooms=t}else if("cards"===i){const t=[...this._cards],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._cards=t}else if("scenes"===i){const t=[...this._scenes],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._scenes=t}else if("lights"===i){const t=[...this._lights],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._lights=t}this._dragIdx=null,this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_toggleRoomVisible(e){const t=this._rooms.map(t=>t.areaId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),a=t.filter(e=>!e.visible);this._rooms=[...i,...a]}_openIconPicker(e){this._iconPickerRoom=this._iconPickerRoom===e?null:e}_setRoomIcon(e,t){this._rooms=this._rooms.map(i=>i.areaId===e?{...i,icon:t}:i),this._iconPickerRoom=null}_toggleCardVisible(e){this._cards=this._cards.map(t=>t.id===e?{...t,visible:!t.visible}:t)}_toggleSceneVisible(e){this._scenes=this._scenes.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_selectRoom(e){this._selectedRoom=e,this._dropdownOpen=!1,this._loadRoomCards()}async _saveNavbar(){const e=this._backend;if(e&&!this._saving){this._saving=!0;try{await e.send("set_navbar",{room_order:this._rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:this._rooms.filter(e=>!e.visible).map(e=>e.areaId),show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity,show_media:this._showMedia,auto_sort:this._autoSort,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold});const t=this._rooms.filter(e=>e.icon!==this._initialIcons.get(e.areaId)).map(t=>{const i=this.hass?.areas[t.areaId],a=i?.icon||"mdi:home",r=t.icon===a?null:t.icon;return e.send("set_room",{area_id:t.areaId,icon:r})});if(t.length>0&&await Promise.all(t),!this._mounted)return;this._showToast(),pe.emit("navbar-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _savePopup(){if(this._backend&&!this._saving&&this._selectedRoom){this._saving=!0;try{if(await this._backend.send("set_room",{area_id:this._selectedRoom,card_order:this._cards.filter(e=>e.visible).map(e=>e.id),hidden_scenes:this._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:this._scenes.map(e=>e.entityId)}),!this._mounted)return;this._showToast(),pe.emit("room-config-changed",{areaId:this._selectedRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}_save(){"navbar"===this._tab?this._saveNavbar():"popup"===this._tab?this._savePopup():"light"===this._tab?this._saveLights():"weather"===this._tab?this._saveWeather():this._saveDashboard()}_selectLightRoom(e){this._lightRoom=e,this._lightDropdownOpen=!1,this._loadRoomLights()}async _loadRoomLights(){if(!this.hass||!this._lightRoom)return void(this._lights=[]);const e=$e(this._lightRoom,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light."));let t=new Set,i=[],a={};try{if(!this._backend)throw new Error("No backend");const e=await this._backend.send("get_room",{area_id:this._lightRoom});e&&(t=new Set(e.hidden_entities??[]),i=e.entity_order??[],a=e.entity_layouts??{})}catch{}const r=this.hass,s=new Map;i.forEach((e,t)=>s.set(e,t));const o=e.map(e=>{const i=r.states[e.entity_id],s="on"===i?.state,o=i?.attributes.brightness,n=s&&void 0!==o?Math.round(o/255*100):0;return{entityId:e.entity_id,name:i?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:s,brightnessPct:n,layout:a[e.entity_id]||"compact",visible:!t.has(e.entity_id)}});o.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=s.get(e.entityId),a=s.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._lights=o;try{if(this._backend){const e=await this._backend.send("get_schedules");this._schedulesLoaded=e??{},this._scheduleEdits=new Map;for(const t of o){const e=this._schedulesLoaded[t.entityId];this._scheduleEdits.set(t.entityId,e?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}_toggleLightVisible(e){const t=this._lights.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),a=t.filter(e=>!e.visible);this._lights=[...i,...a]}_cycleLightLayout(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleScheduleExpand(e){if(this._scheduleExpandedEntity=this._scheduleExpandedEntity===e?null:e,!this._scheduleEdits.has(e)){const t=this._schedulesLoaded[e];this._scheduleEdits.set(e,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}this.requestUpdate()}_addSchedulePeriod(e){const t=this._scheduleEdits.get(e)??[];t.push({start:"",end:"",recurring:!1}),this._scheduleEdits.set(e,[...t]),this.requestUpdate()}_removeSchedulePeriod(e,t){const i=this._scheduleEdits.get(e)??[];i.splice(t,1),this._scheduleEdits.set(e,[...i]),this.requestUpdate()}_updateSchedulePeriod(e,t,i,a){const r=this._scheduleEdits.get(e)??[];r[t]&&(r[t]={...r[t],[i]:a},this._scheduleEdits.set(e,[...r]),this.requestUpdate())}_toggleScheduleRecurring(e,t){const i=this._scheduleEdits.get(e)??[];i[t]&&(i[t]={...i[t],recurring:!i[t].recurring},this._scheduleEdits.set(e,[...i]),this.requestUpdate())}async _saveSchedule(e){if(!this._backend)return;const t=(this._scheduleEdits.get(e)??[]).filter(e=>e.start&&e.end);try{if(await this._backend.send("set_schedule",{entity_id:e,periods:t}),!this._mounted)return;this._showToast(),pe.emit("schedule-changed",{entityId:e})}catch{if(!this._mounted)return;this._showToast(!0)}}_parseDateTimeValue(e){if(!e)return null;const[t,i]=e.split("T");if(!t)return null;const a=t.split("-").map(Number);if(a.length<3||a.some(isNaN))return null;const[r,s,o]=a,[n,d]=(i??"00:00").split(":");return{year:r,month:s-1,day:o,hour:n??"00",minute:d??"00"}}_openRangePicker(e,t){this._pickerTarget={entityId:e,periodIdx:t};const i=(this._scheduleEdits.get(e)??[])[t],a=i?this._parseDateTimeValue(i.start):null,r=i?this._parseDateTimeValue(i.end):null,s=new Date;a?(this._pickerStartDay=a.day,this._pickerStartMonth=a.month,this._pickerStartYear=a.year,this._pickerStartHour=a.hour,this._pickerStartMinute=a.minute,this._pickerYear=a.year,this._pickerMonth=a.month):(this._pickerStartDay=null,this._pickerStartMonth=s.getMonth(),this._pickerStartYear=s.getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerYear=s.getFullYear(),this._pickerMonth=s.getMonth()),r?(this._pickerEndDay=r.day,this._pickerEndMonth=r.month,this._pickerEndYear=r.year,this._pickerEndHour=r.hour,this._pickerEndMinute=r.minute):(this._pickerEndDay=null,this._pickerEndMonth=s.getMonth(),this._pickerEndYear=s.getFullYear(),this._pickerEndHour="23",this._pickerEndMinute="59"),this._pickerPhase=a?r?"start":"end":"start",this._pickerOpen=!0}_closePicker(){this._pickerOpen=!1,this._pickerTarget=null}_pickerPrevMonth(){0===this._pickerMonth?(this._pickerMonth=11,this._pickerYear--):this._pickerMonth--}_pickerNextMonth(){11===this._pickerMonth?(this._pickerMonth=0,this._pickerYear++):this._pickerMonth++}_pickerSelectDay(e,t){if(!t)if("start"===this._pickerPhase){if(this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerPhase="end",null!==this._pickerEndDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,e).getTime();new Date(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay).getTime()<t&&(this._pickerEndDay=null)}}else{if(null!==this._pickerStartDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay).getTime();if(new Date(this._pickerYear,this._pickerMonth,e).getTime()<t)return this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerEndDay=null,void(this._pickerPhase="start")}this._pickerEndDay=e,this._pickerEndMonth=this._pickerMonth,this._pickerEndYear=this._pickerYear}}_pickerSetTime(e,t){const i=t.target.value.replace(/\D/g,"").slice(0,2),a=e.includes("Hour"),r=Math.min(a?23:59,Math.max(0,parseInt(i,10)||0)),s=String(r).padStart(2,"0");t.target.value=s,"startHour"===e?this._pickerStartHour=s:"startMinute"===e?this._pickerStartMinute=s:"endHour"===e?this._pickerEndHour=s:this._pickerEndMinute=s,this.requestUpdate()}_pickerConfirm(){if(!this._pickerTarget||null===this._pickerStartDay||null===this._pickerEndDay)return;const{entityId:e,periodIdx:t}=this._pickerTarget,i=String(this._pickerStartMonth+1).padStart(2,"0"),a=String(this._pickerStartDay).padStart(2,"0"),r=String(this._pickerEndMonth+1).padStart(2,"0"),s=String(this._pickerEndDay).padStart(2,"0"),o=`${this._pickerStartYear}-${i}-${a}T${this._pickerStartHour}:${this._pickerStartMinute}`,n=`${this._pickerEndYear}-${r}-${s}T${this._pickerEndHour}:${this._pickerEndMinute}`;this._updateSchedulePeriod(e,t,"start",o),this._updateSchedulePeriod(e,t,"end",n),this._closePicker()}_toAbsDay(e,t,i){return new Date(e,t,i).getTime()}_getMonthDays(){const e=this._pickerYear,t=this._pickerMonth,i=(new Date(e,t,1).getDay()+6)%7,a=new Date(e,t+1,0).getDate(),r=new Date(e,t,0).getDate(),s=new Date,o=s.getFullYear()===e&&s.getMonth()===t,n=s.getDate(),d=null!==this._pickerStartDay?this._toAbsDay(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay):null,c=null!==this._pickerEndDay?this._toAbsDay(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay):null,l=[],h=(e,t,i,a)=>{const r=this._toAbsDay(i,a,e);return{day:e,otherMonth:t,today:!t&&o&&e===n,rangeStart:null!==d&&r===d,rangeEnd:null!==c&&r===c,inRange:null!==d&&null!==c&&r>d&&r<c}},p=0===t?11:t-1,u=0===t?e-1:e;for(let v=i-1;v>=0;v--)l.push(h(r-v,!0,u,p));for(let v=1;v<=a;v++)l.push(h(v,!1,e,t));const g=11===t?0:t+1,_=11===t?e+1:e,m=42-l.length;for(let v=1;v<=m;v++)l.push(h(v,!0,_,g));return l}_getMonthLabel(){const e=new Date(this._pickerYear,this._pickerMonth,1),t="fr"===this._lang?"fr-FR":"en-US",i=e.toLocaleDateString(t,{month:"long"});return`${i.charAt(0).toUpperCase()}${i.slice(1)} ${this._pickerYear}`}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_renderDateTimePicker(){const e=this._getMonthDays(),t=this._getDayLabels(),i=null!==this._pickerStartDay&&null!==this._pickerEndDay;return V`
      <div class="picker-overlay"
        @click=${e=>{e.target===e.currentTarget&&this._closePicker()}}
        @keydown=${e=>{"Escape"===e.key&&this._closePicker()}}
      >
        <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${we("config.light_schedule_title")}">
          <div class="picker-phase">
            <button
              class="picker-phase-btn ${"start"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="start"}}
            >${we("config.light_schedule_start")}</button>
            <button
              class="picker-phase-btn ${"end"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="end"}}
            >${we("config.light_schedule_end")}</button>
          </div>
          <div class="picker-header">
            <button class="picker-nav" @click=${()=>this._pickerPrevMonth()} aria-label="${we("config.light_schedule_prev_month_aria")}">
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <span class="picker-month">${this._getMonthLabel()}</span>
            <button class="picker-nav" @click=${()=>this._pickerNextMonth()} aria-label="${we("config.light_schedule_next_month_aria")}">
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          </div>
          <div class="picker-grid">
            ${t.map(e=>V`<span class="picker-day-label">${e}</span>`)}
            ${e.map(e=>{const t=["picker-day",e.today?"today":"",e.rangeStart?"range-start":"",e.rangeEnd?"range-end":"",e.inRange?"in-range":"",e.otherMonth?"other-month":""].filter(Boolean).join(" ");return V`
                <button class=${t} @click=${()=>this._pickerSelectDay(e.day,e.otherMonth)}>${e.day}</button>
              `})}
          </div>
          <div class="picker-time-row">
            <div class="picker-time-group">
              <span class="picker-time-label">${we("config.light_schedule_start")}</span>
              <div class="time-input">
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerStartHour}
                  @change=${e=>this._pickerSetTime("startHour",e)}
                />
                <span class="time-sep">:</span>
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerStartMinute}
                  @change=${e=>this._pickerSetTime("startMinute",e)}
                />
              </div>
            </div>
            <div class="picker-time-group">
              <span class="picker-time-label">${we("config.light_schedule_end")}</span>
              <div class="time-input">
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerEndHour}
                  @change=${e=>this._pickerSetTime("endHour",e)}
                />
                <span class="time-sep">:</span>
                <input type="text" class="time-digit" maxlength="2"
                  .value=${this._pickerEndMinute}
                  @change=${e=>this._pickerSetTime("endMinute",e)}
                />
              </div>
            </div>
          </div>
          <button
            class="btn btn-sm btn-accent picker-confirm"
            @click=${()=>this._pickerConfirm()}
            ?disabled=${!i}
          >
            ${we("config.light_schedule_confirm")}
          </button>
        </div>
      </div>
    `}async _saveLights(){if(this._backend&&!this._saving&&this._lightRoom){this._saving=!0;try{let e=[];try{const t=await this._backend.send("get_room",{area_id:this._lightRoom});t&&(e=t.hidden_entities??[])}catch{}const t=new Set(this._lights.map(e=>e.entityId)),i=e.filter(e=>!t.has(e)),a=this._lights.filter(e=>!e.visible).map(e=>e.entityId),r={};for(const s of this._lights)"full"===s.layout&&(r[s.entityId]=s.layout);if(await this._backend.send("set_room",{area_id:this._lightRoom,entity_order:this._lights.map(e=>e.entityId),hidden_entities:[...i,...a],entity_layouts:r}),!this._mounted)return;this._showToast(),pe.emit("room-config-changed",{areaId:this._lightRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}async _reset(){this._loaded=!0,await this._loadConfig(),this._lightRoom&&this._loadRoomLights()}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_goBack(){history.back()}_renderNavbarPreview(){const e=[...this._rooms.filter(e=>e.visible)];return this._autoSort&&e.sort((e,t)=>(e.lightsOn>0?0:1)-(t.lightsOn>0?0:1)),V`
      <div class="preview-navbar">
        ${e.map((e,t)=>{const i=this._showLights&&e.lightsOn>0,a=this._showHumidity&&null!==e.humidityValue&&e.humidityValue>=this._humidityThreshold,r=this._showMedia&&e.mediaPlaying,s=this._showTemperature&&null!==e.tempValue&&e.tempValue>=this._tempHigh,o=["preview-nav-item",0===t?"active-preview":"",i?"has-light":"",a?"has-humidity":"",r?"has-music":"",s?"has-temp-hot":"",this._showTemperature&&null!==e.tempValue&&!s&&e.tempValue<=this._tempLow?"has-temp-cold":""].filter(Boolean).join(" ");return V`
            <div class=${o}>
              <span class="preview-temp-badge">
                <ha-icon .icon=${s?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
              </span>
              <ha-icon .icon=${e.icon}></ha-icon>
              <div class="preview-nav-label"><span>${e.name}</span></div>
            </div>
          `})}
      </div>
    `}_renderPopupPreview(){const e=this._rooms.find(e=>e.areaId===this._selectedRoom);if(!e)return V`<div class="preview-empty">${we("config.popup_select_room")}</div>`;const t=this._scenes.length>0,i=this._scenes.filter(e=>e.visible),a=["preview-popup-icon-box",e.lightsOn>0?"has-light":"",e.mediaPlaying?"has-music":""].filter(Boolean).join(" ");return V`
      <div class="preview-popup">
        <div class="preview-popup-header">
          <div class="preview-popup-header-left">
            <div class=${a}>
              <ha-icon .icon=${e.icon}></ha-icon>
            </div>
            <div class="preview-popup-scene-dash ${t?"visible":""}"></div>
          </div>
          <div class="preview-popup-info">
            <div class="preview-popup-name">${e.name}</div>
            <div class="preview-popup-meta">
              ${e.temperature?V`<span>${e.temperature}</span>`:K}
              ${e.humidity?V`<span>${e.humidity}</span>`:K}
            </div>
          </div>
          <div class="preview-popup-close">
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </div>
        </div>

        ${i.length>0?V`
          <div class="preview-popup-scenes">
            ${this._scenes.map(e=>V`
                <span class="preview-scene-chip ${e.visible?"":"hidden-scene"}">${e.name}</span>
              `)}
          </div>
        `:K}

        <div class="preview-popup-cards">
          ${this._cards.filter(e=>e.visible).map(e=>V`
              <div class="preview-card-slot">
                <ha-icon .icon=${e.icon}></ha-icon>
                <span class="preview-card-slot-name">${e.nameKey?we(e.nameKey):e.id}</span>
                <span class="preview-card-slot-count">${e.count}</span>
              </div>
            `)}
        </div>
      </div>
    `}_renderNavbarTab(){return V`
      <div class="tab-panel" id="panel-navbar">

        ${this._emptyRooms.length>0?V`
          <div class="section-label">${we("config.navbar_empty_rooms")}</div>
          <div class="section-desc">
            ${we("config.navbar_empty_rooms_desc")}
          </div>
          <div class="item-list empty-rooms">
            ${this._emptyRooms.map(e=>V`
              <div class="item-row disabled">
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
                <div class="room-icon-btn">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${e.name}</span>
                  <span class="item-meta">0 ${we("common.entities")}</span>
                </div>
              </div>
            `)}
          </div>
        `:K}

        <div class="section-label">${we("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._autoSort=!this._autoSort}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.navbar_auto_sort")}</div>
              <div class="feature-desc">${we("config.navbar_auto_sort_desc")}</div>
            </div>
            <span
              class="toggle ${this._autoSort?"on":""}"
              role="switch"
              aria-checked=${this._autoSort?"true":"false"}
            ></span>
          </button>
        </div>

        <div class="banner">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${we("config.navbar_rooms_banner")}</span>
        </div>
        <div class="section-label">${we("config.navbar_visible_rooms")}</div>
        <div class="item-list">
          ${this._rooms.map((e,t)=>this._renderRoomRow(e,t))}
        </div>

        <div class="icon-picker-fold ${this._iconPickerRoom?"open":""}">
          <div class="icon-picker-inner">
            <div class="section-label">
              ${we("config.navbar_icon_label",{name:this._rooms.find(e=>e.areaId===this._iconPickerRoom)?.name||""})}
            </div>
            <div class="icon-picker-grid">
              ${Pe.map(e=>V`
                  <button
                    class="icon-pick ${this._rooms.find(e=>e.areaId===this._iconPickerRoom)?.icon===e?"selected":""}"
                    @click=${()=>this._iconPickerRoom&&this._setRoomIcon(this._iconPickerRoom,e)}
                    aria-label="${we("config.navbar_choose_icon")}"
                  >
                    <ha-icon .icon=${e}></ha-icon>
                  </button>
                `)}
            </div>
          </div>
        </div>

        <div class="section-label">${we("config.navbar_indicators")}</div>
        <div class="section-desc">${we("config.navbar_indicators_desc")}</div>
        <div class="feature-list">
          ${[{key:"lights",icon:"mdi:lightbulb",nameKey:"config.navbar_ind_lights",descKey:"config.navbar_ind_lights_desc"},{key:"temperature",icon:"mdi:thermometer",nameKey:"config.navbar_ind_temp",descKey:"config.navbar_ind_temp_desc"},{key:"humidity",icon:"mdi:water-percent",nameKey:"config.navbar_ind_humidity",descKey:"config.navbar_ind_humidity_desc"},{key:"media",icon:"mdi:music",nameKey:"config.navbar_ind_media",descKey:"config.navbar_ind_media_desc"}].map(e=>{const t={lights:this._showLights,temperature:this._showTemperature,humidity:this._showHumidity,media:this._showMedia}[e.key];return V`
              <button
                class="feature-row"
                @click=${()=>{"lights"===e.key?this._showLights=!this._showLights:"temperature"===e.key?this._showTemperature=!this._showTemperature:"humidity"===e.key?this._showHumidity=!this._showHumidity:this._showMedia=!this._showMedia}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we(e.nameKey)}</div>
                  <div class="feature-desc">${we(e.descKey)}</div>
                </div>
                <span
                  class="toggle ${t?"on":""}"
                  role="switch"
                  aria-checked=${t?"true":"false"}
                ></span>
              </button>
            `})}
        </div>

        <div class="section-label">${we("config.navbar_thresholds")}</div>
        <div class="section-desc">${we("config.navbar_thresholds_desc")}</div>
        <div class="threshold-list">
          <div class="threshold-row">
            <div class="threshold-icon hot">
              <ha-icon .icon=${"mdi:thermometer-high"}></ha-icon>
            </div>
            <span class="threshold-label">${we("config.navbar_temp_high")}</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempHigh)}
              @change=${e=>{this._tempHigh=parseFloat(e.target.value)||24}}
              aria-label="${we("config.navbar_temp_high")}"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon cold">
              <ha-icon .icon=${"mdi:snowflake"}></ha-icon>
            </div>
            <span class="threshold-label">${we("config.navbar_temp_low")}</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempLow)}
              @change=${e=>{this._tempLow=parseFloat(e.target.value)||17}}
              aria-label="${we("config.navbar_temp_low")}"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon humidity">
              <ha-icon .icon=${"mdi:water-percent"}></ha-icon>
            </div>
            <span class="threshold-label">${we("config.navbar_humidity_threshold")}</span>
            <input
              class="threshold-input"
              type="number"
              step="1"
              .value=${String(this._humidityThreshold)}
              @change=${e=>{this._humidityThreshold=parseFloat(e.target.value)||65}}
              aria-label="${we("config.navbar_humidity_threshold")}"
            />
            <span class="threshold-unit">%</span>
          </div>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._reset()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}_renderRoomRow(e,t){const i=this._dragIdx===t&&"rooms"===this._dragContext,a=this._dropIdx===t&&"rooms"===this._dragContext,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return V`
      <div
        class=${r}
        draggable="true"
        @dragstart=${()=>this._onDragStart(t,"rooms")}
        @dragover=${e=>this._onDragOver(t,e)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${e=>this._onDropGeneric(t,e)}
        @dragend=${()=>this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <button
          class="room-icon-btn"
          @click=${()=>this._openIconPicker(e.areaId)}
          aria-label="${we("config.navbar_change_icon_aria",{name:e.name})}"
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
        <div class="item-info">
          <span class="item-name">${e.name}</span>
          <span class="item-meta">${e.entityCount} ${we("common.entities")}</span>
        </div>
        <button
          class="toggle ${e.visible?"on":""}"
          @click=${()=>this._toggleRoomVisible(e.areaId)}
          role="switch"
          aria-checked=${e.visible?"true":"false"}
          aria-label="${e.visible?we("common.hide"):we("common.show")} ${e.name}"
        ></button>
      </div>
    `}_renderPopupTab(){const e=this._rooms.find(e=>e.areaId===this._selectedRoom);return V`
      <div class="tab-panel" id="panel-popup">
        <div class="section-label">${we("config.popup_room")}</div>
        <div class="section-desc">
          ${we("config.popup_room_desc")}
        </div>
        <div class="dropdown ${this._dropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._dropdownOpen=!this._dropdownOpen}
            aria-expanded=${this._dropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||we("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(e=>V`
                <button
                  class="dropdown-item ${e.areaId===this._selectedRoom?"active":""}"
                  role="option"
                  aria-selected=${e.areaId===this._selectedRoom?"true":"false"}
                  @click=${()=>this._selectRoom(e.areaId)}
                >
                  <ha-icon .icon=${e.icon}></ha-icon>
                  ${e.name}
                </button>
              `)}
          </div>
        </div>

        <div class="section-label">${we("config.popup_internal_cards")}</div>
        <div class="section-desc">
          ${we("config.popup_internal_cards_desc")}
        </div>
        <div class="item-list">
          ${this._cards.map((e,t)=>this._renderCardRow(e,t))}
        </div>

        ${this._scenes.length>0?V`
          <div class="section-label">${we("config.popup_scenes")} (${this._scenes.length})</div>
          <div class="section-desc">
            ${we("config.popup_scenes_desc")}
          </div>
          <div class="item-list">
            ${this._scenes.map((e,t)=>this._renderSceneRow(e,t))}
          </div>
        `:K}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._reset()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}_renderCardRow(e,t){const i=this._dragIdx===t&&"cards"===this._dragContext,a=this._dropIdx===t&&"cards"===this._dragContext,r=["item-row card-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return V`
      <div
        class=${r}
        draggable="true"
        @dragstart=${()=>this._onDragStart(t,"cards")}
        @dragover=${e=>this._onDragOver(t,e)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${e=>this._onDropGeneric(t,e)}
        @dragend=${()=>this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <div class="card-icon-box">
          <ha-icon .icon=${e.icon}></ha-icon>
        </div>
        <div class="item-info">
          <span class="item-name">${e.nameKey?we(e.nameKey):e.id}</span>
          <span class="item-meta">${e.descKey?we(e.descKey):""}</span>
        </div>
        <span class="card-count">${e.count}</span>
        <button
          class="toggle ${e.visible?"on":""}"
          @click=${()=>this._toggleCardVisible(e.id)}
          role="switch"
          aria-checked=${e.visible?"true":"false"}
          aria-label="${e.visible?we("common.hide"):we("common.show")} ${e.nameKey?we(e.nameKey):e.id}"
        ></button>
      </div>
    `}_renderSceneRow(e,t){const i=this._dragIdx===t&&"scenes"===this._dragContext,a=this._dropIdx===t&&"scenes"===this._dragContext,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return V`
      <div
        class=${r}
        draggable="true"
        @dragstart=${()=>this._onDragStart(t,"scenes")}
        @dragover=${e=>this._onDragOver(t,e)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${e=>this._onDropGeneric(t,e)}
        @dragend=${()=>this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <div class="card-icon-box">
          <ha-icon .icon=${"mdi:palette"}></ha-icon>
        </div>
        <div class="item-info">
          <span class="item-name">${e.name}</span>
          <span class="item-meta">${e.entityId}</span>
        </div>
        <button
          class="toggle ${e.visible?"on":""}"
          @click=${()=>this._toggleSceneVisible(e.entityId)}
          role="switch"
          aria-checked=${e.visible?"true":"false"}
          aria-label="${e.visible?we("common.hide"):we("common.show")} ${e.name}"
        ></button>
      </div>
    `}_renderLightPreview(){if(!this._lightRoom)return V`<div class="preview-empty">${we("config.light_select_room")}</div>`;if(0===this._lights.length)return V`<div class="preview-empty">${we("config.light_no_lights")}</div>`;const e=this._lights.filter(e=>e.visible),t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,r=0===t?"none":t===i?"all":"some";if(0===e.length)return V`<div class="preview-empty">${we("config.light_no_visible")}</div>`;const s=[],o=[];for(const c of e){"compact"===("full"===c.layout?"full":"compact")?(o.push(c),2===o.length&&(s.push({kind:"compact-pair",left:o[0],right:o[1]}),o.length=0)):(o.length>0&&(s.push({kind:"full",light:o[0]}),o.length=0),s.push({kind:"full",light:c}))}o.length>0&&s.push({kind:"full",light:o[0]});const n=a?.06:0,d=(e,t,i)=>{const a=["preview-light-row",t?"compact":"",i?"compact-right":"",e.visible?"":"hidden-light"].filter(Boolean).join(" "),r=this._scheduleEdits.get(e.entityId),s=r?r.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0;return V`
        <div class=${a} data-on=${e.isOn}>
          <div class="preview-light-icon ${e.isOn?"on":""}">
            <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
          </div>
          <div class="preview-light-info">
            <div class="preview-light-name">${e.name}</div>
            <div class="preview-light-sub">${e.isOn?`${e.brightnessPct}%`:we("common.off")}</div>
          </div>
          ${s?V`<ha-icon class="preview-light-sched" .icon=${"mdi:calendar-clock"}></ha-icon>`:K}
          ${"full"===e.layout?V`<span class="preview-light-layout-tag">full</span>`:K}
          <span class="preview-light-dot ${e.isOn?"on":""}"></span>
        </div>
      `};return V`
      <div class="preview-light">
        <div class="preview-light-header">
          <div class="preview-light-header-left">
            <span class="preview-light-title">${we("light.title")}</span>
            <span class="preview-light-count ${r}">${t}/${i}</span>
          </div>
          <div class="preview-light-toggle ${a?"on":""}"></div>
        </div>
        <div class="preview-light-body">
          <div
            class="preview-light-tint"
            style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${n}"
          ></div>
          <div class="preview-light-grid">
            ${s.map(e=>"full"===e.kind?d(e.light,!1,!1):V`
                ${d(e.left,!0,!1)}
                ${e.right?d(e.right,!0,!0):K}
              `)}
          </div>
        </div>
      </div>
    `}_renderLightTab(){const e=this._rooms.find(e=>e.areaId===this._lightRoom);return V`
      <div class="tab-panel" id="panel-light">
        <div class="section-label">${we("config.light_room")}</div>
        <div class="section-desc">
          ${we("config.light_room_desc")}
        </div>
        <div class="dropdown ${this._lightDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._lightDropdownOpen=!this._lightDropdownOpen}
            aria-expanded=${this._lightDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||we("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(e=>V`
                <button
                  class="dropdown-item ${e.areaId===this._lightRoom?"active":""}"
                  role="option"
                  aria-selected=${e.areaId===this._lightRoom?"true":"false"}
                  @click=${()=>this._selectLightRoom(e.areaId)}
                >
                  <ha-icon .icon=${e.icon}></ha-icon>
                  ${e.name}
                </button>
              `)}
          </div>
        </div>

        ${this._lights.length>0?V`
              <div class="section-label">${we("config.light_list_title")} (${this._lights.length})</div>
              <div class="section-desc">
                ${we("config.light_list_banner")}
              </div>
              <div class="item-list">
                ${this._lights.map((e,t)=>this._renderLightRow(e,t))}
              </div>
            `:this._lightRoom?V`<div class="banner">
                <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
                <span>${we("config.light_no_lights")}</span>
              </div>`:K}

        ${this._lights.length>0?V`
          <div class="section-desc schedule-hint">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            ${we("config.light_schedule_hint")}
          </div>
        `:K}

        <div class="section-desc dashboard-vs-room">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          ${we("config.light_dashboard_vs_room")}
        </div>

        ${this._lightRoom?V`
          <div class="save-bar">
            <button class="btn btn-ghost" @click=${()=>this._loadRoomLights()}>${we("common.reset")}</button>
            <button
              class="btn btn-accent"
              @click=${()=>this._save()}
              ?disabled=${this._saving}
            >
              ${this._saving?we("common.saving"):we("common.save")}
            </button>
          </div>
        `:K}
      </div>
    `}_renderLightRow(e,t){const i=this._dragIdx===t&&"lights"===this._dragContext,a=this._dropIdx===t&&"lights"===this._dragContext,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),s=this._scheduleEdits.get(e.entityId),o=s?s.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0,n=this._scheduleExpandedEntity===e.entityId,d=["item-card",n?"expanded":""].filter(Boolean).join(" ");return V`
      <div class=${d}>
        <div
          class=${r}
          draggable="true"
          @dragstart=${()=>this._onDragStart(t,"lights")}
          @dragover=${e=>this._onDragOver(t,e)}
          @dragleave=${()=>this._onDragLeave()}
          @drop=${e=>this._onDropGeneric(t,e)}
          @dragend=${()=>this._onDragEnd()}
        >
          <span class="drag-handle">
            <ha-icon .icon=${"mdi:drag"}></ha-icon>
          </span>
          <div class="item-info">
            <span class="item-name">${e.name}</span>
            <span class="item-meta">${e.entityId}</span>
          </div>
          <div class="light-state">
            <span class="light-dot ${e.isOn?"on":""}"></span>
          </div>
          <button
            class="schedule-btn ${o?"active":""}"
            @click=${()=>this._toggleScheduleExpand(e.entityId)}
            aria-label="${we("config.light_schedule_aria",{name:e.name})}"
            aria-expanded=${n?"true":"false"}
            title="${we("config.light_schedule_title")}"
          >
            <ha-icon .icon=${"mdi:calendar-clock"}></ha-icon>
          </button>
          <button
            class="layout-btn"
            @click=${()=>this._cycleLightLayout(e.entityId)}
            aria-label="${we("config.light_change_layout_aria")}"
            title="${we("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
          >
            ${we("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
          </button>
          <button
            class="toggle ${e.visible?"on":""}"
            @click=${()=>this._toggleLightVisible(e.entityId)}
            role="switch"
            aria-checked=${e.visible?"true":"false"}
            aria-label="${e.visible?we("common.hide"):we("common.show")} ${e.name}"
          ></button>
        </div>
        <div class="fold-sep ${n?"visible":""}"></div>
        <div class="schedule-fold ${n?"open":""}">
          <div class="schedule-fold-inner">
            ${this._renderScheduleContent(e.entityId)}
          </div>
        </div>
      </div>
    `}_formatDateTimeShort(e){if(!e)return"";const[t,i]=e.split("T");if(!t)return e;const[a,r,s]=t.split("-");return`${s}/${r}/${a} ${i??"00:00"}`}_formatPeriodDisplay(e){if(!e.start&&!e.end)return"";const t=this._formatDateTimeShort(e.start),i=this._formatDateTimeShort(e.end);return t&&i?`${t}  →  ${i}`:t?`${t}  → …`:`…  →  ${i}`}_renderScheduleContent(e){const t=this._scheduleEdits.get(e)??[];return V`
      <div class="schedule-body">
        <div class="schedule-header">${we("config.light_schedule_title")}</div>
        ${t.map((t,i)=>V`
          <div class="schedule-period">
            <div class="schedule-row">
              <button
                class="datetime-display ${t.start||t.end?"":"empty"}"
                @click=${()=>this._openRangePicker(e,i)}
              >
                ${t.start||t.end?this._formatPeriodDisplay(t):we("config.light_schedule_no_date")}
              </button>
            </div>
            <div class="schedule-row schedule-row-actions">
              <button
                class="check-item ${t.recurring?"checked":""}"
                @click=${()=>this._toggleScheduleRecurring(e,i)}
              >
                <span class="check-box">
                  <ha-icon .icon=${"mdi:check"}></ha-icon>
                </span>
                <span class="check-label">${we("config.light_schedule_recurring")}</span>
              </button>
              <button
                class="btn-icon xs schedule-delete"
                @click=${()=>this._removeSchedulePeriod(e,i)}
                aria-label="${we("config.light_schedule_delete_aria")}"
              >
                <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
              </button>
            </div>
          </div>
        `)}
        <button class="btn btn-sm schedule-add" @click=${()=>this._addSchedulePeriod(e)}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          ${we("config.light_schedule_add")}
        </button>
        <button class="btn btn-sm btn-accent schedule-save" @click=${()=>this._saveSchedule(e)}>
          ${we("common.save")}
        </button>
      </div>
    `}_toggleDashboardCard(e){const t=new Set(this._dashboardEnabledCards);t.has(e)?t.delete(e):t.add(e),this._dashboardEnabledCards=[...t]}async _saveDashboard(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_dashboard",{enabled_cards:this._dashboardEnabledCards}),!this._mounted)return;this._showToast(),pe.emit("dashboard-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadDashboardConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.dashboard&&(this._dashboardEnabledCards=e.dashboard.enabled_cards??["weather"])}catch{}}_renderDashboardPreview(){const e=new Set(this._dashboardEnabledCards);return V`
      <div class="preview-dashboard">
        <div class="preview-dashboard-cards">
          ${e.has("weather")?V`
            <div class="preview-dashboard-card weather">
              <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
              <span>22°</span>
            </div>
          `:K}
          ${e.has("light")?V`
            <div class="preview-dashboard-card light">
              <ha-icon .icon=${"mdi:lightbulb-group"}></ha-icon>
              <span>${we("light.title")}</span>
            </div>
          `:K}
          ${0===e.size?V`<div class="preview-dashboard-empty">—</div>`:K}
        </div>
        <div class="preview-dashboard-navbar">
          <ha-icon .icon=${"mdi:sofa"}></ha-icon>
          <ha-icon .icon=${"mdi:stove"}></ha-icon>
          <ha-icon .icon=${"mdi:bed"}></ha-icon>
        </div>
      </div>
    `}_renderDashboardTab(){const e=new Set(this._dashboardEnabledCards);return V`
      <div class="tab-panel" id="panel-dashboard">
        <div class="section-label">${we("config.dashboard_title")}</div>
        <div class="section-desc">${we("config.dashboard_desc")}</div>
        <div class="feature-list">
          ${[{key:"weather",icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",descKey:"config.dashboard_card_weather_desc"},{key:"light",icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",descKey:"config.dashboard_card_light_desc"}].map(t=>{const i=e.has(t.key);return V`
              <button
                class="feature-row"
                @click=${()=>this._toggleDashboardCard(t.key)}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we(t.nameKey)}</div>
                  <div class="feature-desc">${we(t.descKey)}</div>
                </div>
                <span
                  class="toggle ${i?"on":""}"
                  role="switch"
                  aria-checked=${i?"true":"false"}
                  aria-label="${we(i?"common.hide":"common.show")} ${we(t.nameKey)}"
                ></span>
              </button>
            `})}
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadDashboardConfig()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}_toggleWeatherMetric(e){const t=new Set(this._weatherHiddenMetrics);t.has(e)?t.delete(e):t.add(e),this._weatherHiddenMetrics=[...t]}_selectWeatherEntity(e){this._weatherEntity=e,this._weatherDropdownOpen=!1}async _saveWeather(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_weather",{...this._weatherEntity?{entity_id:this._weatherEntity}:{},hidden_metrics:this._weatherHiddenMetrics,show_daily:this._weatherShowDaily,show_hourly:this._weatherShowHourly}),!this._mounted)return;this._showToast(),pe.emit("weather-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}_renderWeatherPreview(){if(!this._weatherEntity||!this.hass)return V`<div class="preview-empty">${we("config.weather_select_entity")}</div>`;const e=this.hass.states[this._weatherEntity];if(!e)return V`<div class="preview-empty">${we("config.weather_select_entity")}</div>`;const t=e.attributes,i=t.temperature??"--",a=t.temperature_unit??"°C",r=new Set(this._weatherHiddenMetrics),s=e.state||"sunny",o={sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",partlycloudy:"mdi:weather-partly-cloudy",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",snowy:"mdi:weather-snowy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning"}[s]||"mdi:weather-cloudy",n=we({sunny:"weather.cond_sunny","clear-night":"weather.cond_clear_night",partlycloudy:"weather.cond_partly_cloudy",cloudy:"weather.cond_cloudy",fog:"weather.cond_foggy",rainy:"weather.cond_rainy",pouring:"weather.cond_pouring",snowy:"weather.cond_snowy",windy:"weather.cond_windy",lightning:"weather.cond_lightning"}[s]||"weather.cond_cloudy"),d={sunny:"#fbbf24","clear-night":"#6366f1",partlycloudy:"#94a3b8",cloudy:"#64748b",fog:"#94a3b8",rainy:"#3b82f6",pouring:"#2563eb",snowy:"#e2e8f0",windy:"#6ee7b3",lightning:"#a78bfa"}[s]||"#64748b",c={sunny:"rgba(251,191,36,0.8)","clear-night":"rgba(129,140,248,0.7)",partlycloudy:"rgba(148,163,184,0.6)",cloudy:"rgba(100,116,139,0.6)",fog:"rgba(148,163,184,0.5)",rainy:"rgba(96,165,250,0.7)",pouring:"rgba(59,130,246,0.8)",snowy:"rgba(226,232,240,0.7)",windy:"rgba(110,231,179,0.6)",lightning:"rgba(167,139,250,0.8)"}[s]||"rgba(148,163,184,0.6)",l=new Date,h=l.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),p=String(l.getSeconds()).padStart(2,"0"),u=l.toLocaleDateString(this.hass.language||"fr",{weekday:"long",day:"numeric",month:"long"}),g=t.apparent_temperature??null,_="number"==typeof i?i:12,m=[0,.5,1.2,.8,-.3,-1,-.5,.2,.7,1.5],v=44,b=Math.min(...m),f=Math.max(...m)-b||1,w=m.map((e,t)=>({x:t/(m.length-1)*348,y:6+32*(1-(e-b)/f)}));let y=`M${w[0].x},${w[0].y}`;for(let O=0;O<w.length-1;O++){const e=w[Math.max(0,O-1)],t=w[O],i=w[O+1],a=w[Math.min(w.length-1,O+2)];y+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}const x=y+" L348,44 L0,44 Z",k=.3*(m.length-1),$=Math.floor(k),S=Math.min(m.length-1,$+1),E=k-$,C=6+32*(1-(m[$]+(m[S]-m[$])*E-b)/f),A=l.getHours(),D=m.map((e,t)=>`${String((A+t)%24).padStart(2,"0")}h`),M=[];if(r.has("humidity")||null==t.humidity||M.push({key:"humidity",icon:"mdi:water-percent",val:`${t.humidity}`,unit:"%"}),!r.has("wind")&&null!=t.wind_speed){const e="number"==typeof t.wind_bearing?this._windBearingToDir(t.wind_bearing):void 0;M.push({key:"wind",icon:"mdi:weather-windy",val:`${Math.round(t.wind_speed)}`,unit:"km/h",dir:e})}if(r.has("pressure")||null==t.pressure||M.push({key:"pressure",icon:"mdi:gauge",val:`${Math.round(t.pressure)}`,unit:"hPa"}),r.has("uv")||null==t.uv_index||M.push({key:"uv",icon:"mdi:sun-wireless",val:`${Math.round(t.uv_index)}`,unit:"UV"}),r.has("visibility")||null==t.visibility||M.push({key:"visibility",icon:"mdi:eye-outline",val:`${t.visibility}`,unit:"km"}),!r.has("sunrise")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_rising;M.push({key:"sunrise",icon:"mdi:weather-sunset-up",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}if(!r.has("sunset")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_setting;M.push({key:"sunset",icon:"mdi:weather-sunset-down",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}const T=this.hass.language||"fr",P=Array.from({length:7},(e,t)=>{const i=new Date(2024,0,t+1);return new Intl.DateTimeFormat(T,{weekday:"short"}).format(i)}),z=[_+2,_+1,_,_-1,_+1,_+3,_],I=[_-4,_-3,_-5,_-6,_-4,_-2,_-5],R=[0,10,30,60,20,0,15],L=l.getDay();return V`
      <div class="preview-weather">
        <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${d}22 0%, transparent 70%);"></div>
        <div class="pw-content">
          <div class="pw-header">
            <div class="pw-header-left">
              <span class="pw-time">${h}<span class="pw-sec">:${p}</span></span>
              <span class="pw-date">${u}</span>
            </div>
            <div class="pw-header-right">
              <span class="pw-temp">${i}<span class="pw-temp-unit">${a}</span></span>
              <span class="pw-cond"><ha-icon .icon=${o}></ha-icon>${n}</span>
              ${null!=g?V`<span class="pw-feels">${we("weather.feels_like",{temp:String(Math.round(g))})}</span>`:K}
            </div>
          </div>

          <div class="pw-spark-zone">
            <svg class="pw-spark-svg" viewBox="0 0 ${348} ${v}" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pw-spark-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="${c}" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="${x}" fill="url(#pw-spark-fill)"/>
              <path d="${y}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="pw-spark-now" style="left: ${30}%;">
              <div class="pw-spark-now-dot" style="top: ${C/v*100}%;"></div>
            </div>
            <div class="pw-spark-labels">
              ${D.map((e,t)=>t%2==0||t===D.length-1?V`<span class="pw-spark-lbl" style="left: ${t/(D.length-1)*100}%;">${e}</span>`:K)}
            </div>
          </div>

          ${M.length>0?V`
            <div class="pw-metrics" style="grid-template-columns: repeat(${3}, 1fr);">
              ${M.map(e=>V`
                <div class="pw-metric ${e.key}">
                  <ha-icon .icon=${e.icon}></ha-icon>
                  <span class="pw-metric-val">${e.val}</span>
                  ${e.unit?V`<span class="pw-metric-unit">${e.unit}</span>`:K}
                  ${e.dir?V`<span class="pw-metric-dir">${e.dir}</span>`:K}
                </div>
              `)}
            </div>
          `:K}

          ${this._weatherShowDaily||this._weatherShowHourly?V`
            <div class="pw-forecast-zone">
              <div class="pw-tabs">
                ${this._weatherShowDaily?V`<span class="pw-tab active">${we("weather.daily_tab")}</span>`:K}
                ${this._weatherShowHourly?V`<span class="pw-tab">${we("weather.hourly_tab")}</span>`:K}
              </div>
              <div class="pw-fold-sep"></div>
              ${this._weatherShowDaily?V`
                <div class="pw-daily-list">
                  ${["mdi:weather-sunny","mdi:weather-partly-cloudy","mdi:weather-cloudy","mdi:weather-rainy","mdi:weather-partly-cloudy","mdi:weather-sunny","mdi:weather-cloudy"].slice(0,5).map((e,t)=>{const i=(L+t)%7,a=0===t?we("weather.today"):P[i],r=Math.round(z[t]),s=Math.round(I[t]),o=R[t];return V`
                      <div class="pw-day-row ${0===t?"today":""}">
                        <span class="pw-day-label">${a}</span>
                        <ha-icon class="pw-day-icon" .icon=${e}></ha-icon>
                        <span class="pw-day-temps"><span class="pw-day-high">${r}°</span><span class="pw-day-low">${s}°</span></span>
                        ${o>0?V`<span class="pw-day-precip">${o}%</span>`:V`<span class="pw-day-precip"></span>`}
                      </div>
                    `})}
                </div>
              `:K}
            </div>
          `:K}
        </div>
      </div>
    `}_windBearingToDir(e){return["N","NE","E","SE","S","SO","O","NO"][Math.round(e/45)%8]}_renderWeatherTab(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")).sort():[],t=e.find(e=>e===this._weatherEntity),i=new Set(this._weatherHiddenMetrics);return V`
      <div class="tab-panel" id="panel-weather">
        <div class="section-label">${we("config.weather_entity")}</div>
        <div class="section-desc">${we("config.weather_entity_desc")}</div>
        <div class="dropdown ${this._weatherDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._weatherDropdownOpen=!this._weatherDropdownOpen}
            aria-expanded=${this._weatherDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
            <span>${t||we("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>V`
                <button
                  class="dropdown-item ${e===this._weatherEntity?"active":""}"
                  role="option"
                  aria-selected=${e===this._weatherEntity?"true":"false"}
                  @click=${()=>this._selectWeatherEntity(e)}
                >
                  <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>

        <div class="section-label">${we("config.weather_metrics")}</div>
        <div class="section-desc">${we("config.weather_metrics_desc")}</div>
        <div class="feature-list">
          ${[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise"},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset"}].map(e=>{const t=!i.has(e.key);return V`
              <button
                class="feature-row"
                @click=${()=>this._toggleWeatherMetric(e.key)}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we(e.nameKey)}</div>
                </div>
                <span
                  class="toggle ${t?"on":""}"
                  role="switch"
                  aria-checked=${t?"true":"false"}
                  aria-label="${we(t?"common.hide":"common.show")} ${we(e.nameKey)}"
                ></span>
              </button>
            `})}
        </div>

        <div class="section-label">${we("config.weather_forecasts")}</div>
        <div class="section-desc">${we("config.weather_forecasts_desc")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._weatherShowDaily=!this._weatherShowDaily}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:calendar-week"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.weather_daily")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowDaily?"on":""}"
              role="switch"
              aria-checked=${this._weatherShowDaily?"true":"false"}
              aria-label="${this._weatherShowDaily?we("common.hide"):we("common.show")} ${we("config.weather_daily")}"
            ></span>
          </button>
          <button
            class="feature-row"
            @click=${()=>{this._weatherShowHourly=!this._weatherShowHourly}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.weather_hourly")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHourly?"on":""}"
              role="switch"
              aria-checked=${this._weatherShowHourly?"true":"false"}
              aria-label="${this._weatherShowHourly?we("common.hide"):we("common.show")} ${we("config.weather_hourly")}"
            ></span>
          </button>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadWeatherConfig()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}async _loadWeatherConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherEntity=e.weather.entity_id??"",this._weatherHiddenMetrics=e.weather.hidden_metrics??[],this._weatherShowDaily=e.weather.show_daily??!0,this._weatherShowHourly=e.weather.show_hourly??!0)}catch{}}render(){return this._lang,this.hass?V`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="${we("common.back")}">
            <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
          </button>
          <span class="page-title">${we("config.title")}</span>
          <span class="page-subtitle">${we("config.brand")}</span>
        </div>

        <div class="glass config-panel">
          <div class="tabs" role="tablist">
            <button
              class="tab ${"dashboard"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"dashboard"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("dashboard")}
            >
              <ha-icon .icon=${"mdi:view-dashboard"}></ha-icon>
              ${we("config.tab_dashboard")}
            </button>
            <button
              class="tab ${"navbar"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"navbar"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("navbar")}
            >
              <ha-icon .icon=${"mdi:dock-bottom"}></ha-icon>
              ${we("config.tab_navbar")}
            </button>
            <button
              class="tab ${"popup"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"popup"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("popup")}
            >
              <ha-icon .icon=${"mdi:card-outline"}></ha-icon>
              ${we("config.tab_popup")}
            </button>
            <button
              class="tab ${"light"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"light"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("light")}
            >
              <ha-icon .icon=${"mdi:lightbulb-group"}></ha-icon>
              ${we("config.tab_light")}
            </button>
            <button
              class="tab ${"weather"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"weather"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("weather")}
            >
              <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
              ${we("config.tab_weather")}
            </button>
          </div>

          <div class="preview-encart">
            <div class="preview-label">${we("config.preview")}</div>
            ${"navbar"===this._tab?this._renderNavbarPreview():"popup"===this._tab?this._renderPopupPreview():"light"===this._tab?this._renderLightPreview():"weather"===this._tab?this._renderWeatherPreview():this._renderDashboardPreview()}
          </div>

          ${"navbar"===this._tab?this._renderNavbarTab():"popup"===this._tab?this._renderPopupTab():"light"===this._tab?this._renderLightTab():"weather"===this._tab?this._renderWeatherTab():this._renderDashboardTab()}
        </div>
      </div>

      ${this._pickerOpen?this._renderDateTimePicker():K}

      <div class="toast ${this._toast?"show":""} ${this._toastError?"error":""}">
        ${this._toastError?we("common.error_save"):we("common.config_saved")}
      </div>
    `:K}}Ce([le({attribute:!1})],ze.prototype,"hass"),Ce([le({type:Boolean})],ze.prototype,"narrow"),Ce([he()],ze.prototype,"_lang"),Ce([he()],ze.prototype,"_tab"),Ce([he()],ze.prototype,"_rooms"),Ce([he()],ze.prototype,"_emptyRooms"),Ce([he()],ze.prototype,"_selectedRoom"),Ce([he()],ze.prototype,"_cards"),Ce([he()],ze.prototype,"_scenes"),Ce([he()],ze.prototype,"_lights"),Ce([he()],ze.prototype,"_lightRoom"),Ce([he()],ze.prototype,"_lightDropdownOpen"),Ce([he()],ze.prototype,"_iconPickerRoom"),Ce([he()],ze.prototype,"_dropdownOpen"),Ce([he()],ze.prototype,"_toast"),Ce([he()],ze.prototype,"_saving"),Ce([he()],ze.prototype,"_showLights"),Ce([he()],ze.prototype,"_showTemperature"),Ce([he()],ze.prototype,"_showHumidity"),Ce([he()],ze.prototype,"_showMedia"),Ce([he()],ze.prototype,"_autoSort"),Ce([he()],ze.prototype,"_tempHigh"),Ce([he()],ze.prototype,"_tempLow"),Ce([he()],ze.prototype,"_humidityThreshold"),Ce([he()],ze.prototype,"_weatherEntity"),Ce([he()],ze.prototype,"_weatherHiddenMetrics"),Ce([he()],ze.prototype,"_weatherShowDaily"),Ce([he()],ze.prototype,"_weatherShowHourly"),Ce([he()],ze.prototype,"_weatherDropdownOpen"),Ce([he()],ze.prototype,"_dashboardEnabledCards"),Ce([he()],ze.prototype,"_scheduleExpandedEntity"),Ce([he()],ze.prototype,"_pickerOpen"),Ce([he()],ze.prototype,"_pickerYear"),Ce([he()],ze.prototype,"_pickerMonth"),Ce([he()],ze.prototype,"_pickerStartDay"),Ce([he()],ze.prototype,"_pickerStartMonth"),Ce([he()],ze.prototype,"_pickerStartYear"),Ce([he()],ze.prototype,"_pickerEndDay"),Ce([he()],ze.prototype,"_pickerEndMonth"),Ce([he()],ze.prototype,"_pickerEndYear"),Ce([he()],ze.prototype,"_pickerStartHour"),Ce([he()],ze.prototype,"_pickerStartMinute"),Ce([he()],ze.prototype,"_pickerEndHour"),Ce([he()],ze.prototype,"_pickerEndMinute"),Ce([he()],ze.prototype,"_pickerPhase"),Ce([he()],ze.prototype,"_dragIdx"),Ce([he()],ze.prototype,"_dropIdx"),Ce([he()],ze.prototype,"_toastError"),customElements.get("glass-config-panel")||customElements.define("glass-config-panel",ze)}();
