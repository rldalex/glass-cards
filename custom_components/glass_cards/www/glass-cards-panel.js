!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let o=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new o(a,e,i)},s=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,_=globalThis,u=_.trustedTypes,g=u?u.emptyScript:"",m=_.reactiveElementPolyfillSupport,v=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},b=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&d(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:o}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const r=a?.call(this);o?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...l(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),o=e.litNonce;void 0!==o&&a.setAttribute("nonce",o),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=a;const r=o.fromAttribute(t,e.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(e,t,i,a=!1,o){if(void 0!==e){const r=this.constructor;if(!1===a&&(o=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??b)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:o},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==o||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,m?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+D,C=`<${P}>`,I=document,A=()=>I.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,T="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,H=/>/g,L=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,N=/"/g,V=/^(?:script|style|textarea|title)$/i,q=(W=1,(e,...t)=>({_$litType$:W,strings:e,values:t})),U=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),K=new WeakMap,B=I.createTreeWalker(I,129);var W;function Y(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class G{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let o=0,r=0;const s=e.length-1,n=this.parts,[d,c]=((e,t)=>{const i=e.length-1,a=[];let o,r=2===t?"<svg>":3===t?"<math>":"",s=M;for(let n=0;n<i;n++){const t=e[n];let i,d,c=-1,l=0;for(;l<t.length&&(s.lastIndex=l,d=s.exec(t),null!==d);)l=s.lastIndex,s===M?"!--"===d[1]?s=z:void 0!==d[1]?s=H:void 0!==d[2]?(V.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=L):void 0!==d[3]&&(s=L):s===L?">"===d[0]?(s=o??M,c=-1):void 0===d[1]?c=-2:(c=s.lastIndex-d[2].length,i=d[1],s=void 0===d[3]?L:'"'===d[3]?N:j):s===N||s===j?s=L:s===z||s===H?s=M:(s=L,o=void 0);const p=s===L&&e[n+1].startsWith("/>")?" ":"";r+=s===M?t+C:c>=0?(a.push(i),t.slice(0,c)+E+t.slice(c)+D+p):t+D+(-2===c?n:p)}return[Y(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=G.createElement(d,i),B.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=B.nextNode())&&n.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=c[r++],i=a.getAttribute(e).split(D),s=/([.?@])?(.*)/.exec(t);n.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?ee:"?"===s[1]?te:"@"===s[1]?ie:Q}),a.removeAttribute(e)}else e.startsWith(D)&&(n.push({type:6,index:o}),a.removeAttribute(e));if(V.test(a.tagName)){const e=a.textContent.split(D),t=e.length-1;if(t>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],A()),B.nextNode(),n.push({type:2,index:++o});a.append(e[t],A())}}}else if(8===a.nodeType)if(a.data===P)n.push({type:2,index:o});else{let e=-1;for(;-1!==(e=a.data.indexOf(D,e+1));)n.push({type:7,index:o}),e+=D.length-1}o++}}static createElement(e,t){const i=I.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,a){if(t===U)return t;let o=void 0!==a?i._$Co?.[a]:i._$Cl;const r=O(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(e),o._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=o:i._$Cl=o),void 0!==o&&(t=X(e,o._$AS(e,t.values),o,a)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??I).importNode(t,!0);B.currentNode=a;let o=B.nextNode(),r=0,s=0,n=i[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new Z(o,o.nextSibling,this,e):1===n.type?t=new n.ctor(o,n.name,n.strings,this,e):6===n.type&&(t=new ae(o,this,e)),this._$AV.push(t),n=i[++s]}r!==n?.index&&(o=B.nextNode(),r++)}return B.currentNode=I,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),O(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==U&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new J(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new G(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const o of e)a===t.length?t.push(i=new Z(this.O(A()),this.O(A()),this,this.options)):i=t[a],i._$AI(o),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,a){const o=this.strings;let r=!1;if(void 0===o)e=X(this,e,t,0),r=!O(e)||e!==this._$AH&&e!==U,r&&(this._$AH=e);else{const a=e;let s,n;for(e=o[0],s=0;s<o.length-1;s++)n=X(this,a[i+s],t,s),n===U&&(n=this._$AH[s]),r||=!O(n)||n!==this._$AH[s],n===F?e=F:e!==F&&(e+=(n??"")+o[s+1]),this._$AH[s]=n}r&&!a&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class ie extends Q{constructor(e,t,i,a,o){super(e,t,i,a,o),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??F)===U)return;const i=this._$AH,a=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==F&&(i===F||a);a&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const oe=x.litHtmlPolyfillSupport;oe?.(G,Z),(x.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;class se extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let o=a._$litPart$;if(void 0===o){const e=i?.renderBefore??null;a._$litPart$=o=new Z(t.insertBefore(A(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}}se._$litElement$=!0,se.finalized=!0,re.litElementHydrateSupport?.({LitElement:se});const ne=re.litElementPolyfillSupport;ne?.({LitElement:se}),(re.litElementVersions??=[]).push("4.2.2");const de=r`
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
      /* ── Tab Select ── */
      .tab-select-wrap {
        position: relative;
        width: 100%;
        margin-bottom: 16px;
      }
      .tab-select-trigger {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t2);
        font-family: inherit;
        font-size: 13px;
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
        --mdc-icon-size: 16px;
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
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        max-height: 280px;
        overflow-y: auto;
        border-radius: var(--radius-lg);
        padding: 4px;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        z-index: 20;
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.1) transparent;
      }
      .tab-select-menu::-webkit-scrollbar { width: 4px; }
      .tab-select-menu::-webkit-scrollbar-track { background: transparent; }
      .tab-select-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      .tab-select-menu::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      .tab-select-wrap.open .tab-select-menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }
      .tab-select-search {
        width: calc(100% - 8px);
        margin: 4px;
        padding: 7px 10px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b1);
        background: var(--s1);
        color: var(--t1);
        font-family: inherit;
        font-size: 11px;
        outline: none;
      }
      .tab-select-search::placeholder { color: var(--t4); }
      .tab-select-option {
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
        --mdc-icon-size: 16px;
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
      .preview-title-dash {
        display: flex; align-items: center; justify-content: center;
        padding: 2px 0;
      }
      .preview-dash-line {
        width: 20px; height: 2px; border-radius: 1px;
        background: var(--t4);
        transition: all var(--t-med);
      }

      /* ── Chip (UI kit) ── */
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
      .chip.active { background: var(--s4); border-color: var(--b3); color: var(--t1); }
      .chip ha-icon {
        --mdc-icon-size: 14px;
        display: flex; align-items: center; justify-content: center;
      }
      @media (pointer: coarse) {
        .chip:active { transform: scale(0.94); }
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
        background: var(--s1); margin-bottom: 8px;
      }
      .title-source-header {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 12px;
      }
      .title-source-block.dragging {
        opacity: 0.4;
      }
      .title-source-block.drop-target {
        border-color: var(--c-accent);
        box-shadow: 0 0 0 1px var(--c-accent);
      }
      .title-source-header ha-icon {
        --mdc-icon-size: 16px; color: var(--t3);
        display: flex; align-items: center; justify-content: center;
      }
      .title-source-type {
        font-size: 12px; font-weight: 600; color: var(--t2);
      }
      .title-source-badge {
        font-size: 9px; font-weight: 700; color: var(--t4);
        background: var(--s3); border-radius: var(--radius-full);
        padding: 1px 6px;
      }
      .title-source-body {
        padding: 0 12px 12px;
        display: flex; flex-direction: column; gap: 8px;
      }
      .title-source-field {
        display: flex; flex-direction: column; gap: 4px;
      }
      .title-source-field-label {
        font-size: 10px; font-weight: 600; color: var(--t4);
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .title-mode-header {
        display: flex; align-items: center; gap: 6px;
      }
      .title-mode-header .drag-handle {
        cursor: grab; opacity: 0.4; display: flex; align-items: center;
        --mdc-icon-size: 16px;
      }
      .title-mode-header .drag-handle:hover { opacity: 0.7; }
      .title-mode-id {
        flex: 1;
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

      /* ── Cover preview ── */
      .preview-cover {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px;
      }
      .preview-cover-card {
        border-radius: var(--radius-lg);
        overflow: hidden;
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
        transition-delay: 0.1s;
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
      .check-desc {
        display: block;
        font-size: 9px;
        color: var(--t4);
        margin-top: 1px;
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
      .btn-sm {
        height: 28px;
        padding: 0 10px;
        font-size: 11px;
        border-radius: var(--radius-md);
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
`,ce={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b},le=(e=ce,t,i)=>{const{kind:a,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,o,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const o=this[a];t.call(this,i),this.requestUpdate(a,o,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function pe(e){return(t,i)=>"object"==typeof i?le(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return pe({...e,state:!0,attribute:!1})}const _e=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}},ue=r`
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
`,ge=r`
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
    animation: marquee-scroll var(--marquee-duration, 8s) linear infinite;
    will-change: transform;
  }
  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;const me=r`
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.94); }
    100% { transform: scale(1); }
  }
`;function ve(e,t){const i=t,a=i*(1-Math.abs(e/60%2-1));let o=0,r=0,s=0;e<60?(o=i,r=a):e<120?(o=a,r=i):e<180?(r=i,s=a):e<240?(r=a,s=i):e<300?(o=a,s=i):(o=i,s=a);const n=1-i;return[Math.round(255*(o+n)),Math.round(255*(r+n)),Math.round(255*(s+n))]}function fe(e){const{h:t,s:i}=function(e){const t=e[0]/255,i=e[1]/255,a=e[2]/255,o=Math.max(t,i,a),r=o-Math.min(t,i,a);let s=0;return 0!==r&&(s=o===t?((i-a)/r+6)%6*60:o===i?60*((a-t)/r+2):60*((t-i)/r+4)),{h:s,s:0===o?0:r/o}}(e),a=Math.min(i,1),o=t*Math.PI/180;return{x:Math.cos(o)*a*50+50,y:Math.sin(o)*a*50+50}}function be(e){return fe(function(e){return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)]}(e))}function ye(e){const t=e.getBoundingClientRect(),i=Math.round(t.width)||220,a=window.devicePixelRatio||1;e.width=i*a,e.height=i*a;const o=e.getContext("2d");if(!o)return;o.scale(a,a);const r=i/2,s=i/2,n=i/2;for(let d=0;d<360;d++){const e=(d-1)*Math.PI/180,t=(d+1)*Math.PI/180,i=o.createRadialGradient(r,s,0,r,s,n),[a,c,l]=ve(d,1);i.addColorStop(0,"#ffffff"),i.addColorStop(1,`rgb(${a},${c},${l})`),o.beginPath(),o.moveTo(r,s),o.arc(r,s,n,e,t),o.closePath(),o.fillStyle=i,o.fill()}}r`
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
`,r`
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
`;const we={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store",dc_window:"Fenêtre",dc_damper:"Clapet"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce."},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",distance_m:"m",distance_km:"km"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Barre de nav","tab_popup":"Popup Pièce","tab_light":"Carte Lumières","preview":"Aperçu","navbar_behavior":"Comportement","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","navbar_rooms_banner":"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.","navbar_visible_rooms":"Pièces visibles","navbar_empty_rooms":"Pièces vides","navbar_empty_rooms_desc":"Ces pièces n\'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu\'elles apparaissent dans la navbar.","navbar_indicators":"Indicateurs","navbar_indicators_desc":"Activez ou désactivez les indicateurs visuels sur la navbar.","navbar_ind_lights":"Lumières allumées","navbar_ind_lights_desc":"Glow doré sur l\'icône","navbar_ind_temp":"Température","navbar_ind_temp_desc":"Badge chaud / froid","navbar_ind_humidity":"Humidité","navbar_ind_humidity_desc":"Barre bleue en bas","navbar_ind_media":"Média en lecture","navbar_ind_media_desc":"Bounce de l\'icône","navbar_thresholds":"Seuils","navbar_thresholds_desc":"Définissez les seuils pour les alertes de température et d\'humidité.","navbar_temp_high":"Température haute","navbar_temp_low":"Température basse","navbar_humidity_threshold":"Seuil humidité","navbar_choose_icon":"Choisir icône","navbar_change_icon_aria":"Changer l\'icône de {name}","navbar_icon_label":"Icône — {name}","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Carte Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_hourly":"Prévisions horaires","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","tab_title":"Carte Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Carte Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Carte Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Carte Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Carte Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Carte Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Carte Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Carte Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","dashboard_card_fan":"Carte Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Carte Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Carte Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Carte Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Carte Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_entities":"Volets du tableau de bord","cover_dashboard_entities_desc":"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_spotify":"Carte Spotify","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Entité lecteur Spotify","spotify_entity_desc":"Sélectionnez l\'entité media_player Spotify à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Sélectionnez les enceintes affichées dans le popup de lecture. Si aucune n\'est sélectionnée, toutes les enceintes sont affichées.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room."},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",distance_m:"m",distance_km:"km"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","tab_navbar":"Navbar","tab_popup":"Room Popup","tab_light":"Light Card","preview":"Preview","navbar_behavior":"Behavior","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","navbar_rooms_banner":"Drag to reorder rooms. Toggle to hide.","navbar_visible_rooms":"Visible rooms","navbar_empty_rooms":"Empty rooms","navbar_empty_rooms_desc":"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.","navbar_indicators":"Indicators","navbar_indicators_desc":"Enable or disable visual indicators on the navbar.","navbar_ind_lights":"Lights on","navbar_ind_lights_desc":"Golden glow on icon","navbar_ind_temp":"Temperature","navbar_ind_temp_desc":"Hot / cold badge","navbar_ind_humidity":"Humidity","navbar_ind_humidity_desc":"Blue bar at bottom","navbar_ind_media":"Media playing","navbar_ind_media_desc":"Icon bounce","navbar_thresholds":"Thresholds","navbar_thresholds_desc":"Set thresholds for temperature and humidity alerts.","navbar_temp_high":"High temperature","navbar_temp_low":"Low temperature","navbar_humidity_threshold":"Humidity threshold","navbar_choose_icon":"Choose icon","navbar_change_icon_aria":"Change icon for {name}","navbar_icon_label":"Icon — {name}","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather Card","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_hourly":"Hourly forecast","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","tab_title":"Title Card","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_add_source":"Add a source","title_remove_source":"Remove source","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title Card","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather Card","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Light Card","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Cover Card","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify Card","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media Card","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media Card","dashboard_card_media_desc":"Shows media players with transport controls","dashboard_card_fan":"Fan Card","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence Card","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence Card","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fan Card","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Cover Card","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_entities":"Dashboard covers","cover_dashboard_entities_desc":"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_spotify":"Spotify Card","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player entity","spotify_entity_desc":"Select the Spotify media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Select which speakers appear in the playback popup. If none are selected, all speakers are shown.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings"}')}},xe="fr";let $e=xe;function ke(e){const t=e.slice(0,2).toLowerCase(),i=t in we?t:xe;return i!==$e&&($e=i,!0)}function Se(){return $e}function Ee(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),o=-1===i?"":e.slice(i+1),r=we[$e]??we[xe],s=we[xe],n=r?.[a]?.[o]??s?.[a]?.[o];let d="string"==typeof n?n:e;if(t)for(const[c,l]of Object.entries(t))d=d.replaceAll(`{${c}}`,String(l));return d}var De=Object.defineProperty,Pe=(e,t,i,a)=>{for(var o,r=void 0,s=e.length-1;s>=0;s--)(o=e[s])&&(r=o(t,i,r)||r);return r&&De(t,i,r),r};class Ce extends se{constructor(){super(...arguments),this._lang=Se(),this._busCleanups=[],this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&ke(this.hass.language)&&(this._lang=Se())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0)}_listen(e,t){this._busCleanups.push(_e.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function Ie(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&function(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}(t,i)===e)}Pe([pe({attribute:!1})],Ce.prototype,"hass"),Pe([he()],Ce.prototype,"_lang");class Ae{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}const Oe=["light","media_player","climate","fan","cover","vacuum"],Re=new Set(["light","media_player","cover","fan"]),Te={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",vacuum:"mdi:robot-vacuum"},Me={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};const ze=["mdi:sofa","mdi:stove","mdi:bed","mdi:desk","mdi:shower","mdi:home","mdi:movie-open","mdi:music","mdi:wrench","mdi:flower","mdi:white-balance-sunny","mdi:weather-night","mdi:lightbulb","mdi:snowflake","mdi:fire","mdi:lock"],He={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"]};function Le(e,t,i,a){const o=He[t.deviceClass]||He.shutter,r=e.hass?.states[t.entityId],s="open"===r?.state||"opening"===r?.state,n=r?.attributes.current_position;return q`
    <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;${i?"min-width:0;overflow:hidden;":"grid-column:1/-1;"}${a?"padding-left:8px;border-left:1px solid var(--b2);":""}">
      <div style="width:22px;height:22px;border-radius:6px;background:${s?"rgba(167,139,250,0.1)":"var(--s2)"};border:1px solid ${s?"rgba(167,139,250,0.15)":"var(--b1)"};display:flex;align-items:center;justify-content:center;">
        <ha-icon .icon=${o[s?0:1]} style="--mdc-icon-size:13px;color:${s?"#a78bfa":"var(--t3)"};display:flex;align-items:center;justify-content:center;${s?"filter:drop-shadow(0 0 4px rgba(167,139,250,0.4));":""}"></ha-icon>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${t.name}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
          <span style="font-size:8px;color:${s?"rgba(167,139,250,0.6)":"var(--t4)"};">${Ee(s?"cover.open":"cover.closed")}</span>
        </div>
      </div>
      ${i||void 0===n?F:q`
        <span style="font-size:12px;font-weight:700;color:${s?"#a78bfa":"var(--t3)"};font-variant-numeric:tabular-nums;">${n}<span style="font-size:8px;font-weight:500;">%</span></span>
      `}
      <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${s?"#a78bfa":"var(--t4)"};${s?"box-shadow:0 0 6px rgba(167,139,250,0.4);":""}"></div>
    </div>
  `}function je(e){const t=e._coverRoomEntities.filter(e=>e.visible),i=t.filter(t=>{const i=e.hass?.states[t.entityId];return"open"===i?.state||"opening"===i?.state}).length;return q`
    <div class="preview-cover">
      ${e._coverShowHeader?q`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${Ee("cover.title")}</span>
            <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:${i>0?"rgba(167,139,250,0.15)":"var(--s2)"};color:${i>0?"#a78bfa":"var(--t3)"};">${i}/${t.length}</span>
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
      `:F}
      <div class="preview-cover-card glass" style="padding:8px 10px;display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;">
        <!-- Tint -->
        <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#a78bfa,transparent 70%);opacity:${t.length>0?(i/t.length*.18).toFixed(3):"0"};"></div>
        ${0===t.length?q`
          <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);grid-column:1/-1;">—</div>
        `:F}
        ${function(e,t){const i=[];let a=0;for(;a<t.length;){const o=t[a];"compact"===o.layout&&a+1<t.length&&"compact"===t[a+1].layout?(i.push(Le(e,o,!0,!1)),i.push(Le(e,t[a+1],!0,!0)),a+=2):(i.push(Le(e,o,!1,!1)),a++)}return i}(e,t.slice(0,4))}
        ${t.length>4?q`
          <div style="font-size:9px;color:var(--t4);text-align:center;padding-top:2px;position:relative;z-index:1;grid-column:1/-1;">+${t.length-4}</div>
        `:F}
      </div>
    </div>
  `}function Ne(e,t,i,a){return new Date(t,i,a).getTime()}function Ve(e,t,i,a){const o=a?q`<div style="position:absolute;left:0;top:20%;bottom:20%;width:1px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.08) 30%,rgba(255,255,255,0.08) 70%,transparent);"></div>`:F;return q`
    <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;${i?"min-width:0;overflow:hidden;":"grid-column:1/-1;"}${a?"padding-left:8px;position:relative;":""}">
      ${o}
      <div style="width:22px;height:22px;border-radius:6px;background:${e.isOn?`${t}0.1)`:"var(--s2)"};border:1px solid ${e.isOn?`${t}0.15)`:"var(--b1)"};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <ha-icon .icon=${e.icon} style="--mdc-icon-size:13px;color:${e.isOn?"#818cf8":"var(--t3)"};display:flex;align-items:center;justify-content:center;${e.isOn?`filter:drop-shadow(0 0 4px ${t}0.4));animation:spin-fan-preview ${e.pct>50?"0.8":"1.5"}s linear infinite;`:""}"></ha-icon>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
          <span style="font-size:8px;color:${e.isOn?`${t}0.6)`:"var(--t4)"};">${e.isOn?`${e.pct}%`:Ee("fan.off")}</span>
          ${e.isOn?q`
            <span style="font-size:7px;color:var(--t4);">${Ee("fan.speed_step",{step:e.step,total:e.total})}</span>
          `:F}
        </div>
      </div>
      <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${e.isOn?"#818cf8":"var(--t4)"};${e.isOn?`box-shadow:0 0 6px ${t}0.4);`:""}"></div>
    </div>
  `}function qe(e){const t=e._fanRoomEntities.filter(e=>e.visible),i=0===t.length&&!e._fanRoom?[{name:"Ventilateur Salon",isOn:!0,pct:67,step:2,total:3,icon:"mdi:fan",layout:"compact"},{name:"Plafonnier Chambre",isOn:!0,pct:50,step:3,total:6,icon:"mdi:ceiling-fan",layout:"compact"},{name:"Extracteur SdB",isOn:!1,pct:0,step:0,total:3,icon:"mdi:fan",layout:"compact"}]:t.map(t=>{const i=e.hass?.states[t.entityId],a="on"===i?.state,o=i?.attributes?.percentage??0,r=i?.attributes?.percentage_step,s=i?.attributes?.speed_count,n=s??(r&&r>0?Math.round(100/r):3),d=a?Math.round(o/100*n):0;return{name:t.name,isOn:a,pct:o,step:d,total:n,icon:"mdi:fan",layout:t.layout}}),a=i.filter(e=>e.isOn).length,o="rgba(129,140,248,";return q`
    <style>
      @keyframes spin-fan-preview {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
    <div class="preview-fan">
      ${e._fanShowHeader?q`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${Ee("fan.title")}</span>
            <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:${a>0?`${o}0.15)`:"var(--s2)"};color:${a>0?"#818cf8":"var(--t3)"};">${a}/${i.length}</span>
          </div>
          <div style="width:28px;height:14px;border-radius:7px;background:${a>0?`${o}0.25)`:"var(--s2)"};position:relative;">
            <div style="width:10px;height:10px;border-radius:50%;background:${a>0?"#818cf8":"var(--t4)"};position:absolute;top:2px;${a>0?"right:2px;":"left:2px;"}transition:all var(--t-fast);"></div>
          </div>
        </div>
      `:F}
      <div class="preview-fan-card glass" style="padding:8px 10px;display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;">
        <!-- Tint -->
        <div style="grid-column:1/-1;position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#818cf8,transparent 70%);opacity:${i.length>0?(a/i.length*.18).toFixed(3):"0"};"></div>
        ${0===i.length?q`
          <div style="grid-column:1/-1;padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
        `:F}
        ${function(e,t){const i=[];let a=0;for(;a<e.length;){const o=e[a];if("compact"===o.layout){const r=a+1<e.length&&"compact"===e[a+1].layout?e[a+1]:null;r?(i.push(Ve(o,t,!0,!1)),i.push(Ve(r,t,!0,!0)),a+=2):(i.push(Ve(o,t,!1,!1)),a++)}else i.push(Ve(o,t,!1,!1)),a++}return i}(i,o)}
      </div>
    </div>
  `}const Ue=[{key:"input_select",label:"Input Select",icon:"mdi:form-select"},{key:"scenes",label:"Scènes",icon:"mdi:palette"},{key:"booleans",label:"Toggles",icon:"mdi:toggle-switch"}],Fe=["neutral","success","warning","info","accent","alert"],Ke={success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t4)"};function Be(e){const t=e._titleText;if(!t)return q`<div class="preview-empty">${Ee("config.title_title_placeholder")}</div>`;const i=[];for(const r of e._titleSources)if("input_select"===r.source_type&&r.entity&&e.hass){const t=e.hass.states[r.entity];if(t){const e=r.modes.find(e=>e.id===t.state);e?.color&&"neutral"!==e.color&&i.push(e.color)}}else if("booleans"===r.source_type&&e.hass)for(const t of r.modes)if("on"===e.hass.states[t.id]?.state){const e=t.color||"success";"neutral"!==e&&i.push(e)}const a=e._titleSources.length>0&&e._titleSources.some(e=>e.modes.length>0);let o="background:var(--t4);width:20px;";if(i.length>0){const e=i.map(e=>(e=>Ke[e]??(e.startsWith("#")?e:"var(--t4)"))(e)),t=Math.min(20+4*i.length,36);if(1===e.length)o=`background:${e[0]};width:${t}px;box-shadow:0 0 6px ${e[0]};`;else{const i=e.length;o=`background:linear-gradient(90deg, ${e.flatMap((e,t)=>[`${e} ${Math.round(t/i*100)}%`,`${e} ${Math.round((t+1)/i*100)}%`]).join(", ")});width:${t}px;box-shadow:${e.map(e=>`0 0 6px ${e}`).join(", ")};`}}return q`
    <div class="preview-title-card">
      <div class="preview-title-text">${t}</div>
      ${a?q`
        <div class="preview-title-dash">
          <div class="preview-dash-line" style="${o}"></div>
        </div>
      `:F}
    </div>
  `}function We(e){const t=e._titleSources;return q`
    <div class="tab-panel" id="panel-title">
      <div class="section-label">${Ee("config.title_title")}</div>
      <div class="section-desc">${Ee("config.title_title_desc")}</div>
      <input
        class="input"
        type="text"
        .value=${e._titleText}
        placeholder=${Ee("config.title_title_placeholder")}
        @input=${t=>{e._titleText=t.target.value}}
      />

      <div class="title-section-gap"></div>

      <div class="section-label">${Ee("config.title_mode_source")}</div>
      <div class="section-desc">${Ee("config.title_mode_source_desc")}</div>

      <!-- Existing sources -->
      ${t.map((t,i)=>function(e,t,i){const a=e._titleEditingSourceIdx===i,o=Ue.find(e=>e.key===t.source_type),r=t.label||o?.label||t.source_type,s=e._dragIdx===i&&"title_sources"===e._dragContext,n=e._dropIdx===i&&"title_sources"===e._dragContext;return q`
    <div
      class="title-source-block ${s?"dragging":""} ${n?"drop-target":""}"
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
        <ha-icon .icon=${o?.icon||"mdi:help"}></ha-icon>
        <span class="title-source-type">${r}</span>
        <span class="title-source-badge">${t.modes.length}</span>
        <div style="flex:1"></div>
        <button
          class="btn-icon xs"
          @click=${()=>{e._titleEditingSourceIdx=a?null:i,e._titleAddEntityDropdownOpen=!1}}
          aria-label="${a?"Collapse":"Expand"}"
        >
          <ha-icon .icon=${a?"mdi:pencil":"mdi:pencil-outline"}></ha-icon>
        </button>
        <button
          class="btn-icon xs"
          @click=${()=>e._removeTitleSource(i)}
          aria-label=${Ee("config.title_remove_source")}
        >
          <ha-icon .icon=${"mdi:close"}></ha-icon>
        </button>
      </div>

      ${a?q`
        <div class="title-source-body">
          <!-- Label -->
          <div class="title-source-field">
            <span class="title-source-field-label">${Ee("config.title_source_label")}</span>
            <input
              class="input"
              type="text"
              .value=${t.label}
              placeholder=${o?.label||""}
              @input=${t=>e._setTitleSourceLabel(i,t.target.value)}
            />
          </div>

          ${"input_select"===t.source_type?function(e,t,i){const a=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith("input_select.")).sort():[];return q`
    <div class="title-source-field">
      <span class="title-source-field-label">${Ee("config.title_mode_entity")}</span>
      <div class="dropdown ${e._titleEditingSourceIdx===i&&e._titleAddEntityDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._titleAddEntityDropdownOpen||(e._titleAddEntitySearch=""),e._titleAddEntityDropdownOpen=!e._titleAddEntityDropdownOpen}}
          aria-expanded=${e._titleAddEntityDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t.entity?"mdi:form-select":"mdi:help-circle-outline"}></ha-icon>
          <span>${t.entity||Ee("config.title_select_entity")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${Ee("config.search_entity")}
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
            ${Ee("title_card.mode_none")}
          </button>
          ${a.filter(t=>!e._titleAddEntitySearch||t.toLowerCase().includes(e._titleAddEntitySearch.toLowerCase())).map(a=>q`
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
  `}(e,t,i):F}

          <!-- Mode list -->
          ${t.modes.length>0?q`
            <div class="section-label" style="margin-top:10px;">${Ee("config.title_modes")}</div>
            <div class="title-modes-list">
              ${t.modes.map((a,o)=>function(e,t,i,a,o){let r=0;for(let d=0;d<i;d++)r+=e._titleSources[d].modes.length;r+=o;const s=e._dragIdx===o&&"title_modes"===e._dragContext&&e._dragModeSrcIdx===i,n=e._dropIdx===o&&"title_modes"===e._dragContext&&e._dragModeSrcIdx===i;return q`
    <div
      class="title-mode-row ${s?"dragging":""} ${n?"drop-target":""}"
      draggable="true"
      @dragstart=${()=>e._onDragStart(o,"title_modes",i)}
      @dragover=${t=>e._onDragOver(o,t,i)}
      @dragleave=${()=>e._onDragLeave()}
      @drop=${t=>e._onDropGeneric(o,t)}
      @dragend=${()=>e._onDragEnd()}
    >
      <div class="title-mode-header">
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <span class="title-mode-id">${a.id}</span>
        ${"scenes"===t.source_type||"booleans"===t.source_type?q`
          <button
            class="btn-icon xs"
            @click=${()=>e._removeTitleModeEntity(i,a.id)}
            aria-label=${Ee("config.title_remove_entity")}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        `:F}
      </div>
      <div class="title-mode-fields-row">
        <input
          class="input"
          type="text"
          placeholder=${Ee("config.title_mode_label")}
          .value=${a.label}
          @input=${t=>e._updateTitleMode(r,"label",t.target.value)}
        />
        <button
          class="title-icon-btn ${a.icon?"has-icon":""}"
          @click=${()=>e._openIconPopup(r)}
          aria-label="${Ee("config.title_mode_icon")}"
        >
          <ha-icon .icon=${a.icon||"mdi:emoticon-outline"}></ha-icon>
        </button>
      </div>
      <div class="title-color-row">
        <span class="title-color-label">${Ee("config.title_mode_color")}</span>
        <div class="title-color-chips">
          ${Fe.map(t=>q`
            <button
              class="title-color-chip ${t} ${a.color===t?"active":""}"
              @click=${()=>e._updateTitleMode(r,"color",t)}
              aria-label="${Ee("config.title_mode_color")}: ${t}"
            ></button>
          `)}
          ${a.color?.startsWith("#")?q`
            <button
              class="title-color-chip custom active"
              style="background:${a.color}"
              @click=${()=>e._openColorPicker(r)}
              aria-label="${Ee("config.title_color_picker_aria")}"
            ></button>
          `:F}
          <button
            class="title-color-picker-btn"
            @click=${()=>e._openColorPicker(r)}
            aria-label="${Ee("config.title_color_picker_aria")}"
          ></button>
        </div>
      </div>
    </div>
  `}(e,t,i,a,o))}
            </div>
          `:F}

          ${"scenes"===t.source_type||"booleans"===t.source_type?function(e,t,i){const a="scenes"===t.source_type?"scene.":"input_boolean.",o="scenes"===t.source_type?"mdi:palette":"mdi:toggle-switch",r=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith(a)).sort():[],s=new Set(t.modes.map(e=>e.id)),n=r.filter(e=>!s.has(e));return q`
    <div class="title-source-field">
      <span class="title-source-field-label">${Ee("config.title_add_entity")}</span>
      <div class="dropdown ${e._titleEditingSourceIdx===i&&e._titleAddEntityDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._titleAddEntityDropdownOpen||(e._titleAddEntitySearch=""),e._titleAddEntityDropdownOpen=!e._titleAddEntityDropdownOpen}}
          aria-expanded=${e._titleAddEntityDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          <span>${Ee("config.title_add_entity")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          <input
            class="dropdown-search"
            type="text"
            placeholder=${Ee("config.search_entity")}
            .value=${e._titleAddEntitySearch}
            @input=${t=>{e._titleAddEntitySearch=t.target.value,e.requestUpdate()}}
            @click=${e=>e.stopPropagation()}
          />
          ${n.filter(t=>!e._titleAddEntitySearch||t.toLowerCase().includes(e._titleAddEntitySearch.toLowerCase())).map(t=>q`
              <button
                class="dropdown-item"
                role="option"
                @click=${()=>e._addTitleModeEntity(i,t)}
              >
                <ha-icon .icon=${o}></ha-icon>
                ${t}
              </button>
            `)}
        </div>
      </div>
    </div>
  `}(e,t,i):F}
        </div>
      `:F}
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
            <span>${Ee("config.title_add_source")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${Ue.map(t=>q`
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

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadTitleConfig()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}function Ye(e,t){let i=e._cpCanvas;const a=e.shadowRoot?.querySelector(".cp-wheel-wrap canvas");if(a&&a!==i&&(e._cpCanvas=a,ye(a),i=a),!i)return;const o=function(e,t,i){const a=e.getBoundingClientRect(),o=t-a.left-a.width/2,r=i-a.top-a.height/2,s=a.width/2,n=Math.sqrt(o*o+r*r),d=Math.min(n,s),c=(180*Math.atan2(r,o)/Math.PI%360+360)%360,l=d/s,p=ve(c,l),h=function(e){return"#"+e.map(e=>e.toString(16).padStart(2,"0")).join("")}(p),_=n>0?d/n:1;return{rgb:p,hex:h,hs:{h:c,s:l},pos:{x:o*_/s*50+50,y:r*_/s*50+50}}}(i,"touches"in t?t.touches[0].clientX:t.clientX,"touches"in t?t.touches[0].clientY:t.clientY);e._colorPickerHex=o.hex,e._colorPickerPos=o.pos}var Ge=Object.defineProperty,Xe=(e,t,i,a)=>{for(var o,r=void 0,s=e.length-1;s>=0;s--)(o=e[s])&&(r=o(t,i,r)||r);return r&&Ge(t,i,r),r};const Je=class e extends se{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=Se(),this._tab="dashboard",this._tabSelectOpen=!1,this._tabSearch="",this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._cards=[],this._scenes=[],this._lights=[],this._lightRoom="",this._lightDropdownOpen=!1,this._iconPickerRoom=null,this._dropdownOpen=!1,this._toast=!1,this._saving=!1,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._showMedia=!0,this._autoSort=!0,this._tempHigh=24,this._tempLow=17,this._humidityThreshold=65,this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherShowHeader=!0,this._weatherDropdownOpen=!1,this._titleText="",this._titleSources=[],this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._titleAddEntitySearch="",this._iconPopupModeIdx=null,this._iconSearch="",this._iconList=[],this._colorPickerModeIdx=null,this._colorPickerHex="#ffffff",this._colorPickerPos={x:50,y:50},this._cpCanvas=null,this._lightShowHeader=!0,this._coverShowHeader=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._coverPresets=[0,25,50,75,100],this._coverEntityPresets={},this._coverRoom="",this._coverRoomDropdownOpen=!1,this._coverRoomEntities=[],this._coverPresetInput="",this._coverEntityPresetInput={},this._coverPresetsExpandedEntity=null,this._fanShowHeader=!0,this._fanRoom="",this._fanRoomDropdownOpen=!1,this._fanRoomEntities=[],this._presenceShowHeader=!0,this._presencePersonEntities=[],this._presenceSmartphoneSensors={},this._presenceNotifyServices={},this._presenceDrivingSensors={},this._presenceDropdownOpen=null,this._presenceDropdownSearch="",this._mediaShowHeader=!0,this._mediaExtraEntities={},this._mediaRoom="",this._mediaRoomDropdownOpen=!1,this._mediaRoomNativePlayers=[],this._mediaAddDropdownOpen=!1,this._mediaEntitySearch="",this._spotifyShowHeader=!0,this._spotifyEntity="",this._spotifySortOrder="recent_first",this._spotifyDropdownOpen=!1,this._spotifyMaxItems=6,this._spotifyVisibleSpeakers=[],this._spotifyConfigured=null,this._dashboardEnabledCards=["weather"],this._dashboardCardOrder=["title","weather","light","media","fan","cover","spotify","presence"],this._dashboardHideHeader=!1,this._dashboardHideSidebar=!1,this._dashboardExpanded=new Set,this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._dragModeSrcIdx=null,this._loaded=!1,this._loading=!1,this._configReady=!1,this._suppressAutoSave=!1,this._toastError=!1,this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this),this._initialIcons=new Map,this._iconLoading=!1}get _titleModes(){return this._titleSources.flatMap(e=>e.modes)}static{this._AUTO_SAVE_KEYS=new Set(["_rooms","_cards","_scenes","_showLights","_showTemperature","_showHumidity","_showMedia","_autoSort","_tempHigh","_tempLow","_humidityThreshold","_weatherEntity","_weatherHiddenMetrics","_weatherShowDaily","_weatherShowHourly","_weatherShowHeader","_titleText","_titleSources","_lightShowHeader","_lights","_coverShowHeader","_coverDashboardEntities","_coverDashboardOrder","_coverPresets","_coverEntityPresets","_coverRoomEntities","_fanShowHeader","_fanRoomEntities","_presenceShowHeader","_presencePersonEntities","_presenceSmartphoneSensors","_presenceNotifyServices","_presenceDrivingSensors","_mediaShowHeader","_mediaExtraEntities","_spotifyShowHeader","_spotifyEntity","_spotifySortOrder","_spotifyMaxItems","_spotifyVisibleSpeakers","_dashboardEnabledCards","_dashboardCardOrder","_dashboardHideHeader","_dashboardHideSidebar"])}static{this.styles=[ue,ge,me,de]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,document.removeEventListener("click",this._boundCloseDropdowns),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),void 0!==this._autoSaveTimer&&(clearTimeout(this._autoSaveTimer),this._autoSaveTimer=void 0),this._cancelColorDrag?.(),this._cancelColorDrag=void 0,this._backend=void 0}_closeDropdownsOnOutsideClick(e){if(!(this._dropdownOpen||this._lightDropdownOpen||this._weatherDropdownOpen||this._titleAddSourceDropdownOpen||this._titleAddEntityDropdownOpen||this._coverRoomDropdownOpen||this._fanRoomDropdownOpen||this._spotifyDropdownOpen||this._presenceDropdownOpen||this._tabSelectOpen))return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown, .tab-select-wrap");for(const o of a)if(t.includes(o))return;this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._coverRoomDropdownOpen=!1,this._fanRoomDropdownOpen=!1,this._mediaRoomDropdownOpen=!1,this._spotifyDropdownOpen=!1,this._presenceDropdownOpen=null,this._tabSelectOpen=!1,this._tabSearch=""}updated(t){if(super.updated(t),t.has("hass")&&(this.hass?.language&&ke(this.hass.language)&&(this._lang=Se()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1,this._configReady=!1),!this.hass||this._loaded||this._loading||(this._backend=new Ae(this.hass),this._loadConfig())),this._loaded&&!this._loading&&!this._saving)if(this._configReady){if(this._suppressAutoSave)this._suppressAutoSave=!1;else for(const i of t.keys())if(e._AUTO_SAVE_KEYS.has(i)){this._scheduleAutoSave();break}}else this._configReady=!0}_beginSuppressAutoSave(){this._suppressAutoSave=!0}_scheduleAutoSave(){void 0!==this._autoSaveTimer&&clearTimeout(this._autoSaveTimer),this._autoSaveTimer=setTimeout(()=>{this._autoSaveTimer=void 0,this._saving||this._save()},800)}async _loadConfig(){if(this.hass&&!this._loading){this._loading=!0;try{await this._loadConfigInner(),this._loaded=!0}catch{this._loaded=!1}finally{this._loading=!1}}}async _loadConfigInner(){if(!this.hass)return;const e=Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let t={room_order:[],hidden_rooms:[],show_lights:!0,show_temperature:!0,show_humidity:!0,show_media:!0,auto_sort:!0,temp_high:24,temp_low:17,humidity_threshold:65},i={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},a={enabled_cards:["weather"],card_order:["title","weather","light","media","fan","cover","spotify","presence"],hide_header:!1,hide_sidebar:!1},o={show_header:!0},r={title:"",sources:[]},s={show_header:!0,dashboard_entities:[],presets:[0,25,50,75,100],entity_presets:{}},n={show_header:!0,entity_id:"",sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},d={show_header:!0},c={variant:"list",dashboard_variant:"list",room_variants:{},extra_entities:{},show_header:!0},l={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}};const p={};try{if(!this._backend)throw new Error("No backend");const e=await this._backend.send("get_config");t=e.navbar,Object.assign(p,e.rooms),e.weather&&(i=e.weather),e.light_card&&(o=e.light_card),e.title_card&&(r=e.title_card),e.cover_card&&(s=e.cover_card),e.fan_card&&(d=e.fan_card),e.spotify_card&&(n=e.spotify_card),e.media_card&&(c=e.media_card),e.presence_card&&(l=e.presence_card),e.dashboard&&(a=e.dashboard)}catch{}this._showLights=t.show_lights??!0,this._showTemperature=t.show_temperature??!0,this._showHumidity=t.show_humidity??!0,this._showMedia=t.show_media??!0,this._autoSort=t.auto_sort??!0,this._tempHigh=t.temp_high??24,this._tempLow=t.temp_low??17,this._humidityThreshold=t.humidity_threshold??65,this._weatherEntity=i.entity_id??"",this._weatherHiddenMetrics=i.hidden_metrics??[],this._weatherShowDaily=i.show_daily??!0,this._weatherShowHourly=i.show_hourly??!0,this._weatherShowHeader=i.show_header??!0,this._lightShowHeader=o.show_header??!0,this._titleText=r.title??"",this._titleSources=(r.sources??[]).map(e=>({source_type:e.source_type||"",entity:e.entity||"",label:e.label||"",modes:(e.modes||[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"}))})),this._coverShowHeader=s.show_header??!0,this._fanShowHeader=d.show_header??!0,this._coverDashboardEntities=s.dashboard_entities??[],this._coverPresets=s.presets??[0,25,50,75,100],this._coverEntityPresets=s.entity_presets??{},this._initCoverDashboardOrder(),this._spotifyShowHeader=n.show_header??!0,this._spotifyEntity=n.entity_id??"",this._spotifySortOrder="oldest_first"===n.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=n.max_items_per_section??6,this._spotifyVisibleSpeakers=n.visible_speakers??[],this._checkSpotifyStatus(),this._mediaShowHeader=c.show_header??!0,this._mediaExtraEntities=c.extra_entities??{},this._presenceShowHeader=l.show_header??!0,this._presencePersonEntities=l.person_entities??[],this._presenceSmartphoneSensors=l.smartphone_sensors??{},this._presenceNotifyServices=l.notify_services??{},this._presenceDrivingSensors=l.driving_sensors??{},this._dashboardEnabledCards=a.enabled_cards??["weather"],this._dashboardCardOrder=a.card_order??["title","weather","light","media","cover","spotify","presence"],this._dashboardHideHeader=a.hide_header??!1,this._dashboardHideSidebar=a.hide_sidebar??!1;const h=new Set(t.hidden_rooms),_=new Map;t.room_order.forEach((e,t)=>_.set(e,t));const u=this.hass;if(!u)return;const g=[],m=[];for(const v of e){const e=Ie(v.area_id,u.entities,u.devices),t=p[v.area_id]?.icon,i=t||v.icon||"mdi:home";if(0===e.length){m.push({areaId:v.area_id,name:v.name,icon:i});continue}let a=0,o=null,r=null,s=null,n=null,d=!1;for(const c of e){const e=u.states[c.entity_id];if(!e)continue;const t=c.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&a++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||o||(o=`${e.state}°`,r=parseFloat(e.state)),"humidity"!==t||s||(s=`${e.state}%`,n=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(d=!0)}g.push({areaId:v.area_id,name:v.name,icon:i,entityCount:e.length,visible:!h.has(v.area_id),lightsOn:a,temperature:o,tempValue:r,humidity:s,humidityValue:n,mediaPlaying:d})}this._initialIcons.clear();for(const v of g)this._initialIcons.set(v.areaId,v.icon);g.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=_.get(e.areaId),a=_.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._rooms=g,this._emptyRooms=m,!this._selectedRoom&&g.length>0&&(this._selectedRoom=g[0].areaId),this._loadRoomCards()}async _loadRoomCards(){if(!this.hass||!this._selectedRoom)return this._cards=[],void(this._scenes=[]);const e=this._selectedRoom,t=Ie(e,this.hass.entities,this.hass.devices);let i=null,a=new Set,o=new Set,r=[];try{if(!this._backend)throw new Error("No backend");const t=await this._backend.send("get_room",{area_id:e});if(this._selectedRoom!==e)return;t&&(i=t.card_order.length>0?t.card_order:null,a=new Set(t.hidden_entities),o=new Set(t.hidden_scenes??[]),r=t.scene_order??[])}catch{}const s=this.hass,n=t.filter(e=>e.entity_id.startsWith("scene.")),d=new Map;r.forEach((e,t)=>d.set(e,t));const c=n.map(e=>{const t=s.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!o.has(e.entity_id)}});c.sort((e,t)=>{const i=d.get(e.entityId),a=d.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._scenes=c;const l=new Map;for(const _ of t){if(a.has(_.entity_id))continue;const e=_.entity_id.split(".")[0];l.set(e,(l.get(e)||0)+1)}const p=i?[...i]:[...Oe],h=new Set(p);for(const _ of l.keys())!h.has(_)&&Te[_]&&p.push(_);this._cards=p.filter(e=>(l.get(e)||0)>0&&Re.has(e)).map(e=>{const t=function(e){const t=Me[e];return{nameKey:t?t.name:null,icon:Te[e]||"mdi:help-circle",descKey:t?t.desc:null}}(e),a=l.get(e)||0;return{id:e,nameKey:t.nameKey,icon:t.icon,descKey:t.descKey,count:a,visible:i?i.includes(e):a>0}})}_switchTab(e){this._tab=e,this._tabSelectOpen=!1,this._tabSearch="",this._iconPickerRoom=null,this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._coverRoomDropdownOpen=!1,this._fanRoomDropdownOpen=!1,this._mediaRoomDropdownOpen=!1,this._spotifyDropdownOpen=!1,this._presenceDropdownOpen=null,this._iconPopupModeIdx=null,this._colorPickerModeIdx=null,"light"===e&&!this._lightRoom&&this._rooms.length>0&&(this._lightRoom=this._rooms[0].areaId,this._loadRoomLights()),"cover"===e&&!this._coverRoom&&this._rooms.length>0&&(this._coverRoom=this._rooms[0].areaId,this._loadRoomCovers()),"fan"===e&&!this._fanRoom&&this._rooms.length>0&&(this._fanRoom=this._rooms[0].areaId,this._loadRoomFans()),"media"===e&&!this._mediaRoom&&this._rooms.length>0&&(this._mediaRoom=this._rooms[0].areaId,this._loadRoomMediaPlayers()),"cover"!==e&&"dashboard"!==e||0!==this._coverDashboardOrder.length||this._initCoverDashboardOrder()}_onDragStart(e,t,i){this._dragIdx=e,this._dragContext=t,"title_modes"===t&&(this._dragModeSrcIdx=i??null)}_onDragOver(e,t,i){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&("title_modes"===this._dragContext&&void 0!==i&&i!==this._dragModeSrcIdx||(this._dropIdx=e))}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("rooms"===i){const t=[...this._rooms],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._rooms=t}else if("cards"===i){const t=[...this._cards],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._cards=t}else if("scenes"===i){const t=[...this._scenes],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._scenes=t}else if("lights"===i){const t=[...this._lights],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._lights=t}else if("title_sources"===i){const t=[...this._titleSources],[i]=t.splice(this._dragIdx,1);if(t.splice(e,0,i),this._titleSources=t,this._titleEditingSourceIdx===this._dragIdx)this._titleEditingSourceIdx=e;else if(null!==this._titleEditingSourceIdx){const t=this._titleEditingSourceIdx,i=this._dragIdx;i<t&&e>=t?this._titleEditingSourceIdx=t-1:i>t&&e<=t&&(this._titleEditingSourceIdx=t+1)}}else if("title_modes"===i&&null!==this._dragModeSrcIdx){const t=[...this._titleSources],i=t[this._dragModeSrcIdx];if(i){const a=[...i.modes],[o]=a.splice(this._dragIdx,1);a.splice(e,0,o),t[this._dragModeSrcIdx]={...i,modes:a},this._titleSources=t}this._dragModeSrcIdx=null}this._dragIdx=null,this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragModeSrcIdx=null}_toggleRoomVisible(e){!function(e,t){const i=e._rooms.map(e=>e.areaId===t?{...e,visible:!e.visible}:e),a=i.filter(e=>e.visible),o=i.filter(e=>!e.visible);e._rooms=[...a,...o]}(this,e)}_openIconPicker(e){!function(e,t){e._iconPickerRoom=e._iconPickerRoom===t?null:t}(this,e)}_setRoomIcon(e,t){!function(e,t,i){e._rooms=e._rooms.map(e=>e.areaId===t?{...e,icon:i}:e),e._iconPickerRoom=null}(this,e,t)}_toggleCardVisible(e){!function(e,t){e._cards=e._cards.map(e=>e.id===t?{...e,visible:!e.visible}:e)}(this,e)}_toggleSceneVisible(e){!function(e,t){e._scenes=e._scenes.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}(this,e)}_selectRoom(e){!function(e,t){e._selectedRoom=t,e._dropdownOpen=!1,e._loadRoomCards()}(this,e)}async _saveNavbar(){const e=this._backend;if(e&&!this._saving){this._saving=!0;try{await e.send("set_navbar",{room_order:this._rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:this._rooms.filter(e=>!e.visible).map(e=>e.areaId),show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity,show_media:this._showMedia,auto_sort:this._autoSort,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold});const t=this._rooms.filter(e=>e.icon!==this._initialIcons.get(e.areaId)).map(t=>{const i=this.hass?.areas[t.areaId],a=i?.icon||"mdi:home",o=t.icon===a?null:t.icon;return e.send("set_room",{area_id:t.areaId,icon:o})});if(t.length>0&&await Promise.all(t),!this._mounted)return;this._showToast(),_e.emit("navbar-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _savePopup(){if(this._backend&&!this._saving&&this._selectedRoom){this._saving=!0;try{if(await this._backend.send("set_room",{area_id:this._selectedRoom,card_order:this._cards.filter(e=>e.visible).map(e=>e.id),hidden_scenes:this._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:this._scenes.map(e=>e.entityId)}),!this._mounted)return;this._showToast(),_e.emit("room-config-changed",{areaId:this._selectedRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}_save(){"navbar"===this._tab?this._saveNavbar():"popup"===this._tab?this._savePopup():"light"===this._tab?this._saveLights():"weather"===this._tab?this._saveWeather():"title"===this._tab?this._saveTitle():"cover"===this._tab?this._saveCover():"fan"===this._tab?this._saveFan():"spotify"===this._tab?this._saveSpotify():"media"===this._tab?this._saveMedia():"presence"===this._tab?this._savePresence():this._saveDashboard()}_selectLightRoom(e){this._beginSuppressAutoSave(),function(e,t){e._lightRoom=t,e._lightDropdownOpen=!1,e._loadRoomLights()}(this,e)}async _loadRoomLights(){if(this._beginSuppressAutoSave(),!this.hass||!this._lightRoom)return void(this._lights=[]);const e=this._lightRoom,t=Ie(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light."));let i=new Set,a=[],o={};try{if(!this._backend)throw new Error("No backend");const t=await this._backend.send("get_room",{area_id:e});if(this._lightRoom!==e)return;t&&(i=new Set(t.hidden_entities??[]),a=t.entity_order??[],o=t.entity_layouts??{})}catch{}const r=this.hass,s=new Map;a.forEach((e,t)=>s.set(e,t));const n=t.map(e=>{const t=r.states[e.entity_id],a="on"===t?.state,s=t?.attributes.brightness,n=a&&void 0!==s?Math.round(s/255*100):0;return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:a,brightnessPct:n,layout:o[e.entity_id]||"compact",visible:!i.has(e.entity_id)}});n.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=s.get(e.entityId),a=s.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._lights=n;try{if(this._backend){const t=await this._backend.send("get_schedules");if(this._lightRoom!==e)return;this._schedulesLoaded=t??{},this._scheduleEdits=new Map;for(const e of n){const t=this._schedulesLoaded[e.entityId];this._scheduleEdits.set(e.entityId,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}_toggleLightVisible(e){!function(e,t){e._lights=e._lights.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}(this,e)}_cycleLightLayout(e){!function(e,t){e._lights=e._lights.map(e=>e.entityId===t?{...e,layout:"full"===e.layout?"compact":"full"}:e)}(this,e)}_toggleScheduleExpand(e){!function(e,t){if(e._scheduleExpandedEntity=e._scheduleExpandedEntity===t?null:t,!e._scheduleEdits.has(t)){const i=e._schedulesLoaded[t];e._scheduleEdits.set(t,i?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}e.requestUpdate()}(this,e)}_addSchedulePeriod(e){!function(e,t){const i=e._scheduleEdits.get(t)??[];i.push({start:"",end:"",recurring:!1}),e._scheduleEdits.set(t,[...i]),e.requestUpdate()}(this,e)}_removeSchedulePeriod(e,t){!function(e,t,i){const a=e._scheduleEdits.get(t)??[];a.splice(i,1),e._scheduleEdits.set(t,[...a]),e.requestUpdate()}(this,e,t)}_updateSchedulePeriod(e,t,i,a){!function(e,t,i,a,o){const r=e._scheduleEdits.get(t)??[];r[i]&&(r[i]={...r[i],[a]:o},e._scheduleEdits.set(t,[...r]),e.requestUpdate())}(this,e,t,i,a)}_toggleScheduleRecurring(e,t){!function(e,t,i){const a=e._scheduleEdits.get(t)??[];a[i]&&(a[i]={...a[i],recurring:!a[i].recurring},e._scheduleEdits.set(t,[...a]),e.requestUpdate())}(this,e,t)}async _saveSchedule(e){if(!this._backend)return;const t=(this._scheduleEdits.get(e)??[]).filter(e=>e.start&&e.end);try{if(await this._backend.send("set_schedule",{entity_id:e,periods:t}),!this._mounted)return;this._showToast(),_e.emit("schedule-changed",{entityId:e})}catch{if(!this._mounted)return;this._showToast(!0)}}_parseDateTimeValue(e){return function(e,t){if(!t)return null;const[i,a]=t.split("T");if(!i)return null;const o=i.split("-").map(Number);if(o.length<3||o.some(isNaN))return null;const[r,s,n]=o,[d,c]=(a??"00:00").split(":");return{year:r,month:s-1,day:n,hour:d??"00",minute:c??"00"}}(0,e)}_openRangePicker(e,t){!function(e,t,i){e._pickerTarget={entityId:t,periodIdx:i};const a=(e._scheduleEdits.get(t)??[])[i],o=a?e._parseDateTimeValue(a.start):null,r=a?e._parseDateTimeValue(a.end):null,s=new Date;o?(e._pickerStartDay=o.day,e._pickerStartMonth=o.month,e._pickerStartYear=o.year,e._pickerStartHour=o.hour,e._pickerStartMinute=o.minute,e._pickerYear=o.year,e._pickerMonth=o.month):(e._pickerStartDay=null,e._pickerStartMonth=s.getMonth(),e._pickerStartYear=s.getFullYear(),e._pickerStartHour="00",e._pickerStartMinute="00",e._pickerYear=s.getFullYear(),e._pickerMonth=s.getMonth()),r?(e._pickerEndDay=r.day,e._pickerEndMonth=r.month,e._pickerEndYear=r.year,e._pickerEndHour=r.hour,e._pickerEndMinute=r.minute):(e._pickerEndDay=null,e._pickerEndMonth=s.getMonth(),e._pickerEndYear=s.getFullYear(),e._pickerEndHour="23",e._pickerEndMinute="59"),e._pickerPhase=o?r?"start":"end":"start",e._pickerOpen=!0}(this,e,t)}_closePicker(){var e;(e=this)._pickerOpen=!1,e._pickerTarget=null}_pickerPrevMonth(){var e;0===(e=this)._pickerMonth?(e._pickerMonth=11,e._pickerYear--):e._pickerMonth--}_pickerNextMonth(){var e;11===(e=this)._pickerMonth?(e._pickerMonth=0,e._pickerYear++):e._pickerMonth++}_pickerSelectDay(e,t){!function(e,t,i){if(!i)if("start"===e._pickerPhase){if(e._pickerStartDay=t,e._pickerStartMonth=e._pickerMonth,e._pickerStartYear=e._pickerYear,e._pickerPhase="end",null!==e._pickerEndDay){const i=new Date(e._pickerStartYear,e._pickerStartMonth,t).getTime();new Date(e._pickerEndYear,e._pickerEndMonth,e._pickerEndDay).getTime()<i&&(e._pickerEndDay=null)}}else{if(null!==e._pickerStartDay){const i=new Date(e._pickerStartYear,e._pickerStartMonth,e._pickerStartDay).getTime();if(new Date(e._pickerYear,e._pickerMonth,t).getTime()<i)return e._pickerStartDay=t,e._pickerStartMonth=e._pickerMonth,e._pickerStartYear=e._pickerYear,e._pickerEndDay=null,void(e._pickerPhase="start")}e._pickerEndDay=t,e._pickerEndMonth=e._pickerMonth,e._pickerEndYear=e._pickerYear}}(this,e,t)}_pickerSetTime(e,t){!function(e,t,i){const a=i.target.value.replace(/\D/g,"").slice(0,2),o=t.includes("Hour"),r=Math.min(o?23:59,Math.max(0,parseInt(a,10)||0)),s=String(r).padStart(2,"0");i.target.value=s,"startHour"===t?e._pickerStartHour=s:"startMinute"===t?e._pickerStartMinute=s:"endHour"===t?e._pickerEndHour=s:e._pickerEndMinute=s,e.requestUpdate()}(this,e,t)}_pickerConfirm(){!function(e){if(!e._pickerTarget||null===e._pickerStartDay||null===e._pickerEndDay)return;const{entityId:t,periodIdx:i}=e._pickerTarget,a=String(e._pickerStartMonth+1).padStart(2,"0"),o=String(e._pickerStartDay).padStart(2,"0"),r=String(e._pickerEndMonth+1).padStart(2,"0"),s=String(e._pickerEndDay).padStart(2,"0"),n=`${e._pickerStartYear}-${a}-${o}T${e._pickerStartHour}:${e._pickerStartMinute}`,d=`${e._pickerEndYear}-${r}-${s}T${e._pickerEndHour}:${e._pickerEndMinute}`;e._updateSchedulePeriod(t,i,"start",n),e._updateSchedulePeriod(t,i,"end",d),e._closePicker()}(this)}_toAbsDay(e,t,i){return Ne(0,e,t,i)}_getMonthDays(){return function(e){const t=e._pickerYear,i=e._pickerMonth,a=(new Date(t,i,1).getDay()+6)%7,o=new Date(t,i+1,0).getDate(),r=new Date(t,i,0).getDate(),s=new Date,n=s.getFullYear()===t&&s.getMonth()===i,d=s.getDate(),c=null!==e._pickerStartDay?Ne(0,e._pickerStartYear,e._pickerStartMonth,e._pickerStartDay):null,l=null!==e._pickerEndDay?Ne(0,e._pickerEndYear,e._pickerEndMonth,e._pickerEndDay):null,p=[],h=(e,t,i,a)=>{const o=Ne(0,i,a,e);return{day:e,otherMonth:t,today:!t&&n&&e===d,rangeStart:null!==c&&o===c,rangeEnd:null!==l&&o===l,inRange:null!==c&&null!==l&&o>c&&o<l}},_=0===i?11:i-1,u=0===i?t-1:t;for(let f=a-1;f>=0;f--)p.push(h(r-f,!0,u,_));for(let f=1;f<=o;f++)p.push(h(f,!1,t,i));const g=11===i?0:i+1,m=11===i?t+1:t,v=42-p.length;for(let f=1;f<=v;f++)p.push(h(f,!0,m,g));return p}(this)}_getMonthLabel(){return function(e){const t=new Date(e._pickerYear,e._pickerMonth,1),i="fr"===e._lang?"fr-FR":"en-US",a=t.toLocaleDateString(i,{month:"long"});return`${a.charAt(0).toUpperCase()}${a.slice(1)} ${e._pickerYear}`}(this)}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_renderDateTimePicker(){return function(e){const t=e._getMonthDays(),i=e._getDayLabels(),a=null!==e._pickerStartDay&&null!==e._pickerEndDay;return q`
    <div class="picker-overlay"
      @click=${t=>{t.target===t.currentTarget&&e._closePicker()}}
      @keydown=${t=>{"Escape"===t.key&&e._closePicker()}}
    >
      <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${Ee("config.light_schedule_title")}">
        <div class="picker-phase">
          <button
            class="picker-phase-btn ${"start"===e._pickerPhase?"active":""}"
            @click=${()=>{e._pickerPhase="start"}}
          >${Ee("config.light_schedule_start")}</button>
          <button
            class="picker-phase-btn ${"end"===e._pickerPhase?"active":""}"
            @click=${()=>{e._pickerPhase="end"}}
          >${Ee("config.light_schedule_end")}</button>
        </div>
        <div class="picker-header">
          <button class="picker-nav" @click=${()=>e._pickerPrevMonth()} aria-label="${Ee("config.light_schedule_prev_month_aria")}">
            <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
          </button>
          <span class="picker-month">${e._getMonthLabel()}</span>
          <button class="picker-nav" @click=${()=>e._pickerNextMonth()} aria-label="${Ee("config.light_schedule_next_month_aria")}">
            <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
          </button>
        </div>
        <div class="picker-grid">
          ${i.map(e=>q`<span class="picker-day-label">${e}</span>`)}
          ${t.map(t=>{const i=["picker-day",t.today?"today":"",t.rangeStart?"range-start":"",t.rangeEnd?"range-end":"",t.inRange?"in-range":"",t.otherMonth?"other-month":""].filter(Boolean).join(" ");return q`
              <button class=${i} @click=${()=>e._pickerSelectDay(t.day,t.otherMonth)}>${t.day}</button>
            `})}
        </div>
        <div class="picker-time-row">
          <div class="picker-time-group">
            <span class="picker-time-label">${Ee("config.light_schedule_start")}</span>
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
            <span class="picker-time-label">${Ee("config.light_schedule_end")}</span>
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
          ${Ee("config.light_schedule_confirm")}
        </button>
      </div>
    </div>
  `}(this)}async _saveLights(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_light_config",{show_header:this._lightShowHeader}),!this._lightRoom){if(!this._mounted)return;return this._showToast(),void _e.emit("light-config-changed",void 0)}let e=[];try{const t=await this._backend.send("get_room",{area_id:this._lightRoom});t&&(e=t.hidden_entities??[])}catch{}const t=new Set(this._lights.map(e=>e.entityId)),i=e.filter(e=>!t.has(e)),a=this._lights.filter(e=>!e.visible).map(e=>e.entityId),o={};for(const r of this._lights)"full"===r.layout&&(o[r.entityId]=r.layout);if(await this._backend.send("set_room",{area_id:this._lightRoom,entity_order:this._lights.map(e=>e.entityId),hidden_entities:[...i,...a],entity_layouts:o}),!this._mounted)return;this._showToast(),_e.emit("light-config-changed",void 0),_e.emit("room-config-changed",{areaId:this._lightRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}async _reset(){this._loading||(this._loaded=!1,await this._loadConfig(),this._lightRoom&&await this._loadRoomLights())}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_goBack(){history.back()}_renderNavbarPreview(){return function(e){const t=[...e._rooms.filter(e=>e.visible)];return e._autoSort&&t.sort((e,t)=>(e.lightsOn>0?0:1)-(t.lightsOn>0?0:1)),q`
    <div class="preview-navbar">
      ${t.map((t,i)=>{const a=e._showLights&&t.lightsOn>0,o=e._showHumidity&&null!==t.humidityValue&&t.humidityValue>=e._humidityThreshold,r=e._showMedia&&t.mediaPlaying,s=e._showTemperature&&null!==t.tempValue&&t.tempValue>=e._tempHigh,n=e._showTemperature&&null!==t.tempValue&&!s&&t.tempValue<=e._tempLow,d=["preview-nav-item",0===i?"active-preview":"",a?"has-light":"",o?"has-humidity":"",r?"has-music":"",s?"has-temp-hot":"",n?"has-temp-cold":""].filter(Boolean).join(" ");return q`
          <div class=${d}>
            ${s||n?q`
              <span class="preview-temp-badge">
                <ha-icon .icon=${s?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
              </span>
            `:F}
            <ha-icon .icon=${t.icon}></ha-icon>
            <div class="preview-nav-label"><span>${t.name}</span></div>
          </div>
        `})}
    </div>
  `}(this)}_renderPopupPreview(){return function(e){const t=e._rooms.find(t=>t.areaId===e._selectedRoom);if(!t)return q`<div class="preview-empty">${Ee("config.popup_select_room")}</div>`;const i=e._scenes.length>0,a=e._scenes.filter(e=>e.visible),o=["preview-popup-icon-box",t.lightsOn>0?"has-light":"",t.mediaPlaying?"has-music":""].filter(Boolean).join(" ");return q`
    <div class="preview-popup">
      <div class="preview-popup-header">
        <div class="preview-popup-header-left">
          <div class=${o}>
            <ha-icon .icon=${t.icon}></ha-icon>
          </div>
          <div class="preview-popup-scene-dash ${i?"visible":""}"></div>
        </div>
        <div class="preview-popup-info">
          <div class="preview-popup-name">${t.name}</div>
          <div class="preview-popup-meta">
            ${t.temperature?q`<span>${t.temperature}</span>`:F}
            ${t.humidity?q`<span>${t.humidity}</span>`:F}
          </div>
        </div>
        <div class="preview-popup-close">
          <ha-icon .icon=${"mdi:close"}></ha-icon>
        </div>
      </div>

      ${a.length>0?q`
        <div class="preview-popup-scenes">
          ${a.map(e=>q`
              <span class="preview-scene-chip">${e.name}</span>
            `)}
        </div>
      `:F}

      <div class="preview-popup-cards">
        ${e._cards.filter(e=>e.visible).map(e=>q`
            <div class="preview-card-slot">
              <ha-icon .icon=${e.icon}></ha-icon>
              <span class="preview-card-slot-name">${e.nameKey?Ee(e.nameKey):e.id}</span>
              <span class="preview-card-slot-count">${e.count}</span>
            </div>
          `)}
      </div>
    </div>
  `}(this)}_renderNavbarTab(){return q`
    <div class="tab-panel" id="panel-navbar">

      ${(e=this)._emptyRooms.length>0?q`
        <div class="section-label">${Ee("config.navbar_empty_rooms")}</div>
        <div class="section-desc">
          ${Ee("config.navbar_empty_rooms_desc")}
        </div>
        <div class="item-list empty-rooms">
          ${e._emptyRooms.map(e=>q`
            <div class="item-row disabled">
              <span class="drag-handle">
                <ha-icon .icon=${"mdi:drag"}></ha-icon>
              </span>
              <div class="room-icon-btn">
                <ha-icon .icon=${e.icon}></ha-icon>
              </div>
              <div class="item-info">
                <span class="item-name">${e.name}</span>
                <span class="item-meta">0 ${Ee("common.entities")}</span>
              </div>
            </div>
          `)}
        </div>
      `:F}

      <div class="section-label">${Ee("config.navbar_behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${()=>{e._autoSort=!e._autoSort}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.navbar_auto_sort")}</div>
            <div class="feature-desc">${Ee("config.navbar_auto_sort_desc")}</div>
          </div>
          <span
            class="toggle ${e._autoSort?"on":""}"
            role="switch"
            aria-checked=${e._autoSort?"true":"false"}
          ></span>
        </button>
      </div>

      <div class="banner">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        <span>${Ee("config.navbar_rooms_banner")}</span>
      </div>
      <div class="section-label">${Ee("config.navbar_visible_rooms")}</div>
      <div class="item-list">
        ${e._rooms.map((t,i)=>e._renderRoomRow(t,i))}
      </div>

      <div class="icon-picker-fold ${e._iconPickerRoom?"open":""}">
        <div class="icon-picker-inner">
          <div class="section-label">
            ${Ee("config.navbar_icon_label",{name:e._rooms.find(t=>t.areaId===e._iconPickerRoom)?.name||""})}
          </div>
          <div class="icon-picker-grid">
            ${ze.map(t=>q`
                <button
                  class="icon-pick ${e._rooms.find(t=>t.areaId===e._iconPickerRoom)?.icon===t?"selected":""}"
                  @click=${()=>e._iconPickerRoom&&e._setRoomIcon(e._iconPickerRoom,t)}
                  aria-label="${Ee("config.navbar_choose_icon")}"
                >
                  <ha-icon .icon=${t}></ha-icon>
                </button>
              `)}
          </div>
        </div>
      </div>

      <div class="section-label">${Ee("config.navbar_indicators")}</div>
      <div class="section-desc">${Ee("config.navbar_indicators_desc")}</div>
      <div class="feature-list">
        ${[{key:"lights",icon:"mdi:lightbulb",nameKey:"config.navbar_ind_lights",descKey:"config.navbar_ind_lights_desc"},{key:"temperature",icon:"mdi:thermometer",nameKey:"config.navbar_ind_temp",descKey:"config.navbar_ind_temp_desc"},{key:"humidity",icon:"mdi:water-percent",nameKey:"config.navbar_ind_humidity",descKey:"config.navbar_ind_humidity_desc"},{key:"media",icon:"mdi:music",nameKey:"config.navbar_ind_media",descKey:"config.navbar_ind_media_desc"}].map(t=>{const i={lights:e._showLights,temperature:e._showTemperature,humidity:e._showHumidity,media:e._showMedia}[t.key];return q`
            <button
              class="feature-row"
              @click=${()=>{"lights"===t.key?e._showLights=!e._showLights:"temperature"===t.key?e._showTemperature=!e._showTemperature:"humidity"===t.key?e._showHumidity=!e._showHumidity:e._showMedia=!e._showMedia}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${t.icon}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee(t.nameKey)}</div>
                <div class="feature-desc">${Ee(t.descKey)}</div>
              </div>
              <span
                class="toggle ${i?"on":""}"
                role="switch"
                aria-checked=${i?"true":"false"}
              ></span>
            </button>
          `})}
      </div>

      <div class="section-label">${Ee("config.navbar_thresholds")}</div>
      <div class="section-desc">${Ee("config.navbar_thresholds_desc")}</div>
      <div class="threshold-list">
        <div class="threshold-row">
          <div class="threshold-icon hot">
            <ha-icon .icon=${"mdi:thermometer-high"}></ha-icon>
          </div>
          <span class="threshold-label">${Ee("config.navbar_temp_high")}</span>
          <input
            class="threshold-input"
            type="number"
            step="0.5"
            .value=${String(e._tempHigh)}
            @change=${t=>{e._tempHigh=parseFloat(t.target.value)||24}}
            aria-label="${Ee("config.navbar_temp_high")}"
          />
          <span class="threshold-unit">°C</span>
        </div>
        <div class="threshold-row">
          <div class="threshold-icon cold">
            <ha-icon .icon=${"mdi:snowflake"}></ha-icon>
          </div>
          <span class="threshold-label">${Ee("config.navbar_temp_low")}</span>
          <input
            class="threshold-input"
            type="number"
            step="0.5"
            .value=${String(e._tempLow)}
            @change=${t=>{e._tempLow=parseFloat(t.target.value)||17}}
            aria-label="${Ee("config.navbar_temp_low")}"
          />
          <span class="threshold-unit">°C</span>
        </div>
        <div class="threshold-row">
          <div class="threshold-icon humidity">
            <ha-icon .icon=${"mdi:water-percent"}></ha-icon>
          </div>
          <span class="threshold-label">${Ee("config.navbar_humidity_threshold")}</span>
          <input
            class="threshold-input"
            type="number"
            step="1"
            .value=${String(e._humidityThreshold)}
            @change=${t=>{e._humidityThreshold=parseFloat(t.target.value)||65}}
            aria-label="${Ee("config.navbar_humidity_threshold")}"
          />
          <span class="threshold-unit">%</span>
        </div>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._reset()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `;var e}_renderRoomRow(e,t){return function(e,t,i){const a=e._dragIdx===i&&"rooms"===e._dragContext,o=e._dropIdx===i&&"rooms"===e._dragContext,r=["item-row",t.visible?"":"disabled",a?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return q`
    <div
      class=${r}
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
        aria-label="${Ee("config.navbar_change_icon_aria",{name:t.name})}"
      >
        <ha-icon .icon=${t.icon}></ha-icon>
      </button>
      <div class="item-info">
        <span class="item-name">${t.name}</span>
        <span class="item-meta">${t.entityCount} ${Ee("common.entities")}</span>
      </div>
      <button
        class="toggle ${t.visible?"on":""}"
        @click=${()=>e._toggleRoomVisible(t.areaId)}
        role="switch"
        aria-checked=${t.visible?"true":"false"}
        aria-label="${t.visible?Ee("common.hide"):Ee("common.show")} ${t.name}"
      ></button>
    </div>
  `}(this,e,t)}_renderPopupTab(){return function(e){const t=e._rooms.find(t=>t.areaId===e._selectedRoom);return q`
    <div class="tab-panel" id="panel-popup">
      <div class="section-label">${Ee("config.popup_room")}</div>
      <div class="section-desc">
        ${Ee("config.popup_room_desc")}
      </div>
      <div class="dropdown ${e._dropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>e._dropdownOpen=!e._dropdownOpen}
          aria-expanded=${e._dropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||Ee("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>q`
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

      <div class="section-label">${Ee("config.popup_internal_cards")}</div>
      <div class="section-desc">
        ${Ee("config.popup_internal_cards_desc")}
      </div>
      <div class="item-list">
        ${e._cards.map((t,i)=>e._renderCardRow(t,i))}
      </div>

      ${e._scenes.length>0?q`
        <div class="section-label">${Ee("config.popup_scenes")} (${e._scenes.length})</div>
        <div class="section-desc">
          ${Ee("config.popup_scenes_desc")}
        </div>
        <div class="item-list">
          ${e._scenes.map((t,i)=>e._renderSceneRow(t,i))}
        </div>
      `:F}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._reset()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderCardRow(e,t){return function(e,t,i){const a=e._dragIdx===i&&"cards"===e._dragContext,o=e._dropIdx===i&&"cards"===e._dragContext,r=["item-row card-row",t.visible?"":"disabled",a?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return q`
    <div
      class=${r}
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
        <span class="item-name">${t.nameKey?Ee(t.nameKey):t.id}</span>
        <span class="item-meta">${t.descKey?Ee(t.descKey):""}</span>
      </div>
      <span class="card-count">${t.count}</span>
      <button
        class="toggle ${t.visible?"on":""}"
        @click=${()=>e._toggleCardVisible(t.id)}
        role="switch"
        aria-checked=${t.visible?"true":"false"}
        aria-label="${t.visible?Ee("common.hide"):Ee("common.show")} ${t.nameKey?Ee(t.nameKey):t.id}"
      ></button>
    </div>
  `}(this,e,t)}_renderSceneRow(e,t){return function(e,t,i){const a=e._dragIdx===i&&"scenes"===e._dragContext,o=e._dropIdx===i&&"scenes"===e._dragContext,r=["item-row",t.visible?"":"disabled",a?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return q`
    <div
      class=${r}
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
        aria-label="${t.visible?Ee("common.hide"):Ee("common.show")} ${t.name}"
      ></button>
    </div>
  `}(this,e,t)}_renderLightPreview(){return function(e){if(!e._lightRoom)return q`<div class="preview-empty">${Ee("config.light_select_room")}</div>`;if(0===e._lights.length)return q`<div class="preview-empty">${Ee("config.light_no_lights")}</div>`;const t=e._lights.filter(e=>e.visible),i=t.filter(e=>e.isOn).length,a=t.length,o=i>0,r=0===i?"none":i===a?"all":"some";if(0===t.length)return q`<div class="preview-empty">${Ee("config.light_no_visible")}</div>`;const s=[],n=[];for(const l of t)"compact"==("full"===l.layout?"full":"compact")?(n.push(l),2===n.length&&(s.push({kind:"compact-pair",left:n[0],right:n[1]}),n.length=0)):(n.length>0&&(s.push({kind:"compact-pair",left:n[0],right:null}),n.length=0),s.push({kind:"full",light:l}));n.length>0&&s.push({kind:"compact-pair",left:n[0],right:null});const d=o?.06:0,c=(t,i,a)=>{const o=["preview-light-row",i?"compact":"",a?"compact-right":"",t.visible?"":"hidden-light"].filter(Boolean).join(" "),r=e._scheduleEdits.get(t.entityId),s=r?r.some(e=>e.start&&e.end):(e._schedulesLoaded[t.entityId]?.periods?.length??0)>0;return q`
      <div class=${o} data-on=${t.isOn}>
        <div class="preview-light-icon ${t.isOn?"on":""}">
          <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
        </div>
        <div class="preview-light-info">
          <div class="preview-light-name">${t.name}</div>
          <div class="preview-light-sub">${t.isOn?`${t.brightnessPct}%`:Ee("common.off")}</div>
        </div>
        ${s?q`<ha-icon class="preview-light-sched" .icon=${"mdi:calendar-clock"}></ha-icon>`:F}
        ${"full"===t.layout?q`<span class="preview-light-layout-tag">full</span>`:F}
        <span class="preview-light-dot ${t.isOn?"on":""}"></span>
      </div>
    `};return q`
    <div class="preview-light">
      ${e._lightShowHeader?q`
        <div class="preview-light-header">
          <div class="preview-light-header-left">
            <span class="preview-light-title">${Ee("light.title")}</span>
            <span class="preview-light-count ${r}">${i}/${a}</span>
          </div>
          <div class="preview-light-toggle ${o?"on":""}"></div>
        </div>
      `:F}
      <div class="preview-light-body">
        <div
          class="preview-light-tint"
          style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${d}"
        ></div>
        <div class="preview-light-grid">
          ${s.map(e=>"full"===e.kind?c(e.light,!1,!1):q`
              ${c(e.left,!0,!1)}
              ${e.right?c(e.right,!0,!0):F}
            `)}
        </div>
      </div>
    </div>
  `}(this)}_renderLightTab(){return function(e){const t=e._rooms.find(t=>t.areaId===e._lightRoom);return q`
    <div class="tab-panel" id="panel-light">
      <div class="section-label">${Ee("config.navbar_behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${()=>{e._lightShowHeader=!e._lightShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.light_show_header")}</div>
            <div class="feature-desc">${Ee("config.light_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._lightShowHeader?"on":""}"
            role="switch"
            aria-checked=${e._lightShowHeader?"true":"false"}
          ></span>
        </button>
      </div>

      <div class="section-label">${Ee("config.light_room")}</div>
      <div class="section-desc">
        ${Ee("config.light_room_desc")}
      </div>
      <div class="dropdown ${e._lightDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>e._lightDropdownOpen=!e._lightDropdownOpen}
          aria-expanded=${e._lightDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||Ee("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>q`
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

      ${e._lights.length>0?q`
            <div class="section-label">${Ee("config.light_list_title")} (${e._lights.length})</div>
            <div class="section-desc">
              ${Ee("config.light_list_banner")}
            </div>
            <div class="item-list">
              ${e._lights.map((t,i)=>e._renderLightRow(t,i))}
            </div>
          `:e._lightRoom?q`<div class="banner">
              <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
              <span>${Ee("config.light_no_lights")}</span>
            </div>`:F}

      ${e._lights.length>0?q`
        <div class="section-desc schedule-hint">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          ${Ee("config.light_schedule_hint")}
        </div>
      `:F}

      <div class="section-desc dashboard-vs-room">
        <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
        ${Ee("config.light_dashboard_vs_room")}
      </div>

      ${e._lightRoom?q`
        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>e._loadRoomLights()}>${Ee("common.reset")}</button>
        </div>
      `:F}
    </div>
  `}(this)}_renderLightRow(e,t){return function(e,t,i){const a=e._dragIdx===i&&"lights"===e._dragContext,o=e._dropIdx===i&&"lights"===e._dragContext,r=["item-row",t.visible?"":"disabled",a?"dragging":"",o?"drop-target":""].filter(Boolean).join(" "),s=e._scheduleEdits.get(t.entityId),n=s?s.some(e=>e.start&&e.end):(e._schedulesLoaded[t.entityId]?.periods?.length??0)>0,d=e._scheduleExpandedEntity===t.entityId,c=["item-card",d?"expanded":""].filter(Boolean).join(" ");return q`
    <div class=${c}>
      <div
        class=${r}
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
          class="schedule-btn ${n?"active":""}"
          @click=${()=>e._toggleScheduleExpand(t.entityId)}
          aria-label="${Ee("config.light_schedule_aria",{name:t.name})}"
          aria-expanded=${d?"true":"false"}
          title="${Ee("config.light_schedule_title")}"
        >
          <ha-icon .icon=${"mdi:calendar-clock"}></ha-icon>
        </button>
        <button
          class="layout-btn"
          @click=${()=>e._cycleLightLayout(t.entityId)}
          aria-label="${Ee("config.light_change_layout_aria")}"
          title="${Ee("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}"
        >
          ${Ee("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}
        </button>
        <button
          class="toggle ${t.visible?"on":""}"
          @click=${()=>e._toggleLightVisible(t.entityId)}
          role="switch"
          aria-checked=${t.visible?"true":"false"}
          aria-label="${t.visible?Ee("common.hide"):Ee("common.show")} ${t.name}"
        ></button>
      </div>
      <div class="fold-sep ${d?"visible":""}"></div>
      <div class="schedule-fold ${d?"open":""}">
        <div class="schedule-fold-inner">
          ${e._renderScheduleContent(t.entityId)}
        </div>
      </div>
    </div>
  `}(this,e,t)}_formatDateTimeShort(e){return function(e,t){if(!t)return"";const[i,a]=t.split("T");if(!i)return t;const[o,r,s]=i.split("-");return`${s}/${r}/${o} ${a??"00:00"}`}(0,e)}_formatPeriodDisplay(e){return function(e,t){if(!t.start&&!t.end)return"";const i=e._formatDateTimeShort(t.start),a=e._formatDateTimeShort(t.end);return i&&a?`${i}  →  ${a}`:i?`${i}  → …`:`…  →  ${a}`}(this,e)}_renderScheduleContent(e){return function(e,t){const i=e._scheduleEdits.get(t)??[];return q`
    <div class="schedule-body">
      <div class="schedule-header">${Ee("config.light_schedule_title")}</div>
      ${i.map((i,a)=>q`
        <div class="schedule-period">
          <div class="schedule-row">
            <button
              class="datetime-display ${i.start||i.end?"":"empty"}"
              @click=${()=>e._openRangePicker(t,a)}
            >
              ${i.start||i.end?e._formatPeriodDisplay(i):Ee("config.light_schedule_no_date")}
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
              <span class="check-label">${Ee("config.light_schedule_recurring")}</span>
            </button>
            <button
              class="btn-icon xs schedule-delete"
              @click=${()=>e._removeSchedulePeriod(t,a)}
              aria-label="${Ee("config.light_schedule_delete_aria")}"
            >
              <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
            </button>
          </div>
        </div>
      `)}
      <button class="btn btn-sm schedule-add" @click=${()=>e._addSchedulePeriod(t)}>
        <ha-icon .icon=${"mdi:plus"}></ha-icon>
        ${Ee("config.light_schedule_add")}
      </button>
      <button class="btn btn-sm btn-accent schedule-save" @click=${()=>e._saveSchedule(t)}>
        ${Ee("common.save")}
      </button>
    </div>
  `}(this,e)}_selectCoverRoom(e){this._beginSuppressAutoSave(),function(e,t){e._coverRoom=t,e._coverRoomDropdownOpen=!1,e._loadRoomCovers()}(this,e)}async _loadRoomCovers(){if(!this._backend||!this._coverRoom||!this.hass)return;const e=this._coverRoom,t=Ie(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id);let i=null;try{i=await this._backend.send("get_room",{area_id:e})}catch{}if(this._coverRoom!==e)return;const a=new Set(i?.hidden_entities??[]),o=i?.entity_order??[],r=i?.entity_layouts??{},s=[...t].sort((e,t)=>{const i=o.indexOf(e),a=o.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._coverRoomEntities=s.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,o=t?.attributes?.device_class||"shutter";return{entityId:e,name:i,visible:!a.has(e),deviceClass:o,layout:r[e]||"compact"}})}_toggleCoverEntityVisibility(e){!function(e,t){e._coverRoomEntities=e._coverRoomEntities.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}(this,e)}_cycleCoverLayout(e){!function(e,t){e._coverRoomEntities=e._coverRoomEntities.map(e=>e.entityId===t?{...e,layout:"full"===e.layout?"compact":"full"}:e)}(this,e)}_getAllCoverEntities(){return function(e){if(!e.hass)return[];const t=[];for(const[i,a]of Object.entries(e.hass.states)){if(!i.startsWith("cover."))continue;const e=a.attributes?.friendly_name||i.split(".")[1]||i;t.push({entityId:i,name:e})}return t.sort((e,t)=>e.name.localeCompare(t.name))}(this)}_toggleCoverDashboardEntity(e){!function(e,t){const i=new Set(e._coverDashboardEntities);i.has(t)?(i.delete(t),e._coverDashboardOrder=e._coverDashboardOrder.filter(e=>e!==t)):(i.add(t),e._coverDashboardOrder.includes(t)||(e._coverDashboardOrder=[...e._coverDashboardOrder,t])),e._coverDashboardEntities=[...i]}(this,e)}_initCoverDashboardOrder(){!function(e){const t=new Set(e._getAllCoverEntities().map(e=>e.entityId)),i=e._coverDashboardEntities.filter(e=>t.has(e)),a=[...t].filter(t=>!e._coverDashboardEntities.includes(t));e._coverDashboardOrder=[...i,...a]}(this)}_onDropDashboardCover(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"dashboard_covers"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._coverDashboardOrder],[o]=a.splice(e._dragIdx,1);a.splice(t,0,o),e._coverDashboardOrder=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}async _saveCover(){if(this._backend&&!this._saving){this._saving=!0;try{const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));if(await this._backend.send("set_cover_config",{show_header:this._coverShowHeader,dashboard_entities:e,presets:this._coverPresets,entity_presets:this._coverEntityPresets}),this._coverRoom&&this._coverRoomEntities.length>0){let e=[],t=[],i={};try{const a=await this._backend.send("get_room",{area_id:this._coverRoom});a&&(e=a.hidden_entities??[],t=a.entity_order??[],i=a.entity_layouts??{})}catch{}const a=new Set(this._coverRoomEntities.map(e=>e.entityId)),o=e.filter(e=>!a.has(e)),r=this._coverRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),s=[...t.filter(e=>!a.has(e)),...this._coverRoomEntities.map(e=>e.entityId)],n={...i};for(const d of this._coverRoomEntities)n[d.entityId]=d.layout;await this._backend.send("set_room",{area_id:this._coverRoom,hidden_entities:[...o,...r],entity_order:s,entity_layouts:n})}if(!this._mounted)return;this._showToast(),_e.emit("cover-config-changed",void 0),this._coverRoom&&_e.emit("room-config-changed",{areaId:this._coverRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}_renderCoverPreview(){return je(this)}_renderCoverTab(){return function(e){if(!e.hass)return F;const t=e._rooms.find(t=>t.areaId===e._coverRoom);return q`
    <div class="tab-panel" id="panel-cover">
      <div class="section-label">${Ee("config.navbar_behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${()=>{e._coverShowHeader=!e._coverShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.cover_show_header")}</div>
            <div class="feature-desc">${Ee("config.cover_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._coverShowHeader?"on":""}"
            role="switch"
            aria-checked=${e._coverShowHeader?"true":"false"}
          ></span>
        </button>
      </div>

      <!-- Per-room cover config -->
      <div class="section-label">${Ee("config.cover_room")}</div>
      <div class="section-desc">${Ee("config.cover_room_desc")}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${e._coverRoomDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._coverRoomDropdownOpen=!e._coverRoomDropdownOpen}}
          aria-expanded=${e._coverRoomDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||Ee("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>q`
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

      ${e._coverRoom?q`
        ${e._coverRoomEntities.length>0?q`
          <div class="section-label">${Ee("config.cover_list_title")} (${e._coverRoomEntities.length})</div>
          <div class="section-desc">${Ee("config.cover_list_banner")}</div>
          <div class="item-list">
            ${e._coverRoomEntities.map((t,i)=>{const a=e._dragIdx===i&&"covers"===e._dragContext,o=e._dropIdx===i&&"covers"===e._dragContext,r=e._coverPresetsExpandedEntity===t.entityId,s=!!e._coverEntityPresets[t.entityId],n=["item-row",t.visible?"":"disabled",a?"dragging":"",o?"drop-target":""].filter(Boolean).join(" "),d=["item-card",r?"expanded":""].filter(Boolean).join(" ");return q`
                <div class=${d}>
                  <div
                    class=${n}
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
                      class="schedule-btn ${s?"active":""}"
                      @click=${()=>e._toggleCoverPresetsExpand(t.entityId)}
                      aria-label="${Ee("config.cover_entity_presets")}"
                      aria-expanded=${r?"true":"false"}
                      title="${Ee("config.cover_entity_presets")}"
                    >
                      <ha-icon .icon=${"mdi:tune-vertical"}></ha-icon>
                    </button>
                    <button
                      class="layout-btn"
                      @click=${()=>e._cycleCoverLayout(t.entityId)}
                      aria-label="${Ee("config.light_change_layout_aria")}"
                      title="${Ee("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}"
                    >
                      ${Ee("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}
                    </button>
                    <button
                      class="toggle ${t.visible?"on":""}"
                      @click=${()=>e._toggleCoverEntityVisibility(t.entityId)}
                      role="switch"
                      aria-checked=${t.visible?"true":"false"}
                      aria-label="${t.visible?Ee("common.hide"):Ee("common.show")} ${t.name}"
                    ></button>
                  </div>
                  <div class="fold-sep ${r?"visible":""}"></div>
                  <div class="schedule-fold ${r?"open":""}">
                    <div class="schedule-fold-inner">
                      <div style="padding:8px 12px 10px 36px;">
                        <div style="font-size:9px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${Ee("config.cover_entity_presets")}</div>
                        <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">
                          ${(e._coverEntityPresets[t.entityId]??e._coverPresets).map(i=>{const a=i>=50?"mdi:window-shutter-open":"mdi:window-shutter",o=!!e._coverEntityPresets[t.entityId];return q`
                              <span style="
                                display:inline-flex;align-items:center;gap:3px;
                                padding:3px 7px;border-radius:var(--radius-md);
                                border:1px solid ${o?"rgba(167,139,250,0.2)":"var(--b2)"};
                                background:${o?"rgba(167,139,250,0.05)":"var(--s1)"};
                                font-size:10px;font-weight:600;color:${o?"var(--c-accent)":"var(--t3)"};
                              ">
                                <ha-icon .icon=${a} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                ${0===i?Ee("cover.preset_closed"):100===i?Ee("cover.preset_open"):`${i}%`}
                                ${o?q`
                                  <button
                                    style="background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;color:var(--t4);transition:color var(--t-fast);"
                                    @click=${()=>e._removeCoverEntityPreset(t.entityId,i)}
                                    aria-label="${Ee("common.delete")} ${i}%"
                                  >
                                    <ha-icon .icon=${"mdi:close"} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                                  </button>
                                `:F}
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
                                padding:3px 6px;border-radius:var(--radius-md);
                                border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
                                font-size:10px;font-weight:600;color:var(--c-accent);
                                cursor:pointer;font-family:inherit;
                                opacity:${e._coverEntityPresetInput[t.entityId]?"1":"0.4"};
                                pointer-events:${e._coverEntityPresetInput[t.entityId]?"auto":"none"};
                                transition:opacity var(--t-fast);
                              "
                              @click=${()=>e._addCoverEntityPreset(t.entityId)}
                              aria-label="${Ee("config.cover_preset_add")}"
                            >
                              <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                            </button>
                            ${e._coverEntityPresets[t.entityId]?q`
                              <button
                                style="
                                  display:inline-flex;align-items:center;gap:2px;
                                  padding:3px 6px;border-radius:var(--radius-md);
                                  border:1px solid var(--b2);background:var(--s1);
                                  font-size:9px;font-weight:600;color:var(--t4);
                                  cursor:pointer;font-family:inherit;
                                  transition:all var(--t-fast);
                                "
                                @click=${()=>e._resetCoverEntityPresets(t.entityId)}
                                aria-label="${Ee("common.reset")}"
                              >
                                <ha-icon .icon=${"mdi:restore"} style="--mdc-icon-size:12px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                              </button>
                            `:F}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `})}
          </div>
        `:q`
          <div class="banner">
            <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
            <span>${Ee("config.cover_no_covers")}</span>
          </div>
        `}
      `:F}

      <!-- Preset config -->
      <div class="section-label">${Ee("config.cover_presets")}</div>
      <div class="section-desc">${Ee("config.cover_presets_desc")}</div>

      <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
        ${e._coverPresets.map(t=>q`
            <span style="
              display:inline-flex;align-items:center;gap:4px;
              padding:5px 10px;border-radius:var(--radius-md);
              border:1px solid var(--b2);background:var(--s1);
              font-size:11px;font-weight:600;color:var(--t2);
            ">
              <ha-icon .icon=${t>=50?"mdi:window-shutter-open":"mdi:window-shutter"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${0===t?Ee("cover.preset_closed"):100===t?Ee("cover.preset_open"):`${t}%`}
              <button
                style="
                  background:none;border:none;cursor:pointer;padding:0;
                  display:flex;align-items:center;justify-content:center;
                  color:var(--t4);transition:color var(--t-fast);
                "
                @click=${()=>e._removeCoverPreset(t)}
                aria-label="${Ee("common.delete")} ${t}%"
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
            placeholder=${Ee("config.cover_preset_placeholder")}
            style="width:64px;font-size:11px;padding:5px 8px;"
          />
          <button
            style="
              display:inline-flex;align-items:center;gap:4px;
              padding:5px 10px;border-radius:var(--radius-md);
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
            ${Ee("config.cover_preset_add")}
          </button>
        </span>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._resetCover()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderFanPreview(){return qe(this)}_renderFanTab(){return function(e){if(!e.hass)return F;const t=e._rooms.find(t=>t.areaId===e._fanRoom);return q`
    <div class="tab-panel" id="panel-fan">
      <div class="section-label">${Ee("config.navbar_behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${()=>{e._fanShowHeader=!e._fanShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.fan_show_header")}</div>
            <div class="feature-desc">${Ee("config.fan_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._fanShowHeader?"on":""}"
            role="switch"
            aria-checked=${e._fanShowHeader?"true":"false"}
          ></span>
        </button>
      </div>

      <!-- Per-room fan config -->
      <div class="section-label">${Ee("config.fan_room")}</div>
      <div class="section-desc">${Ee("config.fan_room_desc")}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${e._fanRoomDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._fanRoomDropdownOpen=!e._fanRoomDropdownOpen}}
          aria-expanded=${e._fanRoomDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||Ee("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>q`
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

      ${e._fanRoom?q`
        ${e._fanRoomEntities.length>0?q`
          <div class="section-label">${Ee("config.fan_list_title")} (${e._fanRoomEntities.length})</div>
          <div class="section-desc">${Ee("config.fan_list_banner")}</div>
          <div class="item-list">
            ${e._fanRoomEntities.map((t,i)=>{const a=e._dragIdx===i&&"fans"===e._dragContext,o=e._dropIdx===i&&"fans"===e._dragContext,r=["item-row",t.visible?"":"disabled",a?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return q`
                <div
                  class=${r}
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
                    aria-label="${Ee("config.light_change_layout_aria")}"
                    title="${Ee("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}"
                  >
                    ${Ee("compact"===t.layout?"config.light_layout_compact":"config.light_layout_full")}
                  </button>
                  <button
                    class="toggle ${t.visible?"on":""}"
                    @click=${()=>e._toggleFanEntityVisibility(t.entityId)}
                    role="switch"
                    aria-checked=${t.visible?"true":"false"}
                    aria-label="${t.visible?Ee("common.hide"):Ee("common.show")} ${t.name}"
                  ></button>
                </div>
              `})}
          </div>
        `:q`
          <div class="banner">
            <ha-icon .icon=${"mdi:fan-off"}></ha-icon>
            <span>${Ee("config.fan_no_fans")}</span>
          </div>
        `}
      `:F}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadFanConfig()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}(this)}_selectFanRoom(e){this._beginSuppressAutoSave(),function(e,t){e._fanRoom=t,e._fanRoomDropdownOpen=!1,e._loadRoomFans()}(this,e)}_toggleFanEntityVisibility(e){!function(e,t){e._fanRoomEntities=e._fanRoomEntities.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}(this,e)}_cycleFanLayout(e){!function(e,t){e._fanRoomEntities=e._fanRoomEntities.map(e=>e.entityId===t?{...e,layout:"full"===e.layout?"compact":"full"}:e)}(this,e)}_onDropFan(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"fans"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._fanRoomEntities],[o]=a.splice(e._dragIdx,1);a.splice(t,0,o),e._fanRoomEntities=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}async _loadRoomFans(){if(!this._backend||!this._fanRoom||!this.hass)return;const e=this._fanRoom,t=Ie(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("fan.")).map(e=>e.entity_id);let i=null;try{i=await this._backend.send("get_room",{area_id:e})}catch{}if(this._fanRoom!==e)return;const a=new Set(i?.hidden_entities??[]),o=i?.entity_order??[],r=i?.entity_layouts??{},s=[...t].sort((e,t)=>{const i=o.indexOf(e),a=o.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._fanRoomEntities=s.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i,visible:!a.has(e),layout:r[e]||"compact"}})}async _saveFan(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_fan_config",{show_header:this._fanShowHeader}),this._fanRoom&&this._fanRoomEntities.length>0){let e=[],t=[],i={};try{const a=await this._backend.send("get_room",{area_id:this._fanRoom});a&&(e=a.hidden_entities??[],t=a.entity_order??[],i=a.entity_layouts??{})}catch{}const a=new Set(this._fanRoomEntities.map(e=>e.entityId)),o=e.filter(e=>!a.has(e)),r=this._fanRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),s=[...t.filter(e=>!a.has(e)),...this._fanRoomEntities.map(e=>e.entityId)],n={...i};for(const d of this._fanRoomEntities)n[d.entityId]=d.layout;await this._backend.send("set_room",{area_id:this._fanRoom,hidden_entities:[...o,...r],entity_order:s,entity_layouts:n})}if(!this._mounted)return;this._showToast(),_e.emit("fan-config-changed",void 0),this._fanRoom&&_e.emit("room-config-changed",{areaId:this._fanRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadFanConfig(){if(this._beginSuppressAutoSave(),this.hass){this._backend||(this._backend=new Ae(this.hass));try{const e=await this._backend.send("get_config");e?.fan_card&&(this._fanShowHeader=e.fan_card.show_header??!0)}catch{}await this._loadRoomFans()}}_onDropCover(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"covers"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._coverRoomEntities],[o]=a.splice(e._dragIdx,1);a.splice(t,0,o),e._coverRoomEntities=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}async _resetCover(){if(this._beginSuppressAutoSave(),this._backend){try{const e=await this._backend.send("get_config");e?.cover_card&&(this._coverShowHeader=e.cover_card.show_header??!0,this._coverDashboardEntities=e.cover_card.dashboard_entities??[],this._coverPresets=e.cover_card.presets??[0,25,50,75,100],this._coverEntityPresets=e.cover_card.entity_presets??{},this._coverEntityPresetInput={},this._initCoverDashboardOrder())}catch{}await this._loadRoomCovers()}}_addCoverPreset(){!function(e){const t=parseInt(e._coverPresetInput,10);isNaN(t)||t<0||t>100||(e._coverPresets.includes(t)||(e._coverPresets=[...e._coverPresets,t].sort((e,t)=>e-t)),e._coverPresetInput="")}(this)}_removeCoverPreset(e){!function(e,t){e._coverPresets=e._coverPresets.filter(e=>e!==t)}(this,e)}_addCoverEntityPreset(e){!function(e,t){const i=e._coverEntityPresetInput[t]??"",a=parseInt(i,10);if(isNaN(a)||a<0||a>100)return;const o=e._coverEntityPresets[t]??[...e._coverPresets];o.includes(a)?e._coverEntityPresetInput={...e._coverEntityPresetInput,[t]:""}:(e._coverEntityPresets={...e._coverEntityPresets,[t]:[...o,a].sort((e,t)=>e-t)},e._coverEntityPresetInput={...e._coverEntityPresetInput,[t]:""})}(this,e)}_removeCoverEntityPreset(e,t){!function(e,t,i){const a=e._coverEntityPresets[t];if(!a)return;const o=a.filter(e=>e!==i);if(0===o.length){const i={...e._coverEntityPresets};delete i[t],e._coverEntityPresets=i}else e._coverEntityPresets={...e._coverEntityPresets,[t]:o}}(this,e,t)}_resetCoverEntityPresets(e){!function(e,t){const i={...e._coverEntityPresets};delete i[t],e._coverEntityPresets=i}(this,e)}_toggleCoverPresetsExpand(e){this._coverPresetsExpandedEntity=this._coverPresetsExpandedEntity===e?null:e}async _saveMedia(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_media_config",{show_header:this._mediaShowHeader,extra_entities:this._mediaExtraEntities}),!this._mounted)return;this._showToast(),_e.emit("media-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadMediaConfig(){if(this._beginSuppressAutoSave(),this._backend)try{const e=await this._backend.send("get_config");e?.media_card&&(this._mediaShowHeader=e.media_card.show_header??!0,this._mediaExtraEntities=e.media_card.extra_entities??{})}catch{}}_renderMediaPreview(){return function(e){const t=e._mediaRoom,i=e._mediaRoomNativePlayers.length+(t?(e._mediaExtraEntities[t]??[]).length:0),a=t?function(e,t){if(!e.hass)return 0;return[...e._mediaRoomNativePlayers,...e._mediaExtraEntities[t]??[]].filter(t=>"playing"===e.hass?.states[t]?.state).length}(e,t):1;return q`
    <div class="media-preview">
      <!-- Simulated full-bleed artwork background -->
      <div class="mp-art-bg"></div>
      <div class="mp-gradient"></div>
      <div class="mp-content">
        <!-- Top bar: glass pill badges -->
        <div class="mp-top">
          <div class="mp-pill">
            <ha-icon .icon=${"mdi:speaker"}></ha-icon>
            <span>${t?e._rooms.find(e=>e.areaId===t)?.name??Ee("config.media_room"):Ee("config.media_select_room")}</span>
            ${a>0?q`
              <div class="mp-eq">
                <div class="mp-eq-bar"></div>
                <div class="mp-eq-bar"></div>
                <div class="mp-eq-bar"></div>
              </div>
            `:F}
          </div>
          ${i>1?q`
            <div class="mp-pill">
              <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
              <span>${i}</span>
            </div>
          `:F}
        </div>
        <!-- Spacer -->
        <div class="mp-spacer"></div>
        <!-- Bottom glass panel -->
        <div class="mp-glass-panel">
          ${e._mediaShowHeader?q`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${Ee("media.title")}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:rgba(96,165,250,0.15);color:#60a5fa;">${a}/${i||1}</span>
            </div>
          `:F}
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
  `}(this)}_renderMediaTab(){return function(e){if(!e.hass)return F;const t=e._rooms.find(t=>t.areaId===e._mediaRoom),i=e._mediaRoom,a=i?e._mediaExtraEntities[i]??[]:[],o=Object.keys(e.hass.states).filter(e=>e.startsWith("media_player.")).sort(),r=new Set([...e._mediaRoomNativePlayers,...a]),s=e._mediaEntitySearch?.toLowerCase()??"",n=o.filter(t=>{if(r.has(t))return!1;if(!s)return!0;const i=(e.hass?.states[t]?.attributes?.friendly_name??"").toLowerCase();return t.toLowerCase().includes(s)||i.includes(s)});return q`
    <div class="tab-panel" id="panel-media">
      <!-- Show header toggle -->
      <button
        class="feature-row"
        @click=${()=>{e._mediaShowHeader=!e._mediaShowHeader}}
      >
        <div class="feature-icon">
          <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
        </div>
        <div class="feature-text">
          <div class="feature-name">${Ee("config.media_show_header")}</div>
          <div class="feature-desc">${Ee("config.media_show_header_desc")}</div>
        </div>
        <span
          class="toggle ${e._mediaShowHeader?"on":""}"
          role="switch"
          aria-checked=${e._mediaShowHeader?"true":"false"}
        ></span>
      </button>

      <!-- Per-room extra entities -->
      <div class="section-label">${Ee("config.media_room")}</div>
      <div class="section-desc">${Ee("config.media_room_desc")}</div>

      <!-- Room selector dropdown -->
      <div class="dropdown ${e._mediaRoomDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>{e._mediaRoomDropdownOpen=!e._mediaRoomDropdownOpen}}
          aria-expanded=${e._mediaRoomDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
          <span>${t?.name||Ee("config.media_select_room")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${e._rooms.map(t=>q`
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

      ${i?q`
        <!-- Native players (read-only) -->
        <div class="section-label">${Ee("config.media_native_players")} (${e._mediaRoomNativePlayers.length})</div>
        <div class="section-desc">${Ee("config.media_native_players_desc")}</div>
        ${e._mediaRoomNativePlayers.length>0?q`
          <div class="item-list">
            ${e._mediaRoomNativePlayers.map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t,o="playing"===i?.state;return q`
                <div class="item-row">
                  <div class="item-info" style="padding-left:8px;">
                    <span class="item-name">${a}</span>
                    <span class="item-meta">${t}</span>
                  </div>
                  <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${o?"#60a5fa":"var(--t4)"};${o?"box-shadow:0 0 6px rgba(96,165,250,0.4);":""}"></div>
                </div>
              `})}
          </div>
        `:q`
          <div class="banner">
            <ha-icon .icon=${"mdi:speaker-off"}></ha-icon>
            <span>${Ee("media.no_players")}</span>
          </div>
        `}

        <!-- Extra entities -->
        <div class="section-label">${Ee("config.media_extra_entities")} (${a.length})</div>
        <div class="section-desc">${Ee("config.media_extra_entities_desc")}</div>
        ${a.length>0?q`
          <div class="item-list">
            ${a.map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t;return q`
                <div class="item-row">
                  <div class="item-info" style="padding-left:8px;">
                    <span class="item-name">${a}</span>
                    <span class="item-meta">${t}</span>
                  </div>
                  <button
                    class="btn-icon xs"
                    @click=${()=>e._removeMediaExtraEntity(t)}
                    aria-label="${Ee("common.hide")} ${a}"
                  >
                    <ha-icon .icon=${"mdi:close"}></ha-icon>
                  </button>
                </div>
              `})}
          </div>
        `:q`
          <div class="banner">
            <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
            <span>${Ee("config.media_no_extra")}</span>
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
            <span>${Ee("config.media_add_extra")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <input
              type="text"
              class="dropdown-search"
              placeholder="${Ee("config.search_entity")}"
              .value=${e._mediaEntitySearch??""}
              @input=${t=>{e._mediaEntitySearch=t.target.value}}
              @click=${e=>e.stopPropagation()}
            />
            ${n.slice(0,20).map(t=>{const i=e.hass?.states[t],a=i?.attributes?.friendly_name||t.split(".")[1]||t;return q`
                <button
                  class="dropdown-item"
                  role="option"
                  @click=${()=>{e._addMediaExtraEntity(t),e._mediaAddDropdownOpen=!1}}
                >
                  <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                  ${a}
                </button>
              `})}
            ${0===n.length?q`
              <div style="padding:8px 12px;font-size:12px;color:var(--t4);text-align:center;">—</div>
            `:F}
          </div>
        </div>
      `:F}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadMediaConfig()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}(this)}_selectMediaRoom(e){this._beginSuppressAutoSave(),function(e,t){e._mediaRoom=t,e._mediaRoomDropdownOpen=!1,e._mediaAddDropdownOpen=!1,e._mediaEntitySearch="",e._loadRoomMediaPlayers()}(this,e)}_addMediaExtraEntity(e){!function(e,t){const i=e._mediaRoom;if(!i)return;const a=e._mediaExtraEntities[i]??[];a.includes(t)||(e._mediaExtraEntities={...e._mediaExtraEntities,[i]:[...a,t]})}(this,e)}_removeMediaExtraEntity(e){!function(e,t){const i=e._mediaRoom;if(!i)return;const a=e._mediaExtraEntities[i]??[];e._mediaExtraEntities={...e._mediaExtraEntities,[i]:a.filter(e=>e!==t)}}(this,e)}_loadRoomMediaPlayers(){if(!this.hass||!this._mediaRoom)return void(this._mediaRoomNativePlayers=[]);const e=Ie(this._mediaRoom,this.hass.entities,this.hass.devices);this._mediaRoomNativePlayers=e.filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id)}_toggleDashboardCard(e){!function(e,t){const i=new Set(e._dashboardEnabledCards);i.has(t)?i.delete(t):i.add(t),e._dashboardEnabledCards=[...i]}(this,e)}_toggleDashboardExpand(e){!function(e,t){const i=new Set(e._dashboardExpanded);i.has(t)?i.delete(t):i.add(t),e._dashboardExpanded=i}(this,e)}_onDropDashboardCard(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"dashboard_cards"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._dashboardCardOrder],[o]=a.splice(e._dragIdx,1);a.splice(t,0,o),e._dashboardCardOrder=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}async _saveDashboard(){if(this._backend&&!this._saving){this._saving=!0;try{await this._backend.send("set_dashboard",{enabled_cards:this._dashboardEnabledCards,card_order:this._dashboardCardOrder,hide_header:this._dashboardHideHeader,hide_sidebar:this._dashboardHideSidebar}),await this._backend.send("set_light_config",{show_header:this._lightShowHeader}),await this._backend.send("set_weather",{show_header:this._weatherShowHeader});const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));if(await this._backend.send("set_cover_config",{show_header:this._coverShowHeader,dashboard_entities:e,presets:this._coverPresets,entity_presets:this._coverEntityPresets}),await this._backend.send("set_spotify_config",{show_header:this._spotifyShowHeader}),await this._backend.send("set_fan_config",{show_header:this._fanShowHeader}),await this._backend.send("set_media_config",{show_header:this._mediaShowHeader,extra_entities:this._mediaExtraEntities}),await this._backend.send("set_presence_config",{show_header:this._presenceShowHeader}),!this._mounted)return;this._showToast(),_e.emit("dashboard-config-changed",void 0),_e.emit("light-config-changed",void 0),_e.emit("weather-config-changed",void 0),_e.emit("cover-config-changed",void 0),_e.emit("fan-config-changed",void 0),_e.emit("spotify-config-changed",void 0),_e.emit("media-config-changed",void 0),_e.emit("presence-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadDashboardConfig(){if(this._beginSuppressAutoSave(),this._backend)try{const e=await this._backend.send("get_config");e?.dashboard&&(this._dashboardEnabledCards=e.dashboard.enabled_cards??["weather"],this._dashboardCardOrder=e.dashboard.card_order??["title","weather","light","media","cover","spotify","presence"],this._dashboardHideHeader=e.dashboard.hide_header??!1,this._dashboardHideSidebar=e.dashboard.hide_sidebar??!1),this._lightShowHeader=e?.light_card?.show_header??!0,this._weatherShowHeader=e?.weather?.show_header??!0,this._coverShowHeader=e?.cover_card?.show_header??!0,this._fanShowHeader=e?.fan_card?.show_header??!0,this._spotifyShowHeader=e?.spotify_card?.show_header??!0,this._mediaShowHeader=e?.media_card?.show_header??!0,this._mediaExtraEntities=e?.media_card?.extra_entities??{},this._presenceShowHeader=e?.presence_card?.show_header??!0}catch{}}_renderDashboardPreview(){return function(e){const t=new Set(e._dashboardEnabledCards),i={title:{icon:"mdi:format-title",label:e._titleText||Ee("config.title_title_placeholder"),titleStyle:"font-size:11px;font-weight:700;color:var(--t1);"},weather:{icon:"mdi:weather-partly-cloudy",label:Ee("weather.title")},light:{icon:"mdi:lightbulb-group",label:Ee("light.title")},media:{icon:"mdi:speaker",label:Ee("media.title")},fan:{icon:"mdi:fan",label:Ee("fan.title")},cover:{icon:"mdi:blinds",label:Ee("cover.title")},spotify:{icon:"mdi:spotify",label:Ee("spotify.title")},presence:{icon:"mdi:account-group",label:Ee("presence.title")}},a=e._dashboardCardOrder.filter(e=>t.has(e));return q`
    <div class="preview-dashboard">
      <div class="preview-dashboard-cards">
        ${0===a.length?q`<div class="preview-dashboard-empty">—</div>`:F}
        ${a.map(e=>{const t=i[e];return t?q`
            <div class="preview-dashboard-card ${e}">
              ${t.titleStyle?q`<span style=${t.titleStyle}>${t.label}</span>`:q`<ha-icon .icon=${t.icon}></ha-icon><span>${t.label}</span>`}
            </div>
          `:F})}
      </div>
      <div class="preview-dashboard-navbar">
        <ha-icon .icon=${"mdi:sofa"}></ha-icon>
        <ha-icon .icon=${"mdi:stove"}></ha-icon>
        <ha-icon .icon=${"mdi:bed"}></ha-icon>
      </div>
    </div>
  `}(this)}_renderDashboardTab(){return function(e){const t={title:{icon:"mdi:format-title",nameKey:"config.dashboard_card_title",descKey:"config.dashboard_card_title_desc",hasSub:!1},weather:{icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",descKey:"config.dashboard_card_weather_desc",hasSub:!0},light:{icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",descKey:"config.dashboard_card_light_desc",hasSub:!0},cover:{icon:"mdi:blinds",nameKey:"config.dashboard_card_cover",descKey:"config.dashboard_card_cover_desc",hasSub:!0},spotify:{icon:"mdi:spotify",nameKey:"config.dashboard_card_spotify",descKey:"config.dashboard_card_spotify_desc",hasSub:!0},media:{icon:"mdi:speaker",nameKey:"config.dashboard_card_media",descKey:"config.dashboard_card_media_desc",hasSub:!0},fan:{icon:"mdi:fan",nameKey:"config.dashboard_card_fan",descKey:"config.dashboard_card_fan_desc",hasSub:!0},presence:{icon:"mdi:account-group",nameKey:"config.dashboard_card_presence",descKey:"config.dashboard_card_presence_desc",hasSub:!0}},i=new Set(e._dashboardEnabledCards);return q`
    <div class="tab-panel" id="panel-dashboard">
      <div class="section-label">${Ee("config.dashboard_display")}</div>
      <div class="section-desc">${Ee("config.dashboard_display_desc")}</div>

      <div class="check-item" style="margin-top:12px;">
        <button
          class="toggle ${e._dashboardHideHeader?"on":""}"
          @click=${()=>{e._saving||(e._dashboardHideHeader=!e._dashboardHideHeader,e._saveDashboard())}}
          role="switch"
          aria-checked=${e._dashboardHideHeader?"true":"false"}
          aria-label=${Ee("config.dashboard_hide_header")}
        ></button>
        <div class="check-label">
          <span>${Ee("config.dashboard_hide_header")}</span>
          <span class="check-desc">${Ee("config.dashboard_hide_header_desc")}</span>
        </div>
      </div>
      <div class="check-item" style="margin-bottom:8px;">
        <button
          class="toggle ${e._dashboardHideSidebar?"on":""}"
          @click=${()=>{e._saving||(e._dashboardHideSidebar=!e._dashboardHideSidebar,e._saveDashboard())}}
          role="switch"
          aria-checked=${e._dashboardHideSidebar?"true":"false"}
          aria-label=${Ee("config.dashboard_hide_sidebar")}
        ></button>
        <div class="check-label">
          <span>${Ee("config.dashboard_hide_sidebar")}</span>
          <span class="check-desc">${Ee("config.dashboard_hide_sidebar_desc")}</span>
        </div>
      </div>

      <div class="fold-sep" style="margin:16px 0;"></div>

      <div class="section-label">${Ee("config.dashboard_title")}</div>
      <div class="section-desc">${Ee("config.dashboard_desc")}</div>
      <div class="item-list">
        ${e._dashboardCardOrder.map((a,o)=>{const r=t[a];if(!r)return F;const s=i.has(a),n=e._dragIdx===o&&"dashboard_cards"===e._dragContext,d=e._dropIdx===o&&"dashboard_cards"===e._dragContext,c=e._dashboardExpanded.has(a),l=["item-row",s?"":"disabled",n?"dragging":"",d?"drop-target":""].filter(Boolean).join(" "),p=["item-card",c?"expanded":""].filter(Boolean).join(" ");return q`
            <div
              class=${r.hasSub?p:""}
              draggable="true"
              @dragstart=${()=>e._onDragStart(o,"dashboard_cards")}
              @dragover=${t=>e._onDragOver(o,t)}
              @dragleave=${()=>e._onDragLeave()}
              @drop=${t=>e._onDropDashboardCard(o,t)}
              @dragend=${()=>e._onDragEnd()}
            >
              <div class=${l}>
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
                <div class="feature-icon">
                  <ha-icon .icon=${r.icon}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${Ee(r.nameKey)}</span>
                  <span class="item-meta">${Ee(r.descKey)}</span>
                </div>
                ${r.hasSub&&s?q`
                  <button
                    class="btn-icon xs"
                    aria-label=${Ee(c?"common.hide":"common.show")}
                    aria-expanded=${c?"true":"false"}
                    @click=${t=>{t.stopPropagation(),e._toggleDashboardExpand(a)}}
                  >
                    <ha-icon .icon=${c?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                  </button>
                `:F}
                <button
                  class="toggle ${s?"on":""}"
                  @click=${t=>{t.stopPropagation(),e._toggleDashboardCard(a)}}
                  role="switch"
                  aria-checked=${s?"true":"false"}
                  aria-label="${Ee(s?"common.hide":"common.show")} ${Ee(r.nameKey)}"
                ></button>
              </div>
              ${r.hasSub?q`
                <div class="fold-sep ${c&&s?"visible":""}"></div>
              `:F}
              ${e._renderDashboardCardSub(a,s,c)}
            </div>
          `})}
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadDashboardConfig()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}(this)}_renderDashboardCardSub(e,t,i){return function(e,t,i,a){const o=i&&a;return"light"===t?q`
      <div class="feature-sub ${o?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._lightShowHeader=!e._lightShowHeader}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee("config.light_show_header")}</div>
                <div class="feature-desc">${Ee("config.light_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._lightShowHeader?"on":""}"
                role="switch"
                aria-checked=${e._lightShowHeader?"true":"false"}
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"weather"===t?q`
      <div class="feature-sub ${o?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._weatherShowHeader=!e._weatherShowHeader}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee("config.weather_show_header")}</div>
                <div class="feature-desc">${Ee("config.weather_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._weatherShowHeader?"on":""}"
                role="switch"
                aria-checked=${e._weatherShowHeader?"true":"false"}
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"cover"===t?q`
      <div class="feature-sub ${o?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._coverShowHeader=!e._coverShowHeader}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee("config.cover_show_header")}</div>
                <div class="feature-desc">${Ee("config.cover_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._coverShowHeader?"on":""}"
                role="switch"
                aria-checked=${e._coverShowHeader?"true":"false"}
              ></span>
            </button>
            <div class="section-label" style="margin-top:10px;">${Ee("config.cover_dashboard_entities")}</div>
            <div class="section-desc">${Ee("config.cover_dashboard_entities_desc")}</div>
            <div class="item-list">
              ${e._coverDashboardOrder.map((t,i)=>{const a=e._getAllCoverEntities().find(e=>e.entityId===t);if(!a)return F;const o=e._coverDashboardEntities.includes(a.entityId),r=["item-row",o?"":"disabled",e._dragIdx===i&&"dashboard_covers"===e._dragContext?"dragging":"",e._dropIdx===i&&"dashboard_covers"===e._dragContext?"drop-target":""].filter(Boolean).join(" ");return q`
                  <div
                    class=${r}
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
                      class="toggle ${o?"on":""}"
                      @click=${t=>{t.stopPropagation(),e._toggleCoverDashboardEntity(a.entityId)}}
                      role="switch"
                      aria-checked=${o?"true":"false"}
                      aria-label="${Ee(o?"common.hide":"common.show")} ${a.name}"
                    ></button>
                  </div>
                `})}
            </div>
          </div>
        </div>
      </div>
    `:"spotify"===t?q`
      <div class="feature-sub ${o?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._spotifyShowHeader=!e._spotifyShowHeader}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee("config.spotify_show_header")}</div>
                <div class="feature-desc">${Ee("config.spotify_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._spotifyShowHeader?"on":""}"
                role="switch"
                aria-checked=${e._spotifyShowHeader?"true":"false"}
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"media"===t?q`
      <div class="feature-sub ${o?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._mediaShowHeader=!e._mediaShowHeader}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee("config.media_show_header")}</div>
                <div class="feature-desc">${Ee("config.media_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._mediaShowHeader?"on":""}"
                role="switch"
                aria-checked=${e._mediaShowHeader?"true":"false"}
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"fan"===t?q`
      <div class="feature-sub ${o?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._fanShowHeader=!e._fanShowHeader}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee("config.fan_show_header")}</div>
                <div class="feature-desc">${Ee("config.fan_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._fanShowHeader?"on":""}"
                role="switch"
                aria-checked=${e._fanShowHeader?"true":"false"}
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:"presence"===t?q`
      <div class="feature-sub ${o?"open":""}">
        <div class="feature-sub-inner">
          <div class="feature-sub-content">
            <button
              class="feature-row"
              @click=${t=>{t.stopPropagation(),e._presenceShowHeader=!e._presenceShowHeader}}
            >
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee("config.presence_show_header")}</div>
                <div class="feature-desc">${Ee("config.presence_show_header_desc")}</div>
              </div>
              <span
                class="toggle ${e._presenceShowHeader?"on":""}"
                role="switch"
                aria-checked=${e._presenceShowHeader?"true":"false"}
              ></span>
            </button>
          </div>
        </div>
      </div>
    `:F}(this,e,t,i)}async _savePresence(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_presence_config",{show_header:this._presenceShowHeader,person_entities:this._presencePersonEntities,smartphone_sensors:this._presenceSmartphoneSensors,notify_services:this._presenceNotifyServices,driving_sensors:this._presenceDrivingSensors}),!this._mounted)return;this._showToast(),_e.emit("presence-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadPresenceConfig(){if(this._beginSuppressAutoSave(),this._backend)try{const e=await this._backend.send("get_config");e?.presence_card&&(this._presenceShowHeader=e.presence_card.show_header??!0,this._presencePersonEntities=e.presence_card.person_entities??[],this._presenceSmartphoneSensors=e.presence_card.smartphone_sensors??{},this._presenceNotifyServices=e.presence_card.notify_services??{},this._presenceDrivingSensors=e.presence_card.driving_sensors??{})}catch{}}_getAvailablePersonEntities(){return(e=this).hass?Object.keys(e.hass.states).filter(e=>e.startsWith("person.")).map(t=>{const i=e.hass.states[t],a=i?.attributes?.friendly_name||t.split(".")[1];return{entityId:t,name:a}}).sort((e,t)=>e.name.localeCompare(t.name)):[];var e}_getAvailableSmartphoneSensors(){return(e=this).hass?Object.keys(e.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("phone")||e.includes("mobile")||e.includes("smartphone")||e.includes("tablet")||e.includes("iphone")||e.includes("galaxy")||e.includes("pixel")||e.includes("oneplus"))).map(t=>{const i=e.hass.states[t],a=i?.attributes?.friendly_name||t.split(".")[1];return{entityId:t,name:a}}).sort((e,t)=>e.name.localeCompare(t.name)):[];var e}_getAvailableDrivingSensors(){return(e=this).hass?Object.keys(e.hass.states).filter(e=>e.startsWith("binary_sensor.")).map(t=>{const i=e.hass.states[t],a=i?.attributes?.friendly_name||t.split(".")[1];return{entityId:t,name:a}}).sort((e,t)=>e.name.localeCompare(t.name)):[];var e}_getAvailableNotifyServices(){return function(e){if(!e.hass)return[];const t=e.hass.services;return Object.keys(t?.notify??{}).map(e=>`notify.${e}`).sort()}(this)}_togglePresencePerson(e){!function(e,t){const i=e._getAvailablePersonEntities();if(0===e._presencePersonEntities.length)e._presencePersonEntities=i.map(e=>e.entityId).filter(e=>e!==t);else{const i=new Set(e._presencePersonEntities);if(i.has(t)){if(i.size<=1)return void(e._presencePersonEntities=[]);i.delete(t)}else i.add(t);e._presencePersonEntities=[...i]}}(this,e)}_renderPresencePreview(){return function(e){const t=e._getAvailablePersonEntities(),i=e._presencePersonEntities.length>0?t.filter(t=>e._presencePersonEntities.includes(t.entityId)):t;if(0===i.length)return q`<div class="preview-empty">${Ee("config.presence_no_persons")}</div>`;const a=i.filter(t=>{const i=e.hass?.states[t.entityId];return"home"===i?.state}).length;return q`
    <div class="preview-presence">
      ${e._presenceShowHeader?q`
        <div class="preview-presence-header">
          <span class="preview-presence-title">${Ee("presence.title")}</span>
          <span class="preview-presence-pill ${a===i.length?"all-home":0===a?"all-away":"mixed"}">
            ${a}/${i.length}
          </span>
        </div>
      `:F}
      <div class="preview-presence-persons">
        ${i.slice(0,4).map(t=>{const i=e.hass?.states[t.entityId],a="home"===i?.state,o=i?.attributes?.entity_picture;return q`
            <div class="preview-presence-person ${a?"home":"away"}">
              ${o?q`<div class="preview-presence-avatar" style="background-image:url(${o})"></div>`:q`<div class="preview-presence-avatar fallback"><ha-icon .icon=${"mdi:account"}></ha-icon></div>`}
              <span class="preview-presence-name">${t.name}</span>
            </div>
          `})}
      </div>
    </div>
  `}(this)}_renderPresenceTab(){return function(e){const t=e._getAvailablePersonEntities(),i=e._presencePersonEntities.length>0?e._presencePersonEntities:t.map(e=>e.entityId),a=e._getAvailableSmartphoneSensors(),o=e._getAvailableDrivingSensors(),r=e._getAvailableNotifyServices();return q`
    <div class="tab-panel" id="panel-presence">
      <!-- Behaviour -->
      <div class="section-label">${Ee("config.navbar_behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${()=>{e._presenceShowHeader=!e._presenceShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.presence_show_header")}</div>
            <div class="feature-desc">${Ee("config.presence_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._presenceShowHeader?"on":""}"
            role="switch"
            aria-checked=${e._presenceShowHeader?"true":"false"}
          ></span>
        </button>
      </div>

      <!-- Person entities -->
      <div class="section-label">${Ee("config.presence_persons")}</div>
      <div class="section-desc">${Ee("config.presence_persons_desc")}</div>

      ${0===t.length?q`
        <div class="preview-empty">${Ee("config.presence_no_persons")}</div>
      `:q`
        <div class="item-list">
          ${t.map(t=>{const i=e._presencePersonEntities.includes(t.entityId),a=0===e._presencePersonEntities.length;return q`
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
                ></button>
              </div>
            `})}
        </div>
      `}

      <!-- Per-person sensor mapping -->
      <div class="section-label">${Ee("config.presence_smartphone")}</div>
      <div class="section-desc">${Ee("config.presence_smartphone_desc")}</div>

      ${i.map(i=>{const s=t.find(e=>e.entityId===i);if(!s)return F;const n=e._presenceSmartphoneSensors[i]||"",d=e._presenceNotifyServices[i]||"",c=e._presenceDrivingSensors[i]||"",l=a.find(e=>e.entityId===n)?.name,p=o.find(e=>e.entityId===c)?.name,h=`${i}:smartphone`,_=`${i}:notify`,u=`${i}:driving`;return q`
          <div class="presence-mapping-card">
            <div class="presence-mapping-header">
              <div class="feature-icon">
                <ha-icon .icon=${"mdi:account"}></ha-icon>
              </div>
              <span class="item-name">${s.name}</span>
            </div>

            <div class="presence-mapping-field">
              <label class="presence-mapping-label">${Ee("config.presence_smartphone")}</label>
              <div class="dropdown ${e._presenceDropdownOpen===h?"open":""}">
                <button
                  class="dropdown-trigger"
                  @click=${()=>{e._presenceDropdownSearch="",e._presenceDropdownOpen=e._presenceDropdownOpen===h?null:h}}
                  aria-expanded=${e._presenceDropdownOpen===h?"true":"false"}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${"mdi:cellphone"}></ha-icon>
                  <span>${l||n||Ee("config.presence_auto_detect")}</span>
                  <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${Ee("config.search_entity")}
                    .value=${e._presenceDropdownOpen===h?e._presenceDropdownSearch:""}
                    @input=${t=>{e._presenceDropdownSearch=t.target.value}}
                    @click=${e=>e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${n?"":"active"}"
                    role="option"
                    aria-selected=${n?"false":"true"}
                    @click=${()=>{const t={...e._presenceSmartphoneSensors};delete t[i],e._presenceSmartphoneSensors=t,e._presenceDropdownOpen=null}}
                  >
                    <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                    ${Ee("config.presence_auto_detect")}
                  </button>
                  ${a.filter(t=>!e._presenceDropdownSearch||t.name.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())||t.entityId.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())).map(t=>q`
                    <button
                      class="dropdown-item ${n===t.entityId?"active":""}"
                      role="option"
                      aria-selected=${n===t.entityId?"true":"false"}
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
              <label class="presence-mapping-label">${Ee("config.presence_notify")}</label>
              <div class="dropdown ${e._presenceDropdownOpen===_?"open":""}">
                <button
                  class="dropdown-trigger"
                  @click=${()=>{e._presenceDropdownSearch="",e._presenceDropdownOpen=e._presenceDropdownOpen===_?null:_}}
                  aria-expanded=${e._presenceDropdownOpen===_?"true":"false"}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${"mdi:bell"}></ha-icon>
                  <span>${d||Ee("config.presence_auto_detect")}</span>
                  <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${Ee("config.search_entity")}
                    .value=${e._presenceDropdownOpen===_?e._presenceDropdownSearch:""}
                    @input=${t=>{e._presenceDropdownSearch=t.target.value}}
                    @click=${e=>e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${d?"":"active"}"
                    role="option"
                    aria-selected=${d?"false":"true"}
                    @click=${()=>{const t={...e._presenceNotifyServices};delete t[i],e._presenceNotifyServices=t,e._presenceDropdownOpen=null}}
                  >
                    <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                    ${Ee("config.presence_auto_detect")}
                  </button>
                  ${r.filter(t=>!e._presenceDropdownSearch||t.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())).map(t=>q`
                    <button
                      class="dropdown-item ${d===t?"active":""}"
                      role="option"
                      aria-selected=${d===t?"true":"false"}
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
              <label class="presence-mapping-label">${Ee("config.presence_driving")}</label>
              <div class="dropdown ${e._presenceDropdownOpen===u?"open":""}">
                <button
                  class="dropdown-trigger"
                  @click=${()=>{e._presenceDropdownSearch="",e._presenceDropdownOpen=e._presenceDropdownOpen===u?null:u}}
                  aria-expanded=${e._presenceDropdownOpen===u?"true":"false"}
                  aria-haspopup="listbox"
                >
                  <ha-icon .icon=${"mdi:car"}></ha-icon>
                  <span>${p||c||Ee("config.presence_auto_detect")}</span>
                  <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
                </button>
                <div class="dropdown-menu" role="listbox">
                  <input
                    class="dropdown-search"
                    type="text"
                    placeholder=${Ee("config.search_entity")}
                    .value=${e._presenceDropdownOpen===u?e._presenceDropdownSearch:""}
                    @input=${t=>{e._presenceDropdownSearch=t.target.value}}
                    @click=${e=>e.stopPropagation()}
                  />
                  <button
                    class="dropdown-item ${c?"":"active"}"
                    role="option"
                    aria-selected=${c?"false":"true"}
                    @click=${()=>{const t={...e._presenceDrivingSensors};delete t[i],e._presenceDrivingSensors=t,e._presenceDropdownOpen=null}}
                  >
                    <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                    ${Ee("config.presence_auto_detect")}
                  </button>
                  ${o.filter(t=>!e._presenceDropdownSearch||t.name.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())||t.entityId.toLowerCase().includes(e._presenceDropdownSearch.toLowerCase())).map(t=>q`
                    <button
                      class="dropdown-item ${c===t.entityId?"active":""}"
                      role="option"
                      aria-selected=${c===t.entityId?"true":"false"}
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
        <button class="btn btn-ghost" @click=${()=>e._loadPresenceConfig()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}(this)}_toggleWeatherMetric(e){!function(e,t){const i=new Set(e._weatherHiddenMetrics);i.has(t)?i.delete(t):i.add(t),e._weatherHiddenMetrics=[...i]}(this,e)}_selectWeatherEntity(e){!function(e,t){e._weatherEntity=t,e._weatherDropdownOpen=!1}(this,e)}async _saveWeather(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_weather",{...this._weatherEntity?{entity_id:this._weatherEntity}:{},hidden_metrics:this._weatherHiddenMetrics,show_daily:this._weatherShowDaily,show_hourly:this._weatherShowHourly,show_header:this._weatherShowHeader}),!this._mounted)return;this._showToast(),_e.emit("weather-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}_renderWeatherPreview(){return function(e){if(!e._weatherEntity||!e.hass)return q`<div class="preview-empty">${Ee("config.weather_select_entity")}</div>`;const t=e.hass.states[e._weatherEntity];if(!t)return q`<div class="preview-empty">${Ee("config.weather_select_entity")}</div>`;const i=t.attributes,a=i.temperature??"--",o=i.temperature_unit??"°C",r=new Set(e._weatherHiddenMetrics),s=t.state||"sunny",n={sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",partlycloudy:"mdi:weather-partly-cloudy",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",snowy:"mdi:weather-snowy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning"}[s]||"mdi:weather-cloudy",d=Ee({sunny:"weather.cond_sunny","clear-night":"weather.cond_clear_night",partlycloudy:"weather.cond_partly_cloudy",cloudy:"weather.cond_cloudy",fog:"weather.cond_foggy",rainy:"weather.cond_rainy",pouring:"weather.cond_pouring",snowy:"weather.cond_snowy",windy:"weather.cond_windy",lightning:"weather.cond_lightning"}[s]||"weather.cond_cloudy"),c={sunny:"#fbbf24","clear-night":"#6366f1",partlycloudy:"#94a3b8",cloudy:"#64748b",fog:"#94a3b8",rainy:"#3b82f6",pouring:"#2563eb",snowy:"#e2e8f0",windy:"#6ee7b3",lightning:"#a78bfa"}[s]||"#64748b",l={sunny:"rgba(251,191,36,0.8)","clear-night":"rgba(129,140,248,0.7)",partlycloudy:"rgba(148,163,184,0.6)",cloudy:"rgba(100,116,139,0.6)",fog:"rgba(148,163,184,0.5)",rainy:"rgba(96,165,250,0.7)",pouring:"rgba(59,130,246,0.8)",snowy:"rgba(226,232,240,0.7)",windy:"rgba(110,231,179,0.6)",lightning:"rgba(167,139,250,0.8)"}[s]||"rgba(148,163,184,0.6)",p=new Date,h=p.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),_=String(p.getSeconds()).padStart(2,"0"),u=p.toLocaleDateString(e.hass.language||"fr",{weekday:"long",day:"numeric",month:"long"}),g=i.apparent_temperature??null,m="number"==typeof a?a:12,v=[0,.5,1.2,.8,-.3,-1,-.5,.2,.7,1.5],f=44,b=Math.min(...v),y=Math.max(...v)-b||1,w=v.map((e,t)=>({x:t/(v.length-1)*348,y:6+32*(1-(e-b)/y)}));let x=`M${w[0].x},${w[0].y}`;for(let L=0;L<w.length-1;L++){const e=w[Math.max(0,L-1)],t=w[L],i=w[L+1],a=w[Math.min(w.length-1,L+2)];x+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}const $=x+" L348,44 L0,44 Z",k=.3*(v.length-1),S=Math.floor(k),E=Math.min(v.length-1,S+1),D=k-S,P=6+32*(1-(v[S]+(v[E]-v[S])*D-b)/y),C=p.getHours(),I=v.map((e,t)=>`${String((C+t)%24).padStart(2,"0")}h`),A=[];if(r.has("humidity")||null==i.humidity||A.push({key:"humidity",icon:"mdi:water-percent",val:`${i.humidity}`,unit:"%"}),!r.has("wind")&&null!=i.wind_speed){const t="number"==typeof i.wind_bearing?e._windBearingToDir(i.wind_bearing):void 0;A.push({key:"wind",icon:"mdi:weather-windy",val:`${Math.round(i.wind_speed)}`,unit:"km/h",dir:t})}if(r.has("pressure")||null==i.pressure||A.push({key:"pressure",icon:"mdi:gauge",val:`${Math.round(i.pressure)}`,unit:"hPa"}),r.has("uv")||null==i.uv_index||A.push({key:"uv",icon:"mdi:sun-wireless",val:`${Math.round(i.uv_index)}`,unit:"UV"}),r.has("visibility")||null==i.visibility||A.push({key:"visibility",icon:"mdi:eye-outline",val:`${i.visibility}`,unit:"km"}),!r.has("sunrise")){const t=e.hass.states["sun.sun"],i=t?.attributes.next_rising;A.push({key:"sunrise",icon:"mdi:weather-sunset-up",val:i?new Date(i).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}if(!r.has("sunset")){const t=e.hass.states["sun.sun"],i=t?.attributes.next_setting;A.push({key:"sunset",icon:"mdi:weather-sunset-down",val:i?new Date(i).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}const O=e.hass.language||"fr",R=Array.from({length:7},(e,t)=>{const i=new Date(2024,0,t+1);return new Intl.DateTimeFormat(O,{weekday:"short"}).format(i)}),T=[m+2,m+1,m,m-1,m+1,m+3,m],M=[m-4,m-3,m-5,m-6,m-4,m-2,m-5],z=[0,10,30,60,20,0,15],H=(p.getDay()+6)%7;return q`
    <div class="preview-weather-wrap">
      ${e._weatherShowHeader?q`
        <div class="pw-card-header">
          <span class="pw-card-title">${Ee("weather.title")}</span>
          <span class="pw-card-location">${t.attributes.friendly_name??""}</span>
        </div>
      `:F}
    <div class="preview-weather">
      <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${c}22 0%, transparent 70%);"></div>
      <div class="pw-content">
        <div class="pw-header">
          <div class="pw-header-left">
            <span class="pw-time">${h}<span class="pw-sec">:${_}</span></span>
            <span class="pw-date">${u}</span>
          </div>
          <div class="pw-header-right">
            <span class="pw-temp">${a}<span class="pw-temp-unit">${o}</span></span>
            <span class="pw-cond"><ha-icon .icon=${n}></ha-icon>${d}</span>
            ${null!=g?q`<span class="pw-feels">${Ee("weather.feels_like",{temp:String(Math.round(g))})}</span>`:F}
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
            <div class="pw-spark-now-dot" style="top: ${P/f*100}%;"></div>
          </div>
          <div class="pw-spark-labels">
            ${I.map((e,t)=>t%2==0||t===I.length-1?q`<span class="pw-spark-lbl" style="left: ${t/(I.length-1)*100}%;">${e}</span>`:F)}
          </div>
        </div>

        ${A.length>0?q`
          <div class="pw-metrics" style="grid-template-columns: repeat(${3}, 1fr);">
            ${A.map(e=>q`
              <div class="pw-metric ${e.key}">
                <ha-icon .icon=${e.icon}></ha-icon>
                <span class="pw-metric-val">${e.val}</span>
                ${e.unit?q`<span class="pw-metric-unit">${e.unit}</span>`:F}
                ${e.dir?q`<span class="pw-metric-dir">${e.dir}</span>`:F}
              </div>
            `)}
          </div>
        `:F}

        ${e._weatherShowDaily||e._weatherShowHourly?q`
          <div class="pw-forecast-zone">
            <div class="pw-tabs">
              ${e._weatherShowDaily?q`<span class="pw-tab active">${Ee("weather.daily_tab")}</span>`:F}
              ${e._weatherShowHourly?q`<span class="pw-tab">${Ee("weather.hourly_tab")}</span>`:F}
            </div>
            <div class="pw-fold-sep"></div>
            ${e._weatherShowDaily?q`
              <div class="pw-daily-list">
                ${["mdi:weather-sunny","mdi:weather-partly-cloudy","mdi:weather-cloudy","mdi:weather-rainy","mdi:weather-partly-cloudy","mdi:weather-sunny","mdi:weather-cloudy"].slice(0,5).map((e,t)=>{const i=(H+t)%7,a=0===t?Ee("weather.today"):R[i],o=Math.round(T[t]),r=Math.round(M[t]),s=z[t];return q`
                    <div class="pw-day-row ${0===t?"today":""}">
                      <span class="pw-day-label">${a}</span>
                      <ha-icon class="pw-day-icon" .icon=${e}></ha-icon>
                      <span class="pw-day-temps"><span class="pw-day-high">${o}°</span><span class="pw-day-low">${r}°</span></span>
                      ${s>0?q`<span class="pw-day-precip">${s}%</span>`:q`<span class="pw-day-precip"></span>`}
                    </div>
                  `})}
              </div>
            `:F}
          </div>
        `:F}
      </div>
    </div>
    </div>
  `}(this)}_windBearingToDir(e){return function(e,t){return["N","NE","E","SE","S","SO","O","NO"][Math.round(t/45)%8]}(0,e)}_renderWeatherTab(){return function(e){const t=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith("weather.")).sort():[],i=t.find(t=>t===e._weatherEntity),a=new Set(e._weatherHiddenMetrics);return q`
    <div class="tab-panel" id="panel-weather">
      <div class="section-label">${Ee("config.navbar_behavior")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${()=>{e._weatherShowHeader=!e._weatherShowHeader}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.weather_show_header")}</div>
            <div class="feature-desc">${Ee("config.weather_show_header_desc")}</div>
          </div>
          <span
            class="toggle ${e._weatherShowHeader?"on":""}"
            role="switch"
            aria-checked=${e._weatherShowHeader?"true":"false"}
          ></span>
        </button>
      </div>

      <div class="section-label">${Ee("config.weather_entity")}</div>
      <div class="section-desc">${Ee("config.weather_entity_desc")}</div>
      <div class="dropdown ${e._weatherDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>e._weatherDropdownOpen=!e._weatherDropdownOpen}
          aria-expanded=${e._weatherDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
          <span>${i||Ee("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${t.map(t=>q`
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

      <div class="section-label">${Ee("config.weather_metrics")}</div>
      <div class="section-desc">${Ee("config.weather_metrics_desc")}</div>
      <div class="feature-list">
        ${[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise"},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset"}].map(t=>{const i=!a.has(t.key);return q`
            <button
              class="feature-row"
              @click=${()=>e._toggleWeatherMetric(t.key)}
            >
              <div class="feature-icon">
                <ha-icon .icon=${t.icon}></ha-icon>
              </div>
              <div class="feature-text">
                <div class="feature-name">${Ee(t.nameKey)}</div>
              </div>
              <span
                class="toggle ${i?"on":""}"
                role="switch"
                aria-checked=${i?"true":"false"}
                aria-label="${Ee(i?"common.hide":"common.show")} ${Ee(t.nameKey)}"
              ></span>
            </button>
          `})}
      </div>

      <div class="section-label">${Ee("config.weather_forecasts")}</div>
      <div class="section-desc">${Ee("config.weather_forecasts_desc")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${()=>{e._weatherShowDaily=!e._weatherShowDaily}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:calendar-week"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.weather_daily")}</div>
          </div>
          <span
            class="toggle ${e._weatherShowDaily?"on":""}"
            role="switch"
            aria-checked=${e._weatherShowDaily?"true":"false"}
            aria-label="${e._weatherShowDaily?Ee("common.hide"):Ee("common.show")} ${Ee("config.weather_daily")}"
          ></span>
        </button>
        <button
          class="feature-row"
          @click=${()=>{e._weatherShowHourly=!e._weatherShowHourly}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.weather_hourly")}</div>
          </div>
          <span
            class="toggle ${e._weatherShowHourly?"on":""}"
            role="switch"
            aria-checked=${e._weatherShowHourly?"true":"false"}
            aria-label="${e._weatherShowHourly?Ee("common.hide"):Ee("common.show")} ${Ee("config.weather_hourly")}"
          ></span>
        </button>
      </div>

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadWeatherConfig()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}(this)}async _loadWeatherConfig(){if(this._beginSuppressAutoSave(),this._backend)try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherEntity=e.weather.entity_id??"",this._weatherHiddenMetrics=e.weather.hidden_metrics??[],this._weatherShowDaily=e.weather.show_daily??!0,this._weatherShowHourly=e.weather.show_hourly??!0,this._weatherShowHeader=e.weather.show_header??!0)}catch{}}async _checkSpotifyStatus(){if(this._backend)try{const e=await this._backend.send("spotify_status");if(!this._mounted)return;this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}async _saveSpotify(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_spotify_config",{show_header:this._spotifyShowHeader,entity_id:this._spotifyEntity,sort_order:this._spotifySortOrder,max_items_per_section:this._spotifyMaxItems,visible_speakers:this._spotifyVisibleSpeakers}),!this._mounted)return;this._showToast(),_e.emit("spotify-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadSpotifyConfig(){if(this._beginSuppressAutoSave(),this._backend)try{const e=await this._backend.send("get_config");e?.spotify_card&&(this._spotifyShowHeader=e.spotify_card.show_header??!0,this._spotifyEntity=e.spotify_card.entity_id??"",this._spotifySortOrder="oldest_first"===e.spotify_card.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=e.spotify_card.max_items_per_section??6,this._spotifyVisibleSpeakers=e.spotify_card.visible_speakers??[])}catch{}}_selectSpotifyEntity(e){!function(e,t){e._spotifyEntity=t,e._spotifyDropdownOpen=!1}(this,e)}_renderSpotifyPreview(){return function(e){if(!1===e._spotifyConfigured)return q`<div class="preview-empty">${Ee("config.spotify_not_configured")}</div>`;if(!e._spotifyEntity||!e.hass)return q`<div class="preview-empty">${Ee("config.spotify_select_entity")}</div>`;if(!e.hass.states[e._spotifyEntity])return q`<div class="preview-empty">${Ee("config.spotify_select_entity")}</div>`;const t=[{id:"all",label:Ee("spotify.tab_all"),active:!0},{id:"tracks",label:Ee("spotify.tab_tracks"),active:!1},{id:"playlists",label:Ee("spotify.tab_playlists"),active:!1},{id:"podcasts",label:Ee("spotify.tab_podcasts"),active:!1}],i=[{name:"Daily Mix 1",meta:Ee("spotify.type_playlist"),icon:"mdi:playlist-music"},{name:Ee("spotify.saved_tracks"),meta:"128 "+Ee("spotify.tracks_count",{count:""}).trim(),icon:"mdi:heart"},{name:"Discover Weekly",meta:Ee("spotify.type_playlist"),icon:"mdi:playlist-music"}];return q`
    <div class="preview-spotify-wrap">
      ${e._spotifyShowHeader?q`
        <div class="ps-card-header">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <span class="ps-card-title">${Ee("spotify.title")}</span>
        </div>
      `:F}
      <div class="preview-spotify">
        <div class="ps-search">
          <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          <span class="ps-search-text">${Ee("spotify.search_placeholder")}</span>
        </div>
        <div class="ps-tabs">
          ${t.map(e=>q`
            <span class="ps-tab ${e.active?"active":""}">${e.label}</span>
          `)}
        </div>
        <div class="ps-section-label">${Ee("spotify.my_playlists")}</div>
        ${i.map(e=>q`
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
  `}(this)}_renderSpotifySetupGuide(){return q`
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
          ${Ee("config.spotify_not_configured")}
        </div>
        <div style="font-size: 13px; color: var(--t3); margin-bottom: 20px; line-height: 1.5;">
          ${Ee("config.spotify_setup_guide")}
        </div>

        <div style="text-align: left; padding: 0 8px;">
          ${[1,2,3,4].map(e=>q`
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
                ${Ee(`config.spotify_setup_step${e}`)}
              </span>
            </div>
          `)}
        </div>

        <div style="
          font-size: 12px; color: var(--t3); margin-top: 16px;
          padding: 10px; border-radius: var(--radius-md);
          background: var(--s1); border: 1px solid var(--b1);
        ">
          ${Ee("config.spotify_setup_note")}
        </div>

        <button
          class="btn btn-accent"
          style="margin-top: 20px;"
          @click=${()=>{window.open("/config/integrations/dashboard","_blank")}}
        >
          <ha-icon .icon=${"mdi:cog"} style="--mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center;"></ha-icon>
          ${Ee("config.spotify_open_settings")}
        </button>
      </div>
    </div>
  `}_renderSpotifyTab(){return function(e){if(null===e._spotifyConfigured)return q`<div class="tab-panel" id="panel-spotify">
      <div class="preview-empty">${Ee("config.spotify_checking")}</div>
    </div>`;if(!1===e._spotifyConfigured)return e._renderSpotifySetupGuide();const t=e.hass?Object.keys(e.hass.states).filter(e=>e.startsWith("media_player.")).sort():[],i=t.find(t=>t===e._spotifyEntity);return q`
    <div class="tab-panel" id="panel-spotify">
      <div class="section-label">${Ee("config.spotify_entity")}</div>
      <div class="section-desc">${Ee("config.spotify_entity_desc")}</div>
      <div class="dropdown ${e._spotifyDropdownOpen?"open":""}">
        <button
          class="dropdown-trigger"
          @click=${()=>e._spotifyDropdownOpen=!e._spotifyDropdownOpen}
          aria-expanded=${e._spotifyDropdownOpen?"true":"false"}
          aria-haspopup="listbox"
        >
          <ha-icon .icon=${"mdi:spotify"} style="color: #1DB954;"></ha-icon>
          <span>${i||Ee("common.select")}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="dropdown-menu" role="listbox">
          ${t.map(t=>q`
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

      <div class="section-label">${Ee("config.spotify_sort_order")}</div>
      <div class="section-desc">${Ee("config.spotify_sort_order_desc")}</div>
      <div class="feature-list">
        <button
          class="feature-row"
          @click=${()=>{e._spotifySortOrder="recent_first"}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:sort-clock-descending"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.spotify_sort_recent")}</div>
          </div>
          <span
            class="toggle ${"recent_first"===e._spotifySortOrder?"on":""}"
            role="switch"
            aria-checked=${"recent_first"===e._spotifySortOrder?"true":"false"}
          ></span>
        </button>
        <button
          class="feature-row"
          @click=${()=>{e._spotifySortOrder="oldest_first"}}
        >
          <div class="feature-icon">
            <ha-icon .icon=${"mdi:sort-clock-ascending"}></ha-icon>
          </div>
          <div class="feature-text">
            <div class="feature-name">${Ee("config.spotify_sort_oldest")}</div>
          </div>
          <span
            class="toggle ${"oldest_first"===e._spotifySortOrder?"on":""}"
            role="switch"
            aria-checked=${"oldest_first"===e._spotifySortOrder?"true":"false"}
          ></span>
        </button>
      </div>

      <div class="section-label">${Ee("config.spotify_max_items")}</div>
      <div class="section-desc">${Ee("config.spotify_max_items_desc")}</div>
      <div style="display: flex; align-items: center; gap: 12px; padding: 4px 0;">
        <input
          type="range"
          min="1"
          max="20"
          .value=${String(e._spotifyMaxItems)}
          @input=${t=>{e._spotifyMaxItems=parseInt(t.target.value,10)}}
          style="flex: 1; accent-color: #1DB954;"
        />
        <span style="
          font-size: 13px; font-weight: 600; color: var(--t1);
          min-width: 28px; text-align: center;
        ">${e._spotifyMaxItems}</span>
      </div>

      <div class="section-label">${Ee("config.spotify_speakers")}</div>
      <div class="section-desc">${Ee("config.spotify_speakers_desc")}</div>
      ${(()=>{const t=e.hass?Object.entries(e.hass.states).filter(([e])=>e.startsWith("media_player.")).map(([t,i])=>({entityId:t,name:i.attributes.friendly_name??t,visible:e._spotifyVisibleSpeakers.includes(t)})):[],i=[...e._spotifyVisibleSpeakers.map(e=>t.find(t=>t.entityId===e)).filter(e=>!!e),...t.filter(e=>!e.visible).sort((e,t)=>e.name.localeCompare(t.name))];return q`
          <div class="item-list">
            ${i.map(t=>{const i=t.visible,a=i?e._spotifyVisibleSpeakers.indexOf(t.entityId):-1,o=e._dragIdx===a&&-1!==a&&"speakers"===e._dragContext,r=e._dropIdx===a&&-1!==a&&"speakers"===e._dragContext,s=["item-row",i?"":"disabled",o?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return q`
                <div
                  class=${s}
                  draggable=${i?"true":"false"}
                  @dragstart=${()=>{i&&-1!==a&&e._onDragStart(a,"speakers")}}
                  @dragover=${t=>{i&&-1!==a&&e._onDragOver(a,t)}}
                  @dragleave=${()=>e._onDragLeave()}
                  @drop=${t=>{i&&-1!==a&&e._onDropSpeaker(a,t)}}
                  @dragend=${()=>e._onDragEnd()}
                >
                  ${i?q`
                    <span class="drag-handle">
                      <ha-icon .icon=${"mdi:drag"}></ha-icon>
                    </span>
                  `:q`<span style="width:24px;"></span>`}
                  <div class="item-info">
                    <span class="item-name">${t.name}</span>
                    <span class="item-meta">${t.entityId}</span>
                  </div>
                  <button
                    class="toggle ${i?"on":""}"
                    @click=${()=>e._toggleSpotifySpeaker(t.entityId)}
                    role="switch"
                    aria-checked=${i?"true":"false"}
                    aria-label="${Ee(i?"common.hide":"common.show")} ${t.name}"
                  ></button>
                </div>
              `})}
          </div>
        `})()}

      <div class="save-bar">
        <button class="btn btn-ghost" @click=${()=>e._loadSpotifyConfig()}>${Ee("common.reset")}</button>
      </div>
    </div>
  `}(this)}_toggleSpotifySpeaker(e){!function(e,t){e._spotifyVisibleSpeakers.includes(t)?e._spotifyVisibleSpeakers=e._spotifyVisibleSpeakers.filter(e=>e!==t):e._spotifyVisibleSpeakers=[...e._spotifyVisibleSpeakers,t]}(this,e)}_onDropSpeaker(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t||"speakers"!==e._dragContext)return e._dragIdx=null,void(e._dropIdx=null);const a=[...e._spotifyVisibleSpeakers];if(e._dragIdx>=a.length||t>=a.length)return e._dragIdx=null,void(e._dropIdx=null);const[o]=a.splice(e._dragIdx,1);a.splice(t,0,o),e._spotifyVisibleSpeakers=a,e._dragIdx=null,e._dropIdx=null}(this,e,t)}async _saveTitle(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_title_config",{title:this._titleText,sources:this._titleSources.map(e=>({source_type:e.source_type,entity:e.entity||"",label:e.label||"",modes:e.modes}))}),!this._mounted)return;this._showToast(),_e.emit("title-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadTitleConfig(){if(this._beginSuppressAutoSave(),this._backend){this._iconPopupModeIdx=null,this._colorPickerModeIdx=null,this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1;try{const e=await this._backend.send("get_config");e?.title_card&&(this._titleText=e.title_card.title??"",this._titleSources=(e.title_card.sources??[]).map(e=>({source_type:e.source_type||"",entity:e.entity||"",label:e.label||"",modes:(e.modes||[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"}))})))}catch{}}}_addTitleSource(e){!function(e,t){e._titleAddSourceDropdownOpen=!1,e._titleSources=[...e._titleSources,{source_type:t,entity:"",label:"",modes:[]}],e._titleEditingSourceIdx=e._titleSources.length-1}(this,e)}_removeTitleSource(e){!function(e,t){const i=[...e._titleSources];i.splice(t,1),e._titleSources=i,e._titleEditingSourceIdx===t?e._titleEditingSourceIdx=null:null!==e._titleEditingSourceIdx&&e._titleEditingSourceIdx>t&&e._titleEditingSourceIdx--}(this,e)}_setTitleSourceEntity(e,t){!function(e,t,i){e._titleAddEntityDropdownOpen=!1;const a=[...e._titleSources];if(a[t]){if(a[t]={...a[t],entity:i},i.startsWith("input_select.")&&e.hass){const o=e.hass.states[i];if(o){const e=o.attributes.options??[],i=new Map(a[t].modes.map(e=>[e.id,e]));a[t]={...a[t],modes:e.map(e=>i.get(e)??{id:e,label:e,icon:"",color:"neutral"})}}}else i||(a[t]={...a[t],modes:[]});e._titleSources=a}}(this,e,t)}_setTitleSourceLabel(e,t){!function(e,t,i){const a=[...e._titleSources];a[t]&&(a[t]={...a[t],label:i},e._titleSources=a)}(this,e,t)}_addTitleModeEntity(e,t){!function(e,t,i){e._titleAddEntityDropdownOpen=!1;const a=[...e._titleSources];if(!a[t])return;if(a[t].modes.some(e=>e.id===i))return;const o=e.hass?.states[i],r=o?.attributes.friendly_name||i.split(".")[1]||i,s=i.startsWith("scene.")?"mdi:palette":"mdi:toggle-switch",n=i.startsWith("scene.")?"accent":"success";a[t]={...a[t],modes:[...a[t].modes,{id:i,label:r,icon:s,color:n}]},e._titleSources=a}(this,e,t)}_removeTitleModeEntity(e,t){!function(e,t,i){const a=[...e._titleSources];a[t]&&(a[t]={...a[t],modes:a[t].modes.filter(e=>e.id!==i)},e._titleSources=a)}(this,e,t)}_moveTitleMode(e,t,i){!function(e,t,i,a){const o=[...e._titleSources];if(!o[t])return;const r=[...o[t].modes],s=i+a;s<0||s>=r.length||([r[i],r[s]]=[r[s],r[i]],o[t]={...o[t],modes:r},e._titleSources=o)}(this,e,t,i)}_updateTitleMode(e,t,i){!function(e,t,i,a){let o=t;const r=[...e._titleSources];for(let s=0;s<r.length;s++){if(o<r[s].modes.length){const t=[...r[s].modes];return t[o]={...t[o],[i]:a},r[s]={...r[s],modes:t},void(e._titleSources=r)}o-=r[s].modes.length}}(this,e,t,i)}async _openIconPopup(e){if(!this._iconLoading){if(0===this._iconList.length){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}e<this._titleModes.length&&(this._iconSearch="",this._iconPopupModeIdx=e)}}_getFilteredIcons(){return function(e){const t=e._iconSearch.toLowerCase().trim(),i=e._iconList;return t?i.filter(e=>e.toLowerCase().includes(t)).slice(0,120):i.slice(0,120)}(this)}_renderIconPopup(){return function(e){if(null===e._iconPopupModeIdx)return F;const t=e._getFilteredIcons(),i=e._titleModes[e._iconPopupModeIdx]?.icon??"";return q`
    <div class="icon-popup-overlay" @click=${t=>{t.target===t.currentTarget&&(e._iconPopupModeIdx=null)}}>
      <div class="icon-popup">
        <div class="icon-popup-header">
          <span class="icon-popup-title">${Ee("config.title_mode_icon")}</span>
          <input
            class="icon-popup-search"
            type="text"
            placeholder=${"mdi:..."}
            .value=${e._iconSearch}
            @input=${t=>{e._iconSearch=t.target.value}}
          />
        </div>
        <div class="icon-popup-grid-wrap">
          ${t.length>0||!e._iconSearch?q`
            <div class="icon-popup-grid">
              <button
                class="icon-pick ${""===i?"selected":""}"
                @click=${()=>{e._updateTitleMode(e._iconPopupModeIdx,"icon",""),e._iconPopupModeIdx=null}}
                aria-label=${Ee("config.title_no_icon")}
              >
                <ha-icon .icon=${"mdi:cancel"} style="opacity:0.4;"></ha-icon>
              </button>
              ${t.map(t=>q`
                <button
                  class="icon-pick ${t===i?"selected":""}"
                  @click=${()=>{e._updateTitleMode(e._iconPopupModeIdx,"icon",t),e._iconPopupModeIdx=null}}
                  aria-label=${t}
                >
                  <ha-icon .icon=${t}></ha-icon>
                </button>
              `)}
            </div>
          `:q`<div class="icon-popup-empty">${Ee("config.title_no_icons_found")}</div>`}
        </div>
      </div>
    </div>
  `}(this)}_renderTitlePreview(){return Be(this)}_openColorPicker(e){!function(e,t){if(t>=e._titleModes.length)return;const i=e._titleModes[t].color;i.startsWith("#")&&7===i.length?(e._colorPickerHex=i,e._colorPickerPos=be(i)):(e._colorPickerHex="#ffffff",e._colorPickerPos={x:50,y:50}),e._colorPickerModeIdx=t,e.updateComplete.then(()=>{requestAnimationFrame(()=>{const t=e.shadowRoot?.querySelector(".cp-wheel-wrap canvas");t&&(e._cpCanvas=t,ye(t))})})}(this,e)}_closeColorPicker(){var e;e=this,e._cancelColorDrag?.(),e._cancelColorDrag=void 0,e._colorPickerModeIdx=null,e._cpCanvas=null}_applyColorPicker(){var e;null!==(e=this)._colorPickerModeIdx&&e._colorPickerModeIdx<e._titleModes.length&&e._updateTitleMode(e._colorPickerModeIdx,"color",e._colorPickerHex),e._closeColorPicker()}_onCpWheel(e){Ye(this,e)}_renderColorPicker(){return function(e){if(null===e._colorPickerModeIdx)return F;const t=e._colorPickerHex;return q`
    <div class="cp-overlay" @click=${t=>{t.target===t.currentTarget&&e._closeColorPicker()}}>
      <div class="cp-dialog">
        <span class="cp-title">${Ee("config.title_color_picker_title")}</span>
        <div class="cp-wheel-wrap">
          <canvas
            @mousedown=${t=>{e._cancelColorDrag?.(),e._onCpWheel(t);const i=t=>e._onCpWheel(t),a=()=>{window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",a),e._cancelColorDrag=void 0};window.addEventListener("mousemove",i),window.addEventListener("mouseup",a),e._cancelColorDrag=a}}
            @touchstart=${t=>{e._cancelColorDrag?.(),t.preventDefault(),e._onCpWheel(t);const i=t=>{t.preventDefault(),e._onCpWheel(t)},a=()=>{window.removeEventListener("touchmove",i),window.removeEventListener("touchend",a),e._cancelColorDrag=void 0};window.addEventListener("touchmove",i,{passive:!1}),window.addEventListener("touchend",a),e._cancelColorDrag=a}}
          ></canvas>
          <div class="cp-cursor" style="left:${e._colorPickerPos.x}%;top:${e._colorPickerPos.y}%;background:${t}"></div>
        </div>
        <div class="cp-preview" style="background:${t}"></div>
        <span class="cp-hex">${t}</span>
        <button class="cp-confirm" @click=${()=>e._applyColorPicker()}>
          ${Ee("common.select")}
        </button>
      </div>
    </div>
  `}(this)}_renderTitleTab(){return We(this)}static{this._TAB_META=[{id:"dashboard",icon:"mdi:view-dashboard",labelKey:"config.tab_dashboard"},{id:"title",icon:"mdi:format-title",labelKey:"config.tab_title"},{id:"navbar",icon:"mdi:dock-bottom",labelKey:"config.tab_navbar"},{id:"popup",icon:"mdi:card-outline",labelKey:"config.tab_popup"},{id:"light",icon:"mdi:lightbulb-group",labelKey:"config.tab_light"},{id:"weather",icon:"mdi:weather-partly-cloudy",labelKey:"config.tab_weather"},{id:"media",icon:"mdi:speaker",labelKey:"config.tab_media"},{id:"cover",icon:"mdi:blinds",labelKey:"config.tab_cover"},{id:"fan",icon:"mdi:fan",labelKey:"config.tab_fan"},{id:"spotify",icon:"mdi:spotify",labelKey:"config.tab_spotify"},{id:"presence",icon:"mdi:account-group",labelKey:"config.tab_presence"}]}_renderTabSelect(){const t=e._TAB_META.find(e=>e.id===this._tab),i=this._tabSearch.toLowerCase();return q`
      <div class="tab-select-wrap ${this._tabSelectOpen?"open":""}">
        <button
          class="tab-select-trigger"
          @click=${()=>{this._tabSelectOpen=!this._tabSelectOpen,this._tabSearch=""}}
          aria-haspopup="listbox"
          aria-expanded=${this._tabSelectOpen?"true":"false"}
        >
          <ha-icon .icon=${t?.icon||"mdi:cog"}></ha-icon>
          <span>${t?Ee(t.labelKey):""}</span>
          <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
        </button>
        <div class="tab-select-menu" role="listbox">
          <input
            type="text"
            class="tab-select-search"
            placeholder="${Ee("config.search_entity")}"
            .value=${this._tabSearch}
            @input=${e=>{this._tabSearch=e.target.value}}
            @click=${e=>e.stopPropagation()}
          />
          ${e._TAB_META.map(e=>{const t=Ee(e.labelKey),a=i&&!t.toLowerCase().includes(i)&&!e.id.includes(i);return q`
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
    `}render(){return this._lang,this.hass?q`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="${Ee("common.back")}">
            <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
          </button>
          <span class="page-title">${Ee("config.title")}</span>
          <span class="page-subtitle">${Ee("config.brand")}</span>
        </div>

        <div class="glass config-panel">
          ${this._renderTabSelect()}

          <div class="preview-encart">
            <div class="preview-label">${Ee("config.preview")}</div>
            ${"navbar"===this._tab?this._renderNavbarPreview():"popup"===this._tab?this._renderPopupPreview():"light"===this._tab?this._renderLightPreview():"weather"===this._tab?this._renderWeatherPreview():"title"===this._tab?this._renderTitlePreview():"media"===this._tab?this._renderMediaPreview():"cover"===this._tab?this._renderCoverPreview():"fan"===this._tab?this._renderFanPreview():"spotify"===this._tab?this._renderSpotifyPreview():"presence"===this._tab?this._renderPresencePreview():this._renderDashboardPreview()}
          </div>

          ${"navbar"===this._tab?this._renderNavbarTab():"popup"===this._tab?this._renderPopupTab():"light"===this._tab?this._renderLightTab():"weather"===this._tab?this._renderWeatherTab():"title"===this._tab?this._renderTitleTab():"media"===this._tab?this._renderMediaTab():"cover"===this._tab?this._renderCoverTab():"fan"===this._tab?this._renderFanTab():"spotify"===this._tab?this._renderSpotifyTab():"presence"===this._tab?this._renderPresenceTab():this._renderDashboardTab()}
        </div>
      </div>

      ${this._pickerOpen?this._renderDateTimePicker():F}
      ${this._renderIconPopup()}
      ${this._renderColorPicker()}

      <div class="toast ${this._toast?"show":""} ${this._toastError?"error":""}">
        ${this._toastError?Ee("common.error_save"):Ee("common.config_saved")}
      </div>
    `:F}};Xe([pe({attribute:!1})],Je.prototype,"hass"),Xe([pe({type:Boolean})],Je.prototype,"narrow"),Xe([he()],Je.prototype,"_lang"),Xe([he()],Je.prototype,"_tab"),Xe([he()],Je.prototype,"_tabSelectOpen"),Xe([he()],Je.prototype,"_tabSearch"),Xe([he()],Je.prototype,"_rooms"),Xe([he()],Je.prototype,"_emptyRooms"),Xe([he()],Je.prototype,"_selectedRoom"),Xe([he()],Je.prototype,"_cards"),Xe([he()],Je.prototype,"_scenes"),Xe([he()],Je.prototype,"_lights"),Xe([he()],Je.prototype,"_lightRoom"),Xe([he()],Je.prototype,"_lightDropdownOpen"),Xe([he()],Je.prototype,"_iconPickerRoom"),Xe([he()],Je.prototype,"_dropdownOpen"),Xe([he()],Je.prototype,"_toast"),Xe([he()],Je.prototype,"_saving"),Xe([he()],Je.prototype,"_showLights"),Xe([he()],Je.prototype,"_showTemperature"),Xe([he()],Je.prototype,"_showHumidity"),Xe([he()],Je.prototype,"_showMedia"),Xe([he()],Je.prototype,"_autoSort"),Xe([he()],Je.prototype,"_tempHigh"),Xe([he()],Je.prototype,"_tempLow"),Xe([he()],Je.prototype,"_humidityThreshold"),Xe([he()],Je.prototype,"_weatherEntity"),Xe([he()],Je.prototype,"_weatherHiddenMetrics"),Xe([he()],Je.prototype,"_weatherShowDaily"),Xe([he()],Je.prototype,"_weatherShowHourly"),Xe([he()],Je.prototype,"_weatherShowHeader"),Xe([he()],Je.prototype,"_weatherDropdownOpen"),Xe([he()],Je.prototype,"_titleText"),Xe([he()],Je.prototype,"_titleSources"),Xe([he()],Je.prototype,"_titleEditingSourceIdx"),Xe([he()],Je.prototype,"_titleAddSourceDropdownOpen"),Xe([he()],Je.prototype,"_titleAddEntityDropdownOpen"),Xe([he()],Je.prototype,"_iconPopupModeIdx"),Xe([he()],Je.prototype,"_iconSearch"),Xe([he()],Je.prototype,"_colorPickerModeIdx"),Xe([he()],Je.prototype,"_colorPickerHex"),Xe([he()],Je.prototype,"_colorPickerPos"),Xe([he()],Je.prototype,"_lightShowHeader"),Xe([he()],Je.prototype,"_coverShowHeader"),Xe([he()],Je.prototype,"_coverDashboardEntities"),Xe([he()],Je.prototype,"_coverDashboardOrder"),Xe([he()],Je.prototype,"_coverPresets"),Xe([he()],Je.prototype,"_coverEntityPresets"),Xe([he()],Je.prototype,"_coverRoom"),Xe([he()],Je.prototype,"_coverRoomDropdownOpen"),Xe([he()],Je.prototype,"_coverRoomEntities"),Xe([he()],Je.prototype,"_coverPresetInput"),Xe([he()],Je.prototype,"_coverEntityPresetInput"),Xe([he()],Je.prototype,"_coverPresetsExpandedEntity"),Xe([he()],Je.prototype,"_fanShowHeader"),Xe([he()],Je.prototype,"_fanRoom"),Xe([he()],Je.prototype,"_fanRoomDropdownOpen"),Xe([he()],Je.prototype,"_fanRoomEntities"),Xe([he()],Je.prototype,"_presenceShowHeader"),Xe([he()],Je.prototype,"_presencePersonEntities"),Xe([he()],Je.prototype,"_presenceSmartphoneSensors"),Xe([he()],Je.prototype,"_presenceNotifyServices"),Xe([he()],Je.prototype,"_presenceDrivingSensors"),Xe([he()],Je.prototype,"_presenceDropdownOpen"),Xe([he()],Je.prototype,"_presenceDropdownSearch"),Xe([he()],Je.prototype,"_mediaShowHeader"),Xe([he()],Je.prototype,"_mediaExtraEntities"),Xe([he()],Je.prototype,"_mediaRoom"),Xe([he()],Je.prototype,"_mediaRoomDropdownOpen"),Xe([he()],Je.prototype,"_mediaRoomNativePlayers"),Xe([he()],Je.prototype,"_mediaAddDropdownOpen"),Xe([he()],Je.prototype,"_mediaEntitySearch"),Xe([he()],Je.prototype,"_spotifyShowHeader"),Xe([he()],Je.prototype,"_spotifyEntity"),Xe([he()],Je.prototype,"_spotifySortOrder"),Xe([he()],Je.prototype,"_spotifyDropdownOpen"),Xe([he()],Je.prototype,"_spotifyMaxItems"),Xe([he()],Je.prototype,"_spotifyVisibleSpeakers"),Xe([he()],Je.prototype,"_spotifyConfigured"),Xe([he()],Je.prototype,"_dashboardEnabledCards"),Xe([he()],Je.prototype,"_dashboardCardOrder"),Xe([he()],Je.prototype,"_dashboardHideHeader"),Xe([he()],Je.prototype,"_dashboardHideSidebar"),Xe([he()],Je.prototype,"_dashboardExpanded"),Xe([he()],Je.prototype,"_scheduleExpandedEntity"),Xe([he()],Je.prototype,"_pickerOpen"),Xe([he()],Je.prototype,"_pickerYear"),Xe([he()],Je.prototype,"_pickerMonth"),Xe([he()],Je.prototype,"_pickerStartDay"),Xe([he()],Je.prototype,"_pickerStartMonth"),Xe([he()],Je.prototype,"_pickerStartYear"),Xe([he()],Je.prototype,"_pickerEndDay"),Xe([he()],Je.prototype,"_pickerEndMonth"),Xe([he()],Je.prototype,"_pickerEndYear"),Xe([he()],Je.prototype,"_pickerStartHour"),Xe([he()],Je.prototype,"_pickerStartMinute"),Xe([he()],Je.prototype,"_pickerEndHour"),Xe([he()],Je.prototype,"_pickerEndMinute"),Xe([he()],Je.prototype,"_pickerPhase"),Xe([he()],Je.prototype,"_dragIdx"),Xe([he()],Je.prototype,"_dropIdx"),Xe([he()],Je.prototype,"_dragContext"),Xe([he()],Je.prototype,"_dragModeSrcIdx"),Xe([he()],Je.prototype,"_toastError");let Ze=Je;try{customElements.define("glass-config-panel",Ze)}catch{}}();
