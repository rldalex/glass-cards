!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let r=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(a,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:s,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,_=globalThis,m=_.trustedTypes,u=m?m.emptyScript:"",g=_.reactiveElementPolyfillSupport,v=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},b=(e,t)=>!s(e,t),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const o=a?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...l(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),r=e.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=a;const o=r.fromAttribute(t,e.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const o=this.constructor;if(!1===a&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??b)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+D,P=`<${C}>`,z=document,I=()=>z.createComment(""),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,H=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,L=/"/g,V=/^(?:script|style|textarea|title)$/i,q=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),W=q(1),U=q(2),K=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),F=new WeakMap,Y=z.createTreeWalker(z,129);function G(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class X{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,o=0;const n=e.length-1,s=this.parts,[c,d]=((e,t)=>{const i=e.length-1,a=[];let r,o=2===t?"<svg>":3===t?"<math>":"",n=T;for(let s=0;s<i;s++){const t=e[s];let i,c,d=-1,l=0;for(;l<t.length&&(n.lastIndex=l,c=n.exec(t),null!==c);)l=n.lastIndex,n===T?"!--"===c[1]?n=M:void 0!==c[1]?n=H:void 0!==c[2]?(V.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=r??T,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,i=c[1],n=void 0===c[3]?j:'"'===c[3]?L:N):n===L||n===N?n=j:n===M||n===H?n=T:(n=j,r=void 0);const p=n===j&&e[s+1].startsWith("/>")?" ":"";o+=n===T?t+P:d>=0?(a.push(i),t.slice(0,d)+E+t.slice(d)+D+p):t+D+(-2===d?s:p)}return[G(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=X.createElement(c,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=Y.nextNode())&&s.length<n;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=d[o++],i=a.getAttribute(e).split(D),n=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?te:"?"===n[1]?ie:"@"===n[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(D)&&(s.push({type:6,index:r}),a.removeAttribute(e));if(V.test(a.tagName)){const e=a.textContent.split(D),t=e.length-1;if(t>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],I()),Y.nextNode(),s.push({type:2,index:++r});a.append(e[t],I())}}}else if(8===a.nodeType)if(a.data===C)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(D,e+1));)s.push({type:7,index:r}),e+=D.length-1}r++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,a){if(t===K)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const o=A(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=J(e,r._$AS(e,t.values),r,a)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??z).importNode(t,!0);Y.currentNode=a;let r=Y.nextNode(),o=0,n=0,s=i[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new Q(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new re(r,this,e)),this._$AV.push(t),s=i[++n]}o!==s?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=z,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),A(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&A(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Z(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new X(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new Q(this.O(I()),this.O(I()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(e,t=this,i,a){const r=this.strings;let o=!1;if(void 0===r)e=J(this,e,t,0),o=!A(e)||e!==this._$AH&&e!==K,o&&(this._$AH=e);else{const a=e;let n,s;for(e=r[0],n=0;n<r.length-1;n++)s=J(this,a[i+n],t,n),s===K&&(s=this._$AH[n]),o||=!A(s)||s!==this._$AH[n],s===B?e=B:e!==B&&(e+=(s??"")+r[n+1]),this._$AH[n]=s}o&&!a&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class ae extends ee{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??B)===K)return;const i=this._$AH,a=e===B&&i!==B||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==B&&(i===B||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=x.litHtmlPolyfillSupport;oe?.(X,Q),(x.litHtmlVersions??=[]).push("3.3.2");const ne=globalThis;class se extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new Q(t.insertBefore(I(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}se._$litElement$=!0,se.finalized=!0,ne.litElementHydrateSupport?.({LitElement:se});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:se}),(ne.litElementVersions??=[]).push("4.2.2");const de=[o`
      *, *::before, *::after {
        box-sizing: border-box;
      }
      :host {
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
        max-width: 27.5rem;
        margin: 0 auto;
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

      /* ── Banner ── */
      .banner {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.625rem 0.875rem;
        border-radius: var(--radius-lg);
        font-size: var(--fz-base);
        font-weight: 500;
        margin-bottom: 0.875rem;
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
        gap: 0.625rem;
        padding: 0.5rem 0.625rem;
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
        border-color: var(--c-accent);
        background: rgba(var(--rgb-accent), 0.06);
      }
      .item-row .feature-icon ha-icon { --mdc-icon-size: 1rem; }

      .card-row {
        padding: 0.625rem;
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
        gap: 0.0625rem;
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
        padding: 0.375rem 0.625rem;
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
        padding: 0.375rem 0.625rem;
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
        width: 2.375rem;
        height: 1.25rem;
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
        top: 0.125rem;
        left: 0.125rem;
        width: 0.875rem;
        height: 0.875rem;
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
        transform: translateX(18px);
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
        transition: all var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      .btn-icon.sm { width: 2rem; height: 2rem; border-radius: var(--radius-md); }
      .btn-icon.xs { width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm); }
      .btn-icon ha-icon { display: flex; align-items: center; justify-content: center; }
      .btn-icon.xs ha-icon { --mdc-icon-size: 0.875rem; }
      .btn-icon.sm ha-icon { --mdc-icon-size: 1rem; }
      @media (hover: hover) and (pointer: fine) { .btn-icon:hover { background: var(--s2); color: var(--t2); } }
      @media (pointer: coarse) { .btn-icon:active { animation: bounce 0.3s ease; } }
      .btn-icon:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 2px; }

      /* ── Feature toggles ── */
      .feature-list {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        margin-bottom: 0.875rem;
      }
      .feature-row {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.5rem 0.625rem;
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
        margin-top: 0.0625rem;
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
        padding: 0.375rem 0.625rem 0.5rem;
      }

      /* ── Threshold inputs ── */
      .threshold-list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        margin-bottom: 0.875rem;
      }
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.375rem 0.625rem;
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

      /* ── Fold separator (from kit) ── */
      .fold-sep {
        height: 0.0625rem;
        margin: 0 0.75rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0;
        transition: opacity var(--t-fast);
      }
      .fold-sep.visible { opacity: 1; }

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
        padding: 0 0.875rem;
        border-radius: var(--radius-lg);
        font-size: var(--fz-base);
      }
      .btn-sm {
        height: 1.75rem;
        padding: 0 0.625rem;
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
        padding: 0.625rem 1.125rem;
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
        border: 1px solid var(--b1); padding: 0.1875rem;
        width: 100%; margin-bottom: 0.5rem;
      }
      .seg-btn {
        flex: 1;
        padding: 0.4375rem 0; border-radius: var(--radius-sm);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: var(--t3); cursor: pointer; transition: all var(--t-fast);
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
        padding: 0.375rem 0.625rem;
        font-size: var(--fz-base);
      }
      .entity-rename-row .btn-icon {
        width: 1.75rem; height: 1.75rem;
        border-radius: var(--radius-sm);
      }
      .entity-rename-row .btn-icon ha-icon {
        --mdc-icon-size: 0.875rem;
      }
