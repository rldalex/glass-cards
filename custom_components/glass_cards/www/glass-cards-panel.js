!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let r=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(a,e,i)},s=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,m=globalThis,u=m.trustedTypes,_=u?u.emptyScript:"",g=m.reactiveElementPolyfillSupport,v=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(a){i=null}}return i}},b=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const o=a?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...l(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),r=e.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=a;const o=r.fromAttribute(t,e.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const o=this.constructor;if(!1===a&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??b)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+D,I=`<${C}>`,z=document,A=()=>z.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,O="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,L=/>/g,j=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,N=/"/g,V=/^(?:script|style|textarea|title)$/i,q=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),F=q(1),U=q(2),W=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),Y=new WeakMap,K=z.createTreeWalker(z,129);function G(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class X{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,o=0;const s=e.length-1,n=this.parts,[c,d]=((e,t)=>{const i=e.length-1,a=[];let r,o=2===t?"<svg>":3===t?"<math>":"",s=R;for(let n=0;n<i;n++){const t=e[n];let i,c,d=-1,l=0;for(;l<t.length&&(s.lastIndex=l,c=s.exec(t),null!==c);)l=s.lastIndex,s===R?"!--"===c[1]?s=M:void 0!==c[1]?s=L:void 0!==c[2]?(V.test(c[2])&&(r=RegExp("</"+c[2],"g")),s=j):void 0!==c[3]&&(s=j):s===j?">"===c[0]?(s=r??R,d=-1):void 0===c[1]?d=-2:(d=s.lastIndex-c[2].length,i=c[1],s=void 0===c[3]?j:'"'===c[3]?N:H):s===N||s===H?s=j:s===M||s===L?s=R:(s=j,r=void 0);const p=s===j&&e[n+1].startsWith("/>")?" ":"";o+=s===R?t+I:d>=0?(a.push(i),t.slice(0,d)+E+t.slice(d)+D+p):t+D+(-2===d?n:p)}return[G(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]})(e,t);if(this.el=X.createElement(c,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=K.nextNode())&&n.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=d[o++],i=a.getAttribute(e).split(D),s=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?te:"?"===s[1]?ie:"@"===s[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(D)&&(n.push({type:6,index:r}),a.removeAttribute(e));if(V.test(a.tagName)){const e=a.textContent.split(D),t=e.length-1;if(t>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],A()),K.nextNode(),n.push({type:2,index:++r});a.append(e[t],A())}}}else if(8===a.nodeType)if(a.data===C)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(D,e+1));)n.push({type:7,index:r}),e+=D.length-1}r++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,a){if(t===W)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const o=P(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=J(e,r._$AS(e,t.values),r,a)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??z).importNode(t,!0);K.currentNode=a;let r=K.nextNode(),o=0,s=0,n=i[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new Q(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new re(r,this,e)),this._$AV.push(t),n=i[++s]}o!==n?.index&&(r=K.nextNode(),o++)}return K.currentNode=z,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),P(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Z(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new X(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new Q(this.O(A()),this.O(A()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(e,t=this,i,a){const r=this.strings;let o=!1;if(void 0===r)e=J(this,e,t,0),o=!P(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const a=e;let s,n;for(e=r[0],s=0;s<r.length-1;s++)n=J(this,a[i+s],t,s),n===W&&(n=this._$AH[s]),o||=!P(n)||n!==this._$AH[s],n===B?e=B:e!==B&&(e+=(n??"")+r[s+1]),this._$AH[s]=n}o&&!a&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class ae extends ee{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??B)===W)return;const i=this._$AH,a=e===B&&i!==B||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==B&&(i===B||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=x.litHtmlPolyfillSupport;oe?.(X,Q),(x.litHtmlVersions??=[]).push("3.3.2");const se=globalThis;class ne extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new Q(t.insertBefore(A(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ne._$litElement$=!0,ne.finalized=!0,se.litElementHydrateSupport?.({LitElement:ne});const ce=se.litElementPolyfillSupport;ce?.({LitElement:ne}),(se.litElementVersions??=[]).push("4.2.2");const de=[o`
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
        position: absolute;
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
        min-width: 0;
      }

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

      /* ── Mobile nav adjustments ── */
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
          grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
          gap: 0.375rem;
        }
        .room-card {
          padding: 0.75rem 0.375rem;
          gap: 0.375rem;
        }
        .room-card ha-icon { --mdc-icon-size: 1.25rem; }
        .room-card .room-name { font-size: var(--fz-xs); }
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
        transition: opacity var(--t-fast) 0.1s, visibility 0s;
      }
      .section-content {
        padding: 0.75rem 0.25rem 0.5rem;
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

      .dash-toggle {
        position: absolute; top: 6px; right: 6px;
        width: 32px; height: 18px; border-radius: 9px;
        background: var(--s2); border: 1px solid var(--b2);
        cursor: pointer; transition: background 0.2s var(--ease-std), border-color 0.2s var(--ease-std);
        padding: 0; outline: none; z-index: 2;
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
`,o`
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
        margin-bottom: 1rem;
        padding: 0.75rem;
        border-radius: var(--radius-lg);
        background: var(--s1);
        border: 1px solid var(--b1);
      }
      .preview-label {
        font-size: var(--fz-xxs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
        margin-bottom: 0.5rem;
      }

      /* Preview navbar — miniature faithful to real navbar */
      .preview-navbar {
        display: flex;
        align-items: center;
        gap: 0.125rem;
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
        gap: 0.25rem;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        transition: grid-template-columns 0.35s var(--ease-out);
      }
      .preview-nav-item.active-preview .preview-nav-label {
        grid-template-columns: 1fr;
      }
      .preview-nav-label span {
        min-width: 0;
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }
      .preview-popup-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
        padding: 0.125rem 0.5rem;
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
        padding: 0.125rem 0.375rem;
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
        padding: 0.5rem 0.75rem; flex: 1;
      }
      .mp-top {
        display: flex; align-items: center; justify-content: space-between;
      }
      .mp-pill {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding: 0.125rem 0.5rem 0.125rem 0.25rem;
        border-radius: var(--radius-full);
        backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        background: rgba(var(--rgb-black),0.35); border: 1px solid rgba(var(--rgb-white),0.08);
        font-size: var(--fz-xxs); font-weight: 600; color: rgba(var(--rgb-white),0.9);
      }
      .mp-pill ha-icon { --mdc-icon-size: 0.625rem; display: flex; align-items: center; justify-content: center; }
      .mp-eq {
        display: flex; align-items: flex-end; gap: 0.125rem;
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
        padding: 0.5rem 0.75rem 0.5rem;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        transition: background var(--t-med), width var(--t-med);
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        position: relative;
      }
      .pw-tint {
        position: absolute; inset: 0;
        border-radius: inherit;
        pointer-events: none; z-index: 0;
      }
      .pw-content {
        position: relative; z-index: 1;
        padding: 0.5rem;
        display: flex; flex-direction: column; gap: 0.375rem;
      }
      .pw-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .pw-header-left {
        display: flex; flex-direction: column; gap: 0.125rem;
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
        display: flex; align-items: center; gap: 0.125rem;
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
        gap: 0.125rem;
        border-radius: var(--radius-sm);
        background: var(--b1);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }
      .pw-metric {
        display: flex; align-items: center; justify-content: center; gap: 0.125rem;
        padding: 0.25rem 0.125rem;
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
        display: flex; flex-direction: column; gap: 0.125rem;
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
        --mdc-icon-size: 0.625rem; color: var(--c-spotify);
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
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
        display: flex; gap: 0.125rem;
      }
      .ps-tab {
        font-size: var(--fz-xxs); font-weight: 600; letter-spacing: 0.3px;
        color: var(--t4);
        padding: 0.125rem 0.25rem;
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
        --mdc-icon-size: 0.75rem; color: var(--c-spotify); flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        opacity: 0.6;
      }

      /* ── Spotify setup guide ── */
      .pw-sp-setup-box {
        padding: 1.25rem; border-radius: var(--radius-lg);
        background: var(--s2); border: 1px solid var(--b2);
        text-align: center;
      }
      .pw-sp-setup-icon {
        color: var(--c-spotify); --mdc-icon-size: 3rem;
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 1rem;
      }
      .pw-sp-setup-title {
        font-size: 1rem; font-weight: 600; color: var(--t1); margin-bottom: 0.5rem;
      }
      .pw-sp-setup-desc {
        font-size: 0.8125rem; color: var(--t3); margin-bottom: 1.25rem; line-height: 1.5;
      }
      .pw-sp-steps {
        text-align: left; padding: 0 0.5rem;
      }
      .pw-sp-step {
        display: flex; align-items: flex-start; gap: 0.625rem;
        margin-bottom: 0.75rem; font-size: 0.8125rem; color: var(--t2);
      }
      .pw-sp-step-num {
        flex-shrink: 0; width: 1.375rem; height: 1.375rem;
        border-radius: 50%; background: var(--s3);
        display: flex; align-items: center; justify-content: center;
        font-size: 0.75rem; font-weight: 600; color: var(--t1);
      }
      .pw-sp-step-text {
        line-height: 1.375rem;
      }
      .pw-sp-note {
        font-size: 0.75rem; color: var(--t3); margin-top: 1rem;
        padding: 0.625rem; border-radius: var(--radius-md);
        background: var(--s1); border: 1px solid var(--b1);
      }
      .pw-sp-setup-btn {
        margin-top: 1.25rem;
      }
      .pw-sp-setup-btn ha-icon {
        --mdc-icon-size: 1rem;
        display: flex; align-items: center; justify-content: center;
      }
      .pw-sp-entity-icon {
        color: var(--c-spotify);
      }
      .pw-sp-drag-spacer {
        width: 1.5rem;
      }

      /* ── Preview dashboard ── */
      .preview-dashboard {
        border-radius: var(--radius-lg);
        background: rgba(17, 24, 39, 0.6);
        padding: 0.5rem;
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
        padding: 0.5rem 0.5rem;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }

      /* Cover preview — header */
      .pw-cv-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem 0.25rem;
      }
      .pw-cv-header-left {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .pw-cv-header-title {
        font-size: 0.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
      }
      .pw-cv-header-count {
        font-size: 0.5rem;
        font-weight: 600;
        padding: 0.0625rem 0.25rem;
        border-radius: var(--radius-sm);
      }
      .pw-cv-header-count.active {
        background: rgba(var(--rgb-purple), 0.15);
        color: var(--c-purple);
      }
      .pw-cv-header-count.idle {
        background: var(--s2);
        color: var(--t3);
      }
      .pw-cv-header-actions {
        display: flex;
        gap: 0.1875rem;
      }
      .pw-cv-header-btn {
        width: 1.125rem;
        height: 1.125rem;
        border-radius: 4px;
        background: var(--s2);
        border: 1px solid var(--b2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-header-btn ha-icon {
        --mdc-icon-size: 0.625rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Cover preview — tint */
      .pw-cv-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: radial-gradient(ellipse at 50% 50%, var(--c-purple), transparent 70%);
      }

      /* Cover preview — empty state */
      .pw-cv-empty {
        padding: 0.5rem;
        text-align: center;
        font-size: 0.625rem;
        color: var(--t4);
      }

      /* Cover preview — entity row */
      .pw-cv-row {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.125rem;
        position: relative;
        z-index: 1;
      }
      .pw-cv-row.compact {
        min-width: 0;
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }
      .pw-cv-row.full {
        grid-column: 1 / -1;
      }
      .pw-cv-row.right {
        padding-left: 0.5rem;
        border-left: 1px solid var(--b2);
      }

      /* Cover preview — icon box */
      .pw-cv-icon {
        width: 1.375rem;
        height: 1.375rem;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .pw-cv-icon.open {
        background: rgba(var(--rgb-purple), 0.1);
        border-color: rgba(var(--rgb-purple), 0.15);
      }
      .pw-cv-icon ha-icon {
        --mdc-icon-size: 0.8125rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-icon.open ha-icon {
        color: var(--c-purple);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-purple), 0.4));
      }

      /* Cover preview — info */
      .pw-cv-info {
        flex: 1;
        min-width: 0;
      }
      .pw-cv-name {
        font-size: 0.625rem;
        font-weight: 600;
        color: var(--t1);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .pw-cv-sub {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.0625rem;
      }
      .pw-cv-state {
        font-size: 0.5rem;
        color: var(--t4);
      }
      .pw-cv-state.open {
        color: rgba(var(--rgb-purple), 0.6);
      }

      /* Cover preview — position */
      .pw-cv-pos {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--t3);
        font-variant-numeric: tabular-nums;
      }
      .pw-cv-pos.open {
        color: var(--c-purple);
      }
      .pw-cv-pos-unit {
        font-size: 0.5rem;
        font-weight: 500;
      }

      /* Cover preview — status dot */
      .pw-cv-dot {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--t4);
      }
      .pw-cv-dot.open {
        background: var(--c-purple);
        box-shadow: 0 0 6px rgba(var(--rgb-purple), 0.4);
      }

      /* Cover preview — fold separator */
      .pw-cv-fold-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, rgba(var(--rgb-purple), 0.3), transparent);
        margin: 0.125rem 0.25rem;
        opacity: 0.6;
      }

      /* Cover preview — controls panel */
      .pw-cv-controls {
        padding: 0.375rem 0.125rem 0.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        position: relative;
        z-index: 1;
      }
      .pw-cv-controls-label {
        font-size: 0.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }

      /* Cover preview — transport */
      .pw-cv-transport {
        display: flex;
        gap: 0.25rem;
        justify-content: center;
      }
      .pw-cv-transport-btn {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-transport-btn ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-transport-btn.accent ha-icon {
        color: var(--c-purple);
      }

      /* Cover preview — slider */
      .pw-cv-slider {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .pw-cv-slider ha-icon {
        --mdc-icon-size: 0.6875rem;
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cv-bar {
        flex: 1;
        height: 0.25rem;
        border-radius: 0.125rem;
        background: var(--s2);
        position: relative;
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
      }
      .pw-cv-bar-fill {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 0.125rem;
        background: linear-gradient(90deg, rgba(var(--rgb-purple), 0.4), var(--c-purple));
      }

      /* Cover preview — separator */
      .pw-cv-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }

      /* Cover preview — presets */
      .pw-cv-presets {
        display: flex;
        flex-wrap: wrap;
        gap: 0.1875rem;
        justify-content: center;
      }
      .pw-cv-preset {
        display: inline-flex;
        align-items: center;
        gap: 0.1875rem;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--b2);
        background: var(--s1);
        font-size: 0.5rem;
        font-weight: 600;
        color: var(--t3);
      }
      .pw-cv-preset.active {
        border-color: rgba(var(--rgb-purple), 0.3);
        background: rgba(var(--rgb-purple), 0.1);
        color: var(--c-purple);
      }
      .pw-cv-preset ha-icon {
        --mdc-icon-size: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Cover preview — remaining grid */
      .pw-cv-remaining-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        margin: 0.125rem 0.25rem;
      }
      .pw-cv-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
      }

      /* ── Presence preview ── */
      .preview-presence {
        padding: 0.75rem;
      }
      .preview-presence-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
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
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }

      /* ══════════════════════════════════════
         Climate preview (from prototype)
         ══════════════════════════════════════ */

      .preview-climate-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem 0.375rem;
      }
      .preview-climate-header-left {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .preview-climate-header-title {
        font-size: 10px;
        font-weight: 600;
        color: var(--t1);
      }
      .preview-climate-header-count {
        font-size: 8px;
        font-weight: 600;
        padding: 0.125rem 0.25rem;
        border-radius: var(--radius-sm);
      }
      .preview-climate-header-avg {
        font-size: 10px;
        font-weight: 600;
        color: var(--t3);
      }
      .preview-climate-card {
        padding: 0.5rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        border-radius: var(--radius-lg);
      }
      .preview-climate-tint {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0.12;
      }

      /* ── Climate row ── */
      .cl-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.125rem;
        position: relative;
        z-index: 1;
      }
      .cl-icon-btn {
        width: 24px;
        height: 24px;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1px solid var(--b1);
        background: var(--s2);
      }
      .cl-icon-btn ha-icon {
        --mdc-icon-size: 14px;
        display: flex; align-items: center; justify-content: center;
        color: var(--t3);
      }

      /* Heating state (orange) */
      .cl-row.heating .cl-icon-btn {
        background: rgba(var(--rgb-heat), 0.1);
        border-color: rgba(var(--rgb-heat), 0.15);
      }
      .cl-row.heating .cl-icon-btn ha-icon {
        color: var(--c-heat);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-heat), 0.5));
      }
      .cl-row.heating .cl-action-text { color: rgba(var(--rgb-heat), 0.6); }
      .cl-row.heating .cl-mode-badge {
        background: rgba(var(--rgb-heat), 0.1);
        color: rgba(var(--rgb-heat), 0.6);
      }
      .cl-row.heating .cl-temp-target { color: rgba(var(--rgb-heat), 0.6); }
      .cl-row.heating .cl-dot {
        background: var(--c-heat);
        box-shadow: 0 0 6px rgba(var(--rgb-heat), 0.4);
      }

      /* Cooling state (cyan) */
      .cl-row.cooling .cl-icon-btn {
        background: rgba(var(--rgb-cool), 0.1);
        border-color: rgba(var(--rgb-cool), 0.15);
      }
      .cl-row.cooling .cl-icon-btn ha-icon {
        color: var(--c-cool);
        filter: drop-shadow(0 0 4px rgba(var(--rgb-cool), 0.5));
      }
      .cl-row.cooling .cl-action-text { color: rgba(var(--rgb-cool), 0.6); }
      .cl-row.cooling .cl-mode-badge {
        background: rgba(var(--rgb-cool), 0.1);
        color: rgba(var(--rgb-cool), 0.6);
      }
      .cl-row.cooling .cl-temp-target { color: rgba(var(--rgb-cool), 0.6); }
      .cl-row.cooling .cl-dot {
        background: var(--c-cool);
        box-shadow: 0 0 6px rgba(var(--rgb-cool), 0.4);
      }

      /* Idle/off state */
      .cl-row.idle .cl-dot,
      .cl-row.off .cl-dot { background: var(--t4); }

      .cl-expand {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .cl-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
      }
      .cl-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t1);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .cl-sub {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .cl-action-text {
        font-size: 8px;
        font-weight: 500;
        color: var(--t3);
      }
      .cl-mode-badge {
        font-size: 7px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        padding: 0.125rem 0.25rem;
        border-radius: var(--radius-xs);
        background: var(--s3);
        color: var(--t3);
      }
      .cl-temps {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex-shrink: 0;
      }
      .cl-temp-current {
        font-size: 13px;
        font-weight: 700;
        color: var(--t1);
        font-variant-numeric: tabular-nums;
        line-height: 1;
      }
      .cl-temp-current .unit {
        font-size: 9px;
        font-weight: 500;
        color: var(--t3);
      }
      .cl-temp-target {
        font-size: 8px;
        font-weight: 500;
        color: var(--t3);
        margin-top: 0.125rem;
      }
      .cl-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      /* ── Climate expanded controls ── */
      .cl-empty {
        padding: 0.75rem;
        text-align: center;
        font-size: 0.6875rem;
        color: var(--t4);
      }
      .cl-preview-wrap {
        padding: 0.375rem 0;
      }
      .cl-controls {
        padding: 0.375rem 0.125rem 0.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        position: relative;
        z-index: 1;
      }
      .cl-stepper-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.625rem;
      }
      .cl-stepper-btn {
        width: 1.625rem;
        height: 1.625rem;
        border-radius: var(--radius-sm);
        background: var(--s2);
        border: 1px solid var(--b2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cl-stepper-btn.sm {
        width: 1.5rem;
        height: 1.5rem;
      }
      .cl-stepper-btn ha-icon {
        --mdc-icon-size: 0.875rem;
        color: var(--t3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cl-stepper-btn.sm ha-icon {
        --mdc-icon-size: 0.75rem;
      }
      .cl-stepper-center {
        text-align: center;
      }
      .cl-stepper-label {
        font-size: 0.4375rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--t4);
      }
      .cl-stepper-value {
        font-size: 1rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .cl-stepper-value.sm {
        font-size: 0.875rem;
      }
      .cl-separator {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
      }
      .cl-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.1875rem;
        justify-content: center;
      }
      .cl-chips.pb {
        padding-bottom: 0.25rem;
      }
      .cl-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.1875rem;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
        font-size: 0.5rem;
        font-weight: 600;
      }
      .cl-chip ha-icon {
        --mdc-icon-size: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cl-remaining-sep {
        height: 0.0625rem;
        background: linear-gradient(90deg, transparent, var(--b2), transparent);
        margin: 0.125rem 0.25rem;
      }

      /* ── Climate normal mode ── */
      .cl-normal-content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .cl-entity-tabs {
        display: flex;
        gap: 0.25rem;
        justify-content: center;
        padding: 0.25rem 0;
      }
      .cl-entity-tab {
        font-size: 0.5625rem;
        padding: 0.125rem 0.375rem;
        border-radius: var(--radius-sm);
        color: var(--t3);
      }
      .cl-entity-tab.active {
        background: var(--s3);
        color: var(--t1);
        font-weight: 600;
      }
      .cl-gauge-wrap {
        display: flex;
        justify-content: center;
      }
      .cl-gauge-svg {
        width: 6.25rem;
        height: 4.25rem;
      }
      .cl-fold-sep {
        margin: 0.125rem 0;
      }

      /* ── Preview camera carousel ── */
      .pw-cam-wrap {
        padding: 0.625rem;
      }
      .pw-cam-frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: var(--radius-md);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        background: #0a0f18;
        border: 1px solid var(--b1);
        margin-bottom: 0.5rem;
      }
      .pw-cam-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 25% 35%, rgba(40, 60, 90, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 65% 55%, rgba(30, 50, 70, 0.3) 0%, transparent 45%),
          linear-gradient(135deg, #141e2e 0%, #0d1520 40%, #111a28 100%);
      }
      .pw-cam-overlay-top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3125rem 0.4375rem;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%);
      }
      .pw-cam-label {
        font-size: 7px;
        font-weight: 600;
        color: rgba(var(--rgb-white), 0.7);
        display: flex;
        align-items: center;
        gap: 0.1875rem;
      }
      .pw-cam-label ha-icon {
        --mdc-icon-size: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-rec {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        font-size: 6px;
        font-weight: 700;
        color: var(--c-alert);
      }
      .pw-cam-rec-dot {
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        background: var(--c-alert);
      }
      .pw-cam-overlay-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0.3125rem 0.4375rem;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%);
      }
      .pw-cam-ai-list {
        display: flex;
        gap: 0.1875rem;
      }
      .pw-cam-ai-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
        padding: 0.0625rem 0.25rem;
        border-radius: 4px;
        font-size: 6px;
        font-weight: 600;
        color: var(--c-info);
      }
      .pw-cam-ai-badge ha-icon {
        --mdc-icon-size: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 1.125rem;
        height: 1.125rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-arrow--left {
        left: 0.25rem;
      }
      .pw-cam-arrow--right {
        right: 0.25rem;
      }
      .pw-cam-arrow ha-icon {
        --mdc-icon-size: 0.75rem;
        color: rgba(var(--rgb-white), 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-dots {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        margin-bottom: 0.375rem;
      }
      .pw-cam-dot {
        width: 0.3125rem;
        height: 0.3125rem;
        border-radius: 50%;
      }
      .pw-cam-dot--active {
        width: 0.875rem;
        height: 0.3125rem;
        border-radius: 0.1875rem;
        background: var(--c-info);
      }
      .pw-cam-dot--rec {
        background: var(--c-alert);
        box-shadow: 0 0 4px rgba(248, 113, 113, 0.5);
      }
      .pw-cam-dot--idle {
        background: var(--t4);
      }
      .pw-cam-info {
        display: flex;
        align-items: center;
        gap: 0.4375rem;
        padding: 0 0.125rem;
        margin-bottom: 0.375rem;
      }
      .pw-cam-icon {
        width: 1.375rem;
        height: 1.375rem;
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .pw-cam-icon ha-icon {
        --mdc-icon-size: 0.75rem;
        color: var(--c-info);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-detail {
        flex: 1;
        min-width: 0;
      }
      .pw-cam-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t1);
        overflow: hidden;
        padding: 0.5rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .pw-cam-status-row {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.0625rem;
      }
      .pw-cam-status {
        font-size: 7px;
        font-weight: 500;
      }
      .pw-cam-ai-mini {
        display: flex;
        gap: 0.125rem;
        align-items: center;
      }
      .pw-cam-ai-dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-ai-dot ha-icon {
        --mdc-icon-size: 8px;
        color: var(--c-info);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-actions {
        display: flex;
        gap: 0.25rem;
        flex-wrap: wrap;
      }
      .pw-cam-action {
        display: inline-flex;
        align-items: center;
        gap: 0.1875rem;
        padding: 0.1875rem 0.4375rem;
        border-radius: var(--radius-xs);
        font-size: 8px;
        font-weight: 600;
      }
      .pw-cam-action ha-icon {
        --mdc-icon-size: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-cam-action--default {
        border: 1px solid var(--b2);
        background: var(--s1);
        color: var(--t3);
      }

      /* ── Fan preview ── */

      .pw-fan-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem 0.25rem;
      }
      .pw-fan-header-left {
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      .pw-fan-header-title {
        font-size: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
      }
      .pw-fan-header-badge {
        font-size: 8px;
        font-weight: 600;
        padding: 0.0625rem 0.25rem;
        border-radius: var(--radius-sm);
      }
      .pw-fan-header-badge.on {
        background: rgba(var(--rgb-accent), 0.15);
        color: var(--c-accent);
      }
      .pw-fan-header-badge.off {
        background: var(--s2);
        color: var(--t3);
      }
      .pw-fan-toggle-track {
        width: 1.75rem;
        height: 0.875rem;
        border-radius: var(--radius-sm);
        position: relative;
      }
      .pw-fan-toggle-track.on {
        background: rgba(var(--rgb-accent), 0.25);
      }
      .pw-fan-toggle-track.off {
        background: var(--s2);
      }
      .pw-fan-toggle-knob {
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        position: absolute;
        top: 0.125rem;
        transition: background var(--t-fast);
      }
      .pw-fan-toggle-knob.on {
        right: 0.125rem;
        background: var(--c-accent);
      }
      .pw-fan-toggle-knob.off {
        left: 0.125rem;
        background: var(--t4);
      }
      .pw-fan-card {
        padding: 0.5rem 0.625rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        position: relative;
      }
      .pw-fan-tint {
        grid-column: 1 / -1;
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: radial-gradient(ellipse at 50% 50%, var(--c-accent), transparent 70%);
      }
      .pw-fan-empty {
        grid-column: 1 / -1;
        padding: 0.5rem;
        text-align: center;
        font-size: 10px;
        color: var(--t4);
      }
      .pw-fan-row {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.125rem;
        position: relative;
        z-index: 1;
        grid-column: 1 / -1;
      }
      .pw-fan-row.compact {
        min-width: 0;
        overflow: hidden;
        grid-column: span 1;
      }
      .pw-fan-row.compact-right {
        padding-left: 0.5rem;
        position: relative;
      }
      .pw-fan-row.compact-right::before {
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
      .pw-fan-icon {
        width: 1.375rem;
        height: 1.375rem;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .pw-fan-icon.on {
        background: rgba(var(--rgb-accent), 0.1);
        border: 1px solid rgba(var(--rgb-accent), 0.15);
      }
      .pw-fan-icon.off {
        background: var(--s2);
        border: 1px solid var(--b1);
      }
      .pw-fan-icon ha-icon {
        --mdc-icon-size: 0.8125rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-fan-icon.on ha-icon {
        color: var(--c-accent);
        filter: drop-shadow(0 0 0.25rem rgba(var(--rgb-accent), 0.4));
      }
      .pw-fan-icon.off ha-icon {
        color: var(--t3);
      }
      .pw-fan-info {
        flex: 1;
        min-width: 0;
      }
      .pw-fan-name {
        font-size: 10px;
        font-weight: 600;
        color: var(--t1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .pw-fan-meta {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.0625rem;
      }
      .pw-fan-status {
        font-size: 8px;
      }
      .pw-fan-status.on {
        color: rgba(var(--rgb-accent), 0.6);
      }
      .pw-fan-status.off {
        color: var(--t4);
      }
      .pw-fan-speed {
        font-size: 7px;
        color: var(--t4);
      }
      .pw-fan-dot {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .pw-fan-dot.on {
        background: var(--c-accent);
        box-shadow: 0 0 0.375rem rgba(var(--rgb-accent), 0.4);
      }
      .pw-fan-dot.off {
        background: var(--t4);
      }

      /* ── Unassigned tab (pw-ua-*) ── */
      .pw-ua-banner-warn { color: var(--c-warning); }
      .pw-ua-search {
        width: 100%;
        margin: 0.5rem 0;
      }
      .pw-ua-domain-group {
        margin-top: 1rem;
        display: flex;
        align-items: center;
      }
      .pw-ua-domain-icon {
        --mdc-icon-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.375rem;
      }
      .pw-ua-domain-count {
        margin-left: 0.375rem;
        font-size: var(--fz-base);
        font-weight: 500;
        color: var(--t3);
      }
      .pw-ua-entity-info {
        flex: 1;
        min-width: 0;
      }
      .pw-ua-edit-icon {
        --mdc-icon-size: var(--icon-sm);
        color: var(--t4);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .pw-ua-icon-btn-shrink { flex-shrink: 0; }
      .pw-ua-entity-icon {
        --mdc-icon-size: var(--icon-sm);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pw-ua-dropdown-wrap {
        flex-shrink: 0;
        max-width: 10rem;
      }
      .pw-ua-area-text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      /* ── Title tab (pw-tt-*) ── */
      .pw-tt-spacer { flex: 1; }
      .pw-tt-mt-sm { margin-top: 0.625rem; }
      .pw-tt-mt-md { margin-top: 0.75rem; }
      .pw-tt-mt-lg { margin-top: 1rem; }
      .pw-tt-mt-add { margin-top: 0.5rem; }

      /* ── Media tab (pw-mp-*) ── */
      .pw-mp-header-row {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.25rem;
      }
      .pw-mp-header-label {
        font-size: 0.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--t4);
      }
      .pw-mp-header-badge {
        font-size: 0.5rem;
        font-weight: 600;
        padding: 0.0625rem 0.25rem;
        border-radius: var(--radius-sm);
        background: rgba(var(--rgb-info), 0.15);
        color: var(--c-info);
      }
      .pw-mp-item-info { padding-left: 0.5rem; }
      .pw-mp-empty-msg {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
        color: var(--t4);
        text-align: center;
      }

      /* ── Room detail view (pw-rd-*) ── */
      .pw-rd-cards-label { margin-top: 0.5rem; }
      .pw-rd-sensor-label { padding: 0.25rem 0.875rem 0.125rem; }
      .pw-rd-threshold-label { padding: 0.5rem 0.875rem 0.125rem; }
      .pw-rd-flex-fixed { flex: 0 0 auto; }
      .pw-rd-sep { margin: 0.75rem 0; }

      /* ── Dashboard view (pw-db-*) ── */
      .pw-db-grid-mt { margin-top: 0.5rem; }
      .pw-db-sep { margin: 1rem 0; }
`,o`
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
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.75rem;
        background: var(--s2);
        border-radius: var(--radius-md);
        border: 1px solid var(--b1);
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
`],le={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b},pe=(e=le,t,i)=>{const{kind:a,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function he(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function me(e){return he({...e,state:!0,attribute:!1})}const ue=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const a of[...i])a(t)}};var _e=Object.defineProperty,ge=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&_e(t,i,o),o};class ve extends ne{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.color="var(--rgb-accent)",this.label="",this.disabled=!1,this._dragging=!1,this._dragValue=0,this._ac=null}static{this.styles=[o`
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
    `]}_displayPct(e){const t=this.max-this.min;if(t<=0)return 0;const i=e??(this._dragging?this._dragValue:this.value);return Math.max(0,Math.min(100,(i-this.min)/t*100))}_snap(e){if(this.step<=0)return e;const t=Math.round(e/this.step)*this.step,i=(this.step.toString().split(".")[1]||"").length;return parseFloat(t.toFixed(i))}_pctToValue(e){const t=this.max-this.min,i=this.min+e/100*t;return Math.max(this.min,Math.min(this.max,this._snap(i)))}updated(e){super.updated(e),!this._dragging&&(e.has("value")||e.has("min")||e.has("max")||e.has("color"))&&this._applyVisuals()}firstUpdated(){this._applyVisuals()}_applyVisuals(){const e=this._displayPct(),t=this.renderRoot.querySelector(".fill"),i=this.renderRoot.querySelector(".thumb");t&&(t.style.transform=`scaleX(${e/100})`),i&&(i.style.transform=`translate(calc(${e}cqw - 50%), -50%)`)}_onPointerDown(e){if(this.disabled)return;e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId),this._dragging=!0,this._ac=new AbortController;const{signal:i}=this._ac,a=this.renderRoot.querySelector(".fill"),r=this.renderRoot.querySelector(".thumb"),o=(e,i)=>{const o=t.getBoundingClientRect(),s=Math.max(0,Math.min(100,(e.clientX-o.left)/o.width*100)),n=this._pctToValue(s);this._dragValue=n;const c=this._displayPct(n);a.style.transform=`scaleX(${c/100})`,r.style.transform=`translate(calc(${c}cqw - 50%), -50%)`;const d=i?"glass-slider-change":"glass-slider-input";this.dispatchEvent(new CustomEvent(d,{detail:{value:n},bubbles:!0,composed:!0}))};o(e,!1);const s=()=>{this._ac?.abort(),this._ac=null;try{t.releasePointerCapture(e.pointerId)}catch{}this._dragging=!1};t.addEventListener("pointermove",e=>o(e,!1),{signal:i}),t.addEventListener("pointerup",e=>{o(e,!0),s()},{signal:i}),t.addEventListener("pointercancel",()=>s(),{signal:i}),t.addEventListener("lostpointercapture",()=>s(),{signal:i})}_onKeyDown(e){if(this.disabled)return;const t=this.step>0?this.step:1;let i;switch(e.key){case"ArrowRight":case"ArrowUp":i=Math.min(this.max,this._snap(this.value+t));break;case"ArrowLeft":case"ArrowDown":i=Math.max(this.min,this._snap(this.value-t));break;case"Home":i=this.min;break;case"End":i=this.max;break;default:return}e.preventDefault(),this._dragValue=i,this._applyVisuals(),this.dispatchEvent(new CustomEvent("glass-slider-change",{detail:{value:i},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._ac?.abort(),this._ac=null,this._dragging=!1}render(){return F`
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
        ${this.label?F`<span class="label">${this.label}</span>`:""}
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
`;const xe={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer",collapse:"Réduire",expand:"Développer",move_up:"Déplacer vers le haut",move_down:"Déplacer vers le bas",none:"Aucun",rooms:"Pièces"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}",sensor_unavailable:"Capteur indisponible"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSO",compass_SW:"SO",compass_WSW:"OSO",compass_W:"O",compass_WNW:"ONO",compass_NW:"NO",compass_NNW:"NNO"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store d'ombrage",dc_window:"Fenêtre",dc_damper:"Clapet"},climate:{title:"Climat",target:"Consigne",current:"Actuelle",range_low:"Min",range_high:"Max",humidity_target:"Humidité cible",aux_heat:"Chauffage auxiliaire",unavailable:"Indisponible",mode_heat:"Chauffage",mode_cool:"Climatisation",mode_heat_cool:"Auto chaud/froid",mode_auto:"Automatique",mode_dry:"Déshumidification",mode_fan_only:"Ventilation",mode_off:"Éteint",preset_eco:"Éco",preset_comfort:"Confort",preset_boost:"Boost",preset_away:"Absent",preset_sleep:"Nuit",preset_activity:"Activité",preset_none:"Aucun",fan_mode:"Ventilation",swing_mode:"Oscillation",open_all_aria:"Allumer tous les climatiseurs",close_all_aria:"Éteindre tous les climatiseurs",toggle_aria:"Basculer",expand_aria:"Détails",temp_up_aria:"Augmenter température",temp_down_aria:"Diminuer température",humidity_up_aria:"Augmenter humidité",humidity_down_aria:"Diminuer humidité",range_low_aria:"Température minimale",range_high_aria:"Température maximale",no_climates:"Aucun climatiseur",turn_on_aria:"Allumer",turn_off_aria:"Éteindre",action_heating:"Chauffe",action_cooling:"Refroidit",action_idle:"En attente",action_off:"Éteint",action_drying:"Déshumidifie",current_label:"Actuel",controls_aria:"Contrôles",unknown:"Inconnu",avg_label:"Moy.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Ventilation",off:"Éteint",speed:"Vitesse",speed_pct:"{pct}%",speed_step:"Vitesse {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Été",direction_reverse:"Hiver",oscillation:"Oscillation",ceiling_light:"Éclairage",preset_auto:"Auto",preset_eco:"Éco",preset_night:"Nuit",preset_comfort:"Confort",preset_silent:"Silence",preset_turbo:"Turbo",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre tous les ventilateurs",toggle_all_off_aria:"Allumer tous les ventilateurs",speed_step_aria:"Vitesse {step} ({pct}%)",direction_forward_aria:"Mode été",direction_reverse_aria:"Mode hiver",oscillation_aria:"Oscillation",ceiling_light_aria:"Éclairage plafonnier",no_fans:"Aucun ventilateur dans cette pièce."},title_card:{mode_label:"Mode :",scene_label:"Scène :",scenes_label:"Scènes :",mode_none:"Aucun",scene_none:"Aucune",active_count:"{count} actifs",cycle_aria:"Changer de mode",toggle_scenes_aria:"Afficher les scènes",toggle_modes_aria:"Afficher les modes",activate_scene_aria:"Activer la scène {name}",toggle_bool_aria:"Basculer {name}",group_mode:"Mode",group_scenes:"Scènes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Lire",play_all:"Tout lire",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour",toggle_library:"Afficher la bibliothèque",save_track:"Sauvegarder",remove_track:"Retirer de la bibliothèque",saved:"Sauvegardé",not_saved:"Non sauvegardé",items_count:"{current} / {total}",clear_search:"Effacer la recherche"},media:{title:"MÉDIAS",now_playing:"En lecture",idle:"En attente",off:"Éteint",standby:"Veille",buffering:"Chargement…",no_media:"Aucun média en lecture",no_players:"Aucun lecteur média",volume_aria:"Volume de {name}",play_aria:"Lire {name}",pause_aria:"Pause {name}",stop_aria:"Arrêter {name}",next_aria:"Piste suivante {name}",prev_aria:"Piste précédente {name}",mute_aria:"Couper le son de {name}",unmute_aria:"Rétablir le son de {name}",expand_aria:"Développer les contrôles de {name}",power_on_aria:"Allumer {name}",power_off_aria:"Éteindre {name}",dashboard_title:"EN LECTURE",group_members:"Multiroom",unknown_title:"Titre inconnu",unknown_artist:"Artiste inconnu",shuffle_aria:"Lecture aléatoire",repeat_aria:"Répétition",seek_aria:"Chercher dans la piste",source_label:"Source",sound_mode_label:"Mode audio",speakers_label:"Enceintes",volume_label:"Volume",coordinator:"Coordinateur",add_group_aria:"Ajouter {name} au groupe",remove_group_aria:"Retirer {name} du groupe",no_playback:"Aucune lecture en cours",speakers_count:"{count} enceintes",prev_room_aria:"Pièce précédente",next_room_aria:"Pièce suivante",room_dot_aria:"Pièce {index}",controls_tab:"Contrôles",queue_tab:"File d'attente",queue_empty:"File d'attente vide",now_playing_label:"En cours",radio_badge:"Radio",loading_radio:"Chargement radio…",skip_track:"Passer le morceau",remove_from_queue:"Retirer de la liste de lecture",extra_entities:"Entités supplémentaires",add_entity:"Ajouter une entité"},presence:{title:"PRÉSENCES",title_single:"PRÉSENCE",home:"Maison",away:"Absent",just_now:"À l'instant",min_ago:"il y a {count} min",hours_ago:"il y a {count}h",days_ago:"il y a {count}j",avatar_aria:"Informations pour {name}",notify_to:"Envoyer à",notify_aria:"Envoyer une notification à {name}",notify_placeholder:"Ton message…",notif_title:"Message de {name}",send_aria:"Envoyer la notification",notif_sent:"Notification envoyée",health_label:"Santé",bpm:"bpm",spo2:"SpO2",steps:"pas",driving:"En conduite",distance_m:"m",distance_km:"km"},camera:{title:"CAMÉRAS",idle:"Veille",streaming:"En direct",recording:"Enregistrement",off:"Éteinte",unavailable:"Indisponible",no_cameras:"Aucune caméra",prev_aria:"Caméra précédente",next_aria:"Caméra suivante",dot_aria:"Aller à {name}",power_on:"Allumer",power_off:"Éteindre",snapshot:"Capture",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Désactiver détection mouvement",motion_off_aria:"Activer détection mouvement",siren_aria:"Sirène",floodlight_aria:"Projecteur",auto_track_aria:"Suivi automatique",tap_to_stream:"Appuyer pour diffuser",camera_off:"Caméra éteinte",ai_person:"Personne",ai_vehicle:"Véhicule",ai_pet:"Animal",ai_animal:"Animal",ai_package:"Colis",ai_face:"Visage",ai_baby_crying:"Bébé",ai_bicycle:"Vélo",dashboard_title:"CAMÉRAS",dashboard_title_one:"1 CAMÉRA"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Pièces","nav_dashboard":"Dashboard","nav_advanced":"Avancé","tab_navbar":"Barre de nav","tab_popup":"Popup Pièce","tab_light":"Carte Lumières","preview":"Aperçu","behavior":"Comportement","navbar_settings":"Navbar","navbar_auto_sort":"Tri automatique","navbar_auto_sort_desc":"Les pièces actives remontent en premier","no_rooms":"Aucune pièce configurée","popup_room":"Pièce","popup_room_desc":"Sélectionnez une pièce pour configurer l\'ordre et la visibilité de ses cartes internes.","popup_internal_cards":"Cartes internes","popup_internal_cards_desc":"Ordonnez les cartes affichées dans le popup de cette pièce.","room_sensors":"Capteurs","room_sensors_desc":"Entités de température et d\'humidité utilisées dans le popup et la navbar.","room_temp_entity":"Capteur de température","room_temp_entity_desc":"Entité utilisée pour afficher la température de la pièce.","room_humidity_entity":"Capteur d\'humidité","room_humidity_entity_desc":"Entité utilisée pour afficher l\'humidité de la pièce.","room_auto_detect":"Auto-détection","room_no_sensor":"Aucun capteur","room_thresholds":"Seuils d\'alerte","room_thresholds_desc":"Valeurs au-delà desquelles les indicateurs passent en rouge.","room_temp_high":"Température haute","room_temp_low":"Température basse","room_humidity_threshold":"Seuil d\'humidité","room_indicators":"Indicateurs navbar","room_indicators_desc":"Choisir les indicateurs à afficher pour cette pièce dans la navbar","room_show_lights":"Afficher les lumières","room_show_temperature":"Afficher la température","room_show_humidity":"Afficher l\'humidité","hide_room":"Masquer de la navbar","show_room":"Afficher dans la navbar","popup_scenes":"Scènes","popup_scenes_desc":"Réordonnez et masquez les scènes affichées en haut du popup.","popup_select_room":"Sélectionnez une pièce","light_room":"Pièce","light_room_desc":"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d\'affichage.","light_list_title":"Lumières","light_list_banner":"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.","light_no_lights":"Aucune lumière dans cette pièce.","light_no_visible":"Aucune lumière visible","light_select_room":"Sélectionnez une pièce","light_change_layout_aria":"Changer le layout","light_layout_compact":"COMPACT","light_layout_full":"PLEIN","light_schedule_hint":"Appuyez sur l\'icône calendrier de chaque lumière pour définir des périodes de visibilité.","light_schedule_aria":"Gérer la planification de visibilité de {name}","light_schedule_title":"Planification de visibilité","light_schedule_start":"Début","light_schedule_end":"Fin","light_schedule_recurring":"Annuel","light_schedule_add":"Ajouter une période","light_schedule_delete_aria":"Supprimer la période","light_schedule_no_date":"Choisir une date…","light_schedule_confirm":"Confirmer","light_schedule_prev_month_aria":"Mois précédent","light_schedule_next_month_aria":"Mois suivant","light_show_header":"Afficher l\'en-tête","light_show_header_desc":"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte","light_dashboard_vs_room":"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.","domain_light":"Lumières","domain_light_desc":"Contrôle des lumières","domain_media_player":"Média","domain_media_player_desc":"Lecteurs multimédias","domain_climate":"Climat","domain_climate_desc":"Thermostats et climatisation","domain_fan":"Ventilateur","domain_fan_desc":"Ventilation","domain_cover":"Volets","domain_cover_desc":"Stores et volets roulants","domain_camera":"Caméras","domain_camera_desc":"Caméras de surveillance","domain_vacuum":"Aspirateur","domain_vacuum_desc":"Robots aspirateurs","tab_weather":"Carte Météo","weather_entity":"Entité météo","weather_entity_desc":"Sélectionnez l\'entité météo à afficher sur la carte.","weather_metrics":"Métriques visibles","weather_metrics_desc":"Activez ou désactivez les métriques affichées sur la carte.","weather_forecasts":"Onglets prévisions","weather_forecasts_desc":"Activez ou désactivez les onglets de prévisions.","weather_metric_humidity":"Humidité","weather_metric_wind":"Vent","weather_metric_pressure":"Pression","weather_metric_uv":"UV","weather_metric_visibility":"Visibilité","weather_metric_sunrise":"Lever du soleil","weather_metric_sunset":"Coucher du soleil","weather_daily":"Prévisions 7 jours","weather_hourly":"Prévisions horaires","weather_select_entity":"Sélectionnez une entité météo","weather_show_header":"Afficher l\'en-tête","weather_show_header_desc":"Titre et localisation au-dessus de la carte","tab_title":"Carte Titre","title_title":"Texte du titre","title_title_desc":"Texte principal affiché sur la carte.","title_title_placeholder":"Ma Maison","title_mode_source":"Sources","title_mode_source_desc":"Ajoutez une ou plusieurs sources pour les modes du titre.","title_period_indicator":"Indicateur de période","title_period_info":"Créez un input_select nommé « periode_journee » avec les options : Matin, Après-midi, Soir, Nuit. L\'indicateur s\'affichera automatiquement.","title_period_entity":"Entité période","title_period_entity_desc":"Sélectionnez l\'input_select qui contrôle la période du jour","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Visuels des périodes","title_period_options_desc":"Personnalisez l\'icône et la couleur de chaque période","title_add_source":"Ajouter une source","title_remove_source":"Retirer la source","title_source_label":"Libellé du groupe","title_source_none":"Aucun","title_source_input_select":"Sélecteur","title_source_scenes":"Scènes","title_source_booleans":"Toggles","title_mode_entity":"Entité mode","title_mode_entity_desc":"Sélectionnez l\'entité input_select pour les modes.","title_add_entity":"Ajouter une entité","title_add_entity_desc":"Ajoutez des entités pour les modes.","title_select_entity":"Sélectionnez une entité","title_remove_entity":"Retirer","title_modes":"Configuration des modes","title_modes_desc":"Personnalisez le libellé, l\'icône et la couleur de chaque mode.","title_mode_label":"Libellé","title_mode_icon":"Icône","title_mode_color":"Couleur","title_color_picker_title":"Choisir une couleur","title_color_picker_aria":"Ouvrir la roue chromatique","title_no_modes":"Sélectionnez d\'abord une entité mode.","title_no_icons_found":"Aucune icône trouvée","title_no_icon":"Aucune","dashboard_card_title":"Carte Titre","dashboard_card_title_desc":"Texte titre avec sélecteur de mode optionnel","tab_dashboard":"Tableau de bord","dashboard_display":"Affichage","dashboard_display_desc":"Personnalisez l\'apparence de l\'interface Home Assistant.","dashboard_hide_header":"Masquer le bandeau","dashboard_hide_header_desc":"Cache la barre supérieure de Home Assistant (menu, titre, recherche).","dashboard_hide_sidebar":"Masquer la barre latérale","dashboard_hide_sidebar_desc":"Cache le menu latéral de Home Assistant (navigation, paramètres, notifications).","dashboard_dynamic_bg":"Fond dynamique","dashboard_dynamic_bg_desc":"Active le fond d\'écran jour/nuit animé de Glass Cards.","dashboard_title":"Cartes du tableau de bord","dashboard_desc":"Réorganisez, activez ou désactivez les cartes du tableau de bord. Glissez pour changer l\'ordre.","dashboard_card_weather":"Carte Météo","dashboard_card_weather_desc":"Affiche la météo actuelle, prévisions et animations","dashboard_card_light":"Carte Lumières","dashboard_card_light_desc":"Affiche les lumières allumées avec contrôle rapide","dashboard_light_auto":"Les lumières allumées s\'affichent automatiquement sur le tableau de bord.","dashboard_card_cover":"Carte Volets","dashboard_card_cover_desc":"Affiche les volets sélectionnés avec contrôle de position","dashboard_card_spotify":"Carte Spotify","dashboard_card_spotify_desc":"Bibliothèque musicale, recherche et lecture Spotify","tab_media":"Carte Média","media_variant":"Variante d\'affichage","media_variant_desc":"Choisissez entre la vue liste (compacte) ou la vue héros (artwork).","media_variant_list":"Liste","media_variant_hero":"Héros","media_show_header":"Afficher l\'en-tête","media_show_header_desc":"Titre et compteur au-dessus de la carte","media_room":"Pièce","media_room_desc":"Sélectionnez une pièce pour configurer sa variante et ses lecteurs supplémentaires.","media_room_variant":"Variante pour cette pièce","media_room_variant_default":"Par défaut","media_extra_entities":"Lecteurs supplémentaires","media_extra_entities_desc":"Ajoutez des lecteurs médias supplémentaires à cette pièce.","media_select_room":"Sélectionnez une pièce","media_native_players":"Lecteurs natifs","media_native_players_desc":"Lecteurs médias assignés à cette zone dans Home Assistant.","media_no_extra":"Aucun lecteur supplémentaire ajouté.","media_add_extra":"Ajouter un lecteur","media_dashboard_variant":"Variante dashboard","media_dashboard_variant_desc":"Variante utilisée pour la carte média sur le tableau de bord.","dashboard_card_media":"Carte Média","dashboard_card_media_desc":"Affiche les lecteurs médias avec contrôles de transport","tab_climate":"Climat","climate_desc":"Configurez les entités climat par pièce","climate_no_entities":"Aucune entité climat dans cette pièce","climate_show_header":"Afficher l\'en-tête","climate_show_header_desc":"Titre et compteur au-dessus de la carte","climate_display_mode":"Mode d\'affichage","climate_display_mode_popup":"Mode d\'affichage popup","climate_display_mode_popup_desc":"Disposition des entités climat dans le popup de la pièce.","climate_display_mode_dashboard":"Mode d\'affichage (dashboard)","climate_mode_list":"Liste","climate_mode_normal":"Normal","climate_select_room":"Sélectionner une pièce","climate_room_entities":"Entités de la pièce","climate_room_entities_desc":"Ordre et visibilité des entités climat. Glissez pour réordonner.","climate_dashboard_entities":"Entités climat du tableau de bord","climate_dashboard_entities_desc":"Sélectionnez les thermostats à afficher sur le tableau de bord.","dashboard_card_climate":"Climat","dashboard_card_climate_desc":"Thermostats et climatiseurs","dashboard_card_fan":"Carte Ventilation","dashboard_card_fan_desc":"Affiche les ventilateurs avec contrôle de vitesse","dashboard_card_presence":"Carte Présence","dashboard_card_presence_desc":"Affiche la présence des membres du foyer","tab_presence":"Carte Présence","presence_show_header":"Afficher l\'en-tête","presence_show_header_desc":"Titre et compteur au-dessus de la carte","presence_persons":"Personnes","presence_persons_desc":"Sélectionnez les entités person.* à afficher. Vide = auto-détection.","presence_smartphone":"Capteur smartphone","presence_smartphone_desc":"Associez un capteur smartphone à chaque personne pour la batterie et les données santé.","presence_notify":"Service de notification","presence_notify_desc":"Service notify.* à utiliser pour envoyer des notifications à cette personne.","presence_driving":"Capteur conduite","presence_driving_desc":"Capteur binary_sensor pour détecter le mode conduite.","presence_no_persons":"Aucune entité person.* détectée.","presence_auto_detect":"Auto-détection","search_entity":"Rechercher...","presence_select_entity":"Sélectionnez une entité","tab_fan":"Carte Ventilation","fan_show_header":"Afficher l\'en-tête","fan_show_header_desc":"Titre, compteur et bouton tout basculer au-dessus de la carte","fan_room":"Pièce","fan_room_desc":"Sélectionnez une pièce pour configurer ses ventilateurs : ordre et visibilité.","fan_list_title":"Ventilateurs","fan_list_banner":"Glissez pour réordonner. Basculez pour masquer.","fan_no_fans":"Aucun ventilateur dans cette pièce.","fan_select_room":"Sélectionnez une pièce","tab_cover":"Carte Volets","cover_show_header":"Afficher l\'en-tête","cover_show_header_desc":"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte","cover_dashboard_compact":"Affichage compact","cover_dashboard_compact_desc":"Affiche les volets en grille compacte 2 colonnes. Désactivé, chaque volet occupe toute la largeur.","cover_dashboard_entities":"Volets du tableau de bord","cover_dashboard_entities_desc":"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.","cover_dashboard_no_entities":"Aucun volet sélectionné pour le tableau de bord.","cover_room":"Pièce","cover_room_desc":"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.","cover_list_title":"Volets","cover_list_banner":"Glissez pour réordonner. Désactivez ceux à masquer.","cover_no_covers":"Aucun volet dans cette pièce.","cover_select_room":"Sélectionnez une pièce","cover_presets":"Positions par défaut","cover_presets_desc":"Positions par défaut pour les volets sans configuration personnalisée.","cover_entity_presets":"Positions","cover_preset_add":"Ajouter","cover_preset_placeholder":"0–100","tab_camera_carousel":"Carte Caméras","camera_show_header":"Afficher l\'en-tête","camera_show_header_desc":"Titre et compteur au-dessus de la carte","camera_auto_cycle":"Cycle automatique","camera_auto_cycle_desc":"Passer automatiquement d\'une caméra à l\'autre","camera_cycle_interval":"Intervalle (secondes)","camera_cycle_interval_desc":"Temps entre chaque changement de caméra","camera_entity_order":"Ordre des caméras","camera_entity_order_desc":"Glissez pour réordonner les caméras.","camera_no_cameras":"Aucune caméra détectée.","dashboard_card_camera_carousel":"Carte Caméras","dashboard_card_camera_carousel_desc":"Carrousel de surveillance avec actions rapides","tab_spotify":"Carte Spotify","spotify_show_header":"Afficher l\'en-tête","spotify_show_header_desc":"Titre et contrôles au-dessus de la carte","spotify_entity":"Entité lecteur Spotify","spotify_entity_desc":"Sélectionnez l\'entité media_player Spotify à utiliser pour la carte.","spotify_sort_order":"Ordre de tri","spotify_sort_order_desc":"Choisissez l\'ordre d\'affichage des playlists et titres sauvegardés.","spotify_sort_recent":"Plus récent en premier","spotify_sort_oldest":"Plus ancien en premier","spotify_select_entity":"Sélectionnez un lecteur Spotify","spotify_max_items":"Éléments par section","spotify_max_items_desc":"Nombre maximum d\'éléments affichés par section (playlists, titres récents, etc.).","spotify_speakers":"Enceintes visibles","spotify_speakers_desc":"Sélectionnez les enceintes affichées dans le popup de lecture. Si aucune n\'est sélectionnée, toutes les enceintes sont affichées.","spotify_not_configured":"Intégration Spotify non configurée","spotify_setup_guide":"Pour utiliser la carte Spotify, vous devez d\'abord configurer l\'intégration Spotify officielle dans Home Assistant.","spotify_setup_step1":"Allez dans Paramètres → Appareils et services","spotify_setup_step2":"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »","spotify_setup_step3":"Connectez-vous avec votre compte Spotify et autorisez l\'accès","spotify_setup_step4":"Une entité media_player.spotify_* apparaîtra automatiquement","spotify_setup_note":"Un compte Spotify Premium est requis pour les contrôles de lecture.","spotify_checking":"Vérification de la connexion Spotify…","spotify_open_settings":"Ouvrir les paramètres","tab_unassigned":"Assignation pièces","unassigned_desc":"Assignez ou réassignez vos entités à une pièce pour qu\'elles apparaissent dans les popups correspondants.","unassigned_none":"Toutes les entités sont assignées à une pièce.","unassigned_no_entities":"Aucune entité détectée.","unassigned_select_area":"Non assignée","unassigned_assigned":"Assignée","unassigned_count":"{count} entité(s) sans pièce","unassigned_no_results":"Aucun résultat.","unassigned_rename":"Renommer l\'entité","unassigned_change_icon":"Changer l\'icône"}')},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete",collapse:"Collapse",expand:"Expand",move_up:"Move up",move_down:"Move down",none:"None",rooms:"Rooms"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}",sensor_unavailable:"Sensor unavailable"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional",compass_N:"N",compass_NNE:"NNE",compass_NE:"NE",compass_ENE:"ENE",compass_E:"E",compass_ESE:"ESE",compass_SE:"SE",compass_SSE:"SSE",compass_S:"S",compass_SSW:"SSW",compass_SW:"SW",compass_WSW:"WSW",compass_W:"W",compass_WNW:"WNW",compass_NW:"NW",compass_NNW:"NNW"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},climate:{title:"Climate",target:"Target",current:"Current",range_low:"Low",range_high:"High",humidity_target:"Target humidity",aux_heat:"Auxiliary heat",unavailable:"Unavailable",mode_heat:"Heat",mode_cool:"Cool",mode_heat_cool:"Heat/Cool",mode_auto:"Auto",mode_dry:"Dry",mode_fan_only:"Fan only",mode_off:"Off",preset_eco:"Eco",preset_comfort:"Comfort",preset_boost:"Boost",preset_away:"Away",preset_sleep:"Sleep",preset_activity:"Activity",preset_none:"None",fan_mode:"Fan mode",swing_mode:"Swing mode",open_all_aria:"Turn on all climate devices",close_all_aria:"Turn off all climate devices",toggle_aria:"Toggle",expand_aria:"Details",temp_up_aria:"Increase temperature",temp_down_aria:"Decrease temperature",humidity_up_aria:"Increase humidity",humidity_down_aria:"Decrease humidity",range_low_aria:"Minimum temperature",range_high_aria:"Maximum temperature",no_climates:"No climate devices",turn_on_aria:"Turn on",turn_off_aria:"Turn off",action_heating:"Heating",action_cooling:"Cooling",action_idle:"Idle",action_off:"Off",action_drying:"Drying",current_label:"Current",controls_aria:"Controls",unknown:"Unknown",avg_label:"Avg.",section_mode:"Mode",section_preset:"Preset"},fan:{title:"Fans",off:"Off",speed:"Speed",speed_pct:"{pct}%",speed_step:"Speed {step}/{total}",speed_step_short:"{step}/{total}",direction:"Direction",direction_forward:"Summer",direction_reverse:"Winter",oscillation:"Oscillation",ceiling_light:"Light",preset_auto:"Auto",preset_eco:"Eco",preset_night:"Night",preset_comfort:"Comfort",preset_silent:"Silent",preset_turbo:"Turbo",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all fans",toggle_all_off_aria:"Turn on all fans",speed_step_aria:"Speed {step} ({pct}%)",direction_forward_aria:"Summer mode",direction_reverse_aria:"Winter mode",oscillation_aria:"Oscillation",ceiling_light_aria:"Ceiling light",no_fans:"No fans in this room."},title_card:{mode_label:"Mode:",scene_label:"Scene:",scenes_label:"Scenes:",mode_none:"None",scene_none:"None",active_count:"{count} active",cycle_aria:"Change mode",toggle_scenes_aria:"Show scenes",toggle_modes_aria:"Show modes",activate_scene_aria:"Activate scene {name}",toggle_bool_aria:"Toggle {name}",group_mode:"Mode",group_scenes:"Scenes",group_toggles:"Toggles"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play:"Play",play_all:"Play all",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back",toggle_library:"Show library",save_track:"Save to library",remove_track:"Remove from library",saved:"Saved",not_saved:"Not saved",items_count:"{current} / {total}",clear_search:"Clear search"},media:{title:"MEDIA",now_playing:"Now playing",idle:"Idle",off:"Off",standby:"Standby",buffering:"Buffering…",no_media:"No media playing",no_players:"No media players",volume_aria:"{name} volume",play_aria:"Play {name}",pause_aria:"Pause {name}",stop_aria:"Stop {name}",next_aria:"Next track {name}",prev_aria:"Previous track {name}",mute_aria:"Mute {name}",unmute_aria:"Unmute {name}",expand_aria:"Expand {name} controls",power_on_aria:"Turn on {name}",power_off_aria:"Turn off {name}",dashboard_title:"NOW PLAYING",group_members:"Multiroom",unknown_title:"Unknown title",unknown_artist:"Unknown artist",shuffle_aria:"Shuffle",repeat_aria:"Repeat",seek_aria:"Seek in track",source_label:"Source",sound_mode_label:"Sound mode",speakers_label:"Speakers",volume_label:"Volume",coordinator:"Coordinator",add_group_aria:"Add {name} to group",remove_group_aria:"Remove {name} from group",no_playback:"No playback",speakers_count:"{count} speakers",prev_room_aria:"Previous room",next_room_aria:"Next room",room_dot_aria:"Room {index}",controls_tab:"Controls",queue_tab:"Queue",queue_empty:"Queue is empty",now_playing_label:"Now playing",radio_badge:"Radio",loading_radio:"Loading radio…",skip_track:"Skip track",remove_from_queue:"Remove from queue",extra_entities:"Extra entities",add_entity:"Add entity"},presence:{title:"PRESENCES",title_single:"PRESENCE",home:"Home",away:"Away",just_now:"Just now",min_ago:"{count} min ago",hours_ago:"{count}h ago",days_ago:"{count}d ago",avatar_aria:"Information for {name}",notify_to:"Send to",notify_aria:"Send notification to {name}",notify_placeholder:"Your message…",notif_title:"Message from {name}",send_aria:"Send notification",notif_sent:"Notification sent",health_label:"Health",bpm:"bpm",spo2:"SpO2",steps:"steps",driving:"Driving",distance_m:"m",distance_km:"km"},camera:{title:"CAMERAS",idle:"Idle",streaming:"Streaming",recording:"Recording",off:"Off",unavailable:"Unavailable",no_cameras:"No cameras",prev_aria:"Previous camera",next_aria:"Next camera",dot_aria:"Go to {name}",power_on:"Turn on",power_off:"Turn off",snapshot:"Snapshot",record_start:"Rec",record_stop:"Stop",motion_on_aria:"Disable motion detection",motion_off_aria:"Enable motion detection",siren_aria:"Siren",floodlight_aria:"Floodlight",auto_track_aria:"Auto tracking",tap_to_stream:"Tap to stream",camera_off:"Camera off",ai_person:"Person",ai_vehicle:"Vehicle",ai_pet:"Pet",ai_animal:"Animal",ai_package:"Package",ai_face:"Face",ai_baby_crying:"Baby",ai_bicycle:"Bicycle",dashboard_title:"CAMERAS",dashboard_title_one:"1 CAMERA"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:JSON.parse('{"title":"Configuration","brand":"GLASS CARDS","nav_rooms":"Rooms","nav_dashboard":"Dashboard","nav_advanced":"Advanced","tab_navbar":"Navbar","tab_popup":"Room Popup","tab_light":"Light Card","preview":"Preview","behavior":"Behavior","navbar_settings":"Navbar","navbar_auto_sort":"Auto sort","navbar_auto_sort_desc":"Active rooms move to the top","no_rooms":"No rooms configured","popup_room":"Room","popup_room_desc":"Select a room to configure the order and visibility of its internal cards.","popup_internal_cards":"Internal cards","popup_internal_cards_desc":"Order the cards displayed in this room\'s popup.","room_sensors":"Sensors","room_sensors_desc":"Temperature and humidity entities used in the popup and navbar.","room_temp_entity":"Temperature sensor","room_temp_entity_desc":"Entity used to display the room temperature.","room_humidity_entity":"Humidity sensor","room_humidity_entity_desc":"Entity used to display the room humidity.","room_auto_detect":"Auto-detect","room_no_sensor":"No sensor","room_thresholds":"Alert thresholds","room_thresholds_desc":"Values above which indicators turn red.","room_temp_high":"High temperature","room_temp_low":"Low temperature","room_humidity_threshold":"Humidity threshold","room_indicators":"Navbar indicators","room_indicators_desc":"Choose which indicators to show for this room in the navbar","room_show_lights":"Show lights","room_show_temperature":"Show temperature","room_show_humidity":"Show humidity","hide_room":"Hide from navbar","show_room":"Show in navbar","popup_scenes":"Scenes","popup_scenes_desc":"Reorder and hide scenes shown at the top of the popup.","popup_select_room":"Select a room","light_room":"Room","light_room_desc":"Select a room to configure its lights: order, visibility and display mode.","light_list_title":"Lights","light_list_banner":"Drag to reorder. The layout button toggles between full width and compact.","light_no_lights":"No lights in this room.","light_no_visible":"No visible lights","light_select_room":"Select a room","light_change_layout_aria":"Change layout","light_layout_compact":"COMPACT","light_layout_full":"FULL","light_schedule_hint":"Tap the calendar icon on each light to set visibility periods.","light_schedule_aria":"Manage visibility schedule for {name}","light_schedule_title":"Visibility schedule","light_schedule_start":"Start","light_schedule_end":"End","light_schedule_recurring":"Annually","light_schedule_add":"Add period","light_schedule_delete_aria":"Delete period","light_schedule_no_date":"Select date…","light_schedule_confirm":"Confirm","light_schedule_prev_month_aria":"Previous month","light_schedule_next_month_aria":"Next month","light_show_header":"Show header","light_show_header_desc":"Title, counter and toggle all button above the card","light_dashboard_vs_room":"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.","domain_light":"Lights","domain_light_desc":"Light control","domain_media_player":"Media","domain_media_player_desc":"Media players","domain_climate":"Climate","domain_climate_desc":"Thermostats and air conditioning","domain_fan":"Fan","domain_fan_desc":"Ventilation","domain_cover":"Covers","domain_cover_desc":"Blinds and shutters","domain_camera":"Cameras","domain_camera_desc":"Security cameras","domain_vacuum":"Vacuum","domain_vacuum_desc":"Robot vacuums","tab_weather":"Weather Card","weather_entity":"Weather entity","weather_entity_desc":"Select the weather entity to display on the card.","weather_metrics":"Visible metrics","weather_metrics_desc":"Enable or disable metrics shown on the card.","weather_forecasts":"Forecast tabs","weather_forecasts_desc":"Enable or disable forecast tabs.","weather_metric_humidity":"Humidity","weather_metric_wind":"Wind","weather_metric_pressure":"Pressure","weather_metric_uv":"UV","weather_metric_visibility":"Visibility","weather_metric_sunrise":"Sunrise","weather_metric_sunset":"Sunset","weather_daily":"7-day forecast","weather_hourly":"Hourly forecast","weather_select_entity":"Select a weather entity","weather_show_header":"Show header","weather_show_header_desc":"Title and location above the card","tab_title":"Title Card","title_title":"Title text","title_title_desc":"Main text displayed on the card.","title_title_placeholder":"My Home","title_mode_source":"Sources","title_mode_source_desc":"Add one or more sources for the title modes.","title_period_indicator":"Period indicator","title_period_info":"Create an input_select named \'periode_journee\' with options: Matin, Après-midi, Soir, Nuit. The indicator will appear automatically.","title_period_entity":"Period entity","title_period_entity_desc":"Select the input_select that controls the time of day period","title_period_auto":"Auto (input_select.periode_journee)","title_period_options":"Period visuals","title_period_options_desc":"Customize the icon and color for each period","title_add_source":"Add a source","title_remove_source":"Remove source","title_source_label":"Group label","title_source_none":"None","title_source_input_select":"Selector","title_source_scenes":"Scenes","title_source_booleans":"Toggles","title_mode_entity":"Mode entity","title_mode_entity_desc":"Select the input_select entity for modes.","title_add_entity":"Add entity","title_add_entity_desc":"Add entities for modes.","title_select_entity":"Select an entity","title_remove_entity":"Remove","title_modes":"Mode configuration","title_modes_desc":"Customize the label, icon and color for each mode option.","title_mode_label":"Label","title_mode_icon":"Icon","title_mode_color":"Color","title_color_picker_title":"Choose a color","title_color_picker_aria":"Open color wheel","title_no_modes":"Select a mode entity first.","title_no_icons_found":"No icons found","title_no_icon":"None","dashboard_card_title":"Title Card","dashboard_card_title_desc":"Title text with optional mode selector","tab_dashboard":"Dashboard","dashboard_display":"Display","dashboard_display_desc":"Customize the Home Assistant interface appearance.","dashboard_hide_header":"Hide toolbar","dashboard_hide_header_desc":"Hides the Home Assistant top bar (menu, title, search).","dashboard_hide_sidebar":"Hide sidebar","dashboard_hide_sidebar_desc":"Hides the Home Assistant side menu (navigation, settings, notifications).","dashboard_dynamic_bg":"Dynamic background","dashboard_dynamic_bg_desc":"Enables the Glass Cards animated day/night background cycle.","dashboard_title":"Dashboard cards","dashboard_desc":"Reorder, enable or disable dashboard cards. Drag to change the order.","dashboard_card_weather":"Weather Card","dashboard_card_weather_desc":"Current weather, forecasts and animations","dashboard_card_light":"Light Card","dashboard_card_light_desc":"Shows active lights with quick controls","dashboard_light_auto":"Active lights are automatically displayed on the dashboard.","dashboard_card_cover":"Cover Card","dashboard_card_cover_desc":"Shows selected covers with position controls","dashboard_card_spotify":"Spotify Card","dashboard_card_spotify_desc":"Music library, search and Spotify playback","tab_media":"Media Card","media_variant":"Display variant","media_variant_desc":"Choose between list view (compact) or hero view (artwork).","media_variant_list":"List","media_variant_hero":"Hero","media_show_header":"Show header","media_show_header_desc":"Title and counter above the card","media_room":"Room","media_room_desc":"Select a room to configure its variant and extra players.","media_room_variant":"Variant for this room","media_room_variant_default":"Default","media_extra_entities":"Extra players","media_extra_entities_desc":"Add extra media players to this room.","media_select_room":"Select a room","media_native_players":"Native players","media_native_players_desc":"Media players assigned to this area in Home Assistant.","media_no_extra":"No extra players added.","media_add_extra":"Add extra player","media_dashboard_variant":"Dashboard variant","media_dashboard_variant_desc":"Variant used for the media card on the dashboard.","dashboard_card_media":"Media Card","dashboard_card_media_desc":"Shows media players with transport controls","tab_climate":"Climate","climate_desc":"Configure climate entities per room","climate_no_entities":"No climate entities in this room","climate_show_header":"Show header","climate_show_header_desc":"Title and counter above the card","climate_display_mode":"Display mode","climate_display_mode_popup":"Popup display mode","climate_display_mode_popup_desc":"Layout for climate entities in the room popup.","climate_display_mode_dashboard":"Display mode (dashboard)","climate_mode_list":"List","climate_mode_normal":"Normal","climate_select_room":"Select a room","climate_room_entities":"Room entities","climate_room_entities_desc":"Order and visibility of climate entities. Drag to reorder.","climate_dashboard_entities":"Dashboard climate entities","climate_dashboard_entities_desc":"Select which climate entities to display on the dashboard.","dashboard_card_climate":"Climate","dashboard_card_climate_desc":"Thermostats and HVAC","dashboard_card_fan":"Fan Card","dashboard_card_fan_desc":"Shows fans with speed controls","dashboard_card_presence":"Presence Card","dashboard_card_presence_desc":"Shows household members presence","tab_presence":"Presence Card","presence_show_header":"Show header","presence_show_header_desc":"Title and counter above the card","presence_persons":"Persons","presence_persons_desc":"Select person.* entities to display. Empty = auto-detect.","presence_smartphone":"Smartphone sensor","presence_smartphone_desc":"Associate a smartphone sensor for battery and health data.","presence_notify":"Notification service","presence_notify_desc":"notify.* service to send notifications to this person.","presence_driving":"Driving sensor","presence_driving_desc":"binary_sensor to detect driving mode.","presence_no_persons":"No person.* entity detected.","presence_auto_detect":"Auto-detect","search_entity":"Search...","presence_select_entity":"Select an entity","tab_fan":"Fan Card","fan_show_header":"Show header","fan_show_header_desc":"Title, counter and toggle all button above the card","fan_room":"Room","fan_room_desc":"Select a room to configure its fans: order and visibility.","fan_list_title":"Fans","fan_list_banner":"Drag to reorder. Toggle to hide.","fan_no_fans":"No fans in this room.","fan_select_room":"Select a room","tab_cover":"Cover Card","cover_show_header":"Show header","cover_show_header_desc":"Title, counter and open/close all buttons above the card","cover_dashboard_compact":"Compact layout","cover_dashboard_compact_desc":"Display covers in a 2-column compact grid. When off, each cover takes the full width.","cover_dashboard_entities":"Dashboard covers","cover_dashboard_entities_desc":"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.","cover_dashboard_no_entities":"No cover entities selected for the dashboard.","cover_room":"Room","cover_room_desc":"Select a room to configure its covers: order and visibility.","cover_list_title":"Covers","cover_list_banner":"Drag to reorder. Toggle to hide.","cover_no_covers":"No covers in this room.","cover_select_room":"Select a room","cover_presets":"Default positions","cover_presets_desc":"Default positions for covers without custom configuration.","cover_entity_presets":"Positions","cover_preset_add":"Add","cover_preset_placeholder":"0–100","tab_camera_carousel":"Camera Card","camera_show_header":"Show header","camera_show_header_desc":"Title and counter above the card","camera_auto_cycle":"Auto cycle","camera_auto_cycle_desc":"Automatically cycle between cameras","camera_cycle_interval":"Interval (seconds)","camera_cycle_interval_desc":"Time between each camera switch","camera_entity_order":"Camera order","camera_entity_order_desc":"Drag to reorder cameras.","camera_no_cameras":"No cameras detected.","dashboard_card_camera_carousel":"Camera Card","dashboard_card_camera_carousel_desc":"Surveillance carousel with quick actions","tab_spotify":"Spotify Card","spotify_show_header":"Show header","spotify_show_header_desc":"Title and controls above the card","spotify_entity":"Spotify player entity","spotify_entity_desc":"Select the Spotify media_player entity to use for the card.","spotify_sort_order":"Sort order","spotify_sort_order_desc":"Choose the display order for playlists and saved tracks.","spotify_sort_recent":"Most recent first","spotify_sort_oldest":"Oldest first","spotify_select_entity":"Select a Spotify player","spotify_max_items":"Items per section","spotify_max_items_desc":"Maximum number of items displayed per section (playlists, recent tracks, etc.).","spotify_speakers":"Visible speakers","spotify_speakers_desc":"Select which speakers appear in the playback popup. If none are selected, all speakers are shown.","spotify_not_configured":"Spotify integration not configured","spotify_setup_guide":"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.","spotify_setup_step1":"Go to Settings → Devices & services","spotify_setup_step2":"Click \\"Add integration\\" and search for \\"Spotify\\"","spotify_setup_step3":"Sign in with your Spotify account and authorize access","spotify_setup_step4":"A media_player.spotify_* entity will appear automatically","spotify_setup_note":"A Spotify Premium account is required for playback controls.","spotify_checking":"Checking Spotify connection…","spotify_open_settings":"Open settings","tab_unassigned":"Room assignment","unassigned_desc":"Assign or reassign your entities to a room so they appear in the corresponding popups.","unassigned_none":"All entities are assigned to a room.","unassigned_no_entities":"No entities detected.","unassigned_select_area":"Unassigned","unassigned_assigned":"Assigned","unassigned_count":"{count} unassigned entity(ies)","unassigned_no_results":"No results.","unassigned_rename":"Rename entity","unassigned_change_icon":"Change icon"}')}},$e="fr";let ke=$e;function Se(e){const t=e.slice(0,2).toLowerCase(),i=t in xe?t:$e;return i!==ke&&(ke=i,!0)}function Ee(){return ke}function De(e,t){const i=e.indexOf("."),a=-1===i?e:e.slice(0,i),r=-1===i?"":e.slice(i+1),o=xe[ke]??xe[$e],s=xe[$e],n=o?.[a]?.[r]??s?.[a]?.[r];let c="string"==typeof n?n:e;if(t)for(const[d,l]of Object.entries(t))c=c.replaceAll(`{${d}}`,String(l));return c}var Ce=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,ze=(e,t,i,a)=>{for(var r,o=a>1?void 0:a?Ie(t,i):t,s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a?r(t,i,o):r(o))||o);return a&&o&&Ce(t,i,o),o};class Ae extends ne{constructor(){super(...arguments),this._lang=Ee()}set hass(e){this._hass=e,e?.language&&Se(e.language)&&(this._lang=Ee())}get hass(){return this._hass}setConfig(e){this._config=e}static{this.styles=[fe,o`
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
    `]}render(){return this._lang,F`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${De("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${De("editor.open_config")}</a>
        </p>
      </div>
    `}}ze([he({attribute:!1})],Ae.prototype,"hass",1),ze([me()],Ae.prototype,"_lang",2);try{customElements.define("glass-card-editor",Ae)}catch{}var Pe=Object.defineProperty,Te=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Pe(t,i,o),o};class Oe extends ne{constructor(){super(...arguments),this._lang=Ee(),this._busCleanups=[],this._marqueeCleanup=null,this._gestureTimer=0,this._gestureFired=!1,this._gestureStart=null,this._boundDocClick=this._handleDocumentClick.bind(this)}setConfig(e){this._config=e}static getStubConfig(){return{}}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&Se(this.hass.language)&&(this._lang=Ee())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.addEventListener("click",this._boundDocClick,!0),this._marqueeCleanup=function(e){if(!e)return()=>{};const t=e=>{const t=e.querySelector(".marquee-inner");if(!t)return;e.classList.remove("scrolling");const i=t.dataset.text??t.textContent?.split("   ")[0]??"";t.dataset.text=i,t.textContent=i,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.scrollWidth>e.clientWidth+1&&(t.textContent=`${i}   ${i}   `,e.classList.add("scrolling"))})})},i=new ResizeObserver(e=>{for(const i of e)t(i.target)}),a=new MutationObserver(()=>{o()}),r=new Set,o=()=>{e.querySelectorAll(".marquee").forEach(e=>{r.has(e)||(r.add(e),i.observe(e),t(e))});for(const e of r)e.isConnected||(i.unobserve(e),r.delete(e))};return a.observe(e,{childList:!0,subtree:!0}),o(),()=>{i.disconnect(),a.disconnect(),r.clear()}}(this.shadowRoot)}_listen(e,t){this._busCleanups.push(ue.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[],document.removeEventListener("click",this._boundDocClick,!0),this._marqueeCleanup?.(),this._marqueeCleanup=null,clearTimeout(this._gestureTimer)}_handleDocumentClick(e){e.composedPath().includes(this)||this._collapseExpanded()}_collapseExpanded(){}_bindGesture(e){return{pointerdown:t=>this._onGestureDown(t,e),pointerup:t=>this._onGestureUp(t,e),pointermove:e=>this._onGestureMove(e),pointercancel:()=>this._onGestureCancel(),contextmenu:e=>e.preventDefault()}}_onGestureDown(e,t){t.exclude&&e.target.closest(t.exclude)||(this._gestureStart={x:e.clientX,y:e.clientY,t:Date.now()},this._gestureFired=!1,clearTimeout(this._gestureTimer),t.onLongPress&&(this._gestureTimer=window.setTimeout(()=>{this._gestureFired=!0,function(e,t="light"){e.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:t}))}(this,"medium"),t.onLongPress()},500)))}_onGestureUp(e,t){if(clearTimeout(this._gestureTimer),this._gestureFired||!this._gestureStart)return void(this._gestureStart=null);const i=e.clientX-this._gestureStart.x,a=Date.now()-this._gestureStart.t;this._gestureStart=null,t.onSwipe&&Math.abs(i)>50&&a<500?t.onSwipe(i<0?"left":"right"):t.onTap?.()}_onGestureMove(e){if(this._gestureFired||!this._gestureStart)return;const t=Math.abs(e.clientX-this._gestureStart.x),i=Math.abs(e.clientY-this._gestureStart.y);(t>15||i>15)&&(clearTimeout(this._gestureTimer),this._gestureStart=null)}_onGestureCancel(){clearTimeout(this._gestureTimer),this._gestureStart=null}_scrollToTop(){setTimeout(()=>{this.scrollIntoView({block:"start",behavior:"smooth"})},300)}}function Re(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}function Me(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&Re(t,i)===e)}Te([he({attribute:!1})],Oe.prototype,"hass"),Te([me()],Oe.prototype,"_lang");class Le{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}const je={section:"rooms"};var He=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,Ve=(e,t,i,a)=>{for(var r,o=a>1?void 0:a?Ne(t,i):t,s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a?r(t,i,o):r(o))||o);return a&&o&&He(t,i,o),o};class qe extends ne{constructor(){super(...arguments),this.rooms=[],this.emptyRooms=[],this.dragState={dragIdx:null,dropIdx:null,dragContext:"rooms",dragModeSrcIdx:null},this._configData={},this._initializedForArea=null,this._lang=Ee()}set configData(e){const t=this._configData;this._configData=e,e&&e!==t&&this.loadFromConfig(e)}get configData(){return this._configData}static{this.styles=[fe,be,ye,we,...de,o`:host { padding: 0.5rem 0; min-height: auto; }`]}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&Se(this.hass.language)&&(this._lang=Ee())}render(){return this._lang,this.renderTab()}_fireDirty(){this.dispatchEvent(new CustomEvent("tab-dirty",{bubbles:!0,composed:!0}))}_fireToast(e){this.dispatchEvent(new CustomEvent("tab-toast",{bubbles:!0,composed:!0,detail:{success:e}}))}_onDragStart(e,t,i){this.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,composed:!0,detail:{idx:e,context:t,srcIdx:i}}))}_onDragOver(e,t){t.preventDefault(),this.dispatchEvent(new CustomEvent("drag-over",{bubbles:!0,composed:!0,detail:{idx:e}}))}_onDragLeave(){this.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!0,composed:!0}))}_onDragEnd(){this.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,composed:!0}))}static{this._AUTO_SAVE_KEYS=new Set}_checkAutoSave(e){const t=this.constructor._AUTO_SAVE_KEYS;if(0!==t.size)for(const i of e.keys())if(t.has(i))return void this._fireDirty()}_initRoomIfNeeded(){return!!this.areaId&&(this._initializedForArea!==this.areaId&&(this._initializedForArea=this.areaId,!0))}}Ve([he({attribute:!1})],qe.prototype,"hass",2),Ve([he({attribute:!1})],qe.prototype,"backend",2),Ve([he({attribute:!1})],qe.prototype,"rooms",2),Ve([he({attribute:!1})],qe.prototype,"emptyRooms",2),Ve([he({attribute:!1})],qe.prototype,"dragState",2),Ve([he()],qe.prototype,"areaId",2),Ve([he({attribute:!1})],qe.prototype,"configData",1),Ve([me()],qe.prototype,"_lang",2);var Fe=Object.defineProperty,Ue=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Fe(t,i,o),o};const We={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"]};function Be(e,t,i,a){const r=We[t.deviceClass]||We.shutter,o=e?.states[t.entityId],s="open"===o?.state||"opening"===o?.state,n=o?.attributes.current_position;return F`
    <div class=${`pw-cv-row ${i?"compact":"full"}${a?" right":""}`}>
      <div class="pw-cv-icon ${s?"open":""}">
        <ha-icon .icon=${r[s?0:1]}></ha-icon>
      </div>
      <div class="pw-cv-info">
        <div class="pw-cv-name">${t.name}</div>
        <div class="pw-cv-sub">
          <span class="pw-cv-state ${s?"open":""}">${De(s?"cover.open":"cover.closed")}</span>
        </div>
      </div>
      ${i||void 0===n?B:F`
        <span class="pw-cv-pos ${s?"open":""}">${n}<span class="pw-cv-pos-unit">%</span></span>
      `}
      <div class="pw-cv-dot ${s?"open":""}"></div>
    </div>
  `}class Ye extends qe{constructor(){super(...arguments),this._coverShowHeader=!0,this._coverDashboardCompact=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._coverEntityPresets={},this._coverRoom="",this._coverRoomEntities=[],this._coverEntityPresetInput={},this._coverPresetsExpandedEntity=null,this._dragIdx=null,this._dropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_coverShowHeader","_coverDashboardCompact","_coverDashboardEntities","_coverDashboardOrder","_coverEntityPresets","_coverRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._coverRoom=this.areaId,this._loadRoomCovers()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._coverShowHeader=t.show_header??!0,this._coverDashboardCompact=t.dashboard_compact??!0,this._coverDashboardEntities=t.dashboard_entities??[],this._coverEntityPresets=t.entity_presets??{},this._initDashboardOrder()}collectSaveData(){const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));return{show_header:this._coverShowHeader,dashboard_compact:this._coverDashboardCompact,dashboard_entities:e,entity_presets:this._coverEntityPresets}}async save(){if(this.backend)try{if(await this.backend.send("set_cover_config",this.collectSaveData()),this._coverRoom&&this._coverRoomEntities.length>0){let e=[],t=[],i={};try{const a=await this.backend.send("get_room",{area_id:this._coverRoom});a&&(e=a.hidden_entities??[],t=a.entity_order??[],i=a.entity_layouts??{})}catch{}const a=new Set(this._coverRoomEntities.map(e=>e.entityId)),r=e.filter(e=>!a.has(e)),o=this._coverRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),s=[...t.filter(e=>!a.has(e)),...this._coverRoomEntities.map(e=>e.entityId)],n={...i};for(const c of this._coverRoomEntities)n[c.entityId]=c.layout;await this.backend.send("set_room",{area_id:this._coverRoom,hidden_entities:[...r,...o],entity_order:s,entity_layouts:n})}this._fireToast(!0),ue.emit("cover-config-changed",void 0),this._coverRoom&&ue.emit("room-config-changed",{areaId:this._coverRoom})}catch{this._fireToast(!1)}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.cover_card&&this.loadFromConfig(e.cover_card)}catch{}this._coverEntityPresetInput={},await this._loadRoomCovers()}}async _loadRoomCovers(){if(!this.backend||!this._coverRoom||!this.hass)return;const e=this._coverRoom,t=Me(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._coverRoom!==e)return;const a=new Set(i?.hidden_entities??[]),r=i?.entity_order??[],o=i?.entity_layouts??{},s=[...t].sort((e,t)=>{const i=r.indexOf(e),a=r.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._coverRoomEntities=s.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,r=t?.attributes?.device_class||"shutter";return{entityId:e,name:i,visible:!a.has(e),deviceClass:r,layout:o[e]||"compact"}})}_initDashboardOrder(){const e=new Set(this._getAllCoverEntities().map(e=>e.entityId)),t=this._coverDashboardEntities.filter(t=>e.has(t)),i=[...e].filter(e=>!this._coverDashboardEntities.includes(e));this._coverDashboardOrder=[...t,...i]}getAllCoverEntities(){return this._getAllCoverEntities()}_getAllCoverEntities(){if(!this.hass)return[];const e=[];for(const[t,i]of Object.entries(this.hass.states)){if(!t.startsWith("cover."))continue;const a=i.attributes?.friendly_name||t.split(".")[1]||t;e.push({entityId:t,name:a})}return e.sort((e,t)=>e.name.localeCompare(t.name))}_toggleEntityVisibility(e){this._coverRoomEntities=this._coverRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLayout(e){this._coverRoomEntities=this._coverRoomEntities.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}toggleDashboardEntity(e){const t=new Set(this._coverDashboardEntities);t.has(e)?(t.delete(e),this._coverDashboardOrder=this._coverDashboardOrder.filter(t=>t!==e)):(t.add(e),this._coverDashboardOrder.includes(e)||(this._coverDashboardOrder=[...this._coverDashboardOrder,e])),this._coverDashboardEntities=[...t]}onDropDashboardCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverDashboardOrder],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverDashboardOrder=i,this._dragIdx=null,this._dropIdx=null}_addEntityPreset(e){const t=this._coverEntityPresetInput[e]??"",i=parseInt(t,10);if(isNaN(i)||i<0||i>100)return;const a=this._coverEntityPresets[e]??[0,25,50,75,100];a.includes(i)?this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""}:(this._coverEntityPresets={...this._coverEntityPresets,[e]:[...a,i].sort((e,t)=>e-t)},this._coverEntityPresetInput={...this._coverEntityPresetInput,[e]:""})}_removeEntityPreset(e,t){const i=this._coverEntityPresets[e];if(!i)return;const a=i.filter(e=>e!==t);if(0===a.length){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}else this._coverEntityPresets={...this._coverEntityPresets,[e]:a}}_resetEntityPresets(e){const t={...this._coverEntityPresets};delete t[e],this._coverEntityPresets=t}_togglePresetsExpand(e){this._coverPresetsExpandedEntity=this._coverPresetsExpandedEntity===e?null:e}_onLocalDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onLocalDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onLocalDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._coverRoomEntities=i,this._dragIdx=null,this._dropIdx=null}renderPreview(){const e=this._coverRoomEntities.filter(e=>e.visible),t=e.filter(e=>{const t=this.hass?.states[e.entityId];return"open"===t?.state||"opening"===t?.state}).length,i=e[0],a=i?this.hass?.states[i.entityId]:void 0,r="open"===a?.state||"opening"===a?.state,o=a?.attributes.current_position??0,s=i&&We[i.deviceClass]||We.shutter,n=i?this._coverEntityPresets[i.entityId]??[0,25,50,75,100]:[0,25,50,75,100];return F`
      <div class="preview-cover">
        ${this._coverShowHeader?F`
          <div class="pw-cv-header">
            <div class="pw-cv-header-left">
              <span class="pw-cv-header-title">${De("cover.title")}</span>
              <span class="pw-cv-header-count ${t>0?"active":"idle"}">${t}/${e.length}</span>
            </div>
            <div class="pw-cv-header-actions">
              <div class="pw-cv-header-btn">
                <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
              </div>
              <div class="pw-cv-header-btn">
                <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
              </div>
            </div>
          </div>
        `:B}
        <div class="preview-cover-card glass">
          <!-- Tint -->
          <div class="pw-cv-tint" style="opacity:${e.length>0?(t/e.length*.18).toFixed(3):"0"};"></div>
          ${0===e.length?F`
            <div class="pw-cv-empty">—</div>
          `:B}
          ${i?F`
            <!-- Expanded entity row -->
            <div class="pw-cv-row">
              <div class="pw-cv-icon ${r?"open":""}">
                <ha-icon .icon=${s[r?0:1]}></ha-icon>
              </div>
              <div class="pw-cv-info">
                <div class="pw-cv-name">${i.name}</div>
                <div class="pw-cv-state ${r?"open":""}">${De(r?"cover.open":"cover.closed")}</div>
              </div>
              <span class="pw-cv-pos ${r?"open":""}">${o}<span class="pw-cv-pos-unit">%</span></span>
              <div class="pw-cv-dot ${r?"open":""}"></div>
            </div>
            <!-- Fold separator -->
            <div class="pw-cv-fold-sep"></div>
            <!-- Controls panel -->
            <div class="pw-cv-controls">
              <span class="pw-cv-controls-label">${i.name}</span>
              <!-- Transport -->
              <div class="pw-cv-transport">
                <div class="pw-cv-transport-btn ${100===o?"accent":""}">
                  <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
                </div>
                <div class="pw-cv-transport-btn">
                  <ha-icon .icon=${"mdi:stop"}></ha-icon>
                </div>
                <div class="pw-cv-transport-btn ${0===o?"accent":""}">
                  <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
                </div>
              </div>
              <!-- Slider -->
              <div class="pw-cv-slider">
                <ha-icon .icon=${s[1]}></ha-icon>
                <div class="pw-cv-bar">
                  <div class="pw-cv-bar-fill" style="width:${o}%;"></div>
                </div>
                <ha-icon .icon=${s[0]}></ha-icon>
              </div>
              <!-- Separator -->
              <div class="pw-cv-sep"></div>
              <!-- Presets -->
              <div class="pw-cv-presets">
                ${n.map(e=>F`
                    <span class="pw-cv-preset ${o===e?"active":""}">
                      <ha-icon .icon=${e>=50?s[0]:s[1]}></ha-icon>
                      ${0===e?De("cover.preset_closed"):100===e?De("cover.preset_open"):`${e}%`}
                    </span>
                  `)}
              </div>
            </div>
          `:B}
          ${e.length>1?F`
            <!-- Remaining entities (compact) -->
            <div class="pw-cv-remaining-sep"></div>
            <div class="pw-cv-grid">
              ${function(e,t){const i=[];let a=0;for(;a<t.length;){const r=t[a];"compact"===r.layout&&a+1<t.length&&"compact"===t[a+1].layout?(i.push(Be(e,r,!0,!1)),i.push(Be(e,t[a+1],!0,!0)),a+=2):(i.push(Be(e,r,!1,!1)),a++)}return i}(this.hass,e.slice(1,5))}
            </div>
          `:B}
        </div>
      </div>
    `}renderTab(){return this._lang,this.hass?F`
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

        ${this._coverRoom?F`
          ${this._coverRoomEntities.length>0?F`
            <div class="section-label">${De("config.cover_list_title")} (${this._coverRoomEntities.length})</div>
            <div class="section-desc">${De("config.cover_list_banner")}</div>
            <div class="item-list">
              ${this._coverRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"covers"===this._dragContext,a=this._dropIdx===t&&"covers"===this._dragContext,r=this._coverPresetsExpandedEntity===e.entityId,o=!!this._coverEntityPresets[e.entityId],s=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),n=["item-card",r?"expanded":""].filter(Boolean).join(" ");return F`
                  <div class=${n}>
                    <div
                      class=${s}
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
                        class="presets-btn ${o?"active":""}"
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
                    <div class="item-fold-sep ${r?"visible":""}"></div>
                    <div class="entity-presets-fold ${r?"open":""}">
                      <div class="entity-presets-fold-inner">
                        <div class="entity-presets-content">
                          <div class="entity-presets-label">${De(o?"config.cover_entity_presets":"config.cover_presets")}</div>
                          <div class="preset-chips">
                            ${(this._coverEntityPresets[e.entityId]??[0,25,50,75,100]).map(t=>F`
                                <span class="preset-chip small ${o?"custom":""}">
                                  <ha-icon .icon=${t>=50?"mdi:window-shutter-open":"mdi:window-shutter"}></ha-icon>
                                  ${0===t?De("cover.preset_closed"):100===t?De("cover.preset_open"):`${t}%`}
                                  ${o?F`
                                    <button
                                      class="preset-chip-remove"
                                      @click=${()=>this._removeEntityPreset(e.entityId,t)}
                                      aria-label="${De("common.delete")} ${t}%"
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
                              aria-label="${De("config.cover_preset_add")}"
                            >
                              <ha-icon .icon=${"mdi:plus"}></ha-icon>
                              ${De("config.cover_preset_add")}
                            </button>
                            ${o?F`
                              <button
                                class="preset-reset-btn"
                                @click=${()=>this._resetEntityPresets(e.entityId)}
                                aria-label="${De("common.reset")}"
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
          `:F`
            <div class="banner">
              <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
              <span>${De("config.cover_no_covers")}</span>
            </div>
          `}
        `:B}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `:F``}}Ue([me()],Ye.prototype,"_coverShowHeader"),Ue([me()],Ye.prototype,"_coverDashboardCompact"),Ue([me()],Ye.prototype,"_coverDashboardEntities"),Ue([me()],Ye.prototype,"_coverDashboardOrder"),Ue([me()],Ye.prototype,"_coverEntityPresets"),Ue([me()],Ye.prototype,"_coverRoom"),Ue([me()],Ye.prototype,"_coverRoomEntities"),Ue([me()],Ye.prototype,"_coverEntityPresetInput"),Ue([me()],Ye.prototype,"_coverPresetsExpandedEntity"),Ue([me()],Ye.prototype,"_dragIdx"),Ue([me()],Ye.prototype,"_dropIdx"),Ue([me()],Ye.prototype,"_dragContext");try{customElements.define("config-tab-cover",Ye)}catch{}var Ke=Object.defineProperty,Ge=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Ke(t,i,o),o};class Xe extends qe{constructor(){super(...arguments),this._lights=[],this._lightRoom="",this._lightShowHeader=!0,this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._suppressAutoSave=!1,this._mounted=!1}static{this._AUTO_SAVE_KEYS=new Set(["_lightShowHeader","_lights"])}connectedCallback(){super.connectedCallback(),this._mounted=!0}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._lightRoom=this.areaId,this._loadRoomLights()),this._suppressAutoSave?this._suppressAutoSave=!1:this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._lightShowHeader=t.show_header??!0}collectSaveData(){return{show_header:this._lightShowHeader}}async save(){if(this.backend)try{if(await this.backend.send("set_light_config",{show_header:this._lightShowHeader}),!this._lightRoom)return this._fireToast(!0),void ue.emit("light-config-changed",void 0);let e=[];try{const t=await this.backend.send("get_room",{area_id:this._lightRoom});t&&(e=t.hidden_entities??[])}catch{}const t=new Set(this._lights.map(e=>e.entityId)),i=e.filter(e=>!t.has(e)),a=this._lights.filter(e=>!e.visible).map(e=>e.entityId),r={};for(const o of this._lights)"full"===o.layout&&(r[o.entityId]=o.layout);if(await this.backend.send("set_room",{area_id:this._lightRoom,entity_order:this._lights.map(e=>e.entityId),hidden_entities:[...i,...a],entity_layouts:r}),!this._mounted)return;this._fireToast(!0),ue.emit("light-config-changed",void 0),ue.emit("room-config-changed",{areaId:this._lightRoom})}catch{this._fireToast(!1)}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.light_card&&this.loadFromConfig(e.light_card)}catch{}this._lightRoom&&await this._loadRoomLights()}}initRoom(){!this._lightRoom&&this.rooms.length>0&&(this._lightRoom=this.rooms[0].areaId,this._loadRoomLights())}async _loadRoomLights(){if(this._suppressAutoSave=!0,!this.hass||!this._lightRoom)return void(this._lights=[]);const e=this._lightRoom,t=Me(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light."));let i=new Set,a=[],r={};try{if(!this.backend)throw new Error("No backend");const t=await this.backend.send("get_room",{area_id:e});if(this._lightRoom!==e)return;t&&(i=new Set(t.hidden_entities??[]),a=t.entity_order??[],r=t.entity_layouts??{})}catch{}const o=this.hass,s=new Map;a.forEach((e,t)=>s.set(e,t));const n=t.map(e=>{const t=o.states[e.entity_id],a="on"===t?.state,s=t?.attributes.brightness,n=a&&void 0!==s?Math.round(s/255*100):0;return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:a,brightnessPct:n,layout:r[e.entity_id]||"compact",visible:!i.has(e.entity_id)}});n.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=s.get(e.entityId),a=s.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._lights=n;try{if(this.backend){const t=await this.backend.send("get_schedules");if(this._lightRoom!==e)return;this._schedulesLoaded=t??{},this._scheduleEdits=new Map;for(const e of n){const t=this._schedulesLoaded[e.entityId];this._scheduleEdits.set(e.entityId,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}_toggleLightVisible(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLightLayout(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleScheduleExpand(e){if(this._scheduleExpandedEntity=this._scheduleExpandedEntity===e?null:e,!this._scheduleEdits.has(e)){const t=this._schedulesLoaded[e];this._scheduleEdits.set(e,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}this.requestUpdate()}_addSchedulePeriod(e){const t=this._scheduleEdits.get(e)??[];t.push({start:"",end:"",recurring:!1}),this._scheduleEdits.set(e,[...t]),this.requestUpdate()}_removeSchedulePeriod(e,t){const i=this._scheduleEdits.get(e)??[];i.splice(t,1),this._scheduleEdits.set(e,[...i]),this.requestUpdate()}_updateSchedulePeriod(e,t,i,a){const r=this._scheduleEdits.get(e)??[];r[t]&&(r[t]={...r[t],[i]:a},this._scheduleEdits.set(e,[...r]),this.requestUpdate())}_toggleScheduleRecurring(e,t){const i=this._scheduleEdits.get(e)??[];i[t]&&(i[t]={...i[t],recurring:!i[t].recurring},this._scheduleEdits.set(e,[...i]),this.requestUpdate())}async _saveSchedule(e){if(!this.backend)return;const t=(this._scheduleEdits.get(e)??[]).filter(e=>e.start&&e.end);try{if(await this.backend.send("set_schedule",{entity_id:e,periods:t}),!this._mounted)return;this._fireToast(!0),ue.emit("schedule-changed",{entityId:e})}catch{if(!this._mounted)return;this._fireToast(!1)}}_formatDateTimeShort(e){if(!e)return"";const[t,i]=e.split("T");if(!t)return e;const[a,r,o]=t.split("-");return`${o}/${r}/${a} ${i??"00:00"}`}_formatPeriodDisplay(e){if(!e.start&&!e.end)return"";const t=this._formatDateTimeShort(e.start),i=this._formatDateTimeShort(e.end);return t&&i?`${t}  →  ${i}`:t?`${t}  → …`:`…  →  ${i}`}_parseDateTimeValue(e){if(!e)return null;const[t,i]=e.split("T");if(!t)return null;const a=t.split("-").map(Number);if(a.length<3||a.some(isNaN))return null;const[r,o,s]=a,[n,c]=(i??"00:00").split(":");return{year:r,month:o-1,day:s,hour:n??"00",minute:c??"00"}}_openRangePicker(e,t){this._pickerTarget={entityId:e,periodIdx:t};const i=(this._scheduleEdits.get(e)??[])[t],a=i?this._parseDateTimeValue(i.start):null,r=i?this._parseDateTimeValue(i.end):null,o=new Date;a?(this._pickerStartDay=a.day,this._pickerStartMonth=a.month,this._pickerStartYear=a.year,this._pickerStartHour=a.hour,this._pickerStartMinute=a.minute,this._pickerYear=a.year,this._pickerMonth=a.month):(this._pickerStartDay=null,this._pickerStartMonth=o.getMonth(),this._pickerStartYear=o.getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerYear=o.getFullYear(),this._pickerMonth=o.getMonth()),r?(this._pickerEndDay=r.day,this._pickerEndMonth=r.month,this._pickerEndYear=r.year,this._pickerEndHour=r.hour,this._pickerEndMinute=r.minute):(this._pickerEndDay=null,this._pickerEndMonth=o.getMonth(),this._pickerEndYear=o.getFullYear(),this._pickerEndHour="23",this._pickerEndMinute="59"),this._pickerPhase=a?r?"start":"end":"start",this._pickerOpen=!0}_closePicker(){this._pickerOpen=!1,this._pickerTarget=null}_pickerPrevMonth(){0===this._pickerMonth?(this._pickerMonth=11,this._pickerYear--):this._pickerMonth--}_pickerNextMonth(){11===this._pickerMonth?(this._pickerMonth=0,this._pickerYear++):this._pickerMonth++}_pickerSelectDay(e,t){if(!t)if("start"===this._pickerPhase){if(this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerPhase="end",null!==this._pickerEndDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,e).getTime();new Date(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay).getTime()<t&&(this._pickerEndDay=null)}}else{if(null!==this._pickerStartDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay).getTime();if(new Date(this._pickerYear,this._pickerMonth,e).getTime()<t)return this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerEndDay=null,void(this._pickerPhase="start")}this._pickerEndDay=e,this._pickerEndMonth=this._pickerMonth,this._pickerEndYear=this._pickerYear}}_pickerSetTime(e,t){const i=t.target.value.replace(/\D/g,"").slice(0,2),a=e.includes("Hour"),r=Math.min(a?23:59,Math.max(0,parseInt(i,10)||0)),o=String(r).padStart(2,"0");t.target.value=o,"startHour"===e?this._pickerStartHour=o:"startMinute"===e?this._pickerStartMinute=o:"endHour"===e?this._pickerEndHour=o:this._pickerEndMinute=o,this.requestUpdate()}_pickerConfirm(){if(!this._pickerTarget||null===this._pickerStartDay||null===this._pickerEndDay)return;const{entityId:e,periodIdx:t}=this._pickerTarget,i=String(this._pickerStartMonth+1).padStart(2,"0"),a=String(this._pickerStartDay).padStart(2,"0"),r=String(this._pickerEndMonth+1).padStart(2,"0"),o=String(this._pickerEndDay).padStart(2,"0"),s=`${this._pickerStartYear}-${i}-${a}T${this._pickerStartHour}:${this._pickerStartMinute}`,n=`${this._pickerEndYear}-${r}-${o}T${this._pickerEndHour}:${this._pickerEndMinute}`;this._updateSchedulePeriod(e,t,"start",s),this._updateSchedulePeriod(e,t,"end",n),this._closePicker()}_toAbsDay(e,t,i){return new Date(e,t,i).getTime()}_getMonthDays(){const e=this._pickerYear,t=this._pickerMonth,i=(new Date(e,t,1).getDay()+6)%7,a=new Date(e,t+1,0).getDate(),r=new Date(e,t,0).getDate(),o=new Date,s=o.getFullYear()===e&&o.getMonth()===t,n=o.getDate(),c=null!==this._pickerStartDay?this._toAbsDay(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay):null,d=null!==this._pickerEndDay?this._toAbsDay(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay):null,l=[],p=(e,t,i,a)=>{const r=this._toAbsDay(i,a,e);return{day:e,otherMonth:t,today:!t&&s&&e===n,rangeStart:null!==c&&r===c,rangeEnd:null!==d&&r===d,inRange:null!==c&&null!==d&&r>c&&r<d}},h=0===t?11:t-1,m=0===t?e-1:e;for(let v=i-1;v>=0;v--)l.push(p(r-v,!0,m,h));for(let v=1;v<=a;v++)l.push(p(v,!1,e,t));const u=11===t?0:t+1,_=11===t?e+1:e,g=42-l.length;for(let v=1;v<=g;v++)l.push(p(v,!0,_,u));return l}_getMonthLabel(){const e=new Date(this._pickerYear,this._pickerMonth,1),t="fr"===this._lang?"fr-FR":"en-US",i=e.toLocaleDateString(t,{month:"long"});return`${i.charAt(0).toUpperCase()}${i.slice(1)} ${this._pickerYear}`}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_onLocalDragStart(e){this._dragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDropLight(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return void this._onLocalDragEnd();const i=[...this._lights],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._lights=i,this._onLocalDragEnd()}_renderScheduleContent(e){const t=this._scheduleEdits.get(e)??[];return F`
      <div class="schedule-body">
        <div class="schedule-header">${De("config.light_schedule_title")}</div>
        ${t.map((t,i)=>F`
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
    `}_renderLightRow(e,t){const i=this._dragIdx===t,a=this._dropIdx===t,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" "),o=this._scheduleEdits.get(e.entityId),s=o?o.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0,n=this._scheduleExpandedEntity===e.entityId,c=["item-card",n?"expanded":""].filter(Boolean).join(" ");return F`
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
            class="schedule-btn ${s?"active":""}"
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
    `}_renderDateTimePicker(){if(!this._pickerOpen)return B;const e=this._getMonthDays(),t=this._getDayLabels(),i=null!==this._pickerStartDay&&null!==this._pickerEndDay;return F`
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
            ${t.map(e=>F`<span class="picker-day-label">${e}</span>`)}
            ${e.map(e=>{const t=["picker-day",e.today?"today":"",e.rangeStart?"range-start":"",e.rangeEnd?"range-end":"",e.inRange?"in-range":"",e.otherMonth?"other-month":""].filter(Boolean).join(" ");return F`
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
    `}renderPreview(){if(!this._lightRoom)return F`<div class="preview-empty">${De("config.light_select_room")}</div>`;if(0===this._lights.length)return F`<div class="preview-empty">${De("config.light_no_lights")}</div>`;const e=this._lights.filter(e=>e.visible),t=e.filter(e=>e.isOn).length,i=e.length,a=t>0,r=0===t?"none":t===i?"all":"some";if(0===e.length)return F`<div class="preview-empty">${De("config.light_no_visible")}</div>`;const o=[],s=[];for(const d of e){"compact"===("full"===d.layout?"full":"compact")?(s.push(d),2===s.length&&(o.push({kind:"compact-pair",left:s[0],right:s[1]}),s.length=0)):(s.length>0&&(o.push({kind:"compact-pair",left:s[0],right:null}),s.length=0),o.push({kind:"full",light:d}))}s.length>0&&o.push({kind:"compact-pair",left:s[0],right:null});const n=a?.06:0,c=(e,t,i)=>{const a=["preview-light-row",t?"compact":"",i?"compact-right":"",e.visible?"":"hidden-light"].filter(Boolean).join(" "),r=this._scheduleEdits.get(e.entityId),o=r?r.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0;return F`
        <div class=${a} data-on=${e.isOn}>
          <div class="preview-light-icon ${e.isOn?"on":""}">
            <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
          </div>
          <div class="preview-light-info">
            <div class="preview-light-name">${e.name}</div>
            <div class="preview-light-sub">${e.isOn?`${e.brightnessPct}%`:De("common.off")}</div>
          </div>
          ${o?F`<ha-icon class="preview-light-sched" .icon=${"mdi:calendar-clock"}></ha-icon>`:B}
          ${"full"===e.layout?F`<span class="preview-light-layout-tag">full</span>`:B}
          <span class="preview-light-dot ${e.isOn?"on":""}"></span>
        </div>
      `};return F`
      <div class="preview-light">
        ${this._lightShowHeader?F`
          <div class="preview-light-header">
            <div class="preview-light-header-left">
              <span class="preview-light-title">${De("light.title")}</span>
              <span class="preview-light-count ${r}">${t}/${i}</span>
            </div>
            <div class="preview-light-toggle ${a?"on":""}"></div>
          </div>
        `:B}
        <div class="preview-light-body">
          <div
            class="preview-light-tint"
            style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${n}"
          ></div>
          <div class="preview-light-grid">
            ${o.map(e=>"full"===e.kind?c(e.light,!1,!1):F`
                ${c(e.left,!0,!1)}
                ${e.right?c(e.right,!0,!0):B}
              `)}
          </div>
        </div>
      </div>
    `}renderTab(){return this._lang,F`
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

        ${this._lights.length>0?F`
              <div class="section-label">${De("config.light_list_title")} (${this._lights.length})</div>
              <div class="section-desc">
                ${De("config.light_list_banner")}
              </div>
              <div class="item-list">
                ${this._lights.map((e,t)=>this._renderLightRow(e,t))}
              </div>
            `:this._lightRoom?F`<div class="banner">
                <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
                <span>${De("config.light_no_lights")}</span>
              </div>`:B}

        ${this._lights.length>0?F`
          <div class="section-desc schedule-hint">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            ${De("config.light_schedule_hint")}
          </div>
        `:B}

        <div class="section-desc dashboard-vs-room">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          ${De("config.light_dashboard_vs_room")}
        </div>

        ${this._lightRoom?F`
          <div class="save-bar">
            <button class="btn btn-ghost" @click=${()=>this._loadRoomLights()}>${De("common.reset")}</button>
          </div>
        `:B}
      </div>

      ${this._renderDateTimePicker()}
    `}}Ge([me()],Xe.prototype,"_lights"),Ge([me()],Xe.prototype,"_lightRoom"),Ge([me()],Xe.prototype,"_lightShowHeader"),Ge([me()],Xe.prototype,"_scheduleExpandedEntity"),Ge([me()],Xe.prototype,"_pickerOpen"),Ge([me()],Xe.prototype,"_pickerYear"),Ge([me()],Xe.prototype,"_pickerMonth"),Ge([me()],Xe.prototype,"_pickerStartDay"),Ge([me()],Xe.prototype,"_pickerStartMonth"),Ge([me()],Xe.prototype,"_pickerStartYear"),Ge([me()],Xe.prototype,"_pickerEndDay"),Ge([me()],Xe.prototype,"_pickerEndMonth"),Ge([me()],Xe.prototype,"_pickerEndYear"),Ge([me()],Xe.prototype,"_pickerStartHour"),Ge([me()],Xe.prototype,"_pickerStartMinute"),Ge([me()],Xe.prototype,"_pickerEndHour"),Ge([me()],Xe.prototype,"_pickerEndMinute"),Ge([me()],Xe.prototype,"_pickerPhase"),Ge([me()],Xe.prototype,"_dragIdx"),Ge([me()],Xe.prototype,"_dropIdx");try{customElements.define("config-tab-light",Xe)}catch{}var Je=Object.defineProperty,Ze=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Je(t,i,o),o};class Qe extends qe{constructor(){super(...arguments),this._mediaShowHeader=!0,this._mediaExtraEntities={},this._mediaRoom="",this._mediaRoomNativePlayers=[],this._mediaAddDropdownOpen=!1,this._mediaEntitySearch="",this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this)}static{this._AUTO_SAVE_KEYS=new Set(["_mediaShowHeader","_mediaExtraEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._mediaRoom=this.areaId,this._loadRoomMediaPlayers()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._mediaShowHeader=t.show_header??!0,this._mediaExtraEntities=t.extra_entities??{}}collectSaveData(){return{show_header:this._mediaShowHeader,extra_entities:this._mediaExtraEntities}}async save(){if(this.backend)try{await this.backend.send("set_media_config",this.collectSaveData()),this._fireToast(!0),ue.emit("media-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.media_card&&this.loadFromConfig(e.media_card)}catch{}}_addMediaExtraEntity(e){const t=this._mediaRoom;if(!t)return;const i=this._mediaExtraEntities[t]??[];i.includes(e)||(this._mediaExtraEntities={...this._mediaExtraEntities,[t]:[...i,e]})}_removeMediaExtraEntity(e){const t=this._mediaRoom;if(!t)return;const i=this._mediaExtraEntities[t]??[];this._mediaExtraEntities={...this._mediaExtraEntities,[t]:i.filter(t=>t!==e)}}_loadRoomMediaPlayers(){if(!this.hass||!this._mediaRoom)return void(this._mediaRoomNativePlayers=[]);const e=Me(this._mediaRoom,this.hass.entities,this.hass.devices);this._mediaRoomNativePlayers=e.filter(e=>e.entity_id.startsWith("media_player.")).map(e=>e.entity_id)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseDropdowns)}_closeDropdownsOnOutsideClick(e){if(!this._mediaAddDropdownOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown");for(const r of a)if(t.includes(r))return;this._mediaAddDropdownOpen=!1}initRoom(){!this._mediaRoom&&this.rooms.length>0&&(this._mediaRoom=this.rooms[0].areaId,this._loadRoomMediaPlayers())}renderPreview(){const e=this._mediaRoom,t=this._mediaRoomNativePlayers.length+(e?(this._mediaExtraEntities[e]??[]).length:0),i=e?(a=this).hass&&a._mediaRoom?[...a._mediaRoomNativePlayers,...a._mediaExtraEntities[a._mediaRoom]??[]].filter(e=>"playing"===a.hass?.states[e]?.state).length:0:1;var a;return F`
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
              ${i>0?F`
                <div class="mp-eq">
                  <div class="mp-eq-bar"></div>
                  <div class="mp-eq-bar"></div>
                  <div class="mp-eq-bar"></div>
                </div>
              `:B}
            </div>
            ${t>1?F`
              <div class="mp-pill">
                <ha-icon .icon=${"mdi:speaker-multiple"}></ha-icon>
                <span>${t}</span>
              </div>
            `:B}
          </div>
          <!-- Spacer -->
          <div class="mp-spacer"></div>
          <!-- Bottom glass panel -->
          <div class="mp-glass-panel">
            ${this._mediaShowHeader?F`
              <div class="pw-mp-header-row">
                <span class="pw-mp-header-label">${De("media.title")}</span>
                <span class="pw-mp-header-badge">${i}/${t||1}</span>
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
    `}renderTab(){if(this._lang,!this.hass)return F``;const e=this._mediaRoom,t=e?this._mediaExtraEntities[e]??[]:[],i=Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort(),a=new Set([...this._mediaRoomNativePlayers,...t]),r=this._mediaEntitySearch?.toLowerCase()??"",o=i.filter(e=>{if(a.has(e))return!1;if(!r)return!0;const t=(this.hass?.states[e]?.attributes?.friendly_name??"").toLowerCase();return e.toLowerCase().includes(r)||t.includes(r)});return F`
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

        ${e?F`
          <!-- Native players (read-only) -->
          <div class="section-label">${De("config.media_native_players")} (${this._mediaRoomNativePlayers.length})</div>
          <div class="section-desc">${De("config.media_native_players_desc")}</div>
          ${this._mediaRoomNativePlayers.length>0?F`
            <div class="item-list">
              ${this._mediaRoomNativePlayers.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,a="playing"===t?.state;return F`
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
          `:F`
            <div class="banner">
              <ha-icon .icon=${"mdi:speaker-off"}></ha-icon>
              <span>${De("media.no_players")}</span>
            </div>
          `}

          <!-- Extra entities -->
          <div class="section-label">${De("config.media_extra_entities")} (${t.length})</div>
          <div class="section-desc">${De("config.media_extra_entities_desc")}</div>
          ${t.length>0?F`
            <div class="item-list">
              ${t.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return F`
                  <div class="item-card">
                    <div class="item-row">
                      <div class="item-info pw-mp-item-info">
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
                  </div>
                `})}
            </div>
          `:F`
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
              ${o.slice(0,20).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return F`
                  <button
                    class="dropdown-item"
                    role="option"
                    @click=${()=>{this._addMediaExtraEntity(e),this._mediaAddDropdownOpen=!1}}
                  >
                    <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                    ${i}
                  </button>
                `})}
              ${0===o.length?F`
                <div class="pw-mp-empty-msg">—</div>
              `:B}
            </div>
          </div>
        `:B}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}Ze([me()],Qe.prototype,"_mediaShowHeader"),Ze([me()],Qe.prototype,"_mediaExtraEntities"),Ze([me()],Qe.prototype,"_mediaRoom"),Ze([me()],Qe.prototype,"_mediaRoomNativePlayers"),Ze([me()],Qe.prototype,"_mediaAddDropdownOpen"),Ze([me()],Qe.prototype,"_mediaEntitySearch");try{customElements.define("config-tab-media",Qe)}catch{}var et=Object.defineProperty,tt=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&et(t,i,o),o};function it(e,t,i){const a=`pw-fan-row${t?" compact":""}${i?" compact-right":""}`,r=e.isOn?"on":"off";return F`
    <div class=${a}>
      <div class="pw-fan-icon ${r}">
        <ha-icon .icon=${e.icon} style=${e.isOn?`animation:spin-fan-preview ${e.pct>50?"0.8":"1.5"}s linear infinite;`:""}></ha-icon>
      </div>
      <div class="pw-fan-info">
        <div class="pw-fan-name">${e.name}</div>
        <div class="pw-fan-meta">
          <span class="pw-fan-status ${r}">${e.isOn?`${e.pct}%`:De("fan.off")}</span>
          ${e.isOn?F`
            <span class="pw-fan-speed">${De("fan.speed_step",{step:e.step,total:e.total})}</span>
          `:B}
        </div>
      </div>
      <div class="pw-fan-dot ${r}"></div>
    </div>
  `}class at extends qe{constructor(){super(...arguments),this._fanShowHeader=!0,this._fanRoom="",this._fanRoomEntities=[],this._dragIdx=null,this._dropIdx=null,this._dragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_fanShowHeader","_fanRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._fanRoom=this.areaId,this._loadRoomFans()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._fanShowHeader=t.show_header??!0}collectSaveData(){return{show_header:this._fanShowHeader}}async save(){if(this.backend)try{if(await this.backend.send("set_fan_config",this.collectSaveData()),this._fanRoom&&this._fanRoomEntities.length>0){let e=[],t=[],i={};try{const a=await this.backend.send("get_room",{area_id:this._fanRoom});a&&(e=a.hidden_entities??[],t=a.entity_order??[],i=a.entity_layouts??{})}catch{}const a=new Set(this._fanRoomEntities.map(e=>e.entityId)),r=e.filter(e=>!a.has(e)),o=this._fanRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),s=[...t.filter(e=>!a.has(e)),...this._fanRoomEntities.map(e=>e.entityId)],n={...i};for(const c of this._fanRoomEntities)n[c.entityId]=c.layout;await this.backend.send("set_room",{area_id:this._fanRoom,hidden_entities:[...r,...o],entity_order:s,entity_layouts:n})}this._fireToast(!0),ue.emit("fan-config-changed",void 0),this._fanRoom&&ue.emit("room-config-changed",{areaId:this._fanRoom})}catch{this._fireToast(!1)}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.fan_card&&this.loadFromConfig(e.fan_card)}catch{}await this._loadRoomFans()}}async _loadRoomFans(){if(!this.backend||!this._fanRoom||!this.hass)return;const e=this._fanRoom,t=Me(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("fan.")).map(e=>e.entity_id);let i=null;try{i=await this.backend.send("get_room",{area_id:e})}catch{}if(this._fanRoom!==e)return;const a=new Set(i?.hidden_entities??[]),r=i?.entity_order??[],o=i?.entity_layouts??{},s=[...t].sort((e,t)=>{const i=r.indexOf(e),a=r.indexOf(t);return-1!==i&&-1!==a?i-a:-1!==i?-1:-1!==a?1:0});this._fanRoomEntities=s.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:i,visible:!a.has(e),layout:o[e]||"compact"}})}_toggleEntityVisibility(e){this._fanRoomEntities=this._fanRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_cycleLayout(e){this._fanRoomEntities=this._fanRoomEntities.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_onLocalDragStart(e){this._dragIdx=e,this._dragContext="fans"}_onLocalDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onLocalDragLeave(){this._dropIdx=null}_onLocalDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=""}_onLocalDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"fans"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._fanRoomEntities],[a]=i.splice(this._dragIdx,1);i.splice(e,0,a),this._fanRoomEntities=i,this._dragIdx=null,this._dropIdx=null}renderPreview(){const e=this._fanRoomEntities.filter(e=>e.visible),t=0===e.length&&!this._fanRoom?[{name:"Ventilateur Salon",isOn:!0,pct:67,step:2,total:3,icon:"mdi:fan",layout:"compact"},{name:"Plafonnier Chambre",isOn:!0,pct:50,step:3,total:6,icon:"mdi:ceiling-fan",layout:"compact"},{name:"Extracteur SdB",isOn:!1,pct:0,step:0,total:3,icon:"mdi:fan",layout:"compact"}]:e.map(e=>{const t=this.hass?.states[e.entityId],i="on"===t?.state,a=t?.attributes?.percentage??0,r=t?.attributes?.percentage_step,o=t?.attributes?.speed_count,s=o??(r&&r>0?Math.round(100/r):3),n=i?Math.round(a/100*s):0;return{name:e.name,isOn:i,pct:a,step:n,total:s,icon:"mdi:fan",layout:e.layout}}),i=t.filter(e=>e.isOn).length,a=i>0?"on":"off";return F`
      <div class="preview-fan">
        ${this._fanShowHeader?F`
          <div class="pw-fan-header">
            <div class="pw-fan-header-left">
              <span class="pw-fan-header-title">${De("fan.title")}</span>
              <span class="pw-fan-header-badge ${a}">${i}/${t.length}</span>
            </div>
            <div class="pw-fan-toggle-track ${a}">
              <div class="pw-fan-toggle-knob ${a}"></div>
            </div>
          </div>
        `:B}
        <div class="preview-fan-card glass pw-fan-card">
          <div class="pw-fan-tint" style="opacity:${t.length>0?(i/t.length*.18).toFixed(3):"0"};"></div>
          ${0===t.length?F`
            <div class="pw-fan-empty">&mdash;</div>
          `:B}
          ${function(e){const t=[];let i=0;for(;i<e.length;){const a=e[i];if("compact"===a.layout){const r=i+1<e.length&&"compact"===e[i+1].layout?e[i+1]:null;r?(t.push(it(a,!0,!1)),t.push(it(r,!0,!0)),i+=2):(t.push(it(a,!1,!1)),i++)}else t.push(it(a,!1,!1)),i++}return t}(t)}
        </div>
      </div>
    `}renderTab(){return this._lang,this.hass?F`
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

        ${this._fanRoom?F`
          ${this._fanRoomEntities.length>0?F`
            <div class="section-label">${De("config.fan_list_title")} (${this._fanRoomEntities.length})</div>
            <div class="section-desc">${De("config.fan_list_banner")}</div>
            <div class="item-list">
              ${this._fanRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"fans"===this._dragContext,a=this._dropIdx===t&&"fans"===this._dragContext,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return F`
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
                  </div>
                `})}
            </div>
          `:F`
            <div class="banner">
              <ha-icon .icon=${"mdi:fan-off"}></ha-icon>
              <span>${De("config.fan_no_fans")}</span>
            </div>
          `}
        `:B}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `:F``}}tt([me()],at.prototype,"_fanShowHeader"),tt([me()],at.prototype,"_fanRoom"),tt([me()],at.prototype,"_fanRoomEntities"),tt([me()],at.prototype,"_dragIdx"),tt([me()],at.prototype,"_dropIdx"),tt([me()],at.prototype,"_dragContext");try{customElements.define("config-tab-fan",at)}catch{}var rt=Object.defineProperty,ot=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&rt(t,i,o),o};class st extends qe{constructor(){super(...arguments),this._presenceShowHeader=!0,this._presencePersonEntities=[],this._presenceSmartphoneSensors={},this._presenceNotifyServices={},this._presenceDrivingSensors={},this._presenceDropdownOpen=null,this._presenceDropdownSearch="",this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this)}static{this._AUTO_SAVE_KEYS=new Set(["_presenceShowHeader","_presencePersonEntities","_presenceSmartphoneSensors","_presenceNotifyServices","_presenceDrivingSensors"])}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseDropdowns)}updated(e){super.updated(e),this._checkAutoSave(e)}_closeDropdownsOnOutsideClick(e){if(!this._presenceDropdownOpen)return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const a=i.querySelectorAll(".dropdown");for(const r of a)if(t.includes(r))return;this._presenceDropdownOpen=null}loadFromConfig(e){const t=e;this._presenceShowHeader=t.show_header??!0,this._presencePersonEntities=t.person_entities??[],this._presenceSmartphoneSensors=t.smartphone_sensors??{},this._presenceNotifyServices=t.notify_services??{},this._presenceDrivingSensors=t.driving_sensors??{}}collectSaveData(){return{show_header:this._presenceShowHeader,person_entities:this._presencePersonEntities,smartphone_sensors:this._presenceSmartphoneSensors,notify_services:this._presenceNotifyServices,driving_sensors:this._presenceDrivingSensors}}async save(){if(this.backend)try{await this.backend.send("set_presence_config",this.collectSaveData()),this._fireToast(!0),ue.emit("presence-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.presence_card&&this.loadFromConfig(e.presence_card)}catch{}}_getAvailablePersonEntities(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("person.")).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableSmartphoneSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("phone")||e.includes("mobile")||e.includes("smartphone")||e.includes("tablet")||e.includes("iphone")||e.includes("galaxy")||e.includes("pixel")||e.includes("oneplus"))).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableDrivingSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("binary_sensor.")).map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1];return{entityId:e,name:i}}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAvailableNotifyServices(){if(!this.hass)return[];const e=this.hass.services;return Object.keys(e?.notify??{}).map(e=>`notify.${e}`).sort()}_togglePresencePerson(e){const t=this._getAvailablePersonEntities();if(0===this._presencePersonEntities.length)this._presencePersonEntities=t.map(e=>e.entityId).filter(t=>t!==e);else{const t=new Set(this._presencePersonEntities);if(t.has(e)){if(t.size<=1)return void(this._presencePersonEntities=[]);t.delete(e)}else t.add(e);this._presencePersonEntities=[...t]}}renderPreview(){const e=this._getAvailablePersonEntities(),t=this._presencePersonEntities.length>0?e.filter(e=>this._presencePersonEntities.includes(e.entityId)):e;if(0===t.length)return F`<div class="preview-empty">${De("config.presence_no_persons")}</div>`;const i=t.filter(e=>{const t=this.hass?.states[e.entityId];return"home"===t?.state}).length;return F`
      <div class="preview-presence">
        ${this._presenceShowHeader?F`
          <div class="preview-presence-header">
            <span class="preview-presence-title">${De("presence.title")}</span>
            <span class="preview-presence-pill ${i===t.length?"all-home":0===i?"all-away":"mixed"}">
              ${i}/${t.length}
            </span>
          </div>
        `:B}
        <div class="preview-presence-persons">
          ${t.slice(0,4).map(e=>{const t=this.hass?.states[e.entityId],i="home"===t?.state,a=t?.attributes?.entity_picture;return F`
              <div class="preview-presence-person ${i?"home":"away"}">
                ${a?F`<div class="preview-presence-avatar" style="background-image:url(${a})"></div>`:F`<div class="preview-presence-avatar fallback"><ha-icon .icon=${"mdi:account"}></ha-icon></div>`}
                <span class="preview-presence-name">${e.name}</span>
              </div>
            `})}
        </div>
      </div>
    `}renderTab(){this._lang;const e=this._getAvailablePersonEntities(),t=this._presencePersonEntities.length>0?this._presencePersonEntities:e.map(e=>e.entityId),i=this._getAvailableSmartphoneSensors(),a=this._getAvailableDrivingSensors(),r=this._getAvailableNotifyServices();return F`
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

        ${0===e.length?F`
          <div class="preview-empty">${De("config.presence_no_persons")}</div>
        `:F`
          <div class="item-list">
            ${e.map(e=>{const t=this._presencePersonEntities.includes(e.entityId),i=0===this._presencePersonEntities.length;return F`
                <div class="item-card">
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
                </div>
              `})}
          </div>
        `}

        <!-- Per-person sensor mapping -->
        <div class="section-label">${De("config.presence_smartphone")}</div>
        <div class="section-desc">${De("config.presence_smartphone_desc")}</div>

        ${t.map(t=>{const o=e.find(e=>e.entityId===t);if(!o)return B;const s=this._presenceSmartphoneSensors[t]||"",n=this._presenceNotifyServices[t]||"",c=this._presenceDrivingSensors[t]||"",d=i.find(e=>e.entityId===s)?.name,l=a.find(e=>e.entityId===c)?.name,p=`${t}:smartphone`,h=`${t}:notify`,m=`${t}:driving`;return F`
            <div class="presence-mapping-card">
              <div class="presence-mapping-header">
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:account"}></ha-icon>
                </div>
                <span class="item-name">${o.name}</span>
              </div>

              <div class="presence-mapping-field">
                <label class="section-label">${De("config.presence_smartphone")}</label>
                <div class="dropdown ${this._presenceDropdownOpen===p?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===p?null:p}}
                    aria-expanded=${this._presenceDropdownOpen===p?"true":"false"}
                    aria-haspopup="listbox"
                  >
                    <ha-icon .icon=${"mdi:cellphone"}></ha-icon>
                    <span>${d||s||De("config.presence_auto_detect")}</span>
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
                      class="dropdown-item ${s?"":"active"}"
                      role="option"
                      aria-selected=${s?"false":"true"}
                      @click=${()=>{const e={...this._presenceSmartphoneSensors};delete e[t],this._presenceSmartphoneSensors=e,this._presenceDropdownOpen=null}}
                    >
                      <ha-icon .icon=${"mdi:auto-fix"}></ha-icon>
                      ${De("config.presence_auto_detect")}
                    </button>
                    ${i.filter(e=>!this._presenceDropdownSearch||e.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())||e.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>F`
                      <button
                        class="dropdown-item ${s===e.entityId?"active":""}"
                        role="option"
                        aria-selected=${s===e.entityId?"true":"false"}
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
                <div class="dropdown ${this._presenceDropdownOpen===h?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===h?null:h}}
                    aria-expanded=${this._presenceDropdownOpen===h?"true":"false"}
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
                      ${De("config.presence_auto_detect")}
                    </button>
                    ${r.filter(e=>!this._presenceDropdownSearch||e.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>F`
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
                <div class="dropdown ${this._presenceDropdownOpen===m?"open":""}">
                  <button
                    class="dropdown-trigger"
                    @click=${()=>{this._presenceDropdownSearch="",this._presenceDropdownOpen=this._presenceDropdownOpen===m?null:m}}
                    aria-expanded=${this._presenceDropdownOpen===m?"true":"false"}
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
                      .value=${this._presenceDropdownOpen===m?this._presenceDropdownSearch:""}
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
                    ${a.filter(e=>!this._presenceDropdownSearch||e.name.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())||e.entityId.toLowerCase().includes(this._presenceDropdownSearch.toLowerCase())).map(e=>F`
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
    `}}ot([me()],st.prototype,"_presenceShowHeader"),ot([me()],st.prototype,"_presencePersonEntities"),ot([me()],st.prototype,"_presenceSmartphoneSensors"),ot([me()],st.prototype,"_presenceNotifyServices"),ot([me()],st.prototype,"_presenceDrivingSensors"),ot([me()],st.prototype,"_presenceDropdownOpen"),ot([me()],st.prototype,"_presenceDropdownSearch");try{customElements.define("config-tab-presence",st)}catch{}var nt=Object.defineProperty,ct=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&nt(t,i,o),o};class dt extends qe{constructor(){super(...arguments),this._spotifyShowHeader=!0,this._spotifyEntity="",this._spotifySortOrder="recent_first",this._spotifyDropdownOpen=!1,this._spotifyMaxItems=6,this._spotifyVisibleSpeakers=[],this._spotifyConfigured=null,this._localDragIdx=null,this._localDropIdx=null,this._localDragContext=""}static{this._AUTO_SAVE_KEYS=new Set(["_spotifyShowHeader","_spotifyEntity","_spotifySortOrder","_spotifyMaxItems","_spotifyVisibleSpeakers"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._spotifyShowHeader=t.show_header??!0,this._spotifyEntity=t.entity_id??"",this._spotifySortOrder="oldest_first"===t.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=t.max_items_per_section??6,this._spotifyVisibleSpeakers=t.visible_speakers??[],this._checkSpotifyStatus()}collectSaveData(){return{show_header:this._spotifyShowHeader,...this._spotifyEntity?{entity_id:this._spotifyEntity}:{},sort_order:this._spotifySortOrder,max_items_per_section:this._spotifyMaxItems,visible_speakers:this._spotifyVisibleSpeakers}}async save(){if(this.backend)try{await this.backend.send("set_spotify_config",this.collectSaveData()),this._fireToast(!0),ue.emit("spotify-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.spotify_card&&this.loadFromConfig(e.spotify_card)}catch{}}async _checkSpotifyStatus(){if(this.backend)try{const e=await this.backend.send("spotify_status");this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}_selectEntity(e){this._spotifyEntity=e,this._spotifyDropdownOpen=!1}_toggleSpeaker(e){this._spotifyVisibleSpeakers.includes(e)?this._spotifyVisibleSpeakers=this._spotifyVisibleSpeakers.filter(t=>t!==e):this._spotifyVisibleSpeakers=[...this._spotifyVisibleSpeakers,e]}_onLocalDragStart(e){this._localDragIdx=e,this._localDragContext="speakers"}_onLocalDragOver(e,t){t.preventDefault(),this._localDropIdx=e,this.requestUpdate()}_onLocalDragLeave(){this._localDropIdx=null,this.requestUpdate()}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null,this._localDragContext="",this.requestUpdate()}_onDropSpeaker(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e||"speakers"!==this._localDragContext)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this._spotifyVisibleSpeakers];if(this._localDragIdx>=i.length||e>=i.length)return this._localDragIdx=null,void(this._localDropIdx=null);const[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._spotifyVisibleSpeakers=i,this._localDragIdx=null,this._localDropIdx=null}renderPreview(){if(!1===this._spotifyConfigured)return F`<div class="preview-empty">${De("config.spotify_not_configured")}</div>`;if(!this._spotifyEntity||!this.hass)return F`<div class="preview-empty">${De("config.spotify_select_entity")}</div>`;if(!this.hass.states[this._spotifyEntity])return F`<div class="preview-empty">${De("config.spotify_select_entity")}</div>`;const e=[{id:"all",label:De("spotify.tab_all"),active:!0},{id:"tracks",label:De("spotify.tab_tracks"),active:!1},{id:"playlists",label:De("spotify.tab_playlists"),active:!1},{id:"podcasts",label:De("spotify.tab_podcasts"),active:!1}],t=[{name:"Daily Mix 1",meta:De("spotify.type_playlist"),icon:"mdi:playlist-music"},{name:De("spotify.saved_tracks"),meta:"128 "+De("spotify.tracks_count",{count:""}).trim(),icon:"mdi:heart"},{name:"Discover Weekly",meta:De("spotify.type_playlist"),icon:"mdi:playlist-music"}];return F`
      <div class="preview-spotify-wrap">
        ${this._spotifyShowHeader?F`
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
            ${e.map(e=>F`
              <span class="ps-tab ${e.active?"active":""}">${e.label}</span>
            `)}
          </div>
          <div class="ps-section-label">${De("spotify.my_playlists")}</div>
          ${t.map(e=>F`
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
    `}_renderSetupGuide(){return F`
      <div class="tab-panel" id="panel-spotify">
        <div class="pw-sp-setup-box">
          <ha-icon .icon=${"mdi:spotify"} class="pw-sp-setup-icon"></ha-icon>
          <div class="pw-sp-setup-title">
            ${De("config.spotify_not_configured")}
          </div>
          <div class="pw-sp-setup-desc">
            ${De("config.spotify_setup_guide")}
          </div>

          <div class="pw-sp-steps">
            ${[1,2,3,4].map(e=>F`
              <div class="pw-sp-step">
                <span class="pw-sp-step-num">${e}</span>
                <span class="pw-sp-step-text">
                  ${De(`config.spotify_setup_step${e}`)}
                </span>
              </div>
            `)}
          </div>

          <div class="pw-sp-note">
            ${De("config.spotify_setup_note")}
          </div>

          <button
            class="btn btn-accent pw-sp-setup-btn"
            @click=${()=>{window.open("/config/integrations/dashboard","_blank")}}
          >
            <ha-icon .icon=${"mdi:cog"}></ha-icon>
            ${De("config.spotify_open_settings")}
          </button>
        </div>
      </div>
    `}renderTab(){if(this._lang,null===this._spotifyConfigured)return F`
        <div class="preview-encart">
          <div class="preview-label">${De("config.preview")}</div>
          <div class="preview-empty">${De("config.spotify_checking")}</div>
        </div>
        <div class="tab-panel" id="panel-spotify">
          <div class="preview-empty">${De("config.spotify_checking")}</div>
        </div>
      `;if(!1===this._spotifyConfigured)return F`
        <div class="preview-encart">
          <div class="preview-label">${De("config.preview")}</div>
          ${this.renderPreview()}
        </div>
        ${this._renderSetupGuide()}
      `;const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort():[],t=e.find(e=>e===this._spotifyEntity);return F`
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
            <ha-icon .icon=${"mdi:spotify"} class="pw-sp-entity-icon"></ha-icon>
            <span>${t||De("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>F`
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
    `}_renderSpeakerList(){const e=this.hass?Object.entries(this.hass.states).filter(([e])=>e.startsWith("media_player.")).map(([e,t])=>({entityId:e,name:t.attributes.friendly_name??e,visible:this._spotifyVisibleSpeakers.includes(e)})):[],t=[...this._spotifyVisibleSpeakers.map(t=>e.find(e=>e.entityId===t)).filter(e=>!!e),...e.filter(e=>!e.visible).sort((e,t)=>e.name.localeCompare(t.name))];return F`
      <div class="item-list">
        ${t.map(e=>{const t=e.visible,i=t?this._spotifyVisibleSpeakers.indexOf(e.entityId):-1,a=this._localDragIdx===i&&-1!==i&&"speakers"===this._localDragContext,r=this._localDropIdx===i&&-1!==i&&"speakers"===this._localDragContext,o=["item-row",t?"":"disabled",a?"dragging":"",r?"drop-target":""].filter(Boolean).join(" ");return F`
            <div
              class=${o}
              draggable=${t?"true":"false"}
              @dragstart=${()=>{t&&-1!==i&&this._onLocalDragStart(i)}}
              @dragover=${e=>{t&&-1!==i&&this._onLocalDragOver(i,e)}}
              @dragleave=${()=>this._onLocalDragLeave()}
              @drop=${e=>{t&&-1!==i&&this._onDropSpeaker(i,e)}}
              @dragend=${()=>this._onLocalDragEnd()}
            >
              ${t?F`
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
              `:F`<span class="pw-sp-drag-spacer"></span>`}
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
    `}}ct([me()],dt.prototype,"_spotifyShowHeader"),ct([me()],dt.prototype,"_spotifyEntity"),ct([me()],dt.prototype,"_spotifySortOrder"),ct([me()],dt.prototype,"_spotifyDropdownOpen"),ct([me()],dt.prototype,"_spotifyMaxItems"),ct([me()],dt.prototype,"_spotifyVisibleSpeakers"),ct([me()],dt.prototype,"_spotifyConfigured");try{customElements.define("config-tab-spotify",dt)}catch{}var lt=Object.defineProperty,pt=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&lt(t,i,o),o};const ht=[{key:"input_select",i18nKey:"config.title_source_input_select",icon:"mdi:form-select"},{key:"scenes",i18nKey:"config.title_source_scenes",icon:"mdi:palette"},{key:"booleans",i18nKey:"config.title_source_booleans",icon:"mdi:toggle-switch"}],mt=["neutral","success","warning","info","accent","alert"],ut={success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t4)"},_t=e=>ut[e]??(e.startsWith("#")?e:"var(--t4)"),gt={Matin:{icon:"mdi:weather-sunset-up",color:"#f0a050"},"Après-midi":{icon:"mdi:white-balance-sunny",color:"#7db8e0"},Soir:{icon:"mdi:weather-sunset-down",color:"#e08040"},Nuit:{icon:"mdi:weather-night",color:"#8b8ff0"}},vt={icon:"mdi:clock-outline",color:"var(--t3)"};class ft extends qe{constructor(){super(...arguments),this._titleText="",this._titleSources=[],this._titlePeriodEntity="",this._titlePeriodOptions=[],this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1,this._titlePeriodDropdownOpen=!1,this._periodIconPopupIdx=null,this._iconPopupModeIdx=null,this._iconSearch="",this._titleAddEntitySearch="",this._titlePeriodSearch="",this._iconList=[],this._iconLoading=!1,this._portalEl=null,this._dragIdx=null,this._dropIdx=null,this._dragContext="",this._dragModeSrcIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_titleText","_titleSources","_titlePeriodEntity","_titlePeriodOptions"])}get _titleModes(){return this._titleSources.flatMap(e=>e.modes)}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._titleText=t.title??"",this._titlePeriodEntity=t.period_entity??"",this._titlePeriodOptions=(t.period_options??[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||""})),this._titleSources=(t.sources??[]).map(e=>({source_type:e.source_type||"",entity:e.entity||"",label:e.label||"",modes:(e.modes||[]).map(e=>({id:e.id||"",label:e.label||"",icon:e.icon||"",color:e.color||"neutral"}))}))}collectSaveData(){return{title:this._titleText,period_entity:this._titlePeriodEntity,period_options:this._titlePeriodOptions,sources:this._titleSources.map(e=>({source_type:e.source_type,entity:e.entity||"",label:e.label||"",modes:e.modes}))}}async save(){if(this.backend)try{await this.backend.send("set_title_config",this.collectSaveData()),this._fireToast(!0),ue.emit("title-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend){this._iconPopupModeIdx=null,this._periodIconPopupIdx=null,this._removeIconPortal(),this._titleEditingSourceIdx=null,this._titleAddSourceDropdownOpen=!1,this._titleAddEntityDropdownOpen=!1;try{const e=await this.backend.send("get_config");e?.title_card&&this.loadFromConfig(e.title_card)}catch{}}}_localDragStart(e,t,i){this._dragIdx=e,this._dragContext=t,"title_modes"===t&&(this._dragModeSrcIdx=i??null)}_localDragOver(e,t,i){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&("title_modes"===this._dragContext&&void 0!==i&&i!==this._dragModeSrcIdx||(this._dropIdx=e))}_localDragLeave(){this._dropIdx=null}_localDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("title_sources"===i){const t=[...this._titleSources],[i]=t.splice(this._dragIdx,1);if(t.splice(e,0,i),this._titleSources=t,this._titleEditingSourceIdx===this._dragIdx)this._titleEditingSourceIdx=e;else if(null!==this._titleEditingSourceIdx){const t=this._titleEditingSourceIdx,i=this._dragIdx;i<t&&e>=t?this._titleEditingSourceIdx=t-1:i>t&&e<=t&&(this._titleEditingSourceIdx=t+1)}}else if("title_modes"===i&&null!==this._dragModeSrcIdx){const t=[...this._titleSources],i=t[this._dragModeSrcIdx];if(i){const a=[...i.modes],[r]=a.splice(this._dragIdx,1);a.splice(e,0,r),t[this._dragModeSrcIdx]={...i,modes:a},this._titleSources=t}this._dragModeSrcIdx=null}this._dragIdx=null,this._dropIdx=null}_localDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragModeSrcIdx=null}_addTitleSource(e){this._titleAddSourceDropdownOpen=!1,this._titleSources=[...this._titleSources,{source_type:e,entity:"",label:"",modes:[]}],this._titleEditingSourceIdx=this._titleSources.length-1}_removeTitleSource(e){const t=[...this._titleSources];t.splice(e,1),this._titleSources=t,this._titleEditingSourceIdx===e?this._titleEditingSourceIdx=null:null!==this._titleEditingSourceIdx&&this._titleEditingSourceIdx>e&&this._titleEditingSourceIdx--}_setTitleSourceEntity(e,t){this._titleAddEntityDropdownOpen=!1;const i=[...this._titleSources];if(i[e]){if(i[e]={...i[e],entity:t},t.startsWith("input_select.")&&this.hass){const a=this.hass.states[t];if(a){const t=a.attributes.options??[],r=new Map(i[e].modes.map(e=>[e.id,e]));i[e]={...i[e],modes:t.map(e=>r.get(e)??{id:e,label:e,icon:"",color:"neutral"})}}}else t||(i[e]={...i[e],modes:[]});this._titleSources=i}}_setTitleSourceLabel(e,t){const i=[...this._titleSources];i[e]&&(i[e]={...i[e],label:t},this._titleSources=i)}_addTitleModeEntity(e,t){this._titleAddEntityDropdownOpen=!1;const i=[...this._titleSources];if(!i[e])return;if(i[e].modes.some(e=>e.id===t))return;const a=this.hass?.states[t],r=a?.attributes.friendly_name||t.split(".")[1]||t,o=t.startsWith("scene.")?"mdi:palette":"mdi:toggle-switch",s=t.startsWith("scene.")?"accent":"success";i[e]={...i[e],modes:[...i[e].modes,{id:t,label:r,icon:o,color:s}]},this._titleSources=i}_removeTitleModeEntity(e,t){const i=[...this._titleSources];i[e]&&(i[e]={...i[e],modes:i[e].modes.filter(e=>e.id!==t)},this._titleSources=i)}_updateTitleMode(e,t,i){let a=e;const r=[...this._titleSources];for(let o=0;o<r.length;o++){if(a<r[o].modes.length){const e=[...r[o].modes];return e[a]={...e[a],[t]:i},r[o]={...r[o],modes:e},void(this._titleSources=r)}a-=r[o].modes.length}}_setTitlePeriodEntity(e){if(this._titlePeriodDropdownOpen=!1,this._titlePeriodEntity=e,e&&this.hass){const t=this.hass.states[e];if(t){const e=t.attributes.options??[],i=new Map(this._titlePeriodOptions.map(e=>[e.id,e]));this._titlePeriodOptions=e.map(e=>i.get(e)??{id:e,label:e,icon:"",color:""})}}else e||(this._titlePeriodOptions=[])}_updateTitlePeriodOption(e,t,i){const a=[...this._titlePeriodOptions];a[e]&&(a[e]={...a[e],[t]:i},this._titlePeriodOptions=a)}async _openIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),e<this._titleModes.length&&(this._iconSearch="",this._iconPopupModeIdx=e,this._showIconPortal()))}async _openPeriodIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),e<this._titlePeriodOptions.length&&(this._iconSearch="",this._periodIconPopupIdx=e,this._showIconPortal()))}async _loadIconList(){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim(),t=this._iconList;return e?t.filter(t=>t.toLowerCase().includes(e)).slice(0,120):t.slice(0,120)}_showIconPortal(){const e=null!==this._iconPopupModeIdx,t=null!==this._periodIconPopupIdx;if(!e&&!t)return void this._removeIconPortal();const i=this._getFilteredIcons(),a=this._iconPopupModeIdx,r=this._periodIconPopupIdx,o=e&&null!==a?this._titleModes[a]?.icon??"":null!==r?this._titlePeriodOptions[r]?.icon??"":"";this._portalEl||(this._portalEl=document.createElement("div"),document.body.appendChild(this._portalEl));const s=()=>{this._iconPopupModeIdx=null,this._periodIconPopupIdx=null,this._removeIconPortal()},n=i=>{e&&null!=this._iconPopupModeIdx?this._updateTitleMode(this._iconPopupModeIdx,"icon",i):t&&null!=this._periodIconPopupIdx&&this._updateTitlePeriodOption(this._periodIconPopupIdx,"icon",i),this._removeIconPortal()},c=e=>{this._iconSearch=e,this._showIconPortal()};this._portalEl.replaceChildren(),Object.assign(this._portalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}),this._portalEl.addEventListener("click",e=>{e.target===this._portalEl&&s()},{once:!0});const d=document.createElement("div");Object.assign(d.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const l=document.createElement("div");Object.assign(l.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const p=document.createElement("span");Object.assign(p.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),p.textContent=De("config.title_mode_icon");const h=document.createElement("input");Object.assign(h.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),h.placeholder="mdi:...",h.value=this._iconSearch,h.addEventListener("input",()=>c(h.value)),l.appendChild(p),l.appendChild(h),d.appendChild(l);const m=document.createElement("div");Object.assign(m.style,{overflow:"auto",flex:"1",padding:"0.5rem"});const u=document.createElement("div");Object.assign(u.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const _=this._createIconBtn("mdi:cancel",""===o,.4);_.addEventListener("click",()=>n("")),u.appendChild(_);for(const g of i){const e=this._createIconBtn(g,g===o,1);e.addEventListener("click",()=>n(g)),u.appendChild(e)}if(0===i.length&&this._iconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=De("config.title_no_icons_found"),u.appendChild(e)}m.appendChild(u),d.appendChild(m),this._portalEl.appendChild(d),h.focus()}_createIconBtn(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",border:t?"2px solid rgba(129,140,248,0.6)":"1px solid rgba(255,255,255,0.06)",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)",cursor:"pointer",color:"rgba(255,255,255,0.88)",padding:"0"});const r=document.createElement("ha-icon");return r.icon=e,r.style.cssText=`--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${i};`,a.appendChild(r),a}_removeIconPortal(){this._portalEl&&(this._portalEl.remove(),this._portalEl=null)}disconnectedCallback(){super.disconnectedCallback(),this._removeIconPortal()}_renderSourceEditor(e,t){const i=this._titleEditingSourceIdx===t,a=ht.find(t=>t.key===e.source_type),r=e.label||(a?De(a.i18nKey):"")||e.source_type,o=this._dragIdx===t&&"title_sources"===this._dragContext,s=this._dropIdx===t&&"title_sources"===this._dragContext;return F`
      <div
        class="title-source-block ${o?"dragging":""} ${s?"drop-target":""}"
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
          <div class="pw-tt-spacer"></div>
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

        ${i?F`
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

            ${"input_select"===e.source_type?this._renderInputSelectEntityPicker(e,t):B}

            <!-- Mode list -->
            ${e.modes.length>0?F`
              <div class="section-label pw-tt-mt-sm">${De("config.title_modes")}</div>
              <div class="title-modes-list">
                ${e.modes.map((i,a)=>this._renderModeRow(e,t,i,a))}
              </div>
            `:B}

            ${"scenes"===e.source_type||"booleans"===e.source_type?this._renderEntityAdder(e,t):B}
          </div>
        `:B}
      </div>
    `}_renderInputSelectEntityPicker(e,t){const i=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")).sort():[];return F`
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
            ${i.filter(e=>!this._titleAddEntitySearch||e.toLowerCase().includes(this._titleAddEntitySearch.toLowerCase())).map(i=>F`
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
    `}_renderEntityAdder(e,t){const i="scenes"===e.source_type?"scene.":"input_boolean.",a="scenes"===e.source_type?"mdi:palette":"mdi:toggle-switch",r=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith(i)).sort():[],o=new Set(e.modes.map(e=>e.id)),s=r.filter(e=>!o.has(e));return F`
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
            ${s.filter(e=>!this._titleAddEntitySearch||e.toLowerCase().includes(this._titleAddEntitySearch.toLowerCase())).map(e=>F`
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
    `}_renderModeRow(e,t,i,a){let r=0;for(let n=0;n<t;n++)r+=this._titleSources[n].modes.length;r+=a;const o=this._dragIdx===a&&"title_modes"===this._dragContext&&this._dragModeSrcIdx===t,s=this._dropIdx===a&&"title_modes"===this._dragContext&&this._dragModeSrcIdx===t;return F`
      <div
        class="title-mode-row ${o?"dragging":""} ${s?"drop-target":""}"
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
          ${"scenes"===e.source_type||"booleans"===e.source_type?F`
            <button
              class="btn-icon xs"
              @click=${()=>this._removeTitleModeEntity(t,i.id)}
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
            ${mt.map(e=>F`
              <button
                class="title-color-chip ${e} ${i.color===e?"active":""}"
                @click=${()=>this._updateTitleMode(r,"color",e)}
                aria-label="${De("config.title_mode_color")}: ${e}"
              ></button>
            `)}
          </div>
        </div>
      </div>
    `}_renderPeriodEntityPicker(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")).sort():[],t=this._titlePeriodEntity;return F`
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
          ${e.filter(e=>!this._titlePeriodSearch||e.toLowerCase().includes(this._titlePeriodSearch.toLowerCase())).map(e=>F`
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
    `}_renderPeriodOptionsEditor(){const e=this._titlePeriodEntity||"",t=this.hass?.states[e],i=t?.attributes?.options??[];if(0===i.length)return B;const a=new Map(this._titlePeriodOptions.map(e=>[e.id,e]));return F`
      <div class="section-label pw-tt-mt-md">${De("config.title_period_options")}</div>
      <div class="section-desc">${De("config.title_period_options_desc")}</div>
      <div class="title-modes-list">
        ${i.map(e=>{const t=a.get(e),i=this._titlePeriodOptions.findIndex(t=>t.id===e),r=t?.icon||"",o=t?.color||"",s=gt[e]||vt;return-1===i?(this._titlePeriodOptions=[...this._titlePeriodOptions,{id:e,label:e,icon:"",color:""}],B):F`
            <div class="title-mode-row">
              <div class="title-mode-header">
                <ha-icon .icon=${r||s.icon} style="--mdc-icon-size:16px;display:flex;align-items:center;justify-content:center;color:${_t(o||gt[e]?.color||"neutral")}"></ha-icon>
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
                  ${mt.map(e=>F`
                    <button
                      class="title-color-chip ${e} ${o===e?"active":""}"
                      @click=${()=>this._updateTitlePeriodOption(i,"color",e)}
                      aria-label="${De("config.title_mode_color")}: ${e}"
                    ></button>
                  `)}
                </div>
              </div>
            </div>
          `})}
      </div>
    `}renderPreview(){const e=this._titleText;if(!e)return F`<div class="preview-empty">${De("config.title_title_placeholder")}</div>`;const t=[];for(const o of this._titleSources)if("input_select"===o.source_type&&o.entity&&this.hass){const e=this.hass.states[o.entity];if(e){const i=o.modes.find(t=>t.id===e.state);i?.color&&"neutral"!==i.color&&t.push(i.color)}}else if("booleans"===o.source_type&&this.hass)for(const e of o.modes)if("on"===this.hass?.states[e.id]?.state){const i=e.color||"success";"neutral"!==i&&t.push(i)}const i=this._titleSources.length>0&&this._titleSources.some(e=>e.modes.length>0);let a="background:var(--t4);width:1.25rem;";if(t.length>0){const e=t.map(e=>_t(e)),i=Math.min(20+4*t.length,36);if(1===e.length)a=`background:${e[0]};width:${i}px;box-shadow:0 0 6px ${e[0]};`;else{const t=e.length;a=`background:linear-gradient(90deg, ${e.flatMap((e,i)=>[`${e} ${Math.round(i/t*100)}%`,`${e} ${Math.round((i+1)/t*100)}%`]).join(", ")});width:${i}px;box-shadow:${e.map(e=>`0 0 6px ${e}`).join(", ")};`}}let r=B;if(this.hass){const e=this._titlePeriodEntity||"",t=this.hass.states[e];if(t){const e=t.state,i=function(e,t){const i=t.find(t=>t.id===e);return i&&(i.icon||i.color)?{icon:i.icon||vt.icon,color:i.color||vt.color}:gt[e]||vt}(e,this._titlePeriodOptions);r=F`
          <div class="preview-period" style="color:${i.color}">
            <ha-icon .icon=${i.icon} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;margin-right:4px;"></ha-icon>
            ${e}
          </div>
        `}}return F`
      <div class="preview-title-card">
        <div class="preview-title-text">${e}</div>
        ${r}
        ${i?F`
          <div class="preview-title-dash">
            <div class="preview-dash-line" style="${a}"></div>
          </div>
        `:B}
      </div>
    `}renderTab(){this._lang;const e=this._titleSources;return F`
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

        <div class="section-label pw-tt-mt-md">${De("config.title_mode_source")}</div>
        <div class="section-desc">${De("config.title_mode_source_desc")}</div>

        <!-- Existing sources -->
        ${e.map((e,t)=>this._renderSourceEditor(e,t))}

        <!-- Add source button -->
        <div class="pw-tt-mt-add">
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
              ${ht.map(e=>F`
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
        <div class="section-label pw-tt-mt-lg">${De("config.title_period_entity")}</div>
        <div class="section-desc">${De("config.title_period_entity_desc")}</div>
        ${this._renderPeriodEntityPicker()}

        ${this._renderPeriodOptionsEditor()}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}pt([me()],ft.prototype,"_titleText"),pt([me()],ft.prototype,"_titleSources"),pt([me()],ft.prototype,"_titlePeriodEntity"),pt([me()],ft.prototype,"_titlePeriodOptions"),pt([me()],ft.prototype,"_titleEditingSourceIdx"),pt([me()],ft.prototype,"_titleAddSourceDropdownOpen"),pt([me()],ft.prototype,"_titleAddEntityDropdownOpen"),pt([me()],ft.prototype,"_titlePeriodDropdownOpen"),pt([me()],ft.prototype,"_periodIconPopupIdx"),pt([me()],ft.prototype,"_iconPopupModeIdx"),pt([me()],ft.prototype,"_iconSearch"),pt([me()],ft.prototype,"_dragIdx"),pt([me()],ft.prototype,"_dropIdx"),pt([me()],ft.prototype,"_dragContext"),pt([me()],ft.prototype,"_dragModeSrcIdx");try{customElements.define("config-tab-title",ft)}catch{}var bt=Object.defineProperty,yt=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&bt(t,i,o),o};const wt=["compass_N","compass_NNE","compass_NE","compass_ENE","compass_E","compass_ESE","compass_SE","compass_SSE","compass_S","compass_SSW","compass_SW","compass_WSW","compass_W","compass_WNW","compass_NW","compass_NNW"];const xt=[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise"},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset"}];class $t extends qe{constructor(){super(...arguments),this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherShowHeader=!0,this._weatherDropdownOpen=!1}static{this._AUTO_SAVE_KEYS=new Set(["_weatherEntity","_weatherHiddenMetrics","_weatherShowDaily","_weatherShowHourly","_weatherShowHeader"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._weatherEntity=t.entity_id??"",this._weatherHiddenMetrics=t.hidden_metrics??[],this._weatherShowDaily=t.show_daily??!0,this._weatherShowHourly=t.show_hourly??!0,this._weatherShowHeader=t.show_header??!0}collectSaveData(){return{...this._weatherEntity?{entity_id:this._weatherEntity}:{},hidden_metrics:this._weatherHiddenMetrics,show_daily:this._weatherShowDaily,show_hourly:this._weatherShowHourly,show_header:this._weatherShowHeader}}async save(){if(this.backend)try{await this.backend.send("set_weather",this.collectSaveData()),this._fireToast(!0),ue.emit("weather-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.weather&&this.loadFromConfig(e.weather)}catch{}}_selectEntity(e){this._weatherEntity=e,this._weatherDropdownOpen=!1}_toggleMetric(e){const t=new Set(this._weatherHiddenMetrics);t.has(e)?t.delete(e):t.add(e),this._weatherHiddenMetrics=[...t]}renderPreview(){if(!this._weatherEntity||!this.hass)return F`<div class="preview-empty">${De("config.weather_select_entity")}</div>`;const e=this.hass.states[this._weatherEntity];if(!e)return F`<div class="preview-empty">${De("config.weather_select_entity")}</div>`;const t=e.attributes,i=t.temperature??"--",a=t.temperature_unit??"°C",r=new Set(this._weatherHiddenMetrics),o=e.state||"sunny",s={sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",partlycloudy:"mdi:weather-partly-cloudy",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",snowy:"mdi:weather-snowy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning"}[o]||"mdi:weather-cloudy",n=De({sunny:"weather.cond_sunny","clear-night":"weather.cond_clear_night",partlycloudy:"weather.cond_partly_cloudy",cloudy:"weather.cond_cloudy",fog:"weather.cond_foggy",rainy:"weather.cond_rainy",pouring:"weather.cond_pouring",snowy:"weather.cond_snowy",windy:"weather.cond_windy",lightning:"weather.cond_lightning"}[o]||"weather.cond_cloudy"),c={sunny:"#fbbf24","clear-night":"#6366f1",partlycloudy:"#94a3b8",cloudy:"#64748b",fog:"#94a3b8",rainy:"#3b82f6",pouring:"#2563eb",snowy:"#e2e8f0",windy:"#6ee7b3",lightning:"#a78bfa"}[o]||"#64748b",d={sunny:"rgba(251,191,36,0.8)","clear-night":"rgba(129,140,248,0.7)",partlycloudy:"rgba(148,163,184,0.6)",cloudy:"rgba(100,116,139,0.6)",fog:"rgba(148,163,184,0.5)",rainy:"rgba(96,165,250,0.7)",pouring:"rgba(59,130,246,0.8)",snowy:"rgba(226,232,240,0.7)",windy:"rgba(110,231,179,0.6)",lightning:"rgba(167,139,250,0.8)"}[o]||"rgba(148,163,184,0.6)",l=new Date,p=l.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),h=String(l.getSeconds()).padStart(2,"0"),m=l.toLocaleDateString(this.hass.language||Ee(),{weekday:"long",day:"numeric",month:"long"}),u=t.apparent_temperature??null,_="number"==typeof i?i:12,g=[0,.5,1.2,.8,-.3,-1,-.5,.2,.7,1.5],v=44,f=Math.min(...g),b=Math.max(...g)-f||1,y=g.map((e,t)=>({x:t/(g.length-1)*348,y:6+32*(1-(e-f)/b)}));let w=`M${y[0].x},${y[0].y}`;for(let j=0;j<y.length-1;j++){const e=y[Math.max(0,j-1)],t=y[j],i=y[j+1],a=y[Math.min(y.length-1,j+2)];w+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(a.x-t.x)/6},${i.y-(a.y-t.y)/6} ${i.x},${i.y}`}const x=w+" L348,44 L0,44 Z",$=.3*(g.length-1),k=Math.floor($),S=Math.min(g.length-1,k+1),E=$-k,D=6+32*(1-(g[k]+(g[S]-g[k])*E-f)/b),C=l.getHours(),I=g.map((e,t)=>`${String((C+t)%24).padStart(2,"0")}h`),z=[];if(r.has("humidity")||null==t.humidity||z.push({key:"humidity",icon:"mdi:water-percent",val:`${t.humidity}`,unit:"%"}),!r.has("wind")&&null!=t.wind_speed){const e="number"==typeof t.wind_bearing?(A=t.wind_bearing,De(`weather.${wt[Math.round((A%360+360)%360/22.5)%16]}`)):void 0;z.push({key:"wind",icon:"mdi:weather-windy",val:`${Math.round(t.wind_speed)}`,unit:"km/h",dir:e})}var A;if(r.has("pressure")||null==t.pressure||z.push({key:"pressure",icon:"mdi:gauge",val:`${Math.round(t.pressure)}`,unit:"hPa"}),r.has("uv")||null==t.uv_index||z.push({key:"uv",icon:"mdi:sun-wireless",val:`${Math.round(t.uv_index)}`,unit:"UV"}),r.has("visibility")||null==t.visibility||z.push({key:"visibility",icon:"mdi:eye-outline",val:`${t.visibility}`,unit:"km"}),!r.has("sunrise")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_rising;z.push({key:"sunrise",icon:"mdi:weather-sunset-up",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}if(!r.has("sunset")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_setting;z.push({key:"sunset",icon:"mdi:weather-sunset-down",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}const P=this.hass.language||Ee(),T=Array.from({length:7},(e,t)=>{const i=new Date(2024,0,t+1);return new Intl.DateTimeFormat(P,{weekday:"short"}).format(i)}),O=[_+2,_+1,_,_-1,_+1,_+3,_],R=[_-4,_-3,_-5,_-6,_-4,_-2,_-5],M=[0,10,30,60,20,0,15],L=(l.getDay()+6)%7;return F`
      <div class="preview-weather-wrap">
        ${this._weatherShowHeader?F`
          <div class="pw-card-header">
            <span class="pw-card-title">${De("weather.title")}</span>
            <span class="pw-card-location">${e.attributes.friendly_name??""}</span>
          </div>
        `:B}
      <div class="preview-weather">
        <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${c}22 0%, transparent 70%);"></div>
        <div class="pw-content">
          <div class="pw-header">
            <div class="pw-header-left">
              <span class="pw-time">${p}<span class="pw-sec">:${h}</span></span>
              <span class="pw-date">${m}</span>
            </div>
            <div class="pw-header-right">
              <span class="pw-temp">${i}<span class="pw-temp-unit">${a}</span></span>
              <span class="pw-cond"><ha-icon .icon=${s}></ha-icon>${n}</span>
              ${null!=u?F`<span class="pw-feels">${De("weather.feels_like",{temp:String(Math.round(u))})}</span>`:B}
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
              ${I.map((e,t)=>t%2==0||t===I.length-1?F`<span class="pw-spark-lbl" style="left: ${t/(I.length-1)*100}%;">${e}</span>`:B)}
            </div>
          </div>

          ${z.length>0?F`
            <div class="pw-metrics" style="grid-template-columns: repeat(${3}, 1fr);">
              ${z.map(e=>F`
                <div class="pw-metric ${e.key}">
                  <ha-icon .icon=${e.icon}></ha-icon>
                  <span class="pw-metric-val">${e.val}</span>
                  ${e.unit?F`<span class="pw-metric-unit">${e.unit}</span>`:B}
                  ${e.dir?F`<span class="pw-metric-dir">${e.dir}</span>`:B}
                </div>
              `)}
            </div>
          `:B}

          ${this._weatherShowDaily||this._weatherShowHourly?F`
            <div class="pw-forecast-zone">
              <div class="pw-tabs">
                ${this._weatherShowDaily?F`<span class="pw-tab active">${De("weather.daily_tab")}</span>`:B}
                ${this._weatherShowHourly?F`<span class="pw-tab">${De("weather.hourly_tab")}</span>`:B}
              </div>
              <div class="pw-fold-sep"></div>
              ${this._weatherShowDaily?F`
                <div class="pw-daily-list">
                  ${["mdi:weather-sunny","mdi:weather-partly-cloudy","mdi:weather-cloudy","mdi:weather-rainy","mdi:weather-partly-cloudy","mdi:weather-sunny","mdi:weather-cloudy"].slice(0,5).map((e,t)=>{const i=(L+t)%7,a=0===t?De("weather.today"):T[i],r=Math.round(O[t]),o=Math.round(R[t]),s=M[t];return F`
                      <div class="pw-day-row ${0===t?"today":""}">
                        <span class="pw-day-label">${a}</span>
                        <ha-icon class="pw-day-icon" .icon=${e}></ha-icon>
                        <span class="pw-day-temps"><span class="pw-day-high">${r}°</span><span class="pw-day-low">${o}°</span></span>
                        ${s>0?F`<span class="pw-day-precip">${s}%</span>`:F`<span class="pw-day-precip"></span>`}
                      </div>
                    `})}
                </div>
              `:B}
            </div>
          `:B}
        </div>
      </div>
      </div>
    `}renderTab(){this._lang;const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")).sort():[],t=e.find(e=>e===this._weatherEntity),i=new Set(this._weatherHiddenMetrics);return F`
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
            ${e.map(e=>F`
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
          ${xt.map(e=>{const t=!i.has(e.key);return F`
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
    `}}yt([me()],$t.prototype,"_weatherEntity"),yt([me()],$t.prototype,"_weatherHiddenMetrics"),yt([me()],$t.prototype,"_weatherShowDaily"),yt([me()],$t.prototype,"_weatherShowHourly"),yt([me()],$t.prototype,"_weatherShowHeader"),yt([me()],$t.prototype,"_weatherDropdownOpen");try{customElements.define("config-tab-weather",$t)}catch{}var kt=Object.defineProperty,St=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&kt(t,i,o),o};class Et extends qe{constructor(){super(...arguments),this._cameraShowHeader=!0,this._cameraAutoCycle=!1,this._cameraCycleInterval=10,this._cameraEntityOrder=[],this._localDragIdx=null,this._localDropIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_cameraShowHeader","_cameraAutoCycle","_cameraCycleInterval","_cameraEntityOrder"])}updated(e){super.updated(e),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._cameraShowHeader=t.show_header??!0,this._cameraEntityOrder=t.entity_order??[],this._cameraAutoCycle=t.auto_cycle??!1,this._cameraCycleInterval=t.cycle_interval??10}collectSaveData(){return{show_header:this._cameraShowHeader,entity_order:this._cameraEntityOrder,auto_cycle:this._cameraAutoCycle,cycle_interval:this._cameraCycleInterval}}async save(){if(this.backend)try{await this.backend.send("set_camera_carousel_config",this.collectSaveData()),this._fireToast(!0),ue.emit("camera-carousel-config-changed",void 0)}catch{this._fireToast(!1)}}async reload(){if(this.backend)try{const e=await this.backend.send("get_config");e?.camera_carousel&&this.loadFromConfig(e.camera_carousel)}catch{}}_initCameraEntityOrder(){if(!this.hass)return;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("camera.")).sort(),t=new Set(e),i=this._cameraEntityOrder.filter(e=>t.has(e)),a=new Set(i);for(const r of e)a.has(r)||i.push(r);this._cameraEntityOrder=i}_localDragStart(e){this._localDragIdx=e}_localDragOver(e,t){t.preventDefault(),this._localDropIdx=e}_localDragLeave(){this._localDropIdx=null}_localDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_onDropCameraEntity(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return void this._localDragEnd();const i=[...this._cameraEntityOrder],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._cameraEntityOrder=i,this._localDragEnd()}renderPreview(){const e="rgba(96,165,250,",t={name:"Entrée",state:"streaming",icon:"mdi:cctv",ai:["person"]};return F`
      <div class="pw-cam-wrap">
        <!-- Viewport -->
        <div class="pw-cam-frame">
          <div class="pw-cam-bg">
            <!-- Top overlay -->
            <div class="pw-cam-overlay-top">
              <div class="pw-cam-label">
                <ha-icon .icon=${"mdi:cctv"}></ha-icon>
                ${t.name}
                <span class="pw-cam-rec">
                  <span class="pw-cam-rec-dot"></span> REC
                </span>
              </div>
            </div>
            <!-- Bottom overlay -->
            ${t.ai.length>0?F`
              <div class="pw-cam-overlay-bottom">
                <div class="pw-cam-ai-list">
                  ${t.ai.map(t=>F`
                    <div class="pw-cam-ai-badge" style="background:${e}0.15);border:1px solid ${e}0.2);">
                      <ha-icon .icon=${"mdi:human"}></ha-icon>
                      ${t}
                    </div>
                  `)}
                </div>
              </div>
            `:B}
            <!-- Nav arrows -->
            <div class="pw-cam-arrow pw-cam-arrow--left">
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </div>
            <div class="pw-cam-arrow pw-cam-arrow--right">
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </div>
          </div>
        </div>

        <!-- Dots -->
        <div class="pw-cam-dots">
          <div class="pw-cam-dot pw-cam-dot--active" style="box-shadow:0 0 6px ${e}0.4);"></div>
          <div class="pw-cam-dot pw-cam-dot--rec"></div>
          <div class="pw-cam-dot pw-cam-dot--idle"></div>
        </div>

        <!-- Info bar -->
        <div class="pw-cam-info">
          <div class="pw-cam-icon" style="background:${e}0.1);border:1px solid ${e}0.15);">
            <ha-icon .icon=${"mdi:cctv"}></ha-icon>
          </div>
          <div class="pw-cam-detail">
            <div class="pw-cam-name">${t.name}</div>
            <div class="pw-cam-status-row">
              <span class="pw-cam-status" style="color:${`${e}0.6)`};">${"En direct"}</span>
              ${t.ai.length>0?F`
                <div class="pw-cam-ai-mini">
                  <div class="pw-cam-ai-dot" style="background:${e}0.12);">
                    <ha-icon .icon=${"mdi:human"}></ha-icon>
                  </div>
                </div>
              `:B}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="pw-cam-actions">
          ${["mdi:power","mdi:camera","mdi:record-circle","mdi:motion-sensor"].map((t,i)=>F`
            <div class="pw-cam-action ${0===i?"":"pw-cam-action--default"}" style="${0===i?`border:1px solid ${e}0.15);background:${e}0.1);color:var(--c-info);`:""}">
              <ha-icon .icon=${t}></ha-icon>
            </div>
          `)}
        </div>
      </div>
    `}renderTab(){return this._lang,this.hass&&0===this._cameraEntityOrder.length&&this._initCameraEntityOrder(),F`
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

        ${this._cameraAutoCycle?F`
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
        `:B}

        <!-- Camera entity order -->
        ${this._cameraEntityOrder.length>0?F`
          <div class="section-label">${De("config.camera_entity_order")} (${this._cameraEntityOrder.length})</div>
          <div class="section-desc">${De("config.camera_entity_order_desc")}</div>
          <div class="item-list">
            ${this._cameraEntityOrder.map((e,t)=>{const i=this._localDragIdx===t,a=this._localDropIdx===t,r=this.hass?.states[e],o=r?.attributes?.friendly_name||e.split(".")[1],s=["item-row",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return F`
                <div class="item-card">
                  <div
                    class=${s}
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
                      <span class="item-name">${o}</span>
                      <span class="item-meta">${e}</span>
                    </div>
                  </div>
                </div>
              `})}
          </div>
        `:B}

        <!-- Save / Reset -->
        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}St([me()],Et.prototype,"_cameraShowHeader"),St([me()],Et.prototype,"_cameraAutoCycle"),St([me()],Et.prototype,"_cameraCycleInterval"),St([me()],Et.prototype,"_cameraEntityOrder"),St([me()],Et.prototype,"_localDragIdx"),St([me()],Et.prototype,"_localDropIdx");try{customElements.define("config-tab-camera",Et)}catch{}var Dt=Object.defineProperty,Ct=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Dt(t,i,o),o};class It extends qe{constructor(){super(...arguments),this._climateShowHeader=!0,this._climateDisplayMode="list",this._climateDashboardDisplayMode="list",this._climateDashboardEntities=[],this._climateRoom="",this._climateRoomEntities=[],this._saving=!1,this._localDragIdx=null,this._localDropIdx=null}static{this._AUTO_SAVE_KEYS=new Set(["_climateShowHeader","_climateDisplayMode","_climateDashboardDisplayMode","_climateDashboardEntities","_climateRoomEntities"])}updated(e){super.updated(e),e.has("areaId")&&this.areaId&&(this._climateRoom=this.areaId,this._loadRoomClimates()),this._checkAutoSave(e)}loadFromConfig(e){const t=e;this._climateShowHeader=t.show_header??!0,this._climateDisplayMode="normal"===t.display_mode?"normal":"list",this._climateDashboardDisplayMode="normal"===t.dashboard_display_mode?"normal":"list",this._climateDashboardEntities=t.dashboard_entities??[]}collectSaveData(){return{show_header:this._climateShowHeader,display_mode:this._climateDisplayMode,dashboard_display_mode:this._climateDashboardDisplayMode,dashboard_entities:this._climateDashboardEntities}}async save(){if(this.backend&&!this._saving){this._saving=!0;try{const e=this._climateRoomEntities.map(e=>e.entityId),t=this._climateRoomEntities.filter(e=>!e.visible).map(e=>e.entityId);if(await this.backend.send("set_climate_config",this.collectSaveData()),this._climateRoom&&this._climateRoomEntities.length>0){let i=[],a=[];try{const e=await this.backend.send("get_room",{area_id:this._climateRoom});e&&(i=e.hidden_entities??[],a=e.entity_order??[])}catch{}const r=new Set(this._climateRoomEntities.map(e=>e.entityId)),o=i.filter(e=>!r.has(e)),s=a.filter(e=>!r.has(e));await this.backend.send("set_room",{area_id:this._climateRoom,hidden_entities:[...o,...t],entity_order:[...s,...e]}),ue.emit("room-config-changed",{areaId:this._climateRoom})}this._fireToast(!0),ue.emit("climate-config-changed",void 0)}catch{this._fireToast(!1)}finally{this._saving=!1}}}async reload(){if(this.backend){try{const e=await this.backend.send("get_config");e?.climate_card&&this.loadFromConfig(e.climate_card)}catch{}this._climateRoom&&await this._loadRoomClimates()}}async _loadRoomClimates(){if(!this.hass||!this._climateRoom||!this.backend)return;const e=this._climateRoom,t=Me(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("climate.")).map(e=>e.entity_id);let i=[],a=[];try{const t=await this.backend.send("get_room",{area_id:e});i=t?.hidden_entities||[],a=t?.entity_order||[]}catch{}if(this._climateRoom!==e)return;const r=new Map(a.map((e,t)=>[e,t])),o=[...t].sort((e,t)=>{const i=r.get(e)??999,a=r.get(t)??999;return i!==a?i-a:e.localeCompare(t)});this._climateRoomEntities=o.map(e=>{const t=this.hass?.states[e],a=t?.attributes?.friendly_name||e.split(".")[1]||e;return{entityId:e,name:a,visible:!i.includes(e)}})}_onLocalDragStart(e){this._localDragIdx=e}_onLocalDragOver(e,t){t.preventDefault(),this._localDropIdx=e}_onLocalDragLeave(){this._localDropIdx=null}_onLocalDragEnd(){this._localDragIdx=null,this._localDropIdx=null}_onLocalDrop(e,t){if(t.preventDefault(),null===this._localDragIdx||this._localDragIdx===e)return this._localDragIdx=null,void(this._localDropIdx=null);const i=[...this._climateRoomEntities],[a]=i.splice(this._localDragIdx,1);i.splice(e,0,a),this._climateRoomEntities=i,this._localDragIdx=null,this._localDropIdx=null}_toggleEntityVisibility(e){this._climateRoomEntities=this._climateRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_getClimateAction(e){const t=this.hass?.states[e];if(!t)return"off";const i=t.attributes.hvac_action;return i||("off"===t.state?"off":"idle")}_getClimateIcon(e){switch(e){case"heating":return"mdi:fire";case"cooling":return"mdi:snowflake";default:return"mdi:thermostat"}}_previewEntityData(e){const t=this.hass?.states[e.entityId],i=this._getClimateAction(e.entityId),a=t?.attributes.current_temperature,r=t?.attributes.temperature,o=t?.attributes.preset_mode;return{state:t,action:i,currentTemp:a,targetTemp:r,mode:o,hvacMode:t?.state??"off",actionText:De("heating"===i?"climate.action_heating":"cooling"===i?"climate.action_cooling":"idle"===i?"climate.action_idle":"climate.action_off")}}_previewCommon(e){const t=e.filter(e=>{const t=this.hass?.states[e.entityId];return t&&"off"!==t.state}).length,i=[];for(const n of e){const e=this.hass?.states[n.entityId]?.attributes.current_temperature;null!=e&&i.push(e)}const a=i.length>0?(i.reduce((e,t)=>e+t,0)/i.length).toFixed(1):null,r=e.map(e=>this._getClimateAction(e.entityId)),o=r.includes("heating"),s=r.includes("cooling");return{activeCount:t,avgTemp:a,tintColor:o?"var(--c-heat)":s?"var(--c-cool)":null,countBg:o?"rgba(var(--rgb-heat),0.15)":s?"rgba(var(--rgb-cool),0.15)":"var(--s3)",countColor:o?"var(--c-heat)":s?"var(--c-cool)":"var(--t2)"}}renderPreview(){const e=this._climateRoomEntities.filter(e=>e.visible);if(0===e.length)return F`<div class="cl-empty">${De("config.climate_no_entities")}</div>`;const{activeCount:t,avgTemp:i,tintColor:a,countBg:r,countColor:o}=this._previewCommon(e);return F`
      <div class="cl-preview-wrap">
        <!-- Header (reactive to toggle) -->
        ${this._climateShowHeader?F`
          <div class="preview-climate-header">
            <div class="preview-climate-header-left">
              <span class="preview-climate-header-title">${De("climate.title")}</span>
              <span class="preview-climate-header-count" style="background:${r};color:${o};">${t}/${e.length}</span>
            </div>
            ${i?F`<span class="preview-climate-header-avg">${i}°C</span>`:B}
          </div>
        `:B}

        ${"normal"===this._climateDisplayMode?this._renderNormalPreview(e,a):this._renderListPreview(e,a)}
      </div>
    `}_renderListPreview(e,t){const i=e[0],a=this._previewEntityData(i);return F`
      <div class="preview-climate-card glass">
        ${t?F`<div class="preview-climate-tint" style="background:radial-gradient(ellipse at 30% 30%,${t},transparent 70%);"></div>`:B}
        <!-- First entity row -->
        <div class="cl-row ${a.action}">
          <div class="cl-icon-btn">
            <ha-icon .icon=${this._getClimateIcon(a.action)}></ha-icon>
          </div>
          <div class="cl-expand">
            <div class="cl-info">
              <div class="cl-name">${i.name}</div>
              <div class="cl-sub">
                <span class="cl-action-text">${a.actionText}</span>
                ${a.mode?F`<span class="cl-mode-badge">${a.mode}</span>`:B}
              </div>
            </div>
            <div class="cl-temps">
              <div class="cl-temp-current">${void 0!==a.currentTemp?a.currentTemp.toFixed(1):"--"}<span class="unit">°</span></div>
              ${void 0!==a.targetTemp&&"off"!==a.action?F`<div class="cl-temp-target">→ ${a.targetTemp}°</div>`:B}
            </div>
            <div class="cl-dot"></div>
          </div>
        </div>
        <!-- Fold separator -->
        <div class="cl-separator" style="background:linear-gradient(90deg,transparent,${"heating"===a.action?"rgba(var(--rgb-heat),0.3)":"cooling"===a.action?"rgba(var(--rgb-cool),0.3)":"var(--b2)"},transparent);margin:0.0625rem 0.25rem;opacity:0.6;"></div>
        <!-- Expanded controls -->
        <div class="cl-controls">
          <!-- Temperature stepper -->
          <div class="cl-stepper-row">
            <div class="cl-stepper-btn">
              <ha-icon .icon=${"mdi:minus"}></ha-icon>
            </div>
            <div class="cl-stepper-center">
              <div class="cl-stepper-label">${De("climate.target")}</div>
              <div class="cl-stepper-value" style="color:${"heating"===a.action?"var(--c-heat)":"cooling"===a.action?"var(--c-cool)":"var(--t1)"};">${void 0!==a.targetTemp?`${a.targetTemp.toFixed(1)}°`:"--°"}</div>
            </div>
            <div class="cl-stepper-btn">
              <ha-icon .icon=${"mdi:plus"}></ha-icon>
            </div>
          </div>
          <!-- Separator -->
          <div class="cl-separator"></div>
          <!-- Mode chips -->
          <div class="cl-chips">
            ${["heat","cool","auto","off"].map(e=>F`
              <span class="cl-chip" style="border:1px solid ${a.hvacMode===e?"heat"===e?"rgba(var(--rgb-heat),0.3)":"cool"===e?"rgba(var(--rgb-cool),0.3)":"var(--b3)":"var(--b2)"};background:${a.hvacMode===e?"heat"===e?"rgba(var(--rgb-heat),0.1)":"cool"===e?"rgba(var(--rgb-cool),0.1)":"var(--s3)":"var(--s1)"};color:${a.hvacMode===e?"heat"===e?"var(--c-heat)":"cool"===e?"var(--c-cool)":"var(--t1)":"var(--t3)"};">
                <ha-icon .icon=${"heat"===e?"mdi:fire":"cool"===e?"mdi:snowflake":"auto"===e?"mdi:thermostat-auto":"mdi:power"}></ha-icon>
                ${De("heat"===e?"climate.mode_heat":"cool"===e?"climate.mode_cool":"auto"===e?"climate.mode_auto":"climate.mode_off")}
              </span>
            `)}
          </div>
        </div>
        <!-- Remaining entities -->
        ${e.length>1?F`
          <div class="cl-remaining-sep"></div>
          ${e.slice(1,4).map(e=>{const t=this._previewEntityData(e);return F`
              <div class="cl-row ${t.action}">
                <div class="cl-icon-btn">
                  <ha-icon .icon=${this._getClimateIcon(t.action)}></ha-icon>
                </div>
                <div class="cl-expand">
                  <div class="cl-info">
                    <div class="cl-name">${e.name}</div>
                    <div class="cl-sub">
                      <span class="cl-action-text">${t.actionText}</span>
                      ${t.mode?F`<span class="cl-mode-badge">${t.mode}</span>`:B}
                    </div>
                  </div>
                  <div class="cl-temps">
                    <div class="cl-temp-current">${void 0!==t.currentTemp?t.currentTemp.toFixed(1):"--"}<span class="unit">°</span></div>
                    ${void 0!==t.targetTemp&&"off"!==t.action?F`<div class="cl-temp-target">→ ${t.targetTemp}°</div>`:B}
                  </div>
                  <div class="cl-dot"></div>
                </div>
              </div>
            `})}
        `:B}
      </div>
    `}_renderNormalPreview(e,t){const i=e[0],a=this._previewEntityData(i),r=e=>(e-90)*Math.PI/180,o=e=>({x:60+40*Math.cos(r(e)),y:62+40*Math.sin(r(e))}),s=o(-120),n=o(120),c=`M ${s.x} ${s.y} A 40 40 0 1 1 ${n.x} ${n.y}`,d=40*Math.PI*(240/180),l=a.currentTemp??20,p=Math.max(0,Math.min(1,(l-15)/20))*d,h=a.targetTemp??l,m=o(240*Math.max(0,Math.min(1,(h-15)/20))-120),u="heating"===a.action?"var(--c-heat)":"cooling"===a.action?"var(--c-cool)":"var(--c-warning)",_="heating"===a.action?"🔥":"cooling"===a.action?"❄️":"";return F`
      <div class="preview-climate-card glass">
        ${t?F`<div class="preview-climate-tint" style="background:radial-gradient(ellipse at 50% 30%,${t},transparent 70%);"></div>`:B}
        <div class="cl-normal-content">
          <!-- Entity tabs -->
          ${e.length>1?F`
            <div class="cl-entity-tabs">
              ${e.slice(0,4).map((e,t)=>F`
                <span class="cl-entity-tab ${0===t?"active":""}">${e.name.length>8?e.name.slice(0,8)+"…":e.name}</span>
              `)}
            </div>
          `:B}
          <!-- Arc gauge -->
          <div class="cl-gauge-wrap">
            <svg viewBox="0 0 120 80" fill="none" class="cl-gauge-svg">
              ${U`
                <path d=${c} stroke="var(--s3)" stroke-width="4" fill="none" stroke-linecap="round" />
                <path d=${c} stroke=${u} stroke-width="4" fill="none" stroke-linecap="round"
                  stroke-dasharray=${d} stroke-dashoffset=${d-p} />
                <circle cx=${m.x} cy=${m.y} r="3" fill="var(--t1)" />
                <text x=${60} y=${58} text-anchor="middle" fill="var(--t1)" font-size="14" font-weight="700">${l.toFixed(1)}°</text>
                <text x=${60} y=${70} text-anchor="middle" fill="var(--t3)" font-size="7">
                  ${_} ${a.actionText}
                </text>
              `}
            </svg>
          </div>
          <!-- Temperature stepper -->
          <div class="cl-stepper-row">
            <div class="cl-stepper-btn sm">
              <ha-icon .icon=${"mdi:minus"}></ha-icon>
            </div>
            <div class="cl-stepper-center">
              <div class="cl-stepper-label">${De("climate.target")}</div>
              <div class="cl-stepper-value sm" style="color:${"heating"===a.action?"var(--c-heat)":"cooling"===a.action?"var(--c-cool)":"var(--t1)"};">${void 0!==a.targetTemp?`${a.targetTemp.toFixed(1)}°°C`:"--°°C"}</div>
            </div>
            <div class="cl-stepper-btn sm">
              <ha-icon .icon=${"mdi:plus"}></ha-icon>
            </div>
          </div>
          <!-- Separator + mode chips (fold open) -->
          <div class="cl-separator cl-fold-sep" style="background:linear-gradient(90deg,transparent,${"heating"===a.action?"rgba(var(--rgb-heat),0.3)":"cooling"===a.action?"rgba(var(--rgb-cool),0.3)":"var(--b2)"},transparent);"></div>
          <div class="cl-chips pb">
            ${["heat","cool","auto","off"].map(e=>F`
              <span class="cl-chip" style="border:1px solid ${a.hvacMode===e?"heat"===e?"rgba(var(--rgb-heat),0.3)":"cool"===e?"rgba(var(--rgb-cool),0.3)":"var(--b3)":"var(--b2)"};background:${a.hvacMode===e?"heat"===e?"rgba(var(--rgb-heat),0.1)":"cool"===e?"rgba(var(--rgb-cool),0.1)":"var(--s3)":"var(--s1)"};color:${a.hvacMode===e?"heat"===e?"var(--c-heat)":"cool"===e?"var(--c-cool)":"var(--t1)":"var(--t3)"};">
                <ha-icon .icon=${"heat"===e?"mdi:fire":"cool"===e?"mdi:snowflake":"auto"===e?"mdi:thermostat-auto":"mdi:power"}></ha-icon>
                ${De("heat"===e?"climate.mode_heat":"cool"===e?"climate.mode_cool":"auto"===e?"climate.mode_auto":"climate.mode_off")}
              </span>
            `)}
          </div>
        </div>
      </div>
    `}renderTab(){if(this._lang,!this.hass)return F`${B}`;const e=this._climateRoomEntities;return F`
      <div class="preview-encart">
        <div class="preview-label">${De("config.preview")}</div>
        ${this.renderPreview()}
      </div>

      <div class="tab-panel" id="panel-climate">
        <!-- Description -->
        <div class="sub-section">
          <div class="section-label">${De("config.tab_climate")}</div>
          <div class="section-desc">${De("config.climate_desc")}</div>
        </div>

        <!-- Display mode popup -->
        <div class="sub-section">
          <div class="section-label">${De("config.climate_display_mode_popup")}</div>
          <div class="section-desc">${De("config.climate_display_mode_popup_desc")}</div>
          <div class="chip-group">
            <button class="chip ${"list"===this._climateDisplayMode?"active":""}"
              @click=${()=>{this._climateDisplayMode="list"}}
              aria-pressed=${"list"===this._climateDisplayMode?"true":"false"}>
              <ha-icon .icon=${"mdi:format-list-bulleted"}></ha-icon>
              ${De("config.climate_mode_list")}
            </button>
            <button class="chip ${"normal"===this._climateDisplayMode?"active":""}"
              @click=${()=>{this._climateDisplayMode="normal"}}
              aria-pressed=${"normal"===this._climateDisplayMode?"true":"false"}>
              <ha-icon .icon=${"mdi:gauge"}></ha-icon>
              ${De("config.climate_mode_normal")}
            </button>
          </div>
        </div>

        <!-- Behaviour -->
        <div class="sub-section">
          <div class="section-label">${De("config.behavior")}</div>
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
                <div class="feature-name">${De("config.climate_show_header")}</div>
                <div class="feature-desc">${De("config.climate_show_header_desc")}</div>
              </div>
              <span class="toggle ${this._climateShowHeader?"on":""}"></span>
            </button>
          </div>
        </div>

        <!-- Room entities -->
        <div class="sub-section">
          ${0===e.length?F`
            <div class="banner">
              <ha-icon .icon=${"mdi:thermostat"}></ha-icon>
              <span>${De("config.climate_no_entities")}</span>
            </div>
          `:F`
            <div class="section-label">${De("config.climate_room_entities")} (${e.length})</div>
            <div class="section-desc">${De("config.climate_room_entities_desc")}</div>
            <div class="item-list">
              ${e.map((e,t)=>{const i=this._localDragIdx===t,a=this._localDropIdx===t,r=["item-row",e.visible?"":"disabled",i?"dragging":"",a?"drop-target":""].filter(Boolean).join(" ");return F`
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
                        aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.name}"
                      ></button>
                    </div>
                  </div>
                `})}
            </div>
          `}
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this.reload()}>${De("common.reset")}</button>
        </div>
      </div>
    `}}Ct([me()],It.prototype,"_climateShowHeader"),Ct([me()],It.prototype,"_climateDisplayMode"),Ct([me()],It.prototype,"_climateDashboardDisplayMode"),Ct([me()],It.prototype,"_climateDashboardEntities"),Ct([me()],It.prototype,"_climateRoom"),Ct([me()],It.prototype,"_climateRoomEntities"),Ct([me()],It.prototype,"_localDragIdx"),Ct([me()],It.prototype,"_localDropIdx");try{customElements.define("config-tab-climate",It)}catch{}const zt=["light","media_player","climate","fan","cover","camera","vacuum"],At=new Set(["light","media_player","climate","cover","fan","camera"]),Pt={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum"},Tt={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},camera:{name:"config.domain_camera",desc:"config.domain_camera_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};var Ot=Object.defineProperty,Rt=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Ot(t,i,o),o};const Mt=["light","cover","climate","fan","media_player","camera"];function Lt(e){return Pt[e]??"mdi:help-circle"}class jt extends qe{constructor(){super(...arguments),this._unassignedEntities=[],this._unassignedDropdownEntity=null,this._unassignedEntitySearch="",this._unassignedAreaSearch="",this._unassignedEditingEntity=null,this._iconPopupEntity=null,this._iconSearch="",this._iconList=[],this._iconLoading=!1,this._portalEl=null}updated(e){super.updated(e),e.has("hass")&&this.hass&&0===this._unassignedEntities.length&&this._loadEntities()}loadFromConfig(e){}collectSaveData(){return{}}renderPreview(){return B}_collectAllEntities(){if(!this.hass)return[];const e=this.hass.entities,t=this.hass.devices,i=this.hass.areas,a=[];for(const r of Object.values(e)){if(r.disabled_by||r.hidden_by)continue;const e=r.entity_id.split(".")[0];if(!Mt.includes(e))continue;const o=Re(r,t),s=this.hass.states[r.entity_id],n=s?.attributes?.friendly_name??r.entity_id,c=o?i[o]?.name??null:null;a.push({entityId:r.entity_id,name:n,domain:e,areaId:o,areaName:c,icon:r.icon??null})}return a.sort((e,t)=>{const i=e.areaId?1:0,a=t.areaId?1:0;if(i!==a)return i-a;const r=Mt.indexOf(e.domain)-Mt.indexOf(t.domain);return 0!==r?r:e.name.localeCompare(t.name)}),a}_loadEntities(){this._unassignedEntities=this._collectAllEntities(),this._unassignedDropdownEntity=null,this._unassignedEditingEntity=null,this._unassignedEntitySearch="",this._unassignedAreaSearch=""}async _assignEntityArea(e,t){if(this.hass)try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:e,area_id:t}),this._unassignedEntities=this._unassignedEntities.map(i=>i.entityId===e?{...i,areaId:t,areaName:this.hass?.areas[t]?.name??null}:i),this._unassignedDropdownEntity=null,this._unassignedAreaSearch="",this.dispatchEvent(new CustomEvent("entities-assigned",{bubbles:!0,composed:!0}))}catch{this._fireToast(!1)}}async _renameEntity(e,t){if(!this.hass)return;const i=t.trim();if(!i)return void(this._unassignedEditingEntity=null);const a=this._unassignedEntities.find(t=>t.entityId===e);if(a&&a.name===i)this._unassignedEditingEntity=null;else{try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:e,name:i}),this._unassignedEntities=this._unassignedEntities.map(t=>t.entityId===e?{...t,name:i}:t)}catch{this._fireToast(!1)}this._unassignedEditingEntity=null}}async _openIconPopup(e){this._iconLoading||(0===this._iconList.length&&await this._loadIconList(),this._iconSearch="",this._iconPopupEntity=e)}async _loadIconList(){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot?.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot?.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim();return e?this._iconList.filter(t=>t.toLowerCase().includes(e)).slice(0,120):this._iconList.slice(0,120)}async _selectIcon(e){const t=this._iconPopupEntity;if(this._iconPopupEntity=null,!t||!this.hass)return;const i=this._unassignedEntities.find(e=>e.entityId===t);if(!i||i.icon!==(e||null))try{await this.hass.connection.sendMessagePromise({type:"config/entity_registry/update",entity_id:t,icon:e||null}),this._unassignedEntities=this._unassignedEntities.map(i=>i.entityId===t?{...i,icon:e||null}:i)}catch{this._fireToast(!1)}}_showIconPortal(){if(!this._iconPopupEntity)return void this._removeIconPortal();const e=this._unassignedEntities.find(e=>e.entityId===this._iconPopupEntity),t=e?.icon??"",i=this._getFilteredIcons();this._portalEl||(this._portalEl=document.createElement("div"),document.body.appendChild(this._portalEl));const a=()=>{this._iconPopupEntity=null,this._removeIconPortal()},r=e=>{this._selectIcon(e),this._removeIconPortal()},o=e=>{this._iconSearch=e,this._showIconPortal()};this._portalEl.replaceChildren(),Object.assign(this._portalEl.style,{position:"fixed",inset:"0",zIndex:"10000",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}),this._portalEl.addEventListener("click",e=>{e.target===this._portalEl&&a()},{once:!0});const s=document.createElement("div");Object.assign(s.style,{width:"100%",maxWidth:"25rem",maxHeight:"70vh",display:"flex",flexDirection:"column",borderRadius:"22px",background:"linear-gradient(135deg, #1a2233 0%, #141c2a 50%, #172030 100%)",boxShadow:"inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"});const n=document.createElement("div");Object.assign(n.style,{padding:"0.875rem 1rem 0.625rem",display:"flex",flexDirection:"column",gap:"0.625rem",borderBottom:"1px solid rgba(255,255,255,0.06)"});const c=document.createElement("span");Object.assign(c.style,{fontSize:"11px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.45)"}),c.textContent=De("config.unassigned_change_icon");const d=document.createElement("input");Object.assign(d.style,{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.88)",fontSize:"13px",outline:"none",boxSizing:"border-box"}),d.placeholder="mdi:...",d.value=this._iconSearch,d.addEventListener("input",()=>o(d.value)),n.appendChild(c),n.appendChild(d),s.appendChild(n);const l=document.createElement("div");Object.assign(l.style,{overflow:"auto",flex:"1",padding:"0.5rem"});const p=document.createElement("div");Object.assign(p.style,{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"4px"});const h=this._createIconBtn("mdi:cancel",""===t,.4);h.addEventListener("click",()=>r("")),p.appendChild(h);for(const m of i){const e=this._createIconBtn(m,m===t,1);e.addEventListener("click",()=>r(m)),p.appendChild(e)}if(0===i.length&&this._iconSearch){const e=document.createElement("div");Object.assign(e.style,{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"rgba(255,255,255,0.35)",fontSize:"13px"}),e.textContent=De("config.title_no_icons_found"),p.appendChild(e)}l.appendChild(p),s.appendChild(l),this._portalEl.appendChild(s),d.focus()}_createIconBtn(e,t,i){const a=document.createElement("button");Object.assign(a.style,{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"10px",border:t?"2px solid rgba(129,140,248,0.6)":"1px solid rgba(255,255,255,0.06)",background:t?"rgba(129,140,248,0.15)":"rgba(255,255,255,0.04)",cursor:"pointer",color:"rgba(255,255,255,0.88)",padding:"0"});const r=document.createElement("ha-icon");return r.icon=e,r.style.cssText=`--mdc-icon-size:20px;display:flex;align-items:center;justify-content:center;opacity:${i};`,a.appendChild(r),a}_removeIconPortal(){this._portalEl&&(this._portalEl.remove(),this._portalEl=null)}disconnectedCallback(){super.disconnectedCallback(),this._removeIconPortal()}closeDropdowns(){this._unassignedDropdownEntity=null}renderTab(){if(this._lang,!this.hass)return F`${B}`;const e=this._unassignedEntities,t=Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name)),i=this._unassignedEntitySearch.toLowerCase(),a=this._unassignedAreaSearch.toLowerCase(),r=i?e.filter(e=>e.name.toLowerCase().includes(i)||e.entityId.toLowerCase().includes(i)):e,o=new Map;for(const c of r){const e=o.get(c.domain)??[];e.push(c),o.set(c.domain,e)}const s=e.filter(e=>!e.areaId).length,n=a?t.filter(e=>e.name.toLowerCase().includes(a)):t;return F`
      <div class="tab-panel" id="panel-unassigned">
        <div class="section-label">${De("config.tab_unassigned")}</div>
        <div class="section-desc">${De("config.unassigned_desc")}</div>

        ${s>0?F`
          <div class="banner pw-ua-banner-warn">
            <ha-icon .icon=${"mdi:alert-circle-outline"}></ha-icon>
            <span>${De("config.unassigned_count",{count:String(s)})}</span>
          </div>
        `:B}

        ${0===e.length?F`
          <div class="banner">
            <ha-icon .icon=${"mdi:help-circle-outline"}></ha-icon>
            <span>${De("config.unassigned_no_entities")}</span>
          </div>
        `:F`
          <!-- Entity search -->
          <input
            type="text"
            class="dropdown-search pw-ua-search"
            placeholder="${De("config.search_entity")}"
            aria-label="${De("config.search_entity")}"
            .value=${this._unassignedEntitySearch}
            @input=${e=>{this._unassignedEntitySearch=e.target.value}}
          />

          ${0===r.length?F`
            <div class="banner">
              <ha-icon .icon=${"mdi:magnify"}></ha-icon>
              <span>${De("config.unassigned_no_results")}</span>
            </div>
          `:B}

          ${[...o.entries()].map(([e,t])=>F`
            <div class="section-label pw-ua-domain-group">
              <ha-icon .icon=${Lt(e)} class="pw-ua-domain-icon"></ha-icon>
              ${function(e){const t=Tt[e];return t?De(t.name):e}(e)}
              <span class="pw-ua-domain-count">(${t.length})</span>
            </div>
            <div class="item-list">
              ${t.map(e=>{const t=this._unassignedDropdownEntity===e.entityId,i=this._unassignedEditingEntity===e.entityId;return F`
                  <div class="item-row">
                    <div class="item-info pw-ua-entity-info">
                      ${i?F`
                        <input
                          type="text"
                          class="entity-rename-input"
                          .value=${e.name}
                          aria-label="${De("config.unassigned_rename")}"
                          @blur=${t=>{const i=t.target;i.dataset.cancelled||this._renameEntity(e.entityId,i.value)}}
                          @keydown=${e=>{"Enter"===e.key&&e.target.blur(),"Escape"===e.key&&(e.target.dataset.cancelled="1",this._unassignedEditingEntity=null)}}
                          @focus=${e=>e.target.select()}
                        />
                      `:F`
                        <button
                          class="item-name entity-name-btn"
                          @click=${()=>{this._unassignedEditingEntity=e.entityId,this.updateComplete.then(()=>{const e=this.shadowRoot?.querySelector(".entity-rename-input");e?.focus()})}}
                          title="${De("config.unassigned_rename")}"
                          aria-label="${De("config.unassigned_rename")}: ${e.name}"
                        >
                          ${e.name}
                          <ha-icon .icon=${"mdi:pencil"} class="pw-ua-edit-icon"></ha-icon>
                        </button>
                      `}
                      <span class="item-meta">${e.entityId}</span>
                    </div>
                    <button
                      class="btn-icon xs pw-ua-icon-btn-shrink"
                      title="${De("config.unassigned_change_icon")}"
                      aria-label="${De("config.unassigned_change_icon")}: ${e.name}"
                      @click=${async()=>{await this._openIconPopup(e.entityId),this._showIconPortal()}}
                    >
                      <ha-icon .icon=${e.icon||Lt(e.domain)} class="pw-ua-entity-icon"></ha-icon>
                    </button>
                    <div class="dropdown ${t?"open":""} pw-ua-dropdown-wrap">
                      <button
                        class="dropdown-trigger"
                        style="padding:0.25rem 0.5rem;font-size:var(--fz-base);min-width:0;${e.areaId?"":"color:var(--c-warning);"}"
                        @click=${i=>{i.stopPropagation(),this._unassignedAreaSearch="",this._unassignedDropdownEntity=t?null:e.entityId}}
                        aria-expanded=${t?"true":"false"}
                        aria-haspopup="listbox"
                      >
                        <span class="pw-ua-area-text">${e.areaName??De("config.unassigned_select_area")}</span>
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
                        ${n.map(t=>F`
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

    `}}Rt([me()],jt.prototype,"_unassignedEntities"),Rt([me()],jt.prototype,"_unassignedDropdownEntity"),Rt([me()],jt.prototype,"_unassignedEntitySearch"),Rt([me()],jt.prototype,"_unassignedAreaSearch"),Rt([me()],jt.prototype,"_unassignedEditingEntity"),Rt([me()],jt.prototype,"_iconPopupEntity"),Rt([me()],jt.prototype,"_iconSearch");try{customElements.define("config-tab-unassigned",jt)}catch{}var Ht=Object.defineProperty,Nt=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Ht(t,i,o),o};class Vt extends ne{constructor(){super(...arguments),this.rooms=[],this._dragIdx=null,this._dropIdx=null}createRenderRoot(){return this}_onDragStart(e){this._dragIdx=e}_onDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDrop(e,t){if(t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e){const t=[...this.rooms],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this.dispatchEvent(new CustomEvent("rooms-reordered",{detail:{rooms:t},bubbles:!0,composed:!0}))}this._dragIdx=null,this._dropIdx=null}_toggleVisibility(e,t){t.stopPropagation(),t.preventDefault(),this.dispatchEvent(new CustomEvent("room-visibility-toggle",{detail:{areaId:e.areaId,visible:!e.visible},bubbles:!0,composed:!0}))}render(){return this.rooms.length?F`
      <div class="room-grid">
        ${this.rooms.map((e,t)=>{const i=this._dragIdx===t,a=this._dropIdx===t&&null!==this._dragIdx&&this._dragIdx!==t;return F`
            <div
              class="room-card dash-card ${e.visible?"":"off"} ${i?"dragging":""} ${a?"drop-target":""}"
              draggable="true"
              @dragstart=${()=>this._onDragStart(t)}
              @dragover=${e=>this._onDragOver(t,e)}
              @dragleave=${()=>this._onDragLeave()}
              @drop=${e=>this._onDrop(t,e)}
              @dragend=${()=>this._onDragEnd()}
              @click=${()=>this.dispatchEvent(new CustomEvent("room-select",{detail:e.areaId,bubbles:!0,composed:!0}))}
            >
              <button
                class="dash-toggle ${e.visible?"on":""}"
                @click=${t=>this._toggleVisibility(e,t)}
                aria-label=${e.visible?De("config.hide_room"):De("config.show_room")}
              ></button>
              <ha-icon .icon=${e.icon||"mdi:home"}></ha-icon>
              <span class="room-name">${e.name}</span>
              <span class="dash-drag-hint"><ha-icon .icon=${"mdi:drag"}></ha-icon></span>
            </div>
          `})}
      </div>
    `:F`<div class="empty-state">${De("config.no_rooms")}</div>`}}Nt([he({attribute:!1})],Vt.prototype,"hass"),Nt([he({attribute:!1})],Vt.prototype,"rooms"),Nt([me()],Vt.prototype,"_dragIdx"),Nt([me()],Vt.prototype,"_dropIdx"),customElements.define("config-room-list",Vt);var qt=Object.defineProperty,Ft=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&qt(t,i,o),o};const Ut=[{id:"light",label:"Lumières",icon:"mdi:lightbulb-group",domains:["light"],color:"251,191,36"},{id:"cover",label:"Volets",icon:"mdi:window-shutter",domains:["cover"],color:"167,139,250"},{id:"climate",label:"Climat",icon:"mdi:thermostat",domains:["climate"],color:"96,165,250"},{id:"media",label:"Media",icon:"mdi:speaker",domains:["media_player"],color:"129,140,248"},{id:"fan",label:"Ventilateurs",icon:"mdi:fan",domains:["fan"],color:"45,212,191"}];class Wt extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._openSections=new Set,this._sections=[],this._scenes=[],this._tempEntity="",this._humidityEntity="",this._tempHigh=null,this._tempLow=null,this._humidityThreshold=null,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._availableTempEntities=[],this._availableHumidityEntities=[],this._tempDropdownOpen=!1,this._humidityDropdownOpen=!1,this._dragIdx=null,this._dropIdx=null,this._dragContext=null,this._loaded=!1,this._autoOpenDone=!1}createRenderRoot(){return this}updated(e){super.updated(e),(e.has("areaId")||e.has("hass"))&&(this._loaded=!1,this._autoOpenDone=!1),!this._loaded&&this.hass&&this.areaId&&(this._loaded=!0,this._loadRoomConfig()),!this._autoOpenDone&&this._sections.length>0&&(this._autoOpenDone=!0)}disconnectedCallback(){super.disconnectedCallback(),this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=void 0)}async _loadRoomConfig(){if(!this.hass||!this.areaId)return;const e=Me(this.areaId,this.hass.entities,this.hass.devices);let t=null,i=new Set,a=[];try{if(!this.backend)throw new Error("No backend");const e=await this.backend.send("get_room",{area_id:this.areaId});e&&(t=e.card_order.length>0?e.card_order:null,i=new Set(e.hidden_scenes??[]),a=e.scene_order??[],this._tempEntity=e.temperature_entity??"",this._humidityEntity=e.humidity_entity??"",this._tempHigh=e.temp_high??null,this._tempLow=e.temp_low??null,this._humidityThreshold=e.humidity_threshold??null,this._showLights=e.show_lights??!0,this._showTemperature=e.show_temperature??!0,this._showHumidity=e.show_humidity??!0)}catch{}const r=this.hass;this._availableTempEntities=[],this._availableHumidityEntities=[];for(const p of e)if(p.entity_id.startsWith("sensor.")){const e=r.states[p.entity_id],t=e?.attributes?.device_class,i=e?.attributes?.friendly_name||p.entity_id.split(".")[1];"temperature"===t&&this._availableTempEntities.push({id:p.entity_id,name:i}),"humidity"===t&&this._availableHumidityEntities.push({id:p.entity_id,name:i})}const o=new Map;for(const p of e){const e=p.entity_id.split(".")[0];o.set(e,(o.get(e)||0)+1)}const s=t?[...t]:[...zt],n=new Set(s);for(const p of o.keys())!n.has(p)&&Pt[p]&&s.push(p);this._sections=s.map(e=>{const i=Ut.find(t=>t.domains.includes(e)||t.id===e);if(!i)return null;const a=i.domains.reduce((e,t)=>e+(o.get(t)||0),0);return 0!==a&&At.has(e)?{...i,visible:!t||t.includes(e),count:a}:null}).filter(e=>null!==e);const c=e.filter(e=>e.entity_id.startsWith("scene.")),d=new Map;a.forEach((e,t)=>d.set(e,t));const l=c.map(e=>{const t=r.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!i.has(e.entity_id)}});l.sort((e,t)=>{const i=d.get(e.entityId),a=d.get(t.entityId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),this._scenes=l}_scheduleSave(){this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>{this._saveTimer=void 0,this._save()},800),this.dispatchEvent(new CustomEvent("tab-dirty",{bubbles:!0,composed:!0}))}async _save(){if(this.backend&&this.areaId)try{await this.backend.send("set_room",{area_id:this.areaId,card_order:this._sections.filter(e=>e.visible).map(e=>e.id),hidden_scenes:this._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:this._scenes.map(e=>e.entityId),temperature_entity:this._tempEntity||null,humidity_entity:this._humidityEntity||null,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold,show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity}),ue.emit("room-config-changed",{areaId:this.areaId}),this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!0},bubbles:!0,composed:!0}))}catch{this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!1},bubbles:!0,composed:!0}))}}_toggleSectionVisible(e){this._sections=this._sections.map(t=>t.id===e?{...t,visible:!t.visible}:t),this._sections.find(t=>t.id===e)?.visible||this._openSections.delete(e),this._scheduleSave()}_toggleSceneVisible(e){this._scenes=this._scenes.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),this._scheduleSave()}_toggleSection(e){this._openSections.has(e)?this._openSections.delete(e):this._openSections.add(e),this.requestUpdate()}_onDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null,this._dragContext=null}_onDrop(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);if("sections"===this._dragContext){const t=[...this._sections],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._sections=t,this._scheduleSave()}else if("scenes"===this._dragContext){const t=[...this._scenes],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._scenes=t,this._scheduleSave()}this._dragIdx=null,this._dropIdx=null}render(){return this._sections.length?F`
      ${this._renderIndicators()}
      ${this._renderSensors()}

      ${this._scenes.length>0?F`
        <div class="section-label">${De("config.popup_scenes")}</div>
        <div class="scene-chips">
          ${this._scenes.map((e,t)=>F`
            <button
              class="scene-chip ${e.visible?"on":""} ${this._dragIdx===t&&"scenes"===this._dragContext?"dragging":""} ${this._dropIdx===t&&"scenes"===this._dragContext?"drop-target":""}"
              draggable="true"
              @click=${()=>this._toggleSceneVisible(e.entityId)}
              @dragstart=${e=>{e.stopPropagation(),this._onDragStart(t,"scenes")}}
              @dragover=${e=>{e.preventDefault(),e.stopPropagation(),null!==this._dragIdx&&this._dragIdx!==t&&(this._dropIdx=t)}}
              @dragleave=${()=>{this._dropIdx=null}}
              @drop=${e=>{e.preventDefault(),e.stopPropagation(),this._onDrop(t,e)}}
              @dragend=${()=>this._onDragEnd()}
              aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.name}"
            >
              <ha-icon class="chip-drag" .icon=${"mdi:drag"}></ha-icon>
              <ha-icon .icon=${"mdi:palette"}></ha-icon>
              <span>${e.name}</span>
            </button>
          `)}
        </div>
      `:B}

      <div class="section-label pw-rd-cards-label">${De("config.popup_internal_cards")}</div>
      <div class="room-sections">
        ${this._sections.map((e,t)=>{const i=this._openSections.has(e.id)&&e.visible,a=this._dragIdx===t&&"sections"===this._dragContext,r=this._dropIdx===t&&"sections"===this._dragContext;return F`
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
                  aria-label="${e.visible?De("common.hide"):De("common.show")} ${e.label}"
                ></button>
                ${e.visible?F`
                  <ha-icon class="section-chevron ${i?"open":""}" .icon=${"mdi:chevron-down"}
                    @click=${()=>this._toggleSection(e.id)}></ha-icon>
                `:B}
              </div>
              ${e.visible?F`
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
    `:F`<div class="empty-state">Aucune entité dans cette pièce</div>`}_selectTempEntity(e){this._tempEntity=e,this._tempDropdownOpen=!1,this._scheduleSave()}_selectHumidityEntity(e){this._humidityEntity=e,this._humidityDropdownOpen=!1,this._scheduleSave()}_renderIndicators(){return F`
      <div class="section-label">${De("config.room_indicators")}</div>
      <div class="section-desc">${De("config.room_indicators_desc")}</div>
      <div class="feature-list">
        <button class="feature-row" @click=${()=>{this._showLights=!this._showLights,this._scheduleSave()}}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:lightbulb"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${De("config.room_show_lights")}</div>
          </div>
          <span class="toggle ${this._showLights?"on":""}" role="switch" aria-checked=${this._showLights?"true":"false"} aria-label=${De("config.room_show_lights")}></span>
        </button>
        <button class="feature-row" @click=${()=>{this._showTemperature=!this._showTemperature,this._scheduleSave()}}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:thermometer"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${De("config.room_show_temperature")}</div>
          </div>
          <span class="toggle ${this._showTemperature?"on":""}" role="switch" aria-checked=${this._showTemperature?"true":"false"} aria-label=${De("config.room_show_temperature")}></span>
        </button>
        <button class="feature-row" @click=${()=>{this._showHumidity=!this._showHumidity,this._scheduleSave()}}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:water-percent"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${De("config.room_show_humidity")}</div>
          </div>
          <span class="toggle ${this._showHumidity?"on":""}" role="switch" aria-checked=${this._showHumidity?"true":"false"} aria-label=${De("config.room_show_humidity")}></span>
        </button>
      </div>
    `}_renderSensors(){const e="__none__"===this._tempEntity?De("config.room_no_sensor"):this._tempEntity?this._availableTempEntities.find(e=>e.id===this._tempEntity)?.name??this._tempEntity:De("config.room_auto_detect"),t="__none__"===this._humidityEntity?De("config.room_no_sensor"):this._humidityEntity?this._availableHumidityEntities.find(e=>e.id===this._humidityEntity)?.name??this._humidityEntity:De("config.room_auto_detect");return F`
      <div class="section-label">${De("config.room_sensors")}</div>
      <div class="section-desc">${De("config.room_sensors_desc")}</div>

      <div class="feature-name pw-rd-sensor-label">${De("config.room_temp_entity")}</div>
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
            ${De("config.room_auto_detect")}
          </button>
          ${this._availableTempEntities.map(e=>F`
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
            ${De("config.room_no_sensor")}
          </button>
        </div>
      </div>

      <div class="feature-name pw-rd-sensor-label">${De("config.room_humidity_entity")}</div>
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
            ${De("config.room_auto_detect")}
          </button>
          ${this._availableHumidityEntities.map(e=>F`
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
            ${De("config.room_no_sensor")}
          </button>
        </div>
      </div>

      <div class="feature-name pw-rd-threshold-label">${De("config.room_thresholds")}</div>
      <div class="feature-list">
        <div class="range-row">
          <div class="feature-icon"><ha-icon .icon=${"mdi:thermometer-high"}></ha-icon></div>
          <div class="feature-text pw-rd-flex-fixed">
            <div class="feature-name">${De("config.room_temp_high")}</div>
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
            <div class="feature-name">${De("config.room_temp_low")}</div>
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
            <div class="feature-name">${De("config.room_humidity_threshold")}</div>
          </div>
          <input type="range" class="range-input" min="40" max="90" step="1"
            .value=${String(this._humidityThreshold??65)}
            @input=${e=>{this._humidityThreshold=parseFloat(e.target.value),this._scheduleSave()}}
          />
          <span class="range-value">${this._humidityThreshold??65}%</span>
        </div>
      </div>

      <div class="fold-sep visible pw-rd-sep"></div>
    `}_renderSection(e){switch(e.id){case"light":return F`<config-tab-light .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-light>`;case"cover":return F`<config-tab-cover .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-cover>`;case"climate":return F`<config-tab-climate .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-climate>`;case"media":return F`<config-tab-media .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-media>`;case"fan":return F`<config-tab-fan .hass=${this.hass} .areaId=${this.areaId} .configData=${this.configData} .backend=${this.backend} .rooms=${this.rooms}></config-tab-fan>`;default:return F``}}}Ft([he({attribute:!1})],Wt.prototype,"hass"),Ft([he()],Wt.prototype,"areaId"),Ft([he({attribute:!1})],Wt.prototype,"configData"),Ft([he({attribute:!1})],Wt.prototype,"backend"),Ft([he({attribute:!1})],Wt.prototype,"rooms"),Ft([me()],Wt.prototype,"_openSections"),Ft([me()],Wt.prototype,"_sections"),Ft([me()],Wt.prototype,"_scenes"),Ft([me()],Wt.prototype,"_tempEntity"),Ft([me()],Wt.prototype,"_humidityEntity"),Ft([me()],Wt.prototype,"_tempHigh"),Ft([me()],Wt.prototype,"_tempLow"),Ft([me()],Wt.prototype,"_humidityThreshold"),Ft([me()],Wt.prototype,"_showLights"),Ft([me()],Wt.prototype,"_showTemperature"),Ft([me()],Wt.prototype,"_showHumidity"),Ft([me()],Wt.prototype,"_tempDropdownOpen"),Ft([me()],Wt.prototype,"_humidityDropdownOpen"),Ft([me()],Wt.prototype,"_dragIdx"),Ft([me()],Wt.prototype,"_dropIdx"),Ft([me()],Wt.prototype,"_dragContext"),customElements.define("config-room-detail",Wt);var Bt=Object.defineProperty,Yt=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Bt(t,i,o),o};const Kt=[{id:"title",icon:"mdi:format-title",nameKey:"config.dashboard_card_title",color:"var(--c-accent)"},{id:"light",icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",color:"var(--c-light-glow)"},{id:"weather",icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",color:"var(--c-info)"},{id:"cover",icon:"mdi:blinds",nameKey:"config.dashboard_card_cover",color:"var(--c-purple)"},{id:"climate",icon:"mdi:thermostat",nameKey:"config.dashboard_card_climate",color:"var(--c-purple)"},{id:"fan",icon:"mdi:fan",nameKey:"config.dashboard_card_fan",color:"var(--c-accent)"},{id:"media",icon:"mdi:speaker",nameKey:"config.dashboard_card_media",color:"var(--c-accent)"},{id:"spotify",icon:"mdi:spotify",nameKey:"config.dashboard_card_spotify",color:"var(--c-spotify)"},{id:"presence",icon:"mdi:account-group",nameKey:"config.dashboard_card_presence",color:"var(--c-accent)"},{id:"camera_carousel",icon:"mdi:cctv",nameKey:"config.dashboard_card_camera_carousel",color:"var(--c-alert)"}],Gt={light:{cmd:"set_light_config",configKey:"light_card"},weather:{cmd:"set_weather",configKey:"weather"},cover:{cmd:"set_cover_config",configKey:"cover_card"},fan:{cmd:"set_fan_config",configKey:"fan_card"},spotify:{cmd:"set_spotify_config",configKey:"spotify_card"},media:{cmd:"set_media_config",configKey:"media_card"},presence:{cmd:"set_presence_config",configKey:"presence_card"},climate:{cmd:"set_climate_config",configKey:"climate_card"},camera_carousel:{cmd:"set_camera_carousel_config",configKey:"camera_carousel"}},Xt={title:"title",light:"light",weather:"weather",cover:"cover",climate:"climate",fan:"fan",media:"media",spotify:"spotify",presence:"presence",camera_carousel:"camera"};class Jt extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._enabledCards=["weather"],this._cardOrder=[],this._hideHeader=!1,this._hideSidebar=!1,this._dynamicBackground=!0,this._dragIdx=null,this._dropIdx=null,this._cardSubExtras={}}createRenderRoot(){return this}updated(e){e.has("configData")&&this.configData&&this._loadFromConfig(this.configData)}disconnectedCallback(){super.disconnectedCallback(),this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=void 0)}_loadFromConfig(e){const t=e.dashboard;t&&(this._enabledCards=t.enabled_cards??["weather"],this._cardOrder=t.card_order??Kt.map(e=>e.id),this._hideHeader=t.hide_header??!1,this._hideSidebar=t.hide_sidebar??!1,this._dynamicBackground=t.dynamic_background??!0),this._cardSubExtras={};const i=e;for(const[a,r]of Object.entries(Gt)){const e=i[r.configKey];e&&(this._cardSubExtras[a]={...e})}}_scheduleSave(){this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>{this._saveTimer=void 0,this._save()},800),this.dispatchEvent(new CustomEvent("tab-dirty",{bubbles:!0,composed:!0}))}async _save(){if(this.backend)try{await this.backend.send("set_dashboard",{enabled_cards:this._enabledCards,card_order:this._cardOrder,hide_header:this._hideHeader,hide_sidebar:this._hideSidebar,dynamic_background:this._dynamicBackground});for(const[,e]of Object.entries(Gt)){const t=this._cardSubExtras[e.configKey.replace("_card","")]??this._cardSubExtras[e.configKey];t&&await this.backend.send(e.cmd,t)}ue.emit("dashboard-config-changed",void 0),this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!0},bubbles:!0,composed:!0}))}catch{this.dispatchEvent(new CustomEvent("tab-toast",{detail:{success:!1},bubbles:!0,composed:!0}))}}_toggleCard(e){const t=new Set(this._enabledCards);t.has(e)?t.delete(e):t.add(e),this._enabledCards=[...t],this._scheduleSave()}_toggleHideHeader(){this._hideHeader=!this._hideHeader,this._scheduleSave()}_toggleHideSidebar(){this._hideSidebar=!this._hideSidebar,this._scheduleSave()}_toggleDynamicBg(){this._dynamicBackground=!this._dynamicBackground,this._scheduleSave()}_onDragStart(e){this._dragIdx=e}_onDragOver(e,t){t.preventDefault(),this._dropIdx=e}_onDragLeave(){this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_onDrop(e,t){if(t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e){const t=[...this._cardOrder],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._cardOrder=t,this._scheduleSave()}this._dragIdx=null,this._dropIdx=null}_navigateToCard(e){const t=Xt[e]??e;this.dispatchEvent(new CustomEvent("sub-select",{detail:t,bubbles:!0,composed:!0}))}render(){return this.subSection?this._renderSubSection(this.subSection):this._renderDashboard()}_renderDashboard(){const e=new Set(this._enabledCards),t=new Set(Kt.map(e=>e.id)),i=this._cardOrder.filter(e=>t.has(e));for(const r of Kt)i.includes(r.id)||i.push(r.id);let a=0;return F`
      <div class="section-label">${De("config.dashboard_title")}</div>
      <div class="section-desc">${De("config.dashboard_desc")}</div>

      <div class="room-grid pw-db-grid-mt">
        ${i.map((t,i)=>{const r=Kt.find(e=>e.id===t);if(!r)return B;const o=e.has(t);o&&a++;const s=o?a:0,n=this._dragIdx===i,c=this._dropIdx===i&&null!==this._dragIdx&&this._dragIdx!==i;return F`
            <div
              class="room-card dash-card ${o?"":"off"} ${n?"dragging":""} ${c?"drop-target":""}"
              draggable="true"
              @dragstart=${()=>this._onDragStart(i)}
              @dragover=${e=>this._onDragOver(i,e)}
              @dragleave=${()=>this._onDragLeave()}
              @drop=${e=>this._onDrop(i,e)}
              @dragend=${()=>this._onDragEnd()}
              @click=${()=>this._navigateToCard(t)}
            >
              ${o?F`<span class="dash-order">${s}</span>`:B}
              <button
                class="dash-toggle ${o?"on":""}"
                @click=${e=>{e.stopPropagation(),this._toggleCard(t)}}
                aria-label="${De("common.show")} ${De(r.nameKey)}"
              ></button>
              <div class="room-card-icon" style="--icon-color:${r.color};">
                <ha-icon .icon=${r.icon}></ha-icon>
              </div>
              <span class="room-name">${De(r.nameKey)}</span>
              <span class="dash-drag-hint"><ha-icon .icon=${"mdi:drag"}></ha-icon></span>
            </div>
          `})}
      </div>

      <div class="fold-sep visible pw-db-sep"></div>

      <div class="section-label">${De("config.dashboard_display")}</div>
      <div class="section-desc">${De("config.dashboard_display_desc")}</div>

      <div class="feature-list">
        <button class="feature-row" role="switch" aria-checked=${this._hideHeader?"true":"false"}
          @click=${()=>this._toggleHideHeader()}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:page-layout-header"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${De("config.dashboard_hide_header")}</div>
            <div class="feature-desc">${De("config.dashboard_hide_header_desc")}</div>
          </div>
          <span class="toggle ${this._hideHeader?"on":""}"></span>
        </button>

        <button class="feature-row" role="switch" aria-checked=${this._hideSidebar?"true":"false"}
          @click=${()=>this._toggleHideSidebar()}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:page-layout-sidebar-left"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${De("config.dashboard_hide_sidebar")}</div>
            <div class="feature-desc">${De("config.dashboard_hide_sidebar_desc")}</div>
          </div>
          <span class="toggle ${this._hideSidebar?"on":""}"></span>
        </button>

        <button class="feature-row" role="switch" aria-checked=${this._dynamicBackground?"true":"false"}
          @click=${()=>this._toggleDynamicBg()}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:weather-night"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${De("config.dashboard_dynamic_bg")}</div>
            <div class="feature-desc">${De("config.dashboard_dynamic_bg_desc")}</div>
          </div>
          <span class="toggle ${this._dynamicBackground?"on":""}"></span>
        </button>
      </div>
    `}_renderSubSection(e){switch(e){case"title":return F`<config-tab-title .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-title>`;case"spotify":return F`<config-tab-spotify .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-spotify>`;case"presence":return F`<config-tab-presence .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-presence>`;case"camera":return F`<config-tab-camera .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-camera>`;case"weather":return F`<config-tab-weather .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-weather>`;case"light":return F`<config-tab-light .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-light>`;case"cover":return F`<config-tab-cover .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-cover>`;case"climate":return F`<config-tab-climate .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-climate>`;case"fan":return F`<config-tab-fan .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-fan>`;case"media":return F`<config-tab-media .hass=${this.hass} .configData=${this.configData} .backend=${this.backend}></config-tab-media>`;default:return F`<div class="placeholder"><ha-icon .icon=${"mdi:hammer-wrench"}></ha-icon><span>${e}</span></div>`}}}Yt([he({attribute:!1})],Jt.prototype,"hass"),Yt([he({attribute:!1})],Jt.prototype,"backend"),Yt([he({attribute:!1})],Jt.prototype,"configData"),Yt([he({attribute:!1})],Jt.prototype,"rooms"),Yt([he()],Jt.prototype,"subSection"),Yt([me()],Jt.prototype,"_enabledCards"),Yt([me()],Jt.prototype,"_cardOrder"),Yt([me()],Jt.prototype,"_hideHeader"),Yt([me()],Jt.prototype,"_hideSidebar"),Yt([me()],Jt.prototype,"_dynamicBackground"),Yt([me()],Jt.prototype,"_dragIdx"),Yt([me()],Jt.prototype,"_dropIdx");try{customElements.define("config-dashboard-view",Jt)}catch{}var Zt=Object.defineProperty,Qt=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&Zt(t,i,o),o};const ei=[{id:"navbar",label:"Navbar",icon:"mdi:dock-bottom"},{id:"orphans",label:"Entités orphelines",icon:"mdi:puzzle-outline"},{id:"reconfig",label:"Reconfigurer",icon:"mdi:refresh"}];class ti extends ne{constructor(){super(...arguments),this.configData={},this.rooms=[],this._autoSort=!0}createRenderRoot(){return this}updated(e){if(super.updated(e),e.has("configData")&&this.configData){const e=this.configData;this._autoSort=!1!==e.auto_sort}}render(){return this.subSection?"reconfig"===this.subSection?(this.dispatchEvent(new CustomEvent("reconfig-wizard",{bubbles:!0,composed:!0})),F`<div class="empty-state">Relancement du wizard...</div>`):this._renderSubSection(this.subSection):F`
      <div class="room-grid">
        ${ei.map(e=>F`
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
    `}_renderSubSection(e){switch(e){case"navbar":return this._renderNavbarSettings();case"orphans":return F`<config-tab-unassigned
          .hass=${this.hass}
          .configData=${this.configData}
          .backend=${this.backend}
        ></config-tab-unassigned>`;default:return F`<div>Section inconnue</div>`}}_renderNavbarSettings(){return F`
      <div class="section-label">${De("config.navbar_settings")}</div>
      <div class="feature-list">
        <button class="feature-row" @click=${this._toggleAutoSort}>
          <div class="feature-icon"><ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon></div>
          <div class="feature-text">
            <div class="feature-name">${De("config.navbar_auto_sort")}</div>
            <div class="feature-desc">${De("config.navbar_auto_sort_desc")}</div>
          </div>
          <span class="toggle ${this._autoSort?"on":""}" role="switch" aria-checked=${this._autoSort?"true":"false"} aria-label=${De("config.navbar_auto_sort")}></span>
        </button>
      </div>
    `}async _toggleAutoSort(){if(this._autoSort=!this._autoSort,this.backend)try{await this.backend.send("set_navbar",{auto_sort:this._autoSort})}catch{}}}Qt([he({attribute:!1})],ti.prototype,"hass"),Qt([he({attribute:!1})],ti.prototype,"backend"),Qt([he({attribute:!1})],ti.prototype,"configData"),Qt([he({attribute:!1})],ti.prototype,"rooms"),Qt([he()],ti.prototype,"subSection"),Qt([me()],ti.prototype,"_autoSort");try{customElements.define("config-advanced-view",ti)}catch{}class ii extends ne{createRenderRoot(){return this}render(){return F`
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
    `}}try{customElements.define("wizard-step-welcome",ii)}catch{}var ai=Object.defineProperty;class ri extends ne{createRenderRoot(){return this}_getRooms(){return this.hass?.areas?Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name)):[]}render(){const e=this._getRooms();return F`
      <div class="wizard-step-icon">
        <ha-icon .icon=${"mdi:home-group"}></ha-icon>
      </div>
      <div class="section-label">Vos pièces (${e.length})</div>
      <div class="wizard-room-list">
        ${e.map(e=>F`
          <div class="wizard-room-chip">
            <ha-icon .icon=${e.icon??"mdi:home"}></ha-icon>
            <span>${e.name}</span>
          </div>
        `)}
        ${0===e.length?F`<div class="section-desc">Aucune pièce détectée dans Home Assistant.</div>`:""}
      </div>
      <div class="section-desc">
        Ces pièces ont été détectées depuis Home Assistant. Vous pourrez les personnaliser plus tard.
      </div>
    `}}((e,t,i)=>{for(var a,r=void 0,o=e.length-1;o>=0;o--)(a=e[o])&&(r=a(t,i,r)||r);r&&ai(t,i,r)})([he({attribute:!1})],ri.prototype,"hass");try{customElements.define("wizard-step-rooms",ri)}catch{}var oi=Object.defineProperty;class si extends ne{createRenderRoot(){return this}_countOrphans(){return this.hass?.entities?Object.values(this.hass.entities).filter(e=>!e.disabled_by&&!e.hidden_by&&null===Re(e,this.hass.devices)).length:0}render(){const e=this._countOrphans();return 0===e?F`
        <div class="wizard-step-icon success">
          <ha-icon .icon=${"mdi:check-circle"}></ha-icon>
        </div>
        <div class="section-label">Entités orphelines</div>
        <div class="banner">
          <ha-icon .icon=${"mdi:check-circle"}></ha-icon>
          <span>Toutes vos entités sont bien assignées à une pièce.</span>
        </div>
      `:F`
      <div class="wizard-step-icon">
        <ha-icon .icon=${"mdi:puzzle-outline"}></ha-icon>
      </div>
      <div class="section-label">Entités orphelines</div>
      <div class="wizard-orphan-count">${e}</div>
      <div class="section-desc">
        entité${e>1?"s":""} non assignée${e>1?"s":""} à une pièce.
        Vous pourrez les assigner dans Avancé › Entités orphelines.
      </div>
    `}}((e,t,i)=>{for(var a,r=void 0,o=e.length-1;o>=0;o--)(a=e[o])&&(r=a(t,i,r)||r);r&&oi(t,i,r)})([he({attribute:!1})],si.prototype,"hass");try{customElements.define("wizard-step-orphans",si)}catch{}class ni extends ne{createRenderRoot(){return this}render(){return F`
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
    `}}try{customElements.define("wizard-step-appearance",ni)}catch{}class ci extends ne{createRenderRoot(){return this}render(){return F`
      <div class="wizard-step-icon success">
        <ha-icon .icon=${"mdi:rocket-launch"}></ha-icon>
      </div>
      <div class="section-label">C'est prêt !</div>
      <div class="section-desc">
        Votre tableau de bord Glass Cards est configuré.
        Explorez vos pièces et personnalisez chaque carte.
      </div>
    `}}try{customElements.define("wizard-step-done",ci)}catch{}var di=Object.defineProperty,li=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&di(t,i,o),o};const pi=["welcome","rooms","orphans","appearance","done"];class hi extends ne{constructor(){super(...arguments),this._step=0}createRenderRoot(){return this}_next(){this._step<pi.length-1&&this._step++}_prev(){this._step>0&&this._step--}_skip(){this._next()}_finish(){this.backend&&this.backend.send("set_wizard_completed",{completed:!0}),this.dispatchEvent(new CustomEvent("wizard-done",{bubbles:!0,composed:!0}))}render(){const e=pi[this._step],t=this._step===pi.length-1,i=0===this._step;return F`
      <div class="wizard">
        <div class="wizard-progress">
          ${pi.map((e,t)=>F`
              <div
                class="wizard-dot ${t===this._step?"active":""} ${t<this._step?"done":""}"
              ></div>
            `)}
        </div>

        <div class="wizard-card">
        <div class="wizard-content">${this._renderStep(e)}</div>

        <div class="wizard-actions">
          ${i?F`<span></span>`:F`<button
                class="btn"
                @click=${()=>this._prev()}
                aria-label="Retour"
              >
                Retour
              </button>`}
          <div class="wizard-actions-right">
            ${t?"":F`<button
                  class="btn btn-ghost"
                  @click=${()=>this._skip()}
                  aria-label="Passer cette étape"
                >
                  Passer
                </button>`}
            ${t?F`<button
                  class="btn btn-accent"
                  @click=${()=>this._finish()}
                  aria-label="Commencer"
                >
                  Commencer
                </button>`:F`<button
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
    `}_renderStep(e){switch(e){case"welcome":return F`<wizard-step-welcome></wizard-step-welcome>`;case"rooms":return F`<wizard-step-rooms .hass=${this.hass}></wizard-step-rooms>`;case"orphans":return F`<wizard-step-orphans .hass=${this.hass}></wizard-step-orphans>`;case"appearance":return F`<wizard-step-appearance></wizard-step-appearance>`;case"done":return F`<wizard-step-done></wizard-step-done>`;default:return F``}}}li([he({attribute:!1})],hi.prototype,"hass"),li([he({attribute:!1})],hi.prototype,"backend"),li([me()],hi.prototype,"_step");try{customElements.define("config-wizard",hi)}catch{}async function mi(e){if(e.hass&&!e._loading){e._loading=!0;try{await async function(e){if(!e.hass)return;const t=Object.values(e.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let i={room_order:[],hidden_rooms:[],auto_sort:!0},a={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},r={enabled_cards:["weather"],card_order:["title","weather","climate","light","media","fan","cover","camera_carousel","spotify","presence"],hide_header:!1,hide_sidebar:!1},o={show_header:!0},s={title:"",sources:[],period_entity:"",period_options:[]},n={show_header:!0,dashboard_entities:[],dashboard_compact:!0,presets:[0,25,50,75,100],entity_presets:{}},c={show_header:!0,entity_id:"",sort_order:"recent_first",max_items_per_section:6,visible_speakers:[]},d={show_header:!0},l={extra_entities:{},show_header:!0},p={show_header:!0,person_entities:[],smartphone_sensors:{},notify_services:{},driving_sensors:{}},h={show_header:!0,display_mode:"list",dashboard_display_mode:"list",dashboard_entities:[]},m={show_header:!0,entity_order:[],auto_cycle:!1,cycle_interval:10};const u={};try{if(!e._backend)throw new Error("No backend");const t=await e._backend.send("get_config");i=t.navbar,Object.assign(u,t.rooms),t.weather&&(a=t.weather),t.light_card&&(o=t.light_card),t.title_card&&(s=t.title_card),t.cover_card&&(n=t.cover_card),t.fan_card&&(d=t.fan_card),t.spotify_card&&(c=t.spotify_card),t.media_card&&(l=t.media_card),t.presence_card&&(p=t.presence_card),t.climate_card&&(h=t.climate_card),t.camera_carousel&&(m=t.camera_carousel),t.dashboard&&(r=t.dashboard),void 0!==t.wizard_completed&&(e._wizardCompleted=t.wizard_completed)}catch{}e._navbarConfig=i,e._weatherConfig=a,e._lightConfig=o,e._titleConfig=s,e._coverConfig=n,e._fanConfig=d,e._spotifyConfig=c,e._mediaConfig=l,e._presenceConfig=p,e._climateConfig=h,e._cameraConfig=m,e._dashboardConfig={dashboard:r,title_card:s,light_card:o,weather:a,cover_card:n,fan_card:d,spotify_card:c,media_card:l,presence_card:p,climate_card:h,camera_carousel:m};const _=new Set(i.hidden_rooms),g=new Map;i.room_order.forEach((e,t)=>g.set(e,t));const v=e.hass;if(!v)return;const f=[],b=[];for(const y of t){const e=Me(y.area_id,v.entities,v.devices),t=u[y.area_id]?.icon,i=t||y.icon||"mdi:home";if(0===e.length){b.push({areaId:y.area_id,name:y.name,icon:i});continue}let a=0,r=null,o=null,s=null,n=null,c=!1;for(const d of e){const e=v.states[d.entity_id];if(!e)continue;const t=d.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&a++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||r||(r=`${e.state}°`,o=parseFloat(e.state)),"humidity"!==t||s||(s=`${e.state}%`,n=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(c=!0)}f.push({areaId:y.area_id,name:y.name,icon:i,entityCount:e.length,visible:!_.has(y.area_id),lightsOn:a,temperature:r,tempValue:o,humidity:s,humidityValue:n,mediaPlaying:c})}f.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=g.get(e.areaId),a=g.get(t.areaId);return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:e.name.localeCompare(t.name)}),e._rooms=f,e._emptyRooms=b,!e._selectedRoom&&f.length>0&&(e._selectedRoom=f[0].areaId)}(e),e._loaded=!0}catch{e._loaded=!1}finally{e._loading=!1}}}var ui=Object.defineProperty,_i=(e,t,i,a)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&ui(t,i,o),o};class gi extends ne{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=Ee(),this._nav=je,this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._toast=!1,this._saving=!1,this._navbarConfig={},this._popupConfig={},this._weatherConfig={},this._titleConfig={},this._lightConfig={},this._coverConfig={},this._fanConfig={},this._climateConfig={},this._presenceConfig={},this._mediaConfig={},this._spotifyConfig={},this._cameraConfig={},this._dashboardConfig={},this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._dragModeSrcIdx=null,this._loaded=!1,this._loading=!1,this._configReady=!1,this._wizardCompleted=!0,this._suppressAutoSave=!1,this._toastError=!1,this._onTabDirty=()=>{this._scheduleAutoSave()},this._onRoomsChanged=e=>{const t=e.detail;this._rooms=t.rooms},this._onRoomsReordered=e=>{const t=e.detail;this._rooms=t.rooms,this._saveNavbarOrder()},this._onRoomVisibilityToggle=e=>{const{areaId:t,visible:i}=e.detail;this._rooms=this._rooms.map(e=>e.areaId===t?{...e,visible:i}:e),this._saveNavbarOrder()},this._onTabToast=e=>{this._toastError=!e.detail.success,this._toast=!0,void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastTimeout=setTimeout(()=>{this._toast=!1},2500)}}get _tab(){const e=this._nav.subSection;if(e){return{dashboard:"dashboard",title:"title",spotify:"spotify",presence:"presence",camera:"camera_carousel",weather:"weather",popup:"popup",orphans:"unassigned",light:"light",cover:"cover",climate:"climate",media:"media",fan:"fan"}[e]??"dashboard"}return"dashboard"}get _activeTabEl(){const e=`config-tab-${this._tab.replace("_","-")}`;return this.shadowRoot?.querySelector(e)??this.shadowRoot?.querySelector(`config-tab-${this._tab}`)??null}static{this.styles=[fe,be,ye,we,...de]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,this.addEventListener("tab-dirty",this._onTabDirty),this.addEventListener("tab-toast",this._onTabToast),this.addEventListener("rooms-changed",this._onRoomsChanged),this.addEventListener("rooms-reordered",this._onRoomsReordered),this.addEventListener("room-visibility-toggle",this._onRoomVisibilityToggle),this._popstateHandler=e=>{const t=(i=e,i.state?.glassNav??null);var i;t&&(this._nav=t)},window.addEventListener("popstate",this._popstateHandler)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,this.removeEventListener("tab-dirty",this._onTabDirty),this.removeEventListener("tab-toast",this._onTabToast),this.removeEventListener("rooms-changed",this._onRoomsChanged),this.removeEventListener("rooms-reordered",this._onRoomsReordered),this.removeEventListener("room-visibility-toggle",this._onRoomVisibilityToggle),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=void 0),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),void 0!==this._autoSaveTimer&&(clearTimeout(this._autoSaveTimer),this._autoSaveTimer=void 0),this._backend=void 0}updated(e){if(super.updated(e),e.has("hass")&&(this.hass?.language&&Se(this.hass.language)&&(this._lang=Ee()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1,this._configReady=!1),!this.hass||this._loaded||this._loading||(this._backend=new Le(this.hass),this._loadConfig())),this._loaded&&!this._loading&&!this._saving)return this._configReady?void(this._suppressAutoSave&&(this._suppressAutoSave=!1)):(this._configReady=!0,void(this._wizardCompleted||(this._nav={section:"wizard"})))}_beginSuppressAutoSave(){this._suppressAutoSave=!0}async _saveNavbarOrder(){if(this._backend)try{await this._backend.send("set_navbar",{room_order:this._rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:this._rooms.filter(e=>!e.visible).map(e=>e.areaId)}),this._showToast()}catch{this._showToast(!0)}}_scheduleAutoSave(){void 0!==this._autoSaveTimer&&clearTimeout(this._autoSaveTimer),this._autoSaveTimer=setTimeout(()=>{this._autoSaveTimer=void 0,this._saving||this._save()},800)}_navigateTo(e){var t,i,a;(t=this._nav,i=e,t.section!==i.section||t.subSection!==i.subSection||t.roomId!==i.roomId)&&(a=this._nav,window.history.pushState({glassNav:a},""),this._nav=e)}_goBack(){window.location.href="/"}async _loadConfig(){return mi(this)}async _loadRoomLights(){const e=this.shadowRoot?.querySelector("config-tab-light");e&&e.reload()}async _loadCoverConfig(){const e=this.shadowRoot?.querySelector("config-tab-cover");e&&e.reload()}async _loadFanConfig(){const e=this.shadowRoot?.querySelector("config-tab-fan");e&&e.reload()}async _loadClimateConfig(){const e=this.shadowRoot?.querySelector("config-tab-climate");e&&e.reload()}async _loadMediaConfig(){const e=this.shadowRoot?.querySelector("config-tab-media");e&&e.reload()}async _loadDashboardConfig(){}async _loadPresenceConfig(){const e=this.shadowRoot?.querySelector("config-tab-presence");e&&e.reload()}async _loadCameraCarouselConfig(){const e=this.shadowRoot?.querySelector("config-tab-camera");e&&e.reload()}async _loadWeatherConfig(){return async function(e){const t=e._activeTabEl;t&&t.reload()}(this)}async _loadSpotifyConfig(){const e=this.shadowRoot?.querySelector("config-tab-spotify");e&&e.reload()}async _loadTitleConfig(){const e=this.shadowRoot?.querySelector("config-tab-title");e&&e.reload()}_save(){!function(e){if("popup"===e._tab);else if("light"===e._tab){const t=e.shadowRoot?.querySelector("config-tab-light");t&&t.save()}else if("weather"===e._tab){const t=e._activeTabEl;t&&t.save()}else if("title"===e._tab)!async function(e){const t=e.shadowRoot?.querySelector("config-tab-title");t&&t.save()}(e);else if("cover"===e._tab){const t=e.shadowRoot?.querySelector("config-tab-cover");t&&t.save()}else if("climate"===e._tab)!async function(e){const t=e.shadowRoot?.querySelector("config-tab-climate");t&&await t.save()}(e);else if("fan"===e._tab)!async function(e){const t=e._activeTabEl;t&&t.save()}(e);else if("spotify"===e._tab){const t=e.shadowRoot?.querySelector("config-tab-spotify");t&&t.save()}else if("media"===e._tab)!async function(e){const t=e.shadowRoot?.querySelector("config-tab-media");t&&t.save()}(e);else if("presence"===e._tab){const t=e._activeTabEl;t&&t.save()}else"camera_carousel"===e._tab?async function(e){const t=e._activeTabEl;t&&t.save()}(e):"unassigned"===e._tab||async function(){}()}(this)}async _reset(){return async function(e){e._loading||(e._loaded=!1,await mi(e))}(this)}async _saveClimate(){const e=this.shadowRoot?.querySelector("config-tab-climate");e&&e.save()}async _saveDashboard(){}async _checkSpotifyStatus(){}_onDragStart(e,t,i){!function(e,t,i,a){e._dragIdx=t,e._dragContext=i,void 0!==a&&(e._dragModeSrcIdx=a)}(this,e,t,i)}_onDragOver(e,t,i){!function(e,t,i,a){i.preventDefault(),null!==e._dragIdx&&e._dragIdx!==t&&("title_modes"===e._dragContext&&void 0!==a&&a!==e._dragModeSrcIdx||(e._dropIdx=t))}(this,e,t,i)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){!function(e,t,i){if(i.preventDefault(),null===e._dragIdx||e._dragIdx===t)return e._dragIdx=null,void(e._dropIdx=null);e._dragIdx=null,e._dropIdx=null}(this,e,t)}_onDragEnd(){var e;(e=this)._dragIdx=null,e._dropIdx=null,e._dragModeSrcIdx=null}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_renderSidebar(){const e=[{id:"dashboard",icon:"mdi:view-dashboard",label:De("config.nav_dashboard")},{id:"rooms",icon:"mdi:home-group",label:De("config.nav_rooms")},{id:"advanced",icon:"mdi:tune-variant",label:De("config.nav_advanced")}];return F`
      <nav class="panel-sidebar">
        ${e.map(e=>F`
          <button class="nav-btn ${this._nav.section===e.id?"active":""}"
            @click=${()=>this._navigateTo({section:e.id})}
            aria-label=${e.label}>
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${e.label}</span>
          </button>
        `)}
      </nav>
    `}_renderBreadcrumb(){if("rooms"===this._nav.section&&this._nav.roomId){const e=this.hass?.areas?.[this._nav.roomId];return F`
        <div class="breadcrumb">
          <button @click=${()=>this._navigateTo({section:"rooms"})}>${De("config.nav_rooms")}</button>
          <span class="sep">›</span>
          <span class="current">${e?.name||this._nav.roomId}</span>
        </div>
      `}if(this._nav.subSection){const e="dashboard"===this._nav.section?De("config.nav_dashboard"):De("config.nav_advanced");return F`
        <div class="breadcrumb">
          <button @click=${()=>this._navigateTo({section:this._nav.section})}>${e}</button>
          <span class="sep">›</span>
          <span class="current">${this._nav.subSection}</span>
        </div>
      `}return B}_renderContent(){switch(this._nav.section){case"wizard":return F`<config-wizard
          .hass=${this.hass}
          .backend=${this._backend}
          @wizard-done=${()=>{this._wizardCompleted=!0,this._navigateTo({section:"rooms"})}}
        ></config-wizard>`;case"rooms":return this._nav.roomId?F`<config-room-detail
            .hass=${this.hass}
            .areaId=${this._nav.roomId}
            .configData=${this._navbarConfig}
            .backend=${this._backend}
            .rooms=${this._rooms}
          ></config-room-detail>`:F`<config-room-list
          .hass=${this.hass}
          .rooms=${this._rooms}
          @room-select=${e=>this._navigateTo({section:"rooms",roomId:e.detail})}
        ></config-room-list>`;case"dashboard":return F`<config-dashboard-view
          .hass=${this.hass}
          .backend=${this._backend}
          .configData=${this._dashboardConfig}
          .rooms=${this._rooms}
          .subSection=${this._nav.subSection}
          @sub-select=${e=>this._navigateTo({section:"dashboard",subSection:e.detail})}
        ></config-dashboard-view>`;case"advanced":return F`<config-advanced-view
          .hass=${this.hass}
          .backend=${this._backend}
          .configData=${this._navbarConfig}
          .rooms=${this._rooms}
          .subSection=${this._nav.subSection}
          @sub-select=${e=>this._navigateTo({section:"advanced",subSection:e.detail})}
          @reconfig-wizard=${()=>this._navigateTo({section:"wizard"})}
        ></config-advanced-view>`;default:return B}}render(){return this._lang,this.hass?F`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="${De("common.back")}"><ha-icon .icon=${"mdi:chevron-left"}></ha-icon></button>
          <span class="page-title">${De("config.title")}</span>
          <span class="page-subtitle">${De("config.brand")}</span>
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
        ${this._toastError?De("common.error_save"):De("common.config_saved")}
      </div>
    `:B}}_i([he({attribute:!1})],gi.prototype,"hass"),_i([he({type:Boolean})],gi.prototype,"narrow"),_i([me()],gi.prototype,"_lang"),_i([me()],gi.prototype,"_nav"),_i([me()],gi.prototype,"_rooms"),_i([me()],gi.prototype,"_emptyRooms"),_i([me()],gi.prototype,"_selectedRoom"),_i([me()],gi.prototype,"_toast"),_i([me()],gi.prototype,"_saving"),_i([me()],gi.prototype,"_dragIdx"),_i([me()],gi.prototype,"_dropIdx"),_i([me()],gi.prototype,"_dragContext"),_i([me()],gi.prototype,"_dragModeSrcIdx"),_i([me()],gi.prototype,"_toastError");try{customElements.define("glass-config-panel",gi)}catch{}}();
