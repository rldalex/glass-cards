!function(){"use strict";const t=new class{constructor(){this.listeners=new Map}on(t,e){let s=this.listeners.get(t);return s||(s=new Set,this.listeners.set(t,s)),s.add(e),()=>this.off(t,e)}off(t,e){this.listeners.get(t)?.delete(e)}emit(t,e){this.listeners.get(t)?.forEach(t=>t(e))}};let e=!1;const s=globalThis,i=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new a(s,t,n)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,f=globalThis,b=f.trustedTypes,v=b?b.emptyScript:"",m=f.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(i){s=null}}return s}},$=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const t=this._$Eu(e,s);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),n=s.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??$)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,m?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,k=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+P,U=`<${O}>`,T=document,z=()=>T.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,j=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,B=/"/g,K=/^(?:script|style|textarea|title)$/i,q=(X=1,(t,...e)=>({_$litType$:X,strings:t,values:e})),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),J=new WeakMap,G=T.createTreeWalker(T,129);var X;function F(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const a=t.length-1,o=this.parts,[l,c]=((t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",a=R;for(let o=0;o<s;o++){const e=t[o];let s,l,c=-1,d=0;for(;d<e.length&&(a.lastIndex=d,l=a.exec(e),null!==l);)d=a.lastIndex,a===R?"!--"===l[1]?a=H:void 0!==l[1]?a=j:void 0!==l[2]?(K.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=L):void 0!==l[3]&&(a=L):a===L?">"===l[0]?(a=n??R,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?L:'"'===l[3]?B:D):a===B||a===D?a=L:a===H||a===j?a=R:(a=L,n=void 0);const h=a===L&&t[o+1].startsWith("/>")?" ":"";r+=a===R?e+U:c>=0?(i.push(s),e.slice(0,c)+C+e.slice(c)+P+h):e+P+(-2===c?o:h)}return[F(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]})(t,e);if(this.el=Z.createElement(l,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&o.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=c[r++],s=i.getAttribute(t).split(P),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:n,name:a[2],strings:s,ctor:"."===a[1]?st:"?"===a[1]?it:"@"===a[1]?nt:et}),i.removeAttribute(t)}else t.startsWith(P)&&(o.push({type:6,index:n}),i.removeAttribute(t));if(K.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],z()),G.nextNode(),o.push({type:2,index:++n});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===O)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)o.push({type:7,index:n}),t+=P.length-1}n++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===W)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=I(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);G.currentNode=i;let n=G.nextNode(),r=0,a=0,o=s[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new tt(n,n.nextSibling,this,t):1===o.type?e=new o.ctor(n,o.name,o.strings,this,t):6===o.type&&(e=new rt(n,this,t)),this._$AV.push(e),o=s[++a]}r!==o?.index&&(n=G.nextNode(),r++)}return G.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),I(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new tt(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=Q(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let a,o;for(t=n[0],a=0;a<n.length-1;a++)o=Q(this,i[s+a],e,a),o===W&&(o=this._$AH[a]),r||=!I(o)||o!==this._$AH[a],o===V?t=V:t!==V&&(t+=(o??"")+n[a+1]),this._$AH[a]=o}r&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends et{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===W)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=A.litHtmlPolyfillSupport;at?.(Z,tt),(A.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new tt(e.insertBefore(z(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}lt._$litElement$=!0,lt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:lt});const ct=ot.litElementPolyfillSupport;ct?.({LitElement:lt}),(ot.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},ht=(t=dt,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}var gt=Object.defineProperty;class ft extends lt{constructor(){super(...arguments),this._busCleanups=[]}setConfig(t){this._config=t}shouldUpdate(t){if(!t.has("hass"))return!0;const e=t.get("hass");if(!e)return!0;const s=this.getTrackedEntityIds();return 0===s.length||s.some(t=>e.states[t]!==this.hass?.states[t])}getTrackedEntityIds(){const t=this._config?.entity;return t?[t]:[]}_listen(e,s){this._busCleanups.push(t.on(e,s))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(t=>t()),this._busCleanups=[]}}function bt(t,e,s){return Object.values(e).filter(e=>!e.disabled_by&&!e.hidden_by&&function(t,e){if(t.area_id)return t.area_id;if(t.device_id&&e){const s=e[t.device_id];if(s?.area_id)return s.area_id}return null}(e,s)===t)}((t,e,s)=>{for(var i,n=void 0,r=t.length-1;r>=0;r--)(i=t[r])&&(n=i(e,s,n)||n);n&&gt(e,s,n)})([pt({attribute:!1})],ft.prototype,"hass");const vt=o`
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
  }
`,mt=o`
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
`,_t=o`
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
`;var yt=Object.defineProperty,$t=(t,e,s,i)=>{for(var n,r=void 0,a=t.length-1;a>=0;a--)(n=t[a])&&(r=n(e,s,r)||r);return r&&yt(e,s,r),r};class xt extends ft{constructor(){super(...arguments),this._expandedEntity=null}static{this.styles=[vt,mt,_t,o`
      :host {
        display: block;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 0 4px;
      }
      .card-label {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .count-badge {
        background: var(--s3);
        border-radius: var(--radius-full);
        padding: 1px 7px;
        font-size: 10px;
        font-weight: 700;
        color: var(--t2);
      }
      .toggle-all-btn {
        background: transparent;
        border: none;
        padding: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        width: 44px;
        height: 24px;
        border-radius: 12px;
        position: relative;
        transition: background var(--t-fast);
      }
      .toggle-all-btn.on {
        background: rgba(251, 191, 36, 0.3);
      }
      .toggle-all-btn.off {
        background: var(--s2);
      }
      .toggle-thumb {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--t3);
        transition: transform var(--t-fast);
      }
      .toggle-all-btn.on .toggle-thumb {
        transform: translateX(20px);
        background: var(--c-warning);
      }

      .card {
        position: relative;
        padding: 12px;
      }

      .tint {
        background: radial-gradient(ellipse at 50% 50%, var(--c-warning), transparent 70%);
        opacity: 0;
        transition: opacity var(--t-slow);
      }
      :host([lights-on]) .tint {
        opacity: 0.12;
      }

      .light-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2px;
        position: relative;
        z-index: 1;
      }

      .light-row {
        grid-column: span 2;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        border-radius: var(--radius-md);
        cursor: pointer;
        background: transparent;
        border: none;
        font-family: inherit;
        outline: none;
        text-align: left;
        color: inherit;
        width: 100%;
        box-sizing: border-box;
        transition: background var(--t-fast);
      }
      .light-row:hover {
        background: var(--s1);
      }

      .light-icon-btn {
        background: var(--s2);
        border: none;
        border-radius: var(--radius-md);
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--t3);
        padding: 0;
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          color var(--t-fast),
          background var(--t-fast);
      }
      .light-icon-btn.on {
        color: var(--c-warning);
        filter: drop-shadow(0 0 6px var(--c-warning));
      }
      .light-icon-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .light-info {
        flex: 1;
        min-width: 0;
      }
      .light-name {
        font-size: 13px;
        font-weight: 600;
        color: var(--t2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .light-sub {
        font-size: 11px;
        color: var(--t3);
        font-weight: 400;
      }

      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .status-dot.on {
        background: var(--c-warning);
        box-shadow: 0 0 6px var(--c-warning);
      }
      .status-dot.off {
        background: var(--s3);
      }

      .control-fold {
        padding: 0 8px;
      }

      .brightness-control {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
      }
      .brightness-control ha-icon {
        --mdc-icon-size: 16px;
        color: var(--t4);
        flex-shrink: 0;
      }
      .brightness-slider {
        flex: 1;
        height: 36px;
        appearance: none;
        -webkit-appearance: none;
        background: var(--s1);
        border-radius: var(--radius-lg);
        outline: none;
        border: 1px solid var(--b1);
      }
      .brightness-slider::-webkit-slider-thumb {
        appearance: none;
        -webkit-appearance: none;
        width: 8px;
        height: 20px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.7);
        cursor: pointer;
      }
      .brightness-slider::-moz-range-thumb {
        width: 8px;
        height: 20px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.7);
        border: none;
        cursor: pointer;
      }
      .brightness-value {
        font-size: 12px;
        font-weight: 600;
        color: var(--t2);
        min-width: 30px;
        text-align: right;
      }
    `]}setConfig(t){super.setConfig(t)}getCardSize(){return 3}getTrackedEntityIds(){return this._getLights().map(t=>t.entity_id)}updated(t){super.updated(t);this._getLights().some(t=>"on"===t.state)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on")}_getLights(){if(!this.hass)return[];if(this.areaId)return bt(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("light.")).map(t=>this.hass?.states[t.entity_id]).filter(t=>void 0!==t);if(this._config?.entity){const t=this.hass.states[this._config.entity];return t?[t]:[]}return[]}_toggleLight(t){this.hass?.callService("light","toggle",{},{entity_id:t})}_toggleAll(){const t=this._getLights(),e=t.some(t=>"on"===t.state)?"turn_off":"turn_on",s=t.map(t=>t.entity_id);this.hass?.callService("light",e,{},{entity_id:s})}_setBrightness(t,e){this.hass?.callService("light","turn_on",{brightness_pct:e},{entity_id:t})}_toggleExpand(t){this._expandedEntity=this._expandedEntity===t?null:t}_getBrightnessPct(t){const e=t.attributes.brightness;return void 0===e?0:Math.round(e/255*100)}_renderLightRow(t){const e="on"===t.state,s=t.attributes.friendly_name||t.entity_id,i=e?this._getBrightnessPct(t):0,n=this._expandedEntity===t.entity_id;return q`
      <button
        class="light-row"
        @click=${()=>this._toggleExpand(t.entity_id)}
        aria-label="Expand ${s} controls"
        aria-expanded=${n&&e?"true":"false"}
      >
        <button
          class="light-icon-btn ${e?"on":""}"
          @click=${e=>{e.stopPropagation(),this._toggleLight(t.entity_id)}}
          aria-label="Toggle ${s}"
        >
          <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
        </button>
        <div class="light-info">
          <div class="light-name">${s}</div>
          ${e?q`<div class="light-sub">${i}%</div>`:V}
        </div>
        <span class="status-dot ${e?"on":"off"}"></span>
      </button>

      <div class="fold ${n&&e?"open":""}" style="grid-column: span 2">
        <div class="fold-inner">
          <div class="control-fold">
            <div class="brightness-control">
              <ha-icon .icon=${"mdi:brightness-6"}></ha-icon>
              <input
                type="range"
                class="brightness-slider"
                min="1"
                max="100"
                .value=${String(i)}
                @input=${e=>{const s=Number(e.target.value);this._setBrightness(t.entity_id,s)}}
              />
              <span class="brightness-value">${i}%</span>
            </div>
          </div>
        </div>
      </div>
    `}render(){const t=this._getLights();if(0===t.length)return V;const e=t.filter(t=>"on"===t.state).length,s=e>0;return q`
      <div class="card-header">
        <span class="card-label">
          LIGHTS
          <span class="count-badge">${e}/${t.length}</span>
        </span>
        <button
          class="toggle-all-btn ${s?"on":"off"}"
          @click=${()=>this._toggleAll()}
          aria-label="${s?"Turn off all lights":"Turn on all lights"}"
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>

      <div class="card glass">
        <div class="tint"></div>
        <div class="light-grid">${t.map(t=>this._renderLightRow(t))}</div>
      </div>
    `}}$t([pt({attribute:!1})],xt.prototype,"areaId"),$t([ut()],xt.prototype,"_expandedEntity"),customElements.define("glass-light-card",xt);const wt=window;wt.customCards=wt.customCards||[],wt.customCards.push({type:"glass-light-card",name:"Glass Light Card",description:"Neo-glassmorphism light control card"});var At=Object.defineProperty,kt=(t,e,s,i)=>{for(var n,r=void 0,a=t.length-1;a>=0;a--)(n=t[a])&&(r=n(e,s,r)||r);return r&&At(e,s,r),r};class Et extends lt{constructor(){super(...arguments),this._areaId=null,this._open=!1,this._scenesOpen=!1,this._busCleanups=[],this._boundKeydown=this._onKeydown.bind(this)}static{this.styles=[vt,mt,_t,o`
      :host {
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
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
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%) scale(0.3);
        transform-origin: center bottom;
        width: calc(100vw - 16px);
        max-width: 500px;
        max-height: calc(100vh - 120px);
        overflow-y: auto;
        opacity: 0;
        pointer-events: none;
        transition:
          transform 0.45s var(--ease-out),
          opacity 0.3s var(--ease-std);
        padding: 16px;
        box-sizing: border-box;
      }
      :host([open]) .dialog {
        transform: translateX(-50%) scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }
      .header-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
        background: var(--s2);
        color: var(--t2);
        flex-shrink: 0;
      }
      .header-info {
        flex: 1;
        min-width: 0;
      }
      .header-name {
        font-size: 16px;
        font-weight: 700;
        color: var(--t1);
      }
      .header-meta {
        display: flex;
        gap: 10px;
        font-size: 12px;
        color: var(--t3);
        font-weight: 500;
      }
      .close-btn {
        background: transparent;
        border: none;
        width: 28px;
        height: 28px;
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
      .close-btn:hover {
        background: var(--s3);
      }

      .scenes-toggle {
        background: transparent;
        border: none;
        padding: 0;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 8px;
      }
      .scenes-toggle ha-icon {
        --mdc-icon-size: 14px;
        transition: transform var(--t-fast);
      }
      .scenes-toggle.open ha-icon {
        transform: rotate(90deg);
      }

      .scene-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding-bottom: 8px;
      }
      .scene-chip {
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        padding: 5px 12px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t3);
        cursor: pointer;
        font-family: inherit;
        outline: none;
        transition:
          background var(--t-fast),
          border-color var(--t-fast);
      }
      .scene-chip:hover {
        background: var(--s3);
        border-color: var(--b3);
      }

      .section-title {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin: 12px 0 8px;
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `]}connectedCallback(){super.connectedCallback(),this._busCleanups.push(t.on("popup-open",t=>this._handleOpen(t)),t.on("popup-close",()=>this._handleClose())),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(t=>t()),this._busCleanups=[],document.removeEventListener("keydown",this._boundKeydown)}_handleOpen(t){this._areaId=t.areaId,this._scenesOpen=!1,this._pendingRaf=requestAnimationFrame(()=>{this._pendingRaf=void 0,this._open=!0,this.setAttribute("open","")})}_handleClose(){void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),this._open=!1,this.removeAttribute("open"),setTimeout(()=>{this._areaId=null},350)}_onKeydown(e){"Escape"===e.key&&this._open&&t.emit("popup-close",void 0)}_onOverlayClick(){t.emit("popup-close",void 0)}_getAreaMeta(){if(!this.hass||!this._areaId)return null;const t=this.hass.areas[this._areaId];if(!t)return null;const e=bt(this._areaId,this.hass.entities,this.hass.devices);let s=null,i=null;const n=[],r=new Set;for(const a of e){const t=this.hass?.states[a.entity_id];if(!t)continue;const e=a.entity_id.split(".")[0];if(r.add(e),"sensor"===e){const e=t.attributes.device_class;"temperature"!==e||s||(s=`${t.state}${t.attributes.unit_of_measurement||"°C"}`),"humidity"!==e||i||(i=`${t.state}%`)}"scene"===e&&n.push(t)}return{name:t.name,icon:t.icon||"mdi:home",temperature:s,humidity:i,scenes:n,domains:[...r]}}_activateScene(t){this.hass?.callService("scene","turn_on",{},{entity_id:t})}_hasDomain(t,e){return t.includes(e)}render(){if(!this._areaId)return V;const e=this._getAreaMeta();return e?q`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${e.name}>
        ${q`
          <div class="header">
            <div class="header-icon">
              <ha-icon .icon=${e.icon}></ha-icon>
            </div>
            <div class="header-info">
              <div class="header-name">${e.name}</div>
              <div class="header-meta">
                ${e.temperature?q`<span>${e.temperature}</span>`:V}
                ${e.humidity?q`<span>${e.humidity}</span>`:V}
              </div>
            </div>
            <button
              class="close-btn"
              @click=${()=>t.emit("popup-close",void 0)}
              aria-label="Close"
            >
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>

          ${e.scenes.length>0?q`
                <button
                  class="scenes-toggle ${this._scenesOpen?"open":""}"
                  @click=${()=>this._scenesOpen=!this._scenesOpen}
                  aria-expanded=${this._scenesOpen?"true":"false"}
                >
                  <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
                  SCENES
                </button>
                <div class="fold ${this._scenesOpen?"open":""}">
                  <div class="fold-inner">
                    <div class="scene-chips">
                      ${e.scenes.map(t=>q`
                          <button
                            class="scene-chip"
                            @click=${()=>this._activateScene(t.entity_id)}
                            aria-label="Activate ${t.attributes.friendly_name||t.entity_id}"
                          >
                            ${t.attributes.friendly_name||t.entity_id}
                          </button>
                        `)}
                    </div>
                  </div>
                </div>
              `:V}

          <div class="cards">
            ${this._hasDomain(e.domains,"light")?q`
                  <glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>
                `:V}
          </div>
        `}
      </div>
    `:V}}kt([pt({attribute:!1})],Et.prototype,"hass"),kt([ut()],Et.prototype,"_areaId"),kt([ut()],Et.prototype,"_open"),kt([ut()],Et.prototype,"_scenesOpen"),customElements.define("glass-room-popup",Et);var St=Object.defineProperty,Ct=(t,e,s,i)=>{for(var n,r=void 0,a=t.length-1;a>=0;a--)(n=t[a])&&(r=n(e,s,r)||r);return r&&St(e,s,r),r};class Pt extends ft{constructor(){super(...arguments),this._items=[],this._activeArea=null,this._popup=null,this._areaStructure=[],this._lastAreaKeys=""}static{this.styles=[vt,mt,o`
      :host {
        display: block;
        height: 0;
        overflow: visible;
      }

      .navbar {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 500px;
        width: calc(100vw - 32px);
        height: 58px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        padding: 0 6px;
        box-sizing: border-box;
        z-index: 9990;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .nav-scroll {
        display: flex;
        align-items: center;
        gap: 4px;
        overflow-x: auto;
        scrollbar-width: none;
        flex: 1;
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0,
          black 12px,
          black calc(100% - 12px),
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0,
          black 12px,
          black calc(100% - 12px),
          transparent 100%
        );
        padding: 0 8px;
      }
      .nav-scroll::-webkit-scrollbar {
        display: none;
      }

      .nav-item {
        background: transparent;
        border: none;
        border-radius: 14px;
        min-width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 0 10px;
        cursor: pointer;
        position: relative;
        color: var(--t3);
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          background var(--t-fast),
          color var(--t-fast);
      }
      .nav-item:hover {
        background: var(--s2);
      }
      .nav-item.active {
        background: rgba(255, 255, 255, 0.1);
        color: var(--t1);
      }

      .nav-item ha-icon {
        --mdc-icon-size: 22px;
        flex-shrink: 0;
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
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
        min-width: 0;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .nav-item.active .nav-label {
        opacity: 1;
      }

      .indicator {
        position: absolute;
        top: 6px;
        right: 6px;
      }

      .light-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--c-warning);
        box-shadow: 0 0 6px var(--c-warning);
      }

      .temp-badge {
        font-size: 8px;
        font-weight: 700;
        color: var(--t3);
        background: var(--s2);
        border-radius: var(--radius-full);
        padding: 1px 4px;
        position: absolute;
        bottom: 4px;
        right: 2px;
      }

      .music-pulse {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--c-accent);
        animation: pulse-music 0.8s ease-in-out infinite alternate;
      }

      @keyframes pulse-music {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.4);
        }
      }
    `]}connectedCallback(){super.connectedCallback(),this._popup||(this._popup=document.createElement("glass-room-popup"),document.body.appendChild(this._popup)),this._listen("popup-close",()=>{this._activeArea=null})}disconnectedCallback(){super.disconnectedCallback(),this._popup?.remove(),this._popup=null}setConfig(t){super.setConfig(t)}getCardSize(){return 0}getTrackedEntityIds(){return this._items.flatMap(t=>t.entityIds)}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this._rebuildStructure(),this._aggregateState(),this._popup&&(this._popup.hass=this.hass))}_rebuildStructure(){if(!this.hass?.areas)return;const t=Object.keys(this.hass.areas).sort().join(",");if(t!==this._lastAreaKeys){this._lastAreaKeys=t,this._areaStructure=[];for(const t of Object.values(this.hass.areas)){const e=bt(t.area_id,this.hass.entities,this.hass.devices);0!==e.length&&this._areaStructure.push({areaId:t.area_id,name:t.name,icon:t.icon||"mdi:home",entityIds:e.map(t=>t.entity_id)})}}}_aggregateState(){if(!this.hass)return;const t=this._areaStructure.map(t=>{let e=0,s=null,i=null,n=!1;for(const r of t.entityIds){const t=this.hass?.states[r];if(!t)continue;const a=r.split(".")[0];if("light"===a&&"on"===t.state&&e++,"sensor"===a){const e=t.attributes.device_class;"temperature"!==e||s||(s=`${t.state}°`),"humidity"!==e||i||(i=`${t.state}%`)}"media_player"===a&&"playing"===t.state&&(n=!0)}return{...t,lightsOn:e,temperature:s,humidity:i,mediaPlaying:n}});this._items=t}_handleNavClick(e,s){const i=s.currentTarget.getBoundingClientRect();this._activeArea===e.areaId?(t.emit("popup-close",void 0),this._activeArea=null):(this._activeArea=e.areaId,t.emit("popup-open",{areaId:e.areaId,originRect:i}))}_renderNavItem(t){const e=this._activeArea===t.areaId;return q`
      <button
        class="nav-item ${e?"active":""}"
        @click=${e=>this._handleNavClick(t,e)}
        aria-label=${t.name}
      >
        <ha-icon .icon=${t.icon}></ha-icon>
        <span class="nav-label-wrap"><span class="nav-label">${t.name}</span></span>
        ${t.lightsOn>0?q`<span class="indicator"><span class="light-dot"></span></span>`:t.mediaPlaying?q`<span class="indicator"><span class="music-pulse"></span></span>`:V}
        ${t.temperature?q`<span class="temp-badge">${t.temperature}</span>`:V}
      </button>
    `}render(){return 0===this._items.length?V:q`
      <nav class="navbar glass glass-float">
        <div class="nav-scroll">${this._items.map(t=>this._renderNavItem(t))}</div>
      </nav>
    `}}Ct([ut()],Pt.prototype,"_items"),Ct([ut()],Pt.prototype,"_activeArea"),customElements.define("glass-navbar-card",Pt);const Ot=window;Ot.customCards=Ot.customCards||[],Ot.customCards.push({type:"glass-navbar-card",name:"Glass Navbar Card",description:"Auto-discovering bottom navigation for Glass Cards"}),function(){if(e)return;e=!0;const s=history.pushState,i=history.replaceState;history.pushState=function(e,i,n){s.call(this,e,i,n),window.dispatchEvent(new Event("location-changed")),t.emit("location-changed",void 0)},history.replaceState=function(e,s,n){i.call(this,e,s,n),window.dispatchEvent(new Event("location-changed")),t.emit("location-changed",void 0)},window.addEventListener("popstate",()=>{t.emit("location-changed",void 0)})}()}();
