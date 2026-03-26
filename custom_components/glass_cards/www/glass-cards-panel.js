!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let r=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(a,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,_=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,f=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},b=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=a?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),r=e.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=a;const s=r.fromAttribute(t,e.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const s=this.constructor;if(!1===a&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??b)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,m?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=e=>e,$=x.trustedTypes,S=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+I,D=`<${E}>`,z=document,P=()=>z.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,A="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,R=/>/g,j=RegExp(`>|${A}(?:([^\\s"'>=/]+)(${A}*=${A}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,F=/"/g,q=/^(?:script|style|textarea|title)$/i,V=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),N=V(1),U=V(2),W=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),K=new WeakMap,Y=z.createTreeWalker(z,129);function G(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class X{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,s=0;const o=e.length-1,n=this.parts,[c,l]=((e,t)=>{const i=e.length-1,a=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=M;for(let n=0;n<i;n++){const t=e[n];let i,c,l=-1,d=0;for(;d<t.length&&(o.lastIndex=d,c=o.exec(t),null!==c);)d=o.lastIndex,o===M?"!--"===c[1]?o=O:void 0!==c[1]?o=R:void 0!==c[2]?(q.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=j):void 0!==c[3]&&(o=j):o===j?">"===c[0]?(o=r??M,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,i=c[1],o=void 0===c[3]?j:'"'===c[3]?F:H):o===F||o===H?o=j:o===O||o===R?o=M:(o=j,r=void 0);const h=o===j&&e[n+1].startsWith("/>")?" ":"";s+=o===M?t+D:l>=0?(a.push(i),t.slice(0,l)+C+t.slice(l)+I+h):t+I+(-2===l?n:h)}return[G(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=X.createElement(c,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=Y.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(C)){const t=l[s++],i=a.getAttribute(e).split(I),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(I)&&(n.push({type:6,index:r}),a.removeAttribute(e));if(q.test(a.tagName)){const e=a.textContent.split(I),t=e.length-1;if(t>0){a.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],P()),Y.nextNode(),n.push({type:2,index:++r});a.append(e[t],P())}}}else if(8===a.nodeType)if(a.data===E)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(I,e+1));)n.push({type:7,index:r}),e+=I.length-1}r++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,a){if(t===W)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const s=T(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=Q(e,r._$AS(e,t.values),r,a)),t}let J=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??z).importNode(t,!0);Y.currentNode=a;let r=Y.nextNode(),s=0,o=0,n=i[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new Z(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new re(r,this,e)),this._$AV.push(t),n=i[++o]}s!==n?.index&&(r=Y.nextNode(),s++)}return Y.currentNode=z,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),T(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new J(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new X(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new Z(this.O(P()),this.O(P()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(e,t=this,i,a){const r=this.strings;let s=!1;if(void 0===r)e=Q(this,e,t,0),s=!T(e)||e!==this._$AH&&e!==W,s&&(this._$AH=e);else{const a=e;let o,n;for(e=r[0],o=0;o<r.length-1;o++)n=Q(this,a[i+o],t,o),n===W&&(n=this._$AH[o]),s||=!T(n)||n!==this._$AH[o],n===B?e=B:e!==B&&(e+=(n??"")+r[o+1]),this._$AH[o]=n}s&&!a&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class ae extends ee{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??B)===W)return;const i=this._$AH,a=e===B&&i!==B||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==B&&(i===B||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const se=x.litHtmlPolyfillSupport;se?.(X,Z),(x.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class ne extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new Z(t.insertBefore(P(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ne._$litElement$=!0,ne.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ne});const ce=oe.litElementPolyfillSupport;ce?.({LitElement:ne}),(oe.litElementVersions??=[]).push("4.2.2");const le=[s`
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
      .mt-md { margin-top: 1.25rem; }
      .mt-lg { margin-top: 1.75rem; }

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
        background: rgba(var(--rgb-accent), 0.06);
        box-shadow: inset 0 -2px 0 var(--c-accent);
      }
      .item-row .feature-icon ha-icon { --mdc-icon-size: 1rem; }

      .card-row {
        padding: 0.75rem;
      }

      /* ── Drag handle ── */
      .drag-handle {
        width: 1.25rem;
        height: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
        color: var(--t4);
        flex-shrink: 0;
        border-radius: 4px;
        transition: color var(--t-fast);
        position: relative;
      }
      .drag-handle::before {
        content: '';
        position: absolute;
        inset: -0.75rem;
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
        --mdc-icon-size: 0.875rem;
        display: flex; align-items: center; justify-content: center;
      }

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

      /* ── Card icon box ── */
      .card-icon-box {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .card-icon-box ha-icon {
        --mdc-icon-size: 1.125rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
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
      .entity-name-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background: var(--s1);
        border: 1px solid var(--b1);
        border-radius: var(--radius-sm);
        padding: 0.375rem 0.5rem;
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t1);
        cursor: pointer;
        outline: none;
        transition: background var(--t-fast), border-color var(--t-fast);
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -webkit-tap-highlight-color: transparent;
      }
      .entity-name-btn:focus-visible {
        outline: 2px solid rgba(var(--rgb-white), 0.25);
        outline-offset: 2px;
      }
      @media (hover: hover) and (pointer: fine) {
        .entity-name-btn:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
        .entity-name-btn:hover ha-icon { color: var(--t2) !important; }
      }
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

      /* ── Card count badge ── */
      .card-count {
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t3);
        padding: 0.125rem 0.5rem;
        border-radius: var(--radius-full);
        background: var(--s1);
        border: 1px solid var(--b1);
        flex-shrink: 0;
      }

      /* ── Toggle ── */
      .toggle {
        position: relative;
        width: 2.75rem;
        height: 1.5rem;
        border-radius: var(--radius-md);
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
        top: 0.1875rem;
        left: 0.1875rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: var(--t3);
        transition:
          transform var(--t-fast),
          background var(--t-fast),
          box-shadow var(--t-fast);
      }
      .toggle.on {
        background: rgba(var(--rgb-success), 0.2);
        border-color: rgba(var(--rgb-success), 0.3);
      }
      .toggle.on::after {
        transform: translateX(1.25rem);
        background: var(--c-success);
        box-shadow: 0 0 8px rgba(var(--rgb-success), 0.4);
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
        width: 2.5rem; height: 2.5rem;
        border-radius: var(--radius-lg);
        border: none; background: transparent;
        color: var(--t3); cursor: pointer;
        padding: 0; outline: none; flex-shrink: 0;
        transition: background var(--t-fast), color var(--t-fast);
        -webkit-tap-highlight-color: transparent;
        position: relative;
      }
      .btn-icon.sm { width: 2rem; height: 2rem; border-radius: var(--radius-md); }
      .btn-icon.xs { width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm); }
      .btn-icon ha-icon { display: flex; align-items: center; justify-content: center; }
      .btn-icon.xs ha-icon { --mdc-icon-size: 0.875rem; }
      .btn-icon.sm ha-icon { --mdc-icon-size: 1rem; }
      .btn-icon.sm::before {
        content: '';
        position: absolute;
        inset: -0.375rem;
      }
      .btn-icon.xs::before {
        content: '';
        position: absolute;
        inset: -0.5rem;
      }
      @media (hover: hover) and (pointer: fine) { .btn-icon:hover { background: var(--s2); color: var(--t2); } }
      @media (pointer: coarse) { .btn-icon:active { animation: bounce 0.3s ease; } }
      .btn-icon:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

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
        padding: 0.375rem 0.5rem 0.5rem;
      }

      /* ── Threshold inputs ── */
      .threshold-list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        margin-bottom: 1rem;
      }
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.5rem;
      }
      .threshold-icon {
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
      .threshold-icon ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t2);
        display: flex; align-items: center; justify-content: center;
      }
      .threshold-icon.hot ha-icon { color: var(--c-temp-hot); }
      .threshold-icon.cold ha-icon { color: var(--c-temp-cold); }
      .threshold-icon.humidity ha-icon { color: var(--c-info); }
      .threshold-label {
        flex: 1;
        min-width: 0;
        font-size: var(--fz-base);
        font-weight: 600;
        color: var(--t2);
      }
      .threshold-input {
        width: 3.5rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t1);
        font-family: inherit;
        font-size: var(--fz-base);
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
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t4);
        width: 1rem;
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
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
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
        height: 2.25rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-lg);
        font-size: var(--fz-base);
      }
      .btn-sm {
        height: 1.75rem;
        padding: 0 0.5rem;
        font-size: var(--fz-base);
        border-radius: var(--radius-md);
      }
      @media (hover: hover) and (pointer: fine) {
        .btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (pointer: coarse) {
        .btn:active { animation: bounce 0.3s ease; }
      }
      .btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .btn-accent {
        border-color: rgba(var(--rgb-accent), 0.25);
        background: rgba(var(--rgb-accent), 0.12);
        color: var(--c-accent);
      }
      @media (hover: hover) and (pointer: fine) {
        .btn-accent:hover {
          background: rgba(var(--rgb-accent), 0.2);
          border-color: rgba(var(--rgb-accent), 0.35);
        }
      }
      @media (pointer: coarse) {
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
      @media (pointer: coarse) {
        .btn-ghost:active { animation: bounce 0.3s ease; }
      }

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

      /* ── Fan preview spin ── */
      @keyframes spin-fan-preview {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
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
        min-width: 1.75rem; text-align: center;
      }

      /* ── Dot (status indicator) ── */
      .dot {
        width: 0.375rem; height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      /* ── Utility spacing ── */
      .mt-12 { margin-top: 0.75rem; }
      .mb-8 { margin-bottom: 0.5rem; }

      /* ── Entity rename ── */
      .entity-rename-row {
        display: flex; align-items: center; gap: 0.375rem;
      }
      .entity-rename-row .input {
        flex: 1; min-width: 0;
        padding: 0.375rem 0.5rem;
        font-size: var(--fz-base);
      }
      .entity-rename-row .btn-icon {
        width: 1.75rem; height: 1.75rem;
        border-radius: var(--radius-sm);
      }
      .entity-rename-row .btn-icon ha-icon {
        --mdc-icon-size: 0.875rem;
      }

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

      /* ── Room grid ── */
      .room-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
        gap: 0.5rem;
      }
      .room-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 0.5rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        font-family: inherit;
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .room-card ha-icon {
        --mdc-icon-size: 1.5rem;
        color: var(--t3);
        transition: color var(--t-fast);
      }
      .room-card-icon {
        width: 36px; height: 36px;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .room-card-icon ha-icon {
        --mdc-icon-size: 20px;
        --mdc-icon-color: var(--icon-color, var(--t3));
        color: var(--icon-color, var(--t3));
      }
      .room-card .room-name {
        text-align: center;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-card:hover {
          background: var(--s3);
          border-color: var(--b2);
          color: var(--t1);
        }
      }
      .room-card:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .room-card.disabled {
        opacity: 0.35;
        cursor: default;
        pointer-events: none;
        color: var(--t4);
      }
      .badge-soon {
        font-size: 0.5rem;
        font-weight: 700;
        font-family: inherit;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t4);
        background: var(--s2);
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
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
        .room-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .room-card {
          padding: 0.75rem 0.5rem;
          gap: 0.375rem;
        }
        .room-card ha-icon { --mdc-icon-size: 1.375rem; }
        .room-card .room-name { font-size: var(--fz-xs); }
      }
      @media (min-width: 1024px) {
        .room-grid {
          grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
          gap: 0.75rem;
        }
      }
      @media (min-width: 1440px) {
        .room-grid {
          grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
          gap: 1rem;
        }
      }

      /* ═══════════════════════════════════════════════
         Room detail sections (ex room-detail.ts)
         ═══════════════════════════════════════════════ */

      .room-sections {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
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
        background: rgba(129, 140, 248, 0.1);
        border-color: rgba(129, 140, 248, 0.2);
        color: var(--c-accent);
      }
      .scene-chip.on ha-icon {
        --mdc-icon-color: var(--c-accent);
        color: var(--c-accent);
      }
      .scene-chip.dragging { opacity: 0.3; }
      .scene-chip.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.2);
      }
      @media (hover: hover) and (pointer: fine) {
        .scene-chip:hover {
          background: var(--s2);
          border-color: var(--b2);
          color: var(--t2);
        }
        .scene-chip.on:hover {
          background: rgba(129, 140, 248, 0.15);
        }
      }

      .section-header-wrap {
        display: flex;
        align-items: center;
        gap: 0;
      }
      .section-header-wrap .drag-handle {
        flex-shrink: 0;
        cursor: grab;
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        padding: 0.5rem 0;
      }
      .section-header-wrap .drag-handle ha-icon {
        --mdc-icon-size: 1rem;
        --mdc-icon-color: var(--t4);
      }
      @media (hover: hover) and (pointer: fine) {
        .section-header-wrap .drag-handle:hover {
          color: var(--t2);
          background: var(--s2);
          border-radius: var(--radius-xs);
        }
      }
      .section-header-wrap.off { opacity: 0.35; }
      .section-header-wrap.off .section-header { pointer-events: none; }
      .dragging > .section-header-wrap { opacity: 0.25; }
      .drop-target > .section-header-wrap {
        background: rgba(129, 140, 248, 0.06);
        border-radius: var(--radius-sm);
      }

      /* Chevron in header-wrap */
      .section-header-wrap > .section-chevron {
        --mdc-icon-size: 1.125rem;
        --mdc-icon-color: var(--t4);
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform var(--t-med), color var(--t-fast);
        cursor: pointer;
        flex-shrink: 0;
        padding: 0.5rem 0.25rem;
      }
      .section-header-wrap > .section-chevron.open {
        transform: rotate(180deg);
        color: var(--t2);
        --mdc-icon-color: var(--t2);
      }

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
      .section-header-icon {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .section-header-icon ha-icon {
        --mdc-icon-size: 0.9375rem;
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
      .section-header .section-chevron {
        --mdc-icon-size: 1rem;
        transition: transform var(--t-med), color var(--t-fast);
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .section-header .section-chevron.open {
        transform: rotate(180deg);
        color: var(--t2);
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

      /* ── Dashboard card grid ── */
      .dash-card { position: relative; cursor: grab; user-select: none; -webkit-user-select: none; }
      .dash-card.off { opacity: 0.5; border-style: dashed; }
      .dash-card.off .room-card-icon { border-style: dashed; }
      .dash-card.dragging { opacity: 0.25; transform: scale(0.95); }
      .dash-card.drop-target { border-color: var(--c-accent); background: rgba(129, 140, 248, 0.06); }

      .dash-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.375rem 0.25rem 0;
        margin-top: 0.25rem;
        border-top: 1px solid var(--b1);
      }
      .dash-toggle-label {
        font-size: 7px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--t4);
      }
      .dash-toggle {
        position: relative;
        width: 32px; height: 18px; border-radius: 9px;
        background: var(--s2); border: 1px solid var(--b2);
        cursor: pointer; transition: background 0.2s var(--ease-std), border-color 0.2s var(--ease-std);
        padding: 0; outline: none; flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .dash-toggle::before {
        content: '';
        position: absolute;
        inset: -0.75rem -0.375rem;
      }
      .dash-toggle::after {
        content: ''; position: absolute; top: 2px; left: 2px;
        width: 12px; height: 12px; border-radius: 50%;
        background: var(--t4); transition: transform 0.2s var(--ease-std), background 0.2s var(--ease-std), box-shadow 0.2s var(--ease-std);
      }
      .dash-toggle.on { background: rgba(74, 222, 128, 0.2); border-color: rgba(74, 222, 128, 0.3); }
      .dash-toggle.on::after { transform: translateX(14px); background: var(--c-success); box-shadow: 0 0 6px rgba(74, 222, 128, 0.4); }

      .dash-order {
        position: absolute; top: 6px; left: 6px;
        width: 16px; height: 16px; border-radius: 50%;
        background: var(--s3); border: 1px solid var(--b1);
        font-size: 8px; font-weight: 700; color: var(--t3);
        display: flex; align-items: center; justify-content: center; z-index: 2;
      }

      .dash-drag-hint {
        position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
        color: var(--t4); opacity: 0; transition: opacity 0.2s var(--ease-std); pointer-events: none;
      }
      .dash-drag-hint ha-icon {
        --mdc-icon-size: 0.75rem;
        --mdc-icon-color: var(--t4);
      }
      .dash-card:hover .dash-drag-hint { opacity: 0.6; }
`,s`
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
`,s`
      /* ── Dropdown ── */
      .dropdown {
        position: relative;
        width: 100%;
        margin-bottom: 1rem;
      }
      .dropdown-trigger {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-base);
        font-weight: 600;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .dropdown-trigger:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      @media (pointer: coarse) {
        .dropdown-trigger:active { animation: bounce 0.3s ease; }
      }
      .dropdown-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .dropdown-trigger ha-icon {
        --mdc-icon-size: 1rem;
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
        top: calc(100% + 0.375rem);
        left: 0;
        right: 0;
        z-index: 20;
        min-width: 10rem;
        max-height: 12.5rem;
        overflow-y: auto;
        border-radius: var(--radius-lg);
        padding: 0.25rem;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(var(--rgb-black), 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: opacity var(--t-fast), transform var(--t-fast);
        scrollbar-width: none;
      }
      .dropdown-menu::-webkit-scrollbar { display: none; }
      .dropdown-search {
        width: calc(100% - 0.5rem); margin: 0.25rem; padding: 0.4375rem 0.625rem;
        border-radius: var(--radius-sm); border: 1px solid var(--b1);
        background: var(--s1); color: var(--t1);
        font-family: inherit; font-size: var(--fz-base); outline: none;
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
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t2);
        cursor: pointer;
        transition: background var(--t-fast), color var(--t-fast);
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
      @media (pointer: coarse) {
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
        --mdc-icon-size: 1rem;
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

      /* ── Chip (UI kit) ── */
      .chip {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding: 0.25rem 0.75rem; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: var(--t3); cursor: pointer; transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        outline: none; -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .chip:hover { background: var(--s3); color: var(--t2); border-color: var(--b3); }
      }
      .chip:focus-visible { outline: 2px solid rgba(var(--rgb-white),0.25); outline-offset: 2px; }
      .chip.active { background: var(--s4); border-color: var(--b3); color: var(--t1); }
      .chip ha-icon {
        --mdc-icon-size: 0.875rem;
        display: flex; align-items: center; justify-content: center;
      }
      @media (pointer: coarse) {
        .chip:active { transform: scale(0.94); }
      }

      /* ── Title config styles ── */
      .title-section-gap {
        height: 0.75rem;
      }
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
      .title-mode-header .drag-handle {
        cursor: grab; opacity: 0.4; display: flex; align-items: center;
        --mdc-icon-size: 1rem;
      }
      .title-mode-header .drag-handle:hover { opacity: 0.7; }
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

      /* ── Icon picker popup (glass) ── */
      .icon-popup-overlay {
        position: absolute; inset: 0; z-index: 10000;
        background: rgba(var(--rgb-black), 0.5);
        display: flex; align-items: center; justify-content: center;
        padding: 1.5rem;
        animation: fade-in 0.15s ease-out;
      }
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      .icon-popup {
        width: 100%; max-width: 25rem; max-height: 70vh;
        display: flex; flex-direction: column;
        border-radius: var(--radius-xl);
        background: linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%);
        box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 8px 32px rgba(var(--rgb-black),0.4), 0 2px 8px rgba(var(--rgb-black),0.25);
        border: 1px solid var(--b2);
        overflow: hidden;
        animation: popup-in 0.2s var(--ease-out);
      }
      @keyframes popup-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      .icon-popup-header {
        padding: 0.75rem 1rem 0.5rem;
        display: flex; flex-direction: column; gap: 0.5rem;
        border-bottom: 0.0625rem solid var(--b1);
      }
      .icon-popup-title {
        font-size: var(--fz-base); font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .icon-popup-search {
        width: 100%; padding: 0.5rem 0.75rem; border-radius: var(--radius-lg);
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: var(--fz-md);
        outline: none; transition: border-color var(--t-fast);
        box-sizing: border-box;
      }
      .icon-popup-search:focus { border-color: var(--b3); }
      .icon-popup-search::placeholder { color: var(--t4); }
      .icon-popup-grid-wrap {
        flex: 1; overflow-y: auto; padding: 0.5rem;
        scrollbar-width: none;
      }
      .icon-popup-grid-wrap::-webkit-scrollbar { display: none; }
      .icon-popup-grid {
        display: grid; grid-template-columns: repeat(6, 1fr);
        gap: 0.25rem;
      }
      .icon-popup-grid .icon-pick {
        aspect-ratio: 1; width: 100%;
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-grid .icon-pick ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .icon-popup-empty {
        padding: 1.5rem; text-align: center;
        font-size: var(--fz-base); color: var(--t4);
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
      .presence-mapping-card .presence-mapping-field .dropdown {
        margin-bottom: 0;
      }
      .presence-mapping-card .presence-mapping-field .dropdown-trigger {
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
      .schedule-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--t4);
        cursor: pointer;
        flex-shrink: 0;
        padding: 0;
        transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        --mdc-icon-size: 1rem;
      }
      .schedule-btn.active {
        color: var(--c-accent);
        border-color: rgba(var(--rgb-accent),0.25);
        background: rgba(var(--rgb-accent),0.12);
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-btn:active { transform: scale(0.96); }
      }
      @media (pointer: coarse) {
        .schedule-btn:active { animation: bounce 0.3s ease; }
      }
      .schedule-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

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

      /* ── Schedule delete (btn-icon.xs btn-alert from kit) ── */
      .schedule-delete {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(var(--rgb-alert),0.2);
        background: rgba(var(--rgb-alert),0.1);
        color: var(--c-alert);
        cursor: pointer;
        padding: 0;
        --mdc-icon-size: 0.875rem;
        transition: background var(--t-fast), border-color var(--t-fast);
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-delete:hover {
          background: rgba(var(--rgb-alert),0.2);
          border-color: rgba(var(--rgb-alert),0.3);
        }
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-delete:active { transform: scale(0.96); }
      }
      @media (pointer: coarse) {
        .schedule-delete:active { animation: bounce 0.3s ease; }
      }

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
      .schedule-hint,
      .dashboard-vs-room {
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
      .schedule-hint ha-icon,
      .dashboard-vs-room ha-icon {
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
      .presets-btn {
        width: 26px;
        height: 26px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background var(--t-fast), border-color var(--t-fast);
        outline: none;
        flex-shrink: 0;
        padding: 0;
        --mdc-icon-size: 14px;
        position: relative;
      }
      .presets-btn::before {
        content: '';
        position: absolute;
        inset: -0.5rem;
      }
      .presets-btn ha-icon { display: flex; align-items: center; justify-content: center; color: var(--t3); }
      @media (hover: hover) and (pointer: fine) {
        .presets-btn:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      .presets-btn.active {
        background: rgba(167, 139, 250, 0.08);
        border-color: rgba(167, 139, 250, 0.2);
      }
      .presets-btn.active ha-icon { color: var(--c-purple, #a78bfa); }
      @media (pointer: coarse) {
        .presets-btn:active { animation: bounce 0.3s ease; }
      }
      .presets-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }

      /* ── Unassigned / Orphan entities ── */
      .pw-ua-icon-btn {
        flex-shrink: 0;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background var(--t-fast), border-color var(--t-fast);
      }
      .pw-ua-icon-btn:hover { background: var(--s3); border-color: var(--b3); }
      .pw-ua-icon-btn ha-icon { --mdc-icon-size: 14px; color: var(--t3); }

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
        opacity: 0.5;
      }
      .pw-ua-area-trigger.pw-ua-unassigned {
        color: var(--c-warning);
        border-color: rgba(var(--rgb-warning), 0.2);
      }
      .pw-ua-area-trigger.pw-ua-unassigned .pw-ua-area-icon {
        color: var(--c-warning);
        opacity: 0.7;
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
`],de={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},he=(e=de,t,i)=>{const{kind:a,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return pe({...e,state:!0,attribute:!1})}const ge="__glassEventBus",_e=window,me=_e[ge]??(_e[ge]=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}}),fe=280,ve=360,be=480,ye=600;s`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`,s`
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
`;var we=Object.defineProperty,xe=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&we(t,i,s),s};class ke extends ne{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.color="var(--rgb-accent)",this.label="",this.disabled=!1,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[s`
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
    `]}_displayPct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_snap(e){if(this.step<=0)return e;const t=Math.round(e/this.step)*this.step,i=(this.step.toString().split(".")[1]||"").length;return parseFloat(t.toFixed(i))}_pctToValue(e){const t=this.max-this.min,i=this.min+e/100*t;return Math.max(this.min,Math.min(this.max,this._snap(i)))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max")||e.has("color"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._displayPct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.transform=`translate(calc(${e}cqw - 50%), -50%)`)}_onPointerDown(e){if(this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,this._ac=new AbortController;const{signal:i}=this._ac,a=this.renderRoot.querySelector(".fill"),r=this.renderRoot.querySelector(".thumb"),s=(e,i)=>{const s=t.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100)),n=this._pctToValue(o);this._dragValue=n;const c=this._displayPct(n);a.style.transform=`scaleX(${c/100})`,r.style.transform=`translate(calc(${c}cqw - 50%), -50%)`;const l=i?"glass-slider-change":"glass-slider-input";this.dispatchEvent(new CustomEvent(l,{detail:{value:n},bubbles:!0,composed:!0}))};s(e,!1);const o=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}this._dragging=!1};t.addEventListener("pointermove",e=>s(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{s(e,!0),o()},{signal:i}),t.addEventListener("pointercancel",()=>o(),{signal:i}),t.addEventListener("lostpointercapture",()=>o(),{signal:i})}_onKeyDown(e){if(this.disabled)return;const t=this.step>0?this.step:1;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this._snap(this.value+t));break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this._snap(this.value-t));break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this._dragValue=i,this._applyVisuals(),this.dispatchEvent(new CustomEvent("glass-slider-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return N`
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
        ${this.label?N`<span class="label">${this.label}</span>`:""}
      </div>
    `}}xe([pe({type:Number})],ke.prototype,"value"),xe([pe({type:Number})],ke.prototype,"min"),xe([pe({type:Number})],ke.prototype,"max"),xe([pe({type:Number})],ke.prototype,"step"),xe([pe({type:String})],ke.prototype,"color"),xe([pe({type:String})],ke.prototype,"label"),xe([pe({type:Boolean,reflect:!0})],ke.prototype,"disabled");try{customElements.define("glass-slider",ke)}catch{}const $e=s`
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
`,Se=s`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`,Ce=s`
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
`,Ie=s`
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
`,Ee=18;function De(e,t=18,i="8s"){return!e||e.length<=t?e||"":N`<span class="marquee" style="--marquee-duration:${i}"><span class="marquee-inner" data-text="${e}">${e}</span></span>`}const ze=s`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`,Pe=s`
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
`,Te=s`
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
`;function Le(e,t){const i=t,a=i*(1-Math.abs(e/60%2-1));let r=0,s=0,o=0;e<60?(r=i,s=a):e<120?(r=a,s=i):e<180?(s=i,o=a):e<240?(s=a,o=i):e<300?(r=a,o=i):(r=i,o=a);const n=1-i;return[Math.round(255*(r+n)),Math.round(255*(s+n)),Math.round(255*(o+n))]}function Ae(e){const t=e[0]/255,i=e[1]/255,a=e[2]/255,r=Math.max(t,i,a),s=r-Math.min(t,i,a);let o=0;0!==s&&(o=r===t?((i-a)/s+6)%6*60:r===i?60*((a-t)/s+2):60*((t-i)/s+4));return{h:o,s:0===r?0:s/r}}function Me(e){return"#"+e.map(e=>e.toString(16).padStart(2,"0")).join("")}const Oe=s`
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
`;function Re(e){return!e||"unavailable"===e||"unknown"===e}const je={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer",collapse:"Réduire",expand:"Développer",move_up:"Déplacer vers le haut",move_down:"Déplacer vers le bas",none:"Aucun",rooms:"Pièces",enabled:"Activé",disabled:"Désactivé"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSO",compass_SW:"SO",compass_WSW:"OSO",compass_W:"O",compass_WNW:"ONO",compass_NW:"NO",compass_NNW:"NNO"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store d'ombrage",dc_window:"Fenêtre",dc_damper:"Clapet"},climate:{title:"Thermostat",target:"Consigne",current:"Actuelle",range_low:"Min",range_high:"Max",humidity_target:"Humidité cible",aux_heat:"Chauffage auxiliaire",unavailable:"Indisponible",mode_heat:"Chauffage",mode_cool:"Climatisation",mode_heat_cool:"Auto chaud/froid",mode_auto:"Automatique",mode_dry:"Déshumidification",mode_fan_only:"Ventilation",mode_off:"Éteint",preset_eco:"Éco",preset_comfort:"Confort",preset_boost:"Boost",preset_away:"Absent",preset_sleep:"Nuit",preset_activity:"Activité",preset_none:"Aucun",fan_mode:"Ventilation",swing_mode:"Oscillation",open_all_aria:"Allumer tous les climatiseurs",close_all_aria:"Éteindre tous les climatiseurs",toggle_aria:"Basculer",expand_aria:"Détails",temp_up_aria:"Augmenter température",temp_down_aria:"Diminuer température",humidity_up_aria:"Augmenter humidité",humidity_down_aria:"Diminuer humidité",range_low_aria:"Température minimale",range_high_aria:"Température maximale",no_climates:"Aucun climatiseur",turn_on_aria:"Allumer",turn_off_aria:"Éteindre",action_heating:"Chauffe",action_cooling:"Refroidit",action_idle:"En attente",action_off:"Éteint",action_drying:"Déshumidifie",current_label:"Actuel",controls_aria:"Contrôles",unknown:"Inconnu",avg_label:"Moy.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce."},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}",clear_search:"Effacer la recherche"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",remove_from_queue:"Retirer de la liste de lecture",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",distance_m:"m",distance_km:"km"},camera:{title:"CAMÉRAS",idle:"Veille",streaming:"En direct",recording:"Enregistrement",off:"Éteinte",unavailable:"Indisponible",no_cameras:"Aucune caméra",prev_aria:"Caméra précédente",next_aria:"Caméra suivante",dot_aria:"Aller à {name}",power_on:"Allumer",power_off:"Éteindre",snapshot:"Capture",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Désactiver détection mouvement",motion_off_aria:"Activer détection mouvement",siren_aria:"Sirène",floodlight_aria:"Projecteur",auto_track_aria:"Suivi automatique",tap_to_stream:"Appuyer pour diffuser",camera_off:"Caméra éteinte",ai_person:"Personne",ai_vehicle:"Véhicule",ai_pet:"Animal",ai_animal:"Animal",ai_package:"Colis",ai_face:"Visage",ai_baby_crying:"Bébé",ai_bicycle:"Vélo",dashboard_title:"CAMÉRAS",dashboard_title_one:"1 CAMÉRA"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Pièces","nav_dashboard":"Dashboard","nav_advanced":"Avancé","tab_navbar":"Barre de nav","tab_popup":"Popup Pièce","tab_light":"Carte Lumières","preview":"Aperçu","behavior":"Comportement","navbar_settings":"Navbar","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","no_rooms":"Aucune pièce configurée","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","room_sensors":"Capteurs","room_sensors_desc":"Entités de température et d\'humidité utilisées dans le popup et la navbar.","room_temp_entity":"Capteur de température","room_temp_entity_desc":"Entité utilisée pour afficher la température de la pièce.","room_humidity_entity":"Capteur d\'humidité","room_humidity_entity_desc":"Entité utilisée pour afficher l\'humidité de la pièce.","room_auto_detect":"Auto-détection","room_no_sensor":"Aucun capteur","room_thresholds":"Seuils d\'alerte","room_thresholds_desc":"Valeurs au-delà desquelles les indicateurs passent en rouge.","room_temp_high":"Température haute","room_temp_low":"Température basse","room_humidity_threshold":"Seuil d\'humidité","room_indicators":"Indicateurs navbar","room_indicators_desc":"Choisir les indicateurs à afficher pour cette pièce dans la navbar","room_show_lights":"Afficher les lumières","room_show_temperature":"Afficher la température","room_show_humidity":"Afficher l\'humidité","hide_room":"Masquer de la navbar","show_room":"Afficher dans la navbar","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","popup_auto_close":"Fermeture automatique","popup_auto_close_desc":"Fermer le popup automatiquement après un délai d\'inactivité.","popup_auto_close_duration":"Délai","popup_auto_close_off":"Désactivé","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_camera":"Caméras","domain_camera_desc":"Caméras de surveillance","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Carte Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_hourly":"Prévisions horaires","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","tab_title":"Carte Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_period_indicator":"Indicateur de période","title_period_info":"Créez un input_select nommé « periode_journee » avec les options : Matin, Après-midi, Soir, Nuit. L\'indicateur s\'affichera automatiquement.","title_period_entity":"Entité période","title_period_entity_desc":"Sélectionnez l\'input_select qui contrôle la période du jour","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Visuels des périodes","title_period_options_desc":"Personnalisez l\'icône et la couleur de chaque période","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Carte Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_dynamic_bg":"Fond dynamique","dashboard_dynamic_bg_desc":"Active le fond d\'écran jour/nuit animé de Glass Cards.","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Carte Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Carte Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Carte Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Carte Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Carte Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Carte Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","tab_climate":"Thermostat","climate_desc":"Configurez les entités climat par pièce","climate_no_entities":"Aucune entité climat dans cette pièce","climate_show_header":"Afficher l\'en-tête","climate_show_header_desc":"Titre et compteur au-dessus de la carte","climate_display_mode":"Mode d\'affichage","climate_display_mode_popup":"Mode d\'affichage popup","climate_display_mode_popup_desc":"Disposition des entités climat dans le popup de la pièce.","climate_display_mode_dashboard":"Mode d\'affichage (dashboard)","climate_display_mode_dashboard_desc":"Disposition des entités climat sur le tableau de bord.","climate_mode_list":"Liste","climate_mode_normal":"Normal","climate_select_room":"Sélectionner une pièce","climate_room_entities":"Entités de la pièce","climate_room_entities_desc":"Ordre et visibilité des entités climat. Glissez pour réordonner.","climate_dashboard_entities":"Entités climat du tableau de bord","climate_dashboard_entities_desc":"Sélectionnez les thermostats à afficher sur le tableau de bord.","dashboard_card_climate":"Thermostat","dashboard_card_climate_desc":"Thermostats et climatiseurs","dashboard_card_fan":"Carte Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Carte Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Carte Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Carte Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Carte Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_compact":"Affichage compact","cover_dashboard_compact_desc":"Affiche les volets en grille compacte 2 colonnes. Désactivé, chaque volet occupe toute la largeur.","cover_dashboard_entities":"Volets du tableau de bord","cover_dashboard_entities_desc":"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_camera_carousel":"Carte Caméras","camera_show_header":"Afficher l\'en-tête","camera_show_header_desc":"Titre et compteur au-dessus de la carte","camera_auto_cycle":"Cycle automatique","camera_auto_cycle_desc":"Passer automatiquement d\'une caméra à l\'autre","camera_cycle_interval":"Intervalle (secondes)","camera_cycle_interval_desc":"Temps entre chaque changement de caméra","camera_entity_order":"Ordre des caméras","camera_entity_order_desc":"Glissez pour réordonner les caméras.","camera_no_cameras":"Aucune caméra détectée.","dashboard_card_camera_carousel":"Carte Caméras","dashboard_card_camera_carousel_desc":"Carrousel de surveillance avec actions rapides","tab_spotify":"Carte Spotify","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Entité lecteur Spotify","spotify_entity_desc":"Sélectionnez l\'entité media_player Spotify à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Sélectionnez les enceintes affichées dans le popup de lecture. Si aucune n\'est sélectionnée, toutes les enceintes sont affichées.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres","tab_unassigned":"Entités orphelines","unassigned_desc":"Assignez ou réassignez vos entités à une pièce pour qu\'elles apparaissent dans les popups correspondants.","unassigned_none":"Toutes les entités sont assignées à une pièce.","unassigned_no_entities":"Aucune entité détectée.","unassigned_select_area":"Non assignée","unassigned_assigned":"Assignée","unassigned_count":"{count} entité(s) sans pièce","unassigned_no_results":"Aucun résultat.","unassigned_rename":"Renommer l\'entité","unassigned_change_icon":"Changer l\'icône"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete",collapse:"Collapse",expand:"Expand",move_up:"Move up",move_down:"Move down",none:"None",rooms:"Rooms",enabled:"Enabled",disabled:"Disabled"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSW",compass_SW:"SW",compass_WSW:"WSW",compass_W:"W",compass_WNW:"WNW",compass_NW:"NW",compass_NNW:"NNW"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},climate:{title:"Climate",target:"Target",current:"Current",range_low:"Low",range_high:"High",humidity_target:"Target humidity",aux_heat:"Auxiliary heat",unavailable:"Unavailable",mode_heat:"Heat",mode_cool:"Cool",mode_heat_cool:"Heat/Cool",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan only",mode_off:"Off",preset_eco:"Eco",preset_comfort:"Comfort",preset_boost:"Boost",preset_away:"Away",preset_sleep:"Sleep",preset_activity:"Activity",preset_none:"None",fan_mode:"Fan mode",swing_mode:"Swing mode",open_all_aria:"Turn on all climate devices",close_all_aria:"Turn off all climate devices",toggle_aria:"Toggle",expand_aria:"Details",temp_up_aria:"Increase temperature",temp_down_aria:"Decrease temperature",humidity_up_aria:"Increase humidity",humidity_down_aria:"Decrease humidity",range_low_aria:"Minimum temperature",range_high_aria:"Maximum temperature",no_climates:"No climate devices",turn_on_aria:"Turn on",turn_off_aria:"Turn off",action_heating:"Heating",action_cooling:"Cooling",action_idle:"Idle",action_off:"Off",action_drying:"Drying",current_label:"Current",controls_aria:"Controls",unknown:"Unknown",avg_label:"Avg.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room."},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}",clear_search:"Clear search"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",remove_from_queue:"Remove from queue",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",distance_m:"m",distance_km:"km"},camera:{title:"CAMERAS",idle:"Idle",streaming:"Streaming",recording:"Recording",off:"Off",unavailable:"Unavailable",no_cameras:"No cameras",prev_aria:"Previous camera",next_aria:"Next camera",dot_aria:"Go to {name}",power_on:"Turn on",power_off:"Turn off",snapshot:"Snapshot",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Disable motion detection",motion_off_aria:"Enable motion detection",siren_aria:"Siren",floodlight_aria:"Floodlight",auto_track_aria:"Auto tracking",tap_to_stream:"Tap to stream",camera_off:"Camera off",ai_person:"Person",ai_vehicle:"Vehicle",ai_pet:"Pet",ai_animal:"Animal",ai_package:"Package",ai_face:"Face",ai_baby_crying:"Baby",ai_bicycle:"Bicycle",dashboard_title:"CAMERAS",dashboard_title_one:"1 CAMERA"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Rooms","nav_dashboard":"Dashboard","nav_advanced":"Advanced","tab_navbar":"Navbar","tab_popup":"Room Popup","tab_light":"Light Card","preview":"Preview","behavior":"Behavior","navbar_settings":"Navbar","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","no_rooms":"No rooms configured","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","room_sensors":"Sensors","room_sensors_desc":"Temperature and humidity entities used in the popup and navbar.","room_temp_entity":"Temperature sensor","room_temp_entity_desc":"Entity used to display the room temperature.","room_humidity_entity":"Humidity sensor","room_humidity_entity_desc":"Entity used to display the room humidity.","room_auto_detect":"Auto-detect","room_no_sensor":"No sensor","room_thresholds":"Alert thresholds","room_thresholds_desc":"Values above which indicators turn red.","room_temp_high":"High temperature","room_temp_low":"Low temperature","room_humidity_threshold":"Humidity threshold","room_indicators":"Navbar indicators","room_indicators_desc":"Choose which indicators to show for this room in the navbar","room_show_lights":"Show lights","room_show_temperature":"Show temperature","room_show_humidity":"Show humidity","hide_room":"Hide from navbar","show_room":"Show in navbar","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","popup_auto_close":"Auto close","popup_auto_close_desc":"Automatically close the popup after an inactivity delay.","popup_auto_close_duration":"Delay","popup_auto_close_off":"Disabled","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_camera":"Cameras","domain_camera_desc":"Security cameras","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather Card","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_hourly":"Hourly forecast","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","tab_title":"Title Card","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_period_indicator":"Period indicator","title_period_info":"Create an input_select named \'periode_journee\' with options: Matin, Après-midi, Soir, Nuit. The indicator will appear automatically.","title_period_entity":"Period entity","title_period_entity_desc":"Select the input_select that controls the time of day period","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Period visuals","title_period_options_desc":"Customize the icon and color for each period","title_add_source":"Add a source","title_remove_source":"Remove source","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title Card","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_dynamic_bg":"Dynamic background","dashboard_dynamic_bg_desc":"Enables the Glass Cards animated day/night background cycle.","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather Card","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Light Card","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Cover Card","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify Card","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media Card","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media Card","dashboard_card_media_desc":"Shows media players with transport controls","tab_climate":"Climate","climate_desc":"Configure climate entities per room","climate_no_entities":"No climate entities in this room","climate_show_header":"Show header","climate_show_header_desc":"Title and counter above the card","climate_display_mode":"Display mode","climate_display_mode_popup":"Popup display mode","climate_display_mode_popup_desc":"Layout for climate entities in the room popup.","climate_display_mode_dashboard":"Display mode (dashboard)","climate_display_mode_dashboard_desc":"Layout for climate entities on the dashboard.","climate_mode_list":"List","climate_mode_normal":"Normal","climate_select_room":"Select a room","climate_room_entities":"Room entities","climate_room_entities_desc":"Order and visibility of climate entities. Drag to reorder.","climate_dashboard_entities":"Dashboard climate entities","climate_dashboard_entities_desc":"Select which climate entities to display on the dashboard.","dashboard_card_climate":"Climate","dashboard_card_climate_desc":"Thermostats and HVAC","dashboard_card_fan":"Fan Card","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence Card","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence Card","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fan Card","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Cover Card","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_compact":"Compact layout","cover_dashboard_compact_desc":"Display covers in a 2-column compact grid. When off, each cover takes the full width.","cover_dashboard_entities":"Dashboard covers","cover_dashboard_entities_desc":"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_camera_carousel":"Camera Card","camera_show_header":"Show header","camera_show_header_desc":"Title and counter above the card","camera_auto_cycle":"Auto cycle","camera_auto_cycle_desc":"Automatically cycle between cameras","camera_cycle_interval":"Interval (seconds)","camera_cycle_interval_desc":"Time between each camera switch","camera_entity_order":"Camera order","camera_entity_order_desc":"Drag to reorder cameras.","camera_no_cameras":"No cameras detected.","dashboard_card_camera_carousel":"Camera Card","dashboard_card_camera_carousel_desc":"Surveillance carousel with quick actions","tab_spotify":"Spotify Card","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player entity","spotify_entity_desc":"Select the Spotify media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Select which speakers appear in the playback popup. If none are selected, all speakers are shown.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings","tab_unassigned":"Orphan entities","unassigned_desc":"Assign or reassign your entities to a room so they appear in the corresponding popups.","unassigned_none":"All entities are assigned to a room.","unassigned_no_entities":"No entities detected.","unassigned_select_area":"Unassigned","unassigned_assigned":"Assigned","unassigned_count":"{count} unassigned entity(ies)","unassigned_no_results":"No results.","unassigned_rename":"Rename entity","unassigned_change_icon":"Change icon"}')}},He="fr";let Fe=He;function qe(e){const t=e.slice(0,2).toLowerCase(),i=t in je?t:He;return i!==Fe&&(Fe=i,!0)}function Ve(){return Fe}function Ne(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),r=-1===i?"":e.slice(i+1),s=je[Fe]??je[He],o=je[He],n=s?.[a]?.[r]??o?.[a]?.[r];let c="string"==typeof n?n:e;if(t)for(const[l,d]of Object.entries(t))c=c.replaceAll(`{${l}}`,String(d));return c}var Ue=Object.defineProperty,We=Object.getOwnPropertyDescriptor,Be=(e,t,i,a)=>{for(var r,s=a>1?void 0:a?We(t,i):t,o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a?r(t,i,s):r(s))||s);return a&&s&&Ue(t,i,s),s};class Ke extends ne{constructor(){super(...arguments),this._lang=Ve()}set hass(e){this._hass=e,e?.language&&qe(e.language)&&(this._lang=Ve())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[$e,s`
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
    `]}render(){return this._lang,N`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${Ne("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${Ne("editor.open_config")}</a>
        </p>
      </div>
    `}}Be([pe({attribute:!1})],Ke.prototype,"hass",1),Be([ue()],Ke.prototype,"_lang",2);try{customElements.define("glass-card-editor",Ke)}catch{}function Ye(e){try{const t=class extends Ke{};customElements.define(e,t)}catch{}}var Ge=Object.defineProperty,Xe=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ge(t,i,s),s};class Qe extends ne{constructor(){super(...arguments),this.configPreview=!1,this._lang=Ve(),this._busCleanups=[],this._marqueeCleanup=null,this._cardSize="md",this._gestureTimer=0,this._gestureFired=!1,this._gestureStart=null,this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}static getStubConfig(){return{}}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&qe(this.hass.language)&&(this._lang=Ve())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0),this._marqueeCleanup=function(e){if(!e)return()=>{};const t=e=>{const t=e.querySelector(".marquee-inner");if(!t)return;e.classList.remove("scrolling");const i=t.dataset.text??t.textContent?.split("   ")[0]??"";t.dataset.text=i,t.textContent=i,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.scrollWidth>e.clientWidth+1&&(t.textContent=`${i}   ${i}   `,e.classList.add("scrolling"))})})},i=new ResizeObserver(e=>{for(const i of e)t(i.target)}),a=new MutationObserver(()=>{s()}),r=new Set,s=()=>{e.querySelectorAll(".marquee").forEach(e=>{r.has(e)||(r.add(e),i.observe(e),t(e))});for(const e of r)e.isConnected||(i.unobserve(e),r.delete(e))};return a.observe(e,{childList:!0,subtree:!0}),s(),()=>{i.disconnect(),a.disconnect(),r.clear()}}(this.shadowRoot),this._ro=new ResizeObserver(e=>{const t=e[0]?.contentRect.width??this.offsetWidth;this._applyCardSize(t)}),this._ro.observe(this)}_applyCardSize(e){let t="xl";e<fe?t="xs":e<ve?t="sm":e<be?t="md":e<ye&&(t="lg"),t!==this._cardSize&&(this._cardSize=t,this.setAttribute("size",t))}_listen(e,t){this._busCleanups.push(me.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0),this._marqueeCleanup?.(),this._marqueeCleanup=null,this._ro?.disconnect(),this._ro=void 0,clearTimeout(this._gestureTimer)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_bindGesture(e){return this.configPreview?{pointerdown:()=>{},pointerup:()=>{},pointermove:()=>{},pointercancel:()=>{},contextmenu:()=>{}}:{pointerdown:t=>this._onGestureDown(t,e),pointerup:t=>this._onGestureUp(t,e),pointermove:e=>this._onGestureMove(e),pointercancel:()=>this._onGestureCancel(),contextmenu:e=>e.preventDefault()}}_safeCallService(e,t,i,a){!this.configPreview&&this.hass&&this.hass.callService(e,t,i,a)}_onGestureDown(e,t){t.exclude&&e.target.closest(t.exclude)||(this._gestureStart={x:e.clientX,y:e.clientY,t:Date.now()},this._gestureFired=!1,clearTimeout(this._gestureTimer),t.onLongPress&&(this._gestureTimer=window.setTimeout(()=>{this._gestureFired=!0,Je(this,"light"),t.onLongPress()},500)))}_onGestureUp(e,t){if(clearTimeout(this._gestureTimer),this._gestureFired||!this._gestureStart)return void(this._gestureStart=null);const i=e.clientX-this._gestureStart.x,a=Date.now()-this._gestureStart.t;this._gestureStart=null,t.onSwipe&&Math.abs(i)>50&&a<500?t.onSwipe(i<0?"left":"right"):t.onTap?.()}_onGestureMove(e){if(this._gestureFired||!this._gestureStart)return;const t=Math.abs(e.clientX-this._gestureStart.x),i=Math.abs(e.clientY-this._gestureStart.y);(t>15||i>15)&&(clearTimeout(this._gestureTimer),i>t&&(this._gestureStart=null))}_onGestureCancel(){clearTimeout(this._gestureTimer),this._gestureStart=null}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function Je(e,t="light"){e.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:t}))}function Ze(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}function et(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&Ze(t,i)===e)}function tt(e,t){if(!t)return!0;const i=t[e];if(!i||0===i.periods.length)return!0;const a=new Date;return i.periods.some(e=>{const t=new Date(e.start),i=new Date(e.end);if(i.setSeconds(59,999),e.recurring){const e=new Date(a.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),r=new Date(a.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999);if(e<=r)return a>=e&&a<=r;const s=new Date(a.getFullYear()+1,i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999),o=new Date(a.getFullYear()-1,t.getMonth(),t.getDate(),t.getHours(),t.getMinutes());return a>=e&&a<=s||a>=o&&a<=r}return a>=t&&a<=i})}function it(e,t,i){const a=i?.length?i:Object.keys(t.areas??{});if(0===a.length)return[];const r=[];for(const s of a)for(const i of et(s,t.entities,t.devices))i.entity_id.startsWith(`${e}.`)&&r.push(i.entity_id);return r}Xe([pe({attribute:!1})],Qe.prototype,"hass"),Xe([pe({type:Boolean,attribute:"config-preview"})],Qe.prototype,"configPreview"),Xe([ue()],Qe.prototype,"_lang");class at{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}const rt={section:"dashboard"};function st(e=800){let t;return{schedule(i){void 0!==t&&clearTimeout(t),t=setTimeout(()=>{t=void 0,i()},e)},cancel(){void 0!==t&&(clearTimeout(t),t=void 0)}}}var ot=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,ct=(e,t,i,a)=>{for(var r,s=a>1?void 0:a?nt(t,i):t,o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a?r(t,i,s):r(s))||s);return a&&s&&ot(t,i,s),s};class lt extends ne{constructor(){super(...arguments),this.rooms=[],this.emptyRooms=[],this.dragState={dragIdx:null,dropIdx:null,dragContext:"rooms",dragModeSrcIdx:null},this._configData={},this._initializedForArea=null,this._saveScheduler=st(),this._lang=Ve(),this._localDragIdx=null,this._localDropIdx=null}set configData(e){const t=this._configData;this._configData=e,e&&e!==t&&this.loadFromConfig(e)}get configData(){return this._configData}static{this.styles=[$e,Se,Ce,ze,...le,s`:host { padding: 0.5rem 0; min-height: auto; }`]}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&qe(this.hass.language)&&(this._lang=Ve())}disconnectedCallback(){super.disconnectedCallback(),this._saveScheduler.cancel(),this._teardownDropdownListener()}render(){return this._lang,this.renderTab()}_fireToast(e){this.dispatchEvent(new CustomEvent("tab-toast",{bubbles:!0,composed:!0,detail:{success:e}}))}_scheduleSave(){this._saveScheduler.schedule(()=>this.save())}_canSave(){return!!this.backend}async save(){if(this._canSave())try{await this._performSave(),this._fireToast(!0)}catch{this._fireToast(!1)}}async _performSave(){}static{this._AUTO_SAVE_KEYS=new Set}_checkAutoSave(e){const t=this.constructor._AUTO_SAVE_KEYS;if(0!==t.size)for(const i of e.keys())if(t.has(i))return void this._scheduleSave()}_initRoomIfNeeded(){return!!this.areaId&&(this._initializedForArea!==this.areaId&&(this._initializedForArea=this.areaId,!0))}_onLocalDragStart(e){this._localDragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),null!==this._localDragIdx&&this._localDragIdx!==e&&(this._localDropIdx=e)}_onLocalDragLeave(){this._localDropIdx=null}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_applyLocalDrop(e,t){if(null===this._localDragIdx||this._localDragIdx===e)return this._localDragIdx=null,this._localDropIdx=null,null;const i=[...t],[a]=i.splice(this._localDragIdx,1);return i.splice(e,0,a),this._localDragIdx=null,this._localDropIdx=null,i}_setupDropdownListener(){this._boundDropdownClose=e=>{const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown.open");for(const r of a)if(t.includes(r))return;this._closeAllDropdowns()},document.addEventListener("click",this._boundDropdownClose)}_teardownDropdownListener(){this._boundDropdownClose&&(document.removeEventListener("click",this._boundDropdownClose),this._boundDropdownClose=void 0)}_closeAllDropdowns(){}async _saveRoomEntities(e,t,i,a,r){if(!this.backend)return;let s=[],o=[],n={};try{const t=await this.backend.send("get_room",{area_id:e});t&&(s=t.hidden_entities??[],o=t.entity_order??[],n=t.entity_layouts??{})}catch{}const c=s.filter(e=>!t.has(e)),l=o.filter(e=>!t.has(e)),d={};for(const[h,p]of Object.entries(n))t.has(h)||(d[h]=p);r&&Object.assign(d,r),await this.backend.send("set_room",{area_id:e,hidden_entities:[...c,...i],entity_order:[...l,...a],entity_layouts:d}),me.emit("room-config-changed",{areaId:e})}}ct([pe({attribute:!1})],lt.prototype,"hass",2),ct([pe({attribute:!1})],lt.prototype,"backend",2),ct([pe({attribute:!1})],lt.prototype,"rooms",2),ct([pe({attribute:!1})],lt.prototype,"emptyRooms",2),ct([pe({attribute:!1})],lt.prototype,"dragState",2),ct([pe()],lt.prototype,"areaId",2),ct([pe({attribute:!1})],lt.prototype,"configData",1),ct([ue()],lt.prototype,"_lang",2);var dt=Object.defineProperty,ht=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&dt(t,i,s),s};class pt extends lt{constructor(){super(...arguments),this._coverShowHeader=!0,this._coverDashboardCompact=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._coverEntityPresets={},this._coverRoom="",this._coverRoomEntities=[],this._coverEntityPresetInput={},this._coverPresetsExpandedEntity=null,this._dragIdx=null,this._dropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_coverShowHeader","_coverDashboardCompact","_coverDashboardEntities","_coverDashboardOrder","_coverEntityPresets","_coverRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._coverRoom=this.areaId,this._loadRoomCovers()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._coverShowHeader=t.show_header??!0,this._coverDashboardCompact=t.dashboard_compact??!0,this._coverDashboardEntities=t.dashboard_entities??[],this._coverEntityPresets=t.entity_presets??{},this._initDashboardOrder()}collectSaveData(){const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));return{show_header:this._coverShowHeader,dashboard_compact:this._coverDashboardCompact,dashboard_entities:e,entity_presets:this._coverEntityPresets}}async _performSave(){if(await this.backend.send("set_cover_config",this.collectSaveData()),this._coverRoom&&this._coverRoomEntities.length>0){const e=new Set(this._coverRoomEntities.map(e=>e.entityId)),t=this._coverRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),i=this._coverRoomEntities.map(e=>e.entityId),a={};for(const r of this._coverRoomEntities)a[r.entityId]=r.layout;await this._saveRoomEntities(this._coverRoom,e,t,i,a)}me.emit("cover-config-changed",void 0)}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.cover_card&&this.loadFromConfig(e.cover_card)}catch{}this._coverEntityPresetInput={},await this._loadRoomCovers()}}async _loadRoomCovers(){if(!this.backend||!this._coverRoom||!this.hass)return;const e=this._coverRoom,t=et(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._coverRoom!==e)return;const a=new Set(i?.hidden_entities??[]),r=i?.entity_order??[],s=i?.entity_layouts??{},o=[...t].sort((e,t)=>{const i=r.indexOf(e),a=r.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._coverRoomEntities=o.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,r=t?.attributes?.device_class||"shutter";return{entityId:e,name:i,visible:!a.has(e),deviceClass:r,layout:s[e]||"compact"}})}_initDashboardOrder(){const e=new Set(this._getAllCoverEntities().map(e=>e.entityId)),t=this._coverDashboardEntities.filter(t=>e.has(t)),i=[...e].filter(e=>!this._coverDashboardEntities.includes(e));this._coverDashboardOrder=[...t,...i]}getAllCoverEntities(){return this._getAllCoverEntities()}_getAllCoverEntities(){if(!this.hass)return[];const e=[];for(const[t,i]of Object.entries(this.hass.states)){if(!t.startsWith("cover."))continue;const a=i.attributes?.friendly_name||t.split(".")[1]||t;e.push({entityId:t,name:a})}return e.sort((e,t)=>e.name.localeCompare(t.name))}_toggleEntityVisibility(e){this._coverRoomEntities=this._coverRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLayout(e){this._coverRoomEntities=this._coverRoomEntities.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleDashboardEntity(e){const t=new Set(this._coverDashboardEntities);t.has(e)?(t.delete(e),this._coverDashboardOrder=this._coverDashboardOrder.filter(t=>t!==e)):(t.add(e),this._coverDashboardOrder.includes(e)||(this._coverDashboardOrder=[...this._coverDashboardOrder,e])),this._coverDashboardEntities=[...t]}_onDropDashboardCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverDashboardOrder],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverDashboardOrder=i,this._dragIdx=null,this._dropIdx=null}_addEntityPreset(e){const t=this._coverEntityPresetInput[e]??"",i=parseInt(t,10);if(isNaN(i)||i<0||i>100)return;const a=this._coverEntityPresets[e]??[0,25,50,75,100];a.includes(i)?this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""}:(this._coverEntityPresets={...this._coverEntityPresets,[e]:[...a,i].sort((e,t)=>e-t)},this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""})}_removeEntityPreset(e,t){const i=this._coverEntityPresets[e];if(!i)return;const a=i.filter(e=>e!==t);if(0===a.length){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}else this._coverEntityPresets={...this._coverEntityPresets,[e]:a}}_resetEntityPresets(e){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}_togglePresetsExpand(e){this._coverPresetsExpandedEntity=this._coverPresetsExpandedEntity===e?null:e}_onCoverDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onCoverDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onCoverDragLeave(){this._dropIdx=null}_onCoverDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onLocalDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverRoomEntities=i,this._dragIdx=null,this._dropIdx=null}_renderDashboardEntities(){const e=this._getAllCoverEntities();if(0===e.length)return N`
        <div class="banner">
          <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
          <span>${Ne("config.cover_no_covers")}</span>
        </div>
      `;const t=new Set(this._coverDashboardEntities),i=this._coverDashboardOrder.filter(t=>e.some(e=>e.entityId===t)),a=e.filter(e=>!i.includes(e.entityId)).map(e=>e.entityId),r=[...i,...a];return N`
      <div class="sub-section">
        <div class="section-label">${Ne("config.cover_dashboard_entities")} (${t.size}/${e.length})</div>
        <div class="section-desc">${Ne("config.cover_dashboard_entities_desc")}</div>
        <div class="item-list">
          ${r.map((i,a)=>{const r=e.find(e=>e.entityId===i);if(!r)return B;const s=t.has(i),o=["item-row",s?"":"disabled",this._dragIdx===a&&"dashboard_covers"===this._dragContext?"dragging":"",this._dropIdx===a&&"dashboard_covers"===this._dragContext?"drop-target":""].filter(Boolean).join(" ");return N`
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
                  <span class="drag-handle"><ha-icon .icon=${"mdi:drag"}></ha-icon></span>
                  <div class="item-info">
                    <span class="item-name">${r.name}</span>
                    <span class="item-meta">${r.entityId}</span>
                  </div>
                  <button
                    class="toggle ${s?"on":""}"
                    @click=${()=>this._toggleDashboardEntity(i)}
                    role="switch"
                    aria-checked=${s?"true":"false"}
                    aria-label="${Ne(s?"common.hide":"common.show")} ${r.name}"
                  ></button>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}renderTab(){return this._lang,this.hass?N`
      <div class="tab-panel" id="panel-cover">
        <glass-cover-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-cover-card>
        <div class="section-label">${Ne("config.behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._coverShowHeader?"true":"false"}
            @click=${()=>{this._coverShowHeader=!this._coverShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.cover_show_header")}</div>
              <div class="feature-desc">${Ne("config.cover_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._coverShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        ${this._coverRoom?B:this._renderDashboardEntities()}
        ${this._coverRoom?N`
          ${this._coverRoomEntities.length>0?N`
            <div class="section-label">${Ne("config.cover_list_title")} (${this._coverRoomEntities.length})</div>
            <div class="section-desc">${Ne("config.cover_list_banner")}</div>
            <div class="item-list">
              ${this._coverRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"covers"===this._dragContext,a=this._dropIdx===t&&"covers"===this._dragContext,r=this._coverPresetsExpandedEntity===e.entityId,s=!!this._coverEntityPresets[e.entityId],o=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),n=["item-card",r?"expanded":""].filter(Boolean).join(" ");return N`
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
                      <span class="drag-handle">
                        <ha-icon .icon=${"mdi:drag"}></ha-icon>
                      </span>
                      <div class="item-info">
                        <span class="item-name">${e.name}</span>
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                      <button
                        class="presets-btn ${s?"active":""}"
                        @click=${()=>this._togglePresetsExpand(e.entityId)}
                        aria-label="${Ne("config.cover_entity_presets")}"
                        aria-expanded=${r?"true":"false"}
                        title="${Ne("config.cover_entity_presets")}"
                      >
                        <ha-icon .icon=${"mdi:tune-vertical"}></ha-icon>
                      </button>
                      <button
                        class="layout-btn"
                        @click=${()=>this._cycleLayout(e.entityId)}
                        aria-label="${Ne("config.light_change_layout_aria")}"
                        title="${Ne("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
                      >
                        ${Ne("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
                      </button>
                      <button
                        class="toggle ${e.visible?"on":""}"
                        @click=${()=>this._toggleEntityVisibility(e.entityId)}
                        role="switch"
                        aria-checked=${e.visible?"true":"false"}
                        aria-label="${e.visible?Ne("common.hide"):Ne("common.show")} ${e.name}"
                      ></button>
                    </div>
                    <div class="item-fold-sep ${r?"visible":""}"></div>
                    <div class="entity-presets-fold ${r?"open":""}">
                      <div class="entity-presets-fold-inner">
                        <div class="entity-presets-content">
                          <div class="entity-presets-label">${Ne(s?"config.cover_entity_presets":"config.cover_presets")}</div>
                          <div class="preset-chips">
                            ${(this._coverEntityPresets[e.entityId]??[0,25,50,75,100]).map(t=>N`
                                <span class="preset-chip small ${s?"custom":""}">
                                  <ha-icon .icon=${t>=50?"mdi:window-shutter-open":"mdi:window-shutter"}></ha-icon>
                                  ${0===t?Ne("cover.preset_closed"):100===t?Ne("cover.preset_open"):`${t}%`}
                                  ${s?N`
                                    <button
                                      class="preset-chip-remove"
                                      @click=${()=>this._removeEntityPreset(e.entityId,t)}
                                      aria-label="${Ne("common.delete")} ${t}%"
                                    >
                                      <ha-icon .icon=${"mdi:close"}></ha-icon>
                                    </button>
                                  `:B}
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
                              style="opacity:${this._coverEntityPresetInput[e.entityId]?"1":"0.4"};pointer-events:${this._coverEntityPresetInput[e.entityId]?"auto":"none"};"
                              @click=${()=>this._addEntityPreset(e.entityId)}
                              aria-label="${Ne("config.cover_preset_add")}"
                            >
                              <ha-icon .icon=${"mdi:plus"}></ha-icon>
                              ${Ne("config.cover_preset_add")}
                            </button>
                            ${s?N`
                              <button
                                class="preset-reset-btn"
                                @click=${()=>this._resetEntityPresets(e.entityId)}
                                aria-label="${Ne("common.reset")}"
                              >
                                <ha-icon .icon=${"mdi:restore"}></ha-icon>
                              </button>
                            `:B}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `})}
            </div>
          `:N`
            <div class="banner">
              <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
              <span>${Ne("config.cover_no_covers")}</span>
            </div>
          `}
        `:B}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `:N``}}ht([ue()],pt.prototype,"_coverShowHeader"),ht([ue()],pt.prototype,"_coverDashboardCompact"),ht([ue()],pt.prototype,"_coverDashboardEntities"),ht([ue()],pt.prototype,"_coverDashboardOrder"),ht([ue()],pt.prototype,"_coverEntityPresets"),ht([ue()],pt.prototype,"_coverRoom"),ht([ue()],pt.prototype,"_coverRoomEntities"),ht([ue()],pt.prototype,"_coverEntityPresetInput"),ht([ue()],pt.prototype,"_coverPresetsExpandedEntity"),ht([ue()],pt.prototype,"_dragIdx"),ht([ue()],pt.prototype,"_dropIdx"),ht([ue()],pt.prototype,"_dragContext");try{customElements.define("config-tab-cover",pt)}catch{}var ut=Object.defineProperty,gt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ut(t,i,s),s};class _t extends lt{constructor(){super(...arguments),this._lights=[],this._lightRoom="",this._lightShowHeader=!0,this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._suppressAutoSave=!1,this._mounted=!1}static{this._AUTO_SAVE_KEYS=new Set(["_lightShowHeader","_lights"])}connectedCallback(){super.connectedCallback(),this._mounted=!0}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._lightRoom=this.areaId,this._loadRoomLights()),this._suppressAutoSave?this._suppressAutoSave=!1:this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._lightShowHeader=t.show_header??!0}collectSaveData(){return{show_header:this._lightShowHeader}}async _performSave(){if(await this.backend.send("set_light_config",{show_header:this._lightShowHeader}),this._lightRoom&&this._lights.length>0){const e=new Set(this._lights.map(e=>e.entityId)),t=this._lights.filter(e=>!e.visible).map(e=>e.entityId),i=this._lights.map(e=>e.entityId),a={};for(const r of this._lights)"full"===r.layout&&(a[r.entityId]=r.layout);await this._saveRoomEntities(this._lightRoom,e,t,i,a)}me.emit("light-config-changed",void 0)}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.light_card&&this.loadFromConfig(e.light_card)}catch{}this._lightRoom&&await this._loadRoomLights()}}initRoom(){!this._lightRoom&&this.rooms.length>0&&(this._lightRoom=this.rooms[0].areaId,this._loadRoomLights())}async _loadRoomLights(){if(this._suppressAutoSave=!0,!this.hass||!this._lightRoom)return void(this._lights=[]);const e=this._lightRoom,t=et(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light."));let i=new Set,a=[],r={};try{if(!this.backend)throw new Error("No backend");const t=await this.backend.send("get_room",{area_id:e});if(this._lightRoom!==e)return;t&&(i=new Set(t.hidden_entities??[]),a=t.entity_order??[],r=t.entity_layouts??{})}catch{}const s=this.hass,o=new Map;a.forEach((e,t)=>o.set(e,t));const n=t.map(e=>{const t=s.states[e.entity_id],a="on"===t?.state,o=t?.attributes.brightness,n=a&&void 0!==o?Math.round(o/255*100):0;return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:a,brightnessPct:n,layout:r[e.entity_id]||"compact",visible:!i.has(e.entity_id)}});n.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=o.get(e.entityId),a=o.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._lights=n;try{if(this.backend){const t=await this.backend.send("get_schedules");if(this._lightRoom!==e)return;this._schedulesLoaded=t??{},this._scheduleEdits=new Map;for(const e of n){const t=this._schedulesLoaded[e.entityId];this._scheduleEdits.set(e.entityId,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}_toggleLightVisible(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLightLayout(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleScheduleExpand(e){if(this._scheduleExpandedEntity=this._scheduleExpandedEntity===e?null:e,!this._scheduleEdits.has(e)){const t=this._schedulesLoaded[e];this._scheduleEdits.set(e,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}this.requestUpdate()}_addSchedulePeriod(e){const t=this._scheduleEdits.get(e)??[];t.push({start:"",end:"",recurring:!1}),this._scheduleEdits.set(e,[...t]),this.requestUpdate()}_removeSchedulePeriod(e,t){const i=this._scheduleEdits.get(e)??[];i.splice(t,1),this._scheduleEdits.set(e,[...i]),this.requestUpdate()}_updateSchedulePeriod(e,t,i,a){const r=this._scheduleEdits.get(e)??[];r[t]&&(r[t]={...r[t],[i]:a},this._scheduleEdits.set(e,[...r]),this.requestUpdate())}_toggleScheduleRecurring(e,t){const i=this._scheduleEdits.get(e)??[];i[t]&&(i[t]={...i[t],recurring:!i[t].recurring},this._scheduleEdits.set(e,[...i]),this.requestUpdate())}async _saveSchedule(e){if(!this.backend)return;const t=(this._scheduleEdits.get(e)??[]).filter(e=>e.start&&e.end);try{if(await this.backend.send("set_schedule",{entity_id:e,periods:t}),!this._mounted)return;this._fireToast(!0),me.emit("schedule-changed",{entityId:e})}catch{if(!this._mounted)return;this._fireToast(!1)}}_formatDateTimeShort(e){if(!e)return"";const[t,i]=e.split("T");if(!t)return e;const[a,r,s]=t.split("-");return`${s}/${r}/${a} ${i??"00:00"}`}_formatPeriodDisplay(e){if(!e.start&&!e.end)return"";const t=this._formatDateTimeShort(e.start),i=this._formatDateTimeShort(e.end);return t&&i?`${t}  →  ${i}`:t?`${t}  → …`:`…  →  ${i}`}_parseDateTimeValue(e){if(!e)return null;const[t,i]=e.split("T");if(!t)return null;const a=t.split("-").map(Number);if(a.length<3||a.some(isNaN))return null;const[r,s,o]=a,[n,c]=(i??"00:00").split(":");return{year:r,month:s-1,day:o,hour:n??"00",minute:c??"00"}}_openRangePicker(e,t){this._pickerTarget={entityId:e,periodIdx:t};const i=(this._scheduleEdits.get(e)??[])[t],a=i?this._parseDateTimeValue(i.start):null,r=i?this._parseDateTimeValue(i.end):null,s=new Date;a?(this._pickerStartDay=a.day,this._pickerStartMonth=a.month,this._pickerStartYear=a.year,this._pickerStartHour=a.hour,this._pickerStartMinute=a.minute,this._pickerYear=a.year,this._pickerMonth=a.month):(this._pickerStartDay=null,this._pickerStartMonth=s.getMonth(),this._pickerStartYear=s.getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerYear=s.getFullYear(),this._pickerMonth=s.getMonth()),r?(this._pickerEndDay=r.day,this._pickerEndMonth=r.month,this._pickerEndYear=r.year,this._pickerEndHour=r.hour,this._pickerEndMinute=r.minute):(this._pickerEndDay=null,this._pickerEndMonth=s.getMonth(),this._pickerEndYear=s.getFullYear(),this._pickerEndHour="23",this._pickerEndMinute="59"),this._pickerPhase=a?r?"start":"end":"start",this._pickerOpen=!0}_closePicker(){this._pickerOpen=!1,this._pickerTarget=null}_pickerPrevMonth(){0===this._pickerMonth?(this._pickerMonth=11,this._pickerYear--):this._pickerMonth--}_pickerNextMonth(){11===this._pickerMonth?(this._pickerMonth=0,this._pickerYear++):this._pickerMonth++}_pickerSelectDay(e,t){if(!t)if("start"===this._pickerPhase){if(this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerPhase="end",null!==this._pickerEndDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,e).getTime();new Date(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay).getTime()<t&&(this._pickerEndDay=null)}}else{if(null!==this._pickerStartDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay).getTime();if(new Date(this._pickerYear,this._pickerMonth,e).getTime()<t)return this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerEndDay=null,void(this._pickerPhase="start")}this._pickerEndDay=e,this._pickerEndMonth=this._pickerMonth,this._pickerEndYear=this._pickerYear}}_pickerSetTime(e,t){const i=t.target.value.replace(/\D/g,"").slice(0,2),a=e.includes("Hour"),r=Math.min(a?23:59,Math.max(0,parseInt(i,10)||0)),s=String(r).padStart(2,"0");t.target.value=s,"startHour"===e?this._pickerStartHour=s:"startMinute"===e?this._pickerStartMinute=s:"endHour"===e?this._pickerEndHour=s:this._pickerEndMinute=s,this.requestUpdate()}_pickerConfirm(){if(!this._pickerTarget||null===this._pickerStartDay||null===this._pickerEndDay)return;const{entityId:e,periodIdx:t}=this._pickerTarget,i=String(this._pickerStartMonth+1).padStart(2,"0"),a=String(this._pickerStartDay).padStart(2,"0"),r=String(this._pickerEndMonth+1).padStart(2,"0"),s=String(this._pickerEndDay).padStart(2,"0"),o=`${this._pickerStartYear}-${i}-${a}T${this._pickerStartHour}:${this._pickerStartMinute}`,n=`${this._pickerEndYear}-${r}-${s}T${this._pickerEndHour}:${this._pickerEndMinute}`;this._updateSchedulePeriod(e,t,"start",o),this._updateSchedulePeriod(e,t,"end",n),this._closePicker()}_toAbsDay(e,t,i){return new Date(e,t,i).getTime()}_getMonthDays(){const e=this._pickerYear,t=this._pickerMonth,i=(new Date(e,t,1).getDay()+6)%7,a=new Date(e,t+1,0).getDate(),r=new Date(e,t,0).getDate(),s=new Date,o=s.getFullYear()===e&&s.getMonth()===t,n=s.getDate(),c=null!==this._pickerStartDay?this._toAbsDay(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay):null,l=null!==this._pickerEndDay?this._toAbsDay(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay):null,d=[],h=(e,t,i,a)=>{const r=this._toAbsDay(i,a,e);return{day:e,otherMonth:t,today:!t&&o&&e===n,rangeStart:null!==c&&r===c,rangeEnd:null!==l&&r===l,inRange:null!==c&&null!==l&&r>c&&r<l}},p=0===t?11:t-1,u=0===t?e-1:e;for(let f=i-1;f>=0;f--)d.push(h(r-f,!0,u,p));for(let f=1;f<=a;f++)d.push(h(f,!1,e,t));const g=11===t?0:t+1,_=11===t?e+1:e,m=42-d.length;for(let f=1;f<=m;f++)d.push(h(f,!0,_,g));return d}_getMonthLabel(){const e=new Date(this._pickerYear,this._pickerMonth,1),t="fr"===this._lang?"fr-FR":"en-US",i=e.toLocaleDateString(t,{month:"long"});return`${i.charAt(0).toUpperCase()}${i.slice(1)} ${this._pickerYear}`}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_onLocalDragStart(e){this._dragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDropLight(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return void this._onLocalDragEnd();const i=[...this._lights],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._lights=i,this._onLocalDragEnd()}_renderScheduleContent(e){const t=this._scheduleEdits.get(e)??[];return N`
      <div class="schedule-body">
        <div class="schedule-header">${Ne("config.light_schedule_title")}</div>
        ${t.map((t,i)=>N`
          <div class="schedule-period">
            <div class="schedule-row">
              <button
                class="datetime-display ${t.start||t.end?"":"empty"}"
                @click=${()=>this._openRangePicker(e,i)}
              >
                ${t.start||t.end?this._formatPeriodDisplay(t):Ne("config.light_schedule_no_date")}
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
                <span class="check-label">${Ne("config.light_schedule_recurring")}</span>
              </button>
              <button
                class="btn-icon xs schedule-delete"
                @click=${()=>this._removeSchedulePeriod(e,i)}
                aria-label="${Ne("config.light_schedule_delete_aria")}"
              >
                <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
              </button>
            </div>
          </div>
        `)}
        <button class="btn btn-sm schedule-add" @click=${()=>this._addSchedulePeriod(e)}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          ${Ne("config.light_schedule_add")}
        </button>
        <button class="btn btn-sm btn-accent schedule-save" @click=${()=>this._saveSchedule(e)}>
          ${Ne("common.save")}
        </button>
      </div>
    `}_renderLightRow(e,t){const i=this._dragIdx===t,a=this._dropIdx===t,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),s=this._scheduleEdits.get(e.entityId),o=s?s.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0,n=this._scheduleExpandedEntity===e.entityId,c=["item-card",n?"expanded":""].filter(Boolean).join(" ");return N`
      <div class=${c}>
        <div
          class=${r}
          draggable="true"
          @dragstart=${()=>this._onLocalDragStart(t)}
          @dragover=${e=>this._onLocalDragOver(t,e)}
          @dragleave=${()=>this._onLocalDragLeave()}
          @drop=${e=>this._onDropLight(t,e)}
          @dragend=${()=>this._onLocalDragEnd()}
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
            aria-label="${Ne("config.light_schedule_aria",{name:e.name})}"
            aria-expanded=${n?"true":"false"}
            title="${Ne("config.light_schedule_title")}"
          >
            <ha-icon .icon=${"mdi:calendar-clock"}></ha-icon>
          </button>
          <button
            class="layout-btn"
            @click=${()=>this._cycleLightLayout(e.entityId)}
            aria-label="${Ne("config.light_change_layout_aria")}"
            title="${Ne("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
          >
            ${Ne("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
          </button>
          <button
            class="toggle ${e.visible?"on":""}"
            @click=${()=>this._toggleLightVisible(e.entityId)}
            role="switch"
            aria-checked=${e.visible?"true":"false"}
            aria-label="${e.visible?Ne("common.hide"):Ne("common.show")} ${e.name}"
          ></button>
        </div>
        <div class="fold-sep ${n?"visible":""}"></div>
        <div class="schedule-fold ${n?"open":""}">
          <div class="schedule-fold-inner">
            ${this._renderScheduleContent(e.entityId)}
          </div>
        </div>
      </div>
    `}_renderDateTimePicker(){if(!this._pickerOpen)return B;const e=this._getMonthDays(),t=this._getDayLabels(),i=null!==this._pickerStartDay&&null!==this._pickerEndDay;return N`
      <div class="picker-overlay"
        @click=${e=>{e.target===e.currentTarget&&this._closePicker()}}
        @keydown=${e=>{"Escape"===e.key&&this._closePicker()}}
      >
        <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${Ne("config.light_schedule_title")}">
          <div class="picker-phase">
            <button
              class="picker-phase-btn ${"start"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="start"}}
            >${Ne("config.light_schedule_start")}</button>
            <button
              class="picker-phase-btn ${"end"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="end"}}
            >${Ne("config.light_schedule_end")}</button>
          </div>
          <div class="picker-header">
            <button class="picker-nav" @click=${()=>this._pickerPrevMonth()} aria-label="${Ne("config.light_schedule_prev_month_aria")}">
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <span class="picker-month">${this._getMonthLabel()}</span>
            <button class="picker-nav" @click=${()=>this._pickerNextMonth()} aria-label="${Ne("config.light_schedule_next_month_aria")}">
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          </div>
          <div class="picker-grid">
            ${t.map(e=>N`<span class="picker-day-label">${e}</span>`)}
            ${e.map(e=>{const t=["picker-day",e.today?"today":"",e.rangeStart?"range-start":"",e.rangeEnd?"range-end":"",e.inRange?"in-range":"",e.otherMonth?"other-month":""].filter(Boolean).join(" ");return N`
                <button class=${t} @click=${()=>this._pickerSelectDay(e.day,e.otherMonth)}>${e.day}</button>
              `})}
          </div>
          <div class="picker-time-row">
            <div class="picker-time-group">
              <span class="picker-time-label">${Ne("config.light_schedule_start")}</span>
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
              <span class="picker-time-label">${Ne("config.light_schedule_end")}</span>
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
            ${Ne("config.light_schedule_confirm")}
          </button>
        </div>
      </div>
    `}renderTab(){return this._lang,N`
      <div class="tab-panel" id="panel-light">
        <glass-light-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-light-card>
        <div class="section-label">${Ne("config.behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._lightShowHeader?"true":"false"}
            @click=${()=>{this._lightShowHeader=!this._lightShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.light_show_header")}</div>
              <div class="feature-desc">${Ne("config.light_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._lightShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        ${this._lights.length>0?N`
              <div class="section-label">${Ne("config.light_list_title")} (${this._lights.length})</div>
              <div class="section-desc">
                ${Ne("config.light_list_banner")}
              </div>
              <div class="item-list">
                ${this._lights.map((e,t)=>this._renderLightRow(e,t))}
              </div>
            `:this._lightRoom?N`<div class="banner">
                <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
                <span>${Ne("config.light_no_lights")}</span>
              </div>`:B}

        ${this._lights.length>0?N`
          <div class="section-desc schedule-hint">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            ${Ne("config.light_schedule_hint")}
          </div>
        `:B}

        <div class="section-desc dashboard-vs-room">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          ${Ne("config.light_dashboard_vs_room")}
        </div>

        ${this._lightRoom?N`
          <div class="save-bar">
            <button class="btn btn-ghost" @click=${()=>this._loadRoomLights()}>${Ne("common.reset")}</button>
          </div>
        `:B}
      </div>

      ${this._renderDateTimePicker()}
    `}}gt([ue()],_t.prototype,"_lights"),gt([ue()],_t.prototype,"_lightRoom"),gt([ue()],_t.prototype,"_lightShowHeader"),gt([ue()],_t.prototype,"_scheduleExpandedEntity"),gt([ue()],_t.prototype,"_pickerOpen"),gt([ue()],_t.prototype,"_pickerYear"),gt([ue()],_t.prototype,"_pickerMonth"),gt([ue()],_t.prototype,"_pickerStartDay"),gt([ue()],_t.prototype,"_pickerStartMonth"),gt([ue()],_t.prototype,"_pickerStartYear"),gt([ue()],_t.prototype,"_pickerEndDay"),gt([ue()],_t.prototype,"_pickerEndMonth"),gt([ue()],_t.prototype,"_pickerEndYear"),gt([ue()],_t.prototype,"_pickerStartHour"),gt([ue()],_t.prototype,"_pickerStartMinute"),gt([ue()],_t.prototype,"_pickerEndHour"),gt([ue()],_t.prototype,"_pickerEndMinute"),gt([ue()],_t.prototype,"_pickerPhase"),gt([ue()],_t.prototype,"_dragIdx"),gt([ue()],_t.prototype,"_dropIdx");try{customElements.define("config-tab-light",_t)}catch{}var mt=Object.defineProperty,ft=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&mt(t,i,s),s};class vt extends lt{constructor(){super(...arguments),this._mediaShowHeader=!0,this._mediaExtraEntities={},this._mediaRoom="",this._mediaRoomNativePlayers=[],this._mediaAddDropdownOpen=!1,this._mediaEntitySearch="",this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this)}static{this._AUTO_SAVE_KEYS=new Set(["_mediaShowHeader","_mediaExtraEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._mediaRoom=this.areaId,this._loadRoomMediaPlayers()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._mediaShowHeader=t.show_header??!0,this._mediaExtraEntities=t.extra_entities??{}}collectSaveData(){return{show_header:this._mediaShowHeader,extra_entities:this._mediaExtraEntities}}async _performSave(){await this.backend.send("set_media_config",this.collectSaveData()),me.emit("media-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.media_card&&this.loadFromConfig(e.media_card)}catch{}}_addMediaExtraEntity(e){const t=this._mediaRoom;if(!t)return;const i=this._mediaExtraEntities[t]??[];i.includes(e)||(this._mediaExtraEntities={...this._mediaExtraEntities,[t]:[...i,e]})}_removeMediaExtraEntity(e){const t=this._mediaRoom;if(!t)return;const i=this._mediaExtraEntities[t]??[];this._mediaExtraEntities={...this._mediaExtraEntities,[t]:i.filter(t=>t!==e)}}_loadRoomMediaPlayers(){if(!this.hass||!this._mediaRoom)return void(this._mediaRoomNativePlayers=[]);const e=et(this._mediaRoom,this.hass.entities,this.hass.devices);this._mediaRoomNativePlayers=e.filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseDropdowns)}_closeDropdownsOnOutsideClick(e){if(!this._mediaAddDropdownOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown");for(const r of a)if(t.includes(r))return;this._mediaAddDropdownOpen=!1}initRoom(){!this._mediaRoom&&this.rooms.length>0&&(this._mediaRoom=this.rooms[0].areaId,this._loadRoomMediaPlayers())}renderTab(){if(this._lang,!this.hass)return N``;const e=this._mediaRoom,t=e?this._mediaExtraEntities[e]??[]:[],i=Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort(),a=new Set([...this._mediaRoomNativePlayers,...t]),r=this._mediaEntitySearch?.toLowerCase()??"",s=i.filter(e=>{if(a.has(e))return!1;if(!r)return!0;const t=(this.hass?.states[e]?.attributes?.friendly_name??"").toLowerCase();return e.toLowerCase().includes(r)||t.includes(r)});return N`
      <div class="tab-panel" id="panel-media">
        <glass-media-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-media-card>
        <!-- Show header toggle -->
        <div class="section-label">${Ne("config.behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._mediaShowHeader?"true":"false"}
            @click=${()=>{this._mediaShowHeader=!this._mediaShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.media_show_header")}</div>
              <div class="feature-desc">${Ne("config.media_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._mediaShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <!-- Per-room extra entities -->
        <div class="section-label">${Ne("config.media_room")}</div>
        <div class="section-desc">${Ne("config.media_room_desc")}</div>

        ${e?N`
          <!-- Native players (read-only) -->
          <div class="section-label">${Ne("config.media_native_players")} (${this._mediaRoomNativePlayers.length})</div>
          <div class="section-desc">${Ne("config.media_native_players_desc")}</div>
          ${this._mediaRoomNativePlayers.length>0?N`
            <div class="item-list">
              ${this._mediaRoomNativePlayers.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,a="playing"===t?.state;return N`
                  <div class="item-card">
                    <div class="item-row">
                      <div class="item-info pw-mp-item-info">
                        <span class="item-name">${i}</span>
                        <span class="item-meta">${e}</span>
                      </div>
                      <div class="dot" style="background:${a?"#60a5fa":"var(--t4)"};${a?"box-shadow:0 0 6px rgba(96,165,250,0.4);":""}"></div>
                    </div>
                  </div>
                `})}
            </div>
          `:N`
            <div class="banner">
              <ha-icon .icon=${"mdi:speaker-off"}></ha-icon>
              <span>${Ne("media.no_players")}</span>
            </div>
          `}

          <!-- Extra entities -->
          <div class="section-label">${Ne("config.media_extra_entities")} (${t.length})</div>
          <div class="section-desc">${Ne("config.media_extra_entities_desc")}</div>
          ${t.length>0?N`
            <div class="item-list">
              ${t.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return N`
                  <div class="item-card">
                    <div class="item-row">
                      <div class="item-info pw-mp-item-info">
                        <span class="item-name">${i}</span>
                        <span class="item-meta">${e}</span>
                      </div>
                      <button
                        class="btn-icon xs"
                        @click=${()=>this._removeMediaExtraEntity(e)}
                        aria-label="${Ne("common.hide")} ${i}"
                      >
                        <ha-icon .icon=${"mdi:close"}></ha-icon>
                      </button>
                    </div>
                  </div>
                `})}
            </div>
          `:N`
            <div class="banner">
              <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
              <span>${Ne("config.media_no_extra")}</span>
            </div>
          `}

          <!-- Add extra entity dropdown -->
          <div class="dropdown ${this._mediaAddDropdownOpen?"open":""}">
            <button
              class="dropdown-trigger"
              @click=${()=>{this._mediaAddDropdownOpen=!this._mediaAddDropdownOpen,this._mediaEntitySearch=""}}
              aria-expanded=${this._mediaAddDropdownOpen?"true":"false"}
              aria-haspopup="listbox"
            >
              <ha-icon .icon=${"mdi:plus"}></ha-icon>
              <span>${Ne("config.media_add_extra")}</span>
              <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
            </button>
            <div class="dropdown-menu" role="listbox">
              <input
                type="text"
                class="dropdown-search"
                placeholder="${Ne("config.search_entity")}"
                .value=${this._mediaEntitySearch??""}
                @input=${e=>{this._mediaEntitySearch=e.target.value}}
                @click=${e=>e.stopPropagation()}
              />
              ${s.slice(0,20).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return N`
                  <button
                    class="dropdown-item"
                    role="option"
                    @click=${()=>{this._addMediaExtraEntity(e),this._mediaAddDropdownOpen=!1}}
                  >
                    <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                    ${i}
                  </button>
                `})}
              ${0===s.length?N`
                <div class="pw-mp-empty-msg">—</div>
              `:B}
            </div>
          </div>
        `:B}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `}}ft([ue()],vt.prototype,"_mediaShowHeader"),ft([ue()],vt.prototype,"_mediaExtraEntities"),ft([ue()],vt.prototype,"_mediaRoom"),ft([ue()],vt.prototype,"_mediaRoomNativePlayers"),ft([ue()],vt.prototype,"_mediaAddDropdownOpen"),ft([ue()],vt.prototype,"_mediaEntitySearch");try{customElements.define("config-tab-media",vt)}catch{}var bt=Object.defineProperty,yt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&bt(t,i,s),s};class wt extends lt{constructor(){super(...arguments),this._fanShowHeader=!0,this._fanRoom="",this._fanRoomEntities=[],this._dragIdx=null,this._dropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_fanShowHeader","_fanRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._fanRoom=this.areaId,this._loadRoomFans()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._fanShowHeader=t.show_header??!0}collectSaveData(){return{show_header:this._fanShowHeader}}async _performSave(){if(await this.backend.send("set_fan_config",this.collectSaveData()),this._fanRoom&&this._fanRoomEntities.length>0){const e=new Set(this._fanRoomEntities.map(e=>e.entityId)),t=this._fanRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),i=this._fanRoomEntities.map(e=>e.entityId),a={};for(const r of this._fanRoomEntities)a[r.entityId]=r.layout;await this._saveRoomEntities(this._fanRoom,e,t,i,a)}me.emit("fan-config-changed",void 0)}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.fan_card&&this.loadFromConfig(e.fan_card)}catch{}await this._loadRoomFans()}}async _loadRoomFans(){if(!this.backend||!this._fanRoom||!this.hass)return;const e=this._fanRoom,t=et(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("fan.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._fanRoom!==e)return;const a=new Set(i?.hidden_entities??[]),r=i?.entity_order??[],s=i?.entity_layouts??{},o=[...t].sort((e,t)=>{const i=r.indexOf(e),a=r.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._fanRoomEntities=o.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i,visible:!a.has(e),layout:s[e]||"compact"}})}_toggleEntityVisibility(e){this._fanRoomEntities=this._fanRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLayout(e){this._fanRoomEntities=this._fanRoomEntities.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_onLocalDragStart(e){this._dragIdx=e,this._dragContext="fans"}_onLocalDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onLocalDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"fans"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._fanRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._fanRoomEntities=i,this._dragIdx=null,this._dropIdx=null}renderTab(){return this._lang,this.hass?N`
      <div class="tab-panel" id="panel-fan">
        <glass-fan-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-fan-card>
        <div class="section-label">${Ne("config.behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._fanShowHeader?"true":"false"}
            @click=${()=>{this._fanShowHeader=!this._fanShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.fan_show_header")}</div>
              <div class="feature-desc">${Ne("config.fan_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._fanShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <!-- Per-room fan config -->
        <div class="section-label">${Ne("config.fan_room")}</div>
        <div class="section-desc">${Ne("config.fan_room_desc")}</div>

        ${this._fanRoom?N`
          ${this._fanRoomEntities.length>0?N`
            <div class="section-label">${Ne("config.fan_list_title")} (${this._fanRoomEntities.length})</div>
            <div class="section-desc">${Ne("config.fan_list_banner")}</div>
            <div class="item-list">
              ${this._fanRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"fans"===this._dragContext,a=this._dropIdx===t&&"fans"===this._dragContext,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return N`
                  <div class="item-card">
                    <div
                      class=${r}
                      draggable="true"
                      @dragstart=${()=>this._onLocalDragStart(t)}
                      @dragover=${e=>this._onLocalDragOver(t,e)}
                      @dragleave=${()=>this._onLocalDragLeave()}
                      @drop=${e=>this._onLocalDrop(t,e)}
                      @dragend=${()=>this._onLocalDragEnd()}
                    >
                      <span class="drag-handle">
                        <ha-icon .icon=${"mdi:drag"}></ha-icon>
                      </span>
                      <div class="item-info">
                        <span class="item-name">${e.name}</span>
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                      <button
                        class="layout-btn"
                        @click=${()=>this._cycleLayout(e.entityId)}
                        aria-label="${Ne("config.light_change_layout_aria")}"
                        title="${Ne("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
                      >
                        ${Ne("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
                      </button>
                      <button
                        class="toggle ${e.visible?"on":""}"
                        @click=${()=>this._toggleEntityVisibility(e.entityId)}
                        role="switch"
                        aria-checked=${e.visible?"true":"false"}
                        aria-label="${e.visible?Ne("common.hide"):Ne("common.show")} ${e.name}"
                      ></button>
                    </div>
                  </div>
                `})}
            </div>
          `:N`
            <div class="banner">
              <ha-icon .icon=${"mdi:fan-off"}></ha-icon>
              <span>${Ne("config.fan_no_fans")}</span>
            </div>
          `}
        `:B}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `:N``}}yt([ue()],wt.prototype,"_fanShowHeader"),yt([ue()],wt.prototype,"_fanRoom"),yt([ue()],wt.prototype,"_fanRoomEntities"),yt([ue()],wt.prototype,"_dragIdx"),yt([ue()],wt.prototype,"_dropIdx"),yt([ue()],wt.prototype,"_dragContext");try{customElements.define("config-tab-fan",wt)}catch{}var xt=Object.defineProperty,kt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&xt(t,i,s),s};class $t extends lt{constructor(){super(...arguments),this._presenceShowHeader=!0,this._presencePersonEntities=[],this._presenceSmartphoneSensors={},this._presenceNotifyServices={},this._presenceDrivingSensors={},this._presenceDropdownOpen=null,this._presenceDropdownSearch="",this._personDragIdx=null,this._personDropIdx=null,this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this)}static{this._AUTO_SAVE_KEYS=new Set(["_presenceShowHeader","_presencePersonEntities","_presenceSmartphoneSensors","_presenceNotifyServices","_presenceDrivingSensors"])}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseDropdowns)}updated(e){super.updated(e),this._checkAutoSave(e)}_closeDropdownsOnOutsideClick(e){if(!this._presenceDropdownOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown");for(const r of a)if(t.includes(r))return;this._presenceDropdownOpen=null}loadFromConfig(e){const t=e;this._presenceShowHeader=t.show_header??!0,this._presencePersonEntities=t.person_entities??[],this._presenceSmartphoneSensors=t.smartphone_sensors??{},this._presenceNotifyServices=t.notify_services??{},this._presenceDrivingSensors=t.driving_sensors??{}}collectSaveData(){return{show_header:this._presenceShowHeader,person_entities:this._presencePersonEntities,smartphone_sensors:this._presenceSmartphoneSensors,notify_services:this._presenceNotifyServices,driving_sensors:this._presenceDrivingSensors}}async _performSave(){await this.backend.send("set_presence_config",this.collectSaveData()),me.emit("presence-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.presence_card&&this.loadFromConfig(e.presence_card)}catch{}}_getAvailablePersonEntities(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableSmartphoneSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("phone")||e.includes("mobile")||e.includes("smartphone")||e.includes("tablet")||e.includes("iphone")||e.includes("galaxy")||e.includes("pixel")||e.includes("oneplus"))).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableDrivingSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("binary_sensor.")).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableNotifyServices(){if(!this.hass)return[];const e=this.hass.services;return Object.keys(e?.notify??{}).map(e=>`notify.${e}`).sort()}_getOrderedPersons(e){if(0===this._presencePersonEntities.length)return e;const t=new Map(this._presencePersonEntities.map((e,t)=>[e,t]));return[...e].sort((e,i)=>{const a=t.get(e.entityId)??999,r=t.get(i.entityId)??999;return a!==r?a-r:e.name.localeCompare(i.name)})}_onPersonDrop(e){if(null===this._personDragIdx||this._personDragIdx===e)return this._personDragIdx=null,void(this._personDropIdx=null);const t=this._getAvailablePersonEntities(),i=this._getOrderedPersons(t).map(e=>e.entityId),[a]=i.splice(this._personDragIdx,1);i.splice(e,0,a),this._presencePersonEntities=i,this._personDragIdx=null,this._personDropIdx=null}_togglePresencePerson(e){const t=this._getAvailablePersonEntities();if(0===this._presencePersonEntities.length)this._presencePersonEntities=t.map(e=>e.entityId).filter(t=>t!==e);else{const t=new Set(this._presencePersonEntities);if(t.has(e)){if(t.size<=1)return void(this._presencePersonEntities=[]);t.delete(e)}else t.add(e);this._presencePersonEntities=[...t]}}renderTab(){this._lang;const e=this._getAvailablePersonEntities(),t=this._presencePersonEntities.length>0?this._presencePersonEntities:e.map(e=>e.entityId),i=this._getAvailableSmartphoneSensors(),a=this._getAvailableDrivingSensors(),r=this._getAvailableNotifyServices();return N`
      <div class="tab-panel" id="panel-presence">
        <glass-presence-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-presence-card>
        <!-- Behaviour -->
        <div class="section-label">${Ne("config.behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._presenceShowHeader?"true":"false"}
            @click=${()=>{this._presenceShowHeader=!this._presenceShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.presence_show_header")}</div>
              <div class="feature-desc">${Ne("config.presence_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._presenceShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <!-- Person entities -->
        <div class="section-label">${Ne("config.presence_persons")}</div>
        <div class="section-desc">${Ne("config.presence_persons_desc")}</div>

        ${0===e.length?N`
          <div class="preview-empty">${Ne("config.presence_no_persons")}</div>
        `:N`
          <div class="item-list">
            ${this._getOrderedPersons(e).map((e,t)=>{const i=this._presencePersonEntities.includes(e.entityId),a=0===this._presencePersonEntities.length,r=this._personDragIdx===t,s=this._personDropIdx===t&&null!==this._personDragIdx&&this._personDragIdx!==t;return N`
                <div class="item-card">
                  <div class="item-row ${i||a?"":"disabled"} ${r?"dragging":""} ${s?"drop-target":""}"
                    draggable="true"
                    @dragstart=${()=>{this._personDragIdx=t}}
                    @dragover=${e=>{e.preventDefault(),this._personDropIdx=t}}
                    @dragleave=${()=>{this._personDropIdx=null}}
                    @drop=${e=>{e.preventDefault(),this._onPersonDrop(t)}}
                    @dragend=${()=>{this._personDragIdx=null,this._personDropIdx=null}}
                  >
                    <span class="drag-handle"><ha-icon .icon=${"mdi:drag"}></ha-icon></span>
                    <div class="feature-icon">
                      <ha-icon .icon=${"mdi:account"}></ha-icon>
                    </div>
                    <div class="item-info">
                      <span class="item-name">${e.name}</span>
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <button
                      class="toggle ${i||a?"on":""}"
                      @click=${()=>this._togglePresencePerson(e.entityId)}
                      role="switch"
                      aria-checked=${i||a?"true":"false"}
                      aria-label="${e.name}"
                    ></button>
                  </div>
                </div>
              `})}
          </div>
        `}

        <!-- Per-person sensor mapping -->
        <div class="section-label">${Ne("config.presence_smartphone")}</div>
        <div class="section-desc">${Ne("config.presence_smartphone_desc")}</div>

        ${t.map(t=>{const s=e.find(e=>e.entityId===t);if(!s)return B;const o=this._presenceSmartphoneSensors[t]||"",n=this._presenceNotifyServices[t]||"",c=this._presenceDrivingSensors[t]||"",l=i.find(e=>e.entityId===o)?.name,d=a.find(e=>e.entityId===c)?.name,h=`${t}:smartphone`,p=`${t}:notify`,u=`${t}:driving`;return N`
            <div class="presence-mapping-card">
              <div class="presence-mapping-header">
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:account"}></ha-icon>
                </div>
                <span class="item-name">${s.name}</span>
              </div>

              <div class="presence-mapping-field">
                <div class="dropdown ${this._presenceDropdownOpen===h?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===h?null:h}}
                    aria-expanded=${this._presenceDropdownOpen===h?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:cellphone"}></ha-icon>
                    <span>${l||o||Ne("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${Ne("config.search_entity")}
                      .value=${this._presenceDropdownOpen===h?this._presenceDropdownSearch:""}
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
                      ${Ne("config.presence_auto_detect")}
                    </button>
                    ${i.filter(e=>!this._presenceDropdownSearch||e.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())||e.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>N`
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
                <div class="dropdown ${this._presenceDropdownOpen===p?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===p?null:p}}
                    aria-expanded=${this._presenceDropdownOpen===p?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:bell"}></ha-icon>
                    <span>${n||Ne("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${Ne("config.search_entity")}
                      .value=${this._presenceDropdownOpen===p?this._presenceDropdownSearch:""}
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
                      ${Ne("config.presence_auto_detect")}
                    </button>
                    ${r.filter(e=>!this._presenceDropdownSearch||e.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>N`
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
                <div class="dropdown ${this._presenceDropdownOpen===u?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===u?null:u}}
                    aria-expanded=${this._presenceDropdownOpen===u?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:car"}></ha-icon>
                    <span>${d||c||Ne("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${Ne("config.search_entity")}
                      .value=${this._presenceDropdownOpen===u?this._presenceDropdownSearch:""}
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
                      ${Ne("config.presence_auto_detect")}
                    </button>
                    ${a.filter(e=>!this._presenceDropdownSearch||e.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())||e.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>N`
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
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `}}kt([ue()],$t.prototype,"_presenceShowHeader"),kt([ue()],$t.prototype,"_presencePersonEntities"),kt([ue()],$t.prototype,"_presenceSmartphoneSensors"),kt([ue()],$t.prototype,"_presenceNotifyServices"),kt([ue()],$t.prototype,"_presenceDrivingSensors"),kt([ue()],$t.prototype,"_presenceDropdownOpen"),kt([ue()],$t.prototype,"_presenceDropdownSearch"),kt([ue()],$t.prototype,"_personDragIdx"),kt([ue()],$t.prototype,"_personDropIdx");try{customElements.define("config-tab-presence",$t)}catch{}var St=Object.defineProperty,Ct=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&St(t,i,s),s};class It extends lt{constructor(){super(...arguments),this._spotifyShowHeader=!0,this._spotifyEntity="",this._spotifySortOrder="recent_first",this._spotifyDropdownOpen=!1,this._spotifyMaxItems=6,this._spotifyVisibleSpeakers=[],this._spotifyConfigured=null,this._localDragIdx=null,this._localDropIdx=null,this._localDragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_spotifyShowHeader","_spotifyEntity","_spotifySortOrder","_spotifyMaxItems","_spotifyVisibleSpeakers"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._spotifyShowHeader=t.show_header??!0,this._spotifyEntity=t.entity_id??"",this._spotifySortOrder="oldest_first"===t.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=t.max_items_per_section??6,this._spotifyVisibleSpeakers=t.visible_speakers??[],this._checkSpotifyStatus()}collectSaveData(){return{show_header:this._spotifyShowHeader,...this._spotifyEntity?{entity_id:this._spotifyEntity}:{},sort_order:this._spotifySortOrder,max_items_per_section:this._spotifyMaxItems,visible_speakers:this._spotifyVisibleSpeakers}}async _performSave(){await this.backend.send("set_spotify_config",this.collectSaveData()),me.emit("spotify-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.spotify_card&&this.loadFromConfig(e.spotify_card)}catch{}}async _checkSpotifyStatus(){if(this.backend)try{const e=await this.backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}_selectEntity(e){this._spotifyEntity=e,this._spotifyDropdownOpen=!1}_toggleSpeaker(e){this._spotifyVisibleSpeakers.includes(e)?this._spotifyVisibleSpeakers=this._spotifyVisibleSpeakers.filter(t=>t!==e):this._spotifyVisibleSpeakers=[...this._spotifyVisibleSpeakers,e]}_onLocalDragStart(e){this._localDragIdx=e,this._localDragContext="speakers"}_onLocalDragOver(e,t){t.preventDefault(),this._localDropIdx=e,this.requestUpdate()}_onLocalDragLeave(){this._localDropIdx=null,this.requestUpdate()}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null,this._localDragContext="",this.requestUpdate()}_onDropSpeaker(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e||"speakers"!==this._localDragContext)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this._spotifyVisibleSpeakers];if(this._localDragIdx>=i.length||e>=i.length)return this._localDragIdx=null,void(this._localDropIdx=null);const[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._spotifyVisibleSpeakers=i,this._localDragIdx=null,this._localDropIdx=null}_renderSetupGuide(){return N`
      <div class="tab-panel" id="panel-spotify">
        <div class="pw-sp-setup-box">
          <ha-icon .icon=${"mdi:spotify"} class="pw-sp-setup-icon"></ha-icon>
          <div class="pw-sp-setup-title">
            ${Ne("config.spotify_not_configured")}
          </div>
          <div class="pw-sp-setup-desc">
            ${Ne("config.spotify_setup_guide")}
          </div>

          <div class="pw-sp-steps">
            ${[1,2,3,4].map(e=>N`
              <div class="pw-sp-step">
                <span class="pw-sp-step-num">${e}</span>
                <span class="pw-sp-step-text">
                  ${Ne(`config.spotify_setup_step${e}`)}
                </span>
              </div>
            `)}
          </div>

          <div class="pw-sp-note">
            ${Ne("config.spotify_setup_note")}
          </div>

          <button
            class="btn btn-accent pw-sp-setup-btn"
            @click=${()=>{window.open("/config/integrations/dashboard","_blank")}}
          >
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
            ${Ne("config.spotify_open_settings")}
          </button>
        </div>
      </div>
    `}renderTab(){if(this._lang,null===this._spotifyConfigured)return N`
        <div class="tab-panel" id="panel-spotify">
          <div class="preview-empty">${Ne("config.spotify_checking")}</div>
        </div>
      `;if(!1===this._spotifyConfigured)return this._renderSetupGuide();const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort():[],t=e.find(e=>e===this._spotifyEntity);return N`
      <div class="tab-panel" id="panel-spotify">
        <glass-spotify-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-spotify-card>
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked="${this._spotifyShowHeader?"true":"false"}"
            @click=${()=>{this._spotifyShowHeader=!this._spotifyShowHeader}}>
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.spotify_show_header")}</div>
              <div class="feature-desc">${Ne("config.spotify_show_header_desc")}</div>
            </div>
            <span class="toggle ${this._spotifyShowHeader?"on":""}"></span>
          </button>
        </div>

        <div class="section-label">${Ne("config.spotify_entity")}</div>
        <div class="section-desc">${Ne("config.spotify_entity_desc")}</div>
        <div class="dropdown ${this._spotifyDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._spotifyDropdownOpen=!this._spotifyDropdownOpen}
            aria-expanded=${this._spotifyDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:spotify"} class="pw-sp-entity-icon"></ha-icon>
            <span>${t||Ne("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>N`
                <button
                  class="dropdown-item ${e===this._spotifyEntity?"active":""}"
                  role="option"
                  aria-selected=${e===this._spotifyEntity?"true":"false"}
                  @click=${()=>this._selectEntity(e)}
                >
                  <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>

        <div class="section-label">${Ne("config.spotify_sort_order")}</div>
        <div class="section-desc">${Ne("config.spotify_sort_order_desc")}</div>
        <div class="segmented">
          <button class="seg-btn ${"recent_first"===this._spotifySortOrder?"active":""}"
            @click=${()=>{this._spotifySortOrder="recent_first"}}>
            ${Ne("config.spotify_sort_recent")}
          </button>
          <button class="seg-btn ${"oldest_first"===this._spotifySortOrder?"active":""}"
            @click=${()=>{this._spotifySortOrder="oldest_first"}}>
            ${Ne("config.spotify_sort_oldest")}
          </button>
        </div>

        <div class="section-label">${Ne("config.spotify_max_items")}</div>
        <div class="section-desc">${Ne("config.spotify_max_items_desc")}</div>
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

        <div class="section-label">${Ne("config.spotify_speakers")}</div>
        <div class="section-desc">${Ne("config.spotify_speakers_desc")}</div>
        ${this._renderSpeakerList()}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `}_renderSpeakerList(){const e=this.hass?Object.entries(this.hass.states).filter(([e])=>e.startsWith("media_player.")).map(([e,t])=>({entityId:e,name:t.attributes.friendly_name??e,visible:this._spotifyVisibleSpeakers.includes(e)})):[],t=[...this._spotifyVisibleSpeakers.map(t=>e.find(e=>e.entityId===t)).filter(e=>!!e),...e.filter(e=>!e.visible).sort((e,t)=>e.name.localeCompare(t.name))];return N`
      <div class="item-list">
        ${t.map(e=>{const t=e.visible,i=t?this._spotifyVisibleSpeakers.indexOf(e.entityId):-1,a=this._localDragIdx===i&&-1!==i&&"speakers"===this._localDragContext,r=this._localDropIdx===i&&-1!==i&&"speakers"===this._localDragContext,s=["item-row",t?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return N`
            <div
              class=${s}
              draggable=${t?"true":"false"}
              @dragstart=${()=>{t&&-1!==i&&this._onLocalDragStart(i)}}
              @dragover=${e=>{t&&-1!==i&&this._onLocalDragOver(i,e)}}
              @dragleave=${()=>this._onLocalDragLeave()}
              @drop=${e=>{t&&-1!==i&&this._onDropSpeaker(i,e)}}
              @dragend=${()=>this._onLocalDragEnd()}
            >
              ${t?N`
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
              `:N`<span class="pw-sp-drag-spacer"></span>`}
              <div class="item-info">
                <span class="item-name">${e.name}</span>
                <span class="item-meta">${e.entityId}</span>
              </div>
              <button
                class="toggle ${t?"on":""}"
                @click=${()=>this._toggleSpeaker(e.entityId)}
                role="switch"
                aria-checked=${t?"true":"false"}
                aria-label="${Ne(t?"common.hide":"common.show")} ${e.name}"
              ></button>
            </div>
          `})}
      </div>
    `}}Ct([ue()],It.prototype,"_spotifyShowHeader"),Ct([ue()],It.prototype,"_spotifyEntity"),Ct([ue()],It.prototype,"_spotifySortOrder"),Ct([ue()],It.prototype,"_spotifyDropdownOpen"),Ct([ue()],It.prototype,"_spotifyMaxItems"),Ct([ue()],It.prototype,"_spotifyVisibleSpeakers"),Ct([ue()],It.prototype,"_spotifyConfigured");try{customElements.define("config-tab-spotify",It)}catch{}var Et=Object.defineProperty,Dt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Et(t,i,s),s};const zt=[{key:"input_select",i18nKey:"config.title_source_input_select",icon:"mdi:form-select"},{key:"scenes",i18nKey:"config.title_source_scenes",icon:"mdi:palette"},{key:"booleans",i18nKey:"config.title_source_booleans",icon:"mdi:toggle-switch"}],Pt=["neutral","success","warning","info","accent","alert"],Tt={success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t4)"},Lt={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},At={icon:"mdi:clock-outline"};class Mt extends lt{constructor(){super(...arguments),this._titleText="",this._titleSources=[],this._titlePeriodEntity="",this._titlePeriodOptions=[],this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._titlePeriodDropdownOpen=!1,this._periodIconPopupIdx=null,this._iconPopupModeIdx=null,this._iconSearch="",this._titleAddEntitySearch="",this._titlePeriodSearch="",this._iconList=[],this._iconLoading=!1,this._portalEl=null,this._dragIdx=null,this._dropIdx=null,this._dragContext="",this._dragModeSrcIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_titleText","_titleSources","_titlePeriodEntity","_titlePeriodOptions"])}get _titleModes(){return this._titleSources.flatMap(e=>e.modes)}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._titleText=t.title??"",this._titlePeriodEntity=t.period_entity??"",this._titlePeriodOptions=(t.period_options??[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||""})),this._titleSources=(t.sources??[]).map(e=>({source_type:e.source_type||"",entity:e.entity||"",label:e.label||"",modes:(e.modes||[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"}))}))}collectSaveData(){return{title:this._titleText,period_entity:this._titlePeriodEntity,period_options:this._titlePeriodOptions,sources:this._titleSources.map(e=>({source_type:e.source_type,entity:e.entity||"",label:e.label||"",modes:e.modes}))}}async _performSave(){await this.backend.send("set_title_config",this.collectSaveData()),me.emit("title-config-changed",void 0)}async reload(){if(this.backend){this._iconPopupModeIdx=null,this._periodIconPopupIdx=null,this._removeIconPortal(),this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1;try{const e=await this.backend.send("get_config");e?.title_card&&this.loadFromConfig(e.title_card)}catch{}}}_localDragStart(e,t,i){this._dragIdx=e,this._dragContext=t,"title_modes"===t&&(this._dragModeSrcIdx=i??null)}_localDragOver(e,t,i){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&("title_modes"===this._dragContext&&void 0!==i&&i!==this._dragModeSrcIdx||(this._dropIdx=e))}_localDragLeave(){this._dropIdx=null}_localDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("title_sources"===i){const t=[...this._titleSources],[i]=t.splice(this._dragIdx,1);if(t.splice(e,0,i),this._titleSources=t,this._titleEditingSourceIdx===this._dragIdx)this._titleEditingSourceIdx=e;else if(null!==this._titleEditingSourceIdx){const t=this._titleEditingSourceIdx,i=this._dragIdx;i<t&&e>=t?this._titleEditingSourceIdx=t-1:i>t&&e<=t&&(this._titleEditingSourceIdx=t+1)}}else if("title_modes"===i&&null!==this._dragModeSrcIdx){const t=[...this._titleSources],i=t[this._dragModeSrcIdx];if(i){const a=[...i.modes],[r]=a.splice(this._dragIdx,1);a.splice(e,0,r),t[this._dragModeSrcIdx]={...i,modes:a},this._titleSources=t}this._dragModeSrcIdx=null}this._dragIdx=null,this._dropIdx=null}_localDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragModeSrcIdx=null}_addTitleSource(e){this._titleAddSourceDropdownOpen=!1,this._titleSources=[...this._titleSources,{source_type:e,entity:"",label:"",modes:[]}],this._titleEditingSourceIdx=this._titleSources.length-1}_removeTitleSource(e){const t=[...this._titleSources];t.splice(e,1),this._titleSources=t,this._titleEditingSourceIdx===e?this._titleEditingSourceIdx=null:null!==this._titleEditingSourceIdx&&this._titleEditingSourceIdx>e&&this._titleEditingSourceIdx--}_setTitleSourceEntity(e,t){this._titleAddEntityDropdownOpen=!1;const i=[...this._titleSources];if(i[e]){if(i[e]={...i[e],entity:t},t.startsWith("input_select.")&&this.hass){const a=this.hass.states[t];if(a){const t=a.attributes.options??[],r=new Map(i[e].modes.map(e=>[e.id,e]));i[e]={...i[e],modes:t.map(e=>r.get(e)??{id:e,label:e,icon:"",color:"neutral"})}}}else t||(i[e]={...i[e],modes:[]});this._titleSources=i}}_setTitleSourceLabel(e,t){const i=[...this._titleSources];i[e]&&(i[e]={...i[e],label:t},this._titleSources=i)}_addTitleModeEntity(e,t){this._titleAddEntityDropdownOpen=!1;const i=[...this._titleSources];if(!i[e])return;if(i[e].modes.some(e=>e.id===t))return;const a=this.hass?.states[t],r=a?.attributes.friendly_name||t.split(".")[1]||t,s=t.startsWith("scene.")?"mdi:palette":"mdi:toggle-switch",o=t.startsWith("scene.")?"accent":"success";i[e]={...i[e],modes:[...i[e].modes,{id:t,label:r,icon:s,color:o}]},this._titleSources=i}_removeTitleModeEntity(e,t){const i=[...this._titleSources];i[e]&&(i[e]={...i[e],modes:i[e].modes.filter(e=>e.id!==t)},this._titleSources=i)}_updateTitleMode(e,t,i){let a=e;const r=[...this._titleSources];for(let s=0;s<r.length;s++){if(a<r[s].modes.length){const e=[...r[s].modes];return e[a]={...e[a],[t]:i},r[s]={...r[s],modes:e},void(this._titleSources=r)}a-=r[s].modes.length}}_setTitlePeriodEntity(e){if(this._titlePeriodDropdownOpen=!1,this._titlePeriodEntity=e,e&&this.hass){const t=this.hass.states[e];if(t){const e=t.attributes.options??[],i=new Map(this._titlePeriodOptions.map(e=>[e.id,e]));this._titlePeriodOptions=e.map(e=>i.get(e)??{id:e,label:e,icon:"",color:""})}}else e||(this._titlePeriodOptions=[])}_updateTitlePeriodOption(e,t,i){const a=[...this._titlePeriodOptions];a[e]&&(a[e]={...a[e],[t]:i},this._titlePeriodOptions=a)}async _openIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),e<this._titleModes.length&&(this._iconSearch="",this._iconPopupModeIdx=e,this._showIconPortal()))}async _openPeriodIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),e<this._titlePeriodOptions.length&&(this._iconSearch="",this._periodIconPopupIdx=e,this._showIconPortal()))}async _loadIconList(){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim(),t=this._iconList;return e?t.filter(t=>t.toLowerCase().includes(e)).slice(0,120):t.slice(0,120)}_showIconPortal(){const e=null!==this._iconPopupModeIdx,t=null!==this._periodIconPopupIdx;if(!e&&!t)return void this._removeIconPortal();const i=this._getFilteredIcons(),a=this._iconPopupModeIdx,r=this._periodIconPopupIdx,s=e&&null!==a?this._titleModes[a]?.icon??"":null!==r?this._titlePeriodOptions[r]?.icon??"":"";this._portalEl||(this._portalEl=document.createElement("div"),document.body.appendChild(this._portalEl));const o=()=>{this._iconPopupModeIdx=null,this._periodIconPopupIdx=null,this._removeIconPortal()},n=i=>{e&&null!=this._iconPopupModeIdx?this._updateTitleMode(this._iconPopupModeIdx,"icon",i):t&&null!=this._periodIconPopupIdx&&this._updateTitlePeriodOption(this._periodIconPopupIdx,"icon",i),this._removeIconPortal()},c=e=>{this._iconSearch=e,this._showIconPortal()};this._portalEl.replaceChildren(),Object.assign(this._portalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}),this._portalEl.addEventListener("click",e=>{e.target===this._portalEl&&o()},{once:!0});const l=document.createElement("div");Object.assign(l.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const d=document.createElement("div");Object.assign(d.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const h=document.createElement("span");Object.assign(h.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),h.textContent=Ne("config.title_mode_icon");const p=document.createElement("input");Object.assign(p.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),p.placeholder="mdi:...",p.value=this._iconSearch,p.addEventListener("input",()=>c(p.value)),d.appendChild(h),d.appendChild(p),l.appendChild(d);const u=document.createElement("div");Object.assign(u.style,{overflow:"auto",flex:"1",padding:"0.5rem",scrollbarWidth:"none"});const g=document.createElement("div");Object.assign(g.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const _=this._createIconBtn("mdi:cancel",""===s,.4);_.addEventListener("click",()=>n("")),g.appendChild(_);for(const m of i){const e=this._createIconBtn(m,m===s,1);e.addEventListener("click",()=>n(m)),g.appendChild(e)}if(0===i.length&&this._iconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=Ne("config.title_no_icons_found"),g.appendChild(e)}u.appendChild(g),l.appendChild(u),this._portalEl.appendChild(l),p.focus()}_createIconBtn(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",border:t?"2px solid rgba(129,140,248,0.6)":"1px solid rgba(255,255,255,0.06)",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)",cursor:"pointer",color:"rgba(255,255,255,0.88)",padding:"0"});const r=document.createElement("ha-icon");return r.icon=e,r.style.cssText=`--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${i};`,a.appendChild(r),a}_removeIconPortal(){this._portalEl&&(this._portalEl.remove(),this._portalEl=null)}disconnectedCallback(){super.disconnectedCallback(),this._removeIconPortal()}_renderSourceEditor(e,t){const i=this._titleEditingSourceIdx===t,a=zt.find(t=>t.key===e.source_type),r=e.label||(a?Ne(a.i18nKey):"")||e.source_type,s=this._dragIdx===t&&"title_sources"===this._dragContext,o=this._dropIdx===t&&"title_sources"===this._dragContext;return N`
      <div
        class="title-source-block ${s?"dragging":""} ${o?"drop-target":""}"
        draggable="true"
        @dragstart=${()=>this._localDragStart(t,"title_sources")}
        @dragover=${e=>this._localDragOver(t,e)}
        @dragleave=${()=>this._localDragLeave()}
        @drop=${e=>this._localDrop(t,e)}
        @dragend=${()=>this._localDragEnd()}
      >
        <div class="title-source-header">
          <span class="drag-handle">
            <ha-icon .icon=${"mdi:drag"}></ha-icon>
          </span>
          <ha-icon .icon=${a?.icon||"mdi:help"}></ha-icon>
          <span class="title-source-type">${r}</span>
          <span class="title-source-badge">${e.modes.length}</span>
          <button
            class="btn-icon xs title-source-actions-first"
            @click=${()=>{this._titleEditingSourceIdx=i?null:t,this._titleAddEntityDropdownOpen=!1}}
            aria-label=${Ne(i?"common.collapse":"common.expand")}
          >
            <ha-icon .icon=${i?"mdi:pencil":"mdi:pencil-outline"}></ha-icon>
          </button>
          <button
            class="btn-icon xs"
            @click=${()=>this._removeTitleSource(t)}
            aria-label=${Ne("config.title_remove_source")}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        </div>

        ${i?N`
          <div class="title-source-body">
            <!-- Label -->
            <div class="title-source-field">
              <span class="title-source-field-label">${Ne("config.title_source_label")}</span>
              <input
                class="input"
                type="text"
                .value=${e.label}
                placeholder=${a?Ne(a.i18nKey):""}
                @input=${e=>this._setTitleSourceLabel(t,e.target.value)}
              />
            </div>

            ${"input_select"===e.source_type?this._renderInputSelectEntityPicker(e,t):B}

            <!-- Mode list -->
            ${e.modes.length>0?N`
              <div class="section-label mt-sm">${Ne("config.title_modes")}</div>
              <div class="title-modes-list">
                ${e.modes.map((i,a)=>this._renderModeRow(e,t,i,a))}
              </div>
            `:B}

            ${"scenes"===e.source_type||"booleans"===e.source_type?this._renderEntityAdder(e,t):B}
          </div>
        `:B}
      </div>
    `}_renderInputSelectEntityPicker(e,t){const i=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")).sort():[];return N`
      <div class="title-source-field">
        <span class="title-source-field-label">${Ne("config.title_mode_entity")}</span>
        <div class="dropdown ${this._titleEditingSourceIdx===t&&this._titleAddEntityDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._titleAddEntityDropdownOpen||(this._titleAddEntitySearch=""),this._titleAddEntityDropdownOpen=!this._titleAddEntityDropdownOpen}}
            aria-expanded=${this._titleAddEntityDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e.entity?"mdi:form-select":"mdi:help-circle-outline"}></ha-icon>
            <span>${e.entity||Ne("config.title_select_entity")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <input
              class="dropdown-search"
              type="text"
              placeholder=${Ne("config.search_entity")}
              .value=${this._titleAddEntitySearch}
              @input=${e=>{this._titleAddEntitySearch=e.target.value,this.requestUpdate()}}
              @click=${e=>e.stopPropagation()}
            />
            <button
              class="dropdown-item ${e.entity?"":"active"}"
              role="option"
              aria-selected=${e.entity?"false":"true"}
              @click=${()=>this._setTitleSourceEntity(t,"")}
            >
              <ha-icon .icon=${"mdi:close"}></ha-icon>
              ${Ne("title_card.mode_none")}
            </button>
            ${i.filter(e=>!this._titleAddEntitySearch||e.toLowerCase().includes(this._titleAddEntitySearch.toLowerCase())).map(i=>N`
                <button
                  class="dropdown-item ${i===e.entity?"active":""}"
                  role="option"
                  aria-selected=${i===e.entity?"true":"false"}
                  @click=${()=>this._setTitleSourceEntity(t,i)}
                >
                  <ha-icon .icon=${"mdi:form-select"}></ha-icon>
                  ${i}
                </button>
              `)}
          </div>
        </div>
      </div>
    `}_renderEntityAdder(e,t){const i="scenes"===e.source_type?"scene.":"input_boolean.",a="scenes"===e.source_type?"mdi:palette":"mdi:toggle-switch",r=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith(i)).sort():[],s=new Set(e.modes.map(e=>e.id)),o=r.filter(e=>!s.has(e));return N`
      <div class="title-source-field">
        <span class="title-source-field-label">${Ne("config.title_add_entity")}</span>
        <div class="dropdown ${this._titleEditingSourceIdx===t&&this._titleAddEntityDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._titleAddEntityDropdownOpen||(this._titleAddEntitySearch=""),this._titleAddEntityDropdownOpen=!this._titleAddEntityDropdownOpen}}
            aria-expanded=${this._titleAddEntityDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:plus"}></ha-icon>
            <span>${Ne("config.title_add_entity")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <input
              class="dropdown-search"
              type="text"
              placeholder=${Ne("config.search_entity")}
              .value=${this._titleAddEntitySearch}
              @input=${e=>{this._titleAddEntitySearch=e.target.value,this.requestUpdate()}}
              @click=${e=>e.stopPropagation()}
            />
            ${o.filter(e=>!this._titleAddEntitySearch||e.toLowerCase().includes(this._titleAddEntitySearch.toLowerCase())).map(e=>N`
                <button
                  class="dropdown-item"
                  role="option"
                  @click=${()=>this._addTitleModeEntity(t,e)}
                >
                  <ha-icon .icon=${a}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>
      </div>
    `}_renderModeRow(e,t,i,a){let r=0;for(let n=0;n<t;n++)r+=this._titleSources[n].modes.length;r+=a;const s=this._dragIdx===a&&"title_modes"===this._dragContext&&this._dragModeSrcIdx===t,o=this._dropIdx===a&&"title_modes"===this._dragContext&&this._dragModeSrcIdx===t;return N`
      <div
        class="title-mode-row ${s?"dragging":""} ${o?"drop-target":""}"
        draggable="true"
        @dragstart=${()=>this._localDragStart(a,"title_modes",t)}
        @dragover=${e=>this._localDragOver(a,e,t)}
        @dragleave=${()=>this._localDragLeave()}
        @drop=${e=>this._localDrop(a,e)}
        @dragend=${()=>this._localDragEnd()}
      >
        <div class="title-mode-header">
          <span class="drag-handle">
            <ha-icon .icon=${"mdi:drag"}></ha-icon>
          </span>
          <span class="title-mode-id">${i.id}</span>
          ${"scenes"===e.source_type||"booleans"===e.source_type?N`
            <button
              class="btn-icon xs"
              @click=${()=>this._removeTitleModeEntity(t,i.id)}
              aria-label=${Ne("config.title_remove_entity")}
            >
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          `:B}
        </div>
        <div class="title-mode-fields-row">
          <input
            class="input"
            type="text"
            placeholder=${Ne("config.title_mode_label")}
            .value=${i.label}
            @input=${e=>this._updateTitleMode(r,"label",e.target.value)}
          />
          <button
            class="title-icon-btn ${i.icon?"has-icon":""}"
            @click=${()=>this._openIconPopup(r)}
            aria-label="${Ne("config.title_mode_icon")}"
          >
            <ha-icon .icon=${i.icon||"mdi:emoticon-outline"}></ha-icon>
          </button>
        </div>
        <div class="title-color-row">
          <span class="title-color-label">${Ne("config.title_mode_color")}</span>
          <div class="title-color-chips">
            ${Pt.map(e=>N`
              <button
                class="title-color-chip ${e} ${i.color===e?"active":""}"
                @click=${()=>this._updateTitleMode(r,"color",e)}
                aria-label="${Ne("config.title_mode_color")}: ${e}"
              ></button>
            `)}
          </div>
        </div>
      </div>
    `}_renderPeriodEntityPicker(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")).sort():[],t=this._titlePeriodEntity;return N`
      <div class="dropdown ${this._titlePeriodDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{this._titlePeriodDropdownOpen||(this._titlePeriodSearch=""),this._titlePeriodDropdownOpen=!this._titlePeriodDropdownOpen}}
          aria-expanded=${this._titlePeriodDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?"mdi:form-select":"mdi:clock-outline"}></ha-icon>
          <span>${t||Ne("config.title_period_auto")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${Ne("config.search_entity")}
            .value=${this._titlePeriodSearch}
            @input=${e=>{this._titlePeriodSearch=e.target.value,this.requestUpdate()}}
            @click=${e=>e.stopPropagation()}
          />
          <button
            class="dropdown-item ${t?"":"active"}"
            role="option"
            aria-selected=${t?"false":"true"}
            @click=${()=>this._setTitlePeriodEntity("")}
          >
            <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
            ${Ne("config.title_period_auto")}
          </button>
          ${e.filter(e=>!this._titlePeriodSearch||e.toLowerCase().includes(this._titlePeriodSearch.toLowerCase())).map(e=>N`
              <button
                class="dropdown-item ${e===t?"active":""}"
                role="option"
                aria-selected=${e===t?"true":"false"}
                @click=${()=>this._setTitlePeriodEntity(e)}
              >
                <ha-icon .icon=${"mdi:form-select"}></ha-icon>
                ${e}
              </button>
            `)}
        </div>
      </div>
    `}_renderPeriodOptionsEditor(){const e=this._titlePeriodEntity||"",t=this.hass?.states[e],i=t?.attributes?.options??[];if(0===i.length)return B;const a=new Map(this._titlePeriodOptions.map(e=>[e.id,e]));return N`
      <div class="section-label mt-md">${Ne("config.title_period_options")}</div>
      <div class="section-desc">${Ne("config.title_period_options_desc")}</div>
      <div class="title-modes-list">
        ${i.map(e=>{const t=a.get(e),i=this._titlePeriodOptions.findIndex(t=>t.id===e),r=t?.icon||"",s=t?.color||"",o=Lt[e]||At;return-1===i?(this._titlePeriodOptions=[...this._titlePeriodOptions,{id:e,label:e,icon:"",color:""}],B):N`
            <div class="title-mode-row">
              <div class="title-mode-header">
                <ha-icon .icon=${r||o.icon} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;color:${n=s||Lt[e]?.color||"neutral",Tt[n]??(n.startsWith("#")?n:"var(--t4)")}"></ha-icon>
                <span class="title-mode-id">${e}</span>
              </div>
              <div class="title-mode-fields-row">
                <button
                  class="title-icon-btn ${r?"has-icon":""}"
                  @click=${()=>this._openPeriodIconPopup(i)}
                  aria-label="${Ne("config.title_mode_icon")}"
                >
                  <ha-icon .icon=${r||"mdi:emoticon-outline"}></ha-icon>
                </button>
              </div>
              <div class="title-color-row">
                <span class="title-color-label">${Ne("config.title_mode_color")}</span>
                <div class="title-color-chips">
                  ${Pt.map(e=>N`
                    <button
                      class="title-color-chip ${e} ${s===e?"active":""}"
                      @click=${()=>this._updateTitlePeriodOption(i,"color",e)}
                      aria-label="${Ne("config.title_mode_color")}: ${e}"
                    ></button>
                  `)}
                </div>
              </div>
            </div>
          `;var n})}
      </div>
    `}renderTab(){this._lang;const e=this._titleSources;return N`
      <div class="tab-panel" id="panel-title">
        <glass-title-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-title-card>
        <div class="section-label">${Ne("config.title_title")}</div>
        <div class="section-desc">${Ne("config.title_title_desc")}</div>
        <input
          class="input"
          type="text"
          .value=${this._titleText}
          placeholder=${Ne("config.title_title_placeholder")}
          @input=${e=>{this._titleText=e.target.value}}
        />

        <div class="section-label mt-md">${Ne("config.title_mode_source")}</div>
        <div class="section-desc">${Ne("config.title_mode_source_desc")}</div>

        <!-- Existing sources -->
        ${e.map((e,t)=>this._renderSourceEditor(e,t))}

        <!-- Add source button -->
        <div class="mt-md">
          <div class="dropdown ${this._titleAddSourceDropdownOpen?"open":""}">
            <button
              class="dropdown-trigger"
              @click=${()=>{this._titleAddSourceDropdownOpen=!this._titleAddSourceDropdownOpen}}
              aria-expanded=${this._titleAddSourceDropdownOpen?"true":"false"}
              aria-haspopup="listbox"
            >
              <ha-icon .icon=${"mdi:plus"}></ha-icon>
              <span>${Ne("config.title_add_source")}</span>
              <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
            </button>
            <div class="dropdown-menu" role="listbox">
              ${zt.map(e=>N`
                <button
                  class="dropdown-item"
                  role="option"
                  @click=${()=>this._addTitleSource(e.key)}
                >
                  <ha-icon .icon=${e.icon}></ha-icon>
                  ${Ne(e.i18nKey)}
                </button>
              `)}
            </div>
          </div>
        </div>

        <!-- Period indicator -->
        <div class="section-label mt-lg">${Ne("config.title_period_entity")}</div>
        <div class="section-desc">${Ne("config.title_period_entity_desc")}</div>
        ${this._renderPeriodEntityPicker()}

        ${this._renderPeriodOptionsEditor()}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `}}Dt([ue()],Mt.prototype,"_titleText"),Dt([ue()],Mt.prototype,"_titleSources"),Dt([ue()],Mt.prototype,"_titlePeriodEntity"),Dt([ue()],Mt.prototype,"_titlePeriodOptions"),Dt([ue()],Mt.prototype,"_titleEditingSourceIdx"),Dt([ue()],Mt.prototype,"_titleAddSourceDropdownOpen"),Dt([ue()],Mt.prototype,"_titleAddEntityDropdownOpen"),Dt([ue()],Mt.prototype,"_titlePeriodDropdownOpen"),Dt([ue()],Mt.prototype,"_periodIconPopupIdx"),Dt([ue()],Mt.prototype,"_iconPopupModeIdx"),Dt([ue()],Mt.prototype,"_iconSearch"),Dt([ue()],Mt.prototype,"_dragIdx"),Dt([ue()],Mt.prototype,"_dropIdx"),Dt([ue()],Mt.prototype,"_dragContext"),Dt([ue()],Mt.prototype,"_dragModeSrcIdx");try{customElements.define("config-tab-title",Mt)}catch{}var Ot=Object.defineProperty,Rt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ot(t,i,s),s};const jt=[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise"},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset"}];class Ht extends lt{constructor(){super(...arguments),this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherShowHeader=!0,this._weatherDropdownOpen=!1}static{this._AUTO_SAVE_KEYS=new Set(["_weatherEntity","_weatherHiddenMetrics","_weatherShowDaily","_weatherShowHourly","_weatherShowHeader"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._weatherEntity=t.entity_id??"",this._weatherHiddenMetrics=t.hidden_metrics??[],this._weatherShowDaily=t.show_daily??!0,this._weatherShowHourly=t.show_hourly??!0,this._weatherShowHeader=t.show_header??!0}collectSaveData(){return{...this._weatherEntity?{entity_id:this._weatherEntity}:{},hidden_metrics:this._weatherHiddenMetrics,show_daily:this._weatherShowDaily,show_hourly:this._weatherShowHourly,show_header:this._weatherShowHeader}}async _performSave(){await this.backend.send("set_weather",this.collectSaveData()),me.emit("weather-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.weather&&this.loadFromConfig(e.weather)}catch{}}_selectEntity(e){this._weatherEntity=e,this._weatherDropdownOpen=!1}_toggleMetric(e){const t=new Set(this._weatherHiddenMetrics);t.has(e)?t.delete(e):t.add(e),this._weatherHiddenMetrics=[...t]}renderTab(){this._lang;const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")).sort():[],t=e.find(e=>e===this._weatherEntity),i=new Set(this._weatherHiddenMetrics);return N`
      <div class="tab-panel" id="panel-weather">
        <glass-weather-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-weather-card>
        <div class="section-label">${Ne("config.behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._weatherShowHeader?"true":"false"}
            @click=${()=>{this._weatherShowHeader=!this._weatherShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.weather_show_header")}</div>
              <div class="feature-desc">${Ne("config.weather_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <div class="section-label">${Ne("config.weather_entity")}</div>
        <div class="section-desc">${Ne("config.weather_entity_desc")}</div>
        <div class="dropdown ${this._weatherDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._weatherDropdownOpen=!this._weatherDropdownOpen}
            aria-expanded=${this._weatherDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
            <span>${t||Ne("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>N`
                <button
                  class="dropdown-item ${e===this._weatherEntity?"active":""}"
                  role="option"
                  aria-selected=${e===this._weatherEntity?"true":"false"}
                  @click=${()=>this._selectEntity(e)}
                >
                  <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>

        <div class="section-label">${Ne("config.weather_metrics")}</div>
        <div class="section-desc">${Ne("config.weather_metrics_desc")}</div>
        <div class="feature-list">
          ${jt.map(e=>{const t=!i.has(e.key);return N`
              <button
                class="feature-row"
                role="switch"
                aria-checked=${t?"true":"false"}
                aria-label="${Ne(t?"common.hide":"common.show")} ${Ne(e.nameKey)}"
                @click=${()=>this._toggleMetric(e.key)}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${Ne(e.nameKey)}</div>
                </div>
                <span
                  class="toggle ${t?"on":""}"
                ></span>
              </button>
            `})}
        </div>

        <div class="section-label">${Ne("config.weather_forecasts")}</div>
        <div class="section-desc">${Ne("config.weather_forecasts_desc")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._weatherShowDaily?"true":"false"}
            aria-label="${this._weatherShowDaily?Ne("common.hide"):Ne("common.show")} ${Ne("config.weather_daily")}"
            @click=${()=>{this._weatherShowDaily=!this._weatherShowDaily}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:calendar-week"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.weather_daily")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowDaily?"on":""}"
            ></span>
          </button>
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._weatherShowHourly?"true":"false"}
            aria-label="${this._weatherShowHourly?Ne("common.hide"):Ne("common.show")} ${Ne("config.weather_hourly")}"
            @click=${()=>{this._weatherShowHourly=!this._weatherShowHourly}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.weather_hourly")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHourly?"on":""}"
            ></span>
          </button>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `}}Rt([ue()],Ht.prototype,"_weatherEntity"),Rt([ue()],Ht.prototype,"_weatherHiddenMetrics"),Rt([ue()],Ht.prototype,"_weatherShowDaily"),Rt([ue()],Ht.prototype,"_weatherShowHourly"),Rt([ue()],Ht.prototype,"_weatherShowHeader"),Rt([ue()],Ht.prototype,"_weatherDropdownOpen");try{customElements.define("config-tab-weather",Ht)}catch{}var Ft=Object.defineProperty,qt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ft(t,i,s),s};class Vt extends lt{constructor(){super(...arguments),this._cameraShowHeader=!0,this._cameraAutoCycle=!1,this._cameraCycleInterval=10,this._cameraEntityOrder=[],this._localDragIdx=null,this._localDropIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_cameraShowHeader","_cameraAutoCycle","_cameraCycleInterval","_cameraEntityOrder"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._cameraShowHeader=t.show_header??!0,this._cameraEntityOrder=t.entity_order??[],this._cameraAutoCycle=t.auto_cycle??!1,this._cameraCycleInterval=t.cycle_interval??10}collectSaveData(){return{show_header:this._cameraShowHeader,entity_order:this._cameraEntityOrder,auto_cycle:this._cameraAutoCycle,cycle_interval:this._cameraCycleInterval}}async _performSave(){await this.backend.send("set_camera_carousel_config",this.collectSaveData()),me.emit("camera-carousel-config-changed",void 0)}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.camera_carousel&&this.loadFromConfig(e.camera_carousel)}catch{}}_initCameraEntityOrder(){if(!this.hass)return;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("camera.")).sort(),t=new Set(e),i=this._cameraEntityOrder.filter(e=>t.has(e)),a=new Set(i);for(const r of e)a.has(r)||i.push(r);this._cameraEntityOrder=i}_localDragStart(e){this._localDragIdx=e}_localDragOver(e,t){t.preventDefault(),this._localDropIdx=e}_localDragLeave(){this._localDropIdx=null}_localDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_onDropCameraEntity(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return void this._localDragEnd();const i=[...this._cameraEntityOrder],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._cameraEntityOrder=i,this._localDragEnd()}renderTab(){return this._lang,this.hass&&0===this._cameraEntityOrder.length&&this._initCameraEntityOrder(),N`
      <div class="tab-panel" id="panel-camera_carousel">
        <glass-camera-carousel-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-camera-carousel-card>
        <div class="section-label">${Ne("config.behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._cameraShowHeader?"true":"false"}
            @click=${()=>{this._cameraShowHeader=!this._cameraShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.camera_show_header")}</div>
              <div class="feature-desc">${Ne("config.camera_show_header_desc")}</div>
            </div>
            <span class="toggle ${this._cameraShowHeader?"on":""}"></span>
          </button>
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._cameraAutoCycle?"true":"false"}
            @click=${()=>{this._cameraAutoCycle=!this._cameraAutoCycle}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:autorenew"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${Ne("config.camera_auto_cycle")}</div>
              <div class="feature-desc">${Ne("config.camera_auto_cycle_desc")}</div>
            </div>
            <span class="toggle ${this._cameraAutoCycle?"on":""}"></span>
          </button>
        </div>

        ${this._cameraAutoCycle?N`
          <div class="feature-list">
            <div class="feature-row" style="pointer-events:none;">
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:timer-outline"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ne("config.camera_cycle_interval")}</div>
                <div class="feature-desc">${Ne("config.camera_cycle_interval_desc")}</div>
              </div>
              <input class="input" type="number" min="3" max="60" style="width:60px;pointer-events:auto;text-align:center;"
                .value=${String(this._cameraCycleInterval)}
                @change=${e=>{const t=parseInt(e.target.value,10);!isNaN(t)&&t>=3&&t<=60&&(this._cameraCycleInterval=t)}}
              />
            </div>
          </div>
        `:B}

        <!-- Camera entity order -->
        ${this._cameraEntityOrder.length>0?N`
          <div class="section-label">${Ne("config.camera_entity_order")} (${this._cameraEntityOrder.length})</div>
          <div class="section-desc">${Ne("config.camera_entity_order_desc")}</div>
          <div class="item-list">
            ${this._cameraEntityOrder.map((e,t)=>{const i=this._localDragIdx===t,a=this._localDropIdx===t,r=this.hass?.states[e],s=r?.attributes?.friendly_name||e.split(".")[1],o=["item-row",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return N`
                <div class="item-card">
                  <div
                    class=${o}
                    draggable="true"
                    @dragstart=${()=>this._localDragStart(t)}
                    @dragover=${e=>this._localDragOver(t,e)}
                    @dragleave=${()=>this._localDragLeave()}
                    @drop=${e=>this._onDropCameraEntity(t,e)}
                    @dragend=${()=>this._localDragEnd()}
                  >
                    <span class="drag-handle">
                      <ha-icon .icon=${"mdi:drag"}></ha-icon>
                    </span>
                    <div class="item-info">
                      <span class="item-name">${s}</span>
                      <span class="item-meta">${e}</span>
                    </div>
                  </div>
                </div>
              `})}
          </div>
        `:B}

        <!-- Save / Reset -->
        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `}}qt([ue()],Vt.prototype,"_cameraShowHeader"),qt([ue()],Vt.prototype,"_cameraAutoCycle"),qt([ue()],Vt.prototype,"_cameraCycleInterval"),qt([ue()],Vt.prototype,"_cameraEntityOrder"),qt([ue()],Vt.prototype,"_localDragIdx"),qt([ue()],Vt.prototype,"_localDropIdx");try{customElements.define("config-tab-camera",Vt)}catch{}var Nt=Object.defineProperty,Ut=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Nt(t,i,s),s};class Wt extends lt{constructor(){super(...arguments),this._climateShowHeader=!0,this._climateDisplayMode="list",this._climateDashboardDisplayMode="list",this._climateDashboardEntities=[],this._climateRoom="",this._climateRoomEntities=[],this._saving=!1,this._localDragIdx=null,this._localDropIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_climateShowHeader","_climateDisplayMode","_climateDashboardDisplayMode","_climateDashboardEntities","_climateRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._climateRoom=this.areaId,this._loadRoomClimates()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._climateShowHeader=t.show_header??!0,this._climateDisplayMode="normal"===t.display_mode?"normal":"list",this._climateDashboardDisplayMode="normal"===t.dashboard_display_mode?"normal":"list",this._climateDashboardEntities=t.dashboard_entities??[]}collectSaveData(){return{show_header:this._climateShowHeader,display_mode:this._climateDisplayMode,dashboard_display_mode:this._climateDashboardDisplayMode,dashboard_entities:this._climateDashboardEntities}}_canSave(){return!!this.backend&&!this._saving}async _performSave(){this._saving=!0;try{if(await this.backend.send("set_climate_config",this.collectSaveData()),this._climateRoom&&this._climateRoomEntities.length>0){const e=new Set(this._climateRoomEntities.map(e=>e.entityId)),t=this._climateRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),i=this._climateRoomEntities.map(e=>e.entityId);await this._saveRoomEntities(this._climateRoom,e,t,i)}me.emit("climate-config-changed",void 0)}finally{this._saving=!1}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.climate_card&&this.loadFromConfig(e.climate_card)}catch{}this._climateRoom&&await this._loadRoomClimates()}}async _loadRoomClimates(){if(!this.hass||!this._climateRoom||!this.backend)return;const e=this._climateRoom,t=et(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("climate.")).map(e=>e.entity_id);let i=[],a=[];try{const t=await this.backend.send("get_room",{area_id:e});i=t?.hidden_entities||[],a=t?.entity_order||[]}catch{}if(this._climateRoom!==e)return;const r=new Map(a.map((e,t)=>[e,t])),s=[...t].sort((e,t)=>{const i=r.get(e)??999,a=r.get(t)??999;return i!==a?i-a:e.localeCompare(t)});this._climateRoomEntities=s.map(e=>{const t=this.hass?.states[e],a=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:a,visible:!i.includes(e)}})}_onLocalDragStart(e){this._localDragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),this._localDropIdx=e}_onLocalDragLeave(){this._localDropIdx=null}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_onLocalDrop(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this._climateRoomEntities],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._climateRoomEntities=i,this._localDragIdx=null,this._localDropIdx=null}_toggleEntityVisibility(e){this._climateRoomEntities=this._climateRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}renderTab(){if(this._lang,!this.hass)return N`${B}`;const e=this._climateRoomEntities;return N`
      <div class="tab-panel" id="panel-climate">
        <glass-climate-card .hass=${this.hass} .areaId=${this.areaId} config-preview></glass-climate-card>
        <!-- Description -->
        <div class="sub-section">
          <div class="section-label">${Ne("config.tab_climate")}</div>
          <div class="section-desc">${Ne("config.climate_desc")}</div>
        </div>

        <!-- Display mode -->
        <div class="sub-section">
          <div class="section-label">${this.areaId?Ne("config.climate_display_mode_popup"):Ne("config.climate_display_mode_dashboard")}</div>
          <div class="section-desc">${this.areaId?Ne("config.climate_display_mode_popup_desc"):Ne("config.climate_display_mode_dashboard_desc")}</div>
          <div class="chip-group">
            <button class="chip ${"list"===(this.areaId?this._climateDisplayMode:this._climateDashboardDisplayMode)?"active":""}"
              @click=${()=>{this.areaId?this._climateDisplayMode="list":this._climateDashboardDisplayMode="list"}}
              aria-pressed=${"list"===(this.areaId?this._climateDisplayMode:this._climateDashboardDisplayMode)?"true":"false"}>
              <ha-icon .icon=${"mdi:format-list-bulleted"}></ha-icon>
              ${Ne("config.climate_mode_list")}
            </button>
            <button class="chip ${"normal"===(this.areaId?this._climateDisplayMode:this._climateDashboardDisplayMode)?"active":""}"
              @click=${()=>{this.areaId?this._climateDisplayMode="normal":this._climateDashboardDisplayMode="normal"}}
              aria-pressed=${"normal"===(this.areaId?this._climateDisplayMode:this._climateDashboardDisplayMode)?"true":"false"}>
              <ha-icon .icon=${"mdi:gauge"}></ha-icon>
              ${Ne("config.climate_mode_normal")}
            </button>
          </div>
        </div>

        <!-- Behaviour -->
        <div class="sub-section">
          <div class="section-label">${Ne("config.behavior")}</div>
          <div class="feature-list">
            <button
              class="feature-row"
              role="switch"
              aria-checked=${this._climateShowHeader?"true":"false"}
              @click=${()=>{this._climateShowHeader=!this._climateShowHeader}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ne("config.climate_show_header")}</div>
                <div class="feature-desc">${Ne("config.climate_show_header_desc")}</div>
              </div>
              <span class="toggle ${this._climateShowHeader?"on":""}"></span>
            </button>
          </div>
        </div>

        <!-- Room entities -->
        <div class="sub-section">
          ${0===e.length?N`
            <div class="banner">
              <ha-icon .icon=${"mdi:thermostat"}></ha-icon>
              <span>${Ne("config.climate_no_entities")}</span>
            </div>
          `:N`
            <div class="section-label">${Ne("config.climate_room_entities")} (${e.length})</div>
            <div class="section-desc">${Ne("config.climate_room_entities_desc")}</div>
            <div class="item-list">
              ${e.map((e,t)=>{const i=this._localDragIdx===t,a=this._localDropIdx===t,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return N`
                  <div class="item-card">
                    <div
                      class=${r}
                      draggable="true"
                      @dragstart=${()=>this._onLocalDragStart(t)}
                      @dragover=${e=>this._onLocalDragOver(t,e)}
                      @dragleave=${()=>this._onLocalDragLeave()}
                      @drop=${e=>this._onLocalDrop(t,e)}
                      @dragend=${()=>this._onLocalDragEnd()}
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
                        @click=${()=>this._toggleEntityVisibility(e.entityId)}
                        role="switch"
                        aria-checked=${e.visible?"true":"false"}
                        aria-label="${e.visible?Ne("common.hide"):Ne("common.show")} ${e.name}"
                      ></button>
                    </div>
                  </div>
                `})}
            </div>
          `}
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${Ne("common.reset")}</button>
        </div>
      </div>
    `}}Ut([ue()],Wt.prototype,"_climateShowHeader"),Ut([ue()],Wt.prototype,"_climateDisplayMode"),Ut([ue()],Wt.prototype,"_climateDashboardDisplayMode"),Ut([ue()],Wt.prototype,"_climateDashboardEntities"),Ut([ue()],Wt.prototype,"_climateRoom"),Ut([ue()],Wt.prototype,"_climateRoomEntities"),Ut([ue()],Wt.prototype,"_localDragIdx"),Ut([ue()],Wt.prototype,"_localDropIdx");try{customElements.define("config-tab-climate",Wt)}catch{}const Bt=["light","media_player","climate","fan","cover","camera","vacuum"],Kt=new Set(["light","media_player","climate","cover","fan","camera"]),Yt={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum"},Gt={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},camera:{name:"config.domain_camera",desc:"config.domain_camera_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};var Xt=Object.defineProperty,Qt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Xt(t,i,s),s};const Jt=["light","cover","climate","fan","media_player","camera"];function Zt(e){return Yt[e]??"mdi:help-circle"}class ei extends lt{constructor(){super(...arguments),this._unassignedEntities=[],this._unassignedDropdownEntity=null,this._unassignedEntitySearch="",this._unassignedAreaSearch="",this._unassignedEditingEntity=null,this._iconPopupEntity=null,this._iconSearch="",this._iconList=[],this._iconLoading=!1,this._portalEl=null}updated(e){super.updated(e),e.has("hass")&&this.hass&&0===this._unassignedEntities.length&&this._loadEntities()}loadFromConfig(e){}collectSaveData(){return{}}_collectAllEntities(){if(!this.hass)return[];const e=this.hass.entities,t=this.hass.devices,i=this.hass.areas,a=[];for(const r of Object.values(e)){if(r.disabled_by||r.hidden_by)continue;const e=r.entity_id.split(".")[0];if(!Jt.includes(e))continue;const s=Ze(r,t),o=this.hass.states[r.entity_id],n=o?.attributes?.friendly_name??r.entity_id,c=s?i[s]?.name??null:null;a.push({entityId:r.entity_id,name:n,domain:e,areaId:s,areaName:c,icon:r.icon??null})}return a.sort((e,t)=>{const i=e.areaId?1:0,a=t.areaId?1:0;if(i!==a)return i-a;const r=Jt.indexOf(e.domain)-Jt.indexOf(t.domain);return 0!==r?r:e.name.localeCompare(t.name)}),a}_loadEntities(){this._unassignedEntities=this._collectAllEntities(),this._unassignedDropdownEntity=null,this._unassignedEditingEntity=null,this._unassignedEntitySearch="",this._unassignedAreaSearch=""}async _assignEntityArea(e,t){if(this.hass)try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:e,area_id:t}),this._unassignedEntities=this._unassignedEntities.map(i=>i.entityId===e?{...i,areaId:t,areaName:this.hass?.areas[t]?.name??null}:i),this._unassignedDropdownEntity=null,this._unassignedAreaSearch="",this.dispatchEvent(new CustomEvent("entities-assigned",{bubbles:!0,composed:!0}))}catch{this._fireToast(!1)}}async _renameEntity(e,t){if(!this.hass)return;const i=t.trim();if(!i)return void(this._unassignedEditingEntity=null);const a=this._unassignedEntities.find(t=>t.entityId===e);if(a&&a.name===i)this._unassignedEditingEntity=null;else{try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:e,name:i}),this._unassignedEntities=this._unassignedEntities.map(t=>t.entityId===e?{...t,name:i}:t)}catch{this._fireToast(!1)}this._unassignedEditingEntity=null}}async _openIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),this._iconSearch="",this._iconPopupEntity=e)}async _loadIconList(){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim();return e?this._iconList.filter(t=>t.toLowerCase().includes(e)).slice(0,120):this._iconList.slice(0,120)}async _selectIcon(e){const t=this._iconPopupEntity;if(this._iconPopupEntity=null,!t||!this.hass)return;const i=this._unassignedEntities.find(e=>e.entityId===t);if(!i||i.icon!==(e||null))try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:t,icon:e||null}),this._unassignedEntities=this._unassignedEntities.map(i=>i.entityId===t?{...i,icon:e||null}:i)}catch{this._fireToast(!1)}}_showIconPortal(){if(!this._iconPopupEntity)return void this._removeIconPortal();const e=this._unassignedEntities.find(e=>e.entityId===this._iconPopupEntity),t=e?.icon??"",i=this._getFilteredIcons();this._portalEl||(this._portalEl=document.createElement("div"),document.body.appendChild(this._portalEl));const a=()=>{this._iconPopupEntity=null,this._removeIconPortal()},r=e=>{this._selectIcon(e),this._removeIconPortal()},s=e=>{this._iconSearch=e,this._showIconPortal()};this._portalEl.replaceChildren(),Object.assign(this._portalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}),this._portalEl.addEventListener("click",e=>{e.target===this._portalEl&&a()},{once:!0});const o=document.createElement("div");Object.assign(o.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const n=document.createElement("div");Object.assign(n.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const c=document.createElement("span");Object.assign(c.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),c.textContent=Ne("config.unassigned_change_icon");const l=document.createElement("input");Object.assign(l.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),l.placeholder="mdi:...",l.value=this._iconSearch,l.addEventListener("input",()=>s(l.value)),n.appendChild(c),n.appendChild(l),o.appendChild(n);const d=document.createElement("div");Object.assign(d.style,{overflow:"auto",flex:"1",padding:"0.5rem",scrollbarWidth:"none"});const h=document.createElement("div");Object.assign(h.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const p=this._createIconBtn("mdi:cancel",""===t,.4);p.addEventListener("click",()=>r("")),h.appendChild(p);for(const u of i){const e=this._createIconBtn(u,u===t,1);e.addEventListener("click",()=>r(u)),h.appendChild(e)}if(0===i.length&&this._iconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=Ne("config.title_no_icons_found"),h.appendChild(e)}d.appendChild(h),o.appendChild(d),this._portalEl.appendChild(o),l.focus()}_createIconBtn(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",border:t?"2px solid rgba(129,140,248,0.6)":"1px solid rgba(255,255,255,0.06)",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)",cursor:"pointer",color:"rgba(255,255,255,0.88)",padding:"0"});const r=document.createElement("ha-icon");return r.icon=e,r.style.cssText=`--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${i};`,a.appendChild(r),a}_removeIconPortal(){this._portalEl&&(this._portalEl.remove(),this._portalEl=null)}disconnectedCallback(){super.disconnectedCallback(),this._removeIconPortal()}closeDropdowns(){this._unassignedDropdownEntity=null}renderTab(){if(this._lang,!this.hass)return N`${B}`;const e=this._unassignedEntities,t=Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name)),i=this._unassignedEntitySearch.toLowerCase(),a=this._unassignedAreaSearch.toLowerCase(),r=i?e.filter(e=>e.name.toLowerCase().includes(i)||e.entityId.toLowerCase().includes(i)):e,s=new Map;for(const c of r){const e=s.get(c.domain)??[];e.push(c),s.set(c.domain,e)}const o=e.filter(e=>!e.areaId).length,n=a?t.filter(e=>e.name.toLowerCase().includes(a)):t;return N`
      <div class="tab-panel" id="panel-unassigned">
        <div class="section-label">${Ne("config.tab_unassigned")}</div>
        <div class="section-desc">${Ne("config.unassigned_desc")}</div>

        ${o>0?N`
          <div class="banner pw-ua-banner-warn">
            <ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon>
            <span>${Ne("config.unassigned_count",{count:String(o)})}</span>
          </div>
        `:B}

        ${0===e.length?N`
          <div class="banner">
            <ha-icon .icon=${"mdi:help-circle-outline"}></ha-icon>
            <span>${Ne("config.unassigned_no_entities")}</span>
          </div>
        `:N`
          <!-- Entity search -->
          <input
            type="text"
            class="dropdown-search pw-ua-search"
            placeholder="${Ne("config.search_entity")}"
            aria-label="${Ne("config.search_entity")}"
            .value=${this._unassignedEntitySearch}
            @input=${e=>{this._unassignedEntitySearch=e.target.value}}
          />

          ${0===r.length?N`
            <div class="banner">
              <ha-icon .icon=${"mdi:magnify"}></ha-icon>
              <span>${Ne("config.unassigned_no_results")}</span>
            </div>
          `:B}

          ${[...s.entries()].map(([e,t])=>N`
            <div class="section-label pw-ua-domain-group">
              <ha-icon .icon=${Zt(e)} class="pw-ua-domain-icon"></ha-icon>
              ${function(e){const t=Gt[e];return t?Ne(t.name):e}(e)}
              <span class="pw-ua-domain-count">(${t.length})</span>
            </div>
            <div class="item-list">
              ${t.map(e=>{const t=this._unassignedDropdownEntity===e.entityId,i=this._unassignedEditingEntity===e.entityId;return N`
                  <div class="item-card pw-ua-card">
                    <div class="item-row">
                      <button
                        class="pw-ua-icon-btn"
                        title="${Ne("config.unassigned_change_icon")}"
                        aria-label="${Ne("config.unassigned_change_icon")}: ${e.name}"
                        @click=${async()=>{await this._openIconPopup(e.entityId),this._showIconPortal()}}
                      >
                        <ha-icon .icon=${e.icon||Zt(e.domain)}></ha-icon>
                      </button>
                      <div class="item-info">
                        ${i?N`
                          <input
                            type="text"
                            class="entity-rename-input"
                            .value=${e.name}
                            aria-label="${Ne("config.unassigned_rename")}"
                            @blur=${t=>{const i=t.target;i.dataset.cancelled||this._renameEntity(e.entityId,i.value)}}
                            @keydown=${e=>{"Enter"===e.key&&e.target.blur(),"Escape"===e.key&&(e.target.dataset.cancelled="1",this._unassignedEditingEntity=null)}}
                            @focus=${e=>e.target.select()}
                          />
                        `:N`
                          <button class="item-name pw-ua-name" type="button"
                            @click=${()=>{this._unassignedEditingEntity=e.entityId,this.updateComplete.then(()=>{const e=this.shadowRoot?.querySelector(".entity-rename-input");e?.focus()})}}
                            title="${Ne("config.unassigned_rename")}"
                          >${e.name}</button>
                        `}
                        <span class="item-meta">${e.entityId}</span>
                      </div>
                    </div>
                    <div class="dropdown ${t?"open":""} pw-ua-area-dropdown">
                      <button
                        class="dropdown-trigger pw-ua-area-trigger ${e.areaId?"":"pw-ua-unassigned"}"
                        @click=${i=>{i.stopPropagation(),this._unassignedAreaSearch="",this._unassignedDropdownEntity=t?null:e.entityId}}
                        aria-expanded=${t?"true":"false"}
                        aria-haspopup="listbox"
                      >
                        <ha-icon .icon=${e.areaId?"mdi:home":"mdi:alert-circle-outline"} class="pw-ua-area-icon"></ha-icon>
                        ${e.areaName??Ne("config.unassigned_select_area")}
                        <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                      </button>
                      <div class="dropdown-menu" role="listbox">
                        <input
                          type="text"
                          class="dropdown-search"
                          placeholder="${Ne("config.search_entity")}"
                          aria-label="${Ne("config.search_entity")}"
                          .value=${this._unassignedAreaSearch}
                          @input=${e=>{this._unassignedAreaSearch=e.target.value}}
                          @click=${e=>e.stopPropagation()}
                        />
                        ${n.map(t=>N`
                          <button
                            class="dropdown-item ${t.area_id===e.areaId?"active":""}"
                            role="option"
                            aria-selected=${t.area_id===e.areaId?"true":"false"}
                            @click=${()=>this._assignEntityArea(e.entityId,t.area_id)}
                          >
                            <ha-icon .icon=${t.icon||"mdi:home"}></ha-icon>
                            ${t.name}
                          </button>
                        `)}
                      </div>
                    </div>
                  </div>
                `})}
            </div>
          `)}
        `}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadEntities()}>${Ne("common.reset")}</button>
        </div>
      </div>

    `}}Qt([ue()],ei.prototype,"_unassignedEntities"),Qt([ue()],ei.prototype,"_unassignedDropdownEntity"),Qt([ue()],ei.prototype,"_unassignedEntitySearch"),Qt([ue()],ei.prototype,"_unassignedAreaSearch"),Qt([ue()],ei.prototype,"_unassignedEditingEntity"),Qt([ue()],ei.prototype,"_iconPopupEntity"),Qt([ue()],ei.prototype,"_iconSearch");try{customElements.define("config-tab-unassigned",ei)}catch{}var ti=Object.defineProperty,ii=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ti(t,i,s),s};class ai extends ne{constructor(){super(...arguments),this.rooms=[],this._dragIdx=null,this._dropIdx=null,this._popupAutoClose=0,this._configLoaded=!1,this._saveScheduler=st()}createRenderRoot(){return this}updated(e){super.updated(e),!this._configLoaded&&this.backend&&(this._configLoaded=!0,this._loadConfig())}disconnectedCallback(){super.disconnectedCallback(),this._saveScheduler.cancel()}async _loadConfig(){if(this.backend)try{const e=await this.backend.send("get_config");this._popupAutoClose=e?.navbar?.popup_auto_close??0}catch{}}_onAutoCloseChange(e){this._popupAutoClose=parseInt(e.target.value,10),this._saveScheduler.schedule(()=>this._saveAutoClose())}async _saveAutoClose(){if(this.backend)try{await this.backend.send("set_navbar",{popup_auto_close:this._popupAutoClose}),me.emit("navbar-config-changed",void 0),this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!0},bubbles:!0,composed:!0}))}catch{this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!1},bubbles:!0,composed:!0}))}}_onDragStart(e){this._dragIdx=e}_onDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDrop(e,t){if(t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e){const t=[...this.rooms],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this.dispatchEvent(new CustomEvent("rooms-reordered",{detail:{rooms:t},bubbles:!0,composed:!0}))}this._dragIdx=null,this._dropIdx=null}_toggleVisibility(e,t){t.stopPropagation(),t.preventDefault(),this.dispatchEvent(new CustomEvent("room-visibility-toggle",{detail:{areaId:e.areaId,visible:!e.visible},bubbles:!0,composed:!0}))}render(){if(!this.rooms.length)return N`<div class="empty-state">${Ne("config.no_rooms")}</div>`;let e=0;return N`
      <div class="section-label">${Ne("config.popup_auto_close")}</div>
      <div class="section-desc">${Ne("config.popup_auto_close_desc")}</div>
      <div class="feature-list">
        <div class="range-row" style="padding:0.375rem 0.75rem;">
          <div class="feature-icon" style="background:rgba(var(--rgb-accent),0.08);border-color:rgba(var(--rgb-accent),0.12);">
            <ha-icon .icon=${"mdi:timer-outline"} style="color:var(--c-accent);"></ha-icon>
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
          <span class="range-value" style="min-width:3.5rem;font-size:var(--fz-sm);font-weight:500;color:var(--t3);">${0===this._popupAutoClose?Ne("config.popup_auto_close_off"):`${this._popupAutoClose}s`}</span>
        </div>
      </div>

      <div class="room-grid">
        ${this.rooms.map((t,i)=>{const a=this._dragIdx===i,r=this._dropIdx===i&&null!==this._dragIdx&&this._dragIdx!==i;t.visible&&e++;const s=t.visible?e:0;return N`
            <div
              class="room-card dash-card ${t.visible?"":"off"} ${a?"dragging":""} ${r?"drop-target":""}"
              draggable="true"
              @dragstart=${()=>this._onDragStart(i)}
              @dragover=${e=>this._onDragOver(i,e)}
              @dragleave=${()=>this._onDragLeave()}
              @drop=${e=>this._onDrop(i,e)}
              @dragend=${()=>this._onDragEnd()}
              @click=${()=>this.dispatchEvent(new CustomEvent("room-select",{detail:t.areaId,bubbles:!0,composed:!0}))}
            >
              ${t.visible?N`<span class="dash-order">${s}</span>`:B}
              <ha-icon .icon=${t.icon||"mdi:home"}></ha-icon>
              <span class="room-name">${t.name}</span>
              <div class="dash-toggle-row">
                <span class="dash-toggle-label">${t.visible?Ne("common.enabled"):Ne("common.disabled")}</span>
                <button
                  class="dash-toggle ${t.visible?"on":""}"
                  @click=${e=>this._toggleVisibility(t,e)}
                  aria-label=${t.visible?Ne("config.hide_room"):Ne("config.show_room")}
                ></button>
              </div>
              <span class="dash-drag-hint"><ha-icon .icon=${"mdi:drag"}></ha-icon></span>
            </div>
          `})}
      </div>
    `}}ii([pe({attribute:!1})],ai.prototype,"hass"),ii([pe({attribute:!1})],ai.prototype,"rooms"),ii([pe({attribute:!1})],ai.prototype,"backend"),ii([ue()],ai.prototype,"_dragIdx"),ii([ue()],ai.prototype,"_dropIdx"),ii([ue()],ai.prototype,"_popupAutoClose"),customElements.define("config-room-list",ai);var ri=Object.defineProperty,si=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ri(t,i,s),s};const oi=[{id:"light",label:"Lumières",icon:"mdi:lightbulb-group",domains:["light"],color:"251,191,36"},{id:"cover",label:"Volets",icon:"mdi:window-shutter",domains:["cover"],color:"167,139,250"},{id:"climate",label:"Climat",icon:"mdi:thermostat",domains:["climate"],color:"96,165,250"},{id:"media",label:"Media",icon:"mdi:speaker",domains:["media_player"],color:"129,140,248"},{id:"fan",label:"Ventilateurs",icon:"mdi:fan",domains:["fan"],color:"45,212,191"}];class ni extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._openSections=new Set,this._sections=[],this._scenes=[],this._tempEntity="",this._humidityEntity="",this._tempHigh=null,this._tempLow=null,this._humidityThreshold=null,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._availableTempEntities=[],this._availableHumidityEntities=[],this._tempDropdownOpen=!1,this._humidityDropdownOpen=!1,this._dragIdx=null,this._dropIdx=null,this._dragContext=null,this._loaded=!1,this._autoOpenDone=!1,this._saveScheduler=st()}createRenderRoot(){return this}updated(e){super.updated(e),(e.has("areaId")||e.has("hass"))&&(this._loaded=!1,this._autoOpenDone=!1),!this._loaded&&this.hass&&this.areaId&&(this._loaded=!0,this._loadRoomConfig()),!this._autoOpenDone&&this._sections.length>0&&(this._autoOpenDone=!0)}disconnectedCallback(){super.disconnectedCallback(),this._saveScheduler.cancel()}async _loadRoomConfig(){if(!this.hass||!this.areaId)return;const e=et(this.areaId,this.hass.entities,this.hass.devices);let t=null,i=new Set,a=[];try{if(!this.backend)throw new Error("No backend");const e=await this.backend.send("get_room",{area_id:this.areaId});e&&(t=e.card_order.length>0?e.card_order:null,i=new Set(e.hidden_scenes??[]),a=e.scene_order??[],this._tempEntity=e.temperature_entity??"",this._humidityEntity=e.humidity_entity??"",this._tempHigh=e.temp_high??null,this._tempLow=e.temp_low??null,this._humidityThreshold=e.humidity_threshold??null,this._showLights=e.show_lights??!0,this._showTemperature=e.show_temperature??!0,this._showHumidity=e.show_humidity??!0)}catch{}const r=this.hass;this._availableTempEntities=[],this._availableHumidityEntities=[];for(const h of e)if(h.entity_id.startsWith("sensor.")){const e=r.states[h.entity_id],t=e?.attributes?.device_class,i=e?.attributes?.friendly_name||h.entity_id.split(".")[1];"temperature"===t&&this._availableTempEntities.push({id:h.entity_id,name:i}),"humidity"===t&&this._availableHumidityEntities.push({id:h.entity_id,name:i})}const s=new Map;for(const h of e){const e=h.entity_id.split(".")[0];s.set(e,(s.get(e)||0)+1)}const o=t?[...t]:[...Bt],n=new Set(o);for(const h of s.keys())!n.has(h)&&Yt[h]&&o.push(h);this._sections=o.map(e=>{const i=oi.find(t=>t.domains.includes(e)||t.id===e);if(!i)return null;const a=i.domains.reduce((e,t)=>e+(s.get(t)||0),0);return 0!==a&&Kt.has(e)?{...i,visible:!t||t.includes(e),count:a}:null}).filter(e=>null!==e);const c=e.filter(e=>e.entity_id.startsWith("scene.")),l=new Map;a.forEach((e,t)=>l.set(e,t));const d=c.map(e=>{const t=r.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!i.has(e.entity_id)}});d.sort((e,t)=>{const i=l.get(e.entityId),a=l.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._scenes=d}_scheduleSave(){this._saveScheduler.schedule(()=>this._save())}async _save(){if(this.backend&&this.areaId)try{await this.backend.send("set_room",{area_id:this.areaId,card_order:this._sections.filter(e=>e.visible).map(e=>e.id),hidden_scenes:this._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:this._scenes.map(e=>e.entityId),temperature_entity:this._tempEntity||null,humidity_entity:this._humidityEntity||null,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold,show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity}),me.emit("room-config-changed",{areaId:this.areaId}),this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!0},bubbles:!0,composed:!0}))}catch{this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!1},bubbles:!0,composed:!0}))}}_toggleSectionVisible(e){this._sections=this._sections.map(t=>t.id===e?{...t,visible:!t.visible}:t),this._sections.find(t=>t.id===e)?.visible||this._openSections.delete(e),this._scheduleSave()}_toggleSceneVisible(e){this._scenes=this._scenes.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),this._scheduleSave()}_toggleSection(e){this._openSections.has(e)?this._openSections.delete(e):this._openSections.add(e),this.requestUpdate()}_onDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=null}_onDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);if("sections"===this._dragContext){const t=[...this._sections],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._sections=t,this._scheduleSave()}else if("scenes"===this._dragContext){const t=[...this._scenes],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._scenes=t,this._scheduleSave()}this._dragIdx=null,this._dropIdx=null}render(){return this._sections.length?N`
      ${this._renderIndicators()}
      ${this._renderSensors()}

      ${this._scenes.length>0?N`
        <div class="section-label">${Ne("config.popup_scenes")}</div>
        <div class="scene-chips">
          ${this._scenes.map((e,t)=>N`
            <button
              class="scene-chip ${e.visible?"on":""} ${this._dragIdx===t&&"scenes"===this._dragContext?"dragging":""} ${this._dropIdx===t&&"scenes"===this._dragContext?"drop-target":""}"
              draggable="true"
              @click=${()=>this._toggleSceneVisible(e.entityId)}
              @dragstart=${e=>{e.stopPropagation(),this._onDragStart(t,"scenes")}}
              @dragover=${e=>{e.preventDefault(),e.stopPropagation(),null!==this._dragIdx&&this._dragIdx!==t&&(this._dropIdx=t)}}
              @dragleave=${()=>{this._dropIdx=null}}
              @drop=${e=>{e.preventDefault(),e.stopPropagation(),this._onDrop(t,e)}}
              @dragend=${()=>this._onDragEnd()}
              aria-label="${e.visible?Ne("common.hide"):Ne("common.show")} ${e.name}"
            >
              <ha-icon class="chip-drag" .icon=${"mdi:drag"}></ha-icon>
              <ha-icon .icon=${"mdi:palette"}></ha-icon>
              <span>${e.name}</span>
            </button>
          `)}
        </div>
      `:B}

      <div class="section-label pw-rd-cards-label">${Ne("config.popup_internal_cards")}</div>
      <div class="room-sections">
        ${this._sections.map((e,t)=>{const i=this._openSections.has(e.id)&&e.visible,a=this._dragIdx===t&&"sections"===this._dragContext,r=this._dropIdx===t&&"sections"===this._dragContext;return N`
            <div
              class="${a?"dragging":""} ${r?"drop-target":""}"
              draggable="true"
              @dragstart=${()=>this._onDragStart(t,"sections")}
              @dragover=${e=>this._onDragOver(t,e)}
              @dragleave=${()=>this._onDragLeave()}
              @drop=${e=>this._onDrop(t,e)}
              @dragend=${()=>this._onDragEnd()}
            >
              <div class="section-header-wrap ${e.visible?"":"off"}">
                <span class="drag-handle"><ha-icon .icon=${"mdi:drag"}></ha-icon></span>
                <button class="section-header" @click=${()=>{e.visible&&this._toggleSection(e.id)}}
                  aria-expanded=${i?"true":"false"}>
                  <div class="section-header-icon" style="background:rgba(${e.color},0.08);border:1px solid rgba(${e.color},0.12);">
                    <ha-icon .icon=${e.icon} style="color:rgb(${e.color});"></ha-icon>
                  </div>
                  <span class="section-title">${e.label}</span>
                </button>
                <button
                  class="toggle ${e.visible?"on":""}"
                  @click=${t=>{t.stopPropagation(),this._toggleSectionVisible(e.id)}}
                  role="switch"
                  aria-checked=${e.visible?"true":"false"}
                  aria-label="${e.visible?Ne("common.hide"):Ne("common.show")} ${e.label}"
                ></button>
                ${e.visible?N`
                  <ha-icon class="section-chevron ${i?"open":""}" .icon=${"mdi:chevron-down"}
                    @click=${()=>this._toggleSection(e.id)}></ha-icon>
                `:B}
              </div>
              ${e.visible?N`
                <div class="fold-sep ${i?"visible":""}" style="--fold-color:rgb(${e.color})"></div>
                <div class="section-fold ${i?"open":""}">
                  <div class="section-fold-inner" aria-hidden=${i?"false":"true"}>
                    <div class="section-content">
                      ${i?this._renderSection(e):B}
                    </div>
                  </div>
                </div>
              `:B}
            </div>
          `})}
      </div>
    `:N`<div class="empty-state">Aucune entité dans cette pièce</div>`}_selectTempEntity(e){this._tempEntity=e,this._tempDropdownOpen=!1,this._scheduleSave()}_selectHumidityEntity(e){this._humidityEntity=e,this._humidityDropdownOpen=!1,this._scheduleSave()}_renderIndicators(){return N`
      <div class="section-label">${Ne("config.room_indicators")}</div>
      <div class="section-desc">${Ne("config.room_indicators_desc")}</div>
      <div class="feature-list">
        <button class="feature-row" @click=${()=>{this._showLights=!this._showLights,this._scheduleSave()}}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:lightbulb"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${Ne("config.room_show_lights")}</div>
          </div>
          <span class="toggle ${this._showLights?"on":""}" role="switch" aria-checked=${this._showLights?"true":"false"} aria-label=${Ne("config.room_show_lights")}></span>
        </button>
        <button class="feature-row" @click=${()=>{this._showTemperature=!this._showTemperature,this._scheduleSave()}}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:thermometer"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${Ne("config.room_show_temperature")}</div>
          </div>
          <span class="toggle ${this._showTemperature?"on":""}" role="switch" aria-checked=${this._showTemperature?"true":"false"} aria-label=${Ne("config.room_show_temperature")}></span>
        </button>
        <button class="feature-row" @click=${()=>{this._showHumidity=!this._showHumidity,this._scheduleSave()}}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${Ne("config.room_show_humidity")}</div>
          </div>
          <span class="toggle ${this._showHumidity?"on":""}" role="switch" aria-checked=${this._showHumidity?"true":"false"} aria-label=${Ne("config.room_show_humidity")}></span>
        </button>
      </div>
    `}_renderSensors(){const e="__none__"===this._tempEntity?Ne("config.room_no_sensor"):this._tempEntity?this._availableTempEntities.find(e=>e.id===this._tempEntity)?.name??this._tempEntity:Ne("config.room_auto_detect"),t="__none__"===this._humidityEntity?Ne("config.room_no_sensor"):this._humidityEntity?this._availableHumidityEntities.find(e=>e.id===this._humidityEntity)?.name??this._humidityEntity:Ne("config.room_auto_detect");return N`
      <div class="section-label">${Ne("config.room_sensors")}</div>
      <div class="section-desc">${Ne("config.room_sensors_desc")}</div>

      <div class="feature-name pw-rd-sensor-label">${Ne("config.room_temp_entity")}</div>
      <div class="dropdown ${this._tempDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{this._tempDropdownOpen=!this._tempDropdownOpen,this._humidityDropdownOpen=!1}}
          aria-expanded=${this._tempDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${"mdi:thermometer"}></ha-icon>
          <span>${e}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <button
            class="dropdown-item ${this._tempEntity?"":"active"}"
            role="option"
            aria-selected=${this._tempEntity?"false":"true"}
            @click=${()=>this._selectTempEntity("")}
          >
            <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
            ${Ne("config.room_auto_detect")}
          </button>
          ${this._availableTempEntities.map(e=>N`
            <button
              class="dropdown-item ${this._tempEntity===e.id?"active":""}"
              role="option"
              aria-selected=${this._tempEntity===e.id?"true":"false"}
              @click=${()=>this._selectTempEntity(e.id)}
            >
              <ha-icon .icon=${"mdi:thermometer"}></ha-icon>
              ${e.name}
            </button>
          `)}
          <button
            class="dropdown-item ${"__none__"===this._tempEntity?"active":""}"
            role="option"
            aria-selected=${"__none__"===this._tempEntity?"true":"false"}
            @click=${()=>this._selectTempEntity("__none__")}
          >
            <ha-icon .icon=${"mdi:close-circle-outline"}></ha-icon>
            ${Ne("config.room_no_sensor")}
          </button>
        </div>
      </div>

      <div class="feature-name pw-rd-sensor-label">${Ne("config.room_humidity_entity")}</div>
      <div class="dropdown ${this._humidityDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{this._humidityDropdownOpen=!this._humidityDropdownOpen,this._tempDropdownOpen=!1}}
          aria-expanded=${this._humidityDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${"mdi:water-percent"}></ha-icon>
          <span>${t}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <button
            class="dropdown-item ${this._humidityEntity?"":"active"}"
            role="option"
            aria-selected=${this._humidityEntity?"false":"true"}
            @click=${()=>this._selectHumidityEntity("")}
          >
            <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
            ${Ne("config.room_auto_detect")}
          </button>
          ${this._availableHumidityEntities.map(e=>N`
            <button
              class="dropdown-item ${this._humidityEntity===e.id?"active":""}"
              role="option"
              aria-selected=${this._humidityEntity===e.id?"true":"false"}
              @click=${()=>this._selectHumidityEntity(e.id)}
            >
              <ha-icon .icon=${"mdi:water-percent"}></ha-icon>
              ${e.name}
            </button>
          `)}
          <button
            class="dropdown-item ${"__none__"===this._humidityEntity?"active":""}"
            role="option"
            aria-selected=${"__none__"===this._humidityEntity?"true":"false"}
            @click=${()=>this._selectHumidityEntity("__none__")}
          >
            <ha-icon .icon=${"mdi:close-circle-outline"}></ha-icon>
            ${Ne("config.room_no_sensor")}
          </button>
        </div>
      </div>

      <div class="feature-name pw-rd-threshold-label">${Ne("config.room_thresholds")}</div>
      <div class="feature-list">
        <div class="range-row">
          <div class="feature-icon"><ha-icon .icon=${"mdi:thermometer-high"}></ha-icon></div>
          <div class="feature-text pw-rd-flex-fixed">
            <div class="feature-name">${Ne("config.room_temp_high")}</div>
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
            <div class="feature-name">${Ne("config.room_temp_low")}</div>
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
            <div class="feature-name">${Ne("config.room_humidity_threshold")}</div>
          </div>
          <input type="range" class="range-input" min="40" max="90" step="1"
            .value=${String(this._humidityThreshold??65)}
            @input=${e=>{this._humidityThreshold=parseFloat(e.target.value),this._scheduleSave()}}
          />
          <span class="range-value">${this._humidityThreshold??65}%</span>
        </div>
      </div>

    `}_renderSection(e){switch(e.id){case"light":return N`<config-tab-light .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-light>`;case"cover":return N`<config-tab-cover .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-cover>`;case"climate":return N`<config-tab-climate .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-climate>`;case"media":return N`<config-tab-media .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-media>`;case"fan":return N`<config-tab-fan .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-fan>`;default:return N``}}}si([pe({attribute:!1})],ni.prototype,"hass"),si([pe()],ni.prototype,"areaId"),si([pe({attribute:!1})],ni.prototype,"configData"),si([pe({attribute:!1})],ni.prototype,"backend"),si([pe({attribute:!1})],ni.prototype,"rooms"),si([ue()],ni.prototype,"_openSections"),si([ue()],ni.prototype,"_sections"),si([ue()],ni.prototype,"_scenes"),si([ue()],ni.prototype,"_tempEntity"),si([ue()],ni.prototype,"_humidityEntity"),si([ue()],ni.prototype,"_tempHigh"),si([ue()],ni.prototype,"_tempLow"),si([ue()],ni.prototype,"_humidityThreshold"),si([ue()],ni.prototype,"_showLights"),si([ue()],ni.prototype,"_showTemperature"),si([ue()],ni.prototype,"_showHumidity"),si([ue()],ni.prototype,"_tempDropdownOpen"),si([ue()],ni.prototype,"_humidityDropdownOpen"),si([ue()],ni.prototype,"_dragIdx"),si([ue()],ni.prototype,"_dropIdx"),si([ue()],ni.prototype,"_dragContext"),customElements.define("config-room-detail",ni);var ci=Object.defineProperty,li=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ci(t,i,s),s};const di=[{id:"title",icon:"mdi:format-title",nameKey:"config.dashboard_card_title",color:"var(--c-accent)"},{id:"light",icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",color:"var(--c-light-glow)"},{id:"weather",icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",color:"var(--c-info)"},{id:"cover",icon:"mdi:blinds",nameKey:"config.dashboard_card_cover",color:"var(--c-purple)"},{id:"climate",icon:"mdi:thermostat",nameKey:"config.dashboard_card_climate",color:"var(--c-purple)"},{id:"fan",icon:"mdi:fan",nameKey:"config.dashboard_card_fan",color:"var(--c-accent)"},{id:"media",icon:"mdi:speaker",nameKey:"config.dashboard_card_media",color:"var(--c-accent)"},{id:"spotify",icon:"mdi:spotify",nameKey:"config.dashboard_card_spotify",color:"var(--c-spotify)"},{id:"presence",icon:"mdi:account-group",nameKey:"config.dashboard_card_presence",color:"var(--c-accent)"},{id:"camera_carousel",icon:"mdi:cctv",nameKey:"config.dashboard_card_camera_carousel",color:"var(--c-alert)"}],hi={title:"title",light:"light",weather:"weather",cover:"cover",climate:"climate",fan:"fan",media:"media",spotify:"spotify",presence:"presence",camera_carousel:"camera"},pi={title:"title_card",weather:"weather",light:"light_card",cover:"cover_card",climate:"climate_card",fan:"fan_card",media:"media_card",spotify:"spotify_card",presence:"presence_card",camera:"camera_carousel"};class ui extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._enabledCards=["weather"],this._cardOrder=[],this._hideHeader=!1,this._hideSidebar=!1,this._dynamicBackground=!0,this._dragIdx=null,this._dropIdx=null,this._saveScheduler=st()}createRenderRoot(){return this}updated(e){e.has("configData")&&this.configData&&this._loadFromConfig(this.configData)}disconnectedCallback(){super.disconnectedCallback(),this._saveScheduler.cancel()}_loadFromConfig(e){const t=e.dashboard;t&&(this._enabledCards=t.enabled_cards??["weather"],this._cardOrder=t.card_order??di.map(e=>e.id),this._hideHeader=t.hide_header??!1,this._hideSidebar=t.hide_sidebar??!1,this._dynamicBackground=t.dynamic_background??!0)}_scheduleSave(){this._saveScheduler.schedule(()=>this._save())}async _save(){if(this.backend)try{await this.backend.send("set_dashboard",{enabled_cards:this._enabledCards,card_order:this._cardOrder,hide_header:this._hideHeader,hide_sidebar:this._hideSidebar,dynamic_background:this._dynamicBackground}),me.emit("dashboard-config-changed",void 0),this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!0},bubbles:!0,composed:!0}))}catch{this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!1},bubbles:!0,composed:!0}))}}_toggleCard(e){const t=new Set(this._enabledCards);t.has(e)?t.delete(e):t.add(e),this._enabledCards=[...t],this._scheduleSave()}_toggleHideHeader(){this._hideHeader=!this._hideHeader,this._scheduleSave()}_toggleHideSidebar(){this._hideSidebar=!this._hideSidebar,this._scheduleSave()}_toggleDynamicBg(){this._dynamicBackground=!this._dynamicBackground,this._scheduleSave()}_onDragStart(e){this._dragIdx=e}_onDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDrop(e,t){if(t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e){const t=[...this._cardOrder],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._cardOrder=t,this._scheduleSave()}this._dragIdx=null,this._dropIdx=null}_navigateToCard(e){const t=hi[e]??e;this.dispatchEvent(new CustomEvent("sub-select",{detail:t,bubbles:!0,composed:!0}))}render(){return this.subSection?this._renderSubSection(this.subSection):this._renderDashboard()}_renderDashboard(){const e=new Set(this._enabledCards),t=new Set(di.map(e=>e.id)),i=this._cardOrder.filter(e=>t.has(e));for(const r of di)i.includes(r.id)||i.push(r.id);let a=0;return N`
      <div class="section-label">${Ne("config.dashboard_title")}</div>
      <div class="section-desc">${Ne("config.dashboard_desc")}</div>

      <div class="room-grid pw-db-grid-mt">
        ${i.map((t,i)=>{const r=di.find(e=>e.id===t);if(!r)return B;const s=e.has(t);s&&a++;const o=s?a:0,n=this._dragIdx===i,c=this._dropIdx===i&&null!==this._dragIdx&&this._dragIdx!==i;return N`
            <div
              class="room-card dash-card ${s?"":"off"} ${n?"dragging":""} ${c?"drop-target":""}"
              draggable="true"
              @dragstart=${()=>this._onDragStart(i)}
              @dragover=${e=>this._onDragOver(i,e)}
              @dragleave=${()=>this._onDragLeave()}
              @drop=${e=>this._onDrop(i,e)}
              @dragend=${()=>this._onDragEnd()}
              @click=${()=>this._navigateToCard(t)}
            >
              ${s?N`<span class="dash-order">${o}</span>`:B}
              <div class="room-card-icon" style="--icon-color:${r.color};">
                <ha-icon .icon=${r.icon}></ha-icon>
              </div>
              <span class="room-name">${Ne(r.nameKey)}</span>
              <div class="dash-toggle-row">
                <span class="dash-toggle-label">${Ne(s?"common.enabled":"common.disabled")}</span>
                <button
                  class="dash-toggle ${s?"on":""}"
                  @click=${e=>{e.stopPropagation(),this._toggleCard(t)}}
                  aria-label="${Ne("common.show")} ${Ne(r.nameKey)}"
                ></button>
              </div>
              <span class="dash-drag-hint"><ha-icon .icon=${"mdi:drag"}></ha-icon></span>
            </div>
          `})}
      </div>

      <div class="section-label mt-lg">${Ne("config.dashboard_display")}</div>
      <div class="section-desc">${Ne("config.dashboard_display_desc")}</div>

      <div class="feature-list">
        <button class="feature-row" role="switch" aria-checked=${this._hideHeader?"true":"false"}
          @click=${()=>this._toggleHideHeader()}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:page-layout-header"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${Ne("config.dashboard_hide_header")}</div>
            <div class="feature-desc">${Ne("config.dashboard_hide_header_desc")}</div>
          </div>
          <span class="toggle ${this._hideHeader?"on":""}"></span>
        </button>

        <button class="feature-row" role="switch" aria-checked=${this._hideSidebar?"true":"false"}
          @click=${()=>this._toggleHideSidebar()}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:page-layout-sidebar-left"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${Ne("config.dashboard_hide_sidebar")}</div>
            <div class="feature-desc">${Ne("config.dashboard_hide_sidebar_desc")}</div>
          </div>
          <span class="toggle ${this._hideSidebar?"on":""}"></span>
        </button>

        <button class="feature-row" role="switch" aria-checked=${this._dynamicBackground?"true":"false"}
          @click=${()=>this._toggleDynamicBg()}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:weather-night"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${Ne("config.dashboard_dynamic_bg")}</div>
            <div class="feature-desc">${Ne("config.dashboard_dynamic_bg_desc")}</div>
          </div>
          <span class="toggle ${this._dynamicBackground?"on":""}"></span>
        </button>
      </div>
    `}_sliceFor(e){const t=pi[e];return this.configData?.[t??""]??{}}_renderSubSection(e){const t=this._sliceFor(e);switch(e){case"title":return N`<config-tab-title .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-title>`;case"spotify":return N`<config-tab-spotify .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-spotify>`;case"presence":return N`<config-tab-presence .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-presence>`;case"camera":return N`<config-tab-camera .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-camera>`;case"weather":return N`<config-tab-weather .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-weather>`;case"light":return N`<config-tab-light .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-light>`;case"cover":return N`<config-tab-cover .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-cover>`;case"climate":return N`<config-tab-climate .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-climate>`;case"fan":return N`<config-tab-fan .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-fan>`;case"media":return N`<config-tab-media .hass=${this.hass} .configData=${t} .backend=${this.backend}></config-tab-media>`;default:return N`<div class="placeholder"><ha-icon .icon=${"mdi:hammer-wrench"}></ha-icon><span>${e}</span></div>`}}}li([pe({attribute:!1})],ui.prototype,"hass"),li([pe({attribute:!1})],ui.prototype,"backend"),li([pe({attribute:!1})],ui.prototype,"configData"),li([pe({attribute:!1})],ui.prototype,"rooms"),li([pe()],ui.prototype,"subSection"),li([ue()],ui.prototype,"_enabledCards"),li([ue()],ui.prototype,"_cardOrder"),li([ue()],ui.prototype,"_hideHeader"),li([ue()],ui.prototype,"_hideSidebar"),li([ue()],ui.prototype,"_dynamicBackground"),li([ue()],ui.prototype,"_dragIdx"),li([ue()],ui.prototype,"_dropIdx");try{customElements.define("config-dashboard-view",ui)}catch{}var gi=Object.defineProperty,_i=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&gi(t,i,s),s};const mi=[{id:"navbar",label:"Navbar",icon:"mdi:dock-bottom"},{id:"orphans",label:"Entités orphelines",icon:"mdi:puzzle-outline"},{id:"reconfig",label:"Reconfigurer",icon:"mdi:refresh"}];class fi extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._autoSort=!0}createRenderRoot(){return this}updated(e){if(super.updated(e),e.has("configData")&&this.configData){const e=this.configData;this._autoSort=!1!==e.auto_sort}}render(){return this.subSection?"reconfig"===this.subSection?(this.dispatchEvent(new CustomEvent("reconfig-wizard",{bubbles:!0,composed:!0})),N`<div class="empty-state">Relancement du wizard...</div>`):this._renderSubSection(this.subSection):N`
      <div class="room-grid">
        ${mi.map(e=>N`
            <button
              class="room-card"
              @click=${()=>this.dispatchEvent(new CustomEvent("sub-select",{detail:e.id,bubbles:!0,composed:!0}))}
              aria-label=${e.label}
            >
              <ha-icon .icon=${e.icon}></ha-icon>
              <span class="room-name">${e.label}</span>
            </button>
          `)}
      </div>
    `}_renderSubSection(e){switch(e){case"navbar":return this._renderNavbarSettings();case"orphans":return N`<config-tab-unassigned
          .hass=${this.hass}
          .configData=${this.configData}
          .backend=${this.backend}
        ></config-tab-unassigned>`;default:return N`<div>Section inconnue</div>`}}_renderNavbarSettings(){return N`
      <div class="section-label">${Ne("config.navbar_settings")}</div>
      <div class="feature-list">
        <button class="feature-row" @click=${this._toggleAutoSort}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${Ne("config.navbar_auto_sort")}</div>
            <div class="feature-desc">${Ne("config.navbar_auto_sort_desc")}</div>
          </div>
          <span class="toggle ${this._autoSort?"on":""}" role="switch" aria-checked=${this._autoSort?"true":"false"} aria-label=${Ne("config.navbar_auto_sort")}></span>
        </button>
      </div>
    `}async _toggleAutoSort(){if(this._autoSort=!this._autoSort,this.backend)try{await this.backend.send("set_navbar",{auto_sort:this._autoSort})}catch{}}}_i([pe({attribute:!1})],fi.prototype,"hass"),_i([pe({attribute:!1})],fi.prototype,"backend"),_i([pe({attribute:!1})],fi.prototype,"configData"),_i([pe({attribute:!1})],fi.prototype,"rooms"),_i([pe()],fi.prototype,"subSection"),_i([ue()],fi.prototype,"_autoSort");try{customElements.define("config-advanced-view",fi)}catch{}class vi extends ne{createRenderRoot(){return this}render(){return N`
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
    `}}try{customElements.define("wizard-step-welcome",vi)}catch{}var bi=Object.defineProperty;class yi extends ne{createRenderRoot(){return this}_getRooms(){return this.hass?.areas?Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name)):[]}render(){const e=this._getRooms();return N`
      <div class="wizard-step-icon">
        <ha-icon .icon=${"mdi:home-group"}></ha-icon>
      </div>
      <div class="section-label">Vos pièces (${e.length})</div>
      <div class="wizard-room-list">
        ${e.map(e=>N`
          <div class="wizard-room-chip">
            <ha-icon .icon=${e.icon??"mdi:home"}></ha-icon>
            <span>${e.name}</span>
          </div>
        `)}
        ${0===e.length?N`<div class="section-desc">Aucune pièce détectée dans Home Assistant.</div>`:""}
      </div>
      <div class="section-desc">
        Ces pièces ont été détectées depuis Home Assistant. Vous pourrez les personnaliser plus tard.
      </div>
    `}}((e,t,i)=>{for(var a,r=void 0,s=e.length-1;s>=0;s--)(a=e[s])&&(r=a(t,i,r)||r);r&&bi(t,i,r)})([pe({attribute:!1})],yi.prototype,"hass");try{customElements.define("wizard-step-rooms",yi)}catch{}var wi=Object.defineProperty;class xi extends ne{createRenderRoot(){return this}_countOrphans(){return this.hass?.entities?Object.values(this.hass.entities).filter(e=>!e.disabled_by&&!e.hidden_by&&null===Ze(e,this.hass.devices)).length:0}render(){const e=this._countOrphans();return 0===e?N`
        <div class="wizard-step-icon success">
          <ha-icon .icon=${"mdi:check-circle"}></ha-icon>
        </div>
        <div class="section-label">Entités orphelines</div>
        <div class="banner">
          <ha-icon .icon=${"mdi:check-circle"}></ha-icon>
          <span>Toutes vos entités sont bien assignées à une pièce.</span>
        </div>
      `:N`
      <div class="wizard-step-icon">
        <ha-icon .icon=${"mdi:puzzle-outline"}></ha-icon>
      </div>
      <div class="section-label">Entités orphelines</div>
      <div class="wizard-orphan-count">${e}</div>
      <div class="section-desc">
        entité${e>1?"s":""} non assignée${e>1?"s":""} à une pièce.
        Vous pourrez les assigner dans Avancé › Entités orphelines.
      </div>
    `}}((e,t,i)=>{for(var a,r=void 0,s=e.length-1;s>=0;s--)(a=e[s])&&(r=a(t,i,r)||r);r&&wi(t,i,r)})([pe({attribute:!1})],xi.prototype,"hass");try{customElements.define("wizard-step-orphans",xi)}catch{}class ki extends ne{createRenderRoot(){return this}render(){return N`
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
    `}}try{customElements.define("wizard-step-appearance",ki)}catch{}class $i extends ne{createRenderRoot(){return this}render(){return N`
      <div class="wizard-step-icon success">
        <ha-icon .icon=${"mdi:rocket-launch"}></ha-icon>
      </div>
      <div class="section-label">C'est prêt !</div>
      <div class="section-desc">
        Votre tableau de bord Glass Cards est configuré.
        Explorez vos pièces et personnalisez chaque carte.
      </div>
    `}}try{customElements.define("wizard-step-done",$i)}catch{}var Si=Object.defineProperty,Ci=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Si(t,i,s),s};const Ii=["welcome","rooms","orphans","appearance","done"];class Ei extends ne{constructor(){super(...arguments),this._step=0}createRenderRoot(){return this}_next(){this._step<Ii.length-1&&this._step++}_prev(){this._step>0&&this._step--}_skip(){this._next()}_finish(){this.backend&&this.backend.send("set_wizard_completed",{completed:!0}),this.dispatchEvent(new CustomEvent("wizard-done",{bubbles:!0,composed:!0}))}render(){const e=Ii[this._step],t=this._step===Ii.length-1,i=0===this._step;return N`
      <div class="wizard">
        <div class="wizard-progress">
          ${Ii.map((e,t)=>N`
              <div
                class="wizard-dot ${t===this._step?"active":""} ${t<this._step?"done":""}"
              ></div>
            `)}
        </div>

        <div class="wizard-card">
        <div class="wizard-content">${this._renderStep(e)}</div>

        <div class="wizard-actions">
          ${i?N`<span></span>`:N`<button
                class="btn"
                @click=${()=>this._prev()}
                aria-label="Retour"
              >
                Retour
              </button>`}
          <div class="wizard-actions-right">
            ${t?"":N`<button
                  class="btn btn-ghost"
                  @click=${()=>this._skip()}
                  aria-label="Passer cette étape"
                >
                  Passer
                </button>`}
            ${t?N`<button
                  class="btn btn-accent"
                  @click=${()=>this._finish()}
                  aria-label="Commencer"
                >
                  Commencer
                </button>`:N`<button
                  class="btn btn-accent"
                  @click=${()=>this._next()}
                  aria-label="Étape suivante"
                >
                  Suivant
                </button>`}
          </div>
        </div>
        </div>
      </div>
    `}_renderStep(e){switch(e){case"welcome":return N`<wizard-step-welcome></wizard-step-welcome>`;case"rooms":return N`<wizard-step-rooms .hass=${this.hass}></wizard-step-rooms>`;case"orphans":return N`<wizard-step-orphans .hass=${this.hass}></wizard-step-orphans>`;case"appearance":return N`<wizard-step-appearance></wizard-step-appearance>`;case"done":return N`<wizard-step-done></wizard-step-done>`;default:return N``}}}Ci([pe({attribute:!1})],Ei.prototype,"hass"),Ci([pe({attribute:!1})],Ei.prototype,"backend"),Ci([ue()],Ei.prototype,"_step");try{customElements.define("config-wizard",Ei)}catch{}async function Di(e){if(e.hass&&!e._loading){e._loading=!0;try{await async function(e){if(!e.hass)return;const t=Object.values(e.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let i={room_order:[],hidden_rooms:[],auto_sort:!0},a={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},r={enabled_cards:["weather"],card_order:["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],hide_header:!1,hide_sidebar:!1},s={show_header:!0},o={title:"",sources:[],period_entity:"",period_options:[]},n={show_header:!0,dashboard_entities:[],dashboard_compact:!0,presets:[0,25,50,75,100],entity_presets:{}},c={show_header:!0,entity_id:"",sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},l={show_header:!0},d={extra_entities:{},show_header:!0},h={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}},p={show_header:!0,display_mode:"list",dashboard_display_mode:"list",dashboard_entities:[]},u={show_header:!0,entity_order:[],auto_cycle:!1,cycle_interval:10};const g={};try{if(!e._backend)throw new Error("No backend");const t=await e._backend.send("get_config");i=t.navbar,Object.assign(g,t.rooms),t.weather&&(a=t.weather),t.light_card&&(s=t.light_card),t.title_card&&(o=t.title_card),t.cover_card&&(n=t.cover_card),t.fan_card&&(l=t.fan_card),t.spotify_card&&(c=t.spotify_card),t.media_card&&(d=t.media_card),t.presence_card&&(h=t.presence_card),t.climate_card&&(p=t.climate_card),t.camera_carousel&&(u=t.camera_carousel),t.dashboard&&(r=t.dashboard),void 0!==t.wizard_completed&&(e._wizardCompleted=t.wizard_completed)}catch{}e._navbarConfig=i,e._weatherConfig=a,e._lightConfig=s,e._titleConfig=o,e._coverConfig=n,e._fanConfig=l,e._spotifyConfig=c,e._mediaConfig=d,e._presenceConfig=h,e._climateConfig=p,e._cameraConfig=u,e._dashboardConfig={dashboard:r,title_card:o,light_card:s,weather:a,cover_card:n,fan_card:l,spotify_card:c,media_card:d,presence_card:h,climate_card:p,camera_carousel:u};const _=new Set(i.hidden_rooms),m=new Map;i.room_order.forEach((e,t)=>m.set(e,t));const f=e.hass;if(!f)return;const v=[],b=[];for(const y of t){const e=et(y.area_id,f.entities,f.devices),t=g[y.area_id]?.icon,i=t||y.icon||"mdi:home";if(0===e.length){b.push({areaId:y.area_id,name:y.name,icon:i});continue}let a=0,r=null,s=null,o=null,n=null,c=!1;for(const l of e){const e=f.states[l.entity_id];if(!e)continue;const t=l.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&a++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||r||(r=`${e.state}°`,s=parseFloat(e.state)),"humidity"!==t||o||(o=`${e.state}%`,n=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(c=!0)}v.push({areaId:y.area_id,name:y.name,icon:i,entityCount:e.length,visible:!_.has(y.area_id),lightsOn:a,temperature:r,tempValue:s,humidity:o,humidityValue:n,mediaPlaying:c})}v.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=m.get(e.areaId),a=m.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),e._rooms=v,e._emptyRooms=b,!e._selectedRoom&&v.length>0&&(e._selectedRoom=v[0].areaId)}(e),e._loaded=!0}catch{e._loaded=!1}finally{e._loading=!1}}}var zi=Object.defineProperty,Pi=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&zi(t,i,s),s};class Ti extends ne{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=Ve(),this._nav=rt,this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._toast=!1,this._saving=!1,this._navbarConfig={},this._popupConfig={},this._weatherConfig={},this._titleConfig={},this._lightConfig={},this._coverConfig={},this._fanConfig={},this._climateConfig={},this._presenceConfig={},this._mediaConfig={},this._spotifyConfig={},this._cameraConfig={},this._dashboardConfig={},this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._dragModeSrcIdx=null,this._loaded=!1,this._loading=!1,this._configReady=!1,this._wizardCompleted=!0,this._suppressAutoSave=!1,this._toastError=!1,this._onRoomsChanged=e=>{const t=e.detail;this._rooms=t.rooms},this._onRoomsReordered=e=>{const t=e.detail;this._rooms=t.rooms,this._saveNavbarOrder()},this._onRoomVisibilityToggle=e=>{const{areaId:t,visible:i}=e.detail;this._rooms=this._rooms.map(e=>e.areaId===t?{...e,visible:i}:e),this._saveNavbarOrder()},this._onTabToast=e=>{this._toastError=!e.detail.success,this._toast=!0,void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastTimeout=setTimeout(()=>{this._toast=!1},2500)}}static{this.styles=[$e,Se,Ce,ze,...le]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,this.addEventListener("tab-toast",this._onTabToast),this.addEventListener("rooms-changed",this._onRoomsChanged),this.addEventListener("rooms-reordered",this._onRoomsReordered),this.addEventListener("room-visibility-toggle",this._onRoomVisibilityToggle),this._popstateHandler=e=>{const t=(i=e,i.state?.glassNav??null);var i;t&&(this._nav=t)},window.addEventListener("popstate",this._popstateHandler)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,this.removeEventListener("tab-toast",this._onTabToast),this.removeEventListener("rooms-changed",this._onRoomsChanged),this.removeEventListener("rooms-reordered",this._onRoomsReordered),this.removeEventListener("room-visibility-toggle",this._onRoomVisibilityToggle),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=void 0),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),this._backend=void 0}updated(e){if(super.updated(e),e.has("hass")&&(this.hass?.language&&qe(this.hass.language)&&(this._lang=Ve()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1,this._configReady=!1),!this.hass||this._loaded||this._loading||(this._backend=new at(this.hass),this._loadConfig())),this._loaded&&!this._loading&&!this._saving)return this._configReady?void(this._suppressAutoSave&&(this._suppressAutoSave=!1)):(this._configReady=!0,void(this._wizardCompleted||(this._nav={section:"wizard"})))}_beginSuppressAutoSave(){this._suppressAutoSave=!0}async _saveNavbarOrder(){if(this._backend)try{await this._backend.send("set_navbar",{room_order:this._rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:this._rooms.filter(e=>!e.visible).map(e=>e.areaId)}),this._showToast()}catch{this._showToast(!0)}}_navigateTo(e){var t,i,a;(t=this._nav,i=e,t.section!==i.section||t.subSection!==i.subSection||t.roomId!==i.roomId)&&(a=this._nav,window.history.pushState({glassNav:a},""),this._nav=e)}_goBack(){window.location.href="/"}async _loadConfig(){return Di(this)}async _loadRoomLights(){const e=this.shadowRoot?.querySelector("config-tab-light");e&&e.reload()}async _loadCoverConfig(){const e=this.shadowRoot?.querySelector("config-tab-cover");e&&e.reload()}async _loadFanConfig(){const e=this.shadowRoot?.querySelector("config-tab-fan");e&&e.reload()}async _loadClimateConfig(){const e=this.shadowRoot?.querySelector("config-tab-climate");e&&e.reload()}async _loadMediaConfig(){const e=this.shadowRoot?.querySelector("config-tab-media");e&&e.reload()}async _loadDashboardConfig(){}async _loadPresenceConfig(){const e=this.shadowRoot?.querySelector("config-tab-presence");e&&e.reload()}async _loadCameraCarouselConfig(){const e=this.shadowRoot?.querySelector("config-tab-camera");e&&e.reload()}async _loadWeatherConfig(){return async function(e){const t=e.shadowRoot?.querySelector("config-tab-weather");t&&t.reload()}(this)}async _loadSpotifyConfig(){const e=this.shadowRoot?.querySelector("config-tab-spotify");e&&e.reload()}async _loadTitleConfig(){const e=this.shadowRoot?.querySelector("config-tab-title");e&&e.reload()}async _reset(){return async function(e){e._loading||(e._loaded=!1,await Di(e))}(this)}async _saveClimate(){const e=this.shadowRoot?.querySelector("config-tab-climate");e&&e.save()}async _saveDashboard(){}async _checkSpotifyStatus(){}_onDragStart(e,t,i){!function(e,t,i,a){e._dragIdx=t,e._dragContext=i,void 0!==a&&(e._dragModeSrcIdx=a)}(this,e,t,i)}_onDragOver(e,t,i){!function(e,t,i,a){i.preventDefault(),null!==e._dragIdx&&e._dragIdx!==t&&("title_modes"===e._dragContext&&void 0!==a&&a!==e._dragModeSrcIdx||(e._dropIdx=t))}(this,e,t,i)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t)return e._dragIdx=null,void(e._dropIdx=null);e._dragIdx=null,e._dropIdx=null}(this,e,t)}_onDragEnd(){var e;(e=this)._dragIdx=null,e._dropIdx=null,e._dragModeSrcIdx=null}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_renderSidebar(){const e=[{id:"dashboard",icon:"mdi:view-dashboard",label:Ne("config.nav_dashboard")},{id:"rooms",icon:"mdi:home-group",label:Ne("config.nav_rooms")},{id:"advanced",icon:"mdi:tune-variant",label:Ne("config.nav_advanced")}];return N`
      <nav class="panel-sidebar">
        ${e.map(e=>N`
          <button class="nav-btn ${this._nav.section===e.id?"active":""}"
            @click=${()=>this._navigateTo({section:e.id})}
            aria-label=${e.label}>
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${e.label}</span>
          </button>
        `)}
      </nav>
    `}_renderBreadcrumb(){if("rooms"===this._nav.section&&this._nav.roomId){const e=this.hass?.areas?.[this._nav.roomId];return N`
        <div class="breadcrumb">
          <button @click=${()=>this._navigateTo({section:"rooms"})}>${Ne("config.nav_rooms")}</button>
          <span class="sep">›</span>
          <span class="current">${e?.name||this._nav.roomId}</span>
        </div>
      `}if(this._nav.subSection){const e="dashboard"===this._nav.section?Ne("config.nav_dashboard"):Ne("config.nav_advanced");return N`
        <div class="breadcrumb">
          <button @click=${()=>this._navigateTo({section:this._nav.section})}>${e}</button>
          <span class="sep">›</span>
          <span class="current">${this._subSectionLabel(this._nav.subSection)}</span>
        </div>
      `}return B}_subSectionLabel(e){const t=`config.tab_${{camera:"camera_carousel",orphans:"unassigned"}[e]||e}`,i=Ne(t);return i!==t?i:e}_renderContent(){switch(this._nav.section){case"wizard":return N`<config-wizard
          .hass=${this.hass}
          .backend=${this._backend}
          @wizard-done=${()=>{this._wizardCompleted=!0,this._navigateTo({section:"rooms"})}}
        ></config-wizard>`;case"rooms":return this._nav.roomId?N`<config-room-detail
            .hass=${this.hass}
            .areaId=${this._nav.roomId}
            .configData=${this._navbarConfig}
            .backend=${this._backend}
            .rooms=${this._rooms}
          ></config-room-detail>`:N`<config-room-list
          .hass=${this.hass}
          .rooms=${this._rooms}
          .backend=${this._backend}
          @room-select=${e=>this._navigateTo({section:"rooms",roomId:e.detail})}
        ></config-room-list>`;case"dashboard":return N`<config-dashboard-view
          .hass=${this.hass}
          .backend=${this._backend}
          .configData=${this._dashboardConfig}
          .rooms=${this._rooms}
          .subSection=${this._nav.subSection}
          @sub-select=${e=>this._navigateTo({section:"dashboard",subSection:e.detail})}
        ></config-dashboard-view>`;case"advanced":return N`<config-advanced-view
          .hass=${this.hass}
          .backend=${this._backend}
          .configData=${this._navbarConfig}
          .rooms=${this._rooms}
          .subSection=${this._nav.subSection}
          @sub-select=${e=>this._navigateTo({section:"advanced",subSection:e.detail})}
          @reconfig-wizard=${()=>this._navigateTo({section:"wizard"})}
        ></config-advanced-view>`;default:return B}}render(){return this._lang,this.hass?N`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="${Ne("common.back")}"><ha-icon .icon=${"mdi:chevron-left"}></ha-icon></button>
          <span class="page-title">${Ne("config.title")}</span>
          <span class="page-subtitle">${Ne("config.brand")}</span>
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
        ${this._toastError?Ne("common.error_save"):Ne("common.config_saved")}
      </div>
    `:B}}Pi([pe({attribute:!1})],Ti.prototype,"hass"),Pi([pe({type:Boolean})],Ti.prototype,"narrow"),Pi([ue()],Ti.prototype,"_lang"),Pi([ue()],Ti.prototype,"_nav"),Pi([ue()],Ti.prototype,"_rooms"),Pi([ue()],Ti.prototype,"_emptyRooms"),Pi([ue()],Ti.prototype,"_selectedRoom"),Pi([ue()],Ti.prototype,"_toast"),Pi([ue()],Ti.prototype,"_saving"),Pi([ue()],Ti.prototype,"_dragIdx"),Pi([ue()],Ti.prototype,"_dropIdx"),Pi([ue()],Ti.prototype,"_dragContext"),Pi([ue()],Ti.prototype,"_dragModeSrcIdx"),Pi([ue()],Ti.prototype,"_toastError");try{customElements.define("glass-config-panel",Ti)}catch{}Ye("glass-light-card-editor");var Li=Object.defineProperty,Ai=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Li(t,i,s),s};const Mi=[[3e3,"light.temp_warm","#ffd4a3"],[4e3,"light.temp_warm","#ffedb3"],[4800,"light.temp_neutral","#fff5e6"],[9999,"light.temp_cold","#e0ecf5"]];function Oi(e){for(const[t,i,a]of Mi)if(e<t)return{label:Ne(i),color:a};return{label:Ne("light.temp_cold"),color:"#e0ecf5"}}function Ri(e,t){return`rgba(${e[0]},${e[1]},${e[2]},${t})`}const ji=[[251,191,36],[248,113,113],[244,114,182],[167,139,250],[129,140,248],[96,165,250],[74,222,128],[240,240,240]];const Hi=["off","candle","fire"];class Fi extends Qe{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null,this._showHeader=!0,this._lightConfigLoaded=!1,this._throttleTimers=new Map,this._roomConfig=null,this._roomConfigLoaded=!1,this._lightsFingerprint="",this._schedules=null,this._schedulesLoaded=!1,this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._wheelCanvas=null}static getConfigElement(){return document.createElement("glass-light-card-editor")}get _isDashboardMode(){return!(this.areaId||this._config?.area)&&!this._config?.entity}static{this.styles=[$e,Se,Ce,Te,Ie,ze,Oe,s`
      :host {
        width: 100%;
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
    `]}setConfig(e){super.setConfig(e)}getCardSize(){if(this._isDashboardMode){const e=this._getLights().length;return 0===e?1:Math.min(e,6)+1}return 3}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null),null!==this._colorPickerEntity&&(this._colorPickerEntity=null,this._colorPickerPos=null)}connectedCallback(){super.connectedCallback(),this._listen("room-config-changed",e=>{const t=this.areaId||this._config?.area;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._dashboardTotalCache=void 0,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadDashboardHidden())}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._cachedLightIds=void 0,this._lightsFingerprint="",this._loadSchedules()}),this._listen("light-config-changed",()=>{this._lightConfigLoaded=!1,this._loadLightConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear(),this._backend=void 0,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1}async _loadRoomConfig(){const e=this.areaId||this._config?.area;if(e&&this.hass&&!this._roomConfigLoaded){this._roomConfigLoaded=!0,this._lastLoadedAreaId=e;try{this._backend||(this._backend=new at(this.hass));const t=await this._backend.send("get_room",{area_id:e});if((this.areaId||this._config?.area)!==e)return;this._roomConfig=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new at(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedLightIds=void 0,this._lightsFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadLightConfig(){if(this.hass&&!this._lightConfigLoaded){this._lightConfigLoaded=!0;try{this._backend||(this._backend=new at(this.hass));const e=await this._backend.send("get_config");e?.light_card&&(this._showHeader=e.light_card.show_header??!0)}catch{}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new at(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardTotalCache=void 0,this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedLightIds=void 0,this._lightsFingerprint="",this._throttleTimers.forEach(e=>clearTimeout(e)),this._throttleTimers.clear()}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?it("light",this.hass,this.visibleAreaIds):this._getLights().map(e=>e.entity_id)}updated(e){super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._lightConfigLoaded&&this._loadLightConfig();const t=this.areaId||this._config?.area;if(t&&this.hass&&(this._lastLoadedAreaId!==t&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedLightIds=void 0,this._lightsFingerprint="")}e.has("visibleAreaIds")&&(this._cachedLightIds=void 0,this._lightsFingerprint="",this._dashboardHiddenLoaded=!1);const i=this._getLightInfos();if(i.some(e=>e.isOn)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on"),e.has("hass")&&this._dragValues.size>0){let e=!1;const t=new Map(this._dragValues);for(const a of i){const i=`bri:${a.entityId}`,r=t.get(i);void 0!==r&&Math.abs(a.brightnessPct-r)<=2&&(t.delete(i),e=!0);const s=`temp:${a.entityId}`,o=t.get(s);void 0!==o&&null!==a.colorTempKelvin&&Math.abs(a.colorTempKelvin-o)<=50&&(t.delete(s),e=!0)}e&&(this._dragValues=t)}if(this._colorPickerEntity){const e=this.renderRoot.querySelector(".cp-wheel-wrap canvas");e&&e.dataset.drawnFor!==this._colorPickerEntity&&(!function(e){const t=e.getBoundingClientRect(),i=Math.round(t.width)||220,a=window.devicePixelRatio||1;e.width=i*a,e.height=i*a;const r=e.getContext("2d");if(!r)return;r.scale(a,a);const s=i/2,o=i/2,n=i/2;for(let c=0;c<360;c++){const e=(c-1)*Math.PI/180,t=(c+1)*Math.PI/180,i=r.createRadialGradient(s,o,0,s,o,n),[a,l,d]=Le(c,1);i.addColorStop(0,"#ffffff"),i.addColorStop(1,`rgb(${a},${l},${d})`),r.beginPath(),r.moveTo(s,o),r.arc(s,o,n,e,t),r.closePath(),r.fillStyle=i,r.fill()}}(e),e.dataset.drawnFor=this._colorPickerEntity)}}_getLights(){if(!this.hass)return[];const e=this._getLightIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._lightsFingerprint&&this._cachedLightsResult)return this._cachedLightsResult;let i;return this._lightsFingerprint=t,i=this._isDashboardMode?e.map(e=>this.hass?.states[e]).filter(e=>!!e&&"on"===e.state&&tt(e.entity_id,this._schedules)).sort((e,t)=>{const i=e.attributes.friendly_name||e.entity_id,a=t.attributes.friendly_name||t.entity_id;return i.localeCompare(a)}):e.map(e=>this.hass?.states[e]).filter(e=>void 0!==e),this._cachedLightsResult=i,i}_getLightIds(){return this._cachedLightIds||(this._cachedLightIds=this._computeLightIds()),this._cachedLightIds}_computeLightIds(){if(!this.hass)return[];const e=this.areaId||this._config?.area;if(e){const t=this._config?.hidden_entities??[],i=this._roomConfig?.hidden_entities??[],a=new Set([...t,...i]),r=et(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light.")&&!a.has(e.entity_id)&&tt(e.entity_id,this._schedules)).map(e=>e.entity_id),s=this._config?.entity_order??[],o=s.length>0?s:this._roomConfig?.entity_order??[];if(o.length>0){const e=new Map;o.forEach((t,i)=>e.set(t,i)),r.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return r}if(this._config?.entity)return tt(this._config.entity,this._schedules)&&this.hass.states[this._config.entity]?[this._config.entity]:[];if(this._isDashboardMode){const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of et(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getDashboardLightTotal(){if(!this.hass||!this.hass.entities||!this.hass.devices)return 0;if(void 0!==this._dashboardTotalCache&&this._dashboardTotalEntitiesRef===this.hass.entities)return this._dashboardTotalCache;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length)return 0;const t=new Set;for(const i of e)for(const e of et(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("light.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.add(e.entity_id);return this._dashboardTotalEntitiesRef=this.hass.entities,this._dashboardTotalCache=t.size,t.size}_getLightInfos(){return this._getLights().map(e=>this._buildLightInfo(e))}_buildLightInfo(e){const t="on"===e.state,i=function(e){const t=e.attributes.supported_color_modes;return t&&0!==t.length?t.some(e=>["hs","rgb","rgbw","rgbww","xy"].includes(e))?"rgb":t.includes("color_temp")?"color_temp":t.includes("brightness")?"dimmable":"simple":void 0!==e.attributes.brightness?"dimmable":"simple"}(e),a=e.attributes.brightness,r=t&&void 0!==a?Math.round(a/255*100):0;let s=null;const o=e.attributes.min_color_temp_kelvin||2e3,n=e.attributes.max_color_temp_kelvin||6500;t&&"color_temp"===i&&(s=e.attributes.color_temp_kelvin||null);let c=null;t&&"rgb"===i&&(c=e.attributes.rgb_color||null);const l=this.hass?.entities[e.entity_id]?.icon,d=e.attributes.icon,h=l||d||"mdi:lightbulb";return{entity:e,entityId:e.entity_id,name:e.attributes.friendly_name||e.entity_id,icon:h,isOn:t,type:i,brightnessPct:r,colorTempKelvin:s,minKelvin:o,maxKelvin:n,rgbColor:c}}_toggleLight(e){Je(this,"light"),this._safeCallService("light","toggle",{},{entity_id:e})}_toggleAll(){Je(this,"light");const e=this._getLights(),t=e.some(e=>"on"===e.state),i=t?"turn_off":"turn_on",a=e.map(e=>e.entity_id);this._safeCallService("light",i,{},{entity_id:a}),t&&(this._expandedEntity=null)}_turnAllOff(){const e=this._getLights().map(e=>e.entity_id);this._safeCallService("light","turn_off",{},{entity_id:e}),this._expandedEntity=null}_hasControls(e){if("simple"!==e.type)return!0;const t=e.entity.attributes.effect_list;if(t&&t.length>0){const e=t.map(e=>e.toLowerCase());if(Hi.filter(t=>"off"===t||e.includes(t)).length>1)return!0}return!1}_expandFold(e,t,i){i||(i=this._getLightInfos().find(t=>t.entityId===e)),i&&!this._hasControls(i)||(t?this._expandedEntity===e?this._expandedEntity=null:this._expandedEntity=e:this._toggleLight(e))}_onSliderInput(e,t,i){const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a;const r=this._throttleTimers.get(e);void 0!==r&&clearTimeout(r),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),i(this._dragValues.get(e)??t)},100))}_onSliderChange(e,t,i){Je(this,"light");const a=new Map(this._dragValues);a.set(e,t),this._dragValues=a,i(t);const r=this._throttleTimers.get(e);void 0!==r&&clearTimeout(r),this._throttleTimers.delete(e)}_setBrightness(e,t){this._safeCallService("light","turn_on",{brightness_pct:t},{entity_id:e})}_setColorTemp(e,t){this._safeCallService("light","turn_on",{color_temp_kelvin:t},{entity_id:e})}_setHsColor(e,t,i){this._safeCallService("light","turn_on",{hs_color:[t,100*i]},{entity_id:e})}_setEffect(e,t){this._safeCallService("light","turn_on",{effect:t},{entity_id:e})}_openColorPicker(e,t){this._colorPickerEntity=e,this._colorPickerRgb=t??[255,255,255],this._colorPickerPos=t?function(e){const{h:t,s:i}=Ae(e),a=Math.min(i,1),r=t*Math.PI/180;return{x:Math.cos(r)*a*50+50,y:Math.sin(r)*a*50+50}}(t):null,this._colorPickerHs=t?Ae(t):null}_closeColorPicker(){this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._colorPickerHs=null}_onWheelInteraction(e){const t=this._wheelCanvas;if(!t)return;const i=function(e,t,i){const a=e.getBoundingClientRect(),r=t-a.left-a.width/2,s=i-a.top-a.height/2,o=a.width/2,n=Math.sqrt(r*r+s*s),c=Math.min(n,o),l=(180*Math.atan2(s,r)/Math.PI%360+360)%360,d=c/o,h=Le(l,d),p=n>0?c/n:1;return{rgb:h,hex:Me(h),hs:{h:l,s:d},pos:{x:r*p/o*50+50,y:s*p/o*50+50}}}(t,"touches"in e?e.touches[0].clientX:e.clientX,"touches"in e?e.touches[0].clientY:e.clientY);if(this._colorPickerPos=i.pos,this._colorPickerRgb=i.rgb,this._colorPickerHs=i.hs,this._colorPickerEntity){const e=`cp:${this._colorPickerEntity}`,t=this._throttleTimers.get(e);void 0!==t&&clearTimeout(t),this._throttleTimers.set(e,setTimeout(()=>{this._throttleTimers.delete(e),this._colorPickerEntity&&this._colorPickerHs&&this._setHsColor(this._colorPickerEntity,this._colorPickerHs.h,this._colorPickerHs.s)},150))}}_getEntityLayout(e){const t=this._config?.entity_layouts??{},i=this._roomConfig?.entity_layouts??{};return"full"===(t[e]||i[e])?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_buildLayout(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;r?(t.push({kind:"compact-pair",left:a,right:r}),i+=2):(t.push({kind:"full",light:a}),i++)}else t.push({kind:"full",light:a}),i++}return t}_computeTint(e){const t=e.filter(e=>e.isOn);if(0===t.length)return null;const i=t.length/e.length;let a="#fbbf24";const r=t.find(e=>"rgb"===e.type&&e.rgbColor);return r?.rgbColor&&(a=Me(r.rgbColor)),{background:`radial-gradient(ellipse at 30% 30%, ${a}, transparent 70%)`,opacity:(.18*i).toFixed(3)}}_renderSubText(e){if(!e.isOn)return N`<span class="light-brightness-text">${Ne("common.off")}</span>`;if("simple"===e.type)return N`<span class="light-brightness-text">${Ne("common.on")}</span>`;const t=[N`<span class="light-brightness-text">${e.brightnessPct}%</span>`];if("color_temp"===e.type&&e.colorTempKelvin){const i=Oi(e.colorTempKelvin);t.push(N`<span class="light-temp-dot" style="background:${i.color}"></span>`),t.push(N`<span class="light-temp-text">${i.label}</span>`)}if("rgb"===e.type&&e.rgbColor){const i=Me(e.rgbColor);t.push(N`<span class="light-temp-dot" style="background:${i}"></span>`),t.push(N`<span class="light-temp-text">${Ne("light.color")}</span>`)}return t}_renderLightRow(e,t,i){const a=Re(e.entity.state),r=["light-row",t?"compact":"",i?"compact-right":"",a?"entity-unavailable":""].filter(Boolean).join(" "),s=e.isOn&&"rgb"===e.type&&e.rgbColor?`--light-rgb:${Me(e.rgbColor)};--light-rgb-bg:${Ri(e.rgbColor,.1)};--light-rgb-border:${Ri(e.rgbColor,.15)};--light-rgb-glow:${Ri(e.rgbColor,.4)};--light-rgb-sub:${Ri(e.rgbColor,.55)}`:"",o=["light-icon-btn",e.isOn?"on":"",e.isOn&&e.rgbColor?"rgb":""].filter(Boolean).join(" "),n=this._bindGesture({onTap:()=>this._toggleLight(e.entityId),onLongPress:()=>this._expandFold(e.entityId,e.isOn,e),exclude:".light-icon-btn"});return N`
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
          aria-label="${Ne("light.toggle_aria",{name:e.name})}"
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
        <button
          class="light-expand-btn"
          aria-label="${e.isOn?Ne("light.expand_aria",{name:e.name}):e.name}"
          aria-expanded=${e.isOn?this._expandedEntity===e.entityId?"true":"false":B}
        >
          <div class="light-info">
            <div class="light-name">${De(e.name,t?12:Ee)}</div>
            <div class="light-sub">${this._renderSubText(e)}</div>
          </div>
          ${a?N`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:N`<span class="light-dot"></span>`}
        </button>
      </div>
    `}_getSliderColor(e){if("rgb"===e.type&&e.rgbColor){const[t,i,a]=e.rgbColor;return`${t},${i},${a}`}if("color_temp"===e.type&&e.colorTempKelvin){const t=Oi(e.colorTempKelvin).color;return`${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)}`}return"var(--rgb-light-glow)"}_getFoldColor(e){if(e.rgbColor)return`rgba(${e.rgbColor[0]},${e.rgbColor[1]},${e.rgbColor[2]},0.3)`;if("color_temp"===e.type&&e.colorTempKelvin){const{color:t}=Oi(e.colorTempKelvin);return`rgba(${parseInt(t.slice(1,3),16)},${parseInt(t.slice(3,5),16)},${parseInt(t.slice(5,7),16)},0.3)`}return"rgba(var(--rgb-light-glow),0.25)"}_renderControlFold(e,t=!1){const i=this._expandedEntity===e.entityId&&e.isOn,a="rgb"===e.type,r=this._getSliderColor(e),s=this._getFoldColor(e);return N`
      <div class="fold-sep ${i?"visible":""}" style="--fold-color:${s}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${a}>
            <span class="ctrl-label">${e.name}</span>

            ${"simple"!==e.type?this._renderBrightnessSlider(e,r):B}
            ${"color_temp"===e.type?this._renderTempSlider(e):B}
            ${"rgb"===e.type?this._renderColorRow(e):B}
            ${this._renderEffectChips(e)}
          </div>
        </div>
      </div>
      ${t?B:N`<div class="fold-sep ${i?"visible":""}" style="--fold-color:${s}"></div>`}
    `}_renderColorRow(e){return N`
      <div class="color-row">
        ${ji.map(t=>{const i=!!e.rgbColor&&function(e,t){const i=Ae(e),a=Ae(t),r=Math.abs(i.h-a.h);return(r<5||r>355)&&Math.abs(i.s-a.s)<.08}(e.rgbColor,t);return N`
            <button
              class="cdot ${i?"active":""}"
              style="--cdot-color:${Me(t)}"
              @click=${()=>{const i=Ae(t);this._setHsColor(e.entityId,i.h,i.s)}}
              aria-label="${Ne("light.color_aria",{hex:Me(t)})}"
            ></button>
          `})}
        <button
          class="color-picker-btn"
          @click=${()=>this._openColorPicker(e.entityId,e.rgbColor)}
          aria-label="${Ne("light.color_picker_aria")}"
        ></button>
      </div>
    `}_renderEffectChips(e){const t=e.entity.attributes.effect_list;if(!t||0===t.length)return B;const i=Hi.filter(e=>"off"===e||t.includes(e));if(i.length<=1)return B;const a=e.entity.attributes.effect?.toLowerCase();return N`
      <div class="color-row" style="flex-wrap:wrap">
        ${i.map(t=>N`
            <button
              class="cdot effect-chip ${a===t||!a&&"off"===t?"active":""}"
              @click=${()=>this._setEffect(e.entityId,t)}
              aria-label="${Ne(`light.effect_${t}`)}"
            >${Ne(`light.effect_${t}`)}</button>
          `)}
      </div>
    `}_renderColorPicker(){if(!this._colorPickerEntity||!this._colorPickerRgb)return B;const e=Me(this._colorPickerRgb);return N`
      <div class="color-picker-overlay" role="presentation" @click=${e=>{e.target.classList.contains("color-picker-overlay")&&this._closeColorPicker()}}>
        <div class="color-picker-dialog">
          <span class="cp-title">${Ne("light.color_picker_title")}</span>
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
            ${Ne("common.close")}
          </button>
        </div>
      </div>
    `}_renderBrightnessSlider(e,t){const i=`bri:${e.entityId}`,a=this._dragValues.get(i)??e.brightnessPct;return N`
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
    `}_renderTempSlider(e){const t=`temp:${e.entityId}`,i=e.colorTempKelvin||e.minKelvin,a=this._dragValues.get(t)??i,r=Oi(a).color,s=`${parseInt(r.slice(1,3),16)},${parseInt(r.slice(3,5),16)},${parseInt(r.slice(5,7),16)}`;return N`
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
    `}_renderGrid(e){const t=this._buildLayout(e),i=[];for(let a=0;a<t.length;a++){const e=t[a],r=a===t.length-1;"full"===e.kind?(i.push(this._renderLightRow(e.light,!1,!1)),i.push(this._renderControlFold(e.light,r))):(i.push(this._renderLightRow(e.left,!0,!1)),e.right&&i.push(this._renderLightRow(e.right,!0,!0)),i.push(this._renderControlFold(e.left,r)),e.right&&i.push(this._renderControlFold(e.right,r)))}return i}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],r=i+1<e.length?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(N`
          ${this._renderLightRow(a,!0,!1)}
          ${this._renderLightRow(r,!0,!0)}
          ${this._renderControlFold(a,s)}
          ${this._renderControlFold(r,s)}
        `),i+=2}else t.push(N`
          ${this._renderLightRow(a,!1,!1)}
          ${this._renderControlFold(a,!0)}
        `),i++}return t}_renderDashboard(){const e=this._getLightInfos();if(0===e.length)return B;const t=e.slice(0,6),i=e.length-6,a=this._computeTint(e),r=e.length,s=Math.max(this._getDashboardLightTotal(),r),o=r===s?"all":"some";return N`
      ${this._showHeader?N`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${Ne("light.dashboard_title")}</span>
            <span class="card-count ${o}">${r}/${s}</span>
          </div>
          <button
            class="toggle-all on"
            role="switch"
            aria-checked="true"
            @click=${()=>this._turnAllOff()}
            aria-label="${Ne("light.dashboard_turn_all_off_aria")}"
          ></button>
        </div>
      `:B}

      <div class="card glass">
        <div
          class="tint"
          style=${a?`background:${a.background};opacity:${a.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(t)}
          </div>
          ${i>0?N`<div class="dashboard-overflow">
                ${Ne("light.dashboard_overflow",{count:String(i)})}
              </div>`:B}
        </div>
      </div>
      ${this._renderColorPicker()}
    `}render(){if(this._lang,this._isDashboardMode){const e=this._renderDashboard();return this.style.display=e===B?"none":"",e}const e=this._getLightInfos();if(0===e.length)return this.style.display="none",B;this.style.display="";const t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,r=0===t?"none":t===i?"all":"some",s=this._computeTint(e);return N`
      ${this._showHeader?N`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${Ne("light.title")}</span>
            <span class="card-count ${r}">${t}/${i}</span>
          </div>
          <button
            class="toggle-all ${a?"on":""}"
            @click=${()=>this._toggleAll()}
            role="switch"
            aria-checked=${a?"true":"false"}
            aria-label="${Ne(a?"light.toggle_all_on_aria":"light.toggle_all_off_aria")}"
          ></button>
        </div>
      `:B}

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
    `}}Ai([pe({attribute:!1})],Fi.prototype,"areaId"),Ai([pe({attribute:!1})],Fi.prototype,"visibleAreaIds"),Ai([ue()],Fi.prototype,"_expandedEntity"),Ai([ue()],Fi.prototype,"_dragValues"),Ai([ue()],Fi.prototype,"_colorPickerEntity"),Ai([ue()],Fi.prototype,"_colorPickerRgb"),Ai([ue()],Fi.prototype,"_colorPickerPos"),Ai([ue()],Fi.prototype,"_showHeader");try{customElements.define("glass-light-card",Fi)}catch{}const qi=1,Vi=2,Ni=4,Ui=8,Wi=16,Bi=32,Ki=64,Yi=128,Gi=256,Xi={heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},Qi={heat:"var(--cl-heat)",cool:"var(--cl-cool)",heat_cool:"var(--cl-auto)",auto:"var(--cl-auto)",dry:"var(--cl-dry)",fan_only:"var(--cl-fan)",off:"var(--t4)"},Ji={heating:"climate.action_heating",cooling:"climate.action_cooling",idle:"climate.action_idle",off:"climate.action_off",drying:"climate.action_drying",preheating:"climate.action_heating"},Zi={eco:"mdi:leaf",comfort:"mdi:sofa",boost:"mdi:rocket-launch",away:"mdi:home-export-outline",sleep:"mdi:bed",activity:"mdi:motion-sensor",none:"mdi:cancel"},ea={heat:"climate.mode_heat",cool:"climate.mode_cool",heat_cool:"climate.mode_heat_cool",auto:"climate.mode_auto",dry:"climate.mode_dry",fan_only:"climate.mode_fan_only",off:"climate.mode_off"},ta={eco:"climate.preset_eco",comfort:"climate.preset_comfort",boost:"climate.preset_boost",away:"climate.preset_away",sleep:"climate.preset_sleep",activity:"climate.preset_activity",none:"climate.preset_none"};const ia=120,aa=125,ra=90,sa=-120,oa={heating:"mdi:fire",cooling:"mdi:snowflake",idle:"mdi:timer-sand",off:"mdi:power-standby",drying:"mdi:water-percent",preheating:"mdi:fire"};function na(e,t,i,a){const r=function(e){return(e-90)*Math.PI/180}(a);return{x:e+i*Math.cos(r),y:t+i*Math.sin(r)}}function ca(e,t){const i=na(ia,aa,ra,e),a=na(ia,aa,ra,t);return`M ${i.x} ${i.y} A 90 90 0 1 1 ${a.x} ${a.y}`}function la(e){const t=e.attributes,i="unavailable"===e.state||"unknown"===e.state,a="off"===e.state||i,r=i?"off":t.hvac_action||("off"===e.state?"off":"idle"),s=e.state,o=t.current_temperature,n=t.temperature??o??0,c=t.min_temp||7,l=t.max_temp||35,d=t.current_humidity,h=t.preset_mode,p=Math.PI*ra*(240/180),u=(null!=o?Math.max(0,Math.min(1,(o-c)/(l-c))):0)*p,g=function(e,t){return"heating"===e||"preheating"===e?"heat":"cooling"===e?"cool":"auto"===t||"heat_cool"===t?"auto-arc":"off"}(r,s),_=function(e){return"heating"===e||"preheating"===e?"heat":"cooling"===e?"cool":"idle"===e?"idle":"off"}(r),m=function(e,t,i){const a=Math.max(0,Math.min(1,(e-t)/(i-t)));return sa+240*a}(n,c,l),f=na(ia,aa,ra,m),v=[];for(let x=0;x<=12;x++){const e=sa+x/12*240,t=x%3==0;v.push({inner:na(ia,aa,86,e),outer:na(ia,aa,ra+(t?6:3),e),isMajor:t,labelPos:na(ia,aa,104,e),labelTemp:c+x/12*(l-c)})}const b=Ji[r]||"climate.unknown",y=oa[r]||"mdi:help",w=null!=d||h&&"none"!==h;return N`
    <div class="gauge-section">
      <div class="arc-gauge">
        <svg viewBox="0 0 240 165" fill="none">
          ${v.map(e=>U`
            <line x1=${e.inner.x} y1=${e.inner.y} x2=${e.outer.x} y2=${e.outer.y}
              class=${e.isMajor?"arc-tick-major":"arc-tick"} />
            ${e.isMajor?U`
              <text x=${e.labelPos.x} y=${e.labelPos.y} class="arc-tick-label">
                ${Math.round(e.labelTemp)}°
              </text>
            `:B}
          `)}
          <path d=${ca(sa,120)} class="arc-bg" />
          ${a?B:U`
            <path d=${ca(sa,120)}
              class="arc-progress ${g}"
              stroke-dasharray=${p}
              stroke-dashoffset=${p-u} />
            <circle cx=${f.x} cy=${f.y} r="5" class="arc-target-dot" />
          `}
        </svg>
        <div class="gauge-center">
          <div class="gauge-current-temp ${a?"off":""}">${null!=o?N`${o.toFixed(1)}<span class="unit">°</span>`:"--"}</div>
          <div class="gauge-action-label ${_}">
            <ha-icon .icon=${y} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${Ne(b)}</span>
          </div>
          ${w?N`
            <div class="gauge-sub-info">
              ${null!=d?N`
                <ha-icon .icon=${"mdi:water-percent"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${d}%</span>
              `:B}
              ${h&&"none"!==h?N`
                ${null!=d?N`<span style="opacity:0.4">·</span>`:B}
                <ha-icon .icon=${Zi[h]||"mdi:cog"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                <span>${ta[h]?Ne(ta[h]):h}</span>
              `:B}
            </div>
          `:B}
        </div>
      </div>
    </div>
  `}class da{constructor(){this._canvas=null,this._particles=[],this._animFrame=null,this._currentAction="",this._width=0,this._height=0}attach(e){this._canvas=e}update(e,t,i){if(e===this._currentAction&&this._animFrame&&t===this._width&&i===this._height)return;if(this._currentAction=e,this._width=t,this._height=i,this.stop(),"off"===e||"idle"===e||!e){if(this._particles=[],this._canvas){const e=this._canvas.getContext("2d");e&&e.clearRect(0,0,this._canvas.width,this._canvas.height)}return}const a="heating"===e||"preheating"===e,r=2*t,s=2*i;if(this._particles=Array.from({length:30},()=>({x:Math.random()*r,y:Math.random()*s,size:1+2.5*Math.random(),speedX:.3*(Math.random()-.5),speedY:a?-(.3+.8*Math.random()):.3+.8*Math.random(),opacity:.1+.3*Math.random(),life:Math.random()})),!this._canvas)return;this._canvas.width=r,this._canvas.height=s,this._canvas.style.width=t+"px",this._canvas.style.height=i+"px";const o=this._canvas.getContext("2d");if(!o)return;const n=a?[249,115,22]:[56,189,248],c=()=>{o.clearRect(0,0,r,s);for(const e of this._particles){e.x+=e.speedX,e.y+=e.speedY,e.life+=.003;let t=e.opacity;e.life<.1&&(t*=e.life/.1),e.life>.8&&(t*=Math.max(0,(1-e.life)/.2)),(a&&e.y<-10||!a&&e.y>s+10||e.life>1)&&(e.y=a?s+10:-10,e.x=Math.random()*r,e.life=0),o.beginPath(),o.arc(e.x,e.y,e.size,0,2*Math.PI),o.fillStyle=`rgba(${n[0]},${n[1]},${n[2]},${t})`,o.fill(),o.beginPath(),o.arc(e.x,e.y,3*e.size,0,2*Math.PI),o.fillStyle=`rgba(${n[0]},${n[1]},${n[2]},${.15*t})`,o.fill()}this._animFrame=requestAnimationFrame(c)};c()}stop(){this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null)}destroy(){this.stop(),this._canvas=null,this._particles=[],this._currentAction=""}}Ye("glass-climate-card-editor");var ha=Object.defineProperty,pa=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ha(t,i,s),s};const ua={heating:0,cooling:1,idle:2,off:3};class ga extends Qe{constructor(){super(...arguments),this._showHeader=!0,this._displayMode="list",this._configReady=!1,this._expanded=null,this._selectedEntity=null,this._foldOpen=!1,this._climateConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._cachedClimatesFingerprint="",this._dashboardEntities=[],this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._pendingTemps=new Map,this._schedules=null,this._schedulesLoaded=!1,this._rangeState={dragging:null,lowTemp:0,highTemp:0},this._rangeDragEntity=null,this._rangeDragCleanup=null}static getConfigElement(){return document.createElement("glass-climate-card-editor")}getCardSize(){return 3}get _isDashboardMode(){return!this.areaId}connectedCallback(){super.connectedCallback(),this._listen("climate-config-changed",()=>{this._climateConfigLoaded=!1,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._loadConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._climateConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear(),this._pendingTemps.clear(),this._rangeDragCleanup&&(this._rangeDragCleanup(),this._rangeDragCleanup=null),this._thermalCanvas&&(this._thermalCanvas.destroy(),this._thermalCanvas=void 0)}_collapseExpanded(){null!==this._expanded&&(this._expanded=null),this._foldOpen&&(this._foldOpen=!1)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._climateConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._climateConfigLoaded&&this._loadConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="")}e.has("visibleAreaIds")&&(this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this._dashboardHiddenLoaded=!1),"normal"===this._displayMode?this._updateThermalCanvas():this._thermalCanvas&&(this._thermalCanvas.destroy(),this._thermalCanvas=void 0)}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?it("climate",this.hass,this.visibleAreaIds):this._getClimateIds()}async _loadConfig(){if(this.hass&&!this._climateConfigLoaded){this._climateConfigLoaded=!0;try{this._backend||(this._backend=new at(this.hass));const e=await this._backend.send("get_config");e?.climate_card&&(this._showHeader=e.climate_card.show_header??!0,this._displayMode=this.areaId?e.climate_card.display_mode??"list":e.climate_card.dashboard_display_mode??"list",this._dashboardEntities=e.climate_card.dashboard_entities??[],this._cachedClimateIds=void 0,this._cachedClimatesFingerprint=""),this._configReady=!0}catch{this._configReady=!0}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new at(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new at(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new at(this.hass));const t=this._backend,i=new Set,a=await Promise.all(e.map(e=>t.send("get_room",{area_id:e})));for(const e of a)if(e?.hidden_entities)for(const t of e.hidden_entities)i.add(t);this._dashboardHiddenEntities=i,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expanded=null,this._selectedEntity=null,this._foldOpen=!1,this._cachedClimateIds=void 0,this._cachedClimatesFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear(),this._pendingTemps.clear()}_getClimateIds(){return this._cachedClimateIds||(this._cachedClimateIds=this._computeClimateIds()),this._cachedClimateIds}_computeClimateIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=et(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("climate.")&&!e.has(t.entity_id)&&tt(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return t}if(this._isDashboardMode){if(this._dashboardEntities.length>0)return this._dashboardEntities.filter(e=>this.hass?.states[e]&&tt(e,this._schedules));const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of et(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("climate.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getClimates(){if(!this.hass)return[];const e=this._getClimateIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._cachedClimatesFingerprint&&this._cachedClimatesResult)return this._cachedClimatesResult;this._cachedClimatesFingerprint=t;const i=e.map(e=>this.hass?.states[e]).filter(e=>null!=e);return this._cachedClimatesResult=i,this._cachedClimatesResult}_toggle(e,t,i){if(i.stopPropagation(),!this.hass)return;const a=t.attributes.supported_features||0;if("off"===t.state)if(a&Yi)this._safeCallService("climate","turn_on",{},{entity_id:e});else{const i=(t.attributes.hvac_modes||[]).find(e=>"off"!==e);i&&this._safeCallService("climate","set_hvac_mode",{hvac_mode:i},{entity_id:e})}else a&Gi?this._safeCallService("climate","turn_off",{},{entity_id:e}):this._safeCallService("climate","set_hvac_mode",{hvac_mode:"off"},{entity_id:e})}_setHvacMode(e,t){this.hass&&(Je(this,"light"),this._safeCallService("climate","set_hvac_mode",{hvac_mode:t},{entity_id:e}))}_setPreset(e,t){this.hass&&(Je(this,"light"),this._safeCallService("climate","set_preset_mode",{preset_mode:t},{entity_id:e}))}_setFanMode(e,t){this.hass&&this._safeCallService("climate","set_fan_mode",{fan_mode:t},{entity_id:e})}_setSwingMode(e,t){this.hass&&this._safeCallService("climate","set_swing_mode",{swing_mode:t},{entity_id:e})}_setTemperature(e,t){if(!this.hass)return;Je(this,"light"),this._pendingTemps.set(`temp_${e}`,t),this.requestUpdate();const i=`temp_throttle_${e}`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("climate","set_temperature",{temperature:t},{entity_id:e}),this._pendingTemps.delete(`temp_${e}`)},400))}_setTemperatureRange(e,t,i){if(!this.hass)return;const a=`range_throttle_${e}`,r=this._throttleTimers.get(a);r&&clearTimeout(r),this._throttleTimers.set(a,setTimeout(()=>{this._throttleTimers.delete(a),this._safeCallService("climate","set_temperature",{target_temp_low:t,target_temp_high:i},{entity_id:e})},400))}_setHumidity(e,t){if(!this.hass)return;this._pendingTemps.set(`humidity_${e}`,t),this.requestUpdate();const i=`humidity_throttle_${e}`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("climate","set_humidity",{humidity:t},{entity_id:e}),this._pendingTemps.delete(`humidity_${e}`)},400))}_toggleAuxHeat(e,t){if(!this.hass)return;const i="on"===t.attributes.aux_heat;this._safeCallService("climate","set_aux_heat",{aux_heat:!i},{entity_id:e})}_onRangeDragStart(e,t,i){t.preventDefault(),this._rangeDragCleanup&&(this._rangeDragCleanup(),this._rangeDragCleanup=null);const a=this.hass?.states[i];if(!a)return;const r=a.attributes.min_temp||7,s=a.attributes.max_temp||35,o=a.attributes.target_temp_step||.5,n=a.attributes.target_temp_low??r,c=a.attributes.target_temp_high??s;this._rangeDragEntity=i,this._rangeState={dragging:e,lowTemp:n,highTemp:c};const l=t.target.closest(".range-track");if(!l)return;const d=t=>{const i=l.getBoundingClientRect(),a=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),n=r+a*(s-r),c=Math.round(n/o)*o;if("low"===e){const e=Math.max(r,Math.min(c,this._rangeState.highTemp-o));this._rangeState={...this._rangeState,lowTemp:e}}else{const e=Math.max(this._rangeState.lowTemp+o,Math.min(c,s));this._rangeState={...this._rangeState,highTemp:e}}this.requestUpdate()},h=()=>{this._setTemperatureRange(i,this._rangeState.lowTemp,this._rangeState.highTemp),this._rangeState={dragging:null,lowTemp:0,highTemp:0},this._rangeDragEntity=null,this.requestUpdate(),p()},p=()=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",h),this._rangeDragCleanup===p&&(this._rangeDragCleanup=null)};document.addEventListener("pointermove",d),document.addEventListener("pointerup",h),this._rangeDragCleanup=p}_updateThermalCanvas(){const e=this.shadowRoot?.querySelector("#thermal-canvas"),t=this.shadowRoot?.querySelector("#thermal-canvas-wrap");if(!e||!t)return;this._thermalCanvas||(this._thermalCanvas=new da),this._thermalCanvas.attach(e);const i=this._selectedEntity||this._getClimateIds()[0],a=i?this.hass?.states[i]:void 0,r=a&&a.attributes.hvac_action||"off";this._thermalCanvas.update(r,t.offsetWidth,t.offsetHeight)}_tempUnit(){const e=this.hass,t=e?.config,i=t?.unit_system,a=i?.temperature;return"°F"===a||"F"===a?"°F":"°C"}_avgTemp(){const e=this._getClimates(),t=[];for(const i of e){const e=i.attributes.current_temperature;null!=e&&t.push(e)}return 0===t.length?null:(t.reduce((e,t)=>e+t,0)/t.length).toFixed(1)}_getHvacAction(e){return e.attributes.hvac_action||("off"===e.state?"off":"idle")}_getIcon(e,t){if(Re(t.state))return"mdi:thermostat-off";const i=this.hass?.entities[e]?.icon,a=t.attributes.icon;return i||a||Xi[t.state]||"mdi:thermostat"}render(){if(this._lang,!this._configReady)return B;const e=this._getClimates();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",B;this.style.display=""}return this._isDashboardMode||0!==e.length?"normal"===this._displayMode?this._renderNormalMode(e):this._renderListMode(e):N`
        ${this._showHeader?this._renderHeader(e):B}
        <div class="glass climate-card">
          <div class="card-inner">
            <div class="empty-state">${Ne("climate.no_climates")}</div>
          </div>
        </div>
      `}_renderHeader(e){const t=e.filter(e=>{const t=e.attributes.hvac_action||"";return"heating"===t||"cooling"===t||"preheating"===t}).length,i=e.length,a=0===t?"none":t===i?"all":"some",r=this._avgTemp(),s=this._tempUnit();return N`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${Ne("climate.title")}</span>
          <span class="card-count ${a}">${t}/${i}</span>
        </div>
        <span class="card-header-right">${null!=r?`${Ne("climate.avg_label")} ${r}${s}`:""}</span>
      </div>
    `}_renderListMode(e){let t="";if(this._expanded&&this.hass?.states[this._expanded]){const e=this._getHvacAction(this.hass.states[this._expanded]);"heating"===e||"preheating"===e?t="heat":"cooling"===e&&(t="cool")}else{const i=e.some(e=>{const t=this._getHvacAction(e);return"heating"===t||"preheating"===t}),a=e.some(e=>"cooling"===this._getHvacAction(e));i?t="heat":a&&(t="cool")}return N`
      ${this._showHeader?this._renderHeader(e):B}
      <div class="glass climate-card list-mode">
        <div class="tint ${t}"></div>
        <div class="card-inner">
          ${e.map(e=>N`
            ${this._renderListRow(e.entity_id,e)}
            ${this._renderListFold(e.entity_id,e)}
          `)}
        </div>
      </div>
    `}_renderListRow(e,t){const i=t.attributes,a=i.friendly_name||e.split(".")[1]||e,r=Re(t.state),s="off"===t.state,o=this._getHvacAction(t),n=i.current_temperature,c=this._pendingTemps.get(`temp_${e}`)??i.temperature,l=this._expanded===e,d=t.state,h=i.preset_mode,p=this._getIcon(e,t),u=Ji[o]||"climate.unknown",g=h&&"none"!==h?h:d,_=this._bindGesture({onTap:()=>{r||this._toggle(e,t,new Event("tap"))},onLongPress:()=>{r||(this._expanded=l?null:e)},exclude:".cl-icon-btn"});return N`
      <div class="cl-row ${r?"entity-unavailable":""}" data-action=${o}
        @pointerdown=${_.pointerdown}
        @pointermove=${_.pointermove}
        @pointerup=${_.pointerup}
        @pointercancel=${_.pointercancel}
        @contextmenu=${_.contextmenu}
      >
        <button
          class="cl-icon-btn"
          @click=${i=>this._toggle(e,t,i)}
          aria-label=${Ne(s?"climate.turn_on_aria":"climate.turn_off_aria")}
          ?disabled=${r}
        >
          <ha-icon .icon=${p} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <button class="cl-expand-area" type="button" aria-expanded=${l?"true":"false"} aria-label=${Ne("climate.controls_aria")}>
          <div class="cl-info">
            <div class="cl-name">${De(a,12)}</div>
            <div class="cl-sub">
              <span class="cl-action-text">${Ne(u)}</span>
              ${s?B:N`<span class="cl-mode-badge">${g}</span>`}
            </div>
          </div>
          <div class="cl-temps">
            <div class="cl-temp-current">${r?"--":null!=n?N`${n.toFixed(1)}<span class="unit">°</span>`:"--"}</div>
            ${s||null==c?B:N`<div class="cl-temp-target">→ ${c.toFixed(1)}°</div>`}
          </div>
          ${r?N`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:N`<div class="cl-dot"></div>`}
        </button>
      </div>
    `}_renderListFold(e,t){const i=this._expanded===e;if(Re(t.state))return B;const a="cooling"===this._getHvacAction(t)?"cool":"";return N`
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
    `}_renderListTempControl(e,t){if("off"===t.state||"fan_only"===t.state)return B;const i=t.attributes.supported_features||0;if("heat_cool"===t.state&&i&Vi){return function(e,t,i,a,r){if("heat_cool"!==e.state)return B;if(!((e.attributes.supported_features||0)&Vi))return B;const s=e.attributes.min_temp||7,o=e.attributes.max_temp||35,n=e.attributes.target_temp_step||.5,c="low"===i.dragging?i.lowTemp:e.attributes.target_temp_low??s,l="high"===i.dragging?i.highTemp:e.attributes.target_temp_high??o,d=o-s,h=d>0?(c-s)/d*100:0,p=d>0?(l-s)/d*100:100;return N`
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
          aria-label=${Ne("climate.range_low_aria")}
          aria-valuemin=${s}
          aria-valuemax=${l-n}
          aria-valuenow=${c}
          style="left:${h}%;"
          @pointerdown=${e=>r("low",e)}
          @keydown=${e=>{"ArrowRight"===e.key||"ArrowUp"===e.key?(e.preventDefault(),a(Math.min(c+n,l-n),l)):"ArrowLeft"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),a(Math.max(c-n,s),l))}}
        ></button>
        <button
          class="range-thumb high"
          role="slider"
          aria-label=${Ne("climate.range_high_aria")}
          aria-valuemin=${c+n}
          aria-valuemax=${o}
          aria-valuenow=${l}
          style="left:${p}%;"
          @pointerdown=${e=>r("high",e)}
          @keydown=${e=>{"ArrowRight"===e.key||"ArrowUp"===e.key?(e.preventDefault(),a(c,Math.min(l+n,o))):"ArrowLeft"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),a(c,Math.max(l-n,c+n)))}}
        ></button>
      </div>
    </div>
  `}(t,this._tempUnit(),this._rangeDragEntity===e?this._rangeState:{dragging:null,lowTemp:0,highTemp:0},(t,i)=>this._setTemperatureRange(e,t,i),(t,i)=>this._onRangeDragStart(t,i,e))}if(!(i&qi))return B;const a=this._pendingTemps.get(`temp_${e}`)??t.attributes.temperature,r=t.attributes.target_temp_step||.5,s=t.attributes.min_temp||7,o=t.attributes.max_temp||35,n=t.attributes.current_temperature,c=this._getHvacAction(t),l="heating"===c||"preheating"===c?"heat":"cooling"===c?"cool":"off",d=this._tempUnit();return null==a?B:N`
      <div class="temp-control">
        <button class="temp-stepper-btn"
          @click=${()=>this._setTemperature(e,Math.max(s,a-r))}
          aria-label=${Ne("climate.temp_down_aria")}
          ?disabled=${a<=s}>
          <ha-icon .icon=${"mdi:minus"} style="--mdc-icon-size:22px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <div class="temp-display">
          <div class="temp-display-label">${Ne("climate.target")}</div>
          <div class="temp-display-value ${l}">${a.toFixed(1)}<span class="unit">${d}</span></div>
          ${null!=n?N`
            <div class="temp-display-current">
              <ha-icon .icon=${"mdi:thermometer"} style="--mdc-icon-size:13px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              <span>${Ne("climate.current_label")} ${n.toFixed(1)}${d}</span>
            </div>
          `:B}
        </div>
        <button class="temp-stepper-btn"
          @click=${()=>this._setTemperature(e,Math.min(o,a+r))}
          aria-label=${Ne("climate.temp_up_aria")}
          ?disabled=${a>=o}>
          <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:22px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    `}_renderFoldControls(e,t){const i=this._getHvacAction(t),a="heating"===i||"preheating"===i?"heat":"cooling"===i?"cool":"neutral",r=function(e,t){const i=e.attributes.hvac_modes||[],a=e.state;return N`
    <div class="chip-row">
      ${i.map(e=>{const i=e===a,r=Qi[e]||"var(--t4)",s=Xi[e]||"mdi:thermostat",o=ea[e]?Ne(ea[e]):e;return N`
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
  `}(t,t=>this._setHvacMode(e,t)),s=function(e,t){if("off"===e.state)return B;if(!((e.attributes.supported_features||0)&Wi))return B;const i=e.attributes.preset_modes||[],a=e.attributes.preset_mode;return N`
    <div class="chip-row">
      ${i.map(e=>{const i=e===a,r=Zi[e]||"mdi:tune",s=ta[e]?Ne(ta[e]):e;return N`
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
  `}(t,t=>this._setPreset(e,t)),o=function(e,t){if("off"===e.state)return B;if(!((e.attributes.supported_features||0)&Ui))return B;const i=e.attributes.fan_modes||[],a=e.attributes.fan_mode;return N`
    <div class="chip-row">
      ${i.map(e=>N`
        <button
          class="chip ${e===a?"active":""}"
          @click=${()=>t(e)}
          aria-label="${Ne("climate.fan_mode")}: ${e}"
          aria-pressed=${e===a?"true":"false"}
        >
          <ha-icon .icon=${"mdi:fan"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          <span>${e}</span>
        </button>
      `)}
    </div>
  `}(t,t=>this._setFanMode(e,t)),n=function(e,t){if("off"===e.state)return B;if(!((e.attributes.supported_features||0)&Bi))return B;const i=e.attributes.swing_modes||[],a=e.attributes.swing_mode;return N`
    <div class="chip-row">
      ${i.map(e=>N`
        <button
          class="chip ${e===a?"active":""}"
          @click=${()=>t(e)}
          aria-label="${Ne("climate.swing_mode")}: ${e}"
          aria-pressed=${e===a?"true":"false"}
        >
          <ha-icon .icon=${"mdi:arrow-oscillating"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          <span>${e}</span>
        </button>
      `)}
    </div>
  `}(t,t=>this._setSwingMode(e,t));return N`
      <div class="ctrl-label ${a}">${Ne("climate.section_mode")}</div>
      ${r}
      ${s!==B?N`
        <div class="ctrl-sep"></div>
        <div class="ctrl-label ${a}">${Ne("climate.section_preset")}</div>
        ${s}
      `:B}
      ${o!==B?N`<div class="ctrl-sep"></div>${o}`:B}
      ${n!==B?N`<div class="ctrl-sep"></div>${n}`:B}
      ${function(e,t,i){if(!((e.attributes.supported_features||0)&Ni))return B;if("off"===e.state)return B;const a=i??e.attributes.humidity,r=e.attributes.min_humidity||30,s=e.attributes.max_humidity||99;return null==a?B:N`
    <div class="stepper-row">
      <span class="stepper-label">
        <ha-icon .icon=${"mdi:water-percent"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;margin-right:4px;"></ha-icon>
        ${Ne("climate.humidity_target")}
      </span>
      <div class="stepper">
        <button
          class="btn-icon xs"
          @click=${()=>t(Math.max(r,a-1))}
          aria-label=${Ne("climate.humidity_down_aria")}
          ?disabled=${a<=r}
        >
          <ha-icon .icon=${"mdi:minus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <span class="stepper-value">${a}%</span>
        <button
          class="btn-icon xs"
          @click=${()=>t(Math.min(s,a+1))}
          aria-label=${Ne("climate.humidity_up_aria")}
          ?disabled=${a>=s}
        >
          <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    </div>
  `}(t,t=>this._setHumidity(e,t),this._pendingTemps.get(`humidity_${e}`))}
      ${function(e,t){if(!((e.attributes.supported_features||0)&Ki))return B;const i="on"===e.attributes.aux_heat;return N`
    <div class="aux-row">
      <ha-icon .icon=${"mdi:radiator"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;margin-right:6px;"></ha-icon>
      <span class="aux-label">${Ne("climate.aux_heat")}</span>
      <button
        class="toggle ${i?"on":""}"
        role="switch"
        aria-checked=${i?"true":"false"}
        aria-label=${Ne("climate.aux_heat")}
        @click=${t}
      >
        <span class="toggle-knob"></span>
      </button>
    </div>
  `}(t,()=>this._toggleAuxHeat(e,t))}
    `}_renderNormalMode(e){const t=[...e].sort((e,t)=>{const i=this._getHvacAction(e),a=this._getHvacAction(t);return(ua[i]??3)-(ua[a]??3)}),i=this._selectedEntity||t[0]?.entity_id,a=t.find(e=>e.entity_id===i)||t[0];if(!a)return N``;const r=this._getHvacAction(a),s="heating"===r||"preheating"===r?"heat":"cooling"===r?"cool":"auto"===a.state||"heat_cool"===a.state?"auto-tint":"",o="heating"===r||"preheating"===r?"heat-sep":"cooling"===r?"cool-sep":"",n=this._bindGesture({onTap:()=>{this._toggle(a.entity_id,a,new Event("tap"))},onLongPress:()=>{this._foldOpen=!this._foldOpen;const e=this.renderRoot.querySelector(".climate-card");e&&(e.classList.add("lp-pulse"),e.addEventListener("animationend",()=>e.classList.remove("lp-pulse"),{once:!0}))},onSwipe:e=>{if(t.length<=1)return;const a=t.findIndex(e=>e.entity_id===i),r="left"===e?(a+1)%t.length:(a-1+t.length)%t.length;this._selectedEntity=t[r].entity_id},exclude:"button, .entity-tab, .temp-stepper-btn, .chip"});return N`
      ${this._showHeader?this._renderHeader(e):B}
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
            ${la(a)}
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
    `}_renderEntityTabs(e){if(e.length<=1)return B;const t=this._selectedEntity||e[0]?.entity_id;return N`
      <div class="entity-tabs">
        ${e.map(e=>{const i=e.attributes.friendly_name||e.entity_id,a=this._getHvacAction(e),r=e.entity_id===t,s="heating"===a||"preheating"===a?"heat":"cooling"===a?"cool":"",o=this.hass?.entities[e.entity_id],n=o?Ze(o,this.hass?.devices):null,c=n?this.hass?.areas[n]:null,l=c?.icon||"mdi:home",d=c?.name||i.split(" ")[0];return N`
            <button class="entity-tab ${r?"active":""} ${s}"
              @click=${()=>{this._selectedEntity=e.entity_id}}
              aria-label=${i}
              aria-pressed=${r?"true":"false"}>
              <ha-icon .icon=${l} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${r?N`<span class="tab-label">${d}</span>`:B}
            </button>
          `})}
      </div>
    `}_renderNormalTempStepper(e){if("off"===e.state||"fan_only"===e.state)return B;const t=e.attributes.supported_features||0;if(!(t&qi))return B;if("heat_cool"===e.state&&t&Vi)return B;const i=e.entity_id,a=this._pendingTemps.get(`temp_${i}`)??e.attributes.temperature,r=e.attributes.target_temp_step||.5,s=e.attributes.min_temp||7,o=e.attributes.max_temp||35,n=this._getHvacAction(e),c="heating"===n||"preheating"===n?"heat":"cooling"===n?"cool":"auto"===e.state||"heat_cool"===e.state?"auto-val":"off";return null==a?B:N`
      <div class="temp-control-panel">
        <button class="temp-stepper-btn normal-stepper"
          @click=${()=>this._setTemperature(i,Math.max(s,a-r))}
          aria-label=${Ne("climate.temp_down_aria")}
          ?disabled=${a<=s}>
          <ha-icon .icon=${"mdi:minus"} style="--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <div class="target-display">
          <div class="target-label">${Ne("climate.target")}</div>
          <div class="target-value ${c}">${a.toFixed(1)}<span class="unit">${this._tempUnit()}</span></div>
        </div>
        <button class="temp-stepper-btn normal-stepper"
          @click=${()=>this._setTemperature(i,Math.min(o,a+r))}
          aria-label=${Ne("climate.temp_up_aria")}
          ?disabled=${a>=o}>
          <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
      </div>
    `}static{this.styles=[$e,Se,Ce,Te,Ie,ze,Oe,s`
    :host {
      width: 100%;
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
  `]}}pa([pe({attribute:!1})],ga.prototype,"areaId"),pa([pe({attribute:!1})],ga.prototype,"visibleAreaIds"),pa([ue()],ga.prototype,"_showHeader"),pa([ue()],ga.prototype,"_displayMode"),pa([ue()],ga.prototype,"_configReady"),pa([ue()],ga.prototype,"_expanded"),pa([ue()],ga.prototype,"_selectedEntity"),pa([ue()],ga.prototype,"_foldOpen");try{customElements.define("glass-climate-card",ga)}catch{}Ye("glass-cover-card-editor");var _a=Object.defineProperty,ma=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&_a(t,i,s),s};const fa=1,va=2,ba=4,ya=8,wa=128,xa={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains-closed"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"],awning:["mdi:awning-outline","mdi:awning-outline"],shade:["mdi:roller-shade-open","mdi:roller-shade"],window:["mdi:window-open","mdi:window-closed"],damper:["mdi:valve-open","mdi:valve"]},ka={vertical:{open:"mdi:arrow-up",close:"mdi:arrow-down",stop:"mdi:stop"},garage:{open:"mdi:garage-open",close:"mdi:garage",stop:"mdi:stop"},gate:{open:"mdi:gate-open",close:"mdi:gate",stop:"mdi:stop"},door:{open:"mdi:door-open",close:"mdi:door-closed",stop:null},damper:{open:"mdi:valve-open",close:"mdi:valve",stop:null},window:{open:"mdi:window-open",close:"mdi:window-closed",stop:null}};function $a(e,t){return(xa[e]||xa.shutter)[t?0:1]}class Sa extends Qe{constructor(){super(...arguments),this._expanded=null,this._coverConfig={show_header:!0,dashboard_entities:[],dashboard_compact:!0,entity_presets:{}},this._roomConfig=null,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1,this._throttleTimers=new Map,this._lastDirection=new Map,this._coversCache=null,this._coversCacheKey=""}static getConfigElement(){return document.createElement("glass-cover-card-editor")}getCardSize(){return 3}static{this.styles=[$e,Se,Ce,Te,Ie,ze,Oe,s`
    :host {
      width: 100%;
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
  `]}connectedCallback(){super.connectedCallback(),this._listen("cover-config-changed",()=>{this._coversCacheKey="",this._loadConfig()}),this._listen("room-config-changed",e=>{this.areaId&&e.areaId===this.areaId&&(this._roomConfig=null,this._coversCacheKey="",this._loadRoomConfig(this.areaId))})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_collapseExpanded(){null!==this._expanded&&(this._expanded=null)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomConfig=null,this._roomLoading=!1),this._configLoaded||this._configLoading||(this._backend=new at(this.hass),this._loadConfig())),e.has("areaId")&&this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._roomConfig=null,this._expanded=null,this.areaId&&this._loadRoomConfig(this.areaId))}getTrackedEntityIds(){return this._getCovers().map(e=>e.entityId)}async _loadConfig(){if(this._backend&&!this._configLoading){this._configLoading=!0;try{const e=await this._backend.send("get_config");e?.cover_card&&(this._coverConfig=e.cover_card),this._configLoaded=!0,this._configLoading=!1,this.areaId&&this._loadRoomConfig(this.areaId),this.requestUpdate()}catch{this._configLoading=!1}}}async _loadRoomConfig(e){if(this._backend&&!this._roomLoading){this._roomLoading=!0;try{const t=await this._backend.send("get_room",{area_id:e});this.areaId===e&&(this._roomConfig=t?{...t,entity_layouts:t.entity_layouts??{}}:null,this.requestUpdate())}catch{}finally{this._roomLoading=!1}}}_getCovers(){if(!this.hass)return[];let e;if(this.areaId){if(e=et(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id),this._roomConfig){const t=new Set(this._roomConfig.hidden_entities);e=e.filter(e=>!t.has(e));const i=this._roomConfig.entity_order;e.sort((e,t)=>{const a=i.indexOf(e),r=i.indexOf(t);return-1!==a&&-1!==r?a-r:-1!==a?-1:-1!==r?1:0})}}else e=this._coverConfig.dashboard_entities;const t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.attributes.current_position}:${t.attributes.current_tilt_position}`:e}).join("|");return t===this._coversCacheKey&&this._coversCache||(this._coversCache=e.map(e=>{const t=this.hass?.states[e];return t?function(e,t){const i=t.attributes,a=i.device_class||"shutter",r=i.supported_features||0,s=i.current_position,o=i.current_tilt_position,n="open"===t.state||"opening"===t.state;return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,isOpen:n,position:s??null,tiltPosition:o??null,deviceClass:a,features:r}}(e,t):null}).filter(e=>null!==e),this._coversCacheKey=t),this._coversCache}_toggleCover(e,t){if(t?.stopPropagation(),!this.hass)return;const i=e.entity.state;if("opening"===i||"closing"===i)this._lastDirection.set(e.entityId,i),this._safeCallService("cover","stop_cover",{},{entity_id:e.entityId});else if("closed"===i)this._lastDirection.delete(e.entityId),this._safeCallService("cover","open_cover",{},{entity_id:e.entityId});else{const t=this._lastDirection.get(e.entityId);this._lastDirection.delete(e.entityId),"opening"===t?this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}):"closing"===t?this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}):this._safeCallService("cover","close_cover",{},{entity_id:e.entityId})}}_openCover(e,t){t.stopPropagation(),this.hass&&(Je(this,"light"),this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}))}_closeCover(e,t){t.stopPropagation(),this.hass&&(Je(this,"light"),this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}))}_stopCover(e,t){t.stopPropagation(),this.hass&&(Je(this,"light"),this._safeCallService("cover","stop_cover",{},{entity_id:e.entityId}))}_setPosition(e,t){if(!this.hass)return;const i=this._throttleTimers.get(e.entityId);i&&clearTimeout(i),this._throttleTimers.set(e.entityId,window.setTimeout(()=>{this._throttleTimers.delete(e.entityId),this._safeCallService("cover","set_cover_position",{position:t},{entity_id:e.entityId})},50))}_setTiltPosition(e,t){if(!this.hass)return;const i=`${e.entityId}_tilt`,a=this._throttleTimers.get(i);a&&clearTimeout(a),this._throttleTimers.set(i,window.setTimeout(()=>{this._throttleTimers.delete(i),this._safeCallService("cover","set_cover_tilt_position",{tilt_position:t},{entity_id:e.entityId})},50))}_openAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&fa&&this._safeCallService("cover","open_cover",{},{entity_id:t.entityId})}_closeAll(){if(!this.hass)return;const e=this._getCovers();for(const t of e)t.features&va&&this._safeCallService("cover","close_cover",{},{entity_id:t.entityId})}_setPreset(e,t,i){i.stopPropagation(),this.hass&&(Je(this,"light"),e.features&ba?this._safeCallService("cover","set_cover_position",{position:t},{entity_id:e.entityId}):t>0?this._safeCallService("cover","open_cover",{},{entity_id:e.entityId}):this._safeCallService("cover","close_cover",{},{entity_id:e.entityId}))}_toggleExpand(e){this._expanded=this._expanded===e?null:e}render(){this._lang;const e=this._getCovers();if(0===e.length&&!this.areaId)return this.style.display="none",B;this.style.display="";const t=this._coverConfig.show_header,i=e.filter(e=>e.isOpen).length,a=e.length;return N`
      ${t?N`
        <div class="cover-header">
          <div class="cover-header-left">
            <span class="cover-title">${Ne("cover.title")}</span>
            <span class="cover-count ${0===i?"none":i===a?"all":"some"}">${i}/${a}</span>
          </div>
          <div class="cover-header-actions">
            <button class="header-btn" @click=${()=>this._openAll()} aria-label=${Ne("cover.open_all_aria")}>
              <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
            </button>
            <button class="header-btn" @click=${()=>this._closeAll()} aria-label=${Ne("cover.close_all_aria")}>
              <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
            </button>
          </div>
        </div>
      `:B}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${a>0?(i/a*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${0===e.length?N`
            <div style="padding:16px;text-align:center;font-size:var(--fz-base);color:var(--t4);grid-column:1/-1;">${Ne("config.cover_no_covers")}</div>
          `:B}
          ${this.areaId?this._renderGrid(e):this._renderDashboardGrid(e)}
        </div>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(r,!0,!0)),t.push(this._renderControlFold(a,s)),t.push(this._renderControlFold(r,s)),i+=2}else{const r=i+1>=e.length;t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,r)),i++}}else{const r=i+1>=e.length;t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,r)),i++}}return t}_renderDashboardGrid(e){if(!(!1!==this._coverConfig.dashboard_compact))return e.map((t,i)=>{const a=i+1>=e.length;return[this._renderCoverRow(t,!1,!1),this._renderControlFold(t,a)]}).flat();const t=[];let i=0;for(;i<e.length;){const a=e[i],r=i+1<e.length?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(this._renderCoverRow(a,!0,!1)),t.push(this._renderCoverRow(r,!0,!0)),t.push(this._renderControlFold(a,s)),t.push(this._renderControlFold(r,s)),i+=2}else t.push(this._renderCoverRow(a,!1,!1)),t.push(this._renderControlFold(a,!0)),i++}return t}_renderCoverRow(e,t=!1,i=!1){const a=this._expanded===e.entityId,r=Re(e.entity.state),s=["cv-row",e.isOpen?"open":"",t?"compact":"",i?"compact-right":"",r?"entity-unavailable":""].filter(Boolean).join(" "),o=this._bindGesture({onTap:()=>this._toggleCover(e),onLongPress:()=>this._toggleExpand(e.entityId),exclude:".cv-icon-btn"});return N`
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
          aria-label=${Ne("cover.toggle_aria",{name:e.name})}
        >
          <ha-icon .icon=${$a(e.deviceClass,e.isOpen)}></ha-icon>
        </button>
        <button
          class="cv-expand-btn"
          aria-expanded=${a?"true":"false"}
          aria-label=${Ne("cover.expand_aria",{name:e.name})}
        >
          <div class="cv-info">
            <div class="cv-name">${De(e.name,t?12:Ee)}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${function(e){switch(e){case"open":return Ne("cover.open");case"closed":return Ne("cover.closed");case"opening":return Ne("cover.opening");case"closing":return Ne("cover.closing");default:return e}}(e.entity.state)}</span>
            </div>
          </div>
          ${null!==e.position?N`
            <div class="cv-position">${e.position}<span class="unit">%</span></div>
          `:B}
          ${r?N`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:N`<div class="cv-dot"></div>`}
        </button>
      </div>
    `}_renderControlFold(e,t=!1){const i=this._expanded===e.entityId;return N`
      <div class="fold-sep ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):B}
        </div>
      </div>
      ${t?B:N`<div class="fold-sep ${i?"visible":""}"></div>`}
    `}_renderControls(e){const t=e.features,i=(a=e.deviceClass,["shutter","blind","shade","curtain","awning"].includes(a)?ka.vertical:ka[a]||ka.vertical);var a;const r=!!(t&ba),s=!!(t&wa),o=[];if(r){const t=this._coverConfig.entity_presets[e.entityId],i=t&&t.length>0?t:[0,25,50,75,100];for(const a of i){const t=a>=50,i=0===a?Ne("cover.preset_closed"):100===a?Ne("cover.preset_open"):`${a}%`;o.push({label:i,icon:$a(e.deviceClass,t),position:a})}}else o.push({label:Ne("cover.preset_closed"),icon:$a(e.deviceClass,!1),position:0},{label:Ne("cover.preset_open"),icon:$a(e.deviceClass,!0),position:100});return N`
      <div class="ctrl-panel">
        <span class="ctrl-label">${e.name}</span>

        <!-- Transport -->
        <div class="transport-row">
          ${t&fa?N`
            <button class="transport-btn ${100===e.position||null===e.position&&e.isOpen?"accent":""}"
              @click=${t=>this._openCover(e,t)}
              aria-label=${Ne("cover.open_aria",{name:e.name})}>
              <ha-icon .icon=${i.open}></ha-icon>
            </button>
          `:B}
          ${t&ya?N`
            <button class="transport-btn"
              @click=${t=>this._stopCover(e,t)}
              aria-label=${Ne("cover.stop_aria",{name:e.name})}>
              <ha-icon .icon=${i.stop||"mdi:stop"}></ha-icon>
            </button>
          `:B}
          ${t&va?N`
            <button class="transport-btn ${0===e.position||null===e.position&&!e.isOpen?"accent":""}"
              @click=${t=>this._closeCover(e,t)}
              aria-label=${Ne("cover.close_aria",{name:e.name})}>
              <ha-icon .icon=${i.close}></ha-icon>
            </button>
          `:B}
        </div>

        <!-- Position slider -->
        ${r?N`
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${$a(e.deviceClass,!1)}></ha-icon></div>
            <glass-slider
              .value=${e.position??0}
              color="var(--rgb-purple)"
              .label=${`${e.position??0}%`}
              @glass-slider-input=${t=>this._setPosition(e,t.detail.value)}
              @glass-slider-change=${t=>this._setPosition(e,t.detail.value)}
            ></glass-slider>
            <div class="slider-icon"><ha-icon .icon=${$a(e.deviceClass,!0)}></ha-icon></div>
          </div>
        `:B}

        <!-- Tilt slider -->
        ${s?N`
          <span class="ctrl-label">${Ne("cover.tilt")}</span>
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
        `:B}

        <!-- Presets -->
        <div class="ctrl-sep"></div>
        <div class="preset-row">
          ${o.map(t=>N`
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
    `}}ma([pe()],Sa.prototype,"areaId"),ma([ue()],Sa.prototype,"_expanded");try{customElements.define("glass-cover-card",Sa)}catch{}Ye("glass-fan-card-editor");var Ca=Object.defineProperty,Ia=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ca(t,i,s),s};const Ea=1,Da=2,za=4,Pa=8,Ta={auto:"mdi:autorenew",eco:"mdi:leaf",night:"mdi:weather-night",nuit:"mdi:weather-night",comfort:"mdi:sofa",confort:"mdi:sofa",silent:"mdi:volume-off",silence:"mdi:volume-off",turbo:"mdi:lightning-bolt"};function La(e,t){return e<=0?0:Math.max(1,Math.min(t,Math.round(e/(100/t))))}function Aa(e,t){return e<=0?0:e/t*100}function Ma(e,t){return Aa(La(e,t),t)}const Oa={auto:"fan.preset_auto",eco:"fan.preset_eco",night:"fan.preset_night",nuit:"fan.preset_night",comfort:"fan.preset_comfort",confort:"fan.preset_comfort",silent:"fan.preset_silent",silence:"fan.preset_silent",turbo:"fan.preset_turbo"};function Ra(e){const t=Oa[e.toLowerCase()];return t?Ne(t):e.charAt(0).toUpperCase()+e.slice(1)}class ja extends Qe{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._showHeader=!0,this._fanConfigLoaded=!1,this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._fansFingerprint="",this._dashboardHiddenEntities=new Set,this._dashboardHiddenLoaded=!1,this._throttleTimers=new Map,this._schedules=null,this._schedulesLoaded=!1}static getConfigElement(){return document.createElement("glass-fan-card-editor")}getCardSize(){return 3}get _isDashboardMode(){return!this.areaId}static{this.styles=[$e,Se,Ce,Te,Ie,ze,Oe,s`
    :host {
      width: 100%;
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
  `]}connectedCallback(){super.connectedCallback(),this._listen("fan-config-changed",()=>{this._fanConfigLoaded=!1,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadFanConfig()}),this._listen("room-config-changed",e=>{const t=this.areaId;t&&e.areaId===t&&(this._roomConfigLoaded=!1,this._roomConfig=null,this._cachedFanIds=void 0,this._fansFingerprint="",this._loadRoomConfig()),this._isDashboardMode&&(this._dashboardHiddenLoaded=!1,this._loadDashboardHidden())}),this._listen("dashboard-config-changed",()=>{this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._fanConfigLoaded=!1,this._schedulesLoaded=!1,this._roomConfigLoaded=!1,this._dashboardHiddenLoaded=!1;for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_collapseExpanded(){null!==this._expandedEntity&&(this._expandedEntity=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._fanConfigLoaded=!1,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._dashboardHiddenLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._fanConfigLoaded&&this._loadFanConfig(),this.areaId&&this.hass&&(this._lastLoadedAreaId!==this.areaId&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),this.hass&&this._isDashboardMode&&!this._dashboardHiddenLoaded&&this._loadDashboardHidden(),e.has("hass")&&this.hass){const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._cachedFanIds=void 0,this._fansFingerprint="")}if(e.has("visibleAreaIds")&&(this._cachedFanIds=void 0,this._fansFingerprint="",this._dashboardHiddenLoaded=!1),e.has("hass")&&this._dragValues.size>0){const e=this._getFanInfos();let t=!1;const i=new Map(this._dragValues);for(const a of e){const e=`speed:${a.entityId}`,r=i.get(e);void 0!==r&&Math.abs(a.percentage-r)<=2&&(i.delete(e),t=!0);const s=`light:${a.entityId}`,o=i.get(s);if(void 0!==o&&a.lightEntityId){const e=this.hass?.states[a.lightEntityId];if(e){const a=e.attributes.brightness??0,r=Math.round(a/255*100);Math.abs(r-o)<=2&&(i.delete(s),t=!0)}}}t&&(this._dragValues=i)}}getTrackedEntityIds(){return this._isDashboardMode&&this.hass?it("fan",this.hass,this.visibleAreaIds):this._getFanInfos().map(e=>e.entityId)}async _loadFanConfig(){if(this.hass&&!this._fanConfigLoaded){this._fanConfigLoaded=!0;try{this._backend||(this._backend=new at(this.hass));const e=await this._backend.send("get_config");e?.fan_card&&(this._showHeader=e.fan_card.show_header??!0)}catch{}}}async _loadRoomConfig(){if(this.hass&&this.areaId&&!this._roomConfigLoaded&&!this._roomConfigLoading){this._roomConfigLoading=!0,this._lastLoadedAreaId=this.areaId;try{this._backend||(this._backend=new at(this.hass));const e=await this._backend.send("get_room",{area_id:this.areaId});this.areaId===this._lastLoadedAreaId&&(this._roomConfig=e,this._roomConfigLoaded=!0,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate())}catch{}finally{this._roomConfigLoading=!1}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new at(this.hass));const e=await this._backend.send("get_schedules");this._schedules=e,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadDashboardHidden(){if(!this.hass||this._dashboardHiddenLoaded||!this._isDashboardMode)return;this._dashboardHiddenLoaded=!0;const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0!==e.length)try{this._backend||(this._backend=new at(this.hass));const t=new Set;for(const i of e){const e=await this._backend.send("get_room",{area_id:i});if(e?.hidden_entities)for(const i of e.hidden_entities)t.add(i)}this._dashboardHiddenEntities=t,this._cachedFanIds=void 0,this._fansFingerprint="",this.requestUpdate()}catch{}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._roomConfigLoading=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedFanIds=void 0,this._fansFingerprint="";for(const e of this._throttleTimers.values())clearTimeout(e);this._throttleTimers.clear()}_getFanIds(){return this._cachedFanIds||(this._cachedFanIds=this._computeFanIds()),this._cachedFanIds}_computeFanIds(){if(!this.hass)return[];if(this.areaId){const e=new Set(this._roomConfig?.hidden_entities??[]),t=et(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("fan.")&&!e.has(t.entity_id)&&tt(t.entity_id,this._schedules)).map(e=>e.entity_id),i=this._roomConfig?.entity_order??[];if(i.length>0){const e=new Map;i.forEach((t,i)=>e.set(t,i)),t.sort((t,i)=>{const a=e.get(t),r=e.get(i);return void 0!==a&&void 0!==r?a-r:void 0!==a?-1:void 0!==r?1:0})}return t}if(this._isDashboardMode){const e=this.visibleAreaIds?.length?this.visibleAreaIds:Object.keys(this.hass.areas??{});if(0===e.length||!this.hass.entities||!this.hass.devices)return[];const t=[];for(const i of e)for(const e of et(i,this.hass.entities,this.hass.devices))e.entity_id.startsWith("fan.")&&!this._dashboardHiddenEntities.has(e.entity_id)&&t.push(e.entity_id);return t}return[]}_getFanInfos(){if(!this.hass)return[];const e=this._getFanIds(),t=e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.state}:${t.last_updated}`:`${e}:-`}).join("|");if(t===this._fansFingerprint&&this._cachedFansResult)return this._cachedFansResult;this._fansFingerprint=t;const i=e.map(e=>{const t=this.hass?.states[e];return t?this._buildFanInfo(e,t):null}).filter(e=>null!==e);return this._isDashboardMode?this._cachedFansResult=i.filter(e=>e.isOn):this._cachedFansResult=i,this._cachedFansResult}_buildFanInfo(e,t){const i=t.attributes,a="on"===t.state,r=i.percentage??0,s=i.percentage_step,o=i.speed_count??(s&&s>0?Math.round(100/s):3),n=i.direction||null,c=i.oscillating||!1,l=i.preset_mode||null,d=i.preset_modes||[],h=i.supported_features||0,p=function(e,t){if("ceiling"===t.attributes.device_class)return!0;const i=e.toLowerCase();return i.includes("ceiling")||i.includes("plafond")||i.includes("plafonnier")}(e,t),u=this.hass?.entities[e]?.icon,g=i.icon,_=u||g||(p?"mdi:ceiling-fan":"mdi:fan"),m=p&&this.hass?function(e,t){const i=e.replace("fan.",""),a=[`light.${i}`,`light.${i}_light`];for(const r of a)if(t.states[r])return r;if(t.entities){const i=t.entities[e];if(i?.device_id)for(const[e,a]of Object.entries(t.entities))if(e.startsWith("light.")&&a.device_id===i.device_id&&t.states[e])return e}return null}(e,this.hass):null,f=!(!!(h&Pa)&&d.length>0||!!(h&za)||!!(h&Da)||m);return{entity:t,entityId:e,name:i.friendly_name||e.split(".")[1]||e,icon:_,isCeiling:p,isOn:a,percentage:a?r:0,speedCount:o,direction:n,oscillating:c,presetMode:a?l:null,presetModes:d,supportedFeatures:h,lightEntityId:m,isSimple:f}}_toggleFan(e,t){if(t?.stopPropagation(),this.hass)if(Je(this,"light"),e.isOn)this._safeCallService("fan","turn_off",{},{entity_id:e.entityId});else{if(e.supportedFeatures&Ea){const t=Aa(1,e.speedCount);this._safeCallService("fan","turn_on",{percentage:t},{entity_id:e.entityId})}else this._safeCallService("fan","turn_on",{},{entity_id:e.entityId})}}_toggleAll(){if(!this.hass)return;const e=this._getFanInfos(),t=e.some(e=>e.isOn);if(t){const t=e.map(e=>e.entityId);this._safeCallService("fan","turn_off",{},{entity_id:t})}else for(const i of e){if(i.supportedFeatures&Ea){const e=Aa(1,i.speedCount);this._safeCallService("fan","turn_on",{percentage:e},{entity_id:i.entityId})}else this._safeCallService("fan","turn_on",{},{entity_id:i.entityId})}t&&(this._expandedEntity=null)}_setSpeed(e,t){this.hass&&(Je(this,"light"),0!==t?(e.isOn||this._safeCallService("fan","turn_on",{},{entity_id:e.entityId}),this._safeCallService("fan","set_percentage",{percentage:t},{entity_id:e.entityId})):this._safeCallService("fan","turn_off",{},{entity_id:e.entityId}))}_setPresetMode(e,t,i){i.stopPropagation(),this.hass&&(e.presetMode!==t?(e.isOn||this._safeCallService("fan","turn_on",{},{entity_id:e.entityId}),this._safeCallService("fan","set_preset_mode",{preset_mode:t},{entity_id:e.entityId})):e.percentage>0&&this._safeCallService("fan","set_percentage",{percentage:e.percentage},{entity_id:e.entityId}))}_setDirection(e,t,i){i.stopPropagation(),this.hass&&(Je(this,"light"),this._safeCallService("fan","set_direction",{direction:t},{entity_id:e.entityId}))}_toggleOscillation(e,t){t.stopPropagation(),this.hass&&this._safeCallService("fan","oscillate",{oscillating:!e.oscillating},{entity_id:e.entityId})}_toggleCeilingLight(e,t){if(t.stopPropagation(),!this.hass||!e.lightEntityId)return;const i=this.hass.states[e.lightEntityId],a="on"===i?.state?"turn_off":"turn_on";this._safeCallService("light",a,{},{entity_id:e.lightEntityId})}_hasControls(e){const t=e.supportedFeatures;return!!(t&Ea||t&Pa||t&za||t&Da||e.lightEntityId)}_toggleExpand(e){this._expandedEntity===e.entityId?this._expandedEntity=null:this._expandedEntity=e.entityId}_onSpeedSliderInput(e,t){const i=Ma(t,e.speedCount),a=new Map(this._dragValues);a.set(`speed:${e.entityId}`,i),this._dragValues=a}_onSpeedSliderChange(e,t){const i=Ma(t,e.speedCount);this._setSpeed(e,i);const a=new Map(this._dragValues);a.delete(`speed:${e.entityId}`),this._dragValues=a}_onLightSliderInput(e,t){if(!e.lightEntityId||!this.hass)return;const i=new Map(this._dragValues);i.set(`light:${e.entityId}`,t),this._dragValues=i;const a=`light:${e.entityId}`,r=this._throttleTimers.get(a);r&&clearTimeout(r);const s=e.lightEntityId;this._throttleTimers.set(a,setTimeout(()=>{this._throttleTimers.delete(a);const e=this._dragValues.get(a)??t,i=Math.round(e/100*255);this._safeCallService("light","turn_on",{brightness:i},{entity_id:s})},100))}_onLightSliderChange(e,t){if(!e.lightEntityId||!this.hass)return;const i=Math.round(t/100*255);this._safeCallService("light","turn_on",{brightness:i},{entity_id:e.lightEntityId});const a=new Map(this._dragValues);a.delete(`light:${e.entityId}`),this._dragValues=a}render(){this._lang;const e=this._getFanInfos();if(this._isDashboardMode){if(0===e.length)return this.style.display="none",B;this.style.display=""}if(!this._isDashboardMode&&0===e.length)return N`
        ${this._showHeader?this._renderHeader(0,0):B}
        <div class="glass fan-card">
          <div class="card-inner">
            <div class="empty-state">${Ne("fan.no_fans")}</div>
          </div>
        </div>
      `;const t=e.filter(e=>e.isOn).length,i=e.length;return N`
      ${this._showHeader?this._renderHeader(t,i):B}
      <div class="glass fan-card">
        <div class="tint" style="background:radial-gradient(ellipse at 30% 30%, var(--c-accent), transparent 70%);opacity:${i>0?(t/i*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${this._isDashboardMode?this._renderDashboardGrid(e):this._renderGrid(e)}
        </div>
      </div>
    `}_renderHeader(e,t){const i=e>0,a=0===e?"none":e===t?"all":"some";return N`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${Ne("fan.title")}</span>
          <span class="card-count ${a}">${e}/${t}</span>
        </div>
        <button
          class="toggle-all ${i?"on":""}"
          @click=${()=>this._toggleAll()}
          aria-label=${Ne(i?"fan.toggle_all_on_aria":"fan.toggle_all_off_aria")}
          role="switch"
          aria-checked=${i?"true":"false"}
        ></button>
      </div>
    `}_getEntityLayout(e){return"full"===(this._roomConfig?.entity_layouts??{})[e]?"full":"compact"}_isCompact(e){return"compact"===this._getEntityLayout(e.entityId)}_renderGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if(this._isCompact(a)){const r=i+1<e.length&&this._isCompact(e[i+1])?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(r,!0,!0)),t.push(this._renderControlFold(a,s)),t.push(this._renderControlFold(r,s)),i+=2}else{const r=i+1>=e.length;t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,r)),i++}}else{const r=i+1>=e.length;t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,r)),i++}}return t}_renderDashboardGrid(e){const t=[];let i=0;for(;i<e.length;){const a=e[i],r=i+1<e.length?e[i+1]:null;if(r){const s=i+2>=e.length;t.push(this._renderFanRow(a,!0,!1)),t.push(this._renderFanRow(r,!0,!0)),t.push(this._renderControlFold(a,s)),t.push(this._renderControlFold(r,s)),i+=2}else t.push(this._renderFanRow(a,!1,!1)),t.push(this._renderControlFold(a,!0)),i++}return t}_renderFanRow(e,t=!1,i=!1){const a=this._dragValues.get(`speed:${e.entityId}`),r=a??e.percentage,s=this._expandedEntity===e.entityId,o=this._hasControls(e);let n;n=o?e.isOn||void 0!==a?`${r}%`:Ne("fan.off"):e.isOn?Ne("common.on"):Ne("fan.off");const c=Re(e.entity.state),l=["fan-row",e.isOn?"on":"",t?"compact":"",i?"compact-right":"",c?"entity-unavailable":""].filter(Boolean).join(" "),d=this._bindGesture({onTap:()=>this._toggleFan(e),onLongPress:()=>this._toggleExpand(e),exclude:".fan-icon-btn"});return N`
      <div
        class=${l}
        @pointerdown=${d.pointerdown}
        @pointerup=${d.pointerup}
        @pointermove=${d.pointermove}
        @pointercancel=${d.pointercancel}
        @contextmenu=${d.contextmenu}
      >
        <button
          class="fan-icon-btn"
          @click=${t=>this._toggleFan(e,t)}
          aria-label=${Ne("fan.toggle_aria",{name:e.name})}
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
          aria-label=${Ne(o?"fan.expand_aria":"fan.toggle_aria",{name:e.name})}
        >
          <div class="fan-info">
            <div class="fan-name">${De(e.name,t?12:Ee)}</div>
            <div class="fan-sub">
              <span class="fan-speed-text">${n}</span>
              ${e.isOn&&null!==e.direction?N`
                <span class="fan-direction">
                  <ha-icon .icon=${"forward"===e.direction?"mdi:rotate-right":"mdi:rotate-left"}></ha-icon>
                  ${"forward"===e.direction?Ne("fan.direction_forward"):Ne("fan.direction_reverse")}
                </span>
              `:B}
            </div>
          </div>
          ${c?N`<span class="unavailable-badge"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></span>`:N`<div class="fan-dot"></div>`}
        </button>
      </div>
    `;var h}_renderControlFold(e,t=!1){const i=this._expandedEntity===e.entityId;return N`
      <div class="fold-sep ${i?"visible":""}"></div>
      <div class="ctrl-fold ${i?"open":""}">
        <div class="ctrl-fold-inner">
          ${i?this._renderControls(e):B}
        </div>
      </div>
      ${t?B:N`<div class="fold-sep ${i?"visible":""}"></div>`}
    `}_renderControls(e){const t=e.supportedFeatures,i=!!(t&Ea),a=!!(t&Pa)&&e.presetModes.length>0,r=!!(t&za),s=!!(t&Da),o=this._dragValues.get(`speed:${e.entityId}`),n=o??e.percentage,c=e.isOn||void 0!==o?La(n,e.speedCount):0;return N`
      <div class="ctrl-panel">
        ${e.isSimple?B:N`<span class="ctrl-label">${e.name}</span>`}

        ${i?N`
          <!-- Speed steps -->
          <div class="speed-steps">
            ${Array.from({length:e.speedCount},(t,i)=>{const a=i+1,r=Aa(a,e.speedCount),s=function(e,t){return Math.round(Aa(e,t))}(a,e.speedCount);return N`
                <button
                  class="speed-step ${c===a?"active":""}"
                  @click=${t=>{t.stopPropagation(),this._setSpeed(e,r)}}
                  aria-label=${Ne("fan.speed_step_aria",{step:String(a),pct:String(s)})}
                >
                  <span>${a}</span>
                  <span class="speed-step-pct">${s}%</span>
                </button>
              `})}
          </div>

          ${e.isSimple?B:N`
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
        `:B}

        ${a?N`
          <!-- Preset modes -->
          <div class="mode-row">
            ${e.presetModes.map(t=>N`
              <button
                class="chip ${e.presetMode===t?"active":""}"
                @click=${i=>this._setPresetMode(e,t,i)}
                aria-label=${Ra(t)}
              >
                <ha-icon .icon=${Ta[t.toLowerCase()]||"mdi:cog"}></ha-icon>
                <span>${Ra(t)}</span>
              </button>
            `)}
          </div>
        `:B}

        ${r?N`
          <div class="ctrl-sep"></div>
          <!-- Direction -->
          <div class="direction-row">
            <div class="direction-label">
              <ha-icon .icon=${"mdi:rotate-3d-variant"}></ha-icon>
              ${Ne("fan.direction")}
            </div>
            <div class="direction-btns">
              <button
                class="dir-btn ${"forward"===e.direction?"active":""}"
                @click=${t=>this._setDirection(e,"forward",t)}
                aria-label=${Ne("fan.direction_forward_aria")}
              >
                <ha-icon .icon=${"mdi:rotate-right"}></ha-icon>
              </button>
              <button
                class="dir-btn ${"reverse"===e.direction?"active":""}"
                @click=${t=>this._setDirection(e,"reverse",t)}
                aria-label=${Ne("fan.direction_reverse_aria")}
              >
                <ha-icon .icon=${"mdi:rotate-left"}></ha-icon>
              </button>
            </div>
          </div>
        `:B}

        ${s?N`
          <!-- Oscillation -->
          <div class="osc-row">
            <div class="osc-label">
              <ha-icon .icon=${"mdi:arrow-left-right"}></ha-icon>
              ${Ne("fan.oscillation")}
            </div>
            <button
              class="toggle-sm ${e.oscillating?"on":""}"
              @click=${t=>this._toggleOscillation(e,t)}
              role="switch"
              aria-checked=${e.oscillating?"true":"false"}
              aria-label=${Ne("fan.oscillation_aria")}
            ></button>
          </div>
        `:B}

        ${e.lightEntityId?this._renderCeilingLight(e):B}
      </div>
    `}_renderCeilingLight(e){if(!e.lightEntityId||!this.hass)return B;const t=this.hass.states[e.lightEntityId];if(!t)return B;const i="on"===t.state,a=t.attributes.brightness??0,r=this._dragValues.get(`light:${e.entityId}`)??(i?Math.round(a/255*100):0);return N`
      <div class="ctrl-sep"></div>
      <!-- Ceiling light -->
      <div class="ceiling-light-row">
        <div class="ceiling-light-label">
          <ha-icon .icon=${"mdi:lightbulb-outline"}></ha-icon>
          ${Ne("fan.ceiling_light")}
        </div>
        <button
          class="toggle-sm ${i?"on":""}"
          @click=${t=>this._toggleCeilingLight(e,t)}
          role="switch"
          aria-checked=${i?"true":"false"}
          aria-label=${Ne("fan.ceiling_light_aria")}
        ></button>
      </div>
      ${i?N`
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
      `:B}
    `}}Ia([pe({attribute:!1})],ja.prototype,"areaId"),Ia([pe({attribute:!1})],ja.prototype,"visibleAreaIds"),Ia([ue()],ja.prototype,"_expandedEntity"),Ia([ue()],ja.prototype,"_dragValues"),Ia([ue()],ja.prototype,"_showHeader");try{customElements.define("glass-fan-card",ja)}catch{}Ye("glass-media-card-editor");var Ha=Object.defineProperty,Fa=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ha(t,i,s),s};const qa=524288;function Va(e){const t=e.attributes;let i=0;return t.media_position_updated_at&&(i=new Date(t.media_position_updated_at).getTime()/1e3),{entityId:e.entity_id,name:t.friendly_name||e.entity_id,state:e.state,title:t.media_title||"",artist:t.media_artist||"",albumArt:t.entity_picture||"",appName:t.app_name||"",volume:"number"==typeof t.volume_level?t.volume_level:0,isMuted:!!t.is_volume_muted,features:t.supported_features||0,groupMembers:Array.isArray(t.group_members)?t.group_members:[],shuffle:!!t.shuffle,repeat:t.repeat||"off",source:t.source||"",sourceList:Array.isArray(t.source_list)?t.source_list:[],soundMode:t.sound_mode||"",soundModeList:Array.isArray(t.sound_mode_list)?t.sound_mode_list:[],duration:"number"==typeof t.media_duration?t.media_duration:0,elapsed:"number"==typeof t.media_position?t.media_position:0,positionUpdatedAt:i,lastUpdated:e.last_updated?new Date(e.last_updated).getTime():0,icon:t.icon||"mdi:speaker"}}function Na(e){return"playing"===e||"buffering"===e}function Ua(e){return"playing"===e||"paused"===e||"buffering"===e}function Wa(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}function Ba(e,t){return 0!==(e.features&t)}const Ka={Spotify:"mdi:spotify",AirPlay:"mdi:apple",Bluetooth:"mdi:bluetooth","Line-In":"mdi:audio-input-stereo-minijack",TV:"mdi:television",HDMI:"mdi:hdmi-port"};class Ya extends Qe{constructor(){super(...arguments),this._foldOpen=!1,this._mediaConfig={extra_entities:{},show_header:!0},this._configLoaded=!1,this._roomIndex=0,this._roomEntityId="",this._prevPlayingSet="",this._swipeClass="",this._foldTab="controls",this._queueData=[],this._radioTracks=[],this._loadVersion=0,this._queueVersion=0,this._lastArtworkUrl="",this._configLoadingInProgress=!1,this._playersCache=null,this._playersCacheKey="",this._volumeThrottles=new Map,this._progressTimer=0,this._swipeAnimating=!1,this._swipeAnimTimer=0,this._queueRefreshTimer=0,this._prevMediaTitle="",this._lastMaster=null,this._lastMasterStaleTimer=0}static getConfigElement(){return document.createElement("glass-media-card-editor")}getCardSize(){return 4}setConfig(e){this._config=e}shouldUpdate(e){return!!super.shouldUpdate(e)&&(!this._swipeAnimating||1!==e.size||!e.has("hass"))}connectedCallback(){super.connectedCallback(),this._listen("media-config-changed",()=>{this._playersCache=null,this._loadConfig()}),this._listen("room-config-changed",()=>{this._playersCache=null}),this._listen("radio-queue-started",()=>{this._radioTracks=[]}),this._listen("radio-queue-track-added",e=>{this._radioTracks=[...this._radioTracks,e.track]}),this._listen("radio-queue-complete",()=>{this._foldOpen&&this._loadQueue()}),this._listen("radio-queue-error",e=>{console.warn("Radio queue error:",e.message)})}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._volumeThrottles.clear(),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0),this._swipeAnimTimer&&(clearTimeout(this._swipeAnimTimer),this._swipeAnimTimer=0),this._queueRefreshTimer&&(clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=0),this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=null,++this._queueVersion,this._swipeAnimating=!1,this._swipeClass="",this._prevPlayingSet="",++this._loadVersion,this._configLoadingInProgress=!1,this._lastArtworkUrl="",this._samplingCanvas=void 0,this._samplingCtx=void 0,delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic"),this._unjoinUnsub?.(),this._unjoinUnsub=void 0}updated(e){if(super.updated(e),e.has("areaId")&&(this._foldOpen=!1,this._foldTab="controls",this._queueData=[],this._prevMediaTitle="",this._playersCache=null,this._playersCacheKey="",this._roomIndex=0),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._backend||(this._backend=new at(this.hass),this._loadConfig());const t=e.get("hass");t&&t.entities!==this.hass.entities&&(this._playersCache=null,this._playersCacheKey="")}if(e.has("hass")&&this.isDashboard&&this.hass){const e=Object.entries(this.hass.states).filter(([e,t])=>e.startsWith("media_player.")&&"playing"===t.state).map(([e])=>e).sort().join(",");if(e!==this._prevPlayingSet){const t=new Set(this._prevPlayingSet.split(",").filter(Boolean)),i=e.split(",").filter(Boolean).filter(e=>!t.has(e));if(this._prevPlayingSet=e,i.length>0){const e=this._getActiveRooms(),t=e.findIndex(e=>i.includes(e.entityId)||i.some(t=>e.groupMembers.includes(t)));t>=0&&t!==this._roomIndex&&(this._roomIndex=t,this._roomEntityId=e[t].entityId)}}}if(e.has("_roomIndex")&&this._foldOpen&&"queue"===this._foldTab&&(this._queueData=[],this._prevMediaTitle="",this._loadQueue()),e.has("hass")&&this.hass&&this._foldOpen&&"queue"===this._foldTab){const e=this._getCurrentMaster(),t=e?this.hass.states[e.entityId]?.attributes?.media_title??"":"";t!==this._prevMediaTitle&&(this._prevMediaTitle=t,this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}(e.has("hass")||e.has("_roomIndex"))&&this._syncProgressTimer(),this._updateBgLightAttribute()}_updateBgLightAttribute(){const e=this.shadowRoot?.querySelector("img.dash-art-bg");if(!e)return this._lastArtworkUrl="",delete this.dataset.bgLight,void this.style.removeProperty("--c-accent-dynamic");if(!e.complete||0===e.naturalWidth)return void e.addEventListener("load",()=>this._updateBgLightAttribute(),{once:!0});if(e.src===this._lastArtworkUrl)return;this._lastArtworkUrl=e.src;const t=16;this._samplingCanvas||(this._samplingCanvas=document.createElement("canvas"),this._samplingCanvas.width=t,this._samplingCanvas.height=t,this._samplingCtx=this._samplingCanvas.getContext("2d",{willReadFrequently:!0}));const i=this._samplingCtx;if(i)try{i.clearRect(0,0,t,t),i.drawImage(e,0,0,t,t);const a=i.getImageData(0,0,t,t).data;let r=0;const s=256;for(let e=0;e<a.length;e+=4)r+=.299*a[e]+.587*a[e+1]+.114*a[e+2];r/s/255>.55?this.dataset.bgLight="true":delete this.dataset.bgLight;let o=0,n=0,c=0,l=0;for(let e=0;e<a.length;e+=4){const t=a[e],i=a[e+1],r=a[e+2],s=Math.max(t,i,r)/255,d=Math.min(t,i,r)/255,h=s===d?0:(s+d)/2>.5?(s-d)/(2-s-d):(s-d)/(s+d);h<.15||(o+=t*h,n+=i*h,c+=r*h,l+=h)}if(l>0){const e=`rgb(${Math.round(o/l)}, ${Math.round(n/l)}, ${Math.round(c/l)})`;this.style.setProperty("--c-accent-dynamic",e)}else this.style.removeProperty("--c-accent-dynamic")}catch{delete this.dataset.bgLight,this.style.removeProperty("--c-accent-dynamic")}}_syncProgressTimer(){const e=this.hass?this._getPlayers():[],t=this._findMaster(e),i=null!=t&&Na(t.state)&&t.duration>0;i&&!this._progressTimer?this._progressTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=0)}getTrackedEntityIds(){return this.isDashboard&&this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")):this._getPlayers().map(e=>e.entityId)}get isDashboard(){return!this.areaId}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.media_card&&(this._mediaConfig={extra_entities:t.media_card.extra_entities??{},show_header:t.media_card.show_header??!0}),this._configLoaded=!0,this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}_getPlayers(){if(!this.hass)return[];if(this.isDashboard)return Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")&&Ua(e.state)).map(Va).sort((e,t)=>{const i=e=>"playing"===e?0:"buffering"===e?1:2,a=i(e.state)-i(t.state);return 0!==a?a:t.lastUpdated-e.lastUpdated});const e=this.areaId??"",t=this._mediaConfig.extra_entities[e]||[],i=`${e}:${JSON.stringify(t)}`;if(this._playersCache&&this._playersCacheKey===i)return this._playersCache.map(e=>{const t=this.hass?.states[e.entityId];return t?Va(t):e});const a=(this.hass.entities?et(e,this.hass.entities,this.hass.devices):[]).filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id),r=[...new Set([...a,...t])].map(e=>this.hass?.states[e]).filter(e=>!!e).map(Va);return this._playersCache=r,this._playersCacheKey=i,r}_findMaster(e){return e.find(e=>Na(e.state))||e.find(e=>Ua(e.state))||null}_getCurrentMaster(){if(this.isDashboard){const e=this._getActiveRooms();if(!e.length)return this._lastMaster??null;return e[Math.min(this._roomIndex,e.length-1)]}return this._findMaster(this._getPlayers())}_getActiveRooms(){if(!this.hass)return[];const e=Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")&&Ua(e.state)).map(Va);e.sort((e,t)=>{const i=(e.groupMembers.length>0&&e.groupMembers[0]===e.entityId?0:1)-(t.groupMembers.length>0&&t.groupMembers[0]===t.entityId?0:1);return 0!==i?i:t.lastUpdated-e.lastUpdated});const t=new Set,i=[];for(const a of e)if(!t.has(a.entityId)){for(const e of a.groupMembers)t.add(e);t.add(a.entityId),i.push(a)}return i}_togglePlayPause(e){Je(this,"light"),Na(e.state)?Ba(e,1)?this._safeCallService("media_player","media_pause",{},{entity_id:e.entityId}):Ba(e,4096)&&this._safeCallService("media_player","media_stop",{},{entity_id:e.entityId}):Ba(e,16384)&&this._safeCallService("media_player","media_play",{},{entity_id:e.entityId})}_previous(e){Je(this,"light"),this._safeCallService("media_player","media_previous_track",{},{entity_id:e})}_next(e){Je(this,"light"),this._safeCallService("media_player","media_next_track",{},{entity_id:e}),this._foldOpen&&"queue"===this._foldTab&&(this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=window.setTimeout(()=>this._loadQueue(),1e3))}_toggleMute(e){this._safeCallService("media_player","volume_mute",{is_volume_muted:!e.isMuted},{entity_id:e.entityId})}_setVolume(e,t){const i=Date.now();i-(this._volumeThrottles.get(e)||0)<100||(this._volumeThrottles.set(e,i),this._safeCallService("media_player","volume_set",{volume_level:t},{entity_id:e}))}_toggleShuffle(e){this._safeCallService("media_player","shuffle_set",{shuffle:!e.shuffle},{entity_id:e.entityId})}_cycleRepeat(e){const t="off"===e.repeat?"all":"all"===e.repeat?"one":"off";this._safeCallService("media_player","repeat_set",{repeat:t},{entity_id:e.entityId})}_selectSource(e,t){this._safeCallService("media_player","select_source",{source:t},{entity_id:e})}_selectSoundMode(e,t){this._safeCallService("media_player","select_sound_mode",{sound_mode:t},{entity_id:e})}_seekProgress(e,t,i){const a=i/100*t;this._safeCallService("media_player","media_seek",{seek_position:a},{entity_id:e})}_joinGroup(e,t){this._safeCallService("media_player","join",{group_members:[t]},{entity_id:e})}_unjoinGroup(e){this._safeCallService("media_player","unjoin",{},{entity_id:e})}async _waitForUnjoin(e,t=3e3){this._unjoinUnsub?.(),this._unjoinUnsub=void 0;const i=++this._loadVersion;return new Promise(a=>{let r=!1;const s=()=>{r||(r=!0,this._unjoinUnsub?.(),this._unjoinUnsub=void 0,clearTimeout(o))};if(!this.hass)return void a(!1);this.hass.connection.subscribeEvents(t=>{if(i===this._loadVersion){if(t.data.entity_id===e){const e=t.data.new_state?.attributes?.group_members;(!e||e.length<=1)&&(s(),a(!0))}}else s()},"state_changed").then(e=>{r?e():this._unjoinUnsub=e});const o=setTimeout(()=>{s(),a(!1)},t)})}async _smartJoin(e,t){if(!this.hass)return;const i=this.hass.states[t];if(!i)return;const a=i.attributes.group_members;a&&a.length>1&&(this._unjoinGroup(t),await this._waitForUnjoin(t),!this.isConnected||!this.hass)||this._joinGroup(e,t)}_swipeToRoom(e,t){this._swipeAnimating||(this._swipeAnimating=!0,this._foldOpen=!1,this._swipeClass="left"===e?"swipe-exit-left":"swipe-exit-right",this._swipeAnimTimer=window.setTimeout(()=>{this._roomIndex=t,this._roomEntityId="",this._swipeClass="left"===e?"swipe-enter-right":"swipe-enter-left",this._swipeAnimTimer=window.setTimeout(()=>{this._swipeClass="",this._swipeAnimating=!1},280)},220))}_onProgressPointerDown(e,t,i){e.stopPropagation();const a=e.currentTarget;a.setPointerCapture(e.pointerId);const r=a.querySelector(".dash-progress-fill"),s=a.querySelector(".dash-progress-thumb"),o=e=>{const t=a.getBoundingClientRect(),i=Math.max(0,Math.min(100,(e.clientX-t.left)/t.width*100));r.style.width=i+"%",r.style.transition="none",s.style.left=i+"%",s.style.opacity="1"};o(e);const n=e=>o(e),c=()=>{a.removeEventListener("pointermove",n),a.removeEventListener("pointerup",l),a.removeEventListener("pointercancel",c),a.removeEventListener("lostpointercapture",c),r.style.transition="",s.style.opacity=""},l=e=>{c();const r=a.getBoundingClientRect(),s=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));this._seekProgress(t,i,s)};a.addEventListener("pointermove",n),a.addEventListener("pointerup",l),a.addEventListener("pointercancel",c),a.addEventListener("lostpointercapture",c)}_onMrVolPointerDown(e,t){e.stopPropagation();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const a=i.querySelector(".mr-vol-fill"),r=i.querySelector(".mr-vol-val"),s=e=>{const s=i.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100));a.style.width=o+"%",r&&(r.textContent=Math.round(o)+"%"),this._setVolume(t,o/100)};s(e);const o=e=>s(e),n=()=>{Je(this,"light"),i.removeEventListener("pointermove",o),i.removeEventListener("pointerup",n),i.removeEventListener("pointercancel",n),i.removeEventListener("lostpointercapture",n)};i.addEventListener("pointermove",o),i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n),i.addEventListener("lostpointercapture",n)}_getElapsed(e){if(!Na(e.state)||0===e.positionUpdatedAt)return e.elapsed;const t=Date.now()/1e3-e.positionUpdatedAt;return Math.min(e.elapsed+t,e.duration)}_getProgress(e){return e.duration<=0?0:Math.min(100,this._getElapsed(e)/e.duration*100)}_renderHero(e,t=1){const i=Na(e.state),a=this._getProgress(e),r=this._getElapsed(e),s=this._getGroupablePlayers(),o=this._findGroupCoordinator(e,s),n=(o?.groupMembers||[]).length,c=this._bindGesture({onLongPress:()=>{this._foldOpen=!this._foldOpen,this._foldOpen&&this._loadQueue(),this._foldOpen&&setTimeout(()=>{const e=this.renderRoot?.querySelector(".ctrl-fold");e?.scrollIntoView({behavior:"smooth",block:"nearest"})},350)},onSwipe:e=>{this.isDashboard&&t>1&&("left"===e?this._swipeToRoom("left",(this._roomIndex+1)%t):this._swipeToRoom("right",(this._roomIndex-1+t)%t))},exclude:"button"});return N`
      <div class="dash-wrap ${this._foldOpen?"fold-open":""}">
        <div class="dash-hero ${this._swipeClass}"
          @pointerdown=${c.pointerdown}
          @pointerup=${c.pointerup}
          @pointermove=${c.pointermove}
          @pointercancel=${c.pointercancel}
          @contextmenu=${c.contextmenu}
        >
          <!-- Full-bleed artwork background -->
          ${e.albumArt?N`
            <img class="dash-art-bg" src=${e.albumArt} alt="" loading="lazy"
              @error=${e=>{e.target.style.display="none";const t=e.target.parentElement?.querySelector(".dash-deco");t&&(t.style.display="");const i=e.target.parentElement?.querySelector(".dash-placeholder");i&&(i.style.display="")}} />
          `:B}
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
                <span>${De(e.name,Ee)}</span>
                ${i?N`
                  <div class="dash-eq playing">
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                    <div class="dash-eq-bar"></div>
                  </div>
                `:B}
              </div>
              ${n>1?N`
                <div class="dash-group-badge glass-pill">
                  <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                  <span>${Ne("media.speakers_count",{count:n})}</span>
                </div>
              `:B}
            </div>

            <!-- Spacer -->
            <div class="dash-spacer"></div>

            <!-- Bottom glass panel: track info + progress + transport -->
            <div class="dash-info-panel glass-panel">
              <div class="dash-track">
                ${e.title?N`
                  <div class="dash-track-title">${De(e.title,22)}</div>
                `:B}
                ${e.artist?N`
                  <div class="dash-track-artist">${De(e.artist,28)}</div>
                `:B}
              </div>

              <!-- Progress bar -->
              ${e.duration>0&&Ba(e,2)?N`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${Wa(r)}</span>
                    <span class="dash-track-time">${Wa(e.duration)}</span>
                  </div>
                  <div class="dash-progress"
                    aria-label=${Ne("media.seek_aria")}
                    @pointerdown=${t=>this._onProgressPointerDown(t,e.entityId,e.duration)}
                  >
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                    <div class="dash-progress-thumb" style="left:${a}%"></div>
                  </div>
                </div>
              `:e.duration>0?N`
                <div class="dash-progress-wrap">
                  <div class="dash-time-row">
                    <span class="dash-track-time">${Wa(r)}</span>
                    <span class="dash-track-time">${Wa(e.duration)}</span>
                  </div>
                  <div class="dash-progress" style="pointer-events:none">
                    <div class="dash-progress-fill" style="width:${a}%"></div>
                  </div>
                </div>
              `:B}

              <!-- Transport -->
              <div class="dash-transport">
                ${Ba(e,32768)?N`
                  <button class="transport-btn ${e.shuffle?"active":""}"
                    aria-label=${Ne("media.shuffle_aria")}
                    @click=${t=>{t.stopPropagation(),this._toggleShuffle(e)}}>
                    <ha-icon .icon=${"mdi:shuffle-variant"}></ha-icon>
                  </button>
                `:B}

                ${Ba(e,16)?N`
                  <button class="transport-btn transport-skip"
                    aria-label=${Ne("media.prev_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._previous(e.entityId)}}>
                    <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
                  </button>
                `:B}

                <button class="transport-btn transport-main"
                  aria-label=${Ne(i?"media.pause_aria":"media.play_aria",{name:e.name})}
                  @click=${t=>{t.stopPropagation(),this._togglePlayPause(e)}}>
                  <ha-icon .icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
                </button>

                ${Ba(e,32)?N`
                  <button class="transport-btn transport-skip"
                    aria-label=${Ne("media.next_aria",{name:e.name})}
                    @click=${t=>{t.stopPropagation(),this._next(e.entityId)}}>
                    <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
                  </button>
                `:B}

                ${Ba(e,262144)?N`
                  <button class="transport-btn ${"off"!==e.repeat?"active":""}"
                    aria-label=${Ne("media.repeat_aria")}
                    @click=${t=>{t.stopPropagation(),this._cycleRepeat(e)}}>
                    <ha-icon .icon=${"one"===e.repeat?"mdi:repeat-once":"mdi:repeat"}></ha-icon>
                  </button>
                `:B}
              </div>

              <div class="dash-source-row">
                ${o&&o.entityId!==e.entityId?N`
                  <span class="dash-coordinator-badge">
                    <ha-icon .icon=${o.icon||"mdi:speaker"}></ha-icon>
                    ${o.name}
                  </span>
                `:B}
                ${e.source?N`
                  <span class="dash-track-source">${e.source}</span>
                `:B}
              </div>
            </div>
          </div>

          <!-- Navigation arrows (desktop hover, multi-room) -->
          ${this.isDashboard&&t>1?N`
            <button class="dash-nav-arrow dash-nav-left" aria-label=${Ne("media.prev_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("right",(this._roomIndex-1+t)%t)}}>
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <button class="dash-nav-arrow dash-nav-right" aria-label=${Ne("media.next_room_aria")}
              @click=${e=>{e.stopPropagation(),this._swipeToRoom("left",(this._roomIndex+1)%t)}}>
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          `:B}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="dash-fold-sep-top"></div>
            <div class="dash-fold-panel">
              ${this._foldOpen?this._renderFoldContent(e,o,s):B}
            </div>
          </div>
        </div>
      </div>
    `}_renderFoldContent(e,t,i){const a="queue"===this._foldTab;return N`
      <div class="segmented">
        <button class="seg-btn ${a?"":"active"}"
                @click=${()=>{this._foldTab="controls"}}>
          ${Ne("media.controls_tab")}
        </button>
        <button class="seg-btn ${a?"active":""}"
                @click=${()=>{this._foldTab="queue",this._loadQueue()}}>
          ${Ne("media.queue_tab")}
        </button>
      </div>
      ${a?this._renderQueueTab():this._renderControlsTab(e,t,i)}
    `}_renderControlsTab(e,t,i){return N`
      <!-- Volume -->
      ${Ba(e,4)?N`
        <div class="ctrl-label">${Ne("media.volume_label")}</div>
        <div class="volume-row">
          ${Ba(e,8)?N`
            <button class="volume-btn ${e.isMuted?"muted":""}"
              aria-label=${e.isMuted?Ne("media.unmute_aria",{name:e.name}):Ne("media.mute_aria",{name:e.name})}
              @click=${t=>{t.stopPropagation(),this._toggleMute(e)}}>
              <ha-icon .icon=${e.isMuted?"mdi:volume-off":e.volume>.5?"mdi:volume-high":"mdi:volume-medium"}></ha-icon>
            </button>
          `:B}
          <glass-slider
            .value=${Math.round(100*(e.isMuted?0:e.volume))}
            color="var(--rgb-white)"
            .label=${`${Math.round(100*(e.isMuted?0:e.volume))}%`}
            @glass-slider-input=${t=>this._setVolume(e.entityId,t.detail.value/100)}
            @glass-slider-change=${t=>this._setVolume(e.entityId,t.detail.value/100)}
          ></glass-slider>
        </div>
      `:B}

      <!-- Source chips -->
      ${Ba(e,2048)&&e.sourceList.length>0?N`
        <div class="dash-fold-sep"></div>
        <div class="ctrl-label">${Ne("media.source_label")}</div>
        <div class="chips-row">
          ${e.sourceList.map(t=>N`
            <button class="chip ${e.source===t?"active":""}"
              @click=${i=>{i.stopPropagation(),this._selectSource(e.entityId,t)}}>
              <ha-icon .icon=${Ka[t]||"mdi:import"}></ha-icon>
              <span>${t}</span>
            </button>
          `)}
        </div>
      `:B}

      <!-- Sound mode chips -->
      ${Ba(e,65536)&&e.soundModeList.length>0?N`
        <div class="dash-fold-sep"></div>
        <div class="ctrl-label">${Ne("media.sound_mode_label")}</div>
        <div class="chips-row">
          ${e.soundModeList.map(t=>N`
            <button class="chip ${e.soundMode===t?"active":""}"
              @click=${i=>{i.stopPropagation(),this._selectSoundMode(e.entityId,t)}}>
              <ha-icon .icon=${"mdi:equalizer"}></ha-icon>
              <span>${t}</span>
            </button>
          `)}
        </div>
      `:B}

      <!-- Multiroom grid (show if any groupable speakers exist) -->
      ${i.length>1?this._renderMultiroomGrid(t,i):B}
    `}async _loadQueue(){if(!this.hass)return;const e=++this._queueVersion,t=this._getCurrentMaster();if(t)try{const i=await this.hass.connection.sendMessagePromise({type:"call_service",domain:"sonos",service:"get_queue",target:{entity_id:t.entityId},return_response:!0});if(e!==this._queueVersion)return;const a=i?.response?.[t.entityId]??[];this._queueData=a.map(e=>({name:e.media_title??"",artist:e.media_artist??"",album_name:e.media_album_name??"",content_id:e.media_content_id??""}))}catch(i){if(e!==this._queueVersion)return;console.warn("[glass] queue load error:",i)}}_renderQueueTab(){const e=this._getCurrentMaster(),t=e?this.hass?.states[e.entityId]?.attributes?.queue_position??0:0,i=this._queueData.slice(t);return i.length?N`
      <div class="queue-list">
        ${i.map((e,i)=>{const a=e.name??"",r=e.artist??"",s=e.content_id??"",o=!!s&&this._radioTracks.some(e=>e.uri===s),n=t+i;return N`
            <div class="queue-item">
              <div class="queue-num">${i+1}</div>
              <div class="queue-info">
                <span class="queue-title">${De(a,Ee)}</span>
                <span class="queue-artist">${r}</span>
              </div>
              ${o?N`<span class="queue-badge">${Ne("media.radio_badge")}</span>`:B}
              <button class="btn-icon xs queue-remove" aria-label="${Ne("media.remove_from_queue")}"
                      @click=${e=>{e.stopPropagation(),this._removeFromQueue(n)}}>
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          `})}
      </div>
    `:N`<div class="queue-empty">${Ne("media.queue_empty")}</div>`}async _removeFromQueue(e){if(this.configPreview)return;const t=this._getCurrentMaster();if(t&&this.hass){this._queueData=this._queueData.filter((t,i)=>i!==e);try{await this.hass.callService("sonos","remove_from_queue",{queue_position:e},{entity_id:t.entityId})}catch{this._loadQueue()}}}_getGroupablePlayers(){return this.hass?Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("media_player.")).map(Va).filter(e=>Ba(e,qa)):[]}_findGroupCoordinator(e,t){if(Ba(e,qa))return e;const i=t.find(t=>Na(t.state)&&t.title&&t.title===e.title);return i||null}_renderMultiroomGrid(e,t){if(!this.hass||!e)return N``;const i=e.entityId,a=new Set(e.groupMembers),r=t.filter(e=>e.entityId!==i);return 0===r.length?N``:N`
      <div class="dash-fold-sep"></div>
      <div class="ctrl-label">${Ne("media.speakers_label")}</div>
      <div class="multiroom-grid">
        ${r.map(e=>{const t=a.has(e.entityId);return N`
            <div class="mr-cell ${t?"joined":""}">
              <div class="mr-cell-top">
                <button class="mr-icon-btn"
                  aria-label=${Ne(t?"media.remove_group_aria":"media.add_group_aria",{name:e.name})}
                  @click=${a=>{a.stopPropagation(),t?this._unjoinGroup(e.entityId):this._smartJoin(i,e.entityId)}}>
                  <ha-icon .icon=${e.icon||"mdi:speaker"}></ha-icon>
                </button>
                <div class="mr-info">
                  <div class="mr-name">${e.name}</div>
                </div>
              </div>
              ${t?N`
                <div class="mr-vol-slider"
                  @pointerdown=${t=>this._onMrVolPointerDown(t,e.entityId)}>
                  <div class="mr-vol-fill" style="width:${Math.round(100*e.volume)}%"></div>
                  <div class="mr-vol-icon"><ha-icon .icon=${"mdi:volume-medium"}></ha-icon></div>
                  <span class="mr-vol-val">${Math.round(100*e.volume)}%</span>
                </div>
              `:B}
            </div>
          `})}
      </div>
    `}_collapseExpanded(){this._foldOpen&&(this._foldOpen=!1,this._foldTab="controls")}render(){if(this._lang,!this.hass)return B;if(!this._configLoaded)return B;const e=this._mediaConfig.show_header;if(this.isDashboard){const t=this._getActiveRooms();if(0===t.length)return this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),N`
          ${e?N`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${Ne("media.title")}</span>
              </div>
            </div>
          `:B}
          ${this._renderHero(this._lastMaster)}
        `):B;if(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._roomEntityId){const e=t.findIndex(e=>e.entityId===this._roomEntityId);e>=0?this._roomIndex=e:this._roomIndex>=t.length&&(this._roomIndex=0)}this._roomIndex>=t.length&&(this._roomIndex=0);const i=t[this._roomIndex];return this._roomEntityId=i.entityId,this._lastMaster=i,N`
        ${e?N`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${Ne("media.title")}</span>
            </div>
            ${i.source?N`
              <span class="card-source active">${i.source}</span>
            `:B}
          </div>
        `:B}
        ${this._renderHero(i,t.length)}
        ${t.length>1?N`
          <div class="dash-dots">
            ${t.map((e,t)=>N`
              <button class="dash-dot ${t===this._roomIndex?"active":""}"
                aria-label=${Ne("media.room_dot_aria",{index:t+1})}
                aria-current=${t===this._roomIndex?"true":"false"}
                @click=${e=>{e.stopPropagation(),t!==this._roomIndex&&this._swipeToRoom(t>this._roomIndex?"left":"right",t)}}>
              </button>
            `)}
          </div>
        `:B}
      `}const t=this._getPlayers(),i=this._findMaster(t);return i&&Ua(i.state)?(this._lastMasterStaleTimer&&(clearTimeout(this._lastMasterStaleTimer),this._lastMasterStaleTimer=0),this._lastMaster=i,N`
      ${e?N`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${Ne("media.title")}</span>
          </div>
          ${i.source?N`
            <span class="card-source active">${i.source}</span>
          `:B}
        </div>
      `:B}
      ${this._renderHero(i)}
    `):this._lastMaster?(this._lastMasterStaleTimer||(this._lastMasterStaleTimer=window.setTimeout(()=>{this._lastMaster=null,this._lastMasterStaleTimer=0,this.requestUpdate()},2e3)),N`
        ${e?N`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${Ne("media.title")}</span>
            </div>
          </div>
        `:B}
        ${this._renderHero(this._lastMaster)}
      `):B}static{this.styles=[$e,Se,Ce,Ie,ze,Pe,s`
      :host {
        width: 100%;
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
    `]}}Fa([pe()],Ya.prototype,"areaId"),Fa([ue()],Ya.prototype,"_foldOpen"),Fa([ue()],Ya.prototype,"_mediaConfig"),Fa([ue()],Ya.prototype,"_configLoaded"),Fa([ue()],Ya.prototype,"_roomIndex"),Fa([ue()],Ya.prototype,"_swipeClass"),Fa([ue()],Ya.prototype,"_foldTab"),Fa([ue()],Ya.prototype,"_queueData"),Fa([ue()],Ya.prototype,"_radioTracks");try{customElements.define("glass-media-card",Ya)}catch{}Ye("glass-weather-card-editor");var Ga=Object.defineProperty,Xa=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ga(t,i,s),s};const Qa={sunny:"sunny","clear-night":"clear_night",partlycloudy:"partly_cloudy",cloudy:"cloudy",fog:"foggy",rainy:"rainy",pouring:"pouring",snowy:"snowy","snowy-rainy":"snowy_rainy",hail:"hail",lightning:"lightning","lightning-rainy":"stormy",windy:"windy","windy-variant":"windy_variant",exceptional:"exceptional"},Ja={sunny:{icon:"mdi:weather-sunny",textKey:"weather.cond_sunny",tint:"#fbbf24",tintOp:.1,sparkStroke:"rgba(251,191,36,0.6)",sparkFill:"rgba(251,191,36,0.15)"},clear_night:{icon:"mdi:weather-night",textKey:"weather.cond_clear_night",tint:"#818cf8",tintOp:.08,sparkStroke:"rgba(129,140,248,0.5)",sparkFill:"rgba(129,140,248,0.12)"},partly_cloudy:{icon:"mdi:weather-partly-cloudy",textKey:"weather.cond_partly_cloudy",tint:"#fcd34d",tintOp:.07,sparkStroke:"rgba(252,211,77,0.5)",sparkFill:"rgba(252,211,77,0.12)"},cloudy:{icon:"mdi:weather-cloudy",textKey:"weather.cond_cloudy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.4)",sparkFill:"rgba(148,163,184,0.08)"},foggy:{icon:"mdi:weather-fog",textKey:"weather.cond_foggy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.35)",sparkFill:"rgba(148,163,184,0.08)"},rainy:{icon:"mdi:weather-rainy",textKey:"weather.cond_rainy",tint:"#60a5fa",tintOp:.1,sparkStroke:"rgba(96,165,250,0.6)",sparkFill:"rgba(96,165,250,0.15)"},pouring:{icon:"mdi:weather-pouring",textKey:"weather.cond_pouring",tint:"#3b82f6",tintOp:.14,sparkStroke:"rgba(59,130,246,0.7)",sparkFill:"rgba(59,130,246,0.18)"},snowy:{icon:"mdi:weather-snowy",textKey:"weather.cond_snowy",tint:"#e0f2fe",tintOp:.08,sparkStroke:"rgba(224,242,254,0.5)",sparkFill:"rgba(224,242,254,0.12)"},snowy_rainy:{icon:"mdi:weather-snowy-rainy",textKey:"weather.cond_snowy_rainy",tint:"#93c5fd",tintOp:.08,sparkStroke:"rgba(147,197,253,0.5)",sparkFill:"rgba(147,197,253,0.12)"},hail:{icon:"mdi:weather-hail",textKey:"weather.cond_hail",tint:"#bae6fd",tintOp:.1,sparkStroke:"rgba(186,230,253,0.5)",sparkFill:"rgba(186,230,253,0.12)"},lightning:{icon:"mdi:weather-lightning",textKey:"weather.cond_lightning",tint:"#c084fc",tintOp:.12,sparkStroke:"rgba(192,132,252,0.6)",sparkFill:"rgba(167,139,250,0.15)"},stormy:{icon:"mdi:weather-lightning-rainy",textKey:"weather.cond_stormy",tint:"#a78bfa",tintOp:.12,sparkStroke:"rgba(167,139,250,0.6)",sparkFill:"rgba(167,139,250,0.15)"},windy:{icon:"mdi:weather-windy",textKey:"weather.cond_windy",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.5)",sparkFill:"rgba(110,231,183,0.10)"},windy_variant:{icon:"mdi:weather-windy-variant",textKey:"weather.cond_windy_variant",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.4)",sparkFill:"rgba(110,231,183,0.10)"},exceptional:{icon:"mdi:alert-circle-outline",textKey:"weather.cond_exceptional",tint:"#fca5a5",tintOp:.1,sparkStroke:"rgba(252,165,165,0.5)",sparkFill:"rgba(252,165,165,0.12)"}},Za=["compass_N","compass_NNE","compass_NE","compass_ENE","compass_E","compass_ESE","compass_SE","compass_SSE","compass_S","compass_SSW","compass_SW","compass_WSW","compass_W","compass_WNW","compass_NW","compass_NNW"];function er(e){return e<10?"0"+e:""+e}class tr extends Qe{constructor(){super(...arguments),this._activeTab=null,this._forecastDaily=[],this._forecastHourly=[],this._clockTime="",this._clockSec="",this._clockDay="",this._clockDate="",this._weatherConfig={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},this._canvas=null,this._ctx=null,this._animId=0,this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:200,color:"rgba(167,139,250,"},this._cW=0,this._cH=0,this._resizeObserver=null,this._cachedCond="",this._clockInterval=0,this._unsubDaily=null,this._unsubHourly=null,this._configLoaded=!1,this._configLoadingInProgress=!1,this._canvasReady=!1,this._needsCanvasReInit=!1,this._subscribedEntity="",this._subscribedShowDaily=!1,this._subscribedShowHourly=!1,this._subVersion=0,this._animRunning=!1,this._animate=()=>{if(!this.isConnected||!this._animRunning)return;const e=this._ctx;if(!e)return;e.clearRect(0,0,this._cW,this._cH);for(const i of this._particles)this._updateParticle(i),this._drawParticle(e,i);const t=this._cachedCond;"stormy"!==t&&"lightning"!==t||(this._updateFlash(),this._flashState.opacity>.01&&(e.fillStyle=this._flashState.color+this._flashState.opacity+")",e.fillRect(0,0,this._cW,this._cH))),this._animId=requestAnimationFrame(this._animate)}}static getConfigElement(){return document.createElement("glass-weather-card-editor")}getCardSize(){return 2}static{this.styles=[$e,Se,Ce,Te,ze,s`
    :host {
      width: 100%;
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
  `]}getTrackedEntityIds(){const e=[],t=this._getEntityId();return t&&e.push(t),this.hass?.states["sun.sun"]&&e.push("sun.sun"),e}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._weatherConfig.entity_id)return this._weatherConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("weather."));if(e)return e}return""}_getWeatherState(){const e=this._getEntityId();return e?this.hass?.states[e]:void 0}_mapCondition(e){return Qa[e]??"cloudy"}_getConditionMeta(e){return Ja[e]??Ja.cloudy}connectedCallback(){super.connectedCallback(),this._startClock(),this._listen("weather-config-changed",()=>this._loadConfig()),this._canvasReady&&(this._needsCanvasReInit=!0)}disconnectedCallback(){super.disconnectedCallback(),this._stopClock(),this._stopAnimation(),this._unsubForecasts(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._canvas=null,this._ctx=null,this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}_collapseExpanded(){null!==this._activeTab&&(this._activeTab=null)}updated(e){if(super.updated(e),e.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,this._unsubForecasts()),this._configLoaded||this._configLoadingInProgress||(this._backend=new at(this.hass),this._loadConfig());const e=this._getWeatherState();this._cachedCond=e?this._mapCondition(e.state):"",this._configLoaded&&this._subscribeForecasts()}this._needsCanvasReInit&&(this._needsCanvasReInit=!1,this._initCanvas())}firstUpdated(){this._canvasReady=!0,this._initCanvas()}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherConfig=e.weather),this._configLoaded=!0,this._configLoadingInProgress=!1,this._subscribedEntity="",this._subscribeForecasts(),this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}async _subscribeForecasts(){const e=this._getEntityId();if(!e||!this.hass)return;const t=this._subscribedShowDaily!==this._weatherConfig.show_daily||this._subscribedShowHourly!==this._weatherConfig.show_hourly;if(e===this._subscribedEntity&&!t)return;this._unsubForecasts(),this._subscribedEntity=e,this._subscribedShowDaily=this._weatherConfig.show_daily,this._subscribedShowHourly=this._weatherConfig.show_hourly;const i=++this._subVersion;if(this._weatherConfig.show_daily){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastDaily=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(this._subVersion!==i)return void t();this._unsubDaily=t}if(this._weatherConfig.show_hourly){const t=await this.hass.connection.subscribeMessage(e=>{this._forecastHourly=e.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:e});if(this._subVersion!==i)return void t();this._unsubHourly=t}}_unsubForecasts(){this._subVersion++,this._unsubDaily?.(),this._unsubDaily=null,this._unsubHourly?.(),this._unsubHourly=null,this._subscribedEntity=""}_startClock(){this._stopClock(),this._updateClock(),this._clockInterval=window.setInterval(()=>this._updateClock(),1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=0)}_updateClock(){const e=new Date;var t,i;this._clockTime=er(e.getHours())+":"+er(e.getMinutes()),this._clockSec=":"+er(e.getSeconds()),this._clockDay=(t=e,i=this._lang,t.toLocaleDateString(i,{weekday:"long"})),this._clockDate=e.getDate()+" "+function(e,t){return e.toLocaleDateString(t,{month:"long"})}(e,this._lang)}_initCanvas(){if(this._resizeObserver?.disconnect(),this._resizeObserver=null,this._stopAnimation(),this._canvas=this.renderRoot.querySelector(".wc-anim"),!this._canvas)return;this._ctx=this._canvas.getContext("2d"),this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas());const e=this._canvas.parentElement;e&&this._resizeObserver.observe(e),this._resizeCanvas(),this._startAnimation()}_resizeCanvas(){if(!this._canvas||!this._ctx)return;const e=this._canvas.parentElement;if(!e)return;const t=e.getBoundingClientRect(),i=window.devicePixelRatio||1;this._cW=t.width,this._cH=t.height,this._canvas.width=this._cW*i,this._canvas.height=this._cH*i,this._canvas.style.width=this._cW+"px",this._canvas.style.height=this._cH+"px",this._ctx.setTransform(i,0,0,i,0,0)}_startAnimation(){this._animRunning||(this._animRunning=!0,this._spawnParticles(this._cachedCond||"cloudy"),this._animate())}_stopAnimation(){this._animRunning=!1,this._animId&&(cancelAnimationFrame(this._animId),this._animId=0)}_rnd(e,t){return e+Math.random()*(t-e)}_spawnParticles(e){this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:this._rnd(120,280),color:"rgba(167,139,250,"};const t=this._cW,i=this._cH;if(!t||!i)return;const a=(e,i,a,r,s,o)=>({type:"drop",x:this._rnd(0,t),y:this._rnd(-30,-5),len:this._rnd(i,a),speed:this._rnd(r,s),angle:o,color:e,opacity:this._rnd(.4,.7)}),r=()=>({type:"flake",x:this._rnd(0,t),y:this._rnd(-10,-3),r:this._rnd(1.5,3.5),speed:this._rnd(.4,1.2),drift:this._rnd(-.3,.3),phase:this._rnd(0,6.28),opacity:this._rnd(.3,.7)}),s=e=>({type:"mote",x:this._rnd(.1*t,.9*t),y:this._rnd(.3*i,.9*i),r:this._rnd(1,2.5),speed:this._rnd(.15,.4),drift:this._rnd(-.15,.15),phase:this._rnd(0,6.28),color:e,opacity:0,maxOp:this._rnd(.3,.7),life:0,maxLife:this._rnd(180,360)}),o=()=>({type:"star",x:this._rnd(.05*t,.95*t),y:this._rnd(.05*i,.7*i),r:this._rnd(.8,1.8),phase:this._rnd(0,6.28),speed:this._rnd(.008,.025)}),n=(e,a)=>({type:"cloud",x:this._rnd(-80,t),y:this._rnd(.05*i,.6*i),w:this._rnd(50,110),h:this._rnd(12,26),speed:this._rnd(.6*a,a),opacity:this._rnd(.6*e,e)}),c=()=>({type:"streak",x:this._rnd(-60,0),y:this._rnd(.1*i,.85*i),w:this._rnd(40,90),speed:this._rnd(2,5),opacity:this._rnd(.06,.14)}),l=()=>({type:"fog",x:this._rnd(-120,.5*t),y:this._rnd(.15*i,.75*i),w:this._rnd(80,160),h:this._rnd(18,35),speed:this._rnd(.2,.6),opacity:this._rnd(.02,.04)}),d=()=>({type:"hail",x:this._rnd(0,t),y:this._rnd(-15,-3),r:this._rnd(2,4),speed:this._rnd(3,5.5),opacity:this._rnd(.5,.8)}),h=this._particles;switch(e){case"sunny":for(let e=0;e<10;e++)h.push(s("rgba(251,191,36,"));break;case"clear_night":for(let e=0;e<14;e++)h.push(o());break;case"partly_cloudy":for(let e=0;e<3;e++)h.push(n(.035,.4));for(let e=0;e<4;e++)h.push(s("rgba(251,191,36,"));break;case"cloudy":for(let e=0;e<5;e++)h.push(n(.045,.35));break;case"foggy":for(let e=0;e<7;e++)h.push(l());break;case"rainy":for(let e=0;e<20;e++)h.push(a("rgba(96,165,250,",14,24,4,7,.14));for(let e=0;e<3;e++)h.push(n(.025,.3));break;case"pouring":for(let e=0;e<35;e++)h.push(a("rgba(59,130,246,",18,30,5.5,9,.1));for(let e=0;e<4;e++)h.push(n(.035,.35));break;case"stormy":for(let e=0;e<28;e++)h.push(a("rgba(167,139,250,",16,28,5,8,.26));for(let e=0;e<4;e++)h.push(n(.05,.5));this._flashState.interval=this._rnd(80,200);break;case"lightning":for(let e=0;e<4;e++)h.push(n(.04,.4));this._flashState.interval=this._rnd(60,160),this._flashState.color="rgba(192,132,252,";break;case"snowy":for(let e=0;e<18;e++)h.push(r());for(let e=0;e<3;e++)h.push(n(.025,.2));break;case"snowy_rainy":for(let e=0;e<10;e++)h.push(r());for(let e=0;e<14;e++)h.push(a("rgba(96,165,250,",12,20,3.5,6,.14));break;case"hail":for(let e=0;e<14;e++)h.push(d());for(let e=0;e<10;e++)h.push(a("rgba(96,165,250,",10,18,3.5,5.5,.14));break;case"windy":for(let e=0;e<8;e++)h.push(c());break;case"windy_variant":for(let e=0;e<6;e++)h.push(c());for(let e=0;e<4;e++)h.push(n(.035,1.2));break;case"exceptional":for(let e=0;e<8;e++)h.push(s("rgba(252,165,165,"));for(let e=0;e<5;e++)h.push(c())}}_updateParticle(e){const t=this._cW,i=this._cH;switch(e.type){case"drop":e.x=e.x+Math.sin(e.angle)*e.speed,e.y=e.y+Math.cos(e.angle)*e.speed,e.y>i+10&&(e.y=this._rnd(-30,-5),e.x=this._rnd(0,t));break;case"flake":e.y=e.y+e.speed,e.phase=e.phase+.02,e.x=e.x+e.drift+.3*Math.sin(e.phase),e.y>i+10&&(e.y=this._rnd(-10,-3),e.x=this._rnd(0,t));break;case"mote":{e.life=e.life+1,e.y=e.y-e.speed,e.x=e.x+e.drift+.2*Math.sin(e.phase+.015*e.life);const a=e.life/e.maxLife;e.opacity=a<.15?a/.15*e.maxOp:a>.85?(1-a)/.15*e.maxOp:e.maxOp,e.life>=e.maxLife&&(e.life=0,e.x=this._rnd(.1*t,.9*t),e.y=this._rnd(.3*i,.9*i),e.maxLife=this._rnd(180,360),e.maxOp=this._rnd(.3,.7));break}case"star":e.phase=e.phase+e.speed;break;case"cloud":e.x=e.x+e.speed,e.x>t+20&&(e.x=-e.w-this._rnd(10,60),e.y=this._rnd(.05*i,.6*i));break;case"streak":e.x=e.x+e.speed,e.x>t+20&&(e.x=this._rnd(-80,-20),e.y=this._rnd(.1*i,.85*i));break;case"fog":e.x=e.x+e.speed,e.x>t+40&&(e.x=-e.w-this._rnd(20,80),e.y=this._rnd(.15*i,.75*i));break;case"hail":e.y=e.y+e.speed,e.y>i+10&&(e.y=this._rnd(-15,-3),e.x=this._rnd(0,t))}}_drawParticle(e,t){switch(t.type){case"drop":{const i=Math.sin(t.angle)*t.len,a=Math.cos(t.angle)*t.len,r=e.createLinearGradient(t.x,t.y,t.x+i,t.y+a);r.addColorStop(0,t.color+"0)"),r.addColorStop(1,t.color+t.opacity+")"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+i,t.y+a),e.strokeStyle=r,e.lineWidth=1.5,e.stroke();break}case"flake":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break;case"mote":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle=t.color+t.opacity+")",e.shadowColor=t.color+.5*t.opacity+")",e.shadowBlur=6,e.fill(),e.shadowBlur=0;break;case"star":{const i=.15+.75*(.5+.5*Math.sin(t.phase));e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+i+")",e.fill();break}case"cloud":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"streak":{const i=e.createLinearGradient(t.x,t.y,t.x+t.w,t.y);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.5,"rgba(255,255,255,"+t.opacity+")"),i.addColorStop(1,"rgba(255,255,255,0)"),e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x+t.w,t.y),e.strokeStyle=i,e.lineWidth=1,e.stroke();break}case"fog":{const i=t.h/2;e.beginPath(),e.moveTo(t.x+i,t.y),e.lineTo(t.x+t.w-i,t.y),e.arcTo(t.x+t.w,t.y,t.x+t.w,t.y+i,i),e.arcTo(t.x+t.w,t.y+t.h,t.x+t.w-i,t.y+t.h,i),e.lineTo(t.x+i,t.y+t.h),e.arcTo(t.x,t.y+t.h,t.x,t.y+i,i),e.arcTo(t.x,t.y,t.x+i,t.y,i),e.closePath(),e.fillStyle="rgba(255,255,255,"+t.opacity+")",e.fill();break}case"hail":e.beginPath(),e.arc(t.x,t.y,t.r,0,6.28),e.fillStyle="rgba(224,242,254,"+t.opacity+")",e.fill(),e.beginPath(),e.arc(t.x-.25*t.r,t.y-.25*t.r,.4*t.r,0,6.28),e.fillStyle="rgba(255,255,255,"+.3*t.opacity+")",e.fill()}}_updateFlash(){const e=this._flashState;e.timer++,e.on?(e.opacity*=.82,e.opacity<.02&&(e.on=!1,e.opacity=0,e.timer=0,e.interval=this._rnd(80,280))):e.timer>e.interval&&(e.on=!0,e.opacity=this._rnd(.12,.22))}_computeSparkline(e){const t=e.length;if(t<2)return{linePath:"",areaPath:"",nowY:32};let i=1/0,a=-1/0;for(const n of e)n.temperature<i&&(i=n.temperature),n.temperature>a&&(a=n.temperature);const r=a-i||1,s=e.map((e,i)=>({x:i/(t-1)*348,y:10+(a-e.temperature)/r*44}));let o=`M${s[0].x},${s[0].y}`;for(let n=0;n<s.length-1;n++){const e=s[Math.max(n-1,0)],t=s[n],i=s[Math.min(n+1,s.length-1)],a=s[Math.min(n+2,s.length-1)];o+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}return{linePath:o,areaPath:o+" L348,64 L0,64 Z",nowY:s[0].y}}render(){this._lang;try{return this._renderContent()}catch(e){return console.error("[glass-weather-card] render error:",e),N`<div class="weather-card-wrap"><div class="glass weather-card"><div class="card-inner" style="padding:16px;text-align:center;color:var(--c-alert);font-size:var(--fz-base);">
        <ha-icon .icon=${"mdi:alert-circle-outline"} style="--mdc-icon-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"></ha-icon>
        Weather render error</div></div></div>`}}_renderContent(){const e=this._getWeatherState();if(!e)return N`<div class="weather-card-wrap">
        ${this._weatherConfig.show_header?N`<div class="card-header"><span class="card-title">${Ne("weather.title")}</span></div>`:B}
        <div class="glass weather-card"><div class="card-inner" style="padding:20px;text-align:center;color:var(--t3);font-size:var(--fz-base);">${Ne("common.no_entity")}</div></div>
      </div>`;const t=e.attributes,i=e.state,a=this._mapCondition(i),r=this._getConditionMeta(a),s=t.temperature??0,o=t.apparent_temperature,n=t.humidity,c=t.wind_speed,l=t.wind_speed_unit??"km/h",d=t.wind_bearing,h=t.pressure,p=t.visibility,u=t.uv_index,g=t.friendly_name??"",_=t.temperature_unit??"°C",m=this.hass?.states["sun.sun"],f=m?.attributes.next_rising,v=m?.attributes.next_setting,b=f?new Date(f).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",y=v?new Date(v).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",w=new Set(this._weatherConfig.hidden_metrics),x=this._forecastHourly.slice(0,10),k=this._computeSparkline(x),$=`background: radial-gradient(ellipse at 80% 20%, ${r.tint}, transparent 70%); opacity: ${r.tintOp};`;return N`
      <div class="weather-card-wrap">
        ${this._weatherConfig.show_header?N`
          <div class="card-header">
            <span class="card-title">${Ne("weather.title")}</span>
            <span class="card-location">${g}</span>
          </div>
        `:B}

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
                  <span class="wc-temp-unit">${_}</span>
                </div>
                <div class="wc-cond-row">
                  <ha-icon .icon="${r.icon}" class="wc-cond-icon ${a}"></ha-icon>
                  <span class="wc-cond-text">${Ne(r.textKey)}</span>
                </div>
                ${null!=o?N`<span class="wc-feels">${Ne("weather.feels_like",{temp:Math.round(o)})}</span>`:B}
              </div>
            </div>

            <!-- Sparkline -->
            ${x.length>=2?N`
              <div class="wc-spark-zone">
                <svg class="wc-spark-svg" viewBox="0 0 348 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${r.sparkFill}" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  ${U`<path class="wc-spark-area" d="${k.areaPath}" fill="url(#sparkGrad)" />`}
                  ${U`<path class="wc-spark-line" d="${k.linePath}" stroke="${r.sparkStroke}" />`}
                </svg>
                <div class="wc-spark-now" style="left:0px;">
                  <div class="wc-spark-now-dot" style="top:${k.nowY/64*100}%"></div>
                </div>
                <div class="wc-spark-labels">
                  ${x.map((e,t)=>N`<span class="wc-spark-lbl">${t%2==0||t===x.length-1?0===t?Ne("weather.now"):new Date(e.datetime).getHours()+"h":""}</span>`)}
                </div>
              </div>
            `:B}

            <!-- Metrics -->
            ${this._renderMetrics(w,n,c,l,d,h,u,p,b,y)}

            <!-- Forecast -->
            ${this._renderForecasts(_)}

          </div>
        </div>
      </div>
    `}_renderMetrics(e,t,i,a,r,s,o,n,c,l){const d=[];var h;return e.has("humidity")||null==t||d.push(N`<div class="wc-metric humidity">
        <ha-icon icon="mdi:water-percent"></ha-icon>
        <span class="wc-metric-val">${t}%</span>
      </div>`),e.has("wind")||null==i||d.push(N`<div class="wc-metric wind">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        <span class="wc-metric-val">${Math.round(i)}</span>
        <span class="wc-metric-unit">${a}</span>
        <span class="wc-metric-dir">${h=r,null==h?"":Ne(`weather.${Za[Math.round((+h%360+360)%360/22.5)%16]}`)}</span>
      </div>`),e.has("pressure")||null==s||d.push(N`<div class="wc-metric pressure">
        <ha-icon icon="mdi:gauge"></ha-icon>
        <span class="wc-metric-val">${Math.round(s)}</span>
        <span class="wc-metric-unit">hPa</span>
      </div>`),e.has("uv")||null==o||d.push(N`<div class="wc-metric uv">
        <ha-icon icon="mdi:sun-wireless"></ha-icon>
        <span class="wc-metric-val">${Math.round(o)}</span>
        <span class="wc-metric-unit">UV</span>
      </div>`),e.has("visibility")||null==n||d.push(N`<div class="wc-metric visibility">
        <ha-icon icon="mdi:eye-outline"></ha-icon>
        <span class="wc-metric-val">${n}</span>
        <span class="wc-metric-unit">km</span>
      </div>`),!e.has("sunrise")&&c&&d.push(N`<div class="wc-metric sunrise">
        <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
        <span class="wc-metric-val">${c}</span>
      </div>`),!e.has("sunset")&&l&&d.push(N`<div class="wc-metric sunset">
        <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
        <span class="wc-metric-val">${l}</span>
      </div>`),0===d.length?B:N`<div class="wc-metrics">
      ${d}
    </div>`}_renderForecasts(e){const t=this._weatherConfig.show_daily,i=this._weatherConfig.show_hourly;return t||i?N`
      <div class="wc-forecast-zone">
        <div class="wc-fc-tabs">
          ${t?N`<button class="wc-fc-tab ${"daily"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("daily")}"
            aria-expanded="${"daily"===this._activeTab?"true":"false"}"
            aria-controls="wc-daily-panel"
            aria-label="${Ne("weather.daily_tab")}">${Ne("weather.daily_tab")}</button>`:B}
          ${i?N`<button class="wc-fc-tab ${"hourly"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("hourly")}"
            aria-expanded="${"hourly"===this._activeTab?"true":"false"}"
            aria-controls="wc-hourly-panel"
            aria-label="${Ne("weather.hourly_tab")}">${Ne("weather.hourly_tab")}</button>`:B}
        </div>

        <div class="wc-fold-sep ${"daily"===this._activeTab&&this._forecastDaily.length>0||"hourly"===this._activeTab&&this._forecastHourly.length>0?"visible":""}"></div>

        ${t?N`
          <div class="fold ${"daily"===this._activeTab?"open":""}" id="wc-daily-panel" role="region" aria-label="${Ne("weather.daily_tab")}" aria-hidden="${"daily"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-daily-list">
                ${this._forecastDaily.slice(0,7).map((e,t)=>{const i=this._mapCondition(e.condition),a=this._getConditionMeta(i),r=new Date(e.datetime),s=0===t?Ne("weather.today"):(o=r,n=this._lang,o.toLocaleDateString(n,{weekday:"short"}));var o,n;return N`
                    <div class="wc-day-row">
                      <span class="wc-day-label">${s}</span>
                      <ha-icon .icon="${a.icon}" class="wc-day-icon ${i}"></ha-icon>
                      <span class="wc-day-cond">${Ne(a.textKey)}</span>
                      <div class="wc-day-temps">
                        <span class="wc-day-hi">${Math.round(e.temperature)}&deg;</span>
                        ${null!=e.templow?N`<span class="wc-day-lo">${Math.round(e.templow)}&deg;</span>`:B}
                      </div>
                      <span class="wc-day-precip">${null!=e.precipitation_probability&&e.precipitation_probability>0?e.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:B}

        ${i?N`
          <div class="fold ${"hourly"===this._activeTab?"open":""}" id="wc-hourly-panel" role="region" aria-label="${Ne("weather.hourly_tab")}" aria-hidden="${"hourly"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-hourly-list">
                ${this._forecastHourly.slice(0,10).map((t,i)=>{const a=this._mapCondition(t.condition),r=this._getConditionMeta(a),s=new Date(t.datetime),o=0===i?Ne("weather.now"):s.getHours()+"h";return N`
                    <div class="wc-hour-row ${0===i?"now":""}">
                      <span class="wc-hour-time">${o}</span>
                      <ha-icon .icon="${r.icon}" class="wc-hour-icon ${a}"></ha-icon>
                      <span class="wc-hour-cond">${Ne(r.textKey)}</span>
                      <span class="wc-hour-temp">${Math.round(t.temperature)}${e}</span>
                      <span class="wc-hour-precip">${null!=t.precipitation_probability&&t.precipitation_probability>0?t.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:B}
      </div>
    `:B}_switchTab(e){this._activeTab=this._activeTab===e?null:e}}Xa([ue()],tr.prototype,"_activeTab"),Xa([ue()],tr.prototype,"_forecastDaily"),Xa([ue()],tr.prototype,"_forecastHourly"),Xa([ue()],tr.prototype,"_clockTime"),Xa([ue()],tr.prototype,"_clockSec"),Xa([ue()],tr.prototype,"_clockDay"),Xa([ue()],tr.prototype,"_clockDate");try{customElements.define("glass-weather-card",tr)}catch{}Ye("glass-presence-card-editor");var ir=Object.defineProperty,ar=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ir(t,i,s),s};const rr=[{from:"#6366f1",to:"#8b5cf6"},{from:"#ec4899",to:"#f472b6"},{from:"#f59e0b",to:"#fbbf24"},{from:"#10b981",to:"#34d399"},{from:"#06b6d4",to:"#22d3ee"},{from:"#f43f5e",to:"#fb7185"}];function sr(e){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isFinite(t)?t:null}class or extends Qe{constructor(){super(...arguments),this._presenceConfig={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}},this._activePerson=null,this._notifText="",this._configLoaded=!1,this._configLoadingInProgress=!1,this._prevActivePerson=null}static getConfigElement(){return document.createElement("glass-presence-card-editor")}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("presence-config-changed",()=>{this._configLoaded=!1,this._loadConfig()}),this._clockInterval=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1,clearInterval(this._clockInterval),this._clockInterval=void 0}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new at(this.hass),this._loadConfig())),e.has("_activePerson")&&this._activePerson&&this._activePerson!==this._prevActivePerson&&requestAnimationFrame(()=>requestAnimationFrame(()=>{this.shadowRoot?.querySelectorAll(".fold-sep").forEach(e=>e.classList.add("visible")),this.shadowRoot?.querySelector(".ctrl-fold")?.classList.add("open")})),this._prevActivePerson=this._activePerson}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const e=await this._backend.send("get_config");e?.presence_card&&(this._presenceConfig=e.presence_card),this._configLoaded=!0,this._configLoadingInProgress=!1,this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}getTrackedEntityIds(){return this._getPersonIds()}_getPersonIds(){return this._presenceConfig.person_entities.length>0?this._presenceConfig.person_entities.filter(e=>this.hass?.states[e]):this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")):[]}_getPersonData(e){const t=this.hass?.states[e];if(!t)return null;const i=t.attributes,a=i.friendly_name||e.split(".")[1],r=i.entity_picture||null,s=this._presenceConfig.smartphone_sensors[e],o=s?this.hass?.states[s]:null,n=o?.attributes??{};let c=o?sr(o.state):null;null==c&&(c=sr(i.battery_level));const l=sr(n.heart_rate),d=sr(n.oxygen_saturation),h=sr(n.daily_steps),p=n.geocoded_location||null,u=this._presenceConfig.notify_services[e]||n.notify_service||null,g=this._presenceConfig.driving_sensors[e];let _=!1;return g&&this.hass?.states[g]?_="on"===this.hass.states[g].state:"on"!==n.android_auto&&!0!==n.android_auto||(_=!0),{entityId:e,name:a,state:t.state,entityPicture:r,latitude:sr(i.latitude),longitude:sr(i.longitude),sourceType:i.source_type||"gps",batteryLevel:c,lastUpdated:t.last_updated,geocodedLocation:p,heartRate:l,spo2:d,steps:h,isDriving:_,notifyService:u}}_presenceClass(e){let t=!1,i=!1;for(const a of e)"home"===a.state?t=!0:i=!0;return t&&i?"mixed":t?"home":"away"}_collapseExpanded(){this._activePerson&&(this._activePerson=null)}async _sendNotification(e){if(this.hass&&e.notifyService&&this._notifText.trim()){Je(this,"light");try{let t="notify",i=e.notifyService;if(i.includes(".")){const e=i.split(".");t=e[0],i=e.slice(1).join(".")}const a=this.hass.user?.name||"Home Assistant";this._safeCallService(t,i,{title:Ne("presence.notif_title",{name:a}),message:this._notifText.trim()}),this._notifText="",this._activePerson=null}catch{}}}render(){if(this._lang,!this.hass)return B;const e=this._getPersonIds();if(0===e.length)return B;const t=e.map(e=>this._getPersonData(e)).filter(e=>null!==e);if(0===t.length)return B;const i=t.filter(e=>"home"===e.state).length,a=this._presenceClass(t),r=0===i?"all-away":i===t.length?"all-home":"mixed";return N`
      ${this._presenceConfig.show_header?N`
            <div class="card-header">
              <div class="card-header-left">
                <span class="card-title">${1===t.length?Ne("presence.title_single"):Ne("presence.title")}</span>
              </div>
              <span class="card-count ${r}">${i}/${t.length}</span>
            </div>
          `:B}
      <div class="glass presence-card" data-presence=${a}>
        <div class="card-tint"></div>
        <div class="card-inner ${this._layoutClass(t.length)}">
          ${this._renderPersons(t)}
        </div>
        ${this._renderFold(t,a)}
      </div>
    `}_layoutClass(e){return 1===e?"solo-layout":2===e?"":"family-layout"}_renderPersons(e){if(1===e.length)return N`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderSoloChips(e[0])}
      `;if(2===e.length)return N`
        ${this._renderPerson(e[0],!1,0)}
        ${this._renderDistance(e[0],e[1])}
        ${this._renderPerson(e[1],!0,1)}
      `;const t=[];for(let i=0;i<e.length;i+=2)i>0&&t.push(N`<div class="family-sep"></div>`),i+1<e.length?t.push(N`
          <div class="family-row">
            ${this._renderPerson(e[i],!1,i)}
            ${this._renderDistance(e[i],e[i+1])}
            ${this._renderPerson(e[i+1],!0,i+1)}
          </div>
        `):t.push(N`
          <div class="family-row solo-row">
            ${this._renderPerson(e[i],!1,i)}
          </div>
        `);return N`${t}`}_renderPerson(e,t,i=0){const a=rr[i%rr.length],r=Re(e.state);return N`
      <div class="person-block ${t?"right":""} ${r?"entity-unavailable":""}">
        <button
          class="avatar-wrapper"
          aria-label=${Ne("presence.avatar_aria",{name:e.name})}
          aria-expanded=${String(this._activePerson===e.entityId)}
          @click=${t=>{t.stopPropagation();const i=this._activePerson===e.entityId?null:e.entityId;i!==this._activePerson&&(this._notifText=""),this._activePerson=i}}
        >
          ${r?N`<div class="avatar avatar-fallback avatar-unavailable"><ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon></div>`:N`
                ${e.entityPicture?N`<img class="avatar" src=${e.entityPicture} alt=${e.name} />`:N`
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
              <span class="person-location">${De(function(e){return"home"===e?Ne("presence.home"):"not_home"===e?Ne("presence.away"):e.charAt(0).toUpperCase()+e.slice(1)}(e.state),Ee)}</span>
              ${e.isDriving?N`<span class="driving-icon"><ha-icon .icon=${"mdi:car"}></ha-icon></span>`:B}
            </div>
          </div>
        </div>
      </div>
    `;var s}_renderDistance(e,t){if(null==e.latitude||null==e.longitude||null==t.latitude||null==t.longitude)return B;const i=function(e,t,i,a){const r=(i-e)*Math.PI/180,s=(a-t)*Math.PI/180,o=Math.sin(r/2)**2+Math.cos(e*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(s/2)**2;return 12742*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}(e.latitude,e.longitude,t.latitude,t.longitude),a=i<.05,r=String(i<1?Math.round(1e3*i):Math.round(i)),s=Ne(i<1?"presence.distance_m":"presence.distance_km");return N`
      <div class="distance-center ${a?"near":""}">
        <div class="distance-line"></div>
        <div class="distance-info">
          <div class="distance-value">${r}</div>
          <div class="distance-unit">${s}</div>
        </div>
        <div class="heart-pulse" aria-hidden="true"><ha-icon .icon=${"mdi:heart"}></ha-icon></div>
        <div class="distance-line right"></div>
      </div>
    `}_renderSoloChips(e){return null==e.heartRate&&null==e.spo2&&null==e.steps?B:N`
      <div class="solo-health-chips">
        ${null!=e.heartRate?N`<div class="solo-chip bpm"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon><span class="solo-chip-val">${e.heartRate}</span></div>`:B}
        ${null!=e.spo2?N`<div class="solo-chip spo2"><ha-icon .icon=${"mdi:water-percent"}></ha-icon><span class="solo-chip-val">${e.spo2}%</span></div>`:B}
        ${null!=e.steps?N`<div class="solo-chip steps"><ha-icon .icon=${"mdi:walk"}></ha-icon><span class="solo-chip-val">${e.steps.toLocaleString()}</span></div>`:B}
      </div>
    `}_renderFold(e,t){if(!this._activePerson)return B;const i=e.find(e=>e.entityId===this._activePerson);if(!i)return B;const a=null!=i.heartRate||null!=i.spo2||null!=i.steps;return N`
      <div class="fold-sep ${t}"></div>
      <div class="ctrl-fold">
        <div class="ctrl-fold-inner">
          <div class="fold-content">
            <div class="health-address-row">
              ${i.geocodedLocation?N`
                <ha-icon .icon=${"mdi:map-marker"}></ha-icon>
                <span class="address-text">${i.geocodedLocation}</span>
              `:B}
              <span class="fold-meta">
                ${null!=i.batteryLevel?N`
                  <span class="fold-battery ${r=i.batteryLevel,r>50?"high":r>20?"medium":"low"}">
                    <ha-icon .icon=${function(e){return e>80?"mdi:battery":e>60?"mdi:battery-70":e>40?"mdi:battery-50":e>20?"mdi:battery-30":"mdi:battery-10"}(i.batteryLevel)}></ha-icon>
                    ${i.batteryLevel}%
                  </span>
                `:B}
                <span class="fold-last-seen">${function(e){const t=Math.floor((Date.now()-new Date(e).getTime())/1e3);return t<60?Ne("presence.just_now"):t<3600?Ne("presence.min_ago",{count:Math.floor(t/60)}):t<86400?Ne("presence.hours_ago",{count:Math.floor(t/3600)}):Ne("presence.days_ago",{count:Math.floor(t/86400)})}(i.lastUpdated)}</span>
              </span>
            </div>
            ${a?N`
                  <div class="health-zone-label">
                    ${Ne("presence.health_label")}
                    <span class="health-zone-name">${i.name}</span>
                  </div>
                  <div class="health-pills">
                    ${null!=i.heartRate?N`
                          <div class="health-pill bpm">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:heart-pulse"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.heartRate}</span>
                              <span class="health-pill-label">${Ne("presence.bpm")}</span>
                            </div>
                          </div>
                        `:B}
                    ${null!=i.spo2?N`
                          <div class="health-pill spo2">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.spo2}%</span>
                              <span class="health-pill-label">${Ne("presence.spo2")}</span>
                            </div>
                          </div>
                        `:B}
                    ${null!=i.steps?N`
                          <div class="health-pill steps">
                            <div class="health-pill-icon"><ha-icon .icon=${"mdi:walk"}></ha-icon></div>
                            <div class="health-pill-data">
                              <span class="health-pill-value">${i.steps.toLocaleString()}</span>
                              <span class="health-pill-label">${Ne("presence.steps")}</span>
                            </div>
                          </div>
                        `:B}
                  </div>
                `:B}
            ${i.notifyService?N`
                  <div class="notif-zone">
                    <div class="notif-to">
                      ${Ne("presence.notify_to")}
                      <span class="notif-to-name">${i.name}</span>
                    </div>
                    <div class="notif-row">
                      <textarea
                        class="notif-input"
                        placeholder=${Ne("presence.notify_placeholder")}
                        .value=${this._notifText}
                        @input=${e=>{this._notifText=e.target.value}}
                        @focus=${()=>this._scrollToTop()}
                      ></textarea>
                      <button
                        class="notif-send"
                        aria-label=${Ne("presence.send_aria")}
                        @click=${e=>{e.stopPropagation(),this._sendNotification(i)}}
                      >
                        <ha-icon .icon=${"mdi:send"}></ha-icon>
                      </button>
                    </div>
                  </div>
                `:B}
          </div>
        </div>
      </div>
    `;var r}static{this.styles=[$e,Se,Ce,Te,Ie,ze,Oe,s`
      :host {
        width: 100%;
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
    `]}}ar([ue()],or.prototype,"_presenceConfig"),ar([ue()],or.prototype,"_activePerson"),ar([ue()],or.prototype,"_notifText");try{customElements.define("glass-presence-card",or)}catch{}Ye("glass-spotify-card-editor");var nr=Object.defineProperty,cr=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&nr(t,i,s),s};function lr(e,t=300){if(!e)return"";const i=e.images??e.album?.images??[];if(0===i.length)return"";const a=[...i].sort((e,i)=>Math.abs((e.width??300)-t)-Math.abs((i.width??300)-t));return a[0]?.url??""}function dr(e){return e&&e.artists?.length?e.artists.map(e=>e.name).join(", "):""}function hr(e){switch(e){case"track":default:return"mdi:music-note";case"playlist":return"mdi:playlist-music";case"album":return"mdi:album";case"show":case"podcast":case"episode":return"mdi:podcast"}}class pr extends Qe{constructor(){super(...arguments),this._view="library",this._tab="all",this._searchQuery="",this._playlists=[],this._recentlyPlayed=[],this._savedTracks=[],this._savedShows=[],this._searchResults={tracks:[],playlists:[],shows:[]},this._searchLoading=!1,this._searchOffset=0,this._searchHasMore=!1,this._searchVersion=0,this._drilldown=null,this._speakers=[],this._pickerItem=null,this._selectedSpeakers=new Set,this._error=null,this._libraryLoading=!1,this._spotifyConfigured=null,this._foldOpen=!1,this._savedMap=new Map,this._sectionTotals={},this._loadingMore={},this._spotifyConfig={entity_id:"",show_header:!0,sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},this._configLoaded=!1,this._configLoadingInProgress=!1,this._loadVersion=0,this._radioQueueVersion=0,this._debounceTimer=0}static getConfigElement(){return document.createElement("glass-spotify-card-editor")}getCardSize(){return 4}static{this.styles=[$e,Se,Ce,ze,Pe,s`
    :host { width: 100%; user-select: none; -webkit-user-select: none; }

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
  `]}getTrackedEntityIds(){const e=this._getEntityId(),t=e?[e]:[];return this._spotifyConfig?.entity_id&&!t.includes(this._spotifyConfig.entity_id)&&t.push(this._spotifyConfig.entity_id),t}_isNowPlaying(e){const t=this._spotifyConfig?.entity_id;if(!t)return!1;const i=this.hass?.states[t];return!(!i||"playing"!==i.state)&&(i.attributes.media_content_id??"")===e}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._spotifyConfig.entity_id)return this._spotifyConfig.entity_id;if(this.hass){const e=Object.keys(this.hass.states).find(e=>e.startsWith("media_player.spotify"));if(e)return e}return""}shouldUpdate(e){return!!super.shouldUpdate(e)&&("speaker_picker"!==this._view||1!==e.size||!e.has("hass"))}connectedCallback(){super.connectedCallback(),this._listen("spotify-config-changed",()=>{this._configLoaded=!1,this._loadConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._debounceTimer&&clearTimeout(this._debounceTimer),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}_collapseExpanded(){"speaker_picker"!==this._view?(this._foldOpen&&(this._foldOpen=!1),this._drilldown&&(this._drilldown=null,this._view=this._searchQuery?"search":"library")):this._closePicker()}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new at(this.hass),this._loadConfig()))}async _loadConfig(){if(!this._backend||this._configLoadingInProgress)return;this._configLoadingInProgress=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;if(t?.spotify_card&&(this._spotifyConfig=t.spotify_card),this._configLoaded=!0,await this._checkSpotifyStatus(),e!==this._loadVersion)return;this._spotifyConfigured&&this._loadLibrary(),this.requestUpdate()}catch{}finally{e===this._loadVersion&&(this._configLoadingInProgress=!1)}}async _checkSpotifyStatus(){if(this._backend)try{const e=await this._backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}async _loadLibrary(){if(!this._backend)return;this._libraryLoading=!0,this._error=null;const e=this._spotifyConfig.max_items_per_section;try{const[t,i,a,r]=await Promise.all([this._backend.send("spotify_browse",{category:"playlists",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"recently_played",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_tracks",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_shows",limit:e,offset:0,sort_order:this._spotifyConfig.sort_order})]);this._playlists=(t?.items??[]).filter(Boolean),this._recentlyPlayed=(i?.items??[]).filter(Boolean),this._savedTracks=(a?.items??[]).filter(Boolean),this._savedShows=(r?.items??[]).filter(Boolean).map(e=>e.show??e),this._sectionTotals={playlists:t?.total??0,recently_played:i?.total??0,saved_tracks:a?.total??0,saved_shows:r?.total??0};const s=[];for(const e of this._recentlyPlayed){const t=e.track??e;!t.id||"track"!==t.type&&t.type||s.push(t.id)}for(const e of this._savedTracks){const t=e.track??e;t.id&&s.push(t.id)}s.length&&this._checkSavedStatus(s)}catch(t){this._handleApiError(t)}finally{this._libraryLoading=!1}}_onSearchInput(e){const t=e.target.value;if(this._searchQuery=t,this._debounceTimer&&clearTimeout(this._debounceTimer),0===t.length)return this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},void(this._searchOffset=0);this._foldOpen||(this._foldOpen=!0),this._view="search",this._debounceTimer=window.setTimeout(()=>this._doSearch(!1),300)}_clearSearch(){this._searchQuery="",this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},this._searchOffset=0,this._foldOpen=!1}async _doSearch(e){if(!this._backend||!this._searchQuery)return;const t=++this._searchVersion;this._searchLoading=!0,this._error=null;const i=e?this._searchOffset:0;try{let a;a="tracks"===this._tab?["track"]:"playlists"===this._tab?["playlist"]:"podcasts"===this._tab?["show"]:["track","playlist","show"];const r=await this._backend.send("spotify_search",{query:this._searchQuery,types:a,limit:12,offset:i});if(t!==this._searchVersion)return;const s=(r?.tracks?.items??[]).filter(Boolean),o=(r?.playlists?.items??[]).filter(Boolean),n=(r?.shows?.items??[]).filter(Boolean);this._searchResults=e?{tracks:[...this._searchResults.tracks,...s],playlists:[...this._searchResults.playlists,...o],shows:[...this._searchResults.shows,...n]}:{tracks:s,playlists:o,shows:n},this._searchOffset=i+12;const c=(r?.tracks?.total??0)+(r?.playlists?.total??0)+(r?.shows?.total??0),l=this._searchResults.tracks.length+this._searchResults.playlists.length+this._searchResults.shows.length;this._searchHasMore=l<c;const d=s.filter(e=>e.id).map(e=>e.id);d.length&&this._checkSavedStatus(d)}catch(a){if(t!==this._searchVersion)return;this._handleApiError(a)}finally{t===this._searchVersion&&(this._searchLoading=!1)}}async _openDrilldown(e,t,i){if(this._backend){this._view="drilldown",this._drilldown={title:i,type:e,id:t,items:[],total:0,offset:0,loading:!0},this._error=null;try{const i="playlist"===e?"playlist_tracks":"album_tracks",a=await this._backend.send("spotify_browse",{category:i,content_id:t,limit:20,offset:0,sort_order:this._spotifyConfig.sort_order}),r=a?.items??[];if(!this._drilldown)return;this._drilldown={...this._drilldown,items:r,total:a?.total??0,offset:20,loading:!1};const s=r.map(e=>(e.track??e).id).filter(Boolean);s.length&&this._checkSavedStatus(s)}catch(a){this._handleApiError(a),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}async _loadMoreDrilldown(){if(this._drilldown&&this._backend){this._drilldown={...this._drilldown,loading:!0};try{const e="playlist"===this._drilldown.type?"playlist_tracks":"album_tracks",t=await this._backend.send("spotify_browse",{category:e,content_id:this._drilldown.id,limit:20,offset:this._drilldown.offset,sort_order:this._spotifyConfig.sort_order}),i=t?.items??[];this._drilldown={...this._drilldown,items:[...this._drilldown.items,...i],offset:this._drilldown.offset+20,loading:!1};const a=i.map(e=>(e.track??e).id).filter(Boolean);a.length&&this._checkSavedStatus(a)}catch(e){this._handleApiError(e),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}_goBack(){this._drilldown=null,this._view=this._searchQuery?"search":"library"}_openPicker(e){if(this._pickerItem=e,this._view="speaker_picker",this._selectedSpeakers=new Set,this.hass){const e=this._spotifyConfig.visible_speakers,t=e.length>0;this._speakers=Object.entries(this.hass.states).filter(([i])=>!!i.startsWith("media_player.")&&!(t&&!e.includes(i))).map(([e,t])=>{const i=t.attributes.device_class??"";let a="mdi:speaker";return"tv"===i||e.includes("tv")?a="mdi:television":"receiver"===i?a="mdi:audio-video":(e.includes("nest")||e.includes("hub")||e.includes("echo_show"))&&(a="mdi:tablet"),{entityId:e,name:t.attributes.friendly_name??e,state:t.state,mediaTitle:t.attributes.media_title??null,icon:a}}).sort((i,a)=>{if(t)return e.indexOf(i.entityId)-e.indexOf(a.entityId);const r=e=>"playing"===e?0:"paused"===e?1:2;return r(i.state)-r(a.state)})}}_closePicker(){this._pickerItem=null,this._view=this._drilldown?"drilldown":this._searchQuery?"search":"library"}_toggleSpeakerSelection(e){const t=new Set(this._selectedSpeakers);t.has(e)?t.delete(e):t.add(e),this._selectedSpeakers=t}async _playOnSelectedSpeakers(){if(!this.hass||!this._pickerItem||0===this._selectedSpeakers.size)return;Je(this,"light");const e=this._pickerItem,t=e.uri??`spotify:${e.type}:${e.id}`,i=[...this._selectedSpeakers],a="track"===e.type?"music":"playlist"===e.type?"playlist":"album"===e.type?"music":"podcast";try{for(const e of i){const t=this.hass.states[e];if(!t)continue;const i=t.attributes.group_members;i&&i.length>1&&this._safeCallService("media_player","unjoin",{},{entity_id:e})}i.length>1&&await new Promise(e=>setTimeout(e,600));const r=i[0];if(this._safeCallService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:r}),i.length>1){const e=i.slice(1),s=this.hass.states[r];if(s&&!!(524288&s.attributes.supported_features))await new Promise(e=>setTimeout(e,800)),this._safeCallService("media_player","join",{group_members:e},{entity_id:r});else for(const i of e)this._safeCallService("media_player","play_media",{media_content_id:t,media_content_type:a},{entity_id:i})}"track"!==e.type&&"episode"!==e.type||!this._backend||this._seedRadioQueue(e)}catch{}this._closePicker()}async _seedRadioQueue(e){if(!this._backend)return;const t=++this._radioQueueVersion;try{if(await new Promise(e=>setTimeout(e,2e3)),!this._backend||t!==this._radioQueueVersion)return;const i=await this._backend.send("spotify_browse",{category:"recommendations",seed_tracks:[e.id],limit:20});if(t!==this._radioQueueVersion)return;const a=i?.tracks??[];me.emit("radio-queue-started",{count:a.length});let r=0;for(let e=0;e<a.length;e++){const i=a[e];if(!this._backend||t!==this._radioQueueVersion)break;const s=i.uri??`spotify:track:${i.id}`;try{await this._backend.send("spotify_add_to_queue",{uri:s}),r++,me.emit("radio-queue-track-added",{track:{id:i.id,name:i.name,uri:s,artist:dr(i)||void 0},index:e}),await new Promise(e=>setTimeout(e,150))}catch{break}}t===this._radioQueueVersion&&me.emit("radio-queue-complete",{total:r})}catch(i){t===this._radioQueueVersion&&me.emit("radio-queue-error",{message:i.message??"Unknown error"})}}async _loadMoreItems(e){if(!this._backend||this._loadingMore[e])return;this._loadingMore={...this._loadingMore,[e]:!0};const t=this._spotifyConfig.max_items_per_section;let i=0;"playlists"===e?i=this._playlists.length:"recently_played"===e?i=this._recentlyPlayed.length:"saved_tracks"===e?i=this._savedTracks.length:"saved_shows"===e&&(i=this._savedShows.length);try{const a=await this._backend.send("spotify_browse",{category:e,limit:t,offset:i,sort_order:this._spotifyConfig.sort_order}),r=(a?.items??[]).filter(Boolean);if("playlists"===e)this._playlists=[...this._playlists,...r];else if("recently_played"===e)this._recentlyPlayed=[...this._recentlyPlayed,...r];else if("saved_tracks"===e){this._savedTracks=[...this._savedTracks,...r];const e=r.map(e=>(e.track??e).id).filter(Boolean);e.length&&this._checkSavedStatus(e)}else"saved_shows"===e&&(this._savedShows=[...this._savedShows,...r.map(e=>e.show??e)]);null!=a?.total&&(this._sectionTotals={...this._sectionTotals,[e]:a.total})}catch(a){this._handleApiError(a)}finally{this._loadingMore={...this._loadingMore,[e]:!1}}}_renderLoadMore(e,t){const i=this._sectionTotals[e]??0;return t>=i?B:N`
      <button class="load-more-btn load-more" ?disabled=${this._loadingMore[e]} @click=${()=>this._loadMoreItems(e)}>
        ${Ne("spotify.load_more")}
        <span class="items-count">${Ne("spotify.items_count",{current:String(t),total:String(i)})}</span>
      </button>
    `}async _checkSavedStatus(e){const t=[...new Set(e)];if(t.length&&this._backend)try{const e=await this._backend.send("spotify_check_saved",{track_ids:t});if(!this.isConnected)return;const i=new Map(this._savedMap);for(const[t,a]of Object.entries(e??{}))i.set(t,a);this._savedMap=i}catch{}}async _toggleSaved(e){if(!this._backend)return;Je(this,"light");const t=this._savedMap.get(e)??!1,i=new Map(this._savedMap);i.set(e,!t),this._savedMap=i;try{t?await this._backend.send("spotify_remove_tracks",{track_ids:[e]}):await this._backend.send("spotify_save_tracks",{track_ids:[e]})}catch{const i=new Map(this._savedMap);i.set(e,t),this._savedMap=i}}_handleApiError(e){const t=e;"spotify_not_configured"===t.code?this._spotifyConfigured=!1:t.message?.includes("rate limit")||t.message?.includes("429")?this._error=Ne("spotify.error_rate_limit",{seconds:"30"}):this._error=Ne("spotify.error_api")}render(){if(this._lang,!this._configLoaded)return B;const e=this._getEntityId();if(!1===this._spotifyConfigured)return this._renderShell(N`
        <div class="setup-banner">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <div class="setup-banner-text">${Ne("spotify.not_configured")}</div>
          <a class="setup-link" href="/config/integrations/dashboard" target="_blank">
            ${Ne("spotify.open_config")}
          </a>
        </div>
      `);if(!e)return this._renderShell(N`
        <div class="setup-banner">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <div class="setup-banner-text">${Ne("spotify.no_entity")}</div>
          <a class="setup-link" href="/glass-cards" target="_blank">
            ${Ne("spotify.open_config")}
          </a>
        </div>
      `);const t="speaker_picker"===this._view&&this._pickerItem;return N`
      ${this._renderShell(N`
        ${this._error?N`<div class="error-banner">${this._error}</div>`:B}
        ${"drilldown"===this._view&&this._drilldown?this._renderDrilldown():N`
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
      ${t?this._renderSpeakerPicker():B}
    `}_renderShell(e){return N`
      <div class="spotify-card-wrap">
        ${this._spotifyConfig.show_header?N`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">${Ne("spotify.title")}</span>
            </div>
          </div>
        `:B}
        <div class="glass spotify-card">
          <div class="tint"></div>
          <div class="card-inner">${e}</div>
        </div>
      </div>
    `}_renderSearch(){return N`
      <div class="search-row">
        <div class="search-input-wrap">
          <div class="search-icon"><ha-icon .icon=${"mdi:magnify"}></ha-icon></div>
          <input
            class="search-input"
            type="text"
            placeholder=${Ne("spotify.search_placeholder")}
            .value=${this._searchQuery}
            @input=${this._onSearchInput}
            @focus=${()=>{this._foldOpen||(this._foldOpen=!0),this._scrollToTop()}}
          />
          <button
            class="search-clear ${this._searchQuery?"visible":""}"
            aria-label="${Ne("spotify.clear_search")}"
            @click=${this._clearSearch}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
          <button
            class="search-toggle ${this._foldOpen?"open":""}"
            aria-label=${Ne("spotify.toggle_library")}
            @click=${()=>{this._foldOpen=!this._foldOpen}}
          >
            <ha-icon .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
        </div>
      </div>
    `}_renderTabs(){return N`
      <div class="tab-bar">
        ${[{id:"all",labelKey:"spotify.tab_all",icon:"mdi:home"},{id:"tracks",labelKey:"spotify.tab_tracks",icon:"mdi:music-note"},{id:"playlists",labelKey:"spotify.tab_playlists",icon:"mdi:playlist-music"},{id:"podcasts",labelKey:"spotify.tab_podcasts",icon:"mdi:podcast"}].map(e=>N`
          <button
            class="tab-btn ${this._tab===e.id?"active":""}"
            aria-label=${Ne(e.labelKey)}
            @click=${()=>{this._tab=e.id,this._searchQuery&&(this._searchOffset=0,this._doSearch(!1))}}
          >
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${Ne(e.labelKey)}</span>
          </button>
        `)}
      </div>
    `}_renderLibrary(){if(this._libraryLoading)return N`<div class="loading-text">${Ne("spotify.loading")}</div>`;const e="all"===this._tab||"playlists"===this._tab,t="all"===this._tab||"tracks"===this._tab,i="all"===this._tab||"podcasts"===this._tab;return e&&this._playlists.length>0||t&&(this._recentlyPlayed.length>0||this._savedTracks.length>0)||i&&this._savedShows.length>0?N`
      ${e&&this._playlists.length>0?N`
        <div class="section-title">${Ne("spotify.my_playlists")}</div>
        <div class="playlist-scroll">
          ${this._playlists.map(e=>this._renderPlaylistCard(e))}
        </div>
        ${this._renderLoadMore("playlists",this._playlists.length)}
      `:B}

      ${t&&this._recentlyPlayed.length>0?N`
        <div class="section-title">${Ne("spotify.recently_played")}</div>
        ${this._recentlyPlayed.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
        ${this._renderLoadMore("recently_played",this._recentlyPlayed.length)}
      `:B}

      ${t&&this._savedTracks.length>0?N`
        <div class="section-title">${Ne("spotify.saved_tracks")}</div>
        ${this._savedTracks.map(e=>{const t=e.track??e;return this._renderResultRow(t,"track")})}
        ${this._renderLoadMore("saved_tracks",this._savedTracks.length)}
      `:B}

      ${i&&this._savedShows.length>0?N`
        <div class="section-title">${Ne("spotify.followed_podcasts")}</div>
        ${this._savedShows.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
        ${this._renderLoadMore("saved_shows",this._savedShows.length)}
      `:B}
    `:N`
        <div class="empty-state">
          <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
          <div class="empty-state-text">${Ne("spotify.no_content")}</div>
        </div>
      `}_renderPlaylistCard(e){const t=lr(e,160),i=e.tracks?.total??0;return N`
      <button
        class="playlist-card"
        aria-label=${e.name}
        @click=${()=>this._openDrilldown("playlist",e.id,e.name)}
      >
        <div class="playlist-art" style=${t?"":"background:#3040a0"}>
          ${t?N`<img src=${t} alt="" loading="lazy" />`:N`<ha-icon .icon=${"mdi:playlist-music"}></ha-icon>`}
          <div class="playlist-art-play"><ha-icon .icon=${"mdi:play"}></ha-icon></div>
        </div>
        <div class="playlist-name">${e.name}</div>
        ${i>0?N`<div class="playlist-count">${Ne("spotify.tracks_count",{count:String(i)})}</div>`:B}
      </button>
    `}_renderResultRow(e,t){if(!e)return B;const i=lr(e,64),a=dr(e)||(e.owner?.display_name??""),r="show"===t||"episode"===t,s=e.uri??`spotify:${e.type??t}:${e.id}`,o=this._isNowPlaying(s);return N`
      <div
        class="result-row ${o?"now-playing":""}"
        role="button"
        tabindex="0"
        @click=${()=>{"playlist"===t?this._openDrilldown("playlist",e.id,e.name):"album"===t?this._openDrilldown("album",e.id,e.name):this._openPicker(e)}}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.currentTarget.click())}}
      >
        <div class="result-art ${r?"round":""}">
          ${i?N`<img src=${i} alt="" loading="lazy" />`:N`<ha-icon .icon=${hr(t)}></ha-icon>`}
        </div>
        <div class="result-info">
          <div class="result-title">${e.name}</div>
          <div class="result-meta">
            <span class="result-type-badge">${Ne(function(e){switch(e){case"track":default:return"spotify.type_track";case"playlist":return"spotify.type_playlist";case"album":return"spotify.type_album";case"show":case"episode":return"spotify.type_podcast"}}(t))}</span>
            <span>${a}</span>
          </div>
        </div>
        ${"track"!==t&&"episode"!==t||!e.id?B:N`
          <button class="heart-btn ${this._savedMap.get(e.id)?"saved":""}"
                  aria-label="${this._savedMap.get(e.id)?Ne("spotify.remove_track"):Ne("spotify.save_track")}"
                  @click=${t=>{t.stopPropagation(),this._toggleSaved(e.id)}}>
            <ha-icon .icon="${this._savedMap.get(e.id)?"mdi:heart":"mdi:heart-outline"}"></ha-icon>
          </button>
        `}
        ${o?N`<div class="eq-bars"><span></span><span></span><span></span></div>`:N`
            <button
              class="result-play"
              aria-label=${Ne("spotify.play_aria",{name:e.name})}
              @click=${t=>{t.stopPropagation(),this._openPicker(e)}}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
            </button>
          `}
      </div>
    `}_renderSearchResults(){if(this._searchLoading&&0===this._searchOffset)return N`<div class="loading-text">${Ne("spotify.loading")}</div>`;const{tracks:e,playlists:t,shows:i}=this._searchResults,a=("all"===this._tab||"tracks"===this._tab)&&e.length>0,r=("all"===this._tab||"playlists"===this._tab)&&t.length>0,s=("all"===this._tab||"podcasts"===this._tab)&&i.length>0;return a||r||s?N`
      ${a?N`
        ${"all"===this._tab?N`<div class="section-title">${Ne("spotify.tab_tracks")}</div>`:B}
        ${e.map(e=>this._renderResultRow(e,"track"))}
      `:B}

      ${r?N`
        ${"all"===this._tab?N`<div class="section-title">${Ne("spotify.tab_playlists")}</div>`:B}
        ${t.map(e=>this._renderResultRow(e,"playlist"))}
      `:B}

      ${s?N`
        ${"all"===this._tab?N`<div class="section-title">${Ne("spotify.tab_podcasts")}</div>`:B}
        ${i.map(e=>this._renderResultRow({...e,type:"show"},"show"))}
      `:B}

      ${this._searchHasMore?N`
        <button class="load-more-btn" @click=${()=>this._doSearch(!0)} ?disabled=${this._searchLoading}>
          ${this._searchLoading?Ne("spotify.loading"):Ne("spotify.load_more")}
        </button>
      `:B}
    `:N`
        <div class="empty-state">
          <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
          <div class="empty-state-text">${Ne("spotify.no_results",{query:this._searchQuery})}</div>
        </div>
      `}_playFullDrilldown(){if(!this._drilldown)return;const e=this._drilldown,t=`spotify:${e.type}:${e.id}`;this._openPicker({id:e.id,name:e.title,type:e.type,uri:t})}_renderDrilldown(){const e=this._drilldown;return e?N`
      <div class="drilldown-header">
        <button class="back-btn" @click=${this._goBack}>
          <ha-icon .icon=${"mdi:arrow-left"}></ha-icon>
          ${Ne("spotify.back")}
        </button>
        <button class="play-all-btn" @click=${this._playFullDrilldown} aria-label=${Ne("spotify.play_all")}>
          <ha-icon .icon=${"mdi:play-circle"}></ha-icon>
          ${Ne("spotify.play_all")}
        </button>
      </div>
      <div class="section-title">${e.title}</div>
      <div class="content-area">
        ${e.items.map(e=>{const t=e.track??e;return this._renderResultRow(t,t.type??"track")})}
        ${e.loading?N`<div class="loading-text">${Ne("spotify.loading")}</div>`:B}
        ${!e.loading&&e.items.length<e.total?N`
          <button class="load-more-btn" ?disabled=${e.loading} @click=${this._loadMoreDrilldown}>
            ${Ne("spotify.load_more")}
          </button>
        `:B}
      </div>
    `:B}_renderSpeakerPicker(){const e=this._pickerItem;if(!e)return B;const t=lr(e,64),i=dr(e),a=this._selectedSpeakers.size>0;return N`
      <div class="picker-backdrop visible" role="presentation" @click=${e=>{e.target.classList.contains("picker-backdrop")&&this._closePicker()}}>
        <div class="glass speaker-picker">
          <div class="picker-header">
            <div class="picker-title">${Ne("spotify.play_on")}</div>
            <button class="picker-close" aria-label="${Ne("common.close")}" @click=${this._closePicker}>
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>

          <div class="picker-track">
            <div class="picker-track-art">
              ${t?N`<img src=${t} alt="" />`:N`<ha-icon .icon=${hr(e.type??"track")}></ha-icon>`}
            </div>
            <div class="picker-track-info">
              <div class="picker-track-title">${e.name}</div>
              ${i?N`<div class="picker-track-artist">${i}</div>`:B}
            </div>
          </div>

          <div class="picker-speakers">
            ${this._speakers.map(e=>{const t=this._selectedSpeakers.has(e.entityId);return N`
                <button class="picker-speaker ${t?"selected":""}" @click=${()=>this._toggleSpeakerSelection(e.entityId)}>
                  <div class="picker-speaker-icon">
                    <ha-icon .icon=${e.icon}></ha-icon>
                  </div>
                  <div class="picker-speaker-name">${e.name}</div>
                  <div class="picker-speaker-status ${"playing"===e.state?"playing":""}">
                    ${"playing"===e.state&&e.mediaTitle?e.mediaTitle:"paused"===e.state?Ne("spotify.paused"):Ne("spotify.available")}
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
              aria-label=${Ne("spotify.play")}
            >
              <ha-icon .icon=${"mdi:play"}></ha-icon>
              ${Ne("spotify.play")}${a?` (${this._selectedSpeakers.size})`:""}
            </button>
          </div>
        </div>
      </div>
    `}}cr([ue()],pr.prototype,"_view"),cr([ue()],pr.prototype,"_tab"),cr([ue()],pr.prototype,"_searchQuery"),cr([ue()],pr.prototype,"_playlists"),cr([ue()],pr.prototype,"_recentlyPlayed"),cr([ue()],pr.prototype,"_savedTracks"),cr([ue()],pr.prototype,"_savedShows"),cr([ue()],pr.prototype,"_searchResults"),cr([ue()],pr.prototype,"_searchLoading"),cr([ue()],pr.prototype,"_searchOffset"),cr([ue()],pr.prototype,"_searchHasMore"),cr([ue()],pr.prototype,"_drilldown"),cr([ue()],pr.prototype,"_speakers"),cr([ue()],pr.prototype,"_pickerItem"),cr([ue()],pr.prototype,"_selectedSpeakers"),cr([ue()],pr.prototype,"_error"),cr([ue()],pr.prototype,"_libraryLoading"),cr([ue()],pr.prototype,"_spotifyConfigured"),cr([ue()],pr.prototype,"_foldOpen"),cr([ue()],pr.prototype,"_savedMap"),cr([ue()],pr.prototype,"_sectionTotals"),cr([ue()],pr.prototype,"_loadingMore");try{customElements.define("glass-spotify-card",pr)}catch{}Ye("glass-camera-carousel-card-editor");var ur=Object.defineProperty,gr=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ur(t,i,s),s};const _r=1,mr="mdi:cctv",fr="mdi:webcam",vr="mdi:doorbell-video",br={person:"mdi:human",vehicle:"mdi:car",pet:"mdi:dog",animal:"mdi:paw",package:"mdi:package-variant",face:"mdi:face-recognition",baby_crying:"mdi:baby-face-outline",bicycle:"mdi:bicycle"},yr={motion:/_(motion|mouvement)$/,record:/_(record|enregistrer)$/,siren:/^siren\./,floodlight:/_(floodlight|projecteur)$/,auto_tracking:/_(auto_tracking|suivi_automatique)$/},wr=[[/_person(ne)?$/,"person"],[/_vehicu?le$/,"vehicle"],[/_pet$|_animal_domestique$/,"pet"],[/_animal$/,"animal"],[/_face$|_visage$/,"face"],[/_package$|_colis$/,"package"],[/_baby_crying$|_pleur_bebe$/,"baby_crying"],[/_bicycl?e$|_velo$/,"bicycle"]],xr=new Map;function kr(e,t,i){const a=i[e];if(!a?.device_id)return{motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};const r=a.device_id;let s=r;for(const l of Object.keys(i))i[l].device_id===r&&l.startsWith("binary_sensor.")&&t[l]&&(s+=`:${l}=${t[l].state}`);const o=xr.get(e);if(o&&o.key===s)return o.result;const n=[];for(const[l,d]of Object.entries(i))d.device_id===r&&n.push(l);const c={motionSensorId:null,recordSwitchId:null,sirenId:null,floodlightId:null,autoTrackId:null,aiDetected:[]};for(const l of n){const e=t[l];if(e&&(l.startsWith("binary_sensor.")&&yr.motion.test(l)&&(c.motionSensorId=l),l.startsWith("switch.")&&yr.record.test(l)&&(c.recordSwitchId=l),yr.siren.test(l)&&(c.sirenId=l),l.startsWith("light.")&&yr.floodlight.test(l)&&(c.floodlightId=l),l.startsWith("switch.")&&yr.auto_tracking.test(l)&&(c.autoTrackId=l),l.startsWith("binary_sensor.")&&"on"===e.state))for(const[t,i]of wr)t.test(l)&&!c.aiDetected.includes(i)&&c.aiDetected.push(i)}return xr.set(e,{key:s,result:c}),c}function $r(e){const t=e.attributes?.icon;if(t)return t;const i=e.entity_id;return i.includes("doorbell")?vr:i.includes("indoor")||i.includes("salon")||i.includes("chambre")?fr:mr}class Sr extends Qe{constructor(){super(...arguments),this._carouselIndex=0,this._liveIds=new Set,this._foldOpen=!1,this._camConfig=null,this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._touchStartX=0,this._touchDelta=0,this._isSwiping=!1,this._trackEl=null,this._cachedCameraIds=[],this._cachedCamerasKey="",this._onPointerDown=e=>{if(e.target.closest(".carousel-nav"))return;this._touchStartX=e.clientX,this._touchDelta=0,this._isSwiping=!0;e.currentTarget.setPointerCapture(e.pointerId),this._trackEl=this.shadowRoot?.querySelector(".carousel-track"),this._trackEl&&(this._trackEl.style.transition="none")},this._onPointerMove=e=>{if(!this._isSwiping)return;const t=this._trackEl??this.shadowRoot?.querySelector(".carousel-track");if(!t)return;this._trackEl=t,this._touchDelta=e.clientX-this._touchStartX;const i=e.currentTarget.offsetWidth,a=100*this._carouselIndex,r=this._touchDelta/i*100;this._trackEl.style.transform=`translateX(${-a+r}%)`},this._onPointerUp=e=>{if(!this._isSwiping||!this._trackEl)return;this._isSwiping=!1,this._trackEl.style.transition="";const t=.2*e.currentTarget.offsetWidth;this._touchDelta<-t?this._goTo(this._carouselIndex+1):this._touchDelta>t?this._goTo(this._carouselIndex-1):this._goTo(this._carouselIndex),this._trackEl=null},this._onPointerCancel=()=>{this._isSwiping&&this._trackEl&&(this._isSwiping=!1,this._trackEl.style.transition="",this._goTo(this._carouselIndex),this._trackEl=null)}}static getConfigElement(){return document.createElement("glass-camera-carousel-card-editor")}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("camera-carousel-config-changed",()=>{this._configLoaded=!1,this._loadConfig()}),this._listen("dashboard-config-changed",()=>this.requestUpdate()),this._timestampTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._clearCycleTimer(),this._clearTimestampTimer(),xr.clear()}getTrackedEntityIds(){if(!this.hass)return[];const e=this.hass;return this._getCameraIds().flatMap(t=>{const i=kr(t,e.states,e.entities);return[t,i.motionSensorId,i.recordSwitchId,i.sirenId,i.floodlightId,i.autoTrackId].filter(Boolean)})}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection===this.hass.connection||(this._backend=new at(this.hass))),this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._carouselIndex=0,this._cachedCamerasKey="",this._configLoaded=!1,this._liveIds=new Set),this._configLoaded||this._configLoading||this._loadConfig()}async _loadConfig(){if(!this._backend||this._configLoading)return;this._configLoading=!0;const e=++this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;this._camConfig=t.camera_carousel||{show_header:!0,entity_order:[],auto_cycle:!1,cycle_interval:10},this._configLoaded=!0,this._setupCycleTimer(),this.requestUpdate()}catch{}finally{this._configLoading=!1}}_getCameraIds(){if(!this.hass)return[];let e;e=this.areaId?et(this.areaId,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("camera.")).map(e=>e.entity_id):Object.keys(this.hass.states).filter(e=>e.startsWith("camera."));const t=e.length+":"+e.map(e=>{const t=this.hass?.states[e];return t?`${e}:${t.last_changed}`:e}).join(",");if(t===this._cachedCamerasKey)return this._cachedCameraIds;const i=this._camConfig?.entity_order??[];if(i.length){const t=i.filter(t=>e.includes(t)),a=e.filter(e=>!t.includes(e));if(!this.areaId){const e=this.hass.states,t=this.hass.entities;a.sort((i,a)=>this._latestAlertTimestamp(a,e,t)-this._latestAlertTimestamp(i,e,t))}e=[...t,...a]}else if(!this.areaId){const t=this.hass.states,i=this.hass.entities;e.sort((e,a)=>this._latestAlertTimestamp(a,t,i)-this._latestAlertTimestamp(e,t,i))}return this._cachedCamerasKey=t,this._cachedCameraIds=e,this._carouselIndex>=e.length&&(this._carouselIndex=Math.max(0,e.length-1)),this._cachedCameraIds}_latestAlertTimestamp(e,t,i){const a=i[e];if(!a?.device_id)return 0;const r=a.device_id;let s=0;for(const[o,n]of Object.entries(i)){if(n.device_id!==r||!o.startsWith("binary_sensor."))continue;if(!wr.some(([e])=>e.test(o)))continue;const e=t[o];if(!e)continue;const i=new Date(e.last_changed).getTime();i>s&&(s=i)}return s}_getCameraInfo(e){if(!this.hass)return null;const t=this.hass.states[e];if(!t)return null;const i=t.attributes?.supported_features??0,a="unavailable"!==t.state&&!1!==t.attributes?.is_on,r=kr(e,this.hass.states,this.hass.entities);return{entityId:e,entity:t,name:t.attributes?.friendly_name||e.split(".")[1],state:t.state,isOn:a,features:i,entityPicture:t.attributes?.entity_picture??null,motionSensorId:r.motionSensorId,motionDetectionSupported:void 0!==t.attributes?.motion_detection,motionDetectionEnabled:!0===t.attributes?.motion_detection,hasMotion:!!r.motionSensorId&&"on"===this.hass.states[r.motionSensorId]?.state,recordSwitchId:r.recordSwitchId,isRecording:"recording"===t.state||!!r.recordSwitchId&&"on"===this.hass.states[r.recordSwitchId]?.state,sirenId:r.sirenId,floodlightId:r.floodlightId,autoTrackId:r.autoTrackId,aiDetected:r.aiDetected,icon:$r(t)}}_setupCycleTimer(){if(this._clearCycleTimer(),this._camConfig?.auto_cycle&&this._getCameraIds().length>1){const e=1e3*(this._camConfig.cycle_interval||10);this._cycleTimer=setInterval(()=>{if(this._isSwiping)return;const e=this._getCameraIds();e.length>1&&(this._carouselIndex=(this._carouselIndex+1)%e.length,this.requestUpdate())},e)}}_clearCycleTimer(){this._cycleTimer&&(clearInterval(this._cycleTimer),this._cycleTimer=void 0)}_clearTimestampTimer(){this._timestampTimer&&(clearInterval(this._timestampTimer),this._timestampTimer=void 0)}_goTo(e){const t=this._getCameraIds();t.length&&(this._carouselIndex=(e%t.length+t.length)%t.length,this._foldOpen=!1,this._setupCycleTimer(),this.requestUpdate())}_prev(){this._goTo(this._carouselIndex-1)}_next(){this._goTo(this._carouselIndex+1)}_togglePower(e){if(!this.hass)return;const t=e.isOn?"turn_off":"turn_on";this._safeCallService("camera",t,{entity_id:e.entityId})}_snapshot(e){if(!this.hass)return;const t=new CustomEvent("hass-more-info",{detail:{entityId:e.entityId},bubbles:!0,composed:!0});this.dispatchEvent(t)}_toggleRecord(e){if(!this.hass||!e.recordSwitchId)return;const t="on"===this.hass.states[e.recordSwitchId]?.state;this._safeCallService("switch",t?"turn_off":"turn_on",{entity_id:e.recordSwitchId})}_toggleMotion(e){if(!this.hass)return;const t=e.motionDetectionEnabled?"disable_motion_detection":"enable_motion_detection";this._safeCallService("camera",t,{entity_id:e.entityId})}_toggleSiren(e){if(!this.hass||!e.sirenId)return;const t="on"===this.hass.states[e.sirenId]?.state;this._safeCallService("siren",t?"turn_off":"turn_on",{entity_id:e.sirenId})}_toggleFloodlight(e){if(!this.hass||!e.floodlightId)return;const t="on"===this.hass.states[e.floodlightId]?.state;this._safeCallService("light",t?"turn_off":"turn_on",{entity_id:e.floodlightId})}_toggleAutoTrack(e){if(!this.hass||!e.autoTrackId)return;const t="on"===this.hass.states[e.autoTrackId]?.state;this._safeCallService("switch",t?"turn_off":"turn_on",{entity_id:e.autoTrackId})}_startStream(e){const t=new Set(this._liveIds);t.add(e),this._liveIds=t}render(){if(this._lang,!this.hass)return B;const e=this._getCameraIds();if(!e.length)return B;const t=!1!==this._camConfig?.show_header,i=this._getCameraInfo(e[this._carouselIndex]),a=this._bindGesture({onTap:()=>{},onLongPress:()=>{this._isSwiping=!1,this._trackEl=null,this._foldOpen=!this._foldOpen},exclude:".carousel-nav"});return N`
      ${t?N`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${Ne("camera.title")}</span>
          </div>
        </div>
      `:B}
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
          ${e.length>1?N`
            <button class="carousel-nav prev" aria-label="${Ne("camera.prev_aria")}" @click=${this._prev}>
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <button class="carousel-nav next" aria-label="${Ne("camera.next_aria")}" @click=${this._next}>
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          `:B}
          ${e.length>1?N`
            <div class="carousel-dots">
              ${e.map((e,t)=>this._renderDot(e,t))}
            </div>
          `:B}
        </div>

        <!-- Connected fold -->
        <div class="ctrl-fold ${this._foldOpen?"open":""}">
          <div class="ctrl-fold-inner">
            <div class="fold-sep-top"></div>
            <div class="fold-panel">
              ${i?this._renderInfoBar(i):B}
              ${i?this._renderActions(i):B}
            </div>
          </div>
        </div>
      </div>
    `}_tintStyle(e){if(!e||!e.isOn||"idle"===e.state)return"opacity:0";return`background:radial-gradient(ellipse at 50% 50%,${e.aiDetected.length>0?"var(--c-warning)":"var(--cam-color)"},transparent 70%);opacity:0.12`}_renderSlide(e,t){const i=this._getCameraInfo(e);if(!i)return N`<div class="carousel-slide"><div class="carousel-slide-inner off-feed"></div></div>`;const a=this._liveIds.has(e)||"streaming"===i.state||"recording"===i.state,r=i.isOn&&a&&t,s=i.isOn?a?"active-feed":"idle-feed":"off-feed";return N`
      <div class="carousel-slide">
        <div class="carousel-slide-inner ${s}">
          ${r&&this.hass?N`
            <ha-camera-stream
              .hass=${this.hass}
              .stateObj=${i.entity}
              .controls=${!1}
              .muted=${!0}
              class="cam-stream"
            ></ha-camera-stream>
          `:i.entityPicture&&i.isOn?N`
            <img class="cam-thumbnail" src="${i.entityPicture}" alt="${i.name}" />
          `:B}
          ${i.isOn?N`
            <div class="stream-overlay-top">
              <div class="stream-cam-name">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:12px"></ha-icon>
                <span>${i.name}</span>
                ${i.isRecording?N`
                  <span class="rec-indicator">
                    <span class="rec-circle"></span> REC
                  </span>
                `:B}
              </div>
              <div class="stream-time">${(new Date).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}</div>
            </div>
            <div class="stream-overlay-bottom">
              ${i.aiDetected.length>0?N`
                <div class="stream-ai-tags">
                  ${i.aiDetected.map(e=>N`
                    <div class="stream-ai-tag">
                      <ha-icon .icon=${br[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                      ${Ne(`camera.ai_${e}`)}
                    </div>
                  `)}
                </div>
              `:N`<div></div>`}
            </div>
            ${a?B:N`
              <button class="stream-placeholder" @click=${t=>{t.stopPropagation(),this._startStream(e)}}
                aria-label="${Ne("camera.tap_to_stream")}">
                <ha-icon .icon=${i.icon} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
                <span>${Ne("camera.tap_to_stream")}</span>
              </button>
            `}
          `:N`
            <div class="stream-placeholder">
              <ha-icon .icon=${"mdi:camera-off"} style="--mdc-icon-size:36px;color:var(--t4)"></ha-icon>
              <span>${Ne("camera.camera_off")}</span>
            </div>
          `}
        </div>
      </div>
    `}_renderDot(e,t){const i=this._getCameraInfo(e);let a="carousel-dot-btn";return t===this._carouselIndex&&(a+=" active"),i?.aiDetected.length&&(a+=" motion-dot"),N`
      <button class="${a}"
        aria-label="${Ne("camera.dot_aria",{name:i?.name||""})}"
        @click=${()=>this._goTo(t)}
      ></button>
    `}_renderInfoBar(e){const t=e.isOn&&"idle"!==e.state;return N`
      <div class="carousel-info">
        <div class="carousel-cam-icon ${t?"on":""}">
          <ha-icon .icon=${e.icon} style="--mdc-icon-size:16px"></ha-icon>
        </div>
        <div class="carousel-info-text">
          <div class="carousel-cam-name">${De(e.name,Ee)}</div>
          <div class="carousel-cam-sub">
            <span class="carousel-state ${t?"live":""}">${function(e,t){if(!t)return Ne("camera.off");switch(e){case"idle":return Ne("camera.idle");case"streaming":return Ne("camera.streaming");case"recording":return Ne("camera.recording");default:return e}}(e.state,e.isOn)}</span>
            ${e.aiDetected.length>0&&e.isOn?N`
              <div class="carousel-ai-mini">
                ${e.aiDetected.map(e=>N`
                  <div class="ai-badge active">
                    <ha-icon .icon=${br[e]||"mdi:eye"} style="--mdc-icon-size:10px"></ha-icon>
                  </div>
                `)}
              </div>
            `:B}
          </div>
        </div>
      </div>
    `}_renderActions(e){if(!e.isOn)return N`
        <div class="carousel-actions">
          <button class="action-btn" @click=${()=>this._togglePower(e)} aria-label="${Ne("camera.power_on")}">
            <ha-icon .icon=${"mdi:power"} style="--mdc-icon-size:14px"></ha-icon>
            ${Ne("camera.power_on")}
          </button>
        </div>
      `;const t=0!==(e.features&_r),i=!!e.sirenId&&"on"===this.hass?.states[e.sirenId]?.state,a=!!e.floodlightId&&"on"===this.hass?.states[e.floodlightId]?.state,r=!!e.autoTrackId&&"on"===this.hass?.states[e.autoTrackId]?.state;return N`
      <div class="carousel-actions">
        ${t?N`
          <button class="action-btn active" @click=${()=>this._togglePower(e)} aria-label="${Ne("camera.power_off")}">
            <ha-icon .icon=${"mdi:power"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:B}
        <button class="action-btn" @click=${()=>this._snapshot(e)} aria-label="${Ne("camera.snapshot")}">
          <ha-icon .icon=${"mdi:camera"} style="--mdc-icon-size:14px"></ha-icon>
          ${Ne("camera.snapshot")}
        </button>
        ${e.recordSwitchId?N`
          <button class="action-btn ${e.isRecording?"active-alert":""}" @click=${()=>this._toggleRecord(e)}
            aria-label="${e.isRecording?Ne("camera.record_stop"):Ne("camera.record_start")}">
            <ha-icon .icon=${e.isRecording?"mdi:record-circle":"mdi:record"} style="--mdc-icon-size:14px"></ha-icon>
            ${e.isRecording?Ne("camera.record_stop"):Ne("camera.record_start")}
          </button>
        `:B}
        ${e.motionDetectionSupported?N`
          <button class="action-btn ${e.motionDetectionEnabled?"active":""}" @click=${()=>this._toggleMotion(e)}
            aria-label="${e.motionDetectionEnabled?Ne("camera.motion_on_aria"):Ne("camera.motion_off_aria")}">
            <ha-icon .icon=${e.motionDetectionEnabled?"mdi:motion-sensor":"mdi:motion-sensor-off"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:B}
        ${e.sirenId?N`
          <button class="action-btn ${i?"active-alert":""}" @click=${()=>this._toggleSiren(e)}
            aria-label="${Ne("camera.siren_aria")}">
            <ha-icon .icon=${"mdi:bullhorn"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:B}
        ${e.floodlightId?N`
          <button class="action-btn ${a?"active-warning":""}" @click=${()=>this._toggleFloodlight(e)}
            aria-label="${Ne("camera.floodlight_aria")}">
            <ha-icon .icon=${a?"mdi:flashlight":"mdi:flashlight-off"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:B}
        ${e.autoTrackId?N`
          <button class="action-btn ${r?"active":""}" @click=${()=>this._toggleAutoTrack(e)}
            aria-label="${Ne("camera.auto_track_aria")}">
            <ha-icon .icon=${"mdi:target-account"} style="--mdc-icon-size:14px"></ha-icon>
          </button>
        `:B}
      </div>
    `}static{this.styles=[$e,Se,Ce,Te,Ie,ze,s`
      :host {
        width: 100%;
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
    `]}}gr([pe()],Sr.prototype,"areaId"),gr([ue()],Sr.prototype,"_carouselIndex"),gr([ue()],Sr.prototype,"_liveIds"),gr([ue()],Sr.prototype,"_foldOpen");try{customElements.define("glass-camera-carousel-card",Sr)}catch{}Ye("glass-title-card-editor");var Cr=Object.defineProperty,Ir=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Cr(t,i,s),s};const Er={success:{text:"var(--c-success)",dot:"var(--c-success)",glow:"rgba(74,222,128,0.5)"},warning:{text:"var(--c-warning)",dot:"var(--c-warning)",glow:"rgba(251,191,36,0.5)"},info:{text:"var(--c-info)",dot:"var(--c-info)",glow:"rgba(96,165,250,0.5)"},accent:{text:"var(--c-accent)",dot:"var(--c-accent)",glow:"rgba(129,140,248,0.5)"},alert:{text:"var(--c-alert)",dot:"var(--c-alert)",glow:"rgba(248,113,113,0.5)"},neutral:{text:"var(--t3)",dot:"var(--t4)",glow:"none"}},Dr={input_select:"title_card.group_mode",scenes:"title_card.group_scenes",booleans:"title_card.group_toggles"};function zr(e){if(Er[e])return Er[e];if(e.startsWith("#")&&7===e.length){const t=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16);return{text:e,dot:e,glow:`rgba(${t},${i},${a},0.5)`}}return Er.neutral}const Pr={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},Tr={icon:"mdi:clock-outline",color:"var(--t3)"};class Lr extends Qe{constructor(){super(...arguments),this._foldOpen=!1,this._activatingSceneId=null,this._titleConfig={title:"",sources:[],period_entity:"",period_options:[]},this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._sceneTimeout=0,this._boundClickOutside=this._onClickOutside.bind(this)}static getConfigElement(){return document.createElement("glass-title-card-editor")}getCardSize(){return 2}get _periodEntityId(){return this._titleConfig.period_entity||"input_select.periode_journee"}_getPeriodVisual(e){const t=Pr[e]||Tr,i=this._titleConfig.period_options.find(t=>t.id===e);if(!i)return t;const a=i.color?.startsWith("#");return{icon:i.icon||t.icon,color:a?i.color:t.color}}static{this.styles=[$e,Se,ze,s`
    :host {
      width: 100%;
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
  `]}connectedCallback(){super.connectedCallback(),this._listen("title-config-changed",()=>this._loadConfig()),document.addEventListener("click",this._boundClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundClickOutside),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++,this._sceneTimeout&&(clearTimeout(this._sceneTimeout),this._sceneTimeout=0)}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++),this._configLoaded||this._configLoading||(this._configLoading=!0,this._backend=new at(this.hass),this._loadConfig()))}getTrackedEntityIds(){const e=[this._periodEntityId];for(const t of this._titleConfig.sources)if("input_select"===t.source_type&&t.entity)e.push(t.entity);else for(const i of t.modes)i.id.includes(".")&&e.push(i.id);return e}async _loadConfig(){if(!this._backend)return;const e=this._loadVersion;try{const t=await this._backend.send("get_config");if(e!==this._loadVersion)return;t?.title_card&&(this._titleConfig=t.title_card),this._configLoaded=!0,this._configLoading=!1,this.requestUpdate()}catch{e===this._loadVersion&&(this._configLoading=!1)}}_dashStyle(e){if(0===e.length)return"";const t=e.map(e=>zr(e)),i="width:"+Math.min(20+4*e.length,36)+"px";if(1===t.length)return`background:${t[0].dot};box-shadow:0 0 8px ${t[0].glow};${i}`;const a=t.length,r=t.flatMap((e,t)=>[`${e.dot} ${Math.round(t/a*100)}%`,`${e.dot} ${Math.round((t+1)/a*100)}%`]).join(", "),s=t.filter(e=>"none"!==e.glow);return`background:linear-gradient(90deg, ${r});box-shadow:${s.length>0?s.map(e=>`0 0 6px ${e.glow}`).join(", "):"none"};${i}`}_getActiveColors(e){if("input_select"===e.source_type){if(!e.entity||!this.hass)return[];const t=this.hass.states[e.entity];if(!t)return[];const i=e.modes.find(e=>e.id===t.state),a=i?.color||"neutral";return"neutral"!==a?[a]:[]}if("booleans"===e.source_type){if(!this.hass)return[];const t=[];for(const i of e.modes)if("on"===this.hass.states[i.id]?.state){const e=i.color||"success";"neutral"!==e&&t.push(e)}return t}if(this._activatingSceneId){const t=e.modes.find(e=>e.id===this._activatingSceneId);if(t)return[t.color||"accent"]}return[]}_isChipActive(e,t,i){return"input_select"===e.source_type?!(!e.entity||!this.hass)&&this.hass.states[e.entity]?.state===t.id:"booleans"===e.source_type?"on"===this.hass?.states[t.id]?.state:"scenes"===e.source_type&&this._activatingSceneId===t.id}_selectOption(e,t){e.entity&&this.hass&&this._safeCallService("input_select","select_option",{option:t},{entity_id:e.entity})}_activateScene(e){this.hass&&(Je(this,"light"),this._safeCallService("scene","turn_on",{},{entity_id:e}),this._activatingSceneId=e,this._sceneTimeout&&clearTimeout(this._sceneTimeout),this._sceneTimeout=window.setTimeout(()=>{this._activatingSceneId=null,this._sceneTimeout=0},2e3),this.updateComplete.then(()=>{const t=this.shadowRoot?.querySelector(`.chip[data-id="${e}"]`);t&&(t.classList.add("pulsing"),setTimeout(()=>t.classList.remove("pulsing"),600))}))}_toggleBoolean(e){this.hass&&this._safeCallService("input_boolean","toggle",{},{entity_id:e})}_toggleFold(){this._foldOpen=!this._foldOpen}_onClickOutside(e){if(!this._foldOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelector(".dash-trigger"),r=i.querySelector(".fold-section");a&&r&&!t.includes(a)&&!t.includes(r)&&(this._foldOpen=!1)}render(){this._lang;const e=this._titleConfig.title||(this.configPreview?Ne("config.title_title_placeholder"):"");if(!e)return this.style.display="none",B;this.style.display="";const t=this._titleConfig.sources,i=t.length>0&&t.some(e=>e.modes.length>0),a=[];if(i)for(const s of t)a.push(...this._getActiveColors(s));const r=a.length>0?this._dashStyle(a):"";return N`
      <div class="title-card">
        <div class="title-text">${e}</div>
        ${this._renderPeriodIndicator()}
        ${i?N`
          <button
            class="dash-trigger"
            @click=${()=>this._toggleFold()}
            aria-label=${Ne("title_card.toggle_modes_aria")}
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
        `:B}
      </div>
    `}_renderPeriodIndicator(){if(!this.hass)return B;const e=this.hass.states[this._periodEntityId];if(!e)return B;const t=e.attributes?.options??[];if(0===t.length)return B;const i=e.state,a=t.indexOf(i);if(-1===a)return N`<div class="period-indicator"></div>`;const r=zr(this._getPeriodVisual(i).color);return N`
      <div class="period-indicator" aria-live="polite" aria-label="${i}">
        ${t.map((e,t)=>{const i=this._getPeriodPos(t,a),s=this._getPeriodVisual(e);return N`
            <div class="period-item ${i}"
              style="${"pos-center"===i?`color:${r.text}`:""}">
              <ha-icon .icon=${s.icon} style="--mdc-icon-size:9px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${e}
            </div>
          `})}
      </div>
    `}_getPeriodPos(e,t){const i=e-t;return i<=-2?"pos-far-left":-1===i?"pos-left":0===i?"pos-center":1===i?"pos-right":"pos-far-right"}_renderSourceGroup(e,t,i){if(0===e.modes.length)return B;const a=Dr[e.source_type],r=e.label||(a?Ne(a):e.source_type);return N`
      <div class="chips-group">
        ${i?N`<div class="chips-group-label">${r}</div>`:B}
        <div class="chips-row">
          ${e.modes.map((t,i)=>{const a=this._isChipActive(e,t,i),r=zr(t.color||"neutral");return N`
              <button
                class="chip"
                data-id=${t.id}
                style="${a?`color:${r.text};background:${r.dot}14;border-color:${r.dot}33;`:""}"
                aria-label=${t.label||t.id}
                @click=${a=>{a.stopPropagation(),this._onChipClick(e,t,i)}}
              >
                ${t.icon?N`<ha-icon .icon=${t.icon}></ha-icon>`:B}
                ${t.label||t.id.split(".")[1]||t.id}
              </button>
            `})}
        </div>
      </div>
    `}_onChipClick(e,t,i){"input_select"===e.source_type?this._selectOption(e,t.id):"scenes"===e.source_type?this._activateScene(t.id):"booleans"===e.source_type&&this._toggleBoolean(t.id)}}Ir([ue()],Lr.prototype,"_foldOpen"),Ir([ue()],Lr.prototype,"_activatingSceneId");try{customElements.define("glass-title-card",Lr)}catch{}}();
