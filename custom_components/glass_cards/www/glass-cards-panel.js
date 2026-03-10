!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let s=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new s(a,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,_=globalThis,u=_.trustedTypes,g=u?u.emptyScript:"",v=_.reactiveElementPolyfillSupport,m=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},f=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const r=a?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...l(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),s=e.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=a;const r=s.fromAttribute(t,e.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(e,t,i,a=!1,s){if(void 0!==e){const r=this.constructor;if(!1===a&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??f)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,v?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+P,D=`<${C}>`,M=document,I=()=>M.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,z=Array.isArray,O="[ \t\n\f\r]",A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,L=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,N=/"/g,V=/^(?:script|style|textarea|title)$/i,U=(Y=1,(e,...t)=>({_$litType$:Y,strings:e,values:t})),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),B=new WeakMap,K=M.createTreeWalker(M,129);var Y;function F(e,t){if(!z(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class G{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,r=0;const o=e.length-1,n=this.parts,[c,d]=((e,t)=>{const i=e.length-1,a=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=A;for(let n=0;n<i;n++){const t=e[n];let i,c,d=-1,l=0;for(;l<t.length&&(o.lastIndex=l,c=o.exec(t),null!==c);)l=o.lastIndex,o===A?"!--"===c[1]?o=H:void 0!==c[1]?o=R:void 0!==c[2]?(V.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=L):void 0!==c[3]&&(o=L):o===L?">"===c[0]?(o=s??A,d=-1):void 0===c[1]?d=-2:(d=o.lastIndex-c[2].length,i=c[1],o=void 0===c[3]?L:'"'===c[3]?N:j):o===N||o===j?o=L:o===H||o===R?o=A:(o=L,s=void 0);const p=o===L&&e[n+1].startsWith("/>")?" ":"";r+=o===A?t+D:d>=0?(a.push(i),t.slice(0,d)+E+t.slice(d)+P+p):t+P+(-2===d?n:p)}return[F(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=G.createElement(c,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=K.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=d[r++],i=a.getAttribute(e).split(P),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?ee:"?"===o[1]?te:"@"===o[1]?ie:Q}),a.removeAttribute(e)}else e.startsWith(P)&&(n.push({type:6,index:s}),a.removeAttribute(e));if(V.test(a.tagName)){const e=a.textContent.split(P),t=e.length-1;if(t>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],I()),K.nextNode(),n.push({type:2,index:++s});a.append(e[t],I())}}}else if(8===a.nodeType)if(a.data===C)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(P,e+1));)n.push({type:7,index:s}),e+=P.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,a){if(t===q)return t;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const r=T(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,a)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??M).importNode(t,!0);K.currentNode=a;let s=K.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new Z(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new ae(s,this,e)),this._$AV.push(t),n=i[++o]}r!==n?.index&&(s=K.nextNode(),r++)}return K.currentNode=M,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),T(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>z(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new J(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new G(e)),t}k(e){z(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new Z(this.O(I()),this.O(I()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,a){const s=this.strings;let r=!1;if(void 0===s)e=X(this,e,t,0),r=!T(e)||e!==this._$AH&&e!==q,r&&(this._$AH=e);else{const a=e;let o,n;for(e=s[0],o=0;o<s.length-1;o++)n=X(this,a[i+o],t,o),n===q&&(n=this._$AH[o]),r||=!T(n)||n!==this._$AH[o],n===W?e=W:e!==W&&(e+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends Q{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??W)===q)return;const i=this._$AH,a=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==W&&(i===W||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const se=x.litHtmlPolyfillSupport;se?.(G,Z),(x.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;class oe extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=i?.renderBefore??null;a._$litPart$=s=new Z(t.insertBefore(I(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}oe._$litElement$=!0,oe.finalized=!0,re.litElementHydrateSupport?.({LitElement:oe});const ne=re.litElementPolyfillSupport;ne?.({LitElement:oe}),(re.litElementVersions??=[]).push("4.2.2");const ce={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:f},de=(e=ce,t,i)=>{const{kind:a,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,s,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];t.call(this,i),this.requestUpdate(a,s,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function le(e){return(t,i)=>"object"==typeof i?de(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function pe(e){return le({...e,state:!0,attribute:!1})}const he=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}},_e=r`
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
`,ue=r`
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
`;r`
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
`;const ge=r`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`;r`
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
`;const ve={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store",dc_window:"Fenêtre",dc_damper:"Clapet"},title_card:{mode_label:"Mode :",scene_label:"Scène :",mode_none:"Aucun",cycle_aria:"Changer de mode"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",distance_m:"m",distance_km:"km"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Barre de nav","tab_popup":"Popup Pièce","tab_light":"Carte Lumières","preview":"Aperçu","navbar_behavior":"Comportement","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","navbar_rooms_banner":"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.","navbar_visible_rooms":"Pièces visibles","navbar_empty_rooms":"Pièces vides","navbar_empty_rooms_desc":"Ces pièces n\'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu\'elles apparaissent dans la navbar.","navbar_indicators":"Indicateurs","navbar_indicators_desc":"Activez ou désactivez les indicateurs visuels sur la navbar.","navbar_ind_lights":"Lumières allumées","navbar_ind_lights_desc":"Glow doré sur l\'icône","navbar_ind_temp":"Température","navbar_ind_temp_desc":"Badge chaud / froid","navbar_ind_humidity":"Humidité","navbar_ind_humidity_desc":"Barre bleue en bas","navbar_ind_media":"Média en lecture","navbar_ind_media_desc":"Bounce de l\'icône","navbar_thresholds":"Seuils","navbar_thresholds_desc":"Définissez les seuils pour les alertes de température et d\'humidité.","navbar_temp_high":"Température haute","navbar_temp_low":"Température basse","navbar_humidity_threshold":"Seuil humidité","navbar_choose_icon":"Choisir icône","navbar_change_icon_aria":"Changer l\'icône de {name}","navbar_icon_label":"Icône — {name}","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Carte Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_hourly":"Prévisions horaires","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","tab_title":"Carte Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez un input_select, input_boolean ou une scène pour les modes.","title_select_entity":"Sélectionnez une entité","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Carte Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Carte Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Carte Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Carte Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Carte Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Carte Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Carte Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","dashboard_card_presence":"Carte Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Carte Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_cover":"Carte Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_entities":"Volets du tableau de bord","cover_dashboard_entities_desc":"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_spotify":"Carte Spotify","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Entité lecteur Spotify","spotify_entity_desc":"Sélectionnez l\'entité media_player Spotify à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Sélectionnez les enceintes affichées dans le popup de lecture. Si aucune n\'est sélectionnée, toutes les enceintes sont affichées.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},title_card:{mode_label:"Mode:",scene_label:"Scene:",mode_none:"None",cycle_aria:"Change mode"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",distance_m:"m",distance_km:"km"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Navbar","tab_popup":"Room Popup","tab_light":"Light Card","preview":"Preview","navbar_behavior":"Behavior","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","navbar_rooms_banner":"Drag to reorder rooms. Toggle to hide.","navbar_visible_rooms":"Visible rooms","navbar_empty_rooms":"Empty rooms","navbar_empty_rooms_desc":"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.","navbar_indicators":"Indicators","navbar_indicators_desc":"Enable or disable visual indicators on the navbar.","navbar_ind_lights":"Lights on","navbar_ind_lights_desc":"Golden glow on icon","navbar_ind_temp":"Temperature","navbar_ind_temp_desc":"Hot / cold badge","navbar_ind_humidity":"Humidity","navbar_ind_humidity_desc":"Blue bar at bottom","navbar_ind_media":"Media playing","navbar_ind_media_desc":"Icon bounce","navbar_thresholds":"Thresholds","navbar_thresholds_desc":"Set thresholds for temperature and humidity alerts.","navbar_temp_high":"High temperature","navbar_temp_low":"Low temperature","navbar_humidity_threshold":"Humidity threshold","navbar_choose_icon":"Choose icon","navbar_change_icon_aria":"Change icon for {name}","navbar_icon_label":"Icon — {name}","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather Card","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_hourly":"Hourly forecast","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","tab_title":"Title Card","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select an input_select, input_boolean, or scene for modes.","title_select_entity":"Select an entity","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title Card","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather Card","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Light Card","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Cover Card","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify Card","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media Card","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media Card","dashboard_card_media_desc":"Shows media players with transport controls","dashboard_card_presence":"Presence Card","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence Card","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_cover":"Cover Card","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_entities":"Dashboard covers","cover_dashboard_entities_desc":"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_spotify":"Spotify Card","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player entity","spotify_entity_desc":"Select the Spotify media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Select which speakers appear in the playback popup. If none are selected, all speakers are shown.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings"}')}},me="fr";let be=me;function fe(e){const t=e.slice(0,2).toLowerCase(),i=t in ve?t:me;return i!==be&&(be=i,!0)}function ye(){return be}function we(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),s=-1===i?"":e.slice(i+1),r=ve[be]??ve[me],o=ve[me],n=r?.[a]?.[s]??o?.[a]?.[s];let c="string"==typeof n?n:e;if(t)for(const[d,l]of Object.entries(t))c=c.replaceAll(`{${d}}`,String(l));return c}var xe=Object.defineProperty,$e=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&xe(t,i,r),r};class ke extends oe{constructor(){super(...arguments),this._lang=ye(),this._busCleanups=[],this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&fe(this.hass.language)&&(this._lang=ye())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0)}_listen(e,t){this._busCleanups.push(he.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function Se(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&function(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}(t,i)===e)}$e([le({attribute:!1})],ke.prototype,"hass"),$e([pe()],ke.prototype,"_lang");class Ee{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}var Pe=Object.defineProperty,Ce=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Pe(t,i,r),r};const De=["light","media_player","climate","fan","cover","vacuum"],Me=new Set(["light","media_player","cover"]),Ie={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",vacuum:"mdi:robot-vacuum"},Te={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};const ze=["mdi:sofa","mdi:stove","mdi:bed","mdi:desk","mdi:shower","mdi:home","mdi:movie-open","mdi:music","mdi:wrench","mdi:flower","mdi:white-balance-sunny","mdi:weather-night","mdi:lightbulb","mdi:snowflake","mdi:fire","mdi:lock"];class Oe extends oe{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=ye(),this._tab="dashboard",this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._cards=[],this._scenes=[],this._lights=[],this._lightRoom="",this._lightDropdownOpen=!1,this._iconPickerRoom=null,this._dropdownOpen=!1,this._toast=!1,this._saving=!1,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._showMedia=!0,this._autoSort=!0,this._tempHigh=24,this._tempLow=17,this._humidityThreshold=65,this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherShowHeader=!0,this._weatherDropdownOpen=!1,this._titleText="",this._titleModeEntity="",this._titleModes=[],this._titleModeDropdownOpen=!1,this._titleModeEntitySearch="",this._iconPopupModeIdx=null,this._iconSearch="",this._iconList=[],this._colorPickerModeIdx=null,this._colorPickerHex="#ffffff",this._colorPickerPos={x:50,y:50},this._cpCanvas=null,this._lightShowHeader=!0,this._coverShowHeader=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._coverPresets=[0,25,50,75,100],this._coverEntityPresets={},this._coverRoom="",this._coverRoomDropdownOpen=!1,this._coverRoomEntities=[],this._coverPresetInput="",this._coverEntityPresetInput={},this._presenceShowHeader=!0,this._presencePersonEntities=[],this._presenceSmartphoneSensors={},this._presenceNotifyServices={},this._presenceDrivingSensors={},this._presenceDropdownOpen=null,this._presenceDropdownSearch="",this._mediaShowHeader=!0,this._mediaExtraEntities={},this._spotifyShowHeader=!0,this._spotifyEntity="",this._spotifySortOrder="recent_first",this._spotifyDropdownOpen=!1,this._spotifyMaxItems=6,this._spotifyVisibleSpeakers=[],this._spotifyConfigured=null,this._dashboardEnabledCards=["weather"],this._dashboardCardOrder=["title","weather","light","media","cover","spotify","presence"],this._dashboardHideHeader=!1,this._dashboardHideSidebar=!1,this._dashboardExpanded=new Set,this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._loaded=!1,this._loading=!1,this._toastError=!1,this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this),this._boundUpdateScrollMask=this._updateScrollMask.bind(this),this._initialIcons=new Map,this._tabsEl=null,this._iconLoading=!1}static{this.styles=[_e,ue,ge,r`
      *, *::before, *::after {
        box-sizing: border-box;
      }
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
      @media (hover: hover) and (pointer: fine) {
        .page-back:hover {
          background: var(--s3);
        }
      }
      @media (hover: none) {
        .page-back:active { animation: bounce 0.3s ease; }
      }
      .page-back:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .page-back ha-icon {
        --mdc-icon-size: 18px;
        display: flex; align-items: center; justify-content: center;
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
      @media (hover: hover) and (pointer: fine) {
        .tab:hover {
          color: var(--t2);
        }
      }
      @media (hover: none) {
        .tab:active { animation: bounce 0.3s ease; }
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
        display: flex; align-items: center; justify-content: center;
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
        display: flex; align-items: center; justify-content: center;
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
      @media (hover: hover) and (pointer: fine) {
        .item-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      @media (hover: none) {
        .item-row:active { animation: bounce 0.3s ease; }
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
      .item-row .feature-icon ha-icon { --mdc-icon-size: 16px; }

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
      @media (hover: hover) and (pointer: fine) {
        .drag-handle:hover {
          color: var(--t3);
        }
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 14px;
        display: flex; align-items: center; justify-content: center;
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
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-icon-btn:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      @media (hover: none) {
        .room-icon-btn:active { animation: bounce 0.3s ease; }
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
        display: flex; align-items: center; justify-content: center;
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

      /* ── Icon button (from UI kit) ── */
      .btn-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px; height: 40px;
        border-radius: 12px;
        border: none; background: transparent;
        color: var(--t3); cursor: pointer;
        padding: 0; outline: none; flex-shrink: 0;
        transition: all var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .btn-icon.sm { width: 32px; height: 32px; border-radius: var(--radius-md); }
      .btn-icon.xs { width: 28px; height: 28px; border-radius: var(--radius-sm); }
      .btn-icon ha-icon { display: flex; align-items: center; justify-content: center; }
      .btn-icon.xs ha-icon { --mdc-icon-size: 14px; }
      .btn-icon.sm ha-icon { --mdc-icon-size: 16px; }
      @media (hover: hover) { .btn-icon:hover { background: var(--s2); color: var(--t2); } }
      @media (hover: none) { .btn-icon:active { animation: bounce 0.3s ease; } }
      .btn-icon:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

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
      @media (hover: hover) and (pointer: fine) {
        .dropdown-trigger:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      @media (hover: none) {
        .dropdown-trigger:active { animation: bounce 0.3s ease; }
      }
      .dropdown-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .dropdown-trigger ha-icon {
        --mdc-icon-size: 16px;
        display: flex; align-items: center; justify-content: center;
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
        max-height: 200px;
        overflow-y: auto;
        border-radius: var(--radius-lg);
        padding: 4px;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.1) transparent;
      }
      .dropdown-menu::-webkit-scrollbar { width: 4px; }
      .dropdown-menu::-webkit-scrollbar-track { background: transparent; }
      .dropdown-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      .dropdown-menu::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      .dropdown-search {
        width: calc(100% - 8px); margin: 4px; padding: 7px 10px;
        border-radius: var(--radius-sm); border: 1px solid var(--b1);
        background: var(--s1); color: var(--t1);
        font-family: inherit; font-size: 11px; outline: none;
        box-sizing: border-box;
      }
      .dropdown-search::placeholder { color: var(--t4); }
      .dropdown-search:focus { border-color: var(--b3); }
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
      @media (hover: hover) and (pointer: fine) {
        .dropdown-item:hover {
          background: var(--s3);
          color: var(--t1);
        }
      }
      @media (hover: none) {
        .dropdown-item:active { animation: bounce 0.3s ease; }
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
        display: flex; align-items: center; justify-content: center;
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
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .icon-pick:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      @media (hover: none) {
        .icon-pick:active { animation: bounce 0.3s ease; }
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
        display: flex; align-items: center; justify-content: center;
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
        display: flex; align-items: center; justify-content: center;
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
        display: flex; align-items: center; justify-content: center;
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
        display: flex; align-items: center; justify-content: center;
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

      /* Variant picker */
      .variant-picker {
        display: flex; gap: 6px; margin-top: 6px;
      }

      /* Preview media hero card — full-bleed artwork style */
      .media-preview {
        position: relative; overflow: hidden;
        border-radius: var(--radius-xl);
        min-height: 200px;
        display: flex; flex-direction: column;
        border: 1px solid var(--b2);
        box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15);
      }
      .mp-art-bg {
        position: absolute; inset: 0; z-index: 0;
        background: linear-gradient(135deg, #1a1040 0%, #2d1b69 30%, #4a2c8a 60%, #1a1040 100%);
      }
      .mp-gradient {
        position: absolute; inset: 0; z-index: 1; pointer-events: none;
        background: linear-gradient(to top,
          rgba(0,0,0,0.85) 0%,
          rgba(0,0,0,0.4) 40%,
          rgba(0,0,0,0.15) 70%,
          transparent 100%
        );
      }
      .mp-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        padding: 10px 12px; flex: 1;
      }
      .mp-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .mp-pill {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 3px 8px 3px 5px;
        border-radius: 9999px;
        backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.08);
        font-size: 8px; font-weight: 600; color: rgba(255,255,255,0.9);
      }
      .mp-pill ha-icon { --mdc-icon-size: 10px; display: flex; align-items: center; justify-content: center; }
      .mp-eq {
        display: flex; align-items: flex-end; gap: 1.5px;
        height: 10px; margin-left: 4px;
      }
      .mp-eq-bar {
        width: 2px; border-radius: 1px;
        background: #fff;
        filter: drop-shadow(0 0 3px rgba(255,255,255,0.6));
        animation: mp-eq-1 0.8s ease-in-out infinite alternate;
      }
      .mp-eq-bar:nth-child(1) { height: 40%; animation-delay: 0s; }
      .mp-eq-bar:nth-child(2) { height: 80%; animation-delay: 0.15s; animation-name: mp-eq-2; }
      .mp-eq-bar:nth-child(3) { height: 55%; animation-delay: 0.3s; animation-name: mp-eq-3; }
      @keyframes mp-eq-1 { 0% { height: 20%; } 100% { height: 100%; } }
      @keyframes mp-eq-2 { 0% { height: 30%; } 100% { height: 90%; } }
      @keyframes mp-eq-3 { 0% { height: 15%; } 100% { height: 85%; } }
      .mp-spacer { flex: 1; }
      .mp-glass-panel {
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: var(--radius-lg);
        padding: 10px 12px 8px;
      }
      .mp-track {
        display: flex; flex-direction: column; gap: 2px;
      }
      .mp-track-title {
        font-size: 13px; font-weight: 700; color: #fff; line-height: 1.15;
        text-shadow: 0 1px 6px rgba(0,0,0,0.4);
      }
      .mp-track-artist {
        font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.7);
      }
      .mp-track-meta {
        display: flex; align-items: center; gap: 6px; margin-top: 1px;
      }
      .mp-track-time { font-size: 8px; color: rgba(255,255,255,0.4); font-variant-numeric: tabular-nums; }
      .mp-track-source {
        font-size: 6px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.4px; color: rgba(255,255,255,0.4);
        padding: 1px 4px; border-radius: 3px; background: rgba(255,255,255,0.06);
      }
      .mp-progress {
        position: relative; width: 100%; height: 3px;
        border-radius: 1.5px; background: rgba(255,255,255,0.08); margin-top: 6px;
      }
      .mp-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%; width: 67%;
        border-radius: inherit;
        background: rgba(129,140,248,0.8);
        box-shadow: 0 0 6px rgba(129,140,248,0.4);
      }
      .mp-transport {
        display: flex; align-items: center; justify-content: center; gap: 6px;
        margin-top: 8px;
      }
      .mp-btn {
        width: 24px; height: 24px; border-radius: 6px;
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        color: rgba(255,255,255,0.45); padding: 0;
      }
      .mp-btn ha-icon { --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }
      .mp-btn.skip { width: 28px; height: 28px; }
      .mp-btn.skip ha-icon { --mdc-icon-size: 18px; }
      .mp-btn.main {
        width: 34px; height: 34px; border-radius: 10px;
        background: rgba(129,140,248,0.1); border: 1px solid rgba(129,140,248,0.15);
        color: rgba(129,140,248,0.8);
      }
      .mp-btn.main ha-icon { --mdc-icon-size: 18px; }

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
        display: flex; align-items: center; justify-content: center;
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
      .preview-weather-wrap {
        display: flex; flex-direction: column; gap: 4px;
      }
      .pw-card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 4px;
      }
      .pw-card-title {
        font-size: 7px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .pw-card-location {
        font-size: 7px; font-weight: 500; color: var(--t3);
      }

      /* ── Preview title card ── */
      .preview-title-card {
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: 8px 12px; text-align: center;
      }
      .preview-title-text {
        font-size: 16px; font-weight: 700; color: var(--t1);
        letter-spacing: -0.3px; line-height: 1.2;
        display: flex; align-items: center; gap: 10px;
        width: 100%;
      }
      .preview-title-text::before, .preview-title-text::after {
        content: ''; flex: 1; height: 1px;
        background: linear-gradient(90deg, transparent, var(--b3));
      }
      .preview-title-text::after {
        background: linear-gradient(90deg, var(--b3), transparent);
      }
      .preview-title-mode {
        display: flex; align-items: center; gap: 4px;
        font-size: 9px;
      }
      .preview-title-mode ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .preview-title-dot {
        width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      }

      /* ── Title config styles ── */
      .title-section-gap {
        height: 12px;
      }
      .title-modes-list {
        display: flex; flex-direction: column; gap: 10px;
      }
      .title-mode-row {
        display: flex; flex-direction: column; gap: 8px;
        padding: 12px; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .title-mode-id {
        font-size: 10px; font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-color-row {
        display: flex; align-items: center; gap: 8px;
      }
      .title-color-label {
        font-size: 10px; color: var(--t4); white-space: nowrap;
      }
      .title-color-chips {
        display: flex; gap: 6px; align-items: center;
      }
      .title-color-chip {
        width: 20px; height: 20px; border-radius: 50%;
        border: 2px solid transparent; cursor: pointer;
        transition: all var(--t-fast); outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .title-color-chip:hover { transform: scale(1.1); }
      }
      @media (hover: none) {
        .title-color-chip:active { animation: bounce 0.3s ease; }
      }
      .title-color-chip.neutral { background: var(--t4); }
      .title-color-chip.success { background: var(--c-success); }
      .title-color-chip.warning { background: var(--c-warning); }
      .title-color-chip.info { background: var(--c-info); }
      .title-color-chip.accent { background: var(--c-accent); }
      .title-color-chip.alert { background: var(--c-alert); }
      .title-color-chip.active { border-color: var(--t1); transform: scale(1.15); }

      /* ── Title mode icon picker ── */
      .title-mode-fields-row {
        display: flex; gap: 8px; align-items: center;
      }
      .title-mode-fields-row .input { flex: 1; min-width: 0; }
      .title-icon-btn {
        width: 44px; align-self: stretch; flex-shrink: 0;
        border-radius: 12px; border: 1px solid var(--b2);
        background: var(--s1); cursor: pointer; outline: none;
        display: flex; align-items: center; justify-content: center;
        padding: 0; font-family: inherit;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .title-icon-btn ha-icon {
        --mdc-icon-size: 20px;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-icon-btn.has-icon { border-color: var(--b3); }
      .title-icon-btn.has-icon ha-icon { color: var(--t1); }
      @media (hover: hover) and (pointer: fine) {
        .title-icon-btn:hover { background: var(--s3); border-color: var(--b3); }
      }
      @media (hover: none) {
        .title-icon-btn:active { animation: bounce 0.3s ease; }
      }
      .title-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent); outline-offset: -2px;
      }

      /* ── Icon picker popup (glass) ── */
      .icon-popup-overlay {
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        padding: 24px;
        animation: fade-in 0.15s ease-out;
      }
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      .icon-popup {
        width: 100%; max-width: 400px; max-height: 70vh;
        display: flex; flex-direction: column;
        border-radius: var(--radius-xl);
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15);
        border: 1px solid var(--b2);
        overflow: hidden;
        animation: popup-in 0.2s var(--ease-out);
      }
      @keyframes popup-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      .icon-popup-header {
        padding: 14px 16px 10px;
        display: flex; flex-direction: column; gap: 10px;
        border-bottom: 1px solid var(--b1);
      }
      .icon-popup-title {
        font-size: 11px; font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .icon-popup-search {
        width: 100%; padding: 10px 14px; border-radius: 12px;
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: 13px;
        outline: none; transition: border-color var(--t-fast);
        box-sizing: border-box;
      }
      .icon-popup-search:focus { border-color: var(--b3); }
      .icon-popup-search::placeholder { color: var(--t4); }
      .icon-popup-grid-wrap {
        flex: 1; overflow-y: auto; padding: 10px;
        scrollbar-width: thin;
        scrollbar-color: var(--s3) transparent;
      }
      .icon-popup-grid {
        display: grid; grid-template-columns: repeat(6, 1fr);
        gap: 4px;
      }
      .icon-popup-grid .icon-pick {
        aspect-ratio: 1; width: 100%;
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-grid .icon-pick ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-empty {
        padding: 24px; text-align: center;
        font-size: 12px; color: var(--t4);
      }

      /* ── Color picker popup (glass) ── */
      .cp-overlay {
        position: fixed; inset: 0; z-index: 10001;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        animation: cpFadeIn 0.2s ease;
      }
      @keyframes cpFadeIn { from { opacity: 0; } to { opacity: 1; } }
      .cp-dialog {
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4); -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2); border-radius: var(--radius-xl);
        padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 14px;
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.25);
        max-width: 300px; width: 90vw;
      }
      .cp-dialog .cp-title {
        font-size: 11px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .cp-wheel-wrap {
        position: relative; width: 220px; height: 220px;
      }
      .cp-wheel-wrap canvas {
        width: 100%; height: 100%; border-radius: 50%; cursor: crosshair;
      }
      .cp-cursor {
        position: absolute; width: 22px; height: 22px; border-radius: 50%;
        border: 3px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.2);
        pointer-events: none; transform: translate(-50%, -50%);
        transition: left 0.05s, top 0.05s;
      }
      .cp-preview {
        width: 100%; height: 32px; border-radius: var(--radius-md);
        border: 1px solid var(--b2);
      }
      .cp-hex {
        font-size: 12px; font-weight: 600; color: var(--t2);
        font-family: monospace; letter-spacing: 0.5px;
      }
      .cp-confirm {
        font-family: inherit; font-size: 12px; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.8px; color: var(--t2);
        background: var(--s2); border: 1px solid var(--b2);
        border-radius: var(--radius-md); padding: 8px 24px;
        cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .cp-confirm:hover { background: var(--s3); border-color: var(--b3); }
      }
      @media (hover: none) {
        .cp-confirm:active { animation: bounce 0.3s ease; }
      }
      .cp-confirm:focus-visible { outline: 2px solid var(--c-accent); outline-offset: -2px; }

      /* Color picker button (rainbow ring) */
      .title-color-picker-btn {
        width: 20px; height: 20px; border-radius: 50%;
        border: 2px solid transparent; cursor: pointer; padding: 0;
        outline: none; background: none; -webkit-tap-highlight-color: transparent;
        transition: all var(--t-fast); flex-shrink: 0;
        position: relative;
      }
      .title-color-picker-btn::before {
        content: ''; position: absolute; inset: -2px; border-radius: 50%;
        background: conic-gradient(
          hsl(0,80%,60%), hsl(60,80%,55%), hsl(120,70%,50%),
          hsl(180,75%,50%), hsl(240,75%,60%), hsl(300,75%,55%), hsl(360,80%,60%)
        );
      }
      @media (hover: hover) and (pointer: fine) {
        .title-color-picker-btn:hover { transform: scale(1.15); }
      }
      @media (hover: none) {
        .title-color-picker-btn:active { animation: bounce 0.3s ease; }
      }
      .title-color-picker-btn:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }
      .title-color-chip.custom {
        border: 2px solid var(--b3);
      }
      .title-color-chip.custom.active {
        border-color: var(--t1); transform: scale(1.15);
      }

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

      /* ── Preview Spotify card ── */
      .preview-spotify-wrap {
        display: flex; flex-direction: column; gap: 4px;
      }
      .ps-card-header {
        display: flex; align-items: center; gap: 4px;
        padding: 0 4px;
      }
      .ps-card-header ha-icon {
        --mdc-icon-size: 10px; color: #1DB954;
        display: flex; align-items: center; justify-content: center;
      }
      .ps-card-title {
        font-size: 7px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .preview-spotify {
        border-radius: var(--radius-lg);
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25);
        border: 1px solid var(--b2);
        overflow: hidden;
        padding: 8px;
        display: flex; flex-direction: column; gap: 6px;
      }
      .ps-search {
        display: flex; align-items: center; gap: 4px;
        background: var(--s3); border-radius: 100px;
        padding: 3px 8px;
      }
      .ps-search ha-icon {
        --mdc-icon-size: 10px; color: var(--t4);
        display: flex; align-items: center; justify-content: center;
      }
      .ps-search-text {
        font-size: 7px; color: var(--t4); flex: 1;
      }
      .ps-tabs {
        display: flex; gap: 3px;
      }
      .ps-tab {
        font-size: 6px; font-weight: 600; letter-spacing: 0.3px;
        color: var(--t4);
        padding: 2px 5px;
        border-radius: 100px;
        border: 1px solid var(--b1);
        background: transparent;
      }
      .ps-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .ps-section-label {
        font-size: 6px; font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
        padding: 2px 0 1px;
      }
      .ps-item-row {
        display: flex; align-items: center; gap: 6px;
        padding: 2px 0;
      }
      .ps-item-art {
        width: 20px; height: 20px; border-radius: 3px;
        background: var(--s3); flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .ps-item-art ha-icon {
        --mdc-icon-size: 10px; color: var(--t4);
        display: flex; align-items: center; justify-content: center;
      }
      .ps-item-info {
        flex: 1; min-width: 0;
      }
      .ps-item-name {
        font-size: 7px; font-weight: 600; color: var(--t2);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ps-item-meta {
        font-size: 6px; color: var(--t4);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ps-item-play {
        --mdc-icon-size: 12px; color: #1DB954; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        opacity: 0.6;
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
        display: flex; align-items: center; justify-content: center;
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
        display: flex; align-items: center; justify-content: center;
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

      /* ── Presence preview ── */
      .preview-presence {
        padding: 12px;
      }
      .preview-presence-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .preview-presence-title {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t2);
      }
      .preview-presence-pill {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 9999px;
        color: white;
      }
      .preview-presence-pill.all-home { background: var(--c-success); }
      .preview-presence-pill.all-away { background: var(--c-alert); }
      .preview-presence-pill.mixed { background: var(--c-accent); }
      .preview-presence-persons {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      .preview-presence-person {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .preview-presence-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        border: 2px solid var(--c-success);
      }
      .preview-presence-person.away .preview-presence-avatar {
        border-color: var(--c-alert);
        opacity: 0.6;
      }
      .preview-presence-avatar.fallback {
        background: var(--s3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-presence-avatar.fallback ha-icon {
        --mdc-icon-size: 18px;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-presence-name {
        font-size: 9px;
        color: var(--t3);
        max-width: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }

      /* ── Presence mapping cards ── */
      .presence-mapping-card {
        margin-top: 10px;
        padding: 12px;
        background: var(--s2);
        border-radius: var(--radius-md);
        border: 1px solid var(--b1);
      }
      .presence-mapping-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
      }
      .presence-mapping-header .feature-icon {
        width: 28px;
        height: 28px;
      }
      .presence-mapping-field {
        margin-bottom: 8px;
      }
      .presence-mapping-field:last-child {
        margin-bottom: 0;
      }
      .presence-mapping-label {
        display: block;
        font-size: 11px;
        color: var(--t3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }
      .presence-mapping-field select.input {
        width: 100%;
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
      @media (hover: hover) and (pointer: fine) {
        .feature-row:hover {
          background: var(--s1);
        }
      }
      @media (hover: none) {
        .feature-row:active { animation: bounce 0.3s ease; }
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
        display: flex; align-items: center; justify-content: center;
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
      .feature-sub {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .feature-sub.open { grid-template-rows: 1fr; }
      .feature-sub-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.2s var(--ease-std);
      }
      .feature-sub.open .feature-sub-inner {
        opacity: 1;
        transition-delay: 0.08s;
      }
      .feature-sub-content {
        padding: 6px 10px 8px;
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
        display: flex; align-items: center; justify-content: center;
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
      @media (hover: hover) and (pointer: fine) {
        .layout-btn:hover {
          background: var(--s3);
          color: var(--t2);
          border-color: var(--b3);
        }
      }
      @media (hover: none) {
        .layout-btn:active { animation: bounce 0.3s ease; }
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
      @media (hover: hover) and (pointer: fine) {
        .schedule-btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (hover: hover) {
        .schedule-btn:active { transform: scale(0.96); }
      }
      @media (hover: none) {
        .schedule-btn:active { animation: bounce 0.3s ease; }
      }
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
      @media (hover: hover) and (pointer: fine) {
        .item-card:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      @media (hover: none) {
        .item-card:active { animation: bounce 0.3s ease; }
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
      @media (hover: hover) and (pointer: fine) {
        .schedule-delete:hover {
          background: rgba(248,113,113,0.2);
          border-color: rgba(248,113,113,0.3);
        }
      }
      @media (hover: hover) {
        .schedule-delete:active { transform: scale(0.96); }
      }
      @media (hover: none) {
        .schedule-delete:active { animation: bounce 0.3s ease; }
      }

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
        display: flex; align-items: center; justify-content: center;
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
      @media (hover: hover) and (pointer: fine) {
        .datetime-display:hover { border-color: var(--b3); }
      }
      @media (hover: none) {
        .datetime-display:active { animation: bounce 0.3s ease; }
      }
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
      @media (hover: hover) and (pointer: fine) {
        .picker-nav:hover { background: var(--s2); color: var(--t1); }
      }
      @media (hover: none) {
        .picker-nav:active { animation: bounce 0.3s ease; }
      }
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
      @media (hover: hover) and (pointer: fine) {
        .picker-day:hover { background: var(--s2); color: var(--t1); }
      }
      @media (hover: none) {
        .picker-day:active { animation: bounce 0.3s ease; }
      }
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
      @media (hover: hover) and (pointer: fine) {
        .btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (hover: none) {
        .btn:active { animation: bounce 0.3s ease; }
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
      @media (hover: hover) and (pointer: fine) {
        .btn-accent:hover {
          background: rgba(129, 140, 248, 0.2);
          border-color: rgba(129, 140, 248, 0.35);
        }
      }
      @media (hover: none) {
        .btn-accent:active { animation: bounce 0.3s ease; }
      }
      .btn-accent:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .btn-ghost {
        border-color: transparent;
        background: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .btn-ghost:hover {
          background: var(--s2);
        }
      }
      @media (hover: none) {
        .btn-ghost:active { animation: bounce 0.3s ease; }
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
    `]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,document.removeEventListener("click",this._boundCloseDropdowns),this._removeTabsScrollListener(),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),this._cancelColorDrag?.(),this._cancelColorDrag=void 0,this._backend=void 0}_closeDropdownsOnOutsideClick(e){if(!(this._dropdownOpen||this._lightDropdownOpen||this._weatherDropdownOpen||this._titleModeDropdownOpen||this._coverRoomDropdownOpen))return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown");for(const s of a)if(t.includes(s))return;this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,this._titleModeDropdownOpen=!1,this._coverRoomDropdownOpen=!1}_setupTabsScrollListener(){if(this._tabsEl)return;const e=this.shadowRoot?.querySelector(".tabs");e&&(this._tabsEl=e,e.addEventListener("scroll",this._boundUpdateScrollMask,{passive:!0}),this._updateScrollMask())}_removeTabsScrollListener(){this._tabsEl&&(this._tabsEl.removeEventListener("scroll",this._boundUpdateScrollMask),this._tabsEl=null)}_updateScrollMask(){const e=this._tabsEl;if(!e)return;const t=e.scrollLeft<=5,i=e.scrollLeft+e.offsetWidth>=e.scrollWidth-5;e.classList.remove("mask-left","mask-right","mask-both"),t&&!i?e.classList.add("mask-right"):!t&&i?e.classList.add("mask-left"):t||i||e.classList.add("mask-both")}updated(e){super.updated(e),this._setupTabsScrollListener(),e.has("hass")&&(this.hass?.language&&fe(this.hass.language)&&(this._lang=ye()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1),!this.hass||this._loaded||this._loading||(this._backend=new Ee(this.hass),this._loadConfig()))}async _loadConfig(){if(this.hass&&!this._loading){this._loading=!0;try{await this._loadConfigInner(),this._loaded=!0}catch{this._loaded=!1}finally{this._loading=!1}}}async _loadConfigInner(){if(!this.hass)return;const e=Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let t={room_order:[],hidden_rooms:[],show_lights:!0,show_temperature:!0,show_humidity:!0,show_media:!0,auto_sort:!0,temp_high:24,temp_low:17,humidity_threshold:65},i={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},a={enabled_cards:["weather"],card_order:["title","weather","light","cover","spotify"],hide_header:!1,hide_sidebar:!1},s={show_header:!0},r={title:"",mode_entity:"",modes:[]},o={show_header:!0,dashboard_entities:[],presets:[0,25,50,75,100],entity_presets:{}},n={show_header:!0,entity_id:"",sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},c={variant:"list",dashboard_variant:"list",room_variants:{},extra_entities:{},show_header:!0},d={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}};const l={};try{if(!this._backend)throw new Error("No backend");const e=await this._backend.send("get_config");t=e.navbar,Object.assign(l,e.rooms),e.weather&&(i=e.weather),e.light_card&&(s=e.light_card),e.title_card&&(r=e.title_card),e.cover_card&&(o=e.cover_card),e.spotify_card&&(n=e.spotify_card),e.media_card&&(c=e.media_card),e.presence_card&&(d=e.presence_card),e.dashboard&&(a=e.dashboard)}catch{}this._showLights=t.show_lights??!0,this._showTemperature=t.show_temperature??!0,this._showHumidity=t.show_humidity??!0,this._showMedia=t.show_media??!0,this._autoSort=t.auto_sort??!0,this._tempHigh=t.temp_high??24,this._tempLow=t.temp_low??17,this._humidityThreshold=t.humidity_threshold??65,this._weatherEntity=i.entity_id??"",this._weatherHiddenMetrics=i.hidden_metrics??[],this._weatherShowDaily=i.show_daily??!0,this._weatherShowHourly=i.show_hourly??!0,this._weatherShowHeader=i.show_header??!0,this._lightShowHeader=s.show_header??!0,this._titleText=r.title??"",this._titleModeEntity=r.mode_entity??"",this._titleModes=r.modes??[],this._coverShowHeader=o.show_header??!0,this._coverDashboardEntities=o.dashboard_entities??[],this._coverPresets=o.presets??[0,25,50,75,100],this._coverEntityPresets=o.entity_presets??{},this._initCoverDashboardOrder(),this._spotifyShowHeader=n.show_header??!0,this._spotifyEntity=n.entity_id??"",this._spotifySortOrder="oldest_first"===n.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=n.max_items_per_section??6,this._spotifyVisibleSpeakers=n.visible_speakers??[],this._checkSpotifyStatus(),this._mediaShowHeader=c.show_header??!0,this._mediaExtraEntities=c.extra_entities??{},this._presenceShowHeader=d.show_header??!0,this._presencePersonEntities=d.person_entities??[],this._presenceSmartphoneSensors=d.smartphone_sensors??{},this._presenceNotifyServices=d.notify_services??{},this._presenceDrivingSensors=d.driving_sensors??{},this._dashboardEnabledCards=a.enabled_cards??["weather"],this._dashboardCardOrder=a.card_order??["title","weather","light","media","cover","spotify","presence"],this._dashboardHideHeader=a.hide_header??!1,this._dashboardHideSidebar=a.hide_sidebar??!1;const p=new Set(t.hidden_rooms),h=new Map;t.room_order.forEach((e,t)=>h.set(e,t));const _=this.hass;if(!_)return;const u=[],g=[];for(const v of e){const e=Se(v.area_id,_.entities,_.devices),t=l[v.area_id]?.icon,i=t||v.icon||"mdi:home";if(0===e.length){g.push({areaId:v.area_id,name:v.name,icon:i});continue}let a=0,s=null,r=null,o=null,n=null,c=!1;for(const d of e){const e=_.states[d.entity_id];if(!e)continue;const t=d.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&a++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||s||(s=`${e.state}°`,r=parseFloat(e.state)),"humidity"!==t||o||(o=`${e.state}%`,n=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(c=!0)}u.push({areaId:v.area_id,name:v.name,icon:i,entityCount:e.length,visible:!p.has(v.area_id),lightsOn:a,temperature:s,tempValue:r,humidity:o,humidityValue:n,mediaPlaying:c})}this._initialIcons.clear();for(const v of u)this._initialIcons.set(v.areaId,v.icon);u.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=h.get(e.areaId),a=h.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._rooms=u,this._emptyRooms=g,!this._selectedRoom&&u.length>0&&(this._selectedRoom=u[0].areaId),this._loadRoomCards()}async _loadRoomCards(){if(!this.hass||!this._selectedRoom)return this._cards=[],void(this._scenes=[]);const e=this._selectedRoom,t=Se(e,this.hass.entities,this.hass.devices);let i=null,a=new Set,s=new Set,r=[];try{if(!this._backend)throw new Error("No backend");const t=await this._backend.send("get_room",{area_id:e});if(this._selectedRoom!==e)return;t&&(i=t.card_order.length>0?t.card_order:null,a=new Set(t.hidden_entities),s=new Set(t.hidden_scenes??[]),r=t.scene_order??[])}catch{}const o=this.hass,n=t.filter(e=>e.entity_id.startsWith("scene.")),c=new Map;r.forEach((e,t)=>c.set(e,t));const d=n.map(e=>{const t=o.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!s.has(e.entity_id)}});d.sort((e,t)=>{const i=c.get(e.entityId),a=c.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._scenes=d;const l=new Map;for(const _ of t){if(a.has(_.entity_id))continue;const e=_.entity_id.split(".")[0];l.set(e,(l.get(e)||0)+1)}const p=i?[...i]:[...De],h=new Set(p);for(const _ of l.keys())!h.has(_)&&Ie[_]&&p.push(_);this._cards=p.filter(e=>(l.get(e)||0)>0&&Me.has(e)).map(e=>{const t=function(e){const t=Te[e];return{nameKey:t?t.name:null,icon:Ie[e]||"mdi:help-circle",descKey:t?t.desc:null}}(e),a=l.get(e)||0;return{id:e,nameKey:t.nameKey,icon:t.icon,descKey:t.descKey,count:a,visible:i?i.includes(e):a>0}})}_switchTab(e){this._tab=e,this._iconPickerRoom=null,this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,this._titleModeDropdownOpen=!1,this._coverRoomDropdownOpen=!1,this._spotifyDropdownOpen=!1,this._presenceDropdownOpen=null,this._iconPopupModeIdx=null,this._colorPickerModeIdx=null,"light"===e&&!this._lightRoom&&this._rooms.length>0&&(this._lightRoom=this._rooms[0].areaId,this._loadRoomLights()),"cover"===e&&!this._coverRoom&&this._rooms.length>0&&(this._coverRoom=this._rooms[0].areaId,this._loadRoomCovers()),"cover"!==e&&"dashboard"!==e||0!==this._coverDashboardOrder.length||this._initCoverDashboardOrder()}_onDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("rooms"===i){const t=[...this._rooms],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._rooms=t}else if("cards"===i){const t=[...this._cards],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._cards=t}else if("scenes"===i){const t=[...this._scenes],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._scenes=t}else if("lights"===i){const t=[...this._lights],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._lights=t}this._dragIdx=null,this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_toggleRoomVisible(e){const t=this._rooms.map(t=>t.areaId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),a=t.filter(e=>!e.visible);this._rooms=[...i,...a]}_openIconPicker(e){this._iconPickerRoom=this._iconPickerRoom===e?null:e}_setRoomIcon(e,t){this._rooms=this._rooms.map(i=>i.areaId===e?{...i,icon:t}:i),this._iconPickerRoom=null}_toggleCardVisible(e){this._cards=this._cards.map(t=>t.id===e?{...t,visible:!t.visible}:t)}_toggleSceneVisible(e){this._scenes=this._scenes.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_selectRoom(e){this._selectedRoom=e,this._dropdownOpen=!1,this._loadRoomCards()}async _saveNavbar(){const e=this._backend;if(e&&!this._saving){this._saving=!0;try{await e.send("set_navbar",{room_order:this._rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:this._rooms.filter(e=>!e.visible).map(e=>e.areaId),show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity,show_media:this._showMedia,auto_sort:this._autoSort,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold});const t=this._rooms.filter(e=>e.icon!==this._initialIcons.get(e.areaId)).map(t=>{const i=this.hass?.areas[t.areaId],a=i?.icon||"mdi:home",s=t.icon===a?null:t.icon;return e.send("set_room",{area_id:t.areaId,icon:s})});if(t.length>0&&await Promise.all(t),!this._mounted)return;this._showToast(),he.emit("navbar-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _savePopup(){if(this._backend&&!this._saving&&this._selectedRoom){this._saving=!0;try{if(await this._backend.send("set_room",{area_id:this._selectedRoom,card_order:this._cards.filter(e=>e.visible).map(e=>e.id),hidden_scenes:this._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:this._scenes.map(e=>e.entityId)}),!this._mounted)return;this._showToast(),he.emit("room-config-changed",{areaId:this._selectedRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}_save(){"navbar"===this._tab?this._saveNavbar():"popup"===this._tab?this._savePopup():"light"===this._tab?this._saveLights():"weather"===this._tab?this._saveWeather():"title"===this._tab?this._saveTitle():"cover"===this._tab?this._saveCover():"spotify"===this._tab?this._saveSpotify():"media"===this._tab?this._saveMedia():"presence"===this._tab?this._savePresence():this._saveDashboard()}_selectLightRoom(e){this._lightRoom=e,this._lightDropdownOpen=!1,this._loadRoomLights()}async _loadRoomLights(){if(!this.hass||!this._lightRoom)return void(this._lights=[]);const e=this._lightRoom,t=Se(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light."));let i=new Set,a=[],s={};try{if(!this._backend)throw new Error("No backend");const t=await this._backend.send("get_room",{area_id:e});if(this._lightRoom!==e)return;t&&(i=new Set(t.hidden_entities??[]),a=t.entity_order??[],s=t.entity_layouts??{})}catch{}const r=this.hass,o=new Map;a.forEach((e,t)=>o.set(e,t));const n=t.map(e=>{const t=r.states[e.entity_id],a="on"===t?.state,o=t?.attributes.brightness,n=a&&void 0!==o?Math.round(o/255*100):0;return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:a,brightnessPct:n,layout:s[e.entity_id]||"compact",visible:!i.has(e.entity_id)}});n.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=o.get(e.entityId),a=o.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._lights=n;try{if(this._backend){const e=await this._backend.send("get_schedules");this._schedulesLoaded=e??{},this._scheduleEdits=new Map;for(const t of n){const e=this._schedulesLoaded[t.entityId];this._scheduleEdits.set(t.entityId,e?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}_toggleLightVisible(e){const t=this._lights.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),a=t.filter(e=>!e.visible);this._lights=[...i,...a]}_cycleLightLayout(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleScheduleExpand(e){if(this._scheduleExpandedEntity=this._scheduleExpandedEntity===e?null:e,!this._scheduleEdits.has(e)){const t=this._schedulesLoaded[e];this._scheduleEdits.set(e,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}this.requestUpdate()}_addSchedulePeriod(e){const t=this._scheduleEdits.get(e)??[];t.push({start:"",end:"",recurring:!1}),this._scheduleEdits.set(e,[...t]),this.requestUpdate()}_removeSchedulePeriod(e,t){const i=this._scheduleEdits.get(e)??[];i.splice(t,1),this._scheduleEdits.set(e,[...i]),this.requestUpdate(),this._saveSchedule(e)}_updateSchedulePeriod(e,t,i,a){const s=this._scheduleEdits.get(e)??[];s[t]&&(s[t]={...s[t],[i]:a},this._scheduleEdits.set(e,[...s]),this.requestUpdate())}_toggleScheduleRecurring(e,t){const i=this._scheduleEdits.get(e)??[];i[t]&&(i[t]={...i[t],recurring:!i[t].recurring},this._scheduleEdits.set(e,[...i]),this.requestUpdate())}async _saveSchedule(e){if(!this._backend)return;const t=(this._scheduleEdits.get(e)??[]).filter(e=>e.start&&e.end);try{if(await this._backend.send("set_schedule",{entity_id:e,periods:t}),!this._mounted)return;this._showToast(),he.emit("schedule-changed",{entityId:e})}catch{if(!this._mounted)return;this._showToast(!0)}}_parseDateTimeValue(e){if(!e)return null;const[t,i]=e.split("T");if(!t)return null;const a=t.split("-").map(Number);if(a.length<3||a.some(isNaN))return null;const[s,r,o]=a,[n,c]=(i??"00:00").split(":");return{year:s,month:r-1,day:o,hour:n??"00",minute:c??"00"}}_openRangePicker(e,t){this._pickerTarget={entityId:e,periodIdx:t};const i=(this._scheduleEdits.get(e)??[])[t],a=i?this._parseDateTimeValue(i.start):null,s=i?this._parseDateTimeValue(i.end):null,r=new Date;a?(this._pickerStartDay=a.day,this._pickerStartMonth=a.month,this._pickerStartYear=a.year,this._pickerStartHour=a.hour,this._pickerStartMinute=a.minute,this._pickerYear=a.year,this._pickerMonth=a.month):(this._pickerStartDay=null,this._pickerStartMonth=r.getMonth(),this._pickerStartYear=r.getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerYear=r.getFullYear(),this._pickerMonth=r.getMonth()),s?(this._pickerEndDay=s.day,this._pickerEndMonth=s.month,this._pickerEndYear=s.year,this._pickerEndHour=s.hour,this._pickerEndMinute=s.minute):(this._pickerEndDay=null,this._pickerEndMonth=r.getMonth(),this._pickerEndYear=r.getFullYear(),this._pickerEndHour="23",this._pickerEndMinute="59"),this._pickerPhase=a?s?"start":"end":"start",this._pickerOpen=!0}_closePicker(){this._pickerOpen=!1,this._pickerTarget=null}_pickerPrevMonth(){0===this._pickerMonth?(this._pickerMonth=11,this._pickerYear--):this._pickerMonth--}_pickerNextMonth(){11===this._pickerMonth?(this._pickerMonth=0,this._pickerYear++):this._pickerMonth++}_pickerSelectDay(e,t){if(!t)if("start"===this._pickerPhase){if(this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerPhase="end",null!==this._pickerEndDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,e).getTime();new Date(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay).getTime()<t&&(this._pickerEndDay=null)}}else{if(null!==this._pickerStartDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay).getTime();if(new Date(this._pickerYear,this._pickerMonth,e).getTime()<t)return this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerEndDay=null,void(this._pickerPhase="start")}this._pickerEndDay=e,this._pickerEndMonth=this._pickerMonth,this._pickerEndYear=this._pickerYear}}_pickerSetTime(e,t){const i=t.target.value.replace(/\D/g,"").slice(0,2),a=e.includes("Hour"),s=Math.min(a?23:59,Math.max(0,parseInt(i,10)||0)),r=String(s).padStart(2,"0");t.target.value=r,"startHour"===e?this._pickerStartHour=r:"startMinute"===e?this._pickerStartMinute=r:"endHour"===e?this._pickerEndHour=r:this._pickerEndMinute=r,this.requestUpdate()}_pickerConfirm(){if(!this._pickerTarget||null===this._pickerStartDay||null===this._pickerEndDay)return;const{entityId:e,periodIdx:t}=this._pickerTarget,i=String(this._pickerStartMonth+1).padStart(2,"0"),a=String(this._pickerStartDay).padStart(2,"0"),s=String(this._pickerEndMonth+1).padStart(2,"0"),r=String(this._pickerEndDay).padStart(2,"0"),o=`${this._pickerStartYear}-${i}-${a}T${this._pickerStartHour}:${this._pickerStartMinute}`,n=`${this._pickerEndYear}-${s}-${r}T${this._pickerEndHour}:${this._pickerEndMinute}`;this._updateSchedulePeriod(e,t,"start",o),this._updateSchedulePeriod(e,t,"end",n),this._closePicker()}_toAbsDay(e,t,i){return new Date(e,t,i).getTime()}_getMonthDays(){const e=this._pickerYear,t=this._pickerMonth,i=(new Date(e,t,1).getDay()+6)%7,a=new Date(e,t+1,0).getDate(),s=new Date(e,t,0).getDate(),r=new Date,o=r.getFullYear()===e&&r.getMonth()===t,n=r.getDate(),c=null!==this._pickerStartDay?this._toAbsDay(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay):null,d=null!==this._pickerEndDay?this._toAbsDay(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay):null,l=[],p=(e,t,i,a)=>{const s=this._toAbsDay(i,a,e);return{day:e,otherMonth:t,today:!t&&o&&e===n,rangeStart:null!==c&&s===c,rangeEnd:null!==d&&s===d,inRange:null!==c&&null!==d&&s>c&&s<d}},h=0===t?11:t-1,_=0===t?e-1:e;for(let m=i-1;m>=0;m--)l.push(p(s-m,!0,_,h));for(let m=1;m<=a;m++)l.push(p(m,!1,e,t));const u=11===t?0:t+1,g=11===t?e+1:e,v=42-l.length;for(let m=1;m<=v;m++)l.push(p(m,!0,g,u));return l}_getMonthLabel(){const e=new Date(this._pickerYear,this._pickerMonth,1),t="fr"===this._lang?"fr-FR":"en-US",i=e.toLocaleDateString(t,{month:"long"});return`${i.charAt(0).toUpperCase()}${i.slice(1)} ${this._pickerYear}`}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_renderDateTimePicker(){const e=this._getMonthDays(),t=this._getDayLabels(),i=null!==this._pickerStartDay&&null!==this._pickerEndDay;return U`
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
            ${t.map(e=>U`<span class="picker-day-label">${e}</span>`)}
            ${e.map(e=>{const t=["picker-day",e.today?"today":"",e.rangeStart?"range-start":"",e.rangeEnd?"range-end":"",e.inRange?"in-range":"",e.otherMonth?"other-month":""].filter(Boolean).join(" ");return U`
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
    `}async _saveLights(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_light_config",{show_header:this._lightShowHeader}),!this._lightRoom){if(!this._mounted)return;return this._showToast(),void he.emit("light-config-changed",void 0)}let e=[];try{const t=await this._backend.send("get_room",{area_id:this._lightRoom});t&&(e=t.hidden_entities??[])}catch{}const t=new Set(this._lights.map(e=>e.entityId)),i=e.filter(e=>!t.has(e)),a=this._lights.filter(e=>!e.visible).map(e=>e.entityId),s={};for(const r of this._lights)"full"===r.layout&&(s[r.entityId]=r.layout);if(await this._backend.send("set_room",{area_id:this._lightRoom,entity_order:this._lights.map(e=>e.entityId),hidden_entities:[...i,...a],entity_layouts:s}),!this._mounted)return;this._showToast(),he.emit("room-config-changed",{areaId:this._lightRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}async _reset(){this._loaded=!1,await this._loadConfig(),this._lightRoom&&await this._loadRoomLights()}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_goBack(){history.back()}_renderNavbarPreview(){const e=[...this._rooms.filter(e=>e.visible)];return this._autoSort&&e.sort((e,t)=>(e.lightsOn>0?0:1)-(t.lightsOn>0?0:1)),U`
      <div class="preview-navbar">
        ${e.map((e,t)=>{const i=this._showLights&&e.lightsOn>0,a=this._showHumidity&&null!==e.humidityValue&&e.humidityValue>=this._humidityThreshold,s=this._showMedia&&e.mediaPlaying,r=this._showTemperature&&null!==e.tempValue&&e.tempValue>=this._tempHigh,o=["preview-nav-item",0===t?"active-preview":"",i?"has-light":"",a?"has-humidity":"",s?"has-music":"",r?"has-temp-hot":"",this._showTemperature&&null!==e.tempValue&&!r&&e.tempValue<=this._tempLow?"has-temp-cold":""].filter(Boolean).join(" ");return U`
            <div class=${o}>
              <span class="preview-temp-badge">
                <ha-icon .icon=${r?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
              </span>
              <ha-icon .icon=${e.icon}></ha-icon>
              <div class="preview-nav-label"><span>${e.name}</span></div>
            </div>
          `})}
      </div>
    `}_renderPopupPreview(){const e=this._rooms.find(e=>e.areaId===this._selectedRoom);if(!e)return U`<div class="preview-empty">${we("config.popup_select_room")}</div>`;const t=this._scenes.length>0,i=this._scenes.filter(e=>e.visible),a=["preview-popup-icon-box",e.lightsOn>0?"has-light":"",e.mediaPlaying?"has-music":""].filter(Boolean).join(" ");return U`
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
              ${e.temperature?U`<span>${e.temperature}</span>`:W}
              ${e.humidity?U`<span>${e.humidity}</span>`:W}
            </div>
          </div>
          <div class="preview-popup-close">
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </div>
        </div>

        ${i.length>0?U`
          <div class="preview-popup-scenes">
            ${this._scenes.map(e=>U`
                <span class="preview-scene-chip ${e.visible?"":"hidden-scene"}">${e.name}</span>
              `)}
          </div>
        `:W}

        <div class="preview-popup-cards">
          ${this._cards.filter(e=>e.visible).map(e=>U`
              <div class="preview-card-slot">
                <ha-icon .icon=${e.icon}></ha-icon>
                <span class="preview-card-slot-name">${e.nameKey?we(e.nameKey):e.id}</span>
                <span class="preview-card-slot-count">${e.count}</span>
              </div>
            `)}
        </div>
      </div>
    `}_renderNavbarTab(){return U`
      <div class="tab-panel" id="panel-navbar">

        ${this._emptyRooms.length>0?U`
          <div class="section-label">${we("config.navbar_empty_rooms")}</div>
          <div class="section-desc">
            ${we("config.navbar_empty_rooms_desc")}
          </div>
          <div class="item-list empty-rooms">
            ${this._emptyRooms.map(e=>U`
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
        `:W}

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
              ${ze.map(e=>U`
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
          ${[{key:"lights",icon:"mdi:lightbulb",nameKey:"config.navbar_ind_lights",descKey:"config.navbar_ind_lights_desc"},{key:"temperature",icon:"mdi:thermometer",nameKey:"config.navbar_ind_temp",descKey:"config.navbar_ind_temp_desc"},{key:"humidity",icon:"mdi:water-percent",nameKey:"config.navbar_ind_humidity",descKey:"config.navbar_ind_humidity_desc"},{key:"media",icon:"mdi:music",nameKey:"config.navbar_ind_media",descKey:"config.navbar_ind_media_desc"}].map(e=>{const t={lights:this._showLights,temperature:this._showTemperature,humidity:this._showHumidity,media:this._showMedia}[e.key];return U`
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
    `}_renderRoomRow(e,t){const i=this._dragIdx===t&&"rooms"===this._dragContext,a=this._dropIdx===t&&"rooms"===this._dragContext,s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return U`
      <div
        class=${s}
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
    `}_renderPopupTab(){const e=this._rooms.find(e=>e.areaId===this._selectedRoom);return U`
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
            ${this._rooms.map(e=>U`
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

        ${this._scenes.length>0?U`
          <div class="section-label">${we("config.popup_scenes")} (${this._scenes.length})</div>
          <div class="section-desc">
            ${we("config.popup_scenes_desc")}
          </div>
          <div class="item-list">
            ${this._scenes.map((e,t)=>this._renderSceneRow(e,t))}
          </div>
        `:W}

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
    `}_renderCardRow(e,t){const i=this._dragIdx===t&&"cards"===this._dragContext,a=this._dropIdx===t&&"cards"===this._dragContext,s=["item-row card-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return U`
      <div
        class=${s}
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
    `}_renderSceneRow(e,t){const i=this._dragIdx===t&&"scenes"===this._dragContext,a=this._dropIdx===t&&"scenes"===this._dragContext,s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return U`
      <div
        class=${s}
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
    `}_renderLightPreview(){if(!this._lightRoom)return U`<div class="preview-empty">${we("config.light_select_room")}</div>`;if(0===this._lights.length)return U`<div class="preview-empty">${we("config.light_no_lights")}</div>`;const e=this._lights.filter(e=>e.visible),t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,s=0===t?"none":t===i?"all":"some";if(0===e.length)return U`<div class="preview-empty">${we("config.light_no_visible")}</div>`;const r=[],o=[];for(const d of e){"compact"===("full"===d.layout?"full":"compact")?(o.push(d),2===o.length&&(r.push({kind:"compact-pair",left:o[0],right:o[1]}),o.length=0)):(o.length>0&&(r.push({kind:"full",light:o[0]}),o.length=0),r.push({kind:"full",light:d}))}o.length>0&&r.push({kind:"full",light:o[0]});const n=a?.06:0,c=(e,t,i)=>{const a=["preview-light-row",t?"compact":"",i?"compact-right":"",e.visible?"":"hidden-light"].filter(Boolean).join(" "),s=this._scheduleEdits.get(e.entityId),r=s?s.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0;return U`
        <div class=${a} data-on=${e.isOn}>
          <div class="preview-light-icon ${e.isOn?"on":""}">
            <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
          </div>
          <div class="preview-light-info">
            <div class="preview-light-name">${e.name}</div>
            <div class="preview-light-sub">${e.isOn?`${e.brightnessPct}%`:we("common.off")}</div>
          </div>
          ${r?U`<ha-icon class="preview-light-sched" .icon=${"mdi:calendar-clock"}></ha-icon>`:W}
          ${"full"===e.layout?U`<span class="preview-light-layout-tag">full</span>`:W}
          <span class="preview-light-dot ${e.isOn?"on":""}"></span>
        </div>
      `};return U`
      <div class="preview-light">
        ${this._lightShowHeader?U`
          <div class="preview-light-header">
            <div class="preview-light-header-left">
              <span class="preview-light-title">${we("light.title")}</span>
              <span class="preview-light-count ${s}">${t}/${i}</span>
            </div>
            <div class="preview-light-toggle ${a?"on":""}"></div>
          </div>
        `:W}
        <div class="preview-light-body">
          <div
            class="preview-light-tint"
            style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${n}"
          ></div>
          <div class="preview-light-grid">
            ${r.map(e=>"full"===e.kind?c(e.light,!1,!1):U`
                ${c(e.left,!0,!1)}
                ${e.right?c(e.right,!0,!0):W}
              `)}
          </div>
        </div>
      </div>
    `}_renderLightTab(){const e=this._rooms.find(e=>e.areaId===this._lightRoom);return U`
      <div class="tab-panel" id="panel-light">
        <div class="section-label">${we("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._lightShowHeader=!this._lightShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.light_show_header")}</div>
              <div class="feature-desc">${we("config.light_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._lightShowHeader?"on":""}"
              role="switch"
              aria-checked=${this._lightShowHeader?"true":"false"}
            ></span>
          </button>
        </div>

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
            ${this._rooms.map(e=>U`
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

        ${this._lights.length>0?U`
              <div class="section-label">${we("config.light_list_title")} (${this._lights.length})</div>
              <div class="section-desc">
                ${we("config.light_list_banner")}
              </div>
              <div class="item-list">
                ${this._lights.map((e,t)=>this._renderLightRow(e,t))}
              </div>
            `:this._lightRoom?U`<div class="banner">
                <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
                <span>${we("config.light_no_lights")}</span>
              </div>`:W}

        ${this._lights.length>0?U`
          <div class="section-desc schedule-hint">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            ${we("config.light_schedule_hint")}
          </div>
        `:W}

        <div class="section-desc dashboard-vs-room">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          ${we("config.light_dashboard_vs_room")}
        </div>

        ${this._lightRoom?U`
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
        `:W}
      </div>
    `}_renderLightRow(e,t){const i=this._dragIdx===t&&"lights"===this._dragContext,a=this._dropIdx===t&&"lights"===this._dragContext,s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),r=this._scheduleEdits.get(e.entityId),o=r?r.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0,n=this._scheduleExpandedEntity===e.entityId,c=["item-card",n?"expanded":""].filter(Boolean).join(" ");return U`
      <div class=${c}>
        <div
          class=${s}
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
    `}_formatDateTimeShort(e){if(!e)return"";const[t,i]=e.split("T");if(!t)return e;const[a,s,r]=t.split("-");return`${r}/${s}/${a} ${i??"00:00"}`}_formatPeriodDisplay(e){if(!e.start&&!e.end)return"";const t=this._formatDateTimeShort(e.start),i=this._formatDateTimeShort(e.end);return t&&i?`${t}  →  ${i}`:t?`${t}  → …`:`…  →  ${i}`}_renderScheduleContent(e){const t=this._scheduleEdits.get(e)??[];return U`
      <div class="schedule-body">
        <div class="schedule-header">${we("config.light_schedule_title")}</div>
        ${t.map((t,i)=>U`
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
    `}_selectCoverRoom(e){this._coverRoom=e,this._coverRoomDropdownOpen=!1,this._loadRoomCovers()}async _loadRoomCovers(){if(!this._backend||!this._coverRoom||!this.hass)return;const e=this._coverRoom,t=Se(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id);let i=null;try{i=await this._backend.send("get_room",{area_id:e})}catch{}if(this._coverRoom!==e)return;const a=new Set(i?.hidden_entities??[]),s=i?.entity_order??[],r=[...t].sort((e,t)=>{const i=s.indexOf(e),a=s.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._coverRoomEntities=r.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,s=t?.attributes?.device_class||"shutter";return{entityId:e,name:i,visible:!a.has(e),deviceClass:s}})}_toggleCoverEntityVisibility(e){const t=this._coverRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),a=t.filter(e=>!e.visible);this._coverRoomEntities=[...i,...a]}_getAllCoverEntities(){if(!this.hass)return[];const e=[];for(const[t,i]of Object.entries(this.hass.states)){if(!t.startsWith("cover."))continue;const a=i.attributes?.friendly_name||t.split(".")[1]||t;e.push({entityId:t,name:a})}return e.sort((e,t)=>e.name.localeCompare(t.name))}_toggleCoverDashboardEntity(e){const t=new Set(this._coverDashboardEntities);t.has(e)?t.delete(e):t.add(e),this._coverDashboardEntities=[...t];const i=new Set(this._coverDashboardEntities),a=this._coverDashboardOrder.filter(e=>i.has(e)),s=this._coverDashboardOrder.filter(e=>!i.has(e));this._coverDashboardOrder=[...a,...s]}_initCoverDashboardOrder(){const e=this._getAllCoverEntities().map(e=>e.entityId),t=new Set(this._coverDashboardEntities),i=this._coverDashboardEntities.filter(t=>e.includes(t)),a=e.filter(e=>!t.has(e));this._coverDashboardOrder=[...i,...a]}_onDropDashboardCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverDashboardOrder],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverDashboardOrder=i,this._dragIdx=null,this._dropIdx=null}async _saveCover(){if(this._backend&&!this._saving){this._saving=!0;try{const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));if(await this._backend.send("set_cover_config",{show_header:this._coverShowHeader,dashboard_entities:e,presets:this._coverPresets,entity_presets:this._coverEntityPresets}),this._coverRoom&&this._coverRoomEntities.length>0){let e=[];try{const t=await this._backend.send("get_room",{area_id:this._coverRoom});t&&(e=t.hidden_entities??[])}catch{}const t=new Set(this._coverRoomEntities.map(e=>e.entityId)),i=e.filter(e=>!t.has(e)),a=this._coverRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),s=this._coverRoomEntities.map(e=>e.entityId);await this._backend.send("set_room",{area_id:this._coverRoom,hidden_entities:[...i,...a],entity_order:s})}if(!this._mounted)return;this._showToast(),he.emit("cover-config-changed",void 0),this._coverRoom&&he.emit("room-config-changed",{areaId:this._coverRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}_renderCoverPreview(){const e=this._coverRoomEntities.filter(e=>e.visible),t={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"]},i=e.length>0?e[0]:null,a=i?this.hass?.states[i.entityId]:null,s="open"===a?.state||"opening"===a?.state,r=a?.attributes.current_position,o=!!(4&(a?.attributes.supported_features||0)),n=r??(s?100:0),c=e.filter(e=>{const t=this.hass?.states[e.entityId];return"open"===t?.state||"opening"===t?.state}).length;return U`
      <div class="preview-cover">
        ${this._coverShowHeader?U`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${we("cover.title")}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:${c>0?"rgba(167,139,250,0.15)":"var(--s2)"};color:${c>0?"#a78bfa":"var(--t3)"};">${c}/${e.length}</span>
            </div>
            <div style="display:flex;gap:3px;">
              <div style="width:18px;height:18px;border-radius:4px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                <ha-icon .icon=${"mdi:arrow-up"} style="--mdc-icon-size:10px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
              </div>
              <div style="width:18px;height:18px;border-radius:4px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                <ha-icon .icon=${"mdi:arrow-down"} style="--mdc-icon-size:10px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
              </div>
            </div>
          </div>
        `:W}
        <div class="preview-cover-card glass" style="padding:8px 10px;display:flex;flex-direction:column;gap:2px;position:relative;">
          <!-- Tint -->
          <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#a78bfa,transparent 70%);opacity:${e.length>0?(c/e.length*.18).toFixed(3):"0"};"></div>
          ${0===e.length?U`
            <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
          `:W}
          ${e.slice(0,3).map((e,i)=>{const a=t[e.deviceClass]||t.shutter,s=this.hass?.states[e.entityId],r="open"===s?.state||"opening"===s?.state,c=s?.attributes.current_position,d=0===i;return U`
              <!-- Row -->
              <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;">
                <div style="width:22px;height:22px;border-radius:6px;background:${r?"rgba(167,139,250,0.1)":"var(--s2)"};border:1px solid ${r?"rgba(167,139,250,0.15)":"var(--b1)"};display:flex;align-items:center;justify-content:center;">
                  <ha-icon .icon=${a[r?0:1]} style="--mdc-icon-size:13px;color:${r?"#a78bfa":"var(--t3)"};display:flex;align-items:center;justify-content:center;${r?"filter:drop-shadow(0 0 4px rgba(167,139,250,0.4));":""}"></ha-icon>
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</div>
                  <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
                    <span style="font-size:8px;color:${r?"rgba(167,139,250,0.6)":"var(--t4)"};">${we(r?"cover.open":"cover.closed")}</span>
                  </div>
                </div>
                ${void 0!==c?U`
                  <span style="font-size:12px;font-weight:700;color:${r?"#a78bfa":"var(--t3)"};font-variant-numeric:tabular-nums;">${c}<span style="font-size:8px;font-weight:500;">%</span></span>
                `:W}
                <div style="width:6px;height:6px;border-radius:50%;background:${r?"#a78bfa":"var(--t4)"};${r?"box-shadow:0 0 6px rgba(167,139,250,0.4);":""}"></div>
              </div>
              ${d?U`
                <!-- Expanded controls for first entity -->
                <div style="height:1px;margin:0 8px;background:linear-gradient(90deg,transparent,rgba(167,139,250,0.25),transparent);"></div>
                <div style="padding:4px 2px;display:flex;flex-direction:column;gap:6px;position:relative;z-index:1;">
                  <span style="font-size:8px;font-weight:600;letter-spacing:0.5px;color:rgba(167,139,250,0.6);text-transform:uppercase;">${e.name}</span>
                  <!-- Transport -->
                  <div style="display:flex;align-items:center;justify-content:center;gap:4px;">
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${"mdi:arrow-up"} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${"mdi:stop"} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${"mdi:arrow-down"} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                  </div>
                  <!-- Position slider -->
                  ${o?U`
                    <div style="display:flex;align-items:center;gap:4px;">
                      <ha-icon .icon=${a[1]} style="--mdc-icon-size:12px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
                      <div style="flex:1;height:22px;border-radius:var(--radius-lg);background:var(--s1);border:1px solid var(--b1);position:relative;overflow:hidden;">
                        <div style="position:absolute;top:0;left:0;height:100%;width:${n}%;border-radius:inherit;background:linear-gradient(90deg,rgba(167,139,250,0.15),rgba(167,139,250,0.25));"></div>
                        <div style="position:absolute;top:50%;left:${n}%;transform:translate(-50%,-50%);width:5px;height:14px;border-radius:3px;background:rgba(255,255,255,0.7);"></div>
                        <span style="position:absolute;top:50%;right:6px;transform:translateY(-50%);font-size:9px;font-weight:600;color:var(--t3);">${n}%</span>
                      </div>
                      <ha-icon .icon=${a[0]} style="--mdc-icon-size:12px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                  `:W}
                  <!-- Presets -->
                  <div style="height:1px;background:var(--b1);"></div>
                  <div style="display:flex;gap:4px;flex-wrap:wrap;">
                    ${(this._coverEntityPresets[e.entityId]??this._coverPresets).map(e=>{const t=n===e,i=e>=50,s=0===e?we("cover.preset_closed"):100===e?we("cover.preset_open"):`${e}%`;return U`
                        <span style="
                          display:inline-flex;align-items:center;gap:3px;
                          padding:3px 7px;border-radius:var(--radius-md);
                          border:1px solid ${t?"rgba(167,139,250,0.15)":"var(--b2)"};
                          background:${t?"rgba(167,139,250,0.1)":"var(--s1)"};
                          font-size:9px;font-weight:600;
                          color:${t?"#a78bfa":"var(--t3)"};
                        ">
                          <ha-icon .icon=${a[i?0:1]} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                          ${s}
                        </span>
                      `})}
                  </div>
                </div>
                <div style="height:1px;margin:0 8px;background:linear-gradient(90deg,transparent,rgba(167,139,250,0.25),transparent);"></div>
              `:W}
            `})}
          ${e.length>3?U`
            <div style="font-size:9px;color:var(--t4);text-align:center;padding-top:2px;position:relative;z-index:1;">+${e.length-3}</div>
          `:W}
        </div>
      </div>
    `}_renderCoverTab(){if(!this.hass)return W;const e=this._rooms.find(e=>e.areaId===this._coverRoom);return U`
      <div class="tab-panel" id="panel-cover">
        <div class="section-label">${we("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._coverShowHeader=!this._coverShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.cover_show_header")}</div>
              <div class="feature-desc">${we("config.cover_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._coverShowHeader?"on":""}"
              role="switch"
              aria-checked=${this._coverShowHeader?"true":"false"}
            ></span>
          </button>
        </div>

        <!-- Per-room cover config -->
        <div class="section-label">${we("config.cover_room")}</div>
        <div class="section-desc">${we("config.cover_room_desc")}</div>

        <!-- Room selector dropdown -->
        <div class="dropdown ${this._coverRoomDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._coverRoomDropdownOpen=!this._coverRoomDropdownOpen}}
            aria-expanded=${this._coverRoomDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||we("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(e=>U`
              <button
                class="dropdown-item ${e.areaId===this._coverRoom?"active":""}"
                role="option"
                aria-selected=${e.areaId===this._coverRoom?"true":"false"}
                @click=${()=>this._selectCoverRoom(e.areaId)}
              >
                <ha-icon .icon=${e.icon}></ha-icon>
                ${e.name}
              </button>
            `)}
          </div>
        </div>

        ${this._coverRoom?U`
          ${this._coverRoomEntities.length>0?U`
            <div class="section-label">${we("config.cover_list_title")} (${this._coverRoomEntities.length})</div>
            <div class="section-desc">${we("config.cover_list_banner")}</div>
            <div class="item-list">
              ${this._coverRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"covers"===this._dragContext,a=this._dropIdx===t&&"covers"===this._dragContext,s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return U`
                  <div
                    class=${s}
                    draggable="true"
                    @dragstart=${()=>this._onDragStart(t,"covers")}
                    @dragover=${e=>this._onDragOver(t,e)}
                    @dragleave=${()=>this._onDragLeave()}
                    @drop=${e=>this._onDropCover(t,e)}
                    @dragend=${()=>this._onDragEnd()}
                  >
                    <span class="drag-handle">
                      <ha-icon .icon=${"mdi:drag"}></ha-icon>
                    </span>
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <button
                      class="toggle ${e.visible?"on":""}"
                      @click=${()=>this._toggleCoverEntityVisibility(e.entityId)}
                      role="switch"
                      aria-checked=${e.visible?"true":"false"}
                      aria-label="${e.visible?we("common.hide"):we("common.show")} ${e.name}"
                    ></button>
                  </div>
                  <!-- Per-entity presets -->
                  ${e.visible?U`
                    <div style="padding:2px 8px 8px 32px;">
                      <div style="font-size:9px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">${we("config.cover_entity_presets")}</div>
                      <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">
                        ${(this._coverEntityPresets[e.entityId]??this._coverPresets).map(t=>{const i=t>=50?"mdi:window-shutter-open":"mdi:window-shutter",a=!!this._coverEntityPresets[e.entityId];return U`
                            <span style="
                              display:inline-flex;align-items:center;gap:3px;
                              padding:3px 7px;border-radius:var(--radius-md);
                              border:1px solid ${a?"rgba(167,139,250,0.2)":"var(--b2)"};
                              background:${a?"rgba(167,139,250,0.05)":"var(--s1)"};
                              font-size:10px;font-weight:600;color:${a?"var(--c-accent)":"var(--t3)"};
                            ">
                              <ha-icon .icon=${i} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                              ${0===t?we("cover.preset_closed"):100===t?we("cover.preset_open"):`${t}%`}
                              ${a?U`
                                <button
                                  style="background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;color:var(--t4);transition:color var(--t-fast);"
                                  @click=${()=>this._removeCoverEntityPreset(e.entityId,t)}
                                  aria-label="${we("common.delete")} ${t}%"
                                >
                                  <ha-icon .icon=${"mdi:close"} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                </button>
                              `:W}
                            </span>
                          `})}
                        <span style="display:inline-flex;align-items:center;gap:3px;">
                          <input
                            class="input"
                            type="number"
                            min="0"
                            max="100"
                            step="5"
                            .value=${this._coverEntityPresetInput[e.entityId]??""}
                            @input=${t=>{this._coverEntityPresetInput={...this._coverEntityPresetInput,[e.entityId]:t.target.value}}}
                            @keydown=${t=>{"Enter"===t.key&&this._addCoverEntityPreset(e.entityId)}}
                            placeholder="%"
                            style="width:48px;font-size:10px;padding:3px 6px;"
                          />
                          <button
                            style="
                              display:inline-flex;align-items:center;
                              padding:3px 6px;border-radius:var(--radius-md);
                              border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
                              font-size:10px;font-weight:600;color:var(--c-accent);
                              cursor:pointer;font-family:inherit;
                              opacity:${this._coverEntityPresetInput[e.entityId]?"1":"0.4"};
                              pointer-events:${this._coverEntityPresetInput[e.entityId]?"auto":"none"};
                              transition:opacity var(--t-fast);
                            "
                            @click=${()=>this._addCoverEntityPreset(e.entityId)}
                            aria-label="${we("config.cover_preset_add")}"
                          >
                            <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                          </button>
                          ${this._coverEntityPresets[e.entityId]?U`
                            <button
                              style="
                                display:inline-flex;align-items:center;gap:2px;
                                padding:3px 6px;border-radius:var(--radius-md);
                                border:1px solid var(--b2);background:var(--s1);
                                font-size:9px;font-weight:600;color:var(--t4);
                                cursor:pointer;font-family:inherit;
                                transition:all var(--t-fast);
                              "
                              @click=${()=>this._resetCoverEntityPresets(e.entityId)}
                              aria-label="${we("common.reset")}"
                            >
                              <ha-icon .icon=${"mdi:restore"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                            </button>
                          `:W}
                        </span>
                      </div>
                    </div>
                  `:W}
                `})}
            </div>
          `:U`
            <div class="banner">
              <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
              <span>${we("config.cover_no_covers")}</span>
            </div>
          `}
        `:W}

        <!-- Preset config -->
        <div class="section-label">${we("config.cover_presets")}</div>
        <div class="section-desc">${we("config.cover_presets_desc")}</div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
          ${this._coverPresets.map(e=>U`
              <span style="
                display:inline-flex;align-items:center;gap:4px;
                padding:5px 10px;border-radius:var(--radius-md);
                border:1px solid var(--b2);background:var(--s1);
                font-size:11px;font-weight:600;color:var(--t2);
              ">
                <ha-icon .icon=${e>=50?"mdi:window-shutter-open":"mdi:window-shutter"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${0===e?we("cover.preset_closed"):100===e?we("cover.preset_open"):`${e}%`}
                <button
                  style="
                    background:none;border:none;cursor:pointer;padding:0;
                    display:flex;align-items:center;justify-content:center;
                    color:var(--t4);transition:color var(--t-fast);
                  "
                  @click=${()=>this._removeCoverPreset(e)}
                  aria-label="${we("common.delete")} ${e}%"
                >
                  <ha-icon .icon=${"mdi:close"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                </button>
              </span>
            `)}
          <span style="display:inline-flex;align-items:center;gap:4px;">
            <input
              class="input"
              type="number"
              min="0"
              max="100"
              step="5"
              .value=${this._coverPresetInput}
              @input=${e=>{this._coverPresetInput=e.target.value}}
              @keydown=${e=>{"Enter"===e.key&&this._addCoverPreset()}}
              placeholder=${we("config.cover_preset_placeholder")}
              style="width:64px;font-size:11px;padding:5px 8px;"
            />
            <button
              style="
                display:inline-flex;align-items:center;gap:4px;
                padding:5px 10px;border-radius:var(--radius-md);
                border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
                font-size:11px;font-weight:600;color:var(--c-accent);
                cursor:pointer;font-family:inherit;
                opacity:${this._coverPresetInput?"1":"0.4"};
                pointer-events:${this._coverPresetInput?"auto":"none"};
                transition:opacity var(--t-fast);
              "
              @click=${()=>this._addCoverPreset()}
            >
              <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${we("config.cover_preset_add")}
            </button>
          </span>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._resetCover()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}_onDropCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverRoomEntities=i,this._dragIdx=null,this._dropIdx=null}async _resetCover(){if(this._backend){try{const e=await this._backend.send("get_config");e?.cover_card&&(this._coverShowHeader=e.cover_card.show_header??!0,this._coverDashboardEntities=e.cover_card.dashboard_entities??[],this._coverPresets=e.cover_card.presets??[0,25,50,75,100],this._coverEntityPresets=e.cover_card.entity_presets??{},this._coverEntityPresetInput={},this._initCoverDashboardOrder())}catch{}await this._loadRoomCovers()}}_addCoverPreset(){const e=parseInt(this._coverPresetInput,10);isNaN(e)||e<0||e>100||(this._coverPresets.includes(e)||(this._coverPresets=[...this._coverPresets,e].sort((e,t)=>e-t)),this._coverPresetInput="")}_removeCoverPreset(e){this._coverPresets=this._coverPresets.filter(t=>t!==e)}_addCoverEntityPreset(e){const t=this._coverEntityPresetInput[e]??"",i=parseInt(t,10);if(isNaN(i)||i<0||i>100)return;const a=this._coverEntityPresets[e]??[...this._coverPresets];a.includes(i)?this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""}:(this._coverEntityPresets={...this._coverEntityPresets,[e]:[...a,i].sort((e,t)=>e-t)},this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""})}_removeCoverEntityPreset(e,t){const i=this._coverEntityPresets[e];if(!i)return;const a=i.filter(e=>e!==t);if(0===a.length){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}else this._coverEntityPresets={...this._coverEntityPresets,[e]:a}}_resetCoverEntityPresets(e){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}async _saveMedia(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_media_config",{show_header:this._mediaShowHeader,extra_entities:this._mediaExtraEntities}),!this._mounted)return;this._showToast(),he.emit("media-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadMediaConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.media_card&&(this._mediaShowHeader=e.media_card.show_header??!0,this._mediaExtraEntities=e.media_card.extra_entities??{})}catch{}}_renderMediaPreview(){return U`
      <div class="preview-card media-preview">
        <!-- Simulated full-bleed artwork background -->
        <div class="mp-art-bg"></div>
        <div class="mp-gradient"></div>
        <div class="mp-content">
          <!-- Top bar: glass pill badges -->
          <div class="mp-top">
            <div class="mp-pill">
              <ha-icon .icon=${"mdi:speaker"}></ha-icon>
              <span>Salon</span>
              <div class="mp-eq">
                <div class="mp-eq-bar"></div>
                <div class="mp-eq-bar"></div>
                <div class="mp-eq-bar"></div>
              </div>
            </div>
            <div class="mp-pill">
              <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
              <span>2</span>
            </div>
          </div>
          <!-- Spacer -->
          <div class="mp-spacer"></div>
          <!-- Bottom glass panel -->
          <div class="mp-glass-panel">
            <div class="mp-track">
              <div class="mp-track-title">Blinding Lights</div>
              <div class="mp-track-artist">The Weeknd</div>
              <div class="mp-track-meta">
                <span class="mp-track-time">2:14 / 3:20</span>
                <span class="mp-track-source">Spotify</span>
              </div>
            </div>
            <!-- Progress -->
            <div class="mp-progress">
              <div class="mp-progress-fill"></div>
            </div>
            <!-- Transport -->
            <div class="mp-transport">
              <div class="mp-btn"><ha-icon .icon=${"mdi:shuffle-variant"}></ha-icon></div>
              <div class="mp-btn skip"><ha-icon .icon=${"mdi:skip-previous"}></ha-icon></div>
              <div class="mp-btn main"><ha-icon .icon=${"mdi:pause"}></ha-icon></div>
              <div class="mp-btn skip"><ha-icon .icon=${"mdi:skip-next"}></ha-icon></div>
              <div class="mp-btn"><ha-icon .icon=${"mdi:repeat"}></ha-icon></div>
            </div>
          </div>
        </div>
      </div>
    `}_renderMediaTab(){return U`
      <div class="tab-panel" id="panel-media">
        <!-- Show header toggle -->
        <button
          class="feature-row"
          @click=${()=>{this._mediaShowHeader=!this._mediaShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${we("config.media_show_header")}</div>
            <div class="feature-desc">${we("config.media_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${this._mediaShowHeader?"on":""}"
            role="switch"
            aria-checked=${this._mediaShowHeader?"true":"false"}
          ></span>
        </button>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadMediaConfig()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}_toggleDashboardCard(e){const t=new Set(this._dashboardEnabledCards);t.has(e)?t.delete(e):t.add(e),this._dashboardEnabledCards=[...t]}_toggleDashboardExpand(e){const t=new Set(this._dashboardExpanded);t.has(e)?t.delete(e):t.add(e),this._dashboardExpanded=t}_onDropDashboardCard(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_cards"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._dashboardCardOrder],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._dashboardCardOrder=i,this._dragIdx=null,this._dropIdx=null}async _saveDashboard(){if(this._backend&&!this._saving){this._saving=!0;try{await this._backend.send("set_dashboard",{enabled_cards:this._dashboardEnabledCards,card_order:this._dashboardCardOrder,hide_header:this._dashboardHideHeader,hide_sidebar:this._dashboardHideSidebar}),await this._backend.send("set_light_config",{show_header:this._lightShowHeader}),await this._backend.send("set_weather",{show_header:this._weatherShowHeader});const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));if(await this._backend.send("set_cover_config",{show_header:this._coverShowHeader,dashboard_entities:e,presets:this._coverPresets,entity_presets:this._coverEntityPresets}),await this._backend.send("set_spotify_config",{show_header:this._spotifyShowHeader}),await this._backend.send("set_media_config",{show_header:this._mediaShowHeader}),await this._backend.send("set_presence_config",{show_header:this._presenceShowHeader}),!this._mounted)return;this._showToast(),he.emit("dashboard-config-changed",void 0),he.emit("light-config-changed",void 0),he.emit("weather-config-changed",void 0),he.emit("cover-config-changed",void 0),he.emit("spotify-config-changed",void 0),he.emit("media-config-changed",void 0),he.emit("presence-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadDashboardConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.dashboard&&(this._dashboardEnabledCards=e.dashboard.enabled_cards??["weather"],this._dashboardCardOrder=e.dashboard.card_order??["title","weather","light","media","cover","spotify","presence"],this._dashboardHideHeader=e.dashboard.hide_header??!1,this._dashboardHideSidebar=e.dashboard.hide_sidebar??!1),this._lightShowHeader=e?.light_card?.show_header??!0,this._weatherShowHeader=e?.weather?.show_header??!0,this._coverShowHeader=e?.cover_card?.show_header??!0,this._spotifyShowHeader=e?.spotify_card?.show_header??!0,this._mediaShowHeader=e?.media_card?.show_header??!0,this._presenceShowHeader=e?.presence_card?.show_header??!0}catch{}}_renderDashboardPreview(){const e=new Set(this._dashboardEnabledCards),t={title:{icon:"mdi:format-title",label:this._titleText||we("config.title_title_placeholder"),titleStyle:"font-size:11px;font-weight:700;color:var(--t1);"},weather:{icon:"mdi:weather-partly-cloudy",label:we("weather.title")},light:{icon:"mdi:lightbulb-group",label:we("light.title")},media:{icon:"mdi:speaker",label:we("media.title")},cover:{icon:"mdi:blinds",label:we("cover.title")},spotify:{icon:"mdi:spotify",label:we("spotify.title")},presence:{icon:"mdi:account-group",label:we("presence.title")}},i=this._dashboardCardOrder.filter(t=>e.has(t));return U`
      <div class="preview-dashboard">
        <div class="preview-dashboard-cards">
          ${0===i.length?U`<div class="preview-dashboard-empty">—</div>`:W}
          ${i.map(e=>{const i=t[e];return i?U`
              <div class="preview-dashboard-card ${e}">
                ${i.titleStyle?U`<span style=${i.titleStyle}>${i.label}</span>`:U`<ha-icon .icon=${i.icon}></ha-icon><span>${i.label}</span>`}
              </div>
            `:W})}
        </div>
        <div class="preview-dashboard-navbar">
          <ha-icon .icon=${"mdi:sofa"}></ha-icon>
          <ha-icon .icon=${"mdi:stove"}></ha-icon>
          <ha-icon .icon=${"mdi:bed"}></ha-icon>
        </div>
      </div>
    `}_renderDashboardTab(){const e={title:{icon:"mdi:format-title",nameKey:"config.dashboard_card_title",descKey:"config.dashboard_card_title_desc",hasSub:!1},weather:{icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",descKey:"config.dashboard_card_weather_desc",hasSub:!0},light:{icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",descKey:"config.dashboard_card_light_desc",hasSub:!0},cover:{icon:"mdi:blinds",nameKey:"config.dashboard_card_cover",descKey:"config.dashboard_card_cover_desc",hasSub:!0},spotify:{icon:"mdi:spotify",nameKey:"config.dashboard_card_spotify",descKey:"config.dashboard_card_spotify_desc",hasSub:!0},media:{icon:"mdi:speaker",nameKey:"config.dashboard_card_media",descKey:"config.dashboard_card_media_desc",hasSub:!0},presence:{icon:"mdi:account-group",nameKey:"config.dashboard_card_presence",descKey:"config.dashboard_card_presence_desc",hasSub:!0}},t=new Set(this._dashboardEnabledCards);return U`
      <div class="tab-panel" id="panel-dashboard">
        <div class="section-label">${we("config.dashboard_display")}</div>
        <div class="section-desc">${we("config.dashboard_display_desc")}</div>

        <div class="check-item" style="margin-top:12px;">
          <button
            class="toggle ${this._dashboardHideHeader?"on":""}"
            @click=${()=>{this._dashboardHideHeader=!this._dashboardHideHeader,this._saveDashboard()}}
            role="switch"
            aria-checked=${this._dashboardHideHeader?"true":"false"}
            aria-label=${we("config.dashboard_hide_header")}
          ></button>
          <div class="check-label">
            <span>${we("config.dashboard_hide_header")}</span>
            <span class="check-desc">${we("config.dashboard_hide_header_desc")}</span>
          </div>
        </div>
        <div class="check-item" style="margin-bottom:8px;">
          <button
            class="toggle ${this._dashboardHideSidebar?"on":""}"
            @click=${()=>{this._dashboardHideSidebar=!this._dashboardHideSidebar,this._saveDashboard()}}
            role="switch"
            aria-checked=${this._dashboardHideSidebar?"true":"false"}
            aria-label=${we("config.dashboard_hide_sidebar")}
          ></button>
          <div class="check-label">
            <span>${we("config.dashboard_hide_sidebar")}</span>
            <span class="check-desc">${we("config.dashboard_hide_sidebar_desc")}</span>
          </div>
        </div>

        <div class="fold-sep" style="margin:16px 0;"></div>

        <div class="section-label">${we("config.dashboard_title")}</div>
        <div class="section-desc">${we("config.dashboard_desc")}</div>
        <div class="item-list">
          ${this._dashboardCardOrder.map((i,a)=>{const s=e[i];if(!s)return W;const r=t.has(i),o=this._dragIdx===a&&"dashboard_cards"===this._dragContext,n=this._dropIdx===a&&"dashboard_cards"===this._dragContext,c=this._dashboardExpanded.has(i),d=["item-row",r?"":"disabled",o?"dragging":"",n?"drop-target":""].filter(Boolean).join(" "),l=["item-card",c?"expanded":""].filter(Boolean).join(" ");return U`
              <div
                class=${s.hasSub?l:""}
                draggable="true"
                @dragstart=${()=>this._onDragStart(a,"dashboard_cards")}
                @dragover=${e=>this._onDragOver(a,e)}
                @dragleave=${()=>this._onDragLeave()}
                @drop=${e=>this._onDropDashboardCard(a,e)}
                @dragend=${()=>this._onDragEnd()}
              >
                <div class=${d}>
                  <span class="drag-handle">
                    <ha-icon .icon=${"mdi:drag"}></ha-icon>
                  </span>
                  <div class="feature-icon">
                    <ha-icon .icon=${s.icon}></ha-icon>
                  </div>
                  <div class="item-info">
                    <span class="item-name">${we(s.nameKey)}</span>
                    <span class="item-meta">${we(s.descKey)}</span>
                  </div>
                  ${s.hasSub&&r?U`
                    <button
                      class="btn-icon xs"
                      aria-label=${we(c?"common.hide":"common.show")}
                      aria-expanded=${c?"true":"false"}
                      @click=${e=>{e.stopPropagation(),this._toggleDashboardExpand(i)}}
                    >
                      <ha-icon .icon=${c?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                    </button>
                  `:W}
                  <button
                    class="toggle ${r?"on":""}"
                    @click=${e=>{e.stopPropagation(),this._toggleDashboardCard(i)}}
                    role="switch"
                    aria-checked=${r?"true":"false"}
                    aria-label="${we(r?"common.hide":"common.show")} ${we(s.nameKey)}"
                  ></button>
                </div>
                ${s.hasSub?U`
                  <div class="fold-sep ${c&&r?"visible":""}"></div>
                `:W}
                ${this._renderDashboardCardSub(i,r,c)}
              </div>
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
    `}_renderDashboardCardSub(e,t,i){const a=t&&i;return"light"===e?U`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._lightShowHeader=!this._lightShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we("config.light_show_header")}</div>
                  <div class="feature-desc">${we("config.light_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._lightShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._lightShowHeader?"true":"false"}
                ></span>
              </button>
            </div>
          </div>
        </div>
      `:"weather"===e?U`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._weatherShowHeader=!this._weatherShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we("config.weather_show_header")}</div>
                  <div class="feature-desc">${we("config.weather_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._weatherShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._weatherShowHeader?"true":"false"}
                ></span>
              </button>
            </div>
          </div>
        </div>
      `:"cover"===e?U`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._coverShowHeader=!this._coverShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we("config.cover_show_header")}</div>
                  <div class="feature-desc">${we("config.cover_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._coverShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._coverShowHeader?"true":"false"}
                ></span>
              </button>
              <div class="section-label" style="margin-top:10px;">${we("config.cover_dashboard_entities")}</div>
              <div class="section-desc">${we("config.cover_dashboard_entities_desc")}</div>
              <div class="item-list">
                ${this._coverDashboardOrder.map((e,t)=>{const i=this._getAllCoverEntities().find(t=>t.entityId===e);if(!i)return W;const a=this._coverDashboardEntities.includes(i.entityId),s=["item-row",a?"":"disabled",this._dragIdx===t&&"dashboard_covers"===this._dragContext?"dragging":"",this._dropIdx===t&&"dashboard_covers"===this._dragContext?"drop-target":""].filter(Boolean).join(" ");return U`
                    <div
                      class=${s}
                      draggable="true"
                      @dragstart=${()=>this._onDragStart(t,"dashboard_covers")}
                      @dragover=${e=>this._onDragOver(t,e)}
                      @dragleave=${()=>this._onDragLeave()}
                      @drop=${e=>this._onDropDashboardCover(t,e)}
                      @dragend=${()=>this._onDragEnd()}
                    >
                      <span class="drag-handle">
                        <ha-icon .icon=${"mdi:drag"}></ha-icon>
                      </span>
                      <div class="item-info">
                        <span class="item-name">${i.name}</span>
                        <span class="item-meta">${i.entityId}</span>
                      </div>
                      <button
                        class="toggle ${a?"on":""}"
                        @click=${e=>{e.stopPropagation(),this._toggleCoverDashboardEntity(i.entityId)}}
                        role="switch"
                        aria-checked=${a?"true":"false"}
                        aria-label="${we(a?"common.hide":"common.show")} ${i.name}"
                      ></button>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        </div>
      `:"spotify"===e?U`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._spotifyShowHeader=!this._spotifyShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we("config.spotify_show_header")}</div>
                  <div class="feature-desc">${we("config.spotify_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._spotifyShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._spotifyShowHeader?"true":"false"}
                ></span>
              </button>
            </div>
          </div>
        </div>
      `:"media"===e?U`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._mediaShowHeader=!this._mediaShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we("config.media_show_header")}</div>
                  <div class="feature-desc">${we("config.media_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._mediaShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._mediaShowHeader?"true":"false"}
                ></span>
              </button>
            </div>
          </div>
        </div>
      `:"presence"===e?U`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._presenceShowHeader=!this._presenceShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${we("config.presence_show_header")}</div>
                  <div class="feature-desc">${we("config.presence_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._presenceShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._presenceShowHeader?"true":"false"}
                ></span>
              </button>
            </div>
          </div>
        </div>
      `:W}async _savePresence(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_presence_config",{show_header:this._presenceShowHeader,person_entities:this._presencePersonEntities,smartphone_sensors:this._presenceSmartphoneSensors,notify_services:this._presenceNotifyServices,driving_sensors:this._presenceDrivingSensors}),!this._mounted)return;this._showToast(),he.emit("presence-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadPresenceConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.presence_card&&(this._presenceShowHeader=e.presence_card.show_header??!0,this._presencePersonEntities=e.presence_card.person_entities??[],this._presenceSmartphoneSensors=e.presence_card.smartphone_sensors??{},this._presenceNotifyServices=e.presence_card.notify_services??{},this._presenceDrivingSensors=e.presence_card.driving_sensors??{})}catch{}}_getAvailablePersonEntities(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")).map(e=>{const t=this.hass.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableSmartphoneSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("phone")||e.includes("mobile")||e.includes("smartphone")||e.includes("tablet")||e.includes("iphone")||e.includes("galaxy")||e.includes("pixel")||e.includes("oneplus"))).map(e=>{const t=this.hass.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableDrivingSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("binary_sensor.")).map(e=>{const t=this.hass.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableNotifyServices(){if(!this.hass)return[];const e=this.hass.services;return Object.keys(e?.notify??{}).map(e=>`notify.${e}`).sort()}_togglePresencePerson(e){const t=new Set(this._presencePersonEntities);t.has(e)?t.delete(e):t.add(e),this._presencePersonEntities=[...t]}_renderPresencePreview(){const e=this._getAvailablePersonEntities(),t=this._presencePersonEntities.length>0?e.filter(e=>this._presencePersonEntities.includes(e.entityId)):e;if(0===t.length)return U`<div class="preview-empty">${we("config.presence_no_persons")}</div>`;const i=t.filter(e=>{const t=this.hass?.states[e.entityId];return"home"===t?.state}).length;return U`
      <div class="preview-presence">
        ${this._presenceShowHeader?U`
          <div class="preview-presence-header">
            <span class="preview-presence-title">${we("presence.title")}</span>
            <span class="preview-presence-pill ${i===t.length?"all-home":0===i?"all-away":"mixed"}">
              ${i}/${t.length}
            </span>
          </div>
        `:W}
        <div class="preview-presence-persons">
          ${t.slice(0,4).map(e=>{const t=this.hass?.states[e.entityId],i="home"===t?.state,a=t?.attributes?.entity_picture;return U`
              <div class="preview-presence-person ${i?"home":"away"}">
                ${a?U`<div class="preview-presence-avatar" style="background-image:url(${a})"></div>`:U`<div class="preview-presence-avatar fallback"><ha-icon .icon=${"mdi:account"}></ha-icon></div>`}
                <span class="preview-presence-name">${e.name}</span>
              </div>
            `})}
        </div>
      </div>
    `}_renderPresenceTab(){const e=this._getAvailablePersonEntities(),t=this._presencePersonEntities.length>0?this._presencePersonEntities:e.map(e=>e.entityId),i=this._getAvailableSmartphoneSensors(),a=this._getAvailableDrivingSensors(),s=this._getAvailableNotifyServices();return U`
      <div class="tab-panel" id="panel-presence">
        <!-- Behaviour -->
        <div class="section-label">${we("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._presenceShowHeader=!this._presenceShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.presence_show_header")}</div>
              <div class="feature-desc">${we("config.presence_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._presenceShowHeader?"on":""}"
              role="switch"
              aria-checked=${this._presenceShowHeader?"true":"false"}
            ></span>
          </button>
        </div>

        <!-- Person entities -->
        <div class="section-label">${we("config.presence_persons")}</div>
        <div class="section-desc">${we("config.presence_persons_desc")}</div>

        ${0===e.length?U`
          <div class="preview-empty">${we("config.presence_no_persons")}</div>
        `:U`
          <div class="item-list">
            ${e.map(e=>{const t=this._presencePersonEntities.includes(e.entityId),i=0===this._presencePersonEntities.length;return U`
                <div class="item-row ${t||i?"":"disabled"}">
                  <div class="feature-icon">
                    <ha-icon .icon=${"mdi:account"}></ha-icon>
                  </div>
                  <div class="item-info">
                    <span class="item-name">${e.name}</span>
                    <span class="item-meta">${e.entityId}</span>
                  </div>
                  <button
                    class="toggle ${t||i?"on":""}"
                    @click=${()=>this._togglePresencePerson(e.entityId)}
                    role="switch"
                    aria-checked=${t||i?"true":"false"}
                    aria-label="${e.name}"
                  ></button>
                </div>
              `})}
          </div>
        `}

        <!-- Per-person sensor mapping -->
        <div class="section-label">${we("config.presence_smartphone")}</div>
        <div class="section-desc">${we("config.presence_smartphone_desc")}</div>

        ${t.map(t=>{const r=e.find(e=>e.entityId===t);if(!r)return W;const o=this._presenceSmartphoneSensors[t]||"",n=this._presenceNotifyServices[t]||"",c=this._presenceDrivingSensors[t]||"",d=i.find(e=>e.entityId===o)?.name,l=a.find(e=>e.entityId===c)?.name,p=`${t}:smartphone`,h=`${t}:notify`,_=`${t}:driving`;return U`
            <div class="presence-mapping-card">
              <div class="presence-mapping-header">
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:account"}></ha-icon>
                </div>
                <span class="item-name">${r.name}</span>
              </div>

              <div class="presence-mapping-field">
                <label class="presence-mapping-label">${we("config.presence_smartphone")}</label>
                <div class="dropdown ${this._presenceDropdownOpen===p?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===p?null:p}}
                    aria-expanded=${this._presenceDropdownOpen===p?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:cellphone"}></ha-icon>
                    <span>${d||o||we("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${we("config.search_entity")}
                      .value=${this._presenceDropdownOpen===p?this._presenceDropdownSearch:""}
                      @input=${e=>{this._presenceDropdownSearch=e.target.value}}
                      @click=${e=>e.stopPropagation()}
                    />
                    <button
                      class="dropdown-item ${o?"":"active"}"
                      role="option"
                      aria-selected=${o?"false":"true"}
                      @click=${()=>{const e={...this._presenceSmartphoneSensors};delete e[t],this._presenceSmartphoneSensors=e,this._presenceDropdownOpen=null}}
                    >
                      <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                      ${we("config.presence_auto_detect")}
                    </button>
                    ${i.filter(e=>!this._presenceDropdownSearch||e.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())||e.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>U`
                      <button
                        class="dropdown-item ${o===e.entityId?"active":""}"
                        role="option"
                        aria-selected=${o===e.entityId?"true":"false"}
                        @click=${()=>{this._presenceSmartphoneSensors={...this._presenceSmartphoneSensors,[t]:e.entityId},this._presenceDropdownOpen=null}}
                      >
                        <ha-icon .icon=${"mdi:cellphone"}></ha-icon>
                        ${e.name}
                      </button>
                    `)}
                  </div>
                </div>
              </div>

              <div class="presence-mapping-field">
                <label class="presence-mapping-label">${we("config.presence_notify")}</label>
                <div class="dropdown ${this._presenceDropdownOpen===h?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===h?null:h}}
                    aria-expanded=${this._presenceDropdownOpen===h?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:bell"}></ha-icon>
                    <span>${n||we("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${we("config.search_entity")}
                      .value=${this._presenceDropdownOpen===h?this._presenceDropdownSearch:""}
                      @input=${e=>{this._presenceDropdownSearch=e.target.value}}
                      @click=${e=>e.stopPropagation()}
                    />
                    <button
                      class="dropdown-item ${n?"":"active"}"
                      role="option"
                      aria-selected=${n?"false":"true"}
                      @click=${()=>{const e={...this._presenceNotifyServices};delete e[t],this._presenceNotifyServices=e,this._presenceDropdownOpen=null}}
                    >
                      <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                      ${we("config.presence_auto_detect")}
                    </button>
                    ${s.filter(e=>!this._presenceDropdownSearch||e.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>U`
                      <button
                        class="dropdown-item ${n===e?"active":""}"
                        role="option"
                        aria-selected=${n===e?"true":"false"}
                        @click=${()=>{this._presenceNotifyServices={...this._presenceNotifyServices,[t]:e},this._presenceDropdownOpen=null}}
                      >
                        <ha-icon .icon=${"mdi:bell"}></ha-icon>
                        ${e}
                      </button>
                    `)}
                  </div>
                </div>
              </div>

              <div class="presence-mapping-field">
                <label class="presence-mapping-label">${we("config.presence_driving")}</label>
                <div class="dropdown ${this._presenceDropdownOpen===_?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===_?null:_}}
                    aria-expanded=${this._presenceDropdownOpen===_?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:car"}></ha-icon>
                    <span>${l||c||we("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${we("config.search_entity")}
                      .value=${this._presenceDropdownOpen===_?this._presenceDropdownSearch:""}
                      @input=${e=>{this._presenceDropdownSearch=e.target.value}}
                      @click=${e=>e.stopPropagation()}
                    />
                    <button
                      class="dropdown-item ${c?"":"active"}"
                      role="option"
                      aria-selected=${c?"false":"true"}
                      @click=${()=>{const e={...this._presenceDrivingSensors};delete e[t],this._presenceDrivingSensors=e,this._presenceDropdownOpen=null}}
                    >
                      <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                      ${we("config.presence_auto_detect")}
                    </button>
                    ${a.filter(e=>!this._presenceDropdownSearch||e.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())||e.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>U`
                      <button
                        class="dropdown-item ${c===e.entityId?"active":""}"
                        role="option"
                        aria-selected=${c===e.entityId?"true":"false"}
                        @click=${()=>{this._presenceDrivingSensors={...this._presenceDrivingSensors,[t]:e.entityId},this._presenceDropdownOpen=null}}
                      >
                        <ha-icon .icon=${"mdi:car"}></ha-icon>
                        ${e.name}
                      </button>
                    `)}
                  </div>
                </div>
              </div>
            </div>
          `})}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadPresenceConfig()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}_toggleWeatherMetric(e){const t=new Set(this._weatherHiddenMetrics);t.has(e)?t.delete(e):t.add(e),this._weatherHiddenMetrics=[...t]}_selectWeatherEntity(e){this._weatherEntity=e,this._weatherDropdownOpen=!1}async _saveWeather(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_weather",{...this._weatherEntity?{entity_id:this._weatherEntity}:{},hidden_metrics:this._weatherHiddenMetrics,show_daily:this._weatherShowDaily,show_hourly:this._weatherShowHourly,show_header:this._weatherShowHeader}),!this._mounted)return;this._showToast(),he.emit("weather-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}_renderWeatherPreview(){if(!this._weatherEntity||!this.hass)return U`<div class="preview-empty">${we("config.weather_select_entity")}</div>`;const e=this.hass.states[this._weatherEntity];if(!e)return U`<div class="preview-empty">${we("config.weather_select_entity")}</div>`;const t=e.attributes,i=t.temperature??"--",a=t.temperature_unit??"°C",s=new Set(this._weatherHiddenMetrics),r=e.state||"sunny",o={sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",partlycloudy:"mdi:weather-partly-cloudy",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",snowy:"mdi:weather-snowy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning"}[r]||"mdi:weather-cloudy",n=we({sunny:"weather.cond_sunny","clear-night":"weather.cond_clear_night",partlycloudy:"weather.cond_partly_cloudy",cloudy:"weather.cond_cloudy",fog:"weather.cond_foggy",rainy:"weather.cond_rainy",pouring:"weather.cond_pouring",snowy:"weather.cond_snowy",windy:"weather.cond_windy",lightning:"weather.cond_lightning"}[r]||"weather.cond_cloudy"),c={sunny:"#fbbf24","clear-night":"#6366f1",partlycloudy:"#94a3b8",cloudy:"#64748b",fog:"#94a3b8",rainy:"#3b82f6",pouring:"#2563eb",snowy:"#e2e8f0",windy:"#6ee7b3",lightning:"#a78bfa"}[r]||"#64748b",d={sunny:"rgba(251,191,36,0.8)","clear-night":"rgba(129,140,248,0.7)",partlycloudy:"rgba(148,163,184,0.6)",cloudy:"rgba(100,116,139,0.6)",fog:"rgba(148,163,184,0.5)",rainy:"rgba(96,165,250,0.7)",pouring:"rgba(59,130,246,0.8)",snowy:"rgba(226,232,240,0.7)",windy:"rgba(110,231,179,0.6)",lightning:"rgba(167,139,250,0.8)"}[r]||"rgba(148,163,184,0.6)",l=new Date,p=l.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),h=String(l.getSeconds()).padStart(2,"0"),_=l.toLocaleDateString(this.hass.language||"fr",{weekday:"long",day:"numeric",month:"long"}),u=t.apparent_temperature??null,g="number"==typeof i?i:12,v=[0,.5,1.2,.8,-.3,-1,-.5,.2,.7,1.5],m=44,b=Math.min(...v),f=Math.max(...v)-b||1,y=v.map((e,t)=>({x:t/(v.length-1)*348,y:6+32*(1-(e-b)/f)}));let w=`M${y[0].x},${y[0].y}`;for(let R=0;R<y.length-1;R++){const e=y[Math.max(0,R-1)],t=y[R],i=y[R+1],a=y[Math.min(y.length-1,R+2)];w+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}const x=w+" L348,44 L0,44 Z",$=.3*(v.length-1),k=Math.floor($),S=Math.min(v.length-1,k+1),E=$-k,P=6+32*(1-(v[k]+(v[S]-v[k])*E-b)/f),C=l.getHours(),D=v.map((e,t)=>`${String((C+t)%24).padStart(2,"0")}h`),M=[];if(s.has("humidity")||null==t.humidity||M.push({key:"humidity",icon:"mdi:water-percent",val:`${t.humidity}`,unit:"%"}),!s.has("wind")&&null!=t.wind_speed){const e="number"==typeof t.wind_bearing?this._windBearingToDir(t.wind_bearing):void 0;M.push({key:"wind",icon:"mdi:weather-windy",val:`${Math.round(t.wind_speed)}`,unit:"km/h",dir:e})}if(s.has("pressure")||null==t.pressure||M.push({key:"pressure",icon:"mdi:gauge",val:`${Math.round(t.pressure)}`,unit:"hPa"}),s.has("uv")||null==t.uv_index||M.push({key:"uv",icon:"mdi:sun-wireless",val:`${Math.round(t.uv_index)}`,unit:"UV"}),s.has("visibility")||null==t.visibility||M.push({key:"visibility",icon:"mdi:eye-outline",val:`${t.visibility}`,unit:"km"}),!s.has("sunrise")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_rising;M.push({key:"sunrise",icon:"mdi:weather-sunset-up",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}if(!s.has("sunset")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_setting;M.push({key:"sunset",icon:"mdi:weather-sunset-down",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}const I=this.hass.language||"fr",T=Array.from({length:7},(e,t)=>{const i=new Date(2024,0,t+1);return new Intl.DateTimeFormat(I,{weekday:"short"}).format(i)}),z=[g+2,g+1,g,g-1,g+1,g+3,g],O=[g-4,g-3,g-5,g-6,g-4,g-2,g-5],A=[0,10,30,60,20,0,15],H=l.getDay();return U`
      <div class="preview-weather-wrap">
        ${this._weatherShowHeader?U`
          <div class="pw-card-header">
            <span class="pw-card-title">${we("weather.title")}</span>
            <span class="pw-card-location">${e.attributes.friendly_name??""}</span>
          </div>
        `:W}
      <div class="preview-weather">
        <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${c}22 0%, transparent 70%);"></div>
        <div class="pw-content">
          <div class="pw-header">
            <div class="pw-header-left">
              <span class="pw-time">${p}<span class="pw-sec">:${h}</span></span>
              <span class="pw-date">${_}</span>
            </div>
            <div class="pw-header-right">
              <span class="pw-temp">${i}<span class="pw-temp-unit">${a}</span></span>
              <span class="pw-cond"><ha-icon .icon=${o}></ha-icon>${n}</span>
              ${null!=u?U`<span class="pw-feels">${we("weather.feels_like",{temp:String(Math.round(u))})}</span>`:W}
            </div>
          </div>

          <div class="pw-spark-zone">
            <svg class="pw-spark-svg" viewBox="0 0 ${348} ${m}" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pw-spark-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="${d}" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="${d}" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="${x}" fill="url(#pw-spark-fill)"/>
              <path d="${w}" fill="none" stroke="${d}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="pw-spark-now" style="left: ${30}%;">
              <div class="pw-spark-now-dot" style="top: ${P/m*100}%;"></div>
            </div>
            <div class="pw-spark-labels">
              ${D.map((e,t)=>t%2==0||t===D.length-1?U`<span class="pw-spark-lbl" style="left: ${t/(D.length-1)*100}%;">${e}</span>`:W)}
            </div>
          </div>

          ${M.length>0?U`
            <div class="pw-metrics" style="grid-template-columns: repeat(${3}, 1fr);">
              ${M.map(e=>U`
                <div class="pw-metric ${e.key}">
                  <ha-icon .icon=${e.icon}></ha-icon>
                  <span class="pw-metric-val">${e.val}</span>
                  ${e.unit?U`<span class="pw-metric-unit">${e.unit}</span>`:W}
                  ${e.dir?U`<span class="pw-metric-dir">${e.dir}</span>`:W}
                </div>
              `)}
            </div>
          `:W}

          ${this._weatherShowDaily||this._weatherShowHourly?U`
            <div class="pw-forecast-zone">
              <div class="pw-tabs">
                ${this._weatherShowDaily?U`<span class="pw-tab active">${we("weather.daily_tab")}</span>`:W}
                ${this._weatherShowHourly?U`<span class="pw-tab">${we("weather.hourly_tab")}</span>`:W}
              </div>
              <div class="pw-fold-sep"></div>
              ${this._weatherShowDaily?U`
                <div class="pw-daily-list">
                  ${["mdi:weather-sunny","mdi:weather-partly-cloudy","mdi:weather-cloudy","mdi:weather-rainy","mdi:weather-partly-cloudy","mdi:weather-sunny","mdi:weather-cloudy"].slice(0,5).map((e,t)=>{const i=(H+t)%7,a=0===t?we("weather.today"):T[i],s=Math.round(z[t]),r=Math.round(O[t]),o=A[t];return U`
                      <div class="pw-day-row ${0===t?"today":""}">
                        <span class="pw-day-label">${a}</span>
                        <ha-icon class="pw-day-icon" .icon=${e}></ha-icon>
                        <span class="pw-day-temps"><span class="pw-day-high">${s}°</span><span class="pw-day-low">${r}°</span></span>
                        ${o>0?U`<span class="pw-day-precip">${o}%</span>`:U`<span class="pw-day-precip"></span>`}
                      </div>
                    `})}
                </div>
              `:W}
            </div>
          `:W}
        </div>
      </div>
      </div>
    `}_windBearingToDir(e){return["N","NE","E","SE","S","SO","O","NO"][Math.round(e/45)%8]}_renderWeatherTab(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")).sort():[],t=e.find(e=>e===this._weatherEntity),i=new Set(this._weatherHiddenMetrics);return U`
      <div class="tab-panel" id="panel-weather">
        <div class="section-label">${we("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._weatherShowHeader=!this._weatherShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.weather_show_header")}</div>
              <div class="feature-desc">${we("config.weather_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHeader?"on":""}"
              role="switch"
              aria-checked=${this._weatherShowHeader?"true":"false"}
            ></span>
          </button>
        </div>

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
            ${e.map(e=>U`
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
          ${[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise"},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset"}].map(e=>{const t=!i.has(e.key);return U`
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
    `}async _loadWeatherConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherEntity=e.weather.entity_id??"",this._weatherHiddenMetrics=e.weather.hidden_metrics??[],this._weatherShowDaily=e.weather.show_daily??!0,this._weatherShowHourly=e.weather.show_hourly??!0,this._weatherShowHeader=e.weather.show_header??!0)}catch{}}async _checkSpotifyStatus(){if(this._backend)try{const e=await this._backend.send("spotify_status");if(!this._mounted)return;this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}async _saveSpotify(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_spotify_config",{entity_id:this._spotifyEntity,sort_order:this._spotifySortOrder,max_items_per_section:this._spotifyMaxItems,visible_speakers:this._spotifyVisibleSpeakers}),!this._mounted)return;this._showToast(),he.emit("spotify-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadSpotifyConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.spotify_card&&(this._spotifyShowHeader=e.spotify_card.show_header??!0,this._spotifyEntity=e.spotify_card.entity_id??"",this._spotifySortOrder="oldest_first"===e.spotify_card.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=e.spotify_card.max_items_per_section??6,this._spotifyVisibleSpeakers=e.spotify_card.visible_speakers??[])}catch{}}_selectSpotifyEntity(e){this._spotifyEntity=e,this._spotifyDropdownOpen=!1}_renderSpotifyPreview(){if(!1===this._spotifyConfigured)return U`<div class="preview-empty">${we("config.spotify_not_configured")}</div>`;if(!this._spotifyEntity||!this.hass)return U`<div class="preview-empty">${we("config.spotify_select_entity")}</div>`;if(!this.hass.states[this._spotifyEntity])return U`<div class="preview-empty">${we("config.spotify_select_entity")}</div>`;const e=[{id:"all",label:we("spotify.tab_all"),active:!0},{id:"tracks",label:we("spotify.tab_tracks"),active:!1},{id:"playlists",label:we("spotify.tab_playlists"),active:!1},{id:"podcasts",label:we("spotify.tab_podcasts"),active:!1}],t=[{name:"Daily Mix 1",meta:we("spotify.type_playlist"),icon:"mdi:playlist-music"},{name:we("spotify.saved_tracks"),meta:"128 "+we("spotify.tracks_count",{count:""}).trim(),icon:"mdi:heart"},{name:"Discover Weekly",meta:we("spotify.type_playlist"),icon:"mdi:playlist-music"}];return U`
      <div class="preview-spotify-wrap">
        ${this._spotifyShowHeader?U`
          <div class="ps-card-header">
            <ha-icon .icon=${"mdi:spotify"}></ha-icon>
            <span class="ps-card-title">${we("spotify.title")}</span>
          </div>
        `:W}
        <div class="preview-spotify">
          <div class="ps-search">
            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
            <span class="ps-search-text">${we("spotify.search_placeholder")}</span>
          </div>
          <div class="ps-tabs">
            ${e.map(e=>U`
              <span class="ps-tab ${e.active?"active":""}">${e.label}</span>
            `)}
          </div>
          <div class="ps-section-label">${we("spotify.my_playlists")}</div>
          ${t.map(e=>U`
            <div class="ps-item-row">
              <div class="ps-item-art">
                <ha-icon .icon=${e.icon}></ha-icon>
              </div>
              <div class="ps-item-info">
                <div class="ps-item-name">${e.name}</div>
                <div class="ps-item-meta">${e.meta}</div>
              </div>
              <ha-icon class="ps-item-play" .icon=${"mdi:play-circle"}></ha-icon>
            </div>
          `)}
        </div>
      </div>
    `}_renderSpotifySetupGuide(){return U`
      <div class="tab-panel" id="panel-spotify">
        <div style="
          padding: 20px; border-radius: var(--radius-lg);
          background: var(--s2); border: 1px solid var(--b2);
          text-align: center;
        ">
          <ha-icon .icon=${"mdi:spotify"} style="
            color: #1DB954; --mdc-icon-size: 48px;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 16px;
          "></ha-icon>
          <div style="font-size: 16px; font-weight: 600; color: var(--t1); margin-bottom: 8px;">
            ${we("config.spotify_not_configured")}
          </div>
          <div style="font-size: 13px; color: var(--t3); margin-bottom: 20px; line-height: 1.5;">
            ${we("config.spotify_setup_guide")}
          </div>

          <div style="text-align: left; padding: 0 8px;">
            ${[1,2,3,4].map(e=>U`
              <div style="
                display: flex; align-items: flex-start; gap: 10px;
                margin-bottom: 12px; font-size: 13px; color: var(--t2);
              ">
                <span style="
                  flex-shrink: 0; width: 22px; height: 22px;
                  border-radius: 50%; background: var(--s3);
                  display: flex; align-items: center; justify-content: center;
                  font-size: 12px; font-weight: 600; color: var(--t1);
                ">${e}</span>
                <span style="line-height: 22px;">
                  ${we(`config.spotify_setup_step${e}`)}
                </span>
              </div>
            `)}
          </div>

          <div style="
            font-size: 12px; color: var(--t3); margin-top: 16px;
            padding: 10px; border-radius: var(--radius-md);
            background: var(--s1); border: 1px solid var(--b1);
          ">
            ${we("config.spotify_setup_note")}
          </div>

          <button
            class="btn btn-accent"
            style="margin-top: 20px;"
            @click=${()=>{window.open("/config/integrations/dashboard","_blank")}}
          >
            <ha-icon .icon=${"mdi:cog"} style="--mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center;"></ha-icon>
            ${we("config.spotify_open_settings")}
          </button>
        </div>
      </div>
    `}_renderSpotifyTab(){if(null===this._spotifyConfigured)return U`<div class="tab-panel" id="panel-spotify">
        <div class="preview-empty">${we("config.spotify_checking")}</div>
      </div>`;if(!1===this._spotifyConfigured)return this._renderSpotifySetupGuide();const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort():[],t=e.find(e=>e===this._spotifyEntity);return U`
      <div class="tab-panel" id="panel-spotify">
        <div class="section-label">${we("config.spotify_entity")}</div>
        <div class="section-desc">${we("config.spotify_entity_desc")}</div>
        <div class="dropdown ${this._spotifyDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._spotifyDropdownOpen=!this._spotifyDropdownOpen}
            aria-expanded=${this._spotifyDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:spotify"} style="color: #1DB954;"></ha-icon>
            <span>${t||we("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>U`
                <button
                  class="dropdown-item ${e===this._spotifyEntity?"active":""}"
                  role="option"
                  aria-selected=${e===this._spotifyEntity?"true":"false"}
                  @click=${()=>this._selectSpotifyEntity(e)}
                >
                  <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>

        <div class="section-label">${we("config.spotify_sort_order")}</div>
        <div class="section-desc">${we("config.spotify_sort_order_desc")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._spotifySortOrder="recent_first"}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:sort-clock-descending"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.spotify_sort_recent")}</div>
            </div>
            <span
              class="toggle ${"recent_first"===this._spotifySortOrder?"on":""}"
              role="switch"
              aria-checked=${"recent_first"===this._spotifySortOrder?"true":"false"}
            ></span>
          </button>
          <button
            class="feature-row"
            @click=${()=>{this._spotifySortOrder="oldest_first"}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:sort-clock-ascending"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${we("config.spotify_sort_oldest")}</div>
            </div>
            <span
              class="toggle ${"oldest_first"===this._spotifySortOrder?"on":""}"
              role="switch"
              aria-checked=${"oldest_first"===this._spotifySortOrder?"true":"false"}
            ></span>
          </button>
        </div>

        <div class="section-label">${we("config.spotify_max_items")}</div>
        <div class="section-desc">${we("config.spotify_max_items_desc")}</div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 4px 0;">
          <input
            type="range"
            min="1"
            max="20"
            .value=${String(this._spotifyMaxItems)}
            @input=${e=>{this._spotifyMaxItems=parseInt(e.target.value,10)}}
            style="flex: 1; accent-color: #1DB954;"
          />
          <span style="
            font-size: 13px; font-weight: 600; color: var(--t1);
            min-width: 28px; text-align: center;
          ">${this._spotifyMaxItems}</span>
        </div>

        <div class="section-label">${we("config.spotify_speakers")}</div>
        <div class="section-desc">${we("config.spotify_speakers_desc")}</div>
        ${(()=>{const e=this.hass?Object.entries(this.hass.states).filter(([e])=>e.startsWith("media_player.")).map(([e,t])=>({entityId:e,name:t.attributes.friendly_name??e,visible:this._spotifyVisibleSpeakers.includes(e)})):[],t=[...this._spotifyVisibleSpeakers.map(t=>e.find(e=>e.entityId===t)).filter(e=>!!e),...e.filter(e=>!e.visible).sort((e,t)=>e.name.localeCompare(t.name))];return U`
            <div class="item-list">
              ${t.map(e=>{const t=e.visible,i=t?this._spotifyVisibleSpeakers.indexOf(e.entityId):-1,a=this._dragIdx===i&&-1!==i&&"speakers"===this._dragContext,s=this._dropIdx===i&&-1!==i&&"speakers"===this._dragContext,r=["item-row",t?"":"disabled",a?"dragging":"",s?"drop-target":""].filter(Boolean).join(" ");return U`
                  <div
                    class=${r}
                    draggable=${t?"true":"false"}
                    @dragstart=${()=>{t&&-1!==i&&this._onDragStart(i,"speakers")}}
                    @dragover=${e=>{t&&-1!==i&&this._onDragOver(i,e)}}
                    @dragleave=${()=>this._onDragLeave()}
                    @drop=${e=>{t&&-1!==i&&this._onDropSpeaker(i,e)}}
                    @dragend=${()=>this._onDragEnd()}
                  >
                    ${t?U`
                      <span class="drag-handle">
                        <ha-icon .icon=${"mdi:drag"}></ha-icon>
                      </span>
                    `:U`<span style="width:24px;"></span>`}
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <button
                      class="toggle ${t?"on":""}"
                      @click=${()=>this._toggleSpotifySpeaker(e.entityId)}
                      role="switch"
                      aria-checked=${t?"true":"false"}
                      aria-label="${we(t?"common.hide":"common.show")} ${e.name}"
                    ></button>
                  </div>
                `})}
            </div>
          `})()}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadSpotifyConfig()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}_toggleSpotifySpeaker(e){this._spotifyVisibleSpeakers.includes(e)?this._spotifyVisibleSpeakers=this._spotifyVisibleSpeakers.filter(t=>t!==e):this._spotifyVisibleSpeakers=[...this._spotifyVisibleSpeakers,e]}_onDropSpeaker(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"speakers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._spotifyVisibleSpeakers];if(this._dragIdx>=i.length||e>=i.length)return this._dragIdx=null,void(this._dropIdx=null);const[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._spotifyVisibleSpeakers=i,this._dragIdx=null,this._dropIdx=null}async _saveTitle(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_title_config",{title:this._titleText,mode_entity:this._titleModeEntity||null,modes:this._titleModes}),!this._mounted)return;this._showToast(),he.emit("title-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadTitleConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.title_card&&(this._titleText=e.title_card.title??"",this._titleModeEntity=e.title_card.mode_entity??"",this._titleModes=e.title_card.modes??[])}catch{}}_selectTitleModeEntity(e){if(this._titleModeEntity=e,this._titleModeDropdownOpen=!1,e.startsWith("input_select.")&&this.hass){const t=this.hass.states[e];if(t){const e=t.attributes.options??[],i=new Map(this._titleModes.map(e=>[e.id,e]));this._titleModes=e.map(e=>i.get(e)??{id:e,label:e,icon:"",color:"neutral"})}}else if(e.startsWith("input_boolean.")&&this.hass){const t=e.split(".")[1]??e,i=this.hass.states[e],a=i?.attributes.friendly_name||t,s=new Map(this._titleModes.map(e=>[e.id,e]));this._titleModes=[s.get(t)??{id:t,label:a,icon:"mdi:toggle-switch",color:"success"}]}else if(e.startsWith("scene.")&&this.hass){const t=e.split(".")[1]??e,i=this.hass.states[e],a=i?.attributes.friendly_name||t,s=new Map(this._titleModes.map(e=>[e.id,e]));this._titleModes=[s.get(t)??{id:t,label:a,icon:"mdi:palette",color:"accent"}]}else e||(this._titleModes=[])}_updateTitleMode(e,t,i){const a=[...this._titleModes];a[e]&&(a[e]={...a[e],[t]:i},this._titleModes=a)}async _openIconPopup(e){if(!this._iconLoading){if(0===this._iconList.length){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}e<this._titleModes.length&&(this._iconSearch="",this._iconPopupModeIdx=e)}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim(),t=this._iconList;return e?t.filter(t=>t.toLowerCase().includes(e)).slice(0,120):t.slice(0,120)}_renderIconPopup(){if(null===this._iconPopupModeIdx)return W;const e=this._getFilteredIcons(),t=this._titleModes[this._iconPopupModeIdx]?.icon??"";return U`
      <div class="icon-popup-overlay" @click=${e=>{e.target===e.currentTarget&&(this._iconPopupModeIdx=null)}}>
        <div class="icon-popup">
          <div class="icon-popup-header">
            <span class="icon-popup-title">${we("config.title_mode_icon")}</span>
            <input
              class="icon-popup-search"
              type="text"
              placeholder=${"mdi:..."}
              .value=${this._iconSearch}
              @input=${e=>{this._iconSearch=e.target.value}}
            />
          </div>
          <div class="icon-popup-grid-wrap">
            ${e.length>0||!this._iconSearch?U`
              <div class="icon-popup-grid">
                <button
                  class="icon-pick ${""===t?"selected":""}"
                  @click=${()=>{this._updateTitleMode(this._iconPopupModeIdx,"icon",""),this._iconPopupModeIdx=null}}
                  aria-label=${we("config.title_no_icon")}
                >
                  <ha-icon .icon=${"mdi:cancel"} style="opacity:0.4;"></ha-icon>
                </button>
                ${e.map(e=>U`
                  <button
                    class="icon-pick ${e===t?"selected":""}"
                    @click=${()=>{this._updateTitleMode(this._iconPopupModeIdx,"icon",e),this._iconPopupModeIdx=null}}
                    aria-label=${e}
                  >
                    <ha-icon .icon=${e}></ha-icon>
                  </button>
                `)}
              </div>
            `:U`<div class="icon-popup-empty">${we("config.title_no_icons_found")}</div>`}
          </div>
        </div>
      </div>
    `}_renderTitlePreview(){const e=this._titleText;if(!e)return U`<div class="preview-empty">${we("config.title_title_placeholder")}</div>`;let t="",i="",a="neutral";if(this._titleModeEntity&&this.hass){const e=this.hass.states[this._titleModeEntity];if(e&&this._titleModeEntity.startsWith("input_select.")){const s=e.state,r=this._titleModes.find(e=>e.id===s);t=r?.label||s,i=r?.icon||"",a=r?.color||"neutral"}else if(e&&this._titleModeEntity.startsWith("input_boolean.")){const s=this._titleModeEntity.split(".")[1]??this._titleModeEntity,r=this._titleModes.find(e=>e.id===s);t=r?.label||e.attributes.friendly_name||s,i=r?.icon||"",a="on"===e.state?r?.color||"success":"neutral"}else if(e&&this._titleModeEntity.startsWith("scene.")){const s=this._titleModeEntity.split(".")[1]??this._titleModeEntity,r=this._titleModes.find(e=>e.id===s);t=r?.label||e.attributes.friendly_name||s,i=r?.icon||"",a=r?.color||"accent"}}const s={success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t3)"};return U`
      <div class="preview-title-card">
        <div class="preview-title-text">${e}</div>
        ${t?U`
          <div class="preview-title-mode">
            <div class="preview-title-dot" style="background:${{success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t4)"}[a]??(a.startsWith("#")?a:"var(--t4)")};"></div>
            ${i?U`<ha-icon .icon=${i} style="--mdc-icon-size:12px;color:${s[a]??(a.startsWith("#")?a:"var(--t3)")};"></ha-icon>`:W}
            <span style="color:var(--t4);font-size:9px;">${this._titleModeEntity?.startsWith("scene.")?we("title_card.scene_label"):we("title_card.mode_label")}</span>
            <span style="color:${s[a]??(a.startsWith("#")?a:"var(--t3)")};font-size:9px;font-weight:600;">${t}</span>
            <ha-icon .icon=${"mdi:chevron-right"} style="--mdc-icon-size:11px;color:var(--t4);"></ha-icon>
          </div>
        `:W}
      </div>
    `}_openColorPicker(e){if(e>=this._titleModes.length)return;const t=this._titleModes[e].color;t.startsWith("#")&&7===t.length?(this._colorPickerHex=t,this._colorPickerPos=this._hexToWheelPos(t)):(this._colorPickerHex="#ffffff",this._colorPickerPos={x:50,y:50}),this._colorPickerModeIdx=e,this.updateComplete.then(()=>{const e=this.shadowRoot?.querySelector(".cp-wheel-wrap canvas");e&&(this._cpCanvas=e,this._drawColorWheel(e))})}_closeColorPicker(){this._cancelColorDrag?.(),this._cancelColorDrag=void 0,this._colorPickerModeIdx=null,this._cpCanvas=null}_applyColorPicker(){null!==this._colorPickerModeIdx&&this._colorPickerModeIdx<this._titleModes.length&&this._updateTitleMode(this._colorPickerModeIdx,"color",this._colorPickerHex),this._closeColorPicker()}_onCpWheel(e){const t=this._cpCanvas;if(!t)return;const i=t.getBoundingClientRect(),a="touches"in e?e.touches[0].clientX:e.clientX,s="touches"in e?e.touches[0].clientY:e.clientY,r=a-i.left-i.width/2,o=s-i.top-i.height/2,n=i.width/2,c=Math.sqrt(r*r+o*o),d=Math.min(c,n),l=(180*Math.atan2(o,r)/Math.PI%360+360)%360,p=d/n,h=this._hsToRgb(l,p);this._colorPickerHex="#"+h.map(e=>e.toString(16).padStart(2,"0")).join("");const _=c>0?d/c:1;this._colorPickerPos={x:r*_/n*50+50,y:o*_/n*50+50}}_drawColorWheel(e){const t=440;e.width=t,e.height=t;const i=e.getContext("2d");if(!i)return;const a=220,s=220;for(let r=0;r<360;r++){const e=(r-1)*Math.PI/180,t=(r+1)*Math.PI/180,o=i.createRadialGradient(a,s,0,a,s,220),[n,c,d]=this._hsToRgb(r,1);o.addColorStop(0,"#ffffff"),o.addColorStop(1,`rgb(${n},${c},${d})`),i.beginPath(),i.moveTo(a,s),i.arc(a,s,220,e,t),i.closePath(),i.fillStyle=o,i.fill()}}_hsToRgb(e,t){const i=t,a=i*(1-Math.abs(e/60%2-1));let s=0,r=0,o=0;e<60?(s=i,r=a):e<120?(s=a,r=i):e<180?(r=i,o=a):e<240?(r=a,o=i):e<300?(s=a,o=i):(s=i,o=a);const n=1-i;return[Math.round(255*(s+n)),Math.round(255*(r+n)),Math.round(255*(o+n))]}_hexToWheelPos(e){const t=parseInt(e.slice(1,3),16)/255,i=parseInt(e.slice(3,5),16)/255,a=parseInt(e.slice(5,7),16)/255,s=Math.max(t,i,a),r=s-Math.min(t,i,a);let o=0;0!==r&&(o=s===t?((i-a)/r+6)%6*60:s===i?60*((a-t)/r+2):60*((t-i)/r+4));const n=0===s?0:r/s,c=Math.min(n,1),d=o*Math.PI/180;return{x:Math.cos(d)*c*50+50,y:Math.sin(d)*c*50+50}}_renderColorPicker(){if(null===this._colorPickerModeIdx)return W;const e=this._colorPickerHex;return U`
      <div class="cp-overlay" @click=${e=>{e.target===e.currentTarget&&this._closeColorPicker()}}>
        <div class="cp-dialog">
          <span class="cp-title">${we("config.title_color_picker_title")}</span>
          <div class="cp-wheel-wrap">
            <canvas
              @mousedown=${e=>{this._cancelColorDrag?.(),this._onCpWheel(e);const t=e=>this._onCpWheel(e),i=()=>{window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",i),this._cancelColorDrag=void 0};window.addEventListener("mousemove",t),window.addEventListener("mouseup",i),this._cancelColorDrag=i}}
              @touchstart=${e=>{this._cancelColorDrag?.(),e.preventDefault(),this._onCpWheel(e);const t=e=>{e.preventDefault(),this._onCpWheel(e)},i=()=>{window.removeEventListener("touchmove",t),window.removeEventListener("touchend",i),this._cancelColorDrag=void 0};window.addEventListener("touchmove",t,{passive:!1}),window.addEventListener("touchend",i),this._cancelColorDrag=i}}
            ></canvas>
            <div class="cp-cursor" style="left:${this._colorPickerPos.x}%;top:${this._colorPickerPos.y}%;background:${e}"></div>
          </div>
          <div class="cp-preview" style="background:${e}"></div>
          <span class="cp-hex">${e}</span>
          <button class="cp-confirm" @click=${()=>this._applyColorPicker()}>
            ${we("common.select")}
          </button>
        </div>
      </div>
    `}_renderTitleTab(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")||e.startsWith("input_boolean.")||e.startsWith("scene.")).sort():[],t=e.find(e=>e===this._titleModeEntity),i=["neutral","success","warning","info","accent","alert"];return U`
      <div class="tab-panel" id="panel-title">
        <div class="section-label">${we("config.title_title")}</div>
        <div class="section-desc">${we("config.title_title_desc")}</div>
        <input
          class="input"
          type="text"
          .value=${this._titleText}
          placeholder=${we("config.title_title_placeholder")}
          @input=${e=>{this._titleText=e.target.value}}
        />

        <div class="title-section-gap"></div>

        <div class="section-label">${we("config.title_mode_entity")}</div>
        <div class="section-desc">${we("config.title_mode_entity_desc")}</div>
        <div class="dropdown ${this._titleModeDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._titleModeDropdownOpen||(this._titleModeEntitySearch=""),this._titleModeDropdownOpen=!this._titleModeDropdownOpen}}
            aria-expanded=${this._titleModeDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${this._titleModeEntity?"mdi:form-select":"mdi:help-circle-outline"}></ha-icon>
            <span>${t||we("config.title_select_entity")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <input
              class="dropdown-search"
              type="text"
              placeholder=${we("config.search_entity")}
              .value=${this._titleModeEntitySearch}
              @input=${e=>{this._titleModeEntitySearch=e.target.value,this.requestUpdate()}}
              @click=${e=>e.stopPropagation()}
            />
            <button
              class="dropdown-item ${this._titleModeEntity?"":"active"}"
              role="option"
              aria-selected=${this._titleModeEntity?"false":"true"}
              @click=${()=>this._selectTitleModeEntity("")}
            >
              <ha-icon .icon=${"mdi:close"}></ha-icon>
              ${we("title_card.mode_none")}
            </button>
            ${e.filter(e=>!this._titleModeEntitySearch||e.toLowerCase().includes(this._titleModeEntitySearch.toLowerCase())).map(e=>U`
                <button
                  class="dropdown-item ${e===this._titleModeEntity?"active":""}"
                  role="option"
                  aria-selected=${e===this._titleModeEntity?"true":"false"}
                  @click=${()=>this._selectTitleModeEntity(e)}
                >
                  <ha-icon .icon=${e.startsWith("scene.")?"mdi:palette":e.startsWith("input_boolean.")?"mdi:toggle-switch":"mdi:form-select"}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>

        ${this._titleModes.length>0?U`
          <div class="title-section-gap"></div>

          <div class="section-label">${we("config.title_modes")}</div>
          <div class="section-desc">${we("config.title_modes_desc")}</div>
          <div class="title-modes-list">
            ${this._titleModes.map((e,t)=>U`
              <div class="title-mode-row">
                <span class="title-mode-id">${e.id}</span>
                <div class="title-mode-fields-row">
                  <input
                    class="input"
                    type="text"
                    placeholder=${we("config.title_mode_label")}
                    .value=${e.label}
                    @input=${e=>this._updateTitleMode(t,"label",e.target.value)}
                  />
                  <button
                    class="title-icon-btn ${e.icon?"has-icon":""}"
                    @click=${()=>this._openIconPopup(t)}
                    aria-label="${we("config.title_mode_icon")}"
                  >
                    <ha-icon .icon=${e.icon||"mdi:emoticon-outline"}></ha-icon>
                  </button>
                </div>
                <div class="title-color-row">
                  <span class="title-color-label">${we("config.title_mode_color")}</span>
                  <div class="title-color-chips">
                    ${i.map(i=>U`
                      <button
                        class="title-color-chip ${i} ${e.color===i?"active":""}"
                        @click=${()=>this._updateTitleMode(t,"color",i)}
                        aria-label="${we("config.title_mode_color")}: ${i}"
                      ></button>
                    `)}
                    ${e.color.startsWith("#")?U`
                      <button
                        class="title-color-chip custom active"
                        style="background:${e.color}"
                        @click=${()=>this._openColorPicker(t)}
                        aria-label="${we("config.title_color_picker_aria")}"
                      ></button>
                    `:W}
                    <button
                      class="title-color-picker-btn"
                      @click=${()=>this._openColorPicker(t)}
                      aria-label="${we("config.title_color_picker_aria")}"
                    ></button>
                  </div>
                </div>
              </div>
            `)}
          </div>
        `:W}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadTitleConfig()}>${we("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?we("common.saving"):we("common.save")}
          </button>
        </div>
      </div>
    `}render(){return this._lang,this.hass?U`
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
              class="tab ${"title"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"title"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("title")}
            >
              <ha-icon .icon=${"mdi:format-title"}></ha-icon>
              ${we("config.tab_title")}
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
            <button
              class="tab ${"media"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"media"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("media")}
            >
              <ha-icon .icon=${"mdi:speaker"}></ha-icon>
              ${we("config.tab_media")}
            </button>
            <button
              class="tab ${"cover"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"cover"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("cover")}
            >
              <ha-icon .icon=${"mdi:blinds"}></ha-icon>
              ${we("config.tab_cover")}
            </button>
            <button
              class="tab ${"spotify"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"spotify"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("spotify")}
            >
              <ha-icon .icon=${"mdi:spotify"}></ha-icon>
              ${we("config.tab_spotify")}
            </button>
            <button
              class="tab ${"presence"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"presence"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("presence")}
            >
              <ha-icon .icon=${"mdi:account-group"}></ha-icon>
              ${we("config.tab_presence")}
            </button>
          </div>

          <div class="preview-encart">
            <div class="preview-label">${we("config.preview")}</div>
            ${"navbar"===this._tab?this._renderNavbarPreview():"popup"===this._tab?this._renderPopupPreview():"light"===this._tab?this._renderLightPreview():"weather"===this._tab?this._renderWeatherPreview():"title"===this._tab?this._renderTitlePreview():"media"===this._tab?this._renderMediaPreview():"cover"===this._tab?this._renderCoverPreview():"spotify"===this._tab?this._renderSpotifyPreview():"presence"===this._tab?this._renderPresencePreview():this._renderDashboardPreview()}
          </div>

          ${"navbar"===this._tab?this._renderNavbarTab():"popup"===this._tab?this._renderPopupTab():"light"===this._tab?this._renderLightTab():"weather"===this._tab?this._renderWeatherTab():"title"===this._tab?this._renderTitleTab():"media"===this._tab?this._renderMediaTab():"cover"===this._tab?this._renderCoverTab():"spotify"===this._tab?this._renderSpotifyTab():"presence"===this._tab?this._renderPresenceTab():this._renderDashboardTab()}
        </div>
      </div>

      ${this._pickerOpen?this._renderDateTimePicker():W}
      ${this._renderIconPopup()}
      ${this._renderColorPicker()}

      <div class="toast ${this._toast?"show":""} ${this._toastError?"error":""}">
        ${this._toastError?we("common.error_save"):we("common.config_saved")}
      </div>
    `:W}}Ce([le({attribute:!1})],Oe.prototype,"hass"),Ce([le({type:Boolean})],Oe.prototype,"narrow"),Ce([pe()],Oe.prototype,"_lang"),Ce([pe()],Oe.prototype,"_tab"),Ce([pe()],Oe.prototype,"_rooms"),Ce([pe()],Oe.prototype,"_emptyRooms"),Ce([pe()],Oe.prototype,"_selectedRoom"),Ce([pe()],Oe.prototype,"_cards"),Ce([pe()],Oe.prototype,"_scenes"),Ce([pe()],Oe.prototype,"_lights"),Ce([pe()],Oe.prototype,"_lightRoom"),Ce([pe()],Oe.prototype,"_lightDropdownOpen"),Ce([pe()],Oe.prototype,"_iconPickerRoom"),Ce([pe()],Oe.prototype,"_dropdownOpen"),Ce([pe()],Oe.prototype,"_toast"),Ce([pe()],Oe.prototype,"_saving"),Ce([pe()],Oe.prototype,"_showLights"),Ce([pe()],Oe.prototype,"_showTemperature"),Ce([pe()],Oe.prototype,"_showHumidity"),Ce([pe()],Oe.prototype,"_showMedia"),Ce([pe()],Oe.prototype,"_autoSort"),Ce([pe()],Oe.prototype,"_tempHigh"),Ce([pe()],Oe.prototype,"_tempLow"),Ce([pe()],Oe.prototype,"_humidityThreshold"),Ce([pe()],Oe.prototype,"_weatherEntity"),Ce([pe()],Oe.prototype,"_weatherHiddenMetrics"),Ce([pe()],Oe.prototype,"_weatherShowDaily"),Ce([pe()],Oe.prototype,"_weatherShowHourly"),Ce([pe()],Oe.prototype,"_weatherShowHeader"),Ce([pe()],Oe.prototype,"_weatherDropdownOpen"),Ce([pe()],Oe.prototype,"_titleText"),Ce([pe()],Oe.prototype,"_titleModeEntity"),Ce([pe()],Oe.prototype,"_titleModes"),Ce([pe()],Oe.prototype,"_titleModeDropdownOpen"),Ce([pe()],Oe.prototype,"_iconPopupModeIdx"),Ce([pe()],Oe.prototype,"_iconSearch"),Ce([pe()],Oe.prototype,"_colorPickerModeIdx"),Ce([pe()],Oe.prototype,"_colorPickerHex"),Ce([pe()],Oe.prototype,"_colorPickerPos"),Ce([pe()],Oe.prototype,"_lightShowHeader"),Ce([pe()],Oe.prototype,"_coverShowHeader"),Ce([pe()],Oe.prototype,"_coverDashboardEntities"),Ce([pe()],Oe.prototype,"_coverDashboardOrder"),Ce([pe()],Oe.prototype,"_coverPresets"),Ce([pe()],Oe.prototype,"_coverEntityPresets"),Ce([pe()],Oe.prototype,"_coverRoom"),Ce([pe()],Oe.prototype,"_coverRoomDropdownOpen"),Ce([pe()],Oe.prototype,"_coverRoomEntities"),Ce([pe()],Oe.prototype,"_coverPresetInput"),Ce([pe()],Oe.prototype,"_coverEntityPresetInput"),Ce([pe()],Oe.prototype,"_presenceShowHeader"),Ce([pe()],Oe.prototype,"_presencePersonEntities"),Ce([pe()],Oe.prototype,"_presenceSmartphoneSensors"),Ce([pe()],Oe.prototype,"_presenceNotifyServices"),Ce([pe()],Oe.prototype,"_presenceDrivingSensors"),Ce([pe()],Oe.prototype,"_presenceDropdownOpen"),Ce([pe()],Oe.prototype,"_presenceDropdownSearch"),Ce([pe()],Oe.prototype,"_mediaShowHeader"),Ce([pe()],Oe.prototype,"_mediaExtraEntities"),Ce([pe()],Oe.prototype,"_spotifyShowHeader"),Ce([pe()],Oe.prototype,"_spotifyEntity"),Ce([pe()],Oe.prototype,"_spotifySortOrder"),Ce([pe()],Oe.prototype,"_spotifyDropdownOpen"),Ce([pe()],Oe.prototype,"_spotifyMaxItems"),Ce([pe()],Oe.prototype,"_spotifyVisibleSpeakers"),Ce([pe()],Oe.prototype,"_spotifyConfigured"),Ce([pe()],Oe.prototype,"_dashboardEnabledCards"),Ce([pe()],Oe.prototype,"_dashboardCardOrder"),Ce([pe()],Oe.prototype,"_dashboardHideHeader"),Ce([pe()],Oe.prototype,"_dashboardHideSidebar"),Ce([pe()],Oe.prototype,"_dashboardExpanded"),Ce([pe()],Oe.prototype,"_scheduleExpandedEntity"),Ce([pe()],Oe.prototype,"_pickerOpen"),Ce([pe()],Oe.prototype,"_pickerYear"),Ce([pe()],Oe.prototype,"_pickerMonth"),Ce([pe()],Oe.prototype,"_pickerStartDay"),Ce([pe()],Oe.prototype,"_pickerStartMonth"),Ce([pe()],Oe.prototype,"_pickerStartYear"),Ce([pe()],Oe.prototype,"_pickerEndDay"),Ce([pe()],Oe.prototype,"_pickerEndMonth"),Ce([pe()],Oe.prototype,"_pickerEndYear"),Ce([pe()],Oe.prototype,"_pickerStartHour"),Ce([pe()],Oe.prototype,"_pickerStartMinute"),Ce([pe()],Oe.prototype,"_pickerEndHour"),Ce([pe()],Oe.prototype,"_pickerEndMinute"),Ce([pe()],Oe.prototype,"_pickerPhase"),Ce([pe()],Oe.prototype,"_dragIdx"),Ce([pe()],Oe.prototype,"_dropIdx"),Ce([pe()],Oe.prototype,"_toastError");try{customElements.define("glass-config-panel",Oe)}catch{}}();
