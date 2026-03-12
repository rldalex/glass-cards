!function(){"use strict";const e=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}};let t=!1,i=!1;function a(){e.emit("location-changed",void 0)}const s=globalThis,r=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let l=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const c=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new l(i,e,o)},d=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new l("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:h,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:_,getOwnPropertySymbols:g,getPrototypeOf:f}=Object,m=globalThis,v=m.trustedTypes,b=v?v.emptyScript:"",y=m.reactiveElementPolyfillSupport,x=(e,t)=>e,w={toAttribute(e,t){switch(t){case Boolean:e=e?b:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},k=(e,t)=>!h(e,t),$={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&p(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:s}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const r=a?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,t=[..._(e),...g(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),a=s.litNonce;void 0!==a&&t.setAttribute("nonce",a),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:w;this._$Em=a;const r=s.fromAttribute(t,e.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(e,t,i,a=!1,s){if(void 0!==e){const r=this.constructor;if(!1===a&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??k)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[x("elementProperties")]=new Map,C[x("finalized")]=new Map,y?.({ReactiveElement:C}),(m.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,I=e=>e,T=S.trustedTypes,P=T?T.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,L="?"+A,M=`<${L}>`,z=document,O=()=>z.createComment(""),R=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,j="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,H=/>/g,V=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,U=/"/g,B=/^(?:script|style|textarea|title)$/i,W=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),K=W(1),G=W(2),X=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),Y=new WeakMap,J=z.createTreeWalker(z,129);function Z(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(t):t}class ee{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,r=0;const o=e.length-1,n=this.parts,[l,c]=((e,t)=>{const i=e.length-1,a=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=q;for(let n=0;n<i;n++){const t=e[n];let i,l,c=-1,d=0;for(;d<t.length&&(o.lastIndex=d,l=o.exec(t),null!==l);)d=o.lastIndex,o===q?"!--"===l[1]?o=F:void 0!==l[1]?o=H:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=V):void 0!==l[3]&&(o=V):o===V?">"===l[0]?(o=s??q,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,i=l[1],o=void 0===l[3]?V:'"'===l[3]?U:N):o===U||o===N?o=V:o===F||o===H?o=q:(o=V,s=void 0);const h=o===V&&e[n+1].startsWith("/>")?" ":"";r+=o===q?t+M:c>=0?(a.push(i),t.slice(0,c)+E+t.slice(c)+A+h):t+A+(-2===c?n:h)}return[Z(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=ee.createElement(l,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=J.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=c[r++],i=a.getAttribute(e).split(A),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?re:"?"===o[1]?oe:"@"===o[1]?ne:se}),a.removeAttribute(e)}else e.startsWith(A)&&(n.push({type:6,index:s}),a.removeAttribute(e));if(B.test(a.tagName)){const e=a.textContent.split(A),t=e.length-1;if(t>0){a.textContent=T?T.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],O()),J.nextNode(),n.push({type:2,index:++s});a.append(e[t],O())}}}else if(8===a.nodeType)if(a.data===L)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(A,e+1));)n.push({type:7,index:s}),e+=A.length-1}s++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function te(e,t,i=e,a){if(t===X)return t;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const r=R(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(t=te(e,s._$AS(e,t.values),s,a)),t}class ie{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??z).importNode(t,!0);J.currentNode=a;let s=J.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new ae(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new le(s,this,e)),this._$AV.push(t),n=i[++o]}r!==n?.index&&(s=J.nextNode(),r++)}return J.currentNode=z,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ae{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=te(this,e,t),R(e)?e===Q||null==e||""===e?(this._$AH!==Q&&this._$AR(),this._$AH=Q):e!==this._$AH&&e!==X&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Q&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=ee.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new ie(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new ee(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new ae(this.O(O()),this.O(O()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=I(e).nextSibling;I(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class se{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}_$AI(e,t=this,i,a){const s=this.strings;let r=!1;if(void 0===s)e=te(this,e,t,0),r=!R(e)||e!==this._$AH&&e!==X,r&&(this._$AH=e);else{const a=e;let o,n;for(e=s[0],o=0;o<s.length-1;o++)n=te(this,a[i+o],t,o),n===X&&(n=this._$AH[o]),r||=!R(n)||n!==this._$AH[o],n===Q?e=Q:e!==Q&&(e+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!a&&this.j(e)}j(e){e===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Q?void 0:e}}class oe extends se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Q)}}class ne extends se{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=te(this,e,t,0)??Q)===X)return;const i=this._$AH,a=e===Q&&i!==Q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==Q&&(i===Q||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class le{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){te(this,e)}}const ce=S.litHtmlPolyfillSupport;ce?.(ee,ae),(S.litHtmlVersions??=[]).push("3.3.2");const de=globalThis;class he extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=i?.renderBefore??null;a._$litPart$=s=new ae(t.insertBefore(O(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return X}}he._$litElement$=!0,he.finalized=!0,de.litElementHydrateSupport?.({LitElement:he});const pe=de.litElementPolyfillSupport;pe?.({LitElement:he}),(de.litElementVersions??=[]).push("4.2.2");const ue=c`
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
`,_e=c`
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
`,ge=c`
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
    animation: marquee-scroll var(--marquee-duration, 8s) linear infinite;
    will-change: transform;
  }
  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`,fe=18;function me(e,t=18,i="8s"){return e.length<=t?e:K`<span class="marquee" style="--marquee-duration:${i}"><span class="marquee-inner">${e}\u00A0\u00A0\u00A0${e}\u00A0\u00A0\u00A0</span></span>`}const ve=c`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`,be=c`
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
`,ye=c`
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
`,xe={morning:{body:"#0f1923",blobTop:"#1a6b8a",blobBottom:"#2d8a6e"},day:{body:"#111827",blobTop:"#3b6fa0",blobBottom:"#4a90a0"},evening:{body:"#1a1118",blobTop:"#8a4a2d",blobBottom:"#6b3a5a"},night:{body:"#0a0e1a",blobTop:"#1a2040",blobBottom:"#2a1a3a"}},we="glass-cards-ambient-bg",ke=`\n  #${we} {\n    position: fixed;\n    inset: 0;\n    z-index: 0;\n    pointer-events: none;\n    overflow: hidden;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${we}::before,\n  #${we}::after {\n    content: '';\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(120px);\n    opacity: 0.4;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${we}::before {\n    width: 600px;\n    height: 600px;\n    top: -200px;\n    right: -100px;\n    background: var(--ambient-blob-top, #3b6fa0);\n  }\n  #${we}::after {\n    width: 500px;\n    height: 500px;\n    bottom: -150px;\n    left: -100px;\n    background: var(--ambient-blob-bottom, #4a90a0);\n  }\n  html::-webkit-scrollbar { display: none; }\n  html { scrollbar-width: none; }\n`;class $e{constructor(){this.period="day",this.ambientEl=null,this.styleEl=null,this.cleanup=e.on("ambient-update",e=>{this.period=e.period,this.applyAmbient()}),this._injectAmbientBg(),this.applyAmbient()}get currentPeriod(){return this.period}applyAmbient(e){e&&(this.period=e);const t=xe[this.period],i=document.documentElement;i.style.setProperty("--ambient-body",t.body),i.style.setProperty("--ambient-blob-top",t.blobTop),i.style.setProperty("--ambient-blob-bottom",t.blobBottom),this.ambientEl&&(this.ambientEl.style.background=t.body)}_injectAmbientBg(){if(document.documentElement.style.background="transparent",document.getElementById(we))return this.ambientEl=document.getElementById(we),void(this.styleEl=document.head.querySelector("style[data-glass-ambient]"));this.styleEl=document.createElement("style"),this.styleEl.setAttribute("data-glass-ambient",""),this.styleEl.textContent=ke,document.head.appendChild(this.styleEl),this.ambientEl=document.createElement("div"),this.ambientEl.id=we,document.body.prepend(this.ambientEl)}destroy(){this.cleanup?.(),this.ambientEl?.remove(),this.ambientEl=null,this.styleEl?.remove(),this.styleEl=null,document.documentElement.style.removeProperty("background"),Ce===this&&(Ce=null)}}let Ce=null;function Se(e,t){const i=t,a=i*(1-Math.abs(e/60%2-1));let s=0,r=0,o=0;e<60?(s=i,r=a):e<120?(s=a,r=i):e<180?(r=i,o=a):e<240?(r=a,o=i):e<300?(s=a,o=i):(s=i,o=a);const n=1-i;return[Math.round(255*(s+n)),Math.round(255*(r+n)),Math.round(255*(o+n))]}function Ie(e){const t=e[0]/255,i=e[1]/255,a=e[2]/255,s=Math.max(t,i,a),r=s-Math.min(t,i,a);let o=0;0!==r&&(o=s===t?((i-a)/r+6)%6*60:s===i?60*((a-t)/r+2):60*((t-i)/r+4));return{h:o,s:0===s?0:r/s}}function Te(e){return"#"+e.map(e=>e.toString(16).padStart(2,"0")).join("")}const Pe={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:k},Ee=(e=Pe,t,i)=>{const{kind:a,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,s,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];t.call(this,i),this.requestUpdate(a,s,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function Ae(e){return(t,i)=>"object"==typeof i?Ee(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function Le(e){return Ae({...e,state:!0,attribute:!1})}const Me={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer",collapse:"Réduire",expand:"Développer"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store d'ombrage",dc_window:"Fenêtre",dc_damper:"Clapet"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce."},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",remove_from_queue:"Retirer de la liste de lecture",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",distance_m:"m",distance_km:"km"},camera:{title:"CAMÉRAS",idle:"Veille",streaming:"En direct",recording:"Enregistrement",off:"Éteinte",unavailable:"Indisponible",no_cameras:"Aucune caméra",prev_aria:"Caméra précédente",next_aria:"Caméra suivante",dot_aria:"Aller à {name}",power_on:"Allumer",power_off:"Éteindre",snapshot:"Capture",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Désactiver détection mouvement",motion_off_aria:"Activer détection mouvement",siren_aria:"Sirène",floodlight_aria:"Projecteur",auto_track_aria:"Suivi automatique",tap_to_stream:"Appuyer pour diffuser",camera_off:"Caméra éteinte",ai_person:"Personne",ai_vehicle:"Véhicule",ai_pet:"Animal",ai_animal:"Animal",ai_package:"Colis",ai_face:"Visage",ai_baby_crying:"Bébé",ai_bicycle:"Vélo",dashboard_title:"CAMÉRAS",dashboard_title_one:"1 CAMÉRA"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Barre de nav","tab_popup":"Popup Pièce","tab_light":"Carte Lumières","preview":"Aperçu","behavior":"Comportement","navbar_behavior":"Comportement","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","navbar_rooms_banner":"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.","navbar_visible_rooms":"Pièces visibles","navbar_empty_rooms":"Pièces vides","navbar_empty_rooms_desc":"Ces pièces n\'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu\'elles apparaissent dans la navbar.","navbar_indicators":"Indicateurs","navbar_indicators_desc":"Activez ou désactivez les indicateurs visuels sur la navbar.","navbar_ind_lights":"Lumières allumées","navbar_ind_lights_desc":"Glow doré sur l\'icône","navbar_ind_temp":"Température","navbar_ind_temp_desc":"Badge chaud / froid","navbar_ind_humidity":"Humidité","navbar_ind_humidity_desc":"Barre bleue en bas","navbar_ind_media":"Média en lecture","navbar_ind_media_desc":"Bounce de l\'icône","navbar_thresholds":"Seuils","navbar_thresholds_desc":"Définissez les seuils pour les alertes de température et d\'humidité.","navbar_temp_high":"Température haute","navbar_temp_low":"Température basse","navbar_humidity_threshold":"Seuil humidité","navbar_choose_icon":"Choisir icône","navbar_change_icon_aria":"Changer l\'icône de {name}","navbar_icon_label":"Icône — {name}","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_camera":"Caméras","domain_camera_desc":"Caméras de surveillance","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Carte Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_hourly":"Prévisions horaires","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","tab_title":"Carte Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Carte Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Carte Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Carte Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Carte Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Carte Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Carte Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Carte Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","dashboard_card_fan":"Carte Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Carte Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Carte Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Carte Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Carte Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_compact":"Affichage compact","cover_dashboard_compact_desc":"Affiche les volets en grille compacte 2 colonnes. Désactivé, chaque volet occupe toute la largeur.","cover_dashboard_entities":"Volets du tableau de bord","cover_dashboard_entities_desc":"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_camera_carousel":"Carte Caméras","camera_show_header":"Afficher l\'en-tête","camera_show_header_desc":"Titre et compteur au-dessus de la carte","camera_auto_cycle":"Cycle automatique","camera_auto_cycle_desc":"Passer automatiquement d\'une caméra à l\'autre","camera_cycle_interval":"Intervalle (secondes)","camera_cycle_interval_desc":"Temps entre chaque changement de caméra","camera_entity_order":"Ordre des caméras","camera_entity_order_desc":"Glissez pour réordonner les caméras.","camera_no_cameras":"Aucune caméra détectée.","dashboard_card_camera_carousel":"Carte Caméras","dashboard_card_camera_carousel_desc":"Carrousel de surveillance avec actions rapides","tab_spotify":"Carte Spotify","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Entité lecteur Spotify","spotify_entity_desc":"Sélectionnez l\'entité media_player Spotify à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Sélectionnez les enceintes affichées dans le popup de lecture. Si aucune n\'est sélectionnée, toutes les enceintes sont affichées.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete",collapse:"Collapse",expand:"Expand"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room."},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",remove_from_queue:"Remove from queue",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",distance_m:"m",distance_km:"km"},camera:{title:"CAMERAS",idle:"Idle",streaming:"Streaming",recording:"Recording",off:"Off",unavailable:"Unavailable",no_cameras:"No cameras",prev_aria:"Previous camera",next_aria:"Next camera",dot_aria:"Go to {name}",power_on:"Turn on",power_off:"Turn off",snapshot:"Snapshot",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Disable motion detection",motion_off_aria:"Enable motion detection",siren_aria:"Siren",floodlight_aria:"Floodlight",auto_track_aria:"Auto tracking",tap_to_stream:"Tap to stream",camera_off:"Camera off",ai_person:"Person",ai_vehicle:"Vehicle",ai_pet:"Pet",ai_animal:"Animal",ai_package:"Package",ai_face:"Face",ai_baby_crying:"Baby",ai_bicycle:"Bicycle",dashboard_title:"CAMERAS",dashboard_title_one:"1 CAMERA"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Navbar","tab_popup":"Room Popup","tab_light":"Light Card","preview":"Preview","behavior":"Behavior","navbar_behavior":"Behavior","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","navbar_rooms_banner":"Drag to reorder rooms. Toggle to hide.","navbar_visible_rooms":"Visible rooms","navbar_empty_rooms":"Empty rooms","navbar_empty_rooms_desc":"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.","navbar_indicators":"Indicators","navbar_indicators_desc":"Enable or disable visual indicators on the navbar.","navbar_ind_lights":"Lights on","navbar_ind_lights_desc":"Golden glow on icon","navbar_ind_temp":"Temperature","navbar_ind_temp_desc":"Hot / cold badge","navbar_ind_humidity":"Humidity","navbar_ind_humidity_desc":"Blue bar at bottom","navbar_ind_media":"Media playing","navbar_ind_media_desc":"Icon bounce","navbar_thresholds":"Thresholds","navbar_thresholds_desc":"Set thresholds for temperature and humidity alerts.","navbar_temp_high":"High temperature","navbar_temp_low":"Low temperature","navbar_humidity_threshold":"Humidity threshold","navbar_choose_icon":"Choose icon","navbar_change_icon_aria":"Change icon for {name}","navbar_icon_label":"Icon — {name}","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_camera":"Cameras","domain_camera_desc":"Security cameras","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather Card","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_hourly":"Hourly forecast","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","tab_title":"Title Card","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_add_source":"Add a source","title_remove_source":"Remove source","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title Card","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather Card","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Light Card","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Cover Card","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify Card","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media Card","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media Card","dashboard_card_media_desc":"Shows media players with transport controls","dashboard_card_fan":"Fan Card","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence Card","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence Card","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fan Card","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Cover Card","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_compact":"Compact layout","cover_dashboard_compact_desc":"Display covers in a 2-column compact grid. When off, each cover takes the full width.","cover_dashboard_entities":"Dashboard covers","cover_dashboard_entities_desc":"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_camera_carousel":"Camera Card","camera_show_header":"Show header","camera_show_header_desc":"Title and counter above the card","camera_auto_cycle":"Auto cycle","camera_auto_cycle_desc":"Automatically cycle between cameras","camera_cycle_interval":"Interval (seconds)","camera_cycle_interval_desc":"Time between each camera switch","camera_entity_order":"Camera order","camera_entity_order_desc":"Drag to reorder cameras.","camera_no_cameras":"No cameras detected.","dashboard_card_camera_carousel":"Camera Card","dashboard_card_camera_carousel_desc":"Surveillance carousel with quick actions","tab_spotify":"Spotify Card","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player entity","spotify_entity_desc":"Select the Spotify media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Select which speakers appear in the playback popup. If none are selected, all speakers are shown.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings"}')}},ze="fr";let Oe=ze;function Re(e){const t=e.slice(0,2).toLowerCase(),i=t in Me?t:ze;return i!==Oe&&(Oe=i,!0)}function De(){return Oe}function je(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),s=-1===i?"":e.slice(i+1),r=Me[Oe]??Me[ze],o=Me[ze],n=r?.[a]?.[s]??o?.[a]?.[s];let l="string"==typeof n?n:e;if(t)for(const[c,d]of Object.entries(t))l=l.replaceAll(`{${c}}`,String(d));return l}var qe=Object.defineProperty,Fe=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&qe(t,i,r),r};class He extends he{constructor(){super(...arguments),this._lang=De(),this._busCleanups=[],this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&Re(this.hass.language)&&(this._lang=De())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0)}_listen(t,i){this._busCleanups.push(e.on(t,i))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function Ve(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&function(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}(t,i)===e)}function Ne(e,t){if(!t)return!0;const i=t[e];if(!i||0===i.periods.length)return!0;const a=new Date;return i.periods.some(e=>{const t=new Date(e.start),i=new Date(e.end);if(i.setSeconds(59,999),e.recurring){const e=new Date(a.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),s=new Date(a.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999);if(e<=s)return a>=e&&a<=s;const r=new Date(a.getFullYear()+1,i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999),o=new Date(a.getFullYear()-1,t.getMonth(),t.getDate(),t.getHours(),t.getMinutes());return a>=e&&a<=r||a>=o&&a<=s}return a>=t&&a<=i})}Fe([Ae({attribute:!1})],He.prototype,"hass"),Fe([Le()],He.prototype,"_lang");class Ue{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}var Be=Object.defineProperty,We=Object.getOwnPropertyDescriptor,Ke=(e,t,i,a)=>{for(var s,r=a>1?void 0:a?We(t,i):t,o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a?s(t,i,r):s(r))||r);return a&&r&&Be(t,i,r),r};class Ge extends he{constructor(){super(...arguments),this._lang=De()}set hass(e){this._hass=e,e?.language&&Re(e.language)&&(this._lang=De())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[ue,c`
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
    `]}render(){return this._lang,K`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${je("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${je("editor.open_config")}</a>
        </p>
      </div>
    `}}Ke([Ae({attribute:!1})],Ge.prototype,"hass",1),Ke([Le()],Ge.prototype,"_lang",2);try{customElements.define("glass-light-card-editor",Ge)}catch{}var Xe=Object.defineProperty,Qe=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Xe(t,i,r),r};const Ye=[[3e3,"light.temp_warm","#ffd4a3"],[4e3,"light.temp_warm","#ffedb3"],[4800,"light.temp_neutral","#fff5e6"],[9999,"light.temp_cold","#e0ecf5"]];function Je(e){for(const[t,i,a]of Ye)if(e<t)return{label:je(i),color:a};return{label:je("light.temp_cold"),color:"#e0ecf5"}}function Ze(e,t){return`rgba(${e[0]},${e[1]},${e[2]},${t})`}const et=[[251,191,36],[248,113,113],[244,114,182],[167,139,250],[129,140,248],[96,165,250],[74,222,128],[240,240,240]];const tt=["off","candle","fire"];class it extends He{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null,this._showHeader=!0,this._lightConfigLoaded=!1,this._throttleTimers=new Map,this._roomConfig=null,this._roomConfigLoaded=!1,this._lightsFingerprint="",this._schedules=null,this._schedulesLoaded=!1,this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._wheelCanvas=null}static getConfigElement(){return document.createElement("glass-light-card-editor")}get _isDashboardMode(){return!(this.areaId||this._config?.area)&&!this._config?.entity}static{this.styles=[ue,_e,ye,ge,ve,c`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      /* ── Card Header ── */
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 6px;
        padding: 0 6px;
        min-height: 22px;
      }
      .card-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .card-title {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .card-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 14px;
        height: 14px;
        padding: 0 4px;
        border-radius: var(--radius-full);
        font-size: 9px;
        font-weight: 600;
        transition: all var(--t-med);
      }
      .card-count.none {
        background: var(--s2);
        color: var(--t3);
      }
      .card-count.some {
        background: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
      }
      .card-count.all {
        background: rgba(251, 191, 36, 0.2);
        color: var(--c-light-glow);
      }

      /* ── Toggle All ── */
      .toggle-all {
        position: relative;
        width: 40px;
        height: 22px;
        border-radius: 11px;
        background: var(--s2);
        border: 1px solid var(--b2);
        cursor: pointer;
        transition: all var(--t-fast);
        padding: 0;
        outline: none;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
      }
      .toggle-all::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--t3);
        transition:
          transform var(--t-fast),
          background var(--t-fast),
          box-shadow var(--t-fast);
      }
      .toggle-all.on {
        background: rgba(251, 191, 36, 0.2);
        border-color: rgba(251, 191, 36, 0.3);
      }
      .toggle-all.on::after {
        transform: translateX(18px);
        background: var(--c-light-glow);
        box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
      }

      /* ── Card Body ── */
      .card {
        position: relative;
        padding: 2px 14px;
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
        gap: 10px;
        grid-column: 1 / -1;
        padding: 8px 4px;
        position: relative;
        transition: background var(--t-fast);
        border-radius: var(--radius-md);
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
        padding-left: 10px;
      }
      .light-row.compact-right::before {
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

      /* ── Icon Button ── */
      .light-icon-btn {
        width: 36px;
        height: 36px;
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
        --mdc-icon-size: 18px;
        display: flex; align-items: center; justify-content: center;
      }
      .light-icon-btn.on {
        background: rgba(251, 191, 36, 0.1);
        border-color: rgba(251, 191, 36, 0.15);
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.4));
      }
      .light-icon-btn.on.rgb {
        background: var(--light-rgb-bg);
        border-color: var(--light-rgb-border);
        color: var(--light-rgb);
        filter: drop-shadow(0 0 6px var(--light-rgb-glow));
      }

      /* ── Expand Button ── */
      .light-expand-btn {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 10px;
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
        font-size: 13px;
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
      }
      .light-sub {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 2px;
      }
      .light-brightness-text {
        font-size: 10px;
        font-weight: 500;
        color: var(--t3);
        transition: color var(--t-med);
      }
      .light-row[data-on='true'] .light-brightness-text {
        color: rgba(251, 191, 36, 0.55);
      }
      .light-row[data-on='true'][data-rgb] .light-brightness-text {
        color: var(--light-rgb-sub, rgba(251, 191, 36, 0.55));
      }
      .light-temp-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        transition: background var(--t-med);
      }
      .light-temp-text {
        font-size: 10px;
        font-weight: 400;
        color: var(--t4);
      }

      /* ── Status Dot ── */
      .light-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
        transition: all var(--t-med);
      }
      .light-row[data-on='true'] .light-dot {
        background: var(--c-light-glow);
        box-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
      }
      .light-row[data-on='true'][data-rgb] .light-dot {
        background: var(--light-rgb);
        box-shadow: 0 0 8px var(--light-rgb-glow);
      }

      /* ── Control Fold ── */
      .ctrl-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        grid-column: 1 / -1;
      }
      .ctrl-fold.open {
        grid-template-rows: 1fr;
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
        height: 1px;
        margin: 0 12px;
        overflow: hidden;
        background: linear-gradient(90deg, transparent, var(--fold-color, rgba(251,191,36,0.25)), transparent);
        opacity: 0;
        transition: opacity var(--t-layout);
        grid-column: 1 / -1;
      }
      .fold-sep.visible { opacity: 1; }
      .ctrl-panel {
        padding: 6px 0 4px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .ctrl-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: rgba(251, 191, 36, 0.6);
      }
      .ctrl-panel[data-rgb] .ctrl-label {
        color: var(--light-rgb-sub, rgba(251, 191, 36, 0.6));
      }

      /* ── Slider ── */
      .slider {
        position: relative;
        width: 100%;
        height: 36px;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
        overflow: visible;
      }
      .slider-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
        overflow: hidden;
      }
      .slider-fill.warm {
        background: linear-gradient(90deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.3));
      }
      .slider-fill.dynamic {
        background: linear-gradient(
          90deg,
          var(--slider-fill-start, rgba(251, 191, 36, 0.15)),
          var(--slider-fill-end, rgba(251, 191, 36, 0.3))
        );
      }
      .slider-fill.temp-gradient {
        width: 100% !important;
        background: linear-gradient(
          90deg,
          rgba(255, 179, 71, 0.2) 0%,
          rgba(255, 245, 230, 0.15) 50%,
          rgba(135, 206, 235, 0.2) 100%
        );
        opacity: 0.7;
      }
      .slider-thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 20px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.7);
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
        pointer-events: none;
      }
      .slider-lbl {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        font-size: 11px;
        font-weight: 600;
        color: var(--t2);
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .slider-lbl ha-icon {
        --mdc-icon-size: 16px;
        opacity: 0.6;
        display: flex; align-items: center; justify-content: center;
      }
      .slider-val {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        font-size: 11px;
        font-weight: 600;
        color: var(--t3);
        pointer-events: none;
      }
      .slider-native {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        appearance: none;
      }

      /* ── Color Controls ── */
      .color-row {
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 2px 0;
      }
      .cdot {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all var(--t-fast);
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
      .cdot.active { border-color: rgba(255, 255, 255, 0.6); }
      .color-picker-btn {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        padding: 0;
        outline: none;
        background: none;
        -webkit-tap-highlight-color: transparent;
        transition: all var(--t-fast);
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
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        animation: cpFadeIn 0.2s ease;
      }
      @keyframes cpFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .color-picker-dialog {
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2);
        border-radius: var(--radius-xl);
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.15);
        max-width: 300px;
        width: 90vw;
      }
      .color-picker-dialog .cp-title {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t3);
      }
      .cp-wheel-wrap {
        position: relative;
        width: 220px;
        height: 220px;
      }
      .cp-wheel-wrap canvas {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        cursor: crosshair;
      }
      .cp-cursor {
        position: absolute;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 6px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.2);
        pointer-events: none;
        transform: translate(-50%, calc(-50% - 28px));
        transition: left 0.05s, top 0.05s;
      }
      .cp-cursor::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 10px;
        background: rgba(255,255,255,0.5);
        border-radius: 1px;
      }
      .cp-preview {
        width: 100%;
        height: 36px;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
      }
      .cp-hex {
        font-size: 12px; font-weight: 600; color: var(--t2);
        font-family: monospace; letter-spacing: 0.5px;
      }
      .cp-close {
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t2);
        background: var(--s2);
        border: 1px solid var(--b2);
        border-radius: var(--radius-md);
        padding: 8px 24px;
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
        font-size: 10px;
        font-weight: 500;
        color: var(--t3);
        text-align: center;
        padding: 6px 0 2px;
        letter-spacing: 0.3px;
        grid-column: 1 / -1;
      }
    `]}setConfig(e){super.setConfig(e)}getCardSize(){if(this._isDashboardMode){const e=this._getLights().length;return 0===e?1:Math.min(e,6)+1}return 3}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null),null!==this._colorPickerEntity&&(this._colorPickerEntity=null,this._colorPickerPos=null)}connectedCallback(){super.connectedCallback(),this._listen("room-config-changed",e=>{const t=this.areaId||this._config?.area;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._dashboardTotalCache=void 0,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadDashboardHidden())}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadSchedules()}),this._listen("light-config-changed",()=>{this._lightConfigLoaded=!1,this._loadLightConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear(),this._backend=void 0,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1}async _loadRoomConfig(){const e=this.areaId||this._config?.area;if(e&&this.hass&&!this._roomConfigLoaded){this._roomConfigLoaded=!0,this._lastLoadedAreaId=e;try{this._backend||(this._backend=new Ue(this.hass));const t=await this._backend.send("get_room",{area_id:e});if((this.areaId||this._config?.area)!==e)return;this._roomConfig=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new Ue(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadLightConfig(){if(this.hass&&!this._lightConfigLoaded){this._lightConfigLoaded=!0;try{this._backend||(this._backend=new Ue(this.hass));const e=await this._backend.send("get_config");e?.light_card&&(this._showHeader=e.light_card.show_header??!0)}catch{}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds;if(e&&0!==e.length)try{this._backend||(this._backend=new Ue(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardTotalCache=void 0,this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedLightIds=void 0,this._lightsFingerprint="",this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear()}getTrackedEntityIds(){if(this._isDashboardMode&&this.hass&&this.visibleAreaIds?.length&&this.hass.entities&&this.hass.devices){const e=[];for(const t of this.visibleAreaIds)for(const i of Ve(t,this.hass.entities,this.hass.devices))i.entity_id.startsWith("light.")&&e.push(i.entity_id);return e}return this._getLights().map(e=>e.entity_id)}updated(e){super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._lightConfigLoaded&&this._loadLightConfig();const t=this.areaId||this._config?.area;if(t&&this.hass&&(this._lastLoadedAreaId!==t&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedLightIds=void 0,this._lightsFingerprint="")}e.has("visibleAreaIds")&&(this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardHiddenLoaded=!1);const i=this._getLightInfos();if(i.some(e=>e.isOn)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on"),e.has("hass")&&this._dragValues.size>0){let e=!1;const t=new Map(this._dragValues);for(const a of i){const i=`bri:${a.entityId}`,s=t.get(i);void 0!==s&&Math.abs(a.brightnessPct-s)<=2&&(t.delete(i),e=!0);const r=`temp:${a.entityId}`,o=t.get(r);void 0!==o&&null!==a.colorTempKelvin&&Math.abs(a.colorTempKelvin-o)<=50&&(t.delete(r),e=!0)}e&&(this._dragValues=t)}if(this._colorPickerEntity){const e=this.renderRoot.querySelector(".cp-wheel-wrap canvas");e&&e.dataset.drawnFor!==this._colorPickerEntity&&(!function(e){const t=e.getBoundingClientRect(),i=Math.round(t.width)||220,a=window.devicePixelRatio||1;e.width=i*a,e.height=i*a;const s=e.getContext("2d");if(!s)return;s.scale(a,a);const r=i/2,o=i/2,n=i/2;for(let l=0;l<360;l++){const e=(l-1)*Math.PI/180,t=(l+1)*Math.PI/180,i=s.createRadialGradient(r,o,0,r,o,n),[a,c,d]=Se(l,1);i.addColorStop(0,"#ffffff"),i.addColorStop(1,`rgb(${a},${c},${d})`),s.beginPath(),s.moveTo(r,o),s.arc(r,o,n,e,t),s.closePath(),s.fillStyle=i,s.fill()}}(e),e.dataset.drawnFor=this._colorPickerEntity)}}_getLights(){if(!this.hass)return[];const e=this._getLightIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._lightsFingerprint&&this._cachedLightsResult)return this._cachedLightsResult;let i;return this._lightsFingerprint=t,i=this._isDashboardMode?e.map(e=>this.hass?.states[e]).filter(e=>!!e&&"on"===e.state&&Ne(e.entity_id,this._schedules)).sort((e,t)=>{const i=e.attributes.friendly_name||e.entity_id,a=t.attributes.friendly_name||t.entity_id;return i.localeCompare(a)}):e.map(e=>this.hass?.states[e]).filter(e=>void 0!==e),this._cachedLightsResult=i,i}_getLightIds(){return this._cachedLightIds||(this._cachedLightIds=this._computeLightIds()),this._cachedLightIds}_computeLightIds(){if(!this.hass)return[];const e=this.areaId||this._config?.area;if(e){const t=this._config?.hidden_entities??[],i=this._roomConfig?.hidden_entities??[],a=new Set([...t,...i]),s=Ve(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light.")&&!a.has(e.entity_id)&&Ne(e.entity_id,this._schedules)).map(e=>e.entity_id),r=this._config?.entity_order??[],o=r.length>0?r:this._roomConfig?.entity_order??[];if(o.length>0){const e=new Map;o.forEach((t,i)=>e.set(t,i)),s.sort((t,i)=>{const a=e.get(t),s=e.get(i);return void 0!==a&&void 0!==s?a-s:void 0!==a?-1:void 0!==s?1:0})}return s}if(this._config?.entity)return Ne(this._config.entity,this._schedules)&&this.hass.states[this._config.entity]?[this._config.entity]:[];if(this._isDashboardMode){const e=this.visibleAreaIds;if(!e||0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of Ve(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getDashboardLightTotal(){if(!this.hass||!this.hass.entities||!this.hass.devices)return 0;if(void 0!==this._dashboardTotalCache&&this._dashboardTotalEntitiesRef===this.hass.entities)return this._dashboardTotalCache;const e=this.visibleAreaIds;if(!e||0===e.length)return 0;const t=new Set;for(const i of e)for(const e of Ve(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.add(e.entity_id);return this._dashboardTotalEntitiesRef=this.hass.entities,this._dashboardTotalCache=t.size,t.size}_getLightInfos(){return this._getLights().map(e=>this._buildLightInfo(e))}_buildLightInfo(e){const t="on"===e.state,i=function(e){const t=e.attributes.supported_color_modes;return t&&0!==t.length?t.some(e=>["hs","rgb","rgbw","rgbww","xy"].includes(e))?"rgb":t.includes("color_temp")?"color_temp":t.includes("brightness")?"dimmable":"simple":void 0!==e.attributes.brightness?"dimmable":"simple"}(e),a=e.attributes.brightness,s=t&&void 0!==a?Math.round(a/255*100):0;let r=null;const o=e.attributes.min_color_temp_kelvin||2e3,n=e.attributes.max_color_temp_kelvin||6500;t&&"color_temp"===i&&(r=e.attributes.color_temp_kelvin||null);let l=null;t&&"rgb"===i&&(l=e.attributes.rgb_color||null);const c=this.hass?.entities[e.entity_id]?.icon,d=e.attributes.icon,h=c||d||"mdi:lightbulb";return{entity:e,entityId:e.entity_id,name:e.attributes.friendly_name||e.entity_id,icon:h,isOn:t,type:i,brightnessPct:s,colorTempKelvin:r,minKelvin:o,maxKelvin:n,rgbColor:l}}_toggleLight(e){this.hass?.callService("light","toggle",{},{entity_id:e})}_toggleAll(){const e=this._getLights(),t=e.some(e=>"on"===e.state),i=t?"turn_off":"turn_on",a=e.map(e=>e.entity_id);this.hass?.callService("light",i,{},{entity_id:a}),t&&(this._expandedEntity=null)}_turnAllOff(){const e=this._getLights().map(e=>e.entity_id);this.hass?.callService("light","turn_off",{},{entity_id:e}),this._expandedEntity=null}_hasControls(e){if("simple"!==e.type)return!0;const t=e.entity.attributes.effect_list;if(t&&t.length>0){const e=t.map(e=>e.toLowerCase());if(tt.filter(t=>"off"===t||e.includes(t)).length>1)return!0}return!1}_toggleExpand(e,t,i){i||(i=this._getLightInfos().find(t=>t.entityId===e)),!i||this._hasControls(i)?t&&(this._expandedEntity===e?this._expandedEntity=null:this._expandedEntity=e):this._toggleLight(e)}_onSliderInput(e,t,i){const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a;const s=this._throttleTimers.get(e);void 0!==s&&clearTimeout(s),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),i(this._dragValues.get(e)??t)},100))}_onSliderChange(e,t,i){const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a,i(t);const s=this._throttleTimers.get(e);void 0!==s&&clearTimeout(s),this._throttleTimers.delete(e)}_setBrightness(e,t){this.hass?.callService("light","turn_on",{brightness_pct:t},{entity_id:e})}_setColorTemp(e,t){this.hass?.callService("light","turn_on",{color_temp_kelvin:t},{entity_id:e})}_setHsColor(e,t,i){this.hass?.callService("light","turn_on",{hs_color:[t,100*i]},{entity_id:e})}_setEffect(e,t){"off"===t?this.hass?.callService("light","turn_on",{},{entity_id:e}):this.hass?.callService("light","turn_on",{effect:t},{entity_id:e})}_openColorPicker(e,t){this._colorPickerEntity=e,this._colorPickerRgb=t??[255,255,255],this._colorPickerPos=t?function(e){const{h:t,s:i}=Ie(e),a=Math.min(i,1),s=t*Math.PI/180;return{x:Math.cos(s)*a*50+50,y:Math.sin(s)*a*50+50}}(t):null,this._colorPickerHs=t?Ie(t):null}_closeColorPicker(){this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null}_onWheelInteraction(e){const t=this._wheelCanvas;if(!t)return;const i=function(e,t,i){const a=e.getBoundingClientRect(),s=t-a.left-a.width/2,r=i-a.top-a.height/2,o=a.width/2,n=Math.sqrt(s*s+r*r),l=Math.min(n,o),c=(180*Math.atan2(r,s)/Math.PI%360+360)%360,d=l/o,h=Se(c,d),p=n>0?l/n:1;return{rgb:h,hex:Te(h),hs:{h:c,s:d},pos:{x:s*p/o*50+50,y:r*p/o*50+50}}}(t,"touches"in e?e.touches[0].clientX:e.clientX,"touches"in e?e.touches[0].clientY:e.clientY);if(this._colorPickerPos=i.pos,this._colorPickerRgb=i.rgb,this._colorPickerHs=i.hs,this._colorPickerEntity){const e=`cp:${this._colorPickerEntity}`,t=this._throttleTimers.get(e);void 0!==t&&clearTimeout(t),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},150))}}_getEntityLayout(e){const t=this._config?.entity_layouts??{},i=this._roomConfig?.entity_layouts??{};return"full"===(t[e]||i[e])?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_buildLayout(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const s=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;s?(t.push({kind:"compact-pair",left:a,right:s}),i+=2):(t.push({kind:"full",light:a}),i++)}else t.push({kind:"full",light:a}),i++}return t}_computeTint(e){const t=e.filter(e=>e.isOn);if(0===t.length)return null;const i=t.length/e.length;let a="#fbbf24";const s=t.find(e=>"rgb"===e.type&&e.rgbColor);return s?.rgbColor&&(a=Te(s.rgbColor)),{background:`radial-gradient(ellipse at 30% 30%, ${a}, transparent 70%)`,opacity:(.18*i).toFixed(3)}}_renderSubText(e){if(!e.isOn)return K`<span class="light-brightness-text">${je("common.off")}</span>`;if("simple"===e.type)return K`<span class="light-brightness-text">${je("common.on")}</span>`;const t=[K`<span class="light-brightness-text">${e.brightnessPct}%</span>`];if("color_temp"===e.type&&e.colorTempKelvin){const i=Je(e.colorTempKelvin);t.push(K`<span class="light-temp-dot" style="background:${i.color}"></span>`),t.push(K`<span class="light-temp-text">${i.label}</span>`)}if("rgb"===e.type&&e.rgbColor){const i=Te(e.rgbColor);t.push(K`<span class="light-temp-dot" style="background:${i}"></span>`),t.push(K`<span class="light-temp-text">${je("light.color")}</span>`)}return t}_renderLightRow(e,t,i){const a=["light-row",t?"compact":"",i?"compact-right":""].filter(Boolean).join(" "),s=e.isOn&&"rgb"===e.type&&e.rgbColor?`--light-rgb:${Te(e.rgbColor)};--light-rgb-bg:${Ze(e.rgbColor,.1)};--light-rgb-border:${Ze(e.rgbColor,.15)};--light-rgb-glow:${Ze(e.rgbColor,.4)};--light-rgb-sub:${Ze(e.rgbColor,.55)}`:"",r=["light-icon-btn",e.isOn?"on":"",e.isOn&&e.rgbColor?"rgb":""].filter(Boolean).join(" ");return K`
      <div
        class=${a}
        data-on=${e.isOn}
        style=${s}
        ?data-rgb=${e.isOn&&"rgb"===e.type&&!!e.rgbColor}
      >
        <button
          class=${r}
          style=${s}
          @click=${()=>this._toggleLight(e.entityId)}
          aria-label="${je("light.toggle_aria",{name:e.name})}"
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
        <button
          class="light-expand-btn"
          @click=${()=>this._toggleExpand(e.entityId,e.isOn,e)}
          aria-label="${e.isOn?je("light.expand_aria",{name:e.name}):e.name}"
          aria-expanded=${e.isOn?this._expandedEntity===e.entityId?"true":"false":Q}
        >
          <div class="light-info">
            <div class="light-name">${me(e.name,t?12:fe)}</div>
            <div class="light-sub">${this._renderSubText(e)}</div>
          </div>
          <span class="light-dot"></span>
        </button>
      </div>
    `}_getBrightnessFill(e){if("rgb"===e.type&&e.rgbColor){const[t,i,a]=e.rgbColor;return{fillClass:"dynamic",fillStyle:`--slider-fill-start:rgba(${t},${i},${a},0.15);--slider-fill-end:rgba(${t},${i},${a},0.35)`}}if("color_temp"===e.type&&e.colorTempKelvin){const t=Je(e.colorTempKelvin).color,i=parseInt(t.slice(1,3),16),a=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);return{fillClass:"dynamic",fillStyle:`--slider-fill-start:rgba(${i},${a},${s},0.15);--slider-fill-end:rgba(${i},${a},${s},0.35)`}}return{fillClass:"warm",fillStyle:""}}_getFoldColor(e){if(e.rgbColor)return`rgba(${e.rgbColor[0]},${e.rgbColor[1]},${e.rgbColor[2]},0.3)`;if("color_temp"===e.type&&e.colorTempKelvin){const{color:t}=Je(e.colorTempKelvin);return`rgba(${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)},0.3)`}return"rgba(251,191,36,0.25)"}_renderControlFold(e,t=!1){const i=this._expandedEntity===e.entityId&&e.isOn,a="rgb"===e.type,{fillClass:s,fillStyle:r}=this._getBrightnessFill(e),o=this._getFoldColor(e);return K`
      <div class="fold-sep ${i?"visible":""}" style="--fold-color:${o}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${a}>
            <span class="ctrl-label">${e.name}</span>

            ${"simple"!==e.type?this._renderSlider(`bri:${e.entityId}`,s,e.brightnessPct,"mdi:brightness-6",je("light.intensity"),e=>`${e}%`,1,100,t=>this._setBrightness(e.entityId,t),r):Q}
            ${"color_temp"===e.type?this._renderTempSlider(e):Q}
            ${"rgb"===e.type?this._renderColorRow(e):Q}
            ${this._renderEffectChips(e)}
          </div>
        </div>
      </div>
      ${t?Q:K`<div class="fold-sep ${i?"visible":""}" style="--fold-color:${o}"></div>`}
    `}_renderColorRow(e){return K`
      <div class="color-row">
        ${et.map(t=>{const i=!!e.rgbColor&&function(e,t){const i=Ie(e),a=Ie(t),s=Math.abs(i.h-a.h);return(s<5||s>355)&&Math.abs(i.s-a.s)<.08}(e.rgbColor,t);return K`
            <button
              class="cdot ${i?"active":""}"
              style="--cdot-color:${Te(t)}"
              @click=${()=>{const i=Ie(t);this._setHsColor(e.entityId,i.h,i.s)}}
              aria-label="${je("light.color_aria",{hex:Te(t)})}"
            ></button>
          `})}
        <button
          class="color-picker-btn"
          @click=${()=>this._openColorPicker(e.entityId,e.rgbColor)}
          aria-label="${je("light.color_picker_aria")}"
        ></button>
      </div>
    `}_renderEffectChips(e){const t=e.entity.attributes.effect_list;if(!t||0===t.length)return Q;const i=tt.filter(e=>"off"===e||t.includes(e));if(i.length<=1)return Q;const a=e.entity.attributes.effect?.toLowerCase();return K`
      <div class="color-row" style="flex-wrap:wrap">
        ${i.map(t=>K`
            <button
              class="cdot effect-chip ${a===t||!a&&"off"===t?"active":""}"
              @click=${()=>this._setEffect(e.entityId,t)}
              aria-label="${je(`light.effect_${t}`)}"
              style="width:auto;height:auto;border-radius:var(--radius-md);padding:4px 8px;font-size:9px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:var(--t3);border:1px solid var(--b2);background:var(--s1)"
            >${je(`light.effect_${t}`)}</button>
          `)}
      </div>
    `}_renderColorPicker(){if(!this._colorPickerEntity||!this._colorPickerRgb)return Q;const e=Te(this._colorPickerRgb);return K`
      <div class="color-picker-overlay" @click=${e=>{e.target.classList.contains("color-picker-overlay")&&this._closeColorPicker()}}>
        <div class="color-picker-dialog">
          <span class="cp-title">${je("light.color_picker_title")}</span>
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
            ${je("common.close")}
          </button>
        </div>
      </div>
    `}_renderSlider(e,t,i,a,s,r,o,n,l,c=""){const d=this._dragValues.get(e)??i,h=(d-o)/(n-o)*100;return K`
      <div class="slider">
        <div class="slider-fill ${t}" style=${c?`width:${h}%;${c}`:`width:${h}%`}></div>
        <div class="slider-thumb" style="left:${h}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${a}></ha-icon>
          ${s}
        </div>
        <div class="slider-val">${r(d)}</div>
        <input
          type="range"
          class="slider-native"
          min=${o}
          max=${n}
          .value=${String(d)}
          aria-label=${s}
          @input=${t=>{const i=Number(t.target.value);this._onSliderInput(e,i,l)}}
          @change=${t=>{const i=Number(t.target.value);this._onSliderChange(e,i,l)}}
        />
      </div>
    `}_renderTempSlider(e){const t=e.colorTempKelvin||e.minKelvin,i=`temp:${e.entityId}`,a=this._dragValues.get(i)??t,s=Math.min(Math.max((a-e.minKelvin)/(e.maxKelvin-e.minKelvin)*100,2),98);return K`
      <div class="slider">
        <div class="slider-fill temp-gradient"></div>
        <div class="slider-thumb" style="left:${s}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${"mdi:thermometer"}></ha-icon>
          ${je("light.temperature")}
        </div>
        <div class="slider-val">${a}K</div>
        <input
          type="range"
          class="slider-native"
          min=${e.minKelvin}
          max=${e.maxKelvin}
          .value=${String(a)}
          aria-label="${je("light.color_temp_label")}"
          @input=${t=>{const a=Number(t.target.value);this._onSliderInput(i,a,t=>this._setColorTemp(e.entityId,t))}}
          @change=${t=>{const a=Number(t.target.value);this._onSliderChange(i,a,t=>this._setColorTemp(e.entityId,t))}}
        />
      </div>
    `}_renderGrid(e){const t=this._buildLayout(e),i=[];for(let a=0;a<t.length;a++){const e=t[a],s=a===t.length-1;"full"===e.kind?(i.push(this._renderLightRow(e.light,!1,!1)),i.push(this._renderControlFold(e.light,s))):(i.push(this._renderLightRow(e.left,!0,!1)),e.right&&i.push(this._renderLightRow(e.right,!0,!0)),i.push(this._renderControlFold(e.left,s)),e.right&&i.push(this._renderControlFold(e.right,s)))}return i}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],s=i+1<e.length?e[i+1]:null;if(s){const r=i+2>=e.length;t.push(K`
          ${this._renderLightRow(a,!0,!1)}
          ${this._renderLightRow(s,!0,!0)}
          ${this._renderControlFold(a,r)}
          ${this._renderControlFold(s,r)}
        `),i+=2}else t.push(K`
          ${this._renderLightRow(a,!1,!1)}
          ${this._renderControlFold(a,!0)}
        `),i++}return t}_renderDashboard(){const e=this._getLightInfos();if(0===e.length)return Q;const t=e.slice(0,6),i=e.length-6,a=this._computeTint(e),s=e.length,r=Math.max(this._getDashboardLightTotal(),s),o=s===r?"all":"some";return K`
      ${this._showHeader?K`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${je("light.dashboard_title")}</span>
            <span class="card-count ${o}">${s}/${r}</span>
          </div>
          <button
            class="toggle-all on"
            role="switch"
            aria-checked="true"
            @click=${()=>this._turnAllOff()}
            aria-label="${je("light.dashboard_turn_all_off_aria")}"
          ></button>
        </div>
      `:Q}

      <div class="card glass">
        <div
          class="tint"
          style=${a?`background:${a.background};opacity:${a.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(t)}
          </div>
          ${i>0?K`<div class="dashboard-overflow">
                ${je("light.dashboard_overflow",{count:String(i)})}
              </div>`:Q}
        </div>
      </div>
      ${this._renderColorPicker()}
    `}render(){if(this._lang,this._isDashboardMode){const e=this._renderDashboard();return this.style.display=e===Q?"none":"",e}const e=this._getLightInfos();if(0===e.length)return this.style.display="none",Q;this.style.display="";const t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,s=0===t?"none":t===i?"all":"some",r=this._computeTint(e);return K`
      ${this._showHeader?K`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${je("light.title")}</span>
            <span class="card-count ${s}">${t}/${i}</span>
          </div>
          <button
            class="toggle-all ${a?"on":""}"
            @click=${()=>this._toggleAll()}
            role="switch"
            aria-checked=${a?"true":"false"}
            aria-label="${je(a?"light.toggle_all_on_aria":"light.toggle_all_off_aria")}"
          ></button>
        </div>
      `:Q}

      <div class="card glass">
        <div
          class="tint"
          style=${r?`background:${r.background};opacity:${r.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">${this._renderGrid(e)}</div>
        </div>
      </div>
      ${this._renderColorPicker()}
    `}}Qe([Ae({attribute:!1})],it.prototype,"areaId"),Qe([Ae({attribute:!1})],it.prototype,"visibleAreaIds"),Qe([Le()],it.prototype,"_expandedEntity"),Qe([Le()],it.prototype,"_dragValues"),Qe([Le()],it.prototype,"_colorPickerEntity"),Qe([Le()],it.prototype,"_colorPickerRgb"),Qe([Le()],it.prototype,"_colorPickerPos"),Qe([Le()],it.prototype,"_showHeader");try{customElements.define("glass-light-card",it)}catch{}var at=Object.defineProperty,st=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&at(t,i,r),r};const rt=class t extends he{constructor(){super(...arguments),this._lang=De(),this._areaId=null,this._open=!1,this._scenesOpen=!1,this._activeSceneId=null,this._peekedRooms=new Set,this._boundKeydown=this._onKeydown.bind(this),this._roomConfigs=new Map,this._loadingRooms=new Set,this._busCleanups=[],this._swipeClass="",this._swipeAnimating=!1}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;if(this._swipeAnimating)return!1;if(!this._open)return!1;const t=e.get("hass");if(!t||!this.hass||!this._areaId)return!0;const i=Ve(this._areaId,this.hass.entities,this.hass.devices),a=this.hass;return i.some(e=>t.states[e.entity_id]!==a.states[e.entity_id])}static{this.styles=[ue,_e,ve,c`
      :host {
        display: block;
        pointer-events: none;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .overlay {
        position: fixed;
        inset: 0;
        z-index: 9995;
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
        z-index: 9999;
        transform: translateX(-50%) scale(0.3);
        transform-origin: center bottom;
        width: calc(100vw - 16px);
        max-width: 500px;
        min-height: calc(100vh - 120px);
        max-height: calc(100vh - 120px);
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        opacity: 0;
        pointer-events: none;
        transition:
          transform 0.45s var(--ease-out),
          opacity 0.3s var(--ease-std);
        padding: 16px;
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
        gap: 12px;
        margin-bottom: 0;
      }
      .header-sep {
        height: 1px; margin: 8px 12px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .header-icon {
        width: 40px;
        height: 40px;
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
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
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
        width: 16px;
        height: 3px;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 6px;
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
      .sensor-warn {
        color: var(--c-warning, #f59e0b);
        font-size: 10px;
        font-style: italic;
      }
      .close-btn {
        background: transparent;
        border: 1px solid var(--b1);
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
        gap: 6px;
        padding: 0 0 12px;
      }
      .scene-chip {
        background: rgba(255, 255, 255, 0.04);
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
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.18);
        color: var(--t1);
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

    `]}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigs.clear(),this._loadingRooms.clear()),this.hass.language&&Re(this.hass.language)&&(this._lang=De()))}_listen(t,i){this._busCleanups.push(e.on(t,i))}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._listen("popup-open",e=>this._handleOpen(e)),this._listen("popup-close",()=>this._handleClose()),this._listen("room-config-changed",e=>{void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._roomConfigs.delete(e.areaId),this._peekedRooms.delete(e.areaId),this._areaId===e.areaId&&this._loadRoomConfig(e.areaId)}),this._listen("navbar-config-changed",()=>{void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._roomConfigs.clear(),this._loadingRooms.clear(),this._areaId&&this._loadRoomConfig(this._areaId)}),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._peekedRooms.clear(),this._loadingRooms.clear(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],this._backend=void 0,void 0!==this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=void 0),this._swipeAnimating=!1,this._swipeClass="",this._pendingSwipe=void 0,this._currentRoomIndex=void 0,document.removeEventListener("keydown",this._boundKeydown)}_collapseExpanded(){this._scenesOpen&&(this._scenesOpen=!1)}_handleOpen(e){if(this._open&&this._areaId&&this._areaId!==e.areaId&&void 0!==e.roomIndex&&void 0!==this._currentRoomIndex){if(this._swipeAnimating)return void(this._pendingSwipe=e);const t=e.roomIndex>this._currentRoomIndex?"left":"right";return this._swipeAnimating=!0,this._swipeClass="left"===t?"swipe-exit-left":"swipe-exit-right",void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void(this._swipeAnimTimer=setTimeout(()=>{this._swipeAnimTimer=void 0,this._areaId=e.areaId,this._currentRoomIndex=e.roomIndex,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(e.areaId),requestAnimationFrame(()=>requestAnimationFrame(()=>{this._swipeClass="left"===t?"swipe-enter-right":"swipe-enter-left",this._swipeAnimTimer=setTimeout(()=>{if(this._swipeAnimTimer=void 0,this._swipeClass="",this._swipeAnimating=!1,this._pendingSwipe){const e=this._pendingSwipe;this._pendingSwipe=void 0,this._handleOpen(e)}},220)}))},180))}this._swipeAnimating?this._pendingSwipe=e:(this._currentRoomIndex=e.roomIndex,void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),this._areaId=e.areaId,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(e.areaId),this._pendingRaf=requestAnimationFrame(()=>{this._pendingRaf=void 0,this._open=!0,this.setAttribute("open","")}))}_maybePeekScenes(e){if(this._peekedRooms.has(e))return;const t=this._getAreaMeta();t&&0!==t.scenes.length&&(this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&this._areaId===e&&(this._peekedRooms.add(e),this._scenesOpen=!0,this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&(this._scenesOpen=!1)},1e3))},400))}_handleClose(){void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=void 0),this._swipeAnimating=!1,this._swipeClass="",this._pendingSwipe=void 0,this._currentRoomIndex=void 0,this._open=!1,this.removeAttribute("open"),this._closeTimeout=setTimeout(()=>{this._areaId=null,this._closeTimeout=void 0},350)}_onKeydown(t){"Escape"===t.key&&this._open&&e.emit("popup-close",void 0)}async _loadRoomConfig(e){if(this.hass)if(this._roomConfigs.has(e))this._open&&this._areaId===e&&this._maybePeekScenes(e);else if(!this._loadingRooms.has(e)){this._loadingRooms.add(e);try{this._backend||(this._backend=new Ue(this.hass));const t=await this._backend.send("get_room",{area_id:e});this._roomConfigs.set(e,t),this._areaId===e&&this.requestUpdate()}catch{this._roomConfigs.set(e,null)}finally{this._loadingRooms.delete(e)}this._open&&this._areaId===e&&this._maybePeekScenes(e)}}_onOverlayClick(){e.emit("popup-close",void 0)}_getAreaMeta(){if(!this.hass||!this._areaId)return null;const e=this.hass.areas[this._areaId];if(!e)return null;const t=Ve(this._areaId,this.hass.entities,this.hass.devices);let i=null,a=null,s=!1,r=!1,o=!1;const n=[],l=new Set;for(const _ of t){const e=this.hass?.states[_.entity_id];if(!e)continue;const t=_.entity_id.split(".")[0];if(l.add(t),"light"===t&&"on"===e.state&&(r=!0),"media_player"===t&&"playing"===e.state&&(o=!0),"sensor"===t){const t=e.attributes.device_class,r="unavailable"===e.state||"unknown"===e.state;"temperature"!==t&&"humidity"!==t||!r||(s=!0),r||("temperature"!==t||i||(i=`${e.state}${e.attributes.unit_of_measurement||"°C"}`),"humidity"!==t||a||(a=`${e.state}%`))}"scene"===t&&n.push(e)}const c=this._roomConfigs.get(this._areaId),d=c?.icon??e.icon??"mdi:home",h=new Set(c?.hidden_scenes??[]),p=n.filter(e=>!h.has(e.entity_id)),u=c?.scene_order;if(u&&u.length>0){const e=new Map(u.map((e,t)=>[e,t]));p.sort((t,i)=>(e.get(t.entity_id)??1/0)-(e.get(i.entity_id)??1/0))}return{name:e.name,icon:d,temperature:i,humidity:a,sensorUnavailable:s,hasLight:r,hasMusic:o,scenes:p,domains:[...l]}}_activateScene(e){this._activeSceneId=e,this.hass?.callService("scene","turn_on",{},{entity_id:e})}static{this.DEFAULT_CARD_ORDER=["light","media_player","climate","fan","cover","camera","vacuum"]}_getVisibleCards(e){const i=this._areaId?this._roomConfigs.get(this._areaId):void 0,a=i?.card_order;return a&&a.length>0?a.filter(t=>e.includes(t)):t.DEFAULT_CARD_ORDER.filter(t=>e.includes(t))}_renderDomainCard(e){switch(e){case"light":return K`<glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>`;case"cover":return K`<glass-cover-card .hass=${this.hass} .areaId=${this._areaId}></glass-cover-card>`;case"media_player":return K`<glass-media-card .hass=${this.hass} .areaId=${this._areaId}></glass-media-card>`;case"fan":return K`<glass-fan-card .hass=${this.hass} .areaId=${this._areaId}></glass-fan-card>`;case"camera":return K`<glass-camera-carousel-card .hass=${this.hass} .areaId=${this._areaId}></glass-camera-carousel-card>`;default:return Q}}render(){if(this._lang,!this._areaId)return Q;const t=this._getAreaMeta();if(!t)return Q;const i=t.scenes.length>0,a=this._getVisibleCards(t.domains);return K`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${t.name}>
        <div class="dialog-inner ${this._swipeClass}">
        <div class="header">
          <div class="header-left">
            <button
              class="header-icon ${t.hasLight?"has-light":""} ${t.hasMusic?"has-music":""}"
              @click=${()=>i&&(this._scenesOpen=!this._scenesOpen)}
              aria-label=${i?je("popup.toggle_scenes_aria"):t.name}
              aria-expanded=${i?this._scenesOpen?"true":"false":Q}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
            </button>
            <div class="scene-dash ${i?"visible":""}"></div>
          </div>
          <div class="header-info">
            <div class="header-name">${t.name}</div>
            <div class="header-meta">
              ${t.temperature?K`<span>${t.temperature}</span>`:Q}
              ${t.humidity?K`<span>${t.humidity}</span>`:Q}
              ${!t.sensorUnavailable||t.temperature||t.humidity?Q:K`<span class="sensor-warn">${je("popup.sensor_unavailable")}</span>`}
            </div>
          </div>
          <button
            class="close-btn"
            @click=${()=>e.emit("popup-close",void 0)}
            aria-label="${je("popup.close_aria")}"
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        </div>
        <div class="header-sep"></div>

        ${i?K`
              <div class="scenes-wrapper ${this._scenesOpen?"open":""}">
                <div class="scenes-inner">
                  <div class="scene-chips">
                    ${t.scenes.map(e=>K`
                        <button
                          class="scene-chip ${this._activeSceneId===e.entity_id?"active":""}"
                          @click=${()=>this._activateScene(e.entity_id)}
                          aria-label="${je("popup.activate_scene_aria",{name:e.attributes.friendly_name||e.entity_id})}"
                        >
                          ${e.attributes.friendly_name||e.entity_id}
                        </button>
                      `)}
                  </div>
                </div>
              </div>
            `:Q}

        <div class="cards">
          ${a.map(e=>this._renderDomainCard(e))}
        </div>
        </div>
      </div>
    `}};st([Ae({attribute:!1})],rt.prototype,"hass"),st([Le()],rt.prototype,"_lang"),st([Le()],rt.prototype,"_areaId"),st([Le()],rt.prototype,"_open"),st([Le()],rt.prototype,"_scenesOpen"),st([Le()],rt.prototype,"_activeSceneId"),st([Le()],rt.prototype,"_swipeClass");let ot=rt;try{customElements.define("glass-room-popup",ot)}catch{}var nt=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,ct=(e,t,i,a)=>{for(var s,r=a>1?void 0:a?lt(t,i):t,o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a?s(t,i,r):s(r))||r);return a&&r&&nt(t,i,r),r};class dt extends he{constructor(){super(...arguments),this._lang=De()}set hass(e){this._hass=e,e?.language&&Re(e.language)&&(this._lang=De())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[ue,c`
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
    `]}render(){return this._lang,K`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${je("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${je("editor.open_config")}</a>
        </p>
      </div>
    `}}ct([Ae({attribute:!1})],dt.prototype,"hass",1),ct([Le()],dt.prototype,"_lang",2);try{customElements.define("glass-navbar-card-editor",dt)}catch{}var ht=Object.defineProperty,pt=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&ht(t,i,r),r};const ut={weather:"glass-weather-card",light:"glass-light-card",cover:"glass-cover-card",fan:"glass-fan-card",title:"glass-title-card",spotify:"glass-spotify-card",media:"glass-media-card",presence:"glass-presence-card",camera_carousel:"glass-camera-carousel-card"},_t=["title","weather","light","media","fan","cover","spotify","presence","camera_carousel"];class gt extends He{constructor(){super(...arguments),this._items=[],this._activeArea=null,this._scrollMask="none",this._popup=null,this._ownsPopup=!1,this._areaStructure=[],this._lastAreaKeys="",this._cachedEntityFingerprint="",this._boundUpdateMask=this._updateNavMask.bind(this),this._scrollEl=null,this._navbarConfig=null,this._configLoaded=!1,this._configLoading=!1,this._dashboardLoading=!1,this._roomConfigs={},this._flipPositions=new Map,this._litTimestamps=new Map,this._configReady=!1,this._lastAmbientPeriod=null,this._editMode=!1,this._enabledCards=["weather"],this._cardOrder=_t,this._dashboardCards=new Map,this._hideHeader=!1,this._hideSidebar=!1,this._headerStyleEl=null,this._sidebarStyleEl=null,this._loadingOverlay=null,this._bgIsLight=!1,this._bgIntersectingCards=new Set}static getConfigElement(){return document.createElement("glass-navbar-card-editor")}static{this.styles=[ue,_e,ve,c`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 6px 0 80px; /* top + space for fixed navbar */
        box-sizing: border-box;
      }

      .dashboard-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 0 12px 45px;
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
        z-index: 9997;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .nav-scroll {
        display: flex;
        align-items: center;
        gap: 4px;
        overflow-x: auto;
        scrollbar-width: none;
        flex: 1;
        padding-block: 8px;
      }
      .nav-scroll::before,
      .nav-scroll::after {
        content: '';
        flex: 1 0 8px;
      }
      .nav-scroll::-webkit-scrollbar {
        display: none;
      }

      /* Adaptive inactive icon color based on background luminance */
      .navbar { --nav-inactive: rgba(255,255,255,0.45); }
      .navbar.bg-light { --nav-inactive: rgba(0,0,0,0.45); }

      .nav-item {
        background: transparent;
        border: none;
        border-radius: 14px;
        min-width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        cursor: pointer;
        position: relative;
        color: rgba(255,255,255,0.45);
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          background var(--t-fast),
          color 0.6s ease;
      }
      .navbar.bg-light .nav-item {
        color: rgba(0,0,0,0.45);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-item:hover {
          background: var(--s2);
        }
      }
      @media (hover: none) {
        .nav-item:active {
          animation: bounce 0.3s ease;
        }
      }
      .nav-item.active {
        background: rgba(255, 255, 255, 0.1);
        color: var(--t1);
      }
      .navbar.bg-light .nav-item.active {
        background: rgba(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.85);
      }

      .nav-item ha-icon {
        --mdc-icon-size: 22px;
        flex-shrink: 0;
        transition: color 0.6s ease;
        display: flex; align-items: center; justify-content: center;
      }

      /* 1. Pulse-light: oscillating glow on lights-on icons */
      .nav-item.has-light .nav-content > ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%,
        100% {
          filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        }
        50% {
          filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.2));
        }
      }

      .nav-content {
        position: relative;
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
      .nav-item.active .nav-content {
        gap: 6px;
      }

      /* 2. Humidity bar centered on nav-content (icon + label, excludes badge) */
      .humidity-bar {
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 14px;
        height: 3px;
        border-radius: 2px;
        background: var(--c-temp-cold);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
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
        top: 2px;
        right: 4px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .nav-temp-badge ha-icon {
        --mdc-icon-size: 10px;
      }
      .nav-item.has-temp-hot .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(248, 113, 113, 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .nav-item.has-temp-cold .nav-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.6));
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
          filter: drop-shadow(0 0 6px rgba(248, 113, 113, 0.6));
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
          filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.6));
        }
      }

      /* 5. Dynamic scroll masking */
      .nav-scroll.mask-right {
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 20px), transparent 100%);
        mask-image: linear-gradient(to right, black calc(100% - 20px), transparent 100%);
      }
      .nav-scroll.mask-left {
        -webkit-mask-image: linear-gradient(to left, black calc(100% - 20px), transparent 100%);
        mask-image: linear-gradient(to left, black calc(100% - 20px), transparent 100%);
      }
      .nav-scroll.mask-both {
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 20px,
          black calc(100% - 20px),
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 20px,
          black calc(100% - 20px),
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
        --mdc-icon-size: 20px;
        color: rgba(255,255,255,0.45);
        opacity: 0.65;
        transition: color 0.6s ease, opacity var(--t-fast);
        display: flex; align-items: center; justify-content: center;
      }
      .navbar.bg-light .nav-settings ha-icon {
        color: rgba(0,0,0,0.45);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-settings:hover ha-icon {
          color: var(--t2);
        }
        .nav-settings:active ha-icon {
          color: var(--t1);
        }
      }
      @media (hover: none) {
        .nav-settings:active {
          animation: bounce 0.3s ease;
        }
      }
    `]}connectedCallback(){super.connectedCallback();const e=document.querySelector("glass-room-popup");e?(this._popup=e,this._ownsPopup=!1):(this._popup=document.createElement("glass-room-popup"),document.body.appendChild(this._popup),this._ownsPopup=!0),this._listen("popup-close",()=>{this._activeArea=null}),this._listen("navbar-config-changed",()=>{this._loadBackendConfig()}),this._listen("dashboard-config-changed",()=>{this._loadDashboardConfig()}),this._listen("location-changed",()=>{this._loadDashboardConfig()}),this._editMode=this._detectEditMode()}disconnectedCallback(){super.disconnectedCallback(),this._ownsPopup&&this._popup?.remove(),this._popup=null,this._ownsPopup=!1,this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null);for(const e of this._dashboardCards.values())e.remove();this._dashboardCards.clear(),this._removeHeaderStyle(),this._removeSidebarStyle(),this._loadingOverlay&&(this._loadingOverlay.remove(),this._loadingOverlay=null),this._removeOverlayTimer&&(clearTimeout(this._removeOverlayTimer),this._removeOverlayTimer=void 0),this._headerRetryTimer&&(clearTimeout(this._headerRetryTimer),this._headerRetryTimer=void 0),this._sidebarRetryTimer&&(clearTimeout(this._sidebarRetryTimer),this._sidebarRetryTimer=void 0),this._configRetryTimer&&(clearTimeout(this._configRetryTimer),this._configRetryTimer=void 0),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._bgIntersectionObserver?.disconnect(),this._bgIntersectionObserver=void 0,this._bgMutationObserver?.disconnect(),this._bgMutationObserver=void 0,this._bgIntersectingCards.clear()}firstUpdated(e){super.firstUpdated(e),this._attachScrollListener();const t=this.renderRoot.querySelector(".dashboard-cards");t&&(this._bgMutationObserver=new MutationObserver(e=>{e.some(e=>"childList"===e.type)?this._setupBgObserver():this._checkBgLightFromIntersecting()}),this._bgMutationObserver.observe(t,{childList:!0,subtree:!0,attributeFilter:["data-bg-light"]})),this._setupBgObserver()}_setupBgObserver(){this._bgIntersectionObserver?.disconnect(),this._bgIntersectingCards.clear();const e=this.renderRoot.querySelector(".navbar"),t=this.renderRoot.querySelector(".dashboard-cards");if(!e||!t||0===t.children.length)return;const i=e.getBoundingClientRect();if(0===i.height)return void requestAnimationFrame(()=>requestAnimationFrame(()=>this._setupBgObserver()));const a=-i.top,s=-(window.innerHeight-i.bottom);this._bgIntersectionObserver=new IntersectionObserver(e=>{for(const t of e)t.isIntersecting?this._bgIntersectingCards.add(t.target):this._bgIntersectingCards.delete(t.target);this._checkBgLightFromIntersecting()},{root:null,rootMargin:`${a}px 0px ${s}px 0px`,threshold:0});for(const r of t.children)this._bgIntersectionObserver.observe(r)}_checkBgLightFromIntersecting(){let e=!1;for(const t of this._bgIntersectingCards)if("true"===t.dataset.bgLight){e=!0;break}e!==this._bgIsLight&&(this._bgIsLight=e)}_detectEditMode(){let e=this.getRootNode();for(;e instanceof ShadowRoot;){const t=e.host;if("HUI-CARD-OPTIONS"===t.tagName)return!0;if("HUI-DIALOG-EDIT-CARD"===t.tagName)return!0;if("HA-PANEL-LOVELACE"===t.tagName&&t.lovelace?.editMode)return!0;e=t.getRootNode()}return!1}_attachScrollListener(){if(this._scrollEl&&this.renderRoot.contains(this._scrollEl))return;this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null);const e=this.renderRoot.querySelector(".nav-scroll");e&&(e.addEventListener("scroll",this._boundUpdateMask,{passive:!0}),this._scrollEl=e,this._updateNavMask())}setConfig(e){super.setConfig(e)}getCardSize(){return 0}getTrackedEntityIds(){return["sun.sun",...this._items.flatMap(e=>e.entityIds)]}shouldUpdate(e){if(e.has("hass")&&this.hass){this._popup&&(this._popup.hass=this.hass);for(const e of this._dashboardCards.values())e.hass=this.hass}return super.shouldUpdate(e)}updated(e){if(super.updated(e),e.has("hass")&&this.hass){if(this._editMode=this._detectEditMode(),this._editMode)return;this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoading||this._loadBackendConfig(),this._configReady&&(this._rebuildStructure(),this._aggregateState()),this._updateAmbient()}(e.has("_items")||e.has("_enabledCards"))&&this.updateComplete.then(()=>{this._syncDashboardCards(),this._attachScrollListener(),this._updateNavMask(),this._animateFlip(),this._setupBgObserver()})}async _loadBackendConfig(){if(this.hass&&!this._configLoading){this._configLoading=!0;try{this._backend||(this._backend=new Ue(this.hass));const e=await this._backend.send("get_config");this._navbarConfig=e.navbar,this._roomConfigs=e.rooms??{},e.dashboard&&(this._enabledCards=e.dashboard.enabled_cards,this._cardOrder=e.dashboard.card_order??_t,this._hideHeader=e.dashboard.hide_header??!1,this._hideSidebar=e.dashboard.hide_sidebar??!1,this._applyHideHeader(),this._applyHideSidebar()),this._configLoaded=!0,this._configReady=!0,this._lastAreaKeys="",this._rebuildStructure(),this._aggregateState()}catch{return this._configLoading=!1,void(this.isConnected&&(this._showLoadingOverlay(),this._configRetryTimer=setTimeout(()=>{this._configRetryTimer=void 0,this.isConnected&&(this._configLoaded=!1,this._loadBackendConfig())},2e3)))}finally{this._configLoading=!1}this._removeLoadingOverlay()}}async _loadDashboardConfig(){if(this.hass&&!this._dashboardLoading&&!this._configLoading){this._dashboardLoading=!0;try{this._backend||(this._backend=new Ue(this.hass));const e=await this._backend.send("get_config");if(e?.dashboard){this._enabledCards=e.dashboard.enabled_cards,this._cardOrder=e.dashboard.card_order??_t;const t=e.dashboard.hide_header??!1,i=e.dashboard.hide_sidebar??!1;t!==this._hideHeader&&(this._hideHeader=t,this._applyHideHeader()),i!==this._hideSidebar&&(this._hideSidebar=i,this._applyHideSidebar())}}catch{}finally{this._dashboardLoading=!1}}}_applyHideHeader(e=10){this._hideHeader?!this._injectHeaderStyle()&&e>0&&this.isConnected&&(this._headerRetryTimer=setTimeout(()=>this._applyHideHeader(e-1),500)):this._removeHeaderStyle()}_injectHeaderStyle(){if(this._headerStyleEl)return!0;const e=this._findHuiRoot();if(!e)return!1;const t=document.createElement("style");return t.id="glass-cards-hide-header",t.textContent="\n      .header { display: none !important; }\n      #view, hui-view-container {\n        min-height: 100vh !important;\n        padding-top: env(safe-area-inset-top) !important;\n      }\n    ",e.appendChild(t),this._headerStyleEl=t,!0}_removeHeaderStyle(){this._headerStyleEl&&(this._headerStyleEl.remove(),this._headerStyleEl=null)}_applyHideSidebar(e=10){this._hideSidebar?!this._injectSidebarStyle()&&e>0&&this.isConnected&&(this._sidebarRetryTimer=setTimeout(()=>this._applyHideSidebar(e-1),500)):this._removeSidebarStyle()}_injectSidebarStyle(){if(this._sidebarStyleEl)return!0;const e=this._findDrawerShadow();if(!e)return!1;const t=document.createElement("style");return t.id="glass-cards-hide-sidebar",t.textContent="\n      .mdc-drawer { display: none !important; }\n      .mdc-drawer-scrim { display: none !important; }\n      .mdc-drawer-app-content { margin-left: 0 !important; }\n    ",e.appendChild(t),this._sidebarStyleEl=t,!0}_removeSidebarStyle(){this._sidebarStyleEl&&(this._sidebarStyleEl.remove(),this._sidebarStyleEl=null)}_findDrawerShadow(){try{const e=document.querySelector("home-assistant");if(!e?.shadowRoot)return null;const t=e.shadowRoot.querySelector("home-assistant-main");if(!t?.shadowRoot)return null;const i=t.shadowRoot.querySelector("ha-drawer");return i?.shadowRoot?i.shadowRoot:null}catch{return null}}_showLoadingOverlay(){if(this._loadingOverlay)return;const e=document.createElement("div");e.id="glass-cards-loading",e.style.cssText="\n      position: fixed; inset: 0; z-index: 99999;\n      background: var(--primary-background-color, #111);\n      display: flex; align-items: center; justify-content: center;\n      flex-direction: column; gap: 16px;\n      transition: opacity 0.4s ease;\n    ";const t=document.createElement("style");t.textContent="@keyframes gc-spin { to { transform: rotate(360deg); } }",e.appendChild(t);const i=document.createElement("div");i.style.cssText="width:36px;height:36px;border:3px solid rgba(255,255,255,.15);border-top-color:rgba(255,255,255,.7);border-radius:50%;animation:gc-spin .8s linear infinite;",e.appendChild(i);const a=document.createElement("span");a.style.cssText="font:500 13px/1 sans-serif;color:rgba(255,255,255,.5);letter-spacing:1px;text-transform:uppercase;",a.textContent="Glass Cards",e.appendChild(a),document.body.appendChild(e),this._loadingOverlay=e}_removeLoadingOverlay(){if(!this._loadingOverlay)return;const e=this._loadingOverlay;this._loadingOverlay=null,e.style.opacity="0",this._removeOverlayTimer=setTimeout(()=>{e.remove(),this._removeOverlayTimer=void 0},400)}_findHuiRoot(){try{const e=document.querySelector("home-assistant");if(!e?.shadowRoot)return null;const t=e.shadowRoot.querySelector("home-assistant-main");if(!t?.shadowRoot)return null;const i=t.shadowRoot.querySelector("ha-drawer");if(!i)return null;const a=i.querySelector("partial-panel-resolver");if(!a)return null;const s=a.querySelector("ha-panel-lovelace");if(!s?.shadowRoot)return null;const r=s.shadowRoot.querySelector("hui-root");return r?.shadowRoot?r.shadowRoot:null}catch{return null}}_getOrCreateCard(e){let t=this._dashboardCards.get(e);if(t||(t=document.createElement(e),this._dashboardCards.set(e,t)),this.hass&&(t.hass=this.hass),"glass-light-card"===e||"glass-fan-card"===e){const e=this._items.map(e=>e.areaId);t.visibleAreaIds=e}return t}_rebuildStructure(){if(!this.hass?.areas)return;const e=this._navbarConfig?`${this._navbarConfig.room_order.join(",")}|${this._navbarConfig.hidden_rooms.join(",")}`:"";this.hass.entities!==this._lastEntitiesRef&&(this._lastEntitiesRef=this.hass.entities,this._cachedEntityFingerprint=Object.values(this.hass.entities).map(e=>`${e.entity_id}:${e.area_id??""}`).sort().join("|"));const t=this._cachedEntityFingerprint,i=Object.entries(this._roomConfigs).map(([e,t])=>`${e}:${t.icon??""}`).sort().join(","),a=Object.keys(this.hass.areas).sort().join(",")+"||"+t+"||"+e+"||"+i;if(a===this._lastAreaKeys)return;this._lastAreaKeys=a;const s=new Set(this._navbarConfig?.hidden_rooms??[]),r=new Map;(this._navbarConfig?.room_order??[]).forEach((e,t)=>r.set(e,t));const o=[];for(const n of Object.values(this.hass.areas)){if(s.has(n.area_id))continue;const e=Ve(n.area_id,this.hass.entities,this.hass.devices);if(0===e.length)continue;const t=this._roomConfigs[n.area_id]?.icon;o.push({areaId:n.area_id,name:n.name,icon:t||n.icon||"mdi:home",entityIds:e.map(e=>e.entity_id)})}o.sort((e,t)=>{const i=r.get(e.areaId),a=r.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._areaStructure=o}_aggregateState(){if(!this.hass)return;const e=this._areaStructure.map(e=>{let t=0,i=null,a=null,s=null,r=null,o=!1;for(const n of e.entityIds){const e=this.hass?.states[n];if(!e)continue;const l=n.split(".")[0];if("light"===l&&"on"===e.state&&t++,"sensor"===l&&"unavailable"!==e.state&&"unknown"!==e.state){const t=e.attributes.device_class;"temperature"!==t||i||(i=`${e.state}°`,a=parseFloat(e.state)),"humidity"!==t||s||(s=`${e.state}%`,r=parseFloat(e.state))}"media_player"===l&&"playing"===e.state&&(o=!0)}return{...e,lightsOn:t,temperature:i,tempValue:a,humidity:s,humidityValue:r,mediaPlaying:o}}),t=Date.now();for(const i of e)i.lightsOn>0?this._litTimestamps.has(i.areaId)||this._litTimestamps.set(i.areaId,t):this._litTimestamps.delete(i.areaId);!1!==this._navbarConfig?.auto_sort&&e.sort((e,t)=>{const i=e.lightsOn>0?0:1,a=t.lightsOn>0?0:1;if(i!==a)return i-a;if(0===i){const i=this._litTimestamps.get(e.areaId)??0;return(this._litTimestamps.get(t.areaId)??0)-i}return 0});e.map(e=>`${e.areaId}:${e.lightsOn}:${e.temperature}:${e.humidity}:${e.mediaPlaying}`).join("|")!==this._items.map(e=>`${e.areaId}:${e.lightsOn}:${e.temperature}:${e.humidity}:${e.mediaPlaying}`).join("|")&&(this._snapshotPositions(),this._items=e)}_updateAmbient(){if(!this.hass)return;const t=function(e){const t=e.states["sun.sun"];if(!t){const e=(new Date).getHours();return e>=6&&e<10?"morning":e>=10&&e<17?"day":e>=17&&e<21?"evening":"night"}const i=parseFloat(t.attributes.elevation)||0;if(i>20)return"day";if(i>0){const e=Date.parse(t.attributes.next_setting),i=Date.parse(t.attributes.next_rising);return isNaN(e)||isNaN(i)?"above_horizon"===t.state?"day":"night":e<i?"evening":"morning"}if(i>-6){const e=Date.parse(t.attributes.next_rising),i=Date.parse(t.attributes.next_setting);if(!isNaN(e)&&!isNaN(i))return e<i?"morning":"evening"}return"night"}(this.hass);t!==this._lastAmbientPeriod&&(this._lastAmbientPeriod=t,e.emit("ambient-update",{period:t}))}_snapshotPositions(){this._flipPositions.clear();const e=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const t of e){const e=t.dataset.area;e&&this._flipPositions.set(e,t.getBoundingClientRect().left)}}_animateFlip(){if(0===this._flipPositions.size)return;const e=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const t of e){const e=t.dataset.area;if(!e)continue;const i=this._flipPositions.get(e);if(void 0===i)continue;const a=i-t.getBoundingClientRect().left;Math.abs(a)<1||t.animate([{transform:`translateX(${a}px)`},{transform:"translateX(0)"}],{duration:350,easing:"cubic-bezier(0.4, 0, 0.2, 1)"})}this._flipPositions.clear()}_updateNavMask(){const e=this.renderRoot.querySelector(".nav-scroll");if(!e)return;if(!(e.scrollWidth>e.offsetWidth))return void(this._scrollMask="none");const t=e.scrollLeft<=5,i=e.scrollLeft+e.offsetWidth>=e.scrollWidth-5;this._scrollMask=t&&i?"none":t?"mask-right":i?"mask-left":"mask-both"}_handleNavClick(t,i){const a=i.currentTarget.getBoundingClientRect();if(this._activeArea===t.areaId)e.emit("popup-close",void 0),this._activeArea=null;else{this._activeArea=t.areaId;const i=this._items.indexOf(t);e.emit("popup-open",{areaId:t.areaId,originRect:a,roomIndex:i>=0?i:void 0})}}_renderNavItem(e){const t=this._activeArea===e.areaId,i=!1!==this._navbarConfig?.show_lights,a=!1!==this._navbarConfig?.show_temperature,s=!1!==this._navbarConfig?.show_humidity,r=!1!==this._navbarConfig?.show_media,o=this._navbarConfig?.temp_high??24,n=this._navbarConfig?.temp_low??17,l=this._navbarConfig?.humidity_threshold??65,c=i&&e.lightsOn>0,d=s&&null!==e.humidityValue&&e.humidityValue>=l,h=r&&e.mediaPlaying,p=a&&null!==e.tempValue&&e.tempValue>=o,u=["nav-item",t?"active":"",c?"has-light":"",h?"has-music":"",p?"has-temp-hot":"",a&&null!==e.tempValue&&!p&&e.tempValue<=n?"has-temp-cold":""].filter(Boolean).join(" ");return K`
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
          ${d?K`<span class="humidity-bar"></span>`:Q}
        </span>
      </button>
    `}_syncDashboardCards(){const e=this.renderRoot.querySelector(".dashboard-cards");if(!e)return;const t=new Set(this._enabledCards),i=this._cardOrder.filter(e=>t.has(e)),a=[];for(const[r]of this._dashboardCards){const e=Object.entries(ut).find(([,e])=>e===r)?.[0];e&&t.has(e)||a.push(r)}for(const r of a)this._dashboardCards.get(r)?.remove(),this._dashboardCards.delete(r);let s=null;for(const r of i){const t=ut[r];if(!t)continue;const i=this._getOrCreateCard(t),a=s?s.nextElementSibling:e.firstElementChild;i!==a&&e.insertBefore(i,a),s=i}}render(){this._lang;const e=!this._editMode&&this._items.length>0,t="nav-scroll"+("none"!==this._scrollMask?` ${this._scrollMask}`:"");return K`
      <div class="dashboard-cards"></div>
      ${e?K`<nav class="navbar glass glass-float${this._bgIsLight?" bg-light":""}">
            <div class=${t}>
              ${this._items.map(e=>this._renderNavItem(e))}
              <button
                class="nav-item nav-settings"
                @click=${()=>{history.pushState(null,"","/glass-cards"),window.dispatchEvent(new Event("location-changed"))}}
                aria-label=${je("config.title")}
              >
                <span class="nav-content">
                  <ha-icon .icon=${"mdi:cog"}></ha-icon>
                </span>
              </button>
            </div>
          </nav>`:Q}
    `}}pt([Le()],gt.prototype,"_items"),pt([Le()],gt.prototype,"_activeArea"),pt([Le()],gt.prototype,"_scrollMask"),pt([Le()],gt.prototype,"_editMode"),pt([Le()],gt.prototype,"_enabledCards"),pt([Le()],gt.prototype,"_bgIsLight");try{customElements.define("glass-navbar-card",gt)}catch{}const ft=window;ft.customCards=ft.customCards||[],ft.customCards.push({type:"glass-navbar-card",name:"Glass Navbar Card",description:"Auto-discovering bottom navigation for Glass Cards"});var mt=Object.defineProperty,vt=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&mt(t,i,r),r};const bt={sunny:"sunny","clear-night":"clear_night",partlycloudy:"partly_cloudy",cloudy:"cloudy",fog:"foggy",rainy:"rainy",pouring:"pouring",snowy:"snowy","snowy-rainy":"snowy_rainy",hail:"hail",lightning:"lightning","lightning-rainy":"stormy",windy:"windy","windy-variant":"windy_variant",exceptional:"exceptional"},yt={sunny:{icon:"mdi:weather-sunny",textKey:"weather.cond_sunny",tint:"#fbbf24",tintOp:.1,sparkStroke:"rgba(251,191,36,0.6)",sparkFill:"rgba(251,191,36,0.15)"},clear_night:{icon:"mdi:weather-night",textKey:"weather.cond_clear_night",tint:"#818cf8",tintOp:.08,sparkStroke:"rgba(129,140,248,0.5)",sparkFill:"rgba(129,140,248,0.12)"},partly_cloudy:{icon:"mdi:weather-partly-cloudy",textKey:"weather.cond_partly_cloudy",tint:"#fcd34d",tintOp:.07,sparkStroke:"rgba(252,211,77,0.5)",sparkFill:"rgba(252,211,77,0.12)"},cloudy:{icon:"mdi:weather-cloudy",textKey:"weather.cond_cloudy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.4)",sparkFill:"rgba(148,163,184,0.08)"},foggy:{icon:"mdi:weather-fog",textKey:"weather.cond_foggy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.35)",sparkFill:"rgba(148,163,184,0.08)"},rainy:{icon:"mdi:weather-rainy",textKey:"weather.cond_rainy",tint:"#60a5fa",tintOp:.1,sparkStroke:"rgba(96,165,250,0.6)",sparkFill:"rgba(96,165,250,0.15)"},pouring:{icon:"mdi:weather-pouring",textKey:"weather.cond_pouring",tint:"#3b82f6",tintOp:.14,sparkStroke:"rgba(59,130,246,0.7)",sparkFill:"rgba(59,130,246,0.18)"},snowy:{icon:"mdi:weather-snowy",textKey:"weather.cond_snowy",tint:"#e0f2fe",tintOp:.08,sparkStroke:"rgba(224,242,254,0.5)",sparkFill:"rgba(224,242,254,0.12)"},snowy_rainy:{icon:"mdi:weather-snowy-rainy",textKey:"weather.cond_snowy_rainy",tint:"#93c5fd",tintOp:.08,sparkStroke:"rgba(147,197,253,0.5)",sparkFill:"rgba(147,197,253,0.12)"},hail:{icon:"mdi:weather-hail",textKey:"weather.cond_hail",tint:"#bae6fd",tintOp:.1,sparkStroke:"rgba(186,230,253,0.5)",sparkFill:"rgba(186,230,253,0.12)"},lightning:{icon:"mdi:weather-lightning",textKey:"weather.cond_lightning",tint:"#c084fc",tintOp:.12,sparkStroke:"rgba(192,132,252,0.6)",sparkFill:"rgba(167,139,250,0.15)"},stormy:{icon:"mdi:weather-lightning-rainy",textKey:"weather.cond_stormy",tint:"#a78bfa",tintOp:.12,sparkStroke:"rgba(167,139,250,0.6)",sparkFill:"rgba(167,139,250,0.15)"},windy:{icon:"mdi:weather-windy",textKey:"weather.cond_windy",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.5)",sparkFill:"rgba(110,231,183,0.10)"},windy_variant:{icon:"mdi:weather-windy-variant",textKey:"weather.cond_windy_variant",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.4)",sparkFill:"rgba(110,231,183,0.10)"},exceptional:{icon:"mdi:alert-circle-outline",textKey:"weather.cond_exceptional",tint:"#fca5a5",tintOp:.1,sparkStroke:"rgba(252,165,165,0.5)",sparkFill:"rgba(252,165,165,0.12)"}},xt=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO"];function wt(e){return e<10?"0"+e:""+e}class kt extends He{constructor(){super(...arguments),this._activeTab=null,this._forecastDaily=[],this._forecastHourly=[],this._clockTime="",this._clockSec="",this._clockDay="",this._clockDate="",this._weatherConfig={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},this._canvas=null,this._ctx=null,this._animId=0,this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:200,color:"rgba(167,139,250,"},this._cW=0,this._cH=0,this._resizeObserver=null,this._cachedCond="",this._clockInterval=0,this._unsubDaily=null,this._unsubHourly=null,this._configLoaded=!1,this._configLoadingInProgress=!1,this._canvasReady=!1,this._needsCanvasReInit=!1,this._subscribedEntity="",this._subscribedShowDaily=!1,this._subscribedShowHourly=!1,this._subVersion=0,this._animRunning=!1,this._animate=()=>{if(!this.isConnected||!this._animRunning)return;const e=this._ctx;if(!e)return;e.clearRect(0,0,this._cW,this._cH);for(const i of this._particles)this._updateParticle(i),this._drawParticle(e,i);const t=this._cachedCond;"stormy"!==t&&"lightning"!==t||(this._updateFlash(),this._flashState.opacity>.01&&(e.fillStyle=this._flashState.color+this._flashState.opacity+")",e.fillRect(0,0,this._cW,this._cH))),this._animId=requestAnimationFrame(this._animate)}}static{this.styles=[ue,_e,ye,ve,c`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    .weather-card-wrap {
      display: flex; flex-direction: column; gap: 6px;
    }

    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6px;
    }
    .card-title {
      font-size: 9px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 1.5px;
      color: var(--t4);
    }
    .card-location {
      font-size: 9px; font-weight: 500; color: var(--t3);
    }

    .weather-card {
      position: relative;
      width: 100%; padding: 14px 14px 6px;
      box-sizing: border-box;
    }

    .card-inner {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; gap: 8px;
    }

    /* ── Header: clock + weather ── */
    .wc-header {
      display: flex; align-items: flex-start; justify-content: space-between;
    }

    .wc-clock-zone {
      display: flex; flex-direction: column; gap: 1px;
    }
    .wc-clock-hm {
      font-size: 28px; font-weight: 300; line-height: 1;
      color: var(--t1); letter-spacing: -0.8px;
      font-variant-numeric: tabular-nums;
    }
    .wc-clock-sec {
      font-size: 12px; font-weight: 300; color: var(--t4);
      margin-left: 1px;
    }
    .wc-clock-date {
      font-size: 10px; font-weight: 500; color: var(--t4);
    }
    .wc-clock-day {
      font-weight: 600; color: var(--t3);
      text-transform: capitalize;
    }

    .wc-weather-zone {
      display: flex; flex-direction: column; align-items: flex-end; gap: 1px;
    }
    .wc-temp-row {
      display: flex; align-items: baseline; gap: 2px;
    }
    .wc-temp {
      font-size: 28px; font-weight: 700; line-height: 1;
      color: var(--t1); letter-spacing: -0.5px;
    }
    .wc-temp-unit {
      font-size: 12px; font-weight: 400; color: var(--t3);
    }
    .wc-cond-row {
      display: flex; align-items: center; gap: 4px;
    }
    .wc-cond-icon {
      --mdc-icon-size: 13px;
      width: 13px; height: 13px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
      transition: color var(--t-med), filter var(--t-med);
    }
    .wc-cond-icon.sunny { color: #fbbf24; filter: drop-shadow(0 0 4px rgba(251,191,36,0.35)); }
    .wc-cond-icon.partly_cloudy { color: #fcd34d; }
    .wc-cond-icon.cloudy { color: var(--t2); }
    .wc-cond-icon.rainy { color: #60a5fa; filter: drop-shadow(0 0 4px rgba(96,165,250,0.3)); }
    .wc-cond-icon.pouring { color: #3b82f6; filter: drop-shadow(0 0 4px rgba(59,130,246,0.4)); }
    .wc-cond-icon.stormy { color: #a78bfa; filter: drop-shadow(0 0 4px rgba(167,139,250,0.35)); }
    .wc-cond-icon.lightning { color: #c084fc; filter: drop-shadow(0 0 5px rgba(192,132,252,0.4)); }
    .wc-cond-icon.snowy { color: #e0f2fe; }
    .wc-cond-icon.snowy_rainy { color: #93c5fd; }
    .wc-cond-icon.hail { color: #bae6fd; filter: drop-shadow(0 0 3px rgba(186,230,253,0.3)); }
    .wc-cond-icon.foggy { color: var(--t3); }
    .wc-cond-icon.windy { color: #6ee7b7; filter: drop-shadow(0 0 3px rgba(110,231,183,0.3)); }
    .wc-cond-icon.windy_variant { color: #6ee7b7; }
    .wc-cond-icon.clear_night { color: #818cf8; filter: drop-shadow(0 0 4px rgba(129,140,248,0.35)); }
    .wc-cond-icon.exceptional { color: #fca5a5; filter: drop-shadow(0 0 4px rgba(252,165,165,0.3)); }
    .wc-cond-text {
      font-size: 10px; font-weight: 500; color: var(--t3);
    }
    .wc-feels {
      font-size: 9px; font-weight: 500; color: var(--t4);
    }

    /* ── Canvas animation ── */
    .wc-anim {
      position: absolute; inset: 0; border-radius: inherit;
      overflow: hidden; pointer-events: none; z-index: 0;
    }

    /* ── Sparkline ── */
    .wc-spark-zone {
      position: relative;
      width: 100%; height: 64px;
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
      padding: 0 4px 4px;
      pointer-events: none;
    }
    .wc-spark-lbl {
      font-size: 8px; font-weight: 600; color: var(--t4);
      text-align: center;
    }
    .wc-spark-now {
      position: absolute;
      top: 0; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent);
      pointer-events: none;
    }
    .wc-spark-now-dot {
      position: absolute; top: 0;
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--t1);
      box-shadow: 0 0 6px rgba(255,255,255,0.4);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    /* ── Metrics Grid ── */
    .wc-metrics {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      border-radius: var(--radius-sm);
      background: var(--b1);
      overflow: hidden;
    }
    .wc-metric {
      display: flex; align-items: center; justify-content: center; gap: 3px;
      padding: 5px 4px;
      background: var(--s1);
    }
    .wc-metric ha-icon {
      --mdc-icon-size: 11px;
      width: 11px; height: 11px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t4);
    }
    .wc-metric.humidity ha-icon { color: rgba(96,165,250,0.5); }
    .wc-metric.pressure ha-icon { color: rgba(148,163,184,0.5); }
    .wc-metric.wind ha-icon { color: rgba(110,231,183,0.5); }
    .wc-metric.uv ha-icon { color: rgba(251,191,36,0.5); }
    .wc-metric.visibility ha-icon { color: rgba(148,163,184,0.4); }
    .wc-metric.sunrise ha-icon { color: rgba(251,191,36,0.4); }
    .wc-metric.sunset ha-icon { color: rgba(251,146,60,0.5); }
    .wc-metric-val { font-size: 10px; font-weight: 600; color: var(--t2); }
    .wc-metric-unit { font-size: 8px; font-weight: 400; color: var(--t4); }
    .wc-metric-dir { font-size: 8px; font-weight: 600; color: var(--t4); margin-left: 1px; }

    /* ── Forecast tabs ── */
    /* ── Fold separator ── */
    .wc-fold-sep {
      height: 1px; margin: 0 12px; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(129,140,248,0.2), transparent);
      opacity: 0; transition: opacity var(--t-layout);
    }
    .wc-fold-sep.visible { opacity: 1; }

    .wc-forecast-zone {
      display: flex; flex-direction: column; gap: 4px;
      margin-top: 2px;
    }
    .wc-fc-tabs {
      display: flex; gap: 3px;
      margin: 0 auto; width: fit-content;
    }
    .wc-fc-tab {
      padding: 4px 12px;
      border: 1px solid var(--b1);
      border-radius: var(--radius-full);
      background: transparent; color: var(--t4);
      font-family: inherit; font-size: 9px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.8px;
      cursor: pointer; transition: all var(--t-fast);
      outline: none;
    }
    .wc-fc-tab:focus-visible { box-shadow: 0 0 0 2px rgba(255,255,255,0.25); }
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
      display: flex; flex-direction: column; gap: 1px;
      padding: 2px 0;
    }
    .wc-day-row {
      display: grid; grid-template-columns: 42px 18px 1fr 42px 38px;
      align-items: center; gap: 5px;
      padding: 5px 4px;
      border-radius: var(--radius-sm);
      transition: background var(--t-fast);
    }
    .wc-day-row:first-child { background: var(--s2); }
    .wc-day-label {
      font-size: 10px; font-weight: 600; color: var(--t3);
    }
    .wc-day-row:first-child .wc-day-label { color: var(--t2); }
    .wc-day-icon {
      --mdc-icon-size: 14px;
      width: 14px; height: 14px;
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
      font-size: 10px; font-weight: 500; color: var(--t4);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wc-day-temps {
      display: flex; align-items: baseline; gap: 2px; justify-content: flex-end;
    }
    .wc-day-hi { font-size: 11px; font-weight: 700; color: var(--t1); }
    .wc-day-lo { font-size: 10px; font-weight: 500; color: var(--t4); }
    .wc-day-precip {
      font-size: 9px; font-weight: 500; color: rgba(96,165,250,0.5);
      text-align: right;
    }

    /* ── Hourly list ── */
    .wc-hour-row {
      display: grid; grid-template-columns: 42px 18px 1fr 38px 32px;
      align-items: center; gap: 5px;
      padding: 5px 4px;
      border-radius: var(--radius-sm);
      transition: background var(--t-fast);
    }
    .wc-hour-row.now { background: var(--s2); }
    .wc-hour-time {
      font-size: 10px; font-weight: 600; color: var(--t3);
    }
    .wc-hour-row.now .wc-hour-time { color: var(--t2); }
    .wc-hour-icon {
      --mdc-icon-size: 14px;
      width: 14px; height: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .wc-hour-cond {
      font-size: 10px; font-weight: 500; color: var(--t4);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wc-hour-temp {
      font-size: 11px; font-weight: 700; color: var(--t1);
      text-align: right;
    }
    .wc-hour-precip {
      font-size: 9px; font-weight: 500; color: rgba(96,165,250,0.5);
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
  `]}getTrackedEntityIds(){const e=[],t=this._getEntityId();return t&&e.push(t),this.hass?.states["sun.sun"]&&e.push("sun.sun"),e}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._weatherConfig.entity_id)return this._weatherConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("weather."));if(e)return e}return""}_getWeatherState(){const e=this._getEntityId();return e?this.hass?.states[e]:void 0}_mapCondition(e){return bt[e]??"cloudy"}_getConditionMeta(e){return yt[e]??yt.cloudy}connectedCallback(){super.connectedCallback(),this._startClock(),this._listen("weather-config-changed",()=>this._loadConfig()),this._canvasReady&&(this._needsCanvasReInit=!0)}disconnectedCallback(){super.disconnectedCallback(),this._stopClock(),this._stopAnimation(),this._unsubForecasts(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._canvas=null,this._ctx=null,this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}_collapseExpanded(){null!==this._activeTab&&(this._activeTab=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,this._unsubForecasts()),this._configLoaded||this._configLoadingInProgress||(this._backend=new Ue(this.hass),this._loadConfig());const e=this._getWeatherState();this._cachedCond=e?this._mapCondition(e.state):"",this._configLoaded&&this._subscribeForecasts()}this._needsCanvasReInit&&(this._needsCanvasReInit=!1,this._initCanvas())}firstUpdated(){this._canvasReady=!0,this._initCanvas()}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherConfig=e.weather),this._configLoaded=!0,this._configLoadingInProgress=!1,this._subscribedEntity="",this._subscribeForecasts(),this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}async _subscribeForecasts(){const e=this._getEntityId();if(!e||!this.hass)return;const t=this._subscribedShowDaily!==this._weatherConfig.show_daily||this._subscribedShowHourly!==this._weatherConfig.show_hourly;if(e===this._subscribedEntity&&!t)return;this._unsubForecasts(),this._subscribedEntity=e,this._subscribedShowDaily=this._weatherConfig.show_daily,this._subscribedShowHourly=this._weatherConfig.show_hourly;const i=++this._subVersion;if(this._weatherConfig.show_daily){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastDaily=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(this._subVersion!==i)return void t();this._unsubDaily=t}if(this._weatherConfig.show_hourly){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastHourly=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});if(this._subVersion!==i)return void t();this._unsubHourly=t}}_unsubForecasts(){this._subVersion++,this._unsubDaily?.(),this._unsubDaily=null,this._unsubHourly?.(),this._unsubHourly=null,this._subscribedEntity=""}_startClock(){this._stopClock(),this._updateClock(),this._clockInterval=window.setInterval(()=>this._updateClock(),1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=0)}_updateClock(){const e=new Date;var t,i;this._clockTime=wt(e.getHours())+":"+wt(e.getMinutes()),this._clockSec=":"+wt(e.getSeconds()),this._clockDay=(t=e,i=this._lang,t.toLocaleDateString(i,{weekday:"long"})),this._clockDate=e.getDate()+" "+function(e,t){return e.toLocaleDateString(t,{month:"long"})}(e,this._lang)}_initCanvas(){if(this._resizeObserver?.disconnect(),this._resizeObserver=null,this._stopAnimation(),this._canvas=this.renderRoot.querySelector(".wc-anim"),!this._canvas)return;this._ctx=this._canvas.getContext("2d"),this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas());const e=this._canvas.parentElement;e&&this._resizeObserver.observe(e),this._resizeCanvas(),this._startAnimation()}_resizeCanvas(){if(!this._canvas||!this._ctx)return;const e=this._canvas.parentElement;if(!e)return;const t=e.getBoundingClientRect(),i=window.devicePixelRatio||1;this._cW=t.width,this._cH=t.height,this._canvas.width=this._cW*i,this._canvas.height=this._cH*i,this._canvas.style.width=this._cW+"px",this._canvas.style.height=this._cH+"px",this._ctx.setTransform(i,0,0,i,0,0)}_startAnimation(){this._animRunning||(this._animRunning=!0,this._spawnParticles(this._cachedCond||"cloudy"),this._animate())}_stopAnimation(){this._animRunning=!1,this._animId&&(cancelAnimationFrame(this._animId),this._animId=0)}_rnd(e,t){return e+Math.random()*(t-e)}_spawnParticles(e){this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:this._rnd(120,280),color:"rgba(167,139,250,"};const t=this._cW,i=this._cH;if(!t||!i)return;const a=(e,i,a,s,r,o)=>({type:"drop",x:this._rnd(0,t),y:this._rnd(-30,-5),len:this._rnd(i,a),speed:this._rnd(s,r),angle:o,color:e,opacity:this._rnd(.4,.7)}),s=()=>({type:"flake",x:this._rnd(0,t),y:this._rnd(-10,-3),r:this._rnd(1.5,3.5),speed:this._rnd(.4,1.2),drift:this._rnd(-.3,.3),phase:this._rnd(0,6.28),opacity:this._rnd(.3,.7)}),r=e=>({type:"mote",x:this._rnd(.1*t,.9*t),y:this._rnd(.3*i,.9*i),r:this._rnd(1,2.5),speed:this._rnd(.15,.4),drift:this._rnd(-.15,.15),phase:this._rnd(0,6.28),color:e,opacity:0,maxOp:this._rnd(.3,.7),life:0,maxLife:this._rnd(180,360)}),o=()=>({type:"star",x:this._rnd(.05*t,.95*t),y:this._rnd(.05*i,.7*i),r:this._rnd(.8,1.8),phase:this._rnd(0,6.28),speed:this._rnd(.008,.025)}),n=(e,a)=>({type:"cloud",x:this._rnd(-80,t),y:this._rnd(.05*i,.6*i),w:this._rnd(50,110),h:this._rnd(12,26),speed:this._rnd(.6*a,a),opacity:this._rnd(.6*e,e)}),l=()=>({type:"streak",x:this._rnd(-60,0),y:this._rnd(.1*i,.85*i),w:this._rnd(40,90),speed:this._rnd(2,5),opacity:this._rnd(.06,.14)}),c=()=>({type:"fog",x:this._rnd(-120,.5*t),y:this._rnd(.15*i,.75*i),w:this._rnd(80,160),h:this._rnd(18,35),speed:this._rnd(.2,.6),opacity:this._rnd(.02,.04)}),d=()=>({type:"hail",x:this._rnd(0,t),y:this._rnd(-15,-3),r:this._rnd(2,4),speed:this._rnd(3,5.5),opacity:this._rnd(.5,.8)}),h=this._particles;switch(e){case"sunny":for(let e=0;e<10;e++)h.push(r("rgba(251,191,36,"));break;case"clear_night":for(let e=0;e<14;e++)h.push(o());break;case"partly_cloudy":for(let e=0;e<3;e++)h.push(n(.035,.4));for(let e=0;e<4;e++)h.push(r("rgba(251,191,36,"));break;case"cloudy":for(let e=0;e<5;e++)h.push(n(.045,.35));break;case"foggy":for(let e=0;e<7;e++)h.push(c());break;case"rainy":for(let e=0;e<20;e++)h.push(a("rgba(96,165,250,",14,24,4,7,.14));for(let e=0;e<3;e++)h.push(n(.025,.3));break;case"pouring":for(let e=0;e<35;e++)h.push(a("rgba(59,130,246,",18,30,5.5,9,.1));for(let e=0;e<4;e++)h.push(n(.035,.35));break;case"stormy":for(let e=0;e<28;e++)h.push(a("rgba(167,139,250,",16,28,5,8,.26));for(let e=0;e<4;e++)h.push(n(.05,.5));this._flashState.interval=this._rnd(80,200);break;case"lightning":for(let e=0;e<4;e++)h.push(n(.04,.4));this._flashState.interval=this._rnd(60,160),this._flashState.color="rgba(192,132,252,";break;case"snowy":for(let e=0;e<18;e++)h.push(s());for(let e=0;e<3;e++)h.push(n(.025,.2));break;case"snowy_rainy":for(let e=0;e<10;e++)h.push(s());for(let e=0;e<14;e++)h.push(a("rgba(96,165,250,",12,20,3.5,6,.14));break;case"hail":for(let e=0;e<14;e++)h.push(d());for(let e=0;e<10;e++)h.push(a("rgba(96,165,250,",10,18,3.5,5.5,.14));break;case"windy":for(let e=0;e<8;e++)h.push(l());break;case"windy_variant":for(let e=0;e<6;e++)h.push(l());for(let e=0;e<4;e++)h.push(n(.035,1.2));break;case"exceptional":for(let e=0;e<8;e++)h.push(r("rgba(252,165,165,"));for(let e=0;e<5;e++)h.push(l())}}_updateParticle(e){const t=this._cW,i=this._cH;switch(e.type){case"drop":e.x=e.x+Math.sin(e.angle)*e.speed,e.y=e.y+Math.cos(e.angle)*e.speed,e.y>i+10&&(e.y=this._rnd(-30,-5),e.x=this._rnd(0,t));break;case"flake":e.y=e.y+e.speed,e.phase=e.phase+.02,e.x=e.x+e.drift+.3*Math.sin(e.phase),e.y>i+10&&(e.y=this._rnd(-10,-3),e.x=this._rnd(0,t));break;case"mote":{e.life=e.life+1,e.y=e.y-e.speed,e.x=e.x+e.drift+.2*Math.sin(e.phase+.015*e.life);const a=e.life/e.maxLife;e.opacity=a<.15?a/.15*e.maxOp:a>.85?(1-a)/.15*e.maxOp:e.maxOp,e.life>=e.maxLife&&(e.life=0,e.x=this._rnd(.1*t,.9*t),e.y=this._rnd(.3*i,.9*i),e.maxLife=this._rnd(180,360),e.maxOp=this._rnd(.3,.7));break}case"star":e.phase=e.phase+e.speed;break;case"cloud":e.x=e.x+e.speed,e.x>t+20&&(e.x=-e.w-this._rnd(10,60),e.y=this._rnd(.05*i,.6*i));break;case"streak":e.x=e.x+e.speed,e.x>t+20&&(e.x=this._rnd(-80,-20),e.y=this._rnd(.1*i,.85*i));break;case"fog":e.x=e.x+e.speed,e.x>t+40&&(e.x=-e.w-this._rnd(20,80),e.y=this._rnd(.15*i,.75*i));break;case"hail":e.y=e.y+e.speed,e.y>i+10&&(e.y=this._rnd(-15,-3),e.x=this._rnd(0,t))}}_drawParticle(e,t){switch(t.type){case"drop":{const i=Math.sin(t.angle)*t.len,a=Math.cos(t.angle)*t.len,s=e.createLinearGradient(t.x,t.y,t.x+i,t.y+a);s.addColorStop(0,t.color+"0)"),s.addColorStop(1,t.color+t.opacity+")"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+i,t.y+a),e.strokeStyle=s,e.lineWidth=1.5,e.stroke();break}case"flake":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break;case"mote":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle=t.color+t.opacity+")",e.shadowColor=t.color+.5*t.opacity+")",e.shadowBlur=6,e.fill(),e.shadowBlur=0;break;case"star":{const i=.15+.75*(.5+.5*Math.sin(t.phase));e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+i+")",e.fill();break}case"cloud":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"streak":{const i=e.createLinearGradient(t.x,t.y,t.x+t.w,t.y);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.5,"rgba(255,255,255,"+t.opacity+")"),i.addColorStop(1,"rgba(255,255,255,0)"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+t.w,t.y),e.strokeStyle=i,e.lineWidth=1,e.stroke();break}case"fog":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"hail":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(224,242,254,"+t.opacity+")",e.fill(),e.beginPath(),e.arc(t.x-.25*t.r,t.y-.25*t.r,.4*t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+.3*t.opacity+")",e.fill()}}_updateFlash(){const e=this._flashState;e.timer++,e.on?(e.opacity*=.82,e.opacity<.02&&(e.on=!1,e.opacity=0,e.timer=0,e.interval=this._rnd(80,280))):e.timer>e.interval&&(e.on=!0,e.opacity=this._rnd(.12,.22))}_computeSparkline(e){const t=e.length;if(t<2)return{linePath:"",areaPath:"",nowY:32};let i=1/0,a=-1/0;for(const n of e)n.temperature<i&&(i=n.temperature),n.temperature>a&&(a=n.temperature);const s=a-i||1,r=e.map((e,i)=>({x:i/(t-1)*348,y:10+(a-e.temperature)/s*44}));let o=`M${r[0].x},${r[0].y}`;for(let n=0;n<r.length-1;n++){const e=r[Math.max(n-1,0)],t=r[n],i=r[Math.min(n+1,r.length-1)],a=r[Math.min(n+2,r.length-1)];o+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}return{linePath:o,areaPath:o+" L348,64 L0,64 Z",nowY:r[0].y}}render(){this._lang;const e=this._getWeatherState();if(!e)return K`<div class="weather-card-wrap">
        ${this._weatherConfig.show_header?K`<div class="card-header"><span class="card-title">${je("weather.title")}</span></div>`:Q}
        <div class="glass weather-card"><div class="card-inner" style="padding:20px;text-align:center;color:var(--t3);font-size:11px;">${je("common.no_entity")}</div></div>
      </div>`;const t=e.attributes,i=e.state,a=this._mapCondition(i),s=this._getConditionMeta(a),r=t.temperature??0,o=t.apparent_temperature,n=t.humidity,l=t.wind_speed,c=t.wind_speed_unit??"km/h",d=t.wind_bearing,h=t.pressure,p=t.visibility,u=t.uv_index,_=t.friendly_name??"",g=t.temperature_unit??"°C",f=this.hass?.states["sun.sun"],m=f?.attributes.next_rising,v=f?.attributes.next_setting,b=m?new Date(m).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",y=v?new Date(v).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",x=new Set(this._weatherConfig.hidden_metrics),w=this._forecastHourly.slice(0,10),k=this._computeSparkline(w),$=`background: radial-gradient(ellipse at 80% 20%, ${s.tint}, transparent 70%); opacity: ${s.tintOp};`;return K`
      <div class="weather-card-wrap">
        ${this._weatherConfig.show_header?K`
          <div class="card-header">
            <span class="card-title">${je("weather.title")}</span>
            <span class="card-location">${_}</span>
          </div>
        `:Q}

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
                  <span class="wc-temp">${Math.round(r)}</span>
                  <span class="wc-temp-unit">${g}</span>
                </div>
                <div class="wc-cond-row">
                  <ha-icon .icon="${s.icon}" class="wc-cond-icon ${a}"></ha-icon>
                  <span class="wc-cond-text">${je(s.textKey)}</span>
                </div>
                ${null!=o?K`<span class="wc-feels">${je("weather.feels_like",{temp:Math.round(o)})}</span>`:Q}
              </div>
            </div>

            <!-- Sparkline -->
            ${w.length>=2?K`
              <div class="wc-spark-zone">
                <svg class="wc-spark-svg" viewBox="0 0 348 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${s.sparkFill}" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  ${G`<path class="wc-spark-area" d="${k.areaPath}" fill="url(#sparkGrad)" />`}
                  ${G`<path class="wc-spark-line" d="${k.linePath}" stroke="${s.sparkStroke}" />`}
                </svg>
                <div class="wc-spark-now" style="left:0px;">
                  <div class="wc-spark-now-dot" style="top:${k.nowY/64*100}%"></div>
                </div>
                <div class="wc-spark-labels">
                  ${w.map((e,t)=>K`<span class="wc-spark-lbl">${t%2==0||t===w.length-1?0===t?je("weather.now"):new Date(e.datetime).getHours()+"h":""}</span>`)}
                </div>
              </div>
            `:Q}

            <!-- Metrics -->
            ${this._renderMetrics(x,n,l,c,d,h,u,p,b,y)}

            <!-- Forecast -->
            ${this._renderForecasts(g)}

          </div>
        </div>
      </div>
    `}_renderMetrics(e,t,i,a,s,r,o,n,l,c){const d=[];var h;return e.has("humidity")||null==t||d.push(K`<div class="wc-metric humidity">
        <ha-icon icon="mdi:water-percent"></ha-icon>
        <span class="wc-metric-val">${t}%</span>
      </div>`),e.has("wind")||null==i||d.push(K`<div class="wc-metric wind">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        <span class="wc-metric-val">${Math.round(i)}</span>
        <span class="wc-metric-unit">${a}</span>
        <span class="wc-metric-dir">${h=s,null==h?"":xt[Math.round((+h%360+360)%360/22.5)%16]}</span>
      </div>`),e.has("pressure")||null==r||d.push(K`<div class="wc-metric pressure">
        <ha-icon icon="mdi:gauge"></ha-icon>
        <span class="wc-metric-val">${Math.round(r)}</span>
        <span class="wc-metric-unit">hPa</span>
      </div>`),e.has("uv")||null==o||d.push(K`<div class="wc-metric uv">
        <ha-icon icon="mdi:sun-wireless"></ha-icon>
        <span class="wc-metric-val">${Math.round(o)}</span>
        <span class="wc-metric-unit">UV</span>
      </div>`),e.has("visibility")||null==n||d.push(K`<div class="wc-metric visibility">
        <ha-icon icon="mdi:eye-outline"></ha-icon>
        <span class="wc-metric-val">${n}</span>
        <span class="wc-metric-unit">km</span>
      </div>`),!e.has("sunrise")&&l&&d.push(K`<div class="wc-metric sunrise">
        <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
        <span class="wc-metric-val">${l}</span>
      </div>`),!e.has("sunset")&&c&&d.push(K`<div class="wc-metric sunset">
        <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
        <span class="wc-metric-val">${c}</span>
      </div>`),0===d.length?Q:K`<div class="wc-metrics">
      ${d}
    </div>`}_renderForecasts(e){const t=this._weatherConfig.show_daily,i=this._weatherConfig.show_hourly;return t||i?K`
      <div class="wc-forecast-zone">
        <div class="wc-fc-tabs">
          ${t?K`<button class="wc-fc-tab ${"daily"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("daily")}"
            aria-expanded="${"daily"===this._activeTab?"true":"false"}"
            aria-controls="wc-daily-panel"
            aria-label="${je("weather.daily_tab")}">${je("weather.daily_tab")}</button>`:Q}
          ${i?K`<button class="wc-fc-tab ${"hourly"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("hourly")}"
            aria-expanded="${"hourly"===this._activeTab?"true":"false"}"
            aria-controls="wc-hourly-panel"
            aria-label="${je("weather.hourly_tab")}">${je("weather.hourly_tab")}</button>`:Q}
        </div>

        <div class="wc-fold-sep ${"daily"===this._activeTab&&this._forecastDaily.length>0||"hourly"===this._activeTab&&this._forecastHourly.length>0?"visible":""}"></div>

        ${t?K`
          <div class="fold ${"daily"===this._activeTab?"open":""}" id="wc-daily-panel" role="region" aria-label="${je("weather.daily_tab")}" aria-hidden="${"daily"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-daily-list">
                ${this._forecastDaily.slice(0,7).map((e,t)=>{const i=this._mapCondition(e.condition),a=this._getConditionMeta(i),s=new Date(e.datetime),r=0===t?je("weather.today"):(o=s,n=this._lang,o.toLocaleDateString(n,{weekday:"short"}));var o,n;return K`
                    <div class="wc-day-row">
                      <span class="wc-day-label">${r}</span>
                      <ha-icon .icon="${a.icon}" class="wc-day-icon ${i}"></ha-icon>
                      <span class="wc-day-cond">${je(a.textKey)}</span>
                      <div class="wc-day-temps">
                        <span class="wc-day-hi">${Math.round(e.temperature)}&deg;</span>
                        ${null!=e.templow?K`<span class="wc-day-lo">${Math.round(e.templow)}&deg;</span>`:Q}
                      </div>
                      <span class="wc-day-precip">${null!=e.precipitation_probability&&e.precipitation_probability>0?e.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:Q}

        ${i?K`
          <div class="fold ${"hourly"===this._activeTab?"open":""}" id="wc-hourly-panel" role="region" aria-label="${je("weather.hourly_tab")}" aria-hidden="${"hourly"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-hourly-list">
                ${this._forecastHourly.slice(0,10).map((t,i)=>{const a=this._mapCondition(t.condition),s=this._getConditionMeta(a),r=new Date(t.datetime),o=0===i?je("weather.now"):r.getHours()+"h";return K`
                    <div class="wc-hour-row ${0===i?"now":""}">
                      <span class="wc-hour-time">${o}</span>
                      <ha-icon .icon="${s.icon}" class="wc-hour-icon ${a}"></ha-icon>
                      <span class="wc-hour-cond">${je(s.textKey)}</span>
                      <span class="wc-hour-temp">${Math.round(t.temperature)}${e}</span>
                      <span class="wc-hour-precip">${null!=t.precipitation_probability&&t.precipitation_probability>0?t.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:Q}
      </div>
    `:Q}_switchTab(e){this._activeTab=this._activeTab===e?null:e}}vt([Le()],kt.prototype,"_activeTab"),vt([Le()],kt.prototype,"_forecastDaily"),vt([Le()],kt.prototype,"_forecastHourly"),vt([Le()],kt.prototype,"_clockTime"),vt([Le()],kt.prototype,"_clockSec"),vt([Le()],kt.prototype,"_clockDay"),vt([Le()],kt.prototype,"_clockDate");try{customElements.define("glass-weather-card",kt)}catch{}var $t=Object.defineProperty,Ct=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&$t(t,i,r),r};const St=1,It=2,Tt=4,Pt=8,Et=128,At={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains-closed"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"],awning:["mdi:awning-outline","mdi:awning-outline"],shade:["mdi:roller-shade-open","mdi:roller-shade"],window:["mdi:window-open","mdi:window-closed"],damper:["mdi:valve-open","mdi:valve"]},Lt={vertical:{open:"mdi:arrow-up",close:"mdi:arrow-down",stop:"mdi:stop"},garage:{open:"mdi:garage-open",close:"mdi:garage",stop:"mdi:stop"},gate:{open:"mdi:gate-open",close:"mdi:gate",stop:"mdi:stop"},door:{open:"mdi:door-open",close:"mdi:door-closed",stop:null},damper:{open:"mdi:valve-open",close:"mdi:valve",stop:null},window:{open:"mdi:window-open",close:"mdi:window-closed",stop:null}};function Mt(e,t){return(At[e]||At.shutter)[t?0:1]}class zt extends He{constructor(){super(...arguments),this._expanded=null,this._coverConfig={show_header:!0,dashboard_entities:[],dashboard_compact:!0,presets:[0,25,50,75,100],entity_presets:{}},this._roomConfig=null,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1,this._throttleTimers=new Map,this._sliderCleanups=[],this._coversCache=null,this._coversCacheKey=""}static{this.styles=[ue,_e,ye,ge,ve,c`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .cover-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6px;
      margin-bottom: 6px; min-height: 22px;
    }
    .cover-header-left { display: flex; align-items: center; gap: 8px; }
    .cover-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .cover-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 14px; height: 14px; padding: 0 4px;
      border-radius: var(--radius-full); font-size: 9px; font-weight: 600;
      transition: all var(--t-med);
    }
    .cover-count.some { background: rgba(167,139,250,0.15); color: var(--cv-color, #a78bfa); }
    .cover-count.none { background: var(--s2); color: var(--t3); }
    .cover-count.all  { background: rgba(167,139,250,0.2); color: var(--cv-color, #a78bfa); }

    .cover-header-actions { display: flex; gap: 4px; }
    .header-btn {
      width: 22px; height: 22px; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: all var(--t-fast); -webkit-tap-highlight-color: transparent;
    }
    .header-btn ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .header-btn:hover { background: var(--s3); border-color: var(--b3); }
      .header-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) {
      .header-btn:active { transform: scale(0.96); }
    }
    @media (hover: none) {
      .header-btn:active { animation: bounce 0.3s ease; }
    }
    .header-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .cover-card { position: relative; padding: 2px 14px; }
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
      display: flex; align-items: center; gap: 10px;
      grid-column: 1 / -1;
      padding: 8px 4px; position: relative;
      border-radius: var(--radius-md);
      transition: background var(--t-fast);
    }
    .cv-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .cv-row.compact-right { padding-left: 10px; }
    .cv-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 1px;
      background: linear-gradient(180deg, transparent, var(--b2), transparent);
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .cv-row:active { animation: bounce 0.3s ease; }
    }
    .cv-row:focus-within { background: var(--s1); }

    .cv-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 10px;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-expand-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; border-radius: var(--radius-sm); }

    .cv-icon-btn {
      width: 36px; height: 36px; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast);
      cursor: pointer; padding: 0; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cv-icon-btn ha-icon {
      --mdc-icon-size: 18px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: all var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-icon-btn:hover { background: var(--s3); border-color: var(--b2); }
      .cv-icon-btn:hover ha-icon { color: var(--t2); }
    }
    @media (hover: hover) {
      .cv-icon-btn:active { transform: scale(0.96); }
    }
    @media (hover: none) {
      .cv-icon-btn:active { animation: bounce 0.3s ease; }
    }
    .cv-icon-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    .cv-row.open .cv-icon-btn { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.15); }
    .cv-row.open .cv-icon-btn ha-icon { color: var(--cv-color, #a78bfa); filter: drop-shadow(0 0 6px rgba(167,139,250,0.4)); }

    .cv-info { flex: 1; min-width: 0; }
    .cv-name {
      font-size: 13px; font-weight: 600; color: var(--t1); line-height: 1.2;
      overflow: hidden; white-space: nowrap;
    }
    .cv-sub { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .cv-state-text {
      font-size: 10px; font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .cv-row.open .cv-state-text { color: rgba(167,139,250,0.6); }
    .cv-position {
      font-size: 16px; font-weight: 700; color: var(--t3);
      font-variant-numeric: tabular-nums; flex-shrink: 0;
      transition: color var(--t-med);
    }
    .cv-position .unit { font-size: 10px; font-weight: 500; }
    .cv-row.open .cv-position { color: var(--cv-color, #a78bfa); }

    .cv-dot {
      width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: all var(--t-med);
    }
    .cv-row.open .cv-dot {
      background: var(--cv-color, #a78bfa); box-shadow: 0 0 8px rgba(167,139,250,0.4);
    }

    /* ── Fold ── */
    .fold-sep {
      grid-column: 1 / -1;
      height: 1px; margin: 0 12px; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent);
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
      padding: 6px 0 4px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .ctrl-label {
      font-size: 10px; font-weight: 600; letter-spacing: 0.5px;
      color: rgba(167,139,250,0.6); text-transform: uppercase;
    }

    /* Transport */
    .transport-row {
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .transport-btn {
      width: 44px; height: 44px; border-radius: 14px;
      background: var(--s2); border: 1px solid var(--b2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .transport-btn ha-icon {
      --mdc-icon-size: 22px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t2); transition: color var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .transport-btn:hover { background: var(--s3); border-color: var(--b3); }
      .transport-btn:hover ha-icon { color: var(--t1); }
    }
    @media (hover: hover) {
      .transport-btn:active { transform: scale(0.96); }
    }
    @media (hover: none) {
      .transport-btn:active { animation: bounce 0.3s ease; }
    }
    .transport-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    .transport-btn.accent { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.15); }
    .transport-btn.accent ha-icon { color: var(--cv-color, #a78bfa); }

    /* Slider */
    .slider-wrap { display: flex; align-items: center; gap: 8px; }
    .slider-icon {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; flex-shrink: 0;
    }
    .slider-icon ha-icon {
      --mdc-icon-size: 18px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .slider {
      position: relative; flex: 1; height: 36px;
      border-radius: var(--radius-lg); background: var(--s1);
      border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
      touch-action: none; user-select: none; -webkit-user-select: none;
    }
    .slider-fill {
      position: absolute; top: 0; left: 0; height: 100%;
      border-radius: inherit; pointer-events: none;
      background: linear-gradient(90deg, rgba(167,139,250,0.15), rgba(167,139,250,0.25));
      transition: width 0.05s linear;
    }
    .slider-thumb {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 8px; height: 20px; border-radius: 4px;
      background: rgba(255,255,255,0.7); box-shadow: 0 0 8px rgba(255,255,255,0.2);
      pointer-events: none; transition: left 0.05s linear;
    }
    .slider-val {
      position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
      font-size: 11px; font-weight: 600; color: var(--t3); pointer-events: none;
    }

    /* Presets */
    .preset-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: 11px; font-weight: 600;
      color: var(--t3); cursor: pointer; transition: all var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    .chip ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) {
      .chip:active { transform: scale(0.96); }
    }
    @media (hover: none) {
      .chip:active { animation: bounce 0.3s ease; }
    }
    .chip.active { border-color: rgba(167,139,250,0.15); background: rgba(167,139,250,0.1); color: var(--cv-color, #a78bfa); }

    .ctrl-sep { height: 1px; background: var(--b1); margin: 2px 0; }
  `]}connectedCallback(){super.connectedCallback(),this._listen("cover-config-changed",()=>{this._coversCacheKey="",this._loadConfig()}),this._listen("room-config-changed",e=>{this.areaId&&e.areaId===this.areaId&&(this._roomConfig=null,this._coversCacheKey="",this._loadRoomConfig(this.areaId))})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear();for(const e of this._sliderCleanups)e();this._sliderCleanups=[]}_collapseExpanded(){null!==this._expanded&&(this._expanded=null)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomConfig=null,this._roomLoading=!1),this._configLoaded||this._configLoading||(this._backend=new Ue(this.hass),this._loadConfig())),e.has("areaId")&&this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._roomConfig=null,this._expanded=null,this.areaId&&this._loadRoomConfig(this.areaId))}getTrackedEntityIds(){return this._getCovers().map(e=>e.entityId)}async _loadConfig(){if(this._backend&&!this._configLoading){this._configLoading=!0;try{const e=await this._backend.send("get_config");e?.cover_card&&(this._coverConfig=e.cover_card),this._configLoaded=!0,this._configLoading=!1,this.areaId&&this._loadRoomConfig(this.areaId),this.requestUpdate()}catch{this._configLoading=!1}}}async _loadRoomConfig(e){if(this._backend&&!this._roomLoading){this._roomLoading=!0;try{const t=await this._backend.send("get_room",{area_id:e});this.areaId===e&&(this._roomConfig=t?{...t,entity_layouts:t.entity_layouts??{}}:null,this.requestUpdate())}catch{}finally{this._roomLoading=!1}}}_getCovers(){if(!this.hass)return[];let e;if(this.areaId){if(e=Ve(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id),this._roomConfig){const t=new Set(this._roomConfig.hidden_entities);e=e.filter(e=>!t.has(e));const i=this._roomConfig.entity_order;e.sort((e,t)=>{const a=i.indexOf(e),s=i.indexOf(t);return-1!==a&&-1!==s?a-s:-1!==a?-1:-1!==s?1:0})}}else e=this._coverConfig.dashboard_entities;const t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.attributes.current_position}:${t.attributes.current_tilt_position}`:e}).join("|");return t===this._coversCacheKey&&this._coversCache||(this._coversCache=e.map(e=>{const t=this.hass?.states[e];return t?function(e,t){const i=t.attributes,a=i.device_class||"shutter",s=i.supported_features||0,r=i.current_position,o=i.current_tilt_position,n="open"===t.state||"opening"===t.state;return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,isOpen:n,position:r??null,tiltPosition:o??null,deviceClass:a,features:s}}(e,t):null}).filter(e=>null!==e),this._coversCacheKey=t),this._coversCache}_toggleCover(e,t){t.stopPropagation(),this.hass&&this.hass.callService("cover","toggle",{},{entity_id:e.entityId})}_openCover(e,t){t.stopPropagation(),this.hass&&this.hass.callService("cover","open_cover",{},{entity_id:e.entityId})}_closeCover(e,t){t.stopPropagation(),this.hass&&this.hass.callService("cover","close_cover",{},{entity_id:e.entityId})}_stopCover(e,t){t.stopPropagation(),this.hass&&this.hass.callService("cover","stop_cover",{},{entity_id:e.entityId})}_setPosition(e,t){if(!this.hass)return;const i=this._throttleTimers.get(e.entityId);i&&clearTimeout(i),this._throttleTimers.set(e.entityId,window.setTimeout(()=>{this._throttleTimers.delete(e.entityId),this.hass?.callService("cover","set_cover_position",{position:t},{entity_id:e.entityId})},50))}_setTiltPosition(e,t){if(!this.hass)return;const i=`${e.entityId}_tilt`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,window.setTimeout(()=>{this._throttleTimers.delete(i),this.hass?.callService("cover","set_cover_tilt_position",{tilt_position:t},{entity_id:e.entityId})},50))}_openAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&St&&this.hass.callService("cover","open_cover",{},{entity_id:t.entityId})}_closeAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&It&&this.hass.callService("cover","close_cover",{},{entity_id:t.entityId})}_setPreset(e,t,i){i.stopPropagation(),this.hass&&(e.features&Tt?this.hass.callService("cover","set_cover_position",{position:t},{entity_id:e.entityId}):t>0?this.hass.callService("cover","open_cover",{},{entity_id:e.entityId}):this.hass.callService("cover","close_cover",{},{entity_id:e.entityId}))}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_onSliderDown(e,t,i){i.stopPropagation();const a=i.currentTarget;a.setPointerCapture(i.pointerId);const s=new AbortController,{signal:r}=s,o=i=>{const s=a.getBoundingClientRect(),r=Math.max(0,Math.min(100,Math.round((i.clientX-s.left)/s.width*100)));"position"===t?this._setPosition(e,r):this._setTiltPosition(e,r)};o(i);const n=()=>{s.abort();try{a.releasePointerCapture(i.pointerId)}catch{}this._sliderCleanups=this._sliderCleanups.filter(e=>e!==n)};this._sliderCleanups.push(n),a.addEventListener("pointermove",e=>o(e),{signal:r}),a.addEventListener("pointerup",n,{signal:r}),a.addEventListener("pointercancel",n,{signal:r})}render(){this._lang;const e=this._getCovers();if(0===e.length&&!this.areaId)return this.style.display="none",Q;this.style.display="";const t=this._coverConfig.show_header,i=e.filter(e=>e.isOpen).length,a=e.length;return K`
      ${t?K`
        <div class="cover-header">
          <div class="cover-header-left">
            <span class="cover-title">${je("cover.title")}</span>
            <span class="cover-count ${0===i?"none":i===a?"all":"some"}">${i}/${a}</span>
          </div>
          <div class="cover-header-actions">
            <button class="header-btn" @click=${()=>this._openAll()} aria-label=${je("cover.open_all_aria")}>
              <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
            </button>
            <button class="header-btn" @click=${()=>this._closeAll()} aria-label=${je("cover.close_all_aria")}>
              <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
            </button>
          </div>
        </div>
      `:Q}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${a>0?(i/a*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${0===e.length?K`
            <div style="padding:16px;text-align:center;font-size:12px;color:var(--t4);grid-column:1/-1;">${je("config.cover_no_covers")}</div>
          `:Q}
          ${this.areaId?this._renderGrid(e):this._renderDashboardGrid(e)}
        </div>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const s=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;if(s){const r=i+2>=e.length;t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(s,!0,!0)),t.push(this._renderControlFold(a,r)),t.push(this._renderControlFold(s,r)),i+=2}else{const s=i+1>=e.length;t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,s)),i++}}else{const s=i+1>=e.length;t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,s)),i++}}return t}_renderDashboardGrid(e){if(!(!1!==this._coverConfig.dashboard_compact))return e.map((t,i)=>{const a=i+1>=e.length;return[this._renderCoverRow(t,!1,!1),this._renderControlFold(t,a)]}).flat();const t=[];let i=0;for(;i<e.length;){const a=e[i],s=i+1<e.length?e[i+1]:null;if(s){const r=i+2>=e.length;t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(s,!0,!0)),t.push(this._renderControlFold(a,r)),t.push(this._renderControlFold(s,r)),i+=2}else t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,!0)),i++}return t}_renderCoverRow(e,t=!1,i=!1){const a=this._expanded===e.entityId,s=["cv-row",e.isOpen?"open":"",t?"compact":"",i?"compact-right":""].filter(Boolean).join(" ");return K`
      <div class=${s}>
        <button
          class="cv-icon-btn"
          @click=${t=>this._toggleCover(e,t)}
          aria-label=${je("cover.toggle_aria",{name:e.name})}
        >
          <ha-icon .icon=${Mt(e.deviceClass,e.isOpen)}></ha-icon>
        </button>
        <button
          class="cv-expand-btn"
          @click=${()=>this._toggleExpand(e.entityId)}
          aria-expanded=${a?"true":"false"}
          aria-label=${je("cover.expand_aria",{name:e.name})}
        >
          <div class="cv-info">
            <div class="cv-name">${me(e.name,t?12:fe)}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${function(e){switch(e){case"open":return je("cover.open");case"closed":return je("cover.closed");case"opening":return je("cover.opening");case"closing":return je("cover.closing");default:return e}}(e.entity.state)}</span>
            </div>
          </div>
          ${null!==e.position?K`
            <div class="cv-position">${e.position}<span class="unit">%</span></div>
          `:Q}
          <div class="cv-dot"></div>
        </button>
      </div>
    `}_renderControlFold(e,t=!1){const i=this._expanded===e.entityId;return K`
      <div class="fold-sep ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):Q}
        </div>
      </div>
      ${t?Q:K`<div class="fold-sep ${i?"visible":""}"></div>`}
    `}_renderControls(e){const t=e.features,i=(a=e.deviceClass,["shutter","blind","shade","curtain","awning"].includes(a)?Lt.vertical:Lt[a]||Lt.vertical);var a;const s=!!(t&Tt),r=!!(t&Et),o=[];if(s){const t=this._coverConfig.entity_presets[e.entityId],i=t&&t.length>0?t:this._coverConfig.presets.length>0?this._coverConfig.presets:[0,25,50,75,100];for(const a of i){const t=a>=50,i=0===a?je("cover.preset_closed"):100===a?je("cover.preset_open"):`${a}%`;o.push({label:i,icon:Mt(e.deviceClass,t),position:a})}}else o.push({label:je("cover.preset_closed"),icon:Mt(e.deviceClass,!1),position:0},{label:je("cover.preset_open"),icon:Mt(e.deviceClass,!0),position:100});return K`
      <div class="ctrl-panel">
        <span class="ctrl-label">${e.name}</span>

        <!-- Transport -->
        <div class="transport-row">
          ${t&St?K`
            <button class="transport-btn ${100===e.position||null===e.position&&e.isOpen?"accent":""}"
              @click=${t=>this._openCover(e,t)}
              aria-label=${je("cover.open_aria",{name:e.name})}>
              <ha-icon .icon=${i.open}></ha-icon>
            </button>
          `:Q}
          ${t&Pt?K`
            <button class="transport-btn"
              @click=${t=>this._stopCover(e,t)}
              aria-label=${je("cover.stop_aria",{name:e.name})}>
              <ha-icon .icon=${i.stop||"mdi:stop"}></ha-icon>
            </button>
          `:Q}
          ${t&It?K`
            <button class="transport-btn ${0===e.position||null===e.position&&!e.isOpen?"accent":""}"
              @click=${t=>this._closeCover(e,t)}
              aria-label=${je("cover.close_aria",{name:e.name})}>
              <ha-icon .icon=${i.close}></ha-icon>
            </button>
          `:Q}
        </div>

        <!-- Position slider -->
        ${s?K`
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${Mt(e.deviceClass,!1)}></ha-icon></div>
            <div class="slider" @pointerdown=${t=>this._onSliderDown(e,"position",t)}>
              <div class="slider-fill" style="width:${e.position??0}%;"></div>
              <div class="slider-thumb" style="left:${e.position??0}%;"></div>
              <div class="slider-val">${e.position??0}%</div>
            </div>
            <div class="slider-icon"><ha-icon .icon=${Mt(e.deviceClass,!0)}></ha-icon></div>
          </div>
        `:Q}

        <!-- Tilt slider -->
        ${r?K`
          <span class="ctrl-label">${je("cover.tilt")}</span>
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${"mdi:blinds"}></ha-icon></div>
            <div class="slider" @pointerdown=${t=>this._onSliderDown(e,"tilt",t)}>
              <div class="slider-fill" style="width:${e.tiltPosition??0}%;"></div>
              <div class="slider-thumb" style="left:${e.tiltPosition??0}%;"></div>
              <div class="slider-val">${e.tiltPosition??0}%</div>
            </div>
            <div class="slider-icon"><ha-icon .icon=${"mdi:blinds-open"}></ha-icon></div>
          </div>
        `:Q}

        <!-- Presets -->
        <div class="ctrl-sep"></div>
        <div class="preset-row">
          ${o.map(t=>K`
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
    `}}Ct([Ae()],zt.prototype,"areaId"),Ct([Le()],zt.prototype,"_expanded");try{customElements.define("glass-cover-card",zt)}catch{}var Ot=Object.defineProperty,Rt=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Ot(t,i,r),r};const Dt=1,jt=2,qt=4,Ft=8,Ht={auto:"mdi:autorenew",eco:"mdi:leaf",night:"mdi:weather-night",nuit:"mdi:weather-night",comfort:"mdi:sofa",confort:"mdi:sofa",silent:"mdi:volume-off",silence:"mdi:volume-off",turbo:"mdi:lightning-bolt"};function Vt(e,t){return e<=0?0:Math.max(1,Math.min(t,Math.round(e/(100/t))))}function Nt(e,t){return e<=0?0:e/t*100}const Ut={auto:"fan.preset_auto",eco:"fan.preset_eco",night:"fan.preset_night",nuit:"fan.preset_night",comfort:"fan.preset_comfort",confort:"fan.preset_comfort",silent:"fan.preset_silent",silence:"fan.preset_silent",turbo:"fan.preset_turbo"};function Bt(e){const t=Ut[e.toLowerCase()];return t?je(t):e.charAt(0).toUpperCase()+e.slice(1)}class Wt extends He{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._showHeader=!0,this._fanConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._fansFingerprint="",this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._sliderCleanups=[],this._schedules=null,this._schedulesLoaded=!1}get _isDashboardMode(){return!this.areaId}static{this.styles=[ue,_e,ye,ge,ve,c`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* ── Card Header ── */
    .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6px; margin-bottom: 6px; min-height: 22px;
    }
    .card-header-left { display: flex; align-items: center; gap: 8px; }
    .card-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .card-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 14px; height: 14px; padding: 0 4px;
      border-radius: var(--radius-full); font-size: 9px; font-weight: 600;
      transition: all var(--t-med);
    }
    .card-count.some { background: rgba(129,140,248,0.15); color: var(--c-accent); }
    .card-count.none { background: var(--s2); color: var(--t3); }
    .card-count.all  { background: rgba(129,140,248,0.2); color: var(--c-accent); }

    /* ── Toggle All ── */
    .toggle-all {
      position: relative; width: 40px; height: 22px; border-radius: 11px;
      background: var(--s2); border: 1px solid var(--b2); cursor: pointer;
      transition: all var(--t-fast); padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .toggle-all::after {
      content: ''; position: absolute; top: 3px; left: 3px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--t3);
      transition: transform var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
    }
    .toggle-all.on { background: rgba(129,140,248,0.2); border-color: rgba(129,140,248,0.3); }
    .toggle-all.on::after {
      transform: translateX(18px); background: var(--c-accent);
      box-shadow: 0 0 8px rgba(129,140,248,0.4);
    }
    .toggle-all:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* ── Card Body ── */
    .fan-card { position: relative; padding: 2px 14px; }
    .card-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    }

    .tint {
      transition: opacity var(--t-slow), background var(--t-slow);
    }

    /* ── Fan Row ── */
    .fan-row {
      display: flex; align-items: center; gap: 10px;
      grid-column: 1 / -1;
      padding: 8px 4px; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
    }
    .fan-row.compact { grid-column: span 1; min-width: 0; overflow: hidden; }
    .fan-row.compact-right { padding-left: 10px; }
    .fan-row.compact-right::before {
      content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
    }
    @media (hover: hover) and (pointer: fine) {
      .fan-row:hover { background: var(--s1); }
    }
    @media (pointer: coarse) {
      .fan-row:active { animation: bounce 0.3s ease; }
    }

    /* ── Icon Button ── */
    .fan-icon-btn {
      width: 36px; height: 36px; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast); cursor: pointer; padding: 0; outline: none;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .fan-icon-btn ha-icon {
      --mdc-icon-size: 18px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3); transition: color var(--t-fast), filter var(--t-fast);
    }
    .fan-icon-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
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
      background: rgba(129,140,248,0.1); border-color: rgba(129,140,248,0.15);
    }
    .fan-row.on .fan-icon-btn ha-icon {
      color: var(--c-accent); filter: drop-shadow(0 0 6px rgba(129,140,248,0.4));
    }

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
    }
    .fan-row.on .fan-icon-btn ha-icon.spinning.reverse {
      animation: spin-fan-reverse var(--spin-duration, 2s) linear infinite;
    }

    /* ── Expand Button ── */
    .fan-expand-btn {
      flex: 1; min-width: 0;
      display: flex; align-items: center; gap: 10px;
      background: none; border: none; padding: 0;
      font-family: inherit; cursor: pointer; outline: none;
      text-align: left; color: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .fan-expand-btn:focus-visible {
      outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    /* ── Fan Info ── */
    .fan-info { flex: 1; min-width: 0; }
    .fan-name {
      font-size: 13px; font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden;
    }
    .fan-sub { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .fan-speed-text {
      font-size: 10px; font-weight: 500; color: var(--t3);
      transition: color var(--t-med);
    }
    .fan-row.on .fan-speed-text { color: rgba(129,140,248,0.55); }

    .fan-direction {
      font-size: 10px; font-weight: 400; color: var(--t4);
      display: flex; align-items: center; gap: 3px;
    }
    .fan-direction ha-icon {
      --mdc-icon-size: 11px;
      display: flex; align-items: center; justify-content: center;
    }

    .fan-dot {
      width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: all var(--t-med);
    }
    .fan-row.on .fan-dot {
      background: var(--c-accent); box-shadow: 0 0 8px rgba(129,140,248,0.4);
    }

    /* ── Fold separator ── */
    .fold-sep {
      grid-column: 1 / -1;
      height: 1px; margin: 0 12px; overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(129,140,248,0.2), transparent);
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
      padding: 6px 0 4px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .ctrl-label {
      font-size: 10px; font-weight: 600; letter-spacing: 0.5px;
      color: rgba(129,140,248,0.6); text-transform: uppercase;
    }

    /* ── Speed steps ── */
    .speed-steps { display: flex; gap: 4px; }
    .speed-step {
      flex: 1; height: 36px; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      font-family: inherit; font-size: 11px; font-weight: 700; color: var(--t3);
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 2px 0;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .speed-step:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
    }
    .speed-step:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .speed-step:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .speed-step:active { animation: bounce 0.3s ease; }
    }
    .speed-step.active {
      background: rgba(129,140,248,0.1); border-color: rgba(129,140,248,0.15);
      color: var(--c-accent);
    }
    .speed-step-pct {
      font-size: 7px; font-weight: 600; color: var(--t4);
      letter-spacing: 0.3px; margin-top: 1px;
    }
    .speed-step.active .speed-step-pct { color: rgba(129,140,248,0.55); }

    /* ── Slider ── */
    .slider-wrap { display: flex; align-items: center; gap: 8px; }
    .slider-icon {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; flex-shrink: 0;
    }
    .slider-icon ha-icon {
      --mdc-icon-size: 18px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t3);
    }
    .slider {
      position: relative; flex: 1; height: 36px;
      border-radius: var(--radius-lg); background: var(--s1);
      border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
      touch-action: none; user-select: none; -webkit-user-select: none;
    }
    .slider-fill {
      position: absolute; top: 0; left: 0; height: 100%;
      border-radius: inherit; pointer-events: none;
      transition: width 0.05s linear;
    }
    .slider-fill.accent {
      background: linear-gradient(90deg, rgba(129,140,248,0.15), rgba(129,140,248,0.25));
    }
    .slider-fill.warm {
      background: linear-gradient(90deg, rgba(251,191,36,0.15), rgba(251,191,36,0.3));
    }
    .slider-thumb {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 8px; height: 20px; border-radius: 4px;
      background: rgba(255,255,255,0.7); box-shadow: 0 0 8px rgba(255,255,255,0.2);
      pointer-events: none; transition: left 0.05s linear;
    }
    .slider-val {
      position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
      font-size: 11px; font-weight: 600; color: var(--t3); pointer-events: none;
    }

    /* ── Mode chips ── */
    .mode-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: 11px; font-weight: 600;
      color: var(--t3); cursor: pointer; transition: all var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    .chip ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .chip:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .chip:active { animation: bounce 0.3s ease; }
    }
    .chip.active {
      border-color: rgba(129,140,248,0.15); background: rgba(129,140,248,0.1);
      color: rgba(129,140,248,0.8);
    }

    /* ── Direction toggle ── */
    .direction-row { display: flex; align-items: center; gap: 10px; }
    .direction-label {
      font-size: 11px; font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 6px;
    }
    .direction-label ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }
    .direction-btns {
      display: flex; gap: 0; border-radius: 10px;
      border: 1px solid var(--b2); background: var(--s1); overflow: hidden;
    }
    .dir-btn {
      width: 36px; height: 28px; display: flex;
      align-items: center; justify-content: center;
      background: transparent; border: none; color: var(--t3);
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      font-family: inherit; -webkit-tap-highlight-color: transparent;
    }
    .dir-btn ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) and (pointer: fine) {
      .dir-btn:hover { background: var(--s3); color: var(--t2); }
    }
    .dir-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .dir-btn:active { transform: scale(0.96); }
    }
    @media (pointer: coarse) {
      .dir-btn:active { animation: bounce 0.3s ease; }
    }
    .dir-btn.active { background: rgba(129,140,248,0.1); color: var(--c-accent); }
    .dir-btn + .dir-btn { border-left: 1px solid var(--b1); }

    /* ── Oscillation toggle ── */
    .osc-row { display: flex; align-items: center; gap: 10px; }
    .osc-label {
      font-size: 11px; font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 6px;
    }
    .osc-label ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }
    .toggle-sm {
      position: relative; width: 38px; height: 20px; border-radius: 10px;
      background: var(--s2); border: 1px solid var(--b2);
      cursor: pointer; transition: all var(--t-fast);
      padding: 0; outline: none; font-family: inherit; flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .toggle-sm::after {
      content: ''; position: absolute; top: 2px; left: 2px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--t3); transition: all var(--t-fast);
    }
    .toggle-sm.on { background: rgba(129,140,248,0.2); border-color: rgba(129,140,248,0.3); }
    .toggle-sm.on::after {
      transform: translateX(18px); background: var(--c-accent);
      box-shadow: 0 0 8px rgba(129,140,248,0.4);
    }
    .toggle-sm:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* ── Ceiling light row ── */
    .ceiling-light-row {
      display: flex; align-items: center; gap: 10px; padding: 6px 0;
    }
    .ceiling-light-label {
      font-size: 11px; font-weight: 600; color: var(--t2); flex: 1;
      display: flex; align-items: center; gap: 6px;
    }
    .ceiling-light-label ha-icon {
      --mdc-icon-size: 16px;
      display: flex; align-items: center; justify-content: center;
      opacity: 0.6;
    }

    /* ── Separator ── */
    .ctrl-sep { height: 1px; background: var(--b1); margin: 2px 0; }

    /* ── Empty state ── */
    .empty-state {
      grid-column: 1 / -1;
      padding: 16px; text-align: center; font-size: 12px; color: var(--t4);
    }
  `]}connectedCallback(){super.connectedCallback(),this._listen("fan-config-changed",()=>{this._fanConfigLoaded=!1,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadFanConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._fanConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear();for(const e of this._sliderCleanups)e();this._sliderCleanups=[]}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._fanConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._fanConfigLoaded&&this._loadFanConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedFanIds=void 0,this._fansFingerprint="")}if(e.has("visibleAreaIds")&&(this._cachedFanIds=void 0,this._fansFingerprint="",this._dashboardHiddenLoaded=!1),e.has("hass")&&this._dragValues.size>0){const e=this._getFanInfos();let t=!1;const i=new Map(this._dragValues);for(const a of e){const e=`speed:${a.entityId}`,s=i.get(e);void 0!==s&&Math.abs(a.percentage-s)<=2&&(i.delete(e),t=!0);const r=`light:${a.entityId}`,o=i.get(r);if(void 0!==o&&a.lightEntityId){const e=this.hass?.states[a.lightEntityId];if(e){const a=e.attributes.brightness??0,s=Math.round(a/255*100);Math.abs(s-o)<=2&&(i.delete(r),t=!0)}}}t&&(this._dragValues=i)}}getTrackedEntityIds(){if(this._isDashboardMode&&this.hass&&this.visibleAreaIds?.length&&this.hass.entities&&this.hass.devices){const e=[];for(const t of this.visibleAreaIds)for(const i of Ve(t,this.hass.entities,this.hass.devices))i.entity_id.startsWith("fan.")&&e.push(i.entity_id);return e}return this._getFanInfos().map(e=>e.entityId)}async _loadFanConfig(){if(this.hass&&!this._fanConfigLoaded){this._fanConfigLoaded=!0;try{this._backend||(this._backend=new Ue(this.hass));const e=await this._backend.send("get_config");e?.fan_card&&(this._showHeader=e.fan_card.show_header??!0)}catch{}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new Ue(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new Ue(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds;if(e&&0!==e.length)try{this._backend||(this._backend=new Ue(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedFanIds=void 0,this._fansFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_getFanIds(){return this._cachedFanIds||(this._cachedFanIds=this._computeFanIds()),this._cachedFanIds}_computeFanIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=Ve(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("fan.")&&!e.has(t.entity_id)&&Ne(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),s=e.get(i);return void 0!==a&&void 0!==s?a-s:void 0!==a?-1:void 0!==s?1:0})}return t}if(this._isDashboardMode){const e=this.visibleAreaIds;if(!e||0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of Ve(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("fan.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getFanInfos(){if(!this.hass)return[];const e=this._getFanIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._fansFingerprint&&this._cachedFansResult)return this._cachedFansResult;this._fansFingerprint=t;const i=e.map(e=>{const t=this.hass?.states[e];return t?this._buildFanInfo(e,t):null}).filter(e=>null!==e);return this._isDashboardMode?this._cachedFansResult=i.filter(e=>e.isOn):this._cachedFansResult=i,this._cachedFansResult}_buildFanInfo(e,t){const i=t.attributes,a="on"===t.state,s=i.percentage??0,r=i.percentage_step,o=i.speed_count??(r&&r>0?Math.round(100/r):3),n=i.direction||null,l=i.oscillating||!1,c=i.preset_mode||null,d=i.preset_modes||[],h=i.supported_features||0,p=function(e,t){if("ceiling"===t.attributes.device_class)return!0;const i=e.toLowerCase();return i.includes("ceiling")||i.includes("plafond")||i.includes("plafonnier")}(e,t),u=this.hass?.entities[e]?.icon,_=i.icon,g=u||_||(p?"mdi:ceiling-fan":"mdi:fan"),f=p&&this.hass?function(e,t){const i=e.replace("fan.",""),a=[`light.${i}`,`light.${i}_light`];for(const s of a)if(t.states[s])return s;if(t.entities){const i=t.entities[e];if(i?.device_id)for(const[e,a]of Object.entries(t.entities))if(e.startsWith("light.")&&a.device_id===i.device_id&&t.states[e])return e}return null}(e,this.hass):null,m=!(!!(h&Ft)&&d.length>0||!!(h&qt)||!!(h&jt)||f);return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,icon:g,isCeiling:p,isOn:a,percentage:a?s:0,speedCount:o,direction:n,oscillating:l,presetMode:a?c:null,presetModes:d,supportedFeatures:h,lightEntityId:f,isSimple:m}}_toggleFan(e,t){if(t.stopPropagation(),this.hass)if(e.isOn)this.hass.callService("fan","turn_off",{},{entity_id:e.entityId});else{if(e.supportedFeatures&Dt){const t=Nt(1,e.speedCount);this.hass.callService("fan","turn_on",{percentage:t},{entity_id:e.entityId})}else this.hass.callService("fan","turn_on",{},{entity_id:e.entityId})}}_toggleAll(){if(!this.hass)return;const e=this._getFanInfos(),t=e.some(e=>e.isOn);if(t){const t=e.map(e=>e.entityId);this.hass.callService("fan","turn_off",{},{entity_id:t})}else for(const i of e){if(i.supportedFeatures&Dt){const e=Nt(1,i.speedCount);this.hass.callService("fan","turn_on",{percentage:e},{entity_id:i.entityId})}else this.hass.callService("fan","turn_on",{},{entity_id:i.entityId})}t&&(this._expandedEntity=null)}_setSpeed(e,t){this.hass&&(0!==t?(e.isOn||this.hass.callService("fan","turn_on",{},{entity_id:e.entityId}),this.hass.callService("fan","set_percentage",{percentage:t},{entity_id:e.entityId})):this.hass.callService("fan","turn_off",{},{entity_id:e.entityId}))}_setPresetMode(e,t,i){i.stopPropagation(),this.hass&&(e.presetMode!==t?(e.isOn||this.hass.callService("fan","turn_on",{},{entity_id:e.entityId}),this.hass.callService("fan","set_preset_mode",{preset_mode:t},{entity_id:e.entityId})):e.percentage>0&&this.hass.callService("fan","set_percentage",{percentage:e.percentage},{entity_id:e.entityId}))}_setDirection(e,t,i){i.stopPropagation(),this.hass&&this.hass.callService("fan","set_direction",{direction:t},{entity_id:e.entityId})}_toggleOscillation(e,t){t.stopPropagation(),this.hass&&this.hass.callService("fan","oscillate",{oscillating:!e.oscillating},{entity_id:e.entityId})}_toggleCeilingLight(e,t){if(t.stopPropagation(),!this.hass||!e.lightEntityId)return;const i=this.hass.states[e.lightEntityId],a="on"===i?.state?"turn_off":"turn_on";this.hass.callService("light",a,{},{entity_id:e.lightEntityId})}_hasControls(e){const t=e.supportedFeatures;return!!(t&Dt||t&Ft||t&qt||t&jt||e.lightEntityId)}_toggleExpand(e){this._hasControls(e)?this._expandedEntity=this._expandedEntity===e.entityId?null:e.entityId:this._toggleFan(e,new Event("click"))}_onSpeedSliderDown(e,t){t.stopPropagation();const i=t.currentTarget;i.setPointerCapture(t.pointerId);const a=new AbortController,{signal:s}=a,r=t=>{const a=i.getBoundingClientRect(),s=Math.max(0,Math.min(100,Math.round((t.clientX-a.left)/a.width*100))),r=(o=s,n=e.speedCount,Nt(Vt(o,n),n));var o,n;const l=new Map(this._dragValues);l.set(`speed:${e.entityId}`,r),this._dragValues=l};r(t);const o=()=>{a.abort();try{i.releasePointerCapture(t.pointerId)}catch{}this._sliderCleanups=this._sliderCleanups.filter(e=>e!==o);const s=this._dragValues.get(`speed:${e.entityId}`)??0;this._setSpeed(e,s)};this._sliderCleanups.push(o),i.addEventListener("pointermove",e=>r(e),{signal:s}),i.addEventListener("pointerup",o,{signal:s}),i.addEventListener("pointercancel",o,{signal:s}),i.addEventListener("lostpointercapture",o,{signal:s})}_onLightSliderDown(e,t){if(t.stopPropagation(),!e.lightEntityId||!this.hass)return;const i=t.currentTarget;i.setPointerCapture(t.pointerId);const a=new AbortController,{signal:s}=a,r=e.lightEntityId,o=t=>{const a=i.getBoundingClientRect(),s=Math.max(0,Math.min(100,Math.round((t.clientX-a.left)/a.width*100))),o=new Map(this._dragValues);o.set(`light:${e.entityId}`,s),this._dragValues=o;const n=`light:${e.entityId}`,l=this._throttleTimers.get(n);l&&clearTimeout(l),this._throttleTimers.set(n,setTimeout(()=>{this._throttleTimers.delete(n);const e=this._dragValues.get(n)??s,t=Math.round(e/100*255);this.hass?.callService("light","turn_on",{brightness:t},{entity_id:r})},100))};o(t);const n=()=>{a.abort();try{i.releasePointerCapture(t.pointerId)}catch{}this._sliderCleanups=this._sliderCleanups.filter(e=>e!==n)};this._sliderCleanups.push(n),i.addEventListener("pointermove",e=>o(e),{signal:s}),i.addEventListener("pointerup",n,{signal:s}),i.addEventListener("pointercancel",n,{signal:s}),i.addEventListener("lostpointercapture",n,{signal:s})}render(){this._lang;const e=this._getFanInfos();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",Q;this.style.display=""}if(!this._isDashboardMode&&0===e.length)return K`
        ${this._showHeader?this._renderHeader(0,0):Q}
        <div class="glass fan-card">
          <div class="card-inner">
            <div class="empty-state">${je("fan.no_fans")}</div>
          </div>
        </div>
      `;const t=e.filter(e=>e.isOn).length,i=e.length;return K`
      ${this._showHeader?this._renderHeader(t,i):Q}
      <div class="glass fan-card">
        <div class="tint" style="background:radial-gradient(ellipse at 30% 30%, var(--c-accent), transparent 70%);opacity:${i>0?(t/i*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${this._isDashboardMode?this._renderDashboardGrid(e):this._renderGrid(e)}
        </div>
      </div>
    `}_renderHeader(e,t){const i=e>0,a=0===e?"none":e===t?"all":"some";return K`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${je("fan.title")}</span>
          <span class="card-count ${a}">${e}/${t}</span>
        </div>
        <button
          class="toggle-all ${i?"on":""}"
          @click=${()=>this._toggleAll()}
          aria-label=${je(i?"fan.toggle_all_on_aria":"fan.toggle_all_off_aria")}
          role="switch"
          aria-checked=${i?"true":"false"}
        ></button>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const s=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;if(s){const r=i+2>=e.length;t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(s,!0,!0)),t.push(this._renderControlFold(a,r)),t.push(this._renderControlFold(s,r)),i+=2}else{const s=i+1>=e.length;t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,s)),i++}}else{const s=i+1>=e.length;t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,s)),i++}}return t}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],s=i+1<e.length?e[i+1]:null;if(s){const r=i+2>=e.length;t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(s,!0,!0)),t.push(this._renderControlFold(a,r)),t.push(this._renderControlFold(s,r)),i+=2}else t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,!0)),i++}return t}_renderFanRow(e,t=!1,i=!1){const a=this._dragValues.get(`speed:${e.entityId}`),s=a??e.percentage,r=this._expandedEntity===e.entityId,o=this._hasControls(e);let n;if(o)if(e.isOn||void 0!==a){const t=Vt(s,e.speedCount);n=e.isSimple?je("fan.speed_step_short",{step:String(t),total:String(e.speedCount)}):`${s}% · ${je("fan.speed_step",{step:String(t),total:String(e.speedCount)})}`}else n=je("fan.off");else n=e.isOn?je("common.on"):je("fan.off");const l=["fan-row",e.isOn?"on":"",t?"compact":"",i?"compact-right":""].filter(Boolean).join(" ");return K`
      <div class=${l}>
        <button
          class="fan-icon-btn"
          @click=${t=>this._toggleFan(e,t)}
          aria-label=${je("fan.toggle_aria",{name:e.name})}
        >
          <ha-icon
            .icon=${e.icon}
            class="${e.isOn?"spinning":""} ${e.isOn&&"reverse"===e.direction?"reverse":""}"
            style="${e.isOn?"--spin-duration:"+(c=e.percentage,c<=0?"3s":c<=20?"4s":c<=40?"2.5s":c<=60?"1.6s":c<=80?"1.1s":"0.7s"):""}"
          ></ha-icon>
        </button>
        <button
          class="fan-expand-btn"
          @click=${()=>this._toggleExpand(e)}
          aria-expanded=${o&&r?"true":"false"}
          aria-label=${je(o?"fan.expand_aria":"fan.toggle_aria",{name:e.name})}
        >
          <div class="fan-info">
            <div class="fan-name">${me(e.name,t?12:fe)}</div>
            <div class="fan-sub">
              <span class="fan-speed-text">${n}</span>
              ${e.isOn&&null!==e.direction?K`
                <span class="fan-direction">
                  <ha-icon .icon=${"forward"===e.direction?"mdi:rotate-right":"mdi:rotate-left"}></ha-icon>
                  ${"forward"===e.direction?je("fan.direction_forward"):je("fan.direction_reverse")}
                </span>
              `:Q}
            </div>
          </div>
          <div class="fan-dot"></div>
        </button>
      </div>
    `;var c}_renderControlFold(e,t=!1){const i=this._expandedEntity===e.entityId;return K`
      <div class="fold-sep ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):Q}
        </div>
      </div>
      ${t?Q:K`<div class="fold-sep ${i?"visible":""}"></div>`}
    `}_renderControls(e){const t=e.supportedFeatures,i=!!(t&Dt),a=!!(t&Ft)&&e.presetModes.length>0,s=!!(t&qt),r=!!(t&jt),o=this._dragValues.get(`speed:${e.entityId}`),n=o??e.percentage,l=e.isOn||void 0!==o?Vt(n,e.speedCount):0;return K`
      <div class="ctrl-panel">
        ${e.isSimple?Q:K`<span class="ctrl-label">${e.name}</span>`}

        ${i?K`
          <!-- Speed steps -->
          <div class="speed-steps">
            ${Array.from({length:e.speedCount},(t,i)=>{const a=i+1,s=Nt(a,e.speedCount),r=function(e,t){return Math.round(Nt(e,t))}(a,e.speedCount);return K`
                <button
                  class="speed-step ${l===a?"active":""}"
                  @click=${t=>{t.stopPropagation(),this._setSpeed(e,s)}}
                  aria-label=${je("fan.speed_step_aria",{step:String(a),pct:String(r)})}
                >
                  <span>${a}</span>
                  <span class="speed-step-pct">${r}%</span>
                </button>
              `})}
          </div>

          ${e.isSimple?Q:K`
            <!-- Speed slider (complex fans only) -->
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${"mdi:speedometer"}></ha-icon></div>
              <div class="slider" @pointerdown=${t=>this._onSpeedSliderDown(e,t)}>
                <div class="slider-fill accent" style="width:${n}%;"></div>
                <div class="slider-thumb" style="left:${n}%;"></div>
                <div class="slider-val">${n}%</div>
              </div>
            </div>
          `}
        `:Q}

        ${a?K`
          <!-- Preset modes -->
          <div class="mode-row">
            ${e.presetModes.map(t=>K`
              <button
                class="chip ${e.presetMode===t?"active":""}"
                @click=${i=>this._setPresetMode(e,t,i)}
                aria-label=${Bt(t)}
              >
                <ha-icon .icon=${Ht[t.toLowerCase()]||"mdi:cog"}></ha-icon>
                <span>${Bt(t)}</span>
              </button>
            `)}
          </div>
        `:Q}

        ${s?K`
          <div class="ctrl-sep"></div>
          <!-- Direction -->
          <div class="direction-row">
            <div class="direction-label">
              <ha-icon .icon=${"mdi:rotate-3d-variant"}></ha-icon>
              ${je("fan.direction")}
            </div>
            <div class="direction-btns">
              <button
                class="dir-btn ${"forward"===e.direction?"active":""}"
                @click=${t=>this._setDirection(e,"forward",t)}
                aria-label=${je("fan.direction_forward_aria")}
              >
                <ha-icon .icon=${"mdi:rotate-right"}></ha-icon>
              </button>
              <button
                class="dir-btn ${"reverse"===e.direction?"active":""}"
                @click=${t=>this._setDirection(e,"reverse",t)}
                aria-label=${je("fan.direction_reverse_aria")}
              >
                <ha-icon .icon=${"mdi:rotate-left"}></ha-icon>
              </button>
            </div>
          </div>
        `:Q}

        ${r?K`
          <!-- Oscillation -->
          <div class="osc-row">
            <div class="osc-label">
              <ha-icon .icon=${"mdi:arrow-left-right"}></ha-icon>
              ${je("fan.oscillation")}
            </div>
            <button
              class="toggle-sm ${e.oscillating?"on":""}"
              @click=${t=>this._toggleOscillation(e,t)}
              role="switch"
              aria-checked=${e.oscillating?"true":"false"}
              aria-label=${je("fan.oscillation_aria")}
            ></button>
          </div>
        `:Q}

        ${e.lightEntityId?this._renderCeilingLight(e):Q}
      </div>
    `}_renderCeilingLight(e){if(!e.lightEntityId||!this.hass)return Q;const t=this.hass.states[e.lightEntityId];if(!t)return Q;const i="on"===t.state,a=t.attributes.brightness??0,s=this._dragValues.get(`light:${e.entityId}`)??(i?Math.round(a/255*100):0);return K`
      <div class="ctrl-sep"></div>
      <!-- Ceiling light -->
      <div class="ceiling-light-row">
        <div class="ceiling-light-label">
          <ha-icon .icon=${"mdi:lightbulb-outline"}></ha-icon>
          ${je("fan.ceiling_light")}
        </div>
        <button
          class="toggle-sm ${i?"on":""}"
          @click=${t=>this._toggleCeilingLight(e,t)}
          role="switch"
          aria-checked=${i?"true":"false"}
          aria-label=${je("fan.ceiling_light_aria")}
        ></button>
      </div>
      ${i?K`
        <div class="slider-wrap">
          <div class="slider-icon"><ha-icon .icon=${"mdi:brightness-6"}></ha-icon></div>
          <div class="slider" @pointerdown=${t=>this._onLightSliderDown(e,t)}>
            <div class="slider-fill warm" style="width:${s}%;"></div>
            <div class="slider-thumb" style="left:${s}%;"></div>
            <div class="slider-val">${s}%</div>
          </div>
        </div>
      `:Q}
    `}}Rt([Ae({attribute:!1})],Wt.prototype,"areaId"),Rt([Ae({attribute:!1})],Wt.prototype,"visibleAreaIds"),Rt([Le()],Wt.prototype,"_expandedEntity"),Rt([Le()],Wt.prototype,"_dragValues"),Rt([Le()],Wt.prototype,"_showHeader");try{customElements.define("glass-fan-card",Wt)}catch{}var Kt=Object.defineProperty,Gt=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Kt(t,i,r),r};const Xt={success:{text:"var(--c-success)",dot:"var(--c-success)",glow:"rgba(74,222,128,0.5)"},warning:{text:"var(--c-warning)",dot:"var(--c-warning)",glow:"rgba(251,191,36,0.5)"},info:{text:"var(--c-info)",dot:"var(--c-info)",glow:"rgba(96,165,250,0.5)"},accent:{text:"var(--c-accent)",dot:"var(--c-accent)",glow:"rgba(129,140,248,0.5)"},alert:{text:"var(--c-alert)",dot:"var(--c-alert)",glow:"rgba(248,113,113,0.5)"},neutral:{text:"var(--t3)",dot:"var(--t4)",glow:"none"}},Qt={input_select:"title_card.group_mode",scenes:"title_card.group_scenes",booleans:"title_card.group_toggles"};function Yt(e){if(Xt[e])return Xt[e];if(e.startsWith("#")&&7===e.length){const t=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16);return{text:e,dot:e,glow:`rgba(${t},${i},${a},0.5)`}}return Xt.neutral}class Jt extends He{constructor(){super(...arguments),this._foldOpen=!1,this._activatingSceneId=null,this._titleConfig={title:"",sources:[]},this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._sceneTimeout=0,this._boundClickOutside=this._onClickOutside.bind(this)}static{this.styles=[ue,ve,c`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    .title-card {
      display: flex; flex-direction: column; align-items: center;
      gap: 4px; padding: 4px 16px 0;
      text-align: center;
    }

    .title-text {
      font-size: 22px; font-weight: 700; color: var(--t1);
      letter-spacing: -0.3px; line-height: 1.2;
      display: flex; align-items: center; gap: 14px;
      width: 100%;
    }
    .title-text::before, .title-text::after {
      content: ''; flex: 1; height: 1px;
      background: linear-gradient(90deg, transparent, var(--b3));
    }
    .title-text::after {
      background: linear-gradient(90deg, var(--b3), transparent);
    }

    /* ── Dash trigger ── */
    .dash-trigger {
      display: flex; align-items: center; justify-content: center;
      padding: 4px 16px;
      cursor: pointer; border: none; background: none; outline: none;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--radius-full);
      transition: all var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .dash-trigger:hover { background: var(--s1); }
    }
    .dash-trigger:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
    @media (pointer: coarse) {
      .dash-trigger:active { transform: scale(0.96); }
    }

    .dash-line {
      width: 20px; height: 2px; border-radius: 1px;
      background: var(--t4);
      transition: all var(--t-med);
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
      height: 1px; width: 80%; margin: 4px auto;
      background: linear-gradient(90deg, transparent, var(--b3), transparent);
    }

    /* ── Chips group ── */
    .chips-group-label {
      font-size: 9px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 1px; color: var(--t4);
      text-align: center; padding: 6px 0 2px;
    }
    .chips-group + .chips-group .chips-group-label {
      border-top: 1px solid var(--b1);
      margin: 0 20%; padding-top: 8px;
    }

    .chips-row {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 6px; padding: 4px 4px 8px;
    }

    /* ── Chip ── */
    .chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: var(--radius-md);
      border: 1px solid var(--b2); background: var(--s1);
      font-family: inherit; font-size: 11px; font-weight: 600;
      color: var(--t3); cursor: pointer; transition: all var(--t-fast);
      outline: none; -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
    }
    .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
    .chip ha-icon {
      --mdc-icon-size: 14px;
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
  `]}connectedCallback(){super.connectedCallback(),this._listen("title-config-changed",()=>this._loadConfig()),document.addEventListener("click",this._boundClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundClickOutside),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++,this._sceneTimeout&&(clearTimeout(this._sceneTimeout),this._sceneTimeout=0)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++),this._configLoaded||this._configLoading||(this._configLoading=!0,this._backend=new Ue(this.hass),this._loadConfig()))}getTrackedEntityIds(){const e=[];for(const t of this._titleConfig.sources)if("input_select"===t.source_type&&t.entity)e.push(t.entity);else for(const i of t.modes)i.id.includes(".")&&e.push(i.id);return e}async _loadConfig(){if(!this._backend)return;const e=this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.title_card&&(this._titleConfig=t.title_card),this._configLoaded=!0,this._configLoading=!1,this.requestUpdate()}catch{e===this._loadVersion&&(this._configLoading=!1)}}_dashStyle(e){if(0===e.length)return"";const t=e.map(e=>Yt(e)),i="width:"+Math.min(20+4*e.length,36)+"px";if(1===t.length)return`background:${t[0].dot};box-shadow:0 0 8px ${t[0].glow};${i}`;const a=t.length,s=t.flatMap((e,t)=>[`${e.dot} ${Math.round(t/a*100)}%`,`${e.dot} ${Math.round((t+1)/a*100)}%`]).join(", "),r=t.filter(e=>"none"!==e.glow);return`background:linear-gradient(90deg, ${s});box-shadow:${r.length>0?r.map(e=>`0 0 6px ${e.glow}`).join(", "):"none"};${i}`}_getActiveColors(e){if("input_select"===e.source_type){if(!e.entity||!this.hass)return[];const t=this.hass.states[e.entity];if(!t)return[];const i=e.modes.find(e=>e.id===t.state),a=i?.color||"neutral";return"neutral"!==a?[a]:[]}if("booleans"===e.source_type){if(!this.hass)return[];const t=[];for(const i of e.modes)if("on"===this.hass.states[i.id]?.state){const e=i.color||"success";"neutral"!==e&&t.push(e)}return t}if(this._activatingSceneId){const t=e.modes.find(e=>e.id===this._activatingSceneId);if(t)return[t.color||"accent"]}return[]}_isChipActive(e,t,i){return"input_select"===e.source_type?!(!e.entity||!this.hass)&&this.hass.states[e.entity]?.state===t.id:"booleans"===e.source_type?"on"===this.hass?.states[t.id]?.state:"scenes"===e.source_type&&this._activatingSceneId===t.id}_selectOption(e,t){e.entity&&this.hass&&this.hass.callService("input_select","select_option",{option:t},{entity_id:e.entity})}_activateScene(e){this.hass&&(this.hass.callService("scene","turn_on",{},{entity_id:e}),this._activatingSceneId=e,this._sceneTimeout&&clearTimeout(this._sceneTimeout),this._sceneTimeout=window.setTimeout(()=>{this._activatingSceneId=null,this._sceneTimeout=0},2e3),this.updateComplete.then(()=>{const t=this.shadowRoot?.querySelector(`.chip[data-id="${e}"]`);t&&(t.classList.add("pulsing"),setTimeout(()=>t.classList.remove("pulsing"),600))}))}_toggleBoolean(e){this.hass&&this.hass.callService("input_boolean","toggle",{},{entity_id:e})}_toggleFold(){this._foldOpen=!this._foldOpen}_onClickOutside(e){if(!this._foldOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelector(".dash-trigger"),s=i.querySelector(".fold-section");a&&s&&!t.includes(a)&&!t.includes(s)&&(this._foldOpen=!1)}render(){this._lang;const e=this._titleConfig.title;if(!e)return this.style.display="none",Q;this.style.display="";const t=this._titleConfig.sources,i=t.length>0&&t.some(e=>e.modes.length>0),a=[];if(i)for(const r of t)a.push(...this._getActiveColors(r));const s=a.length>0?this._dashStyle(a):"";return K`
      <div class="title-card">
        <div class="title-text">${e}</div>
        ${i?K`
          <button
            class="dash-trigger"
            @click=${()=>this._toggleFold()}
            aria-label=${je("title_card.toggle_modes_aria")}
            aria-expanded=${this._foldOpen?"true":"false"}
          >
            <div
              class="dash-line"
              style="${s}"
            ></div>
          </button>
          <div class="fold-section ${this._foldOpen?"open":""}">
            <div class="fold-section-inner">
              <div class="fold-sep"></div>
              ${t.map((e,i)=>this._renderSourceGroup(e,i,t.length>1))}
            </div>
          </div>
        `:Q}
      </div>
    `}_renderSourceGroup(e,t,i){if(0===e.modes.length)return Q;const a=Qt[e.source_type],s=e.label||(a?je(a):e.source_type);return K`
      <div class="chips-group">
        ${i?K`<div class="chips-group-label">${s}</div>`:Q}
        <div class="chips-row">
          ${e.modes.map((t,i)=>{const a=this._isChipActive(e,t,i),s=Yt(t.color||"neutral");return K`
              <button
                class="chip"
                data-id=${t.id}
                style="${a?`color:${s.text};background:${s.dot}14;border-color:${s.dot}33;`:""}"
                aria-label=${t.label||t.id}
                ${"booleans"===e.source_type?K``:Q}
                @click=${a=>{a.stopPropagation(),this._onChipClick(e,t,i)}}
              >
                ${t.icon?K`<ha-icon .icon=${t.icon}></ha-icon>`:Q}
                ${t.label||t.id.split(".")[1]||t.id}
              </button>
            `})}
        </div>
      </div>
    `}_onChipClick(e,t,i){"input_select"===e.source_type?this._selectOption(e,t.id):"scenes"===e.source_type?this._activateScene(t.id):"booleans"===e.source_type&&this._toggleBoolean(t.id)}}Gt([Le()],Jt.prototype,"_foldOpen"),Gt([Le()],Jt.prototype,"_activatingSceneId");try{customElements.define("glass-title-card",Jt)}catch{}var Zt=Object.defineProperty,ei=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Zt(t,i,r),r};function ti(e,t=300){if(!e)return"";const i=e.images??e.album?.images??[];if(0===i.length)return"";const a=[...i].sort((e,i)=>Math.abs((e.width??300)-t)-Math.abs((i.width??300)-t));return a[0]?.url??""}function ii(e){return e&&e.artists?.length?e.artists.map(e=>e.name).join(", "):""}function ai(e){switch(e){case"track":default:return"mdi:music-note";case"playlist":return"mdi:playlist-music";case"album":return"mdi:album";case"show":case"podcast":case"episode":return"mdi:podcast"}}class si extends He{constructor(){super(...arguments),this._view="library",this._tab="all",this._searchQuery="",this._playlists=[],this._recentlyPlayed=[],this._savedTracks=[],this._savedShows=[],this._searchResults={tracks:[],playlists:[],shows:[]},this._searchLoading=!1,this._searchOffset=0,this._searchHasMore=!1,this._searchVersion=0,this._drilldown=null,this._speakers=[],this._pickerItem=null,this._selectedSpeakers=new Set,this._error=null,this._libraryLoading=!1,this._spotifyConfigured=null,this._foldOpen=!1,this._savedMap=new Map,this._sectionTotals={},this._loadingMore={},this._spotifyConfig={entity_id:"",show_header:!0,sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},this._configLoaded=!1,this._configLoadingInProgress=!1,this._loadVersion=0,this._radioQueueVersion=0,this._debounceTimer=0}static{this.styles=[ue,_e,ve,be,c`
    :host { display: block; width: 100%; max-width: 500px; margin: 0 auto; font-family: 'Plus Jakarta Sans', sans-serif; }

    .spotify-card-wrap { display: flex; flex-direction: column; gap: 6px; }

    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 0 6px; min-height: 22px; }
    .card-header-left { display: flex; align-items: center; gap: 8px; }
    .card-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4); display: flex; align-items: center; gap: 4px;
    }
    .card-title ha-icon { color: #1DB954; --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }

    .spotify-card { position: relative; width: 100%; padding: 14px; box-sizing: border-box; overflow: hidden; }
    .card-inner { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 0; }

    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse at 20% 20%, rgba(29,185,84,0.12), transparent 70%);
      opacity: 0.6;
    }

    /* Search */
    .search-row { display: flex; gap: 6px; align-items: center; }
    .search-input-wrap { position: relative; flex: 1; }
    .search-input {
      width: 100%; height: 36px; padding: 0 36px 0 34px;
      border-radius: var(--radius-lg); background: var(--s2);
      border: 1px solid var(--b2); color: var(--t1);
      font-family: inherit; font-size: 12px; font-weight: 500;
      outline: none; transition: all var(--t-fast);
      -webkit-tap-highlight-color: transparent; box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--t4); }
    .search-input:focus { border-color: rgba(29,185,84,0.3); background: var(--s3); box-shadow: 0 0 0 2px rgba(29,185,84,0.1); }
    .search-icon {
      position: absolute; top: 50%; left: 10px; transform: translateY(-50%);
      pointer-events: none; display: flex; align-items: center; justify-content: center;
    }
    .search-icon ha-icon { --mdc-icon-size: 16px; color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .search-clear {
      position: absolute; top: 50%; right: 30px; transform: translateY(-50%);
      width: 24px; height: 24px; border-radius: 6px;
      background: transparent; border: none;
      display: none; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
    }
    .search-clear.visible { display: flex; }
    .search-clear ha-icon { --mdc-icon-size: 14px; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .search-clear:hover { background: var(--s3); } }
    @media (hover: none) { .search-clear:active { animation: bounce 0.3s ease; } }
    .search-clear:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    /* Fold toggle arrow (inside search bar) */
    .search-toggle {
      position: absolute; top: 50%; right: 6px; transform: translateY(-50%);
      width: 24px; height: 24px; border-radius: 6px;
      background: transparent; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      transition: all var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .search-toggle ha-icon {
      --mdc-icon-size: 14px; color: var(--t4);
      display: flex; align-items: center; justify-content: center;
      transition: transform var(--t-fast), color var(--t-fast);
    }
    @media (hover: hover) { .search-toggle:hover { background: var(--s3); } }
    @media (hover: hover) { .search-toggle:hover ha-icon { color: var(--t2); } }
    @media (hover: none) { .search-toggle:active { animation: bounce 0.3s ease; } }
    .search-toggle:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    .search-toggle.open ha-icon { transform: rotate(180deg); color: #1DB954; }

    /* Content fold (CSS Grid 0fr/1fr) */
    .sp-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .sp-fold.open { grid-template-rows: 1fr; }
    .sp-fold-inner {
      overflow: hidden; opacity: 0; min-height: 0;
      transition: opacity var(--t-fast) 0s;
      display: flex; flex-direction: column; gap: 10px;
    }
    .sp-fold.open .sp-fold-inner { padding-top: 10px; }
    .sp-fold.open .sp-fold-inner {
      opacity: 1;
      transition: opacity var(--t-fast) 0.1s;
    }

    /* Fold separator */
    .sp-fold-sep {
      height: 1px; margin: 2px 12px 0;
      background: linear-gradient(90deg, transparent, rgba(29,185,84,0.15), transparent);
      opacity: 0; transition: opacity var(--t-fast);
    }
    .sp-fold.open + .sp-fold-sep { opacity: 1; }

    /* Tabs */
    .tab-bar {
      display: flex; gap: 0; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1); overflow: hidden;
    }
    .tab-btn {
      flex: 1; height: 30px;
      display: flex; align-items: center; justify-content: center; gap: 4px;
      background: transparent; border: none; color: var(--t3);
      font-family: inherit; font-size: 10px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.6px;
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn ha-icon { --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .tab-btn:hover { background: var(--s2); color: var(--t2); } }
    .tab-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
    @media (hover: hover) { .tab-btn:active { transform: scale(0.96); } }
    @media (hover: none) { .tab-btn:active { animation: bounce 0.3s ease; } }
    .tab-btn.active { background: rgba(29,185,84,0.1); color: #1DB954; }
    .tab-btn + .tab-btn { border-left: 1px solid var(--b1); }

    /* Content area */
    .content-area {
      display: flex; flex-direction: column; gap: 6px;
      max-height: 380px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
    }
    .content-area::-webkit-scrollbar { display: none; }

    /* Section title */
    .section-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.2px; color: var(--t4); padding: 4px 2px 2px; flex-shrink: 0;
    }

    /* Result row */
    .result-row {
      display: flex; align-items: center; gap: 10px;
      padding: 6px 4px; cursor: pointer; position: relative;
      transition: background var(--t-fast); border-radius: var(--radius-md);
      flex-shrink: 0; background: none; border: none; width: 100%; box-sizing: border-box;
      font-family: inherit; text-align: left; color: inherit; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) { .result-row:hover { background: var(--s1); } }
    @media (hover: hover) { .result-row:active { transform: scale(0.99); } }
    @media (hover: none) { .result-row:active { animation: bounce 0.3s ease; } }
    .result-row:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .result-art {
      width: 42px; height: 42px; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative;
    }
    .result-art.round { border-radius: 50%; }
    .result-art img { width: 100%; height: 100%; object-fit: cover; }
    .result-art ha-icon { --mdc-icon-size: 18px; color: var(--t4); display: flex; align-items: center; justify-content: center; }

    .result-info { flex: 1; min-width: 0; }
    .result-title {
      font-size: 12px; font-weight: 600; color: var(--t1); line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .result-meta {
      font-size: 10px; font-weight: 500; color: var(--t3); margin-top: 1px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      display: flex; align-items: center; gap: 4px;
    }
    .result-type-badge {
      font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
      padding: 1px 4px; border-radius: 9999px;
      background: var(--s3); color: var(--t4); flex-shrink: 0;
    }

    .result-play {
      width: 32px; height: 32px; border-radius: 50%;
      background: #1DB954; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
      -webkit-tap-highlight-color: transparent;
      opacity: 0; transform: scale(0.8); flex-shrink: 0;
    }
    .result-play ha-icon { --mdc-icon-size: 16px; color: #000; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .result-row:hover .result-play { opacity: 1; transform: scale(1); } }
    @media (hover: hover) { .result-play:active { transform: scale(0.92); } }
    @media (hover: none) { .result-play:active { animation: bounce 0.3s ease; } }
    .result-play:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* Playlist grid (horizontal scroll) */
    .playlist-scroll {
      display: flex; gap: 8px; overflow-x: auto; overflow-y: hidden;
      padding: 2px 2px 4px; margin: 0 -2px; scrollbar-width: none; flex-shrink: 0;
    }
    .playlist-scroll::-webkit-scrollbar { display: none; }

    .playlist-card {
      flex-shrink: 0; width: 84px;
      display: flex; flex-direction: column; gap: 6px;
      cursor: pointer; padding: 0; background: none; border: none;
      outline: none; text-align: left; font-family: inherit;
      -webkit-tap-highlight-color: transparent; color: inherit;
    }
    @media (hover: hover) { .playlist-card:active { transform: scale(0.97); } }
    @media (hover: none) { .playlist-card:active { animation: bounce 0.3s ease; } }
    .playlist-card:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    .playlist-art {
      width: 84px; height: 84px; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative; transition: border-color var(--t-fast);
    }
    @media (hover: hover) { .playlist-card:hover .playlist-art { border-color: var(--b3); } }
    .playlist-art img { width: 100%; height: 100%; object-fit: cover; }
    .playlist-art ha-icon { --mdc-icon-size: 32px; color: rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; }

    .playlist-art-play {
      position: absolute; bottom: 6px; right: 6px;
      width: 28px; height: 28px; border-radius: 50%;
      background: #1DB954;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: translateY(4px);
      transition: all var(--t-fast);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      pointer-events: none;
    }
    .playlist-art-play ha-icon { --mdc-icon-size: 14px; color: #000; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) {
      .playlist-card:hover .playlist-art-play { opacity: 1; transform: translateY(0); }
    }

    .playlist-name {
      font-size: 10px; font-weight: 600; color: var(--t2); line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .playlist-count { font-size: 9px; font-weight: 500; color: var(--t4); }

    /* Drilldown header */
    .drilldown-header {
      display: flex; align-items: center; justify-content: space-between;
    }

    /* Back button */
    .back-btn {
      display: flex; align-items: center; gap: 4px;
      background: none; border: none; color: var(--t3);
      font-family: inherit; font-size: 11px; font-weight: 600;
      cursor: pointer; padding: 4px 2px; outline: none;
      -webkit-tap-highlight-color: transparent;
      transition: color var(--t-fast);
    }
    .back-btn ha-icon { --mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .back-btn:hover { color: var(--t1); } }
    @media (hover: none) { .back-btn:active { animation: bounce 0.3s ease; } }
    .back-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* Play all button */
    .play-all-btn {
      display: flex; align-items: center; gap: 4px;
      background: rgba(30, 215, 96, 0.12); border: none; color: #1ed760;
      font-family: inherit; font-size: 11px; font-weight: 600;
      cursor: pointer; padding: 4px 10px; border-radius: var(--radius-full);
      outline: none; -webkit-tap-highlight-color: transparent;
      transition: background var(--t-fast), color var(--t-fast);
    }
    .play-all-btn ha-icon { --mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .play-all-btn:hover { background: rgba(30, 215, 96, 0.22); } }
    @media (hover: none) { .play-all-btn:active { animation: bounce 0.3s ease; } }
    .play-all-btn:focus-visible { outline: 2px solid rgba(30, 215, 96, 0.4); outline-offset: 2px; }

    /* Empty & error states */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 16px; gap: 8px;
    }
    .empty-state ha-icon { --mdc-icon-size: 32px; color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .empty-state-text { font-size: 11px; font-weight: 500; color: var(--t4); text-align: center; }

    .error-banner {
      padding: 8px 12px; border-radius: var(--radius-md);
      background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.2);
      font-size: 11px; font-weight: 500; color: var(--c-alert);
    }

    .setup-banner {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      padding: 24px 16px; text-align: center;
    }
    .setup-banner ha-icon { --mdc-icon-size: 40px; color: #1DB954; display: flex; align-items: center; justify-content: center; }
    .setup-banner-text { font-size: 12px; color: var(--t3); line-height: 1.5; }
    .setup-link {
      font-size: 11px; font-weight: 600; color: #1DB954;
      background: rgba(29,185,84,0.1); border: 1px solid rgba(29,185,84,0.2);
      border-radius: var(--radius-md); padding: 6px 14px;
      cursor: pointer; text-decoration: none; outline: none;
      -webkit-tap-highlight-color: transparent; transition: all var(--t-fast);
    }
    @media (hover: hover) { .setup-link:hover { background: rgba(29,185,84,0.2); } }
    @media (hover: none) { .setup-link:active { animation: bounce 0.3s ease; } }
    .setup-link:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    /* Load more button */
    .load-more-btn {
      display: flex; align-items: center; justify-content: center;
      padding: 8px; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      color: var(--t3); font-family: inherit; font-size: 11px; font-weight: 600;
      cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent;
      transition: all var(--t-fast); flex-shrink: 0;
    }
    @media (hover: hover) { .load-more-btn:hover { background: var(--s2); color: var(--t1); } }
    @media (hover: none) { .load-more-btn:active { animation: bounce 0.3s ease; } }
    .load-more-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    /* Speaker picker overlay */
    .picker-backdrop {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 16px; padding-bottom: 80px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .picker-backdrop.visible { opacity: 1; pointer-events: auto; }

    .speaker-picker {
      width: 100%; max-width: 400px;
      padding: 16px;
      max-height: calc(100dvh - 160px);
      display: flex; flex-direction: column;
      transform: translateY(20px);
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
    }
    .picker-backdrop.visible .speaker-picker { transform: translateY(0); }

    .picker-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .picker-title { font-size: 13px; font-weight: 700; color: var(--t1); }
    .picker-close {
      width: 28px; height: 28px; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none; transition: all var(--t-fast);
    }
    .picker-close ha-icon { --mdc-icon-size: 16px; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .picker-close:hover { background: var(--s3); } }
    @media (hover: none) { .picker-close:active { animation: bounce 0.3s ease; } }
    .picker-close:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .picker-track {
      display: flex; align-items: center; gap: 10px;
      padding: 8px; margin-bottom: 12px;
      background: var(--s1); border-radius: var(--radius-md); border: 1px solid var(--b1);
    }
    .picker-track-art {
      width: 40px; height: 40px; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--s2); display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .picker-track-art img { width: 100%; height: 100%; object-fit: cover; }
    .picker-track-art ha-icon { --mdc-icon-size: 18px; color: var(--t4); display: flex; align-items: center; justify-content: center; }
    .picker-track-info { flex: 1; min-width: 0; }
    .picker-track-title { font-size: 12px; font-weight: 600; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .picker-track-artist { font-size: 10px; font-weight: 500; color: var(--t3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .picker-speakers {
      display: flex; flex-direction: column; gap: 4px;
      overflow-y: auto; flex: 1; min-height: 0;
      scrollbar-width: none;
    }
    .picker-speakers::-webkit-scrollbar { display: none; }
    .picker-speaker {
      display: flex; align-items: center; gap: 10px;
      padding: 8px; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      cursor: pointer; transition: all var(--t-fast);
      font-family: inherit; outline: none; width: 100%;
      -webkit-tap-highlight-color: transparent; color: inherit;
      flex-shrink: 0;
    }
    .picker-speaker.selected { border-color: rgba(29,185,84,0.4); background: rgba(29,185,84,0.08); }
    @media (hover: hover) { .picker-speaker:hover { background: var(--s3); border-color: var(--b2); } }
    @media (hover: hover) { .picker-speaker:active { transform: scale(0.98); } }
    @media (hover: none) { .picker-speaker:active { animation: bounce 0.3s ease; } }
    .picker-speaker:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .picker-speaker-icon {
      width: 32px; height: 32px; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-icon { background: rgba(29,185,84,0.15); border-color: rgba(29,185,84,0.3); }
    .picker-speaker-icon ha-icon { --mdc-icon-size: 16px; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    .picker-speaker.selected .picker-speaker-icon ha-icon { color: #1DB954; }
    .picker-speaker-name { flex: 1; font-size: 12px; font-weight: 600; color: var(--t2); }
    .picker-speaker-status { font-size: 9px; font-weight: 500; color: var(--t4); white-space: nowrap; }
    .picker-speaker-status.playing { color: rgba(29,185,84,0.6); }
    .picker-speaker-check {
      width: 20px; height: 20px; border-radius: 50%;
      border: 2px solid var(--b2); background: transparent;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      transition: all var(--t-fast);
    }
    .picker-speaker.selected .picker-speaker-check { border-color: #1DB954; background: #1DB954; }
    .picker-speaker-check ha-icon { --mdc-icon-size: 14px; color: #fff; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity var(--t-fast); }
    .picker-speaker.selected .picker-speaker-check ha-icon { opacity: 1; }

    .picker-play-bar {
      display: flex; gap: 8px; padding-top: 8px; flex-shrink: 0;
    }
    .picker-play-btn {
      flex: 1; padding: 10px; border-radius: var(--radius-md);
      border: none; cursor: pointer; font-family: inherit; font-size: 12px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      transition: all var(--t-fast); outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .picker-play-btn.primary { background: #1DB954; color: #fff; }
    .picker-play-btn.primary:disabled { opacity: 0.4; cursor: default; }
    @media (hover: hover) { .picker-play-btn.primary:not(:disabled):hover { background: #1ed760; } }
    .picker-play-btn.primary ha-icon { --mdc-icon-size: 18px; display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .picker-play-btn:active:not(:disabled) { transform: scale(0.98); } }
    @media (hover: none) { .picker-play-btn:active:not(:disabled) { animation: bounce 0.3s ease; } }

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
      width: 24px; height: 24px;
      border-radius: var(--radius-sm);
      background: transparent; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
      color: var(--t3); flex-shrink: 0;
      transition: transform var(--t-fast), color var(--t-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .heart-btn ha-icon {
      --mdc-icon-size: 16px;
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
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .items-count {
      font-size: 10px;
      color: var(--t3);
    }

    /* Loading spinner placeholder */
    .loading-text { font-size: 11px; color: var(--t4); text-align: center; padding: 16px 0; }
  `]}getTrackedEntityIds(){const e=this._getEntityId(),t=e?[e]:[];return this._spotifyConfig?.entity_id&&!t.includes(this._spotifyConfig.entity_id)&&t.push(this._spotifyConfig.entity_id),t}_isNowPlaying(e){const t=this._spotifyConfig?.entity_id;if(!t)return!1;const i=this.hass?.states[t];return!(!i||"playing"!==i.state)&&(i.attributes.media_content_id??"")===e}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._spotifyConfig.entity_id)return this._spotifyConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("media_player.spotify"));if(e)return e}return""}connectedCallback(){super.connectedCallback(),this._listen("spotify-config-changed",()=>{this._configLoaded=!1,this._loadConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._debounceTimer&&clearTimeout(this._debounceTimer),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}_collapseExpanded(){"speaker_picker"!==this._view?(this._foldOpen&&(this._foldOpen=!1),this._drilldown&&(this._drilldown=null,this._view=this._searchQuery?"search":"library")):this._closePicker()}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new Ue(this.hass),this._loadConfig()))}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;if(t?.spotify_card&&(this._spotifyConfig=t.spotify_card),this._configLoaded=!0,await this._checkSpotifyStatus(),e!==this._loadVersion)return;this._spotifyConfigured&&this._loadLibrary(),this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}async _checkSpotifyStatus(){if(this._backend)try{const e=await this._backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}async _loadLibrary(){if(!this._backend)return;this._libraryLoading=!0,this._error=null;const e=this._spotifyConfig.max_items_per_section;try{const[t,i,a,s]=await Promise.all([this._backend.send("spotify_browse",{category:"playlists",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"recently_played",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_tracks",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_shows",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order})]);this._playlists=(t?.items??[]).filter(Boolean),this._recentlyPlayed=(i?.items??[]).filter(Boolean),this._savedTracks=(a?.items??[]).filter(Boolean),this._savedShows=(s?.items??[]).filter(Boolean).map(e=>e.show??e),this._sectionTotals={playlists:t?.total??0,recently_played:i?.total??0,saved_tracks:a?.total??0,saved_shows:s?.total??0};const r=[];for(const e of this._recentlyPlayed){const t=e.track??e;!t.id||"track"!==t.type&&t.type||r.push(t.id)}for(const e of this._savedTracks){const t=e.track??e;t.id&&r.push(t.id)}r.length&&this._checkSavedStatus(r)}catch(t){this._handleApiError(t)}finally{this._libraryLoading=!1}}_onSearchInput(e){const t=e.target.value;if(this._searchQuery=t,this._debounceTimer&&clearTimeout(this._debounceTimer),0===t.length)return this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},void(this._searchOffset=0);this._foldOpen||(this._foldOpen=!0),this._view="search",this._debounceTimer=window.setTimeout(()=>this._doSearch(!1),300)}_clearSearch(){this._searchQuery="",this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},this._searchOffset=0,this._foldOpen=!1}async _doSearch(e){if(!this._backend||!this._searchQuery)return;const t=++this._searchVersion;this._searchLoading=!0,this._error=null;const i=e?this._searchOffset:0;try{let a;a="tracks"===this._tab?["track"]:"playlists"===this._tab?["playlist"]:"podcasts"===this._tab?["show"]:["track","playlist","show"];const s=await this._backend.send("spotify_search",{query:this._searchQuery,types:a,limit:12,offset:i});if(t!==this._searchVersion)return;const r=(s?.tracks?.items??[]).filter(Boolean),o=(s?.playlists?.items??[]).filter(Boolean),n=(s?.shows?.items??[]).filter(Boolean);this._searchResults=e?{tracks:[...this._searchResults.tracks,...r],playlists:[...this._searchResults.playlists,...o],shows:[...this._searchResults.shows,...n]}:{tracks:r,playlists:o,shows:n},this._searchOffset=i+12;const l=(s?.tracks?.total??0)+(s?.playlists?.total??0)+(s?.shows?.total??0),c=this._searchResults.tracks.length+this._searchResults.playlists.length+this._searchResults.shows.length;this._searchHasMore=c<l;const d=r.filter(e=>e.id).map(e=>e.id);d.length&&this._checkSavedStatus(d)}catch(a){if(t!==this._searchVersion)return;this._handleApiError(a)}finally{t===this._searchVersion&&(this._searchLoading=!1)}}async _openDrilldown(e,t,i){if(this._backend){this._view="drilldown",this._drilldown={title:i,type:e,id:t,items:[],total:0,offset:0,loading:!0},this._error=null;try{const i="playlist"===e?"playlist_tracks":"album_tracks",a=await this._backend.send("spotify_browse",{category:i,content_id:t,limit:20,offset:0,sort_order:this._spotifyConfig.sort_order}),s=a?.items??[];if(!this._drilldown)return;this._drilldown={...this._drilldown,items:s,total:a?.total??0,offset:20,loading:!1};const r=s.map(e=>(e.track??e).id).filter(Boolean);r.length&&this._checkSavedStatus(r)}catch(a){this._handleApiError(a),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}async _loadMoreDrilldown(){if(this._drilldown&&this._backend){this._drilldown={...this._drilldown,loading:!0};try{const e="playlist"===this._drilldown.type?"playlist_tracks":"album_tracks",t=await this._backend.send("spotify_browse",{category:e,content_id:this._drilldown.id,limit:20,offset:this._drilldown.offset,sort_order:this._spotifyConfig.sort_order}),i=t?.items??[];this._drilldown={...this._drilldown,items:[...this._drilldown.items,...i],offset:this._drilldown.offset+20,loading:!1};const a=i.map(e=>(e.track??e).id).filter(Boolean);a.length&&this._checkSavedStatus(a)}catch(e){this._handleApiError(e),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}_goBack(){this._drilldown=null,this._view=this._searchQuery?"search":"library"}_openPicker(e){if(this._pickerItem=e,this._view="speaker_picker",this._selectedSpeakers=new Set,this.hass){const e=this._spotifyConfig.visible_speakers,t=e.length>0;this._speakers=Object.entries(this.hass.states).filter(([i])=>!!i.startsWith("media_player.")&&!(t&&!e.includes(i))).map(([e,t])=>{const i=t.attributes.device_class??"";let a="mdi:speaker";return"tv"===i||e.includes("tv")?a="mdi:television":"receiver"===i?a="mdi:audio-video":(e.includes("nest")||e.includes("hub")||e.includes("echo_show"))&&(a="mdi:tablet"),{entityId:e,name:t.attributes.friendly_name??e,state:t.state,mediaTitle:t.attributes.media_title??null,icon:a}}).sort((i,a)=>{if(t)return e.indexOf(i.entityId)-e.indexOf(a.entityId);const s=e=>"playing"===e?0:"paused"===e?1:2;return s(i.state)-s(a.state)})}}_closePicker(){this._pickerItem=null,this._view=this._drilldown?"drilldown":this._searchQuery?"search":"library"}_toggleSpeakerSelection(e){const t=new Set(this._selectedSpeakers);t.has(e)?t.delete(e):t.add(e),this._selectedSpeakers=t}async _playOnSelectedSpeakers(){if(!this.hass||!this._pickerItem||0===this._selectedSpeakers.size)return;const e=this._pickerItem,t=e.uri??`spotify:${e.type}:${e.id}`,i=[...this._selectedSpeakers],a="track"===e.type?"music":"playlist"===e.type?"playlist":"album"===e.type?"music":"podcast";try{for(const e of i){const t=this.hass.states[e];if(!t)continue;const i=t.attributes.group_members;i&&i.length>1&&this.hass.callService("media_player","unjoin",{},{entity_id:e})}i.length>1&&await new Promise(e=>setTimeout(e,600));const s=i[0];if(await this.hass.callService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:s}),i.length>1){const e=i.slice(1),r=this.hass.states[s];if(r&&!!(524288&r.attributes.supported_features))await new Promise(e=>setTimeout(e,800)),this.hass.callService("media_player","join",{group_members:e},{entity_id:s});else for(const i of e)this.hass.callService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:i})}"track"!==e.type&&"episode"!==e.type||!this._backend||this._seedRadioQueue(e)}catch{}this._closePicker()}async _seedRadioQueue(t){if(!this._backend)return;const i=++this._radioQueueVersion;try{if(await new Promise(e=>setTimeout(e,2e3)),!this._backend||i!==this._radioQueueVersion)return;const a=await this._backend.send("spotify_browse",{category:"recommendations",seed_tracks:[t.id],limit:20});if(i!==this._radioQueueVersion)return;const s=a?.tracks??[];e.emit("radio-queue-started",{count:s.length});let r=0;for(let t=0;t<s.length;t++){const a=s[t];if(!this._backend||i!==this._radioQueueVersion)break;const o=a.uri??`spotify:track:${a.id}`;try{await this._backend.send("spotify_add_to_queue",{uri:o}),r++,e.emit("radio-queue-track-added",{track:{id:a.id,name:a.name,uri:o,artist:ii(a)||void 0},index:t}),await new Promise(e=>setTimeout(e,150))}catch{break}}i===this._radioQueueVersion&&e.emit("radio-queue-complete",{total:r})}catch(a){i===this._radioQueueVersion&&e.emit("radio-queue-error",{message:a.message??"Unknown error"})}}async _loadMoreItems(e){if(!this._backend||this._loadingMore[e])return;this._loadingMore={...this._loadingMore,[e]:!0};const t=this._spotifyConfig.max_items_per_section;let i=0;"playlists"===e?i=this._playlists.length:"recently_played"===e?i=this._recentlyPlayed.length:"saved_tracks"===e?i=this._savedTracks.length:"saved_shows"===e&&(i=this._savedShows.length);try{const a=await this._backend.send("spotify_browse",{category:e,limit:t,offset:i,sort_order:this._spotifyConfig.sort_order}),s=(a?.items??[]).filter(Boolean);if("playlists"===e)this._playlists=[...this._playlists,...s];else if("recently_played"===e)this._recentlyPlayed=[...this._recentlyPlayed,...s];else if("saved_tracks"===e){this._savedTracks=[...this._savedTracks,...s];const e=s.map(e=>(e.track??e).id).filter(Boolean);e.length&&this._checkSavedStatus(e)}else"saved_shows"===e&&(this._savedShows=[...this._savedShows,...s.map(e=>e.show??e)]);null!=a?.total&&(this._sectionTotals={...this._sectionTotals,[e]:a.total})}catch(a){this._handleApiError(a)}finally{this._loadingMore={...this._loadingMore,[e]:!1}}}_renderLoadMore(e,t){const i=this._sectionTotals[e]??0;return t>=i?Q:K`
      <button class="load-more-btn load-more" ?disabled=${this._loadingMore[e]} @click=${()=>this._loadMoreItems(e)}>
        ${je("spotify.load_more")}
        <span class="items-count">${je("spotify.items_count",{current:String(t),total:String(i)})}</span>
      </button>
    `}async _checkSavedStatus(e){const t=[...new Set(e)];if(t.length&&this._backend)try{const e=await this._backend.send("spotify_check_saved",{track_ids:t});if(!this.isConnected)return;const i=new Map(this._savedMap);for(const[t,a]of Object.entries(e??{}))i.set(t,a);this._savedMap=i}catch{}}async _toggleSaved(e){if(!this._backend)return;const t=this._savedMap.get(e)??!1,i=new Map(this._savedMap);i.set(e,!t),this._savedMap=i;try{t?await this._backend.send("spotify_remove_tracks",{track_ids:[e]}):await this._backend.send("spotify_save_tracks",{track_ids:[e]})}catch{const i=new Map(this._savedMap);i.set(e,t),this._savedMap=i}}_handleApiError(e){const t=e;"spotify_not_configured"===t.code?this._spotifyConfigured=!1:t.message?.includes("rate limit")||t.message?.includes("429")?this._error=je("spotify.error_rate_limit",{seconds:"30"}):this._error=je("spotify.error_api")}render(){if(this._lang,!this._configLoaded)return Q;const e=this._getEntityId();if(!1===this._spotifyConfigured)return this._renderShell(K`
        <div class="setup-banner">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <div class="setup-banner-text">${je("spotify.not_configured")}</div>
          <a class="setup-link" href="/config/integrations/dashboard" target="_blank">
            ${je("spotify.open_config")}
          </a>
        </div>
      `);if(!e)return this._renderShell(K`
        <div class="setup-banner">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <div class="setup-banner-text">${je("spotify.no_entity")}</div>
          <a class="setup-link" href="/glass-cards" target="_blank">
            ${je("spotify.open_config")}
          </a>
        </div>
      `);const t="speaker_picker"===this._view&&this._pickerItem;return K`
      ${this._renderShell(K`
        ${this._error?K`<div class="error-banner">${this._error}</div>`:Q}
        ${"drilldown"===this._view&&this._drilldown?this._renderDrilldown():K`
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
      ${t?this._renderSpeakerPicker():Q}
    `}_renderShell(e){return K`
      <div class="spotify-card-wrap">
        ${this._spotifyConfig.show_header?K`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${je("spotify.title")}</span>
            </div>
          </div>
        `:Q}
        <div class="glass spotify-card">
          <div class="tint"></div>
          <div class="card-inner">${e}</div>
        </div>
      </div>
    `}_renderSearch(){return K`
      <div class="search-row">
        <div class="search-input-wrap">
          <div class="search-icon"><ha-icon .icon=${"mdi:magnify"}></ha-icon></div>
          <input
            class="search-input"
            type="text"
            placeholder=${je("spotify.search_placeholder")}
            .value=${this._searchQuery}
            @input=${this._onSearchInput}
            @focus=${()=>{this._foldOpen||(this._foldOpen=!0),this._scrollToTop()}}
          />
          <button
            class="search-clear ${this._searchQuery?"visible":""}"
            aria-label="Clear"
            @click=${this._clearSearch}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
          <button
            class="search-toggle ${this._foldOpen?"open":""}"
            aria-label=${je("spotify.toggle_library")}
            @click=${()=>{this._foldOpen=!this._foldOpen}}
          >
            <ha-icon .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
        </div>
      </div>
    `}_renderTabs(){return K`
      <div class="tab-bar">
        ${[{id:"all",labelKey:"spotify.tab_all",icon:"mdi:home"},{id:"tracks",labelKey:"spotify.tab_tracks",icon:"mdi:music-note"},{id:"playlists",labelKey:"spotify.tab_playlists",icon:"mdi:playlist-music"},{id:"podcasts",labelKey:"spotify.tab_podcasts",icon:"mdi:podcast"}].map(e=>K`
          <button
            class="tab-btn ${this._tab===e.id?"active":""}"
            aria-label=${je(e.labelKey)}
            @click=${()=>{this._tab=e.id,this._searchQuery&&(this._searchOffset=0,this._doSearch(!1))}}
          >
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${je(e.labelKey)}</span>
          </button>
        `)}
      </div>
    `}_renderLibrary(){if(this._libraryLoading)return K`<div class="loading-text">${je("spotify.loading")}</div>`;const e="all"===this._tab||"playlists"===this._tab,t="all"===this._tab||"tracks"===this._tab,i="all"===this._tab||"podcasts"===this._tab;return e&&this._playlists.length>0||t&&(this._recentlyPlayed.length>0||this._savedTracks.length>0)||i&&this._savedShows.length>0?K`
      ${e&&this._playlists.length>0?K`
        <div class="section-title">${je("spotify.my_playlists")}</div>
        <div class="playlist-scroll">
          ${this._playlists.map(e=>this._renderPlaylistCard(e))}
        </div>
        ${this._renderLoadMore("playlists",this._playlists.length)}
      `:Q}

      ${t&&this._recentlyPlayed.length>0?K`
        <div class="section-title">${je("spotify.recently_played")}</div>
        ${this._recentlyPlayed.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
        ${this._renderLoadMore("recently_played",this._recentlyPlayed.length)}
      `:Q}

      ${t&&this._savedTracks.length>0?K`
        <div class="section-title">${je("spotify.saved_tracks")}</div>
        ${this._savedTracks.map(e=>{const t=e.track??e;return this._renderResultRow(t,"track")})}
        ${this._renderLoadMore("saved_tracks",this._savedTracks.length)}
      `:Q}

      ${i&&this._savedShows.length>0?K`
        <div class="section-title">${je("spotify.followed_podcasts")}</div>
        ${this._savedShows.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
        ${this._renderLoadMore("saved_shows",this._savedShows.length)}
      `:Q}
    `:K`
        <div class="empty-state">
          <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
          <div class="empty-state-text">${je("spotify.no_content")}</div>
        </div>
      `}_renderPlaylistCard(e){const t=ti(e,160),i=e.tracks?.total??0;return K`
      <button
        class="playlist-card"
        aria-label=${e.name}
        @click=${()=>this._openDrilldown("playlist",e.id,e.name)}
      >
        <div class="playlist-art" style=${t?"":"background:#3040a0"}>
          ${t?K`<img src=${t} alt="" loading="lazy" />`:K`<ha-icon .icon=${"mdi:playlist-music"}></ha-icon>`}
          <div class="playlist-art-play"><ha-icon .icon=${"mdi:play"}></ha-icon></div>
        </div>
        <div class="playlist-name">${e.name}</div>
        ${i>0?K`<div class="playlist-count">${je("spotify.tracks_count",{count:String(i)})}</div>`:Q}
      </button>
    `}_renderResultRow(e,t){if(!e)return Q;const i=ti(e,64),a=ii(e)||(e.owner?.display_name??""),s="show"===t||"episode"===t,r=e.uri??`spotify:${e.type??t}:${e.id}`,o=this._isNowPlaying(r);return K`
      <div
        class="result-row ${o?"now-playing":""}"
        role="button"
        tabindex="0"
        @click=${()=>{"playlist"===t?this._openDrilldown("playlist",e.id,e.name):"album"===t?this._openDrilldown("album",e.id,e.name):this._openPicker(e)}}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.currentTarget.click())}}
      >
        <div class="result-art ${s?"round":""}">
          ${i?K`<img src=${i} alt="" loading="lazy" />`:K`<ha-icon .icon=${ai(t)}></ha-icon>`}
        </div>
        <div class="result-info">
          <div class="result-title">${e.name}</div>
          <div class="result-meta">
            <span class="result-type-badge">${je(function(e){switch(e){case"track":default:return"spotify.type_track";case"playlist":return"spotify.type_playlist";case"album":return"spotify.type_album";case"show":case"episode":return"spotify.type_podcast"}}(t))}</span>
            <span>${a}</span>
          </div>
        </div>
        ${"track"!==t&&"episode"!==t||!e.id?Q:K`
          <button class="heart-btn ${this._savedMap.get(e.id)?"saved":""}"
                  aria-label="${this._savedMap.get(e.id)?je("spotify.remove_track"):je("spotify.save_track")}"
                  @click=${t=>{t.stopPropagation(),this._toggleSaved(e.id)}}>
            <ha-icon .icon="${this._savedMap.get(e.id)?"mdi:heart":"mdi:heart-outline"}"></ha-icon>
          </button>
        `}
        ${o?K`<div class="eq-bars"><span></span><span></span><span></span></div>`:K`
            <button
              class="result-play"
              aria-label=${je("spotify.play_aria",{name:e.name})}
              @click=${t=>{t.stopPropagation(),this._openPicker(e)}}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
            </button>
          `}
      </div>
    `}_renderSearchResults(){if(this._searchLoading&&0===this._searchOffset)return K`<div class="loading-text">${je("spotify.loading")}</div>`;const{tracks:e,playlists:t,shows:i}=this._searchResults,a=("all"===this._tab||"tracks"===this._tab)&&e.length>0,s=("all"===this._tab||"playlists"===this._tab)&&t.length>0,r=("all"===this._tab||"podcasts"===this._tab)&&i.length>0;return a||s||r?K`
      ${a?K`
        ${"all"===this._tab?K`<div class="section-title">${je("spotify.tab_tracks")}</div>`:Q}
        ${e.map(e=>this._renderResultRow(e,"track"))}
      `:Q}

      ${s?K`
        ${"all"===this._tab?K`<div class="section-title">${je("spotify.tab_playlists")}</div>`:Q}
        ${t.map(e=>this._renderResultRow(e,"playlist"))}
      `:Q}

      ${r?K`
        ${"all"===this._tab?K`<div class="section-title">${je("spotify.tab_podcasts")}</div>`:Q}
        ${i.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
      `:Q}

      ${this._searchHasMore?K`
        <button class="load-more-btn" @click=${()=>this._doSearch(!0)} ?disabled=${this._searchLoading}>
          ${this._searchLoading?je("spotify.loading"):je("spotify.load_more")}
        </button>
      `:Q}
    `:K`
        <div class="empty-state">
          <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
          <div class="empty-state-text">${je("spotify.no_results",{query:this._searchQuery})}</div>
        </div>
      `}_playFullDrilldown(){if(!this._drilldown)return;const e=this._drilldown,t=`spotify:${e.type}:${e.id}`;this._openPicker({id:e.id,name:e.title,type:e.type,uri:t})}_renderDrilldown(){const e=this._drilldown;return e?K`
      <div class="drilldown-header">
        <button class="back-btn" @click=${this._goBack}>
          <ha-icon .icon=${"mdi:arrow-left"}></ha-icon>
          ${je("spotify.back")}
        </button>
        <button class="play-all-btn" @click=${this._playFullDrilldown} aria-label=${je("spotify.play_all")}>
          <ha-icon .icon=${"mdi:play-circle"}></ha-icon>
          ${je("spotify.play_all")}
        </button>
      </div>
      <div class="section-title">${e.title}</div>
      <div class="content-area">
        ${e.items.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
        ${e.loading?K`<div class="loading-text">${je("spotify.loading")}</div>`:Q}
        ${!e.loading&&e.items.length<e.total?K`
          <button class="load-more-btn" ?disabled=${e.loading} @click=${this._loadMoreDrilldown}>
            ${je("spotify.load_more")}
          </button>
        `:Q}
      </div>
    `:Q}_renderSpeakerPicker(){const e=this._pickerItem;if(!e)return Q;const t=ti(e,64),i=ii(e),a=this._selectedSpeakers.size>0;return K`
      <div class="picker-backdrop visible" @click=${e=>{e.target.classList.contains("picker-backdrop")&&this._closePicker()}}>
        <div class="glass speaker-picker">
          <div class="picker-header">
            <div class="picker-title">${je("spotify.play_on")}</div>
            <button class="picker-close" aria-label="Close" @click=${this._closePicker}>
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>

          <div class="picker-track">
            <div class="picker-track-art">
              ${t?K`<img src=${t} alt="" />`:K`<ha-icon .icon=${ai(e.type??"track")}></ha-icon>`}
            </div>
            <div class="picker-track-info">
              <div class="picker-track-title">${e.name}</div>
              ${i?K`<div class="picker-track-artist">${i}</div>`:Q}
            </div>
          </div>

          <div class="picker-speakers">
            ${this._speakers.map(e=>{const t=this._selectedSpeakers.has(e.entityId);return K`
                <button class="picker-speaker ${t?"selected":""}" @click=${()=>this._toggleSpeakerSelection(e.entityId)}>
                  <div class="picker-speaker-icon">
                    <ha-icon .icon=${e.icon}></ha-icon>
                  </div>
                  <div class="picker-speaker-name">${e.name}</div>
                  <div class="picker-speaker-status ${"playing"===e.state?"playing":""}">
                    ${"playing"===e.state&&e.mediaTitle?e.mediaTitle:"paused"===e.state?je("spotify.paused"):je("spotify.available")}
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
              aria-label=${je("spotify.play")}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
              ${je("spotify.play")}${a?` (${this._selectedSpeakers.size})`:""}
            </button>
          </div>
        </div>
      </div>
    `}}ei([Le()],si.prototype,"_view"),ei([Le()],si.prototype,"_tab"),ei([Le()],si.prototype,"_searchQuery"),ei([Le()],si.prototype,"_playlists"),ei([Le()],si.prototype,"_recentlyPlayed"),ei([Le()],si.prototype,"_savedTracks"),ei([Le()],si.prototype,"_savedShows"),ei([Le()],si.prototype,"_searchResults"),ei([Le()],si.prototype,"_searchLoading"),ei([Le()],si.prototype,"_searchOffset"),ei([Le()],si.prototype,"_searchHasMore"),ei([Le()],si.prototype,"_drilldown"),ei([Le()],si.prototype,"_speakers"),ei([Le()],si.prototype,"_pickerItem"),ei([Le()],si.prototype,"_selectedSpeakers"),ei([Le()],si.prototype,"_error"),ei([Le()],si.prototype,"_libraryLoading"),ei([Le()],si.prototype,"_spotifyConfigured"),ei([Le()],si.prototype,"_foldOpen"),ei([Le()],si.prototype,"_savedMap"),ei([Le()],si.prototype,"_sectionTotals"),ei([Le()],si.prototype,"_loadingMore");try{customElements.define("glass-spotify-card",si)}catch{}var ri=Object.defineProperty,oi=Object.getOwnPropertyDescriptor,ni=(e,t,i,a)=>{for(var s,r=a>1?void 0:a?oi(t,i):t,o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a?s(t,i,r):s(r))||r);return a&&r&&ri(t,i,r),r};class li extends he{constructor(){super(...arguments),this._lang=De()}set hass(e){this._hass=e,e?.language&&Re(e.language)&&(this._lang=De())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[ue,c`
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
    `]}render(){return this._lang,K`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${je("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${je("editor.open_config")}</a>
        </p>
      </div>
    `}}ni([Ae({attribute:!1})],li.prototype,"hass",1),ni([Le()],li.prototype,"_lang",2);try{customElements.define("glass-media-card-editor",li)}catch{}var ci=Object.defineProperty,di=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&ci(t,i,r),r};const hi=524288;function pi(e){const t=e.attributes;let i=0;return t.media_position_updated_at&&(i=new Date(t.media_position_updated_at).getTime()/1e3),{entityId:e.entity_id,name:t.friendly_name||e.entity_id,state:e.state,title:t.media_title||"",artist:t.media_artist||"",albumArt:t.entity_picture||"",appName:t.app_name||"",volume:"number"==typeof t.volume_level?t.volume_level:0,isMuted:!!t.is_volume_muted,features:t.supported_features||0,groupMembers:Array.isArray(t.group_members)?t.group_members:[],shuffle:!!t.shuffle,repeat:t.repeat||"off",source:t.source||"",sourceList:Array.isArray(t.source_list)?t.source_list:[],soundMode:t.sound_mode||"",soundModeList:Array.isArray(t.sound_mode_list)?t.sound_mode_list:[],duration:"number"==typeof t.media_duration?t.media_duration:0,elapsed:"number"==typeof t.media_position?t.media_position:0,positionUpdatedAt:i,lastUpdated:e.last_updated?new Date(e.last_updated).getTime():0,icon:t.icon||"mdi:speaker"}}function ui(e){return"playing"===e||"buffering"===e}function _i(e){return"playing"===e||"paused"===e||"buffering"===e}function gi(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}function fi(e,t){return 0!==(e.features&t)}const mi={Spotify:"mdi:spotify",AirPlay:"mdi:apple",Bluetooth:"mdi:bluetooth","Line-In":"mdi:audio-input-stereo-minijack",TV:"mdi:television",HDMI:"mdi:hdmi-port"};class vi extends He{constructor(){super(...arguments),this._foldOpen=!1,this._mediaConfig={extra_entities:{},show_header:!0},this._configLoaded=!1,this._roomIndex=0,this._roomEntityId="",this._prevPlayingSet="",this._swipeClass="",this._foldTab="controls",this._queueData=[],this._radioTracks=[],this._loadVersion=0,this._queueVersion=0,this._lastArtworkUrl="",this._configLoadingInProgress=!1,this._playersCache=null,this._playersCacheKey="",this._volumeThrottles=new Map,this._progressTimer=0,this._lpTimer=0,this._lpFired=!1,this._swipeFired=!1,this._swipeAnimating=!1,this._swipeAnimTimer=0,this._pointerStart={x:0,y:0,t:0},this._queueRefreshTimer=0,this._prevMediaTitle="",this._lastMaster=null,this._lastMasterStaleTimer=0}setConfig(e){this._config=e}connectedCallback(){super.connectedCallback(),this._listen("media-config-changed",()=>{this._playersCache=null,this._loadConfig()}),this._listen("room-config-changed",()=>{this._playersCache=null}),this._listen("radio-queue-started",()=>{this._radioTracks=[]}),this._listen("radio-queue-track-added",e=>{this._radioTracks=[...this._radioTracks,e.track]}),this._listen("radio-queue-complete",()=>{this._foldOpen&&this._loadQueue()}),this._listen("radio-queue-error",e=>{console.warn("Radio queue error:",e.message)})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._volumeThrottles.clear(),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0),this._lpTimer&&(clearTimeout(this._lpTimer),this._lpTimer=0),this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=0),this._queueRefreshTimer&&(clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=0),this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=null,++this._queueVersion,this._swipeAnimating=!1,this._swipeClass="",this._prevPlayingSet="",++this._loadVersion,this._configLoadingInProgress=!1,this._lastArtworkUrl="",this._samplingCanvas=void 0,this._samplingCtx=void 0,delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic"),this._unjoinUnsub?.(),this._unjoinUnsub=void 0}updated(e){if(super.updated(e),e.has("areaId")&&(this._foldOpen=!1,this._foldTab="controls",this._queueData=[],this._prevMediaTitle="",this._playersCache=null,this._playersCacheKey="",this._roomIndex=0),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._backend||(this._backend=new Ue(this.hass),this._loadConfig());const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._playersCache=null,this._playersCacheKey="")}if(e.has("hass")&&this.isDashboard&&this.hass){const e=Object.entries(this.hass.states).filter(([e,t])=>e.startsWith("media_player.")&&"playing"===t.state).map(([e])=>e).sort().join(",");if(e!==this._prevPlayingSet){const t=new Set(this._prevPlayingSet.split(",").filter(Boolean)),i=e.split(",").filter(Boolean).filter(e=>!t.has(e));if(this._prevPlayingSet=e,i.length>0){const e=this._getActiveRooms(),t=e.findIndex(e=>i.includes(e.entityId)||i.some(t=>e.groupMembers.includes(t)));t>=0&&t!==this._roomIndex&&(this._roomIndex=t,this._roomEntityId=e[t].entityId)}}}if(e.has("_roomIndex")&&this._foldOpen&&"queue"===this._foldTab&&(this._queueData=[],this._prevMediaTitle="",this._loadQueue()),e.has("hass")&&this.hass&&this._foldOpen&&"queue"===this._foldTab){const e=this._getCurrentMaster(),t=e?this.hass.states[e.entityId]?.attributes?.media_title??"":"";t!==this._prevMediaTitle&&(this._prevMediaTitle=t,this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}(e.has("hass")||e.has("_roomIndex"))&&this._syncProgressTimer(),this._updateBgLightAttribute()}_updateBgLightAttribute(){const e=this.shadowRoot?.querySelector("img.dash-art-bg");if(!e)return this._lastArtworkUrl="",delete this.dataset.bgLight,void this.style.removeProperty("--c-accent-dynamic");if(!e.complete||0===e.naturalWidth)return void e.addEventListener("load",()=>this._updateBgLightAttribute(),{once:!0});if(e.src===this._lastArtworkUrl)return;this._lastArtworkUrl=e.src;const t=16;this._samplingCanvas||(this._samplingCanvas=document.createElement("canvas"),this._samplingCanvas.width=t,this._samplingCanvas.height=t,this._samplingCtx=this._samplingCanvas.getContext("2d",{willReadFrequently:!0}));const i=this._samplingCtx;if(i)try{i.clearRect(0,0,t,t),i.drawImage(e,0,0,t,t);const a=i.getImageData(0,0,t,t).data;let s=0;const r=256;for(let e=0;e<a.length;e+=4)s+=.299*a[e]+.587*a[e+1]+.114*a[e+2];s/r/255>.55?this.dataset.bgLight="true":delete this.dataset.bgLight;let o=0,n=0,l=0,c=0;for(let e=0;e<a.length;e+=4){const t=a[e],i=a[e+1],s=a[e+2],r=Math.max(t,i,s)/255,d=Math.min(t,i,s)/255,h=r===d?0:(r+d)/2>.5?(r-d)/(2-r-d):(r-d)/(r+d);h<.15||(o+=t*h,n+=i*h,l+=s*h,c+=h)}if(c>0){const e=`rgb(${Math.round(o/c)}, ${Math.round(n/c)}, ${Math.round(l/c)})`;this.style.setProperty("--c-accent-dynamic",e)}else this.style.removeProperty("--c-accent-dynamic")}catch{delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic")}}_syncProgressTimer(){const e=this.hass?this._getPlayers():[],t=this._findMaster(e),i=null!=t&&ui(t.state)&&t.duration>0;i&&!this._progressTimer?this._progressTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0)}getTrackedEntityIds(){return this.isDashboard&&this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")):this._getPlayers().map(e=>e.entityId)}get isDashboard(){return!this.areaId}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.media_card&&(this._mediaConfig={extra_entities:t.media_card.extra_entities??{},show_header:t.media_card.show_header??!0}),this._configLoaded=!0,this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}_getPlayers(){if(!this.hass)return[];if(this.isDashboard)return Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")&&_i(e.state)).map(pi).sort((e,t)=>{const i=e=>"playing"===e?0:"buffering"===e?1:2,a=i(e.state)-i(t.state);return 0!==a?a:t.lastUpdated-e.lastUpdated});const e=this.areaId??"",t=this._mediaConfig.extra_entities[e]||[],i=`${e}:${JSON.stringify(t)}`;if(this._playersCache&&this._playersCacheKey===i)return this._playersCache.map(e=>{const t=this.hass?.states[e.entityId];return t?pi(t):e});const a=(this.hass.entities?Ve(e,this.hass.entities,this.hass.devices):[]).filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id),s=[...new Set([...a,...t])].map(e=>this.hass?.states[e]).filter(e=>!!e).map(pi);return this._playersCache=s,this._playersCacheKey=i,s}_findMaster(e){return e.find(e=>ui(e.state))||e.find(e=>_i(e.state))||null}_getCurrentMaster(){if(this.isDashboard){const e=this._getActiveRooms();if(!e.length)return this._lastMaster??null;return e[Math.min(this._roomIndex,e.length-1)]}return this._findMaster(this._getPlayers())}_getActiveRooms(){if(!this.hass)return[];const e=Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")&&_i(e.state)).map(pi);e.sort((e,t)=>{const i=(e.groupMembers.length>0&&e.groupMembers[0]===e.entityId?0:1)-(t.groupMembers.length>0&&t.groupMembers[0]===t.entityId?0:1);return 0!==i?i:t.lastUpdated-e.lastUpdated});const t=new Set,i=[];for(const a of e)if(!t.has(a.entityId)){for(const e of a.groupMembers)t.add(e);t.add(a.entityId),i.push(a)}return i}_callService(e,t,i){this.hass?.callService("media_player",t,i,{entity_id:e})}_togglePlayPause(e){ui(e.state)?fi(e,1)?this._callService(e.entityId,"media_pause"):fi(e,4096)&&this._callService(e.entityId,"media_stop"):fi(e,16384)&&this._callService(e.entityId,"media_play")}_previous(e){this._callService(e,"media_previous_track")}_next(e){this._callService(e,"media_next_track"),this._foldOpen&&"queue"===this._foldTab&&(this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}_toggleMute(e){this._callService(e.entityId,"volume_mute",{is_volume_muted:!e.isMuted})}_setVolume(e,t){const i=Date.now();i-(this._volumeThrottles.get(e)||0)<100||(this._volumeThrottles.set(e,i),this._callService(e,"volume_set",{volume_level:t}))}_toggleShuffle(e){this._callService(e.entityId,"shuffle_set",{shuffle:!e.shuffle})}_cycleRepeat(e){const t="off"===e.repeat?"all":"all"===e.repeat?"one":"off";this._callService(e.entityId,"repeat_set",{repeat:t})}_selectSource(e,t){this._callService(e,"select_source",{source:t})}_selectSoundMode(e,t){this._callService(e,"select_sound_mode",{sound_mode:t})}_seekProgress(e,t,i){const a=i/100*t;this._callService(e,"media_seek",{seek_position:a})}_joinGroup(e,t){this.hass?.callService("media_player","join",{group_members:[t]},{entity_id:e})}_unjoinGroup(e){this._callService(e,"unjoin")}async _waitForUnjoin(e,t=3e3){this._unjoinUnsub?.(),this._unjoinUnsub=void 0;const i=++this._loadVersion;return new Promise(a=>{let s=!1;const r=()=>{s||(s=!0,this._unjoinUnsub?.(),this._unjoinUnsub=void 0,clearTimeout(o))};if(!this.hass)return void a(!1);this.hass.connection.subscribeEvents(t=>{if(i===this._loadVersion){if(t.data.entity_id===e){const e=t.data.new_state?.attributes?.group_members;(!e||e.length<=1)&&(r(),a(!0))}}else r()},"state_changed").then(e=>{s?e():this._unjoinUnsub=e});const o=setTimeout(()=>{r(),a(!1)},t)})}async _smartJoin(e,t){if(!this.hass)return;const i=this.hass.states[t];if(!i)return;const a=i.attributes.group_members;a&&a.length>1&&(this._unjoinGroup(t),await this._waitForUnjoin(t),!this.isConnected||!this.hass)||this._joinGroup(e,t)}_onHeroPointerDown(e,t){e.target.closest("button")||(this._pointerStart={x:e.clientX,y:e.clientY,t:Date.now()},this._lpFired=!1,this._swipeFired=!1,this._lpTimer=window.setTimeout(()=>{this._lpFired=!0,this._foldOpen=!this._foldOpen,this._foldOpen&&this._loadQueue(),this._foldOpen&&setTimeout(()=>{const e=this.renderRoot?.querySelector(".ctrl-fold");e?.scrollIntoView({behavior:"smooth",block:"nearest"})},350)},500))}_onHeroPointerMove(e){if(this._lpFired||this._swipeFired)return;const t=e.clientX-this._pointerStart.x,i=e.clientY-this._pointerStart.y;(Math.abs(t)>15||Math.abs(i)>15)&&(clearTimeout(this._lpTimer),this._lpTimer=0)}_onHeroPointerUp(e,t,i){if(clearTimeout(this._lpTimer),this._lpFired)return;const a=e.clientX-this._pointerStart.x,s=Date.now()-this._pointerStart.t;return this.isDashboard&&i>1&&Math.abs(a)>50&&s<500?(this._swipeFired=!0,void(a<0?this._swipeToRoom("left",(this._roomIndex+1)%i):this._swipeToRoom("right",(this._roomIndex-1+i)%i))):void 0}_onHeroPointerCancel(){clearTimeout(this._lpTimer)}_swipeToRoom(e,t){this._swipeAnimating||(this._swipeAnimating=!0,this._foldOpen=!1,this._swipeClass="left"===e?"swipe-exit-left":"swipe-exit-right",this._swipeAnimTimer=window.setTimeout(()=>{this._roomIndex=t,this._roomEntityId="",this._swipeClass="left"===e?"swipe-enter-right":"swipe-enter-left",this._swipeAnimTimer=window.setTimeout(()=>{this._swipeClass="",this._swipeAnimating=!1},280)},220))}_onProgressPointerDown(e,t,i){e.stopPropagation();const a=e.currentTarget;a.setPointerCapture(e.pointerId);const s=a.querySelector(".dash-progress-fill"),r=a.querySelector(".dash-progress-thumb"),o=e=>{const t=a.getBoundingClientRect(),i=Math.max(0,Math.min(100,(e.clientX-t.left)/t.width*100));s.style.width=i+"%",s.style.transition="none",r.style.left=i+"%",r.style.opacity="1"};o(e);const n=e=>o(e),l=()=>{a.removeEventListener("pointermove",n),a.removeEventListener("pointerup",c),a.removeEventListener("pointercancel",l),a.removeEventListener("lostpointercapture",l),s.style.transition="",r.style.opacity=""},c=e=>{l();const s=a.getBoundingClientRect(),r=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100));this._seekProgress(t,i,r)};a.addEventListener("pointermove",n),a.addEventListener("pointerup",c),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l)}_onVolumePointerDown(e,t){e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const a=i.querySelector(".slider-fill"),s=i.querySelector(".slider-thumb"),r=i.querySelector(".slider-val"),o=e=>{const o=i.getBoundingClientRect(),n=Math.max(0,Math.min(100,(e.clientX-o.left)/o.width*100));a.style.width=n+"%",s.style.left=n+"%",r&&(r.textContent=Math.round(n)+"%"),this._setVolume(t,n/100)};o(e);const n=e=>o(e),l=()=>{i.removeEventListener("pointermove",n),i.removeEventListener("pointerup",l),i.removeEventListener("pointercancel",l),i.removeEventListener("lostpointercapture",l)};i.addEventListener("pointermove",n),i.addEventListener("pointerup",l),i.addEventListener("pointercancel",l),i.addEventListener("lostpointercapture",l)}_onMrVolPointerDown(e,t){e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const a=i.querySelector(".mr-vol-fill"),s=i.querySelector(".mr-vol-val"),r=e=>{const r=i.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));a.style.width=o+"%",s&&(s.textContent=Math.round(o)+"%"),this._setVolume(t,o/100)};r(e);const o=e=>r(e),n=()=>{i.removeEventListener("pointermove",o),i.removeEventListener("pointerup",n),i.removeEventListener("pointercancel",n),i.removeEventListener("lostpointercapture",n)};i.addEventListener("pointermove",o),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("lostpointercapture",n)}_getElapsed(e){if(!ui(e.state)||0===e.positionUpdatedAt)return e.elapsed;const t=Date.now()/1e3-e.positionUpdatedAt;return Math.min(e.elapsed+t,e.duration)}_getProgress(e){return e.duration<=0?0:Math.min(100,this._getElapsed(e)/e.duration*100)}_renderHero(e,t=1){const i=ui(e.state),a=this._getProgress(e),s=this._getElapsed(e),r=this._getGroupablePlayers(),o=this._findGroupCoordinator(e,r),n=(o?.groupMembers||[]).length;return K`
      <div class="dash-wrap ${this._foldOpen?"fold-open":""}">
        <div class="dash-hero ${this._swipeClass}"
          @pointerdown=${t=>this._onHeroPointerDown(t,e)}
          @pointermove=${e=>this._onHeroPointerMove(e)}
          @pointerup=${i=>this._onHeroPointerUp(i,e,t)}
          @pointercancel=${()=>this._onHeroPointerCancel()}
        >
          <!-- Full-bleed artwork background -->
          ${e.albumArt?K`
            <img class="dash-art-bg" src=${e.albumArt} alt="" loading="lazy" />
          `:Q}
          <div class="dash-gradient"></div>
          ${e.albumArt?Q:K`
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
                <span>${me(e.name,fe)}</span>
                ${i?K`
                  <div class="dash-eq playing">
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                  </div>
                `:Q}
              </div>
              ${n>1?K`
                <div class="dash-group-badge glass-pill">
                  <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                  <span>${je("media.speakers_count",{count:n})}</span>
                </div>
              `:Q}
            </div>

            <!-- Spacer -->
            <div class="dash-spacer"></div>

            <!-- Bottom glass panel: track info + progress + transport -->
            <div class="dash-info-panel glass-panel">
              <div class="dash-track">
                ${e.title?K`
                  <div class="dash-track-title">${me(e.title,22)}</div>
                `:Q}
                ${e.artist?K`
                  <div class="dash-track-artist">${me(e.artist,28)}</div>
                `:Q}
              </div>

              <!-- Progress bar -->
              ${e.duration>0&&fi(e,2)?K`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${gi(s)}</span>
                    <span class="dash-track-time">${gi(e.duration)}</span>
                  </div>
                  <div class="dash-progress"
                    aria-label=${je("media.seek_aria")}
                    @pointerdown=${t=>this._onProgressPointerDown(t,e.entityId,e.duration)}
                  >
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                    <div class="dash-progress-thumb" style="left:${a}%"></div>
                  </div>
                </div>
              `:e.duration>0?K`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${gi(s)}</span>
                    <span class="dash-track-time">${gi(e.duration)}</span>
                  </div>
                  <div class="dash-progress" style="pointer-events:none">
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                  </div>
                </div>
              `:Q}

              <!-- Transport -->
              <div class="dash-transport">
                ${fi(e,32768)?K`
                  <button class="transport-btn ${e.shuffle?"active":""}"
                    aria-label=${je("media.shuffle_aria")}
                    @click=${t=>{t.stopPropagation(),this._toggleShuffle(e)}}>
                    <ha-icon .icon=${"mdi:shuffle-variant"}></ha-icon>
                  </button>
                `:Q}

                ${fi(e,16)?K`
                  <button class="transport-btn transport-skip"
                    aria-label=${je("media.prev_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._previous(e.entityId)}}>
                    <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
                  </button>
                `:Q}

                <button class="transport-btn transport-main"
                  aria-label=${je(i?"media.pause_aria":"media.play_aria",{name:e.name})}
                  @click=${t=>{t.stopPropagation(),this._togglePlayPause(e)}}>
                  <ha-icon .icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
                </button>

                ${fi(e,32)?K`
                  <button class="transport-btn transport-skip"
                    aria-label=${je("media.next_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._next(e.entityId)}}>
                    <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
                  </button>
                `:Q}

                ${fi(e,262144)?K`
                  <button class="transport-btn ${"off"!==e.repeat?"active":""}"
                    aria-label=${je("media.repeat_aria")}
                    @click=${t=>{t.stopPropagation(),this._cycleRepeat(e)}}>
                    <ha-icon .icon=${"one"===e.repeat?"mdi:repeat-once":"mdi:repeat"}></ha-icon>
                  </button>
                `:Q}
              </div>

              <div class="dash-source-row">
                ${o&&o.entityId!==e.entityId?K`
                  <span class="dash-coordinator-badge">
                    <ha-icon .icon=${o.icon||"mdi:speaker"}></ha-icon>
                    ${o.name}
                  </span>
                `:Q}
                ${e.source?K`
                  <span class="dash-track-source">${e.source}</span>
                `:Q}
              </div>
            </div>
          </div>

          <!-- Navigation arrows (desktop hover, multi-room) -->
          ${this.isDashboard&&t>1?K`
            <button class="dash-nav-arrow dash-nav-left" aria-label=${je("media.prev_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("right",(this._roomIndex-1+t)%t)}}>
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <button class="dash-nav-arrow dash-nav-right" aria-label=${je("media.next_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("left",(this._roomIndex+1)%t)}}>
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          `:Q}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="dash-fold-sep-top"></div>
            <div class="dash-fold-panel">
              ${this._foldOpen?this._renderFoldContent(e,o,r):Q}
            </div>
          </div>
        </div>
      </div>
    `}_renderFoldContent(e,t,i){const a="queue"===this._foldTab;return K`
      <div class="segmented">
        <button class="seg-btn ${a?"":"active"}"
                @click=${()=>{this._foldTab="controls"}}>
          ${je("media.controls_tab")}
        </button>
        <button class="seg-btn ${a?"active":""}"
                @click=${()=>{this._foldTab="queue",this._loadQueue()}}>
          ${je("media.queue_tab")}
        </button>
      </div>
      ${a?this._renderQueueTab():this._renderControlsTab(e,t,i)}
    `}_renderControlsTab(e,t,i){return K`
      <!-- Volume -->
      ${fi(e,4)?K`
        <div class="ctrl-label">${je("media.volume_label")}</div>
        <div class="volume-row">
          ${fi(e,8)?K`
            <button class="volume-btn ${e.isMuted?"muted":""}"
              aria-label=${e.isMuted?je("media.unmute_aria",{name:e.name}):je("media.mute_aria",{name:e.name})}
              @click=${t=>{t.stopPropagation(),this._toggleMute(e)}}>
              <ha-icon .icon=${e.isMuted?"mdi:volume-off":e.volume>.5?"mdi:volume-high":"mdi:volume-medium"}></ha-icon>
            </button>
          `:Q}
          <div class="slider" @pointerdown=${t=>this._onVolumePointerDown(t,e.entityId)}>
            <div class="slider-fill accent" style="width:${Math.round(100*(e.isMuted?0:e.volume))}%"></div>
            <div class="slider-thumb" style="left:${Math.round(100*(e.isMuted?0:e.volume))}%"></div>
            <span class="slider-val">${Math.round(100*(e.isMuted?0:e.volume))}%</span>
          </div>
        </div>
      `:Q}

      <!-- Source chips -->
      ${fi(e,2048)&&e.sourceList.length>0?K`
        <div class="dash-fold-sep"></div>
        <div class="ctrl-label">${je("media.source_label")}</div>
        <div class="chips-row">
          ${e.sourceList.map(t=>K`
            <button class="chip ${e.source===t?"active":""}"
              @click=${i=>{i.stopPropagation(),this._selectSource(e.entityId,t)}}>
              <ha-icon .icon=${mi[t]||"mdi:import"}></ha-icon>
              <span>${t}</span>
            </button>
          `)}
        </div>
      `:Q}

      <!-- Sound mode chips -->
      ${fi(e,65536)&&e.soundModeList.length>0?K`
        <div class="dash-fold-sep"></div>
        <div class="ctrl-label">${je("media.sound_mode_label")}</div>
        <div class="chips-row">
          ${e.soundModeList.map(t=>K`
            <button class="chip ${e.soundMode===t?"active":""}"
              @click=${i=>{i.stopPropagation(),this._selectSoundMode(e.entityId,t)}}>
              <ha-icon .icon=${"mdi:equalizer"}></ha-icon>
              <span>${t}</span>
            </button>
          `)}
        </div>
      `:Q}

      <!-- Multiroom grid (show if any groupable speakers exist) -->
      ${i.length>1?this._renderMultiroomGrid(t,i):Q}
    `}async _loadQueue(){if(!this.hass)return;const e=++this._queueVersion,t=this._getCurrentMaster();if(t)try{const i=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"sonos",service:"get_queue",target:{entity_id:t.entityId},return_response:!0});if(e!==this._queueVersion)return;const a=i?.response?.[t.entityId]??[];this._queueData=a.map(e=>({name:e.media_title??"",artist:e.media_artist??"",album_name:e.media_album_name??"",content_id:e.media_content_id??""}))}catch(i){if(e!==this._queueVersion)return;console.warn("[glass] queue load error:",i)}}_renderQueueTab(){const e=this._getCurrentMaster(),t=e?this.hass?.states[e.entityId]?.attributes?.queue_position??0:0,i=this._queueData.slice(t);return i.length?K`
      <div class="queue-list">
        ${i.map((e,i)=>{const a=e.name??"",s=e.artist??"",r=e.content_id??"",o=!!r&&this._radioTracks.some(e=>e.uri===r),n=t+i;return K`
            <div class="queue-item">
              <div class="queue-num">${i+1}</div>
              <div class="queue-info">
                <span class="queue-title">${me(a,fe)}</span>
                <span class="queue-artist">${s}</span>
              </div>
              ${o?K`<span class="queue-badge">${je("media.radio_badge")}</span>`:Q}
              <button class="btn-icon xs queue-remove" aria-label="${je("media.remove_from_queue")}"
                      @click=${e=>{e.stopPropagation(),this._removeFromQueue(n)}}>
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          `})}
      </div>
    `:K`<div class="queue-empty">${je("media.queue_empty")}</div>`}async _removeFromQueue(e){const t=this._getCurrentMaster();if(t&&this.hass){this._queueData=this._queueData.filter((t,i)=>i!==e);try{await this.hass.callService("sonos","remove_from_queue",{queue_position:e},{entity_id:t.entityId})}catch{this._loadQueue()}}}_getGroupablePlayers(){return this.hass?Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")).map(pi).filter(e=>fi(e,hi)):[]}_findGroupCoordinator(e,t){if(fi(e,hi))return e;const i=t.find(t=>ui(t.state)&&t.title&&t.title===e.title);return i||null}_renderMultiroomGrid(e,t){if(!this.hass||!e)return K``;const i=e.entityId,a=new Set(e.groupMembers),s=t.filter(e=>e.entityId!==i);return 0===s.length?K``:K`
      <div class="dash-fold-sep"></div>
      <div class="ctrl-label">${je("media.speakers_label")}</div>
      <div class="multiroom-grid">
        ${s.map(e=>{const t=a.has(e.entityId);return K`
            <div class="mr-cell ${t?"joined":""}">
              <div class="mr-cell-top">
                <button class="mr-icon-btn"
                  aria-label=${je(t?"media.remove_group_aria":"media.add_group_aria",{name:e.name})}
                  @click=${a=>{a.stopPropagation(),t?this._unjoinGroup(e.entityId):this._smartJoin(i,e.entityId)}}>
                  <ha-icon .icon=${e.icon||"mdi:speaker"}></ha-icon>
                </button>
                <div class="mr-info">
                  <div class="mr-name">${e.name}</div>
                </div>
              </div>
              ${t?K`
                <div class="mr-vol-slider"
                  @pointerdown=${t=>this._onMrVolPointerDown(t,e.entityId)}>
                  <div class="mr-vol-fill" style="width:${Math.round(100*e.volume)}%"></div>
                  <div class="mr-vol-icon"><ha-icon .icon=${"mdi:volume-medium"}></ha-icon></div>
                  <span class="mr-vol-val">${Math.round(100*e.volume)}%</span>
                </div>
              `:Q}
            </div>
          `})}
      </div>
    `}_collapseExpanded(){this._foldOpen&&(this._foldOpen=!1,this._foldTab="controls")}render(){if(this._lang,!this.hass)return Q;if(!this._configLoaded)return Q;const e=this._mediaConfig.show_header;if(this.isDashboard){const t=this._getActiveRooms();if(0===t.length)return this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),K`
          ${e?K`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${je("media.title")}</span>
              </div>
            </div>
          `:Q}
          ${this._renderHero(this._lastMaster)}
        `):Q;if(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._roomEntityId){const e=t.findIndex(e=>e.entityId===this._roomEntityId);e>=0?this._roomIndex=e:this._roomIndex>=t.length&&(this._roomIndex=0)}this._roomIndex>=t.length&&(this._roomIndex=0);const i=t[this._roomIndex];return this._roomEntityId=i.entityId,this._lastMaster=i,K`
        ${e?K`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${je("media.title")}</span>
            </div>
            ${i.source?K`
              <span class="card-source active">${i.source}</span>
            `:Q}
          </div>
        `:Q}
        ${this._renderHero(i,t.length)}
        ${t.length>1?K`
          <div class="dash-dots">
            ${t.map((e,t)=>K`
              <button class="dash-dot ${t===this._roomIndex?"active":""}"
                aria-label=${je("media.room_dot_aria",{index:t+1})}
                aria-current=${t===this._roomIndex?"true":"false"}
                @click=${e=>{e.stopPropagation(),t!==this._roomIndex&&this._swipeToRoom(t>this._roomIndex?"left":"right",t)}}>
              </button>
            `)}
          </div>
        `:Q}
      `}const t=this._getPlayers(),i=this._findMaster(t);return i&&_i(i.state)?(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=i,K`
      ${e?K`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${je("media.title")}</span>
          </div>
          ${i.source?K`
            <span class="card-source active">${i.source}</span>
          `:Q}
        </div>
      `:Q}
      ${this._renderHero(i)}
    `):this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),K`
        ${e?K`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${je("media.title")}</span>
            </div>
          </div>
        `:Q}
        ${this._renderHero(this._lastMaster)}
      `):Q}static{this.styles=[ue,_e,ge,ve,be,c`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        font-family: 'Plus Jakarta Sans', sans-serif;
        /* media player tokens */
        --mp-color: #818cf8;
        --mp-bg: rgba(129,140,248,0.1);
        --mp-border: rgba(129,140,248,0.15);
        --mp-glow: rgba(129,140,248,0.4);
        --mp-sub: rgba(129,140,248,0.55);
      }

      /* ── Header ── */
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 6px; margin-bottom: 6px; min-height: 22px;
      }
      .card-header-left { display: flex; align-items: center; gap: 8px; }
      .card-title {
        font-size: 9px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }
      .card-source {
        font-size: 10px; font-weight: 500; color: var(--t4);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: 50%;
        opacity: 0; transition: opacity var(--t-fast);
      }
      .card-source.active { opacity: 1; color: var(--mp-sub); }

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
      .swipe-exit-left  { animation: swipe-exit-l 220ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none; }
      .swipe-enter-right { animation: swipe-enter-r 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; }
      .swipe-exit-right  { animation: swipe-exit-r 220ms cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none; }
      .swipe-enter-left  { animation: swipe-enter-l 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events: none; }

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
          0 8px 32px rgba(0,0,0,0.3),
          0 2px 8px rgba(0,0,0,0.2),
          inset 0 1px 0 rgba(255,255,255,0.04),
          inset 0 -1px 0 rgba(0,0,0,0.1);
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
          rgba(0,0,0,0.08) 0%,
          rgba(0,0,0,0) 25%,
          rgba(0,0,0,0) 50%,
          rgba(0,0,0,0.15) 75%,
          rgba(0,0,0,0.4) 100%
        );
      }

      /* ── Decorative shapes (no-artwork fallback) ── */
      .dash-deco {
        position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
        background: linear-gradient(135deg, rgba(30,30,50,1) 0%, rgba(15,15,30,1) 50%, rgba(25,20,40,1) 100%);
      }
      .dash-deco::before {
        content: ''; position: absolute;
        width: 280px; height: 280px; border-radius: 50%;
        top: -80px; right: -60px;
        background: radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%);
      }
      .dash-deco::after {
        content: ''; position: absolute;
        width: 220px; height: 220px; border-radius: 50%;
        bottom: -50px; left: -40px;
        background: radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%);
      }
      .dash-placeholder {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .dash-placeholder ha-icon {
        --mdc-icon-size: 80px;
        color: rgba(255,255,255,0.06);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Content ── */
      .dash-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        min-height: 340px;
        padding: 14px;
      }

      /* ── Glass pill (shared for top badges) ── */
      .glass-pill {
        backdrop-filter: blur(16px) saturate(1.3);
        -webkit-backdrop-filter: blur(16px) saturate(1.3);
        background: rgba(0,0,0,0.22);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }

      /* ── Glass panel (bottom info card) — frosted glass, artwork bleeds through ── */
      .glass-panel {
        border-radius: var(--radius-lg);
        backdrop-filter: blur(10px) saturate(1.4);
        -webkit-backdrop-filter: blur(10px) saturate(1.4);
        background: rgba(0,0,0,0.25);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow:
          0 4px 16px rgba(0,0,0,0.12),
          inset 0 1px 0 rgba(255,255,255,0.08);
      }

      /* ── Top bar ── */
      .dash-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .dash-speaker {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 4px 10px 4px 6px;
        border-radius: var(--radius-full, 9999px);
        font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.9);
        overflow: hidden; white-space: nowrap;
      }
      .dash-speaker ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 13px;
      }
      .dash-group-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 2px 8px; border-radius: 20px;
        color: rgba(255,255,255,0.9);
        font-size: 10px; font-weight: 600;
      }
      .dash-group-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 12px;
      }

      /* ── Equalizer bars ── */
      .dash-eq {
        display: flex; align-items: flex-end; gap: 2px;
        height: 14px; margin-left: 6px;
      }
      .dash-eq-bar {
        width: 3px; border-radius: 1.5px;
        background: #fff;
        box-shadow: 0 0 3px rgba(255,255,255,0.6);
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
        display: flex; flex-direction: column; gap: 8px;
        padding: 12px 14px;
      }

      /* ── Track info ── */
      .dash-track {
        display: flex; flex-direction: column; gap: 2px;
        min-width: 0;
      }
      .dash-track-title {
        font-size: 16px; font-weight: 700; color: #fff; line-height: 1.2;
        overflow: hidden; white-space: nowrap;
        text-shadow: 0 1px 4px rgba(0,0,0,0.5), 0 0 12px rgba(0,0,0,0.3);
      }
      .dash-track-artist {
        font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.75);
        overflow: hidden; white-space: nowrap;
        text-shadow: 0 1px 3px rgba(0,0,0,0.5);
      }

      /* ── Time row ── */
      .dash-time-row {
        display: flex; justify-content: space-between; align-items: center;
      }
      .dash-track-time {
        font-size: 9px; font-weight: 500; color: rgba(255,255,255,0.4);
        font-variant-numeric: tabular-nums;
        text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      }
      .dash-track-source {
        font-size: 8px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.5px; color: rgba(255,255,255,0.3);
        padding: 1px 6px; border-radius: 4px;
        background: rgba(255,255,255,0.06);
      }
      .dash-source-row {
        display: flex; align-items: center; justify-content: center; gap: 8px;
        margin-top: -2px;
      }
      .dash-coordinator-badge {
        display: inline-flex; align-items: center; gap: 4px;
        font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.5);
      }
      .dash-coordinator-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 11px;
      }

      /* ── Progress bar ── */
      .dash-progress-wrap {
        margin-top: 0;
      }
      .dash-progress {
        position: relative; width: 100%; height: 4px;
        border-radius: 2px; background: var(--s2);
        cursor: pointer; touch-action: none;
        transition: height var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-progress:hover { height: 6px; }
        .dash-progress:hover .dash-progress-thumb { opacity: 1; }
      }
      .dash-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit;
        background: var(--c-accent-dynamic, var(--mp-color));
        box-shadow: 0 0 8px var(--mp-glow);
        transition: width 0.3s linear;
        pointer-events: none;
      }
      .dash-progress-thumb {
        position: absolute; top: 50%; transform: translate(-50%, -50%);
        width: 10px; height: 10px; border-radius: 50%;
        background: #fff; box-shadow: 0 0 6px rgba(0,0,0,0.3);
        pointer-events: none; opacity: 0; transition: opacity var(--t-fast);
      }

      /* ── Transport ── */
      .dash-transport {
        display: flex; align-items: center; justify-content: center; gap: 8px;
        margin-top: 2px;
      }
      .transport-btn {
        width: 36px; height: 36px; border-radius: var(--radius-md);
        background: transparent; border: 1px solid transparent;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
        -webkit-tap-highlight-color: transparent;
        color: rgba(255,255,255,0.7);
      }
      .transport-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 18px;
      }
      @media (hover: hover) and (pointer: fine) {
        .transport-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
      }
      .transport-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .transport-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .transport-btn:active { transform: scale(0.96); } }
      .transport-btn.active {
        color: var(--c-accent-dynamic, var(--mp-color));
        background: color-mix(in srgb, var(--c-accent-dynamic, var(--mp-color)) 12%, transparent);
        border-color: color-mix(in srgb, var(--c-accent-dynamic, var(--mp-color)) 25%, transparent);
      }

      .transport-skip { width: 40px; height: 40px; }
      .transport-skip ha-icon { --mdc-icon-size: 26px; }
      .transport-skip { color: rgba(255,255,255,0.85); }

      .transport-main {
        width: 52px; height: 52px; border-radius: 16px;
        background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.15);
        color: #fff;
      }
      .transport-main ha-icon { --mdc-icon-size: 28px; }
      @media (hover: hover) and (pointer: fine) {
        .transport-main:hover {
          background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.25);
        }
        .transport-main:active { transform: scale(0.96); }
      }
      @media (pointer: coarse) { .transport-main:active { animation: bounce 0.3s ease; } }

      /* ── Idle state ── */
      .dash-idle {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        flex: 1; gap: 8px; padding: 20px;
      }
      .dash-idle ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 32px; color: var(--t4);
      }
      .dash-idle span { font-size: 11px; color: var(--t3); font-weight: 500; }

      /* ── Navigation arrows (hover on sides) ── */
      .dash-nav-arrow {
        position: absolute; top: 0; bottom: 0; width: 40px; z-index: 8;
        display: flex; align-items: center; justify-content: center;
        background: none; border: none; cursor: pointer; padding: 0;
        opacity: 0; transition: opacity var(--t-fast);
        -webkit-tap-highlight-color: transparent; outline: none;
      }
      .dash-nav-arrow ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 24px; color: rgba(255,255,255,0.7);
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.5));
        transition: color var(--t-fast);
      }
      .dash-nav-left { left: 0; border-radius: var(--radius-xl) 0 0 var(--radius-xl); }
      .dash-nav-right { right: 0; border-radius: 0 var(--radius-xl) var(--radius-xl) 0; }
      @media (hover: hover) and (pointer: fine) {
        .dash-nav-left:hover, .dash-nav-right:hover {
          background: linear-gradient(90deg, rgba(0,0,0,0.25), transparent);
        }
        .dash-nav-right:hover {
          background: linear-gradient(270deg, rgba(0,0,0,0.25), transparent);
        }
        .dash-nav-arrow:hover ha-icon { color: #fff; }
        .dash-hero:hover .dash-nav-arrow { opacity: 1; }
      }
      @media (pointer: coarse) { .dash-nav-arrow:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .dash-nav-arrow:active { transform: scale(0.95); } }
      .dash-nav-arrow:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

      /* ── Room dots (dashboard swipe indicator) ── */
      .dash-dots {
        display: flex; justify-content: center; gap: 6px;
        padding: 8px 0 2px;
      }
      .dash-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: rgba(255,255,255,0.2); border: none;
        padding: 0; cursor: pointer; transition: all var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .dash-dot.active {
        background: rgba(255,255,255,0.7);
        transform: scale(1.3);
      }
      @media (hover: hover) and (pointer: fine) { .dash-dot:hover { background: rgba(255,255,255,0.5); } }
      @media (pointer: coarse) { .dash-dot:active { animation: bounce 0.3s ease; } }
      .dash-dot:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 2px; }

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
        background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        border: 1px solid var(--b2);
        border-top: none;
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
        box-shadow:
          0 8px 32px rgba(0,0,0,0.3),
          0 2px 8px rgba(0,0,0,0.2),
          inset 0 -1px 0 rgba(0,0,0,0.1);
      }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .ctrl-label {
        font-size: 9px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t4); margin-bottom: -4px;
      }

      .dash-fold-sep-top {
        height: 1px; margin: 0 12px;
        background: linear-gradient(90deg, transparent, var(--mp-border), transparent);
      }
      .dash-fold-panel {
        display: flex; flex-direction: column; gap: 10px;
        padding: 12px 16px 14px;
      }
      .dash-fold-sep {
        height: 1px; margin: 2px 0;
        background: linear-gradient(90deg, transparent, var(--mp-border), transparent);
      }

      /* ── Volume row ── */
      .volume-row { display: flex; align-items: center; gap: 8px; }
      .volume-btn {
        width: 28px; height: 28px; border-radius: var(--radius-sm);
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all var(--t-fast); outline: none; padding: 0;
        -webkit-tap-highlight-color: transparent; flex-shrink: 0;
        color: var(--t3);
      }
      .volume-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 18px;
      }
      @media (hover: hover) and (pointer: fine) { .volume-btn:hover { color: var(--t2); } }
      .volume-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .volume-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .volume-btn:active { transform: scale(0.96); } }
      .volume-btn.muted { color: var(--c-alert); }

      /* ── Slider (pill) ── */
      .slider {
        position: relative; flex: 1; height: 36px;
        border-radius: var(--radius-lg); background: var(--s1);
        border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
        touch-action: none; user-select: none; -webkit-user-select: none;
      }
      .slider-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit; pointer-events: none;
        transition: width var(--t-fast);
      }
      .slider-fill.accent { background: linear-gradient(90deg, rgba(129,140,248,0.15), rgba(129,140,248,0.25)); }
      .slider-thumb {
        position: absolute; top: 50%; transform: translate(-50%, -50%);
        width: 8px; height: 20px; border-radius: 4px;
        background: rgba(255,255,255,0.7); box-shadow: 0 0 8px rgba(255,255,255,0.2);
        pointer-events: none;
      }
      .slider-val {
        position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
        font-size: 11px; font-weight: 600; color: var(--t3); pointer-events: none;
      }

      /* ── Chips ── */
      .chips-row { display: flex; gap: 6px; flex-wrap: wrap; }
      .chip {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 5px 10px; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: 10px; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.8px;
        color: var(--t3); cursor: pointer; transition: all var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .chip ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 14px;
      }
      @media (hover: hover) and (pointer: fine) {
        .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      .chip:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      @media (pointer: coarse) { .chip:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .chip:active { transform: scale(0.96); } }
      .chip.active {
        border-color: rgba(129,140,248,0.2); background: rgba(129,140,248,0.08);
        color: rgba(129,140,248,0.8);
      }

      /* ── Multiroom grid ── */
      .multiroom-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
      }
      .mr-cell {
        display: flex; flex-direction: column; gap: 4px;
        padding: 6px; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        transition: all var(--t-fast);
      }
      .mr-cell.joined {
        background: rgba(129,140,248,0.06); border-color: var(--mp-border);
      }
      .mr-cell-top {
        display: flex; align-items: center; gap: 6px;
      }
      .mr-icon-btn {
        width: 28px; height: 28px; border-radius: var(--radius-sm);
        background: var(--s2); border: 1px solid var(--b1);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        cursor: pointer; padding: 0; outline: none;
        transition: all var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        color: var(--t4);
      }
      .mr-icon-btn ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 14px;
      }
      @media (hover: hover) and (pointer: fine) {
        .mr-icon-btn:hover { background: var(--s3); border-color: var(--b2); color: var(--t2); }
      }
      @media (pointer: coarse) { .mr-icon-btn:active { animation: bounce 0.3s ease; } }
      @media (hover: hover) and (pointer: fine) { .mr-icon-btn:active { transform: scale(0.96); } }
      .mr-icon-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      .mr-cell.joined .mr-icon-btn {
        background: var(--mp-bg); border-color: var(--mp-border); color: var(--mp-color);
      }

      .mr-info { flex: 1; min-width: 0; }
      .mr-name {
        font-size: 10px; font-weight: 600; color: var(--t3);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .mr-cell.joined .mr-name { color: var(--t2); }
      .mr-coordinator {
        font-size: 7px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
        color: var(--mp-sub);
      }

      /* Multiroom volume slider */
      .mr-vol-slider {
        position: relative; width: 100%; height: 20px;
        border-radius: 6px; background: var(--s2);
        border: 1px solid var(--b1); overflow: hidden; cursor: pointer;
        touch-action: none; user-select: none; -webkit-user-select: none;
      }
      .mr-vol-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: inherit; pointer-events: none;
        background: linear-gradient(90deg, rgba(129,140,248,0.08), rgba(129,140,248,0.18));
        transition: width var(--t-fast);
      }
      .mr-cell.joined .mr-vol-fill {
        background: linear-gradient(90deg, rgba(129,140,248,0.12), rgba(129,140,248,0.25));
      }
      .mr-vol-val {
        position: absolute; top: 50%; right: 6px; transform: translateY(-50%);
        font-size: 8px; font-weight: 600; color: var(--t4); pointer-events: none;
        font-variant-numeric: tabular-nums;
      }
      .mr-cell.joined .mr-vol-val { color: var(--mp-sub); }
      .mr-vol-icon {
        position: absolute; top: 0; bottom: 0; left: 6px;
        display: flex; align-items: center;
        pointer-events: none;
      }
      .mr-vol-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 11px; color: var(--t4);
      }
      .mr-cell.joined .mr-vol-icon ha-icon { color: var(--mp-sub); }

      /* ── Segmented control ── */
      .segmented {
        display: inline-flex; gap: 0;
        border-radius: 12px; background: var(--s1);
        border: 1px solid var(--b1); padding: 3px;
        margin-bottom: 8px; width: 100%;
      }
      .seg-btn {
        flex: 1;
        padding: 7px 0; border-radius: 9px;
        font-family: inherit; font-size: 11px; font-weight: 600;
        color: var(--t3); cursor: pointer; transition: all var(--t-fast);
        border: none; background: transparent; outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .seg-btn.active {
        background: var(--s4); color: var(--t1);
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .seg-btn:hover:not(.active) { color: var(--t2); }
      }
      .seg-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

      /* ── Queue tab ── */
      .queue-loading, .queue-empty {
        text-align: center;
        padding: 20px 0;
        font-size: 11px;
        color: var(--t3);
        font-weight: 500;
      }
      .queue-list {
        max-height: 280px;
        overflow-y: auto;
        scrollbar-width: none;
      }
      .queue-list::-webkit-scrollbar { display: none; }
      .queue-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 4px;
      }
      .queue-num {
        width: 20px;
        flex-shrink: 0;
        font-size: 11px;
        font-weight: 500;
        color: var(--t4);
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
        font-size: 12px;
        font-weight: 500;
        color: var(--t1);
        overflow: hidden;
        white-space: nowrap;
      }
      .queue-artist {
        font-size: 10px;
        color: var(--t3);
      }
      .queue-badge {
        font-size: 9px;
        padding: 1px 5px;
        border-radius: var(--radius-sm);
        background: var(--s2);
        color: var(--t2);
        flex-shrink: 0;
      }
      .queue-item .btn-icon {
        width: 24px; height: 24px;
        border-radius: var(--radius-sm);
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; padding: 0; outline: none;
        color: var(--t3); flex-shrink: 0;
        transition: color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .queue-item .btn-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 16px;
      }
      @media (hover: hover) and (pointer: fine) {
        .queue-item .btn-icon:hover { color: var(--t1); }
      }
      .queue-item .btn-icon:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      .queue-remove { opacity: 0.4; --mdc-icon-size: 14px; }
      @media (hover: hover) and (pointer: fine) {
        .queue-remove:hover { opacity: 1; color: var(--c-alert, #ef4444) !important; }
      }
      @media (pointer: coarse) { .queue-remove:active { animation: bounce 0.3s ease; } }
    `]}}di([Ae()],vi.prototype,"areaId"),di([Le()],vi.prototype,"_foldOpen"),di([Le()],vi.prototype,"_mediaConfig"),di([Le()],vi.prototype,"_configLoaded"),di([Le()],vi.prototype,"_roomIndex"),di([Le()],vi.prototype,"_swipeClass"),di([Le()],vi.prototype,"_foldTab"),di([Le()],vi.prototype,"_queueData"),di([Le()],vi.prototype,"_radioTracks");try{customElements.define("glass-media-card",vi)}catch{}var bi=Object.defineProperty,yi=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&bi(t,i,r),r};const xi=[{from:"#6366f1",to:"#8b5cf6"},{from:"#ec4899",to:"#f472b6"},{from:"#f59e0b",to:"#fbbf24"},{from:"#10b981",to:"#34d399"},{from:"#06b6d4",to:"#22d3ee"},{from:"#f43f5e",to:"#fb7185"}];function wi(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}class ki extends He{constructor(){super(...arguments),this._presenceConfig={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}},this._activePerson=null,this._notifText="",this._configLoaded=!1,this._configLoadingInProgress=!1,this._prevActivePerson=null}connectedCallback(){super.connectedCallback(),this._listen("presence-config-changed",()=>{this._configLoaded=!1,this._loadConfig()}),this._clockInterval=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,clearInterval(this._clockInterval),this._clockInterval=void 0}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new Ue(this.hass),this._loadConfig())),e.has("_activePerson")&&this._activePerson&&this._activePerson!==this._prevActivePerson&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shadowRoot?.querySelectorAll(".fold-sep").forEach(e=>e.classList.add("visible")),this.shadowRoot?.querySelector(".ctrl-fold")?.classList.add("open")})),this._prevActivePerson=this._activePerson}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");e?.presence_card&&(this._presenceConfig=e.presence_card),this._configLoaded=!0,this._configLoadingInProgress=!1,this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}getTrackedEntityIds(){return this._getPersonIds()}_getPersonIds(){return this._presenceConfig.person_entities.length>0?this._presenceConfig.person_entities.filter(e=>this.hass?.states[e]):this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")):[]}_getPersonData(e){const t=this.hass?.states[e];if(!t)return null;const i=t.attributes,a=i.friendly_name||e.split(".")[1],s=i.entity_picture||null,r=this._presenceConfig.smartphone_sensors[e],o=r?this.hass?.states[r]:null,n=o?.attributes??{};let l=o?wi(o.state):null;null==l&&(l=wi(i.battery_level));const c=wi(n.heart_rate),d=wi(n.oxygen_saturation),h=wi(n.daily_steps),p=n.geocoded_location||null,u=this._presenceConfig.notify_services[e]||n.notify_service||null,_=this._presenceConfig.driving_sensors[e];let g=!1;return _&&this.hass?.states[_]?g="on"===this.hass.states[_].state:"on"!==n.android_auto&&!0!==n.android_auto||(g=!0),{entityId:e,name:a,state:t.state,entityPicture:s,latitude:wi(i.latitude),longitude:wi(i.longitude),sourceType:i.source_type||"gps",batteryLevel:l,lastUpdated:t.last_updated,geocodedLocation:p,heartRate:c,spo2:d,steps:h,isDriving:g,notifyService:u}}_presenceClass(e){let t=!1,i=!1;for(const a of e)"home"===a.state?t=!0:i=!0;return t&&i?"mixed":t?"home":"away"}_collapseExpanded(){this._activePerson&&(this._activePerson=null)}async _sendNotification(e){if(this.hass&&e.notifyService&&this._notifText.trim())try{let t="notify",i=e.notifyService;if(i.includes(".")){const e=i.split(".");t=e[0],i=e.slice(1).join(".")}const a=this.hass.user?.name||"Home Assistant";await this.hass.callService(t,i,{title:je("presence.notif_title",{name:a}),message:this._notifText.trim()}),this._notifText="",this._activePerson=null}catch{}}render(){if(this._lang,!this.hass)return Q;const e=this._getPersonIds();if(0===e.length)return Q;const t=e.map(e=>this._getPersonData(e)).filter(e=>null!==e);if(0===t.length)return Q;const i=t.filter(e=>"home"===e.state).length,a=this._presenceClass(t),s=0===i?"all-away":i===t.length?"all-home":"mixed";return K`
      ${this._presenceConfig.show_header?K`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${1===t.length?je("presence.title_single"):je("presence.title")}</span>
              </div>
              <span class="card-count ${s}">${i}/${t.length}</span>
            </div>
          `:Q}
      <div class="glass presence-card" data-presence=${a}>
        <div class="card-tint"></div>
        <div class="card-inner ${this._layoutClass(t.length)}">
          ${this._renderPersons(t)}
        </div>
        ${this._renderFold(t,a)}
      </div>
    `}_layoutClass(e){return 1===e?"solo-layout":2===e?"":"family-layout"}_renderPersons(e){if(1===e.length)return K`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderSoloChips(e[0])}
      `;if(2===e.length)return K`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderDistance(e[0],e[1])}
        ${this._renderPerson(e[1],!0,1)}
      `;const t=[];for(let i=0;i<e.length;i+=2)i>0&&t.push(K`<div class="family-sep"></div>`),i+1<e.length?t.push(K`
          <div class="family-row">
            ${this._renderPerson(e[i],!1,i)}
            ${this._renderDistance(e[i],e[i+1])}
            ${this._renderPerson(e[i+1],!0,i+1)}
          </div>
        `):t.push(K`
          <div class="family-row solo-row">
            ${this._renderPerson(e[i],!1,i)}
          </div>
        `);return K`${t}`}_renderPerson(e,t,i=0){const a=xi[i%xi.length];return K`
      <div class="person-block ${t?"right":""}">
        <button
          class="avatar-wrapper"
          aria-label=${je("presence.avatar_aria",{name:e.name})}
          aria-expanded=${String(this._activePerson===e.entityId)}
          @click=${t=>{t.stopPropagation();const i=this._activePerson===e.entityId?null:e.entityId;i!==this._activePerson&&(this._notifText=""),this._activePerson=i}}
        >
          ${e.entityPicture?K`<img class="avatar" src=${e.entityPicture} alt=${e.name} />`:K`
                <div
                  class="avatar avatar-fallback"
                  style="background: linear-gradient(135deg, ${a.from}, ${a.to})"
                >
                  <ha-icon .icon=${"mdi:account"}></ha-icon>
                </div>
              `}
          <div class="avatar-status ${s=e.state,"home"===s?"home":"not_home"===s?"away":"zone"}"></div>
        </button>
        <div class="person-info">
          <div class="person-name">${e.name}</div>
          <div class="person-sub">
            <div class="person-line">
              <span class="source-icon"><ha-icon .icon=${function(e){switch(e){case"gps":default:return"mdi:crosshairs-gps";case"router":return"mdi:router-wireless";case"bluetooth":case"bluetooth_le":return"mdi:bluetooth"}}(e.sourceType)}></ha-icon></span>
              <span class="person-location">${me(function(e){return"home"===e?je("presence.home"):"not_home"===e?je("presence.away"):e.charAt(0).toUpperCase()+e.slice(1)}(e.state),fe)}</span>
              ${e.isDriving?K`<span class="driving-icon"><ha-icon .icon=${"mdi:car"}></ha-icon></span>`:Q}
            </div>
          </div>
        </div>
      </div>
    `;var s}_renderDistance(e,t){if(null==e.latitude||null==e.longitude||null==t.latitude||null==t.longitude)return Q;const i=function(e,t,i,a){const s=(i-e)*Math.PI/180,r=(a-t)*Math.PI/180,o=Math.sin(s/2)**2+Math.cos(e*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(r/2)**2;return 12742*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}(e.latitude,e.longitude,t.latitude,t.longitude),a=i<.05,s=String(i<1?Math.round(1e3*i):Math.round(i)),r=je(i<1?"presence.distance_m":"presence.distance_km");return K`
      <div class="distance-center ${a?"near":""}">
        <div class="distance-line"></div>
        <div class="distance-info">
          <div class="distance-value">${s}</div>
          <div class="distance-unit">${r}</div>
        </div>
        <div class="heart-pulse" aria-hidden="true"><ha-icon .icon=${"mdi:heart"}></ha-icon></div>
        <div class="distance-line right"></div>
      </div>
    `}_renderSoloChips(e){return null==e.heartRate&&null==e.spo2&&null==e.steps?Q:K`
      <div class="solo-health-chips">
        ${null!=e.heartRate?K`<div class="solo-chip bpm"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon><span class="solo-chip-val">${e.heartRate}</span></div>`:Q}
        ${null!=e.spo2?K`<div class="solo-chip spo2"><ha-icon .icon=${"mdi:water-percent"}></ha-icon><span class="solo-chip-val">${e.spo2}%</span></div>`:Q}
        ${null!=e.steps?K`<div class="solo-chip steps"><ha-icon .icon=${"mdi:walk"}></ha-icon><span class="solo-chip-val">${e.steps.toLocaleString()}</span></div>`:Q}
      </div>
    `}_renderFold(e,t){if(!this._activePerson)return Q;const i=e.find(e=>e.entityId===this._activePerson);if(!i)return Q;const a=null!=i.heartRate||null!=i.spo2||null!=i.steps;return K`
      <div class="fold-sep ${t}"></div>
      <div class="ctrl-fold">
        <div class="ctrl-fold-inner">
          <div class="fold-content">
            <div class="health-address-row">
              ${i.geocodedLocation?K`
                <ha-icon .icon=${"mdi:map-marker"}></ha-icon>
                <span class="address-text">${i.geocodedLocation}</span>
              `:Q}
              <span class="fold-meta">
                ${null!=i.batteryLevel?K`
                  <span class="fold-battery ${s=i.batteryLevel,s>50?"high":s>20?"medium":"low"}">
                    <ha-icon .icon=${function(e){return e>80?"mdi:battery":e>60?"mdi:battery-70":e>40?"mdi:battery-50":e>20?"mdi:battery-30":"mdi:battery-10"}(i.batteryLevel)}></ha-icon>
                    ${i.batteryLevel}%
                  </span>
                `:Q}
                <span class="fold-last-seen">${function(e){const t=Math.floor((Date.now()-new Date(e).getTime())/1e3);return t<60?je("presence.just_now"):t<3600?je("presence.min_ago",{count:Math.floor(t/60)}):t<86400?je("presence.hours_ago",{count:Math.floor(t/3600)}):je("presence.days_ago",{count:Math.floor(t/86400)})}(i.lastUpdated)}</span>
              </span>
            </div>
            ${a?K`
                  <div class="health-zone-label">
                    ${je("presence.health_label")}
                    <span class="health-zone-name">${i.name}</span>
                  </div>
                  <div class="health-pills">
                    ${null!=i.heartRate?K`
                          <div class="health-pill bpm">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.heartRate}</span>
                              <span class="health-pill-label">${je("presence.bpm")}</span>
                            </div>
                          </div>
                        `:Q}
                    ${null!=i.spo2?K`
                          <div class="health-pill spo2">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.spo2}%</span>
                              <span class="health-pill-label">${je("presence.spo2")}</span>
                            </div>
                          </div>
                        `:Q}
                    ${null!=i.steps?K`
                          <div class="health-pill steps">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:walk"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.steps.toLocaleString()}</span>
                              <span class="health-pill-label">${je("presence.steps")}</span>
                            </div>
                          </div>
                        `:Q}
                  </div>
                `:Q}
            ${i.notifyService?K`
                  <div class="notif-zone">
                    <div class="notif-to">
                      ${je("presence.notify_to")}
                      <span class="notif-to-name">${i.name}</span>
                    </div>
                    <div class="notif-row">
                      <textarea
                        class="notif-input"
                        placeholder=${je("presence.notify_placeholder")}
                        .value=${this._notifText}
                        @input=${e=>{this._notifText=e.target.value}}
                        @focus=${()=>this._scrollToTop()}
                      ></textarea>
                      <button
                        class="notif-send"
                        aria-label=${je("presence.send_aria")}
                        @click=${e=>{e.stopPropagation(),this._sendNotification(i)}}
                      >
                        <ha-icon .icon=${"mdi:send"}></ha-icon>
                      </button>
                    </div>
                  </div>
                `:Q}
          </div>
        </div>
      </div>
    `;var s}static{this.styles=[ue,_e,ye,ge,c`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      /* ── Header ── */
      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        width: 100%; padding: 0 6px; min-height: 22px; margin-bottom: 6px;
        box-sizing: border-box;
      }
      .card-header-left { display: flex; align-items: center; gap: 8px; }
      .card-title {
        font-size: 9px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.5px;
        color: var(--t4);
      }
      .card-count {
        display: inline-flex; align-items: center; justify-content: center;
        min-width: 14px; height: 14px; padding: 0 4px;
        border-radius: var(--radius-full);
        font-size: 9px; font-weight: 600;
        transition: all var(--t-med);
      }
      .card-count.all-home { background: rgba(74,222,128,0.15); color: var(--c-success); }
      .card-count.all-away { background: rgba(248,113,113,0.15); color: var(--c-alert); }
      .card-count.mixed { background: rgba(251,191,36,0.15); color: var(--c-warning); }

      /* ── Presence card ── */
      .presence-card { padding: 7px 14px; width: 100%; box-sizing: border-box; }

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
        background: linear-gradient(to right, rgba(74,222,128,0.15), transparent 40%, transparent 60%, rgba(248,113,113,0.15));
        opacity: 0.5;
      }

      .card-inner {
        position: relative; z-index: 1;
        display: flex; align-items: center;
      }

      /* Solo: person left, chips right */
      .card-inner.solo-layout { justify-content: space-between; gap: 8px; }

      /* Family: stacked pair rows */
      .card-inner.family-layout { flex-direction: column; gap: 0; }
      .family-row { display: flex; align-items: center; width: 100%; }
      .family-sep {
        height: 1px; margin: 8px 12px;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .family-row.solo-row { justify-content: center; }
      .family-row.solo-row .person-block { flex: 0 1 auto; }

      /* ── Person block ── */
      .person-block {
        display: flex; align-items: center; gap: 10px;
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
      .avatar-wrapper:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

      .avatar {
        width: 38px; height: 38px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        transition: border-color var(--t-med);
        object-fit: cover;
      }
      .avatar-fallback { border: 2px solid rgba(255,255,255,0.1); }
      img.avatar { display: block; }
      .avatar-fallback ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 22px; color: rgba(255,255,255,0.85);
      }

      @media (hover: hover) {
        .avatar-wrapper:hover .avatar { border-color: rgba(255,255,255,0.3); }
      }

      .avatar-status {
        position: absolute; bottom: -1px; right: -1px;
        width: 12px; height: 12px; border-radius: 50%;
        border: 2px solid rgba(15,25,35,0.9);
        transition: background var(--t-med), box-shadow var(--t-med);
      }
      .avatar-status.home { background: var(--c-success); box-shadow: 0 0 6px rgba(74,222,128,0.5); }
      .avatar-status.away { background: var(--c-alert); box-shadow: 0 0 6px rgba(248,113,113,0.5); }
      .avatar-status.zone { background: var(--c-info); box-shadow: 0 0 6px rgba(96,165,250,0.5); }

      .person-info { min-width: 0; flex: 1; }
      .person-name { font-size: 13px; font-weight: 600; color: var(--t1); line-height: 1.2; }
      .person-block.right .person-name { text-align: right; }

      .person-sub { display: flex; flex-direction: column; gap: 2px; margin-top: 2px; }
      .person-block.right .person-sub { align-items: flex-end; }

      .person-line { display: flex; align-items: center; gap: 4px; min-width: 0; }
      .person-block.right .person-line { flex-direction: row-reverse; }

      .person-location {
        font-size: 10px; font-weight: 500; color: var(--t3);
        white-space: nowrap; overflow: hidden; min-width: 0;
      }
      .source-icon { display: flex; align-items: center; flex-shrink: 0; }
      .source-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 10px; color: var(--t4);
      }

      .driving-icon { display: flex; align-items: center; flex-shrink: 0; }
      .driving-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 12px; color: var(--c-info); opacity: 0.7;
      }

      /* ── Distance ── */
      .distance-center { flex-shrink: 0; display: flex; align-items: center; padding: 0; gap: 0; }
      .distance-line {
        width: 20px; height: 1px;
        background: linear-gradient(to right, var(--b1), var(--b3));
      }
      .distance-line.right { background: linear-gradient(to right, var(--b3), var(--b1)); }
      .distance-info {
        display: flex; flex-direction: column; align-items: center;
        gap: 1px; padding: 0 4px;
      }
      .distance-value { font-size: 14px; font-weight: 700; color: var(--t2); white-space: nowrap; line-height: 1; }
      .distance-unit { font-size: 9px; font-weight: 400; color: var(--t4); text-align: center; line-height: 1; }

      .heart-pulse {
        display: none; color: #f472b6; line-height: 1; padding: 0 4px;
        filter: drop-shadow(0 0 4px rgba(244,114,182,0.35));
        animation: pulse-beat 2.5s ease-in-out infinite;
      }
      .heart-pulse ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 18px;
      }
      .distance-center.near .heart-pulse { display: flex; align-items: center; }
      .distance-center.near .distance-info { display: none; }
      @keyframes pulse-beat {
        0%, 100% { transform: scale(1); opacity: 0.55; }
        50% { transform: scale(1.05); opacity: 0.85; }
      }

      /* ── Solo health chips ── */
      .solo-health-chips { display: flex; align-items: center; gap: 5px; flex-shrink: 0; }
      .solo-chip {
        display: flex; align-items: center; gap: 3px;
        padding: 4px 8px; border-radius: var(--radius-full);
        background: var(--s2); border: 1px solid var(--b1);
        white-space: nowrap; line-height: 1;
      }
      .solo-chip ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 12px;
      }
      .solo-chip-val { font-size: 11px; font-weight: 600; }
      .solo-chip.bpm ha-icon, .solo-chip.bpm .solo-chip-val { color: var(--c-alert); opacity: 0.8; }
      .solo-chip.spo2 ha-icon, .solo-chip.spo2 .solo-chip-val { color: var(--c-info); opacity: 0.8; }
      .solo-chip.steps ha-icon, .solo-chip.steps .solo-chip-val { color: var(--c-success); opacity: 0.8; }

      /* ── Fold ── */
      .fold-sep {
        height: 1px; margin: 8px 12px 0;
        background: linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent);
        opacity: 0; transition: opacity 0.25s var(--ease-std);
      }
      .fold-sep.home { background: linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent); }
      .fold-sep.mixed { background: linear-gradient(90deg, transparent, rgba(96,165,250,0.3), transparent); }
      .fold-sep.away { background: linear-gradient(90deg, transparent, rgba(248,113,113,0.3), transparent); }
      .fold-sep.visible { opacity: 1; }
      .fold-sep.bottom { margin: 0 12px 4px; }

      .ctrl-fold {
        display: grid; grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
        position: relative; z-index: 1;
      }
      .ctrl-fold.open { grid-template-rows: 1fr; }
      .ctrl-fold-inner { overflow: hidden; opacity: 0; transition: opacity 0.25s var(--ease-std); }
      .ctrl-fold.open .ctrl-fold-inner { opacity: 1; transition-delay: 0.1s; }

      .fold-content { display: flex; flex-direction: column; gap: 6px; padding-top: 8px; }

      /* ── Health zone ── */
      .health-zone-label {
        font-size: 10px; font-weight: 500; color: var(--t4);
        display: flex; align-items: center; gap: 5px;
      }
      .health-zone-name { color: var(--t3); font-weight: 600; }

      .health-address-row {
        display: flex; align-items: center; gap: 5px;
        padding: 5px 8px; border-radius: var(--radius-sm);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .health-address-row > ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 12px; color: var(--t4); flex-shrink: 0;
      }
      .address-text {
        font-size: 10px; font-weight: 400; color: var(--t3);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        flex: 1; min-width: 0;
      }
      .fold-battery {
        display: flex; align-items: center; gap: 3px;
        font-size: 10px; font-weight: 500; flex-shrink: 0; margin-left: auto;
      }
      .fold-battery.high { color: var(--c-success); }
      .fold-battery.medium { color: var(--c-warning); }
      .fold-battery.low { color: var(--c-alert); }
      .fold-battery ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 14px; color: inherit;
      }
      .fold-meta {
        display: flex; align-items: center; gap: 6px;
        margin-left: auto; flex-shrink: 0;
      }
      .fold-last-seen {
        font-size: 10px; font-weight: 400; color: var(--t4); white-space: nowrap;
      }

      .health-pills { display: flex; gap: 6px; }
      .health-pill {
        flex: 1; display: flex; align-items: center; gap: 6px;
        padding: 6px 10px; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      @media (hover: hover) {
        .health-pill:hover { background: var(--s3); border-color: var(--b2); }
      }
      .health-pill-icon { flex-shrink: 0; display: flex; align-items: center; }
      .health-pill-icon ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 14px;
      }
      .health-pill-data { display: flex; flex-direction: column; min-width: 0; }
      .health-pill-value { font-size: 13px; font-weight: 700; line-height: 1.1; color: var(--t1); }
      .health-pill-label {
        font-size: 8px; font-weight: 500; text-transform: uppercase;
        letter-spacing: 0.8px; color: var(--t4); line-height: 1.2;
      }

      .health-pill.bpm .health-pill-icon ha-icon { color: var(--c-alert); }
      .health-pill.bpm .health-pill-value { color: var(--c-alert); opacity: 0.85; }
      .health-pill.spo2 .health-pill-icon ha-icon { color: var(--c-info); }
      .health-pill.spo2 .health-pill-value { color: var(--c-info); opacity: 0.85; }
      .health-pill.steps .health-pill-icon ha-icon { color: var(--c-success); }
      .health-pill.steps .health-pill-value { color: var(--c-success); opacity: 0.85; }

      /* ── Notification zone ── */
      .notif-zone { padding: 8px 0 4px; display: flex; gap: 8px; flex-direction: column; }
      .notif-to {
        font-size: 10px; font-weight: 500; color: var(--t4);
        display: flex; align-items: center; gap: 5px;
      }
      .notif-to-name { color: var(--t2); font-weight: 600; }

      .notif-row { display: flex; gap: 8px; align-items: flex-end; }
      .notif-input {
        flex: 1; padding: 8px 12px; border-radius: 12px;
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: 12px;
        outline: none; resize: none; height: 36px; box-sizing: border-box;
        transition: border-color var(--t-fast);
      }
      .notif-input::placeholder { color: var(--t4); }
      .notif-input:focus { border-color: var(--b3); }

      .notif-send {
        width: 36px; height: 36px; border-radius: var(--radius-lg);
        border: 1px solid rgba(74,222,128,0.2);
        background: rgba(74,222,128,0.1); color: var(--c-success);
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; transition: background var(--t-fast), border-color var(--t-fast);
        padding: 0; outline: none; font-size: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .notif-send ha-icon {
        display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 16px;
      }
      @media (hover: hover) {
        .notif-send:hover { background: rgba(74,222,128,0.2); border-color: rgba(74,222,128,0.3); }
      }
      .notif-send:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
      .notif-send:active { transform: scale(0.96); }
    `]}}yi([Le()],ki.prototype,"_presenceConfig"),yi([Le()],ki.prototype,"_activePerson"),yi([Le()],ki.prototype,"_notifText");try{customElements.define("glass-presence-card",ki)}catch{}var $i=Object.defineProperty,Ci=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&$i(t,i,r),r};const Si=1,Ii="mdi:cctv",Ti="mdi:webcam",Pi="mdi:doorbell-video",Ei={person:"mdi:human",vehicle:"mdi:car",pet:"mdi:dog",animal:"mdi:paw",package:"mdi:package-variant",face:"mdi:face-recognition",baby_crying:"mdi:baby-face-outline",bicycle:"mdi:bicycle"},Ai={motion:/_(motion|mouvement)$/,record:/_(record|enregistrer)$/,siren:/^siren\./,floodlight:/_(floodlight|projecteur)$/,auto_tracking:/_(auto_tracking|suivi_automatique)$/},Li=[[/_person(ne)?$/,"person"],[/_vehicu?le$/,"vehicle"],[/_pet$|_animal_domestique$/,"pet"],[/_animal$/,"animal"],[/_face$|_visage$/,"face"],[/_package$|_colis$/,"package"],[/_baby_crying$|_pleur_bebe$/,"baby_crying"],[/_bicycl?e$|_velo$/,"bicycle"]],Mi=new Map;function zi(e,t,i){const a=i[e];if(!a?.device_id)return{motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};const s=a.device_id;let r=s;for(const c of Object.keys(i))i[c].device_id===s&&c.startsWith("binary_sensor.")&&t[c]&&(r+=`:${c}=${t[c].state}`);const o=Mi.get(e);if(o&&o.key===r)return o.result;const n=[];for(const[c,d]of Object.entries(i))d.device_id===s&&n.push(c);const l={motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};for(const c of n){const e=t[c];if(e&&(c.startsWith("binary_sensor.")&&Ai.motion.test(c)&&(l.motionSensorId=c),c.startsWith("switch.")&&Ai.record.test(c)&&(l.recordSwitchId=c),Ai.siren.test(c)&&(l.sirenId=c),c.startsWith("light.")&&Ai.floodlight.test(c)&&(l.floodlightId=c),c.startsWith("switch.")&&Ai.auto_tracking.test(c)&&(l.autoTrackId=c),c.startsWith("binary_sensor.")&&"on"===e.state))for(const[t,i]of Li)t.test(c)&&!l.aiDetected.includes(i)&&l.aiDetected.push(i)}return Mi.set(e,{key:r,result:l}),l}function Oi(e){const t=e.attributes?.icon;if(t)return t;const i=e.entity_id;return i.includes("doorbell")?Pi:i.includes("indoor")||i.includes("salon")||i.includes("chambre")?Ti:Ii}class Ri extends He{constructor(){super(...arguments),this._carouselIndex=0,this._liveIds=new Set,this._camConfig=null,this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._touchStartX=0,this._touchDelta=0,this._isSwiping=!1,this._trackEl=null,this._cachedCameraIds=[],this._cachedCamerasKey="",this._onPointerDown=e=>{if(e.target.closest(".carousel-nav, .stream-placeholder"))return;this._touchStartX=e.clientX,this._touchDelta=0,this._isSwiping=!0;e.currentTarget.setPointerCapture(e.pointerId),this._trackEl=this.shadowRoot?.querySelector(".carousel-track"),this._trackEl&&(this._trackEl.style.transition="none")},this._onPointerMove=e=>{if(!this._isSwiping)return;const t=this._trackEl??this.shadowRoot?.querySelector(".carousel-track");if(!t)return;this._trackEl=t,this._touchDelta=e.clientX-this._touchStartX;const i=e.currentTarget.offsetWidth,a=100*this._carouselIndex,s=this._touchDelta/i*100;this._trackEl.style.transform=`translateX(${-a+s}%)`},this._onPointerUp=e=>{if(!this._isSwiping||!this._trackEl)return;this._isSwiping=!1,this._trackEl.style.transition="";const t=.2*e.currentTarget.offsetWidth;this._touchDelta<-t?this._goTo(this._carouselIndex+1):this._touchDelta>t?this._goTo(this._carouselIndex-1):this._goTo(this._carouselIndex),this._trackEl=null},this._onPointerCancel=()=>{this._isSwiping&&this._trackEl&&(this._isSwiping=!1,this._trackEl.style.transition="",this._goTo(this._carouselIndex),this._trackEl=null)}}connectedCallback(){super.connectedCallback(),this._listen("camera-carousel-config-changed",()=>{this._configLoaded=!1,this._loadConfig()}),this._listen("dashboard-config-changed",()=>this.requestUpdate()),this._timestampTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._clearCycleTimer(),this._clearTimestampTimer(),Mi.clear()}getTrackedEntityIds(){if(!this.hass)return[];const e=this.hass;return this._getCameraIds().flatMap(t=>{const i=zi(t,e.states,e.entities);return[t,i.motionSensorId,i.recordSwitchId,i.sirenId,i.floodlightId,i.autoTrackId].filter(Boolean)})}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection===this.hass.connection||(this._backend=new Ue(this.hass))),this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._carouselIndex=0,this._cachedCamerasKey="",this._configLoaded=!1,this._liveIds=new Set),this._configLoaded||this._configLoading||this._loadConfig()}async _loadConfig(){if(!this._backend||this._configLoading)return;this._configLoading=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;this._camConfig=t.camera_carousel||{show_header:!0,entity_order:[],auto_cycle:!1,cycle_interval:10},this._configLoaded=!0,this._setupCycleTimer(),this.requestUpdate()}catch{}finally{this._configLoading=!1}}_getCameraIds(){if(!this.hass)return[];let e;e=this.areaId?Ve(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("camera.")).map(e=>e.entity_id):Object.keys(this.hass.states).filter(e=>e.startsWith("camera."));const t=e.length+":"+e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.last_changed}`:e}).join(",");if(t===this._cachedCamerasKey)return this._cachedCameraIds;const i=this._camConfig?.entity_order??[];if(i.length){const t=i.filter(t=>e.includes(t)),a=e.filter(e=>!t.includes(e));if(!this.areaId){const e=this.hass.states,t=this.hass.entities;a.sort((i,a)=>this._latestAlertTimestamp(a,e,t)-this._latestAlertTimestamp(i,e,t))}e=[...t,...a]}else if(!this.areaId){const t=this.hass.states,i=this.hass.entities;e.sort((e,a)=>this._latestAlertTimestamp(a,t,i)-this._latestAlertTimestamp(e,t,i))}return this._cachedCamerasKey=t,this._cachedCameraIds=e,this._carouselIndex>=e.length&&(this._carouselIndex=Math.max(0,e.length-1)),this._cachedCameraIds}_latestAlertTimestamp(e,t,i){const a=i[e];if(!a?.device_id)return 0;const s=a.device_id;let r=0;for(const[o,n]of Object.entries(i)){if(n.device_id!==s||!o.startsWith("binary_sensor."))continue;if(!Li.some(([e])=>e.test(o)))continue;const e=t[o];if(!e)continue;const i=new Date(e.last_changed).getTime();i>r&&(r=i)}return r}_getCameraInfo(e){if(!this.hass)return null;const t=this.hass.states[e];if(!t)return null;const i=t.attributes?.supported_features??0,a="unavailable"!==t.state&&!1!==t.attributes?.is_on,s=zi(e,this.hass.states,this.hass.entities);return{entityId:e,entity:t,name:t.attributes?.friendly_name||e.split(".")[1],state:t.state,isOn:a,features:i,entityPicture:t.attributes?.entity_picture??null,motionSensorId:s.motionSensorId,motionDetectionSupported:void 0!==t.attributes?.motion_detection,motionDetectionEnabled:!0===t.attributes?.motion_detection,hasMotion:!!s.motionSensorId&&"on"===this.hass.states[s.motionSensorId]?.state,recordSwitchId:s.recordSwitchId,isRecording:"recording"===t.state||!!s.recordSwitchId&&"on"===this.hass.states[s.recordSwitchId]?.state,sirenId:s.sirenId,floodlightId:s.floodlightId,autoTrackId:s.autoTrackId,aiDetected:s.aiDetected,icon:Oi(t)}}_setupCycleTimer(){if(this._clearCycleTimer(),this._camConfig?.auto_cycle&&this._getCameraIds().length>1){const e=1e3*(this._camConfig.cycle_interval||10);this._cycleTimer=setInterval(()=>{if(this._isSwiping)return;const e=this._getCameraIds();e.length>1&&(this._carouselIndex=(this._carouselIndex+1)%e.length,this.requestUpdate())},e)}}_clearCycleTimer(){this._cycleTimer&&(clearInterval(this._cycleTimer),this._cycleTimer=void 0)}_clearTimestampTimer(){this._timestampTimer&&(clearInterval(this._timestampTimer),this._timestampTimer=void 0)}_goTo(e){const t=this._getCameraIds();t.length&&(this._carouselIndex=(e%t.length+t.length)%t.length,this._setupCycleTimer(),this.requestUpdate())}_prev(){this._goTo(this._carouselIndex-1)}_next(){this._goTo(this._carouselIndex+1)}_togglePower(e){if(!this.hass)return;const t=e.isOn?"turn_off":"turn_on";this.hass.callService("camera",t,{entity_id:e.entityId})}_snapshot(e){if(!this.hass)return;const t=new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0});this.dispatchEvent(t)}_toggleRecord(e){if(!this.hass||!e.recordSwitchId)return;const t="on"===this.hass.states[e.recordSwitchId]?.state;this.hass.callService("switch",t?"turn_off":"turn_on",{entity_id:e.recordSwitchId})}_toggleMotion(e){if(!this.hass)return;const t=e.motionDetectionEnabled?"disable_motion_detection":"enable_motion_detection";this.hass.callService("camera",t,{entity_id:e.entityId})}_toggleSiren(e){if(!this.hass||!e.sirenId)return;const t="on"===this.hass.states[e.sirenId]?.state;this.hass.callService("siren",t?"turn_off":"turn_on",{entity_id:e.sirenId})}_toggleFloodlight(e){if(!this.hass||!e.floodlightId)return;const t="on"===this.hass.states[e.floodlightId]?.state;this.hass.callService("light",t?"turn_off":"turn_on",{entity_id:e.floodlightId})}_toggleAutoTrack(e){if(!this.hass||!e.autoTrackId)return;const t="on"===this.hass.states[e.autoTrackId]?.state;this.hass.callService("switch",t?"turn_off":"turn_on",{entity_id:e.autoTrackId})}_startStream(e){const t=new Set(this._liveIds);t.add(e),this._liveIds=t}render(){if(this._lang,!this.hass)return Q;const e=this._getCameraIds();if(!e.length)return Q;const t=!1!==this._camConfig?.show_header,i=this._getCameraInfo(e[this._carouselIndex]);return K`
      ${t?K`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${je("camera.title")}</span>
          </div>
        </div>
      `:Q}
      <div class="glass carousel-card">
        <div class="tint" style="${this._tintStyle(i)}"></div>
        <div class="carousel-inner">
          <div class="carousel-viewport"
            @pointerdown=${this._onPointerDown}
            @pointermove=${this._onPointerMove}
            @pointerup=${this._onPointerUp}
            @pointercancel=${this._onPointerCancel}
          >
            <div class="carousel-track" style="transform:translateX(-${100*this._carouselIndex}%)">
              ${e.map((e,t)=>this._renderSlide(e,t===this._carouselIndex))}
            </div>
            ${e.length>1?K`
              <button class="carousel-nav prev" aria-label="${je("camera.prev_aria")}" @click=${this._prev}>
                <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
              </button>
              <button class="carousel-nav next" aria-label="${je("camera.next_aria")}" @click=${this._next}>
                <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
              </button>
            `:Q}
          </div>
          ${e.length>1?K`
            <div class="carousel-dots">
              ${e.map((e,t)=>this._renderDot(e,t))}
            </div>
          `:Q}
          ${i?this._renderInfoBar(i):Q}
          ${i?this._renderActions(i):Q}
        </div>
      </div>
    `}_tintStyle(e){if(!e||!e.isOn||"idle"===e.state)return"opacity:0";return`background:radial-gradient(ellipse at 50% 50%,${e.aiDetected.length>0?"var(--c-warning)":"var(--cam-color)"},transparent 70%);opacity:0.12`}_renderSlide(e,t){const i=this._getCameraInfo(e);if(!i)return K`<div class="carousel-slide"><div class="carousel-slide-inner off-feed"></div></div>`;const a=this._liveIds.has(e)||"streaming"===i.state||"recording"===i.state,s=i.isOn&&a&&t,r=i.isOn?a?"active-feed":"idle-feed":"off-feed";return K`
      <div class="carousel-slide">
        <div class="carousel-slide-inner ${r}">
          ${s&&this.hass?K`
            <ha-camera-stream
              .hass=${this.hass}
              .stateObj=${i.entity}
              .controls=${!1}
              .muted=${!0}
              class="cam-stream"
            ></ha-camera-stream>
          `:i.entityPicture&&i.isOn?K`
            <img class="cam-thumbnail" src="${i.entityPicture}" alt="${i.name}" />
          `:Q}
          ${i.isOn?K`
            <div class="stream-overlay-top">
              <div class="stream-cam-name">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:12px"></ha-icon>
                <span>${i.name}</span>
                ${i.isRecording?K`
                  <span class="rec-indicator">
                    <span class="rec-circle"></span> REC
                  </span>
                `:Q}
              </div>
              <div class="stream-time">${(new Date).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}</div>
            </div>
            <div class="stream-overlay-bottom">
              ${i.aiDetected.length>0?K`
                <div class="stream-ai-tags">
                  ${i.aiDetected.map(e=>K`
                    <div class="stream-ai-tag">
                      <ha-icon .icon=${Ei[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                      ${je(`camera.ai_${e}`)}
                    </div>
                  `)}
                </div>
              `:K`<div></div>`}
            </div>
            ${a?Q:K`
              <button class="stream-placeholder" @click=${t=>{t.stopPropagation(),this._startStream(e)}}
                aria-label="${je("camera.tap_to_stream")}">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
                <span>${je("camera.tap_to_stream")}</span>
              </button>
            `}
          `:K`
            <div class="stream-placeholder">
              <ha-icon .icon=${"mdi:camera-off"} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
              <span>${je("camera.camera_off")}</span>
            </div>
          `}
        </div>
      </div>
    `}_renderDot(e,t){const i=this._getCameraInfo(e);let a="carousel-dot-btn";return t===this._carouselIndex&&(a+=" active"),i?.aiDetected.length&&(a+=" motion-dot"),K`
      <button class="${a}"
        aria-label="${je("camera.dot_aria",{name:i?.name||""})}"
        @click=${()=>this._goTo(t)}
      ></button>
    `}_renderInfoBar(e){const t=e.isOn&&"idle"!==e.state;return K`
      <div class="carousel-info">
        <div class="carousel-cam-icon ${t?"on":""}">
          <ha-icon .icon=${e.icon} style="--mdc-icon-size:16px"></ha-icon>
        </div>
        <div class="carousel-info-text">
          <div class="carousel-cam-name">${me(e.name,fe)}</div>
          <div class="carousel-cam-sub">
            <span class="carousel-state ${t?"live":""}">${function(e,t){if(!t)return je("camera.off");switch(e){case"idle":return je("camera.idle");case"streaming":return je("camera.streaming");case"recording":return je("camera.recording");default:return e}}(e.state,e.isOn)}</span>
            ${e.aiDetected.length>0&&e.isOn?K`
              <div class="carousel-ai-mini">
                ${e.aiDetected.map(e=>K`
                  <div class="ai-badge active">
                    <ha-icon .icon=${Ei[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                  </div>
                `)}
              </div>
            `:Q}
          </div>
        </div>
      </div>
    `}_renderActions(e){if(!e.isOn)return K`
        <div class="carousel-actions">
          <button class="action-btn" @click=${()=>this._togglePower(e)} aria-label="${je("camera.power_on")}">
            <ha-icon .icon=${"mdi:power"} style="--mdc-icon-size:14px"></ha-icon>
            ${je("camera.power_on")}
          </button>
        </div>
      `;const t=0!==(e.features&Si),i=!!e.sirenId&&"on"===this.hass?.states[e.sirenId]?.state,a=!!e.floodlightId&&"on"===this.hass?.states[e.floodlightId]?.state,s=!!e.autoTrackId&&"on"===this.hass?.states[e.autoTrackId]?.state;return K`
      <div class="carousel-actions">
        ${t?K`
          <button class="action-btn active" @click=${()=>this._togglePower(e)} aria-label="${je("camera.power_off")}">
            <ha-icon .icon=${"mdi:power"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:Q}
        <button class="action-btn" @click=${()=>this._snapshot(e)} aria-label="${je("camera.snapshot")}">
          <ha-icon .icon=${"mdi:camera"} style="--mdc-icon-size:14px"></ha-icon>
          ${je("camera.snapshot")}
        </button>
        ${e.recordSwitchId?K`
          <button class="action-btn ${e.isRecording?"active-alert":""}" @click=${()=>this._toggleRecord(e)}
            aria-label="${e.isRecording?je("camera.record_stop"):je("camera.record_start")}">
            <ha-icon .icon=${e.isRecording?"mdi:record-circle":"mdi:record"} style="--mdc-icon-size:14px"></ha-icon>
            ${e.isRecording?je("camera.record_stop"):je("camera.record_start")}
          </button>
        `:Q}
        ${e.motionDetectionSupported?K`
          <button class="action-btn ${e.motionDetectionEnabled?"active":""}" @click=${()=>this._toggleMotion(e)}
            aria-label="${e.motionDetectionEnabled?je("camera.motion_on_aria"):je("camera.motion_off_aria")}">
            <ha-icon .icon=${e.motionDetectionEnabled?"mdi:motion-sensor":"mdi:motion-sensor-off"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:Q}
        ${e.sirenId?K`
          <button class="action-btn ${i?"active-alert":""}" @click=${()=>this._toggleSiren(e)}
            aria-label="${je("camera.siren_aria")}">
            <ha-icon .icon=${"mdi:bullhorn"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:Q}
        ${e.floodlightId?K`
          <button class="action-btn ${a?"active-warning":""}" @click=${()=>this._toggleFloodlight(e)}
            aria-label="${je("camera.floodlight_aria")}">
            <ha-icon .icon=${a?"mdi:flashlight":"mdi:flashlight-off"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:Q}
        ${e.autoTrackId?K`
          <button class="action-btn ${s?"active":""}" @click=${()=>this._toggleAutoTrack(e)}
            aria-label="${je("camera.auto_track_aria")}">
            <ha-icon .icon=${"mdi:target-account"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:Q}
      </div>
    `}static{this.styles=[ue,_e,ge,ve,c`
      :host {
        display: block;
        width: 100%;
        font-family: 'Plus Jakarta Sans', sans-serif;
        max-width: 500px;
        margin: 0 auto;

        --cam-color: #60a5fa;
        --cam-bg: rgba(96,165,250,0.1);
        --cam-border: rgba(96,165,250,0.15);
        --cam-glow: rgba(96,165,250,0.4);
        --cam-sub: rgba(96,165,250,0.6);
      }

      .card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 6px; margin-bottom: 6px; min-height: 22px;
      }
      .card-header-left { display: flex; align-items: center; gap: 8px; }
      .card-title {
        font-size: 9px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1.5px; color: var(--t4);
      }

      .carousel-card { width: 100%; padding: 14px; position: relative; box-sizing: border-box; }
      .carousel-inner {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; gap: 10px;
      }

      .tint {
        position: absolute; inset: 0; border-radius: inherit;
        pointer-events: none; z-index: 0;
        transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1), background 1.2s cubic-bezier(0.4,0,0.2,1);
      }

      /* — Viewport — */
      .carousel-viewport {
        position: relative; width: 100%; aspect-ratio: 16 / 9;
        border-radius: var(--radius-lg); overflow: hidden;
        background: #0a0f18; border: 1px solid var(--b1);
        touch-action: pan-y;
      }
      .carousel-track {
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
          radial-gradient(circle at 30% 40%, rgba(96,165,250,0.06) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(129,140,248,0.04) 0%, transparent 50%),
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
        padding: 8px 10px;
        background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%);
      }
      .stream-cam-name {
        font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.7);
        display: flex; align-items: center; gap: 5px;
      }
      .stream-cam-name ha-icon { display: flex; align-items: center; justify-content: center; }
      .rec-indicator {
        display: inline-flex; align-items: center; gap: 3px;
        font-size: 9px; font-weight: 700; color: var(--c-alert);
        letter-spacing: 0.5px;
      }
      .rec-circle {
        width: 6px; height: 6px; border-radius: 50%; background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      @keyframes rec-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--c-alert); }
        50% { opacity: 0.4; box-shadow: 0 0 0px var(--c-alert); }
      }
      .stream-time {
        font-size: 9px; font-weight: 500; color: rgba(255,255,255,0.5);
        font-variant-numeric: tabular-nums;
      }
      .stream-overlay-bottom {
        position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 10px;
        background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%);
      }
      .stream-ai-tags { display: flex; gap: 4px; }
      .stream-ai-tag {
        display: inline-flex; align-items: center; gap: 3px;
        padding: 2px 6px; border-radius: var(--radius-sm);
        font-size: 9px; font-weight: 600;
        background: rgba(96,165,250,0.15); color: var(--cam-color);
        border: 1px solid rgba(96,165,250,0.2);
      }
      .stream-ai-tag ha-icon { display: flex; align-items: center; justify-content: center; }
      .stream-placeholder {
        display: flex; flex-direction: column; align-items: center; gap: 6px;
        z-index: 3; background: none; border: none; padding: 0; cursor: pointer;
        outline: none; -webkit-tap-highlight-color: transparent;
        font-family: inherit;
      }
      .stream-placeholder:focus-visible { outline: 2px solid rgba(255,255,255,0.3); outline-offset: 4px; border-radius: var(--radius-md); }
      .stream-placeholder span { font-size: 10px; color: var(--t4); font-weight: 500; }
      button.stream-placeholder { position: absolute; inset: 0; width: 100%; height: 100%; justify-content: center; }

      /* — Nav arrows — */
      .carousel-nav {
        position: absolute; top: 50%; transform: translateY(-50%);
        width: 32px; height: 32px; border-radius: 50%;
        background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; padding: 0; outline: none;
        font-family: inherit; transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
        -webkit-tap-highlight-color: transparent;
        z-index: 5; opacity: 0.7;
      }
      .carousel-nav ha-icon {
        --mdc-icon-size: 18px; color: rgba(255,255,255,0.8);
        display: flex; align-items: center; justify-content: center;
      }
      .carousel-nav:focus-visible { outline: 2px solid rgba(255,255,255,0.3); outline-offset: -2px; }
      .carousel-nav:active { transform: translateY(-50%) scale(0.92); }
      .carousel-nav.prev { left: 8px; }
      .carousel-nav.next { right: 8px; }

      @media (hover: hover) and (pointer: fine) {
        .carousel-nav:hover { background: rgba(0,0,0,0.6); opacity: 1; }
      }

      /* — Dots — */
      .carousel-dots {
        display: flex; align-items: center; justify-content: center; gap: 6px;
      }
      .carousel-dot-btn {
        width: 8px; height: 8px; border-radius: 50%; padding: 0;
        border: none; background: var(--t4); cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4,0,0.2,1); outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .carousel-dot-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.3); outline-offset: 2px; }
      .carousel-dot-btn.active {
        width: 20px; border-radius: 4px;
        background: var(--cam-color); box-shadow: 0 0 8px var(--cam-glow);
      }
      .carousel-dot-btn.recording {
        background: var(--c-alert); box-shadow: 0 0 6px rgba(248,113,113,0.5);
      }
      .carousel-dot-btn.recording.active {
        background: var(--c-alert);
        animation: rec-pulse 1.5s ease-in-out infinite;
      }
      .carousel-dot-btn.motion-dot {
        background: var(--c-warning); box-shadow: 0 0 6px rgba(251,191,36,0.4);
      }

      @media (hover: hover) and (pointer: fine) {
        .carousel-dot-btn:hover { background: var(--t3); }
      }

      /* — Info bar — */
      .carousel-info {
        display: flex; align-items: center; gap: 10px; padding: 0 2px;
      }
      .carousel-cam-icon {
        width: 32px; height: 32px; border-radius: var(--radius-md);
        background: var(--s2); border: 1px solid var(--b1);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .carousel-cam-icon ha-icon {
        color: var(--t3); display: flex; align-items: center; justify-content: center;
      }
      .carousel-cam-icon.on { background: var(--cam-bg); border-color: var(--cam-border); }
      .carousel-cam-icon.on ha-icon { color: var(--cam-color); }
      .carousel-info-text { flex: 1; min-width: 0; }
      .carousel-cam-name {
        font-size: 13px; font-weight: 600; color: var(--t1);
        overflow: hidden; white-space: nowrap;
      }
      .carousel-cam-sub {
        display: flex; align-items: center; gap: 5px; margin-top: 1px;
      }
      .carousel-state { font-size: 10px; font-weight: 500; color: var(--t3); }
      .carousel-state.live { color: var(--cam-sub); }
      .carousel-ai-mini { display: flex; gap: 2px; align-items: center; }
      .ai-badge {
        display: inline-flex; align-items: center; justify-content: center;
        width: 16px; height: 16px; border-radius: var(--radius-sm);
        font-size: 10px; transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .ai-badge.active { background: rgba(96,165,250,0.12); color: var(--cam-color); }
      .ai-badge ha-icon {
        display: flex; align-items: center; justify-content: center;
        filter: drop-shadow(0 0 4px var(--cam-glow));
      }

      /* — Quick actions — */
      .carousel-actions { display: flex; gap: 6px; flex-wrap: wrap; }
      .action-btn {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 6px 12px; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: 11px; font-weight: 600;
        color: var(--t3); cursor: pointer; transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .action-btn ha-icon { display: flex; align-items: center; justify-content: center; }
      .action-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }
      .action-btn:active { transform: scale(0.96); }
      .action-btn.active { border-color: var(--cam-border); background: var(--cam-bg); color: var(--cam-color); }
      .action-btn.active-alert { border-color: rgba(248,113,113,0.2); background: rgba(248,113,113,0.1); color: var(--c-alert); }
      .action-btn.active-warning { border-color: rgba(251,191,36,0.2); background: rgba(251,191,36,0.1); color: var(--c-warning); }

      @media (hover: hover) and (pointer: fine) {
        .action-btn:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      @media (pointer: coarse) {
        .action-btn:active { animation: bounce 0.15s ease-out; }
      }
    `]}}function Di(){window.dispatchEvent(new Event("ll-rebuild"))}Ci([Ae()],Ri.prototype,"areaId"),Ci([Le()],Ri.prototype,"_carouselIndex"),Ci([Le()],Ri.prototype,"_liveIds"),customElements.define("glass-camera-carousel-card",Ri),function(){if(t)return;t=!0;const s=history.pushState,r=history.replaceState;history.pushState=function(t,a,r){if(s.call(this,t,a,r),!i){i=!0;try{window.dispatchEvent(new Event("location-changed")),e.emit("location-changed",void 0)}finally{i=!1}}},history.replaceState=function(t,a,s){if(r.call(this,t,a,s),!i){i=!0;try{window.dispatchEvent(new Event("location-changed")),e.emit("location-changed",void 0)}finally{i=!1}}},window.addEventListener("popstate",a)}(),Ce||(Ce=new $e),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(Di)):requestAnimationFrame(Di),window.addEventListener("connection-status",e=>{"connected"===e.detail&&setTimeout(Di,500)})}();
