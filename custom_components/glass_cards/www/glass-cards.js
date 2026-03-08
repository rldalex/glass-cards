!function(){"use strict";const t=new class{constructor(){this.listeners=new Map}on(t,e){let i=this.listeners.get(t);return i||(i=new Set,this.listeners.set(t,i)),i.add(e),()=>this.off(t,e)}off(t,e){this.listeners.get(t)?.delete(e)}emit(t,e){this.listeners.get(t)?.forEach(t=>t(e))}};let e=!1;function i(){t.emit("location-changed",void 0)}const s=globalThis,a=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const l=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,r)},c=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:g,getPrototypeOf:_}=Object,m=globalThis,b=m.trustedTypes,f=b?b.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},x=(t,e)=>!d(t,e),$={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),a=s.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const r=this.constructor;if(!1===s&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??x)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,v?.({ReactiveElement:k}),(m.reactiveElementVersions??=[]).push("2.1.2");const C=globalThis,S=t=>t,A=C.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+P,O=`<${I}>`,M=document,L=()=>M.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,D="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,F=/>/g,U=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,V=/"/g,K=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=B(1),W=B(2),G=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Y=new WeakMap,J=M.createTreeWalker(M,129);function Z(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const n=t.length-1,o=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let o=0;o<i;o++){const e=t[o];let i,l,c=-1,d=0;for(;d<e.length&&(n.lastIndex=d,l=n.exec(e),null!==l);)d=n.lastIndex,n===H?"!--"===l[1]?n=N:void 0!==l[1]?n=F:void 0!==l[2]?(K.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=U):void 0!==l[3]&&(n=U):n===U?">"===l[0]?(n=a??H,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,i=l[1],n=void 0===l[3]?U:'"'===l[3]?V:j):n===V||n===j?n=U:n===N||n===F?n=H:(n=U,a=void 0);const h=n===U&&t[o+1].startsWith("/>")?" ":"";r+=n===H?e+O:c>=0?(s.push(i),e.slice(0,c)+T+e.slice(c)+P+h):e+P+(-2===c?o:h)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=Q.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(T)){const e=c[r++],i=s.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?at:"?"===n[1]?rt:"@"===n[1]?nt:st}),s.removeAttribute(t)}else t.startsWith(P)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(K.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),J.nextNode(),o.push({type:2,index:++a});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===I)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)o.push({type:7,index:a}),t+=P.length-1}a++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function tt(t,e,i=t,s){if(e===G)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=R(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=tt(t,a._$AS(t,e.values),a,s)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);J.currentNode=s;let a=J.nextNode(),r=0,n=0,o=i[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new it(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new ot(a,this,t)),this._$AV.push(e),o=i[++n]}r!==o?.index&&(a=J.nextNode(),r++)}return J.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class it{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),R(t)?t===X||null==t||""===t?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new et(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Q(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new it(this.O(L()),this.O(L()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class st{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=X}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=tt(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==G,r&&(this._$AH=t);else{const s=t;let n,o;for(t=a[0],n=0;n<a.length-1;n++)o=tt(this,s[i+n],e,n),o===G&&(o=this._$AH[n]),r||=!R(o)||o!==this._$AH[n],o===X?t=X:t!==X&&(t+=(o??"")+a[n+1]),this._$AH[n]=o}r&&!s&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class at extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class rt extends st{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class nt extends st{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??X)===G)return;const i=this._$AH,s=t===X&&i!==X||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==X&&(i===X||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}}const lt=C.litHtmlPolyfillSupport;lt?.(Q,it),(C.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;class dt extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new it(e.insertBefore(L(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}dt._$litElement$=!0,dt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:dt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:dt}),(ct.litElementVersions??=[]).push("4.2.2");const pt=l`
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
`,ut=l`
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
`,gt=l`
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
`;const _t=l`
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
`,mt={morning:{body:"#0f1923",blobTop:"#1a6b8a",blobBottom:"#2d8a6e"},day:{body:"#111827",blobTop:"#3b6fa0",blobBottom:"#4a90a0"},evening:{body:"#1a1118",blobTop:"#8a4a2d",blobBottom:"#6b3a5a"},night:{body:"#0a0e1a",blobTop:"#1a2040",blobBottom:"#2a1a3a"}},bt="glass-cards-ambient-bg",ft=`\n  #${bt} {\n    position: fixed;\n    inset: 0;\n    z-index: 0;\n    pointer-events: none;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${bt}::before,\n  #${bt}::after {\n    content: '';\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(120px);\n    opacity: 0.4;\n    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  #${bt}::before {\n    width: 600px;\n    height: 600px;\n    top: -200px;\n    right: -100px;\n    background: var(--ambient-blob-top, #3b6fa0);\n  }\n  #${bt}::after {\n    width: 500px;\n    height: 500px;\n    bottom: -150px;\n    left: -100px;\n    background: var(--ambient-blob-bottom, #4a90a0);\n  }\n`;class vt{constructor(){this.period="day",this.ambientEl=null,this.styleEl=null,this.cleanup=t.on("ambient-update",t=>{this.period=t.period,this.applyAmbient()}),this._injectAmbientBg(),this.applyAmbient()}get currentPeriod(){return this.period}applyAmbient(t){t&&(this.period=t);const e=mt[this.period],i=document.documentElement;i.style.setProperty("--ambient-body",e.body),i.style.setProperty("--ambient-blob-top",e.blobTop),i.style.setProperty("--ambient-blob-bottom",e.blobBottom),this.ambientEl&&(this.ambientEl.style.background=e.body)}_injectAmbientBg(){document.documentElement.style.background="transparent",document.getElementById(bt)?this.ambientEl=document.getElementById(bt):(this.styleEl=document.createElement("style"),this.styleEl.textContent=ft,document.head.appendChild(this.styleEl),this.ambientEl=document.createElement("div"),this.ambientEl.id=bt,document.body.prepend(this.ambientEl))}destroy(){this.cleanup?.(),this.ambientEl?.remove(),this.ambientEl=null,this.styleEl?.remove(),this.styleEl=null,document.documentElement.style.removeProperty("background"),yt===this&&(yt=null)}}let yt=null;const wt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:x},xt=(t=wt,e,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function $t(t){return(e,i)=>"object"==typeof i?xt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function kt(t){return $t({...t,state:!0,attribute:!1})}const Ct={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",preset_aria:"Ambiance {label}",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",preset_relax:"Relax",preset_focus:"Focus",preset_film:"Film",preset_night:"Nuit",dashboard_title_one:"1 LUMIÈRE ALLUMÉE",dashboard_title:"{count} LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:{title:"Configuration",brand:"GLASS CARDS",tab_navbar:"Barre de nav",tab_popup:"Popup Pièce",tab_light:"Carte Lumières",preview:"Aperçu",navbar_behavior:"Comportement",navbar_auto_sort:"Tri automatique",navbar_auto_sort_desc:"Les pièces actives remontent en premier",navbar_rooms_banner:"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.",navbar_visible_rooms:"Pièces visibles",navbar_empty_rooms:"Pièces vides",navbar_empty_rooms_desc:"Ces pièces n'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu'elles apparaissent dans la navbar.",navbar_indicators:"Indicateurs",navbar_indicators_desc:"Activez ou désactivez les indicateurs visuels sur la navbar.",navbar_ind_lights:"Lumières allumées",navbar_ind_lights_desc:"Glow doré sur l'icône",navbar_ind_temp:"Température",navbar_ind_temp_desc:"Badge chaud / froid",navbar_ind_humidity:"Humidité",navbar_ind_humidity_desc:"Barre bleue en bas",navbar_ind_media:"Média en lecture",navbar_ind_media_desc:"Bounce de l'icône",navbar_thresholds:"Seuils",navbar_thresholds_desc:"Définissez les seuils pour les alertes de température et d'humidité.",navbar_temp_high:"Température haute",navbar_temp_low:"Température basse",navbar_humidity_threshold:"Seuil humidité",navbar_choose_icon:"Choisir icône",navbar_change_icon_aria:"Changer l'icône de {name}",navbar_icon_label:"Icône — {name}",popup_room:"Pièce",popup_room_desc:"Sélectionnez une pièce pour configurer l'ordre et la visibilité de ses cartes internes.",popup_internal_cards:"Cartes internes",popup_internal_cards_desc:"Ordonnez les cartes affichées dans le popup de cette pièce.",popup_scenes:"Scènes",popup_scenes_desc:"Réordonnez et masquez les scènes affichées en haut du popup.",popup_select_room:"Sélectionnez une pièce",light_room:"Pièce",light_room_desc:"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d'affichage.",light_list_title:"Lumières",light_list_banner:"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.",light_no_lights:"Aucune lumière dans cette pièce.",light_no_visible:"Aucune lumière visible",light_select_room:"Sélectionnez une pièce",light_change_layout_aria:"Changer le layout",light_layout_compact:"COMPACT",light_layout_full:"PLEIN",light_schedule_hint:"Appuyez sur l'icône calendrier de chaque lumière pour définir des périodes de visibilité.",light_schedule_aria:"Gérer la planification de visibilité de {name}",light_schedule_title:"Planification de visibilité",light_schedule_start:"Début",light_schedule_end:"Fin",light_schedule_recurring:"Annuel",light_schedule_add:"Ajouter une période",light_schedule_delete_aria:"Supprimer la période",light_schedule_no_date:"Choisir une date…",light_schedule_confirm:"Confirmer",light_schedule_prev_month_aria:"Mois précédent",light_schedule_next_month_aria:"Mois suivant",light_dashboard_vs_room:"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.",domain_light:"Lumières",domain_light_desc:"Contrôle des lumières",domain_media_player:"Média",domain_media_player_desc:"Lecteurs multimédias",domain_climate:"Climat",domain_climate_desc:"Thermostats et climatisation",domain_fan:"Ventilateur",domain_fan_desc:"Ventilation",domain_cover:"Volets",domain_cover_desc:"Stores et volets roulants",domain_vacuum:"Aspirateur",domain_vacuum_desc:"Robots aspirateurs",tab_weather:"Carte Météo",weather_entity:"Entité météo",weather_entity_desc:"Sélectionnez l'entité météo à afficher sur la carte.",weather_metrics:"Métriques visibles",weather_metrics_desc:"Activez ou désactivez les métriques affichées sur la carte.",weather_forecasts:"Onglets prévisions",weather_forecasts_desc:"Activez ou désactivez les onglets de prévisions.",weather_metric_humidity:"Humidité",weather_metric_wind:"Vent",weather_metric_pressure:"Pression",weather_metric_uv:"UV",weather_metric_visibility:"Visibilité",weather_metric_sunrise:"Lever du soleil",weather_metric_sunset:"Coucher du soleil",weather_daily:"Prévisions 7 jours",weather_hourly:"Prévisions horaires",weather_select_entity:"Sélectionnez une entité météo",tab_dashboard:"Tableau de bord",dashboard_title:"Cartes du tableau de bord",dashboard_desc:"Activez ou désactivez les cartes affichées sur le tableau de bord Home Assistant.",dashboard_card_weather:"Carte Météo",dashboard_card_weather_desc:"Affiche la météo actuelle, prévisions et animations",dashboard_card_light:"Carte Lumières",dashboard_card_light_desc:"Contrôle des lumières par pièce"}},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",preset_aria:"Preset {label}",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",preset_relax:"Relax",preset_focus:"Focus",preset_film:"Film",preset_night:"Night",dashboard_title_one:"1 LIGHT ON",dashboard_title:"{count} LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:{title:"Configuration",brand:"GLASS CARDS",tab_navbar:"Navbar",tab_popup:"Room Popup",tab_light:"Light Card",preview:"Preview",navbar_behavior:"Behavior",navbar_auto_sort:"Auto sort",navbar_auto_sort_desc:"Active rooms move to the top",navbar_rooms_banner:"Drag to reorder rooms. Toggle to hide.",navbar_visible_rooms:"Visible rooms",navbar_empty_rooms:"Empty rooms",navbar_empty_rooms_desc:"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.",navbar_indicators:"Indicators",navbar_indicators_desc:"Enable or disable visual indicators on the navbar.",navbar_ind_lights:"Lights on",navbar_ind_lights_desc:"Golden glow on icon",navbar_ind_temp:"Temperature",navbar_ind_temp_desc:"Hot / cold badge",navbar_ind_humidity:"Humidity",navbar_ind_humidity_desc:"Blue bar at bottom",navbar_ind_media:"Media playing",navbar_ind_media_desc:"Icon bounce",navbar_thresholds:"Thresholds",navbar_thresholds_desc:"Set thresholds for temperature and humidity alerts.",navbar_temp_high:"High temperature",navbar_temp_low:"Low temperature",navbar_humidity_threshold:"Humidity threshold",navbar_choose_icon:"Choose icon",navbar_change_icon_aria:"Change icon for {name}",navbar_icon_label:"Icon — {name}",popup_room:"Room",popup_room_desc:"Select a room to configure the order and visibility of its internal cards.",popup_internal_cards:"Internal cards",popup_internal_cards_desc:"Order the cards displayed in this room's popup.",popup_scenes:"Scenes",popup_scenes_desc:"Reorder and hide scenes shown at the top of the popup.",popup_select_room:"Select a room",light_room:"Room",light_room_desc:"Select a room to configure its lights: order, visibility and display mode.",light_list_title:"Lights",light_list_banner:"Drag to reorder. The layout button toggles between full width and compact.",light_no_lights:"No lights in this room.",light_no_visible:"No visible lights",light_select_room:"Select a room",light_change_layout_aria:"Change layout",light_layout_compact:"COMPACT",light_layout_full:"FULL",light_schedule_hint:"Tap the calendar icon on each light to set visibility periods.",light_schedule_aria:"Manage visibility schedule for {name}",light_schedule_title:"Visibility schedule",light_schedule_start:"Start",light_schedule_end:"End",light_schedule_recurring:"Annually",light_schedule_add:"Add period",light_schedule_delete_aria:"Delete period",light_schedule_no_date:"Select date…",light_schedule_confirm:"Confirm",light_schedule_prev_month_aria:"Previous month",light_schedule_next_month_aria:"Next month",light_dashboard_vs_room:"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.",domain_light:"Lights",domain_light_desc:"Light control",domain_media_player:"Media",domain_media_player_desc:"Media players",domain_climate:"Climate",domain_climate_desc:"Thermostats and air conditioning",domain_fan:"Fan",domain_fan_desc:"Ventilation",domain_cover:"Covers",domain_cover_desc:"Blinds and shutters",domain_vacuum:"Vacuum",domain_vacuum_desc:"Robot vacuums",tab_weather:"Weather Card",weather_entity:"Weather entity",weather_entity_desc:"Select the weather entity to display on the card.",weather_metrics:"Visible metrics",weather_metrics_desc:"Enable or disable metrics shown on the card.",weather_forecasts:"Forecast tabs",weather_forecasts_desc:"Enable or disable forecast tabs.",weather_metric_humidity:"Humidity",weather_metric_wind:"Wind",weather_metric_pressure:"Pressure",weather_metric_uv:"UV",weather_metric_visibility:"Visibility",weather_metric_sunrise:"Sunrise",weather_metric_sunset:"Sunset",weather_daily:"7-day forecast",weather_hourly:"Hourly forecast",weather_select_entity:"Select a weather entity",tab_dashboard:"Dashboard",dashboard_title:"Dashboard cards",dashboard_desc:"Enable or disable the cards displayed on the Home Assistant dashboard.",dashboard_card_weather:"Weather Card",dashboard_card_weather_desc:"Current weather, forecasts and animations",dashboard_card_light:"Light Card",dashboard_card_light_desc:"Room-by-room light controls"}}},St="fr";let At=St;function Et(t){const e=t.slice(0,2).toLowerCase(),i=e in Ct?e:St;return i!==At&&(At=i,!0)}function Tt(){return At}function Pt(t,e){const i=t.indexOf("."),s=-1===i?t:t.slice(0,i),a=-1===i?"":t.slice(i+1),r=Ct[At]??Ct[St],n=Ct[St],o=r?.[s]?.[a]??n?.[s]?.[a];let l="string"==typeof o?o:t;if(e)for(const[c,d]of Object.entries(e))l=l.replaceAll(`{${c}}`,String(d));return l}var It=Object.defineProperty,Ot=(t,e,i,s)=>{for(var a,r=void 0,n=t.length-1;n>=0;n--)(a=t[n])&&(r=a(e,i,r)||r);return r&&It(e,i,r),r};class Mt extends dt{constructor(){super(...arguments),this._lang=Tt(),this._busCleanups=[]}setConfig(t){this._config=t}shouldUpdate(t){if(!t.has("hass"))return!0;if(t.size>1)return!0;const e=t.get("hass");if(!e)return!0;if(e.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(t=>e.states[t]!==this.hass?.states[t])}updated(t){super.updated(t),t.has("hass")&&this.hass?.language&&Et(this.hass.language)&&(this._lang=Tt())}getTrackedEntityIds(){const t=this._config?.entity;return t?[t]:[]}_listen(e,i){this._busCleanups.push(t.on(e,i))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(t=>t()),this._busCleanups=[]}}function Lt(t,e,i){return Object.values(e).filter(e=>!e.disabled_by&&!e.hidden_by&&function(t,e){if(t.area_id)return t.area_id;if(t.device_id&&e){const i=e[t.device_id];if(i?.area_id)return i.area_id}return null}(e,i)===t)}function Rt(t,e){if(!e)return!0;const i=e[t];if(!i||0===i.periods.length)return!0;const s=new Date;return i.periods.some(t=>{const e=new Date(t.start),i=new Date(t.end);if(i.setSeconds(59,999),t.recurring){const t=new Date(s.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes()),a=new Date(s.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),59,999);return t>a?s>=t||s<=a:s>=t&&s<=a}return s>=e&&s<=i})}Ot([$t({attribute:!1})],Mt.prototype,"hass"),Ot([kt()],Mt.prototype,"_lang");class zt{constructor(t){this.connection=t.connection}send(t,e={}){return this.connection.sendMessagePromise({type:`glass_cards/${t}`,...e})}subscribe(t,e,i={}){return this.connection.subscribeMessage(e,{type:`glass_cards/${t}`,...i})}}var Dt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,Nt=(t,e,i,s)=>{for(var a,r=s>1?void 0:s?Ht(e,i):e,n=t.length-1;n>=0;n--)(a=t[n])&&(r=(s?a(e,i,r):a(r))||r);return s&&r&&Dt(e,i,r),r};class Ft extends dt{constructor(){super(...arguments),this._lang=Tt()}set hass(t){this._hass=t,t?.language&&Et(t.language)&&(this._lang=Tt())}get hass(){return this._hass}setConfig(t){this._config=t}static{this.styles=[pt,l`
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
      @media (hover: hover) {
        .redirect a:hover {
          text-decoration: underline;
        }
      }
      ha-icon {
        --mdc-icon-size: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }
    `]}render(){return this._lang,q`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${Pt("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${Pt("editor.open_config")}</a>
        </p>
      </div>
    `}}Nt([$t({attribute:!1})],Ft.prototype,"hass",1),Nt([kt()],Ft.prototype,"_lang",2),customElements.get("glass-light-card-editor")||customElements.define("glass-light-card-editor",Ft);var Ut=Object.defineProperty,jt=(t,e,i,s)=>{for(var a,r=void 0,n=t.length-1;n>=0;n--)(a=t[n])&&(r=a(e,i,r)||r);return r&&Ut(e,i,r),r};const Vt=[[3e3,"light.temp_warm","#ffd4a3"],[4e3,"light.temp_warm","#ffedb3"],[4800,"light.temp_neutral","#fff5e6"],[9999,"light.temp_cold","#e0ecf5"]],Kt=[[251,191,36],[248,113,113],[244,114,182],[167,139,250],[129,140,248],[96,165,250],[74,222,128],[240,240,240]],Bt=[{key:"relax",labelKey:"light.preset_relax",dotColor:"#ff9d4d",brightness:50,temp:2700,rgb:[251,191,36]},{key:"focus",labelKey:"light.preset_focus",dotColor:"#e0ecf5",brightness:100,temp:5500,rgb:[96,165,250]},{key:"film",labelKey:"light.preset_film",dotColor:"#ff7b3a",brightness:25,temp:2400,rgb:[248,113,113]},{key:"nuit",labelKey:"light.preset_night",dotColor:"#ffd4a3",brightness:10,temp:2200,rgb:[167,139,250]}];function qt(t){for(const[e,i,s]of Vt)if(t<e)return{label:Pt(i),color:s};return{label:Pt("light.temp_cold"),color:"#e0ecf5"}}function Wt(t){return"#"+t.map(t=>t.toString(16).padStart(2,"0")).join("")}function Gt(t,e){return`rgba(${t[0]},${t[1]},${t[2]},${e})`}class Xt extends Mt{constructor(){super(...arguments),this._expandedEntity=null,this._activePresets=new Map,this._dragValues=new Map,this._throttleTimers=new Map,this._roomConfig=null,this._roomConfigLoaded=!1,this._schedules=null,this._schedulesLoaded=!1}static getConfigElement(){return document.createElement("glass-light-card-editor")}get _isDashboardMode(){return!(this.areaId||this._config?.area)&&!this._config?.entity}static{this.styles=[pt,ut,_t,gt,l`
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
        font-size: 9px;
        font-weight: 700;
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
      @media (hover: hover) {
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
        overflow: hidden;
      }
      .slider-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
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

      /* ── Color Dots ── */
      .color-dots-row {
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
      @media (hover: hover) {
        .cdot:hover {
          transform: scale(1.15);
        }
      }
      .cdot:active {
        transform: scale(1.1);
      }
      .cdot.active {
        border-color: rgba(255, 255, 255, 0.6);
      }

      /* ── Preset Chips ── */
      .preset-row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: var(--radius-md);
        border: 1px solid var(--b2);
        background: var(--s1);
        font-family: inherit;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--t3);
        cursor: pointer;
        outline: none;
        transition: all var(--t-fast);
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .chip:hover {
          background: var(--s3);
          color: var(--t2);
          border-color: var(--b3);
        }
      }
      .chip:active {
        background: var(--s3);
      }
      .chip.active {
        border-color: rgba(251, 191, 36, 0.2);
        background: rgba(251, 191, 36, 0.08);
        color: rgba(251, 191, 36, 0.8);
      }
      .chip-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      /* Focus-visible ring */
      .toggle-all:focus-visible,
      .light-icon-btn:focus-visible,
      .light-expand-btn:focus-visible,
      .cdot:focus-visible,
      .chip:focus-visible {
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
    `]}setConfig(t){super.setConfig(t)}getCardSize(){if(this._isDashboardMode){const t=this._getLights().length;return 0===t?1:Math.min(t,6)+1}return 3}connectedCallback(){super.connectedCallback(),this._listen("room-config-changed",t=>{const e=this.areaId||this._config?.area;e&&t.areaId===e&&(this._roomConfigLoaded=!1,this._cachedLights=void 0,this._loadRoomConfig())}),this._listen("schedule-changed",()=>{this._schedulesLoaded=!1,this._cachedLights=void 0,this._loadSchedules()})}disconnectedCallback(){super.disconnectedCallback(),this._throttleTimers.forEach(t=>clearTimeout(t)),this._throttleTimers.clear(),this._backend=void 0,this._schedulesLoaded=!1}async _loadRoomConfig(){const t=this.areaId||this._config?.area;if(t&&this.hass&&!this._roomConfigLoaded){this._roomConfigLoaded=!0,this._lastLoadedAreaId=t;try{this._backend||(this._backend=new zt(this.hass));const e=await this._backend.send("get_room",{area_id:t});e&&(this._roomConfig=e,this._cachedLights=void 0,this.requestUpdate())}catch{}}}async _loadSchedules(){if(this.hass&&!this._schedulesLoaded){this._schedulesLoaded=!0;try{this._backend||(this._backend=new zt(this.hass));const t=await this._backend.send("get_schedules");this._schedules=t,this._cachedLights=void 0,this.requestUpdate()}catch{this._schedulesLoaded=!1}}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._expandedEntity=null,this._activePresets=new Map,this._dragValues=new Map,this._cachedLights=void 0,this._throttleTimers.forEach(t=>clearTimeout(t)),this._throttleTimers.clear()}getTrackedEntityIds(){if(this._isDashboardMode&&this.hass&&this.visibleAreaIds?.length&&this.hass.entities&&this.hass.devices){const t=[];for(const e of this.visibleAreaIds)for(const i of Lt(e,this.hass.entities,this.hass.devices))i.entity_id.startsWith("light.")&&t.push(i.entity_id);return t}return this._getLights().map(t=>t.entity_id)}updated(t){super.updated(t),t.has("hass")&&this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigLoaded=!1,this._schedulesLoaded=!1),this.hass&&!this._schedulesLoaded&&this._loadSchedules();const e=this.areaId||this._config?.area;e&&this.hass&&(this._lastLoadedAreaId!==e&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),t.has("hass")&&(this._cachedLights=void 0);const i=this._getLightInfos();if(i.some(t=>t.isOn)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on"),t.has("hass")&&this._dragValues.size>0){let t=!1;const e=new Map(this._dragValues);for(const s of i){const i=`bri:${s.entityId}`,a=e.get(i);void 0!==a&&Math.abs(s.brightnessPct-a)<=2&&(e.delete(i),t=!0);const r=`temp:${s.entityId}`,n=e.get(r);void 0!==n&&null!==s.colorTempKelvin&&Math.abs(s.colorTempKelvin-n)<=50&&(e.delete(r),t=!0)}t&&(this._dragValues=e)}}_getLights(){if(!this.hass)return[];if(this._cachedLights&&this._cachedLightsHassRef===this.hass.states)return this._cachedLights;this._cachedLightsHassRef=this.hass.states;const t=this._computeLights();return this._cachedLights=t,t}_computeLights(){if(!this.hass)return[];const t=this.areaId||this._config?.area;if(t){const e=this._config?.hidden_entities??[],i=this._roomConfig?.hidden_entities??[],s=new Set([...e,...i]),a=Lt(t,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("light.")&&!s.has(t.entity_id)&&Rt(t.entity_id,this._schedules)).map(t=>this.hass?.states[t.entity_id]).filter(t=>void 0!==t),r=this._config?.entity_order??[],n=r.length>0?r:this._roomConfig?.entity_order??[];if(n.length>0){const t=new Map;n.forEach((e,i)=>t.set(e,i)),a.sort((e,i)=>{const s=t.get(e.entity_id),a=t.get(i.entity_id);return void 0!==s&&void 0!==a?s-a:void 0!==s?-1:void 0!==a?1:0})}return a}if(this._config?.entity){if(!Rt(this._config.entity,this._schedules))return[];const t=this.hass.states[this._config.entity];return t?[t]:[]}if(this._isDashboardMode){const t=this.visibleAreaIds;if(!t||0===t.length||!this.hass.entities||!this.hass.devices)return[];const e=new Set;for(const i of t)for(const t of Lt(i,this.hass.entities,this.hass.devices))t.entity_id.startsWith("light.")&&e.add(t.entity_id);return Object.values(this.hass.states).filter(t=>e.has(t.entity_id)&&"on"===t.state&&Rt(t.entity_id,this._schedules)).sort((t,e)=>{const i=t.attributes.friendly_name||t.entity_id,s=e.attributes.friendly_name||e.entity_id;return i.localeCompare(s)})}return[]}_getLightInfos(){return this._getLights().map(t=>this._buildLightInfo(t))}_buildLightInfo(t){const e="on"===t.state,i=function(t){const e=t.attributes.supported_color_modes;return e&&0!==e.length?e.some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t))?"rgb":e.includes("color_temp")?"color_temp":e.includes("brightness")?"dimmable":"simple":void 0!==t.attributes.brightness?"dimmable":"simple"}(t),s=t.attributes.brightness,a=e&&void 0!==s?Math.round(s/255*100):0;let r=null;const n=t.attributes.min_color_temp_kelvin||2e3,o=t.attributes.max_color_temp_kelvin||6500;e&&"color_temp"===i&&(r=t.attributes.color_temp_kelvin||null);let l=null;return e&&"rgb"===i&&(l=t.attributes.rgb_color||null),{entity:t,entityId:t.entity_id,name:t.attributes.friendly_name||t.entity_id,isOn:e,type:i,brightnessPct:a,colorTempKelvin:r,minKelvin:n,maxKelvin:o,rgbColor:l}}_toggleLight(t){this.hass?.callService("light","toggle",{},{entity_id:t})}_toggleAll(){const t=this._getLights(),e=t.some(t=>"on"===t.state),i=e?"turn_off":"turn_on",s=t.map(t=>t.entity_id);this.hass?.callService("light",i,{},{entity_id:s}),e&&(this._expandedEntity=null)}_turnAllOff(){const t=this._getLights().map(t=>t.entity_id);this.hass?.callService("light","turn_off",{},{entity_id:t}),this._expandedEntity=null}_toggleExpand(t,e){e&&(this._expandedEntity===t?this._expandedEntity=null:this._expandedEntity=t)}_onSliderInput(t,e,i){const s=new Map(this._dragValues);s.set(t,e),this._dragValues=s;const a=this._throttleTimers.get(t);void 0!==a&&clearTimeout(a),this._throttleTimers.set(t,setTimeout(()=>{this._throttleTimers.delete(t),i(this._dragValues.get(t)??e)},100))}_onSliderChange(t,e,i){i(e);const s=this._throttleTimers.get(t);void 0!==s&&clearTimeout(s),this._throttleTimers.delete(t)}_setBrightness(t,e){this.hass?.callService("light","turn_on",{brightness_pct:e},{entity_id:t})}_setColorTemp(t,e){this.hass?.callService("light","turn_on",{color_temp_kelvin:e},{entity_id:t})}_setRgbColor(t,e){this.hass?.callService("light","turn_on",{rgb_color:e},{entity_id:t})}_applyPreset(t,e){const i={brightness_pct:e.brightness};"color_temp"===t.type&&(i.color_temp_kelvin=e.temp),"rgb"===t.type&&(i.rgb_color=e.rgb),this.hass?.callService("light","turn_on",i,{entity_id:t.entityId});const s=new Map(this._activePresets);s.set(t.entityId,e.key),this._activePresets=s}_getEntityLayout(t){const e=this._config?.entity_layouts??{},i=this._roomConfig?.entity_layouts??{};return"full"===(e[t]||i[t])?"full":"compact"}_isCompact(t){return"compact"===this._getEntityLayout(t.entityId)}_buildLayout(t){const e=[];let i=0;for(;i<t.length;){const s=t[i];if(this._isCompact(s)){const a=i+1<t.length&&this._isCompact(t[i+1])?t[i+1]:null;a?(e.push({kind:"compact-pair",left:s,right:a}),i+=2):(e.push({kind:"full",light:s}),i++)}else e.push({kind:"full",light:s}),i++}return e}_computeTint(t){const e=t.filter(t=>t.isOn);if(0===e.length)return null;const i=e.length/t.length;let s="#fbbf24";const a=e.find(t=>"rgb"===t.type&&t.rgbColor);return a?.rgbColor&&(s=Wt(a.rgbColor)),{background:`radial-gradient(ellipse at 30% 30%, ${s}, transparent 70%)`,opacity:(.18*i).toFixed(3)}}_renderSubText(t){if(!t.isOn)return q`<span class="light-brightness-text">${Pt("common.off")}</span>`;if("simple"===t.type)return q`<span class="light-brightness-text">${Pt("common.on")}</span>`;const e=[q`<span class="light-brightness-text">${t.brightnessPct}%</span>`];if("color_temp"===t.type&&t.colorTempKelvin){const i=qt(t.colorTempKelvin);e.push(q`<span class="light-temp-dot" style="background:${i.color}"></span>`),e.push(q`<span class="light-temp-text">${i.label}</span>`)}if("rgb"===t.type&&t.rgbColor){const i=Wt(t.rgbColor);e.push(q`<span class="light-temp-dot" style="background:${i}"></span>`),e.push(q`<span class="light-temp-text">${Pt("light.color")}</span>`)}return e}_renderLightRow(t,e,i){const s=["light-row",e?"compact":"",i?"compact-right":""].filter(Boolean).join(" "),a=t.isOn&&"rgb"===t.type&&t.rgbColor?`--light-rgb:${Wt(t.rgbColor)};--light-rgb-bg:${Gt(t.rgbColor,.1)};--light-rgb-border:${Gt(t.rgbColor,.15)};--light-rgb-glow:${Gt(t.rgbColor,.4)};--light-rgb-sub:${Gt(t.rgbColor,.55)}`:"",r=["light-icon-btn",t.isOn?"on":"",t.isOn&&t.rgbColor?"rgb":""].filter(Boolean).join(" ");return q`
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
          aria-label="${Pt("light.toggle_aria",{name:t.name})}"
        >
          <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
        </button>
        <button
          class="light-expand-btn"
          @click=${()=>this._toggleExpand(t.entityId,t.isOn)}
          aria-label="${t.isOn?Pt("light.expand_aria",{name:t.name}):t.name}"
          aria-expanded=${t.isOn?this._expandedEntity===t.entityId?"true":"false":X}
        >
          <div class="light-info">
            <div class="light-name">${function(t,e=18,i="8s"){return t.length<=e?t:q`<span class="marquee" style="--marquee-duration:${i}"><span class="marquee-inner">${t}\u00A0\u00A0\u00A0${t}\u00A0\u00A0\u00A0</span></span>`}(t.name)}</div>
            <div class="light-sub">${this._renderSubText(t)}</div>
          </div>
          <span class="light-dot"></span>
        </button>
      </div>
    `}_getBrightnessFill(t){if("rgb"===t.type&&t.rgbColor){const[e,i,s]=t.rgbColor;return{fillClass:"dynamic",fillStyle:`--slider-fill-start:rgba(${e},${i},${s},0.15);--slider-fill-end:rgba(${e},${i},${s},0.35)`}}if("color_temp"===t.type&&t.colorTempKelvin){const e=qt(t.colorTempKelvin).color,i=parseInt(e.slice(1,3),16),s=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16);return{fillClass:"dynamic",fillStyle:`--slider-fill-start:rgba(${i},${s},${a},0.15);--slider-fill-end:rgba(${i},${s},${a},0.35)`}}return{fillClass:"warm",fillStyle:""}}_renderControlFold(t){const e=this._expandedEntity===t.entityId&&t.isOn,i="rgb"===t.type,{fillClass:s,fillStyle:a}=this._getBrightnessFill(t);return q`
      <div class="ctrl-fold ${e?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${i}>
            <span class="ctrl-label">${t.name}</span>

            ${"simple"!==t.type?this._renderSlider(`bri:${t.entityId}`,s,t.brightnessPct,"mdi:brightness-6",Pt("light.intensity"),t=>`${t}%`,1,100,e=>this._setBrightness(t.entityId,e),a):X}
            ${"color_temp"===t.type?this._renderTempSlider(t):X}
            ${"rgb"===t.type?this._renderColorDots(t):X}
            ${this._renderPresetChips(t)}
          </div>
        </div>
      </div>
    `}_renderSlider(t,e,i,s,a,r,n,o,l,c=""){const d=this._dragValues.get(t)??i,h=(d-n)/(o-n)*100;return q`
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
          min=${n}
          max=${o}
          .value=${String(d)}
          aria-label=${a}
          @input=${e=>{const i=Number(e.target.value);this._onSliderInput(t,i,l)}}
          @change=${e=>{const i=Number(e.target.value);this._onSliderChange(t,i,l)}}
        />
      </div>
    `}_renderTempSlider(t){const e=t.colorTempKelvin||t.minKelvin,i=`temp:${t.entityId}`,s=this._dragValues.get(i)??e,a=Math.min(Math.max((s-t.minKelvin)/(t.maxKelvin-t.minKelvin)*100,2),98);return q`
      <div class="slider">
        <div class="slider-fill temp-gradient"></div>
        <div class="slider-thumb" style="left:${a}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${"mdi:thermometer"}></ha-icon>
          ${Pt("light.temperature")}
        </div>
        <div class="slider-val">${s}K</div>
        <input
          type="range"
          class="slider-native"
          min=${t.minKelvin}
          max=${t.maxKelvin}
          .value=${String(s)}
          aria-label="${Pt("light.color_temp_label")}"
          @input=${e=>{const s=Number(e.target.value);this._onSliderInput(i,s,e=>this._setColorTemp(t.entityId,e))}}
          @change=${e=>{const s=Number(e.target.value);this._onSliderChange(i,s,e=>this._setColorTemp(t.entityId,e))}}
        />
      </div>
    `}_renderColorDots(t){return q`
      <div class="color-dots-row">
        ${Kt.map(e=>{const i=!!t.rgbColor&&(s=t.rgbColor,a=e,s[0]===a[0]&&s[1]===a[1]&&s[2]===a[2]);var s,a;return q`
            <button
              class="cdot ${i?"active":""}"
              style="--cdot-color:${Wt(e)}"
              @click=${()=>this._setRgbColor(t.entityId,e)}
              aria-label="${Pt("light.color_aria",{hex:Wt(e)})}"
            ></button>
          `})}
      </div>
    `}_renderPresetChips(t){const e=this._activePresets.get(t.entityId);return q`
      <div class="preset-row">
        ${Bt.map(i=>q`
            <button
              class="chip ${e===i.key?"active":""}"
              @click=${()=>this._applyPreset(t,i)}
              aria-label="${Pt("light.preset_aria",{label:Pt(i.labelKey)})}"
            >
              <span class="chip-dot" style="background:${i.dotColor}"></span>
              ${Pt(i.labelKey)}
            </button>
          `)}
      </div>
    `}_renderGrid(t){const e=this._buildLayout(t),i=[];for(const s of e)"full"===s.kind?(i.push(this._renderLightRow(s.light,!1,!1)),i.push(this._renderControlFold(s.light))):(i.push(this._renderLightRow(s.left,!0,!1)),s.right&&i.push(this._renderLightRow(s.right,!0,!0)));return i}_renderDashboardGrid(t){const e=[];let i=0;for(;i<t.length;){const s=t[i],a=i+1<t.length?t[i+1]:null;a?(e.push(q`
          ${this._renderLightRow(s,!0,!1)}
          ${this._renderLightRow(a,!0,!0)}
          ${this._renderControlFold(s)}
          ${this._renderControlFold(a)}
        `),i+=2):(e.push(q`
          ${this._renderLightRow(s,!1,!1)}
          ${this._renderControlFold(s)}
        `),i++)}return e}_renderDashboard(){const t=this._getLightInfos();if(0===t.length)return X;const e=t.slice(0,6),i=t.length-6,s=this._computeTint(t),a=1===t.length?"light.dashboard_title_one":"light.dashboard_title";return q`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${Pt(a,{count:String(t.length)})}</span>
        </div>
        <button
          class="toggle-all on"
          @click=${()=>this._turnAllOff()}
          aria-label="${Pt("light.dashboard_turn_all_off_aria")}"
        ></button>
      </div>

      <div class="card glass">
        <div
          class="tint"
          style=${s?`background:${s.background};opacity:${s.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">
            ${this._renderDashboardGrid(e)}
          </div>
          ${i>0?q`<div class="dashboard-overflow">
                ${Pt("light.dashboard_overflow",{count:String(i)})}
              </div>`:X}
        </div>
      </div>
    `}render(){if(this._isDashboardMode)return this._renderDashboard();const t=this._getLightInfos();if(0===t.length)return X;const e=t.filter(t=>t.isOn).length,i=t.length,s=e>0,a=0===e?"none":e===i?"all":"some",r=this._computeTint(t);return q`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">${Pt("light.title")}</span>
          <span class="card-count ${a}">${e}/${i}</span>
        </div>
        <button
          class="toggle-all ${s?"on":""}"
          @click=${()=>this._toggleAll()}
          aria-label="${Pt(s?"light.toggle_all_on_aria":"light.toggle_all_off_aria")}"
        ></button>
      </div>

      <div class="card glass">
        <div
          class="tint"
          style=${r?`background:${r.background};opacity:${r.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">${this._renderGrid(t)}</div>
        </div>
      </div>
    `}}jt([$t({attribute:!1})],Xt.prototype,"areaId"),jt([$t({attribute:!1})],Xt.prototype,"visibleAreaIds"),jt([kt()],Xt.prototype,"_expandedEntity"),jt([kt()],Xt.prototype,"_activePresets"),jt([kt()],Xt.prototype,"_dragValues"),customElements.get("glass-light-card")||customElements.define("glass-light-card",Xt);var Yt=Object.defineProperty,Jt=(t,e,i,s)=>{for(var a,r=void 0,n=t.length-1;n>=0;n--)(a=t[n])&&(r=a(e,i,r)||r);return r&&Yt(e,i,r),r};const Zt=class e extends dt{constructor(){super(...arguments),this._lang=Tt(),this._areaId=null,this._open=!1,this._scenesOpen=!1,this._activeSceneId=null,this._peekedRooms=new Set,this._busCleanups=[],this._boundKeydown=this._onKeydown.bind(this),this._roomConfigs=new Map}shouldUpdate(t){if(!t.has("hass"))return!0;if(t.size>1)return!0;if(!this._open)return!1;const e=t.get("hass");if(!e||!this.hass||!this._areaId)return!0;const i=Lt(this._areaId,this.hass.entities,this.hass.devices),s=this.hass;return i.some(t=>e.states[t.entity_id]!==s.states[t.entity_id])}static{this.styles=[pt,ut,l`
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
      @media (hover: hover) {
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
      @media (hover: hover) {
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

    `]}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._roomConfigs.clear()),this.hass.language&&Et(this.hass.language)&&(this._lang=Tt()))}connectedCallback(){super.connectedCallback(),this._busCleanups.length>0&&(this._busCleanups.forEach(t=>t()),this._busCleanups=[]),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._busCleanups.push(t.on("popup-open",t=>this._handleOpen(t)),t.on("popup-close",()=>this._handleClose()),t.on("room-config-changed",t=>{this._roomConfigs.delete(t.areaId),this._peekedRooms.delete(t.areaId),this._areaId===t.areaId&&this._loadRoomConfig(t.areaId)}),t.on("navbar-config-changed",()=>{this._roomConfigs.clear(),this._areaId&&this._loadRoomConfig(this._areaId)})),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._peekedRooms.clear(),this._busCleanups.forEach(t=>t()),this._busCleanups=[],this._backend=void 0,document.removeEventListener("keydown",this._boundKeydown)}_handleOpen(t){void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._areaId=t.areaId,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(t.areaId),this._pendingRaf=requestAnimationFrame(()=>{this._pendingRaf=void 0,this._open=!0,this.setAttribute("open","")})}_maybePeekScenes(t){if(this._peekedRooms.has(t))return;const e=this._getAreaMeta();e&&0!==e.scenes.length&&(this._peekedRooms.add(t),this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&(this._scenesOpen=!0,this._peekTimeout=setTimeout(()=>{this._peekTimeout=void 0,this._open&&(this._scenesOpen=!1)},1e3))},400))}_handleClose(){void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._open=!1,this.removeAttribute("open"),this._closeTimeout=setTimeout(()=>{this._areaId=null,this._closeTimeout=void 0},350)}_onKeydown(e){"Escape"===e.key&&this._open&&t.emit("popup-close",void 0)}async _loadRoomConfig(t){if(this.hass)if(this._roomConfigs.has(t))this._open&&this._areaId===t&&this._maybePeekScenes(t);else{try{this._backend||(this._backend=new zt(this.hass));const e=await this._backend.send("get_room",{area_id:t});this._roomConfigs.set(t,e),this.requestUpdate()}catch{this._roomConfigs.set(t,null)}this._open&&this._areaId===t&&this._maybePeekScenes(t)}}_onOverlayClick(){t.emit("popup-close",void 0)}_getAreaMeta(){if(!this.hass||!this._areaId)return null;const t=this.hass.areas[this._areaId];if(!t)return null;const e=Lt(this._areaId,this.hass.entities,this.hass.devices);let i=null,s=null,a=!1,r=!1;const n=[],o=new Set;for(const u of e){const t=this.hass?.states[u.entity_id];if(!t)continue;const e=u.entity_id.split(".")[0];if(o.add(e),"light"===e&&"on"===t.state&&(a=!0),"media_player"===e&&"playing"===t.state&&(r=!0),"sensor"===e){const e=t.attributes.device_class;"temperature"!==e||i||(i=`${t.state}${t.attributes.unit_of_measurement||"°C"}`),"humidity"!==e||s||(s=`${t.state}%`)}"scene"===e&&n.push(t)}const l=this._roomConfigs.get(this._areaId),c=l?.icon??t.icon??"mdi:home",d=new Set(l?.hidden_scenes??[]),h=n.filter(t=>!d.has(t.entity_id)),p=l?.scene_order;if(p&&p.length>0){const t=new Map(p.map((t,e)=>[t,e]));h.sort((e,i)=>(t.get(e.entity_id)??1/0)-(t.get(i.entity_id)??1/0))}return{name:t.name,icon:c,temperature:i,humidity:s,hasLight:a,hasMusic:r,scenes:h,domains:[...o]}}_activateScene(t){this._activeSceneId=t,this.hass?.callService("scene","turn_on",{},{entity_id:t})}static{this.DEFAULT_CARD_ORDER=["light","media_player","climate","fan","cover","vacuum"]}_getVisibleCards(t){const i=this._areaId?this._roomConfigs.get(this._areaId):void 0,s=i?.card_order;return s&&s.length>0?s.filter(e=>t.includes(e)):e.DEFAULT_CARD_ORDER.filter(e=>t.includes(e))}_renderDomainCard(t){return"light"===t?q`<glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>`:X}render(){if(this._lang,!this._areaId)return X;const e=this._getAreaMeta();if(!e)return X;const i=e.scenes.length>0,s=this._getVisibleCards(e.domains);return q`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${e.name}>
        <div class="header">
          <div class="header-left">
            <button
              class="header-icon ${e.hasLight?"has-light":""} ${e.hasMusic?"has-music":""}"
              @click=${()=>i&&(this._scenesOpen=!this._scenesOpen)}
              aria-label=${i?Pt("popup.toggle_scenes_aria"):e.name}
              aria-expanded=${i?this._scenesOpen?"true":"false":X}
            >
              <ha-icon .icon=${e.icon}></ha-icon>
            </button>
            <div class="scene-dash ${i?"visible":""}"></div>
          </div>
          <div class="header-info">
            <div class="header-name">${e.name}</div>
            <div class="header-meta">
              ${e.temperature?q`<span>${e.temperature}</span>`:X}
              ${e.humidity?q`<span>${e.humidity}</span>`:X}
            </div>
          </div>
          <button
            class="close-btn"
            @click=${()=>t.emit("popup-close",void 0)}
            aria-label="${Pt("popup.close_aria")}"
          >
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </button>
        </div>

        ${i?q`
              <div class="scenes-wrapper ${this._scenesOpen?"open":""}">
                <div class="scenes-inner">
                  <div class="scene-chips">
                    ${e.scenes.map(t=>q`
                        <button
                          class="scene-chip ${this._activeSceneId===t.entity_id?"active":""}"
                          @click=${()=>this._activateScene(t.entity_id)}
                          aria-label="${Pt("popup.activate_scene_aria",{name:t.attributes.friendly_name||t.entity_id})}"
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
    `}};Jt([$t({attribute:!1})],Zt.prototype,"hass"),Jt([kt()],Zt.prototype,"_lang"),Jt([kt()],Zt.prototype,"_areaId"),Jt([kt()],Zt.prototype,"_open"),Jt([kt()],Zt.prototype,"_scenesOpen"),Jt([kt()],Zt.prototype,"_activeSceneId");let Qt=Zt;customElements.get("glass-room-popup")||customElements.define("glass-room-popup",Qt);var te=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,ie=(t,e,i,s)=>{for(var a,r=s>1?void 0:s?ee(e,i):e,n=t.length-1;n>=0;n--)(a=t[n])&&(r=(s?a(e,i,r):a(r))||r);return s&&r&&te(e,i,r),r};class se extends dt{constructor(){super(...arguments),this._lang=Tt()}set hass(t){this._hass=t,t?.language&&Et(t.language)&&(this._lang=Tt())}get hass(){return this._hass}setConfig(t){this._config=t}static{this.styles=[pt,l`
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
      @media (hover: hover) {
        .redirect a:hover {
          text-decoration: underline;
        }
      }
      ha-icon {
        --mdc-icon-size: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }
    `]}render(){return this._lang,q`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          ${Pt("editor.redirect_message")}
        </p>
        <p>
          <a href="/glass-cards">${Pt("editor.open_config")}</a>
        </p>
      </div>
    `}}ie([$t({attribute:!1})],se.prototype,"hass",1),ie([kt()],se.prototype,"_lang",2),customElements.get("glass-navbar-card-editor")||customElements.define("glass-navbar-card-editor",se);var ae=Object.defineProperty,re=(t,e,i,s)=>{for(var a,r=void 0,n=t.length-1;n>=0;n--)(a=t[n])&&(r=a(e,i,r)||r);return r&&ae(e,i,r),r};const ne={weather:"glass-weather-card",light:"glass-light-card"},oe=["weather","light"];class le extends Mt{constructor(){super(...arguments),this._items=[],this._activeArea=null,this._scrollMask="none",this._popup=null,this._ownsPopup=!1,this._areaStructure=[],this._lastAreaKeys="",this._cachedEntityFingerprint="",this._boundUpdateMask=this._updateNavMask.bind(this),this._scrollEl=null,this._navbarConfig=null,this._configLoaded=!1,this._roomConfigs={},this._flipPositions=new Map,this._configReady=!1,this._lastAmbientPeriod=null,this._editMode=!1,this._enabledCards=["weather"],this._dashboardCards=new Map}static getConfigElement(){return document.createElement("glass-navbar-card-editor")}static{this.styles=[pt,ut,l`
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding-bottom: 80px; /* space for fixed navbar */
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
      @media (hover: hover) {
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
    `]}connectedCallback(){super.connectedCallback();const t=document.querySelector("glass-room-popup");t?(this._popup=t,this._ownsPopup=!1):(this._popup=document.createElement("glass-room-popup"),document.body.appendChild(this._popup),this._ownsPopup=!0),this._listen("popup-close",()=>{this._activeArea=null}),this._listen("navbar-config-changed",()=>{this._loadBackendConfig()}),this._listen("dashboard-config-changed",()=>{this._loadDashboardConfig()}),this._editMode=this._detectEditMode()}disconnectedCallback(){super.disconnectedCallback(),this._ownsPopup&&this._popup?.remove(),this._popup=null,this._ownsPopup=!1,this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null);for(const t of this._dashboardCards.values())t.remove();this._dashboardCards.clear(),this._backend=void 0}firstUpdated(t){super.firstUpdated(t),this._attachScrollListener()}_detectEditMode(){let t=this.getRootNode();for(;t instanceof ShadowRoot;){const e=t.host;if("HUI-CARD-OPTIONS"===e.tagName)return!0;if("HUI-DIALOG-EDIT-CARD"===e.tagName)return!0;if("HA-PANEL-LOVELACE"===e.tagName&&e.lovelace?.editMode)return!0;t=e.getRootNode()}return!1}_attachScrollListener(){if(this._scrollEl)return;const t=this.renderRoot.querySelector(".nav-scroll");t&&(t.addEventListener("scroll",this._boundUpdateMask,{passive:!0}),this._scrollEl=t,this._updateNavMask())}setConfig(t){super.setConfig(t)}getCardSize(){return 0}getTrackedEntityIds(){return["sun.sun",...this._items.flatMap(t=>t.entityIds)]}updated(t){if(t.has("hass")&&this.hass){if(this.hass.language&&Et(this.hass.language),this._editMode=this._detectEditMode(),this._editMode)return;this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1),this._configLoaded||(this._configLoaded=!0,this._loadBackendConfig()),this._configReady&&(this._rebuildStructure(),this._aggregateState()),this._updateAmbient(),this._popup&&(this._popup.hass=this.hass);for(const t of this._dashboardCards.values())t.hass=this.hass}(t.has("_items")||t.has("_enabledCards"))&&this.updateComplete.then(()=>{this._syncDashboardCards(),this._attachScrollListener(),this._updateNavMask(),this._animateFlip()})}async _loadBackendConfig(){if(this.hass)try{this._backend||(this._backend=new zt(this.hass));const t=await this._backend.send("get_config");this._navbarConfig=t.navbar,this._roomConfigs=t.rooms??{},t.dashboard&&(this._enabledCards=t.dashboard.enabled_cards),this._configReady=!0,this._lastAreaKeys="",this._rebuildStructure(),this._aggregateState()}catch{this._configReady=!0,this._rebuildStructure(),this._aggregateState()}}async _loadDashboardConfig(){if(this.hass)try{this._backend||(this._backend=new zt(this.hass));const t=await this._backend.send("get_config");t?.dashboard&&(this._enabledCards=t.dashboard.enabled_cards)}catch{}}_getOrCreateCard(t){let e=this._dashboardCards.get(t);if(e||(e=document.createElement(t),this._dashboardCards.set(t,e)),this.hass&&(e.hass=this.hass),"glass-light-card"===t){const t=this._items.map(t=>t.areaId);e.visibleAreaIds=t}return e}_rebuildStructure(){if(!this.hass?.areas)return;const t=this._navbarConfig?`${this._navbarConfig.room_order.join(",")}|${this._navbarConfig.hidden_rooms.join(",")}`:"";this.hass.entities!==this._lastEntitiesRef&&(this._lastEntitiesRef=this.hass.entities,this._cachedEntityFingerprint=Object.values(this.hass.entities).map(t=>`${t.entity_id}:${t.area_id??""}`).sort().join("|"));const e=this._cachedEntityFingerprint,i=Object.entries(this._roomConfigs).map(([t,e])=>`${t}:${e.icon??""}`).sort().join(","),s=Object.keys(this.hass.areas).sort().join(",")+"||"+e+"||"+t+"||"+i;if(s===this._lastAreaKeys)return;this._lastAreaKeys=s;const a=new Set(this._navbarConfig?.hidden_rooms??[]),r=new Map;(this._navbarConfig?.room_order??[]).forEach((t,e)=>r.set(t,e));const n=[];for(const o of Object.values(this.hass.areas)){if(a.has(o.area_id))continue;const t=Lt(o.area_id,this.hass.entities,this.hass.devices);if(0===t.length)continue;const e=this._roomConfigs[o.area_id]?.icon;n.push({areaId:o.area_id,name:o.name,icon:e||o.icon||"mdi:home",entityIds:t.map(t=>t.entity_id)})}n.sort((t,e)=>{const i=r.get(t.areaId),s=r.get(e.areaId);return void 0!==i&&void 0!==s?i-s:void 0!==i?-1:void 0!==s?1:t.name.localeCompare(e.name)}),this._areaStructure=n}_aggregateState(){if(!this.hass)return;const t=this._areaStructure.map(t=>{let e=0,i=null,s=null,a=null,r=null,n=!1;for(const o of t.entityIds){const t=this.hass?.states[o];if(!t)continue;const l=o.split(".")[0];if("light"===l&&"on"===t.state&&e++,"sensor"===l){const e=t.attributes.device_class;"temperature"!==e||i||(i=`${t.state}°`,s=parseFloat(t.state)),"humidity"!==e||a||(a=`${t.state}%`,r=parseFloat(t.state))}"media_player"===l&&"playing"===t.state&&(n=!0)}return{...t,lightsOn:e,temperature:i,tempValue:s,humidity:a,humidityValue:r,mediaPlaying:n}});!1!==this._navbarConfig?.auto_sort&&t.sort((t,e)=>(t.lightsOn>0?0:1)-(e.lightsOn>0?0:1)),this._snapshotPositions(),this._items=t}_updateAmbient(){if(!this.hass)return;const e=function(t){const e=t.states["sun.sun"];if(!e){const t=(new Date).getHours();return t>=6&&t<10?"morning":t>=10&&t<17?"day":t>=17&&t<21?"evening":"night"}const i=parseFloat(e.attributes.elevation)||0;if(i>20)return"day";if(i>0){const t=Date.parse(e.attributes.next_setting),i=Date.parse(e.attributes.next_rising);return isNaN(t)||isNaN(i)?"above_horizon"===e.state?"day":"night":t<i?"evening":"morning"}if(i>-6){const t=Date.parse(e.attributes.next_rising),i=Date.parse(e.attributes.next_setting);if(!isNaN(t)&&!isNaN(i))return t<i?"morning":"evening"}return"night"}(this.hass);e!==this._lastAmbientPeriod&&(this._lastAmbientPeriod=e,t.emit("ambient-update",{period:e}))}_snapshotPositions(){this._flipPositions.clear();const t=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const e of t){const t=e.dataset.area;t&&this._flipPositions.set(t,e.getBoundingClientRect().left)}}_animateFlip(){if(0===this._flipPositions.size)return;const t=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const e of t){const t=e.dataset.area;if(!t)continue;const i=this._flipPositions.get(t);if(void 0===i)continue;const s=i-e.getBoundingClientRect().left;Math.abs(s)<1||e.animate([{transform:`translateX(${s}px)`},{transform:"translateX(0)"}],{duration:350,easing:"cubic-bezier(0.4, 0, 0.2, 1)"})}this._flipPositions.clear()}_updateNavMask(){const t=this.renderRoot.querySelector(".nav-scroll");if(!t)return;if(!(t.scrollWidth>t.offsetWidth))return void(this._scrollMask="none");const e=t.scrollLeft<=5,i=t.scrollLeft+t.offsetWidth>=t.scrollWidth-5;this._scrollMask=e&&i?"none":e?"mask-right":i?"mask-left":"mask-both"}_handleNavClick(e,i){const s=i.currentTarget.getBoundingClientRect();this._activeArea===e.areaId?(t.emit("popup-close",void 0),this._activeArea=null):(this._activeArea=e.areaId,t.emit("popup-open",{areaId:e.areaId,originRect:s}))}_renderNavItem(t){const e=this._activeArea===t.areaId,i=!1!==this._navbarConfig?.show_lights,s=!1!==this._navbarConfig?.show_temperature,a=!1!==this._navbarConfig?.show_humidity,r=!1!==this._navbarConfig?.show_media,n=this._navbarConfig?.temp_high??24,o=this._navbarConfig?.temp_low??17,l=this._navbarConfig?.humidity_threshold??65,c=i&&t.lightsOn>0,d=a&&null!==t.humidityValue&&t.humidityValue>=l,h=r&&t.mediaPlaying,p=s&&null!==t.tempValue&&t.tempValue>=n,u=["nav-item",e?"active":"",c?"has-light":"",h?"has-music":"",p?"has-temp-hot":"",s&&null!==t.tempValue&&!p&&t.tempValue<=o?"has-temp-cold":""].filter(Boolean).join(" ");return q`
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
          ${d?q`<span class="humidity-bar"></span>`:X}
        </span>
      </button>
    `}_syncDashboardCards(){const t=this.renderRoot.querySelector(".dashboard-cards");if(!t)return;const e=new Set(this._enabledCards),i=oe.filter(t=>e.has(t)),s=[];for(const[r]of this._dashboardCards){const t=Object.entries(ne).find(([,t])=>t===r)?.[0];t&&e.has(t)||s.push(r)}for(const r of s)this._dashboardCards.get(r)?.remove(),this._dashboardCards.delete(r);let a=null;for(const r of i){const e=ne[r];if(!e)continue;const i=this._getOrCreateCard(e),s=a?a.nextElementSibling:t.firstElementChild;i!==s&&t.insertBefore(i,s),a=i}}render(){const t=!this._editMode&&this._items.length>0,e="nav-scroll"+("none"!==this._scrollMask?` ${this._scrollMask}`:"");return q`
      <div class="dashboard-cards"></div>
      ${t?q`<nav class="navbar glass glass-float">
            <div class=${e}>${this._items.map(t=>this._renderNavItem(t))}</div>
          </nav>`:X}
    `}}re([kt()],le.prototype,"_items"),re([kt()],le.prototype,"_activeArea"),re([kt()],le.prototype,"_scrollMask"),re([kt()],le.prototype,"_editMode"),re([kt()],le.prototype,"_enabledCards"),customElements.get("glass-navbar-card")||customElements.define("glass-navbar-card",le);const ce=window;ce.customCards=ce.customCards||[],ce.customCards.push({type:"glass-navbar-card",name:"Glass Navbar Card",description:"Auto-discovering bottom navigation for Glass Cards"});var de=Object.defineProperty,he=(t,e,i,s)=>{for(var a,r=void 0,n=t.length-1;n>=0;n--)(a=t[n])&&(r=a(e,i,r)||r);return r&&de(e,i,r),r};const pe={sunny:"sunny","clear-night":"clear_night",partlycloudy:"partly_cloudy",cloudy:"cloudy",fog:"foggy",rainy:"rainy",pouring:"pouring",snowy:"snowy","snowy-rainy":"snowy_rainy",hail:"hail",lightning:"lightning","lightning-rainy":"stormy",windy:"windy","windy-variant":"windy_variant",exceptional:"exceptional"},ue={sunny:{icon:"mdi:weather-sunny",textKey:"weather.cond_sunny",tint:"#fbbf24",tintOp:.1,sparkStroke:"rgba(251,191,36,0.6)",sparkFill:"rgba(251,191,36,0.15)"},clear_night:{icon:"mdi:weather-night",textKey:"weather.cond_clear_night",tint:"#818cf8",tintOp:.08,sparkStroke:"rgba(129,140,248,0.5)",sparkFill:"rgba(129,140,248,0.12)"},partly_cloudy:{icon:"mdi:weather-partly-cloudy",textKey:"weather.cond_partly_cloudy",tint:"#fcd34d",tintOp:.07,sparkStroke:"rgba(252,211,77,0.5)",sparkFill:"rgba(252,211,77,0.12)"},cloudy:{icon:"mdi:weather-cloudy",textKey:"weather.cond_cloudy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.4)",sparkFill:"rgba(148,163,184,0.08)"},foggy:{icon:"mdi:weather-fog",textKey:"weather.cond_foggy",tint:"#94a3b8",tintOp:.04,sparkStroke:"rgba(148,163,184,0.35)",sparkFill:"rgba(148,163,184,0.08)"},rainy:{icon:"mdi:weather-rainy",textKey:"weather.cond_rainy",tint:"#60a5fa",tintOp:.1,sparkStroke:"rgba(96,165,250,0.6)",sparkFill:"rgba(96,165,250,0.15)"},pouring:{icon:"mdi:weather-pouring",textKey:"weather.cond_pouring",tint:"#3b82f6",tintOp:.14,sparkStroke:"rgba(59,130,246,0.7)",sparkFill:"rgba(59,130,246,0.18)"},snowy:{icon:"mdi:weather-snowy",textKey:"weather.cond_snowy",tint:"#e0f2fe",tintOp:.08,sparkStroke:"rgba(224,242,254,0.5)",sparkFill:"rgba(224,242,254,0.12)"},snowy_rainy:{icon:"mdi:weather-snowy-rainy",textKey:"weather.cond_snowy_rainy",tint:"#93c5fd",tintOp:.08,sparkStroke:"rgba(147,197,253,0.5)",sparkFill:"rgba(147,197,253,0.12)"},hail:{icon:"mdi:weather-hail",textKey:"weather.cond_hail",tint:"#bae6fd",tintOp:.1,sparkStroke:"rgba(186,230,253,0.5)",sparkFill:"rgba(186,230,253,0.12)"},lightning:{icon:"mdi:weather-lightning",textKey:"weather.cond_lightning",tint:"#c084fc",tintOp:.12,sparkStroke:"rgba(192,132,252,0.6)",sparkFill:"rgba(167,139,250,0.15)"},stormy:{icon:"mdi:weather-lightning-rainy",textKey:"weather.cond_stormy",tint:"#a78bfa",tintOp:.12,sparkStroke:"rgba(167,139,250,0.6)",sparkFill:"rgba(167,139,250,0.15)"},windy:{icon:"mdi:weather-windy",textKey:"weather.cond_windy",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.5)",sparkFill:"rgba(110,231,183,0.10)"},windy_variant:{icon:"mdi:weather-windy-variant",textKey:"weather.cond_windy_variant",tint:"#6ee7b7",tintOp:.06,sparkStroke:"rgba(110,231,183,0.4)",sparkFill:"rgba(110,231,183,0.10)"},exceptional:{icon:"mdi:alert-circle-outline",textKey:"weather.cond_exceptional",tint:"#fca5a5",tintOp:.1,sparkStroke:"rgba(252,165,165,0.5)",sparkFill:"rgba(252,165,165,0.12)"}},ge=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO"];function _e(t){return t<10?"0"+t:""+t}class me extends Mt{constructor(){super(...arguments),this._activeTab=null,this._forecastDaily=[],this._forecastHourly=[],this._clockTime="",this._clockSec="",this._clockDay="",this._clockDate="",this._weatherConfig={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0},this._canvas=null,this._ctx=null,this._animId=0,this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:200,color:"rgba(167,139,250,"},this._cW=0,this._cH=0,this._resizeObserver=null,this._cachedCond="",this._clockInterval=0,this._unsubDaily=null,this._unsubHourly=null,this._configLoaded=!1,this._canvasReady=!1,this._needsCanvasReInit=!1,this._subscribedEntity="",this._subscribedShowDaily=!1,this._subscribedShowHourly=!1,this._subVersion=0,this._animate=()=>{const t=this._ctx;if(!t)return;t.clearRect(0,0,this._cW,this._cH);for(const i of this._particles)this._updateParticle(i),this._drawParticle(t,i);const e=this._cachedCond;"stormy"!==e&&"lightning"!==e||(this._updateFlash(),this._flashState.opacity>.01&&(t.fillStyle=this._flashState.color+this._flashState.opacity+")",t.fillRect(0,0,this._cW,this._cH))),this._animId=requestAnimationFrame(this._animate)}}static{this.styles=[pt,ut,_t,l`
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
      width: 100%; padding: 14px 14px 8px;
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
    }
    .wc-fc-tabs {
      display: flex; gap: 3px;
      margin: 0 auto; width: fit-content;
    }
    .wc-fc-tab {
      padding: 3px 10px;
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
    @media (hover: hover) {
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

    @media (hover: hover) {
      .wc-day-row:hover, .wc-hour-row:hover { background: var(--s1); }
    }

    /* ── Tint ── */
    .tint {
      position: absolute; inset: 0; border-radius: inherit;
      pointer-events: none; z-index: 0;
      transition: opacity var(--t-slow);
    }
  `]}getTrackedEntityIds(){const t=[],e=this._getEntityId();return e&&t.push(e),this.hass?.states["sun.sun"]&&t.push("sun.sun"),t}_getEntityId(){if(this._config?.entity)return this._config.entity;if(this._weatherConfig.entity_id)return this._weatherConfig.entity_id;if(this.hass){const t=Object.keys(this.hass.states).find(t=>t.startsWith("weather."));if(t)return t}return""}_getWeatherState(){const t=this._getEntityId();return t?this.hass?.states[t]:void 0}_mapCondition(t){return pe[t]??"cloudy"}_getConditionMeta(t){return ue[t]??ue.cloudy}connectedCallback(){super.connectedCallback(),this._startClock(),this._listen("weather-config-changed",()=>this._loadConfig()),this._canvasReady&&(this._needsCanvasReInit=!0)}disconnectedCallback(){super.disconnectedCallback(),this._stopClock(),this._stopAnimation(),this._unsubForecasts(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._canvas=null,this._ctx=null,this._backend=void 0}updated(t){if(super.updated(t),t.has("hass")&&this.hass){this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._configLoaded=!1,this._unsubForecasts()),this._configLoaded||(this._configLoaded=!0,this._backend=new zt(this.hass),this._loadConfig());const t=this._getWeatherState();this._cachedCond=t?this._mapCondition(t.state):"",this._subscribeForecasts()}this._needsCanvasReInit&&(this._needsCanvasReInit=!1,this._initCanvas())}firstUpdated(){this._canvasReady=!0,this._initCanvas()}async _loadConfig(){if(this._backend)try{const t=await this._backend.send("get_config");t?.weather&&(this._weatherConfig=t.weather),this.requestUpdate()}catch{}}async _subscribeForecasts(){const t=this._getEntityId();if(!t||!this.hass)return;const e=this._subscribedShowDaily!==this._weatherConfig.show_daily||this._subscribedShowHourly!==this._weatherConfig.show_hourly;if(t===this._subscribedEntity&&!e)return;this._unsubForecasts(),this._subscribedEntity=t,this._subscribedShowDaily=this._weatherConfig.show_daily,this._subscribedShowHourly=this._weatherConfig.show_hourly;const i=++this._subVersion;if(this._weatherConfig.show_daily){const e=await this.hass.connection.subscribeMessage(t=>{this._forecastDaily=t.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t});if(this._subVersion!==i)return void e();this._unsubDaily=e}if(this._weatherConfig.show_hourly){const e=await this.hass.connection.subscribeMessage(t=>{this._forecastHourly=t.forecast??[]},{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:t});if(this._subVersion!==i)return void e();this._unsubHourly=e}}_unsubForecasts(){this._subVersion++,this._unsubDaily?.(),this._unsubDaily=null,this._unsubHourly?.(),this._unsubHourly=null,this._subscribedEntity=""}_startClock(){this._stopClock(),this._updateClock(),this._clockInterval=window.setInterval(()=>this._updateClock(),1e3)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=0)}_updateClock(){const t=new Date;var e,i;this._clockTime=_e(t.getHours())+":"+_e(t.getMinutes()),this._clockSec=":"+_e(t.getSeconds()),this._clockDay=(e=t,i=this._lang,e.toLocaleDateString(i,{weekday:"long"})),this._clockDate=t.getDate()+" "+function(t,e){return t.toLocaleDateString(e,{month:"long"})}(t,this._lang)}_initCanvas(){if(this._canvas=this.renderRoot.querySelector(".wc-anim"),!this._canvas)return;this._ctx=this._canvas.getContext("2d"),this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas());const t=this._canvas.parentElement;t&&this._resizeObserver.observe(t),this._resizeCanvas(),this._startAnimation()}_resizeCanvas(){if(!this._canvas||!this._ctx)return;const t=this._canvas.parentElement;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;this._cW=e.width,this._cH=e.height,this._canvas.width=this._cW*i,this._canvas.height=this._cH*i,this._canvas.style.width=this._cW+"px",this._canvas.style.height=this._cH+"px",this._ctx.setTransform(i,0,0,i,0,0)}_startAnimation(){this._spawnParticles(this._cachedCond||"cloudy"),this._animate()}_stopAnimation(){this._animId&&(cancelAnimationFrame(this._animId),this._animId=0)}_rnd(t,e){return t+Math.random()*(e-t)}_spawnParticles(t){this._particles=[],this._flashState={on:!1,opacity:0,timer:0,interval:this._rnd(120,280),color:"rgba(167,139,250,"};const e=this._cW,i=this._cH;if(!e||!i)return;const s=(t,i,s,a,r,n)=>({type:"drop",x:this._rnd(0,e),y:this._rnd(-30,-5),len:this._rnd(i,s),speed:this._rnd(a,r),angle:n,color:t,opacity:this._rnd(.4,.7)}),a=()=>({type:"flake",x:this._rnd(0,e),y:this._rnd(-10,-3),r:this._rnd(1.5,3.5),speed:this._rnd(.4,1.2),drift:this._rnd(-.3,.3),phase:this._rnd(0,6.28),opacity:this._rnd(.3,.7)}),r=t=>({type:"mote",x:this._rnd(.1*e,.9*e),y:this._rnd(.3*i,.9*i),r:this._rnd(1,2.5),speed:this._rnd(.15,.4),drift:this._rnd(-.15,.15),phase:this._rnd(0,6.28),color:t,opacity:0,maxOp:this._rnd(.3,.7),life:0,maxLife:this._rnd(180,360)}),n=()=>({type:"star",x:this._rnd(.05*e,.95*e),y:this._rnd(.05*i,.7*i),r:this._rnd(.8,1.8),phase:this._rnd(0,6.28),speed:this._rnd(.008,.025)}),o=(t,s)=>({type:"cloud",x:this._rnd(-80,e),y:this._rnd(.05*i,.6*i),w:this._rnd(50,110),h:this._rnd(12,26),speed:this._rnd(.6*s,s),opacity:this._rnd(.6*t,t)}),l=()=>({type:"streak",x:this._rnd(-60,0),y:this._rnd(.1*i,.85*i),w:this._rnd(40,90),speed:this._rnd(2,5),opacity:this._rnd(.06,.14)}),c=()=>({type:"fog",x:this._rnd(-120,.5*e),y:this._rnd(.15*i,.75*i),w:this._rnd(80,160),h:this._rnd(18,35),speed:this._rnd(.2,.6),opacity:this._rnd(.02,.04)}),d=()=>({type:"hail",x:this._rnd(0,e),y:this._rnd(-15,-3),r:this._rnd(2,4),speed:this._rnd(3,5.5),opacity:this._rnd(.5,.8)}),h=this._particles;switch(t){case"sunny":for(let t=0;t<10;t++)h.push(r("rgba(251,191,36,"));break;case"clear_night":for(let t=0;t<14;t++)h.push(n());break;case"partly_cloudy":for(let t=0;t<3;t++)h.push(o(.035,.4));for(let t=0;t<4;t++)h.push(r("rgba(251,191,36,"));break;case"cloudy":for(let t=0;t<5;t++)h.push(o(.045,.35));break;case"foggy":for(let t=0;t<7;t++)h.push(c());break;case"rainy":for(let t=0;t<20;t++)h.push(s("rgba(96,165,250,",14,24,4,7,.14));for(let t=0;t<3;t++)h.push(o(.025,.3));break;case"pouring":for(let t=0;t<35;t++)h.push(s("rgba(59,130,246,",18,30,5.5,9,.1));for(let t=0;t<4;t++)h.push(o(.035,.35));break;case"stormy":for(let t=0;t<28;t++)h.push(s("rgba(167,139,250,",16,28,5,8,.26));for(let t=0;t<4;t++)h.push(o(.05,.5));this._flashState.interval=this._rnd(80,200);break;case"lightning":for(let t=0;t<4;t++)h.push(o(.04,.4));this._flashState.interval=this._rnd(60,160),this._flashState.color="rgba(192,132,252,";break;case"snowy":for(let t=0;t<18;t++)h.push(a());for(let t=0;t<3;t++)h.push(o(.025,.2));break;case"snowy_rainy":for(let t=0;t<10;t++)h.push(a());for(let t=0;t<14;t++)h.push(s("rgba(96,165,250,",12,20,3.5,6,.14));break;case"hail":for(let t=0;t<14;t++)h.push(d());for(let t=0;t<10;t++)h.push(s("rgba(96,165,250,",10,18,3.5,5.5,.14));break;case"windy":for(let t=0;t<8;t++)h.push(l());break;case"windy_variant":for(let t=0;t<6;t++)h.push(l());for(let t=0;t<4;t++)h.push(o(.035,1.2));break;case"exceptional":for(let t=0;t<8;t++)h.push(r("rgba(252,165,165,"));for(let t=0;t<5;t++)h.push(l())}}_updateParticle(t){const e=this._cW,i=this._cH;switch(t.type){case"drop":t.x=t.x+Math.sin(t.angle)*t.speed,t.y=t.y+Math.cos(t.angle)*t.speed,t.y>i+10&&(t.y=this._rnd(-30,-5),t.x=this._rnd(0,e));break;case"flake":t.y=t.y+t.speed,t.phase=t.phase+.02,t.x=t.x+t.drift+.3*Math.sin(t.phase),t.y>i+10&&(t.y=this._rnd(-10,-3),t.x=this._rnd(0,e));break;case"mote":{t.life=t.life+1,t.y=t.y-t.speed,t.x=t.x+t.drift+.2*Math.sin(t.phase+.015*t.life);const s=t.life/t.maxLife;t.opacity=s<.15?s/.15*t.maxOp:s>.85?(1-s)/.15*t.maxOp:t.maxOp,t.life>=t.maxLife&&(t.life=0,t.x=this._rnd(.1*e,.9*e),t.y=this._rnd(.3*i,.9*i),t.maxLife=this._rnd(180,360),t.maxOp=this._rnd(.3,.7));break}case"star":t.phase=t.phase+t.speed;break;case"cloud":t.x=t.x+t.speed,t.x>e+20&&(t.x=-t.w-this._rnd(10,60),t.y=this._rnd(.05*i,.6*i));break;case"streak":t.x=t.x+t.speed,t.x>e+20&&(t.x=this._rnd(-80,-20),t.y=this._rnd(.1*i,.85*i));break;case"fog":t.x=t.x+t.speed,t.x>e+40&&(t.x=-t.w-this._rnd(20,80),t.y=this._rnd(.15*i,.75*i));break;case"hail":t.y=t.y+t.speed,t.y>i+10&&(t.y=this._rnd(-15,-3),t.x=this._rnd(0,e))}}_drawParticle(t,e){switch(e.type){case"drop":{const i=Math.sin(e.angle)*e.len,s=Math.cos(e.angle)*e.len,a=t.createLinearGradient(e.x,e.y,e.x+i,e.y+s);a.addColorStop(0,e.color+"0)"),a.addColorStop(1,e.color+e.opacity+")"),t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(e.x+i,e.y+s),t.strokeStyle=a,t.lineWidth=1.5,t.stroke();break}case"flake":t.beginPath(),t.arc(e.x,e.y,e.r,0,6.28),t.fillStyle="rgba(255,255,255,"+e.opacity+")",t.fill();break;case"mote":t.beginPath(),t.arc(e.x,e.y,e.r,0,6.28),t.fillStyle=e.color+e.opacity+")",t.shadowColor=e.color+.5*e.opacity+")",t.shadowBlur=6,t.fill(),t.shadowBlur=0;break;case"star":{const i=.15+.75*(.5+.5*Math.sin(e.phase));t.beginPath(),t.arc(e.x,e.y,e.r,0,6.28),t.fillStyle="rgba(255,255,255,"+i+")",t.fill();break}case"cloud":{const i=e.h/2;t.beginPath(),t.moveTo(e.x+i,e.y),t.lineTo(e.x+e.w-i,e.y),t.arcTo(e.x+e.w,e.y,e.x+e.w,e.y+i,i),t.arcTo(e.x+e.w,e.y+e.h,e.x+e.w-i,e.y+e.h,i),t.lineTo(e.x+i,e.y+e.h),t.arcTo(e.x,e.y+e.h,e.x,e.y+i,i),t.arcTo(e.x,e.y,e.x+i,e.y,i),t.closePath(),t.fillStyle="rgba(255,255,255,"+e.opacity+")",t.fill();break}case"streak":{const i=t.createLinearGradient(e.x,e.y,e.x+e.w,e.y);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.5,"rgba(255,255,255,"+e.opacity+")"),i.addColorStop(1,"rgba(255,255,255,0)"),t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(e.x+e.w,e.y),t.strokeStyle=i,t.lineWidth=1,t.stroke();break}case"fog":{const i=e.h/2;t.beginPath(),t.moveTo(e.x+i,e.y),t.lineTo(e.x+e.w-i,e.y),t.arcTo(e.x+e.w,e.y,e.x+e.w,e.y+i,i),t.arcTo(e.x+e.w,e.y+e.h,e.x+e.w-i,e.y+e.h,i),t.lineTo(e.x+i,e.y+e.h),t.arcTo(e.x,e.y+e.h,e.x,e.y+i,i),t.arcTo(e.x,e.y,e.x+i,e.y,i),t.closePath(),t.fillStyle="rgba(255,255,255,"+e.opacity+")",t.fill();break}case"hail":t.beginPath(),t.arc(e.x,e.y,e.r,0,6.28),t.fillStyle="rgba(224,242,254,"+e.opacity+")",t.fill(),t.beginPath(),t.arc(e.x-.25*e.r,e.y-.25*e.r,.4*e.r,0,6.28),t.fillStyle="rgba(255,255,255,"+.3*e.opacity+")",t.fill()}}_updateFlash(){const t=this._flashState;t.timer++,t.on?(t.opacity*=.82,t.opacity<.02&&(t.on=!1,t.opacity=0,t.timer=0,t.interval=this._rnd(80,280))):t.timer>t.interval&&(t.on=!0,t.opacity=this._rnd(.12,.22))}_computeSparkline(t){const e=t.length;if(e<2)return{linePath:"",areaPath:"",nowY:32};let i=1/0,s=-1/0;for(const o of t)o.temperature<i&&(i=o.temperature),o.temperature>s&&(s=o.temperature);const a=s-i||1,r=t.map((t,i)=>({x:i/(e-1)*348,y:10+(s-t.temperature)/a*44}));let n=`M${r[0].x},${r[0].y}`;for(let o=0;o<r.length-1;o++){const t=r[Math.max(o-1,0)],e=r[o],i=r[Math.min(o+1,r.length-1)],s=r[Math.min(o+2,r.length-1)];n+=` C${e.x+(i.x-t.x)/6},${e.y+(i.y-t.y)/6} ${i.x-(s.x-e.x)/6},${i.y-(s.y-e.y)/6} ${i.x},${i.y}`}return{linePath:n,areaPath:n+" L348,64 L0,64 Z",nowY:r[0].y}}render(){this._lang;const t=this._getWeatherState();if(!t)return q`<div class="weather-card-wrap">
        <div class="card-header"><span class="card-title">${Pt("weather.title")}</span></div>
        <div class="glass weather-card"><div class="card-inner" style="padding:20px;text-align:center;color:var(--t3);font-size:11px;">${Pt("common.no_entity")}</div></div>
      </div>`;const e=t.attributes,i=t.state,s=this._mapCondition(i),a=this._getConditionMeta(s),r=e.temperature??0,n=e.apparent_temperature,o=e.humidity,l=e.wind_speed,c=e.wind_speed_unit??"km/h",d=e.wind_bearing,h=e.pressure,p=e.visibility,u=e.uv_index,g=e.friendly_name??"",_=e.temperature_unit??"°C",m=this.hass?.states["sun.sun"],b=m?.attributes.next_rising,f=m?.attributes.next_setting,v=b?new Date(b).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",y=f?new Date(f).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",w=new Set(this._weatherConfig.hidden_metrics),x=this._forecastHourly.slice(0,10),$=this._computeSparkline(x),k=`background: radial-gradient(ellipse at 80% 20%, ${a.tint}, transparent 70%); opacity: ${a.tintOp};`;return q`
      <div class="weather-card-wrap">
        <div class="card-header">
          <span class="card-title">${Pt("weather.title")}</span>
          <span class="card-location">${g}</span>
        </div>

        <div class="glass weather-card">
          <div class="tint" style="${k}"></div>
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
                  <span class="wc-temp-unit">${_}</span>
                </div>
                <div class="wc-cond-row">
                  <ha-icon .icon="${a.icon}" class="wc-cond-icon ${s}"></ha-icon>
                  <span class="wc-cond-text">${Pt(a.textKey)}</span>
                </div>
                ${null!=n?q`<span class="wc-feels">${Pt("weather.feels_like",{temp:Math.round(n)})}</span>`:X}
              </div>
            </div>

            <!-- Sparkline -->
            ${x.length>=2?q`
              <div class="wc-spark-zone">
                <svg class="wc-spark-svg" viewBox="0 0 348 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${a.sparkFill}" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                  ${W`<path class="wc-spark-area" d="${$.areaPath}" fill="url(#sparkGrad)" />`}
                  ${W`<path class="wc-spark-line" d="${$.linePath}" stroke="${a.sparkStroke}" />`}
                </svg>
                <div class="wc-spark-now" style="left:0px;">
                  <div class="wc-spark-now-dot" style="top:${$.nowY/64*100}%"></div>
                </div>
                <div class="wc-spark-labels">
                  ${x.map((t,e)=>q`<span class="wc-spark-lbl">${e%2==0||e===x.length-1?0===e?Pt("weather.now"):new Date(t.datetime).getHours()+"h":""}</span>`)}
                </div>
              </div>
            `:X}

            <!-- Metrics -->
            ${this._renderMetrics(w,o,l,c,d,h,u,p,v,y)}

            <!-- Forecast -->
            ${this._renderForecasts(_)}

          </div>
        </div>
      </div>
    `}_renderMetrics(t,e,i,s,a,r,n,o,l,c){const d=[];var h;return t.has("humidity")||null==e||d.push(q`<div class="wc-metric humidity">
        <ha-icon icon="mdi:water-percent"></ha-icon>
        <span class="wc-metric-val">${e}%</span>
      </div>`),t.has("wind")||null==i||d.push(q`<div class="wc-metric wind">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        <span class="wc-metric-val">${Math.round(i)}</span>
        <span class="wc-metric-unit">${s}</span>
        <span class="wc-metric-dir">${h=a,null==h?"":ge[Math.round((+h%360+360)%360/22.5)%16]}</span>
      </div>`),t.has("pressure")||null==r||d.push(q`<div class="wc-metric pressure">
        <ha-icon icon="mdi:gauge"></ha-icon>
        <span class="wc-metric-val">${Math.round(r)}</span>
        <span class="wc-metric-unit">hPa</span>
      </div>`),t.has("uv")||null==n||d.push(q`<div class="wc-metric uv">
        <ha-icon icon="mdi:sun-wireless"></ha-icon>
        <span class="wc-metric-val">${Math.round(n)}</span>
        <span class="wc-metric-unit">UV</span>
      </div>`),t.has("visibility")||null==o||d.push(q`<div class="wc-metric visibility">
        <ha-icon icon="mdi:eye-outline"></ha-icon>
        <span class="wc-metric-val">${o}</span>
        <span class="wc-metric-unit">km</span>
      </div>`),!t.has("sunrise")&&l&&d.push(q`<div class="wc-metric sunrise">
        <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
        <span class="wc-metric-val">${l}</span>
      </div>`),!t.has("sunset")&&c&&d.push(q`<div class="wc-metric sunset">
        <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
        <span class="wc-metric-val">${c}</span>
      </div>`),0===d.length?X:q`<div class="wc-metrics">
      ${d}
    </div>`}_renderForecasts(t){const e=this._weatherConfig.show_daily,i=this._weatherConfig.show_hourly;return e||i?q`
      <div class="wc-forecast-zone">
        <div class="wc-fc-tabs">
          ${e?q`<button class="wc-fc-tab ${"daily"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("daily")}"
            aria-expanded="${"daily"===this._activeTab?"true":"false"}"
            aria-controls="wc-daily-panel"
            aria-label="${Pt("weather.daily_tab")}">${Pt("weather.daily_tab")}</button>`:X}
          ${i?q`<button class="wc-fc-tab ${"hourly"===this._activeTab?"active":""}"
            @click="${()=>this._switchTab("hourly")}"
            aria-expanded="${"hourly"===this._activeTab?"true":"false"}"
            aria-controls="wc-hourly-panel"
            aria-label="${Pt("weather.hourly_tab")}">${Pt("weather.hourly_tab")}</button>`:X}
        </div>

        <div class="wc-fold-sep ${"daily"===this._activeTab&&this._forecastDaily.length>0||"hourly"===this._activeTab&&this._forecastHourly.length>0?"visible":""}"></div>

        ${e?q`
          <div class="fold ${"daily"===this._activeTab?"open":""}" id="wc-daily-panel" role="region" aria-label="${Pt("weather.daily_tab")}" aria-hidden="${"daily"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-daily-list">
                ${this._forecastDaily.slice(0,7).map((t,e)=>{const i=this._mapCondition(t.condition),s=this._getConditionMeta(i),a=new Date(t.datetime),r=0===e?Pt("weather.today"):(n=a,o=this._lang,n.toLocaleDateString(o,{weekday:"short"}));var n,o;return q`
                    <div class="wc-day-row">
                      <span class="wc-day-label">${r}</span>
                      <ha-icon .icon="${s.icon}" class="wc-day-icon ${i}"></ha-icon>
                      <span class="wc-day-cond">${Pt(s.textKey)}</span>
                      <div class="wc-day-temps">
                        <span class="wc-day-hi">${Math.round(t.temperature)}&deg;</span>
                        ${null!=t.templow?q`<span class="wc-day-lo">${Math.round(t.templow)}&deg;</span>`:X}
                      </div>
                      <span class="wc-day-precip">${null!=t.precipitation_probability&&t.precipitation_probability>0?t.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:X}

        ${i?q`
          <div class="fold ${"hourly"===this._activeTab?"open":""}" id="wc-hourly-panel" role="region" aria-label="${Pt("weather.hourly_tab")}" aria-hidden="${"hourly"!==this._activeTab?"true":"false"}">
            <div class="fold-inner">
              <div class="wc-hourly-list">
                ${this._forecastHourly.slice(0,10).map((e,i)=>{const s=this._mapCondition(e.condition),a=this._getConditionMeta(s),r=new Date(e.datetime),n=0===i?Pt("weather.now"):r.getHours()+"h";return q`
                    <div class="wc-hour-row ${0===i?"now":""}">
                      <span class="wc-hour-time">${n}</span>
                      <ha-icon .icon="${a.icon}" class="wc-hour-icon ${s}"></ha-icon>
                      <span class="wc-hour-cond">${Pt(a.textKey)}</span>
                      <span class="wc-hour-temp">${Math.round(e.temperature)}${t}</span>
                      <span class="wc-hour-precip">${null!=e.precipitation_probability&&e.precipitation_probability>0?e.precipitation_probability+"%":""}</span>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        `:X}
      </div>
    `:X}_switchTab(t){this._activeTab=this._activeTab===t?null:t}}function be(t){const e=`[${(new Date).toISOString().slice(11,23)}] ${t}`;try{const t=(localStorage.getItem("gc_debug")??"").split("\n").filter(Boolean).slice(-49);t.push(e),localStorage.setItem("gc_debug",t.join("\n"))}catch{}}function fe(t,e=0){if(e>10)return 0;let i=0;const s=["glass-navbar-card","glass-light-card","glass-weather-card"];for(const r of s)i+=t.querySelectorAll(r).length;const a=t.querySelectorAll("*");for(const r of a)if(r.shadowRoot&&(i+=fe(r.shadowRoot,e+1)),i>0)return i;return i}function ve(){be("fireRebuild"),window.dispatchEvent(new Event("ll-rebuild"))}he([kt()],me.prototype,"_activeTab"),he([kt()],me.prototype,"_forecastDaily"),he([kt()],me.prototype,"_forecastHourly"),he([kt()],me.prototype,"_clockTime"),he([kt()],me.prototype,"_clockSec"),he([kt()],me.prototype,"_clockDay"),he([kt()],me.prototype,"_clockDate"),customElements.get("glass-weather-card")||customElements.define("glass-weather-card",me),be("script loaded, readyState="+document.readyState),be("elements defined: "+["glass-navbar-card","glass-room-popup","glass-light-card","glass-weather-card"].map(t=>t+"="+!!customElements.get(t)).join(", ")),function(){if(e)return;e=!0;const s=history.pushState,a=history.replaceState;history.pushState=function(e,i,a){s.call(this,e,i,a),window.dispatchEvent(new Event("location-changed")),t.emit("location-changed",void 0)},history.replaceState=function(e,i,s){a.call(this,e,i,s),window.dispatchEvent(new Event("location-changed")),t.emit("location-changed",void 0)},window.addEventListener("popstate",i)}(),yt||(yt=new vt);const ye="gc_reload_ts";function we(){const t=[0,300,800,1500,3e3];for(const e of t)setTimeout(ve,e);setTimeout(()=>{const t=fe(document);if(be("render check: found="+t+" glass elements"),0===t){const t=parseInt(sessionStorage.getItem(ye)??"0",10),e=Date.now();e-t>15e3?(be("no glass elements found, forcing reload"),sessionStorage.setItem(ye,String(e)),location.reload()):be("skipping reload (already reloaded recently)")}else be("cards rendered OK")},5e3)}"loading"===document.readyState?(be("waiting DOMContentLoaded"),document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(we))):(be("DOM ready, scheduling rebuilds"),requestAnimationFrame(we)),window.addEventListener("connection-status",t=>{const e=t.detail;be("connection-status: "+e),"connected"===e&&setTimeout(we,300)})}();
