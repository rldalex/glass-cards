!function(){"use strict";const t=new class{constructor(){this.listeners=new Map}on(t,e){let i=this.listeners.get(t);return i||(i=new Set,this.listeners.set(t,i)),i.add(e),()=>this.off(t,e)}off(t,e){this.listeners.get(t)?.delete(e)}emit(t,e){const i=this.listeners.get(t);if(i)for(const s of[...i])s(e)}};let e=!1,i=!1;function s(){t.emit("location-changed",void 0)}const a=globalThis,r=a.ShadowRoot&&(void 0===a.ShadyCSS||a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let l=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const c=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new l(i,t,o)},d=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new l("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:h,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:_,getOwnPropertySymbols:g,getPrototypeOf:f}=Object,b=globalThis,v=b.trustedTypes,m=v?v.emptyScript:"",y=b.reactiveElementPolyfillSupport,w=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},k=(t,e)=>!h(t,e),$={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&p(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[..._(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(r)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),s=a.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const r=this.constructor;if(!1===s&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??k)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[w("elementProperties")]=new Map,C[w("finalized")]=new Map,y?.({ReactiveElement:C}),(b.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,T=t=>t,E=S.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+L,z=`<${I}>`,O=document,M=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,j="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,F=/>/g,U=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,q=/"/g,B=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),K=W(1),G=W(2),Y=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Q=new WeakMap,J=O.createTreeWalker(O,129);function Z(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}class tt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const o=t.length-1,n=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",o=H;for(let n=0;n<i;n++){const e=t[n];let i,l,c=-1,d=0;for(;d<e.length&&(o.lastIndex=d,l=o.exec(e),null!==l);)d=o.lastIndex,o===H?"!--"===l[1]?o=N:void 0!==l[1]?o=F:void 0!==l[2]?(B.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=U):void 0!==l[3]&&(o=U):o===U?">"===l[0]?(o=a??H,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,i=l[1],o=void 0===l[3]?U:'"'===l[3]?q:V):o===q||o===V?o=U:o===N||o===F?o=H:(o=U,a=void 0);const h=o===U&&t[n+1].startsWith("/>")?" ":"";r+=o===H?e+z:c>=0?(s.push(i),e.slice(0,c)+P+e.slice(c)+L+h):e+L+(-2===c?n:h)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=tt.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(P)){const e=c[r++],i=s.getAttribute(t).split(L),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?rt:"?"===o[1]?ot:"@"===o[1]?nt:at}),s.removeAttribute(t)}else t.startsWith(L)&&(n.push({type:6,index:a}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(L),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),J.nextNode(),n.push({type:2,index:++a});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===I)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(L,t+1));)n.push({type:7,index:a}),t+=L.length-1}a++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function et(t,e,i=t,s){if(e===Y)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=R(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=et(t,a._$AS(t,e.values),a,s)),e}class it{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);J.currentNode=s;let a=J.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new st(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new lt(a,this,t)),this._$AV.push(e),n=i[++o]}r!==n?.index&&(a=J.nextNode(),r++)}return J.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class st{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=et(this,t,e),R(t)?t===X||null==t||""===t?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=tt.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new it(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new tt(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new st(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=T(t).nextSibling;T(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class at{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=X}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=et(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==Y,r&&(this._$AH=t);else{const s=t;let o,n;for(t=a[0],o=0;o<a.length-1;o++)n=et(this,s[i+o],e,o),n===Y&&(n=this._$AH[o]),r||=!R(n)||n!==this._$AH[o],n===X?t=X:t!==X&&(t+=(n??"")+a[o+1]),this._$AH[o]=n}r&&!s&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class ot extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class nt extends at{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=et(this,t,e,0)??X)===Y)return;const i=this._$AH,s=t===X&&i!==X||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==X&&(i===X||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class lt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const ct=S.litHtmlPolyfillSupport;ct?.(tt,st),(S.litHtmlVersions??=[]).push("3.3.2");const dt=globalThis;class ht extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new st(e.insertBefore(M(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}ht._$litElement$=!0,ht.finalized=!0,dt.litElementHydrateSupport?.({LitElement:ht});const pt=dt.litElementPolyfillSupport;pt?.({LitElement:ht}),(dt.litElementVersions??=[]).push("4.2.2");const ut=c`
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
`,_t=c`
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
`,gt=c`
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
`;function ft(t,e=18,i="8s"){return t.length<=e?t:K`<span class="marquee" style="--marquee-duration:${i}"><span class="marquee-inner">${t}\u00A0\u00A0\u00A0${t}\u00A0\u00A0\u00A0</span></span>`}const bt=c`
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
`,vt={morning:{body:"#0f1923",blobTop:"#1a6b8a",blobBottom:"#2d8a6e"},day:{body:"#111827",blobTop:"#3b6fa0",blobBottom:"#4a90a0"},evening:{body:"#1a1118",blobTop:"#8a4a2d",blobBottom:"#6b3a5a"},night:{body:"#0a0e1a",blobTop:"#1a2040",blobBottom:"#2a1a3a"}},mt="glass-cards-ambient-bg",yt=`\n  #${mt} {\n    position: fixed;\n    inset: 0;\n    z-index: 0;\n    pointer-events: none;\n    overflow: hidden;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${mt}::before,\n  #${mt}::after {\n    content: '';\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(120px);\n    opacity: 0.4;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${mt}::before {\n    width: 600px;\n    height: 600px;\n    top: -200px;\n    right: -100px;\n    background: var(--ambient-blob-top, #3b6fa0);\n  }\n  #${mt}::after {\n    width: 500px;\n    height: 500px;\n    bottom: -150px;\n    left: -100px;\n    background: var(--ambient-blob-bottom, #4a90a0);\n  }\n`;class wt{constructor(){this.period="day",this.ambientEl=null,this.styleEl=null,this.cleanup=t.on("ambient-update",t=>{this.period=t.period,this.applyAmbient()}),this._injectAmbientBg(),this.applyAmbient()}get currentPeriod(){return this.period}applyAmbient(t){t&&(this.period=t);const e=vt[this.period],i=document.documentElement;i.style.setProperty("--ambient-body",e.body),i.style.setProperty("--ambient-blob-top",e.blobTop),i.style.setProperty("--ambient-blob-bottom",e.blobBottom),this.ambientEl&&(this.ambientEl.style.background=e.body)}_injectAmbientBg(){document.documentElement.style.background="transparent",document.getElementById(mt)?this.ambientEl=document.getElementById(mt):(this.styleEl=document.createElement("style"),this.styleEl.textContent=yt,document.head.appendChild(this.styleEl),this.ambientEl=document.createElement("div"),this.ambientEl.id=mt,document.body.prepend(this.ambientEl))}destroy(){this.cleanup?.(),this.ambientEl?.remove(),this.ambientEl=null,this.styleEl?.remove(),this.styleEl=null,document.documentElement.style.removeProperty("background"),xt===this&&(xt=null)}}let xt=null;const kt={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:k},$t=(t=kt,e,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function Ct(t){return(e,i)=>"object"==typeof i?$t(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function St(t){return Ct({...t,state:!0,attribute:!1})}const Tt={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store",dc_window:"Fenêtre",dc_damper:"Clapet"},title_card:{mode_label:"Mode :",scene_label:"Scène :",mode_none:"Aucun",cycle_aria:"Changer de mode"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:{title:"Configuration",brand:"GLASS CARDS",tab_navbar:"Barre de nav",tab_popup:"Popup Pièce",tab_light:"Carte Lumières",preview:"Aperçu",navbar_behavior:"Comportement",navbar_auto_sort:"Tri automatique",navbar_auto_sort_desc:"Les pièces actives remontent en premier",navbar_rooms_banner:"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.",navbar_visible_rooms:"Pièces visibles",navbar_empty_rooms:"Pièces vides",navbar_empty_rooms_desc:"Ces pièces n'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu'elles apparaissent dans la navbar.",navbar_indicators:"Indicateurs",navbar_indicators_desc:"Activez ou désactivez les indicateurs visuels sur la navbar.",navbar_ind_lights:"Lumières allumées",navbar_ind_lights_desc:"Glow doré sur l'icône",navbar_ind_temp:"Température",navbar_ind_temp_desc:"Badge chaud / froid",navbar_ind_humidity:"Humidité",navbar_ind_humidity_desc:"Barre bleue en bas",navbar_ind_media:"Média en lecture",navbar_ind_media_desc:"Bounce de l'icône",navbar_thresholds:"Seuils",navbar_thresholds_desc:"Définissez les seuils pour les alertes de température et d'humidité.",navbar_temp_high:"Température haute",navbar_temp_low:"Température basse",navbar_humidity_threshold:"Seuil humidité",navbar_choose_icon:"Choisir icône",navbar_change_icon_aria:"Changer l'icône de {name}",navbar_icon_label:"Icône — {name}",popup_room:"Pièce",popup_room_desc:"Sélectionnez une pièce pour configurer l'ordre et la visibilité de ses cartes internes.",popup_internal_cards:"Cartes internes",popup_internal_cards_desc:"Ordonnez les cartes affichées dans le popup de cette pièce.",popup_scenes:"Scènes",popup_scenes_desc:"Réordonnez et masquez les scènes affichées en haut du popup.",popup_select_room:"Sélectionnez une pièce",light_room:"Pièce",light_room_desc:"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d'affichage.",light_list_title:"Lumières",light_list_banner:"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.",light_no_lights:"Aucune lumière dans cette pièce.",light_no_visible:"Aucune lumière visible",light_select_room:"Sélectionnez une pièce",light_change_layout_aria:"Changer le layout",light_layout_compact:"COMPACT",light_layout_full:"PLEIN",light_schedule_hint:"Appuyez sur l'icône calendrier de chaque lumière pour définir des périodes de visibilité.",light_schedule_aria:"Gérer la planification de visibilité de {name}",light_schedule_title:"Planification de visibilité",light_schedule_start:"Début",light_schedule_end:"Fin",light_schedule_recurring:"Annuel",light_schedule_add:"Ajouter une période",light_schedule_delete_aria:"Supprimer la période",light_schedule_no_date:"Choisir une date…",light_schedule_confirm:"Confirmer",light_schedule_prev_month_aria:"Mois précédent",light_schedule_next_month_aria:"Mois suivant",light_show_header:"Afficher l'en-tête",light_show_header_desc:"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte",light_dashboard_vs_room:"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.",domain_light:"Lumières",domain_light_desc:"Contrôle des lumières",domain_media_player:"Média",domain_media_player_desc:"Lecteurs multimédias",domain_climate:"Climat",domain_climate_desc:"Thermostats et climatisation",domain_fan:"Ventilateur",domain_fan_desc:"Ventilation",domain_cover:"Volets",domain_cover_desc:"Stores et volets roulants",domain_vacuum:"Aspirateur",domain_vacuum_desc:"Robots aspirateurs",tab_weather:"Carte Météo",weather_entity:"Entité météo",weather_entity_desc:"Sélectionnez l'entité météo à afficher sur la carte.",weather_metrics:"Métriques visibles",weather_metrics_desc:"Activez ou désactivez les métriques affichées sur la carte.",weather_forecasts:"Onglets prévisions",weather_forecasts_desc:"Activez ou désactivez les onglets de prévisions.",weather_metric_humidity:"Humidité",weather_metric_wind:"Vent",weather_metric_pressure:"Pression",weather_metric_uv:"UV",weather_metric_visibility:"Visibilité",weather_metric_sunrise:"Lever du soleil",weather_metric_sunset:"Coucher du soleil",weather_daily:"Prévisions 7 jours",weather_hourly:"Prévisions horaires",weather_select_entity:"Sélectionnez une entité météo",weather_show_header:"Afficher l'en-tête",weather_show_header_desc:"Titre et localisation au-dessus de la carte",tab_title:"Carte Titre",title_title:"Texte du titre",title_title_desc:"Texte principal affiché sur la carte.",title_title_placeholder:"Ma Maison",title_mode_entity:"Entité mode",title_mode_entity_desc:"Sélectionnez un input_select, input_boolean ou une scène pour les modes.",title_select_entity:"Sélectionnez une entité",title_modes:"Configuration des modes",title_modes_desc:"Personnalisez le libellé, l'icône et la couleur de chaque mode.",title_mode_label:"Libellé",title_mode_icon:"Icône",title_mode_color:"Couleur",title_color_picker_title:"Choisir une couleur",title_color_picker_aria:"Ouvrir la roue chromatique",title_no_modes:"Sélectionnez d'abord une entité mode.",title_no_icons_found:"Aucune icône trouvée",title_no_icon:"Aucune",dashboard_card_title:"Carte Titre",dashboard_card_title_desc:"Texte titre avec sélecteur de mode optionnel",tab_dashboard:"Tableau de bord",dashboard_title:"Cartes du tableau de bord",dashboard_desc:"Activez ou désactivez les cartes affichées sur le tableau de bord Home Assistant.",dashboard_card_weather:"Carte Météo",dashboard_card_weather_desc:"Affiche la météo actuelle, prévisions et animations",dashboard_card_light:"Carte Lumières",dashboard_card_light_desc:"Affiche les lumières allumées avec contrôle rapide",dashboard_light_auto:"Les lumières allumées s'affichent automatiquement sur le tableau de bord.",dashboard_card_cover:"Carte Volets",dashboard_card_cover_desc:"Affiche les volets sélectionnés avec contrôle de position",dashboard_card_spotify:"Carte Spotify",dashboard_card_spotify_desc:"Bibliothèque musicale, recherche et lecture Spotify",tab_cover:"Carte Volets",cover_show_header:"Afficher l'en-tête",cover_show_header_desc:"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte",cover_dashboard_entities:"Volets du tableau de bord",cover_dashboard_entities_desc:"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.",cover_dashboard_no_entities:"Aucun volet sélectionné pour le tableau de bord.",cover_room:"Pièce",cover_room_desc:"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.",cover_list_title:"Volets",cover_list_banner:"Glissez pour réordonner. Désactivez ceux à masquer.",cover_no_covers:"Aucun volet dans cette pièce.",cover_select_room:"Sélectionnez une pièce",cover_presets:"Positions favorites",cover_presets_desc:"Configurez les boutons de position rapide affichés sous chaque volet.",cover_preset_add:"Ajouter",cover_preset_placeholder:"0–100",tab_spotify:"Carte Spotify",spotify_show_header:"Afficher l'en-tête",spotify_show_header_desc:"Titre et contrôles au-dessus de la carte",spotify_entity:"Entité lecteur Spotify",spotify_entity_desc:"Sélectionnez l'entité media_player Spotify à utiliser pour la carte.",spotify_sort_order:"Ordre de tri",spotify_sort_order_desc:"Choisissez l'ordre d'affichage des playlists et titres sauvegardés.",spotify_sort_recent:"Plus récent en premier",spotify_sort_oldest:"Plus ancien en premier",spotify_select_entity:"Sélectionnez un lecteur Spotify",spotify_max_items:"Éléments par section",spotify_max_items_desc:"Nombre maximum d'éléments affichés par section (playlists, titres récents, etc.).",spotify_not_configured:"Intégration Spotify non configurée",spotify_setup_guide:"Pour utiliser la carte Spotify, vous devez d'abord configurer l'intégration Spotify officielle dans Home Assistant.",spotify_setup_step1:"Allez dans Paramètres → Appareils et services",spotify_setup_step2:"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »",spotify_setup_step3:"Connectez-vous avec votre compte Spotify et autorisez l'accès",spotify_setup_step4:"Une entité media_player.spotify_* apparaîtra automatiquement",spotify_setup_note:"Un compte Spotify Premium est requis pour les contrôles de lecture.",spotify_checking:"Vérification de la connexion Spotify…",spotify_open_settings:"Ouvrir les paramètres"}},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},title_card:{mode_label:"Mode:",scene_label:"Scene:",mode_none:"None",cycle_aria:"Change mode"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:{title:"Configuration",brand:"GLASS CARDS",tab_navbar:"Navbar",tab_popup:"Room Popup",tab_light:"Light Card",preview:"Preview",navbar_behavior:"Behavior",navbar_auto_sort:"Auto sort",navbar_auto_sort_desc:"Active rooms move to the top",navbar_rooms_banner:"Drag to reorder rooms. Toggle to hide.",navbar_visible_rooms:"Visible rooms",navbar_empty_rooms:"Empty rooms",navbar_empty_rooms_desc:"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.",navbar_indicators:"Indicators",navbar_indicators_desc:"Enable or disable visual indicators on the navbar.",navbar_ind_lights:"Lights on",navbar_ind_lights_desc:"Golden glow on icon",navbar_ind_temp:"Temperature",navbar_ind_temp_desc:"Hot / cold badge",navbar_ind_humidity:"Humidity",navbar_ind_humidity_desc:"Blue bar at bottom",navbar_ind_media:"Media playing",navbar_ind_media_desc:"Icon bounce",navbar_thresholds:"Thresholds",navbar_thresholds_desc:"Set thresholds for temperature and humidity alerts.",navbar_temp_high:"High temperature",navbar_temp_low:"Low temperature",navbar_humidity_threshold:"Humidity threshold",navbar_choose_icon:"Choose icon",navbar_change_icon_aria:"Change icon for {name}",navbar_icon_label:"Icon — {name}",popup_room:"Room",popup_room_desc:"Select a room to configure the order and visibility of its internal cards.",popup_internal_cards:"Internal cards",popup_internal_cards_desc:"Order the cards displayed in this room's popup.",popup_scenes:"Scenes",popup_scenes_desc:"Reorder and hide scenes shown at the top of the popup.",popup_select_room:"Select a room",light_room:"Room",light_room_desc:"Select a room to configure its lights: order, visibility and display mode.",light_list_title:"Lights",light_list_banner:"Drag to reorder. The layout button toggles between full width and compact.",light_no_lights:"No lights in this room.",light_no_visible:"No visible lights",light_select_room:"Select a room",light_change_layout_aria:"Change layout",light_layout_compact:"COMPACT",light_layout_full:"FULL",light_schedule_hint:"Tap the calendar icon on each light to set visibility periods.",light_schedule_aria:"Manage visibility schedule for {name}",light_schedule_title:"Visibility schedule",light_schedule_start:"Start",light_schedule_end:"End",light_schedule_recurring:"Annually",light_schedule_add:"Add period",light_schedule_delete_aria:"Delete period",light_schedule_no_date:"Select date…",light_schedule_confirm:"Confirm",light_schedule_prev_month_aria:"Previous month",light_schedule_next_month_aria:"Next month",light_show_header:"Show header",light_show_header_desc:"Title, counter and toggle all button above the card",light_dashboard_vs_room:"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.",domain_light:"Lights",domain_light_desc:"Light control",domain_media_player:"Media",domain_media_player_desc:"Media players",domain_climate:"Climate",domain_climate_desc:"Thermostats and air conditioning",domain_fan:"Fan",domain_fan_desc:"Ventilation",domain_cover:"Covers",domain_cover_desc:"Blinds and shutters",domain_vacuum:"Vacuum",domain_vacuum_desc:"Robot vacuums",tab_weather:"Weather Card",weather_entity:"Weather entity",weather_entity_desc:"Select the weather entity to display on the card.",weather_metrics:"Visible metrics",weather_metrics_desc:"Enable or disable metrics shown on the card.",weather_forecasts:"Forecast tabs",weather_forecasts_desc:"Enable or disable forecast tabs.",weather_metric_humidity:"Humidity",weather_metric_wind:"Wind",weather_metric_pressure:"Pressure",weather_metric_uv:"UV",weather_metric_visibility:"Visibility",weather_metric_sunrise:"Sunrise",weather_metric_sunset:"Sunset",weather_daily:"7-day forecast",weather_hourly:"Hourly forecast",weather_select_entity:"Select a weather entity",weather_show_header:"Show header",weather_show_header_desc:"Title and location above the card",tab_title:"Title Card",title_title:"Title text",title_title_desc:"Main text displayed on the card.",title_title_placeholder:"My Home",title_mode_entity:"Mode entity",title_mode_entity_desc:"Select an input_select, input_boolean, or scene for modes.",title_select_entity:"Select an entity",title_modes:"Mode configuration",title_modes_desc:"Customize the label, icon and color for each mode option.",title_mode_label:"Label",title_mode_icon:"Icon",title_mode_color:"Color",title_color_picker_title:"Choose a color",title_color_picker_aria:"Open color wheel",title_no_modes:"Select a mode entity first.",title_no_icons_found:"No icons found",title_no_icon:"None",dashboard_card_title:"Title Card",dashboard_card_title_desc:"Title text with optional mode selector",tab_dashboard:"Dashboard",dashboard_title:"Dashboard cards",dashboard_desc:"Enable or disable the cards displayed on the Home Assistant dashboard.",dashboard_card_weather:"Weather Card",dashboard_card_weather_desc:"Current weather, forecasts and animations",dashboard_card_light:"Light Card",dashboard_card_light_desc:"Shows active lights with quick controls",dashboard_light_auto:"Active lights are automatically displayed on the dashboard.",dashboard_card_cover:"Cover Card",dashboard_card_cover_desc:"Shows selected covers with position controls",dashboard_card_spotify:"Spotify Card",dashboard_card_spotify_desc:"Music library, search and Spotify playback",tab_cover:"Cover Card",cover_show_header:"Show header",cover_show_header_desc:"Title, counter and open/close all buttons above the card",cover_dashboard_entities:"Dashboard covers",cover_dashboard_entities_desc:"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.",cover_dashboard_no_entities:"No cover entities selected for the dashboard.",cover_room:"Room",cover_room_desc:"Select a room to configure its covers: order and visibility.",cover_list_title:"Covers",cover_list_banner:"Drag to reorder. Toggle to hide.",cover_no_covers:"No covers in this room.",cover_select_room:"Select a room",cover_presets:"Favorite positions",cover_presets_desc:"Configure the quick position buttons displayed under each cover.",cover_preset_add:"Add",cover_preset_placeholder:"0–100",tab_spotify:"Spotify Card",spotify_show_header:"Show header",spotify_show_header_desc:"Title and controls above the card",spotify_entity:"Spotify player entity",spotify_entity_desc:"Select the Spotify media_player entity to use for the card.",spotify_sort_order:"Sort order",spotify_sort_order_desc:"Choose the display order for playlists and saved tracks.",spotify_sort_recent:"Most recent first",spotify_sort_oldest:"Oldest first",spotify_select_entity:"Select a Spotify player",spotify_max_items:"Items per section",spotify_max_items_desc:"Maximum number of items displayed per section (playlists, recent tracks, etc.).",spotify_not_configured:"Spotify integration not configured",spotify_setup_guide:"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.",spotify_setup_step1:"Go to Settings → Devices & services",spotify_setup_step2:'Click "Add integration" and search for "Spotify"',spotify_setup_step3:"Sign in with your Spotify account and authorize access",spotify_setup_step4:"A media_player.spotify_* entity will appear automatically",spotify_setup_note:"A Spotify Premium account is required for playback controls.",spotify_checking:"Checking Spotify connection…",spotify_open_settings:"Open settings"}}},Et="fr";let At=Et;function Pt(t){const e=t.slice(0,2).toLowerCase(),i=e in Tt?e:Et;return i!==At&&(At=i,!0)}function Lt(){return At}function It(t,e){const i=t.indexOf("."),s=-1===i?t:t.slice(0,i),a=-1===i?"":t.slice(i+1),r=Tt[At]??Tt[Et],o=Tt[Et],n=r?.[s]?.[a]??o?.[s]?.[a];let l="string"==typeof n?n:t;if(e)for(const[c,d]of Object.entries(e))l=l.replaceAll(`{${c}}`,String(d));return l}var zt=Object.defineProperty,Ot=(t,e,i,s)=>{for(var a,r=void 0,o=t.length-1;o>=0;o--)(a=t[o])&&(r=a(e,i,r)||r);return r&&zt(e,i,r),r};class Mt extends ht{constructor(){super(...arguments),this._lang=Lt(),this._busCleanups=[]}setConfig(t){this._config=t}shouldUpdate(t){if(!t.has("hass"))return!0;const e=t.get("hass");if(!e)return!0;if(e.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(t=>e.states[t]!==this.hass?.states[t])}updated(t){super.updated(t),t.has("hass")&&this.hass?.language&&Pt(this.hass.language)&&(this._lang=Lt())}getTrackedEntityIds(){const t=this._config?.entity;return t?[t]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(t=>t()),this._busCleanups=[]}_listen(e,i){this._busCleanups.push(t.on(e,i))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(t=>t()),this._busCleanups=[]}}function Rt(t,e,i){return Object.values(e).filter(e=>!e.disabled_by&&!e.hidden_by&&function(t,e){if(t.area_id)return t.area_id;if(t.device_id&&e){const i=e[t.device_id];if(i?.area_id)return i.area_id}return null}(e,i)===t)}function Dt(t,e){if(!e)return!0;const i=e[t];if(!i||0===i.periods.length)return!0;const s=new Date;return i.periods.some(t=>{const e=new Date(t.start),i=new Date(t.end);if(i.setSeconds(59,999),t.recurring){const t=new Date(s.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes());let a=new Date(s.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999);return t>a&&(a=new Date(s.getFullYear()+1,i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999)),s>=t&&s<=a}return s>=e&&s<=i})}Ot([Ct({attribute:!1})],Mt.prototype,"hass"),Ot([St()],Mt.prototype,"_lang");class jt{constructor(t){this.connection=t.connection}send(t,e={}){return this.connection.sendMessagePromise({type:`glass_cards/${t}`,...e})}subscribe(t,e,i={}){return this.connection.subscribeMessage(e,{type:`glass_cards/${t}`,...i})}}var Ht=Object.defineProperty,Nt=Object.getOwnPropertyDescriptor,Ft=(t,e,i,s)=>{for(var a,r=s>1?void 0:s?Nt(e,i):e,o=t.length-1;o>=0;o--)(a=t[o])&&(r=(s?a(e,i,r):a(r))||r);return s&&r&&Ht(e,i,r),r};class Ut extends ht{constructor(){super(...arguments),this._lang=Lt()}set hass(t){this._hass=t,t?.language&&Pt(t.language)&&(this._lang=Lt())}get hass(){return this._hass}setConfig(t){this._config=t}static{this.styles=[ut,c`
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
          ${It("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${It("editor.open_config")}</a>
        </p>
      </div>
    `}}Ft([Ct({attribute:!1})],Ut.prototype,"hass",1),Ft([St()],Ut.prototype,"_lang",2);try{customElements.define("glass-light-card-editor",Ut)}catch{}var Vt=Object.defineProperty,qt=(t,e,i,s)=>{for(var a,r=void 0,o=t.length-1;o>=0;o--)(a=t[o])&&(r=a(e,i,r)||r);return r&&Vt(e,i,r),r};const Bt=[[3e3,"light.temp_warm","#ffd4a3"],[4e3,"light.temp_warm","#ffedb3"],[4800,"light.temp_neutral","#fff5e6"],[9999,"light.temp_cold","#e0ecf5"]];function Wt(t){for(const[e,i,s]of Bt)if(t<e)return{label:It(i),color:s};return{label:It("light.temp_cold"),color:"#e0ecf5"}}function Kt(t){return"#"+t.map(t=>t.toString(16).padStart(2,"0")).join("")}function Gt(t,e){return`rgba(${t[0]},${t[1]},${t[2]},${e})`}const Yt=[[251,191,36],[248,113,113],[244,114,182],[167,139,250],[129,140,248],[96,165,250],[74,222,128],[240,240,240]];const Xt=["off","candle","fire"];class Qt extends Mt{constructor(){super(...arguments),this._expandedEntity=null,this._dragValues=new Map,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null,this._showHeader=!0,this._lightConfigLoaded=!1,this._throttleTimers=new Map,this._roomConfig=null,this._roomConfigLoaded=!1,this._schedules=null,this._schedulesLoaded=!1,this._onDocClick=t=>{if(!this._expandedEntity)return;t.composedPath().includes(this)||(this._expandedEntity=null)},this._wheelCanvas=null}static getConfigElement(){return document.createElement("glass-light-card-editor")}get _isDashboardMode(){return!(this.areaId||this._config?.area)&&!this._config?.entity}static{this.styles=[ut,_t,bt,gt,c`
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
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        border-radius: var(--radius-full);
        font-size: 10px;
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
        padding: 14px;
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
        transition: opacity 0.25s var(--ease-std);
      }
      .ctrl-fold.open .ctrl-fold-inner {
        opacity: 1;
      }
      .fold-sep {
        height: 1px;
        margin: 0 12px;
        background: linear-gradient(90deg, transparent, var(--fold-color, rgba(251,191,36,0.25)), transparent);
        opacity: 0;
        transition: opacity 0.25s var(--ease-std);
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
      }
      .cdot:active { transform: scale(1.1); }
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
    `]}setConfig(t){super.setConfig(t)}getCardSize(){if(this._isDashboardMode){const t=this._getLights().length;return 0===t?1:Math.min(t,6)+1}return 3}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick,!0),this._listen("room-config-changed",t=>{const e=this.areaId||this._config?.area;e&&t.areaId===e&&(this._roomConfigLoaded=!1,this._cachedLights=void 0,this._loadRoomConfig())}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._cachedLights=void 0,this._loadSchedules()}),this._listen("light-config-changed",()=>{this._lightConfigLoaded=!1,this._loadLightConfig()})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick,!0),this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._throttleTimers.forEach(t=>clearTimeout(t)),this._throttleTimers.clear(),this._backend=void 0,this._schedulesLoaded=!1,this._lightConfigLoaded=!1,this._roomConfigLoaded=!1}async _loadRoomConfig(){const t=this.areaId||this._config?.area;if(t&&this.hass&&!this._roomConfigLoaded){this._roomConfigLoaded=!0,this._lastLoadedAreaId=t;try{this._backend||(this._backend=new jt(this.hass));const e=await this._backend.send("get_room",{area_id:t});if((this.areaId||this._config?.area)!==t)return;e&&(this._roomConfig=e,this._cachedLights=void 0,this.requestUpdate())}catch{}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new jt(this.hass));const t=await this._backend.send("get_schedules");this._schedules=t,this._cachedLights=void 0,this.requestUpdate()}catch{this._schedulesLoaded=!1}}}async _loadLightConfig(){if(this.hass&&!this._lightConfigLoaded){this._lightConfigLoaded=!0;try{this._backend||(this._backend=new jt(this.hass));const t=await this._backend.send("get_config");t?.light_card&&(this._showHeader=t.light_card.show_header??!0)}catch{}}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._expandedEntity=null,this._dragValues=new Map,this._cachedLights=void 0,this._throttleTimers.forEach(t=>clearTimeout(t)),this._throttleTimers.clear()}getTrackedEntityIds(){if(this._isDashboardMode&&this.hass&&this.visibleAreaIds?.length&&this.hass.entities&&this.hass.devices){const t=[];for(const e of this.visibleAreaIds)for(const i of Rt(e,this.hass.entities,this.hass.devices))i.entity_id.startsWith("light.")&&t.push(i.entity_id);return t}return this._getLights().map(t=>t.entity_id)}updated(t){super.updated(t),t.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigLoaded=!1,this._schedulesLoaded=!1,this._lightConfigLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules(),this.hass&&!this._lightConfigLoaded&&this._loadLightConfig();const e=this.areaId||this._config?.area;e&&this.hass&&(this._lastLoadedAreaId!==e&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),t.has("hass")&&(this._cachedLights=void 0);const i=this._getLightInfos();if(i.some(t=>t.isOn)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on"),t.has("hass")&&this._dragValues.size>0){let t=!1;const e=new Map(this._dragValues);for(const s of i){const i=`bri:${s.entityId}`,a=e.get(i);void 0!==a&&Math.abs(s.brightnessPct-a)<=2&&(e.delete(i),t=!0);const r=`temp:${s.entityId}`,o=e.get(r);void 0!==o&&null!==s.colorTempKelvin&&Math.abs(s.colorTempKelvin-o)<=50&&(e.delete(r),t=!0)}t&&(this._dragValues=e)}if(this._colorPickerEntity){const t=this.renderRoot.querySelector(".cp-wheel-wrap canvas");t&&!t.dataset.drawn&&(this._drawColorWheel(t),t.dataset.drawn="1")}}_getLights(){if(!this.hass)return[];if(this._cachedLights&&this._cachedLightsHassRef===this.hass.states)return this._cachedLights;this._cachedLightsHassRef=this.hass.states;const t=this._computeLights();return this._cachedLights=t,t}_computeLights(){if(!this.hass)return[];const t=this.areaId||this._config?.area;if(t){const e=this._config?.hidden_entities??[],i=this._roomConfig?.hidden_entities??[],s=new Set([...e,...i]),a=Rt(t,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("light.")&&!s.has(t.entity_id)&&Dt(t.entity_id,this._schedules)).map(t=>this.hass?.states[t.entity_id]).filter(t=>void 0!==t),r=this._config?.entity_order??[],o=r.length>0?r:this._roomConfig?.entity_order??[];if(o.length>0){const t=new Map;o.forEach((e,i)=>t.set(e,i)),a.sort((e,i)=>{const s=t.get(e.entity_id),a=t.get(i.entity_id);return void 0!==s&&void 0!==a?s-a:void 0!==s?-1:void 0!==a?1:0})}return a}if(this._config?.entity){if(!Dt(this._config.entity,this._schedules))return[];const t=this.hass.states[this._config.entity];return t?[t]:[]}if(this._isDashboardMode){const t=this.visibleAreaIds;if(!t||0===t.length||!this.hass.entities||!this.hass.devices)return[];const e=new Set;for(const i of t)for(const t of Rt(i,this.hass.entities,this.hass.devices))t.entity_id.startsWith("light.")&&e.add(t.entity_id);return Object.values(this.hass.states).filter(t=>e.has(t.entity_id)&&"on"===t.state&&Dt(t.entity_id,this._schedules)).sort((t,e)=>{const i=t.attributes.friendly_name||t.entity_id,s=e.attributes.friendly_name||e.entity_id;return i.localeCompare(s)})}return[]}_getDashboardLightTotal(){if(!this.hass||!this.hass.entities||!this.hass.devices)return 0;if(void 0!==this._dashboardTotalCache&&this._dashboardTotalEntitiesRef===this.hass.entities)return this._dashboardTotalCache;const t=this.visibleAreaIds;if(!t||0===t.length)return 0;const e=new Set;for(const i of t)for(const t of Rt(i,this.hass.entities,this.hass.devices))t.entity_id.startsWith("light.")&&e.add(t.entity_id);return this._dashboardTotalEntitiesRef=this.hass.entities,this._dashboardTotalCache=e.size,e.size}_getLightInfos(){return this._getLights().map(t=>this._buildLightInfo(t))}_buildLightInfo(t){const e="on"===t.state,i=function(t){const e=t.attributes.supported_color_modes;return e&&0!==e.length?e.some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t))?"rgb":e.includes("color_temp")?"color_temp":e.includes("brightness")?"dimmable":"simple":void 0!==t.attributes.brightness?"dimmable":"simple"}(t),s=t.attributes.brightness,a=e&&void 0!==s?Math.round(s/255*100):0;let r=null;const o=t.attributes.min_color_temp_kelvin||2e3,n=t.attributes.max_color_temp_kelvin||6500;e&&"color_temp"===i&&(r=t.attributes.color_temp_kelvin||null);let l=null;return e&&"rgb"===i&&(l=t.attributes.rgb_color||null),{entity:t,entityId:t.entity_id,name:t.attributes.friendly_name||t.entity_id,isOn:e,type:i,brightnessPct:a,colorTempKelvin:r,minKelvin:o,maxKelvin:n,rgbColor:l}}_toggleLight(t){this.hass?.callService("light","toggle",{},{entity_id:t})}_toggleAll(){const t=this._getLights(),e=t.some(t=>"on"===t.state),i=e?"turn_off":"turn_on",s=t.map(t=>t.entity_id);this.hass?.callService("light",i,{},{entity_id:s}),e&&(this._expandedEntity=null)}_turnAllOff(){const t=this._getLights().map(t=>t.entity_id);this.hass?.callService("light","turn_off",{},{entity_id:t}),this._expandedEntity=null}_toggleExpand(t,e){e&&(this._expandedEntity===t?this._expandedEntity=null:this._expandedEntity=t)}_onSliderInput(t,e,i){const s=new Map(this._dragValues);s.set(t,e),this._dragValues=s;const a=this._throttleTimers.get(t);void 0!==a&&clearTimeout(a),this._throttleTimers.set(t,setTimeout(()=>{this._throttleTimers.delete(t),i(this._dragValues.get(t)??e)},100))}_onSliderChange(t,e,i){const s=new Map(this._dragValues);s.set(t,e),this._dragValues=s,i(e);const a=this._throttleTimers.get(t);void 0!==a&&clearTimeout(a),this._throttleTimers.delete(t)}_setBrightness(t,e){this.hass?.callService("light","turn_on",{brightness_pct:e},{entity_id:t})}_setColorTemp(t,e){this.hass?.callService("light","turn_on",{color_temp_kelvin:e},{entity_id:t})}_setRgbColor(t,e){this.hass?.callService("light","turn_on",{rgb_color:e},{entity_id:t})}_setEffect(t,e){"off"===e?this.hass?.callService("light","turn_on",{},{entity_id:t}):this.hass?.callService("light","turn_on",{effect:e},{entity_id:t})}_openColorPicker(t,e){this._colorPickerEntity=t,this._colorPickerRgb=e??[255,255,255],this._colorPickerPos=e?function(t){const e=t[0]/255,i=t[1]/255,s=t[2]/255,a=Math.max(e,i,s),r=Math.min(e,i,s),o=a-r;let n=0;0!==o&&(n=a===e?((i-s)/o+6)%6*60:a===i?60*((s-e)/o+2):60*((e-i)/o+4));const l=0===o?0:o/(1-Math.abs(a+r-1)),c=Math.min(l,1),d=n*Math.PI/180;return{x:Math.cos(d)*c*50+50,y:Math.sin(d)*c*50+50}}(e):null}_closeColorPicker(){this._cancelWheelDrag?.(),this._cancelWheelDrag=void 0,this._wheelCanvas=null,this._colorPickerEntity=null,this._colorPickerRgb=null,this._colorPickerPos=null}_onWheelInteraction(t){const e=this._wheelCanvas;if(!e)return;const i=e.getBoundingClientRect(),s="touches"in t?t.touches[0].clientX:t.clientX,a="touches"in t?t.touches[0].clientY:t.clientY,r=s-i.left-i.width/2,o=a-i.top-i.height/2,n=i.width/2,l=Math.sqrt(r*r+o*o);if(l>n)return;const c=function(t,e,i){const s=(1-Math.abs(2*i-1))*e,a=s*(1-Math.abs(t/60%2-1)),r=i-s/2;let o=0,n=0,l=0;return t<60?(o=s,n=a):t<120?(o=a,n=s):t<180?(n=s,l=a):t<240?(n=a,l=s):t<300?(o=a,l=s):(o=s,l=a),[Math.round(255*(o+r)),Math.round(255*(n+r)),Math.round(255*(l+r))]}((180*Math.atan2(o,r)/Math.PI%360+360)%360,Math.min(l/n,1),.5),d=r/n*50+50,h=o/n*50+50;if(this._colorPickerPos={x:d,y:h},this._colorPickerRgb=c,this._colorPickerEntity){const t=`cp:${this._colorPickerEntity}`,e=this._throttleTimers.get(t);void 0!==e&&clearTimeout(e),this._throttleTimers.set(t,setTimeout(()=>{this._throttleTimers.delete(t),this._colorPickerEntity&&this._colorPickerRgb&&this._setRgbColor(this._colorPickerEntity,this._colorPickerRgb)},150))}}_drawColorWheel(t){const e=440;t.width=e,t.height=e;const i=t.getContext("2d");if(!i)return;const s=220,a=220;for(let r=0;r<360;r++){const t=(r-1)*Math.PI/180,e=(r+1)*Math.PI/180,o=i.createRadialGradient(s,a,0,s,a,220);o.addColorStop(0,`hsl(${r}, 0%, 100%)`),o.addColorStop(.5,`hsl(${r}, 100%, 50%)`),o.addColorStop(1,`hsl(${r}, 100%, 50%)`),i.beginPath(),i.moveTo(s,a),i.arc(s,a,220,t,e),i.closePath(),i.fillStyle=o,i.fill()}}_getEntityLayout(t){const e=this._config?.entity_layouts??{},i=this._roomConfig?.entity_layouts??{};return"full"===(e[t]||i[t])?"full":"compact"}_isCompact(t){return"compact"===this._getEntityLayout(t.entityId)}_buildLayout(t){const e=[];let i=0;for(;i<t.length;){const s=t[i];if(this._isCompact(s)){const a=i+1<t.length&&this._isCompact(t[i+1])?t[i+1]:null;a?(e.push({kind:"compact-pair",left:s,right:a}),i+=2):(e.push({kind:"full",light:s}),i++)}else e.push({kind:"full",light:s}),i++}return e}_computeTint(t){const e=t.filter(t=>t.isOn);if(0===e.length)return null;const i=e.length/t.length;let s="#fbbf24";const a=e.find(t=>"rgb"===t.type&&t.rgbColor);return a?.rgbColor&&(s=Kt(a.rgbColor)),{background:`radial-gradient(ellipse at 30% 30%, ${s}, transparent 70%)`,opacity:(.18*i).toFixed(3)}}_renderSubText(t){if(!t.isOn)return K`<span class="light-brightness-text">${It("common.off")}</span>`;if("simple"===t.type)return K`<span class="light-brightness-text">${It("common.on")}</span>`;const e=[K`<span class="light-brightness-text">${t.brightnessPct}%</span>`];if("color_temp"===t.type&&t.colorTempKelvin){const i=Wt(t.colorTempKelvin);e.push(K`<span class="light-temp-dot" style="background:${i.color}"></span>`),e.push(K`<span class="light-temp-text">${i.label}</span>`)}if("rgb"===t.type&&t.rgbColor){const i=Kt(t.rgbColor);e.push(K`<span class="light-temp-dot" style="background:${i}"></span>`),e.push(K`<span class="light-temp-text">${It("light.color")}</span>`)}return e}_renderLightRow(t,e,i){const s=["light-row",e?"compact":"",i?"compact-right":""].filter(Boolean).join(" "),a=t.isOn&&"rgb"===t.type&&t.rgbColor?`--light-rgb:${Kt(t.rgbColor)};--light-rgb-bg:${Gt(t.rgbColor,.1)};--light-rgb-border:${Gt(t.rgbColor,.15)};--light-rgb-glow:${Gt(t.rgbColor,.4)};--light-rgb-sub:${Gt(t.rgbColor,.55)}`:"",r=["light-icon-btn",t.isOn?"on":"",t.isOn&&t.rgbColor?"rgb":""].filter(Boolean).join(" ");return K`
      <div
        class=${s}
        data-on=${t.isOn}
        style=${a}
        ?data-rgb=${t.isOn&&"rgb"===t.type&&!!t.rgbColor}
      >
        <button
          class=${r}
          style=${a}
          @click=${()=>this._toggleLight(t.entityId)}
          aria-label="${It("light.toggle_aria",{name:t.name})}"
        >
          <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
        </button>
        <button
          class="light-expand-btn"
          @click=${()=>this._toggleExpand(t.entityId,t.isOn)}
          aria-label="${t.isOn?It("light.expand_aria",{name:t.name}):t.name}"
          aria-expanded=${t.isOn?this._expandedEntity===t.entityId?"true":"false":X}
        >
          <div class="light-info">
            <div class="light-name">${ft(t.name)}</div>
            <div class="light-sub">${this._renderSubText(t)}</div>
          </div>
          <span class="light-dot"></span>
        </button>
      </div>
    `}_getBrightnessFill(t){if("rgb"===t.type&&t.rgbColor){const[e,i,s]=t.rgbColor;return{fillClass:"dynamic",fillStyle:`--slider-fill-start:rgba(${e},${i},${s},0.15);--slider-fill-end:rgba(${e},${i},${s},0.35)`}}if("color_temp"===t.type&&t.colorTempKelvin){const e=Wt(t.colorTempKelvin).color,i=parseInt(e.slice(1,3),16),s=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16);return{fillClass:"dynamic",fillStyle:`--slider-fill-start:rgba(${i},${s},${a},0.15);--slider-fill-end:rgba(${i},${s},${a},0.35)`}}return{fillClass:"warm",fillStyle:""}}_getFoldColor(t){if(t.rgbColor)return`rgba(${t.rgbColor[0]},${t.rgbColor[1]},${t.rgbColor[2]},0.3)`;if("color_temp"===t.type&&t.colorTempKelvin){const{color:e}=Wt(t.colorTempKelvin);return`rgba(${parseInt(e.slice(1,3),16)},${parseInt(e.slice(3,5),16)},${parseInt(e.slice(5,7),16)},0.3)`}return"rgba(251,191,36,0.25)"}_renderControlFold(t){const e=this._expandedEntity===t.entityId&&t.isOn,i="rgb"===t.type,{fillClass:s,fillStyle:a}=this._getBrightnessFill(t),r=this._getFoldColor(t);return K`
      <div class="fold-sep ${e?"visible":""}" style="--fold-color:${r}"></div>
      <div class="ctrl-fold ${e?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${i}>
            <span class="ctrl-label">${t.name}</span>

            ${"simple"!==t.type?this._renderSlider(`bri:${t.entityId}`,s,t.brightnessPct,"mdi:brightness-6",It("light.intensity"),t=>`${t}%`,1,100,e=>this._setBrightness(t.entityId,e),a):X}
            ${"color_temp"===t.type?this._renderTempSlider(t):X}
            ${"rgb"===t.type?this._renderColorRow(t):X}
            ${this._renderEffectChips(t)}
          </div>
        </div>
      </div>
      <div class="fold-sep ${e?"visible":""}" style="--fold-color:${r}"></div>
    `}_renderColorRow(t){return K`
      <div class="color-row">
        ${Yt.map(e=>{const i=!!t.rgbColor&&(s=t.rgbColor,a=e,s[0]===a[0]&&s[1]===a[1]&&s[2]===a[2]);var s,a;return K`
            <button
              class="cdot ${i?"active":""}"
              style="--cdot-color:${Kt(e)}"
              @click=${()=>this._setRgbColor(t.entityId,e)}
              aria-label="${It("light.color_aria",{hex:Kt(e)})}"
            ></button>
          `})}
        <button
          class="color-picker-btn"
          @click=${()=>this._openColorPicker(t.entityId,t.rgbColor)}
          aria-label="${It("light.color_picker_aria")}"
        ></button>
      </div>
    `}_renderEffectChips(t){const e=t.entity.attributes.effect_list;if(!e||0===e.length)return X;const i=Xt.filter(t=>"off"===t||e.includes(t));if(i.length<=1)return X;const s=t.entity.attributes.effect?.toLowerCase();return K`
      <div class="color-row" style="flex-wrap:wrap">
        ${i.map(e=>K`
            <button
              class="cdot effect-chip ${s===e||!s&&"off"===e?"active":""}"
              @click=${()=>this._setEffect(t.entityId,e)}
              aria-label="${It(`light.effect_${e}`)}"
              style="width:auto;height:auto;border-radius:var(--radius-md);padding:4px 8px;font-size:9px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:var(--t3);border:1px solid var(--b2);background:var(--s1)"
            >${It(`light.effect_${e}`)}</button>
          `)}
      </div>
    `}_renderColorPicker(){if(!this._colorPickerEntity||!this._colorPickerRgb)return X;const t=this._colorPickerRgb;return K`
      <div class="color-picker-overlay" @click=${t=>{t.target.classList.contains("color-picker-overlay")&&this._closeColorPicker()}}>
        <div class="color-picker-dialog">
          <span class="cp-title">${It("light.color_picker_title")}</span>
          <div class="cp-wheel-wrap">
            <canvas
              @mousedown=${t=>{this._wheelCanvas=t.currentTarget,this._onWheelInteraction(t);const e=t=>this._onWheelInteraction(t),i=()=>{s(),this._colorPickerEntity&&this._colorPickerRgb&&this._setRgbColor(this._colorPickerEntity,this._colorPickerRgb)},s=()=>{window.removeEventListener("mousemove",e),window.removeEventListener("mouseup",i),this._cancelWheelDrag=void 0};window.addEventListener("mousemove",e),window.addEventListener("mouseup",i),this._cancelWheelDrag=s}}
              @touchstart=${t=>{t.preventDefault(),this._wheelCanvas=t.currentTarget,this._onWheelInteraction(t);const e=t=>{t.preventDefault(),this._onWheelInteraction(t)},i=()=>{s(),this._colorPickerEntity&&this._colorPickerRgb&&this._setRgbColor(this._colorPickerEntity,this._colorPickerRgb)},s=()=>{window.removeEventListener("touchmove",e),window.removeEventListener("touchend",i),window.removeEventListener("touchcancel",i),this._cancelWheelDrag=void 0};window.addEventListener("touchmove",e,{passive:!1}),window.addEventListener("touchend",i),window.addEventListener("touchcancel",i),this._cancelWheelDrag=s}}
            ></canvas>
            <div class="cp-cursor" style="left:${this._colorPickerPos?.x??50}%;top:${this._colorPickerPos?.y??50}%;background:${Kt(t)}"></div>
          </div>
          <div class="cp-preview" style="background:${Kt(t)}"></div>
          <button class="cp-close" @click=${()=>this._closeColorPicker()}>
            ${It("common.close")}
          </button>
        </div>
      </div>
    `}_renderSlider(t,e,i,s,a,r,o,n,l,c=""){const d=this._dragValues.get(t)??i,h=(d-o)/(n-o)*100;return K`
      <div class="slider">
        <div class="slider-fill ${e}" style=${c?`width:${h}%;${c}`:`width:${h}%`}></div>
        <div class="slider-thumb" style="left:${h}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${s}></ha-icon>
          ${a}
        </div>
        <div class="slider-val">${r(d)}</div>
        <input
          type="range"
          class="slider-native"
          min=${o}
          max=${n}
          .value=${String(d)}
          aria-label=${a}
          @input=${e=>{const i=Number(e.target.value);this._onSliderInput(t,i,l)}}
          @change=${e=>{const i=Number(e.target.value);this._onSliderChange(t,i,l)}}
        />
      </div>
    `}_renderTempSlider(t){const e=t.colorTempKelvin||t.minKelvin,i=`temp:${t.entityId}`,s=this._dragValues.get(i)??e,a=Math.min(Math.max((s-t.minKelvin)/(t.maxKelvin-t.minKelvin)*100,2),98);return K`
      <div class="slider">
        <div class="slider-fill temp-gradient"></div>
        <div class="slider-thumb" style="left:${a}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${"mdi:thermometer"}></ha-icon>
          ${It("light.temperature")}
        </div>
        <div class="slider-val">${s}K</div>
        <input
          type="range"
          class="slider-native"
          min=${t.minKelvin}
          max=${t.maxKelvin}
          .value=${String(s)}
          aria-label="${It("light.color_temp_label")}"
          @input=${e=>{const s=Number(e.target.value);this._onSliderInput(i,s,e=>this._setColorTemp(t.entityId,e))}}
          @change=${e=>{const s=Number(e.target.value);this._onSliderChange(i,s,e=>this._setColorTemp(t.entityId,e))}}
        />
      </div>
    `}_renderGrid(t){const e=this._buildLayout(t),i=[];for(const s of e)"full"===s.kind?(i.push(this._renderLightRow(s.light,!1,!1)),i.push(this._renderControlFold(s.light))):(i.push(this._renderLightRow(s.left,!0,!1)),s.right&&i.push(this._renderLightRow(s.right,!0,!0)),i.push(this._renderControlFold(s.left)),s.right&&i.push(this._renderControlFold(s.right)));return i}_renderDashboardGrid(t){const e=[];let i=0;for(;i<t.length;){const s=t[i],a=i+1<t.length?t[i+1]:null;a?(e.push(K`
          ${this._renderLightRow(s,!0,!1)}
          ${this._renderLightRow(a,!0,!0)}
          ${this._renderControlFold(s)}
          ${this._renderControlFold(a)}
        `),i+=2):(e.push(K`
          ${this._renderLightRow(s,!1,!1)}
          ${this._renderControlFold(s)}
        `),i++)}return e}_renderDashboard(){const t=this._getLightInfos();if(0===t.length)return X;const e=t.slice(0,6),i=t.length-6,s=this._computeTint(t),a=t.length,r=Math.max(this._getDashboardLightTotal(),a),o=a===r?"all":"some";return K`
      ${this._showHeader?K`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${It("light.dashboard_title")}</span>
            <span class="card-count ${o}">${a}/${r}</span>
          </div>
          <button
            class="toggle-all on"
            role="switch"
            aria-checked="true"
            @click=${()=>this._turnAllOff()}
            aria-label="${It("light.dashboard_turn_all_off_aria")}"
          ></button>
        </div>
      `:X}

      <div class="card glass">
        <div
          class="tint"
          style=${s?`background:${s.background};opacity:${s.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(e)}
          </div>
          ${i>0?K`<div class="dashboard-overflow">
                ${It("light.dashboard_overflow",{count:String(i)})}
              </div>`:X}
        </div>
      </div>
      ${this._renderColorPicker()}
    `}render(){if(this._lang,this._isDashboardMode){const t=this._renderDashboard();return this.style.display=t===X?"none":"",t}const t=this._getLightInfos();if(0===t.length)return this.style.display="none",X;this.style.display="";const e=t.filter(t=>t.isOn).length,i=t.length,s=e>0,a=0===e?"none":e===i?"all":"some",r=this._computeTint(t);return K`
      ${this._showHeader?K`
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-title">${It("light.title")}</span>
            <span class="card-count ${a}">${e}/${i}</span>
          </div>
          <button
            class="toggle-all ${s?"on":""}"
            @click=${()=>this._toggleAll()}
            role="switch"
            aria-checked=${s?"true":"false"}
            aria-label="${It(s?"light.toggle_all_on_aria":"light.toggle_all_off_aria")}"
          ></button>
        </div>
      `:X}

      <div class="card glass">
        <div
          class="tint"
          style=${r?`background:${r.background};opacity:${r.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">${this._renderGrid(t)}</div>
        </div>
      </div>
      ${this._renderColorPicker()}
    `}}qt([Ct({attribute:!1})],Qt.prototype,"areaId"),qt([Ct({attribute:!1})],Qt.prototype,"visibleAreaIds"),qt([St()],Qt.prototype,"_expandedEntity"),qt([St()],Qt.prototype,"_dragValues"),qt([St()],Qt.prototype,"_colorPickerEntity"),qt([St()],Qt.prototype,"_colorPickerRgb"),qt([St()],Qt.prototype,"_colorPickerPos"),qt([St()],Qt.prototype,"_showHeader");try{customElements.define("glass-light-card",Qt)}catch{}var Jt=Object.defineProperty,Zt=(t,e,i,s)=>{for(var a,r=void 0,o=t.length-1;o>=0;o--)(a=t[o])&&(r=a(e,i,r)||r);return r&&Jt(e,i,r),r};const te=class e extends ht{constructor(){super(...arguments),this._lang=Lt(),this._areaId=null,this._open=!1,this._scenesOpen=!1,this._activeSceneId=null,this._peekedRooms=new Set,this._boundKeydown=this._onKeydown.bind(this),this._roomConfigs=new Map,this._loadingRooms=new Set,this._busCleanups=[]}shouldUpdate(t){if(!t.has("hass"))return!0;if(t.size>1)return!0;if(!this._open)return!1;const e=t.get("hass");if(!e||!this.hass||!this._areaId)return!0;const i=Rt(this._areaId,this.hass.entities,this.hass.devices),s=this.hass;return i.some(t=>e.states[t.entity_id]!==s.states[t.entity_id])}static{this.styles=[ut,_t,c`
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

      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
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
      .close-btn:active {
        background: var(--s3);
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
      .scene-chip:active {
        background: var(--s3);
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

    `]}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigs.clear(),this._loadingRooms.clear()),this.hass.language&&Pt(this.hass.language)&&(this._lang=Lt()))}_listen(e,i){this._busCleanups.push(t.on(e,i))}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(t=>t()),this._busCleanups=[],void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._listen("popup-open",t=>this._handleOpen(t)),this._listen("popup-close",()=>this._handleClose()),this._listen("room-config-changed",t=>{this._roomConfigs.delete(t.areaId),this._peekedRooms.delete(t.areaId),this._areaId===t.areaId&&this._loadRoomConfig(t.areaId)}),this._listen("navbar-config-changed",()=>{this._roomConfigs.clear(),this._loadingRooms.clear(),this._areaId&&this._loadRoomConfig(this._areaId)}),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._peekedRooms.clear(),this._loadingRooms.clear(),this._busCleanups.forEach(t=>t()),this._busCleanups=[],this._backend=void 0,document.removeEventListener("keydown",this._boundKeydown)}_handleOpen(t){void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._areaId=t.areaId,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(t.areaId),this._pendingRaf=requestAnimationFrame(()=>{this._pendingRaf=void 0,this._open=!0,this.setAttribute("open","")})}_maybePeekScenes(t){if(this._peekedRooms.has(t))return;const e=this._getAreaMeta();e&&0!==e.scenes.length&&(this._peekedRooms.add(t),this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&(this._scenesOpen=!0,this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&(this._scenesOpen=!1)},1e3))},400))}_handleClose(){void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._open=!1,this.removeAttribute("open"),this._closeTimeout=setTimeout(()=>{this._areaId=null,this._closeTimeout=void 0},350)}_onKeydown(e){"Escape"===e.key&&this._open&&t.emit("popup-close",void 0)}async _loadRoomConfig(t){if(this.hass)if(this._roomConfigs.has(t))this._open&&this._areaId===t&&this._maybePeekScenes(t);else if(!this._loadingRooms.has(t)){this._loadingRooms.add(t);try{this._backend||(this._backend=new jt(this.hass));const e=await this._backend.send("get_room",{area_id:t});this._roomConfigs.set(t,e),this._areaId===t&&this.requestUpdate()}catch{this._roomConfigs.set(t,null)}finally{this._loadingRooms.delete(t)}this._open&&this._areaId===t&&this._maybePeekScenes(t)}}_onOverlayClick(){t.emit("popup-close",void 0)}_getAreaMeta(){if(!this.hass||!this._areaId)return null;const t=this.hass.areas[this._areaId];if(!t)return null;const e=Rt(this._areaId,this.hass.entities,this.hass.devices);let i=null,s=null,a=!1,r=!1;const o=[],n=new Set;for(const u of e){const t=this.hass?.states[u.entity_id];if(!t)continue;const e=u.entity_id.split(".")[0];if(n.add(e),"light"===e&&"on"===t.state&&(a=!0),"media_player"===e&&"playing"===t.state&&(r=!0),"sensor"===e){const e=t.attributes.device_class;"temperature"!==e||i||(i=`${t.state}${t.attributes.unit_of_measurement||"°C"}`),"humidity"!==e||s||(s=`${t.state}%`)}"scene"===e&&o.push(t)}const l=this._roomConfigs.get(this._areaId),c=l?.icon??t.icon??"mdi:home",d=new Set(l?.hidden_scenes??[]),h=o.filter(t=>!d.has(t.entity_id)),p=l?.scene_order;if(p&&p.length>0){const t=new Map(p.map((t,e)=>[t,e]));h.sort((e,i)=>(t.get(e.entity_id)??1/0)-(t.get(i.entity_id)??1/0))}return{name:t.name,icon:c,temperature:i,humidity:s,hasLight:a,hasMusic:r,scenes:h,domains:[...n]}}_activateScene(t){this._activeSceneId=t,this.hass?.callService("scene","turn_on",{},{entity_id:t})}static{this.DEFAULT_CARD_ORDER=["light","media_player","climate","fan","cover","vacuum"]}_getVisibleCards(t){const i=this._areaId?this._roomConfigs.get(this._areaId):void 0,s=i?.card_order;return s&&s.length>0?s.filter(e=>t.includes(e)):e.DEFAULT_CARD_ORDER.filter(e=>t.includes(e))}_renderDomainCard(t){switch(t){case"light":return K`<glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>`;case"cover":return K`<glass-cover-card .hass=${this.hass} .areaId=${this._areaId}></glass-cover-card>`;default:return X}}render(){if(this._lang,!this._areaId)return X;const e=this._getAreaMeta();if(!e)return X;const i=e.scenes.length>0,s=this._getVisibleCards(e.domains);return K`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${e.name}>
        <div class="header">
          <div class="header-left">
            <button
              class="header-icon ${e.hasLight?"has-light":""} ${e.hasMusic?"has-music":""}"
              @click=${()=>i&&(this._scenesOpen=!this._scenesOpen)}
              aria-label=${i?It("popup.toggle_scenes_aria"):e.name}
              aria-expanded=${i?this._scenesOpen?"true":"false":X}
            >
              <ha-icon .icon=${e.icon}></ha-icon>
            </button>
            <div class="scene-dash ${i?"visible":""}"></div>
          </div>
          <div class="header-info">
            <div class="header-name">${e.name}</div>
            <div class="header-meta">
              ${e.temperature?K`<span>${e.temperature}</span>`:X}
              ${e.humidity?K`<span>${e.humidity}</span>`:X}
            </div>
          </div>
          <button
            class="close-btn"
            @click=${()=>t.emit("popup-close",void 0)}
            aria-label="${It("popup.close_aria")}"
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        </div>

        ${i?K`
              <div class="scenes-wrapper ${this._scenesOpen?"open":""}">
                <div class="scenes-inner">
                  <div class="scene-chips">
                    ${e.scenes.map(t=>K`
                        <button
                          class="scene-chip ${this._activeSceneId===t.entity_id?"active":""}"
                          @click=${()=>this._activateScene(t.entity_id)}
                          aria-label="${It("popup.activate_scene_aria",{name:t.attributes.friendly_name||t.entity_id})}"
                        >
                          ${t.attributes.friendly_name||t.entity_id}
                        </button>
                      `)}
                  </div>
                </div>
              </div>
            `:X}

        <div class="cards">
          ${s.map(t=>this._renderDomainCard(t))}
        </div>
      </div>
    `}};Zt([Ct({attribute:!1})],te.prototype,"hass"),Zt([St()],te.prototype,"_lang"),Zt([St()],te.prototype,"_areaId"),Zt([St()],te.prototype,"_open"),Zt([St()],te.prototype,"_scenesOpen"),Zt([St()],te.prototype,"_activeSceneId");let ee=te;try{customElements.define("glass-room-popup",ee)}catch{}var ie=Object.defineProperty,se=Object.getOwnPropertyDescriptor,ae=(t,e,i,s)=>{for(var a,r=s>1?void 0:s?se(e,i):e,o=t.length-1;o>=0;o--)(a=t[o])&&(r=(s?a(e,i,r):a(r))||r);return s&&r&&ie(e,i,r),r};class re extends ht{constructor(){super(...arguments),this._lang=Lt()}set hass(t){this._hass=t,t?.language&&Pt(t.language)&&(this._lang=Lt())}get hass(){return this._hass}setConfig(t){this._config=t}static{this.styles=[ut,c`
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
          ${It("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${It("editor.open_config")}</a>
        </p>
      </div>
    `}}ae([Ct({attribute:!1})],re.prototype,"hass",1),ae([St()],re.prototype,"_lang",2);try{customElements.define("glass-navbar-card-editor",re)}catch{}var oe=Object.defineProperty,ne=(t,e,i,s)=>{for(var a,r=void 0,o=t.length-1;o>=0;o--)(a=t[o])&&(r=a(e,i,r)||r);return r&&oe(e,i,r),r};const le={weather:"glass-weather-card",light:"glass-light-card",cover:"glass-cover-card",title:"glass-title-card",spotify:"glass-spotify-card"},ce=["title","weather","light","cover","spotify"];class de extends Mt{constructor(){super(...arguments),this._items=[],this._activeArea=null,this._scrollMask="none",this._popup=null,this._ownsPopup=!1,this._areaStructure=[],this._lastAreaKeys="",this._cachedEntityFingerprint="",this._boundUpdateMask=this._updateNavMask.bind(this),this._scrollEl=null,this._navbarConfig=null,this._configLoaded=!1,this._configLoading=!1,this._dashboardLoading=!1,this._roomConfigs={},this._flipPositions=new Map,this._configReady=!1,this._lastAmbientPeriod=null,this._editMode=!1,this._enabledCards=["weather"],this._cardOrder=ce,this._dashboardCards=new Map}static getConfigElement(){return document.createElement("glass-navbar-card-editor")}static{this.styles=[ut,_t,c`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 6px 12px 80px; /* top/sides + space for fixed navbar */
        overflow-x: hidden;
        box-sizing: border-box;
      }

      .dashboard-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
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
        color: var(--t3);
        font-family: inherit;
        outline: none;
        flex-shrink: 0;
        transition:
          background var(--t-fast),
          color var(--t-fast);
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-item:hover {
          background: var(--s2);
        }
      }
      .nav-item.active {
        background: rgba(255, 255, 255, 0.1);
        color: var(--t1);
      }

      .nav-item ha-icon {
        --mdc-icon-size: 22px;
        flex-shrink: 0;
        transition: color var(--t-fast);
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
        color: var(--t4);
        transition: color var(--t-fast);
        display: flex; align-items: center; justify-content: center;
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-settings:hover ha-icon {
          color: var(--t2);
        }
      }
      .nav-settings:active ha-icon {
        color: var(--t1);
      }
    `]}connectedCallback(){super.connectedCallback();const t=document.querySelector("glass-room-popup");t?(this._popup=t,this._ownsPopup=!1):(this._popup=document.createElement("glass-room-popup"),document.body.appendChild(this._popup),this._ownsPopup=!0),this._listen("popup-close",()=>{this._activeArea=null}),this._listen("navbar-config-changed",()=>{this._loadBackendConfig()}),this._listen("dashboard-config-changed",()=>{this._loadDashboardConfig()}),this._editMode=this._detectEditMode()}disconnectedCallback(){super.disconnectedCallback(),this._ownsPopup&&this._popup?.remove(),this._popup=null,this._ownsPopup=!1,this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null);for(const t of this._dashboardCards.values())t.remove();this._dashboardCards.clear(),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1}firstUpdated(t){super.firstUpdated(t),this._attachScrollListener()}_detectEditMode(){let t=this.getRootNode();for(;t instanceof ShadowRoot;){const e=t.host;if("HUI-CARD-OPTIONS"===e.tagName)return!0;if("HUI-DIALOG-EDIT-CARD"===e.tagName)return!0;if("HA-PANEL-LOVELACE"===e.tagName&&e.lovelace?.editMode)return!0;t=e.getRootNode()}return!1}_attachScrollListener(){if(this._scrollEl)return;const t=this.renderRoot.querySelector(".nav-scroll");t&&(t.addEventListener("scroll",this._boundUpdateMask,{passive:!0}),this._scrollEl=t,this._updateNavMask())}setConfig(t){super.setConfig(t)}getCardSize(){return 0}getTrackedEntityIds(){return["sun.sun",...this._items.flatMap(t=>t.entityIds)]}shouldUpdate(t){if(t.has("hass")&&this.hass){this._popup&&(this._popup.hass=this.hass);for(const t of this._dashboardCards.values())t.hass=this.hass}return super.shouldUpdate(t)}updated(t){if(super.updated(t),t.has("hass")&&this.hass){if(this._editMode=this._detectEditMode(),this._editMode)return;this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoading||this._loadBackendConfig(),this._configReady&&(this._rebuildStructure(),this._aggregateState()),this._updateAmbient()}(t.has("_items")||t.has("_enabledCards"))&&this.updateComplete.then(()=>{this._syncDashboardCards(),this._attachScrollListener(),this._updateNavMask(),this._animateFlip()})}async _loadBackendConfig(){if(this.hass&&!this._configLoading){this._configLoading=!0;try{this._backend||(this._backend=new jt(this.hass));const t=await this._backend.send("get_config");this._navbarConfig=t.navbar,this._roomConfigs=t.rooms??{},t.dashboard&&(this._enabledCards=t.dashboard.enabled_cards,this._cardOrder=t.dashboard.card_order??ce),this._configLoaded=!0,this._configReady=!0,this._lastAreaKeys="",this._rebuildStructure(),this._aggregateState()}catch{this._configLoaded=!0,this._configReady=!0,this._rebuildStructure(),this._aggregateState()}finally{this._configLoading=!1}}}async _loadDashboardConfig(){if(this.hass&&!this._dashboardLoading){this._dashboardLoading=!0;try{this._backend||(this._backend=new jt(this.hass));const t=await this._backend.send("get_config");t?.dashboard&&(this._enabledCards=t.dashboard.enabled_cards,this._cardOrder=t.dashboard.card_order??ce)}catch{}finally{this._dashboardLoading=!1}}}_getOrCreateCard(t){let e=this._dashboardCards.get(t);if(e||(e=document.createElement(t),this._dashboardCards.set(t,e)),this.hass&&(e.hass=this.hass),"glass-light-card"===t){const t=this._items.map(t=>t.areaId);e.visibleAreaIds=t}return e}_rebuildStructure(){if(!this.hass?.areas)return;const t=this._navbarConfig?`${this._navbarConfig.room_order.join(",")}|${this._navbarConfig.hidden_rooms.join(",")}`:"";this.hass.entities!==this._lastEntitiesRef&&(this._lastEntitiesRef=this.hass.entities,this._cachedEntityFingerprint=Object.values(this.hass.entities).map(t=>`${t.entity_id}:${t.area_id??""}`).sort().join("|"));const e=this._cachedEntityFingerprint,i=Object.entries(this._roomConfigs).map(([t,e])=>`${t}:${e.icon??""}`).sort().join(","),s=Object.keys(this.hass.areas).sort().join(",")+"||"+e+"||"+t+"||"+i;if(s===this._lastAreaKeys)return;this._lastAreaKeys=s;const a=new Set(this._navbarConfig?.hidden_rooms??[]),r=new Map;(this._navbarConfig?.room_order??[]).forEach((t,e)=>r.set(t,e));const o=[];for(const n of Object.values(this.hass.areas)){if(a.has(n.area_id))continue;const t=Rt(n.area_id,this.hass.entities,this.hass.devices);if(0===t.length)continue;const e=this._roomConfigs[n.area_id]?.icon;o.push({areaId:n.area_id,name:n.name,icon:e||n.icon||"mdi:home",entityIds:t.map(t=>t.entity_id)})}o.sort((t,e)=>{const i=r.get(t.areaId),s=r.get(e.areaId);return void 0!==i&&void 0!==s?i-s:void 0!==i?-1:void 0!==s?1:t.name.localeCompare(e.name)}),this._areaStructure=o}_aggregateState(){if(!this.hass)return;const t=this._areaStructure.map(t=>{let e=0,i=null,s=null,a=null,r=null,o=!1;for(const n of t.entityIds){const t=this.hass?.states[n];if(!t)continue;const l=n.split(".")[0];if("light"===l&&"on"===t.state&&e++,"sensor"===l){const e=t.attributes.device_class;"temperature"!==e||i||(i=`${t.state}°`,s=parseFloat(t.state)),"humidity"!==e||a||(a=`${t.state}%`,r=parseFloat(t.state))}"media_player"===l&&"playing"===t.state&&(o=!0)}return{...t,lightsOn:e,temperature:i,tempValue:s,humidity:a,humidityValue:r,mediaPlaying:o}});!1!==this._navbarConfig?.auto_sort&&t.sort((t,e)=>(t.lightsOn>0?0:1)-(e.lightsOn>0?0:1));t.map(t=>`${t.areaId}:${t.lightsOn}:${t.temperature}:${t.humidity}:${t.mediaPlaying}`).join("|")!==this._items.map(t=>`${t.areaId}:${t.lightsOn}:${t.temperature}:${t.humidity}:${t.mediaPlaying}`).join("|")&&(this._snapshotPositions(),this._items=t)}_updateAmbient(){if(!this.hass)return;const e=function(t){const e=t.states["sun.sun"];if(!e){const t=(new Date).getHours();return t>=6&&t<10?"morning":t>=10&&t<17?"day":t>=17&&t<21?"evening":"night"}const i=parseFloat(e.attributes.elevation)||0;if(i>20)return"day";if(i>0){const t=Date.parse(e.attributes.next_setting),i=Date.parse(e.attributes.next_rising);return isNaN(t)||isNaN(i)?"above_horizon"===e.state?"day":"night":t<i?"evening":"morning"}if(i>-6){const t=Date.parse(e.attributes.next_rising),i=Date.parse(e.attributes.next_setting);if(!isNaN(t)&&!isNaN(i))return t<i?"morning":"evening"}return"night"}(this.hass);e!==this._lastAmbientPeriod&&(this._lastAmbientPeriod=e,t.emit("ambient-update",{period:e}))}_snapshotPositions(){this._flipPositions.clear();const t=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const e of t){const t=e.dataset.area;t&&this._flipPositions.set(t,e.getBoundingClientRect().left)}}_animateFlip(){if(0===this._flipPositions.size)return;const t=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const e of t){const t=e.dataset.area;if(!t)continue;const i=this._flipPositions.get(t);if(void 0===i)continue;const s=i-e.getBoundingClientRect().left;Math.abs(s)<1||e.animate([{transform:`translateX(${s}px)`},{transform:"translateX(0)"}],{duration:350,easing:"cubic-bezier(0.4, 0, 0.2, 1)"})}this._flipPositions.clear()}_updateNavMask(){const t=this.renderRoot.querySelector(".nav-scroll");if(!t)return;if(!(t.scrollWidth>t.offsetWidth))return void(this._scrollMask="none");const e=t.scrollLeft<=5,i=t.scrollLeft+t.offsetWidth>=t.scrollWidth-5;this._scrollMask=e&&i?"none":e?"mask-right":i?"mask-left":"mask-both"}_handleNavClick(e,i){const s=i.currentTarget.getBoundingClientRect();this._activeArea===e.areaId?(t.emit("popup-close",void 0),this._activeArea=null):(this._activeArea=e.areaId,t.emit("popup-open",{areaId:e.areaId,originRect:s}))}_renderNavItem(t){const e=this._activeArea===t.areaId,i=!1!==this._navbarConfig?.show_lights,s=!1!==this._navbarConfig?.show_temperature,a=!1!==this._navbarConfig?.show_humidity,r=!1!==this._navbarConfig?.show_media,o=this._navbarConfig?.temp_high??24,n=this._navbarConfig?.temp_low??17,l=this._navbarConfig?.humidity_threshold??65,c=i&&t.lightsOn>0,d=a&&null!==t.humidityValue&&t.humidityValue>=l,h=r&&t.mediaPlaying,p=s&&null!==t.tempValue&&t.tempValue>=o,u=["nav-item",e?"active":"",c?"has-light":"",h?"has-music":"",p?"has-temp-hot":"",s&&null!==t.tempValue&&!p&&t.tempValue<=n?"has-temp-cold":""].filter(Boolean).join(" ");return K`
      <button
        class=${u}
        data-area=${t.areaId}
        @click=${e=>this._handleNavClick(t,e)}
        aria-label=${t.name}
        aria-pressed=${e?"true":"false"}
      >
        <span class="nav-temp-badge">
          <ha-icon .icon=${p?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
        </span>
        <span class="nav-content">
          <ha-icon .icon=${t.icon}></ha-icon>
          <span class="nav-label-wrap"><span class="nav-label">${t.name}</span></span>
          ${d?K`<span class="humidity-bar"></span>`:X}
        </span>
      </button>
    `}_syncDashboardCards(){const t=this.renderRoot.querySelector(".dashboard-cards");if(!t)return;const e=new Set(this._enabledCards),i=this._cardOrder.filter(t=>e.has(t)),s=[];for(const[r]of this._dashboardCards){const t=Object.entries(le).find(([,t])=>t===r)?.[0];t&&e.has(t)||s.push(r)}for(const r of s)this._dashboardCards.get(r)?.remove(),this._dashboardCards.delete(r);let a=null;for(const r of i){const e=le[r];if(!e)continue;const i=this._getOrCreateCard(e),s=a?a.nextElementSibling:t.firstElementChild;i!==s&&t.insertBefore(i,s),a=i}}render(){this._lang;const t=!this._editMode&&this._items.length>0,e="nav-scroll"+("none"!==this._scrollMask?` ${this._scrollMask}`:"");return K`
      <div class="dashboard-cards"></div>
      ${t?K`<nav class="navbar glass glass-float">
            <div class=${e}>
              ${this._items.map(t=>this._renderNavItem(t))}
              <button
                class="nav-item nav-settings"
                @click=${()=>{history.pushState(null,"","/glass-cards"),window.dispatchEvent(new Event("location-changed"))}}
                aria-label=${It("config.title")}
              >
                <span class="nav-content">
                  <ha-icon .icon=${"mdi:cog"}></ha-icon>
                </span>
              </button>
            </div>
          </nav>`:X}
    `}}ne([St()],de.prototype,"_items"),ne([St()],de.prototype,"_activeArea"),ne([St()],de.prototype,"_scrollMask"),ne([St()],de.prototype,"_editMode"),ne([St()],de.prototype,"_enabledCards");try{customElements.define("glass-navbar-card",de)}catch{}const he=window;he.customCards=he.customCards||[],he.customCards.push({type:"glass-navbar-card",name:"Glass Navbar Card",description:"Auto-discovering bottom navigation for Glass Cards"});var pe=Object.defineProperty,ue=(t,e,i,s)=>{for(var a,r=void 0,o=t.length-1;o>=0;o--)(a=t[o])&&(r=a(e,i,r)||r);return r&&pe(e,i,r),r};const _e={sunny:"sunny","clear-night":"clear_night",partlycloudy:"partly_cloudy",cloudy:"cloudy",fog:"foggy",rainy:"rainy",pouring:"pouring",snowy:"snowy","snowy-rainy":"snowy_rainy",hail:"hail",lightning:"lightning","lightning-rainy":"stormy",windy:"windy","windy-variant":"windy_variant",exceptional:"exceptional"},ge={sunny:{icon:"mdi:weather-sunny",textKey:"weather.cond_sunny",tint:"#fbbf24",tintOp:.1,sparkStroke:"rgba(251,191,36,0.6)",sparkFill:"rgba(251,191,36,0.15)"},clear_night:{icon:"mdi:weather-night",textKey:"weather.cond_clear_night",tint:"#818cf8",tintOp:.08,sparkStroke:"rgba(129,140,248,0.5)",sparkFill:"rgba(129,140,248,0.12)"},partly_cloudy:{icon:"mdi:weather-partly-cloudy",textKey:"weather.cond_partly_cloudy",tint:"#fcd34d",tintOp:.07,sparkStroke:"rgba(252,211,77,0.5)",sparkFill:"rgba(252,211,77,0.12)"},cloudy:{icon:"mdi:weather-cloudy",textKey:"weather.cond_cloudy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.4)",sparkFill:"rgba(148,163,184,0.08)"},foggy:{icon:"mdi:weather-fog",textKey:"weather.cond_foggy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.35)",sparkFill:"rgba(148,163,184,0.08)"},rainy:{icon:"mdi:weather-rainy",textKey:"weather.cond_rainy",tint:"#60a5fa",tintOp:.1,sparkStroke:"rgba(96,165,250,0.6)",sparkFill:"rgba(96,165,250,0.15)"},pouring:{icon:"mdi:weather-pouring",textKey:"weather.cond_pouring",tint:"#3b82f6",tintOp:.14,sparkStroke:"rgba(59,130,246,0.7)",sparkFill:"rgba(59,130,246,0.18)"},snowy:{icon:"mdi:weather-snowy",textKey:"weather.cond_snowy",tint:"#e0f2fe",tintOp:.08,sparkStroke:"rgba(224,242,254,0.5)",sparkFill:"rgba(224,242,254,0.12)"},snowy_rainy:{icon:"mdi:weather-snowy-rainy",textKey:"weather.cond_snowy_rainy",tint:"#93c5fd",tintOp:.08,sparkStroke:"rgba(147,197,253,0.5)",sparkFill:"rgba(147,197,253,0.12)"},hail:{icon:"mdi:weather-hail",textKey:"weather.cond_hail",tint:"#bae6fd",tintOp:.1,sparkStroke:"rgba(186,230,253,0.5)",sparkFill:"rgba(186,230,253,0.12)"},lightning:{icon:"mdi:weather-lightning",textKey:"weather.cond_lightning",tint:"#c084fc",tintOp:.12,sparkStroke:"rgba(192,132,252,0.6)",sparkFill:"rgba(167,139,250,0.15)"},stormy:{icon:"mdi:weather-lightning-rainy",textKey:"weather.cond_stormy",tint:"#a78bfa",tintOp:.12,sparkStroke:"rgba(167,139,250,0.6)",sparkFill:"rgba(167,139,250,0.15)"},windy:{icon:"mdi:weather-windy",textKey:"weather.cond_windy",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.5)",sparkFill:"rgba(110,231,183,0.10)"},windy_variant:{icon:"mdi:weather-windy-variant",textKey:"weather.cond_windy_variant",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.4)",sparkFill:"rgba(110,231,183,0.10)"},exceptional:{icon:"mdi:alert-circle-outline",textKey:"weather.cond_exceptional",tint:"#fca5a5",tintOp:.1,sparkStroke:"rgba(252,165,165,0.5)",sparkFill:"rgba(252,165,165,0.12)"}},fe=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO"];function be(t){return t<10?"0"+t:""+t}class ve extends Mt{constructor(){super(...arguments),this._activeTab=null,this._forecastDaily=[],this._forecastHourly=[],this._clockTime="",this._clockSec="",this._clockDay="",this._clockDate="",this._weatherConfig={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},this._canvas=null,this._ctx=null,this._animId=0,this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:200,color:"rgba(167,139,250,"},this._cW=0,this._cH=0,this._resizeObserver=null,this._cachedCond="",this._clockInterval=0,this._unsubDaily=null,this._unsubHourly=null,this._configLoaded=!1,this._configLoadingInProgress=!1,this._canvasReady=!1,this._needsCanvasReInit=!1,this._subscribedEntity="",this._subscribedShowDaily=!1,this._subscribedShowHourly=!1,this._subVersion=0,this._animate=()=>{const t=this._ctx;if(!t)return;t.clearRect(0,0,this._cW,this._cH);for(const i of this._particles)this._updateParticle(i),this._drawParticle(t,i);const e=this._cachedCond;"stormy"!==e&&"lightning"!==e||(this._updateFlash(),this._flashState.opacity>.01&&(t.fillStyle=this._flashState.color+this._flashState.opacity+")",t.fillRect(0,0,this._cW,this._cH))),this._animId=requestAnimationFrame(this._animate)}}static{this.styles=[ut,_t,bt,c`
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
      height: 1px; margin: 2px 12px;
      background: linear-gradient(90deg, transparent, rgba(129,140,248,0.25), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std, ease);
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
    .wc-fc-tab:active { transform: scale(0.96); }
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

    /* ── Tint ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow);
    }
  `]}getTrackedEntityIds(){const t=[],e=this._getEntityId();return e&&t.push(e),this.hass?.states["sun.sun"]&&t.push("sun.sun"),t}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._weatherConfig.entity_id)return this._weatherConfig.entity_id;if(this.hass){const t=Object.keys(this.hass.states).find(t=>t.startsWith("weather."));if(t)return t}return""}_getWeatherState(){const t=this._getEntityId();return t?this.hass?.states[t]:void 0}_mapCondition(t){return _e[t]??"cloudy"}_getConditionMeta(t){return ge[t]??ge.cloudy}connectedCallback(){super.connectedCallback(),this._startClock(),this._listen("weather-config-changed",()=>this._loadConfig()),this._canvasReady&&(this._needsCanvasReInit=!0)}disconnectedCallback(){super.disconnectedCallback(),this._stopClock(),this._stopAnimation(),this._unsubForecasts(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._canvas=null,this._ctx=null,this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}updated(t){if(super.updated(t),t.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._unsubForecasts()),this._configLoaded||this._configLoadingInProgress||(this._backend=new jt(this.hass),this._loadConfig());const t=this._getWeatherState();this._cachedCond=t?this._mapCondition(t.state):"",this._subscribeForecasts()}this._needsCanvasReInit&&(this._needsCanvasReInit=!1,this._initCanvas())}firstUpdated(){this._canvasReady=!0,this._initCanvas()}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const t=await this._backend.send("get_config");t?.weather&&(this._weatherConfig=t.weather),this._configLoaded=!0,this._configLoadingInProgress=!1,this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}async _subscribeForecasts(){const t=this._getEntityId();if(!t||!this.hass)return;const e=this._subscribedShowDaily!==this._weatherConfig.show_daily||this._subscribedShowHourly!==this._weatherConfig.show_hourly;if(t===this._subscribedEntity&&!e)return;this._unsubForecasts(),this._subscribedEntity=t,this._subscribedShowDaily=this._weatherConfig.show_daily,this._subscribedShowHourly=this._weatherConfig.show_hourly;const i=++this._subVersion;if(this._weatherConfig.show_daily){const e=await this.hass.connection.subscribeMessage(t=>{this._forecastDaily=t.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});if(this._subVersion!==i)return void e();this._unsubDaily=e}if(this._weatherConfig.show_hourly){const e=await this.hass.connection.subscribeMessage(t=>{this._forecastHourly=t.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:t});if(this._subVersion!==i)return void e();this._unsubHourly=e}}_unsubForecasts(){this._subVersion++,this._unsubDaily?.(),this._unsubDaily=null,this._unsubHourly?.(),this._unsubHourly=null,this._subscribedEntity=""}_startClock(){this._stopClock(),this._updateClock(),this._clockInterval=window.setInterval(()=>this._updateClock(),1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=0)}_updateClock(){const t=new Date;var e,i;this._clockTime=be(t.getHours())+":"+be(t.getMinutes()),this._clockSec=":"+be(t.getSeconds()),this._clockDay=(e=t,i=this._lang,e.toLocaleDateString(i,{weekday:"long"})),this._clockDate=t.getDate()+" "+function(t,e){return t.toLocaleDateString(e,{month:"long"})}(t,this._lang)}_initCanvas(){if(this._resizeObserver?.disconnect(),this._resizeObserver=null,this._stopAnimation(),this._canvas=this.renderRoot.querySelector(".wc-anim"),!this._canvas)return;this._ctx=this._canvas.getContext("2d"),this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas());const t=this._canvas.parentElement;t&&this._resizeObserver.observe(t),this._resizeCanvas(),this._startAnimation()}_resizeCanvas(){if(!this._canvas||!this._ctx)return;const t=this._canvas.parentElement;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;this._cW=e.width,this._cH=e.height,this._canvas.width=this._cW*i,this._canvas.height=this._cH*i,this._canvas.style.width=this._cW+"px",this._canvas.style.height=this._cH+"px",this._ctx.setTransform(i,0,0,i,0,0)}_startAnimation(){this._spawnParticles(this._cachedCond||"cloudy"),this._animate()}_stopAnimation(){this._animId&&(cancelAnimationFrame(this._animId),this._animId=0)}_rnd(t,e){return t+Math.random()*(e-t)}_spawnParticles(t){this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:this._rnd(120,280),color:"rgba(167,139,250,"};const e=this._cW,i=this._cH;if(!e||!i)return;const s=(t,i,s,a,r,o)=>({type:"drop",x:this._rnd(0,e),y:this._rnd(-30,-5),len:this._rnd(i,s),speed:this._rnd(a,r),angle:o,color:t,opacity:this._rnd(.4,.7)}),a=()=>({type:"flake",x:this._rnd(0,e),y:this._rnd(-10,-3),r:this._rnd(1.5,3.5),speed:this._rnd(.4,1.2),drift:this._rnd(-.3,.3),phase:this._rnd(0,6.28),opacity:this._rnd(.3,.7)}),r=t=>({type:"mote",x:this._rnd(.1*e,.9*e),y:this._rnd(.3*i,.9*i),r:this._rnd(1,2.5),speed:this._rnd(.15,.4),drift:this._rnd(-.15,.15),phase:this._rnd(0,6.28),color:t,opacity:0,maxOp:this._rnd(.3,.7),life:0,maxLife:this._rnd(180,360)}),o=()=>({type:"star",x:this._rnd(.05*e,.95*e),y:this._rnd(.05*i,.7*i),r:this._rnd(.8,1.8),phase:this._rnd(0,6.28),speed:this._rnd(.008,.025)}),n=(t,s)=>({type:"cloud",x:this._rnd(-80,e),y:this._rnd(.05*i,.6*i),w:this._rnd(50,110),h:this._rnd(12,26),speed:this._rnd(.6*s,s),opacity:this._rnd(.6*t,t)}),l=()=>({type:"streak",x:this._rnd(-60,0),y:this._rnd(.1*i,.85*i),w:this._rnd(40,90),speed:this._rnd(2,5),opacity:this._rnd(.06,.14)}),c=()=>({type:"fog",x:this._rnd(-120,.5*e),y:this._rnd(.15*i,.75*i),w:this._rnd(80,160),h:this._rnd(18,35),speed:this._rnd(.2,.6),opacity:this._rnd(.02,.04)}),d=()=>({type:"hail",x:this._rnd(0,e),y:this._rnd(-15,-3),r:this._rnd(2,4),speed:this._rnd(3,5.5),opacity:this._rnd(.5,.8)}),h=this._particles;switch(t){case"sunny":for(let t=0;t<10;t++)h.push(r("rgba(251,191,36,"));break;case"clear_night":for(let t=0;t<14;t++)h.push(o());break;case"partly_cloudy":for(let t=0;t<3;t++)h.push(n(.035,.4));for(let t=0;t<4;t++)h.push(r("rgba(251,191,36,"));break;case"cloudy":for(let t=0;t<5;t++)h.push(n(.045,.35));break;case"foggy":for(let t=0;t<7;t++)h.push(c());break;case"rainy":for(let t=0;t<20;t++)h.push(s("rgba(96,165,250,",14,24,4,7,.14));for(let t=0;t<3;t++)h.push(n(.025,.3));break;case"pouring":for(let t=0;t<35;t++)h.push(s("rgba(59,130,246,",18,30,5.5,9,.1));for(let t=0;t<4;t++)h.push(n(.035,.35));break;case"stormy":for(let t=0;t<28;t++)h.push(s("rgba(167,139,250,",16,28,5,8,.26));for(let t=0;t<4;t++)h.push(n(.05,.5));this._flashState.interval=this._rnd(80,200);break;case"lightning":for(let t=0;t<4;t++)h.push(n(.04,.4));this._flashState.interval=this._rnd(60,160),this._flashState.color="rgba(192,132,252,";break;case"snowy":for(let t=0;t<18;t++)h.push(a());for(let t=0;t<3;t++)h.push(n(.025,.2));break;case"snowy_rainy":for(let t=0;t<10;t++)h.push(a());for(let t=0;t<14;t++)h.push(s("rgba(96,165,250,",12,20,3.5,6,.14));break;case"hail":for(let t=0;t<14;t++)h.push(d());for(let t=0;t<10;t++)h.push(s("rgba(96,165,250,",10,18,3.5,5.5,.14));break;case"windy":for(let t=0;t<8;t++)h.push(l());break;case"windy_variant":for(let t=0;t<6;t++)h.push(l());for(let t=0;t<4;t++)h.push(n(.035,1.2));break;case"exceptional":for(let t=0;t<8;t++)h.push(r("rgba(252,165,165,"));for(let t=0;t<5;t++)h.push(l())}}_updateParticle(t){const e=this._cW,i=this._cH;switch(t.type){case"drop":t.x=t.x+Math.sin(t.angle)*t.speed,t.y=t.y+Math.cos(t.angle)*t.speed,t.y>i+10&&(t.y=this._rnd(-30,-5),t.x=this._rnd(0,e));break;case"flake":t.y=t.y+t.speed,t.phase=t.phase+.02,t.x=t.x+t.drift+.3*Math.sin(t.phase),t.y>i+10&&(t.y=this._rnd(-10,-3),t.x=this._rnd(0,e));break;case"mote":{t.life=t.life+1,t.y=t.y-t.speed,t.x=t.x+t.drift+.2*Math.sin(t.phase+.015*t.life);const s=t.life/t.maxLife;t.opacity=s<.15?s/.15*t.maxOp:s>.85?(1-s)/.15*t.maxOp:t.maxOp,t.life>=t.maxLife&&(t.life=0,t.x=this._rnd(.1*e,.9*e),t.y=this._rnd(.3*i,.9*i),t.maxLife=this._rnd(180,360),t.maxOp=this._rnd(.3,.7));break}case"star":t.phase=t.phase+t.speed;break;case"cloud":t.x=t.x+t.speed,t.x>e+20&&(t.x=-t.w-this._rnd(10,60),t.y=this._rnd(.05*i,.6*i));break;case"streak":t.x=t.x+t.speed,t.x>e+20&&(t.x=this._rnd(-80,-20),t.y=this._rnd(.1*i,.85*i));break;case"fog":t.x=t.x+t.speed,t.x>e+40&&(t.x=-t.w-this._rnd(20,80),t.y=this._rnd(.15*i,.75*i));break;case"hail":t.y=t.y+t.speed,t.y>i+10&&(t.y=this._rnd(-15,-3),t.x=this._rnd(0,e))}}_drawParticle(t,e){switch(e.type){case"drop":{const i=Math.sin(e.angle)*e.len,s=Math.cos(e.angle)*e.len,a=t.createLinearGradient(e.x,e.y,e.x+i,e.y+s);a.addColorStop(0,e.color+"0)"),a.addColorStop(1,e.color+e.opacity+")"),t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(e.x+i,e.y+s),t.strokeStyle=a,t.lineWidth=1.5,t.stroke();break}case"flake":t.beginPath(),t.arc(e.x,e.y,e.r,0,6.28),t.fillStyle="rgba(255,255,255,"+e.opacity+")",t.fill();break;case"mote":t.beginPath(),t.arc(e.x,e.y,e.r,0,6.28),t.fillStyle=e.color+e.opacity+")",t.shadowColor=e.color+.5*e.opacity+")",t.shadowBlur=6,t.fill(),t.shadowBlur=0;break;case"star":{const i=.15+.75*(.5+.5*Math.sin(e.phase));t.beginPath(),t.arc(e.x,e.y,e.r,0,6.28),t.fillStyle="rgba(255,255,255,"+i+")",t.fill();break}case"cloud":{const i=e.h/2;t.beginPath(),t.moveTo(e.x+i,e.y),t.lineTo(e.x+e.w-i,e.y),t.arcTo(e.x+e.w,e.y,e.x+e.w,e.y+i,i),t.arcTo(e.x+e.w,e.y+e.h,e.x+e.w-i,e.y+e.h,i),t.lineTo(e.x+i,e.y+e.h),t.arcTo(e.x,e.y+e.h,e.x,e.y+i,i),t.arcTo(e.x,e.y,e.x+i,e.y,i),t.closePath(),t.fillStyle="rgba(255,255,255,"+e.opacity+")",t.fill();break}case"streak":{const i=t.createLinearGradient(e.x,e.y,e.x+e.w,e.y);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.5,"rgba(255,255,255,"+e.opacity+")"),i.addColorStop(1,"rgba(255,255,255,0)"),t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(e.x+e.w,e.y),t.strokeStyle=i,t.lineWidth=1,t.stroke();break}case"fog":{const i=e.h/2;t.beginPath(),t.moveTo(e.x+i,e.y),t.lineTo(e.x+e.w-i,e.y),t.arcTo(e.x+e.w,e.y,e.x+e.w,e.y+i,i),t.arcTo(e.x+e.w,e.y+e.h,e.x+e.w-i,e.y+e.h,i),t.lineTo(e.x+i,e.y+e.h),t.arcTo(e.x,e.y+e.h,e.x,e.y+i,i),t.arcTo(e.x,e.y,e.x+i,e.y,i),t.closePath(),t.fillStyle="rgba(255,255,255,"+e.opacity+")",t.fill();break}case"hail":t.beginPath(),t.arc(e.x,e.y,e.r,0,6.28),t.fillStyle="rgba(224,242,254,"+e.opacity+")",t.fill(),t.beginPath(),t.arc(e.x-.25*e.r,e.y-.25*e.r,.4*e.r,0,6.28),t.fillStyle="rgba(255,255,255,"+.3*e.opacity+")",t.fill()}}_updateFlash(){const t=this._flashState;t.timer++,t.on?(t.opacity*=.82,t.opacity<.02&&(t.on=!1,t.opacity=0,t.timer=0,t.interval=this._rnd(80,280))):t.timer>t.interval&&(t.on=!0,t.opacity=this._rnd(.12,.22))}_computeSparkline(t){const e=t.length;if(e<2)return{linePath:"",areaPath:"",nowY:32};let i=1/0,s=-1/0;for(const n of t)n.temperature<i&&(i=n.temperature),n.temperature>s&&(s=n.temperature);const a=s-i||1,r=t.map((t,i)=>({x:i/(e-1)*348,y:10+(s-t.temperature)/a*44}));let o=`M${r[0].x},${r[0].y}`;for(let n=0;n<r.length-1;n++){const t=r[Math.max(n-1,0)],e=r[n],i=r[Math.min(n+1,r.length-1)],s=r[Math.min(n+2,r.length-1)];o+=` C${e.x+(i.x-t.x)/6},${e.y+(i.y-t.y)/6} ${i.x-(s.x-e.x)/6},${i.y-(s.y-e.y)/6} ${i.x},${i.y}`}return{linePath:o,areaPath:o+" L348,64 L0,64 Z",nowY:r[0].y}}render(){this._lang;const t=this._getWeatherState();if(!t)return K`<div class="weather-card-wrap">
        ${this._weatherConfig.show_header?K`<div class="card-header"><span class="card-title">${It("weather.title")}</span></div>`:X}
        <div class="glass weather-card"><div class="card-inner" style="padding:20px;text-align:center;color:var(--t3);font-size:11px;">${It("common.no_entity")}</div></div>
      </div>`;const e=t.attributes,i=t.state,s=this._mapCondition(i),a=this._getConditionMeta(s),r=e.temperature??0,o=e.apparent_temperature,n=e.humidity,l=e.wind_speed,c=e.wind_speed_unit??"km/h",d=e.wind_bearing,h=e.pressure,p=e.visibility,u=e.uv_index,_=e.friendly_name??"",g=e.temperature_unit??"°C",f=this.hass?.states["sun.sun"],b=f?.attributes.next_rising,v=f?.attributes.next_setting,m=b?new Date(b).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",y=v?new Date(v).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",w=new Set(this._weatherConfig.hidden_metrics),x=this._forecastHourly.slice(0,10),k=this._computeSparkline(x),$=`background: radial-gradient(ellipse at 80% 20%, ${a.tint}, transparent 70%); opacity: ${a.tintOp};`;return K`
      <div class="weather-card-wrap">
        ${this._weatherConfig.show_header?K`
          <div class="card-header">
            <span class="card-title">${It("weather.title")}</span>
            <span class="card-location">${_}</span>
          </div>
        `:X}

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
                  <ha-icon .icon="${a.icon}" class="wc-cond-icon ${s}"></ha-icon>
                  <span class="wc-cond-text">${It(a.textKey)}</span>
                </div>
                ${null!=o?K`<span class="wc-feels">${It("weather.feels_like",{temp:Math.round(o)})}</span>`:X}
              </div>
            </div>

            <!-- Sparkline -->
            ${x.length>=2?K`
              <div class="wc-spark-zone">
                <svg class="wc-spark-svg" viewBox="0 0 348 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${a.sparkFill}" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  ${G`<path class="wc-spark-area" d="${k.areaPath}" fill="url(#sparkGrad)" />`}
                  ${G`<path class="wc-spark-line" d="${k.linePath}" stroke="${a.sparkStroke}" />`}
                </svg>
                <div class="wc-spark-now" style="left:0px;">
                  <div class="wc-spark-now-dot" style="top:${k.nowY/64*100}%"></div>
                </div>
                <div class="wc-spark-labels">
                  ${x.map((t,e)=>K`<span class="wc-spark-lbl">${e%2==0||e===x.length-1?0===e?It("weather.now"):new Date(t.datetime).getHours()+"h":""}</span>`)}
                </div>
              </div>
            `:X}

            <!-- Metrics -->
            ${this._renderMetrics(w,n,l,c,d,h,u,p,m,y)}

            <!-- Forecast -->
            ${this._renderForecasts(g)}

          </div>
        </div>
      </div>
    `}_renderMetrics(t,e,i,s,a,r,o,n,l,c){const d=[];var h;return t.has("humidity")||null==e||d.push(K`<div class="wc-metric humidity">
        <ha-icon icon="mdi:water-percent"></ha-icon>
        <span class="wc-metric-val">${e}%</span>
      </div>`),t.has("wind")||null==i||d.push(K`<div class="wc-metric wind">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        <span class="wc-metric-val">${Math.round(i)}</span>
        <span class="wc-metric-unit">${s}</span>
        <span class="wc-metric-dir">${h=a,null==h?"":fe[Math.round((+h%360+360)%360/22.5)%16]}</span>
      </div>`),t.has("pressure")||null==r||d.push(K`<div class="wc-metric pressure">
        <ha-icon icon="mdi:gauge"></ha-icon>
        <span class="wc-metric-val">${Math.round(r)}</span>
        <span class="wc-metric-unit">hPa</span>
      </div>`),t.has("uv")||null==o||d.push(K`<div class="wc-metric uv">
        <ha-icon icon="mdi:sun-wireless"></ha-icon>
        <span class="wc-metric-val">${Math.round(o)}</span>
        <span class="wc-metric-unit">UV</span>
      </div>`),t.has("visibility")||null==n||d.push(K`<div class="wc-metric visibility">
        <ha-icon icon="mdi:eye-outline"></ha-icon>
        <span class="wc-metric-val">${n}</span>
        <span class="wc-metric-unit">km</span>
      </div>`),!t.has("sunrise")&&l&&d.push(K`<div class="wc-metric sunrise">
        <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
        <span class="wc-metric-val">${l}</span>
      </div>`),!t.has("sunset")&&c&&d.push(K`<div class="wc-metric sunset">
        <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
        <span class="wc-metric-val">${c}</span>
      </div>`),0===d.length?X:K`<div class="wc-metrics">
      ${d}
    </div>`}_renderForecasts(t){const e=this._weatherConfig.show_daily,i=this._weatherConfig.show_hourly;return e||i?K`
      <div class="wc-forecast-zone">
        <div class="wc-fc-tabs">
          ${e?K`<button class="wc-fc-tab ${"daily"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("daily")}"
            aria-expanded="${"daily"===this._activeTab?"true":"false"}"
            aria-controls="wc-daily-panel"
            aria-label="${It("weather.daily_tab")}">${It("weather.daily_tab")}</button>`:X}
          ${i?K`<button class="wc-fc-tab ${"hourly"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("hourly")}"
            aria-expanded="${"hourly"===this._activeTab?"true":"false"}"
            aria-controls="wc-hourly-panel"
            aria-label="${It("weather.hourly_tab")}">${It("weather.hourly_tab")}</button>`:X}
        </div>

        <div class="wc-fold-sep ${"daily"===this._activeTab&&this._forecastDaily.length>0||"hourly"===this._activeTab&&this._forecastHourly.length>0?"visible":""}"></div>

        ${e?K`
          <div class="fold ${"daily"===this._activeTab?"open":""}" id="wc-daily-panel" role="region" aria-label="${It("weather.daily_tab")}" aria-hidden="${"daily"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-daily-list">
                ${this._forecastDaily.slice(0,7).map((t,e)=>{const i=this._mapCondition(t.condition),s=this._getConditionMeta(i),a=new Date(t.datetime),r=0===e?It("weather.today"):(o=a,n=this._lang,o.toLocaleDateString(n,{weekday:"short"}));var o,n;return K`
                    <div class="wc-day-row">
                      <span class="wc-day-label">${r}</span>
                      <ha-icon .icon="${s.icon}" class="wc-day-icon ${i}"></ha-icon>
                      <span class="wc-day-cond">${It(s.textKey)}</span>
                      <div class="wc-day-temps">
                        <span class="wc-day-hi">${Math.round(t.temperature)}&deg;</span>
                        ${null!=t.templow?K`<span class="wc-day-lo">${Math.round(t.templow)}&deg;</span>`:X}
                      </div>
                      <span class="wc-day-precip">${null!=t.precipitation_probability&&t.precipitation_probability>0?t.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:X}

        ${i?K`
          <div class="fold ${"hourly"===this._activeTab?"open":""}" id="wc-hourly-panel" role="region" aria-label="${It("weather.hourly_tab")}" aria-hidden="${"hourly"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-hourly-list">
                ${this._forecastHourly.slice(0,10).map((e,i)=>{const s=this._mapCondition(e.condition),a=this._getConditionMeta(s),r=new Date(e.datetime),o=0===i?It("weather.now"):r.getHours()+"h";return K`
                    <div class="wc-hour-row ${0===i?"now":""}">
                      <span class="wc-hour-time">${o}</span>
                      <ha-icon .icon="${a.icon}" class="wc-hour-icon ${s}"></ha-icon>
                      <span class="wc-hour-cond">${It(a.textKey)}</span>
                      <span class="wc-hour-temp">${Math.round(e.temperature)}${t}</span>
                      <span class="wc-hour-precip">${null!=e.precipitation_probability&&e.precipitation_probability>0?e.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:X}
      </div>
    `:X}_switchTab(t){this._activeTab=this._activeTab===t?null:t}}ue([St()],ve.prototype,"_activeTab"),ue([St()],ve.prototype,"_forecastDaily"),ue([St()],ve.prototype,"_forecastHourly"),ue([St()],ve.prototype,"_clockTime"),ue([St()],ve.prototype,"_clockSec"),ue([St()],ve.prototype,"_clockDay"),ue([St()],ve.prototype,"_clockDate");try{customElements.define("glass-weather-card",ve)}catch{}var me=Object.defineProperty,ye=(t,e,i,s)=>{for(var a,r=void 0,o=t.length-1;o>=0;o--)(a=t[o])&&(r=a(e,i,r)||r);return r&&me(e,i,r),r};const we=1,xe=2,ke=4,$e=8,Ce=128,Se={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains-closed"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"],awning:["mdi:awning-outline","mdi:awning-outline"],shade:["mdi:roller-shade-open","mdi:roller-shade"],window:["mdi:window-open","mdi:window-closed"],damper:["mdi:valve-open","mdi:valve"]},Te={vertical:{open:"mdi:arrow-up",close:"mdi:arrow-down",stop:"mdi:stop"},garage:{open:"mdi:garage-open",close:"mdi:garage",stop:"mdi:stop"},gate:{open:"mdi:gate-open",close:"mdi:gate",stop:"mdi:stop"},door:{open:"mdi:door-open",close:"mdi:door-closed",stop:null},damper:{open:"mdi:valve-open",close:"mdi:valve",stop:null},window:{open:"mdi:window-open",close:"mdi:window-closed",stop:null}};function Ee(t,e){return(Se[t]||Se.shutter)[e?0:1]}class Ae extends Mt{constructor(){super(...arguments),this._expanded=null,this._coverConfig={show_header:!0,dashboard_entities:[],presets:[0,25,50,75,100]},this._roomConfig=null,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1,this._throttleTimers=new Map}static{this.styles=[ut,_t,bt,gt,c`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    .cover-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6px 4px;
    }
    .cover-header-left { display: flex; align-items: center; gap: 8px; }
    .cover-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4);
    }
    .cover-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 18px; height: 18px; padding: 0 5px;
      border-radius: var(--radius-full); font-size: 10px; font-weight: 600;
      transition: all var(--t-med);
    }
    .cover-count.some { background: rgba(167,139,250,0.15); color: var(--cv-color, #a78bfa); }
    .cover-count.none { background: var(--s2); color: var(--t3); }
    .cover-count.all  { background: rgba(167,139,250,0.2); color: var(--cv-color, #a78bfa); }

    .cover-header-actions { display: flex; gap: 4px; }
    .header-btn {
      width: 28px; height: 28px; border-radius: var(--radius-sm);
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
    .header-btn:active { transform: scale(0.96); }
    .header-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .cover-card { position: relative; padding: 14px; }
    .card-inner {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; gap: 2px;
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
      padding: 8px 4px;
      border-radius: var(--radius-md);
      transition: background var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .cv-row:hover { background: var(--s1); }
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
    .cv-icon-btn:active { transform: scale(0.96); }
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
      width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
      background: var(--t4); transition: all var(--t-med);
    }
    .cv-row.open .cv-dot {
      background: var(--cv-color, #a78bfa); box-shadow: 0 0 8px rgba(167,139,250,0.4);
    }

    /* ── Fold ── */
    .fold-sep {
      height: 1px; margin: 0 12px;
      background: linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent);
      opacity: 0; transition: opacity 0.25s var(--ease-std, ease);
    }
    .fold-sep.visible { opacity: 1; }

    .ctrl-fold {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows var(--t-layout);
    }
    .ctrl-fold.open { grid-template-rows: 1fr; }
    .ctrl-fold-inner {
      overflow: hidden; opacity: 0;
      transition: opacity 0.25s var(--ease-std, ease);
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
    .transport-btn:active { transform: scale(0.96); }
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
    .chip:active { transform: scale(0.96); }
    .chip.active { border-color: rgba(167,139,250,0.15); background: rgba(167,139,250,0.1); color: var(--cv-color, #a78bfa); }

    .ctrl-sep { height: 1px; background: var(--b1); margin: 2px 0; }
  `]}connectedCallback(){super.connectedCallback(),this._listen("cover-config-changed",()=>this._loadConfig()),this._listen("room-config-changed",t=>{this.areaId&&t.areaId===this.areaId&&(this._roomConfig=null,this._loadRoomConfig(this.areaId))}),this._listen("dashboard-config-changed",()=>this._loadConfig())}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomLoading=!1;for(const t of this._throttleTimers.values())clearTimeout(t);this._throttleTimers.clear()}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._roomConfig=null),this._configLoaded||this._configLoading||(this._backend=new jt(this.hass),this._loadConfig())),t.has("areaId")&&this.areaId!==this._lastAreaId&&(this._lastAreaId=this.areaId,this._roomConfig=null,this._expanded=null,this.areaId&&this._loadRoomConfig(this.areaId))}getTrackedEntityIds(){return this._getCovers().map(t=>t.entityId)}async _loadConfig(){if(this._backend&&!this._configLoading){this._configLoading=!0;try{const t=await this._backend.send("get_config");t?.cover_card&&(this._coverConfig=t.cover_card),this._configLoaded=!0,this._configLoading=!1,this.requestUpdate()}catch{this._configLoading=!1}}}async _loadRoomConfig(t){if(this._backend&&!this._roomLoading){this._roomLoading=!0;try{const e=await this._backend.send("get_room",{area_id:t});this.areaId===t&&(this._roomConfig=e,this.requestUpdate())}catch{}finally{this._roomLoading=!1}}}_getCovers(){if(!this.hass)return[];let t;if(this.areaId){if(t=Rt(this.areaId,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("cover.")).map(t=>t.entity_id),this._roomConfig){const e=new Set(this._roomConfig.hidden_entities);t=t.filter(t=>!e.has(t));const i=this._roomConfig.entity_order;t.sort((t,e)=>{const s=i.indexOf(t),a=i.indexOf(e);return-1!==s&&-1!==a?s-a:-1!==s?-1:-1!==a?1:0})}}else t=this._coverConfig.dashboard_entities;return t.map(t=>{const e=this.hass?.states[t];return e?function(t,e){const i=e.attributes,s=i.device_class||"shutter",a=i.supported_features||0,r=i.current_position,o=i.current_tilt_position,n="open"===e.state||"opening"===e.state;return{entity:e,entityId:t,name:i.friendly_name||t.split(".")[1]||t,isOpen:n,position:r??null,tiltPosition:o??null,deviceClass:s,features:a}}(t,e):null}).filter(t=>null!==t)}_toggleCover(t,e){e.stopPropagation(),this.hass&&this.hass.callService("cover","toggle",{},{entity_id:t.entityId})}_openCover(t,e){e.stopPropagation(),this.hass&&this.hass.callService("cover","open_cover",{},{entity_id:t.entityId})}_closeCover(t,e){e.stopPropagation(),this.hass&&this.hass.callService("cover","close_cover",{},{entity_id:t.entityId})}_stopCover(t,e){e.stopPropagation(),this.hass&&this.hass.callService("cover","stop_cover",{},{entity_id:t.entityId})}_setPosition(t,e){if(!this.hass)return;const i=this._throttleTimers.get(t.entityId);i&&clearTimeout(i),this._throttleTimers.set(t.entityId,window.setTimeout(()=>{this._throttleTimers.delete(t.entityId),this.hass?.callService("cover","set_cover_position",{position:e},{entity_id:t.entityId})},50))}_setTiltPosition(t,e){if(!this.hass)return;const i=`${t.entityId}_tilt`,s=this._throttleTimers.get(i);s&&clearTimeout(s),this._throttleTimers.set(i,window.setTimeout(()=>{this._throttleTimers.delete(i),this.hass?.callService("cover","set_cover_tilt_position",{tilt_position:e},{entity_id:t.entityId})},50))}_openAll(){if(!this.hass)return;const t=this._getCovers();for(const e of t)e.features&we&&this.hass.callService("cover","open_cover",{},{entity_id:e.entityId})}_closeAll(){if(!this.hass)return;const t=this._getCovers();for(const e of t)e.features&xe&&this.hass.callService("cover","close_cover",{},{entity_id:e.entityId})}_setPreset(t,e,i){i.stopPropagation(),this.hass&&(t.features&ke?this.hass.callService("cover","set_cover_position",{position:e},{entity_id:t.entityId}):e>0?this.hass.callService("cover","open_cover",{},{entity_id:t.entityId}):this.hass.callService("cover","close_cover",{},{entity_id:t.entityId}))}_toggleExpand(t){this._expanded=this._expanded===t?null:t}_onSliderDown(t,e,i){i.stopPropagation();const s=i.currentTarget;s.setPointerCapture(i.pointerId);const a=i=>{const a=s.getBoundingClientRect(),r=Math.max(0,Math.min(100,Math.round((i.clientX-a.left)/a.width*100)));"position"===e?this._setPosition(t,r):this._setTiltPosition(t,r)};a(i);const r=t=>a(t),o=()=>{s.removeEventListener("pointermove",r),s.removeEventListener("pointerup",o),s.removeEventListener("pointercancel",o)};s.addEventListener("pointermove",r),s.addEventListener("pointerup",o),s.addEventListener("pointercancel",o)}render(){this._lang;const t=this._getCovers();if(0===t.length&&!this.areaId)return this.style.display="none",X;this.style.display="";const e=this._coverConfig.show_header,i=t.filter(t=>t.isOpen).length,s=t.length;return K`
      ${e?K`
        <div class="cover-header">
          <div class="cover-header-left">
            <span class="cover-title">${It("cover.title")}</span>
            <span class="cover-count ${0===i?"none":i===s?"all":"some"}">${i}/${s}</span>
          </div>
          <div class="cover-header-actions">
            <button class="header-btn" @click=${()=>this._openAll()} aria-label=${It("cover.open_all_aria")}>
              <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
            </button>
            <button class="header-btn" @click=${()=>this._closeAll()} aria-label=${It("cover.close_all_aria")}>
              <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
            </button>
          </div>
        </div>
      `:X}
      <div class="glass cover-card">
        <div class="tint" style="background:radial-gradient(ellipse at 50% 50%, var(--cv-color, #a78bfa), transparent 70%);opacity:${s>0?(i/s*.18).toFixed(3):"0"};"></div>
        <div class="card-inner">
          ${0===t.length?K`
            <div style="padding:16px;text-align:center;font-size:12px;color:var(--t4);">${It("config.cover_no_covers")}</div>
          `:X}
          ${t.map(t=>this._renderCoverRow(t))}
        </div>
      </div>
    `}_renderCoverRow(t){const e=this._expanded===t.entityId;return K`
      <div class="cv-row ${t.isOpen?"open":""}">
        <button
          class="cv-icon-btn"
          @click=${e=>this._toggleCover(t,e)}
          aria-label=${It("cover.toggle_aria",{name:t.name})}
        >
          <ha-icon .icon=${Ee(t.deviceClass,t.isOpen)}></ha-icon>
        </button>
        <button
          class="cv-expand-btn"
          @click=${()=>this._toggleExpand(t.entityId)}
          aria-expanded=${e?"true":"false"}
          aria-label=${It("cover.expand_aria",{name:t.name})}
        >
          <div class="cv-info">
            <div class="cv-name">${ft(t.name)}</div>
            <div class="cv-sub">
              <span class="cv-state-text">${function(t){switch(t){case"open":return It("cover.open");case"closed":return It("cover.closed");case"opening":return It("cover.opening");case"closing":return It("cover.closing");default:return t}}(t.entity.state)}</span>
            </div>
          </div>
          ${null!==t.position?K`
            <div class="cv-position">${t.position}<span class="unit">%</span></div>
          `:X}
          <div class="cv-dot"></div>
        </button>
      </div>
      ${e?K`<div class="fold-sep visible"></div>`:X}
      <div class="ctrl-fold ${e?"open":""}">
        <div class="ctrl-fold-inner">
          ${this._renderControls(t)}
        </div>
      </div>
      ${e?K`<div class="fold-sep visible"></div>`:X}
    `}_renderControls(t){const e=t.features,i=(s=t.deviceClass,["shutter","blind","shade","curtain","awning"].includes(s)?Te.vertical:Te[s]||Te.vertical);var s;const a=!!(e&ke),r=!!(e&Ce),o=[];if(a){const e=this._coverConfig.presets.length>0?this._coverConfig.presets:[0,25,50,75,100];for(const i of e){const e=i>=50,s=0===i?It("cover.preset_closed"):100===i?It("cover.preset_open"):`${i}%`;o.push({label:s,icon:Ee(t.deviceClass,e),position:i})}}else o.push({label:It("cover.preset_closed"),icon:Ee(t.deviceClass,!1),position:0},{label:It("cover.preset_open"),icon:Ee(t.deviceClass,!0),position:100});return K`
      <div class="ctrl-panel">
        <span class="ctrl-label">${t.name}</span>

        <!-- Transport -->
        <div class="transport-row">
          ${e&we?K`
            <button class="transport-btn ${100===t.position||null===t.position&&t.isOpen?"accent":""}"
              @click=${e=>this._openCover(t,e)}
              aria-label=${It("cover.open_aria",{name:t.name})}>
              <ha-icon .icon=${i.open}></ha-icon>
            </button>
          `:X}
          ${e&$e?K`
            <button class="transport-btn"
              @click=${e=>this._stopCover(t,e)}
              aria-label=${It("cover.stop_aria",{name:t.name})}>
              <ha-icon .icon=${i.stop||"mdi:stop"}></ha-icon>
            </button>
          `:X}
          ${e&xe?K`
            <button class="transport-btn ${0===t.position||null===t.position&&!t.isOpen?"accent":""}"
              @click=${e=>this._closeCover(t,e)}
              aria-label=${It("cover.close_aria",{name:t.name})}>
              <ha-icon .icon=${i.close}></ha-icon>
            </button>
          `:X}
        </div>

        <!-- Position slider -->
        ${a?K`
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${Ee(t.deviceClass,!1)}></ha-icon></div>
            <div class="slider" @pointerdown=${e=>this._onSliderDown(t,"position",e)}>
              <div class="slider-fill" style="width:${t.position??0}%;"></div>
              <div class="slider-thumb" style="left:${t.position??0}%;"></div>
              <div class="slider-val">${t.position??0}%</div>
            </div>
            <div class="slider-icon"><ha-icon .icon=${Ee(t.deviceClass,!0)}></ha-icon></div>
          </div>
        `:X}

        <!-- Tilt slider -->
        ${r?K`
          <span class="ctrl-label">${It("cover.tilt")}</span>
          <div class="slider-wrap">
            <div class="slider-icon"><ha-icon .icon=${"mdi:blinds"}></ha-icon></div>
            <div class="slider" @pointerdown=${e=>this._onSliderDown(t,"tilt",e)}>
              <div class="slider-fill" style="width:${t.tiltPosition??0}%;"></div>
              <div class="slider-thumb" style="left:${t.tiltPosition??0}%;"></div>
              <div class="slider-val">${t.tiltPosition??0}%</div>
            </div>
            <div class="slider-icon"><ha-icon .icon=${"mdi:blinds-open"}></ha-icon></div>
          </div>
        `:X}

        <!-- Presets -->
        <div class="ctrl-sep"></div>
        <div class="preset-row">
          ${o.map(e=>K`
            <button
              class="chip ${t.position===e.position?"active":""}"
              @click=${i=>this._setPreset(t,e.position,i)}
              aria-label=${e.label}
            >
              <ha-icon .icon=${e.icon}></ha-icon>
              <span>${e.label}</span>
            </button>
          `)}
        </div>
      </div>
    `}}ye([Ct()],Ae.prototype,"areaId"),ye([St()],Ae.prototype,"_expanded");try{customElements.define("glass-cover-card",Ae)}catch{}var Pe=Object.defineProperty;const Le={success:{text:"var(--c-success)",dot:"var(--c-success)",glow:"rgba(74,222,128,0.5)"},warning:{text:"var(--c-warning)",dot:"var(--c-warning)",glow:"rgba(251,191,36,0.5)"},info:{text:"var(--c-info)",dot:"var(--c-info)",glow:"rgba(96,165,250,0.5)"},accent:{text:"var(--c-accent)",dot:"var(--c-accent)",glow:"rgba(129,140,248,0.5)"},alert:{text:"var(--c-alert)",dot:"var(--c-alert)",glow:"rgba(248,113,113,0.5)"},neutral:{text:"var(--t3)",dot:"var(--t4)",glow:"none"}};class Ie extends Mt{constructor(){super(...arguments),this._cycling=!1,this._titleConfig={title:"",mode_entity:"",modes:[]},this._configLoaded=!1,this._configLoading=!1,this._loadVersion=0,this._lastModeId=null,this._pendingCycle=!1,this._cycleTimer=0,this._pendingTimer=0}static{this.styles=[ut,c`
    :host {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    .title-card {
      display: flex; flex-direction: column; align-items: center;
      gap: 6px; padding: 8px 16px;
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

    /* ── Mode row ── */
    .mode-row {
      display: flex; align-items: center; gap: 6px;
      cursor: pointer; padding: 4px 12px; outline: none;
      border: none; background: none; font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--radius-full);
      transition: all var(--t-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .mode-row:hover { background: var(--s1); }
    }
    .mode-row:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }
    .mode-row:active { transform: scale(0.96); }

    .mode-dot {
      width: 8px; height: 8px; border-radius: 50%;
      flex-shrink: 0;
      transition: all var(--t-med);
    }

    .mode-icon {
      display: flex; align-items: center; justify-content: center;
    }
    .mode-icon ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      transition: color var(--t-fast);
    }

    .mode-label {
      font-size: 11px; font-weight: 500; color: var(--t4);
      letter-spacing: 0.3px;
    }

    .mode-value {
      font-size: 11px; font-weight: 600;
      transition: color var(--t-fast), opacity var(--t-fast);
    }

    .mode-chevron ha-icon {
      --mdc-icon-size: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--t4);
    }

    /* Cycle animation */
    @keyframes mode-swap {
      0%   { opacity: 1; transform: translateY(0); }
      40%  { opacity: 0; transform: translateY(-6px); }
      60%  { opacity: 0; transform: translateY(6px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .mode-value.cycling { animation: mode-swap 0.3s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)); }
  `]}connectedCallback(){super.connectedCallback(),this._listen("title-config-changed",()=>this._loadConfig())}disconnectedCallback(){super.disconnectedCallback(),this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++,clearTimeout(this._cycleTimer),clearTimeout(this._pendingTimer)}updated(t){if(super.updated(t),t.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._configLoading=!1,this._loadVersion++),this._configLoaded||this._configLoading||(this._configLoading=!0,this._backend=new jt(this.hass),this._loadConfig()),this._pendingCycle&&this._titleConfig.mode_entity)){const t=this._getActiveMode(),e=t?.id??null;e!==this._lastModeId&&(this._lastModeId=e,this._cycling=!0,this._pendingCycle=!1,this._cycleTimer=window.setTimeout(()=>{this._cycling=!1},300))}}getTrackedEntityIds(){const t=this._titleConfig.mode_entity;return t?[t]:[]}async _loadConfig(){if(!this._backend)return;const t=this._loadVersion;try{const e=await this._backend.send("get_config");if(t!==this._loadVersion)return;e?.title_card&&(this._titleConfig=e.title_card),this._configLoaded=!0,this._configLoading=!1,this.requestUpdate()}catch{t===this._loadVersion&&(this._configLoading=!1)}}_getActiveMode(){const t=this._titleConfig.mode_entity;if(!t||!this.hass)return null;if(t.startsWith("input_select.")){const e=this.hass.states[t];if(!e)return null;const i=e.state,s=this._titleConfig.modes.find(t=>t.id===i);return{id:i,label:s?.label||i,icon:s?.icon||"",color:s?.color||"neutral"}}if(t.startsWith("input_boolean.")){const e=this.hass.states[t];if(!e)return null;const i="on"===e.state,s=t.split(".")[1]??t,a=this._titleConfig.modes.find(t=>t.id===s),r=a?.label||e.attributes.friendly_name||s;return{id:s,label:r,icon:a?.icon||"",color:i?a?.color||"success":"neutral"}}if(t.startsWith("scene.")){const e=this.hass.states[t];if(!e)return null;const i=t.split(".")[1]??t,s=this._titleConfig.modes.find(t=>t.id===i);return{id:i,label:s?.label||e.attributes.friendly_name||i,icon:s?.icon||"",color:s?.color||"accent"}}return null}_cycleMode(){const t=this._titleConfig.mode_entity;if(t&&this.hass&&!this._pendingCycle){if(t.startsWith("input_select."))this.hass.callService("input_select","select_next",{cycle:!0},{entity_id:t});else if(t.startsWith("input_boolean."))this.hass.callService("input_boolean","toggle",{},{entity_id:t});else{if(!t.startsWith("scene."))return;this.hass.callService("scene","turn_on",{},{entity_id:t})}this._lastModeId=this._getActiveMode()?.id??null,this._pendingCycle=!0,this._pendingTimer=window.setTimeout(()=>{this._pendingCycle=!1},2e3)}}render(){this._lang;const t=this._titleConfig.title;if(!t)return this.style.display="none",X;this.style.display="";const e=!!this._titleConfig.mode_entity,i=e?this._getActiveMode():null,s=function(t){if(Le[t])return Le[t];if(t.startsWith("#")&&7===t.length){const e=parseInt(t.slice(1,3),16),i=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);return{text:t,dot:t,glow:`rgba(${e},${i},${s},0.5)`}}return Le.neutral}(i?.color??"neutral");return K`
      <div class="title-card">
        <div class="title-text">${t}</div>
        ${e?K`
          <button
            class="mode-row"
            @click=${()=>this._cycleMode()}
            aria-label=${It("title_card.cycle_aria")}
          >
            <div class="mode-dot" style="background:${s.dot};box-shadow:0 0 6px ${s.glow};"></div>
            ${i?.icon?K`
              <span class="mode-icon">
                <ha-icon .icon=${i.icon}></ha-icon>
              </span>
            `:X}
            <span class="mode-label">${this._titleConfig.mode_entity?.startsWith("scene.")?It("title_card.scene_label"):It("title_card.mode_label")}</span>
            <span class="mode-value ${this._cycling?"cycling":""}" style="color:${s.text};">
              ${i?.label??It("title_card.mode_none")}
            </span>
            <span class="mode-chevron">
              <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
            </span>
          </button>
        `:X}
      </div>
    `}}((t,e,i)=>{for(var s,a=void 0,r=t.length-1;r>=0;r--)(s=t[r])&&(a=s(e,i,a)||a);a&&Pe(e,i,a)})([St()],Ie.prototype,"_cycling");try{customElements.define("glass-title-card",Ie)}catch{}var ze=Object.defineProperty,Oe=(t,e,i,s)=>{for(var a,r=void 0,o=t.length-1;o>=0;o--)(a=t[o])&&(r=a(e,i,r)||r);return r&&ze(e,i,r),r};function Me(t,e=300){const i=t.images??t.album?.images??[];if(0===i.length)return"";const s=[...i].sort((t,i)=>Math.abs((t.width??300)-e)-Math.abs((i.width??300)-e));return s[0]?.url??""}function Re(t){return t.artists?.length?t.artists.map(t=>t.name).join(", "):""}function De(t){switch(t){case"track":default:return"mdi:music-note";case"playlist":return"mdi:playlist-music";case"album":return"mdi:album";case"show":case"podcast":case"episode":return"mdi:podcast"}}class je extends Mt{constructor(){super(...arguments),this._view="library",this._tab="all",this._searchQuery="",this._playlists=[],this._recentlyPlayed=[],this._savedTracks=[],this._savedShows=[],this._searchResults={tracks:[],playlists:[],shows:[]},this._searchLoading=!1,this._searchOffset=0,this._searchHasMore=!1,this._drilldown=null,this._speakers=[],this._pickerItem=null,this._error=null,this._libraryLoading=!1,this._spotifyConfigured=null,this._spotifyConfig={entity_id:"",show_header:!0,sort_order:"recent_first",max_items_per_section:6},this._configLoaded=!1,this._configLoadingInProgress=!1,this._debounceTimer=0}static{this.styles=[ut,_t,c`
    :host { display: block; width: 100%; max-width: 500px; margin: 0 auto; }

    .spotify-card-wrap { display: flex; flex-direction: column; gap: 6px; }

    .card-header { display: flex; align-items: center; justify-content: space-between; padding: 0 6px; }
    .card-header-left { display: flex; align-items: center; gap: 8px; }
    .card-title {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--t4); display: flex; align-items: center; gap: 4px;
    }
    .card-title ha-icon { color: #1DB954; --mdc-icon-size: 14px; display: flex; align-items: center; justify-content: center; }

    .spotify-card { position: relative; width: 100%; padding: 14px; box-sizing: border-box; overflow: hidden; }
    .card-inner { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 10px; }

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
      width: 100%; height: 36px; padding: 0 12px 0 34px;
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
      position: absolute; top: 50%; right: 6px; transform: translateY(-50%);
      width: 24px; height: 24px; border-radius: 6px;
      background: transparent; border: none;
      display: none; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; outline: none;
    }
    .search-clear.visible { display: flex; }
    .search-clear ha-icon { --mdc-icon-size: 14px; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    @media (hover: hover) { .search-clear:hover { background: var(--s3); } }
    .search-clear:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

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
    .tab-btn:active { transform: scale(0.96); }
    .tab-btn.active { background: rgba(29,185,84,0.1); color: #1DB954; }
    .tab-btn + .tab-btn { border-left: 1px solid var(--b1); }

    /* Content area */
    .content-area {
      display: flex; flex-direction: column; gap: 6px;
      max-height: 380px; overflow-y: auto; scrollbar-width: none;
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
      flex-shrink: 0; background: none; border: none; width: 100%;
      font-family: inherit; text-align: left; color: inherit; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) { .result-row:hover { background: var(--s1); } }
    .result-row:active { transform: scale(0.99); }
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
    .result-play:active { transform: scale(0.92); }
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
    .playlist-card:active { transform: scale(0.97); }
    .playlist-card:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

    .playlist-art {
      width: 84px; height: 84px; border-radius: var(--radius-md);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative; transition: border-color var(--t-fast);
    }
    @media (hover: hover) { .playlist-card:hover .playlist-art { border-color: var(--b3); } }
    .playlist-art img { width: 100%; height: 100%; object-fit: cover; }
    .playlist-art ha-icon { --mdc-icon-size: 32px; color: var(--t4); display: flex; align-items: center; justify-content: center; }

    .playlist-name {
      font-size: 10px; font-weight: 600; color: var(--t2); line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .playlist-count { font-size: 9px; font-weight: 500; color: var(--t4); }

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
    .back-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: 2px; }

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
    .load-more-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    /* Speaker picker overlay */
    .picker-backdrop {
      position: fixed; inset: 0; z-index: 200;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 16px; opacity: 0; pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .picker-backdrop.visible { opacity: 1; pointer-events: auto; }

    .speaker-picker {
      width: 100%; max-width: 400px;
      padding: 16px;
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

    .picker-speakers { display: flex; flex-direction: column; gap: 4px; }
    .picker-speaker {
      display: flex; align-items: center; gap: 10px;
      padding: 8px; border-radius: var(--radius-md);
      background: var(--s1); border: 1px solid var(--b1);
      cursor: pointer; transition: all var(--t-fast);
      font-family: inherit; outline: none; width: 100%;
      -webkit-tap-highlight-color: transparent; color: inherit;
    }
    @media (hover: hover) { .picker-speaker:hover { background: var(--s3); border-color: var(--b2); } }
    .picker-speaker:active { transform: scale(0.98); }
    .picker-speaker:focus-visible { outline: 2px solid rgba(255,255,255,0.25); outline-offset: -2px; }

    .picker-speaker-icon {
      width: 32px; height: 32px; border-radius: var(--radius-sm);
      background: var(--s2); border: 1px solid var(--b1);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .picker-speaker-icon ha-icon { --mdc-icon-size: 16px; color: var(--t3); display: flex; align-items: center; justify-content: center; }
    .picker-speaker-name { flex: 1; font-size: 12px; font-weight: 600; color: var(--t2); }
    .picker-speaker-status { font-size: 9px; font-weight: 500; color: var(--t4); white-space: nowrap; }
    .picker-speaker-status.playing { color: rgba(29,185,84,0.6); }
    .picker-speaker-go ha-icon { --mdc-icon-size: 16px; color: var(--t4); display: flex; align-items: center; justify-content: center; }

    /* Loading spinner placeholder */
    .loading-text { font-size: 11px; color: var(--t4); text-align: center; padding: 16px 0; }
  `]}getTrackedEntityIds(){const t=this._getEntityId();return t?[t]:[]}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._spotifyConfig.entity_id)return this._spotifyConfig.entity_id;if(this.hass){const t=Object.keys(this.hass.states).find(t=>t.startsWith("media_player.spotify"));if(t)return t}return""}connectedCallback(){super.connectedCallback(),this._listen("spotify-config-changed",()=>{this._configLoaded=!1,this._loadConfig()})}disconnectedCallback(){super.disconnectedCallback(),this._debounceTimer&&clearTimeout(this._debounceTimer),this._backend=void 0,this._configLoaded=!1,this._configLoadingInProgress=!1}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||this._configLoadingInProgress||(this._backend=new jt(this.hass),this._loadConfig()))}async _loadConfig(){if(this._backend&&!this._configLoadingInProgress){this._configLoadingInProgress=!0;try{const t=await this._backend.send("get_config");t?.spotify_card&&(this._spotifyConfig=t.spotify_card),this._configLoaded=!0,this._configLoadingInProgress=!1,await this._checkSpotifyStatus(),this._spotifyConfigured&&this._loadLibrary(),this.requestUpdate()}catch{this._configLoadingInProgress=!1}}}async _checkSpotifyStatus(){if(this._backend)try{const t=await this._backend.send("spotify_status");this._spotifyConfigured=t?.configured??!1}catch{this._spotifyConfigured=!1}}async _loadLibrary(){if(!this._backend)return;this._libraryLoading=!0,this._error=null;const t=this._spotifyConfig.max_items_per_section;try{const[e,i,s,a]=await Promise.all([this._backend.send("spotify_browse",{category:"playlists",limit:t,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"recently_played",limit:t,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_tracks",limit:t,offset:0,sort_order:this._spotifyConfig.sort_order}),this._backend.send("spotify_browse",{category:"saved_shows",limit:t,offset:0,sort_order:this._spotifyConfig.sort_order})]);this._playlists=e?.items??[],this._recentlyPlayed=i?.items??[],this._savedTracks=s?.items??[],this._savedShows=(a?.items??[]).map(t=>t.show??t)}catch(e){this._handleApiError(e)}finally{this._libraryLoading=!1}}_onSearchInput(t){const e=t.target.value;if(this._searchQuery=e,this._debounceTimer&&clearTimeout(this._debounceTimer),0===e.length)return this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},void(this._searchOffset=0);this._view="search",this._debounceTimer=window.setTimeout(()=>this._doSearch(!1),300)}_clearSearch(){this._searchQuery="",this._view="library",this._searchResults={tracks:[],playlists:[],shows:[]},this._searchOffset=0}async _doSearch(t){if(!this._backend||!this._searchQuery)return;this._searchLoading=!0,this._error=null;const e=t?this._searchOffset:0;try{let i;i="tracks"===this._tab?["track"]:"playlists"===this._tab?["playlist"]:"podcasts"===this._tab?["show"]:["track","playlist","show"];const s=await this._backend.send("spotify_search",{query:this._searchQuery,types:i,limit:12,offset:e}),a=s?.tracks?.items??[],r=s?.playlists?.items??[],o=s?.shows?.items??[];this._searchResults=t?{tracks:[...this._searchResults.tracks,...a],playlists:[...this._searchResults.playlists,...r],shows:[...this._searchResults.shows,...o]}:{tracks:a,playlists:r,shows:o},this._searchOffset=e+12;const n=(s?.tracks?.total??0)+(s?.playlists?.total??0)+(s?.shows?.total??0),l=this._searchResults.tracks.length+this._searchResults.playlists.length+this._searchResults.shows.length;this._searchHasMore=l<n}catch(i){this._handleApiError(i)}finally{this._searchLoading=!1}}async _openDrilldown(t,e,i){this._view="drilldown",this._drilldown={title:i,type:t,id:e,items:[],total:0,offset:0,loading:!0},this._error=null;try{const i="playlist"===t?"playlist_tracks":"album_tracks",s=await this._backend.send("spotify_browse",{category:i,content_id:e,limit:20,offset:0,sort_order:this._spotifyConfig.sort_order});this._drilldown={...this._drilldown,items:s?.items??[],total:s?.total??0,offset:20,loading:!1}}catch(s){this._handleApiError(s),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}async _loadMoreDrilldown(){if(this._drilldown&&this._backend){this._drilldown={...this._drilldown,loading:!0};try{const t="playlist"===this._drilldown.type?"playlist_tracks":"album_tracks",e=await this._backend.send("spotify_browse",{category:t,content_id:this._drilldown.id,limit:20,offset:this._drilldown.offset,sort_order:this._spotifyConfig.sort_order});this._drilldown={...this._drilldown,items:[...this._drilldown.items,...e?.items??[]],offset:this._drilldown.offset+20,loading:!1}}catch(t){this._handleApiError(t),this._drilldown&&(this._drilldown={...this._drilldown,loading:!1})}}}_goBack(){this._drilldown=null,this._view=this._searchQuery?"search":"library"}_openPicker(t){this._pickerItem=t,this._view="speaker_picker",this.hass&&(this._speakers=Object.entries(this.hass.states).filter(([t])=>t.startsWith("media_player.")).map(([t,e])=>({entityId:t,name:e.attributes.friendly_name??t,state:e.state,mediaTitle:e.attributes.media_title??null})).sort((t,e)=>{const i=t=>"playing"===t?0:"paused"===t?1:2;return i(t.state)-i(e.state)}))}_closePicker(){this._pickerItem=null,this._view=this._drilldown?"drilldown":this._searchQuery?"search":"library"}async _playOnSpeaker(t){if(!this.hass||!this._pickerItem)return;const e=this._pickerItem,i=e.uri??`spotify:${e.type}:${e.id}`;try{await this.hass.callService("media_player","play_media",{media_content_id:i,media_content_type:"track"===e.type?"music":"playlist"===e.type?"playlist":"album"===e.type?"music":"podcast"},{entity_id:t}),"track"!==e.type&&"episode"!==e.type||!this._backend||this._seedRadioQueue(e)}catch{}this._closePicker()}async _seedRadioQueue(t){if(this._backend)try{const e=await this._backend.send("spotify_browse",{category:"recommendations",seed_tracks:[t.id],limit:20}),i=e?.tracks??[];for(const t of i){const e=t.uri??`spotify:track:${t.id}`;try{await this._backend.send("spotify_add_to_queue",{uri:e})}catch{break}}}catch{}}_handleApiError(t){const e=t;"spotify_not_configured"===e.code?this._spotifyConfigured=!1:e.message?.includes("rate limit")||e.message?.includes("429")?this._error=It("spotify.error_rate_limit",{seconds:"30"}):this._error=It("spotify.error_api")}render(){if(this._lang,!this._configLoaded)return X;const t=this._getEntityId();if(!1===this._spotifyConfigured)return this._renderShell(K`
        <div class="setup-banner">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <div class="setup-banner-text">${It("spotify.not_configured")}</div>
          <a class="setup-link" href="/config/integrations/dashboard" target="_blank">
            ${It("spotify.open_config")}
          </a>
        </div>
      `);if(!t)return this._renderShell(K`
        <div class="setup-banner">
          <ha-icon .icon=${"mdi:spotify"}></ha-icon>
          <div class="setup-banner-text">${It("spotify.no_entity")}</div>
          <a class="setup-link" href="/glass-cards" target="_blank">
            ${It("spotify.open_config")}
          </a>
        </div>
      `);const e="speaker_picker"===this._view&&this._pickerItem;return K`
      ${this._renderShell(K`
        ${this._error?K`<div class="error-banner">${this._error}</div>`:X}
        ${"drilldown"===this._view&&this._drilldown?this._renderDrilldown():K`
            ${this._renderSearch()}
            ${this._renderTabs()}
            <div class="content-area">
              ${"search"===this._view?this._renderSearchResults():this._renderLibrary()}
            </div>
          `}
      `)}
      ${e?this._renderSpeakerPicker():X}
    `}_renderShell(t){return K`
      <div class="spotify-card-wrap">
        ${this._spotifyConfig.show_header?K`
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title"><ha-icon .icon=${"mdi:spotify"}></ha-icon>${It("spotify.title")}</span>
            </div>
          </div>
        `:X}
        <div class="glass spotify-card">
          <div class="tint"></div>
          <div class="card-inner">${t}</div>
        </div>
      </div>
    `}_renderSearch(){return K`
      <div class="search-row">
        <div class="search-input-wrap">
          <div class="search-icon"><ha-icon .icon=${"mdi:magnify"}></ha-icon></div>
          <input
            class="search-input"
            type="text"
            placeholder=${It("spotify.search_placeholder")}
            .value=${this._searchQuery}
            @input=${this._onSearchInput}
          />
          <button
            class="search-clear ${this._searchQuery?"visible":""}"
            aria-label="Clear"
            @click=${this._clearSearch}
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        </div>
      </div>
    `}_renderTabs(){return K`
      <div class="tab-bar">
        ${[{id:"all",labelKey:"spotify.tab_all",icon:"mdi:home"},{id:"tracks",labelKey:"spotify.tab_tracks",icon:"mdi:music-note"},{id:"playlists",labelKey:"spotify.tab_playlists",icon:"mdi:playlist-music"},{id:"podcasts",labelKey:"spotify.tab_podcasts",icon:"mdi:podcast"}].map(t=>K`
          <button
            class="tab-btn ${this._tab===t.id?"active":""}"
            aria-label=${It(t.labelKey)}
            @click=${()=>{this._tab=t.id,this._searchQuery&&this._doSearch(!1)}}
          >
            <ha-icon .icon=${t.icon}></ha-icon>
            <span>${It(t.labelKey)}</span>
          </button>
        `)}
      </div>
    `}_renderLibrary(){if(this._libraryLoading)return K`<div class="loading-text">${It("spotify.loading")}</div>`;const t="all"===this._tab||"playlists"===this._tab,e="all"===this._tab||"tracks"===this._tab,i="all"===this._tab||"podcasts"===this._tab;return t&&this._playlists.length>0||e&&(this._recentlyPlayed.length>0||this._savedTracks.length>0)||i&&this._savedShows.length>0?K`
      ${t&&this._playlists.length>0?K`
        <div class="section-title">${It("spotify.my_playlists")}</div>
        <div class="playlist-scroll">
          ${this._playlists.map(t=>this._renderPlaylistCard(t))}
        </div>
      `:X}

      ${e&&this._recentlyPlayed.length>0?K`
        <div class="section-title">${It("spotify.recently_played")}</div>
        ${this._recentlyPlayed.map(t=>{const e=t.track??t;return this._renderResultRow(e,e.type??"track")})}
      `:X}

      ${e&&this._savedTracks.length>0?K`
        <div class="section-title">${It("spotify.saved_tracks")}</div>
        ${this._savedTracks.map(t=>{const e=t.track??t;return this._renderResultRow(e,"track")})}
      `:X}

      ${i&&this._savedShows.length>0?K`
        <div class="section-title">${It("spotify.followed_podcasts")}</div>
        ${this._savedShows.map(t=>this._renderResultRow({...t,type:"show"},"show"))}
      `:X}
    `:K`
        <div class="empty-state">
          <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
          <div class="empty-state-text">${It("spotify.no_content")}</div>
        </div>
      `}_renderPlaylistCard(t){const e=Me(t,160),i=t.tracks?.total??0;return K`
      <button
        class="playlist-card"
        aria-label=${t.name}
        @click=${()=>this._openDrilldown("playlist",t.id,t.name)}
      >
        <div class="playlist-art">
          ${e?K`<img src=${e} alt="" loading="lazy" />`:K`<ha-icon .icon=${"mdi:playlist-music"}></ha-icon>`}
        </div>
        <div class="playlist-name">${t.name}</div>
        ${i>0?K`<div class="playlist-count">${It("spotify.tracks_count",{count:String(i)})}</div>`:X}
      </button>
    `}_renderResultRow(t,e){const i=Me(t,64),s=Re(t)||(t.owner?.display_name??"");return K`
      <button
        class="result-row"
        @click=${()=>{"playlist"===e?this._openDrilldown("playlist",t.id,t.name):"album"===e?this._openDrilldown("album",t.id,t.name):this._openPicker(t)}}
      >
        <div class="result-art ${"show"===e||"episode"===e?"round":""}">
          ${i?K`<img src=${i} alt="" loading="lazy" />`:K`<ha-icon .icon=${De(e)}></ha-icon>`}
        </div>
        <div class="result-info">
          <div class="result-title">${t.name}</div>
          <div class="result-meta">
            <span class="result-type-badge">${It(function(t){switch(t){case"track":default:return"spotify.type_track";case"playlist":return"spotify.type_playlist";case"album":return"spotify.type_album";case"show":case"episode":return"spotify.type_podcast"}}(e))}</span>
            <span>${s}</span>
          </div>
        </div>
        <button
          class="result-play"
          aria-label=${It("spotify.play_aria",{name:t.name})}
          @click=${e=>{e.stopPropagation(),this._openPicker(t)}}
        >
          <ha-icon .icon=${"mdi:play"}></ha-icon>
        </button>
      </button>
    `}_renderSearchResults(){if(this._searchLoading&&0===this._searchOffset)return K`<div class="loading-text">${It("spotify.loading")}</div>`;const{tracks:t,playlists:e,shows:i}=this._searchResults,s=("all"===this._tab||"tracks"===this._tab)&&t.length>0,a=("all"===this._tab||"playlists"===this._tab)&&e.length>0,r=("all"===this._tab||"podcasts"===this._tab)&&i.length>0;return s||a||r?K`
      ${s?K`
        ${"all"===this._tab?K`<div class="section-title">${It("spotify.tab_tracks")}</div>`:X}
        ${t.map(t=>this._renderResultRow(t,"track"))}
      `:X}

      ${a?K`
        ${"all"===this._tab?K`<div class="section-title">${It("spotify.tab_playlists")}</div>`:X}
        ${e.map(t=>this._renderResultRow(t,"playlist"))}
      `:X}

      ${r?K`
        ${"all"===this._tab?K`<div class="section-title">${It("spotify.tab_podcasts")}</div>`:X}
        ${i.map(t=>this._renderResultRow({...t,type:"show"},"show"))}
      `:X}

      ${this._searchHasMore?K`
        <button class="load-more-btn" @click=${()=>this._doSearch(!0)} ?disabled=${this._searchLoading}>
          ${this._searchLoading?It("spotify.loading"):It("spotify.load_more")}
        </button>
      `:X}
    `:K`
        <div class="empty-state">
          <ha-icon .icon=${"mdi:music-note-off"}></ha-icon>
          <div class="empty-state-text">${It("spotify.no_results",{query:this._searchQuery})}</div>
        </div>
      `}_renderDrilldown(){const t=this._drilldown;return K`
      <button class="back-btn" @click=${this._goBack}>
        <ha-icon .icon=${"mdi:arrow-left"}></ha-icon>
        ${It("spotify.back")}
      </button>
      <div class="section-title">${t.title}</div>
      <div class="content-area">
        ${t.items.map(t=>{const e=t.track??t;return this._renderResultRow(e,e.type??"track")})}
        ${t.loading?K`<div class="loading-text">${It("spotify.loading")}</div>`:X}
        ${!t.loading&&t.items.length<t.total?K`
          <button class="load-more-btn" @click=${this._loadMoreDrilldown}>
            ${It("spotify.load_more")}
          </button>
        `:X}
      </div>
    `}_renderSpeakerPicker(){const t=this._pickerItem,e=Me(t,64),i=Re(t);return K`
      <div class="picker-backdrop visible" @click=${t=>{t.target.classList.contains("picker-backdrop")&&this._closePicker()}}>
        <div class="glass speaker-picker">
          <div class="picker-header">
            <div class="picker-title">${It("spotify.play_on")}</div>
            <button class="picker-close" aria-label="Close" @click=${this._closePicker}>
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>

          <div class="picker-track">
            <div class="picker-track-art">
              ${e?K`<img src=${e} alt="" />`:K`<ha-icon .icon=${De(t.type??"track")}></ha-icon>`}
            </div>
            <div class="picker-track-info">
              <div class="picker-track-title">${t.name}</div>
              ${i?K`<div class="picker-track-artist">${i}</div>`:X}
            </div>
          </div>

          <div class="picker-speakers">
            ${this._speakers.map(t=>K`
              <button class="picker-speaker" @click=${()=>this._playOnSpeaker(t.entityId)}>
                <div class="picker-speaker-icon">
                  <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                </div>
                <div class="picker-speaker-name">${t.name}</div>
                <div class="picker-speaker-status ${"playing"===t.state?"playing":""}">
                  ${"playing"===t.state&&t.mediaTitle?t.mediaTitle:"paused"===t.state?It("spotify.paused"):It("spotify.available")}
                </div>
                <div class="picker-speaker-go">
                  <ha-icon .icon=${"mdi:chevron-right"}></ha-icon>
                </div>
              </button>
            `)}
          </div>
        </div>
      </div>
    `}}Oe([St()],je.prototype,"_view"),Oe([St()],je.prototype,"_tab"),Oe([St()],je.prototype,"_searchQuery"),Oe([St()],je.prototype,"_playlists"),Oe([St()],je.prototype,"_recentlyPlayed"),Oe([St()],je.prototype,"_savedTracks"),Oe([St()],je.prototype,"_savedShows"),Oe([St()],je.prototype,"_searchResults"),Oe([St()],je.prototype,"_searchLoading"),Oe([St()],je.prototype,"_searchOffset"),Oe([St()],je.prototype,"_searchHasMore"),Oe([St()],je.prototype,"_drilldown"),Oe([St()],je.prototype,"_speakers"),Oe([St()],je.prototype,"_pickerItem"),Oe([St()],je.prototype,"_error"),Oe([St()],je.prototype,"_libraryLoading"),Oe([St()],je.prototype,"_spotifyConfigured");try{customElements.define("glass-spotify-card",je)}catch{}function He(){window.dispatchEvent(new Event("ll-rebuild"))}!function(){if(e)return;e=!0;const a=history.pushState,r=history.replaceState;history.pushState=function(e,s,r){if(a.call(this,e,s,r),!i){i=!0;try{window.dispatchEvent(new Event("location-changed")),t.emit("location-changed",void 0)}finally{i=!1}}},history.replaceState=function(e,s,a){if(r.call(this,e,s,a),!i){i=!0;try{window.dispatchEvent(new Event("location-changed")),t.emit("location-changed",void 0)}finally{i=!1}}},window.addEventListener("popstate",s)}(),xt||(xt=new wt),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(He)):requestAnimationFrame(He),window.addEventListener("connection-status",t=>{"connected"===t.detail&&setTimeout(He,500)})}();