`,o`
      /* ── Tab Select ── */
      .tab-select-wrap {
        position: relative;
        width: 100%;
        margin-bottom: 1rem;
      }
      .tab-select-trigger {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        width: 100%;
        padding: 0.625rem 0.875rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-md);
        font-weight: 500;
        cursor: pointer;
        outline: none;
        transition: border-color var(--t-fast);
      }
      .tab-select-trigger:focus,
      .tab-select-wrap.open .tab-select-trigger {
        border-color: var(--b3);
      }
      .tab-select-trigger ha-icon {
        --mdc-icon-size: 1rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .tab-select-trigger ha-icon.arrow {
        margin-left: auto;
        transition: transform var(--t-fast);
      }
      .tab-select-wrap.open .tab-select-trigger ha-icon.arrow {
        transform: rotate(180deg);
      }
      .tab-select-trigger span {
        flex: 1;
      }
      .tab-select-menu {
        position: absolute;
        top: calc(100% + 0.375rem);
        left: 0;
        right: 0;
        max-height: 17.5rem;
        overflow-y: auto;
        border-radius: var(--radius-lg);
        padding: 0.25rem;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(var(--rgb-black),0.5);
        z-index: 20;
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
        scrollbar-width: thin;
        scrollbar-color: rgba(var(--rgb-white),0.1) transparent;
      }
      .tab-select-menu::-webkit-scrollbar { width: 0.25rem; }
      .tab-select-menu::-webkit-scrollbar-track { background: transparent; }
      .tab-select-menu::-webkit-scrollbar-thumb { background: rgba(var(--rgb-white),0.1); border-radius: 2px; }
      .tab-select-menu::-webkit-scrollbar-thumb:hover { background: rgba(var(--rgb-white),0.2); }
      .tab-select-wrap.open .tab-select-menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }
      .tab-select-search {
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
      }
      .tab-select-search::placeholder { color: var(--t4); }
      .tab-select-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-md);
        font-size: var(--fz-base);
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
      }
      @media (hover: hover) and (pointer: fine) {
        .tab-select-option:hover { background: var(--s3); color: var(--t1); }
      }
      @media (pointer: coarse) {
        .tab-select-option:active { animation: bounce 0.3s ease; }
      }
      .tab-select-option.selected { color: var(--c-accent); }
      .tab-select-option.hidden { display: none; }
      .tab-select-option ha-icon {
        --mdc-icon-size: 1rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .tab-select-option.selected ha-icon { color: var(--c-accent); }

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
`,o`
      /* ── Preview ── */
      .preview-encart {
        margin-bottom: 0.875rem;
        padding: 0.75rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
      }
      .preview-label {
        font-size: var(--fz-xxs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: var(--t4);
        margin-bottom: 0.5rem;
      }

      /* Preview navbar — miniature faithful to real navbar */
      .preview-navbar {
        display: flex;
        align-items: center;
        gap: 0.1875rem;
        padding: 0 0.375rem;
        height: 2.875rem;
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.08) 0%,
          rgba(var(--rgb-white), 0.03) 50%,
          rgba(var(--rgb-white), 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(var(--rgb-white), 0.1),
          0 20px 60px rgba(var(--rgb-black), 0.4),
          0 4px 16px rgba(var(--rgb-black), 0.25);
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
        gap: 0.3125rem;
        height: 2.125rem;
        min-width: 2.125rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-md);
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
        --mdc-icon-size: 1.125rem;
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-nav-item.hidden-preview {
        opacity: 0.2;
      }
      .preview-nav-item.active-preview {
        background: rgba(var(--rgb-white), 0.1);
        color: var(--t1);
      }
      .preview-nav-item.active-preview ha-icon {
        color: var(--t1);
      }
      .preview-nav-label {
        font-size: var(--fz-sm);
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
        filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6));
        animation: pulse-light 3s ease-in-out infinite;
      }
      @keyframes pulse-light {
        0%, 100% { filter: drop-shadow(0 0 6px rgba(var(--rgb-light-glow), 0.6)); }
        50% { filter: drop-shadow(0 0 2px rgba(var(--rgb-light-glow), 0.2)); }
      }
      .preview-nav-item.has-humidity::after {
        content: '';
        position: absolute;
        bottom: 0.1875rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.75rem;
        height: 0.125rem;
        border-radius: 2px;
        background: var(--c-info);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(var(--rgb-info), 0.4);
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
        top: 0.0625rem;
        right: 0.1875rem;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--t-fast);
      }
      .preview-temp-badge ha-icon {
        --mdc-icon-size: 0.5rem;
      }
      .preview-nav-item.has-temp-hot .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-hot);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-alert), 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .preview-nav-item.has-temp-cold .preview-temp-badge {
        opacity: 1;
        color: var(--c-temp-cold);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-info), 0.6));
        animation: pulse-temp-cold 2s infinite ease-in-out;
      }
      @keyframes pulse-temp-hot {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(var(--rgb-alert), 0.6)); }
      }
      @keyframes pulse-temp-cold {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
        50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(var(--rgb-info), 0.6)); }
      }

      /* Preview popup — faithful miniature of real popup */
      .preview-popup {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.08) 0%,
          rgba(var(--rgb-white), 0.03) 50%,
          rgba(var(--rgb-white), 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(var(--rgb-white), 0.1),
          0 20px 60px rgba(var(--rgb-black), 0.4),
          0 4px 16px rgba(var(--rgb-black), 0.25);
        border: 1px solid var(--b2);
        padding: 0.75rem;
        overflow: hidden;
      }
      .preview-popup-header {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        margin-bottom: 0.5rem;
      }
      .preview-popup-header-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .preview-popup-icon-box {
        width: 1.875rem;
        height: 1.875rem;
        border-radius: var(--radius-md);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--t2);
      }
      .preview-popup-icon-box ha-icon {
        --mdc-icon-size: 0.9375rem;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-popup-icon-box.has-light ha-icon {
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 5px rgba(var(--rgb-light-glow), 0.6));
      }
      .preview-popup-icon-box.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      .preview-popup-scene-dash {
        width: 0.625rem;
        height: 0.125rem;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 0.25rem;
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
        font-size: var(--fz-base);
        font-weight: 700;
        color: var(--t1);
        line-height: 1.2;
      }
      .preview-popup-meta {
        display: flex;
        gap: 0.5rem;
        font-size: var(--fz-xs);
        font-weight: 500;
        color: var(--t3);
        margin-top: 0.125rem;
      }
      .preview-popup-close {
        width: 1.25rem;
        height: 1.25rem;
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
        --mdc-icon-size: 0.625rem;
        display: flex; align-items: center; justify-content: center;
      }

      /* Preview popup scenes */
      .preview-popup-scenes {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        padding-bottom: 0.5rem;
      }
      .preview-scene-chip {
        background: rgba(var(--rgb-white), 0.04);
        border: 1px solid var(--b1);
        border-radius: var(--radius-md);
        padding: 0.1875rem 0.5rem;
        font-size: var(--fz-xxs);
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
        gap: 0.25rem;
      }
      .preview-card-slot {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.5rem;
        border-radius: var(--radius-sm);
        background: var(--s1);
        border: 1px solid var(--b1);
        transition: opacity var(--t-fast);
      }
      .preview-card-slot ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-card-slot-name {
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
      }
      .preview-card-slot-count {
        margin-left: auto;
        font-size: var(--fz-xs);
        font-weight: 600;
        color: var(--t4);
        padding: 0.0625rem 0.375rem;
        border-radius: var(--radius-full);
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .preview-empty {
        font-size: var(--fz-sm);
        font-weight: 500;
        color: var(--t4);
        text-align: center;
        padding: 0.75rem 0;
      }

      /* Variant picker */
      .variant-picker {
        display: flex; gap: 0.375rem; margin-top: 0.375rem;
      }

      /* Preview media hero card — full-bleed artwork style */
      .preview-media {
        position: relative; overflow: hidden;
        border-radius: var(--radius-xl);
        min-height: 12.5rem;
        display: flex; flex-direction: column;
        border: 1px solid var(--b2);
        box-shadow: 0 8px 32px rgba(var(--rgb-black),0.25), 0 2px 8px rgba(var(--rgb-black),0.15);
      }
      .mp-art-bg {
        position: absolute; inset: 0; z-index: 0;
        background: linear-gradient(135deg, #1a1040 0%, #2d1b69 30%, #4a2c8a 60%, #1a1040 100%);
      }
      .mp-gradient {
        position: absolute; inset: 0; z-index: 1; pointer-events: none;
        background: linear-gradient(to top,
          rgba(var(--rgb-black),0.85) 0%,
          rgba(var(--rgb-black),0.4) 40%,
          rgba(var(--rgb-black),0.15) 70%,
          transparent 100%
        );
      }
      .mp-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        padding: 0.625rem 0.75rem; flex: 1;
      }
      .mp-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .mp-pill {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding: 0.1875rem 0.5rem 0.1875rem 0.3125rem;
        border-radius: var(--radius-full);
        backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        background: rgba(var(--rgb-black),0.35); border: 1px solid rgba(var(--rgb-white),0.08);
        font-size: var(--fz-xxs); font-weight: 600; color: rgba(var(--rgb-white),0.9);
      }
      .mp-pill ha-icon { --mdc-icon-size: 0.625rem; display: flex; align-items: center; justify-content: center; }
      .mp-eq {
        display: flex; align-items: flex-end; gap: 0.0938rem;
        height: 0.625rem; margin-left: 0.25rem;
      }
      .mp-eq-bar {
        width: 0.125rem; border-radius: 1px;
        background: #fff;
        filter: drop-shadow(0 0 3px rgba(var(--rgb-white),0.6));
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
        background: rgba(var(--rgb-black),0.3);
        border: 1px solid rgba(var(--rgb-white),0.06);
        border-radius: var(--radius-lg);
        padding: 0.625rem 0.75rem 0.5rem;
      }
      .mp-track {
        display: flex; flex-direction: column; gap: 0.125rem;
      }
      .mp-track-title {
        font-size: var(--fz-md); font-weight: 700; color: #fff; line-height: 1.15;
        text-shadow: 0 1px 6px rgba(var(--rgb-black),0.4);
      }
      .mp-track-artist {
        font-size: var(--fz-sm); font-weight: 500; color: rgba(var(--rgb-white),0.7);
      }
      .mp-track-meta {
        display: flex; align-items: center; gap: 0.375rem; margin-top: 0.0625rem;
      }
      .mp-track-time { font-size: var(--fz-xxs); color: rgba(var(--rgb-white),0.4); font-variant-numeric: tabular-nums; }
      .mp-track-source {
        font-size: var(--fz-xxs); font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.4px; color: rgba(var(--rgb-white),0.4);
        padding: 0.0625rem 0.25rem; border-radius: 3px; background: rgba(var(--rgb-white),0.06);
      }
      .mp-progress {
        position: relative; width: 100%; height: 0.1875rem;
        border-radius: 1.5px; background: rgba(var(--rgb-white),0.08); margin-top: 0.375rem;
      }
      .mp-progress-fill {
        position: absolute; top: 0; left: 0; height: 100%; width: 67%;
        border-radius: inherit;
        background: rgba(var(--rgb-accent),0.8);
        box-shadow: 0 0 6px rgba(var(--rgb-accent),0.4);
      }
      .mp-transport {
        display: flex; align-items: center; justify-content: center; gap: 0.375rem;
        margin-top: 0.5rem;
      }
      .mp-btn {
        width: 1.5rem; height: 1.5rem; border-radius: var(--radius-xs);
        background: transparent; border: none;
        display: flex; align-items: center; justify-content: center;
        color: rgba(var(--rgb-white),0.45); padding: 0;
      }
      .mp-btn ha-icon { --mdc-icon-size: 0.875rem; display: flex; align-items: center; justify-content: center; }
      .mp-btn.skip { width: 1.75rem; height: 1.75rem; }
      .mp-btn.skip ha-icon { --mdc-icon-size: 1.125rem; }
      .mp-btn.main {
        width: 2.125rem; height: 2.125rem; border-radius: var(--radius-md);
        background: rgba(var(--rgb-accent),0.1); border: 1px solid rgba(var(--rgb-accent),0.15);
        color: rgba(var(--rgb-accent),0.8);
      }
      .mp-btn.main ha-icon { --mdc-icon-size: 1.125rem; }

      /* Preview light card */
      .preview-light {
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .preview-light-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.25rem;
        padding: 0 0.25rem;
      }
      .preview-light-header-left {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .preview-light-title {
        font-size: var(--fz-xxs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--t4);
      }
      .preview-light-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 0.875rem;
        height: 0.875rem;
        padding: 0 0.25rem;
        border-radius: var(--radius-full);
        font-size: var(--fz-xxs);
        font-weight: 700;
      }
      .preview-light-count.none {
        background: var(--s2);
        color: var(--t3);
      }
      .preview-light-count.some {
        background: rgba(var(--rgb-light-glow), 0.15);
        color: var(--c-light-glow);
      }
      .preview-light-count.all {
        background: rgba(var(--rgb-light-glow), 0.2);
        color: var(--c-light-glow);
      }
      .preview-light-toggle {
        width: 1.75rem;
        height: 0.875rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b2);
        position: relative;
        pointer-events: none;
      }
      .preview-light-toggle::after {
        content: '';
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--t3);
        transition: transform var(--t-fast), background var(--t-fast);
      }
      .preview-light-toggle.on {
        background: rgba(var(--rgb-light-glow), 0.2);
        border-color: rgba(var(--rgb-light-glow), 0.3);
      }
      .preview-light-toggle.on::after {
        transform: translateX(14px);
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(var(--rgb-light-glow), 0.4);
      }
      .preview-light-body {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.06) 0%,
          rgba(var(--rgb-white), 0.02) 100%
        );
        box-shadow:
          inset 0 1px 0 0 rgba(var(--rgb-white), 0.08),
          0 8px 24px rgba(var(--rgb-black), 0.3);
        border: 1px solid var(--b1);
        padding: 0.5rem;
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
        gap: 0.375rem;
        grid-column: 1 / -1;
        padding: 0.3125rem 0.25rem;
        border-radius: var(--radius-xs);
        transition: opacity var(--t-fast);
      }
      .preview-light-row.compact {
        grid-column: span 1;
      }
      .preview-light-row.compact-right {
        padding-left: 0.5rem;
        position: relative;
      }
      .preview-light-row.compact-right::before {
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
      .preview-light-row.hidden-light {
        opacity: 0.2;
      }
      .preview-light-icon {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--radius-xs);
        background: var(--s2);
        border: 1px solid var(--b1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--t3);
      }
      .preview-light-icon ha-icon {
        --mdc-icon-size: 0.75rem;
        display: flex; align-items: center; justify-content: center;
      }
      .preview-light-icon.on {
        background: rgba(var(--rgb-light-glow), 0.1);
        border-color: rgba(var(--rgb-light-glow), 0.15);
        color: var(--c-light-glow);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-light-glow), 0.4));
      }
      .preview-light-info {
        flex: 1;
        min-width: 0;
      }
      .preview-light-name {
        font-size: var(--fz-xs);
        font-weight: 600;
        color: var(--t1);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .preview-light-sub {
        font-size: var(--fz-xxs);
        font-weight: 500;
        color: var(--t3);
        margin-top: 0.0625rem;
      }
      .preview-light-row[data-on='true'] .preview-light-sub {
        color: rgba(var(--rgb-light-glow), 0.55);
      }
      .preview-light-dot {
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
        transition: background var(--t-fast), box-shadow var(--t-fast);
      }
      .preview-light-dot.on {
        background: var(--c-light-glow);
        box-shadow: 0 0 6px rgba(var(--rgb-light-glow), 0.5);
      }
      .preview-light-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        transition: opacity var(--t-slow);
      }
      .preview-light-sched {
        --mdc-icon-size: 0.625rem;
        color: var(--c-accent);
        flex-shrink: 0;
        opacity: 0.7;
      }
      .preview-light-layout-tag {
        font-size: var(--fz-xxs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
        background: var(--s2);
        border: 1px solid var(--b1);
        border-radius: 3px;
        padding: 0.0625rem 0.25rem;
        flex-shrink: 0;
      }

      /* ── Preview weather (realistic miniature) ── */
      .preview-weather-wrap {
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .pw-card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.25rem;
      }
      .pw-card-title {
        font-size: var(--fz-xxs); font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .pw-card-location {
        font-size: var(--fz-xxs); font-weight: 500; color: var(--t3);
      }

      /* ── Preview title card ── */
      .preview-title-card {
        display: flex; flex-direction: column; align-items: center;
        gap: 0.25rem; padding: 0.5rem 0.75rem; text-align: center;
      }
      .preview-title-text {
        font-size: var(--fz-lg); font-weight: 700; color: var(--t1);
        letter-spacing: -0.3px; line-height: 1.2;
        display: flex; align-items: center; gap: 0.625rem;
        width: 100%;
      }
      .preview-title-text::before, .preview-title-text::after {
        content: ''; flex: 1; height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b3));
      }
      .preview-title-text::after {
        background: linear-gradient(90deg, var(--b3), transparent);
      }
      .yaml-block {
        background: var(--s1); border: 1px solid var(--b1);
        border-radius: var(--radius-md); padding: 0.625rem 0.875rem;
        font-family: 'Courier New', monospace; font-size: var(--fz-sm);
        line-height: 1.5; color: var(--t3);
        overflow-x: auto; white-space: pre; margin: 0.5rem 0 0;
        user-select: all; -webkit-user-select: all;
      }
      .preview-period {
        display: flex; align-items: center; justify-content: center;
        font-size: var(--fz-xs); font-weight: 500; text-transform: uppercase;
        letter-spacing: 1.5px; user-select: none;
      }
      .preview-title-dash {
        display: flex; align-items: center; justify-content: center;
        padding: 0.125rem 0;
      }
      .preview-dash-line {
        width: 1.25rem; height: 0.125rem; border-radius: 1px;
        background: var(--t4);
        transition: all var(--t-med);
      }

      .preview-weather {
        border-radius: var(--radius-lg);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.08) 0%,
          rgba(var(--rgb-white), 0.03) 50%,
          rgba(var(--rgb-white), 0.06) 100%
        );
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow:
          inset 0 1px 0 0 rgba(var(--rgb-white), 0.1),
          0 20px 60px rgba(var(--rgb-black), 0.4),
          0 4px 16px rgba(var(--rgb-black), 0.25);
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
        padding: 0.625rem;
        display: flex; flex-direction: column; gap: 0.375rem;
      }
      .pw-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .pw-header-left {
        display: flex; flex-direction: column; gap: 0.0625rem;
      }
      .pw-time {
        font-size: var(--fz-xl); font-weight: 300; color: var(--t1); line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .pw-time .pw-sec {
        font-size: var(--fz-xxs); font-weight: 400; color: var(--t4);
      }
      .pw-date {
        font-size: var(--fz-xxs); color: var(--t3);
        text-transform: capitalize;
      }
      .pw-date::first-letter { font-weight: 700; }
      .pw-header-right {
        display: flex; flex-direction: column; align-items: flex-end; gap: 0.125rem;
      }
      .pw-temp {
        font-size: var(--fz-xl); font-weight: 700; color: var(--t1); line-height: 1;
      }
      .pw-temp-unit {
        font-size: var(--fz-xxs); font-weight: 400; color: var(--t3); vertical-align: super;
      }
      .pw-cond {
        display: flex; align-items: center; gap: 0.1875rem;
        font-size: var(--fz-xxs); font-weight: 500; color: var(--t3);
      }
      .pw-cond ha-icon {
        --mdc-icon-size: 0.625rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-feels {
        font-size: var(--fz-xxs); color: var(--t4);
      }
      /* ── Sparkline ── */
      .pw-spark-zone {
        height: 2.75rem; position: relative; overflow: hidden;
        border-radius: var(--radius-sm);
      }
      .pw-spark-svg {
        display: block; width: 100%; height: 100%;
      }
      .pw-spark-now {
        position: absolute; top: 0; bottom: 1rem; width: 0.0625rem;
        background: linear-gradient(180deg, transparent 0%, rgba(var(--rgb-white),0.5) 30%, rgba(var(--rgb-white),0.5) 70%, transparent 100%);
        transform: translateX(-50%);
      }
      .pw-spark-now-dot {
        position: absolute; left: 50%; transform: translate(-50%, -50%);
        width: 0.25rem; height: 0.25rem; border-radius: 50%;
        background: white;
        box-shadow: 0 0 4px rgba(var(--rgb-white),0.8);
      }
      .pw-spark-labels {
        position: absolute; bottom: 0; left: 0; right: 0; height: 0.75rem;
      }
      .pw-spark-lbl {
        position: absolute; transform: translateX(-50%);
        font-size: var(--fz-xxs); color: var(--t4);
        font-variant-numeric: tabular-nums;
      }
      /* ── Metrics ── */
      .pw-metrics {
        display: grid;
        gap: 0.0625rem;
        border-radius: var(--radius-sm);
        background: var(--b1);
        overflow: hidden;
      }
      .pw-metric {
        display: flex; align-items: center; justify-content: center; gap: 0.125rem;
        padding: 0.25rem 0.1875rem;
        background: var(--s1);
      }
      .pw-metric ha-icon {
        --mdc-icon-size: 0.5625rem;
        width: 0.5625rem; height: 0.5625rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t4);
      }
      .pw-metric.humidity ha-icon { color: rgba(var(--rgb-info),0.5); }
      .pw-metric.wind ha-icon { color: rgba(110,231,183,0.5); }
      .pw-metric.pressure ha-icon { color: rgba(148,163,184,0.5); }
      .pw-metric.uv ha-icon { color: rgba(var(--rgb-warning),0.5); }
      .pw-metric.visibility ha-icon { color: rgba(148,163,184,0.4); }
      .pw-metric.sunrise ha-icon { color: rgba(var(--rgb-warning),0.4); }
      .pw-metric.sunset ha-icon { color: rgba(251,146,60,0.5); }
      .pw-metric-val { font-size: var(--fz-xxs); font-weight: 600; color: var(--t2); }
      .pw-metric-unit { font-size: var(--fz-xxs); font-weight: 400; color: var(--t4); }
      .pw-metric-dir { font-size: var(--fz-xxs); font-weight: 700; color: var(--t3); }
      /* ── Forecast ── */
      .pw-forecast-zone {
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .pw-tabs {
        display: flex; justify-content: center; gap: 0.25rem;
      }
      .pw-tab {
        font-size: var(--fz-xxs); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
        color: var(--t4);
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--b1);
        background: transparent;
      }
      .pw-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .pw-fold-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        opacity: 0.3;
      }
      .pw-daily-list {
        display: flex; flex-direction: column; gap: 0.0625rem;
      }
      .pw-day-row {
        display: grid;
        grid-template-columns: 28px 14px 1fr 24px;
        align-items: center;
        gap: 0.25rem;
        padding: 0.125rem 0.25rem;
        border-radius: var(--radius-sm);
      }
      .pw-day-row.today {
        background: var(--s2);
      }
      .pw-day-label {
        font-size: var(--fz-xxs); font-weight: 600; color: var(--t3);
      }
      .pw-day-row.today .pw-day-label { color: var(--t2); }
      .pw-day-icon {
        --mdc-icon-size: 0.625rem;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }
      .pw-day-temps {
        display: flex; align-items: baseline; gap: 0.1875rem;
      }
      .pw-day-high {
        font-size: var(--fz-xxs); font-weight: 700; color: var(--t2);
      }
      .pw-day-low {
        font-size: var(--fz-xxs); font-weight: 400; color: var(--t4);
      }
      .pw-day-precip {
        font-size: var(--fz-xxs); color: rgba(var(--rgb-info),0.5);
        text-align: right;
      }

      /* ── Preview Spotify card ── */
      .preview-spotify-wrap {
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .ps-card-header {
        display: flex; align-items: center; gap: 0.25rem;
        padding: 0 0.25rem;
      }
      .ps-card-header ha-icon {
        --mdc-icon-size: 0.625rem; color: #1DB954;
        display: flex; align-items: center; justify-content: center;
      }
      .ps-card-title {
        font-size: var(--fz-xxs); font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.2px;
        color: var(--t4);
      }
      .preview-spotify {
        border-radius: var(--radius-lg);
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.08) 0%, rgba(var(--rgb-white),0.03) 50%, rgba(var(--rgb-white),0.06) 100%);
        backdrop-filter: blur(50px) saturate(1.5);
        -webkit-backdrop-filter: blur(50px) saturate(1.5);
        box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 20px 60px rgba(var(--rgb-black),0.4), 0 4px 16px rgba(var(--rgb-black),0.25);
        border: 1px solid var(--b2);
        overflow: hidden;
        padding: 0.5rem;
        display: flex; flex-direction: column; gap: 0.375rem;
      }
      .ps-search {
        display: flex; align-items: center; gap: 0.25rem;
        background: var(--s3); border-radius: var(--radius-full);
        padding: 0.1875rem 0.5rem;
      }
      .ps-search ha-icon {
        --mdc-icon-size: 0.625rem; color: var(--t4);
        display: flex; align-items: center; justify-content: center;
      }
      .ps-search-text {
        font-size: var(--fz-xxs); color: var(--t4); flex: 1;
      }
      .ps-tabs {
        display: flex; gap: 0.1875rem;
      }
      .ps-tab {
        font-size: var(--fz-xxs); font-weight: 600; letter-spacing: 0.3px;
        color: var(--t4);
        padding: 0.125rem 0.3125rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--b1);
        background: transparent;
      }
      .ps-tab.active {
        color: var(--t1);
        background: var(--s4);
        border-color: var(--b3);
      }
      .ps-section-label {
        font-size: var(--fz-xxs); font-weight: 700; color: var(--t3);
        text-transform: uppercase; letter-spacing: 0.5px;
        padding: 0.125rem 0 0.0625rem;
      }
      .ps-item-row {
        display: flex; align-items: center; gap: 0.375rem;
        padding: 0.125rem 0;
      }
      .ps-item-art {
        width: 1.25rem; height: 1.25rem; border-radius: 3px;
        background: var(--s3); flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .ps-item-art ha-icon {
        --mdc-icon-size: 0.625rem; color: var(--t4);
        display: flex; align-items: center; justify-content: center;
      }
      .ps-item-info {
        flex: 1; min-width: 0;
      }
      .ps-item-name {
        font-size: var(--fz-xxs); font-weight: 600; color: var(--t2);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ps-item-meta {
        font-size: var(--fz-xxs); color: var(--t4);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ps-item-play {
        --mdc-icon-size: 0.75rem; color: #1DB954; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        opacity: 0.6;
      }

      /* ── Preview dashboard ── */
      .preview-dashboard {
        border-radius: var(--radius-lg);
        background: rgba(17, 24, 39, 0.6);
        padding: 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        min-height: 5rem;
      }
      .preview-dashboard-cards {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .preview-dashboard-navbar {
        display: flex;
        gap: 0.375rem;
        justify-content: center;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
        margin-top: auto;
      }
      .preview-dashboard-navbar ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-dashboard-card {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.625rem;
        border-radius: var(--radius-md);
        background: linear-gradient(
          135deg,
          rgba(var(--rgb-white), 0.06) 0%,
          rgba(var(--rgb-white), 0.02) 100%
        );
        border: 1px solid var(--b1);
        font-size: var(--fz-sm);
        font-weight: 600;
        color: var(--t2);
      }
      .preview-dashboard-card ha-icon {
        --mdc-icon-size: 1rem;
        color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .preview-dashboard-card.weather ha-icon {
        color: rgba(var(--rgb-light-glow), 0.7);
      }
      .preview-dashboard-card.light ha-icon {
        color: rgba(var(--rgb-light-glow), 0.5);
      }
      .preview-dashboard-empty {
        text-align: center;
        color: var(--t4);
        font-size: var(--fz-base);
        padding: 1rem 0;
      }

      /* ── Cover preview ── */
      .preview-cover {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.75rem;
      }
      .preview-cover-card {
        border-radius: var(--radius-lg);
        overflow: hidden;
      }

      /* ── Presence preview ── */
      .preview-presence {
        padding: 0.75rem;
      }
      .preview-presence-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.625rem;
      }
      .preview-presence-title {
        font-size: var(--fz-base);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t2);
      }
      .preview-presence-pill {
        font-size: var(--fz-sm);
        font-weight: 700;
        padding: 0.125rem 0.5rem;
        border-radius: var(--radius-full);
        color: white;
      }
      .preview-presence-pill.all-home { background: var(--c-success); }
      .preview-presence-pill.all-away { background: var(--c-alert); }
      .preview-presence-pill.mixed { background: var(--c-accent); }
      .preview-presence-persons {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
      }
      .preview-presence-person {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
      .preview-presence-avatar {
        width: 2rem;
        height: 2rem;
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
        --mdc-icon-size: 1.125rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-presence-name {
        font-size: var(--fz-xs);
        color: var(--t3);
        max-width: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
`,o`
      /* ── Dropdown ── */
      .dropdown {
        position: relative;
        width: 100%;
        margin-bottom: 0.875rem;
      }
      .dropdown-trigger {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.5rem 0.875rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--b2);
        background: var(--s2);
        color: var(--t2);
        font-family: inherit;
        font-size: var(--fz-base);
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
        transition: all var(--t-fast);
        scrollbar-width: thin;
        scrollbar-color: rgba(var(--rgb-white),0.1) transparent;
      }
      .dropdown-menu::-webkit-scrollbar { width: 0.25rem; }
      .dropdown-menu::-webkit-scrollbar-track { background: transparent; }
      .dropdown-menu::-webkit-scrollbar-thumb { background: rgba(var(--rgb-white),0.1); border-radius: 2px; }
      .dropdown-menu::-webkit-scrollbar-thumb:hover { background: rgba(var(--rgb-white),0.2); }
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

      /* ── Chip (UI kit) ── */
      .chip {
        display: inline-flex; align-items: center; gap: 0.3125rem;
        padding: 0.3125rem 0.75rem; border-radius: var(--radius-md);
        border: 1px solid var(--b2); background: var(--s1);
        font-family: inherit; font-size: var(--fz-base); font-weight: 600;
        color: var(--t3); cursor: pointer; transition: all var(--t-fast);
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
        display: flex; flex-direction: column; gap: 0.625rem;
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
        padding: 0.625rem 0.75rem;
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
        transition: all var(--t-fast); outline: none;
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
        position: fixed; inset: 0; z-index: 10000;
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
        background: linear-gradient(135deg, rgba(var(--rgb-white),0.08) 0%, rgba(var(--rgb-white),0.03) 50%, rgba(var(--rgb-white),0.06) 100%);
        backdrop-filter: blur(40px) saturate(1.4);
        -webkit-backdrop-filter: blur(40px) saturate(1.4);
        box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 8px 32px rgba(var(--rgb-black),0.25), 0 2px 8px rgba(var(--rgb-black),0.15);
        border: 1px solid var(--b2);
        overflow: hidden;
        animation: popup-in 0.2s var(--ease-out);
      }
      @keyframes popup-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      .icon-popup-header {
        padding: 0.875rem 1rem 0.625rem;
        display: flex; flex-direction: column; gap: 0.625rem;
        border-bottom: 0.0625rem solid var(--b1);
      }
      .icon-popup-title {
        font-size: var(--fz-base); font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--t3);
      }
      .icon-popup-search {
        width: 100%; padding: 0.625rem 0.875rem; border-radius: var(--radius-lg);
        border: 1px solid var(--b2); background: var(--s1);
        color: var(--t1); font-family: inherit; font-size: var(--fz-md);
        outline: none; transition: border-color var(--t-fast);
        box-sizing: border-box;
      }
      .icon-popup-search:focus { border-color: var(--b3); }
      .icon-popup-search::placeholder { color: var(--t4); }
      .icon-popup-grid-wrap {
        flex: 1; overflow-y: auto; padding: 0.625rem;
        scrollbar-width: thin;
        scrollbar-color: var(--s3) transparent;
      }
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
        margin-top: 0.625rem;
        padding: 0.75rem;
        background: var(--s2);
        border-radius: var(--radius-md);
        border: 1px solid var(--b1);
      }
      .presence-mapping-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.625rem;
      }
      .presence-mapping-header .feature-icon {
        width: 1.75rem;
        height: 1.75rem;
      }
      .presence-mapping-field {
        margin-bottom: 0.5rem;
      }
      .presence-mapping-field:last-child {
        margin-bottom: 0;
      }
      .presence-mapping-label {
        display: block;
        font-size: var(--fz-base);
        color: var(--t3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.25rem;
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
        transition: all var(--t-fast);
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
        padding: 0.625rem 0.75rem 0.75rem 2.25rem;
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
        padding: 0.625rem 0.875rem;
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
        transition: all var(--t-fast);
        flex-shrink: 0;
        --mdc-icon-size: 0.75rem;
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
        transition: all var(--t-fast);
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
        padding: 0.5rem 0.625rem;
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
        padding: 0.375rem 0.625rem;
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
        position: fixed;
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
        transition: all var(--t-fast);
        --mdc-icon-size: 1rem;
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
        transition: all var(--t-fast);
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
        margin-bottom: 0.625rem;
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
        transition: all var(--t-fast);
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
        margin-top: 0.875rem;
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
        margin-top: 0.875rem;
        width: 100%;
      }
`],le={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b},pe=(e=le,t,i)=>{const{kind:a,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function he(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return he({...e,state:!0,attribute:!1})}const me=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}};var ue=Object.defineProperty,ge=(e,t,i,a)=>{for(var r,o=void 0,n=e.length-1;n>=0;n--)(r=e[n])&&(o=r(t,i,o)||o);return o&&ue(t,i,o),o};class ve extends se{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.color="var(--rgb-accent)",this.label="",this.disabled=!1,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[o`
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
    `]}_displayPct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_snap(e){if(this.step<=0)return e;const t=Math.round(e/this.step)*this.step,i=(this.step.toString().split(".")[1]||"").length;return parseFloat(t.toFixed(i))}_pctToValue(e){const t=this.max-this.min,i=this.min+e/100*t;return Math.max(this.min,Math.min(this.max,this._snap(i)))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max")||e.has("color"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._displayPct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.transform=`translate(calc(${e}cqw - 50%), -50%)`)}_onPointerDown(e){if(this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,this._ac=new AbortController;const{signal:i}=this._ac,a=this.renderRoot.querySelector(".fill"),r=this.renderRoot.querySelector(".thumb"),o=(e,i)=>{const o=t.getBoundingClientRect(),n=Math.max(0,Math.min(100,(e.clientX-o.left)/o.width*100)),s=this._pctToValue(n);this._dragValue=s;const c=this._displayPct(s);a.style.transform=`scaleX(${c/100})`,r.style.transform=`translate(calc(${c}cqw - 50%), -50%)`;const d=i?"glass-slider-change":"glass-slider-input";this.dispatchEvent(new CustomEvent(d,{detail:{value:s},bubbles:!0,composed:!0}))};o(e,!1);const n=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}this._dragging=!1};t.addEventListener("pointermove",e=>o(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{o(e,!0),n()},{signal:i}),t.addEventListener("pointercancel",()=>n(),{signal:i}),t.addEventListener("lostpointercapture",()=>n(),{signal:i})}_onKeyDown(e){if(this.disabled)return;const t=this.step>0?this.step:1;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this._snap(this.value+t));break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this._snap(this.value-t));break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this._dragValue=i,this._applyVisuals(),this.dispatchEvent(new CustomEvent("glass-slider-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return W`
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
        ${this.label?W`<span class="label">${this.label}</span>`:""}
      </div>
    `}}ge([he({type:Number})],ve.prototype,"value"),ge([he({type:Number})],ve.prototype,"min"),ge([he({type:Number})],ve.prototype,"max"),ge([he({type:Number})],ve.prototype,"step"),ge([he({type:String})],ve.prototype,"color"),ge([he({type:String})],ve.prototype,"label"),ge([he({type:Boolean,reflect:!0})],ve.prototype,"disabled");try{customElements.define("glass-slider",ve)}catch{}const fe=o`
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

    --t1: rgba(var(--rgb-white), 0.88);
    --t2: rgba(var(--rgb-white), 0.6);
    --t3: rgba(var(--rgb-white), 0.45);
    --t4: rgba(var(--rgb-white), 0.25);

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
    --c-temp-hot: #f87171;
    --c-temp-cold: #60a5fa;

    --icon-xs: 0.625rem;
    --icon-sm: 0.875rem;
    --icon-md: 1.125rem;
    --icon-lg: 1.375rem;
    --icon-xl: 1.5rem;
  }
`,be=o`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`,ye=o`
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
`;o`
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
`;const we=o`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`;o`
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
`,o`
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
`,o`
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
`;const xe={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer",collapse:"Réduire",expand:"Développer",move_up:"Déplacer vers le haut",move_down:"Déplacer vers le bas",none:"Aucun",rooms:"Pièces"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSO",compass_SW:"SO",compass_WSW:"OSO",compass_W:"O",compass_WNW:"ONO",compass_NW:"NO",compass_NNW:"NNO"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store d'ombrage",dc_window:"Fenêtre",dc_damper:"Clapet"},climate:{title:"Climat",target:"Consigne",current:"Actuelle",range_low:"Min",range_high:"Max",humidity_target:"Humidité cible",aux_heat:"Chauffage auxiliaire",unavailable:"Indisponible",mode_heat:"Chauffage",mode_cool:"Climatisation",mode_heat_cool:"Auto chaud/froid",mode_auto:"Automatique",mode_dry:"Déshumidification",mode_fan_only:"Ventilation",mode_off:"Éteint",preset_eco:"Éco",preset_comfort:"Confort",preset_boost:"Boost",preset_away:"Absent",preset_sleep:"Nuit",preset_activity:"Activité",preset_none:"Aucun",fan_mode:"Ventilation",swing_mode:"Oscillation",open_all_aria:"Allumer tous les climatiseurs",close_all_aria:"Éteindre tous les climatiseurs",toggle_aria:"Basculer",expand_aria:"Détails",temp_up_aria:"Augmenter température",temp_down_aria:"Diminuer température",humidity_up_aria:"Augmenter humidité",humidity_down_aria:"Diminuer humidité",range_low_aria:"Température minimale",range_high_aria:"Température maximale",no_climates:"Aucun climatiseur",turn_on_aria:"Allumer",turn_off_aria:"Éteindre",action_heating:"Chauffe",action_cooling:"Refroidit",action_idle:"En attente",action_off:"Éteint",action_drying:"Déshumidifie",current_label:"Actuel",controls_aria:"Contrôles",unknown:"Inconnu",avg_label:"Moy.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce."},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}",clear_search:"Effacer la recherche"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",remove_from_queue:"Retirer de la liste de lecture",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",distance_m:"m",distance_km:"km"},camera:{title:"CAMÉRAS",idle:"Veille",streaming:"En direct",recording:"Enregistrement",off:"Éteinte",unavailable:"Indisponible",no_cameras:"Aucune caméra",prev_aria:"Caméra précédente",next_aria:"Caméra suivante",dot_aria:"Aller à {name}",power_on:"Allumer",power_off:"Éteindre",snapshot:"Capture",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Désactiver détection mouvement",motion_off_aria:"Activer détection mouvement",siren_aria:"Sirène",floodlight_aria:"Projecteur",auto_track_aria:"Suivi automatique",tap_to_stream:"Appuyer pour diffuser",camera_off:"Caméra éteinte",ai_person:"Personne",ai_vehicle:"Véhicule",ai_pet:"Animal",ai_animal:"Animal",ai_package:"Colis",ai_face:"Visage",ai_baby_crying:"Bébé",ai_bicycle:"Vélo",dashboard_title:"CAMÉRAS",dashboard_title_one:"1 CAMÉRA"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Barre de nav","tab_popup":"Popup Pièce","tab_light":"Carte Lumières","preview":"Aperçu","behavior":"Comportement","navbar_behavior":"Comportement","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","navbar_rooms_banner":"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.","navbar_visible_rooms":"Pièces visibles","navbar_empty_rooms":"Pièces vides","navbar_empty_rooms_desc":"Ces pièces n\'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu\'elles apparaissent dans la navbar.","navbar_indicators":"Indicateurs","navbar_indicators_desc":"Activez ou désactivez les indicateurs visuels sur la navbar.","navbar_ind_lights":"Lumières allumées","navbar_ind_lights_desc":"Glow doré sur l\'icône","navbar_ind_temp":"Température","navbar_ind_temp_desc":"Badge chaud / froid","navbar_ind_humidity":"Humidité","navbar_ind_humidity_desc":"Barre bleue en bas","navbar_ind_media":"Média en lecture","navbar_ind_media_desc":"Bounce de l\'icône","navbar_thresholds":"Seuils","navbar_thresholds_desc":"Définissez les seuils pour les alertes de température et d\'humidité.","navbar_temp_high":"Température haute","navbar_temp_low":"Température basse","navbar_humidity_threshold":"Seuil humidité","navbar_choose_icon":"Choisir icône","navbar_change_icon_aria":"Changer l\'icône de {name}","navbar_icon_label":"Icône — {name}","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_camera":"Caméras","domain_camera_desc":"Caméras de surveillance","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Carte Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_hourly":"Prévisions horaires","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","tab_title":"Carte Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_period_indicator":"Indicateur de période","title_period_info":"Créez un input_select nommé « periode_journee » avec les options : Matin, Après-midi, Soir, Nuit. L\'indicateur s\'affichera automatiquement.","title_period_entity":"Entité période","title_period_entity_desc":"Sélectionnez l\'input_select qui contrôle la période du jour","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Visuels des périodes","title_period_options_desc":"Personnalisez l\'icône et la couleur de chaque période","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Carte Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Carte Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Carte Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Carte Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Carte Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Carte Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Carte Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","tab_climate":"Climat","climate_desc":"Configurez les entités climat par pièce","climate_no_entities":"Aucune entité climat dans cette pièce","climate_show_header":"Afficher l\'en-tête","climate_show_header_desc":"Titre et compteur au-dessus de la carte","climate_display_mode":"Mode d\'affichage","climate_display_mode_popup":"Mode d\'affichage (popup)","climate_display_mode_dashboard":"Mode d\'affichage (dashboard)","climate_mode_list":"Liste","climate_mode_normal":"Normal","climate_select_room":"Sélectionner une pièce","climate_dashboard_entities":"Entités climat du tableau de bord","climate_dashboard_entities_desc":"Sélectionnez les thermostats à afficher sur le tableau de bord.","dashboard_card_climate":"Climat","dashboard_card_climate_desc":"Thermostats et climatiseurs","dashboard_card_fan":"Carte Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Carte Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Carte Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Carte Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Carte Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_compact":"Affichage compact","cover_dashboard_compact_desc":"Affiche les volets en grille compacte 2 colonnes. Désactivé, chaque volet occupe toute la largeur.","cover_dashboard_entities":"Volets du tableau de bord","cover_dashboard_entities_desc":"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_camera_carousel":"Carte Caméras","camera_show_header":"Afficher l\'en-tête","camera_show_header_desc":"Titre et compteur au-dessus de la carte","camera_auto_cycle":"Cycle automatique","camera_auto_cycle_desc":"Passer automatiquement d\'une caméra à l\'autre","camera_cycle_interval":"Intervalle (secondes)","camera_cycle_interval_desc":"Temps entre chaque changement de caméra","camera_entity_order":"Ordre des caméras","camera_entity_order_desc":"Glissez pour réordonner les caméras.","camera_no_cameras":"Aucune caméra détectée.","dashboard_card_camera_carousel":"Carte Caméras","dashboard_card_camera_carousel_desc":"Carrousel de surveillance avec actions rapides","tab_spotify":"Carte Spotify","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Entité lecteur Spotify","spotify_entity_desc":"Sélectionnez l\'entité media_player Spotify à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Sélectionnez les enceintes affichées dans le popup de lecture. Si aucune n\'est sélectionnée, toutes les enceintes sont affichées.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres","tab_unassigned":"Assignation pièces","unassigned_desc":"Assignez ou réassignez vos entités à une pièce pour qu\'elles apparaissent dans les popups correspondants.","unassigned_none":"Toutes les entités sont assignées à une pièce.","unassigned_no_entities":"Aucune entité détectée.","unassigned_select_area":"Non assignée","unassigned_assigned":"Assignée","unassigned_count":"{count} entité(s) sans pièce","unassigned_no_results":"Aucun résultat.","unassigned_rename":"Renommer l\'entité"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete",collapse:"Collapse",expand:"Expand",move_up:"Move up",move_down:"Move down",none:"None",rooms:"Rooms"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSW",compass_SW:"SW",compass_WSW:"WSW",compass_W:"W",compass_WNW:"WNW",compass_NW:"NW",compass_NNW:"NNW"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},climate:{title:"Climate",target:"Target",current:"Current",range_low:"Low",range_high:"High",humidity_target:"Target humidity",aux_heat:"Auxiliary heat",unavailable:"Unavailable",mode_heat:"Heat",mode_cool:"Cool",mode_heat_cool:"Heat/Cool",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan only",mode_off:"Off",preset_eco:"Eco",preset_comfort:"Comfort",preset_boost:"Boost",preset_away:"Away",preset_sleep:"Sleep",preset_activity:"Activity",preset_none:"None",fan_mode:"Fan mode",swing_mode:"Swing mode",open_all_aria:"Turn on all climate devices",close_all_aria:"Turn off all climate devices",toggle_aria:"Toggle",expand_aria:"Details",temp_up_aria:"Increase temperature",temp_down_aria:"Decrease temperature",humidity_up_aria:"Increase humidity",humidity_down_aria:"Decrease humidity",range_low_aria:"Minimum temperature",range_high_aria:"Maximum temperature",no_climates:"No climate devices",turn_on_aria:"Turn on",turn_off_aria:"Turn off",action_heating:"Heating",action_cooling:"Cooling",action_idle:"Idle",action_off:"Off",action_drying:"Drying",current_label:"Current",controls_aria:"Controls",unknown:"Unknown",avg_label:"Avg.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room."},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}",clear_search:"Clear search"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",remove_from_queue:"Remove from queue",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",distance_m:"m",distance_km:"km"},camera:{title:"CAMERAS",idle:"Idle",streaming:"Streaming",recording:"Recording",off:"Off",unavailable:"Unavailable",no_cameras:"No cameras",prev_aria:"Previous camera",next_aria:"Next camera",dot_aria:"Go to {name}",power_on:"Turn on",power_off:"Turn off",snapshot:"Snapshot",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Disable motion detection",motion_off_aria:"Enable motion detection",siren_aria:"Siren",floodlight_aria:"Floodlight",auto_track_aria:"Auto tracking",tap_to_stream:"Tap to stream",camera_off:"Camera off",ai_person:"Person",ai_vehicle:"Vehicle",ai_pet:"Pet",ai_animal:"Animal",ai_package:"Package",ai_face:"Face",ai_baby_crying:"Baby",ai_bicycle:"Bicycle",dashboard_title:"CAMERAS",dashboard_title_one:"1 CAMERA"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Navbar","tab_popup":"Room Popup","tab_light":"Light Card","preview":"Preview","behavior":"Behavior","navbar_behavior":"Behavior","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","navbar_rooms_banner":"Drag to reorder rooms. Toggle to hide.","navbar_visible_rooms":"Visible rooms","navbar_empty_rooms":"Empty rooms","navbar_empty_rooms_desc":"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.","navbar_indicators":"Indicators","navbar_indicators_desc":"Enable or disable visual indicators on the navbar.","navbar_ind_lights":"Lights on","navbar_ind_lights_desc":"Golden glow on icon","navbar_ind_temp":"Temperature","navbar_ind_temp_desc":"Hot / cold badge","navbar_ind_humidity":"Humidity","navbar_ind_humidity_desc":"Blue bar at bottom","navbar_ind_media":"Media playing","navbar_ind_media_desc":"Icon bounce","navbar_thresholds":"Thresholds","navbar_thresholds_desc":"Set thresholds for temperature and humidity alerts.","navbar_temp_high":"High temperature","navbar_temp_low":"Low temperature","navbar_humidity_threshold":"Humidity threshold","navbar_choose_icon":"Choose icon","navbar_change_icon_aria":"Change icon for {name}","navbar_icon_label":"Icon — {name}","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_camera":"Cameras","domain_camera_desc":"Security cameras","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather Card","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_hourly":"Hourly forecast","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","tab_title":"Title Card","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_period_indicator":"Period indicator","title_period_info":"Create an input_select named \'periode_journee\' with options: Matin, Après-midi, Soir, Nuit. The indicator will appear automatically.","title_period_entity":"Period entity","title_period_entity_desc":"Select the input_select that controls the time of day period","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Period visuals","title_period_options_desc":"Customize the icon and color for each period","title_add_source":"Add a source","title_remove_source":"Remove source","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title Card","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather Card","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Light Card","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Cover Card","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify Card","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media Card","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media Card","dashboard_card_media_desc":"Shows media players with transport controls","tab_climate":"Climate","climate_desc":"Configure climate entities per room","climate_no_entities":"No climate entities in this room","climate_show_header":"Show header","climate_show_header_desc":"Title and counter above the card","climate_display_mode":"Display mode","climate_display_mode_popup":"Display mode (popup)","climate_display_mode_dashboard":"Display mode (dashboard)","climate_mode_list":"List","climate_mode_normal":"Normal","climate_select_room":"Select a room","climate_dashboard_entities":"Dashboard climate entities","climate_dashboard_entities_desc":"Select which climate entities to display on the dashboard.","dashboard_card_climate":"Climate","dashboard_card_climate_desc":"Thermostats and HVAC","dashboard_card_fan":"Fan Card","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence Card","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence Card","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fan Card","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Cover Card","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_compact":"Compact layout","cover_dashboard_compact_desc":"Display covers in a 2-column compact grid. When off, each cover takes the full width.","cover_dashboard_entities":"Dashboard covers","cover_dashboard_entities_desc":"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_camera_carousel":"Camera Card","camera_show_header":"Show header","camera_show_header_desc":"Title and counter above the card","camera_auto_cycle":"Auto cycle","camera_auto_cycle_desc":"Automatically cycle between cameras","camera_cycle_interval":"Interval (seconds)","camera_cycle_interval_desc":"Time between each camera switch","camera_entity_order":"Camera order","camera_entity_order_desc":"Drag to reorder cameras.","camera_no_cameras":"No cameras detected.","dashboard_card_camera_carousel":"Camera Card","dashboard_card_camera_carousel_desc":"Surveillance carousel with quick actions","tab_spotify":"Spotify Card","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player entity","spotify_entity_desc":"Select the Spotify media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Select which speakers appear in the playback popup. If none are selected, all speakers are shown.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings","tab_unassigned":"Room assignment","unassigned_desc":"Assign or reassign your entities to a room so they appear in the corresponding popups.","unassigned_none":"All entities are assigned to a room.","unassigned_no_entities":"No entities detected.","unassigned_select_area":"Unassigned","unassigned_assigned":"Assigned","unassigned_count":"{count} unassigned entity(ies)","unassigned_no_results":"No results.","unassigned_rename":"Rename entity"}')}},$e="fr";let ke=$e;function Se(e){const t=e.slice(0,2).toLowerCase(),i=t in xe?t:$e;return i!==ke&&(ke=i,!0)}function Ee(){return ke}function De(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),r=-1===i?"":e.slice(i+1),o=xe[ke]??xe[$e],n=xe[$e],s=o?.[a]?.[r]??n?.[a]?.[r];let c="string"==typeof s?s:e;if(t)for(const[d,l]of Object.entries(t))c=c.replaceAll(`{${d}}`,String(l));return c}var Ce=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,ze=(e,t,i,a)=>{for(var r,o=a>1?void 0:a?Pe(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(o=(a?r(t,i,o):r(o))||o);return a&&o&&Ce(t,i,o),o};class Ie extends se{constructor(){super(...arguments),this._lang=Ee()}set hass(e){this._hass=e,e?.language&&Se(e.language)&&(this._lang=Ee())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[fe,o`
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
    `]}render(){return this._lang,W`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${De("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${De("editor.open_config")}</a>
        </p>
      </div>
    `}}ze([he({attribute:!1})],Ie.prototype,"hass",1),ze([_e()],Ie.prototype,"_lang",2);try{customElements.define("glass-card-editor",Ie)}catch{}var Ae=Object.defineProperty,Oe=(e,t,i,a)=>{for(var r,o=void 0,n=e.length-1;n>=0;n--)(r=e[n])&&(o=r(t,i,o)||o);return o&&Ae(t,i,o),o};class Re extends se{constructor(){super(...arguments),this._lang=Ee(),this._busCleanups=[],this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&Se(this.hass.language)&&(this._lang=Ee())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0)}_listen(e,t){this._busCleanups.push(me.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function Te(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}function Me(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&Te(t,i)===e)}Oe([he({attribute:!1})],Re.prototype,"hass"),Oe([_e()],Re.prototype,"_lang");class He{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}const je=24,Ne=17,Le=65,Ve=["light","media_player","climate","fan","cover","camera","vacuum"],qe=new Set(["light","media_player","climate","cover","fan","camera"]),We={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum"},Ue={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},camera:{name:"config.domain_camera",desc:"config.domain_camera_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};const Ke=["mdi:sofa","mdi:stove","mdi:bed","mdi:desk","mdi:shower","mdi:home","mdi:movie-open","mdi:music","mdi:wrench","mdi:flower","mdi:white-balance-sunny","mdi:weather-night","mdi:lightbulb","mdi:snowflake","mdi:fire","mdi:lock"],Be={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"]};function Fe(e,t,i,a){const r=Be[t.deviceClass]||Be.shutter,o=e.hass?.states[t.entityId],n="open"===o?.state||"opening"===o?.state,s=o?.attributes.current_position;return W`
    <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;${i?"min-width:0;overflow:hidden;":"grid-column:1/-1;"}${a?"padding-left:8px;border-left:1px solid var(--b2);":""}">
      <div style="width:22px;height:22px;border-radius:var(--radius-xs);background:${n?"rgba(167,139,250,0.1)":"var(--s2)"};border:1px solid ${n?"rgba(167,139,250,0.15)":"var(--b1)"};display:flex;align-items:center;justify-content:center;">
        <ha-icon .icon=${r[n?0:1]} style="--mdc-icon-size:13px;color:${n?"#a78bfa":"var(--t3)"};display:flex;align-items:center;justify-content:center;${n?"filter:drop-shadow(0 0 4px rgba(167,139,250,0.4));":""}"></ha-icon>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${t.name}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
          <span style="font-size:8px;color:${n?"rgba(167,139,250,0.6)":"var(--t4)"};">${De(n?"cover.open":"cover.closed")}</span>
        </div>
      </div>
      ${i||void 0===s?B:W`
        <span style="font-size:12px;font-weight:700;color:${n?"#a78bfa":"var(--t3)"};font-variant-numeric:tabular-nums;">${s}<span style="font-size:8px;font-weight:500;">%</span></span>
      `}
      <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${n?"#a78bfa":"var(--t4)"};${n?"box-shadow:0 0 6px rgba(167,139,250,0.4);":""}"></div>
    </div>
  `}function Ye(e){const t=e._coverRoomEntities.filter(e=>e.visible),i=t.filter(t=>{const i=e.hass?.states[t.entityId];return"open"===i?.state||"opening"===i?.state}).length;return W`
    <div class="preview-cover">
      ${e._coverShowHeader?W`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${De("cover.title")}</span>
            <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:var(--radius-sm);background:${i>0?"rgba(167,139,250,0.15)":"var(--s2)"};color:${i>0?"#a78bfa":"var(--t3)"};">${i}/${t.length}</span>
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
      `:B}
      <div class="preview-cover-card glass" style="padding:8px 10px;display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;">
        <!-- Tint -->
        <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#a78bfa,transparent 70%);opacity:${t.length>0?(i/t.length*.18).toFixed(3):"0"};"></div>
        ${0===t.length?W`
          <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);grid-column:1/-1;">—</div>
        `:B}
        ${function(e,t){const i=[];let a=0;for(;a<t.length;){const r=t[a];"compact"===r.layout&&a+1<t.length&&"compact"===t[a+1].layout?(i.push(Fe(e,r,!0,!1)),i.push(Fe(e,t[a+1],!0,!0)),a+=2):(i.push(Fe(e,r,!1,!1)),a++)}return i}(e,t.slice(0,4))}
        ${t.length>4?W`
          <div style="font-size:9px;color:var(--t4);text-align:center;padding-top:2px;position:relative;z-index:1;grid-column:1/-1;">+${t.length-4}</div>
        `:B}
      </div>
    </div>
  `}function Ge(e,t,i,a){return new Date(t,i,a).getTime()}function Xe(e,t,i,a){const r=a?W`<div style="position:absolute;left:0;top:20%;bottom:20%;width:1px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.08) 30%,rgba(255,255,255,0.08) 70%,transparent);"></div>`:B;return W`
    <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;${i?"min-width:0;overflow:hidden;":"grid-column:1/-1;"}${a?"padding-left:8px;position:relative;":""}">
      ${r}
      <div style="width:22px;height:22px;border-radius:var(--radius-xs);background:${e.isOn?`${t}0.1)`:"var(--s2)"};border:1px solid ${e.isOn?`${t}0.15)`:"var(--b1)"};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <ha-icon .icon=${e.icon} style="--mdc-icon-size:13px;color:${e.isOn?"#818cf8":"var(--t3)"};display:flex;align-items:center;justify-content:center;${e.isOn?`filter:drop-shadow(0 0 4px ${t}0.4));animation:spin-fan-preview ${e.pct>50?"0.8":"1.5"}s linear infinite;`:""}"></ha-icon>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
          <span style="font-size:8px;color:${e.isOn?`${t}0.6)`:"var(--t4)"};">${e.isOn?`${e.pct}%`:De("fan.off")}</span>
          ${e.isOn?W`
            <span style="font-size:7px;color:var(--t4);">${De("fan.speed_step",{step:e.step,total:e.total})}</span>
          `:B}
        </div>
      </div>
      <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${e.isOn?"#818cf8":"var(--t4)"};${e.isOn?`box-shadow:0 0 6px ${t}0.4);`:""}"></div>
    </div>
  `}function Je(e){const t=e._fanRoomEntities.filter(e=>e.visible),i=0===t.length&&!e._fanRoom?[{name:"Ventilateur Salon",isOn:!0,pct:67,step:2,total:3,icon:"mdi:fan",layout:"compact"},{name:"Plafonnier Chambre",isOn:!0,pct:50,step:3,total:6,icon:"mdi:ceiling-fan",layout:"compact"},{name:"Extracteur SdB",isOn:!1,pct:0,step:0,total:3,icon:"mdi:fan",layout:"compact"}]:t.map(t=>{const i=e.hass?.states[t.entityId],a="on"===i?.state,r=i?.attributes?.percentage??0,o=i?.attributes?.percentage_step,n=i?.attributes?.speed_count,s=n??(o&&o>0?Math.round(100/o):3),c=a?Math.round(r/100*s):0;return{name:t.name,isOn:a,pct:r,step:c,total:s,icon:"mdi:fan",layout:t.layout}}),a=i.filter(e=>e.isOn).length,r="rgba(129,140,248,";return W`
    <div class="preview-fan">
      ${e._fanShowHeader?W`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${De("fan.title")}</span>
            <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:var(--radius-sm);background:${a>0?`${r}0.15)`:"var(--s2)"};color:${a>0?"#818cf8":"var(--t3)"};">${a}/${i.length}</span>
          </div>
          <div style="width:28px;height:14px;border-radius:var(--radius-sm);background:${a>0?`${r}0.25)`:"var(--s2)"};position:relative;">
            <div style="width:10px;height:10px;border-radius:50%;background:${a>0?"#818cf8":"var(--t4)"};position:absolute;top:2px;${a>0?"right:2px;":"left:2px;"}transition:all var(--t-fast);"></div>
          </div>
        </div>
      `:B}
      <div class="preview-fan-card glass" style="padding:8px 10px;display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;">
        <!-- Tint -->
        <div style="grid-column:1/-1;position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#818cf8,transparent 70%);opacity:${i.length>0?(a/i.length*.18).toFixed(3):"0"};"></div>
        ${0===i.length?W`
          <div style="grid-column:1/-1;padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
        `:B}
        ${function(e,t){const i=[];let a=0;for(;a<e.length;){const r=e[a];if("compact"===r.layout){const o=a+1<e.length&&"compact"===e[a+1].layout?e[a+1]:null;o?(i.push(Xe(r,t,!0,!1)),i.push(Xe(o,t,!0,!0)),a+=2):(i.push(Xe(r,t,!1,!1)),a++)}else i.push(Xe(r,t,!1,!1)),a++}return i}(i,r)}
      </div>
    </div>
  `}function Ze(e){if(!1===e._spotifyConfigured)return W`<div class="preview-empty">${De("config.spotify_not_configured")}</div>`;if(!e._spotifyEntity||!e.hass)return W`<div class="preview-empty">${De("config.spotify_select_entity")}</div>`;if(!e.hass.states[e._spotifyEntity])return W`<div class="preview-empty">${De("config.spotify_select_entity")}</div>`;const t=[{id:"all",label:De("spotify.tab_all"),active:!0},{id:"tracks",label:De("spotify.tab_tracks"),active:!1},{id:"playlists",label:De("spotify.tab_playlists"),active:!1},{id:"podcasts",label:De("spotify.tab_podcasts"),active:!1}],i=[{name:"Daily Mix 1",meta:De("spotify.type_playlist"),icon:"mdi:playlist-music"},{name:De("spotify.saved_tracks"),meta:"128 "+De("spotify.tracks_count",{count:""}).trim(),icon:"mdi:heart"},{name:"Discover Weekly",meta:De("spotify.type_playlist"),icon:"mdi:playlist-music"}];return W`
    <div class="preview-spotify-wrap">
      ${e._spotifyShowHeader?W`
        <div class="ps-card-header">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <span class="ps-card-title">${De("spotify.title")}</span>
        </div>
      `:B}
      <div class="preview-spotify">
        <div class="ps-search">
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <span class="ps-search-text">${De("spotify.search_placeholder")}</span>
        </div>
        <div class="ps-tabs">
          ${t.map(e=>W`
            <span class="ps-tab ${e.active?"active":""}">${e.label}</span>
          `)}
        </div>
        <div class="ps-section-label">${De("spotify.my_playlists")}</div>
        ${i.map(e=>W`
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
  `}const Qe=[{key:"input_select",label:"Input Select",icon:"mdi:form-select"},{key:"scenes",label:"Scènes",icon:"mdi:palette"},{key:"booleans",label:"Toggles",icon:"mdi:toggle-switch"}],et=["neutral","success","warning","info","accent","alert"],tt={success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t4)"},it=e=>tt[e]??(e.startsWith("#")?e:"var(--t4)"),at={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},rt={icon:"mdi:clock-outline",color:"var(--t3)"},ot="input_select.periode_journee";function nt(e){const t=e._titleText;if(!t)return W`<div class="preview-empty">${De("config.title_title_placeholder")}</div>`;const i=[];for(const n of e._titleSources)if("input_select"===n.source_type&&n.entity&&e.hass){const t=e.hass.states[n.entity];if(t){const e=n.modes.find(e=>e.id===t.state);e?.color&&"neutral"!==e.color&&i.push(e.color)}}else if("booleans"===n.source_type&&e.hass)for(const t of n.modes)if("on"===e.hass?.states[t.id]?.state){const e=t.color||"success";"neutral"!==e&&i.push(e)}const a=e._titleSources.length>0&&e._titleSources.some(e=>e.modes.length>0);let r="background:var(--t4);width:1.25rem;";if(i.length>0){const e=i.map(e=>it(e)),t=Math.min(20+4*i.length,36);if(1===e.length)r=`background:${e[0]};width:${t}px;box-shadow:0 0 6px ${e[0]};`;else{const i=e.length;r=`background:linear-gradient(90deg, ${e.flatMap((e,t)=>[`${e} ${Math.round(t/i*100)}%`,`${e} ${Math.round((t+1)/i*100)}%`]).join(", ")});width:${t}px;box-shadow:${e.map(e=>`0 0 6px ${e}`).join(", ")};`}}let o=B;if(e.hass){const t=e._titlePeriodEntity||ot,i=e.hass.states[t];if(i){const t=i.state,a=function(e,t){const i=t.find(t=>t.id===e);return i&&(i.icon||i.color)?{icon:i.icon||rt.icon,color:i.color||rt.color}:at[e]||rt}(t,e._titlePeriodOptions);o=W`
        <div class="preview-period" style="color:${a.color}">
          <ha-icon .icon=${a.icon} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;margin-right:4px;"></ha-icon>
          ${t}
        </div>
      `}}return W`
    <div class="preview-title-card">
      <div class="preview-title-text">${t}</div>
      ${o}
      ${a?W`
        <div class="preview-title-dash">
          <div class="preview-dash-line" style="${r}"></div>
        </div>
      `:B}
    </div>
  `}function st(e){const t=e._titleSources;return W`
    <div class="tab-panel" id="panel-title">
      <div class="section-label">${De("config.title_title")}</div>
      <div class="section-desc">${De("config.title_title_desc")}</div>
      <input
        class="input"
        type="text"
        .value=${e._titleText}
        placeholder=${De("config.title_title_placeholder")}
        @input=${t=>{e._titleText=t.target.value}}
      />

      <div class="section-label" style="margin-top:12px;">${De("config.title_mode_source")}</div>
      <div class="section-desc">${De("config.title_mode_source_desc")}</div>

      <!-- Existing sources -->
      ${t.map((t,i)=>function(e,t,i){const a=e._titleEditingSourceIdx===i,r=Qe.find(e=>e.key===t.source_type),o=t.label||r?.label||t.source_type,n=e._dragIdx===i&&"title_sources"===e._dragContext,s=e._dropIdx===i&&"title_sources"===e._dragContext;return W`
    <div
      class="title-source-block ${n?"dragging":""} ${s?"drop-target":""}"
      draggable="true"
      @dragstart=${()=>e._onDragStart(i,"title_sources")}
      @dragover=${t=>e._onDragOver(i,t)}
      @dragleave=${()=>e._onDragLeave()}
      @drop=${t=>e._onDropGeneric(i,t)}
      @dragend=${()=>e._onDragEnd()}
    >
      <div class="title-source-header">
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <ha-icon .icon=${r?.icon||"mdi:help"}></ha-icon>
        <span class="title-source-type">${o}</span>
        <span class="title-source-badge">${t.modes.length}</span>
        <div style="flex:1"></div>
        <button
          class="btn-icon xs"
          @click=${()=>{e._titleEditingSourceIdx=a?null:i,e._titleAddEntityDropdownOpen=!1}}
          aria-label=${De(a?"common.collapse":"common.expand")}
        >
          <ha-icon .icon=${a?"mdi:pencil":"mdi:pencil-outline"}></ha-icon>
        </button>
        <button
          class="btn-icon xs"
          @click=${()=>e._removeTitleSource(i)}
          aria-label=${De("config.title_remove_source")}
        >
          <ha-icon .icon=${"mdi:close"}></ha-icon>
        </button>
      </div>

      ${a?W`
        <div class="title-source-body">
          <!-- Label -->
          <div class="title-source-field">
            <span class="title-source-field-label">${De("config.title_source_label")}</span>
            <input
              class="input"
              type="text"
              .value=${t.label}
              placeholder=${r?.label||""}
              @input=${t=>e._setTitleSourceLabel(i,t.target.value)}
            />
          </div>

          ${"input_select"===t.source_type?function(e,t,i){const a=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith("input_select.")).sort():[];return W`
    <div class="title-source-field">
      <span class="title-source-field-label">${De("config.title_mode_entity")}</span>
      <div class="dropdown ${e._titleEditingSourceIdx===i&&e._titleAddEntityDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._titleAddEntityDropdownOpen||(e._titleAddEntitySearch=""),e._titleAddEntityDropdownOpen=!e._titleAddEntityDropdownOpen}}
          aria-expanded=${e._titleAddEntityDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t.entity?"mdi:form-select":"mdi:help-circle-outline"}></ha-icon>
          <span>${t.entity||De("config.title_select_entity")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${De("config.search_entity")}
            .value=${e._titleAddEntitySearch}
            @input=${t=>{e._titleAddEntitySearch=t.target.value,e.requestUpdate()}}
            @click=${e=>e.stopPropagation()}
          />
          <button
            class="dropdown-item ${t.entity?"":"active"}"
            role="option"
            aria-selected=${t.entity?"false":"true"}
            @click=${()=>e._setTitleSourceEntity(i,"")}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
            ${De("title_card.mode_none")}
          </button>
          ${a.filter(t=>!e._titleAddEntitySearch||t.toLowerCase().includes(e._titleAddEntitySearch.toLowerCase())).map(a=>W`
              <button
                class="dropdown-item ${a===t.entity?"active":""}"
                role="option"
                aria-selected=${a===t.entity?"true":"false"}
                @click=${()=>e._setTitleSourceEntity(i,a)}
              >
                <ha-icon .icon=${"mdi:form-select"}></ha-icon>
                ${a}
              </button>
            `)}
        </div>
      </div>
    </div>
  `}(e,t,i):B}

          <!-- Mode list -->
          ${t.modes.length>0?W`
            <div class="section-label" style="margin-top:10px;">${De("config.title_modes")}</div>
            <div class="title-modes-list">
              ${t.modes.map((a,r)=>function(e,t,i,a,r){let o=0;for(let c=0;c<i;c++)o+=e._titleSources[c].modes.length;o+=r;const n=e._dragIdx===r&&"title_modes"===e._dragContext&&e._dragModeSrcIdx===i,s=e._dropIdx===r&&"title_modes"===e._dragContext&&e._dragModeSrcIdx===i;return W`
    <div
      class="title-mode-row ${n?"dragging":""} ${s?"drop-target":""}"
      draggable="true"
      @dragstart=${()=>e._onDragStart(r,"title_modes",i)}
      @dragover=${t=>e._onDragOver(r,t,i)}
      @dragleave=${()=>e._onDragLeave()}
      @drop=${t=>e._onDropGeneric(r,t)}
      @dragend=${()=>e._onDragEnd()}
    >
      <div class="title-mode-header">
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <span class="title-mode-id">${a.id}</span>
        ${"scenes"===t.source_type||"booleans"===t.source_type?W`
          <button
            class="btn-icon xs"
            @click=${()=>e._removeTitleModeEntity(i,a.id)}
            aria-label=${De("config.title_remove_entity")}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        `:B}
      </div>
      <div class="title-mode-fields-row">
        <input
          class="input"
          type="text"
          placeholder=${De("config.title_mode_label")}
          .value=${a.label}
          @input=${t=>e._updateTitleMode(o,"label",t.target.value)}
        />
        <button
          class="title-icon-btn ${a.icon?"has-icon":""}"
          @click=${()=>e._openIconPopup(o)}
          aria-label="${De("config.title_mode_icon")}"
        >
          <ha-icon .icon=${a.icon||"mdi:emoticon-outline"}></ha-icon>
        </button>
      </div>
      <div class="title-color-row">
        <span class="title-color-label">${De("config.title_mode_color")}</span>
        <div class="title-color-chips">
          ${et.map(t=>W`
            <button
              class="title-color-chip ${t} ${a.color===t?"active":""}"
              @click=${()=>e._updateTitleMode(o,"color",t)}
              aria-label="${De("config.title_mode_color")}: ${t}"
            ></button>
          `)}
        </div>
      </div>
    </div>
  `}(e,t,i,a,r))}
            </div>
          `:B}

          ${"scenes"===t.source_type||"booleans"===t.source_type?function(e,t,i){const a="scenes"===t.source_type?"scene.":"input_boolean.",r="scenes"===t.source_type?"mdi:palette":"mdi:toggle-switch",o=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith(a)).sort():[],n=new Set(t.modes.map(e=>e.id)),s=o.filter(e=>!n.has(e));return W`
    <div class="title-source-field">
      <span class="title-source-field-label">${De("config.title_add_entity")}</span>
      <div class="dropdown ${e._titleEditingSourceIdx===i&&e._titleAddEntityDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._titleAddEntityDropdownOpen||(e._titleAddEntitySearch=""),e._titleAddEntityDropdownOpen=!e._titleAddEntityDropdownOpen}}
          aria-expanded=${e._titleAddEntityDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          <span>${De("config.title_add_entity")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${De("config.search_entity")}
            .value=${e._titleAddEntitySearch}
            @input=${t=>{e._titleAddEntitySearch=t.target.value,e.requestUpdate()}}
            @click=${e=>e.stopPropagation()}
          />
          ${s.filter(t=>!e._titleAddEntitySearch||t.toLowerCase().includes(e._titleAddEntitySearch.toLowerCase())).map(t=>W`
              <button
                class="dropdown-item"
                role="option"
                @click=${()=>e._addTitleModeEntity(i,t)}
              >
                <ha-icon .icon=${r}></ha-icon>
                ${t}
              </button>
            `)}
        </div>
      </div>
    </div>
  `}(e,t,i):B}
        </div>
      `:B}
    </div>
  `}(e,t,i))}

      <!-- Add source button -->
      <div style="margin-top:8px;">
        <div class="dropdown ${e._titleAddSourceDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{e._titleAddSourceDropdownOpen=!e._titleAddSourceDropdownOpen}}
            aria-expanded=${e._titleAddSourceDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:plus"}></ha-icon>
            <span>${De("config.title_add_source")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${Qe.map(t=>W`
              <button
                class="dropdown-item"
                role="option"
                @click=${()=>e._addTitleSource(t.key)}
              >
                <ha-icon .icon=${t.icon}></ha-icon>
                ${t.label}
              </button>
            `)}
          </div>
        </div>
      </div>

      <!-- Period indicator -->
      <div class="section-label" style="margin-top:16px;">${De("config.title_period_entity")}</div>
      <div class="section-desc">${De("config.title_period_entity_desc")}</div>
      ${function(e){const t=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith("input_select.")).sort():[],i=e._titlePeriodEntity;return W`
    <div class="dropdown ${e._titlePeriodDropdownOpen?"open":""}">
      <button
        class="dropdown-trigger"
        @click=${()=>{e._titlePeriodDropdownOpen||(e._titlePeriodSearch=""),e._titlePeriodDropdownOpen=!e._titlePeriodDropdownOpen}}
        aria-expanded=${e._titlePeriodDropdownOpen?"true":"false"}
        aria-haspopup="listbox"
      >
        <ha-icon .icon=${i?"mdi:form-select":"mdi:clock-outline"}></ha-icon>
        <span>${i||De("config.title_period_auto")}</span>
        <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
      </button>
      <div class="dropdown-menu" role="listbox">
        <input
          class="dropdown-search"
          type="text"
          placeholder=${De("config.search_entity")}
          .value=${e._titlePeriodSearch}
          @input=${t=>{e._titlePeriodSearch=t.target.value,e.requestUpdate()}}
          @click=${e=>e.stopPropagation()}
        />
        <button
          class="dropdown-item ${i?"":"active"}"
          role="option"
          aria-selected=${i?"false":"true"}
          @click=${()=>e._setTitlePeriodEntity("")}
        >
          <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
          ${De("config.title_period_auto")}
        </button>
        ${t.filter(t=>!e._titlePeriodSearch||t.toLowerCase().includes(e._titlePeriodSearch.toLowerCase())).map(t=>W`
            <button
              class="dropdown-item ${t===i?"active":""}"
              role="option"
              aria-selected=${t===i?"true":"false"}
              @click=${()=>e._setTitlePeriodEntity(t)}
            >
              <ha-icon .icon=${"mdi:form-select"}></ha-icon>
              ${t}
            </button>
          `)}
      </div>
    </div>
  `}(e)}

      ${function(e){const t=e._titlePeriodEntity||ot,i=e.hass?.states[t],a=i?.attributes?.options??[];if(0===a.length)return B;const r=new Map(e._titlePeriodOptions.map(e=>[e.id,e]));return W`
    <div class="section-label" style="margin-top:12px;">${De("config.title_period_options")}</div>
    <div class="section-desc">${De("config.title_period_options_desc")}</div>
    <div class="title-modes-list">
      ${a.map(t=>{const i=r.get(t),a=e._titlePeriodOptions.findIndex(e=>e.id===t),o=i?.icon||"",n=i?.color||"",s=at[t]||rt;return-1===a?(e._titlePeriodOptions=[...e._titlePeriodOptions,{id:t,label:t,icon:"",color:""}],B):W`
          <div class="title-mode-row">
            <div class="title-mode-header">
              <ha-icon .icon=${o||s.icon} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;color:${it(n||at[t]?.color||"neutral")}"></ha-icon>
              <span class="title-mode-id">${t}</span>
            </div>
            <div class="title-mode-fields-row">
              <button
                class="title-icon-btn ${o?"has-icon":""}"
                @click=${()=>e._openPeriodIconPopup(a)}
                aria-label="${De("config.title_mode_icon")}"
              >
                <ha-icon .icon=${o||"mdi:emoticon-outline"}></ha-icon>
              </button>
            </div>
            <div class="title-color-row">
              <span class="title-color-label">${De("config.title_mode_color")}</span>
              <div class="title-color-chips">
                ${et.map(t=>W`
                  <button
                    class="title-color-chip ${t} ${n===t?"active":""}"
                    @click=${()=>e._updateTitlePeriodOption(a,"color",t)}
                    aria-label="${De("config.title_mode_color")}: ${t}"
                  ></button>
                `)}
              </div>
            </div>
          </div>
        `})}
    </div>
  `}(e)}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadTitleConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `}const ct=["compass_N","compass_NNE","compass_NE","compass_ENE","compass_E","compass_ESE","compass_SE","compass_SSE","compass_S","compass_SSW","compass_SW","compass_WSW","compass_W","compass_WNW","compass_NW","compass_NNW"];function dt(e){if(!e.hass)return;const t=Object.keys(e.hass.states).filter(e=>e.startsWith("camera.")).sort(),i=new Set(t),a=e._cameraEntityOrder.filter(e=>i.has(e)),r=new Set(a);for(const o of t)r.has(o)||a.push(o);e._cameraEntityOrder=a}function lt(e){const t=e._climateRoomEntities;return 0===t.length?W`<div style="padding:12px;text-align:center;font-size:11px;color:var(--t4);">${De("config.climate_no_entities")}</div>`:"normal"===e._climateDisplayMode?function(e){const t=60,i=62,a=40,r=-120,o=120,n=e=>(e-90)*Math.PI/180,s=e=>({x:t+a*Math.cos(n(e)),y:i+a*Math.sin(n(e))}),c=s(r),d=s(o),l=`M ${c.x} ${c.y} A ${a} ${a} 0 1 1 ${d.x} ${d.y}`,p=Math.PI*a*(240/180),h=.6*p,_=s(r+168),m=e.filter(e=>e.visible);return W`
    <div style="padding:6px 10px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span style="font-size:12px;font-weight:600;color:var(--t1);">${De("climate.title")}</span>
      </div>
      ${m.length>1?W`
        <div style="display:flex;gap:4px;margin-bottom:4px;">
          ${m.slice(0,4).map((e,t)=>W`
            <span style="font-size:9px;padding:2px 6px;border-radius:var(--radius-sm);${0===t?"background:var(--s3);color:var(--t1);font-weight:600;":"color:var(--t3);"}">${e.name.length>8?e.name.slice(0,8)+"…":e.name}</span>
          `)}
        </div>
      `:B}
      <div style="display:flex;justify-content:center;">
        <svg viewBox="0 0 120 80" fill="none" style="width:100px;height:68px;">
          ${U`
            <path d=${l} stroke="var(--s3)" stroke-width="4" fill="none" stroke-linecap="round" />
            <path d=${l} stroke="var(--c-warning)" stroke-width="4" fill="none" stroke-linecap="round"
              stroke-dasharray=${p} stroke-dashoffset=${p-h} />
            <circle cx=${_.x} cy=${_.y} r="3" fill="var(--t1)" />
            <text x=${t} y=${i-4} text-anchor="middle" fill="var(--t1)" font-size="14" font-weight="700">21.5°</text>
            <text x=${t} y=${i+8} text-anchor="middle" fill="var(--t3)" font-size="7">
              <tspan>🔥</tspan> ${De("climate.action_heating")}
            </text>
          `}
        </svg>
      </div>
    </div>
  `}(t):function(e){const t=e.filter(e=>e.visible).length,i=e.length;return W`
    <div style="padding:6px 10px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;font-weight:600;color:var(--t1);">${De("climate.title")}</span>
        <span style="min-width:14px;height:14px;padding:0 4px;font-size:9px;font-weight:600;border-radius:var(--radius-sm);background:var(--s3);color:var(--t2);display:flex;align-items:center;justify-content:center;">${t}/${i}</span>
      </div>
      ${e.slice(0,4).map(e=>W`
        <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;opacity:${e.visible?"1":"0.3"};">
          <ha-icon .icon=${"mdi:thermostat"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;color:var(--t3);"></ha-icon>
          <span style="font-size:11px;color:var(--t2);flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</span>
          <span style="font-size:10px;color:var(--t4);flex-shrink:0;">--°C</span>
          <span style="width:5px;height:5px;border-radius:50%;background:var(--t4);flex-shrink:0;"></span>
        </div>
      `)}
      ${e.length>4?W`<div style="font-size:10px;color:var(--t4);text-align:center;padding:4px;">+${e.length-4}</div>`:B}
    </div>
  `}(t)}function pt(e){if(!e.hass)return B;const t=e._rooms,i=e._climateRoom,a=e._climateRoomEntities,r=e._climateRoomDropdownOpen,o=function(e){if(!e.hass)return[];const t=[];for(const[i,a]of Object.entries(e.hass.states)){if(!i.startsWith("climate."))continue;const e=a.attributes?.friendly_name||i.split(".")[1]||i;t.push({entityId:i,name:e})}return t.sort((e,t)=>e.name.localeCompare(t.name))}(e);return W`
    <div class="tab-panel" id="panel-climate">
      <div class="section-label">${De("config.tab_climate")}</div>
      <div class="section-desc">${De("config.climate_desc")}</div>

      <!-- Room selector -->
      <div class="dropdown ${r?"open":""}">
        <button class="dropdown-trigger"
          @click=${()=>{e._climateRoomDropdownOpen=!r}}
          aria-expanded=${r?"true":"false"}
          aria-haspopup="listbox">
          <span>${t.find(e=>e.areaId===i)?.name??De("config.climate_select_room")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${t.map(t=>W`
            <button class="dropdown-item ${t.areaId===i?"active":""}"
              role="option" aria-selected=${t.areaId===i?"true":"false"}
              @click=${()=>ht(e,t.areaId)}>
              <ha-icon .icon=${t.icon||"mdi:home"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${t.name}
            </button>
          `)}
        </div>
      </div>

      <!-- Display mode selector (popup) -->
      <div class="section-label" style="margin-top:14px;font-size:11px;">${De("config.climate_display_mode_popup")}</div>
      <div style="display:flex;gap:6px;margin-top:6px;">
        <button class="chip ${"list"===e._climateDisplayMode?"active":""}"
          @click=${()=>{e._climateDisplayMode="list"}}
          aria-pressed=${"list"===e._climateDisplayMode?"true":"false"}>
          <ha-icon .icon=${"mdi:format-list-bulleted"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          ${De("config.climate_mode_list")}
        </button>
        <button class="chip ${"normal"===e._climateDisplayMode?"active":""}"
          @click=${()=>{e._climateDisplayMode="normal"}}
          aria-pressed=${"normal"===e._climateDisplayMode?"true":"false"}>
          <ha-icon .icon=${"mdi:gauge"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          ${De("config.climate_mode_normal")}
        </button>
      </div>

      <!-- Display mode selector (dashboard) -->
      <div class="section-label" style="margin-top:10px;font-size:11px;">${De("config.climate_display_mode_dashboard")}</div>
      <div style="display:flex;gap:6px;margin-top:6px;">
        <button class="chip ${"list"===e._climateDashboardDisplayMode?"active":""}"
          @click=${()=>{e._climateDashboardDisplayMode="list"}}
          aria-pressed=${"list"===e._climateDashboardDisplayMode?"true":"false"}>
          <ha-icon .icon=${"mdi:format-list-bulleted"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          ${De("config.climate_mode_list")}
        </button>
        <button class="chip ${"normal"===e._climateDashboardDisplayMode?"active":""}"
          @click=${()=>{e._climateDashboardDisplayMode="normal"}}
          aria-pressed=${"normal"===e._climateDashboardDisplayMode?"true":"false"}>
          <ha-icon .icon=${"mdi:gauge"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          ${De("config.climate_mode_normal")}
        </button>
      </div>

      <!-- Show header toggle -->
      <div class="check-item" style="margin-top:12px;">
        <button class="check-box ${e._climateShowHeader?"on":""}"
          role="switch" aria-checked=${e._climateShowHeader?"true":"false"}
          aria-label=${De("config.climate_show_header")}
          @click=${()=>{e._climateShowHeader=!e._climateShowHeader}}>
          <ha-icon .icon=${e._climateShowHeader?"mdi:check":""} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </button>
        <span>${De("config.climate_show_header")}</span>
      </div>

      <!-- Dashboard entities -->
      ${o.length>0?W`
        <div class="section-label" style="margin-top:14px;">${De("config.climate_dashboard_entities")}</div>
        <div class="section-desc">${De("config.climate_dashboard_entities_desc")}</div>
        <div class="item-list">
          ${o.map(t=>{const i=e._climateDashboardEntities.includes(t.entityId);return W`
              <div class="item-row ${i?"":"disabled"}">
                <div class="item-info">
                  <span class="item-name">${t.name}</span>
                  <span class="item-meta">${t.entityId}</span>
                </div>
                <button
                  class="toggle ${i?"on":""}"
                  @click=${()=>mt(e,t.entityId)}
                  role="switch"
                  aria-checked=${i?"true":"false"}
                  aria-label="${De(i?"common.hide":"common.show")} ${t.name}"
                ></button>
              </div>
            `})}
        </div>
      `:B}

      <!-- Entity list -->
      ${0===a.length?W`
        <div class="banner" style="margin-top:12px;">
          <ha-icon .icon=${"mdi:thermostat"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          <span>${De("config.climate_no_entities")}</span>
        </div>
      `:W`
        <div class="item-list" style="margin-top:12px;">
          ${a.map((t,i)=>{const a=e._dragIdx===i&&"climates"===e._dragContext,r=e._dropIdx===i&&"climates"===e._dragContext,o=["item-row",t.visible?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return W`
              <div
                class=${o}
                draggable="true"
                @dragstart=${()=>e._onDragStart(i,"climates")}
                @dragover=${t=>e._onDragOver(i,t)}
                @dragleave=${()=>e._onDragLeave()}
                @drop=${t=>e._onDropGeneric(i,t)}
                @dragend=${()=>e._onDragEnd()}
              >
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
                <div class="item-info" style="flex:1;min-width:0;">
                  <span class="item-name">${t.name}</span>
                  <span class="item-meta">${t.entityId}</span>
                </div>
                <button
                  class="toggle ${t.visible?"on":""}"
                  @click=${()=>_t(e,t.entityId)}
                  role="switch"
                  aria-checked=${t.visible?"true":"false"}
                  aria-label="${t.visible?De("common.hide"):De("common.show")} ${t.name}"
                ></button>
              </div>
            `})}
        </div>
      `}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadClimateConfig()}>${De("common.reset")}</button>
        <button class="btn btn-accent" @click=${()=>e._saveClimate()}>${De("common.save")}</button>
      </div>
    </div>
  `}function ht(e,t){e._climateRoom=t,e._climateRoomDropdownOpen=!1,e._loadRoomClimates()}function _t(e,t){e._climateRoomEntities=e._climateRoomEntities.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}function mt(e,t){const i=new Set(e._climateDashboardEntities);i.has(t)?i.delete(t):i.add(t),e._climateDashboardEntities=[...i]}const ut=["light","cover","climate","fan","media_player","camera"];function gt(e){if(!e.hass)return B;const t=e._unassignedEntities,i=Object.values(e.hass.areas).sort((e,t)=>e.name.localeCompare(t.name)),a=e._unassignedEntitySearch.toLowerCase(),r=e._unassignedAreaSearch.toLowerCase(),o=a?t.filter(e=>e.name.toLowerCase().includes(a)||e.entityId.toLowerCase().includes(a)):t,n=new Map;for(const d of o){const e=n.get(d.domain)??[];e.push(d),n.set(d.domain,e)}const s=t.filter(e=>!e.areaId).length,c=r?i.filter(e=>e.name.toLowerCase().includes(r)):i;return W`
    <div class="tab-panel" id="panel-unassigned">
      <div class="section-label">${De("config.tab_unassigned")}</div>
      <div class="section-desc">${De("config.unassigned_desc")}</div>

      ${s>0?W`
        <div class="banner" style="color:var(--c-warning);">
          <ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon>
          <span>${De("config.unassigned_count",{count:String(s)})}</span>
        </div>
      `:B}

      ${0===t.length?W`
        <div class="banner">
          <ha-icon .icon=${"mdi:help-circle-outline"}></ha-icon>
          <span>${De("config.unassigned_no_entities")}</span>
        </div>
      `:W`
        <!-- Entity search -->
        <input
          type="text"
          class="dropdown-search"
          style="width:100%;margin:8px 0;"
          placeholder="${De("config.search_entity")}"
          aria-label="${De("config.search_entity")}"
          .value=${e._unassignedEntitySearch}
          @input=${t=>{e._unassignedEntitySearch=t.target.value}}
        />

        ${0===o.length?W`
          <div class="banner">
            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
            <span>${De("config.unassigned_no_results")}</span>
          </div>
        `:B}

        ${[...n.entries()].map(([t,i])=>W`
          <div class="section-label" style="margin-top:16px;display:flex;align-items:center;">
            <ha-icon .icon=${function(e){return We[e]??"mdi:help-circle"}(t)} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;margin-right:6px;"></ha-icon>
            ${function(e){const t=Ue[e];return t?De(t.name):e}(t)}
            <span style="margin-left:0.375rem;font-size:var(--fz-base);font-weight:500;color:var(--t3);">(${i.length})</span>
          </div>
          <div class="item-list">
            ${i.map(t=>{const i=e._unassignedDropdownEntity===t.entityId,a=e._unassignedEditingEntity===t.entityId;return W`
                <div class="item-row">
                  <div class="item-info" style="flex:1;min-width:0;">
                    ${a?W`
                      <input
                        type="text"
                        class="entity-rename-input"
                        .value=${t.name}
                        aria-label="${De("config.unassigned_rename")}"
                        @blur=${i=>{const a=i.target;a.dataset.cancelled||e._renameEntity(t.entityId,a.value)}}
                        @keydown=${t=>{"Enter"===t.key&&t.target.blur(),"Escape"===t.key&&(t.target.dataset.cancelled="1",e._unassignedEditingEntity=null)}}
                        @focus=${e=>e.target.select()}
                      />
                    `:W`
                      <button
                        class="item-name entity-name-btn"
                        @click=${()=>{e._unassignedEditingEntity=t.entityId,e.updateComplete.then(()=>{const t=e.shadowRoot?.querySelector(".entity-rename-input");t?.focus()})}}
                        title="${De("config.unassigned_rename")}"
                        aria-label="${De("config.unassigned_rename")}: ${t.name}"
                      >
                        ${t.name}
                        <ha-icon .icon=${"mdi:pencil"} style="--mdc-icon-size:var(--icon-sm);color:var(--t4);display:flex;align-items:center;justify-content:center;flex-shrink:0;"></ha-icon>
                      </button>
                    `}
                    <span class="item-meta">${t.entityId}</span>
                  </div>
                  <div class="dropdown ${i?"open":""}" style="flex-shrink:0;max-width:160px;">
                    <button
                      class="dropdown-trigger"
                      style="padding:0.25rem 0.5rem;font-size:var(--fz-base);min-width:0;${t.areaId?"":"color:var(--c-warning);"}"
                      @click=${a=>{a.stopPropagation(),e._unassignedAreaSearch="",e._unassignedDropdownEntity=i?null:t.entityId}}
                      aria-expanded=${i?"true":"false"}
                      aria-haspopup="listbox"
                    >
                      <span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${t.areaName??De("config.unassigned_select_area")}</span>
                      <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                    </button>
                    <div class="dropdown-menu" role="listbox">
                      <input
                        type="text"
                        class="dropdown-search"
                        placeholder="${De("config.search_entity")}"
                        aria-label="${De("config.search_entity")}"
                        .value=${e._unassignedAreaSearch}
                        @input=${t=>{e._unassignedAreaSearch=t.target.value}}
                        @click=${e=>e.stopPropagation()}
                      />
                      ${c.map(i=>W`
                        <button
                          class="dropdown-item ${i.area_id===t.areaId?"active":""}"
                          role="option"
                          aria-selected=${i.area_id===t.areaId?"true":"false"}
                          @click=${()=>e._assignEntityArea(t.entityId,i.area_id)}
                        >
                          <ha-icon .icon=${i.icon||"mdi:home"}></ha-icon>
                          ${i.name}
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
        <button class="btn btn-ghost" @click=${()=>e._loadUnassignedEntities()}>${De("common.reset")}</button>
      </div>
    </div>
  `}async function vt(e){if(e.hass&&!e._loading){e._loading=!0;try{await async function(e){if(!e.hass)return;const t=Object.values(e.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let i={room_order:[],hidden_rooms:[],show_lights:!0,show_temperature:!0,show_humidity:!0,show_media:!0,auto_sort:!0,temp_high:je,temp_low:Ne,humidity_threshold:Le},a={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},r={enabled_cards:["weather"],card_order:["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],hide_header:!1,hide_sidebar:!1},o={show_header:!0},n={title:"",sources:[],period_entity:"",period_options:[]},s={show_header:!0,dashboard_entities:[],dashboard_compact:!0,presets:[0,25,50,75,100],entity_presets:{}},c={show_header:!0,entity_id:"",sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},d={show_header:!0},l={extra_entities:{},show_header:!0},p={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}},h={show_header:!0,display_mode:"list",dashboard_display_mode:"list",dashboard_entities:[]},_={show_header:!0,entity_order:[],auto_cycle:!1,cycle_interval:10};const m={};try{if(!e._backend)throw new Error("No backend");const t=await e._backend.send("get_config");i=t.navbar,Object.assign(m,t.rooms),t.weather&&(a=t.weather),t.light_card&&(o=t.light_card),t.title_card&&(n=t.title_card),t.cover_card&&(s=t.cover_card),t.fan_card&&(d=t.fan_card),t.spotify_card&&(c=t.spotify_card),t.media_card&&(l=t.media_card),t.presence_card&&(p=t.presence_card),t.climate_card&&(h=t.climate_card),t.camera_carousel&&(_=t.camera_carousel),t.dashboard&&(r=t.dashboard)}catch{}e._showLights=i.show_lights??!0,e._showTemperature=i.show_temperature??!0,e._showHumidity=i.show_humidity??!0,e._showMedia=i.show_media??!0,e._autoSort=i.auto_sort??!0,e._tempHigh=i.temp_high??je,e._tempLow=i.temp_low??Ne,e._humidityThreshold=i.humidity_threshold??Le,e._weatherEntity=a.entity_id??"",e._weatherHiddenMetrics=a.hidden_metrics??[],e._weatherShowDaily=a.show_daily??!0,e._weatherShowHourly=a.show_hourly??!0,e._weatherShowHeader=a.show_header??!0,e._lightShowHeader=o.show_header??!0,e._titleText=n.title??"",e._titlePeriodEntity=n.period_entity??"",e._titlePeriodOptions=(n.period_options??[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||""})),e._titleSources=(n.sources??[]).map(e=>({source_type:e.source_type||"",entity:e.entity||"",label:e.label||"",modes:(e.modes||[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"}))})),e._coverShowHeader=s.show_header??!0,e._fanShowHeader=d.show_header??!0,e._coverDashboardEntities=s.dashboard_entities??[],e._coverDashboardCompact=s.dashboard_compact??!0,e._coverPresets=s.presets??[0,25,50,75,100],e._coverEntityPresets=s.entity_presets??{},e._initCoverDashboardOrder(),e._spotifyShowHeader=c.show_header??!0,e._spotifyEntity=c.entity_id??"",e._spotifySortOrder="oldest_first"===c.sort_order?"oldest_first":"recent_first",e._spotifyMaxItems=c.max_items_per_section??6,e._spotifyVisibleSpeakers=c.visible_speakers??[],e._checkSpotifyStatus(),e._mediaShowHeader=l.show_header??!0,e._mediaExtraEntities=l.extra_entities??{},e._presenceShowHeader=p.show_header??!0,e._presencePersonEntities=p.person_entities??[],e._presenceSmartphoneSensors=p.smartphone_sensors??{},e._presenceNotifyServices=p.notify_services??{},e._presenceDrivingSensors=p.driving_sensors??{},e._climateShowHeader=h.show_header??!0,e._climateDisplayMode="normal"===h.display_mode?"normal":"list",e._climateDashboardDisplayMode="normal"===h.dashboard_display_mode?"normal":"list",e._climateDashboardEntities=h.dashboard_entities??[],e._cameraShowHeader=_.show_header??!0,e._cameraEntityOrder=_.entity_order??[],e._cameraAutoCycle=_.auto_cycle??!1,e._cameraCycleInterval=_.cycle_interval??10,e._dashboardEnabledCards=r.enabled_cards??["weather"],e._dashboardCardOrder=r.card_order??["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],e._dashboardHideHeader=r.hide_header??!1,e._dashboardHideSidebar=r.hide_sidebar??!1;const u=new Set(i.hidden_rooms),g=new Map;i.room_order.forEach((e,t)=>g.set(e,t));const v=e.hass;if(!v)return;const f=[],b=[];for(const y of t){const e=Me(y.area_id,v.entities,v.devices),t=m[y.area_id]?.icon,i=t||y.icon||"mdi:home";if(0===e.length){b.push({areaId:y.area_id,name:y.name,icon:i});continue}let a=0,r=null,o=null,n=null,s=null,c=!1;for(const d of e){const e=v.states[d.entity_id];if(!e)continue;const t=d.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&a++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||r||(r=`${e.state}°`,o=parseFloat(e.state)),"humidity"!==t||n||(n=`${e.state}%`,s=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(c=!0)}f.push({areaId:y.area_id,name:y.name,icon:i,entityCount:e.length,visible:!u.has(y.area_id),lightsOn:a,temperature:r,tempValue:o,humidity:n,humidityValue:s,mediaPlaying:c})}e._initialIcons.clear();for(const y of f)e._initialIcons.set(y.areaId,y.icon);f.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=g.get(e.areaId),a=g.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),e._rooms=f,e._emptyRooms=b,!e._selectedRoom&&f.length>0&&(e._selectedRoom=f[0].areaId);e._loadRoomCards()}(e),e._loaded=!0}catch{e._loaded=!1}finally{e._loading=!1}}}async function ft(e){if(!e.hass||!e._selectedRoom)return e._cards=[],void(e._scenes=[]);const t=e._selectedRoom,i=Me(t,e.hass.entities,e.hass.devices);let a=null,r=new Set,o=new Set,n=[];try{if(!e._backend)throw new Error("No backend");const i=await e._backend.send("get_room",{area_id:t});if(e._selectedRoom!==t)return;i&&(a=i.card_order.length>0?i.card_order:null,r=new Set(i.hidden_entities),o=new Set(i.hidden_scenes??[]),n=i.scene_order??[])}catch{}const s=e.hass,c=i.filter(e=>e.entity_id.startsWith("scene.")),d=new Map;n.forEach((e,t)=>d.set(e,t));const l=c.map(e=>{const t=s.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!o.has(e.entity_id)}});l.sort((e,t)=>{const i=d.get(e.entityId),a=d.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),e._scenes=l;const p=new Map;for(const m of i){if(r.has(m.entity_id))continue;const e=m.entity_id.split(".")[0];p.set(e,(p.get(e)||0)+1)}const h=a?[...a]:[...Ve],_=new Set(h);for(const m of p.keys())!_.has(m)&&We[m]&&h.push(m);e._cards=h.filter(e=>(p.get(e)||0)>0&&qe.has(e)).map(e=>{const t=function(e){const t=Ue[e];return{nameKey:t?t.name:null,icon:We[e]||"mdi:help-circle",descKey:t?t.desc:null}}(e),i=p.get(e)||0;return{id:e,nameKey:t.nameKey,icon:t.icon,descKey:t.descKey,count:i,visible:a?a.includes(e):i>0}})}async function bt(e){if(e._beginSuppressAutoSave(),!e.hass||!e._lightRoom)return void(e._lights=[]);const t=e._lightRoom,i=Me(t,e.hass.entities,e.hass.devices).filter(e=>e.entity_id.startsWith("light."));let a=new Set,r=[],o={};try{if(!e._backend)throw new Error("No backend");const i=await e._backend.send("get_room",{area_id:t});if(e._lightRoom!==t)return;i&&(a=new Set(i.hidden_entities??[]),r=i.entity_order??[],o=i.entity_layouts??{})}catch{}const n=e.hass,s=new Map;r.forEach((e,t)=>s.set(e,t));const c=i.map(e=>{const t=n.states[e.entity_id],i="on"===t?.state,r=t?.attributes.brightness,s=i&&void 0!==r?Math.round(r/255*100):0;return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:i,brightnessPct:s,layout:o[e.entity_id]||"compact",visible:!a.has(e.entity_id)}});c.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=s.get(e.entityId),a=s.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),e._lights=c;try{if(e._backend){const i=await e._backend.send("get_schedules");if(e._lightRoom!==t)return;e._schedulesLoaded=i??{},e._scheduleEdits=new Map;for(const t of c){const i=e._schedulesLoaded[t.entityId];e._scheduleEdits.set(t.entityId,i?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}async function yt(e){if(!e._backend||!e._coverRoom||!e.hass)return;const t=e._coverRoom,i=Me(t,e.hass.entities,e.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id);let a=null;try{a=await e._backend.send("get_room",{area_id:t})}catch{}if(e._coverRoom!==t)return;const r=new Set(a?.hidden_entities??[]),o=a?.entity_order??[],n=a?.entity_layouts??{},s=[...i].sort((e,t)=>{const i=o.indexOf(e),a=o.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});e._coverRoomEntities=s.map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t,o=i?.attributes?.device_class||"shutter";return{entityId:t,name:a,visible:!r.has(t),deviceClass:o,layout:n[t]||"compact"}})}async function wt(e){if(!e._backend||!e._fanRoom||!e.hass)return;const t=e._fanRoom,i=Me(t,e.hass.entities,e.hass.devices).filter(e=>e.entity_id.startsWith("fan.")).map(e=>e.entity_id);let a=null;try{a=await e._backend.send("get_room",{area_id:t})}catch{}if(e._fanRoom!==t)return;const r=new Set(a?.hidden_entities??[]),o=a?.entity_order??[],n=a?.entity_layouts??{},s=[...i].sort((e,t)=>{const i=o.indexOf(e),a=o.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});e._fanRoomEntities=s.map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t;return{entityId:t,name:a,visible:!r.has(t),layout:n[t]||"compact"}})}async function xt(e){if(e._beginSuppressAutoSave(),!e.hass||!e._climateRoom||!e._backend)return;const t=e._climateRoom,i=Me(t,e.hass.entities,e.hass.devices).filter(e=>e.entity_id.startsWith("climate.")).map(e=>e.entity_id);let a=[],r=[];try{const i=await e._backend.send("get_room",{area_id:t});a=i?.hidden_entities||[],r=i?.entity_order||[]}catch{}if(e._climateRoom!==t)return;const o=new Map(r.map((e,t)=>[e,t])),n=[...i].sort((e,t)=>{const i=o.get(e)??999,a=o.get(t)??999;return i!==a?i-a:e.localeCompare(t)});e._climateRoomEntities=n.map(t=>{const i=e.hass?.states[t],r=i?.attributes?.friendly_name||t.split(".")[1]||t;return{entityId:t,name:r,visible:!a.includes(t)}})}async function $t(e){if(e._backend&&!e._saving){e._saving=!0;try{const t=e._climateRoomEntities.map(e=>e.entityId),i=e._climateRoomEntities.filter(e=>!e.visible).map(e=>e.entityId);if(await e._backend.send("set_climate_config",{show_header:e._climateShowHeader,display_mode:e._climateDisplayMode,dashboard_display_mode:e._climateDashboardDisplayMode,dashboard_entities:e._climateDashboardEntities}),e._climateRoom&&e._climateRoomEntities.length>0){let a=[],r=[];try{const t=await e._backend.send("get_room",{area_id:e._climateRoom});t&&(a=t.hidden_entities??[],r=t.entity_order??[])}catch{}const o=new Set(e._climateRoomEntities.map(e=>e.entityId)),n=a.filter(e=>!o.has(e)),s=r.filter(e=>!o.has(e));await e._backend.send("set_room",{area_id:e._climateRoom,hidden_entities:[...n,...i],entity_order:[...s,...t]}),me.emit("room-config-changed",{areaId:e._climateRoom})}if(!e._mounted)return;e._showToast(),me.emit("climate-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}async function kt(e){if(e._backend&&!e._saving){e._saving=!0;try{await e._backend.send("set_dashboard",{enabled_cards:e._dashboardEnabledCards,card_order:e._dashboardCardOrder,hide_header:e._dashboardHideHeader,hide_sidebar:e._dashboardHideSidebar}),await e._backend.send("set_light_config",{show_header:e._lightShowHeader}),await e._backend.send("set_weather",{show_header:e._weatherShowHeader});const t=e._coverDashboardOrder.filter(t=>e._coverDashboardEntities.includes(t));if(await e._backend.send("set_cover_config",{show_header:e._coverShowHeader,dashboard_compact:e._coverDashboardCompact,dashboard_entities:t,presets:e._coverPresets,entity_presets:e._coverEntityPresets}),await e._backend.send("set_spotify_config",{show_header:e._spotifyShowHeader}),await e._backend.send("set_fan_config",{show_header:e._fanShowHeader}),await e._backend.send("set_media_config",{show_header:e._mediaShowHeader,extra_entities:e._mediaExtraEntities}),await e._backend.send("set_presence_config",{show_header:e._presenceShowHeader,person_entities:e._presencePersonEntities,smartphone_sensors:e._presenceSmartphoneSensors,notify_services:e._presenceNotifyServices,driving_sensors:e._presenceDrivingSensors}),await e._backend.send("set_climate_config",{show_header:e._climateShowHeader,display_mode:e._climateDisplayMode,dashboard_display_mode:e._climateDashboardDisplayMode,dashboard_entities:e._climateDashboardEntities}),await e._backend.send("set_camera_carousel_config",{show_header:e._cameraShowHeader,entity_order:e._cameraEntityOrder,auto_cycle:e._cameraAutoCycle,cycle_interval:e._cameraCycleInterval}),!e._mounted)return;e._showToast(),me.emit("dashboard-config-changed",void 0),me.emit("light-config-changed",void 0),me.emit("weather-config-changed",void 0),me.emit("cover-config-changed",void 0),me.emit("fan-config-changed",void 0),me.emit("spotify-config-changed",void 0),me.emit("media-config-changed",void 0),me.emit("presence-config-changed",void 0),me.emit("climate-config-changed",void 0),me.emit("camera-carousel-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}function St(e){"navbar"===e._tab?async function(e){const t=e._backend;if(t&&!e._saving){e._saving=!0;try{await t.send("set_navbar",{room_order:e._rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:e._rooms.filter(e=>!e.visible).map(e=>e.areaId),show_lights:e._showLights,show_temperature:e._showTemperature,show_humidity:e._showHumidity,show_media:e._showMedia,auto_sort:e._autoSort,temp_high:e._tempHigh,temp_low:e._tempLow,humidity_threshold:e._humidityThreshold});const i=e._rooms.filter(t=>t.icon!==e._initialIcons.get(t.areaId)).map(i=>{const a=e.hass?.areas[i.areaId],r=a?.icon||"mdi:home",o=i.icon===r?null:i.icon;return t.send("set_room",{area_id:i.areaId,icon:o})});if(i.length>0&&await Promise.all(i),!e._mounted)return;e._showToast(),me.emit("navbar-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"popup"===e._tab?async function(e){if(e._backend&&!e._saving&&e._selectedRoom){e._saving=!0;try{if(await e._backend.send("set_room",{area_id:e._selectedRoom,card_order:e._cards.filter(e=>e.visible).map(e=>e.id),hidden_scenes:e._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:e._scenes.map(e=>e.entityId)}),!e._mounted)return;e._showToast(),me.emit("room-config-changed",{areaId:e._selectedRoom})}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"light"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{if(await e._backend.send("set_light_config",{show_header:e._lightShowHeader}),!e._lightRoom){if(!e._mounted)return;return e._showToast(),void me.emit("light-config-changed",void 0)}let t=[];try{const i=await e._backend.send("get_room",{area_id:e._lightRoom});i&&(t=i.hidden_entities??[])}catch{}const i=new Set(e._lights.map(e=>e.entityId)),a=t.filter(e=>!i.has(e)),r=e._lights.filter(e=>!e.visible).map(e=>e.entityId),o={};for(const n of e._lights)"full"===n.layout&&(o[n.entityId]=n.layout);if(await e._backend.send("set_room",{area_id:e._lightRoom,entity_order:e._lights.map(e=>e.entityId),hidden_entities:[...a,...r],entity_layouts:o}),!e._mounted)return;e._showToast(),me.emit("light-config-changed",void 0),me.emit("room-config-changed",{areaId:e._lightRoom})}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"weather"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{if(await e._backend.send("set_weather",{...e._weatherEntity?{entity_id:e._weatherEntity}:{},hidden_metrics:e._weatherHiddenMetrics,show_daily:e._weatherShowDaily,show_hourly:e._weatherShowHourly,show_header:e._weatherShowHeader}),!e._mounted)return;e._showToast(),me.emit("weather-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"title"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{if(await e._backend.send("set_title_config",{title:e._titleText,period_entity:e._titlePeriodEntity,period_options:e._titlePeriodOptions,sources:e._titleSources.map(e=>({source_type:e.source_type,entity:e.entity||"",label:e.label||"",modes:e.modes}))}),!e._mounted)return;e._showToast(),me.emit("title-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"cover"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{const t=e._coverDashboardOrder.filter(t=>e._coverDashboardEntities.includes(t));if(await e._backend.send("set_cover_config",{show_header:e._coverShowHeader,dashboard_compact:e._coverDashboardCompact,dashboard_entities:t,presets:e._coverPresets,entity_presets:e._coverEntityPresets}),e._coverRoom&&e._coverRoomEntities.length>0){let t=[],i=[],a={};try{const r=await e._backend.send("get_room",{area_id:e._coverRoom});r&&(t=r.hidden_entities??[],i=r.entity_order??[],a=r.entity_layouts??{})}catch{}const r=new Set(e._coverRoomEntities.map(e=>e.entityId)),o=t.filter(e=>!r.has(e)),n=e._coverRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),s=[...i.filter(e=>!r.has(e)),...e._coverRoomEntities.map(e=>e.entityId)],c={...a};for(const d of e._coverRoomEntities)c[d.entityId]=d.layout;await e._backend.send("set_room",{area_id:e._coverRoom,hidden_entities:[...o,...n],entity_order:s,entity_layouts:c})}if(!e._mounted)return;e._showToast(),me.emit("cover-config-changed",void 0),e._coverRoom&&me.emit("room-config-changed",{areaId:e._coverRoom})}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"climate"===e._tab?$t(e):"fan"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{if(await e._backend.send("set_fan_config",{show_header:e._fanShowHeader}),e._fanRoom&&e._fanRoomEntities.length>0){let t=[],i=[],a={};try{const r=await e._backend.send("get_room",{area_id:e._fanRoom});r&&(t=r.hidden_entities??[],i=r.entity_order??[],a=r.entity_layouts??{})}catch{}const r=new Set(e._fanRoomEntities.map(e=>e.entityId)),o=t.filter(e=>!r.has(e)),n=e._fanRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),s=[...i.filter(e=>!r.has(e)),...e._fanRoomEntities.map(e=>e.entityId)],c={...a};for(const d of e._fanRoomEntities)c[d.entityId]=d.layout;await e._backend.send("set_room",{area_id:e._fanRoom,hidden_entities:[...o,...n],entity_order:s,entity_layouts:c})}if(!e._mounted)return;e._showToast(),me.emit("fan-config-changed",void 0),e._fanRoom&&me.emit("room-config-changed",{areaId:e._fanRoom})}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"spotify"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{if(await e._backend.send("set_spotify_config",{show_header:e._spotifyShowHeader,entity_id:e._spotifyEntity,sort_order:e._spotifySortOrder,max_items_per_section:e._spotifyMaxItems,visible_speakers:e._spotifyVisibleSpeakers}),!e._mounted)return;e._showToast(),me.emit("spotify-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"media"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{if(await e._backend.send("set_media_config",{show_header:e._mediaShowHeader,extra_entities:e._mediaExtraEntities}),!e._mounted)return;e._showToast(),me.emit("media-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"presence"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{if(await e._backend.send("set_presence_config",{show_header:e._presenceShowHeader,person_entities:e._presencePersonEntities,smartphone_sensors:e._presenceSmartphoneSensors,notify_services:e._presenceNotifyServices,driving_sensors:e._presenceDrivingSensors}),!e._mounted)return;e._showToast(),me.emit("presence-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"camera_carousel"===e._tab?async function(e){if(e._backend&&!e._saving){e._saving=!0;try{if(await e._backend.send("set_camera_carousel_config",{show_header:e._cameraShowHeader,entity_order:e._cameraEntityOrder,auto_cycle:e._cameraAutoCycle,cycle_interval:e._cameraCycleInterval}),!e._mounted)return;e._showToast(),me.emit("camera-carousel-config-changed",void 0)}catch{e._showToast(!0)}finally{e._saving=!1}}}(e):"unassigned"===e._tab||kt(e)}var Et=Object.defineProperty,Dt=(e,t,i,a)=>{for(var r,o=void 0,n=e.length-1;n>=0;n--)(r=e[n])&&(o=r(t,i,o)||o);return o&&Et(t,i,o),o};const Ct=class e extends se{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=Ee(),this._tab="dashboard",this._tabSelectOpen=!1,this._tabSearch="",this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._cards=[],this._scenes=[],this._lights=[],this._lightRoom="",this._lightDropdownOpen=!1,this._iconPickerRoom=null,this._dropdownOpen=!1,this._popupRoomSearch="",this._toast=!1,this._saving=!1,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._showMedia=!0,this._autoSort=!0,this._tempHigh=je,this._tempLow=Ne,this._humidityThreshold=Le,this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherShowHeader=!0,this._weatherDropdownOpen=!1,this._titleText="",this._titleSources=[],this._titlePeriodEntity="",this._titlePeriodOptions=[],this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._titlePeriodDropdownOpen=!1,this._periodIconPopupIdx=null,this._titleAddEntitySearch="",this._titlePeriodSearch="",this._iconPopupModeIdx=null,this._iconSearch="",this._iconList=[],this._lightShowHeader=!0,this._coverShowHeader=!0,this._coverDashboardCompact=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._coverPresets=[0,25,50,75,100],this._coverEntityPresets={},this._coverRoom="",this._coverRoomDropdownOpen=!1,this._coverRoomEntities=[],this._coverPresetInput="",this._coverEntityPresetInput={},this._coverPresetsExpandedEntity=null,this._fanShowHeader=!0,this._fanRoom="",this._fanRoomDropdownOpen=!1,this._fanRoomEntities=[],this._climateShowHeader=!0,this._climateDisplayMode="list",this._climateDashboardDisplayMode="list",this._climateDashboardEntities=[],this._climateRoom="",this._climateRoomDropdownOpen=!1,this._climateRoomEntities=[],this._presenceShowHeader=!0,this._presencePersonEntities=[],this._presenceSmartphoneSensors={},this._presenceNotifyServices={},this._presenceDrivingSensors={},this._presenceDropdownOpen=null,this._presenceDropdownSearch="",this._mediaShowHeader=!0,this._mediaExtraEntities={},this._mediaRoom="",this._mediaRoomDropdownOpen=!1,this._mediaRoomNativePlayers=[],this._mediaAddDropdownOpen=!1,this._mediaEntitySearch="",this._spotifyShowHeader=!0,this._spotifyEntity="",this._spotifySortOrder="recent_first",this._spotifyDropdownOpen=!1,this._spotifyMaxItems=6,this._spotifyVisibleSpeakers=[],this._spotifyConfigured=null,this._cameraShowHeader=!0,this._cameraAutoCycle=!1,this._cameraCycleInterval=10,this._cameraEntityOrder=[],this._unassignedEntities=[],this._unassignedDropdownEntity=null,this._unassignedEntitySearch="",this._unassignedAreaSearch="",this._unassignedEditingEntity=null,this._dashboardEnabledCards=["weather"],this._dashboardCardOrder=["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],this._dashboardHideHeader=!1,this._dashboardHideSidebar=!1,this._dashboardExpanded=new Set,this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._dragModeSrcIdx=null,this._loaded=!1,this._loading=!1,this._configReady=!1,this._suppressAutoSave=!1,this._toastError=!1,this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this),this._initialIcons=new Map,this._iconLoading=!1}get _titleModes(){return this._titleSources.flatMap(e=>e.modes)}static{this._AUTO_SAVE_KEYS=new Set(["_rooms","_cards","_scenes","_showLights","_showTemperature","_showHumidity","_showMedia","_autoSort","_tempHigh","_tempLow","_humidityThreshold","_weatherEntity","_weatherHiddenMetrics","_weatherShowDaily","_weatherShowHourly","_weatherShowHeader","_titleText","_titleSources","_titlePeriodEntity","_titlePeriodOptions","_lightShowHeader","_lights","_coverShowHeader","_coverDashboardCompact","_coverDashboardEntities","_coverDashboardOrder","_coverPresets","_coverEntityPresets","_coverRoomEntities","_fanShowHeader","_fanRoomEntities","_climateShowHeader","_climateDisplayMode","_climateDashboardDisplayMode","_climateDashboardEntities","_climateRoomEntities","_presenceShowHeader","_presencePersonEntities","_presenceSmartphoneSensors","_presenceNotifyServices","_presenceDrivingSensors","_mediaShowHeader","_mediaExtraEntities","_spotifyShowHeader","_spotifyEntity","_spotifySortOrder","_spotifyMaxItems","_spotifyVisibleSpeakers","_cameraShowHeader","_cameraAutoCycle","_cameraCycleInterval","_cameraEntityOrder","_dashboardEnabledCards","_dashboardCardOrder","_dashboardHideHeader","_dashboardHideSidebar"])}static{this.styles=[fe,be,ye,we,...de]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,document.removeEventListener("click",this._boundCloseDropdowns),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),void 0!==this._autoSaveTimer&&(clearTimeout(this._autoSaveTimer),this._autoSaveTimer=void 0),this._backend=void 0}_closeDropdownsOnOutsideClick(e){if(!(this._dropdownOpen||this._lightDropdownOpen||this._weatherDropdownOpen||this._titleAddSourceDropdownOpen||this._titleAddEntityDropdownOpen||this._titlePeriodDropdownOpen||this._coverRoomDropdownOpen||this._climateRoomDropdownOpen||this._fanRoomDropdownOpen||this._mediaRoomDropdownOpen||this._mediaAddDropdownOpen||this._spotifyDropdownOpen||this._presenceDropdownOpen||this._unassignedDropdownEntity||this._tabSelectOpen))return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown, .tab-select-wrap");for(const r of a)if(t.includes(r))return;this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._titlePeriodDropdownOpen=!1,this._coverRoomDropdownOpen=!1,this._climateRoomDropdownOpen=!1,this._fanRoomDropdownOpen=!1,this._mediaRoomDropdownOpen=!1,this._spotifyDropdownOpen=!1,this._presenceDropdownOpen=null,this._unassignedDropdownEntity=null,this._tabSelectOpen=!1,this._tabSearch=""}updated(t){if(super.updated(t),t.has("hass")&&(this.hass?.language&&Se(this.hass.language)&&(this._lang=Ee()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1,this._configReady=!1),!this.hass||this._loaded||this._loading||(this._backend=new He(this.hass),this._loadConfig())),this._loaded&&!this._loading&&!this._saving)if(this._configReady){if(this._suppressAutoSave)this._suppressAutoSave=!1;else for(const i of t.keys())if(e._AUTO_SAVE_KEYS.has(i)){this._scheduleAutoSave();break}}else this._configReady=!0}_beginSuppressAutoSave(){this._suppressAutoSave=!0}_scheduleAutoSave(){void 0!==this._autoSaveTimer&&clearTimeout(this._autoSaveTimer),this._autoSaveTimer=setTimeout(()=>{this._autoSaveTimer=void 0,this._saving||this._save()},800)}async _loadConfig(){return vt(this)}async _loadRoomCards(){return ft(this)}async _loadRoomLights(){return bt(this)}async _loadRoomCovers(){return yt(this)}async _loadRoomFans(){return wt(this)}async _loadRoomClimates(){return xt(this)}_loadRoomMediaPlayers(){!function(e){if(!e.hass||!e._mediaRoom)return void(e._mediaRoomNativePlayers=[]);const t=Me(e._mediaRoom,e.hass.entities,e.hass.devices);e._mediaRoomNativePlayers=t.filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id)}(this)}async _loadFanConfig(){return async function(e){if(e._beginSuppressAutoSave(),e.hass&&e._backend){try{const t=await e._backend.send("get_config");t?.fan_card&&(e._fanShowHeader=t.fan_card.show_header??!0)}catch{}await wt(e)}}(this)}async _loadClimateConfig(){return async function(e){if(e._beginSuppressAutoSave(),e.hass&&e._backend){try{const t=await e._backend.send("get_config");t?.climate_card&&(e._climateShowHeader=t.climate_card.show_header??!0,e._climateDisplayMode="normal"===t.climate_card.display_mode?"normal":"list",e._climateDashboardDisplayMode="normal"===t.climate_card.dashboard_display_mode?"normal":"list",e._climateDashboardEntities=t.climate_card.dashboard_entities??[])}catch{}e._climateRoom&&await xt(e)}}(this)}async _loadMediaConfig(){return async function(e){if(e._beginSuppressAutoSave(),e._backend)try{const t=await e._backend.send("get_config");t?.media_card&&(e._mediaShowHeader=t.media_card.show_header??!0,e._mediaExtraEntities=t.media_card.extra_entities??{})}catch{}}(this)}async _loadDashboardConfig(){return async function(e){if(e._beginSuppressAutoSave(),e._backend)try{const t=await e._backend.send("get_config");t?.dashboard&&(e._dashboardEnabledCards=t.dashboard.enabled_cards??["weather"],e._dashboardCardOrder=t.dashboard.card_order??["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],e._dashboardHideHeader=t.dashboard.hide_header??!1,e._dashboardHideSidebar=t.dashboard.hide_sidebar??!1),e._lightShowHeader=t?.light_card?.show_header??!0,e._weatherShowHeader=t?.weather?.show_header??!0,e._coverShowHeader=t?.cover_card?.show_header??!0,e._fanShowHeader=t?.fan_card?.show_header??!0,e._spotifyShowHeader=t?.spotify_card?.show_header??!0,e._mediaShowHeader=t?.media_card?.show_header??!0,e._mediaExtraEntities=t?.media_card?.extra_entities??{},e._presenceShowHeader=t?.presence_card?.show_header??!0,e._cameraShowHeader=t?.camera_carousel?.show_header??!0}catch{}}(this)}async _loadPresenceConfig(){return async function(e){if(e._beginSuppressAutoSave(),e._backend)try{const t=await e._backend.send("get_config");t?.presence_card&&(e._presenceShowHeader=t.presence_card.show_header??!0,e._presencePersonEntities=t.presence_card.person_entities??[],e._presenceSmartphoneSensors=t.presence_card.smartphone_sensors??{},e._presenceNotifyServices=t.presence_card.notify_services??{},e._presenceDrivingSensors=t.presence_card.driving_sensors??{})}catch{}}(this)}async _loadCameraCarouselConfig(){return async function(e){if(e._beginSuppressAutoSave(),e._backend)try{const t=await e._backend.send("get_config");t?.camera_carousel&&(e._cameraShowHeader=t.camera_carousel.show_header??!0,e._cameraEntityOrder=t.camera_carousel.entity_order??[],e._cameraAutoCycle=t.camera_carousel.auto_cycle??!1,e._cameraCycleInterval=t.camera_carousel.cycle_interval??10)}catch{}}(this)}async _loadWeatherConfig(){return async function(e){if(e._beginSuppressAutoSave(),e._backend)try{const t=await e._backend.send("get_config");t?.weather&&(e._weatherEntity=t.weather.entity_id??"",e._weatherHiddenMetrics=t.weather.hidden_metrics??[],e._weatherShowDaily=t.weather.show_daily??!0,e._weatherShowHourly=t.weather.show_hourly??!0,e._weatherShowHeader=t.weather.show_header??!0)}catch{}}(this)}async _loadSpotifyConfig(){return async function(e){if(e._beginSuppressAutoSave(),e._backend)try{const t=await e._backend.send("get_config");t?.spotify_card&&(e._spotifyShowHeader=t.spotify_card.show_header??!0,e._spotifyEntity=t.spotify_card.entity_id??"",e._spotifySortOrder="oldest_first"===t.spotify_card.sort_order?"oldest_first":"recent_first",e._spotifyMaxItems=t.spotify_card.max_items_per_section??6,e._spotifyVisibleSpeakers=t.spotify_card.visible_speakers??[])}catch{}}(this)}async _loadTitleConfig(){return async function(e){if(e._beginSuppressAutoSave(),e._backend){e._iconPopupModeIdx=null,e._titleEditingSourceIdx=null,e._titleAddSourceDropdownOpen=!1,e._titleAddEntityDropdownOpen=!1;try{const t=await e._backend.send("get_config");t?.title_card&&(e._titleText=t.title_card.title??"",e._titlePeriodEntity=t.title_card.period_entity??"",e._titlePeriodOptions=(t.title_card.period_options??[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||""})),e._titleSources=(t.title_card.sources??[]).map(e=>({source_type:e.source_type||"",entity:e.entity||"",label:e.label||"",modes:(e.modes||[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"}))})))}catch{}}}(this)}_save(){St(this)}async _saveSchedule(e){return async function(e,t){if(!e._backend)return;const i=(e._scheduleEdits.get(t)??[]).filter(e=>e.start&&e.end);try{if(await e._backend.send("set_schedule",{entity_id:t,periods:i}),!e._mounted)return;e._showToast(),me.emit("schedule-changed",{entityId:t})}catch{if(!e._mounted)return;e._showToast(!0)}}(this,e)}async _reset(){return async function(e){e._loading||(e._loaded=!1,await vt(e),e._lightRoom&&await bt(e))}(this)}async _saveClimate(){return $t(this)}async _saveDashboard(){return kt(this)}async _resetCover(){return async function(e){if(e._beginSuppressAutoSave(),e._backend){try{const t=await e._backend.send("get_config");t?.cover_card&&(e._coverShowHeader=t.cover_card.show_header??!0,e._coverDashboardEntities=t.cover_card.dashboard_entities??[],e._coverDashboardCompact=t.cover_card.dashboard_compact??!0,e._coverPresets=t.cover_card.presets??[0,25,50,75,100],e._coverEntityPresets=t.cover_card.entity_presets??{},e._coverEntityPresetInput={},e._initCoverDashboardOrder())}catch{}await yt(e)}}(this)}async _checkSpotifyStatus(){return async function(e){if(e._backend)try{const t=await e._backend.send("spotify_status");if(!e._mounted)return;e._spotifyConfigured=t?.configured??!1}catch{e._spotifyConfigured=!1}}(this)}_onDragStart(e,t,i){!function(e,t,i,a){e._dragIdx=t,e._dragContext=i,"title_modes"===i&&(e._dragModeSrcIdx=a??null)}(this,e,t,i)}_onDragOver(e,t,i){!function(e,t,i,a){i.preventDefault(),null!==e._dragIdx&&e._dragIdx!==t&&("title_modes"===e._dragContext&&void 0!==a&&a!==e._dragModeSrcIdx||(e._dropIdx=t))}(this,e,t,i)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t)return e._dragIdx=null,void(e._dropIdx=null);const a=e._dragContext;if("rooms"===a){const i=[...e._rooms],[a]=i.splice(e._dragIdx,1);i.splice(t,0,a),e._rooms=i}else if("cards"===a){const i=[...e._cards],[a]=i.splice(e._dragIdx,1);i.splice(t,0,a),e._cards=i}else if("scenes"===a){const i=[...e._scenes],[a]=i.splice(e._dragIdx,1);i.splice(t,0,a),e._scenes=i}else if("lights"===a){const i=[...e._lights],[a]=i.splice(e._dragIdx,1);i.splice(t,0,a),e._lights=i}else if("climates"===a){const i=[...e._climateRoomEntities],[a]=i.splice(e._dragIdx,1);i.splice(t,0,a),e._climateRoomEntities=i}else if("title_sources"===a){const i=[...e._titleSources],[a]=i.splice(e._dragIdx,1);if(i.splice(t,0,a),e._titleSources=i,e._titleEditingSourceIdx===e._dragIdx)e._titleEditingSourceIdx=t;else if(null!==e._titleEditingSourceIdx){const i=e._titleEditingSourceIdx,a=e._dragIdx;a<i&&t>=i?e._titleEditingSourceIdx=i-1:a>i&&t<=i&&(e._titleEditingSourceIdx=i+1)}}else if("title_modes"===a&&null!==e._dragModeSrcIdx){const i=[...e._titleSources],a=i[e._dragModeSrcIdx];if(a){const r=[...a.modes],[o]=r.splice(e._dragIdx,1);r.splice(t,0,o),i[e._dragModeSrcIdx]={...a,modes:r},e._titleSources=i}e._dragModeSrcIdx=null}e._dragIdx=null,e._dropIdx=null}(this,e,t)}_onDragEnd(){var e;(e=this)._dragIdx=null,e._dropIdx=null,e._dragModeSrcIdx=null}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_switchTab(e){this._tab=e,this._tabSelectOpen=!1,this._tabSearch="",this._iconPickerRoom=null,this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._titlePeriodDropdownOpen=!1,this._coverRoomDropdownOpen=!1,this._climateRoomDropdownOpen=!1,this._fanRoomDropdownOpen=!1,this._mediaRoomDropdownOpen=!1,this._mediaAddDropdownOpen=!1,this._spotifyDropdownOpen=!1,this._presenceDropdownOpen=null,this._unassignedDropdownEntity=null,this._iconPopupModeIdx=null,"light"===e&&!this._lightRoom&&this._rooms.length>0&&(this._lightRoom=this._rooms[0].areaId,this._loadRoomLights()),"cover"===e&&!this._coverRoom&&this._rooms.length>0&&(this._coverRoom=this._rooms[0].areaId,this._loadRoomCovers()),"climate"===e&&(this._loadClimateConfig(),!this._climateRoom&&this._rooms.length>0&&(this._climateRoom=this._rooms[0].areaId,this._loadRoomClimates())),"fan"===e&&!this._fanRoom&&this._rooms.length>0&&(this._fanRoom=this._rooms[0].areaId,this._loadRoomFans()),"media"===e&&!this._mediaRoom&&this._rooms.length>0&&(this._mediaRoom=this._rooms[0].areaId,this._loadRoomMediaPlayers()),"cover"!==e&&"dashboard"!==e||0!==this._coverDashboardOrder.length||this._initCoverDashboardOrder(),"unassigned"===e&&this._loadUnassignedEntities()}_toggleRoomVisible(e){!function(e,t){const i=e._rooms.map(e=>e.areaId===t?{...e,visible:!e.visible}:e),a=i.filter(e=>e.visible),r=i.filter(e=>!e.visible);e._rooms=[...a,...r]}(this,e)}_openIconPicker(e){!function(e,t){e._iconPickerRoom=e._iconPickerRoom===t?null:t}(this,e)}_setRoomIcon(e,t){!function(e,t,i){e._rooms=e._rooms.map(e=>e.areaId===t?{...e,icon:i}:e),e._iconPickerRoom=null}(this,e,t)}_toggleCardVisible(e){!function(e,t){e._cards=e._cards.map(e=>e.id===t?{...e,visible:!e.visible}:e)}(this,e)}_toggleSceneVisible(e){!function(e,t){e._scenes=e._scenes.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}(this,e)}_selectRoom(e){!function(e,t){e._selectedRoom=t,e._dropdownOpen=!1,e._popupRoomSearch="",e._loadRoomCards()}(this,e)}_goBack(){history.length>1?history.back():window.location.href="/"}_selectLightRoom(e){this._beginSuppressAutoSave(),function(e,t){e._lightRoom=t,e._lightDropdownOpen=!1,e._loadRoomLights()}(this,e)}_toggleLightVisible(e){!function(e,t){e._lights=e._lights.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}(this,e)}_cycleLightLayout(e){!function(e,t){e._lights=e._lights.map(e=>e.entityId===t?{...e,layout:"full"===e.layout?"compact":"full"}:e)}(this,e)}_toggleScheduleExpand(e){!function(e,t){if(e._scheduleExpandedEntity=e._scheduleExpandedEntity===t?null:t,!e._scheduleEdits.has(t)){const i=e._schedulesLoaded[t];e._scheduleEdits.set(t,i?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}e.requestUpdate()}(this,e)}_addSchedulePeriod(e){!function(e,t){const i=e._scheduleEdits.get(t)??[];i.push({start:"",end:"",recurring:!1}),e._scheduleEdits.set(t,[...i]),e.requestUpdate()}(this,e)}_removeSchedulePeriod(e,t){!function(e,t,i){const a=e._scheduleEdits.get(t)??[];a.splice(i,1),e._scheduleEdits.set(t,[...a]),e.requestUpdate()}(this,e,t)}_updateSchedulePeriod(e,t,i,a){!function(e,t,i,a,r){const o=e._scheduleEdits.get(t)??[];o[i]&&(o[i]={...o[i],[a]:r},e._scheduleEdits.set(t,[...o]),e.requestUpdate())}(this,e,t,i,a)}_toggleScheduleRecurring(e,t){!function(e,t,i){const a=e._scheduleEdits.get(t)??[];a[i]&&(a[i]={...a[i],recurring:!a[i].recurring},e._scheduleEdits.set(t,[...a]),e.requestUpdate())}(this,e,t)}_parseDateTimeValue(e){return function(e,t){if(!t)return null;const[i,a]=t.split("T");if(!i)return null;const r=i.split("-").map(Number);if(r.length<3||r.some(isNaN))return null;const[o,n,s]=r,[c,d]=(a??"00:00").split(":");return{year:o,month:n-1,day:s,hour:c??"00",minute:d??"00"}}(0,e)}_openRangePicker(e,t){!function(e,t,i){e._pickerTarget={entityId:t,periodIdx:i};const a=(e._scheduleEdits.get(t)??[])[i],r=a?e._parseDateTimeValue(a.start):null,o=a?e._parseDateTimeValue(a.end):null,n=new Date;r?(e._pickerStartDay=r.day,e._pickerStartMonth=r.month,e._pickerStartYear=r.year,e._pickerStartHour=r.hour,e._pickerStartMinute=r.minute,e._pickerYear=r.year,e._pickerMonth=r.month):(e._pickerStartDay=null,e._pickerStartMonth=n.getMonth(),e._pickerStartYear=n.getFullYear(),e._pickerStartHour="00",e._pickerStartMinute="00",e._pickerYear=n.getFullYear(),e._pickerMonth=n.getMonth()),o?(e._pickerEndDay=o.day,e._pickerEndMonth=o.month,e._pickerEndYear=o.year,e._pickerEndHour=o.hour,e._pickerEndMinute=o.minute):(e._pickerEndDay=null,e._pickerEndMonth=n.getMonth(),e._pickerEndYear=n.getFullYear(),e._pickerEndHour="23",e._pickerEndMinute="59"),e._pickerPhase=r?o?"start":"end":"start",e._pickerOpen=!0}(this,e,t)}_closePicker(){var e;(e=this)._pickerOpen=!1,e._pickerTarget=null}_pickerPrevMonth(){var e;0===(e=this)._pickerMonth?(e._pickerMonth=11,e._pickerYear--):e._pickerMonth--}_pickerNextMonth(){var e;11===(e=this)._pickerMonth?(e._pickerMonth=0,e._pickerYear++):e._pickerMonth++}_pickerSelectDay(e,t){!function(e,t,i){if(!i)if("start"===e._pickerPhase){if(e._pickerStartDay=t,e._pickerStartMonth=e._pickerMonth,e._pickerStartYear=e._pickerYear,e._pickerPhase="end",null!==e._pickerEndDay){const i=new Date(e._pickerStartYear,e._pickerStartMonth,t).getTime();new Date(e._pickerEndYear,e._pickerEndMonth,e._pickerEndDay).getTime()<i&&(e._pickerEndDay=null)}}else{if(null!==e._pickerStartDay){const i=new Date(e._pickerStartYear,e._pickerStartMonth,e._pickerStartDay).getTime();if(new Date(e._pickerYear,e._pickerMonth,t).getTime()<i)return e._pickerStartDay=t,e._pickerStartMonth=e._pickerMonth,e._pickerStartYear=e._pickerYear,e._pickerEndDay=null,void(e._pickerPhase="start")}e._pickerEndDay=t,e._pickerEndMonth=e._pickerMonth,e._pickerEndYear=e._pickerYear}}(this,e,t)}_pickerSetTime(e,t){!function(e,t,i){const a=i.target.value.replace(/\D/g,"").slice(0,2),r=t.includes("Hour"),o=Math.min(r?23:59,Math.max(0,parseInt(a,10)||0)),n=String(o).padStart(2,"0");i.target.value=n,"startHour"===t?e._pickerStartHour=n:"startMinute"===t?e._pickerStartMinute=n:"endHour"===t?e._pickerEndHour=n:e._pickerEndMinute=n,e.requestUpdate()}(this,e,t)}_pickerConfirm(){!function(e){if(!e._pickerTarget||null===e._pickerStartDay||null===e._pickerEndDay)return;const{entityId:t,periodIdx:i}=e._pickerTarget,a=String(e._pickerStartMonth+1).padStart(2,"0"),r=String(e._pickerStartDay).padStart(2,"0"),o=String(e._pickerEndMonth+1).padStart(2,"0"),n=String(e._pickerEndDay).padStart(2,"0"),s=`${e._pickerStartYear}-${a}-${r}T${e._pickerStartHour}:${e._pickerStartMinute}`,c=`${e._pickerEndYear}-${o}-${n}T${e._pickerEndHour}:${e._pickerEndMinute}`;e._updateSchedulePeriod(t,i,"start",s),e._updateSchedulePeriod(t,i,"end",c),e._closePicker()}(this)}_toAbsDay(e,t,i){return Ge(0,e,t,i)}_getMonthDays(){return function(e){const t=e._pickerYear,i=e._pickerMonth,a=(new Date(t,i,1).getDay()+6)%7,r=new Date(t,i+1,0).getDate(),o=new Date(t,i,0).getDate(),n=new Date,s=n.getFullYear()===t&&n.getMonth()===i,c=n.getDate(),d=null!==e._pickerStartDay?Ge(0,e._pickerStartYear,e._pickerStartMonth,e._pickerStartDay):null,l=null!==e._pickerEndDay?Ge(0,e._pickerEndYear,e._pickerEndMonth,e._pickerEndDay):null,p=[],h=(e,t,i,a)=>{const r=Ge(0,i,a,e);return{day:e,otherMonth:t,today:!t&&s&&e===c,rangeStart:null!==d&&r===d,rangeEnd:null!==l&&r===l,inRange:null!==d&&null!==l&&r>d&&r<l}},_=0===i?11:i-1,m=0===i?t-1:t;for(let f=a-1;f>=0;f--)p.push(h(o-f,!0,m,_));for(let f=1;f<=r;f++)p.push(h(f,!1,t,i));const u=11===i?0:i+1,g=11===i?t+1:t,v=42-p.length;for(let f=1;f<=v;f++)p.push(h(f,!0,g,u));return p}(this)}_getMonthLabel(){return function(e){const t=new Date(e._pickerYear,e._pickerMonth,1),i="fr"===e._lang?"fr-FR":"en-US",a=t.toLocaleDateString(i,{month:"long"});return`${a.charAt(0).toUpperCase()}${a.slice(1)} ${e._pickerYear}`}(this)}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_renderDateTimePicker(){return function(e){const t=e._getMonthDays(),i=e._getDayLabels(),a=null!==e._pickerStartDay&&null!==e._pickerEndDay;return W`
    <div class="picker-overlay"
      @click=${t=>{t.target===t.currentTarget&&e._closePicker()}}
      @keydown=${t=>{"Escape"===t.key&&e._closePicker()}}
    >
      <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${De("config.light_schedule_title")}">
        <div class="picker-phase">
          <button
            class="picker-phase-btn ${"start"===e._pickerPhase?"active":""}"
            @click=${()=>{e._pickerPhase="start"}}
          >${De("config.light_schedule_start")}</button>
          <button
            class="picker-phase-btn ${"end"===e._pickerPhase?"active":""}"
            @click=${()=>{e._pickerPhase="end"}}
          >${De("config.light_schedule_end")}</button>
        </div>
        <div class="picker-header">
          <button class="picker-nav" @click=${()=>e._pickerPrevMonth()} aria-label="${De("config.light_schedule_prev_month_aria")}">
            <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
          </button>
          <span class="picker-month">${e._getMonthLabel()}</span>
          <button class="picker-nav" @click=${()=>e._pickerNextMonth()} aria-label="${De("config.light_schedule_next_month_aria")}">
            <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
          </button>
        </div>
        <div class="picker-grid">
          ${i.map(e=>W`<span class="picker-day-label">${e}</span>`)}
          ${t.map(t=>{const i=["picker-day",t.today?"today":"",t.rangeStart?"range-start":"",t.rangeEnd?"range-end":"",t.inRange?"in-range":"",t.otherMonth?"other-month":""].filter(Boolean).join(" ");return W`
              <button class=${i} @click=${()=>e._pickerSelectDay(t.day,t.otherMonth)}>${t.day}</button>
            `})}
        </div>
        <div class="picker-time-row">
          <div class="picker-time-group">
            <span class="picker-time-label">${De("config.light_schedule_start")}</span>
            <div class="time-input">
              <input type="text" class="time-digit" maxlength="2"
                .value=${e._pickerStartHour}
                @change=${t=>e._pickerSetTime("startHour",t)}
              />
              <span class="time-sep">:</span>
              <input type="text" class="time-digit" maxlength="2"
                .value=${e._pickerStartMinute}
                @change=${t=>e._pickerSetTime("startMinute",t)}
              />
            </div>
          </div>
          <div class="picker-time-group">
            <span class="picker-time-label">${De("config.light_schedule_end")}</span>
            <div class="time-input">
              <input type="text" class="time-digit" maxlength="2"
                .value=${e._pickerEndHour}
                @change=${t=>e._pickerSetTime("endHour",t)}
              />
              <span class="time-sep">:</span>
              <input type="text" class="time-digit" maxlength="2"
                .value=${e._pickerEndMinute}
                @change=${t=>e._pickerSetTime("endMinute",t)}
              />
            </div>
          </div>
        </div>
        <button
          class="btn btn-sm btn-accent picker-confirm"
          @click=${()=>e._pickerConfirm()}
          ?disabled=${!a}
        >
          ${De("config.light_schedule_confirm")}
        </button>
      </div>
    </div>
  `}(this)}_selectCoverRoom(e){this._beginSuppressAutoSave(),function(e,t){e._coverRoom=t,e._coverRoomDropdownOpen=!1,e._loadRoomCovers()}(this,e)}_toggleCoverEntityVisibility(e){!function(e,t){e._coverRoomEntities=e._coverRoomEntities.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}(this,e)}_cycleCoverLayout(e){!function(e,t){e._coverRoomEntities=e._coverRoomEntities.map(e=>e.entityId===t?{...e,layout:"full"===e.layout?"compact":"full"}:e)}(this,e)}_getAllCoverEntities(){return function(e){if(!e.hass)return[];const t=[];for(const[i,a]of Object.entries(e.hass.states)){if(!i.startsWith("cover."))continue;const e=a.attributes?.friendly_name||i.split(".")[1]||i;t.push({entityId:i,name:e})}return t.sort((e,t)=>e.name.localeCompare(t.name))}(this)}_toggleCoverDashboardEntity(e){!function(e,t){const i=new Set(e._coverDashboardEntities);i.has(t)?(i.delete(t),e._coverDashboardOrder=e._coverDashboardOrder.filter(e=>e!==t)):(i.add(t),e._coverDashboardOrder.includes(t)||(e._coverDashboardOrder=[...e._coverDashboardOrder,t])),e._coverDashboardEntities=[...i]}(this,e)}_initCoverDashboardOrder(){!function(e){const t=new Set(e._getAllCoverEntities().map(e=>e.entityId)),i=e._coverDashboardEntities.filter(e=>t.has(e)),a=[...t].filter(t=>!e._coverDashboardEntities.includes(t));e._coverDashboardOrder=[...i,...a]}(this)}_onDropDashboardCover(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"dashboard_covers"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._coverDashboardOrder],[r]=a.splice(e._dragIdx,1);a.splice(t,0,r),e._coverDashboardOrder=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}_onDropCover(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"covers"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._coverRoomEntities],[r]=a.splice(e._dragIdx,1);a.splice(t,0,r),e._coverRoomEntities=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}_addCoverPreset(){!function(e){const t=parseInt(e._coverPresetInput,10);isNaN(t)||t<0||t>100||(e._coverPresets.includes(t)||(e._coverPresets=[...e._coverPresets,t].sort((e,t)=>e-t)),e._coverPresetInput="")}(this)}_removeCoverPreset(e){!function(e,t){e._coverPresets=e._coverPresets.filter(e=>e!==t)}(this,e)}_addCoverEntityPreset(e){!function(e,t){const i=e._coverEntityPresetInput[t]??"",a=parseInt(i,10);if(isNaN(a)||a<0||a>100)return;const r=e._coverEntityPresets[t]??[...e._coverPresets];r.includes(a)?e._coverEntityPresetInput={...e._coverEntityPresetInput,[t]:""}:(e._coverEntityPresets={...e._coverEntityPresets,[t]:[...r,a].sort((e,t)=>e-t)},e._coverEntityPresetInput={...e._coverEntityPresetInput,[t]:""})}(this,e)}_removeCoverEntityPreset(e,t){!function(e,t,i){const a=e._coverEntityPresets[t];if(!a)return;const r=a.filter(e=>e!==i);if(0===r.length){const i={...e._coverEntityPresets};delete i[t],e._coverEntityPresets=i}else e._coverEntityPresets={...e._coverEntityPresets,[t]:r}}(this,e,t)}_resetCoverEntityPresets(e){!function(e,t){const i={...e._coverEntityPresets};delete i[t],e._coverEntityPresets=i}(this,e)}_toggleCoverPresetsExpand(e){this._coverPresetsExpandedEntity=this._coverPresetsExpandedEntity===e?null:e}_selectFanRoom(e){this._beginSuppressAutoSave(),function(e,t){e._fanRoom=t,e._fanRoomDropdownOpen=!1,e._loadRoomFans()}(this,e)}_toggleFanEntityVisibility(e){!function(e,t){e._fanRoomEntities=e._fanRoomEntities.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}(this,e)}_cycleFanLayout(e){!function(e,t){e._fanRoomEntities=e._fanRoomEntities.map(e=>e.entityId===t?{...e,layout:"full"===e.layout?"compact":"full"}:e)}(this,e)}_onDropFan(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"fans"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._fanRoomEntities],[r]=a.splice(e._dragIdx,1);a.splice(t,0,r),e._fanRoomEntities=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}_selectClimateRoom(e){this._beginSuppressAutoSave(),ht(this,e)}_toggleClimateEntityVisibility(e){_t(this,e)}_toggleClimateDashboardEntity(e){mt(this,e)}_selectMediaRoom(e){this._beginSuppressAutoSave(),function(e,t){e._mediaRoom=t,e._mediaRoomDropdownOpen=!1,e._mediaAddDropdownOpen=!1,e._mediaEntitySearch="",e._loadRoomMediaPlayers()}(this,e)}_addMediaExtraEntity(e){!function(e,t){const i=e._mediaRoom;if(!i)return;const a=e._mediaExtraEntities[i]??[];a.includes(t)||(e._mediaExtraEntities={...e._mediaExtraEntities,[i]:[...a,t]})}(this,e)}_removeMediaExtraEntity(e){!function(e,t){const i=e._mediaRoom;if(!i)return;const a=e._mediaExtraEntities[i]??[];e._mediaExtraEntities={...e._mediaExtraEntities,[i]:a.filter(e=>e!==t)}}(this,e)}_toggleDashboardCard(e){!function(e,t){const i=new Set(e._dashboardEnabledCards);i.has(t)?i.delete(t):i.add(t),e._dashboardEnabledCards=[...i]}(this,e)}_toggleDashboardExpand(e){!function(e,t){const i=new Set(e._dashboardExpanded);i.has(t)?i.delete(t):i.add(t),e._dashboardExpanded=i}(this,e)}_onDropDashboardCard(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"dashboard_cards"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._dashboardCardOrder],[r]=a.splice(e._dragIdx,1);a.splice(t,0,r),e._dashboardCardOrder=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}_getAvailablePersonEntities(){return(e=this).hass?Object.keys(e.hass.states).filter(e=>e.startsWith("person.")).map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1];return{entityId:t,name:a}}).sort((e,t)=>e.name.localeCompare(t.name)):[];var e}_getAvailableSmartphoneSensors(){return(e=this).hass?Object.keys(e.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("phone")||e.includes("mobile")||e.includes("smartphone")||e.includes("tablet")||e.includes("iphone")||e.includes("galaxy")||e.includes("pixel")||e.includes("oneplus"))).map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1];return{entityId:t,name:a}}).sort((e,t)=>e.name.localeCompare(t.name)):[];var e}_getAvailableDrivingSensors(){return(e=this).hass?Object.keys(e.hass.states).filter(e=>e.startsWith("binary_sensor.")).map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1];return{entityId:t,name:a}}).sort((e,t)=>e.name.localeCompare(t.name)):[];var e}_getAvailableNotifyServices(){return function(e){if(!e.hass)return[];const t=e.hass.services;return Object.keys(t?.notify??{}).map(e=>`notify.${e}`).sort()}(this)}_togglePresencePerson(e){!function(e,t){const i=e._getAvailablePersonEntities();if(0===e._presencePersonEntities.length)e._presencePersonEntities=i.map(e=>e.entityId).filter(e=>e!==t);else{const i=new Set(e._presencePersonEntities);if(i.has(t)){if(i.size<=1)return void(e._presencePersonEntities=[]);i.delete(t)}else i.add(t);e._presencePersonEntities=[...i]}}(this,e)}_selectSpotifyEntity(e){!function(e,t){e._spotifyEntity=t,e._spotifyDropdownOpen=!1}(this,e)}_toggleSpotifySpeaker(e){!function(e,t){e._spotifyVisibleSpeakers.includes(t)?e._spotifyVisibleSpeakers=e._spotifyVisibleSpeakers.filter(e=>e!==t):e._spotifyVisibleSpeakers=[...e._spotifyVisibleSpeakers,t]}(this,e)}_onDropSpeaker(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"speakers"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._spotifyVisibleSpeakers];if(e._dragIdx>=a.length||t>=a.length)return e._dragIdx=null,void(e._dropIdx=null);const[r]=a.splice(e._dragIdx,1);a.splice(t,0,r),e._spotifyVisibleSpeakers=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}_initCameraEntityOrder(){dt(this)}_onDropCameraEntity(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"camera_order"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._cameraEntityOrder],[r]=a.splice(e._dragIdx,1);a.splice(t,0,r),e._cameraEntityOrder=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}_toggleWeatherMetric(e){!function(e,t){const i=new Set(e._weatherHiddenMetrics);i.has(t)?i.delete(t):i.add(t),e._weatherHiddenMetrics=[...i]}(this,e)}_selectWeatherEntity(e){!function(e,t){e._weatherEntity=t,e._weatherDropdownOpen=!1}(this,e)}_windBearingToDir(e){return function(e,t){return De(`weather.${ct[Math.round((t%360+360)%360/22.5)%16]}`)}(0,e)}_addTitleSource(e){!function(e,t){e._titleAddSourceDropdownOpen=!1,e._titleSources=[...e._titleSources,{source_type:t,entity:"",label:"",modes:[]}],e._titleEditingSourceIdx=e._titleSources.length-1}(this,e)}_removeTitleSource(e){!function(e,t){const i=[...e._titleSources];i.splice(t,1),e._titleSources=i,e._titleEditingSourceIdx===t?e._titleEditingSourceIdx=null:null!==e._titleEditingSourceIdx&&e._titleEditingSourceIdx>t&&e._titleEditingSourceIdx--}(this,e)}_setTitleSourceEntity(e,t){!function(e,t,i){e._titleAddEntityDropdownOpen=!1;const a=[...e._titleSources];if(a[t]){if(a[t]={...a[t],entity:i},i.startsWith("input_select.")&&e.hass){const r=e.hass.states[i];if(r){const e=r.attributes.options??[],i=new Map(a[t].modes.map(e=>[e.id,e]));a[t]={...a[t],modes:e.map(e=>i.get(e)??{id:e,label:e,icon:"",color:"neutral"})}}}else i||(a[t]={...a[t],modes:[]});e._titleSources=a}}(this,e,t)}_setTitleSourceLabel(e,t){!function(e,t,i){const a=[...e._titleSources];a[t]&&(a[t]={...a[t],label:i},e._titleSources=a)}(this,e,t)}_addTitleModeEntity(e,t){!function(e,t,i){e._titleAddEntityDropdownOpen=!1;const a=[...e._titleSources];if(!a[t])return;if(a[t].modes.some(e=>e.id===i))return;const r=e.hass?.states[i],o=r?.attributes.friendly_name||i.split(".")[1]||i,n=i.startsWith("scene.")?"mdi:palette":"mdi:toggle-switch",s=i.startsWith("scene.")?"accent":"success";a[t]={...a[t],modes:[...a[t].modes,{id:i,label:o,icon:n,color:s}]},e._titleSources=a}(this,e,t)}_removeTitleModeEntity(e,t){!function(e,t,i){const a=[...e._titleSources];a[t]&&(a[t]={...a[t],modes:a[t].modes.filter(e=>e.id!==i)},e._titleSources=a)}(this,e,t)}_updateTitleMode(e,t,i){!function(e,t,i,a){let r=t;const o=[...e._titleSources];for(let n=0;n<o.length;n++){if(r<o[n].modes.length){const t=[...o[n].modes];return t[r]={...t[r],[i]:a},o[n]={...o[n],modes:t},void(e._titleSources=o)}r-=o[n].modes.length}}(this,e,t,i)}_setTitlePeriodEntity(e){if(this._titlePeriodDropdownOpen=!1,this._titlePeriodEntity=e,e&&this.hass){const t=this.hass.states[e];if(t){const e=t.attributes.options??[],i=new Map(this._titlePeriodOptions.map(e=>[e.id,e]));this._titlePeriodOptions=e.map(e=>i.get(e)??{id:e,label:e,icon:"",color:""})}}else e||(this._titlePeriodOptions=[])}_updateTitlePeriodOption(e,t,i){const a=[...this._titlePeriodOptions];a[e]&&(a[e]={...a[e],[t]:i},this._titlePeriodOptions=a)}async _openIconPopup(e){if(!this._iconLoading){if(0===this._iconList.length){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}e<this._titleModes.length&&(this._iconSearch="",this._iconPopupModeIdx=e)}}async _openPeriodIconPopup(e){if(!this._iconLoading){if(0===this._iconList.length){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}e<this._titlePeriodOptions.length&&(this._iconSearch="",this._periodIconPopupIdx=e)}}_getFilteredIcons(){return function(e){const t=e._iconSearch.toLowerCase().trim(),i=e._iconList;return t?i.filter(e=>e.toLowerCase().includes(t)).slice(0,120):i.slice(0,120)}(this)}_loadUnassignedEntities(){this._unassignedEntities=function(e){if(!e.hass)return[];const t=e.hass.entities,i=e.hass.devices,a=e.hass.areas,r=[];for(const o of Object.values(t)){if(o.disabled_by||o.hidden_by)continue;const t=o.entity_id.split(".")[0];if(!ut.includes(t))continue;const n=Te(o,i),s=e.hass.states[o.entity_id],c=s?.attributes?.friendly_name??o.entity_id,d=n?a[n]?.name??null:null;r.push({entityId:o.entity_id,name:c,domain:t,areaId:n,areaName:d})}return r.sort((e,t)=>{const i=e.areaId?1:0,a=t.areaId?1:0;if(i!==a)return i-a;const r=ut.indexOf(e.domain)-ut.indexOf(t.domain);return 0!==r?r:e.name.localeCompare(t.name)}),r}(this),this._unassignedDropdownEntity=null,this._unassignedEditingEntity=null,this._unassignedEntitySearch="",this._unassignedAreaSearch=""}_assignEntityArea(e,t){!async function(e,t,i){if(e.hass)try{await e.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:t,area_id:i}),e._unassignedEntities=e._unassignedEntities.map(a=>a.entityId===t?{...a,areaId:i,areaName:e.hass?.areas[i]?.name??null}:a),e._unassignedDropdownEntity=null,e._unassignedAreaSearch=""}catch{e._showToast(!0)}}(this,e,t)}_renameEntity(e,t){!async function(e,t,i){if(!e.hass)return;const a=i.trim();if(!a)return void(e._unassignedEditingEntity=null);const r=e._unassignedEntities.find(e=>e.entityId===t);if(r&&r.name===a)e._unassignedEditingEntity=null;else{try{await e.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:t,name:a}),e._unassignedEntities=e._unassignedEntities.map(e=>e.entityId===t?{...e,name:a}:e)}catch{e._showToast(!0)}e._unassignedEditingEntity=null}}(this,e,t)}_renderNavbarPreview(){return function(e){const t=[...e._rooms.filter(e=>e.visible)];return e._autoSort&&t.sort((e,t)=>(e.lightsOn>0?0:1)-(t.lightsOn>0?0:1)),W`
    <div class="preview-navbar">
      ${t.map((t,i)=>{const a=e._showLights&&t.lightsOn>0,r=e._showHumidity&&null!==t.humidityValue&&t.humidityValue>=e._humidityThreshold,o=e._showMedia&&t.mediaPlaying,n=e._showTemperature&&null!==t.tempValue&&t.tempValue>=e._tempHigh,s=e._showTemperature&&null!==t.tempValue&&!n&&t.tempValue<=e._tempLow,c=["preview-nav-item",0===i?"active-preview":"",a?"has-light":"",r?"has-humidity":"",o?"has-music":"",n?"has-temp-hot":"",s?"has-temp-cold":""].filter(Boolean).join(" ");return W`
          <div class=${c}>
            ${n||s?W`
              <span class="preview-temp-badge">
                <ha-icon .icon=${n?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
              </span>
            `:B}
            <ha-icon .icon=${t.icon}></ha-icon>
            <div class="preview-nav-label"><span>${t.name}</span></div>
          </div>
        `})}
    </div>
  `}(this)}_renderPopupPreview(){return function(e){const t=e._rooms.find(t=>t.areaId===e._selectedRoom);if(!t)return W`<div class="preview-empty">${De("config.popup_select_room")}</div>`;const i=e._scenes.length>0,a=e._scenes.filter(e=>e.visible),r=["preview-popup-icon-box",t.lightsOn>0?"has-light":"",t.mediaPlaying?"has-music":""].filter(Boolean).join(" ");return W`
    <div class="preview-popup">
      <div class="preview-popup-header">
        <div class="preview-popup-header-left">
          <div class=${r}>
            <ha-icon .icon=${t.icon}></ha-icon>
          </div>
          <div class="preview-popup-scene-dash ${i?"visible":""}"></div>
        </div>
        <div class="preview-popup-info">
          <div class="preview-popup-name">${t.name}</div>
          <div class="preview-popup-meta">
            ${t.temperature?W`<span>${t.temperature}</span>`:B}
            ${t.humidity?W`<span>${t.humidity}</span>`:B}
          </div>
        </div>
        <div class="preview-popup-close">
          <ha-icon .icon=${"mdi:close"}></ha-icon>
        </div>
      </div>

      ${a.length>0?W`
        <div class="preview-popup-scenes">
          ${a.map(e=>W`
              <span class="preview-scene-chip">${e.name}</span>
            `)}
        </div>
      `:B}

      <div class="preview-popup-cards">
        ${e._cards.filter(e=>e.visible).map(e=>W`
            <div class="preview-card-slot">
              <ha-icon .icon=${e.icon}></ha-icon>
              <span class="preview-card-slot-name">${e.nameKey?De(e.nameKey):e.id}</span>
              <span class="preview-card-slot-count">${e.count}</span>
            </div>
          `)}
      </div>
    </div>
  `}(this)}_renderLightPreview(){return function(e){if(!e._lightRoom)return W`<div class="preview-empty">${De("config.light_select_room")}</div>`;if(0===e._lights.length)return W`<div class="preview-empty">${De("config.light_no_lights")}</div>`;const t=e._lights.filter(e=>e.visible),i=t.filter(e=>e.isOn).length,a=t.length,r=i>0,o=0===i?"none":i===a?"all":"some";if(0===t.length)return W`<div class="preview-empty">${De("config.light_no_visible")}</div>`;const n=[],s=[];for(const l of t)"compact"==("full"===l.layout?"full":"compact")?(s.push(l),2===s.length&&(n.push({kind:"compact-pair",left:s[0],right:s[1]}),s.length=0)):(s.length>0&&(n.push({kind:"compact-pair",left:s[0],right:null}),s.length=0),n.push({kind:"full",light:l}));s.length>0&&n.push({kind:"compact-pair",left:s[0],right:null});const c=r?.06:0,d=(t,i,a)=>{const r=["preview-light-row",i?"compact":"",a?"compact-right":"",t.visible?"":"hidden-light"].filter(Boolean).join(" "),o=e._scheduleEdits.get(t.entityId),n=o?o.some(e=>e.start&&e.end):(e._schedulesLoaded[t.entityId]?.periods?.length??0)>0;return W`
      <div class=${r} data-on=${t.isOn}>
        <div class="preview-light-icon ${t.isOn?"on":""}">
          <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
        </div>
        <div class="preview-light-info">
          <div class="preview-light-name">${t.name}</div>
          <div class="preview-light-sub">${t.isOn?`${t.brightnessPct}%`:De("common.off")}</div>
        </div>
        ${n?W`<ha-icon class="preview-light-sched" .icon=${"mdi:calendar-clock"}></ha-icon>`:B}
        ${"full"===t.layout?W`<span class="preview-light-layout-tag">full</span>`:B}
        <span class="preview-light-dot ${t.isOn?"on":""}"></span>
      </div>
    `};return W`
    <div class="preview-light">
      ${e._lightShowHeader?W`
        <div class="preview-light-header">
          <div class="preview-light-header-left">
            <span class="preview-light-title">${De("light.title")}</span>
            <span class="preview-light-count ${o}">${i}/${a}</span>
          </div>
          <div class="preview-light-toggle ${r?"on":""}"></div>
        </div>
      `:B}
      <div class="preview-light-body">
        <div
          class="preview-light-tint"
          style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${c}"
        ></div>
        <div class="preview-light-grid">
          ${n.map(e=>"full"===e.kind?d(e.light,!1,!1):W`
              ${d(e.left,!0,!1)}
              ${e.right?d(e.right,!0,!0):B}
            `)}
        </div>
      </div>
    </div>
  `}(this)}_renderWeatherPreview(){return function(e){if(!e._weatherEntity||!e.hass)return W`<div class="preview-empty">${De("config.weather_select_entity")}</div>`;const t=e.hass.states[e._weatherEntity];if(!t)return W`<div class="preview-empty">${De("config.weather_select_entity")}</div>`;const i=t.attributes,a=i.temperature??"--",r=i.temperature_unit??"°C",o=new Set(e._weatherHiddenMetrics),n=t.state||"sunny",s={sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",partlycloudy:"mdi:weather-partly-cloudy",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",snowy:"mdi:weather-snowy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning"}[n]||"mdi:weather-cloudy",c=De({sunny:"weather.cond_sunny","clear-night":"weather.cond_clear_night",partlycloudy:"weather.cond_partly_cloudy",cloudy:"weather.cond_cloudy",fog:"weather.cond_foggy",rainy:"weather.cond_rainy",pouring:"weather.cond_pouring",snowy:"weather.cond_snowy",windy:"weather.cond_windy",lightning:"weather.cond_lightning"}[n]||"weather.cond_cloudy"),d={sunny:"#fbbf24","clear-night":"#6366f1",partlycloudy:"#94a3b8",cloudy:"#64748b",fog:"#94a3b8",rainy:"#3b82f6",pouring:"#2563eb",snowy:"#e2e8f0",windy:"#6ee7b3",lightning:"#a78bfa"}[n]||"#64748b",l={sunny:"rgba(251,191,36,0.8)","clear-night":"rgba(129,140,248,0.7)",partlycloudy:"rgba(148,163,184,0.6)",cloudy:"rgba(100,116,139,0.6)",fog:"rgba(148,163,184,0.5)",rainy:"rgba(96,165,250,0.7)",pouring:"rgba(59,130,246,0.8)",snowy:"rgba(226,232,240,0.7)",windy:"rgba(110,231,179,0.6)",lightning:"rgba(167,139,250,0.8)"}[n]||"rgba(148,163,184,0.6)",p=new Date,h=p.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),_=String(p.getSeconds()).padStart(2,"0"),m=p.toLocaleDateString(e.hass.language||"fr",{weekday:"long",day:"numeric",month:"long"}),u=i.apparent_temperature??null,g="number"==typeof a?a:12,v=[0,.5,1.2,.8,-.3,-1,-.5,.2,.7,1.5],f=44,b=Math.min(...v),y=Math.max(...v)-b||1,w=v.map((e,t)=>({x:t/(v.length-1)*348,y:6+32*(1-(e-b)/y)}));let x=`M${w[0].x},${w[0].y}`;for(let j=0;j<w.length-1;j++){const e=w[Math.max(0,j-1)],t=w[j],i=w[j+1],a=w[Math.min(w.length-1,j+2)];x+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}const $=x+" L348,44 L0,44 Z",k=.3*(v.length-1),S=Math.floor(k),E=Math.min(v.length-1,S+1),D=k-S,C=6+32*(1-(v[S]+(v[E]-v[S])*D-b)/y),P=p.getHours(),z=v.map((e,t)=>`${String((P+t)%24).padStart(2,"0")}h`),I=[];if(o.has("humidity")||null==i.humidity||I.push({key:"humidity",icon:"mdi:water-percent",val:`${i.humidity}`,unit:"%"}),!o.has("wind")&&null!=i.wind_speed){const t="number"==typeof i.wind_bearing?e._windBearingToDir(i.wind_bearing):void 0;I.push({key:"wind",icon:"mdi:weather-windy",val:`${Math.round(i.wind_speed)}`,unit:"km/h",dir:t})}if(o.has("pressure")||null==i.pressure||I.push({key:"pressure",icon:"mdi:gauge",val:`${Math.round(i.pressure)}`,unit:"hPa"}),o.has("uv")||null==i.uv_index||I.push({key:"uv",icon:"mdi:sun-wireless",val:`${Math.round(i.uv_index)}`,unit:"UV"}),o.has("visibility")||null==i.visibility||I.push({key:"visibility",icon:"mdi:eye-outline",val:`${i.visibility}`,unit:"km"}),!o.has("sunrise")){const t=e.hass.states["sun.sun"],i=t?.attributes.next_rising;I.push({key:"sunrise",icon:"mdi:weather-sunset-up",val:i?new Date(i).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}if(!o.has("sunset")){const t=e.hass.states["sun.sun"],i=t?.attributes.next_setting;I.push({key:"sunset",icon:"mdi:weather-sunset-down",val:i?new Date(i).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}const A=e.hass.language||"fr",O=Array.from({length:7},(e,t)=>{const i=new Date(2024,0,t+1);return new Intl.DateTimeFormat(A,{weekday:"short"}).format(i)}),R=[g+2,g+1,g,g-1,g+1,g+3,g],T=[g-4,g-3,g-5,g-6,g-4,g-2,g-5],M=[0,10,30,60,20,0,15],H=(p.getDay()+6)%7;return W`
    <div class="preview-weather-wrap">
      ${e._weatherShowHeader?W`
        <div class="pw-card-header">
          <span class="pw-card-title">${De("weather.title")}</span>
          <span class="pw-card-location">${t.attributes.friendly_name??""}</span>
        </div>
      `:B}
    <div class="preview-weather">
      <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${d}22 0%, transparent 70%);"></div>
      <div class="pw-content">
        <div class="pw-header">
          <div class="pw-header-left">
            <span class="pw-time">${h}<span class="pw-sec">:${_}</span></span>
            <span class="pw-date">${m}</span>
          </div>
          <div class="pw-header-right">
            <span class="pw-temp">${a}<span class="pw-temp-unit">${r}</span></span>
            <span class="pw-cond"><ha-icon .icon=${s}></ha-icon>${c}</span>
            ${null!=u?W`<span class="pw-feels">${De("weather.feels_like",{temp:String(Math.round(u))})}</span>`:B}
          </div>
        </div>

        <div class="pw-spark-zone">
          <svg class="pw-spark-svg" viewBox="0 0 ${348} ${f}" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pw-spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${l}" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="${l}" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="${$}" fill="url(#pw-spark-fill)"/>
            <path d="${x}" fill="none" stroke="${l}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="pw-spark-now" style="left: ${30}%;">
            <div class="pw-spark-now-dot" style="top: ${C/f*100}%;"></div>
          </div>
          <div class="pw-spark-labels">
            ${z.map((e,t)=>t%2==0||t===z.length-1?W`<span class="pw-spark-lbl" style="left: ${t/(z.length-1)*100}%;">${e}</span>`:B)}
          </div>
        </div>

        ${I.length>0?W`
          <div class="pw-metrics" style="grid-template-columns: repeat(${3}, 1fr);">
            ${I.map(e=>W`
              <div class="pw-metric ${e.key}">
                <ha-icon .icon=${e.icon}></ha-icon>
                <span class="pw-metric-val">${e.val}</span>
                ${e.unit?W`<span class="pw-metric-unit">${e.unit}</span>`:B}
                ${e.dir?W`<span class="pw-metric-dir">${e.dir}</span>`:B}
              </div>
            `)}
          </div>
        `:B}

        ${e._weatherShowDaily||e._weatherShowHourly?W`
          <div class="pw-forecast-zone">
            <div class="pw-tabs">
              ${e._weatherShowDaily?W`<span class="pw-tab active">${De("weather.daily_tab")}</span>`:B}
              ${e._weatherShowHourly?W`<span class="pw-tab">${De("weather.hourly_tab")}</span>`:B}
            </div>
            <div class="pw-fold-sep"></div>
            ${e._weatherShowDaily?W`
              <div class="pw-daily-list">
                ${["mdi:weather-sunny","mdi:weather-partly-cloudy","mdi:weather-cloudy","mdi:weather-rainy","mdi:weather-partly-cloudy","mdi:weather-sunny","mdi:weather-cloudy"].slice(0,5).map((e,t)=>{const i=(H+t)%7,a=0===t?De("weather.today"):O[i],r=Math.round(R[t]),o=Math.round(T[t]),n=M[t];return W`
                    <div class="pw-day-row ${0===t?"today":""}">
                      <span class="pw-day-label">${a}</span>
                      <ha-icon class="pw-day-icon" .icon=${e}></ha-icon>
                      <span class="pw-day-temps"><span class="pw-day-high">${r}°</span><span class="pw-day-low">${o}°</span></span>
                      ${n>0?W`<span class="pw-day-precip">${n}%</span>`:W`<span class="pw-day-precip"></span>`}
                    </div>
                  `})}
              </div>
            `:B}
          </div>
        `:B}
      </div>
    </div>
    </div>
  `}(this)}_renderTitlePreview(){return nt(this)}_renderMediaPreview(){return function(e){const t=e._mediaRoom,i=e._mediaRoomNativePlayers.length+(t?(e._mediaExtraEntities[t]??[]).length:0),a=t?function(e,t){if(!e.hass)return 0;return[...e._mediaRoomNativePlayers,...e._mediaExtraEntities[t]??[]].filter(t=>"playing"===e.hass?.states[t]?.state).length}(e,t):1;return W`
    <div class="preview-media">
      <!-- Simulated full-bleed artwork background -->
      <div class="mp-art-bg"></div>
      <div class="mp-gradient"></div>
      <div class="mp-content">
        <!-- Top bar: glass pill badges -->
        <div class="mp-top">
          <div class="mp-pill">
            <ha-icon .icon=${"mdi:speaker"}></ha-icon>
            <span>${t?e._rooms.find(e=>e.areaId===t)?.name??De("config.media_room"):De("config.media_select_room")}</span>
            ${a>0?W`
              <div class="mp-eq">
                <div class="mp-eq-bar"></div>
                <div class="mp-eq-bar"></div>
                <div class="mp-eq-bar"></div>
              </div>
            `:B}
          </div>
          ${i>1?W`
            <div class="mp-pill">
              <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
              <span>${i}</span>
            </div>
          `:B}
        </div>
        <!-- Spacer -->
        <div class="mp-spacer"></div>
        <!-- Bottom glass panel -->
        <div class="mp-glass-panel">
          ${e._mediaShowHeader?W`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${De("media.title")}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:var(--radius-sm);background:rgba(96,165,250,0.15);color:#60a5fa;">${a}/${i||1}</span>
            </div>
          `:B}
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
  `}(this)}_renderCoverPreview(){return Ye(this)}_renderClimatePreview(){return lt(this)}_renderFanPreview(){return Je(this)}_renderSpotifyPreview(){return Ze(this)}_renderPresencePreview(){return function(e){const t=e._getAvailablePersonEntities(),i=e._presencePersonEntities.length>0?t.filter(t=>e._presencePersonEntities.includes(t.entityId)):t;if(0===i.length)return W`<div class="preview-empty">${De("config.presence_no_persons")}</div>`;const a=i.filter(t=>{const i=e.hass?.states[t.entityId];return"home"===i?.state}).length;return W`
    <div class="preview-presence">
      ${e._presenceShowHeader?W`
        <div class="preview-presence-header">
          <span class="preview-presence-title">${De("presence.title")}</span>
          <span class="preview-presence-pill ${a===i.length?"all-home":0===a?"all-away":"mixed"}">
            ${a}/${i.length}
          </span>
        </div>
      `:B}
      <div class="preview-presence-persons">
        ${i.slice(0,4).map(t=>{const i=e.hass?.states[t.entityId],a="home"===i?.state,r=i?.attributes?.entity_picture;return W`
            <div class="preview-presence-person ${a?"home":"away"}">
              ${r?W`<div class="preview-presence-avatar" style="background-image:url(${r})"></div>`:W`<div class="preview-presence-avatar fallback"><ha-icon .icon=${"mdi:account"}></ha-icon></div>`}
              <span class="preview-presence-name">${t.name}</span>
            </div>
          `})}
      </div>
    </div>
  `}(this)}_renderCameraCarouselPreview(){return function(){const e="rgba(96,165,250,",t={name:"Entrée",state:"streaming",icon:"mdi:cctv",ai:["person"]};return W`
    <div style="padding:10px;">
      <!-- Viewport -->
      <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:var(--radius-md);overflow:hidden;background:#0a0f18;border:1px solid var(--b1);margin-bottom:8px;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 25% 35%,rgba(40,60,90,0.4) 0%,transparent 40%),radial-gradient(circle at 65% 55%,rgba(30,50,70,0.3) 0%,transparent 45%),linear-gradient(135deg,#141e2e 0%,#0d1520 40%,#111a28 100%);">
          <!-- Top overlay -->
          <div style="position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:5px 7px;background:linear-gradient(180deg,rgba(0,0,0,0.5) 0%,transparent 100%);">
            <div style="font-size:7px;font-weight:600;color:rgba(255,255,255,0.7);display:flex;align-items:center;gap:3px;">
              <ha-icon .icon=${"mdi:cctv"} style="--mdc-icon-size:8px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${t.name}
              <span style="display:inline-flex;align-items:center;gap:2px;font-size:6px;font-weight:700;color:var(--c-alert);">
                <span style="width:4px;height:4px;border-radius:50%;background:var(--c-alert);"></span> REC
              </span>
            </div>
          </div>
          <!-- Bottom overlay -->
          ${t.ai.length>0?W`
            <div style="position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:flex-end;padding:5px 7px;background:linear-gradient(0deg,rgba(0,0,0,0.5) 0%,transparent 100%);">
              <div style="display:flex;gap:3px;">
                ${t.ai.map(t=>W`
                  <div style="display:inline-flex;align-items:center;gap:2px;padding:1px 4px;border-radius:4px;font-size:6px;font-weight:600;background:${e}0.15);color:#60a5fa;border:1px solid ${e}0.2);">
                    <ha-icon .icon=${"mdi:human"} style="--mdc-icon-size:7px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                    ${t}
                  </div>
                `)}
              </div>
            </div>
          `:B}
          <!-- Nav arrows -->
          <div style="position:absolute;top:50%;left:4px;transform:translateY(-50%);width:18px;height:18px;border-radius:50%;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">
            <ha-icon .icon=${"mdi:chevron-left"} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;"></ha-icon>
          </div>
          <div style="position:absolute;top:50%;right:4px;transform:translateY(-50%);width:18px;height:18px;border-radius:50%;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">
            <ha-icon .icon=${"mdi:chevron-right"} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;"></ha-icon>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:6px;">
        <div style="width:14px;height:5px;border-radius:3px;background:#60a5fa;box-shadow:0 0 6px ${e}0.4);"></div>
        <div style="width:5px;height:5px;border-radius:50%;background:var(--c-alert);box-shadow:0 0 4px rgba(248,113,113,0.5);"></div>
        <div style="width:5px;height:5px;border-radius:50%;background:var(--t4);"></div>
      </div>

      <!-- Info bar -->
      <div style="display:flex;align-items:center;gap:7px;padding:0 2px;margin-bottom:6px;">
        <div style="width:22px;height:22px;border-radius:var(--radius-sm);background:${e}0.1);border:1px solid ${e}0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <ha-icon .icon=${"mdi:cctv"} style="--mdc-icon-size:12px;color:#60a5fa;display:flex;align-items:center;justify-content:center;"></ha-icon>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${t.name}</div>
          <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
            <span style="font-size:7px;font-weight:500;color:${`${e}0.6)`};">${"En direct"}</span>
            ${t.ai.length>0?W`
              <div style="display:flex;gap:2px;align-items:center;">
                <div style="width:12px;height:12px;border-radius:4px;background:${e}0.12);display:flex;align-items:center;justify-content:center;">
                  <ha-icon .icon=${"mdi:human"} style="--mdc-icon-size:8px;color:#60a5fa;display:flex;align-items:center;justify-content:center;"></ha-icon>
                </div>
              </div>
            `:B}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div style="display:flex;gap:4px;flex-wrap:wrap;">
        ${["mdi:power","mdi:camera","mdi:record-circle","mdi:motion-sensor"].map((t,i)=>W`
          <div style="display:inline-flex;align-items:center;gap:3px;padding:3px 7px;border-radius:var(--radius-xs);border:1px solid ${0===i?`${e}0.15)`:"var(--b2)"};background:${0===i?`${e}0.1)`:"var(--s1)"};font-size:8px;font-weight:600;color:${0===i?"#60a5fa":"var(--t3)"};">
            <ha-icon .icon=${t} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          </div>
        `)}
      </div>
    </div>
  `}()}_renderDashboardPreview(){return function(e){const t=new Set(e._dashboardEnabledCards),i={title:{icon:"mdi:format-title",label:e._titleText||De("config.title_title_placeholder"),titleStyle:"font-size:11px;font-weight:700;color:var(--t1);"},weather:{icon:"mdi:weather-partly-cloudy",label:De("weather.title")},climate:{icon:"mdi:thermostat",label:De("climate.title")},light:{icon:"mdi:lightbulb-group",label:De("light.title")},media:{icon:"mdi:speaker",label:De("media.title")},fan:{icon:"mdi:fan",label:De("fan.title")},cover:{icon:"mdi:blinds",label:De("cover.title")},spotify:{icon:"mdi:spotify",label:De("spotify.title")},presence:{icon:"mdi:account-group",label:De("presence.title")}},a=e._dashboardCardOrder.filter(e=>t.has(e));return W`
    <div class="preview-dashboard">
      <div class="preview-dashboard-cards">
        ${0===a.length?W`<div class="preview-dashboard-empty">—</div>`:B}
        ${a.map(e=>{const t=i[e];return t?W`
            <div class="preview-dashboard-card ${e}">
              ${t.titleStyle?W`<span style=${t.titleStyle}>${t.label}</span>`:W`<ha-icon .icon=${t.icon}></ha-icon><span>${t.label}</span>`}
            </div>
          `:B})}
      </div>
      <div class="preview-dashboard-navbar">
        <ha-icon .icon=${"mdi:sofa"}></ha-icon>
        <ha-icon .icon=${"mdi:stove"}></ha-icon>
        <ha-icon .icon=${"mdi:bed"}></ha-icon>
      </div>
    </div>
  `}(this)}_renderNavbarTab(){return W`
    <div class="tab-panel" id="panel-navbar">

      ${(e=this)._emptyRooms.length>0?W`
        <div class="section-label">${De("config.navbar_empty_rooms")}</div>
        <div class="section-desc">
          ${De("config.navbar_empty_rooms_desc")}
        </div>
        <div class="item-list empty-rooms">
          ${e._emptyRooms.map(e=>W`
            <div class="item-row disabled">
              <span class="drag-handle">
                <ha-icon .icon=${"mdi:drag"}></ha-icon>
              </span>
              <div class="room-icon-btn">
                <ha-icon .icon=${e.icon}></ha-icon>
              </div>
              <div class="item-info">
                <span class="item-name">${e.name}</span>
                <span class="item-meta">0 ${De("common.entities")}</span>
              </div>
            </div>
          `)}
        </div>
      `:B}

      <div class="section-label">${De("config.navbar_behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._autoSort?"true":"false"}
          @click=${()=>{e._autoSort=!e._autoSort}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.navbar_auto_sort")}</div>
            <div class="feature-desc">${De("config.navbar_auto_sort_desc")}</div>
          </div>
          <span
            class="toggle ${e._autoSort?"on":""}"
          ></span>
        </button>
      </div>

      <div class="banner">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        <span>${De("config.navbar_rooms_banner")}</span>
      </div>
      <div class="section-label">${De("config.navbar_visible_rooms")}</div>
      <div class="item-list">
        ${e._rooms.map((t,i)=>e._renderRoomRow(t,i))}
      </div>

      <div class="icon-picker-fold ${e._iconPickerRoom?"open":""}">
        <div class="icon-picker-inner">
          <div class="section-label">
            ${De("config.navbar_icon_label",{name:e._rooms.find(t=>t.areaId===e._iconPickerRoom)?.name||""})}
          </div>
          <div class="icon-picker-grid">
            ${Ke.map(t=>W`
                <button
                  class="icon-pick ${e._rooms.find(t=>t.areaId===e._iconPickerRoom)?.icon===t?"selected":""}"
                  @click=${()=>e._iconPickerRoom&&e._setRoomIcon(e._iconPickerRoom,t)}
                  aria-label="${De("config.navbar_choose_icon")}"
                >
                  <ha-icon .icon=${t}></ha-icon>
                </button>
              `)}
          </div>
        </div>
      </div>

      <div class="section-label">${De("config.navbar_indicators")}</div>
      <div class="section-desc">${De("config.navbar_indicators_desc")}</div>
      <div class="feature-list">
        ${[{key:"lights",icon:"mdi:lightbulb",nameKey:"config.navbar_ind_lights",descKey:"config.navbar_ind_lights_desc"},{key:"temperature",icon:"mdi:thermometer",nameKey:"config.navbar_ind_temp",descKey:"config.navbar_ind_temp_desc"},{key:"humidity",icon:"mdi:water-percent",nameKey:"config.navbar_ind_humidity",descKey:"config.navbar_ind_humidity_desc"},{key:"media",icon:"mdi:music",nameKey:"config.navbar_ind_media",descKey:"config.navbar_ind_media_desc"}].map(t=>{const i={lights:e._showLights,temperature:e._showTemperature,humidity:e._showHumidity,media:e._showMedia}[t.key];return W`
            <button
              class="feature-row"
              role="switch"
              aria-checked=${i?"true":"false"}
              @click=${()=>{"lights"===t.key?e._showLights=!e._showLights:"temperature"===t.key?e._showTemperature=!e._showTemperature:"humidity"===t.key?e._showHumidity=!e._showHumidity:e._showMedia=!e._showMedia}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${t.icon}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De(t.nameKey)}</div>
                <div class="feature-desc">${De(t.descKey)}</div>
              </div>
              <span
                class="toggle ${i?"on":""}"
              ></span>
            </button>
          `})}
      </div>

      <div class="section-label">${De("config.navbar_thresholds")}</div>
      <div class="section-desc">${De("config.navbar_thresholds_desc")}</div>
      <div class="threshold-list">
        <div class="threshold-row">
          <div class="threshold-icon hot">
            <ha-icon .icon=${"mdi:thermometer-high"}></ha-icon>
          </div>
          <span class="threshold-label">${De("config.navbar_temp_high")}</span>
          <input
            class="threshold-input"
            type="number"
            step="0.5"
            .value=${String(e._tempHigh)}
            @change=${t=>{const i=parseFloat(t.target.value);e._tempHigh=isNaN(i)?24:i}}
            aria-label="${De("config.navbar_temp_high")}"
          />
          <span class="threshold-unit">°C</span>
        </div>
        <div class="threshold-row">
          <div class="threshold-icon cold">
            <ha-icon .icon=${"mdi:snowflake"}></ha-icon>
          </div>
          <span class="threshold-label">${De("config.navbar_temp_low")}</span>
          <input
            class="threshold-input"
            type="number"
            step="0.5"
            .value=${String(e._tempLow)}
            @change=${t=>{const i=parseFloat(t.target.value);e._tempLow=isNaN(i)?17:i}}
            aria-label="${De("config.navbar_temp_low")}"
          />
          <span class="threshold-unit">°C</span>
        </div>
        <div class="threshold-row">
          <div class="threshold-icon humidity">
            <ha-icon .icon=${"mdi:water-percent"}></ha-icon>
          </div>
          <span class="threshold-label">${De("config.navbar_humidity_threshold")}</span>
          <input
            class="threshold-input"
            type="number"
            step="1"
            .value=${String(e._humidityThreshold)}
            @change=${t=>{const i=parseFloat(t.target.value);e._humidityThreshold=isNaN(i)?65:i}}
            aria-label="${De("config.navbar_humidity_threshold")}"
          />
          <span class="threshold-unit">%</span>
        </div>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `;var e}_renderRoomRow(e,t){return function(e,t,i){const a=e._dragIdx===i&&"rooms"===e._dragContext,r=e._dropIdx===i&&"rooms"===e._dragContext,o=["item-row",t.visible?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return W`
    <div
      class=${o}
      draggable="true"
      @dragstart=${()=>e._onDragStart(i,"rooms")}
      @dragover=${t=>e._onDragOver(i,t)}
      @dragleave=${()=>e._onDragLeave()}
      @drop=${t=>e._onDropGeneric(i,t)}
      @dragend=${()=>e._onDragEnd()}
    >
      <span class="drag-handle">
        <ha-icon .icon=${"mdi:drag"}></ha-icon>
      </span>
      <button
        class="room-icon-btn"
        @click=${()=>e._openIconPicker(t.areaId)}
        aria-label="${De("config.navbar_change_icon_aria",{name:t.name})}"
      >
        <ha-icon .icon=${t.icon}></ha-icon>
      </button>
      <div class="item-info">
        <span class="item-name">${t.name}</span>
        <span class="item-meta">${t.entityCount} ${De("common.entities")}</span>
      </div>
      <button
        class="toggle ${t.visible?"on":""}"
        @click=${()=>e._toggleRoomVisible(t.areaId)}
        role="switch"
        aria-checked=${t.visible?"true":"false"}
        aria-label="${t.visible?De("common.hide"):De("common.show")} ${t.name}"
      ></button>
    </div>
  `}(this,e,t)}_renderPopupTab(){return function(e){const t=e._rooms.find(t=>t.areaId===e._selectedRoom);return W`
    <div class="tab-panel" id="panel-popup">
      <div class="section-label">${De("config.popup_room")}</div>
      <div class="section-desc">
        ${De("config.popup_room_desc")}
      </div>
      <div class="dropdown ${e._dropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._dropdownOpen||(e._popupRoomSearch=""),e._dropdownOpen=!e._dropdownOpen}}
          aria-expanded=${e._dropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||De("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${De("config.search_entity")}
            .value=${e._popupRoomSearch}
            @input=${t=>{e._popupRoomSearch=t.target.value,e.requestUpdate()}}
            @click=${e=>e.stopPropagation()}
          />
          ${e._rooms.filter(t=>!e._popupRoomSearch||t.name.toLowerCase().includes(e._popupRoomSearch.toLowerCase())).map(t=>W`
              <button
                class="dropdown-item ${t.areaId===e._selectedRoom?"active":""}"
                role="option"
                aria-selected=${t.areaId===e._selectedRoom?"true":"false"}
                @click=${()=>e._selectRoom(t.areaId)}
              >
                <ha-icon .icon=${t.icon}></ha-icon>
                ${t.name}
              </button>
            `)}
        </div>
      </div>

      <div class="section-label">${De("config.popup_internal_cards")}</div>
      <div class="section-desc">
        ${De("config.popup_internal_cards_desc")}
      </div>
      <div class="item-list">
        ${e._cards.map((t,i)=>e._renderCardRow(t,i))}
      </div>

      ${e._scenes.length>0?W`
        <div class="section-label">${De("config.popup_scenes")} (${e._scenes.length})</div>
        <div class="section-desc">
          ${De("config.popup_scenes_desc")}
        </div>
        <div class="item-list">
          ${e._scenes.map((t,i)=>e._renderSceneRow(t,i))}
        </div>
      `:B}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderCardRow(e,t){return function(e,t,i){const a=e._dragIdx===i&&"cards"===e._dragContext,r=e._dropIdx===i&&"cards"===e._dragContext,o=["item-row card-row",t.visible?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return W`
    <div
      class=${o}
      draggable="true"
      @dragstart=${()=>e._onDragStart(i,"cards")}
      @dragover=${t=>e._onDragOver(i,t)}
      @dragleave=${()=>e._onDragLeave()}
      @drop=${t=>e._onDropGeneric(i,t)}
      @dragend=${()=>e._onDragEnd()}
    >
      <span class="drag-handle">
        <ha-icon .icon=${"mdi:drag"}></ha-icon>
      </span>
      <div class="card-icon-box">
        <ha-icon .icon=${t.icon}></ha-icon>
      </div>
      <div class="item-info">
        <span class="item-name">${t.nameKey?De(t.nameKey):t.id}</span>
        <span class="item-meta">${t.descKey?De(t.descKey):""}</span>
      </div>
      <span class="card-count">${t.count}</span>
      <button
        class="toggle ${t.visible?"on":""}"
        @click=${()=>e._toggleCardVisible(t.id)}
        role="switch"
        aria-checked=${t.visible?"true":"false"}
        aria-label="${t.visible?De("common.hide"):De("common.show")} ${t.nameKey?De(t.nameKey):t.id}"
      ></button>
    </div>
  `}(this,e,t)}_renderSceneRow(e,t){return function(e,t,i){const a=e._dragIdx===i&&"scenes"===e._dragContext,r=e._dropIdx===i&&"scenes"===e._dragContext,o=["item-row",t.visible?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return W`
    <div
      class=${o}
      draggable="true"
      @dragstart=${()=>e._onDragStart(i,"scenes")}
      @dragover=${t=>e._onDragOver(i,t)}
      @dragleave=${()=>e._onDragLeave()}
      @drop=${t=>e._onDropGeneric(i,t)}
      @dragend=${()=>e._onDragEnd()}
    >
      <span class="drag-handle">
        <ha-icon .icon=${"mdi:drag"}></ha-icon>
      </span>
      <div class="card-icon-box">
        <ha-icon .icon=${"mdi:palette"}></ha-icon>
      </div>
      <div class="item-info">
        <span class="item-name">${t.name}</span>
        <span class="item-meta">${t.entityId}</span>
      </div>
      <button
        class="toggle ${t.visible?"on":""}"
        @click=${()=>e._toggleSceneVisible(t.entityId)}
        role="switch"
        aria-checked=${t.visible?"true":"false"}
        aria-label="${t.visible?De("common.hide"):De("common.show")} ${t.name}"
      ></button>
    </div>
  `}(this,e,t)}_renderLightTab(){return function(e){const t=e._rooms.find(t=>t.areaId===e._lightRoom);return W`
    <div class="tab-panel" id="panel-light">
      <div class="section-label">${De("config.behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._lightShowHeader?"true":"false"}
          @click=${()=>{e._lightShowHeader=!e._lightShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.light_show_header")}</div>
            <div class="feature-desc">${De("config.light_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._lightShowHeader?"on":""}"
          ></span>
        </button>
      </div>

      <div class="section-label">${De("config.light_room")}</div>
      <div class="section-desc">
        ${De("config.light_room_desc")}
      </div>
      <div class="dropdown ${e._lightDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>e._lightDropdownOpen=!e._lightDropdownOpen}
          aria-expanded=${e._lightDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||De("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>W`
              <button
                class="dropdown-item ${t.areaId===e._lightRoom?"active":""}"
                role="option"
                aria-selected=${t.areaId===e._lightRoom?"true":"false"}
                @click=${()=>e._selectLightRoom(t.areaId)}
              >
                <ha-icon .icon=${t.icon}></ha-icon>
                ${t.name}
              </button>
            `)}
        </div>
      </div>

      ${e._lights.length>0?W`
            <div class="section-label">${De("config.light_list_title")} (${e._lights.length})</div>
            <div class="section-desc">
              ${De("config.light_list_banner")}
            </div>
            <div class="item-list">
              ${e._lights.map((t,i)=>e._renderLightRow(t,i))}
            </div>
          `:e._lightRoom?W`<div class="banner">
              <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
              <span>${De("config.light_no_lights")}</span>
            </div>`:B}

      ${e._lights.length>0?W`
        <div class="section-desc schedule-hint">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          ${De("config.light_schedule_hint")}
        </div>
      `:B}

      <div class="section-desc dashboard-vs-room">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        ${De("config.light_dashboard_vs_room")}
      </div>

      ${e._lightRoom?W`
        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>e._loadRoomLights()}>${De("common.reset")}</button>
        </div>
      `:B}
    </div>
  `}(this)}_renderLightRow(e,t){return function(e,t,i){const a=e._dragIdx===i&&"lights"===e._dragContext,r=e._dropIdx===i&&"lights"===e._dragContext,o=["item-row",t.visible?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" "),n=e._scheduleEdits.get(t.entityId),s=n?n.some(e=>e.start&&e.end):(e._schedulesLoaded[t.entityId]?.periods?.length??0)>0,c=e._scheduleExpandedEntity===t.entityId,d=["item-card",c?"expanded":""].filter(Boolean).join(" ");return W`
    <div class=${d}>
      <div
        class=${o}
        draggable="true"
        @dragstart=${()=>e._onDragStart(i,"lights")}
        @dragover=${t=>e._onDragOver(i,t)}
        @dragleave=${()=>e._onDragLeave()}
        @drop=${t=>e._onDropGeneric(i,t)}
        @dragend=${()=>e._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <div class="item-info">
          <span class="item-name">${t.name}</span>
          <span class="item-meta">${t.entityId}</span>
        </div>
        <div class="light-state">
          <span class="light-dot ${t.isOn?"on":""}"></span>
        </div>
        <button
          class="schedule-btn ${s?"active":""}"
          @click=${()=>e._toggleScheduleExpand(t.entityId)}
          aria-label="${De("config.light_schedule_aria",{name:t.name})}"
          aria-expanded=${c?"true":"false"}
          title="${De("config.light_schedule_title")}"
        >
          <ha-icon .icon=${"mdi:calendar-clock"}></ha-icon>
        </button>
        <button
          class="layout-btn"
          @click=${()=>e._cycleLightLayout(t.entityId)}
          aria-label="${De("config.light_change_layout_aria")}"
          title="${De("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}"
        >
          ${De("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}
        </button>
        <button
          class="toggle ${t.visible?"on":""}"
          @click=${()=>e._toggleLightVisible(t.entityId)}
          role="switch"
          aria-checked=${t.visible?"true":"false"}
          aria-label="${t.visible?De("common.hide"):De("common.show")} ${t.name}"
        ></button>
      </div>
      <div class="fold-sep ${c?"visible":""}"></div>
      <div class="schedule-fold ${c?"open":""}">
        <div class="schedule-fold-inner">
          ${e._renderScheduleContent(t.entityId)}
        </div>
      </div>
    </div>
  `}(this,e,t)}_formatDateTimeShort(e){return function(e,t){if(!t)return"";const[i,a]=t.split("T");if(!i)return t;const[r,o,n]=i.split("-");return`${n}/${o}/${r} ${a??"00:00"}`}(0,e)}_formatPeriodDisplay(e){return function(e,t){if(!t.start&&!t.end)return"";const i=e._formatDateTimeShort(t.start),a=e._formatDateTimeShort(t.end);return i&&a?`${i}  →  ${a}`:i?`${i}  → …`:`…  →  ${a}`}(this,e)}_renderScheduleContent(e){return function(e,t){const i=e._scheduleEdits.get(t)??[];return W`
    <div class="schedule-body">
      <div class="schedule-header">${De("config.light_schedule_title")}</div>
      ${i.map((i,a)=>W`
        <div class="schedule-period">
          <div class="schedule-row">
            <button
              class="datetime-display ${i.start||i.end?"":"empty"}"
              @click=${()=>e._openRangePicker(t,a)}
            >
              ${i.start||i.end?e._formatPeriodDisplay(i):De("config.light_schedule_no_date")}
            </button>
          </div>
          <div class="schedule-row schedule-row-actions">
            <button
              class="check-item ${i.recurring?"checked":""}"
              @click=${()=>e._toggleScheduleRecurring(t,a)}
            >
              <span class="check-box">
                <ha-icon .icon=${"mdi:check"}></ha-icon>
              </span>
              <span class="check-label">${De("config.light_schedule_recurring")}</span>
            </button>
            <button
              class="btn-icon xs schedule-delete"
              @click=${()=>e._removeSchedulePeriod(t,a)}
              aria-label="${De("config.light_schedule_delete_aria")}"
            >
              <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
            </button>
          </div>
        </div>
      `)}
      <button class="btn btn-sm schedule-add" @click=${()=>e._addSchedulePeriod(t)}>
        <ha-icon .icon=${"mdi:plus"}></ha-icon>
        ${De("config.light_schedule_add")}
      </button>
      <button class="btn btn-sm btn-accent schedule-save" @click=${()=>e._saveSchedule(t)}>
        ${De("common.save")}
      </button>
    </div>
  `}(this,e)}_renderCoverTab(){return function(e){if(!e.hass)return B;const t=e._rooms.find(t=>t.areaId===e._coverRoom);return W`
    <div class="tab-panel" id="panel-cover">
      <div class="section-label">${De("config.behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._coverShowHeader?"true":"false"}
          @click=${()=>{e._coverShowHeader=!e._coverShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.cover_show_header")}</div>
            <div class="feature-desc">${De("config.cover_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._coverShowHeader?"on":""}"
          ></span>
        </button>
      </div>

      <!-- Per-room cover config -->
      <div class="section-label">${De("config.cover_room")}</div>
      <div class="section-desc">${De("config.cover_room_desc")}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${e._coverRoomDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._coverRoomDropdownOpen=!e._coverRoomDropdownOpen}}
          aria-expanded=${e._coverRoomDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||De("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>W`
            <button
              class="dropdown-item ${t.areaId===e._coverRoom?"active":""}"
              role="option"
              aria-selected=${t.areaId===e._coverRoom?"true":"false"}
              @click=${()=>e._selectCoverRoom(t.areaId)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              ${t.name}
            </button>
          `)}
        </div>
      </div>

      ${e._coverRoom?W`
        ${e._coverRoomEntities.length>0?W`
          <div class="section-label">${De("config.cover_list_title")} (${e._coverRoomEntities.length})</div>
          <div class="section-desc">${De("config.cover_list_banner")}</div>
          <div class="item-list">
            ${e._coverRoomEntities.map((t,i)=>{const a=e._dragIdx===i&&"covers"===e._dragContext,r=e._dropIdx===i&&"covers"===e._dragContext,o=e._coverPresetsExpandedEntity===t.entityId,n=!!e._coverEntityPresets[t.entityId],s=["item-row",t.visible?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" "),c=["item-card",o?"expanded":""].filter(Boolean).join(" ");return W`
                <div class=${c}>
                  <div
                    class=${s}
                    draggable="true"
                    @dragstart=${()=>e._onDragStart(i,"covers")}
                    @dragover=${t=>e._onDragOver(i,t)}
                    @dragleave=${()=>e._onDragLeave()}
                    @drop=${t=>e._onDropCover(i,t)}
                    @dragend=${()=>e._onDragEnd()}
                  >
                    <span class="drag-handle">
                      <ha-icon .icon=${"mdi:drag"}></ha-icon>
                    </span>
                    <div class="item-info">
                      <span class="item-name">${t.name}</span>
                      <span class="item-meta">${t.entityId}</span>
                    </div>
                    <button
                      class="schedule-btn ${n?"active":""}"
                      @click=${()=>e._toggleCoverPresetsExpand(t.entityId)}
                      aria-label="${De("config.cover_entity_presets")}"
                      aria-expanded=${o?"true":"false"}
                      title="${De("config.cover_entity_presets")}"
                    >
                      <ha-icon .icon=${"mdi:tune-vertical"}></ha-icon>
                    </button>
                    <button
                      class="layout-btn"
                      @click=${()=>e._cycleCoverLayout(t.entityId)}
                      aria-label="${De("config.light_change_layout_aria")}"
                      title="${De("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}"
                    >
                      ${De("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}
                    </button>
                    <button
                      class="toggle ${t.visible?"on":""}"
                      @click=${()=>e._toggleCoverEntityVisibility(t.entityId)}
                      role="switch"
                      aria-checked=${t.visible?"true":"false"}
                      aria-label="${t.visible?De("common.hide"):De("common.show")} ${t.name}"
                    ></button>
                  </div>
                  <div class="fold-sep ${o?"visible":""}"></div>
                  <div class="schedule-fold ${o?"open":""}">
                    <div class="schedule-fold-inner">
                      <div style="padding:8px 12px 10px 36px;">
                        <div style="font-size:9px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${De("config.cover_entity_presets")}</div>
                        <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">
                          ${(e._coverEntityPresets[t.entityId]??e._coverPresets).map(i=>{const a=i>=50?"mdi:window-shutter-open":"mdi:window-shutter",r=!!e._coverEntityPresets[t.entityId];return W`
                              <span style="
                                display:inline-flex;align-items:center;gap:3px;
                                padding:0.1875rem 0.4375rem;border-radius:var(--radius-md);
                                border:1px solid ${r?"rgba(167,139,250,0.2)":"var(--b2)"};
                                background:${r?"rgba(167,139,250,0.05)":"var(--s1)"};
                                font-size:10px;font-weight:600;color:${r?"var(--c-accent)":"var(--t3)"};
                              ">
                                <ha-icon .icon=${a} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                ${0===i?De("cover.preset_closed"):100===i?De("cover.preset_open"):`${i}%`}
                                ${r?W`
                                  <button
                                    style="background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;color:var(--t4);transition:color var(--t-fast);"
                                    @click=${()=>e._removeCoverEntityPreset(t.entityId,i)}
                                    aria-label="${De("common.delete")} ${i}%"
                                  >
                                    <ha-icon .icon=${"mdi:close"} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                  </button>
                                `:B}
                              </span>
                            `})}
                          <span style="display:inline-flex;align-items:center;gap:3px;">
                            <input
                              class="input"
                              type="number"
                              min="0"
                              max="100"
                              step="5"
                              .value=${e._coverEntityPresetInput[t.entityId]??""}
                              @input=${i=>{e._coverEntityPresetInput={...e._coverEntityPresetInput,[t.entityId]:i.target.value}}}
                              @keydown=${i=>{"Enter"===i.key&&e._addCoverEntityPreset(t.entityId)}}
                              placeholder="%"
                              style="width:48px;font-size:10px;padding:3px 6px;"
                            />
                            <button
                              style="
                                display:inline-flex;align-items:center;
                                padding:0.1875rem 0.375rem;border-radius:var(--radius-md);
                                border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
                                font-size:10px;font-weight:600;color:var(--c-accent);
                                cursor:pointer;font-family:inherit;
                                opacity:${e._coverEntityPresetInput[t.entityId]?"1":"0.4"};
                                pointer-events:${e._coverEntityPresetInput[t.entityId]?"auto":"none"};
                                transition:opacity var(--t-fast);
                              "
                              @click=${()=>e._addCoverEntityPreset(t.entityId)}
                              aria-label="${De("config.cover_preset_add")}"
                            >
                              <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                            </button>
                            ${e._coverEntityPresets[t.entityId]?W`
                              <button
                                style="
                                  display:inline-flex;align-items:center;gap:2px;
                                  padding:0.1875rem 0.375rem;border-radius:var(--radius-md);
                                  border:1px solid var(--b2);background:var(--s1);
                                  font-size:9px;font-weight:600;color:var(--t4);
                                  cursor:pointer;font-family:inherit;
                                  transition:all var(--t-fast);
                                "
                                @click=${()=>e._resetCoverEntityPresets(t.entityId)}
                                aria-label="${De("common.reset")}"
                              >
                                <ha-icon .icon=${"mdi:restore"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                              </button>
                            `:B}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `})}
          </div>
        `:W`
          <div class="banner">
            <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
            <span>${De("config.cover_no_covers")}</span>
          </div>
        `}
      `:B}

      <!-- Preset config -->
      <div class="section-label">${De("config.cover_presets")}</div>
      <div class="section-desc">${De("config.cover_presets_desc")}</div>

      <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
        ${e._coverPresets.map(t=>W`
            <span style="
              display:inline-flex;align-items:center;gap:4px;
              padding:0.3125rem 0.625rem;border-radius:var(--radius-md);
              border:1px solid var(--b2);background:var(--s1);
              font-size:11px;font-weight:600;color:var(--t2);
            ">
              <ha-icon .icon=${t>=50?"mdi:window-shutter-open":"mdi:window-shutter"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${0===t?De("cover.preset_closed"):100===t?De("cover.preset_open"):`${t}%`}
              <button
                style="
                  background:none;border:none;cursor:pointer;padding:0;
                  display:flex;align-items:center;justify-content:center;
                  color:var(--t4);transition:color var(--t-fast);
                "
                @click=${()=>e._removeCoverPreset(t)}
                aria-label="${De("common.delete")} ${t}%"
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
            .value=${e._coverPresetInput}
            @input=${t=>{e._coverPresetInput=t.target.value}}
            @keydown=${t=>{"Enter"===t.key&&e._addCoverPreset()}}
            placeholder=${De("config.cover_preset_placeholder")}
            style="width:64px;font-size:11px;padding:5px 8px;"
          />
          <button
            style="
              display:inline-flex;align-items:center;gap:4px;
              padding:0.3125rem 0.625rem;border-radius:var(--radius-md);
              border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
              font-size:11px;font-weight:600;color:var(--c-accent);
              cursor:pointer;font-family:inherit;
              opacity:${e._coverPresetInput?"1":"0.4"};
              pointer-events:${e._coverPresetInput?"auto":"none"};
              transition:opacity var(--t-fast);
            "
            @click=${()=>e._addCoverPreset()}
          >
            <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${De("config.cover_preset_add")}
          </button>
        </span>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._resetCover()}>${De("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderFanTab(){return function(e){if(!e.hass)return B;const t=e._rooms.find(t=>t.areaId===e._fanRoom);return W`
    <div class="tab-panel" id="panel-fan">
      <div class="section-label">${De("config.behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._fanShowHeader?"true":"false"}
          @click=${()=>{e._fanShowHeader=!e._fanShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.fan_show_header")}</div>
            <div class="feature-desc">${De("config.fan_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._fanShowHeader?"on":""}"
          ></span>
        </button>
      </div>

      <!-- Per-room fan config -->
      <div class="section-label">${De("config.fan_room")}</div>
      <div class="section-desc">${De("config.fan_room_desc")}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${e._fanRoomDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._fanRoomDropdownOpen=!e._fanRoomDropdownOpen}}
          aria-expanded=${e._fanRoomDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||De("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>W`
            <button
              class="dropdown-item ${t.areaId===e._fanRoom?"active":""}"
              role="option"
              aria-selected=${t.areaId===e._fanRoom?"true":"false"}
              @click=${()=>e._selectFanRoom(t.areaId)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              ${t.name}
            </button>
          `)}
        </div>
      </div>

      ${e._fanRoom?W`
        ${e._fanRoomEntities.length>0?W`
          <div class="section-label">${De("config.fan_list_title")} (${e._fanRoomEntities.length})</div>
          <div class="section-desc">${De("config.fan_list_banner")}</div>
          <div class="item-list">
            ${e._fanRoomEntities.map((t,i)=>{const a=e._dragIdx===i&&"fans"===e._dragContext,r=e._dropIdx===i&&"fans"===e._dragContext,o=["item-row",t.visible?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return W`
                <div
                  class=${o}
                  draggable="true"
                  @dragstart=${()=>e._onDragStart(i,"fans")}
                  @dragover=${t=>e._onDragOver(i,t)}
                  @dragleave=${()=>e._onDragLeave()}
                  @drop=${t=>e._onDropFan(i,t)}
                  @dragend=${()=>e._onDragEnd()}
                >
                  <span class="drag-handle">
                    <ha-icon .icon=${"mdi:drag"}></ha-icon>
                  </span>
                  <div class="item-info">
                    <span class="item-name">${t.name}</span>
                    <span class="item-meta">${t.entityId}</span>
                  </div>
                  <button
                    class="layout-btn"
                    @click=${()=>e._cycleFanLayout(t.entityId)}
                    aria-label="${De("config.light_change_layout_aria")}"
                    title="${De("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}"
                  >
                    ${De("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}
                  </button>
                  <button
                    class="toggle ${t.visible?"on":""}"
                    @click=${()=>e._toggleFanEntityVisibility(t.entityId)}
                    role="switch"
                    aria-checked=${t.visible?"true":"false"}
                    aria-label="${t.visible?De("common.hide"):De("common.show")} ${t.name}"
                  ></button>
                </div>
              `})}
          </div>
        `:W`
          <div class="banner">
            <ha-icon .icon=${"mdi:fan-off"}></ha-icon>
            <span>${De("config.fan_no_fans")}</span>
          </div>
        `}
      `:B}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadFanConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderClimateTab(){return pt(this)}_renderMediaTab(){return function(e){if(!e.hass)return B;const t=e._rooms.find(t=>t.areaId===e._mediaRoom),i=e._mediaRoom,a=i?e._mediaExtraEntities[i]??[]:[],r=Object.keys(e.hass.states).filter(e=>e.startsWith("media_player.")).sort(),o=new Set([...e._mediaRoomNativePlayers,...a]),n=e._mediaEntitySearch?.toLowerCase()??"",s=r.filter(t=>{if(o.has(t))return!1;if(!n)return!0;const i=(e.hass?.states[t]?.attributes?.friendly_name??"").toLowerCase();return t.toLowerCase().includes(n)||i.includes(n)});return W`
    <div class="tab-panel" id="panel-media">
      <!-- Show header toggle -->
      <div class="section-label">${De("config.behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._mediaShowHeader?"true":"false"}
          @click=${()=>{e._mediaShowHeader=!e._mediaShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.media_show_header")}</div>
            <div class="feature-desc">${De("config.media_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._mediaShowHeader?"on":""}"
          ></span>
        </button>
      </div>

      <!-- Per-room extra entities -->
      <div class="section-label">${De("config.media_room")}</div>
      <div class="section-desc">${De("config.media_room_desc")}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${e._mediaRoomDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._mediaRoomDropdownOpen=!e._mediaRoomDropdownOpen}}
          aria-expanded=${e._mediaRoomDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||De("config.media_select_room")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>W`
            <button
              class="dropdown-item ${t.areaId===e._mediaRoom?"active":""}"
              role="option"
              aria-selected=${t.areaId===e._mediaRoom?"true":"false"}
              @click=${()=>e._selectMediaRoom(t.areaId)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              ${t.name}
            </button>
          `)}
        </div>
      </div>

      ${i?W`
        <!-- Native players (read-only) -->
        <div class="section-label">${De("config.media_native_players")} (${e._mediaRoomNativePlayers.length})</div>
        <div class="section-desc">${De("config.media_native_players_desc")}</div>
        ${e._mediaRoomNativePlayers.length>0?W`
          <div class="item-list">
            ${e._mediaRoomNativePlayers.map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t,r="playing"===i?.state;return W`
                <div class="item-row">
                  <div class="item-info" style="padding-left:8px;">
                    <span class="item-name">${a}</span>
                    <span class="item-meta">${t}</span>
                  </div>
                  <div class="dot" style="background:${r?"#60a5fa":"var(--t4)"};${r?"box-shadow:0 0 6px rgba(96,165,250,0.4);":""}"></div>
                </div>
              `})}
          </div>
        `:W`
          <div class="banner">
            <ha-icon .icon=${"mdi:speaker-off"}></ha-icon>
            <span>${De("media.no_players")}</span>
          </div>
        `}

        <!-- Extra entities -->
        <div class="section-label">${De("config.media_extra_entities")} (${a.length})</div>
        <div class="section-desc">${De("config.media_extra_entities_desc")}</div>
        ${a.length>0?W`
          <div class="item-list">
            ${a.map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t;return W`
                <div class="item-row">
                  <div class="item-info" style="padding-left:8px;">
                    <span class="item-name">${a}</span>
                    <span class="item-meta">${t}</span>
                  </div>
                  <button
                    class="btn-icon xs"
                    @click=${()=>e._removeMediaExtraEntity(t)}
                    aria-label="${De("common.hide")} ${a}"
                  >
                    <ha-icon .icon=${"mdi:close"}></ha-icon>
                  </button>
                </div>
              `})}
          </div>
        `:W`
          <div class="banner">
            <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
            <span>${De("config.media_no_extra")}</span>
          </div>
        `}

        <!-- Add extra entity dropdown -->
        <div class="dropdown ${e._mediaAddDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{e._mediaAddDropdownOpen=!e._mediaAddDropdownOpen,e._mediaEntitySearch=""}}
            aria-expanded=${e._mediaAddDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:plus"}></ha-icon>
            <span>${De("config.media_add_extra")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <input
              type="text"
              class="dropdown-search"
              placeholder="${De("config.search_entity")}"
              .value=${e._mediaEntitySearch??""}
              @input=${t=>{e._mediaEntitySearch=t.target.value}}
              @click=${e=>e.stopPropagation()}
            />
            ${s.slice(0,20).map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t;return W`
                <button
                  class="dropdown-item"
                  role="option"
                  @click=${()=>{e._addMediaExtraEntity(t),e._mediaAddDropdownOpen=!1}}
                >
                  <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                  ${a}
                </button>
              `})}
            ${0===s.length?W`
              <div style="padding:8px 12px;font-size:12px;color:var(--t4);text-align:center;">—</div>
            `:B}
          </div>
        </div>
      `:B}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadMediaConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderDashboardTab(){return function(e){const t={title:{icon:"mdi:format-title",nameKey:"config.dashboard_card_title",descKey:"config.dashboard_card_title_desc",hasSub:!1},weather:{icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",descKey:"config.dashboard_card_weather_desc",hasSub:!0},climate:{icon:"mdi:thermostat",nameKey:"config.dashboard_card_climate",descKey:"config.dashboard_card_climate_desc",hasSub:!0},light:{icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",descKey:"config.dashboard_card_light_desc",hasSub:!0},cover:{icon:"mdi:blinds",nameKey:"config.dashboard_card_cover",descKey:"config.dashboard_card_cover_desc",hasSub:!0},spotify:{icon:"mdi:spotify",nameKey:"config.dashboard_card_spotify",descKey:"config.dashboard_card_spotify_desc",hasSub:!0},media:{icon:"mdi:speaker",nameKey:"config.dashboard_card_media",descKey:"config.dashboard_card_media_desc",hasSub:!0},fan:{icon:"mdi:fan",nameKey:"config.dashboard_card_fan",descKey:"config.dashboard_card_fan_desc",hasSub:!0},presence:{icon:"mdi:account-group",nameKey:"config.dashboard_card_presence",descKey:"config.dashboard_card_presence_desc",hasSub:!0},camera_carousel:{icon:"mdi:cctv",nameKey:"config.dashboard_card_camera_carousel",descKey:"config.dashboard_card_camera_carousel_desc",hasSub:!1}},i=new Set(e._dashboardEnabledCards);return W`
    <div class="tab-panel" id="panel-dashboard">
      <div class="section-label">${De("config.dashboard_display")}</div>
      <div class="section-desc">${De("config.dashboard_display_desc")}</div>

      <div class="check-item mt-12">
        <button
          class="toggle ${e._dashboardHideHeader?"on":""}"
          @click=${()=>{e._saving||(e._beginSuppressAutoSave(),e._dashboardHideHeader=!e._dashboardHideHeader,e._saveDashboard())}}
          role="switch"
          aria-checked=${e._dashboardHideHeader?"true":"false"}
          aria-label=${De("config.dashboard_hide_header")}
        ></button>
        <div class="check-label">
          <span>${De("config.dashboard_hide_header")}</span>
          <span class="check-desc">${De("config.dashboard_hide_header_desc")}</span>
        </div>
      </div>
      <div class="check-item mb-8">
        <button
          class="toggle ${e._dashboardHideSidebar?"on":""}"
          @click=${()=>{e._saving||(e._beginSuppressAutoSave(),e._dashboardHideSidebar=!e._dashboardHideSidebar,e._saveDashboard())}}
          role="switch"
          aria-checked=${e._dashboardHideSidebar?"true":"false"}
          aria-label=${De("config.dashboard_hide_sidebar")}
        ></button>
        <div class="check-label">
          <span>${De("config.dashboard_hide_sidebar")}</span>
          <span class="check-desc">${De("config.dashboard_hide_sidebar_desc")}</span>
        </div>
      </div>

      <div class="fold-sep" style="margin:16px 0;"></div>

      <div class="section-label">${De("config.dashboard_title")}</div>
      <div class="section-desc">${De("config.dashboard_desc")}</div>
      <div class="item-list">
        ${e._dashboardCardOrder.map((a,r)=>{const o=t[a];if(!o)return B;const n=i.has(a),s=e._dragIdx===r&&"dashboard_cards"===e._dragContext,c=e._dropIdx===r&&"dashboard_cards"===e._dragContext,d=e._dashboardExpanded.has(a),l=["item-row",n?"":"disabled",s?"dragging":"",c?"drop-target":""].filter(Boolean).join(" "),p=["item-card",d?"expanded":""].filter(Boolean).join(" ");return W`
            <div
              class=${o.hasSub?p:""}
              draggable="true"
              @dragstart=${()=>e._onDragStart(r,"dashboard_cards")}
              @dragover=${t=>e._onDragOver(r,t)}
              @dragleave=${()=>e._onDragLeave()}
              @drop=${t=>e._onDropDashboardCard(r,t)}
              @dragend=${()=>e._onDragEnd()}
            >
              <div class=${l}>
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
                <div class="feature-icon">
                  <ha-icon .icon=${o.icon}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${De(o.nameKey)}</span>
                  <span class="item-meta">${De(o.descKey)}</span>
                </div>
                ${o.hasSub&&n?W`
                  <button
                    class="btn-icon xs"
                    aria-label=${De(d?"common.hide":"common.show")}
                    aria-expanded=${d?"true":"false"}
                    @click=${t=>{t.stopPropagation(),e._toggleDashboardExpand(a)}}
                  >
                    <ha-icon .icon=${d?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                  </button>
                `:B}
                <button
                  class="toggle ${n?"on":""}"
                  @click=${t=>{t.stopPropagation(),e._toggleDashboardCard(a)}}
                  role="switch"
                  aria-checked=${n?"true":"false"}
                  aria-label="${De(n?"common.hide":"common.show")} ${De(o.nameKey)}"
                ></button>
              </div>
              ${o.hasSub?W`
                <div class="fold-sep ${d&&n?"visible":""}"></div>
              `:B}
              ${e._renderDashboardCardSub(a,n,d)}
            </div>
          `})}
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadDashboardConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderDashboardCardSub(e,t,i){return function(e,t,i,a){const r=i&&a;return"light"===t?W`
      <div class="feature-sub ${r?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._lightShowHeader=!e._lightShowHeader}}
              role="switch"
              aria-checked=${e._lightShowHeader?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.light_show_header")}</div>
                <div class="feature-desc">${De("config.light_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._lightShowHeader?"on":""}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"weather"===t?W`
      <div class="feature-sub ${r?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._weatherShowHeader=!e._weatherShowHeader}}
              role="switch"
              aria-checked=${e._weatherShowHeader?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.weather_show_header")}</div>
                <div class="feature-desc">${De("config.weather_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._weatherShowHeader?"on":""}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"cover"===t?W`
      <div class="feature-sub ${r?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._coverShowHeader=!e._coverShowHeader}}
              role="switch"
              aria-checked=${e._coverShowHeader?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.cover_show_header")}</div>
                <div class="feature-desc">${De("config.cover_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._coverShowHeader?"on":""}"
              ></span>
            </button>
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._coverDashboardCompact=!e._coverDashboardCompact}}
              role="switch"
              aria-checked=${e._coverDashboardCompact?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:view-grid-outline"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.cover_dashboard_compact")}</div>
                <div class="feature-desc">${De("config.cover_dashboard_compact_desc")}</div>
              </div>
              <span
                class="toggle ${e._coverDashboardCompact?"on":""}"
              ></span>
            </button>
            <div class="section-label" style="margin-top:10px;">${De("config.cover_dashboard_entities")}</div>
            <div class="section-desc">${De("config.cover_dashboard_entities_desc")}</div>
            <div class="item-list">
              ${e._coverDashboardOrder.map((t,i)=>{const a=e._getAllCoverEntities().find(e=>e.entityId===t);if(!a)return B;const r=e._coverDashboardEntities.includes(a.entityId),o=["item-row",r?"":"disabled",e._dragIdx===i&&"dashboard_covers"===e._dragContext?"dragging":"",e._dropIdx===i&&"dashboard_covers"===e._dragContext?"drop-target":""].filter(Boolean).join(" ");return W`
                  <div
                    class=${o}
                    draggable="true"
                    @dragstart=${t=>{t.stopPropagation(),e._onDragStart(i,"dashboard_covers")}}
                    @dragover=${t=>{t.stopPropagation(),e._onDragOver(i,t)}}
                    @dragleave=${()=>e._onDragLeave()}
                    @drop=${t=>{t.stopPropagation(),e._onDropDashboardCover(i,t)}}
                    @dragend=${()=>e._onDragEnd()}
                  >
                    <span class="drag-handle">
                      <ha-icon .icon=${"mdi:drag"}></ha-icon>
                    </span>
                    <div class="item-info">
                      <span class="item-name">${a.name}</span>
                      <span class="item-meta">${a.entityId}</span>
                    </div>
                    <button
                      class="toggle ${r?"on":""}"
                      @click=${t=>{t.stopPropagation(),e._toggleCoverDashboardEntity(a.entityId)}}
                      role="switch"
                      aria-checked=${r?"true":"false"}
                      aria-label="${De(r?"common.hide":"common.show")} ${a.name}"
                    ></button>
                  </div>
                `})}
            </div>
          </div>
        </div>
      </div>
    `:"climate"===t?W`
      <div class="feature-sub ${r?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._climateShowHeader=!e._climateShowHeader}}
              role="switch"
              aria-checked=${e._climateShowHeader?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.climate_show_header")}</div>
                <div class="feature-desc">${De("config.climate_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._climateShowHeader?"on":""}"
              ></span>
            </button>
            <div class="section-label" style="margin-top:10px;">${De("config.climate_display_mode")}</div>
            <div style="display:flex;gap:6px;margin-top:6px;padding:0 4px;">
              <button class="chip ${"list"===e._climateDashboardDisplayMode?"active":""}"
                @click=${t=>{t.stopPropagation(),e._climateDashboardDisplayMode="list"}}>
                <ha-icon .icon=${"mdi:format-list-bulleted"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${De("config.climate_mode_list")}
              </button>
              <button class="chip ${"normal"===e._climateDashboardDisplayMode?"active":""}"
                @click=${t=>{t.stopPropagation(),e._climateDashboardDisplayMode="normal"}}>
                <ha-icon .icon=${"mdi:gauge"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${De("config.climate_mode_normal")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `:"spotify"===t?W`
      <div class="feature-sub ${r?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._spotifyShowHeader=!e._spotifyShowHeader}}
              role="switch"
              aria-checked=${e._spotifyShowHeader?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.spotify_show_header")}</div>
                <div class="feature-desc">${De("config.spotify_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._spotifyShowHeader?"on":""}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"media"===t?W`
      <div class="feature-sub ${r?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._mediaShowHeader=!e._mediaShowHeader}}
              role="switch"
              aria-checked=${e._mediaShowHeader?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.media_show_header")}</div>
                <div class="feature-desc">${De("config.media_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._mediaShowHeader?"on":""}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"fan"===t?W`
      <div class="feature-sub ${r?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._fanShowHeader=!e._fanShowHeader}}
              role="switch"
              aria-checked=${e._fanShowHeader?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.fan_show_header")}</div>
                <div class="feature-desc">${De("config.fan_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._fanShowHeader?"on":""}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"presence"===t?W`
      <div class="feature-sub ${r?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._presenceShowHeader=!e._presenceShowHeader}}
              role="switch"
              aria-checked=${e._presenceShowHeader?"true":"false"}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.presence_show_header")}</div>
                <div class="feature-desc">${De("config.presence_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._presenceShowHeader?"on":""}"
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:B}(this,e,t,i)}_renderPresenceTab(){return function(e){const t=e._getAvailablePersonEntities(),i=e._presencePersonEntities.length>0?e._presencePersonEntities:t.map(e=>e.entityId),a=e._getAvailableSmartphoneSensors(),r=e._getAvailableDrivingSensors(),o=e._getAvailableNotifyServices();return W`
    <div class="tab-panel" id="panel-presence">
      <!-- Behaviour -->
      <div class="section-label">${De("config.behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._presenceShowHeader?"true":"false"}
          @click=${()=>{e._presenceShowHeader=!e._presenceShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.presence_show_header")}</div>
            <div class="feature-desc">${De("config.presence_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._presenceShowHeader?"on":""}"
          ><span class="toggle-thumb"></span></span>
        </button>
      </div>

      <!-- Person entities -->
      <div class="section-label">${De("config.presence_persons")}</div>
      <div class="section-desc">${De("config.presence_persons_desc")}</div>

      ${0===t.length?W`
        <div class="preview-empty">${De("config.presence_no_persons")}</div>
      `:W`
        <div class="item-list">
          ${t.map(t=>{const i=e._presencePersonEntities.includes(t.entityId),a=0===e._presencePersonEntities.length;return W`
              <div class="item-row ${i||a?"":"disabled"}">
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:account"}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${t.name}</span>
                  <span class="item-meta">${t.entityId}</span>
                </div>
                <button
                  class="toggle ${i||a?"on":""}"
                  @click=${()=>e._togglePresencePerson(t.entityId)}
                  role="switch"
                  aria-checked=${i||a?"true":"false"}
                  aria-label="${t.name}"
                ><span class="toggle-thumb"></span></button>
              </div>
            `})}
        </div>
      `}

      <!-- Per-person sensor mapping -->
      <div class="section-label">${De("config.presence_smartphone")}</div>
      <div class="section-desc">${De("config.presence_smartphone_desc")}</div>

      ${i.map(i=>{const n=t.find(e=>e.entityId===i);if(!n)return B;const s=e._presenceSmartphoneSensors[i]||"",c=e._presenceNotifyServices[i]||"",d=e._presenceDrivingSensors[i]||"",l=a.find(e=>e.entityId===s)?.name,p=r.find(e=>e.entityId===d)?.name,h=`${i}:smartphone`,_=`${i}:notify`,m=`${i}:driving`;return W`
          <div class="presence-mapping-card">
            <div class="presence-mapping-header">
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:account"}></ha-icon>
              </div>
              <span class="item-name">${n.name}</span>
            </div>

            <div class="presence-mapping-field">
              <label class="section-label">${De("config.presence_smartphone")}</label>
              <div class="dropdown ${e._presenceDropdownOpen===h?"open":""}">
                <button
                  class="dropdown-trigger"
                  @click=${()=>{e._presenceDropdownSearch="",e._presenceDropdownOpen=e._presenceDropdownOpen===h?null:h}}
                  aria-expanded=${e._presenceDropdownOpen===h?"true":"false"}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${"mdi:cellphone"}></ha-icon>
                  <span>${l||s||De("config.presence_auto_detect")}</span>
                  <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${De("config.search_entity")}
                    .value=${e._presenceDropdownOpen===h?e._presenceDropdownSearch:""}
                    @input=${t=>{e._presenceDropdownSearch=t.target.value}}
                    @click=${e=>e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${s?"":"active"}"
                    role="option"
                    aria-selected=${s?"false":"true"}
                    @click=${()=>{const t={...e._presenceSmartphoneSensors};delete t[i],e._presenceSmartphoneSensors=t,e._presenceDropdownOpen=null}}
                  >
                    <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                    ${De("config.presence_auto_detect")}
                  </button>
                  ${a.filter(t=>!e._presenceDropdownSearch||t.name.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())||t.entityId.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())).map(t=>W`
                    <button
                      class="dropdown-item ${s===t.entityId?"active":""}"
                      role="option"
                      aria-selected=${s===t.entityId?"true":"false"}
                      @click=${()=>{e._presenceSmartphoneSensors={...e._presenceSmartphoneSensors,[i]:t.entityId},e._presenceDropdownOpen=null}}
                    >
                      <ha-icon .icon=${"mdi:cellphone"}></ha-icon>
                      ${t.name}
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <div class="presence-mapping-field">
              <label class="section-label">${De("config.presence_notify")}</label>
              <div class="dropdown ${e._presenceDropdownOpen===_?"open":""}">
                <button
                  class="dropdown-trigger"
                  @click=${()=>{e._presenceDropdownSearch="",e._presenceDropdownOpen=e._presenceDropdownOpen===_?null:_}}
                  aria-expanded=${e._presenceDropdownOpen===_?"true":"false"}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${"mdi:bell"}></ha-icon>
                  <span>${c||De("config.presence_auto_detect")}</span>
                  <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${De("config.search_entity")}
                    .value=${e._presenceDropdownOpen===_?e._presenceDropdownSearch:""}
                    @input=${t=>{e._presenceDropdownSearch=t.target.value}}
                    @click=${e=>e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${c?"":"active"}"
                    role="option"
                    aria-selected=${c?"false":"true"}
                    @click=${()=>{const t={...e._presenceNotifyServices};delete t[i],e._presenceNotifyServices=t,e._presenceDropdownOpen=null}}
                  >
                    <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                    ${De("config.presence_auto_detect")}
                  </button>
                  ${o.filter(t=>!e._presenceDropdownSearch||t.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())).map(t=>W`
                    <button
                      class="dropdown-item ${c===t?"active":""}"
                      role="option"
                      aria-selected=${c===t?"true":"false"}
                      @click=${()=>{e._presenceNotifyServices={...e._presenceNotifyServices,[i]:t},e._presenceDropdownOpen=null}}
                    >
                      <ha-icon .icon=${"mdi:bell"}></ha-icon>
                      ${t}
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <div class="presence-mapping-field">
              <label class="section-label">${De("config.presence_driving")}</label>
              <div class="dropdown ${e._presenceDropdownOpen===m?"open":""}">
                <button
                  class="dropdown-trigger"
                  @click=${()=>{e._presenceDropdownSearch="",e._presenceDropdownOpen=e._presenceDropdownOpen===m?null:m}}
                  aria-expanded=${e._presenceDropdownOpen===m?"true":"false"}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${"mdi:car"}></ha-icon>
                  <span>${p||d||De("config.presence_auto_detect")}</span>
                  <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${De("config.search_entity")}
                    .value=${e._presenceDropdownOpen===m?e._presenceDropdownSearch:""}
                    @input=${t=>{e._presenceDropdownSearch=t.target.value}}
                    @click=${e=>e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${d?"":"active"}"
                    role="option"
                    aria-selected=${d?"false":"true"}
                    @click=${()=>{const t={...e._presenceDrivingSensors};delete t[i],e._presenceDrivingSensors=t,e._presenceDropdownOpen=null}}
                  >
                    <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                    ${De("config.presence_auto_detect")}
                  </button>
                  ${r.filter(t=>!e._presenceDropdownSearch||t.name.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())||t.entityId.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())).map(t=>W`
                    <button
                      class="dropdown-item ${d===t.entityId?"active":""}"
                      role="option"
                      aria-selected=${d===t.entityId?"true":"false"}
                      @click=${()=>{e._presenceDrivingSensors={...e._presenceDrivingSensors,[i]:t.entityId},e._presenceDropdownOpen=null}}
                    >
                      <ha-icon .icon=${"mdi:car"}></ha-icon>
                      ${t.name}
                    </button>
                  `)}
                </div>
              </div>
            </div>
          </div>
        `})}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadPresenceConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderCameraCarouselTab(){return(e=this).hass&&0===e._cameraEntityOrder.length&&dt(e),W`
    <div class="tab-panel" id="panel-camera_carousel">
      <!-- Show header toggle -->
      <button class="feature-row" role="switch" aria-checked="${e._cameraShowHeader?"true":"false"}"
        @click=${()=>{e._cameraShowHeader=!e._cameraShowHeader}}>
        <ha-icon class="feature-icon" .icon=${"mdi:page-layout-header"}></ha-icon>
        <div class="feature-text">
          <div class="feature-label">${De("config.camera_show_header")}</div>
          <div class="feature-desc">${De("config.camera_show_header_desc")}</div>
        </div>
        <span class="toggle ${e._cameraShowHeader?"on":""}"><span class="toggle-thumb"></span></span>
      </button>

      <!-- Auto cycle toggle -->
      <button class="feature-row" role="switch" aria-checked="${e._cameraAutoCycle?"true":"false"}"
        @click=${()=>{e._cameraAutoCycle=!e._cameraAutoCycle}}>
        <ha-icon class="feature-icon" .icon=${"mdi:autorenew"}></ha-icon>
        <div class="feature-text">
          <div class="feature-label">${De("config.camera_auto_cycle")}</div>
          <div class="feature-desc">${De("config.camera_auto_cycle_desc")}</div>
        </div>
        <span class="toggle ${e._cameraAutoCycle?"on":""}"><span class="toggle-thumb"></span></span>
      </button>

      ${e._cameraAutoCycle?W`
        <!-- Cycle interval -->
        <div class="feature-row" style="pointer-events:none;">
          <ha-icon class="feature-icon" .icon=${"mdi:timer-outline"}></ha-icon>
          <div class="feature-text">
            <div class="feature-label">${De("config.camera_cycle_interval")}</div>
            <div class="feature-desc">${De("config.camera_cycle_interval_desc")}</div>
          </div>
          <input class="input" type="number" min="3" max="60" style="width:60px;pointer-events:auto;text-align:center;"
            .value=${String(e._cameraCycleInterval)}
            @change=${t=>{const i=parseInt(t.target.value,10);!isNaN(i)&&i>=3&&i<=60&&(e._cameraCycleInterval=i)}}
          />
        </div>
      `:B}

      <!-- Camera entity order -->
      ${e._cameraEntityOrder.length>0?W`
        <div class="section-label">${De("config.camera_entity_order")} (${e._cameraEntityOrder.length})</div>
        <div class="section-desc">${De("config.camera_entity_order_desc")}</div>
        <div class="item-list">
          ${e._cameraEntityOrder.map((t,i)=>{const a=e._dragIdx===i&&"camera_order"===e._dragContext,r=e._dropIdx===i&&"camera_order"===e._dragContext,o=e.hass?.states[t],n=o?.attributes?.friendly_name||t.split(".")[1],s=["item-row",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return W`
              <div
                class=${s}
                draggable="true"
                @dragstart=${()=>e._onDragStart(i,"camera_order")}
                @dragover=${t=>e._onDragOver(i,t)}
                @dragleave=${()=>e._onDragLeave()}
                @drop=${t=>e._onDropCameraEntity(i,t)}
                @dragend=${()=>e._onDragEnd()}
              >
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
                <div class="item-info">
                  <span class="item-name">${n}</span>
                  <span class="item-meta">${t}</span>
                </div>
              </div>
            `})}
        </div>
      `:B}

      <!-- Save / Reset -->
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn btn-sm btn-accent" ?disabled=${e._saving}
          @click=${()=>e._save()}>
          ${e._saving?De("common.saving"):De("common.save")}
        </button>
        <button class="btn btn-sm btn-ghost"
          @click=${()=>e._loadCameraCarouselConfig()}>
          ${De("common.reset")}
        </button>
      </div>
    </div>
  `;var e}_renderWeatherTab(){return function(e){const t=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith("weather.")).sort():[],i=t.find(t=>t===e._weatherEntity),a=new Set(e._weatherHiddenMetrics);return W`
    <div class="tab-panel" id="panel-weather">
      <div class="section-label">${De("config.behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._weatherShowHeader?"true":"false"}
          @click=${()=>{e._weatherShowHeader=!e._weatherShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.weather_show_header")}</div>
            <div class="feature-desc">${De("config.weather_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._weatherShowHeader?"on":""}"
          ></span>
        </button>
      </div>

      <div class="section-label">${De("config.weather_entity")}</div>
      <div class="section-desc">${De("config.weather_entity_desc")}</div>
      <div class="dropdown ${e._weatherDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>e._weatherDropdownOpen=!e._weatherDropdownOpen}
          aria-expanded=${e._weatherDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
          <span>${i||De("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${t.map(t=>W`
              <button
                class="dropdown-item ${t===e._weatherEntity?"active":""}"
                role="option"
                aria-selected=${t===e._weatherEntity?"true":"false"}
                @click=${()=>e._selectWeatherEntity(t)}
              >
                <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
                ${t}
              </button>
            `)}
        </div>
      </div>

      <div class="section-label">${De("config.weather_metrics")}</div>
      <div class="section-desc">${De("config.weather_metrics_desc")}</div>
      <div class="feature-list">
        ${[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise"},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset"}].map(t=>{const i=!a.has(t.key);return W`
            <button
              class="feature-row"
              role="switch"
              aria-checked=${i?"true":"false"}
              aria-label="${De(i?"common.hide":"common.show")} ${De(t.nameKey)}"
              @click=${()=>e._toggleWeatherMetric(t.key)}
            >
              <div class="feature-icon">
                <ha-icon .icon=${t.icon}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De(t.nameKey)}</div>
              </div>
              <span
                class="toggle ${i?"on":""}"
              ></span>
            </button>
          `})}
      </div>

      <div class="section-label">${De("config.weather_forecasts")}</div>
      <div class="section-desc">${De("config.weather_forecasts_desc")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._weatherShowDaily?"true":"false"}
          aria-label="${e._weatherShowDaily?De("common.hide"):De("common.show")} ${De("config.weather_daily")}"
          @click=${()=>{e._weatherShowDaily=!e._weatherShowDaily}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:calendar-week"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.weather_daily")}</div>
          </div>
          <span
            class="toggle ${e._weatherShowDaily?"on":""}"
          ></span>
        </button>
        <button
          class="feature-row"
          role="switch"
          aria-checked=${e._weatherShowHourly?"true":"false"}
          aria-label="${e._weatherShowHourly?De("common.hide"):De("common.show")} ${De("config.weather_hourly")}"
          @click=${()=>{e._weatherShowHourly=!e._weatherShowHourly}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${De("config.weather_hourly")}</div>
          </div>
          <span
            class="toggle ${e._weatherShowHourly?"on":""}"
          ></span>
        </button>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadWeatherConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderSpotifyPreview2(){return Ze(this)}_renderSpotifySetupGuide(){return W`
    <div class="tab-panel" id="panel-spotify">
      <div style="
        padding: 1.25rem; border-radius: var(--radius-lg);
        background: var(--s2); border: 1px solid var(--b2);
        text-align: center;
      ">
        <ha-icon .icon=${"mdi:spotify"} style="
          color: #1DB954; --mdc-icon-size: 3rem;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        "></ha-icon>
        <div style="font-size: 16px; font-weight: 600; color: var(--t1); margin-bottom: 8px;">
          ${De("config.spotify_not_configured")}
        </div>
        <div style="font-size: 13px; color: var(--t3); margin-bottom: 20px; line-height: 1.5;">
          ${De("config.spotify_setup_guide")}
        </div>

        <div style="text-align: left; padding: 0 8px;">
          ${[1,2,3,4].map(e=>W`
            <div style="
              display: flex; align-items: flex-start; gap: 0.625rem;
              margin-bottom: 0.75rem; font-size: 13px; color: var(--t2);
            ">
              <span style="
                flex-shrink: 0; width: 1.375rem; height: 1.375rem;
                border-radius: 50%; background: var(--s3);
                display: flex; align-items: center; justify-content: center;
                font-size: 12px; font-weight: 600; color: var(--t1);
              ">${e}</span>
              <span style="line-height: 22px;">
                ${De(`config.spotify_setup_step${e}`)}
              </span>
            </div>
          `)}
        </div>

        <div style="
          font-size: 12px; color: var(--t3); margin-top: 1rem;
          padding: 0.625rem; border-radius: var(--radius-md);
          background: var(--s1); border: 1px solid var(--b1);
        ">
          ${De("config.spotify_setup_note")}
        </div>

        <button
          class="btn btn-accent"
          style="margin-top: 20px;"
          @click=${()=>{window.open("/config/integrations/dashboard","_blank")}}
        >
          <ha-icon .icon=${"mdi:cog"} style="--mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center;"></ha-icon>
          ${De("config.spotify_open_settings")}
        </button>
      </div>
    </div>
  `}_renderSpotifyTab(){return function(e){if(null===e._spotifyConfigured)return W`<div class="tab-panel" id="panel-spotify">
      <div class="preview-empty">${De("config.spotify_checking")}</div>
    </div>`;if(!1===e._spotifyConfigured)return e._renderSpotifySetupGuide();const t=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith("media_player.")).sort():[],i=t.find(t=>t===e._spotifyEntity);return W`
    <div class="tab-panel" id="panel-spotify">
      <button class="feature-row" role="switch" aria-checked="${e._spotifyShowHeader?"true":"false"}"
        @click=${()=>{e._spotifyShowHeader=!e._spotifyShowHeader}}>
        <div class="feature-icon">
          <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
        </div>
        <div class="feature-text">
          <div class="feature-name">${De("config.spotify_show_header")}</div>
            <div class="feature-desc">${De("config.spotify_show_header_desc")}</div>
        </div>
        <span class="toggle ${e._spotifyShowHeader?"on":""}"><span class="toggle-thumb"></span></span>
      </button>

      <div class="section-label">${De("config.spotify_entity")}</div>
      <div class="section-desc">${De("config.spotify_entity_desc")}</div>
      <div class="dropdown ${e._spotifyDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>e._spotifyDropdownOpen=!e._spotifyDropdownOpen}
          aria-expanded=${e._spotifyDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${"mdi:spotify"} style="color: #1DB954;"></ha-icon>
          <span>${i||De("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${t.map(t=>W`
              <button
                class="dropdown-item ${t===e._spotifyEntity?"active":""}"
                role="option"
                aria-selected=${t===e._spotifyEntity?"true":"false"}
                @click=${()=>e._selectSpotifyEntity(t)}
              >
                <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                ${t}
              </button>
            `)}
        </div>
      </div>

      <div class="section-label">${De("config.spotify_sort_order")}</div>
      <div class="section-desc">${De("config.spotify_sort_order_desc")}</div>
      <div class="segmented">
        <button class="seg-btn ${"recent_first"===e._spotifySortOrder?"active":""}"
          @click=${()=>{e._spotifySortOrder="recent_first"}}>
          ${De("config.spotify_sort_recent")}
        </button>
        <button class="seg-btn ${"oldest_first"===e._spotifySortOrder?"active":""}"
          @click=${()=>{e._spotifySortOrder="oldest_first"}}>
          ${De("config.spotify_sort_oldest")}
        </button>
      </div>

      <div class="section-label">${De("config.spotify_max_items")}</div>
      <div class="section-desc">${De("config.spotify_max_items_desc")}</div>
      <div class="range-row">
        <input
          type="range"
          class="range-input"
          min="1"
          max="20"
          .value=${String(e._spotifyMaxItems)}
          @input=${t=>{e._spotifyMaxItems=parseInt(t.target.value,10)}}
        />
        <span class="range-value">${e._spotifyMaxItems}</span>
      </div>

      <div class="section-label">${De("config.spotify_speakers")}</div>
      <div class="section-desc">${De("config.spotify_speakers_desc")}</div>
      ${(()=>{const t=e.hass?Object.entries(e.hass.states).filter(([e])=>e.startsWith("media_player.")).map(([t,i])=>({entityId:t,name:i.attributes.friendly_name??t,visible:e._spotifyVisibleSpeakers.includes(t)})):[],i=[...e._spotifyVisibleSpeakers.map(e=>t.find(t=>t.entityId===e)).filter(e=>!!e),...t.filter(e=>!e.visible).sort((e,t)=>e.name.localeCompare(t.name))];return W`
          <div class="item-list">
            ${i.map(t=>{const i=t.visible,a=i?e._spotifyVisibleSpeakers.indexOf(t.entityId):-1,r=e._dragIdx===a&&-1!==a&&"speakers"===e._dragContext,o=e._dropIdx===a&&-1!==a&&"speakers"===e._dragContext,n=["item-row",i?"":"disabled",r?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return W`
                <div
                  class=${n}
                  draggable=${i?"true":"false"}
                  @dragstart=${()=>{i&&-1!==a&&e._onDragStart(a,"speakers")}}
                  @dragover=${t=>{i&&-1!==a&&e._onDragOver(a,t)}}
                  @dragleave=${()=>e._onDragLeave()}
                  @drop=${t=>{i&&-1!==a&&e._onDropSpeaker(a,t)}}
                  @dragend=${()=>e._onDragEnd()}
                >
                  ${i?W`
                    <span class="drag-handle">
                      <ha-icon .icon=${"mdi:drag"}></ha-icon>
                    </span>
                  `:W`<span style="width:24px;"></span>`}
                  <div class="item-info">
                    <span class="item-name">${t.name}</span>
                    <span class="item-meta">${t.entityId}</span>
                  </div>
                  <button
                    class="toggle ${i?"on":""}"
                    @click=${()=>e._toggleSpotifySpeaker(t.entityId)}
                    role="switch"
                    aria-checked=${i?"true":"false"}
                    aria-label="${De(i?"common.hide":"common.show")} ${t.name}"
                  ></button>
                </div>
              `})}
          </div>
        `})()}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadSpotifyConfig()}>${De("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderIconPopup(){return function(e){const t=null!==e._iconPopupModeIdx,i=null!==e._periodIconPopupIdx;if(!t&&!i)return B;const a=e._getFilteredIcons(),r=e._iconPopupModeIdx,o=e._periodIconPopupIdx,n=t&&null!==r?e._titleModes[r]?.icon??"":null!==o?e._titlePeriodOptions[o]?.icon??"":"",s=()=>{e._iconPopupModeIdx=null,e._periodIconPopupIdx=null},c=a=>{t&&null!=e._iconPopupModeIdx?e._updateTitleMode(e._iconPopupModeIdx,"icon",a):i&&null!=e._periodIconPopupIdx&&e._updateTitlePeriodOption(e._periodIconPopupIdx,"icon",a),s()};return W`
    <div class="icon-popup-overlay" @click=${e=>{e.target===e.currentTarget&&s()}}>
      <div class="icon-popup">
        <div class="icon-popup-header">
          <span class="icon-popup-title">${De("config.title_mode_icon")}</span>
          <input
            class="icon-popup-search"
            type="text"
            placeholder=${"mdi:..."}
            .value=${e._iconSearch}
            @input=${t=>{e._iconSearch=t.target.value}}
          />
        </div>
        <div class="icon-popup-grid-wrap">
          ${a.length>0||!e._iconSearch?W`
            <div class="icon-popup-grid">
              <button
                class="icon-pick ${""===n?"selected":""}"
                @click=${()=>c("")}
                aria-label=${De("config.title_no_icon")}
              >
                <ha-icon .icon=${"mdi:cancel"} style="opacity:0.4;"></ha-icon>
              </button>
              ${a.map(e=>W`
                <button
                  class="icon-pick ${e===n?"selected":""}"
                  @click=${()=>c(e)}
                  aria-label=${e}
                >
                  <ha-icon .icon=${e}></ha-icon>
                </button>
              `)}
            </div>
          `:W`<div class="icon-popup-empty">${De("config.title_no_icons_found")}</div>`}
        </div>
      </div>
    </div>
  `}(this)}_renderTitlePreview2(){return nt(this)}_renderTitleTab(){return st(this)}_renderUnassignedPreview(){return B}_renderUnassignedTab(){return gt(this)}static{this._TAB_META=[{id:"dashboard",icon:"mdi:view-dashboard",labelKey:"config.tab_dashboard"},{id:"title",icon:"mdi:format-title",labelKey:"config.tab_title"},{id:"navbar",icon:"mdi:dock-bottom",labelKey:"config.tab_navbar"},{id:"popup",icon:"mdi:card-outline",labelKey:"config.tab_popup"},{id:"light",icon:"mdi:lightbulb-group",labelKey:"config.tab_light"},{id:"weather",icon:"mdi:weather-partly-cloudy",labelKey:"config.tab_weather"},{id:"media",icon:"mdi:speaker",labelKey:"config.tab_media"},{id:"cover",icon:"mdi:blinds",labelKey:"config.tab_cover"},{id:"climate",icon:"mdi:thermostat",labelKey:"config.tab_climate"},{id:"fan",icon:"mdi:fan",labelKey:"config.tab_fan"},{id:"spotify",icon:"mdi:spotify",labelKey:"config.tab_spotify"},{id:"presence",icon:"mdi:account-group",labelKey:"config.tab_presence"},{id:"camera_carousel",icon:"mdi:cctv",labelKey:"config.tab_camera_carousel"},{id:"unassigned",icon:"mdi:home-map-marker",labelKey:"config.tab_unassigned"}]}_renderTabSelect(){const t=e._TAB_META.find(e=>e.id===this._tab),i=this._tabSearch.toLowerCase();return W`
      <div class="tab-select-wrap ${this._tabSelectOpen?"open":""}">
        <button
          class="tab-select-trigger"
          @click=${()=>{this._tabSelectOpen=!this._tabSelectOpen,this._tabSearch=""}}
          aria-haspopup="listbox"
          aria-expanded=${this._tabSelectOpen?"true":"false"}
        >
          <ha-icon .icon=${t?.icon||"mdi:cog"}></ha-icon>
          <span>${t?De(t.labelKey):""}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="tab-select-menu" role="listbox">
          <input
            type="text"
            class="tab-select-search"
            placeholder="${De("config.search_entity")}"
            .value=${this._tabSearch}
            @input=${e=>{this._tabSearch=e.target.value}}
            @click=${e=>e.stopPropagation()}
          />
          ${e._TAB_META.map(e=>{const t=De(e.labelKey),a=i&&!t.toLowerCase().includes(i)&&!e.id.includes(i);return W`
              <button
                class="tab-select-option ${e.id===this._tab?"selected":""} ${a?"hidden":""}"
                role="option"
                aria-selected=${e.id===this._tab?"true":"false"}
                @click=${()=>this._switchTab(e.id)}
              >
                <ha-icon .icon=${e.icon}></ha-icon>
                ${t}
              </button>
            `})}
        </div>
      </div>
    `}render(){return this._lang,this.hass?W`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="${De("common.back")}">
            <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
          </button>
          <span class="page-title">${De("config.title")}</span>
          <span class="page-subtitle">${De("config.brand")}</span>
        </div>

        <div class="glass config-panel">
          ${this._renderTabSelect()}

          ${"unassigned"===this._tab?B:W`<div class="preview-encart">
            <div class="preview-label">${De("config.preview")}</div>
            ${"navbar"===this._tab?this._renderNavbarPreview():"popup"===this._tab?this._renderPopupPreview():"light"===this._tab?this._renderLightPreview():"weather"===this._tab?this._renderWeatherPreview():"title"===this._tab?this._renderTitlePreview():"media"===this._tab?this._renderMediaPreview():"cover"===this._tab?this._renderCoverPreview():"climate"===this._tab?this._renderClimatePreview():"fan"===this._tab?this._renderFanPreview():"spotify"===this._tab?this._renderSpotifyPreview():"presence"===this._tab?this._renderPresencePreview():"camera_carousel"===this._tab?this._renderCameraCarouselPreview():this._renderDashboardPreview()}
          </div>`}

          ${"navbar"===this._tab?this._renderNavbarTab():"popup"===this._tab?this._renderPopupTab():"light"===this._tab?this._renderLightTab():"weather"===this._tab?this._renderWeatherTab():"title"===this._tab?this._renderTitleTab():"media"===this._tab?this._renderMediaTab():"cover"===this._tab?this._renderCoverTab():"climate"===this._tab?this._renderClimateTab():"fan"===this._tab?this._renderFanTab():"spotify"===this._tab?this._renderSpotifyTab():"presence"===this._tab?this._renderPresenceTab():"camera_carousel"===this._tab?this._renderCameraCarouselTab():"unassigned"===this._tab?this._renderUnassignedTab():this._renderDashboardTab()}
        </div>
      </div>

      ${this._pickerOpen?this._renderDateTimePicker():B}
      ${this._renderIconPopup()}

      <div class="toast ${this._toast?"show":""} ${this._toastError?"error":""}">
        ${this._toastError?De("common.error_save"):De("common.config_saved")}
      </div>
    `:B}};Dt([he({attribute:!1})],Ct.prototype,"hass"),Dt([he({type:Boolean})],Ct.prototype,"narrow"),Dt([_e()],Ct.prototype,"_lang"),Dt([_e()],Ct.prototype,"_tab"),Dt([_e()],Ct.prototype,"_tabSelectOpen"),Dt([_e()],Ct.prototype,"_tabSearch"),Dt([_e()],Ct.prototype,"_rooms"),Dt([_e()],Ct.prototype,"_emptyRooms"),Dt([_e()],Ct.prototype,"_selectedRoom"),Dt([_e()],Ct.prototype,"_cards"),Dt([_e()],Ct.prototype,"_scenes"),Dt([_e()],Ct.prototype,"_lights"),Dt([_e()],Ct.prototype,"_lightRoom"),Dt([_e()],Ct.prototype,"_lightDropdownOpen"),Dt([_e()],Ct.prototype,"_iconPickerRoom"),Dt([_e()],Ct.prototype,"_dropdownOpen"),Dt([_e()],Ct.prototype,"_toast"),Dt([_e()],Ct.prototype,"_saving"),Dt([_e()],Ct.prototype,"_showLights"),Dt([_e()],Ct.prototype,"_showTemperature"),Dt([_e()],Ct.prototype,"_showHumidity"),Dt([_e()],Ct.prototype,"_showMedia"),Dt([_e()],Ct.prototype,"_autoSort"),Dt([_e()],Ct.prototype,"_tempHigh"),Dt([_e()],Ct.prototype,"_tempLow"),Dt([_e()],Ct.prototype,"_humidityThreshold"),Dt([_e()],Ct.prototype,"_weatherEntity"),Dt([_e()],Ct.prototype,"_weatherHiddenMetrics"),Dt([_e()],Ct.prototype,"_weatherShowDaily"),Dt([_e()],Ct.prototype,"_weatherShowHourly"),Dt([_e()],Ct.prototype,"_weatherShowHeader"),Dt([_e()],Ct.prototype,"_weatherDropdownOpen"),Dt([_e()],Ct.prototype,"_titleText"),Dt([_e()],Ct.prototype,"_titleSources"),Dt([_e()],Ct.prototype,"_titlePeriodEntity"),Dt([_e()],Ct.prototype,"_titlePeriodOptions"),Dt([_e()],Ct.prototype,"_titleEditingSourceIdx"),Dt([_e()],Ct.prototype,"_titleAddSourceDropdownOpen"),Dt([_e()],Ct.prototype,"_titleAddEntityDropdownOpen"),Dt([_e()],Ct.prototype,"_titlePeriodDropdownOpen"),Dt([_e()],Ct.prototype,"_periodIconPopupIdx"),Dt([_e()],Ct.prototype,"_iconPopupModeIdx"),Dt([_e()],Ct.prototype,"_iconSearch"),Dt([_e()],Ct.prototype,"_lightShowHeader"),Dt([_e()],Ct.prototype,"_coverShowHeader"),Dt([_e()],Ct.prototype,"_coverDashboardCompact"),Dt([_e()],Ct.prototype,"_coverDashboardEntities"),Dt([_e()],Ct.prototype,"_coverDashboardOrder"),Dt([_e()],Ct.prototype,"_coverPresets"),Dt([_e()],Ct.prototype,"_coverEntityPresets"),Dt([_e()],Ct.prototype,"_coverRoom"),Dt([_e()],Ct.prototype,"_coverRoomDropdownOpen"),Dt([_e()],Ct.prototype,"_coverRoomEntities"),Dt([_e()],Ct.prototype,"_coverPresetInput"),Dt([_e()],Ct.prototype,"_coverEntityPresetInput"),Dt([_e()],Ct.prototype,"_coverPresetsExpandedEntity"),Dt([_e()],Ct.prototype,"_fanShowHeader"),Dt([_e()],Ct.prototype,"_fanRoom"),Dt([_e()],Ct.prototype,"_fanRoomDropdownOpen"),Dt([_e()],Ct.prototype,"_fanRoomEntities"),Dt([_e()],Ct.prototype,"_climateShowHeader"),Dt([_e()],Ct.prototype,"_climateDisplayMode"),Dt([_e()],Ct.prototype,"_climateDashboardDisplayMode"),Dt([_e()],Ct.prototype,"_climateDashboardEntities"),Dt([_e()],Ct.prototype,"_climateRoom"),Dt([_e()],Ct.prototype,"_climateRoomDropdownOpen"),Dt([_e()],Ct.prototype,"_climateRoomEntities"),Dt([_e()],Ct.prototype,"_presenceShowHeader"),Dt([_e()],Ct.prototype,"_presencePersonEntities"),Dt([_e()],Ct.prototype,"_presenceSmartphoneSensors"),Dt([_e()],Ct.prototype,"_presenceNotifyServices"),Dt([_e()],Ct.prototype,"_presenceDrivingSensors"),Dt([_e()],Ct.prototype,"_presenceDropdownOpen"),Dt([_e()],Ct.prototype,"_presenceDropdownSearch"),Dt([_e()],Ct.prototype,"_mediaShowHeader"),Dt([_e()],Ct.prototype,"_mediaExtraEntities"),Dt([_e()],Ct.prototype,"_mediaRoom"),Dt([_e()],Ct.prototype,"_mediaRoomDropdownOpen"),Dt([_e()],Ct.prototype,"_mediaRoomNativePlayers"),Dt([_e()],Ct.prototype,"_mediaAddDropdownOpen"),Dt([_e()],Ct.prototype,"_mediaEntitySearch"),Dt([_e()],Ct.prototype,"_spotifyShowHeader"),Dt([_e()],Ct.prototype,"_spotifyEntity"),Dt([_e()],Ct.prototype,"_spotifySortOrder"),Dt([_e()],Ct.prototype,"_spotifyDropdownOpen"),Dt([_e()],Ct.prototype,"_spotifyMaxItems"),Dt([_e()],Ct.prototype,"_spotifyVisibleSpeakers"),Dt([_e()],Ct.prototype,"_spotifyConfigured"),Dt([_e()],Ct.prototype,"_cameraShowHeader"),Dt([_e()],Ct.prototype,"_cameraAutoCycle"),Dt([_e()],Ct.prototype,"_cameraCycleInterval"),Dt([_e()],Ct.prototype,"_cameraEntityOrder"),Dt([_e()],Ct.prototype,"_unassignedEntities"),Dt([_e()],Ct.prototype,"_unassignedDropdownEntity"),Dt([_e()],Ct.prototype,"_unassignedEntitySearch"),Dt([_e()],Ct.prototype,"_unassignedAreaSearch"),Dt([_e()],Ct.prototype,"_unassignedEditingEntity"),Dt([_e()],Ct.prototype,"_dashboardEnabledCards"),Dt([_e()],Ct.prototype,"_dashboardCardOrder"),Dt([_e()],Ct.prototype,"_dashboardHideHeader"),Dt([_e()],Ct.prototype,"_dashboardHideSidebar"),Dt([_e()],Ct.prototype,"_dashboardExpanded"),Dt([_e()],Ct.prototype,"_scheduleExpandedEntity"),Dt([_e()],Ct.prototype,"_pickerOpen"),Dt([_e()],Ct.prototype,"_pickerYear"),Dt([_e()],Ct.prototype,"_pickerMonth"),Dt([_e()],Ct.prototype,"_pickerStartDay"),Dt([_e()],Ct.prototype,"_pickerStartMonth"),Dt([_e()],Ct.prototype,"_pickerStartYear"),Dt([_e()],Ct.prototype,"_pickerEndDay"),Dt([_e()],Ct.prototype,"_pickerEndMonth"),Dt([_e()],Ct.prototype,"_pickerEndYear"),Dt([_e()],Ct.prototype,"_pickerStartHour"),Dt([_e()],Ct.prototype,"_pickerStartMinute"),Dt([_e()],Ct.prototype,"_pickerEndHour"),Dt([_e()],Ct.prototype,"_pickerEndMinute"),Dt([_e()],Ct.prototype,"_pickerPhase"),Dt([_e()],Ct.prototype,"_dragIdx"),Dt([_e()],Ct.prototype,"_dropIdx"),Dt([_e()],Ct.prototype,"_dragContext"),Dt([_e()],Ct.prototype,"_dragModeSrcIdx"),Dt([_e()],Ct.prototype,"_toastError");let Pt=Ct;try{customElements.define("glass-config-panel",Pt)}catch{}}();
