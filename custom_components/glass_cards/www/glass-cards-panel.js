!function(){"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:n,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,v=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,b=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},_=(t,e)=>!n(t,e),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??_)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,m?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const y=globalThis,$=t=>t,k=y.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,R=`<${C}>`,I=document,P=()=>I.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,O="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,M=/>/g,H=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,U=/"/g,N=/^(?:script|style|textarea|title)$/i,B=(F=1,(t,...e)=>({_$litType$:F,strings:t,values:e})),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,G=I.createTreeWalker(I,129);var F;function Y(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,n=this.parts,[d,l]=((t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",a=L;for(let n=0;n<i;n++){const e=t[n];let i,d,l=-1,c=0;for(;c<e.length&&(a.lastIndex=c,d=a.exec(e),null!==d);)c=a.lastIndex,a===L?"!--"===d[1]?a=D:void 0!==d[1]?a=M:void 0!==d[2]?(N.test(d[2])&&(o=RegExp("</"+d[2],"g")),a=H):void 0!==d[3]&&(a=H):a===H?">"===d[0]?(a=o??L,l=-1):void 0===d[1]?l=-2:(l=a.lastIndex-d[2].length,i=d[1],a=void 0===d[3]?H:'"'===d[3]?U:j):a===U||a===j?a=H:a===D||a===M?a=L:(a=H,o=void 0);const h=a===H&&t[n+1].startsWith("/>")?" ":"";r+=a===L?e+R:l>=0?(s.push(i),e.slice(0,l)+S+e.slice(l)+E+h):e+E+(-2===l?n:h)}return[Y(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=X.createElement(d,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:o}),s.removeAttribute(t));if(N.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),G.nextNode(),n.push({type:2,index:++o});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===C)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)n.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=I.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===V)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=T(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=J(t,o._$AS(t,e.values),o,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??I).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),r=0,a=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new Z(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new st(o,this,t)),this._$AV.push(e),n=i[++a]}r!==n?.index&&(o=G.nextNode(),r++)}return G.currentNode=I,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),T(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new X(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Z(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=J(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let a,n;for(t=o[0],a=0;a<o.length-1;a++)n=J(this,s[i+a],e,a),n===V&&(n=this._$AH[a]),r||=!T(n)||n!==this._$AH[a],n===q?t=q:t!==q&&(t+=(n??"")+o[a+1]),this._$AH[a]=n}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends Q{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===V)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=y.litHtmlPolyfillSupport;ot?.(X,Z),(y.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Z(e.insertBefore(P(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const nt=rt.litElementPolyfillSupport;nt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:_},lt=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ct(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ht(t){return ct({...t,state:!0,attribute:!1})}const pt=new class{constructor(){this.listeners=new Map}on(t,e){let i=this.listeners.get(t);return i||(i=new Set,this.listeners.set(t,i)),i.add(e),()=>this.off(t,e)}off(t,e){this.listeners.get(t)?.delete(e)}emit(t,e){this.listeners.get(t)?.forEach(t=>t(e))}},ut=r`
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
`,gt=r`
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
`;var vt=Object.defineProperty;function mt(t,e,i){return Object.values(e).filter(e=>!e.disabled_by&&!e.hidden_by&&function(t,e){if(t.area_id)return t.area_id;if(t.device_id&&e){const i=e[t.device_id];if(i?.area_id)return i.area_id}return null}(e,i)===t)}((t,e,i)=>{for(var s,o=void 0,r=t.length-1;r>=0;r--)(s=t[r])&&(o=s(e,i,o)||o);o&&vt(e,i,o)})([ct({attribute:!1})],class extends at{constructor(){super(...arguments),this._busCleanups=[]}setConfig(t){this._config=t}shouldUpdate(t){if(!t.has("hass"))return!0;if(t.size>1)return!0;const e=t.get("hass");if(!e)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(t=>e.states[t]!==this.hass?.states[t])}getTrackedEntityIds(){const t=this._config?.entity;return t?[t]:[]}_listen(t,e){this._busCleanups.push(pt.on(t,e))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(t=>t()),this._busCleanups=[]}}.prototype,"hass");class bt{constructor(t){this.connection=t.connection}send(t,e={}){return this.connection.sendMessagePromise({type:`glass_cards/${t}`,...e})}subscribe(t,e,i={}){return this.connection.subscribeMessage(e,{type:`glass_cards/${t}`,...i})}}var ft=Object.defineProperty,_t=(t,e,i,s)=>{for(var o,r=void 0,a=t.length-1;a>=0;a--)(o=t[a])&&(r=o(e,i,r)||r);return r&&ft(e,i,r),r};const wt=["light","media_player","climate","fan","cover","vacuum"],xt={light:{name:"Lumières",icon:"mdi:lightbulb-group",description:"Contrôle des lumières"},media_player:{name:"Média",icon:"mdi:speaker",description:"Lecteurs multimédias"},climate:{name:"Climat",icon:"mdi:thermostat",description:"Thermostats et climatisation"},fan:{name:"Ventilateur",icon:"mdi:fan",description:"Ventilation"},cover:{name:"Volets",icon:"mdi:blinds",description:"Stores et volets roulants"},vacuum:{name:"Aspirateur",icon:"mdi:robot-vacuum",description:"Robots aspirateurs"}},yt=["mdi:sofa","mdi:stove","mdi:bed","mdi:desk","mdi:shower","mdi:home","mdi:movie-open","mdi:music","mdi:wrench","mdi:flower","mdi:white-balance-sunny","mdi:weather-night","mdi:lightbulb","mdi:snowflake","mdi:fire","mdi:lock"];class $t extends at{constructor(){super(...arguments),this.narrow=!1,this._tab="navbar",this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._cards=[],this._scenes=[],this._lights=[],this._lightRoom="",this._lightDropdownOpen=!1,this._iconPickerRoom=null,this._dropdownOpen=!1,this._toast=!1,this._saving=!1,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._showMedia=!0,this._autoSort=!0,this._tempHigh=24,this._tempLow=17,this._humidityThreshold=65,this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._loaded=!1,this._loading=!1,this._toastError=!1,this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this),this._initialIcons=new Map}static{this.styles=[ut,gt,r`
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
      @media (hover: hover) {
        .page-back:hover {
          background: var(--s3);
        }
      }
      .page-back:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .page-back ha-icon {
        --mdc-icon-size: 18px;
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
      .tabs {
        display: flex;
        gap: 0;
        border-radius: 12px;
        background: var(--s1);
        border: 1px solid var(--b1);
        padding: 3px;
        margin-bottom: 16px;
      }
      .tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 9px;
        font-family: inherit;
        font-size: 11px;
        font-weight: 600;
        color: var(--t3);
        cursor: pointer;
        transition:
          background var(--t-fast),
          color var(--t-fast),
          box-shadow var(--t-fast);
        border: none;
        background: transparent;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .tab:hover {
          color: var(--t2);
        }
      }
      .tab:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: -2px;
      }
      .tab.active {
        background: var(--s4);
        color: var(--t1);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      }
      .tab ha-icon {
        --mdc-icon-size: 14px;
      }

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
      @media (hover: hover) {
        .item-row:hover {
          background: var(--s2);
          border-color: var(--b2);
        }
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
      @media (hover: hover) {
        .drag-handle:hover {
          color: var(--t3);
        }
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 14px;
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
      }
      @media (hover: hover) {
        .room-icon-btn:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
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
      @media (hover: hover) {
        .dropdown-trigger:hover {
          background: var(--s3);
          border-color: var(--b3);
        }
      }
      .dropdown-trigger:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
      }
      .dropdown-trigger ha-icon {
        --mdc-icon-size: 16px;
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
        border-radius: var(--radius-lg);
        padding: 4px;
        background: #1e2433;
        border: 1px solid var(--b2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transform: translateY(-4px);
        pointer-events: none;
        transition: all var(--t-fast);
      }
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
      @media (hover: hover) {
        .dropdown-item:hover {
          background: var(--s3);
          color: var(--t1);
        }
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
      }
      @media (hover: hover) {
        .icon-pick:hover {
          background: var(--s3);
          border-color: var(--b2);
        }
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
      @media (hover: hover) {
        .feature-row:hover {
          background: var(--s1);
        }
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
      @media (hover: hover) {
        .layout-btn:hover {
          background: var(--s3);
          color: var(--t2);
          border-color: var(--b3);
        }
      }
      .layout-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
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
      @media (hover: hover) {
        .btn:hover {
          background: var(--s4);
          border-color: var(--b3);
          color: var(--t1);
        }
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
      @media (hover: hover) {
        .btn-accent:hover {
          background: rgba(129, 140, 248, 0.2);
          border-color: rgba(129, 140, 248, 0.35);
        }
      }
      .btn-accent:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .btn-ghost {
        border-color: transparent;
        background: transparent;
      }
      @media (hover: hover) {
        .btn-ghost:hover {
          background: var(--s2);
        }
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
    `]}shouldUpdate(t){return!t.has("hass")||(t.size>1||!this._loaded)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseDropdowns),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),this._backend=void 0}_closeDropdownsOnOutsideClick(t){if(!this._dropdownOpen&&!this._lightDropdownOpen)return;const e=t.composedPath(),i=this.shadowRoot;if(!i)return;const s=i.querySelectorAll(".dropdown");for(const o of s)if(e.includes(o))return;this._dropdownOpen=!1,this._lightDropdownOpen=!1}updated(t){super.updated(t),t.has("hass")&&this.hass&&!this._loaded&&(this._loaded=!0,this._backend=new bt(this.hass),this._loadConfig())}async _loadConfig(){if(!this.hass||this._loading)return;this._loading=!0;const t=Object.values(this.hass.areas).sort((t,e)=>t.name.localeCompare(e.name));let e={room_order:[],hidden_rooms:[],show_lights:!0,show_temperature:!0,show_humidity:!0,show_media:!0,auto_sort:!0,temp_high:24,temp_low:17,humidity_threshold:65};const i={};try{if(!this._backend)throw new Error("No backend");const t=await this._backend.send("get_config");e=t.navbar,Object.assign(i,t.rooms)}catch{}this._showLights=e.show_lights??!0,this._showTemperature=e.show_temperature??!0,this._showHumidity=e.show_humidity??!0,this._showMedia=e.show_media??!0,this._autoSort=e.auto_sort??!0,this._tempHigh=e.temp_high??24,this._tempLow=e.temp_low??17,this._humidityThreshold=e.humidity_threshold??65;const s=new Set(e.hidden_rooms),o=new Map;e.room_order.forEach((t,e)=>o.set(t,e));const r=this.hass;if(!r)return;const a=[],n=[];for(const d of t){const t=mt(d.area_id,r.entities,r.devices),e=i[d.area_id]?.icon,o=e||d.icon||"mdi:home";if(0===t.length){n.push({areaId:d.area_id,name:d.name,icon:o});continue}let l=0,c=null,h=null,p=null,u=null,g=!1;for(const i of t){const t=r.states[i.entity_id];if(!t)continue;const e=i.entity_id.split(".")[0];if("light"===e&&"on"===t.state&&l++,"sensor"===e){const e=t.attributes.device_class;"temperature"!==e||c||(c=`${t.state}°`,h=parseFloat(t.state)),"humidity"!==e||p||(p=`${t.state}%`,u=parseFloat(t.state))}"media_player"===e&&"playing"===t.state&&(g=!0)}a.push({areaId:d.area_id,name:d.name,icon:o,entityCount:t.length,visible:!s.has(d.area_id),lightsOn:l,temperature:c,tempValue:h,humidity:p,humidityValue:u,mediaPlaying:g})}this._initialIcons.clear();for(const d of a)this._initialIcons.set(d.areaId,d.icon);a.sort((t,e)=>{if(t.visible!==e.visible)return t.visible?-1:1;const i=o.get(t.areaId),s=o.get(e.areaId);return void 0!==i&&void 0!==s?i-s:void 0!==i?-1:void 0!==s?1:t.name.localeCompare(e.name)}),this._rooms=a,this._emptyRooms=n,!this._selectedRoom&&a.length>0&&(this._selectedRoom=a[0].areaId),this._loadRoomCards(),this._loading=!1}async _loadRoomCards(){if(!this.hass||!this._selectedRoom)return this._cards=[],void(this._scenes=[]);const t=mt(this._selectedRoom,this.hass.entities,this.hass.devices);let e=null,i=new Set,s=new Set,o=[];try{if(!this._backend)throw new Error("No backend");const t=await this._backend.send("get_room",{area_id:this._selectedRoom});t&&(e=t.card_order.length>0?t.card_order:null,i=new Set(t.hidden_entities),s=new Set(t.hidden_scenes??[]),o=t.scene_order??[])}catch{}const r=this.hass,a=t.filter(t=>t.entity_id.startsWith("scene.")),n=new Map;o.forEach((t,e)=>n.set(t,e));const d=a.map(t=>{const e=r.states[t.entity_id];return{entityId:t.entity_id,name:e?.attributes.friendly_name||t.entity_id.split(".")[1],visible:!s.has(t.entity_id)}});d.sort((t,e)=>{const i=n.get(t.entityId),s=n.get(e.entityId);return void 0!==i&&void 0!==s?i-s:void 0!==i?-1:void 0!==s?1:t.name.localeCompare(e.name)}),this._scenes=d;const l=new Map;for(const p of t){if(i.has(p.entity_id))continue;const t=p.entity_id.split(".")[0];l.set(t,(l.get(t)||0)+1)}const c=e?[...e]:[...wt],h=new Set(c);for(const p of l.keys())!h.has(p)&&xt[p]&&c.push(p);this._cards=c.filter(t=>(l.get(t)||0)>0||e&&e.includes(t)).map(t=>{const i=xt[t]||{name:t,icon:"mdi:card-outline",description:""},s=l.get(t)||0;return{id:t,name:i.name,icon:i.icon,description:i.description,count:s,visible:e?e.includes(t):s>0}})}_switchTab(t){this._tab=t,this._iconPickerRoom=null,this._dropdownOpen=!1,this._lightDropdownOpen=!1,"light"===t&&!this._lightRoom&&this._rooms.length>0&&(this._lightRoom=this._rooms[0].areaId,this._loadRoomLights())}_onDragStart(t,e){this._dragIdx=t,this._dragContext=e}_onDragOver(t,e){e.preventDefault(),null!==this._dragIdx&&this._dragIdx!==t&&(this._dropIdx=t)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(t,e){if(e.preventDefault(),null===this._dragIdx||this._dragIdx===t)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("rooms"===i){const e=[...this._rooms],[i]=e.splice(this._dragIdx,1);e.splice(t,0,i),this._rooms=e}else if("cards"===i){const e=[...this._cards],[i]=e.splice(this._dragIdx,1);e.splice(t,0,i),this._cards=e}else if("scenes"===i){const e=[...this._scenes],[i]=e.splice(this._dragIdx,1);e.splice(t,0,i),this._scenes=e}else if("lights"===i){const e=[...this._lights],[i]=e.splice(this._dragIdx,1);e.splice(t,0,i),this._lights=e}this._dragIdx=null,this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_toggleRoomVisible(t){this._rooms=this._rooms.map(e=>e.areaId===t?{...e,visible:!e.visible}:e).sort((t,e)=>t.visible!==e.visible?t.visible?-1:1:0)}_openIconPicker(t){this._iconPickerRoom=this._iconPickerRoom===t?null:t}_setRoomIcon(t,e){this._rooms=this._rooms.map(i=>i.areaId===t?{...i,icon:e}:i),this._iconPickerRoom=null}_toggleCardVisible(t){this._cards=this._cards.map(e=>e.id===t?{...e,visible:!e.visible}:e)}_toggleSceneVisible(t){this._scenes=this._scenes.map(e=>e.entityId===t?{...e,visible:!e.visible}:e)}_selectRoom(t){this._selectedRoom=t,this._dropdownOpen=!1,this._loadRoomCards()}async _saveNavbar(){const t=this._backend;if(t&&!this._saving){this._saving=!0;try{await t.send("set_navbar",{room_order:this._rooms.map(t=>t.areaId),hidden_rooms:this._rooms.filter(t=>!t.visible).map(t=>t.areaId),show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity,show_media:this._showMedia,auto_sort:this._autoSort,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold});const e=this._rooms.filter(t=>t.icon!==this._initialIcons.get(t.areaId)).map(e=>{const i=this.hass?.areas[e.areaId],s=i?.icon||"mdi:home",o=e.icon===s?null:e.icon;return t.send("set_room",{area_id:e.areaId,icon:o})});e.length>0&&await Promise.all(e),this._showToast(),pt.emit("navbar-config-changed",void 0)}catch{this._showToast(!0)}this._saving=!1}}async _savePopup(){if(this._backend&&!this._saving&&this._selectedRoom){this._saving=!0;try{await this._backend.send("set_room",{area_id:this._selectedRoom,card_order:this._cards.filter(t=>t.visible).map(t=>t.id),hidden_scenes:this._scenes.filter(t=>!t.visible).map(t=>t.entityId),scene_order:this._scenes.map(t=>t.entityId)}),this._showToast(),pt.emit("room-config-changed",{areaId:this._selectedRoom})}catch{this._showToast(!0)}this._saving=!1}}_save(){"navbar"===this._tab?this._saveNavbar():"popup"===this._tab?this._savePopup():this._saveLights()}_selectLightRoom(t){this._lightRoom=t,this._lightDropdownOpen=!1,this._loadRoomLights()}async _loadRoomLights(){if(!this.hass||!this._lightRoom)return void(this._lights=[]);const t=mt(this._lightRoom,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("light."));let e=new Set,i=[],s={};try{if(!this._backend)throw new Error("No backend");const t=await this._backend.send("get_room",{area_id:this._lightRoom});t&&(e=new Set(t.hidden_entities),i=t.entity_order,s=t.entity_layouts)}catch{}const o=this.hass,r=new Map;i.forEach((t,e)=>r.set(t,e));const a=t.map(t=>{const i=o.states[t.entity_id],r="on"===i?.state,a=i?.attributes.brightness,n=r&&void 0!==a?Math.round(a/255*100):0;return{entityId:t.entity_id,name:i?.attributes.friendly_name||t.entity_id.split(".")[1],isOn:r,brightnessPct:n,layout:s[t.entity_id]||"compact",visible:!e.has(t.entity_id)}});a.sort((t,e)=>{if(t.visible!==e.visible)return t.visible?-1:1;const i=r.get(t.entityId),s=r.get(e.entityId);return void 0!==i&&void 0!==s?i-s:void 0!==i?-1:void 0!==s?1:t.name.localeCompare(e.name)}),this._lights=a}_toggleLightVisible(t){this._lights=this._lights.map(e=>e.entityId===t?{...e,visible:!e.visible}:e).sort((t,e)=>t.visible!==e.visible?t.visible?-1:1:0)}_cycleLightLayout(t){this._lights=this._lights.map(e=>e.entityId===t?{...e,layout:"full"===e.layout?"compact":"full"}:e)}async _saveLights(){if(this._backend&&!this._saving&&this._lightRoom){this._saving=!0;try{let t=[];try{const e=await this._backend.send("get_room",{area_id:this._lightRoom});e&&(t=e.hidden_entities??[])}catch{}const e=new Set(this._lights.map(t=>t.entityId)),i=t.filter(t=>!e.has(t)),s=this._lights.filter(t=>!t.visible).map(t=>t.entityId),o={};for(const r of this._lights)"full"===r.layout&&(o[r.entityId]=r.layout);await this._backend.send("set_room",{area_id:this._lightRoom,entity_order:this._lights.map(t=>t.entityId),hidden_entities:[...i,...s],entity_layouts:o}),this._showToast(),pt.emit("room-config-changed",{areaId:this._lightRoom})}catch{this._showToast(!0)}this._saving=!1}}async _reset(){this._loaded=!0,await this._loadConfig(),this._lightRoom&&this._loadRoomLights()}_showToast(t=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=t,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_goBack(){history.back()}_renderNavbarPreview(){const t=[...this._rooms.filter(t=>t.visible)];return this._autoSort&&t.sort((t,e)=>(t.lightsOn>0?0:1)-(e.lightsOn>0?0:1)),B`
      <div class="preview-navbar">
        ${t.map((t,e)=>{const i=this._showLights&&t.lightsOn>0,s=this._showHumidity&&null!==t.humidityValue&&t.humidityValue>=this._humidityThreshold,o=this._showMedia&&t.mediaPlaying,r=this._showTemperature&&null!==t.tempValue&&t.tempValue>=this._tempHigh,a=["preview-nav-item",0===e?"active-preview":"",i?"has-light":"",s?"has-humidity":"",o?"has-music":"",r?"has-temp-hot":"",this._showTemperature&&null!==t.tempValue&&!r&&t.tempValue<=this._tempLow?"has-temp-cold":""].filter(Boolean).join(" ");return B`
            <div class=${a}>
              <span class="preview-temp-badge">
                <ha-icon .icon=${r?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
              </span>
              <ha-icon .icon=${t.icon}></ha-icon>
              <div class="preview-nav-label"><span>${t.name}</span></div>
            </div>
          `})}
      </div>
    `}_renderPopupPreview(){const t=this._rooms.find(t=>t.areaId===this._selectedRoom);if(!t)return B`<div class="preview-empty">Sélectionnez une pièce</div>`;const e=this._scenes.length>0,i=this._scenes.filter(t=>t.visible),s=["preview-popup-icon-box",t.lightsOn>0?"has-light":"",t.mediaPlaying?"has-music":""].filter(Boolean).join(" ");return B`
      <div class="preview-popup">
        <div class="preview-popup-header">
          <div class="preview-popup-header-left">
            <div class=${s}>
              <ha-icon .icon=${t.icon}></ha-icon>
            </div>
            <div class="preview-popup-scene-dash ${e?"visible":""}"></div>
          </div>
          <div class="preview-popup-info">
            <div class="preview-popup-name">${t.name}</div>
            <div class="preview-popup-meta">
              ${t.temperature?B`<span>${t.temperature}</span>`:q}
              ${t.humidity?B`<span>${t.humidity}</span>`:q}
            </div>
          </div>
          <div class="preview-popup-close">
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </div>
        </div>

        ${i.length>0?B`
          <div class="preview-popup-scenes">
            ${this._scenes.map(t=>B`
                <span class="preview-scene-chip ${t.visible?"":"hidden-scene"}">${t.name}</span>
              `)}
          </div>
        `:q}

        <div class="preview-popup-cards">
          ${this._cards.filter(t=>t.visible).map(t=>B`
              <div class="preview-card-slot">
                <ha-icon .icon=${t.icon}></ha-icon>
                <span class="preview-card-slot-name">${t.name}</span>
                <span class="preview-card-slot-count">${t.count}</span>
              </div>
            `)}
        </div>
      </div>
    `}_renderNavbarTab(){return B`
      <div class="tab-panel" id="panel-navbar">

        ${this._emptyRooms.length>0?B`
          <div class="section-label">Pièces vides</div>
          <div class="section-desc">
            Ces pièces n'ont aucune entité assignée dans Home Assistant.
            Ajoutez des appareils à ces zones pour qu'elles apparaissent dans la navbar.
          </div>
          <div class="item-list empty-rooms">
            ${this._emptyRooms.map(t=>B`
              <div class="item-row disabled">
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
                <div class="room-icon-btn">
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${t.name}</span>
                  <span class="item-meta">0 entités</span>
                </div>
              </div>
            `)}
          </div>
        `:q}

        <div class="section-label">Comportement</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._autoSort=!this._autoSort}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">Tri automatique</div>
              <div class="feature-desc">Les pièces actives remontent en premier</div>
            </div>
            <span
              class="toggle ${this._autoSort?"on":""}"
              role="switch"
              aria-checked=${this._autoSort?"true":"false"}
            ></span>
          </button>
        </div>

        <div class="banner">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          <span>Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.</span>
        </div>
        <div class="section-label">Pièces visibles</div>
        <div class="item-list">
          ${this._rooms.map((t,e)=>this._renderRoomRow(t,e))}
        </div>

        <div class="icon-picker-fold ${this._iconPickerRoom?"open":""}">
          <div class="icon-picker-inner">
            <div class="section-label">
              Icône — ${this._rooms.find(t=>t.areaId===this._iconPickerRoom)?.name||""}
            </div>
            <div class="icon-picker-grid">
              ${yt.map(t=>B`
                  <button
                    class="icon-pick ${this._rooms.find(t=>t.areaId===this._iconPickerRoom)?.icon===t?"selected":""}"
                    @click=${()=>this._iconPickerRoom&&this._setRoomIcon(this._iconPickerRoom,t)}
                    aria-label="Choisir icône"
                  >
                    <ha-icon .icon=${t}></ha-icon>
                  </button>
                `)}
            </div>
          </div>
        </div>

        <div class="section-label">Indicateurs</div>
        <div class="section-desc">Activez ou désactivez les indicateurs visuels sur la navbar.</div>
        <div class="feature-list">
          ${[{key:"lights",icon:"mdi:lightbulb",name:"Lumières allumées",desc:"Glow doré sur l'icône"},{key:"temperature",icon:"mdi:thermometer",name:"Température",desc:"Badge chaud / froid"},{key:"humidity",icon:"mdi:water-percent",name:"Humidité",desc:"Barre bleue en bas"},{key:"media",icon:"mdi:music",name:"Média en lecture",desc:"Bounce de l'icône"}].map(t=>{const e={lights:this._showLights,temperature:this._showTemperature,humidity:this._showHumidity,media:this._showMedia}[t.key];return B`
              <button
                class="feature-row"
                @click=${()=>{"lights"===t.key?this._showLights=!this._showLights:"temperature"===t.key?this._showTemperature=!this._showTemperature:"humidity"===t.key?this._showHumidity=!this._showHumidity:this._showMedia=!this._showMedia}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${t.name}</div>
                  <div class="feature-desc">${t.desc}</div>
                </div>
                <span
                  class="toggle ${e?"on":""}"
                  role="switch"
                  aria-checked=${e?"true":"false"}
                ></span>
              </button>
            `})}
        </div>

        <div class="section-label">Seuils</div>
        <div class="section-desc">Définissez les seuils pour les alertes de température et d'humidité.</div>
        <div class="threshold-list">
          <div class="threshold-row">
            <div class="threshold-icon hot">
              <ha-icon .icon=${"mdi:thermometer-high"}></ha-icon>
            </div>
            <span class="threshold-label">Température haute</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempHigh)}
              @change=${t=>{this._tempHigh=parseFloat(t.target.value)||24}}
              aria-label="Seuil température haute"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon cold">
              <ha-icon .icon=${"mdi:snowflake"}></ha-icon>
            </div>
            <span class="threshold-label">Température basse</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempLow)}
              @change=${t=>{this._tempLow=parseFloat(t.target.value)||17}}
              aria-label="Seuil température basse"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon humidity">
              <ha-icon .icon=${"mdi:water-percent"}></ha-icon>
            </div>
            <span class="threshold-label">Seuil humidité</span>
            <input
              class="threshold-input"
              type="number"
              step="1"
              .value=${String(this._humidityThreshold)}
              @change=${t=>{this._humidityThreshold=parseFloat(t.target.value)||65}}
              aria-label="Seuil humidité"
            />
            <span class="threshold-unit">%</span>
          </div>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._reset()}>Réinitialiser</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?"Enregistrement...":"Enregistrer"}
          </button>
        </div>
      </div>
    `}_renderRoomRow(t,e){const i=this._dragIdx===e&&"rooms"===this._dragContext,s=this._dropIdx===e&&"rooms"===this._dragContext,o=["item-row",t.visible?"":"disabled",i?"dragging":"",s?"drop-target":""].filter(Boolean).join(" ");return B`
      <div
        class=${o}
        draggable="true"
        @dragstart=${()=>this._onDragStart(e,"rooms")}
        @dragover=${t=>this._onDragOver(e,t)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${t=>this._onDropGeneric(e,t)}
        @dragend=${()=>this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <button
          class="room-icon-btn"
          @click=${()=>this._openIconPicker(t.areaId)}
          aria-label="Changer l'icône de ${t.name}"
        >
          <ha-icon .icon=${t.icon}></ha-icon>
        </button>
        <div class="item-info">
          <span class="item-name">${t.name}</span>
          <span class="item-meta">${t.entityCount} entités</span>
        </div>
        <button
          class="toggle ${t.visible?"on":""}"
          @click=${()=>this._toggleRoomVisible(t.areaId)}
          role="switch"
          aria-checked=${t.visible?"true":"false"}
          aria-label="${t.visible?"Masquer":"Afficher"} ${t.name}"
        ></button>
      </div>
    `}_renderPopupTab(){const t=this._rooms.find(t=>t.areaId===this._selectedRoom);return B`
      <div class="tab-panel" id="panel-popup">
        <div class="section-label">Pièce</div>
        <div class="section-desc">
          Sélectionnez une pièce pour configurer l'ordre et la visibilité de ses cartes internes.
        </div>
        <div class="dropdown ${this._dropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._dropdownOpen=!this._dropdownOpen}
            aria-expanded=${this._dropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
            <span>${t?.name||"Sélectionner..."}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(t=>B`
                <button
                  class="dropdown-item ${t.areaId===this._selectedRoom?"active":""}"
                  role="option"
                  aria-selected=${t.areaId===this._selectedRoom?"true":"false"}
                  @click=${()=>this._selectRoom(t.areaId)}
                >
                  <ha-icon .icon=${t.icon}></ha-icon>
                  ${t.name}
                </button>
              `)}
          </div>
        </div>

        <div class="section-label">Cartes internes</div>
        <div class="section-desc">
          Ordonnez les cartes affichées dans le popup de cette pièce.
        </div>
        <div class="item-list">
          ${this._cards.map((t,e)=>this._renderCardRow(t,e))}
        </div>

        ${this._scenes.length>0?B`
          <div class="section-label">Scènes (${this._scenes.length})</div>
          <div class="section-desc">
            Réordonnez et masquez les scènes affichées en haut du popup.
          </div>
          <div class="item-list">
            ${this._scenes.map((t,e)=>this._renderSceneRow(t,e))}
          </div>
        `:q}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._reset()}>Réinitialiser</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?"Enregistrement...":"Enregistrer"}
          </button>
        </div>
      </div>
    `}_renderCardRow(t,e){const i=this._dragIdx===e&&"cards"===this._dragContext,s=this._dropIdx===e&&"cards"===this._dragContext,o=["item-row card-row",t.visible?"":"disabled",i?"dragging":"",s?"drop-target":""].filter(Boolean).join(" ");return B`
      <div
        class=${o}
        draggable="true"
        @dragstart=${()=>this._onDragStart(e,"cards")}
        @dragover=${t=>this._onDragOver(e,t)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${t=>this._onDropGeneric(e,t)}
        @dragend=${()=>this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <div class="card-icon-box">
          <ha-icon .icon=${t.icon}></ha-icon>
        </div>
        <div class="item-info">
          <span class="item-name">${t.name}</span>
          <span class="item-meta">${t.description}</span>
        </div>
        <span class="card-count">${t.count}</span>
        <button
          class="toggle ${t.visible?"on":""}"
          @click=${()=>this._toggleCardVisible(t.id)}
          role="switch"
          aria-checked=${t.visible?"true":"false"}
          aria-label="${t.visible?"Masquer":"Afficher"} ${t.name}"
        ></button>
      </div>
    `}_renderSceneRow(t,e){const i=this._dragIdx===e&&"scenes"===this._dragContext,s=this._dropIdx===e&&"scenes"===this._dragContext,o=["item-row",t.visible?"":"disabled",i?"dragging":"",s?"drop-target":""].filter(Boolean).join(" ");return B`
      <div
        class=${o}
        draggable="true"
        @dragstart=${()=>this._onDragStart(e,"scenes")}
        @dragover=${t=>this._onDragOver(e,t)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${t=>this._onDropGeneric(e,t)}
        @dragend=${()=>this._onDragEnd()}
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
          @click=${()=>this._toggleSceneVisible(t.entityId)}
          role="switch"
          aria-checked=${t.visible?"true":"false"}
          aria-label="${t.visible?"Masquer":"Afficher"} ${t.name}"
        ></button>
      </div>
    `}_renderLightPreview(){if(!this._lightRoom)return B`<div class="preview-empty">Sélectionnez une pièce</div>`;if(0===this._lights.length)return B`<div class="preview-empty">Aucune lumière</div>`;const t=this._lights.filter(t=>t.visible),e=t.filter(t=>t.isOn).length,i=t.length,s=e>0,o=0===e?"none":e===i?"all":"some";if(0===t.length)return B`<div class="preview-empty">Aucune lumière visible</div>`;const r=[],a=[];for(const d of t){"compact"===("full"===d.layout?"full":"compact")?(a.push(d),2===a.length&&(r.push({kind:"compact-pair",left:a[0],right:a[1]}),a.length=0)):(a.length>0&&(r.push({kind:"full",light:a[0]}),a.length=0),r.push({kind:"full",light:d}))}a.length>0&&r.push({kind:"full",light:a[0]});const n=(t,e,i)=>{const s=["preview-light-row",e?"compact":"",i?"compact-right":"",t.visible?"":"hidden-light"].filter(Boolean).join(" ");return B`
        <div class=${s} data-on=${t.isOn}>
          <div class="preview-light-icon ${t.isOn?"on":""}">
            <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
          </div>
          <div class="preview-light-info">
            <div class="preview-light-name">${t.name}</div>
            <div class="preview-light-sub">${t.isOn?`${t.brightnessPct}%`:"Off"}</div>
          </div>
          ${"full"===t.layout?B`<span class="preview-light-layout-tag">full</span>`:q}
          <span class="preview-light-dot ${t.isOn?"on":""}"></span>
        </div>
      `};return B`
      <div class="preview-light">
        <div class="preview-light-header">
          <div class="preview-light-header-left">
            <span class="preview-light-title">LIGHTS</span>
            <span class="preview-light-count ${o}">${e}/${i}</span>
          </div>
          <div class="preview-light-toggle ${s?"on":""}"></div>
        </div>
        <div class="preview-light-body">
          <div
            class="preview-light-tint"
            style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${s?.06:0}"
          ></div>
          <div class="preview-light-grid">
            ${r.map(t=>"full"===t.kind?n(t.light,!1,!1):B`
                ${n(t.left,!0,!1)}
                ${t.right?n(t.right,!0,!0):q}
              `)}
          </div>
        </div>
      </div>
    `}_renderLightTab(){const t=this._rooms.find(t=>t.areaId===this._lightRoom);return B`
      <div class="tab-panel" id="panel-light">
        <div class="section-label">Pièce</div>
        <div class="section-desc">
          Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d'affichage.
        </div>
        <div class="dropdown ${this._lightDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._lightDropdownOpen=!this._lightDropdownOpen}
            aria-expanded=${this._lightDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${t?.icon||"mdi:home"}></ha-icon>
            <span>${t?.name||"Sélectionner..."}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(t=>B`
                <button
                  class="dropdown-item ${t.areaId===this._lightRoom?"active":""}"
                  role="option"
                  aria-selected=${t.areaId===this._lightRoom?"true":"false"}
                  @click=${()=>this._selectLightRoom(t.areaId)}
                >
                  <ha-icon .icon=${t.icon}></ha-icon>
                  ${t.name}
                </button>
              `)}
          </div>
        </div>

        ${this._lights.length>0?B`
              <div class="section-label">Lumières (${this._lights.length})</div>
              <div class="section-desc">
                Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.
              </div>
              <div class="item-list">
                ${this._lights.map((t,e)=>this._renderLightRow(t,e))}
              </div>
            `:this._lightRoom?B`<div class="banner">
                <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
                <span>Aucune lumière dans cette pièce.</span>
              </div>`:q}

        ${this._lightRoom?B`
          <div class="save-bar">
            <button class="btn btn-ghost" @click=${()=>this._loadRoomLights()}>Réinitialiser</button>
            <button
              class="btn btn-accent"
              @click=${()=>this._save()}
              ?disabled=${this._saving}
            >
              ${this._saving?"Enregistrement...":"Enregistrer"}
            </button>
          </div>
        `:q}
      </div>
    `}_renderLightRow(t,e){const i=this._dragIdx===e&&"lights"===this._dragContext,s=this._dropIdx===e&&"lights"===this._dragContext,o=["item-row",t.visible?"":"disabled",i?"dragging":"",s?"drop-target":""].filter(Boolean).join(" ");return B`
      <div
        class=${o}
        draggable="true"
        @dragstart=${()=>this._onDragStart(e,"lights")}
        @dragover=${t=>this._onDragOver(e,t)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${t=>this._onDropGeneric(e,t)}
        @dragend=${()=>this._onDragEnd()}
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
          class="layout-btn"
          @click=${()=>this._cycleLightLayout(t.entityId)}
          aria-label="Changer le layout"
          title="Layout: ${t.layout}"
        >
          ${"compact"===t.layout?"COMPACT":"FULL"}
        </button>
        <button
          class="toggle ${t.visible?"on":""}"
          @click=${()=>this._toggleLightVisible(t.entityId)}
          role="switch"
          aria-checked=${t.visible?"true":"false"}
          aria-label="${t.visible?"Masquer":"Afficher"} ${t.name}"
        ></button>
      </div>
    `}render(){return this.hass?B`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="Retour">
            <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
          </button>
          <span class="page-title">Configuration</span>
          <span class="page-subtitle">Glass Cards</span>
        </div>

        <div class="glass config-panel">
          <div class="tabs" role="tablist">
            <button
              class="tab ${"navbar"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"navbar"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("navbar")}
            >
              <ha-icon .icon=${"mdi:dock-bottom"}></ha-icon>
              Navbar
            </button>
            <button
              class="tab ${"popup"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"popup"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("popup")}
            >
              <ha-icon .icon=${"mdi:card-outline"}></ha-icon>
              Room Popup
            </button>
            <button
              class="tab ${"light"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"light"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("light")}
            >
              <ha-icon .icon=${"mdi:lightbulb-group"}></ha-icon>
              Light Card
            </button>
          </div>

          <div class="preview-encart">
            <div class="preview-label">Aperçu</div>
            ${"navbar"===this._tab?this._renderNavbarPreview():"popup"===this._tab?this._renderPopupPreview():this._renderLightPreview()}
          </div>

          ${"navbar"===this._tab?this._renderNavbarTab():"popup"===this._tab?this._renderPopupTab():this._renderLightTab()}
        </div>
      </div>

      <div class="toast ${this._toast?"show":""} ${this._toastError?"error":""}">
        ${this._toastError?"Erreur de sauvegarde":"Configuration sauvegardée"}
      </div>
    `:q}}_t([ct({attribute:!1})],$t.prototype,"hass"),_t([ct({type:Boolean})],$t.prototype,"narrow"),_t([ht()],$t.prototype,"_tab"),_t([ht()],$t.prototype,"_rooms"),_t([ht()],$t.prototype,"_emptyRooms"),_t([ht()],$t.prototype,"_selectedRoom"),_t([ht()],$t.prototype,"_cards"),_t([ht()],$t.prototype,"_scenes"),_t([ht()],$t.prototype,"_lights"),_t([ht()],$t.prototype,"_lightRoom"),_t([ht()],$t.prototype,"_lightDropdownOpen"),_t([ht()],$t.prototype,"_iconPickerRoom"),_t([ht()],$t.prototype,"_dropdownOpen"),_t([ht()],$t.prototype,"_toast"),_t([ht()],$t.prototype,"_saving"),_t([ht()],$t.prototype,"_showLights"),_t([ht()],$t.prototype,"_showTemperature"),_t([ht()],$t.prototype,"_showHumidity"),_t([ht()],$t.prototype,"_showMedia"),_t([ht()],$t.prototype,"_autoSort"),_t([ht()],$t.prototype,"_tempHigh"),_t([ht()],$t.prototype,"_tempLow"),_t([ht()],$t.prototype,"_humidityThreshold"),_t([ht()],$t.prototype,"_dragIdx"),_t([ht()],$t.prototype,"_dropIdx"),_t([ht()],$t.prototype,"_toastError"),customElements.define("glass-config-panel",$t)}();
