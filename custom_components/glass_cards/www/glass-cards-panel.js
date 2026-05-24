!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let s=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new s(a,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,g=globalThis,u=g.trustedTypes,m=u?u.emptyScript:"",_=g.reactiveElementPolyfillSupport,f=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},b=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:s}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const r=a?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),s=e.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=a;const r=s.fromAttribute(t,e.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(e,t,i,a=!1,s){if(void 0!==e){const r=this.constructor;if(!1===a&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??b)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,_?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=e=>e,$=x.trustedTypes,S=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+I,z=`<${E}>`,D=document,P=()=>D.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,A="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,O=/>/g,j=RegExp(`>|${A}(?:([^\\s"'>=/]+)(${A}*=${A}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,F=/"/g,q=/^(?:script|style|textarea|title)$/i,N=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=N(1),B=N(2),U=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),K=new WeakMap,Y=D.createTreeWalker(D,129);function G(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class X{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,r=0;const o=e.length-1,n=this.parts,[c,l]=((e,t)=>{const i=e.length-1,a=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=M;for(let n=0;n<i;n++){const t=e[n];let i,c,l=-1,d=0;for(;d<t.length&&(o.lastIndex=d,c=o.exec(t),null!==c);)d=o.lastIndex,o===M?"!--"===c[1]?o=R:void 0!==c[1]?o=O:void 0!==c[2]?(q.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=j):void 0!==c[3]&&(o=j):o===j?">"===c[0]?(o=s??M,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,i=c[1],o=void 0===c[3]?j:'"'===c[3]?F:H):o===F||o===H?o=j:o===R||o===O?o=M:(o=j,s=void 0);const h=o===j&&e[n+1].startsWith("/>")?" ":"";r+=o===M?t+z:l>=0?(a.push(i),t.slice(0,l)+C+t.slice(l)+I+h):t+I+(-2===l?n:h)}return[G(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=X.createElement(c,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=Y.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(C)){const t=l[r++],i=a.getAttribute(e).split(I),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(I)&&(n.push({type:6,index:s}),a.removeAttribute(e));if(q.test(a.tagName)){const e=a.textContent.split(I),t=e.length-1;if(t>0){a.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],P()),Y.nextNode(),n.push({type:2,index:++s});a.append(e[t],P())}}}else if(8===a.nodeType)if(a.data===E)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(I,e+1));)n.push({type:7,index:s}),e+=I.length-1}s++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,a){if(t===U)return t;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const r=T(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,a)),t}let J=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??D).importNode(t,!0);Y.currentNode=a;let s=Y.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new Z(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new se(s,this,e)),this._$AV.push(t),n=i[++o]}r!==n?.index&&(s=Y.nextNode(),r++)}return Y.currentNode=D,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),T(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==U&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new J(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new X(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new Z(this.O(P()),this.O(P()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,a){const s=this.strings;let r=!1;if(void 0===s)e=Q(this,e,t,0),r=!T(e)||e!==this._$AH&&e!==U,r&&(this._$AH=e);else{const a=e;let o,n;for(e=s[0],o=0;o<s.length-1;o++)n=Q(this,a[i+o],t,o),n===U&&(n=this._$AH[o]),r||=!T(n)||n!==this._$AH[o],n===W?e=W:e!==W&&(e+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ae extends ee{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===U)return;const i=this._$AH,a=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==W&&(i===W||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const re=x.litHtmlPolyfillSupport;re?.(X,Z),(x.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class ne extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=i?.renderBefore??null;a._$litPart$=s=new Z(t.insertBefore(P(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}}ne._$litElement$=!0,ne.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ne});const ce=oe.litElementPolyfillSupport;ce?.({LitElement:ne}),(oe.litElementVersions??=[]).push("4.2.2");const le=[r`
      *, *::before, *::after {
        box-sizing: border-box;
      }
      :host {
        position: relative;
        min-height: 100vh;
        padding: 2rem 1rem 3rem;
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
        width: 37.5rem;
        height: 37.5rem;
        top: -12.5rem;
        right: -6.25rem;
        background: var(--ambient-blob-top, #2d4a8a);
      }
      .ambient-bg::after {
        width: 31.25rem;
        height: 31.25rem;
        bottom: -9.375rem;
        left: -6.25rem;
        background: var(--ambient-blob-bottom, #3a2d6b);
      }

      /* ── Layout ── */
      .page-wrap {
        max-width: 40rem;
        margin: 0 auto;
      }
      @media (min-width: 1024px) {
        .page-wrap { max-width: 56rem; }
      }
      @media (min-width: 1440px) {
        .page-wrap { max-width: 72rem; }
      }

      /* ── Header ── */
      .page-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      .page-back {
        width: 2rem;
        height: 2rem;
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
        position: relative;
      }
      .page-back::before {
        content: '';
        position: absolute;
        inset: -0.375rem;
      }
      @media (hover: hover) and (pointer: fine) {
        .page-back:hover {
          background: var(--s3);
        }
      }
      @media (pointer: coarse) {
        .page-back:active { animation: bounce 0.3s ease; }
      }
      .page-back:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .page-back ha-icon {
        --mdc-icon-size: 1.125rem;
        display: flex; align-items: center; justify-content: center;
      }
      .page-title {
        font-size: var(--fz-lg);
        font-weight: 700;
        color: var(--t1);
        letter-spacing: -0.3px;
      }
      .page-subtitle {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t4);
        margin-left: auto;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        display: inline-flex;
        align-items: baseline;
        gap: 0.375rem;
      }
      .page-version {
        font-size: var(--fz-xs);
        font-weight: 400;
        color: var(--t4);
        opacity: 0.65;
        letter-spacing: 0.4px;
        font-variant-numeric: tabular-nums;
        text-transform: none;
      }

      /* ── Panel ── */
      .config-panel {
        padding: 1rem;
      }

      /* ── Section ── */
      .section-label {
        font-size: var(--fz-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 0.5rem;
        padding-left: 0.125rem;
      }
      .section-desc {
        font-size: var(--fz-sm);
        font-weight: 400;
        color: var(--t3);
        margin-bottom: 0.75rem;
        line-height: 1.5;
        padding-left: 0.125rem;
      }

      /* ── Live card preview ── */
      .tab-panel > :is(glass-light-card, glass-climate-card, glass-cover-card,
        glass-fan-card, glass-media-card, glass-weather-card, glass-presence-card,
        glass-spotify-card, glass-camera-carousel-card, glass-title-card) {
        display: block;
        margin-bottom: 1rem;
        overflow: visible;
      }

      /* ── Spacing utilities ── */
      .mt-sm { margin-top: 0.75rem; }

      /* ── Banner ── */
      .banner {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-lg);
        font-size: var(--fz-base);
        font-weight: 500;
        margin-bottom: 1rem;
        background: rgba(var(--rgb-info), 0.08);
        border: 1px solid rgba(var(--rgb-info), 0.12);
        color: var(--t2);
      }
      .banner ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--c-info);
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Item rows ── */
      .item-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-bottom: 1rem;
      }
      .item-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
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
      @media (pointer: coarse) {
        .item-row:active { animation: bounce 0.3s ease; }
      }
      .item-row.disabled {
        opacity: 0.35;
      }
      .item-row.dragging {
        opacity: 0.4;
      }
      .item-row.drop-target {
        background: rgba(var(--rgb-accent), 0.06);
        box-shadow: inset 0 -2px 0 var(--c-accent);
      }
      .item-row .feature-icon ha-icon { --mdc-icon-size: 1rem; }

      .card-row {
        padding: 0.75rem;
      }

      /* Drag handle styles now live in <glass-drag-handle> (ui-core).
         Local overrides for specific contexts target the tag name. */

      /* ── Room icon button ── */
      .room-icon-btn {
        width: 2rem;
        height: 2rem;
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
        position: relative;
      }
      .room-icon-btn::before {
        content: '';
        position: absolute;
        inset: -0.375rem;
      }
      .room-icon-btn ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-icon-btn:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      @media (pointer: coarse) {
        .room-icon-btn:active { animation: bounce 0.3s ease; }
      }
      .room-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Item info ── */
      .item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }
      .item-name {
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t2);
        line-height: 1.2;
      }
      .item-meta {
        font-size: var(--fz-xs);
        font-weight: 400;
        color: var(--t4);
        line-height: 1.2;
      }
      .item-row.disabled .item-name {
        color: var(--t4);
      }

      /* ── Entity rename (unassigned tab) ── */
      .entity-rename-input {
        display: block;
        width: 100%;
        background: var(--s2);
        border: 1px solid var(--c-accent);
        border-radius: var(--radius-sm);
        padding: 0.375rem 0.5rem;
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t1);
        outline: none;
        box-shadow: 0 0 0 2px rgba(var(--rgb-accent), 0.2);
      }

      /* Toggle styles now live in <glass-toggle> (ui-core).
         Interactive: <glass-toggle .checked .activeColor @glass-toggle-change>
         Decorative (inside a clickable parent): <glass-toggle presentation .checked> */

      /* Icon button styles now live in <glass-icon-button> (ui-core).
         Use size="xs|sm|md|lg" + active-color + ?active. */

      /* ── Feature toggles ── */
      .feature-list {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        margin-bottom: 1rem;
      }
      .feature-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
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
      @media (pointer: coarse) {
        .feature-row:active { animation: bounce 0.3s ease; }
      }
      .feature-row:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .feature-icon {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .feature-icon ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      .feature-text {
        flex: 1;
        min-width: 0;
      }
      .feature-name {
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t1);
      }
      .feature-desc {
        font-size: var(--fz-xs);
        color: var(--t3);
        margin-top: 0.125rem;
      }
      .feature-row .feature-name {
        color: var(--t1);
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
      @media (pointer: coarse) {
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

      /* ── Sub-section group ── */
      .sub-section {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .sub-section + .sub-section {
        padding-top: 0.75rem;
        border-top: 1px solid var(--b1);
      }

      /* ── Fold separator (from kit) ── */
      .fold-sep {
        height: 0.0625rem;
        margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, var(--fold-color, var(--c-accent)), transparent);
        opacity: 0;
        transition: opacity var(--t-layout);
      }
      .fold-sep.visible { opacity: 0.45; }

      /* ── Save bar ── */
      .save-bar {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      /* .btn / .btn-sm / .btn-accent / .btn-ghost styles now live in
         <glass-button> (ui-core). Local context overrides for .schedule-*,
         .picker-confirm, .pw-sp-setup-btn target the host class directly. */

      /* ── Toast ── */
      .toast {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-lg);
        backdrop-filter: blur(20px);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 500;
        opacity: 0;
        z-index: 200;
        pointer-events: none;
        transition:
          opacity var(--t-fast),
          transform var(--t-fast);
        background: rgba(var(--rgb-success), 0.15);
        border: 1px solid rgba(var(--rgb-success), 0.2);
        color: var(--c-success);
      }
      .toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .toast.error {
        background: rgba(var(--rgb-alert), 0.15);
        border: 1px solid rgba(var(--rgb-alert), 0.2);
        color: var(--c-alert);
      }

      /* ── Entry animation ── */
      .config-panel {
        animation: panel-in 0.4s var(--ease-out) both;
      }

      /* ── Segmented control ── */
      .segmented {
        display: inline-flex; gap: 0;
        border-radius: var(--radius-lg); background: var(--s1);
        border: 1px solid var(--b1); padding: 0.25rem;
        width: 100%; margin-bottom: 0.5rem;
      }
      .seg-btn {
        flex: 1;
        padding: 0.5rem 0; border-radius: var(--radius-sm);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: var(--t3); cursor: pointer; transition: background var(--t-fast), color var(--t-fast), box-shadow var(--t-fast);
        border: none; background: transparent; outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .seg-btn.active {
        background: var(--s4); color: var(--t1);
        box-shadow: 0 1px 4px rgba(var(--rgb-black),0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .seg-btn:hover:not(.active) { color: var(--t2); }
      }
      .seg-btn:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: -2px; }

      /* ── Range input (styled) ── */
      .range-row {
        display: flex; align-items: center; gap: 0.75rem; padding: 0.25rem 0;
      }
      .range-input {
        flex: 1; height: 0.25rem; border-radius: 2px;
        -webkit-appearance: none; appearance: none;
        background: var(--s2); outline: none;
      }
      .range-input::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none;
        width: 0.875rem; height: 0.875rem; border-radius: 50%;
        background: var(--c-accent); cursor: pointer;
        box-shadow: 0 1px 4px rgba(var(--rgb-black),0.3);
      }
      .range-input::-moz-range-thumb {
        width: 0.875rem; height: 0.875rem; border-radius: 50%; border: none;
        background: var(--c-accent); cursor: pointer;
        box-shadow: 0 1px 4px rgba(var(--rgb-black),0.3);
      }
      .range-input::-moz-range-track {
        height: 0.25rem; border-radius: 2px; background: var(--s2);
      }
      .range-value {
        font-size: var(--fz-md); font-weight: 600; color: var(--t1);
        /* Anchor at the right with a fixed-width slot wide enough for the
           worst case ("35.5°C" or "99.5°C") + tabular-nums so digit width
           stays constant. Prevents the range-input width from jumping
           when the value changes between integer and .5 step. */
        min-width: 3rem; text-align: right;
        font-variant-numeric: tabular-nums;
      }
      /* Auto-close timer row variants */
      .autoclose-row { padding: 0.375rem 0.75rem; }
      .autoclose-icon {
        background: rgba(var(--rgb-accent), 0.08);
        border-color: rgba(var(--rgb-accent), 0.12);
      }
      .autoclose-icon ha-icon { color: var(--c-accent); }
      .autoclose-value {
        min-width: 3.5rem;
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t3);
      }

      /* ── Dot (status indicator) ── */
      .dot {
        width: 0.375rem; height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
      }
      .dot.playing {
        background: var(--c-info);
        box-shadow: 0 0 6px rgba(var(--rgb-info), 0.4);
      }

      /* (Dead .entity-rename-row CSS removed — only .entity-rename-input
         is used in unassigned.ts; the wrapper class was never applied.) */

      /* ═══════════════════════════════════════════════
         Navigation (ex nav.ts)
         ═══════════════════════════════════════════════ */

      /* ── Panel layout — vertical stack ── */
      .panel-layout {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 4rem);
      }

      /* ── Top nav (horizontal) ── */
      .panel-sidebar {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.25rem;
        padding: 0 0.25rem 0.75rem;
        border-bottom: 1px solid var(--b1);
        margin-bottom: 0.75rem;
        flex-shrink: 0;
      }
      .panel-sidebar .nav-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        border: 1px solid transparent;
        background: transparent;
        color: var(--t3);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        font-size: var(--fz-sm);
        font-family: inherit;
        font-weight: 600;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        white-space: nowrap;
      }
      .panel-sidebar .nav-btn ha-icon {
        --mdc-icon-size: 1.125rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color var(--t-fast);
      }
      .panel-sidebar .nav-btn.active {
        background: var(--s3);
        border-color: var(--b2);
        color: var(--t1);
      }
      .panel-sidebar .nav-btn.active ha-icon {
        color: var(--c-accent);
      }
      @media (hover: hover) and (pointer: fine) {
        .panel-sidebar .nav-btn:not(.active):hover {
          background: var(--s1);
          color: var(--t1);
          border-color: var(--b1);
        }
      }
      @media (pointer: coarse) {
        .panel-sidebar .nav-btn:active { animation: bounce 0.3s ease; }
      }
      .panel-sidebar .nav-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Content area ── */
      .panel-content {
        flex: 1;
        overflow-y: auto;
        overflow-x: clip;
        min-width: 0;
        scrollbar-width: none;
        padding: 0 1rem;
      }
      .panel-content::-webkit-scrollbar { display: none; }

      /* ── Breadcrumb ── */
      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 1rem;
        font-size: var(--fz-sm);
        color: var(--t4);
      }
      .breadcrumb button {
        border: none;
        background: none;
        color: var(--t3);
        cursor: pointer;
        padding: 0.25rem 0.375rem;
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        transition: background var(--t-fast), color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .breadcrumb button:hover {
          color: var(--t1);
          background: var(--s1);
        }
      }
      .breadcrumb button:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .breadcrumb .sep {
        color: var(--t4);
        font-weight: 300;
        opacity: 0.5;
      }
      .breadcrumb .current {
        color: var(--t1);
        font-weight: 600;
      }

      /* ── Unassigned tab — toolbar + filter chips + domain folds ── */
      .ua-toolbar {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 0.5rem 0 0.5rem;
      }
      .ua-search-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-md);
        outline: none;
        transition: border-color var(--t-fast);
        box-sizing: border-box;
      }
      .ua-search-input::placeholder { color: var(--t4); }
      .ua-search-input:focus { border-color: var(--b3); }

      .ua-filter-chips {
        display: flex;
        gap: 0.375rem;
      }
      .ua-filter-chips glass-chip {
        flex: 1;
      }
      .ua-filter-chips .chip-count {
        font-size: var(--fz-xxs);
        font-weight: 700;
        padding: 0.0625rem 0.375rem;
        border-radius: var(--radius-full);
        background: var(--s3);
        color: var(--t3);
        letter-spacing: 0.5px;
        font-variant-numeric: tabular-nums;
      }
      .ua-filter-chips glass-chip[active] .chip-count {
        background: rgba(var(--rgb-accent), 0.2);
        color: var(--c-accent);
      }
      .ua-filter-chips glass-chip.has-warn .chip-count {
        background: rgba(var(--rgb-warning), 0.15);
        color: var(--c-warning);
      }

      /* Domain head — collapsible group header */
      .ua-domain-head {
        display: grid;
        grid-template-columns: 1.125rem 1.25rem 1fr auto;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.5rem 0.5rem 0.5rem 0.25rem;
        margin-top: 0.5rem;
        background: transparent;
        border: none;
        font-family: inherit;
        text-align: left;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .ua-domain-head:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }
      @media (hover: hover) and (pointer: fine) {
        .ua-domain-head:hover .ua-domain-chev,
        .ua-domain-head:hover .ua-domain-icon { --mdc-icon-color: var(--t2); }
        .ua-domain-head:hover .ua-domain-label { color: var(--t3); }
      }
      .ua-domain-chev {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: var(--t4);
        transition: transform var(--t-fast);
      }
      .ua-domain-head.collapsed .ua-domain-chev { transform: rotate(-90deg); }
      .ua-domain-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: var(--t3);
      }
      .ua-domain-label {
        font-size: var(--fz-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
      }
      .ua-domain-count {
        font-size: var(--fz-xxs);
        font-weight: 700;
        color: var(--t4);
        background: var(--s2);
        padding: 0.0625rem 0.375rem;
        border-radius: var(--radius-full);
        letter-spacing: 0.5px;
        font-variant-numeric: tabular-nums;
      }

      .ua-list {
        display: grid;
        grid-template-rows: 1fr;
        transition: grid-template-rows var(--t-layout);
      }
      .ua-list-inner {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .ua-list.collapsed { grid-template-rows: 0fr; }

      /* ── Room list (config-panel rooms tab) ─────────────────────────
         Vertical list of room rows: drag-handle + order badge + main
         button (icon + name + chevron) + visibility toggle.
         Mobile-first, 56px row height, large tap targets. */
      .room-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .room-row {
        display: grid;
        grid-template-columns: 1.25rem 1.5rem 1fr 2.25rem;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.5rem 0.375rem 0.25rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        min-height: 3rem;
        transition: background var(--t-fast), border-color var(--t-fast), opacity var(--t-fast), transform var(--t-fast);
        cursor: grab;
      }
      .room-row:active { cursor: grabbing; }
      .room-row.dragging { opacity: 0.35; }
      .room-row.drop-target {
        border-color: var(--c-accent);
        background: rgba(var(--rgb-accent), 0.08);
      }
      .room-row.off { opacity: 0.55; }

      .room-row-grip {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t4);
        cursor: grab;
        --mdc-icon-size: 1rem;
        line-height: 0;
        transition: color var(--t-fast);
      }
      .room-row-grip::before {
        content: '';
        position: absolute;
        inset: -0.625rem;
      }
      .room-row-grip:active { cursor: grabbing; }
      .room-row:hover .room-row-grip { color: var(--t3); }

      .room-row-num {
        font-size: var(--fz-xs);
        font-weight: 700;
        color: var(--t4);
        font-variant-numeric: tabular-nums;
        text-align: center;
        letter-spacing: 0.5px;
      }
      .room-row.off .room-row-num { color: var(--t4); opacity: 0.5; }

      .room-row-main {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.125rem 0;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: inherit;
        text-align: left;
        outline: none;
        color: var(--t1);
        -webkit-tap-highlight-color: transparent;
        min-width: 0;
        transition: transform var(--t-fast);
      }
      .room-row-main:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }
      @media (pointer: coarse) {
        .room-row-main:active { transform: scale(0.98); }
      }

      .room-row-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
        flex-shrink: 0;
      }
      .room-row-icon ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--t2);
      }

      .room-row-name {
        flex: 1;
        min-width: 0;
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .room-row-chev {
        --mdc-icon-size: 1rem;
        color: var(--t4);
        flex-shrink: 0;
        transition: transform var(--t-fast), color var(--t-fast);
      }
      .room-row-main:hover .room-row-chev,
      .room-row-main:focus-visible .room-row-chev {
        color: var(--t2);
        transform: translateX(2px);
      }

      .room-row-toggle {
        width: 2.25rem;
        height: 1.25rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b2);
        position: relative;
        cursor: pointer;
        outline: none;
        flex-shrink: 0;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      /* 44px touch hit-area centred on the toggle for mobile */
      .room-row-toggle::before {
        content: '';
        position: absolute;
        inset: -0.75rem -0.625rem;
      }
      .room-row-toggle::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0.125rem;
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 50%;
        background: var(--t2);
        transform: translateY(-50%);
        transition: left var(--t-fast), background var(--t-fast);
      }
      .room-row-toggle.on {
        background: var(--c-accent);
        border-color: transparent;
      }
      .room-row-toggle.on::after {
        left: calc(100% - 1rem);
        background: rgba(var(--rgb-white), 0.95);
      }
      .room-row-toggle:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }

      /* Reconfig loading state — spinning icon */
      .reconfig-loading ha-icon {
        animation: reconfig-spin 1s linear infinite;
        --mdc-icon-color: var(--c-accent);
      }
      @keyframes reconfig-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @media (prefers-reduced-motion: reduce) {
        .reconfig-loading ha-icon { animation: none; }
      }

      /* ── Preference list (advanced sub-section selector) ─────────
         Each row: large icon (in tinted square) + name/desc stack + chevron.
         Danger variant tints icon + name with alert color. */
      .pref-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .pref-row {
        display: grid;
        grid-template-columns: 1.75rem 1fr 1rem;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.375rem 0.5rem 0.375rem 0.25rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        font-family: inherit;
        text-align: left;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        color: var(--t1);
        min-height: 3rem;
        transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      }
      .pref-row:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      @media (hover: hover) and (pointer: fine) {
        .pref-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
        .pref-row:hover .pref-row-chev {
          color: var(--t2);
          transform: translateX(2px);
        }
      }
      @media (pointer: coarse) {
        .pref-row:active { transform: scale(0.99); }
      }

      .pref-row-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .pref-row-icon ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--t2);
      }

      .pref-row-text {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 0;
      }
      .pref-row-name {
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
      }
      .pref-row-desc {
        font-size: var(--fz-sm);
        color: var(--t3);
        line-height: 1.35;
      }
      .pref-row-chev {
        --mdc-icon-size: 1rem;
        color: var(--t4);
        transition: transform var(--t-fast), color var(--t-fast);
      }

      /* Danger variant — destructive action */
      .pref-row.danger {
        background: rgba(var(--rgb-alert), 0.06);
        border-color: rgba(var(--rgb-alert), 0.25);
      }
      .pref-row.danger .pref-row-icon {
        background: rgba(var(--rgb-alert), 0.12);
        border-color: rgba(var(--rgb-alert), 0.25);
      }
      .pref-row.danger .pref-row-icon ha-icon { color: var(--c-alert); }
      .pref-row.danger .pref-row-name { color: var(--c-alert); }
      @media (hover: hover) and (pointer: fine) {
        .pref-row.danger:hover {
          background: rgba(var(--rgb-alert), 0.10);
          border-color: rgba(var(--rgb-alert), 0.35);
        }
      }

      /* ── Empty state ── */
      .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 1rem;
        color: var(--t4);
        font-size: var(--fz-sm);
        font-weight: 500;
      }

      /* ── Responsive breakpoints ── */
      @media (max-width: 600px) {
        .panel-sidebar {
          padding: 0 0.125rem 0.5rem;
        }
        .panel-sidebar .nav-btn {
          font-size: var(--fz-xs);
          padding: 0.375rem 0.5rem;
          gap: 0.25rem;
        }
        .panel-sidebar .nav-btn ha-icon { --mdc-icon-size: 1rem; }
      }

      /* ═══════════════════════════════════════════════
         Room detail sections (ex room-detail.ts)
         ═══════════════════════════════════════════════ */

      .room-sections {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      /* Wrap each section row (incl. its fold) so the bordered card hugs both. */
      .room-sections > div {
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: background var(--t-fast), border-color var(--t-fast), opacity var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .room-sections > div:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
      }
      .room-sections > div.dragging {
        opacity: 0.35;
      }
      .room-sections > div.drop-target {
        border-color: var(--c-accent);
        background: rgba(var(--rgb-accent), 0.08);
      }

      /* ── Section header (fold trigger) ── */
      /* ── Scene chips ── */
      .scene-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        padding: 0 0.25rem 0.75rem;
      }
      .scene-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        min-height: 2.25rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--b1);
        background: var(--s1);
        color: var(--t3);
        font-family: inherit;
        font-size: var(--fz-xs);
        font-weight: 600;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast), box-shadow var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .scene-chip ha-icon {
        --mdc-icon-size: 0.75rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        display: flex;
      }
      .scene-chip .chip-drag {
        --mdc-icon-size: 0.625rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        margin-left: -0.125rem;
      }
      .scene-chip.on {
        background: rgba(var(--rgb-accent), 0.1);
        border-color: rgba(var(--rgb-accent), 0.2);
        color: var(--c-accent);
      }
      .scene-chip.on ha-icon {
        --mdc-icon-color: var(--c-accent);
        color: var(--c-accent);
      }
      .scene-chip.dragging { opacity: 0.3; }
      .scene-chip.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px rgba(var(--rgb-accent), 0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .scene-chip:hover {
          background: var(--s2);
          border-color: var(--b2);
          color: var(--t2);
        }
        .scene-chip.on:hover {
          background: rgba(var(--rgb-accent), 0.15);
        }
      }

      .section-header-wrap {
        display: flex;
        align-items: center;
        gap: 0;
        min-height: 3rem;
        padding: 0.375rem 0.5rem 0.375rem 0.25rem;
      }
      .section-header-wrap glass-drag-handle {
        width: 1.5rem;
        padding: 0.5rem 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .section-header-wrap glass-drag-handle:hover {
          background: var(--s2);
          border-radius: var(--radius-xs);
        }
      }
      .section-header-wrap.off { opacity: 0.35; }
      .section-header-wrap.off .section-header { pointer-events: none; }
      /* Drag/drop visuals live on the outer wrapper now (.room-sections > div). */

      /* Chevron — now <glass-chevron ?open tone> inside .section-header.
         Rotation animation owned by the primitive. */

      .section-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.25rem;
        cursor: pointer;
        border-radius: var(--radius-sm);
        background: transparent;
        border: none;
        flex: 1;
        min-width: 0;
        text-align: left;
        transition: background var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        font-family: inherit;
      }
      /* Section icon takes its color from the inline --icon-color custom prop
         (RGB triplet, e.g. 129,140,248). Falls back to accent if unset. */
      .section-header-icon {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: rgba(var(--icon-color, var(--rgb-accent)), 0.08);
        border: 1px solid rgba(var(--icon-color, var(--rgb-accent)), 0.12);
        color: rgb(var(--icon-color, var(--rgb-accent)));
      }
      .section-header-icon ha-icon {
        --mdc-icon-size: 0.9375rem;
        --mdc-icon-color: currentColor;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .section-header ha-icon {
        --mdc-icon-size: 1.125rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color var(--t-fast);
      }
      .section-header .section-title {
        flex: 1;
        font-weight: 600;
        color: var(--t2);
        font-size: var(--fz-base);
        letter-spacing: -0.2px;
        transition: color var(--t-fast);
      }
      .section-header glass-chevron {
        margin-left: auto;
        flex-shrink: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .section-header:hover {
          background: var(--s1);
        }
      }
      .section-header:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Section fold animation ── */
      .section-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--t-layout);
      }
      .section-fold.open {
        grid-template-rows: 1fr;
      }
      .section-fold-inner {
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--t-fast), visibility 0s var(--t-layout);
      }
      .section-fold.open .section-fold-inner {
        opacity: 1;
        visibility: visible;
        overflow: visible;
        transition: opacity var(--t-fast) 0.1s, visibility 0s;
      }
      .section-content {
        padding: 0.75rem 0.5rem 0.5rem;
      }

      /* ═══════════════════════════════════════════════
         Wizard (ex wizard.ts)
         ═══════════════════════════════════════════════ */

      .wizard {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        padding: 1rem 0;
      }

      /* ── Progress dots ── */
      .wizard-progress {
        display: flex;
        gap: 0.375rem;
        align-items: center;
      }
      .wizard-dot {
        width: 0.4375rem;
        height: 0.4375rem;
        border-radius: 50%;
        background: var(--s2);
        border: 1px solid var(--b1);
        transition: background var(--t-fast), border-color var(--t-fast), box-shadow var(--t-fast), transform var(--t-fast);
      }
      .wizard-dot.active {
        background: var(--c-accent);
        border-color: var(--c-accent);
        box-shadow: 0 0 6px rgba(var(--rgb-accent, 139,92,246), 0.35);
        transform: scale(1.25);
      }
      .wizard-dot.done {
        background: var(--c-success);
        border-color: var(--c-success);
      }

      /* ── Step card ── */
      .wizard-card {
        width: 100%;
      }

      /* ── Step icon ── */
      .wizard-step-icon {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-lg);
        background: rgba(var(--rgb-accent, 139,92,246), 0.1);
        border: 1px solid rgba(var(--rgb-accent, 139,92,246), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }
      .wizard-step-icon ha-icon {
        --mdc-icon-size: 1.25rem;
        color: var(--c-accent);
        display: flex; align-items: center; justify-content: center;
      }
      .wizard-step-icon.success {
        background: rgba(var(--rgb-success, 34,197,94), 0.1);
        border-color: rgba(var(--rgb-success, 34,197,94), 0.15);
      }
      .wizard-step-icon.success ha-icon {
        color: var(--c-success);
      }

      /* ── Room chips ── */
      .wizard-room-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-bottom: 0.75rem;
      }
      .wizard-room-chip {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        font-family: inherit;
        font-size: var(--fz-sm);
        color: var(--t2);
        font-weight: 500;
        white-space: nowrap;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .wizard-room-chip ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── Wizard actions ── */
      .wizard-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 0.5rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--b1);
      }
      .wizard-actions-right {
        display: flex;
        gap: 0.375rem;
        align-items: center;
      }

      /* ── Orphan count ── */
      .wizard-orphan-count {
        font-size: var(--fz-lg);
        font-weight: 700;
        color: var(--t1);
        margin-bottom: 0.25rem;
      }

      /* ═══════════════════════════════════════════════
         DASHBOARD VIEW — redesign 2026-05
         "What's on the dashboard, in order" + "What's available"
         ═══════════════════════════════════════════════ */

      /* ── Head: title + active count ── */
      .dash-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 0.75rem;
      }
      .dash-head-text {
        flex: 1;
        min-width: 0;
      }
      .dash-head-text .section-label { margin-bottom: 0.125rem; }
      .dash-count {
        display: inline-flex;
        align-items: baseline;
        gap: 0.1875rem;
        padding: 0.375rem 0.625rem;
        border-radius: var(--radius-md);
        background: rgba(var(--rgb-accent), 0.1);
        border: 1px solid rgba(var(--rgb-accent), 0.2);
        flex-shrink: 0;
      }
      .dash-count-num {
        font-size: var(--fz-lg);
        font-weight: 700;
        color: var(--c-accent);
        font-variant-numeric: tabular-nums;
      }
      .dash-count-sep { font-size: var(--fz-sm); color: var(--t4); }
      .dash-count-total {
        font-size: var(--fz-sm);
        color: var(--t3);
        font-variant-numeric: tabular-nums;
      }

      /* ── Active list (vertical, ordered, mirrors dashboard) ── */
      .dash-active-list {
        list-style: none;
        margin: 0; padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .dash-row {
        position: relative;
        display: grid;
        grid-template-columns: 1.25rem 1.5rem 1fr 2rem;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.5rem 0.375rem 0.25rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        min-height: 3rem;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          transform var(--t-fast),
          opacity var(--t-fast);
      }
      .dash-row.dragging {
        opacity: 0.35;
        transform: scale(0.99);
      }
      .dash-row.drop-target {
        border-color: var(--c-accent);
        background: rgba(var(--rgb-accent), 0.08);
      }
      .dash-row::before {
        /* Subtle accent rail on the left, only on hover, signals interactivity */
        content: '';
        position: absolute;
        left: 0; top: 50%;
        width: 0.125rem; height: 0;
        background: var(--c-accent);
        border-radius: var(--radius-full);
        transform: translateY(-50%);
        transition: height var(--t-fast);
        pointer-events: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-row:hover { background: var(--s2); border-color: var(--b2); }
        .dash-row:hover::before { height: 60%; }
      }

      /* Grip (drag handle) */
      .dash-row-grip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--t4);
        cursor: grab;
        line-height: 0;
        transition: color var(--t-fast);
      }
      .dash-row-grip:active { cursor: grabbing; }
      .dash-row:hover .dash-row-grip { color: var(--t3); }
      .dash-row-grip ha-icon { --mdc-icon-size: 1rem; --mdc-icon-color: currentColor; }

      /* Position number — tabular, dimmed, neutral */
      .dash-row-pos {
        font-size: var(--fz-xs);
        font-weight: 700;
        color: var(--t4);
        font-variant-numeric: tabular-nums;
        text-align: center;
        letter-spacing: 0.5px;
      }

      /* Main clickable area: icon + name + chevron */
      .dash-row-main {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        min-width: 0;
        padding: 0.25rem 0;
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
        color: var(--t1);
        outline: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
      }
      .dash-row-main:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }
      .dash-row-icon {
        flex-shrink: 0;
        width: 1.75rem; height: 1.75rem;
        border-radius: var(--radius-sm);
        background: rgba(var(--icon-color, 129, 140, 248), 0.12);
        border: 1px solid rgba(var(--icon-color, 129, 140, 248), 0.18);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--icon-color, 129, 140, 248));
      }
      .dash-row-icon ha-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: currentColor;
        color: currentColor;
      }
      .dash-row-name {
        flex: 1;
        min-width: 0;
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dash-row-chev {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        opacity: 0.5;
        transition: opacity var(--t-fast), transform var(--t-fast);
      }
      .dash-row:hover .dash-row-chev,
      .dash-row-main:focus-visible .dash-row-chev {
        opacity: 1;
        transform: translateX(0.125rem);
      }

      /* Hide button (×) — always visible, clear affordance, expands on interaction */
      .dash-row-hide {
        width: 2rem; height: 2rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b2);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--t3);
        padding: 0;
        outline: none;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .dash-row-hide ha-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: currentColor;
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-row-hide:hover {
          background: rgba(var(--rgb-alert), 0.15);
          border-color: rgba(var(--rgb-alert), 0.35);
          color: var(--c-alert);
        }
      }
      .dash-row-hide:active {
        background: rgba(var(--rgb-alert), 0.2);
        border-color: rgba(var(--rgb-alert), 0.45);
        color: var(--c-alert);
      }
      .dash-row-hide:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }

      /* Empty state when no card is active */
      .dash-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.75rem 1rem;
        border: 1px dashed var(--b2);
        border-radius: var(--radius-lg);
        color: var(--t4);
      }
      .dash-empty ha-icon { --mdc-icon-size: 1.5rem; --mdc-icon-color: var(--t4); }
      .dash-empty span {
        font-size: var(--fz-sm);
        color: var(--t3);
        text-align: center;
        max-width: 24rem;
      }

      /* ── Divider between active list and disabled chips ── */
      .dash-divider {
        height: 1px;
        margin: 1.25rem 0 1rem;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(var(--rgb-white), 0.08),
          transparent
        );
      }
      .dash-section-disabled {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.5rem;
      }
      .dash-section-count {
        font-size: var(--fz-xxs);
        font-weight: 700;
        color: var(--t4);
        background: var(--s2);
        padding: 0.0625rem 0.375rem;
        border-radius: var(--radius-full);
        letter-spacing: 0.5px;
      }

      /* ── Disabled chip grid ── */
      .dash-chip-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
        gap: 0.375rem;
      }
      .dash-chip {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.625rem;
        background: var(--s1);
        border: 1px dashed var(--b2);
        border-radius: var(--radius-md);
        cursor: pointer;
        font-family: inherit;
        text-align: left;
        color: var(--t3);
        outline: none;
        opacity: 0.75;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          opacity var(--t-fast),
          border-style var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .dash-chip:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }
      .dash-chip-icon {
        flex-shrink: 0;
        width: 1.25rem; height: 1.25rem;
        border-radius: var(--radius-sm);
        background: rgba(var(--icon-color, 129, 140, 248), 0.1);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--icon-color, 129, 140, 248));
      }
      .dash-chip-icon ha-icon {
        --mdc-icon-size: 0.875rem;
        --mdc-icon-color: currentColor;
        color: currentColor;
      }
      .dash-chip-name {
        flex: 1;
        min-width: 0;
        font-size: var(--fz-base);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dash-chip-plus {
        --mdc-icon-size: 0.875rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        opacity: 0;
        transform: scale(0.85);
        transition: opacity var(--t-fast), transform var(--t-fast), color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .dash-chip:hover {
          background: rgba(var(--rgb-success), 0.05);
          border-color: rgba(var(--rgb-success), 0.3);
          border-style: solid;
          color: var(--t1);
          opacity: 1;
        }
        .dash-chip:hover .dash-chip-plus {
          opacity: 1;
          transform: scale(1);
          color: var(--c-success);
        }
      }

      /* DOMAIN_COLORS pass --icon-color as an RGB triplet "R, G, B"
         consumed via rgb() / rgba(). Falls back to accent 129,140,248. */

      /* ── Room popup action buttons editor ── */
      .room-buttons-list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        margin-bottom: 1rem;
      }
      .room-button-row {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        padding: 0.5rem 0.625rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
      }
      .room-button-label-row {
        display: flex;
        align-items: stretch;
        gap: 0.375rem;
      }
      .room-button-entity-dropdown {
        margin-bottom: 0;
      }
      /* min-height + label ellipsis already provided by glass-dropdown's
         internal .trigger / .trigger .label — no override needed. */
      .room-button-icon-trigger {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--tap-lg);
        height: var(--tap-lg);
        flex-shrink: 0;
        padding: 0;
        background: rgba(var(--rgb-accent), 0.10);
        border: 1px dashed rgba(var(--rgb-accent), 0.35);
        border-radius: var(--radius-lg);
        color: var(--c-accent);
        cursor: pointer;
        outline: none;
        transition: background var(--t-fast), border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .room-button-icon-trigger .room-button-icon-preview { --mdc-icon-size: 1.125rem; }
      @media (hover: hover) and (pointer: fine) {
        .room-button-icon-trigger:hover {
          background: rgba(var(--rgb-accent), 0.18);
          border-color: rgba(var(--rgb-accent), 0.55);
        }
      }
      .room-button-icon-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .room-button-delete {
        align-self: stretch;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        margin-top: 0.125rem;
        padding: 0.5rem 0.875rem;
        background: transparent;
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        color: var(--t3);
        cursor: pointer;
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        outline: none;
        transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .room-button-delete ha-icon { --mdc-icon-size: 1rem; }
      @media (hover: hover) and (pointer: fine) {
        .room-button-delete:hover {
          background: rgba(var(--rgb-alert), 0.12);
          color: var(--c-alert);
          border-color: rgba(var(--rgb-alert), 0.35);
        }
      }
      .room-button-delete:focus-visible {
        outline: 2px solid var(--c-alert);
        outline-offset: 2px;
      }
      .room-button-row glass-dropdown {
        margin-bottom: 0;
      }
      /* glass-dropdown already applies opacity 0.5 + pointer-events:none on
         :host([disabled]) via its internal styles. */
      .room-button-input {
        flex: 1;
        min-width: 0;
        min-height: var(--tap-lg);
        padding: 0.5rem 0.75rem;
        background: var(--s2);
        border: 1px solid var(--b2);
        border-radius: var(--radius-lg);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-base);
        outline: none;
        transition: border-color var(--t-fast), background var(--t-fast);
        box-sizing: border-box;
      }
      .room-button-input:focus {
        border-color: var(--b3);
        background: var(--s3);
      }
      .room-button-input::placeholder {
        color: var(--t4);
      }
      .room-button-textarea {
        width: 100%;
        font-family: 'SFMono-Regular', Consolas, monospace;
        font-size: var(--fz-sm);
        min-height: 3rem;
        resize: vertical;
      }
      .room-button-advanced {
        margin-top: 0.25rem;
        font-size: var(--fz-sm);
      }
      .room-button-advanced summary {
        cursor: pointer;
        color: var(--t3);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: var(--fz-xs);
        padding: 0.25rem 0;
        outline: none;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .room-button-advanced summary::before {
        content: '›';
        display: inline-block;
        font-size: 1em;
        line-height: 1;
        transition: transform var(--t-fast);
      }
      .room-button-advanced[open] summary::before {
        transform: rotate(90deg);
      }
      .room-button-advanced summary::-webkit-details-marker {
        display: none;
      }
      /* Spacing between direct children inside the open advanced panel (skip summary itself). */
      .room-button-advanced[open] > *:not(summary) {
        margin-top: 0.5rem;
      }
      .room-button-add {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        padding: 0.5rem 0.875rem;
        background: var(--s1);
        border: 1px dashed var(--b2);
        border-radius: var(--radius-md);
        color: var(--t2);
        cursor: pointer;
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        outline: none;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
      }
      .room-button-add ha-icon { --mdc-icon-size: 1rem; }
      @media (hover: hover) and (pointer: fine) {
        .room-button-add:hover {
          background: var(--s2);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
`,r`
      /* ── Tab panel animation ── */
      .tab-panel {
        animation: panel-in 0.3s var(--ease-out) both;
        max-width: 40rem;
        margin: 0 auto;
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
`,r`
      /* Dropdown styles now provided by <glass-dropdown> (ui-core).
         Pattern: <glass-dropdown .items .value icon label searchable
         search-placeholder empty-text @glass-dropdown-change>. */

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
        gap: 0.25rem;
        padding: 0.5rem 0;
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
        --mdc-icon-size: 1.125rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .icon-pick:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
      }
      @media (pointer: coarse) {
        .icon-pick:active { animation: bounce 0.3s ease; }
      }
      .icon-pick:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .icon-pick.selected {
        background: rgba(var(--rgb-accent), 0.12);
        border-color: rgba(var(--rgb-accent), 0.25);
      }

      /* ── Chip group ── */
      .chip-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        padding: 0 0.25rem;
        margin-bottom: 0.125rem;
      }

      /* Chip styles now live in <glass-chip> (ui-core).
         Pattern: <glass-chip size="sm" active-color="..." ?active>label</glass-chip> */

      /* ── Title config styles ── */
      .title-modes-list {
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .title-mode-row {
        display: flex; flex-direction: column; gap: 0.5rem;
        padding: 0.75rem; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
        cursor: grab; transition: opacity var(--t-fast), border-color var(--t-fast), box-shadow var(--t-fast);
      }
      .title-mode-row.dragging {
        opacity: 0.4;
      }
      .title-mode-row.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px var(--c-accent);
      }
      .title-source-block {
        border: 1px solid var(--b1); border-radius: var(--radius-md);
        background: var(--s1); margin-bottom: 0.5rem;
      }
      .title-source-header {
        display: flex; align-items: center; gap: 0.5rem;
        padding: 0.5rem 0.75rem;
      }
      .title-source-block.dragging {
        opacity: 0.4;
      }
      .title-source-block.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px var(--c-accent);
      }
      .title-source-header ha-icon {
        --mdc-icon-size: 1rem; color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-source-type {
        font-size: var(--fz-base); font-weight: 600; color: var(--t2);
      }
      .title-source-badge {
        font-size: var(--fz-xs); font-weight: 700; color: var(--t4);
        background: var(--s3); border-radius: var(--radius-full);
        padding: 0.0625rem 0.375rem;
      }
      .title-source-actions-first {
        margin-left: auto;
      }
      .title-source-body {
        padding: 0 0.75rem 0.75rem;
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .title-source-field {
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .title-source-field-label {
        font-size: var(--fz-sm); font-weight: 600; color: var(--t4);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-mode-header {
        display: flex; align-items: center; gap: 0.375rem;
      }
      .title-mode-header glass-drag-handle { opacity: 0.4; }
      .title-mode-header glass-drag-handle:hover { opacity: 0.7; }
      .title-mode-id {
        flex: 1;
        font-size: var(--fz-sm); font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-color-row {
        display: flex; align-items: center; gap: 0.5rem;
      }
      .title-color-label {
        font-size: var(--fz-sm); color: var(--t4); white-space: nowrap;
      }
      .title-color-chips {
        display: flex; gap: 0.375rem; align-items: center;
      }
      .title-color-chip {
        width: 1.25rem; height: 1.25rem; border-radius: 50%;
        border: 2px solid transparent; cursor: pointer;
        transition: transform var(--t-fast), border-color var(--t-fast); outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .title-color-chip:hover { transform: scale(1.1); }
      }
      @media (pointer: coarse) {
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
        display: flex; gap: 0.5rem; align-items: center;
      }
      .title-mode-fields-row .input { flex: 1; min-width: 0; }
      .title-icon-btn {
        width: 2.75rem; align-self: stretch; flex-shrink: 0;
        border-radius: var(--radius-lg); border: 1px solid var(--b2);
        background: var(--s1); cursor: pointer; outline: none;
        display: flex; align-items: center; justify-content: center;
        padding: 0; font-family: inherit;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .title-icon-btn ha-icon {
        --mdc-icon-size: 1.25rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-icon-btn.has-icon { border-color: var(--b3); }
      .title-icon-btn.has-icon ha-icon { color: var(--t1); }
      @media (hover: hover) and (pointer: fine) {
        .title-icon-btn:hover { background: var(--s3); border-color: var(--b3); }
      }
      @media (pointer: coarse) {
        .title-icon-btn:active { animation: bounce 0.3s ease; }
      }
      .title-icon-btn:focus-visible {
        outline: 2px solid var(--c-accent); outline-offset: -2px;
      }

      /* ── Presence mapping cards ── */
      .presence-mapping-card {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-top: 0.5rem;
        padding: 0.75rem;
        background: var(--s2);
        border-radius: var(--radius-md);
        border: 1px solid var(--b1);
      }
      .presence-mapping-card .presence-mapping-field glass-dropdown {
        margin-bottom: 0;
      }
      .presence-mapping-card .presence-mapping-field glass-dropdown::part(trigger) {
        padding: 0.375rem 0.625rem;
        font-size: var(--fz-sm);
      }
      .presence-mapping-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .presence-mapping-header .feature-icon {
        width: 1.75rem;
        height: 1.75rem;
      }
      .presence-mapping-label {
        display: block;
        font-size: var(--fz-base);
        color: var(--t3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .presence-mapping-field select.input {
        width: 100%;
      }

      /* ── Light row extras ── */
      .light-state {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-left: auto;
        flex-shrink: 0;
      }
      .light-dot {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        background: var(--t4);
      }
      .light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(var(--rgb-light-glow), 0.5);
      }
      .light-brightness {
        font-size: var(--fz-xs);
        font-weight: 600;
        color: var(--t3);
        min-width: 1.75rem;
        text-align: right;
      }
      .layout-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t3);
        font-family: inherit;
        font-size: var(--fz-xxs);
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
      @media (pointer: coarse) {
        .layout-btn:active { animation: bounce 0.3s ease; }
      }
      .layout-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Schedule button (btn-icon.xs pattern from kit) ── */
      /* .schedule-btn styles now provided by <glass-icon-button size="xs"
         active-color="accent"> — see tabs/light.ts. */

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
        transition-delay: 0.1s;
      }
      .schedule-body {
        padding: 0.5rem 0.75rem 0.75rem 2.25rem;
      }
      .schedule-header {
        font-size: var(--fz-sm);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t3);
        margin-bottom: 0.5rem;
      }
      .schedule-period {
        padding: 0.5rem 0;
        border-bottom: 0.0625rem solid var(--b1);
      }
      .schedule-period:last-of-type {
        border-bottom: none;
      }
      .schedule-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.375rem;
      }
      .schedule-row-actions {
        justify-content: space-between;
        margin-bottom: 0;
      }
      .schedule-label {
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t3);
        min-width: 2.25rem;
        flex-shrink: 0;
      }
      /* ── Input (from kit) ── */
      .input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-md);
        outline: none;
        transition: border-color var(--t-fast);
      }
      .input:focus { border-color: var(--b3); }
      .input::placeholder { color: var(--t4); }
      .cycle-interval-input {
        width: 3.75rem;
        text-align: center;
      }
      /* schedule-input removed — replaced by .datetime-display */

      /* ── Check item (from kit) ── */
      .check-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        font-family: inherit;
      }
      .check-box {
        width: 1.125rem;
        height: 1.125rem;
        border-radius: 4px;
        border: 2px solid var(--b3);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background var(--t-fast), border-color var(--t-fast), box-shadow var(--t-fast);
        flex-shrink: 0;
        --mdc-icon-size: 0.75rem;
      }
      .check-box ha-icon {
        opacity: 0;
        transform: scale(0);
        transition: opacity var(--t-fast), transform var(--t-fast);
        color: #fff;
      }
      .check-item.checked .check-box {
        background: var(--c-accent);
        border-color: var(--c-accent);
        box-shadow: 0 0 6px rgba(var(--rgb-accent),0.3);
      }
      .check-item.checked .check-box ha-icon {
        opacity: 1;
        transform: scale(1);
      }
      .check-label {
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t2);
      }
      .check-desc {
        display: block;
        font-size: var(--fz-xs);
        color: var(--t4);
        margin-top: 0.0625rem;
        font-weight: 400;
      }
      .check-item.checked .check-label {
        color: var(--t1);
      }

      /* .schedule-delete styles now provided by <glass-icon-button
         size="xs" active active-color="alert"> — see tabs/light.ts. */

      /* ── Schedule add & save (btn btn-sm from kit) ── */
      .schedule-add {
        width: 100%;
        margin-top: 0.5rem;
        border-style: dashed;
        --mdc-icon-size: 0.875rem;
      }
      .schedule-save {
        margin-top: 0.5rem;
        width: 100%;
      }

      /* ── Hint & explanation texts ── */
      .schedule-hint {
        display: flex;
        align-items: flex-start;
        gap: 0.375rem;
        margin-top: 0.75rem;
        padding: 0.5rem 0.5rem;
        background: var(--s1);
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        font-size: var(--fz-base);
        line-height: 1.4;
        color: var(--t3);
        --mdc-icon-size: 0.875rem;
      }
      .schedule-hint ha-icon {
        flex-shrink: 0;
        margin-top: 0.0625rem;
        color: var(--c-info);
        display: flex; align-items: center; justify-content: center;
      }

      /* ── DateTime display trigger ── */
      .datetime-display {
        flex: 1;
        min-width: 0;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-base);
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
      @media (pointer: coarse) {
        .datetime-display:active { animation: bounce 0.3s ease; }
      }
      .datetime-display:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .datetime-display.empty { color: var(--t4); }

      /* ── DateTime picker popup ── */
      .picker-overlay {
        position: absolute;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--rgb-black),0.5);
        backdrop-filter: blur(4px);
        animation: picker-fade-in var(--t-fast) ease-out;
      }
      @keyframes picker-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .picker-popup {
        width: 17.5rem;
        padding: 1rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s3);
        box-shadow: 0 8px 32px rgba(var(--rgb-black),0.4);
      }
      .picker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem 0.625rem;
      }
      .picker-month {
        font-size: var(--fz-md);
        font-weight: 700;
        color: var(--t1);
      }
      .picker-nav {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: none;
        background: transparent;
        color: var(--t3);
        cursor: pointer;
        padding: 0;
        outline: none;
        transition: background var(--t-fast), color var(--t-fast);
        --mdc-icon-size: 1rem;
        position: relative;
      }
      .picker-nav::before {
        content: '';
        position: absolute;
        inset: -0.5rem;
      }
      @media (hover: hover) and (pointer: fine) {
        .picker-nav:hover { background: var(--s2); color: var(--t1); }
      }
      @media (pointer: coarse) {
        .picker-nav:active { animation: bounce 0.3s ease; }
      }
      .picker-nav:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .picker-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.125rem;
      }
      .picker-day-label {
        font-size: var(--fz-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        text-align: center;
        padding: 0.25rem 0;
      }
      .picker-day {
        aspect-ratio: 1;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t3);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: background var(--t-fast), color var(--t-fast);
        outline: none;
        font-family: inherit;
        padding: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        .picker-day:hover { background: var(--s2); color: var(--t1); }
      }
      @media (pointer: coarse) {
        .picker-day:active { animation: bounce 0.3s ease; }
      }
      .picker-day.today { border: 1px solid var(--b3); color: var(--t1); }
      .picker-day.selected {
        background: rgba(var(--rgb-accent),0.2);
        color: var(--c-accent);
        font-weight: 700;
        border: 1px solid rgba(var(--rgb-accent),0.3);
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
        background: rgba(var(--rgb-accent),0.12);
        color: var(--c-accent);
        border-radius: 0;
      }
      .picker-day.other-month { opacity: 0.3; }

      /* ── Picker phase indicator ── */
      .picker-phase {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .picker-phase-btn {
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        background: transparent;
        color: var(--t3);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        outline: none;
      }
      .picker-phase-btn.active {
        background: rgba(var(--rgb-accent),0.15);
        color: var(--c-accent);
        border-color: rgba(var(--rgb-accent),0.3);
      }

      /* ── Time picker ── */
      .picker-time-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
        padding-top: 0.75rem;
        border-top: 0.0625rem solid var(--b1);
      }
      .picker-time-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
      .picker-time-label {
        font-size: var(--fz-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }
      .time-input {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .time-digit {
        width: 2.75rem;
        height: 2.5rem;
        text-align: center;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-lg);
        font-weight: 700;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .time-digit:focus { border-color: var(--c-accent); }
      .time-sep {
        font-size: var(--fz-xl);
        font-weight: 700;
        color: var(--t3);
      }

      /* ── Picker confirm button ── */
      .picker-confirm {
        margin-top: 1rem;
        width: 100%;
      }

      /* ══════════════════════════════════════
         Cover entity presets (from prototype)
         ══════════════════════════════════════ */

      /* ── Item fold separator ── */
      .item-fold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.3), transparent);
        opacity: 0;
        transition: opacity 0.35s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
        margin: 0 0.75rem;
      }
      .item-fold-sep.visible { opacity: 1; }

      /* ── Entity presets fold ── */
      .entity-presets-fold {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.35s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
      }
      .entity-presets-fold.open {
        grid-template-rows: 1fr;
      }
      .entity-presets-fold-inner {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .entity-presets-fold.open .entity-presets-fold-inner {
        opacity: 1;
        transition-delay: 0.1s;
      }
      .entity-presets-content {
        padding: 0.5rem 0.75rem 0.75rem 2.25rem;
        margin: 0 4px 6px;
        background: rgba(167, 139, 250, 0.03);
        border-radius: 0 0 var(--radius-sm) var(--radius-sm);
      }
      .entity-presets-label {
        font-size: 9px;
        font-weight: 600;
        color: var(--t4);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.5rem;
      }

      /* ── Preset chips ── */
      .preset-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
      }
      .preset-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        font-size: 11px;
        font-weight: 600;
        color: var(--t2);
      }
      .preset-chip ha-icon { --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }
      .preset-chip.small {
        padding: 0.25rem 0.5rem;
        font-size: 10px;
      }
      .preset-chip.small ha-icon { --mdc-icon-size: 12px; }
      .preset-chip.custom {
        border-color: rgba(167, 139, 250, 0.2);
        background: rgba(167, 139, 250, 0.05);
        color: var(--c-accent);
      }
      .preset-chip-remove {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t4);
        transition: color var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .preset-chip-remove:hover { color: var(--c-alert); }
      }
      .preset-chip-remove ha-icon { --mdc-icon-size: 12px; display: flex; align-items: center; justify-content: center; }

      /* ── Preset add ── */
      .preset-add {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.5rem;
      }
      .preset-input {
        width: 56px;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 11px;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .preset-input:focus { border-color: var(--b3); }
      .preset-input::placeholder { color: var(--t4); }
      .preset-input.small { width: 44px; font-size: 10px; padding: 0.25rem 0.375rem; }
      .preset-add-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-md);
        border: 1px solid rgba(167, 139, 250, 0.3);
        background: rgba(167, 139, 250, 0.1);
        font-family: inherit;
        font-size: 11px;
        font-weight: 600;
        color: var(--c-accent);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .preset-add-btn:hover {
          background: rgba(167, 139, 250, 0.18);
          border-color: rgba(167, 139, 250, 0.4);
        }
      }
      .preset-add-btn ha-icon { --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }
      .preset-add-btn.small { font-size: 10px; padding: 0.125rem 0.375rem; }
      .preset-add-btn.small ha-icon { --mdc-icon-size: 12px; }
      .preset-add-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }
      .preset-reset-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        font-family: inherit;
        font-size: 9px;
        font-weight: 600;
        color: var(--t4);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .preset-reset-btn:hover {
          background: var(--s3);
          color: var(--t3);
          border-color: var(--b3);
        }
      }
      .preset-reset-btn ha-icon { --mdc-icon-size: 12px; display: flex; align-items: center; justify-content: center; }

      /* ── Presets expand button (cover-specific) ── */
      /* .presets-btn styles now provided by glass-icon-button size=xs,
         active-color=purple, ?active. See tabs/cover.ts for usage. */

      /* ── Unassigned / Orphan entities ── */
      .pw-ua-name {
        cursor: pointer;
        background: none; border: none; padding: 0;
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
        text-align: left;
        line-height: 1.2;
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      .pw-ua-name:hover { color: var(--t1); }
      .pw-ua-name:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; border-radius: 4px; }

      .pw-ua-card { overflow: visible; }
      .pw-ua-area-dropdown {
        width: auto;
        margin: 0 0.75rem 0.5rem;
        margin-bottom: 0.5rem;
      }
      .pw-ua-area-trigger {
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: var(--fz-sm);
        gap: 0.375rem;
        border-radius: var(--radius-md);
      }
      .pw-ua-area-trigger .pw-ua-area-icon {
        --mdc-icon-size: 14px;
        --mdc-icon-color: var(--t3);
        opacity: 0.7;
      }
      .pw-ua-area-trigger.pw-ua-unassigned {
        color: var(--c-warning);
        border-color: rgba(var(--rgb-warning), 0.2);
      }
      .pw-ua-area-trigger.pw-ua-unassigned .pw-ua-area-icon {
        --mdc-icon-color: var(--c-warning);
        opacity: 1;
      }

      /* ── Responsive breakpoints ── */
      @media (min-width: 1024px) {
        .icon-picker-grid {
          grid-template-columns: repeat(10, 1fr);
        }
      }
      @media (min-width: 1440px) {
        .icon-picker-grid {
          grid-template-columns: repeat(12, 1fr);
        }
      }

      /* ═══════════════════════════════════════════════
         TITLE TAB — specific styles
         (generic .cfg-section* layout lives in styles/sections.ts)
         ═══════════════════════════════════════════════ */

      /* ── Title text input + char counter ── */
      .title-text-field {
        position: relative;
        display: flex;
        align-items: center;
      }
      .title-text-field .input { padding-right: 3.5rem; }
      .title-text-count {
        position: absolute;
        right: 0.75rem;
        font-size: var(--fz-xxs);
        font-weight: 600;
        color: var(--t4);
        font-variant-numeric: tabular-nums;
        pointer-events: none;
        letter-spacing: 0.5px;
      }
      .title-text-count.warn { color: var(--c-warning); }

      /* ─────────────────────────────────────────────
         PERIOD — chip row + inline editor
         ───────────────────────────────────────────── */

      .title-period-head {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        margin-top: 0.875rem;
        margin-bottom: 0.5rem;
      }
      .title-period-head-label {
        font-size: var(--fz-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
      }
      .title-period-head-desc {
        font-size: var(--fz-sm);
        color: var(--t3);
      }

      .title-period-empty {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        margin-top: 0.875rem;
        border: 1px dashed var(--b2);
        border-radius: var(--radius-md);
        color: var(--t3);
      }
      .title-period-empty ha-icon {
        --mdc-icon-size: 1.25rem;
        --mdc-icon-color: var(--t4);
        flex-shrink: 0;
      }
      .title-period-empty-text {
        display: flex; flex-direction: column; gap: 0.125rem;
      }
      .title-period-empty-text strong {
        font-size: var(--fz-sm);
        color: var(--t2);
        font-weight: 600;
      }
      .title-period-empty-text span {
        font-size: var(--fz-xs);
        color: var(--t4);
      }

      /* Horizontal chip row */
      .title-period-chips-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
      }
      .title-period-chip {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.4375rem;
        padding: 0.4375rem 0.75rem 0.4375rem 0.5rem;
        background: var(--s1);
        border: 1px solid var(--b2);
        border-radius: var(--radius-full);
        cursor: pointer;
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t2);
        outline: none;
        transition:
          background var(--t-fast),
          border-color var(--t-fast),
          color var(--t-fast),
          box-shadow var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .title-period-chip:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }
      .title-period-chip-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem; height: 1.25rem;
        border-radius: 50%;
        background: color-mix(in srgb, var(--chip-tint, var(--t4)) 14%, transparent);
        color: var(--chip-tint, var(--t3));
        flex-shrink: 0;
      }
      .title-period-chip-icon ha-icon {
        --mdc-icon-size: 0.875rem;
        --mdc-icon-color: currentColor;
        color: currentColor;
      }
      @media (hover: hover) and (pointer: fine) {
        .title-period-chip:hover {
          background: var(--s2);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      .title-period-chip.editing {
        background: color-mix(in srgb, var(--chip-tint, var(--c-accent)) 12%, var(--s2));
        border-color: var(--chip-tint, var(--c-accent));
        color: var(--t1);
        box-shadow: 0 0 0 1px var(--chip-tint, var(--c-accent));
      }
      .title-period-chip.live .title-period-chip-live-dot {
        position: absolute;
        top: 0.1875rem; right: 0.1875rem;
        width: 0.375rem; height: 0.375rem;
        border-radius: 50%;
        background: var(--c-success);
        box-shadow: 0 0 0.25rem rgba(var(--rgb-success), 0.6);
      }

      /* Inline period editor (slides under the chip row) */
      .title-period-editor {
        margin-top: 0.625rem;
        padding: 0.875rem;
        background: rgba(var(--rgb-black), 0.18);
        border: 1px solid var(--b2);
        border-radius: var(--radius-lg);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .title-period-editor-head {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .title-period-editor-icon {
        --mdc-icon-size: 1.125rem;
        flex-shrink: 0;
      }
      .title-period-editor-name {
        flex: 1; min-width: 0;
        font-size: var(--fz-md);
        font-weight: 600;
        color: var(--t1);
      }
      .title-period-editor-field {
        display: flex;
        align-items: center;
        gap: 0.625rem;
      }
      .title-period-editor-field-label {
        font-size: var(--fz-xxs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
        width: 3rem;
        flex-shrink: 0;
      }
      .title-period-editor-nav {
        display: flex;
        justify-content: space-between;
        padding-top: 0.25rem;
        border-top: 1px solid var(--b1);
      }
      .title-period-editor-nav .btn-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background: none;
        border: none;
        color: var(--t3);
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        cursor: pointer;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-sm);
        outline: none;
        transition: background var(--t-fast), color var(--t-fast);
      }
      .title-period-editor-nav .btn-link ha-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: currentColor;
      }
      .title-period-editor-nav .btn-link:hover {
        background: var(--s2);
        color: var(--t1);
      }

      /* ─────────────────────────────────────────────
         COLOR SWATCHES — larger, labelled, clear selected
         ───────────────────────────────────────────── */

      .title-color-swatches {
        display: inline-flex;
        gap: 0.3125rem;
        flex-wrap: wrap;
      }
      /* .title-color-swatch styles now provided by glass-color-swatch
         with-check, .color=var(--c-tone), and ?selected.
         See tabs/title.ts for usage. */
`,r`
  .cfg-section {
    position: relative;
    padding-top: 1.5rem;
    margin-top: 1rem;
  }
  .cfg-section:first-of-type {
    margin-top: 0.75rem;
    padding-top: 0;
  }
  .cfg-section:not(:first-of-type)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(var(--rgb-white), 0.06),
      transparent
    );
  }

  .cfg-section-head {
    display: grid;
    grid-template-columns: 1.5rem 1fr auto;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 0.625rem;
  }
  .cfg-section-num {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(var(--rgb-accent), 0.12);
    border: 1px solid rgba(var(--rgb-accent), 0.22);
    color: var(--c-accent);
    font-size: var(--fz-xs);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .cfg-section-text {
    display: flex;
    flex-direction: column;
    gap: 0.0625rem;
    min-width: 0;
  }
  /* Reset the standalone .section-label / .section-desc margins from base.ts
     when they sit inside a numbered section header — the grid layout owns
     the spacing here, the legacy block margins would push everything apart. */
  .cfg-section-text .section-label {
    margin: 0;
    padding: 0;
  }
  .cfg-section-text .section-desc {
    margin: 0;
    padding: 0;
  }
  .cfg-section-count {
    font-size: var(--fz-xxs);
    font-weight: 700;
    color: var(--t4);
    background: var(--s2);
    padding: 0.0625rem 0.375rem;
    border-radius: var(--radius-full);
    letter-spacing: 0.5px;
  }

  /* Danger variant — signals a destructive section. The badge and label
     switch to alert color, the separator line gets an alert tint. */
  .cfg-section.danger > .cfg-section-head .cfg-section-num {
    background: rgba(var(--rgb-alert), 0.12);
    border-color: rgba(var(--rgb-alert), 0.25);
    color: var(--c-alert);
  }
  .cfg-section.danger > .cfg-section-head .section-label {
    color: var(--c-alert);
  }

  /* .cfg-empty styles now provided by <glass-empty-state variant="inline">
     (ui-core). The .reconfig-loading helper class is preserved for local
     animation hooks (see views/advanced.ts). */

  /* ── Dashed "add" button (e.g. "+ Ajouter une source") ── */
  .cfg-add-wrap {
    margin-top: 0.5rem;
  }
  .cfg-add-btn {
    border-style: dashed !important;
  }

  /* ── Pedagogical info banner explaining a card's dashboard behaviour.
     Lives at the bottom of a config-panel tab, not inside a numbered section. */
  .cfg-info {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.625rem 0.75rem;
    background: var(--s1);
    border-radius: var(--radius-md);
    border: 1px solid var(--b1);
    font-size: var(--fz-sm);
    line-height: 1.4;
    color: var(--t3);
  }
  .cfg-info ha-icon {
    --mdc-icon-size: 1rem;
    --mdc-icon-color: var(--c-info);
    flex-shrink: 0;
    margin-top: 0.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* Warning variant — when the info banner is signalling an actionable issue */
  .cfg-info.warn {
    background: rgba(var(--rgb-warning), 0.06);
    border-color: rgba(var(--rgb-warning), 0.25);
    color: var(--t2);
  }
  .cfg-info.warn ha-icon { --mdc-icon-color: var(--c-warning); }

  /* ── Sub-group labels inside a numbered section
     Lighter than .section-label (no uppercase, smaller weight) so the
     hierarchy stays readable when several controls live under one section. */
  .cfg-sublabel {
    font-size: var(--fz-sm);
    font-weight: 600;
    color: var(--t3);
    margin: 0.875rem 0 0.25rem;
  }
  .cfg-subdesc {
    font-size: var(--fz-sm);
    color: var(--t4);
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
`],de={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},he=(e=de,t,i)=>{const{kind:a,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,s,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];t.call(this,i),this.requestUpdate(a,s,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return pe({...e,state:!0,attribute:!1})}function ue(e,t){return(t,i,a)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return t=this,t.renderRoot?.querySelector(e)??null;var t}})}const me="__glassEventBus",_e=window,fe=_e[me]??(_e[me]=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}}),ve={navbar:"navbar-config-changed",weather:"weather-config-changed",light_card:"light-config-changed",fan_card:"fan-config-changed",cover_card:"cover-config-changed",climate_card:"climate-config-changed",camera_carousel:"camera-carousel-config-changed",title_card:"title-config-changed",spotify_card:"spotify-config-changed",media_card:"media-config-changed",presence_card:"presence-config-changed",calendar_card:"calendar-config-changed",vacuum_card:"vacuum-config-changed",dashboard:"dashboard-config-changed"};let be=null,ye=null,we=null;const xe=r`
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`,ke=280,$e=360,Se=480,Ce=600;r`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`,r`
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
`;var Ie=Object.defineProperty,Ee=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Ie(t,i,r),r};class ze extends ne{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.color="var(--rgb-accent)",this.label="",this.disabled=!1,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[xe,r`
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
    `]}_displayPct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_snap(e){if(this.step<=0)return e;const t=Math.round(e/this.step)*this.step,i=(this.step.toString().split(".")[1]||"").length;return parseFloat(t.toFixed(i))}_pctToValue(e){const t=this.max-this.min,i=this.min+e/100*t;return Math.max(this.min,Math.min(this.max,this._snap(i)))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max")||e.has("color"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._displayPct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.transform=`translate(calc(${e}cqw - 50%), -50%)`)}_onPointerDown(e){if(this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,this._ac=new AbortController;const{signal:i}=this._ac,a=this.renderRoot.querySelector(".fill"),s=this.renderRoot.querySelector(".thumb"),r=(e,i)=>{const r=t.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100)),n=this._pctToValue(o);this._dragValue=n;const c=this._displayPct(n);a.style.transform=`scaleX(${c/100})`,s.style.transform=`translate(calc(${c}cqw - 50%), -50%)`;const l=i?"glass-slider-change":"glass-slider-input";this.dispatchEvent(new CustomEvent(l,{detail:{value:n},bubbles:!0,composed:!0}))};r(e,!1);const o=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}this._dragging=!1};t.addEventListener("pointermove",e=>r(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{r(e,!0),o()},{signal:i}),t.addEventListener("pointercancel",()=>o(),{signal:i}),t.addEventListener("lostpointercapture",()=>o(),{signal:i})}_onKeyDown(e){if(this.disabled)return;const t=this.step>0?this.step:1;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this._snap(this.value+t));break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this._snap(this.value-t));break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this._dragValue=i,this._applyVisuals(),this.dispatchEvent(new CustomEvent("glass-slider-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return V`
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
        ${this.label?V`<span class="label">${this.label}</span>`:""}
      </div>
    `}}Ee([pe({type:Number})],ze.prototype,"value"),Ee([pe({type:Number})],ze.prototype,"min"),Ee([pe({type:Number})],ze.prototype,"max"),Ee([pe({type:Number})],ze.prototype,"step"),Ee([pe({type:String})],ze.prototype,"color"),Ee([pe({type:String})],ze.prototype,"label"),Ee([pe({type:Boolean,reflect:!0})],ze.prototype,"disabled");try{customElements.define("glass-slider",ze)}catch{}var De=Object.defineProperty,Pe=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&De(t,i,r),r};class Te extends ne{constructor(){super(...arguments),this.icon="",this.active=!1,this.activeColor="accent",this.size="md",this.glow=!1,this.unavailable=!1,this.disabled=!1,this.ariaLabel=null}static{this.styles=[xe,r`
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

      /* Icon sizing — defaults to icon-md; override per-size. */
      ::slotted(ha-icon),
      ::slotted(*) {
        --mdc-icon-size: var(--icon-md);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      :host([size='xs']) ::slotted(ha-icon) { --mdc-icon-size: var(--icon-xs); }
      :host([size='sm']) ::slotted(ha-icon) { --mdc-icon-size: var(--icon-sm); }
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
    `]}_resolveColor(){const e=this.activeColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}render(){const e=this.ariaLabel??this.icon??"button";return V`
      <button
        type="button"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-label=${e}
        aria-pressed=${this.active?"true":"false"}
      >
        <slot>${this.icon?V`<ha-icon .icon=${this.icon}></ha-icon>`:null}</slot>
      </button>
    `}}Pe([pe({type:String})],Te.prototype,"icon"),Pe([pe({type:Boolean,reflect:!0})],Te.prototype,"active"),Pe([pe({type:String,attribute:"active-color"})],Te.prototype,"activeColor"),Pe([pe({type:String,reflect:!0})],Te.prototype,"size"),Pe([pe({type:Boolean,reflect:!0})],Te.prototype,"glow"),Pe([pe({type:Boolean,reflect:!0})],Te.prototype,"unavailable"),Pe([pe({type:Boolean,reflect:!0})],Te.prototype,"disabled"),Pe([pe({type:String,attribute:"aria-label"})],Te.prototype,"ariaLabel");try{customElements.define("glass-icon-button",Te)}catch{}var Le=Object.defineProperty,Ae=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Le(t,i,r),r};class Me extends ne{constructor(){super(...arguments),this.icon="",this.active=!1,this.activeColor="accent",this.disabled=!1,this.size="md",this.ariaLabel=null}static{this.styles=[xe,r`
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
    `]}_resolveColor(){const e=this.activeColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}render(){return V`
      <button
        type="button"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel??""}
        aria-pressed=${this.active?"true":"false"}
      >
        ${this.icon?V`<ha-icon .icon=${this.icon}></ha-icon>`:null}
        <slot></slot>
      </button>
    `}}Ae([pe({type:String})],Me.prototype,"icon"),Ae([pe({type:Boolean,reflect:!0})],Me.prototype,"active"),Ae([pe({type:String,attribute:"active-color"})],Me.prototype,"activeColor"),Ae([pe({type:Boolean,reflect:!0})],Me.prototype,"disabled"),Ae([pe({type:String,reflect:!0})],Me.prototype,"size"),Ae([pe({type:String,attribute:"aria-label"})],Me.prototype,"ariaLabel");try{customElements.define("glass-chip",Me)}catch{}var Re=Object.defineProperty,Oe=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Re(t,i,r),r};class je extends ne{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.presentation=!1,this.activeColor="accent",this.ariaLabel=null}static{this.styles=[xe,r`
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
    `]}_resolveColor(){const e=this.activeColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}_onClick(e){e.stopPropagation(),this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("glass-toggle-change",{detail:{checked:this.checked},bubbles:!0,composed:!0})))}render(){const e=`--_ac-rgb:${this._resolveColor()}`;return this.presentation?V`
        <span class="visual" style=${e} aria-hidden="true">
          <span class="track">
            <span class="knob"></span>
          </span>
        </span>
      `:V`
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
    `}}Oe([pe({type:Boolean,reflect:!0})],je.prototype,"checked"),Oe([pe({type:Boolean,reflect:!0})],je.prototype,"disabled"),Oe([pe({type:Boolean,reflect:!0})],je.prototype,"presentation"),Oe([pe({type:String,attribute:"active-color"})],je.prototype,"activeColor"),Oe([pe({type:String,attribute:"aria-label"})],je.prototype,"ariaLabel");try{customElements.define("glass-toggle",je)}catch{}var He=Object.defineProperty,Fe=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&He(t,i,r),r};class qe extends ne{constructor(){super(...arguments),this.icon="",this.surface="light",this.disabled=!1,this.ariaLabel=null}static{this.styles=[xe,r`
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
    `]}render(){return V`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel??this.icon??"stepper"}
      >
        <slot>${this.icon?V`<ha-icon .icon=${this.icon}></ha-icon>`:null}</slot>
      </button>
    `}}Fe([pe({type:String})],qe.prototype,"icon"),Fe([pe({type:String,reflect:!0})],qe.prototype,"surface"),Fe([pe({type:Boolean,reflect:!0})],qe.prototype,"disabled"),Fe([pe({type:String,attribute:"aria-label"})],qe.prototype,"ariaLabel");try{customElements.define("glass-stepper-button",qe)}catch{}var Ne=Object.defineProperty,Ve=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Ne(t,i,r),r};class Be extends ne{constructor(){super(...arguments),this.icon="",this.variant="standard",this.active=!1,this.activeColor="accent",this.disabled=!1,this.ariaLabel=null}static{this.styles=[xe,r`
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
    `]}_resolveColor(){const e=this.activeColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}render(){return V`
      <button
        type="button"
        style="--_ac-rgb:${this._resolveColor()}"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel??this.icon??"transport"}
        aria-pressed=${this.active?"true":"false"}
      >
        <slot>${this.icon?V`<ha-icon .icon=${this.icon}></ha-icon>`:null}</slot>
      </button>
    `}}Ve([pe({type:String})],Be.prototype,"icon"),Ve([pe({type:String,reflect:!0})],Be.prototype,"variant"),Ve([pe({type:Boolean,reflect:!0})],Be.prototype,"active"),Ve([pe({type:String,attribute:"active-color"})],Be.prototype,"activeColor"),Ve([pe({type:Boolean,reflect:!0})],Be.prototype,"disabled"),Ve([pe({type:String,attribute:"aria-label"})],Be.prototype,"ariaLabel");try{customElements.define("glass-transport-button",Be)}catch{}var Ue=Object.defineProperty,We=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Ue(t,i,r),r};class Ke extends ne{constructor(){super(...arguments),this.tone="neutral",this.interactive=!1,this.disabled=!1,this.size="md",this.ariaLabel=null}static{this.styles=[xe,r`
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
    `]}render(){return"button"===(this.interactive?"button":"span")?V`
        <button
          type="button"
          class="pill"
          ?disabled=${this.disabled}
          aria-label=${this.ariaLabel??""}
        >
          <slot></slot>
        </button>
      `:V`<span class="pill" role="status"><slot></slot></span>`}}We([pe({type:String,reflect:!0})],Ke.prototype,"tone"),We([pe({type:Boolean,reflect:!0})],Ke.prototype,"interactive"),We([pe({type:Boolean,reflect:!0})],Ke.prototype,"disabled"),We([pe({type:String,reflect:!0})],Ke.prototype,"size"),We([pe({type:String,attribute:"aria-label"})],Ke.prototype,"ariaLabel");try{customElements.define("glass-pill",Ke)}catch{}var Ye=Object.defineProperty,Ge=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Ye(t,i,r),r};class Xe extends ne{constructor(){super(...arguments),this.items=[],this.value="",this.ariaLabel=null,this.layout="rail"}static{this.styles=[xe,r`
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
    `]}_onTab(e){this.value!==e&&(this.value=e,this.dispatchEvent(new CustomEvent("glass-tab-change",{detail:{value:e},bubbles:!0,composed:!0})))}render(){return V`
      <div
        class="tabs"
        role="tablist"
        aria-label=${this.ariaLabel??"tabs"}
      >
        ${this.items.map(e=>V`
          <button
            type="button"
            class="tab"
            role="tab"
            aria-selected=${this.value===e.value?"true":"false"}
            @click=${()=>this._onTab(e.value)}
          >
            ${e.icon?V`<ha-icon .icon=${e.icon}></ha-icon>`:null}
            <span>${e.label}</span>
          </button>
        `)}
      </div>
    `}}Ge([pe({type:Array})],Xe.prototype,"items"),Ge([pe({type:String,reflect:!0})],Xe.prototype,"value"),Ge([pe({type:String,attribute:"aria-label"})],Xe.prototype,"ariaLabel"),Ge([pe({type:String,reflect:!0})],Xe.prototype,"layout");try{customElements.define("glass-tabs",Xe)}catch{}var Qe=Object.defineProperty;class Je extends ne{constructor(){super(...arguments),this.dense=!1}static{this.styles=[r`
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
    `]}render(){return V`
      <slot name="start"></slot>
      <div class="middle">
        <slot></slot>
      </div>
      <slot name="end"></slot>
    `}}((e,t,i)=>{for(var a,s=void 0,r=e.length-1;r>=0;r--)(a=e[r])&&(s=a(t,i,s)||s);s&&Qe(t,i,s)})([pe({type:Boolean,reflect:!0})],Je.prototype,"dense");try{customElements.define("glass-compact-bar",Je)}catch{}var Ze=Object.defineProperty;class et extends ne{constructor(){super(...arguments),this.label=""}static{this.styles=[r`
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
    `]}render(){return V`
      <span class="title"><slot>${this.label}</slot></span>
      <slot name="end"></slot>
    `}}((e,t,i)=>{for(var a,s=void 0,r=e.length-1;r>=0;r--)(a=e[r])&&(s=a(t,i,s)||s);s&&Ze(t,i,s)})([pe({type:String})],et.prototype,"label");try{customElements.define("glass-section-title",et)}catch{}var tt=Object.defineProperty,it=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&tt(t,i,r),r};class at extends ne{constructor(){super(...arguments),this.variant="full",this.tint="accent"}static{this.styles=[r`
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
    `]}_resolveTint(){const e=this.tint;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}render(){return V`<div class="line" style="--_sep-rgb:${this._resolveTint()}"></div>`}}it([pe({type:String,reflect:!0})],at.prototype,"variant"),it([pe({type:String,attribute:"tint"})],at.prototype,"tint");try{customElements.define("glass-fold-separator",at)}catch{}var st=Object.defineProperty,rt=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&st(t,i,r),r};class ot extends ne{constructor(){super(...arguments),this.color="#ffffff",this.selected=!1,this.disabled=!1,this.withCheck=!1,this.ariaLabel=null}static{this.styles=[xe,r`
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
    `]}render(){return V`
      <button
        type="button"
        style="--_swatch-bg:${this.color}"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel??`color ${this.color}`}
        aria-pressed=${this.selected?"true":"false"}
      >${this.withCheck?V`<ha-icon class="check" .icon=${"mdi:check"}></ha-icon>`:W}</button>
    `}}rt([pe({type:String})],ot.prototype,"color"),rt([pe({type:Boolean,reflect:!0})],ot.prototype,"selected"),rt([pe({type:Boolean,reflect:!0})],ot.prototype,"disabled"),rt([pe({type:Boolean,reflect:!0,attribute:"with-check"})],ot.prototype,"withCheck"),rt([pe({type:String,attribute:"aria-label"})],ot.prototype,"ariaLabel");try{customElements.define("glass-color-swatch",ot)}catch{}var nt=Object.defineProperty,ct=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&nt(t,i,r),r};class lt extends ne{constructor(){super(...arguments),this.value="",this.placeholder="",this.type="text",this.multiline=!1,this.rows=3,this.disabled=!1,this.ariaLabel=null}static{this.styles=[xe,r`
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
    `]}focusInput(){this._input?.focus()}getValue(){return this._input?.value??this.value}_onInput(e){const t=e.target;this.value=t.value,this.dispatchEvent(new CustomEvent("glass-input",{detail:{value:this.value},bubbles:!0,composed:!0}))}_onKey(e){"Enter"!==e.key||this.multiline||e.shiftKey||(e.preventDefault(),this.dispatchEvent(new CustomEvent("glass-submit",{detail:{value:this.value},bubbles:!0,composed:!0})))}updated(e){super.updated(e),e.has("value")&&this._input&&this._input.value!==this.value&&(this._input.value=this.value)}render(){return V`
      <div class="wrapper">
        ${this.multiline?V`<textarea
              class="input"
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              rows=${this.rows}
              maxlength=${this.maxLength??""}
              aria-label=${this.ariaLabel??""}
              @input=${this._onInput}
            >${this.value}</textarea>`:V`<input
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
    `}firstUpdated(){this._input&&this._input.value!==this.value&&(this._input.value=this.value)}}ct([pe({type:String})],lt.prototype,"value"),ct([pe({type:String})],lt.prototype,"placeholder"),ct([pe({type:String})],lt.prototype,"type"),ct([pe({type:Boolean})],lt.prototype,"multiline"),ct([pe({type:Number})],lt.prototype,"rows"),ct([pe({type:Boolean})],lt.prototype,"disabled"),ct([pe({type:Number,attribute:"max-length"})],lt.prototype,"maxLength"),ct([pe({type:String,attribute:"aria-label"})],lt.prototype,"ariaLabel"),ct([ue(".input")],lt.prototype,"_input");try{customElements.define("glass-form-input",lt)}catch{}var dt=Object.defineProperty,ht=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&dt(t,i,r),r};class pt extends ne{constructor(){super(...arguments),this.icon="",this.variant="secondary",this.size="md",this.disabled=!1,this.loading=!1,this.ariaLabel=null}static{this.styles=[xe,r`
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
    `]}render(){return V`
      <button
        type="button"
        ?disabled=${this.disabled||this.loading}
        aria-label=${this.ariaLabel??""}
        aria-busy=${this.loading?"true":"false"}
      >
        ${this.loading?V`<span class="spinner" aria-hidden="true"></span>`:this.icon?V`<ha-icon .icon=${this.icon}></ha-icon>`:null}
        <slot></slot>
      </button>
    `}}ht([pe({type:String})],pt.prototype,"icon"),ht([pe({type:String,reflect:!0})],pt.prototype,"variant"),ht([pe({type:String,reflect:!0})],pt.prototype,"size"),ht([pe({type:Boolean,reflect:!0})],pt.prototype,"disabled"),ht([pe({type:Boolean,reflect:!0})],pt.prototype,"loading"),ht([pe({type:String,attribute:"aria-label"})],pt.prototype,"ariaLabel");try{customElements.define("glass-button",pt)}catch{}var gt=Object.defineProperty,ut=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&gt(t,i,r),r};class mt extends ne{constructor(){super(...arguments),this.open=!1,this.size="md",this.tone="neutral",this.interactive=!1,this.ariaLabel=null,this.onKeyDown=e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.click())}}static{this.styles=[xe,r`
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
    `]}connectedCallback(){super.connectedCallback(),this.updateInteractiveAttrs()}updated(e){super.updated(e),e.has("interactive")&&this.updateInteractiveAttrs()}updateInteractiveAttrs(){this.interactive?(this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.addEventListener("keydown",this.onKeyDown)):(this.removeAttribute("role"),this.removeAttribute("tabindex"),this.removeEventListener("keydown",this.onKeyDown))}render(){return V`<ha-icon .icon=${"mdi:chevron-down"} aria-hidden="true"></ha-icon>`}}ut([pe({type:Boolean,reflect:!0})],mt.prototype,"open"),ut([pe({type:String,reflect:!0})],mt.prototype,"size"),ut([pe({type:String,reflect:!0})],mt.prototype,"tone"),ut([pe({type:Boolean,reflect:!0})],mt.prototype,"interactive"),ut([pe({type:String,attribute:"aria-label"})],mt.prototype,"ariaLabel");try{customElements.define("glass-chevron",mt)}catch{}var _t=Object.defineProperty,ft=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&_t(t,i,r),r};class vt extends ne{constructor(){super(...arguments),this.tone="neutral",this.size="sm",this.glow=!1}static{this.styles=[r`
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
    `]}render(){return V`<span class="dot" role="presentation"></span>`}}ft([pe({type:String,reflect:!0})],vt.prototype,"tone"),ft([pe({type:String,reflect:!0})],vt.prototype,"size"),ft([pe({type:Boolean,reflect:!0})],vt.prototype,"glow");try{customElements.define("glass-status-dot",vt)}catch{}var bt=Object.defineProperty;class yt extends ne{constructor(){super(...arguments),this.size="md"}static{this.styles=[xe,r`
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
    `]}render(){return V`<ha-icon .icon=${"mdi:drag"} aria-hidden="true"></ha-icon>`}}((e,t,i)=>{for(var a,s=void 0,r=e.length-1;r>=0;r--)(a=e[r])&&(s=a(t,i,s)||s);s&&bt(t,i,s)})([pe({type:String,reflect:!0})],yt.prototype,"size");try{customElements.define("glass-drag-handle",yt)}catch{}var wt=Object.defineProperty,xt=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&wt(t,i,r),r};class kt extends ne{constructor(){super(...arguments),this.icon="",this.title="",this.subtitle="",this.variant="default"}static{this.styles=[r`
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
    `]}render(){return V`
      ${this.icon?V`
        <div class="icon-wrap">
          <ha-icon .icon=${this.icon}></ha-icon>
        </div>
      `:null}
      ${this.title?V`<div class="title">${this.title}</div>`:null}
      ${this.subtitle?V`<div class="subtitle">${this.subtitle}</div>`:null}
      <div class="actions"><slot></slot></div>
    `}}xt([pe({type:String})],kt.prototype,"icon"),xt([pe({type:String})],kt.prototype,"title"),xt([pe({type:String})],kt.prototype,"subtitle"),xt([pe({type:String,reflect:!0})],kt.prototype,"variant");try{customElements.define("glass-empty-state",kt)}catch{}var $t=Object.defineProperty,St=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&$t(t,i,r),r};class Ct extends ne{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.interactive=!1,this.disabled=!1,this.fillColor="accent",this.ariaLabel=null,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[xe,r`
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
    `]}_resolveColor(){const e=this.fillColor;return/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(e)?e:`var(--rgb-${e})`}_pct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_pctToValue(e){const t=this.max-this.min;return Math.max(this.min,Math.min(this.max,this.min+e/100*t))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._pct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.left=`${e}%`)}_onPointerDown(e){if(!this.interactive||this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,t.classList.add("dragging"),this._ac=new AbortController;const{signal:i}=this._ac,a=(e,i)=>{const a=t.getBoundingClientRect(),s=Math.max(0,Math.min(100,(e.clientX-a.left)/a.width*100)),r=this._pctToValue(s);this._dragValue=r,this._applyVisuals(),this.dispatchEvent(new CustomEvent(i?"glass-progress-change":"glass-progress-input",{detail:{value:r},bubbles:!0,composed:!0}))};a(e,!1);const s=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}t.classList.remove("dragging"),this._dragging=!1};t.addEventListener("pointermove",e=>a(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{a(e,!0),s()},{signal:i}),t.addEventListener("pointercancel",()=>s(),{signal:i}),t.addEventListener("lostpointercapture",()=>s(),{signal:i})}_onKeyDown(e){if(!this.interactive||this.disabled)return;const t=(this.max-this.min)/20;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this.value+t);break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this.value-t);break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this.dispatchEvent(new CustomEvent("glass-progress-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return V`
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
        ${this.interactive?V`<div class="thumb"></div>`:null}
      </div>
    `}}St([pe({type:Number})],Ct.prototype,"value"),St([pe({type:Number})],Ct.prototype,"min"),St([pe({type:Number})],Ct.prototype,"max"),St([pe({type:Boolean,reflect:!0})],Ct.prototype,"interactive"),St([pe({type:Boolean,reflect:!0})],Ct.prototype,"disabled"),St([pe({type:String,attribute:"fill-color"})],Ct.prototype,"fillColor"),St([pe({type:String,attribute:"aria-label"})],Ct.prototype,"ariaLabel");try{customElements.define("glass-progress-bar",Ct)}catch{}var It=Object.defineProperty,Et=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&It(t,i,r),r};class zt extends ne{constructor(){super(...arguments),this.items=[],this.value="",this.label="",this.icon="",this.placeholder="",this.searchPlaceholder="Search…",this.emptyText="No results",this.searchable=!1,this.disabled=!1,this.ariaLabel=null,this._open=!1,this._query="",this._activeIndex=-1,this._onDocClick=e=>{this._open&&(e.composedPath().includes(this)||this._close())}}static{this.styles=[xe,r`
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
    `]}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick,!0)}updated(e){super.updated(e),e.has("_open")&&(this.toggleAttribute("open",this._open),this._open&&this.searchable&&requestAnimationFrame(()=>this._searchInput?.focus()))}_filteredItems(){if(!this._query)return this.items;const e=this._query.toLowerCase();return this.items.filter(t=>t.label.toLowerCase().includes(e)||t.value.toLowerCase().includes(e))}_open$(){this.disabled||(this._open=!0,this._activeIndex=-1)}_close(){this._open=!1,this._query=""}_toggleOpen(){this._open?this._close():this._open$()}_selectItem(e){this.value=e,this.dispatchEvent(new CustomEvent("glass-dropdown-change",{detail:{value:e},bubbles:!0,composed:!0})),this._close()}_onKeyDown(e){if(!this._open)return void("Enter"!==e.key&&" "!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),this._open$()));const t=this._filteredItems();switch(e.key){case"Escape":e.preventDefault(),this._close();break;case"ArrowDown":e.preventDefault(),this._activeIndex=Math.min(t.length-1,this._activeIndex+1);break;case"ArrowUp":e.preventDefault(),this._activeIndex=Math.max(0,this._activeIndex-1);break;case"Enter":e.preventDefault(),this._activeIndex>=0&&t[this._activeIndex]&&this._selectItem(t[this._activeIndex].value)}}render(){const e=this._filteredItems(),t=this.items.find(e=>e.value===this.value),i=t?.label||this.label||this.placeholder||"",a=t?.icon||this.icon;return V`
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
        ${a?V`<ha-icon .icon=${a}></ha-icon>`:W}
        <span class="label ${t?"":"empty"}" part="label">${i}</span>
        <glass-chevron ?open=${this._open} size="sm" tone="muted"></glass-chevron>
      </button>
      <div class="menu ${this._open?"open":""}" part="menu" role="listbox">
        ${this.searchable?V`
          <input
            class="dropdown-search"
            part="search"
            type="text"
            .value=${this._query}
            placeholder=${this.searchPlaceholder}
            @input=${e=>{this._query=e.target.value,this._activeIndex=0}}
            @keydown=${this._onKeyDown}
          />
        `:W}
        ${0===e.length?V`<div class="empty" part="empty">${this.emptyText}</div>`:e.map((e,t)=>V`
              <button
                type="button"
                role="option"
                class="item ${e.value===this.value?"selected":""} ${t===this._activeIndex?"active-row":""}"
                part="item ${e.value===this.value?"item-selected":""}"
                aria-selected=${e.value===this.value?"true":"false"}
                @click=${()=>this._selectItem(e.value)}
                @mouseenter=${()=>{this._activeIndex=t}}
              >
                ${e.icon?V`<ha-icon .icon=${e.icon}></ha-icon>`:W}
                <span>${e.label}</span>
              </button>
            `)}
      </div>
    `}}Et([pe({type:Array})],zt.prototype,"items"),Et([pe({type:String,reflect:!0})],zt.prototype,"value"),Et([pe({type:String})],zt.prototype,"label"),Et([pe({type:String})],zt.prototype,"icon"),Et([pe({type:String})],zt.prototype,"placeholder"),Et([pe({type:String,attribute:"search-placeholder"})],zt.prototype,"searchPlaceholder"),Et([pe({type:String,attribute:"empty-text"})],zt.prototype,"emptyText"),Et([pe({type:Boolean})],zt.prototype,"searchable"),Et([pe({type:Boolean,reflect:!0})],zt.prototype,"disabled"),Et([pe({type:String,attribute:"aria-label"})],zt.prototype,"ariaLabel"),Et([ge()],zt.prototype,"_open"),Et([ge()],zt.prototype,"_query"),Et([ge()],zt.prototype,"_activeIndex"),Et([ue(".dropdown-search")],zt.prototype,"_searchInput");try{customElements.define("glass-dropdown",zt)}catch{}const Dt=r`
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
`,Pt=r`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-tap-highlight-color: transparent;
  }
`,Tt=r`
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
`,Lt=r`
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
`;const At=r`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`,Mt=r`
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
`,Rt=r`
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
`;function Ot(e,t){const i=t,a=i*(1-Math.abs(e/60%2-1));let s=0,r=0,o=0;e<60?(s=i,r=a):e<120?(s=a,r=i):e<180?(r=i,o=a):e<240?(r=a,o=i):e<300?(s=a,o=i):(s=i,o=a);const n=1-i;return[Math.round(255*(s+n)),Math.round(255*(r+n)),Math.round(255*(o+n))]}function jt(e){const t=e[0]/255,i=e[1]/255,a=e[2]/255,s=Math.max(t,i,a),r=s-Math.min(t,i,a);let o=0;0!==r&&(o=s===t?((i-a)/r+6)%6*60:s===i?60*((a-t)/r+2):60*((t-i)/r+4));return{h:o,s:0===s?0:r/s}}function Ht(e){return"#"+e.map(e=>e.toString(16).padStart(2,"0")).join("")}const Ft=r`
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
`;function qt(e){return!e||"unavailable"===e||"unknown"===e}const Nt={rgb:"251,191,36"},Vt={rgb:"167,139,250"},Bt={rgb:"96,165,250"},Ut={rgb:"129,140,248"},Wt={rgb:"45,212,191"},Kt={rgb:"29,185,84"},Yt={rgb:"248,113,113"},Gt={rgb:"129,140,248"},Xt={rgb:"129,140,248"},Qt={rgb:"96,165,250"},Jt={rgb:"74,222,128"},Zt={rgb:"96,165,250"},ei=r`
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
`,ti={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer",collapse:"Réduire",expand:"Développer",move_up:"Déplacer vers le haut",move_down:"Déplacer vers le bas",none:"Aucun",rooms:"Pièces",enabled:"Activé",disabled:"Désactivé",previous:"Précédent",next:"Suivant",active:"Actif",count_visible:"{count} sur {total} visibles",search:"Rechercher…",no_results:"Aucun résultat"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison",section_brightness:"Intensité",section_temperature:"Température",section_color:"Couleur",section_effects:"Effets"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",forecast_section:"Prévisions",metric_humidity:"Hum.",metric_wind:"Vent",metric_pressure:"Press.",metric_uv:"UV",metric_visibility:"Visib.",sun_cycle:"Cycle solaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSO",compass_SW:"SO",compass_WSW:"OSO",compass_W:"O",compass_WNW:"ONO",compass_NW:"NO",compass_NNW:"NNO"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",section_position:"Position",section_tilt:"Inclinaison",section_presets:"Préréglages",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store d'ombrage",dc_window:"Fenêtre",dc_damper:"Clapet"},climate:{title:"Thermostat",target:"Consigne",current:"Actuelle",range_low:"Min",range_high:"Max",humidity_target:"Humidité cible",aux_heat:"Chauffage auxiliaire",unavailable:"Indisponible",mode_heat:"Chauffage",mode_cool:"Climatisation",mode_heat_cool:"Auto chaud/froid",mode_auto:"Automatique",mode_dry:"Déshumidification",mode_fan_only:"Ventilation",mode_off:"Éteint",preset_eco:"Éco",preset_comfort:"Confort",preset_boost:"Boost",preset_away:"Absent",preset_sleep:"Nuit",preset_activity:"Activité",preset_none:"Aucun",fan_mode:"Ventilation",swing_mode:"Oscillation",open_all_aria:"Allumer tous les climatiseurs",close_all_aria:"Éteindre tous les climatiseurs",toggle_aria:"Basculer",expand_aria:"Détails",temp_up_aria:"Augmenter température",temp_down_aria:"Diminuer température",humidity_up_aria:"Augmenter humidité",humidity_down_aria:"Diminuer humidité",range_low_aria:"Température minimale",range_high_aria:"Température maximale",no_climates:"Aucun climatiseur",turn_on_aria:"Allumer",turn_off_aria:"Éteindre",action_heating:"Chauffe",action_cooling:"Refroidit",action_idle:"En attente",action_off:"Éteint",action_drying:"Déshumidifie",current_label:"Actuel",controls_aria:"Contrôles",unknown:"Inconnu",avg_label:"Moy.",section_mode:"Mode",section_preset:"Preset",section_air:"Air"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce.",section_speed:"Vitesse",section_mode:"Mode",section_direction:"Direction",section_oscillation:"Oscillation"},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},vacuum:{title:"Aspirateur",status_docked:"Au dock",status_cleaning:"Nettoie",status_paused:"Pause",status_returning:"Retour",status_error:"Erreur",status_unavailable:"Indisponible",cleaning_room:"Nettoie : {room}",battery_aria:"Batterie {level}%, {charging}",charging:"en charge",not_charging:"sur batterie",alert_aria:"Alerte : entretien requis",warning_aria:"Avertissement : entretien à prévoir",all_house:"Toute la maison",confirm_short:"Confirmer ?",clean_room_aria:"Nettoyer {room}",transport_start:"Démarrer",transport_pause:"Pause",transport_stop:"Arrêter",transport_locate:"Localiser",transport_return:"Retour au dock",transport_retry:"Réessayer",section_suction:"Aspiration",section_mopping:"Lavage",section_dock:"Dock",section_consumables:"Consommables",section_stats:"Statistiques",fold_daily:"Modes",fold_maintenance:"Maintenance",mop_attached:"Serpillière fixée",mop_missing:"Serpillière manquante",tank_ok:"Réservoir en place",tank_missing:"Réservoir manquant",water_ok:"Eau OK",water_short:"Pénurie d'eau",dock_charging:"En charge",dock_idle:"Hors charge",dock_drying_label:"Séchage : {minutes} min",dock_drying_idle:"—",dirty_ok:"OK",dirty_full:"À vider",clean_ok:"OK",clean_empty:"À remplir",fluid_ok:"OK",fluid_empty:"À recharger",conso_hours:"{hours} h",conso_clean_now:"À nettoyer maintenant",conso_brush_main:"Brosse principale",conso_brush_side:"Brosse latérale",conso_filter:"Filtre",conso_sensors:"Capteurs",conso_strainer:"Filtre de dock",stats_last_session:"{when} · {duration} · {area}",stats_totals:"{count} nettoyages · {area} cumulés"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",play_on_named:"Jouer sur {name}",play_on_count:"Jouer sur {count} enceintes",choose_speaker:"Choisis une enceinte",connect:"Spotify Connect",available:"Disponible",paused:"En pause",speaker_off:"Éteinte",now_playing_aria:"Lecture en cours",previous_track:"Titre précédent",next_track:"Titre suivant",pause:"Mettre en pause",setup_eyebrow:"Connexion requise",error_eyebrow:"Erreur",no_content_sub:"Aucune playlist, titre ou podcast à afficher pour l'instant.",no_results_title:"Aucun résultat",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}",clear_search:"Effacer la recherche"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",remove_from_queue:"Retirer de la liste de lecture",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message pour {name}…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",sleeping:"Dort",sleeping_aria:"{name} dort",last_seen_label:"Dernière localisation",seen_prefix:"Vu",distance_m:"m",distance_km:"km"},camera:{title:"CAMÉRAS",idle:"Veille",streaming:"En direct",recording:"Enregistrement",off:"Éteinte",unavailable:"Indisponible",no_cameras:"Aucune caméra",prev_aria:"Caméra précédente",next_aria:"Caméra suivante",dot_aria:"Aller à {name}",power_on:"Allumer",power_off:"Éteindre",snapshot:"Capture",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Désactiver détection mouvement",motion_off_aria:"Activer détection mouvement",siren_aria:"Sirène",floodlight_aria:"Projecteur",auto_track_aria:"Suivi automatique",tap_to_stream:"Appuyer pour diffuser",camera_off:"Caméra éteinte",ai_person:"Personne",ai_vehicle:"Véhicule",ai_pet:"Animal",ai_animal:"Animal",ai_package:"Colis",ai_face:"Visage",ai_baby_crying:"Bébé",ai_bicycle:"Vélo",dashboard_title:"CAMÉRAS",dashboard_title_one:"1 CAMÉRA"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Pièces","nav_dashboard":"Dashboard","nav_advanced":"Avancé","tab_navbar":"Navigation","tab_popup":"Popup Pièce","tab_light":"Lumières","preview":"Aperçu","behavior":"Comportement","display":"Affichage","navbar_settings":"Comportement","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","no_rooms":"Aucune pièce configurée","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","room_sensors":"Capteurs","room_sensors_desc":"Entités de température et d\'humidité utilisées dans le popup et la navbar.","room_temp_entity":"Capteur de température","room_temp_entity_desc":"Entité utilisée pour afficher la température de la pièce.","room_humidity_entity":"Capteur d\'humidité","room_humidity_entity_desc":"Entité utilisée pour afficher l\'humidité de la pièce.","room_auto_detect":"Auto-détection","room_no_sensor":"Aucun capteur","room_thresholds":"Seuils d\'alerte","room_thresholds_desc":"Au-delà de ces valeurs, l\'indicateur passe en couleur d\'alerte.","room_temp_high":"Température haute","room_temp_low":"Température basse","room_humidity_threshold":"Seuil d\'humidité","room_indicators":"Indicateurs navbar","room_indicators_desc":"Choisir les indicateurs à afficher pour cette pièce dans la navbar","room_show_lights":"Afficher les lumières","room_show_temperature":"Afficher la température","room_show_humidity":"Afficher l\'humidité","room_sort_by_lights":"Tri auto par lumières","room_sort_by_presence":"Tri auto par présence","room_presence_entity":"Capteur de présence","hide_room":"Masquer de la navbar","show_room":"Afficher dans la navbar","room_open_aria":"Configurer {name}","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","room_buttons_title":"Boutons d\'action","room_buttons_desc":"Boutons configurables affichés dans le header du popup. 3 max.","room_button_entity":"Entité","room_button_entity_placeholder":"Choisir une entité","room_button_entity_search":"Rechercher…","room_button_entity_empty":"Aucune entité","room_button_service_disabled":"Choisir d\'abord une entité","room_button_service_search":"Rechercher un service…","room_button_service_empty":"Aucun service","room_button_icon_auto":"Auto · {icon}","room_button_icon_pick":"Choisir une icône","room_button_icon":"Icône (mdi:...)","room_button_label":"Texte","room_button_label_placeholder":"Aspirer cette pièce","room_button_service":"Service (domain.service)","room_button_data":"Data (JSON)","room_button_advanced":"Paramètres avancés","room_button_add":"Ajouter un bouton","room_button_delete":"Supprimer ce bouton","popup_auto_close":"Fermeture automatique","popup_auto_close_desc":"Fermer le popup automatiquement après un délai d\'inactivité.","popup_auto_close_duration":"Délai","popup_auto_close_off":"Désactivé","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_camera":"Caméras","domain_camera_desc":"Caméras de surveillance","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_daily_desc":"Onglet déroulant des prochains jours","weather_hourly":"Prévisions horaires","weather_hourly_desc":"Onglet déroulant des prochaines heures","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","weather_display":"Affichage","weather_display_desc":"Ce qui apparaît sur la carte.","weather_no_entity":"Aucune entité weather.* détectée. Ajoute une intégration météo dans Home Assistant.","tab_title":"Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_period_indicator":"Indicateur de période","title_period_info":"Créez un input_select nommé « periode_journee » avec les options : Matin, Après-midi, Soir, Nuit. L\'indicateur s\'affichera automatiquement.","title_period_entity":"Entité période","title_period_entity_desc":"Sélectionnez l\'input_select qui contrôle la période du jour.","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Visuels des périodes","title_period_options_desc":"Personnalisez l\'icône et la couleur de chaque période.","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_sources_empty":"Aucune source. Ajoute un mode pour afficher des boutons interactifs sous le titre.","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_dynamic_bg":"Fond dynamique","dashboard_dynamic_bg_desc":"Active le fond d\'écran jour/nuit animé de Glass Cards.","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_players":"Lecteurs médias","media_dashboard_players_desc":"Activez ou désactivez les lecteurs médias visibles sur le tableau de bord.","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","tab_climate":"Thermostat","climate_desc":"Configurez les entités climat par pièce","climate_no_entities":"Aucune entité climat dans cette pièce","climate_show_header":"Afficher l\'en-tête","climate_show_header_desc":"Titre et compteur au-dessus de la carte","climate_display_mode":"Mode d\'affichage","climate_display_mode_popup":"Mode d\'affichage popup","climate_display_mode_popup_desc":"Disposition des entités climat dans le popup de la pièce.","climate_display_mode_dashboard":"Mode d\'affichage (dashboard)","climate_display_mode_dashboard_desc":"Disposition des entités climat sur le tableau de bord.","climate_mode_list":"Liste","climate_mode_normal":"Normal","climate_select_room":"Sélectionner une pièce","climate_room_entities":"Thermostats de la pièce","climate_room_entities_desc":"Ordre et visibilité. Glissez pour réordonner.","climate_dashboard_entities":"Thermostats détectés","climate_dashboard_entities_desc":"Sélectionnez ceux à afficher sur le tableau de bord.","dashboard_card_climate":"Thermostat","dashboard_card_climate_desc":"Thermostats et climatiseurs","dashboard_card_fan":"Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_per_person":"Capteurs par personne","presence_per_person_desc":"Associez un téléphone, un service notify et un capteur conduite à chaque personne.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_sleep":"Capteur sommeil","presence_sleep_desc":"input_boolean ou binary_sensor passant à on quand la personne dort.","presence_sleep_none":"Aucun capteur sommeil","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_compact":"Affichage compact","cover_dashboard_compact_desc":"Affiche les volets en grille compacte 2 colonnes. Désactivé, chaque volet occupe toute la largeur.","cover_dashboard_entities":"Volets détectés","cover_dashboard_entities_desc":"Sélectionnez ceux à afficher. Tous sont visibles quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_dashboard_info":"Sur le tableau de bord, tous les volets activés sont affichés quel que soit leur état (ouvert ou fermé). Active-les ci-dessous.","climate_dashboard_info":"Sur le tableau de bord, tous les thermostats activés sont affichés. Active-les ci-dessous.","camera_dashboard_info":"Sur le tableau de bord, toutes les caméras activées défilent dans le carrousel. Active-les ci-dessous.","media_dashboard_info":"Sur le tableau de bord, seul le lecteur en cours de lecture est affiché. Les autres apparaissent en glissant.","spotify_dashboard_info":"La carte Spotify n\'apparaît sur le tableau de bord que si l\'intégration Spotify officielle est configurée.","presence_dashboard_info":"Sur le tableau de bord, toutes les personnes sélectionnées sont affichées avec leur statut (présent, absent, en route).","fan_dashboard_info":"Sur le tableau de bord, seuls les ventilateurs allumés des pièces visibles sont affichés. Dans chaque pièce, tous les ventilateurs sont disponibles.","rooms_list_title":"Pièces détectées","rooms_list_desc":"Glissez pour réordonner. Activez ou désactivez pour le tableau de bord.","rooms_dashboard_info":"Les pièces actives apparaissent dans la barre de navigation. L\'ordre détermine leur position. Touche une pièce pour ouvrir son popup et configurer ses cards.","dashboard_info":"Les cartes activées apparaissent sur le tableau de bord dans l\'ordre choisi. Glisse pour réordonner, touche pour configurer.","advanced_info":"Options réservées aux utilisateurs avancés. Lis bien chaque description avant d\'agir.","advanced_settings_title":"Réglages","advanced_navbar_title":"Barre de navigation","advanced_navbar_desc":"Comportement et tri automatique des pièces","advanced_orphans_title":"Entités orphelines","advanced_orphans_desc":"Renommer ou réassigner les entités sans pièce","advanced_danger_title":"Zone destructive","advanced_reconfig_title":"Reconfigurer Glass Cards","advanced_reconfig_desc":"Relancer l\'assistant initial. Tous les réglages personnalisés seront perdus.","advanced_reconfig_loading":"Relancement de l\'assistant…","room_detail_info":"Configure ce qui apparaît quand tu ouvres cette pièce sur le tableau de bord.","room_cards_title":"Cartes de la pièce","room_cards_desc":"Glisse pour réordonner, touche le chevron pour configurer.","room_thresholds_title":"Seuils d\'alerte","room_no_entities":"Aucune entité détectée dans cette pièce.","unassigned_info_warn":"{count} entité(s) sans pièce. Assigne-les ci-dessous pour qu\'elles apparaissent sur le tableau de bord.","unassigned_info_ok":"Toutes les entités sont assignées. Tu peux toujours les renommer ou changer leur icône ici.","unassigned_list_title":"Entités contrôlables","unassigned_list_desc":"Touche le nom pour le renommer, l\'icône pour la changer, la pièce pour l\'assigner.","unassigned_filter_all":"Toutes","unassigned_filter_orphans":"Sans pièce","unassigned_assign_room":"Assigner une pièce","unassigned_all_assigned":"Toutes les entités ont une pièce.","unassigned_orphan_count_aria":"{count} sans pièce","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_camera_carousel":"Caméras","camera_show_header":"Afficher l\'en-tête","camera_show_header_desc":"Titre et compteur au-dessus de la carte","camera_auto_cycle":"Cycle automatique","camera_auto_cycle_desc":"Passer automatiquement d\'une caméra à l\'autre","camera_cycle_interval":"Intervalle (secondes)","camera_cycle_interval_desc":"Temps entre chaque changement de caméra","camera_entity_order":"Caméras détectées","camera_entity_order_desc":"Glissez pour réordonner.","camera_no_cameras":"Aucune caméra détectée.","camera_list_title":"Caméras","camera_list_banner":"Glissez pour réordonner. Désactivez celles à masquer.","dashboard_card_camera_carousel":"Caméras","dashboard_card_calendar":"Calendrier","dashboard_card_calendar_desc":"Vue rapide des prochains évènements de tes calendriers","dashboard_card_vacuum":"Aspirateur","dashboard_card_vacuum_desc":"Statut + contrôle de l\'aspirateur robot (Roborock et compatibles)","vacuum_dashboard_info":"La carte Aspirateur s\'affiche sur le tableau de bord. Toutes les entités du robot (batterie, modes, pièces, dock) sont auto-découvertes.","vacuum_show_header":"Afficher l\'en-tête","vacuum_show_header_desc":"Affiche le nom du robot et son statut dans la barre compacte","vacuum_entity":"Entité aspirateur","vacuum_entity_desc":"Choisis l\'entité vacuum à utiliser si plusieurs sont disponibles. Vide = première détectée.","vacuum_no_entities":"Aucune entité vacuum détectée. Ajoute une intégration robot dans Home Assistant.","calendar_show_header":"Afficher l\'en-tête","calendar_show_header_desc":"Titre et compteur d\'évènements au-dessus de la carte","calendar_dashboard_info":"La carte Calendrier n\'apparaît que sur le tableau de bord. Elle regroupe les évènements des calendriers activés ci-dessous.","calendar_entities":"Calendriers détectés","calendar_entities_desc":"Désactive ceux que tu ne veux pas voir dans la carte.","calendar_no_entities":"Aucun calendrier détecté. Ajoute une intégration de calendrier dans Home Assistant.","dashboard_card_camera_carousel_desc":"Carrousel de surveillance avec actions rapides","tab_spotify":"Spotify","tab_calendar":"Calendrier","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Lecteur Spotify","spotify_entity_desc":"Entité media_player à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Enceintes affichées dans le popup de lecture. Vide = toutes.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres","tab_unassigned":"Entités orphelines","unassigned_desc":"Assignez ou réassignez vos entités à une pièce pour qu\'elles apparaissent dans les popups correspondants. Vous pouvez également renommer vos entités directement depuis cet onglet.","unassigned_none":"Toutes les entités sont assignées à une pièce.","unassigned_no_entities":"Aucune entité détectée.","unassigned_select_area":"Non assignée","unassigned_assigned":"Assignée","unassigned_count":"{count} entité(s) sans pièce","unassigned_no_results":"Aucun résultat.","unassigned_rename":"Renommer l\'entité","unassigned_change_icon":"Changer l\'icône"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete",collapse:"Collapse",expand:"Expand",move_up:"Move up",move_down:"Move down",none:"None",rooms:"Rooms",enabled:"Enabled",disabled:"Disabled",previous:"Previous",next:"Next",active:"Active",count_visible:"{count} of {total} visible",search:"Search…",no_results:"No results"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house",section_brightness:"Brightness",section_temperature:"Temperature",section_color:"Color",section_effects:"Effects"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",forecast_section:"Forecast",metric_humidity:"Humid.",metric_wind:"Wind",metric_pressure:"Press.",metric_uv:"UV",metric_visibility:"Visib.",sun_cycle:"Sun cycle",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSW",compass_SW:"SW",compass_WSW:"WSW",compass_W:"W",compass_WNW:"WNW",compass_NW:"NW",compass_NNW:"NNW"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",section_position:"Position",section_tilt:"Tilt",section_presets:"Presets",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},climate:{title:"Climate",target:"Target",current:"Current",range_low:"Low",range_high:"High",humidity_target:"Target humidity",aux_heat:"Auxiliary heat",unavailable:"Unavailable",mode_heat:"Heat",mode_cool:"Cool",mode_heat_cool:"Heat/Cool",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan only",mode_off:"Off",preset_eco:"Eco",preset_comfort:"Comfort",preset_boost:"Boost",preset_away:"Away",preset_sleep:"Sleep",preset_activity:"Activity",preset_none:"None",fan_mode:"Fan mode",swing_mode:"Swing mode",open_all_aria:"Turn on all climate devices",close_all_aria:"Turn off all climate devices",toggle_aria:"Toggle",expand_aria:"Details",temp_up_aria:"Increase temperature",temp_down_aria:"Decrease temperature",humidity_up_aria:"Increase humidity",humidity_down_aria:"Decrease humidity",range_low_aria:"Minimum temperature",range_high_aria:"Maximum temperature",no_climates:"No climate devices",turn_on_aria:"Turn on",turn_off_aria:"Turn off",action_heating:"Heating",action_cooling:"Cooling",action_idle:"Idle",action_off:"Off",action_drying:"Drying",current_label:"Current",controls_aria:"Controls",unknown:"Unknown",avg_label:"Avg.",section_mode:"Mode",section_preset:"Preset",section_air:"Air"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room.",section_speed:"Speed",section_mode:"Mode",section_direction:"Direction",section_oscillation:"Oscillation"},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},vacuum:{title:"Vacuum",status_docked:"Docked",status_cleaning:"Cleaning",status_paused:"Paused",status_returning:"Returning",status_error:"Error",status_unavailable:"Unavailable",cleaning_room:"Cleaning: {room}",battery_aria:"Battery {level}%, {charging}",charging:"charging",not_charging:"on battery",alert_aria:"Alert: maintenance required",warning_aria:"Warning: maintenance soon",all_house:"Whole house",confirm_short:"Confirm?",clean_room_aria:"Clean {room}",transport_start:"Start",transport_pause:"Pause",transport_stop:"Stop",transport_locate:"Locate",transport_return:"Return to dock",transport_retry:"Retry",section_suction:"Suction",section_mopping:"Mopping",section_dock:"Dock",section_consumables:"Consumables",section_stats:"Statistics",fold_daily:"Modes",fold_maintenance:"Maintenance",mop_attached:"Mop attached",mop_missing:"Mop missing",tank_ok:"Water tank attached",tank_missing:"Water tank missing",water_ok:"Water OK",water_short:"Water shortage",dock_charging:"Charging",dock_idle:"Not charging",dock_drying_label:"Drying: {minutes} min",dock_drying_idle:"—",dirty_ok:"OK",dirty_full:"Empty bin",clean_ok:"OK",clean_empty:"Refill water",fluid_ok:"OK",fluid_empty:"Refill cleaner",conso_hours:"{hours} h",conso_clean_now:"Clean now",conso_brush_main:"Main brush",conso_brush_side:"Side brush",conso_filter:"Filter",conso_sensors:"Sensors",conso_strainer:"Dock strainer",stats_last_session:"{when} · {duration} · {area}",stats_totals:"{count} cleanings · {area} total"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",play_on_named:"Play on {name}",play_on_count:"Play on {count} speakers",choose_speaker:"Pick a speaker",connect:"Spotify Connect",available:"Available",paused:"Paused",speaker_off:"Off",now_playing_aria:"Now playing",previous_track:"Previous track",next_track:"Next track",pause:"Pause",setup_eyebrow:"Connection required",error_eyebrow:"Error",no_content_sub:"No playlists, tracks or podcasts to show yet.",no_results_title:"No results",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}",clear_search:"Clear search"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",remove_from_queue:"Remove from queue",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message for {name}…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",sleeping:"Sleeping",sleeping_aria:"{name} is sleeping",last_seen_label:"Last location update",seen_prefix:"Seen",distance_m:"m",distance_km:"km"},camera:{title:"CAMERAS",idle:"Idle",streaming:"Streaming",recording:"Recording",off:"Off",unavailable:"Unavailable",no_cameras:"No cameras",prev_aria:"Previous camera",next_aria:"Next camera",dot_aria:"Go to {name}",power_on:"Turn on",power_off:"Turn off",snapshot:"Snapshot",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Disable motion detection",motion_off_aria:"Enable motion detection",siren_aria:"Siren",floodlight_aria:"Floodlight",auto_track_aria:"Auto tracking",tap_to_stream:"Tap to stream",camera_off:"Camera off",ai_person:"Person",ai_vehicle:"Vehicle",ai_pet:"Pet",ai_animal:"Animal",ai_package:"Package",ai_face:"Face",ai_baby_crying:"Baby",ai_bicycle:"Bicycle",dashboard_title:"CAMERAS",dashboard_title_one:"1 CAMERA"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Rooms","nav_dashboard":"Dashboard","nav_advanced":"Advanced","tab_navbar":"Navigation","tab_popup":"Room Popup","tab_light":"Lights","preview":"Preview","behavior":"Behavior","display":"Display","navbar_settings":"Behavior","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","no_rooms":"No rooms configured","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","room_sensors":"Sensors","room_sensors_desc":"Temperature and humidity entities used in the popup and navbar.","room_temp_entity":"Temperature sensor","room_temp_entity_desc":"Entity used to display the room temperature.","room_humidity_entity":"Humidity sensor","room_humidity_entity_desc":"Entity used to display the room humidity.","room_auto_detect":"Auto-detect","room_no_sensor":"No sensor","room_thresholds":"Alert thresholds","room_thresholds_desc":"Above these values, the indicator switches to alert color.","room_temp_high":"High temperature","room_temp_low":"Low temperature","room_humidity_threshold":"Humidity threshold","room_indicators":"Navbar indicators","room_indicators_desc":"Choose which indicators to show for this room in the navbar","room_show_lights":"Show lights","room_show_temperature":"Show temperature","room_show_humidity":"Show humidity","room_sort_by_lights":"Auto-sort by lights","room_sort_by_presence":"Auto-sort by presence","room_presence_entity":"Presence sensor","hide_room":"Hide from navbar","show_room":"Show in navbar","room_open_aria":"Configure {name}","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","room_buttons_title":"Action buttons","room_buttons_desc":"Configurable buttons shown in the popup header. Max 3.","room_button_entity":"Entity","room_button_entity_placeholder":"Pick an entity","room_button_entity_search":"Search…","room_button_entity_empty":"No entity","room_button_service_disabled":"Pick an entity first","room_button_service_search":"Search service…","room_button_service_empty":"No service","room_button_icon_auto":"Auto · {icon}","room_button_icon_pick":"Pick an icon","room_button_icon":"Icon (mdi:...)","room_button_label":"Label","room_button_label_placeholder":"Clean this room","room_button_service":"Service (domain.service)","room_button_data":"Data (JSON)","room_button_advanced":"Advanced settings","room_button_add":"Add a button","room_button_delete":"Delete this button","popup_auto_close":"Auto close","popup_auto_close_desc":"Automatically close the popup after an inactivity delay.","popup_auto_close_duration":"Delay","popup_auto_close_off":"Disabled","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_camera":"Cameras","domain_camera_desc":"Security cameras","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_daily_desc":"Expandable tab for the coming days","weather_hourly":"Hourly forecast","weather_hourly_desc":"Expandable tab for the coming hours","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","weather_display":"Display","weather_display_desc":"What appears on the card.","weather_no_entity":"No weather.* entity detected. Add a weather integration in Home Assistant.","tab_title":"Title","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_period_indicator":"Period indicator","title_period_info":"Create an input_select named \'periode_journee\' with options: Matin, Après-midi, Soir, Nuit. The indicator will appear automatically.","title_period_entity":"Period entity","title_period_entity_desc":"Select the input_select that controls the time of day period.","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Period visuals","title_period_options_desc":"Customize the icon and color for each period.","title_add_source":"Add a source","title_remove_source":"Remove source","title_sources_empty":"No source yet. Add a mode to display interactive buttons under the title.","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_dynamic_bg":"Dynamic background","dashboard_dynamic_bg_desc":"Enables the Glass Cards animated day/night background cycle.","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Lights","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Covers","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_players":"Media players","media_dashboard_players_desc":"Enable or disable media players visible on the dashboard.","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media","dashboard_card_media_desc":"Shows media players with transport controls","tab_climate":"Climate","climate_desc":"Configure climate entities per room","climate_no_entities":"No climate entities in this room","climate_show_header":"Show header","climate_show_header_desc":"Title and counter above the card","climate_display_mode":"Display mode","climate_display_mode_popup":"Popup display mode","climate_display_mode_popup_desc":"Layout for climate entities in the room popup.","climate_display_mode_dashboard":"Display mode (dashboard)","climate_display_mode_dashboard_desc":"Layout for climate entities on the dashboard.","climate_mode_list":"List","climate_mode_normal":"Normal","climate_select_room":"Select a room","climate_room_entities":"Thermostats in this room","climate_room_entities_desc":"Order and visibility. Drag to reorder.","climate_dashboard_entities":"Detected thermostats","climate_dashboard_entities_desc":"Select which to display on the dashboard.","dashboard_card_climate":"Climate","dashboard_card_climate_desc":"Thermostats and HVAC","dashboard_card_fan":"Fans","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_per_person":"Sensors per person","presence_per_person_desc":"Map a phone, notify service and driving sensor to each person.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_sleep":"Sleep sensor","presence_sleep_desc":"input_boolean or binary_sensor that turns on when the person is sleeping.","presence_sleep_none":"No sleep sensor","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fans","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Shutters","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_compact":"Compact layout","cover_dashboard_compact_desc":"Display covers in a 2-column compact grid. When off, each cover takes the full width.","cover_dashboard_entities":"Detected covers","cover_dashboard_entities_desc":"Select which to display. All selected are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_dashboard_info":"On the dashboard, all enabled covers are shown regardless of their state (open or closed). Enable some below.","climate_dashboard_info":"On the dashboard, all enabled thermostats are shown. Enable some below.","camera_dashboard_info":"On the dashboard, all enabled cameras rotate through the carousel. Enable some below.","media_dashboard_info":"On the dashboard, only the currently playing player is shown. Others appear by swiping.","spotify_dashboard_info":"The Spotify card only appears on the dashboard if the official Spotify integration is configured.","presence_dashboard_info":"On the dashboard, every selected person is displayed with their status (home, away, driving).","fan_dashboard_info":"On the dashboard, only fans that are on in visible rooms appear. In each room, all fans are available.","rooms_list_title":"Detected rooms","rooms_list_desc":"Drag to reorder. Enable or disable for the dashboard.","rooms_dashboard_info":"Active rooms appear in the navigation bar. Their order sets their position. Tap a room to open its popup and configure its cards.","dashboard_info":"Enabled cards appear on the dashboard in your chosen order. Drag to reorder, tap to configure.","advanced_info":"Options for advanced users. Read each description carefully before acting.","advanced_settings_title":"Settings","advanced_navbar_title":"Navigation bar","advanced_navbar_desc":"Behavior and auto-sort of rooms","advanced_orphans_title":"Orphan entities","advanced_orphans_desc":"Rename or reassign entities without a room","advanced_danger_title":"Danger zone","advanced_reconfig_title":"Reconfigure Glass Cards","advanced_reconfig_desc":"Relaunch the initial wizard. All your custom settings will be lost.","advanced_reconfig_loading":"Relaunching the wizard…","room_detail_info":"Configure what appears when you open this room on the dashboard.","room_cards_title":"Room cards","room_cards_desc":"Drag to reorder, tap the chevron to configure.","room_thresholds_title":"Alert thresholds","room_no_entities":"No entity detected in this room.","unassigned_info_warn":"{count} entity(ies) without a room. Assign them below to make them appear on the dashboard.","unassigned_info_ok":"All entities are assigned. You can still rename them or change their icon here.","unassigned_list_title":"Controllable entities","unassigned_list_desc":"Tap the name to rename, the icon to change it, the room to assign one.","unassigned_filter_all":"All","unassigned_filter_orphans":"Without room","unassigned_assign_room":"Assign a room","unassigned_all_assigned":"Every entity has a room.","unassigned_orphan_count_aria":"{count} without room","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_camera_carousel":"Cameras","camera_show_header":"Show header","camera_show_header_desc":"Title and counter above the card","camera_auto_cycle":"Auto cycle","camera_auto_cycle_desc":"Automatically cycle between cameras","camera_cycle_interval":"Interval (seconds)","camera_cycle_interval_desc":"Time between each camera switch","camera_entity_order":"Detected cameras","camera_entity_order_desc":"Drag to reorder.","camera_no_cameras":"No cameras detected.","camera_list_title":"Cameras","camera_list_banner":"Drag to reorder. Disable those to hide.","dashboard_card_camera_carousel":"Cameras","dashboard_card_calendar":"Calendar","dashboard_card_calendar_desc":"Quick view of your upcoming events from all your calendars","dashboard_card_vacuum":"Vacuum","dashboard_card_vacuum_desc":"Status + control of your robot vacuum (Roborock and compatibles)","vacuum_dashboard_info":"The Vacuum card lives on the dashboard. All robot entities (battery, modes, rooms, dock) are auto-discovered.","vacuum_show_header":"Show header","vacuum_show_header_desc":"Display the robot\'s name and status in the compact bar","vacuum_entity":"Vacuum entity","vacuum_entity_desc":"Pick the vacuum entity to use when several are available. Blank = first detected.","vacuum_no_entities":"No vacuum entity detected. Add a robot integration in Home Assistant.","calendar_show_header":"Show header","calendar_show_header_desc":"Title and event counter above the card","calendar_dashboard_info":"The Calendar card only appears on the dashboard. It groups events from the calendars enabled below.","calendar_entities":"Detected calendars","calendar_entities_desc":"Disable the ones you don\'t want to see in the card.","calendar_no_entities":"No calendar detected. Add a calendar integration in Home Assistant.","dashboard_card_camera_carousel_desc":"Surveillance carousel with quick actions","tab_spotify":"Spotify","tab_calendar":"Calendar","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player","spotify_entity_desc":"media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Speakers shown in the playback popup. Empty = all.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings","tab_unassigned":"Orphan entities","unassigned_desc":"Assign or reassign your entities to a room so they appear in the corresponding popups.","unassigned_none":"All entities are assigned to a room.","unassigned_no_entities":"No entities detected.","unassigned_select_area":"Unassigned","unassigned_assigned":"Assigned","unassigned_count":"{count} unassigned entity(ies)","unassigned_no_results":"No results.","unassigned_rename":"Rename entity","unassigned_change_icon":"Change icon"}')}},ii="fr";let ai=ii;function si(e){const t=e.slice(0,2).toLowerCase(),i=t in ti?t:ii;return i!==ai&&(ai=i,!0)}function ri(){return ai}function oi(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),s=-1===i?"":e.slice(i+1),r=ti[ai]??ti[ii],o=ti[ii],n=r?.[a]?.[s]??o?.[a]?.[s];let c="string"==typeof n?n:e;if(t)for(const[l,d]of Object.entries(t))c=c.replaceAll(`{${l}}`,String(d));return c}var ni=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,li=(e,t,i,a)=>{for(var s,r=a>1?void 0:a?ci(t,i):t,o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a?s(t,i,r):s(r))||r);return a&&r&&ni(t,i,r),r};class di extends ne{constructor(){super(...arguments),this._lang=ri()}set hass(e){this._hass=e,e?.language&&si(e.language)&&(this._lang=ri())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[Dt,r`
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
    `]}render(){return this._lang,V`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${oi("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${oi("editor.open_config")}</a>
        </p>
      </div>
    `}}li([pe({attribute:!1})],di.prototype,"hass",1),li([ge()],di.prototype,"_lang",2);try{customElements.define("glass-card-editor",di)}catch{}function hi(e){try{const t=class extends di{};customElements.define(e,t)}catch{}}var pi=Object.defineProperty,gi=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&pi(t,i,r),r};class ui extends ne{constructor(){super(...arguments),this.configPreview=!1,this._lang=ri(),this._busCleanups=[],this._marqueeCleanup=null,this._cardSize="md",this._gestureTimer=0,this._gestureFired=!1,this._gestureStart=null,this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}static getStubConfig(){return{}}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){var t;super.updated(e),e.has("hass")&&this.hass?.language&&si(this.hass.language)&&(this._lang=ri()),e.has("hass")&&this.hass&&(t=this.hass)&&t.connection&&t.connection!==be&&(we||(ye&&(ye(),ye=null),be=t.connection,we=(async()=>{try{ye=await t.connection.subscribeEvents(e=>{const t=e.data??{},i=t.section;if(!i)return;if("rooms"===i&&t.area_id)return void fe.emit("room-config-changed",{areaId:t.area_id});if("entity_schedules"===i&&t.entity_id)return void fe.emit("schedule-changed",{entityId:t.entity_id});const a=ve[i];a&&fe.emit(a,void 0)},"glass_cards_config_changed")}catch(e){console.warn("[glass-cards] HA event bridge failed to subscribe",e),be=null}finally{we=null}})()))}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0),this._marqueeCleanup=function(e){if(!e)return()=>{};const t=e=>{const t=e.querySelector(".marquee-inner");if(!t)return;e.classList.remove("scrolling");const i=t.dataset.text??t.textContent?.split("   ")[0]??"";t.dataset.text=i,t.textContent=i,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.scrollWidth>e.clientWidth+1&&(t.textContent=`${i}   ${i}   `,e.classList.add("scrolling"))})})},i=new ResizeObserver(e=>{for(const i of e)t(i.target)}),a=new MutationObserver(()=>{r()}),s=new Set,r=()=>{e.querySelectorAll(".marquee").forEach(e=>{s.has(e)||(s.add(e),i.observe(e),t(e))});for(const e of s)e.isConnected||(i.unobserve(e),s.delete(e))};return a.observe(e,{childList:!0,subtree:!0}),r(),()=>{i.disconnect(),a.disconnect(),s.clear()}}(this.shadowRoot),this._ro=new ResizeObserver(e=>{const t=e[0]?.contentRect.width??this.offsetWidth;this._applyCardSize(t)}),this._ro.observe(this)}_applyCardSize(e){let t="xl";e<ke?t="xs":e<$e?t="sm":e<Se?t="md":e<Ce&&(t="lg"),t!==this._cardSize&&(this._cardSize=t,this.setAttribute("size",t))}_listen(e,t){this._busCleanups.push(fe.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0),this._marqueeCleanup?.(),this._marqueeCleanup=null,this._ro?.disconnect(),this._ro=void 0,clearTimeout(this._gestureTimer)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_bindGesture(e){return this.configPreview?{pointerdown:()=>{},pointerup:()=>{},pointermove:()=>{},pointercancel:()=>{},contextmenu:()=>{}}:{pointerdown:t=>this._onGestureDown(t,e),pointerup:t=>this._onGestureUp(t,e),pointermove:e=>this._onGestureMove(e),pointercancel:()=>this._onGestureCancel(),contextmenu:e=>e.preventDefault()}}_safeCallService(e,t,i,a){!this.configPreview&&this.hass&&this.hass.callService(e,t,i,a)}_onGestureDown(e,t){t.exclude&&e.target.closest(t.exclude)||(this._gestureStart={x:e.clientX,y:e.clientY,t:Date.now()},this._gestureFired=!1,clearTimeout(this._gestureTimer),t.onLongPress&&(this._gestureTimer=window.setTimeout(()=>{this._gestureFired=!0,mi(this,"light"),t.onLongPress()},500)))}_onGestureUp(e,t){if(clearTimeout(this._gestureTimer),this._gestureFired||!this._gestureStart)return void(this._gestureStart=null);const i=e.clientX-this._gestureStart.x,a=Date.now()-this._gestureStart.t;this._gestureStart=null,t.onSwipe&&Math.abs(i)>50&&a<500?t.onSwipe(i<0?"left":"right"):t.onTap?.()}_onGestureMove(e){if(this._gestureFired||!this._gestureStart)return;const t=Math.abs(e.clientX-this._gestureStart.x),i=Math.abs(e.clientY-this._gestureStart.y);(t>15||i>15)&&(clearTimeout(this._gestureTimer),i>t&&(this._gestureStart=null))}_onGestureCancel(){clearTimeout(this._gestureTimer),this._gestureStart=null}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function mi(e,t="light"){e.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:t}))}function _i(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}function fi(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&_i(t,i)===e)}function vi(e,t){if(!t)return!0;const i=t[e];if(!i||0===i.periods.length)return!0;const a=new Date;return i.periods.some(e=>{const t=new Date(e.start),i=new Date(e.end);if(i.setSeconds(59,999),e.recurring){const e=new Date(a.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),s=new Date(a.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999);if(e<=s)return a>=e&&a<=s;const r=new Date(a.getFullYear()+1,i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999),o=new Date(a.getFullYear()-1,t.getMonth(),t.getDate(),t.getHours(),t.getMinutes());return a>=e&&a<=r||a>=o&&a<=s}return a>=t&&a<=i})}function bi(e,t,i){const a=i?.length?i:Object.keys(t.areas??{});if(0===a.length)return[];const s=[];for(const r of a)for(const i of fi(r,t.entities,t.devices))i.entity_id.startsWith(`${e}.`)&&s.push(i.entity_id);return s}gi([pe({attribute:!1})],ui.prototype,"hass"),gi([pe({type:Boolean,attribute:"config-preview"})],ui.prototype,"configPreview"),gi([ge()],ui.prototype,"_lang");class yi{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}const wi={section:"dashboard"};function xi(e=800){let t;return{schedule(i){void 0!==t&&clearTimeout(t),t=setTimeout(()=>{t=void 0,i()},e)},cancel(){void 0!==t&&(clearTimeout(t),t=void 0)}}}var ki=Object.defineProperty,$i=Object.getOwnPropertyDescriptor,Si=(e,t,i,a)=>{for(var s,r=a>1?void 0:a?$i(t,i):t,o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a?s(t,i,r):s(r))||r);return a&&r&&ki(t,i,r),r};class Ci extends ne{constructor(){super(...arguments),this.rooms=[],this.emptyRooms=[],this.dragState={dragIdx:null,dropIdx:null,dragContext:"rooms",dragModeSrcIdx:null},this._configData={},this._initializedForArea=null,this._loading=!1,this._saveScheduler=xi(),this._lang=ri(),this._localDragIdx=null,this._localDropIdx=null}set configData(e){const t=this._configData;this._configData=e,e&&e!==t&&(this._loading=!0,this.loadFromConfig(e),this.updateComplete.then(()=>{this._loading=!1}))}get configData(){return this._configData}static{this.styles=[Dt,Pt,Tt,At,...le,r`:host { padding: 0.5rem 0; min-height: auto; }`]}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&si(this.hass.language)&&(this._lang=ri())}disconnectedCallback(){super.disconnectedCallback(),this._saveScheduler.cancel(),this._teardownDropdownListener()}render(){return this._lang,this.renderTab()}_fireToast(e){this.dispatchEvent(new CustomEvent("tab-toast",{bubbles:!0,composed:!0,detail:{success:e}}))}_scheduleSave(){this._saveScheduler.schedule(()=>this.save())}_canSave(){return!!this.backend}async save(){if(this._canSave())try{await this._performSave(),this._fireToast(!0)}catch{this._fireToast(!1)}}async _performSave(){}static{this._AUTO_SAVE_KEYS=new Set}_checkAutoSave(e){if(this._loading)return;const t=this.constructor._AUTO_SAVE_KEYS;if(0!==t.size)for(const i of e.keys())if(t.has(i))return void this._scheduleSave()}_initRoomIfNeeded(){return!!this.areaId&&(this._initializedForArea!==this.areaId&&(this._initializedForArea=this.areaId,!0))}_onLocalDragStart(e){this._localDragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),null!==this._localDragIdx&&this._localDragIdx!==e&&(this._localDropIdx=e)}_onLocalDragLeave(){this._localDropIdx=null}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_applyLocalDrop(e,t){if(null===this._localDragIdx||this._localDragIdx===e)return this._localDragIdx=null,this._localDropIdx=null,null;const i=[...t],[a]=i.splice(this._localDragIdx,1);return i.splice(e,0,a),this._localDragIdx=null,this._localDropIdx=null,i}_setupDropdownListener(){this._boundDropdownClose=e=>{const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown.open");for(const s of a)if(t.includes(s))return;this._closeAllDropdowns()},document.addEventListener("click",this._boundDropdownClose)}_teardownDropdownListener(){this._boundDropdownClose&&(document.removeEventListener("click",this._boundDropdownClose),this._boundDropdownClose=void 0)}_closeAllDropdowns(){}async _saveRoomEntities(e,t,i,a,s){if(!this.backend)return;let r=[],o=[],n={};try{const t=await this.backend.send("get_room",{area_id:e});t&&(r=t.hidden_entities??[],o=t.entity_order??[],n=t.entity_layouts??{})}catch{}const c=r.filter(e=>!t.has(e)),l=o.filter(e=>!t.has(e)),d={};for(const[h,p]of Object.entries(n))t.has(h)||(d[h]=p);s&&Object.assign(d,s),await this.backend.send("set_room",{area_id:e,hidden_entities:[...c,...i],entity_order:[...l,...a],entity_layouts:d}),fe.emit("room-config-changed",{areaId:e})}_renderFeatureRow(e){return V`
      <button
        class="feature-row"
        role="switch"
        aria-checked=${e.on?"true":"false"}
        aria-label=${e.ariaLabel??""}
        @click=${e.onToggle}
      >
        <div class="feature-icon">
          <ha-icon .icon=${e.icon}></ha-icon>
        </div>
        <div class="feature-text">
          <div class="feature-name">${oi(e.nameKey)}</div>
          ${e.descKey?V`<div class="feature-desc">${oi(e.descKey)}</div>`:W}
        </div>
        <glass-toggle presentation .checked=${e.on}></glass-toggle>
      </button>
    `}}Si([pe({attribute:!1})],Ci.prototype,"hass",2),Si([pe({attribute:!1})],Ci.prototype,"backend",2),Si([pe({attribute:!1})],Ci.prototype,"rooms",2),Si([pe({attribute:!1})],Ci.prototype,"emptyRooms",2),Si([pe({attribute:!1})],Ci.prototype,"dragState",2),Si([pe()],Ci.prototype,"areaId",2),Si([pe({attribute:!1})],Ci.prototype,"configData",1),Si([ge()],Ci.prototype,"_lang",2);var Ii=Object.defineProperty,Ei=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Ii(t,i,r),r};class zi extends Ci{constructor(){super(...arguments),this._coverShowHeader=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._coverDashboardLayouts={},this._coverEntityPresets={},this._coverRoom="",this._coverRoomEntities=[],this._coverEntityPresetInput={},this._coverPresetsExpandedEntity=null,this._dragIdx=null,this._dropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_coverShowHeader","_coverDashboardEntities","_coverDashboardOrder","_coverDashboardLayouts","_coverEntityPresets","_coverRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._coverRoom=this.areaId,this._loadRoomCovers()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;if(this._coverShowHeader=t.show_header??!0,this._coverDashboardEntities=t.dashboard_entities??[],t.dashboard_entity_layouts)this._coverDashboardLayouts=t.dashboard_entity_layouts;else{const e=t.dashboard_compact??1?"compact":"full",i={};for(const t of this._coverDashboardEntities)i[t]=e;this._coverDashboardLayouts=i}this._coverEntityPresets=t.entity_presets??{},this._initDashboardOrder()}collectSaveData(){const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));return{show_header:this._coverShowHeader,dashboard_entities:e,dashboard_entity_layouts:this._coverDashboardLayouts,entity_presets:this._coverEntityPresets}}async _performSave(){if(await this.backend.send("set_cover_config",this.collectSaveData()),this._coverRoom&&this._coverRoomEntities.length>0){const e=new Set(this._coverRoomEntities.map(e=>e.entityId)),t=this._coverRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),i=this._coverRoomEntities.map(e=>e.entityId),a={};for(const s of this._coverRoomEntities)a[s.entityId]=s.layout;await this._saveRoomEntities(this._coverRoom,e,t,i,a)}fe.emit("cover-config-changed",void 0)}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.cover_card&&this.loadFromConfig(e.cover_card)}catch{}this._coverEntityPresetInput={},await this._loadRoomCovers()}}async _loadRoomCovers(){if(!this.backend||!this._coverRoom||!this.hass)return;const e=this._coverRoom,t=fi(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._coverRoom!==e)return;const a=new Set(i?.hidden_entities??[]),s=i?.entity_order??[],r=i?.entity_layouts??{},o=[...t].sort((e,t)=>{const i=s.indexOf(e),a=s.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._coverRoomEntities=o.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,s=t?.attributes?.device_class||"shutter";return{entityId:e,name:i,visible:!a.has(e),deviceClass:s,layout:r[e]||"compact"}})}_initDashboardOrder(){const e=new Set(this._getAllCoverEntities().map(e=>e.entityId)),t=this._coverDashboardEntities.filter(t=>e.has(t)),i=[...e].filter(e=>!this._coverDashboardEntities.includes(e));this._coverDashboardOrder=[...t,...i]}getAllCoverEntities(){return this._getAllCoverEntities()}_getAllCoverEntities(){if(!this.hass)return[];const e=[];for(const[t,i]of Object.entries(this.hass.states)){if(!t.startsWith("cover."))continue;const a=i.attributes?.friendly_name||t.split(".")[1]||t;e.push({entityId:t,name:a})}return e.sort((e,t)=>e.name.localeCompare(t.name))}_toggleEntityVisibility(e){this._coverRoomEntities=this._coverRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLayout(e){this._coverRoomEntities=this._coverRoomEntities.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleDashboardEntity(e){const t=new Set(this._coverDashboardEntities);if(t.has(e)){t.delete(e),this._coverDashboardOrder=this._coverDashboardOrder.filter(t=>t!==e);const i={...this._coverDashboardLayouts};delete i[e],this._coverDashboardLayouts=i}else t.add(e),this._coverDashboardOrder.includes(e)||(this._coverDashboardOrder=[...this._coverDashboardOrder,e]),this._coverDashboardLayouts={...this._coverDashboardLayouts,[e]:"compact"};this._coverDashboardEntities=[...t]}_cycleDashboardLayout(e){const t=this._coverDashboardLayouts[e]??"compact";this._coverDashboardLayouts={...this._coverDashboardLayouts,[e]:"full"===t?"compact":"full"}}_onDropDashboardCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverDashboardOrder],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverDashboardOrder=i,this._dragIdx=null,this._dropIdx=null}_addEntityPreset(e){const t=this._coverEntityPresetInput[e]??"",i=parseInt(t,10);if(isNaN(i)||i<0||i>100)return;const a=this._coverEntityPresets[e]??[0,25,50,75,100];a.includes(i)?this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""}:(this._coverEntityPresets={...this._coverEntityPresets,[e]:[...a,i].sort((e,t)=>e-t)},this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""})}_removeEntityPreset(e,t){const i=this._coverEntityPresets[e];if(!i)return;const a=i.filter(e=>e!==t);if(0===a.length){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}else this._coverEntityPresets={...this._coverEntityPresets,[e]:a}}_resetEntityPresets(e){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}_togglePresetsExpand(e){this._coverPresetsExpandedEntity=this._coverPresetsExpandedEntity===e?null:e}_onCoverDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onCoverDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onCoverDragLeave(){this._dropIdx=null}_onCoverDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onLocalDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverRoomEntities=i,this._dragIdx=null,this._dropIdx=null}_renderDashboardEntities(){const e=this._getAllCoverEntities();if(0===e.length)return V`
        <div class="banner">
          <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
          <span>${oi("config.cover_no_covers")}</span>
        </div>
      `;const t=new Set(this._coverDashboardEntities),i=this._coverDashboardOrder.filter(t=>e.some(e=>e.entityId===t)),a=e.filter(e=>!i.includes(e.entityId)).map(e=>e.entityId),s=[...i,...a];return V`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.cover_dashboard_entities")}</span>
            <span class="section-desc">${oi("config.cover_dashboard_entities_desc")}</span>
          </div>
          ${e.length>0?V`
            <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:t.size,total:e.length})}">
              ${t.size}/${e.length}
            </span>
          `:W}
        </header>
        <div class="item-list">
          ${s.map((i,a)=>{const s=e.find(e=>e.entityId===i);if(!s)return W;const r=t.has(i),o=["item-row",r?"":"disabled",this._dragIdx===a&&"dashboard_covers"===this._dragContext?"dragging":"",this._dropIdx===a&&"dashboard_covers"===this._dragContext?"drop-target":""].filter(Boolean).join(" ");return V`
              <div class="item-card">
                <div
                  class=${o}
                  draggable="true"
                  @dragstart=${()=>this._onCoverDragStart(a,"dashboard_covers")}
                  @dragover=${e=>this._onCoverDragOver(a,e)}
                  @dragleave=${()=>this._onCoverDragLeave()}
                  @drop=${e=>this._onDropDashboardCover(a,e)}
                  @dragend=${()=>this._onCoverDragEnd()}
                >
                  <glass-drag-handle></glass-drag-handle>
                  <div class="item-info">
                    <span class="item-name">${s.name}</span>
                    <span class="item-meta">${s.entityId}</span>
                  </div>
                  ${r?V`
                    <button
                      class="layout-btn"
                      @click=${()=>this._cycleDashboardLayout(i)}
                      aria-label="${oi("config.light_change_layout_aria")}"
                      title="${oi("compact"===(this._coverDashboardLayouts[i]??"compact")?"config.light_layout_compact":"config.light_layout_full")}"
                    >
                      ${oi("compact"===(this._coverDashboardLayouts[i]??"compact")?"config.light_layout_compact":"config.light_layout_full")}
                    </button>
                  `:W}
                  <glass-toggle
                    .checked=${r}
                    aria-label="${oi(r?"common.hide":"common.show")} ${s.name}"
                    @glass-toggle-change=${()=>this._toggleDashboardEntity(i)}
                  ></glass-toggle>
                </div>
              </div>
            `})}
        </div>
      </section>
    `}renderTab(){return this._lang,this.hass?V`
      <div class="tab-panel cover-tab" id="panel-cover">
        <glass-cover-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-cover-card>
        ${this._coverRoom?W:V`
          <div class="cfg-info">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            <span>${oi("config.cover_dashboard_info")}</span>
          </div>
        `}

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.cover_show_header",descKey:"config.cover_show_header_desc",on:this._coverShowHeader,onToggle:()=>{this._coverShowHeader=!this._coverShowHeader}})}
          </div>
        </section>

        ${this._coverRoom?W:this._renderDashboardEntities()}
        ${this._coverRoom?V`
          ${this._coverRoomEntities.length>0?V`
            <section class="cfg-section">
              <header class="cfg-section-head">
                <span class="cfg-section-num">2</span>
                <div class="cfg-section-text">
                  <span class="section-label">${oi("config.cover_list_title")}</span>
                  <span class="section-desc">${oi("config.cover_list_banner")}</span>
                </div>
                <span class="cfg-section-count">${this._coverRoomEntities.length}</span>
              </header>
              <div class="item-list">
              ${this._coverRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"covers"===this._dragContext,a=this._dropIdx===t&&"covers"===this._dragContext,s=this._coverPresetsExpandedEntity===e.entityId,r=!!this._coverEntityPresets[e.entityId],o=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),n=["item-card",s?"expanded":""].filter(Boolean).join(" ");return V`
                  <div class=${n}>
                    <div
                      class=${o}
                      draggable="true"
                      @dragstart=${()=>this._onCoverDragStart(t,"covers")}
                      @dragover=${e=>this._onCoverDragOver(t,e)}
                      @dragleave=${()=>this._onCoverDragLeave()}
                      @drop=${e=>this._onLocalDrop(t,e)}
                      @dragend=${()=>this._onCoverDragEnd()}
                    >
                      <glass-drag-handle></glass-drag-handle>
                      <div class="item-info">
                        <span class="item-name">${e.name}</span>
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                      <glass-icon-button
                        class="presets-btn"
                        size="xs"
                        active-color="purple"
                        ?active=${r}
                        .icon=${"mdi:tune-vertical"}
                        aria-label="${oi("config.cover_entity_presets")}"
                        aria-expanded=${s?"true":"false"}
                        title="${oi("config.cover_entity_presets")}"
                        @click=${()=>this._togglePresetsExpand(e.entityId)}
                      ></glass-icon-button>
                      <button
                        class="layout-btn"
                        @click=${()=>this._cycleLayout(e.entityId)}
                        aria-label="${oi("config.light_change_layout_aria")}"
                        title="${oi("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
                      >
                        ${oi("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
                      </button>
                      <glass-toggle
                        .checked=${e.visible}
                        aria-label="${e.visible?oi("common.hide"):oi("common.show")} ${e.name}"
                        @glass-toggle-change=${()=>this._toggleEntityVisibility(e.entityId)}
                      ></glass-toggle>
                    </div>
                    <div class="item-fold-sep ${s?"visible":""}"></div>
                    <div class="entity-presets-fold ${s?"open":""}">
                      <div class="entity-presets-fold-inner">
                        <div class="entity-presets-content">
                          <div class="entity-presets-label">${oi(r?"config.cover_entity_presets":"config.cover_presets")}</div>
                          <div class="preset-chips">
                            ${(this._coverEntityPresets[e.entityId]??[0,25,50,75,100]).map(t=>V`
                                <span class="preset-chip small ${r?"custom":""}">
                                  <ha-icon .icon=${t>=50?"mdi:window-shutter-open":"mdi:window-shutter"}></ha-icon>
                                  ${0===t?oi("cover.preset_closed"):100===t?oi("cover.preset_open"):`${t}%`}
                                  ${r?V`
                                    <button
                                      class="preset-chip-remove"
                                      @click=${()=>this._removeEntityPreset(e.entityId,t)}
                                      aria-label="${oi("common.delete")} ${t}%"
                                    >
                                      <ha-icon .icon=${"mdi:close"}></ha-icon>
                                    </button>
                                  `:W}
                                </span>
                              `)}
                          </div>
                          <div class="preset-add">
                            <input
                              class="preset-input small"
                              type="number"
                              min="0"
                              max="100"
                              step="5"
                              .value=${this._coverEntityPresetInput[e.entityId]??""}
                              @input=${t=>{this._coverEntityPresetInput={...this._coverEntityPresetInput,[e.entityId]:t.target.value}}}
                              @keydown=${t=>{"Enter"===t.key&&this._addEntityPreset(e.entityId)}}
                              placeholder="%"
                            />
                            <button
                              class="preset-add-btn small"
                              ?disabled=${!this._coverEntityPresetInput[e.entityId]}
                              @click=${()=>this._addEntityPreset(e.entityId)}
                              aria-label="${oi("config.cover_preset_add")}"
                            >
                              <ha-icon .icon=${"mdi:plus"}></ha-icon>
                              ${oi("config.cover_preset_add")}
                            </button>
                            ${r?V`
                              <button
                                class="preset-reset-btn"
                                @click=${()=>this._resetEntityPresets(e.entityId)}
                                aria-label="${oi("common.reset")}"
                              >
                                <ha-icon .icon=${"mdi:restore"}></ha-icon>
                              </button>
                            `:W}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `})}
            </div>
            </section>
          `:V`
            <section class="cfg-section">
              <header class="cfg-section-head">
                <span class="cfg-section-num">2</span>
                <div class="cfg-section-text">
                  <span class="section-label">${oi("config.cover_list_title")}</span>
                </div>
              </header>
              <glass-empty-state variant="inline" .icon=${"mdi:blinds-open"} .title=${oi("config.cover_no_covers")}></glass-empty-state>
            </section>
          `}
        `:W}

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `:V``}}Ei([ge()],zi.prototype,"_coverShowHeader"),Ei([ge()],zi.prototype,"_coverDashboardEntities"),Ei([ge()],zi.prototype,"_coverDashboardOrder"),Ei([ge()],zi.prototype,"_coverDashboardLayouts"),Ei([ge()],zi.prototype,"_coverEntityPresets"),Ei([ge()],zi.prototype,"_coverRoom"),Ei([ge()],zi.prototype,"_coverRoomEntities"),Ei([ge()],zi.prototype,"_coverEntityPresetInput"),Ei([ge()],zi.prototype,"_coverPresetsExpandedEntity"),Ei([ge()],zi.prototype,"_dragIdx"),Ei([ge()],zi.prototype,"_dropIdx"),Ei([ge()],zi.prototype,"_dragContext");try{customElements.define("config-tab-cover",zi)}catch{}var Di=Object.defineProperty,Pi=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Di(t,i,r),r};class Ti extends Ci{constructor(){super(...arguments),this._lights=[],this._lightRoom="",this._lightShowHeader=!0,this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._suppressAutoSave=!1,this._mounted=!1}static{this._AUTO_SAVE_KEYS=new Set(["_lightShowHeader","_lights"])}connectedCallback(){super.connectedCallback(),this._mounted=!0}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._lightRoom=this.areaId,this._loadRoomLights()),this._suppressAutoSave?this._suppressAutoSave=!1:this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._lightShowHeader=t.show_header??!0}collectSaveData(){return{show_header:this._lightShowHeader}}async _performSave(){if(await this.backend.send("set_light_config",{show_header:this._lightShowHeader}),this._lightRoom&&this._lights.length>0){const e=new Set(this._lights.map(e=>e.entityId)),t=this._lights.filter(e=>!e.visible).map(e=>e.entityId),i=this._lights.map(e=>e.entityId),a={};for(const s of this._lights)"full"===s.layout&&(a[s.entityId]=s.layout);await this._saveRoomEntities(this._lightRoom,e,t,i,a)}fe.emit("light-config-changed",void 0)}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.light_card&&this.loadFromConfig(e.light_card)}catch{}this._lightRoom&&await this._loadRoomLights()}}initRoom(){!this._lightRoom&&this.rooms.length>0&&(this._lightRoom=this.rooms[0].areaId,this._loadRoomLights())}async _loadRoomLights(){if(this._suppressAutoSave=!0,!this.hass||!this._lightRoom)return void(this._lights=[]);const e=this._lightRoom,t=fi(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light."));let i=new Set,a=[],s={};try{if(!this.backend)throw new Error("No backend");const t=await this.backend.send("get_room",{area_id:e});if(this._lightRoom!==e)return;t&&(i=new Set(t.hidden_entities??[]),a=t.entity_order??[],s=t.entity_layouts??{})}catch{}const r=this.hass,o=new Map;a.forEach((e,t)=>o.set(e,t));const n=t.map(e=>{const t=r.states[e.entity_id],a="on"===t?.state,o=t?.attributes.brightness,n=a&&void 0!==o?Math.round(o/255*100):0;return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:a,brightnessPct:n,layout:s[e.entity_id]||"compact",visible:!i.has(e.entity_id)}});n.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=o.get(e.entityId),a=o.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._lights=n;try{if(this.backend){const t=await this.backend.send("get_schedules");if(this._lightRoom!==e)return;this._schedulesLoaded=t??{},this._scheduleEdits=new Map;for(const e of n){const t=this._schedulesLoaded[e.entityId];this._scheduleEdits.set(e.entityId,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}_toggleLightVisible(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLightLayout(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleScheduleExpand(e){if(this._scheduleExpandedEntity=this._scheduleExpandedEntity===e?null:e,!this._scheduleEdits.has(e)){const t=this._schedulesLoaded[e];this._scheduleEdits.set(e,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}this.requestUpdate()}_addSchedulePeriod(e){const t=this._scheduleEdits.get(e)??[];t.push({start:"",end:"",recurring:!1}),this._scheduleEdits.set(e,[...t]),this.requestUpdate()}_removeSchedulePeriod(e,t){const i=this._scheduleEdits.get(e)??[];i.splice(t,1),this._scheduleEdits.set(e,[...i]),this.requestUpdate()}_updateSchedulePeriod(e,t,i,a){const s=this._scheduleEdits.get(e)??[];s[t]&&(s[t]={...s[t],[i]:a},this._scheduleEdits.set(e,[...s]),this.requestUpdate())}_toggleScheduleRecurring(e,t){const i=this._scheduleEdits.get(e)??[];i[t]&&(i[t]={...i[t],recurring:!i[t].recurring},this._scheduleEdits.set(e,[...i]),this.requestUpdate())}async _saveSchedule(e){if(!this.backend)return;const t=(this._scheduleEdits.get(e)??[]).filter(e=>e.start&&e.end);try{if(await this.backend.send("set_schedule",{entity_id:e,periods:t}),!this._mounted)return;this._fireToast(!0),fe.emit("schedule-changed",{entityId:e})}catch{if(!this._mounted)return;this._fireToast(!1)}}_formatDateTimeShort(e){if(!e)return"";const[t,i]=e.split("T");if(!t)return e;const[a,s,r]=t.split("-");return`${r}/${s}/${a} ${i??"00:00"}`}_formatPeriodDisplay(e){if(!e.start&&!e.end)return"";const t=this._formatDateTimeShort(e.start),i=this._formatDateTimeShort(e.end);return t&&i?`${t}  →  ${i}`:t?`${t}  → …`:`…  →  ${i}`}_parseDateTimeValue(e){if(!e)return null;const[t,i]=e.split("T");if(!t)return null;const a=t.split("-").map(Number);if(a.length<3||a.some(isNaN))return null;const[s,r,o]=a,[n,c]=(i??"00:00").split(":");return{year:s,month:r-1,day:o,hour:n??"00",minute:c??"00"}}_openRangePicker(e,t){this._pickerTarget={entityId:e,periodIdx:t};const i=(this._scheduleEdits.get(e)??[])[t],a=i?this._parseDateTimeValue(i.start):null,s=i?this._parseDateTimeValue(i.end):null,r=new Date;a?(this._pickerStartDay=a.day,this._pickerStartMonth=a.month,this._pickerStartYear=a.year,this._pickerStartHour=a.hour,this._pickerStartMinute=a.minute,this._pickerYear=a.year,this._pickerMonth=a.month):(this._pickerStartDay=null,this._pickerStartMonth=r.getMonth(),this._pickerStartYear=r.getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerYear=r.getFullYear(),this._pickerMonth=r.getMonth()),s?(this._pickerEndDay=s.day,this._pickerEndMonth=s.month,this._pickerEndYear=s.year,this._pickerEndHour=s.hour,this._pickerEndMinute=s.minute):(this._pickerEndDay=null,this._pickerEndMonth=r.getMonth(),this._pickerEndYear=r.getFullYear(),this._pickerEndHour="23",this._pickerEndMinute="59"),this._pickerPhase=a?s?"start":"end":"start",this._pickerOpen=!0}_closePicker(){this._pickerOpen=!1,this._pickerTarget=null}_pickerPrevMonth(){0===this._pickerMonth?(this._pickerMonth=11,this._pickerYear--):this._pickerMonth--}_pickerNextMonth(){11===this._pickerMonth?(this._pickerMonth=0,this._pickerYear++):this._pickerMonth++}_pickerSelectDay(e,t){if(!t)if("start"===this._pickerPhase){if(this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerPhase="end",null!==this._pickerEndDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,e).getTime();new Date(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay).getTime()<t&&(this._pickerEndDay=null)}}else{if(null!==this._pickerStartDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay).getTime();if(new Date(this._pickerYear,this._pickerMonth,e).getTime()<t)return this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerEndDay=null,void(this._pickerPhase="start")}this._pickerEndDay=e,this._pickerEndMonth=this._pickerMonth,this._pickerEndYear=this._pickerYear}}_pickerSetTime(e,t){const i=t.target.value.replace(/\D/g,"").slice(0,2),a=e.includes("Hour"),s=Math.min(a?23:59,Math.max(0,parseInt(i,10)||0)),r=String(s).padStart(2,"0");t.target.value=r,"startHour"===e?this._pickerStartHour=r:"startMinute"===e?this._pickerStartMinute=r:"endHour"===e?this._pickerEndHour=r:this._pickerEndMinute=r,this.requestUpdate()}_pickerConfirm(){if(!this._pickerTarget||null===this._pickerStartDay||null===this._pickerEndDay)return;const{entityId:e,periodIdx:t}=this._pickerTarget,i=String(this._pickerStartMonth+1).padStart(2,"0"),a=String(this._pickerStartDay).padStart(2,"0"),s=String(this._pickerEndMonth+1).padStart(2,"0"),r=String(this._pickerEndDay).padStart(2,"0"),o=`${this._pickerStartYear}-${i}-${a}T${this._pickerStartHour}:${this._pickerStartMinute}`,n=`${this._pickerEndYear}-${s}-${r}T${this._pickerEndHour}:${this._pickerEndMinute}`;this._updateSchedulePeriod(e,t,"start",o),this._updateSchedulePeriod(e,t,"end",n),this._closePicker()}_toAbsDay(e,t,i){return new Date(e,t,i).getTime()}_getMonthDays(){const e=this._pickerYear,t=this._pickerMonth,i=(new Date(e,t,1).getDay()+6)%7,a=new Date(e,t+1,0).getDate(),s=new Date(e,t,0).getDate(),r=new Date,o=r.getFullYear()===e&&r.getMonth()===t,n=r.getDate(),c=null!==this._pickerStartDay?this._toAbsDay(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay):null,l=null!==this._pickerEndDay?this._toAbsDay(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay):null,d=[],h=(e,t,i,a)=>{const s=this._toAbsDay(i,a,e);return{day:e,otherMonth:t,today:!t&&o&&e===n,rangeStart:null!==c&&s===c,rangeEnd:null!==l&&s===l,inRange:null!==c&&null!==l&&s>c&&s<l}},p=0===t?11:t-1,g=0===t?e-1:e;for(let f=i-1;f>=0;f--)d.push(h(s-f,!0,g,p));for(let f=1;f<=a;f++)d.push(h(f,!1,e,t));const u=11===t?0:t+1,m=11===t?e+1:e,_=42-d.length;for(let f=1;f<=_;f++)d.push(h(f,!0,m,u));return d}_getMonthLabel(){const e=new Date(this._pickerYear,this._pickerMonth,1),t="fr"===this._lang?"fr-FR":"en-US",i=e.toLocaleDateString(t,{month:"long"});return`${i.charAt(0).toUpperCase()}${i.slice(1)} ${this._pickerYear}`}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_onLocalDragStart(e){this._dragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDropLight(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return void this._onLocalDragEnd();const i=[...this._lights],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._lights=i,this._onLocalDragEnd()}_renderScheduleContent(e){const t=this._scheduleEdits.get(e)??[];return V`
      <div class="schedule-body">
        <div class="schedule-header">${oi("config.light_schedule_title")}</div>
        ${t.map((t,i)=>V`
          <div class="schedule-period">
            <div class="schedule-row">
              <button
                class="datetime-display ${t.start||t.end?"":"empty"}"
                @click=${()=>this._openRangePicker(e,i)}
              >
                ${t.start||t.end?this._formatPeriodDisplay(t):oi("config.light_schedule_no_date")}
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
                <span class="check-label">${oi("config.light_schedule_recurring")}</span>
              </button>
              <glass-icon-button
                class="schedule-delete"
                size="xs"
                active
                active-color="alert"
                .icon=${"mdi:delete-outline"}
                aria-label="${oi("config.light_schedule_delete_aria")}"
                @click=${()=>this._removeSchedulePeriod(e,i)}
              ></glass-icon-button>
            </div>
          </div>
        `)}
        <glass-button class="schedule-add" variant="secondary" size="sm" .icon=${"mdi:plus"} @click=${()=>this._addSchedulePeriod(e)}>
          ${oi("config.light_schedule_add")}
        </glass-button>
        <glass-button class="schedule-save" variant="primary" size="sm" @click=${()=>this._saveSchedule(e)}>
          ${oi("common.save")}
        </glass-button>
      </div>
    `}_renderLightRow(e,t){const i=this._dragIdx===t,a=this._dropIdx===t,s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),r=this._scheduleEdits.get(e.entityId),o=r?r.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0,n=this._scheduleExpandedEntity===e.entityId,c=["item-card",n?"expanded":""].filter(Boolean).join(" ");return V`
      <div class=${c}>
        <div
          class=${s}
          draggable="true"
          @dragstart=${()=>this._onLocalDragStart(t)}
          @dragover=${e=>this._onLocalDragOver(t,e)}
          @dragleave=${()=>this._onLocalDragLeave()}
          @drop=${e=>this._onDropLight(t,e)}
          @dragend=${()=>this._onLocalDragEnd()}
        >
          <glass-drag-handle></glass-drag-handle>
          <div class="item-info">
            <span class="item-name">${e.name}</span>
            <span class="item-meta">${e.entityId}</span>
          </div>
          <div class="light-state">
            <span class="light-dot ${e.isOn?"on":""}"></span>
          </div>
          <glass-icon-button
            class="schedule-btn"
            size="xs"
            ?active=${o}
            .icon=${"mdi:calendar-clock"}
            aria-label="${oi("config.light_schedule_aria",{name:e.name})}"
            aria-expanded=${n?"true":"false"}
            title="${oi("config.light_schedule_title")}"
            @click=${()=>this._toggleScheduleExpand(e.entityId)}
          ></glass-icon-button>
          <button
            class="layout-btn"
            @click=${()=>this._cycleLightLayout(e.entityId)}
            aria-label="${oi("config.light_change_layout_aria")}"
            title="${oi("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
          >
            ${oi("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
          </button>
          <glass-toggle
            .checked=${e.visible}
            aria-label="${e.visible?oi("common.hide"):oi("common.show")} ${e.name}"
            @glass-toggle-change=${()=>this._toggleLightVisible(e.entityId)}
          ></glass-toggle>
        </div>
        <div class="fold-sep ${n?"visible":""}"></div>
        <div class="schedule-fold ${n?"open":""}">
          <div class="schedule-fold-inner">
            ${this._renderScheduleContent(e.entityId)}
          </div>
        </div>
      </div>
    `}_renderDateTimePicker(){if(!this._pickerOpen)return W;const e=this._getMonthDays(),t=this._getDayLabels(),i=null!==this._pickerStartDay&&null!==this._pickerEndDay;return V`
      <div class="picker-overlay"
        @click=${e=>{e.target===e.currentTarget&&this._closePicker()}}
        @keydown=${e=>{"Escape"===e.key&&this._closePicker()}}
      >
        <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${oi("config.light_schedule_title")}">
          <div class="picker-phase">
            <button
              class="picker-phase-btn ${"start"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="start"}}
            >${oi("config.light_schedule_start")}</button>
            <button
              class="picker-phase-btn ${"end"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="end"}}
            >${oi("config.light_schedule_end")}</button>
          </div>
          <div class="picker-header">
            <button class="picker-nav" @click=${()=>this._pickerPrevMonth()} aria-label="${oi("config.light_schedule_prev_month_aria")}">
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <span class="picker-month">${this._getMonthLabel()}</span>
            <button class="picker-nav" @click=${()=>this._pickerNextMonth()} aria-label="${oi("config.light_schedule_next_month_aria")}">
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
              <span class="picker-time-label">${oi("config.light_schedule_start")}</span>
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
              <span class="picker-time-label">${oi("config.light_schedule_end")}</span>
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
          <glass-button
            class="picker-confirm"
            variant="primary"
            size="sm"
            ?disabled=${!i}
            @click=${()=>this._pickerConfirm()}
          >
            ${oi("config.light_schedule_confirm")}
          </glass-button>
        </div>
      </div>
    `}renderTab(){this._lang;const e=!!this._lightRoom,t=this._lights.length>0;return V`
      <div class="tab-panel light-tab" id="panel-light">
        <glass-light-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-light-card>
        <div class="cfg-info">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${oi("config.light_dashboard_vs_room")}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.light_show_header",descKey:"config.light_show_header_desc",on:this._lightShowHeader,onToggle:()=>{this._lightShowHeader=!this._lightShowHeader}})}
          </div>
        </section>

        ${e?V`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">2</span>
              <div class="cfg-section-text">
                <span class="section-label">${oi("config.light_list_title")}</span>
                <span class="section-desc">${oi("config.light_list_banner")}</span>
              </div>
              ${t?V`<span class="cfg-section-count">${this._lights.length}</span>`:W}
            </header>

            ${t?V`
              <div class="item-list">
                ${this._lights.map((e,t)=>this._renderLightRow(e,t))}
              </div>
              <div class="section-desc schedule-hint">
                <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
                ${oi("config.light_schedule_hint")}
              </div>
            `:V`
              <glass-empty-state variant="inline" .icon=${"mdi:lightbulb-off-outline"} .title=${oi("config.light_no_lights")}></glass-empty-state>
            `}
          </section>
        `:W}

        ${e?V`
          <div class="save-bar">
            <glass-button variant="ghost" @click=${()=>this._loadRoomLights()}>${oi("common.reset")}</glass-button>
          </div>
        `:W}
      </div>

      ${this._renderDateTimePicker()}
    `}}Pi([ge()],Ti.prototype,"_lights"),Pi([ge()],Ti.prototype,"_lightRoom"),Pi([ge()],Ti.prototype,"_lightShowHeader"),Pi([ge()],Ti.prototype,"_scheduleExpandedEntity"),Pi([ge()],Ti.prototype,"_pickerOpen"),Pi([ge()],Ti.prototype,"_pickerYear"),Pi([ge()],Ti.prototype,"_pickerMonth"),Pi([ge()],Ti.prototype,"_pickerStartDay"),Pi([ge()],Ti.prototype,"_pickerStartMonth"),Pi([ge()],Ti.prototype,"_pickerStartYear"),Pi([ge()],Ti.prototype,"_pickerEndDay"),Pi([ge()],Ti.prototype,"_pickerEndMonth"),Pi([ge()],Ti.prototype,"_pickerEndYear"),Pi([ge()],Ti.prototype,"_pickerStartHour"),Pi([ge()],Ti.prototype,"_pickerStartMinute"),Pi([ge()],Ti.prototype,"_pickerEndHour"),Pi([ge()],Ti.prototype,"_pickerEndMinute"),Pi([ge()],Ti.prototype,"_pickerPhase"),Pi([ge()],Ti.prototype,"_dragIdx"),Pi([ge()],Ti.prototype,"_dropIdx");try{customElements.define("config-tab-light",Ti)}catch{}var Li=Object.defineProperty,Ai=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Li(t,i,r),r};class Mi extends Ci{constructor(){super(...arguments),this._mediaShowHeader=!0,this._mediaExtraEntities={},this._mediaHiddenEntities=[],this._mediaRoom="",this._mediaRoomNativePlayers=[],this._mediaDashboardPlayers=[],this._dashboardLoaded=!1}static{this._AUTO_SAVE_KEYS=new Set(["_mediaShowHeader","_mediaExtraEntities","_mediaHiddenEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._mediaRoom=this.areaId,this._loadRoomMediaPlayers()),!this.areaId&&!this._dashboardLoaded&&this.hass&&this.backend&&(this._dashboardLoaded=!0,this._loadDashboardMediaPlayers()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._mediaShowHeader=t.show_header??!0,this._mediaExtraEntities=t.extra_entities??{},this._mediaHiddenEntities=t.hidden_entities??[]}collectSaveData(){return{show_header:this._mediaShowHeader,extra_entities:this._mediaExtraEntities,hidden_entities:this._mediaHiddenEntities}}async _performSave(){const e=this.collectSaveData();!this.areaId&&this._mediaDashboardPlayers.length>0&&(e.hidden_entities=this._mediaDashboardPlayers.filter(e=>!e.visible).map(e=>e.entityId)),await this.backend.send("set_media_config",e),fe.emit("media-config-changed",void 0)}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.media_card&&this.loadFromConfig(e.media_card)}catch{}this.areaId||(this._dashboardLoaded=!1,this._loadDashboardMediaPlayers())}}_loadDashboardMediaPlayers(){if(!this.hass)return;const e=new Set(this._mediaHiddenEntities),t=Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort();this._mediaDashboardPlayers=t.map(t=>{const i=this.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t;return{entityId:t,name:a,visible:!e.has(t)}})}_toggleMediaVisible(e){this._mediaDashboardPlayers=this._mediaDashboardPlayers.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),this._mediaHiddenEntities=this._mediaDashboardPlayers.filter(e=>!e.visible).map(e=>e.entityId)}_addMediaExtraEntity(e){const t=this._mediaRoom;if(!t)return;const i=this._mediaExtraEntities[t]??[];i.includes(e)||(this._mediaExtraEntities={...this._mediaExtraEntities,[t]:[...i,e]})}_removeMediaExtraEntity(e){const t=this._mediaRoom;if(!t)return;const i=this._mediaExtraEntities[t]??[];this._mediaExtraEntities={...this._mediaExtraEntities,[t]:i.filter(t=>t!==e)}}_loadRoomMediaPlayers(){if(!this.hass||!this._mediaRoom)return void(this._mediaRoomNativePlayers=[]);const e=fi(this._mediaRoom,this.hass.entities,this.hass.devices);this._mediaRoomNativePlayers=e.filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id)}initRoom(){!this._mediaRoom&&this.rooms.length>0&&(this._mediaRoom=this.rooms[0].areaId,this._loadRoomMediaPlayers())}renderTab(){if(this._lang,!this.hass)return V``;const e=this._mediaRoom,t=e?this._mediaExtraEntities[e]??[]:[],i=Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort(),a=new Set([...this._mediaRoomNativePlayers,...t]),s=i.filter(e=>!a.has(e)),r=!this.areaId,o=this._mediaDashboardPlayers,n=o.filter(e=>e.visible).length,c=this._mediaRoomNativePlayers;return V`
      <div class="tab-panel media-tab" id="panel-media">
        <glass-media-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-media-card>
        ${r?V`
          <div class="cfg-info">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            <span>${oi("config.media_dashboard_info")}</span>
          </div>
        `:W}

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.media_show_header",descKey:"config.media_show_header_desc",on:this._mediaShowHeader,onToggle:()=>{this._mediaShowHeader=!this._mediaShowHeader}})}
          </div>
        </section>

        ${r?V`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">2</span>
              <div class="cfg-section-text">
                <span class="section-label">${oi("config.media_dashboard_players")}</span>
                <span class="section-desc">${oi("config.media_dashboard_players_desc")}</span>
              </div>
              ${o.length>0?V`
                <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:n,total:o.length})}">
                  ${n}/${o.length}
                </span>
              `:W}
            </header>

            ${0===o.length?V`
              <glass-empty-state variant="inline" .icon=${"mdi:speaker-off"} .title=${oi("media.no_players")}></glass-empty-state>
            `:V`
              <div class="item-list">
                ${o.map(e=>{const t=this.hass?.states[e.entityId],i="playing"===t?.state;return V`
                    <div class="item-card">
                      <div class="item-row ${e.visible?"":"disabled"}">
                        <div class="item-info">
                          <span class="item-name">${e.name}</span>
                          <span class="item-meta">${e.entityId}${i?` · ${oi("media.now_playing")}`:""}</span>
                        </div>
                        <glass-toggle
                          .checked=${e.visible}
                          aria-label="${e.visible?oi("common.hide"):oi("common.show")} ${e.name}"
                          @glass-toggle-change=${()=>this._toggleMediaVisible(e.entityId)}
                        ></glass-toggle>
                      </div>
                    </div>
                  `})}
              </div>
            `}
          </section>
        `:e?V`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">2</span>
              <div class="cfg-section-text">
                <span class="section-label">${oi("config.media_native_players")}</span>
                <span class="section-desc">${oi("config.media_native_players_desc")}</span>
              </div>
              ${c.length>0?V`<span class="cfg-section-count">${c.length}</span>`:W}
            </header>

            ${0===c.length?V`
              <glass-empty-state variant="inline" .icon=${"mdi:speaker-off"} .title=${oi("media.no_players")}></glass-empty-state>
            `:V`
              <div class="item-list">
                ${c.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return V`
                    <div class="item-card">
                      <div class="item-row">
                        <div class="item-info">
                          <span class="item-name">${i}</span>
                          <span class="item-meta">${e}</span>
                        </div>
                        <div class="dot ${"playing"===t?.state?"playing":""}"></div>
                      </div>
                    </div>
                  `})}
              </div>
            `}
          </section>

          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">3</span>
              <div class="cfg-section-text">
                <span class="section-label">${oi("config.media_extra_entities")}</span>
                <span class="section-desc">${oi("config.media_extra_entities_desc")}</span>
              </div>
              ${t.length>0?V`<span class="cfg-section-count">${t.length}</span>`:W}
            </header>

            ${0===t.length?V`
              <glass-empty-state variant="inline" .icon=${"mdi:speaker-multiple"} .title=${oi("config.media_no_extra")}></glass-empty-state>
            `:V`
              <div class="item-list">
                ${t.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return V`
                    <div class="item-card">
                      <div class="item-row">
                        <div class="item-info">
                          <span class="item-name">${i}</span>
                          <span class="item-meta">${e}</span>
                        </div>
                        <glass-icon-button
                          size="xs"
                          .icon=${"mdi:close"}
                          aria-label="${oi("common.hide")} ${i}"
                          @click=${()=>this._removeMediaExtraEntity(e)}
                        ></glass-icon-button>
                      </div>
                    </div>
                  `})}
              </div>
            `}

            <div class="cfg-add-wrap">
              <glass-dropdown
                class="cfg-add-btn"
                .items=${s.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{value:e,label:i,icon:"mdi:speaker"}})}
                .value=${""}
                .label=${oi("config.media_add_extra")}
                icon="mdi:plus"
                searchable
                search-placeholder=${oi("config.search_entity")}
                empty-text=${oi("config.unassigned_no_results")}
                @glass-dropdown-change=${e=>{e.detail.value&&this._addMediaExtraEntity(e.detail.value)}}
              ></glass-dropdown>
            </div>
          </section>
        `:W}

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}}Ai([ge()],Mi.prototype,"_mediaShowHeader"),Ai([ge()],Mi.prototype,"_mediaExtraEntities"),Ai([ge()],Mi.prototype,"_mediaHiddenEntities"),Ai([ge()],Mi.prototype,"_mediaRoom"),Ai([ge()],Mi.prototype,"_mediaRoomNativePlayers"),Ai([ge()],Mi.prototype,"_mediaDashboardPlayers");try{customElements.define("config-tab-media",Mi)}catch{}var Ri=Object.defineProperty,Oi=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Ri(t,i,r),r};class ji extends Ci{constructor(){super(...arguments),this._fanShowHeader=!0,this._fanRoom="",this._fanRoomEntities=[],this._dragIdx=null,this._dropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_fanShowHeader","_fanRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._fanRoom=this.areaId,this._loadRoomFans()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._fanShowHeader=t.show_header??!0}collectSaveData(){return{show_header:this._fanShowHeader}}async _performSave(){if(await this.backend.send("set_fan_config",this.collectSaveData()),this._fanRoom&&this._fanRoomEntities.length>0){const e=new Set(this._fanRoomEntities.map(e=>e.entityId)),t=this._fanRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),i=this._fanRoomEntities.map(e=>e.entityId),a={};for(const s of this._fanRoomEntities)a[s.entityId]=s.layout;await this._saveRoomEntities(this._fanRoom,e,t,i,a)}fe.emit("fan-config-changed",void 0)}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.fan_card&&this.loadFromConfig(e.fan_card)}catch{}await this._loadRoomFans()}}async _loadRoomFans(){if(!this.backend||!this._fanRoom||!this.hass)return;const e=this._fanRoom,t=fi(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("fan.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._fanRoom!==e)return;const a=new Set(i?.hidden_entities??[]),s=i?.entity_order??[],r=i?.entity_layouts??{},o=[...t].sort((e,t)=>{const i=s.indexOf(e),a=s.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._fanRoomEntities=o.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i,visible:!a.has(e),layout:r[e]||"compact"}})}_toggleEntityVisibility(e){this._fanRoomEntities=this._fanRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLayout(e){this._fanRoomEntities=this._fanRoomEntities.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_onLocalDragStart(e){this._dragIdx=e,this._dragContext="fans"}_onLocalDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onLocalDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"fans"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._fanRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._fanRoomEntities=i,this._dragIdx=null,this._dropIdx=null}renderTab(){if(this._lang,!this.hass)return V``;const e=!!this._fanRoom,t=this._fanRoomEntities;return V`
      <div class="tab-panel fan-tab" id="panel-fan">
        <glass-fan-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-fan-card>
        <div class="cfg-info">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${oi("config.fan_dashboard_info")}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.fan_show_header",descKey:"config.fan_show_header_desc",on:this._fanShowHeader,onToggle:()=>{this._fanShowHeader=!this._fanShowHeader}})}
          </div>
        </section>

        ${e?V`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">2</span>
              <div class="cfg-section-text">
                <span class="section-label">${oi("config.fan_list_title")}</span>
                <span class="section-desc">${oi("config.fan_list_banner")}</span>
              </div>
              ${t.length>0?V`<span class="cfg-section-count">${t.length}</span>`:W}
            </header>

            ${0===t.length?V`
              <glass-empty-state variant="inline" .icon=${"mdi:fan-off"} .title=${oi("config.fan_no_fans")}></glass-empty-state>
            `:V`
              <div class="item-list">
                ${t.map((e,t)=>{const i=this._dragIdx===t&&"fans"===this._dragContext,a=this._dropIdx===t&&"fans"===this._dragContext,s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return V`
                    <div class="item-card">
                      <div
                        class=${s}
                        draggable="true"
                        @dragstart=${()=>this._onLocalDragStart(t)}
                        @dragover=${e=>this._onLocalDragOver(t,e)}
                        @dragleave=${()=>this._onLocalDragLeave()}
                        @drop=${e=>this._onLocalDrop(t,e)}
                        @dragend=${()=>this._onLocalDragEnd()}
                      >
                        <glass-drag-handle></glass-drag-handle>
                        <div class="item-info">
                          <span class="item-name">${e.name}</span>
                          <span class="item-meta">${e.entityId}</span>
                        </div>
                        <button
                          class="layout-btn"
                          @click=${()=>this._cycleLayout(e.entityId)}
                          aria-label="${oi("config.light_change_layout_aria")}"
                          title="${oi("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
                        >
                          ${oi("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
                        </button>
                        <glass-toggle
                          .checked=${e.visible}
                          aria-label="${e.visible?oi("common.hide"):oi("common.show")} ${e.name}"
                          @glass-toggle-change=${()=>this._toggleEntityVisibility(e.entityId)}
                        ></glass-toggle>
                      </div>
                    </div>
                  `})}
              </div>
            `}
          </section>
        `:W}

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}}Oi([ge()],ji.prototype,"_fanShowHeader"),Oi([ge()],ji.prototype,"_fanRoom"),Oi([ge()],ji.prototype,"_fanRoomEntities"),Oi([ge()],ji.prototype,"_dragIdx"),Oi([ge()],ji.prototype,"_dropIdx"),Oi([ge()],ji.prototype,"_dragContext");try{customElements.define("config-tab-fan",ji)}catch{}var Hi=Object.defineProperty,Fi=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Hi(t,i,r),r};const qi=class e extends Ci{constructor(){super(...arguments),this._presenceShowHeader=!0,this._presencePersonEntities=[],this._presenceSmartphoneSensors={},this._presenceNotifyServices={},this._presenceDrivingSensors={},this._presenceSleepSensors={},this._personDragIdx=null,this._personDropIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_presenceShowHeader","_presencePersonEntities","_presenceSmartphoneSensors","_presenceNotifyServices","_presenceDrivingSensors","_presenceSleepSensors"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._presenceShowHeader=t.show_header??!0,this._presencePersonEntities=t.person_entities??[],this._presenceSmartphoneSensors=t.smartphone_sensors??{},this._presenceNotifyServices=t.notify_services??{},this._presenceDrivingSensors=t.driving_sensors??{},this._presenceSleepSensors=t.sleep_sensors??{}}collectSaveData(){return{show_header:this._presenceShowHeader,person_entities:this._presencePersonEntities,smartphone_sensors:this._presenceSmartphoneSensors,notify_services:this._presenceNotifyServices,driving_sensors:this._presenceDrivingSensors,sleep_sensors:this._presenceSleepSensors}}async _performSave(){await this.backend.send("set_presence_config",this.collectSaveData()),fe.emit("presence-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.presence_card&&this.loadFromConfig(e.presence_card)}catch{}}static{this.SMARTPHONE_HINTS=["phone","mobile","smartphone","tablet","iphone","galaxy","pixel","oneplus"]}_collectEntities(e){if(!this.hass)return[];const t=this.hass;return Object.keys(t.states).filter(e).map(e=>{const i=t.states[e]?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name))}_getAvailablePersonEntities(){return this._collectEntities(e=>e.startsWith("person."))}_getAvailableSmartphoneSensors(){return this._collectEntities(t=>t.startsWith("sensor.")&&e.SMARTPHONE_HINTS.some(e=>t.includes(e)))}_getAvailableDrivingSensors(){return this._collectEntities(e=>e.startsWith("binary_sensor."))}_getAvailableSleepSensors(){return this._collectEntities(e=>e.startsWith("input_boolean.")||e.startsWith("binary_sensor."))}_getAvailableNotifyServices(){if(!this.hass)return[];const e=this.hass.services;return Object.keys(e?.notify??{}).map(e=>`notify.${e}`).sort()}_renderEntityDropdown(e){const t=[{value:"",label:e.noneLabel,icon:e.noneIcon},...e.items.map(t=>({value:e.itemId(t),label:e.itemLabel(t),icon:e.itemIcon}))];return V`
      <div class="presence-mapping-field">
        <glass-dropdown
          .items=${t}
          .value=${e.activeId}
          .label=${e.triggerLabel}
          icon=${e.triggerIcon}
          searchable
          search-placeholder=${oi("config.search_entity")}
          @glass-dropdown-change=${t=>{if(!t.detail.value)return void e.onClear();const i=e.items.find(i=>e.itemId(i)===t.detail.value);void 0!==i&&e.onSelect(i)}}
        ></glass-dropdown>
      </div>
    `}_getOrderedPersons(e){if(0===this._presencePersonEntities.length)return e;const t=new Map(this._presencePersonEntities.map((e,t)=>[e,t]));return[...e].sort((e,i)=>{const a=t.get(e.entityId)??999,s=t.get(i.entityId)??999;return a!==s?a-s:e.name.localeCompare(i.name)})}_onPersonDrop(e){if(null===this._personDragIdx||this._personDragIdx===e)return this._personDragIdx=null,void(this._personDropIdx=null);const t=this._getAvailablePersonEntities(),i=this._getOrderedPersons(t).map(e=>e.entityId),[a]=i.splice(this._personDragIdx,1);i.splice(e,0,a),this._presencePersonEntities=i,this._personDragIdx=null,this._personDropIdx=null}_togglePresencePerson(e){const t=this._getAvailablePersonEntities();if(0===this._presencePersonEntities.length)this._presencePersonEntities=t.map(e=>e.entityId).filter(t=>t!==e);else{const t=new Set(this._presencePersonEntities);if(t.has(e)){if(t.size<=1)return void(this._presencePersonEntities=[]);t.delete(e)}else t.add(e);this._presencePersonEntities=[...t]}}renderTab(){this._lang;const e=this._getAvailablePersonEntities(),t=this._presencePersonEntities.length>0?this._presencePersonEntities:e.map(e=>e.entityId),i=this._getAvailableSmartphoneSensors(),a=this._getAvailableDrivingSensors(),s=this._getAvailableSleepSensors(),r=this._getAvailableNotifyServices(),o=0===this._presencePersonEntities.length,n=o?e.length:this._presencePersonEntities.length;return V`
      <div class="tab-panel presence-tab" id="panel-presence">
        <glass-presence-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-presence-card>
        <div class="cfg-info">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${oi("config.presence_dashboard_info")}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.presence_show_header",descKey:"config.presence_show_header_desc",on:this._presenceShowHeader,onToggle:()=>{this._presenceShowHeader=!this._presenceShowHeader}})}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.presence_persons")}</span>
              <span class="section-desc">${oi("config.presence_persons_desc")}</span>
            </div>
            ${e.length>0?V`
              <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:n,total:e.length})}">
                ${n}/${e.length}
              </span>
            `:W}
          </header>

        ${0===e.length?V`
          <glass-empty-state variant="inline" .icon=${"mdi:account-off-outline"} .title=${oi("config.presence_no_persons")}></glass-empty-state>
        `:V`
          <div class="item-list">
            ${this._getOrderedPersons(e).map((e,t)=>{const i=this._presencePersonEntities.includes(e.entityId),a=this._personDragIdx===t,s=this._personDropIdx===t&&null!==this._personDragIdx&&this._personDragIdx!==t;return V`
                <div class="item-card">
                  <div class="item-row ${i||o?"":"disabled"} ${a?"dragging":""} ${s?"drop-target":""}"
                    draggable="true"
                    @dragstart=${()=>{this._personDragIdx=t}}
                    @dragover=${e=>{e.preventDefault(),this._personDropIdx=t}}
                    @dragleave=${()=>{this._personDropIdx=null}}
                    @drop=${e=>{e.preventDefault(),this._onPersonDrop(t)}}
                    @dragend=${()=>{this._personDragIdx=null,this._personDropIdx=null}}
                  >
                    <glass-drag-handle></glass-drag-handle>
                    <div class="feature-icon">
                      <ha-icon .icon=${"mdi:account"}></ha-icon>
                    </div>
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <glass-toggle
                      .checked=${i||o}
                      aria-label="${e.name}"
                      @glass-toggle-change=${()=>this._togglePresencePerson(e.entityId)}
                    ></glass-toggle>
                  </div>
                </div>
              `})}
          </div>
        `}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.presence_per_person")}</span>
              <span class="section-desc">${oi("config.presence_per_person_desc")}</span>
            </div>
          </header>

        ${0===t.length?V`
          <glass-empty-state variant="inline" .icon=${"mdi:cellphone-off"} .title=${oi("config.presence_no_persons")}></glass-empty-state>
        `:W}

        ${t.map(t=>{const o=e.find(e=>e.entityId===t);if(!o)return W;const n=this._presenceSmartphoneSensors[t]||"",c=this._presenceNotifyServices[t]||"",l=this._presenceDrivingSensors[t]||"",d=this._presenceSleepSensors[t]||"",h=i.find(e=>e.entityId===n)?.name,p=a.find(e=>e.entityId===l)?.name,g=s.find(e=>e.entityId===d)?.name;return V`
            <div class="presence-mapping-card">
              <div class="presence-mapping-header">
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:account"}></ha-icon>
                </div>
                <span class="item-name">${o.name}</span>
              </div>

              ${this._renderEntityDropdown({triggerIcon:"mdi:cellphone",triggerLabel:h||n||oi("config.presence_auto_detect"),items:i,itemIcon:"mdi:cellphone",itemId:e=>e.entityId,itemLabel:e=>e.name,activeId:n,noneLabel:oi("config.presence_auto_detect"),noneIcon:"mdi:auto-fix",onSelect:e=>{this._presenceSmartphoneSensors={...this._presenceSmartphoneSensors,[t]:e.entityId}},onClear:()=>{const e={...this._presenceSmartphoneSensors};delete e[t],this._presenceSmartphoneSensors=e}})}
              ${this._renderEntityDropdown({triggerIcon:"mdi:bell",triggerLabel:c||oi("config.presence_auto_detect"),items:r,itemIcon:"mdi:bell",itemId:e=>e,itemLabel:e=>e,activeId:c,noneLabel:oi("config.presence_auto_detect"),noneIcon:"mdi:auto-fix",onSelect:e=>{this._presenceNotifyServices={...this._presenceNotifyServices,[t]:e}},onClear:()=>{const e={...this._presenceNotifyServices};delete e[t],this._presenceNotifyServices=e}})}
              ${this._renderEntityDropdown({triggerIcon:"mdi:car",triggerLabel:p||l||oi("config.presence_auto_detect"),items:a,itemIcon:"mdi:car",itemId:e=>e.entityId,itemLabel:e=>e.name,activeId:l,noneLabel:oi("config.presence_auto_detect"),noneIcon:"mdi:auto-fix",onSelect:e=>{this._presenceDrivingSensors={...this._presenceDrivingSensors,[t]:e.entityId}},onClear:()=>{const e={...this._presenceDrivingSensors};delete e[t],this._presenceDrivingSensors=e}})}
              ${this._renderEntityDropdown({triggerIcon:"mdi:sleep",triggerLabel:g||d||oi("config.presence_sleep_none"),items:s,itemIcon:"mdi:sleep",itemId:e=>e.entityId,itemLabel:e=>e.name,activeId:d,noneLabel:oi("config.presence_sleep_none"),noneIcon:"mdi:close-circle-outline",onSelect:e=>{this._presenceSleepSensors={...this._presenceSleepSensors,[t]:e.entityId}},onClear:()=>{const e={...this._presenceSleepSensors};delete e[t],this._presenceSleepSensors=e}})}
            </div>
          `})}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}};Fi([ge()],qi.prototype,"_presenceShowHeader"),Fi([ge()],qi.prototype,"_presencePersonEntities"),Fi([ge()],qi.prototype,"_presenceSmartphoneSensors"),Fi([ge()],qi.prototype,"_presenceNotifyServices"),Fi([ge()],qi.prototype,"_presenceDrivingSensors"),Fi([ge()],qi.prototype,"_presenceSleepSensors"),Fi([ge()],qi.prototype,"_personDragIdx"),Fi([ge()],qi.prototype,"_personDropIdx");let Ni=qi;try{customElements.define("config-tab-presence",Ni)}catch{}var Vi=Object.defineProperty,Bi=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Vi(t,i,r),r};class Ui extends Ci{constructor(){super(...arguments),this._spotifyShowHeader=!0,this._spotifyEntity="",this._spotifySortOrder="recent_first",this._spotifyMaxItems=6,this._spotifyVisibleSpeakers=[],this._spotifyConfigured=null,this._localDragIdx=null,this._localDropIdx=null,this._localDragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_spotifyShowHeader","_spotifyEntity","_spotifySortOrder","_spotifyMaxItems","_spotifyVisibleSpeakers"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._spotifyShowHeader=t.show_header??!0,this._spotifyEntity=t.entity_id??"",this._spotifySortOrder="oldest_first"===t.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=t.max_items_per_section??6,this._spotifyVisibleSpeakers=t.visible_speakers??[],this._checkSpotifyStatus()}collectSaveData(){return{show_header:this._spotifyShowHeader,...this._spotifyEntity?{entity_id:this._spotifyEntity}:{},sort_order:this._spotifySortOrder,max_items_per_section:this._spotifyMaxItems,visible_speakers:this._spotifyVisibleSpeakers}}async _performSave(){await this.backend.send("set_spotify_config",this.collectSaveData()),fe.emit("spotify-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.spotify_card&&this.loadFromConfig(e.spotify_card)}catch{}}async _checkSpotifyStatus(){if(!this.backend)return this._spotifyStatusRetry&&clearTimeout(this._spotifyStatusRetry),void(this._spotifyStatusRetry=setTimeout(()=>this._checkSpotifyStatus(),500));try{const e=await this.backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}_selectEntity(e){this._spotifyEntity=e}_toggleSpeaker(e){this._spotifyVisibleSpeakers.includes(e)?this._spotifyVisibleSpeakers=this._spotifyVisibleSpeakers.filter(t=>t!==e):this._spotifyVisibleSpeakers=[...this._spotifyVisibleSpeakers,e]}_onLocalDragStart(e){this._localDragIdx=e,this._localDragContext="speakers"}_onLocalDragOver(e,t){t.preventDefault(),this._localDropIdx=e,this.requestUpdate()}_onLocalDragLeave(){this._localDropIdx=null,this.requestUpdate()}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null,this._localDragContext="",this.requestUpdate()}_onDropSpeaker(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e||"speakers"!==this._localDragContext)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this._spotifyVisibleSpeakers];if(this._localDragIdx>=i.length||e>=i.length)return this._localDragIdx=null,void(this._localDropIdx=null);const[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._spotifyVisibleSpeakers=i,this._localDragIdx=null,this._localDropIdx=null}_renderSetupGuide(){return V`
      <div class="tab-panel" id="panel-spotify">
        <div class="pw-sp-setup-box">
          <ha-icon .icon=${"mdi:spotify"} class="pw-sp-setup-icon"></ha-icon>
          <div class="pw-sp-setup-title">
            ${oi("config.spotify_not_configured")}
          </div>
          <div class="pw-sp-setup-desc">
            ${oi("config.spotify_setup_guide")}
          </div>

          <div class="pw-sp-steps">
            ${[1,2,3,4].map(e=>V`
              <div class="pw-sp-step">
                <span class="pw-sp-step-num">${e}</span>
                <span class="pw-sp-step-text">
                  ${oi(`config.spotify_setup_step${e}`)}
                </span>
              </div>
            `)}
          </div>

          <div class="pw-sp-note">
            ${oi("config.spotify_setup_note")}
          </div>

          <glass-button
            class="pw-sp-setup-btn"
            variant="primary"
            .icon=${"mdi:cog"}
            @click=${()=>{window.open("/config/integrations/dashboard","_blank")}}
          >
            ${oi("config.spotify_open_settings")}
          </glass-button>
        </div>
      </div>
    `}renderTab(){if(this._lang,null===this._spotifyConfigured)return V`
        <div class="tab-panel" id="panel-spotify">
          <div class="preview-empty">${oi("config.spotify_checking")}</div>
        </div>
      `;if(!1===this._spotifyConfigured)return this._renderSetupGuide();const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort():[],t=e.length,i=this._spotifyVisibleSpeakers.filter(t=>e.includes(t)).length;return V`
      <div class="tab-panel spotify-tab" id="panel-spotify">
        <glass-spotify-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-spotify-card>
        <div class="cfg-info">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${oi("config.spotify_dashboard_info")}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.spotify_entity")}</span>
              <span class="section-desc">${oi("config.spotify_entity_desc")}</span>
            </div>
          </header>

          ${0===e.length?V`
            <glass-empty-state variant="inline" .icon=${"mdi:speaker-off"} .title=${oi("media.no_players")}></glass-empty-state>
          `:V`
            <glass-dropdown
              .items=${e.map(e=>({value:e,label:e,icon:"mdi:speaker"}))}
              .value=${this._spotifyEntity}
              .label=${oi("common.select")}
              icon="mdi:spotify"
              @glass-dropdown-change=${e=>this._selectEntity(e.detail.value)}
            ></glass-dropdown>
          `}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.spotify_show_header",descKey:"config.spotify_show_header_desc",on:this._spotifyShowHeader,onToggle:()=>{this._spotifyShowHeader=!this._spotifyShowHeader}})}
          </div>

          <div class="cfg-sublabel">${oi("config.spotify_sort_order")}</div>
          <div class="cfg-subdesc">${oi("config.spotify_sort_order_desc")}</div>
          <div class="segmented">
            <button class="seg-btn ${"recent_first"===this._spotifySortOrder?"active":""}"
              @click=${()=>{this._spotifySortOrder="recent_first"}}>
              ${oi("config.spotify_sort_recent")}
            </button>
            <button class="seg-btn ${"oldest_first"===this._spotifySortOrder?"active":""}"
              @click=${()=>{this._spotifySortOrder="oldest_first"}}>
              ${oi("config.spotify_sort_oldest")}
            </button>
          </div>

          <div class="cfg-sublabel">${oi("config.spotify_max_items")}</div>
          <div class="cfg-subdesc">${oi("config.spotify_max_items_desc")}</div>
          <div class="range-row">
            <input
              type="range"
              class="range-input"
              min="1"
              max="20"
              .value=${String(this._spotifyMaxItems)}
              @input=${e=>{this._spotifyMaxItems=parseInt(e.target.value,10)}}
            />
            <span class="range-value">${this._spotifyMaxItems}</span>
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.spotify_speakers")}</span>
              <span class="section-desc">${oi("config.spotify_speakers_desc")}</span>
            </div>
            ${t>0?V`
              <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:i,total:t})}">
                ${i}/${t}
              </span>
            `:W}
          </header>
          ${this._renderSpeakerList()}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}_renderSpeakerList(){const e=this.hass?Object.entries(this.hass.states).filter(([e])=>e.startsWith("media_player.")).map(([e,t])=>({entityId:e,name:t.attributes.friendly_name??e,visible:this._spotifyVisibleSpeakers.includes(e)})):[],t=[...this._spotifyVisibleSpeakers.map(t=>e.find(e=>e.entityId===t)).filter(e=>!!e),...e.filter(e=>!e.visible).sort((e,t)=>e.name.localeCompare(t.name))];return V`
      <div class="item-list">
        ${t.map(e=>{const t=e.visible,i=t?this._spotifyVisibleSpeakers.indexOf(e.entityId):-1,a=this._localDragIdx===i&&-1!==i&&"speakers"===this._localDragContext,s=this._localDropIdx===i&&-1!==i&&"speakers"===this._localDragContext,r=["item-row",t?"":"disabled",a?"dragging":"",s?"drop-target":""].filter(Boolean).join(" ");return V`
            <div
              class=${r}
              draggable=${t?"true":"false"}
              @dragstart=${()=>{t&&-1!==i&&this._onLocalDragStart(i)}}
              @dragover=${e=>{t&&-1!==i&&this._onLocalDragOver(i,e)}}
              @dragleave=${()=>this._onLocalDragLeave()}
              @drop=${e=>{t&&-1!==i&&this._onDropSpeaker(i,e)}}
              @dragend=${()=>this._onLocalDragEnd()}
            >
              ${t?V`
                <glass-drag-handle></glass-drag-handle>
              `:V`<span class="pw-sp-drag-spacer"></span>`}
              <div class="item-info">
                <span class="item-name">${e.name}</span>
                <span class="item-meta">${e.entityId}</span>
              </div>
              <glass-toggle
                .checked=${t}
                aria-label="${oi(t?"common.hide":"common.show")} ${e.name}"
                @glass-toggle-change=${()=>this._toggleSpeaker(e.entityId)}
              ></glass-toggle>
            </div>
          `})}
      </div>
    `}}Bi([ge()],Ui.prototype,"_spotifyShowHeader"),Bi([ge()],Ui.prototype,"_spotifyEntity"),Bi([ge()],Ui.prototype,"_spotifySortOrder"),Bi([ge()],Ui.prototype,"_spotifyMaxItems"),Bi([ge()],Ui.prototype,"_spotifyVisibleSpeakers"),Bi([ge()],Ui.prototype,"_spotifyConfigured");try{customElements.define("config-tab-spotify",Ui)}catch{}var Wi=Object.defineProperty,Ki=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Wi(t,i,r),r};const Yi=[{key:"input_select",i18nKey:"config.title_source_input_select",icon:"mdi:form-select",tone:"info"},{key:"scenes",i18nKey:"config.title_source_scenes",icon:"mdi:palette",tone:"accent"},{key:"booleans",i18nKey:"config.title_source_booleans",icon:"mdi:toggle-switch",tone:"success"}],Gi=["neutral","success","warning","info","accent","alert"],Xi={neutral:"Neutre",success:"Vert",warning:"Orange",info:"Bleu",accent:"Violet",alert:"Rouge"},Qi={success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t4)"},Ji=e=>Qi[e]??(e.startsWith("#")?e:"var(--t4)"),Zi={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},ea={icon:"mdi:clock-outline"};class ta extends Ci{constructor(){super(...arguments),this._titleText="",this._titleSources=[],this._titlePeriodEntity="",this._titlePeriodOptions=[],this._titleEditingSourceIdx=null,this._periodIconPopupIdx=null,this._iconPopupModeIdx=null,this._iconSearch="",this._periodEditingIdx=null,this._iconList=[],this._iconLoading=!1,this._portalEl=null,this._dragIdx=null,this._dropIdx=null,this._dragContext="",this._dragModeSrcIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_titleText","_titleSources","_titlePeriodEntity","_titlePeriodOptions"])}get _titleModes(){return this._titleSources.flatMap(e=>e.modes)}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._titleText=t.title??"",this._titlePeriodEntity=t.period_entity??"",this._titlePeriodOptions=(t.period_options??[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"})),this._titleSources=(t.sources??[]).map(e=>({source_type:e.source_type||"",entity:e.entity||"",label:e.label||"",modes:(e.modes||[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"}))}))}collectSaveData(){return{title:this._titleText,period_entity:this._titlePeriodEntity,period_options:this._titlePeriodOptions,sources:this._titleSources.map(e=>({source_type:e.source_type,entity:e.entity||"",label:e.label||"",modes:e.modes}))}}async _performSave(){await this.backend.send("set_title_config",this.collectSaveData()),fe.emit("title-config-changed",void 0)}async reload(){if(this.backend){this._iconPopupModeIdx=null,this._periodIconPopupIdx=null,this._removeIconPortal(),this._titleEditingSourceIdx=null;try{const e=await this.backend.send("get_config");e?.title_card&&this.loadFromConfig(e.title_card)}catch{}}}_localDragStart(e,t,i){this._dragIdx=e,this._dragContext=t,"title_modes"===t&&(this._dragModeSrcIdx=i??null)}_localDragOver(e,t,i){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&("title_modes"===this._dragContext&&void 0!==i&&i!==this._dragModeSrcIdx||(this._dropIdx=e))}_localDragLeave(){this._dropIdx=null}_localDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("title_sources"===i){const t=[...this._titleSources],[i]=t.splice(this._dragIdx,1);if(t.splice(e,0,i),this._titleSources=t,this._titleEditingSourceIdx===this._dragIdx)this._titleEditingSourceIdx=e;else if(null!==this._titleEditingSourceIdx){const t=this._titleEditingSourceIdx,i=this._dragIdx;i<t&&e>=t?this._titleEditingSourceIdx=t-1:i>t&&e<=t&&(this._titleEditingSourceIdx=t+1)}}else if("title_modes"===i&&null!==this._dragModeSrcIdx){const t=[...this._titleSources],i=t[this._dragModeSrcIdx];if(i){const a=[...i.modes],[s]=a.splice(this._dragIdx,1);a.splice(e,0,s),t[this._dragModeSrcIdx]={...i,modes:a},this._titleSources=t}this._dragModeSrcIdx=null}this._dragIdx=null,this._dropIdx=null}_localDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragModeSrcIdx=null}_addTitleSource(e){this._titleSources=[...this._titleSources,{source_type:e,entity:"",label:"",modes:[]}],this._titleEditingSourceIdx=this._titleSources.length-1}_removeTitleSource(e){const t=[...this._titleSources];t.splice(e,1),this._titleSources=t,this._titleEditingSourceIdx===e?this._titleEditingSourceIdx=null:null!==this._titleEditingSourceIdx&&this._titleEditingSourceIdx>e&&this._titleEditingSourceIdx--}_setTitleSourceEntity(e,t){const i=[...this._titleSources];if(i[e]){if(i[e]={...i[e],entity:t},t.startsWith("input_select.")&&this.hass){const a=this.hass.states[t];if(a){const t=a.attributes.options??[],s=new Map(i[e].modes.map(e=>[e.id,e]));i[e]={...i[e],modes:t.map(e=>s.get(e)??{id:e,label:e,icon:"",color:"neutral"})}}}else t||(i[e]={...i[e],modes:[]});this._titleSources=i}}_setTitleSourceLabel(e,t){const i=[...this._titleSources];i[e]&&(i[e]={...i[e],label:t},this._titleSources=i)}_addTitleModeEntity(e,t){const i=[...this._titleSources];if(!i[e])return;if(i[e].modes.some(e=>e.id===t))return;const a=this.hass?.states[t],s=a?.attributes.friendly_name||t.split(".")[1]||t,r=t.startsWith("scene.")?"mdi:palette":"mdi:toggle-switch",o=t.startsWith("scene.")?"accent":"success";i[e]={...i[e],modes:[...i[e].modes,{id:t,label:s,icon:r,color:o}]},this._titleSources=i}_removeTitleModeEntity(e,t){const i=[...this._titleSources];i[e]&&(i[e]={...i[e],modes:i[e].modes.filter(e=>e.id!==t)},this._titleSources=i)}_updateTitleMode(e,t,i){let a=e;const s=[...this._titleSources];for(let r=0;r<s.length;r++){if(a<s[r].modes.length){const e=[...s[r].modes];return e[a]={...e[a],[t]:i},s[r]={...s[r],modes:e},void(this._titleSources=s)}a-=s[r].modes.length}}_setTitlePeriodEntity(e){if(this._titlePeriodEntity=e,!e)return void(this._titlePeriodOptions=[]);const t=this.hass?.states[e];if(!t)return;const i=t.attributes.options??[],a=new Map(this._titlePeriodOptions.map(e=>[e.id,e]));this._titlePeriodOptions=i.map(e=>a.get(e)??{id:e,label:e,icon:"",color:"neutral"})}_updateTitlePeriodOption(e,t,i){const a=[...this._titlePeriodOptions];a[e]&&(a[e]={...a[e],[t]:i},this._titlePeriodOptions=a)}async _openIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),e<this._titleModes.length&&(this._iconSearch="",this._iconPopupModeIdx=e,this._showIconPortal()))}async _openPeriodIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),e<this._titlePeriodOptions.length&&(this._iconSearch="",this._periodIconPopupIdx=e,this._showIconPortal()))}async _loadIconList(){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim(),t=this._iconList;return e?t.filter(t=>t.toLowerCase().includes(e)).slice(0,120):t.slice(0,120)}_showIconPortal(){const e=null!==this._iconPopupModeIdx,t=null!==this._periodIconPopupIdx;if(!e&&!t)return void this._removeIconPortal();const i=this._getFilteredIcons(),a=this._iconPopupModeIdx,s=this._periodIconPopupIdx;let r="";e&&null!==a?r=this._titleModes[a]?.icon??"":null!==s&&(r=this._titlePeriodOptions[s]?.icon??""),this._portalEl||(this._portalEl=document.createElement("div"),document.body.appendChild(this._portalEl));const o=()=>{this._iconPopupModeIdx=null,this._periodIconPopupIdx=null,this._removeIconPortal()},n=i=>{e&&null!==this._iconPopupModeIdx?this._updateTitleMode(this._iconPopupModeIdx,"icon",i):t&&null!==this._periodIconPopupIdx&&this._updateTitlePeriodOption(this._periodIconPopupIdx,"icon",i),this._removeIconPortal()},c=e=>{this._iconSearch=e,this._showIconPortal()};this._portalEl.replaceChildren(),Object.assign(this._portalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}),this._portalEl.addEventListener("click",e=>{e.target===this._portalEl&&o()},{once:!0});const l=document.createElement("div");Object.assign(l.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const d=document.createElement("div");Object.assign(d.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const h=document.createElement("span");Object.assign(h.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),h.textContent=oi("config.title_mode_icon");const p=document.createElement("input");Object.assign(p.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),p.placeholder="mdi:...",p.value=this._iconSearch,p.addEventListener("input",()=>c(p.value)),d.appendChild(h),d.appendChild(p),l.appendChild(d);const g=document.createElement("div");Object.assign(g.style,{overflow:"auto",flex:"1",padding:"0.5rem",scrollbarWidth:"none"});const u=document.createElement("div");Object.assign(u.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const m=this._createIconBtn("mdi:cancel",""===r,.4);m.addEventListener("click",()=>n("")),u.appendChild(m);for(const _ of i){const e=this._createIconBtn(_,_===r,1);e.addEventListener("click",()=>n(_)),u.appendChild(e)}if(0===i.length&&this._iconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=oi("config.title_no_icons_found"),u.appendChild(e)}g.appendChild(u),l.appendChild(g),this._portalEl.appendChild(l),p.focus()}_createIconBtn(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",border:t?"2px solid rgba(129,140,248,0.6)":"1px solid rgba(255,255,255,0.06)",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)",cursor:"pointer",color:"rgba(255,255,255,0.88)",padding:"0"});const s=document.createElement("ha-icon");return s.icon=e,s.style.cssText=`--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${i};`,a.appendChild(s),a}_removeIconPortal(){this._portalEl&&(this._portalEl.remove(),this._portalEl=null)}disconnectedCallback(){super.disconnectedCallback(),this._removeIconPortal()}_renderSourceEditor(e,t){const i=this._titleEditingSourceIdx===t,a=Yi.find(t=>t.key===e.source_type),s=e.label||(a?oi(a.i18nKey):"")||e.source_type,r=this._dragIdx===t&&"title_sources"===this._dragContext,o=this._dropIdx===t&&"title_sources"===this._dragContext;return V`
      <div
        class="title-source-block ${r?"dragging":""} ${o?"drop-target":""}"
        draggable="true"
        @dragstart=${()=>this._localDragStart(t,"title_sources")}
        @dragover=${e=>this._localDragOver(t,e)}
        @dragleave=${()=>this._localDragLeave()}
        @drop=${e=>this._localDrop(t,e)}
        @dragend=${()=>this._localDragEnd()}
      >
        <div class="title-source-header">
          <glass-drag-handle></glass-drag-handle>
          <ha-icon .icon=${a?.icon||"mdi:help"}></ha-icon>
          <span class="title-source-type">${s}</span>
          <span class="title-source-badge">${e.modes.length}</span>
          <glass-icon-button
            class="title-source-actions-first"
            size="xs"
            .icon=${i?"mdi:pencil":"mdi:pencil-outline"}
            aria-label=${oi(i?"common.collapse":"common.expand")}
            @click=${()=>{this._titleEditingSourceIdx=i?null:t}}
          ></glass-icon-button>
          <glass-icon-button
            size="xs"
            .icon=${"mdi:close"}
            aria-label=${oi("config.title_remove_source")}
            @click=${()=>this._removeTitleSource(t)}
          ></glass-icon-button>
        </div>

        ${i?V`
          <div class="title-source-body">
            <!-- Label -->
            <div class="title-source-field">
              <span class="title-source-field-label">${oi("config.title_source_label")}</span>
              <glass-form-input
                class="input"
                type="text"
                .value=${e.label}
                placeholder=${a?oi(a.i18nKey):""}
                @glass-input=${e=>this._setTitleSourceLabel(t,e.detail.value)}
              ></glass-form-input>
            </div>

            ${"input_select"===e.source_type?this._renderInputSelectEntityPicker(e,t):W}

            <!-- Mode list -->
            ${e.modes.length>0?V`
              <div class="section-label mt-sm">${oi("config.title_modes")}</div>
              <div class="title-modes-list">
                ${e.modes.map((i,a)=>this._renderModeRow(e,t,i,a))}
              </div>
            `:W}

            ${"scenes"===e.source_type||"booleans"===e.source_type?this._renderEntityAdder(e,t):W}
          </div>
        `:W}
      </div>
    `}_renderInputSelectEntityPicker(e,t){const i=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")).sort():[],a=[{value:"",label:oi("title_card.mode_none"),icon:"mdi:close"},...i.map(e=>({value:e,label:e,icon:"mdi:form-select"}))];return V`
      <div class="title-source-field">
        <span class="title-source-field-label">${oi("config.title_mode_entity")}</span>
        <glass-dropdown
          .items=${a}
          .value=${e.entity}
          .label=${e.entity||oi("config.title_select_entity")}
          icon=${e.entity?"mdi:form-select":"mdi:help-circle-outline"}
          searchable
          search-placeholder=${oi("config.search_entity")}
          @glass-dropdown-change=${e=>this._setTitleSourceEntity(t,e.detail.value)}
        ></glass-dropdown>
      </div>
    `}_renderEntityAdder(e,t){const i="scenes"===e.source_type?"scene.":"input_boolean.",a="scenes"===e.source_type?"mdi:palette":"mdi:toggle-switch",s=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith(i)).sort():[],r=new Set(e.modes.map(e=>e.id)),o=s.filter(e=>!r.has(e)).map(e=>({value:e,label:e,icon:a}));return V`
      <div class="title-source-field">
        <span class="title-source-field-label">${oi("config.title_add_entity")}</span>
        <glass-dropdown
          .items=${o}
          .value=${""}
          .label=${oi("config.title_add_entity")}
          icon="mdi:plus"
          searchable
          search-placeholder=${oi("config.search_entity")}
          @glass-dropdown-change=${e=>{e.detail.value&&this._addTitleModeEntity(t,e.detail.value)}}
        ></glass-dropdown>
      </div>
    `}_renderModeRow(e,t,i,a){let s=0;for(let n=0;n<t;n++)s+=this._titleSources[n].modes.length;s+=a;const r=this._dragIdx===a&&"title_modes"===this._dragContext&&this._dragModeSrcIdx===t,o=this._dropIdx===a&&"title_modes"===this._dragContext&&this._dragModeSrcIdx===t;return V`
      <div
        class="title-mode-row ${r?"dragging":""} ${o?"drop-target":""}"
        draggable="true"
        @dragstart=${()=>this._localDragStart(a,"title_modes",t)}
        @dragover=${e=>this._localDragOver(a,e,t)}
        @dragleave=${()=>this._localDragLeave()}
        @drop=${e=>this._localDrop(a,e)}
        @dragend=${()=>this._localDragEnd()}
      >
        <div class="title-mode-header">
          <glass-drag-handle></glass-drag-handle>
          <span class="title-mode-id">${i.id}</span>
          ${"scenes"===e.source_type||"booleans"===e.source_type?V`
            <glass-icon-button
              size="xs"
              .icon=${"mdi:close"}
              aria-label=${oi("config.title_remove_entity")}
              @click=${()=>this._removeTitleModeEntity(t,i.id)}
            ></glass-icon-button>
          `:W}
        </div>
        <div class="title-mode-fields-row">
          <glass-form-input
            class="input"
            type="text"
            placeholder=${oi("config.title_mode_label")}
            .value=${i.label}
            @glass-input=${e=>this._updateTitleMode(s,"label",e.detail.value)}
          ></glass-form-input>
          <button
            class="title-icon-btn ${i.icon?"has-icon":""}"
            @click=${()=>this._openIconPopup(s)}
            aria-label="${oi("config.title_mode_icon")}"
          >
            <ha-icon .icon=${i.icon||"mdi:emoticon-outline"}></ha-icon>
          </button>
        </div>
        <div class="title-color-row">
          <span class="title-color-label">${oi("config.title_mode_color")}</span>
          <div class="title-color-chips">
            ${Gi.map(e=>V`
              <button
                class="title-color-chip ${e} ${i.color===e?"active":""}"
                @click=${()=>this._updateTitleMode(s,"color",e)}
                aria-label="${oi("config.title_mode_color")}: ${e}"
              ></button>
            `)}
          </div>
        </div>
      </div>
    `}_renderPeriodEntityPicker(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")).sort():[],t=this._titlePeriodEntity,i=[{value:"",label:oi("config.title_period_auto"),icon:"mdi:clock-outline"},...e.map(e=>({value:e,label:e,icon:"mdi:form-select"}))];return V`
      <glass-dropdown
        .items=${i}
        .value=${t}
        .label=${t||oi("config.title_period_auto")}
        icon=${t?"mdi:form-select":"mdi:clock-outline"}
        searchable
        search-placeholder=${oi("config.search_entity")}
        @glass-dropdown-change=${e=>this._setTitlePeriodEntity(e.detail.value)}
      ></glass-dropdown>
    `}_renderPeriodOptionsEditor(){const e=this._titlePeriodEntity?this.hass?.states[this._titlePeriodEntity]:void 0,t=e?.attributes?.options??[];if(0===t.length)return V`
        <div class="title-period-empty">
          <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
          <div class="title-period-empty-text">
            <strong>${oi("config.title_period_options")}</strong>
            <span>${oi("config.title_period_options_desc")}</span>
          </div>
        </div>
      `;const i=new Map(this._titlePeriodOptions.map(e=>[e.id,e])),a=t.filter(e=>!i.has(e));a.length>0&&(this._titlePeriodOptions=[...this._titlePeriodOptions,...a.map(e=>({id:e,label:e,icon:"",color:"neutral"}))]);const s=e?.state??"";return V`
      <div class="title-period-head">
        <span class="title-period-head-label">${oi("config.title_period_options")}</span>
        <span class="title-period-head-desc">${oi("config.title_period_options_desc")}</span>
      </div>

      <div class="title-period-chips-row" role="listbox" aria-label="${oi("config.title_period_options")}">
        ${t.map(e=>{const t=this._titlePeriodOptions.findIndex(t=>t.id===e);if(-1===t)return W;const i=this._titlePeriodOptions[t],a=Zi[e]??ea,r=i.icon||a.icon,o=i.color||(Zi[e]?.color??"neutral"),n=Ji(o),c=this._periodEditingIdx===t,l=s===e;return V`
            <button
              class="title-period-chip ${c?"editing":""} ${l?"live":""}"
              style="--chip-tint:${n};"
              role="option"
              aria-selected=${c?"true":"false"}
              @click=${()=>{this._periodEditingIdx=c?null:t}}
            >
              <span class="title-period-chip-icon"><ha-icon .icon=${r}></ha-icon></span>
              <span class="title-period-chip-name">${e}</span>
              ${l?V`<span class="title-period-chip-live-dot" aria-label="${oi("common.active")}"></span>`:W}
            </button>
          `})}
      </div>

      ${null!==this._periodEditingIdx&&this._periodEditingIdx<this._titlePeriodOptions.length?V`
        ${this._renderPeriodChipEditor(this._periodEditingIdx,t)}
      `:W}
    `}_renderPeriodChipEditor(e,t){const i=this._titlePeriodOptions[e],a=i.id,s=Zi[a]??ea,r=i.icon||s.icon,o=i.color||(Zi[a]?.color??"neutral");return V`
      <div class="title-period-editor" role="region" aria-label="${a}">
        <div class="title-period-editor-head">
          <ha-icon class="title-period-editor-icon" .icon=${r} style="color:${Ji(o)};"></ha-icon>
          <span class="title-period-editor-name">${a}</span>
          <glass-icon-button size="xs" .icon=${"mdi:close"} aria-label="${oi("common.close")}"
            @click=${()=>{this._periodEditingIdx=null}}></glass-icon-button>
        </div>

        <div class="title-period-editor-field">
          <span class="title-period-editor-field-label">${oi("config.title_mode_icon")}</span>
          <button
            class="title-icon-btn ${i.icon?"has-icon":""}"
            @click=${()=>this._openPeriodIconPopup(e)}
            aria-label="${oi("config.title_mode_icon")}"
          >
            <ha-icon .icon=${r}></ha-icon>
          </button>
        </div>

        <div class="title-period-editor-field">
          <span class="title-period-editor-field-label">${oi("config.title_mode_color")}</span>
          <div class="title-color-swatches">
            ${Gi.map(t=>V`
              <glass-color-swatch
                with-check
                .color=${Ji(t)}
                ?selected=${o===t}
                aria-label="${Xi[t]??t}"
                title="${Xi[t]??t}"
                @click=${()=>this._updateTitlePeriodOption(e,"color",t)}
              ></glass-color-swatch>
            `)}
          </div>
        </div>

        ${t.length>1?V`
          <div class="title-period-editor-nav">
            <button class="btn-link" @click=${()=>{this._periodEditingIdx=(e-1+t.length)%t.length}}>
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
              <span>${oi("common.previous")}</span>
            </button>
            <button class="btn-link" @click=${()=>{this._periodEditingIdx=(e+1)%t.length}}>
              <span>${oi("common.next")}</span>
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          </div>
        `:W}
      </div>
    `}renderTab(){this._lang;const e=this._titleSources,t=this._titleText.length,i=0===e.length;return V`
      <div class="tab-panel title-tab" id="panel-title">
        <glass-title-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-title-card>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.title_title")}</span>
              <span class="section-desc">${oi("config.title_title_desc")}</span>
            </div>
          </header>
          <div class="title-text-field">
            <glass-form-input
              class="input"
              type="text"
              .value=${this._titleText}
              placeholder=${oi("config.title_title_placeholder")}
              max-length=${40}
              @glass-input=${e=>{this._titleText=e.detail.value}}
            >
              <span slot="trailing" class="title-text-count ${t>34?"warn":""}">
                ${t}/${40}
              </span>
            </glass-form-input>
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.title_mode_source")}</span>
              <span class="section-desc">${oi("config.title_mode_source_desc")}</span>
            </div>
            ${i?W:V`<span class="cfg-section-count">${e.length}</span>`}
          </header>

          ${i?V`
            <glass-empty-state variant="inline" .icon=${"mdi:cursor-default-click-outline"} .title=${oi("config.title_sources_empty")}></glass-empty-state>
          `:e.map((e,t)=>this._renderSourceEditor(e,t))}

          <div class="cfg-add-wrap">
            <glass-dropdown
              class="cfg-add-btn"
              .items=${Yi.map(e=>({value:e.key,label:oi(e.i18nKey),icon:e.icon}))}
              .value=${""}
              .label=${oi("config.title_add_source")}
              icon="mdi:plus"
              @glass-dropdown-change=${e=>this._addTitleSource(e.detail.value)}
            ></glass-dropdown>
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.title_period_entity")}</span>
              <span class="section-desc">${oi("config.title_period_entity_desc")}</span>
            </div>
          </header>
          ${this._renderPeriodEntityPicker()}
          ${this._renderPeriodOptionsEditor()}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}}Ki([ge()],ta.prototype,"_titleText"),Ki([ge()],ta.prototype,"_titleSources"),Ki([ge()],ta.prototype,"_titlePeriodEntity"),Ki([ge()],ta.prototype,"_titlePeriodOptions"),Ki([ge()],ta.prototype,"_titleEditingSourceIdx"),Ki([ge()],ta.prototype,"_periodIconPopupIdx"),Ki([ge()],ta.prototype,"_iconPopupModeIdx"),Ki([ge()],ta.prototype,"_iconSearch"),Ki([ge()],ta.prototype,"_periodEditingIdx"),Ki([ge()],ta.prototype,"_dragIdx"),Ki([ge()],ta.prototype,"_dropIdx"),Ki([ge()],ta.prototype,"_dragContext"),Ki([ge()],ta.prototype,"_dragModeSrcIdx");try{customElements.define("config-tab-title",ta)}catch{}var ia=Object.defineProperty,aa=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&ia(t,i,r),r};const sa=[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity",attr:"humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind",attr:"wind_speed"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure",attr:"pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv",attr:"uv_index"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility",attr:"visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise",attr:null},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset",attr:null}];class ra extends Ci{constructor(){super(...arguments),this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherShowHeader=!0}static{this._AUTO_SAVE_KEYS=new Set(["_weatherEntity","_weatherHiddenMetrics","_weatherShowDaily","_weatherShowHourly","_weatherShowHeader"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._weatherEntity=t.entity_id??"",this._weatherHiddenMetrics=t.hidden_metrics??[],this._weatherShowDaily=t.show_daily??!0,this._weatherShowHourly=t.show_hourly??!0,this._weatherShowHeader=t.show_header??!0}collectSaveData(){return{...this._weatherEntity?{entity_id:this._weatherEntity}:{},hidden_metrics:this._weatherHiddenMetrics,show_daily:this._weatherShowDaily,show_hourly:this._weatherShowHourly,show_header:this._weatherShowHeader}}async _performSave(){await this.backend.send("set_weather",this.collectSaveData()),fe.emit("weather-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.weather&&this.loadFromConfig(e.weather)}catch{}}_selectEntity(e){this._weatherEntity=e}_toggleMetric(e){const t=new Set(this._weatherHiddenMetrics);t.has(e)?t.delete(e):t.add(e),this._weatherHiddenMetrics=[...t]}renderTab(){this._lang;const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")).sort():[],t=e.find(e=>e===this._weatherEntity),i=new Set(this._weatherHiddenMetrics),a=t&&this.hass?.states[t]?.attributes||{},s=sa.filter(e=>null===e.attr||null!=a[e.attr]),r=s.length-s.filter(e=>i.has(e.key)).length;return V`
      <div class="tab-panel weather-tab" id="panel-weather">
        <glass-weather-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-weather-card>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.weather_entity")}</span>
              <span class="section-desc">${oi("config.weather_entity_desc")}</span>
            </div>
          </header>

          ${0===e.length?V`
            <glass-empty-state variant="inline" .icon=${"mdi:weather-cloudy-alert"} .title=${oi("config.weather_no_entity")}></glass-empty-state>
          `:V`
            <glass-dropdown
              .items=${e.map(e=>({value:e,label:e,icon:"mdi:weather-partly-cloudy"}))}
              .value=${this._weatherEntity}
              .label=${oi("common.select")}
              icon="mdi:weather-partly-cloudy"
              @glass-dropdown-change=${e=>this._selectEntity(e.detail.value)}
            ></glass-dropdown>
          `}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.weather_display")}</span>
              <span class="section-desc">${oi("config.weather_display_desc")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.weather_show_header",descKey:"config.weather_show_header_desc",on:this._weatherShowHeader,onToggle:()=>{this._weatherShowHeader=!this._weatherShowHeader}})}
            ${this._renderFeatureRow({icon:"mdi:calendar-week",nameKey:"config.weather_daily",descKey:"config.weather_daily_desc",on:this._weatherShowDaily,ariaLabel:`${this._weatherShowDaily?oi("common.hide"):oi("common.show")} ${oi("config.weather_daily")}`,onToggle:()=>{this._weatherShowDaily=!this._weatherShowDaily}})}
            ${this._renderFeatureRow({icon:"mdi:clock-outline",nameKey:"config.weather_hourly",descKey:"config.weather_hourly_desc",on:this._weatherShowHourly,ariaLabel:`${this._weatherShowHourly?oi("common.hide"):oi("common.show")} ${oi("config.weather_hourly")}`,onToggle:()=>{this._weatherShowHourly=!this._weatherShowHourly}})}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">3</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.weather_metrics")}</span>
              <span class="section-desc">${oi("config.weather_metrics_desc")}</span>
            </div>
            <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:r,total:s.length})}">
              ${r}/${s.length}
            </span>
          </header>
          <div class="feature-list">
            ${s.map(e=>{const t=!i.has(e.key);return this._renderFeatureRow({icon:e.icon,nameKey:e.nameKey,on:t,ariaLabel:`${oi(t?"common.hide":"common.show")} ${oi(e.nameKey)}`,onToggle:()=>this._toggleMetric(e.key)})})}
          </div>
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}}aa([ge()],ra.prototype,"_weatherEntity"),aa([ge()],ra.prototype,"_weatherHiddenMetrics"),aa([ge()],ra.prototype,"_weatherShowDaily"),aa([ge()],ra.prototype,"_weatherShowHourly"),aa([ge()],ra.prototype,"_weatherShowHeader");try{customElements.define("config-tab-weather",ra)}catch{}var oa=Object.defineProperty,na=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&oa(t,i,r),r};class ca extends Ci{constructor(){super(...arguments),this._cameraShowHeader=!0,this._cameraAutoCycle=!1,this._cameraCycleInterval=10,this._cameraEntityOrder=[],this._cameraHiddenEntities=[],this._cameraRoom="",this._cameraRoomEntities=[],this._localDragIdx=null,this._localDropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_cameraShowHeader","_cameraAutoCycle","_cameraCycleInterval","_cameraEntityOrder","_cameraHiddenEntities","_cameraRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._cameraRoom=this.areaId,this._loadRoomCameras()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._cameraShowHeader=t.show_header??!0,this._cameraEntityOrder=t.entity_order??[],this._cameraHiddenEntities=t.hidden_entities??[],this._cameraAutoCycle=t.auto_cycle??!1,this._cameraCycleInterval=t.cycle_interval??10}collectSaveData(){return{show_header:this._cameraShowHeader,entity_order:this._cameraEntityOrder,hidden_entities:this._cameraHiddenEntities,auto_cycle:this._cameraAutoCycle,cycle_interval:this._cameraCycleInterval}}async _performSave(){if(await this.backend.send("set_camera_carousel_config",this.collectSaveData()),this._cameraRoom&&this._cameraRoomEntities.length>0){const e=new Set(this._cameraRoomEntities.map(e=>e.entityId)),t=this._cameraRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),i=this._cameraRoomEntities.map(e=>e.entityId);await this._saveRoomEntities(this._cameraRoom,e,t,i)}fe.emit("camera-carousel-config-changed",void 0)}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.camera_carousel&&this.loadFromConfig(e.camera_carousel)}catch{}await this._loadRoomCameras()}}async _loadRoomCameras(){if(!this.backend||!this._cameraRoom||!this.hass)return;const e=this._cameraRoom,t=fi(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("camera.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._cameraRoom!==e)return;const a=new Set(i?.hidden_entities??[]),s=i?.entity_order??[],r=[...t].sort((e,t)=>{const i=s.indexOf(e),a=s.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._cameraRoomEntities=r.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i,visible:!a.has(e)}})}_toggleRoomCameraVisibility(e){this._cameraRoomEntities=this._cameraRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_onRoomCameraDragStart(e){this._localDragIdx=e,this._dragContext="room_cameras"}_onRoomCameraDragOver(e,t){t.preventDefault(),null!==this._localDragIdx&&this._localDragIdx!==e&&(this._localDropIdx=e)}_onRoomCameraDragEnd(){this._localDragIdx=null,this._localDropIdx=null,this._dragContext=""}_onRoomCameraDrop(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e||"room_cameras"!==this._dragContext)return void this._onRoomCameraDragEnd();const i=[...this._cameraRoomEntities],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._cameraRoomEntities=i,this._onRoomCameraDragEnd()}_initCameraEntityOrder(){if(!this.hass)return;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("camera.")).sort(),t=new Set(e),i=this._cameraEntityOrder.filter(e=>t.has(e)),a=new Set(i);for(const s of e)a.has(s)||i.push(s);this._cameraEntityOrder=i}_localDragStart(e){this._localDragIdx=e}_localDragOver(e,t){t.preventDefault(),this._localDropIdx=e}_localDragLeave(){this._localDropIdx=null}_localDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_toggleCameraVisible(e){const t=new Set(this._cameraHiddenEntities);t.has(e)?t.delete(e):t.add(e),this._cameraHiddenEntities=[...t]}_onDropCameraEntity(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return void this._localDragEnd();const i=[...this._cameraEntityOrder],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._cameraEntityOrder=i,this._localDragEnd()}renderTab(){if(this._lang,this.areaId)return this._renderRoomTab();this.hass&&0===this._cameraEntityOrder.length&&this._initCameraEntityOrder();const e=this._cameraEntityOrder,t=new Set(this._cameraHiddenEntities),i=e.length-e.filter(e=>t.has(e)).length;return V`
      <div class="tab-panel camera-tab" id="panel-camera_carousel">
        <glass-camera-carousel-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-camera-carousel-card>
        <div class="cfg-info">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${oi("config.camera_dashboard_info")}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.camera_show_header",descKey:"config.camera_show_header_desc",on:this._cameraShowHeader,onToggle:()=>{this._cameraShowHeader=!this._cameraShowHeader}})}
            ${this._renderFeatureRow({icon:"mdi:autorenew",nameKey:"config.camera_auto_cycle",descKey:"config.camera_auto_cycle_desc",on:this._cameraAutoCycle,onToggle:()=>{this._cameraAutoCycle=!this._cameraAutoCycle}})}
          </div>
          ${this._cameraAutoCycle?V`
            <div class="feature-list">
              <div class="feature-row static-row">
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:timer-outline"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${oi("config.camera_cycle_interval")}</div>
                  <div class="feature-desc">${oi("config.camera_cycle_interval_desc")}</div>
                </div>
                <input
                  class="input cycle-interval-input"
                  type="number"
                  min="3"
                  max="60"
                  .value=${String(this._cameraCycleInterval)}
                  @change=${e=>{const t=parseInt(e.target.value,10);!isNaN(t)&&t>=3&&t<=60&&(this._cameraCycleInterval=t)}}
                />
              </div>
            </div>
          `:W}
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.camera_entity_order")}</span>
              <span class="section-desc">${oi("config.camera_entity_order_desc")}</span>
            </div>
            ${e.length>0?V`
              <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:i,total:e.length})}">
                ${i}/${e.length}
              </span>
            `:W}
          </header>

          ${0===e.length?V`
            <glass-empty-state variant="inline" .icon=${"mdi:cctv"} .title=${oi("config.camera_no_cameras")}></glass-empty-state>
          `:V`
            <div class="item-list">
              ${e.map((e,i)=>{const a=this._localDragIdx===i,s=this._localDropIdx===i,r=!t.has(e),o=this.hass?.states[e],n=o?.attributes?.friendly_name||e.split(".")[1],c=["item-row",a?"dragging":"",s?"drop-target":"",r?"":"disabled"].filter(Boolean).join(" ");return V`
                  <div class="item-card">
                    <div
                      class=${c}
                      draggable="true"
                      @dragstart=${()=>this._localDragStart(i)}
                      @dragover=${e=>this._localDragOver(i,e)}
                      @dragleave=${()=>this._localDragLeave()}
                      @drop=${e=>this._onDropCameraEntity(i,e)}
                      @dragend=${()=>this._localDragEnd()}
                    >
                      <glass-drag-handle></glass-drag-handle>
                      <div class="item-info">
                        <span class="item-name">${n}</span>
                        <span class="item-meta">${e}</span>
                      </div>
                      <glass-toggle
                        .checked=${r}
                        aria-label="${oi(r?"common.hide":"common.show")} ${n}"
                        @glass-toggle-change=${()=>this._toggleCameraVisible(e)}
                      ></glass-toggle>
                    </div>
                  </div>
                `})}
            </div>
          `}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}_renderRoomTab(){const e=this._cameraRoomEntities;return V`
      <div class="tab-panel" id="panel-camera_carousel-room">
        <glass-camera-carousel-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-camera-carousel-card>

        ${e.length>0?V`
          <div class="section-label">${oi("config.camera_list_title")} (${e.length})</div>
          <div class="section-desc">${oi("config.camera_list_banner")}</div>
          <div class="item-list">
            ${e.map((e,t)=>{const i=this._localDragIdx===t&&"room_cameras"===this._dragContext,a=this._localDropIdx===t&&"room_cameras"===this._dragContext,s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return V`
                <div class="item-card">
                  <div
                    class=${s}
                    draggable="true"
                    @dragstart=${()=>this._onRoomCameraDragStart(t)}
                    @dragover=${e=>this._onRoomCameraDragOver(t,e)}
                    @dragleave=${()=>{this._localDropIdx=null}}
                    @drop=${e=>this._onRoomCameraDrop(t,e)}
                    @dragend=${()=>this._onRoomCameraDragEnd()}
                  >
                    <glass-drag-handle></glass-drag-handle>
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <glass-toggle
                      .checked=${e.visible}
                      aria-label="${e.visible?oi("common.hide"):oi("common.show")} ${e.name}"
                      @glass-toggle-change=${()=>this._toggleRoomCameraVisibility(e.entityId)}
                    ></glass-toggle>
                  </div>
                </div>
              `})}
          </div>
        `:V`
          <div class="banner">
            <ha-icon .icon=${"mdi:cctv"}></ha-icon>
            <span>${oi("config.camera_no_cameras")}</span>
          </div>
        `}
      </div>
    `}}na([ge()],ca.prototype,"_cameraShowHeader"),na([ge()],ca.prototype,"_cameraAutoCycle"),na([ge()],ca.prototype,"_cameraCycleInterval"),na([ge()],ca.prototype,"_cameraEntityOrder"),na([ge()],ca.prototype,"_cameraHiddenEntities"),na([ge()],ca.prototype,"_cameraRoom"),na([ge()],ca.prototype,"_cameraRoomEntities"),na([ge()],ca.prototype,"_localDragIdx"),na([ge()],ca.prototype,"_localDropIdx"),na([ge()],ca.prototype,"_dragContext");try{customElements.define("config-tab-camera",ca)}catch{}var la=Object.defineProperty,da=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&la(t,i,r),r};class ha extends Ci{constructor(){super(...arguments),this._climateShowHeader=!0,this._climateDisplayMode="list",this._climateDashboardDisplayMode="list",this._climateDashboardEntities=[],this._climateRoom="",this._climateRoomEntities=[],this._saving=!1,this._localDragIdx=null,this._localDropIdx=null,this._dashboardLoaded=!1}static{this._AUTO_SAVE_KEYS=new Set(["_climateShowHeader","_climateDisplayMode","_climateDashboardDisplayMode","_climateDashboardEntities","_climateRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._climateRoom=this.areaId,this._loadRoomClimates()),!this.areaId&&!this._dashboardLoaded&&this.hass&&this.backend&&(this._dashboardLoaded=!0,this._loadDashboardClimates()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._climateShowHeader=t.show_header??!0,this._climateDisplayMode="normal"===t.display_mode?"normal":"list",this._climateDashboardDisplayMode="normal"===t.dashboard_display_mode?"normal":"list",this._climateDashboardEntities=t.dashboard_entities??[]}collectSaveData(){return{show_header:this._climateShowHeader,display_mode:this._climateDisplayMode,dashboard_display_mode:this._climateDashboardDisplayMode,dashboard_entities:this._climateDashboardEntities}}_canSave(){return!!this.backend&&!this._saving}async _performSave(){this._saving=!0;try{const e=this.collectSaveData();if(!this.areaId&&this._climateRoomEntities.length>0&&(e.dashboard_entities=this._climateRoomEntities.map(e=>e.entityId),e.hidden_entities=this._climateRoomEntities.filter(e=>!e.visible).map(e=>e.entityId)),await this.backend.send("set_climate_config",e),this._climateRoom&&this._climateRoomEntities.length>0){const e=new Set(this._climateRoomEntities.map(e=>e.entityId)),t=this._climateRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),i=this._climateRoomEntities.map(e=>e.entityId);await this._saveRoomEntities(this._climateRoom,e,t,i)}fe.emit("climate-config-changed",void 0)}finally{this._saving=!1}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.climate_card&&this.loadFromConfig(e.climate_card)}catch{}this._climateRoom?await this._loadRoomClimates():(this._dashboardLoaded=!1,await this._loadDashboardClimates())}}async _loadDashboardClimates(){if(!this.hass||!this.backend)return;const e=Object.keys(this.hass.areas??{}),t=[];for(const o of e)for(const e of fi(o,this.hass.entities,this.hass.devices))e.entity_id.startsWith("climate.")&&t.push(e.entity_id);for(const o of Object.keys(this.hass.states))o.startsWith("climate.")&&!t.includes(o)&&t.push(o);const i=this._climateDashboardEntities,a=new Set;try{const e=await this.backend.send("get_config");if(e?.climate_card?.hidden_entities)for(const t of e.climate_card.hidden_entities)a.add(t)}catch{}const s=new Map(i.map((e,t)=>[e,t])),r=[...t].sort((e,t)=>{const i=s.get(e)??999,a=s.get(t)??999;return i!==a?i-a:e.localeCompare(t)});this._climateRoomEntities=r.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i,visible:!a.has(e)}})}async _loadRoomClimates(){if(!this.hass||!this._climateRoom||!this.backend)return;const e=this._climateRoom,t=fi(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("climate.")).map(e=>e.entity_id);let i=[],a=[];try{const t=await this.backend.send("get_room",{area_id:e});i=t?.hidden_entities||[],a=t?.entity_order||[]}catch{}if(this._climateRoom!==e)return;const s=new Map(a.map((e,t)=>[e,t])),r=[...t].sort((e,t)=>{const i=s.get(e)??999,a=s.get(t)??999;return i!==a?i-a:e.localeCompare(t)});this._climateRoomEntities=r.map(e=>{const t=this.hass?.states[e],a=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:a,visible:!i.includes(e)}})}_onLocalDragStart(e){this._localDragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),this._localDropIdx=e}_onLocalDragLeave(){this._localDropIdx=null}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_onLocalDrop(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this._climateRoomEntities],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._climateRoomEntities=i,this._localDragIdx=null,this._localDropIdx=null}_toggleEntityVisibility(e){this._climateRoomEntities=this._climateRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}renderTab(){if(this._lang,!this.hass)return V`${W}`;const e=this._climateRoomEntities,t=e.filter(e=>e.visible).length,i=this.areaId?this._climateDisplayMode:this._climateDashboardDisplayMode,a=e=>{this.areaId?this._climateDisplayMode=e:this._climateDashboardDisplayMode=e};return V`
      <div class="tab-panel climate-tab" id="panel-climate">
        <glass-climate-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-climate-card>
        ${this.areaId?W:V`
          <div class="cfg-info">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            <span>${oi("config.climate_dashboard_info")}</span>
          </div>
        `}

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.climate_display_mode")}</span>
              <span class="section-desc">${this.areaId?oi("config.climate_display_mode_popup_desc"):oi("config.climate_display_mode_dashboard_desc")}</span>
            </div>
          </header>
          <div class="chip-group">
            <glass-chip
              size="sm"
              .icon=${"mdi:format-list-bulleted"}
              ?active=${"list"===i}
              @click=${()=>a("list")}
            >${oi("config.climate_mode_list")}</glass-chip>
            <glass-chip
              size="sm"
              .icon=${"mdi:gauge"}
              ?active=${"normal"===i}
              @click=${()=>a("normal")}
            >${oi("config.climate_mode_normal")}</glass-chip>
          </div>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.climate_show_header",descKey:"config.climate_show_header_desc",on:this._climateShowHeader,onToggle:()=>{this._climateShowHeader=!this._climateShowHeader}})}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi(this.areaId?"config.climate_room_entities":"config.climate_dashboard_entities")}</span>
              <span class="section-desc">${oi(this.areaId?"config.climate_room_entities_desc":"config.climate_dashboard_entities_desc")}</span>
            </div>
            ${e.length>0?V`
              <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:t,total:e.length})}">
                ${t}/${e.length}
              </span>
            `:W}
          </header>

          ${0===e.length?V`
            <glass-empty-state variant="inline" .icon=${"mdi:thermostat"} .title=${oi("config.climate_no_entities")}></glass-empty-state>
          `:V`
            <div class="item-list">
              ${e.map((e,t)=>{const i=this._localDragIdx===t,a=this._localDropIdx===t,s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return V`
                  <div class="item-card">
                    <div
                      class=${s}
                      draggable="true"
                      @dragstart=${()=>this._onLocalDragStart(t)}
                      @dragover=${e=>this._onLocalDragOver(t,e)}
                      @dragleave=${()=>this._onLocalDragLeave()}
                      @drop=${e=>this._onLocalDrop(t,e)}
                      @dragend=${()=>this._onLocalDragEnd()}
                    >
                      <glass-drag-handle></glass-drag-handle>
                      <div class="item-info">
                        <span class="item-name">${e.name}</span>
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                      <glass-toggle
                        .checked=${e.visible}
                        aria-label="${e.visible?oi("common.hide"):oi("common.show")} ${e.name}"
                        @glass-toggle-change=${()=>this._toggleEntityVisibility(e.entityId)}
                      ></glass-toggle>
                    </div>
                  </div>
                `})}
            </div>
          `}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}}da([ge()],ha.prototype,"_climateShowHeader"),da([ge()],ha.prototype,"_climateDisplayMode"),da([ge()],ha.prototype,"_climateDashboardDisplayMode"),da([ge()],ha.prototype,"_climateDashboardEntities"),da([ge()],ha.prototype,"_climateRoom"),da([ge()],ha.prototype,"_climateRoomEntities"),da([ge()],ha.prototype,"_localDragIdx"),da([ge()],ha.prototype,"_localDropIdx");try{customElements.define("config-tab-climate",ha)}catch{}const pa=["light","media_player","climate","fan","cover","camera","vacuum"],ga=new Set(["light","media_player","climate","cover","fan","camera"]),ua={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum-variant"},ma={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},camera:{name:"config.domain_camera",desc:"config.domain_camera_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};var _a=Object.defineProperty,fa=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&_a(t,i,r),r};const va=["light","cover","climate","fan","media_player","camera"];function ba(e){return ua[e]??"mdi:help-circle"}class ya extends Ci{constructor(){super(...arguments),this._unassignedEntities=[],this._unassignedEntitySearch="",this._unassignedEditingEntity=null,this._iconPopupEntity=null,this._iconSearch="",this._filter="all",this._collapsedDomains=new Set,this._iconList=[],this._iconLoading=!1,this._portalEl=null}updated(e){super.updated(e),e.has("hass")&&this.hass&&0===this._unassignedEntities.length&&this._loadEntities()}loadFromConfig(e){}collectSaveData(){return{}}_collectAllEntities(){if(!this.hass)return[];const e=this.hass.entities,t=this.hass.devices,i=this.hass.areas,a=[];for(const s of Object.values(e)){if(s.disabled_by||s.hidden_by)continue;const e=s.entity_id.split(".")[0];if(!va.includes(e))continue;const r=_i(s,t),o=this.hass.states[s.entity_id],n=o?.attributes?.friendly_name??s.entity_id,c=r?i[r]?.name??null:null;a.push({entityId:s.entity_id,name:n,domain:e,areaId:r,areaName:c,icon:s.icon??null})}return a.sort((e,t)=>{const i=e.areaId?1:0,a=t.areaId?1:0;if(i!==a)return i-a;const s=va.indexOf(e.domain)-va.indexOf(t.domain);return 0!==s?s:e.name.localeCompare(t.name)}),a}_loadEntities(){this._unassignedEntities=this._collectAllEntities(),this._unassignedEditingEntity=null,this._unassignedEntitySearch=""}async _assignEntityArea(e,t){if(this.hass)try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:e,area_id:t}),this._unassignedEntities=this._unassignedEntities.map(i=>i.entityId===e?{...i,areaId:t,areaName:this.hass?.areas[t]?.name??null}:i),this.dispatchEvent(new CustomEvent("entities-assigned",{bubbles:!0,composed:!0}))}catch{this._fireToast(!1)}}async _renameEntity(e,t){if(!this.hass)return;const i=t.trim();if(!i)return void(this._unassignedEditingEntity=null);const a=this._unassignedEntities.find(t=>t.entityId===e);if(a&&a.name===i)this._unassignedEditingEntity=null;else{try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:e,name:i}),this._unassignedEntities=this._unassignedEntities.map(t=>t.entityId===e?{...t,name:i}:t)}catch{this._fireToast(!1)}this._unassignedEditingEntity=null}}async _openIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),this._iconSearch="",this._iconPopupEntity=e)}async _loadIconList(){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim();return e?this._iconList.filter(t=>t.toLowerCase().includes(e)).slice(0,120):this._iconList.slice(0,120)}async _selectIcon(e){const t=this._iconPopupEntity;if(this._iconPopupEntity=null,!t||!this.hass)return;const i=this._unassignedEntities.find(e=>e.entityId===t);if(!i||i.icon!==(e||null))try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:t,icon:e||null}),this._unassignedEntities=this._unassignedEntities.map(i=>i.entityId===t?{...i,icon:e||null}:i)}catch{this._fireToast(!1)}}_showIconPortal(){if(!this._iconPopupEntity)return void this._removeIconPortal();const e=this._unassignedEntities.find(e=>e.entityId===this._iconPopupEntity),t=e?.icon??"",i=this._getFilteredIcons();this._portalEl||(this._portalEl=document.createElement("div"),document.body.appendChild(this._portalEl));const a=()=>{this._iconPopupEntity=null,this._removeIconPortal()},s=e=>{this._selectIcon(e),this._removeIconPortal()},r=e=>{this._iconSearch=e,this._showIconPortal()};this._portalEl.replaceChildren(),Object.assign(this._portalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}),this._portalEl.addEventListener("click",e=>{e.target===this._portalEl&&a()},{once:!0});const o=document.createElement("div");Object.assign(o.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const n=document.createElement("div");Object.assign(n.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const c=document.createElement("span");Object.assign(c.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),c.textContent=oi("config.unassigned_change_icon");const l=document.createElement("input");Object.assign(l.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),l.placeholder="mdi:...",l.value=this._iconSearch,l.addEventListener("input",()=>r(l.value)),n.appendChild(c),n.appendChild(l),o.appendChild(n);const d=document.createElement("div");Object.assign(d.style,{overflow:"auto",flex:"1",padding:"0.5rem",scrollbarWidth:"none"});const h=document.createElement("div");Object.assign(h.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const p=this._createIconBtn("mdi:cancel",""===t,.4);p.addEventListener("click",()=>s("")),h.appendChild(p);for(const g of i){const e=this._createIconBtn(g,g===t,1);e.addEventListener("click",()=>s(g)),h.appendChild(e)}if(0===i.length&&this._iconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=oi("config.title_no_icons_found"),h.appendChild(e)}d.appendChild(h),o.appendChild(d),this._portalEl.appendChild(o),l.focus()}_createIconBtn(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",border:t?"2px solid rgba(129,140,248,0.6)":"1px solid rgba(255,255,255,0.06)",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)",cursor:"pointer",color:"rgba(255,255,255,0.88)",padding:"0"});const s=document.createElement("ha-icon");return s.icon=e,s.style.cssText=`--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${i};`,a.appendChild(s),a}_removeIconPortal(){this._portalEl&&(this._portalEl.remove(),this._portalEl=null)}disconnectedCallback(){super.disconnectedCallback(),this._removeIconPortal()}renderTab(){if(this._lang,!this.hass)return V`${W}`;const e=this._unassignedEntities,t=Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name)),i=this._unassignedEntitySearch.toLowerCase(),a=e.filter(e=>!e.areaId).length,s=e.length,r="orphans"===this._filter?e.filter(e=>!e.areaId):e,o=i?r.filter(e=>e.name.toLowerCase().includes(i)||e.entityId.toLowerCase().includes(i)):r,n=new Map;for(const l of o){const e=n.get(l.domain)??[];e.push(l),n.set(l.domain,e)}const c=a>0;return V`
      <div class="tab-panel unassigned-tab" id="panel-unassigned">
        <div class="cfg-info ${c?"warn":""}">
          <ha-icon .icon=${c?"mdi:alert-circle-outline":"mdi:information-outline"}></ha-icon>
          <span>${c?oi("config.unassigned_info_warn",{count:String(a)}):oi("config.unassigned_info_ok")}</span>
        </div>

        ${0===e.length?V`
          <glass-empty-state variant="inline" .icon=${"mdi:help-circle-outline"} .title=${oi("config.unassigned_no_entities")}></glass-empty-state>
        `:V`
          <section class="cfg-section">
            <header class="cfg-section-head">
              <span class="cfg-section-num">1</span>
              <div class="cfg-section-text">
                <span class="section-label">${oi("config.unassigned_list_title")}</span>
                <span class="section-desc">${oi("config.unassigned_list_desc")}</span>
              </div>
              ${a>0?V`
                <span class="cfg-section-count" aria-label="${oi("config.unassigned_orphan_count_aria",{count:a})}">
                  ${a}
                </span>
              `:W}
            </header>

          <div class="ua-toolbar">
            <glass-form-input
              type="search"
              class="ua-search-input"
              placeholder="${oi("config.search_entity")}"
              aria-label="${oi("config.search_entity")}"
              .value=${this._unassignedEntitySearch}
              @glass-input=${e=>{this._unassignedEntitySearch=e.detail.value}}
            ></glass-form-input>
            <div class="chip-group ua-filter-chips" role="tablist">
              <glass-chip
                size="sm"
                ?active=${"all"===this._filter}
                @click=${()=>{this._filter="all"}}
              >
                ${oi("config.unassigned_filter_all")}
                <span class="chip-count">${s}</span>
              </glass-chip>
              <glass-chip
                class="${a>0?"has-warn":""}"
                size="sm"
                active-color=${a>0?"warning":"accent"}
                ?active=${"orphans"===this._filter}
                @click=${()=>{this._filter="orphans"}}
              >
                ${oi("config.unassigned_filter_orphans")}
                <span class="chip-count">${a}</span>
              </glass-chip>
            </div>
          </div>

          ${0===o.length?V`
            <glass-empty-state
              variant="inline"
              .icon=${"orphans"!==this._filter||i?"mdi:magnify":"mdi:check-circle-outline"}
              .title=${"orphans"!==this._filter||i?oi("config.unassigned_no_results"):oi("config.unassigned_all_assigned")}
            ></glass-empty-state>
          `:W}

          ${[...n.entries()].map(([e,i])=>{const a=this._collapsedDomains.has(e);return V`
            <button
              class="ua-domain-head ${a?"collapsed":""}"
              type="button"
              aria-expanded=${a?"false":"true"}
              @click=${()=>{const t=new Set(this._collapsedDomains);t.has(e)?t.delete(e):t.add(e),this._collapsedDomains=t}}
            >
              <ha-icon class="ua-domain-chev" .icon=${"mdi:chevron-down"}></ha-icon>
              <ha-icon class="ua-domain-icon" .icon=${ba(e)}></ha-icon>
              <span class="ua-domain-label">${function(e){const t=ma[e];return t?oi(t.name):e}(e)}</span>
              <span class="ua-domain-count">${i.length}</span>
            </button>
            <div class="ua-list ${a?"collapsed":""}">
              <div class="ua-list-inner">
              ${i.map(e=>{const i=this._unassignedEditingEntity===e.entityId,a=t.map(e=>({value:e.area_id,label:e.name,icon:e.icon||"mdi:home"}));return V`
                  <div class="item-card pw-ua-card">
                    <div class="item-row">
                      <glass-icon-button
                        size="xs"
                        .icon=${e.icon||ba(e.domain)}
                        title="${oi("config.unassigned_change_icon")}"
                        aria-label="${oi("config.unassigned_change_icon")}: ${e.name}"
                        @click=${async()=>{await this._openIconPopup(e.entityId),this._showIconPortal()}}
                      ></glass-icon-button>
                      <div class="item-info">
                        ${i?V`
                          <input
                            type="text"
                            class="entity-rename-input"
                            .value=${e.name}
                            aria-label="${oi("config.unassigned_rename")}"
                            @blur=${t=>{const i=t.target;i.dataset.cancelled||this._renameEntity(e.entityId,i.value)}}
                            @keydown=${e=>{"Enter"===e.key&&e.target.blur(),"Escape"===e.key&&(e.target.dataset.cancelled="1",this._unassignedEditingEntity=null)}}
                            @focus=${e=>e.target.select()}
                          />
                        `:V`
                          <button class="item-name pw-ua-name" type="button"
                            @click=${()=>{this._unassignedEditingEntity=e.entityId,this.updateComplete.then(()=>{const e=this.shadowRoot?.querySelector(".entity-rename-input");e?.focus()})}}
                            title="${oi("config.unassigned_rename")}"
                          >${e.name}</button>
                        `}
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                    </div>
                    <glass-dropdown
                      class="pw-ua-area-dropdown ${e.areaId?"":"pw-ua-unassigned"}"
                      .items=${a}
                      .value=${e.areaId??""}
                      .label=${oi("config.unassigned_select_area")}
                      icon=${e.areaId?"mdi:home":"mdi:alert-circle-outline"}
                      searchable
                      search-placeholder=${oi("config.search_entity")}
                      empty-text=${oi("config.unassigned_no_results")}
                      @glass-dropdown-change=${t=>this._assignEntityArea(e.entityId,t.detail.value)}
                    ></glass-dropdown>
                  </div>
                `})}
              </div>
            </div>
          `})}
          </section>
        `}

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this._loadEntities()}>${oi("common.reset")}</glass-button>
        </div>
      </div>

    `}}fa([ge()],ya.prototype,"_unassignedEntities"),fa([ge()],ya.prototype,"_unassignedEntitySearch"),fa([ge()],ya.prototype,"_unassignedEditingEntity"),fa([ge()],ya.prototype,"_iconPopupEntity"),fa([ge()],ya.prototype,"_iconSearch"),fa([ge()],ya.prototype,"_filter"),fa([ge()],ya.prototype,"_collapsedDomains");try{customElements.define("config-tab-unassigned",ya)}catch{}var wa=Object.defineProperty,xa=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&wa(t,i,r),r};const ka=[{title:"Réunion équipe",time:"14:00 - 15:00",cal:"travail",now:!0},{title:"RDV médecin",time:"16:30",cal:"perso"},{title:"Anniversaire Léa",time:null,cal:"anniversaires",allday:!0}];class $a extends Ci{constructor(){super(...arguments),this._calendarShowHeader=!0,this._calendarHiddenEntities=[]}static{this._AUTO_SAVE_KEYS=new Set(["_calendarShowHeader","_calendarHiddenEntities"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._calendarShowHeader=t.show_header??!0,this._calendarHiddenEntities=t.hidden_entities??[]}collectSaveData(){return{show_header:this._calendarShowHeader,hidden_entities:this._calendarHiddenEntities}}async _performSave(){await this.backend.send("set_calendar_card",this.collectSaveData()),fe.emit("calendar-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.calendar_card&&this.loadFromConfig(e.calendar_card)}catch{}}_toggleCalendar(e){const t=new Set(this._calendarHiddenEntities);t.has(e)?t.delete(e):t.add(e),this._calendarHiddenEntities=[...t]}renderTab(){this._lang;const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("calendar.")).sort().map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i}}):[],t=new Set(this._calendarHiddenEntities),i=e.length-e.filter(e=>t.has(e.entityId)).length;return V`
      <div class="tab-panel calendar-tab" id="panel-calendar">
        <glass-calendar-card .hass=${this.hass} .events=${ka} config-preview></glass-calendar-card>
        <div class="cfg-info">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${oi("config.calendar_dashboard_info")}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.calendar_show_header",descKey:"config.calendar_show_header_desc",on:this._calendarShowHeader,onToggle:()=>{this._calendarShowHeader=!this._calendarShowHeader}})}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.calendar_entities")}</span>
              <span class="section-desc">${oi("config.calendar_entities_desc")}</span>
            </div>
            ${e.length>0?V`
              <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:i,total:e.length})}">
                ${i}/${e.length}
              </span>
            `:W}
          </header>

          ${0===e.length?V`
            <glass-empty-state variant="inline" .icon=${"mdi:calendar-remove-outline"} .title=${oi("config.calendar_no_entities")}></glass-empty-state>
          `:V`
            <div class="feature-list">
              ${e.map(e=>{const i=!t.has(e.entityId);return V`
                  <button
                    class="feature-row"
                    role="switch"
                    aria-checked=${i?"true":"false"}
                    aria-label="${oi(i?"common.hide":"common.show")} ${e.name}"
                    @click=${()=>this._toggleCalendar(e.entityId)}
                  >
                    <div class="feature-icon">
                      <ha-icon .icon=${"mdi:calendar-month"}></ha-icon>
                    </div>
                    <div class="feature-text">
                      <div class="feature-name">${e.name}</div>
                      <div class="feature-desc">${e.entityId}</div>
                    </div>
                    <glass-toggle presentation .checked=${i}></glass-toggle>
                  </button>
                `})}
            </div>
          `}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}}xa([ge()],$a.prototype,"_calendarShowHeader"),xa([ge()],$a.prototype,"_calendarHiddenEntities");try{customElements.define("config-tab-calendar",$a)}catch{}var Sa=Object.defineProperty,Ca=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Sa(t,i,r),r};class Ia extends Ci{constructor(){super(...arguments),this._vacuumShowHeader=!0,this._vacuumEntity=""}static{this._AUTO_SAVE_KEYS=new Set(["_vacuumShowHeader","_vacuumEntity"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._vacuumShowHeader=t.show_header??!0,this._vacuumEntity=t.entity??""}collectSaveData(){return{show_header:this._vacuumShowHeader,entity:this._vacuumEntity}}async _performSave(){await this.backend.send("set_vacuum_card",this.collectSaveData()),fe.emit("vacuum-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.vacuum_card&&this.loadFromConfig(e.vacuum_card)}catch{}}_selectEntity(e){this._vacuumEntity=e===this._vacuumEntity?"":e}renderTab(){this._lang;const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("vacuum.")).sort().map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i}}):[],t=this._vacuumEntity||(e[0]?.entityId??""),i=t||"vacuum.placeholder";return V`
      <div class="tab-panel vacuum-tab" id="panel-vacuum">
        ${t?V`<glass-vacuum-card
              .hass=${this.hass}
              .config=${{type:"custom:glass-vacuum-card",entity:i}}
              config-preview
            ></glass-vacuum-card>`:W}

        <div class="cfg-info">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${oi("config.vacuum_dashboard_info")}</span>
        </div>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">1</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.display")}</span>
            </div>
          </header>
          <div class="feature-list">
            ${this._renderFeatureRow({icon:"mdi:page-layout-header",nameKey:"config.vacuum_show_header",descKey:"config.vacuum_show_header_desc",on:this._vacuumShowHeader,onToggle:()=>{this._vacuumShowHeader=!this._vacuumShowHeader}})}
          </div>
        </section>

        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">2</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.vacuum_entity")}</span>
              <span class="section-desc">${oi("config.vacuum_entity_desc")}</span>
            </div>
          </header>

          ${0===e.length?V`
            <glass-empty-state variant="inline" .icon=${"mdi:robot-vacuum-variant"} .title=${oi("config.vacuum_no_entities")}></glass-empty-state>
          `:V`
            <div class="feature-list">
              ${e.map(e=>{const i=e.entityId===t;return V`
                  <button
                    class="feature-row"
                    role="radio"
                    aria-checked=${i?"true":"false"}
                    aria-label="${e.name}"
                    @click=${()=>this._selectEntity(e.entityId)}
                  >
                    <div class="feature-icon">
                      <ha-icon .icon=${"mdi:robot-vacuum-variant"}></ha-icon>
                    </div>
                    <div class="feature-text">
                      <div class="feature-name">${e.name}</div>
                      <div class="feature-desc">${e.entityId}</div>
                    </div>
                    <glass-toggle presentation .checked=${i}></glass-toggle>
                  </button>
                `})}
            </div>
          `}
        </section>

        <div class="save-bar">
          <glass-button variant="ghost" @click=${()=>this.reload()}>${oi("common.reset")}</glass-button>
        </div>
      </div>
    `}}Ca([ge()],Ia.prototype,"_vacuumShowHeader"),Ca([ge()],Ia.prototype,"_vacuumEntity");try{customElements.define("config-tab-vacuum",Ia)}catch{}var Ea=Object.defineProperty,za=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Ea(t,i,r),r};class Da extends ne{constructor(){super(...arguments),this.rooms=[],this._dragIdx=null,this._dropIdx=null,this._popupAutoClose=0,this._configLoaded=!1,this._saveScheduler=xi()}createRenderRoot(){return this}updated(e){super.updated(e),!this._configLoaded&&this.backend&&(this._configLoaded=!0,this._loadConfig())}disconnectedCallback(){super.disconnectedCallback(),this._saveScheduler.cancel()}async _loadConfig(){if(this.backend)try{const e=await this.backend.send("get_config");this._popupAutoClose=e?.navbar?.popup_auto_close??0}catch{}}_onAutoCloseChange(e){this._popupAutoClose=parseInt(e.target.value,10),this._saveScheduler.schedule(()=>this._saveAutoClose())}async _saveAutoClose(){if(this.backend)try{await this.backend.send("set_navbar",{popup_auto_close:this._popupAutoClose}),fe.emit("navbar-config-changed",void 0),this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!0},bubbles:!0,composed:!0}))}catch{this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!1},bubbles:!0,composed:!0}))}}_onDragStart(e){this._dragIdx=e}_onDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDrop(e,t){if(t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e){const t=[...this.rooms],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this.dispatchEvent(new CustomEvent("rooms-reordered",{detail:{rooms:t},bubbles:!0,composed:!0}))}this._dragIdx=null,this._dropIdx=null}_toggleVisibility(e,t){t.stopPropagation(),t.preventDefault(),this.dispatchEvent(new CustomEvent("room-visibility-toggle",{detail:{areaId:e.areaId,visible:!e.visible},bubbles:!0,composed:!0}))}render(){if(!this.rooms.length)return V`
        <glass-empty-state variant="inline" .icon=${"mdi:home-search-outline"} .title=${oi("config.no_rooms")}></glass-empty-state>
      `;const e=this.rooms.filter(e=>e.visible).length;let t=0;return V`
      <div class="cfg-info">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        <span>${oi("config.rooms_dashboard_info")}</span>
      </div>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.rooms_list_title")}</span>
            <span class="section-desc">${oi("config.rooms_list_desc")}</span>
          </div>
          <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:e,total:this.rooms.length})}">
            ${e}/${this.rooms.length}
          </span>
        </header>

        <ol class="room-list" role="list">
          ${this.rooms.map((e,i)=>{const a=this._dragIdx===i,s=this._dropIdx===i&&null!==this._dragIdx&&this._dragIdx!==i;e.visible&&t++;const r=e.visible?t:0;return V`
              <li
                class="room-row ${e.visible?"":"off"} ${a?"dragging":""} ${s?"drop-target":""}"
                draggable="true"
                @dragstart=${()=>this._onDragStart(i)}
                @dragover=${e=>this._onDragOver(i,e)}
                @dragleave=${()=>this._onDragLeave()}
                @drop=${e=>this._onDrop(i,e)}
                @dragend=${()=>this._onDragEnd()}
              >
                <span class="room-row-grip" aria-hidden="true">
                  <ha-icon .icon=${"mdi:drag-vertical"}></ha-icon>
                </span>
                <span class="room-row-num" aria-hidden="true">${e.visible?r:"·"}</span>
                <button
                  class="room-row-main"
                  type="button"
                  @click=${()=>this.dispatchEvent(new CustomEvent("room-select",{detail:e.areaId,bubbles:!0,composed:!0}))}
                  aria-label="${oi("config.room_open_aria",{name:e.name})}"
                >
                  <span class="room-row-icon">
                    <ha-icon .icon=${e.icon||"mdi:home"}></ha-icon>
                  </span>
                  <span class="room-row-name">${e.name}</span>
                  <ha-icon class="room-row-chev" .icon=${"mdi:chevron-right"}></ha-icon>
                </button>
                <button
                  class="room-row-toggle ${e.visible?"on":""}"
                  @click=${t=>this._toggleVisibility(e,t)}
                  role="switch"
                  aria-checked=${e.visible?"true":"false"}
                  aria-label=${e.visible?oi("config.hide_room"):oi("config.show_room")}
                ></button>
              </li>
            `})}
        </ol>
      </section>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.popup_auto_close")}</span>
            <span class="section-desc">${oi("config.popup_auto_close_desc")}</span>
          </div>
        </header>
        <div class="feature-list">
          <div class="range-row autoclose-row">
            <div class="feature-icon autoclose-icon">
              <ha-icon .icon=${"mdi:timer-outline"}></ha-icon>
            </div>
            <input
              type="range"
              class="range-input"
              min="0"
              max="120"
              step="1"
              .value=${String(this._popupAutoClose)}
              @input=${e=>this._onAutoCloseChange(e)}
            />
            <span class="range-value autoclose-value">${0===this._popupAutoClose?oi("config.popup_auto_close_off"):`${this._popupAutoClose}s`}</span>
          </div>
        </div>
      </section>
    `}}za([pe({attribute:!1})],Da.prototype,"hass"),za([pe({attribute:!1})],Da.prototype,"rooms"),za([pe({attribute:!1})],Da.prototype,"backend"),za([ge()],Da.prototype,"_dragIdx"),za([ge()],Da.prototype,"_dropIdx"),za([ge()],Da.prototype,"_popupAutoClose"),customElements.define("config-room-list",Da);var Pa=Object.defineProperty,Ta=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Pa(t,i,r),r};const La={light:"mdi:lightbulb",switch:"mdi:toggle-switch",vacuum:"mdi:robot-vacuum-variant",cover:"mdi:window-shutter",climate:"mdi:thermostat",fan:"mdi:fan",media_player:"mdi:speaker",scene:"mdi:palette",script:"mdi:script-text",automation:"mdi:robot",input_boolean:"mdi:toggle-switch",input_select:"mdi:form-dropdown",button:"mdi:gesture-tap-button",lock:"mdi:lock",camera:"mdi:cctv",alarm_control_panel:"mdi:shield-home"},Aa={light:"light.toggle",switch:"switch.toggle",vacuum:"vacuum.start",cover:"cover.toggle",climate:"climate.turn_on",fan:"fan.toggle",media_player:"media_player.media_play_pause",scene:"scene.turn_on",script:"script.turn_on",automation:"automation.trigger",input_boolean:"input_boolean.toggle",button:"button.press",lock:"lock.lock",camera:"camera.turn_on",alarm_control_panel:"alarm_control_panel.alarm_arm_home"},Ma=[{id:"light",label:"Lumières",icon:"mdi:lightbulb-group",domains:["light"],color:Nt.rgb},{id:"cover",label:"Volets",icon:"mdi:window-shutter",domains:["cover"],color:Vt.rgb},{id:"climate",label:"Climat",icon:"mdi:thermostat",domains:["climate"],color:Bt.rgb},{id:"media",label:"Media",icon:"mdi:speaker",domains:["media_player"],color:Ut.rgb},{id:"fan",label:"Ventilateurs",icon:"mdi:fan",domains:["fan"],color:Wt.rgb},{id:"camera",label:"Caméras",icon:"mdi:cctv",domains:["camera"],color:Yt.rgb}];class Ra extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._openSections=new Set,this._sections=[],this._scenes=[],this._tempEntity="",this._humidityEntity="",this._tempHigh=null,this._tempLow=null,this._humidityThreshold=null,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._presenceEntity="",this._showPresence=!1,this._sortByLights=!0,this._buttons=[],this._availableTempEntities=[],this._availableHumidityEntities=[],this._availablePresenceEntities=[],this._btnIconPortalIdx=null,this._btnIconSearch="",this._btnAdvancedOpen=new Set,this._btnIconList=[],this._btnIconLoading=!1,this._entityCache=null,this._serviceCache=null,this._dragIdx=null,this._dropIdx=null,this._dragContext=null,this._loaded=!1,this._saveScheduler=xi(),this._lastIconTriggerEl=null,this._onDocKeyDown=e=>{if("Escape"===e.key&&null!==this._btnIconPortalIdx&&(this._btnIconPortalIdx=null,this._removeIconPortal(),this._lastIconTriggerEl)){try{this._lastIconTriggerEl.focus()}catch{}this._lastIconTriggerEl=null}},this._btnIconPortalEl=null,this._portalClickHandler=null}createRenderRoot(){return this}updated(e){super.updated(e),(e.has("areaId")||e.has("hass"))&&(this._loaded=!1,this._openSections=new Set),!this._loaded&&this.hass&&this.areaId&&(this._loaded=!0,this._loadRoomConfig())}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._onDocKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this._saveScheduler.cancel(),this._removeIconPortal(),this._btnIconPortalIdx=null,document.removeEventListener("keydown",this._onDocKeyDown)}async _loadRoomConfig(){if(!this.hass||!this.areaId)return;const e=fi(this.areaId,this.hass.entities,this.hass.devices);let t=null,i=new Set,a=[];try{if(!this.backend)throw new Error("No backend");const e=await this.backend.send("get_room",{area_id:this.areaId});e&&(t=e.card_order.length>0?e.card_order:null,i=new Set(e.hidden_scenes??[]),a=e.scene_order??[],this._tempEntity=e.temperature_entity??"",this._humidityEntity=e.humidity_entity??"",this._tempHigh=e.temp_high??null,this._tempLow=e.temp_low??null,this._humidityThreshold=e.humidity_threshold??null,this._showLights=e.show_lights??!0,this._showTemperature=e.show_temperature??!0,this._showHumidity=e.show_humidity??!0,this._presenceEntity=e.presence_entity??"",this._showPresence=e.show_presence??!1,this._sortByLights=e.sort_by_lights??!0,this._buttons=(e.buttons??[]).map(e=>({icon:e.icon??"",label:e.label??"",service:e.service??"",data_json:e.data&&Object.keys(e.data).length>0?JSON.stringify(e.data,null,2):""})))}catch{}const s=this.hass;this._availableTempEntities=[],this._availableHumidityEntities=[],this._availablePresenceEntities=[];for(const h of e){const e=s.states[h.entity_id],t=e?.attributes?.device_class,i=e?.attributes?.friendly_name||h.entity_id.split(".")[1];h.entity_id.startsWith("sensor.")&&("temperature"===t&&this._availableTempEntities.push({id:h.entity_id,name:i}),"humidity"===t&&this._availableHumidityEntities.push({id:h.entity_id,name:i})),!h.entity_id.startsWith("binary_sensor.")||"presence"!==t&&"occupancy"!==t&&"motion"!==t||this._availablePresenceEntities.push({id:h.entity_id,name:i})}const r=new Map;for(const h of e){const e=h.entity_id.split(".")[0];r.set(e,(r.get(e)||0)+1)}const o=t?[...t]:[...pa],n=new Set(o);for(const h of r.keys())!n.has(h)&&ua[h]&&o.push(h);this._sections=o.map(e=>{const i=Ma.find(t=>t.domains.includes(e)||t.id===e);if(!i)return null;const a=i.domains.reduce((e,t)=>e+(r.get(t)||0),0);return 0!==a&&ga.has(e)?{...i,visible:!t||t.includes(e),count:a}:null}).filter(e=>null!==e);const c=e.filter(e=>e.entity_id.startsWith("scene.")),l=new Map;a.forEach((e,t)=>l.set(e,t));const d=c.map(e=>{const t=s.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!i.has(e.entity_id)}});d.sort((e,t)=>{const i=l.get(e.entityId),a=l.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._scenes=d}_scheduleSave(){this._saveScheduler.schedule(()=>this._save())}async _save(){if(!this.backend||!this.areaId)return;const e=/^[a-z_][a-z0-9_]*\.[a-z_][a-z0-9_]*$/,t=this._buttons.filter(t=>e.test(t.service)).map(e=>{let t={};if(e.data_json.trim())try{const i=JSON.parse(e.data_json);i&&"object"==typeof i&&!Array.isArray(i)&&(t=i)}catch{}return{icon:e.icon,label:e.label,service:e.service,data:t}});try{await this.backend.send("set_room",{area_id:this.areaId,card_order:this._sections.filter(e=>e.visible).map(e=>e.id),hidden_scenes:this._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:this._scenes.map(e=>e.entityId),temperature_entity:this._tempEntity||null,humidity_entity:this._humidityEntity||null,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold,show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity,presence_entity:this._presenceEntity||null,show_presence:this._showPresence,sort_by_lights:this._sortByLights,buttons:t}),fe.emit("room-config-changed",{areaId:this.areaId}),this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!0},bubbles:!0,composed:!0}))}catch{this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!1},bubbles:!0,composed:!0}))}}_toggleSectionVisible(e){if(this._sections=this._sections.map(t=>t.id===e?{...t,visible:!t.visible}:t),!this._sections.find(t=>t.id===e)?.visible){const t=new Set(this._openSections);t.delete(e),this._openSections=t}this._scheduleSave()}_toggleSceneVisible(e){this._scenes=this._scenes.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),this._scheduleSave()}_toggleSection(e){const t=new Set(this._openSections);t.has(e)?t.delete(e):t.add(e),this._openSections=t}_onDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=null}_onDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);if("sections"===this._dragContext){const t=[...this._sections],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._sections=t,this._scheduleSave()}else if("scenes"===this._dragContext){const t=[...this._scenes],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._scenes=t,this._scheduleSave()}this._dragIdx=null,this._dropIdx=null}render(){if(!this._sections.length)return V`
        <glass-empty-state variant="inline" .icon=${"mdi:home-search-outline"} .title=${oi("config.room_no_entities")}></glass-empty-state>
      `;const e=this._sections.filter(e=>e.visible).length;return V`
      <div class="cfg-info">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        <span>${oi("config.room_detail_info")}</span>
      </div>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.room_cards_title")}</span>
            <span class="section-desc">${oi("config.room_cards_desc")}</span>
          </div>
          <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:e,total:this._sections.length})}">
            ${e}/${this._sections.length}
          </span>
        </header>
        <div class="room-sections">
          ${this._sections.map((e,t)=>this._renderSectionRow(e,t))}
        </div>
      </section>

      ${this._renderIndicators()}
      ${this._renderSensors()}
      ${this._renderButtonsSection()}
      ${this._renderThresholds()}

      ${this._scenes.length>0?V`
        <section class="cfg-section">
          <header class="cfg-section-head">
            <span class="cfg-section-num">6</span>
            <div class="cfg-section-text">
              <span class="section-label">${oi("config.popup_scenes")}</span>
            </div>
          </header>
          <div class="scene-chips">
            ${this._scenes.map((e,t)=>V`
              <button
                class="scene-chip ${e.visible?"on":""} ${this._dragIdx===t&&"scenes"===this._dragContext?"dragging":""} ${this._dropIdx===t&&"scenes"===this._dragContext?"drop-target":""}"
                draggable="true"
                @click=${()=>this._toggleSceneVisible(e.entityId)}
                @dragstart=${e=>{e.stopPropagation(),this._onDragStart(t,"scenes")}}
                @dragover=${e=>{e.preventDefault(),e.stopPropagation(),null!==this._dragIdx&&this._dragIdx!==t&&(this._dropIdx=t)}}
                @dragleave=${()=>{this._dropIdx=null}}
                @drop=${e=>{e.preventDefault(),e.stopPropagation(),this._onDrop(t,e)}}
                @dragend=${()=>this._onDragEnd()}
                aria-label="${e.visible?oi("common.hide"):oi("common.show")} ${e.name}"
              >
                <ha-icon class="chip-drag" .icon=${"mdi:drag"}></ha-icon>
                <ha-icon .icon=${"mdi:palette"}></ha-icon>
                <span>${e.name}</span>
              </button>
            `)}
          </div>
        </section>
      `:W}
    `}_renderSectionRow(e,t){const i=this._openSections.has(e.id)&&e.visible,a=this._dragIdx===t&&"sections"===this._dragContext,s=this._dropIdx===t&&"sections"===this._dragContext;return V`
      <div
        class="${a?"dragging":""} ${s?"drop-target":""}"
        draggable="true"
        @dragstart=${()=>this._onDragStart(t,"sections")}
        @dragover=${e=>this._onDragOver(t,e)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${e=>this._onDrop(t,e)}
        @dragend=${()=>this._onDragEnd()}
      >
        <div class="section-header-wrap ${e.visible?"":"off"}">
          <glass-drag-handle></glass-drag-handle>
          <button class="section-header" @click=${()=>{e.visible&&this._toggleSection(e.id)}}
            aria-expanded=${i?"true":"false"}>
            <div class="section-header-icon" style="--icon-color:${e.color};">
              <ha-icon .icon=${e.icon}></ha-icon>
            </div>
            <span class="section-title">${e.label}</span>
            <glass-chevron ?open=${i} size="md" tone="muted"></glass-chevron>
          </button>
          <glass-toggle
            .checked=${e.visible}
            aria-label="${e.visible?oi("common.hide"):oi("common.show")} ${e.label}"
            @glass-toggle-change=${()=>this._toggleSectionVisible(e.id)}
          ></glass-toggle>
        </div>
        <div class="fold-sep ${i?"visible":""}" style="--fold-color:rgb(${e.color})"></div>
        <div class="section-fold ${i?"open":""}">
          <div class="section-fold-inner" aria-hidden=${i?"false":"true"}>
            <div class="section-content">
              ${i?this._renderSection(e):W}
            </div>
          </div>
        </div>
      </div>
    `}_renderButtonsSection(){return V`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">4</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.room_buttons_title")}</span>
            <span class="section-desc">${oi("config.room_buttons_desc")}</span>
          </div>
          <span class="cfg-section-count">${this._buttons.length}/${3}</span>
        </header>
        <div class="room-buttons-list">
          ${this._buttons.map((e,t)=>this._renderButtonRow(e,t))}
          ${this._buttons.length<3?V`
            <button class="room-button-add" type="button" @click=${()=>this._addButton()}>
              <ha-icon .icon=${"mdi:plus-circle-outline"}></ha-icon>
              <span>${oi("config.room_button_add")}</span>
            </button>
          `:W}
        </div>
      </section>
    `}_entityFromData(e){if(!e.trim())return"";try{const t=JSON.parse(e);if(t&&"object"==typeof t&&"string"==typeof t.entity_id)return t.entity_id}catch{}return""}_filterEntities(e){if(!this.hass)return[];const t=e.toLowerCase().trim();if(this._entityCache&&this._entityCache.hassRef===this.hass.states&&this._entityCache.query===t)return this._entityCache.result;const i=Object.keys(this.hass.states).map(e=>({id:e,name:this.hass.states[e]?.attributes?.friendly_name||e.split(".")[1]||e})).filter(e=>!t||e.id.includes(t)||e.name.toLowerCase().includes(t)).sort((e,t)=>e.name.localeCompare(t.name)).slice(0,80);return this._entityCache={hassRef:this.hass.states,query:t,result:i},i}_filterServices(e,t){if(!e||!this.hass?.services?.[e])return[];const i=t.toLowerCase().trim();if(this._serviceCache&&this._serviceCache.hassRef===this.hass.services&&this._serviceCache.domain===e&&this._serviceCache.query===i)return this._serviceCache.result;const a=Object.keys(this.hass.services[e]).filter(e=>!i||e.includes(i)).sort().slice(0,40);return this._serviceCache={hassRef:this.hass.services,domain:e,query:i,result:a},a}_renderButtonRow(e,t){const i=this._entityFromData(e.data_json),a=i.split(".")[0],s=i?this.hass?.states?.[i]:void 0,r=s?.attributes?.friendly_name||"",o=this._filterEntities("").map(e=>({value:e.id,label:e.name,icon:this.hass?.states?.[e.id]?.attributes?.icon||La[e.id.split(".")[0]]||"mdi:cube-outline"})),n=a?this._filterServices(a,"").map(e=>{const t=`${a}.${e}`;return{value:t,label:t}}):[],c=e.icon||a&&La[a]||"",l=s?.attributes?.icon,d=l||a&&La[a]||"mdi:cube-outline",h=a?`${a}.${Aa[a]?.split(".")[1]??"toggle"}`:oi("config.room_button_service_disabled");return V`
      <div class="room-button-row">
        <glass-dropdown
          class="room-button-entity-dropdown"
          .items=${o}
          .value=${i}
          .label=${i?r||i:oi("config.room_button_entity_placeholder")}
          .icon=${d??""}
          searchable
          search-placeholder=${oi("config.room_button_entity_search")}
          empty-text=${oi("config.room_button_entity_empty")}
          aria-label=${oi("config.room_button_entity")}
          @glass-dropdown-change=${e=>this._pickEntity(t,e.detail.value)}
        ></glass-dropdown>

        <div class="room-button-label-row">
          <button
            type="button"
            class="room-button-icon-trigger"
            @click=${e=>{this._lastIconTriggerEl=e.currentTarget,this._openButtonIconPortal(t)}}
            aria-label="${oi("config.room_button_icon_pick")}"
            title="${c?e.icon?e.icon:oi("config.room_button_icon_auto",{icon:c}):oi("config.room_button_icon_pick")}"
          >
            <ha-icon class="room-button-icon-preview" .icon=${c||"mdi:image-plus-outline"}></ha-icon>
          </button>
          <glass-form-input
            type="text"
            class="room-button-input"
            placeholder=${r||oi("config.room_button_label_placeholder")}
            .value=${e.label}
            @glass-input=${e=>this._updateButton(t,"label",e.detail.value)}
          ></glass-form-input>
        </div>

        <details
          class="room-button-advanced"
          ?open=${this._btnAdvancedOpen.has(t)||!i&&(!!e.service||!!e.data_json)}
          @toggle=${e=>this._onAdvancedToggle(t,e.target.open)}
        >
          <summary>${oi("config.room_button_advanced")}</summary>

          <glass-dropdown
            .items=${n}
            .value=${e.service}
            .label=${e.service||h}
            icon="mdi:flash-outline"
            ?disabled=${!a}
            ?searchable=${!!a}
            search-placeholder=${oi("config.room_button_service_search")}
            empty-text=${oi("config.room_button_service_empty")}
            aria-label=${oi("config.room_button_service")}
            @glass-dropdown-change=${e=>this._updateButton(t,"service",e.detail.value)}
          ></glass-dropdown>

          <glass-form-input
            multiline
            rows="3"
            class="room-button-input room-button-textarea"
            placeholder='{ "entity_id": "vacuum.robot" }'
            aria-label="${oi("config.room_button_data")}"
            .value=${e.data_json}
            @glass-input=${e=>this._updateButton(t,"data_json",e.detail.value)}
          ></glass-form-input>
        </details>

        <button
          type="button"
          class="room-button-delete"
          @click=${()=>this._removeButton(t)}
        >
          <ha-icon .icon=${"mdi:trash-can-outline"}></ha-icon>
          <span>${oi("config.room_button_delete")}</span>
        </button>
      </div>
    `}async _openButtonIconPortal(e){if(this._btnIconSearch="",this._btnIconPortalIdx=e,this._renderIconPortal(),0===this._btnIconList.length&&!this._btnIconLoading){this._btnIconLoading=!0;let e=null;try{e=document.createElement("ha-icon-picker"),e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none",document.body.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._btnIconList=e.map(e=>e.id))}}catch{}finally{this._btnIconLoading=!1,e&&e.parentNode===document.body&&document.body.removeChild(e),this.isConnected&&null!==this._btnIconPortalIdx&&this._renderIconPortal()}}}_renderIconPortal(){if(null===this._btnIconPortalIdx)return void this._removeIconPortal();const e=this._btnIconPortalIdx,t=this._buttons[e];if(!t)return void this._removeIconPortal();const i=t.icon,a=this._btnIconSearch.toLowerCase().trim(),s=a?this._btnIconList.filter(e=>e.toLowerCase().includes(a)).slice(0,120):this._btnIconList.slice(0,120),r=()=>{if(this._btnIconPortalIdx=null,this._removeIconPortal(),this._lastIconTriggerEl){try{this._lastIconTriggerEl.focus()}catch{}this._lastIconTriggerEl=null}},o=t=>{this._updateButton(e,"icon",t),r()},n=e=>{const t=this._btnIconPortalEl?.querySelector("input.icon-portal-search"),i=t?.selectionStart??null,a=t?.selectionEnd??null;if(this._btnIconSearch=e,this._renderIconPortal(),null!==i){const e=this._btnIconPortalEl?.querySelector("input.icon-portal-search");if(e)try{e.setSelectionRange(i,a??i)}catch{}}};this._btnIconPortalEl||(this._btnIconPortalEl=document.createElement("div"),this._portalClickHandler=e=>{e.target===this._btnIconPortalEl&&r()},this._btnIconPortalEl.addEventListener("click",this._portalClickHandler),document.body.appendChild(this._btnIconPortalEl)),this._btnIconPortalEl.replaceChildren(),this._btnIconPortalEl.setAttribute("role","dialog"),this._btnIconPortalEl.setAttribute("aria-modal","true"),this._btnIconPortalEl.setAttribute("aria-label",oi("config.room_button_icon_pick")),Object.assign(this._btnIconPortalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"});const c=document.createElement("div");Object.assign(c.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const l=document.createElement("div");Object.assign(l.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const d=document.createElement("span");Object.assign(d.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),d.textContent=oi("config.room_button_icon_pick");const h=document.createElement("input");h.className="icon-portal-search",Object.assign(h.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),h.placeholder="mdi:...",h.value=this._btnIconSearch,h.addEventListener("input",()=>n(h.value)),l.appendChild(d),l.appendChild(h),c.appendChild(l);const p=document.createElement("div");Object.assign(p.style,{overflow:"auto",flex:"1",padding:"0.5rem",scrollbarWidth:"none"});const g=document.createElement("div");Object.assign(g.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const u=this._createBtnIconCell("mdi:cancel",""===i,.4);u.addEventListener("click",()=>o("")),g.appendChild(u);for(const m of s){const e=this._createBtnIconCell(m,m===i,1);e.addEventListener("click",()=>o(m)),g.appendChild(e)}if(0===s.length&&this._btnIconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=oi("config.title_no_icons_found"),g.appendChild(e)}p.appendChild(g),c.appendChild(p),this._btnIconPortalEl.appendChild(c),this._btnIconPortalEl.contains(document.activeElement)||h.focus()}_createBtnIconCell(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"8px",border:t?"1px solid rgba(129,140,248,0.5)":"1px solid transparent",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.03)",color:t?"rgb(129,140,248)":`rgba(255,255,255,${i})`,cursor:"pointer",padding:"0",outline:"none"});const s=document.createElement("ha-icon");return s.icon=e,a.appendChild(s),a}_removeIconPortal(){this._btnIconPortalEl&&(this._portalClickHandler&&(this._btnIconPortalEl.removeEventListener("click",this._portalClickHandler),this._portalClickHandler=null),this._btnIconPortalEl.remove(),this._btnIconPortalEl=null)}_pickEntity(e,t){if(!t)return;const i=t.split(".")[0];if(!i)return;const a=this.hass?.states?.[t],s=a?.attributes?.friendly_name||"",r=this.hass?.services?.[i]?Object.keys(this.hass.services[i]):[],o=Aa[i];let n="";this.hass?.services?.[i]?o&&r.includes(o.split(".")[1])?n=o:r[0]&&(n=`${i}.${r[0]}`):o&&(n=o),this._buttons=this._buttons.map((a,r)=>{if(r!==e)return a;const o=a.service?a.service.split(".")[0]:"",c=!!a.service&&o===i;let l={entity_id:t};if(a.data_json.trim())try{const e=JSON.parse(a.data_json);if(e&&"object"==typeof e&&!Array.isArray(e)){const{area_id:i,device_id:a,entity_id:s,...r}=e;l={...r,entity_id:t}}}catch{}return{icon:a.icon||La[i]||"",label:a.label||s,service:c?a.service:n,data_json:JSON.stringify(l,null,2)}}),this._scheduleSave()}_addButton(){this._buttons.length>=3||(this._buttons=[...this._buttons,{icon:"",label:"",service:"",data_json:""}],this._scheduleSave())}_onAdvancedToggle(e,t){const i=new Set(this._btnAdvancedOpen);t?i.add(e):i.delete(e),this._btnAdvancedOpen=i}_removeButton(e){this._buttons=this._buttons.filter((t,i)=>i!==e),null!==this._btnIconPortalIdx&&(this._btnIconPortalIdx===e?(this._btnIconPortalIdx=null,this._removeIconPortal()):this._btnIconPortalIdx>e&&(this._btnIconPortalIdx-=1));const t=new Set;this._btnAdvancedOpen.forEach(i=>{i!==e&&t.add(i>e?i-1:i)}),this._btnAdvancedOpen=t,this._scheduleSave()}_updateButton(e,t,i){this._buttons=this._buttons.map((a,s)=>s===e?{...a,[t]:i}:a),this._scheduleSave()}_renderIndicators(){return V`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.room_indicators")}</span>
            <span class="section-desc">${oi("config.room_indicators_desc")}</span>
          </div>
        </header>
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked=${this._showLights?"true":"false"} @click=${()=>{this._showLights=!this._showLights,this._scheduleSave()}}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:lightbulb"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.room_show_lights")}</div>
            </div>
            <glass-toggle presentation .checked=${this._showLights}></glass-toggle>
          </button>
          <button class="feature-row" role="switch" aria-checked=${this._showTemperature?"true":"false"} @click=${()=>{this._showTemperature=!this._showTemperature,this._scheduleSave()}}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:thermometer"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.room_show_temperature")}</div>
            </div>
            <glass-toggle presentation .checked=${this._showTemperature}></glass-toggle>
          </button>
          <button class="feature-row" role="switch" aria-checked=${this._showHumidity?"true":"false"} @click=${()=>{this._showHumidity=!this._showHumidity,this._scheduleSave()}}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.room_show_humidity")}</div>
            </div>
            <glass-toggle presentation .checked=${this._showHumidity}></glass-toggle>
          </button>
          <button class="feature-row" role="switch" aria-checked=${this._sortByLights?"true":"false"} @click=${()=>{this._sortByLights=!this._sortByLights,this._scheduleSave()}}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:lightbulb-auto"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.room_sort_by_lights")}</div>
            </div>
            <glass-toggle presentation .checked=${this._sortByLights}></glass-toggle>
          </button>
          <button class="feature-row" role="switch" aria-checked=${this._showPresence?"true":"false"} @click=${()=>{this._showPresence=!this._showPresence,this._scheduleSave()}}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:motion-sensor"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.room_sort_by_presence")}</div>
            </div>
            <glass-toggle presentation .checked=${this._showPresence}></glass-toggle>
          </button>
        </div>
      </section>
    `}_renderSensors(){const e=(e,t)=>[{value:"",label:oi("config.room_auto_detect"),icon:"mdi:auto-fix"},...e.map(e=>({value:e.id,label:e.name,icon:t})),{value:"__none__",label:oi("config.room_no_sensor"),icon:"mdi:close-circle-outline"}],t=e(this._availableTempEntities,"mdi:thermometer"),i=e(this._availableHumidityEntities,"mdi:water-percent"),a=e(this._availablePresenceEntities,"mdi:motion-sensor");return V`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">3</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.room_sensors")}</span>
            <span class="section-desc">${oi("config.room_sensors_desc")}</span>
          </div>
        </header>

      <div class="cfg-sublabel">${oi("config.room_temp_entity")}</div>
      <glass-dropdown
        .items=${t}
        .value=${this._tempEntity||""}
        icon="mdi:thermometer"
        @glass-dropdown-change=${e=>{this._tempEntity=e.detail.value,this._scheduleSave()}}
      ></glass-dropdown>

      <div class="cfg-sublabel">${oi("config.room_humidity_entity")}</div>
      <glass-dropdown
        .items=${i}
        .value=${this._humidityEntity||""}
        icon="mdi:water-percent"
        @glass-dropdown-change=${e=>{this._humidityEntity=e.detail.value,this._scheduleSave()}}
      ></glass-dropdown>

      <div class="cfg-sublabel">${oi("config.room_presence_entity")}</div>
      <glass-dropdown
        .items=${a}
        .value=${this._presenceEntity||""}
        icon="mdi:motion-sensor"
        @glass-dropdown-change=${e=>{this._presenceEntity=e.detail.value,this._scheduleSave()}}
      ></glass-dropdown>

      </section>
    `}_renderThresholds(){return V`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">5</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.room_thresholds_title")}</span>
            <span class="section-desc">${oi("config.room_thresholds_desc")}</span>
          </div>
        </header>
        <div class="feature-list">
          <div class="range-row">
            <div class="feature-icon"><ha-icon .icon=${"mdi:thermometer-high"}></ha-icon></div>
            <div class="feature-text pw-rd-flex-fixed">
              <div class="feature-name">${oi("config.room_temp_high")}</div>
            </div>
            <input type="range" class="range-input" min="20" max="35" step="0.5"
              .value=${String(this._tempHigh??24)}
              @input=${e=>{this._tempHigh=parseFloat(e.target.value),this._scheduleSave()}}
            />
            <span class="range-value">${this._tempHigh??24}\u00b0C</span>
          </div>

          <div class="range-row">
            <div class="feature-icon"><ha-icon .icon=${"mdi:thermometer-low"}></ha-icon></div>
            <div class="feature-text pw-rd-flex-fixed">
              <div class="feature-name">${oi("config.room_temp_low")}</div>
            </div>
            <input type="range" class="range-input" min="10" max="25" step="0.5"
              .value=${String(this._tempLow??17)}
              @input=${e=>{this._tempLow=parseFloat(e.target.value),this._scheduleSave()}}
            />
            <span class="range-value">${this._tempLow??17}\u00b0C</span>
          </div>

          <div class="range-row">
            <div class="feature-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
            <div class="feature-text pw-rd-flex-fixed">
              <div class="feature-name">${oi("config.room_humidity_threshold")}</div>
            </div>
            <input type="range" class="range-input" min="40" max="90" step="1"
              .value=${String(this._humidityThreshold??65)}
              @input=${e=>{this._humidityThreshold=parseFloat(e.target.value),this._scheduleSave()}}
            />
            <span class="range-value">${this._humidityThreshold??65}%</span>
          </div>
        </div>
      </section>
    `}_renderSection(e){switch(e.id){case"light":return V`<config-tab-light .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-light>`;case"cover":return V`<config-tab-cover .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-cover>`;case"climate":return V`<config-tab-climate .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-climate>`;case"media":return V`<config-tab-media .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-media>`;case"fan":return V`<config-tab-fan .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-fan>`;case"camera":return V`<config-tab-camera .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-camera>`;default:return V``}}}Ta([pe({attribute:!1})],Ra.prototype,"hass"),Ta([pe()],Ra.prototype,"areaId"),Ta([pe({attribute:!1})],Ra.prototype,"configData"),Ta([pe({attribute:!1})],Ra.prototype,"backend"),Ta([pe({attribute:!1})],Ra.prototype,"rooms"),Ta([ge()],Ra.prototype,"_openSections"),Ta([ge()],Ra.prototype,"_sections"),Ta([ge()],Ra.prototype,"_scenes"),Ta([ge()],Ra.prototype,"_tempEntity"),Ta([ge()],Ra.prototype,"_humidityEntity"),Ta([ge()],Ra.prototype,"_tempHigh"),Ta([ge()],Ra.prototype,"_tempLow"),Ta([ge()],Ra.prototype,"_humidityThreshold"),Ta([ge()],Ra.prototype,"_showLights"),Ta([ge()],Ra.prototype,"_showTemperature"),Ta([ge()],Ra.prototype,"_showHumidity"),Ta([ge()],Ra.prototype,"_presenceEntity"),Ta([ge()],Ra.prototype,"_showPresence"),Ta([ge()],Ra.prototype,"_sortByLights"),Ta([ge()],Ra.prototype,"_buttons"),Ta([ge()],Ra.prototype,"_btnIconPortalIdx"),Ta([ge()],Ra.prototype,"_btnIconSearch"),Ta([ge()],Ra.prototype,"_btnAdvancedOpen"),Ta([ge()],Ra.prototype,"_dragIdx"),Ta([ge()],Ra.prototype,"_dropIdx"),Ta([ge()],Ra.prototype,"_dragContext"),customElements.define("config-room-detail",Ra);var Oa=Object.defineProperty,ja=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Oa(t,i,r),r};const Ha=[{id:"title",icon:"mdi:format-title",nameKey:"config.dashboard_card_title",color:Xt.rgb},{id:"light",icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",color:Nt.rgb},{id:"weather",icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",color:Qt.rgb},{id:"cover",icon:"mdi:blinds",nameKey:"config.dashboard_card_cover",color:Vt.rgb},{id:"climate",icon:"mdi:thermostat",nameKey:"config.dashboard_card_climate",color:Bt.rgb},{id:"fan",icon:"mdi:fan",nameKey:"config.dashboard_card_fan",color:Wt.rgb},{id:"media",icon:"mdi:speaker",nameKey:"config.dashboard_card_media",color:Ut.rgb},{id:"spotify",icon:"mdi:spotify",nameKey:"config.dashboard_card_spotify",color:Kt.rgb},{id:"presence",icon:"mdi:account-group",nameKey:"config.dashboard_card_presence",color:Gt.rgb},{id:"camera_carousel",icon:"mdi:cctv",nameKey:"config.dashboard_card_camera_carousel",color:Yt.rgb},{id:"calendar",icon:"mdi:calendar-month",nameKey:"config.dashboard_card_calendar",color:Jt.rgb},{id:"vacuum",icon:"mdi:robot-vacuum-variant",nameKey:"config.dashboard_card_vacuum",color:Zt.rgb}],Fa={title:"title",light:"light",weather:"weather",cover:"cover",climate:"climate",fan:"fan",media:"media",spotify:"spotify",presence:"presence",camera_carousel:"camera",calendar:"calendar",vacuum:"vacuum"},qa={title:"title_card",weather:"weather",light:"light_card",cover:"cover_card",climate:"climate_card",fan:"fan_card",media:"media_card",spotify:"spotify_card",presence:"presence_card",camera:"camera_carousel",calendar:"calendar_card",vacuum:"vacuum_card"};class Na extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._enabledCards=["weather"],this._cardOrder=[],this._hideHeader=!1,this._hideSidebar=!1,this._dynamicBackground=!0,this._dragIdx=null,this._dropIdx=null,this._saveScheduler=xi()}createRenderRoot(){return this}updated(e){e.has("configData")&&this.configData&&this._loadFromConfig(this.configData)}disconnectedCallback(){super.disconnectedCallback(),this._saveScheduler.cancel()}_loadFromConfig(e){const t=e.dashboard;if(t){this._enabledCards=t.enabled_cards??["weather"];const e=t.card_order??[],i=new Set(Ha.map(e=>e.id)),a=e.filter(e=>i.has(e)),s=new Set(a),r=Ha.filter(e=>!s.has(e.id)).map(e=>e.id);this._cardOrder=[...a,...r],this._hideHeader=t.hide_header??!1,this._hideSidebar=t.hide_sidebar??!1,this._dynamicBackground=t.dynamic_background??!0}}_scheduleSave(){this._saveScheduler.schedule(()=>this._save())}async _save(){if(this.backend)try{await this.backend.send("set_dashboard",{enabled_cards:this._enabledCards,card_order:this._cardOrder,hide_header:this._hideHeader,hide_sidebar:this._hideSidebar,dynamic_background:this._dynamicBackground}),fe.emit("dashboard-config-changed",void 0),this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!0},bubbles:!0,composed:!0}))}catch{this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!1},bubbles:!0,composed:!0}))}}_toggleCard(e){const t=new Set(this._enabledCards);t.has(e)?t.delete(e):t.add(e),this._enabledCards=[...t],this._scheduleSave()}_toggleHideHeader(){this._hideHeader=!this._hideHeader,this._scheduleSave()}_toggleHideSidebar(){this._hideSidebar=!this._hideSidebar,this._scheduleSave()}_toggleDynamicBg(){this._dynamicBackground=!this._dynamicBackground,this._scheduleSave()}_onDragStart(e){this._dragIdx=e}_onDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDrop(e,t){if(t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e){const t=[...this._cardOrder],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._cardOrder=t,this._scheduleSave()}this._dragIdx=null,this._dropIdx=null}_navigateToCard(e){const t=Fa[e]??e;this.dispatchEvent(new CustomEvent("sub-select",{detail:t,bubbles:!0,composed:!0}))}render(){return this.subSection?this._renderSubSection(this.subSection):this._renderDashboard()}_renderDashboard(){const e=new Set(this._enabledCards),t=new Set(Ha.map(e=>e.id)),i=this._cardOrder.filter(e=>t.has(e));for(const r of Ha)i.includes(r.id)||i.push(r.id);const a=i.filter(t=>e.has(t)),s=i.filter(t=>!e.has(t)).sort((e,t)=>{const i=oi(Ha.find(t=>t.id===e)?.nameKey??"config.dashboard_title"),a=oi(Ha.find(e=>e.id===t)?.nameKey??"config.dashboard_title");return i.localeCompare(a)});return V`
      <div class="cfg-info">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        <span>${oi("config.dashboard_info")}</span>
      </div>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.dashboard_title")}</span>
            <span class="section-desc">${oi("config.dashboard_desc")}</span>
          </div>
          <span class="cfg-section-count" aria-label="${oi("common.count_visible",{count:a.length,total:i.length})}">
            ${a.length}/${i.length}
          </span>
        </header>

        ${0===a.length?V`
          <glass-empty-state variant="inline" .icon=${"mdi:view-dashboard-outline"} .title=${oi("config.dashboard_desc")}></glass-empty-state>
        `:V`
          <ol class="dash-active-list" role="list" aria-label="${oi("config.dashboard_title")}">
            ${a.map((e,t)=>{const a=Ha.find(t=>t.id===e);if(!a)return W;const s=i.indexOf(e),r=this._dragIdx===s,o=this._dropIdx===s&&null!==this._dragIdx&&this._dragIdx!==s;return V`
                <li
                  class="dash-row ${r?"dragging":""} ${o?"drop-target":""}"
                  draggable="true"
                  @dragstart=${()=>this._onDragStart(s)}
                  @dragover=${e=>this._onDragOver(s,e)}
                  @dragleave=${()=>this._onDragLeave()}
                  @drop=${e=>this._onDrop(s,e)}
                  @dragend=${()=>this._onDragEnd()}
                >
                  <span class="dash-row-grip" aria-hidden="true">
                    <ha-icon .icon=${"mdi:drag-vertical"}></ha-icon>
                  </span>
                  <span class="dash-row-pos" aria-hidden="true">${t+1}</span>
                  <button
                    class="dash-row-main"
                    type="button"
                    @click=${()=>this._navigateToCard(e)}
                    aria-label="${oi("config.dashboard_title")} ${oi(a.nameKey)}"
                  >
                    <span class="dash-row-icon" style="--icon-color:${a.color};">
                      <ha-icon .icon=${a.icon}></ha-icon>
                    </span>
                    <span class="dash-row-name">${oi(a.nameKey)}</span>
                    <ha-icon class="dash-row-chev" .icon=${"mdi:chevron-right"}></ha-icon>
                  </button>
                  <button
                    class="dash-row-hide"
                    type="button"
                    @click=${()=>this._toggleCard(e)}
                    aria-label="${oi("common.hide")} ${oi(a.nameKey)}"
                  >
                    <ha-icon .icon=${"mdi:close"}></ha-icon>
                  </button>
                </li>
              `})}
          </ol>
        `}

        ${0===s.length?W:V`
          <div class="dash-divider"></div>
          <div class="cfg-sublabel dash-section-disabled">${oi("common.disabled")} <span class="dash-section-count">${s.length}</span></div>
          <div class="dash-chip-grid">
            ${s.map(e=>{const t=Ha.find(t=>t.id===e);return t?V`
                <button
                  class="dash-chip"
                  type="button"
                  @click=${()=>{this._toggleCard(e),this._navigateToCard(e)}}
                  aria-label="${oi("common.show")} ${oi(t.nameKey)}"
                >
                  <span class="dash-chip-icon" style="--icon-color:${t.color};">
                    <ha-icon .icon=${t.icon}></ha-icon>
                  </span>
                  <span class="dash-chip-name">${oi(t.nameKey)}</span>
                  <ha-icon class="dash-chip-plus" .icon=${"mdi:plus"}></ha-icon>
                </button>
              `:W})}
          </div>
        `}
      </section>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.dashboard_display")}</span>
            <span class="section-desc">${oi("config.dashboard_display_desc")}</span>
          </div>
        </header>
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked=${this._hideHeader?"true":"false"}
            @click=${()=>this._toggleHideHeader()}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:page-layout-header"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.dashboard_hide_header")}</div>
              <div class="feature-desc">${oi("config.dashboard_hide_header_desc")}</div>
            </div>
            <glass-toggle presentation .checked=${this._hideHeader}></glass-toggle>
          </button>

          <button class="feature-row" role="switch" aria-checked=${this._hideSidebar?"true":"false"}
            @click=${()=>this._toggleHideSidebar()}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:page-layout-sidebar-left"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.dashboard_hide_sidebar")}</div>
              <div class="feature-desc">${oi("config.dashboard_hide_sidebar_desc")}</div>
            </div>
            <glass-toggle presentation .checked=${this._hideSidebar}></glass-toggle>
          </button>

          <button class="feature-row" role="switch" aria-checked=${this._dynamicBackground?"true":"false"}
            @click=${()=>this._toggleDynamicBg()}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:weather-night"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.dashboard_dynamic_bg")}</div>
              <div class="feature-desc">${oi("config.dashboard_dynamic_bg_desc")}</div>
            </div>
            <glass-toggle presentation .checked=${this._dynamicBackground}></glass-toggle>
          </button>
        </div>
      </section>
    `}_sliceFor(e){const t=qa[e];return this.configData?.[t??""]??{}}_renderSubSection(e){const t=this._sliceFor(e);switch(e){case"title":return V`<config-tab-title .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-title>`;case"spotify":return V`<config-tab-spotify .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-spotify>`;case"presence":return V`<config-tab-presence .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-presence>`;case"camera":return V`<config-tab-camera .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-camera>`;case"weather":return V`<config-tab-weather .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-weather>`;case"light":return V`<config-tab-light .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-light>`;case"cover":return V`<config-tab-cover .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-cover>`;case"climate":return V`<config-tab-climate .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-climate>`;case"fan":return V`<config-tab-fan .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-fan>`;case"media":return V`<config-tab-media .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-media>`;case"calendar":return V`<config-tab-calendar .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-calendar>`;case"vacuum":return V`<config-tab-vacuum .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-vacuum>`;default:return V`<div class="placeholder"><ha-icon .icon=${"mdi:hammer-wrench"}></ha-icon><span>${e}</span></div>`}}}ja([pe({attribute:!1})],Na.prototype,"hass"),ja([pe({attribute:!1})],Na.prototype,"backend"),ja([pe({attribute:!1})],Na.prototype,"configData"),ja([pe({attribute:!1})],Na.prototype,"rooms"),ja([pe()],Na.prototype,"subSection"),ja([ge()],Na.prototype,"_enabledCards"),ja([ge()],Na.prototype,"_cardOrder"),ja([ge()],Na.prototype,"_hideHeader"),ja([ge()],Na.prototype,"_hideSidebar"),ja([ge()],Na.prototype,"_dynamicBackground"),ja([ge()],Na.prototype,"_dragIdx"),ja([ge()],Na.prototype,"_dropIdx");try{customElements.define("config-dashboard-view",Na)}catch{}var Va=Object.defineProperty,Ba=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Va(t,i,r),r};class Ua extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._autoSort=!0,this._reconfigDispatchedFor=null}createRenderRoot(){return this}updated(e){if(super.updated(e),e.has("configData")&&this.configData){const e=this.configData;this._autoSort=!1!==e.auto_sort}e.has("subSection")&&("reconfig"===this.subSection&&"reconfig"!==this._reconfigDispatchedFor?(this._reconfigDispatchedFor="reconfig",this.dispatchEvent(new CustomEvent("reconfig-wizard",{bubbles:!0,composed:!0}))):"reconfig"!==this.subSection&&(this._reconfigDispatchedFor=null))}render(){return this.subSection?"reconfig"===this.subSection?V`
          <glass-empty-state variant="inline" class="reconfig-loading" .icon=${"mdi:loading"} .title=${oi("config.advanced_reconfig_loading")}></glass-empty-state>
        `:this._renderSubSection(this.subSection):V`
      <div class="cfg-info">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        <span>${oi("config.advanced_info")}</span>
      </div>

      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.advanced_settings_title")}</span>
          </div>
        </header>
        <ul class="pref-list" role="list">
          ${this._renderPrefRow("navbar","mdi:dock-bottom","config.advanced_navbar_title","config.advanced_navbar_desc")}
          ${this._renderPrefRow("orphans","mdi:puzzle-outline","config.advanced_orphans_title","config.advanced_orphans_desc")}
        </ul>
      </section>

      <section class="cfg-section danger">
        <header class="cfg-section-head">
          <span class="cfg-section-num">2</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.advanced_danger_title")}</span>
          </div>
        </header>
        <ul class="pref-list" role="list">
          ${this._renderPrefRow("reconfig","mdi:refresh","config.advanced_reconfig_title","config.advanced_reconfig_desc",!0)}
        </ul>
      </section>
    `}_renderPrefRow(e,t,i,a,s=!1){return V`
      <li>
        <button
          class="pref-row ${s?"danger":""}"
          type="button"
          @click=${()=>this.dispatchEvent(new CustomEvent("sub-select",{detail:e,bubbles:!0,composed:!0}))}
          aria-label=${oi(i)}
        >
          <span class="pref-row-icon">
            <ha-icon .icon=${t}></ha-icon>
          </span>
          <span class="pref-row-text">
            <span class="pref-row-name">${oi(i)}</span>
            <span class="pref-row-desc">${oi(a)}</span>
          </span>
          <ha-icon class="pref-row-chev" .icon=${"mdi:chevron-right"}></ha-icon>
        </button>
      </li>
    `}_renderSubSection(e){switch(e){case"navbar":return this._renderNavbarSettings();case"orphans":return V`<config-tab-unassigned
          .hass=${this.hass}
          .configData=${this.configData}
          .backend=${this.backend}
        ></config-tab-unassigned>`;default:return V`<glass-empty-state variant="inline" .title=${e}></glass-empty-state>`}}_renderNavbarSettings(){return V`
      <section class="cfg-section">
        <header class="cfg-section-head">
          <span class="cfg-section-num">1</span>
          <div class="cfg-section-text">
            <span class="section-label">${oi("config.navbar_settings")}</span>
          </div>
        </header>
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked=${this._autoSort?"true":"false"} @click=${this._toggleAutoSort}>
            <div class="feature-icon"><ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon></div>
            <div class="feature-text">
              <div class="feature-name">${oi("config.navbar_auto_sort")}</div>
              <div class="feature-desc">${oi("config.navbar_auto_sort_desc")}</div>
            </div>
            <glass-toggle presentation .checked=${this._autoSort}></glass-toggle>
          </button>
        </div>
      </section>
    `}async _toggleAutoSort(){if(this._autoSort=!this._autoSort,this.backend)try{await this.backend.send("set_navbar",{auto_sort:this._autoSort})}catch{}}}Ba([pe({attribute:!1})],Ua.prototype,"hass"),Ba([pe({attribute:!1})],Ua.prototype,"backend"),Ba([pe({attribute:!1})],Ua.prototype,"configData"),Ba([pe({attribute:!1})],Ua.prototype,"rooms"),Ba([pe()],Ua.prototype,"subSection"),Ba([ge()],Ua.prototype,"_autoSort");try{customElements.define("config-advanced-view",Ua)}catch{}class Wa extends ne{createRenderRoot(){return this}render(){return V`
      <div class="wizard-step-icon">
        <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
      </div>
      <div class="section-label">Bienvenue</div>
      <div class="section-desc">
        Glass Cards transforme votre interface Home Assistant avec un design moderne
        et des contrôles intuitifs. Ce guide rapide va configurer votre tableau de bord.
      </div>
      <div class="banner">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        <span>Vous pouvez passer chaque étape et revenir plus tard via Avancé.</span>
      </div>
    `}}try{customElements.define("wizard-step-welcome",Wa)}catch{}var Ka=Object.defineProperty;class Ya extends ne{createRenderRoot(){return this}_getRooms(){return this.hass?.areas?Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name)):[]}render(){const e=this._getRooms();return V`
      <div class="wizard-step-icon">
        <ha-icon .icon=${"mdi:home-group"}></ha-icon>
      </div>
      <div class="section-label">Vos pièces (${e.length})</div>
      <div class="wizard-room-list">
        ${e.map(e=>V`
          <div class="wizard-room-chip">
            <ha-icon .icon=${e.icon??"mdi:home"}></ha-icon>
            <span>${e.name}</span>
          </div>
        `)}
        ${0===e.length?V`<div class="section-desc">Aucune pièce détectée dans Home Assistant.</div>`:""}
      </div>
      <div class="section-desc">
        Ces pièces ont été détectées depuis Home Assistant. Vous pourrez les personnaliser plus tard.
      </div>
    `}}((e,t,i)=>{for(var a,s=void 0,r=e.length-1;r>=0;r--)(a=e[r])&&(s=a(t,i,s)||s);s&&Ka(t,i,s)})([pe({attribute:!1})],Ya.prototype,"hass");try{customElements.define("wizard-step-rooms",Ya)}catch{}var Ga=Object.defineProperty;class Xa extends ne{createRenderRoot(){return this}_countOrphans(){return this.hass?.entities?Object.values(this.hass.entities).filter(e=>!e.disabled_by&&!e.hidden_by&&null===_i(e,this.hass.devices)).length:0}render(){const e=this._countOrphans();return 0===e?V`
        <div class="wizard-step-icon success">
          <ha-icon .icon=${"mdi:check-circle"}></ha-icon>
        </div>
        <div class="section-label">Entités orphelines</div>
        <div class="banner">
          <ha-icon .icon=${"mdi:check-circle"}></ha-icon>
          <span>Toutes vos entités sont bien assignées à une pièce.</span>
        </div>
      `:V`
      <div class="wizard-step-icon">
        <ha-icon .icon=${"mdi:puzzle-outline"}></ha-icon>
      </div>
      <div class="section-label">Entités orphelines</div>
      <div class="wizard-orphan-count">${e}</div>
      <div class="section-desc">
        entité${e>1?"s":""} non assignée${e>1?"s":""} à une pièce.
        Vous pourrez les assigner dans Avancé › Entités orphelines.
      </div>
    `}}((e,t,i)=>{for(var a,s=void 0,r=e.length-1;r>=0;r--)(a=e[r])&&(s=a(t,i,s)||s);s&&Ga(t,i,s)})([pe({attribute:!1})],Xa.prototype,"hass");try{customElements.define("wizard-step-orphans",Xa)}catch{}class Qa extends ne{createRenderRoot(){return this}render(){return V`
      <div class="wizard-step-icon">
        <ha-icon .icon=${"mdi:palette"}></ha-icon>
      </div>
      <div class="section-label">Apparence</div>
      <div class="section-desc">
        La personnalisation du thème sera disponible prochainement.
        Glass Cards utilise un thème sombre par défaut.
      </div>
      <div class="banner">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        <span>Vous pourrez choisir vos couleurs dans une prochaine version.</span>
      </div>
    `}}try{customElements.define("wizard-step-appearance",Qa)}catch{}class Ja extends ne{createRenderRoot(){return this}render(){return V`
      <div class="wizard-step-icon success">
        <ha-icon .icon=${"mdi:rocket-launch"}></ha-icon>
      </div>
      <div class="section-label">C'est prêt !</div>
      <div class="section-desc">
        Votre tableau de bord Glass Cards est configuré.
        Explorez vos pièces et personnalisez chaque carte.
      </div>
    `}}try{customElements.define("wizard-step-done",Ja)}catch{}var Za=Object.defineProperty,es=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Za(t,i,r),r};const ts=["welcome","rooms","orphans","appearance","done"];class is extends ne{constructor(){super(...arguments),this._step=0}createRenderRoot(){return this}_next(){this._step<ts.length-1&&this._step++}_prev(){this._step>0&&this._step--}_skip(){this._next()}_finish(){this.backend&&this.backend.send("set_wizard_completed",{completed:!0}),this.dispatchEvent(new CustomEvent("wizard-done",{bubbles:!0,composed:!0}))}render(){const e=ts[this._step],t=this._step===ts.length-1,i=0===this._step;return V`
      <div class="wizard">
        <div class="wizard-progress">
          ${ts.map((e,t)=>V`
              <div
                class="wizard-dot ${t===this._step?"active":""} ${t<this._step?"done":""}"
              ></div>
            `)}
        </div>

        <div class="wizard-card">
        <div class="wizard-content">${this._renderStep(e)}</div>

        <div class="wizard-actions">
          ${i?V`<span></span>`:V`<glass-button
                variant="secondary"
                @click=${()=>this._prev()}
                aria-label="Retour"
              >
                Retour
              </glass-button>`}
          <div class="wizard-actions-right">
            ${t?"":V`<glass-button
                  variant="ghost"
                  @click=${()=>this._skip()}
                  aria-label="Passer cette étape"
                >
                  Passer
                </glass-button>`}
            ${t?V`<glass-button
                  variant="primary"
                  @click=${()=>this._finish()}
                  aria-label="Commencer"
                >
                  Commencer
                </glass-button>`:V`<glass-button
                  variant="primary"
                  @click=${()=>this._next()}
                  aria-label="Étape suivante"
                >
                  Suivant
                </glass-button>`}
          </div>
        </div>
        </div>
      </div>
    `}_renderStep(e){switch(e){case"welcome":return V`<wizard-step-welcome></wizard-step-welcome>`;case"rooms":return V`<wizard-step-rooms .hass=${this.hass}></wizard-step-rooms>`;case"orphans":return V`<wizard-step-orphans .hass=${this.hass}></wizard-step-orphans>`;case"appearance":return V`<wizard-step-appearance></wizard-step-appearance>`;case"done":return V`<wizard-step-done></wizard-step-done>`;default:return V``}}}es([pe({attribute:!1})],is.prototype,"hass"),es([pe({attribute:!1})],is.prototype,"backend"),es([ge()],is.prototype,"_step");try{customElements.define("config-wizard",is)}catch{}async function as(e){if(e.hass&&!e._loading){e._loading=!0;try{await async function(e){if(!e.hass)return;const t=Object.values(e.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let i={room_order:[],hidden_rooms:[],auto_sort:!0},a={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},s={enabled_cards:["weather"],card_order:["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],hide_header:!1,hide_sidebar:!1},r={show_header:!0},o={title:"",sources:[],period_entity:"",period_options:[]},n={show_header:!0,dashboard_entities:[],dashboard_compact:!0,presets:[0,25,50,75,100],entity_presets:{}},c={show_header:!0,entity_id:"",sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},l={show_header:!0},d={extra_entities:{},show_header:!0},h={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}},p={show_header:!0,display_mode:"list",dashboard_display_mode:"list",dashboard_entities:[]},g={show_header:!0,entity_order:[],auto_cycle:!1,cycle_interval:10},u={show_header:!0,hidden_entities:[]},m={show_header:!0,entity:""};const _={};try{if(!e._backend)throw new Error("No backend");const t=await e._backend.send("get_config");i=t.navbar,Object.assign(_,t.rooms),t.weather&&(a=t.weather),t.light_card&&(r=t.light_card),t.title_card&&(o=t.title_card),t.cover_card&&(n=t.cover_card),t.fan_card&&(l=t.fan_card),t.spotify_card&&(c=t.spotify_card),t.media_card&&(d=t.media_card),t.presence_card&&(h=t.presence_card),t.climate_card&&(p=t.climate_card),t.camera_carousel&&(g=t.camera_carousel),t.calendar_card&&(u=t.calendar_card),t.vacuum_card&&(m=t.vacuum_card),t.dashboard&&(s=t.dashboard),void 0!==t.wizard_completed&&(e._wizardCompleted=t.wizard_completed)}catch{}e._navbarConfig=i,e._weatherConfig=a,e._lightConfig=r,e._titleConfig=o,e._coverConfig=n,e._fanConfig=l,e._spotifyConfig=c,e._mediaConfig=d,e._presenceConfig=h,e._climateConfig=p,e._cameraConfig=g,e._dashboardConfig={dashboard:s,title_card:o,light_card:r,weather:a,cover_card:n,fan_card:l,spotify_card:c,media_card:d,presence_card:h,climate_card:p,camera_carousel:g,calendar_card:u,vacuum_card:m};const f=new Set(i.hidden_rooms),v=new Map;i.room_order.forEach((e,t)=>v.set(e,t));const b=e.hass;if(!b)return;const y=[],w=[];for(const x of t){const e=fi(x.area_id,b.entities,b.devices),t=_[x.area_id]?.icon,i=t||x.icon||"mdi:home";if(0===e.length){w.push({areaId:x.area_id,name:x.name,icon:i});continue}let a=0,s=null,r=null,o=null,n=null,c=!1;for(const l of e){const e=b.states[l.entity_id];if(!e)continue;const t=l.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&a++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||s||(s=`${e.state}°`,r=parseFloat(e.state)),"humidity"!==t||o||(o=`${e.state}%`,n=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(c=!0)}y.push({areaId:x.area_id,name:x.name,icon:i,entityCount:e.length,visible:!f.has(x.area_id),lightsOn:a,temperature:s,tempValue:r,humidity:o,humidityValue:n,mediaPlaying:c})}y.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=v.get(e.areaId),a=v.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),e._rooms=y,e._emptyRooms=w,!e._selectedRoom&&y.length>0&&(e._selectedRoom=y[0].areaId)}(e),e._loaded=!0}catch{e._loaded=!1}finally{e._loading=!1}}}var ss=Object.defineProperty,rs=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&ss(t,i,r),r};class os extends ne{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=ri(),this._nav=wi,this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._toast=!1,this._saving=!1,this._navbarConfig={},this._popupConfig={},this._weatherConfig={},this._titleConfig={},this._lightConfig={},this._coverConfig={},this._fanConfig={},this._climateConfig={},this._presenceConfig={},this._mediaConfig={},this._spotifyConfig={},this._cameraConfig={},this._dashboardConfig={},this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._dragModeSrcIdx=null,this._loaded=!1,this._loading=!1,this._configReady=!1,this._wizardCompleted=!0,this._suppressAutoSave=!1,this._toastError=!1,this._onRoomsChanged=e=>{const t=e.detail;this._rooms=t.rooms},this._onRoomsReordered=e=>{const t=e.detail;this._rooms=t.rooms,this._saveNavbarOrder()},this._onRoomVisibilityToggle=e=>{const{areaId:t,visible:i}=e.detail;this._rooms=this._rooms.map(e=>e.areaId===t?{...e,visible:i}:e),this._saveNavbarOrder()},this._onTabToast=e=>{this._toastError=!e.detail.success,this._toast=!0,void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastTimeout=setTimeout(()=>{this._toast=!1},2500)}}static{this.styles=[Dt,Pt,Tt,At,...le]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,this.addEventListener("tab-toast",this._onTabToast),this.addEventListener("rooms-changed",this._onRoomsChanged),this.addEventListener("rooms-reordered",this._onRoomsReordered),this.addEventListener("room-visibility-toggle",this._onRoomVisibilityToggle),this._popstateHandler=e=>{const t=(i=e,i.state?.glassNav??null);var i;t&&(this._nav=t)},window.addEventListener("popstate",this._popstateHandler)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,this.removeEventListener("tab-toast",this._onTabToast),this.removeEventListener("rooms-changed",this._onRoomsChanged),this.removeEventListener("rooms-reordered",this._onRoomsReordered),this.removeEventListener("room-visibility-toggle",this._onRoomVisibilityToggle),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=void 0),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),this._backend=void 0}updated(e){if(super.updated(e),e.has("hass")&&(this.hass?.language&&si(this.hass.language)&&(this._lang=ri()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1,this._configReady=!1),!this.hass||this._loaded||this._loading||(this._backend=new yi(this.hass),this._loadConfig())),this._loaded&&!this._loading&&!this._saving)return this._configReady?void(this._suppressAutoSave&&(this._suppressAutoSave=!1)):(this._configReady=!0,void(this._wizardCompleted||(this._nav={section:"wizard"})))}_beginSuppressAutoSave(){this._suppressAutoSave=!0}async _saveNavbarOrder(){if(this._backend)try{await this._backend.send("set_navbar",{room_order:this._rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:this._rooms.filter(e=>!e.visible).map(e=>e.areaId)}),this._showToast()}catch{this._showToast(!0)}}_navigateTo(e){var t,i,a;(t=this._nav,i=e,t.section!==i.section||t.subSection!==i.subSection||t.roomId!==i.roomId)&&(a=this._nav,window.history.pushState({glassNav:a},""),this._nav=e)}_goBack(){window.location.href="/"}async _loadConfig(){return as(this)}async _loadRoomLights(){const e=this.shadowRoot?.querySelector("config-tab-light");e&&e.reload()}async _loadCoverConfig(){const e=this.shadowRoot?.querySelector("config-tab-cover");e&&e.reload()}async _loadFanConfig(){const e=this.shadowRoot?.querySelector("config-tab-fan");e&&e.reload()}async _loadClimateConfig(){const e=this.shadowRoot?.querySelector("config-tab-climate");e&&e.reload()}async _loadMediaConfig(){const e=this.shadowRoot?.querySelector("config-tab-media");e&&e.reload()}async _loadDashboardConfig(){}async _loadPresenceConfig(){const e=this.shadowRoot?.querySelector("config-tab-presence");e&&e.reload()}async _loadCameraCarouselConfig(){const e=this.shadowRoot?.querySelector("config-tab-camera");e&&e.reload()}async _loadWeatherConfig(){return async function(e){const t=e.shadowRoot?.querySelector("config-tab-weather");t&&t.reload()}(this)}async _loadSpotifyConfig(){const e=this.shadowRoot?.querySelector("config-tab-spotify");e&&e.reload()}async _loadTitleConfig(){const e=this.shadowRoot?.querySelector("config-tab-title");e&&e.reload()}async _reset(){return async function(e){e._loading||(e._loaded=!1,await as(e))}(this)}async _saveClimate(){const e=this.shadowRoot?.querySelector("config-tab-climate");e&&e.save()}async _saveDashboard(){}async _checkSpotifyStatus(){}_onDragStart(e,t,i){!function(e,t,i,a){e._dragIdx=t,e._dragContext=i,void 0!==a&&(e._dragModeSrcIdx=a)}(this,e,t,i)}_onDragOver(e,t,i){!function(e,t,i,a){i.preventDefault(),null!==e._dragIdx&&e._dragIdx!==t&&("title_modes"===e._dragContext&&void 0!==a&&a!==e._dragModeSrcIdx||(e._dropIdx=t))}(this,e,t,i)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t)return e._dragIdx=null,void(e._dropIdx=null);e._dragIdx=null,e._dropIdx=null}(this,e,t)}_onDragEnd(){var e;(e=this)._dragIdx=null,e._dropIdx=null,e._dragModeSrcIdx=null}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_renderSidebar(){const e=[{id:"dashboard",icon:"mdi:view-dashboard",label:oi("config.nav_dashboard")},{id:"rooms",icon:"mdi:home-group",label:oi("config.nav_rooms")},{id:"advanced",icon:"mdi:tune-variant",label:oi("config.nav_advanced")}];return V`
      <nav class="panel-sidebar">
        ${e.map(e=>V`
          <button class="nav-btn ${this._nav.section===e.id?"active":""}"
            @click=${()=>this._navigateTo({section:e.id})}
            aria-label=${e.label}>
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${e.label}</span>
          </button>
        `)}
      </nav>
    `}_renderBreadcrumb(){if("rooms"===this._nav.section&&this._nav.roomId){const e=this.hass?.areas?.[this._nav.roomId];return V`
        <div class="breadcrumb">
          <button @click=${()=>this._navigateTo({section:"rooms"})}>${oi("config.nav_rooms")}</button>
          <span class="sep">›</span>
          <span class="current">${e?.name||this._nav.roomId}</span>
        </div>
      `}if(this._nav.subSection){const e="dashboard"===this._nav.section?oi("config.nav_dashboard"):oi("config.nav_advanced");return V`
        <div class="breadcrumb">
          <button @click=${()=>this._navigateTo({section:this._nav.section})}>${e}</button>
          <span class="sep">›</span>
          <span class="current">${this._subSectionLabel(this._nav.subSection)}</span>
        </div>
      `}return W}_subSectionLabel(e){const t=`config.tab_${{camera:"camera_carousel",orphans:"unassigned"}[e]||e}`,i=oi(t);return i!==t?i:e}_renderContent(){switch(this._nav.section){case"wizard":return V`<config-wizard
          .hass=${this.hass}
          .backend=${this._backend}
          @wizard-done=${()=>{this._wizardCompleted=!0,this._navigateTo({section:"rooms"})}}
        ></config-wizard>`;case"rooms":return this._nav.roomId?V`<config-room-detail
            .hass=${this.hass}
            .areaId=${this._nav.roomId}
            .configData=${this._navbarConfig}
            .backend=${this._backend}
            .rooms=${this._rooms}
          ></config-room-detail>`:V`<config-room-list
          .hass=${this.hass}
          .rooms=${this._rooms}
          .backend=${this._backend}
          @room-select=${e=>this._navigateTo({section:"rooms",roomId:e.detail})}
        ></config-room-list>`;case"dashboard":return V`<config-dashboard-view
          .hass=${this.hass}
          .backend=${this._backend}
          .configData=${this._dashboardConfig}
          .rooms=${this._rooms}
          .subSection=${this._nav.subSection}
          @sub-select=${e=>this._navigateTo({section:"dashboard",subSection:e.detail})}
        ></config-dashboard-view>`;case"advanced":return V`<config-advanced-view
          .hass=${this.hass}
          .backend=${this._backend}
          .configData=${this._navbarConfig}
          .rooms=${this._rooms}
          .subSection=${this._nav.subSection}
          @sub-select=${e=>this._navigateTo({section:"advanced",subSection:e.detail})}
          @reconfig-wizard=${()=>this._navigateTo({section:"wizard"})}
        ></config-advanced-view>`;default:return W}}render(){return this._lang,this.hass?V`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="${oi("common.back")}"><ha-icon .icon=${"mdi:chevron-left"}></ha-icon></button>
          <span class="page-title">${oi("config.title")}</span>
          <span class="page-subtitle">${oi("config.brand")} <span class="page-version">v${"0.0.220"}</span></span>
        </div>

        <div class="glass config-panel">
          <div class="panel-layout">
            ${this._renderSidebar()}
            <div class="panel-content">
              ${this._renderBreadcrumb()}
              ${this._renderContent()}
            </div>
          </div>
        </div>
      </div>

      <div class="toast ${this._toast?"show":""} ${this._toastError?"error":""}">
        ${this._toastError?oi("common.error_save"):oi("common.config_saved")}
      </div>
    `:W}}rs([pe({attribute:!1})],os.prototype,"hass"),rs([pe({type:Boolean})],os.prototype,"narrow"),rs([ge()],os.prototype,"_lang"),rs([ge()],os.prototype,"_nav"),rs([ge()],os.prototype,"_rooms"),rs([ge()],os.prototype,"_emptyRooms"),rs([ge()],os.prototype,"_selectedRoom"),rs([ge()],os.prototype,"_toast"),rs([ge()],os.prototype,"_saving"),rs([ge()],os.prototype,"_dragIdx"),rs([ge()],os.prototype,"_dropIdx"),rs([ge()],os.prototype,"_dragContext"),rs([ge()],os.prototype,"_dragModeSrcIdx"),rs([ge()],os.prototype,"_toastError");try{customElements.define("glass-config-panel",os)}catch{}hi("glass-light-card-editor");var ns=Object.defineProperty,cs=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&ns(t,i,r),r};const ls=[[3e3,"light.temp_warm","#ffd4a3"],[4e3,"light.temp_warm","#ffedb3"],[4800,"light.temp_neutral","#fff5e6"],[9999,"light.temp_cold","#e0ecf5"]];function ds(e){for(const[t,i,a]of ls)if(e<t)return{label:oi(i),color:a};return{label:oi("light.temp_cold"),color:"#e0ecf5"}}function hs(e,t){return`rgba(${e[0]},${e[1]},${e[2]},${t})`}const ps=[[251,191,36],[248,113,113],[244,114,182],[167,139,250],[129,140,248],[96,165,250],[74,222,128],[240,240,240]];const gs=["off","candle","fire"];class us extends ui{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null,this._showHeader=!0,this._lightConfigLoaded=!1,this._throttleTimers=new Map,this._roomConfig=null,this._roomConfigLoaded=!1,this._lightsFingerprint="",this._schedules=null,this._schedulesLoaded=!1,this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._wheelCanvas=null}static getConfigElement(){return document.createElement("glass-light-card-editor")}get _isDashboardMode(){return!(this.areaId||this._config?.area)&&!this._config?.entity}static{this.styles=[Dt,Pt,Tt,Rt,Lt,At,Ft,r`
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
    `]}setConfig(e){super.setConfig(e)}getCardSize(){if(this._isDashboardMode){const e=this._getLights().length;return 0===e?1:Math.min(e,6)+1}return 3}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null),null!==this._colorPickerEntity&&(this._colorPickerEntity=null,this._colorPickerPos=null)}connectedCallback(){super.connectedCallback(),this._listen("room-config-changed",e=>{const t=this.areaId||this._config?.area;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._dashboardTotalCache=void 0,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadDashboardHidden())}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadSchedules()}),this._listen("light-config-changed",()=>{this._lightConfigLoaded=!1,this._loadLightConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear(),this._backend=void 0,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1}async _loadRoomConfig(){const e=this.areaId||this._config?.area;if(e&&this.hass&&!this._roomConfigLoaded){this._roomConfigLoaded=!0,this._lastLoadedAreaId=e;try{this._backend||(this._backend=new yi(this.hass));const t=await this._backend.send("get_room",{area_id:e});if((this.areaId||this._config?.area)!==e)return;this._roomConfig=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new yi(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadLightConfig(){if(this.hass&&!this._lightConfigLoaded){this._lightConfigLoaded=!0;try{this._backend||(this._backend=new yi(this.hass));const e=await this._backend.send("get_config");e?.light_card&&(this._showHeader=e.light_card.show_header??!0)}catch{}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new yi(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardTotalCache=void 0,this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedLightIds=void 0,this._lightsFingerprint="",this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear()}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?bi("light",this.hass,this.visibleAreaIds):this._getLights().map(e=>e.entity_id)}updated(e){super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._lightConfigLoaded&&this._loadLightConfig();const t=this.areaId||this._config?.area;if(t&&this.hass&&(this._lastLoadedAreaId!==t&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedLightIds=void 0,this._lightsFingerprint="")}e.has("visibleAreaIds")&&(this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardHiddenLoaded=!1);const i=this._getLightInfos();if(i.some(e=>e.isOn)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on"),e.has("hass")&&this._dragValues.size>0){let e=!1;const t=new Map(this._dragValues);for(const a of i){const i=`bri:${a.entityId}`,s=t.get(i);void 0!==s&&Math.abs(a.brightnessPct-s)<=2&&(t.delete(i),e=!0);const r=`temp:${a.entityId}`,o=t.get(r);void 0!==o&&null!==a.colorTempKelvin&&Math.abs(a.colorTempKelvin-o)<=50&&(t.delete(r),e=!0)}e&&(this._dragValues=t)}if(this._colorPickerEntity){const e=this.renderRoot.querySelector(".cp-wheel-wrap canvas");e&&e.dataset.drawnFor!==this._colorPickerEntity&&(!function(e){const t=e.getBoundingClientRect(),i=Math.round(t.width)||220,a=window.devicePixelRatio||1;e.width=i*a,e.height=i*a;const s=e.getContext("2d");if(!s)return;s.scale(a,a);const r=i/2,o=i/2,n=i/2;for(let c=0;c<360;c++){const e=(c-1)*Math.PI/180,t=(c+1)*Math.PI/180,i=s.createRadialGradient(r,o,0,r,o,n),[a,l,d]=Ot(c,1);i.addColorStop(0,"#ffffff"),i.addColorStop(1,`rgb(${a},${l},${d})`),s.beginPath(),s.moveTo(r,o),s.arc(r,o,n,e,t),s.closePath(),s.fillStyle=i,s.fill()}}(e),e.dataset.drawnFor=this._colorPickerEntity)}}_getLights(){if(!this.hass)return[];const e=this._getLightIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._lightsFingerprint&&this._cachedLightsResult)return this._cachedLightsResult;let i;return this._lightsFingerprint=t,i=this._isDashboardMode?e.map(e=>this.hass?.states[e]).filter(e=>!!e&&"on"===e.state&&vi(e.entity_id,this._schedules)).sort((e,t)=>{const i=e.attributes.friendly_name||e.entity_id,a=t.attributes.friendly_name||t.entity_id;return i.localeCompare(a)}):e.map(e=>this.hass?.states[e]).filter(e=>void 0!==e),this._cachedLightsResult=i,i}_getLightIds(){return this._cachedLightIds||(this._cachedLightIds=this._computeLightIds()),this._cachedLightIds}_computeLightIds(){if(!this.hass)return[];const e=this.areaId||this._config?.area;if(e){const t=this._config?.hidden_entities??[],i=this._roomConfig?.hidden_entities??[],a=new Set([...t,...i]),s=fi(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light.")&&!a.has(e.entity_id)&&vi(e.entity_id,this._schedules)).map(e=>e.entity_id),r=this._config?.entity_order??[],o=r.length>0?r:this._roomConfig?.entity_order??[];if(o.length>0){const e=new Map;o.forEach((t,i)=>e.set(t,i)),s.sort((t,i)=>{const a=e.get(t),s=e.get(i);return void 0!==a&&void 0!==s?a-s:void 0!==a?-1:void 0!==s?1:0})}return s}if(this._config?.entity)return vi(this._config.entity,this._schedules)&&this.hass.states[this._config.entity]?[this._config.entity]:[];if(this._isDashboardMode){const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of fi(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getDashboardLightTotal(){if(!this.hass||!this.hass.entities||!this.hass.devices)return 0;if(void 0!==this._dashboardTotalCache&&this._dashboardTotalEntitiesRef===this.hass.entities)return this._dashboardTotalCache;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length)return 0;const t=new Set;for(const i of e)for(const e of fi(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.add(e.entity_id);return this._dashboardTotalEntitiesRef=this.hass.entities,this._dashboardTotalCache=t.size,t.size}_getLightInfos(){return this._getLights().map(e=>this._buildLightInfo(e))}_buildLightInfo(e){const t="on"===e.state,i=function(e){const t=e.attributes.supported_color_modes;return t&&0!==t.length?t.some(e=>["hs","rgb","rgbw","rgbww","xy"].includes(e))?"rgb":t.includes("color_temp")?"color_temp":t.includes("brightness")?"dimmable":"simple":void 0!==e.attributes.brightness?"dimmable":"simple"}(e),a=e.attributes.brightness,s=t?void 0!==a?Math.round(a/255*100):100:0;let r=null;const o=e.attributes.min_color_temp_kelvin||2e3,n=e.attributes.max_color_temp_kelvin||6500;t&&"color_temp"===i&&(r=e.attributes.color_temp_kelvin||null);let c=null;t&&"rgb"===i&&(c=e.attributes.rgb_color||null);const l=this.hass?.entities[e.entity_id]?.icon,d=e.attributes.icon,h=l||d||"mdi:lightbulb";return{entity:e,entityId:e.entity_id,name:e.attributes.friendly_name||e.entity_id,icon:h,isOn:t,type:i,brightnessPct:s,colorTempKelvin:r,minKelvin:o,maxKelvin:n,rgbColor:c}}_toggleLight(e){mi(this,"light"),this._safeCallService("light","toggle",{},{entity_id:e})}_toggleAll(){mi(this,"light");const e=this._getLights(),t=e.some(e=>"on"===e.state),i=t?"turn_off":"turn_on",a=e.map(e=>e.entity_id);this._safeCallService("light",i,{},{entity_id:a}),t&&(this._expandedEntity=null)}_turnAllOff(){const e=this._getLights().map(e=>e.entity_id);this._safeCallService("light","turn_off",{},{entity_id:e}),this._expandedEntity=null}_hasControls(e){if("simple"!==e.type)return!0;const t=e.entity.attributes.effect_list;if(t&&t.length>0){const e=t.map(e=>e.toLowerCase());if(gs.filter(t=>"off"===t||e.includes(t)).length>1)return!0}return!1}_expandFold(e,t,i){i||(i=this._getLightInfos().find(t=>t.entityId===e)),i&&!this._hasControls(i)||(t?this._expandedEntity===e?this._expandedEntity=null:this._expandedEntity=e:this._toggleLight(e))}_onSliderInput(e,t,i){const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a;const s=this._throttleTimers.get(e);void 0!==s&&clearTimeout(s),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),i(this._dragValues.get(e)??t)},100))}_onSliderChange(e,t,i){mi(this,"light");const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a,i(t);const s=this._throttleTimers.get(e);void 0!==s&&clearTimeout(s),this._throttleTimers.delete(e)}_setBrightness(e,t){this._safeCallService("light","turn_on",{brightness_pct:t},{entity_id:e})}_setColorTemp(e,t){this._safeCallService("light","turn_on",{color_temp_kelvin:t},{entity_id:e})}_setHsColor(e,t,i){this._safeCallService("light","turn_on",{hs_color:[t,100*i]},{entity_id:e})}_setEffect(e,t){this._safeCallService("light","turn_on",{effect:t},{entity_id:e})}_openColorPicker(e,t){this._colorPickerEntity=e,this._colorPickerRgb=t??[255,255,255],this._colorPickerPos=t?function(e){const{h:t,s:i}=jt(e),a=Math.min(i,1),s=t*Math.PI/180;return{x:Math.cos(s)*a*50+50,y:Math.sin(s)*a*50+50}}(t):null,this._colorPickerHs=t?jt(t):null}_closeColorPicker(){this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null}_onWheelInteraction(e){const t=this._wheelCanvas;if(!t)return;const i=function(e,t,i){const a=e.getBoundingClientRect(),s=t-a.left-a.width/2,r=i-a.top-a.height/2,o=a.width/2,n=Math.sqrt(s*s+r*r),c=Math.min(n,o),l=(180*Math.atan2(r,s)/Math.PI%360+360)%360,d=c/o,h=Ot(l,d),p=n>0?c/n:1;return{rgb:h,hex:Ht(h),hs:{h:l,s:d},pos:{x:s*p/o*50+50,y:r*p/o*50+50}}}(t,"touches"in e?e.touches[0].clientX:e.clientX,"touches"in e?e.touches[0].clientY:e.clientY);if(this._colorPickerPos=i.pos,this._colorPickerRgb=i.rgb,this._colorPickerHs=i.hs,this._colorPickerEntity){const e=`cp:${this._colorPickerEntity}`,t=this._throttleTimers.get(e);void 0!==t&&clearTimeout(t),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},150))}}_getEntityLayout(e){const t=this._config?.entity_layouts??{},i=this._roomConfig?.entity_layouts??{};return"full"===(t[e]||i[e])?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_buildLayout(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const s=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;s?(t.push({kind:"compact-pair",left:a,right:s}),i+=2):(t.push({kind:"full",light:a}),i++)}else t.push({kind:"full",light:a}),i++}return t}_computeTint(e){const t=e.filter(e=>e.isOn);if(0===t.length)return null;const i=t.length/e.length,a=t.reduce((e,t)=>e+(t.brightnessPct??100),0)/t.length/100*(.55+.45*i)*.22;let s="#fbbf24";const r=[...t].sort((e,t)=>(t.brightnessPct??0)-(e.brightnessPct??0)),o=r.find(e=>"rgb"===e.type&&e.rgbColor),n=r.find(e=>"color_temp"===e.type&&e.colorTempKelvin);return o?.rgbColor?s=Ht(o.rgbColor):n?.colorTempKelvin&&(s=ds(n.colorTempKelvin).color),{background:`radial-gradient(ellipse at 30% 30%, ${s}, transparent 70%)`,opacity:a.toFixed(3)}}_renderSubText(e){if(!e.isOn)return V`<span class="light-brightness-text">${oi("common.off")}</span>`;if("simple"===e.type)return V`<span class="light-brightness-text">${oi("common.on")}</span>`;const t=[V`<span class="light-brightness-text">${e.brightnessPct}%</span>`];if("color_temp"===e.type&&e.colorTempKelvin){const i=ds(e.colorTempKelvin);t.push(V`<span class="light-temp-dot" style="background:${i.color}"></span>`),t.push(V`<span class="light-temp-text">${i.label}</span>`)}if("rgb"===e.type&&e.rgbColor){const i=Ht(e.rgbColor);t.push(V`<span class="light-temp-dot" style="background:${i}"></span>`),t.push(V`<span class="light-temp-text">${oi("light.color")}</span>`)}return t}_renderLightRow(e,t,i){const a=qt(e.entity.state),s=["light-row",t?"compact":"",i?"compact-right":"",a?"entity-unavailable":""].filter(Boolean).join(" "),r=e.isOn&&"rgb"===e.type&&e.rgbColor?`--light-rgb:${Ht(e.rgbColor)};--light-rgb-bg:${hs(e.rgbColor,.1)};--light-rgb-border:${hs(e.rgbColor,.15)};--light-rgb-glow:${hs(e.rgbColor,.4)};--light-rgb-sub:${hs(e.rgbColor,.55)}`:"",o=e.isOn&&e.rgbColor?`${e.rgbColor[0]},${e.rgbColor[1]},${e.rgbColor[2]}`:"light-glow",n=this._bindGesture({onTap:()=>this._toggleLight(e.entityId),onLongPress:()=>this._expandFold(e.entityId,e.isOn,e),exclude:"glass-icon-button"});return V`
      <div
        class=${s}
        data-on=${e.isOn}
        style=${r}
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
          aria-label="${oi("light.toggle_aria",{name:e.name})}"
          @click=${()=>this._toggleLight(e.entityId)}
        ></glass-icon-button>
        <button
          class="light-expand-btn"
          aria-label="${e.isOn?oi("light.expand_aria",{name:e.name}):e.name}"
          aria-expanded=${e.isOn?this._expandedEntity===e.entityId?"true":"false":W}
        >
          <div class="light-info">
            <div class="light-name">${e.name}</div>
            <div class="light-sub">${this._renderSubText(e)}</div>
          </div>
          ${a?V`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:V`<span class="light-dot"></span>`}
        </button>
      </div>
    `}_getSliderColor(e){if("rgb"===e.type&&e.rgbColor){const[t,i,a]=e.rgbColor;return`${t},${i},${a}`}if("color_temp"===e.type&&e.colorTempKelvin){const t=ds(e.colorTempKelvin).color;return`${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)}`}return"var(--rgb-light-glow)"}_getFoldColor(e){if(e.rgbColor)return`rgba(${e.rgbColor[0]},${e.rgbColor[1]},${e.rgbColor[2]},0.3)`;if("color_temp"===e.type&&e.colorTempKelvin){const{color:t}=ds(e.colorTempKelvin);return`rgba(${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)},0.3)`}return"rgba(var(--rgb-light-glow),0.25)"}_getLightTintStyle(e){if("rgb"===e.type&&e.rgbColor){const[t,i,a]=e.rgbColor;return`--light-tint:rgb(${t},${i},${a});--light-tint-glow:rgba(${t},${i},${a},0.45)`}if("color_temp"===e.type&&e.colorTempKelvin){const t=ds(e.colorTempKelvin).color,i=parseInt(t.slice(1,3),16),a=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);return`--light-tint:${t};--light-tint-glow:rgba(${i},${a},${s},0.45)`}return""}_renderControlFold(e,t="full"){const i=this._expandedEntity===e.entityId&&e.isOn,a="rgb"===e.type,s=this._getSliderColor(e),r=this._getFoldColor(e),o=this._getLightTintStyle(e);return V`
      <div class="fold-sep fold-sep-${t} ${i?"visible":""}" style="--fold-color:${r}"></div>
      <div class="ctrl-fold ${i?"open":""}" style=${o}>
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${a}>
            ${"simple"!==e.type?V`
              <div class="light-section">
                <glass-section-title label=${oi("light.section_brightness")}></glass-section-title>
                ${this._renderBrightnessSlider(e,s)}
              </div>
            `:W}
            ${"color_temp"===e.type?V`
              <div class="light-section">
                <glass-section-title label=${oi("light.section_temperature")}></glass-section-title>
                ${this._renderTempSlider(e)}
              </div>
            `:W}
            ${"rgb"===e.type?V`
              <div class="light-section">
                <glass-section-title label=${oi("light.section_color")}></glass-section-title>
                ${this._renderColorRow(e)}
              </div>
            `:W}
            ${this._renderEffectsSection(e)}
          </div>
        </div>
      </div>
    `}_renderEffectsSection(e){const t=this._renderEffectChips(e);return t===W?W:V`
      <div class="light-section">
        <glass-section-title label=${oi("light.section_effects")}></glass-section-title>
        ${t}
      </div>
    `}_renderColorRow(e){return V`
      <div class="color-row">
        ${ps.map(t=>{const i=!!e.rgbColor&&function(e,t){const i=jt(e),a=jt(t),s=Math.abs(i.h-a.h);return(s<5||s>355)&&Math.abs(i.s-a.s)<.08}(e.rgbColor,t),a=Ht(t);return V`
            <glass-color-swatch
              .color=${a}
              ?selected=${i}
              aria-label="${oi("light.color_aria",{hex:a})}"
              @click=${()=>{const i=jt(t);this._setHsColor(e.entityId,i.h,i.s)}}
            ></glass-color-swatch>
          `})}
        <button
          class="color-picker-btn"
          @click=${()=>this._openColorPicker(e.entityId,e.rgbColor)}
          aria-label="${oi("light.color_picker_aria")}"
        ></button>
      </div>
    `}_renderEffectChips(e){const t=e.entity.attributes.effect_list;if(!t||0===t.length)return W;const i=gs.filter(e=>"off"===e||t.includes(e));if(i.length<=1)return W;const a=e.entity.attributes.effect?.toLowerCase();return V`
      <div class="effect-row">
        ${i.map(t=>V`
            <glass-chip
              size="sm"
              active-color="light-glow"
              ?active=${a===t||!a&&"off"===t}
              .icon=${function(e){switch(e){case"off":return"mdi:flash-off";case"candle":return"mdi:candle";case"fire":return"mdi:fire";default:return"mdi:auto-fix"}}(t)}
              aria-label="${oi(`light.effect_${t}`)}"
              @click=${()=>this._setEffect(e.entityId,t)}
            >${oi(`light.effect_${t}`)}</glass-chip>
          `)}
      </div>
    `}_renderColorPicker(){if(!this._colorPickerEntity||!this._colorPickerRgb)return W;const e=Ht(this._colorPickerRgb);return V`
      <div class="color-picker-overlay" role="presentation" @click=${e=>{e.target.classList.contains("color-picker-overlay")&&this._closeColorPicker()}}>
        <div class="color-picker-dialog" role="dialog" aria-modal="true" aria-label="${oi("light.color_picker_title")}">
          <glass-icon-button
            class="cp-close-x"
            size="sm"
            .icon=${"mdi:close"}
            aria-label="${oi("common.close")}"
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
    `}_renderBrightnessSlider(e,t){const i=`bri:${e.entityId}`,a=this._dragValues.get(i)??e.brightnessPct;return V`
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
    `}_renderTempSlider(e){const t=`temp:${e.entityId}`,i=e.colorTempKelvin||e.minKelvin,a=this._dragValues.get(t)??i,s=ds(a).color,r=`${parseInt(s.slice(1,3),16)},${parseInt(s.slice(3,5),16)},${parseInt(s.slice(5,7),16)}`;return V`
      <div class="slider-wrap">
        <div class="slider-icon"><ha-icon .icon=${"mdi:thermometer"}></ha-icon></div>
        <glass-slider
          .value=${a}
          .min=${e.minKelvin}
          .max=${e.maxKelvin}
          color="${r}"
          .label=${`${a}K`}
          @glass-slider-input=${i=>this._onSliderInput(t,i.detail.value,t=>this._setColorTemp(e.entityId,t))}
          @glass-slider-change=${i=>this._onSliderChange(t,i.detail.value,t=>this._setColorTemp(e.entityId,t))}
        ></glass-slider>
      </div>
    `}_renderGrid(e){const t=this._buildLayout(e),i=[];for(const a of t)"full"===a.kind?(i.push(this._renderLightRow(a.light,!1,!1)),i.push(this._renderControlFold(a.light,"full"))):(i.push(this._renderLightRow(a.left,!0,!1)),a.right&&i.push(this._renderLightRow(a.right,!0,!0)),i.push(this._renderControlFold(a.left,"left")),a.right&&i.push(this._renderControlFold(a.right,"right")));return i}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],s=i+1<e.length?e[i+1]:null;s?(t.push(V`
          ${this._renderLightRow(a,!0,!1)}
          ${this._renderLightRow(s,!0,!0)}
          ${this._renderControlFold(a,"left")}
          ${this._renderControlFold(s,"right")}
        `),i+=2):(t.push(V`
          ${this._renderLightRow(a,!1,!1)}
          ${this._renderControlFold(a,"full")}
        `),i++)}return t}_renderDashboard(){const e=this._getLightInfos();if(0===e.length)return W;const t=e.slice(0,6),i=e.length-6,a=this._computeTint(e),s=e.length,r=Math.max(this._getDashboardLightTotal(),s),o=s===r?"all":"some";return V`
      ${this._showHeader?V`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${oi("light.dashboard_title")}</span>
            <span class="card-count ${o}">${s}/${r}</span>
          </div>
          <glass-toggle
            active-color="light-glow"
            .checked=${!0}
            aria-label="${oi("light.dashboard_turn_all_off_aria")}"
            @glass-toggle-change=${()=>this._turnAllOff()}
          ></glass-toggle>
        </div>
      `:W}

      <div class="card glass">
        <div
          class="tint"
          style=${a?`background:${a.background};opacity:${a.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(t)}
          </div>
          ${i>0?V`<div class="dashboard-overflow">
                ${oi("light.dashboard_overflow",{count:String(i)})}
              </div>`:W}
        </div>
      </div>
      ${this._renderColorPicker()}
    `}render(){if(this._lang,this._isDashboardMode){const e=this._renderDashboard();return this.style.display=e===W?"none":"",e}const e=this._getLightInfos();if(0===e.length)return this.style.display="none",W;this.style.display="";const t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,s=0===t?"none":t===i?"all":"some",r=this._computeTint(e);return V`
      ${this._showHeader?V`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${oi("light.title")}</span>
            <span class="card-count ${s}">${t}/${i}</span>
          </div>
          <glass-toggle
            active-color="light-glow"
            .checked=${a}
            aria-label="${oi(a?"light.toggle_all_on_aria":"light.toggle_all_off_aria")}"
            @glass-toggle-change=${()=>this._toggleAll()}
          ></glass-toggle>
        </div>
      `:W}

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
    `}}cs([pe({attribute:!1})],us.prototype,"areaId"),cs([pe({attribute:!1})],us.prototype,"visibleAreaIds"),cs([ge()],us.prototype,"_expandedEntity"),cs([ge()],us.prototype,"_dragValues"),cs([ge()],us.prototype,"_colorPickerEntity"),cs([ge()],us.prototype,"_colorPickerRgb"),cs([ge()],us.prototype,"_colorPickerPos"),cs([ge()],us.prototype,"_showHeader");try{customElements.define("glass-light-card",us)}catch{}const ms=1,_s=2,fs=4,vs=8,bs=16,ys=32,ws=64,xs=128,ks=256,$s={heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},Ss={eco:"success",comfort:"warning",boost:"heat",away:"info",sleep:"purple",activity:"accent",none:"accent"},Cs={heating:"climate.action_heating",cooling:"climate.action_cooling",idle:"climate.action_idle",off:"climate.action_off",drying:"climate.action_drying",preheating:"climate.action_heating"},Is={eco:"mdi:leaf",comfort:"mdi:sofa",boost:"mdi:rocket-launch",away:"mdi:home-export-outline",sleep:"mdi:bed",activity:"mdi:motion-sensor",none:"mdi:cancel"},Es={heat:"climate.mode_heat",cool:"climate.mode_cool",heat_cool:"climate.mode_heat_cool",auto:"climate.mode_auto",dry:"climate.mode_dry",fan_only:"climate.mode_fan_only",off:"climate.mode_off"},zs={eco:"climate.preset_eco",comfort:"climate.preset_comfort",boost:"climate.preset_boost",away:"climate.preset_away",sleep:"climate.preset_sleep",activity:"climate.preset_activity",none:"climate.preset_none"};const Ds=120,Ps=125,Ts=90,Ls=-120,As={heating:"mdi:fire",cooling:"mdi:snowflake",idle:"mdi:timer-sand",off:"mdi:power-standby",drying:"mdi:water-percent",preheating:"mdi:fire"};function Ms(e,t,i,a){const s=function(e){return(e-90)*Math.PI/180}(a);return{x:e+i*Math.cos(s),y:t+i*Math.sin(s)}}function Rs(e,t){const i=Ms(Ds,Ps,Ts,e),a=Ms(Ds,Ps,Ts,t);return`M ${i.x} ${i.y} A 90 90 0 1 1 ${a.x} ${a.y}`}function Os(e){const t=e.attributes,i="unavailable"===e.state||"unknown"===e.state,a="off"===e.state||i,s=i?"off":t.hvac_action||("off"===e.state?"off":"idle"),r=e.state,o=t.current_temperature,n=t.temperature??o??0,c=t.min_temp||7,l=t.max_temp||35,d=t.current_humidity,h=t.preset_mode,p=Math.PI*Ts*(240/180),g=(null!=o?Math.max(0,Math.min(1,(o-c)/(l-c))):0)*p,u=function(e,t){return"heating"===e||"preheating"===e?"heat":"cooling"===e?"cool":"auto"===t||"heat_cool"===t?"auto-arc":"off"}(s,r),m=function(e){return"heating"===e||"preheating"===e?"heat":"cooling"===e?"cool":"idle"===e?"idle":"off"}(s),_=function(e,t,i){const a=Math.max(0,Math.min(1,(e-t)/(i-t)));return Ls+240*a}(n,c,l),f=Ms(Ds,Ps,Ts,_),v=[];for(let x=0;x<=12;x++){const e=Ls+x/12*240,t=x%3==0;v.push({inner:Ms(Ds,Ps,86,e),outer:Ms(Ds,Ps,Ts+(t?6:3),e),isMajor:t,labelPos:Ms(Ds,Ps,104,e),labelTemp:c+x/12*(l-c)})}const b=Cs[s]||"climate.unknown",y=As[s]||"mdi:help",w=null!=d||h&&"none"!==h;return V`
    <div class="gauge-section">
      <div class="arc-gauge">
        <svg viewBox="0 0 240 165" fill="none">
          ${v.map(e=>B`
            <line x1=${e.inner.x} y1=${e.inner.y} x2=${e.outer.x} y2=${e.outer.y}
              class=${e.isMajor?"arc-tick-major":"arc-tick"} />
            ${e.isMajor?B`
              <text x=${e.labelPos.x} y=${e.labelPos.y} class="arc-tick-label">
                ${Math.round(e.labelTemp)}°
              </text>
            `:W}
          `)}
          <path d=${Rs(Ls,120)} class="arc-bg" />
          ${a?W:B`
            <path d=${Rs(Ls,120)}
              class="arc-progress ${u}"
              stroke-dasharray=${p}
              stroke-dashoffset=${p-g} />
            <circle cx=${f.x} cy=${f.y} r="5" class="arc-target-dot" />
          `}
        </svg>
        <div class="gauge-center">
          <div class="gauge-current-temp ${a?"off":""}">${null!=o?V`${o.toFixed(1)}<span class="unit">°</span>`:"--"}</div>
          <div class="gauge-action-label ${m}">
            <ha-icon .icon=${y} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${oi(b)}</span>
          </div>
          ${w?V`
            <div class="gauge-sub-info">
              ${null!=d?V`
                <ha-icon .icon=${"mdi:water-percent"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${d}%</span>
              `:W}
              ${h&&"none"!==h?V`
                ${null!=d?V`<span class="gauge-sub-info-sep" aria-hidden="true">·</span>`:W}
                <ha-icon .icon=${Is[h]||"mdi:cog"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${zs[h]?oi(zs[h]):h}</span>
              `:W}
            </div>
          `:W}
        </div>
      </div>
    </div>
  `}class js{constructor(){this._canvas=null,this._particles=[],this._animFrame=null,this._currentAction="",this._width=0,this._height=0}attach(e){this._canvas=e}update(e,t,i){if(e===this._currentAction&&this._animFrame&&t===this._width&&i===this._height)return;if(this._currentAction=e,this._width=t,this._height=i,this.stop(),"off"===e||"idle"===e||!e){if(this._particles=[],this._canvas){const e=this._canvas.getContext("2d");e&&e.clearRect(0,0,this._canvas.width,this._canvas.height)}return}const a="heating"===e||"preheating"===e,s=2*t,r=2*i;if(this._particles=Array.from({length:30},()=>({x:Math.random()*s,y:Math.random()*r,size:1+2.5*Math.random(),speedX:.3*(Math.random()-.5),speedY:a?-(.3+.8*Math.random()):.3+.8*Math.random(),opacity:.1+.3*Math.random(),life:Math.random()})),!this._canvas)return;this._canvas.width=s,this._canvas.height=r,this._canvas.style.width=t+"px",this._canvas.style.height=i+"px";const o=this._canvas.getContext("2d");if(!o)return;const n=a?[249,115,22]:[56,189,248],c=()=>{o.clearRect(0,0,s,r);for(const e of this._particles){e.x+=e.speedX,e.y+=e.speedY,e.life+=.003;let t=e.opacity;e.life<.1&&(t*=e.life/.1),e.life>.8&&(t*=Math.max(0,(1-e.life)/.2)),(a&&e.y<-10||!a&&e.y>r+10||e.life>1)&&(e.y=a?r+10:-10,e.x=Math.random()*s,e.life=0),o.beginPath(),o.arc(e.x,e.y,e.size,0,2*Math.PI),o.fillStyle=`rgba(${n[0]},${n[1]},${n[2]},${t})`,o.fill(),o.beginPath(),o.arc(e.x,e.y,3*e.size,0,2*Math.PI),o.fillStyle=`rgba(${n[0]},${n[1]},${n[2]},${.15*t})`,o.fill()}this._animFrame=requestAnimationFrame(c)};c()}stop(){this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null)}destroy(){this.stop(),this._canvas=null,this._particles=[],this._currentAction=""}}hi("glass-climate-card-editor");var Hs=Object.defineProperty,Fs=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Hs(t,i,r),r};const qs={heating:0,cooling:1,idle:2,off:3};class Ns extends ui{constructor(){super(...arguments),this._showHeader=!0,this._displayMode="list",this._configReady=!1,this._expanded=null,this._selectedEntity=null,this._foldOpen=!1,this._climateConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._cachedClimatesFingerprint="",this._dashboardEntities=[],this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._pendingTemps=new Map,this._schedules=null,this._schedulesLoaded=!1,this._rangeState={dragging:null,lowTemp:0,highTemp:0},this._rangeDragEntity=null,this._rangeDragCleanup=null}static getConfigElement(){return document.createElement("glass-climate-card-editor")}getCardSize(){return 3}get _isDashboardMode(){return!this.areaId}connectedCallback(){super.connectedCallback(),this._listen("climate-config-changed",()=>{this._climateConfigLoaded=!1,this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._loadConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._climateConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear(),this._pendingTemps.clear(),this._rangeDragCleanup&&(this._rangeDragCleanup(),this._rangeDragCleanup=null),this._thermalCanvas&&(this._thermalCanvas.destroy(),this._thermalCanvas=void 0)}_collapseExpanded(){null!==this._expanded&&(this._expanded=null),this._foldOpen&&(this._foldOpen=!1)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._climateConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._climateConfigLoaded&&this._loadConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="")}e.has("visibleAreaIds")&&(this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._dashboardHiddenLoaded=!1),"normal"===this._displayMode?this._updateThermalCanvas():this._thermalCanvas&&(this._thermalCanvas.destroy(),this._thermalCanvas=void 0)}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?bi("climate",this.hass,this.visibleAreaIds):this._getClimateIds()}async _loadConfig(){if(this.hass&&!this._climateConfigLoaded){this._climateConfigLoaded=!0;try{this._backend||(this._backend=new yi(this.hass));const e=await this._backend.send("get_config");if(e?.climate_card){this._showHeader=e.climate_card.show_header??!0,this._displayMode=this.areaId?e.climate_card.display_mode??"list":e.climate_card.dashboard_display_mode??"list",this._dashboardEntities=e.climate_card.dashboard_entities??[];const t=e.climate_card.hidden_entities??[];for(const e of t)this._dashboardHiddenEntities.add(e);this._cachedClimateIds=void 0,this._cachedClimatesFingerprint=""}this._configReady=!0,this.requestUpdate()}catch{this._configReady=!0}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new yi(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new yi(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new yi(this.hass));const t=this._backend,i=new Set,a=await Promise.all(e.map(e=>t.send("get_room",{area_id:e})));for(const e of a)if(e?.hidden_entities)for(const t of e.hidden_entities)i.add(t);this._dashboardHiddenEntities=i,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expanded=null,this._selectedEntity=null,this._foldOpen=!1,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear(),this._pendingTemps.clear()}_getClimateIds(){return this._cachedClimateIds||(this._cachedClimateIds=this._computeClimateIds()),this._cachedClimateIds}_computeClimateIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=fi(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("climate.")&&!e.has(t.entity_id)&&vi(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),s=e.get(i);return void 0!==a&&void 0!==s?a-s:void 0!==a?-1:void 0!==s?1:0})}return t}if(this._isDashboardMode){if(this._dashboardEntities.length>0)return this._dashboardEntities.filter(e=>this.hass?.states[e]&&!this._dashboardHiddenEntities.has(e)&&vi(e,this._schedules));const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of fi(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("climate.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getClimates(){if(!this.hass)return[];const e=this._getClimateIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._cachedClimatesFingerprint&&this._cachedClimatesResult)return this._cachedClimatesResult;this._cachedClimatesFingerprint=t;const i=e.map(e=>this.hass?.states[e]).filter(e=>null!=e);return this._cachedClimatesResult=i,this._cachedClimatesResult}_toggle(e,t,i){if(i.stopPropagation(),!this.hass)return;const a=t.attributes.supported_features||0;if("off"===t.state)if(a&xs)this._safeCallService("climate","turn_on",{},{entity_id:e});else{const i=(t.attributes.hvac_modes||[]).find(e=>"off"!==e);i&&this._safeCallService("climate","set_hvac_mode",{hvac_mode:i},{entity_id:e})}else a&ks?this._safeCallService("climate","turn_off",{},{entity_id:e}):this._safeCallService("climate","set_hvac_mode",{hvac_mode:"off"},{entity_id:e})}_setHvacMode(e,t){this.hass&&(mi(this,"light"),this._safeCallService("climate","set_hvac_mode",{hvac_mode:t},{entity_id:e}))}_setPreset(e,t){this.hass&&(mi(this,"light"),this._safeCallService("climate","set_preset_mode",{preset_mode:t},{entity_id:e}))}_setFanMode(e,t){this.hass&&this._safeCallService("climate","set_fan_mode",{fan_mode:t},{entity_id:e})}_setSwingMode(e,t){this.hass&&this._safeCallService("climate","set_swing_mode",{swing_mode:t},{entity_id:e})}_setTemperature(e,t){if(!this.hass)return;mi(this,"light"),this._pendingTemps.set(`temp_${e}`,t),this.requestUpdate();const i=`temp_throttle_${e}`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("climate","set_temperature",{temperature:t},{entity_id:e}),this._pendingTemps.delete(`temp_${e}`)},400))}_setTemperatureRange(e,t,i){if(!this.hass)return;const a=`range_throttle_${e}`,s=this._throttleTimers.get(a);s&&clearTimeout(s),this._throttleTimers.set(a,setTimeout(()=>{this._throttleTimers.delete(a),this._safeCallService("climate","set_temperature",{target_temp_low:t,target_temp_high:i},{entity_id:e})},400))}_setHumidity(e,t){if(!this.hass)return;this._pendingTemps.set(`humidity_${e}`,t),this.requestUpdate();const i=`humidity_throttle_${e}`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("climate","set_humidity",{humidity:t},{entity_id:e}),this._pendingTemps.delete(`humidity_${e}`)},400))}_toggleAuxHeat(e,t){if(!this.hass)return;const i="on"===t.attributes.aux_heat;this._safeCallService("climate","set_aux_heat",{aux_heat:!i},{entity_id:e})}_onRangeDragStart(e,t,i){t.preventDefault(),this._rangeDragCleanup&&(this._rangeDragCleanup(),this._rangeDragCleanup=null);const a=this.hass?.states[i];if(!a)return;const s=a.attributes.min_temp||7,r=a.attributes.max_temp||35,o=a.attributes.target_temp_step||.5,n=a.attributes.target_temp_low??s,c=a.attributes.target_temp_high??r;this._rangeDragEntity=i,this._rangeState={dragging:e,lowTemp:n,highTemp:c};const l=t.target.closest(".range-track");if(!l)return;const d=t=>{const i=l.getBoundingClientRect(),a=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),n=s+a*(r-s),c=Math.round(n/o)*o;if("low"===e){const e=Math.max(s,Math.min(c,this._rangeState.highTemp-o));this._rangeState={...this._rangeState,lowTemp:e}}else{const e=Math.max(this._rangeState.lowTemp+o,Math.min(c,r));this._rangeState={...this._rangeState,highTemp:e}}this.requestUpdate()},h=()=>{this._setTemperatureRange(i,this._rangeState.lowTemp,this._rangeState.highTemp),this._rangeState={dragging:null,lowTemp:0,highTemp:0},this._rangeDragEntity=null,this.requestUpdate(),p()},p=()=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",h),this._rangeDragCleanup===p&&(this._rangeDragCleanup=null)};document.addEventListener("pointermove",d),document.addEventListener("pointerup",h),this._rangeDragCleanup=p}_updateThermalCanvas(){const e=this.shadowRoot?.querySelector("#thermal-canvas"),t=this.shadowRoot?.querySelector("#thermal-canvas-wrap");if(!e||!t)return;this._thermalCanvas||(this._thermalCanvas=new js),this._thermalCanvas.attach(e);const i=this._selectedEntity||this._getClimateIds()[0],a=i?this.hass?.states[i]:void 0,s=a&&a.attributes.hvac_action||"off";this._thermalCanvas.update(s,t.offsetWidth,t.offsetHeight)}_tempUnit(){const e=this.hass,t=e?.config,i=t?.unit_system,a=i?.temperature;return"°F"===a||"F"===a?"°F":"°C"}_avgTemp(){const e=this._getClimates(),t=[];for(const i of e){const e=i.attributes.current_temperature;null!=e&&t.push(e)}return 0===t.length?null:(t.reduce((e,t)=>e+t,0)/t.length).toFixed(1)}_getHvacAction(e){return e.attributes.hvac_action||("off"===e.state?"off":"idle")}_getIcon(e,t){if(qt(t.state))return"mdi:thermostat-off";const i=this.hass?.entities[e]?.icon,a=t.attributes.icon;return i||a||$s[t.state]||"mdi:thermostat"}render(){if(this._lang,!this._configReady)return W;const e=this._getClimates();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",W;this.style.display=""}return this._isDashboardMode||0!==e.length?"normal"===this._displayMode?this._renderNormalMode(e):this._renderListMode(e):V`
        ${this._showHeader?this._renderHeader(e):W}
        <div class="glass climate-card">
          <div class="card-inner">
            <div class="empty-state">${oi("climate.no_climates")}</div>
          </div>
        </div>
      `}_renderHeader(e){const t=e.filter(e=>{const t=e.attributes.hvac_action||"";return"heating"===t||"cooling"===t||"preheating"===t}).length,i=e.length,a=0===t?"none":t===i?"all":"some",s=this._avgTemp(),r=this._tempUnit();return V`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${oi("climate.title")}</span>
          <span class="card-count ${a}">${t}/${i}</span>
        </div>
        <span class="card-header-right">${null!=s?`${oi("climate.avg_label")} ${s}${r}`:""}</span>
      </div>
    `}_renderListMode(e){let t="";if(this._expanded&&this.hass?.states[this._expanded]){const e=this._getHvacAction(this.hass.states[this._expanded]);"heating"===e||"preheating"===e?t="heat":"cooling"===e&&(t="cool")}else{const i=e.some(e=>{const t=this._getHvacAction(e);return"heating"===t||"preheating"===t}),a=e.some(e=>"cooling"===this._getHvacAction(e));i?t="heat":a&&(t="cool")}return V`
      ${this._showHeader?this._renderHeader(e):W}
      <div class="glass climate-card list-mode">
        <div class="tint ${t}"></div>
        <div class="card-inner">
          ${e.map(e=>V`
            ${this._renderListRow(e.entity_id,e)}
            ${this._renderListFold(e.entity_id,e)}
          `)}
        </div>
      </div>
    `}_renderListRow(e,t){const i=t.attributes,a=i.friendly_name||e.split(".")[1]||e,s=qt(t.state),r="off"===t.state,o=this._getHvacAction(t),n=i.current_temperature,c=this._pendingTemps.get(`temp_${e}`)??i.temperature,l=this._expanded===e,d=t.state,h=i.preset_mode,p=this._getIcon(e,t),g=Cs[o]||"climate.unknown",u=h&&"none"!==h?h:d,m=this._bindGesture({onTap:()=>{s||this._toggle(e,t,new Event("tap"))},onLongPress:()=>{s||(this._expanded=l?null:e)},exclude:"glass-icon-button"}),_="heating"===o||"preheating"===o,f="cooling"===o,v=_?"heat":f?"cool":"info",b=_||f,y=_?"pulse-heat":f?"pulse-cool":"";return V`
      <div class="cl-row ${s?"entity-unavailable":""}" data-action=${o}
        @pointerdown=${m.pointerdown}
        @pointermove=${m.pointermove}
        @pointerup=${m.pointerup}
        @pointercancel=${m.pointercancel}
        @contextmenu=${m.contextmenu}
      >
        <glass-icon-button
          ?active=${b}
          ?glow=${b}
          ?unavailable=${s}
          ?disabled=${s}
          .activeColor=${v}
          aria-label=${oi(r?"climate.turn_on_aria":"climate.turn_off_aria")}
          @click=${i=>this._toggle(e,t,i)}
        >
          <ha-icon class=${y} .icon=${p}></ha-icon>
        </glass-icon-button>
        <button class="cl-expand-area" type="button" aria-expanded=${l?"true":"false"}>
          <div class="cl-info">
            <div class="cl-name">${a}</div>
            <div class="cl-sub">
              <span class="cl-action-text">${oi(g)}</span>
              ${r?W:V`<span class="cl-mode-badge">${u}</span>`}
            </div>
          </div>
          <div class="cl-temps">
            <div class="cl-temp-current">${s?"--":null!=n?V`${n.toFixed(1)}<span class="unit">°</span>`:"--"}</div>
            ${r||null==c?W:V`<div class="cl-temp-target">→ ${c.toFixed(1)}°</div>`}
          </div>
          ${s?V`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:V`<div class="cl-dot"></div>`}
        </button>
      </div>
    `}_renderListFold(e,t){const i=this._expanded===e;if(qt(t.state))return W;const a=this._getHvacAction(t),s="cooling"===a?"cool":"",r=this._renderListTempControl(e,t);return V`
      <div class="fold-sep ${i?"visible":""} ${s}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel">
            ${r}
            ${r!==W?V`<div class="section-sep ${"cool"===s?"cool":"heating"===a||"preheating"===a?"heat":""}"></div>`:W}
            ${this._renderFoldControls(e,t)}
          </div>
        </div>
      </div>
    `}_renderListTempControl(e,t){if("off"===t.state||"fan_only"===t.state)return W;const i=t.attributes.supported_features||0;if("heat_cool"===t.state&&i&_s){return function(e,t,i,a,s){if("heat_cool"!==e.state)return W;if(!((e.attributes.supported_features||0)&_s))return W;const r=e.attributes.min_temp||7,o=e.attributes.max_temp||35,n=e.attributes.target_temp_step||.5,c="low"===i.dragging?i.lowTemp:e.attributes.target_temp_low??r,l="high"===i.dragging?i.highTemp:e.attributes.target_temp_high??o,d=o-r,h=d>0?(c-r)/d*100:0,p=d>0?(l-r)/d*100:100;return V`
    <div class="range-slider-row">
      <div class="range-labels">
        <span class="range-label heat">${c.toFixed(1)}${t}</span>
        <span class="range-label cool">${l.toFixed(1)}${t}</span>
      </div>
      <div class="range-track">
        <div
          class="range-fill"
          style="left:${h}%;right:${100-p}%;"
        ></div>
        <button
          class="range-thumb low"
          role="slider"
          aria-label=${oi("climate.range_low_aria")}
          aria-valuemin=${r}
          aria-valuemax=${l-n}
          aria-valuenow=${c}
          style="left:${h}%;"
          @pointerdown=${e=>s("low",e)}
          @keydown=${e=>{"ArrowRight"===e.key||"ArrowUp"===e.key?(e.preventDefault(),a(Math.min(c+n,l-n),l)):"ArrowLeft"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),a(Math.max(c-n,r),l))}}
        ></button>
        <button
          class="range-thumb high"
          role="slider"
          aria-label=${oi("climate.range_high_aria")}
          aria-valuemin=${c+n}
          aria-valuemax=${o}
          aria-valuenow=${l}
          style="left:${p}%;"
          @pointerdown=${e=>s("high",e)}
          @keydown=${e=>{"ArrowRight"===e.key||"ArrowUp"===e.key?(e.preventDefault(),a(c,Math.min(l+n,o))):"ArrowLeft"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),a(c,Math.max(l-n,c+n)))}}
        ></button>
      </div>
    </div>
  `}(t,this._tempUnit(),this._rangeDragEntity===e?this._rangeState:{dragging:null,lowTemp:0,highTemp:0},(t,i)=>this._setTemperatureRange(e,t,i),(t,i)=>this._onRangeDragStart(t,i,e))}if(!(i&ms))return W;const a=this._pendingTemps.get(`temp_${e}`)??t.attributes.temperature,s=t.attributes.target_temp_step||.5,r=t.attributes.min_temp||7,o=t.attributes.max_temp||35,n=t.attributes.current_temperature,c=this._getHvacAction(t),l="heating"===c||"preheating"===c?"heat":"cooling"===c?"cool":"off",d=this._tempUnit();return null==a?W:V`
      <div class="temp-control">
        <glass-stepper-button
          .icon=${"mdi:minus"}
          ?disabled=${a<=r}
          aria-label=${oi("climate.temp_down_aria")}
          @click=${()=>this._setTemperature(e,Math.max(r,a-s))}
        ></glass-stepper-button>
        <div class="temp-display">
          <div class="temp-display-label">${oi("climate.target")}</div>
          <div class="temp-display-value ${l}">${a.toFixed(1)}<span class="unit">${d}</span></div>
          ${null!=n?V`
            <div class="temp-display-current">
              <ha-icon .icon=${"mdi:thermometer"} style="--mdc-icon-size:13px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              <span>${oi("climate.current_label")} ${n.toFixed(1)}${d}</span>
            </div>
          `:W}
        </div>
        <glass-stepper-button
          .icon=${"mdi:plus"}
          ?disabled=${a>=o}
          aria-label=${oi("climate.temp_up_aria")}
          @click=${()=>this._setTemperature(e,Math.min(o,a+s))}
        ></glass-stepper-button>
      </div>
    `}_renderFoldControls(e,t){const i=this._getHvacAction(t),a="heating"===i||"preheating"===i?"heat":"cooling"===i?"cool":"",s=function(e,t){const i=e.attributes.hvac_modes||[];if(0===i.length)return W;const a=e.state;return V`
    <div class="mode-tile-grid">
      ${i.map(e=>{const i=e===a,s=$s[e]||"mdi:thermostat",r=Es[e]?oi(Es[e]):e;return V`
          <button
            class="mode-tile mode-${e.replace("_","-")} ${i?"active":""}"
            @click=${()=>t(e)}
            aria-label=${r}
            aria-pressed=${i?"true":"false"}
          >
            <ha-icon class="mode-tile-icon" .icon=${s}></ha-icon>
            <span class="mode-tile-label">${r}</span>
          </button>
        `})}
    </div>
  `}(t,t=>this._setHvacMode(e,t)),r=function(e,t){if("off"===e.state)return W;if(!((e.attributes.supported_features||0)&bs))return W;const i=e.attributes.preset_modes||[];if(0===i.length)return W;const a=e.attributes.preset_mode;return V`
    <div class="preset-row">
      ${i.map(e=>{const i=e===a,s=Is[e]||"mdi:tune",r=zs[e]?oi(zs[e]):e;return V`
          <glass-chip
            size="sm"
            .activeColor=${Ss[e]||"accent"}
            ?active=${i}
            .icon=${s}
            aria-label=${r}
            @click=${()=>t(e)}
          >${r}</glass-chip>
        `})}
    </div>
  `}(t,t=>this._setPreset(e,t)),o=this._renderAirSection(e,t);return V`
      ${s}
      ${r!==W?V`
        ${s!==W?V`<div class="section-sep ${a}"></div>`:W}
        ${r}
      `:W}
      ${o!==W?V`
        ${s!==W||r!==W?V`<div class="section-sep ${a}"></div>`:W}
        ${o}
      `:W}
    `}_renderAirSection(e,t){const i=t.attributes.supported_features||0,a="off"===t.state,s=!a&&i&vs&&t.attributes.fan_modes||[],r=!a&&i&ys&&t.attributes.swing_modes||[],o=!a&&!!(i&fs)&&null!=t.attributes.humidity,n=!!(i&ws);if(!(s.length||r.length||o||n))return W;const c=t.attributes.fan_mode,l=t.attributes.swing_mode;return V`
      <div class="air-section">
        <div class="air-section-title">${oi("climate.section_air")}</div>
        ${s.length?V`
          <div class="air-row">
            <span class="air-row-label">${oi("climate.fan_mode")}</span>
            <div class="air-pills">
              ${s.map(t=>V`
                <button
                  class="air-pill ${t===c?"active":""}"
                  @click=${()=>this._setFanMode(e,t)}
                  aria-label="${oi("climate.fan_mode")}: ${t}"
                  aria-pressed=${t===c?"true":"false"}
                >${t.replace(/_/g," ")}</button>
              `)}
            </div>
          </div>
        `:W}
        ${r.length?V`
          <div class="air-row">
            <span class="air-row-label">${oi("climate.swing_mode")}</span>
            <div class="air-pills">
              ${r.map(t=>V`
                <button
                  class="air-pill ${t===l?"active":""}"
                  @click=${()=>this._setSwingMode(e,t)}
                  aria-label="${oi("climate.swing_mode")}: ${t}"
                  aria-pressed=${t===l?"true":"false"}
                >${t.replace(/_/g," ")}</button>
              `)}
            </div>
          </div>
        `:W}
        ${o?function(e,t,i){if(!((e.attributes.supported_features||0)&fs))return W;if("off"===e.state)return W;const a=i??e.attributes.humidity,s=e.attributes.min_humidity||30,r=e.attributes.max_humidity||99;return null==a?W:V`
    <div class="stepper-row">
      <span class="stepper-label">
        <ha-icon .icon=${"mdi:water-percent"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;margin-right:4px;"></ha-icon>
        ${oi("climate.humidity_target")}
      </span>
      <div class="stepper">
        <button
          class="btn-icon xs"
          @click=${()=>t(Math.max(s,a-1))}
          aria-label=${oi("climate.humidity_down_aria")}
          ?disabled=${a<=s}
        >
          <ha-icon .icon=${"mdi:minus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <span class="stepper-value">${a}%</span>
        <button
          class="btn-icon xs"
          @click=${()=>t(Math.min(r,a+1))}
          aria-label=${oi("climate.humidity_up_aria")}
          ?disabled=${a>=r}
        >
          <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    </div>
  `}(t,t=>this._setHumidity(e,t),this._pendingTemps.get(`humidity_${e}`)):W}
        ${n?function(e,t){if(!((e.attributes.supported_features||0)&ws))return W;const i="on"===e.attributes.aux_heat;return V`
    <div class="aux-row">
      <ha-icon .icon=${"mdi:radiator"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;margin-right:6px;"></ha-icon>
      <span class="aux-label">${oi("climate.aux_heat")}</span>
      <glass-toggle
        active-color="heat"
        .checked=${i}
        aria-label=${oi("climate.aux_heat")}
        @glass-toggle-change=${t}
      ></glass-toggle>
    </div>
  `}(t,()=>this._toggleAuxHeat(e,t)):W}
      </div>
    `}_renderNormalMode(e){const t=this._dashboardEntities.length>0||(this._roomConfig?.entity_order?.length??0)>0?e:[...e].sort((e,t)=>{const i=this._getHvacAction(e),a=this._getHvacAction(t);return(qs[i]??3)-(qs[a]??3)}),i=this._selectedEntity||t[0]?.entity_id,a=t.find(e=>e.entity_id===i)||t[0];if(!a)return V``;const s=this._getHvacAction(a),r="heating"===s||"preheating"===s?"heat":"cooling"===s?"cool":"auto"===a.state||"heat_cool"===a.state?"auto-tint":"",o="heating"===s||"preheating"===s?"heat-sep":"cooling"===s?"cool-sep":"",n=this._bindGesture({onTap:()=>{this._toggle(a.entity_id,a,new Event("tap"))},onLongPress:()=>{this._foldOpen=!this._foldOpen;const e=this.renderRoot.querySelector(".climate-card");e&&(e.classList.add("lp-pulse"),e.addEventListener("animationend",()=>e.classList.remove("lp-pulse"),{once:!0}))},onSwipe:e=>{if(t.length<=1)return;const a=t.findIndex(e=>e.entity_id===i),s="left"===e?(a+1)%t.length:(a-1+t.length)%t.length;this._selectedEntity=t[s].entity_id},exclude:"button, glass-icon-button, glass-chip, glass-toggle, glass-stepper-button, .entity-tab, .mode-tile, .air-pill"});return V`
      ${this._showHeader?this._renderHeader(e):W}
      <div class="climate-wrap ${this._foldOpen?"fold-open":""}">
        <div class="glass climate-card normal-mode"
          @pointerdown=${n.pointerdown}
          @pointermove=${n.pointermove}
          @pointerup=${n.pointerup}
          @pointercancel=${n.pointercancel}
          @contextmenu=${n.contextmenu}>
          <div class="tint ${r}"></div>
          <div class="thermal-canvas" id="thermal-canvas-wrap">
            <canvas id="thermal-canvas"></canvas>
          </div>
          <div class="card-inner">
            ${this._renderEntityTabs(t)}
            ${Os(a)}
            ${this._renderNormalTempStepper(a)}
          </div>
        </div>
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner normal-fold-inner" data-tint=${r||"none"}>
            <div class="ctrl-fold-sep-top ${o}"></div>
            <div class="ctrl-panel">
              ${this._renderFoldControls(a.entity_id,a)}
            </div>
          </div>
        </div>
      </div>
    `}_renderEntityTabs(e){if(e.length<=1)return W;const t=this._selectedEntity||e[0]?.entity_id;return V`
      <div class="entity-tabs">
        ${e.map(e=>{const i=e.attributes.friendly_name||e.entity_id,a=this._getHvacAction(e),s=e.entity_id===t,r="heating"===a||"preheating"===a?"heat":"cooling"===a?"cool":"",o=this.hass?.entities[e.entity_id],n=o?_i(o,this.hass?.devices):null,c=n?this.hass?.areas[n]:null;return V`
            <button class="entity-tab ${s?"active":""} ${r}"
              @click=${()=>{this._selectedEntity=e.entity_id}}
              aria-label=${i}
              aria-pressed=${s?"true":"false"}>
              <ha-icon .icon=${c?.icon||"mdi:home"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            </button>
          `})}
      </div>
    `}_renderNormalTempStepper(e){if("off"===e.state||"fan_only"===e.state)return W;const t=e.attributes.supported_features||0;if(!(t&ms))return W;if("heat_cool"===e.state&&t&_s)return W;const i=e.entity_id,a=this._pendingTemps.get(`temp_${i}`)??e.attributes.temperature,s=e.attributes.target_temp_step||.5,r=e.attributes.min_temp||7,o=e.attributes.max_temp||35,n=this._getHvacAction(e),c="heating"===n||"preheating"===n?"heat":"cooling"===n?"cool":"auto"===e.state||"heat_cool"===e.state?"auto-val":"off";return null==a?W:V`
      <div class="temp-control-panel">
        <glass-stepper-button
          surface="dark"
          .icon=${"mdi:minus"}
          ?disabled=${a<=r}
          aria-label=${oi("climate.temp_down_aria")}
          @click=${()=>this._setTemperature(i,Math.max(r,a-s))}
        ></glass-stepper-button>
        <div class="target-display">
          <div class="target-label">${oi("climate.target")}</div>
          <div class="target-value ${c}">${a.toFixed(1)}<span class="unit">${this._tempUnit()}</span></div>
        </div>
        <glass-stepper-button
          surface="dark"
          .icon=${"mdi:plus"}
          ?disabled=${a>=o}
          aria-label=${oi("climate.temp_up_aria")}
          @click=${()=>this._setTemperature(i,Math.min(o,a+s))}
        ></glass-stepper-button>
      </div>
    `}static{this.styles=[Dt,Pt,Tt,Rt,Lt,At,Ft,r`
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

    /* ── Air section (Fan, Swing, Humidity, Aux) ── */
    .air-section { display: flex; flex-direction: column; gap: 0.5rem; }
    .air-section-title {
      display: flex; align-items: center; gap: 0.4375rem;
      font-size: var(--fz-sm); font-weight: 700; color: var(--t2);
      letter-spacing: 0.1px;
    }
    .air-section-title::before {
      content: ''; flex-shrink: 0;
      width: 0.3125rem; height: 0.3125rem; border-radius: 50%;
      background: var(--t3); opacity: 0.7;
    }
    .air-row {
      display: flex; align-items: center; gap: 0.5rem; min-height: 1.875rem;
    }
    .air-row-label {
      font-size: var(--fz-sm); font-weight: 600; color: var(--t3);
      flex-shrink: 0; min-width: 3.25rem;
    }
    .air-pills {
      display: flex; gap: 0.25rem; overflow-x: auto; scrollbar-width: none;
      flex: 1; min-width: 0;
    }
    .air-pills::-webkit-scrollbar { display: none; }
    .air-pill {
      position: relative;
      padding: 0.3125rem 0.625rem; border-radius: var(--radius-sm);
      background: var(--s1); border: 1px solid var(--b1);
      font-family: inherit; font-size: var(--fz-sm); font-weight: 600;
      color: var(--t3); cursor: pointer; outline: none;
      transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
      white-space: nowrap; flex-shrink: 0;
      text-transform: capitalize;
      -webkit-tap-highlight-color: transparent;
    }
    @media (pointer: coarse) {
      .air-pill::after {
        content: ''; position: absolute; left: 0; right: 0; top: -0.5rem; bottom: -0.5rem;
      }
    }
    .air-pill:focus-visible { outline: 2px solid rgba(var(--rgb-white), 0.25); outline-offset: -2px; }
    @media (hover: hover) and (pointer: fine) {
      .air-pill:not(.active):hover { background: var(--s2); color: var(--t2); }
    }
    @media (hover: hover) { .air-pill:active { transform: scale(0.96); } }
    @media (pointer: coarse) { .air-pill:active { animation: bounce 0.3s ease; } }
    .air-pill.active {
      background: var(--s3); color: var(--t1); border-color: var(--b3);
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
  `]}}Fs([pe({attribute:!1})],Ns.prototype,"areaId"),Fs([pe({attribute:!1})],Ns.prototype,"visibleAreaIds"),Fs([ge()],Ns.prototype,"_showHeader"),Fs([ge()],Ns.prototype,"_displayMode"),Fs([ge()],Ns.prototype,"_configReady"),Fs([ge()],Ns.prototype,"_expanded"),Fs([ge()],Ns.prototype,"_selectedEntity"),Fs([ge()],Ns.prototype,"_foldOpen");try{customElements.define("glass-climate-card",Ns)}catch{}hi("glass-cover-card-editor");var Vs=Object.defineProperty,Bs=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Vs(t,i,r),r};const Us=1,Ws=2,Ks=4,Ys=8,Gs=128,Xs={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains-closed"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"],awning:["mdi:awning-outline","mdi:awning-outline"],shade:["mdi:roller-shade-open","mdi:roller-shade"],window:["mdi:window-open","mdi:window-closed"],damper:["mdi:valve-open","mdi:valve"]},Qs={vertical:{open:"mdi:arrow-up",close:"mdi:arrow-down",stop:"mdi:stop"},garage:{open:"mdi:garage-open",close:"mdi:garage",stop:"mdi:stop"},gate:{open:"mdi:gate-open",close:"mdi:gate",stop:"mdi:stop"},door:{open:"mdi:door-open",close:"mdi:door-closed",stop:null},damper:{open:"mdi:valve-open",close:"mdi:valve",stop:null},window:{open:"mdi:window-open",close:"mdi:window-closed",stop:null}};function Js(e,t){return(Xs[e]||Xs.shutter)[t?0:1]}class Zs extends ui{constructor(){super(...arguments),this._expanded=null,this._coverConfig={show_header:!0,dashboard_entities:[],entity_presets:{}},this._roomConfig=null,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1,this._throttleTimers=new Map,this._lastDirection=new Map,this._coversCache=null,this._coversCacheKey=""}static getConfigElement(){return document.createElement("glass-cover-card-editor")}getCardSize(){return 3}static{this.styles=[Dt,Pt,Tt,Rt,Lt,At,Ft,r`
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
  `]}connectedCallback(){super.connectedCallback(),this._listen("cover-config-changed",()=>{this._coversCacheKey="",this._loadConfig()}),this._listen("room-config-changed",e=>{this.areaId&&e.areaId===this.areaId&&(this._roomConfig=null,this._coversCacheKey="",this._loadRoomConfig(this.areaId))})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_collapseExpanded(){null!==this._expanded&&(this._expanded=null)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomConfig=null,this._roomLoading=!1),this._configLoaded||this._configLoading||(this._backend=new yi(this.hass),this._loadConfig())),e.has("areaId")&&this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._roomConfig=null,this._expanded=null,this.areaId&&this._loadRoomConfig(this.areaId))}getTrackedEntityIds(){return this._getCovers().map(e=>e.entityId)}async _loadConfig(){if(this._backend&&!this._configLoading){this._configLoading=!0;try{const e=await this._backend.send("get_config");e?.cover_card&&(this._coverConfig=e.cover_card),this._configLoaded=!0,this._configLoading=!1,this.areaId&&this._loadRoomConfig(this.areaId),this.requestUpdate()}catch{this._configLoading=!1}}}async _loadRoomConfig(e){if(this._backend&&!this._roomLoading){this._roomLoading=!0;try{const t=await this._backend.send("get_room",{area_id:e});this.areaId===e&&(this._roomConfig=t?{...t,entity_layouts:t.entity_layouts??{}}:null,this.requestUpdate())}catch{}finally{this._roomLoading=!1}}}_getCovers(){if(!this.hass)return[];let e;if(this.areaId){if(e=fi(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id),this._roomConfig){const t=new Set(this._roomConfig.hidden_entities);e=e.filter(e=>!t.has(e));const i=this._roomConfig.entity_order;e.sort((e,t)=>{const a=i.indexOf(e),s=i.indexOf(t);return-1!==a&&-1!==s?a-s:-1!==a?-1:-1!==s?1:0})}}else e=this._coverConfig.dashboard_entities;const t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.attributes.current_position}:${t.attributes.current_tilt_position}`:e}).join("|");return t===this._coversCacheKey&&this._coversCache||(this._coversCache=e.map(e=>{const t=this.hass?.states[e];return t?function(e,t){const i=t.attributes,a=i.device_class||"shutter",s=i.supported_features||0,r=i.current_position,o=i.current_tilt_position,n="open"===t.state||"opening"===t.state;return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,isOpen:n,position:r??null,tiltPosition:o??null,deviceClass:a,features:s}}(e,t):null}).filter(e=>null!==e),this._coversCacheKey=t),this._coversCache}_toggleCover(e,t){if(t?.stopPropagation(),!this.hass)return;const i=e.entity.state;if("opening"===i||"closing"===i)this._lastDirection.set(e.entityId,i),this._safeCallService("cover","stop_cover",{},{entity_id:e.entityId});else if("closed"===i)this._lastDirection.delete(e.entityId),this._safeCallService("cover","open_cover",{},{entity_id:e.entityId});else{const t=this._lastDirection.get(e.entityId);this._lastDirection.delete(e.entityId),"opening"===t?this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}):"closing"===t?this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}):this._safeCallService("cover","close_cover",{},{entity_id:e.entityId})}}_openCover(e,t){t.stopPropagation(),this.hass&&(mi(this,"light"),this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}))}_closeCover(e,t){t.stopPropagation(),this.hass&&(mi(this,"light"),this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}))}_stopCover(e,t){t.stopPropagation(),this.hass&&(mi(this,"light"),this._safeCallService("cover","stop_cover",{},{entity_id:e.entityId}))}_setPosition(e,t){if(!this.hass)return;const i=this._throttleTimers.get(e.entityId);i&&clearTimeout(i),this._throttleTimers.set(e.entityId,window.setTimeout(()=>{this._throttleTimers.delete(e.entityId),this._safeCallService("cover","set_cover_position",{position:t},{entity_id:e.entityId})},50))}_setTiltPosition(e,t){if(!this.hass)return;const i=`${e.entityId}_tilt`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,window.setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("cover","set_cover_tilt_position",{tilt_position:t},{entity_id:e.entityId})},50))}_openAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&Us&&this._safeCallService("cover","open_cover",{},{entity_id:t.entityId})}_closeAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&Ws&&this._safeCallService("cover","close_cover",{},{entity_id:t.entityId})}_setPreset(e,t,i){i.stopPropagation(),this.hass&&(mi(this,"light"),e.features&Ks?this._safeCallService("cover","set_cover_position",{position:t},{entity_id:e.entityId}):t>0?this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}):this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}))}_toggleExpand(e){this._expanded=this._expanded===e?null:e}render(){this._lang;const e=this._getCovers();if(0===e.length&&!this.areaId)return this.style.display="none",W;this.style.display="";const t=this._coverConfig.show_header,i=e.filter(e=>e.isOpen).length,a=e.length;return V`
      ${t?V`
        <div class="cover-header">
          <div class="cover-header-left">
            <span class="cover-title">${oi("cover.title")}</span>
            <span class="cover-count ${0===i?"none":i===a?"all":"some"}">${i}/${a}</span>
          </div>
          <glass-toggle
            active-color="purple"
            .checked=${i>0}
            aria-label=${oi(i>0?"cover.close_all_aria":"cover.open_all_aria")}
            @glass-toggle-change=${()=>i>0?this._closeAll():this._openAll()}
          ></glass-toggle>
        </div>
      `:W}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${a>0?(i/a*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${0===e.length?V`
            <div style="padding:16px;text-align:center;font-size:var(--fz-base);color:var(--t4);grid-column:1/-1;">${oi("config.cover_no_covers")}</div>
          `:W}
          ${this.areaId?this._renderGrid(e):this._renderDashboardGrid(e)}
        </div>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const s=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;s?(t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(s,!0,!0)),t.push(this._renderControlFold(a,"left")),t.push(this._renderControlFold(s,"right")),i+=2):(t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++)}else t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++}return t}_getDashboardLayout(e){const t=this._coverConfig.dashboard_entity_layouts;return t&&t[e]?t[e]:!1!==this._coverConfig.dashboard_compact?"compact":"full"}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if("compact"===this._getDashboardLayout(a.entityId)){const s=i+1<e.length&&"compact"===this._getDashboardLayout(e[i+1].entityId)?e[i+1]:null;s?(t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(s,!0,!0)),t.push(this._renderControlFold(a,"left")),t.push(this._renderControlFold(s,"right")),i+=2):(t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++)}else t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++}return t}_renderCoverRow(e,t=!1,i=!1){const a=this._expanded===e.entityId,s=qt(e.entity.state),r=["cv-row",e.isOpen?"open":"",t?"compact":"",i?"compact-right":"",s?"entity-unavailable":""].filter(Boolean).join(" "),o=this._bindGesture({onTap:()=>this._toggleCover(e),onLongPress:()=>this._toggleExpand(e.entityId),exclude:"glass-icon-button"});return V`
      <div
        class=${r}
        @pointerdown=${o.pointerdown}
        @pointerup=${o.pointerup}
        @pointermove=${o.pointermove}
        @pointercancel=${o.pointercancel}
        @contextmenu=${o.contextmenu}
      >
        <glass-icon-button
          .icon=${Js(e.deviceClass,e.isOpen)}
          ?active=${e.isOpen}
          ?glow=${e.isOpen}
          ?unavailable=${s}
          active-color="purple"
          aria-label=${oi("cover.toggle_aria",{name:e.name})}
          @click=${t=>this._toggleCover(e,t)}
        ></glass-icon-button>
        <button
          class="cv-expand-btn"
          aria-expanded=${a?"true":"false"}
          aria-label=${oi("cover.expand_aria",{name:e.name})}
        >
          <div class="cv-info">
            <div class="cv-name">${e.name}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${function(e){switch(e){case"open":return oi("cover.open");case"closed":return oi("cover.closed");case"opening":return oi("cover.opening");case"closing":return oi("cover.closing");default:return e}}(e.entity.state)}</span>
            </div>
          </div>
          ${null!==e.position?V`
            <div class="cv-position">${e.position}<span class="unit">%</span></div>
          `:W}
          ${s?V`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:V`<div class="cv-dot"></div>`}
        </button>
      </div>
    `}_renderControlFold(e,t="full"){const i=this._expanded===e.entityId;return V`
      <div class="fold-sep fold-sep-${t} ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):W}
        </div>
      </div>
    `}_renderControls(e){const t=e.features,i=(a=e.deviceClass,["shutter","blind","shade","curtain","awning"].includes(a)?Qs.vertical:Qs[a]||Qs.vertical);var a;const s=!!(t&Ks),r=!!(t&Gs),o=[];if(s){const t=this._coverConfig.entity_presets[e.entityId],i=t&&t.length>0?t:[0,25,50,75,100];for(const a of i){const t=a>=50,i=0===a?oi("cover.preset_closed"):100===a?oi("cover.preset_open"):`${a}%`;o.push({label:i,icon:Js(e.deviceClass,t),position:a})}}else o.push({label:oi("cover.preset_closed"),icon:Js(e.deviceClass,!1),position:0},{label:oi("cover.preset_open"),icon:Js(e.deviceClass,!0),position:100});return V`
      <div class="ctrl-panel">
        <div class="transport-row">
          ${t&Us?V`
            <glass-transport-button
              .icon=${i.open}
              active-color="purple"
              ?active=${100===e.position||null===e.position&&e.isOpen}
              aria-label=${oi("cover.open_aria",{name:e.name})}
              @click=${t=>this._openCover(e,t)}
            ></glass-transport-button>
          `:W}
          ${t&Ys?V`
            <glass-transport-button
              .icon=${i.stop||"mdi:stop"}
              aria-label=${oi("cover.stop_aria",{name:e.name})}
              @click=${t=>this._stopCover(e,t)}
            ></glass-transport-button>
          `:W}
          ${t&Ws?V`
            <glass-transport-button
              .icon=${i.close}
              active-color="purple"
              ?active=${0===e.position||null===e.position&&!e.isOpen}
              aria-label=${oi("cover.close_aria",{name:e.name})}
              @click=${t=>this._closeCover(e,t)}
            ></glass-transport-button>
          `:W}
        </div>

        ${s?V`
          <div class="cover-section">
            <glass-section-title label=${oi("cover.section_position")}></glass-section-title>
            <div class="slider-wrap">
              <div class="slider-icon"><ha-icon .icon=${Js(e.deviceClass,!1)}></ha-icon></div>
              <glass-slider
                .value=${e.position??0}
                color="var(--rgb-purple)"
                .label=${`${e.position??0}%`}
                @glass-slider-input=${t=>this._setPosition(e,t.detail.value)}
                @glass-slider-change=${t=>this._setPosition(e,t.detail.value)}
              ></glass-slider>
              <div class="slider-icon"><ha-icon .icon=${Js(e.deviceClass,!0)}></ha-icon></div>
            </div>
          </div>
        `:W}

        ${r?V`
          <div class="cover-section">
            <glass-section-title label=${oi("cover.section_tilt")}></glass-section-title>
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
        `:W}

        <div class="cover-section">
          <glass-section-title label=${oi("cover.section_presets")}></glass-section-title>
          <div class="preset-row">
            ${o.map(t=>V`
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
    `}}Bs([pe()],Zs.prototype,"areaId"),Bs([ge()],Zs.prototype,"_expanded"),Bs([ge()],Zs.prototype,"_coverConfig");try{customElements.define("glass-cover-card",Zs)}catch{}hi("glass-fan-card-editor");var er=Object.defineProperty,tr=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&er(t,i,r),r};const ir=1,ar=2,sr=4,rr=8,or={auto:"mdi:autorenew",eco:"mdi:leaf",night:"mdi:weather-night",nuit:"mdi:weather-night",comfort:"mdi:sofa",confort:"mdi:sofa",silent:"mdi:volume-off",silence:"mdi:volume-off",turbo:"mdi:lightning-bolt"};function nr(e,t){return e<=0?0:Math.max(1,Math.min(t,Math.round(e/(100/t))))}function cr(e,t){return e<=0?0:e/t*100}function lr(e,t){return cr(nr(e,t),t)}const dr={auto:"fan.preset_auto",eco:"fan.preset_eco",night:"fan.preset_night",nuit:"fan.preset_night",comfort:"fan.preset_comfort",confort:"fan.preset_comfort",silent:"fan.preset_silent",silence:"fan.preset_silent",turbo:"fan.preset_turbo"};function hr(e){const t=dr[e.toLowerCase()];return t?oi(t):e.charAt(0).toUpperCase()+e.slice(1)}class pr extends ui{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._showHeader=!0,this._fanConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._fansFingerprint="",this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._schedules=null,this._schedulesLoaded=!1}static getConfigElement(){return document.createElement("glass-fan-card-editor")}getCardSize(){return 3}get _isDashboardMode(){return!this.areaId}static{this.styles=[Dt,Pt,Tt,Rt,Lt,At,Ft,r`
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
  `]}connectedCallback(){super.connectedCallback(),this._listen("fan-config-changed",()=>{this._fanConfigLoaded=!1,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadFanConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._fanConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._fanConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._fanConfigLoaded&&this._loadFanConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedFanIds=void 0,this._fansFingerprint="")}if(e.has("visibleAreaIds")&&(this._cachedFanIds=void 0,this._fansFingerprint="",this._dashboardHiddenLoaded=!1),e.has("hass")&&this._dragValues.size>0){const e=this._getFanInfos();let t=!1;const i=new Map(this._dragValues);for(const a of e){const e=`speed:${a.entityId}`,s=i.get(e);void 0!==s&&Math.abs(a.percentage-s)<=2&&(i.delete(e),t=!0);const r=`light:${a.entityId}`,o=i.get(r);if(void 0!==o&&a.lightEntityId){const e=this.hass?.states[a.lightEntityId];if(e){const a=e.attributes.brightness??0,s=Math.round(a/255*100);Math.abs(s-o)<=2&&(i.delete(r),t=!0)}}}t&&(this._dragValues=i)}}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?bi("fan",this.hass,this.visibleAreaIds):this._getFanInfos().map(e=>e.entityId)}async _loadFanConfig(){if(this.hass&&!this._fanConfigLoaded){this._fanConfigLoaded=!0;try{this._backend||(this._backend=new yi(this.hass));const e=await this._backend.send("get_config");e?.fan_card&&(this._showHeader=e.fan_card.show_header??!0)}catch{}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new yi(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new yi(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new yi(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedFanIds=void 0,this._fansFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_getFanIds(){return this._cachedFanIds||(this._cachedFanIds=this._computeFanIds()),this._cachedFanIds}_computeFanIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=fi(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("fan.")&&!e.has(t.entity_id)&&vi(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),s=e.get(i);return void 0!==a&&void 0!==s?a-s:void 0!==a?-1:void 0!==s?1:0})}return t}if(this._isDashboardMode){const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of fi(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("fan.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getFanInfos(){if(!this.hass)return[];const e=this._getFanIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._fansFingerprint&&this._cachedFansResult)return this._cachedFansResult;this._fansFingerprint=t;const i=e.map(e=>{const t=this.hass?.states[e];return t?this._buildFanInfo(e,t):null}).filter(e=>null!==e);return this._isDashboardMode?this._cachedFansResult=i.filter(e=>e.isOn):this._cachedFansResult=i,this._cachedFansResult}_buildFanInfo(e,t){const i=t.attributes,a="on"===t.state,s=i.percentage??0,r=i.percentage_step,o=i.speed_count??(r&&r>0?Math.round(100/r):3),n=i.direction||null,c=i.oscillating||!1,l=i.preset_mode||null,d=i.preset_modes||[],h=i.supported_features||0,p=function(e,t){if("ceiling"===t.attributes.device_class)return!0;const i=e.toLowerCase();return i.includes("ceiling")||i.includes("plafond")||i.includes("plafonnier")}(e,t),g=this.hass?.entities[e]?.icon,u=i.icon,m=g||u||(p?"mdi:ceiling-fan":"mdi:fan"),_=p&&this.hass?function(e,t){const i=e.replace("fan.",""),a=[`light.${i}`,`light.${i}_light`];for(const s of a)if(t.states[s])return s;if(t.entities){const i=t.entities[e];if(i?.device_id)for(const[e,a]of Object.entries(t.entities))if(e.startsWith("light.")&&a.device_id===i.device_id&&t.states[e])return e}return null}(e,this.hass):null,f=!(!!(h&rr)&&d.length>0||!!(h&sr)||!!(h&ar)||_);return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,icon:m,isCeiling:p,isOn:a,percentage:a?s:0,speedCount:o,direction:n,oscillating:c,presetMode:a?l:null,presetModes:d,supportedFeatures:h,lightEntityId:_,isSimple:f}}_toggleFan(e,t){if(t?.stopPropagation(),this.hass)if(mi(this,"light"),e.isOn)this._safeCallService("fan","turn_off",{},{entity_id:e.entityId});else{if(e.supportedFeatures&ir){const t=cr(1,e.speedCount);this._safeCallService("fan","turn_on",{percentage:t},{entity_id:e.entityId})}else this._safeCallService("fan","turn_on",{},{entity_id:e.entityId})}}_toggleAll(){if(!this.hass)return;const e=this._getFanInfos(),t=e.some(e=>e.isOn);if(t){const t=e.map(e=>e.entityId);this._safeCallService("fan","turn_off",{},{entity_id:t})}else for(const i of e){if(i.supportedFeatures&ir){const e=cr(1,i.speedCount);this._safeCallService("fan","turn_on",{percentage:e},{entity_id:i.entityId})}else this._safeCallService("fan","turn_on",{},{entity_id:i.entityId})}t&&(this._expandedEntity=null)}_setSpeed(e,t){this.hass&&(mi(this,"light"),0!==t?(e.isOn||this._safeCallService("fan","turn_on",{},{entity_id:e.entityId}),this._safeCallService("fan","set_percentage",{percentage:t},{entity_id:e.entityId})):this._safeCallService("fan","turn_off",{},{entity_id:e.entityId}))}_setPresetMode(e,t,i){i.stopPropagation(),this.hass&&(e.presetMode!==t?(e.isOn||this._safeCallService("fan","turn_on",{},{entity_id:e.entityId}),this._safeCallService("fan","set_preset_mode",{preset_mode:t},{entity_id:e.entityId})):e.percentage>0&&this._safeCallService("fan","set_percentage",{percentage:e.percentage},{entity_id:e.entityId}))}_setDirection(e,t,i){i.stopPropagation(),this.hass&&(mi(this,"light"),this._safeCallService("fan","set_direction",{direction:t},{entity_id:e.entityId}))}_toggleOscillation(e,t){t.stopPropagation(),this.hass&&this._safeCallService("fan","oscillate",{oscillating:!e.oscillating},{entity_id:e.entityId})}_toggleCeilingLight(e,t){if(t.stopPropagation(),!this.hass||!e.lightEntityId)return;const i=this.hass.states[e.lightEntityId],a="on"===i?.state?"turn_off":"turn_on";this._safeCallService("light",a,{},{entity_id:e.lightEntityId})}_hasControls(e){const t=e.supportedFeatures;return!!(t&ir||t&rr||t&sr||t&ar||e.lightEntityId)}_toggleExpand(e){this._expandedEntity===e.entityId?this._expandedEntity=null:this._expandedEntity=e.entityId}_onSpeedSliderInput(e,t){const i=lr(t,e.speedCount),a=new Map(this._dragValues);a.set(`speed:${e.entityId}`,i),this._dragValues=a}_onSpeedSliderChange(e,t){const i=lr(t,e.speedCount);this._setSpeed(e,i);const a=new Map(this._dragValues);a.delete(`speed:${e.entityId}`),this._dragValues=a}_onLightSliderInput(e,t){if(!e.lightEntityId||!this.hass)return;const i=new Map(this._dragValues);i.set(`light:${e.entityId}`,t),this._dragValues=i;const a=`light:${e.entityId}`,s=this._throttleTimers.get(a);s&&clearTimeout(s);const r=e.lightEntityId;this._throttleTimers.set(a,setTimeout(()=>{this._throttleTimers.delete(a);const e=this._dragValues.get(a)??t,i=Math.round(e/100*255);this._safeCallService("light","turn_on",{brightness:i},{entity_id:r})},100))}_onLightSliderChange(e,t){if(!e.lightEntityId||!this.hass)return;const i=Math.round(t/100*255);this._safeCallService("light","turn_on",{brightness:i},{entity_id:e.lightEntityId});const a=new Map(this._dragValues);a.delete(`light:${e.entityId}`),this._dragValues=a}render(){this._lang;const e=this._getFanInfos();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",W;this.style.display=""}if(!this._isDashboardMode&&0===e.length)return V`
        ${this._showHeader?this._renderHeader(0,0):W}
        <div class="glass fan-card">
          <div class="card-inner">
            <div class="empty-state">${oi("fan.no_fans")}</div>
          </div>
        </div>
      `;const t=e.filter(e=>e.isOn).length,i=e.length;return V`
      ${this._showHeader?this._renderHeader(t,i):W}
      <div class="glass fan-card">
        <div class="tint" style="background:radial-gradient(ellipse at 30% 30%, var(--c-accent), transparent 70%);opacity:${i>0?(t/i*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${this._isDashboardMode?this._renderDashboardGrid(e):this._renderGrid(e)}
        </div>
      </div>
    `}_renderHeader(e,t){const i=e>0,a=0===e?"none":e===t?"all":"some";return V`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${oi("fan.title")}</span>
          <span class="card-count ${a}">${e}/${t}</span>
        </div>
        <glass-toggle
          active-color="cool"
          .checked=${i}
          aria-label=${oi(i?"fan.toggle_all_on_aria":"fan.toggle_all_off_aria")}
          @glass-toggle-change=${()=>this._toggleAll()}
        ></glass-toggle>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const s=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;s?(t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(s,!0,!0)),t.push(this._renderControlFold(a,"left")),t.push(this._renderControlFold(s,"right")),i+=2):(t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++)}else t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++}return t}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],s=i+1<e.length?e[i+1]:null;s?(t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(s,!0,!0)),t.push(this._renderControlFold(a,"left")),t.push(this._renderControlFold(s,"right")),i+=2):(t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,"full")),i++)}return t}_renderFanRow(e,t=!1,i=!1){const a=this._dragValues.get(`speed:${e.entityId}`),s=a??e.percentage,r=this._expandedEntity===e.entityId,o=this._hasControls(e);let n;n=o?e.isOn||void 0!==a?`${s}%`:oi("fan.off"):e.isOn?oi("common.on"):oi("fan.off");const c=qt(e.entity.state),l=["fan-row",e.isOn?"on":"",t?"compact":"",i?"compact-right":"",c?"entity-unavailable":""].filter(Boolean).join(" "),d=this._bindGesture({onTap:()=>this._toggleFan(e),onLongPress:o?()=>this._toggleExpand(e):void 0,exclude:"glass-icon-button"});return V`
      <div
        class=${l}
        @pointerdown=${d.pointerdown}
        @pointerup=${d.pointerup}
        @pointermove=${d.pointermove}
        @pointercancel=${d.pointercancel}
        @contextmenu=${d.contextmenu}
      >
        <glass-icon-button
          ?active=${e.isOn}
          ?glow=${e.isOn}
          ?unavailable=${c}
          active-color="cool"
          aria-label=${oi("fan.toggle_aria",{name:e.name})}
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
          aria-expanded=${o&&r?"true":"false"}
          aria-label=${oi(o?"fan.expand_aria":"fan.toggle_aria",{name:e.name})}
        >
          <div class="fan-info">
            <div class="fan-name">${e.name}</div>
            <div class="fan-sub">
              <span class="fan-speed-text">${n}</span>
              ${e.isOn&&null!==e.direction?V`
                <span class="fan-direction">
                  <ha-icon .icon=${"forward"===e.direction?"mdi:rotate-right":"mdi:rotate-left"}></ha-icon>
                  ${"forward"===e.direction?oi("fan.direction_forward"):oi("fan.direction_reverse")}
                </span>
              `:W}
            </div>
          </div>
          ${c?V`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:V`<div class="fan-dot"></div>`}
        </button>
      </div>
    `;var h}_renderControlFold(e,t="full"){if(!this._hasControls(e))return W;const i=this._expandedEntity===e.entityId;return V`
      <div class="fold-sep fold-sep-${t} ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):W}
        </div>
      </div>
    `}_renderControls(e){const t=e.supportedFeatures,i=!!(t&ir),a=!!(t&rr)&&e.presetModes.length>0,s=!!(t&sr),r=!!(t&ar),o=this._dragValues.get(`speed:${e.entityId}`),n=o??e.percentage,c=e.isOn||void 0!==o?nr(n,e.speedCount):0;return V`
      <div class="ctrl-panel">
        ${i?V`
          <div class="fan-section">
            <glass-section-title label=${oi("fan.section_speed")}></glass-section-title>
            <div class="speed-steps">
              ${Array.from({length:e.speedCount},(t,i)=>{const a=i+1,s=cr(a,e.speedCount),r=function(e,t){return Math.round(cr(e,t))}(a,e.speedCount);return V`
                  <button
                    class="speed-step ${c===a?"active":""}"
                    @click=${t=>{t.stopPropagation(),this._setSpeed(e,s)}}
                    aria-label=${oi("fan.speed_step_aria",{step:String(a),pct:String(r)})}
                  >
                    <span>${a}</span>
                    <span class="speed-step-pct">${r}%</span>
                  </button>
                `})}
            </div>
            ${e.isSimple?W:V`
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
        `:W}

        ${a?V`
          <div class="fan-section">
            <glass-section-title label=${oi("fan.section_mode")}></glass-section-title>
            <div class="mode-row">
              ${e.presetModes.map(t=>V`
                <glass-chip
                  size="sm"
                  active-color="cool"
                  ?active=${e.presetMode===t}
                  .icon=${or[t.toLowerCase()]||"mdi:cog"}
                  aria-label=${hr(t)}
                  @click=${i=>this._setPresetMode(e,t,i)}
                >${hr(t)}</glass-chip>
              `)}
            </div>
          </div>
        `:W}

        ${s?V`
          <div class="fan-section">
            <glass-section-title label=${oi("fan.section_direction")}></glass-section-title>
            <div class="direction-row">
              <div class="direction-label">
                <ha-icon .icon=${"mdi:rotate-3d-variant"}></ha-icon>
                ${oi("fan.direction")}
              </div>
              <div class="direction-btns">
                <glass-icon-button
                  size="sm"
                  active-color="cool"
                  ?active=${"forward"===e.direction}
                  .icon=${"mdi:rotate-right"}
                  aria-label=${oi("fan.direction_forward_aria")}
                  @click=${t=>this._setDirection(e,"forward",t)}
                ></glass-icon-button>
                <glass-icon-button
                  size="sm"
                  active-color="cool"
                  ?active=${"reverse"===e.direction}
                  .icon=${"mdi:rotate-left"}
                  aria-label=${oi("fan.direction_reverse_aria")}
                  @click=${t=>this._setDirection(e,"reverse",t)}
                ></glass-icon-button>
              </div>
            </div>
          </div>
        `:W}

        ${r?V`
          <div class="fan-section">
            <glass-section-title label=${oi("fan.section_oscillation")}></glass-section-title>
            <div class="osc-row">
              <div class="osc-label">
                <ha-icon .icon=${"mdi:arrow-left-right"}></ha-icon>
                ${oi("fan.oscillation")}
              </div>
              <glass-toggle
                active-color="cool"
                .checked=${e.oscillating}
                aria-label=${oi("fan.oscillation_aria")}
                @glass-toggle-change=${t=>this._toggleOscillation(e,t)}
              ></glass-toggle>
            </div>
          </div>
        `:W}

        ${e.lightEntityId?this._renderCeilingLight(e):W}
      </div>
    `}_renderCeilingLight(e){if(!e.lightEntityId||!this.hass)return W;const t=this.hass.states[e.lightEntityId];if(!t)return W;const i="on"===t.state,a=t.attributes.brightness??0,s=this._dragValues.get(`light:${e.entityId}`)??(i?Math.round(a/255*100):0);return V`
      <div class="ctrl-sep"></div>
      <!-- Ceiling light -->
      <div class="ceiling-light-row">
        <div class="ceiling-light-label">
          <ha-icon .icon=${"mdi:lightbulb-outline"}></ha-icon>
          ${oi("fan.ceiling_light")}
        </div>
        <glass-toggle
          active-color="light-glow"
          .checked=${i}
          aria-label=${oi("fan.ceiling_light_aria")}
          @glass-toggle-change=${t=>this._toggleCeilingLight(e,t)}
        ></glass-toggle>
      </div>
      ${i?V`
        <div class="slider-wrap">
          <div class="slider-icon"><ha-icon .icon=${"mdi:brightness-6"}></ha-icon></div>
          <glass-slider
            .value=${s}
            color="var(--rgb-light-glow)"
            .label=${`${s}%`}
            @glass-slider-input=${t=>this._onLightSliderInput(e,t.detail.value)}
            @glass-slider-change=${t=>this._onLightSliderChange(e,t.detail.value)}
          ></glass-slider>
        </div>
      `:W}
    `}}tr([pe({attribute:!1})],pr.prototype,"areaId"),tr([pe({attribute:!1})],pr.prototype,"visibleAreaIds"),tr([ge()],pr.prototype,"_expandedEntity"),tr([ge()],pr.prototype,"_dragValues"),tr([ge()],pr.prototype,"_showHeader");try{customElements.define("glass-fan-card",pr)}catch{}hi("glass-media-card-editor");var gr=Object.defineProperty,ur=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&gr(t,i,r),r};const mr=524288;function _r(e){const t=e.attributes;let i=0;return t.media_position_updated_at&&(i=new Date(t.media_position_updated_at).getTime()/1e3),{entityId:e.entity_id,name:t.friendly_name||e.entity_id,state:e.state,title:t.media_title||"",artist:t.media_artist||"",albumArt:t.entity_picture||"",appName:t.app_name||"",volume:"number"==typeof t.volume_level?t.volume_level:0,isMuted:!!t.is_volume_muted,features:t.supported_features||0,groupMembers:Array.isArray(t.group_members)?t.group_members:[],shuffle:!!t.shuffle,repeat:t.repeat||"off",source:t.source||"",sourceList:Array.isArray(t.source_list)?t.source_list:[],soundMode:t.sound_mode||"",soundModeList:Array.isArray(t.sound_mode_list)?t.sound_mode_list:[],duration:"number"==typeof t.media_duration?t.media_duration:0,elapsed:"number"==typeof t.media_position?t.media_position:0,positionUpdatedAt:i,lastUpdated:e.last_updated?new Date(e.last_updated).getTime():0,icon:t.icon||"mdi:speaker"}}function fr(e){return"playing"===e||"buffering"===e}function vr(e){return"playing"===e||"paused"===e||"buffering"===e}function br(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}function yr(e,t){return 0!==(e.features&t)}const wr={Spotify:"mdi:spotify",AirPlay:"mdi:apple",Bluetooth:"mdi:bluetooth","Line-In":"mdi:audio-input-stereo-minijack",TV:"mdi:television",HDMI:"mdi:hdmi-port"};class xr extends ui{constructor(){super(...arguments),this._foldOpen=!1,this._mediaConfig={extra_entities:{},hidden_entities:[],show_header:!0},this._configLoaded=!1,this._roomIndex=0,this._roomEntityId="",this._prevPlayingSet="",this._swipeClass="",this._foldTab="controls",this._queueData=[],this._radioTracks=[],this._loadVersion=0,this._queueVersion=0,this._lastArtworkUrl="",this._configLoadingInProgress=!1,this._playersCache=null,this._playersCacheKey="",this._volumeThrottles=new Map,this._progressTimer=0,this._swipeAnimating=!1,this._swipeAnimTimer=0,this._queueRefreshTimer=0,this._prevMediaTitle="",this._lastMaster=null,this._lastMasterStaleTimer=0}static getConfigElement(){return document.createElement("glass-media-card-editor")}getCardSize(){return 4}setConfig(e){this._config=e}shouldUpdate(e){return!!super.shouldUpdate(e)&&(!this._swipeAnimating||1!==e.size||!e.has("hass"))}connectedCallback(){super.connectedCallback(),this._listen("media-config-changed",()=>{this._playersCache=null,this._loadConfig()}),this._listen("room-config-changed",()=>{this._playersCache=null}),this._listen("radio-queue-started",()=>{this._radioTracks=[]}),this._listen("radio-queue-track-added",e=>{this._radioTracks=[...this._radioTracks,e.track]}),this._listen("radio-queue-complete",()=>{this._foldOpen&&this._loadQueue()}),this._listen("radio-queue-error",e=>{console.warn("Radio queue error:",e.message)})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._volumeThrottles.clear(),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0),this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=0),this._queueRefreshTimer&&(clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=0),this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=null,++this._queueVersion,this._swipeAnimating=!1,this._swipeClass="",this._prevPlayingSet="",++this._loadVersion,this._configLoadingInProgress=!1,this._lastArtworkUrl="",this._samplingCanvas=void 0,this._samplingCtx=void 0,delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic"),this._unjoinUnsub?.(),this._unjoinUnsub=void 0}updated(e){if(super.updated(e),e.has("areaId")&&(this._foldOpen=!1,this._foldTab="controls",this._queueData=[],this._prevMediaTitle="",this._playersCache=null,this._playersCacheKey="",this._roomIndex=0),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._backend||(this._backend=new yi(this.hass),this._loadConfig());const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._playersCache=null,this._playersCacheKey="")}if(e.has("hass")&&this.isDashboard&&this.hass){const e=Object.entries(this.hass.states).filter(([e,t])=>e.startsWith("media_player.")&&"playing"===t.state).map(([e])=>e).sort().join(",");if(e!==this._prevPlayingSet){const t=new Set(this._prevPlayingSet.split(",").filter(Boolean)),i=e.split(",").filter(Boolean).filter(e=>!t.has(e));if(this._prevPlayingSet=e,i.length>0){const e=this._getActiveRooms(),t=e.findIndex(e=>i.includes(e.entityId)||i.some(t=>e.groupMembers.includes(t)));t>=0&&t!==this._roomIndex&&(this._roomIndex=t,this._roomEntityId=e[t].entityId)}}}if(e.has("_roomIndex")&&this._foldOpen&&"queue"===this._foldTab&&(this._queueData=[],this._prevMediaTitle="",this._loadQueue()),e.has("hass")&&this.hass&&this._foldOpen&&"queue"===this._foldTab){const e=this._getCurrentMaster(),t=e?this.hass.states[e.entityId]?.attributes?.media_title??"":"";t!==this._prevMediaTitle&&(this._prevMediaTitle=t,this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}(e.has("hass")||e.has("_roomIndex"))&&this._syncProgressTimer(),this._updateBgLightAttribute()}_updateBgLightAttribute(){const e=this.shadowRoot?.querySelector("img.dash-art-bg");if(!e)return this._lastArtworkUrl="",delete this.dataset.bgLight,void this.style.removeProperty("--c-accent-dynamic");if(!e.complete||0===e.naturalWidth)return void e.addEventListener("load",()=>this._updateBgLightAttribute(),{once:!0});if(e.src===this._lastArtworkUrl)return;this._lastArtworkUrl=e.src;const t=16;this._samplingCanvas||(this._samplingCanvas=document.createElement("canvas"),this._samplingCanvas.width=t,this._samplingCanvas.height=t,this._samplingCtx=this._samplingCanvas.getContext("2d",{willReadFrequently:!0}));const i=this._samplingCtx;if(i)try{i.clearRect(0,0,t,t),i.drawImage(e,0,0,t,t);const a=i.getImageData(0,0,t,t).data;let s=0;const r=256;for(let e=0;e<a.length;e+=4)s+=.299*a[e]+.587*a[e+1]+.114*a[e+2];s/r/255>.55?this.dataset.bgLight="true":delete this.dataset.bgLight;let o=0,n=0,c=0,l=0;for(let e=0;e<a.length;e+=4){const t=a[e],i=a[e+1],s=a[e+2],r=Math.max(t,i,s)/255,d=Math.min(t,i,s)/255,h=r===d?0:(r+d)/2>.5?(r-d)/(2-r-d):(r-d)/(r+d);h<.15||(o+=t*h,n+=i*h,c+=s*h,l+=h)}if(l>0){const e=`rgb(${Math.round(o/l)}, ${Math.round(n/l)}, ${Math.round(c/l)})`;this.style.setProperty("--c-accent-dynamic",e)}else this.style.removeProperty("--c-accent-dynamic")}catch{delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic")}}_syncProgressTimer(){const e=this.hass?this._getPlayers():[],t=this._findMaster(e),i=null!=t&&fr(t.state)&&t.duration>0;i&&!this._progressTimer?this._progressTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0)}getTrackedEntityIds(){return this.isDashboard&&this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")):this._getPlayers().map(e=>e.entityId)}get isDashboard(){return!this.areaId}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.media_card&&(this._mediaConfig={extra_entities:t.media_card.extra_entities??{},hidden_entities:t.media_card.hidden_entities??[],show_header:t.media_card.show_header??!0}),this._configLoaded=!0,this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}_getPlayers(){if(!this.hass)return[];if(this.isDashboard){const e=new Set(this._mediaConfig.hidden_entities);return Object.values(this.hass.states).filter(t=>t.entity_id.startsWith("media_player.")&&vr(t.state)&&!e.has(t.entity_id)).map(_r).sort((e,t)=>{const i=e=>"playing"===e?0:"buffering"===e?1:2,a=i(e.state)-i(t.state);return 0!==a?a:t.lastUpdated-e.lastUpdated})}const e=this.areaId??"",t=this._mediaConfig.extra_entities[e]||[],i=`${e}:${JSON.stringify(t)}`;if(this._playersCache&&this._playersCacheKey===i)return this._playersCache.map(e=>{const t=this.hass?.states[e.entityId];return t?_r(t):e});const a=(this.hass.entities?fi(e,this.hass.entities,this.hass.devices):[]).filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id),s=[...new Set([...a,...t])].map(e=>this.hass?.states[e]).filter(e=>!!e).map(_r);return this._playersCache=s,this._playersCacheKey=i,s}_findMaster(e){return e.find(e=>fr(e.state))||e.find(e=>vr(e.state))||null}_getCurrentMaster(){if(this.isDashboard){const e=this._getActiveRooms();if(!e.length)return this._lastMaster??null;return e[Math.min(this._roomIndex,e.length-1)]}return this._findMaster(this._getPlayers())}_getActiveRooms(){if(!this.hass)return[];const e=new Set(this._mediaConfig.hidden_entities),t=Object.values(this.hass.states).filter(t=>t.entity_id.startsWith("media_player.")&&vr(t.state)&&!e.has(t.entity_id)).map(_r);t.sort((e,t)=>{const i=(e.groupMembers.length>0&&e.groupMembers[0]===e.entityId?0:1)-(t.groupMembers.length>0&&t.groupMembers[0]===t.entityId?0:1);return 0!==i?i:t.lastUpdated-e.lastUpdated});const i=new Set,a=[];for(const s of t)if(!i.has(s.entityId)){for(const e of s.groupMembers)i.add(e);i.add(s.entityId),a.push(s)}return a}_togglePlayPause(e){mi(this,"light"),fr(e.state)?yr(e,1)?this._safeCallService("media_player","media_pause",{},{entity_id:e.entityId}):yr(e,4096)&&this._safeCallService("media_player","media_stop",{},{entity_id:e.entityId}):yr(e,16384)&&this._safeCallService("media_player","media_play",{},{entity_id:e.entityId})}_previous(e){mi(this,"light"),this._safeCallService("media_player","media_previous_track",{},{entity_id:e})}_next(e){mi(this,"light"),this._safeCallService("media_player","media_next_track",{},{entity_id:e}),this._foldOpen&&"queue"===this._foldTab&&(this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}_toggleMute(e){this._safeCallService("media_player","volume_mute",{is_volume_muted:!e.isMuted},{entity_id:e.entityId})}_setVolume(e,t){const i=Date.now();i-(this._volumeThrottles.get(e)||0)<100||(this._volumeThrottles.set(e,i),this._safeCallService("media_player","volume_set",{volume_level:t},{entity_id:e}))}_toggleShuffle(e){this._safeCallService("media_player","shuffle_set",{shuffle:!e.shuffle},{entity_id:e.entityId})}_cycleRepeat(e){const t="off"===e.repeat?"all":"all"===e.repeat?"one":"off";this._safeCallService("media_player","repeat_set",{repeat:t},{entity_id:e.entityId})}_selectSource(e,t){this._safeCallService("media_player","select_source",{source:t},{entity_id:e})}_selectSoundMode(e,t){this._safeCallService("media_player","select_sound_mode",{sound_mode:t},{entity_id:e})}_seekProgress(e,t,i){const a=i/100*t;this._safeCallService("media_player","media_seek",{seek_position:a},{entity_id:e})}_joinGroup(e,t){this._safeCallService("media_player","join",{group_members:[t]},{entity_id:e})}_unjoinGroup(e){this._safeCallService("media_player","unjoin",{},{entity_id:e})}async _waitForUnjoin(e,t=3e3){this._unjoinUnsub?.(),this._unjoinUnsub=void 0;const i=++this._loadVersion;return new Promise(a=>{let s=!1;const r=()=>{s||(s=!0,this._unjoinUnsub?.(),this._unjoinUnsub=void 0,clearTimeout(o))};if(!this.hass)return void a(!1);this.hass.connection.subscribeEvents(t=>{if(i===this._loadVersion){if(t.data.entity_id===e){const e=t.data.new_state?.attributes?.group_members;(!e||e.length<=1)&&(r(),a(!0))}}else r()},"state_changed").then(e=>{s?e():this._unjoinUnsub=e});const o=setTimeout(()=>{r(),a(!1)},t)})}async _smartJoin(e,t){if(!this.hass)return;const i=this.hass.states[t];if(!i)return;const a=i.attributes.group_members;a&&a.length>1&&(this._unjoinGroup(t),await this._waitForUnjoin(t),!this.isConnected||!this.hass)||this._joinGroup(e,t)}_swipeToRoom(e,t){this._swipeAnimating||(this._swipeAnimating=!0,this._foldOpen=!1,this._swipeClass="left"===e?"swipe-exit-left":"swipe-exit-right",this._swipeAnimTimer=window.setTimeout(()=>{this._roomIndex=t,this._roomEntityId="",this._swipeClass="left"===e?"swipe-enter-right":"swipe-enter-left",this._swipeAnimTimer=window.setTimeout(()=>{this._swipeClass="",this._swipeAnimating=!1},280)},220))}_onProgressPointerDown(e,t,i){e.stopPropagation();const a=e.currentTarget;a.setPointerCapture(e.pointerId);const s=a.querySelector(".dash-progress-fill"),r=a.querySelector(".dash-progress-thumb"),o=e=>{const t=a.getBoundingClientRect(),i=Math.max(0,Math.min(100,(e.clientX-t.left)/t.width*100));s.style.width=i+"%",s.style.transition="none",r.style.left=i+"%",r.style.opacity="1"};o(e);const n=e=>o(e),c=()=>{a.removeEventListener("pointermove",n),a.removeEventListener("pointerup",l),a.removeEventListener("pointercancel",c),a.removeEventListener("lostpointercapture",c),s.style.transition="",r.style.opacity=""},l=e=>{c();const s=a.getBoundingClientRect(),r=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100));this._seekProgress(t,i,r)};a.addEventListener("pointermove",n),a.addEventListener("pointerup",l),a.addEventListener("pointercancel",c),a.addEventListener("lostpointercapture",c)}_onVolKey(e,t,i){let a=null;switch(e.key){case"ArrowLeft":case"ArrowDown":a=Math.max(0,i-5);break;case"ArrowRight":case"ArrowUp":a=Math.min(100,i+5);break;case"PageDown":a=Math.max(0,i-10);break;case"PageUp":a=Math.min(100,i+10);break;case"Home":a=0;break;case"End":a=100;break;default:return}e.preventDefault(),this._setVolume(t,a/100)}_onMrVolPointerDown(e,t){e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const a=i.querySelector(".speaker-vol-fill"),s=i.querySelector(".speaker-vol-val"),r=e=>{const r=i.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));a.style.width=o+"%",s&&(s.textContent=Math.round(o)+"%"),this._setVolume(t,o/100)};r(e);const o=e=>r(e),n=()=>{mi(this,"light"),i.removeEventListener("pointermove",o),i.removeEventListener("pointerup",n),i.removeEventListener("pointercancel",n),i.removeEventListener("lostpointercapture",n)};i.addEventListener("pointermove",o),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("lostpointercapture",n)}_getElapsed(e){if(!fr(e.state)||0===e.positionUpdatedAt)return e.elapsed;const t=Date.now()/1e3-e.positionUpdatedAt;return Math.min(e.elapsed+t,e.duration)}_getProgress(e){return e.duration<=0?0:Math.min(100,this._getElapsed(e)/e.duration*100)}_renderHero(e,t=1){const i=fr(e.state),a=this._getProgress(e),s=this._getElapsed(e),r=this._getGroupablePlayers(),o=this._findGroupCoordinator(e,r),n=(o?.groupMembers||[]).length,c=this._bindGesture({onLongPress:()=>{this._foldOpen=!this._foldOpen,this._foldOpen&&this._loadQueue(),this._foldOpen&&setTimeout(()=>{const e=this.renderRoot?.querySelector(".ctrl-fold");e?.scrollIntoView({behavior:"smooth",block:"nearest"})},350)},onSwipe:e=>{this.isDashboard&&t>1&&("left"===e?this._swipeToRoom("left",(this._roomIndex+1)%t):this._swipeToRoom("right",(this._roomIndex-1+t)%t))},exclude:"button, glass-transport-button, glass-chip, glass-tabs, glass-icon-button"});return V`
      <div class="dash-wrap ${this._foldOpen?"fold-open":""}">
        <div class="dash-hero ${this._swipeClass}"
          @pointerdown=${c.pointerdown}
          @pointerup=${c.pointerup}
          @pointermove=${c.pointermove}
          @pointercancel=${c.pointercancel}
          @contextmenu=${c.contextmenu}
        >
          <!-- Full-bleed artwork background -->
          ${e.albumArt?V`
            <img class="dash-art-bg" src=${e.albumArt} alt="" loading="lazy"
              @error=${e=>{e.target.style.display="none";const t=e.target.parentElement?.querySelector(".dash-deco");t&&(t.style.display="");const i=e.target.parentElement?.querySelector(".dash-placeholder");i&&(i.style.display="")}} />
          `:W}
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
                ${i?V`
                  <div class="dash-eq playing">
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                  </div>
                `:W}
              </div>
              ${n>1?V`
                <div class="dash-group-badge glass-pill">
                  <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                  <span>${oi("media.speakers_count",{count:n})}</span>
                </div>
              `:W}
            </div>

            <!-- Spacer -->
            <div class="dash-spacer"></div>

            <!-- Bottom glass panel: track info + progress + transport -->
            <div class="dash-info-panel glass-panel">
              <div class="dash-track">
                ${e.title?V`
                  <div class="dash-track-title">${e.title}</div>
                `:W}
                ${e.artist?V`
                  <div class="dash-track-artist">${e.artist}</div>
                `:W}
              </div>

              <!-- Progress bar -->
              ${e.duration>0&&yr(e,2)?V`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${br(s)}</span>
                    <span class="dash-track-time">${br(e.duration)}</span>
                  </div>
                  <div class="dash-progress"
                    aria-label=${oi("media.seek_aria")}
                    @pointerdown=${t=>this._onProgressPointerDown(t,e.entityId,e.duration)}
                  >
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                    <div class="dash-progress-thumb" style="left:${a}%"></div>
                  </div>
                </div>
              `:e.duration>0?V`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${br(s)}</span>
                    <span class="dash-track-time">${br(e.duration)}</span>
                  </div>
                  <div class="dash-progress" style="pointer-events:none">
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                  </div>
                </div>
              `:W}

              <!-- Transport -->
              <div class="dash-transport">
                ${yr(e,32768)?V`
                  <glass-transport-button
                    .icon=${"mdi:shuffle-variant"}
                    ?active=${e.shuffle}
                    active-color="accent"
                    aria-label=${oi("media.shuffle_aria")}
                    @click=${t=>{t.stopPropagation(),this._toggleShuffle(e)}}
                  ></glass-transport-button>
                `:W}

                ${yr(e,16)?V`
                  <glass-transport-button
                    .icon=${"mdi:skip-previous"}
                    aria-label=${oi("media.prev_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._previous(e.entityId)}}
                  ></glass-transport-button>
                `:W}

                <glass-transport-button
                  variant="main"
                  .icon=${i?"mdi:pause":"mdi:play"}
                  aria-label=${oi(i?"media.pause_aria":"media.play_aria",{name:e.name})}
                  @click=${t=>{t.stopPropagation(),this._togglePlayPause(e)}}
                ></glass-transport-button>

                ${yr(e,32)?V`
                  <glass-transport-button
                    .icon=${"mdi:skip-next"}
                    aria-label=${oi("media.next_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._next(e.entityId)}}
                  ></glass-transport-button>
                `:W}

                ${yr(e,262144)?V`
                  <glass-transport-button
                    .icon=${"one"===e.repeat?"mdi:repeat-once":"mdi:repeat"}
                    ?active=${"off"!==e.repeat}
                    active-color="accent"
                    aria-label=${oi("media.repeat_aria")}
                    @click=${t=>{t.stopPropagation(),this._cycleRepeat(e)}}
                  ></glass-transport-button>
                `:W}
              </div>

              <div class="dash-source-row">
                ${o&&o.entityId!==e.entityId?V`
                  <span class="dash-coordinator-badge">
                    <ha-icon .icon=${o.icon||"mdi:speaker"}></ha-icon>
                    ${o.name}
                  </span>
                `:W}
                ${e.source?V`
                  <span class="dash-track-source">${e.source}</span>
                `:W}
              </div>
            </div>
          </div>

          <!-- Navigation arrows (desktop hover, multi-room) -->
          ${this.isDashboard&&t>1?V`
            <button class="dash-nav-arrow dash-nav-left" aria-label=${oi("media.prev_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("right",(this._roomIndex-1+t)%t)}}>
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <button class="dash-nav-arrow dash-nav-right" aria-label=${oi("media.next_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("left",(this._roomIndex+1)%t)}}>
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          `:W}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="dash-fold-sep-top"></div>
            <div class="dash-fold-panel">
              ${this._foldOpen?this._renderFoldContent(e,o,r):W}
            </div>
          </div>
        </div>
      </div>
    `}_renderFoldContent(e,t,i){const a="queue"===this._foldTab;return V`
      <glass-tabs
        layout="segmented"
        .value=${this._foldTab}
        .items=${[{value:"controls",label:oi("media.controls_tab")},{value:"queue",label:oi("media.queue_tab")}]}
        @glass-tab-change=${e=>{this._foldTab=e.detail.value,"queue"===this._foldTab&&this._loadQueue()}}
      ></glass-tabs>
      ${a?this._renderQueueTab():this._renderControlsTab(e,t,i)}
    `}_renderControlsTab(e,t,i){return V`
      <!-- Volume (master) — same bar pattern as the speakers below -->
      ${yr(e,4)?(()=>{const t=Math.round(100*(e.isMuted?0:e.volume)),i=e.isMuted||0===e.volume?"mdi:volume-off":e.volume>=.67?"mdi:volume-high":e.volume>=.34?"mdi:volume-medium":"mdi:volume-low";return V`
          <div class="speaker-row master ${e.isMuted?"muted":""}">
            ${yr(e,8)?V`
              <button class="speaker-icon-btn"
                aria-label=${e.isMuted?oi("media.unmute_aria",{name:e.name}):oi("media.mute_aria",{name:e.name})}
                @click=${t=>{t.stopPropagation(),this._toggleMute(e)}}>
                <ha-icon .icon=${i}></ha-icon>
              </button>
            `:V`
              <div class="speaker-icon-btn static">
                <ha-icon .icon=${i}></ha-icon>
              </div>
            `}
            <div class="speaker-vol-slider"
              role="slider"
              tabindex="0"
              aria-label=${oi("media.volume_aria",{name:e.name})}
              aria-valuenow=${t}
              aria-valuemin="0"
              aria-valuemax="100"
              @pointerdown=${t=>this._onMrVolPointerDown(t,e.entityId)}
              @keydown=${i=>this._onVolKey(i,e.entityId,t)}>
              <div class="speaker-vol-fill" style="width:${t}%"></div>
              <span class="speaker-vol-val">${t}%</span>
            </div>
          </div>
        `})():W}

      ${yr(e,2048)&&e.sourceList.length>0?V`
        <div class="dash-fold-sep"></div>
        <div class="media-section">
          <glass-section-title label=${oi("media.source_label")}></glass-section-title>
          <div class="chips-row">
            ${e.sourceList.map(t=>V`
              <glass-chip
                size="sm"
                active-color="accent"
                ?active=${e.source===t}
                .icon=${wr[t]||"mdi:import"}
                @click=${i=>{i.stopPropagation(),this._selectSource(e.entityId,t)}}
              >${t}</glass-chip>
            `)}
          </div>
        </div>
      `:W}

      ${yr(e,65536)&&e.soundModeList.length>0?V`
        <div class="dash-fold-sep"></div>
        <div class="media-section">
          <glass-section-title label=${oi("media.sound_mode_label")}></glass-section-title>
          <div class="chips-row">
            ${e.soundModeList.map(t=>V`
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
      `:W}

      <!-- Multiroom grid (show if any groupable speakers exist) -->
      ${i.length>1?this._renderMultiroomGrid(t,i):W}
    `}async _loadQueue(){if(!this.hass)return;const e=++this._queueVersion,t=this._getCurrentMaster();if(t)try{const i=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"sonos",service:"get_queue",target:{entity_id:t.entityId},return_response:!0});if(e!==this._queueVersion)return;const a=i?.response?.[t.entityId]??[];this._queueData=a.map(e=>({name:e.media_title??"",artist:e.media_artist??"",album_name:e.media_album_name??"",content_id:e.media_content_id??""}))}catch(i){if(e!==this._queueVersion)return;console.warn("[glass] queue load error:",i)}}_renderQueueTab(){const e=this._getCurrentMaster(),t=e?this.hass?.states[e.entityId]?.attributes?.queue_position??0:0,i=this._queueData.slice(t);return i.length?V`
      <div class="queue-list">
        ${i.map((e,i)=>{const a=e.name??"",s=e.artist??"",r=e.content_id??"",o=!!r&&this._radioTracks.some(e=>e.uri===r),n=t+i;return V`
            <div class="queue-item">
              <div class="queue-num">${i+1}</div>
              <div class="queue-info">
                <span class="queue-title">${a}</span>
                <span class="queue-artist">${s}</span>
              </div>
              ${o?V`<span class="queue-badge">${oi("media.radio_badge")}</span>`:W}
              <glass-icon-button
                size="sm"
                .icon=${"mdi:close"}
                aria-label="${oi("media.remove_from_queue")}"
                @click=${e=>{e.stopPropagation(),this._removeFromQueue(n)}}
              ></glass-icon-button>
            </div>
          `})}
      </div>
    `:V`<div class="queue-empty">${oi("media.queue_empty")}</div>`}async _removeFromQueue(e){if(this.configPreview)return;const t=this._getCurrentMaster();if(t&&this.hass){this._queueData=this._queueData.filter((t,i)=>i!==e);try{await this.hass.callService("sonos","remove_from_queue",{queue_position:e},{entity_id:t.entityId})}catch{this._loadQueue()}}}_getGroupablePlayers(){return this.hass?Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")).map(_r).filter(e=>yr(e,mr)):[]}_findGroupCoordinator(e,t){if(yr(e,mr))return e;const i=t.find(t=>fr(t.state)&&t.title&&t.title===e.title);return i||null}_renderMultiroomGrid(e,t){if(!this.hass||!e)return V``;const i=e.entityId,a=new Set(e.groupMembers),s=t.filter(e=>e.entityId!==i);if(0===s.length)return V``;const r=s.filter(e=>a.has(e.entityId)).length+1,o=s.length+1;return V`
      <div class="dash-fold-sep"></div>
      <div class="speakers-section">
        <glass-section-title label=${oi("media.speakers_label")}>
          <span slot="end" class="speakers-count">${r}/${o}</span>
        </glass-section-title>
        <div class="speakers-list">
          ${s.map(e=>{const t=a.has(e.entityId),s=Math.round(100*e.volume);return V`
              <div class="speaker-row ${t?"joined":""}">
                <button class="speaker-icon-btn"
                  aria-label=${oi(t?"media.remove_group_aria":"media.add_group_aria",{name:e.name})}
                  aria-pressed=${t?"true":"false"}
                  @click=${a=>{a.stopPropagation(),t?this._unjoinGroup(e.entityId):this._smartJoin(i,e.entityId)}}>
                  <ha-icon .icon=${e.icon||"mdi:speaker"}></ha-icon>
                </button>
                <div class="speaker-vol-slider"
                  role="slider"
                  tabindex=${t?"0":"-1"}
                  aria-label=${oi("media.volume_aria",{name:e.name})}
                  aria-valuenow=${s}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-disabled=${t?"false":"true"}
                  @pointerdown=${t?t=>this._onMrVolPointerDown(t,e.entityId):null}
                  @keydown=${t?t=>this._onVolKey(t,e.entityId,s):null}>
                  <div class="speaker-vol-fill" style="width:${s}%"></div>
                  <span class="speaker-vol-name" title=${e.name}>${e.name}</span>
                  <span class="speaker-vol-val">${s}%</span>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}_collapseExpanded(){this._foldOpen&&(this._foldOpen=!1,this._foldTab="controls")}render(){if(this._lang,!this.hass)return W;if(!this._configLoaded)return W;const e=this._mediaConfig.show_header;if(this.isDashboard){const t=this._getActiveRooms();if(0===t.length)return this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),V`
          ${e?V`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${oi("media.title")}</span>
              </div>
            </div>
          `:W}
          ${this._renderHero(this._lastMaster)}
        `):W;if(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._roomEntityId){const e=t.findIndex(e=>e.entityId===this._roomEntityId);e>=0?this._roomIndex=e:this._roomIndex>=t.length&&(this._roomIndex=0)}this._roomIndex>=t.length&&(this._roomIndex=0);const i=t[this._roomIndex];return this._roomEntityId=i.entityId,this._lastMaster=i,V`
        ${e?V`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${oi("media.title")}</span>
            </div>
            ${i.source?V`
              <span class="card-source active">${i.source}</span>
            `:W}
          </div>
        `:W}
        ${this._renderHero(i,t.length)}
        ${t.length>1?V`
          <div class="dash-dots">
            ${t.map((e,t)=>V`
              <button class="dash-dot ${t===this._roomIndex?"active":""}"
                aria-label=${oi("media.room_dot_aria",{index:t+1})}
                aria-current=${t===this._roomIndex?"true":"false"}
                @click=${e=>{e.stopPropagation(),t!==this._roomIndex&&this._swipeToRoom(t>this._roomIndex?"left":"right",t)}}>
              </button>
            `)}
          </div>
        `:W}
      `}const t=this._getPlayers(),i=this._findMaster(t);return i&&vr(i.state)?(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=i,V`
      ${e?V`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${oi("media.title")}</span>
          </div>
          ${i.source?V`
            <span class="card-source active">${i.source}</span>
          `:W}
        </div>
      `:W}
      ${this._renderHero(i)}
    `):this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),V`
        ${e?V`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${oi("media.title")}</span>
            </div>
          </div>
        `:W}
        ${this._renderHero(this._lastMaster)}
      `):W}static{this.styles=[Dt,Pt,Tt,Lt,At,Mt,r`
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
    `]}}ur([pe()],xr.prototype,"areaId"),ur([ge()],xr.prototype,"_foldOpen"),ur([ge()],xr.prototype,"_mediaConfig"),ur([ge()],xr.prototype,"_configLoaded"),ur([ge()],xr.prototype,"_roomIndex"),ur([ge()],xr.prototype,"_swipeClass"),ur([ge()],xr.prototype,"_foldTab"),ur([ge()],xr.prototype,"_queueData"),ur([ge()],xr.prototype,"_radioTracks");try{customElements.define("glass-media-card",xr)}catch{}hi("glass-weather-card-editor");var kr=Object.defineProperty,$r=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&kr(t,i,r),r};const Sr={sunny:"sunny","clear-night":"clear_night",partlycloudy:"partly_cloudy",cloudy:"cloudy",fog:"foggy",rainy:"rainy",pouring:"pouring",snowy:"snowy","snowy-rainy":"snowy_rainy",hail:"hail",lightning:"lightning","lightning-rainy":"stormy",windy:"windy","windy-variant":"windy_variant",exceptional:"exceptional"},Cr={sunny:{icon:"mdi:weather-sunny",textKey:"weather.cond_sunny",tint:"#fbbf24",tintOp:.1,sparkStroke:"rgba(251,191,36,0.6)",sparkFill:"rgba(251,191,36,0.15)"},clear_night:{icon:"mdi:weather-night",textKey:"weather.cond_clear_night",tint:"#818cf8",tintOp:.08,sparkStroke:"rgba(129,140,248,0.5)",sparkFill:"rgba(129,140,248,0.12)"},partly_cloudy:{icon:"mdi:weather-partly-cloudy",textKey:"weather.cond_partly_cloudy",tint:"#fcd34d",tintOp:.07,sparkStroke:"rgba(252,211,77,0.5)",sparkFill:"rgba(252,211,77,0.12)"},cloudy:{icon:"mdi:weather-cloudy",textKey:"weather.cond_cloudy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.4)",sparkFill:"rgba(148,163,184,0.08)"},foggy:{icon:"mdi:weather-fog",textKey:"weather.cond_foggy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.35)",sparkFill:"rgba(148,163,184,0.08)"},rainy:{icon:"mdi:weather-rainy",textKey:"weather.cond_rainy",tint:"#60a5fa",tintOp:.1,sparkStroke:"rgba(96,165,250,0.6)",sparkFill:"rgba(96,165,250,0.15)"},pouring:{icon:"mdi:weather-pouring",textKey:"weather.cond_pouring",tint:"#3b82f6",tintOp:.14,sparkStroke:"rgba(59,130,246,0.7)",sparkFill:"rgba(59,130,246,0.18)"},snowy:{icon:"mdi:weather-snowy",textKey:"weather.cond_snowy",tint:"#e0f2fe",tintOp:.08,sparkStroke:"rgba(224,242,254,0.5)",sparkFill:"rgba(224,242,254,0.12)"},snowy_rainy:{icon:"mdi:weather-snowy-rainy",textKey:"weather.cond_snowy_rainy",tint:"#93c5fd",tintOp:.08,sparkStroke:"rgba(147,197,253,0.5)",sparkFill:"rgba(147,197,253,0.12)"},hail:{icon:"mdi:weather-hail",textKey:"weather.cond_hail",tint:"#bae6fd",tintOp:.1,sparkStroke:"rgba(186,230,253,0.5)",sparkFill:"rgba(186,230,253,0.12)"},lightning:{icon:"mdi:weather-lightning",textKey:"weather.cond_lightning",tint:"#c084fc",tintOp:.12,sparkStroke:"rgba(192,132,252,0.6)",sparkFill:"rgba(167,139,250,0.15)"},stormy:{icon:"mdi:weather-lightning-rainy",textKey:"weather.cond_stormy",tint:"#a78bfa",tintOp:.12,sparkStroke:"rgba(167,139,250,0.6)",sparkFill:"rgba(167,139,250,0.15)"},windy:{icon:"mdi:weather-windy",textKey:"weather.cond_windy",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.5)",sparkFill:"rgba(110,231,183,0.10)"},windy_variant:{icon:"mdi:weather-windy-variant",textKey:"weather.cond_windy_variant",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.4)",sparkFill:"rgba(110,231,183,0.10)"},exceptional:{icon:"mdi:alert-circle-outline",textKey:"weather.cond_exceptional",tint:"#fca5a5",tintOp:.1,sparkStroke:"rgba(252,165,165,0.5)",sparkFill:"rgba(252,165,165,0.12)"}},Ir=["compass_N","compass_NNE","compass_NE","compass_ENE","compass_E","compass_ESE","compass_SE","compass_SSE","compass_S","compass_SSW","compass_SW","compass_WSW","compass_W","compass_WNW","compass_NW","compass_NNW"];function Er(e){if(null==e)return"";return oi(`weather.${Ir[Math.round((+e%360+360)%360/22.5)%16]}`)}function zr(e){return e<10?"0"+e:""+e}class Dr extends ui{constructor(){super(...arguments),this._activeTab=null,this._forecastDaily=[],this._forecastHourly=[],this._clockTime="",this._clockSec="",this._clockDay="",this._clockDate="",this._weatherConfig={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},this._canvas=null,this._ctx=null,this._animId=0,this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:200,color:"rgba(167,139,250,"},this._cW=0,this._cH=0,this._resizeObserver=null,this._cachedCond="",this._clockInterval=0,this._unsubDaily=null,this._unsubHourly=null,this._configLoaded=!1,this._configLoadingInProgress=!1,this._canvasReady=!1,this._needsCanvasReInit=!1,this._subscribedEntity="",this._subscribedShowDaily=!1,this._subscribedShowHourly=!1,this._subVersion=0,this._animRunning=!1,this._animate=()=>{if(!this.isConnected||!this._animRunning)return;const e=this._ctx;if(!e)return;e.clearRect(0,0,this._cW,this._cH);for(const i of this._particles)this._updateParticle(i),this._drawParticle(e,i);const t=this._cachedCond;"stormy"!==t&&"lightning"!==t||(this._updateFlash(),this._flashState.opacity>.01&&(e.fillStyle=this._flashState.color+this._flashState.opacity+")",e.fillRect(0,0,this._cW,this._cH))),this._animId=requestAnimationFrame(this._animate)}}static getConfigElement(){return document.createElement("glass-weather-card-editor")}getCardSize(){return 2}static{this.styles=[Dt,Pt,Tt,Rt,At,r`
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
  `]}getTrackedEntityIds(){const e=[],t=this._getEntityId();return t&&e.push(t),this.hass?.states["sun.sun"]&&e.push("sun.sun"),e}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._weatherConfig.entity_id)return this._weatherConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("weather."));if(e)return e}return""}_getWeatherState(){const e=this._getEntityId();return e?this.hass?.states[e]:void 0}_mapCondition(e){return Sr[e]??"cloudy"}_getConditionMeta(e){return Cr[e]??Cr.cloudy}connectedCallback(){super.connectedCallback(),this._startClock(),this._listen("weather-config-changed",()=>this._loadConfig()),this._canvasReady&&(this._needsCanvasReInit=!0)}disconnectedCallback(){super.disconnectedCallback(),this._stopClock(),this._stopAnimation(),this._unsubForecasts(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._canvas=null,this._ctx=null,this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}_collapseExpanded(){null!==this._activeTab&&(this._activeTab=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,this._unsubForecasts()),this._configLoaded||this._configLoadingInProgress||(this._backend=new yi(this.hass),this._loadConfig());const e=this._getWeatherState(),t=e?this._mapCondition(e.state):"";t!==this._cachedCond&&(this._cachedCond=t,this._canvasReady&&this._cW&&this._cH&&this._spawnParticles(this._cachedCond||"cloudy")),this._configLoaded&&this._subscribeForecasts()}this._needsCanvasReInit&&(this._needsCanvasReInit=!1,this._initCanvas())}firstUpdated(){this._canvasReady=!0,this._initCanvas()}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherConfig=e.weather),this._configLoaded=!0,this._configLoadingInProgress=!1,this._subscribedEntity="",this._subscribeForecasts(),this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}async _subscribeForecasts(){const e=this._getEntityId();if(!e||!this.hass)return;const t=this._subscribedShowDaily!==this._weatherConfig.show_daily||this._subscribedShowHourly!==this._weatherConfig.show_hourly;if(e===this._subscribedEntity&&!t)return;this._unsubForecasts(),this._subscribedEntity=e,this._subscribedShowDaily=this._weatherConfig.show_daily,this._subscribedShowHourly=this._weatherConfig.show_hourly;const i=++this._subVersion;if(this._weatherConfig.show_daily){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastDaily=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(this._subVersion!==i)return void t();this._unsubDaily=t}if(this._weatherConfig.show_hourly){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastHourly=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});if(this._subVersion!==i)return void t();this._unsubHourly=t}}_unsubForecasts(){this._subVersion++,this._unsubDaily?.(),this._unsubDaily=null,this._unsubHourly?.(),this._unsubHourly=null,this._subscribedEntity=""}_startClock(){this._stopClock(),this._updateClock(),this._clockInterval=window.setInterval(()=>this._updateClock(),1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=0)}_updateClock(){const e=new Date;var t,i;this._clockTime=zr(e.getHours())+":"+zr(e.getMinutes()),this._clockSec=":"+zr(e.getSeconds()),this._clockDay=(t=e,i=this._lang,t.toLocaleDateString(i,{weekday:"long"})),this._clockDate=e.getDate()+" "+function(e,t){return e.toLocaleDateString(t,{month:"long"})}(e,this._lang)}_initCanvas(){if(this._resizeObserver?.disconnect(),this._resizeObserver=null,this._stopAnimation(),this._canvas=this.renderRoot.querySelector(".wc-anim"),!this._canvas)return;this._ctx=this._canvas.getContext("2d"),this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas());const e=this._canvas.parentElement;e&&this._resizeObserver.observe(e),this._resizeCanvas(),this._startAnimation()}_resizeCanvas(){if(!this._canvas||!this._ctx)return;const e=this._canvas.parentElement;if(!e)return;const t=e.getBoundingClientRect(),i=window.devicePixelRatio||1;this._cW=t.width,this._cH=t.height,this._canvas.width=this._cW*i,this._canvas.height=this._cH*i,this._canvas.style.width=this._cW+"px",this._canvas.style.height=this._cH+"px",this._ctx.setTransform(i,0,0,i,0,0)}_startAnimation(){this._animRunning||(this._animRunning=!0,this._spawnParticles(this._cachedCond||"cloudy"),this._animate())}_stopAnimation(){this._animRunning=!1,this._animId&&(cancelAnimationFrame(this._animId),this._animId=0)}_rnd(e,t){return e+Math.random()*(t-e)}_spawnParticles(e){this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:this._rnd(120,280),color:"rgba(167,139,250,"};const t=this._cW,i=this._cH;if(!t||!i)return;const a=(e,i,a,s,r,o)=>({type:"drop",x:this._rnd(0,t),y:this._rnd(-30,-5),len:this._rnd(i,a),speed:this._rnd(s,r),angle:o,color:e,opacity:this._rnd(.4,.7)}),s=()=>({type:"flake",x:this._rnd(0,t),y:this._rnd(-10,-3),r:this._rnd(1.5,3.5),speed:this._rnd(.4,1.2),drift:this._rnd(-.3,.3),phase:this._rnd(0,6.28),opacity:this._rnd(.3,.7)}),r=e=>({type:"mote",x:this._rnd(.1*t,.9*t),y:this._rnd(.3*i,.9*i),r:this._rnd(1,2.5),speed:this._rnd(.15,.4),drift:this._rnd(-.15,.15),phase:this._rnd(0,6.28),color:e,opacity:0,maxOp:this._rnd(.3,.7),life:0,maxLife:this._rnd(180,360)}),o=()=>({type:"star",x:this._rnd(.05*t,.95*t),y:this._rnd(.05*i,.7*i),r:this._rnd(.8,1.8),phase:this._rnd(0,6.28),speed:this._rnd(.008,.025)}),n=(e,a)=>({type:"cloud",x:this._rnd(-80,t),y:this._rnd(.05*i,.6*i),w:this._rnd(50,110),h:this._rnd(12,26),speed:this._rnd(.6*a,a),opacity:this._rnd(.6*e,e)}),c=()=>({type:"streak",x:this._rnd(-60,0),y:this._rnd(.1*i,.85*i),w:this._rnd(40,90),speed:this._rnd(2,5),opacity:this._rnd(.06,.14)}),l=()=>({type:"fog",x:this._rnd(-120,.5*t),y:this._rnd(.15*i,.75*i),w:this._rnd(80,160),h:this._rnd(18,35),speed:this._rnd(.2,.6),opacity:this._rnd(.02,.04)}),d=()=>({type:"hail",x:this._rnd(0,t),y:this._rnd(-15,-3),r:this._rnd(2,4),speed:this._rnd(3,5.5),opacity:this._rnd(.5,.8)}),h=this._particles;switch(e){case"sunny":for(let e=0;e<10;e++)h.push(r("rgba(251,191,36,"));break;case"clear_night":for(let e=0;e<14;e++)h.push(o());break;case"partly_cloudy":for(let e=0;e<3;e++)h.push(n(.035,.4));for(let e=0;e<4;e++)h.push(r("rgba(251,191,36,"));break;case"cloudy":for(let e=0;e<5;e++)h.push(n(.045,.35));break;case"foggy":for(let e=0;e<7;e++)h.push(l());break;case"rainy":for(let e=0;e<20;e++)h.push(a("rgba(96,165,250,",14,24,4,7,.14));for(let e=0;e<3;e++)h.push(n(.025,.3));break;case"pouring":for(let e=0;e<35;e++)h.push(a("rgba(59,130,246,",18,30,5.5,9,.1));for(let e=0;e<4;e++)h.push(n(.035,.35));break;case"stormy":for(let e=0;e<28;e++)h.push(a("rgba(167,139,250,",16,28,5,8,.26));for(let e=0;e<4;e++)h.push(n(.05,.5));this._flashState.interval=this._rnd(80,200);break;case"lightning":for(let e=0;e<4;e++)h.push(n(.04,.4));this._flashState.interval=this._rnd(60,160),this._flashState.color="rgba(192,132,252,";break;case"snowy":for(let e=0;e<18;e++)h.push(s());for(let e=0;e<3;e++)h.push(n(.025,.2));break;case"snowy_rainy":for(let e=0;e<10;e++)h.push(s());for(let e=0;e<14;e++)h.push(a("rgba(96,165,250,",12,20,3.5,6,.14));break;case"hail":for(let e=0;e<14;e++)h.push(d());for(let e=0;e<10;e++)h.push(a("rgba(96,165,250,",10,18,3.5,5.5,.14));break;case"windy":for(let e=0;e<8;e++)h.push(c());break;case"windy_variant":for(let e=0;e<6;e++)h.push(c());for(let e=0;e<4;e++)h.push(n(.035,1.2));break;case"exceptional":for(let e=0;e<8;e++)h.push(r("rgba(252,165,165,"));for(let e=0;e<5;e++)h.push(c())}}_updateParticle(e){const t=this._cW,i=this._cH;switch(e.type){case"drop":e.x=e.x+Math.sin(e.angle)*e.speed,e.y=e.y+Math.cos(e.angle)*e.speed,e.y>i+10&&(e.y=this._rnd(-30,-5),e.x=this._rnd(0,t));break;case"flake":e.y=e.y+e.speed,e.phase=e.phase+.02,e.x=e.x+e.drift+.3*Math.sin(e.phase),e.y>i+10&&(e.y=this._rnd(-10,-3),e.x=this._rnd(0,t));break;case"mote":{e.life=e.life+1,e.y=e.y-e.speed,e.x=e.x+e.drift+.2*Math.sin(e.phase+.015*e.life);const a=e.life/e.maxLife;e.opacity=a<.15?a/.15*e.maxOp:a>.85?(1-a)/.15*e.maxOp:e.maxOp,e.life>=e.maxLife&&(e.life=0,e.x=this._rnd(.1*t,.9*t),e.y=this._rnd(.3*i,.9*i),e.maxLife=this._rnd(180,360),e.maxOp=this._rnd(.3,.7));break}case"star":e.phase=e.phase+e.speed;break;case"cloud":e.x=e.x+e.speed,e.x>t+20&&(e.x=-e.w-this._rnd(10,60),e.y=this._rnd(.05*i,.6*i));break;case"streak":e.x=e.x+e.speed,e.x>t+20&&(e.x=this._rnd(-80,-20),e.y=this._rnd(.1*i,.85*i));break;case"fog":e.x=e.x+e.speed,e.x>t+40&&(e.x=-e.w-this._rnd(20,80),e.y=this._rnd(.15*i,.75*i));break;case"hail":e.y=e.y+e.speed,e.y>i+10&&(e.y=this._rnd(-15,-3),e.x=this._rnd(0,t))}}_drawParticle(e,t){switch(t.type){case"drop":{const i=Math.sin(t.angle)*t.len,a=Math.cos(t.angle)*t.len,s=e.createLinearGradient(t.x,t.y,t.x+i,t.y+a);s.addColorStop(0,t.color+"0)"),s.addColorStop(1,t.color+t.opacity+")"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+i,t.y+a),e.strokeStyle=s,e.lineWidth=1.5,e.stroke();break}case"flake":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break;case"mote":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle=t.color+t.opacity+")",e.shadowColor=t.color+.5*t.opacity+")",e.shadowBlur=6,e.fill(),e.shadowBlur=0;break;case"star":{const i=.15+.75*(.5+.5*Math.sin(t.phase));e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+i+")",e.fill();break}case"cloud":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"streak":{const i=e.createLinearGradient(t.x,t.y,t.x+t.w,t.y);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.5,"rgba(255,255,255,"+t.opacity+")"),i.addColorStop(1,"rgba(255,255,255,0)"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+t.w,t.y),e.strokeStyle=i,e.lineWidth=1,e.stroke();break}case"fog":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"hail":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(224,242,254,"+t.opacity+")",e.fill(),e.beginPath(),e.arc(t.x-.25*t.r,t.y-.25*t.r,.4*t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+.3*t.opacity+")",e.fill()}}_updateFlash(){const e=this._flashState;e.timer++,e.on?(e.opacity*=.82,e.opacity<.02&&(e.on=!1,e.opacity=0,e.timer=0,e.interval=this._rnd(80,280))):e.timer>e.interval&&(e.on=!0,e.opacity=this._rnd(.12,.22))}_computeSparkline(e){const t=e.length;if(t<2)return{linePath:"",areaPath:"",nowY:32};let i=1/0,a=-1/0;for(const n of e)n.temperature<i&&(i=n.temperature),n.temperature>a&&(a=n.temperature);const s=a-i||1,r=e.map((e,i)=>({x:i/(t-1)*348,y:10+(a-e.temperature)/s*44}));let o=`M${r[0].x},${r[0].y}`;for(let n=0;n<r.length-1;n++){const e=r[Math.max(n-1,0)],t=r[n],i=r[Math.min(n+1,r.length-1)],a=r[Math.min(n+2,r.length-1)];o+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}return{linePath:o,areaPath:o+" L348,64 L0,64 Z",nowY:r[0].y}}render(){this._lang;try{return this._renderContent()}catch(e){return console.error("[glass-weather-card] render error:",e),V`<div class="weather-card-wrap"><div class="glass weather-card"><div class="card-inner" style="padding:16px;text-align:center;color:var(--c-alert);font-size:var(--fz-base);">
        <ha-icon .icon=${"mdi:alert-circle-outline"} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"></ha-icon>
        Weather render error</div></div></div>`}}_renderContent(){const e=this._getWeatherState();if(!e)return V`<div class="weather-card-wrap">
        ${this._weatherConfig.show_header?V`<div class="card-header"><span class="card-title">${oi("weather.title")}</span></div>`:W}
        <div class="glass weather-card"><div class="card-inner" style="padding:20px;text-align:center;color:var(--t3);font-size:var(--fz-base);">${oi("common.no_entity")}</div></div>
      </div>`;const t=e.attributes,i=e.state,a=this._mapCondition(i),s=this._getConditionMeta(a),r=t.temperature??0,o=t.apparent_temperature,n=t.humidity,c=t.wind_speed,l=t.wind_speed_unit??"km/h",d=t.wind_bearing,h=t.pressure,p=t.visibility,g=t.uv_index,u=t.friendly_name??"",m=t.temperature_unit??"°C",_=this.hass?.states["sun.sun"],f=_?.attributes.next_rising,v=_?.attributes.next_setting,b=f?new Date(f).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",y=v?new Date(v).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",w=new Set(this._weatherConfig.hidden_metrics),x=this._forecastHourly.slice(0,10),k=this._computeSparkline(x),$=`background: radial-gradient(ellipse at 80% 20%, ${s.tint}, transparent 70%); opacity: ${s.tintOp};`;return V`
      <div class="weather-card-wrap">
        ${this._weatherConfig.show_header?V`
          <div class="card-header">
            <span class="card-title">${oi("weather.title")}</span>
            <span class="card-location">${u}</span>
          </div>
        `:W}

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
                  <span class="wc-temp-unit">${m}</span>
                </div>
                <div class="wc-cond-row">
                  <ha-icon .icon="${s.icon}" class="wc-cond-icon ${a}"></ha-icon>
                  <span class="wc-cond-text">${oi(s.textKey)}</span>
                </div>
                ${null!=o?V`<span class="wc-feels">${oi("weather.feels_like",{temp:Math.round(o)})}</span>`:W}
              </div>
            </div>

            <!-- Sparkline -->
            ${x.length>=2?V`
              <div class="wc-spark-zone">
                <svg class="wc-spark-svg" viewBox="0 0 348 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${s.sparkFill}" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  ${B`<path class="wc-spark-area" d="${k.areaPath}" fill="url(#sparkGrad)" />`}
                  ${B`<path class="wc-spark-line" d="${k.linePath}" stroke="${s.sparkStroke}" />`}
                </svg>
                <div class="wc-spark-now" style="left:0px;">
                  <div class="wc-spark-now-dot" style="top:${k.nowY/64*100}%"></div>
                </div>
                <div class="wc-spark-labels">
                  ${x.map((e,t)=>V`<span class="wc-spark-lbl">${t%2==0||t===x.length-1?0===t?oi("weather.now"):new Date(e.datetime).getHours()+"h":""}</span>`)}
                </div>
              </div>
            `:W}

            <!-- Metrics -->
            ${this._renderMetrics(w,n,c,l,d,h,g,p,b,y)}

            <!-- Forecast -->
            ${this._renderForecasts(m)}

          </div>
        </div>
      </div>
    `}_renderMetrics(e,t,i,a,s,r,o,n,c,l){const d=[];return e.has("humidity")||null==t||d.push({cls:"humidity",icon:"mdi:water-percent",label:oi("weather.metric_humidity"),val:V`<span class="wc-metric-val">${t}<span class="wc-metric-unit">%</span></span>`}),e.has("wind")||null==i||d.push({cls:"wind",icon:"mdi:weather-windy",label:oi("weather.metric_wind"),val:V`<span class="wc-metric-val">${Math.round(i)}<span class="wc-metric-unit">${a}</span><span class="wc-metric-dir">${Er(s)}</span></span>`}),e.has("pressure")||null==r||d.push({cls:"pressure",icon:"mdi:gauge",label:oi("weather.metric_pressure"),val:V`<span class="wc-metric-val">${Math.round(r)}<span class="wc-metric-unit">hPa</span></span>`}),e.has("uv")||null==o||d.push({cls:"uv",icon:"mdi:sun-wireless",label:oi("weather.metric_uv"),val:V`<span class="wc-metric-val">${Math.round(o)}<span class="wc-metric-unit">UV</span></span>`}),e.has("visibility")||null==n||d.push({cls:"visibility",icon:"mdi:eye-outline",label:oi("weather.metric_visibility"),val:V`<span class="wc-metric-val">${n}<span class="wc-metric-unit">km</span></span>`}),!e.has("sunrise")&&c&&d.push({cls:"sunrise",icon:"mdi:weather-sunset-up",label:oi("weather.sunrise"),val:V`<span class="wc-metric-val">${c}</span>`}),!e.has("sunset")&&l&&d.push({cls:"sunset",icon:"mdi:weather-sunset-down",label:oi("weather.sunset"),val:V`<span class="wc-metric-val">${l}</span>`}),0===d.length?W:V`
      <div class="wc-metrics" role="list">
        ${d.map(e=>V`
          <div class="wc-metric ${e.cls}" role="listitem" aria-label="${e.label}" title="${e.label}">
            <ha-icon .icon=${e.icon} aria-hidden="true"></ha-icon>
            ${e.val}
          </div>
        `)}
      </div>
    `}_renderForecasts(e){const t=this._weatherConfig.show_daily,i=this._weatherConfig.show_hourly;if(!t&&!i)return W;const a=[];return t&&a.push({value:"daily",label:oi("weather.daily_tab")}),i&&a.push({value:"hourly",label:oi("weather.hourly_tab")}),V`
      <div class="wc-forecast-zone">
        <glass-tabs
          layout="segmented"
          .items=${a}
          .value=${this._activeTab??""}
          aria-label=${oi("weather.title")}
          @glass-tab-change=${e=>this._switchTab(e.detail.value)}
        ></glass-tabs>

        <div class="wc-fold-sep ${"daily"===this._activeTab&&this._forecastDaily.length>0||"hourly"===this._activeTab&&this._forecastHourly.length>0?"visible":""}"></div>

        ${t?V`
          <div class="fold ${"daily"===this._activeTab?"open":""}" id="wc-daily-panel" role="region" aria-label="${oi("weather.daily_tab")}" aria-hidden="${"daily"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-daily-list">
                ${this._forecastDaily.slice(0,7).map((e,t)=>{const i=this._mapCondition(e.condition),a=this._getConditionMeta(i),s=new Date(e.datetime),r=0===t?oi("weather.today"):(o=s,n=this._lang,o.toLocaleDateString(n,{weekday:"short"}));var o,n;return V`
                    <div class="wc-day-row">
                      <span class="wc-day-label">${r}</span>
                      <ha-icon .icon="${a.icon}" class="wc-day-icon ${i}"></ha-icon>
                      <span class="wc-day-cond">${oi(a.textKey)}</span>
                      <div class="wc-day-temps">
                        <span class="wc-day-hi">${Math.round(e.temperature)}&deg;</span>
                        ${null!=e.templow?V`<span class="wc-day-lo">${Math.round(e.templow)}&deg;</span>`:W}
                      </div>
                      <span class="wc-day-precip">${null!=e.precipitation_probability&&e.precipitation_probability>0?e.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:W}

        ${i?V`
          <div class="fold ${"hourly"===this._activeTab?"open":""}" id="wc-hourly-panel" role="region" aria-label="${oi("weather.hourly_tab")}" aria-hidden="${"hourly"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-hourly-list">
                ${this._forecastHourly.slice(0,10).map((t,i)=>{const a=this._mapCondition(t.condition),s=this._getConditionMeta(a),r=new Date(t.datetime),o=0===i?oi("weather.now"):r.getHours()+"h";return V`
                    <div class="wc-hour-row ${0===i?"now":""}">
                      <span class="wc-hour-time">${o}</span>
                      <ha-icon .icon="${s.icon}" class="wc-hour-icon ${a}"></ha-icon>
                      <span class="wc-hour-cond">${oi(s.textKey)}</span>
                      <span class="wc-hour-temp">${Math.round(t.temperature)}${e}</span>
                      <span class="wc-hour-precip">${null!=t.precipitation_probability&&t.precipitation_probability>0?t.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:W}
      </div>
    `}_switchTab(e){this._activeTab=this._activeTab===e?null:e}}$r([ge()],Dr.prototype,"_activeTab"),$r([ge()],Dr.prototype,"_forecastDaily"),$r([ge()],Dr.prototype,"_forecastHourly"),$r([ge()],Dr.prototype,"_clockTime"),$r([ge()],Dr.prototype,"_clockSec"),$r([ge()],Dr.prototype,"_clockDay"),$r([ge()],Dr.prototype,"_clockDate");try{customElements.define("glass-weather-card",Dr)}catch{}hi("glass-presence-card-editor");var Pr=Object.defineProperty,Tr=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Pr(t,i,r),r};const Lr=[{from:"#6366f1",to:"#8b5cf6"},{from:"#ec4899",to:"#f472b6"},{from:"#f59e0b",to:"#fbbf24"},{from:"#10b981",to:"#34d399"},{from:"#06b6d4",to:"#22d3ee"},{from:"#f43f5e",to:"#fb7185"}];function Ar(e){const t=function(e){return e<60?oi("presence.just_now"):e<3600?oi("presence.min_ago",{count:Math.floor(e/60)}):e<86400?oi("presence.hours_ago",{count:Math.floor(e/3600)}):oi("presence.days_ago",{count:Math.floor(e/86400)})}(e);return`${oi("presence.seen_prefix")} ${t.charAt(0).toLocaleLowerCase()+t.slice(1)}`}function Mr(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}class Rr extends ui{constructor(){super(...arguments),this._presenceConfig={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{},sleep_sensors:{}},this._activePerson=null,this._notifText="",this._notifSent=!1,this._notifSentTimer=0,this._configLoaded=!1,this._configLoadingInProgress=!1,this._prevActivePerson=null}static getConfigElement(){return document.createElement("glass-presence-card-editor")}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("presence-config-changed",()=>{this._configLoaded=!1,this._loadConfig()}),this._clockInterval=setInterval(()=>{this._activePerson&&this.requestUpdate()},6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,clearInterval(this._clockInterval),this._clockInterval=void 0,this._notifSentTimer&&(clearTimeout(this._notifSentTimer),this._notifSentTimer=0)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new yi(this.hass),this._loadConfig())),e.has("_activePerson")&&this._activePerson&&this._activePerson!==this._prevActivePerson&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shadowRoot?.querySelectorAll(".fold-sep").forEach(e=>e.classList.add("visible")),this.shadowRoot?.querySelector(".ctrl-fold")?.classList.add("open")})),this._prevActivePerson=this._activePerson}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");if(e?.presence_card){const t=e.presence_card;this._presenceConfig={show_header:t.show_header??!0,person_entities:t.person_entities??[],smartphone_sensors:t.smartphone_sensors??{},notify_services:t.notify_services??{},driving_sensors:t.driving_sensors??{},sleep_sensors:t.sleep_sensors??{}}}this._configLoaded=!0,this._configLoadingInProgress=!1,this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}getTrackedEntityIds(){return this._getPersonIds()}_getPersonIds(){return this._presenceConfig.person_entities.length>0?this._presenceConfig.person_entities.filter(e=>this.hass?.states[e]):this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")):[]}_getPersonData(e){const t=this.hass?.states[e];if(!t)return null;const i=t.attributes,a=i.friendly_name||e.split(".")[1],s=i.entity_picture||null,r=this._presenceConfig.smartphone_sensors[e],o=r?this.hass?.states[r]:null,n=o?.attributes??{};let c=o?Mr(o.state):null;null==c&&(c=Mr(i.battery_level));const l=n.is_charging??i.is_charging,d=!0===l||"true"===l||"on"===l||"1"===l,h=Mr(n.heart_rate),p=Mr(n.oxygen_saturation),g=Mr(n.daily_steps),u=n.geocoded_location||null,m=this._presenceConfig.notify_services[e]||n.notify_service||null,_=this._presenceConfig.driving_sensors[e];let f=!1;_&&this.hass?.states[_]?f="on"===this.hass.states[_].state:"on"!==n.android_auto&&!0!==n.android_auto||(f=!0);const v=this._presenceConfig.sleep_sensors[e],b=!(!v||"on"!==this.hass?.states[v]?.state);return{entityId:e,name:a,state:t.state,entityPicture:s,latitude:Mr(i.latitude),longitude:Mr(i.longitude),sourceType:i.source_type||"gps",batteryLevel:c,isCharging:d,lastUpdated:t.last_updated,geocodedLocation:u,heartRate:h,spo2:p,steps:g,isDriving:f,isSleeping:b,notifyService:m}}_presenceClass(e){let t=!1,i=!1;for(const a of e)"home"===a.state?t=!0:i=!0;return t&&i?"mixed":t?"home":"away"}_collapseExpanded(){this._activePerson&&(this._activePerson=null)}async _sendNotification(e){if(this.hass&&e.notifyService&&this._notifText.trim()){mi(this,"light");try{let t="notify",i=e.notifyService;if(i.includes(".")){const e=i.split(".");t=e[0],i=e.slice(1).join(".")}const a=this.hass.user?.name||"Home Assistant";this._safeCallService(t,i,{title:oi("presence.notif_title",{name:a}),message:this._notifText.trim()}),this._notifText="",this._notifSent=!0,this._notifSentTimer&&clearTimeout(this._notifSentTimer),this._notifSentTimer=window.setTimeout(()=>{this._notifSent=!1,this._activePerson=null},4e3)}catch{}}}render(){if(this._lang,!this.hass)return W;const e=this._getPersonIds();if(0===e.length)return W;const t=e.map(e=>this._getPersonData(e)).filter(e=>null!==e);if(0===t.length)return W;const i=t.filter(e=>"home"===e.state).length,a=this._presenceClass(t),s=0===i?"all-away":i===t.length?"all-home":"mixed";return V`
      ${this._presenceConfig.show_header?V`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${1===t.length?oi("presence.title_single"):oi("presence.title")}</span>
              </div>
              <span class="card-count ${s}">${i}/${t.length}</span>
            </div>
          `:W}
      <div class="glass presence-card" data-presence=${a}>
        <div class="card-tint"></div>
        <div class="card-inner ${this._layoutClass(t.length)}">
          ${this._renderPersons(t)}
        </div>
        ${this._renderFold(t,a)}
      </div>
    `}_layoutClass(e){return 1===e?"solo-layout":2===e?"":"family-layout"}_renderPersons(e){if(1===e.length)return V`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderSoloChips(e[0])}
      `;if(2===e.length)return V`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderDistance(e[0],e[1])}
        ${this._renderPerson(e[1],!0,1)}
      `;const t=[];for(let i=0;i<e.length;i+=2)i>0&&t.push(V`<div class="family-sep"></div>`),i+1<e.length?t.push(V`
          <div class="family-row">
            ${this._renderPerson(e[i],!1,i)}
            ${this._renderDistance(e[i],e[i+1])}
            ${this._renderPerson(e[i+1],!0,i+1)}
          </div>
        `):t.push(V`
          <div class="family-row solo-row">
            ${this._renderPerson(e[i],!1,i)}
          </div>
        `);return V`${t}`}_renderPerson(e,t,i=0){const a=Lr[i%Lr.length],s=qt(e.state),r=this._activePerson===e.entityId,o=null!==this._activePerson&&!r;return V`
      <div class="person-block ${t?"right":""} ${s?"entity-unavailable":""} ${o?"dimmed":""} ${r?"active":""}">
        <button
          class="avatar-wrapper tappable"
          aria-label=${oi("presence.avatar_aria",{name:e.name})}
          aria-expanded=${String(this._activePerson===e.entityId)}
          @click=${t=>{t.stopPropagation();const i=this._activePerson===e.entityId?null:e.entityId;i!==this._activePerson&&(this._notifText=""),this._activePerson=i}}
        >
          ${s?V`<div class="avatar avatar-fallback avatar-unavailable"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></div>`:V`
                ${e.entityPicture?V`<img class="avatar ${e.isSleeping?"sleeping":""}" src=${e.entityPicture} alt=${e.name} />`:V`
                      <div
                        class="avatar avatar-fallback ${e.isSleeping?"sleeping":""}"
                        style="background: linear-gradient(135deg, ${a.from}, ${a.to})"
                      >
                        <ha-icon .icon=${"mdi:account"}></ha-icon>
                      </div>
                    `}
                <div class="avatar-status ${n=e.state,"home"===n?"home":"not_home"===n?"away":"zone"}"></div>
                ${e.isSleeping?V`
                  <span class="sleep-badge" aria-label=${oi("presence.sleeping_aria",{name:e.name})}>zzz</span>
                `:W}
              `}
        </button>
        <div class="person-info">
          <div class="person-name">${e.name}</div>
          <div class="person-sub">
            <div class="person-line">
              <span class="source-icon"><ha-icon .icon=${function(e){switch(e){case"gps":default:return"mdi:crosshairs-gps";case"router":return"mdi:router-wireless";case"bluetooth":case"bluetooth_le":return"mdi:bluetooth"}}(e.sourceType)}></ha-icon></span>
              <span class="person-location">${function(e){return"home"===e?oi("presence.home"):"not_home"===e?oi("presence.away"):e.charAt(0).toUpperCase()+e.slice(1)}(e.state)}</span>
              ${e.isDriving?V`<span class="driving-icon"><ha-icon .icon=${"mdi:car"}></ha-icon></span>`:W}
            </div>
          </div>
        </div>
      </div>
    `;var n}_renderDistance(e,t){if(null==e.latitude||null==e.longitude||null==t.latitude||null==t.longitude)return W;const i=function(e,t,i,a){const s=(i-e)*Math.PI/180,r=(a-t)*Math.PI/180,o=Math.sin(s/2)**2+Math.cos(e*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(r/2)**2;return 12742*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}(e.latitude,e.longitude,t.latitude,t.longitude),a=i<.05,s=String(i<1?Math.round(1e3*i):Math.round(i)),r=oi(i<1?"presence.distance_m":"presence.distance_km"),o=null!==this._activePerson;return V`
      <div class="distance-center ${a?"near":""} ${o?"dimmed":""}">
        <div class="distance-line"></div>
        <div class="distance-info">
          <div class="distance-value">${s}</div>
          <div class="distance-unit">${r}</div>
        </div>
        <div class="heart-pulse" aria-hidden="true"><ha-icon .icon=${"mdi:heart"}></ha-icon></div>
        <div class="distance-line right"></div>
      </div>
    `}_renderSoloChips(e){return null==e.heartRate&&null==e.spo2&&null==e.steps?W:V`
      <div class="solo-health-chips">
        ${null!=e.heartRate?V`<glass-pill tone="alert"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon><span>${e.heartRate}</span></glass-pill>`:W}
        ${null!=e.spo2?V`<glass-pill tone="info"><ha-icon .icon=${"mdi:water-percent"}></ha-icon><span>${e.spo2}%</span></glass-pill>`:W}
        ${null!=e.steps?V`<glass-pill tone="success"><ha-icon .icon=${"mdi:walk"}></ha-icon><span>${e.steps.toLocaleString()}</span></glass-pill>`:W}
      </div>
    `}_renderFold(e,t){if(!this._activePerson)return W;const i=e.find(e=>e.entityId===this._activePerson);if(!i)return W;const a=1===e.length,s=!a&&(null!=i.heartRate||null!=i.spo2||null!=i.steps),r=!a&&!!i.notifyService;return V`
      <div class="fold-sep ${t}"></div>
      <div class="ctrl-fold">
        <div class="ctrl-fold-inner">
          <div class="fold-content">
            <div class="loc-row">
              ${(()=>{const e=(t=i.lastUpdated,Math.floor((Date.now()-new Date(t).getTime())/1e3));var t;return V`
                  <span class="loc-address">
                    <ha-icon .icon=${"mdi:map-marker-radius"}></ha-icon>
                    ${i.geocodedLocation?V`<span class="loc-address-text">${i.geocodedLocation}</span>`:W}
                    <span class="loc-address-time lastseen-${function(e){return e<3600?"fresh":e<86400?"stale":"old"}(e)}"
                          title=${oi("presence.last_seen_label")}>
                      ${Ar(e)}
                    </span>
                  </span>
                `})()}
              ${null!=i.batteryLevel?V`
                <span class="meta-chip battery-${o=i.batteryLevel,o>50?"high":o>20?"medium":"low"} ${i.isCharging?"charging":""}">
                  <ha-icon .icon=${function(e,t=!1){return t?e>80?"mdi:battery-charging":e>60?"mdi:battery-charging-70":e>40?"mdi:battery-charging-50":e>20?"mdi:battery-charging-30":"mdi:battery-charging-10":e>80?"mdi:battery":e>60?"mdi:battery-70":e>40?"mdi:battery-50":e>20?"mdi:battery-30":"mdi:battery-10"}(i.batteryLevel,i.isCharging)}></ha-icon>
                  <span>${i.batteryLevel}%</span>
                </span>
              `:W}
            </div>
            ${s?V`
                  <div class="health-pills">
                    ${null!=i.heartRate?V`
                          <div class="health-pill bpm">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.heartRate}</span>
                              <span class="health-pill-label">${oi("presence.bpm")}</span>
                            </div>
                          </div>
                        `:W}
                    ${null!=i.spo2?V`
                          <div class="health-pill spo2">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.spo2}%</span>
                              <span class="health-pill-label">${oi("presence.spo2")}</span>
                            </div>
                          </div>
                        `:W}
                    ${null!=i.steps?V`
                          <div class="health-pill steps">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:walk"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.steps.toLocaleString()}</span>
                              <span class="health-pill-label">${oi("presence.steps")}</span>
                            </div>
                          </div>
                        `:W}
                  </div>
                `:W}
            ${r?V`
                  <div class="notif-zone">
                    ${this._notifSent?V`
                      <div class="notif-toast">
                        <ha-icon .icon=${"mdi:check-circle"}></ha-icon>
                        ${oi("presence.notif_sent")}
                      </div>
                    `:V`
                      <div class="notif-row">
                        <glass-form-input
                          class="notif-input"
                          placeholder=${oi("presence.notify_placeholder",{name:i.name})}
                          .value=${this._notifText}
                          @glass-input=${e=>{this._notifText=e.detail.value}}
                          @focus=${e=>{const t=e.target;t.dataset.scrolled||(t.dataset.scrolled="1",this._scrollToTop())}}
                        ></glass-form-input>
                        <glass-icon-button
                          active
                          active-color="success"
                          .icon=${"mdi:send"}
                          aria-label=${oi("presence.send_aria")}
                          @click=${e=>{e.stopPropagation(),this._sendNotification(i)}}
                        ></glass-icon-button>
                      </div>
                    `}
                  </div>
                `:W}
          </div>
        </div>
      </div>
    `;var o}static{this.styles=[Dt,Pt,Tt,Rt,Lt,At,Ft,ei,r`
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
    `]}}Tr([ge()],Rr.prototype,"_presenceConfig"),Tr([ge()],Rr.prototype,"_activePerson"),Tr([ge()],Rr.prototype,"_notifText"),Tr([ge()],Rr.prototype,"_notifSent");try{customElements.define("glass-presence-card",Rr)}catch{}hi("glass-spotify-card-editor");var Or=Object.defineProperty,jr=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Or(t,i,r),r};const Hr={playlists:"spotify.my_playlists",recently_played:"spotify.recently_played",saved_tracks:"spotify.saved_tracks",saved_shows:"spotify.followed_podcasts"};function Fr(e,t=300){if(!e)return"";const i=e.images??e.album?.images??[];if(0===i.length)return"";const a=[...i].sort((e,i)=>Math.abs((e.width??300)-t)-Math.abs((i.width??300)-t));return a[0]?.url??""}function qr(e){return e&&e.artists?.length?e.artists.map(e=>e.name).join(", "):""}function Nr(e){switch(e){case"track":default:return"mdi:music-note";case"playlist":return"mdi:playlist-music";case"album":return"mdi:album";case"show":case"podcast":case"episode":return"mdi:podcast"}}class Vr extends ui{constructor(){super(...arguments),this._view="library",this._tab="all",this._searchQuery="",this._playlists=[],this._recentlyPlayed=[],this._savedTracks=[],this._savedShows=[],this._searchResults={tracks:[],playlists:[],shows:[]},this._searchLoading=!1,this._searchOffset=0,this._searchHasMore=!1,this._searchVersion=0,this._drilldown=null,this._speakers=[],this._pickerItem=null,this._selectedSpeakers=new Set,this._error=null,this._libraryLoading=!1,this._spotifyConfigured=null,this._foldOpen=!1,this._savedMap=new Map,this._sectionTotals={},this._loadingMore={},this._spotifyConfig={entity_id:"",show_header:!0,sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},this._configLoaded=!1,this._configLoadingInProgress=!1,this._loadVersion=0,this._radioQueueVersion=0,this._debounceTimer=0,this._onPickerKeydown=e=>{"Escape"===e.key&&"speaker_picker"===this._view&&(e.preventDefault(),this._closePicker())}}static getConfigElement(){return document.createElement("glass-spotify-card-editor")}getCardSize(){return 4}static{this.styles=[Dt,Pt,Tt,At,Mt,r`
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
  `]}getTrackedEntityIds(){const e=this._getEntityId(),t=e?[e]:[];return this._spotifyConfig?.entity_id&&!t.includes(this._spotifyConfig.entity_id)&&t.push(this._spotifyConfig.entity_id),t}_isNowPlaying(e){const t=this._spotifyConfig?.entity_id;if(!t)return!1;const i=this.hass?.states[t];return!(!i||"playing"!==i.state)&&(i.attributes.media_content_id??"")===e}_getPlaybackEntity(){const e=this._getEntityId();if(!e)return null;const t=this.hass?.states[e];return t?"playing"!==t.state&&"paused"!==t.state?null:{entityId:e,state:t.state,title:t.attributes.media_title??null,artist:t.attributes.media_artist??null,art:t.attributes.entity_picture??null}:null}_mediaPlayPause(e){e.stopPropagation();const t=this._getEntityId();t&&(mi(this,"light"),this._safeCallService("media_player","media_play_pause",{},{entity_id:t}))}_mediaNext(e){e.stopPropagation();const t=this._getEntityId();t&&(mi(this,"light"),this._safeCallService("media_player","media_next_track",{},{entity_id:t}))}_mediaPrev(e){e.stopPropagation();const t=this._getEntityId();t&&(mi(this,"light"),this._safeCallService("media_player","media_previous_track",{},{entity_id:t}))}_focusSearchInput(){requestAnimationFrame(()=>{const e=this.renderRoot.querySelector("input.search-input");e?.focus()})}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._spotifyConfig.entity_id)return this._spotifyConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("media_player.spotify"));if(e)return e}return""}shouldUpdate(e){return!!super.shouldUpdate(e)&&("speaker_picker"!==this._view||1!==e.size||!e.has("hass"))}connectedCallback(){super.connectedCallback(),this._listen("spotify-config-changed",()=>{this._configLoaded=!1,this._loadConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._debounceTimer&&clearTimeout(this._debounceTimer),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,window.removeEventListener("keydown",this._onPickerKeydown)}_collapseExpanded(){"speaker_picker"!==this._view?(this._foldOpen&&(this._foldOpen=!1),this._drilldown&&(this._drilldown=null,this._view=this._searchQuery?"search":"library")):this._closePicker()}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new yi(this.hass),this._loadConfig()))}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;if(t?.spotify_card&&(this._spotifyConfig=t.spotify_card),this._configLoaded=!0,await this._checkSpotifyStatus(),e!==this._loadVersion)return;this._spotifyConfigured&&this._loadLibrary(),this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}async _checkSpotifyStatus(){if(this._backend)try{const e=await this._backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}async _loadLibrary(){if(!this._backend)return;this._libraryLoading=!0,this._error=null;const e=this._spotifyConfig.max_items_per_section;try{const[t,i,a,s]=await Promise.all([this._backend.send("spotify_browse",{category:"playlists",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"recently_played",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_tracks",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_shows",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order})]);this._playlists=(t?.items??[]).filter(Boolean),this._recentlyPlayed=(i?.items??[]).filter(Boolean),this._savedTracks=(a?.items??[]).filter(Boolean),this._savedShows=(s?.items??[]).filter(Boolean).map(e=>e.show??e),this._sectionTotals={playlists:t?.total??0,recently_played:i?.total??0,saved_tracks:a?.total??0,saved_shows:s?.total??0};const r=[];for(const e of this._recentlyPlayed){const t=e.track??e;!t.id||"track"!==t.type&&t.type||r.push(t.id)}for(const e of this._savedTracks){const t=e.track??e;t.id&&r.push(t.id)}r.length&&this._checkSavedStatus(r)}catch(t){this._handleApiError(t)}finally{this._libraryLoading=!1}}_onSearchInput(e){const t=e.target.value;if(this._searchQuery=t,this._debounceTimer&&clearTimeout(this._debounceTimer),0===t.length)return this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},void(this._searchOffset=0);this._foldOpen||(this._foldOpen=!0),this._view="search",this._debounceTimer=window.setTimeout(()=>this._doSearch(!1),300)}_clearSearch(){this._searchQuery="",this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},this._searchOffset=0,this._foldOpen=!1}async _doSearch(e){if(!this._backend||!this._searchQuery)return;const t=++this._searchVersion;this._searchLoading=!0,this._error=null;const i=e?this._searchOffset:0;try{let a;a="tracks"===this._tab?["track"]:"playlists"===this._tab?["playlist"]:"podcasts"===this._tab?["show"]:["track","playlist","show"];const s=await this._backend.send("spotify_search",{query:this._searchQuery,types:a,limit:12,offset:i});if(t!==this._searchVersion)return;const r=(s?.tracks?.items??[]).filter(Boolean),o=(s?.playlists?.items??[]).filter(Boolean),n=(s?.shows?.items??[]).filter(Boolean);this._searchResults=e?{tracks:[...this._searchResults.tracks,...r],playlists:[...this._searchResults.playlists,...o],shows:[...this._searchResults.shows,...n]}:{tracks:r,playlists:o,shows:n},this._searchOffset=i+12;const c=(s?.tracks?.total??0)+(s?.playlists?.total??0)+(s?.shows?.total??0),l=this._searchResults.tracks.length+this._searchResults.playlists.length+this._searchResults.shows.length;this._searchHasMore=l<c;const d=r.filter(e=>e.id).map(e=>e.id);d.length&&this._checkSavedStatus(d)}catch(a){if(t!==this._searchVersion)return;this._handleApiError(a)}finally{t===this._searchVersion&&(this._searchLoading=!1)}}async _openDrilldown(e,t,i,a,s){if(this._backend){this._view="drilldown",this._drilldown={title:i,type:e,id:t,image:a,subtitle:s,items:[],total:0,offset:0,loading:!0},this._error=null;try{const i="playlist"===e?"playlist_tracks":"album_tracks",a=await this._backend.send("spotify_browse",{category:i,content_id:t,limit:20,offset:0,sort_order:this._spotifyConfig.sort_order}),s=a?.items??[];if(!this._drilldown)return;this._drilldown={...this._drilldown,items:s,total:a?.total??0,offset:20,loading:!1};const r=s.map(e=>(e.track??e).id).filter(Boolean);r.length&&this._checkSavedStatus(r)}catch(r){this._handleApiError(r),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}async _loadMoreDrilldown(){if(this._drilldown&&this._backend){this._drilldown={...this._drilldown,loading:!0};try{const e="playlist"===this._drilldown.type?"playlist_tracks":"album_tracks",t=await this._backend.send("spotify_browse",{category:e,content_id:this._drilldown.id,limit:20,offset:this._drilldown.offset,sort_order:this._spotifyConfig.sort_order}),i=t?.items??[];this._drilldown={...this._drilldown,items:[...this._drilldown.items,...i],offset:this._drilldown.offset+20,loading:!1};const a=i.map(e=>(e.track??e).id).filter(Boolean);a.length&&this._checkSavedStatus(a)}catch(e){this._handleApiError(e),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}_goBack(){this._drilldown=null,this._view=this._searchQuery?"search":"library"}_openPicker(e){if(this._pickerItem=e,this._view="speaker_picker",this._selectedSpeakers=new Set,window.addEventListener("keydown",this._onPickerKeydown),queueMicrotask(()=>{requestAnimationFrame(()=>{const e=this.renderRoot.querySelector(".picker-close");e?.focus()})}),this.hass){const e=this._spotifyConfig.visible_speakers,t=e.length>0;this._speakers=Object.entries(this.hass.states).filter(([i])=>!!i.startsWith("media_player.")&&!(t&&!e.includes(i))).map(([e,t])=>{const i=t.attributes.device_class??"";let a="mdi:speaker";return"tv"===i||e.includes("tv")?a="mdi:television":"receiver"===i?a="mdi:audio-video":(e.includes("nest")||e.includes("hub")||e.includes("echo_show"))&&(a="mdi:tablet"),{entityId:e,name:t.attributes.friendly_name??e,state:t.state,mediaTitle:t.attributes.media_title??null,icon:a}}).sort((i,a)=>{if(t)return e.indexOf(i.entityId)-e.indexOf(a.entityId);const s=e=>"playing"===e?0:"paused"===e?1:2;return s(i.state)-s(a.state)})}}_closePicker(){this._pickerItem=null,this._view=this._drilldown?"drilldown":this._searchQuery?"search":"library",window.removeEventListener("keydown",this._onPickerKeydown)}_toggleSpeakerSelection(e){const t=new Set(this._selectedSpeakers);t.has(e)?t.delete(e):t.add(e),this._selectedSpeakers=t}async _playOnSelectedSpeakers(){if(!this.hass||!this._pickerItem||0===this._selectedSpeakers.size)return;mi(this,"light");const e=this._pickerItem,t=e.uri??`spotify:${e.type}:${e.id}`,i=[...this._selectedSpeakers],a="track"===e.type?"music":"playlist"===e.type?"playlist":"album"===e.type?"music":"podcast";try{for(const e of i){const t=this.hass.states[e];if(!t)continue;const i=t.attributes.group_members;i&&i.length>1&&this._safeCallService("media_player","unjoin",{},{entity_id:e})}i.length>1&&await new Promise(e=>setTimeout(e,600));const s=i[0];if(this._safeCallService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:s}),i.length>1){const e=i.slice(1),r=this.hass.states[s];if(r&&!!(524288&r.attributes.supported_features))await new Promise(e=>setTimeout(e,800)),this._safeCallService("media_player","join",{group_members:e},{entity_id:s});else for(const i of e)this._safeCallService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:i})}"track"!==e.type&&"episode"!==e.type||!this._backend||this._seedRadioQueue(e)}catch{}this._closePicker()}async _seedRadioQueue(e){if(!this._backend)return;const t=++this._radioQueueVersion;try{if(await new Promise(e=>setTimeout(e,2e3)),!this._backend||t!==this._radioQueueVersion)return;const i=await this._backend.send("spotify_browse",{category:"recommendations",seed_tracks:[e.id],limit:20});if(t!==this._radioQueueVersion)return;const a=i?.tracks??[];fe.emit("radio-queue-started",{count:a.length});let s=0;for(let e=0;e<a.length;e++){const i=a[e];if(!this._backend||t!==this._radioQueueVersion)break;const r=i.uri??`spotify:track:${i.id}`;try{await this._backend.send("spotify_add_to_queue",{uri:r}),s++,fe.emit("radio-queue-track-added",{track:{id:i.id,name:i.name,uri:r,artist:qr(i)||void 0},index:e}),await new Promise(e=>setTimeout(e,150))}catch{break}}t===this._radioQueueVersion&&fe.emit("radio-queue-complete",{total:s})}catch(i){t===this._radioQueueVersion&&fe.emit("radio-queue-error",{message:i.message??"Unknown error"})}}async _loadMoreItems(e){if(!this._backend||this._loadingMore[e])return;this._loadingMore={...this._loadingMore,[e]:!0};const t=this._spotifyConfig.max_items_per_section;let i=0;"playlists"===e?i=this._playlists.length:"recently_played"===e?i=this._recentlyPlayed.length:"saved_tracks"===e?i=this._savedTracks.length:"saved_shows"===e&&(i=this._savedShows.length);try{const a=await this._backend.send("spotify_browse",{category:e,limit:t,offset:i,sort_order:this._spotifyConfig.sort_order}),s=(a?.items??[]).filter(Boolean);if("playlists"===e)this._playlists=[...this._playlists,...s];else if("recently_played"===e)this._recentlyPlayed=[...this._recentlyPlayed,...s];else if("saved_tracks"===e){this._savedTracks=[...this._savedTracks,...s];const e=s.map(e=>(e.track??e).id).filter(Boolean);e.length&&this._checkSavedStatus(e)}else"saved_shows"===e&&(this._savedShows=[...this._savedShows,...s.map(e=>e.show??e)]);null!=a?.total&&(this._sectionTotals={...this._sectionTotals,[e]:a.total})}catch(a){this._handleApiError(a)}finally{this._loadingMore={...this._loadingMore,[e]:!1}}}_renderLoadMore(e,t){const i=this._sectionTotals[e]??0;if(t>=i)return W;const a=this._loadingMore[e],s=oi(Hr[e]);return V`
      <button
        class="lib-more-link"
        ?disabled=${a}
        aria-label="${oi("spotify.load_more")} ${s} (${t}/${i})"
        @click=${t=>{t.stopPropagation(),this._loadMoreItems(e)}}
      >
        ${a?oi("spotify.loading"):V`<span aria-hidden="true">${oi("spotify.load_more")}</span><span class="lib-more-count" aria-hidden="true">${t} / ${i}</span>`}
      </button>
    `}async _checkSavedStatus(e){const t=[...new Set(e)];if(t.length&&this._backend)try{const e=await this._backend.send("spotify_check_saved",{track_ids:t});if(!this.isConnected)return;const i=new Map(this._savedMap);for(const[t,a]of Object.entries(e??{}))i.set(t,a);this._savedMap=i}catch{}}async _toggleSaved(e){if(!this._backend)return;mi(this,"light");const t=this._savedMap.get(e)??!1,i=new Map(this._savedMap);i.set(e,!t),this._savedMap=i;try{t?await this._backend.send("spotify_remove_tracks",{track_ids:[e]}):await this._backend.send("spotify_save_tracks",{track_ids:[e]})}catch{const i=new Map(this._savedMap);i.set(e,t),this._savedMap=i}}_handleApiError(e){const t=e;"spotify_not_configured"===t.code?this._spotifyConfigured=!1:t.message?.includes("rate limit")||t.message?.includes("429")?this._error=oi("spotify.error_rate_limit",{seconds:"30"}):this._error=oi("spotify.error_api")}render(){if(this._lang,!this._configLoaded)return W;const e=this._getEntityId();if(!1===this._spotifyConfigured)return this._renderShell(V`
        <div class="empty-state">
          <div class="banner-eyebrow banner-eyebrow-setup">
            <span class="banner-eyebrow-dot"></span>
            <span>${oi("spotify.setup_eyebrow")}</span>
          </div>
          <div class="ambient-icon"><ha-icon .icon=${"mdi:spotify"}></ha-icon></div>
          <div class="empty-state-title">${oi("spotify.not_configured")}</div>
          <a class="setup-banner-cta" href="/config/integrations/dashboard" target="_blank" rel="noopener noreferrer">
            <ha-icon .icon=${"mdi:arrow-up-right"}></ha-icon>
            <span>${oi("spotify.open_config")}</span>
          </a>
        </div>
      `);if(!e)return this._renderShell(V`
        <div class="empty-state">
          <div class="banner-eyebrow banner-eyebrow-setup">
            <span class="banner-eyebrow-dot"></span>
            <span>${oi("spotify.setup_eyebrow")}</span>
          </div>
          <div class="ambient-icon"><ha-icon .icon=${"mdi:spotify"}></ha-icon></div>
          <div class="empty-state-title">${oi("spotify.no_entity")}</div>
          <a class="setup-banner-cta" href="/glass-cards" target="_blank" rel="noopener noreferrer">
            <ha-icon .icon=${"mdi:arrow-up-right"}></ha-icon>
            <span>${oi("spotify.open_config")}</span>
          </a>
        </div>
      `);const t="speaker_picker"===this._view&&this._pickerItem;return V`
      ${this._renderShell(V`
        ${this._error?V`
          <div class="error-banner" role="alert">
            <div class="error-banner-icon"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></div>
            <div class="error-banner-body">
              <div class="banner-eyebrow banner-eyebrow-error">
                <span class="banner-eyebrow-dot"></span>
                <span>${oi("spotify.error_eyebrow")}</span>
              </div>
              <div class="error-banner-text">${this._error}</div>
            </div>
          </div>
        `:W}
        ${"drilldown"===this._view&&this._drilldown?this._renderDrilldown():V`
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
      ${t?this._renderSpeakerPicker():W}
    `}_renderShell(e){return V`
      <div class="spotify-card-wrap">
        ${this._spotifyConfig.show_header?V`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${oi("spotify.title")}</span>
            </div>
          </div>
        `:W}
        <div class="glass spotify-card ${this._foldOpen?"fold-open":""}">
          <div class="tint"></div>
          <div class="card-inner">${e}</div>
        </div>
      </div>
    `}_renderSearch(){const e=this._getPlaybackEntity();return e&&!this._foldOpen?this._renderNowPlayingBar(e):V`
      <div class="search-row">
        <div class="search-input-wrap">
          <div class="search-icon"><ha-icon .icon=${"mdi:magnify"}></ha-icon></div>
          <input
            class="search-input"
            type="text"
            placeholder=${oi("spotify.search_placeholder")}
            .value=${this._searchQuery}
            @input=${this._onSearchInput}
            @focus=${()=>{this._foldOpen||(this._foldOpen=!0),this._scrollToTop()}}
          />
          <glass-icon-button
            class="search-clear ${this._searchQuery?"visible":""}"
            size="sm"
            .icon=${"mdi:close"}
            aria-label="${oi("spotify.clear_search")}"
            @click=${this._clearSearch}
          ></glass-icon-button>
          <glass-chevron
            class="search-toggle"
            interactive
            size="sm"
            ?open=${this._foldOpen}
            aria-label=${oi("spotify.toggle_library")}
            @click=${()=>{this._foldOpen=!this._foldOpen}}
          ></glass-chevron>
        </div>
      </div>
    `}_renderNowPlayingBar(e){const t="playing"===e.state,i=e.title??oi("spotify.tab_tracks");return V`
      <div class="np-bar" role="region" aria-label=${oi("spotify.now_playing_aria")}>
        <div class="np-art">
          ${e.art?V`<img src=${e.art} alt="" loading="lazy" />`:V`<ha-icon .icon=${"mdi:music-note"}></ha-icon>`}
        </div>
        <div class="np-meta">
          <div class="np-title">${i}</div>
          ${e.artist?V`<div class="np-artist">${e.artist}</div>`:W}
        </div>
        <div class="np-transport">
          <glass-icon-button
            size="sm"
            .icon=${"mdi:skip-previous"}
            aria-label=${oi("spotify.previous_track")}
            @click=${e=>this._mediaPrev(e)}
          ></glass-icon-button>
          <button class="np-btn np-btn-play ${t?"is-playing":"is-paused"}" aria-label=${oi(t?"spotify.pause":"spotify.play")} @click=${e=>this._mediaPlayPause(e)}>
            <ha-icon .icon=${t?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <glass-icon-button
            size="sm"
            .icon=${"mdi:skip-next"}
            aria-label=${oi("spotify.next_track")}
            @click=${e=>this._mediaNext(e)}
          ></glass-icon-button>
        </div>
        <glass-icon-button
          class="np-btn-search"
          size="sm"
          .icon=${"mdi:magnify"}
          aria-label=${oi("spotify.search_placeholder")}
          @click=${e=>{e.stopPropagation(),this._foldOpen=!0,this._focusSearchInput()}}
        ></glass-icon-button>
        <glass-chevron
          class="search-toggle"
          interactive
          size="sm"
          ?open=${this._foldOpen}
          aria-label=${oi("spotify.toggle_library")}
          @click=${()=>{this._foldOpen=!this._foldOpen}}
        ></glass-chevron>
      </div>
    `}_renderTabs(){const e=[{id:"all",labelKey:"spotify.tab_all",icon:"mdi:home"},{id:"tracks",labelKey:"spotify.tab_tracks",icon:"mdi:music-note"},{id:"playlists",labelKey:"spotify.tab_playlists",icon:"mdi:playlist-music"},{id:"podcasts",labelKey:"spotify.tab_podcasts",icon:"mdi:podcast"}],t=e.findIndex(e=>e.id===this._tab);return V`
      <div class="tab-rail" style="--tab-active-idx: ${t};">
        <div class="tab-rail-capsule" aria-hidden="true"></div>
        ${e.map(e=>V`
          <button
            class="tab-btn ${this._tab===e.id?"active":""}"
            aria-pressed=${this._tab===e.id?"true":"false"}
            aria-label=${oi(e.labelKey)}
            @click=${()=>{this._tab=e.id,this._searchQuery&&(this._searchOffset=0,this._doSearch(!1))}}
          >
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${oi(e.labelKey)}</span>
          </button>
        `)}
      </div>
    `}_renderLibrary(){if(this._libraryLoading)return V`<div class="loading-text">${oi("spotify.loading")}</div>`;const e="all"===this._tab||"playlists"===this._tab,t="all"===this._tab||"tracks"===this._tab,i="all"===this._tab||"podcasts"===this._tab;return e&&this._playlists.length>0||t&&(this._recentlyPlayed.length>0||this._savedTracks.length>0)||i&&this._savedShows.length>0?V`
      ${e&&this._playlists.length>0?V`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-playlists">
            <span class="lib-eyebrow-dot"></span>
            <span>${oi("spotify.my_playlists")}</span>
            ${this._renderLoadMore("playlists",this._playlists.length)}
          </div>
          <div class="playlist-scroll">
            ${this._playlists.map(e=>this._renderPlaylistCard(e))}
          </div>
        </div>
      `:W}

      ${t&&this._recentlyPlayed.length>0?V`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-recents">
            <span class="lib-eyebrow-dot"></span>
            <span>${oi("spotify.recently_played")}</span>
            ${this._renderLoadMore("recently_played",this._recentlyPlayed.length)}
          </div>
          ${this._recentlyPlayed.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
        </div>
      `:W}

      ${t&&this._savedTracks.length>0?V`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-saved">
            <span class="lib-eyebrow-dot"></span>
            <span>${oi("spotify.saved_tracks")}</span>
            ${this._renderLoadMore("saved_tracks",this._savedTracks.length)}
          </div>
          ${this._savedTracks.map(e=>{const t=e.track??e;return this._renderResultRow(t,"track")})}
        </div>
      `:W}

      ${i&&this._savedShows.length>0?V`
        <div class="lib-section">
          <div class="lib-eyebrow lib-eyebrow-podcasts">
            <span class="lib-eyebrow-dot"></span>
            <span>${oi("spotify.followed_podcasts")}</span>
            ${this._renderLoadMore("saved_shows",this._savedShows.length)}
          </div>
          ${this._savedShows.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
        </div>
      `:W}
    `:V`
        <div class="empty-state">
          <div class="ambient-icon"><ha-icon .icon=${"mdi:music-note-off"}></ha-icon></div>
          <div class="empty-state-title">${oi("spotify.no_content")}</div>
          <div class="empty-state-sub">${oi("spotify.no_content_sub")}</div>
        </div>
      `}_renderPlaylistCard(e){const t=Fr(e,160),i=e.tracks?.total??0;return V`
      <button
        class="playlist-card"
        aria-label=${e.name}
        @click=${()=>this._openDrilldown("playlist",e.id,e.name,Fr(e,300),e.owner?.display_name)}
      >
        <div class="playlist-art">
          ${t?V`<img src=${t} alt="" loading="lazy" />`:V`<div class="playlist-art-fallback"><ha-icon .icon=${"mdi:playlist-music"}></ha-icon></div>`}
          <div class="playlist-art-overlay" aria-hidden="true"></div>
          <div class="playlist-art-play"><ha-icon .icon=${"mdi:play"}></ha-icon></div>
        </div>
        <div class="playlist-name">${e.name}</div>
        ${i>0?V`<div class="playlist-count">${oi("spotify.tracks_count",{count:String(i)})}</div>`:W}
      </button>
    `}_renderResultRow(e,t){if(!e)return W;const i=Fr(e,64),a=qr(e)||(e.owner?.display_name??""),s="show"===t||"episode"===t,r=e.uri??`spotify:${e.type??t}:${e.id}`,o=this._isNowPlaying(r);return V`
      <div
        class="result-row ${o?"now-playing":""}"
        role="button"
        tabindex="0"
        @click=${()=>{"playlist"===t?this._openDrilldown("playlist",e.id,e.name,Fr(e,300),e.owner?.display_name):"album"===t?this._openDrilldown("album",e.id,e.name,Fr(e,300),qr(e)):this._openPicker(e)}}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.currentTarget.click())}}
      >
        <div class="result-art ${s?"round":""}">
          ${i?V`<img src=${i} alt="" loading="lazy" />`:V`<ha-icon .icon=${Nr(t)}></ha-icon>`}
        </div>
        <div class="result-info">
          <div class="result-title">${e.name}</div>
          <div class="result-meta">
            <span class="result-type-badge">${oi(function(e){switch(e){case"track":default:return"spotify.type_track";case"playlist":return"spotify.type_playlist";case"album":return"spotify.type_album";case"show":case"episode":return"spotify.type_podcast"}}(t))}</span>
            <span>${a}</span>
          </div>
        </div>
        ${"track"!==t&&"episode"!==t||!e.id?W:V`
          <glass-icon-button
            class="heart-btn"
            size="sm"
            active-color="alert"
            ?active=${this._savedMap.get(e.id)??!1}
            .icon=${this._savedMap.get(e.id)?"mdi:heart":"mdi:heart-outline"}
            aria-label="${this._savedMap.get(e.id)?oi("spotify.remove_track"):oi("spotify.save_track")}"
            @click=${t=>{t.stopPropagation(),this._toggleSaved(e.id)}}
          ></glass-icon-button>
        `}
        ${o?V`<div class="eq-bars"><span></span><span></span><span></span></div>`:V`
            <glass-icon-button
              class="result-play"
              size="sm"
              .icon=${"mdi:play"}
              active-color="spotify"
              aria-label=${oi("spotify.play_aria",{name:e.name})}
              @click=${t=>{t.stopPropagation(),this._openPicker(e)}}
            ></glass-icon-button>
          `}
      </div>
    `}_renderSearchResults(){if(this._searchLoading&&0===this._searchOffset)return V`<div class="loading-text">${oi("spotify.loading")}</div>`;const{tracks:e,playlists:t,shows:i}=this._searchResults,a=("all"===this._tab||"tracks"===this._tab)&&e.length>0,s=("all"===this._tab||"playlists"===this._tab)&&t.length>0,r=("all"===this._tab||"podcasts"===this._tab)&&i.length>0;if(!a&&!s&&!r)return V`
        <div class="empty-state">
          <div class="ambient-icon"><ha-icon .icon=${"mdi:magnify"}></ha-icon></div>
          <div class="empty-state-title">${oi("spotify.no_results_title")}</div>
          <div class="empty-state-sub">${oi("spotify.no_results",{query:this._searchQuery})}</div>
        </div>
      `;const o=r?"shows":s?"playlists":"tracks",n=this._searchHasMore?V`
      <button
        class="lib-more-link"
        ?disabled=${this._searchLoading}
        aria-label="${oi("spotify.load_more")} (${this._searchQuery})"
        @click=${e=>{e.stopPropagation(),this._doSearch(!0)}}
      >
        ${this._searchLoading?V`<span>${oi("spotify.loading")}</span>`:V`<span aria-hidden="true">${oi("spotify.load_more")}</span>`}
      </button>
    `:W;return V`
      ${a?V`
        <div class="lib-section">
          ${"all"===this._tab?V`
            <div class="lib-eyebrow lib-eyebrow-tracks">
              <span class="lib-eyebrow-dot"></span>
              <span>${oi("spotify.tab_tracks")}</span>
              ${"tracks"===o?n:W}
            </div>
          `:W}
          ${e.map(e=>this._renderResultRow(e,"track"))}
        </div>
      `:W}

      ${s?V`
        <div class="lib-section">
          ${"all"===this._tab?V`
            <div class="lib-eyebrow lib-eyebrow-playlists">
              <span class="lib-eyebrow-dot"></span>
              <span>${oi("spotify.tab_playlists")}</span>
              ${"playlists"===o?n:W}
            </div>
          `:W}
          ${t.map(e=>this._renderResultRow(e,"playlist"))}
        </div>
      `:W}

      ${r?V`
        <div class="lib-section">
          ${"all"===this._tab?V`
            <div class="lib-eyebrow lib-eyebrow-podcasts">
              <span class="lib-eyebrow-dot"></span>
              <span>${oi("spotify.tab_podcasts")}</span>
              ${"shows"===o?n:W}
            </div>
          `:W}
          ${i.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
        </div>
      `:W}

      ${"all"!==this._tab&&this._searchHasMore?V`
        <div class="lib-section search-more-standalone">${n}</div>
      `:W}
    `}_playFullDrilldown(){if(!this._drilldown)return;const e=this._drilldown,t=`spotify:${e.type}:${e.id}`;this._openPicker({id:e.id,name:e.title,type:e.type,uri:t})}_renderDrilldown(){const e=this._drilldown;if(!e)return W;const t="album"===e.type?oi("spotify.type_album"):oi("spotify.type_playlist"),i=e.total>0?oi("spotify.tracks_count",{count:String(e.total)}):"",a=[e.subtitle,t,i].filter(Boolean).join(" · "),s=!e.loading&&e.items.length<e.total;return V`
      <div class="drilldown">
        <div class="drilldown-hero">
          <glass-icon-button
            class="drilldown-back"
            size="sm"
            .icon=${"mdi:arrow-left"}
            aria-label=${oi("spotify.back")}
            @click=${this._goBack}
          ></glass-icon-button>
          <div class="drilldown-hero-art">
            ${e.image?V`<img src=${e.image} alt="" loading="lazy" />`:V`<ha-icon .icon=${"album"===e.type?"mdi:album":"mdi:playlist-music"}></ha-icon>`}
          </div>
          <div class="drilldown-hero-info">
            <div class="drilldown-hero-title">${e.title}</div>
            ${a?V`<div class="drilldown-hero-meta">${a}</div>`:W}
            <button
              class="drilldown-play-cta"
              @click=${this._playFullDrilldown}
              ?disabled=${0===e.items.length}
              aria-label=${oi("spotify.play_all")}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
              <span>${oi("spotify.play_all")}</span>
            </button>
          </div>
        </div>

        <div class="lib-section drilldown-tracks">
          <div class="lib-eyebrow lib-eyebrow-playlists">
            <span class="lib-eyebrow-dot"></span>
            <span>${oi("spotify.tab_tracks")}</span>
            ${s?V`
              <button
                class="lib-more-link"
                ?disabled=${e.loading}
                aria-label="${oi("spotify.load_more")} (${e.items.length}/${e.total})"
                @click=${e=>{e.stopPropagation(),this._loadMoreDrilldown()}}
              >
                <span aria-hidden="true">${oi("spotify.load_more")}</span>
                <span class="lib-more-count" aria-hidden="true">${e.items.length} / ${e.total}</span>
              </button>
            `:W}
          </div>
          ${e.items.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
          ${e.loading?V`<div class="loading-text">${oi("spotify.loading")}</div>`:W}
          ${e.loading||0!==e.items.length?W:V`
            <div class="empty-state">
              <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
              <div class="empty-state-text">${oi("spotify.no_content")}</div>
            </div>
          `}
        </div>
      </div>
    `}_renderSpeakerPicker(){const e=this._pickerItem;if(!e)return W;const t=Fr(e,200),i=qr(e),a=this._selectedSpeakers.size,s=a>0;let r=oi("spotify.choose_speaker");if(1===a){const e=this._speakers.find(e=>this._selectedSpeakers.has(e.entityId));r=e?oi("spotify.play_on_named",{name:e.name}):oi("spotify.play")}else a>1&&(r=oi("spotify.play_on_count",{count:String(a)}));return V`
      <div class="picker-backdrop visible" role="presentation" @click=${e=>{e.target.classList.contains("picker-backdrop")&&this._closePicker()}}>
        <div class="glass speaker-picker" role="dialog" aria-modal="true" aria-labelledby="picker-track-title">
          <div class="picker-header">
            <div class="picker-eyebrow">
              <span class="picker-eyebrow-dot"></span>
              <span>${oi("spotify.connect")}</span>
            </div>
            <button class="picker-close" aria-label="${oi("common.close")}" @click=${this._closePicker}>
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>

          <div class="picker-hero">
            <div class="picker-hero-art">
              ${t?V`<img src=${t} alt="" />`:V`<ha-icon .icon=${Nr(e.type??"track")}></ha-icon>`}
            </div>
            <div class="picker-hero-info">
              <div class="picker-hero-title" id="picker-track-title">${e.name}</div>
              ${i?V`<div class="picker-hero-artist">${i}</div>`:W}
            </div>
          </div>

          <div class="picker-speakers" role="listbox" aria-multiselectable="true">
            ${this._speakers.map(e=>this._renderSpeakerRow(e))}
          </div>

          <div class="picker-play-bar">
            <button
              class="picker-play-btn primary"
              ?disabled=${!s}
              @click=${()=>this._playOnSelectedSpeakers()}
              aria-label=${r}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
              <span>${r}</span>
            </button>
          </div>
        </div>
      </div>
    `}_renderSpeakerRow(e){const t=this._selectedSpeakers.has(e.entityId),i="playing"===e.state,a="paused"===e.state,s=i&&e.mediaTitle?e.mediaTitle:a?oi("spotify.paused"):"off"===e.state?oi("spotify.speaker_off"):oi("spotify.available"),r=i?"playing":a?"paused":"off"===e.state?"off":"idle";return V`
      <button
        class="picker-speaker ${t?"selected":""} state-${r}"
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
            ${i?V`<span class="picker-state-eq" aria-hidden="true"><span></span><span></span><span></span></span>`:V`<span class="picker-state-dot" aria-hidden="true"></span>`}
            <span class="picker-state-label">${s}</span>
          </div>
        </div>
        <div class="picker-speaker-check" aria-hidden="true">
          <ha-icon .icon=${"mdi:check"}></ha-icon>
        </div>
      </button>
    `}}jr([ge()],Vr.prototype,"_view"),jr([ge()],Vr.prototype,"_tab"),jr([ge()],Vr.prototype,"_searchQuery"),jr([ge()],Vr.prototype,"_playlists"),jr([ge()],Vr.prototype,"_recentlyPlayed"),jr([ge()],Vr.prototype,"_savedTracks"),jr([ge()],Vr.prototype,"_savedShows"),jr([ge()],Vr.prototype,"_searchResults"),jr([ge()],Vr.prototype,"_searchLoading"),jr([ge()],Vr.prototype,"_searchOffset"),jr([ge()],Vr.prototype,"_searchHasMore"),jr([ge()],Vr.prototype,"_drilldown"),jr([ge()],Vr.prototype,"_speakers"),jr([ge()],Vr.prototype,"_pickerItem"),jr([ge()],Vr.prototype,"_selectedSpeakers"),jr([ge()],Vr.prototype,"_error"),jr([ge()],Vr.prototype,"_libraryLoading"),jr([ge()],Vr.prototype,"_spotifyConfigured"),jr([ge()],Vr.prototype,"_foldOpen"),jr([ge()],Vr.prototype,"_savedMap"),jr([ge()],Vr.prototype,"_sectionTotals"),jr([ge()],Vr.prototype,"_loadingMore");try{customElements.define("glass-spotify-card",Vr)}catch{}hi("glass-camera-carousel-card-editor");var Br=Object.defineProperty,Ur=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&Br(t,i,r),r};const Wr=1,Kr="mdi:cctv",Yr="mdi:webcam",Gr="mdi:doorbell-video",Xr={person:"mdi:human",vehicle:"mdi:car",pet:"mdi:dog",animal:"mdi:paw",package:"mdi:package-variant",face:"mdi:face-recognition",baby_crying:"mdi:baby-face-outline",bicycle:"mdi:bicycle"},Qr={motion:/_(motion|mouvement)$/,record:/_(record|enregistrer)$/,siren:/^siren\./,floodlight:/_(floodlight|projecteur)$/,auto_tracking:/_(auto_tracking|suivi_automatique)$/},Jr=[[/_person(ne)?$/,"person"],[/_vehicu?le$/,"vehicle"],[/_pet$|_animal_domestique$/,"pet"],[/_animal$/,"animal"],[/_face$|_visage$/,"face"],[/_package$|_colis$/,"package"],[/_baby_crying$|_pleur_bebe$/,"baby_crying"],[/_bicycl?e$|_velo$/,"bicycle"]],Zr=new Map;function eo(e,t,i){const a=i[e];if(!a?.device_id)return{motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};const s=a.device_id;let r=s;for(const l of Object.keys(i))i[l].device_id===s&&l.startsWith("binary_sensor.")&&t[l]&&(r+=`:${l}=${t[l].state}`);const o=Zr.get(e);if(o&&o.key===r)return o.result;const n=[];for(const[l,d]of Object.entries(i))d.device_id===s&&n.push(l);const c={motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};for(const l of n){const e=t[l];if(e&&(l.startsWith("binary_sensor.")&&Qr.motion.test(l)&&(c.motionSensorId=l),l.startsWith("switch.")&&Qr.record.test(l)&&(c.recordSwitchId=l),Qr.siren.test(l)&&(c.sirenId=l),l.startsWith("light.")&&Qr.floodlight.test(l)&&(c.floodlightId=l),l.startsWith("switch.")&&Qr.auto_tracking.test(l)&&(c.autoTrackId=l),l.startsWith("binary_sensor.")&&"on"===e.state))for(const[t,i]of Jr)t.test(l)&&!c.aiDetected.includes(i)&&c.aiDetected.push(i)}return Zr.set(e,{key:r,result:c}),c}function to(e){const t=e.attributes?.icon;if(t)return t;const i=e.entity_id;return i.includes("doorbell")?Gr:i.includes("indoor")||i.includes("salon")||i.includes("chambre")?Yr:Kr}class io extends ui{constructor(){super(...arguments),this._carouselIndex=0,this._liveIds=new Set,this._foldOpen=!1,this._camConfig=null,this._roomConfig=null,this._configLoaded=!1,this._configLoading=!1,this._roomConfigLoading=!1,this._loadVersion=0,this._touchStartX=0,this._touchDelta=0,this._isSwiping=!1,this._trackEl=null,this._cachedCameraIds=[],this._cachedCamerasKey="",this._onPointerDown=e=>{if(e.target.closest("glass-icon-button, .carousel-nav"))return;this._touchStartX=e.clientX,this._touchDelta=0,this._isSwiping=!0;e.currentTarget.setPointerCapture(e.pointerId),this._trackEl=this.shadowRoot?.querySelector(".carousel-track"),this._trackEl&&(this._trackEl.style.transition="none")},this._onPointerMove=e=>{if(!this._isSwiping)return;const t=this._trackEl??this.shadowRoot?.querySelector(".carousel-track");if(!t)return;this._trackEl=t,this._touchDelta=e.clientX-this._touchStartX;const i=e.currentTarget.offsetWidth,a=100*this._carouselIndex,s=this._touchDelta/i*100;this._trackEl.style.transform=`translateX(${-a+s}%)`},this._onPointerUp=e=>{if(!this._isSwiping||!this._trackEl)return;this._isSwiping=!1,this._trackEl.style.transition="";const t=.2*e.currentTarget.offsetWidth;this._touchDelta<-t?this._goTo(this._carouselIndex+1):this._touchDelta>t?this._goTo(this._carouselIndex-1):this._goTo(this._carouselIndex),this._trackEl=null},this._onPointerCancel=()=>{this._isSwiping&&this._trackEl&&(this._isSwiping=!1,this._trackEl.style.transition="",this._goTo(this._carouselIndex),this._trackEl=null)}}static getConfigElement(){return document.createElement("glass-camera-carousel-card-editor")}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("camera-carousel-config-changed",()=>{this._configLoaded=!1,this._cachedCamerasKey="",this._loadConfig()}),this._listen("room-config-changed",e=>{this.areaId&&e.areaId===this.areaId&&(this._roomConfig=null,this._cachedCamerasKey="",this._loadRoomConfig())}),this._listen("dashboard-config-changed",()=>this.requestUpdate()),this._timestampTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._clearCycleTimer(),this._clearTimestampTimer(),Zr.clear()}getTrackedEntityIds(){if(!this.hass)return[];const e=this.hass;return this._getCameraIds().flatMap(t=>{const i=eo(t,e.states,e.entities);return[t,i.motionSensorId,i.recordSwitchId,i.sirenId,i.floodlightId,i.autoTrackId].filter(Boolean)})}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection===this.hass.connection||(this._backend=new yi(this.hass))),this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._carouselIndex=0,this._cachedCamerasKey="",this._configLoaded=!1,this._roomConfig=null,this._liveIds=new Set),this._configLoaded||this._configLoading||this._loadConfig(),!this.areaId||this._roomConfig||this._roomConfigLoading||this._loadRoomConfig()}async _loadConfig(){if(!this._backend||this._configLoading)return;this._configLoading=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;this._camConfig=t.camera_carousel||{show_header:!0,entity_order:[],hidden_entities:[],auto_cycle:!1,cycle_interval:10},this._configLoaded=!0,this._setupCycleTimer(),this.requestUpdate()}catch{}finally{this._configLoading=!1}}async _loadRoomConfig(){if(!this._backend||!this.areaId||this._roomConfigLoading)return;this._roomConfigLoading=!0;const e=this.areaId;try{const t=await this._backend.send("get_room",{area_id:e});if(this.areaId!==e)return;this._roomConfig={hidden_entities:t?.hidden_entities??[],entity_order:t?.entity_order??[]},this._cachedCamerasKey="",this.requestUpdate()}catch{}finally{this._roomConfigLoading=!1}}_getCameraIds(){if(!this.hass)return[];let e;e=this.areaId?fi(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("camera.")).map(e=>e.entity_id):Object.keys(this.hass.states).filter(e=>e.startsWith("camera."));const t=new Set(this._camConfig?.hidden_entities??[]);if(this.areaId&&this._roomConfig)for(const s of this._roomConfig.hidden_entities)t.add(s);t.size&&(e=e.filter(e=>!t.has(e)));const i=e.length+":"+e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.last_changed}`:e}).join(",");if(i===this._cachedCamerasKey)return this._cachedCameraIds;const a=this.areaId?this._roomConfig?.entity_order??[]:[];if(this.areaId&&a.length){const t=a.filter(t=>e.includes(t)),i=e.filter(e=>!t.includes(e));e=[...t,...i]}else{const t=this._camConfig?.entity_order??[];if(t.length){const i=t.filter(t=>e.includes(t)),a=e.filter(e=>!i.includes(e));if(!this.areaId){const e=this.hass.states,t=this.hass.entities;a.sort((i,a)=>this._latestAlertTimestamp(a,e,t)-this._latestAlertTimestamp(i,e,t))}e=[...i,...a]}else if(!this.areaId){const t=this.hass.states,i=this.hass.entities;e.sort((e,a)=>this._latestAlertTimestamp(a,t,i)-this._latestAlertTimestamp(e,t,i))}}return this._cachedCamerasKey=i,this._cachedCameraIds=e,this._carouselIndex>=e.length&&(this._carouselIndex=Math.max(0,e.length-1)),this._cachedCameraIds}_latestAlertTimestamp(e,t,i){const a=i[e];if(!a?.device_id)return 0;const s=a.device_id;let r=0;for(const[o,n]of Object.entries(i)){if(n.device_id!==s||!o.startsWith("binary_sensor."))continue;if(!Jr.some(([e])=>e.test(o)))continue;const e=t[o];if(!e)continue;const i=new Date(e.last_changed).getTime();i>r&&(r=i)}return r}_getCameraInfo(e){if(!this.hass)return null;const t=this.hass.states[e];if(!t)return null;const i=t.attributes?.supported_features??0,a="unavailable"!==t.state&&!1!==t.attributes?.is_on,s=eo(e,this.hass.states,this.hass.entities);return{entityId:e,entity:t,name:t.attributes?.friendly_name||e.split(".")[1],state:t.state,isOn:a,features:i,entityPicture:t.attributes?.entity_picture??null,motionSensorId:s.motionSensorId,motionDetectionSupported:void 0!==t.attributes?.motion_detection,motionDetectionEnabled:!0===t.attributes?.motion_detection,hasMotion:!!s.motionSensorId&&"on"===this.hass.states[s.motionSensorId]?.state,recordSwitchId:s.recordSwitchId,isRecording:"recording"===t.state||!!s.recordSwitchId&&"on"===this.hass.states[s.recordSwitchId]?.state,sirenId:s.sirenId,floodlightId:s.floodlightId,autoTrackId:s.autoTrackId,aiDetected:s.aiDetected,icon:to(t)}}_setupCycleTimer(){if(this._clearCycleTimer(),this._camConfig?.auto_cycle&&this._getCameraIds().length>1){const e=1e3*(this._camConfig.cycle_interval||10);this._cycleTimer=setInterval(()=>{if(this._isSwiping)return;const e=this._getCameraIds();e.length>1&&(this._carouselIndex=(this._carouselIndex+1)%e.length,this.requestUpdate())},e)}}_clearCycleTimer(){this._cycleTimer&&(clearInterval(this._cycleTimer),this._cycleTimer=void 0)}_clearTimestampTimer(){this._timestampTimer&&(clearInterval(this._timestampTimer),this._timestampTimer=void 0)}_goTo(e){const t=this._getCameraIds();t.length&&(this._carouselIndex=(e%t.length+t.length)%t.length,this._foldOpen=!1,this._setupCycleTimer(),this.requestUpdate())}_prev(){this._goTo(this._carouselIndex-1)}_next(){this._goTo(this._carouselIndex+1)}_togglePower(e){if(!this.hass)return;const t=e.isOn?"turn_off":"turn_on";this._safeCallService("camera",t,{entity_id:e.entityId})}_snapshot(e){if(!this.hass)return;const t=new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0});this.dispatchEvent(t)}_toggleRecord(e){if(!this.hass||!e.recordSwitchId)return;const t="on"===this.hass.states[e.recordSwitchId]?.state;this._safeCallService("switch",t?"turn_off":"turn_on",{entity_id:e.recordSwitchId})}_toggleMotion(e){if(!this.hass)return;const t=e.motionDetectionEnabled?"disable_motion_detection":"enable_motion_detection";this._safeCallService("camera",t,{entity_id:e.entityId})}_toggleSiren(e){if(!this.hass||!e.sirenId)return;const t="on"===this.hass.states[e.sirenId]?.state;this._safeCallService("siren",t?"turn_off":"turn_on",{entity_id:e.sirenId})}_toggleFloodlight(e){if(!this.hass||!e.floodlightId)return;const t="on"===this.hass.states[e.floodlightId]?.state;this._safeCallService("light",t?"turn_off":"turn_on",{entity_id:e.floodlightId})}_toggleAutoTrack(e){if(!this.hass||!e.autoTrackId)return;const t="on"===this.hass.states[e.autoTrackId]?.state;this._safeCallService("switch",t?"turn_off":"turn_on",{entity_id:e.autoTrackId})}_startStream(e){const t=new Set(this._liveIds);t.add(e),this._liveIds=t}render(){if(this._lang,!this.hass)return W;const e=this._getCameraIds();if(!e.length)return W;const t=!1!==this._camConfig?.show_header,i=this._getCameraInfo(e[this._carouselIndex]),a=this._bindGesture({onTap:()=>{const t=e[this._carouselIndex];t&&!this._liveIds.has(t)&&this._startStream(t)},onLongPress:()=>{this._isSwiping=!1,this._trackEl=null,this._foldOpen=!this._foldOpen},exclude:"glass-icon-button"});return V`
      ${t?V`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${oi("camera.title")}</span>
          </div>
        </div>
      `:W}
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
          ${e.length>1?V`
            <glass-icon-button
              class="carousel-nav prev"
              size="md"
              .icon=${"mdi:chevron-left"}
              aria-label="${oi("camera.prev_aria")}"
              @click=${this._prev}
            ></glass-icon-button>
            <glass-icon-button
              class="carousel-nav next"
              size="md"
              .icon=${"mdi:chevron-right"}
              aria-label="${oi("camera.next_aria")}"
              @click=${this._next}
            ></glass-icon-button>
          `:W}
          ${e.length>1?V`
            <div class="carousel-dots">
              ${e.map((e,t)=>this._renderDot(e,t))}
            </div>
          `:W}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="fold-sep-top"></div>
            <div class="fold-panel">
              ${i?this._renderInfoBar(i):W}
              ${i?this._renderActions(i):W}
            </div>
          </div>
        </div>
      </div>
    `}_tintStyle(e){if(!e||!e.isOn||"idle"===e.state)return"opacity:0";return`background:radial-gradient(ellipse at 50% 50%,${e.aiDetected.length>0?"var(--c-warning)":"var(--cam-color)"},transparent 70%);opacity:0.12`}_renderSlide(e,t){const i=this._getCameraInfo(e);if(!i)return V`<div class="carousel-slide"><div class="carousel-slide-inner off-feed"></div></div>`;const a=this._liveIds.has(e)||"streaming"===i.state||"recording"===i.state,s=i.isOn&&a&&t,r=i.isOn?a?"active-feed":"idle-feed":"off-feed";return V`
      <div class="carousel-slide">
        <div class="carousel-slide-inner ${r}">
          ${s&&this.hass?V`
            <ha-camera-stream
              .hass=${this.hass}
              .stateObj=${i.entity}
              .controls=${!1}
              .muted=${!0}
              class="cam-stream"
            ></ha-camera-stream>
          `:i.entityPicture&&i.isOn?V`
            <img class="cam-thumbnail" src="${i.entityPicture}" alt="${i.name}" />
          `:W}
          ${i.isOn?V`
            <div class="stream-overlay-top">
              <div class="stream-cam-name">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:12px"></ha-icon>
                <span>${i.name}</span>
                ${a&&i.isRecording?V`
                  <span class="rec-indicator">
                    <span class="rec-circle"></span> REC
                  </span>
                `:W}
              </div>
              <div class="stream-time">${(new Date).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}</div>
            </div>
            <div class="stream-overlay-bottom">
              ${i.aiDetected.length>0?V`
                <div class="stream-ai-tags">
                  ${i.aiDetected.map(e=>V`
                    <div class="stream-ai-tag">
                      <ha-icon .icon=${Xr[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                      ${oi(`camera.ai_${e}`)}
                    </div>
                  `)}
                </div>
              `:V`<div></div>`}
            </div>
            ${a?W:V`
              <button class="stream-placeholder" @click=${t=>{t.stopPropagation(),this._startStream(e)}}
                aria-label="${oi("camera.tap_to_stream")}">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
                <span>${oi("camera.tap_to_stream")}</span>
              </button>
            `}
          `:V`
            <div class="stream-placeholder">
              <ha-icon .icon=${"mdi:camera-off"} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
              <span>${oi("camera.camera_off")}</span>
            </div>
          `}
        </div>
      </div>
    `}_renderDot(e,t){const i=this._getCameraInfo(e);let a="carousel-dot-btn tappable";return t===this._carouselIndex&&(a+=" active"),i?.aiDetected.length&&(a+=" motion-dot"),V`
      <button class="${a}"
        aria-label="${oi("camera.dot_aria",{name:i?.name||""})}"
        @click=${()=>this._goTo(t)}
      ></button>
    `}_renderInfoBar(e){const t=e.isOn&&"idle"!==e.state;return V`
      <div class="carousel-info">
        <div class="carousel-cam-icon ${t?"on":""}">
          <ha-icon .icon=${e.icon} style="--mdc-icon-size:16px"></ha-icon>
        </div>
        <div class="carousel-info-text">
          <div class="carousel-cam-name">${e.name}</div>
          <div class="carousel-cam-sub">
            <span class="carousel-state ${t?"live":""}">${function(e,t){if(!t)return oi("camera.off");switch(e){case"idle":return oi("camera.idle");case"streaming":return oi("camera.streaming");case"recording":return oi("camera.recording");default:return e}}(e.state,e.isOn)}</span>
            ${e.aiDetected.length>0&&e.isOn?V`
              <div class="carousel-ai-mini">
                ${e.aiDetected.map(e=>V`
                  <div class="ai-badge active">
                    <ha-icon .icon=${Xr[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                  </div>
                `)}
              </div>
            `:W}
          </div>
        </div>
      </div>
    `}_renderActions(e){if(!e.isOn)return V`
        <div class="carousel-actions">
          <glass-button
            size="sm"
            variant="ghost"
            .icon=${"mdi:power"}
            aria-label="${oi("camera.power_on")}"
            @click=${()=>this._togglePower(e)}
          >${oi("camera.power_on")}</glass-button>
        </div>
      `;const t=0!==(e.features&Wr),i=!!e.sirenId&&"on"===this.hass?.states[e.sirenId]?.state,a=!!e.floodlightId&&"on"===this.hass?.states[e.floodlightId]?.state,s=!!e.autoTrackId&&"on"===this.hass?.states[e.autoTrackId]?.state;return V`
      <div class="carousel-actions">
        ${t?V`
          <glass-icon-button
            size="md"
            .icon=${"mdi:power"}
            ?active=${!0}
            active-color="alert"
            aria-label="${oi("camera.power_off")}"
            @click=${()=>this._togglePower(e)}
          ></glass-icon-button>
        `:W}
        <glass-button
          size="sm"
          variant="ghost"
          .icon=${"mdi:camera"}
          aria-label="${oi("camera.snapshot")}"
          @click=${()=>this._snapshot(e)}
        >${oi("camera.snapshot")}</glass-button>
        ${e.recordSwitchId?V`
          <glass-button
            size="sm"
            variant="ghost"
            .icon=${e.isRecording?"mdi:record-circle":"mdi:record"}
            class=${e.isRecording?"rec-active":""}
            aria-label="${e.isRecording?oi("camera.record_stop"):oi("camera.record_start")}"
            @click=${()=>this._toggleRecord(e)}
          >${e.isRecording?oi("camera.record_stop"):oi("camera.record_start")}</glass-button>
        `:W}
        ${e.motionDetectionSupported?V`
          <glass-icon-button
            size="md"
            .icon=${e.motionDetectionEnabled?"mdi:motion-sensor":"mdi:motion-sensor-off"}
            ?active=${e.motionDetectionEnabled}
            active-color="alert"
            aria-label="${e.motionDetectionEnabled?oi("camera.motion_on_aria"):oi("camera.motion_off_aria")}"
            @click=${()=>this._toggleMotion(e)}
          ></glass-icon-button>
        `:W}
        ${e.sirenId?V`
          <glass-icon-button
            size="md"
            .icon=${"mdi:bullhorn"}
            ?active=${i}
            active-color="alert"
            aria-label="${oi("camera.siren_aria")}"
            @click=${()=>this._toggleSiren(e)}
          ></glass-icon-button>
        `:W}
        ${e.floodlightId?V`
          <glass-icon-button
            size="md"
            .icon=${a?"mdi:flashlight":"mdi:flashlight-off"}
            ?active=${a}
            active-color="warning"
            aria-label="${oi("camera.floodlight_aria")}"
            @click=${()=>this._toggleFloodlight(e)}
          ></glass-icon-button>
        `:W}
        ${e.autoTrackId?V`
          <glass-icon-button
            size="md"
            .icon=${"mdi:target-account"}
            ?active=${s}
            active-color="alert"
            aria-label="${oi("camera.auto_track_aria")}"
            @click=${()=>this._toggleAutoTrack(e)}
          ></glass-icon-button>
        `:W}
      </div>
    `}static{this.styles=[Dt,Pt,Tt,Rt,Lt,At,ei,r`
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
    `]}}Ur([pe()],io.prototype,"areaId"),Ur([ge()],io.prototype,"_carouselIndex"),Ur([ge()],io.prototype,"_liveIds"),Ur([ge()],io.prototype,"_foldOpen");try{customElements.define("glass-camera-carousel-card",io)}catch{}hi("glass-title-card-editor");var ao=Object.defineProperty,so=(e,t,i,a)=>{for(var s,r=void 0,o=e.length-1;o>=0;o--)(s=e[o])&&(r=s(t,i,r)||r);return r&&ao(t,i,r),r};const ro={success:{text:"var(--c-success)",dot:"var(--c-success)",glow:"rgba(74,222,128,0.5)"},warning:{text:"var(--c-warning)",dot:"var(--c-warning)",glow:"rgba(251,191,36,0.5)"},info:{text:"var(--c-info)",dot:"var(--c-info)",glow:"rgba(96,165,250,0.5)"},accent:{text:"var(--c-accent)",dot:"var(--c-accent)",glow:"rgba(129,140,248,0.5)"},alert:{text:"var(--c-alert)",dot:"var(--c-alert)",glow:"rgba(248,113,113,0.5)"},neutral:{text:"var(--t3)",dot:"var(--t4)",glow:"none"}},oo={input_select:"title_card.group_mode",scenes:"title_card.group_scenes",booleans:"title_card.group_toggles"};function no(e){if(ro[e])return ro[e];if(e.startsWith("#")&&7===e.length){const t=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16);return{text:e,dot:e,glow:`rgba(${t},${i},${a},0.5)`}}return ro.neutral}const co={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},lo={icon:"mdi:clock-outline",color:"var(--t3)"};class ho extends ui{constructor(){super(...arguments),this._foldOpen=!1,this._activatingSceneId=null,this._titleConfig={title:"",sources:[],period_entity:"",period_options:[]},this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._sceneTimeout=0,this._boundClickOutside=this._onClickOutside.bind(this)}static getConfigElement(){return document.createElement("glass-title-card-editor")}getCardSize(){return 2}get _periodEntityId(){return this._titleConfig.period_entity||"input_select.periode_journee"}_getPeriodVisual(e){const t=co[e]||lo,i=this._titleConfig.period_options.find(t=>t.id===e);if(!i)return t;const a=i.color?.startsWith("#");return{icon:i.icon||t.icon,color:a?i.color:t.color}}static{this.styles=[Dt,Pt,At,r`
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
  `]}connectedCallback(){super.connectedCallback(),this._listen("title-config-changed",()=>this._loadConfig()),document.addEventListener("click",this._boundClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundClickOutside),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++,this._sceneTimeout&&(clearTimeout(this._sceneTimeout),this._sceneTimeout=0)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++),this._configLoaded||this._configLoading||(this._configLoading=!0,this._backend=new yi(this.hass),this._loadConfig()))}getTrackedEntityIds(){const e=[this._periodEntityId];for(const t of this._titleConfig.sources)if("input_select"===t.source_type&&t.entity)e.push(t.entity);else for(const i of t.modes)i.id.includes(".")&&e.push(i.id);return e}async _loadConfig(){if(!this._backend)return;const e=this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.title_card&&(this._titleConfig=t.title_card),this._configLoaded=!0,this._configLoading=!1,this.requestUpdate()}catch{e===this._loadVersion&&(this._configLoading=!1)}}_dashStyle(e){if(0===e.length)return"";const t=e.map(e=>no(e)),i="width:"+Math.min(20+4*e.length,36)+"px";if(1===t.length)return`background:${t[0].dot};box-shadow:0 0 8px ${t[0].glow};${i}`;const a=t.length,s=t.flatMap((e,t)=>[`${e.dot} ${Math.round(t/a*100)}%`,`${e.dot} ${Math.round((t+1)/a*100)}%`]).join(", "),r=t.filter(e=>"none"!==e.glow);return`background:linear-gradient(90deg, ${s});box-shadow:${r.length>0?r.map(e=>`0 0 6px ${e.glow}`).join(", "):"none"};${i}`}_getActiveColors(e){if("input_select"===e.source_type){if(!e.entity||!this.hass)return[];const t=this.hass.states[e.entity];if(!t)return[];const i=e.modes.find(e=>e.id===t.state),a=i?.color||"neutral";return"neutral"!==a?[a]:[]}if("booleans"===e.source_type){if(!this.hass)return[];const t=[];for(const i of e.modes)if("on"===this.hass.states[i.id]?.state){const e=i.color||"success";"neutral"!==e&&t.push(e)}return t}if(this._activatingSceneId){const t=e.modes.find(e=>e.id===this._activatingSceneId);if(t)return[t.color||"accent"]}return[]}_isChipActive(e,t,i){return"input_select"===e.source_type?!(!e.entity||!this.hass)&&this.hass.states[e.entity]?.state===t.id:"booleans"===e.source_type?"on"===this.hass?.states[t.id]?.state:"scenes"===e.source_type&&this._activatingSceneId===t.id}_pulseChip(e){this.updateComplete.then(()=>{const t=this.shadowRoot?.querySelector(`glass-chip[data-id="${e}"]`);t&&(t.classList.add("pulsing"),setTimeout(()=>t.classList.remove("pulsing"),600))})}_selectOption(e,t){e.entity&&this.hass&&(this._safeCallService("input_select","select_option",{option:t},{entity_id:e.entity}),this._pulseChip(t))}_activateScene(e){this.hass&&(mi(this,"light"),this._safeCallService("scene","turn_on",{},{entity_id:e}),this._activatingSceneId=e,this._sceneTimeout&&clearTimeout(this._sceneTimeout),this._sceneTimeout=window.setTimeout(()=>{this._activatingSceneId=null,this._sceneTimeout=0},2e3),this._pulseChip(e))}_toggleBoolean(e){this.hass&&(this._safeCallService("input_boolean","toggle",{},{entity_id:e}),this._pulseChip(e))}_toggleFold(){this._foldOpen=!this._foldOpen}_onClickOutside(e){if(!this._foldOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelector(".dash-trigger"),s=i.querySelector(".fold-section");a&&s&&!t.includes(a)&&!t.includes(s)&&(this._foldOpen=!1)}render(){this._lang;const e=this._titleConfig.title||(this.configPreview?oi("config.title_title_placeholder"):"");if(!e)return this.style.display="none",W;this.style.display="";const t=this._titleConfig.sources,i=t.length>0&&t.some(e=>e.modes.length>0),a=[];if(i)for(const r of t)a.push(...this._getActiveColors(r));const s=a.length>0?this._dashStyle(a):"";return V`
      <div class="title-card">
        <div class="title-text">${e}</div>
        ${this._renderPeriodIndicator()}
        ${i?V`
          <button
            class="dash-trigger"
            @click=${()=>this._toggleFold()}
            aria-label=${oi("title_card.toggle_modes_aria")}
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
        `:W}
      </div>
    `}_renderPeriodIndicator(){if(!this.hass)return W;const e=this.hass.states[this._periodEntityId];if(!e)return W;const t=e.attributes?.options??[];if(0===t.length)return W;const i=e.state,a=t.indexOf(i);if(-1===a)return V`<div class="period-indicator"></div>`;const s=no(this._getPeriodVisual(i).color);return V`
      <div class="period-indicator" aria-live="polite" aria-label="${i}">
        ${t.map((e,t)=>{const i=t===a,r=this._getPeriodVisual(e);return V`
            <div class="period-item ${i?"active":""}"
              style="${i?`color:${s.text}`:""}">
              <ha-icon .icon=${r.icon} style="--mdc-icon-size:9px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${e}
            </div>
          `})}
      </div>
    `}_renderSourceGroup(e,t,i){if(0===e.modes.length)return W;const a=oo[e.source_type],s=e.label||(a?oi(a):e.source_type);return V`
      <div class="chips-group">
        ${i?V`<div class="chips-group-label">${s}</div>`:W}
        <div class="chips-row">
          ${e.modes.map((t,i)=>{const a=this._isChipActive(e,t,i),s=function(e){if(e in ro&&"neutral"!==e)return e;if(e.startsWith("#")&&7===e.length)return`${parseInt(e.slice(1,3),16)},${parseInt(e.slice(3,5),16)},${parseInt(e.slice(5,7),16)}`;return"accent"}(t.color||"accent");return V`
              <glass-chip
                size="sm"
                data-id=${t.id}
                ?active=${a}
                active-color=${s}
                .icon=${t.icon||""}
                aria-label=${t.label||t.id}
                @click=${a=>{a.stopPropagation(),this._onChipClick(e,t,i)}}
              >${t.label||t.id.split(".")[1]||t.id}</glass-chip>
            `})}
        </div>
      </div>
    `}_onChipClick(e,t,i){"input_select"===e.source_type?this._selectOption(e,t.id):"scenes"===e.source_type?this._activateScene(t.id):"booleans"===e.source_type&&this._toggleBoolean(t.id)}}so([ge()],ho.prototype,"_foldOpen"),so([ge()],ho.prototype,"_activatingSceneId");try{customElements.define("glass-title-card",ho)}catch{}}();
