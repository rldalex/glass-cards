!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let r=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(a,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,_=globalThis,m=_.trustedTypes,u=m?m.emptyScript:"",g=_.reactiveElementPolyfillSupport,v=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},b=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=a?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...l(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),r=e.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=a;const s=r.fromAttribute(t,e.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const s=this.constructor;if(!1===a&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??b)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+D,I=`<${C}>`,P=document,A=()=>P.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,R="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,L=/>/g,H=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,N=/"/g,V=/^(?:script|style|textarea|title)$/i,q=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),K=q(1),U=q(2),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),B=new WeakMap,Y=P.createTreeWalker(P,129);function G(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class X{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,s=0;const o=e.length-1,n=this.parts,[c,d]=((e,t)=>{const i=e.length-1,a=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=T;for(let n=0;n<i;n++){const t=e[n];let i,c,d=-1,l=0;for(;l<t.length&&(o.lastIndex=l,c=o.exec(t),null!==c);)l=o.lastIndex,o===T?"!--"===c[1]?o=M:void 0!==c[1]?o=L:void 0!==c[2]?(V.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=H):void 0!==c[3]&&(o=H):o===H?">"===c[0]?(o=r??T,d=-1):void 0===c[1]?d=-2:(d=o.lastIndex-c[2].length,i=c[1],o=void 0===c[3]?H:'"'===c[3]?N:j):o===N||o===j?o=H:o===M||o===L?o=T:(o=H,r=void 0);const h=o===H&&e[n+1].startsWith("/>")?" ":"";s+=o===T?t+I:d>=0?(a.push(i),t.slice(0,d)+E+t.slice(d)+D+h):t+D+(-2===d?n:h)}return[G(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=X.createElement(c,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=Y.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=d[s++],i=a.getAttribute(e).split(D),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(D)&&(n.push({type:6,index:r}),a.removeAttribute(e));if(V.test(a.tagName)){const e=a.textContent.split(D),t=e.length-1;if(t>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],A()),Y.nextNode(),n.push({type:2,index:++r});a.append(e[t],A())}}}else if(8===a.nodeType)if(a.data===C)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(D,e+1));)n.push({type:7,index:r}),e+=D.length-1}r++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,a){if(t===F)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const s=z(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=J(e,r._$AS(e,t.values),r,a)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??P).importNode(t,!0);Y.currentNode=a;let r=Y.nextNode(),s=0,o=0,n=i[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new Q(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new re(r,this,e)),this._$AV.push(t),n=i[++o]}s!==n?.index&&(r=Y.nextNode(),s++)}return Y.currentNode=P,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),z(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Z(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new X(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new Q(this.O(A()),this.O(A()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,a){const r=this.strings;let s=!1;if(void 0===r)e=J(this,e,t,0),s=!z(e)||e!==this._$AH&&e!==F,s&&(this._$AH=e);else{const a=e;let o,n;for(e=r[0],o=0;o<r.length-1;o++)n=J(this,a[i+o],t,o),n===F&&(n=this._$AH[o]),s||=!z(n)||n!==this._$AH[o],n===W?e=W:e!==W&&(e+=(n??"")+r[o+1]),this._$AH[o]=n}s&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ae extends ee{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??W)===F)return;const i=this._$AH,a=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==W&&(i===W||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const se=x.litHtmlPolyfillSupport;se?.(X,Q),(x.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class ne extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new Q(t.insertBefore(A(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ne._$litElement$=!0,ne.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ne});const ce=oe.litElementPolyfillSupport;ce?.({LitElement:ne}),(oe.litElementVersions??=[]).push("4.2.2");const de=[s`
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
`,s`
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
`,s`
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
`,s`
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
        background: linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%);
        box-shadow: inset 0 1px 0 0 rgba(var(--rgb-white),0.1), 0 8px 32px rgba(var(--rgb-black),0.4), 0 2px 8px rgba(var(--rgb-black),0.25);
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
`],le={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b},he=(e=le,t,i)=>{const{kind:a,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return pe({...e,state:!0,attribute:!1})}const me=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}};var ue=Object.defineProperty,ge=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ue(t,i,s),s};class ve extends ne{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.color="var(--rgb-accent)",this.label="",this.disabled=!1,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[s`
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
    `]}_displayPct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_snap(e){if(this.step<=0)return e;const t=Math.round(e/this.step)*this.step,i=(this.step.toString().split(".")[1]||"").length;return parseFloat(t.toFixed(i))}_pctToValue(e){const t=this.max-this.min,i=this.min+e/100*t;return Math.max(this.min,Math.min(this.max,this._snap(i)))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max")||e.has("color"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._displayPct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.transform=`translate(calc(${e}cqw - 50%), -50%)`)}_onPointerDown(e){if(this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,this._ac=new AbortController;const{signal:i}=this._ac,a=this.renderRoot.querySelector(".fill"),r=this.renderRoot.querySelector(".thumb"),s=(e,i)=>{const s=t.getBoundingClientRect(),o=Math.max(0,Math.min(100,(e.clientX-s.left)/s.width*100)),n=this._pctToValue(o);this._dragValue=n;const c=this._displayPct(n);a.style.transform=`scaleX(${c/100})`,r.style.transform=`translate(calc(${c}cqw - 50%), -50%)`;const d=i?"glass-slider-change":"glass-slider-input";this.dispatchEvent(new CustomEvent(d,{detail:{value:n},bubbles:!0,composed:!0}))};s(e,!1);const o=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}this._dragging=!1};t.addEventListener("pointermove",e=>s(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{s(e,!0),o()},{signal:i}),t.addEventListener("pointercancel",()=>o(),{signal:i}),t.addEventListener("lostpointercapture",()=>o(),{signal:i})}_onKeyDown(e){if(this.disabled)return;const t=this.step>0?this.step:1;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this._snap(this.value+t));break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this._snap(this.value-t));break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this._dragValue=i,this._applyVisuals(),this.dispatchEvent(new CustomEvent("glass-slider-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return K`
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
        ${this.label?K`<span class="label">${this.label}</span>`:""}
      </div>
    `}}ge([pe({type:Number})],ve.prototype,"value"),ge([pe({type:Number})],ve.prototype,"min"),ge([pe({type:Number})],ve.prototype,"max"),ge([pe({type:Number})],ve.prototype,"step"),ge([pe({type:String})],ve.prototype,"color"),ge([pe({type:String})],ve.prototype,"label"),ge([pe({type:Boolean,reflect:!0})],ve.prototype,"disabled");try{customElements.define("glass-slider",ve)}catch{}const fe=s`
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
    --c-spotify: #1DB954;
    --c-spotify-hover: #1ed760;
    --c-temp-hot: #f87171;
    --c-temp-cold: #60a5fa;

    --blur-sm: blur(8px);
    --blur-md: blur(16px) saturate(1.3);
    --blur-lg: blur(40px) saturate(1.4);
    --blur-xl: blur(50px) saturate(1.5);

    --icon-xs: 0.625rem;
    --icon-sm: 0.875rem;
    --icon-md: 1.125rem;
    --icon-lg: 1.375rem;
    --icon-xl: 1.5rem;
  }
`,be=s`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`,ye=s`
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
    animation: marquee-scroll var(--marquee-duration, 8s) linear infinite;
    will-change: transform;
  }
  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;const we=s`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`;s`
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
    transition-delay: 0.1s;
  }
`,s`
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
`;const xe={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer",collapse:"Réduire",expand:"Développer",move_up:"Déplacer vers le haut",move_down:"Déplacer vers le bas",none:"Aucun",rooms:"Pièces"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSO",compass_SW:"SO",compass_WSW:"OSO",compass_W:"O",compass_WNW:"ONO",compass_NW:"NO",compass_NNW:"NNO"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store d'ombrage",dc_window:"Fenêtre",dc_damper:"Clapet"},climate:{title:"Climat",target:"Consigne",current:"Actuelle",range_low:"Min",range_high:"Max",humidity_target:"Humidité cible",aux_heat:"Chauffage auxiliaire",unavailable:"Indisponible",mode_heat:"Chauffage",mode_cool:"Climatisation",mode_heat_cool:"Auto chaud/froid",mode_auto:"Automatique",mode_dry:"Déshumidification",mode_fan_only:"Ventilation",mode_off:"Éteint",preset_eco:"Éco",preset_comfort:"Confort",preset_boost:"Boost",preset_away:"Absent",preset_sleep:"Nuit",preset_activity:"Activité",preset_none:"Aucun",fan_mode:"Ventilation",swing_mode:"Oscillation",open_all_aria:"Allumer tous les climatiseurs",close_all_aria:"Éteindre tous les climatiseurs",toggle_aria:"Basculer",expand_aria:"Détails",temp_up_aria:"Augmenter température",temp_down_aria:"Diminuer température",humidity_up_aria:"Augmenter humidité",humidity_down_aria:"Diminuer humidité",range_low_aria:"Température minimale",range_high_aria:"Température maximale",no_climates:"Aucun climatiseur",turn_on_aria:"Allumer",turn_off_aria:"Éteindre",action_heating:"Chauffe",action_cooling:"Refroidit",action_idle:"En attente",action_off:"Éteint",action_drying:"Déshumidifie",current_label:"Actuel",controls_aria:"Contrôles",unknown:"Inconnu",avg_label:"Moy.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce."},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}",clear_search:"Effacer la recherche"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",remove_from_queue:"Retirer de la liste de lecture",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",distance_m:"m",distance_km:"km"},camera:{title:"CAMÉRAS",idle:"Veille",streaming:"En direct",recording:"Enregistrement",off:"Éteinte",unavailable:"Indisponible",no_cameras:"Aucune caméra",prev_aria:"Caméra précédente",next_aria:"Caméra suivante",dot_aria:"Aller à {name}",power_on:"Allumer",power_off:"Éteindre",snapshot:"Capture",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Désactiver détection mouvement",motion_off_aria:"Activer détection mouvement",siren_aria:"Sirène",floodlight_aria:"Projecteur",auto_track_aria:"Suivi automatique",tap_to_stream:"Appuyer pour diffuser",camera_off:"Caméra éteinte",ai_person:"Personne",ai_vehicle:"Véhicule",ai_pet:"Animal",ai_animal:"Animal",ai_package:"Colis",ai_face:"Visage",ai_baby_crying:"Bébé",ai_bicycle:"Vélo",dashboard_title:"CAMÉRAS",dashboard_title_one:"1 CAMÉRA"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Barre de nav","tab_popup":"Popup Pièce","tab_light":"Carte Lumières","preview":"Aperçu","behavior":"Comportement","navbar_behavior":"Comportement","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","navbar_rooms_banner":"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.","navbar_visible_rooms":"Pièces visibles","navbar_empty_rooms":"Pièces vides","navbar_empty_rooms_desc":"Ces pièces n\'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu\'elles apparaissent dans la navbar.","navbar_indicators":"Indicateurs","navbar_indicators_desc":"Activez ou désactivez les indicateurs visuels sur la navbar.","navbar_ind_lights":"Lumières allumées","navbar_ind_lights_desc":"Glow doré sur l\'icône","navbar_ind_temp":"Température","navbar_ind_temp_desc":"Badge chaud / froid","navbar_ind_humidity":"Humidité","navbar_ind_humidity_desc":"Barre bleue en bas","navbar_ind_media":"Média en lecture","navbar_ind_media_desc":"Bounce de l\'icône","navbar_thresholds":"Seuils","navbar_thresholds_desc":"Définissez les seuils pour les alertes de température et d\'humidité.","navbar_temp_high":"Température haute","navbar_temp_low":"Température basse","navbar_humidity_threshold":"Seuil humidité","navbar_choose_icon":"Choisir icône","navbar_change_icon_aria":"Changer l\'icône de {name}","navbar_icon_label":"Icône — {name}","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_camera":"Caméras","domain_camera_desc":"Caméras de surveillance","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Carte Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_hourly":"Prévisions horaires","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","tab_title":"Carte Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_period_indicator":"Indicateur de période","title_period_info":"Créez un input_select nommé « periode_journee » avec les options : Matin, Après-midi, Soir, Nuit. L\'indicateur s\'affichera automatiquement.","title_period_entity":"Entité période","title_period_entity_desc":"Sélectionnez l\'input_select qui contrôle la période du jour","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Visuels des périodes","title_period_options_desc":"Personnalisez l\'icône et la couleur de chaque période","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Carte Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Carte Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Carte Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Carte Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Carte Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Carte Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Carte Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","tab_climate":"Climat","climate_desc":"Configurez les entités climat par pièce","climate_no_entities":"Aucune entité climat dans cette pièce","climate_show_header":"Afficher l\'en-tête","climate_show_header_desc":"Titre et compteur au-dessus de la carte","climate_display_mode":"Mode d\'affichage","climate_display_mode_popup":"Mode d\'affichage (popup)","climate_display_mode_dashboard":"Mode d\'affichage (dashboard)","climate_mode_list":"Liste","climate_mode_normal":"Normal","climate_select_room":"Sélectionner une pièce","climate_dashboard_entities":"Entités climat du tableau de bord","climate_dashboard_entities_desc":"Sélectionnez les thermostats à afficher sur le tableau de bord.","dashboard_card_climate":"Climat","dashboard_card_climate_desc":"Thermostats et climatiseurs","dashboard_card_fan":"Carte Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Carte Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Carte Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Carte Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Carte Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_compact":"Affichage compact","cover_dashboard_compact_desc":"Affiche les volets en grille compacte 2 colonnes. Désactivé, chaque volet occupe toute la largeur.","cover_dashboard_entities":"Volets du tableau de bord","cover_dashboard_entities_desc":"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_camera_carousel":"Carte Caméras","camera_show_header":"Afficher l\'en-tête","camera_show_header_desc":"Titre et compteur au-dessus de la carte","camera_auto_cycle":"Cycle automatique","camera_auto_cycle_desc":"Passer automatiquement d\'une caméra à l\'autre","camera_cycle_interval":"Intervalle (secondes)","camera_cycle_interval_desc":"Temps entre chaque changement de caméra","camera_entity_order":"Ordre des caméras","camera_entity_order_desc":"Glissez pour réordonner les caméras.","camera_no_cameras":"Aucune caméra détectée.","dashboard_card_camera_carousel":"Carte Caméras","dashboard_card_camera_carousel_desc":"Carrousel de surveillance avec actions rapides","tab_spotify":"Carte Spotify","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Entité lecteur Spotify","spotify_entity_desc":"Sélectionnez l\'entité media_player Spotify à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Sélectionnez les enceintes affichées dans le popup de lecture. Si aucune n\'est sélectionnée, toutes les enceintes sont affichées.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres","tab_unassigned":"Assignation pièces","unassigned_desc":"Assignez ou réassignez vos entités à une pièce pour qu\'elles apparaissent dans les popups correspondants.","unassigned_none":"Toutes les entités sont assignées à une pièce.","unassigned_no_entities":"Aucune entité détectée.","unassigned_select_area":"Non assignée","unassigned_assigned":"Assignée","unassigned_count":"{count} entité(s) sans pièce","unassigned_no_results":"Aucun résultat.","unassigned_rename":"Renommer l\'entité","unassigned_change_icon":"Changer l\'icône"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete",collapse:"Collapse",expand:"Expand",move_up:"Move up",move_down:"Move down",none:"None",rooms:"Rooms"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSW",compass_SW:"SW",compass_WSW:"WSW",compass_W:"W",compass_WNW:"WNW",compass_NW:"NW",compass_NNW:"NNW"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},climate:{title:"Climate",target:"Target",current:"Current",range_low:"Low",range_high:"High",humidity_target:"Target humidity",aux_heat:"Auxiliary heat",unavailable:"Unavailable",mode_heat:"Heat",mode_cool:"Cool",mode_heat_cool:"Heat/Cool",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan only",mode_off:"Off",preset_eco:"Eco",preset_comfort:"Comfort",preset_boost:"Boost",preset_away:"Away",preset_sleep:"Sleep",preset_activity:"Activity",preset_none:"None",fan_mode:"Fan mode",swing_mode:"Swing mode",open_all_aria:"Turn on all climate devices",close_all_aria:"Turn off all climate devices",toggle_aria:"Toggle",expand_aria:"Details",temp_up_aria:"Increase temperature",temp_down_aria:"Decrease temperature",humidity_up_aria:"Increase humidity",humidity_down_aria:"Decrease humidity",range_low_aria:"Minimum temperature",range_high_aria:"Maximum temperature",no_climates:"No climate devices",turn_on_aria:"Turn on",turn_off_aria:"Turn off",action_heating:"Heating",action_cooling:"Cooling",action_idle:"Idle",action_off:"Off",action_drying:"Drying",current_label:"Current",controls_aria:"Controls",unknown:"Unknown",avg_label:"Avg.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room."},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}",clear_search:"Clear search"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",remove_from_queue:"Remove from queue",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",distance_m:"m",distance_km:"km"},camera:{title:"CAMERAS",idle:"Idle",streaming:"Streaming",recording:"Recording",off:"Off",unavailable:"Unavailable",no_cameras:"No cameras",prev_aria:"Previous camera",next_aria:"Next camera",dot_aria:"Go to {name}",power_on:"Turn on",power_off:"Turn off",snapshot:"Snapshot",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Disable motion detection",motion_off_aria:"Enable motion detection",siren_aria:"Siren",floodlight_aria:"Floodlight",auto_track_aria:"Auto tracking",tap_to_stream:"Tap to stream",camera_off:"Camera off",ai_person:"Person",ai_vehicle:"Vehicle",ai_pet:"Pet",ai_animal:"Animal",ai_package:"Package",ai_face:"Face",ai_baby_crying:"Baby",ai_bicycle:"Bicycle",dashboard_title:"CAMERAS",dashboard_title_one:"1 CAMERA"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Navbar","tab_popup":"Room Popup","tab_light":"Light Card","preview":"Preview","behavior":"Behavior","navbar_behavior":"Behavior","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","navbar_rooms_banner":"Drag to reorder rooms. Toggle to hide.","navbar_visible_rooms":"Visible rooms","navbar_empty_rooms":"Empty rooms","navbar_empty_rooms_desc":"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.","navbar_indicators":"Indicators","navbar_indicators_desc":"Enable or disable visual indicators on the navbar.","navbar_ind_lights":"Lights on","navbar_ind_lights_desc":"Golden glow on icon","navbar_ind_temp":"Temperature","navbar_ind_temp_desc":"Hot / cold badge","navbar_ind_humidity":"Humidity","navbar_ind_humidity_desc":"Blue bar at bottom","navbar_ind_media":"Media playing","navbar_ind_media_desc":"Icon bounce","navbar_thresholds":"Thresholds","navbar_thresholds_desc":"Set thresholds for temperature and humidity alerts.","navbar_temp_high":"High temperature","navbar_temp_low":"Low temperature","navbar_humidity_threshold":"Humidity threshold","navbar_choose_icon":"Choose icon","navbar_change_icon_aria":"Change icon for {name}","navbar_icon_label":"Icon — {name}","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_camera":"Cameras","domain_camera_desc":"Security cameras","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather Card","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_hourly":"Hourly forecast","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","tab_title":"Title Card","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_period_indicator":"Period indicator","title_period_info":"Create an input_select named \'periode_journee\' with options: Matin, Après-midi, Soir, Nuit. The indicator will appear automatically.","title_period_entity":"Period entity","title_period_entity_desc":"Select the input_select that controls the time of day period","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Period visuals","title_period_options_desc":"Customize the icon and color for each period","title_add_source":"Add a source","title_remove_source":"Remove source","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title Card","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather Card","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Light Card","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Cover Card","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify Card","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media Card","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media Card","dashboard_card_media_desc":"Shows media players with transport controls","tab_climate":"Climate","climate_desc":"Configure climate entities per room","climate_no_entities":"No climate entities in this room","climate_show_header":"Show header","climate_show_header_desc":"Title and counter above the card","climate_display_mode":"Display mode","climate_display_mode_popup":"Display mode (popup)","climate_display_mode_dashboard":"Display mode (dashboard)","climate_mode_list":"List","climate_mode_normal":"Normal","climate_select_room":"Select a room","climate_dashboard_entities":"Dashboard climate entities","climate_dashboard_entities_desc":"Select which climate entities to display on the dashboard.","dashboard_card_climate":"Climate","dashboard_card_climate_desc":"Thermostats and HVAC","dashboard_card_fan":"Fan Card","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence Card","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence Card","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fan Card","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Cover Card","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_compact":"Compact layout","cover_dashboard_compact_desc":"Display covers in a 2-column compact grid. When off, each cover takes the full width.","cover_dashboard_entities":"Dashboard covers","cover_dashboard_entities_desc":"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_camera_carousel":"Camera Card","camera_show_header":"Show header","camera_show_header_desc":"Title and counter above the card","camera_auto_cycle":"Auto cycle","camera_auto_cycle_desc":"Automatically cycle between cameras","camera_cycle_interval":"Interval (seconds)","camera_cycle_interval_desc":"Time between each camera switch","camera_entity_order":"Camera order","camera_entity_order_desc":"Drag to reorder cameras.","camera_no_cameras":"No cameras detected.","dashboard_card_camera_carousel":"Camera Card","dashboard_card_camera_carousel_desc":"Surveillance carousel with quick actions","tab_spotify":"Spotify Card","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player entity","spotify_entity_desc":"Select the Spotify media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Select which speakers appear in the playback popup. If none are selected, all speakers are shown.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings","tab_unassigned":"Room assignment","unassigned_desc":"Assign or reassign your entities to a room so they appear in the corresponding popups.","unassigned_none":"All entities are assigned to a room.","unassigned_no_entities":"No entities detected.","unassigned_select_area":"Unassigned","unassigned_assigned":"Assigned","unassigned_count":"{count} unassigned entity(ies)","unassigned_no_results":"No results.","unassigned_rename":"Rename entity","unassigned_change_icon":"Change icon"}')}},$e="fr";let ke=$e;function Se(e){const t=e.slice(0,2).toLowerCase(),i=t in xe?t:$e;return i!==ke&&(ke=i,!0)}function Ee(){return ke}function De(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),r=-1===i?"":e.slice(i+1),s=xe[ke]??xe[$e],o=xe[$e],n=s?.[a]?.[r]??o?.[a]?.[r];let c="string"==typeof n?n:e;if(t)for(const[d,l]of Object.entries(t))c=c.replaceAll(`{${d}}`,String(l));return c}var Ce=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,Pe=(e,t,i,a)=>{for(var r,s=a>1?void 0:a?Ie(t,i):t,o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a?r(t,i,s):r(s))||s);return a&&s&&Ce(t,i,s),s};class Ae extends ne{constructor(){super(...arguments),this._lang=Ee()}set hass(e){this._hass=e,e?.language&&Se(e.language)&&(this._lang=Ee())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[fe,s`
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
          ${De("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${De("editor.open_config")}</a>
        </p>
      </div>
    `}}Pe([pe({attribute:!1})],Ae.prototype,"hass",1),Pe([_e()],Ae.prototype,"_lang",2);try{customElements.define("glass-card-editor",Ae)}catch{}var ze=Object.defineProperty,Oe=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ze(t,i,s),s};class Re extends ne{constructor(){super(...arguments),this._lang=Ee(),this._busCleanups=[],this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}static getStubConfig(){return{}}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&Se(this.hass.language)&&(this._lang=Ee())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0)}_listen(e,t){this._busCleanups.push(me.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function Te(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}function Me(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&Te(t,i)===e)}Oe([pe({attribute:!1})],Re.prototype,"hass"),Oe([_e()],Re.prototype,"_lang");class Le{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}var He=Object.defineProperty,je=Object.getOwnPropertyDescriptor,Ne=(e,t,i,a)=>{for(var r,s=a>1?void 0:a?je(t,i):t,o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a?r(t,i,s):r(s))||s);return a&&s&&He(t,i,s),s};class Ve extends ne{constructor(){super(...arguments),this.rooms=[],this.emptyRooms=[],this.dragState={dragIdx:null,dropIdx:null,dragContext:"rooms",dragModeSrcIdx:null},this._configData={},this._lang=Ee()}set configData(e){const t=this._configData;this._configData=e,e&&e!==t&&this.loadFromConfig(e)}get configData(){return this._configData}static{this.styles=[fe,be,ye,we,...de]}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&Se(this.hass.language)&&(this._lang=Ee())}render(){return this._lang,this.renderTab()}_fireDirty(){this.dispatchEvent(new CustomEvent("tab-dirty",{bubbles:!0,composed:!0}))}_fireToast(e){this.dispatchEvent(new CustomEvent("tab-toast",{bubbles:!0,composed:!0,detail:{success:e}}))}_onDragStart(e,t,i){this.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,composed:!0,detail:{idx:e,context:t,srcIdx:i}}))}_onDragOver(e,t){t.preventDefault(),this.dispatchEvent(new CustomEvent("drag-over",{bubbles:!0,composed:!0,detail:{idx:e}}))}_onDragLeave(){this.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!0,composed:!0}))}_onDragEnd(){this.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,composed:!0}))}static{this._AUTO_SAVE_KEYS=new Set}_checkAutoSave(e){const t=this.constructor._AUTO_SAVE_KEYS;if(0!==t.size)for(const i of e.keys())if(t.has(i))return void this._fireDirty()}}Ne([pe({attribute:!1})],Ve.prototype,"hass",2),Ne([pe({attribute:!1})],Ve.prototype,"backend",2),Ne([pe({attribute:!1})],Ve.prototype,"rooms",2),Ne([pe({attribute:!1})],Ve.prototype,"emptyRooms",2),Ne([pe({attribute:!1})],Ve.prototype,"dragState",2),Ne([pe({attribute:!1})],Ve.prototype,"configData",1),Ne([_e()],Ve.prototype,"_lang",2);var qe=Object.defineProperty,Ke=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&qe(t,i,s),s};const Ue={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"]};function Fe(e,t,i,a){const r=Ue[t.deviceClass]||Ue.shutter,s=e?.states[t.entityId],o="open"===s?.state||"opening"===s?.state,n=s?.attributes.current_position;return K`
    <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;${i?"min-width:0;overflow:hidden;":"grid-column:1/-1;"}${a?"padding-left:8px;border-left:1px solid var(--b2);":""}">
      <div style="width:22px;height:22px;border-radius:var(--radius-xs);background:${o?"rgba(167,139,250,0.1)":"var(--s2)"};border:1px solid ${o?"rgba(167,139,250,0.15)":"var(--b1)"};display:flex;align-items:center;justify-content:center;">
        <ha-icon .icon=${r[o?0:1]} style="--mdc-icon-size:13px;color:${o?"#a78bfa":"var(--t3)"};display:flex;align-items:center;justify-content:center;${o?"filter:drop-shadow(0 0 4px rgba(167,139,250,0.4));":""}"></ha-icon>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${t.name}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
          <span style="font-size:8px;color:${o?"rgba(167,139,250,0.6)":"var(--t4)"};">${De(o?"cover.open":"cover.closed")}</span>
        </div>
      </div>
      ${i||void 0===n?W:K`
        <span style="font-size:12px;font-weight:700;color:${o?"#a78bfa":"var(--t3)"};font-variant-numeric:tabular-nums;">${n}<span style="font-size:8px;font-weight:500;">%</span></span>
      `}
      <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${o?"#a78bfa":"var(--t4)"};${o?"box-shadow:0 0 6px rgba(167,139,250,0.4);":""}"></div>
    </div>
  `}class We extends Ve{constructor(){super(...arguments),this._coverShowHeader=!0,this._coverDashboardCompact=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._coverPresets=[0,25,50,75,100],this._coverEntityPresets={},this._coverRoom="",this._coverRoomDropdownOpen=!1,this._coverRoomEntities=[],this._coverPresetInput="",this._coverEntityPresetInput={},this._coverPresetsExpandedEntity=null,this._dragIdx=null,this._dropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_coverShowHeader","_coverDashboardCompact","_coverDashboardEntities","_coverDashboardOrder","_coverPresets","_coverEntityPresets","_coverRoomEntities"])}updated(e){super.updated(e),this._checkAutoSave(e)}connectedCallback(){super.connectedCallback(),!this._coverRoom&&this.rooms.length>0&&(this._coverRoom=this.rooms[0].areaId,this._loadRoomCovers())}loadFromConfig(e){const t=e;this._coverShowHeader=t.show_header??!0,this._coverDashboardCompact=t.dashboard_compact??!0,this._coverDashboardEntities=t.dashboard_entities??[],this._coverPresets=t.presets??[0,25,50,75,100],this._coverEntityPresets=t.entity_presets??{},this._initDashboardOrder()}collectSaveData(){const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));return{show_header:this._coverShowHeader,dashboard_compact:this._coverDashboardCompact,dashboard_entities:e,presets:this._coverPresets,entity_presets:this._coverEntityPresets}}async save(){if(this.backend)try{if(await this.backend.send("set_cover_config",this.collectSaveData()),this._coverRoom&&this._coverRoomEntities.length>0){let e=[],t=[],i={};try{const a=await this.backend.send("get_room",{area_id:this._coverRoom});a&&(e=a.hidden_entities??[],t=a.entity_order??[],i=a.entity_layouts??{})}catch{}const a=new Set(this._coverRoomEntities.map(e=>e.entityId)),r=e.filter(e=>!a.has(e)),s=this._coverRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),o=[...t.filter(e=>!a.has(e)),...this._coverRoomEntities.map(e=>e.entityId)],n={...i};for(const c of this._coverRoomEntities)n[c.entityId]=c.layout;await this.backend.send("set_room",{area_id:this._coverRoom,hidden_entities:[...r,...s],entity_order:o,entity_layouts:n})}this._fireToast(!0),me.emit("cover-config-changed",void 0),this._coverRoom&&me.emit("room-config-changed",{areaId:this._coverRoom})}catch{this._fireToast(!1)}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.cover_card&&this.loadFromConfig(e.cover_card)}catch{}this._coverEntityPresetInput={},await this._loadRoomCovers()}}async _loadRoomCovers(){if(!this.backend||!this._coverRoom||!this.hass)return;const e=this._coverRoom,t=Me(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._coverRoom!==e)return;const a=new Set(i?.hidden_entities??[]),r=i?.entity_order??[],s=i?.entity_layouts??{},o=[...t].sort((e,t)=>{const i=r.indexOf(e),a=r.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._coverRoomEntities=o.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,r=t?.attributes?.device_class||"shutter";return{entityId:e,name:i,visible:!a.has(e),deviceClass:r,layout:s[e]||"compact"}})}_initDashboardOrder(){const e=new Set(this._getAllCoverEntities().map(e=>e.entityId)),t=this._coverDashboardEntities.filter(t=>e.has(t)),i=[...e].filter(e=>!this._coverDashboardEntities.includes(e));this._coverDashboardOrder=[...t,...i]}getAllCoverEntities(){return this._getAllCoverEntities()}_getAllCoverEntities(){if(!this.hass)return[];const e=[];for(const[t,i]of Object.entries(this.hass.states)){if(!t.startsWith("cover."))continue;const a=i.attributes?.friendly_name||t.split(".")[1]||t;e.push({entityId:t,name:a})}return e.sort((e,t)=>e.name.localeCompare(t.name))}_selectRoom(e){this._coverRoom=e,this._coverRoomDropdownOpen=!1,this._loadRoomCovers()}_toggleEntityVisibility(e){this._coverRoomEntities=this._coverRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLayout(e){this._coverRoomEntities=this._coverRoomEntities.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}toggleDashboardEntity(e){const t=new Set(this._coverDashboardEntities);t.has(e)?(t.delete(e),this._coverDashboardOrder=this._coverDashboardOrder.filter(t=>t!==e)):(t.add(e),this._coverDashboardOrder.includes(e)||(this._coverDashboardOrder=[...this._coverDashboardOrder,e])),this._coverDashboardEntities=[...t]}onDropDashboardCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverDashboardOrder],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverDashboardOrder=i,this._dragIdx=null,this._dropIdx=null}_addPreset(){const e=parseInt(this._coverPresetInput,10);isNaN(e)||e<0||e>100||(this._coverPresets.includes(e)||(this._coverPresets=[...this._coverPresets,e].sort((e,t)=>e-t)),this._coverPresetInput="")}_removePreset(e){this._coverPresets=this._coverPresets.filter(t=>t!==e)}_addEntityPreset(e){const t=this._coverEntityPresetInput[e]??"",i=parseInt(t,10);if(isNaN(i)||i<0||i>100)return;const a=this._coverEntityPresets[e]??[...this._coverPresets];a.includes(i)?this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""}:(this._coverEntityPresets={...this._coverEntityPresets,[e]:[...a,i].sort((e,t)=>e-t)},this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""})}_removeEntityPreset(e,t){const i=this._coverEntityPresets[e];if(!i)return;const a=i.filter(e=>e!==t);if(0===a.length){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}else this._coverEntityPresets={...this._coverEntityPresets,[e]:a}}_resetEntityPresets(e){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}_togglePresetsExpand(e){this._coverPresetsExpandedEntity=this._coverPresetsExpandedEntity===e?null:e}_onLocalDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onLocalDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onLocalDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverRoomEntities=i,this._dragIdx=null,this._dropIdx=null}renderPreview(){const e=this._coverRoomEntities.filter(e=>e.visible),t=e.filter(e=>{const t=this.hass?.states[e.entityId];return"open"===t?.state||"opening"===t?.state}).length;return K`
      <div class="preview-cover">
        ${this._coverShowHeader?K`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${De("cover.title")}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:var(--radius-sm);background:${t>0?"rgba(167,139,250,0.15)":"var(--s2)"};color:${t>0?"#a78bfa":"var(--t3)"};">${t}/${e.length}</span>
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
        <div class="preview-cover-card glass" style="padding:8px 10px;display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;">
          <!-- Tint -->
          <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#a78bfa,transparent 70%);opacity:${e.length>0?(t/e.length*.18).toFixed(3):"0"};"></div>
          ${0===e.length?K`
            <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);grid-column:1/-1;">—</div>
          `:W}
          ${function(e,t){const i=[];let a=0;for(;a<t.length;){const r=t[a];"compact"===r.layout&&a+1<t.length&&"compact"===t[a+1].layout?(i.push(Fe(e,r,!0,!1)),i.push(Fe(e,t[a+1],!0,!0)),a+=2):(i.push(Fe(e,r,!1,!1)),a++)}return i}(this.hass,e.slice(0,4))}
          ${e.length>4?K`
            <div style="font-size:9px;color:var(--t4);text-align:center;padding-top:2px;position:relative;z-index:1;grid-column:1/-1;">+${e.length-4}</div>
          `:W}
        </div>
      </div>
    `}renderTab(){if(this._lang,!this.hass)return K``;const e=this.rooms.find(e=>e.areaId===this._coverRoom);return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-cover">
        <div class="section-label">${De("config.behavior")}</div>
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
              <div class="feature-name">${De("config.cover_show_header")}</div>
              <div class="feature-desc">${De("config.cover_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._coverShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <!-- Per-room cover config -->
        <div class="section-label">${De("config.cover_room")}</div>
        <div class="section-desc">${De("config.cover_room_desc")}</div>

        <!-- Room selector dropdown -->
        <div class="dropdown ${this._coverRoomDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._coverRoomDropdownOpen=!this._coverRoomDropdownOpen}}
            aria-expanded=${this._coverRoomDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||De("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this.rooms.map(e=>K`
              <button
                class="dropdown-item ${e.areaId===this._coverRoom?"active":""}"
                role="option"
                aria-selected=${e.areaId===this._coverRoom?"true":"false"}
                @click=${()=>this._selectRoom(e.areaId)}
              >
                <ha-icon .icon=${e.icon}></ha-icon>
                ${e.name}
              </button>
            `)}
          </div>
        </div>

        ${this._coverRoom?K`
          ${this._coverRoomEntities.length>0?K`
            <div class="section-label">${De("config.cover_list_title")} (${this._coverRoomEntities.length})</div>
            <div class="section-desc">${De("config.cover_list_banner")}</div>
            <div class="item-list">
              ${this._coverRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"covers"===this._dragContext,a=this._dropIdx===t&&"covers"===this._dragContext,r=this._coverPresetsExpandedEntity===e.entityId,s=!!this._coverEntityPresets[e.entityId],o=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),n=["item-card",r?"expanded":""].filter(Boolean).join(" ");return K`
                  <div class=${n}>
                    <div
                      class=${o}
                      draggable="true"
                      @dragstart=${()=>this._onLocalDragStart(t,"covers")}
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
                        class="schedule-btn ${s?"active":""}"
                        @click=${()=>this._togglePresetsExpand(e.entityId)}
                        aria-label="${De("config.cover_entity_presets")}"
                        aria-expanded=${r?"true":"false"}
                        title="${De("config.cover_entity_presets")}"
                      >
                        <ha-icon .icon=${"mdi:tune-vertical"}></ha-icon>
                      </button>
                      <button
                        class="layout-btn"
                        @click=${()=>this._cycleLayout(e.entityId)}
                        aria-label="${De("config.light_change_layout_aria")}"
                        title="${De("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
                      >
                        ${De("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
                      </button>
                      <button
                        class="toggle ${e.visible?"on":""}"
                        @click=${()=>this._toggleEntityVisibility(e.entityId)}
                        role="switch"
                        aria-checked=${e.visible?"true":"false"}
                        aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.name}"
                      ></button>
                    </div>
                    <div class="fold-sep ${r?"visible":""}"></div>
                    <div class="schedule-fold ${r?"open":""}">
                      <div class="schedule-fold-inner">
                        <div style="padding:8px 12px 10px 36px;">
                          <div style="font-size:9px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${De("config.cover_entity_presets")}</div>
                          <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">
                            ${(this._coverEntityPresets[e.entityId]??this._coverPresets).map(t=>{const i=t>=50?"mdi:window-shutter-open":"mdi:window-shutter",a=!!this._coverEntityPresets[e.entityId];return K`
                                <span style="
                                  display:inline-flex;align-items:center;gap:3px;
                                  padding:0.1875rem 0.4375rem;border-radius:var(--radius-md);
                                  border:1px solid ${a?"rgba(167,139,250,0.2)":"var(--b2)"};
                                  background:${a?"rgba(167,139,250,0.05)":"var(--s1)"};
                                  font-size:10px;font-weight:600;color:${a?"var(--c-accent)":"var(--t3)"};
                                ">
                                  <ha-icon .icon=${i} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                  ${0===t?De("cover.preset_closed"):100===t?De("cover.preset_open"):`${t}%`}
                                  ${a?K`
                                    <button
                                      style="background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;color:var(--t4);transition:color var(--t-fast);"
                                      @click=${()=>this._removeEntityPreset(e.entityId,t)}
                                      aria-label="${De("common.delete")} ${t}%"
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
                                @keydown=${t=>{"Enter"===t.key&&this._addEntityPreset(e.entityId)}}
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
                                  opacity:${this._coverEntityPresetInput[e.entityId]?"1":"0.4"};
                                  pointer-events:${this._coverEntityPresetInput[e.entityId]?"auto":"none"};
                                  transition:opacity var(--t-fast);
                                "
                                @click=${()=>this._addEntityPreset(e.entityId)}
                                aria-label="${De("config.cover_preset_add")}"
                              >
                                <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                              </button>
                              ${this._coverEntityPresets[e.entityId]?K`
                                <button
                                  style="
                                    display:inline-flex;align-items:center;gap:2px;
                                    padding:0.1875rem 0.375rem;border-radius:var(--radius-md);
                                    border:1px solid var(--b2);background:var(--s1);
                                    font-size:9px;font-weight:600;color:var(--t4);
                                    cursor:pointer;font-family:inherit;
                                    transition:all var(--t-fast);
                                  "
                                  @click=${()=>this._resetEntityPresets(e.entityId)}
                                  aria-label="${De("common.reset")}"
                                >
                                  <ha-icon .icon=${"mdi:restore"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                </button>
                              `:W}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `})}
            </div>
          `:K`
            <div class="banner">
              <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
              <span>${De("config.cover_no_covers")}</span>
            </div>
          `}
        `:W}

        <!-- Preset config -->
        <div class="section-label">${De("config.cover_presets")}</div>
        <div class="section-desc">${De("config.cover_presets_desc")}</div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
          ${this._coverPresets.map(e=>K`
              <span style="
                display:inline-flex;align-items:center;gap:4px;
                padding:0.3125rem 0.625rem;border-radius:var(--radius-md);
                border:1px solid var(--b2);background:var(--s1);
                font-size:11px;font-weight:600;color:var(--t2);
              ">
                <ha-icon .icon=${e>=50?"mdi:window-shutter-open":"mdi:window-shutter"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${0===e?De("cover.preset_closed"):100===e?De("cover.preset_open"):`${e}%`}
                <button
                  style="
                    background:none;border:none;cursor:pointer;padding:0;
                    display:flex;align-items:center;justify-content:center;
                    color:var(--t4);transition:color var(--t-fast);
                  "
                  @click=${()=>this._removePreset(e)}
                  aria-label="${De("common.delete")} ${e}%"
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
              @keydown=${e=>{"Enter"===e.key&&this._addPreset()}}
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
                opacity:${this._coverPresetInput?"1":"0.4"};
                pointer-events:${this._coverPresetInput?"auto":"none"};
                transition:opacity var(--t-fast);
              "
              @click=${()=>this._addPreset()}
            >
              <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${De("config.cover_preset_add")}
            </button>
          </span>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}Ke([_e()],We.prototype,"_coverShowHeader"),Ke([_e()],We.prototype,"_coverDashboardCompact"),Ke([_e()],We.prototype,"_coverDashboardEntities"),Ke([_e()],We.prototype,"_coverDashboardOrder"),Ke([_e()],We.prototype,"_coverPresets"),Ke([_e()],We.prototype,"_coverEntityPresets"),Ke([_e()],We.prototype,"_coverRoom"),Ke([_e()],We.prototype,"_coverRoomDropdownOpen"),Ke([_e()],We.prototype,"_coverRoomEntities"),Ke([_e()],We.prototype,"_coverPresetInput"),Ke([_e()],We.prototype,"_coverEntityPresetInput"),Ke([_e()],We.prototype,"_coverPresetsExpandedEntity"),Ke([_e()],We.prototype,"_dragIdx"),Ke([_e()],We.prototype,"_dropIdx"),Ke([_e()],We.prototype,"_dragContext");try{customElements.define("config-tab-cover",We)}catch{}var Be=Object.defineProperty,Ye=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Be(t,i,s),s};const Ge={light:{cmd:"set_light_config",configKey:"light_card"},weather:{cmd:"set_weather",configKey:"weather"},cover:{cmd:"set_cover_config",configKey:"cover_card"},fan:{cmd:"set_fan_config",configKey:"fan_card"},spotify:{cmd:"set_spotify_config",configKey:"spotify_card"},media:{cmd:"set_media_config",configKey:"media_card"},presence:{cmd:"set_presence_config",configKey:"presence_card"},climate:{cmd:"set_climate_config",configKey:"climate_card"},camera_carousel:{cmd:"set_camera_carousel_config",configKey:"camera_carousel"}};class Xe extends Ve{constructor(){super(...arguments),this._dashboardEnabledCards=["weather"],this._dashboardCardOrder=["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],this._dashboardHideHeader=!1,this._dashboardHideSidebar=!1,this._dashboardExpanded=new Set,this._cardSubConfigs={},this._coverDashboardCompact=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._climateDashboardDisplayMode="list",this._dragIdx=null,this._dropIdx=null,this._dragContext="",this._titleConfig={}}static{this._AUTO_SAVE_KEYS=new Set(["_dashboardEnabledCards","_dashboardCardOrder","_dashboardHideHeader","_dashboardHideSidebar"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e.dashboard;t&&(this._dashboardEnabledCards=t.enabled_cards??["weather"],this._dashboardCardOrder=t.card_order??["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],this._dashboardHideHeader=t.hide_header??!1,this._dashboardHideSidebar=t.hide_sidebar??!1);const i=e;this._titleConfig=i.title_card??{},this._cardSubConfigs={};for(const[s,o]of Object.entries(Ge)){const e=i[o.configKey];this._cardSubConfigs[s]={wsCommand:o.cmd,showHeader:e?.show_header??!0,extras:e?{...e}:{}}}const a=i.cover_card;this._coverDashboardCompact=a?.dashboard_compact??!0,this._coverDashboardEntities=a?.dashboard_entities??[],this._initCoverDashboardOrder();const r=i.climate_card;this._climateDashboardDisplayMode="normal"===r?.dashboard_display_mode?"normal":"list"}collectSaveData(){return{enabled_cards:this._dashboardEnabledCards,card_order:this._dashboardCardOrder,hide_header:this._dashboardHideHeader,hide_sidebar:this._dashboardHideSidebar}}async save(){if(this.backend)try{await this.backend.send("set_dashboard",this.collectSaveData());for(const[e,t]of Object.entries(this._cardSubConfigs)){const i={show_header:t.showHeader};if(t.extras&&Object.assign(i,t.extras),"cover"===e){const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));i.dashboard_compact=this._coverDashboardCompact,i.dashboard_entities=e}"climate"===e&&(i.dashboard_display_mode=this._climateDashboardDisplayMode),await this.backend.send(t.wsCommand,i)}this._fireToast(!0),me.emit("dashboard-config-changed",void 0),me.emit("light-config-changed",void 0),me.emit("weather-config-changed",void 0),me.emit("cover-config-changed",void 0),me.emit("fan-config-changed",void 0),me.emit("spotify-config-changed",void 0),me.emit("media-config-changed",void 0),me.emit("presence-config-changed",void 0),me.emit("climate-config-changed",void 0),me.emit("camera-carousel-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e&&this.loadFromConfig(e)}catch{}}_getAllCoverEntities(){if(!this.hass)return[];const e=[];for(const[t,i]of Object.entries(this.hass.states))t.startsWith("cover.")&&e.push({entityId:t,name:i.attributes?.friendly_name||t.split(".")[1]||t});return e.sort((e,t)=>e.name.localeCompare(t.name))}_initCoverDashboardOrder(){const e=new Set(this._getAllCoverEntities().map(e=>e.entityId));this._coverDashboardOrder=[...this._coverDashboardEntities.filter(t=>e.has(t)),...[...e].filter(e=>!this._coverDashboardEntities.includes(e))]}_toggleCoverDashboardEntity(e){const t=new Set(this._coverDashboardEntities);t.has(e)?(t.delete(e),this._coverDashboardOrder=this._coverDashboardOrder.filter(t=>t!==e)):(t.add(e),this._coverDashboardOrder.includes(e)||(this._coverDashboardOrder=[...this._coverDashboardOrder,e])),this._coverDashboardEntities=[...t],this._fireDirty()}_toggleDashboardCard(e){const t=new Set(this._dashboardEnabledCards);t.has(e)?t.delete(e):t.add(e),this._dashboardEnabledCards=[...t]}_toggleDashboardExpand(e){const t=new Set(this._dashboardExpanded);t.has(e)?t.delete(e):t.add(e),this._dashboardExpanded=t}_setShowHeader(e,t){const i=this._cardSubConfigs[e];i&&(this._cardSubConfigs={...this._cardSubConfigs,[e]:{...i,showHeader:t}},this.requestUpdate(),this._fireDirty())}_getShowHeader(e){return this._cardSubConfigs[e]?.showHeader??!0}_onLocalDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onLocalDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onDropDashboardCard(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_cards"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._dashboardCardOrder],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._dashboardCardOrder=i,this._dragIdx=null,this._dropIdx=null}_onDropDashboardCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverDashboardOrder],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverDashboardOrder=i,this._dragIdx=null,this._dropIdx=null,this._fireDirty()}renderPreview(){const e=new Set(this._dashboardEnabledCards),t={title:{icon:"mdi:format-title",label:this._titleConfig.title||De("config.title_title_placeholder"),titleStyle:"font-size:11px;font-weight:700;color:var(--t1);"},weather:{icon:"mdi:weather-partly-cloudy",label:De("weather.title")},climate:{icon:"mdi:thermostat",label:De("climate.title")},light:{icon:"mdi:lightbulb-group",label:De("light.title")},media:{icon:"mdi:speaker",label:De("media.title")},fan:{icon:"mdi:fan",label:De("fan.title")},cover:{icon:"mdi:blinds",label:De("cover.title")},spotify:{icon:"mdi:spotify",label:De("spotify.title")},presence:{icon:"mdi:account-group",label:De("presence.title")}},i=this._dashboardCardOrder.filter(t=>e.has(t));return K`
      <div class="preview-dashboard">
        <div class="preview-dashboard-cards">
          ${0===i.length?K`<div class="preview-dashboard-empty">—</div>`:W}
          ${i.map(e=>{const i=t[e];return i?K`
              <div class="preview-dashboard-card ${e}">
                ${i.titleStyle?K`<span style=${i.titleStyle}>${i.label}</span>`:K`<ha-icon .icon=${i.icon}></ha-icon><span>${i.label}</span>`}
              </div>
            `:W})}
        </div>
        <div class="preview-dashboard-navbar">
          <ha-icon .icon=${"mdi:sofa"}></ha-icon>
          <ha-icon .icon=${"mdi:stove"}></ha-icon>
          <ha-icon .icon=${"mdi:bed"}></ha-icon>
        </div>
      </div>
    `}_renderCardSub(e,t,i){const a=t&&i;if("light"===e||"weather"===e||"fan"===e||"spotify"===e||"media"===e||"presence"===e){const t=this._getShowHeader(e),i={light:"config.light_show_header_desc",weather:"config.weather_show_header_desc",fan:"config.fan_show_header_desc",spotify:"config.spotify_show_header_desc",media:"config.media_show_header_desc",presence:"config.presence_show_header_desc"};return K`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${i=>{i.stopPropagation(),this._setShowHeader(e,!t)}}
                role="switch"
                aria-checked=${t?"true":"false"}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${De({light:"config.light_show_header",weather:"config.weather_show_header",fan:"config.fan_show_header",spotify:"config.spotify_show_header",media:"config.media_show_header",presence:"config.presence_show_header"}[e])}</div>
                  <div class="feature-desc">${De(i[e])}</div>
                </div>
                <span
                  class="toggle ${t?"on":""}"
                ></span>
              </button>
            </div>
          </div>
        </div>
      `}if("cover"===e){const e=this._getShowHeader("cover");return K`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${t=>{t.stopPropagation(),this._setShowHeader("cover",!e)}}
                role="switch"
                aria-checked=${e?"true":"false"}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${De("config.cover_show_header")}</div>
                  <div class="feature-desc">${De("config.cover_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${e?"on":""}"
                ></span>
              </button>
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._coverDashboardCompact=!this._coverDashboardCompact,this._fireDirty()}}
                role="switch"
                aria-checked=${this._coverDashboardCompact?"true":"false"}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:view-grid-outline"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${De("config.cover_dashboard_compact")}</div>
                  <div class="feature-desc">${De("config.cover_dashboard_compact_desc")}</div>
                </div>
                <span
                  class="toggle ${this._coverDashboardCompact?"on":""}"
                ></span>
              </button>
              <div class="section-label" style="margin-top:10px;">${De("config.cover_dashboard_entities")}</div>
              <div class="section-desc">${De("config.cover_dashboard_entities_desc")}</div>
              <div class="item-list">
                ${this._coverDashboardOrder.map((e,t)=>{const i=this._getAllCoverEntities().find(t=>t.entityId===e);if(!i)return W;const a=this._coverDashboardEntities.includes(i.entityId),r=["item-row",a?"":"disabled",this._dragIdx===t&&"dashboard_covers"===this._dragContext?"dragging":"",this._dropIdx===t&&"dashboard_covers"===this._dragContext?"drop-target":""].filter(Boolean).join(" ");return K`
                    <div
                      class=${r}
                      draggable="true"
                      @dragstart=${e=>{e.stopPropagation(),this._onLocalDragStart(t,"dashboard_covers")}}
                      @dragover=${e=>{e.stopPropagation(),this._onLocalDragOver(t,e)}}
                      @dragleave=${()=>this._onLocalDragLeave()}
                      @drop=${e=>{e.stopPropagation(),this._onDropDashboardCover(t,e)}}
                      @dragend=${()=>this._onLocalDragEnd()}
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
                        aria-label="${De(a?"common.hide":"common.show")} ${i.name}"
                      ></button>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        </div>
      `}if("climate"===e){const e=this._getShowHeader("climate");return K`
        <div class="feature-sub ${a?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${t=>{t.stopPropagation(),this._setShowHeader("climate",!e)}}
                role="switch"
                aria-checked=${e?"true":"false"}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${De("config.climate_show_header")}</div>
                  <div class="feature-desc">${De("config.climate_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${e?"on":""}"
                ></span>
              </button>
              <div class="section-label" style="margin-top:10px;">${De("config.climate_display_mode")}</div>
              <div style="display:flex;gap:6px;margin-top:6px;padding:0 4px;">
                <button class="chip ${"list"===this._climateDashboardDisplayMode?"active":""}"
                  @click=${e=>{e.stopPropagation(),this._climateDashboardDisplayMode="list",this._fireDirty()}}>
                  <ha-icon .icon=${"mdi:format-list-bulleted"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                  ${De("config.climate_mode_list")}
                </button>
                <button class="chip ${"normal"===this._climateDashboardDisplayMode?"active":""}"
                  @click=${e=>{e.stopPropagation(),this._climateDashboardDisplayMode="normal",this._fireDirty()}}>
                  <ha-icon .icon=${"mdi:gauge"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                  ${De("config.climate_mode_normal")}
                </button>
              </div>
            </div>
          </div>
        </div>
      `}return W}renderTab(){this._lang;const e={title:{icon:"mdi:format-title",nameKey:"config.dashboard_card_title",descKey:"config.dashboard_card_title_desc",hasSub:!1},weather:{icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",descKey:"config.dashboard_card_weather_desc",hasSub:!0},climate:{icon:"mdi:thermostat",nameKey:"config.dashboard_card_climate",descKey:"config.dashboard_card_climate_desc",hasSub:!0},light:{icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",descKey:"config.dashboard_card_light_desc",hasSub:!0},cover:{icon:"mdi:blinds",nameKey:"config.dashboard_card_cover",descKey:"config.dashboard_card_cover_desc",hasSub:!0},spotify:{icon:"mdi:spotify",nameKey:"config.dashboard_card_spotify",descKey:"config.dashboard_card_spotify_desc",hasSub:!0},media:{icon:"mdi:speaker",nameKey:"config.dashboard_card_media",descKey:"config.dashboard_card_media_desc",hasSub:!0},fan:{icon:"mdi:fan",nameKey:"config.dashboard_card_fan",descKey:"config.dashboard_card_fan_desc",hasSub:!0},presence:{icon:"mdi:account-group",nameKey:"config.dashboard_card_presence",descKey:"config.dashboard_card_presence_desc",hasSub:!0},camera_carousel:{icon:"mdi:cctv",nameKey:"config.dashboard_card_camera_carousel",descKey:"config.dashboard_card_camera_carousel_desc",hasSub:!1}},t=new Set(this._dashboardEnabledCards);return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-dashboard">
        <div class="section-label">${De("config.dashboard_display")}</div>
        <div class="section-desc">${De("config.dashboard_display_desc")}</div>

        <div class="check-item mt-12">
          <button
            class="toggle ${this._dashboardHideHeader?"on":""}"
            @click=${()=>{this._dashboardHideHeader=!this._dashboardHideHeader,this._fireDirty()}}
            role="switch"
            aria-checked=${this._dashboardHideHeader?"true":"false"}
            aria-label=${De("config.dashboard_hide_header")}
          ></button>
          <div class="check-label">
            <span>${De("config.dashboard_hide_header")}</span>
            <span class="check-desc">${De("config.dashboard_hide_header_desc")}</span>
          </div>
        </div>
        <div class="check-item mb-8">
          <button
            class="toggle ${this._dashboardHideSidebar?"on":""}"
            @click=${()=>{this._dashboardHideSidebar=!this._dashboardHideSidebar,this._fireDirty()}}
            role="switch"
            aria-checked=${this._dashboardHideSidebar?"true":"false"}
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
          ${this._dashboardCardOrder.map((i,a)=>{const r=e[i];if(!r)return W;const s=t.has(i),o=this._dragIdx===a&&"dashboard_cards"===this._dragContext,n=this._dropIdx===a&&"dashboard_cards"===this._dragContext,c=this._dashboardExpanded.has(i),d=["item-row",s?"":"disabled",o?"dragging":"",n?"drop-target":""].filter(Boolean).join(" "),l=["item-card",c?"expanded":""].filter(Boolean).join(" ");return K`
              <div
                class=${r.hasSub?l:""}
                draggable="true"
                @dragstart=${()=>this._onLocalDragStart(a,"dashboard_cards")}
                @dragover=${e=>this._onLocalDragOver(a,e)}
                @dragleave=${()=>this._onLocalDragLeave()}
                @drop=${e=>this._onDropDashboardCard(a,e)}
                @dragend=${()=>this._onLocalDragEnd()}
              >
                <div class=${d}>
                  <span class="drag-handle">
                    <ha-icon .icon=${"mdi:drag"}></ha-icon>
                  </span>
                  <div class="feature-icon">
                    <ha-icon .icon=${r.icon}></ha-icon>
                  </div>
                  <div class="item-info">
                    <span class="item-name">${De(r.nameKey)}</span>
                    <span class="item-meta">${De(r.descKey)}</span>
                  </div>
                  ${r.hasSub&&s?K`
                    <button
                      class="btn-icon xs"
                      aria-label=${De(c?"common.hide":"common.show")}
                      aria-expanded=${c?"true":"false"}
                      @click=${e=>{e.stopPropagation(),this._toggleDashboardExpand(i)}}
                    >
                      <ha-icon .icon=${c?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                    </button>
                  `:W}
                  <button
                    class="toggle ${s?"on":""}"
                    @click=${e=>{e.stopPropagation(),this._toggleDashboardCard(i)}}
                    role="switch"
                    aria-checked=${s?"true":"false"}
                    aria-label="${De(s?"common.hide":"common.show")} ${De(r.nameKey)}"
                  ></button>
                </div>
                ${r.hasSub?K`
                  <div class="fold-sep ${c&&s?"visible":""}"></div>
                `:W}
                ${this._renderCardSub(i,s,c)}
              </div>
            `})}
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}Ye([_e()],Xe.prototype,"_dashboardEnabledCards"),Ye([_e()],Xe.prototype,"_dashboardCardOrder"),Ye([_e()],Xe.prototype,"_dashboardHideHeader"),Ye([_e()],Xe.prototype,"_dashboardHideSidebar"),Ye([_e()],Xe.prototype,"_dashboardExpanded"),Ye([_e()],Xe.prototype,"_coverDashboardCompact"),Ye([_e()],Xe.prototype,"_coverDashboardEntities"),Ye([_e()],Xe.prototype,"_coverDashboardOrder"),Ye([_e()],Xe.prototype,"_climateDashboardDisplayMode"),Ye([_e()],Xe.prototype,"_dragIdx"),Ye([_e()],Xe.prototype,"_dropIdx"),Ye([_e()],Xe.prototype,"_dragContext");try{customElements.define("config-tab-dashboard",Xe)}catch{}var Je=Object.defineProperty,Ze=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Je(t,i,s),s};class Qe extends Ve{constructor(){super(...arguments),this._lights=[],this._lightRoom="",this._lightDropdownOpen=!1,this._lightShowHeader=!0,this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._suppressAutoSave=!1,this._mounted=!1}static{this._AUTO_SAVE_KEYS=new Set(["_lightShowHeader","_lights"])}connectedCallback(){super.connectedCallback(),this._mounted=!0}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1}updated(e){super.updated(e),this._suppressAutoSave?this._suppressAutoSave=!1:this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._lightShowHeader=t.show_header??!0}collectSaveData(){return{show_header:this._lightShowHeader}}async save(){if(this.backend)try{if(await this.backend.send("set_light_config",{show_header:this._lightShowHeader}),!this._lightRoom)return this._fireToast(!0),void me.emit("light-config-changed",void 0);let e=[];try{const t=await this.backend.send("get_room",{area_id:this._lightRoom});t&&(e=t.hidden_entities??[])}catch{}const t=new Set(this._lights.map(e=>e.entityId)),i=e.filter(e=>!t.has(e)),a=this._lights.filter(e=>!e.visible).map(e=>e.entityId),r={};for(const s of this._lights)"full"===s.layout&&(r[s.entityId]=s.layout);if(await this.backend.send("set_room",{area_id:this._lightRoom,entity_order:this._lights.map(e=>e.entityId),hidden_entities:[...i,...a],entity_layouts:r}),!this._mounted)return;this._fireToast(!0),me.emit("light-config-changed",void 0),me.emit("room-config-changed",{areaId:this._lightRoom})}catch{this._fireToast(!1)}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.light_card&&this.loadFromConfig(e.light_card)}catch{}this._lightRoom&&await this._loadRoomLights()}}initRoom(){!this._lightRoom&&this.rooms.length>0&&(this._lightRoom=this.rooms[0].areaId,this._loadRoomLights())}async _loadRoomLights(){if(this._suppressAutoSave=!0,!this.hass||!this._lightRoom)return void(this._lights=[]);const e=this._lightRoom,t=Me(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light."));let i=new Set,a=[],r={};try{if(!this.backend)throw new Error("No backend");const t=await this.backend.send("get_room",{area_id:e});if(this._lightRoom!==e)return;t&&(i=new Set(t.hidden_entities??[]),a=t.entity_order??[],r=t.entity_layouts??{})}catch{}const s=this.hass,o=new Map;a.forEach((e,t)=>o.set(e,t));const n=t.map(e=>{const t=s.states[e.entity_id],a="on"===t?.state,o=t?.attributes.brightness,n=a&&void 0!==o?Math.round(o/255*100):0;return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:a,brightnessPct:n,layout:r[e.entity_id]||"compact",visible:!i.has(e.entity_id)}});n.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=o.get(e.entityId),a=o.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._lights=n;try{if(this.backend){const t=await this.backend.send("get_schedules");if(this._lightRoom!==e)return;this._schedulesLoaded=t??{},this._scheduleEdits=new Map;for(const e of n){const t=this._schedulesLoaded[e.entityId];this._scheduleEdits.set(e.entityId,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}_selectLightRoom(e){this._lightRoom=e,this._lightDropdownOpen=!1,this._loadRoomLights()}_toggleLightVisible(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLightLayout(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleScheduleExpand(e){if(this._scheduleExpandedEntity=this._scheduleExpandedEntity===e?null:e,!this._scheduleEdits.has(e)){const t=this._schedulesLoaded[e];this._scheduleEdits.set(e,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}this.requestUpdate()}_addSchedulePeriod(e){const t=this._scheduleEdits.get(e)??[];t.push({start:"",end:"",recurring:!1}),this._scheduleEdits.set(e,[...t]),this.requestUpdate()}_removeSchedulePeriod(e,t){const i=this._scheduleEdits.get(e)??[];i.splice(t,1),this._scheduleEdits.set(e,[...i]),this.requestUpdate()}_updateSchedulePeriod(e,t,i,a){const r=this._scheduleEdits.get(e)??[];r[t]&&(r[t]={...r[t],[i]:a},this._scheduleEdits.set(e,[...r]),this.requestUpdate())}_toggleScheduleRecurring(e,t){const i=this._scheduleEdits.get(e)??[];i[t]&&(i[t]={...i[t],recurring:!i[t].recurring},this._scheduleEdits.set(e,[...i]),this.requestUpdate())}async _saveSchedule(e){if(!this.backend)return;const t=(this._scheduleEdits.get(e)??[]).filter(e=>e.start&&e.end);try{if(await this.backend.send("set_schedule",{entity_id:e,periods:t}),!this._mounted)return;this._fireToast(!0),me.emit("schedule-changed",{entityId:e})}catch{if(!this._mounted)return;this._fireToast(!1)}}_formatDateTimeShort(e){if(!e)return"";const[t,i]=e.split("T");if(!t)return e;const[a,r,s]=t.split("-");return`${s}/${r}/${a} ${i??"00:00"}`}_formatPeriodDisplay(e){if(!e.start&&!e.end)return"";const t=this._formatDateTimeShort(e.start),i=this._formatDateTimeShort(e.end);return t&&i?`${t}  →  ${i}`:t?`${t}  → …`:`…  →  ${i}`}_parseDateTimeValue(e){if(!e)return null;const[t,i]=e.split("T");if(!t)return null;const a=t.split("-").map(Number);if(a.length<3||a.some(isNaN))return null;const[r,s,o]=a,[n,c]=(i??"00:00").split(":");return{year:r,month:s-1,day:o,hour:n??"00",minute:c??"00"}}_openRangePicker(e,t){this._pickerTarget={entityId:e,periodIdx:t};const i=(this._scheduleEdits.get(e)??[])[t],a=i?this._parseDateTimeValue(i.start):null,r=i?this._parseDateTimeValue(i.end):null,s=new Date;a?(this._pickerStartDay=a.day,this._pickerStartMonth=a.month,this._pickerStartYear=a.year,this._pickerStartHour=a.hour,this._pickerStartMinute=a.minute,this._pickerYear=a.year,this._pickerMonth=a.month):(this._pickerStartDay=null,this._pickerStartMonth=s.getMonth(),this._pickerStartYear=s.getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerYear=s.getFullYear(),this._pickerMonth=s.getMonth()),r?(this._pickerEndDay=r.day,this._pickerEndMonth=r.month,this._pickerEndYear=r.year,this._pickerEndHour=r.hour,this._pickerEndMinute=r.minute):(this._pickerEndDay=null,this._pickerEndMonth=s.getMonth(),this._pickerEndYear=s.getFullYear(),this._pickerEndHour="23",this._pickerEndMinute="59"),this._pickerPhase=a?r?"start":"end":"start",this._pickerOpen=!0}_closePicker(){this._pickerOpen=!1,this._pickerTarget=null}_pickerPrevMonth(){0===this._pickerMonth?(this._pickerMonth=11,this._pickerYear--):this._pickerMonth--}_pickerNextMonth(){11===this._pickerMonth?(this._pickerMonth=0,this._pickerYear++):this._pickerMonth++}_pickerSelectDay(e,t){if(!t)if("start"===this._pickerPhase){if(this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerPhase="end",null!==this._pickerEndDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,e).getTime();new Date(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay).getTime()<t&&(this._pickerEndDay=null)}}else{if(null!==this._pickerStartDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay).getTime();if(new Date(this._pickerYear,this._pickerMonth,e).getTime()<t)return this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerEndDay=null,void(this._pickerPhase="start")}this._pickerEndDay=e,this._pickerEndMonth=this._pickerMonth,this._pickerEndYear=this._pickerYear}}_pickerSetTime(e,t){const i=t.target.value.replace(/\D/g,"").slice(0,2),a=e.includes("Hour"),r=Math.min(a?23:59,Math.max(0,parseInt(i,10)||0)),s=String(r).padStart(2,"0");t.target.value=s,"startHour"===e?this._pickerStartHour=s:"startMinute"===e?this._pickerStartMinute=s:"endHour"===e?this._pickerEndHour=s:this._pickerEndMinute=s,this.requestUpdate()}_pickerConfirm(){if(!this._pickerTarget||null===this._pickerStartDay||null===this._pickerEndDay)return;const{entityId:e,periodIdx:t}=this._pickerTarget,i=String(this._pickerStartMonth+1).padStart(2,"0"),a=String(this._pickerStartDay).padStart(2,"0"),r=String(this._pickerEndMonth+1).padStart(2,"0"),s=String(this._pickerEndDay).padStart(2,"0"),o=`${this._pickerStartYear}-${i}-${a}T${this._pickerStartHour}:${this._pickerStartMinute}`,n=`${this._pickerEndYear}-${r}-${s}T${this._pickerEndHour}:${this._pickerEndMinute}`;this._updateSchedulePeriod(e,t,"start",o),this._updateSchedulePeriod(e,t,"end",n),this._closePicker()}_toAbsDay(e,t,i){return new Date(e,t,i).getTime()}_getMonthDays(){const e=this._pickerYear,t=this._pickerMonth,i=(new Date(e,t,1).getDay()+6)%7,a=new Date(e,t+1,0).getDate(),r=new Date(e,t,0).getDate(),s=new Date,o=s.getFullYear()===e&&s.getMonth()===t,n=s.getDate(),c=null!==this._pickerStartDay?this._toAbsDay(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay):null,d=null!==this._pickerEndDay?this._toAbsDay(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay):null,l=[],h=(e,t,i,a)=>{const r=this._toAbsDay(i,a,e);return{day:e,otherMonth:t,today:!t&&o&&e===n,rangeStart:null!==c&&r===c,rangeEnd:null!==d&&r===d,inRange:null!==c&&null!==d&&r>c&&r<d}},p=0===t?11:t-1,_=0===t?e-1:e;for(let v=i-1;v>=0;v--)l.push(h(r-v,!0,_,p));for(let v=1;v<=a;v++)l.push(h(v,!1,e,t));const m=11===t?0:t+1,u=11===t?e+1:e,g=42-l.length;for(let v=1;v<=g;v++)l.push(h(v,!0,u,m));return l}_getMonthLabel(){const e=new Date(this._pickerYear,this._pickerMonth,1),t="fr"===this._lang?"fr-FR":"en-US",i=e.toLocaleDateString(t,{month:"long"});return`${i.charAt(0).toUpperCase()}${i.slice(1)} ${this._pickerYear}`}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_onLocalDragStart(e){this._dragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDropLight(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return void this._onLocalDragEnd();const i=[...this._lights],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._lights=i,this._onLocalDragEnd()}_renderScheduleContent(e){const t=this._scheduleEdits.get(e)??[];return K`
      <div class="schedule-body">
        <div class="schedule-header">${De("config.light_schedule_title")}</div>
        ${t.map((t,i)=>K`
          <div class="schedule-period">
            <div class="schedule-row">
              <button
                class="datetime-display ${t.start||t.end?"":"empty"}"
                @click=${()=>this._openRangePicker(e,i)}
              >
                ${t.start||t.end?this._formatPeriodDisplay(t):De("config.light_schedule_no_date")}
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
                <span class="check-label">${De("config.light_schedule_recurring")}</span>
              </button>
              <button
                class="btn-icon xs schedule-delete"
                @click=${()=>this._removeSchedulePeriod(e,i)}
                aria-label="${De("config.light_schedule_delete_aria")}"
              >
                <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
              </button>
            </div>
          </div>
        `)}
        <button class="btn btn-sm schedule-add" @click=${()=>this._addSchedulePeriod(e)}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          ${De("config.light_schedule_add")}
        </button>
        <button class="btn btn-sm btn-accent schedule-save" @click=${()=>this._saveSchedule(e)}>
          ${De("common.save")}
        </button>
      </div>
    `}_renderLightRow(e,t){const i=this._dragIdx===t,a=this._dropIdx===t,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),s=this._scheduleEdits.get(e.entityId),o=s?s.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0,n=this._scheduleExpandedEntity===e.entityId,c=["item-card",n?"expanded":""].filter(Boolean).join(" ");return K`
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
            aria-label="${De("config.light_schedule_aria",{name:e.name})}"
            aria-expanded=${n?"true":"false"}
            title="${De("config.light_schedule_title")}"
          >
            <ha-icon .icon=${"mdi:calendar-clock"}></ha-icon>
          </button>
          <button
            class="layout-btn"
            @click=${()=>this._cycleLightLayout(e.entityId)}
            aria-label="${De("config.light_change_layout_aria")}"
            title="${De("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
          >
            ${De("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
          </button>
          <button
            class="toggle ${e.visible?"on":""}"
            @click=${()=>this._toggleLightVisible(e.entityId)}
            role="switch"
            aria-checked=${e.visible?"true":"false"}
            aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.name}"
          ></button>
        </div>
        <div class="fold-sep ${n?"visible":""}"></div>
        <div class="schedule-fold ${n?"open":""}">
          <div class="schedule-fold-inner">
            ${this._renderScheduleContent(e.entityId)}
          </div>
        </div>
      </div>
    `}_renderDateTimePicker(){if(!this._pickerOpen)return W;const e=this._getMonthDays(),t=this._getDayLabels(),i=null!==this._pickerStartDay&&null!==this._pickerEndDay;return K`
      <div class="picker-overlay"
        @click=${e=>{e.target===e.currentTarget&&this._closePicker()}}
        @keydown=${e=>{"Escape"===e.key&&this._closePicker()}}
      >
        <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${De("config.light_schedule_title")}">
          <div class="picker-phase">
            <button
              class="picker-phase-btn ${"start"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="start"}}
            >${De("config.light_schedule_start")}</button>
            <button
              class="picker-phase-btn ${"end"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="end"}}
            >${De("config.light_schedule_end")}</button>
          </div>
          <div class="picker-header">
            <button class="picker-nav" @click=${()=>this._pickerPrevMonth()} aria-label="${De("config.light_schedule_prev_month_aria")}">
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <span class="picker-month">${this._getMonthLabel()}</span>
            <button class="picker-nav" @click=${()=>this._pickerNextMonth()} aria-label="${De("config.light_schedule_next_month_aria")}">
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </button>
          </div>
          <div class="picker-grid">
            ${t.map(e=>K`<span class="picker-day-label">${e}</span>`)}
            ${e.map(e=>{const t=["picker-day",e.today?"today":"",e.rangeStart?"range-start":"",e.rangeEnd?"range-end":"",e.inRange?"in-range":"",e.otherMonth?"other-month":""].filter(Boolean).join(" ");return K`
                <button class=${t} @click=${()=>this._pickerSelectDay(e.day,e.otherMonth)}>${e.day}</button>
              `})}
          </div>
          <div class="picker-time-row">
            <div class="picker-time-group">
              <span class="picker-time-label">${De("config.light_schedule_start")}</span>
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
              <span class="picker-time-label">${De("config.light_schedule_end")}</span>
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
            ${De("config.light_schedule_confirm")}
          </button>
        </div>
      </div>
    `}renderPreview(){if(!this._lightRoom)return K`<div class="preview-empty">${De("config.light_select_room")}</div>`;if(0===this._lights.length)return K`<div class="preview-empty">${De("config.light_no_lights")}</div>`;const e=this._lights.filter(e=>e.visible),t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,r=0===t?"none":t===i?"all":"some";if(0===e.length)return K`<div class="preview-empty">${De("config.light_no_visible")}</div>`;const s=[],o=[];for(const d of e){"compact"===("full"===d.layout?"full":"compact")?(o.push(d),2===o.length&&(s.push({kind:"compact-pair",left:o[0],right:o[1]}),o.length=0)):(o.length>0&&(s.push({kind:"compact-pair",left:o[0],right:null}),o.length=0),s.push({kind:"full",light:d}))}o.length>0&&s.push({kind:"compact-pair",left:o[0],right:null});const n=a?.06:0,c=(e,t,i)=>{const a=["preview-light-row",t?"compact":"",i?"compact-right":"",e.visible?"":"hidden-light"].filter(Boolean).join(" "),r=this._scheduleEdits.get(e.entityId),s=r?r.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0;return K`
        <div class=${a} data-on=${e.isOn}>
          <div class="preview-light-icon ${e.isOn?"on":""}">
            <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
          </div>
          <div class="preview-light-info">
            <div class="preview-light-name">${e.name}</div>
            <div class="preview-light-sub">${e.isOn?`${e.brightnessPct}%`:De("common.off")}</div>
          </div>
          ${s?K`<ha-icon class="preview-light-sched" .icon=${"mdi:calendar-clock"}></ha-icon>`:W}
          ${"full"===e.layout?K`<span class="preview-light-layout-tag">full</span>`:W}
          <span class="preview-light-dot ${e.isOn?"on":""}"></span>
        </div>
      `};return K`
      <div class="preview-light">
        ${this._lightShowHeader?K`
          <div class="preview-light-header">
            <div class="preview-light-header-left">
              <span class="preview-light-title">${De("light.title")}</span>
              <span class="preview-light-count ${r}">${t}/${i}</span>
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
            ${s.map(e=>"full"===e.kind?c(e.light,!1,!1):K`
                ${c(e.left,!0,!1)}
                ${e.right?c(e.right,!0,!0):W}
              `)}
          </div>
        </div>
      </div>
    `}renderTab(){this._lang;const e=this.rooms.find(e=>e.areaId===this._lightRoom);return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-light">
        <div class="section-label">${De("config.behavior")}</div>
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
              <div class="feature-name">${De("config.light_show_header")}</div>
              <div class="feature-desc">${De("config.light_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._lightShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <div class="section-label">${De("config.light_room")}</div>
        <div class="section-desc">
          ${De("config.light_room_desc")}
        </div>
        <div class="dropdown ${this._lightDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._lightDropdownOpen=!this._lightDropdownOpen}
            aria-expanded=${this._lightDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||De("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this.rooms.map(e=>K`
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

        ${this._lights.length>0?K`
              <div class="section-label">${De("config.light_list_title")} (${this._lights.length})</div>
              <div class="section-desc">
                ${De("config.light_list_banner")}
              </div>
              <div class="item-list">
                ${this._lights.map((e,t)=>this._renderLightRow(e,t))}
              </div>
            `:this._lightRoom?K`<div class="banner">
                <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
                <span>${De("config.light_no_lights")}</span>
              </div>`:W}

        ${this._lights.length>0?K`
          <div class="section-desc schedule-hint">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            ${De("config.light_schedule_hint")}
          </div>
        `:W}

        <div class="section-desc dashboard-vs-room">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          ${De("config.light_dashboard_vs_room")}
        </div>

        ${this._lightRoom?K`
          <div class="save-bar">
            <button class="btn btn-ghost" @click=${()=>this._loadRoomLights()}>${De("common.reset")}</button>
          </div>
        `:W}
      </div>

      ${this._renderDateTimePicker()}
    `}}Ze([_e()],Qe.prototype,"_lights"),Ze([_e()],Qe.prototype,"_lightRoom"),Ze([_e()],Qe.prototype,"_lightDropdownOpen"),Ze([_e()],Qe.prototype,"_lightShowHeader"),Ze([_e()],Qe.prototype,"_scheduleExpandedEntity"),Ze([_e()],Qe.prototype,"_pickerOpen"),Ze([_e()],Qe.prototype,"_pickerYear"),Ze([_e()],Qe.prototype,"_pickerMonth"),Ze([_e()],Qe.prototype,"_pickerStartDay"),Ze([_e()],Qe.prototype,"_pickerStartMonth"),Ze([_e()],Qe.prototype,"_pickerStartYear"),Ze([_e()],Qe.prototype,"_pickerEndDay"),Ze([_e()],Qe.prototype,"_pickerEndMonth"),Ze([_e()],Qe.prototype,"_pickerEndYear"),Ze([_e()],Qe.prototype,"_pickerStartHour"),Ze([_e()],Qe.prototype,"_pickerStartMinute"),Ze([_e()],Qe.prototype,"_pickerEndHour"),Ze([_e()],Qe.prototype,"_pickerEndMinute"),Ze([_e()],Qe.prototype,"_pickerPhase"),Ze([_e()],Qe.prototype,"_dragIdx"),Ze([_e()],Qe.prototype,"_dropIdx");try{customElements.define("config-tab-light",Qe)}catch{}var et=Object.defineProperty,tt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&et(t,i,s),s};class it extends Ve{constructor(){super(...arguments),this._mediaShowHeader=!0,this._mediaExtraEntities={},this._mediaRoom="",this._mediaRoomDropdownOpen=!1,this._mediaRoomNativePlayers=[],this._mediaAddDropdownOpen=!1,this._mediaEntitySearch="",this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this)}static{this._AUTO_SAVE_KEYS=new Set(["_mediaShowHeader","_mediaExtraEntities"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._mediaShowHeader=t.show_header??!0,this._mediaExtraEntities=t.extra_entities??{}}collectSaveData(){return{show_header:this._mediaShowHeader,extra_entities:this._mediaExtraEntities}}async save(){if(this.backend)try{await this.backend.send("set_media_config",this.collectSaveData()),this._fireToast(!0),me.emit("media-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.media_card&&this.loadFromConfig(e.media_card)}catch{}}_selectMediaRoom(e){this._mediaRoom=e,this._mediaRoomDropdownOpen=!1,this._mediaAddDropdownOpen=!1,this._mediaEntitySearch="",this._loadRoomMediaPlayers()}_addMediaExtraEntity(e){const t=this._mediaRoom;if(!t)return;const i=this._mediaExtraEntities[t]??[];i.includes(e)||(this._mediaExtraEntities={...this._mediaExtraEntities,[t]:[...i,e]})}_removeMediaExtraEntity(e){const t=this._mediaRoom;if(!t)return;const i=this._mediaExtraEntities[t]??[];this._mediaExtraEntities={...this._mediaExtraEntities,[t]:i.filter(t=>t!==e)}}_loadRoomMediaPlayers(){if(!this.hass||!this._mediaRoom)return void(this._mediaRoomNativePlayers=[]);const e=Me(this._mediaRoom,this.hass.entities,this.hass.devices);this._mediaRoomNativePlayers=e.filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseDropdowns)}_closeDropdownsOnOutsideClick(e){if(!this._mediaRoomDropdownOpen&&!this._mediaAddDropdownOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown");for(const r of a)if(t.includes(r))return;this._mediaRoomDropdownOpen=!1,this._mediaAddDropdownOpen=!1}initRoom(){!this._mediaRoom&&this.rooms.length>0&&(this._mediaRoom=this.rooms[0].areaId,this._loadRoomMediaPlayers())}renderPreview(){const e=this._mediaRoom,t=this._mediaRoomNativePlayers.length+(e?(this._mediaExtraEntities[e]??[]).length:0),i=e?(a=this).hass&&a._mediaRoom?[...a._mediaRoomNativePlayers,...a._mediaExtraEntities[a._mediaRoom]??[]].filter(e=>"playing"===a.hass?.states[e]?.state).length:0:1;var a;return K`
      <div class="preview-media">
        <!-- Simulated full-bleed artwork background -->
        <div class="mp-art-bg"></div>
        <div class="mp-gradient"></div>
        <div class="mp-content">
          <!-- Top bar: glass pill badges -->
          <div class="mp-top">
            <div class="mp-pill">
              <ha-icon .icon=${"mdi:speaker"}></ha-icon>
              <span>${e?this.rooms.find(t=>t.areaId===e)?.name??De("config.media_room"):De("config.media_select_room")}</span>
              ${i>0?K`
                <div class="mp-eq">
                  <div class="mp-eq-bar"></div>
                  <div class="mp-eq-bar"></div>
                  <div class="mp-eq-bar"></div>
                </div>
              `:W}
            </div>
            ${t>1?K`
              <div class="mp-pill">
                <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                <span>${t}</span>
              </div>
            `:W}
          </div>
          <!-- Spacer -->
          <div class="mp-spacer"></div>
          <!-- Bottom glass panel -->
          <div class="mp-glass-panel">
            ${this._mediaShowHeader?K`
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${De("media.title")}</span>
                <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:var(--radius-sm);background:rgba(96,165,250,0.15);color:#60a5fa;">${i}/${t||1}</span>
              </div>
            `:W}
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
    `}renderTab(){if(this._lang,!this.hass)return K``;const e=this.rooms.find(e=>e.areaId===this._mediaRoom),t=this._mediaRoom,i=t?this._mediaExtraEntities[t]??[]:[],a=Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort(),r=new Set([...this._mediaRoomNativePlayers,...i]),s=this._mediaEntitySearch?.toLowerCase()??"",o=a.filter(e=>{if(r.has(e))return!1;if(!s)return!0;const t=(this.hass?.states[e]?.attributes?.friendly_name??"").toLowerCase();return e.toLowerCase().includes(s)||t.includes(s)});return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-media">
        <!-- Show header toggle -->
        <div class="section-label">${De("config.behavior")}</div>
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
              <div class="feature-name">${De("config.media_show_header")}</div>
              <div class="feature-desc">${De("config.media_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._mediaShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <!-- Per-room extra entities -->
        <div class="section-label">${De("config.media_room")}</div>
        <div class="section-desc">${De("config.media_room_desc")}</div>

        <!-- Room selector dropdown -->
        <div class="dropdown ${this._mediaRoomDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._mediaRoomDropdownOpen=!this._mediaRoomDropdownOpen}}
            aria-expanded=${this._mediaRoomDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||De("config.media_select_room")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this.rooms.map(e=>K`
              <button
                class="dropdown-item ${e.areaId===this._mediaRoom?"active":""}"
                role="option"
                aria-selected=${e.areaId===this._mediaRoom?"true":"false"}
                @click=${()=>this._selectMediaRoom(e.areaId)}
              >
                <ha-icon .icon=${e.icon}></ha-icon>
                ${e.name}
              </button>
            `)}
          </div>
        </div>

        ${t?K`
          <!-- Native players (read-only) -->
          <div class="section-label">${De("config.media_native_players")} (${this._mediaRoomNativePlayers.length})</div>
          <div class="section-desc">${De("config.media_native_players_desc")}</div>
          ${this._mediaRoomNativePlayers.length>0?K`
            <div class="item-list">
              ${this._mediaRoomNativePlayers.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,a="playing"===t?.state;return K`
                  <div class="item-row">
                    <div class="item-info" style="padding-left:8px;">
                      <span class="item-name">${i}</span>
                      <span class="item-meta">${e}</span>
                    </div>
                    <div class="dot" style="background:${a?"#60a5fa":"var(--t4)"};${a?"box-shadow:0 0 6px rgba(96,165,250,0.4);":""}"></div>
                  </div>
                `})}
            </div>
          `:K`
            <div class="banner">
              <ha-icon .icon=${"mdi:speaker-off"}></ha-icon>
              <span>${De("media.no_players")}</span>
            </div>
          `}

          <!-- Extra entities -->
          <div class="section-label">${De("config.media_extra_entities")} (${i.length})</div>
          <div class="section-desc">${De("config.media_extra_entities_desc")}</div>
          ${i.length>0?K`
            <div class="item-list">
              ${i.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return K`
                  <div class="item-row">
                    <div class="item-info" style="padding-left:8px;">
                      <span class="item-name">${i}</span>
                      <span class="item-meta">${e}</span>
                    </div>
                    <button
                      class="btn-icon xs"
                      @click=${()=>this._removeMediaExtraEntity(e)}
                      aria-label="${De("common.hide")} ${i}"
                    >
                      <ha-icon .icon=${"mdi:close"}></ha-icon>
                    </button>
                  </div>
                `})}
            </div>
          `:K`
            <div class="banner">
              <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
              <span>${De("config.media_no_extra")}</span>
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
              <span>${De("config.media_add_extra")}</span>
              <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
            </button>
            <div class="dropdown-menu" role="listbox">
              <input
                type="text"
                class="dropdown-search"
                placeholder="${De("config.search_entity")}"
                .value=${this._mediaEntitySearch??""}
                @input=${e=>{this._mediaEntitySearch=e.target.value}}
                @click=${e=>e.stopPropagation()}
              />
              ${o.slice(0,20).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return K`
                  <button
                    class="dropdown-item"
                    role="option"
                    @click=${()=>{this._addMediaExtraEntity(e),this._mediaAddDropdownOpen=!1}}
                  >
                    <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                    ${i}
                  </button>
                `})}
              ${0===o.length?K`
                <div style="padding:8px 12px;font-size:12px;color:var(--t4);text-align:center;">—</div>
              `:W}
            </div>
          </div>
        `:W}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}tt([_e()],it.prototype,"_mediaShowHeader"),tt([_e()],it.prototype,"_mediaExtraEntities"),tt([_e()],it.prototype,"_mediaRoom"),tt([_e()],it.prototype,"_mediaRoomDropdownOpen"),tt([_e()],it.prototype,"_mediaRoomNativePlayers"),tt([_e()],it.prototype,"_mediaAddDropdownOpen"),tt([_e()],it.prototype,"_mediaEntitySearch");try{customElements.define("config-tab-media",it)}catch{}var at=Object.defineProperty,rt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&at(t,i,s),s};function st(e,t,i,a){const r=a?K`<div style="position:absolute;left:0;top:20%;bottom:20%;width:1px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.08) 30%,rgba(255,255,255,0.08) 70%,transparent);"></div>`:W;return K`
    <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;${i?"min-width:0;overflow:hidden;":"grid-column:1/-1;"}${a?"padding-left:8px;position:relative;":""}">
      ${r}
      <div style="width:22px;height:22px;border-radius:var(--radius-xs);background:${e.isOn?`${t}0.1)`:"var(--s2)"};border:1px solid ${e.isOn?`${t}0.15)`:"var(--b1)"};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <ha-icon .icon=${e.icon} style="--mdc-icon-size:13px;color:${e.isOn?"#818cf8":"var(--t3)"};display:flex;align-items:center;justify-content:center;${e.isOn?`filter:drop-shadow(0 0 4px ${t}0.4));animation:spin-fan-preview ${e.pct>50?"0.8":"1.5"}s linear infinite;`:""}"></ha-icon>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
          <span style="font-size:8px;color:${e.isOn?`${t}0.6)`:"var(--t4)"};">${e.isOn?`${e.pct}%`:De("fan.off")}</span>
          ${e.isOn?K`
            <span style="font-size:7px;color:var(--t4);">${De("fan.speed_step",{step:e.step,total:e.total})}</span>
          `:W}
        </div>
      </div>
      <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${e.isOn?"#818cf8":"var(--t4)"};${e.isOn?`box-shadow:0 0 6px ${t}0.4);`:""}"></div>
    </div>
  `}class ot extends Ve{constructor(){super(...arguments),this._fanShowHeader=!0,this._fanRoom="",this._fanRoomDropdownOpen=!1,this._fanRoomEntities=[],this._dragIdx=null,this._dropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_fanShowHeader","_fanRoomEntities"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._fanShowHeader=t.show_header??!0}collectSaveData(){return{show_header:this._fanShowHeader}}async save(){if(this.backend)try{if(await this.backend.send("set_fan_config",this.collectSaveData()),this._fanRoom&&this._fanRoomEntities.length>0){let e=[],t=[],i={};try{const a=await this.backend.send("get_room",{area_id:this._fanRoom});a&&(e=a.hidden_entities??[],t=a.entity_order??[],i=a.entity_layouts??{})}catch{}const a=new Set(this._fanRoomEntities.map(e=>e.entityId)),r=e.filter(e=>!a.has(e)),s=this._fanRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),o=[...t.filter(e=>!a.has(e)),...this._fanRoomEntities.map(e=>e.entityId)],n={...i};for(const c of this._fanRoomEntities)n[c.entityId]=c.layout;await this.backend.send("set_room",{area_id:this._fanRoom,hidden_entities:[...r,...s],entity_order:o,entity_layouts:n})}this._fireToast(!0),me.emit("fan-config-changed",void 0),this._fanRoom&&me.emit("room-config-changed",{areaId:this._fanRoom})}catch{this._fireToast(!1)}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.fan_card&&this.loadFromConfig(e.fan_card)}catch{}await this._loadRoomFans()}}async _loadRoomFans(){if(!this.backend||!this._fanRoom||!this.hass)return;const e=this._fanRoom,t=Me(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("fan.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._fanRoom!==e)return;const a=new Set(i?.hidden_entities??[]),r=i?.entity_order??[],s=i?.entity_layouts??{},o=[...t].sort((e,t)=>{const i=r.indexOf(e),a=r.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._fanRoomEntities=o.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i,visible:!a.has(e),layout:s[e]||"compact"}})}_selectRoom(e){this._fanRoom=e,this._fanRoomDropdownOpen=!1,this._loadRoomFans()}_toggleEntityVisibility(e){this._fanRoomEntities=this._fanRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLayout(e){this._fanRoomEntities=this._fanRoomEntities.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_onLocalDragStart(e){this._dragIdx=e,this._dragContext="fans"}_onLocalDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onLocalDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"fans"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._fanRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._fanRoomEntities=i,this._dragIdx=null,this._dropIdx=null}connectedCallback(){super.connectedCallback(),!this._fanRoom&&this.rooms.length>0&&(this._fanRoom=this.rooms[0].areaId,this._loadRoomFans())}renderPreview(){const e=this._fanRoomEntities.filter(e=>e.visible),t=0===e.length&&!this._fanRoom?[{name:"Ventilateur Salon",isOn:!0,pct:67,step:2,total:3,icon:"mdi:fan",layout:"compact"},{name:"Plafonnier Chambre",isOn:!0,pct:50,step:3,total:6,icon:"mdi:ceiling-fan",layout:"compact"},{name:"Extracteur SdB",isOn:!1,pct:0,step:0,total:3,icon:"mdi:fan",layout:"compact"}]:e.map(e=>{const t=this.hass?.states[e.entityId],i="on"===t?.state,a=t?.attributes?.percentage??0,r=t?.attributes?.percentage_step,s=t?.attributes?.speed_count,o=s??(r&&r>0?Math.round(100/r):3),n=i?Math.round(a/100*o):0;return{name:e.name,isOn:i,pct:a,step:n,total:o,icon:"mdi:fan",layout:e.layout}}),i=t.filter(e=>e.isOn).length,a="rgba(129,140,248,";return K`
      <div class="preview-fan">
        ${this._fanShowHeader?K`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${De("fan.title")}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:var(--radius-sm);background:${i>0?`${a}0.15)`:"var(--s2)"};color:${i>0?"#818cf8":"var(--t3)"};">${i}/${t.length}</span>
            </div>
            <div style="width:28px;height:14px;border-radius:var(--radius-sm);background:${i>0?`${a}0.25)`:"var(--s2)"};position:relative;">
              <div style="width:10px;height:10px;border-radius:50%;background:${i>0?"#818cf8":"var(--t4)"};position:absolute;top:2px;${i>0?"right:2px;":"left:2px;"}transition:all var(--t-fast);"></div>
            </div>
          </div>
        `:W}
        <div class="preview-fan-card glass" style="padding:8px 10px;display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;">
          <!-- Tint -->
          <div style="grid-column:1/-1;position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#818cf8,transparent 70%);opacity:${t.length>0?(i/t.length*.18).toFixed(3):"0"};"></div>
          ${0===t.length?K`
            <div style="grid-column:1/-1;padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
          `:W}
          ${function(e,t){const i=[];let a=0;for(;a<e.length;){const r=e[a];if("compact"===r.layout){const s=a+1<e.length&&"compact"===e[a+1].layout?e[a+1]:null;s?(i.push(st(r,t,!0,!1)),i.push(st(s,t,!0,!0)),a+=2):(i.push(st(r,t,!1,!1)),a++)}else i.push(st(r,t,!1,!1)),a++}return i}(t,a)}
        </div>
      </div>
    `}renderTab(){if(this._lang,!this.hass)return K``;const e=this.rooms.find(e=>e.areaId===this._fanRoom);return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-fan">
        <div class="section-label">${De("config.behavior")}</div>
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
              <div class="feature-name">${De("config.fan_show_header")}</div>
              <div class="feature-desc">${De("config.fan_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._fanShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <!-- Per-room fan config -->
        <div class="section-label">${De("config.fan_room")}</div>
        <div class="section-desc">${De("config.fan_room_desc")}</div>

        <!-- Room selector dropdown -->
        <div class="dropdown ${this._fanRoomDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._fanRoomDropdownOpen=!this._fanRoomDropdownOpen}}
            aria-expanded=${this._fanRoomDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||De("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this.rooms.map(e=>K`
              <button
                class="dropdown-item ${e.areaId===this._fanRoom?"active":""}"
                role="option"
                aria-selected=${e.areaId===this._fanRoom?"true":"false"}
                @click=${()=>this._selectRoom(e.areaId)}
              >
                <ha-icon .icon=${e.icon}></ha-icon>
                ${e.name}
              </button>
            `)}
          </div>
        </div>

        ${this._fanRoom?K`
          ${this._fanRoomEntities.length>0?K`
            <div class="section-label">${De("config.fan_list_title")} (${this._fanRoomEntities.length})</div>
            <div class="section-desc">${De("config.fan_list_banner")}</div>
            <div class="item-list">
              ${this._fanRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"fans"===this._dragContext,a=this._dropIdx===t&&"fans"===this._dragContext,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return K`
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
                      aria-label="${De("config.light_change_layout_aria")}"
                      title="${De("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
                    >
                      ${De("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
                    </button>
                    <button
                      class="toggle ${e.visible?"on":""}"
                      @click=${()=>this._toggleEntityVisibility(e.entityId)}
                      role="switch"
                      aria-checked=${e.visible?"true":"false"}
                      aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.name}"
                    ></button>
                  </div>
                `})}
            </div>
          `:K`
            <div class="banner">
              <ha-icon .icon=${"mdi:fan-off"}></ha-icon>
              <span>${De("config.fan_no_fans")}</span>
            </div>
          `}
        `:W}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}rt([_e()],ot.prototype,"_fanShowHeader"),rt([_e()],ot.prototype,"_fanRoom"),rt([_e()],ot.prototype,"_fanRoomDropdownOpen"),rt([_e()],ot.prototype,"_fanRoomEntities"),rt([_e()],ot.prototype,"_dragIdx"),rt([_e()],ot.prototype,"_dropIdx"),rt([_e()],ot.prototype,"_dragContext");try{customElements.define("config-tab-fan",ot)}catch{}const nt=["light","media_player","climate","fan","cover","camera","vacuum"],ct=new Set(["light","media_player","climate","cover","fan","camera"]),dt={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum"},lt={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},camera:{name:"config.domain_camera",desc:"config.domain_camera_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};const ht=["mdi:sofa","mdi:stove","mdi:bed","mdi:desk","mdi:shower","mdi:home","mdi:movie-open","mdi:music","mdi:wrench","mdi:flower","mdi:white-balance-sunny","mdi:weather-night","mdi:lightbulb","mdi:snowflake","mdi:fire","mdi:lock"];var pt=Object.defineProperty,_t=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&pt(t,i,s),s};class mt extends Ve{constructor(){super(...arguments),this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._showMedia=!0,this._autoSort=!0,this._tempHigh=24,this._tempLow=17,this._humidityThreshold=65,this._iconPickerRoom=null,this._localDragIdx=null,this._localDropIdx=null,this._initialIcons=new Map}static{this._AUTO_SAVE_KEYS=new Set(["_showLights","_showTemperature","_showHumidity","_showMedia","_autoSort","_tempHigh","_tempLow","_humidityThreshold"])}updated(e){if(super.updated(e),this._checkAutoSave(e),e.has("rooms")&&this.rooms.length>0&&0===this._initialIcons.size)for(const t of this.rooms)this._initialIcons.set(t.areaId,t.icon)}loadFromConfig(e){const t=e;this._showLights=t.show_lights??!0,this._showTemperature=t.show_temperature??!0,this._showHumidity=t.show_humidity??!0,this._showMedia=t.show_media??!0,this._autoSort=t.auto_sort??!0,this._tempHigh=t.temp_high??24,this._tempLow=t.temp_low??17,this._humidityThreshold=t.humidity_threshold??65}collectSaveData(){return{room_order:this.rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:this.rooms.filter(e=>!e.visible).map(e=>e.areaId),show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity,show_media:this._showMedia,auto_sort:this._autoSort,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold}}async save(){if(this.backend)try{await this.backend.send("set_navbar",this.collectSaveData());const e=this.backend,t=this.rooms.filter(e=>e.icon!==this._initialIcons.get(e.areaId)).map(t=>{const i=this.hass,a=i?.areas[t.areaId],r=a?.icon||"mdi:home",s=t.icon===r?null:t.icon;return e.send("set_room",{area_id:t.areaId,icon:s})});t.length>0&&await Promise.all(t),this._fireToast(!0),me.emit("navbar-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.navbar&&this.loadFromConfig(e.navbar)}catch{}}_toggleRoomVisible(e){const t=this.rooms.map(t=>t.areaId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),a=t.filter(e=>!e.visible);this._updateRooms([...i,...a])}_openIconPicker(e){this._iconPickerRoom=this._iconPickerRoom===e?null:e}_setRoomIcon(e,t){this._updateRooms(this.rooms.map(i=>i.areaId===e?{...i,icon:t}:i)),this._iconPickerRoom=null}_updateRooms(e){this.dispatchEvent(new CustomEvent("rooms-changed",{bubbles:!0,composed:!0,detail:{rooms:e}})),this._fireDirty()}_onLocalDragStart(e){this._localDragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),null!==this._localDragIdx&&this._localDragIdx!==e&&(this._localDropIdx=e)}_onLocalDragLeave(){this._localDropIdx=null}_onLocalDrop(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this.rooms],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._updateRooms(i),this._localDragIdx=null,this._localDropIdx=null}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_renderRoomRow(e,t){const i=this._localDragIdx===t,a=this._localDropIdx===t,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return K`
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
        <button
          class="room-icon-btn"
          @click=${()=>this._openIconPicker(e.areaId)}
          aria-label="${De("config.navbar_change_icon_aria",{name:e.name})}"
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
        <div class="item-info">
          <span class="item-name">${e.name}</span>
          <span class="item-meta">${e.entityCount} ${De("common.entities")}</span>
        </div>
        <button
          class="toggle ${e.visible?"on":""}"
          @click=${()=>this._toggleRoomVisible(e.areaId)}
          role="switch"
          aria-checked=${e.visible?"true":"false"}
          aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.name}"
        ></button>
      </div>
    `}renderPreview(){const e=[...this.rooms.filter(e=>e.visible)];return this._autoSort&&e.sort((e,t)=>(e.lightsOn>0?0:1)-(t.lightsOn>0?0:1)),K`
      <div class="preview-navbar">
        ${e.map((e,t)=>{const i=this._showLights&&e.lightsOn>0,a=this._showHumidity&&null!==e.humidityValue&&e.humidityValue>=this._humidityThreshold,r=this._showMedia&&e.mediaPlaying,s=this._showTemperature&&null!==e.tempValue&&e.tempValue>=this._tempHigh,o=this._showTemperature&&null!==e.tempValue&&!s&&e.tempValue<=this._tempLow,n=["preview-nav-item",0===t?"active-preview":"",i?"has-light":"",a?"has-humidity":"",r?"has-music":"",s?"has-temp-hot":"",o?"has-temp-cold":""].filter(Boolean).join(" ");return K`
            <div class=${n}>
              ${s||o?K`
                <span class="preview-temp-badge">
                  <ha-icon .icon=${s?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
                </span>
              `:W}
              <ha-icon .icon=${e.icon}></ha-icon>
              <div class="preview-nav-label"><span>${e.name}</span></div>
            </div>
          `})}
      </div>
    `}renderTab(){return this._lang,K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-navbar">

        ${this.emptyRooms.length>0?K`
          <div class="section-label">${De("config.navbar_empty_rooms")}</div>
          <div class="section-desc">
            ${De("config.navbar_empty_rooms_desc")}
          </div>
          <div class="item-list empty-rooms">
            ${this.emptyRooms.map(e=>K`
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
        `:W}

        <div class="section-label">${De("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._autoSort?"true":"false"}
            @click=${()=>{this._autoSort=!this._autoSort}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${De("config.navbar_auto_sort")}</div>
              <div class="feature-desc">${De("config.navbar_auto_sort_desc")}</div>
            </div>
            <span
              class="toggle ${this._autoSort?"on":""}"
            ></span>
          </button>
        </div>

        <div class="banner">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>${De("config.navbar_rooms_banner")}</span>
        </div>
        <div class="section-label">${De("config.navbar_visible_rooms")}</div>
        <div class="item-list">
          ${this.rooms.map((e,t)=>this._renderRoomRow(e,t))}
        </div>

        <div class="icon-picker-fold ${this._iconPickerRoom?"open":""}">
          <div class="icon-picker-inner">
            <div class="section-label">
              ${De("config.navbar_icon_label",{name:this.rooms.find(e=>e.areaId===this._iconPickerRoom)?.name||""})}
            </div>
            <div class="icon-picker-grid">
              ${ht.map(e=>K`
                  <button
                    class="icon-pick ${this.rooms.find(e=>e.areaId===this._iconPickerRoom)?.icon===e?"selected":""}"
                    @click=${()=>this._iconPickerRoom&&this._setRoomIcon(this._iconPickerRoom,e)}
                    aria-label="${De("config.navbar_choose_icon")}"
                  >
                    <ha-icon .icon=${e}></ha-icon>
                  </button>
                `)}
            </div>
          </div>
        </div>

        <div class="section-label">${De("config.navbar_indicators")}</div>
        <div class="section-desc">${De("config.navbar_indicators_desc")}</div>
        <div class="feature-list">
          ${[{key:"lights",icon:"mdi:lightbulb",nameKey:"config.navbar_ind_lights",descKey:"config.navbar_ind_lights_desc"},{key:"temperature",icon:"mdi:thermometer",nameKey:"config.navbar_ind_temp",descKey:"config.navbar_ind_temp_desc"},{key:"humidity",icon:"mdi:water-percent",nameKey:"config.navbar_ind_humidity",descKey:"config.navbar_ind_humidity_desc"},{key:"media",icon:"mdi:music",nameKey:"config.navbar_ind_media",descKey:"config.navbar_ind_media_desc"}].map(e=>{const t={lights:this._showLights,temperature:this._showTemperature,humidity:this._showHumidity,media:this._showMedia}[e.key];return K`
              <button
                class="feature-row"
                role="switch"
                aria-checked=${t?"true":"false"}
                @click=${()=>{"lights"===e.key?this._showLights=!this._showLights:"temperature"===e.key?this._showTemperature=!this._showTemperature:"humidity"===e.key?this._showHumidity=!this._showHumidity:this._showMedia=!this._showMedia}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${De(e.nameKey)}</div>
                  <div class="feature-desc">${De(e.descKey)}</div>
                </div>
                <span
                  class="toggle ${t?"on":""}"
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
              .value=${String(this._tempHigh)}
              @change=${e=>{const t=parseFloat(e.target.value);this._tempHigh=isNaN(t)?24:t}}
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
              .value=${String(this._tempLow)}
              @change=${e=>{const t=parseFloat(e.target.value);this._tempLow=isNaN(t)?17:t}}
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
              .value=${String(this._humidityThreshold)}
              @change=${e=>{const t=parseFloat(e.target.value);this._humidityThreshold=isNaN(t)?65:t}}
              aria-label="${De("config.navbar_humidity_threshold")}"
            />
            <span class="threshold-unit">%</span>
          </div>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}_t([_e()],mt.prototype,"_showLights"),_t([_e()],mt.prototype,"_showTemperature"),_t([_e()],mt.prototype,"_showHumidity"),_t([_e()],mt.prototype,"_showMedia"),_t([_e()],mt.prototype,"_autoSort"),_t([_e()],mt.prototype,"_tempHigh"),_t([_e()],mt.prototype,"_tempLow"),_t([_e()],mt.prototype,"_humidityThreshold"),_t([_e()],mt.prototype,"_iconPickerRoom"),_t([_e()],mt.prototype,"_localDragIdx"),_t([_e()],mt.prototype,"_localDropIdx");try{customElements.define("config-tab-navbar",mt)}catch{}var ut=Object.defineProperty,gt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ut(t,i,s),s};class vt extends Ve{constructor(){super(...arguments),this._cards=[],this._scenes=[],this._popupDropdownOpen=!1,this._selectedRoom="",this._popupRoomSearch="",this._localDragIdx=null,this._localDropIdx=null,this._localDragContext=null,this._saving=!1,this._mounted=!1}static{this._AUTO_SAVE_KEYS=new Set(["_cards","_scenes"])}connectedCallback(){super.connectedCallback(),this._mounted=!0}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1}updated(e){super.updated(e),e.has("rooms")&&this.rooms.length>0&&!this._selectedRoom&&(this._selectedRoom=this.rooms[0].areaId,this._loadRoomCards()),this._checkAutoSave(e)}loadFromConfig(e){}collectSaveData(){return{area_id:this._selectedRoom,card_order:this._cards.filter(e=>e.visible).map(e=>e.id),hidden_scenes:this._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:this._scenes.map(e=>e.entityId)}}async save(){if(this.backend&&!this._saving&&this._selectedRoom){this._saving=!0;try{if(await this.backend.send("set_room",this.collectSaveData()),!this._mounted)return;this._fireToast(!0),me.emit("room-config-changed",{areaId:this._selectedRoom})}catch{this._fireToast(!1)}finally{this._saving=!1}}}async reload(){await this._loadRoomCards()}_selectRoom(e){this._selectedRoom=e,this._popupDropdownOpen=!1,this._popupRoomSearch="",this._loadRoomCards()}async _loadRoomCards(){if(!this.hass||!this._selectedRoom)return this._cards=[],void(this._scenes=[]);const e=this._selectedRoom,t=Me(e,this.hass.entities,this.hass.devices);let i=null,a=new Set,r=new Set,s=[];try{if(!this.backend)throw new Error("No backend");const t=await this.backend.send("get_room",{area_id:e});if(this._selectedRoom!==e)return;t&&(i=t.card_order.length>0?t.card_order:null,a=new Set(t.hidden_entities),r=new Set(t.hidden_scenes??[]),s=t.scene_order??[])}catch{}const o=this.hass,n=t.filter(e=>e.entity_id.startsWith("scene.")),c=new Map;s.forEach((e,t)=>c.set(e,t));const d=n.map(e=>{const t=o.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!r.has(e.entity_id)}});d.sort((e,t)=>{const i=c.get(e.entityId),a=c.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._scenes=d;const l=new Map;for(const _ of t){if(a.has(_.entity_id))continue;const e=_.entity_id.split(".")[0];l.set(e,(l.get(e)||0)+1)}const h=i?[...i]:[...nt],p=new Set(h);for(const _ of l.keys())!p.has(_)&&dt[_]&&h.push(_);this._cards=h.filter(e=>(l.get(e)||0)>0&&ct.has(e)).map(e=>{const t=function(e){const t=lt[e];return{nameKey:t?t.name:null,icon:dt[e]||"mdi:help-circle",descKey:t?t.desc:null}}(e),a=l.get(e)||0;return{id:e,nameKey:t.nameKey,icon:t.icon,descKey:t.descKey,count:a,visible:i?i.includes(e):a>0}})}_toggleCardVisible(e){this._cards=this._cards.map(t=>t.id===e?{...t,visible:!t.visible}:t)}_toggleSceneVisible(e){this._scenes=this._scenes.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_onLocalDragStart(e,t){this._localDragIdx=e,this._localDragContext=t}_onLocalDragOver(e,t){t.preventDefault(),null!==this._localDragIdx&&this._localDragIdx!==e&&(this._localDropIdx=e)}_onLocalDragLeave(){this._localDropIdx=null}_onLocalDrop(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return this._localDragIdx=null,void(this._localDropIdx=null);if("cards"===this._localDragContext){const t=[...this._cards],[i]=t.splice(this._localDragIdx,1);t.splice(e,0,i),this._cards=t}else if("scenes"===this._localDragContext){const t=[...this._scenes],[i]=t.splice(this._localDragIdx,1);t.splice(e,0,i),this._scenes=t}this._localDragIdx=null,this._localDropIdx=null}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null,this._localDragContext=null}_renderCardRow(e,t){const i=this._localDragIdx===t&&"cards"===this._localDragContext,a=this._localDropIdx===t&&"cards"===this._localDragContext,r=["item-row card-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return K`
      <div
        class=${r}
        draggable="true"
        @dragstart=${()=>this._onLocalDragStart(t,"cards")}
        @dragover=${e=>this._onLocalDragOver(t,e)}
        @dragleave=${()=>this._onLocalDragLeave()}
        @drop=${e=>this._onLocalDrop(t,e)}
        @dragend=${()=>this._onLocalDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <div class="card-icon-box">
          <ha-icon .icon=${e.icon}></ha-icon>
        </div>
        <div class="item-info">
          <span class="item-name">${e.nameKey?De(e.nameKey):e.id}</span>
          <span class="item-meta">${e.descKey?De(e.descKey):""}</span>
        </div>
        <span class="card-count">${e.count}</span>
        <button
          class="toggle ${e.visible?"on":""}"
          @click=${()=>this._toggleCardVisible(e.id)}
          role="switch"
          aria-checked=${e.visible?"true":"false"}
          aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.nameKey?De(e.nameKey):e.id}"
        ></button>
      </div>
    `}_renderSceneRow(e,t){const i=this._localDragIdx===t&&"scenes"===this._localDragContext,a=this._localDropIdx===t&&"scenes"===this._localDragContext,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return K`
      <div
        class=${r}
        draggable="true"
        @dragstart=${()=>this._onLocalDragStart(t,"scenes")}
        @dragover=${e=>this._onLocalDragOver(t,e)}
        @dragleave=${()=>this._onLocalDragLeave()}
        @drop=${e=>this._onLocalDrop(t,e)}
        @dragend=${()=>this._onLocalDragEnd()}
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
          aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.name}"
        ></button>
      </div>
    `}renderPreview(){const e=this.rooms.find(e=>e.areaId===this._selectedRoom);if(!e)return K`<div class="preview-empty">${De("config.popup_select_room")}</div>`;const t=this._scenes.length>0,i=this._scenes.filter(e=>e.visible),a=["preview-popup-icon-box",e.lightsOn>0?"has-light":"",e.mediaPlaying?"has-music":""].filter(Boolean).join(" ");return K`
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
              ${e.temperature?K`<span>${e.temperature}</span>`:W}
              ${e.humidity?K`<span>${e.humidity}</span>`:W}
            </div>
          </div>
          <div class="preview-popup-close">
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </div>
        </div>

        ${i.length>0?K`
          <div class="preview-popup-scenes">
            ${i.map(e=>K`
                <span class="preview-scene-chip">${e.name}</span>
              `)}
          </div>
        `:W}

        <div class="preview-popup-cards">
          ${this._cards.filter(e=>e.visible).map(e=>K`
              <div class="preview-card-slot">
                <ha-icon .icon=${e.icon}></ha-icon>
                <span class="preview-card-slot-name">${e.nameKey?De(e.nameKey):e.id}</span>
                <span class="preview-card-slot-count">${e.count}</span>
              </div>
            `)}
        </div>
      </div>
    `}renderTab(){this._lang;const e=this.rooms.find(e=>e.areaId===this._selectedRoom);return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-popup">
        <div class="section-label">${De("config.popup_room")}</div>
        <div class="section-desc">
          ${De("config.popup_room_desc")}
        </div>
        <div class="dropdown ${this._popupDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._popupDropdownOpen||(this._popupRoomSearch=""),this._popupDropdownOpen=!this._popupDropdownOpen}}
            aria-expanded=${this._popupDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||De("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <input
              class="dropdown-search"
              type="text"
              placeholder=${De("config.search_entity")}
              .value=${this._popupRoomSearch}
              @input=${e=>{this._popupRoomSearch=e.target.value,this.requestUpdate()}}
              @click=${e=>e.stopPropagation()}
            />
            ${this.rooms.filter(e=>!this._popupRoomSearch||e.name.toLowerCase().includes(this._popupRoomSearch.toLowerCase())).map(e=>K`
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

        <div class="section-label">${De("config.popup_internal_cards")}</div>
        <div class="section-desc">
          ${De("config.popup_internal_cards_desc")}
        </div>
        <div class="item-list">
          ${this._cards.map((e,t)=>this._renderCardRow(e,t))}
        </div>

        ${this._scenes.length>0?K`
          <div class="section-label">${De("config.popup_scenes")} (${this._scenes.length})</div>
          <div class="section-desc">
            ${De("config.popup_scenes_desc")}
          </div>
          <div class="item-list">
            ${this._scenes.map((e,t)=>this._renderSceneRow(e,t))}
          </div>
        `:W}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}gt([_e()],vt.prototype,"_cards"),gt([_e()],vt.prototype,"_scenes"),gt([_e()],vt.prototype,"_popupDropdownOpen"),gt([_e()],vt.prototype,"_selectedRoom"),gt([_e()],vt.prototype,"_localDragIdx"),gt([_e()],vt.prototype,"_localDropIdx"),gt([_e()],vt.prototype,"_localDragContext");try{customElements.define("config-tab-popup",vt)}catch{}var ft=Object.defineProperty,bt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&ft(t,i,s),s};class yt extends Ve{constructor(){super(...arguments),this._presenceShowHeader=!0,this._presencePersonEntities=[],this._presenceSmartphoneSensors={},this._presenceNotifyServices={},this._presenceDrivingSensors={},this._presenceDropdownOpen=null,this._presenceDropdownSearch="",this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this)}static{this._AUTO_SAVE_KEYS=new Set(["_presenceShowHeader","_presencePersonEntities","_presenceSmartphoneSensors","_presenceNotifyServices","_presenceDrivingSensors"])}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseDropdowns)}updated(e){super.updated(e),this._checkAutoSave(e)}_closeDropdownsOnOutsideClick(e){if(!this._presenceDropdownOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown");for(const r of a)if(t.includes(r))return;this._presenceDropdownOpen=null}loadFromConfig(e){const t=e;this._presenceShowHeader=t.show_header??!0,this._presencePersonEntities=t.person_entities??[],this._presenceSmartphoneSensors=t.smartphone_sensors??{},this._presenceNotifyServices=t.notify_services??{},this._presenceDrivingSensors=t.driving_sensors??{}}collectSaveData(){return{show_header:this._presenceShowHeader,person_entities:this._presencePersonEntities,smartphone_sensors:this._presenceSmartphoneSensors,notify_services:this._presenceNotifyServices,driving_sensors:this._presenceDrivingSensors}}async save(){if(this.backend)try{await this.backend.send("set_presence_config",this.collectSaveData()),this._fireToast(!0),me.emit("presence-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.presence_card&&this.loadFromConfig(e.presence_card)}catch{}}_getAvailablePersonEntities(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableSmartphoneSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("phone")||e.includes("mobile")||e.includes("smartphone")||e.includes("tablet")||e.includes("iphone")||e.includes("galaxy")||e.includes("pixel")||e.includes("oneplus"))).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableDrivingSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("binary_sensor.")).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableNotifyServices(){if(!this.hass)return[];const e=this.hass.services;return Object.keys(e?.notify??{}).map(e=>`notify.${e}`).sort()}_togglePresencePerson(e){const t=this._getAvailablePersonEntities();if(0===this._presencePersonEntities.length)this._presencePersonEntities=t.map(e=>e.entityId).filter(t=>t!==e);else{const t=new Set(this._presencePersonEntities);if(t.has(e)){if(t.size<=1)return void(this._presencePersonEntities=[]);t.delete(e)}else t.add(e);this._presencePersonEntities=[...t]}}renderPreview(){const e=this._getAvailablePersonEntities(),t=this._presencePersonEntities.length>0?e.filter(e=>this._presencePersonEntities.includes(e.entityId)):e;if(0===t.length)return K`<div class="preview-empty">${De("config.presence_no_persons")}</div>`;const i=t.filter(e=>{const t=this.hass?.states[e.entityId];return"home"===t?.state}).length;return K`
      <div class="preview-presence">
        ${this._presenceShowHeader?K`
          <div class="preview-presence-header">
            <span class="preview-presence-title">${De("presence.title")}</span>
            <span class="preview-presence-pill ${i===t.length?"all-home":0===i?"all-away":"mixed"}">
              ${i}/${t.length}
            </span>
          </div>
        `:W}
        <div class="preview-presence-persons">
          ${t.slice(0,4).map(e=>{const t=this.hass?.states[e.entityId],i="home"===t?.state,a=t?.attributes?.entity_picture;return K`
              <div class="preview-presence-person ${i?"home":"away"}">
                ${a?K`<div class="preview-presence-avatar" style="background-image:url(${a})"></div>`:K`<div class="preview-presence-avatar fallback"><ha-icon .icon=${"mdi:account"}></ha-icon></div>`}
                <span class="preview-presence-name">${e.name}</span>
              </div>
            `})}
        </div>
      </div>
    `}renderTab(){this._lang;const e=this._getAvailablePersonEntities(),t=this._presencePersonEntities.length>0?this._presencePersonEntities:e.map(e=>e.entityId),i=this._getAvailableSmartphoneSensors(),a=this._getAvailableDrivingSensors(),r=this._getAvailableNotifyServices();return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-presence">
        <!-- Behaviour -->
        <div class="section-label">${De("config.behavior")}</div>
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
              <div class="feature-name">${De("config.presence_show_header")}</div>
              <div class="feature-desc">${De("config.presence_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._presenceShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <!-- Person entities -->
        <div class="section-label">${De("config.presence_persons")}</div>
        <div class="section-desc">${De("config.presence_persons_desc")}</div>

        ${0===e.length?K`
          <div class="preview-empty">${De("config.presence_no_persons")}</div>
        `:K`
          <div class="item-list">
            ${e.map(e=>{const t=this._presencePersonEntities.includes(e.entityId),i=0===this._presencePersonEntities.length;return K`
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
        <div class="section-label">${De("config.presence_smartphone")}</div>
        <div class="section-desc">${De("config.presence_smartphone_desc")}</div>

        ${t.map(t=>{const s=e.find(e=>e.entityId===t);if(!s)return W;const o=this._presenceSmartphoneSensors[t]||"",n=this._presenceNotifyServices[t]||"",c=this._presenceDrivingSensors[t]||"",d=i.find(e=>e.entityId===o)?.name,l=a.find(e=>e.entityId===c)?.name,h=`${t}:smartphone`,p=`${t}:notify`,_=`${t}:driving`;return K`
            <div class="presence-mapping-card">
              <div class="presence-mapping-header">
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:account"}></ha-icon>
                </div>
                <span class="item-name">${s.name}</span>
              </div>

              <div class="presence-mapping-field">
                <label class="section-label">${De("config.presence_smartphone")}</label>
                <div class="dropdown ${this._presenceDropdownOpen===h?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===h?null:h}}
                    aria-expanded=${this._presenceDropdownOpen===h?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:cellphone"}></ha-icon>
                    <span>${d||o||De("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${De("config.search_entity")}
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
                      ${De("config.presence_auto_detect")}
                    </button>
                    ${i.filter(e=>!this._presenceDropdownSearch||e.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())||e.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>K`
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
                <label class="section-label">${De("config.presence_notify")}</label>
                <div class="dropdown ${this._presenceDropdownOpen===p?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===p?null:p}}
                    aria-expanded=${this._presenceDropdownOpen===p?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:bell"}></ha-icon>
                    <span>${n||De("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${De("config.search_entity")}
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
                      ${De("config.presence_auto_detect")}
                    </button>
                    ${r.filter(e=>!this._presenceDropdownSearch||e.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>K`
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
                <label class="section-label">${De("config.presence_driving")}</label>
                <div class="dropdown ${this._presenceDropdownOpen===_?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===_?null:_}}
                    aria-expanded=${this._presenceDropdownOpen===_?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:car"}></ha-icon>
                    <span>${l||c||De("config.presence_auto_detect")}</span>
                    <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                  <div class="dropdown-menu" role="listbox">
                    <input
                      class="dropdown-search"
                      type="text"
                      placeholder=${De("config.search_entity")}
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
                      ${De("config.presence_auto_detect")}
                    </button>
                    ${a.filter(e=>!this._presenceDropdownSearch||e.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())||e.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>K`
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
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}bt([_e()],yt.prototype,"_presenceShowHeader"),bt([_e()],yt.prototype,"_presencePersonEntities"),bt([_e()],yt.prototype,"_presenceSmartphoneSensors"),bt([_e()],yt.prototype,"_presenceNotifyServices"),bt([_e()],yt.prototype,"_presenceDrivingSensors"),bt([_e()],yt.prototype,"_presenceDropdownOpen"),bt([_e()],yt.prototype,"_presenceDropdownSearch");try{customElements.define("config-tab-presence",yt)}catch{}var wt=Object.defineProperty,xt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&wt(t,i,s),s};class $t extends Ve{constructor(){super(...arguments),this._spotifyShowHeader=!0,this._spotifyEntity="",this._spotifySortOrder="recent_first",this._spotifyDropdownOpen=!1,this._spotifyMaxItems=6,this._spotifyVisibleSpeakers=[],this._spotifyConfigured=null,this._localDragIdx=null,this._localDropIdx=null,this._localDragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_spotifyShowHeader","_spotifyEntity","_spotifySortOrder","_spotifyMaxItems","_spotifyVisibleSpeakers"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._spotifyShowHeader=t.show_header??!0,this._spotifyEntity=t.entity_id??"",this._spotifySortOrder="oldest_first"===t.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=t.max_items_per_section??6,this._spotifyVisibleSpeakers=t.visible_speakers??[],this._checkSpotifyStatus()}collectSaveData(){return{show_header:this._spotifyShowHeader,...this._spotifyEntity?{entity_id:this._spotifyEntity}:{},sort_order:this._spotifySortOrder,max_items_per_section:this._spotifyMaxItems,visible_speakers:this._spotifyVisibleSpeakers}}async save(){if(this.backend)try{await this.backend.send("set_spotify_config",this.collectSaveData()),this._fireToast(!0),me.emit("spotify-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.spotify_card&&this.loadFromConfig(e.spotify_card)}catch{}}async _checkSpotifyStatus(){if(this.backend)try{const e=await this.backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}_selectEntity(e){this._spotifyEntity=e,this._spotifyDropdownOpen=!1}_toggleSpeaker(e){this._spotifyVisibleSpeakers.includes(e)?this._spotifyVisibleSpeakers=this._spotifyVisibleSpeakers.filter(t=>t!==e):this._spotifyVisibleSpeakers=[...this._spotifyVisibleSpeakers,e]}_onLocalDragStart(e){this._localDragIdx=e,this._localDragContext="speakers"}_onLocalDragOver(e,t){t.preventDefault(),this._localDropIdx=e,this.requestUpdate()}_onLocalDragLeave(){this._localDropIdx=null,this.requestUpdate()}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null,this._localDragContext="",this.requestUpdate()}_onDropSpeaker(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e||"speakers"!==this._localDragContext)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this._spotifyVisibleSpeakers];if(this._localDragIdx>=i.length||e>=i.length)return this._localDragIdx=null,void(this._localDropIdx=null);const[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._spotifyVisibleSpeakers=i,this._localDragIdx=null,this._localDropIdx=null}renderPreview(){if(!1===this._spotifyConfigured)return K`<div class="preview-empty">${De("config.spotify_not_configured")}</div>`;if(!this._spotifyEntity||!this.hass)return K`<div class="preview-empty">${De("config.spotify_select_entity")}</div>`;if(!this.hass.states[this._spotifyEntity])return K`<div class="preview-empty">${De("config.spotify_select_entity")}</div>`;const e=[{id:"all",label:De("spotify.tab_all"),active:!0},{id:"tracks",label:De("spotify.tab_tracks"),active:!1},{id:"playlists",label:De("spotify.tab_playlists"),active:!1},{id:"podcasts",label:De("spotify.tab_podcasts"),active:!1}],t=[{name:"Daily Mix 1",meta:De("spotify.type_playlist"),icon:"mdi:playlist-music"},{name:De("spotify.saved_tracks"),meta:"128 "+De("spotify.tracks_count",{count:""}).trim(),icon:"mdi:heart"},{name:"Discover Weekly",meta:De("spotify.type_playlist"),icon:"mdi:playlist-music"}];return K`
      <div class="preview-spotify-wrap">
        ${this._spotifyShowHeader?K`
          <div class="ps-card-header">
            <ha-icon .icon=${"mdi:spotify"}></ha-icon>
            <span class="ps-card-title">${De("spotify.title")}</span>
          </div>
        `:W}
        <div class="preview-spotify">
          <div class="ps-search">
            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
            <span class="ps-search-text">${De("spotify.search_placeholder")}</span>
          </div>
          <div class="ps-tabs">
            ${e.map(e=>K`
              <span class="ps-tab ${e.active?"active":""}">${e.label}</span>
            `)}
          </div>
          <div class="ps-section-label">${De("spotify.my_playlists")}</div>
          ${t.map(e=>K`
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
    `}_renderSetupGuide(){return K`
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
            ${[1,2,3,4].map(e=>K`
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
    `}renderTab(){if(this._lang,null===this._spotifyConfigured)return K`
        <div class="preview-encart">
          <div class="preview-label">${De("config.preview")}</div>
          <div class="preview-empty">${De("config.spotify_checking")}</div>
        </div>
        <div class="tab-panel" id="panel-spotify">
          <div class="preview-empty">${De("config.spotify_checking")}</div>
        </div>
      `;if(!1===this._spotifyConfigured)return K`
        <div class="preview-encart">
          <div class="preview-label">${De("config.preview")}</div>
          ${this.renderPreview()}
        </div>
        ${this._renderSetupGuide()}
      `;const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort():[],t=e.find(e=>e===this._spotifyEntity);return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-spotify">
        <div class="feature-list">
          <button class="feature-row" role="switch" aria-checked="${this._spotifyShowHeader?"true":"false"}"
            @click=${()=>{this._spotifyShowHeader=!this._spotifyShowHeader}}>
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${De("config.spotify_show_header")}</div>
              <div class="feature-desc">${De("config.spotify_show_header_desc")}</div>
            </div>
            <span class="toggle ${this._spotifyShowHeader?"on":""}"></span>
          </button>
        </div>

        <div class="section-label">${De("config.spotify_entity")}</div>
        <div class="section-desc">${De("config.spotify_entity_desc")}</div>
        <div class="dropdown ${this._spotifyDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._spotifyDropdownOpen=!this._spotifyDropdownOpen}
            aria-expanded=${this._spotifyDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:spotify"} style="color: #1DB954;"></ha-icon>
            <span>${t||De("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>K`
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

        <div class="section-label">${De("config.spotify_sort_order")}</div>
        <div class="section-desc">${De("config.spotify_sort_order_desc")}</div>
        <div class="segmented">
          <button class="seg-btn ${"recent_first"===this._spotifySortOrder?"active":""}"
            @click=${()=>{this._spotifySortOrder="recent_first"}}>
            ${De("config.spotify_sort_recent")}
          </button>
          <button class="seg-btn ${"oldest_first"===this._spotifySortOrder?"active":""}"
            @click=${()=>{this._spotifySortOrder="oldest_first"}}>
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
            .value=${String(this._spotifyMaxItems)}
            @input=${e=>{this._spotifyMaxItems=parseInt(e.target.value,10)}}
          />
          <span class="range-value">${this._spotifyMaxItems}</span>
        </div>

        <div class="section-label">${De("config.spotify_speakers")}</div>
        <div class="section-desc">${De("config.spotify_speakers_desc")}</div>
        ${this._renderSpeakerList()}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}_renderSpeakerList(){const e=this.hass?Object.entries(this.hass.states).filter(([e])=>e.startsWith("media_player.")).map(([e,t])=>({entityId:e,name:t.attributes.friendly_name??e,visible:this._spotifyVisibleSpeakers.includes(e)})):[],t=[...this._spotifyVisibleSpeakers.map(t=>e.find(e=>e.entityId===t)).filter(e=>!!e),...e.filter(e=>!e.visible).sort((e,t)=>e.name.localeCompare(t.name))];return K`
      <div class="item-list">
        ${t.map(e=>{const t=e.visible,i=t?this._spotifyVisibleSpeakers.indexOf(e.entityId):-1,a=this._localDragIdx===i&&-1!==i&&"speakers"===this._localDragContext,r=this._localDropIdx===i&&-1!==i&&"speakers"===this._localDragContext,s=["item-row",t?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return K`
            <div
              class=${s}
              draggable=${t?"true":"false"}
              @dragstart=${()=>{t&&-1!==i&&this._onLocalDragStart(i)}}
              @dragover=${e=>{t&&-1!==i&&this._onLocalDragOver(i,e)}}
              @dragleave=${()=>this._onLocalDragLeave()}
              @drop=${e=>{t&&-1!==i&&this._onDropSpeaker(i,e)}}
              @dragend=${()=>this._onLocalDragEnd()}
            >
              ${t?K`
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
              `:K`<span style="width:24px;"></span>`}
              <div class="item-info">
                <span class="item-name">${e.name}</span>
                <span class="item-meta">${e.entityId}</span>
              </div>
              <button
                class="toggle ${t?"on":""}"
                @click=${()=>this._toggleSpeaker(e.entityId)}
                role="switch"
                aria-checked=${t?"true":"false"}
                aria-label="${De(t?"common.hide":"common.show")} ${e.name}"
              ></button>
            </div>
          `})}
      </div>
    `}}xt([_e()],$t.prototype,"_spotifyShowHeader"),xt([_e()],$t.prototype,"_spotifyEntity"),xt([_e()],$t.prototype,"_spotifySortOrder"),xt([_e()],$t.prototype,"_spotifyDropdownOpen"),xt([_e()],$t.prototype,"_spotifyMaxItems"),xt([_e()],$t.prototype,"_spotifyVisibleSpeakers"),xt([_e()],$t.prototype,"_spotifyConfigured");try{customElements.define("config-tab-spotify",$t)}catch{}var kt=Object.defineProperty,St=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&kt(t,i,s),s};const Et=[{key:"input_select",i18nKey:"config.title_source_input_select",icon:"mdi:form-select"},{key:"scenes",i18nKey:"config.title_source_scenes",icon:"mdi:palette"},{key:"booleans",i18nKey:"config.title_source_booleans",icon:"mdi:toggle-switch"}],Dt=["neutral","success","warning","info","accent","alert"],Ct={success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t4)"},It=e=>Ct[e]??(e.startsWith("#")?e:"var(--t4)"),Pt={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},At={icon:"mdi:clock-outline",color:"var(--t3)"};class zt extends Ve{constructor(){super(...arguments),this._titleText="",this._titleSources=[],this._titlePeriodEntity="",this._titlePeriodOptions=[],this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._titlePeriodDropdownOpen=!1,this._periodIconPopupIdx=null,this._iconPopupModeIdx=null,this._iconSearch="",this._titleAddEntitySearch="",this._titlePeriodSearch="",this._iconList=[],this._iconLoading=!1,this._portalEl=null,this._dragIdx=null,this._dropIdx=null,this._dragContext="",this._dragModeSrcIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_titleText","_titleSources","_titlePeriodEntity","_titlePeriodOptions"])}get _titleModes(){return this._titleSources.flatMap(e=>e.modes)}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._titleText=t.title??"",this._titlePeriodEntity=t.period_entity??"",this._titlePeriodOptions=(t.period_options??[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||""})),this._titleSources=(t.sources??[]).map(e=>({source_type:e.source_type||"",entity:e.entity||"",label:e.label||"",modes:(e.modes||[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"}))}))}collectSaveData(){return{title:this._titleText,period_entity:this._titlePeriodEntity,period_options:this._titlePeriodOptions,sources:this._titleSources.map(e=>({source_type:e.source_type,entity:e.entity||"",label:e.label||"",modes:e.modes}))}}async save(){if(this.backend)try{await this.backend.send("set_title_config",this.collectSaveData()),this._fireToast(!0),me.emit("title-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend){this._iconPopupModeIdx=null,this._periodIconPopupIdx=null,this._removeIconPortal(),this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1;try{const e=await this.backend.send("get_config");e?.title_card&&this.loadFromConfig(e.title_card)}catch{}}}_localDragStart(e,t,i){this._dragIdx=e,this._dragContext=t,"title_modes"===t&&(this._dragModeSrcIdx=i??null)}_localDragOver(e,t,i){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&("title_modes"===this._dragContext&&void 0!==i&&i!==this._dragModeSrcIdx||(this._dropIdx=e))}_localDragLeave(){this._dropIdx=null}_localDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("title_sources"===i){const t=[...this._titleSources],[i]=t.splice(this._dragIdx,1);if(t.splice(e,0,i),this._titleSources=t,this._titleEditingSourceIdx===this._dragIdx)this._titleEditingSourceIdx=e;else if(null!==this._titleEditingSourceIdx){const t=this._titleEditingSourceIdx,i=this._dragIdx;i<t&&e>=t?this._titleEditingSourceIdx=t-1:i>t&&e<=t&&(this._titleEditingSourceIdx=t+1)}}else if("title_modes"===i&&null!==this._dragModeSrcIdx){const t=[...this._titleSources],i=t[this._dragModeSrcIdx];if(i){const a=[...i.modes],[r]=a.splice(this._dragIdx,1);a.splice(e,0,r),t[this._dragModeSrcIdx]={...i,modes:a},this._titleSources=t}this._dragModeSrcIdx=null}this._dragIdx=null,this._dropIdx=null}_localDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragModeSrcIdx=null}_addTitleSource(e){this._titleAddSourceDropdownOpen=!1,this._titleSources=[...this._titleSources,{source_type:e,entity:"",label:"",modes:[]}],this._titleEditingSourceIdx=this._titleSources.length-1}_removeTitleSource(e){const t=[...this._titleSources];t.splice(e,1),this._titleSources=t,this._titleEditingSourceIdx===e?this._titleEditingSourceIdx=null:null!==this._titleEditingSourceIdx&&this._titleEditingSourceIdx>e&&this._titleEditingSourceIdx--}_setTitleSourceEntity(e,t){this._titleAddEntityDropdownOpen=!1;const i=[...this._titleSources];if(i[e]){if(i[e]={...i[e],entity:t},t.startsWith("input_select.")&&this.hass){const a=this.hass.states[t];if(a){const t=a.attributes.options??[],r=new Map(i[e].modes.map(e=>[e.id,e]));i[e]={...i[e],modes:t.map(e=>r.get(e)??{id:e,label:e,icon:"",color:"neutral"})}}}else t||(i[e]={...i[e],modes:[]});this._titleSources=i}}_setTitleSourceLabel(e,t){const i=[...this._titleSources];i[e]&&(i[e]={...i[e],label:t},this._titleSources=i)}_addTitleModeEntity(e,t){this._titleAddEntityDropdownOpen=!1;const i=[...this._titleSources];if(!i[e])return;if(i[e].modes.some(e=>e.id===t))return;const a=this.hass?.states[t],r=a?.attributes.friendly_name||t.split(".")[1]||t,s=t.startsWith("scene.")?"mdi:palette":"mdi:toggle-switch",o=t.startsWith("scene.")?"accent":"success";i[e]={...i[e],modes:[...i[e].modes,{id:t,label:r,icon:s,color:o}]},this._titleSources=i}_removeTitleModeEntity(e,t){const i=[...this._titleSources];i[e]&&(i[e]={...i[e],modes:i[e].modes.filter(e=>e.id!==t)},this._titleSources=i)}_updateTitleMode(e,t,i){let a=e;const r=[...this._titleSources];for(let s=0;s<r.length;s++){if(a<r[s].modes.length){const e=[...r[s].modes];return e[a]={...e[a],[t]:i},r[s]={...r[s],modes:e},void(this._titleSources=r)}a-=r[s].modes.length}}_setTitlePeriodEntity(e){if(this._titlePeriodDropdownOpen=!1,this._titlePeriodEntity=e,e&&this.hass){const t=this.hass.states[e];if(t){const e=t.attributes.options??[],i=new Map(this._titlePeriodOptions.map(e=>[e.id,e]));this._titlePeriodOptions=e.map(e=>i.get(e)??{id:e,label:e,icon:"",color:""})}}else e||(this._titlePeriodOptions=[])}_updateTitlePeriodOption(e,t,i){const a=[...this._titlePeriodOptions];a[e]&&(a[e]={...a[e],[t]:i},this._titlePeriodOptions=a)}async _openIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),e<this._titleModes.length&&(this._iconSearch="",this._iconPopupModeIdx=e,this._showIconPortal()))}async _openPeriodIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),e<this._titlePeriodOptions.length&&(this._iconSearch="",this._periodIconPopupIdx=e,this._showIconPortal()))}async _loadIconList(){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim(),t=this._iconList;return e?t.filter(t=>t.toLowerCase().includes(e)).slice(0,120):t.slice(0,120)}_showIconPortal(){const e=null!==this._iconPopupModeIdx,t=null!==this._periodIconPopupIdx;if(!e&&!t)return void this._removeIconPortal();const i=this._getFilteredIcons(),a=this._iconPopupModeIdx,r=this._periodIconPopupIdx,s=e&&null!==a?this._titleModes[a]?.icon??"":null!==r?this._titlePeriodOptions[r]?.icon??"":"";this._portalEl||(this._portalEl=document.createElement("div"),document.body.appendChild(this._portalEl));const o=()=>{this._iconPopupModeIdx=null,this._periodIconPopupIdx=null,this._removeIconPortal()},n=i=>{e&&null!=this._iconPopupModeIdx?this._updateTitleMode(this._iconPopupModeIdx,"icon",i):t&&null!=this._periodIconPopupIdx&&this._updateTitlePeriodOption(this._periodIconPopupIdx,"icon",i),this._removeIconPortal()},c=e=>{this._iconSearch=e,this._showIconPortal()};this._portalEl.replaceChildren(),Object.assign(this._portalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}),this._portalEl.addEventListener("click",e=>{e.target===this._portalEl&&o()},{once:!0});const d=document.createElement("div");Object.assign(d.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const l=document.createElement("div");Object.assign(l.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const h=document.createElement("span");Object.assign(h.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),h.textContent=De("config.title_mode_icon");const p=document.createElement("input");Object.assign(p.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),p.placeholder="mdi:...",p.value=this._iconSearch,p.addEventListener("input",()=>c(p.value)),l.appendChild(h),l.appendChild(p),d.appendChild(l);const _=document.createElement("div");Object.assign(_.style,{overflow:"auto",flex:"1",padding:"0.5rem"});const m=document.createElement("div");Object.assign(m.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const u=this._createIconBtn("mdi:cancel",""===s,.4);u.addEventListener("click",()=>n("")),m.appendChild(u);for(const g of i){const e=this._createIconBtn(g,g===s,1);e.addEventListener("click",()=>n(g)),m.appendChild(e)}if(0===i.length&&this._iconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=De("config.title_no_icons_found"),m.appendChild(e)}_.appendChild(m),d.appendChild(_),this._portalEl.appendChild(d),p.focus()}_createIconBtn(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",border:t?"2px solid rgba(129,140,248,0.6)":"1px solid rgba(255,255,255,0.06)",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)",cursor:"pointer",color:"rgba(255,255,255,0.88)",padding:"0"});const r=document.createElement("ha-icon");return r.icon=e,r.style.cssText=`--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${i};`,a.appendChild(r),a}_removeIconPortal(){this._portalEl&&(this._portalEl.remove(),this._portalEl=null)}disconnectedCallback(){super.disconnectedCallback(),this._removeIconPortal()}_renderSourceEditor(e,t){const i=this._titleEditingSourceIdx===t,a=Et.find(t=>t.key===e.source_type),r=e.label||(a?De(a.i18nKey):"")||e.source_type,s=this._dragIdx===t&&"title_sources"===this._dragContext,o=this._dropIdx===t&&"title_sources"===this._dragContext;return K`
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
          <div style="flex:1"></div>
          <button
            class="btn-icon xs"
            @click=${()=>{this._titleEditingSourceIdx=i?null:t,this._titleAddEntityDropdownOpen=!1}}
            aria-label=${De(i?"common.collapse":"common.expand")}
          >
            <ha-icon .icon=${i?"mdi:pencil":"mdi:pencil-outline"}></ha-icon>
          </button>
          <button
            class="btn-icon xs"
            @click=${()=>this._removeTitleSource(t)}
            aria-label=${De("config.title_remove_source")}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        </div>

        ${i?K`
          <div class="title-source-body">
            <!-- Label -->
            <div class="title-source-field">
              <span class="title-source-field-label">${De("config.title_source_label")}</span>
              <input
                class="input"
                type="text"
                .value=${e.label}
                placeholder=${a?De(a.i18nKey):""}
                @input=${e=>this._setTitleSourceLabel(t,e.target.value)}
              />
            </div>

            ${"input_select"===e.source_type?this._renderInputSelectEntityPicker(e,t):W}

            <!-- Mode list -->
            ${e.modes.length>0?K`
              <div class="section-label" style="margin-top:10px;">${De("config.title_modes")}</div>
              <div class="title-modes-list">
                ${e.modes.map((i,a)=>this._renderModeRow(e,t,i,a))}
              </div>
            `:W}

            ${"scenes"===e.source_type||"booleans"===e.source_type?this._renderEntityAdder(e,t):W}
          </div>
        `:W}
      </div>
    `}_renderInputSelectEntityPicker(e,t){const i=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")).sort():[];return K`
      <div class="title-source-field">
        <span class="title-source-field-label">${De("config.title_mode_entity")}</span>
        <div class="dropdown ${this._titleEditingSourceIdx===t&&this._titleAddEntityDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._titleAddEntityDropdownOpen||(this._titleAddEntitySearch=""),this._titleAddEntityDropdownOpen=!this._titleAddEntityDropdownOpen}}
            aria-expanded=${this._titleAddEntityDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e.entity?"mdi:form-select":"mdi:help-circle-outline"}></ha-icon>
            <span>${e.entity||De("config.title_select_entity")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <input
              class="dropdown-search"
              type="text"
              placeholder=${De("config.search_entity")}
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
              ${De("title_card.mode_none")}
            </button>
            ${i.filter(e=>!this._titleAddEntitySearch||e.toLowerCase().includes(this._titleAddEntitySearch.toLowerCase())).map(i=>K`
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
    `}_renderEntityAdder(e,t){const i="scenes"===e.source_type?"scene.":"input_boolean.",a="scenes"===e.source_type?"mdi:palette":"mdi:toggle-switch",r=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith(i)).sort():[],s=new Set(e.modes.map(e=>e.id)),o=r.filter(e=>!s.has(e));return K`
      <div class="title-source-field">
        <span class="title-source-field-label">${De("config.title_add_entity")}</span>
        <div class="dropdown ${this._titleEditingSourceIdx===t&&this._titleAddEntityDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._titleAddEntityDropdownOpen||(this._titleAddEntitySearch=""),this._titleAddEntityDropdownOpen=!this._titleAddEntityDropdownOpen}}
            aria-expanded=${this._titleAddEntityDropdownOpen?"true":"false"}
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
              .value=${this._titleAddEntitySearch}
              @input=${e=>{this._titleAddEntitySearch=e.target.value,this.requestUpdate()}}
              @click=${e=>e.stopPropagation()}
            />
            ${o.filter(e=>!this._titleAddEntitySearch||e.toLowerCase().includes(this._titleAddEntitySearch.toLowerCase())).map(e=>K`
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
    `}_renderModeRow(e,t,i,a){let r=0;for(let n=0;n<t;n++)r+=this._titleSources[n].modes.length;r+=a;const s=this._dragIdx===a&&"title_modes"===this._dragContext&&this._dragModeSrcIdx===t,o=this._dropIdx===a&&"title_modes"===this._dragContext&&this._dragModeSrcIdx===t;return K`
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
          ${"scenes"===e.source_type||"booleans"===e.source_type?K`
            <button
              class="btn-icon xs"
              @click=${()=>this._removeTitleModeEntity(t,i.id)}
              aria-label=${De("config.title_remove_entity")}
            >
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          `:W}
        </div>
        <div class="title-mode-fields-row">
          <input
            class="input"
            type="text"
            placeholder=${De("config.title_mode_label")}
            .value=${i.label}
            @input=${e=>this._updateTitleMode(r,"label",e.target.value)}
          />
          <button
            class="title-icon-btn ${i.icon?"has-icon":""}"
            @click=${()=>this._openIconPopup(r)}
            aria-label="${De("config.title_mode_icon")}"
          >
            <ha-icon .icon=${i.icon||"mdi:emoticon-outline"}></ha-icon>
          </button>
        </div>
        <div class="title-color-row">
          <span class="title-color-label">${De("config.title_mode_color")}</span>
          <div class="title-color-chips">
            ${Dt.map(e=>K`
              <button
                class="title-color-chip ${e} ${i.color===e?"active":""}"
                @click=${()=>this._updateTitleMode(r,"color",e)}
                aria-label="${De("config.title_mode_color")}: ${e}"
              ></button>
            `)}
          </div>
        </div>
      </div>
    `}_renderPeriodEntityPicker(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")).sort():[],t=this._titlePeriodEntity;return K`
      <div class="dropdown ${this._titlePeriodDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{this._titlePeriodDropdownOpen||(this._titlePeriodSearch=""),this._titlePeriodDropdownOpen=!this._titlePeriodDropdownOpen}}
          aria-expanded=${this._titlePeriodDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?"mdi:form-select":"mdi:clock-outline"}></ha-icon>
          <span>${t||De("config.title_period_auto")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${De("config.search_entity")}
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
            ${De("config.title_period_auto")}
          </button>
          ${e.filter(e=>!this._titlePeriodSearch||e.toLowerCase().includes(this._titlePeriodSearch.toLowerCase())).map(e=>K`
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
    `}_renderPeriodOptionsEditor(){const e=this._titlePeriodEntity||"",t=this.hass?.states[e],i=t?.attributes?.options??[];if(0===i.length)return W;const a=new Map(this._titlePeriodOptions.map(e=>[e.id,e]));return K`
      <div class="section-label" style="margin-top:12px;">${De("config.title_period_options")}</div>
      <div class="section-desc">${De("config.title_period_options_desc")}</div>
      <div class="title-modes-list">
        ${i.map(e=>{const t=a.get(e),i=this._titlePeriodOptions.findIndex(t=>t.id===e),r=t?.icon||"",s=t?.color||"",o=Pt[e]||At;return-1===i?(this._titlePeriodOptions=[...this._titlePeriodOptions,{id:e,label:e,icon:"",color:""}],W):K`
            <div class="title-mode-row">
              <div class="title-mode-header">
                <ha-icon .icon=${r||o.icon} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;color:${It(s||Pt[e]?.color||"neutral")}"></ha-icon>
                <span class="title-mode-id">${e}</span>
              </div>
              <div class="title-mode-fields-row">
                <button
                  class="title-icon-btn ${r?"has-icon":""}"
                  @click=${()=>this._openPeriodIconPopup(i)}
                  aria-label="${De("config.title_mode_icon")}"
                >
                  <ha-icon .icon=${r||"mdi:emoticon-outline"}></ha-icon>
                </button>
              </div>
              <div class="title-color-row">
                <span class="title-color-label">${De("config.title_mode_color")}</span>
                <div class="title-color-chips">
                  ${Dt.map(e=>K`
                    <button
                      class="title-color-chip ${e} ${s===e?"active":""}"
                      @click=${()=>this._updateTitlePeriodOption(i,"color",e)}
                      aria-label="${De("config.title_mode_color")}: ${e}"
                    ></button>
                  `)}
                </div>
              </div>
            </div>
          `})}
      </div>
    `}renderPreview(){const e=this._titleText;if(!e)return K`<div class="preview-empty">${De("config.title_title_placeholder")}</div>`;const t=[];for(const s of this._titleSources)if("input_select"===s.source_type&&s.entity&&this.hass){const e=this.hass.states[s.entity];if(e){const i=s.modes.find(t=>t.id===e.state);i?.color&&"neutral"!==i.color&&t.push(i.color)}}else if("booleans"===s.source_type&&this.hass)for(const e of s.modes)if("on"===this.hass?.states[e.id]?.state){const i=e.color||"success";"neutral"!==i&&t.push(i)}const i=this._titleSources.length>0&&this._titleSources.some(e=>e.modes.length>0);let a="background:var(--t4);width:1.25rem;";if(t.length>0){const e=t.map(e=>It(e)),i=Math.min(20+4*t.length,36);if(1===e.length)a=`background:${e[0]};width:${i}px;box-shadow:0 0 6px ${e[0]};`;else{const t=e.length;a=`background:linear-gradient(90deg, ${e.flatMap((e,i)=>[`${e} ${Math.round(i/t*100)}%`,`${e} ${Math.round((i+1)/t*100)}%`]).join(", ")});width:${i}px;box-shadow:${e.map(e=>`0 0 6px ${e}`).join(", ")};`}}let r=W;if(this.hass){const e=this._titlePeriodEntity||"",t=this.hass.states[e];if(t){const e=t.state,i=function(e,t){const i=t.find(t=>t.id===e);return i&&(i.icon||i.color)?{icon:i.icon||At.icon,color:i.color||At.color}:Pt[e]||At}(e,this._titlePeriodOptions);r=K`
          <div class="preview-period" style="color:${i.color}">
            <ha-icon .icon=${i.icon} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;margin-right:4px;"></ha-icon>
            ${e}
          </div>
        `}}return K`
      <div class="preview-title-card">
        <div class="preview-title-text">${e}</div>
        ${r}
        ${i?K`
          <div class="preview-title-dash">
            <div class="preview-dash-line" style="${a}"></div>
          </div>
        `:W}
      </div>
    `}renderTab(){this._lang;const e=this._titleSources;return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-title">
        <div class="section-label">${De("config.title_title")}</div>
        <div class="section-desc">${De("config.title_title_desc")}</div>
        <input
          class="input"
          type="text"
          .value=${this._titleText}
          placeholder=${De("config.title_title_placeholder")}
          @input=${e=>{this._titleText=e.target.value}}
        />

        <div class="section-label" style="margin-top:12px;">${De("config.title_mode_source")}</div>
        <div class="section-desc">${De("config.title_mode_source_desc")}</div>

        <!-- Existing sources -->
        ${e.map((e,t)=>this._renderSourceEditor(e,t))}

        <!-- Add source button -->
        <div style="margin-top:8px;">
          <div class="dropdown ${this._titleAddSourceDropdownOpen?"open":""}">
            <button
              class="dropdown-trigger"
              @click=${()=>{this._titleAddSourceDropdownOpen=!this._titleAddSourceDropdownOpen}}
              aria-expanded=${this._titleAddSourceDropdownOpen?"true":"false"}
              aria-haspopup="listbox"
            >
              <ha-icon .icon=${"mdi:plus"}></ha-icon>
              <span>${De("config.title_add_source")}</span>
              <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
            </button>
            <div class="dropdown-menu" role="listbox">
              ${Et.map(e=>K`
                <button
                  class="dropdown-item"
                  role="option"
                  @click=${()=>this._addTitleSource(e.key)}
                >
                  <ha-icon .icon=${e.icon}></ha-icon>
                  ${De(e.i18nKey)}
                </button>
              `)}
            </div>
          </div>
        </div>

        <!-- Period indicator -->
        <div class="section-label" style="margin-top:16px;">${De("config.title_period_entity")}</div>
        <div class="section-desc">${De("config.title_period_entity_desc")}</div>
        ${this._renderPeriodEntityPicker()}

        ${this._renderPeriodOptionsEditor()}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}St([_e()],zt.prototype,"_titleText"),St([_e()],zt.prototype,"_titleSources"),St([_e()],zt.prototype,"_titlePeriodEntity"),St([_e()],zt.prototype,"_titlePeriodOptions"),St([_e()],zt.prototype,"_titleEditingSourceIdx"),St([_e()],zt.prototype,"_titleAddSourceDropdownOpen"),St([_e()],zt.prototype,"_titleAddEntityDropdownOpen"),St([_e()],zt.prototype,"_titlePeriodDropdownOpen"),St([_e()],zt.prototype,"_periodIconPopupIdx"),St([_e()],zt.prototype,"_iconPopupModeIdx"),St([_e()],zt.prototype,"_iconSearch"),St([_e()],zt.prototype,"_dragIdx"),St([_e()],zt.prototype,"_dropIdx"),St([_e()],zt.prototype,"_dragContext"),St([_e()],zt.prototype,"_dragModeSrcIdx");try{customElements.define("config-tab-title",zt)}catch{}var Ot=Object.defineProperty,Rt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ot(t,i,s),s};const Tt=["compass_N","compass_NNE","compass_NE","compass_ENE","compass_E","compass_ESE","compass_SE","compass_SSE","compass_S","compass_SSW","compass_SW","compass_WSW","compass_W","compass_WNW","compass_NW","compass_NNW"];const Mt=[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise"},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset"}];class Lt extends Ve{constructor(){super(...arguments),this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherShowHeader=!0,this._weatherDropdownOpen=!1}static{this._AUTO_SAVE_KEYS=new Set(["_weatherEntity","_weatherHiddenMetrics","_weatherShowDaily","_weatherShowHourly","_weatherShowHeader"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._weatherEntity=t.entity_id??"",this._weatherHiddenMetrics=t.hidden_metrics??[],this._weatherShowDaily=t.show_daily??!0,this._weatherShowHourly=t.show_hourly??!0,this._weatherShowHeader=t.show_header??!0}collectSaveData(){return{...this._weatherEntity?{entity_id:this._weatherEntity}:{},hidden_metrics:this._weatherHiddenMetrics,show_daily:this._weatherShowDaily,show_hourly:this._weatherShowHourly,show_header:this._weatherShowHeader}}async save(){if(this.backend)try{await this.backend.send("set_weather",this.collectSaveData()),this._fireToast(!0),me.emit("weather-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.weather&&this.loadFromConfig(e.weather)}catch{}}_selectEntity(e){this._weatherEntity=e,this._weatherDropdownOpen=!1}_toggleMetric(e){const t=new Set(this._weatherHiddenMetrics);t.has(e)?t.delete(e):t.add(e),this._weatherHiddenMetrics=[...t]}renderPreview(){if(!this._weatherEntity||!this.hass)return K`<div class="preview-empty">${De("config.weather_select_entity")}</div>`;const e=this.hass.states[this._weatherEntity];if(!e)return K`<div class="preview-empty">${De("config.weather_select_entity")}</div>`;const t=e.attributes,i=t.temperature??"--",a=t.temperature_unit??"°C",r=new Set(this._weatherHiddenMetrics),s=e.state||"sunny",o={sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",partlycloudy:"mdi:weather-partly-cloudy",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",snowy:"mdi:weather-snowy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning"}[s]||"mdi:weather-cloudy",n=De({sunny:"weather.cond_sunny","clear-night":"weather.cond_clear_night",partlycloudy:"weather.cond_partly_cloudy",cloudy:"weather.cond_cloudy",fog:"weather.cond_foggy",rainy:"weather.cond_rainy",pouring:"weather.cond_pouring",snowy:"weather.cond_snowy",windy:"weather.cond_windy",lightning:"weather.cond_lightning"}[s]||"weather.cond_cloudy"),c={sunny:"#fbbf24","clear-night":"#6366f1",partlycloudy:"#94a3b8",cloudy:"#64748b",fog:"#94a3b8",rainy:"#3b82f6",pouring:"#2563eb",snowy:"#e2e8f0",windy:"#6ee7b3",lightning:"#a78bfa"}[s]||"#64748b",d={sunny:"rgba(251,191,36,0.8)","clear-night":"rgba(129,140,248,0.7)",partlycloudy:"rgba(148,163,184,0.6)",cloudy:"rgba(100,116,139,0.6)",fog:"rgba(148,163,184,0.5)",rainy:"rgba(96,165,250,0.7)",pouring:"rgba(59,130,246,0.8)",snowy:"rgba(226,232,240,0.7)",windy:"rgba(110,231,179,0.6)",lightning:"rgba(167,139,250,0.8)"}[s]||"rgba(148,163,184,0.6)",l=new Date,h=l.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),p=String(l.getSeconds()).padStart(2,"0"),_=l.toLocaleDateString(this.hass.language||Ee(),{weekday:"long",day:"numeric",month:"long"}),m=t.apparent_temperature??null,u="number"==typeof i?i:12,g=[0,.5,1.2,.8,-.3,-1,-.5,.2,.7,1.5],v=44,f=Math.min(...g),b=Math.max(...g)-f||1,y=g.map((e,t)=>({x:t/(g.length-1)*348,y:6+32*(1-(e-f)/b)}));let w=`M${y[0].x},${y[0].y}`;for(let H=0;H<y.length-1;H++){const e=y[Math.max(0,H-1)],t=y[H],i=y[H+1],a=y[Math.min(y.length-1,H+2)];w+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}const x=w+" L348,44 L0,44 Z",$=.3*(g.length-1),k=Math.floor($),S=Math.min(g.length-1,k+1),E=$-k,D=6+32*(1-(g[k]+(g[S]-g[k])*E-f)/b),C=l.getHours(),I=g.map((e,t)=>`${String((C+t)%24).padStart(2,"0")}h`),P=[];if(r.has("humidity")||null==t.humidity||P.push({key:"humidity",icon:"mdi:water-percent",val:`${t.humidity}`,unit:"%"}),!r.has("wind")&&null!=t.wind_speed){const e="number"==typeof t.wind_bearing?(A=t.wind_bearing,De(`weather.${Tt[Math.round((A%360+360)%360/22.5)%16]}`)):void 0;P.push({key:"wind",icon:"mdi:weather-windy",val:`${Math.round(t.wind_speed)}`,unit:"km/h",dir:e})}var A;if(r.has("pressure")||null==t.pressure||P.push({key:"pressure",icon:"mdi:gauge",val:`${Math.round(t.pressure)}`,unit:"hPa"}),r.has("uv")||null==t.uv_index||P.push({key:"uv",icon:"mdi:sun-wireless",val:`${Math.round(t.uv_index)}`,unit:"UV"}),r.has("visibility")||null==t.visibility||P.push({key:"visibility",icon:"mdi:eye-outline",val:`${t.visibility}`,unit:"km"}),!r.has("sunrise")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_rising;P.push({key:"sunrise",icon:"mdi:weather-sunset-up",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}if(!r.has("sunset")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_setting;P.push({key:"sunset",icon:"mdi:weather-sunset-down",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}const z=this.hass.language||Ee(),O=Array.from({length:7},(e,t)=>{const i=new Date(2024,0,t+1);return new Intl.DateTimeFormat(z,{weekday:"short"}).format(i)}),R=[u+2,u+1,u,u-1,u+1,u+3,u],T=[u-4,u-3,u-5,u-6,u-4,u-2,u-5],M=[0,10,30,60,20,0,15],L=(l.getDay()+6)%7;return K`
      <div class="preview-weather-wrap">
        ${this._weatherShowHeader?K`
          <div class="pw-card-header">
            <span class="pw-card-title">${De("weather.title")}</span>
            <span class="pw-card-location">${e.attributes.friendly_name??""}</span>
          </div>
        `:W}
      <div class="preview-weather">
        <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${c}22 0%, transparent 70%);"></div>
        <div class="pw-content">
          <div class="pw-header">
            <div class="pw-header-left">
              <span class="pw-time">${h}<span class="pw-sec">:${p}</span></span>
              <span class="pw-date">${_}</span>
            </div>
            <div class="pw-header-right">
              <span class="pw-temp">${i}<span class="pw-temp-unit">${a}</span></span>
              <span class="pw-cond"><ha-icon .icon=${o}></ha-icon>${n}</span>
              ${null!=m?K`<span class="pw-feels">${De("weather.feels_like",{temp:String(Math.round(m))})}</span>`:W}
            </div>
          </div>

          <div class="pw-spark-zone">
            <svg class="pw-spark-svg" viewBox="0 0 ${348} ${v}" preserveAspectRatio="none">
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
              <div class="pw-spark-now-dot" style="top: ${D/v*100}%;"></div>
            </div>
            <div class="pw-spark-labels">
              ${I.map((e,t)=>t%2==0||t===I.length-1?K`<span class="pw-spark-lbl" style="left: ${t/(I.length-1)*100}%;">${e}</span>`:W)}
            </div>
          </div>

          ${P.length>0?K`
            <div class="pw-metrics" style="grid-template-columns: repeat(${3}, 1fr);">
              ${P.map(e=>K`
                <div class="pw-metric ${e.key}">
                  <ha-icon .icon=${e.icon}></ha-icon>
                  <span class="pw-metric-val">${e.val}</span>
                  ${e.unit?K`<span class="pw-metric-unit">${e.unit}</span>`:W}
                  ${e.dir?K`<span class="pw-metric-dir">${e.dir}</span>`:W}
                </div>
              `)}
            </div>
          `:W}

          ${this._weatherShowDaily||this._weatherShowHourly?K`
            <div class="pw-forecast-zone">
              <div class="pw-tabs">
                ${this._weatherShowDaily?K`<span class="pw-tab active">${De("weather.daily_tab")}</span>`:W}
                ${this._weatherShowHourly?K`<span class="pw-tab">${De("weather.hourly_tab")}</span>`:W}
              </div>
              <div class="pw-fold-sep"></div>
              ${this._weatherShowDaily?K`
                <div class="pw-daily-list">
                  ${["mdi:weather-sunny","mdi:weather-partly-cloudy","mdi:weather-cloudy","mdi:weather-rainy","mdi:weather-partly-cloudy","mdi:weather-sunny","mdi:weather-cloudy"].slice(0,5).map((e,t)=>{const i=(L+t)%7,a=0===t?De("weather.today"):O[i],r=Math.round(R[t]),s=Math.round(T[t]),o=M[t];return K`
                      <div class="pw-day-row ${0===t?"today":""}">
                        <span class="pw-day-label">${a}</span>
                        <ha-icon class="pw-day-icon" .icon=${e}></ha-icon>
                        <span class="pw-day-temps"><span class="pw-day-high">${r}°</span><span class="pw-day-low">${s}°</span></span>
                        ${o>0?K`<span class="pw-day-precip">${o}%</span>`:K`<span class="pw-day-precip"></span>`}
                      </div>
                    `})}
                </div>
              `:W}
            </div>
          `:W}
        </div>
      </div>
      </div>
    `}renderTab(){this._lang;const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")).sort():[],t=e.find(e=>e===this._weatherEntity),i=new Set(this._weatherHiddenMetrics);return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-weather">
        <div class="section-label">${De("config.behavior")}</div>
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
              <div class="feature-name">${De("config.weather_show_header")}</div>
              <div class="feature-desc">${De("config.weather_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHeader?"on":""}"
            ></span>
          </button>
        </div>

        <div class="section-label">${De("config.weather_entity")}</div>
        <div class="section-desc">${De("config.weather_entity_desc")}</div>
        <div class="dropdown ${this._weatherDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._weatherDropdownOpen=!this._weatherDropdownOpen}
            aria-expanded=${this._weatherDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
            <span>${t||De("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>K`
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

        <div class="section-label">${De("config.weather_metrics")}</div>
        <div class="section-desc">${De("config.weather_metrics_desc")}</div>
        <div class="feature-list">
          ${Mt.map(e=>{const t=!i.has(e.key);return K`
              <button
                class="feature-row"
                role="switch"
                aria-checked=${t?"true":"false"}
                aria-label="${De(t?"common.hide":"common.show")} ${De(e.nameKey)}"
                @click=${()=>this._toggleMetric(e.key)}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${De(e.nameKey)}</div>
                </div>
                <span
                  class="toggle ${t?"on":""}"
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
            aria-checked=${this._weatherShowDaily?"true":"false"}
            aria-label="${this._weatherShowDaily?De("common.hide"):De("common.show")} ${De("config.weather_daily")}"
            @click=${()=>{this._weatherShowDaily=!this._weatherShowDaily}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:calendar-week"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${De("config.weather_daily")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowDaily?"on":""}"
            ></span>
          </button>
          <button
            class="feature-row"
            role="switch"
            aria-checked=${this._weatherShowHourly?"true":"false"}
            aria-label="${this._weatherShowHourly?De("common.hide"):De("common.show")} ${De("config.weather_hourly")}"
            @click=${()=>{this._weatherShowHourly=!this._weatherShowHourly}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${De("config.weather_hourly")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHourly?"on":""}"
            ></span>
          </button>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}Rt([_e()],Lt.prototype,"_weatherEntity"),Rt([_e()],Lt.prototype,"_weatherHiddenMetrics"),Rt([_e()],Lt.prototype,"_weatherShowDaily"),Rt([_e()],Lt.prototype,"_weatherShowHourly"),Rt([_e()],Lt.prototype,"_weatherShowHeader"),Rt([_e()],Lt.prototype,"_weatherDropdownOpen");try{customElements.define("config-tab-weather",Lt)}catch{}var Ht=Object.defineProperty,jt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ht(t,i,s),s};class Nt extends Ve{constructor(){super(...arguments),this._cameraShowHeader=!0,this._cameraAutoCycle=!1,this._cameraCycleInterval=10,this._cameraEntityOrder=[],this._localDragIdx=null,this._localDropIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_cameraShowHeader","_cameraAutoCycle","_cameraCycleInterval","_cameraEntityOrder"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._cameraShowHeader=t.show_header??!0,this._cameraEntityOrder=t.entity_order??[],this._cameraAutoCycle=t.auto_cycle??!1,this._cameraCycleInterval=t.cycle_interval??10}collectSaveData(){return{show_header:this._cameraShowHeader,entity_order:this._cameraEntityOrder,auto_cycle:this._cameraAutoCycle,cycle_interval:this._cameraCycleInterval}}async save(){if(this.backend)try{await this.backend.send("set_camera_carousel_config",this.collectSaveData()),this._fireToast(!0),me.emit("camera-carousel-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.camera_carousel&&this.loadFromConfig(e.camera_carousel)}catch{}}_initCameraEntityOrder(){if(!this.hass)return;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("camera.")).sort(),t=new Set(e),i=this._cameraEntityOrder.filter(e=>t.has(e)),a=new Set(i);for(const r of e)a.has(r)||i.push(r);this._cameraEntityOrder=i}_localDragStart(e){this._localDragIdx=e}_localDragOver(e,t){t.preventDefault(),this._localDropIdx=e}_localDragLeave(){this._localDropIdx=null}_localDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_onDropCameraEntity(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return void this._localDragEnd();const i=[...this._cameraEntityOrder],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._cameraEntityOrder=i,this._localDragEnd()}renderPreview(){const e="rgba(96,165,250,",t={name:"Entrée",state:"streaming",icon:"mdi:cctv",ai:["person"]};return K`
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
            ${t.ai.length>0?K`
              <div style="position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:flex-end;padding:5px 7px;background:linear-gradient(0deg,rgba(0,0,0,0.5) 0%,transparent 100%);">
                <div style="display:flex;gap:3px;">
                  ${t.ai.map(t=>K`
                    <div style="display:inline-flex;align-items:center;gap:2px;padding:1px 4px;border-radius:4px;font-size:6px;font-weight:600;background:${e}0.15);color:#60a5fa;border:1px solid ${e}0.2);">
                      <ha-icon .icon=${"mdi:human"} style="--mdc-icon-size:7px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                      ${t}
                    </div>
                  `)}
                </div>
              </div>
            `:W}
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
              ${t.ai.length>0?K`
                <div style="display:flex;gap:2px;align-items:center;">
                  <div style="width:12px;height:12px;border-radius:4px;background:${e}0.12);display:flex;align-items:center;justify-content:center;">
                    <ha-icon .icon=${"mdi:human"} style="--mdc-icon-size:8px;color:#60a5fa;display:flex;align-items:center;justify-content:center;"></ha-icon>
                  </div>
                </div>
              `:W}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex;gap:4px;flex-wrap:wrap;">
          ${["mdi:power","mdi:camera","mdi:record-circle","mdi:motion-sensor"].map((t,i)=>K`
            <div style="display:inline-flex;align-items:center;gap:3px;padding:3px 7px;border-radius:var(--radius-xs);border:1px solid ${0===i?`${e}0.15)`:"var(--b2)"};background:${0===i?`${e}0.1)`:"var(--s1)"};font-size:8px;font-weight:600;color:${0===i?"#60a5fa":"var(--t3)"};">
              <ha-icon .icon=${t} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            </div>
          `)}
        </div>
      </div>
    `}renderTab(){return this._lang,this.hass&&0===this._cameraEntityOrder.length&&this._initCameraEntityOrder(),K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-camera_carousel">
        <div class="section-label">${De("config.behavior")}</div>
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
              <div class="feature-name">${De("config.camera_show_header")}</div>
              <div class="feature-desc">${De("config.camera_show_header_desc")}</div>
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
              <div class="feature-name">${De("config.camera_auto_cycle")}</div>
              <div class="feature-desc">${De("config.camera_auto_cycle_desc")}</div>
            </div>
            <span class="toggle ${this._cameraAutoCycle?"on":""}"></span>
          </button>
        </div>

        ${this._cameraAutoCycle?K`
          <div class="feature-list">
            <div class="feature-row" style="pointer-events:none;">
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:timer-outline"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${De("config.camera_cycle_interval")}</div>
                <div class="feature-desc">${De("config.camera_cycle_interval_desc")}</div>
              </div>
              <input class="input" type="number" min="3" max="60" style="width:60px;pointer-events:auto;text-align:center;"
                .value=${String(this._cameraCycleInterval)}
                @change=${e=>{const t=parseInt(e.target.value,10);!isNaN(t)&&t>=3&&t<=60&&(this._cameraCycleInterval=t)}}
              />
            </div>
          </div>
        `:W}

        <!-- Camera entity order -->
        ${this._cameraEntityOrder.length>0?K`
          <div class="section-label">${De("config.camera_entity_order")} (${this._cameraEntityOrder.length})</div>
          <div class="section-desc">${De("config.camera_entity_order_desc")}</div>
          <div class="item-list">
            ${this._cameraEntityOrder.map((e,t)=>{const i=this._localDragIdx===t,a=this._localDropIdx===t,r=this.hass?.states[e],s=r?.attributes?.friendly_name||e.split(".")[1],o=["item-row",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return K`
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
              `})}
          </div>
        `:W}

        <!-- Save / Reset -->
        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}jt([_e()],Nt.prototype,"_cameraShowHeader"),jt([_e()],Nt.prototype,"_cameraAutoCycle"),jt([_e()],Nt.prototype,"_cameraCycleInterval"),jt([_e()],Nt.prototype,"_cameraEntityOrder"),jt([_e()],Nt.prototype,"_localDragIdx"),jt([_e()],Nt.prototype,"_localDropIdx");try{customElements.define("config-tab-camera",Nt)}catch{}var Vt=Object.defineProperty,qt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Vt(t,i,s),s};class Kt extends Ve{constructor(){super(...arguments),this._climateShowHeader=!0,this._climateDisplayMode="list",this._climateDashboardDisplayMode="list",this._climateDashboardEntities=[],this._climateRoom="",this._climateRoomDropdownOpen=!1,this._climateRoomEntities=[],this._saving=!1,this._localDragIdx=null,this._localDropIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_climateShowHeader","_climateDisplayMode","_climateDashboardDisplayMode","_climateDashboardEntities","_climateRoomEntities"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._climateShowHeader=t.show_header??!0,this._climateDisplayMode="normal"===t.display_mode?"normal":"list",this._climateDashboardDisplayMode="normal"===t.dashboard_display_mode?"normal":"list",this._climateDashboardEntities=t.dashboard_entities??[],!this._climateRoom&&this.rooms.length>0&&(this._climateRoom=this.rooms[0].areaId,this._loadRoomClimates())}collectSaveData(){return{show_header:this._climateShowHeader,display_mode:this._climateDisplayMode,dashboard_display_mode:this._climateDashboardDisplayMode,dashboard_entities:this._climateDashboardEntities}}async save(){if(this.backend&&!this._saving){this._saving=!0;try{const e=this._climateRoomEntities.map(e=>e.entityId),t=this._climateRoomEntities.filter(e=>!e.visible).map(e=>e.entityId);if(await this.backend.send("set_climate_config",this.collectSaveData()),this._climateRoom&&this._climateRoomEntities.length>0){let i=[],a=[];try{const e=await this.backend.send("get_room",{area_id:this._climateRoom});e&&(i=e.hidden_entities??[],a=e.entity_order??[])}catch{}const r=new Set(this._climateRoomEntities.map(e=>e.entityId)),s=i.filter(e=>!r.has(e)),o=a.filter(e=>!r.has(e));await this.backend.send("set_room",{area_id:this._climateRoom,hidden_entities:[...s,...t],entity_order:[...o,...e]}),me.emit("room-config-changed",{areaId:this._climateRoom})}this._fireToast(!0),me.emit("climate-config-changed",void 0)}catch{this._fireToast(!1)}finally{this._saving=!1}}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.climate_card&&this.loadFromConfig(e.climate_card)}catch{}this._climateRoom&&await this._loadRoomClimates()}}async _loadRoomClimates(){if(!this.hass||!this._climateRoom||!this.backend)return;const e=this._climateRoom,t=Me(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("climate.")).map(e=>e.entity_id);let i=[],a=[];try{const t=await this.backend.send("get_room",{area_id:e});i=t?.hidden_entities||[],a=t?.entity_order||[]}catch{}if(this._climateRoom!==e)return;const r=new Map(a.map((e,t)=>[e,t])),s=[...t].sort((e,t)=>{const i=r.get(e)??999,a=r.get(t)??999;return i!==a?i-a:e.localeCompare(t)});this._climateRoomEntities=s.map(e=>{const t=this.hass?.states[e],a=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:a,visible:!i.includes(e)}})}_onLocalDragStart(e){this._localDragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),this._localDropIdx=e}_onLocalDragLeave(){this._localDropIdx=null}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_onLocalDrop(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this._climateRoomEntities],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._climateRoomEntities=i,this._localDragIdx=null,this._localDropIdx=null}_selectRoom(e){this._climateRoom=e,this._climateRoomDropdownOpen=!1,this._loadRoomClimates()}_toggleEntityVisibility(e){this._climateRoomEntities=this._climateRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_toggleDashboardEntity(e){const t=new Set(this._climateDashboardEntities);t.has(e)?t.delete(e):t.add(e),this._climateDashboardEntities=[...t]}_getAllClimateEntities(){if(!this.hass)return[];const e=[];for(const[t,i]of Object.entries(this.hass.states)){if(!t.startsWith("climate."))continue;const a=i.attributes?.friendly_name||t.split(".")[1]||t;e.push({entityId:t,name:a})}return e.sort((e,t)=>e.name.localeCompare(t.name))}renderPreview(){const e=this._climateRoomEntities;return 0===e.length?K`<div style="padding:12px;text-align:center;font-size:11px;color:var(--t4);">${De("config.climate_no_entities")}</div>`:"normal"===this._climateDisplayMode?this._renderNormalPreview(e):this._renderListPreview(e)}_renderListPreview(e){const t=e.filter(e=>e.visible).length,i=e.length;return K`
      <div style="padding:6px 10px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
          <span style="font-size:12px;font-weight:600;color:var(--t1);">${De("climate.title")}</span>
          <span style="min-width:14px;height:14px;padding:0 4px;font-size:9px;font-weight:600;border-radius:var(--radius-sm);background:var(--s3);color:var(--t2);display:flex;align-items:center;justify-content:center;">${t}/${i}</span>
        </div>
        ${e.slice(0,4).map(e=>K`
          <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;opacity:${e.visible?"1":"0.3"};">
            <ha-icon .icon=${"mdi:thermostat"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;color:var(--t3);"></ha-icon>
            <span style="font-size:11px;color:var(--t2);flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</span>
            <span style="font-size:10px;color:var(--t4);flex-shrink:0;">--°C</span>
            <span style="width:5px;height:5px;border-radius:50%;background:var(--t4);flex-shrink:0;"></span>
          </div>
        `)}
        ${e.length>4?K`<div style="font-size:10px;color:var(--t4);text-align:center;padding:4px;">+${e.length-4}</div>`:W}
      </div>
    `}_renderNormalPreview(e){const t=e=>(e-90)*Math.PI/180,i=e=>({x:60+40*Math.cos(t(e)),y:62+40*Math.sin(t(e))}),a=i(-120),r=i(120),s=`M ${a.x} ${a.y} A 40 40 0 1 1 ${r.x} ${r.y}`,o=40*Math.PI*(240/180),n=.6*o,c=i(48),d=e.filter(e=>e.visible);return K`
      <div style="padding:6px 10px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <span style="font-size:12px;font-weight:600;color:var(--t1);">${De("climate.title")}</span>
        </div>
        ${d.length>1?K`
          <div style="display:flex;gap:4px;margin-bottom:4px;">
            ${d.slice(0,4).map((e,t)=>K`
              <span style="font-size:9px;padding:2px 6px;border-radius:var(--radius-sm);${0===t?"background:var(--s3);color:var(--t1);font-weight:600;":"color:var(--t3);"}">${e.name.length>8?e.name.slice(0,8)+"…":e.name}</span>
            `)}
          </div>
        `:W}
        <div style="display:flex;justify-content:center;">
          <svg viewBox="0 0 120 80" fill="none" style="width:100px;height:68px;">
            ${U`
              <path d=${s} stroke="var(--s3)" stroke-width="4" fill="none" stroke-linecap="round" />
              <path d=${s} stroke="var(--c-warning)" stroke-width="4" fill="none" stroke-linecap="round"
                stroke-dasharray=${o} stroke-dashoffset=${o-n} />
              <circle cx=${c.x} cy=${c.y} r="3" fill="var(--t1)" />
              <text x=${60} y=${58} text-anchor="middle" fill="var(--t1)" font-size="14" font-weight="700">21.5°</text>
              <text x=${60} y=${70} text-anchor="middle" fill="var(--t3)" font-size="7">
                <tspan>🔥</tspan> ${De("climate.action_heating")}
              </text>
            `}
          </svg>
        </div>
      </div>
    `}renderTab(){if(this._lang,!this.hass)return K`${W}`;const e=this.rooms,t=this._climateRoom,i=this._climateRoomEntities,a=this._climateRoomDropdownOpen,r=this._getAllClimateEntities();return K`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-climate">
        <div class="section-label">${De("config.tab_climate")}</div>
        <div class="section-desc">${De("config.climate_desc")}</div>

        <!-- Room selector -->
        <div class="dropdown ${a?"open":""}">
          <button class="dropdown-trigger"
            @click=${()=>{this._climateRoomDropdownOpen=!a}}
            aria-expanded=${a?"true":"false"}
            aria-haspopup="listbox">
            <span>${e.find(e=>e.areaId===t)?.name??De("config.climate_select_room")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>K`
              <button class="dropdown-item ${e.areaId===t?"active":""}"
                role="option" aria-selected=${e.areaId===t?"true":"false"}
                @click=${()=>this._selectRoom(e.areaId)}>
                <ha-icon .icon=${e.icon||"mdi:home"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${e.name}
              </button>
            `)}
          </div>
        </div>

        <!-- Display mode selector (popup) -->
        <div class="section-label" style="margin-top:14px;font-size:11px;">${De("config.climate_display_mode_popup")}</div>
        <div style="display:flex;gap:6px;margin-top:6px;">
          <button class="chip ${"list"===this._climateDisplayMode?"active":""}"
            @click=${()=>{this._climateDisplayMode="list"}}
            aria-pressed=${"list"===this._climateDisplayMode?"true":"false"}>
            <ha-icon .icon=${"mdi:format-list-bulleted"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${De("config.climate_mode_list")}
          </button>
          <button class="chip ${"normal"===this._climateDisplayMode?"active":""}"
            @click=${()=>{this._climateDisplayMode="normal"}}
            aria-pressed=${"normal"===this._climateDisplayMode?"true":"false"}>
            <ha-icon .icon=${"mdi:gauge"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${De("config.climate_mode_normal")}
          </button>
        </div>

        <!-- Display mode selector (dashboard) -->
        <div class="section-label" style="margin-top:10px;font-size:11px;">${De("config.climate_display_mode_dashboard")}</div>
        <div style="display:flex;gap:6px;margin-top:6px;">
          <button class="chip ${"list"===this._climateDashboardDisplayMode?"active":""}"
            @click=${()=>{this._climateDashboardDisplayMode="list"}}
            aria-pressed=${"list"===this._climateDashboardDisplayMode?"true":"false"}>
            <ha-icon .icon=${"mdi:format-list-bulleted"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${De("config.climate_mode_list")}
          </button>
          <button class="chip ${"normal"===this._climateDashboardDisplayMode?"active":""}"
            @click=${()=>{this._climateDashboardDisplayMode="normal"}}
            aria-pressed=${"normal"===this._climateDashboardDisplayMode?"true":"false"}>
            <ha-icon .icon=${"mdi:gauge"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            ${De("config.climate_mode_normal")}
          </button>
        </div>

        <!-- Show header toggle -->
        <div class="check-item" style="margin-top:12px;">
          <button class="check-box ${this._climateShowHeader?"on":""}"
            role="switch" aria-checked=${this._climateShowHeader?"true":"false"}
            aria-label=${De("config.climate_show_header")}
            @click=${()=>{this._climateShowHeader=!this._climateShowHeader}}>
            <ha-icon .icon=${this._climateShowHeader?"mdi:check":""} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
          </button>
          <span>${De("config.climate_show_header")}</span>
        </div>

        <!-- Dashboard entities -->
        ${r.length>0?K`
          <div class="section-label" style="margin-top:14px;">${De("config.climate_dashboard_entities")}</div>
          <div class="section-desc">${De("config.climate_dashboard_entities_desc")}</div>
          <div class="item-list">
            ${r.map(e=>{const t=this._climateDashboardEntities.includes(e.entityId);return K`
                <div class="item-row ${t?"":"disabled"}">
                  <div class="item-info">
                    <span class="item-name">${e.name}</span>
                    <span class="item-meta">${e.entityId}</span>
                  </div>
                  <button
                    class="toggle ${t?"on":""}"
                    @click=${()=>this._toggleDashboardEntity(e.entityId)}
                    role="switch"
                    aria-checked=${t?"true":"false"}
                    aria-label="${De(t?"common.hide":"common.show")} ${e.name}"
                  ></button>
                </div>
              `})}
          </div>
        `:W}

        <!-- Entity list -->
        ${0===i.length?K`
          <div class="banner" style="margin-top:12px;">
            <ha-icon .icon=${"mdi:thermostat"} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;"></ha-icon>
            <span>${De("config.climate_no_entities")}</span>
          </div>
        `:K`
          <div class="item-list" style="margin-top:12px;">
            ${i.map((e,t)=>{const i=this._localDragIdx===t,a=this._localDropIdx===t,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return K`
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
                  <div class="item-info" style="flex:1;min-width:0;">
                    <span class="item-name">${e.name}</span>
                    <span class="item-meta">${e.entityId}</span>
                  </div>
                  <button
                    class="toggle ${e.visible?"on":""}"
                    @click=${()=>this._toggleEntityVisibility(e.entityId)}
                    role="switch"
                    aria-checked=${e.visible?"true":"false"}
                    aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.name}"
                  ></button>
                </div>
              `})}
          </div>
        `}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
          <button class="btn btn-accent" @click=${()=>this.save()}>${De("common.save")}</button>
        </div>
      </div>
    `}}qt([_e()],Kt.prototype,"_climateShowHeader"),qt([_e()],Kt.prototype,"_climateDisplayMode"),qt([_e()],Kt.prototype,"_climateDashboardDisplayMode"),qt([_e()],Kt.prototype,"_climateDashboardEntities"),qt([_e()],Kt.prototype,"_climateRoom"),qt([_e()],Kt.prototype,"_climateRoomDropdownOpen"),qt([_e()],Kt.prototype,"_climateRoomEntities"),qt([_e()],Kt.prototype,"_localDragIdx"),qt([_e()],Kt.prototype,"_localDropIdx");try{customElements.define("config-tab-climate",Kt)}catch{}var Ut=Object.defineProperty,Ft=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Ut(t,i,s),s};const Wt=["light","cover","climate","fan","media_player","camera"];function Bt(e){return dt[e]??"mdi:help-circle"}class Yt extends Ve{constructor(){super(...arguments),this._unassignedEntities=[],this._unassignedDropdownEntity=null,this._unassignedEntitySearch="",this._unassignedAreaSearch="",this._unassignedEditingEntity=null,this._iconPopupEntity=null,this._iconSearch="",this._iconList=[],this._iconLoading=!1,this._portalEl=null}updated(e){super.updated(e),e.has("hass")&&this.hass&&0===this._unassignedEntities.length&&this._loadEntities()}loadFromConfig(e){}collectSaveData(){return{}}renderPreview(){return W}_collectAllEntities(){if(!this.hass)return[];const e=this.hass.entities,t=this.hass.devices,i=this.hass.areas,a=[];for(const r of Object.values(e)){if(r.disabled_by||r.hidden_by)continue;const e=r.entity_id.split(".")[0];if(!Wt.includes(e))continue;const s=Te(r,t),o=this.hass.states[r.entity_id],n=o?.attributes?.friendly_name??r.entity_id,c=s?i[s]?.name??null:null;a.push({entityId:r.entity_id,name:n,domain:e,areaId:s,areaName:c,icon:r.icon??null})}return a.sort((e,t)=>{const i=e.areaId?1:0,a=t.areaId?1:0;if(i!==a)return i-a;const r=Wt.indexOf(e.domain)-Wt.indexOf(t.domain);return 0!==r?r:e.name.localeCompare(t.name)}),a}_loadEntities(){this._unassignedEntities=this._collectAllEntities(),this._unassignedDropdownEntity=null,this._unassignedEditingEntity=null,this._unassignedEntitySearch="",this._unassignedAreaSearch=""}async _assignEntityArea(e,t){if(this.hass)try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:e,area_id:t}),this._unassignedEntities=this._unassignedEntities.map(i=>i.entityId===e?{...i,areaId:t,areaName:this.hass?.areas[t]?.name??null}:i),this._unassignedDropdownEntity=null,this._unassignedAreaSearch="",this.dispatchEvent(new CustomEvent("entities-assigned",{bubbles:!0,composed:!0}))}catch{this._fireToast(!1)}}async _renameEntity(e,t){if(!this.hass)return;const i=t.trim();if(!i)return void(this._unassignedEditingEntity=null);const a=this._unassignedEntities.find(t=>t.entityId===e);if(a&&a.name===i)this._unassignedEditingEntity=null;else{try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:e,name:i}),this._unassignedEntities=this._unassignedEntities.map(t=>t.entityId===e?{...t,name:i}:t)}catch{this._fireToast(!1)}this._unassignedEditingEntity=null}}async _openIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),this._iconSearch="",this._iconPopupEntity=e)}async _loadIconList(){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim();return e?this._iconList.filter(t=>t.toLowerCase().includes(e)).slice(0,120):this._iconList.slice(0,120)}async _selectIcon(e){const t=this._iconPopupEntity;if(this._iconPopupEntity=null,!t||!this.hass)return;const i=this._unassignedEntities.find(e=>e.entityId===t);if(!i||i.icon!==(e||null))try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:t,icon:e||null}),this._unassignedEntities=this._unassignedEntities.map(i=>i.entityId===t?{...i,icon:e||null}:i)}catch{this._fireToast(!1)}}_showIconPortal(){if(!this._iconPopupEntity)return void this._removeIconPortal();const e=this._unassignedEntities.find(e=>e.entityId===this._iconPopupEntity),t=e?.icon??"",i=this._getFilteredIcons();this._portalEl||(this._portalEl=document.createElement("div"),document.body.appendChild(this._portalEl));const a=()=>{this._iconPopupEntity=null,this._removeIconPortal()},r=e=>{this._selectIcon(e),this._removeIconPortal()},s=e=>{this._iconSearch=e,this._showIconPortal()};this._portalEl.replaceChildren(),Object.assign(this._portalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}),this._portalEl.addEventListener("click",e=>{e.target===this._portalEl&&a()},{once:!0});const o=document.createElement("div");Object.assign(o.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const n=document.createElement("div");Object.assign(n.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const c=document.createElement("span");Object.assign(c.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),c.textContent=De("config.unassigned_change_icon");const d=document.createElement("input");Object.assign(d.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),d.placeholder="mdi:...",d.value=this._iconSearch,d.addEventListener("input",()=>s(d.value)),n.appendChild(c),n.appendChild(d),o.appendChild(n);const l=document.createElement("div");Object.assign(l.style,{overflow:"auto",flex:"1",padding:"0.5rem"});const h=document.createElement("div");Object.assign(h.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const p=this._createIconBtn("mdi:cancel",""===t,.4);p.addEventListener("click",()=>r("")),h.appendChild(p);for(const _ of i){const e=this._createIconBtn(_,_===t,1);e.addEventListener("click",()=>r(_)),h.appendChild(e)}if(0===i.length&&this._iconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=De("config.title_no_icons_found"),h.appendChild(e)}l.appendChild(h),o.appendChild(l),this._portalEl.appendChild(o),d.focus()}_createIconBtn(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",border:t?"2px solid rgba(129,140,248,0.6)":"1px solid rgba(255,255,255,0.06)",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)",cursor:"pointer",color:"rgba(255,255,255,0.88)",padding:"0"});const r=document.createElement("ha-icon");return r.icon=e,r.style.cssText=`--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${i};`,a.appendChild(r),a}_removeIconPortal(){this._portalEl&&(this._portalEl.remove(),this._portalEl=null)}disconnectedCallback(){super.disconnectedCallback(),this._removeIconPortal()}closeDropdowns(){this._unassignedDropdownEntity=null}renderTab(){if(this._lang,!this.hass)return K`${W}`;const e=this._unassignedEntities,t=Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name)),i=this._unassignedEntitySearch.toLowerCase(),a=this._unassignedAreaSearch.toLowerCase(),r=i?e.filter(e=>e.name.toLowerCase().includes(i)||e.entityId.toLowerCase().includes(i)):e,s=new Map;for(const c of r){const e=s.get(c.domain)??[];e.push(c),s.set(c.domain,e)}const o=e.filter(e=>!e.areaId).length,n=a?t.filter(e=>e.name.toLowerCase().includes(a)):t;return K`
      <div class="tab-panel" id="panel-unassigned">
        <div class="section-label">${De("config.tab_unassigned")}</div>
        <div class="section-desc">${De("config.unassigned_desc")}</div>

        ${o>0?K`
          <div class="banner" style="color:var(--c-warning);">
            <ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon>
            <span>${De("config.unassigned_count",{count:String(o)})}</span>
          </div>
        `:W}

        ${0===e.length?K`
          <div class="banner">
            <ha-icon .icon=${"mdi:help-circle-outline"}></ha-icon>
            <span>${De("config.unassigned_no_entities")}</span>
          </div>
        `:K`
          <!-- Entity search -->
          <input
            type="text"
            class="dropdown-search"
            style="width:100%;margin:8px 0;"
            placeholder="${De("config.search_entity")}"
            aria-label="${De("config.search_entity")}"
            .value=${this._unassignedEntitySearch}
            @input=${e=>{this._unassignedEntitySearch=e.target.value}}
          />

          ${0===r.length?K`
            <div class="banner">
              <ha-icon .icon=${"mdi:magnify"}></ha-icon>
              <span>${De("config.unassigned_no_results")}</span>
            </div>
          `:W}

          ${[...s.entries()].map(([e,t])=>K`
            <div class="section-label" style="margin-top:16px;display:flex;align-items:center;">
              <ha-icon .icon=${Bt(e)} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;margin-right:6px;"></ha-icon>
              ${function(e){const t=lt[e];return t?De(t.name):e}(e)}
              <span style="margin-left:0.375rem;font-size:var(--fz-base);font-weight:500;color:var(--t3);">(${t.length})</span>
            </div>
            <div class="item-list">
              ${t.map(e=>{const t=this._unassignedDropdownEntity===e.entityId,i=this._unassignedEditingEntity===e.entityId;return K`
                  <div class="item-row">
                    <div class="item-info" style="flex:1;min-width:0;">
                      ${i?K`
                        <input
                          type="text"
                          class="entity-rename-input"
                          .value=${e.name}
                          aria-label="${De("config.unassigned_rename")}"
                          @blur=${t=>{const i=t.target;i.dataset.cancelled||this._renameEntity(e.entityId,i.value)}}
                          @keydown=${e=>{"Enter"===e.key&&e.target.blur(),"Escape"===e.key&&(e.target.dataset.cancelled="1",this._unassignedEditingEntity=null)}}
                          @focus=${e=>e.target.select()}
                        />
                      `:K`
                        <button
                          class="item-name entity-name-btn"
                          @click=${()=>{this._unassignedEditingEntity=e.entityId,this.updateComplete.then(()=>{const e=this.shadowRoot?.querySelector(".entity-rename-input");e?.focus()})}}
                          title="${De("config.unassigned_rename")}"
                          aria-label="${De("config.unassigned_rename")}: ${e.name}"
                        >
                          ${e.name}
                          <ha-icon .icon=${"mdi:pencil"} style="--mdc-icon-size:var(--icon-sm);color:var(--t4);display:flex;align-items:center;justify-content:center;flex-shrink:0;"></ha-icon>
                        </button>
                      `}
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <button
                      class="btn-icon xs"
                      style="flex-shrink:0;"
                      title="${De("config.unassigned_change_icon")}"
                      aria-label="${De("config.unassigned_change_icon")}: ${e.name}"
                      @click=${async()=>{await this._openIconPopup(e.entityId),this._showIconPortal()}}
                    >
                      <ha-icon .icon=${e.icon||Bt(e.domain)} style="--mdc-icon-size:var(--icon-sm);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </button>
                    <div class="dropdown ${t?"open":""}" style="flex-shrink:0;max-width:160px;">
                      <button
                        class="dropdown-trigger"
                        style="padding:0.25rem 0.5rem;font-size:var(--fz-base);min-width:0;${e.areaId?"":"color:var(--c-warning);"}"
                        @click=${i=>{i.stopPropagation(),this._unassignedAreaSearch="",this._unassignedDropdownEntity=t?null:e.entityId}}
                        aria-expanded=${t?"true":"false"}
                        aria-haspopup="listbox"
                      >
                        <span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.areaName??De("config.unassigned_select_area")}</span>
                        <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                      </button>
                      <div class="dropdown-menu" role="listbox">
                        <input
                          type="text"
                          class="dropdown-search"
                          placeholder="${De("config.search_entity")}"
                          aria-label="${De("config.search_entity")}"
                          .value=${this._unassignedAreaSearch}
                          @input=${e=>{this._unassignedAreaSearch=e.target.value}}
                          @click=${e=>e.stopPropagation()}
                        />
                        ${n.map(t=>K`
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
          <button class="btn btn-ghost" @click=${()=>this._loadEntities()}>${De("common.reset")}</button>
        </div>
      </div>

    `}}Ft([_e()],Yt.prototype,"_unassignedEntities"),Ft([_e()],Yt.prototype,"_unassignedDropdownEntity"),Ft([_e()],Yt.prototype,"_unassignedEntitySearch"),Ft([_e()],Yt.prototype,"_unassignedAreaSearch"),Ft([_e()],Yt.prototype,"_unassignedEditingEntity"),Ft([_e()],Yt.prototype,"_iconPopupEntity"),Ft([_e()],Yt.prototype,"_iconSearch");try{customElements.define("config-tab-unassigned",Yt)}catch{}async function Gt(e){if(e.hass&&!e._loading){e._loading=!0;try{await async function(e){if(!e.hass)return;const t=Object.values(e.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let i={room_order:[],hidden_rooms:[],show_lights:!0,show_temperature:!0,show_humidity:!0,show_media:!0,auto_sort:!0,temp_high:24,temp_low:17,humidity_threshold:65},a={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},r={enabled_cards:["weather"],card_order:["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],hide_header:!1,hide_sidebar:!1},s={show_header:!0},o={title:"",sources:[],period_entity:"",period_options:[]},n={show_header:!0,dashboard_entities:[],dashboard_compact:!0,presets:[0,25,50,75,100],entity_presets:{}},c={show_header:!0,entity_id:"",sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},d={show_header:!0},l={extra_entities:{},show_header:!0},h={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}},p={show_header:!0,display_mode:"list",dashboard_display_mode:"list",dashboard_entities:[]},_={show_header:!0,entity_order:[],auto_cycle:!1,cycle_interval:10};const m={};try{if(!e._backend)throw new Error("No backend");const t=await e._backend.send("get_config");i=t.navbar,Object.assign(m,t.rooms),t.weather&&(a=t.weather),t.light_card&&(s=t.light_card),t.title_card&&(o=t.title_card),t.cover_card&&(n=t.cover_card),t.fan_card&&(d=t.fan_card),t.spotify_card&&(c=t.spotify_card),t.media_card&&(l=t.media_card),t.presence_card&&(h=t.presence_card),t.climate_card&&(p=t.climate_card),t.camera_carousel&&(_=t.camera_carousel),t.dashboard&&(r=t.dashboard)}catch{}e._navbarConfig=i,e._weatherConfig=a,e._lightConfig=s,e._titleConfig=o,e._coverConfig=n,e._fanConfig=d,e._spotifyConfig=c,e._mediaConfig=l,e._presenceConfig=h,e._climateConfig=p,e._cameraConfig=_,e._dashboardConfig={dashboard:r,title_card:o,light_card:s,weather:a,cover_card:n,fan_card:d,spotify_card:c,media_card:l,presence_card:h,climate_card:p,camera_carousel:_};const u=new Set(i.hidden_rooms),g=new Map;i.room_order.forEach((e,t)=>g.set(e,t));const v=e.hass;if(!v)return;const f=[],b=[];for(const y of t){const e=Me(y.area_id,v.entities,v.devices),t=m[y.area_id]?.icon,i=t||y.icon||"mdi:home";if(0===e.length){b.push({areaId:y.area_id,name:y.name,icon:i});continue}let a=0,r=null,s=null,o=null,n=null,c=!1;for(const d of e){const e=v.states[d.entity_id];if(!e)continue;const t=d.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&a++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||r||(r=`${e.state}°`,s=parseFloat(e.state)),"humidity"!==t||o||(o=`${e.state}%`,n=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(c=!0)}f.push({areaId:y.area_id,name:y.name,icon:i,entityCount:e.length,visible:!u.has(y.area_id),lightsOn:a,temperature:r,tempValue:s,humidity:o,humidityValue:n,mediaPlaying:c})}f.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=g.get(e.areaId),a=g.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),e._rooms=f,e._emptyRooms=b,!e._selectedRoom&&f.length>0&&(e._selectedRoom=f[0].areaId)}(e),e._loaded=!0}catch{e._loaded=!1}finally{e._loading=!1}}}var Xt=Object.defineProperty,Jt=(e,t,i,a)=>{for(var r,s=void 0,o=e.length-1;o>=0;o--)(r=e[o])&&(s=r(t,i,s)||s);return s&&Xt(t,i,s),s};const Zt=class e extends ne{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=Ee(),this._tab="dashboard",this._tabSelectOpen=!1,this._tabSearch="",this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._toast=!1,this._saving=!1,this._navbarConfig={},this._popupConfig={},this._weatherConfig={},this._titleConfig={},this._lightConfig={},this._coverConfig={},this._fanConfig={},this._climateConfig={},this._presenceConfig={},this._mediaConfig={},this._spotifyConfig={},this._cameraConfig={},this._dashboardConfig={},this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._dragModeSrcIdx=null,this._loaded=!1,this._loading=!1,this._configReady=!1,this._suppressAutoSave=!1,this._toastError=!1,this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this),this._onTabDirty=()=>{this._scheduleAutoSave()},this._onRoomsChanged=e=>{const t=e.detail;this._rooms=t.rooms},this._onTabToast=e=>{this._toastError=!e.detail.success,this._toast=!0,void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastTimeout=setTimeout(()=>{this._toast=!1},2500)}}static{this.styles=[fe,be,ye,we,...de]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,document.addEventListener("click",this._boundCloseDropdowns),this.addEventListener("tab-dirty",this._onTabDirty),this.addEventListener("tab-toast",this._onTabToast),this.addEventListener("rooms-changed",this._onRoomsChanged)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,document.removeEventListener("click",this._boundCloseDropdowns),this.removeEventListener("tab-dirty",this._onTabDirty),this.removeEventListener("tab-toast",this._onTabToast),this.removeEventListener("rooms-changed",this._onRoomsChanged),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),void 0!==this._autoSaveTimer&&(clearTimeout(this._autoSaveTimer),this._autoSaveTimer=void 0),this._backend=void 0}_closeDropdownsOnOutsideClick(e){if(!this._tabSelectOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown, .tab-select-wrap");for(const r of a)if(t.includes(r))return;this._tabSelectOpen=!1,this._tabSearch=""}updated(e){super.updated(e),e.has("hass")&&(this.hass?.language&&Se(this.hass.language)&&(this._lang=Ee()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1,this._configReady=!1),!this.hass||this._loaded||this._loading||(this._backend=new Le(this.hass),this._loadConfig())),!this._loaded||this._loading||this._saving||(this._configReady?this._suppressAutoSave&&(this._suppressAutoSave=!1):this._configReady=!0)}_beginSuppressAutoSave(){this._suppressAutoSave=!0}get _activeTabEl(){return this.shadowRoot?.querySelector(`[data-tab="${this._tab}"]`)??null}_scheduleAutoSave(){void 0!==this._autoSaveTimer&&clearTimeout(this._autoSaveTimer),this._autoSaveTimer=setTimeout(()=>{this._autoSaveTimer=void 0,this._saving||this._save()},800)}async _loadConfig(){return Gt(this)}async _loadRoomLights(){const e=this.shadowRoot?.querySelector("config-tab-light");e&&e.reload()}async _loadCoverConfig(){const e=this.shadowRoot?.querySelector("config-tab-cover");e&&e.reload()}async _loadFanConfig(){const e=this._activeTabEl;e&&e.reload()}async _loadClimateConfig(){const e=this._activeTabEl;e&&e.reload()}async _loadMediaConfig(){const e=this.shadowRoot?.querySelector("config-tab-media");e&&e.reload()}async _loadDashboardConfig(){const e=this.shadowRoot?.querySelector("config-tab-dashboard");e&&e.reload()}async _loadPresenceConfig(){const e=this._activeTabEl;e&&e.reload()}async _loadCameraCarouselConfig(){const e=this._activeTabEl;e&&e.reload()}async _loadWeatherConfig(){return async function(e){const t=e._activeTabEl;t&&t.reload()}(this)}async _loadSpotifyConfig(){const e=this.shadowRoot?.querySelector("config-tab-spotify");e&&e.reload()}async _loadTitleConfig(){const e=this.shadowRoot?.querySelector("config-tab-title");e&&e.reload()}_save(){!function(e){if("navbar"===e._tab)!async function(e){const t=e.shadowRoot?.querySelector("config-tab-navbar");t&&await t.save()}(e);else if("popup"===e._tab){const t=e.shadowRoot?.querySelector("config-tab-popup");t&&t.save()}else if("light"===e._tab){const t=e.shadowRoot?.querySelector("config-tab-light");t&&t.save()}else if("weather"===e._tab){const t=e._activeTabEl;t&&t.save()}else if("title"===e._tab)!async function(e){const t=e.shadowRoot?.querySelector("config-tab-title");t&&t.save()}(e);else if("cover"===e._tab){const t=e.shadowRoot?.querySelector("config-tab-cover");t&&t.save()}else if("climate"===e._tab)!async function(e){const t=e.shadowRoot?.querySelector("config-tab-climate");t&&await t.save()}(e);else if("fan"===e._tab)!async function(e){const t=e._activeTabEl;t&&t.save()}(e);else if("spotify"===e._tab){const t=e.shadowRoot?.querySelector("config-tab-spotify");t&&t.save()}else if("media"===e._tab)!async function(e){const t=e.shadowRoot?.querySelector("config-tab-media");t&&t.save()}(e);else if("presence"===e._tab){const t=e._activeTabEl;t&&t.save()}else"camera_carousel"===e._tab?async function(e){const t=e._activeTabEl;t&&t.save()}(e):"unassigned"===e._tab||async function(e){const t=e.shadowRoot?.querySelector("config-tab-dashboard");t&&await t.save()}(e)}(this)}async _reset(){return async function(e){e._loading||(e._loaded=!1,await Gt(e))}(this)}async _saveClimate(){const e=this._activeTabEl;e&&e.save()}async _saveDashboard(){const e=this.shadowRoot?.querySelector("config-tab-dashboard");e&&e.save()}async _checkSpotifyStatus(){}_onDragStart(e,t,i){!function(e,t,i,a){e._dragIdx=t,e._dragContext=i,void 0!==a&&(e._dragModeSrcIdx=a)}(this,e,t,i)}_onDragOver(e,t,i){!function(e,t,i,a){i.preventDefault(),null!==e._dragIdx&&e._dragIdx!==t&&("title_modes"===e._dragContext&&void 0!==a&&a!==e._dragModeSrcIdx||(e._dropIdx=t))}(this,e,t,i)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t)return e._dragIdx=null,void(e._dropIdx=null);e._dragIdx=null,e._dropIdx=null}(this,e,t)}_onDragEnd(){var e;(e=this)._dragIdx=null,e._dropIdx=null,e._dragModeSrcIdx=null}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_switchTab(e){this._tab=e,this._tabSelectOpen=!1,this._tabSearch="","light"===e&&requestAnimationFrame(()=>{const e=this.shadowRoot?.querySelector("config-tab-light");e&&e.initRoom()}),"media"===e&&requestAnimationFrame(()=>{const e=this.shadowRoot?.querySelector("config-tab-media");e&&e.initRoom()})}_goBack(){history.length>1?history.back():window.location.href="/"}static{this._TAB_META=[{id:"dashboard",icon:"mdi:view-dashboard",labelKey:"config.tab_dashboard"},{id:"title",icon:"mdi:format-title",labelKey:"config.tab_title"},{id:"navbar",icon:"mdi:dock-bottom",labelKey:"config.tab_navbar"},{id:"popup",icon:"mdi:card-outline",labelKey:"config.tab_popup"},{id:"light",icon:"mdi:lightbulb-group",labelKey:"config.tab_light"},{id:"weather",icon:"mdi:weather-partly-cloudy",labelKey:"config.tab_weather"},{id:"media",icon:"mdi:speaker",labelKey:"config.tab_media"},{id:"cover",icon:"mdi:blinds",labelKey:"config.tab_cover"},{id:"climate",icon:"mdi:thermostat",labelKey:"config.tab_climate"},{id:"fan",icon:"mdi:fan",labelKey:"config.tab_fan"},{id:"spotify",icon:"mdi:spotify",labelKey:"config.tab_spotify"},{id:"presence",icon:"mdi:account-group",labelKey:"config.tab_presence"},{id:"camera_carousel",icon:"mdi:cctv",labelKey:"config.tab_camera_carousel"},{id:"unassigned",icon:"mdi:home-map-marker",labelKey:"config.tab_unassigned"}]}_renderTabSelect(){const t=e._TAB_META.find(e=>e.id===this._tab),i=this._tabSearch.toLowerCase();return K`
      <div class="tab-select-wrap ${this._tabSelectOpen?"open":""}">
        <button class="tab-select-trigger" @click=${()=>{this._tabSelectOpen=!this._tabSelectOpen,this._tabSearch=""}} aria-haspopup="listbox" aria-expanded=${this._tabSelectOpen?"true":"false"}>
          <ha-icon .icon=${t?.icon||"mdi:cog"}></ha-icon>
          <span>${t?De(t.labelKey):""}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="tab-select-menu" role="listbox">
          <input type="text" class="tab-select-search" placeholder="${De("config.search_entity")}" .value=${this._tabSearch} @input=${e=>{this._tabSearch=e.target.value}} @click=${e=>e.stopPropagation()} />
          ${e._TAB_META.map(e=>{const t=De(e.labelKey),a=i&&!t.toLowerCase().includes(i)&&!e.id.includes(i);return K`<button class="tab-select-option ${e.id===this._tab?"selected":""} ${a?"hidden":""}" role="option" aria-selected=${e.id===this._tab?"true":"false"} @click=${()=>this._switchTab(e.id)}><ha-icon .icon=${e.icon}></ha-icon>${t}</button>`})}
        </div>
      </div>
    `}render(){return this._lang,this.hass?K`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="${De("common.back")}"><ha-icon .icon=${"mdi:chevron-left"}></ha-icon></button>
          <span class="page-title">${De("config.title")}</span>
          <span class="page-subtitle">${De("config.brand")}</span>
        </div>

        <div class="glass config-panel">
          ${this._renderTabSelect()}

          ${"navbar"===this._tab?K`<config-tab-navbar data-tab="navbar" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .emptyRooms=${this._emptyRooms} .configData=${this._navbarConfig}></config-tab-navbar>`:"popup"===this._tab?K`<config-tab-popup data-tab="popup" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._popupConfig}></config-tab-popup>`:"light"===this._tab?K`<config-tab-light data-tab="light" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._lightConfig}></config-tab-light>`:"weather"===this._tab?K`<config-tab-weather data-tab="weather" .hass=${this.hass} .backend=${this._backend} .configData=${this._weatherConfig}></config-tab-weather>`:"title"===this._tab?K`<config-tab-title data-tab="title" .hass=${this.hass} .backend=${this._backend} .configData=${this._titleConfig}></config-tab-title>`:"media"===this._tab?K`<config-tab-media data-tab="media" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._mediaConfig}></config-tab-media>`:"cover"===this._tab?K`<config-tab-cover data-tab="cover" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._coverConfig}></config-tab-cover>`:"climate"===this._tab?K`<config-tab-climate data-tab="climate" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._climateConfig}></config-tab-climate>`:"fan"===this._tab?K`<config-tab-fan data-tab="fan" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._fanConfig}></config-tab-fan>`:"spotify"===this._tab?K`<config-tab-spotify data-tab="spotify" .hass=${this.hass} .backend=${this._backend} .configData=${this._spotifyConfig}></config-tab-spotify>`:"presence"===this._tab?K`<config-tab-presence data-tab="presence" .hass=${this.hass} .backend=${this._backend} .configData=${this._presenceConfig}></config-tab-presence>`:"camera_carousel"===this._tab?K`<config-tab-camera data-tab="camera_carousel" .hass=${this.hass} .backend=${this._backend} .configData=${this._cameraConfig} @tab-dirty=${this._onTabDirty} @tab-toast=${this._onTabToast}></config-tab-camera>`:"unassigned"===this._tab?K`<config-tab-unassigned data-tab="unassigned" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms}></config-tab-unassigned>`:K`<config-tab-dashboard data-tab="dashboard" .hass=${this.hass} .backend=${this._backend} .rooms=${this._rooms} .configData=${this._dashboardConfig}></config-tab-dashboard>`}
        </div>
      </div>

      <div class="toast ${this._toast?"show":""} ${this._toastError?"error":""}">
        ${this._toastError?De("common.error_save"):De("common.config_saved")}
      </div>
    `:W}};Jt([pe({attribute:!1})],Zt.prototype,"hass"),Jt([pe({type:Boolean})],Zt.prototype,"narrow"),Jt([_e()],Zt.prototype,"_lang"),Jt([_e()],Zt.prototype,"_tab"),Jt([_e()],Zt.prototype,"_tabSelectOpen"),Jt([_e()],Zt.prototype,"_tabSearch"),Jt([_e()],Zt.prototype,"_rooms"),Jt([_e()],Zt.prototype,"_emptyRooms"),Jt([_e()],Zt.prototype,"_selectedRoom"),Jt([_e()],Zt.prototype,"_toast"),Jt([_e()],Zt.prototype,"_saving"),Jt([_e()],Zt.prototype,"_dragIdx"),Jt([_e()],Zt.prototype,"_dropIdx"),Jt([_e()],Zt.prototype,"_dragContext"),Jt([_e()],Zt.prototype,"_dragModeSrcIdx"),Jt([_e()],Zt.prototype,"_toastError");let Qt=Zt;try{customElements.define("glass-config-panel",Qt)}catch{}}();
